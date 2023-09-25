import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import * as Highcharts from "highcharts/highstock";
import { EndpointReportsService } from '../endpoint-reports.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-application-groups',
  templateUrl: './application-groups.component.html',
  styleUrls: ['./application-groups.component.scss']
})
export class ApplicationGroupsComponent implements OnInit {

  error: boolean;
  errorInfo: string = '';
  language: any;
  pageAvailable: boolean = false;
  page: any;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  upUsage: string = '';
  downUsage: string = '';
  subscribe: any
  data: any;
  topAppGroupsChartOptions: any;
  topAppGroupsPieChartOptions: any;
  chartType = 'bar';

  constructor(
    private customTranslateService: CustomTranslateService,
    private service: EndpointReportsService,
    private commonOrgService: CommonService,
    private chartOptionsService: ChartOptionsService
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
      this.renderChart();
    });

  }

  ngOnInit() {
    this.page = {
      main_route: 'endpoints',
      sub_route: 'applications',
      showCriteria: true,
      showStartDate: true,
      showEndDate: true,
      showLimit: true,
      showDirection: true

    };
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  loadChartData(data: any) {
    this.error = false;
    data.groupBy = 'application'
    this.topAppGroupsPieChartOptions = null;
    this.topAppGroupsChartOptions = null;
    this.filters = data;
    this.loading = true;
    this.subscribe = this.service.getApplicationGroups(data).subscribe((res: any) => {
      this.data = res;
      this.chartOptionsService.btnDisabled = false;
      let downloadData = {
        title: this.language.Top_Application + ' ' + this.language.Groups,
        fileName: 'top-application-groups'
      };
      if (this.chartType == 'bar') {
        var chartHeight = 400;
        if (res && res.length > 0) {
          let catLength = res.length * 30;
          chartHeight = catLength < chartHeight ? chartHeight : catLength;
        }
        let options = this.chartOptionsService.makeOptionsEndpointTopApp(res, this.chartType, data, downloadData);
        options['chart']['height'] = chartHeight;
        this.topAppGroupsChartOptions = options;
        this.topAppGroupsChartOptions = Object.assign({}, this.topAppGroupsChartOptions);
        if (document.getElementById('container')) {
          this.Highcharts.chart('container', this.topAppGroupsChartOptions);
        }
      }
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.chartOptionsService.btnDisabled = false;
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  closeAlert() {
    this.error = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  renderChart() {
    this.topAppGroupsChartOptions = null;
    let downloadData = {
      title: this.language.Top_Application + ' ' + this.language.Groups,
      fileName: 'top-applications-groups'
    };
    var chartHeight = 400;
    if (this.data && this.data.length > 0) {
      let catLength = this.data.length * 30;
      chartHeight = catLength < chartHeight ? chartHeight : catLength;
    }
    this.topAppGroupsChartOptions = this.chartOptionsService.makeOptionsEndpointTopApp(this.data, this.chartType, this.filters, downloadData);
    this.Highcharts.chart('container', this.topAppGroupsChartOptions);
  }

}
