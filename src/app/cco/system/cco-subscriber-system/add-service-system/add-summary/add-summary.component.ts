import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { AddSubscriberService } from '../add-subscriber.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';

@Component({
  selector: 'app-add-summary',
  templateUrl: './add-summary.component.html',
  styleUrls: ['./add-summary.component.scss']
})
export class AddSummaryComponent implements OnInit, OnDestroy {
  @Input() sys_summary;
  @Input() system_service;
  @Input() subId;
  @Input() deviceInformation;

  edgeSuites: any;
  services: any;
  subscriber: any;
  systems: any;
  productIQ: string;
  k2Cameras: string;
  k4Cameras: string;
  arloEmail: any;
  tier: any;
  account: any;
  email: any;
  name: any;
  phone: any;
  serviceAddress: any;
  subscriberLocationId: any;
  expIq: string;
  language: any;
  languageSubject: any;
  data: any;
  video: any;
  voice: any;
  usoc: any;
  ceVlan: any;
  interface: any;
  untagged: any;
  ceVlanvideo: any;
  interfacevideo: any;
  multicastProfile: any;
  usocVideo: any;
  dEnable: string;
  vEnable: string;
  usocVoice: any;
  voiceServiceType: any;
  dialPlan: any;
  viFaxT38: string;
  viEnable: string;
  servicesdata: any;
  hubbLocationId: any;
  fccSubscriberId: any;
  vicVlan: any;
  vcVlan: any;
  successInfo: any;
  cVlan: any;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  dataservice: any;
  videoservice: any;
  VoiceService: any;
  servicesData: { data: any; data1: any; video: any; voice: any; };
  dataser: any;
  dataEnable: any;
  videoser: any;
  videoEnable: any;
  voiceser: any;
  voiceEnable: any;
  devices: any;
  systemDetails: any;
  loading: boolean;
  errorInfo: any;
  error: boolean;
  success: boolean;
  ORG_ID: any;
  deviceData: any = {};
  provisionData: {};
  deviceInfo: any;
  servicesFormData: any = {};
  systeminfo: string[];
  serviceinfo: any;
  deviceinfo: any;
  subscriberId: any;
  arloEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  sVlan: any;
  vsVlan: any;
  visVlan: any;

