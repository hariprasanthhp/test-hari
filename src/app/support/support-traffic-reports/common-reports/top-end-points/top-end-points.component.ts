declare var require: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Router } from '@angular/router';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { OptionsManagerService } from "../../service/options-manager.service";
import { ReportApiService } from '../../reports/service/report-api.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-top-end-points',
  templateUrl: './top-end-points.component.html',
  styleUrls: ['./top-end-points.component.scss']
})
export class TopEndPointsComponent implements OnInit {

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

  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private service: ReportApiService,
    private optionMngr: OptionsManagerService
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
    this.customTranslateService.selectedLanguage.subscribe(data => {
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
      sub_route: 'top-applications',
      showLocation: false,
      showApplication: false,
      showCriteria: true,
      showStartDate: true,
      showEndDate: true,
      showLimit: true,
      showGroup: false,
      showDirection: true

    };

  }

  subscribe: any
  data: any;

  topAppsChartData: any;
  topAppsChartOptions: any;
  topAppsPieChartOptions: any;
  chartType = 'bar';

  loadChartData(data: any) {

    data.groupBy = 'application'
    this.topAppsPieChartOptions = null;
    this.topAppsChartOptions = null;

    this.filters = data;
    this.loading = true;

    this.subscribe = this.service.getTopEndpoints(data).subscribe((res: any) => {
      this.data = res;
      let downloadData = {
        title: 'Top Endpoints',
        fileName: 'SubscriberEndpoints'
      };
      if (this.chartType == 'bar') {
        this.topAppsChartOptions = this.service.makeOptions(res, this.chartType, data, downloadData);

        this.topAppsChartOptions.plotOptions.series.point.events = {
          click: () => {
          }
        };

        this.topAppsChartOptions = Object.assign({}, this.topAppsChartOptions);

        this.Highcharts.chart('container', this.topAppsChartOptions);

      }

      this.loading = false;

    });


  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
