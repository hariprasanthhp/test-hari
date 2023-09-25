import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ReportApiService } from 'src/app/support/support-traffic-reports/reports/service/report-api.service';
import { OptionsManagerService } from 'src/app/support/support-traffic-reports/service/options-manager.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';
import { ChartOptionsService } from '../../../shared/chart-options.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-monthly-usage',
  templateUrl: './monthly-usage.component.html',
  styleUrls: ['./monthly-usage.component.scss']
})
export class MonthlyUsageComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  page: any;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  trafficChartOptions: any;
  trafficRateOtions: any;
  upUsage: string = '';
  downUsage: string = '';
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;

  constructor(
    private customTranslateService: CustomTranslateService,
    private faNetworkApiService: ReportApiService,
    private optionMngr: OptionsManagerService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private activatedRoute: ActivatedRoute,
    private service: ChartOptionsService
  ) {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.languageSubs = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.renderChart();
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
    });

  }

  ngOnInit() {
    this.page = {
      main_route: 'endpoints',
      sub_route: 'reports',
      showLimit: false,
      showDirection: false,
      showMonthCount: true
    };
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
    data['criteriaSelected'] = 'usage';
    this.filters = data;
    this.loading = true;
    this.trafficChartOptions = null;
    this.trafficRateOtions = null;

    let endpointId = sessionStorage.getItem('aggregate_Endpoint_Id') ? JSON.parse(sessionStorage.getItem('aggregate_Endpoint_Id')) : this.activatedRoute.snapshot.queryParamMap.get('id');
    if (!endpointId) {
      return;
    }
    let granularity = '1month';
    data['granularity'] = granularity;

    this.subscribe = this.faNetworkApiService.getMonthlyUsage(data, endpointId).subscribe((res: any) => {
      this.data = res;
      this.service.btnDisabled = false;
      this.trafficChartOptions = this.optionMngr.makeOptionsForMonthlyUsage(res, 'bar', data);
      if (document.getElementById('container')) {
        this.Highcharts.chart('container', this.trafficChartOptions);
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {      
      this.loading = false;
      this.pageErrorHandle(err);
      this.service.btnDisabled = false;
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.showError(this.errorInfo);
    this.loading = false;
    setTimeout(() => {
      this.closeAlert();
    }, 4000);
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

  renderChart() {
    this.trafficChartOptions = null;
    this.trafficChartOptions = this.optionMngr.makeOptionsForMonthlyUsage(this.data, 'bar', this.filters);
    this.Highcharts.chart('container', this.trafficChartOptions);
  }

}
