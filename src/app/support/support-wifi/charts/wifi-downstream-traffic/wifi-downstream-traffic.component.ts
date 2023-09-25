import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
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
  selector: 'app-wifi-downstream-traffic',
  templateUrl: './wifi-downstream-traffic.component.html',
  styleUrls: ['./wifi-downstream-traffic.component.scss']
})
export class WifiDownstreamTrafficComponent implements OnInit {

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
  chartOptions: any;
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

  ngOnChanges() {
    // if (this.parallelReqSubscribtion) {
    //   this.parallelReqSubscribtion.unsubscribe();
    // }
    // this.closeAlert();
    // this.getData();
  }

  ngOnDestroy() {
    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }
    if (this.languageSubject) this.languageSubject.unsubscribe();
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
    if (click && this.showTabName === is24G) return;
    this.loading = true;
    this.showTabName = is24G;
    this.getChartData();

  }

  loadChart() {
    this.changeTab(this.showTabName);
  }

  getChartData() {
    this.loading = true;
    this.closeAlert();

    let url = `${environment.SUPPORT_URL}/device/${this.fsan}/wifi/downstream?startTime=${this.refStartTime}&endTime=${this.refEndTime}&interval=${this.interval}&radio=${this.showTabName}`;
    this.api.getDownstreamData(url).subscribe((res: any) => {
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
    let type = '2.4G';
    if (this.showTabName == '2') {
      type = '5G';
    } else if (this.showTabName == '3') {
      type = '6G';
    }
    chartData = (chartData && chartData.length) ? chartData : [];
    this.chartOptions = this.options.getDownstreamOptions(chartData, type, this.language);
    setTimeout(() => {
      this.Highcharts.chart('downstream-chart', this.chartOptions);
      this.showChart = true;
      this.loading = false;
    }, 50);

  }

  getDummy() {
    return [{ "timestamp": 1608267600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608292800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608282000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608274800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608303600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608343200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608350400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608375600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608454800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608436800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608393600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608476400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608483600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608480000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608487200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608505200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608516000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608512400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608526800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608519600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608541200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608530400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608606000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608627600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608638400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608634800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608642000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608645600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608652800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608649200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608660000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608674400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608692400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608688800, "packetstransmitteddownstream": 6, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608696000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608699600, "packetstransmitteddownstream": 8, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608706800, "packetstransmitteddownstream": 18, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608703200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608714000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608710400, "packetstransmitteddownstream": 80, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608721200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608717600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608728400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608724800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608732000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608735600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608739200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608742800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608746400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608768000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608771600, "packetstransmitteddownstream": 27, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 1 }, { "timestamp": 1608760800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608778800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608775200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608782400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608786000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608789600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608793200, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608807600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608814800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608796800, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608804000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608296400, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608822000, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }, { "timestamp": 1608825600, "packetstransmitteddownstream": 0, "packetsdroppeddownstream": 0, "packetretransmitteddownstream": 0 }];
  }


}
