import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TrafficeRealtimeOptionsManagerService } from '../shared/traffic-realtime-options-manger.service';
import { Options } from '@angular-slider/ngx-slider';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { delay } from 'rxjs/operators';
import { maskString } from '../../shared/functions/cco-mask';

let TopEP = 'TEP',
  TopApp = 'TAPP',
  TopLoc = 'TLOC';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit, OnDestroy {

  language: any;
  languageSubject;
  pageAvailable: boolean = false;
  topEndPointUpChartoptions: any;

  topEndPointDownChartoptions: any;
  topAppsUpChartoptions: any;
  topAppsDownChartoptions: any;
  topLocationsUpChartoptions: any;
  topLocationsDownChartoptions: any;
  selectedTopLength = 5;
  topLengths: any = [];
  updateFlag: boolean = true;

  fsView: boolean = false;

  Highcharts = Highcharts;
  loading: boolean;
  rate: string = '';
  packet: string = '';

  windowLen: any = 5;

  errorInfo = "";

  ddoptions = [
    { id: 1, name: '5 Minutes window' },
    { id: 2, name: '10 Minutes window' },
    { id: 3, name: '15 Minutes window' },
    { id: 4, name: '20 Minutes window' },
    { id: 5, name: '25 Minutes window' },
    { id: 6, name: '30 Minutes window' }
  ];
  selectedOption: number = 1;
  selectedTime: number = 1
  orgId: any;
  orgid_tenantid: any;

  delay: any;
  delaySub: any;
  hasLocationAccess = false;
  hasApplicationAccess = false;
  hasNetworkAccess = false;
  ORG_ID: string;
  discoveredCount = 0;
  mappedCount = 0;
  mappedPercentage: any = 0;
  mappedPercentage$ = new Subject();
  mappedSubscription: any;

  //ngx-slider - range slider
  options: Options = {
    floor: 0,
    ceil: 100
  };


  totalTime = 7200;
  playedTime = 7200;

  totalTimeStr = '';
  playedTimeStr = '';

  startTime: any = 1631005316000;
  endTime: any = 1631012516000;

  play = false;

  showAction = false;
  toggleShowAction() {
    this.showAction = !this.showAction;
  }

  topEPs = [
    {
      name: 'Top 5 Endpoints',
      value: 5
    },
    {
      name: 'Top 10 Endpoints',
      value: 10
    },
    {
      name: 'Top 20 Endpoints',
      value: 20
    },
    {
      name: 'Top 30 Endpoints',
      value: 30
    },
  ];

  topAPPs = [
    {
      name: 'Top 5 Applications',
      value: 5
    },
    {
      name: 'Top 10 Applications',
      value: 10
    },
    {
      name: 'Top 20 Applications',
      value: 20
    },
    {
      name: 'Top 30 Applications',
      value: 30
    },
  ];

  topLOCs = [
    {
      name: 'Top 5 Locations',
      value: 5
    },
    {
      name: 'Top 10 Locations',
      value: 10
    },
    {
      name: 'Top 20 Locations',
      value: 20
    },
    {
      name: 'Top 30 Locations',
      value: 30
    },
  ];

  recordingId: any = '';

  traffic = {
    endpoints: false,
    applications: false,
    locations: false,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customTranslateService: TranslateService,
    private sso: SsoAuthService,
    private optnsMngr: TrafficeRealtimeOptionsManagerService,
    private websocketservice: WebsocketService,
    private http: HttpClient,
    private dateUtils: DateUtilsService,
    private commonOrgService: CommonService,
    private titleService: Title,
    private commonService: CommonFunctionsService
  ) {
    this.commonOrgService.recordView.show = true;

    this.titleService.setTitle('Traffic Recording - Traffic - Operations - Calix Cloud');
    this.route.queryParams.subscribe((params: any) => {
      if (params['id']) {
        this.recordingId = params['id'];
        this.getRecordDataById();
      }
    });

    this.ORG_ID = this.sso.getOrganizationID(this.router.url);
    if (window.location.pathname.includes('/organization-admin/flowAnalyze/') || window.location.pathname.includes('/systemAdministration/flowAnalyze/')) {
      this.commonService.showTabMenu$.next(false);
      this.commonOrgService.currentPageAdder('flowAnalyze');
    }
  }

  ngOnInit() {
    this.totalTimeStr = this.dateUtils.convertSecondsToTime(this.totalTime);
    this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);

    this.options = {
      floor: 0,
      showSelectionBar: true,
      ceil: this.totalTime
    };

    //this.playedTime = this.playedTime;

    this.language = this.customTranslateService.defualtLanguage;
    this.rate = this.language.RATE;
    this.packet = this.language.PACKET;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {

      this.rate = data.RATE;
      this.packet = data.PACKET;
      this.language = data;
      this.ddoptions = [
        { id: 1, name: this.language['5 Minutes window'] },
        { id: 2, name: this.language['10 Minutes window'] },
        { id: 3, name: this.language['15 Minutes window'] },
        { id: 4, name: this.language['20 Minutes window'] },
        { id: 5, name: this.language['25 Minutes window'] },
        { id: 6, name: this.language['30 Minutes window'] }
      ];
    })


    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network.realtime') !== -1) {
            this.hasNetworkAccess = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.realtime') !== -1) {
            this.hasLocationAccess = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications.realtime') !== -1) {
            this.hasApplicationAccess = true;
          }
        }
      }
    } else {
      this.hasNetworkAccess = true;
      this.hasLocationAccess = true;
      this.hasApplicationAccess = true;
    }

    // if (!this.hasNetworkAccess) {
    //   this.router.navigate(['/cco/traffic/network/reports']);
    //   return;
    // }

    //this.getRtData();

    this.topLengths = [
      { name: 'Top 5', value: 5 },
    ];

  }

  createTopLengthItems() {
    this.topLengths = [
      {
        name: 'Top 5 ' + this.fsChartDetails.title,
        value: 5
      },
      {
        name: 'Top 10 ' + this.fsChartDetails.title,
        value: 10
      },
      {
        name: 'Top 20 ' + this.fsChartDetails.title,
        value: 20
      },
      {
        name: 'Top 30 ' + this.fsChartDetails.title,
        value: 30
      },
    ];
  }

  fsChartDetails: any = {};
  fsChartOptionsUp: any;
  fsChartOptionsDown: any;
  screenWidth: any;
  screenHeight: any;
  showChart = false;
  fsName: string = '';

  fullscreen(whichTop: string) {
    this.fsChartDetails = {
      topChart: whichTop
    };
    this.fsView = true;
    this.fsName = whichTop;
    this.modifyCurrentOptionsToFS(whichTop);
    this.createTopLengthItems();

  }

  closeFullscreen() {

    this.selectedTopLength = 5;

    this.fsView = false;
    if (this.fsName === 'TEP') {
      let data = this.gettepData();
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.gettapData();
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.gettlocData();
      this.makeTLOCEvents(data);
    }
    this.fsName = '';
    this.fsChartDetails = {};
  }


  modifyCurrentOptionsToFS(chart: any) {
    switch (chart) {
      case 'TEP':
        this.fsChartDetails = {
          topChart: 'TEP',
          title: 'Endpoints'
        };
        let data = this.gettepData();
        this.makeTEPEvents(data);
        break;

      case 'TAPP':
        this.fsChartDetails = {
          topChart: 'TAPP',
          title: 'Applications'
        };
        let dataTapp = this.gettapData();
        this.makeTAPPEvents(dataTapp);
        break;

      case 'TLOC':
        this.fsChartDetails = {
          topChart: 'TLOC',
          title: 'Locations'
        };
        let dataTloc = this.gettlocData();
        this.makeTLOCEvents(dataTloc);
        break;
      default:
    }
  }

  reload = false;
  sliderEvent() {
    this.reload = false;
    this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);
    setTimeout(() => {
      this.reload = true;
      this.startBarChartTimer();
    }, 500);

  }

  playInterval: any;

  playVideo() {
    this.play = true;
    this.reload = true;
    if (this.totalTime && this.totalTime === this.playedTime) {
      this.playedTime = 0;
    }

    this.startBarChartTimer();

    this.playInterval = setInterval(() => {

      if (this.totalTime && this.totalTime === this.playedTime) {
        this.showAction = false;
        clearInterval(this.playInterval);
        return;
      }

      this.playedTime++;
      this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);


    }, 1000);


  }

  pauseVideo() {
    this.play = false;
    clearInterval(this.playInterval);
    this.stopBarChartTimer();
  }

  clearFilter() {
    this.selectedOption = 1;
    this.selectedTime = 1
  }


  getFSPointWidth(len: number | string) {
    let width = 14;

    if (len <= 5) {
      width = 14;
    } else if (len <= 10) {
      width = 8;
    } else if (len <= 20) {
      width = 4;
    } else if (len <= 30) {
      width = 2;
    }

    return width;
  }

  ngOnDestroy() {

    this.stopBarChartTimer();

    this.websocketservice.clearRecordRtInfo();
    this.commonService.showTabMenu$.next(true);
    this.commonOrgService.recordView.show = false;

  }

  data: any = {
    maxRate: [],
    packet: []
  };


  showRealTime = false;

  tAPrcntData = {
    downPercentage: '0',
    upPercentage: '0'
  };
  tLPrcntData = {
    downPercentage: '0',
    upPercentage: '0'
  };
  tEPrcntData = {
    downPercentage: '0',
    upPercentage: '0'
  };

  tAData = {
    upData: [],
    downData: []
  };
  tLData = {
    upData: [],
    downData: []
  };
  tEPData = {
    upData: [],
    downData: []
  };


  showBars = false;
  showTEPBars = false;

  rtSubscription: any;
  ratePacketStreamSubscription: any;
  cacheDataSubscription: any;

  tepSelectedTopLength = 5;
  tappSelectedTopLength = 5;
  tlocSelectedTopLength = 5;

  makeTEPEvents(data: any): any {
    if (sessionStorage.getItem('showSensitiveInfo') != 'true') {
      data.upData?.forEach(x => x.name = maskString(x.name))
      data.downData?.forEach(x => x.name = maskString(x.name))
    }
    this.tEPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TEP') ? this.selectedTopLength : this.tepSelectedTopLength;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.tEPrcntData.upPercentage = this.websocketservice.calculatePercentage(data.upTotal, data.upData, len);
    this.tEPrcntData.downPercentage = this.websocketservice.calculatePercentage(data.downTotal, data.downData, len);

    this.settepData(data);

    this.tEPData["upData"] = data.upData;
    this.tEPData["downData"] = data.downData;

    let topEndPointUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len);
    let topEndPointDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len);


    topEndPointUpChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 160;

    topEndPointUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(upLen) : 14;

    topEndPointDownChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 160;
    topEndPointDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(downLen) : 14;

    topEndPointDownChartoptions.plotOptions.series.color = '#5ACFEA';
    topEndPointDownChartoptions.plotOptions.series.cursor = null;
    topEndPointUpChartoptions.plotOptions.series.cursor = null;

    topEndPointUpChartoptions = Object.assign({}, topEndPointUpChartoptions);
    topEndPointDownChartoptions = Object.assign({}, topEndPointDownChartoptions);

    this.topEndPointUpChartoptions = topEndPointUpChartoptions;
    this.topEndPointDownChartoptions = topEndPointDownChartoptions;

  }

  makeTLOCEvents(data: any): any {
    //let data: any = this.tAData;
    if ((data.upData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000")) > -1) {
      data.upData.splice(data.upData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000"), 1);
    }
    if ((data.downData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000")) > -1) {
      data.downData.splice(data.downData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000"), 1);
    }
    this.tLPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TLOC') ? this.selectedTopLength : this.tlocSelectedTopLength;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.tLPrcntData.upPercentage = this.websocketservice.calculatePercentage(data.upTotal, data.upData, len);
    this.tLPrcntData.downPercentage = this.websocketservice.calculatePercentage(data.downTotal, data.downData, len);

    this.settlocData(data);

    this.tLData["upData"] = data.upData;
    this.tLData["downData"] = data.downData;

    let topLocationsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len);
    let topLocationsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len);

    topLocationsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 160;
    delete topLocationsUpChartoptions.chart.width;
    topLocationsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(upLen) : 14;

    topLocationsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 160;
    delete topLocationsDownChartoptions.chart.width;
    topLocationsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(downLen) : 14;

    topLocationsDownChartoptions.plotOptions.series.color = '#5ACFEA';
    topLocationsUpChartoptions.plotOptions.series.cursor = null;
    topLocationsDownChartoptions.plotOptions.series.cursor = null;


    this.topLocationsUpChartoptions = { ...topLocationsUpChartoptions };
    this.topLocationsDownChartoptions = { ...topLocationsDownChartoptions };
  }

  makeTAPPEvents(data?: any): any {

    this.tAPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TAPP') ? this.selectedTopLength : this.tappSelectedTopLength;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.tAPrcntData.upPercentage = this.websocketservice.calculatePercentage(data.upTotal, data.upData, len);
    this.tAPrcntData.downPercentage = this.websocketservice.calculatePercentage(data.downTotal, data.downData, len);

    this.settapData(data);

    this.tAData["upData"] = data.upData;
    this.tAData["downData"] = data.downData;

    let topAppsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len);
    let topAppsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len);

    topAppsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 160;
    delete topAppsUpChartoptions.chart.width;
    topAppsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(upLen) : 14;

    topAppsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 160;
    delete topAppsDownChartoptions.chart.width;
    topAppsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(downLen) : 14;

    topAppsDownChartoptions.plotOptions.series.color = '#5ACFEA';
    topAppsUpChartoptions.plotOptions.series.cursor = null;
    topAppsDownChartoptions.plotOptions.series.cursor = null;

    this.topAppsUpChartoptions = { ...topAppsUpChartoptions };
    this.topAppsDownChartoptions = { ...topAppsDownChartoptions };

  }

  cachePacketData: any = {};
  cacheRateData: any = {};
  rateUnit = 'bps';
  packetUnit = 'pps';


  changeTopLength(type?: any): void {

    if (type === 'TEP') {
      this.makeTEPEvents(this.gettepData());
    } else if (type === 'TAPP') {
      this.makeTAPPEvents(this.gettapData());
    } else if (type === 'TLOC') {
      this.makeTLOCEvents(this.gettlocData());
    }

  }

  public settepData(data: any): any {
    window.sessionStorage.setItem('calix.record_tep_data', JSON.stringify(data));

  }

  public gettepData(): any {
    return window.sessionStorage.getItem('calix.record_tep_data') ? JSON.parse(window.sessionStorage.getItem('calix.record_tep_data')) : {};
  }

  public settapData(data: any): any {
    window.sessionStorage.setItem('calix.record_tap_data', JSON.stringify(data));

  }

  public gettapData(): any {
    return window.sessionStorage.getItem('calix.record_tap_data') ? JSON.parse(window.sessionStorage.getItem('calix.record_tap_data')) : {};
  }


  public settlocData(data: any): any {
    window.sessionStorage.setItem('calix.record_tloc_data', JSON.stringify(data));

  }

  public gettlocData(): any {
    return window.sessionStorage.getItem('calix.record_tloc_data') ? JSON.parse(window.sessionStorage.getItem('calix.record_tloc_data')) : {};
  }
  check(value) {

  }
  navigationByUrl(category, id, module) {
    if (id) {
      var data = {
        category: category,
        endPointId: id
      }
      this.sso.setEPRredirectFrom(window.location.pathname);

      this.router.navigate(['/cco/traffic/endpoints/realtime'], { queryParams: { id: id } });

    }
  }


  onclickCopy(value: any) {
    let selBox = document.createElement('input');
    selBox.style.position = 'fixed';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  tempTLOCData: any = {};
  tempTAPPData: any = {};
  tempTEPData: any = {};
  barChartTimer: any;


  processOtherGT() {
    let data = this.barChartData;
    //this.websocketservice.getDataForAllGraphTypes();
    let keys = Object.keys(data);
    if (!keys.length) {

      return;
    }



    let index = (this.playedTime && this.playedTime > 14) ? Math.floor(this.playedTime / 15) : 0;
    let startTime = Number(keys[0]);
    if (this.showRealTime) {
      startTime = Number(keys[index]);
    } else {
      startTime = Number(keys[keys.length - 1]);
    }


    let i = 0;
    if (this.play) {
      this.stopBarChartTimer();
      this.barChartTimer = setInterval(() => {
        let temp = startTime + i * 1000;

        if (data[temp]) {

          if (data[temp]['TAPP']) {
            this.makeTAPPEvents(data[temp]['TAPP']);
          }

          if (data[temp]['TLOC']) {
            this.makeTLOCEvents(data[temp]['TLOC']);
          }

          if (data[temp]['TEP']) {
            this.makeTEPEvents(data[temp]['TEP']);
          }

        }
        i++;


      }, 1000);
    } else {
      let temp = startTime;

      if (data[temp]) {

        if (data[temp]['TAPP']) {
          this.makeTAPPEvents(data[temp]['TAPP']);
        }

        if (data[temp]['TLOC']) {
          this.makeTLOCEvents(data[temp]['TLOC']);
        }

        if (data[temp]['TEP']) {
          this.makeTEPEvents(data[temp]['TEP']);
        }

      }
    }

  }

  stopBarChartTimer() {
    if (this.barChartTimer) {
      clearInterval(this.barChartTimer);
    }
  }

  startBarChartTimer() {
    this.stopBarChartTimer();
    this.processOtherGT();
  }

  barChartData = {};
  streamChartData = {};
  getRecordDataById() {
    this.loading = true;
    let params = {
      recordingId: this.recordingId,
      orgId: this.sso.getOrganizationID(this.router.url)
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || params[key] === []) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    this.http.get(`${environment.API_BASE_URL}record/download/files?${query}`).subscribe((resp: any) => {
      //this.http.get(`assets/data/164.json`).pipe(delay(1000)).subscribe((resp: any) => {
      this.http.get(`${resp.url}`).subscribe((resp: any) => {
        this.loading = false;
        let data = this.websocketservice.prepareAndGetRecordData(resp);

        if (data && data.stream) {
          this.cachePacketData = data.stream['packet'];
          this.cacheRateData = data.stream['rate'];

          if (Object.keys(data.stream['packet']).length) {
            let keys = Object.keys(data.stream['packet']);
            this.startTime = (Number(keys[0])) * 1000;
            this.endTime = Number(keys[keys.length - 1]) * 1000;
            this.totalTime = Number(keys[keys.length - 1]) - Number(keys[0]) + 1;
            this.playedTime = this.totalTime;
            this.totalTimeStr = this.dateUtils.convertSecondsToTime(this.totalTime);
            this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);

            this.options = {
              floor: 0,
              showSelectionBar: true,
              ceil: this.totalTime
            };

          }
        }

        if (data && data.bar) {
          this.barChartData = data.bar;
        }

        this.getData();
        this.processOtherGT();
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.setErrorInfo(this.commonOrgService.pageErrorHandle(err));
      });
    }, (err) => {
      this.loading = false;
      this.setErrorInfo(this.commonOrgService.pageErrorHandle(err));
    })
  }

  recordInfo: any;
  getData() {

    this.http.get(`${environment.API_BASE_URL}record/job/list/${this.recordingId}?orgId=${this.ORG_ID}&tenentid=0`).subscribe((data: any) => {
      this.recordInfo = data;
      let keys = Object.keys(this.cacheRateData)
      if (this.totalTime < keys.length) {
        if (Math.floor((data.length / 1000)) > Math.floor((this.endTime - this.startTime) / 1000)) {
          let len = Math.floor((data.length / 1000)) - Math.floor((this.endTime - this.startTime) / 1000);
          this.endTime = this.endTime + (len * 1000);
        }
        this.totalTime = Math.floor((data.length / 1000));
        this.playedTime = this.totalTime;
        this.totalTimeStr = this.dateUtils.convertSecondsToTime(this.totalTime);
        this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);
        this.options = {
          floor: 0,
          showSelectionBar: true,
          ceil: this.totalTime
        };
      }
      if (this.totalTime > keys.length && (this.totalTime - keys.length) <= 15) {
        this.totalTime = Math.floor((data.length / 1000));
        this.playedTime = this.totalTime;
        this.totalTimeStr = this.dateUtils.convertSecondsToTime(this.totalTime);
        this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);
        this.options = {
          floor: 0,
          showSelectionBar: true,
          ceil: this.totalTime
        };
        let diff = this.totalTime - keys.length;
        let lastKey = keys[keys.length - 1]
        for (let i = 1; i <= diff; i++) {
          let newKey = parseInt(lastKey) + i;
          this.cacheRateData[newKey] = this.cacheRateData[lastKey];
          this.cachePacketData[newKey] = this.cachePacketData[lastKey];
        }
      }
      if (this.totalTime == keys.length) {
        this.totalTime = Math.floor((data.length / 1000));
        this.playedTime = this.totalTime;
        this.totalTimeStr = this.dateUtils.convertSecondsToTime(this.totalTime);
        this.playedTimeStr = this.dateUtils.convertSecondsToTime(this.playedTime);
        this.options = {
          floor: 0,
          showSelectionBar: true,
          ceil: this.totalTime
        };
      }

      if (data && data.monitorType) {
        if (data.monitorType === 'LOC') {
          this.traffic = {
            endpoints: true,
            applications: true,
            locations: false,
          }
        } else if (data.monitorType === 'APP') {
          this.traffic = {
            endpoints: true,
            applications: false,
            locations: true,
          }
        } else if (data.monitorType === 'NET') {
          this.traffic = {
            endpoints: true,
            applications: true,
            locations: true,
          }
        } else if (data.monitorType === 'EP') {
          this.traffic = {
            endpoints: true,
            applications: true,
            locations: false,
          }
        }
      }

      this.showRealTime = true;
    }, (err) => {
      this.loading = false;

      this.setErrorInfo(this.commonOrgService.pageErrorHandle(err));
    });
  }

  setErrorInfo(err?: any) {
    this.errorInfo = err;
  }

  goToRecordList() {
    window.history.back();
    // this.router.navigate(['/cco/record/list']);
  }
}
