import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-air-time-analysis',
  templateUrl: './air-time-analysis.component.html',
  styleUrls: ['./air-time-analysis.component.scss']
})
export class AirTimeAnalysisComponent implements OnInit, OnChanges, OnDestroy {

  @Input('airtimeData') airtimeData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('radioSummary') radioSummary;
  @Input('radioSummaryLoading') radioSummaryLoading;
  @Input('show5gWidgets') show5gWidgets;
  @Input('hasRadioSummary') hasRadioSummary;
  @Input('metaData') metaData;


  Highcharts = Highcharts;
  chartData: any = [];
  chartData5G: any = {};
  chartData2P5G: any = {};
  chartData6G: any = {};
  chartOptions25G: any;
  showChart: boolean = false;
  chartOptions5G: any;
  showChart5G: boolean;
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;
  loading: boolean = true;
  radioSummaryEmpty: boolean;
  airtimeSubs: any;
  noDataAvail: boolean;
  chartOptions6G: any;
  showChart6G: boolean;
  isDev: boolean;
  constructor(
    public api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    public ssoAuthService: SsoAuthService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
    this.isDev = this.ssoAuthService.isDevCheckFromBaseURL();
  }

  ngOnChanges() {
    this.loadChart();
  }

  ngOnDestroy() {
    if (this.airtimeSubs) this.airtimeSubs.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  loadChart() {
    // if (!this.radioSummary['6G']) {
    //   this.radioSummary['6G'] = {};
    // }
    this.error = false;
    this.loading = true;
    if (this.radioSummaryLoading) return;
    this.radioSummaryEmpty = false;

    let emptyRadios = Object.keys(this.radioSummary).filter(key => !Object.keys(this.radioSummary[key]).length);
    if (Object.keys(this.radioSummary).length == emptyRadios.length) {
      this.radioSummaryEmpty = true;
      this.loading = false;
      return;
    }

    this.noDataAvail = false;
    this.airtimeSubs = this.api.getAirtimeAnalysis(this.orgId, this.fsan).subscribe((res: any) => {
      if (res && res.length) {
        this.chartData = res;
        this.chartData.forEach(e => {
          if (e.name === 'RadioAirtime2.4G') {
            this.chartData2P5G = e.result ? e.result : e;
          }
          if (e.name === 'ChannelChangeLogs2.4G') {
            this.chartData2P5G = e.result;
          }
          if (e.name === 'RadioAirtime5G') {
            this.chartData5G = e.result ? e.result : e;
          }
          if (e.name === 'ChannelChangeLogs5G') {
            this.chartData5G = e.result;
          }
          if (e.name === 'RadioAirtime6G') {
            this.chartData6G = e.result ? e.result : e;
          }
          if (e.name === 'ChannelChangeLogs6G') {
            this.chartData6G = e.result;
          }
        });

        if (Object.keys(this.chartData2P5G).length) {
          this.showChart = true;
          let percent25 = this.calculatePercentage(this.chartData2P5G);
          this.chartOptions25G = this.options.airTimeAnalysisChart(percent25, '2.4G', this.radioSummary, this.language);
          if (!this.hasRadioSummary && (this.radioSummary && this.radioSummary['2.4G'] && this.radioSummary['2.4G'].RadioEnabled == 'false')) {

          } else if ((this.hasRadioSummary && !this.radioSummary) || (this.radioSummary && this.radioSummary['2.4G'] && this.radioSummary['2.4G'].RadioEnabled == 'true') || !this.hasRadioSummary) {
            setTimeout(() => {
              this.Highcharts.chart('air-time-chart25', this.chartOptions25G);
            }, 500);
          }
        }

        if (Object.keys(this.chartData5G).length) {
          this.showChart5G = true;
          let percent5 = this.calculatePercentage(this.chartData5G);
          this.chartOptions5G = this.options.airTimeAnalysisChart(percent5, '5G', this.radioSummary, this.language);
          if (!this.hasRadioSummary && (this.radioSummary && this.radioSummary['5G'] && this.radioSummary['5G'].RadioEnabled == 'false')) {

          } else if ((this.hasRadioSummary && !this.radioSummary) || (this.radioSummary && this.radioSummary['5G'] && this.radioSummary['5G'].RadioEnabled == 'true') || !this.hasRadioSummary) {
            setTimeout(() => {
              this.Highcharts.chart('air-time-chart5', this.chartOptions5G);
            }, 500);
          }
        }

        if (this.metaData?.RadioAirtime6G && Object.keys(this.chartData6G).length) {
          this.showChart6G = true;
          let percent6 = this.calculatePercentage(this.chartData6G);
          this.chartOptions6G = this.options.airTimeAnalysisChart(percent6, '6G', this.radioSummary, this.language);
          if (!this.hasRadioSummary && (this.radioSummary && this.radioSummary['6G'] && this.radioSummary['6G']?.RadioEnabled == 'false')) {

          } else if ((this.hasRadioSummary && !this.radioSummary) || (this.radioSummary && this.radioSummary['6G'] && this.radioSummary['6G'].RadioEnabled == 'true') || !this.hasRadioSummary) {
            setTimeout(() => {
              this.Highcharts.chart('air-time-chart-6g', this.chartOptions6G);
            }, 500);
          }
        }


        this.loading = false;

      } else {
        this.showChart = false;
        this.showChart5G = false;
        this.showChart6G = false;
        // this.chartData = [
        //   {
        //     "name": "RadioAirtime5G",
        //     "ChannelUtilization": "122",
        //     "ChannelInterferenceTime": "421"
        //   },
        //   {
        //     "name": "RadioAirtime2.4G",
        //     "ChannelUtilization": "20",
        //     "ChannelInterferenceTime": "970"
        //   }
        // ];
        // this.chartData.forEach(e => {
        //   if (e.name === 'RadioAirtime2.4G') {
        //     this.chartData2P5G = e;
        //   }
        //   if (e.name === 'RadioAirtime5G') {
        //     this.chartData5G = e
        //   }
        // });

        // if (Object.keys(this.chartData2P5G).length) {
        //   let percent25 = this.calculatePercentage(this.chartData2P5G);
        //   this.chartOptions25G = this.options.airTimeAnalysisChart(percent25);
        //   this.Highcharts.chart('air-time-chart25', this.chartOptions25G);
        //   this.showChart = true;
        // }

        // if (Object.keys(this.chartData5G).length) {
        //   let percent5 = this.calculatePercentage(this.chartData5G);
        //   this.chartOptions5G = this.options.airTimeAnalysisChart(percent5);
        //   this.Highcharts.chart('air-time-chart5', this.chartOptions5G);
        //   this.showChart5G = true;
        // }
        this.loading = false;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });


  }

  calculatePercentage(cData: any) {
    let interfer = cData['ChannelInterferenceTime'] ? parseFloat(cData['ChannelInterferenceTime']) : 0;
    let used = cData['ChannelUtilization'] ? parseFloat(cData['ChannelUtilization']) : 0;
    let free = 1000 - (interfer + used);
    let percents = {
      interfer: 0,
      used: 0,
      free: 0
    }
    if (interfer) {
      percents.interfer = Math.round((interfer / 1000) * 100);
    }
    if (used) {
      percents.used = Math.round((used / 1000) * 100);
    }
    if (free) {
      //percents.free = (free / 1000) * 100;
      percents.free = 100 - (percents.interfer + percents.used);
    }

    return percents;

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
      this.closeAlert();
      this.error = true;
    } else {
      let error = this.ssoAuthService.pageErrorHandle(err);
      if (error && (error.toUpperCase() == 'NOT FOUND ERROR' || error.toUpperCase().indexOf('NOT FOUND') > -1)) {
        this.errorInfo = 'No data to display';
        this.noDataAvail = true;
      } else {
        this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
        this.closeAlert();
        this.error = true;
      }

    }

  }
  closeAlert() {
    this.error = false;
  }
}