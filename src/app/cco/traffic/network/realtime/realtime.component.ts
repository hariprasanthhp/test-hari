import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { FilterPresets } from '../../shared/favorites-api.service';
let TopEP = 'TEP',
  TopApp = 'TAPP',
  TopLoc = 'TLOC';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit, OnDestroy, AfterViewInit {
  language: any;
  languageSubject;
  pageAvailable: boolean = false;
  topEndPointUpChartData: any;
  topEndPointUpXaxisArray = [];
  topEndPointUpXaxisIdArray = [];
  topEndPointUpXaxisSelection: boolean = false;
  topEndPointUpChartoptions: any;
  topEndPointUpChartSeriesData: any;

  topEndPointDownChartData: any;
  topEndPointDownXaxisArray = [];
  topEndPointDownXaxisIdArray = []
  topEndPointDownXaxisSelection: boolean = false;
  topEndPointDownChartoptions: any;
  topEndPointDownChartSeriesData: any;

  topAppsUpChartData: any;
  topAppsUpXaxisArray = [];
  topAppsUpXaxisIdArray = []
  topAppsUpXaxisSelection: boolean = false;
  topAppsUpChartoptions: any;
  topAppsUpChartSeriesData: any;

  topAppsDownChartSeriesData: any;
  topAppsDownChartData: any;
  topAppsDownXaxisArray = [];
  topAppsDownXaxisIdArray = []
  topAppsDownXaxisSelection: boolean = false;
  topAppsDownChartoptions: any;

  topLocationsUpChartData: any;
  topLocationsUpXaxisArray = [];
  topLocationsUpXaxisIdArray = [];
  topLocationsUpXaxisSelection: boolean = false;
  topLocationsUpChartoptions: any;
  topLocationsUpChartSeriesData: any;

  topLocationsDownChartSeriesData: any;
  topLocationsDownChartData: any;
  topLocationsDownXaxisArray = [];
  topLocationsDownXaxisIdArray = [];
  topLocationsDownXaxisSelection: boolean = false;
  topLocationsDownChartoptions: any;



  selectedTopLength = 5;
  topLengths: any = [];
  updateFlag: boolean = true;

  fsView: boolean = false;
  fsChartDetails: any = {};
  fsChartOptionsUp: any;
  fsChartOptionsDown: any;
  screenWidth: any;
  screenHeight: any;
  showChart = false;

  Highcharts = Highcharts;
  checkAllInterval: any;
  checkAllOptionsInterval: any;
  loading: boolean = true;

  recordingComponent: any = Component;
  favoriteComponent: any = Component;
  startDate: any = new Date();
  recordName: string;
  rate: string = '';
  packet: string = '';
  @ViewChild('realtimeFavCreatePop', { static: true }) realtimeFavCreatePop: TemplateRef<any>;
  @ViewChild('recordCreatePop', { static: true }) recordCreatePop: TemplateRef<any>;


  createFavorite: boolean = true;
  createRecord: boolean = true;
  windowLen: any = 5;

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
  sensitiveChecked = false;

  //@ViewChild(StreamChartComponent) streamChart: StreamChartComponent;
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  orgId: any;
  orgid_tenantid: any;

  wsDelay: any;
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
  hasWriteAccess: boolean = false;
  isCcoTraffic: boolean = false;
  connectSubs: any;

  secureAccessRole: any;
  orgidfromlocal: any;
  loginData: any;

  endpointSensitiveData: any;

  constructor(
    private router: Router,
    private customTranslateService: TranslateService,
    private sso: SsoAuthService,
    private optnsMngr: TrafficeRealtimeOptionsManagerService,
    private websocketservice: WebsocketService,
    private http: HttpClient,
    private dialogService: NgbModal,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
    private callOutComeService: CallOutComeService,
    private dateUtils: DateUtilsService,
  ) {

    if (this.websocketservice.previousURL.includes("/cco/traffic/locations/reports") ||
      this.websocketservice.previousURL.includes("/cco/traffic/applications/reports")) {
      this.router.navigate(['/cco/traffic/network/reports']);
      return;
    } else {
      this.websocketservice.previousURL = ""
    }
    if (window.location.pathname.indexOf('/cco/traffic/') > -1) {
      this.isCcoTraffic = true;
    }

    this.websocketservice.rtData$.next({});
    this.websocketservice.ratePacketStreamData$.next({});
    this.websocketservice.setMonitorType("NET");

    //this.checkAllOptions();
    this.loading = true;
    let breadCrumb = {
      mainRouteKeyName: 'network',
      mainRoute: '/fa/network',
      subRouteKeyName: 'networkMenuRealTime',
      subRoute: '/fa/network/realtime',
      setSchedule: false
    }
    // this.ORG_ID = this.sso.getOrgId();
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
  }
  setTitle(url) {
    if (this.isCcoTraffic) {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Network']} - ${this.language['Traffic']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Network']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit() {
    this.sensitiveChecked = sessionStorage.getItem("showSensitiveInfo") == "true" ? true : false;
    let that = this;
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        if (that.websocketservice.getCurrentMonitorInfo('NET')) {
          let filterData = that.websocketservice.getCurrentMonitorInfo('NET');
          if (filterData && filterData['monitorId'] && filterData['monitorId'] === that.orgid_tenantid) {
            let params = {
              "orgId": filterData.orgId,
              "monitorType": "NET",
              "networkId": filterData['networkId'],
              "monitorId": filterData['monitorId'],
              "graphType": "TRF",
              "replay": "true",
              "startTime": filterData['startTime'],
              "endTime": (new Date()).getTime()
            };

            that.send("NET", params);
            return;
          }
          that.websocketservice.listen('REPLAY');
        }
      }
    });

    // this.watchEPSearch();
    // this.websocketservice.getUnSignedUrl().subscribe((res: any) => {
    //   this.websocketservice.Checkconnectornot(res.signedurl);
    // });
    this.webSocketConnectionError();
    this.getRecordingStatus();
    this.checkLastSubscriptiontime();
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
        { id: 1, name: '5 Minutes window' },
        { id: 2, name: '10 Minutes window' },
        { id: 3, name: '15 Minutes window' },
        { id: 4, name: '20 Minutes window' },
        { id: 5, name: '25 Minutes window' },
        { id: 6, name: '30 Minutes window' }
      ];

      if (this.fsView) {
        this.createTopLengthItems();
      }

      this.topAppsUpChartoptions = null;
      this.topAppsDownChartoptions = null;
      this.topEndPointUpChartoptions = null;
      this.topEndPointDownChartoptions = null;
      this.topLocationsUpChartoptions = null;
      this.topLocationsDownChartoptions = null;

      setTimeout(() => {
        let epData = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
        this.makeTEPEvents(epData);
        let appData = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
        this.makeTAPPEvents(appData);
        let locData = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
        this.makeTLOCEvents(locData);
      }, 300)
      this.setTitle(this.router.url)
    })

    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && this.isCcoTraffic) {
      if (scopes && (scopes['cloud.rbac.coc.traffic.network.realtime'].indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      }
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

    if (!this.hasNetworkAccess) {
      this.sso.setPageAccess(false);
      this.router.navigate(['/cco/traffic/network/reports']);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.delaySub = this.websocketservice.delay$.subscribe((res: any) => {
      if (res) {
        //this.loading = false;
        this.wsDelay = (Math.abs(this.sso.getRealtimeDelay()) / 60000);
        this.wsDelay = Number.isInteger(this.wsDelay) ? this.wsDelay : this.wsDelay.toFixed(1);
      }
    })

    this.getCount();
    this.getMappedPercentage();
    this.getRtData();
    this.optnsMngr.removeTopNTrafficFromLS();

    this.topLengths = [
      { name: 'Top 5', value: 5 },
    ];

    // this.orgId = this.sso.getOrgId();
    let url = this.router.url;
    this.orgId = this.sso.getOrganizationID(url);
    this.orgid_tenantid = this.orgId + '_' + '0';

    //this.websocketservice.removeExistingListeners();

    if (this.websocketservice.getCurrentMonitorInfo('NET')) {
      let filterData = this.websocketservice.getCurrentMonitorInfo('NET');
      if (filterData && filterData['monitorId'] && filterData['monitorId'] === this.orgid_tenantid) {

        if (this.websocketservice.getWindowLen()) {
          this.selectedOption = this.websocketservice.getWindowLen();
          this.selectedTime = this.websocketservice.getWindowLen();
        }

        let params = {
          "orgId": filterData.orgId,
          "monitorType": "NET",
          "networkId": filterData['networkId'],
          "monitorId": filterData['monitorId'],
          "graphType": "TRF",
          "replay": "true",
          "startTime": filterData['startTime'],
          "endTime": (new Date()).getTime()
        };

        this.send("NET", params);

        //this.send("REPLAY", filterData);
        return;
      }

    }

    this.connectSubs = this.websocketservice.connectWS$.subscribe((res: any) => {
      if (res && !this.websocketservice.WebSocketServer.hasDisconnectedOnce) {
        console.log("trying to send the message after successfull connection ");
        this.websocketservice.listen('NET');
        this.websocketservice.listen('REPLAY');
        this.websocketservice.listen('error_traffic_NET');

        let obj = {
          "orgId": this.orgId,
          "monitorType": "NET",
          "networkId": this.orgid_tenantid,
          "monitorId": this.orgid_tenantid,
          "graphType": "TRF,TAPP,TLOC,TEP"
        }
        this.send("NET", obj);
      }
    });

    this.websocketservice.setWindowLen(this.selectedOption);

    // this.delaySub = this.websocketservice.delayTime$.subscribe((val: any) => {
    //   this.delay = Math.round(this.websocketservice.getMinutesByMillis(val));
    // })
    this.reConnectWebSocket();
    setTimeout(() => {
      this.loading = false;
    }, 15000)
    this.orgidfromlocal = localStorage.getItem('calix.org_id') ?? ' ';
    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    if (sessionStorage.getItem('Orgacceforssid')) {
      this.secureAccessRole = 'Calix'
    }
    else {
      this.secureAccessRole = 'BSP'
    }

  }

  getCount() {
    let mappedUrl = `${environment.faAdminCorrelatorURL}flowendpoint/count?discovered=true&org-id=${this.ORG_ID}`;
    this.http.get(mappedUrl).subscribe((res: any) => {
      this.mappedCount = res;
      this.discoveredCount = this.discoveredCount + res;
      this.mappedPercentage$.next();
    }, (err) => {
    })

    let unmappedUrl = `${environment.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${this.ORG_ID}&source=true`;
    this.http.get(unmappedUrl).subscribe((res: any) => {
      setTimeout(() => {
        this.discoveredCount = this.discoveredCount + res;
        this.mappedPercentage$.next();
      }, 500)
    }, (err) => {
    })
  }

  getMappedPercentage() {
    this.mappedSubscription = this.mappedPercentage$.subscribe(res => {
      this.mappedPercentage = (this.mappedCount / this.discoveredCount) * 100;
      this.mappedPercentage = this.mappedPercentage ? this.mappedPercentage.toFixed(2) : 0;
    })
  }

  send(eventname, data) {
    this.websocketservice.emit(eventname, data);
  }

  applyFilterOrModal(showSensitiveChecked: boolean, modal: any) {
    if (showSensitiveChecked && sessionStorage.getItem('showSensitiveInfo') != 'true') {
      this.modalOpener(modal);
    }
    else {
      sessionStorage.setItem('showSensitiveInfo', showSensitiveChecked ? 'true' : 'false');
      if (this.endpointSensitiveData) {
        this.makeTEPEvents(this.endpointSensitiveData);
      }
      this.applyFilter();
    }
  }

  onSelectFilterPreset(item: FilterPresets) {
    this.selectedOption = item.settingJsonTyped.timeFrame;
  }

  applyFilter() {
    this.selectedTime = this.selectedOption;
    if (this.websocketservice.getCurrentMonitorInfo('NET')) {
      let filterData = this.websocketservice.getCurrentMonitorInfo('NET');
      if (filterData && filterData['monitorId']) {
        let params = {
          "orgId": filterData["orgId"],
          "monitorType": "NET",
          "networkId": filterData["networkId"],
          "monitorId": filterData["monitorId"],
          "graphType": "TRF",
          "replay": "true",
          "startTime": filterData['startTime'],
          "endTime": (new Date()).getTime()
        };
        this.send("NET", params);
      }
    }
    this.websocketservice.listen('REPLAY');
  }

  clearFilter() {
    this.selectedOption = 1;
    this.selectedTime = 1
  }

  ngAfterViewInit() {
    this.favoriteComponent = this.realtimeFavCreatePop;
    this.recordingComponent = this.recordCreatePop;
  }


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
      //let data = this.optnsMngr.getTopEP();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      // let data = this.optnsMngr.getTopApp();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      //let data = this.optnsMngr.getTopLoc();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
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
        let data = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
        this.makeTEPEvents(data);
        break;

      case 'TAPP':
        this.fsChartDetails = {
          topChart: 'TAPP',
          title: 'Applications'
        };
        let dataTapp = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
        this.makeTAPPEvents(dataTapp);
        break;

      case 'TLOC':
        this.fsChartDetails = {
          topChart: 'TLOC',
          title: 'Locations'
        };
        let dataTloc = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
        this.makeTLOCEvents(dataTloc);
        break;
      default:
    }
  }


  getFSPointWidth(len: number | string) {
    let width = 14;
    switch (len) {
      case 5:
        width = 60;
        break;

      case 10:
        width = 30;
        break;

      case 20:
        width = 15;
        break;

      case 30:
        width = 10;
        break;
      default:
    }
    return width;
  }

  createTopLengthItems() {
    if (this.language && this.fsChartDetails.title) {
      this.topLengths = [
        {
          name: this.language['Top 5 ' + this.fsChartDetails.title],
          value: 5
        },
        {
          name: this.language['Top 10 ' + this.fsChartDetails.title],
          value: 10
        },
        {
          name: this.language['Top 20 ' + this.fsChartDetails.title],
          value: 20
        },
        {
          name: this.language['Top 30 ' + this.fsChartDetails.title],
          value: 30
        },
      ];
    }
  }

  ngOnDestroy() {

    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }

    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
    }

    if (this.epSearchSbcrptn) {
      this.epSearchSbcrptn.unsubscribe();
    }


    if (this.tASource) {
      this.tASource.close();
    }

    if (this.tESource) {
      this.tESource.close();
    }

    if (this.tLsource) {
      this.tLsource.close();
    }

    if (this.mappedSubscription) {
      this.mappedSubscription.unsubscribe();
    }

    this.websocketservice.clearReplayData();

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    let data: any = {}
    this.websocketservice.rtData$.next(data);

    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }

    if (this.connectionErSubscription) {
      this.connectionErSubscription.unsubscribe();
    }
    if (this.wsNoResponseSubscription) {
      this.wsNoResponseSubscription.unsubscribe();
    }
    if (this.statusSubs) {
      this.statusSubs.unsubscribe();
    }
    if (this.recordSubs) {
      this.recordSubs.unsubscribe();
    }
    if (this.recordErrorSubscription) {
      this.recordErrorSubscription.unsubscribe();
    }
    if (this.recordWsSubscription) {
      this.recordWsSubscription.unsubscribe();
    }
    if (this.connectSubs) {
      this.connectSubs.unsubscribe();
    }
    if (this.delaySub) {
      this.delaySub.unsubscribe();
    }

  }

  checkAllOptions() {
    this.checkAllOptionsInterval = setInterval(() => {
      if (this.topEndPointUpChartoptions && this.topEndPointDownChartoptions && this.topAppsUpChartoptions && this.topAppsDownChartoptions && this.topLocationsUpChartoptions && this.topLocationsDownChartoptions) {
        this.loading = false;
        this.showChart = true;
        clearInterval(this.checkAllOptionsInterval);

      }
    }, 500);
  }

  // gotoHistory(): void {
  //   this.router.navigate(['fa/traffic-record']);
  // }

  data: any = {
    maxRate: [],
    packet: []
  };

  source: any;
  tLsource: any;
  tASource: any;
  tESource: any;
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
  getRtData() {
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }

    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
    }

    this.cacheDataSubscription = this.websocketservice.cacheData$.subscribe((data: any) => {
      this.loading = false;
      console.log("cache data subscription", data)
      this.cachePacketData = data['packet'];
      this.cacheRateData = data['rate'];

    });

    this.ratePacketStreamSubscription = this.websocketservice.ratePacketStreamData$.subscribe((data: any) => {
      console.log("subscription data", data);
      this.showRealTime = true;

      if (data.monitorType == 'NET') {
        this.lastSubscriptionTime = new Date().getTime();
        this.loading = false;
        this.connectionError = false;
        if (data.graphType === 'TRF') {

          this.data = data;
          this.showRealTime = true;

        } else {
          this.showBars = false;
        }
      }
      // this.loading = false;
    })

    this.rtSubscription = this.websocketservice.rtData$.subscribe((data: any) => {
      if (data.monitorType == 'NET') {
        this.lastRtSubscriptionTime = new Date().getTime();
        this.loading = false;
        if (data.graphType === 'TAPP') {
          this.topAppsUpChartoptions = null;
          this.optnsMngr.setNetworkRealTimeGraphData(TopApp, data);
          this.makeTAPPEvents(data);

        }

        if (data.graphType === 'TEP') {

          this.topEndPointUpChartoptions = null;

          this.optnsMngr.setNetworkRealTimeGraphData(TopEP, data);
          this.makeTEPEvents(data);

        }
        if (data.graphType === 'TLOC') {
          this.topLocationsUpChartoptions = null;
          let findUpIndex = data.upData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000");
          if (findUpIndex > -1) {
            data.upData.splice(findUpIndex, 1);
          }
          let findDownIndex = data.downData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000");
          if (findDownIndex > -1) {
            data.downData.splice(findDownIndex, 1);
          }

          this.optnsMngr.setNetworkRealTimeGraphData(TopLoc, data);
          this.makeTLOCEvents(data);

        }
      }

      // this.loading = false;

    })
  }

  // get sensitiveInfoChecked(): boolean {
  //   return sessionStorage.getItem("showSensitiveInfo") == "true";
  // }

  confirmShow() {
    const request = {
      "accessType": this.secureAccessRole,
      "accountId": "",
      "accountName": "",
      "action": "pii",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": "",
      "deviceType": "",
      "objectType": "Traffic/Top Endpoints",
      "orgId": this.orgidfromlocal,
      "originator": this.loginData?.username,
      "description": "Show PII subscriber data"
    };
    this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
      if (res) {
        this.loading = false;
      }
    }, (error: any) => {
      this.error = true;
      this.errorInfo = error.errorMessage;
    })
    sessionStorage.setItem('showSensitiveInfo', 'true');
    if (this.endpointSensitiveData) {
      this.makeTEPEvents(this.endpointSensitiveData);
    }
    this.applyFilter();
    setTimeout(() => this.dialogService.dismissAll(), 200);
  }

  makeTEPEvents(data: any): any {
    this.endpointSensitiveData = JSON.parse(JSON.stringify(data));

    if (sessionStorage.getItem("showSensitiveInfo") != "true") {
      data.upData?.forEach(x => x.name = maskString(x.name))
      data.downData?.forEach(x => x.name = maskString(x.name))
    }

    this.tEPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TEP') ? this.selectedTopLength : 5;
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

    this.settepUpDataObj(data.upData);
    this.settepDownDataObj(data.downData)

    this.tEPData["upData"] = data.upData;
    this.tEPData["downData"] = data.downData;

    let topEndPointUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topEndPointDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);


    topEndPointUpChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 160;

    topEndPointUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(upLen) : 14;

    topEndPointDownChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 160;
    topEndPointDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(downLen) : 14;

    let that = this;
    let url = '/cco/traffic/endpoints/realtime';
    if (!this.isCcoTraffic) {
      url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/endpoint/realtime' : '/organization-admin/flowAnalyze/traffic/endpoint/realtime';
    }
    topEndPointUpChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (e) {
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          that.navigationByUrl(this.category = '', this.axis.categories[this.pos][1], 'Endpoints');
          // that.onclickCopy(this.value);
        },
        // dblclick: function (e) {
        // that.websocketservice.isUnmapped = false;
        // data.upData.forEach((element) => {
        //   if (element.id == element.name && element.name == that.tepDownDataObj[this.value]) {
        //     that.websocketservice.isUnmapped = true;
        //   }
        // });
        //   that.navigationByUrl(this.category = '', that.tepUpDataObj[this.value], 'Endpoints');
        // },
        contextmenu: function (e) {
          e.preventDefault();
          // that.navigationByUrl(this.category = '', that.tepUpDataObj[this.value], 'Endpoints');
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          // that.topEndPointUpChartoptions.series[0].id
          let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
          window.open(newTabUrl, '_blank');
        }
      }

    }
    topEndPointUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        window.sessionStorage.setItem('endpointName', this.category[0]);
        that.navigationByUrl(this.category[0], this.category[1], 'Endpoints');
      }
    };
    topEndPointDownChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (e) {
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          that.navigationByUrl(this.category = '', this.axis.categories[this.pos][1], 'Endpoints');
          // that.onclickCopy(this.value);
        },
        // dblclick: function (e) {
        // that.websocketservice.isUnmapped = false;
        // data.downData.forEach((element) => {
        //   if (element.id == element.name && element.name == that.tepDownDataObj[this.value]) {
        //     that.websocketservice.isUnmapped = true;
        //   }
        // });
        //   that.navigationByUrl(this.category = '', that.tepDownDataObj[this.value], 'Endpoints');
        // },
        contextmenu: function (e) {
          e.preventDefault();
          // that.navigationByUrl(this.category = '', that.tepDownDataObj[this.value], 'Endpoints');
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
          window.open(newTabUrl, '_blank');
        }
      }
    }
    topEndPointDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        window.sessionStorage.setItem('endpointName', this.category[0]);
        that.navigationByUrl(this.category[0], this.category[1], 'Endpoints');
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tepDownDataObj[this.value], 'Endpoints');
      }
    };

    topEndPointDownChartoptions.plotOptions.series.color = '#5ACFEA';

    topEndPointUpChartoptions = Object.assign({}, topEndPointUpChartoptions);
    topEndPointDownChartoptions = Object.assign({}, topEndPointDownChartoptions);

    this.topEndPointUpChartoptions = topEndPointUpChartoptions;
    this.topEndPointDownChartoptions = topEndPointDownChartoptions;

  }

  makeTLOCEvents(data: any): any {
    //let data: any = this.tAData;
    this.tLPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TLOC') ? this.selectedTopLength : 5;
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

    this.settlocUpDataObj(data.upData);
    this.settlocDownDataObj(data.downData);

    this.tLData["upData"] = data.upData;
    this.tLData["downData"] = data.downData;

    let topLocationsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topLocationsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);

    topLocationsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 160;
    delete topLocationsUpChartoptions.chart.width;
    topLocationsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(upLen) : 14;

    topLocationsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 160;
    delete topLocationsDownChartoptions.chart.width;
    topLocationsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(downLen) : 14;



    let that = this;
    let url = '/cco/traffic/locations/realtime';
    if (!this.isCcoTraffic) {
      url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/location/realtime' : '/organization-admin/flowAnalyze/traffic/location/realtime';
    }
    topLocationsUpChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (event) {
          if (that.hasLocationAccess) {
            that.router.navigate([url], { queryParams: { id: this.axis.categories[this.pos][1] } })
          }
        },
        contextmenu: function (event) {
          if (that.hasLocationAccess) {
            event.preventDefault();
            // that.router.navigate(['/cco/traffic/locations/realtime'], { queryParams: { id: that.tlocUpDataObj[this.value] } })
            let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
            window.open(newTabUrl, '_blank');
          }
        }
      }

    }
    topLocationsUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        if (that.hasLocationAccess) {
          that.router.navigate([url], { queryParams: { id: this.category[1] } })
        }
      }

    };
    topLocationsDownChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (event) {
          if (that.hasLocationAccess) {
            that.router.navigate([url], { queryParams: { id: this.axis.categories[this.pos][1] } })
          }
        },
        contextmenu: function (event) {
          if (that.hasLocationAccess) {
            event.preventDefault();
            // that.router.navigate(['/cco/traffic/locations/realtime'], { queryParams: { id: that.tlocDownDataObj[this.value] } })
            let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
            window.open(newTabUrl, '_blank');
          }
        }
      }
    }

    topLocationsDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        if (that.hasLocationAccess) {
          that.router.navigate([url], { queryParams: { id: this.category[1] } })
        }
      }
    };

    topLocationsDownChartoptions.plotOptions.series.color = '#5ACFEA';


    this.topLocationsUpChartoptions = { ...topLocationsUpChartoptions };
    this.topLocationsDownChartoptions = { ...topLocationsDownChartoptions };
  }

  makeTAPPEvents(data?: any): any {

    //let data: any = this.tAData;
    this.tAPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TAPP') ? this.selectedTopLength : 5;
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

    this.settapUpDataObj(data.upData);
    this.settapDownDataObj(data.downData);

    this.tAData["upData"] = data.upData;
    this.tAData["downData"] = data.downData;

    let topAppsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topAppsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);

    topAppsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 160;
    delete topAppsUpChartoptions.chart.width;
    topAppsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(upLen) : 14;

    topAppsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 160;
    delete topAppsDownChartoptions.chart.width;
    topAppsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(downLen) : 14;


    let that = this;
    let url = '/cco/traffic/applications/realtime';
    if (!this.isCcoTraffic) {
      url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/application/realtime' : '/organization-admin/flowAnalyze/traffic/application/realtime';
    }
    topAppsUpChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (event) {
          if (that.hasApplicationAccess) {
            that.router.navigate([url], { queryParams: { id: this.axis.categories[this.pos][1] } });
          }
        },
        contextmenu: function (event) {
          if (that.hasApplicationAccess) {
            event.preventDefault();
            // that.router.navigate(['/cco/traffic/applications/realtime'], { queryParams: { id: that.tapUpDataObj[this.value] } });
            let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
            window.open(newTabUrl, '_blank');
          }
        }
      }
    }
    topAppsUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        if (that.hasApplicationAccess) {
          that.router.navigate([url], { queryParams: { id: this.category[1] } })
        }
      }
    }
    topAppsDownChartoptions.xAxis.labels = {
      useHTML: true,
      style: {
        color: '#007bff',
        cursor: 'pointer',
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: '13px',
        fontWeight: 500
      },
      formatter: function () {
        return `<span  class="text-primary axis_label" title="${this.value[0]}" style="cursor:pointer">${this.value[0]}</span>`;
        // return `${this.value}`
      },
      events: {
        click: function (event) {
          if (that.hasApplicationAccess) {
            that.router.navigate([url], { queryParams: { id: this.axis.categories[this.pos][1] } });
          }
        },
        contextmenu: function (event) {
          if (that.hasApplicationAccess) {
            event.preventDefault();
            // that.router.navigate(['/cco/traffic/applications/realtime'], { queryParams: { id: that.tapDownDataObj[this.value] } });
            let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
            window.open(newTabUrl, '_blank');
          }
        }
      }
    }
    topAppsDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        if (that.hasApplicationAccess) {
          that.router.navigate([url], { queryParams: { id: this.category[1] } })
        }
      }

    }

    topAppsDownChartoptions.plotOptions.series.color = '#5ACFEA';

    this.topAppsUpChartoptions = { ...topAppsUpChartoptions };
    this.topAppsDownChartoptions = { ...topAppsDownChartoptions };

  }

  cachePacketData: any = {};
  cacheRateData: any = {};
  rateUnit = 'bps';
  packetUnit = 'pps';


  changeTopLength(): void {
    //this.loading = true;
    if (this.fsName === 'TEP') {
      //let data = this.optnsMngr.getTopEP();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      // let data = this.optnsMngr.getTopApp();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      //let data = this.optnsMngr.getTopLoc();
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
      this.makeTLOCEvents(data);
    }

  }

  tepUpDataObj = {};
  tepDownDataObj = {};
  tapUpDataObj = {};
  tapDownDataObj = {};
  tlocUpDataObj = {};
  tlocDownDataObj = {};

  public settepUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tepUpDataObj = obj;
  }

  public gettepUpDataObj(): any {
    return this.tepUpDataObj;
  }

  public settepDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tepDownDataObj = obj;
  }

  public gettepDownDataObj(): any {
    return this.tepDownDataObj;
  }

  public settapUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tapUpDataObj = obj;
  }

  public gettapUpDataObj(): any {
    return this.tapUpDataObj;
  }

  public settapDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tapDownDataObj = obj;
  }

  public gettapDownDataObj(): any {
    return this.tapDownDataObj;
  }

  public settlocDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tlocDownDataObj = obj;
  }

  public gettlocDownDataObj(): any {
    return this.tlocDownDataObj;
  }

  public settlocUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tlocUpDataObj = obj;
  }

  public gettlocUpDataObj(): any {
    return this.tlocUpDataObj;
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
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
      let url = '/cco/traffic/endpoints/realtime';
      if (!this.isCcoTraffic) {
        url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/endpoint/realtime' : '/organization-admin/flowAnalyze/traffic/endpoint/realtime';
      }
      this.router.navigate([url], { queryParams: { id: id } });

    }
  }

  epSearchSbcrptn: any;
  watchEPSearch() {
    this.epSearchSbcrptn = this.websocketservice.endPointSearch$.subscribe((value: any) => {
      this.searchEndPoint(value);
    });
  }

  searchEndPoint(value: any) {
    if (this.tepUpDataObj[value]) {
      this.websocketservice.setEndPointSearchError(false);
      this.websocketservice.setEndpointValue(this.tepUpDataObj[value]);
    } else if (this.tepDownDataObj[value]) {
      this.websocketservice.setEndPointSearchError(false);
      this.websocketservice.setEndpointValue(this.tepDownDataObj[value]);
    } else {
      this.websocketservice.setEndPointSearchError(true);
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


  goToRecordingList() {
    // let newTabUrl = window.location.origin + '/cco/record/list';
    // window.open(newTabUrl, '_blank');
    let redirectUrl = '/cco/traffic/network/realtime';
    if (!this.isCcoTraffic) {
      redirectUrl = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/network/realtime' : '/organization-admin/flowAnalyze/traffic/network/realtime';
    }
    localStorage.setItem('cco_record_list_history', redirectUrl);
    let url = this.isCcoTraffic ? '/cco/record/list' : this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/recording/list' : '/organization-admin/flowAnalyze/recording/list';
    this.router.navigate([url]);
  }
  date: any = new Date();
  items: any = [
    {
      name: "0.5 Hour",
      value: '1'
    },
    {
      name: "1 Hour",
      value: '2'
    },
    {
      name: "1.5 Hour",
      value: '3'
    },
    {
      name: "2 Hour",
      value: '4'
    }
  ]

  selectedDuration: any = "1";
  isNow: boolean = true;
  recordingName: any = "";
  description: any = ""
  isvalid: boolean = true;
  minDate = new Date();

  @ViewChild('recordingModal', { static: true }) private recordingModal: TemplateRef<any>;
  @ViewChild('faviouteModal', { static: true }) private faviouteModal: TemplateRef<any>;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  btnDisabled: boolean = false;

  close(): void {
    this.btnDisabled = false;
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  sensitiveModalCancel(modal): void {
    modal.close('');
    this.sensitiveChecked = false;
  }


  createRecordingModal() {
    let pipe = new DatePipe('en-US');
    this.error = false;
    this.errorInfo = "";
    let date = new Date();
    this.date = new Date(date.getTime() + (1 * 60 * 1000));
    this.isNow = this.recordingStatus ? false : true;
    if (!this.isNow) {
      if (this.lastRecordLength && this.lastRecordStartTime) {
        let time = new Date().getTime();
        this.timeDiff = this.lastRecordLength - (time - this.lastRecordStartTime);
      }
      this.date = new Date(date.getTime() + (this.timeDiff > 0 ? this.timeDiff : (1 * 60 * 60 * 1000)));
      this.minDate = new Date(date.getTime() + (this.timeDiff > 0 ? this.timeDiff : (1 * 60 * 60 * 1000)));
    }
    this.recordingName = "Network_" + (pipe.transform(new Date(), "yyyy-MM-dd")) + "_" + new Date().toTimeString().substr(0, 8)
    this.selectedDuration = "1";
    this.description = "";
    this.modalRef = this.dialogService.open(this.recordingModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
  }

  createFaviouteModal() {
    this.modalRef = this.dialogService.open(this.faviouteModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
  }

  changeName() {
  }


  errorInfo = "";
  error: boolean = false;
  recordWsSubscription: any;
  recordErrorSubscription: any;
  createRecording() {
    if (this.recordErrorSubscription) {
      this.recordErrorSubscription.unsubscribe();
    }
    if (this.recordWsSubscription) {
      this.recordWsSubscription.unsubscribe();
    }
    let userId = localStorage.getItem("calix.userId")
    let startTime = (new Date()).getTime();
    let length = parseInt(this.selectedDuration) * 30 * 60 * 1000;
    if (!this.isNow) {
      startTime = (new Date(this.date)).getTime();
      if (startTime <= (new Date()).getTime()) {
        this.error = true;
        this.errorInfo = "Recording time should not be lesser than current time";
        return;
      }
    }
    this.error = false;
    this.errorInfo = "";

    if (this.recordingName === "") {
      this.isvalid = false;
      return;
    } else {
      this.isvalid = true;
    }
    if (this.recordingName.length > 72) {
      this.error = true;
      this.errorInfo = "Name should not have more than 72 characters"
      return;
    } else if (this.description.length > 255) {
      this.error = true;
      this.errorInfo = "Description should not have more than 255 characters ";
      return;
    }

    let params = {
      "orgId": this.orgId,
      "tenentid": "0",
      "monitorType": "NET",
      "graphType": "TRF,TAPP,TLOC,TEP",
      "startTime": startTime,
      "name": this.recordingName,
      "description": this.description,
      "length": length,
      "status": "New",
      "userId": userId,
      "recordingType": "traffic",
      "trigger": "Manual",
      "monitorId": this.orgid_tenantid
    };
    this.btnDisabled = true;
    // console.log("params", params);
    this.send("RECORDING", params);
    this.websocketservice.listenRecord("RECORDING");
    this.websocketservice.listenRecord("error");

    this.recordWsSubscription = this.websocketservice.recordResponseData$.subscribe((res: string) => {
      this.btnDisabled = false;
      if (res.includes('Successfully')) {
        this.close();
      }
    })

    this.recordErrorSubscription = this.websocketservice.recordErrorResponseData$.subscribe((res: any) => {
      this.btnDisabled = false;
      this.error = true;
      this.errorInfo = res.errorMessage;
    })

    setTimeout(() => {
      this.getRecordingStatus();
    }, 1000)

  }

  closeAlert() {
    this.error = false;
    this.connectionError = false;
  }

  createFavioute() {

  }

  showDate: boolean = true;
  changeNowAndLater() {
    this.showDate = !this.showDate
  }


  lastSubscriptionTime: any;
  lastRtSubscriptionTime: any;
  interval: any;
  checkLastSubscriptiontime() {
    this.interval = setInterval(() => {
      let diff = new Date().getTime() - this.lastSubscriptionTime;
      let rtDiff = new Date().getTime() - this.lastRtSubscriptionTime;
      if (diff >= 45000) {
        this.data.maxRate = [0, 0];
        this.data.packet = [0, 0];
      }
      if (rtDiff >= 45000) {
        let epData = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
        epData.upData = []
        epData.downData = []
        this.makeTEPEvents(epData);
        this.optnsMngr.setNetworkRealTimeGraphData(TopEP, epData);

        let locData = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
        locData.upData = []
        locData.downData = []
        this.makeTLOCEvents(locData);
        this.optnsMngr.setNetworkRealTimeGraphData(TopLoc, locData);

        let appData = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
        appData.upData = []
        appData.downData = []
        this.makeTAPPEvents(appData);
        this.optnsMngr.setNetworkRealTimeGraphData(TopApp, appData);
      }
    }, 15000)
  }


  recordingStatus: boolean = false;
  statusSubs: any;
  getRecordingStatus() {
    let params: any = {
      monitorType: "NET",
      monitorId: this.ORG_ID + "_0"
    };
    let userId = localStorage.getItem("calix.userId")
    let url = `${environment.API_BASE_URL}record/job/status/Recording?orgId=${this.ORG_ID}&tenentid=0&userId=${userId}`;
    this.statusSubs = this.http.post(url, params).subscribe((res: any) => {
      if (res) {
        res.forEach(element => {
          if (element.monitorType === "NET" && element.status === "Recording") {
            this.getRecordDetails(element.id);
            this.recordingStatus = true;
            this.isNow = false;
            this.showDate = false;
          } else {
            this.recordingStatus = false;
            this.isNow = true;
            this.showDate = true;
          }
        });
      }
    }, (err) => {
    })
  }


  connectionError: boolean = false;
  connectionErrorInfo = ""
  connectionErSubscription: any;
  wsNoResponseSubscription: any;
  webSocketConnectionError() {
    if (this.connectionErSubscription) {
      this.connectionErSubscription.unsubscribe();
    }
    this.connectionErSubscription = this.websocketservice.wsConnectionError$.subscribe((res: any) => {
      if (res && res === true) {
        this.loading = false;
        this.connectionError = true;
        this.connectionErrorInfo = "Web Socket connection failed";
        this.close();
      }
    })

    this.wsNoResponseSubscription = this.websocketservice.wsNoResponse$.subscribe((res: any) => {
      if (res && res.isError === true && res.type === "error_traffic_NET") {
        this.loading = false;
        this.connectionError = true;
        this.connectionErrorInfo = "No Data Available"
      }
    })
  }


  timeDiff = 0;
  lastRecordLength: any;
  lastRecordStartTime: any;
  recordSubs: any;
  getRecordDetails(id: any) {
    this.recordSubs = this.http.get(`${environment.API_BASE_URL}record/job/list/${id}?orgId=${this.ORG_ID}&tenentid=0`).subscribe((data: any) => {
      if (data) {
        this.lastRecordLength = data.length;
        this.lastRecordStartTime = data.startTime;
      }
    }, (err) => {
      this.timeDiff = (1 * 60 * 60 * 1000);
    });
  }

  reConnectSubscription: any;
  reConnectWebSocket() {
    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
    this.reConnectSubscription = this.websocketservice.connectWS$.subscribe((res: any) => {
      if (res && this.websocketservice.WebSocketServer.hasDisconnectedOnce) {

        let filterData = this.websocketservice.getCurrentMonitorInfo('NET');
        this.websocketservice.listen('NET');
        this.websocketservice.listen('REPLAY');

        if (filterData && filterData['monitorId']) {
          let obj = {
            "orgId": this.orgId,
            "monitorType": "NET",
            "networkId": this.orgid_tenantid,
            "monitorId": this.orgid_tenantid,
            "graphType": "TRF,TAPP,TLOC,TEP",
            "startTime": filterData['startTime']
          }
          this.send("NET", obj);
          let params = {
            "orgId": filterData.orgId,
            "monitorType": "NET",
            "networkId": filterData.networkId,
            "monitorId": this.orgid_tenantid,
            "graphType": "TRF",
            "replay": "true",
            "startTime": filterData['startTime'],
            "endTime": (new Date()).getTime()
          };
          this.send("NET", params);
          this.websocketservice.setWindowLen(this.selectedOption);
          return;
        }

        this.getRtData();
      }
    });
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }

  modalOpener(modal) {
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-warning-modal clx-custom-modal',
    });
  }
}
