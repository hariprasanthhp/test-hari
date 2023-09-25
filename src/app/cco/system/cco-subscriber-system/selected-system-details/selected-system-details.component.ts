import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service'
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { truncate } from 'fs';
import { DataServiceService } from 'src/app/support/data.service';
import { AddSubscriberService } from '../add-service-system/add-subscriber.service';
import { SupportRouterService } from './../../../../support/support-system/support-router/services/support-router.service'
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { HealthService } from 'src/app/cco/health/service/health.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { MyCommunityService } from 'src/app/support/support-application/shared/service/my-community.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
@Component({
  selector: 'app-selected-system-details',
  templateUrl: './selected-system-details.component.html',
  styleUrls: ['./selected-system-details.component.scss'],
})
export class SelectedSystemDetailsComponent implements OnInit, OnDestroy {
  language: any = {};
  languageSubject;
  id: any;
  lowToDate;
  ORG_ID: any;
  tableData: any;
  systemId: any;
  rgService: any;
  edgeSuites: any;
  subscriber: any;
  systemData: any[];
  protectIQ: any;
  sN: any;
  oltid: any;
  iftypearr = [];
  fsan: any;
  account: any;
  email: any;
  name: any;
  phone: any;
  serviceAddress: any;
  subscriberLocationId: any;
  subId: any;
  loading: boolean;
  systemInfo: { sn: any; subscriberId: any; regId: any; from: string };
  data: any;
  voice: any;
  video: any;
  experienceIQ: any;
  arloSmart: any;
  servifyCare: any;
  proIq: string;
  expIq: string;
  k2Cameras: any;
  k4Cameras: any;
  tier: any;
  dEnable = 'Disabled';
  dPbit: any;
  dVLanId: any;
  pppoeUN: any;
  pppoePW: any;
  vEnable = 'Disabled';
  vPbit: any;
  vBwProfile: any;
  vVLanId: any;
  viEnable = 'Disabled';
  hasWrite: boolean;
  viFaxT38: any;
  viDialPlan: any;
  viServiceType: any;
  sEnable: any;
  arEnable: any;
  allListSubs: any;
  syetemsAllData: any;
  errorInfo: any;
  error: boolean;
  success: boolean;
  successInfo: any;
  status: any;
  queryParams: { sn: any; subscriber: any; };
  downstramoctet: any;
  upstreamoctet: any;
  xmldatafromservice
  editParams: any[];
  modelName: any;
  radioData: any;
  radioEnable2Hz = '';
  radioEnable5Hz = '';
  modelData: any;
  macAddress: any;
  dialplan: any;
  videodialplan: any;
  system: any;
  ipAddress: any;
  ipV6SitePrefix: any;
  combineLatest: any;
  parallelReqSubscribtion: any;
  getlistdata: any;
  latestParams: string;
  registrationId: any;
  serialNumber: any;
  opMode: any;
  editdisable: boolean = true;
  hideserviceinfo: boolean = true;
  device: any;
  deviceData: any = {};
  provisionData: any = {};
  multipleRegId: any;
  multipleRegInstance: Object;
  regID: any;
  opModedisplay: any;
  metaDataLoader: boolean;
  metaData: any;
  showRadioSummary: boolean = true;
  deviceDataGETLoading: boolean;
  servicesListSubs: any;
  servicesListData: any;
  dataServiceLabel: any;
  voiceServiceLabel: any;
  videoServiceLabel: any;
  serviceListLoader: boolean = false;
  preprovisionsub: any;
  getregidSub: any;
  deviceInfoSub: any;
  getmetaDataSub: any;
  systemInformation: { sn: any; subscriber: any; regId: any; from: string; };
  hidesubonly: boolean;
  userId: any;
  ArloData: any;
  twoKPlanData: any[];
  fourKPlanData: any[];
  onboard2kcamera: string;
  onboard4kcamera: string;
  arloLoading: boolean = false;
  arloSmartListSubs: any;
  getlistloder: boolean = false;
  servifyDisable: boolean;
  iqsuitEnable: boolean = true;
  CommandIqLoader: boolean;
  CommandIqSubs: any;
  CommandIqData: any;
  commandIQEmail: any;
  onboardCommend: any;
  commandIQstatus: string;
  arloEmail: any;
  systemDetails: any;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  dataservice: any;
  videoservice: any;
  VoiceService: any;
  servicesData: { data: any; data1: any; video: any; voice: any; };
  devices: any;
  dataser: any;
  dataEnable: any;
  usoc: any;
  ceVlan: any;
  interface: any;
  untagged: any;
  videoser: any;
  videoEnable: any;
  ceVlanvideo: any;
  interfacevideo: any;
  multicastProfile: any;
  usocVideo: any;
  voiceser: any;
  usocVoice: any;
  voiceServiceType: any;
  voiceEnable: any;
  servicesFormData: any = {};
  systemInfoFormData: any;
  systemInfoChecked: any;
  deviceinfo: any;
  last24hours: boolean = false;
  provisionInfo: unknown[];
  deviceDatas: { [s: string]: unknown; } | ArrayLike<unknown>;
  serviceinfo: any;
  systeminfo: unknown[];
  deviceloading: boolean;
  subInfo: any = {};
  systemdata: { sn: any; subscriberId: any; regId: any; from: string; };
  systemdatas: { sn: string; subscriberId: any; };
  systemonlyEnable: boolean;
  BwProfile: any;
  softwareVersion: any;
  fccSubscriberId: any;
  hubbLocationId: any;
  vicVlan: any;
  vcVlan: any;
  cVlan: any;
  deviceInfo: any;
  serviceData: any[];
  rgdevice: any;
  wapdevice: any;
  arloEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  systemStatus: any;
  sVlan: any;
  vsVlan: any;
  visVlan: any;
  serviceStatusLoading: boolean;
  servicesStatus: any = {};
  dataServicesStatus: any = {};
  videoServicesStatus: any = {};
  voiceServicesStatus: any = {};
  allSubsServicesStatusSubs: any;
  serviceSystem: any;
  systemload: boolean;
  deviceloader: boolean;
  provisionInfosub: any;
  getstatussub: any;
  getAllProfileSubscribe: any;
  Brandwidthitems: any[];
  banwidthdata: any;
  banwidthvideo: any;
  dialplansub: any;
  DialPlanitems: any;
  bandwidth: any;
  systemFsan: any;
  deviceInformation: any;
  serialNum: any;
  dataser1: any;
  dataEnable1: any;
  usoc1: any;
  ceVlan1: any;
  interface1: any;
  untagged1: any;
  cVlan1: any;
  sVlan1: any;
  dataServicesStatus1: any;
  ontsysInfo: any;
  opModeont: any;
  dataservice1: any;
  dataService: any;
  dataservices1: any;
  untaggedvideo: any;
  allowAddSystems: boolean = true;
  bandwidthL2: any = [];
  l2bandwidth: any = {};
  fsanMac: any;
  l2stream: any;
  upsteamLoader: boolean;
  setTime: boolean;
  radioEnable6Hz: any;
  availabilitySubs: any;
  availability: any;
  statusont: any;
  Modelitems: any[];
  deviceModels: string[];
  planCode: string;
  servifyemail: any;
  ServifyEnableentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  RGstatus: any;
  connected: any;
  videoServicesStatus1: any = {};
  voiceServicesStatus1: any = {};
  cpeTypeVoice: any;
  cpeTypeVideo: any;
  cpeTypeData: any;
  memberPorts: any;
  connection: any;
  upTime: any;
  info: any;
  lowFromDate;
  dataStatus: any;
  dataDetails: string;
  dataStatus1: string;
  dataDetails1: string;
  datasvcStatus: any;
  dataErrorDetails: string;
  provisionDatasub: any;
  lastInformTime: any;
  macAddressWAP: any;
  modelNameWAP: any;
  lastInformTimeWAP: any;
  connectionWAP: string;
  upTimeWAP: string;
  connectionLoader: boolean;
  RGLoader: boolean;
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  bark: any;
  BarkPlan: string;
  BarkEmail: any;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  dev: boolean;
  // geoMapIssue = 'false';
  smallBizIQentitlement: boolean;
  SmallBizIQ: string;
  smallBiz: any;
  ontRxPower: any;
  oltRxPower: any;
  timeseries: any;
  timestamp: any[];
  isontconfigured: boolean;
  redoServicesub: any;
  params: any;
  exosModel = "";
  index: any;
  indexRefresh: any;
  WAPLoader: boolean;
  myCommunityIqEntitlement: boolean;
  communityIq: any;
  mycommunityIq: any;
  RGHotspot: string;
  network: any;
  rgStatus: any;
  vlanId: any;
  indexRef: any;
  Eduroam: any;
  subscriberImpacted: boolean;
  NotSupported: boolean = false;
  dataObj: any = {};
  subscribedStatus: boolean;
  ClaimEligible: boolean;
  subscriptionEndDt: string;
  PlanPurchasedDt: Date;
  videoStatus: string;
  videoDetails: string;
  videoStatus1: string;
  videoDetails1: string;
  videosvcStatus: string;
  videoErrorDetails: string;
  voiceStatus: string;
  voiceDetails: string;
  voiceDetails1: string;
  voiceStatus1: string;
  voiceErrorDetails: string;
  voicesvcStatus: string;
  combineLat: any;
  parallelReqSub: any;
  Dataplan: any[];
  DataPlanitem: any[];
  VideoPlan: any;
  VideoPlanitem: any[];
  VoicePlanitem: any[];
  VoicePlandata: any;
  dataplan: any;
  getVlanModeSub: any;
  HideCvlan: boolean;
  voiceplan: any;
  HidecVlanVoice: boolean;
  interfaceVoice: any;
  allowEdgeAPI: boolean = true;
  bSmbMode: boolean = false;
  getAllDialPlanSubscribe: any;
  dialPlanList: any[];
  serialNo: any;
  GeomapInfosub: any;
  GeomapInfo: any;
  latitude: any;
  longtitude: any;
  isAutomaticallyCreatedVideo: any;
  voiceDescription: any;
  videoDescription: any;
  dataDescription: any;
  ontSerialnumber: any;
  IpAddressNewOnt: any=[];
  memberPortsdata: any;
  response: any;
  retryEnableData: boolean = false;
  retryEnableVoice: boolean = false;
  retryEnableVideo: boolean = false;
  ontState: boolean;
  asmData: any;
  allowAsm: boolean;
  showAsm: any;
  refreshDetails: boolean=false;
  routerTabRead: boolean;
  ONtSystem: boolean=false;
  statusRespone: any
  provisionDataOnt: any;
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private service: DataServiceService,
    public sso: SsoAuthService,
    private http: HttpClient,
    private dateUtilsService: DateUtilsService,
    private commonOrgService: CommonService,
    private systemservice: FoundationManageService,
    private ccoService: AddSubscriberService,
    private supportrouterservice: SupportRouterService,
    private api: SupportWifiService,
    private healthService: HealthService,
    private issueService: IssueService,
    private managementService: ManagementService,
    private communityService: MycommunityIqService,
  ) {
    this.getDeviceModels();
    this.getDialPlanList()
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.languageUpdate();
      }
    );
  }
  redrirectUl = "";
  ngOnInit(): void {
    //this.loading = true;
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowAddSystems = false;
    }
    this.deviceInformation = JSON.parse(localStorage.getItem("calix.Device_Details"))
    this.getEdgeSuiteEntitlement();
    this.getServiceallDatas()
    this.servifyDisable = true;
    this.editParams = [];
    this.route.queryParams.subscribe(params => {
      let latestParams = JSON.stringify(params);
      this.redrirectUl = params.redirect ? params.redirect : null;
      if (params.subscriberImpacted) {
        this.subscriberImpacted = params.subscriberImpacted ? params.subscriberImpacted : false
      }
      if (params.key) {
        this.scrollTop();
      }
      // this.geoMapIssue = params.geoMapIssue == 'true' ? params.geoMapIssue : 'false',
      this.systemInformation = {
        sn: params.sn ? params.sn : '',
        subscriber: params.subscriber ? params.subscriber : '',
        regId: params.regId ? params.regId : '',
        from: 'view'
      }

      this.systemInfo = {
        sn: params.sn ? (params.sn).trim() : '',
        subscriberId: params.subscriber ? params.subscriber : '',
        regId: params.regId ? params.regId : '',
        from: 'view'
      }
      this.editParams.push(this.systemInfo);
      if (this.latestParams) {
        if (this.latestParams !== latestParams) {
          this.resetValues();
          this.latestParams = latestParams;
          this.loading = true;
          this.sN = params.sn ? (params.sn).trim() : ''
          this.subId = params.subscriber ? params.subscriber : ''
          this.regID = params.regId ? params.regId : '';
          this.showRadioSummary = false;
          this.getDatas();
        }
      } else {
        this.latestParams = latestParams;
        this.sN = params.sn ? (params.sn).trim() : ''
        this.subId = params.subscriber ? params.subscriber : ''
        this.regID = params.regId ? params.regId : ''
        this.showRadioSummary = false;
        this.getDatas();
      }
      return params;
    });

    // if(this.geoMapIssue == 'true'){
    //   window.scrollTo(0, 0);
    // }

    this.getScopes();

  }
  redoServiceProvision() {
    if (this.dataService?.serviceDeleteRetry || this.dataservices1?.serviceDeleteRetry) {
      this.params = {
        "softDeleteServiceAndActivate": {
          "subscriberId": this.subId,
          "cpeList": this.devices
        }
      }
    } else if (this.dataService?.maxRetriesExceeded || this.dataservices1?.maxRetriesExceeded) {
      this.params = {
        'serviceRetry': {
          'subscriberId': this.subId,
          'serviceId': this.dataService?.serviceId
        }
      }
    }
    this.redoServicesub = this.ccoService.redoServic(this.params).subscribe((res: any) => {
      this.successInfo = "Service data retried successfully"
      this.success = true
      setTimeout(() => {
        this.getServicesStatus();
      }, 5000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  redoServiceProvisionVideo() {
    if (this.videoServicesStatus?.serviceDeleteRetry || this.videoServicesStatus1?.serviceDeleteRetry) {
      this.params = {
        "softDeleteServiceAndActivate": {
          "subscriberId": this.subId,
          "cpeList": this.devices
        }
      }
    } else if (this.videoServicesStatus?.maxRetriesExceeded || this.videoServicesStatus1?.maxRetriesExceeded) {
      this.params = {
        'serviceRetry': {
          'subscriberId': this.subId,
          'serviceId': this.videoServicesStatus?.serviceId
        }
      }
    }
    this.redoServicesub = this.ccoService.redoServic(this.params).subscribe((res: any) => {
      this.successInfo = "Service data retried successfully"
      this.success = true
      setTimeout(() => {
        this.getServicesStatus();
      }, 5000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  redoServiceProvisionVoice() {
    if (this.voiceServicesStatus?.serviceDeleteRetry || this.voiceServicesStatus1?.serviceDeleteRetry) {
      this.params = {
        "softDeleteServiceAndActivate": {
          "subscriberId": this.subId,
          "cpeList": this.devices
        }
      }
    } else if (this.voiceServicesStatus?.maxRetriesExceeded || this.voiceServicesStatus1?.maxRetriesExceeded) {
      this.params = {
        'serviceRetry': {
          'subscriberId': this.subId,
          'serviceId': this.voiceServicesStatus?.serviceId
        }
      }
    }
    this.redoServicesub = this.ccoService.redoServic(this.params).subscribe((res: any) => {
      this.successInfo = "Service data retried successfully"
      this.success = true
      setTimeout(() => {
        this.getServicesStatus();
      }, 5000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  resetValues() {
    //system info
    this.systemId = undefined;
    this.macAddress = '';
    this.ipAddress = '';
    this.ipV6SitePrefix = '';
    this.registrationId = '';
    this.serialNumber = '';
    this.status = '';

    //subscriber-Details
    this.account = '';
    this.email = '';
    this.name = '';
    this.phone = '';
    this.serviceAddress = '';
    this.subscriberLocationId = '';
    this.commandIQstatus = '';

    //edgesuite-details

    this.k2Cameras = '';
    this.k4Cameras = '';
    this.proIq = '';
    this.expIq = '';
    this.tier = '';
    this.arloEmail = '';

    //data-service  

    this.dEnable = 'Disabled';;
    this.pppoeUN = '';
    this.pppoePW = '';
    this.dPbit = '';
    this.dVLanId = '';

    //video-service

    this.vEnable = 'Disabled';
    this.vPbit = '';
    this.vBwProfile = '';
    this.vVLanId = '';

    //voice-service

    this.viEnable = 'Disabled';
    this.viFaxT38 = '';
    this.viServiceType = '';
    this.videodialplan = '';

    //radio-service

    this.radioEnable2Hz = '';
    this.radioEnable5Hz = '';
  }
  getDialPlanList() {
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
    this.getAllDialPlanSubscribe = this.managementService.getDialPlanList(this.sso.getOrgId()).subscribe((res: any) => {
      if (res) {
        this.dialPlanList = [];
        for (var i = 0; i < res?.length; i++) {
          let data = {
            "value": res[i]._id,
            "displayName": res[i].name
          }
          this.dialPlanList.push(data)
        }

      }
    }, (err: HttpErrorResponse) => {
    }, () => {
    });
  }
  getDatas() {
    if (this.sN && this.subId) {
      this.id = this.sN;
      this.systemonlyEnable = false;
      this.getEdgeSuiteData();
      this.getSubscriberData()
      this.getAllSubsServicesData();
      this.getGeomapAddress();
    } else {
      if (this.subId) {
        this.id = this.subId
        this.hidesubonly = true;
        this.systemonlyEnable = false;
        this.getSubscriberData()
        this.getEdgeSuiteData();
        this.getAllSubsServicesData();
        this.getGeomapAddress();
        //this.getServicesStatus();
      }
      else {
        this.id = this.sN;
        if (this.deviceInformation?.devices[0]?.opModeWithOnt === 'ONT') this.allowEdgeAPI = false
        this.getEdgeSuiteData();
        this.systemonlyEnable = true;
        this.deviceDetail(this.sN);
        //this.getupdownstreamoctets(this.sN);
      }
    }
    if (this.regID) {
      this.getMultipleRegId(this.regID);
    }

  }
  checkMackAddress(value) {
    value = value ? value : '';
    var format = /[:]+/;
    if (format.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  languageUpdate() {
    if (this.communityIq) {
      if (this.communityIq?.subscriber?.enable) {
        this.mycommunityIq = this.language['Subscribed'];
      } else if (!this.communityIq?.subscriber?.enable) {
        this.mycommunityIq = this.name ? this.language['Unsubscribed'] : "-";
      }
      this.rgStatus = (this.communityIq?.passpoint?.status?.result) ? this.communityIq?.passpoint?.status?.result : '';
      if (!this.communityIq?.passpoint?.enable) {
        this.RGHotspot = (this.sN) ? `${this.language["Disabled"]}` : '-';
      } else if (this.communityIq?.passpoint?.enable) {
        this.RGHotspot = (this.communityIq?.passpoint?.enable && this.rgStatus == "succeeded") ? `${this.language["Enabled"]}` : (this.communityIq?.passpoint?.enable && this.rgStatus == "failed") ? `${this.language["EnableFailed"]}` : '-';
      }
      if (this.communityIq?.passpoint?.network?.type) {
        this.network = this.communityIq?.passpoint?.network?.type === 'Route' ? 'Routed' : this.communityIq?.passpoint?.network?.type === 'Bridge' ? 'Bridged' : 'Policy Routed'
      }
      if (this.communityIq?.passpoint?.network?.vlanId) {
        this.vlanId = this.communityIq?.passpoint?.network?.vlanId;
      }
      if (this.communityIq?.eduroam) {
        if (this.communityIq?.eduroam?.enable) {
          this.Eduroam = this.communityIq?.eduroam?.status?.result === 'failed' ? this.language["EnableFailed"] : this.language["Enabled"]
        } else if (!this.communityIq?.eduroam?.enable) {
          this.Eduroam = this.language["Disabled"]
        }
      } else {
        this.Eduroam = this.language["Not Enabled"];
      }

    }
    this.planCode = this.servifyCare?.planCode === 'SERVIFYCAREPLATINUM' ? this.language['Platinum'] : this.servifyCare?.planCode === 'SERVIFYCAREBRONZE' ? this.language['Bronze'] : this.servifyCare?.planCode === 'SERVIFYCAREGOLD' ? this.language['Gold'] : this.servifyCare?.planCode === 'SERVIFYCARESILVER' ? this.language['Silver'] : '-';

  }
  checkRegIdAndMac(value) {
    value = value ? value : '';
    var format = /[:]+/;
    if (format.test(value) || value.length <= 10) {
      return true;
    } else {
      return false;
    }
  }

  checkRegId(value) {
    value = value ? value : '';
    if (value.length <= 10) {
      return true;
    } else {
      return false;
    }
  }

  checkIpAddress(val, type) {
    let ipAddr = '';
    ipAddr = (type == "v4" && this.sso.isIpv4Address(val)) ? val : ipAddr;
    ipAddr = (type == "v6" && this.sso.isIpv6Address((val ? val.split('/')[0] : ''))) ? val : ipAddr;
    return ipAddr;
  }
  getMultipleRegId(regId) {
    this.getregidSub = this.systemservice.getRegIdInstance(this.ORG_ID, regId).subscribe(res => {
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

  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' },
    { label: 'TDM GW', value: 'X_000631_TDMGW' }
  ];
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getSubscriberData() {
    this.allListSubs = this.ccoService.GetSubscriberData(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {



      // forkJoin([res.device.map(e=> this.systemservice.checkSwapStatus(e, this.ORG_ID))]).subscribe((res)=>{
      //   res.forEach((e:any)=>{
      //     if(e.replacingBy) this.swapInprogressList[replacingBy
      //   })
      // })
      this.account = res.account;
      this.editdisable = false;
      this.hideserviceinfo = true;
      this.email = res.email;
      this.name = res.name;
      this.phone = res.phone;
      this.serviceAddress = res.serviceAddress;
      this.subscriberLocationId = res.subscriberLocationId;
      this.fccSubscriberId = res.fccSubscriberId;
      this.hubbLocationId = res.hubbLocationId
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  getEdgeSuiteData() {
    //debugger;
    this.getlistloder = true;
    this.systemData = [];
    this.systemdatas = {
      sn: this.sN,
      subscriberId: this.subId,
    }
    let edgeSuiteUrl = this.systemInfo.subscriberId ? this.systemservice.getedgesuiteData(this.ORG_ID, this.systemInfo.subscriberId, true) : this.systemservice.getSystemStatusData(this.ORG_ID, this.sN, true)
    this.getlistdata = this.allowEdgeAPI ? edgeSuiteUrl.subscribe((res: any) => {
      this.tableData = res ? res : [];
      this.systemData = [];
      //this.status = this.tableData?.status ? this.tableData?.status : '';
      this.account = this.tableData.subscriber?.account ? this.tableData.subscriber?.account : '';
      this.email = this.tableData.subscriber?.email ? this.tableData.subscriber?.email : '';
      this.name = this.tableData.subscriber?.name ? this.tableData.subscriber?.name : '';
      this.phone = this.tableData.subscriber?.phone ? this.tableData.subscriber?.phone : '';
      this.serviceAddress = this.tableData.subscriber?.serviceAddress ? this.tableData.subscriber?.serviceAddress : '';
      this.subscriberLocationId = this.tableData.subscriber?.subscriberLocationId ? this.tableData.subscriber?.subscriberLocationId : '';
      this.edgeSuites = this.tableData.edgeSuites;
      this.protectIQ = this.edgeSuites?.protectIQ;
      this.experienceIQ = this.edgeSuites?.experienceIQ;
      this.userId = this.edgeSuites?.arloSmart?.userId;
      if (this.userId) {
        this.GetArlosmart();
      }
      this.getCommandIqinfo();
      this.servifyCare = this.edgeSuites?.servifyCare;
      this.bark = this.edgeSuites?.bark;
      this.planCode = this.servifyCare?.planCode === 'SERVIFYCAREPLATINUM' ? 'Platinum ' : this.servifyCare?.planCode === 'SERVIFYCAREBRONZE' ? 'Bronze ' : this.servifyCare?.planCode === 'SERVIFYCAREGOLD' ? 'Gold' : this.servifyCare?.planCode === 'SERVIFYCARESILVER' ? 'Silver' : '-';
      this.BarkPlan = this.bark?.planCode === 'bark_premium' ? this.language.Premium_Monthly : this.bark?.planCode === 'bark_junior' ? this.language.Junior_Monthly : '';
      this.BarkEmail = this.bark?.email;
      this.servifyemail = this.servifyCare?.email;
      if (this.servifyemail) {
        let PlanPurchasedDate = this.servifyCare?.planPurchaseDate
        let date = new Date(PlanPurchasedDate)
        let newDate = new Date(date.setDate(date.getDate()))
        let StartDate = new Date();
        let currentYear = StartDate.getFullYear();
        let EndDate = new Date(newDate);
        
        let Time = StartDate.getTime() - EndDate.getTime();
        let Days = Time / (1000 * 3600 * 24); //Diference in Days
        let ExactDays = Math.round(Days);
       
        let todayDate = new Date().toJSON().slice(0, 10);
        let cancelDtSplit: any
        let todayDateSplit: any = todayDate.split("-");
        let PlanPurchasedDtSplit: any = PlanPurchasedDate.split("-");
        if (PlanPurchasedDtSplit) {
          this.PlanPurchasedDt = new Date(PlanPurchasedDtSplit[0], parseInt(PlanPurchasedDtSplit[1]) - 1, PlanPurchasedDtSplit[2]);
        }
        let check = new Date(todayDateSplit[0], parseInt(todayDateSplit[1]) - 1, todayDateSplit[2]);

        let monthset
        let from: any;

        let thisMonth
        let to
        let cancelDate = this.servifyCare?.cancelDate
        if (cancelDate) {
          cancelDtSplit = cancelDate.split("-");
          monthset = cancelDtSplit[1]
          from = new Date(cancelDtSplit[0], parseInt(cancelDtSplit[1]) - 1, cancelDtSplit[2]);  // -1 because months are from 0 to 11
          let PreviousDate = PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
          let mm = this.monthDiff(this.PlanPurchasedDt, check)
          this.PlanPurchasedDt.setDate(this.PlanPurchasedDt.getDate() - 1)
          this.PlanPurchasedDt.setMonth(this.PlanPurchasedDt.getMonth() + mm)
          let mmset = check.getTime() > this.PlanPurchasedDt.getTime() ? 1 : 0
          this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
          let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
          to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
        
          if (ExactDays > 30) {
            if (check >= from && check <= to) {
              this.ClaimEligible = true
            }
            else {
              this.ClaimEligible = false
            }
          }
          else {
            this.subscribedStatus = false
            this.ClaimEligible = false
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
          
          if (ExactDays > 30) {
            this.ClaimEligible = true
          }
          else {
            this.ClaimEligible = false
          }
        }

       
        if (cancelDate && ExactDays < 30) {
          this.subscribedStatus = false
        }
        else if (cancelDate && ExactDays > 30) {
          if (check > to) {
            this.subscribedStatus = false
          }
          else {
            this.subscribedStatus = true
          }
        }
        else {
          this.subscribedStatus = true
        }
      } else {
        this.subscribedStatus = false
      }

      this.arloSmart = this.edgeSuites?.arloSmart;
      this.arEnable = this.arloSmart?.enabled;
      this.communityIq = this.edgeSuites?.myCommunityIQ;

      if (this.arloSmart) {
        this.k2Cameras = this.edgeSuites?.arloSmart['2kCameras'] + " " + this.language.Cameras;
        this.k4Cameras = this.edgeSuites?.arloSmart['4kCameras'] + " " + this.language.Cameras;
        this.arloEmail = this.edgeSuites?.arloSmart?.email;
      } else {
        this.k2Cameras = '';
        this.k4Cameras = '';
        this.arloEmail = '';
      }
      if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
        this.k2Cameras = ""
      }
      if (this.arloSmart && this.edgeSuites?.arloSmart['4kCameras'] === 0) {
        this.k4Cameras = ""
      }
      this.smallBiz = this.edgeSuites?.smallBizIQ;
      if (this.smallBiz?.enable) {
        this.SmallBizIQ = this.smallBiz?.status?.result === 'failed' ? 'Enable Failed' : "Subscribed"
      } else {
        this.SmallBizIQ = "Unsubscribed"
      }
      if (this.protectIQ && typeof this.protectIQ == 'object' && Object.keys(this.protectIQ).length) {
        this.proIq = this.getSubsucribeEnableStatus(this.protectIQ);
      } else {
        this.proIq = '-';
      }

      if (this.experienceIQ && typeof this.experienceIQ == 'object' && Object.keys(this.experienceIQ).length) {
        this.expIq = this.getSubsucribeEnableStatus(this.experienceIQ);
      } else {
        this.expIq = '-';
      }
      if (!this.systemInfo.subscriberId) {
        this.loading = false;
      }
      //this.getDeviceDatas();
      this.getlistloder = false;

      this.languageUpdate();

    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.getlistloder = false;
        this.pageErrorHandle(err);
      }) : this.loading = false; this.getlistloder = false;;
  }
  micrositeLoader: boolean;
  communityArr: any = [];
  GetMicrosites() {
    this.micrositeLoader = true;
    this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      this.micrositeLoader = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.micrositeLoader = false;
    })
  }
  closeAddEdit() {
    let searchText = sessionStorage.getItem('cco_susb_system_list_search');
    let pageNo = sessionStorage.getItem('cco_susb_system_list_search_p_no');
    if (this.redrirectUl) {
      // if (this.geoMapIssue == 'true') {
      //   this.issueService.fromMapNavigation(true);
      // }
      if (this.subscriberImpacted) {
        this.router.navigate(['/cco/system/subscribers-impact'])
      } else {
        this.router.navigate([this.redrirectUl]);
      }

    } else {
      if (searchText || pageNo) {
        if (this.subscriberImpacted) {
          this.router.navigate(['/cco/system/subscribers-impact'])
        } else {
          this.router.navigate(['/cco/services/subscribers/system/list'], { state: { ccoSystemSearchText: searchText || '', ccoSystemSearchPageNo: pageNo || undefined } });
        }
      } else {
        if (this.subscriberImpacted) {
          this.router.navigate(['/cco/system/subscribers-impact'])
        } else {
          this.router.navigate(['/cco/services/subscribers/system/list']);
        }
      }
    }

  }
  goToSystemEdit() {
    this.subInfo = { subscriber: this.systemInfo.subscriberId, page: 'add-details', sName: this.name, from: 'view' };
    if (this.subscriberImpacted) {
      this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.systemInfo.subscriberId, page: 'add-details', sName: this.name, from: 'view', subscriberImpacted: this.subscriberImpacted } });
    } else {
      this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.systemInfo.subscriberId, page: 'add-details', sName: this.name, from: 'view' } });
    }

  }
  goTocscPage(){
    sessionStorage.setItem('calix.subscriberId', this.systemInfo.subscriberId);
    sessionStorage.setItem('calix.deviceData', JSON.stringify(this.deviceInformation?.devices));
    // this.router.navigate([]).then(result => { window.open('support/service/data', '_blank') });
    window.open('support/router', '_blank');
  }
  GetArlosmart(reload?) {
    this.arloLoading = true;
    this.arloSmartListSubs = this.systemservice.gerArloSmartData(this.userId).subscribe((res: any) => {
      if (res && Object.keys(res).length && res.devices && res.devices.length) {
        this.ArloData = (res.devices && res.devices.length) ? res.devices : [];
        let twoKDevices = [], fourKDevices = [];
        this.ArloData.forEach(el => {
          if (el.planId && el.planId.trim() === 'Arlo-Secure-Single-Camera') {
            twoKDevices.push(el);
          } if (el.planId && el.planId.trim() === 'Arlo-Secure-Unlimited-Plan') {
            twoKDevices.push(el);
          }
          if (el.planId && el.planId.trim() === 'Arlo-Secure-Plus-Unlimited-Plan') {
            twoKDevices.push(el);
          }
        });

        this.twoKPlanData = [...twoKDevices];
        if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
          this.onboard2kcamera = '';
        } else {
          this.onboard2kcamera = ('Onboarded' + '-' + this.twoKPlanData.length);
        }
        this.fourKPlanData = [...fourKDevices]
        if (this.arloSmart && this.edgeSuites?.arloSmart['4kCameras'] === 0) {
          this.onboard4kcamera = '';
        } else {
          this.onboard4kcamera = ('Onboarded' + '-' + this.fourKPlanData.length);
        }

      } else {
        this.twoKPlanData = [];
        this.fourKPlanData = [];
        if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
          this.onboard2kcamera = "";
        } else {
          this.onboard2kcamera = ('Onboarded' + '-' + this.twoKPlanData.length);
        }
        if (this.arloSmart && this.edgeSuites?.arloSmart['4kCameras'] === 0) {
          this.onboard4kcamera = "";
        } else {
          this.onboard4kcamera = ('Onboarded' + '-' + this.fourKPlanData.length);
        }
        if (this.arloSmart) {
          //this.k2Cameras = this.edgeSuites?.arloSmart['2kCameras'] + " " + 'cameras' + " " + `${this.onboard2kcamera}`;
          //this.k4Cameras = this.edgeSuites?.arloSmart['4kCameras'] + " " + 'cameras' + " " + `${this.onboard4kcamera}`;
        } else {
          this.k2Cameras = '';
          this.k4Cameras = '';
        }

      }
      this.arloLoading = false;
    }, (err: HttpErrorResponse) => {
      this.arloLoading = false;
    })
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.getlistdata) {
      this.getlistdata.unsubscribe();
    }
    if (this.allListSubs) {
      this.allListSubs.unsubscribe();
    }
    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
    if (this.preprovisionsub) this.preprovisionsub.unsubscribe();
    if (this.getregidSub) this.getregidSub.unsubscribe();
    if (this.deviceInfoSub) this.deviceInfoSub.unsubscribe();
    if (this.getmetaDataSub) this.getmetaDataSub.unsubscribe();
    if (this.CommandIqSubs) this.CommandIqSubs.unsubscribe();
    if (this.allSubsServicesStatusSubs) this.allSubsServicesStatusSubs.unsubscribe();
    if (this.provisionInfosub) this.provisionInfosub.unsubscribe();
    if (this.getstatussub) this.getstatussub.unsubscribe();
    if (this.allSubsServicesDataSubs) this.allSubsServicesDataSubs.unsubscribe();
    if (this.arloSmartListSubs) this.arloSmartListSubs.unsubscribe();
  }

  getSubsucribeEnableStatus(obj: any) {
    if (Object.keys(obj).length) {
      let str = '';
      str = `${obj.subscribed ? 'Subscribed' : 'Unsubscribed'}, ${obj.enabled ? 'Enabled' : 'Disabled'}`;

      return str;
    } else {
      return '-'
    }
  }


  latestFSAN(ORG_ID: any, latestFSAN: any) {
    throw new Error('Method not implemented.');
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

  getScopes() {
    //debugger;
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.coc.systems'] = scopes['cloud.rbac.coc.services.subscribers'] ? scopes['cloud.rbac.coc.services.subscribers'] : [];
      if (scopes && (scopes['cloud.rbac.coc.systems']) && scopes['cloud.rbac.coc.systems'].indexOf('write') !== -1) {
        this.hasWrite = true;
      }
      if (scopes && scopes['cloud.rbac.csc.cpe.settings']) {
        this.routerTabRead = true;
      }
     
    } else {
      this.hasWrite = true;
      this.routerTabRead=true;
    }

  }
  commandIQSecondEmail = '';
  multipleVoiceInteface: string;
  getCommandIqinfo() {
    this.CommandIqLoader = false;
    let devices = this.deviceInformation?.devices;
    if (devices) {
      for (var i = 0; i < devices?.length; i++) {
        if (devices[i]?.ont) {
          const systemid = devices[i]?.serialNumber
          if (this.systemInfo.subscriberId) {
            this.CommandIqLoader = true;
            this.CommandIqSubs = this.systemservice.getCommandIqOfSubscriber(this.ORG_ID, this.systemInfo.subscriberId, systemid).subscribe((res: any) => {
              this.CommandIqData = res ? res : {};
              this.ontSerialnumber = this.CommandIqData?.ipAddress
              this.multipleVoiceInteface = res['service-detail'].find(e => e.type == 'voice')?.voiceInterfaces.reduce((accumulator, current, index) => {

                return `${accumulator}${index ? ', ' : ''}${current.name}`;
              }, '')
              if (res?.devices?.length) {
                res?.devices.forEach(element => {
                  if (element?.bSmbMode == true) {
                    this.bSmbMode = true
                  }

                });
              }

              //this.systemDetails = this.CommandIqData?.devices;
              if (!this.CommandIqData?.commandIQ?.fduser) {
                this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
                if (this.CommandIqData?.commandIQ?.secondaryUsers.length > 0) {
                  this.commandIQSecondEmail = this.CommandIqData?.commandIQ?.secondaryUsers[0].status !== 'PENDING' ? this.CommandIqData?.commandIQ?.secondaryUsers[0].email : '';
                }
              } else {
                this.commandIQEmail = "";
                this.commandIQSecondEmail = ""
              }
              this.onboardCommend = this.CommandIqData?.commandIQ?.onboarded;
              if (this.onboardCommend === true && this.CommandIqData?.commandIQ?.fduser === false) {
                this.commandIQstatus = 'Onboarded';
              }
              else if (this.onboardCommend === false && this.CommandIqData?.commandIQ?.fduser === false) {
                this.commandIQstatus = 'Not Onboarded';
              }
              else {
                this.commandIQstatus = '';
              }
              this.CommandIqLoader = false;
            }, (err: HttpErrorResponse) => {
              //this.pageErrorHandle(err);
              this.CommandIqLoader = false;
            })
          }
        } else {
          if (this.systemInfo.subscriberId) {
            this.CommandIqLoader = true;
            this.CommandIqSubs = this.systemservice.getCommandIqOfSubscriber(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
              this.CommandIqData = res ? res : {};
              this.ontSerialnumber = this.CommandIqData?.ontSerialnumber
              this.multipleVoiceInteface = res['service-detail'].find(e => e.type == 'voice')?.voiceInterfaces.reduce((accumulator, current, index) => {

                return `${accumulator}${index ? ', ' : ''}${current.name}`;
              }, '')
              if (res?.devices?.length) {
                res?.devices.forEach(element => {
                  if (element?.bSmbMode == true) {
                    this.bSmbMode = true
                  }

                });
              }

              //this.systemDetails = this.CommandIqData?.devices;
              if (!this.CommandIqData?.commandIQ?.fduser) {
                this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
                if (this.CommandIqData?.commandIQ?.secondaryUsers.length > 0) {
                  this.commandIQSecondEmail = this.CommandIqData?.commandIQ?.secondaryUsers[0].status !== 'PENDING' ? this.CommandIqData?.commandIQ?.secondaryUsers[0].email : '';
                }
              } else {
                this.commandIQEmail = "";
                this.commandIQSecondEmail = ""
              }
              this.onboardCommend = this.CommandIqData?.commandIQ?.onboarded;
              if (this.onboardCommend === true && this.CommandIqData?.commandIQ?.fduser === false) {
                this.commandIQstatus = 'Onboarded';
              }
              else if (this.onboardCommend === false && this.CommandIqData?.commandIQ?.fduser === false) {
                this.commandIQstatus = 'Not Onboarded';
              }
              else {
                this.commandIQstatus = '';
              }
              this.CommandIqLoader = false;
            }, (err: HttpErrorResponse) => {
              //this.pageErrorHandle(err);
              this.CommandIqLoader = false;
            })
          }
        }
      }
    } else {
      if (this.systemInfo.subscriberId) {
        this.CommandIqLoader = true;
        this.CommandIqSubs = this.systemservice.getCommandIqOfSubscriber(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
          this.CommandIqData = res ? res : {};
          this.ontSerialnumber = this.CommandIqData?.ontSerialnumber
          this.multipleVoiceInteface = res['service-detail'].find(e => e.type == 'voice')?.voiceInterfaces.reduce((accumulator, current, index) => {

            return `${accumulator}${index ? ', ' : ''}${current.name}`;
          }, '')
          if (res?.devices?.length) {
            res?.devices.forEach(element => {
              if (element?.bSmbMode == true) {
                this.bSmbMode = true
              }

            });
          }

          //this.systemDetails = this.CommandIqData?.devices;
          if (!this.CommandIqData?.commandIQ?.fduser) {
            this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
            if (this.CommandIqData?.commandIQ?.secondaryUsers.length > 0) {
              this.commandIQSecondEmail = this.CommandIqData?.commandIQ?.secondaryUsers[0].status !== 'PENDING' ? this.CommandIqData?.commandIQ?.secondaryUsers[0].email : '';
            }
          } else {
            this.commandIQEmail = "";
            this.commandIQSecondEmail = ""
          }
          this.onboardCommend = this.CommandIqData?.commandIQ?.onboarded;
          if (this.onboardCommend === true && this.CommandIqData?.commandIQ?.fduser === false) {
            this.commandIQstatus = 'Onboarded';
          }
          else if (this.onboardCommend === false && this.CommandIqData?.commandIQ?.fduser === false) {
            this.commandIQstatus = 'Not Onboarded';
          }
          else {
            this.commandIQstatus = '';
          }
          this.CommandIqLoader = false;
        }, (err: HttpErrorResponse) => {
          //this.pageErrorHandle(err);
          this.CommandIqLoader = false;
        })
      }
    }

  }
  getGeomapAddress(value?) {
    this.getlistloder = true
    let url = value == 'Update' ? this.ccoService.updateGeomapAddress(this.systemInfo.subscriberId) : this.ccoService.getGeomapAddress(this.systemInfo.subscriberId)
    this.GeomapInfosub = url.subscribe((res: any) => {
      this.GeomapInfo = res ? res : {};
      this.latitude = this.GeomapInfo?.lat;
      this.longtitude = this.GeomapInfo?.lon;
      this.getlistloder = false
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.getlistloder = false;
    })
  }
  getAllSubsServicesData() {
    //debugger;
    this.deviceDataGETLoading = true;
    this.allSubsServicesDataSubs = this.ccoService.getDetailedSubscriberServices(this.systemInfo.subscriberId).subscribe((res: any) => {
      this.getServicesStatus();
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          if (services[i].type === 'data') {
            this.dataservice = services[i] ? services[i] : {};
            this.dataPlanItem(this.dataservice.usoc)
          } else if (services[i].type === 'data1') {
            this.dataservice1 = services[i] ? services[i] : {};
          } else if (services[i].type === 'video') {
            this.videoservice = services[i] ? services[i] : {};
          } else if (services[i].type === 'voice') {
            this.VoiceService = services[i] ? services[i] : {};
            this.VoicePlan(this.VoiceService.usoc)
          }
        }
        this.servicesData = {
          data: this.dataservice,
          data1: this.dataservice1,
          video: this.videoservice,
          voice: this.VoiceService
        }
        if (this.servicesData?.voice?.voiceServiceType) {
          this.servicesData.voice.voiceServiceType = this.servicesData?.voice?.voiceServiceType?.includes('X_000631_TDMGW') ? 'TDM GW' : this.servicesData?.voice?.voiceServiceType;
        }
        this.dataser = this.servicesData?.data;
        this.dataEnable = this.dataser?.Enable;
        this.usoc = this.dataser?.usoc;
        this.ceVlan = this.dataser?.ceVlan ? this.dataser?.ceVlan : '-';
        this.interface = this.dataser?.interface;
        this.untagged = this.dataser?.untagged;
        this.memberPortsdata = this.dataser?.memberPorts;
        this.cVlan = this.dataser?.cVlan;
        this.sVlan = this.dataser?.sVlan;
        this.dataDescription = this.dataser?.note;
        this.provisionDataOnt = this.dataser?.isOntService
        console.log("provision=",this.provisionDataOnt)
        this.dataser1 = this.servicesData?.data1;

        this.dataEnable1 = this.dataser1?.Enable;
        this.usoc1 = this.dataser1?.usoc;
        this.ceVlan1 = this.dataser1?.ceVlan;
        this.interface1 = this.dataser1?.interface;
        this.untagged1 = this.dataser1?.untagged;
        this.cVlan1 = this.dataser1?.cVlan;
        this.sVlan1 = this.dataser1?.sVlan;


        this.videoser = this.servicesData?.video;
        this.videoEnable = this.videoser?.Enable
        this.ceVlanvideo = this.videoser?.ceVlan;
        this.interfacevideo = this.videoser?.interface;
        this.memberPorts = this.videoser?.memberPorts;
        this.multicastProfile = this.videoser?.multicastProfile;
        this.untaggedvideo = this.videoser?.untagged;
        this.usocVideo = this.videoser?.usoc;
        this.vcVlan = this.videoser?.cVlan;
        this.vsVlan = this.videoser?.sVlan;
        this.videoDescription = this.videoser?.note;


        this.voiceser = this.servicesData?.voice;
        this.voiceDescription = this.voiceser?.note;
        this.usocVoice = this.voiceser?.usoc;
        this.voiceServiceType = this.voiceser?.voiceServiceType;
        this.voiceEnable = this.voiceser?.Enable;
        this.vicVlan = this.voiceser?.cVlan;
        this.visVlan = this.voiceser?.sVlan;
        this.interfaceVoice = this.voiceser?.interface;
      }
      if (res && res.devices && res.devices.length) {
        this.devices = res?.devices ? res?.devices : [];
        if (this.devices.length > 1) {
          this.setTime = true
        } else {
          this.setTime = false
        }
        let device = [];
        setTimeout(() => {
          this.devices.forEach(el => {
            setTimeout(() => {
              this.deviceDetail(el.trim());//upstream
              // this.getupdownstreamoctets(el.trim())
            }, 500);
          });
        }, 100);
        this.systemDetails
        this.deviceDataGETLoading = false;
      } else {
        this.systemDetails = [];
        this.deviceDataGETLoading = false;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.deviceDataGETLoading = false;
    })
  }
  dataPlanItem(value?) {
    var result = value
    this.dataplan = this.DataPlanitem?.filter(obj => {
      return obj.name === result
    })
    const name = (this.dataplan?.length) ? this.dataplan[0].serviceTemplateName : '';
    if (name) {
      this.loading = true;
      this.getVlanModeSub = this.ccoService.GetVlanMode(name).subscribe((res: any) => {
        let VLANMode = res?.vlanMode ? res?.vlanMode : ''
        if (VLANMode === 'N2ONE' || !VLANMode) {
          this.HideCvlan = true;
        } else {
          this.HideCvlan = false;
        }
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  VoicePlan(value?) {
    var result = value
    this.voiceplan = this.VoicePlanitem?.filter(obj => {
      return obj.name === result
    })
    const name = this.voiceplan?.length ? this.voiceplan[0].serviceTemplateName : '';
    if (name) {
      this.loading = true;
      this.getVlanModeSub = this.ccoService.GetVlanMode(name).subscribe((res: any) => {
        let VLANMode = res?.vlanMode ? res?.vlanMode : ''
        if (VLANMode === 'N2ONE' || !VLANMode) {
          this.HidecVlanVoice = true;
        } else {
          this.HidecVlanVoice = false;
        }
        this.loading = false;

      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }


  }
  getServiceallDatas() {
    let request = [];

    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=DATA`);
    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=VOICE`);

    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=VIDEO`);
    const requests = [];
    request.forEach(endpoint => {
      const req = this.ccoService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLat = combineLatest(requests);
    this.makeParallelReq();

  }
  makeParallelReq() {
    let data = []; let video = []; let voice = []
    this.parallelReqSub = this.combineLat.subscribe((response: any) => {
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0]);
        this.Dataplan = [];
      } else {
        this.Dataplan = response[0] ? response[0] : [];
        if (response[0] !== "Service definition not found") {
          for (var i = 0; i < this.Dataplan?.length; i++) {
            const dataplan = this.Dataplan[i];
            if (dataplan !== "") {
              data.push(dataplan);
            }

          }
        } else {
          data = [];
        }

        this.DataPlanitem = data;
      }

      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1]);
        this.VoicePlandata = [];
      } else {
        this.VoicePlandata = response[1] ? response[1] : [];
        if (response[1] !== "Service definition not found") {
          for (var i = 0; i < this.VoicePlandata?.length; i++) {
            const voiceplan = this.VoicePlandata[i]
            if (voiceplan !== "") {
              voice.push(voiceplan);
            }
          }
        } else {
          voice = [];
        }

        this.VoicePlanitem = voice;
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2]);
        this.VideoPlan = [];
      } else {
        this.VideoPlan = response[2] ? response[2] : [];
        if (response[2] !== "Service definition not found") {
          for (var i = 0; i < this.VideoPlan?.length; i++) {
            const videoPlan = this.VideoPlan[i]
            if (videoPlan !== "") {
              video.push(videoPlan);
            }

          }
        } else {
          video = [];
        }

        this.VideoPlanitem = video;
      }

      this.loading = false
    }, (err: HttpErrorResponse) => {
      //console.log(err)
      this.pageErrorHandle(err);
      this.loading = false
      this.commonOrgService.pageScrollTop();
    }, () => {
    })
  }
  getDeviceModels() {
    let params = { orgId: this.sso.getOrgId() }
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${JSON.stringify(params)}`).subscribe((json: any) => {
      let obj = {};
      if (json) {
        json.forEach((element: any) => {
          if (element && element.modelName) {
            obj[element['modelName'.trim()]] = true;
          }
        });
        this.Modelitems = [];
        this.deviceModels = Object.keys(obj);
        const deviceModel = this.deviceModels.filter(el => {
          this.Modelitems.push(el)
        })
      }
    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }
  moreStatusInfoFlag: boolean;
  moreStatusInfo(index?) {
    this.indexRef = index;
    this.moreStatusInfoFlag = !this.moreStatusInfoFlag;
    // const icon = document.getElementById("moreInfo");
    // icon.classList.toggle("fa-caret-down");
    // icon.classList.toggle("fa-caret-up");
  }
  searchDeviceByMACAddressDetail(system) {
    //let system = this.systemsListForm?.value.systems[ind].deviceId;
    this.getstatussub = this.systemservice.getSearchResult(this.ORG_ID, system).subscribe((res: any) => {
      if (res && res.records.length > 0) {
        this.deviceInformation = res.records[0]
      }


    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  convertClass(value){
    let currentClass = '';
    if(value){
      if(value?.toLowerCase().includes('active')){currentClass = 'green'}
      if(value?.toLowerCase().includes('inactive')){currentClass = 'red'}
    }
   return currentClass
  }

  asmLoader:boolean = false;
  AsmData(data){
    this.asmLoader = true;
    this.ccoService.fetchAmdins('All').subscribe((res: any = {}) => {
      this.showAsm= res?.showAsmInformation;
      if (this.showAsm) {
        const uuid=data?.oltUuid;
        let interfaceId = (this.statusRespone?.dataServices || []).filter(el => el.interface).map(el => el.interface)?.[0];
        if(!interfaceId)  interfaceId = (this.statusRespone?.voiceServices || []).filter(el => el.interface).map(el => el.interface)?.[0];
        if (interfaceId) {this.systemservice.getAsmData(uuid, `${data?.fsan}/${interfaceId}`).subscribe ((resp: any) => {
          this.asmLoader = false;
          this.asmData = resp ? resp : {};
      }, (err: HttpErrorResponse) => {
        this.asmLoader = false;
        this.pageErrorHandle(err);
         })
        }else{
          this.systemservice.getAsmData(uuid, data?.fsan, true).subscribe ((resp: any) => {
            this.asmLoader = false;
            this.asmData = resp ? resp : {};
        }, (err: HttpErrorResponse) => {
          this.asmLoader = false;
          this.pageErrorHandle(err);
           })
        }
      }else{
        this.asmLoader = false;
      }
    },err=>{
      this.asmLoader = false;
    });
    
     
  }
  isArray(inp) {
    return Array.isArray(inp);
  }
  showOnlyASMName(name){
    return name.includes(',') && name.includes('=') ? name.split(',')[0].split('=')[1] : name;
  }
  deviceDetail(system, value?, opMode?, index?) {
    if (value === true) {
      this.deviceloader = false;
      if (opMode === 'WAP') {
        this.RGLoader = true;
        this.WAPLoader = true;
      }
    } else {
      this.deviceloader = true;
    }

    let devices = this.deviceInformation?.devices;
    if (devices) {
      for (var i = 0; i < devices?.length; i++) {
        if (devices[i]?.deviceId?.toUpperCase() === system.toUpperCase() || (devices[i]?.serialNumber) === system.toUpperCase()) {
          this.serialNo = devices[i]?.serialNumber
          const systemid = devices[i]?.serialNumber ? devices[i]?.serialNumber : system
          if (devices[i]?.ont) {
            this.ONtSystem=true
            this.oltid = devices[i].ont
            this.fsan = system
            this.serialNum = (devices[i]?.ont?.vendorId + devices[i]?.ont?.serialNo);
            const systemid = devices[i]?.serialNumber ? devices[i]?.serialNumber : system
            this.opModeont = devices[i]?.opModeWithOnt;
            const fsanMac = this.serialNum ? this.serialNum : devices[i]?.macAddress?.toUpperCase()
            this.ontsysInfo = {};
            //this.getupdownstreamoctets(devices[i].ont.uuid, fsanMac, this.fsan)
            this.getstatussub = this.ccoService.getOntDeviceStatus(systemid).subscribe((res: any) => {
              let isontonline = res.ontDevices && res.ontDevices.length && res.ontDevices[0].state == 'ONLINE'

             

              let deviceopmode = devices.filter(el => el.deviceId === system)

              setTimeout(() => {
                this.RGLoader = false;
              }, 3000);
              if (res?.ontDevices?.length) {
                if (res?.ontDevices?.length > 1) {
                  this.response = res?.ontDevices[1]
                }else {this.response = res?.ontDevices[0]}
                if (res.ontDevices && res.ontDevices.length && res.ontDevices[0].state == 'ONLINE' && res.ontDevices[0].isPresent == true) {
                  this.ontState = true;
                }
                if (!value && res.ontDevices && res.ontDevices[0] && res.ontDevices[0]?.isConfigured == true && isontonline) { this.getupdownstreamoctets(system, value,this.response) }
                if (!value && res.ontDevices && res.ontDevices[0]) {
                    this.allowAsm=true
                  this.AsmData(this.response)
                }
                if (value && res.ontDevices && res.ontDevices[0] && res.ontDevices[0]?.isConfigured == true && isontonline) { this.OntRefresh(system, value,this.response) }
                  if(value){
                    this.refreshDetails=true
                  }else{
                    this.refreshDetails=false
                  }
                this.ontsysInfo = {
                  modelName: this.response?.discoveredModel ? this.response?.discoveredModel : this.response?.profileName,
                  macAddress: this.response?.discoveredMacAddress ? this.response?.discoveredMacAddress : this.response?.macAddress,
                  registrationId: this.response?.discoveredRegistrationId ? this.response?.discoveredRegistrationId : this.response?.registrationId,
                  opMode: deviceopmode[0]?.opModeWithOnt ? deviceopmode[0].opModeWithOnt : 'ONT',
                  softwareVersion: this.response?.discoveredVersion,
                  serialNumber: this.response?.discoveredSerialNumber ? this.response?.discoveredSerialNumber : this.response?.serialNumber,
                  fsan: this.response?.fsan ? this.response?.fsan : this.response?.ontId,
                  vendorId: this.response?.discoveredVendorId,
                  discoveredPonPort: this.response?.discoveredPonPort,
                  location: `${this.response?.region}/${this.response?.location}`,
                  oltName: this.response?.oltName,
                  ontId: this.response?.ontId,
                  status: this.response?.state,
                  isAeOnt:this.response?.isAeOnt
                }
                if(value){
                  this.TimeseriesApiCall(system,'',this.ontsysInfo,true)
                }
                if (this.ontsysInfo?.opMode === 'ONT/RG' && this.ontsysInfo?.modelName) {
                  if ((this.ontsysInfo?.modelName).indexOf("GS") !== -1 || (this.ontsysInfo?.modelName).indexOf("GM") !== -1 || (this.ontsysInfo?.modelName).indexOf("GPR") !== -1) {
                    this.iqsuitEnable = true;
                  } else {
                    this.iqsuitEnable = false;
                  }
                }
                if (this.ontsysInfo?.opMode === 'ONT') {
                  let obj = this.Modelitems?.find(o => o === this.ontsysInfo?.modelName);
                  if (obj) {
                    if ((this.ontsysInfo?.modelName).indexOf("GS") !== -1 || (this.ontsysInfo?.modelName).indexOf("GM") !== -1 || (this.ontsysInfo?.modelName).indexOf("GPR") !== -1) {
                      this.iqsuitEnable = true;
                    } else {
                      this.iqsuitEnable = false;
                    }
                  } else if (devices?.length == 1) {
                    this.iqsuitEnable = false
                  }
                }
              } else {
                this.ontsysInfo = {};
              }
              if ((deviceopmode[0]?.opModeWithOnt === 'ONT/RG') && !value) {
                //const systemid = devices[i]?.serialNumber ? devices[i]?.serialNumber : system
                this.getWIFIAvailability(system)
                this.deviceInfoSub = this.systemservice.getDeviceInfo(this.ORG_ID, this.serialNo ? this.serialNo : systemid).subscribe((res: any) => {
                  //this.deviceDatas = {};
                  if (res) {
                    this.deviceData[system] = res;
                  } else {
                    this.deviceData[system] = {};
                  }
                  this.ontsysInfo.ipAddress = res?.ipAddress;
                  this.ontsysInfo.secondIpAddress = res?.secondIpAddress;
                  this.ontsysInfo.registrationId = res?.registrationId;
                  this.ontsysInfo.hardwareSerialNumber = res?.hardwareSerialNumber;
                  this.ontsysInfo.lastInformTime = res?.lastInformTime;
                  if ((res?.opMode === 'RG') && res?.modelName) {
                    if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
                      this.iqsuitEnable = true;
                    } else {
                      this.iqsuitEnable = false;
                    }
                  }
                  //this.getMetaData(system, this.ontsysInfo);
                  this.RGLoader = false;
                }, (err: HttpErrorResponse) => {
                  this.pageErrorHandle(err);
                  this.deviceloader = false;
                  this.RGLoader = false;
                })
              }
              if (value === true) {
                this.statusont = this.ontsysInfo?.status
              } else {
                if (this.opModeont === 'ONT/RG') {
                  this.getMetaData(system, this.ontsysInfo);
                } else {
                  this.getMetaData(system, this.ontsysInfo);
                }

              }

            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.deviceloader = false;
            })


          } else {
            this.deviceInfoSub = this.systemservice.getDeviceInfo(this.ORG_ID, systemid).subscribe((res: any) => {
              if (res) {
                this.deviceData[system] = res;
              } else {
                this.deviceData[system] = {};
              }
              if (value === true && opMode !== 'WAP') {
                this.opModeont = devices[i]?.opModeWithOnt;
                this.macAddress = res?.macAddress;
                this.ipAddress = res?.ipAddress;
                this.ipV6SitePrefix = res?.secondIpAddress;
                this.registrationId = res?.registrationId;
                this.softwareVersion = res?.softwareVersion;
                this.lastInformTime = res?.lastInformTime;
                this.modelName = res?.modelName;
              }
              if (value === true && opMode === 'WAP') {
                this.opModeont = devices[i]?.opModeWithOnt;
                this.macAddressWAP = res?.macAddress;
                this.ipAddress = res?.ipAddress;
                this.ipV6SitePrefix = res?.secondIpAddress;
                this.registrationId = res?.registrationId;
                this.softwareVersion = res?.softwareVersion;
                this.lastInformTimeWAP = res?.lastInformTime;
                this.modelNameWAP = res?.modelName;
                this.serviceSystem[index].device.lastInformTime = res?.lastInformTime
              }
              this.RGLoader = false;
              this.opMode = res?.opMode;
              if ((this.opMode === 'RG') && res?.modelName) {
                this.getWIFIAvailability(res?.serialNumber)
                if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
                  this.iqsuitEnable = true;
                } else {
                  this.iqsuitEnable = false;
                }
              }
              this.opModedisplay = (this.opMode == 'RG' ? '(RG)' : (this.opMode == 'WAP' || this.opMode == "WAP-IGMP") ? this.opMode.replace(
                "WAP-IGMP",
                "Mesh(SAT)"
              ).replace("WAP", "Mesh(SAT)") : this.opMode == 'Managed ONT' ? "(Managed ONT)" : "")
              if (!value) {
                setTimeout(() => {
                  this.getMetaData(system, res);
                }, 500);

              }
            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.RGLoader = false;
              this.deviceloader = false;
            })
          }
        }

      }
    } else {
      this.deviceInfoSub = this.systemservice.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
        //this.deviceDatas = {};
        if (res) {
          this.deviceData[system] = res;
        } else {
          this.deviceData[system] = {};
        }
        if (value === true) {
          this.macAddress = res?.macAddress;
          this.ipAddress = res?.ipAddress;
          this.ipV6SitePrefix = res?.secondIpAddress;
          this.registrationId = res?.registrationId;
          this.modelName = res?.modelName;
          this.softwareVersion = res?.softwareVersion
        }
        //this.opModeont = devices[i]?.opModeWithOnt;
        this.RGLoader = false;
        this.opMode = this.opModeont ? this.opModeont : res?.opMode;
        if ((this.opMode === 'RG') && res?.modelName) {
          this.getWIFIAvailability(res?.serialNumber)
          if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
            this.iqsuitEnable = true;
          } else {
            this.iqsuitEnable = false;
          }
        }
        this.opModedisplay = (this.opMode == 'RG' ? '(RG)' : (this.opMode == 'WAP' || this.opMode == "WAP-IGMP") ? this.opMode.replace(
          "WAP-IGMP",
          "Mesh(SAT)"
        ).replace("WAP", "Mesh(SAT)") : this.opMode == 'Managed ONT' ? "(Managed ONT)" : "")
        if (!value) {
          setTimeout(() => {
            this.getMetaData(system, res);
          }, 500);
        }



      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.deviceloader = false;
        this.RGLoader = false;
      })
    }

  }
  getupdownstreamoctets(device, value?,data?) {
    let fqnduplicatecheck: boolean = false
    let devices = this.deviceInformation?.devices;
    if (devices) {
      for (var i = 0; i < devices?.length; i++) {
        let serialNo = devices[i]?.serialNumber
        if (devices[i]?.deviceId.toUpperCase() === device.toUpperCase() || devices[i]?.serialNumber
          === device.toUpperCase()) {
          if (devices[i]?.ont) {
            this.oltid = devices[i].ont
            this.fsan = device
            this.serialNum = (devices[i]?.ont?.vendorId + devices[i]?.ont?.serialNo);
            let systemid = (devices[i]?.ont?.vendorId + '00' + devices[i]?.ont?.serialNo);
            this.opModeont = devices[i]?.opModeWithOnt;
            const fsanMac = devices[i]?.serialNumber.toUpperCase()
            if (value == true) {
              this.upsteamLoader = true
            }

            setTimeout(() => {
            if(!this.ontsysInfo?.isAeOnt){
            this.supportrouterservice.loadinterfacearraydetails(data?.oltUuid ?data?.oltUuid:devices[i].ont.uuid, fsanMac).subscribe((res: any) => {
              if (res?.length) {
                const requests = [];
                res.forEach(endpoint => {
                  let iftypevalue = endpoint.ifType
                  if (iftypevalue == "ethernetCsmacd") {
                    fqnduplicatecheck = endpoint?.fqn?.split(',')?.find(x => x?.startsWith('CTP=')) ? true : false
                  }
                  if (iftypevalue == "bbfOnuVEnet" || iftypevalue == "bridge" || (iftypevalue == "ethernetCsmacd" && !fqnduplicatecheck)) {
                    this.iftypearr.push(iftypevalue)

                    const req = this.supportrouterservice.loadoctetdetails(endpoint.uuid, fsanMac).pipe(map((res: any) => {
                      return res;
                    }),
                      catchError((error: any) => {
                        this.upsteamLoader = false
                        return of(error);
                      }));
                    requests.push(req);

                  }
                });
                this.combineLatest = combineLatest(requests);
                this.xmlparsing(systemid);

              } else {
                this.upsteamLoader = false
              }

            }, err => {
              this.pageErrorHandle(err);
              this.upsteamLoader = false
            });
          }
        }, 500);
        }
        }
      }
    }
  }
  findAbs(key, octet) {
    return Math.abs((this.dataObj[key] || 0) - octet);
  }
  OntRefresh(device, value?,data?) {
    this.dataObj.upDownStreamSetTime = new Date().getTime();
    if (!this.NotSupported) {
      this.dataObj.downstramoctet = (!this.downstramoctet || this.downstramoctet == 'NA') ? 0 : this.downstramoctet;
      this.dataObj.upstreamoctet = (!this.upstreamoctet || this.upstreamoctet == 'NA') ? 0 : this.upstreamoctet;
      this.downstramoctet = "NA";
      this.upstreamoctet = "NA";
      this.getupdownstreamoctets(device, value,data);
    } else {
      this.downstramoctet = "NA";
      this.upstreamoctet = "NA";
      this.getupdownstreamoctets(device, value,data);
    }

  }
  xmlparsing(fsanMac) {
    this.bandwidthL2 = [];
    this.combineLatest.subscribe((response: any) => {

      var upstreamsum = 0;
      var downstreamsum = 0;
      let testflag = 0
      for (let i = 0; i < response.length; i++) {
        if (response[i].message && response[i].status === "SUCCESS") {
          testflag = 1
          let xmlresponse = response[i].message
          this.exosModel = response[i].message
          let parser = new DOMParser();
          let parsedresponse = parser.parseFromString(xmlresponse, "text/xml");
          if (this.iftypearr[i] == "ethernetCsmacd") {

            if ((parsedresponse.getElementsByTagName("service-role")[0]) !== undefined) {
              var serviceroledata = parsedresponse.getElementsByTagName("service-role")[0];
              var serviceroledatachild = serviceroledata.childNodes[0];
              var servicerolevalue = serviceroledatachild.nodeValue

              if (servicerolevalue === "uni") {
                if ((parsedresponse.getElementsByTagName("upstream-octets")[0]) !== undefined) {

                  var upnode = parsedresponse.getElementsByTagName("upstream-octets")[0]; //in-octets
                  var upchild = upnode.childNodes[0];
                  var upnodevalue = JSON.parse(upchild.nodeValue)
                  upstreamsum = upstreamsum + upnodevalue;

                  var downnode = parsedresponse.getElementsByTagName("downstream-octets")[0]; //out-octets
                  var downchild = downnode.childNodes[0];
                  var downnodevalue = JSON.parse(downchild.nodeValue)
                  downstreamsum = downstreamsum + downnodevalue;

                }
              }
            }

          }
          else {

            if ((parsedresponse.getElementsByTagName("upstream-octets")[0]) !== undefined) {

              var upnode = parsedresponse.getElementsByTagName("upstream-octets")[0];
              var upchild = upnode.childNodes[0];
              var upnodevalue = JSON.parse(upchild.nodeValue)
              upstreamsum = upstreamsum + upnodevalue;

              var downnode = parsedresponse.getElementsByTagName("downstream-octets")[0];
              var downchild = downnode.childNodes[0];
              var downnodevalue = JSON.parse(downchild.nodeValue)
              downstreamsum = downstreamsum + downnodevalue;

            }

          }
        }
      }
      this.fsanMac = fsanMac;
      this.l2bandwidth[fsanMac] = {
        "fsanMac": this.fsanMac,
        "downstreamsum": downstreamsum,
        "upstreamsum": upstreamsum
      }

      if (testflag == 0) {
        this.downstramoctet = "NA";
        this.upstreamoctet = "NA";
      }
      else {
        this.downstramoctet = downstreamsum;
        this.upstreamoctet = upstreamsum;
        if (this.exosModel.includes("operation not supported")) {
          this.NotSupported = true;
          this.downstramoctet = "Not Supported";
          this.upstreamoctet = "Not Supported"
        }
      }

      this.bandwidthL2.push(this.l2bandwidth)

      this.upsteamLoader = false
      // if (this.devices) {
      //   if (Object.keys(this.bandwidthL2).length) {
      //     this.l2stream = Object.values(this.bandwidthL2[0])
      //     this.devices.forEach(element => {
      //       this.l2stream.forEach(element1 => {
      //         if (element === element1.fsanMac) {
      //           this.serviceinfo[element].downstramoctet = element1.downstreamsum
      //           this.serviceinfo[element].upstreamoctet = element1.upstreamsum
      //         }

      //       });
      //     });
      //     this.serviceForm();
      //   }
      // } else if (this.sN) {
      //   if (Object.keys(this.bandwidthL2).length) {
      //     this.l2stream = Object.values(this.bandwidthL2[0]);
      //     if (this.sN === this.l2stream[0]?.fsanMac) {
      //       this.serviceinfo[this.sN].downstramoctet = this.l2stream[0].downstreamsum
      //       this.serviceinfo[this.sN].upstreamoctet = this.l2stream[0].upstreamsum
      //     }
      //   }
      //   this.serviceForm();
      // }

    }, (err: HttpErrorResponse) => {
      this.deviceloader = false;
      this.upsteamLoader = false
    }, () => {

    })
  }
  getMetaData(system, device?) {
    this.deviceloader = true;
    if ((device?.opMode == 'RG' || device?.opMode == 'ONT/RG')) {
      this.systemFsan = device?.fsan ? device?.fsan.toUpperCase() : device?.serialNumber ? device?.serialNumber.toUpperCase() : system.toUpperCase()
      this.getmetaDataSub = this.systemservice.fetchMetaData(this.ORG_ID, this.systemFsan).subscribe((res: any) => {
        this.metaData = res || {};
        res.properties.forEach(obj => {
          this.reStructureMeta(obj);
        });
        this.systemservice.setMetaData(this.latestFSAN, this.metaData);
        if (this.metaData && (this.metaData.RadioStatus24G || this.metaData.RadioStatus5G)) {
          this.showRadioSummary = true;
          setTimeout(() => {
            this.getRadioSummary(system, this.showRadioSummary, device);
          }, 500);

        } else {
          this.showRadioSummary = false;
          setTimeout(() => {
            this.getRadioSummary(system, this.showRadioSummary, device);
          }, 500);
        }
      }, err => {
        setTimeout(() => {
          this.getRadioSummary(system, this.showRadioSummary, device);
        }, 500);
      });
    } else {
      setTimeout(() => {
        this.getRadioSummary(system, this.showRadioSummary, device);
      }, 500);
    }

  }
  getRadioSummary(system, summary, device) {
    this.deviceloader = true;
    //CCL-43399
    this.systemFsan = device?.fsan ? device?.fsan.toUpperCase() : device?.serialNumber ? device?.serialNumber.toUpperCase() : system.toUpperCase()
    this.getstatussub = this.systemservice.getRadiosummary(this.ORG_ID, this.systemFsan).subscribe((res: any) => {
      if (summary) {
        this.radioData = res ? res : {};
      } else {
        this.radioData = res ? res : {};
      }

      setTimeout(() => {
        this.TimeseriesApiCall(system, this.radioData, device);
      }, 1000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.deviceloader = false;
    })
  }
  showHealthONT(isAeOnt,fsan) {
    // let query = {
    //   fsan: fsan
    // }
    // this.router.navigate(['/cco/health/ont'], { queryParams: query });

    if(isAeOnt){
      window.open('/cco/health/ae?fsan=' + fsan, '_blank');
    }else{
      window.open('/cco/health/ont?fsan=' + fsan, '_blank');
    }
  }

  showOltDetails(device,index,discoveredPonPort?) {
    if(!device?.oltName) return;
    let oltUuid=this.refreshDetails &&this.response?.oltUuid ?this.response?.oltUuid:this.deviceInformation?.devices[index].ont.uuid
    this.http.get(`${environment.API_BASE_URL}nfa/systems/details/${oltUuid}`).subscribe((resp: any) => {
      const payload = discoveredPonPort ? {...resp,discoveredPonPort} : resp;
      localStorage.setItem("calix.network.system.details", JSON.stringify(payload));
      window.open('/cco/system/cco-network-system/show-details', '_blank');
    }, (err: any) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }

  TimeseriesApiCall(fsan, radioData, device,val?) {
    let devices = this.deviceInformation?.devices;
    if (devices) {
      for (var i = 0; i < devices?.length; i++) {
        let serialNo = devices[i]?.serialNumber
        if (devices[i]?.deviceId?.toUpperCase() === fsan.toUpperCase() || devices[i]?.serialNumber
          === fsan.toUpperCase()) {
          if (devices[i]?.ont) {
            this.oltid = devices[i].ont 
            this.fsan =device?.ontId ?device?.ontId :null
            this.serialNum = (devices[i]?.ont?.vendorId + devices[i]?.ont?.serialNo);
            let systemid = devices[i]?.serialNumber ? devices[i]?.serialNumber : (devices[i]?.ont?.vendorId + '00' + devices[i]?.ont?.serialNo);
            this.opModeont = devices[i]?.opModeWithOnt;
            const fsanMac = devices[i]?.serialNumber?.toUpperCase()
            let date = new Date();
            this.lowFromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
            this.lowToDate = new Date();
            let params = {
              tenant: "0",
              startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate)}`,
              endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)}`,
              fsan: systemid.toUpperCase()
            }
            params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
            let query = "";
            for (var key in params) {
              if (params[key] == undefined || params[key] == "undefined" || params[key] == "") {
                continue;
              }
              if (query != "") {
                query += "&";
              }
              query += key + "=" + encodeURIComponent(params[key]);

            }
            var rxOptPwr1 = [], neOptSignalLvl1 = []
            if(!this.ontsysInfo?.isAeOnt){
            this.timeseries = this.systemservice.getOntDetails(devices[i].ont.uuid, this.fsan).subscribe((res: any) => {
             
              if (res?.oltRxPower || res?.ontRxPower) {
                let oltRxPower= this.oltRxPower=res?.oltRxPower =='not-supported'||res?.oltRxPower == 'not supported' ||res?.oltRxPower =='na' ?'Not Supported':res?.oltRxPower !=='0.000'&& res?.oltRxPower !== undefined?`${res?.oltRxPower} dBm`:'-';
                let ontRxPower= this.ontRxPower=res?.ontRxPower=='not-supported'||res?.ontRxPower == 'not supported'|| res?.ontRxPower =='na'? 'Not Supported':(res?.ontRxPower && res?.ontRxPower.includes('dBm'))? res?.ontRxPower:res?.ontRxPower !=='0.000' && res?.ontRxPower !==undefined ?`${res?.ontRxPower} dBm`:'-';
              //   this.starttimetoendtime(params.startTime, params.endTime, params["granularity"], res)
              //   for (let i = 0; i < this.timestamp.length; i++) {
              //     let dataobj = this.findObject(res, this.timestamp[i]);
              //     rxOptPwr1.push(dataobj.rxOptPwr || dataobj.rxOptPwr == 0 ? dataobj.rxOptPwr < -40 ? null : dataobj.rxOptPwr : null)
              //     neOptSignalLvl1.push(dataobj.neOptSignalLvl || dataobj.neOptSignalLvl == 0 ? dataobj.neOptSignalLvl < -40 ? null : dataobj.neOptSignalLvl : null)
              //   }
              //   this.ontRxPower = 0;
              //   if (rxOptPwr1.length > 0) {
              //     for (let i = (rxOptPwr1.length - 1); i >= 0; i--) {
              //       if (rxOptPwr1[i] && rxOptPwr1[i] > -40) {
              //         this.ontRxPower = rxOptPwr1[i].toFixed('2');
              //         break;
              //       }
              //     }
              //   }
              //   this.oltRxPower = 0;
              //   if (neOptSignalLvl1.length > 0) {
              //     for (let i = (neOptSignalLvl1.length - 1); i >= 0; i--) {
              //       if (neOptSignalLvl1[i] && neOptSignalLvl1[i] > -40) {
              //         this.oltRxPower = neOptSignalLvl1[i].toFixed('2');
              //         break;
              //       }
              //     }
              //   }
              //   // this.getValue(rxOptPwr1, fsan);
              //   // this.getTxLevel(neOptSignalLvl1, fsan);
              if(!val){
                setTimeout(() => {
                  this.connectivityStatus(fsan, device, radioData, this.ontRxPower, this.oltRxPower);
                }, 100);}
              } else {
                let ontRxPower = 0;
                let oltRxPower = 0;
                if (!val) {
                  setTimeout(() => {
                    this.connectivityStatus(fsan, device, radioData, ontRxPower, oltRxPower);
                  }, 100);
                }
              }


            }, (err) => {
              setTimeout(() => {
                let ontRxPower = 0;
                let oltRxPower = 0;
                this.connectivityStatus(fsan, device, radioData, ontRxPower, oltRxPower);
              }, 100);
            });
          } else {
            setTimeout(() => {
              let ontRxPower = 0;
              let oltRxPower = 0;
              this.connectivityStatus(fsan, device, radioData, ontRxPower, oltRxPower);
            }, 1000);
          }

          } else {
            setTimeout(() => {
              let ontRxPower = 0;
              let oltRxPower = 0;
              this.connectivityStatus(fsan, device, radioData, ontRxPower, oltRxPower);
            }, 1000);
          }
        }
      }
    }



  }
  getValue(value, fsan) {
    this.ontRxPower = 0;
    if (value.length > 0) {
      for (let i = (value.length - 1); i >= 0; i--) {
        if (value[i] && value[i] > -40) {
          this.ontRxPower = value[i].toFixed('2');
          break;
        }
      }
    }
  }
  findObject(jsObjects, value: any) {
    let rtrn: any = {};

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['timestamp'] == value) {
          rtrn = jsObjects[i];
          break;
        }
      }
    }
    return rtrn
  }

  getTxLevel(value, fsan) {
    this.oltRxPower = 0;
    if (value.length > 0) {
      for (let i = (value.length - 1); i >= 0; i--) {
        if (value[i] && value[i] > -40) {
          this.oltRxPower = value[i].toFixed('2');
          break;
        }
      }
    }

  }
  starttimetoendtime(start, end, diff, data) {
    // console.log(start, typeof (start), end);
    let startTime = new Date(parseInt(start) * 1000);
    let endTime = new Date(parseInt(end) * 1000);
    // console.log(startTime, typeof (startTime), endTime);
    // console.log(this.dateUtilsService.getUtCSecondsByDateObj(startTime, false), this.dateUtilsService.getUtCSecondsByDateObj(endTime, true));
    let endloop = this.dateUtilsService.getUtCSecondsByDateObj(endTime, true)
    this.timestamp = [];
    if (diff == "15min") {
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        startTime.setMinutes(startTime.getMinutes() + 15);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "1hour") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setMinutes(mindiff.getMinutes());
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        startTime.setHours(startTime.getHours() + 1);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "24hour") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setHours(mindiff.getHours());
      startTime.setMinutes(mindiff.getMinutes());
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        // startTime.setHours(startTime.getHours()+1);
        startTime.setDate(startTime.getDate() + 1);
        //console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "1month") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setHours(mindiff.getHours());
      startTime.setMinutes(mindiff.getMinutes());
      startTime.setDate(mindiff.getDate());
      // console.log(new Date(startTime), 'nothing')
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        // startTime.setHours(startTime.getHours()+1);
        startTime.setMonth(startTime.getMonth() + 1);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    // console.log(this.timestamp, 'timestamps');
  }

  connectivityStatus(system, device, radio, ontRxPower, oltRxPower, value?, opmode?, i?) {
    this.indexRefresh = i;
    if ((opmode == 'RG' || opmode == 'ONT/RG' || opmode == 'WAP') && value) {
      if (opmode == 'RG') {
        this.connectionLoader = true
      }
      let fsan = device?.fsan ? device?.fsan : device?.serialNumber ? device?.serialNumber : system
      this.supportrouterservice.getConnectivityStatusNew(this.ORG_ID, fsan, true).subscribe((res: any) => {
        if (res && opmode !== 'WAP') {
          this.info = 'Done'
          this.connection = res?.status;
          this.upTime = res?.connectivityStatus?.Uptime ? this.timeToDays(res?.connectivityStatus?.Uptime) : '-'
        } else if (res && opmode === 'WAP') {
          this.info = 'Done'
          this.connectionWAP = res?.status;
          this.upTimeWAP = res?.connectivityStatus?.Uptime ? this.timeToDays(res?.connectivityStatus?.Uptime) : '-'
          this.serviceSystem[i].connected = res
        }
        this.connectionLoader = false

      }, err => {
        this.connected = false;
        if (opmode === 'WAP') {
          this.connectionWAP = 'Offline';
          this.upTimeWAP = '-'
          this.serviceSystem[i].connected = this.connected
          this.info = 'NotDone'
        } else {
          this.connection = 'Offline';
          this.upTime = '-'
          this.info = 'NotDone'
        }
        this.connectionLoader = false
        this.deviceloader = false;
        if (err?.error?.status === "423 Locked") {
          this.pageErrorHandle(err);
          this.connected = undefined;
        }
        // this.getDmzData();
        //this.pageErrorHandle(err);
      });
    } else if ((device?.opMode == 'RG' || device?.opMode == 'ONT/RG' || device?.opMode == 'WAP')) {
      let fsan = device?.fsan ? device?.fsan : device?.serialNumber ? device?.serialNumber : system
      this.supportrouterservice.getConnectivityStatusNew(this.ORG_ID, fsan, true).subscribe((res: any) => {
        this.connected = res;
        setTimeout(() => {
          this.ONTipaddressCheck(system, device, radio, this.connected, ontRxPower, oltRxPower);
        }, 10);
      }, err => {
        this.connected = false;
        setTimeout(() => {
          this.ONTipaddressCheck(system, device, radio, this.connected, ontRxPower, oltRxPower);
        }, 10);
        this.deviceloader = false;
        if (err?.error?.status === "423 Locked") {
          this.pageErrorHandle(err);
          this.connected = undefined;
        }
        // this.getDmzData();
        //this.pageErrorHandle(err);
      });
    } else if (!value) {
      setTimeout(() => {
        this.ONTipaddressCheck(system, device, radio, this.connected, ontRxPower, oltRxPower);
      }, 10);
    }

  }
  ONTipaddressCheck(system, device, radio,connected, ontRxPower, oltRxPower, value?){
  
    if ((device?.opMode == 'ONT' || device?.opMode == 'ONT/RG') &&  ( !this.dataser?.staticIpAddress && !this.dataService?.staticIp) &&(!this.dataService?.pppoeUsername && !this.dataser?.pppoeUsername) &&(this.dataService?.usoc || (this.usoc && this.dataser?.activate))) {
      let fsan = device?.fsan ? device?.fsan : device?.serialNumber ? device?.serialNumber : system
      this.IpAddressNewOnt=[]
    this.systemservice.getONTIpaddress(this.ORG_ID,fsan).subscribe((res:any)=>{
      let aggrGroupValue = ((res?.aggGroup || '').replace(/-/g, '').replace(/0/g, '').length)
      // if(!aggrGroupValue) {
      //   this.IpAddressNewOnt=res?.ipAddress;
      // }
      if(aggrGroupValue){
        this.systemservice.getONTIpAddresswithAggGroup(res.aggGroup,this.ORG_ID).subscribe((resp:any) =>{
          resp.forEach(element => {
            if(element?.ipPreference == "PRIMARY_IP" && element?.ipAddress){
              this.IpAddressNewOnt.push(element?.ipAddress);
              
              this.IpAddressNewOnt = [...new Set(this.IpAddressNewOnt)]
            }
          });
        //   this.IpAddressNewOnt=resp[0]?.ipAddress
        // const IpAddressNewOnt = resp[0]?.ipAddress
        setTimeout(() => {
          this.formatListData(system, device, radio, connected, ontRxPower, oltRxPower,this.IpAddressNewOnt);
        }, 10);
        })
      }else{
        this.IpAddressNewOnt.push(res?.ipAddress);
        setTimeout(() => {
          this.formatListData(system, device, radio, connected, ontRxPower, oltRxPower,this.IpAddressNewOnt);
        }, 10);
      }
    })
   }else{
    setTimeout(() => {
      this.formatListData(system, device, radio, connected, ontRxPower, oltRxPower);
    }, 10);
   }
  }
  formatListData(id, device?, radio?, connected?, ontRxPower?, oltRxPower?, IpAddressNewOnt?) {
    this.deviceloader = true;
    if (device?.serialNumber) {
      this.deviceInfo = device;
    } else {
      this.deviceInfo = {};
    }
    if (status) {
      this.systemStatus = status;
    } else {
      this.systemStatus = '';
    }
    if (radio) {
      if (radio['2.4G']?.RadioEnabled == "true") {
        this.radioEnable2Hz = 'ON'
      }
      else if (radio['2.4G']?.RadioEnabled == "false") {
        this.radioEnable2Hz = 'OFF'
      }
      if (radio['5G']?.RadioEnabled == "true") {
        this.radioEnable5Hz = 'ON'
      }
      else if (radio['5G']?.RadioEnabled == "false") {
        this.radioEnable5Hz = 'OFF'
      }
      if (this.radioData['6G']?.RadioEnabled == "true") {
        this.radioEnable6Hz = 'ON'
      }
      else if (this.radioData['6G']?.RadioEnabled == "false") {
        this.radioEnable6Hz = 'OFF'
      }
    }



    this.servicesFormData[id] = {
      system: id,
      configuredService: 'Yes',
      opMode: device?.opMode,
      modelName: device?.modelName,
      data: {},
      video: {},
      voice: {},
      device: this.deviceInfo ? this.deviceInfo : device,
      status: this.systemStatus,
      radioEnable2Hz: this.radioEnable2Hz,
      radioEnable5Hz: this.radioEnable5Hz,
      radioEnable6Hz: this.radioEnable6Hz,
      connected: connected,
      ontRxPower: ontRxPower,
      oltRxPower: oltRxPower,
      IpAddressNewOnt: IpAddressNewOnt
    };


    setTimeout(() => {
      this.serviceForm();
    }, 500);

  }

  serviceForm() {
    //debugger;
    this.deviceloader = true;
    this.systeminfo = Object.keys(this.servicesFormData);
    this.serviceinfo = Object.values(this.servicesFormData)
    if (this.devices) {
      if (this.serviceinfo.length === this.devices?.length || this.serviceinfo.length === this.deviceInformation?.devices?.length) {
        const order = {
          'ONT': 1,
          'RG': 2,
          'WAP': 3
        }
        this.serviceinfo = this.serviceinfo.sort((a, b) => {
          let opmodeA = a['ONT'] ? 'ONT' : a?.device?.opMode ? a?.device?.opMode : '';
          let opmodeB = b['ONT'] ? 'ONT' : b?.device?.opMode ? b?.device?.opMode : '';
          return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
        });
        this.serviceSystem = this.serviceinfo;
       
      }
    } else {
      this.serviceSystem = this.serviceinfo;
      
    }
    Object.assign([],this.serviceSystem)?.forEach((e,i,arr) => {
      this.systemservice.checkSwapStatus(e.system, this.ORG_ID).subscribe((res: any) => {
        if(res?.replacingBy && this.serviceSystem.every(e=> e.system !== res?.replacingBy)){
          this.serviceSystem.splice(i,0,{ system: res.replacingBy, device: { fsan: res.replacingBy },replacingBy:true })
        }
          this.deviceloader = !(arr.length-1 === i); 
      },err=>{
        this.deviceloader = !(arr.length-1 === i);
      })
    })
    // console.clear();

  }
  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['arlo'] = entitlement[206] ? entitlement[206] : [];
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['arloUnlimited'] = entitlement[212] ? entitlement[212] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
    entitlement['arloUnlimitedPlus'] = entitlement[213] ? entitlement[213] : [];
    entitlement['Platinum'] = entitlement[215] ? entitlement[215] : [];
    entitlement['Silver'] = entitlement[216] ? entitlement[216] : [];
    entitlement['Gold'] = entitlement[217] ? entitlement[217] : [];
    entitlement['Bark_Premium'] = entitlement[219] ? entitlement[219] : [];
    entitlement['Bark_Junior'] = entitlement[220] ? entitlement[220] : [];
    entitlement['smallBizIQ'] = entitlement[218] ? entitlement[218] : [];
    if (entitlement && entitlement?.smallBizIQ?.apptype === 218) {
      this.smallBizIQentitlement = true;
    }
    else {
      this.smallBizIQentitlement = false;
    }
    if (entitlement && entitlement['Bark_Premium'] && (entitlement['Bark_Premium'].name === "Bark Premium")) {
      this.Bark_Premiumentitlement = true;
    }
    else {
      this.Bark_Premiumentitlement = false;
    }
    if (entitlement && entitlement['Bark_Junior'] && (entitlement['Bark_Junior'].name === "Bark Junior")) {
      this.Bark_Juniorentitlement = true;
    }
    else {
      this.Bark_Juniorentitlement = false;
    }
    if (entitlement && entitlement['arlo'] && (entitlement['arlo'].name === "ARLO")) {
      this.arloEnableentitlement = true;
    }
    else {
      this.arloEnableentitlement = false;
    }
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222 || entitlement['223']?.apptype === 223)) {
      this.myCommunityIqEntitlement = true;
      this.GetMicrosites();
    }
    else {
      this.myCommunityIqEntitlement = false;
    }
    if (entitlement && entitlement['arloUnlimited'] && (entitlement['arloUnlimited'].name === "ARLO Unlimited")) {
      this.arloUnlimitedentitlement = true;
    }
    else {
      this.arloUnlimitedentitlement = false;
    }
    if (entitlement && entitlement['arloUnlimitedPlus'] && (entitlement['arloUnlimitedPlus'].name === "ARLO Unlimited Plus")) {
      this.arloUnlimitedplusentitlement = true;
    }
    else {
      this.arloUnlimitedplusentitlement = false;
    }
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    if (entitlement && entitlement['Servify'] && (entitlement['Servify'].name === "Servify Bronze")) {
      this.ServifyEnableentitlement = true;
    }
    else {
      this.ServifyEnableentitlement = false;
    }
    if (entitlement && entitlement['Platinum'] && (entitlement['Platinum'].name === "Servify Platinum")) {
      this.ServifyPlatinumentitlement = true;
    }
    else {
      this.ServifyPlatinumentitlement = false;
    }
    if (entitlement && entitlement['Silver'] && (entitlement['Silver'].name === "Servify Silver")) {
      this.ServifySilverentitlement = true;
    }
    else {
      this.ServifySilverentitlement = false;
    }
    if (entitlement && entitlement['Gold'] && (entitlement['Gold'].name === "Servify Gold")) {
      this.ServifyGoldentitlement = true;
    }
    else {
      this.ServifyGoldentitlement = false;
    }
    if (entitlement && entitlement['ProtectIQ'] && (entitlement['ProtectIQ'].name === "ProtectIQ")) {
      this.productIQEnableentitlement = true;
    }
    else {
      this.productIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ'] && (entitlement['ExperienceIQ'].name === "ExperienceIQ")) {
      this.ExperienceIQEnableentitlement = true;
    }
    else {
      this.ExperienceIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ And ProtectIQ'] && (entitlement['ExperienceIQ And ProtectIQ'].name === "ExperienceIQ And ProtectIQ")) {
      this.proAndExpEnableentitlement = true;
    }
    else {
      this.proAndExpEnableentitlement = false;
    }
  }
  isAutomaticallyCreatedData: any;
  OntSvlan = '';
  unknownSvlan = ''
  getServicesStatus() {
    this.serviceStatusLoading = true;
    this.allSubsServicesStatusSubs = this.ccoService.getServicesStatus(this.systemInfo.subscriberId).subscribe((res: any) => {
      console.log('status', res);
      this.statusRespone=res

      if (res) {
        if (res?.dataServices) {
          this.retryEnableData = res.dataServices.some((e) => e?.maxRetriesExceeded === "true")
          res.dataServices = res?.dataServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.voiceServices) {
          this.retryEnableVoice = res.voiceServices.some((e) => e?.maxRetriesExceeded === "true")
          res.voiceServices = res?.voiceServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        } if (res?.videoServices) {
          this.retryEnableVideo = res.videoServices.some((e) => e?.maxRetriesExceeded === "true")
          res.videoServices = res?.videoServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        // this.isAutomaticallyCreatedData =  (res?.dataServices[0]?.serviceId &&  res?.voiceServices[0]?.serviceId && res?.voiceServices.some(element=> res?.dataServices.some(data=> data.serviceId === element.serviceId))) ;
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {
          this.isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedData?.serviceId);
        }
        if (res?.dataServices[0]?.serviceId && res?.videoServices[0]?.serviceId) {
          this.isAutomaticallyCreatedVideo = res?.dataServices?.find(element => res?.videoServices?.some(video => video.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedVideo?.serviceId);
        }

        if (res && res.dataServices && res.dataServices.length) {
          let l = res?.dataServices?.length - 1

          this.dataService = res.dataServices[0] ? res?.dataServices[0] : {};

          if (res.dataServices.length > 1) {
            let ontData = res?.dataServices?.find(element => element.cpeType == "ONT");
            this.dataService = ontData ? ontData : this.dataService;
          }
          if (this.dataService?.maxRetriesExceeded == "true") {
            this.dataService.maxRetriesExceeded = true
          } else {
            this.dataService.maxRetriesExceeded = false
          }
          this.dataStatus = `${res?.dataServices[0]?.ontIdentification}: ${res?.dataServices[0]?.subSvcState}`;
          this.dataDetails = `${res?.dataServices[0]?.ontIdentification}: ${res?.dataServices[0]?.errorDetails}`;
        } else {
          this.dataService = {};
        }
        if (res && res?.dataServices && res?.dataServices.length > 1) {
          let l = res?.dataServices?.length - 1
          this.dataservices1 = res?.dataServices[1] ? res?.dataServices[1] : {}
          let RGData = res?.dataServices?.find(element => element.cpeType == "RG");
          this.dataservices1 = (res.dataServices[1].cpeType !== "UNKNOWN" && RGData) ? RGData : this.dataservices1?.cpeType == "ONT" && res.dataServices[0].cpeType == "UNKNOWN" ? res.dataServices[0] : this.dataservices1;
          if (this.dataservices1?.maxRetriesExceeded == "true") {
            this.dataservices1.maxRetriesExceeded = true
          } else {
            this.dataservices1.maxRetriesExceeded = false
          }
          this.dataStatus1 = `${this.dataservices1?.ontIdentification}: ${this.dataservices1?.subSvcState}`;
          this.dataDetails1 = `${this.dataservices1?.ontIdentification}: ${this.dataservices1?.errorDetails}`;
        } else {
          this.dataservices1 = {};
        }
        let ontStatus = '', rgStatus = '', ontError = '', rgError = '', unknownStatus = '', onknownError = '';
        res?.dataServices?.forEach((element) => {
          if (element.cpeType == 'RG') {
            rgStatus += ((rgStatus ? ',<br> ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            rgError += ((rgError ? ', ' : '') + element.errorDetails);
          } else if (element.cpeType === 'ONT') {
            ontStatus += ((ontStatus ? ',<br> ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            ontError += ((ontError ? ', ' : '') + element.errorDetails);

          } else if (element.cpeType === 'UNKNOWN') {
            unknownStatus += ((unknownStatus ? ',<br> ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            onknownError += ((onknownError ? ', ' : '') + element.errorDetails);
          }
        });
        this.datasvcStatus = (ontStatus && rgStatus) ? ontStatus + ',<br> ' + rgStatus : (ontStatus) ? ontStatus + (unknownStatus ? ',<br> ' : '') + (unknownStatus ? unknownStatus : '') : rgStatus ? rgStatus + (unknownStatus ? ',<br> ' : '') + (unknownStatus ? unknownStatus : '') : unknownStatus ? unknownStatus : '';
        this.dataErrorDetails = (ontError && rgError) ? ontError + ', ' + rgError : (ontError) ? ontError + (!rgStatus && onknownError ? ', ' : '') + (!rgStatus && onknownError ? onknownError : '') : rgError ? rgError + (!ontStatus && onknownError ? ', ' : '') + (!ontStatus && onknownError ? onknownError : '') : (onknownError && (!ontStatus || !rgStatus)) ? onknownError : '';

        // this.datasvcStatus = (ontStatus && ontStatus.includes('Successfully Provisioned')) ? rgStatus ? rgStatus : ontStatus : ontStatus ? ontStatus + (rgStatus ? ', ' :'') + (rgStatus? rgStatus : '' ) : '';
        // this.dataErrorDetails = ontError ? ontError + ', ' + (rgError ? rgError : '') : rgError ? rgError : '' ;
        // let status1 = this.dataService?.subSvcState ? this.dataStatus : '';
        // let status2 = this.dataservices1?.subSvcState ? ` , ${this.dataStatus1}` : '';
        // this.datasvcStatus = status1 + status2
        // let details1 = (this.dataService?.errorDetails && this.dataService?.errorDetails !== 'null') ? this.dataDetails : '';
        // let details2 = (details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? ` , ${this.dataDetails1}` : (!details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? `${this.dataDetails1}` : '';
        // this.dataErrorDetails = details1 + details2;
        if (res && res?.videoServices && res?.videoServices?.length) {
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
          if (res.videoServices.length > 1) {
            let ontData = res?.videoServices?.find(element => element.cpeType == "ONT");
            this.videoServicesStatus = ontData ? ontData : this.videoServicesStatus;
          }

          if (this.videoServicesStatus?.maxRetriesExceeded == "true") {
            this.videoServicesStatus.maxRetriesExceeded = true
          } else {
            this.videoServicesStatus.maxRetriesExceeded = false
          }
          this.videoStatus = `${this.videoServicesStatus?.ontIdentification}: ${this.videoServicesStatus?.subSvcState}`;
          this.videoDetails = `${this.videoServicesStatus?.ontIdentification}: ${this.videoServicesStatus?.errorDetails}`;
        } else {
          this.videoServicesStatus = {};
        }
        if (res && res?.videoServices && res?.videoServices.length > 1) {
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus1 = res?.videoServices[1] ? res?.videoServices[1] : {}
          let RGData = res?.videoServices?.find(element => element.cpeType == "RG");
          this.videoServicesStatus1 = (res.videoServices[1].cpeType !== "UNKNOWN" && RGData) ? RGData : this.videoServicesStatus1?.cpeType == "ONT" && res.videoServices[0].cpeType == "UNKNOWN" ? res.videoServices[0] : this.videoServicesStatus1;

          if (this.videoServicesStatus1?.maxRetriesExceeded == "true") {
            this.videoServicesStatus1.maxRetriesExceeded = true
          } else {
            this.videoServicesStatus1.maxRetriesExceeded = false
          }
          this.videoStatus1 = `${this.videoServicesStatus1?.ontIdentification}: ${this.videoServicesStatus1?.subSvcState}`;
          this.videoDetails1 = `${this.videoServicesStatus1?.ontIdentification}: ${this.videoServicesStatus1?.errorDetails}`;
        } else {
          this.videoServicesStatus1 = {};
        }
        let videostatus1 = this.videoServicesStatus?.subSvcState ? this.videoStatus : '';
        let videostatus2 = this.videoServicesStatus1?.subSvcState ? ` ,<br> ${this.videoStatus1}` : '';
        this.videosvcStatus = videostatus1 + videostatus2
        let videodetails1 = (this.videoServicesStatus?.errorDetails && this.videoServicesStatus?.errorDetails !== 'null') ? this.videoDetails : '';
        let videodetails2 = (videodetails1 && this.videoServicesStatus1?.errorDetails && this.videoServicesStatus1?.errorDetails !== 'null') ? ` , ${this.videoDetails1}` : (!videodetails1 && this.videoServicesStatus1?.errorDetails && this.videoServicesStatus1?.errorDetails !== 'null') ? `${this.videoDetails1}` : '';
        this.videoErrorDetails = videodetails1 + videodetails2;
        if (res && res?.voiceServices && res?.voiceServices?.length) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
          if (this.dialPlanList?.length > 0) {
            this.dialPlanList.forEach(el => {
              if (el.value === this.voiceServicesStatus?.dialPlan) {
                this.voiceServicesStatus.dialPlan = el.displayName
              }
            })
          }
          if (this.voiceServicesStatus?.maxRetriesExceeded == "true") {
            this.voiceServicesStatus.maxRetriesExceeded = true
          } else {
            this.voiceServicesStatus.maxRetriesExceeded = false
          }
          this.voiceStatus = `${this.voiceServicesStatus?.ontIdentification} ${this.language['InterFace']} ${this.voiceServicesStatus?.interface}: ${this.voiceServicesStatus?.subSvcState}`;
          this.voiceDetails = `${this.voiceServicesStatus?.ontIdentification} ${this.language['InterFace']} ${this.voiceServicesStatus?.interface}: ${this.voiceServicesStatus?.errorDetails}`;
        } else {
          this.voiceServicesStatus = {};
        }
        if (res && res?.voiceServices && res?.voiceServices.length > 1) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus1 = res?.voiceServices[1] ? res?.voiceServices[1] : {}
          if (this.dialPlanList?.length > 0) {
            this.dialPlanList.forEach(el => {
              if (el.value === this.voiceServicesStatus1?.dialPlan) {
                this.voiceServicesStatus1.dialPlan = el.displayName
              }
            })
          }
          if (this.voiceServicesStatus1?.maxRetriesExceeded == "true") {
            this.voiceServicesStatus1.maxRetriesExceeded = true
          } else {
            this.voiceServicesStatus1.maxRetriesExceeded = false
          }
          this.voiceStatus1 = `${this.voiceServicesStatus1?.ontIdentification}: ${this.voiceServicesStatus1?.subSvcState}`;
          this.voiceDetails1 = `${this.voiceServicesStatus1?.ontIdentification}: ${this.voiceServicesStatus1?.errorDetails}`;
        } else {
          this.voiceServicesStatus1 = {};
        }
        let ontVoiceStatus = '', rgVoiceStatus = '', ontVoiceError = '', rgVoiceError = '', unknownVoiceStatus = '', onknownVoiceError = '';
        res?.voiceServices?.forEach((element) => {
          if (element.cpeType == 'RG') {
            rgVoiceStatus += ((rgVoiceStatus ? ',<br> ' : '') + `${element.ontIdentification} ${element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : ''} : ${element.subSvcState}`);
            rgVoiceError += element.errorDetails ? ((rgVoiceError ? ', ' : '') + (element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : '') + ': ' + element.errorDetails) : '';
          } else if (element.cpeType === 'ONT') {
            ontVoiceStatus += ((ontVoiceStatus ? ',<br> ' : '') + `${element.ontIdentification} ${element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : ''}: ${element.subSvcState}`);
            ontVoiceError += element.errorDetails ? ((ontVoiceError ? ', ' : '') + (element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : '') + ': ' + element.errorDetails) : '';
            this.OntSvlan += !this.OntSvlan.includes(element?.svlan) ? ((this.OntSvlan ? ', ' : '') + element?.svlan) : '';
          } else if (element.cpeType === 'UNKNOWN') {
            unknownVoiceStatus += ((unknownVoiceStatus ? ',<br> ' : '') + `${element.ontIdentification} ${element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : ''}: ${element.subSvcState}`);
            onknownVoiceError += element.errorDetails ? ((onknownVoiceError ? ', ' : '') + (element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : '') + ': ' + element.errorDetails) : '';
            this.unknownSvlan += !this.unknownSvlan.includes(element?.svlan) ? ((this.unknownSvlan ? ', ' : '') + element?.svlan) : '';

          }
        });
        this.voicesvcStatus = (ontVoiceStatus && rgVoiceStatus) ? ontVoiceStatus + ',<br> ' + rgVoiceStatus : (ontVoiceStatus) ? ontVoiceStatus + (unknownVoiceStatus ? ',<br> ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : rgVoiceStatus ? rgVoiceStatus + (unknownVoiceStatus ? ',<br> ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : unknownVoiceStatus ? unknownVoiceStatus : '';
        this.voiceErrorDetails = (ontVoiceError && rgVoiceError) ? ontVoiceError + ', ' + rgVoiceError : (ontVoiceError) ? ontVoiceError + (!rgVoiceStatus && onknownVoiceError ? ', ' : '') + (!rgVoiceStatus && onknownVoiceError ? onknownVoiceError : '') : rgVoiceError ? rgVoiceError + (!ontVoiceStatus && onknownVoiceError ? ', ' : '') + (!ontVoiceStatus && onknownVoiceError ? onknownVoiceError : '') : (onknownVoiceError && (!ontVoiceStatus || !rgVoiceStatus)) ? onknownVoiceError : '';
        // rgVoiceStatus ? rgVoiceStatus : ontVoiceStatus : ontVoiceStatus ? ontVoiceStatus + (rgVoiceStatus ? ', ' :'') + (rgVoiceStatus? rgVoiceStatus : '' ) : '';

        // ontVoiceError ? ontVoiceError + ', ' + (rgVoiceError ? rgVoiceError : '') : rgVoiceError ? rgVoiceError : '' ;
        // let voicestatus1 = this.voiceServicesStatus?.subSvcState ? this.voiceStatus : '';
        // let voicestatus2 = this.voiceServicesStatus1?.subSvcState ? ` , ${this.voiceStatus1}` : '';
        // this.voicesvcStatus = voicestatus1 + voicestatus2
        // let voicedetails1 = (this.voiceServicesStatus?.errorDetails && this.voiceServicesStatus?.errorDetails !== 'null') ? this.voiceDetails : '';
        // let voicedetails2 = (voicedetails1 && this.voiceServicesStatus1?.errorDetails && this.voiceServicesStatus1?.errorDetails !== 'null') ? ` , ${this.voiceDetails1}` : (!voicedetails1 && this.voiceServicesStatus1?.errorDetails && this.voiceServicesStatus1?.errorDetails !== 'null') ? `${this.voiceDetails1}` : '';
        // this.voiceErrorDetails = voicedetails1 + voicedetails2;
      } else {
        this.dataService = {};
        this.dataservices1 = {};
        this.videoServicesStatus = {};
        this.videoServicesStatus1 = {};
        this.voiceServicesStatus = {};
        this.voiceServicesStatus1 = {};
      }

      this.serviceStatusLoading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.dataService = {};
      this.dataservices1 = {};
      this.videoServicesStatus = {};
      this.voiceServicesStatus = {};
      this.serviceStatusLoading = false;
    })
  }
  getWIFIAvailability(fsan) {
    this.availabilitySubs = this.api.wifiAvailability(this.ORG_ID, fsan).subscribe((res: any) => {
      this.api.setWIFIAvailability(res, this.latestFSAN);
      this.availability = res ? res : {};
    }, (err: HttpErrorResponse) => {
      this.availability = {};
    })
  }

  timeToDays(time) {
    let seconds = time;
    const day = Math.floor(seconds / (24 * 3600));
    seconds = seconds % (24 * 3600);
    const hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);

    return `${day ? day + 'd' : ''}
              ${hour ? hour + 'h' : ''}
              ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
              ${second ? String(second).padStart(2, '0') + 's' : ''}`;
  }



  getColor(status) {
    return status === 'OFFLINE' || status === 'OFFLINE_STALE' ? 'red' : status === 'ONLINE' ? 'green' : status === 'ONLINE_STALE' ? 'red' : '';
  }
  getstatuscolor(status, value?) {
    return status && status == 'Online' ? 'green' : (status == 'Offline' || status == 'Degraded') ? 'red' : status != false ? 'green' : 'red'
  }
  showPrimaryEmail(mail) {
    if (mail) {
      return mail + ` (${this.language['Primary']})`;
    } else {
      return '-';
    }
  }
  showMicroSiteName(id) {
    for (let i = 0; i < this.communityArr.length; i++) {
      if (this.communityArr[i].id == id) {
        return this.communityArr[i].communityName
      }
    }
  }
}
