import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { combineLatest, ObjectUnsubscribedError, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Component({
  selector: 'app-historical-air-time',
  templateUrl: './historical-air-time.component.html',
  styleUrls: ['./historical-air-time.component.scss']
})
export class HistoricalAirTimeComponent implements OnInit, OnChanges, OnDestroy {

  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('interval') interval;
  @Input('refStartTime') refStartTime;
  @Input('refEndTime') refEndTime;
  @Input('reportRangeSelected') reportRangeSelected;
  @Input('show5gWidgets') show5gWidgets;
  @Input('metaData') metaData;

  Highcharts = Highcharts;
  chartData: any = [];

  chartData24G: any = [];
  chartData5G: any = [];

  chartOptions24G: any;
  chartOptions5G: any;
  showChart24G: boolean = false;
  showChart5G: boolean;
  showChart: boolean = false;
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  loading: boolean = true;
  showTabName: string = '1'; //1 - 2.4G, 2 - 5G, 3 - 6G
  chartOptionsSubs: any;
  constructor(
    private api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    public ssoAuthService: SsoAuthService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.changeTab(this.showTabName);
    });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.chartOptionsSubs) this.chartOptionsSubs.unsubscribe();
  }

  loadChart() {
    this.changeTab(this.showTabName);
  }

  changeTab(is24G, click?) {
    if (click && this.showTabName === is24G) return;
    this.loading = true;
    this.showTabName = is24G;
    this.getChartData();

  }

  getChartData() {
    this.loading = true;
    this.closeAlert();
    if (this.interval == 'hr') {
      this.interval = '1h';
    }
    let url = `${environment.SUPPORT_URL}/device/${this.orgId}/${this.fsan}/wifi/historicalRadioAirTime?startTime=${this.refStartTime}&endTime=${this.refEndTime}&interval=${this.interval}&radio=${this.showTabName}`;
    this.api.getHistoryAirtimeAnalysis(url).subscribe((res: any) => {
      if (res && res.length) {
        this.appendChart(res);
      } else {
        this.appendChart([]);
      }
    }, (err: HttpErrorResponse) => {
      this.appendChart([]);
      //this.loading = false;
    })

  }

  appendChart(chartData) {
    let type = '2.4GHz';
    if (this.showTabName == '2') {
      type = '5GHz';
    } else if (this.showTabName == '3') {
      type = '6GHz';
    }
    chartData = (chartData && chartData.length) ? chartData : [];
    this.chartOptionsSubs = this.options.historicalAirtimeAnlysis(chartData, this.reportRangeSelected, type, this.language).subscribe((res: any) => {
      this.Highcharts.chart('history-air-time-chart', res);
      this.showChart = true;
      this.loading = false;
    });
  }

  modifyDate(datestr: string) {
    let dt = datestr.split('.')[0] + 'Z';
    return dt;
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


}