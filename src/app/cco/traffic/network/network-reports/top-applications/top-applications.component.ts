import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { NetworkReportApiService } from '../../reports/network-report-api.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);


@Component({
  selector: 'app-top-applications',
  templateUrl: './top-applications.component.html',
  styleUrls: ['./top-applications.component.scss']
})
export class TopApplicationsComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  topAppsPieChartOptions: any;
  topAppsChartOptions: any;
  chart: any;
  upUsage: string = '';
  downUsage: string = '';
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;
  chartType: string;
  chartHeight: any = '600px'
  height: any = 500;
  renderOnce: boolean = false;
  hasScopeAccess = false;

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private service: NetworkReportApiService,
    private options: ChartOptionsService,
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
    this.chartType = "bar";
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

  isUUID: boolean = false;
  loadChartData(data: any) {
    //debugger
    this.error = false;
    this.options.btnDisabled = true;
    data.groupBy = 'application'
    this.topAppsPieChartOptions = null;
    this.topAppsChartOptions = null;
    this.filters = data;
    this.loading = true;

    this.height = 500;
    this.chartHeight = this.height.toString() + "px";
    this.subscribe = this.service.TopApplication(data, 'top-applications').subscribe((res: any) => {
      this.data = res;
      if (this.chartType !== 'bar') {
        for (let i = 20; i < this.data.length; i++) {
          if (!this.data[i]['name']) {
            this.isUUID = true;
            break;
          }
        }
      }
      for (let i = 20; i < this.data.length; i++) {
        this.height = this.height + (!this.isUUID ? 200 : 100);
        i = i + 9;
      }
      this.chartHeight = this.height.toString() + "px";
      setTimeout(() => {
        if (this.chartType == 'bar') {
          this.topAppsChartOptions = this.options.makeOptionsForApplications(res, this.chartType, data);
          if(document.getElementById('container')){
            this.Highcharts.chart('container', this.topAppsChartOptions);
          }
        } else {
          this.topAppsPieChartOptions = this.options.makeOptionsForApplications(res, this.chartType, data);
          this.topAppsPieChartOptions.exporting.chartOptions = {
            plotOptions: {
              pie: {
                size: '45%'
              }
            },
            chart: {
              height: this.height + (this.data.length > 10 ? 150 : 0)
            },
            legend: {
              navigation: {
                enabled: false
              }
            }
          }
          if(document.getElementById('container')){
            this.Highcharts.chart('container', this.topAppsPieChartOptions);
          }
        }
        this.loading = false;
        this.options.btnDisabled = false;
        this.renderOnce = true;
      }, 1500)
    }, (err: HttpErrorResponse) => {
      if (this.chartType == 'bar') {
        this.topAppsChartOptions = this.options.makeOptionsForApplications([], this.chartType, data);
        if(document.getElementById('container')){
          this.Highcharts.chart('container', this.topAppsChartOptions);
        }
      } else {
        this.topAppsPieChartOptions = this.options.makeOptionsForApplications([], this.chartType, data);
        if(document.getElementById('container')){
          this.Highcharts.chart('container', this.topAppsPieChartOptions);
        }
      }
      this.options.btnDisabled = false;
      this.renderOnce = true;
      this.pageErrorHandle(err);
    });
  }

  renderChart() {
    this.topAppsChartOptions = null;
    if (this.chartType == 'bar') {
      this.topAppsChartOptions = this.options.makeOptionsForApplications(this.data, this.chartType, this.filters);
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.topAppsChartOptions);
      }
    } else {
      this.topAppsPieChartOptions = this.options.makeOptionsForApplications(this.data, this.chartType, this.filters);
      this.topAppsPieChartOptions.exporting.chartOptions = {
        plotOptions: {
          pie: {
            size: '45%'
          }
        },
        chart: {
          height: this.height + (this.data.length > 10 ? 150 : 0)
        },
        legend: {
          navigation: {
            enabled: false
          }
        }
      }
      if(document.getElementById('container')){
        this.Highcharts.chart('container', this.topAppsPieChartOptions);
      }
    }
  }

  changeChartType(type: string) {
    if (this.topAppsChartOptions || this.topAppsPieChartOptions) {
      this.loading = true;
    }
    if (type == 'pie') {
      this.height = 500;
      for (let i = 20; i < this.data.length; i++) {
        this.height = this.height + (!this.isUUID ? 200 : 100);
        i = i + 9;
      }
      this.chartHeight = this.height.toString() + "px";
    } else {
      if (!this.topAppsChartOptions) {
        this.height = 500;
        for (let i = 20; i < this.data.length; i++) {
          this.height = this.height + 200;
          i = i + 9;
        }
      }
      this.chartHeight = this.height.toString() + "px";
    }
    this.error = false;
    this.chartType = type;
    if (!this.topAppsChartOptions && !this.topAppsPieChartOptions) {
      return;
    }
    setTimeout(() => {
      this.topAppsChartOptions = null;
      this.topAppsPieChartOptions = null;
      if (this.chartType == 'bar') {
        this.topAppsChartOptions = this.options.makeOptionsForApplications(this.data, this.chartType, this.filters);
        if(document.getElementById('container')){
          this.Highcharts.chart('container', this.topAppsChartOptions);
        }
      } else {
        this.topAppsPieChartOptions = this.options.makeOptionsForApplications(this.data, this.chartType, this.filters);
        this.topAppsPieChartOptions.exporting.chartOptions = {
          plotOptions: {
            pie: {
              size: '45%'
            }
          },
          chart: {
            height: this.height + (this.data.length > 10 ? 150 : 0)
          },
          legend: {
            navigation: {
              enabled: false
            }
          }
        }
        if(document.getElementById('container')){
          this.Highcharts.chart('container', this.topAppsPieChartOptions);
        }
      }
      this.loading = false;
    }, 2000);
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
