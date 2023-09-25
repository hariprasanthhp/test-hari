import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';

let TopEP = 'TEP',
  TopApp = 'TAPP',
  TopLoc = 'TLOC';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit {
  language: any;
  languageSubject;
  selectedOption: number = 1;
  selectedTime: number = 1;
  fsView: boolean = false;
  showRealTime = true;
  rate: string = 'RATE';
  packet: string = 'PACKET';
  rateUnit = 'bps';
  packetUnit = 'pps';
  windowLen: any = 5;
  fsName: string = '';
  fsChartDetails: any = {};
  selectedTopLength = 5;
  topLengths: any = [];
  updateFlag: boolean = true;

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


  endpointSensitiveData: any;
  tLsource: any;
  tASource: any;
  tESource: any;
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
  orgId: any;
  orgid_tenantid: string;
  rtSubscription: any;
  ratePacketStreamSubscription: any;
  cacheDataSubscription: any;
  data: any = {
    maxRate: [],
    packet: []
  };
  showBars: boolean;
  loading: boolean;
  endPoinId: any;
  isConnected = true;
  status = 'ONLINE'; //initializing as online by default
  hasLocationAccess = false;
  hasApplicationAccess = false;
  wsDelay: any;
  hasWriteAccess: boolean = false;
  isCcoTraffic: boolean = false;
  statusSubs: any;
  recordSubs: any;
  connectSubs: any;
  delaySubs: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    //private optnsMngr: OptionsManagerService, 
    private sso: SsoAuthService,
    private optnsMngr: TrafficeRealtimeOptionsManagerService,
    private websocketservice: WebsocketService,
    private http: HttpClient,
    private dialogService: NgbModal,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService
  ) {
    this.loading = true;
    this.websocketservice.rtData$.next({});
    this.websocketservice.ratePacketStreamData$.next({});
    this.websocketservice.setMonitorType("EP");
    if (window.location.pathname.indexOf('cco/traffic/endpoints/realtime') > -1) {
      this.isCcoTraffic = true;
    }
  }
  setTitle(url) {
    if (this.isCcoTraffic) {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Endpoints']} - ${this.language['Traffic']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Endpoints']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.sso.setPageAccess(true);
    this.webSocketConnectionError();
    this.getAggregateEndpointTraffic();
    let that = this;
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        if (that.websocketservice.getCurrentMonitorInfo('EP')) {
          let filterData = that.websocketservice.getCurrentMonitorInfo('EP');
          if (filterData && filterData['monitorId'] && filterData['monitorId'] === that.endPoinId) {
            let params = {
              "orgId": filterData.orgId,
              "monitorType": "EP",
              "networkId": filterData.networkId,
              "monitorId": filterData['monitorId'],
              "graphType": "TRF",
              "replay": "true",
              "startTime": filterData['startTime'],
              "endTime": (new Date()).getTime()
            };

            that.send("EP", params);
            return;
          }
          that.websocketservice.listen('REPLAY');
        }
      }
    });

    //this.endPoinId = this.route.snapshot.params.id || 0;
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && this.isCcoTraffic) {
      if (scopes && ((scopes['cloud.rbac.coc.traffic.network.realtime'].indexOf('write') !== -1) || (scopes['cloud.rbac.coc.traffic.location.realtime'].indexOf('write') !== -1) || (scopes['cloud.rbac.coc.traffic.applications.realtime'].indexOf('write') !== -1))) {
        this.hasWriteAccess = true;
      }
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.realtime') !== -1) {
            this.hasLocationAccess = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications.realtime') !== -1) {
            this.hasApplicationAccess = true;
          }
        }
      }
    } else {
      this.hasLocationAccess = true;
      this.hasApplicationAccess = true;
    }

    this.delaySubs = this.websocketservice.delay$.subscribe((res: any) => {
      if (res) {
        //this.loading = false;
        this.wsDelay = (Math.abs(this.sso.getRealtimeDelay()) / 60000);
        this.wsDelay = Number.isInteger(this.wsDelay) ? this.wsDelay : this.wsDelay.toFixed(1);
      }
    })

    let filterData = {};
    if (this.websocketservice.getCurrentMonitorInfo('EP')) {
      filterData = this.websocketservice.getCurrentMonitorInfo('EP');
      if (filterData['monitorId'] !== this.route.snapshot.queryParamMap.get('id')) {
        this.send('remove', 'EP');
      }
    }

    this.endPoinId = this.route.snapshot.queryParamMap.get('id') || (filterData && filterData['monitorId'] ? filterData['monitorId'] : 0) || 0;
    // this.ccoCommonService.setData(this.endPoinId);

    //this.websocketservice.Checkconnectornot();
    // this.websocketservice.listen('EP').subscribe((data) => {
    // });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url)
      if (this.fsView) {
        this.createTopLengthItems();
      }

      this.topAppsUpChartoptions = null;
      this.topAppsDownChartoptions = null;
      this.topEndPointUpChartoptions = null;
      this.topEndPointDownChartoptions = null;

      setTimeout(() => {
        let epData = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
        this.makeTEPEvents(epData);
        let appData = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
        this.makeTAPPEvents(appData);
      }, 300)

    });
    this.setTitle(this.router.url)
    //var endPointData = JSON.parse(sessionStorage.getItem('cco-endpoint'))

    this.getRtData();
    // this.orgId = this.sso.getOrgId();
    let url = this.router.url;
    this.orgId = this.sso.getOrganizationID(url);
    this.orgid_tenantid = this.orgId + '_' + '0';
    // this.endPoinId = endPointData.endPointId;

    this.connectSubs = this.websocketservice.connectWS$.subscribe((res: any) => {
      if (res && !this.websocketservice.WebSocketServer.hasDisconnectedOnce) {
        this.websocketservice.listen('EP');
        this.websocketservice.listen('error_traffic_EP');
        if (!filterData['monitorId'] || (filterData['monitorId'] !== this.route.snapshot.queryParamMap.get('id'))) {
          this.send("EP", {
            "orgId": this.orgId,
            "monitorType": "EP",
            "networkId": this.orgid_tenantid,
            "monitorId": this.endPoinId,
            "graphType": "TRF,TAPP,TEP"
          });
        }

        if (filterData && filterData['monitorId'] && (filterData['monitorId'] === this.route.snapshot.queryParamMap.get('id'))) {
          let params = {
            "orgId": filterData['orgId'],
            "monitorType": "EP",
            "networkId": filterData['networkId'],
            "monitorId": filterData['monitorId'],
            "graphType": "TRF",
            "replay": "true",
            "startTime": filterData['startTime'],
            "endTime": (new Date()).getTime()
          };

          this.send("EP", params);
        }
        this.websocketservice.listen('REPLAY');
      }
    });

    this.websocketservice.setWindowLen(this.selectedOption);

    this.getRecordingStatus();
    this.checkLastSubscriptiontime();
    this.reConnectWebSocket();

    setTimeout(() => {
      this.loading = false;
    }, 15000)

  }

  ngAfterViewInit() {
    var elmnt = document.getElementById("app-main-div");
    if (elmnt) {
      elmnt.scrollIntoView({ behavior: 'smooth' });
    }
  }


  send(eventname, data) {
    this.websocketservice.emit(eventname, data);
  }

  clearFilter() {
    this.selectedOption = 1;
    this.selectedTime = 1
  }

  fullscreen(whichTop: string) {
    this.fsChartDetails = {
      topChart: whichTop
    };
    this.fsView = true;
    this.fsName = whichTop;
    this.modifyCurrentOptionsToFS(whichTop);
    this.createTopLengthItems();
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

  closeFullscreen() {
    this.selectedTopLength = 5;
    this.fsView = false;
    if (this.fsName === 'TEP') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
      this.makeTLOCEvents(data);
    }
    this.fsName = '';
    this.fsChartDetails = {};
  }

  changeTopLength(): void {
    if (this.fsName === 'TEP') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopEP);
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopApp);
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getNetworkRealTimeGraphData(TopLoc);
      // this.makeTLOCEvents(data);
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
  ngOnDestroy() {

    // if (this.source) {
    //   this.source.close();
    // }

    // this.source = null;

    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }

    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
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
    sessionStorage.removeItem('cco-endpoint');

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

    if (this.aggregateSubscription) {
      this.aggregateSubscription.unsubscribe();
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
    if (this.delaySubs) {
      this.delaySubs.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  // gotoHistory(): void {
  //   this.router.navigate([]);
  // }
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
      // console.log("cache data subscription", data)
      this.cachePacketData = data['packet'];
      this.cacheRateData = data['rate'];
      this.loading = false;
      this.connectionError = false;

    });

    this.ratePacketStreamSubscription = this.websocketservice.ratePacketStreamData$.subscribe((data: any) => {
      console.log("subscription data", data);
      this.showRealTime = true;
      if (data.monitorType == 'EP' && data.monitorId == this.endPoinId) {
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
      if (data.monitorType == 'EP') {
        this.lastRtSubscriptionTime = new Date().getTime();
        this.loading = false;
        if (data.graphType === 'TAPP') {
          this.topAppsUpChartoptions = null;
          //this.tAData = data;
          // this.optnsMngr.setTopApp(data);
          this.optnsMngr.setNetworkRealTimeGraphData(TopApp, data);
          this.makeTAPPEvents(data);

        }

        if (data.graphType === 'TEP') {

          this.topEndPointUpChartoptions = null;
          //this.tEPData = data;
          //this.optnsMngr.setTopEP(data);
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
    this.settepDownDataObj(data.downData);

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
          that.navigationByUrl(this.axis.categories[this.pos][1]);
        },
        contextmenu: function (e) {
          e.preventDefault();
          let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
          window.open(newTabUrl, '_blank');
        }
      }

    }
    topEndPointUpChartoptions['plotOptions'].series.point.events = {
      click: function (event) {
        that.navigationByUrl(this.category[1]);
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
          that.navigationByUrl(this.axis.categories[this.pos][1]);
        },
        contextmenu: function (e) {
          e.preventDefault();
          let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
          window.open(newTabUrl, '_blank');
        }
      }
    }
    topEndPointDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        that.navigationByUrl(this.category[1]);
      }
    };

    topEndPointDownChartoptions.plotOptions.series.color = '#5ACFEA';

    topEndPointUpChartoptions = Object.assign({}, topEndPointUpChartoptions);
    topEndPointDownChartoptions = Object.assign({}, topEndPointDownChartoptions);

    this.topEndPointUpChartoptions = topEndPointUpChartoptions;
    this.topEndPointDownChartoptions = topEndPointDownChartoptions;

  }

  makeTLOCEvents(data: any): any {
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
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tlocUpDataObj[this.value], 'Locations');
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
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tlocDownDataObj[this.value], 'Locations');
      }
    };

    topLocationsDownChartoptions.plotOptions.series.color = '#5ACFEA';

    topLocationsUpChartoptions = Object.assign({}, topLocationsUpChartoptions);
    topLocationsDownChartoptions = Object.assign({}, topLocationsDownChartoptions);

    this.topLocationsUpChartoptions = topLocationsUpChartoptions;
    this.topLocationsDownChartoptions = topLocationsDownChartoptions;
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

    topAppsUpChartoptions = Object.assign({}, topAppsUpChartoptions);
    topAppsDownChartoptions = Object.assign({}, topAppsDownChartoptions);

    topAppsDownChartoptions.plotOptions.series.color = '#5ACFEA';
    this.topAppsUpChartoptions = topAppsUpChartoptions;
    this.topAppsDownChartoptions = topAppsDownChartoptions;

  }
  cachePacketData: any = {};
  cacheRateData: any = {};


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
  }

  goToRecordingList() {
    // let newTabUrl = window.location.origin + '/cco/record/list';
    // window.open(newTabUrl, '_blank');

    let redirectUrl = '/cco/traffic/endpoints/realtime?id=' + this.endPoinId;
    if (!this.isCcoTraffic) {
      redirectUrl = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? ('/systemAdministration/flowAnalyze/traffic/endpoint/realtime?id=' + this.endPoinId) : ('/organization-admin/flowAnalyze/traffic/endpoint/realtime?id=' + this.endPoinId);
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
    this.recordingName = "Endpoint_" + (pipe.transform(new Date(), "yyyy-MM-dd")) + "_" + new Date().toTimeString().substr(0, 8)
    // this.recordingName = this.websocketservice.endPointName + "_" + (pipe.transform(new Date(), "yyyy-MM-dd")) + "_" + new Date().toTimeString().substr(0, 8)
    this.selectedDuration = "1";
    this.description = "";
    this.modalRef = this.dialogService.open(this.recordingModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
  }

  createFaviouteModal() {
    this.modalRef = this.dialogService.open(this.faviouteModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
  }

  changeName() {
    // console.log("recordingName", this.recordingName);
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
      "monitorType": "EP",
      "graphType": "TRF,TAPP,TEP",
      "startTime": startTime,
      "name": this.recordingName,
      "description": this.description,
      "length": length,
      "status": "New",
      "userId": userId,
      "recordingType": "traffic",
      "trigger": "Manual",
      "monitorId": this.endPoinId
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
  getRecordingStatus() {
    let params: any = {
      monitorType: "EP",
      monitorId: this.endPoinId
    };
    let userId = localStorage.getItem("calix.userId")
    let url = `${environment.API_BASE_URL}record/job/status/Recording?orgId=${this.orgId}&tenentid=0&userId=${userId}`;
    this.statusSubs = this.http.post(url, params).subscribe((res: any) => {
      if (res) {
        res.forEach(element => {
          if (element.monitorType === "EP" && element.status === "Recording") {
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
    if (this.wsNoResponseSubscription) {
      this.wsNoResponseSubscription.unsubscribe();
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
      if (res && res.isError === true && res.type === "error_traffic_EP") {
        this.loading = false;
        this.connectionError = true;
        this.connectionErrorInfo = "No Data Available"
      }
    })
  }

  timeDiff = 0;
  lastRecordLength: any;
  lastRecordStartTime: any;
  getRecordDetails(id: any) {
    this.recordSubs = this.http.get(`${environment.API_BASE_URL}record/job/list/${id}?orgId=${this.orgId}&tenentid=0`).subscribe((data: any) => {
      if (data) {
        this.lastRecordLength = data.length;
        this.lastRecordStartTime = data.startTime;
      }
    }, (err) => {
      this.timeDiff = (1 * 60 * 60 * 1000);
    });
  }

  navigationByUrl(id) {
    if (id) {
      // this.sso.setEPRredirectFrom(window.location.pathname + '?id=' + this.endPoinId);
      let path = window.location.pathname + '?id=' + this.endPoinId;
      let redirectionPath: any = this.sso.getEndpointRedirectTo();
      redirectionPath.push(path);
      this.sso.setEndpointRedirectTo(redirectionPath);
      let url = '/cco/traffic/endpoints/realtime';
      if (!this.isCcoTraffic) {
        url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/endpoint/realtime' : '/organization-admin/flowAnalyze/traffic/endpoint/realtime';
      }
      this.router.navigate([url], { queryParams: { id: id } });
    }
  }

  reConnectSubscription: any;
  reConnectWebSocket() {
    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
    this.reConnectSubscription = this.websocketservice.connectWS$.subscribe((res: any) => {
      if (res && this.websocketservice.WebSocketServer.hasDisconnectedOnce) {

        let filterData = this.websocketservice.getCurrentMonitorInfo('EP');
        this.websocketservice.listen('EP');
        this.websocketservice.listen('REPLAY');

        if (filterData && filterData['monitorId'] && filterData['monitorId'] === this.endPoinId) {
          this.send("EP", {
            "orgId": this.orgId,
            "monitorType": "EP",
            "networkId": this.orgid_tenantid,
            "monitorId": this.endPoinId,
            "graphType": "TRF,TAPP,TEP",
            "startTime": filterData['startTime']
          });

          let params = {
            "orgId": filterData.orgId,
            "monitorType": "EP",
            "networkId": filterData.networkId,
            "monitorId": filterData['monitorId'],
            "graphType": "TRF",
            "replay": "true",
            "startTime": filterData['startTime'],
            "endTime": (new Date()).getTime()
          };

          this.send("EP", params);
          return;
        }

        if (!filterData['monitorId'] || (filterData && filterData['monitorId'] !== this.endPoinId)) {
          this.send("EP", {
            "orgId": this.orgId,
            "monitorType": "EP",
            "networkId": this.orgid_tenantid,
            "monitorId": this.endPoinId,
            "graphType": "TRF,TAPP,TEP"
          });
        }

        this.getRtData();

      }
    });
  }

  aggregateSubscription: any;
  getAggregateEndpointTraffic() {
    this.aggregateSubscription = this.websocketservice.isAggregateMember$.subscribe((data: any) => {
      if (data.id) {
        this.endPoinId = data.id;
        setTimeout(() => {
          this.send('remove', 'EP');
          this.send("EP", {
            "orgId": this.orgId,
            "monitorType": "EP",
            "networkId": this.orgid_tenantid,
            "monitorId": data.id,
            "graphType": "TRF,TAPP,TEP"
          });
          this.websocketservice.isAggregateMember$.next({ id: null })
        }, 1000)
      }
    })
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}
