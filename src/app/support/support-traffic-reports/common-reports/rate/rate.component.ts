declare var require: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Router } from '@angular/router';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { OptionsManagerService } from "../../service/options-manager.service";
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ReportApiService } from '../../reports/service/report-api.service';
const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;

  page: any;
  loading: boolean = false;
  filters: any;

  Highcharts = Highcharts;
  trafficChartData: any;
  trafficChartOptions: any;
  trafficRateOtions: any;
  chart: any;
  chartCallback: any;
  chartConstructor = "chart";
  breadcrumb: any;
  usageChartData: any;
  afterFirstClick = false;
  oneToOneFlag = true;
  updateFlag = false;
  upUsage: string = '';
  downUsage: string = '';

  error: boolean;
  errorInfo: string = '';

  subscribe: any
  data: any;
  languageSubs: any;
  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private faNetworkApiService: ReportApiService,
    private optionMngr: OptionsManagerService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService
  ) {

    this.breadcrumb = {
      mainRouteKeyName: 'network',
      mainRoute: '/fa/network',
      subRouteKeyName: 'networkMenuTraffic',
      subRoute: '/fa/network/traffic',
      setSchedule: false
    }

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
    });

    const self = this;
    this.chartCallback = chart => {
      // saving chart reference
      self.chart = chart;
    };
  }

  ngOnInit() {
    this.page = {
      main_route: 'network',
      sub_route: 'traffic',
      showLocation: false,
      showApplication: false,
      showCriteria: false,
      showStartDate: true,
      showEndDate: true,
      showLimit: false,
      showGroup: false,
      showDirection: false,
      showRate: true
    };

    this.closeAlert();

    this.sso.setActionLog('CSC', 'pageHit', 'reports - rate', window.location.href, 'Rate reports intiated');

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
    data['criteriaSelected'] = 'usage';
    this.filters = data;
    this.loading = true;
    this.trafficChartOptions = null;
    this.trafficRateOtions = null;


    let endpointId = this.sso.getSubscriberEndpointId() ? this.sso.getSubscriberEndpointId() : '2705d400-58a5-4cca-8091-8ee2843ea2c9';
    if (!endpointId) {
      return;
    }
    let granularity = '1hour';
    data['granularity'] = granularity;

    this.subscribe = this.faNetworkApiService.getRate(data, endpointId).subscribe((res: any) => {
      this.data = res;
      this.trafficChartOptions = this.optionMngr.makeOptionsForLineChart(res, 'bar', data);
      this.Highcharts.chart('container', this.trafficChartOptions);
      this.loading = false;

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Top Subscriber:',
    useBom: true,
    noDownload: false,
    headers: ["06/10 00:30", "06/10 04:30", "06/10 08:30", "06/10 12:30", "06/10 16:30", "06/10 20:30"]
  };

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
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
