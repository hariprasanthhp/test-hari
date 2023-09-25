import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { NetworkReportApiService } from '../../../network/reports/network-report-api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-top-subscribers',
  templateUrl: './top-subscribers.component.html',
  styleUrls: ['./top-subscribers.component.scss']
})
export class TopSubscribersComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  tobSubChartOptions: any;
  chart: any;
  chartCallback: any;
  upUsage: string = '';
  downUsage: string = '';
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;
  chartHeight: any = '600px'
  height: any = 500;
  renderOnce: boolean = false;
  hasScopeAccess = false;
  isUUID: boolean = false;

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private networkService: NetworkReportApiService,
    private chartOptionService: ChartOptionsService,
    private sso: SsoAuthService
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.languageSubs = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
      if (this.renderOnce) {
        this.renderChart()
      }
    });
    if (window.sessionStorage.getItem('traffic_TopSub_Endpoint_filters')) {
      window.sessionStorage.removeItem('traffic_TopSub_Endpoint_filters')
    }
  }

  ngOnInit() {
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/traffic/') > -1) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications.report') !== -1) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }
    this.closeAlert();
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubs) {
      this.languageSubs.unsubscribe();
    }
  }

  loadChartData(data: any) {
    this.error = false;
    this.loading = true;
    this.chartOptionService.btnDisabled = true;
    data['From'] = 'Applications';
    this.tobSubChartOptions = null;
    data['granularity'] = '1hour';
    this.filters = data;

    this.height = 500;
    this.chartHeight = this.height.toString() + "px";
    this.subscribe = this.networkService.getTopSubdata(data, 'application').subscribe((res: any) => {
      this.data = res;
      if (sessionStorage.getItem('showSensitiveInfo') != 'true' && this.data) {
        this.data.forEach(d => d.name = maskString(d.name));
      }
      for (let i = 0; i < this.data.length; i++) {
        if (!this.data[i]['name']) {
          this.isUUID = true;
          break;
        }
      }
      for (let i = 20; i < this.data.length; i++) {
        this.height = this.height + 200;
        i = i + 10;
      }
      this.chartHeight = this.height.toString() + "px";
      setTimeout(() => {
        // this.tobSubChartOptions = this.chartOptionService.topSub_ChartOptions(res, data);
        // this.Highcharts.chart('container', this.tobSubChartOptions);
        this.renderChart();
        this.loading = false;
        this.chartOptionService.btnDisabled = false;
        this.renderOnce = true;
      }, 1500)
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.tobSubChartOptions = this.chartOptionService.topSub_ChartOptions([], data);
      if (document.getElementById('container')) {
        this.Highcharts.chart('container', this.tobSubChartOptions);
      }
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
      this.pageErrorHandle(err);
    });
  }

  renderChart() {
    this.tobSubChartOptions = null;
    this.tobSubChartOptions = this.chartOptionService.topSub_ChartOptions(this.data, this.filters);
    if (this.isUUID) {
      let len = 50;
      for (let i = 12; i < this.data.length; i++) {
        len = len + 100;
        i = i + 5;
      }
      this.tobSubChartOptions.exporting.chartOptions = {
        chart: {
          height: this.height + len
        }
      }
    }
    if (document.getElementById('container')) {
      this.Highcharts.chart('container', this.tobSubChartOptions);
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.showError(this.errorInfo);
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

}


