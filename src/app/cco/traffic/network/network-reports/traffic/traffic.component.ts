import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
import HC_map from "highcharts/modules/map";
HC_map(Highcharts);

import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { NetworkReportApiService } from '../../reports/network-report-api.service';


@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  trafficChartOptions: any;
  trafficRateOtions: any;
  chart: any;
  upUsage: string = '';
  downUsage: string = '';
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;
  renderOnce: boolean = false;
  hasScopeAccess = false;
  showTimeRange = true;

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
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network.report') !== -1) {
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
    this.options.btnDisabled = true;
    this.error = false;
    this.filters = data;
    this.loading = true;
    this.trafficChartOptions = null;
    this.trafficRateOtions = null;
    this.subscribe = this.service.getTraffic(data).subscribe((res: any) => {
      this.data = res;
      this.options.btnDisabled = false;
      if (data['criteriaSelected'] == 'usage') {
        this.trafficChartOptions = this.options.makeOptionsForNWTraffic(res, data);
      } else {
        this.trafficChartOptions = this.options.makeOptionsForLineChart(res, data);
      }
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.trafficChartOptions);
      }
      this.loading = false;
      this.options.btnDisabled = false;
      this.renderOnce = true;
    }, (err: HttpErrorResponse) => {
      this.options.btnDisabled = false;
      this.loading = false;
      if (data['criteriaSelected'] == 'usage') {
        this.trafficChartOptions = this.options.makeOptionsForNWTraffic([], data);
      } else {
        this.trafficChartOptions = this.options.makeOptionsForLineChart([], data);
      }
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.trafficChartOptions);
      }
      this.pageErrorHandle(err);
      this.options.btnDisabled = false;
      this.renderOnce = true;
    });
  }

  renderChart() {
    this.trafficChartOptions = null;
    if (this.filters['criteriaSelected'] == 'usage') {
      this.trafficChartOptions = this.options.makeOptionsForNWTraffic(this.data, this.filters);
    } else {
      this.trafficChartOptions = this.options.makeOptionsForLineChart(this.data, this.filters);
    }
    if(document.getElementById('container')){
      this.Highcharts.chart('container', this.trafficChartOptions);
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      if(this.errorInfo.includes('endTime must be greater than startTime')){
        this.errorInfo = 'Start time should be earlier than end time';
      }
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
