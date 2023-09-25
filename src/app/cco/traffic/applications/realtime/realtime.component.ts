import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { ApplicationReportApiService } from '../reports/application-report-api.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { StreamChartComponent } from '../../shared/stream-chart/stream-chart.component';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { FilterPresets } from '../../shared/favorites-api.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit, OnDestroy, AfterViewInit {
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
  fsChartDetails: any = {};
  fsChartOptionsUp: any;
  fsChartOptionsDown: any;
  screenWidth: any;
  screenHeight: any;
  showChart = false;

  Highcharts = Highcharts;
  checkAllInterval: any;
  checkAllOptionsInterval: any;
  loading: boolean;

  startDate: any = new Date();
  recordName: string;
  rate: string = '';
  packet: string = '';

  createFavorite: boolean = true;
  createRecord: boolean = true;
  windowLen: any = 5;

  searchInputAppText = '';
  searchInputAppGroupText = '';
  searchInputLocText = '';
  searchInputMultiAppText = '';

  endpointSensitiveData: any;
  showSensitiveInfo = false;
  sensitiveChecked = false;
  ddoptions = [
    { id: 1, name: '5 Minutes window' },
    { id: 2, name: '10 Minutes window' },
    { id: 3, name: '15 Minutes window' },
    { id: 4, name: '20 Minutes window' },
    { id: 5, name: '25 Minutes window' },
    { id: 6, name: '30 Minutes window' }
  ];
  selectedOption: number = 1;
  selectedTime: number = 1;

  locations: any = [];
  locationsSelected = [];
  locSubs: any;
  locObj = {};

  applications: any = [];
  //applicationsOnly: any = [];
  applicationGroups: { id: string, name: string }[] = [];
  applicationsSelected: any;
  applicationGroupSelected: string[];
  appSubs: any;
  appObj = {};
  combineLatest: any;
  parallelReqSubscribtion: any;
  globalApps: any;
  curOrgApps: any;
  Initialloading: boolean = true;
  orgId: any;
  orgid_tenantid: string;
  applicationWSRequestObj = {
    "orgId": "",
    "networkId": "",
    "monitorType": this.monitorType,
    "graphType": "TRF,TLOC,TEP",
    "monitorId": "",
  }
  showAlert: boolean = false;
  isConnected = true;
  status = 'ONLINE'; //initializing as online by default
  isCallRemove: boolean = false;
  wsDelay: any;

  isMultiple = false;
  metricSelected = 'Rate';
  metric: any = [
    {
      name: 'Rate',
      value: 'Rate'
    },
    {
      name: 'Packet',
      value: 'Packet'
    }
  ];
  multipleLocationSelected: any;
  multipleApplicationSelected: any;
  loadedMultipleChart: any = [];
  multipleLocationName: any;
  multipleApplicationName: any;
  multipleSelectedOption: number = 1;
  multipleSelectedTime: number = 1;
  multiplePageAvailable: boolean = false;
  hasLocationAccess = false;
  hasApplicationAccess = false;
  hasWriteAccess: boolean = false;
  isCcoTraffic: boolean = false;
  urlParams: any;
  statusSubs: any;
  recordSubs: any;
  connectSubs: any;
  secureAccessRole: any;
  orgidfromlocal: any;
  loginData: any;

  @ViewChildren(StreamChartComponent) streamChild: QueryList<StreamChartComponent>;

  constructor(
    private router: Router,
    private customTranslateService: TranslateService,
    private sso: SsoAuthService,
    private optnsMngr: TrafficeRealtimeOptionsManagerService,
    private http: HttpClient,
    private apiService: ApplicationReportApiService,
    public websocketservice: WebsocketService,
    private route: ActivatedRoute,
    private dialogService: NgbModal,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
    private callOutComeService: CallOutComeService,
    private dateUtils: DateUtilsService,
  ) {
    //this.checkAllOptions();
    if (this.websocketservice.previousURL.includes("/cco/traffic/network/reports") ||
      this.websocketservice.previousURL.includes("/cco/traffic/locations/reports")) {
      this.router.navigate(['/cco/traffic/applications/reports']);
      return;
    } else {
      this.websocketservice.previousURL = ""
    }
    if (window.location.pathname.indexOf('/cco/traffic/') > -1) {
      this.isCcoTraffic = true;
    }

    this.clearTopN();
    this.loading = true;
    this.getLocations();
    this.getApps();


    setTimeout(() => {
      if (this.getMultipleOptions()) {
        let value = this.getMultipleChartValue() ? this.getMultipleChartValue() : [];
        this.loadedMultipleChart = value;
        this.isMultiple = true;
        this.multiplePageAvailable = true;
        window.sessionStorage.removeItem('coc_Traffic_Application_showMultiple');
        window.sessionStorage.removeItem('coc_Traffic_Application_multiChart_Value');
        if (this.loadedMultipleChart?.length > 0) {
          this.loadedMultipleChart.forEach(element => {
            element['replay'] = true;
          });
        }
        if (this.loadedMultipleChart?.length >= 9) {
          this.btnDisable = true;
        }

      }
    }, 100)

  }
  setTitle(url) {
    if (this.isCcoTraffic) {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Applications']} - ${this.language['Traffic']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['Applications']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }

  get selectedApplicationNames(): string[] {
    const result = this.applicationsSelected?.map(a => this.applications?.find(b => b._id == a)?.name);
    return result ?? [];
  }

  get selectedLocationNames(): string[] {
    const result = (this.locations?.length == this.locationsSelected?.length)
      ? ['All'] : this.locationsSelected?.map(a => this.locations?.find(b => b.value == a)?.name);
    return result ?? [];
  }

  onSelectFilterPreset(item: FilterPresets) {
    if (this.isMultiple) {
      this.multipleSelectedOption = item.settingJsonTyped.timeFrame;
      this.multipleApplicationSelected = this.multiApplications.find(ma => item.settingJsonTyped.application?.includes(ma.value))?.value;
      this.changeMultipleApplication();

      this.metricSelected = item.settingJsonTyped.metric;
      this.multipleLocationSelected = this.multiLocations.filter(ml => item.settingJsonTyped.location?.includes(ml.value))?.map(l => l.value);
      this.changeMultipleLocation();
    }
    else {
      this.selectedOption = item.settingJsonTyped.timeFrame;
      this.applicationsSelected = this.applications.filter(ao => item.settingJsonTyped.application?.includes(ao.value))?.map(a => a.value);
      this.applicationGroupSelected = this.applicationGroups.filter(ag => item.settingJsonTyped.applicationGroup?.includes(ag.id))?.map(a => a.id);
      this.locationsSelected = this.locations.filter(ls => item.settingJsonTyped.location?.includes(ls.value))?.map(l => l.value);
    }
  }

  get monitorType(): string {
    return this.applicationsSelected?.length ? "APP" : this.applicationGroupSelected?.length ? "APPGRP" : "APP";
  }

  ngOnInit() {
    this.sensitiveChecked = sessionStorage.getItem("showSensitiveInfo") == "true" ? true : false;
    this.sso.setEndpointRedirectTo([]);
    let that = this;
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        if (that.websocketservice.getCurrentMonitorInfo(that.monitorType)) {
          let filterData = that.websocketservice.getCurrentMonitorInfo(that.monitorType);
          if (filterData && filterData['monitorId']) {
            let params = {
              "orgId": filterData.orgId,
              "monitorType": that.monitorType,
              "networkId": filterData['networkId'],
              "monitorId": filterData['monitorId'],
              "graphType": "TRF",
              "replay": "true",
              "startTime": filterData['startTime'],
              "endTime": (new Date()).getTime()
            };

            that.send(that.monitorType, params);
            return;
          }
          that.websocketservice.listen('REPLAY');
        }
      }
    });

    // this.watchEPSearch();
    //this.websocketservice.Checkconnectornot();

    this.webSocketConnectionError();
    this.checkLastSubscriptiontime();
    this.reConnectWebSocket();
    this.language = this.customTranslateService.defualtLanguage;
    this.rate = this.language.RATE;
    this.packet = this.language.PACKET;
    // if (this.language) {
    //   this.pageAvailable = true
    // }
    this.languageSubject = this.customTranslateService.selectedLanguage.subscribe(data => {

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

      this.topLocationsUpChartoptions = null;
      this.topLocationsDownChartoptions = null;
      this.topEndPointUpChartoptions = null;
      this.topEndPointDownChartoptions = null;

      setTimeout(() => {
        let epData = this.optnsMngr.getTopEP();
        this.makeTEPEvents(epData);
        let locData = this.optnsMngr.getTopLoc();
        this.makeTLOCEvents(locData);
      }, 300)
      this.setTitle(this.router.url)
    })

    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && this.isCcoTraffic) {
      if (scopes && (scopes['cloud.rbac.coc.traffic.applications.realtime'].indexOf('write') !== -1)) {
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

    if (!this.hasApplicationAccess) {
      this.sso.setPageAccess(false);
      //this.router.navigate(['/cco/traffic/applications/reports']);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.getRtData();

    this.topLengths = [
      { name: 'Top 5', value: 5 },
    ];

    let scope = this.sso.getScopes();
    if (scope) {
      if (scope && scope['cloud.fa.network.realtime'] && scope['cloud.fa.network.realtime'].indexOf('write') === -1) {
        this.createFavorite = false;
        this.createRecord = false;
      }
    }

    // this.orgId = this.sso.getOrgId();
    let url = this.router.url;
    this.orgId = this.sso.getOrganizationID(url);
    this.orgid_tenantid = this.orgId + '_' + '0';
    this.applicationWSRequestObj.orgId = this.orgId;
    this.applicationWSRequestObj.networkId = this.orgid_tenantid;
    this.pageAvailable = false
    setTimeout(() => {
      this.Initialloading = false;
    }, 2000)

    if (this.websocketservice.getCurrentMonitorInfo(this.monitorType) && !this.route.snapshot.queryParams['id']) {
      let filterData = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
      if (filterData && filterData['monitorId'] && filterData['monitorId'].length) {
        let arr = filterData['monitorId'].split("@@");
        if (filterData['isLocAll'] && filterData['isLocAll'] === true) {
          this.locationsSelected = ['All']
        } else if (filterData['isLocAll'] === 'None') {
          this.locationsSelected = undefined;
        } else {
          this.locationsSelected = (arr && arr[1]) ? arr[1].split(',') : [];
        }
        if (filterData['isAppAll'] && filterData['isAppAll'] === true) {
          this.applicationsSelected = ['All']
        } else {
          this.applicationsSelected = (arr && arr[0]) ? arr[0].split(',') : [];

          //redirect from endpoint traffic realtime
          // if(this.route.snapshot.queryParams['urlAppId'] && this.applicationsSelected && this.applicationsSelected[0]){

        }

        this.applyFilter();
      }

    }

    this.route.queryParams.subscribe((params: any) => {
      if (params['id']) {
        this.urlParams = params;
        this.pageAvailable = true;
        this.isMultiple = false;
        window.sessionStorage.removeItem('coc_Traffic_Application_showMultiple');
        window.sessionStorage.removeItem('coc_Traffic_Application_multiChart_Value');
        this.websocketservice.setMonitorType(this.monitorType);

        if (this.websocketservice.getWindowLen()) {
          //this.selectedOption = this.websocketservice.getWindowLen();
        }

        this.applicationsSelected = [params['id']];
        this.connectSubs = this.websocketservice.connectWS$.subscribe((res: any) => {
          if (res) {
            if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
              this.send('remove', this.monitorType);
            }

            this.loading = true;
            this.websocketservice.listen(this.monitorType);
            this.websocketservice.listen('error_traffic_APP');
            this.applicationWSRequestObj.monitorId = this.applicationsSelected.join(",");
            this.applicationWSRequestObj.monitorType = this.monitorType;
            this.send(this.monitorType, this.applicationWSRequestObj);
          }
        });
      }
    });

    this.wsDelay = (Math.abs(this.sso.getRealtimeDelay()) / 60000);
    this.wsDelay = Number.isInteger(this.wsDelay) ? this.wsDelay : this.wsDelay.toFixed(1);

    this.orgidfromlocal = localStorage.getItem('calix.org_id') ?? ' ';
    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    if (sessionStorage.getItem('Orgacceforssid')) {
      this.secureAccessRole = 'Calix'
    }
    else {
      this.secureAccessRole = 'BSP'
    }
  }

  send(eventname, data) {
    this.websocketservice.emit(eventname, data);
  }

  constructMonitorId(applicationGroupid, applicationid, locationid) {
    let monitorId = "";
    let applicationIdString;
    let applicationGroupIdString;
    let locationIdString;
    if (applicationid && applicationid.length && !applicationid.includes('All') || (applicationGroupid && applicationGroupid.length)) {
      applicationIdString = applicationid?.join();
      applicationGroupIdString = applicationGroupid?.join();
    }
    else {
      let id = [];
      if (this.applications?.length > 0) {
        this.applications.forEach(element => {
          if (element.name !== 'All') {
            id.push(element.value);
          }
        });
        applicationIdString = id.join();
      }

      else if (this.applicationGroups?.length > 0) {
        let id = [];
        this.applicationGroups.forEach(element => {
          if (element.name !== 'All') {
            id.push(element.name);
          }
        });
        applicationGroupIdString = id.join();
      } else {
        let currnetInfo = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
        let applicationMonitorId = currnetInfo['monitorId'].split('@@')
        applicationIdString = applicationMonitorId[0];
        let applicationGroupMonitorId = currnetInfo['monitorId'].split('@@')
        applicationGroupIdString = applicationGroupMonitorId[0];
      }
    }

    if (locationid && locationid.length && !locationid.includes('All')) {
      locationIdString = locationid.join();
    }
    else {
      let id = [];
      if (this.locations?.length > 0) {
        this.locations.forEach(element => {
          if (element.name !== 'All') {
            id.push(element.value);
          }
        });
        locationIdString = id.join();
      } else {
        let currnetInfo = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
        let locationMonitorId = currnetInfo ? currnetInfo['monitorId'].split('@@') : [];
        locationIdString = locationMonitorId.length > 0 ? locationMonitorId[1] : '';
      }
    }
    if (locationid === undefined || locationid?.length === 0) {
      locationIdString = '';
    }

    if (applicationIdString && locationIdString) {
      monitorId = applicationIdString + '@@' + locationIdString
    }
    else if (applicationGroupIdString && locationIdString) {
      monitorId = applicationGroupIdString + '@@' + locationIdString
    } else {
      monitorId = applicationIdString ? applicationIdString : applicationGroupIdString ? applicationGroupIdString : locationIdString;
    }
    return monitorId;
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

  applyFilterOrModal(showSensitiveChecked: boolean, modal: any) {
    if ((this.applicationsSelected && this.applicationsSelected.length) || (this.applicationGroupSelected && this.applicationGroupSelected.length)) {
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
    } else {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }

  sensitiveModalCancel(modal): void {
    modal.close('');
    this.sensitiveChecked = false;
  }

  applyFilter() {

    this.getRecordingStatus();
    this.selectedTime = this.selectedOption;
    if ((this.applicationsSelected && this.applicationsSelected.length) || (this.applicationGroupSelected && this.applicationGroupSelected.length)) {

      this.loading = true;
      this.pageAvailable = true;
      this.showAlert = false;
      let monitorId = this.constructMonitorId(this.applicationGroupSelected, this.applicationsSelected, this.locationsSelected);

      if (this.websocketservice.getCurrentMonitorInfo(this.monitorType) && this.isCallRemove) {
        let filterData = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
        if (filterData['monitorId'] === monitorId) {
          this.loading = false;
          return;
        }
        this.send('remove', this.monitorType);
        this.isCallRemove = false;
      }

      this.websocketservice.setMonitorType(this.monitorType);

      //this.websocketservice.removeExistingListeners();

      if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
        let filterData = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
        if (filterData && filterData['monitorId'] && filterData['monitorId'] === monitorId) {
          // filterData['graphType'] = 'TRF';
          // filterData['endTime'] = (new Date()).getTime();
          if (this.websocketservice.getWindowLen()) {
            this.selectedOption = this.websocketservice.getWindowLen();
            this.selectedTime = this.websocketservice.getWindowLen();
          }
          //this.send("REPLAY", filterData);

          let params = {
            "orgId": filterData.orgId,
            "monitorType": this.monitorType,
            "networkId": filterData['networkId'],
            "monitorId": filterData['monitorId'],
            "graphType": "TRF",
            "replay": "true",
            "startTime": filterData['startTime'],
            "endTime": (new Date()).getTime()
          };
          this.send(this.monitorType, params);

          return;
        }

      }

      this.websocketservice.listen(this.monitorType);
      this.websocketservice.listen('REPLAY');
      this.websocketservice.listen('error_traffic_APP');

      this.applicationWSRequestObj.orgId = this.orgId;
      this.applicationWSRequestObj.networkId = this.orgid_tenantid;
      this.applicationWSRequestObj.monitorId = monitorId;
      this.applicationWSRequestObj.monitorType = this.monitorType;

      this.removeOldData();

      this.send(this.monitorType, this.applicationWSRequestObj);

      if (this.selectedOption) {
        this.websocketservice.setWindowLen(this.selectedOption);
      }

      setTimeout(() => {
        if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
          let currentInfo = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
          if (this.applicationsSelected?.includes('All')) {
            currentInfo['isAppAll'] = true;
          } else {
            currentInfo['isAppAll'] = false;
          }
          if (this.locationsSelected && this.locationsSelected.length > 0) {
            if (this.locationsSelected.includes('All')) {
              currentInfo['isLocAll'] = true;
            } else {
              currentInfo['isLocAll'] = false;
            }
          } else {
            currentInfo['isLocAll'] = 'None';
          }

          this.websocketservice.connectionTypes[this.monitorType] = currentInfo;
        }
      }, 500)

    } else {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }

    setTimeout(() => {
      this.loading = false;
    }, 15000)

  }

  removeOldData() {
    this.data = {
      maxRate: [0, 0],
      packet: [0, 0]
    }

    let barData = {
      upData: [],
      downData: []
    }

    this.makeTEPEvents(barData);
    this.makeTLOCEvents(barData)
  }

  closeAlertRole() {
    this.showAlert = false;
  }
  clearFilter() {

    // this.topEndPointUpChartoptions = null;
    // this.topEndPointDownChartoptions = null;
    // this.topAppsUpChartoptions = null;
    // this.topAppsDownChartoptions = null;
    // this.topLocationsUpChartoptions = null;
    // this.topLocationsDownChartoptions = null;    
    this.streamChild?.forEach(child => {
      child.removePrevious();
    });
    this.cachePacketData = {};
    this.cacheRateData = {};
    let barData = {
      upData: [],
      downData: []
    }
    this.makeTEPEvents(barData);
    this.makeTLOCEvents(barData);
    if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
      this.send('remove', this.monitorType);
    }
    this.websocketservice.connectionTypes[this.monitorType] = undefined;

    this.selectedOption = 1;
    this.selectedTime = 1;
    this.locationsSelected = [];
    this.applicationsSelected = [];
    this.applicationGroupSelected = [];
    this.pageAvailable = false;
    this.showAlert = false;
    this.isCallRemove = false;
  }

  ngAfterViewInit() {
    // this.favoriteComponent = this.realtimeFavCreatePop;
    // this.recordingComponent = this.recordCreatePop;
  }

  // getChartOptions(data: any) {
  // }

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
      let data = this.optnsMngr.getTopEP();
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getTopApp();
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getTopLoc();
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
        let data = this.optnsMngr.getTopEP();
        console.log(data,"let data = this.optnsMngr.getTopEP();")
        this.makeTEPEvents(data);
        break;
      case 'TAPP':
        this.fsChartDetails = {
          topChart: 'TAPP',
          title: 'Applications'
        };
        let dataTapp = this.optnsMngr.getTopApp();
        this.makeTAPPEvents(dataTapp);
        break;
      case 'TLOC':
        this.fsChartDetails = {
          topChart: 'TLOC',
          title: 'Locations'
        };
        let dataTloc = this.optnsMngr.getTopLoc();
        this.makeTLOCEvents(dataTloc);
        break;
      default:
    }
  }
  ipAddress(data) {
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
    this.topLengths = [
      {
        name: this.language['Top 5 ' + this.fsChartDetails?.title],
        value: 5
      },
      {
        name: this.language['Top 10 ' + this.fsChartDetails?.title],
        value: 10
      },
      {
        name: this.language['Top 20 ' + this.fsChartDetails?.title],
        value: 20
      },
      {
        name: this.language['Top 30 ' + this.fsChartDetails?.title],
        value: 30
      },
    ];
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

    this.websocketservice.clearReplayData();
    this.clearTopN();

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    let data: any = {}
    this.websocketservice.rtData$.next(data);

    if (this.isMultiple && this.loadedMultipleChart?.length > 0) {
      this.setMultipleOptions(this.isMultiple);
      this.setMultipleChartValue(this.loadedMultipleChart);
    }

    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }

    if (this.connectionErSubscription) {
      this.connectionErSubscription.unsubscribe();
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
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
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
  //   this.router.navigate(['cco/traffic']);
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
    this.pageAvailable = true;
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
      console.log("cache data subscription", data)
      this.cachePacketData = data['packet'];
      this.cacheRateData = data['rate'];
      this.loading = false;
      this.connectionError = false;

    });

    this.ratePacketStreamSubscription = this.websocketservice.ratePacketStreamData$.subscribe((data: any) => {
      console.log("subscription data", data);
      this.showRealTime = true;
      if (data.monitorType == this.monitorType) {
        this.loading = false;
        this.connectionError = false;
        if (data.graphType === 'TRF') {
          this.lastSubscriptionTime = new Date().getTime();
          let tmpArr = data['monitorString'] ? data['monitorString'].split("/") : [];
          this.data = data;
          this.showRealTime = true;

        } else {
          this.showBars = false;
        }
      }

      this.loading = false;
    })

    this.rtSubscription = this.websocketservice.rtData$.subscribe((data: any) => {
      let tmpArr = data['monitorString'] ? data['monitorString'].split("/") : [];
      if (data.monitorType == this.monitorType) {
        this.lastRtSubscriptionTime = new Date().getTime();
        this.loading = false;
        this.connectionError = false;
        if (data.graphType === 'TEP') {
          this.topEndPointUpChartoptions = null;
          this.optnsMngr.setTopEP(data);
          this.makeTEPEvents(data);
        }

        if (data.graphType === 'TLOC') {
          let findUpIndex = data.upData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000");
          if (findUpIndex > -1) {
            data.upData.splice(findUpIndex, 1);
          }
          let findDownIndex = data.downData.findIndex(x => x.name === "Unknown" && x.id === "00000000-0000-0000-0000-000000000000");
          if (findDownIndex > -1) {
            data.downData.splice(findDownIndex, 1);
          }
          this.optnsMngr.setTopLoc(data);
          this.makeTLOCEvents(data);
        }
      }

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
    let upLen = data['upData']?.length;
    let downLen = data['downData']?.length;
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

    topEndPointUpChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 180;
    topEndPointUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(upLen) : 14;

    topEndPointDownChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 180;
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
        },
        contextmenu: function (event) {
          event.preventDefault();
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          // that.navigationByUrl(this.category = '', that.tepUpDataObj[this.value], 'Endpoints');
          let newTabUrl = window.location.origin + url + '?id=' + this.axis.categories[this.pos][1];
          window.open(newTabUrl, '_blank');
        }
      }
    }
    topEndPointUpChartoptions['plotOptions'].series.point.events = {
      click: function (event) {
        window.sessionStorage.setItem('endpointName', this.category[0]);
        that.navigationByUrl(this.category[0], this.category[1], 'Endpoints');
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tepUpDataObj[this.value], 'Endpoints');
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
        },
        contextmenu: function (event) {
          event.preventDefault();
          window.sessionStorage.setItem('endpointName', this.axis.categories[this.pos][0]);
          // that.navigationByUrl(this.category = '', that.tepDownDataObj[this.value], 'Endpoints');
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

    // if (this.websocketservice.endPointSearchValue != "") {
    //   this.searchEndPoint(this.websocketservice.endPointSearchValue);
    // }

  }

  makeTLOCEvents(data: any): any {
    this.tLPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TLOC') ? this.selectedTopLength : 5;
    let upLen = data['upData']?.length;
    let downLen = data['downData']?.length;
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

    topLocationsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 180;
    delete topLocationsUpChartoptions.chart.width;
    topLocationsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(upLen) : 14;

    topLocationsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 180;
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
    this.tAPrcntData = {
      downPercentage: data.downPercentage ? data.downPercentage : 0,
      upPercentage: data.upPercentage ? data.upPercentage : 0
    };

    let len = (this.fsView && this.fsName === 'TAPP') ? this.selectedTopLength : 5;
    let upLen = data['upData']?.length;
    let downLen = data['downData']?.length;
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

    topAppsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 180;
    delete topAppsUpChartoptions.chart.width;
    topAppsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(upLen) : 14;

    topAppsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 180;
    delete topAppsDownChartoptions.chart.width;
    topAppsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(downLen) : 14;

    let that = this;
    topAppsUpChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topAppsUpChartXaxis text-primary"  id="${this.value[1]}"  style=" cursor:pointer">${this.value[0]}</span>`;
      },
    }
    topAppsUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tapUpDataObj[this.value], 'Apps');
      }
    }
    topAppsDownChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topAppsDownChartXaxis text-primary "  id="${this.value[1]}" style=" cursor:pointer">${this.value[0]}</span>`;
      },
    }
    topAppsDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tapDownDataObj[this.value], 'Apps');
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
      let data = this.optnsMngr.getTopEP();
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getTopApp();
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getTopLoc();
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
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tepUpDataObj = obj;
  }

  public gettepUpDataObj(): any {
    return this.tepUpDataObj;
  }

  public settepDownDataObj(data: any): any {
    let obj = {};
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tepDownDataObj = obj;
  }

  public gettepDownDataObj(): any {
    return this.tepDownDataObj;
  }

  public settapUpDataObj(data: any): any {
    let obj = {};
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tapUpDataObj = obj;
  }

  public gettapUpDataObj(): any {
    return this.tapUpDataObj;
  }

  public settapDownDataObj(data: any): any {
    let obj = {};
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tapDownDataObj = obj;
  }

  public gettapDownDataObj(): any {
    return this.tapDownDataObj;
  }

  public settlocDownDataObj(data: any): any {
    let obj = {};
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tlocDownDataObj = obj;
  }

  public gettlocDownDataObj(): any {
    return this.tlocDownDataObj;
  }

  public settlocUpDataObj(data: any): any {
    let obj = {};
    data?.forEach((element) => {
      obj[element.name] = element.id;
    });
    this.tlocUpDataObj = obj;
  }

  public gettlocUpDataObj(): any {
    return this.tlocUpDataObj;
  }

  clearSearch(search, select) {
    search.value = '';
    select.filter('');
    this.searchInputLocText = '';
    this.searchInputAppText = '';
    this.searchInputAppGroupText = '';
    this.searchInputMultiAppText = '';
  }

  getIndeterminateGroup(item) {
    return item.children && item.children.some(c => c.selected) && !item.children.every(c => c.selected);
  }

  checkLocationIsAll: boolean = false;
  changeLocation() {
    //console.log(this.locationsSelected);
    if (this.locationsSelected?.length > 1 && this.locationsSelected.includes("All")) {
      if (this.locationsSelected.indexOf("All") === 0) {
        let arr = Object.assign([], this.locationsSelected);
        let index = arr.indexOf("All");
        arr.splice(index, 1);
        this.locationsSelected = arr;
      } else if (this.locationsSelected.indexOf("All") > 0) {
        this.locationsSelected = ["All"];
      }
    }
    if (this.locationsSelected.includes("All") || this.locationsSelected?.length === 0 || this.locationsSelected === undefined) {
      this.checkLocationIsAll = true;
    }
    if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
      this.isCallRemove = true;
    }
  }

  changeMultipleLocation() {
    let multipleLocation = [];
    this.multipleLocationSelected?.forEach(el => {
      this.locations?.forEach((element: any) => {
        if (element.value == el) {
          multipleLocation.push(element.name);
          this.multipleLocationName = element.name;
        }
      });
    });
    if (multipleLocation && multipleLocation.length) {
      this.multipleLocationName = multipleLocation.join();
    } else {
      this.multipleLocationName = "";
    }
    this.multipleLocationName = this.multipleLocationName ? this.multipleLocationName : "";
  }

  clearMultipleLocations() {
    this.multipleLocationSelected = [];
    this.multipleLocationName = "";
  }

  multiLocations: any;
  getLocations(): any {
    let url = `${environment.FA_API_BASE_URL}config/location?org-id=${this.sso.getOrganizationID(this.router.url)}`;
    this.locSubs = this.http.get(url).subscribe((json: any) => {
      let data = [];
      json?.forEach(element => {
        data.push({
          name: element.name,
          value: element._id,
          region: element.region ? element.region : null
        });

        this.locObj[element._id] = element.name;
      });
      let obj = {
        name: "All",
        value: "All"
      }
      data = data.filter((value, index, self) =>
        index === self.findIndex((t) => (t.value === value.value))
      );
      this.locations = [...data];
      this.locations.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false })).sort((a, b) => (a["region"] || "").toString().localeCompare((b["region"] || "").toString(), 'en', { numeric: false }));
      // this.locations.splice(0, 0, obj);
      this.multiLocations = [...data];
      this.multiLocations.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
    }, (err: HttpErrorResponse) => {
      this.locations = [];
    });
  }

  selectAllApplication(event) {
    if (event.target.checked) {
      this.applicationsSelected = [...new Set(this.applications.map(x => x.value))];
    } else {
      this.applicationsSelected = [];
    }
  }
  selectAllLocations(event) {
    if (event.target.checked) {
      this.locationsSelected = this.locations?.length > 0 ? [...new Set(this.locations.map(x => x.value))] : ['All'];
    } else {
      this.locationsSelected = [];
    }
  }
  selectAllMultipleLocations(event) {
    if (event.target.checked) {
      this.multipleLocationSelected = [...new Set(this.multiLocations.map(x => x.value))];
    } else {
      this.multipleLocationSelected = [];
    }
  }

  changeApplication() {
    if (this.applicationsSelected?.length > 1 && this.applicationsSelected.includes("All")) {
      if (this.applicationsSelected.indexOf("All") === 0) {
        let arr = Object.assign([], this.applicationsSelected);
        let index = arr.indexOf("All");
        arr.splice(index, 1);
        this.applicationsSelected = arr;
      } else if (this.applicationsSelected.indexOf("All") > 0) {
        this.applicationsSelected = ["All"];
      }
    }
    if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
      this.isCallRemove = true;
    }
  }

  changeApplicationGroup() {
    if (this.websocketservice.getCurrentMonitorInfo(this.monitorType)) {
      this.isCallRemove = true;
    }
    //console.log(this.applicationGroupSelected, "applicationGroupSelected");
  }

  changeMultipleApplication() {
    if (this.multipleApplicationSelected?.length > 0) {
      this.multiApplications?.forEach((element: any) => {
        if (element.value == this.multipleApplicationSelected) {
          this.multipleApplicationName = element.name;
        }
      });
    } else {
      this.multipleApplicationName = '';
    }
    this.multipleApplicationName = this.multipleApplicationName ? this.multipleApplicationName + " - " : "";
  }

  getAppsOld(): any {
    //let url = `${environment.FA_API_BASE_URL}config/application?org-id=${this.sso.getOrgId()}`;
    let url = `${environment.FA_API_BASE_URL}config/application?org-id=0`;
    this.appSubs = this.http.get(url).subscribe((json: any) => {
      let data = [];

      if (json) {
        json?.forEach(element => {
          data.push({
            label: element.name,
            value: element._id,
            app: element.name
          });

          this.appObj[element._id] = element.name;
        });
      }


      this.applications = [...data];
    }, (err: HttpErrorResponse) => {
      this.applications = [];
    });
  }

  multiApplications: any = [];
  getApps() {
    const requestEndpoints = [
      `${environment.faAdminURL}application?org-id=0`,
      `${environment.faAdminURL}application?org-id=${this.sso.getOrganizationID(this.router.url)}`,
      `${environment.faAdminURL}application-group?org-id=0`,
      `${environment.faAdminURL}application-group?org-id=${this.sso.getOrganizationID(this.router.url)}`,
    ];

    const requests = [];

    requestEndpoints?.forEach(endpoint => {
      const req = this.apiService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }), catchError((error: any) => {
        return of(error);
      }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.globalApps = response[0];
      this.curOrgApps = response[1];
      let applicationGroup: any = [];
      if (Array.isArray(response[2]) || Array.isArray(response[3])) {
        applicationGroup = [...response[2], ...response[3]];
      }
      this.applications = [];
      let obj = {
        label: "All",
        name: "All",
        value: "All"
      }
      if (Array.isArray(this.combineApps())) {
        this.applications = [...this.combineApps()];
        this.multiApplications = [...this.combineApps()];
      }

      this.applications?.forEach(element => {
        applicationGroup?.forEach(items => {
          if (element._id === items.applicationId) {
            element['groupName'] = items.trafficTypeName;
            element['groupId'] = items.groupId;
          }
        })
      })

      let application = [];
      applicationGroup?.forEach(items => {
        if (items.marketingCloudAppName) {
          let obj = {
            app: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            groupName: items.trafficTypeName,
            groupId: items.groupId,
            label: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            name: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            _id: items.applicationId,
            value: items.applicationId
          }
          application.push(obj)
        }
      })

      // this.applications.forEach(element => {
      //   application.forEach(items => {
      //     if (element.name === items.name && !element.groupName) {
      //       element['groupName'] = items.groupName;
      //     }
      //     if (!element.groupName && element.name.includes('VPN') && items.groupName === 'VPN') {
      //       element['groupName'] = items.groupName;
      //     }
      //   })

      // })

      // this.applications = this.applications.reduce((unique, obj1) => {
      //   if (!unique.some(obj => obj.name === obj1.name && obj.groupName === obj1.groupName)) {
      //     unique.push(obj1);
      //   }
      //   return unique;
      // }, []);

      this.applications.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
      this.multiApplications.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));

      let result = this.applications.filter(element => {
        if (element['groupName']) {
          return element;
        }
      });

      let result1 = this.applications.filter(element => {
        if (!element['groupName']) {
          return element;
        }
      });

      let finalResult = [];
      if (Array.isArray(result) || Array.isArray(result1)) {
        finalResult = [...result1, ...result];
      }
      this.applications = [...finalResult].filter((value, index, self) =>
        index === self.findIndex((t) => (t.value === value.value))
      );
      this.applications.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));

      const orgId = this.sso.getOrganizationID(this.router.url);
      this.applicationGroups = [];
      const appGroups = this.applications ? this.applications.filter(a => a.groupId) : [];// splitted accordingly for application group drop down
      appGroups?.forEach(g => {
        const group = this.applicationGroups.find(a => a.name == g.groupName);
        if (!group) {
          this.applicationGroups.push({ id: g.groupId, name: g.groupName })
        } else if (g.orgId == orgId) {
          this.applicationGroups = this.applicationGroups.filter(a => a.name != g.groupName);
          this.applicationGroups.push({ id: g.groupId, name: g.groupName })
        }
      });
      this.applicationGroups.sort((a, b) => (a.name || "").toString().localeCompare((b.name || "").toString(), 'en', { numeric: false }));

      if (this.urlParams && this.urlParams['id']) {
        this.assignUnMappedPort(this.urlParams['id']);
      }

      // from endpoint realtime to application realtime
      if (this.applicationsSelected && this.applicationsSelected.length > 0) {
        let invAppId = this.applicationsSelected.filter(el => !this.validateUUID(el));
        if (invAppId && invAppId.length > 0) {
          this.assignUnMappedPort(invAppId[0]);
        }
      }

    });
  }

  assignUnMappedPort(app_id) {
    let filterValue = this.applications.filter(element => {
      return element.value === app_id
    })
    if (filterValue && filterValue.length === 0) {
      let id = app_id;
      if (!this.validateUUID(id)) {
        let obj = {
          app: "All",
          label: 'Unmapped Port',
          name: 'Unmapped Port',
          type: "Global",
          value: app_id,
          _id: app_id
        }
        this.applications.push(obj);
      }
    }
  }

  combineApps() {
    let curOrgApps = this.curOrgApps ? this.curOrgApps : [];
    let globalApps = this.globalApps ? this.globalApps : [];
    let temp;
    let availCurOrgApps: any = [];
    let data = [];

    if (curOrgApps && Array.isArray(curOrgApps)) {
      curOrgApps = curOrgApps.map((obj) => {
        if (!obj) return;
        obj.type = "Local";
        obj.type = "Global";
        obj['label'] = obj.name;
        obj['value'] = obj._id;
        obj['app'] = obj.name;
        this.appObj[obj._id] = obj.name;
        return obj;
      });
    }
    let curs = curOrgApps?.length ? curOrgApps.slice(0) : [];
    if (globalApps && globalApps.length) {
      let currentOrgName: any = "";
      if (curOrgApps && Array.isArray(curOrgApps)) {
        currentOrgName = curOrgApps.map((obj) => obj.name);
      }
      globalApps = globalApps.map((obj) => {
        if (obj) {
          const currentOrgIndex = currentOrgName.indexOf(obj.name);
          if (currentOrgIndex == -1) {
            obj.type = "Global";
            obj['label'] = obj.name;
            obj['value'] = obj._id;
            obj['app'] = obj.name;
            this.appObj[obj._id] = obj.name;
          } else {
            obj = curOrgApps[currentOrgIndex];
            curs.splice(currentOrgIndex, 1);
          }
          return obj;
        }

      });
      globalApps = [...globalApps, ...curs];

    } else if (curOrgApps?.length) {
      globalApps = curOrgApps
    }

    return globalApps;

  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    // if (err.status == 401) {
    //   errorInfo = this.language['Access Denied'];
    // } else {
    //   errorInfo = this.commonOrgService.pageErrorHandle(err);
    // }
    // this.commonOrgService.openErrorAlert(errorInfo);
    // this.commonOrgService.pageScrollTop();
    // this.loading = false;

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

      // let urlQueryParams = {};
      // urlQueryParams['queryParams'] = {
      //   id: id
      // };
      // if(this.urlParams && this.urlParams['id'] && this.urlParams['id'] != ''){
      //   urlQueryParams['queryParams']['urlAppId'] = true;
      // }
      // this.router.navigate([url], urlQueryParams);
    }
  }

  clearTopN() {
    this.optnsMngr.setTopEP([]);
    this.optnsMngr.setTopApp([]);
    this.optnsMngr.setTopLoc([]);
  }

  setWindowLength() {
    this.websocketservice.setWindowLen(this.selectedOption);
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

  setMultiple(): void {
    this.isMultiple = !this.isMultiple;
  }

  setMultipleOptions(data: any): any {
    window.sessionStorage.setItem('coc_Traffic_Application_showMultiple', JSON.stringify(data));
  }

  getMultipleOptions(): any {
    return window.sessionStorage.getItem('coc_Traffic_Application_showMultiple') ? JSON.parse(window.sessionStorage.getItem('coc_Traffic_Application_showMultiple')) : false;
  }

  setMultipleChartValue(data: any): any {
    window.sessionStorage.setItem('coc_Traffic_Application_multiChart_Value', JSON.stringify(data));
  }

  getMultipleChartValue(): any {
    return window.sessionStorage.getItem('coc_Traffic_Application_multiChart_Value') ? JSON.parse(window.sessionStorage.getItem('coc_Traffic_Application_multiChart_Value')) : [];
  }

  btnDisable: boolean = false;
  loadMultipleChart() {
    this.multipleSelectedTime = this.multipleSelectedOption;
    if (!this.multipleApplicationSelected?.length) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      return;
    }

    this.showAlert = false;
    let IsDuplicate = false;
    let doWSCall = true;
    let position = 0;
    let monitorId = this.constructMultipleMonitorId(this.multipleApplicationSelected, this.multipleLocationSelected);
    if (this.loadedMultipleChart?.length > 0) {
      this.loadedMultipleChart?.forEach(element => {
        if (element.monitorId === monitorId) {
          doWSCall = false;
        }
        if (element.monitorId === monitorId && element.selectedTime === this.multipleSelectedTime && element.Type === this.metricSelected) {
          IsDuplicate = true;
        }
        if (element.monitorId === monitorId && element.Type === this.metricSelected) {
          position = position + 1;
        }
      });
    }
    let multipleLocationName = this.multipleLocationName ? this.multipleLocationName + ' - ' : "";
    if (!IsDuplicate) {
      this.loadedMultipleChart.push({
        monitorId: monitorId,
        Type: this.metricSelected,
        Name: this.multipleApplicationName + multipleLocationName,
        windowLen: this.windowLen,
        IsDuplicate: IsDuplicate,
        Position: position,
        doWSCall: doWSCall,
        replay: false,
        startTime: (new Date()).getTime(),
        selectedTime: this.multipleSelectedTime
      });
      this.loadedMultipleChart = [...this.loadedMultipleChart];
    }

    this.multiplePageAvailable = true;
    if (this.loadedMultipleChart?.length >= 9) {
      this.btnDisable = true;
    }
  }

  setMultipleWindowLength() {
  }

  clearMultipleChart() {
    this.multipleSelectedOption = 1;
    this.multipleSelectedTime = 1;
    this.multipleLocationSelected = null;
    this.multipleApplicationSelected = null;
    this.multiplePageAvailable = false;
    this.showAlert = false;
    this.loadedMultipleChart = [];
    this.metricSelected = 'Rate';
    this.multipleApplicationName = null;
    this.multipleLocationName = null;
    this.btnDisable = false;
  }

  clearChartContainer(values: any) {
    var findindex = this.loadedMultipleChart.findIndex(x => x.monitorId === values.monitorId && x.Type === values.Type && x.Position === values.Position);
    if (findindex > -1) {
      this.loadedMultipleChart.splice(findindex, 1);
    }
    if (this.loadedMultipleChart?.length <= 9) {
      this.btnDisable = false;
    }
  }

  constructMultipleMonitorId(applicationid, locationid) {
    let monitorId = "";
    let locationIdString = ""
    if (locationid && locationid.length) {
      locationIdString = locationid.join();
    }
    if (applicationid && locationIdString) {
      monitorId = applicationid + '@@' + locationIdString;
    }
    else {
      monitorId = applicationid ? applicationid : locationid;
    }
    return monitorId;
  }

  goToRecordingList() {
    // let newTabUrl = window.location.origin + '/cco/record/list';
    // window.open(newTabUrl, '_blank');
    this.setMultipleOptions(this.isMultiple);
    this.setMultipleChartValue(this.loadedMultipleChart);
    let redirectUrl = '/cco/traffic/applications/realtime';
    if (!this.isCcoTraffic) {
      redirectUrl = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/application/realtime' : '/organization-admin/flowAnalyze/traffic/application/realtime';
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
      this.date = new Date(date.getTime() + (this.timeDiff > 0 ? this.timeDiff : (1 * 60 * 60 * 1000)));
      this.minDate = new Date(date.getTime() + (this.timeDiff > 0 ? this.timeDiff : (1 * 60 * 60 * 1000)));
    }
    this.recordingName = "Application_" + (pipe.transform(new Date(), "yyyy-MM-dd")) + "_" + new Date().toTimeString().substr(0, 8)
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
    let monitorId = this.constructMonitorId(this.applicationGroupSelected, this.applicationsSelected, this.locationsSelected);
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
    if (this.recordingName?.length > 72) {
      this.error = true;
      this.errorInfo = "Name should not have more than 72 characters"
      return;
    } else if (this.description?.length > 255) {
      this.error = true;
      this.errorInfo = "Description should not have more than 255 characters ";
      return;
    }

    let params = {
      "orgId": this.orgId,
      "tenentid": "0",
      "monitorType": this.monitorType,
      "graphType": "TRF,TLOC,TEP",
      "startTime": startTime,
      "name": this.recordingName,
      "description": this.description,
      "length": length,
      "status": "New",
      "userId": userId,
      "recordingType": "traffic",
      "trigger": "Manual",
      "monitorId": monitorId
    };
    this.btnDisabled = true;
    // console.log("params", params);
    this.send("RECORDING", params);
    this.websocketservice.listenRecord("RECORDING");
    this.websocketservice.listenRecord("error");

    this.recordWsSubscription = this.websocketservice.recordResponseData$.subscribe((res: string) => {
      this.btnDisabled = false;
      if (res?.includes('Successfully')) {
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
        let epData = this.optnsMngr.getTopEP();
        epData.upData = []
        epData.downData = []
        this.makeTEPEvents(epData);
        this.optnsMngr.setTopEP(epData);

        let locData = this.optnsMngr.getTopLoc();
        locData.upData = []
        locData.downData = []
        this.makeTLOCEvents(locData);
        this.optnsMngr.setTopLoc(locData);
      }
    }, 15000)
  }

  recordingStatus: boolean = false;
  getRecordingStatus() {
    let monitorId = this.constructMonitorId(this.applicationGroupSelected, this.applicationsSelected, this.locationsSelected);
    let params: any = {
      monitorType: this.monitorType,
      monitorId: monitorId
    };
    let userId = localStorage.getItem("calix.userId")
    let url = `${environment.API_BASE_URL}record/job/status/Recording?orgId=${this.orgId}&tenentid=0&userId=${userId}`;
    this.statusSubs = this.http.post(url, params).subscribe((res: any) => {
      if (res) {
        res?.forEach(element => {
          if (element.monitorType === this.monitorType && element.status === "Recording" && element.monitorId === monitorId) {
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
      } else {
        this.recordingStatus = false;
        this.isNow = true;
        this.showDate = true;
      }
    }, (err) => {
    })
  }

  connectionError: boolean = false;
  connectionErrorInfo = "";
  connectionErSubscription: any
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

    this.websocketservice.wsNoResponse$.subscribe((res: any) => {
      if (res && res.isError === true && res.type === "error_traffic_APP") {
        this.loading = false;
      }
    })
  }

  timeDiff = 0;
  getRecordDetails(id: any) {
    this.recordSubs = this.http.get(`${environment.API_BASE_URL}record/job/list/${id}?orgId=${this.orgId}&tenentid=0`).subscribe((data: any) => {
      if (data) {
        let time = new Date().getTime();
        this.timeDiff = data.length - (time - data.startTime);
      }
    }, (err) => {
      this.timeDiff = (1 * 60 * 60 * 1000);
    });
  }

  validateUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid) && uuid != '00000000-0000-0000-0000-000000000000';
  }

  reConnectSubscription: any;
  reConnectWebSocket() {
    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
    this.reConnectSubscription = this.websocketservice.connectWS$.subscribe((res: any) => {
      if (res && this.applicationsSelected) {
        let monitorId = this.constructMonitorId(this.applicationGroupSelected, this.applicationsSelected, this.locationsSelected);
        this.applicationWSRequestObj.monitorId = monitorId;
        this.applicationWSRequestObj.monitorType = this.monitorType;

        let filterData = this.websocketservice.getCurrentMonitorInfo(this.monitorType);
        this.websocketservice.listen(this.monitorType);
        this.websocketservice.listen('REPLAY');
        if (filterData && filterData['startTime']) {
          this.applicationWSRequestObj['startTime'] = filterData['startTime'];
          this.send("LOC", this.applicationWSRequestObj);

          let params = {
            "orgId": filterData.orgId,
            "monitorType": "LOC",
            "networkId": filterData['networkId'],
            "monitorId": filterData['monitorId'],
            "graphType": "TRF",
            "replay": "true",
            "startTime": filterData['startTime'],
            "endTime": (new Date()).getTime()
          };
          this.send("LOC", params);
          this.websocketservice.setWindowLen(this.selectedOption);
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
  showModal(modal) {
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-default-modal clx-modal-default',
    });
  }
  showModalFilterPreset(modal) {
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-default-modal clx-modal-med',
    });
  }
}
