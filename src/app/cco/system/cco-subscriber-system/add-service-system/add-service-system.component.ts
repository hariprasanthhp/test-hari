import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { AddSystemComponent } from './add-system/add-system.component';
import _ from 'lodash';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { AdvancedSystemComponent } from './advanced-system/advanced-system.component';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { AddSubscriberService } from './add-subscriber.service';
import { AddEdgeSuitesComponent } from './add-edge-suites/add-edge-suites.component';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';

@Component({
  selector: 'app-add-service-system',
  templateUrl: './add-service-system.component.html',
  styleUrls: ['./add-service-system.component.scss']
})
export class AddServiceSystemComponent implements OnInit, OnDestroy {

  @ViewChild(AddDetailsComponent) childSubsDetails: AddDetailsComponent;
  @ViewChild(AddServicesComponent) childSubsServices: AddServicesComponent;
  @ViewChild(AddEdgeSuitesComponent) childSubsEdgesuits: AddEdgeSuitesComponent;
  @ViewChild(AddSystemComponent) childSystems: AddSystemComponent;
  @ViewChild(AdvancedSystemComponent) childserviceDetails: AdvancedSystemComponent;

  language: any;
  languageSubject: any;

  activeStepper = 'add-details';

  subsSysServiceForm: any = {
    subscriber: {

    },
    services: {

    },
    edgeSuites: {

    },
    systems: []

  }
  pages: any = {
    subscriberSaved: false,
    servicesSaved: false,
    edgeSuitesSaved: false,
    systemsSaved: false,
  }
  editSubscriber: any;
  createSubscriberSubs: any;
  createdSubscriberId: any;
  createdSubcriberData: any;
  loading: boolean;
  errorInfo: any;
  error: boolean;
  successrrorInfo: any;
  success: boolean;
  successInfo: any;

