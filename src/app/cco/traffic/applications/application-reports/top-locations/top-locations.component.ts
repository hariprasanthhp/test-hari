import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { NetworkReportApiService } from '../../../network/reports/network-report-api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-top-locations',
  templateUrl: './top-locations.component.html',
  styleUrls: ['./top-locations.component.scss']
})
export class TopLocationsComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  chartOptions: any;
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

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private service: NetworkReportApiService,
    private options: ChartOptionsService,
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
    this.options.btnDisabled = true;
    data.groupBy = 'application';
    this.filters = data;
    this.chartOptions = null;

    this.height = 500;
    this.chartHeight = this.height.toString() + "px";
    this.subscribe = this.service.getTopLocations(data, 'apps-top-locations').subscribe((res: any) => {
      this.data = res;
      for (let i = 20; i < this.data.length; i++) {
        this.height = this.height + 200;
        i = i + 10;
      }
      this.chartHeight = this.height.toString() + "px";
      setTimeout(() => {
        this.chartOptions = this.options.makeOptionsForLocations(res, 'bar', data, 'applications');
        if(document.getElementById('top-locations-container')){
          this.Highcharts.chart('top-locations-container', this.chartOptions);
        }
        this.loading = false;
        this.options.btnDisabled = false;
        this.renderOnce = true;
      }, 1500)

    }, (err: HttpErrorResponse) => {
      this.chartOptions = this.options.makeOptionsForLocations([], 'bar', data, 'applications');
      if(document.getElementById('top-locations-container')){
        this.Highcharts.chart('top-locations-container', this.chartOptions);
      }
      this.options.btnDisabled = false;
      this.renderOnce = true;
      this.pageErrorHandle(err);
    });
  }

  renderChart() {
    this.chartOptions = null;
    this.chartOptions = this.options.makeOptionsForLocations(this.data, 'bar', this.filters, 'applications');
    if(document.getElementById('top-locations-container')){
      this.Highcharts.chart('top-locations-container', this.chartOptions);
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


