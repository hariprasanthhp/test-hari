import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';


@Component({
  selector: 'app-channel-score',
  templateUrl: './channel-score.component.html',
  styleUrls: ['./channel-score.component.scss']
})
export class ChannelScoreComponent implements OnInit, OnChanges {

  @Input('airtimeData') airtimeData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('start') start;
  @Input('end') end;
  @Input('ssidSelfHeal') ssidSelfHeal;
  @Input('radioSummary') radioSummary;
  @Input('show5gWidgets') show5gWidgets;
  @Input('channelChangeLogsData') channelChangeLogsData;



  Highcharts = Highcharts;
  chartData: any = {};
  chartData5G: any = [];
  chartData24G: any = [];
  chartOptions24G: any;
  chartOptions5G: any;
  showChart24G: boolean = false;
  showChart5G: boolean;
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;
  apiDone: boolean;

  showTab24G: boolean = true;
  chartOptionsSubs: any;
  loading: boolean;
  showChart: boolean = false;
  chartOptions: any;
  constructor(
    private api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    public ssoAuthService: SsoAuthService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
  }

  ngOnChanges() {
    // const chart = Highcharts.chart('channel-scores-chart-24g', this.channelScoreData);
    // const chart1 = Highcharts.chart('channel-scores-chart-5g', this.channelData);
    this.getStartEndDates();
    this.loadChart();
  }

  loadChart() {
    this.apiDone = false;
    // this.start = '2020-05-01T16:00:00Z';
    // this.end = '2020-05-30T16:00:00Z';
    //let logs = JSON.parse(this.channelChangeLogsData);
    this.loading = true;
    this.api.getChannelScoreData(this.orgId, this.fsan, this.start, this.end).subscribe((res: any) => {
      if (res && Object.keys(res).length) {
        this.chartData = res;

        if (res['24g']) {
          this.chartData24G = res['24g'];
        }
        if (res['5g']) {
          this.chartData5G = res['5g'];
        }

        // if (this.chartData24G.length) {
        //   this.chartOptions24G = this.options.ChannelScoreChartOptions(this.chartData24G, '2.4G', this.language, this.channelChangeLogsData, this.ssidSelfHeal, this.radioSummary);
        //   this.Highcharts.chart('channel-scores-chart-24g', this.chartOptions24G);
        //   this.showChart24G = true;
        // }

        // if (this.chartData5G.length) {
        //   this.chartOptions5G = this.options.ChannelScoreChartOptions(this.chartData5G, '5G', this.language, this.channelChangeLogsData, this.ssidSelfHeal, this.radioSummary);
        //   if (this.show5gWidgets) {
        //     this.Highcharts.chart('channel-scores-chart-5g', this.chartOptions5G);
        //   }
        //   this.showChart5G = true;
        // }
        this.changeTab(this.showTab24G);
        this.apiDone = true;


      } else {
        // this.showChart24G = false;
        // this.showChart5G = false;
        this.changeTab(this.showTab24G);
        this.apiDone = true;
      }

    }, (err: HttpErrorResponse) => {
      this.changeTab(this.showTab24G);
      this.pageErrorHandle(err);
      this.apiDone = true;
      // this.showChart24G = false;
      // this.showChart5G = false;
    });


  }

  getStartEndDates() {
    //returns start date as 1st day from prev  month &end date is current day
    let date = new Date();
    let tomorrow = new Date();
    let monthCount = 3;
    let firstDay = new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
    tomorrow.setDate(new Date().getDate() + 1);
    let lastDay = tomorrow;

    this.start = this.dateUtils.getISODate(firstDay);
    this.end = this.dateUtils.getISODate(lastDay);
  }

  calculatePercentage(cData: any) {
    let interfer = parseInt(cData['ChannelInterferenceTime']) ? parseInt(cData['ChannelInterferenceTime']) : 0;
    let used = parseInt(cData['ChannelUtilization']) ? parseInt(cData['ChannelUtilization']) : 0;
    let free = 1000 - (interfer + used);
    let percents = {
      interfer: 0,
      used: 0,
      free: 0
    }
    if (interfer) {
      percents.interfer = (interfer / 1000) * 100;
    }
    if (used) {
      percents.used = (used / 1000) * 100;
    }
    if (free) {
      percents.free = (free / 1000) * 100;
    }

    return percents;

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }

  changeTab(is24G, click?) {
    if (click && this.showTab24G === is24G) return;
    this.loading = true;
    this.showTab24G = is24G ? true : false;
    let chartData = this.chartData24G, type = '2.4G';
    if (!this.showTab24G) {
      chartData = this.chartData5G;
      type = '5G';
    }

    if (chartData) {
      this.chartOptions = this.options.ChannelScoreChartOptions(chartData, type, this.language, this.channelChangeLogsData, this.ssidSelfHeal, this.radioSummary);
      this.Highcharts.chart('channel-scores-chart', this.chartOptions);
      this.showChart = true;
      this.loading = false;
    } else {
      this.showChart = false;
      this.loading = false;
    }

  }
}