import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
import HC_map from "highcharts/modules/map";
import { ApplicationReportApiService } from '../../reports/application-report-api.service';
HC_map(Highcharts);

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
  urlParams: any;
  renderOnce: boolean = false;
  hasScopeAccess = false;
  showTimeRange = true;

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private service: ApplicationReportApiService,
    private options: ChartOptionsService,
    private cd: ChangeDetectorRef,
    private sso: SsoAuthService
  ) {

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
    if (data.locationsSelected == undefined || !data.locationsSelected.length) {
      //return;
    }
    this.filters = data;
    this.trafficChartOptions = null;
    this.trafficRateOtions = null;
    let granularity = '1hour';
    data['granularity'] = granularity;
    this.subscribe = this.service.getTraffic(data, 'applications').subscribe((res: any) => {
      this.data = res;
      if (data['criteriaSelected'] == 'usage') {
        this.trafficChartOptions = this.options.makeOptionsForNWTraffic(res, data, 'applications');
      } else {
        this.trafficChartOptions = this.options.makeOptionsForLineChart(res, data, 'applications');
      }
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.trafficChartOptions);
      }
      this.loading = false;
      this.options.btnDisabled = false;
      this.renderOnce = true;
    }, (err: HttpErrorResponse) => {
      if (data['criteriaSelected'] == 'usage') {
        this.trafficChartOptions = this.options.makeOptionsForNWTraffic([], data, 'applications');
      } else {
        this.trafficChartOptions = this.options.makeOptionsForLineChart([], data, 'applications');
      }
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.trafficChartOptions);
      }
      this.options.btnDisabled = false;
      this.renderOnce = true;
      this.pageErrorHandle(err);
    });
  }

  renderChart() {
    this.trafficChartOptions = null;
    if (this.filters['criteriaSelected'] == 'usage') {
      this.trafficChartOptions = this.options.makeOptionsForNWTraffic(this.data, this.filters, 'applications');
    } else {
      this.trafficChartOptions = this.options.makeOptionsForLineChart(this.data, this.filters, 'applications');
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
      if (this.errorInfo.includes('endTime must be greater than startTime')) {
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

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

}