  serviceStatusLoading: boolean;
  servicesStatus: any = {};
  dataServicesStatus: any = {};
  videoServicesStatus: any = {};
  voiceServicesStatus: any = {};
  allSubsServicesStatusSubs: any;
  provisionDatasub: any;
  deviceDatasub: any;
  getAllProfileSubscribe: any;
  Brandwidthitems = [];
  banwidthdata: any;
  banwidthvideo: any;
  serviceSystem: any;
  dialplansub: any;
  DialPlanitems: any;
  dialplan: any;
  getlistloder: boolean;
  getlistdata: any;
  tableData: any;
  protectIQ: any;
  experienceIQ: any;
  userId: any;
  arloSmart: any;
  arEnable: any;
  proIq: string;
  arloLoading: boolean;
  arloSmartListSubs: any;
  ArloData: any;
  twoKPlanData: any[];
  onboard2kcamera: string;
  CommandIqLoader: boolean;
  CommandIqSubs: any;
  CommandIqData: any;
  commandIQEmail: any;
  onboardCommend: any;
  commandIQstatus: string;
  dataEnable1: boolean;
  usoc1: any;
  ceVlan1: any;
  interface1: any;
  untagged1: any;
  cVlan1: any;
  sVlan1: any;
  dataServicesStatus1: any;
  dataser1: any;
  dataservice1: any;
  dataService: any;
  untaggedvideo: any;
  getstatussub: any;
  ontsysInfo: any;
  opModeont: any;
  deviceinform: any;
  servifyCare: any;
  planCode: string;
  servifyemail: any;
  ServifyEnableentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  dataservices1: any;
  videoServicesStatus1: any;
  voiceServicesStatus1: any;
  cpeTypeData: any;
  cpeTypeVideo: any;
  cpeTypeVoice: any;
  memberPorts: any;
  iqsuitEnable: boolean = true;
  dataStatus: string;
  dataDetails: string;
  dataStatus1: string;
  dataDetails1: string;
  datasvcStatus: string;
  dataErrorDetails: string;
  Modelitems: any[];
  deviceModels: string[];
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  dev: boolean;
  Bark_Juniorentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  bark: any;
  BarkPlan: string;
  BarkEmail: any;
  smallBiz: any;
  SmallBizIQ: string;
  smallBizIQentitlement: boolean;
  myCommunityIqEntitlement: boolean;
  communityIq: any;
  mycommunityIq: any;
  RGHotspot: string;
  network: any;
  vlanId: any;
  sN: any;
  rgStatus: any;
  micrositeLoader: boolean;
  communityArr: any = [];
  Eduroam: any;
  subscribedStatus: boolean;
  ClaimEligible: boolean;
  subscriptionEndDt: string;
  videoStatus: string;
  videoDetails: string;
  videoStatus1: string;
  videoDetails1: string;
  videosvcStatus: string;
  videoErrorDetails: string;
  voicesvcStatus: string;
  voiceStatus: string;
  voiceDetails: string;
  voiceStatus1: string;
  voiceDetails1: string;
  voiceErrorDetails: string;
  interfaceVoice: any;
  getAllDialPlanSubscribe: any;
  dialPlanList: any[];
  GeomapInfosub: any;
  GeomapInfo: any;
  latitude: any;
  longtitude: any;
  isAutomaticallyCreatedVideo: any;
  videoDescription: any;
  dataDescription: any;
  voiceDescription: any;
  url: string;
  memberPortsdata: any;
  provisionDataOnt: any;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private ccoService: AddSubscriberService,
    private commonOrgService: CommonService,
    private systemservice: FoundationManageService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private communityService: MycommunityIqService,
    private managementService: ManagementService,) {
    this.getDialPlanList()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.languageUpdate();
      }
    );
    this.getDeviceModels();
    this.ORG_ID = this.sso.getOrgId();
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
  languageUpdate() {
    // && this.communityIq?.passpoint?.prioritizeTraffic 
    // , ${this.language['Traffic Prioritized']}
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
        this.Eduroam = this.language["Not Enabled"];;
      }
    }
    // this.planCode = this.servifyCare?.planCode === 'SERVIFYCAREPLATINUM' ? this.language['Platinum'] : this.servifyCare?.planCode === 'SERVIFYCAREBRONZE' ? this.language['Bronze'] : this.servifyCare?.planCode === 'SERVIFYCAREGOLD' ? this.language['Gold'] : this.servifyCare?.planCode === 'SERVIFYCARESILVER' ? this.language['Silver'] : '-';

  }

  ngOnInit(): void {
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    this.getAllSummary();
    this.getEdgeSuiteEntitlement();
    this.getProfileData();
    this.GetDialPlanData();
    let url = this.router.url;
    if (url.indexOf('/cco-subscriber-system/add-service-system') !== -1) {
      this.getAllSubsServicesData()
      this.getEdgeSuiteData();
      this.getGeomapAddress();
    } else {
      this.route.queryParams.subscribe(params => {
        this.subscriberId = params.subscriber ? params.subscriber : ''
      })
      this.getAllSubsServicesData();
      this.getEdgeSuiteData();
      this.getGeomapAddress();
    }
    this.getServicesStatus();
    this.sN = this.sys_summary?.systems.some((element) => element.saved && (element.opmode == 'RG' || element.opmode == ''))
  }

  ngOnDestroy() {
    if (this.allSubsServicesStatusSubs) this.allSubsServicesStatusSubs.unsubscribe();
    if (this.provisionDatasub) this.provisionDatasub.unsubscribe();
    if (this.deviceDatasub) this.deviceDatasub.unsubscribe();
    if (this.allSubsServicesDataSubs) this.allSubsServicesDataSubs.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.getlistdata) this.getlistdata.unsubscribe();
    if (this.arloSmartListSubs) this.arloSmartListSubs.unsubscribe();
    if (this.CommandIqSubs) this.CommandIqSubs.unsubscribe();

  }
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  getAllSummary() {
    //subscriber

    this.subscriber = this.sys_summary?.subscriber;
    console.log(this.subscriber)
    this.account = this.subscriber?.account ? this.subscriber?.account : '';
    this.email = this.subscriber?.email ? this.subscriber?.email : '';
    this.name = this.subscriber?.name ? this.subscriber?.name : '';
    this.phone = this.subscriber?.phone ? this.subscriber?.phone : '';
    this.serviceAddress = this.subscriber?.serviceAddress ? this.subscriber?.serviceAddress : '';
    this.subscriberLocationId = this.subscriber?.subscriberLocationId ? this.subscriber?.subscriberLocationId : '';
    this.hubbLocationId = this.subscriber?.hubbLocationId ? this.subscriber?.hubbLocationId : '';
    this.fccSubscriberId = this.subscriber?.fccSubscriberId ? this.subscriber?.fccSubscriberId : '';
  }
  PlanPurchasedDt: any
  getGeomapAddress(value?) {
    this.getlistloder = true
    if (this.subId) {
      this.subscriber = this.subId
    } else {
      this.subscriber = this.subscriberId
    }
    let url = value == 'Update' ? this.ccoService.updateGeomapAddress(this.subscriber) : this.ccoService.getGeomapAddress(this.subscriber)
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
  getEdgeSuiteData() {
    this.getlistloder = true;
    if (this.subId) {
      this.subscriber = this.subId
    } else {
      this.subscriber = this.subscriberId
    }
    this.getlistdata = this.systemservice.getedgesuiteData(this.ORG_ID, this.subscriber, true).subscribe((res: any) => {
      this.tableData = res ? res : [];
      console.log(res)
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
        /************* For getting exact days for claim eligible for without cancellation *********/
        let Time = StartDate.getTime() - EndDate.getTime();
        let Days = Time / (1000 * 3600 * 24); //Diference in Days
        let ExactDays = Math.round(Days);
        /********** For cancellation & Subscription end date variables **********/
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
          /********** Claim eligible(Not for Cancellation) **********/
          if (ExactDays > 30) {
            this.ClaimEligible = true
          }
          else {
            this.ClaimEligible = false
          }
        }

        /********** For checking subscribed or unsubscribed based on subscription end date **********/
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
      this.smallBiz = this.edgeSuites?.smallBizIQ;
      this.communityIq = this.edgeSuites?.myCommunityIQ;
      if (this.smallBiz?.enable) {
        this.SmallBizIQ = "Subscribed"
      } else {
        this.SmallBizIQ = "Unsubscribed"
      }
      if (this.arloSmart) {
        this.k2Cameras = this.edgeSuites?.arloSmart['2kCameras'] + " " + this.language.Cameras;
        this.arloEmail = this.edgeSuites?.arloSmart?.email;
      } else {
        this.k2Cameras = '';
        this.arloEmail = '';
      }
      if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
        this.k2Cameras = ""
      }
      if (this.arloSmart && this.edgeSuites?.arloSmart['4kCameras'] === 0) {
        this.k4Cameras = ""
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
      //this.getDeviceDatas();
      this.languageUpdate()
      this.getlistloder = false;
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.getlistloder = false;
        this.pageErrorHandle(err);
      })
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
  getCommandIqinfo() {
    this.CommandIqLoader = true;
    if (this.subId) {
      this.subscriber = this.subId
    } else {
      this.subscriber = this.subscriberId
    }
    this.CommandIqSubs = this.systemservice.getCommandIqOfSubscriber(this.ORG_ID, this.subscriber).subscribe((res: any) => {
      this.CommandIqData = res ? res : {};
      //this.systemDetails = this.CommandIqData?.devices;
      if (!this.CommandIqData?.commandIQ?.fduser) {
        this.commandIQEmail = this.CommandIqData?.commandIQ?.email ? this.CommandIqData?.commandIQ?.email : '';
      } else {
        this.commandIQEmail = ""
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

  getSubsucribeEnableStatus(obj: any) {
    if (Object.keys(obj).length) {
      let str = '';
      str = `${obj.subscribed ? 'Subscribed' : 'Unsubscribed'}, ${obj.enabled ? 'Enabled' : 'Disabled'}`;

      return str;
    } else {
      return '-'
    }
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
          } else if (el.planId && el.planId === 'Arlo-Smart-Elite') {
            fourKDevices.push(el);
          }
        });

        this.twoKPlanData = [...twoKDevices];
        if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
          this.onboard2kcamera = '';
        } else {
          this.onboard2kcamera = ('Onboarded' + '-' + this.twoKPlanData.length);
        }

      } else {
        this.twoKPlanData = [];
        if (this.arloSmart && this.edgeSuites?.arloSmart['2kCameras'] === 0) {
          this.onboard2kcamera = "";
        } else {
          this.onboard2kcamera = ('Onboarded' + '-' + this.twoKPlanData.length);
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
  getAllSubsServicesData() {
    //debugger;
    this.loading = true;
    if (this.subId) {
      this.subscriber = this.subId
    } else {
      this.subscriber = this.subscriberId
    }
    this.allSubsServicesDataSubs = this.ccoService.getDetailedSubscriberServices(this.subscriber).subscribe((res: any) => {
      //this.getServicesStatus();
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          if (services[i].type === 'data') {
            this.dataservice = services[i] ? services[i] : {};
          } else if (services[i].type === 'data1') {
            this.dataservice1 = services[i] ? services[i] : {};
          } else if (services[i].type === 'video') {
            this.videoservice = services[i] ? services[i] : {};
          } else if (services[i].type === 'voice') {
            this.VoiceService = services[i] ? services[i] : {};
          }
        }
        this.servicesData = {
          data: this.dataservice,
          data1: this.dataservice1,
          video: this.videoservice,
          voice: this.VoiceService
        }
        this.dataser = this.servicesData?.data;
        this.dataDescription = this.dataser?.note
        console.log("dataser", this.dataser);

        if (this.dataser?.usoc) {
          this.dataEnable = true;
        } else {
          this.dataEnable = false;
        }
        this.usoc = this.dataser?.usoc;
        this.ceVlan = this.dataser?.ceVlan;
        this.interface = this.dataser?.interface;
        this.untagged = this.dataser?.untagged;
        this.cVlan = this.dataser?.cVlan;
        this.sVlan = this.dataser?.sVlan;
        this.provisionDataOnt = this.dataser?.isOntService

        this.dataser1 = this.servicesData?.data1;
        if (this.dataser1?.usoc) {
          this.dataEnable1 = true;
        } else {
          this.dataEnable1 = false;
        }
        this.usoc1 = this.dataser1?.usoc;
        this.ceVlan1 = this.dataser1?.ceVlan;
        this.interface1 = this.dataser1?.interface;
        this.untagged1 = this.dataser1?.untagged;
        this.cVlan1 = this.dataser1?.cVlan;
        this.sVlan1 = this.dataser1?.sVlan;
        this.memberPortsdata = this.dataser?.memberPorts;


        this.videoser = this.servicesData?.video;
        this.videoDescription = this.videoser?.note
        if (this.videoser?.usoc) {
          this.videoEnable = true;
        } else {
          this.videoEnable = false;
        }
        this.ceVlanvideo = this.videoser?.ceVlan;
        this.interfacevideo = this.videoser?.interface;
        this.memberPorts = this.videoser?.memberPorts
        this.multicastProfile = this.videoser?.multicastProfile;
        this.usocVideo = this.videoser?.usoc;
        this.untaggedvideo = this.videoser?.untagged;
        this.vcVlan = this.videoser?.cVlan;
        this.vsVlan = this.videoser?.sVlan;
        this.interfaceVoice = this.videoser?.interface;

        this.voiceser = this.servicesData?.voice;
        this.voiceDescription = this.voiceser?.note
        this.usocVoice = this.voiceser?.usoc;
        this.voiceServiceType = this.voiceser?.voiceServiceType?.includes('X_000631_TDMGW') ? 'TDM GW' : this.voiceser?.voiceServiceType;
        if (this.voiceser?.usoc) {
          this.voiceEnable = true;
        } else {
          this.voiceEnable = false;
        }
        this.vicVlan = this.voiceser?.cVlan;
        this.visVlan = this.voiceser?.sVlan;
      }
      if (res && res.devices && res.devices.length) {
        this.devices = res?.devices ? res?.devices : [];
        let device = [];
        setTimeout(() => {
          this.devices.forEach(el => {
            setTimeout(() => {
              this.searchDeviceByMACAddressDetail(el.trim());
            }, 500);
          });
        }, 100);
        this.systemDetails
      } else {
        this.systemDetails = [];
        this.loading = false;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
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
  searchDeviceByMACAddressDetail(system) {
    this.getstatussub = this.systemservice.getSearchResult(this.ORG_ID, system).subscribe((res: any) => {
      setTimeout(() => {
        this.deviceDetail(system, res);
      }, 1000);


    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  deviceDetail(system, res?) {
    this.loading = true;
    if (res && res.records.length > 0) {
      this.deviceinform = res.records[0]?.devices
    } else {
      this.deviceinform = this.deviceInformation
    }

    if (this.deviceinform) {
      for (var i = 0; i < this.deviceinform?.length; i++) {
        if (this.deviceinform[i]?.deviceId?.toUpperCase() === system?.toUpperCase() || this.deviceinform?.length == 1) {
          const systemid = this.deviceinform[i]?.serialNumber ? this.deviceinform[i]?.serialNumber : system
          if (this.deviceinform[i]?.opModeWithOnt === 'ONT' || this.deviceinform[i]?.opModeWithOnt === 'ONT/RG' || this.deviceinform[i]?.opMode === 'ONT' || this.deviceinform[i]?.opMode === 'ONT/RG') {
            const fsanMac = this.deviceinform[i]?.serialNumber?.toUpperCase()
            this.opModeont = this.deviceinform[i]?.opModeWithOnt ? this.deviceinform[i]?.opModeWithOnt : this.deviceinform[i]?.opMode
            this.getstatussub = this.ccoService.getOntDeviceStatus(fsanMac).subscribe((res: any) => {
              let deviceopmode = this.deviceinform.filter(el => el.deviceId === system)
              if (res?.ontDevices?.length !== 0) {
                let response = res?.ontDevices[0]
                this.ontsysInfo = {
                  modelName: response?.discoveredModel ? response?.discoveredModel : response?.profileName,
                  macAddress: response?.discoveredMacAddress ? response?.discoveredMacAddress : response?.macAddress,
                  registrationId: response?.discoveredRegistrationId,
                  opMode: deviceopmode[0]?.opModeWithOnt ? deviceopmode[0].opModeWithOnt : 'ONT',
                  softwareVersion: response?.discoveredVersion,
                  serialNumber: response?.discoveredSerialNumber ? response?.discoveredSerialNumber : response?.serialNumber,
                  vendorId: response?.discoveredVendorId,
                  discoveredPonPort: response?.discoveredPonPort,
                  location: `${response?.region}/${response?.location}`,
                  oltName: response?.oltName
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
                  } else {
                    this.iqsuitEnable = false
                  }

                }

              } else {
                this.ontsysInfo = {};
              }

              setTimeout(() => {
                this.provosionrecords(system, this.ontsysInfo);
              }, 50);


            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
            })
          } else {
            this.getstatussub = this.systemservice.getDeviceInfo(this.ORG_ID, systemid).subscribe((res: any) => {
              //this.deviceDatas = {};
              if (res) {
                this.deviceData[system] = res;
              } else {
                this.deviceData[system] = {};
              }
              setTimeout(() => {
                this.provosionrecords(system, res);
              }, 50);

              if (res?.opMode === 'RG' && res?.modelName) {
                if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
                  this.iqsuitEnable = true;
                } else {
                  this.iqsuitEnable = false;
                }
              }
            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
            })
          }
        }

      }
    } else {
      this.getstatussub = this.systemservice.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
        //this.deviceDatas = {};
        if (res) {
          this.deviceData[system] = res;
        } else {
          this.deviceData[system] = {};
        }
        if (res?.opMode === 'RG' && res?.modelName) {
          if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
            this.iqsuitEnable = true;
          } else {
            this.iqsuitEnable = false;
          }
        }
        setTimeout(() => {
          this.provosionrecords(system, res);
        }, 500);


      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }
  }
  showPrimaryEmail(mail) {
    if (mail) {
      return mail + ' (Primary)';
    } else {
      return '-';
    }
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
  provosionrecords(system, data) {
    //this.loading = true;
    this.provisionDatasub = this.systemservice.getProvisionrecord(this.ORG_ID, system).subscribe((res: any) => {
      this.provisionData = res ? res : {};
      if (res) {
        this.provisionData[system] = res;
      } else {
        this.provisionData[system] = {};
      }
      if (res?.opMode === 'RG' && res?.modelName) {
        if ((res?.modelName).indexOf("GS") !== -1 || (res?.modelName).indexOf("GM") !== -1 || (res?.modelName).indexOf("GPR") !== -1) {
          this.iqsuitEnable = true;
        } else {
          this.iqsuitEnable = false;
        }
      }
      if (Object.keys(this.provisionData).length == 0) {
        this.iqsuitEnable = true;
      }
      setTimeout(() => {
        this.buildBWProfile(system, res, data, this.Brandwidthitems, this.DialPlanitems);
      }, 500);



    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.provisionData[system] = {};
      this.loading = false;
    })
  }
  getProfileData() {
    this.getAllProfileSubscribe = this.ccoService.getBWProfile(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        this.Brandwidthitems = res ? res : []
      } else {
        this.Brandwidthitems = [];
      }
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loading = false;
    }, () => {

    });
  }
  GetDialPlanData() {
    this.dialplansub = this.systemservice.getDialPlan(this.ORG_ID).subscribe((res: any) => {
      this.DialPlanitems = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })

  }

  buildBWProfile(system, data, device, bandwidth?, dialplan?) {
    if (Object.keys(this.Brandwidthitems).length && this.Brandwidthitems?.length !== 0) {
      const bwProfile = this.Brandwidthitems?.filter(profile => {
        return (profile.innerProfileCategory === 'Bandwidth')
      });
      this.Brandwidthitems = [...bwProfile];
      for (var i = 0; i < this.Brandwidthitems.length; i++) {
        if (this.Brandwidthitems[i]._id === data?.data?.BwProfile) {
          this.banwidthdata = this.Brandwidthitems[i].name
        }
        if (this.Brandwidthitems[i]._id === data?.video?.BwProfile) {
          this.banwidthvideo = this.Brandwidthitems[i].name
        }
      }
    }
    for (var j = 0; j < dialplan?.length; j++) {
      if (dialplan[j]._id === data?.voice?.DialPlan) {
        this.dialplan = dialplan[j].name;
      }
    }
    setTimeout(() => {
      this.formatListData(system, data, device, this.banwidthdata, this.banwidthvideo, this.dialplan);
    }, 500);

  }
  formatListData(id, data, device?, bwdata?, bwvideo?, dialplan?) {
    if (data && (data.data || data.video || data.voice)) {
      if (data.data?.Enable && data.data?.Pbit != undefined) {
        data.data.Pbit = `${data.data?.Pbit}`;
      }
      if (data.voice?.Line['1']?.Enable && data.voice?.Line['1']?.Enable == 'Enabled') {
        data.voice.Line['1'].Enable = true;

        //Service Loss Plan
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.TransmitGain) {
          data.voice.Line['1'].VoiceProcessing.TransmitGain = data.voice?.Line['1'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['1'].VoiceProcessing.ReceiveGain = data.voice?.Line['1'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data.voice) {
          data.voice.Line['1'].Enable = false;
        } else {
          //data['voice']['Line']['1']['Enable'] = false;
        }
      }
      if (data.voice?.Line['2']?.Enable && data.voice?.Line['2']?.Enable == 'Enabled') {
        data.voice.Line['2'].Enable = true;

        //Service Loss Plan
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.TransmitGain) {
          data.voice.Line['2'].VoiceProcessing.TransmitGain = data.voice?.Line['2'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['2'].VoiceProcessing.ReceiveGain = data.voice?.Line['2'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data?.voice) {
          data.voice.Line['2'].Enable = false;
        } else {
        }
      }
      if (data.video?.Enable && data.video?.Pbit != undefined) {
        data.video.Pbit = `${data.video?.Pbit}`;
      }
      if (device?.serialNumber) {
        this.deviceInfo = device;
      } else {
        this.deviceInfo = {};
      }
      this.servicesFormData[id] = {
        system: id,
        opMode: device?.opMode ? device?.opMode : data?.opMode,
        configuredService: 'No',
        data: data.data,
        video: data.video,
        voice: data.voice,
        device: this.deviceInfo ? this.deviceInfo : device,
        bwdata: bwdata,
        bwvideo: bwvideo,
        dialplan: dialplan
      }
    } else {
      if (device?.serialNumber) {
        this.deviceInfo = device;
      } else {
        this.deviceInfo = {};
      }
      this.servicesFormData[id] = {
        system: id,
        opMode: device?.opMode ? device?.opMode : data?.opMode,
        configuredService: 'Yes',
        data: {},
        video: {},
        voice: {},
        device: this.deviceInfo ? this.deviceInfo : device,
        bwdata: bwdata,
        bwvideo: bwvideo,
        dialplan: dialplan
      };
    }

    setTimeout(() => {
      this.serviceForm();
    }, 1000);


  }
  serviceForm() {
    this.systeminfo = Object.keys(this.servicesFormData);
    this.serviceinfo = Object.values(this.servicesFormData);
    // const index = this.serviceinfo.findIndex(device => device?.device?.opMode ? device?.device?.opMode == 'RG' : device?.opMode ? device?.opMode == 'RG' : '');
    // if (index > -1) this.serviceinfo.splice(0, 0, this.serviceinfo.splice(index, 1)[0]);
    // this.deviceinfo = Object.values(this.deviceData);
    // this.serviceSystem = this.serviceinfo
    if(localStorage.getItem("calix.Device_Details")) this.deviceInformation = JSON.parse(localStorage.getItem("calix.Device_Details"))
    this.deviceinfo = Object.values(this.deviceData);
    if (this.devices) {
      if (this.serviceinfo.length === this.devices.length || this.systeminfo.length === this.deviceInformation?.devices?.length) {
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
        this.loading = false;
      }
    } else {
      this.serviceSystem = this.serviceinfo;
      this.loading = false;
    }
  }
  showMicroSiteName(id) {
    for (let i = 0; i < this.communityArr.length; i++) {
      if (this.communityArr[i].id == id) {
        return this.communityArr[i].communityName
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
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.myCommunityIqEntitlement = true;
      this.GetMicrosites();
    }
    else {
      this.myCommunityIqEntitlement = false;
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
  unknownSvlan = '';
  getServicesStatus() {
    if (this.subId) {
      this.subscriber = this.subId
    } else {
      this.subscriber = this.subscriberId
    }
    if (!this.subscriber) return;
    this.serviceStatusLoading = true;
    this.allSubsServicesStatusSubs = this.ccoService.getServicesStatus(this.subscriber).subscribe((res: any) => {
      if (res) {
        // this.isAutomaticallyCreatedData =  (res?.dataServices[0]?.serviceId &&  res?.voiceServices[0]?.serviceId && res?.voiceServices.some(element=> res?.dataServices.some(data=> data.serviceId === element.serviceId))) ;
        if (res?.dataService) {
          res.dataService = res?.dataService?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.voiceServices) {
          res.voiceServices = res?.voiceServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {

          this.isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedData?.serviceId);
        }
        if (res?.dataServices[0]?.serviceId && res?.videoServices[0]?.serviceId) {
          this.isAutomaticallyCreatedVideo = res?.dataServices?.find(element => res?.videoServices?.some(video => video.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedVideo?.serviceId);
        }
        if (res && res.dataServices && res.dataServices.length !== 0) {

          let l = res?.dataServices?.length - 1
          this.dataService = res.dataServices[0] ? res?.dataServices[0] : {};
          if (res.dataServices.length > 1) {
            let ontData = res?.dataServices?.find(element => element.cpeType == "ONT");
            this.dataService = ontData ? ontData : this.dataService;
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
        // let status1 = this.dataService?.subSvcState ? this.dataStatus : '';
        // let status2 = this.dataservices1?.subSvcState ? ` , ${this.dataStatus1}` : '';
        // this.datasvcStatus = status1 + status2
        // let details1 = (this.dataService?.errorDetails && this.dataService?.errorDetails !== 'null') ? this.dataDetails : '';
        // let details2 = (details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? ` , ${this.dataDetails1}` : (!details1 && this.dataservices1?.errorDetails && this.dataservices1?.errorDetails !== 'null') ? `${this.dataDetails1}` : '';
        // this.dataErrorDetails = details1 + details2;
        if (res && res?.videoServices && res?.videoServices.length !== 0) {
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
          if (res.videoServices.length > 1) {
            let ontData = res?.videoServices?.find(element => element.cpeType == "ONT");
            this.videoServicesStatus = ontData ? ontData : this.videoServicesStatus;
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
          this.videoServicesStatus1 = (res.videoServices[1].cpeType !== "UNKNOWN" && RGData) ? RGData : this.videoServicesStatus1?.cpeType == "ONT" && res.videoServices[0].cpeType == "UNKNOWN" ? res.videoServices[0] : this.videoServicesStatus1;;

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
        if (res && res?.voiceServices && res?.voiceServices.length !== 0) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
          if (this.dialPlanList?.length > 0) {
            this.dialPlanList.forEach(el => {
              if (el.value === this.voiceServicesStatus?.dialPlan) {
                this.voiceServicesStatus.dialPlan = el.displayName
              }
            })
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

          this.voiceStatus1 = `${this.voiceServicesStatus1?.ontIdentification}: ${this.voiceServicesStatus1?.subSvcState}`;
          this.voiceDetails1 = `${this.voiceServicesStatus1?.ontIdentification}: ${this.voiceServicesStatus1?.errorDetails}`;
        } else {
          this.voiceServicesStatus1 = {};
        }
        let ontVoiceStatus = '', rgVoiceStatus = '', ontVoiceError = '', rgVoiceError = '', unknownVoiceStatus = '', onknownVoiceError = '';
        res?.voiceServices?.forEach((element) => {
          if (element.cpeType == 'RG') {
            rgVoiceStatus += ((rgVoiceStatus ? ',<br> ' : '') + `${element.ontIdentification} ${element?.interface ? (this.language['InterFace'] + ' ' + element?.interface) : ''}: ${element.subSvcState}`);
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
}