  ORG_ID: any;
  editSubscriberData: any;
  systemParams: { sn: string; subscriberId: any; };
  edgeParams: any;
  createEdgeSub: any;
  systemGetSubs: any;
  syetemsAllData: any;
  subscriberName: any;
  model: any;
  btnSaveContinue: boolean;
  btnContinue: boolean;
  btnSkip: boolean;
  btnBack: boolean;
  iqsuitEnable: boolean = true;
  serviceParams: any;
  dataservicesub: any;
  videoservicesub: any;
  dataloading: boolean;
  voiceloading: boolean;
  videoloading: boolean;
  serviceDataId: any;
  serviceVideoId: any;
  serviceVoiceId: any;
  getdataserviceSub: any;
  DataService: any;
  getvoiceserviceSub: any;
  VoiceService: any;
  getvideoserviceSub: any;
  VideoService: any;
  AllserviceData: { data: any; video: any; voice: any; };
  combineLatest: any;
  parallelReqSubscribtion: any;
  dialplansub: any;
  DialPlanitems: any[];
  systemsProvisionData: any = {};
  parallelReqSub: any;
  combineLat: any;
  VideoPlan: any[];
  VoicePlan: any[];
  Dataplan: any;
  DataPlanitem: any[];
  VoicePlanitem: any[];
  VideoPlanitem: any[];
  subscriberInfo: any = {};
  subscriberGetSubs: any;
  dataAvail: boolean;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  dataservice: any;
  videoservice: any;
  SaveSystem: string;
  Details: string;
  EDGESuites: string;
  System: string;
  Services: string;
  devices: any;
  systemDataAvail: boolean;
  arloEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  bandwidthLoading: boolean;
  getAllProfileSubscribe: any;
  formOptions: any = {
    Brandwidthitems: [],
    DialPlanitems: [],
    Profiles: [],
    servifyCancelcode: [],
    servifyPlan: [],
    ArloServicePlan: []

  };
  bwDataAvail: boolean;
  params: any;
  requestvideo: any;
  voiceparams: any;
  redirectToView: any;
  getAllSubscriberSub: any;
  CommandIqData: any;
  provisionInfosub: any;
  provisionData: {};
  systemFormData: any = {};
  systeminfo: any;
  deviceInfoSub: any;
  deviceInfoData: any = [];
  IQSuiteDevice: any = {};
  IQSuiteShow: boolean;
  updationEdgeSuitesData: any;
  getEdgeSuitesCalled: number = 0;
  serviceStatusLoading: boolean;
  allSubsServicesStatusSubs: any;
  servicesStatus: any;
  dataServicesStatus: any;
  videoServicesStatus: any;
  voiceServicesStatus: any;
  serviceData: { data: any; data1: any; video: any; voice: any; };
  defaultServices: any = {};
  dataservice1: any;
  dataServicesStatus1: any;
  dataService: any;
  dataservices1: any;
  savesubscriber: boolean;
  adminsData: any[];
  orgEnable: any;
  rgManagement: any;
  deviceInformation: any;
  serialNum: any;
  opModeont: any;
  getstatussub: any;
  ontsysInfo: any;
  systemssummary: any[];
  disableSystem: boolean = false;
  disableService: boolean = false;
  deleteSystem: any;
  discoveredDevice: boolean = false;
  Modelitems: any[];
  deviceModels: string[];
  IQSuiteDevice1: any[];
  deviceType: any;
  systemId: any;
  linkageType: any;
  ServifyEnableentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  isPRConfiguredOutside: boolean = true;
  subServicesSubscription: any;
  hideService: boolean = false;
  smallBizIQentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  devicesList: any;
  allowSmallBiz: boolean = true;
  deviceData: { modelName: any; softwareVersion: any; };
  continue: boolean = false;
  unsavedDta: any;
  subscriberImpacted: boolean;
  myCommunityIQEntitlement: boolean;
  NotCocService: boolean;
  updated: boolean;
  provisionOntService: any;
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sso: SsoAuthService,
    private systemService: AddSubscriberService,
    private commonOrgService: CommonService,
    private supportrouterservice: SupportRouterService,
  ) {
    this.getDeviceModels();
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
  }
  subscriberStepperInfo: any;
  ngOnInit(): void {
    this.AllserviceData = {
      data: this.DataService,
      video: this.VideoService,
      voice: this.VoiceService
    }
    this.getEdgeSuiteEntitlement();
    this.getDialPlan();
    this.getServiceallDatas();
    this.getProfileData();
    this.getOrgAdminData();
    this.systemService.subsSystemStep.subscribe((data: any) => {
      this.subscriberStepperInfo = data;
    });
    let url = this.router.url;
    if (url.indexOf('/cco-subscriber-system/add-service-system') !== -1) {
      this.hideShowBtns('add-details');
      this.SaveSystem = 'Save & Continue';
      setTimeout(() => {
        this.dataAvail = true;
        this.systemDataAvail = true;
        this.loading = false;
      }, 1000);

    } else {
      this.route.queryParams.subscribe(params => {
        this.editSubscriber = true;
        this.SaveSystem = 'Update & Continue';
        this.subscriberImpacted = params.subscriberImpacted ? params.subscriberImpacted : false;
        this.from = params.Pagefrom ? params.Pagefrom : false;
        if (params.subscriber) {
          this.subscriberInfo = {
            subscriberId: params.subscriber ? params.subscriber : '',
            sn: ''
          }
          this.getSubscriberServices();
          this.getSubscriberData();
          this.getAllSubsServicesData();
          this.getEdgeSuiteAllData();
        }
        if (params.sName) {
          this.subscriberName = params.sName;
        }

        this.redirectToView = params.from ? params.from : '';
        if (params.page) {
          let tab = this.tabs.includes(params.page) ? params.page : 'add-details';
          this.updateStepper(tab);
        } else {
          this.updateStepper('add-details');
        }

      })
    }

  }

  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.createSubscriberSubs) this.createSubscriberSubs.unsubscribe();
    if (this.parallelReqSub) this.parallelReqSub.unsubscribe();
    if (this.systemGetSubs) this.systemGetSubs.unsubscribe();
    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    if (this.dialplansub) this.dialplansub.unsubscribe();
    if (this.allSubsServicesDataSubs) this.allSubsServicesDataSubs.unsubscribe();
    if (this.dataservicesub) this.dataservicesub.unsubscribe();
    if (this.createEdgeSub) this.createEdgeSub.unsubscribe();
    if (this.subscriberGetSubs) this.subscriberGetSubs.unsubscribe();

    this.systemService.updateSubsSystemStepInfo('');
  }

  formDataUpdate(data, key) {
    // console.log("11", data);
    // console.log("22", key);


    this.subsSysServiceForm[key] = data;
    if (key == 'systems') {
      this.pages.systemsSaved = true;
    }
  }
  disable(data) {
    if (data) {
      this.disableService = true;
    } else {
      this.disableService = true;
    }
  }
  deletesystem(data) {
    this.deleteSystem = data;
  }
  provisionUpdate(data) {
    if (data) this.systemsProvisionData = data;
  }

  updateStepper(tab) {
    this.activeStepper = tab;
    this.hideShowBtns(tab);
  }
  continueSave(data) {
    this.unsavedDta = data
  }
  advancedForms: boolean = false;
  showAdvancedForm() {
    this.advancedForms = !this.advancedForms
  }

  tabs = [
    'add-details',
    'add-services',
    'add-edge-suites',
    'add-system',
    'add-summary'
  ];
  prevTab() {
    let curPos = this.getTabPos();
    let tab = 'add-details';
    if (curPos == 3) {
      if (this.arloEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement || this.proAndExpEnableentitlement || this.ServifyEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
        tab = this.tabs[curPos - 1];
      } else {
        tab = this.tabs[curPos - 2];
      }

    } else {
      tab = this.tabs[curPos - 1];
    }
    if (tab) this.updateStepper(tab);
  }

  nextTab(value?) {
    let curPos = this.getTabPos();
    let tab = 'add-details';
    if (value == 'system') {
      this.continue = true
    }
    if (curPos === 3) {
      if (this.unsavedDta) {
        tab = this.tabs[curPos];
      } else {
        tab = this.tabs[curPos + 1];
      }
    } else if (curPos == 1) {
      if (this.arloEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement || this.proAndExpEnableentitlement || this.ServifyEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
        tab = this.tabs[curPos + 1];
      } else {
        tab = this.tabs[curPos + 2];
      }
    } else {
      tab = this.tabs[curPos + 1];
    }

    if (tab) this.updateStepper(tab);
  }

  getTabPos() {
    return this.tabs.indexOf(this.activeStepper);
  }

  hideShowBtns(tab) {

    switch (tab) {
      case 'add-details':
        this.btnSaveContinue = true;
        this.btnContinue = false;
        this.btnBack = false;
        this.btnSkip = false;
        if (this.pages.subscriberSaved || this.editSubscriber) {
          this.btnSkip = true;
        }

        let title = 'NEW - Subscriber Details';
        if (this.editSubscriber || this.subscriberName) {
          title = `${this.subscriberName ? this.subscriberName : ''} - ${this.language['Subscriber Details']}`;
        }
        this.systemService.updateSubsSystemStepInfo(title);
        break;
      case 'add-services':
        this.btnSaveContinue = true;
        this.btnContinue = false;
        this.btnBack = true;
        this.btnSkip = true;

        let title2 = 'NEW - Subscriber Services';
        if (this.editSubscriber || this.subscriberName) {
          title2 = `${this.subscriberName ? this.subscriberName : ''} - ${this.language['Subscriber Services']}`;
        }
        this.systemService.updateSubsSystemStepInfo(title2);
        break;
      case 'add-edge-suites':
        this.btnSaveContinue = true;
        this.btnContinue = false;
        this.btnBack = true;
        this.btnSkip = true;
        let title3 = 'NEW - EDGE Suites';
        if (this.editSubscriber || this.subscriberName) {
          title3 = `${this.subscriberName ? this.subscriberName : ''} - Managed Services`;
        }
        this.systemService.updateSubsSystemStepInfo(title3);
        break;
      case 'add-system':
        this.btnSaveContinue = false;
        this.btnContinue = true;
        this.btnBack = true;
        this.btnSkip = true;
        let title4 = 'NEW - Systems';
        if (this.editSubscriber || this.subscriberName) {
          title4 = `${this.subscriberName ? this.subscriberName : ''} - ${this.language.Systems}`;
        }
        this.systemService.updateSubsSystemStepInfo(title4);
        break;
      case 'add-summary':
        this.btnSaveContinue = false;
        this.btnContinue = false;
        this.btnBack = true;
        this.btnSkip = false;
        let title5 = 'NEW - Subscriber Summary';
        if (this.editSubscriber || this.subscriberName) {
          title5 = `${this.subscriberName ? this.subscriberName : ''} - Subscriber Summary`;
        }
        this.systemService.updateSubsSystemStepInfo(title5);
        break;
    }
  }
  systemDetails: any;
  getSubscriberData() {
    const subscriberId = this.subscriberInfo.subscriberId ? this.subscriberInfo.subscriberId : this.createdSubscriberId;
    this.subscriberGetSubs = this.systemService.GetSubscriberData(this.ORG_ID, subscriberId).subscribe((res: any) => {
      this.subscriberName = res?.name;
      if (res) {
        // console.clear();
        // console.log(res);
        this.systemDetails = res;
        this.createdSubcriberData = res;
        this.subsSysServiceForm.subscriber = res;
        this.pages.subscriberSaved = true;
        this.createdSubscriberId = res?._id;
        //this.formatListData(this.syetemsAllData);
        //this.getServicesList();
        //this.loading = false;
        this.loading = false;
        this.dataAvail = true;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      this.dataAvail = true;
    })
  }

  saveData() {
    if (this.activeStepper == 'add-details') {
      this.childSubsDetails.saveSubscriber();
    }
    if (this.activeStepper == 'add-edge-suites') {
      this.childSubsEdgesuits.saveSubscriber();
    }
    if (this.activeStepper == 'add-services') {
      this.childSubsServices.saveSubscriber();
    }
    if (this.activeStepper == 'add-system') {
      //this.childSystems.saveAllSystemsData();
    }
  }

  saveSubscriber() {

    let params = this.subsSysServiceForm.subscriber;
    params = this.systemService.removeNull(params);
    params.subscriberLocationId = params.subscriberLocationId.trim();
    params.name = params.name.trim();


    if (!params.subscriberLocationId || !params.name) {
      return
    }

    this.loading = true;
    if (this.editSubscriber || this.savesubscriber) {
      const subsId = this.createdSubcriberData._id;
      this.createSubscriberSubs = this.systemService.UpdateSubscriberData(this.ORG_ID, params, subsId).subscribe((res: any) => {
        this.createdSubscriberId = res?._id;
        this.createdSubcriberData = res;
        this.subscriberName = res.name ? res.name : '';
        this.successInfo = 'Subscriber updated successfully';
        this.error = false;
        this.success = true;
        this.pages.subscriberSaved = true;
        this.getSubscriberData();
        setTimeout(() => {
          this.success = false;
          this.updateStepper('add-services');


        }, 1000);
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        //console.log(err);
        this.pageErrorHandle(err);
        this.loading = false;
      });
    } else {
      this.createSubscriberSubs = this.systemService.AddSubscriberData(this.ORG_ID, params).subscribe((res: any) => {
        this.createdSubscriberId = res?._id;
        this.createdSubcriberData = res;
        this.subscriberName = res.name ? res.name : '';
        this.successInfo = 'Subscriber added successfully';
        this.savesubscriber = true;
        this.error = false;
        this.success = true;
        this.pages.subscriberSaved = true;
        this.getSubscriberData();
        setTimeout(() => {
          this.success = false;
          this.updateStepper('add-services');
        }, 1000);
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        //console.log(err);
        this.pageErrorHandle(err);
        this.loading = false;
      });
    }
  }
  allFormData(value) {
    this.syetemsAllData = value
  }

  saveEdgesuiteData(event) {
    this.edgeParams = Object.assign({}, this.subsSysServiceForm.edgeSuites);
    if (this.edgeParams?.arloSmart?.enabled && !this.edgeParams?.arloSmart?.email) {
      return;
    } else if (this.edgeParams?.arloSmart?.enabled && this.edgeParams?.arloSmart?.email && !(this.commonOrgService.validateEmail(this.edgeParams?.arloSmart?.email))) {
      return;
    }
    let params: any = {
      protectIQ: {},
      experienceIQ: {},
      bark: {},
      smallBizIQ: {},
      myCommunityIQ: this.edgeParams.myCommunityIQ
    };
    if (params.myCommunityIQ?.subscriber?.communities) {
      params.myCommunityIQ.subscriber.communities = params.myCommunityIQ.subscriber.communities.map((element) => {
        return (typeof (element) == 'object' && element != null) ? element : { micrositeId: element }
      })
    }
    if (params.myCommunityIQ?.passpoint?.communities) {
      params.myCommunityIQ.passpoint.communities = params.myCommunityIQ.passpoint.communities.map((element) => {
        return (typeof (element) == 'object' && element != null) ? element : { micrositeId: element }
      })
    }

    if (!params.myCommunityIQ?.subscriber?.enable) {
      delete params.myCommunityIQ?.subscriber?.communities
    }
    delete params.myCommunityIQ?.subscriber?.communitiesDuplicate;
    delete params.myCommunityIQ?.passpoint?.communitiesDuplicate

    if (!params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.eduroam?.primaryServer;
      delete params.myCommunityIQ?.eduroam?.secret;
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
    }
    if (params?.myCommunityIQ?.network?.type == '') {
      delete params.myCommunityIQ.network
    } else if (params?.myCommunityIQ?.network?.type == 'Route') {
      delete params?.myCommunityIQ?.network?.vlanId;
      delete params?.myCommunityIQ?.network?.protocol;
    } else if (params?.myCommunityIQ?.network?.type == 'Bridge') {
      delete params?.myCommunityIQ?.network?.protocol;
    } else if (params?.myCommunityIQ?.network?.type == 'Bridge') {
      delete params?.myCommunityIQ?.network?.protocol;
    }
    if (params?.myCommunityIQ?.eduroam?.secondaryServer == '') {
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
    }
    if (this.edgeParams?.smallBizIQ?.enable) {
      params.smallBizIQ = {
        enable: this.edgeParams?.smallBizIQ?.enable
      }
    } else if (this.edgeParams?.smallBizIQ) {
      params.smallBizIQ = {
        enable: false
      }
    } else {
      params.smallBizIQ = {}
    }
    if (this.edgeParams.bark?.enable) {
      params.bark = {
        email: this.edgeParams.bark?.email,
        planCode: this.edgeParams.bark?.planCode,
      }
    } else {
      params.bark = {}
    }
    if(this.proAndExpEnableentitlement || this.ExperienceIQEnableentitlement){
    params.experienceIQ = {
      subscribed: this.edgeParams.experienceIQ.subscribed,
      enabled: this.edgeParams.experienceIQ.enabled
    }}
    if(this.productIQEnableentitlement || this.proAndExpEnableentitlement){
    params.protectIQ = {
      subscribed: this.edgeParams.protectIQ.subscribed,
      enabled: this.edgeParams.protectIQ.enabled
    }}
    if (!params.myCommunityIQ?.passpoint?.enable) {
      delete params.myCommunityIQ?.passpoint?.communities
    }
    if (!params.myCommunityIQ?.passpoint?.enable && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.network;
      delete params.myCommunityIQ?.prioritizeTraffic;
    }
    if (params.myCommunityIQ?.passpoint?.communities?.length) {
      params.myCommunityIQ?.passpoint?.communities.map((element) => {
        return (typeof (element) == 'object' && element != null) ? element : { micrositeId: element }
      })
    }
    if (params.myCommunityIQ?.subscriber?.communities?.length) {
      params.myCommunityIQ?.subscriber?.communities.map((element) => {
        return (typeof (element) == 'object' && element != null) ? element : { micrositeId: element }
      })
    }
    if (this.edgeParams?.arloSmart?.enabled) {
      params['arloSmart'] = _.pickBy(this.edgeParams.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
    }
    if (this.edgeParams?.servifyCare?.enabled) {
      params['servifyCare'] = _.pickBy(this.edgeParams.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));
    if (this.editSubscriber) {
      this.systemParams = {
        sn: '',
        subscriberId: this.createdSubcriberData._id
      }
    } else {
      this.systemParams = {
        sn: '',
        subscriberId: this.createdSubscriberId
      }
    }

    let paramsEnabled = _.cloneDeep(params);
    this.updationEdgeSuitesData = _.cloneDeep(params);
    this.updationEdgeSuitesData['experienceIQInpEnabled'] = event.experienceIQ ? true : false;
    this.updationEdgeSuitesData['protectIQInpEnabled'] = event.protectIQ ? true : false;
    if(this.proAndExpEnableentitlement || this.ExperienceIQEnableentitlement){
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];}
    if(this.productIQEnableentitlement || this.proAndExpEnableentitlement){
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];}

    this.loading = true;
    this.createEdgeSub = this.systemService.updateEdgeSuitsData(this.ORG_ID, this.systemParams, params).subscribe((res: any) => {

      let delay = 1000;
      if (res && res.estimatedDelay) {
        delay += res.estimatedDelay * 1000;
      }

      if (this.IQSuiteShow && event && (event.protectIQ || event.experienceIQ)) {
        setTimeout(() => {
          this.updateApplicationService(event, paramsEnabled, delay);
        }, 500);
      } else {
        delay = delay + 2000;
        setTimeout(() => {
          this.getEdgeSuiteAllData(true);
          this.getAllSubsServicesData(false, true)
        }, delay);
      }



    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  //NetWork Service Save
  saveServiceData() {
    const paramsData = []
    const subId = this.createdSubscriberId ? this.createdSubscriberId : this.createdSubcriberData._id ? this.createdSubcriberData._id : '';
    //DATA PROCESS
    this.serviceParams = this.subsSysServiceForm.services;
    // console.log("service params", this.serviceParams);
    delete this.serviceParams?.data?.isStaticHost;
    //if(this.serviceParams?.data?.interface !== 'G1') delete this.serviceParams?.data?.staticIpAddressFamily;
    
    this.serviceParams.data = _.pickBy(this.serviceParams.data, v => {
      return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    });
    if (!this.serviceParams?.data?.usoc) {
      this.serviceParams.data = {_id:this.serviceParams.data._id||false};
    } else {
      this.serviceParams.data.type = "data";
      this.serviceParams.data.activate = true;
    }
    const params = this.serviceParams.data;
    paramsData.push(params);



    this.serviceParams.video = _.pickBy(this.serviceParams.video, v => {
      return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    });
    if (!this.serviceParams?.video?.usoc) {
      this.serviceParams.video = {_id:this.serviceParams.video._id||false};
    } else {
      this.serviceParams.video.type = "video";
      if (this.serviceParams.video?.interface == "RG F1") {
        if (this.serviceParams.video?.interface1) {
          this.serviceParams.video.interface = this.serviceParams.video?.interface1
          delete this.serviceParams?.video?.interface1;
          delete this.serviceParams?.video?.memberPorts;
        }
      } else {
        delete this.serviceParams?.video?.interface1;
      }
      this.serviceParams.video.activate = true;
      delete this.serviceParams?.video?.isStaticHost;
    }
    let voiceInterfaces = [];
    const requestvideo = this.serviceParams.video;
    paramsData.push(requestvideo);
    const ServiceType = this.serviceParams.voice?.voiceServiceType ? this.serviceParams.voice?.voiceServiceType : '';
    //p1
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P1'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P1']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P1'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P1'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P1'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P1'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P1'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P1'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P1'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P1']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P1'].X_000631_H248.terminationId
      }

      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P1'])
    }
    //p2
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P2'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P2']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P2'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P2'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P2'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P2'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P2'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P2'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P2'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P2']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P2'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P2'])
    }
    //p3
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P3']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P3'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P3']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P3'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P3'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P3'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P3'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P3'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P3']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P3'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P3'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P3']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P3'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P3'])
    }
    //p4
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P4']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P4'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P4']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P4'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P4'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P4'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P4'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P4'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P4']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P4'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P4'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P4']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P4'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P4'])
    }
    //p5
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P5']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P5'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P5']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P5'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P5'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P5'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P5'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P5'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P5']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P5'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P5'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P5']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P5'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P5'])
    }
    //p6
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P6']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P6'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P6']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P6'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P6'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P6'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P6'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P6'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P6']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P6'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P6'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P6']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P6'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P6'])
    }
    //p7
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P7']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P7'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P7']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P7'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P7'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P7'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P7'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P7'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P7']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P7'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P7'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P7']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P7'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P7'])
    }
    //p8
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P8']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P8'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['P8']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['P8'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['P8'].SIP.sipUsername,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['P8'].SIP.sipPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['P8'].SIP.sipUri
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P8'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['P8']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['P8'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['P8'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['P8']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['P8'].X_000631_H248.terminationId
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['P8'])
    }
    //L1
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L1'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L1'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['L1'].SIP.AuthUserName,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['L1'].SIP.AuthPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['L1'].SIP.URI,
        callerId: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.CallerIDEnable,
        callWaiting: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.CallWaitingEnable,
        threeWayCalling: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.X_000631_ThreewayCallingEnable,
        //faxT38: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.faxT38,
        mwi: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.MWIEnable,
        directConnect: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.X_000631_DirectConnectEnable,
        directConnectNumber: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.X_000631_DirectConnectNumber,
        directConnectTimer: this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.X_000631_DirectConnectTimer,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.TransmitGain * 10,
      }


      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L1'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L1'] = {
        name: 'L1',
        enable: this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['L1'].X_000631_H248.TerminationId,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L1'])
    } else if (ServiceType === 'MGCP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L1'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L1'].MGCP.name,
        gr303: this.serviceParams?.voice?.voiceInterfaces['L1'].MGCP.X_000631_GR303,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L1'])
    } else if (ServiceType === 'X_000631_TDMGW' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L1'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L1']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L1'].MGCP.name,
        crv: this.serviceParams?.voice?.voiceInterfaces['L1'].X_000631_TdmGw.Crv,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L1'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L1'])
    }
    //L2
    if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L2'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L2'].SIP.name,
        sipUsername: this.serviceParams?.voice?.voiceInterfaces['L2'].SIP.AuthUserName,
        sipPassword: this.serviceParams?.voice?.voiceInterfaces['L2'].SIP.AuthPassword,
        sipUri: this.serviceParams?.voice?.voiceInterfaces['L2'].SIP.URI,
        callerId: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.CallerIDEnable,
        callWaiting: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.CallWaitingEnable,
        threeWayCalling: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.X_000631_ThreewayCallingEnable,
        //faxT38: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.faxT38,
        mwi: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.MWIEnable,
        directConnect: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.X_000631_DirectConnectEnable,
        directConnectTimer: this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.X_000631_DirectConnectTimer,
        directConnectNumber: parseInt(this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.X_000631_DirectConnectNumber),
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.TransmitGain * 10,
      }


      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L2'])
    } else if (ServiceType === 'H.248' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L2'] = {
        name: this.serviceParams?.voice?.voiceInterfaces['L2'].X_000631_H248.name,
        enable: this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable,
        terminationId: this.serviceParams?.voice?.voiceInterfaces['L2'].X_000631_H248.TerminationId,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L2'])
    } else if (ServiceType === 'MGCP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L2'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L2'].MGCP.name,
        gr303: this.serviceParams?.voice?.voiceInterfaces['L2'].MGCP.X_000631_GR303,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L2'])
    } else if (ServiceType === 'X_000631_TDMGW' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable) {
      this.serviceParams.voice.voiceInterfaces['L2'] = {
        enable: this.serviceParams?.voice?.voiceInterfaces['L2']?.Enable,
        name: this.serviceParams?.voice?.voiceInterfaces['L2'].MGCP.name,
        crv: this.serviceParams?.voice?.voiceInterfaces['L2'].X_000631_TdmGw.Crv,
        receiveGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.ReceiveGain * 10,
        transmitGain: this.serviceParams?.voice?.voiceInterfaces['L2'].VoiceProcessing.TransmitGain * 10,
      }
      voiceInterfaces.push(this.serviceParams.voice.voiceInterfaces['L2'])
    }

    if (!this.serviceParams?.voice?.usoc) {
      this.serviceParams.voice = {_id:this.serviceParams.voice._id||false};
    } else {
      this.serviceParams.voice.type = "voice";
      this.serviceParams.voice.activate = true;
      if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && (this.serviceParams?.voice?.voiceInterfaces['L1']?.enable || this.serviceParams?.voice?.voiceInterfaces['L2']?.enable)) {
        // this.serviceParams.voice.faxT38 = this.serviceParams?.voice?.voiceInterfaces['L1'].CallingFeatures.faxT38
      } else {
        delete this.serviceParams.voice.faxT38
      }
      if (ServiceType === 'SIP' && this.serviceParams.voice?.voiceInterfaces && Object.keys(this.serviceParams.voice?.voiceInterfaces).length && this.serviceParams?.voice?.voiceInterfaces['L2']?.enable) {
        // this.serviceParams.voice.faxT38 = this.serviceParams?.voice?.voiceInterfaces['L2'].CallingFeatures.faxT38
      }
      delete this.serviceParams?.voice?.ServiceConnectionType;
      //delete this.serviceParams.voice.faxT38
    }
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P1']) delete this.serviceParams?.voice?.voiceInterfaces['P1']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P2']) delete this.serviceParams?.voice?.voiceInterfaces['P2']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P3']) delete this.serviceParams?.voice?.voiceInterfaces['P3']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P4']) delete this.serviceParams?.voice?.voiceInterfaces['P4']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P5']) delete this.serviceParams?.voice?.voiceInterfaces['P5']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P6']) delete this.serviceParams?.voice?.voiceInterfaces['P6']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P7']) delete this.serviceParams?.voice?.voiceInterfaces['P7']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['P8']) delete this.serviceParams?.voice?.voiceInterfaces['P8']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['L1']) delete this.serviceParams?.voice?.voiceInterfaces['L1']
    if (this.serviceParams.voice?.voiceInterfaces && this.serviceParams?.voice?.voiceInterfaces['L2']) delete this.serviceParams?.voice?.voiceInterfaces['L2']
    if (voiceInterfaces?.length !== 0) {
      this.serviceParams.voice.voiceInterfaces = voiceInterfaces ? voiceInterfaces : [];
    } else {
      this.serviceParams.voice.voiceInterfaces = [];
    }
    if (!this.serviceParams.voice?.staticIpAddress) {
      delete this.serviceParams.voice?.staticNetmask;
      delete this.serviceParams.voice?.staticGateway;
    }
    this.serviceParams.voice = _.pickBy(this.serviceParams.voice, v => v !== null && v !== "");
    const voiceparams = this.serviceParams.voice;
    if(!this.serviceParams.voice.voiceInterfaces.length) delete this.serviceParams.voice.voiceInterfaces
    paramsData.push(voiceparams);

    if (paramsData[2]?.port?.every(e => e.includes('ONT')) || (paramsData[2]?.staticIpConfigurations && !paramsData[2]?.staticIpConfigurations[0]?.staticIpAddress)) {
      delete paramsData[2]?.staticIpConfigurations
    }
    let serviceData = paramsData.map((e: any) => {
      let billingData = this.allSubsServicesData?.services.find(x => (x.type === e.type && x.usoc === e.usoc)) || {};
      if (billingData?.customerType) {
        return Object.assign(billingData, e);
      };
      return e;
    })
    // if(paramsData[2]?.staticIpConfigurations && !paramsData[2]?.staticIpConfigurations[0]?.staticIpAddress){
    //   delete paramsData[2]?.staticIpConfigurations
    // }
    serviceData.forEach(e=>{
      if(Object.keys(e).length === 1 && !e._id) return;
      this.dataloading = true;
      this.systemService.saveServiceData(subId, e).subscribe((res: any) => {
        this.pages.servicesSaved = true;
        this.dataloading = false;
        this.loading = true;
        this.getAllSubsServicesData(true);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.dataloading = false;
      })
    });
    if(serviceData.every(e=> Object.keys(e).length === 1 && !e._id)){
      if (this.arloEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement || this.proAndExpEnableentitlement || this.ServifyEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
        this.updateStepper('add-edge-suites');
      } else {
        this.updateStepper('add-system');
      }
    }
  }

  //billing API
  getAllSubsServicesData(onSave?, value?) {
    //debugger
    if (!this.subscriberInfo || !this.subscriberInfo?.subscriberId) {
      this.subscriberInfo.subscriberId = this.createdSubcriberData?._id ? this.createdSubcriberData?._id : '';
    }
    this.dataservice = {};
    this.dataservice1 = {}
    this.videoservice = {};
    this.VoiceService = {};
    this.allSubsServicesDataSubs = this.systemService.getDetailedSubscriberServices(this.subscriberInfo.subscriberId).subscribe((res: any) => {
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        this.devicesList = res?.devices
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          this.disableSystem = true

          if (services[i].type === 'data' || services[i].type === 'DATA') {
            this.dataservice = services[i] ? services[i] : {};
            this.pages.servicesSaved = true;
          } else if (services[i].type === 'data1' || services[i].type === 'DATA1') {
            this.dataservice1 = services[i] ? services[i] : {};;
            this.pages.servicesSaved = true;
          } else if (services[i].type === 'video' || services[i].type === 'VIDEO') {
            this.videoservice = services[i] ? services[i] : {};;
            this.pages.servicesSaved = true;
          } else if (services[i].type === 'voice' || services[i].type === 'VOICE') {
            this.VoiceService = services[i] ? services[i] : {};;
            this.pages.servicesSaved = true;
          }
          if (!this.dataservice1?.activate && !this.videoservice?.activate && !this.VoiceService?.activate) {
            this.NotCocService = true
            this.pages.servicesSaved = false;
          }
        }
        services?.forEach(e => {
          if (e.type.toLowerCase().includes('data') && e.hasOwnProperty('activate')) {
            this.dataservice = e;
          } else if (e.type.toLowerCase().includes('video') && e.hasOwnProperty('activate')) {
            this.videoservice = e;
          } else if (e.type.toLowerCase().includes('voice') && e.hasOwnProperty('activate')) {
            this.VoiceService = e
          }
        });
        this.subsSysServiceForm.services = {
          data: _.cloneDeep(this.dataservice),
          data1: _.cloneDeep(this.dataservice1),
          video: _.cloneDeep(this.videoservice),
          voice: _.cloneDeep(this.VoiceService)
        }
        this.defaultServices = {
          data: _.cloneDeep(this.dataservice),
          data1: _.cloneDeep(this.dataservice1),
          video: _.cloneDeep(this.videoservice),
          voice: _.cloneDeep(this.VoiceService)
        };
        this.getServicesStatus();
      } else {
        this.subsSysServiceForm.services = {
          data: {},
          data1: {},
          video: {},
          voice: {}
        }
        this.disableSystem = false
        this.defaultServices = {
          data: {},
          data1: {},
          video: {},
          voice: {}

        };
        this.getServicesStatus();
      }
      //to fix: CCL-33855
      if (value) {
        if (res && res.devices && res.devices.length !== 0) {
          this.devices = res.devices;
          let devices = [];
          res.devices.forEach(el => {
            setTimeout(() => {
              this.provosionrecords(el.trim());
            }, 5000);
          })
        }
      }
      if (!onSave) {
        if (res && res.devices && res.devices.length !== 0) {
          this.devices = res.devices;
          let devices = [];
          res.devices.forEach(el => {
            setTimeout(() => {
              this.deviceDetail(el.trim());
            }, 500);
          })
        } else {
          this.loading = false;
          setTimeout(() => {
            this.systemDataAvail = true;
          }, 500);
        }
      } else {
        this.error = false;
        this.success = true;
        this.successInfo = 'Network Services updated successfully';
        this.loading = false;
        setTimeout(() => {
          this.success = false;
          if (this.arloEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement || this.proAndExpEnableentitlement || this.ServifyEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
            this.updateStepper('add-edge-suites');
          } else {
            this.updateStepper('add-system');
          }
        }, 1000);
      }
      //this.subsSysServiceForm.systems = res?.devices ? res?.devices : [];

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      if (!onSave) {
        setTimeout(() => {
          this.systemDataAvail = true;
        }, 500);
      }

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
          if (el.indexOf("844F") == -1 && el.indexOf("801F") == -1) {
            this.Modelitems.push(el)
          }
        })

      }
    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }
  deviceDetail(system) {
    this.deviceInformation = JSON.parse(localStorage.getItem("calix.Device_Details"))
    let devices = this.deviceInformation?.devices;
    this.deviceInfoData = [];
    if (devices) {
      for (var i = 0; i < devices?.length; i++) {
        if ((devices[i]?.deviceId?.toUpperCase() === system?.toUpperCase()) || (devices[i][i]?.deviceId?.toUpperCase() === system?.toUpperCase())) {
          let serialNo = devices[i]?.serialNumber ? devices[i]?.serialNumber : system
          if (devices[i]?.ont && devices[i]?.opModeWithOnt == 'ONT') {
            this.discoveredDevice = true
            this.serialNum = (devices[i]?.ont?.vendorId + devices[i]?.ont?.serialNo);
            this.opModeont = devices[i]?.opModeWithOnt;
            let systemid = (devices[i]?.ont?.vendorId + '00' + devices[i]?.ont?.serialNo);
            //system = systemid? systemid:system
            const fsanMac = this.serialNum ? this.serialNum : devices[i]?.macAddress?.toUpperCase()
            this.getstatussub = this.systemService.getOntDeviceStatus(fsanMac).subscribe((res: any) => {
              let deviceopmode = devices.filter(el => el.deviceId === system)
              if (res?.ontDevices?.length !== 0) {
                let response = res?.ontDevices[0]
                this.ontsysInfo = {
                  modelName: response?.discoveredModel ? response?.discoveredModel : response?.profileName,
                  macAddress: response?.discoveredMacAddress ? response?.discoveredMacAddress : response?.macAddress,
                  registrationId: response?.discoveredRegistrationId,
                  opMode: deviceopmode[0]?.opModeWithOnt ? deviceopmode[0].opModeWithOnt : this.opModeont ? this.opModeont : 'ONT',
                  softwareVersion: response?.discoveredVersion,
                  serialNumber: response?.discoveredSerialNumber ? response?.discoveredSerialNumber : response?.serialNumber,
                  vendorId: response?.discoveredVendorId,
                  discoveredPonPort: response?.discoveredPonPort,
                  location: `${response?.region}/${response?.location}`,
                  oltName: response?.oltName
                };
                // console.log(deviceopmode[0]?.opModeWithOnt ? deviceopmode[0].opModeWithOnt : this.opModeont ? this.opModeont : 'ONT')
                if (this.ontsysInfo?.opMode === 'RG' || this.ontsysInfo?.opMode === 'ONT/RG') {
                  if ((this.ontsysInfo?.modelName).indexOf("GS") !== -1 || (this.ontsysInfo?.modelName).indexOf("GM") !== -1 || (this.ontsysInfo?.modelName).indexOf("GPR") !== -1) {
                    this.iqsuitEnable = true;
                  } else {
                    this.iqsuitEnable = false;
                  }
                  if (this.ontsysInfo?.softwareVersion?.substring(0, 4) < 23.1) {
                    this.allowSmallBiz = false
                    this.deviceData = {
                      modelName: this.ontsysInfo?.modelName,
                      softwareVersion: this.ontsysInfo?.softwareVersion
                    }
                  } else if (this.ontsysInfo?.bSmbMode) {
                    this.allowSmallBiz = true
                  } else {
                    this.allowSmallBiz = true
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
                  } else {
                    this.iqsuitEnable = true
                  }

                }

              } else {
                this.ontsysInfo = {};
              }

              setTimeout(() => {
                this.provosionrecords(system, this.ontsysInfo, this.discoveredDevice);
              }, 500);


            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
              this.systemDataAvail = true;
            })
          } else {
            this.deviceInfoSub = this.systemService.getDeviceInfo(this.ORG_ID, serialNo).subscribe((res: any) => {
              if (res) {
                this.deviceInfoData.push(res);
                // console.log(res);
                this.discoveredDevice = true;
                if (res?.opMode === 'RG') {
                  if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
                    this.iqsuitEnable = true;
                  } else {
                    this.iqsuitEnable = false;
                  }
                  if (res?.softwareVersion?.substring(0, 4) < 23.1) {
                    this.allowSmallBiz = false
                    this.deviceData = {
                      modelName: res?.modelName,
                      softwareVersion: res?.softwareVersion
                    }
                  } else if (res?.bSmbMode) {
                    this.allowSmallBiz = true
                  } else {
                    this.allowSmallBiz = true
                  }
                }
              }
              setTimeout(() => {
                this.provosionrecords(system, res, this.discoveredDevice);
              }, 500);


            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
            })
          }
        }

      }
    } else {
      this.deviceInfoSub = this.systemService.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
        if (res) {
          this.deviceInfoData.push(res);
          // console.log(res);
          this.discoveredDevice = true;
          if (res?.opMode === 'RG') {
            if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true;
            } else {
              this.iqsuitEnable = false;
            }
          }
        }
        setTimeout(() => {
          this.provosionrecords(system, res, this.discoveredDevice);
        }, 500);


      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  provosionrecords(system, device?, discoveredDevice?) {
    this.provisionInfosub = this.systemService.getProvisionrecord(this.ORG_ID, system).subscribe((res: any) => {
      this.provisionData = {};
      let resp = res ? res : {}
      // if (res?.opMode === 'RG' && res?.modelName) {
      //   if ((res?.modelName).indexOf("GS") !== -1 || (res.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
      //     this.iqsuitEnable = true;
      //   } else {
      //     this.iqsuitEnable = false;
      //   }
      // }
      if (res) {
        if ((res?.data && !res?.data?.serviceOrchestrationProfile) || (res?.voice && !res?.voice?.serviceOrchestrationProfile) || (res?.video && !res?.video?.serviceOrchestrationProfile)) {
          this.hideService = true
        } else {
          this.hideService = false
        }
      }
      if (Object.keys(resp).length == 0 && !device) {
        this.iqsuitEnable = true;
      }
      setTimeout(() => {
        this.getsystemData(system, res, device, discoveredDevice);
      }, 500);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  updateDefaultSystemData(data) {
    this.systemFormData[data.system] = {
      system: data.system,
      device: data.device,
      provison: data.provision
    }
    this.changeEdgeSuitesProperties(true, data.system);
  }
  getsystemData(system, provisionRecord, device, discoveredDevice) {
    // if(this.deviceType === "%RegId" && this.linkageType ===  "REG_ID"){
    //   this.systemId = device?.registrationId ? device?.registrationId : system
    // }
    this.systemFormData[system] = {
      system: system,
      device: device,
      provison: provisionRecord,
      discoveredDevice: discoveredDevice

    }
    let devices = [];
    this.systeminfo = Object.values(this.systemFormData)
    // const index = this.systeminfo.findIndex(device => device?.device?.opMode ? device?.device?.opMode == 'RG' : device?.provison?.opMode ? device?.provison?.opMode == 'RG' : '');
    // if (index > -1) this.systeminfo.splice(0, 0, this.systeminfo.splice(index, 1)[0]);
    if (this.devices) {
      if (this.systeminfo.length === this.devices.length || this.systeminfo.length === this.deviceInformation?.devices?.length) {
        const order = {
          'ONT': 1,
          'RG': 2,
          'WAP': 3
        }
        this.systeminfo = this.systeminfo.sort((a, b) => {
          let opmodeA = a['ONT'] ? 'ONT' : a?.device?.opMode ? a?.device?.opMode : '';
          let opmodeB = b['ONT'] ? 'ONT' : b?.device?.opMode ? b?.device?.opMode : '';
          return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
        });

        this.systeminfo.forEach(el => {
          devices.push({
            deviceId: el?.system ? el.system.trim() : '',
            serialNumber: el?.device?.serialNumber ? el?.device?.serialNumber : el?.system ? el.system.trim() : '',
            showAdvanced: false,
            opmode: el?.provison?.opMode ? el?.provison?.opMode : el?.device?.opMode  ,
            saved: true,
            discoveredDevice: discoveredDevice
          })
        });
        // console.clear();
        // console.log("devices",devices)
        this.systemssummary = devices
        this.subsSysServiceForm.systems = devices;
        this.pages.systemsSaved = true;
        setTimeout(() => {
          this.systemDataAvail = true;
        }, 500);
        this.loading = false;
        this.changeEdgeSuitesProperties();
      }
      if (this.deviceInformation?.devices?.length !== this.devices.length) {
        setTimeout(() => {
          this.systemDataAvail = true;
          this.loading = false;
        }, 3000);
      }

    }

  }

  getDialPlan() {
    this.dialplansub = this.systemService.getDialPlan(this.ORG_ID).subscribe((res: any) => {
      this.DialPlanitems = res ? res : [];
      this.formOptions.DialPlanitems = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  getProfileData() {
    //if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    this.bandwidthLoading = true;
    this.getAllProfileSubscribe = this.systemService.getBWProfile(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        this.formOptions.Profiles = this.buildeServiceProfileList(res);
        this.buildBWProfile(res);
        this.bwDataAvail = true;
      } else {
        this.formOptions.Brandwidthitems = [];
        this.formOptions.Profiles = [];
        this.bandwidthLoading = false;
        this.bwDataAvail = true;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.formOptions.Brandwidthitems = [];
      this.formOptions.Profiles = [];
      this.bandwidthLoading = false;
      this.bwDataAvail = true;
    }, () => {

    });
  }

  getOrgAdminData() {
    this.loading = true;
    this.systemService.fetchAmdins('All').subscribe((data: any) => {
      this.loading = false;
      if (data == 'Org Admin Data not found') {
        this.adminsData = [];
        this.rgManagement = '';
        this.provisionOntService=false
        return;
      }
      if (data) {
        this.orgEnable = data.orgEnable;
        this.deviceType = data?.ontNameFormat
        this.linkageType = data?.ontIdType
        this.rgManagement = data.rgManagement ? data.rgManagement : 'NATIVE';
        this.provisionOntService=data?.provisionOntService
      }
      this.loading = false;
    }, err => {
      this.pageErrorHandle(err);
    })
  }

  buildBWProfile(profileList) {
    const bwProfile = profileList.filter(profile => {
      return (profile.innerProfileCategory === 'Bandwidth')
    });
    this.formOptions.Brandwidthitems = [...bwProfile];
    this.bandwidthLoading = false;
    this.bwDataAvail = true;
  }

  getEdgeSuiteAllData(onSubmit?) {
    this.loading = true;
    if (!this.subscriberInfo || !this.subscriberInfo?.subscriberId) {
      this.subscriberInfo.subscriberId = this.createdSubcriberData?._id ? this.createdSubcriberData?._id : '';
    }
    this.systemGetSubs = this.systemService.getSubscribersSystemList( this.subscriberInfo, true).subscribe((res: any) => {
      if (res && res?.edgeSuites) {
        this.syetemsAllData = res ? res : {};
        if (onSubmit) {
          if(this.proAndExpEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement){
            this.updated = this.checkUpdatedEdgeSuites(res);
          } else{
            this.updated=true
          }
          if (!this.updated && this.IQSuiteShow) {
            if (this.getEdgeSuitesCalled >= 24) {
              this.commonProcessingCall(res, onSubmit);
            } else {
              setTimeout(() => {
                this.getEdgeSuiteAllData(true);
                this.getEdgeSuitesCalled++;
              }, 5000);
            }
          } else {
            this.commonProcessingCall(res, true);
          }
        } else {
          this.commonProcessingCall(res, false);
        }

      } else {
        this.subsSysServiceForm.edgeSuites = [];
        this.loading = false;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  commonProcessingCall(res, onSubmit) {
    if (res) {
      this.subscriberName = this.syetemsAllData?.subscriber?.name;
      this.model = this.syetemsAllData?.modelName;
      this.subsSysServiceForm.edgeSuites = this.syetemsAllData?.edgeSuites;
      this.loading = false;
      this.pages.edgeSuitesSaved = true;
    } else {
      this.loading = false;
    }

    if (onSubmit) {
      let msg = 'Managed Services data updated successfully';
      this.showSuccessMessage(this.language[msg], 2500);
      setTimeout(() => {
        this.success = false;
        this.updateStepper('add-system');
      }, 2500);
      this.loading = false;
    }
  }
  getServiceallDatas() {
    let request = [];

    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=DATA`);
    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=VOICE`);

    request.push(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=VIDEO`);
    if (this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) {
      request.push(`${environment.API_BASE_URL}foundation/feature/arlo/serviceroles`)
    }
    if (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
      request.push((`${environment.API_BASE_URL}foundation/feature/servify/plans`), (`${environment.API_BASE_URL}foundation/feature/servify/cancelreasons`))
    }
    const requests = [];
    request.forEach(endpoint => {
      const req = this.systemService.callRestApi(endpoint).pipe(map((res: any) => {
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
        this.VoicePlan = [];
      } else {
        this.VoicePlan = response[1] ? response[1] : [];
        if (response[1] !== "Service definition not found") {
          for (var i = 0; i < this.VoicePlan?.length; i++) {
            const voiceplan = this.VoicePlan[i]
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

      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3]);
        this.formOptions.ArloServicePlan = [];
      } else {
        this.formOptions.ArloServicePlan = response[3] ? response[3] : [];
      }

      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4]);
        this.formOptions.servifyPlan = [];
      } else {
        this.formOptions.servifyPlan = response[4] ? response[4] : [];
      }

      if (response[5] && response[5].error) {
        this.pageErrorHandle(response[5]);
        this.formOptions.servifyCancelcode = [];
      } else {
        this.formOptions.servifyCancelcode = response[5] ? response[5] : [];
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

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else if (err.status == 409) {
      let locatinId = err.error.errorMessage.split('"')[1];
      this.errorInfo = this.language.addServiceError(locatinId);
    }
    else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;

  }

  closeAlert() {
    this.error = false;
    this.success = false;
    //this.edgeSuitsWarning = false;
  }
  from: any
  closeAddFlow(finish?) {

    if (this.redirectToView && this.redirectToView === 'view') {
      let sn = this.subsSysServiceForm.systems.find(element => element.saved && (element.opmode == 'RG' || element.opmode == ''))
      let subscriberId = this.createdSubcriberData?._id ? this.createdSubcriberData?._id : '';
      let queryParams = { sn: (sn?.deviceId) ? sn.deviceId : '', subscriber: subscriberId };
      if (!subscriberId) {
        this.goToList();
      }
      if (this.subscriberImpacted && (this.from == 'Subscriber Impact' && !finish)) {
        this.router.navigate(['/cco/system/subscribers-impact'])
      } else {
        if (this.subscriberImpacted) {
          queryParams['subscriberImpacted'] = this.subscriberImpacted;
        }
        this.router.navigate(['/cco/system/cco-subscriber-system/system-details'], { queryParams: queryParams });
      }
    } else {
      this.goToList();
    }
  }

  goToList() {
    let searchText = sessionStorage.getItem('cco_susb_system_list_search');
    if (searchText) {
      if (this.subscriberImpacted) {
        this.router.navigate(['/cco/system/subscribers-impact'])
      } else {
        this.router.navigate(['/cco/services/subscribers/system/list'], { state: { ccoSystemSearchText: searchText || '' } });
      }
    } else {
      if (this.subscriberImpacted) {
        this.router.navigate(['/cco/system/subscribers-impact'])
      } else {
        this.router.navigate(['/cco/services/subscribers/system/list']);
      }
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
    entitlement['Bark_Premium'] = entitlement[219] ? entitlement[219] : [];
    entitlement['Bark_Junior'] = entitlement[220] ? entitlement[220] : [];
    entitlement['smallBizIQ'] = entitlement[218] ? entitlement[218] : [];
    entitlement['Platinum'] = entitlement[215] ? entitlement[215] : [];
    entitlement['Silver'] = entitlement[216] ? entitlement[216] : [];
    entitlement['Gold'] = entitlement[217] ? entitlement[217] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.myCommunityIQEntitlement = true;
    } else {
      this.myCommunityIQEntitlement = false;
    }
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


  //-------------
  buildeServiceProfileList(profileLists) {
    let serviceList = [];
    profileLists.forEach(item => {
      if (item.configurations.filter(service => { return (service.category.indexOf('Service') !== -1) }).length === 1) {

        item.configurations.forEach(category => {
          if (category.category.indexOf('Service') !== -1) {
            const cateObj: any = {
              name: item.name,
              _id: item._id,
              //orgId: item.orgId,
              configurations: category,
              VLAN: this.getVLANValue(category),
              Mode: category.parameterValues.Mode,
              BridgeMemberPort: this.getBridgePort(category.parameterValues),
              defaultConnectionService: category.parameterValues.defaultConnectionService !== undefined ? category.parameterValues.defaultConnectionService : false,
              IPTVSSID: category.parameterValues.EnableIPTV_SSID !== undefined ? category.parameterValues.EnableIPTV_SSID : false,
            }
            serviceList.push(cateObj);
          }
        });
        //this.addDeviceObj.configurationObj['seriviceList'] = serviceList;
      }
    });

    return serviceList;
  }

  getBridgePort(parameterValues) {
    const videoServiceBridgePort = [{
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.15",
      "displayName": "5GHz IPTV SSID"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.1",
      "displayName": "LAN Port 1"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.2",
      "displayName": "LAN Port 2"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.3",
      "displayName": "LAN Port 3"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.4",
      "displayName": "LAN Port 4"
    }]
    if (parameterValues.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS) {
      return parameterValues.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS;
    }
    if (parameterValues.BridgedInterface) {
      let bridgePort = [];
      videoServiceBridgePort.forEach(item => {
        if (parameterValues.BridgedInterface.indexOf(item.value) !== -1) {
          bridgePort.push(item.displayName.replace('LAN Port ', ''));
        }
      })
      return bridgePort;
    }
  }

  getVLANValue(category) {
    if (category.parameterValues.Mode === 'ONT Full Bridge' || category.parameterValues.Mode === 'ONT Half Bridge') {
      return category.parameterValues.VLANID !== undefined ? category.parameterValues.VLANID : 0;
    } else {
      return category.parameterValues.X_000631_VlanMuxID !== undefined ? category.parameterValues.X_000631_VlanMuxID : 0;
    }
  }

  changeEdgeSuitesProperties(value?, system?) {
    let order = {
      'RG': 1
    }
    let devices: any[] = Object.values(this.systemFormData)
    devices = devices.sort((a, b) => {
      let opmodeA = a.device?.opMode ? a.device?.opMode : a?.provison?.opMode ? a?.provison?.opMode : '';
      let opmodeB = b.device?.opMode ? b.device?.opMode : b?.provison?.opMode ? b?.provison?.opMode : '';
      return (order[opmodeB] ? order[opmodeB] : 0) - (order[opmodeA] ? order[opmodeA] : 0);
    });
    if (devices && devices.length) {
      this.devicesList = devices
      this.IQSuiteDevice = devices[0];
      let opMode = this.IQSuiteDevice?.device?.opMode ? this.IQSuiteDevice.device?.opMode : '';
      let modelName = this.IQSuiteDevice?.device?.modelName ? this.IQSuiteDevice.device?.modelName : '';
      if (this.IQSuiteDevice?.device && Object.keys(this.IQSuiteDevice.device).length) {
        if (opMode == 'RG' || opMode == 'ONT/RG') {
          if ((modelName).indexOf("GS") !== -1 || (modelName).indexOf("GM") !== -1 || (modelName).indexOf("GPR") !== -1) {
            this.IQSuiteShow = true;
          } else {
            this.IQSuiteShow = false;
          }
          if (this.IQSuiteDevice?.device?.softwareVersion?.substring(0, 4) < 23.1) {
            this.allowSmallBiz = false
            this.deviceData = {
              modelName: this.IQSuiteDevice?.device?.modelName,
              softwareVersion: this.IQSuiteDevice?.device?.softwareVersion
            }
          } else if (this.IQSuiteDevice?.device?.bSmbMode) {
            this.allowSmallBiz = true
          } else {
            this.allowSmallBiz = true
          }
        }

      }
      else if (this.IQSuiteDevice?.provison && Object.keys(this.IQSuiteDevice.provison).length) {
        opMode = this.IQSuiteDevice?.provison?.opMode ? this.IQSuiteDevice.provison?.opMode : '';
        modelName = this.IQSuiteDevice?.provison?.modelName ? this.IQSuiteDevice.provison?.modelName : '';
        if (opMode == 'RG' || opMode == 'ONT/RG') {
          if ((modelName).indexOf("GS") !== -1 || (modelName).indexOf("GM") !== -1 || (modelName).indexOf("GPR") !== -1) {
            this.IQSuiteShow = true;
          } else {
            this.IQSuiteShow = false;
          }
        }
      }
    } else {
      this.IQSuiteDevice = {}
      this.IQSuiteShow = true;
    }
    if (value) {
      if (devices && devices.length) {
        this.IQSuiteDevice1 = devices.filter(el => el.system === system)
        let opMode = this.IQSuiteDevice1[0]?.device?.opMode ? this.IQSuiteDevice1[0].device?.opMode : '';
        let modelName = this.IQSuiteDevice1[0]?.device?.modelName ? this.IQSuiteDevice1[0].device?.modelName : '';
        if (this.IQSuiteDevice1[0]?.device && Object.keys(this.IQSuiteDevice1[0].device).length) {
          if (opMode == 'RG' || opMode == 'ONT/RG' || opMode == 'ONT') {
            if ((modelName).indexOf("GS") !== -1 || (modelName).indexOf("GM") !== -1 || (modelName).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true
            } else {
              this.iqsuitEnable = false
            }
          }
          if (opMode === 'ONT') {
            let obj = this.Modelitems?.find(o => o === modelName);
            if (obj) {
              if ((modelName).indexOf("GS") !== -1 || (modelName).indexOf("GM") !== -1 || (modelName).indexOf("GPR") !== -1) {
                this.iqsuitEnable = true;
              } else {
                this.iqsuitEnable = true;
              }
            } else {
              this.iqsuitEnable = true
            }

          }
          if (!opMode || !modelName) {
            this.iqsuitEnable = true
          }
        } else if (devices.length === 1 && !Object.keys(this.IQSuiteDevice1[0].device).length) {
          this.iqsuitEnable = true;
        }
      } else {
        this.IQSuiteDevice = {}
        this.iqsuitEnable = true
      }
    }

  }

  updateApplicationService(update, params, delay?) {
    if (!this.IQSuiteDevice || !this.IQSuiteDevice?.system) {
      this.getEdgeSuiteAllData(true);
      return;

    }
    this.supportrouterservice.getConnectivityStatusNew(this.ORG_ID, this.IQSuiteDevice.system, true).subscribe((res: any) => {

      let systemInfo = {
        sn: this.IQSuiteDevice.system
      }
      delay = delay ? delay : 0;
      const requests: Observable<any>[] = [];
      if (update.protectIQ && res?.status === 'Online') {
        let deviceSubDetails = {
          app: 'protectIQ',
          enable: params.protectIQ?.enabled
        }
        requests.push(this.systemService.updateEnableApp(this.ORG_ID, systemInfo, deviceSubDetails));
      }

      if (update.experienceIQ && res?.status === 'Online') {
        let deviceSubDetails = {
          app: 'experienceIQ',
          enable: params.experienceIQ?.enabled
        }
        requests.push(this.systemService.updateEnableApp(this.ORG_ID, systemInfo, deviceSubDetails));
      }

      forkJoin(requests).subscribe(
        resultArray => {
          //debugger
          let dely = delay + 3000;
          resultArray.forEach((e) => {
            if (e && e.estimatedDelay) {
              dely += e.estimatedDelay * 1000;
            }
          })

          setTimeout(() => {
            this.getEdgeSuiteAllData(true);
          }, dely);
        },
        (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.loading = false;
          let dely = delay + 3000;
          setTimeout(() => {
            this.getEdgeSuiteAllData(true);
          }, dely);
        }
      );
      this.loading = false;
    }, err => {
      let dely = delay + 3000;
      setTimeout(() => {
        this.getEdgeSuiteAllData(true);
      }, dely);
    });


  }


  checkUpdatedEdgeSuites(res) {
    let formData = this.updationEdgeSuitesData;
    let resData = res?.edgeSuites;
    let updated = true;
    if (resData && Object.keys(resData).length) {

      if (formData.experienceIQ.subscribed) {
        //If ExpIQ Subscribed
        if (formData?.experienceIQInpEnabled && formData?.experienceIQ?.enabled !== resData?.experienceIQ?.enabled) {
          return false;
        } else if (!formData?.experienceIQInpEnabled && formData.experienceIQ.subscribed !== resData?.experienceIQ?.subscribed) {
          return false;
        }
      } else if (formData.experienceIQ.subscribed !== resData.experienceIQ.subscribed) {
        return false;
      }

      if (formData.protectIQ.subscribed) {
        //If ExpIQ Subscribed
        if (formData?.protectIQInpEnabled && formData?.protectIQ?.enabled !== resData?.protectIQ?.enabled) {
          return false;
        } else if (!formData?.protectIQInpEnabled && formData.protectIQ.subscribed !== resData?.protectIQ?.subscribed) {
          return false;
        }
      } else if (formData.protectIQ.subscribed !== resData.protectIQ.subscribed) {
        return false;
      }

      return true;
    }
    return true;
  }

  showSuccessMessage(msg: any, delay?) {
    let time = delay ? delay : 2000;
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, time)
  }
  getServicesStatus(onSave?) {
    if (!this.subscriberInfo || !this.subscriberInfo?.subscriberId) {
      this.subscriberInfo.subscriberId = this.createdSubcriberData?._id ? this.createdSubcriberData?._id : '';
    }
    this.serviceStatusLoading = true;
    this.allSubsServicesStatusSubs = this.systemService.getServicesStatus(this.subscriberInfo.subscriberId).subscribe((res: any) => {
      if (res) {
        if (res && res?.dataServices && res?.dataServices.length) {
          let l = res?.dataServices?.length - 1
          this.dataServicesStatus = res?.dataServices[0] ? res?.dataServices[0] : {}
          this.pages.servicesSaved = true;
        } else {
          this.dataServicesStatus = {};
        }
        if (res && res?.videoServices && res?.videoServices.length) {
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
          this.pages.servicesSaved = true;
        } else {
          this.videoServicesStatus = {};
        }
        if (res && res?.voiceServices && res?.voiceServices.length) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
          this.pages.servicesSaved = true;
        } else {
          this.voiceServicesStatus = {};
        }

      } else {
        this.dataService = {};
        this.dataservices1 = {};
        this.videoServicesStatus = {};
        this.voiceServicesStatus = {};
      }
      if (this.subsSysServiceForm?.services?.data?.usoc) {
        if (this.subsSysServiceForm?.services?.data?.usoc === this.dataServicesStatus?.serviceDefinitionName) {
          this.dataService = this.dataServicesStatus;
          this.dataservices1 = this.dataServicesStatus1
        } else if (this.subsSysServiceForm?.services?.data?.usoc !== this.dataServicesStatus?.serviceDefinitionName) {
          this.dataService = this.dataServicesStatus1;
          this.dataservices1 = this.dataServicesStatus
        }
      } else {
        this.dataService = this.dataServicesStatus;
        this.dataservices1 = this.dataServicesStatus1;
      }

      this.serviceData = {
        data: this.dataService,
        data1: this.dataservices1,
        video: this.videoServicesStatus,
        voice: this.voiceServicesStatus
      }
      this.serviceStatusLoading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.dataService = {};
      this.dataservices1 = {};
      this.videoServicesStatus = {};
      this.voiceServicesStatus = {};
      this.serviceData = {
        data: {},
        data1: {},
        video: {},
        voice: {}
      }
      this.serviceStatusLoading = false;
    })
  }
  getSubscriberServices() {
    const subscriberId = this.subscriberInfo.subscriberId ? this.subscriberInfo.subscriberId : this.createdSubscriberId;
    if (!subscriberId) return;
    this.isPRConfiguredOutside = false;
    this.subServicesSubscription = this.systemService.getSubscriberServices(subscriberId).subscribe((res: any[]) => {
      if (res) {
        res.forEach((el) => {
          if (el.activate) {
            this.isPRConfiguredOutside = true;
          }
        });
      }
    },
      (err: HttpErrorResponse) => {
      })
  }
  saveAllSystemsData() {
    this.childSystems.saveAllSystemsData();
  }
}
