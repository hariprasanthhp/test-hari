import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service'
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, filter } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { truncate } from 'fs';
import { DataServiceService } from 'src/app/support/data.service';
import { FoundationDataService } from '../../foundation-data.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-selected-system-details',
  templateUrl: './selected-system-details.component.html',
  styleUrls: ['./selected-system-details.component.scss'],
})
export class SelectedSystemDetailsComponent implements OnInit, OnDestroy {
  language: any = {};
  languageSubject;
  id: any;
  ORG_ID: any;
  tableData: any;
  systemId: any;
  rgService: any;
  edgeSuites: any;
  subscriber: any;
  systemData: any[];
  protectIQ: any;
  sN: any;
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
  deviceData: any;
  opMode: any;
  editdisable: boolean = true;
  hideserviceinfo: boolean = true;
  device: any;
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
  iqsuitEnable: boolean;
  CommandIqLoader: boolean;
  CommandIqSubs: any;
  CommandIqData: any;
  commandIQEmail: any;
  onboardCommend: boolean;
  commandIQstatus: string;
  isDev: boolean;
  arloEmail: any;
  arloEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  planCode: any;
  address: any;
  servifyemail: any;
  firstName: any;
  mobile: any;
  postal: any;
  state: any;
  city: any;
  ServifyEnableentitlement: boolean;
  radioSummary6GShow: boolean;
  radioEnable6Hz: string;
  isPRConfiguredOutside: boolean;
  deviceInformation: any;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  commandIQSecondEmail: any;
  myCommunityIqEntitlement: boolean;
  communityIq: any;
  mycommunityIq: any;
  dev: boolean;
  RGHotspot: string;
  communityArr: any = [];
  micrositeLoader: boolean = false;
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  BarkPlan: any;
  bark: any;
  BarkEmail: any;
  network: string;
  vlanId: any;
  smallBiz: any;
  SmallBizIQ: any;
  smallBizIQentitlement: boolean;
  rgStatus: any;
  Eduroam: any;
  subscriptionEndDt: string;
  ClaimEligible: boolean;
  subscribedStatus: boolean;
  PlanPurchasedDt: Date;
  PreviousDate: number;
  bSmbMode: boolean = false;
  allSubsServicesStatusSubs: any;
  serviceStatusLoading: boolean;
  dataService: any;
  dataStatus: any;
  dataDetails: string;
  dataservices1: any;
  dataStatus1: string;
  dataDetails1: string;
  datasvcStatus: any;
  dataErrorDetails: string;
  videoServicesStatus: any = {};
  videoStatus: string;
  videoDetails: string;
  videoServicesStatus1: any = {};
  videoStatus1: string;
  videoDetails1: string;
  videosvcStatus: string;
  videoErrorDetails: string;
  voiceServicesStatus: any = {};
  voiceStatus: string;
  voiceDetails: string;
  voiceServicesStatus1: any = {};
  voiceStatus1: string;
  voiceDetails1: string;
  voicesvcStatus: string;
  voiceErrorDetails: string;
  dialPlanList: any[];
  getAllDialPlanSubscribe: any;
  params: any;
  devices: any;
  redoServicesub: any;
  dialPlane2e: any;
  userNamee2e: any;
  datacevlane2e: any;
  voicecevlane2e: any;
  videocevlane2e: any;
  staticIpAddresse2e: any;
  netMaske2e: any;
  gateWaye2e: any;
  voiceServiceTypee2e: any;
  dataServicee2e: any;
  voiceServicee2e: any;
  videoServicee2e: any;
  servicesData: any;
  serviceDetails: any;
  dataservice: any;
  dataservice1: any;
  videoservice: any;
  VoiceService: any;
  dataser: any;
  videoser: any;
  voiceser: any;
  allSubsServicesDataSubs: any;
  interfaceVoice: any;
  faxRelaye2e: any;
  rgDetails: any;
  datausoc: any;
  videousoc: any;
  voiceusoc: any;
  VoiceService2: any
  voiceServiceType: any;
  pppoeUsername: any;
  staticIpAddress: any;
  Netmask: any;
  staticGateway: any;
  faxRelaye2e1: any;
  legacyView: boolean;
  liveSystem: boolean = false;
  PreProvisnedSys: boolean = false;
  voiceSerTypeLegacy: boolean;
  dataDescription: any;
  voiceDescription: any;
  videoDescription: any;
  voiceSerTypeE2E: boolean;
  retryEnableData: boolean = false;
  retryEnableVoice: boolean = false;
  retryEnableVideo: boolean = false;



  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private service: DataServiceService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private systemservice: FoundationManageService,
    private foundationDataService: FoundationDataService,
    private Service: AddSubscriberService,
    private managementService: ManagementService,
    private ccoService: AddSubscriberService,
    private communityService: MycommunityIqService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.languageUpdate();
      }
    );
  }

  ngOnInit(): void {
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    this.getEdgeSuiteEntitlement();
    this.loading = true;
    this.servifyDisable = true;
    this.editParams = [];
    this.route.queryParams.subscribe(params => {
      let latestParams = JSON.stringify(params);
      this.systemInformation = {
        sn: params.sn ? (params.sn).replace(/\s+/g, "") : '',
        subscriber: params.subscriber ? params.subscriber : '',
        regId: params.regId ? params.regId : '',
        from: 'view'
      }

      this.systemInfo = {
        sn: params.sn ? (params.sn).replace(/\s+/g, "") : '',
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
          this.sN = params.sn ? (params.sn).replace(/\s+/g, "") : ''
          this.subId = params.subscriber ? params.subscriber : ''
          this.regID = params.regId ? params.regId : '';
          this.showRadioSummary = false;
          this.getDatas();
        }
      } else {
        this.latestParams = latestParams;
        this.sN = params.sn ? (params.sn).replace(/\s+/g, "") : ''
        this.subId = params.subscriber ? params.subscriber : ''
        this.regID = params.regId ? params.regId : ''
        this.showRadioSummary = false;
        this.getDatas();
      }

      return params;
    })
    this.serviceDetail();
    this.getScopes();
    let entitlement = this.sso.getEntitlements();
    if (entitlement && entitlement['214'] && entitlement['214'].apptype === 214) {
      this.GetMicrosites();
    }
  }

  resetValues() {
    //system info
    this.systemId = '';
    this.macAddress = '';
    this.ipAddress = '';
    this.ipV6SitePrefix = '';
    this.registrationId = '';
    this.serialNumber = '';
    this.status = '';
    this.deviceData = {
      softwareVersion: '',
      hardwareSerialNumber: ''
    }

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

    this.dEnable = 'enabled';;
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
    this.radioEnable6Hz = '';
    this.radioSummary6GShow = false;
  }
  showSwapInProgress: any;
  getDatas() {
    if (this.sN && this.subId) {
      this.id = this.sN;
      //this.deviceInformation = JSON.parse(localStorage.getItem("calix.DeviceDetails"))
      this.getListData();
      this.deviceDetails();
      this.hidesubonly = true;
    } else {
      if (this.subId) {
        this.id = this.subId
        this.hidesubonly = true;
        this.iqsuitEnable = true;
        this.getSubscriberData()
        this.getListData();
      }
      else {
        this.id = this.sN;
        //this.deviceInformation = JSON.parse(localStorage.getItem("calix.DeviceDetails"))
        this.getListData();
        this.deviceDetails();
        //this.getCommandIqOfSysteminfo();
      }
    }
    if (this.regID) {
      this.getMultipleRegId(this.regID);
    }
    if (this.sN) {
      this.systemservice.checkSwapStatus(this.sN, this.ORG_ID).subscribe((res) => {
        this.showSwapInProgress = res;
      })
    }

  }
  provosionrecord() {
    this.preprovisionsub = this.systemservice.getProvisionrecord(this.ORG_ID, this.sN).subscribe((res: any) => {
      this.device = res ? res : {};
      this.opMode = this.device?.opMode;
      if (!this.deviceData) {
        if ((this.opMode === 'RG') && this.device?.modelName) {
          if ((this.device?.modelName).indexOf("GS") !== -1 || (this.device?.modelName).indexOf("GM") !== -1 || (this.device?.modelName).indexOf("GPR") !== -1) {
            this.iqsuitEnable = true;
          } else {
            this.iqsuitEnable = false;
          }
        }
        else if ((this.opMode === 'RG') && !this.device?.modelName) {
          if (this.modelName) {
            if ((this.modelName).indexOf("GS") !== -1 || (this.modelName).indexOf("GM") !== -1 || (this.modelName).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true;
            } else {
              this.iqsuitEnable = false;
            }
          }

        }
      }

      this.opModedisplay = (this.opMode == 'RG' ? '(RG)' : (this.opMode == 'WAP' || this.opMode == "WAP-IGMP") ? this.opMode.replace(
        "WAP-IGMP",
        "Mesh(SAT)"
      ).replace("WAP", "Mesh(SAT)") : this.opMode == 'Managed ONT' ? "(Managed ONT)" : "")

      if (this.opMode === 'WAP') {
        this.editdisable = true;
        this.hideserviceinfo = true;
      }
      else {
        this.editdisable = false;
        this.hideserviceinfo = false;
      }
      //console.log('Object.keys(res).length', Object.keys(res).length)
      if (!res || Object.keys(res)?.length == 0 || !this.device?.modelName) {
        this.iqsuitEnable = true;
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    }, () => {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    })
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

  checkRegIdAndMac(value) {
    value = value ? value : '';
    var format = /[:]+/;
    if (value) {
      if (format.test(value) || value.length <= 10) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  checkRegId(value) {
    value = value ? value : '';
    if (value && value?.length <= 10) {
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

  deviceDetails() {
    let system = this.sN
    this.deviceInfoSub = this.systemservice.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
      this.deviceData = res ? res : {}
      this.serialNumber = this.deviceData?.serialNumber;
      if (this.serialNumber) {
        this.getCommandIqOfSysteminfo()
      }

      if (this.serialNumber) {
        this.serialNumber = (this.deviceData?.serialNumber).replace(/\s+/g, "");
      }
      this.macAddress = this.deviceData?.macAddress;
      this.ipAddress = this.deviceData?.ipAddress;
      this.ipV6SitePrefix = this.deviceData?.secondIpAddress;
      this.registrationId = this.deviceData?.registrationId ? this.deviceData?.registrationId : '-';
      this.opMode = this.deviceData?.opMode;
      if (this.deviceData?.opMode) {
        this.liveSystem = true;
      }
      if ((this.opMode === 'RG') && this.deviceData?.modelName) {
        if ((this.deviceData?.modelName).indexOf("GS") !== -1 || (this.deviceData?.modelName).indexOf("GM") !== -1 || (this.deviceData?.modelName).indexOf("GPR") !== -1) {
          this.iqsuitEnable = true;
        } else {
          this.iqsuitEnable = false;
        }
      }
      if (!res || Object.keys(res).length == 0) {
        this.iqsuitEnable = true;
      }
      this.opModedisplay = (this.opMode == 'RG' ? '(RG)' : (this.opMode == 'WAP' || this.opMode == "WAP-IGMP") ? this.opMode.replace(
        "WAP-IGMP",
        "Mesh(SAT)"
      ).replace("WAP", "Mesh(SAT)") : this.opMode == 'Managed ONT' ? "(Managed ONT)" : "")
      if (this.opMode === 'WAP') {
        this.editdisable = true;
        this.hideserviceinfo = true;
      }
      else {
        this.editdisable = false;
        this.hideserviceinfo = false;
      }
      this.provosionrecord();
      this.getDeviceDatas();
      if (this.deviceData && this.deviceData?.opMode && this.deviceData?.opMode == 'RG' && this.deviceData?.serialNumber) {
        this.latestFSAN = (this.deviceData?.serialNumber).replace(/\s+/g, "");
        this.metaData = this.systemservice.getMetaData(this.latestFSAN);
        if (this.metaData) {
          if (this.metaData && (this.metaData.RadioStatus24G || this.metaData.RadioStatus5G || this.metaData.RadioStatus6G)) {
            this.showRadioSummary = true;
            this.getDeviceDatas();
          } else {
            this.showRadioSummary = false;
            this.getDeviceDatas();
          }

        } else {
          this.getMetaData();
        }
      } else if (this.deviceData && this.deviceData?.opMode && this.deviceData?.opMode != 'RG' && this.deviceData?.serialNumber) {
        this.latestFSAN = (this.deviceData?.serialNumber).replace(/\s+/g, "");
        this.metaData = this.systemservice.getMetaData(this.latestFSAN);
        if (this.metaData) {
          if (this.metaData && (this.metaData.RadioStatus24G || this.metaData.RadioStatus5G || this.metaData.RadioStatus6G)) {
            this.showRadioSummary = true;
            this.getDeviceDatas();
          } else {
            this.showRadioSummary = false;
            this.getDeviceDatas();
          }

        } else {
          this.getMetaData();
        }
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  getDeviceDatas() {
    let requestEndpoints = [];
    if (this.systemInfo.sn) {
      requestEndpoints.push(`${environment.SUPPORT_URL}/netops-dp/dial-plan?${this.sso.getOrg(this.ORG_ID)}`);
      if (this.showRadioSummary) {
        requestEndpoints.push(`${environment.SUPPORT_URL}/device/${this.ORG_ID}/${this.latestFSAN ? this.latestFSAN : this.serialNumber ? this.serialNumber : this.systemInfo.sn}/wifi/radioSummaries`);
      } else

        this.deviceDataGETLoading = true;
    }



    const requests = [];
    requestEndpoints.forEach(endpoint => {
      const req = this.systemservice.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();

  }
  makeParallelRequest() {
    //debugger;
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {


      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0]);
        this.dialplan = [];
      } else {
        this.dialplan = response[0] ? response[0] : [];
        for (var i = 0; i < this.dialplan.length; i++) {
          if (this.dialplan[i]._id == this.viDialPlan || this.dialPlane2e === this.dialplan[i]._id) {
            this.videodialplan = this.dialplan[i].name;
          }
        }
      }


      if (this.showRadioSummary) {
        if (response[1] && response[1].error) {
          //this.pageErrorHandle(response[1].error);
          this.radioData = {};
        } else {
          this.radioData = response[1] ? response[1] : [];
          if (this.radioData['2.4G']?.RadioEnabled == "true") {
            this.radioEnable2Hz = 'ON'
          }
          else if (this.radioData['2.4G']?.RadioEnabled == "false") {
            this.radioEnable2Hz = 'OFF'
          }
          if (this.radioData['5G']?.RadioEnabled == "true") {
            this.radioEnable5Hz = 'ON'
          }
          else if (this.radioData['5G']?.RadioEnabled == "false") {
            this.radioEnable5Hz = 'OFF'
          }

          if (this.radioData['6G']?.RadioEnabled == "true") {
            this.radioEnable6Hz = 'ON'
          }
          else if (this.radioData['6G']?.RadioEnabled == "false") {
            this.radioEnable6Hz = 'OFF'
          }
        }
      }
      else {
        this.radioData = {};
      }




      this.deviceDataGETLoading = false;

    }, (err: HttpErrorResponse) => {
      this.deviceDataGETLoading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.deviceDataGETLoading = false;
    })
  }

  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' },
    { label: 'TDM GW', value: 'X_000631_TDMGW' }
  ];
  getSubscriberData() {
    this.allListSubs = this.systemservice.GetSubscriberData(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
      this.account = res.account;
      this.editdisable = false;
      this.hideserviceinfo = true;
      this.email = res.email;
      this.name = res.name;
      this.phone = res.phone;
      if (this.systemId && this.name) {
        this.system = this.systemId + " " + '-' + " " + this.name;
      }
      if (this.systemId && !this.name) {
        this.system = this.systemId;
      }
      if (!this.systemId && this.name) {
        this.system = this.name;
      }
      // this.system = this.name;
      // this.system = this.name;
      this.serviceAddress = res.serviceAddress;
      this.subscriberLocationId = res.subscriberLocationId;
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
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  PlanPurchasedDtSplit: any
  getListData() {
    //debugger;
    this.getlistloder = true;
    this.systemData = [];
    this.isPRConfiguredOutside = false;
    this.getlistdata = this.systemservice.getSubscribersSystemList(this.ORG_ID, this.systemInfo, true).subscribe((res: any) => {
      console.log("tableData", res);

      this.tableData = res ? res : [];
      this.systemData = [];
      this.systemId = this.tableData?.systemId ? this.tableData?.systemId : '';
      this.modelName = this.tableData?.modelName ? this.tableData?.modelName : '';
      this.status = this.tableData?.status ? this.tableData?.status : '';
      this.PreProvisnedSys = res?.status === 'Pre Provisioned';
      this.systemData.push(this.tableData.subscriber);
      this.account = this.tableData.subscriber?.account ? this.tableData.subscriber?.account : '';
      this.email = this.tableData.subscriber?.email ? this.tableData.subscriber?.email : '';
      this.name = this.tableData.subscriber?.name ? this.tableData.subscriber?.name : '';
      this.phone = this.tableData.subscriber?.phone ? this.tableData.subscriber?.phone : '';
      this.serviceAddress = this.tableData.subscriber?.serviceAddress ? this.tableData.subscriber?.serviceAddress : '';
      this.subscriberLocationId = this.tableData.subscriber?.subscriberLocationId ? this.tableData.subscriber?.subscriberLocationId : '';
      this.rgService = this.tableData.rgService;
      this.legacyView = this.tableData.hasOwnProperty('rgService') && (res?.rgService?.data?.Enable || res?.rgService?.video?.Enable || (res?.rgService?.voice && Object.values(res?.rgService?.voice?.Line).some((e: any) => e.Enable !== "Disabled")))
      this.data = this.rgService?.data;
      this.voice = this.rgService?.voice;
      this.video = this.rgService?.video;
      this.edgeSuites = this.tableData.edgeSuites;
      this.protectIQ = this.edgeSuites?.protectIQ;
      this.experienceIQ = this.edgeSuites?.experienceIQ;
      this.userId = this.edgeSuites?.arloSmart?.userId;
      this.voiceSerTypeLegacy = /MGCP|H.248|TDM GW/.test(this.voice?.ServiceType) ? true : false;
      if (this.userId) {
        this.GetArlosmart();
      }
      this.getServicesList();
      this.getCommandIqinfo();
      this.arloSmart = this.edgeSuites?.arloSmart;
      this.servifyCare = this.edgeSuites?.servifyCare;
      this.bark = this.edgeSuites?.bark;
      this.smallBiz = this.edgeSuites?.smallBizIQ;
      this.communityIq = this.edgeSuites?.myCommunityIQ || {};
      this.arEnable = this.arloSmart?.enabled;
      this.bark = this.edgeSuites?.bark;
      this.BarkPlan = this.bark?.planCode === 'bark_premium' ? this.language.Premium_Monthly : this.bark?.planCode === 'bark_junior' ? this.language.Junior_Monthly : '';
      this.BarkEmail = this.bark?.email;
      this.system = '';
      if (this.systemId && this.name) {
        this.system = this.systemId + " " + '-' + " " + this.name;
      }
      if (this.systemId && !this.name) {
        this.system = this.systemId;
      }
      if (!this.systemId && this.name) {
        this.system = this.name;
      }
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

      this.sEnable = this.servifyCare?.enabled;
      this.planCode = this.servifyCare?.planCode === 'SERVIFYCAREPLATINUM' ? this.language['Platinum'] : this.servifyCare?.planCode === 'SERVIFYCAREBRONZE' ? this.language['Bronze'] : this.servifyCare?.planCode === 'SERVIFYCAREGOLD' ? this.language['Gold'] : this.servifyCare?.planCode === 'SERVIFYCARESILVER' ? this.language['Silver'] : '-';
      this.BarkPlan = this.bark?.planCode === 'bark_premium' ? this.language.Premium_Monthly : this.bark?.planCode === 'bark_junior' ? this.language.Junior_Monthly : '';
      this.BarkEmail = this.bark?.email;
      if (this.smallBiz?.enable) {
        this.SmallBizIQ = this.smallBiz?.status?.result === 'failed' ? this.language["EnableFailed"] : "Subscribed"
      } else {
        this.SmallBizIQ = "Unsubscribed"
      }
      this.address = this.servifyCare?.address;
      this.servifyemail = this.servifyCare?.email;
      if (this.servifyemail) {
        let PlanPurchasedDate = this.servifyCare?.planPurchaseDate
        let date = new Date(PlanPurchasedDate)
        let newDate = new Date(date.setDate(date.getDate()))
        let StartDate = new Date();
        let currentYear = StartDate.getFullYear();
        let EndDate = new Date(newDate);
        /************* For getting exact days for claim eligible for without cancellation *********/
        let Time = StartDate.getTime() - EndDate.getTime();
        let Days = Time / (1000 * 3600 * 24); //Diference in Days
        let ExactDays = Math.round(Days);
        /********** For cancellation & Subscription end date variables **********/
        let todayDate = new Date().toJSON().slice(0, 10);
        let cancelDtSplit: any
        let todayDateSplit: any = todayDate.split("-");
        if (PlanPurchasedDate) {
          this.PlanPurchasedDtSplit = PlanPurchasedDate.split("-");
        }

        if (this.PlanPurchasedDtSplit) {
          this.PlanPurchasedDt = new Date(this.PlanPurchasedDtSplit[0], parseInt(this.PlanPurchasedDtSplit[1]) - 1, this.PlanPurchasedDtSplit[2]);
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
          let PreviousDate = this.PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
          let mm = this.monthDiff(this.PlanPurchasedDt, check)
          this.PlanPurchasedDt.setDate(this.PlanPurchasedDt.getDate() - 1)
          this.PlanPurchasedDt.setMonth(this.PlanPurchasedDt.getMonth() + mm)
          let mmset = check.getTime() > this.PlanPurchasedDt.getTime() ? 1 : 0
          this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
          let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
          to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
          /********** Claim eligible(for Cancellation) **********/
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
          /********** For setting Subscription end date **********/
          if (todayDateSplit[2] >= this.PlanPurchasedDtSplit[2]) {
            this.PreviousDate = this.PlanPurchasedDtSplit[2] - 1;
            let nextMonth = StartDate.getMonth() + 2;
            this.subscriptionEndDt = currentYear + "-" + nextMonth + "-" + this.PreviousDate;
            let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
            to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
            //console.log(this.subscriptionEndDt);

          }
          else {
            if (this.PlanPurchasedDtSplit) {
              this.PreviousDate = this.PlanPurchasedDtSplit[2] - 1;
            }
            this.subscriptionEndDt = currentYear + "-" + monthset + "-" + this.PreviousDate;
            let subscriptionEndDtSplit: any = this.subscriptionEndDt.split("-");
            to = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1]) - 1, subscriptionEndDtSplit[2]);
            //console.log(this.subscriptionEndDt);

          }
          /********** Claim eligible(Not for Cancellation) **********/
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


      /********** For checking subscribed or unsubscribed based on subscription end date **********/

      this.languageUpdate()


      this.firstName = this.servifyCare?.firstName;
      this.mobile = this.servifyCare?.mobile;
      this.postal = this.servifyCare?.postal;
      this.state = this.servifyCare?.state;
      this.city = this.servifyCare?.city;
      if (!this.data || this.data?.Enable) {
        this.dEnable = 'enabled';
      } else {
        this.dEnable = 'Disabled';
      }

      this.dPbit = this.data?.Pbit ? this.data?.Pbit : '';
      this.dVLanId = this.data?.VlanId ? this.data?.VlanId : '';
      this.pppoeUN = this.data?.pppoe?.Username ? this.data?.pppoe?.Username : '';
      this.pppoePW = this.data?.pppoe?.Password ? this.data?.pppoe?.Password : '';
      if (this.video?.Enable) {
        this.vEnable = 'enabled';
      } else {
        this.vEnable = 'Disabled';
      }

      this.vPbit = this.video?.Pbit == '-1' ? '' : this.video?.Pbit;
      this.vBwProfile = this.video?.BwProfile ? this.video?.BwProfile : '';
      this.vVLanId = this.video?.VlanId ? this.video?.VlanId : '';
      for (var i = 0; i < this.serviceTypeList.length; i++) {
        if (this.voice?.ServiceType == this.serviceTypeList[i].value) {
          this.viServiceType = this.serviceTypeList[i].label;
        }
      }

      this.viDialPlan = this.voice?.DialPlan;
      if (this.voice?.FaxT38?.Enable) {
        this.viFaxT38 = 'enabled';
      } else {
        this.viFaxT38 = 'Disabled';
      }
      if (this.voice?.Line[1]?.Enable == "Enabled" || this.voice?.Line[2]?.Enable == "Enabled") {
        this.viEnable = 'enabled';
      } else {
        this.viEnable = 'Disabled';
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

      //this.loading = false;
      //this.getDeviceDatas();
      this.getlistloder = false;



    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.getlistloder = false;
        this.pageErrorHandle(err);
      })
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

      this.network = !this.communityIq?.passpoint?.network?.type ? '-' : this.communityIq?.passpoint?.network?.type === 'Route' ? 'Routed' : this.communityIq?.passpoint?.network?.type === 'Bridge' ? 'Bridged' : 'Policy Routed'

      if (this.communityIq?.passpoint?.network?.vlanId) {
        this.vlanId = this.communityIq?.passpoint?.network?.vlanId;
      } else {
        this.vlanId = '-'
      }
      if (this.communityIq?.eduroam) {
        if (this.communityIq?.eduroam?.enable) {
          this.Eduroam = this.communityIq?.eduroam?.status?.result === 'failed' ? this.language["EnableFailed"] : this.language["Enabled"]
        } else if (!this.communityIq?.eduroam?.enable) {
          this.Eduroam = this.language["Disabled"]
        }
      } else {
        this.Eduroam = this.language["Not Enabled"];;
      }

    }
    this.planCode = this.servifyCare?.planCode === 'SERVIFYCAREPLATINUM' ? this.language['Platinum'] : this.servifyCare?.planCode === 'SERVIFYCAREBRONZE' ? this.language['Bronze'] : this.servifyCare?.planCode === 'SERVIFYCAREGOLD' ? this.language['Gold'] : this.servifyCare?.planCode === 'SERVIFYCARESILVER' ? this.language['Silver'] : '-';

  }
  closeAddEdit() {
    let searchText = sessionStorage.getItem('foundation_list_search');
    if (searchText) {
      this.router.navigate(['/cco-foundation/foundation-systems/foundation-manage/foundation-system-list'], { relativeTo: this.route, state: { systemSearchText: searchText || '' } });
    } else {
      this.router.navigate(['/cco-foundation/foundation-systems/foundation-manage/foundation-system-list'], { relativeTo: this.route });
    }

  }
  goToSystemEdit() {

    this.router.navigate(['../system-edit/'], { relativeTo: this.route, queryParams: this.systemInformation });
  }
  GetArlosmart(reload?) {
    this.arloLoading = true;
    this.arloSmartListSubs = this.systemservice.gerArloSmartData(this.userId).subscribe((res: any) => {
      if (res && Object.keys(res).length && res.devices && res.devices.length) {
        this.ArloData = (res.devices && res.devices.length) ? res.devices : [];
        let twoKDevices = [], fourKDevices = [];
        this.ArloData.forEach(el => {
          if (el.planId && el.planId.replace(/\s+/g, "") === 'Arlo-Secure-Single-Camera') {
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
    if (this.allSubsServicesDataSubs) this.allSubsServicesDataSubs.unsubscribe();
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

  getMetaData() {

    this.metaDataLoader = true;
    this.getmetaDataSub = this.systemservice.fetchMetaData(this.ORG_ID, this.latestFSAN).subscribe((res: any) => {
      //this.loading = false;
      this.metaDataLoader = false;
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.systemservice.setMetaData(this.latestFSAN, this.metaData);
      if (this.metaData && (this.metaData.RadioStatus24G || this.metaData.RadioStatus5G)) {
        this.showRadioSummary = true;
        this.getDeviceDatas();
      } else {
        this.showRadioSummary = false;
        this.getDeviceDatas();
      }
    }, err => {
      this.loading = false;
      this.metaDataLoader = false;
      this.pageErrorHandle(err);
    });
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

  getServicesList() {
    this.serviceListLoader = false;
    if (this.systemInfo.subscriberId) {
      this.serviceListLoader = true;
      this.servicesListSubs = this.systemservice.getSubscriberServices(this.systemInfo.subscriberId).subscribe((res: any) => {
        this.getServicesStatus();

        this.servicesListData = res ? res : [];
        this.dataServiceLabel = "";
        this.voiceServiceLabel = "";
        this.videoServiceLabel = "";

        if (res) {
          console.log("servicesListData", res);

          res.forEach((el) => {
            if (el.activate) {
              this.isPRConfiguredOutside = true;
              this.legacyView = false
            }
            if (el.type === 'voice' && el.activate === true) {
              this.voiceServicee2e = 'enabled'
            } else if (el.type === 'video' && el.activate === true) {
              this.videoServicee2e = 'enabled'
            } else if (el.type === 'data' && el.activate === true) {
              this.dataServicee2e = 'enabled'
            }



            if (el.type == 'data' && el.activate === true) {
              this.dataServiceLabel = el.usoc;
            } else if (el.type == 'video' && el.activate === true) {
              this.videoServiceLabel = el.usoc;
            } else if (el.type == 'voice' && el.activate === true) {
              this.voiceServiceLabel = el.usoc;
            }
          });
        }
        this.serviceListLoader = false;
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.serviceListLoader = false;
      })
    }

  }

  // getScopes() {
  //   this.hasWrite = this.sso.checFoundationScope(AcessModifiers.WRITE);
  // }

  getScopes() {
    let scopes = this.sso.getScopes();
    this.hasWrite = false;
    scopes['cloud.rbac.foundation.systems'] = scopes['cloud.rbac.foundation.systems'] ? scopes['cloud.rbac.foundation.systems'] : [];
    if (scopes && (scopes['cloud.rbac.foundation.systems']) && scopes['cloud.rbac.foundation.systems'].indexOf('write') !== -1) {
      this.hasWrite = true;
    }
  }

  getCommandIqinfo() {
    this.CommandIqLoader = false;
    if (this.systemInfo.subscriberId) {
      this.CommandIqLoader = true;
      this.CommandIqSubs = this.systemservice.getCommandIqOfSubscriber(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
        this.CommandIqData = res ? res : {};
        console.log("CommandIqData", this.CommandIqData.service);
        // if (this.CommandIqData?.service) {
        //   this.dataDescription = this.CommandIqData?.service.data ? this.CommandIqData?.service.data : '-'
        //   this.voiceDescription = this.CommandIqData?.service.voice ? this.CommandIqData?.service.voice : '-'
        //   this.videoDescription = this.CommandIqData?.service.video ? this.CommandIqData?.service.video : '-'
        // }
        this.CommandIqData['service-detail']?.forEach((e)=>{
          this[`${e.type}Description`] = e.note
        })


        res?.devices?.forEach(element => {
          if (element?.bSmbMode == true) {
            this.bSmbMode = true
          }

        });
        if (!this.CommandIqData?.commandIQ?.fduser) {
          this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
          if (this.CommandIqData?.commandIQ?.secondaryUsers) {
            if (this.CommandIqData?.commandIQ?.secondaryUsers?.length > 0) {
              this.commandIQSecondEmail = this.CommandIqData?.commandIQ?.secondaryUsers[0].status !== 'PENDING' ? this.CommandIqData?.commandIQ?.secondaryUsers[0].email : '';
            }
          }

        } else {
          this.commandIQEmail = "";
          this.commandIQSecondEmail = "";
        }
        this.onboardCommend = this.CommandIqData?.commandIQ?.onboarded;
        // CCL-31294 fix
        if (this.onboardCommend === true && this.CommandIqData?.commandIQ?.fduser === false) {
          this.commandIQstatus = 'Onboarded';
        }
        else if (this.onboardCommend === false && this.CommandIqData?.commandIQ?.fduser === false) {
          this.commandIQstatus = 'Not Onboarded';
        }
        else {
          this.commandIQstatus = '';
        }

        if (res?.devices?.length && res?.devices.filter(el => el && el.modelName == 'GM2037' && el.opMode != 'RG').length) {
          this.radioSummary6GShow = true;
        }


        // if (this.onboardCommend) {
        //   this.commandIQstatus = 'Onboarded';
        // } else {
        //   this.commandIQstatus = 'Not Onboarded';
        // }
        this.CommandIqLoader = false;
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.commandIQstatus = '-';
        this.CommandIqLoader = false;
      })
    } else {
      if (this.latestParams && JSON.parse(this.latestParams).radio3) {
        this.radioSummary6GShow = true;
        this.CommandIqLoader = false;
      }
    }

  }
  getCommandIqOfSysteminfo() {
    this.CommandIqLoader = false;
    if (this.systemInfo.sn) {
      this.CommandIqLoader = true;
      this.CommandIqSubs = this.systemservice.getCommandIqOfSystem(this.ORG_ID, this.serialNumber).subscribe((res: any) => {
        this.CommandIqData = res ? res : {};
        if (!this.CommandIqData?.commandIQ?.fduser) {
          this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
        } else {
          this.commandIQEmail = ""
        }
        this.onboardCommend = this.CommandIqData?.commandIQ?.onboarded;
        // CCL-31294 fix
        if (this.onboardCommend === true && this.CommandIqData?.commandIQ?.fduser === false) {
          this.commandIQstatus = 'Onboarded';
        }
        else if (this.onboardCommend === false && this.CommandIqData?.commandIQ?.fduser === false) {
          this.commandIQstatus = 'Not Onboarded';
        }
        else {
          this.commandIQstatus = '';
        }
        // if (this.onboardCommend) {
        //   this.commandIQstatus = 'Onboarded';
        // } else {
        //   this.commandIQstatus = 'Not Onboarded';
        // }
        this.CommandIqLoader = false;
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.commandIQstatus = '-';
        this.CommandIqLoader = false;
      })
    }

  }

  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['arlo'] = entitlement[206] ? entitlement[206] : [];
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
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
    entitlement['arloUnlimited'] = entitlement[212] ? entitlement[212] : [];
    entitlement['arloUnlimitedPlus'] = entitlement[213] ? entitlement[213] : [];
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
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222 || entitlement['223']?.apptype === 223)) {
      this.myCommunityIqEntitlement = true;
    }
    else {
      this.myCommunityIqEntitlement = false;
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
  showPrimaryEmail(mail) {
    if (mail) {
      return mail + ` (${this.language['Primary']})`;
    } else {
      return '-';
    }
  }
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

  showMicroSiteName(id) {
    for (let i = 0; i < this.communityArr.length; i++) {
      if (this.communityArr[i].id == id) {
        return this.communityArr[i].communityName
      }
    }
  }

  isAutomaticallyCreatedData: any;
  OntSvlan = '';
  unknownSvlan = ''
  isAutomaticallyCreatedVideo: any;
  getServicesStatus() {
    this.serviceStatusLoading = true;
    this.allSubsServicesStatusSubs = this.Service.getServicesStatus(this.systemInfo.subscriberId).subscribe((res: any) => {


      if (res) {
        this.dialPlane2e = res?.voiceServices[0]?.dialPlan
        this.userNamee2e = res?.dataServices[0]?.pppoeUsername
        this.datacevlane2e = res?.dataServices[0]?.cevlan === '-1' ? 'Untagged' : res?.dataServices[0]?.cevlan === '0' ? '-' : res?.dataServices[0]?.cevlan
        this.voicecevlane2e = res?.voiceServices[0]?.cevlan === '-1' ? 'Untagged' : res?.voiceServices[0]?.cevlan === '0' ? '-' : res?.voiceServices[0]?.cevlan
        this.videocevlane2e = res?.videoServices[0]?.cevlan === '-1' ? 'Untagged' : res?.videoServices[0]?.cevlan === '0' ? '-' : res?.videoServices[0]?.cevlan
        this.staticIpAddresse2e = res?.dataServices[0]?.staticIp ? res?.dataServices[0]?.staticIp : '-'
        this.netMaske2e = res?.dataServices[0]?.staticMask ? res?.dataServices[0]?.staticMask : '-'
        this.gateWaye2e = res?.dataServices[0]?.staticGateway ? res?.dataServices[0]?.staticGateway : '-'
        this.voiceServiceTypee2e = res?.voiceServices[0]?.voiceServiceType?.includes('X_000631_TDMGW') ? 'TDM GW' : res?.voiceServices[0]?.voiceServiceType ? res?.voiceServices[0]?.voiceServiceType : '-'
        this.voiceSerTypeE2E = /MGCP|H.248|TDM GW/.test(this.voiceServiceTypee2e) ? true : false;
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
        }
        // this.isAutomaticallyCreatedData =  (res?.dataServices[0]?.serviceId &&  res?.voiceServices[0]?.serviceId && res?.voiceServices.some(element=> res?.dataServices.some(data=> data.serviceId === element.serviceId))) ;
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {
          this.isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedData?.serviceId);
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
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {
          this.isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedData?.serviceId);
        }
        if (res?.dataServices[0]?.serviceId && res?.videoServices[0]?.serviceId) {
          this.isAutomaticallyCreatedVideo = res?.dataServices?.find(element => res?.videoServices?.some(video => video.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedVideo?.serviceId);
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
            rgStatus += ((rgStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            rgError += ((rgError ? ', ' : '') + element.errorDetails);
          } else if (element.cpeType === 'ONT') {
            ontStatus += ((ontStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            ontError += ((ontError ? ', ' : '') + element.errorDetails);

          }
          else if (element.cpeType === 'UNKNOWN') {
            unknownStatus += ((unknownStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            onknownError += ((onknownError ? ', ' : '') + element.errorDetails);
          }
        });
        this.datasvcStatus = (ontStatus && rgStatus) ? ontStatus + ', ' + rgStatus : (ontStatus) ? ontStatus + (unknownStatus ? ', ' : '') + (unknownStatus ? unknownStatus : '') : rgStatus ? rgStatus + (unknownStatus ? ', ' : '') + (unknownStatus ? unknownStatus : '') : unknownStatus ? unknownStatus : '';
        this.dataErrorDetails = (ontError && rgError) ? ontError + ', ' + rgError : (ontError) ? ontError + (!rgStatus && onknownError ? ', ' : '') + (!rgStatus && onknownError ? onknownError : '') : rgError ? rgError + (!ontStatus && onknownError ? ', ' : '') + (!ontStatus && onknownError ? onknownError : '') : (onknownError && (!ontStatus || !rgStatus)) ? onknownError : '';

        // this.datasvcStatus = (rgStatus) ? rgStatus  + (unknownStatus ? unknownStatus : '') : rgStatus ? rgStatus + (unknownStatus ? ', ' : '') + (unknownStatus ? unknownStatus : '') : unknownStatus ? unknownStatus : '';
        // this.dataErrorDetails = ( rgError) ? rgError  + (!rgStatus && onknownError ? ' ' : '') + (!rgStatus && onknownError ? onknownError : '') : rgError ? rgError + ( onknownError ? ', ' : '') + ( onknownError ? onknownError : '') : (onknownError && (!rgStatus)) ? onknownError : '';
        // this.datasvcStatus = (ontStatus && ontStatus.includes('Successfully Provisioned')) ? rgStatus ? rgStatus : ontStatus : ontStatus ? ontStatus + (rgStatus ? ', ' :'') + (rgStatus? rgStatus : '' ) : '';
        // this.dataErrorDetails = ontError ? ontError + ', ' + (rgError ? rgError : '') : rgError ? rgError : '' ;
        // let status1 = this.dataService?.subSvcState ? this.dataStatus : '';
        // let status2 = this.dataservices1?.subSvcState ? ` , ${this.dataStatus1}` : '';
        // this.datasvcStatus = status1 + status2
        // let details1 = (this.dataService?.errorDetails && this.dataService?.errorDetails !== 'null') ? this.dataDetails : '';
        // let details2 = (details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? ` , ${this.dataDetails1}` : (!details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? `${this.dataDetails1}` : '';
        // this.dataErrorDetails = details1 + details2;
        if (res && res?.videoServices && res?.videoServices?.length) {
          this.retryEnableVideo = res.videoServices.some((e) => e?.maxRetriesExceeded === "true")
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
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
        let videostatus2 = this.videoServicesStatus1?.subSvcState ? ` , ${this.videoStatus1}` : '';
        this.videosvcStatus = videostatus1 + videostatus2
        let videodetails1 = (this.videoServicesStatus?.errorDetails && this.videoServicesStatus?.errorDetails !== 'null') ? this.videoDetails : '';
        let videodetails2 = (videodetails1 && this.videoServicesStatus1?.errorDetails && this.videoServicesStatus1?.errorDetails !== 'null') ? ` , ${this.videoDetails1}` : (!videodetails1 && this.videoServicesStatus1?.errorDetails && this.videoServicesStatus1?.errorDetails !== 'null') ? `${this.videoDetails1}` : '';
        this.videoErrorDetails = videodetails1 + videodetails2;
        if (res && res?.voiceServices && res?.voiceServices?.length) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
          console.log('voiceServicesStatus', this.voiceServicesStatus);

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
          this.voiceStatus1 = `${this.voiceServicesStatus1?.ontIdentification} ${this.language['InterFace']} ${this.voiceServicesStatus1?.interface}: ${this.voiceServicesStatus1?.subSvcState}`;
          this.voiceDetails1 = `${this.voiceServicesStatus1?.ontIdentification} ${this.language['InterFace']} ${this.voiceServicesStatus1?.interface}: ${this.voiceServicesStatus1?.errorDetails}`;
        } else {
          this.voiceServicesStatus1 = {};
        }
        let ontVoiceStatus = '', rgVoiceStatus = '', ontVoiceError = '', rgVoiceError = '', unknownVoiceStatus = '', onknownVoiceError = '';
        res?.voiceServices?.forEach((element) => {
          if (element.cpeType == 'RG') {
            rgVoiceStatus += ((rgVoiceStatus ? ' ' : '') + `${element.ontIdentification} ${this.language['InterFace']} ${element?.interface}: ${element.subSvcState},`);
            rgVoiceError += ((rgVoiceError ? ' ' : '') + element.errorDetails + ',');
          }
          //  else if (element.cpeType === 'ONT') {
          //   ontVoiceStatus += ((ontVoiceStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
          //   ontVoiceError += ((ontVoiceError ? ', ' : '') + element.errorDetails);
          //   this.OntSvlan += !this.OntSvlan.includes(element?.svlan) ? ((this.OntSvlan ? ', ' : '') + element?.svlan) : '';
          // }
          else if (element.cpeType === 'UNKNOWN') {
            unknownVoiceStatus += ((unknownVoiceStatus ? ' ' : '') + `${element.ontIdentification} ${this.language['InterFace']} ${element?.interface}: ${element.subSvcState},`);
            onknownVoiceError += ((onknownVoiceError ? ' ' : '') + element.errorDetails + ',');
            this.unknownSvlan += !this.unknownSvlan.includes(element?.svlan) ? ((this.unknownSvlan ? ', ' : '') + element?.svlan) : '';

          }
        });
        // console.log('rr', unknownVoiceStatus.split(',').join(''),unknownVoiceStatus.split(',').length == 2 && unknownVoiceStatus.split(',')[1]=='');
        if (unknownVoiceStatus.split(',').length == 2 && unknownVoiceStatus.split(',')[1] == '') {
          unknownVoiceStatus = unknownVoiceStatus.split(',').join('');
        } else {
          unknownVoiceStatus = unknownVoiceStatus.replace(/[,\s]*$/, '')
        }
        if (onknownVoiceError.split(',').length == 2 && onknownVoiceError.split(',')[1] == '') {
          onknownVoiceError = onknownVoiceError.split(',').join('');
        } else {
          onknownVoiceError = onknownVoiceError.replace(/[,\s]*$/, '')
        }
        if (rgVoiceStatus.split(',').length == 2 && rgVoiceStatus.split(',')[1] == '') {
          rgVoiceStatus = rgVoiceStatus.split(',').join('');
        } else {
          rgVoiceStatus = rgVoiceStatus.replace(/[,\s]*$/, '')
        }
        if (rgVoiceError.split(',').length == 2 && rgVoiceError.split(',')[1] == '') {
          rgVoiceError = rgVoiceError.split(',').join('');
        } else {
          rgVoiceError = rgVoiceError.replace(/[,\s]*$/, '')
        }

        //
        this.voicesvcStatus = (ontVoiceStatus || rgVoiceStatus) ? ontVoiceStatus + rgVoiceStatus : (ontVoiceStatus) ? ontVoiceStatus + (unknownVoiceStatus ? ', ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : rgVoiceStatus ? rgVoiceStatus + (unknownVoiceStatus ? ', ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : unknownVoiceStatus ? unknownVoiceStatus : '';
        //  this.voicesvcStatus = rgVoiceStatus ? rgVoiceStatus +(unknownVoiceStatus ? ', ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : unknownVoiceStatus ? unknownVoiceStatus : '';
        this.voiceErrorDetails = (ontVoiceError || rgVoiceError) ? ontVoiceError + rgVoiceError : (ontVoiceError) ? ontVoiceError + (!rgVoiceStatus && onknownVoiceError ? ', ' : '') + (!rgVoiceStatus && onknownVoiceError ? onknownVoiceError : '') : rgVoiceError ? rgVoiceError + (!ontVoiceStatus && onknownVoiceError ? ', ' : '') + (!ontVoiceStatus && onknownVoiceError ? onknownVoiceError : '') : (onknownVoiceError && (!ontVoiceStatus || !rgVoiceStatus)) ? onknownVoiceError : '';
        // this.voiceErrorDetails = rgVoiceError ?  rgVoiceError + (!rgVoiceStatus && onknownVoiceError ? ' ' : '') + (!rgVoiceStatus && onknownVoiceError ? onknownVoiceError : '') : rgVoiceError ? rgVoiceError + ( onknownVoiceError ? ', ' : '') + ( onknownVoiceError ? onknownVoiceError : '') :( onknownVoiceError && ( !rgVoiceStatus)) ? onknownVoiceError : '';
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
      this.serviceStatusLoading = false;
      this.dataService = {};
      this.dataservices1 = {};
      this.videoServicesStatus = {};
      this.voiceServicesStatus = {};

    })

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

  serviceDetail() {
    this.allSubsServicesDataSubs = this.ccoService.getDetailedSubscriberServices(this.systemInfo.subscriberId).subscribe((res: any) => {
      this.serviceDetails = res ? res : [];
      var services = this.serviceDetails.services;
      for (var i = 0; i < services?.length; i++) {
        if (services[i].type === 'data') {
          this.dataservice = services[i] ? services[i] : {};
          // this.dataPlanItem(this.dataservice.usoc)
        } else if (services[i].type === 'data1') {
          this.dataservice1 = services[i] ? services[i] : {};
        } else if (services[i].type === 'video') {
          this.videoservice = services[i] ? services[i] : {};;
        } else if (services[i].type === 'voice') {
          this.VoiceService = services[i] ? services[i] : {};;
          console.log('VoiceService', this.VoiceService);
          let filtered = (services[i].voiceInterfaces.filter(obj => obj.name === "L1" || obj.name === "L2"))
          if (filtered.length > 0) { this.VoiceService2 = filtered ? filtered : {};; }

        }
      }
      this.servicesData = {
        data: this.dataservice,
        data1: this.dataservice1,
        video: this.videoservice,
        voice: this.VoiceService
      }
      this.dataser = this.servicesData?.data;
      this.datausoc = this.dataser?.usoc;
      this.pppoeUsername = this.dataser?.pppoeUsername;
      this.staticIpAddress = this.dataser?.staticIpAddress;
      this.Netmask = this.dataser?.staticNetmask;
      this.staticGateway = this.dataser?.staticGateway;

      console.log("datausoc", this.datausoc);

      this.videoser = this.servicesData?.video;
      this.videousoc = this.videoser?.usoc;

      this.voiceser = this.servicesData?.voice;
      this.voiceusoc = this.voiceser?.usoc;
      this.voiceServiceType = this.voiceser?.voiceServiceType?.includes('X_000631_TDMGW') ? 'TDM GW' : this.voiceser?.voiceServiceType;
      this.voiceSerTypeE2E = /MGCP|H.248|TDM GW/.test(this.voiceServiceType) ? true : false;
      console.log("voiceusoc", this.voiceusoc);

      this.interfaceVoice = this.voiceser?.interface;
      if (this.voiceser?.faxT38 === true) {
        this.faxRelaye2e = 'enabled'
      } else if (this.voiceser?.faxT38 === false) {
        this.faxRelaye2e1 = 'Disabled'
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }






}
