import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { LocationReportApiService } from '../../reports/location-report-api.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

@Component({
  selector: 'app-monthly-usage-byapplication',
  templateUrl: './monthly-usage-byapplication.component.html',
  styleUrls: ['./monthly-usage-byapplication.component.scss']
})
export class MonthlyUsageByapplicationComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  monthusageChartOptions: any;
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

  constructor(
    private customTranslateService: CustomTranslateService,
    private locationService: LocationReportApiService,
    private chartOptionService: ChartOptionsService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
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
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.report') !== -1) {
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
    this.filters = data;
    this.chartOptionService.btnDisabled = true;
    this.monthusageChartOptions = null;

    this.subscribe = this.locationService.getMonthlyUsageByApp(data).subscribe((res: any) => {
      this.data = res.length > 0 ? res : [];
      this.monthusageChartOptions = this.chartOptionService.monthlyUsageByAppChartOptions(res, data);
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.monthusageChartOptions);
      }
      this.loading = false;
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
    }, (err: HttpErrorResponse) => {
      this.monthusageChartOptions = this.chartOptionService.monthlyUsageByAppChartOptions([], data);
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.monthusageChartOptions);
      }
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
      this.pageErrorHandle(err);
    });
  }

  renderChart() {
    this.monthusageChartOptions = null;
    this.monthusageChartOptions = this.chartOptionService.monthlyUsageByAppChartOptions(this.data, this.filters);
    if(document.getElementById('container')){
      this.Highcharts.chart('container', this.monthusageChartOptions);
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


