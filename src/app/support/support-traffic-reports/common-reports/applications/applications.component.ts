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
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

  error: boolean;
  errorInfo: string = '';

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
    private optionMngr: OptionsManagerService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService
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
      showGroup: true,
      showDirection: true

    };

    this.sso.setActionLog('CSC', 'pageHit', 'reports - applications', window.location.href, 'applications reports intiated');

  }

  subscribe: any
  data: any;

  topAppsChartData: any;
  topAppsChartOptions: any;
  topAppsPieChartOptions: any;
  chartType = 'bar';

  loadChartData(data: any) {
    this.error = false;

    data.groupBy = 'application'
    this.topAppsPieChartOptions = null;
    this.topAppsChartOptions = null;

    this.filters = data;
    this.loading = true;

    this.subscribe = this.service.getApplications(data).subscribe((res: any) => {
      this.data = res;

      let downloadData = {

        title: this.language['TopAppGrp_Title'],
        fileName: 'top-applications'
      };
      if (this.filters.groupSelected === "no") {
        downloadData = {
          title: this.language['TopApp_Title'],
          fileName: 'top-applications'
        }

      }
      if (this.chartType == 'bar') {
        var chartHeight = 400;
        if (res && res.length > 0) {
          let catLength = res.length * 30;
          chartHeight = catLength < chartHeight ? chartHeight : catLength;
        }
        let options = this.service.makeOptions(res, this.chartType, data, downloadData);
        options['chart']['height'] = chartHeight;
        this.topAppsChartOptions = options;



        this.topAppsChartOptions.plotOptions.series.point.events = {
          click: () => {
            //this.router.navigate(['/fa/application/applocation', { load: true }]);
          }
        };

        this.topAppsChartOptions = Object.assign({}, this.topAppsChartOptions);

        this.Highcharts.chart('container', this.topAppsChartOptions);

      }

      this.loading = false;

    }, (err: any) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });


  }

  setEventsforPieChart(): void {
    this.topAppsPieChartOptions.plotOptions.series.point.events = {
      click: () => {
        //todo
      }
    };

    this.topAppsPieChartOptions = Object.assign({}, this.topAppsPieChartOptions);
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

  downloadCSV(): void {

  }

  downloadPdf() {

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.showError(this.errorInfo);
    this.loading = false;
    // this.closeAlert();
    // this.error = true;
    // $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  closeAlert() {
    this.error = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow")
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
