import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // CLI imports router
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from '../../../data.service';
import * as $ from 'jquery';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service'
import { IssuesService } from 'src/app/support/support-overview/services/issues.service';
import { environment } from '../../../../../environments/environment';
import { DeviceService } from 'src/app/support/support-device/service/device.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscribeService } from '../../service/subscriber.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataSerialNumberModel } from '../../models/data.serial-number.model';
import { Subject, Observable, forkJoin, combineLatest, of, asyncScheduler } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { DataBrew } from 'aws-sdk';
import * as moment from 'moment';
import { detectIE } from 'ngx-color-picker/dist/lib/helpers';
import { fakeAsync, waitForAsync } from '@angular/core/testing';
import { PortForwardingApplicationService } from 'src/app/support/support-system/support-router/services/port-forwarding-application.service';
import { identifierName } from '@angular/compiler';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { truncate } from 'fs/promises';
import { DataTableDirective } from 'angular-datatables';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { MarketingExploreDataAssignerService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/data-assigners.service';
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
@Component({
  selector: 'app-subscriber-menu',
  templateUrl: './subscriber-menu.component.html',
  styleUrls: ['./subscriber-menu.component.scss']
})

export class SubscriberMenuComponent implements OnInit, OnChanges {
  //   interface City {
  //     name: string,
  //     code: string
  // }
  @Input() count: any;
  @Input() issues;
  @Input() issuesAndReasons;
  reason: any = []
  hittedfromIssuesApi: any;
  AllIssues: any;
  hasSubscriber: boolean = false;
  multipleRegId: any = [];
  serial: any;
  b: any;
  WIFIRouting: string;
  routerDevices: any = [];
  isQoeDevice: boolean;
  qoeStatus: any;
  stopOverviewActions: boolean = false;
  connectime;
  externalUserNotAllowed: boolean = false;
  notAllowedMenus: NodeListOf<Element>;
  subId: any;
  onlyOntWoEntitl: boolean = false;
  notUpdated: boolean = true;
  commandIqInviteEmail: any = '';
  updateEmailButton: boolean = true;
  commandIqInviteEmailFormat: boolean = true;
  showInputEmail: boolean = false;
  updatedEmail: any;
  commandIqScopeRead: boolean;
  commandIqScopeWrite: boolean;
  showCommandInvite: boolean = false;
  @Input() set sendingCountfromdevice(val) {
    this.tabInfo = this.service.getSubscriberTabInfoData() ?
      this.reStructureOverviewTabInfo(this.service.getSubscriberTabInfoData()) :
      '';
  }
  @Input() responseFromIssuse;

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(e: BeforeUnloadEvent) {
    return this.sso.callOutcomeBeforeUnload(e);
  }

  @HostListener('window:unload', ['$event'])
  onUnload(e: any) {
    this.sso.callOutcomeOnUnload();
  }
  // @Input() set responseFromIssuse(val) {
  //   this.hittedfromIssuesApi = val;
  //   if (val) {

  //     const RG = JSON.parse(localStorage.getItem("calix.deviceData")).filter(obj => (obj.opMode == "RG" && obj.serialNumber));
  //     // if(RG.length)  this.DeviceTabApiHit();
  //     if (RG.length) {
  //       //this.loader = true;
  //       //if(this.tabInfoInterval) clearInterval(this.tabInfoInterval);
  //       this.tabInfo = this.service.getSubscriberTabInfoData() ?
  //         this.reStructureTabInfo(this.service.getSubscriberTabInfoData()) :
  //         '';
  //       if (this.tabInfo) return;

  //       this.networkTabApiHit(RG[0]["serialNumber"]);

  //       /* this.tabInfoInterval = setInterval(() => {
  //         this.networkTabApiHit(subscriberId, RG[0]["serialNumber"]);
  //       }, 60000); */
  //     }
  //   }
  // }
  mouseHover = "false";
  DeviceCount: number;
  Sissusecount;
  Sissuewarning;
  Rissusecount;
  Rissuewarning;
  modelName;
  Dissusecount;
  Dissuewarning;
  Aissusecount;
  Aissuewarning;
  Wissusecount;
  Wissuewarning;
  totalissues = 0;
  totalwarning = 0;
  rgData: any = [];
  overtimecheck: any
  metaData: any;
  isModel7XX: boolean = false;
  wifiDisabled: boolean;
  bSmbMode: boolean = false;
  NewEmail: string = '';
  NewSecondaryEmail: string = '';
  ngOnChanges() {

    this.getIssues();
    this.cdRef.detectChanges();
  }
  radio1 = 'Resolved';
  radio2 = 'this.status[0]';
  radio3 = ' ';
  currActive = 0;
  subreason;
  form: FormGroup;
  alertMessage;
  tabInfo: any = { isArlo: true, isServify: true, isBark: true, isMyComm: true, isCaptive: true };
  language: any;
  languageSubject;
  subscriberInfo;
  status;
  serialNo = [];
  loader = false;
  nwLoader = false;
  subscriberInfoResult: any = {
    service: {},
    commandIQ: {},
    ipInfo: {
      "pppUsername": [],
      "ipAddress": [],
      "secondIpAddress": []
    }
  };

  orgId = +localStorage.getItem("calix.org_id");

  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false
  };
  deviceData: any = [];
  containsGS: any = [];
  issueDataJson: any;
  issuesAndWarnings: any
  isTrafficPage = false;
  scopeFlag: any = {};
  tabInfoInterval: any;
  iserrorService;
  iserrorwifi;
  iserrorDevice;
  iserrorRouter;
  iserrorApplication;
  isError: boolean;
  isoutageError: boolean = false;
  wifiShow: boolean = true;
  isResolved: boolean = false;
  isreason: boolean = true;
  displaysubmit: boolean = false;
  nextbutton: boolean = true;
  successmsg: boolean = false;
  wifiSSIDRead: boolean = false;
  wifiSSIDWrite: boolean = false;
  serviceLoader = false;
  isCMCAvailable = false;
  incompleteDevice: any = '';
  serviceTabInfo: any = {};
  showRanStatus = false;
  showLatencyStatus = true;
  latencyTabInfo: any = {};
  allDeviceData: DataSerialNumberModel[];
  is7xModelPresent: boolean = false;
  showSSIDButton: boolean = false;
  modelNameSerialNumbers = [];
  codelist = ["LATENCY_HIGH", "VIRUS_ATTACK", "CLIENT_DEVICE_LOW_SIGNAL_DETECTED", "CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED",
    "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED", "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED", "REBOOT_ISSUE", "SOFTWARE_UPGRADE_FAILED", "STALE_SOFTWARE_VERSION", "GATEWAY_FAILED",
    "WIFI_RADIO_DISABLED_24G", "WIFI_RADIO_DISABLED_5G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G", "BACKHAUL_TOO_CLOSE", "BACKHAUL_TOO_FAR", "MESH_DEGRADE", "ATTACK_DETECTED",
    "GATEWAY_FAILED", "WAP_FAILED", "SPEED_LOW_75", "SPEED_LOW_75_80", "TRAFFIC_HIGH", "WIFI_INTERFERENCE_HIGH_24G", "WIFI_INTERFERENCE_HIGH_5G", "QOS_DAMP_ALERT", "DS_SPEED_LOW_85", "US_SPEED_LOW_85", "DS_SPEED_LOW_75", "US_SPEED_LOW_75",
    "SFP_THERMAL_TOO_HIGH", "SFP_THERMAL_HIGH", "ONT_OFFLINE", "GC_MAX_DOWNSTREAM_ACHIEVED", "GC_MAX_UPSTREAM_ACHIEVED", "WFH_SSID_WITHOUT_CIQ", "MAP_CONNECTIVITY_FAILED", "WIFI_RADIO_DISABLED_6G",
    "THERMAL_HIGH", "THERMAL_TOO_HIGH", "UI_CREATED_ISSUE_FOR_TR069MAPDOWN", "NOT_CERTIFIED_AND_SFP_NOT_SUPPORTED", "LAN_DISABLED", "NETWORK_RESILIENCE_ACTIVE_WITH_TR69_CONNECTED", "NETWORK_RESILIENCE_ACTIVE_WITH_TR69_DISCONNECTED", "NETWORK_RESILIENCE_INACTIVE",
    'CERTIFIED_BUT_SFP_NOT_SUPPORTED_IN_CURRENT_VERSION', 'LOW_ONT_LIGHT_LEVELS', 'PON_ERRORS', 'LOW_ONT_LEVEL_ISSUE', 'ONT_DS_SDBER_ISSUE', 'ONT_US_SDBER_ISSUE'
  ];
  issueLoader = false;
  searchText = "";
  subjectPasser = 0;
  MODULE: string = 'support';

  callOutComeSubTitle: string = "Root Cause";
  callOutComeStatus: string = "Resolved";
  selection: string = "multiple";
  categoriesData: any = [];

  callOutComeData: any = {};
  callOutComeStatuses: any = [];
  selectedStatusName: string = "";
  categoryName: string;
  selectedSingleCategoryName: string;
  modalLoader: boolean = false;
  // dtOptions1: DataTables.Settings = {
  //   pagingType: 'full_numbers',
  //   pageLength: 10,
  //   lengthChange: false,
  //   serverSide: true,
  //   processing: false,
  //   dom: 'tipr',
  // };

  dtOptions1: DataTables.Settings = {}
  callHistoryDatatableVisible: boolean = false;


  CHTableData: any = [];
  tempCHTableData: any = [];
  chCount: any;
  disablecCallOutComeSavebutton: boolean = false;
  deviceId: any;
  deviceType: any;
  firmwareVersion: any;
  privieousNotes: string;
  modalWarningMessage: string;
  isModalError: boolean = false;
  tableCounts;
  commandIqEmail = '';
  showProvisionRecord: boolean = true;
  subscribedStatus: boolean;
  callOutComeTicketID: any;
  subscriptionEndDt: any;
  showTicketIdNumber: boolean = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  automatedNotes: any[];

  selectedAutomatedNotes: any[];
  selectedDevices: any = [];
  UpdateCommandIqEmailSubscribe: any;
  DeleteCommandIqEmailSubscribe: any;
  showEditingCommandIQalert: boolean = false;
  loginData: any;
  orgidfromlocal: any;
  userId: any;
  deviceInfoDetails;
  rgdeviceid: any;
  rgmodelname: any;
  Orgacceforssid
  secureAccessRole
  hasCco: boolean = false;
  constructor(
    public router: Router,
    private modalService: NgbModal,
    private translateService: TranslateService,
    public sso: SsoAuthService,
    private service: DataServiceService,
    private issuseservice: IssuesService,
    private deviceService: DeviceService,
    private subscribeService: SubscribeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private callOutComeService: CallOutComeService,
    private marketingInsightApplicationApiService: MarketingInsightspplicationApiService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
    private api: SupportWifiService,
    private cdRef: ChangeDetectorRef,
    private dateUtils: DateUtilsService,
    private marketingCommonService: MarketingCommonService,
    private commonService: CommonFunctionsService,
    private routerService: SupportRouterService,
  ) {
    sessionStorage.setItem('insideSubView', 'true');
    if (!sessionStorage.getItem('insideSubTime')) sessionStorage.setItem('insideSubTime', new Date().getTime().toString());
    if (history?.state?.fromSearch) {
      sessionStorage.setItem('calix.subscriberId', history.state.subscriberData);
      sessionStorage.setItem('calix.deviceData', history.state.devices);
    }
    if (history?.state?.externalSearch) {
      this.callOutComeTicketID = history?.state?.ticketId;
      localStorage.setItem('callOutComeTicketID', this.callOutComeTicketID)
    }
    let tId = localStorage.getItem('callOutComeTicketID');
    if (tId) {
      this.callOutComeTicketID = tId;
    }

    if (!sessionStorage.getItem('calix.subscriberId') && localStorage.getItem('searchSubscriberId')) {
      sessionStorage.setItem('calix.subscriberId', localStorage.getItem('searchSubscriberId'));
      sessionStorage.setItem('calix.deviceData', localStorage.getItem('searchDevices'));
    }
    let url = this.router.url;
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || history?.state?.searchText || history?.state?.ccoSystemSearchText || history?.state?.subscriberId;
    });
    if (url?.indexOf('traffic-reports') !== -1) {
      this.isTrafficPage = true;
    }
    this.form = this.fb.group({
      reason: [''],
      status: [''],
      subreason: ['']
    });

    if (url?.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';

    //this.categoriesData = ["Hardware", "Wifi", "Gateway", "Client Devices", "IT", "WAN", "Education", "Other"];

    this.callOutComeData = {
      statusName: "",
      selection: "",
      callType: "Inbound", //Inbound
      categories: [],
      notes: ""

    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (this.issuesAndReasons?.length > 0) {
        sessionStorage.setItem("reasonsForIssues", JSON.stringify(this.issuesAndReasons))
      }
      this.getIssuesAndWanringS();
      this.leveltranslations();
      this.automatedNotes = [
        { name: this.language['Issues_And_Warnings'], Id: 1 },
        { name: this.language['Service_Limit_Hits'], Id: 2 },
        { name: this.language['devices'], Id: 3 },
      ];
    });
    this.automatedNotes = [
      { name: this.language['Issues_And_Warnings'], Id: 1 },
      { name: this.language['Service_Limit_Hits'], Id: 2 },
      { name: this.language['devices'], Id: 3 },
    ];

  }

  ngOnInit(): void {
    //this.browserTabClose();
    this.subId = this.sso.getCSCSubscriberId() && this.sso.getCSCSubscriberId() != 'undefined' ? this.sso.getCSCSubscriberId() : '';
    setTimeout(() => {
      if (!sessionStorage.getItem('outcomeTimer')) this.getOutcometimer();
    }, 200);
    let subscriberId = sessionStorage.getItem('calix.subscriberId');
    this.subId = this.sso.getCSCSubscriberId() && this.sso.getCSCSubscriberId() != 'undefined' ? this.sso.getCSCSubscriberId() : '';
    //this.getSubscriberInfo(subscriberId)
    /* if (history?.state?.externalSearch) {
      this.externalUserAllowance();
    } */
    this.externalUserNotAllowed = !!history?.state?.externalUserNotAllowed;
    if (this.externalUserNotAllowed) {
      document.getElementById('extUserCreateWarning').classList.remove('d-none');
    }
    if (localStorage.getItem('OutageError')) {
      this.isoutageError = true
    } else {
      this.isoutageError = false
    }
    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    this.orgidfromlocal = localStorage.getItem('calix.org_id') ? localStorage.getItem('calix.org_id') : ' ';
    this.userId = localStorage.getItem('ciquserid') ? localStorage.getItem('ciquserid') : ' ';
    const deviceDetail = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.onlyOntWoEntitl = (!this.sso.getEntitlementsArr().includes('102') && deviceDetail?.some(e => e.hasOwnProperty('ont')) && !deviceDetail.filter(e => ['RG', 'WAP', 'WAP-IGMP'].includes(e.opMode)).length)
    let devicedatafromsession = deviceDetail?.filter(device => device.opMode == "RG");
    this.rgdeviceid = devicedatafromsession?.length ? devicedatafromsession[0]?.deviceId : " ";
    this.rgmodelname = devicedatafromsession?.length ? devicedatafromsession[0]?.modelName : " ";
    this.Orgacceforssid = sessionStorage.getItem('Orgacceforssid') ? sessionStorage.getItem('Orgacceforssid') : false;
    if (this.Orgacceforssid == 'true') { //secureaccess
      this.secureAccessRole = 'Calix'
    }
    else {
      this.secureAccessRole = 'BSP'
    }

    if (this.callOutComeService.subscriberId == null) {
      this.callOutComeService.subscriberId = subscriberId;
      this.callOutComeService.callOutComeStartTime = new Date().toISOString();
    }

    // New subsuscriber

    if (this.callOutComeService.subscriberId != subscriberId) {
      this.callOutComeService.subscriberId = subscriberId;
      this.callOutComeService.callOutComeStartTime = new Date().toISOString();
    }


    // this.showAndHideTicketNumber();

    // setTimeout(() => {
    //this.getCallHistoryLogData();
    // }, 2000);

    //this.issues=[];
    //this.tabInfoSubscription();
    const devices = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`));
    this.incompleteDevice = devices?.filter(obj => !obj._id && !obj.ont).map(obj => obj.deviceId).join(',');
    this.routerDevices = devices?.filter(obj => obj._id || obj.ont).sort((a, b) => (a.opMode != "RG") ? 1 : -1).sort((a, b) => (a.hasOwnProperty("ont")) ? -1 : 1);
    console.log("this.routerDevices", this.routerDevices)
    this.deviceData = devices?.filter(obj => obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
    this.containsGS = this.deviceData?.filter(obj => {
      if (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.sso.acceptGSModel(obj.modelName)) return obj;
    })
    this.wifiShow = (this.deviceData?.length > this.deviceData?.filter(obj => (obj?.modelName || '').indexOf('812G') > -1).length) || this.deviceData?.length === 0;

    //CCL-25489
    //this.checkSpecialModel();
    this.setWIFIRouting()



    if (devices?.length == 0) {

      this.showProvisionRecord = false;
    }


    if (devices?.length > 0) {
      devices.forEach(element => {
        if (element.opModeWithOnt !== undefined) {
          if (element.opModeWithOnt == "RG" || element.opModeWithOnt == "ONT/RG" || element.opModeWithOnt == "WAP") {
            this.showProvisionRecord = true;
            return;

          }
        }


      });
      // let opModeWithOnt = devices[0].opModeWithOnt;
      // if (opModeWithOnt == "ONT") {
      //   this.showProvisionRecord = false;
      // }
    }



    const RG = this.rgData = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`))?.filter(obj => obj.opMode == "RG" && obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
    this.allDeviceData = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`))?.filter(obj => obj._id);
    this.allDeviceData?.forEach(res => {
      if (res.modelName && res.modelName.startsWith('7')) {
        this.is7xModelPresent = true;
      }
      this.modelNameSerialNumbers.push({ modelName: res.modelName, serialNumber: res.serialNumber, opMode: res.opMode })
    })
    if (RG && RG.length != 0) {
      this.checkForSSIDFeature(RG[0].serialNumber);
    } else if (this.allDeviceData && this.allDeviceData.length) {
      this.checkForSSIDFeature(this.allDeviceData[0].serialNumber);
    } else {
      setTimeout(() => {
        this.validateNavMenus([], '');
      }, 1000);
    }

    this.getScopes();
    this.showSubscriberInfo();
    if (RG?.length) {
      const storedReg = this.service.multipleRegInstance;
      if (storedReg && storedReg.length && storedReg[0].registrationId != RG[0].registrationId) this.service.multipleRegInstance = undefined;
      this.multipleRegId = RG[0].registrationId ? (this.getMultipleRegId(RG[0].registrationId) || []) : [];
      this.modelName = RG[0]["modelName"];
      // this.serviceLatest(RG[0]["serialNumber"]);
      // this.latencyLatest(RG[0]["serialNumber"]);
      // if(RG.length) {
      //this.serviceLatest(RG[0]["serialNumber"]);
      //this.latencyLatest(RG[0]["serialNumber"]);

    }
    this.collectTabsInfo();

    $(document).on("click", "#searchResultId tr", () => {
      setTimeout(() => {
        this.getSubscriberInfo($("#paramsPassed").text());
        const devices = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`));
        this.deviceData = devices?.filter(obj => obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
        this.containsGS = this.deviceData?.filter(obj => {
          if (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.sso.acceptGSModel(obj.modelName)) return obj;
        })
      }, 100);
    });

    // setTimeout(() => {
    //   $(".deviceSerials i").hover(function () {
    //     $(".deviceSerials .info-tooltip").addClass("addStyle");
    //   }, function () {
    //     $(".deviceSerials .info-tooltip").removeClass("addStyle");
    //   });
    // }, 500);
    this.hideAndShowDevicesOnTile();
    setTimeout(() => {
      $('.info-tooltip').click(function (event) {
        var id = $(this).prop('id');
        if (id == 'yes') {
          event.preventDefault();

        } else {
        }
      });
    }, 100000);
    this.swapInProgress();
    this.browserBack();

    let scopes = this.sso.getScopes();


    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes?.length; i++) {
          if (scopes && (scopes['cloud.rbac.csc.search'])) {
            if (scopes['cloud.rbac.csc.search'].indexOf('read') !== -1) this.commandIqScopeRead = true;
            if (scopes['cloud.rbac.csc.search'].indexOf('write') !== -1) this.commandIqScopeWrite = true;
            if (this.commandIqScopeRead && this.commandIqScopeWrite) {
              this.showCommandInvite = true;
            }
          }
        }
      }
    }

  }
  getOutcometimer() {
    this.callOutComeService.getOutcomeTimer(this.orgId).subscribe(res => {
      this.loader = false;
      const endTime = parseInt(sessionStorage.getItem('insideSubTime') || '0') + 1000 * (res?.abortTimer || 30);
      sessionStorage.setItem('outcomeTimer', endTime.toString());
    }, err => {
      this.loader = false;
      sessionStorage.setItem('outcomeTimer', '0');
      //this.pageErrorHandle(err);
    })
  }

  /* externalUserAllowance() {
    this.notAllowedMenus = document.querySelectorAll('.header-nav #Home, .header-nav #NetOps, .header-nav #Dashboards');

    this.notAllowedMenus.forEach((element) => {
      element.addEventListener('click', () => {
        this.externalUserNotAllowed = !!history.state.externalUserNotAllowed;
      });
    });
  } */

  validateNavMenus(featureProperties, sn) {
    let showTopology = false;
    let showQoe = false;
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    let modelName = sessionStorage.getItem('calix.deviceData') ? (JSON.parse(sessionStorage.getItem('calix.deviceData'))[0]?.modelName ?? '') : '';
    let scopes = localStorage.getItem('calix.scopes') ? JSON.parse(localStorage.getItem('calix.scopes')) : [];
    const isCalix = (JSON.parse(sessionStorage.getItem('calix.deviceData')) || [])?.some(obj => obj.serialNumber == sn && ['MSTC', 'Calix'].includes(obj.manufacturer))

    /* if (!modelName || !featureProperties.length) {
      // hide Topology and Qoe tabs if the subscriber has no routers.
      this.service.showTopology.next(showTopology);
      this.service.showQoe.next(showQoe);
      return;
    } */

    if (featureProperties.length) {
      if (featureProperties.find(obj => obj.featureName == 'Topology')) { // topology
        if (scopes['cloud.rbac.csc.topology'] && scopes['cloud.rbac.csc.topology'].indexOf('read') !== -1) {
          showTopology = (isCalix ? this.sso.exosVersionCheck('21.4') : true);
        }
      }
      if (featureProperties.find(obj => obj.featureName == 'QoE')) { // qoe
        if (scopes['cloud.rbac.csc.qoe'] && scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) {
          showQoe = (isCalix ? this.sso.exosVersionCheck('21.4') : true);
        }
      }
    }

    this.service.showTopology.next(showTopology);
    this.service.showQoe.next(showQoe);
    /* else {
      if (scopes['cloud.rbac.csc.topology'].indexOf('read') !== -1) { // topology
        showTopology = calixModel ? (this.sso.exosVersionCheck('21.4') ? true : false) : true;
        this.service.showTopology.next(showTopology);
      }
      if (scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) { // qoe
        showQoe = calixModel ? ((this.sso.exosVersionCheck('21.4')) ? true : false) : true;
        this.service.showQoe.next(showQoe);
      }
    } */
  }

  findUndiscoveredGS(deviceList, i = 0) {
    this.service.getDevicePR(this.orgId, deviceList[i]?.deviceId).subscribe((res: any) => {
      if (res && res instanceof Object && res?.opMode == 'RG' && this.sso.acceptGSModel(res?.modelName)) {
        sessionStorage.setItem('undiscoveredSn', res.deviceId);
        this.containsGS = [res];
      } else if (deviceList?.length - 1 > i) {
        this.findUndiscoveredGS(deviceList, ++i);
      }
    }, err => {
      //this.pageErrorHandle(err);
      if (deviceList?.length - 1 > i) {
        this.findUndiscoveredGS(deviceList, ++i);
      }
    });
  }

  checkForSSIDFeature(serialNumber: String) {
    if (this.service.getMetaData(serialNumber)) {
      let metaData = this.service.getMetaData(serialNumber);
      if (metaData.properties) {
        metaData.properties.forEach(res => {
          if (res.featureName == "SSIDManager" && res.supported) {
            this.showSSIDButton = true;
          }
        })
        this.validateNavMenus(metaData.properties, serialNumber);
      }
      if (!this.showSSIDButton && this.modelNameSerialNumbers?.length != 0) {
        this.modelNameSerialNumbers = this.modelNameSerialNumbers?.filter(res => res.serialNumber != serialNumber)
        if (this.modelNameSerialNumbers.length != 0) {
          if (this.modelNameSerialNumbers[0].opMode == 'RG' || this.is7xModelPresent) {
            this.checkForSSIDFeature(this.modelNameSerialNumbers[0].serialNumber);
          }
        }
      }
    } else if (serialNumber) {
      this.service.showTopology.next(false);
      this.service.showQoe.next(false);
      this.service.fetchMetaData(this.orgId, serialNumber).subscribe((res: any) => {
        this.metaData = res || {};
        setTimeout(() => {
          this.validateNavMenus(this.metaData.properties, serialNumber);
        }, 1000);


        res.properties.forEach(obj => {
          this.reStructureMeta(obj);
        });


        this.service.setMetaData(serialNumber, this.metaData);
        this.checkForSSIDFeature(serialNumber);
      }, err => {
        this.pageErrorHandle(err);
      });
    }
  }

  getIssuesAndWanringS() {
    setTimeout(() => {
      // this.issuesAndWarnings = this.issuesAndReasons;
      if (this.issuesAndReasons?.length > 0) {
        sessionStorage.setItem("reasonsForIssues", JSON.stringify(this.issuesAndReasons))
      }
    }, 500);
  }

  getIssues() {
    let isDME = this.sso.getCscType() == 'DME';
    if (isDME)
      return
    this.totalissues = 0;
    this.totalwarning = 0;
    this.issueDataJson = this.issues;
    this.getIssuesAndWanringS();
    // setTimeout(() => {
    //   // this.issuesAndWarnings = this.issuesAndReasons;
    //   if (this.issuesAndReasons?.length > 0) {
    //     sessionStorage.setItem("reasonsForIssues", JSON.stringify(this.issuesAndReasons))
    //   }
    // }, 500);

    //this.orgId = this.sso.getOrgId();
    //let Devices = JSON.parse(this.sso.getSerialNo());
    //let serialNo = [];
    // Devices.forEach(element => {
    //   serialNo.push(element.serialNumber);
    // });
    // Devices.filter(obj => obj.serialNumber );
    // this.issuseservice.getIssues(this.orgId, this.serialNo, SubscriberId).subscribe(data => {
    //   this.issueDataJson = data;
    // } totalissues =0;
    //totalwarning =0;///
    // );list1.some(({name}) => name === "object1")
    // this.issueDataJson = this.issuseservice.getIssues();
    let temp = this.service.getSubscriberTabInfoData() ? this.service.getSubscriberTabInfoData() : "";
    let issueData = temp?.allIssues;
    this.issueDataJson = issueData?.filter(obj => this.codelist.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1);
    const mapTrSerial = [];
    const wapFailed = (this.issueDataJson || []).filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
    this.issueDataJson = (this.issueDataJson || []).filter((obj, i) => {
      if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
        return obj;
      } else {
        mapTrSerial.push(obj?.serialNumber);
      }
    });
    for (let i = this.issueDataJson.length - 1; i >= 0; i--) {
      if (mapTrSerial.includes(this.issueDataJson[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(issueData[i]["code"])) {
        this.issueDataJson.push({
          "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
          "subscriberId": "",
          "serialNumber": this.issueDataJson[i]["serialNumber"],
          "source": this.issueDataJson[i]["serialNumber"],
          "sourceId": this.issueDataJson[i]["serialNumber"],
          "type": "ROUTER",
          "severity": 0,
          "reason": "High Operating Temperature Observed",
          "isValid": true
        });
        this.issueDataJson.splice(i, 1);
      }
    }
    if (this.issueDataJson) {
      this.iserrorService = this.issueDataJson?.filter(obj => obj.type.includes("SERVICE") || obj.type.includes("Service"));
      if (this.iserrorService?.length > 0) {
        this.Sissusecount = this.iserrorService?.filter(obj => { if (obj.severity == "0") return obj });
        this.Sissuewarning = this.iserrorService?.filter(obj => { if (obj.severity == "1") return obj });
        this.Sissusecount = this.Sissusecount ? this.Sissusecount.length : '0';
        this.Sissuewarning = this.Sissuewarning ? this.Sissuewarning.length : '0';
        // this.totalissues = this.totalissues + this.Sissusecount;
        // this.totalwarning = this.totalwarning + this.Sissuewarning;
        this.iserrorService = true;
      }
      else this.iserrorService = false;
      this.iserrorwifi = this.issueDataJson?.filter(obj => obj.type.includes("WIFI") || obj.type.includes("WiFi"));
      if (this.iserrorwifi?.length > 0) {
        this.Wissusecount = this.iserrorwifi?.filter(obj => { if (obj.severity == "0") return obj });
        this.Wissuewarning = this.iserrorwifi?.filter(obj => { if (obj.severity == "1") return obj });
        this.Wissusecount = this.Wissusecount ? this.Wissusecount.length : "0";
        this.Wissuewarning = this.Wissuewarning ? this.Wissuewarning.length : "0";
        // this.totalissues = this.totalissues + this.Wissusecount;
        // this.totalwarning = this.totalwarning + this.Wissuewarning;
        this.iserrorwifi = true;
      } else this.iserrorwifi = false;

      this.iserrorDevice = this.issueDataJson?.filter(obj => obj.type.includes("CLIENT") || obj.type.includes("Client") || obj.type.includes("DEVICE") || obj.type.includes("Device"));
      if (this.iserrorDevice.length > 0) {
        this.Dissusecount = this.iserrorDevice?.filter(obj => { if (obj.severity == "0") return obj });
        this.Dissuewarning = this.iserrorDevice?.filter(obj => { if (obj.severity == "1") return obj });
        this.Dissusecount = this.Dissusecount ? this.Dissusecount.length : '0';
        this.Dissuewarning = this.Dissuewarning ? this.Dissuewarning.length : '0';
        // this.totalissues = this.totalissues + this.Dissusecount;
        // this.totalwarning = this.totalwarning + this.Dissuewarning;
        this.iserrorDevice = true;
      } else this.iserrorDevice = false;

      this.iserrorApplication = this.issueDataJson?.filter(obj => obj.type.includes("APPLICATION") || obj.type.includes("Application"));
      if (this.iserrorApplication?.length > 0) {
        this.Aissusecount = this.iserrorApplication?.filter(obj => { if (obj.severity == "0") return obj });
        this.Aissuewarning = this.iserrorApplication?.filter(obj => { if (obj.severity == "1") return obj });
        this.Aissusecount = this.Aissusecount ? this.Aissusecount.length : '0';
        this.Aissuewarning = this.Aissuewarning ? this.Aissuewarning.length : "0";
        // this.totalissues = this.totalissues + this.Aissusecount;
        // this.totalwarning = this.totalwarning + this.Aissuewarning;
        this.iserrorApplication = true;
      }
      else this.iserrorApplication = false;

      this.iserrorRouter = this.issueDataJson?.filter(obj => obj.type.includes("ROUTER") || obj.type.includes("Router"));
      if (this.iserrorRouter?.length > 0) {
        this.Rissusecount = this.iserrorRouter?.filter(obj => { if (obj.severity == "0") return obj });
        this.Rissuewarning = this.iserrorRouter?.filter(obj => { if (obj.severity == "1") return obj });
        this.Rissusecount = this.Rissusecount ? this.Rissusecount.length : "0";
        this.Rissuewarning = this.Rissuewarning ? this.Rissuewarning.length : "0";
        // this.totalissues = this.totalissues + this.Rissusecount;
        // this.totalwarning = this.totalwarning + this.Rissuewarning;
        this.iserrorRouter = true;
      } else this.iserrorRouter = false;


      let tissue = this.issueDataJson?.filter(obj => { if (obj.severity == "0") return obj });
      const wapFailed = tissue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
      tissue = tissue.filter(obj => !(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED"));
      let twarning = this.issueDataJson?.filter(obj => { if (obj.severity == "1") return obj });
      this.totalissues = tissue ? tissue.length : 0;
      this.totalwarning = twarning ? twarning.length : 0;
      this.getDeviceIssues();
    }
  }

  isNotesReadAndWrite: boolean = true;
  getScopes() {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes?.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.services') !== -1) {
            this.scopeFlag.serviceTabRead = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.cpe') !== -1 && validScopes[i].indexOf('cloud.rbac.csc.cpe.settings') > -1) {
            this.scopeFlag.routerTabRead = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.wifi') !== -1) {
            this.scopeFlag.wifiRead = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.devices') !== -1) {
            this.scopeFlag.devicesRead = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps') !== -1) {
            this.scopeFlag.appsRead = true;
            continue;
          }
        }
      }

      scopes['cloud.rbac.csc.notes'] = scopes['cloud.rbac.csc.notes'] ? scopes['cloud.rbac.csc.notes'] : [];
      scopes['cloud.rbac.csc.calloutcome.createview'] = scopes['cloud.rbac.csc.calloutcome.createview'] ? scopes['cloud.rbac.csc.calloutcome.createview'] : [];
      scopes['cloud.rbac.cmc.subscriber'] = scopes['cloud.rbac.cmc.subscriber'] ? scopes['cloud.rbac.cmc.subscriber'] : [];
      scopes['cloud.rbac.csc.netops.mgmt.subscribers'] = scopes['cloud.rbac.csc.netops.mgmt.subscribers'] ? scopes['cloud.rbac.csc.netops.mgmt.subscribers'] : [];
      /* scopes['cloud.rbac.csc.services'] = scopes['cloud.rbac.csc.services'] ? scopes['cloud.rbac.csc.services'] : [];
      scopes['cloud.rbac.csc.cpe'] = scopes['cloud.rbac.csc.cpe'] ? scopes['cloud.rbac.csc.cpe'] : [];
      scopes['cloud.rbac.csc.wifi'] = scopes['cloud.rbac.csc.wifi'] ? scopes['cloud.rbac.csc.wifi'] : [];
      scopes['cloud.rbac.csc.search'] = scopes['cloud.rbac.csc.search'] ? scopes['cloud.rbac.csc.search'] : []; */
      scopes['cloud.rbac.csc.search'] = scopes['cloud.rbac.csc.search'] ? scopes['cloud.rbac.csc.search'] : [];
      scopes['cloud.rbac.csc.search.onboardedemaladdr'] = scopes['cloud.rbac.csc.search.onboardedemaladdr'] ? scopes['cloud.rbac.csc.search.onboardedemaladdr'] : [];
      scopes['cloud.rbac.csc.netops.mgmt'] = scopes['cloud.rbac.csc.netops.mgmt'] ? scopes['cloud.rbac.csc.netops.mgmt'] : [];

      if (scopes && (scopes['cloud.rbac.csc.notes'])) {
        if (scopes['cloud.rbac.csc.notes'].indexOf('read') !== -1) this.scopeFlag.notesRead = true;
        if (scopes['cloud.rbac.csc.notes'].indexOf('write') !== -1) this.scopeFlag.notesWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt.subscribers'] && scopes['cloud.rbac.csc.netops.mgmt.subscribers'].indexOf('write') !== -1)) {
        this.scopeFlag.subMgmtWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.search'] && scopes['cloud.rbac.csc.search'].indexOf('write') !== -1)) {
        this.scopeFlag.subSearchIQWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.search.onboardedemaladdr'] && scopes['cloud.rbac.csc.search.onboardedemaladdr'].indexOf('write') !== -1)) {
        this.scopeFlag.subOnboardedIQWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt'] && scopes['cloud.rbac.csc.netops.mgmt'].indexOf('write') !== -1)) {
        this.scopeFlag.subMgmtIQWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.calloutcome.createview'])) {
        if (scopes['cloud.rbac.csc.calloutcome.createview'].indexOf('read') !== -1) this.scopeFlag.subscriberCORead = true;
        if (scopes['cloud.rbac.csc.calloutcome.createview'].indexOf('write') !== -1) this.scopeFlag.subscriberCOWrite = true;
        if (this.scopeFlag.subscriberCORead && this.scopeFlag.subscriberCOWrite) {
          this.isNotesReadAndWrite = false;
        }
        else {
          this.isNotesReadAndWrite = true;
        }
      }
      if (scopes && (scopes['cloud.rbac.cmc.subscriber'])) {
        if (scopes['cloud.rbac.cmc.subscriber'].indexOf('read') !== -1) this.scopeFlag.marketingRead = true;
        if (scopes['cloud.rbac.cmc.subscriber'].indexOf('write') !== -1) this.scopeFlag.marketingWrite = true;
      }
      /* if (scopes && (scopes['cloud.rbac.csc.cpe'])) {
        if (scopes['cloud.rbac.csc.cpe'].indexOf('read') !== -1) this.scopeFlag.routerTabRead = true;
        if (scopes['cloud.rbac.csc.cpe'].indexOf('write') !== -1) this.scopeFlag.routerTabWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.wifi'])) {
        if (scopes['cloud.rbac.csc.wifi'].indexOf('read') !== -1) this.scopeFlag.wifiRead = true;
        if (scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1) this.scopeFlag.wifiWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.devices'])) {
        if (scopes['cloud.rbac.csc.devices'].indexOf('read') !== -1) this.scopeFlag.devicesRead = true;
        if (scopes['cloud.rbac.csc.devices'].indexOf('write') !== -1) this.scopeFlag.devicesWrite = true;
      } */

      scopes['cloud.rbac.csc.qoe'] = scopes['cloud.rbac.csc.qoe'] ? scopes['cloud.rbac.csc.qoe'] : [];

      if (scopes && (scopes['cloud.rbac.csc.qoe'] && scopes['cloud.rbac.csc.qoe'].length)) {
        if (scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) this.scopeFlag.qoeRead = true;
      }

    } else {
      this.scopeFlag.notesRead = true;
      this.scopeFlag.notesWrite = true;
      this.scopeFlag.subscriberCORead = true;
      this.scopeFlag.subscriberCOWrite = true;
      this.scopeFlag.serviceTabRead = true;
      this.scopeFlag.serviceTabWrite = true;
      this.scopeFlag.routerTabRead = true;
      this.scopeFlag.routerTabWrite = true;

      this.scopeFlag.wifiRead = true;
      this.scopeFlag.wifiWrite = true;
      this.scopeFlag.devicesRead = true;
      this.scopeFlag.devicesWrite = true;
      this.scopeFlag.appsRead = true;
      this.scopeFlag.marketingRead = true;
      this.scopeFlag.marketingWrite = true;
      this.scopeFlag.qoeRead = true;
      this.scopeFlag.subMgmtWrite = true;
      this.scopeFlag.subSearchIQWrite = true;
      this.scopeFlag.subOnboardedIQWrite = true;
      this.scopeFlag.subMgmtIQWrite = true;
    }

    /*------- Start code for CCL-48250 -----------*/
    if (environment.VALIDATE_SCOPE) {
      if (this.sso.getCscType() !== 'DME') {
        scopes['cloud.rbac.csc.wifi'] = scopes['cloud.rbac.csc.wifi'] ? scopes['cloud.rbac.csc.wifi'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi'])) {
          if (scopes['cloud.rbac.csc.wifi'].indexOf('read') !== -1) {
            this.scopeFlag.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1) {
            this.scopeFlag.wifiWrite = true;
          }
        }
      }
      else {
        scopes['cloud.rbac.csc.wifi.basic'] = scopes['cloud.rbac.csc.wifi.basic'] ? scopes['cloud.rbac.csc.wifi.basic'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi.basic'])) {
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('read') !== -1) {
            this.scopeFlag.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1) {
            this.scopeFlag.wifiWrite = true;
          }
        }
      }

    } else {

      this.scopeFlag.wifiRead = true;
      this.scopeFlag.wifiWrite = true;
      //this.wifiSSIDWrite = true;
    }
    /*------- End code for CCL-48250 -----------*/
  }

  showSubscriberInfo() {
    const subscriberId: string = $("#paramsPassed").text();
    this.isCMCAvailable = this.sso.getEntitlementsArr().indexOf('119') > -1 || this.sso.getEntitlementsArr().indexOf('209') > -1;
    if (sessionStorage.getItem('undiscoveredSn') && !this.containsGS?.length) {
      this.containsGS =
        JSON.parse(sessionStorage.getItem(`calix.deviceData`)).map(obj => obj.deviceId).includes(sessionStorage.getItem('undiscoveredSn')) ?
          [{ 'deviceId': sessionStorage.getItem('undiscoveredSn') }] : [];
    }
    if (sessionStorage.getItem(`calix.subscriberId`) && sessionStorage.getItem(`calix.subscriberId`) != 'undefined') this.hasSubscriber = true;
    let subscriberStructure = this.service.getStoredSubscriberInfo() || this.getSubscriberInfo(sessionStorage.getItem(`calix.subscriberId`)) || {};
    if (!this.service.getStoredSubscriberInfo()) {
      this.service.multipleRegInstance = undefined;
      sessionStorage.setItem('calloutcomeSubmitted', 'false');
    }
    sessionStorage.setItem(`calix.endpointId`, (subscriberStructure.endpointId || ''));

    /* Qoe Check */
    // let onboarded = sessionStorage.getItem('calix.routerOnboard') == 'true' ? true : false;
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    // this.isQoeDevice = this.sso.exosVersionCheck('21.4') && this.scopeFlag.qoeRead && onboarded && !fduser;
    this.isQoeDevice = this.sso.exosVersionCheck('21.4') && this.scopeFlag.qoeRead;
    this.qoeStatus = this.service.getDataSaver('qoeStatus');

    if (subscriberStructure.endpointId) {
      this.sso.setSubscriberEndpointId(subscriberStructure.endpointId);
    } else {
      this.sso.setSubscriberEndpointId('');
    }

    subscriberStructure.service = subscriberStructure.service || {};
    subscriberStructure.commandIQ = subscriberStructure.commandIQ || {};
    this.subscriberInfoResult = subscriberStructure;
    this.subscriberInfoResult?.devices?.forEach(obj => {
      if (obj.bSmbMode) this.bSmbMode = true;
    })  //For unassociated devices
    this.NewEmail = this.subscriberInfoResult?.commandIQ?.email?.slice();
    this.NewSecondaryEmail = this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email?.slice();
  }

  collectTabsInfo() {
    // const subscriberId: string = localStorage.getItem("calix.subscriberId");
    // this.tabInfo = this.service.getSubscriberTabInfoData() ?
    //   this.reStructureTabInfo(this.service.getSubscriberTabInfoData()) :
    //   '';
    // this.DeviceCount = this.service.getDeviceTabCount() ? this.service.getDeviceTabCount() : '0';
    // this.issueDataJson = this.issuseservice.getIssues() ? this.issuseservice.getIssues() : '0';
    if (window.location.pathname == `/${this.MODULE}/overview/issues`) {
      sessionStorage.setItem('overviewStatus', 'yetToLoad');
      this.overviewStatus();
      this.getIssues();
    }

    else {
      this.tabInfo = this.service.getSubscriberTabInfoData() ?
        this.reStructureOverviewTabInfo(this.service.getSubscriberTabInfoData()) :
        '';
      this.DeviceCount = this.service.getDeviceTabCount() ? this.service.getDeviceTabCount() : '0';
      this.issueDataJson = this.issuseservice.getIssues() ? this.issuseservice.getIssues() : '0';
      this.getIssues();
      if (this.tabInfo) {
        // this.apiCallDone.emit(true);
        this.subjectPasser = 0;
        return;
      }
      this.overviewStatus();
    }
    // const RG = JSON.parse(localStorage.getItem("calix.deviceData")).filter(obj => (obj.opMode == "RG" && obj.serialNumber));
    // // if(RG.length)  this.DeviceTabApiHit();
    // if (RG.length) {
    //   //this.loader = true;
    //   //if(this.tabInfoInterval) clearInterval(this.tabInfoInterval);
    //   this.networkTabApiHit(RG[0]["serialNumber"]);

    //   /* this.tabInfoInterval = setInterval(() => {
    //     this.networkTabApiHit(subscriberId, RG[0]["serialNumber"]);
    //   }, 60000); */
    // }
  }
  checkQoEStatus() {
    // let onboarded = sessionStorage.getItem('calix.routerOnboard') == 'true' ? true : false;
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    // this.isQoeDevice = this.sso.exosVersionCheck('21.4') && this.scopeFlag.qoeRead && onboarded && !fduser;
    this.isQoeDevice = this.sso.exosVersionCheck('21.4') && this.scopeFlag.qoeRead;
    this.qoeStatus = this.service.getDataSaver('qoeStatus');
    if (this.qoeStatus || !this.isQoeDevice) return;

    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() - 2);
    let startTime = moment(endTime).subtract(15, "minutes");
    let [start, end] = [this.sso.getISOString(startTime), this.sso.getISOString(endTime)];

    const params = {
      sn: this.rgData[0].serialNumber,
      orgId: this.orgId,
      mac: this.rgData[0].macAddress,
      period: 6,
      start: start,
      end: end,
      tz: -(new Date().getTimezoneOffset() / 60)
    };
    this.subscriberInfo = this.issuseservice.getQoeSummary(params).subscribe((res: any) => {
      if (res && res.rawData?.length) {
        this.qoeStatus = res.rawData[res.rawData.length - 1]['qoeScore'];
        this.service.setDataSaver('qoeStatus', this.qoeStatus);
      }
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  overviewApi() {
    if (sessionStorage.getItem('stopOverviewActions') == 'true') {
      setTimeout(() => {
        sessionStorage.setItem('stopOverviewActions', 'false');
        this.apiCallDone.emit(true);
      }, 500);
      return;
    }
    this.nwLoader = true;
    //this.loader = true;
    let getSerialNo = this.sso.getSerialNo()
    var Devices = getSerialNo ? JSON.parse(getSerialNo) : [];
    var SubscriberId = this.sso.getCSCSubscriberId();
    var serialNo = [];
    Devices.forEach(element => {
      if (element.serialNumber) {
        var newElement = {};
        newElement["serialNumber"] = element.serialNumber;
        newElement["opMode"] = element.opMode;
        if (element.hasOwnProperty("ont")) {
          newElement["isOnt"] = true;
          newElement["ontSerialNumber"] = (element?.ont?.serialNo || '');
          newElement["vendorId"] = (element?.ont?.vendorId || '');
        }
        serialNo.push(newElement);
      }
    });
    let data = {
      "subscriberId": SubscriberId,
      "devices": serialNo
    }
    if (SubscriberId == "undefined" || !SubscriberId) delete data.subscriberId;
    sessionStorage.setItem('overviewStatus', 'isLoading');
    this.subscriberInfo = this.service.putOverview(this.orgId, data).subscribe(res => {
      if (res) {
        this.checkmetadata(res);
        this.service.setSubscriberTabInfoData(res);
        this.apiCallDone.emit(true);
        this.tabInfo = this.reStructureOverviewTabInfo(res);
        this.tabInfo.isLoaded = true;
        sessionStorage.setItem("responseofoverview", JSON.stringify(res));
        sessionStorage.setItem('overviewStatus', 'isLoaded');
        let responseofoverview = sessionStorage.getItem('responseofoverview')
        let parsedresponseofoverview = JSON.parse(responseofoverview)
        let lastspedtestresult = parsedresponseofoverview?.networkStatus?.lastSpeedTestResult
        sessionStorage.setItem("createTimeofspeedtest", lastspedtestresult?.[0]?.createTime);

      }
      this.nwLoader = false;
      //this.loader = false;
    }, err => {  //let data = this.service.getOverview();
      sessionStorage.setItem('overviewStatus', 'isError');
      this.apiCallDone.emit(true);
      this.nwLoader = false;
      this.loader = false;
      this.pageErrorHandle(err);
    });

  }
  checkmetadata(res) {
    if (res.allIssues) {
      res.allIssues.forEach(element => {
        Object.assign(element, { 'isValid': true });
      });
      let listofcodes = {};
      res.allIssues?.filter(obj => {
        if (obj.code) {
          if (obj.code.includes('DS_SPEED_LOW_85') || obj.code.includes('STALE_SOFTWARE_VERSION')
            || obj.code.includes('US_SPEED_LOW_85') || obj.code.includes('DS_SPEED_LOW_75')
            || obj.code.includes('US_SPEED_LOW_75')) {
            let keys = Object.keys(listofcodes)
            if (keys.includes(obj.serialNumber)) {
              listofcodes[obj.serialNumber].push(obj.code);
            }
            else {
              let codes = [];
              codes.push(obj.code)
              listofcodes[obj.serialNumber] = codes;
            }
          }
        }

      })
      let keys = Object.keys(listofcodes);
      let properapilist = {}
      keys.map(arrayVal => {
        properapilist[arrayVal] = this.service.fetchMetaData(this.orgId, arrayVal)
      })
      forkJoin(properapilist).subscribe(res1 => {
        this.check(keys, listofcodes, res, res1)
      })
    }
    sessionStorage.setItem('iqStatus', JSON.stringify({
      'protectIQEnabled': res?.networkStatus?.app?.protectIQ?.enabled,
      'experienceIQEnabled': res?.networkStatus?.app?.experienceIQ?.enabled
    }))
  }
  check(keys, listofcodes, res, resoutput) {
    keys.map(serialnumber => {
      let values = listofcodes[serialnumber];
      this.metaData = resoutput[serialnumber];
      this.metaData.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      res.allIssues.forEach(element => {
        if (element.serialNumber == serialnumber) {
          if (values.includes(element.code)) {

            if (element.code == "STALE_SOFTWARE_VERSION") {
              if (this.metaData?.UpgradeSoftware?.supported)
                element.isValid = true;
              else element.isValid = false;
            }
            else if (element.code.includes("DS_SPEED_LOW_85") || element.code.includes("US_SPEED_LOW_85")
              || element.code.includes("DS_SPEED_LOW_75") || element.code.includes("US_SPEED_LOW_75")) {
              if (this.metaData?.SpeedTest?.supported)
                element.isValid = true;
              else element.isValid = false;
            }
          }
        }
      });
    })
  }

  networkTabApiHit(serialNumber) {
    this.nwLoader = true;
    this.subscriberInfo = this.service.getSubscriberTabInfo(this.orgId, serialNumber).subscribe(
      (res: any) => {
        //this.apiCallDone.emit(true);
        this.nwLoader = false;
        this.loader = false;
        if (res) {
          this.tabInfo = this.reStructureTabInfo(res);
          this.service.setSubscriberTabInfoData(res);
        }
      }, err => {
        /// this.apiCallDone.emit(true);
        this.service.setSubscriberTabInfoData({});
        this.nwLoader = false;
        this.loader = false;
        this.pageErrorHandle(err);
      }
    );
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  reStructureOverviewTabInfo(obj) {
    if (obj?.allIssues && obj?.allIssues?.length) {
      this.getIssues();
      let issueData = obj?.allIssues;
      this.AllIssues = issueData?.filter(obj => this.codelist.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
      this.service.setAllIssues(this.AllIssues);
    }
    let tabInfo: any = { isResponse: true };
    if (obj?.networkStatus?.lastSpeedTestResult && obj?.networkStatus?.lastSpeedTestResult?.length) {
      const speed = obj.networkStatus?.lastSpeedTestResult[0];
    }
    if (obj?.networkStatus?.lastSpeedTestResult && obj?.networkStatus?.lastSpeedTestResult?.length && obj?.networkStatus?.lastSpeedTestResult[0]?.createTime) {
      let res = obj?.networkStatus?.lastSpeedTestResult[0];
      const timeCheck = (((new Date().getTime()) - (res?.createTime ? res?.createTime : (new Date().getTime()))) / 1000);
      const [overtime, connectingTime, time] = this.service.timeSetter(res?.createTime, timeCheck);
      const level = this.leveltranslations();
      this.overtimecheck = overtime
      this.connectime = connectingTime
      this.serviceTabInfo = {
        down: level[res['dsLevel']] || '',
        up: level[res['usLevel']] || '',
        time: (overtime + time.toString() + ' ' + connectingTime),
        speedMessage: ` ${(time.toString() + ' ') || '0'} `,
        isHour: (res?.createTime && timeCheck >= 3600)
      };

      this.service.setServiceTabInfo(this.serviceTabInfo);
    } else {
      this.serviceTabInfo.speedMessage = '';
    }
    let hasIQ = 0;
    const scopes = this.sso.getScopes();

    const hasServify = (
      obj?.networkStatus?.app?.servifyCare?.planCode
        && this.servifySubscriptionStatus(obj)
        && (this.getEntitlemnt('207') || this.getEntitlemnt('215') || this.getEntitlemnt('216') || this.getEntitlemnt('217'))
        && scopes['cloud.rbac.csc.apps.servify']
        ? 1 : 0
    );
    const hasArlo = (
      obj?.networkStatus?.app?.arloSmart?.email
        && (this.getEntitlemnt('206') || this.getEntitlemnt('212') || this.getEntitlemnt('213'))
        && scopes['cloud.rbac.csc.apps.arlo']
        ? 1 : 0
    );
    const hasMyComm = (
      obj?.networkStatus?.app?.myCommunityIQ?.subscriber?.enable
        && (this.getEntitlemnt('214') || this.getEntitlemnt('222') || this.getEntitlemnt('223'))
        && scopes['cloud.rbac.csc.apps.mycommunityiq']
        ? 1 : 0
    );

    const hasBark = (
      obj?.networkStatus?.app?.bark?.email
        && (this.getEntitlemnt('219') || this.getEntitlemnt('220'))
        && scopes['cloud.rbac.csc.apps.bark']
        ? 1 : 0
    );

    let hasSmb = 0;
    const ent = this.sso.getEntitlementsArr();
    for (let i = 0; i <= 15; i++) {
      if (this.service.getStoredSubscriberInfo() || sessionStorage.getItem('calix.subscriberId') == 'undefined') {
        hasSmb = (this.sso.isSmbEnabled() && ent.includes('218')) ? 1 : 0;
        break;
      } else this.sso.sleep(1000);
    }

    if (obj?.networkStatus?.ssid?.activeSSIDCount) tabInfo.ssidCount = obj?.networkStatus?.ssid?.activeSSIDCount;
    if (obj?.networkStatus?.lanHostsList?.connectedDeviceCount) tabInfo.connectedDevice = obj?.networkStatus?.lanHostsList?.connectedDeviceCount;
    if ((this.containsGS?.length && (this.getEntitlemnt('203') || this.getEntitlemnt('205') || (this.getEntitlemnt('218') && this.sso.isSmbEnabled()))) && scopes['cloud.rbac.csc.apps.protectiq'] && obj?.networkStatus?.app?.protectIQ?.subscribed) hasIQ++;
    if ((this.containsGS?.length && (this.getEntitlemnt('204') || this.getEntitlemnt('205') || (this.getEntitlemnt('218') && this.sso.isSmbEnabled()))) && scopes['cloud.rbac.csc.apps.experienceiq'] && obj?.networkStatus?.app?.experienceIQ?.subscribed) hasIQ++;
    if (this.sso.isSmbEnabled(false)) hasIQ = 0;
    tabInfo.appCount = (hasIQ + hasServify + hasArlo + hasMyComm + hasBark + hasSmb)
    //  CCL-46817
    //changed to 2 instead of obj?.networkStatus?.appCount?.subscriberAppCount - 2 means protectIQ and expIQ

    if (obj?.networkStatus?.appCount?.subscriberAppCount) tabInfo.appCount = (hasIQ + hasServify + hasArlo + hasMyComm + hasBark + hasSmb);  //changed to 2 instead of obj?.networkStatus?.appCount?.subscriberAppCount - 2 means protectIQ and expIQ
    if (obj?.networkStatus?.appCount?.enabledAppCount) tabInfo.appEnabled = obj?.networkStatus?.appCount?.enabledAppCount;
    tabInfo.isArlo = "true";
    tabInfo.isServify = "true";
    tabInfo.isMyComm = "true";
    tabInfo.isBark = "true";
    tabInfo.isCaptive = "true"
    tabInfo.isSmartBiz = "true"
    return tabInfo;
  }

  servifySubscriptionStatus(obj) {
    let date = new Date(obj?.networkStatus?.app?.servifyCare?.planPurchaseDate)
    //let stdate = new Date(sstdate.setDate(sstdate.getDate()))
    //let newDate = new Date(date.setDate(date.getDate()+30))
    let newDate = new Date(date.setDate(date.getDate()))
    //let enddate = newDate.getMonth()+1 + '/' + newDate.getDate() + '/' + newDate.getFullYear()

    let EndDate = new Date(newDate);
    //  console.log(StartDate)
    //  console.log(EndDate);
    /************* For getting exact days for claim eligible for without cancellation *********/

    let StartDate = new Date();
    let currentYear = StartDate.getFullYear();
    let Time = StartDate.getTime() - EndDate.getTime();
    let Days = Time / (1000 * 3600 * 24); //Diference in Days
    let ExactDays = Math.round(Days);
    let PlanPurchasedDate = obj?.networkStatus?.app?.servifyCare?.planPurchaseDate;
    let cancelDate = obj?.networkStatus?.app?.servifyCare?.cancelDate
    let todayDate = new Date().toJSON().slice(0, 10);
    let todayDateSplit: any = todayDate.split("-");
    let PlanPurchasedDtSplit: any = PlanPurchasedDate?.split("-");
    let PlanPurchasedDt = new Date(PlanPurchasedDtSplit[0], parseInt(PlanPurchasedDtSplit[1]) - 1, PlanPurchasedDtSplit[2]);
    let check = new Date(todayDateSplit[0], parseInt(todayDateSplit[1]) - 1, todayDateSplit[2]);
    let cancelDtSplit: any
    let thisMonth
    let to
    let monthset
    if (cancelDate) {
      cancelDtSplit = cancelDate.split("-");
      monthset = cancelDtSplit[1]
      let PreviousDate = PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
      let mm = this.monthDiff(PlanPurchasedDt, check)
      PlanPurchasedDt.setDate(PlanPurchasedDt.getDate() - 1)
      PlanPurchasedDt.setMonth(PlanPurchasedDt.getMonth() + mm)
      let mmset = check.getTime() > PlanPurchasedDt.getTime() ? 1 : 0
      this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
      let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
      to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
      if (ExactDays < 30) {
        this.subscriptionEndDt = cancelDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
      }
    }
    else {
      thisMonth = StartDate.getMonth() + 1;
      monthset = thisMonth
      if (todayDateSplit[2] >= PlanPurchasedDtSplit[2]) {
        let PreviousDate = PlanPurchasedDtSplit[2] - 1;
        let nextMonth = StartDate.getMonth() + 2;
        this.subscriptionEndDt = currentYear + "-" + nextMonth + "-" + PreviousDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
        //console.log(this.subscriptionEndDt);

      }
      else {
        let PreviousDate = PlanPurchasedDtSplit[2] - 1;
        this.subscriptionEndDt = currentYear + "-" + monthset + "-" + PreviousDate;
        let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
        to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
        //console.log(this.subscriptionEndDt);

      }
    }
    if (check > to) {
      return false
    }
    else if (cancelDate && ExactDays < 30) {
      return false
    }
    else {
      return true
    }
    return false;
  }

  reStructureTabInfo(obj) {
    let tabInfo: any = { isResponse: true };
    if (obj.lastSpeedTestResult && obj.lastSpeedTestResult?.length) {
      const speed = obj.lastSpeedTestResult[0];
      /* tabInfo.service = {
        down: this.byteToMegaByte(speed?.downloadSpeed || 0),
        up: this.byteToMegaByte(speed?.uploadSpeed || 0),
        time: Math.ceil((((new Date().getTime()) - speed.timestamp) / 1000) / 3600)
      }; */
      //time : this.service.timeToDays(((new Date().getTime()) - speed.timestamp) / 1000)
    }
    if (obj?.lastSpeedTestResult && obj?.lastSpeedTestResult?.length && obj?.lastSpeedTestResult[0].createTime) {
      let res = obj?.lastSpeedTestResult[0];
      const timeCheck = (((new Date().getTime()) - (res?.createTime ? res?.createTime : (new Date().getTime()))) / 1000);
      const [overtime, connectingTime, time] = this.service.timeSetter(res?.createTime, timeCheck);
      const level = this.leveltranslations();
      this.overtimecheck = overtime;
      this.connectime = connectingTime
      this.serviceTabInfo = {
        down: level[res['dsLevel']] || '',
        up: level[res['usLevel']] || '',
        time: (overtime + time.toString() + ' ' + connectingTime),
        speedMessage: `${(time.toString() + ' ') || '0'} `,
        isHour: (res?.createTime && timeCheck >= 3600)
      };
      this.service.setServiceTabInfo(this.serviceTabInfo);
    } else {
      this.serviceTabInfo.speedMessage = '';
    }
    if (obj?.ssid?.activeSSIDCount) tabInfo.ssidCount = obj?.ssid?.activeSSIDCount;
    if (obj?.lanHostsList?.connectedDeviceCount) tabInfo.connectedDevice = obj?.lanHostsList?.connectedDeviceCount;
    if (obj?.appCount?.subscriberAppCount) tabInfo.appCount = obj?.appCount?.subscriberAppCount;
    if (obj?.appCount?.enabledAppCount) tabInfo.appEnabled = obj?.appCount?.enabledAppCount;
    return tabInfo;
  }

  byteToMegaByte(bytes, isByte = 2) {
    if (bytes === 0) return 0;  //'0 Bytes';
    return parseFloat((bytes / Math.pow(1024, isByte)).toFixed(2));// + ' ' + sizes[i];
  }
  endPointIdFlage: boolean;
  getSubscriberInfo(subscriberId) {
    if (!((!subscriberId || subscriberId == "undefined") && sessionStorage.getItem('overviewStatus') == 'yetToLoad')) sessionStorage.setItem('overviewStatus', 'yetToLoad');
    const undiscovered = JSON.parse(sessionStorage.getItem(`calix.deviceData`))?.filter(obj => !obj.hasOwnProperty("modelName"));
    if (!this.containsGS?.length && undiscovered?.length) this.findUndiscoveredGS(undiscovered);
    this.service.setMetaData("", "", true);
    this.service.setServiceTabInfo(undefined);
    sessionStorage.setItem('dataDownspeed', '');
    this.hasCco = this.sso.getEntitlements()[102];
    if (this.hasCco) {
      this.subscriberImpactedOutage()
    }
    if (subscriberId && subscriberId != "undefined") {
      this.loader = true;
      this.service.getSubscriberInfo(this.orgId, subscriberId)
        .then((res: any) => {
          this.loader = false;
          if (res) {
            if (this.rgData?.length) {
              localStorage.setItem('ciquserid', res?.commandIQ?.userId);
              const chartSubscriberInfo = `${res.account ? `${res.account}:` : ''}\
                  ${res.serviceAddress ? `${res.serviceAddress.split(',')[0]}_` : ''}\
                  ${res.name ? `${res.name}_` : ''}${this.rgData[0]['serialNumber'] ? this.rgData[0]['serialNumber'] : ''}`;
              this.sso.setReportChartSubscriberInfo(chartSubscriberInfo);
              // const trafficReportSubscriberInfo = `${res.account ? `${res.account}_` : ''}\
              //     ${res.name ? `${res.name}_` : ''}${this.rgData[0]['serialNumber'] ? this.rgData[0]['serialNumber'] : ''}`;
              // this.sso.setTrafficReportChartSubscriberInfo(trafficReportSubscriberInfo);
            } else {
              // const trafficReportSubscriberInfo = `${res.account ? `${res.account}_` : ''}\
              //     ${res.name ? `${res.name}` : ''}`;
              // this.sso.setTrafficReportChartSubscriberInfo(trafficReportSubscriberInfo);
            }
            this.sso.setTrafficReportChartSubscriberInfo(res.endpointIdName);
            this.recentSubscriber(res);
            this.service.setSubscriberInfo(res);
            sessionStorage.setItem(`calix.subLocationId`, (res.subscriberLocationId || ''));
            sessionStorage.setItem(`calix.endpointId`, (res.endpointId || ''));
            sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify(res || {}));
            if (res.endpointId) {
              this.sso.setSubscriberEndpointId(res.endpointId);
            } else {
              this.sso.setSubscriberEndpointId('');
            }
            if (res["service-detail"] && res["service-detail"].length) {
              this.sso.setServiceDownSpeed(res["service-detail"][0].downSpeed || '');
              sessionStorage.setItem('dataDownspeed', (res["service-detail"][0].downSpeed || ''));
            } else {
              this.sso.setServiceDownSpeed('');
            }
            this.subscriberInfoResult = res || {};
            if (this.subscriberInfoResult?.commandIQ?.secondaryUsers?.length > 0) {
              this.commandIqEmail = this.subscriberInfoResult.commandIQ.secondaryUsers[0]?.email ? this.subscriberInfoResult.commandIQ.secondaryUsers[0]?.email : '-';
            }
            else {
              this.commandIqEmail = '-';
            }

            this.subscriberInfoResult.service = this.subscriberInfoResult.service || {};
            this.subscriberInfoResult.commandIQ = this.subscriberInfoResult.commandIQ || {};
            const deviceData = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`));
            /* if (!this.subscriberInfoResult?.devices && deviceData.length) {
              this.subscriberInfoResult['devices'] = deviceData;
            } */
            if (!this.subscriberInfoResult?.devices) {
              this.showProvisionRecord = false;
            }
            this.NewEmail = this.subscriberInfoResult?.commandIQ?.email?.slice();
            this.NewSecondaryEmail = this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email?.slice();


            /* if (this.subscriberInfoResult?.devices && this.subscriberInfoResult?.devices.length) {
              this.subscriberInfoResult.ipInfo = this.subscriberInfoResult?.devices
                .filter(device => {
                  if (device.opMode == "RG") {
                    return {
                      "pppUsername": device.pppUsername,
                      "ipAddress": device.ipAddress,
                      "secondIpAddress": device.secondIpAddress
                    }
                  }
                })
                .reduce((acc, curr) => {
                  if (curr["pppUsername"]) acc["pppUsername"].push(curr["pppUsername"]);
                  if (curr["ipAddress"]) acc["ipAddress"].push(curr["ipAddress"]);
                  if (curr["secondIpAddress"]) acc["secondIpAddress"].push(curr["secondIpAddress"]);
                  return acc;
                }, {
                  "pppUsername": [],
                  "ipAddress": [],
                  "secondIpAddress": []
                })
            } else {

            } */
            this.subscriberInfoResult.ipInfo = {
              "pppUsername": [res.pppUsername],
              "ipAddress": [res.ipAddress],
              "secondIpAddress": [res.secondIpAddress]
            }
            let onboard = this.subscriberInfoResult.commandIQ.onboarded ? this.subscriberInfoResult.commandIQ.onboarded : false;
            let fduser = this.subscriberInfoResult?.commandIQ?.fduser ? this.subscriberInfoResult?.commandIQ?.fduser : false;
            sessionStorage.setItem(`${this.sso.getTabId()}calix.routerOnboard`, onboard.toString());
            sessionStorage.setItem(`${this.sso.getTabId()}calix.userFdUser`, fduser.toString());
            this.sso.sendUserCommandIQData(this.subscriberInfoResult?.commandIQ || {});
            res?.devices?.forEach(obj => {
              if (obj.bSmbMode) this.bSmbMode = true;
            })

            if (this.bSmbMode) {
              this.showCommandInvite = false;
            }


          } else {
            this.sso.setSubscriberEndpointId('');
            this.sso.setTrafficReportChartSubscriberInfo('');
          }
        })
        .catch(err => {
          this.loader = false;
          this.sso.setSubscriberEndpointId('');
          this.sso.setTrafficReportChartSubscriberInfo('');
          this.pageErrorHandle(err);
        })
        .finally(() => {
          //this.checkQoEStatus()
        });
    } else {

      this.loader = true;
      sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify({}));
      //let Devices = JSON.parse(this.sso.getSerialNo());
      const RG = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`))?.filter(obj => obj.opMode == "RG" && obj._id);
      if (RG?.length) {
        this.service.getUnassociatedDevice(this.orgId, RG[0].serialNumber)
          .subscribe((res: any) => {
            this.loader = false;
            sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify(res || {}));
            sessionStorage.setItem('unassoDeviceReferrer', res?.commandIQ?.referrer);
            const trafficReportSubscriberInfo = `${RG[0].serialNumber ? RG[0].serialNumber : ''}`;
            this.sso.setTrafficReportChartSubscriberInfo(trafficReportSubscriberInfo);
            if (res) {
              res?.devices?.forEach(obj => {
                if (obj.bSmbMode) this.bSmbMode = true;
              })
              this.recentSubscriber(res);
              this.service.setSubscriberInfo(res);
              sessionStorage.setItem(`calix.endpointId`, (res.endpointId || ''));
              if (res.endpointId) {
                this.sso.setSubscriberEndpointId(res.endpointId);
                this.endPointIdFlage = true;
              } else {
                this.sso.setSubscriberEndpointId('');
                this.endPointIdFlage = false;
              }
              this.subscriberInfoResult = res || {};
              this.subscriberInfoResult.service = this.subscriberInfoResult.service || {};
              this.subscriberInfoResult.commandIQ = this.subscriberInfoResult.commandIQ || {};
              this.subscriberInfoResult.ipInfo = {
                "pppUsername": res.pppUsername ? [res.pppUsername] : [],
                "ipAddress": res.ipAddress ? [res.ipAddress] : [],
                "secondIpAddress": res.secondIpAddress ? [res.secondIpAddress] : []
              }
              let onboard = this.subscriberInfoResult.commandIQ.onboarded ? this.subscriberInfoResult.commandIQ.onboarded : false;
              let fduser = this.subscriberInfoResult?.commandIQ?.fduser ? this.subscriberInfoResult?.commandIQ?.fduser : false;
              sessionStorage.setItem(`${this.sso.getTabId()}calix.routerOnboard`, onboard.toString());
              sessionStorage.setItem(`${this.sso.getTabId()}calix.userFdUser`, fduser.toString());
              this.sso.sendUserCommandIQData(this.subscriberInfoResult?.commandIQ || {});
            }

          },
            err => {
              this.loader = false;
              this.pageErrorHandle(err);
            })//.add(this.checkQoEStatus());
      } else {
        this.loader = false;
        this.sso.setSubscriberEndpointId('');
        this.sso.setTrafficReportChartSubscriberInfo('');
      }// this.checkQoEStatus(); }
      // let res: any = {};
      // if (res) {
      //   this.service.setSubscriberInfo(res);
      //   localStorage.setItem("calix.endpointId", (res.endpointId || ''));
      //   if (res.endpointId) {
      //     this.sso.setSubscriberEndpointId(res.endpointId);
      //   } else {
      //     this.sso.setSubscriberEndpointId('');
      //   }
      //   this.subscriberInfoResult = res || {};
      //   this.subscriberInfoResult.service = this.subscriberInfoResult.service || {};
      //   this.subscriberInfoResult.commandIQ = this.subscriberInfoResult.commandIQ || {};
      //   let onboard = this.subscriberInfoResult.commandIQ.onboarded ? this.subscriberInfoResult.commandIQ.onboarded : false;
      //   localStorage.setItem("calix.routerOnboard", onboard.toString());
      // }
    }
  }

  recentSubscriber(subscriberData) {
    if (this.sso.getCscType() === 'DME') return;
    const obj = {
      // "orgId": this.orgId,
      "agentId": localStorage.getItem("calix.userId"),
      "subscriberAccount": subscriberData.account,
      "subscriberId": subscriberData._id,
      "subscriberName": subscriberData.name,
      "serviceAddress": subscriberData.serviceAddress
    }
    this.service.recentSubscriber(obj).subscribe(
      (res: any) => {
        if (res) {
        }
      }, err => {
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    //if (this.subscriberInfo) this.subscriberInfo.unsubscribe();
    clearInterval(this.tabInfoInterval);
    $(document).off("click", "#searchResultId tr");
    localStorage.removeItem('searchSubscriberId');
    localStorage.removeItem('searchDevices');
    sessionStorage.removeItem('insideSubView');
    if (this.notAllowedMenus && this.notAllowedMenus.length) {
      this.notAllowedMenus.forEach((element) => {
        element.removeEventListener('click', () => {
          this.externalUserNotAllowed = !!history?.state?.externalUserNotAllowed;
        })
      });
    }
    setTimeout(() => {
      if (sessionStorage.getItem('insideSubView') != 'true') {
        sessionStorage.removeItem('outcomeTimer');
        sessionStorage.removeItem('insideSubTime');
      }
    }, 200);
  }

  gotoOverview(): void {
    this.router.navigate([`/${this.MODULE}/overview/issues`]);
  }

  gotoService(): void {
    this.router.navigate([`/${this.MODULE}/service/data`]);
  }

  gotoRouter(): void {
    this.router.navigate([`/${this.MODULE}/router`]);
  }

  gotoWifi(): void {
    this.router.navigate([`/${this.MODULE}/wifi`]);
  }

  gotoDevice(): void {
    this.router.navigate([`/${this.MODULE}/device`]);
  }

  gotoApp(): void {
    this.router.navigate([`/${this.MODULE}/application`]);
  }

  gotoSSIDManager() {
    this.router.navigate([`/${this.MODULE}/wifi/ssid`]);
  }
  openOutModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {

      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openResolveModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  pageErrorHandle(err: HttpErrorResponse, type = "") {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 500 && type == "callcoutcome") {
      this.alertMessage = this.language['internalServerError'];
    }
    else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

  browserTabClose() {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      var confirmationMessage = 'Are you sure you want to leave hhh?'; // Your custom message
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;
    }
  }

  browserBack() {
    if (window.history && window.history.pushState) {

      window.onpopstate = function () {
        $("#supportSearchId").val($("#paramsPassed").attr("searchString") || "");
        window.onpopstate = () => { }
      }

    }
  }

  Reasontype = [
    "Resolved",
    "Escalated",
    "Truck roll",
    "Account Inquiry",

  ]

  onPrev() {

    this.currActive--;
    if (this.radio1 === "Escalated") {
      this.currActive = 0;

    }
    if (this.radio2 === "User owned equipment" && this.currActive != 0) {
      this.currActive = 1;

    }
    this.displaysubmit = false;

  }
  statusoption() {
    if (this.radio1 === "Resolved") {
      this.status = [this.language["WAN"], this.language["Gateway"], this.language["Wi-Fi"], this.language["Client Devices"]];
      this.radio2 = this.status[0];
    }
    else if (this.radio1 === "Escalated") { this.currActive = 3; this.displaysubmit = true; this.radio2 = ""; this.radio3 = "" }
    else if (this.radio1 === "Truck roll") {
      this.status = [this.language["Hardware issue"], this.language["User owned equipment"]];
      this.radio2 = this.status[0];
    }

    else if (this.radio1 === "Account Inquiry") {
      this.status = [this.language["Customer in-person"], this.language["Customer on phone"], this.language["Customer not present"], this.language["Call center escalation"]];
      this.radio2 = this.status[0];
    }
  }

  onNext() {

    this.currActive++;
    // this.radio3 = this.subreason[0];
    //this.radio2 = this.status[0];
    if (this.currActive == 3) {
      this.displaysubmit = true;
    }
    if (this.currActive === 1) {
      if (this.radio1 === "Resolved") {
        this.status = ["WAN", "Gateway", "Wi-Fi", "Client Devices"];
        this.radio2 = this.status[0];
      }
      else if (this.radio1 === "Escalated") { this.currActive = 3; this.displaysubmit = true; this.radio2 = ""; this.radio3 = "" }
      else if (this.radio1 === "Truck roll") {
        this.status = ["Hardware issue", "User owned equipment"];
        this.radio2 = this.status[0];
      }

      else if (this.radio1 === "Account Inquiry") {
        this.status = ["Customer in-person", "Customer on phone", "Customer not present", "Call center escalation"];
        this.radio2 = this.status[0];
      }
    }


    if (this.currActive === 2) {
      switch (this.radio2) {
        case "WAN": this.subreason = ["Saturation", "Poor-speed", "No-speed"]; this.radio3 = this.subreason[0]; break;
        case "Gateway": this.subreason = ["Offline", "Reboot", "Upgrade", "Replacement"]; this.radio3 = this.subreason[0]; break;
        case "Wi-Fi": this.subreason = ["SSID/Password", "Interference", "Coverage"]; this.radio3 = this.subreason[0]; break;
        case "Client Devices": this.subreason = ["Legacy devices", "Low signal strength", "Saturation"]; this.radio3 = this.subreason[0]; break;
        case "Hardware issue": this.subreason = ["Wireless Mesh/Improved Coverage", "Device replacement", "OSS/BSS programming issue", "End of life device replacement", "Other"]; this.radio3 = this.subreason[0]; break;
        case "User owned equipment": this.currActive = 3; this.displaysubmit = true; this.radio3 = ""; break;
        case "Customer in-person": this.subreason = ["Customer education", "Training", "Upsell", "Proactive/outbound call", "Trouble ticket review"]; this.radio3 = this.subreason[0]; break;
        case "Customer on phone": this.subreason = ["Customer education", "Training", "Upsell", "Proactive/outbound call", "Trouble ticket review"]; this.radio3 = this.subreason[0]; break;
        case "Customer not present": this.subreason = ["Customer education", "Training", "Upsell", "Proactive/outbound call", "Trouble ticket review"]; this.radio3 = this.subreason[0]; break;
        case "Call center escalation": this.subreason = ["Customer education", "Training", "Upsell", "Proactive/outbound call", "Trouble ticket review"]; this.radio3 = this.subreason[0]; break;

      }
    }
    //  switch(this.radio3)
    //  {
    //    default: this.displaysubmit=true;
    //  }



  }
  // post for call outcome
  Submitvalue() {
    this.orgId = this.sso.getOrgId();
    let SubscriberId = this.sso.getCSCSubscriberId();
    const devices = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`));
    let username = localStorage.getItem("calix.username");
    let userid = localStorage.getItem("calix.userId");
    let fsan = [];
    let deviceType = [], firmwareVersion = [];
    devices.forEach(element => {
      if (element.serialNumber) {
        // fsan = fsan +" "+element.serialNumber;
        // deviceType=deviceType+" "+element.modelName+" "+element.opMode;
        // firmwareVersion= firmwareVersion+" "+element.softwareVersion;
        fsan.push(element.serialNumber);
        let a = element.modelName + " " + element.opMode;
        deviceType.push(a);
        firmwareVersion.push(element.softwareVersion);
      }
    });
    if (devices) {
      let data = {
        "agentId": userid,
        "deviceId": String(fsan),
        "deviceType": String(deviceType),
        "firmwareVersion": String(firmwareVersion),
        "orgId": this.orgId,
        "reason": this.radio2,
        "status": this.radio1,
        "subReason": this.radio3,
        "subscriberAccount": this.subscriberInfoResult.account,
        "subscriberId": SubscriberId,
        "subscriberName": this.subscriberInfoResult.name,
        "userName": username
      }
      this.service.postcall(data).subscribe(
        (res) => {
          this.successmsg = true;
        },
        (err) => {
          this.isError = true;
          this.alertMessage = err;
        });
    }
    this.calloutcome();

  }
  calloutcome() {
    this.radio1 = 'Resolved';
    this.radio2 = '';
    this.radio3 = '';
    this.displaysubmit = false;
    this.currActive = 0;
  }


  serviceLatest(serialNumber) {
    this.serviceTabInfo.speedMessage = '';
    if (!this.service.getServiceTabInfo()) this.serviceLoader = true;
    else this.serviceTabInfo.speedMessage = this.service.getServiceTabInfo()?.speedMessage || '';
    this.serviceTabInfo = this.service.getServiceTabInfo() || this.service.serviceTabInfo(this.orgId, serialNumber).subscribe(
      (res: any) => {
        this.serviceLoader = false;
        if (res?.createTime) {
          const level = this.leveltranslations();
          const timeCheck = (((new Date().getTime()) - (res?.createTime ? res?.createTime : (new Date().getTime()))) / 1000);
          const [overtime, connectingTime, time] = this.service.timeSetter(res?.createTime, timeCheck);
          this.overtimecheck = overtime
          this.connectime = connectingTime
          this.serviceTabInfo = {
            down: level[res['dsLevel']] || '',
            up: level[res['usLevel']] || '',
            time: (overtime + time.toString() + ' ' + connectingTime),
            speedMessage: `${(time.toString() + ' ') || '0'}`,
            isHour: (res?.createTime && timeCheck >= 3600)
          };

          this.service.setServiceTabInfo(this.serviceTabInfo);
        } else {
          this.serviceTabInfo.speedMessage = '';
        }
      },
      (err) => {
        this.serviceTabInfo.speedMessage = '';
        this.serviceLoader = false;
        this.pageErrorHandle(err);
      }
    );
  }

  latencyLatest(serialNumber) {
    this.latencyTabInfo.latencyMessage = '';
    if (!this.service.getLatencyTabInfo()) this.serviceLoader = true;
    else this.latencyTabInfo.latencyMessage = this.service.getLatencyTabInfo()?.latencyMessage;
    this.latencyTabInfo = this.service.getLatencyTabInfo() || this.service.latencyTestChart(this.orgId, serialNumber, 1).subscribe(
      (res: any) => {
        this.serviceLoader = false;
        this.showLatencyStatus = false;
        if (res?.length && res[0]?.createTime) {
          res = res[0];
          this.showLatencyStatus = true;
          const timeCheck = (((new Date().getTime()) - (res?.createTime ? res?.createTime : (new Date().getTime()))) / 1000);
          const [overtime, connectingTime, time] = this.service.timeSetter(res?.createTime, timeCheck);
          this.latencyTabInfo = {
            time: (overtime + time.toString() + ' ' + connectingTime),
            latencyMessage: `Latency Test ran ${(overtime + time.toString() + ' ' + connectingTime) || '0'} seconds ago - ${res?.latency || 0}ms`,
          };
          this.service.setLatencyTabInfo(this.latencyTabInfo);
        } else {
          this.latencyTabInfo.latencyMessage = '';
        }
      },
      (err) => {
        this.latencyTabInfo.latencyMessage = '';
        this.serviceLoader = false;
        this.pageErrorHandle(err);
      }
    );
  }

  updateWifiUrl() {
    // if (!(this.router.url === `/${this.MODULE}/wifi`)) {
    //   if (this.router.url.includes(`/${this.MODULE}/wifi`)) {
    //     if (this.router.url === `/${this.MODULE}/wifi`) {
    //       this.router.navigate([`/${this.MODULE}/wifi`])
    //     } else if (this.router.url.slice(0, this.router.url.lastIndexOf("_")) === `/${this.MODULE}/wifi/rg`) {
    //       this.router.navigate([this.router.url])
    //     } else if (this.router.url.slice(0, this.router.url.lastIndexOf("_")) === `/${this.MODULE}/wifi/extender`) {
    //       this.router.navigate([this.router.url])
    //     } else if (this.router.url === `/${this.MODULE}/wifi/ssid`) {
    //       this.router.navigate([this.router.url])
    //     }
    //   } else {
    //     this.router.navigate([`/${this.MODULE}/wifi`])
    //   }
    // }
  }

  @Output() device = new EventEmitter();
  @Output() apiCallDone = new EventEmitter();
  @Output() DeviceCallDone = new EventEmitter();
  deviceClick() {
    this.device.emit("device")
  }
  hideShowClass() {
    if (document.getElementById("routerErrbtn").classList.contains('hideShow')) {
      document.getElementById("routerErrbtn").classList.remove("hideShow");
    } else {
      document.getElementById("routerErrbtn").classList.add("hideShow");
    }
  }

  getIssuesTabInfo() {
    let orgId = this.sso.getOrgId();
    let Devices = JSON.parse(this.sso.getSerialNo());
    let SubscriberId = this.sso.getCSCSubscriberId();
    Devices.forEach(element => {
      if (element.serialNumber) {
        var newElement = {};
        newElement["serialNumber"] = element.serialNumber,
          newElement["opMode"] = element.opMode,
          this.serialNo.push(newElement);
      }
    });
    let data = {
      "subscriberId": SubscriberId,
      "devices": this.serialNo
    }
    this.issueLoader = true;
    this.issuseservice.putissues(orgId, data).subscribe(data => {

      let issueData: any = data;
      issueData = issueData?.filter(obj => this.codelist.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)

      this.issuseservice.setIssues(issueData);
      this.getIssues();
      this.issueLoader = false;
    }, (err) => {
      this.issueLoader = false;

    });



    // this.issuseservice.getIssues(this.orgId, this.serialNo, this.SubscriberId).subscribe(data =>{
    //   this.issueData = data;
    //   this.totalissues = this.issueData.length;

    // });
  }

  refreshStatus(event) {
    event.stopPropagation();
    event.preventDefault();
    this.service.setSubscriberOverviewData({});
    // this.service.setSubscriberTabInfoData(undefined);
    //this.getIssuesTabInfo()
    //this.collectTabsInfo();
    this.service.removeDataSaver();
    //this.checkQoEStatus();
    this.overviewApi();
    this.getIssues();

    //this.swapInProgress();
    // this.service.setSubscriberTabInfoData(undefined);
    // this.getIssuesTabInfo()
    // if (this.rgData && this.rgData.length) this.networkTabApiHit(this.rgData[0]['serialNumber']);
  }

  marketingDetail() {
    this.router.navigate([`/${this.MODULE}/insights`], {
      state: {
        id: this.sso.getCSCSubscriberId(), value: "", isCSCResult: true
      }
    });
    this.marketingCommonService.setCSCtrueOrFalse(true)
    this.marketingCommonService.setSubscriberID(this.sso.getCSCSubscriberId());
  }


  getDeviceIssues() {
    if (this.issueDataJson?.length > 0) {
      let totalDeviceissues = this.issueDataJson?.filter(obj => obj.type.includes("CLIENT") || obj.type.includes("Client") || obj.type.includes("DEVICE") || obj.type.includes("Device"));
      let allDeviceissues = [];
      totalDeviceissues.forEach(element => {

        if (element.code == "CLIENT_DEVICE_LOW_SIGNAL_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "ssR";
          allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "dhyRW";
          allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LOW_Efficiency_SCORE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "LES";
          allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "rmode";
          allDeviceissues.push(newElement);
        }
      });
      if (allDeviceissues) {
        this.issuseservice.setDeviceIssues(allDeviceissues);
      } else this.issuseservice.setDeviceIssues({});
      this.DeviceCallDone.emit(true);
    }
  }

  //CCL-25489
  checkSpecialModel() {
    if (this.deviceData?.length) {
      const index = this.deviceData.findIndex(device => device.opMode == "RG");
      if (index > -1) this.deviceData.splice(0, 0, this.deviceData.splice(index, 1)[0]);
    }

    if (this.deviceData?.length && this.deviceData[0].opMode == "RG") {
      let modelNumber = this.deviceData[0].modelName.split('-')[0].replace(/\D/g, '');
      if (this.deviceData?.length == 1 && parseInt(modelNumber) >= 700 && parseInt(modelNumber) <= 799) {
        this.wifiDisabled = true;
        this.isModel7XX = true;
      } else if (this.deviceData?.length > 1 && parseInt(modelNumber) >= 700 && parseInt(modelNumber) <= 799 && this.deviceData[1].opMode != "RG") {
        this.isModel7XX = true;
        //this.getMetaData(this.deviceData[1].serialNumber);
      }

    }
  }

  getMetaData(fsan) {
    //this.loading = true;
    if (!fsan) return;
    this.service.fetchMetaData(this.orgId, fsan).subscribe((res: any) => {
      //this.loading = false;
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.service.setMetaData(fsan, this.metaData);
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  reStructureMeta(obj) {
    this.metaData[obj.featureName.replace(/[.]/g, "")] = {};
    if (obj.hasOwnProperty("fields")) {
      obj.fields.forEach(element => {
        this.metaData[obj.featureName.replace(/[.]/g, "")][element.name.replace(/[.]/g, "")] = element;
      });
    } else if (obj.hasOwnProperty("configuration")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["config"] = obj.configuration;
    } else if (obj.hasOwnProperty("supported")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["supported"] = obj.supported;
    }

  }

  ngAfterViewInit() {
    let path = window.location.pathname;
    if (path.indexOf("support/traffic-reports/") !== -1) {
      setTimeout(() => {
        $("#serviceTabId").addClass("active");
      }, 500);

    }

  }

  leveltranslations() {
    return { 3: 'Good', 2: 'OK', 1: 'Bad' };

  }

  openNewTab() {
    localStorage.setItem('searchSubscriberId', sessionStorage.getItem('calix.subscriberId'));
    localStorage.setItem('searchDevices', sessionStorage.getItem(`calix.deviceData`));
  }

  newTab(event) {
    let provisonData;

    if (event.target.className.includes('PR-data')) provisonData = { menuSub: this.subscriberInfoResult || {}, isProvision: true }
    if (event.target.className.includes('Edit-sub')) provisonData = { menuSub: this.subscriberInfoResult || {}, isMenu: true, isMenuSub: true }
    if (event.target.className.includes('Manage-sub')) provisonData = { menuSub: this.subscriberInfoResult || {}, isMenuSub: true }
    if (event.target.className.includes('Del-sub')) provisonData = { menuSub: this.subscriberInfoResult || {}, isMenu: true, isMenuSub: true, menuDelete: true }

    if (localStorage.getItem('Provisioning')) localStorage.removeItem('Provisioning');
    localStorage.setItem('Provisioning', JSON.stringify(provisonData))
  }

  checkIpAddress(val, type) {
    let ipAddr = '';
    ipAddr = (type == "v4" && this.sso.isIpv4Address(val)) ? val : ipAddr;
    ipAddr = (type == "v6" && this.sso.isIpv6Address((val ? val.split('/')[0] : ''))) ? val : ipAddr;
    return ipAddr;
  }

  getMultipleRegId(regId) {
    this.service.getRegIdInstance(this.orgId, regId).subscribe(res => {
      this.service.multipleRegInstance = res;
      this.multipleRegId = res || [];
    }, err => {
      this.pageErrorHandle(err);
    })
    return undefined;
  }

  regFsan() {
    return (this.multipleRegId || []).map(obj => obj.serialNumber).join(', ');
  }

  tabInfoSubscription() {
    this.subscribeService.updateSSIDCount$.subscribe(res => {
      if (res) {
        ++this.subjectPasser;
        if (this.subjectPasser == 1) this.collectTabsInfo();
        setTimeout(() => {
          this.subjectPasser = 0;
        }, 5000);
      }
    });
  }

  overviewStatus() {
    let status = sessionStorage.getItem('overviewStatus');
    if (status == 'yetToLoad') this.overviewApi();
    else if (status == 'isLoading') {
      this.nwLoader = true;
      const overviewStatusThread = setInterval(() => {
        status = sessionStorage.getItem('overviewStatus');
        if (['isLoaded', 'isError'].includes(status)) {
          clearInterval(overviewStatusThread);
          this.updateTileStatus(status);
        }
      }, 2000)
    }
    else this.updateTileStatus(status);
  }

  updateTileStatus(status) {
    this.nwLoader = false;
    if (status == 'isLoaded') {
      const res = this.service.getSubscriberTabInfoData();
      this.apiCallDone.emit(true);
      this.tabInfo = this.reStructureOverviewTabInfo(res);
    } else if (status == 'isError') {
      this.apiCallDone.emit(true);
    }
  }

  setWIFIRouting() {
    //let devices = this.deviceData.filter(obj => obj.serialNumber && !obj.hasOwnProperty('ont')); // TO fix CCL-33120  !obj.hasOwnProperty('ont') added
    let devices = this.deviceData?.filter(obj => obj._id); // TO fix CCL-33120  _id  added devices & half ont only have _id
    let WIFIRouting = `/${this.MODULE + '/wifi'}`;
    if (devices?.length) {
      if (devices.length && devices[0]["serialNumber"] && devices[0]["opMode"] == 'RG' && !this.isModel7XX) {
        WIFIRouting = `/${this.MODULE}/wifi/rg/${devices[0]["serialNumber"]}`;
      } else if (devices.length && devices[0]["serialNumber"] && devices[0]["opMode"] !== 'RG') {
        WIFIRouting = `/${this.MODULE}/wifi/extender/${devices[0]["serialNumber"]}`;
      }
    } else {
      WIFIRouting = `/${this.MODULE}/wifi/ssid`; // TO fix CCL-33120  !obj.hasOwnProperty('ont') added and redirectd to ssid
    }
    this.WIFIRouting = WIFIRouting;
  }

  // Get call outcome statuses data
  getCallOutComeData(type = "") {
    this.modalLoader = true;
    this.showDevices = false;
    this.selectedAutomatedNotes = [];
    this.selectedDevices = []
    this.callOutComeData.notes = "";
    let tId = localStorage.getItem('callOutComeTicketID');
    if (!tId) {
      this.callOutComeTicketID = '';
    }

    this.callOutComeService.GetStatuses(this.orgId).subscribe((res: any) => {
      if (res != null && res?.length > 0) {
        this.callOutComeStatuses = res;
        let data = this.callOutComeStatuses[0];
        this.callOutComeStatusChange(data);
        this.selectedStatusName = data.name;

        var issuesAndWarnings = JSON.parse(sessionStorage.getItem("reasonsForIssues"))
        if (issuesAndWarnings?.length > 0) {
          this.issuesAndWarnings = issuesAndWarnings
        }


        if (type != 'close') {
          if (this.sso.getCscType() !== 'DME' &&
            this.isCMCAvailable &&
            this.sso.getSubscriberEndpointId() &&
            this.scopeFlag.marketingRead &&
            !this.endPointIdFlage) {
            this.getServiceLimitHits();
          }
          else {
            this.automatedNotes?.forEach((element, i, object) => {
              if (element.Id == 2) {
                object.splice(i, 1);
              }
            })
          }

          var escalationEmail = this.callOutComeService.escalationEmail;
          if (escalationEmail) {
            this.callOutComeData.notes = escalationEmail;
            this.checkNotesLimit(escalationEmail)
          }

          this.getAllDevicesForCallOutCome()
        }

      }
      this.modalLoader = false;
    }, err => {

      this.modalLoader = false;
      this.pageErrorHandle(err);

    })
  }


  //Change the call outcome status
  callOutComeStatusChange(data) {
    this.callOutComeData.categories = [];
    if (data != null) {
      if (data.categories != null) {
        let categories = Object.keys(data.categories);
        let subCategories = categories.map(elem => data?.categories[elem]?.subcategories || []);
        let categoryNames = [];
        categoryNames = categories;
        if (data.selection == "multiple") {
          this.callOutComeSubTitle = "Root Cause";
          categories.forEach((element, i) => {
            let arry = [];
            subCategories[i].forEach(element => {
              let obj = {
                sName: element,
                isSelected: false
              }
              arry.push(obj)
            });
            let item = {
              categoryName: element,
              subCategories: arry
            }
            this.callOutComeData.categories.push(item);
          });
          this.callOutComeData.categories.sort(function (a, b) {
            return a.subCategories.length - b.subCategories.length
          });
        }
        else {
          this.callOutComeSubTitle = "Details";
          let arry = [];
          if (categories?.length > 0) {
            categories.forEach((element, i) => {
              let obj = {
                sName: element,
                isSelected: false
              }
              arry.push(obj)
            });
            arry[0].isSelected = true;
            this.selectedSingleCategoryName = arry[0].sName;
            this.callOutComeData.categories = arry;
          }
          else {
            this.callOutComeData.categories = [];
          }
        }
      }
      this.callOutComeData.statusName = data?.name;
      this.callOutComeData.statusType = data?.statusType
      this.callOutComeData.selection = data?.selection;
    }
  }
  showDevices: boolean = false;
  previousNotes: string = "";
  callOutComeNotes: any = {};

  // Append Issues And Warnings,  Service Limit Hits data when selecting
  changeAutomatedNotes(event) {
    this.showDevices = false;
    if (event?.value.length == 0) {
      this.showDevices = false
      this.selectedDevices = [];
      this.selectedItemsLabel = `{0} ${this.language.Automated_Note}`;
    }
    else if (event?.value?.includes(3)) {
      this.showDevices = true;
      if (!(this.selectedDevices?.length > 0)) {
        this.selectedDevices = [];
      }
    }
    if (event?.value.length > 0) {
      this.selectedItemsLabel = `{0} ${this.language['Automated Note(s)']}`;
    }
    var escalationEmail = this.callOutComeService.escalationEmail;
    this.callOutComeData.notes = this.callOutComeData.notes.replace(escalationEmail?.trim(), "")
    this.callOutComeData.notes = this.callOutComeData.notes.replace(this.callOutComeNotes.issuesAndwarn?.trim(), "")
    this.callOutComeData.notes = this.callOutComeData.notes.replace(this.callOutComeNotes.serviceLimitHits?.trim(), "")
    this.callOutComeData.notes = this.callOutComeData.notes.replace(this.callOutComeNotes.device_Info?.trim(), "")
    this.callOutComeData.notes = this.callOutComeData.notes?.trim();
    if (event?.value?.includes(1)) {
      let issuesAndWarnings = ""
      if (this.issuesAndWarnings?.length > 0) {
        issuesAndWarnings = `\n\n\n ${this.language.Issues_And_Warnings}: \n` + this.issuesAndWarnings.join('\n')
        this.callOutComeNotes.issuesAndwarn = issuesAndWarnings;
      }
    }
    else {
      this.callOutComeNotes.issuesAndwarn = ""
    }
    if (event?.value?.includes(2)) {
      if (this.serviceLimitDataAssign) {
        var slh = "";
        slh = `\n\n ${this.language.Service_Limit_Hits}: Up ${this.serviceLimitDataAssign?.upStreamTotals}, Down ${this.serviceLimitDataAssign?.downstreamTotals}`;
        this.callOutComeNotes.serviceLimitHits = slh;
      }
    }
    else {
      this.callOutComeNotes.serviceLimitHits = "";
    }
    if (!event?.value?.includes(3)) {
      this.callOutComeNotes.device_Info = "";
      this.selectedDevices = [];
    }

    var allNotes = this.callOutComeData.notes.replace(/(?:\r\n|\r|\n)/g, '')
    if (escalationEmail) {
      allNotes = allNotes + escalationEmail;
    }
    if (this.callOutComeNotes) {
      if (this.callOutComeNotes?.issuesAndwarn) {
        allNotes = allNotes + this.callOutComeNotes?.issuesAndwarn
      }
      if (this.callOutComeNotes?.serviceLimitHits) {
        allNotes = allNotes + this.callOutComeNotes?.serviceLimitHits
      }
      if (this.callOutComeNotes?.device_Info) {
        allNotes = allNotes + this.callOutComeNotes?.device_Info;
      }
    }
    // var escalationEmail = this.callOutComeService.escalationEmail;

    this.callOutComeData.notes = allNotes;
    this.checkNotesLimit(allNotes);
  }
  selectedItemsLabel: string = ``;
  //deviceInfoData: string = "\n\n Devices: \n Device,Connection,Access Point,SSID,Mode,Signal Strength (SNR),Efficiency Score,Pkts Dropped,DS/US PHY Rate";

  // Append Devices data to call outcome notes when selecting
  changeAutomatedNotesforDevices(event) {
    var escalationEmail = this.callOutComeService.escalationEmail;
    var allNotes = this.callOutComeData?.notes?.replace(escalationEmail?.trim(), "")
    allNotes = allNotes?.replace(this.callOutComeNotes?.issuesAndwarn?.trim(), "")
    allNotes = allNotes?.replace(this.callOutComeNotes?.serviceLimitHits?.trim(), "")
    allNotes = allNotes?.replace(this.callOutComeNotes?.device_Info?.trim(), "")
    allNotes = allNotes?.replace(/(?:\r\n|\r|\n)/g, '');
    allNotes = allNotes?.trim();
    if (event?.value?.length > 0) {
      var deviceInfo = ""
      var list = event?.value;
      var deviceData = [];
      let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
      var showClientEfficiency = this.sso.exosVersionCheck('21.3') && !fduser;

      var devData = ""
      if (!showClientEfficiency) {
        devData = `\n\n ${this.language.devices}: \n ${this.language.device},${this.language.Connection},${this.language.Access_Point},${this.language.SSID},${this.language.Mode}${this.language.WiFi_Score},${this.language.Signal_Strength} (SNR),${this.language.Pkts_Dropped},${this.language.dsUsPhyRate}`
      }
      if (showClientEfficiency) {
        devData = `\n\n ${this.language.devices}: \n ${this.language.device},${this.language.Connection},${this.language.Access_Point},${this.language.SSID},${this.language.Mode},${this.language['Efficiency Score']},${this.language.Signal_Strength}(SNR),${this.language.Pkts_Dropped},${this.language.dsUsPhyRate}`
      }

      deviceData.push(devData)
      list?.forEach(element => {
        var device = JSON.parse(JSON.stringify(this.allDeviceList[element]));
        if (device) {

          device.HostName = device.HostName ? device.HostName : "--"
          device.Connection = device.Connection != undefined ? device.Connection : '--'

          device.AccessPointHostName = device.AccessPointHostName != undefined ? device.AccessPointHostName : "";
          device.AccessPoint = device.AccessPoint != undefined ? "(" + device.AccessPoint + ") " : "";
          device.AccessPointSerialNumber != device.AccessPointSerialNumber != undefined ? device.AccessPointSerialNumber : "";

          var AccessPointHostName = device.AccessPointHostName.toString() + device.AccessPoint?.toString() + device.AccessPointSerialNumber.toString();
          if (!AccessPointHostName) {
            AccessPointHostName = "--";
          }

          device.SSID = device.SSID != undefined ? device.SSID : '--';
          device.Mode = device.Mode != undefined && device.Mode != "" ? "802." + device.Mode : '--';
          if (!showClientEfficiency) {
            device["Wifi-score"] = device["Wifi-score"] != undefined ? device["Wifi-score"] : '--';
          }


          device.SNR = (device?.SNR || device?.SNR == 0) ? (device?.SNR + ' dB') : '--'
          if (showClientEfficiency) {
            var clientEfficiencyScore = ""
            if (device['Client-efficiency-score']) {
              if (device['Client-efficiency-score'] > 0) {

                clientEfficiencyScore = (device['Client-efficiency-score'] * 100).toFixed(2) + '%'
              }
              else if (device['Client-efficiency-score'] < 0) {
                clientEfficiencyScore = (0 * 100).toFixed(2) + '%'
              }
              else if (device['Client-efficiency-score'] == 0) {
                clientEfficiencyScore = (0 * 100).toFixed(2) + '%'
              }
            }
            else {
              clientEfficiencyScore = "--"
            }
          }
          device["DS-packet-drops"] = device["DS-packet-drops"] != undefined ? device["DS-packet-drops"] : '--';

          var phyRate = ""
          var DSphyRate = "";
          DSphyRate = (device["DS-phy-rate"] != undefined || device["DS-phy-rate"] == 0) ? this.kbpsTO(device["DS-phy-rate"],
            true, false) : '--';
          if (DSphyRate !== "--") {
            var rate = (device['DS-phy-rate'] ||
              device['DS-phy-rate'] == 0) ?
              this.kbpsTO(device['DS-phy-rate'], false,
                true) + 'bps' : 'Kbps';

            DSphyRate = DSphyRate + " " + rate;
          }
          var USphyRate = "";
          USphyRate = device["US-phy-rate"] != undefined || device["US-phy-rate"] == 0 ? this.kbpsTO(device["US-phy-rate"],
            true, false) : '--'
          if (USphyRate !== "--") {

            var rate = (device["US-phy-rate"] || device["US-phy-rate"] == 0) ?
              this.kbpsTO(device["US-phy-rate"], false,
                true) + 'bps' : 'Kbps';

            USphyRate = USphyRate + " " + rate;
          }
          if (DSphyRate === "--" && USphyRate === "--") {
            phyRate = "--"
          }
          else {
            phyRate = DSphyRate + "/" + USphyRate
          }

          if (!showClientEfficiency) {
            devData = `${device.HostName},${device.Connection},${AccessPointHostName},${device.SSID},${device.Mode},${device["Wifi-score"]},${device.SNR},${device["DS-packet-drops"]},${phyRate}`
          }
          if (showClientEfficiency) {
            devData = `${device.HostName},${device.Connection},${AccessPointHostName},${device.SSID},${device.Mode},${device.SNR},${clientEfficiencyScore},${device["DS-packet-drops"]},${phyRate}`
          }

          deviceData.push(devData)

        }
      });
      deviceInfo = deviceData.join('\n')
      this.callOutComeNotes.device_Info = deviceInfo
      if (escalationEmail) {
        allNotes = allNotes + escalationEmail;

      }
      if (this.callOutComeNotes) {
        if (this.callOutComeNotes?.issuesAndwarn) {
          allNotes = allNotes + this.callOutComeNotes?.issuesAndwarn
        }
        if (this.callOutComeNotes?.serviceLimitHits) {
          allNotes = allNotes + this.callOutComeNotes?.serviceLimitHits
        }
        if (this.callOutComeNotes?.device_Info) {
          allNotes = allNotes + this.callOutComeNotes?.device_Info;
        }
      }


      this.callOutComeData.notes = allNotes;
      this.checkNotesLimit(allNotes);
    } else {

      if (this.callOutComeNotes) {
        this.callOutComeNotes.device_Info = ""
        if (escalationEmail) {
          allNotes = allNotes + escalationEmail;

        }
        if (this.callOutComeNotes?.issuesAndwarn) {
          allNotes = allNotes + this.callOutComeNotes?.issuesAndwarn
        }
        if (this.callOutComeNotes?.serviceLimitHits) {
          allNotes = allNotes + this.callOutComeNotes?.serviceLimitHits
        }
      }

      this.callOutComeData.notes = allNotes
      this.checkNotesLimit(allNotes);
    }
  }
  kbpsTO(val, valueOnly?, unitOnly?) {
    let kbpsString = this.api.kbpsTO(val, valueOnly, unitOnly);
    return kbpsString;
  }
  checkValue(e, data, i, j) {
  }
  // Change call outcome type
  changeCallType(e) {
    this.callOutComeData.callType = e.target.value;
  }

  // Save call outcome status
  statusTypes: any = [];
  saveStatus(ngTest?) {

    let devices = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    let deviceInfo: any;
    let serialNumber: any = [];
    let modelName: any = [];
    let softwareVersion: any = [];

    let _serialNumber: any;
    let _modelName: any;
    let _softwareVersion: any;

    if (devices?.length > 0) {
      devices.forEach(element => {
        if (element?.serialNumber)
          serialNumber.push(element.serialNumber)
        if (element?.modelName)
          modelName.push(element.modelName)

        if (element?.softwareVersion)
          softwareVersion.push(element.softwareVersion)
      });
    }
    if (serialNumber?.length > 0) {
      _serialNumber = serialNumber.join(",");
    }
    else {
      _serialNumber = null;
    }

    if (modelName?.length > 0) {
      _modelName = modelName.join(",");
    }
    else {
      _modelName = null;
    }

    if (softwareVersion?.length > 0) {
      _softwareVersion = softwareVersion.join(",");

    }
    else {
      _softwareVersion = null;
    }
    let _data = this.callOutComeData;

    let categories = {};
    if (this.callOutComeData.selection == 'multiple') {
      this.callOutComeData.categories.forEach(element => {
        let arry = element.subCategories?.filter(x => x.isSelected);
        if (arry?.length > 0)
          categories[element.categoryName] = arry.map(x => x.sName);
      });
    }
    else {
      if (this.callOutComeData.categories?.length > 0) {
        categories[this.selectedSingleCategoryName] = []
      }
    }

    let subscriberId = sessionStorage.getItem('calix.subscriberId');

    let stTime = this.callOutComeService.callOutComeStartTime;
    let endTime = new Date().toISOString();

    let ctime = new Date().toISOString();

    var notes = this.callOutComeData.notes;


    if (notes?.length > 0) {
      if (!notes?.includes("\r\n")) {
        notes = notes.replace(/(?:\n\n\n|\n\n|\n)/g, '\r\n');
      }
    }
    //  notes = notes?.replace(/(?:\r\n|\r|\n)/g, '');
    notes = notes?.trim();



    // var statusTypes = this.statusTypes?.filter(x => x.name == this.selectedStatusName);
    // var statusType = "-";
    // if (statusTypes?.length > 0) {
    //   statusType = statusTypes[0].id;
    // }


    let data = {
      // orgId: this.sso.getOrg(this.orgId),
      csrId: this.sso.getUserId(),
      csrName: this.sso.getUsername(),
      categories: categories,
      callType: this.callOutComeData.callType,
      status: this.selectedStatusName,
      subscriberId: subscriberId,
      subscriberName: this.subscriberInfoResult?.name,
      callStartTime: stTime,
      callEndTime: endTime,
      subscriberAccount: this.subscriberInfoResult?.account,
      note: notes,
      deviceId: _serialNumber,//deviceInfo?.serialNumber ? deviceInfo.serialNumber : null,
      deviceType: _modelName,//deviceInfo?.modelName ? deviceInfo.modelName : null,
      firmwareVersion: _softwareVersion,//deviceInfo?.softwareVersion ? deviceInfo.softwareVersion : null
      extref: this.callOutComeTicketID,
      statusType: this.callOutComeData.statusType
    }
    this.callOutComeService.CallOutCome(data).subscribe(res => {
      localStorage.removeItem("callOutComeTicketID");
      sessionStorage.setItem('calloutcomeSubmitted', 'true');
      sessionStorage.removeItem('extUserCheckModuleWise');
      this.closeCalloutModal();
      this.CHTableData = [];
      if (!ngTest) this.commonService.trackPendoEvents('Subscriber', 'Call outcome saved');
    }, (err) => {
      this.closeCalloutModal();
      this.pageErrorHandle(err, 'callcoutcome');
    })
  }
  loadstatustypes() {
    this.callOutComeService.loadstatustypes().subscribe((res: any) => {
      this.statusTypes = [];
      if (res?.length > 0) {
        res.forEach(element => {
          var obj = {
            id: element?.statusTypeCode,
            name: element?.statusTypeName

          }
          this.statusTypes.push(obj)
        });
        //    this.statusTypes = res;
      }

    })
  }

  openPopUpModal(content, type = "") {
    let ngbOptions =
    {
      size: 'lg', centered: true,
      windowClass: 'custom-lg-modal'
    }
    this.modalService.open(content, ngbOptions).result.then((result) => {

    }, (reason) => {

    });
  }

  // Open call history modal pop up
  callHistoryOpenPopUpModal(content, type = "") {
    let ngbOptions =
    {
      size: 'lg', centered: true,
      windowClass: 'custom-lg-modal'
    }

    if (type == "callHistoryModel") {
      this.showAndHideTicketNumber();
    }

    //this.selectedAutomatedNotes = [];
    //this.selectedDevices = [];
    this.modalService.open(content, ngbOptions).result.then((result) => {
    }, (reason) => {
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  temparrayvalue = [];
  temparrayvalue2 = [];


  // Show and hide ticket number coloumn in table 
  showAndHideTicketNumber() {
    this.callHistoryDatatableVisible = true;
    this.getCallHistoryLogData()
  }

  headers: any = [];


  // Get call history log data and showing in table
  getCallHistoryLogData() {
    let subscriberId = sessionStorage.getItem('calix.subscriberId');
    let csrId = this.sso.getUserId();
    let orgId = this.sso.getOrg(this.orgId)
    const that = this;
    this.dtOptions1 = {
      ordering: false,
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: true },
      ],
      order: [0, 'asc'],
      ajax: (dataTablesParameters: any, callback) => {

        let page = dataTablesParameters.start / 10;
        let size = dataTablesParameters.length;

        this.modalLoader = true;
        this.callOutComeService.GetCallHistory(orgId, subscriberId, csrId, page, dataTablesParameters.length).subscribe((resp: any) => {              ////console.log(resp);
          this.modalLoader = false;
          this.callHistoryDatatableVisible = false;
          this.tempCHTableData = [];
          if (resp?.tickets?.length > 0) {

            resp?.tickets.sort((a, b) => {
              return <any>new Date(b.ctime) - <any>new Date(a.ctime);
            });
            let tickets: any = resp?.tickets;
            let arry = tickets?.filter(x => (x.extref != '' && x.extref != undefined && x.extref != null));
            if (arry?.length > 0) {
              this.showTicketIdNumber = true
            }
            else {
              this.showTicketIdNumber = false;
            }

            tickets.forEach(element => {
              let obj = {
                id: element.id,
                note: element.note
              }
              this.tempCHTableData.push(obj);

              element["showTicketIdNumber"] = this.showTicketIdNumber;
            });
            that.CHTableData = tickets;
            this.temparrayvalue2 = resp?.tickets;
            var checked = resp?.tickets;
          }
          else {
            that.CHTableData = []
          }
          this.temparrayvalue.push(checked);
          that.hideNoDataRow();
          callback({
            recordsTotal: (resp?.totalTickets > 0) ? resp?.totalTickets : 0,
            recordsFiltered: (resp?.totalTickets > 0) ? resp?.totalTickets : 0,
            data: []
          });
          //}, 100);
        },
          (err: HttpErrorResponse) => {
            this.modalLoader = false;
            if (err.status == 404) {
              that.CHTableData = [];
              that.hideNoDataRow();
              setTimeout(() => {
                callback({
                  recordsTotal: (that.chCount != undefined) ? that.chCount : 0,
                  recordsFiltered: (that.chCount != undefined) ? that.chCount : that.chCount,
                  data: []
                });
              }, 100);
            } else {
              this.pageErrorHandle(err);
            }
          });
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
        }
        if (!this.showTicketIdNumber) {
          $(".clsTicketNumber").css("display", "none")

        }
        else {
          $(".clsTicketNumber").css("display", "revert")

        }
      }
    };
    // this.tableLanguageOptions();
  }

  // Closing call outcome modal popup
  closeCalloutModal() {
    this.getCallOutComeData('close');
    this.callOutComeData.callType = "Inbound";
    this.callOutComeNotes = {};
    this.notesLength = 0;
    this.callOutComeData.notes = "";
    this.disablecCallOutComeSavebutton = false;
    this.selectedAutomatedNotes = [];
    this.selectedDevices = [];
    this.callOutComeService.escalationEmail = "";
    this.modalService.dismissAll();
    this.loader = false;
  }

  closeModal(err = '') {

    this.modalService.dismissAll();
    this.loader = false;
    this.isModalError = false;
    /*if (!err) {
      this.isError = false
    }*/

  }

  tempDataTable(tickets) {
    this.tempCHTableData = tickets;

  }
  // Formating the date in table
  callHistoryDateFormate(date, isCtime): string {
    let dt = new Date(date);
    let d = "";
    if (date != null && isCtime) {
      d = moment(dt).format('ll') + ' ' + moment(dt).format('H:mm')
    }
    return d;
  }
  notesLength: number = 0
  // Notes limit upto 4000
  checkNotesLimit(notes, id = null) {
    this.notesLength = 0;
    if (notes) {
      // this.callOutComeNotes.notes = notes;
      notes = notes?.replace(/(?:\r\n|\r|\n)/g, '');
      //  notes = notes?.trim();
      this.notesLength = notes?.length;
      if (notes?.length > 3500) {
        this.disablecCallOutComeSavebutton = true;
      }
      else {
        this.disablecCallOutComeSavebutton = false;
      }
    }

  }

  // Update status notes for call history
  UpdateNotes(ticket, poopOverContent, index) {
    let data = {
      ticketId: ticket.id,
      description: ticket.note
    };
    this.callOutComeService.UpdateNotes(data).subscribe(resp => {
      this.tempCHTableData[index].note = resp.description;
      poopOverContent.close();

    }, (err) => {
      poopOverContent.close();

      this.pageModelErrorHandle(err);

    })


  }

  // Open call history notes popover when click on edit icon in table
  openPopOver(item, popOver, i) {
    this.callOutComeService.GetNotes(item.id).subscribe((res: any) => {
      this.disablecCallOutComeSavebutton = false;
      this.CHTableData[i].note = res.description;
      if (this.scopeFlag.subscriberCORead && this.scopeFlag.subscriberCOWrite) {
        this.isNotesReadAndWrite = false;
      }
      else {
        this.isNotesReadAndWrite = true;
      }
      popOver.open();
    }, (err) => {
      popOver.close();

      this.pageModelErrorHandle(err);

    })


  }
  pageModelErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.modalWarningMessage = this.language['Access Denied'];
    } else {
      this.modalWarningMessage = this.sso.pageErrorHandle(err);
    }
    this.isModalError = true;

  }
  // Changing language for table (paging options)
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }
  showPrimaryEmail(mail) {
    if (mail) {
      return mail + ` (${this.language['Primary']})`;
    } else {
      return '-';
    }
  }

  overviewClick() {
    sessionStorage.setItem('stopOverviewActions', this.router.url.includes('support/overview/issues').toString());
  }

  getEntitlemnt(ind) {
    return this.sso.getEntitlementsArr().includes(ind);
  }

  isAppTabAvailable() {
    const ent = this.sso.getEntitlementsArr();
    // let hasSmb = 0;
    let hasSmb = this.sso.isSmbEnabled() ? 1 : 0;
    const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
    const scopes = this.sso.getScopes();
    // for (let i = 0; i <= 15; i++) {
    //   if (this.service.getStoredSubscriberInfo()) {
    //     hasSmb = this.sso.isSmbEnabled() ? 1 : 0;
    //     break;
    //   } else this.sso.sleep(1000);
    // }
    const subOrDevicePresent = (sessionStorage.getItem('calix.subscriberId')
      && sessionStorage.getItem('calix.subscriberId') != 'undefined')
      || (this.sso.getDeviceData() || [])?.some(obj => obj.modelName);

    return ((this.containsGS?.length
      && ((ent.includes('203') && scopes["cloud.rbac.csc.apps.protectiq.configuration"])
        || (ent.includes('204') && scopes["cloud.rbac.csc.apps.experienceiq.configuration"])
        || (ent.includes('205') && ((scopes["cloud.rbac.csc.apps.protectiq.configuration"] || scopes["cloud.rbac.csc.apps.experienceiq.configuration"])))
        || (ent.includes('218') && this.sso.isSmbEnabled() && (scopes["cloud.rbac.csc.apps.protectiq.configuration"] || scopes["cloud.rbac.csc.apps.experienceiq.configuration"]))))
      || (subOrDevicePresent           //To check atleast device has subscriber or valid device
        && ((this.tabInfo?.isArlo && ent.includes('206') && scopes['cloud.rbac.csc.apps.arlo']) // && this.rgData?.length
          || (this.tabInfo?.isServify && (ent.includes('207') || ent.includes('215') || ent.includes('216') || ent.includes('217')) && scopes['cloud.rbac.csc.apps.servify'])
          || (this.tabInfo?.isBark && (ent.includes('219') || ent.includes('220')) && scopes['cloud.rbac.csc.apps.bark'])
          || (this.tabInfo?.isMyComm && (ent.includes('214') || ent.includes('222') || ent.includes('223')) && scopes['cloud.rbac.csc.apps.mycommunityiq'])
          || ((subInfo?.devices || []).filter(obj => obj.bSmbMode).length && subInfo?.isSmbOnboarded && ent.includes('218') && this.tabInfo?.isCaptive))
      ))
      && this.sso.getCscType() !== 'DME'
  }
  // && this.scopeFlag.appsRead
  // && (scopes["cloud.rbac.csc.apps.protectiq.configuration"] || scopes["cloud.rbac.csc.apps.experienceiq.configuration"]))
  // Get service limit hits for call outcome notes
  subsUsage: any;
  serviceLimitDataAssign: any
  getServiceLimitHits() {
    let endPointId = sessionStorage.getItem(`calix.endpointId`);
    this.subsUsage = this.marketingInsightApplicationApiService.ServiceLimit(endPointId).subscribe((res: any) => {
      this.serviceLimitDataAssign = this.marketingExploreDataAssignerService.serviceLimitDataAssign(res.lens);
      //this.modalLoader = false;
    },
      (error: any) => {
        this.modalLoader = false;
        this.pageModelErrorHandle(error);
      });

  }
  deviceList: any = [];
  allDeviceList: any = [];
  // Get all devices for call outcome notes
  getAllDevicesForCallOutCome() {
    const device = JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`))?.filter(obj => obj.opMode == "RG" && obj._id);

    if (device?.length > 0) {
      var serialNumber = device[0].serialNumber;
      this.deviceList = [];
      this.allDeviceList = [];

      this.deviceService.getdevices(serialNumber, this.orgId)
        .subscribe((data: any) => {
          // this.allDeviceList = data?.filter(x => x.Status == "online");
          //var allDeviceList=[];

          data?.forEach((element, index) => {
            if (element?.Status == "online") {
              //  var obj = { Id: index, name: element?.HostName };
              var obj = {
                Id: index, name: element?.HostName, IPAddress: element?.IPAddress, MACAddress: element?.MACAddress
              };
              this.deviceList.push(obj);
              this.allDeviceList.push(element)
            }

          });

        })
    }
  }
  openModalEditCommandIq(modal) {
    this.modalService.open(modal, {
      beforeDismiss: () => {
        this.closePopupedit()
        return true
      },
      centered: true,
      windowClass: 'alert-warning-modal',
    });
  }
  showSeconadryEmailField: boolean = true
  openEditCiqEmailsModal(modal) {
    this.modalService.open(modal, {
      beforeDismiss: () => {
        this.closePopupedit()
        return true
      },
      centered: true,
      windowClass: 'edit-ciq-modal',
    });
    if (this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email) {
      this.showSeconadryEmailField = true
    } else {
      this.showSeconadryEmailField = false
    }
  }
  openWarnModalSave(modal) {
    this.modalService.open(modal, {
      centered: true,
      windowClass: 'edit-warning-modal',
    });
  }
  commandIQEdit: boolean = true;
  subscribercommandIQemail: any
  subscribercommandIQInviteEmail: any;
  commandIQInvite: boolean = true;
  emailCheckBox(event) {
    // this.commandIQEdit = !event?.target?.checked;
    if (this.subscribercommandIQemail) {
      this.commandIQEdit = false
    } else {
      this.commandIQEdit = true
    }


    if (this.subscribercommandIQInviteEmail) {
      this.commandIQInvite = false
    }
    else {
      this.commandIQInvite = true
    }

  }
  closeAllModal() {
    this.modalService.dismissAll();
  }
  successEmail = false;
  successInfo: string = '';
  updateCommandIQEmails() {
    let userId = localStorage.getItem('ciquserid')
    let subscriberId = this.subscriberInfoResult?._id
    this.sso.getUserId()
    // localStorage.setItem('ciquserid', res?.commandIQ?.userId)
    const a = [];
    if (this.NewEmail !== this.subscriberInfoResult?.commandIQ.email) {
      const obj = {
        "userId": this.subscriberInfoResult?.commandIQ?.userId,
        "email": this.subscriberInfoResult?.commandIQ.email,
        "newEmail": this.NewEmail
      }
      this.UpdateCommandIqEmailSubscribe = this.callOutComeService.updateCommandIQEmails(obj).subscribe((res: any) => {
        this.updateCommandWorxEmails()
        setTimeout(() => {
          this.successEmail = false;
        }, 3000);
        this.successEmail = true;
        this.isError = false;
        this.successInfo = "Updated CommandIqPrimaryEmail succesfully";
        this.closeAllModal();
      }, (error: any) => {
        this.isError = true;
        this.updateCommandWorxEmails()
        this.alertMessage = error.error.errorDesc
        this.pageModelErrorHandle(error);
        this.closeAllModal();
      })
    }
    if (this.NewSecondaryEmail !== this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email) {
      const obj2 = {
        "userId": this.subscriberInfoResult?.commandIQ?.userId,
        "email": this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email,
        "newEmail": this.NewSecondaryEmail
      }
      this.UpdateCommandIqEmailSubscribe = this.callOutComeService.updateCommandIQEmails(obj2).subscribe((res: any) => {
        this.updateCommandWorxEmails()
        setTimeout(() => {
          this.successEmail = false;
        }, 3000);
        this.successEmail = true;
        this.isError = false;
        this.successInfo = "Updated CommandIqSeconadryEmail succesfully";
        this.closeAllModal();
      }, (error: any) => {
        this.isError = true;
        this.updateCommandWorxEmails()
        this.alertMessage = error.error.errorDesc
        this.pageModelErrorHandle(error);

        this.closeAllModal();
      })
    }
  }
  deleteCommandIQPrimaryEmail() {
    let subscriberId = this.subscriberInfoResult?._id
    this.loader = true;
    this.DeleteCommandIqEmailSubscribe = this.callOutComeService.deleteCommandIQEmails(localStorage.getItem('ciquserid'), true).subscribe((res: any) => {
      if (res) {
        this.updateCommandWorxEmails()
        this.loader = false;
        setTimeout(() => {
          this.successEmail = false;
        }, 3000);
        this.successEmail = true;
        this.successInfo = `Deleted ${this.bSmbMode ? 'CommandWorx ' : 'CommandIQ'} Email succesfully`
        this.closeAllModal();
      }
    }, (error: any) => {
      this.isError = true;
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
  }
  deleteCommandIQSecondaryEmail() {
    let subscriberId = this.subscriberInfoResult?._id
    this.loader = true;
    this.DeleteCommandIqEmailSubscribe = this.callOutComeService.deleteCommandIQEmails(localStorage.getItem('ciquserid'), false).subscribe((res: any) => {
      if (res) {
        this.updateCommandWorxEmails()
        this.loader = false;
        setTimeout(() => {
          this.successEmail = false;
        }, 3000);
        this.successEmail = true;
        this.successInfo = `Deleted ${this.bSmbMode ? 'CommandWorx ' : 'CommandIQ'} Email succesfully`
        this.closeAllModal();
      }
    }, (error: any) => {
      this.isError = true;
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
  }

  accesspopupedit() {
    if (!this.NewEmail) {
      this.accesspopupprimarydelete()
    }
    if (!this.NewSecondaryEmail && this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email) {
      this.accesspopupSecondarydelete()
    }
    let descriptionFree
    if (this.NewEmail && this.NewEmail !== this.subscriberInfoResult?.commandIQ.email) {
      descriptionFree = " Onboarded Email Address from " + this.subscriberInfoResult?.commandIQ.email + "  " + "To" + "  " + this.NewEmail
      const request = {
        "accessType": this.secureAccessRole,
        "accountId": this.subscriberInfoResult.subscriberLocationId,
        "accountName": this.subscriberInfoResult.name,
        "action": "Onboarded Email Address Edit",
        "actionTimestamp": this.dateUtils.currentDateToUTC(),
        "deviceId": this.rgdeviceid,
        "deviceType": this.rgmodelname,
        "objectType": "CommandIQ Email",
        // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
        "originator": this.loginData.username,
        "description": descriptionFree
      };
      this.loader = true
      this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
        if (res) {
          this.updateCommandIQPrimaryEmails()
          this.loader = false
        }
      }, (error: any) => {
        this.isError = true;
        this.pageModelErrorHandle(error);
        this.closeAllModal();
      })
    }
    if (this.NewSecondaryEmail && this.NewSecondaryEmail !== this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email) {
      descriptionFree = " Onboarded Email Address from " + this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email + "  " + "To" + "  " + this.NewSecondaryEmail
      const request = {
        "accessType": this.secureAccessRole,
        "accountId": this.subscriberInfoResult.subscriberLocationId,
        "accountName": this.subscriberInfoResult.name,
        "action": "Onboarded Email Address Edit",
        "actionTimestamp": this.dateUtils.currentDateToUTC(),
        "deviceId": this.rgdeviceid,
        "deviceType": this.rgmodelname,
        "objectType": "CommandIQ Email",
        // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
        "originator": this.loginData.username,
        "description": descriptionFree
      };
      this.loader = true
      this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
        if (res) {
          this.updateCommandIQSeconadryEmails()
          this.loader = false
        }
      }, (error: any) => {
        this.isError = true;
        this.pageModelErrorHandle(error);
        this.closeAllModal();
      })
    }

    this.subscribercommandIQemail = false;
  }
  accesspopupprimarydelete() {
    const request = {
      "accessType": this.secureAccessRole,
      "accountId": this.subscriberInfoResult.subscriberLocationId,
      "accountName": this.subscriberInfoResult.name,
      "action": "Onboarded Email Address Delete",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": this.rgdeviceid,
      "deviceType": this.rgmodelname,
      "objectType": "CommandIQ Email",
      // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
      "originator": this.loginData.username,
      "description": "Onboarded Email Address deleted"
    };
    this.loader = true
    this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
      if (res) {
        this.deleteCommandIQPrimaryEmail()
        this.loader = false
      }
    }, error => {
      this.isError = true;
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
    this.subscribercommandIQemail = false;
    this.commandIQEdit = true
  }
  accesspopupSecondarydelete() {
    const request = {
      "accessType": this.secureAccessRole,
      "accountId": this.subscriberInfoResult.subscriberLocationId,
      "accountName": this.subscriberInfoResult.name,
      "action": "Onboarded Email Address Delete",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": this.rgdeviceid,
      "deviceType": this.rgmodelname,
      "objectType": "CommandIQ Email",
      // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
      "originator": this.loginData.username,
      "description": "Onboarded Email Address deleted"
    };
    this.loader = true
    this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
      if (res) {
        this.deleteCommandIQSecondaryEmail()
        this.loader = false
      }
    }, error => {
      this.isError = true;
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
    this.subscribercommandIQemail = false;
    this.commandIQEdit = true
  }
  validatingPrimaryEmail: boolean = true;
  validatingSecondaryEmail: boolean = true;
  ValidateEmail(input) {
    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
    if (input.target.value.match(validRegex)) {
      this.validatingPrimaryEmail = true
      return true;
    } else {
      this.validatingPrimaryEmail = false
      return false;
    }
  }
  ValidateSecondaryEmail(input) {
    var validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
    if (input.target.value.match(validRegex)) {
      this.validatingSecondaryEmail = true
      return true;
    } else {
      this.validatingSecondaryEmail = false
      return false;
    }
  }
  closePopupedit() {
    this.NewEmail = this.subscriberInfoResult.commandIQ.email
    this.validatingPrimaryEmail = true
    this.validatingSecondaryEmail = true
    this.subscribercommandIQemail = false;
    this.commandIQEdit = true
    this.NewEmail = this.subscriberInfoResult?.commandIQ?.email?.slice();
    this.NewSecondaryEmail = this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email?.slice();
  }
  isEmailChange() {
    const isSecondaryEmail = this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email?.slice();
    if (!this.NewEmail || (isSecondaryEmail && !this.NewSecondaryEmail)) {
      return true
    }
    if (this.NewEmail !== this.subscriberInfoResult?.commandIQ.email) {
      return true;
    }
    if (this.NewSecondaryEmail && this.NewSecondaryEmail !== this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email) {
      return true;
    }
    return false;
  }
  updateCommandWorxEmails() {
    let subscriberId = this.subscriberInfoResult?._id
    this.service.getSubscriberInfoEmailUpadte(this.orgId, subscriberId)
      .then((res: any) => {
        this.subscriberInfoResult = res;
        sessionStorage.setItem('calix.subscriberInfo', JSON.stringify(this.subscriberInfoResult));
        this.sso.currentSubscriberInfo.next(this.subscriberInfoResult);
        this.NewEmail = this.subscriberInfoResult?.commandIQ?.email?.slice();
        this.NewSecondaryEmail = this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email?.slice();
      })
  }
  updateCommandIQPrimaryEmails() {
    let subscriberId = this.subscriberInfoResult?._id
    const a = [];
    const obj = {
      "userId": this.subscriberInfoResult?.commandIQ?.userId,
      "email": this.subscriberInfoResult?.commandIQ.email,
      "newEmail": this.NewEmail
    }
    this.UpdateCommandIqEmailSubscribe = this.callOutComeService.updateCommandIQEmails(obj).subscribe((res: any) => {
      this.updateCommandWorxEmails()
      setTimeout(() => {
        this.successEmail = false;
      }, 5000);
      this.successEmail = true;
      this.successInfo = `Updated ${this.bSmbMode ? 'CommandWorx ' : 'CommandIQ '} Email succesfully`;
      this.closeAllModal();
    }, (error: any) => {
      this.isError = true;
      this.updateCommandWorxEmails()
      this.alertMessage = error.error.errorDesc
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
  }
  updateCommandIQSeconadryEmails() {
    let subscriberId = this.subscriberInfoResult?._id
    const obj2 = {
      "userId": this.subscriberInfoResult?.commandIQ?.userId,
      "email": this.subscriberInfoResult?.commandIQ?.secondaryUsers?.[0]?.email,
      "newEmail": this.NewSecondaryEmail
    }
    this.UpdateCommandIqEmailSubscribe = this.callOutComeService.updateCommandIQEmails(obj2).subscribe((res: any) => {
      this.updateCommandWorxEmails()
      setTimeout(() => {
        this.successEmail = false;
      }, 5000);
      this.successEmail = true;
      this.successInfo = `Updated ${this.bSmbMode ? 'CommandWorx ' : 'CommandIQ'} Email succesfully`;
      this.closeAllModal();
    }, (error: any) => {
      this.isError = true;
      this.updateCommandWorxEmails()
      this.alertMessage = error.error.errorDesc
      this.pageModelErrorHandle(error);
      this.closeAllModal();
    })
  }


  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  toggleExtUserCreateWarning() {
    document.getElementById('extUserCreateWarning').classList.add('d-none');
  }
  outageRespone: any = []
  subscriberImpactedOutage() {
    let subscriberId = sessionStorage.getItem('calix.subscriberId');
    if (subscriberId && subscriberId != "undefined") {
      this.UpdateCommandIqEmailSubscribe = this.callOutComeService.subscriberImpactedOutages(subscriberId).subscribe((res: any) => {
        this.outageRespone = res;
        if (res?.outage == true) {
          this.isoutageError = true;
          localStorage.setItem('OutageError', res?.outage);
          // this.alertMessage = this.language["This subscriber is experiencing an internet outage"]
        }
      }, (error: any) => {
        this.isError = true;
        // this.alertMessage = error.error.errorDesc
        this.pageErrorHandle(error);
        // if (error.status == 500) {
        //   this.alertMessage = error.error.message
        // } else if (error.status === 504 || error.status == 502) {
        //   this.alertMessage = 'Gateway Time-Out';
        // }
      })
    }
  }
  isoutageErrorShowing() {
    this.isoutageError = false;
    // localStorage.removeItem('OutageError');
  }

  ValidateEmail1(input) {
    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validRegex = /^[a-zA-Z0-9][a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
    if (input.target.value.match(validRegex)) {
      this.commandIqInviteEmailFormat = true
      this.commandIqInviteEmail = input.target.value
      return true;
    } else {
      this.commandIqInviteEmailFormat = false
      return false;
    }
  }

  openmodalLog(modal) {
    this.subscribercommandIQInviteEmail = false;
    this.commandIQInvite = true;
    this.modalService.open(modal, { centered: true, backdrop: 'static', windowClass: 'AuditLog' });
  }


  openmodal(modal) {
    this.modalService.open(modal, { centered: true, backdrop: 'static', windowClass: 'CommandIQ' });
    this.updateEmailButton = true;
    this.commandIqInviteEmail = this.subscriberInfoResult?.commandIQ?.email;
    if (this.commandIqInviteEmail) {
      this.showInputEmail = true
    }
    this.notUpdated = true;
    this.commandIqInviteEmailFormat = true
  }
  updateEmail() {
    this.notUpdated = false;
    this.updateEmailButton = false;
    this.showInputEmail = false;
    this.commandIqInviteEmail = ""
  }

  successEmailSent = false;
  sendInvite() {
    let descriptionFree
    if (this.NewEmail && this.commandIqInviteEmail !== "") {
      descriptionFree = " CommandIQ Invite email from " + this.subscriberInfoResult?.commandIQ.email + "  " + "To" + "  " + this.commandIqInviteEmail
      const request = {
        "accessType": this.secureAccessRole,
        "accountId": this.subscriberInfoResult.subscriberLocationId,
        "accountName": this.subscriberInfoResult.name,
        "action": "Send CommandIQ Invite Email",
        "actionTimestamp": this.dateUtils.currentDateToUTC(),
        "deviceId": this.rgdeviceid,
        "deviceType": this.rgmodelname,
        "objectType": "CommandIQ Invite Email",
        // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
        "originator": this.loginData.username,
        "description": descriptionFree
      };
      this.loader = true
      this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
        if (res) {
          this.loader = false
        }
      }, (error: any) => {
        this.isError = true;
        this.pageModelErrorHandle(error);
        this.closeAllModal();
      })
    }

    if (this.commandIqInviteEmail == "" || this.commandIqInviteEmail == undefined) {
      this.commandIqInviteEmailFormat = false;
      return;
    }
    var rqstBody = {
      "email": `${this.commandIqInviteEmail}`,
      // "sms": `${this.subscriberInfoResult?.phone ? this.subscriberInfoResult?.phone : ''}`,
      "subscriber_name": `${this.subscriberInfoResult?.name ? this.subscriberInfoResult?.name : ''}`,
      "notification_message": "send_cmdiq_app_link"
    }
    if (this.commandIqInviteEmailFormat) {
      this.callOutComeService.commaqndIqInviteEmail(rqstBody).subscribe((res: any) => {
        this.successEmailSent = true;
      }, (error: any) => {
        this.isError = true;
        // this.alertMessage = error.error.errorDesc
        this.pageErrorHandle(error);
      })

      this.subscribercommandIQInviteEmail = false;
      if (this.commandIqInviteEmailFormat) this.closeModal();
    }
  }

  cancelInvite() {
    this.closeModal();
  }

  closeSuccessMsg() {
    this.successEmailSent = false;
  }



  isSwapedDevice: boolean = false;
  swapInProgressData: any = {};
  swapInProgress() {
    let deviceid = this.rgdeviceid;
    this.swapInProgressData = {};

    if (deviceid?.trim()) {
      this.routerService.swapInProgress(deviceid).subscribe(res => {
        this.isSwapedDevice = true;
        this.swapInProgressData = res;
        // this.swapInProgressData = {
        //   "replacingBy": "CXNK12345678"
        // }
        this.hideAndShowDevicesOnTile();

      }, (error: any) => {
        this.isSwapedDevice = false;
        if (error) {
          if (error?.error?.errorCode == 404) {
            this.isSwapedDevice = false;
          }
        }
        //  this.isError = true;
        //  this.pageErrorHandle(error);
      })
    }
  }
  hideAndShowDevicesOnTile() {
    setTimeout(() => {
      $(".deviceSerials i").hover(function () {
        $(".deviceSerials .info-tooltip").addClass("addStyle");
      }, function () {
        $(".deviceSerials .info-tooltip").removeClass("addStyle");
      });
    }, 500);
  }
  getUpdatedSubInfo() {
    const params = new HttpParams()
      .set("filter", (this.subId ? (`subscriberid:${this.subId}`) : ""))
      .set("pageNumber", '1')
      .set("pageSize", '1')
    if (this.sso.getOrg(this.orgId)) {
      params.set("orgId", this.sso.getOrgId())
    }
    this.loader = true;
    this.service.cscSearch(params).subscribe(
      (res: any) => {
        this.loader = false;
        if (res?.metadata?.totalHits == 1) {
          let deviceSet = res?.metadata?.totalHits ? res?.records[0]?.devices : []
          const RGDevices = deviceSet.filter(device => device.opMode == "RG");
          if (RGDevices.length > 1) {
            deviceSet = [
              RGDevices[0],
              ...deviceSet.filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
            ];
          }
          const devices = (deviceSet.length && Array.isArray(deviceSet[0])) ? deviceSet[0] : deviceSet;
          sessionStorage.setItem(`calix.subscriberId`, this.subId);
          sessionStorage.setItem(`calix.deviceData`, JSON.stringify(devices));
          this.service.setSubscriberInfo(undefined);
          this.service.multipleRegInstance = undefined;
          this.service.setSubscriberTabInfoData(undefined);
          this.service.removeDataSaver();
          this.sso.setSubscriberEndpointId('');
          this.sso.setTrafficReportChartSubscriberInfo('');
          location.reload();
          //this.ngOnInit();
          //if (this.router.url.includes('overview')) (<HTMLElement>document.querySelector('.sub-refresh-icon .fa-refresh')).click();
          //this.subscriberRefresh.emit(true);
        }
      }, err => {
        this.loader = false;
        this.pageErrorHandle(err);
      })
  }
}
