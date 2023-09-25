import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { FoundationDataService } from '../../foundation-data.service';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { EdgeSuitsComponent } from './edge-suits/edge-suits.component';
import { FoundationSystemDetailsComponent } from './foundation-system-details/foundation-system-details.component';
import { ServiceTierComponent } from './service-tier/service-tier.component';
import { FoundationManageService } from '../foundation-manage.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import _ from 'lodash';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { StaticGroupsComponent } from './static-groups/static-groups.component';
import { SystemAdvancedComponent } from './system-advanced/system-advanced.component';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';
import { AddServicesComponent } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-services/add-services.component';
import { AddStaticGroupsComponent } from './add-static-groups/add-static-groups.component';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-foundation-add-system',
  templateUrl: './foundation-add-system.component.html',
  styleUrls: ['./foundation-add-system.component.scss'],
})
export class FoundationAddSystemComponent implements OnInit, OnDestroy {
  @ViewChild(FoundationSystemDetailsComponent)
  childSystemDetails: FoundationSystemDetailsComponent;
  @ViewChild(ServiceTierComponent)
  childSystemServicetier: ServiceTierComponent;
  @ViewChild(EdgeSuitsComponent)
  childSystemEdgesuits: EdgeSuitsComponent;
  @ViewChild(StaticGroupsComponent)
  childStaticGroups: StaticGroupsComponent;
  @ViewChild(SystemAdvancedComponent)
  childSystemAdvance: SystemAdvancedComponent;
  @ViewChild(AddServicesComponent) childNetworkService: AddServicesComponent;
  id: any;
  language: any = {};
  languageSubject;
  FormData: any = {
    SysDetails: {
    },
    SysServicetiers: {},
    SysEdgeSuites: {
    }
  }
  system: string;
  SaveSystem: string;
  SaveSysData: any;
  surveyForm: FormGroup;
  dataSer: any;
  dataServiceList: any;
  dataServiceList1: any;
  serviceUpdateSubs: any;

  error: boolean;
  success: boolean;
  errorInfo: any;
  successInfo: any;
  sustemSubData: Object;
  tabDisable: boolean = true;
  edgeSuitsUpdateSubs: any;
  swapSysUpdate: any;
  systemGetSubs: any;
  systemInfo: { sn: any; subscriberId: any; };
  syetemsAllData: any;
  loading: boolean;
  dataAvail: boolean;
  subscriberGetSubs: any;
  addSystemSusbsciberSubs: any;
  addSusbsciberSubs: any;
  updateSystemSusbsciberSubs: any;
  updateSystemSubs: any;
  updateSubscriberSubs: any;
  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  formOptions: any = {};
  deviceListSubs: any;
  deviceDataList: any;



  activeTab: string = 'systemDetails';

  ORG_ID: any;
  StaticForm: any;
  subscriberName: any;
  redirectToView: any;
  deviceInfo: any;
  deviceOpMode: any;
  provisionData: any;
  deviceDataAvail: boolean;
  servicesListSubs: any;
  servicesListData: any;
  subonlytabDisable: boolean = true;
  servicetabdisable: boolean = true;
  deviceData: Object;
  associateSubs: any;
  wanAccessType: any;
  devicesubs: any;
  savesystemsubloading: boolean = false;
  edgeSuiteLoading: boolean = false;
  serviceLoading: boolean = false;
  staticGroupUpdateSubs: any;
  modelname: any;
  iqsuitEnable: boolean = true;
  edgeSuitsWarning: boolean;
  edgeSuitsWarningInfo: any;
  modelName: any;
  device: any;
  model: any;
  arloEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  myCommunityIQEntitlement: boolean;
  updationEdgeSuitesData: any;
  intervalEdgeSuites: NodeJS.Timeout;
  countDown: number;
  getEdgeSuitesCalled: number = 0;
  saveDisabled: boolean = false;
  ServifyEnableentitlement: boolean;
  subscriber: { account: any; email: any; name: any; phone: any; serviceAddress: any; subscriberLocationId: any; };
  servicedisable: boolean;
  subServicesSubscription: any;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  opMode: any;
  communityArr: any = [];
  addBspsub: any;
  ServifyGoldentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyPlatinumentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  smallBizIQentitlement: boolean;
  subscriberLocationId: any;
  proExpDisable: boolean = false;
  PreProvisnedSystem: boolean = true;
  hideService: boolean = false;
  SSIDbackup: boolean = false;
  updated: boolean;
  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ccoCommonService: CcoCommonService,
    private dataService: FoundationDataService,
    private service: FoundationManageService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private communityService: MycommunityIqService,
    private systemService: AddSubscriberService,
    private commonFunctionsService: CommonFunctionsService,
    private cdr: ChangeDetectorRef
    

  ) {
    this.getEdgeSuiteEntitlement();
    this.ccoCommonService.currentPageAdder('add-new-system');
    this.ORG_ID = this.sso.getOrgId();
    let scopes = this.sso.getScopes();
    if (!this.getScopes()) {
      this.router.navigate(['cco-foundation/foundation-home']);
    }
  }

  ngOnInit(): void {

    // if(this.myCommunityIQEntitlement){
    //   this.GetMicrosites();
    // }

    this.loading = true;
    this.deviceDataAvail = false;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );

    let url = this.router.url;
    if (url.indexOf('/foundation-manage/system-edit') == -1) {
      this.SaveSystem = 'Save';
      this.system = 'New System';
      // this.getformDatas();
      this.dataAvail = true;
      this.loading = false;
    } else {
      this.route.queryParams.subscribe(params => {
        this.tabDisable = false;
        this.subonlytabDisable = false;
        this.servicetabdisable = false;
        this.SaveSystem = 'Update';
        this.subscriberInfo = {
          subscriberId: params.subscriber ? params.subscriber : '',
          sn: ''
        }
        this.systemInfo = {
          sn: params.sn ? (params.sn).replace(/\s+/g, "") : '',
          subscriberId: params.subscriber ? params.subscriber : '',
        }
        this.redirectToView = params.from ? params.from : '';
        if (params.sn) {
          this.system = (params.sn).replace(/\s+/g, "");
        } else if (params.subscriber && !params.sn) {
          //this.system = 'System Subscriber';
          this.tabDisable = true;
          this.servicetabdisable = true;
        }
        if (params.sn) {
          this.getSyetemsAllData();
        } else {
          //this.getSubscriberData();
          this.getSyetemsAllData();
        }
        // this.getformDatas();
        this.getSubscriberData();
        if (this.systemInfo?.subscriberId) this.getSubscriberServices();
        this.getAllSubsServicesData();
      })
    }

    this.getformDatas();
    this.getServiceallDatas();
    this.getDialPlan();
  }
  getOpMode(event) {
    this.opMode = event;
  }
  ngAfterViewChecked(){
    this.cdr.detectChanges();
 }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.systemGetSubs) this.systemGetSubs.unsubscribe();
    if (this.subscriberGetSubs) this.subscriberGetSubs.unsubscribe();

    if (this.serviceUpdateSubs) {
      this.serviceUpdateSubs.unsubscribe();
    }

    this.addBspsub?.unsubscribe();

    if (this.edgeSuitsUpdateSubs) {
      this.edgeSuitsUpdateSubs.unsubscribe();
    }

    if (this.addSystemSusbsciberSubs) this.addSystemSusbsciberSubs.unsubscribe();
    if (this.addSusbsciberSubs) this.addSusbsciberSubs.unsubscribe();
    if (this.updateSystemSusbsciberSubs) this.updateSystemSusbsciberSubs.unsubscribe();
    if (this.updateSystemSubs) this.updateSystemSubs.unsubscribe();
    if (this.updateSubscriberSubs) this.updateSubscriberSubs.unsubscribe();

    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
    if (this.deviceListSubs) this.deviceListSubs.unsubscribe();
    if (this.associateSubs) this.associateSubs.unsubscribe();
    if (this.devicesubs) this.devicesubs.unsubscribe();
  }

  OnFormData(key, value) {
    console.log(key, value)
    this.FormData[key] = value;
  }
  allFormData(value) {
    this.syetemsAllData = value
  }
  OnStaticFormData(value) {
    this.StaticForm = value;
  }
  systemID: any;
  getSyetemsAllData(hideSuccess?) {
    this.systemGetSubs = this.service.getSubscribersSystemList(this.ORG_ID, this.systemInfo, true).subscribe((res: any) => {
      if (res) {
        // this.FormData = res ? res : {};
        this.systemID = res.systemId;
        console.log("systemID", this.systemID);

        this.LegazyViewIsConfigured = Boolean(res.hasOwnProperty('rgService') && (res?.rgService?.data?.Enable || res?.rgService?.video?.Enable || (res?.rgService?.voice &&Object.values(res?.rgService?.voice?.Line).some((e: any) => e.Enable !== "Disabled"))))

        this.syetemsAllData = res ? res : {};
        if (res?.subscriber?.subscriberId) {
          this.createdSubscriberId = res.subscriber.subscriberId
        }
        this.PreProvisnedSystem = res?.status === 'Pre Provisioned';
        this.subscriberName = this.syetemsAllData?.subscriber?.name;
        this.subscriberLocationId = this.syetemsAllData?.subscriber?.subscriberLocationId;
        this.systemInfo.subscriberId = this.syetemsAllData?.subscriber?.subscriberId
        this.model = this.syetemsAllData?.modelName;
        if ((this.syetemsAllData?.edgeSuites?.myCommunityIQ?.passpoint?.enable && (this.syetemsAllData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result == 'pending' || this.syetemsAllData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result == "succeeded")) || (this.syetemsAllData?.edgeSuites?.myCommunityIQ?.eduroam?.enable && (this.syetemsAllData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result == 'pending' || this.syetemsAllData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result == "succeeded")) || (this.syetemsAllData?.edgeSuites?.smallBizIQ?.enable && (this.syetemsAllData?.edgeSuites?.smallBizIQ?.status?.result == 'pending' || this.syetemsAllData?.edgeSuites?.smallBizIQ?.status?.result == "succeeded"))) {
          this.proExpDisable = true
        } else {
          this.proExpDisable = false
        }

        if (this.activeTab == 'SystemEdgesuits') {
          if(this.proAndExpEnableentitlement || this.productIQEnableentitlement || this.ExperienceIQEnableentitlement){this.updated = this.checkUpdatedEdgeSuites(res);} else{
            this.updated=true
          }
          if (!this.updated && this.iqsuitEnable) {
            if (this.getEdgeSuitesCalled >= 24) {
              this.commonProcessingCall(res, hideSuccess);
            } else {
              setTimeout(() => {
                this.getSyetemsAllData();
                this.getEdgeSuitesCalled++;
              }, 5000);
            }

          } else {
            // successfully updated
            this.commonProcessingCall(res, hideSuccess);
          }
        } else {
          // not in edge suites page
          // this.formatListData(res, hideSuccess);
          // if (this.syetemsAllData?.rgService) {
          //   this.getServicesList();
          // }
          // this.loading = false;
          // this.savesystemsubloading = false;
          // this.serviceLoading = false;
          this.commonProcessingCall(res, hideSuccess);
        }

        //this.router.navigate(['../foundation-system-list'], { relativeTo: this.route });
      }

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.microSiteLoading = false
      this.savesystemsubloading = false;
      this.edgeSuiteLoading = false;
      this.serviceLoading = false;
      this.getEdgeSuitesCalled = 0;
      this.pageErrorHandle(err);

    })
  }

  commonProcessingCall(res, hideSuccess) {
    this.formatListData(res, hideSuccess);
    if (this.syetemsAllData?.rgService) {
      this.getServicesList();
    }
    this.loading = false;
    this.savesystemsubloading = false;
    this.serviceLoading = false;
    this.getEdgeSuitesCalled = 0;
  }
  createdSubscriberId: any
  getSubscriberData() {
    this.subscriberGetSubs = this.service.GetSubscriberData(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
      this.subscriberName = res?.name;
      this.subscriberLocationId = res?.subscriberLocationId;
      if (res) {
        this.syetemsAllData = this.syetemsAllData ? this.syetemsAllData : {}
        this.subscriber = {
          account: res.account,
          email: res.email,
          name: res.name,
          phone: res.phone,
          serviceAddress: res.serviceAddress,
          subscriberLocationId: res.subscriberLocationId,
        };
        this.createdSubscriberId = res?._id;
        this.createdSubcriberData = res;
        this.syetemsAllData.subscriber = this.subscriber;
        if (this.systemInfo.subscriberId) this.formatListData(this.syetemsAllData);
        this.getServicesList();
        this.loading = false;
        this.savesystemsubloading = false;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      this.savesystemsubloading = false;
    })
  }



  formatListData(data, hideSuccess?) {

    this.FormData.SysDetails = {
      systemId: data.systemId ? data.systemId : null,
      modelName: data.modelName ? data.modelName : null,
      subscriber: data.subscriber ? data.subscriber : {}
    }
    console.log(this.FormData)
    if (data.rgService) {
      if (data.rgService?.data?.Enable && data.rgService?.data?.Pbit != undefined) {
        data.rgService.data.Pbit = `${data.rgService?.data?.Pbit}`;
      }
      if (data.rgService?.voice?.Line['1']?.Enable === true || data.rgService?.voice?.Line['1']?.Enable == 'Enabled') {
        data.rgService.voice.Line['1'].Enable = true;

        //Service Loss Plan
        if (data.rgService?.voice?.Line['1'].VoiceProcessing && data.rgService?.voice?.Line['1'].VoiceProcessing.TransmitGain) {
          data.rgService.voice.Line['1'].VoiceProcessing.TransmitGain = data.rgService?.voice?.Line['1'].VoiceProcessing.TransmitGain / 10;
        } else data.rgService.voice.Line['1'].VoiceProcessing.TransmitGain = -3;
        if (data.rgService?.voice?.Line['1'].VoiceProcessing && data.rgService?.voice?.Line['1'].VoiceProcessing.ReceiveGain) {
          data.rgService.voice.Line['1'].VoiceProcessing.ReceiveGain = data.rgService?.voice?.Line['1'].VoiceProcessing.ReceiveGain / 10;
        } else data.rgService.voice.Line['1'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data.rgService?.voice) {
          data.rgService.voice.Line['1'].Enable = false;
        }
      }
      if (data.rgService?.voice?.Line['2']?.Enable === true || data.rgService?.voice?.Line['2']?.Enable == 'Enabled') {
        data.rgService.voice.Line['2'].Enable = true;

        //Service Loss Plan
        if (data.rgService?.voice?.Line['2'].VoiceProcessing && data.rgService?.voice?.Line['2'].VoiceProcessing.TransmitGain) {
          data.rgService.voice.Line['2'].VoiceProcessing.TransmitGain = data.rgService?.voice?.Line['2'].VoiceProcessing.TransmitGain / 10;
        } else data.rgService.voice.Line['2'].VoiceProcessing.TransmitGain = -3;
        if (data.rgService?.voice?.Line['2'].VoiceProcessing && data.rgService?.voice?.Line['2'].VoiceProcessing.ReceiveGain) {
          data.rgService.voice.Line['2'].VoiceProcessing.ReceiveGain = data.rgService?.voice?.Line['2'].VoiceProcessing.ReceiveGain / 10;
        } else data.rgService.voice.Line['2'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data.rgService?.voice) {
          data.rgService.voice.Line['2'].Enable = false;
        }
      }
      if (data.rgService?.video?.Enable && data.rgService?.video?.Pbit != undefined) {
        data.rgService.video.Pbit = `${data.rgService?.video?.Pbit}`;
      }
      this.FormData.SysServicetiers = data.rgService ? data.rgService : {};


      if (this.activeTab == 'systemAdvanced') {
        setTimeout(() => {
          // this.childSystemServicetier.initialize();
          this.childSystemAdvance.initialize();
        }, 200);

      }
    } else {
      this.FormData.SysServicetiers = {};
      if (this.activeTab == 'systemAdvanced') {
        //this.childSystemServicetier.initialize();
        this.childSystemAdvance.initialize();
      }
    }

    this.FormData.SysEdgeSuites = data.edgeSuites ? data.edgeSuites : {};

    if (data.edgeSuites) {
      if (this.activeTab == 'SystemEdgesuits') {
        if (data.edgeSuites && data.edgeSuites?.arloSmart && !data.edgeSuites?.arloSmart?.userId && data.edgeSuites?.arloSmart?.provResults && data.edgeSuites?.arloSmart?.provResults.indexOf('error')) {
          let msg = this.language['System Subscribers edge suites data updated successfully except Arlo details'];
          this.showWarningMessage(msg);
          this.removeArloAccount();
        } else {
          if (!hideSuccess) {
            let msg = this.language['System subscriber\'s Managed Services updated successfully'];
            this.showSuccessMessage(msg);
          }
          this.edgeSuiteLoading = false;
        }

        setTimeout(() => {
          this.childSystemEdgesuits.initialize();
        }, 50);
      }
    }


    this.loading = false;
    this.dataAvail = true;
  }

  getformDatas() {
    let requestEndpoints = [
      `${environment.SUPPORT_URL}/netops-config/configuration-profile?${this.sso.getOrg(this.ORG_ID)}`,
      `${environment.SUPPORT_URL}/netops-dp/dial-plan?${this.sso.getOrg(this.ORG_ID)}`,
      `${environment.SUPPORT_URL}/netops-device/group/count?${this.sso.getOrg(this.ORG_ID)}`,
      // `${environment.API_BASE_URL}foundation/feature/arlo/serviceroles`,
      // `${environment.API_BASE_URL}foundation/feature/servify/plans`,
      // `${environment.API_BASE_URL}foundation/feature/servify/cancelreasons`

    ];
    if (this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) {
      requestEndpoints.push(`${environment.API_BASE_URL}foundation/feature/arlo/serviceroles`)
    }
    if (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) {
      requestEndpoints.push((`${environment.API_BASE_URL}foundation/feature/servify/plans`), (`${environment.API_BASE_URL}foundation/feature/servify/cancelreasons`))
    }

    const requests = [];

    if (this.systemInfo && this.systemInfo.sn) {
      requestEndpoints.push(
        `${environment.FOUNDATION_BASE_URL}/subscriber-systems/static-group-memberships?orgId=${this.ORG_ID}&systemId=${this.systemInfo.sn}`
      );
      requestEndpoints.push(
        `${environment.SUPPORT_URL}/device/${this.ORG_ID}/${this.systemInfo.sn}/deviceinfo`
      );
    }

    requestEndpoints.forEach(endpoint => {
      const req = this.service.callRestApi(endpoint).pipe(map((res: any) => {
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
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {

      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0]);
        this.formOptions.Brandwidthitems = [];
      } else {
        this.buildBWProfile(response[0]);
      }

      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1]);
        this.formOptions.DialPlanitems = [];
      } else {
        this.formOptions.DialPlanitems = response[1] ? response[1] : [];
      }

      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2]);
        this.formOptions.DialPlanitems = [];
      } else if (response[2] && response[2].count) {
        this.getDeviceGoupList(response[2].count)
      } else {

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

      if (this.systemInfo && this.systemInfo.sn) {
        if (response[6] && response[6].error) {
          this.pageErrorHandle(response[6]);
          this.StaticForm = {
            static: false,
            staticGroupList: []
          };
        } else {
          if (response[6] && response[6].length) {
            this.StaticForm = {
              static: true,
              staticGroupList: response[6]
            };
          } else {
            this.StaticForm = {
              static: false,
              staticGroupList: []
            };
          }

        }

        this.service.staticGroupSubject.next(this.StaticForm);
        if (response[7] && response[7].error) {
          this.pageErrorHandle(response[7]);

        } else {
          if (response[7] && Object.keys(response[7]).length) {
            this.deviceInfo = response[7] ? response[7] : {};
            this.deviceOpMode = (response[7] && response[7].opMode) ? response[7].opMode : '';
            this.modelname = (response[7] && response[7].modelName) ? response[7].modelName : '';
            this.wanAccessType = (response[7] && response[7].wanAccessType) ? response[7].wanAccessType.toUpperCase() : '';
            if (this.deviceOpMode === 'RG') {
              if ((this.modelname).indexOf("GS") !== -1 || (this.modelname).indexOf("GM") !== -1 || (this.modelname).indexOf("GPR") !== -1) {
                this.iqsuitEnable = true;
              } else {
                this.iqsuitEnable = false;
              }

              let serialNumber = this.deviceInfo?.serialNumber;
              this.service.fetchMetaData(this.ORG_ID, serialNumber).subscribe((res: any) => {
                res.properties.forEach(obj => {
                  if (obj.featureName === "SSIDBackup") {
                    this.SSIDbackup = true;
                  }
                });
              })
            }
            // if (this.wanAccessType == 'GPON') {
            //   this.servicetabdisable = true;
            // } else {
            //   this.servicetabdisable = false;
            // }
          } else {
            this.deviceInfo = {};
            this.getProvisionRecord();
          }

        }
      }

      setTimeout(() => {
        this.deviceDataAvail = true;
      }, 1000);

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.deviceDataAvail = true;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  getDeviceGoupList(count) {
    this.loading = true;
    this.deviceListSubs = this.service.getDeviceGoupList(this.ORG_ID, count).subscribe((data: any) => {
      this.loading = false;
      this.deviceDataList = data ? this.getStaticList(data) : [];
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  gotoTab(tab) {
    this.activeTab = tab ? tab : 'systemDetails';
    if (tab === 'networkService' || tab === 'systemAdvanced') this.saveDisabled = false;
    if (this.activeTab == 'systemDetails' && this.StaticForm) {
      this.service.staticGroupSubject.next(this.StaticForm);
    }
    console.log('haha')
  }


  saveSystem() {

    if (this.activeTab == 'systemDetails') {
      this.childSystemDetails.saveSystem();
    } else if (this.activeTab == 'systemServices') {
      this.childSystemServicetier.saveSystem();
    } else if (this.activeTab == 'SystemEdgesuits') {
      this.childSystemEdgesuits.saveSystem();
    } else if (this.activeTab == 'systemStaticgroups') {
      this.childStaticGroups.saveSystem();
    } else if (this.activeTab == 'systemAdvanced') {
      this.childSystemAdvance.saveSystem();
    } else if (this.activeTab == 'networkService') {
      this.childNetworkService.saveSubscriber()
    }
  }
  // @ViewChild(AddStaticGroupsComponent) staticGroup:AddStaticGroupsComponent

  saveSyetemsubscriber() {
    //debugger;
    let sysFormData = this.FormData.SysDetails;
    // console.log(this.staticGroup)
    if (sysFormData.staticGroup) {
      delete sysFormData.staticGroup;
    }
    this.SaveSysData = {}
    if (sysFormData.subscriber.subscriberLocationId == null) {
      const sjonObj1 = this.SaveSysData = {
        systemId: (sysFormData.systemId).replace(/\s+/g, ""),
        modelName: sysFormData.modelName,
      }
      $.each(sjonObj1, function (key, value) {
        if (value == "" || value == null) {
          delete sjonObj1[key];
        }
      });
    }
    else {
      this.FormData.SysDetails.systemId = this.FormData?.SysDetails?.systemId?.replace(/\s+/g, "")
      this.SaveSysData = this.removeNull(this.FormData.SysDetails)
      //this.SaveSysData = _.pickBy(this.FormData.SysDetails, v => v !== null && v !== undefined);
    }

    this.savesystemsubloading = true;
    this.closeAlert();
    if (this.system == 'New System') {
      if (sysFormData.systemId) {
        this.addSystemSusbsciberSubs = this.service.AddSystemSubscriberData(this.ORG_ID, this.SaveSysData).subscribe((res: any) => {
          this.tabDisable = false;
          this.subonlytabDisable = false;
          this.servicetabdisable = false;
          if (res) {
            this.systemInfo = {
              sn: res.systemId ? res.systemId : '',
              subscriberId: res.subscriberId ? res.subscriberId : ''
            }
            if (res.systemId || this.FormData.SysDetails.systemId) {
              this.submitStaticGroups()
            };
            this.getDeviceRecord();
            this.getSubscriberServices();
            if (res && res.systemId) {
              this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Created');
              this.system = res.systemId ? res.systemId : 'Added New System';
            } else if (res && res.subscriberId) {
              this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Created');
              this.system = sysFormData.modelName ? sysFormData.modelName : 'Added New System';
            }
          }
          this.showSuccessMessage(this.language['New System details added successfully']);
          this.getSyetemsAllData();
          //this.router.navigate(['../foundation-system-list'], { relativeTo: this.route });
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
          this.savesystemsubloading = false;
        });
      } else {
        let params = this.SaveSysData['subscriber'];
        this.addSusbsciberSubs = this.service.AddSubscriberData(this.ORG_ID, params).subscribe((res: any) => {
          this.createdSubscriberId = res?._id;
          this.tabDisable = true;
          this.subonlytabDisable = false;
          this.servicetabdisable = true;
          this.iqsuitEnable = true;
          if (res) {
            this.systemInfo = {
              sn: res.systemId ? res.systemId : '',
              subscriberId: res._id ? res._id : ''
            }
            this.system = ""
            this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Created');
            // this.system = res.name ? res.name : 'New System Subsciber';
          }
          if (res.systemId || this.FormData.SysDetails.systemId) {
            this.submitStaticGroups();
          }
          this.getSubscriberData();
          this.getSubscriberServices();
          this.showSuccessMessage(this.language['New subscriber data added successfully']);

          //this.router.navigate(['../foundation-system-list'], { relativeTo: this.route });

        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
          this.savesystemsubloading = false;
        });
      }

    } else {
      if (this.systemInfo.sn && this.systemInfo.subscriberId) {
        let systemParams = this.SaveSysData;
        systemParams['subscriber']['subscriberId'] = this.systemInfo.subscriberId;
        this.updateSystemSusbsciberSubs = this.service.UpdateSystemSubscriberData(this.ORG_ID, systemParams, this.systemInfo).subscribe(res => {
          this.getSyetemsAllData();
          this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Updated');
          this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Updated');
          let msg = this.language['System data updated successfully'];
          if (this.systemInfo.sn) {
            msg = `${this.systemInfo.sn} - ${this.language['System data updated successfully']}`;
            this.submitStaticGroups();
          };

          this.showSuccessMessage(msg);
        }, (err: HttpErrorResponse) => {
          this.savesystemsubloading = false;
          this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
        });

      } else if (this.systemInfo.sn) {
        //Updating using SystemId
        if (this.SaveSysData['subscriber'] && this.SaveSysData['subscriber']['subscriberLocationId']) {
          //Updating available System Info & Adding Subscriber Info seperately- since there is SystemId Available
          this.updateSystemSusbsciberSubs = this.service.UpdateSystemSubscriberData(this.ORG_ID, this.SaveSysData, this.systemInfo).subscribe(res => {
            this.getSyetemsAllData();
            this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Created');
            this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Updated');
            let msg = this.language['System data updated successfully'];;
            if (this.systemInfo.sn) {
              msg = `${this.systemInfo.sn} - ${this.language['System data updated successfully']}`;
            }
            this.showSuccessMessage(msg);
          }, (err: HttpErrorResponse) => {
            this.savesystemsubloading = false;
            this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
          });
        } else {
          //Updating System Info Alone
          let systemParams = {
            systemId: this.SaveSysData['systemId'],
            modelName: this.SaveSysData['modelName']
          }

          this.updateSystemSubs = this.service.UpdateSystemInfo(this.ORG_ID, systemParams, this.systemInfo).subscribe(res => {
            this.getSyetemsAllData();
            if (this.systemInfo.sn || this.FormData.SysDetails.systemId) {
              this.submitStaticGroups();
            }
            this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Updated');
            let msg = this.language['System data updated successfully'];
            if (this.systemInfo.sn) {
              msg = `${this.systemInfo.sn} - ${this.language['System data updated successfully']}`;
            }
            this.showSuccessMessage(msg);
          }, (err: HttpErrorResponse) => {
            this.savesystemsubloading = false;
            this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
          });
        }

      } else if (this.systemInfo.subscriberId) {
        //Updating Using Subscriber Id
        if (this.SaveSysData['systemId']) {
          //Updating available Subscriber Info & Adding New System Info extra- since there is SubscriberId Available
          this.devicesubs = this.service.getSearchResult(this.ORG_ID, this.SaveSysData['systemId']).subscribe((res: any) => {
            this.deviceData = res ? res : {};
            this.deviceInfo = res ? res : {};
            this.deviceOpMode = (res && res['opMode']) ? res['opMode'] : '';
            this.modelName = (res && res['modelName']) ? res['modelName'] : '';

            if (Object.keys(this.deviceData).length) {
              let systemParams = {
                systemId: this.SaveSysData['systemId'],
                subscriberId: this.systemInfo.subscriberId
              }

              this.associateSubs = this.service.associateDevice(this.ORG_ID, systemParams).subscribe(res => {
                this.tabDisable = false;
                this.subonlytabDisable = false;
                this.servicetabdisable = false;
                this.systemInfo.sn = this.SaveSysData['systemId'];
                this.getSyetemsAllData();
                this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Created');
                this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Updated');
                let msg = this.language['System data updated successfully'];
                if (this.systemInfo.sn) {
                  msg = `${this.systemInfo.sn} - ${this.language['System data updated successfully']}`;
                }
                if (this.systemInfo.sn) {
                  this.system = this.systemInfo.sn ? this.systemInfo.sn : 'Added New System';
                }
                this.showSuccessMessage(msg);
              }, (err: HttpErrorResponse) => {
                this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
                this.savesystemsubloading = false;
              });
            } else {
              let systemParams = this.SaveSysData;
              systemParams['subscriber']['subscriberId'] = this.systemInfo.subscriberId;
              this.service.UpdateSystemSubscriberData(this.ORG_ID, systemParams, this.systemInfo).subscribe(res => {
                this.tabDisable = false;
                this.subonlytabDisable = false;
                this.servicetabdisable = false;
                this.systemInfo.sn = this.SaveSysData['systemId'];
                this.getSyetemsAllData();
                this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','System Updated');
                this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Updated');
                let msg = this.language['System data updated successfully'];
                if (this.systemInfo.sn) {
                  msg = `${this.systemInfo.sn} - ${this.language['System data updated successfully']}`;
                }
                if (this.systemInfo.sn) {
                  this.system = this.systemInfo.sn ? this.systemInfo.sn : 'Added New System';
                }
                this.showSuccessMessage(msg);
              }, (err: HttpErrorResponse) => {
                this.savesystemsubloading = false;
                this.pageErrorHandle(err, this.FormData.SysDetails?.subscriber?.subscriberLocationId);
              });
            }
          })


        }
        else {
          //Updating Suscriber Info Alone
          let params = this.SaveSysData['subscriber'];
          this.updateSubscriberInfo(params);
        }
      } else {
        //
      }

    }


  }

  updateSubscriberInfo(params) {
    this.updateSubscriberSubs = this.service.UpdateSubscriberData(this.ORG_ID, params, this.systemInfo.subscriberId).subscribe((res: any) => {
      this.createdSubscriberId = res?._id;
      this.getSubscriberData();
      this.commonFunctionsService.trackPendoEvents('Deployment_Cloud','Subscriber Updated');
      let msg = this.language['Subscriber data updated successfully'];
      this.showSuccessMessage(msg);
      this.savesystemsubloading = false;
      this.iqsuitEnable = true;
    }, (err: HttpErrorResponse) => {
      this.savesystemsubloading = false;
      this.pageErrorHandle(err);
    });
  }

  removeNull = (obj) => {

    Object.keys(obj).forEach(key =>
      (obj[key] && typeof obj[key] === 'object') && this.removeNull(obj[key]) ||
      (obj[key] === '' || obj[key] === null) && delete obj[key]
    );
    return obj;
  };


  closeAddEdit() {
    if (this.redirectToView && this.redirectToView === 'view') {
      let sn = this.systemInfo.sn ? this.systemInfo.sn : '';
      let subscriberId = this.systemInfo.subscriberId ? this.systemInfo.subscriberId : '';
      let queryParams = { sn: sn, subscriber: subscriberId };
      if (!sn && !subscriberId) {
        this.goToList();
      }
      this.router.navigate(['/cco-foundation/foundation-systems/foundation-manage/system-details'], { relativeTo: this.route, queryParams: queryParams });
    } else {
      this.goToList();
    }

  }

  goToList() {
    let searchText = sessionStorage.getItem('foundation_list_search');
    if (searchText) {
      this.router.navigate(['../foundation-system-list'], { relativeTo: this.route, state: { systemSearchText: searchText || '' } });
    } else this.router.navigate(['../foundation-system-list'], { relativeTo: this.route });
  }

  submitServiceData() {
    let formData = this.FormData.SysServicetiers;
    let params = {
      data: {
        Enable: false
      },
      voice: {
      },
      video: {
        Enable: false
      },
      services: []
    };

    const ServiceType = formData.voice?.ServiceType ? formData.voice?.ServiceType : '';
    //DATA PROCESS
    if (formData?.services?.Enable) {
      params.services.push(formData.services)
    }
    if (formData.data.Enable) {
      formData.data.pppoe = _.pickBy(formData.data.pppoe, v => v !== null && v !== "");
      if (formData.data.Pbit != undefined) {
        formData.data.Pbit = `${formData.data.Pbit}`;
      }
    } else {
      if (formData.data.BwProfile) {
        formData.data = {
          Enable: false,
          BwProfile: formData.data.BwProfile
        };
      } else {
        formData.data = {
          Enable: false
        };
      }
    }
    //params.data = _.pickBy(formData.data, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    params.data = _.pickBy(formData.data, v => {
      return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    });


    //VOICE PROCESS
    if (ServiceType !== 'SIP' && formData.voice?.FaxT38 != undefined) {
      delete formData.voice?.FaxT38;
    }

    if (ServiceType !== 'SIP' && formData.voice?.DialPlan != undefined) {
      delete formData.voice?.DialPlan;
    }

    if ((ServiceType !== 'MGCP' && ServiceType !== 'H.248') || formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType !== 'DHCP') {
      if (formData.voice.X_000631_Opt81ClientFQDN != undefined) delete formData.voice.X_000631_Opt81ClientFQDN;
    }

    if (formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType !== 'Static') {
      formData.voice.X_CALIX_SXACC_RG_WAN = {
        ServiceConnectionType: 'DHCP'
      }
    } else if (formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType === 'Static' && formData.voice?.X_CALIX_SXACC_RG_WAN.DNSServers) {
      let dns = formData.voice?.X_CALIX_SXACC_RG_WAN.DNSServers;
      let arr = dns.split(",");
      arr = arr.filter(el => el && el.replace(/\s+/g, ""));
      formData.voice.X_CALIX_SXACC_RG_WAN.DNSServers = arr.join(',');
    }

    formData = ((formData) => {
      for (let i = 1; i < 3; i++) {
        if (ServiceType === 'SIP' && formData.voice?.Line[i].Enable === true) {
          formData.voice.Line[i] = {
            Enable: formData.voice.Line[i].Enable,
            SIP: formData.voice.Line[i].SIP,
            CallingFeatures: formData.voice.Line[i].CallingFeatures,
            VoiceProcessing: formData.voice.Line[i].VoiceProcessing
          }
          if (!formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectEnable) {
            delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectNumber;
            delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectTimer;
          }

        } else if (ServiceType === 'H.248' && formData.voice?.Line[i].Enable === true) {
          formData.voice.Line[i] = {
            Enable: formData.voice.Line[i].Enable,
            X_000631_H248: formData.voice.Line[i].X_000631_H248,
            //CallingFeatures: formData.voice.Line[i].CallingFeatures,
            VoiceProcessing: formData.voice.Line[i].VoiceProcessing
          }
          // if (formData.voice?.Line[i].MGCP) delete formData.voice?.Line[i].MGCP;
          // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
        } else if (ServiceType === 'MGCP' && formData.voice?.Line[i].Enable === true) {
          formData.voice.Line[i] = {
            Enable: formData.voice.Line[i].Enable,
            MGCP: formData.voice.Line[i].MGCP,
            //CallingFeatures: formData.voice.Line[i].CallingFeatures,
            VoiceProcessing: formData.voice.Line[i].VoiceProcessing
          }
          // if (formData.voice?.Line[i].TerminationId) delete formData.voice?.Line[i].TerminationId;
          // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
        } else if (ServiceType === 'X_000631_TDMGW' && formData.voice?.Line[i].Enable === true) {
          formData.voice.Line[i] = {
            Enable: formData.voice.Line[i].Enable,
            X_000631_TdmGw: formData.voice.Line[i].X_000631_TdmGw,
            //CallingFeatures: formData.voice.Line[i].CallingFeatures,
            VoiceProcessing: formData.voice.Line[i].VoiceProcessing
          }
          // if (formData.voice?.Line[i].TerminationId) delete formData.voice?.Line[i].TerminationId;
          // if (formData.voice?.Line[i].MGCP) delete formData.voice?.Line[i].MGCP;
        }

        if (formData.voice?.Line[i].Enable && formData.voice?.Line[i].VoiceProcessing) {
          formData.voice.Line[i].VoiceProcessing.TransmitGain = formData.voice?.Line[i].VoiceProcessing.TransmitGain * 10;
          formData.voice.Line[i].VoiceProcessing.ReceiveGain = formData.voice?.Line[i].VoiceProcessing.ReceiveGain * 10;
          if (formData.voice?.Line[i].VoiceProcessing?.systemLoss) delete formData.voice.Line[i].VoiceProcessing.systemLoss;

        }
      }

      return formData;
    })(formData);


    params.voice = _.pickBy(formData.voice, v => v !== null && v !== "");
    if (formData.voice.Line['1'].Enable === false || formData.voice.Line['1'].Enable === 'Disabled') {
      params.voice['Line']['1'] = {
        Enable: "Disabled"
      };
    } else if (formData.voice.Line['1'].Enable === true) {
      params.voice['Line']['1'].Enable = "Enabled";
    }

    if (formData.voice.Line['2'].Enable === false || formData.voice.Line['2'].Enable === 'Disabled') {
      params.voice['Line']['2'] = {
        Enable: "Disabled"
      };
    } else if (formData.voice.Line['2'].Enable === true) {
      params.voice['Line']['2'].Enable = "Enabled";
    }

    //VIDEO PROCESS
    if (formData.video.Enable) {
      if (formData.video.Pbit != undefined) {
        formData.video.Pbit = `${formData.video.Pbit}`;
      }
    } else {
      if (formData.video.BwProfile) {
        formData.video = {
          Enable: false,
          BwProfile: formData.video.BwProfile
        };
      } else {
        formData.video = {
          Enable: false
        };
      }
    }

    params.video = _.pickBy(formData.video, v => {
      return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    });
    //params.video = _.pickBy(formData.video, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));



    this.closeAlert();
    this.serviceLoading = true;
    this.serviceUpdateSubs = this.service.updateServiceData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {
      this.getSyetemsAllData();
      this.LegazyViewIsConfigured = true;
      let msg = this.language['System Subscribers services data updated successfully'];
      this.showSuccessMessage(msg);
    }, (err: HttpErrorResponse) => {
      this.serviceLoading = false;
      this.pageErrorHandle(err);
    })
  }
  microSiteLoading: boolean = false;
  GetMicrosites() {
    this.microSiteLoading = true;
    this.addBspsub = this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res.filter(x => x.status === "READY") : [];
      this.microSiteLoading = false;
    }, err => {
      this.microSiteLoading = false;
    })
  }
  submitEdgeSuitsData(event, noDelay?) {
    let formData = Object.assign({}, this.FormData.SysEdgeSuites);
    if (formData.arloSmart.enabled && !formData.arloSmart.email) {
      return;
    } else if (formData.arloSmart.enabled && formData.arloSmart.email && !(this.commonOrgService.validateEmail(formData.arloSmart.email))) {
      return;
    }

    let params: any = {
      protectIQ: {},
      experienceIQ: {},
      myCommunityIQ: {},
      bark: {},
      smallBizIQ: {}
    };
    if (!formData?.smallBizIQ) {
      params.smallBizIQ = {}
    } else {
      if (formData?.smallBizIQ?.enable) {
        params.smallBizIQ = {
          enable: formData.smallBizIQ?.enable
        }
      } else {
        params.smallBizIQ = {
          enable: false
        }
      }
    }

    if (formData.bark?.enable) {
      params.bark = {
        email: formData.bark?.email,
        planCode: formData.bark?.planCode,
      }
    } else {
      params.bark = {}
    }
   if(this.proAndExpEnableentitlement || this.ExperienceIQEnableentitlement){
    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }
   }
    
  if(this.productIQEnableentitlement || this.proAndExpEnableentitlement){
    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }
  }
   
    //mycommunity
    params.myCommunityIQ = formData.myCommunityIQ;
    if (this.opMode && this.opMode != "RG") {
      if (params?.myCommunityIQ?.passpoint?.enable) {
        params.myCommunityIQ.passpoint.enable = false;
      }
    }

    (params.myCommunityIQ?.subscriber?.communities?.length > 0) ? params.myCommunityIQ.subscriber.communities = params.myCommunityIQ?.subscriber?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    (params.myCommunityIQ?.passpoint?.communities?.length > 0) ? params.myCommunityIQ.passpoint.communities = params.myCommunityIQ?.passpoint?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    let arrayLength = params?.myCommunityIQ?.passpoint?.communities?.length, deletedCount = 0;
    for (let i = 0; i < arrayLength; i++) {
      let count = 0;
      for (let j = 0; j < this.communityArr.length; j++) {
        if (params.myCommunityIQ.passpoint.communities[i].micrositeId == this.communityArr[j].id) {
          ++count;
        }
        if (((this.communityArr.length - 1) == j) && count == 0) {
          params.myCommunityIQ.passpoint.communities.splice((i - deletedCount), 1)
          deletedCount++;
        }
      }

    }
    delete params.myCommunityIQ?.subscriber?.communitiesDuplicate;
    delete params.myCommunityIQ?.passpoint?.communitiesDuplicate;
    (!params.myCommunityIQ?.subscriber?.enable) ? delete params.myCommunityIQ.subscriber.communities : null;

    for (let key in params.myCommunityIQ) {
      if (typeof (params.myCommunityIQ[key]) == 'object') {
        for (let childKey in params.myCommunityIQ[key]) {
          if (Array.isArray(params.myCommunityIQ[key][childKey])) {
            if (key == 'subscriber') {
              (!params.myCommunityIQ[key][childKey].length) ? delete params.myCommunityIQ[key][childKey] : null;
            }

          } else if (typeof (params.myCommunityIQ[key][childKey]) == 'object') {
            for (let grandChild in params.myCommunityIQ[key][childKey]) {
              !params.myCommunityIQ[key][childKey][grandChild] ? delete params.myCommunityIQ[key][childKey][grandChild] : null;
            }
          }
        }
      }
    }
    if (params.myCommunityIQ?.network?.type == 'Bridge') {
      if (params?.myCommunityIQ?.network?.protocol) delete params.myCommunityIQ.network.protocol;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('network')?.patchValue({
        protocol: null,
      })
    } else if (params.myCommunityIQ?.network?.type !== 'Policy_Route') {
      if (params?.myCommunityIQ?.network?.protocol) delete params.myCommunityIQ.network.protocol;
      if (params?.myCommunityIQ?.network?.vlanId) delete params.myCommunityIQ.network.vlanId;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('network')?.patchValue({
        protocol: null,
        vlanId: null
      })
    }
    if (!this.syetemsAllData?.subscriber?.subscriberLocationId && params?.myCommunityIQ?.subscriber) {
      delete params.myCommunityIQ.subscriber;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('subscriber')?.patchValue({
        enable: false,
        communities: [],
        communitiesDuplicate: []
      })
    }
    if (formData?.arloSmart?.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan?.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData?.servifyCare?.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    if (params.myCommunityIQ?.eduroam && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.eduroam?.primaryServer;
      delete params.myCommunityIQ?.eduroam?.secret;
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('eduroam')?.patchValue({
        primaryServer: null,
        secondaryServer: null,
        secret: null
      })
    }

    if (params?.myCommunityIQ?.eduroam && params?.myCommunityIQ?.eduroam?.secondaryServer == '') {
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('eduroam')?.patchValue({
        secondaryServer: null,
      })
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    this.updationEdgeSuitesData = _.cloneDeep(params);
    this.updationEdgeSuitesData['experienceIQInpEnabled'] = event.experienceIQ ? true : false;
    this.updationEdgeSuitesData['protectIQInpEnabled'] = event.protectIQ ? true : false;
    if(this.proAndExpEnableentitlement || this.ExperienceIQEnableentitlement){
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];}
    if(this.productIQEnableentitlement || this.proAndExpEnableentitlement){
      if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
    }
   

    this.closeAlert();
    this.edgeSuiteLoading = true;
    if (params.myCommunityIQ?.network?.type == null) delete params.myCommunityIQ?.network?.type;
    if (params.myCommunityIQ?.network?.vlanId == '') delete params.myCommunityIQ?.network?.vlanId;
    if (params.myCommunityIQ?.network?.protocol == '') delete params.myCommunityIQ?.network?.protocol;

    if (!params.myCommunityIQ?.passpoint) {
      delete params.myCommunityIQ?.passpoint;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('passpoint')?.patchValue({
        enable: false,
        communities: [],
        communitiesDuplicate: [],
      })
    } else if (!params.myCommunityIQ?.passpoint?.enable) {
      delete params.myCommunityIQ?.passpoint?.communities;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.get('passpoint')?.patchValue({
        communities: [],
      })
    }
    if (!params.myCommunityIQ?.passpoint?.enable && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.network;
      delete params.myCommunityIQ?.prioritizeTraffic;
      this.childSystemEdgesuits?.edgeSuitsForm?.get('myCommunityIQ')?.patchValue({
        network: {
          type: 'Bridge',
          vlanId: '',
          protocol: '',
        },
        prioritizeTraffic: false
      })
    }
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {
      if (this.childSystemEdgesuits?.submitted) this.childSystemEdgesuits.submitted = false;
      if (noDelay) {
        setTimeout(() => {
          this.getSyetemsAllData(true);
        }, 1500);
      } else {

        let delay = 1000;
        if (res && res.estimatedDelay) {
          delay += res.estimatedDelay * 1000;
        }

        // setTimeout(() => {
        //   this.getSyetemsAllData();
        // }, delay);

        if (this.iqsuitEnable && event && (event.protectIQ || event.experienceIQ)) {
          setTimeout(() => {
            this.updateApplicationService(event, paramsEnabled, delay);
          }, 500);
        } else {
          delay = delay + 2000;;
          setTimeout(() => {
            this.getSyetemsAllData();
          }, delay);
        }


      }

    }, (err: HttpErrorResponse) => {
      this.edgeSuiteLoading = false;
      this.pageErrorHandle(err);
    })
  }

  getEdgeSuitesAgain() {
    this.countDown = 60;
    this.intervalEdgeSuites = setInterval(() => {
      if (this.countDown % 5 == 0) {
        this.getSyetemsAllData();
      }
      if (this.countDown == 0) {
        clearInterval(this.intervalEdgeSuites);
      }
      this.countDown--;
    }, 1000)
  }

  submitStaticGroups() {
    let formData = this.StaticForm;
    let params = [];
    if (formData.staticGroupList && formData.staticGroupList.length) {
      params = formData.staticGroupList.slice(0);
    }

    this.staticGroupUpdateSubs = this.service.updateStaticGroupsData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {

      let msg = this.language['System Static groups data updated successfully'];
      this.showSuccessMessage(msg);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  buildBWProfile(profileList) {
    const bwProfile = profileList?.filter(profile => {
      return (profile.innerProfileCategory === 'Bandwidth')
    });

    // if (bwProfile && bwProfile[0] && bwProfile[0]._id) {
    //   bwProfile.unshift({
    //     _id: '',
    //     name: ''
    //   });
    // }

    //this.addDeviceObj.configurationObj['serviceBWList'] = bwProfile;
    this.formOptions.Brandwidthitems = [...bwProfile];
  }


  pageErrorHandle(err: HttpErrorResponse, value?) {
    if (err?.error?.errorMessage === 'System Already Exists') {
      this.errorInfo = 'System already exists';
    } else if (err?.error?.errorMessage) {
      if (err?.error?.errorMessage.indexOf("Found An Existing Subscriber") !== -1) {
        this.errorInfo = `Found an existing subscriber with same Subscriber Location ID ${value}`;
      }
      else {
        if (err.status == 401) {
          this.errorInfo = this.language['Access Denied'];
        } else {
          this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        }
      }
    } else {
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
    }
    this.closeAlert();
    this.error = true;
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.edgeSuitsWarning = false;
  }

  showSuccessMessage(msg: any) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2500)
  }

  showWarningMessage(msg: any) {
    this.closeAlert();
    this.edgeSuitsWarningInfo = msg;
    this.edgeSuitsWarning = true;
    setTimeout(() => {
      this.edgeSuitsWarning = false;
    }, 5000)
  }

  getStaticList(list) {
    if (list && list.length > 0) {
      list = list.filter(device => {
        return (device.type === 'static');
      });

    }
    return list;
  }
  LegazyViewIsConfigured: boolean = false;
  getProvisionRecord() {
    if (this.systemInfo && this.systemInfo.sn) {
      this.service.getProvisionrecord(this.ORG_ID, this.systemInfo.sn).subscribe((res: any) => {
        this.provisionData = res ? res : {};
        this.deviceOpMode = (res && res.opMode) ? res.opMode : '';
        if (!this.deviceInfo) {
          if (this.deviceOpMode === 'RG' && this.provisionData?.modelName) {
            if ((this.provisionData?.modelName).indexOf("GS") !== -1 || (this.provisionData?.modelName).indexOf("GM") !== -1 || (this.provisionData?.modelName).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true;
            } else {
              this.iqsuitEnable = false;
            }
          }
          else if (this.deviceOpMode === 'RG' && !this.provisionData?.modelName && this.model) {
            if ((this.model).indexOf("GS") !== -1 || (this.model).indexOf("GM") !== -1 || (this.model).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true;
            } else {
              this.iqsuitEnable = false;
            }
          }
          this.LegazyViewIsConfigured = true;
        }


        if (Object.keys(this.provisionData).length == 0) {
          this.iqsuitEnable = true;
          this.LegazyViewIsConfigured = false;
        }
        this.loading = false;

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    } else {
      this.LegazyViewIsConfigured = false;
    }


  }
  getDeviceRecord() {
    if (this.systemInfo && this.systemInfo.sn) {
      this.service.getDeviceInfo(this.ORG_ID, this.systemInfo.sn).subscribe((res: any) => {
        this.device = res ? res : []
        if (Object.keys(this.device).length) {
          this.deviceOpMode = (res && res.opMode) ? res.opMode : '';
          if (this.deviceOpMode === 'RG' && this.device?.modelName) {
            if ((this.device?.modelName).indexOf("GS") !== -1 || (this.device?.modelName).indexOf("GM") !== -1 || (this.device?.modelName).indexOf("GPR") !== -1) {
              this.iqsuitEnable = true;
            } else {
              this.iqsuitEnable = false;
            }
          }
        }
        else {
          this.getProvisionRecord();
        }

        //this.getModelFeature();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }


  }

  getServicesList() {
    if (this.systemInfo.subscriberId) {
      this.servicesListSubs = this.service.getServicesOfSubscriber(this.ORG_ID, this.systemInfo.subscriberId).subscribe((res: any) => {
        this.servicesListData = res ? res : {};

      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }

  removeArloAccount() {
    this.FormData.SysEdgeSuites['arloSmart'].enabled = false;
    let updateEnabled: any = {
      protectIQ: false,
      experienceIQ: false
    };
    this.submitEdgeSuitsData(updateEnabled, true);
  }

  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['arlo'] = entitlement[206] ? entitlement[206] : [];
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    entitlement['Platinum'] = entitlement[215] ? entitlement[215] : [];
    entitlement['Silver'] = entitlement[216] ? entitlement[216] : [];
    entitlement['Gold'] = entitlement[217] ? entitlement[217] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
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
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.myCommunityIQEntitlement = true;
    } else {
      this.myCommunityIQEntitlement = false;
    }
  }


  updateApplicationService(update, params, delay?) {
    delay = delay ? delay : 0;
    const requests: Observable<any>[] = [];
    if (update.protectIQ) {
      let deviceSubDetails = {
        app: 'protectIQ',
        enable: params.protectIQ?.enabled
      }
      requests.push(this.service.updateEnableApp(this.ORG_ID, this.systemInfo, deviceSubDetails));
    }

    if (update.experienceIQ) {
      let deviceSubDetails = {
        app: 'experienceIQ',
        enable: params.experienceIQ?.enabled
      }
      requests.push(this.service.updateEnableApp(this.ORG_ID, this.systemInfo, deviceSubDetails));
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
          this.getSyetemsAllData();
        }, dely);
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        let dely = delay + 3000;
        setTimeout(() => {
          this.getSyetemsAllData();
        }, dely);
      }
    );

  }

  checkUpdatedEdgeSuites(res) {
    let formData = this.updationEdgeSuitesData;
    let resData = res?.edgeSuites;
    let updated = true;
    if (resData && Object.keys(resData).length) {

      if (formData?.experienceIQ?.subscribed) {
        //If ExpIQ Subscribed
        if (formData?.experienceIQInpEnabled && formData?.experienceIQ?.enabled !== resData?.experienceIQ?.enabled) {
          return false;
        } else if (!formData?.experienceIQInpEnabled && formData?.experienceIQ?.subscribed !== resData?.experienceIQ?.subscribed) {
          return false;
        }
      } else if (formData?.experienceIQ?.subscribed !== resData?.experienceIQ?.subscribed) {
        return false;
      }

      if (formData?.protectIQ?.subscribed) {
        //If ExpIQ Subscribed
        if (formData?.protectIQInpEnabled && formData?.protectIQ?.enabled !== resData?.protectIQ?.enabled) {
          return false;
        } else if (!formData?.protectIQInpEnabled && formData?.protectIQ?.subscribed !== resData?.protectIQ?.subscribed) {
          return false;
        }
      } else if (formData?.protectIQ?.subscribed !== resData?.protectIQ?.subscribed) {
        return false;
      }

      return true;
    }
    return true;
  }

  showEdgeSuitesNotUpdateError() {
    this.errorInfo = 'Edge suites updation not yet reflected, please refresh';
    this.error = true;
    setTimeout(() => {
      this.closeAlert();
    }, 2500);
  }

  saveEnableDisable(isDisabled) {
    if (this.activeTab === 'systemDetails' || this.activeTab === 'SystemEdgesuits') {
      this.saveDisabled = isDisabled;
    } else {
      this.saveDisabled = false
    }

  }

  serviceDetails(data) {
    //this.servicedisable = data;
  }
  getScopes() {
    let scopes = this.sso.getScopes();
    let hasWrite = false;
    scopes['cloud.rbac.foundation.systems'] = scopes['cloud.rbac.foundation.systems'] ? scopes['cloud.rbac.foundation.systems'] : [];
    if (scopes && (scopes['cloud.rbac.foundation.systems']) && scopes['cloud.rbac.foundation.systems'].indexOf('write') !== -1) {
      hasWrite = true;
    }
    return hasWrite;

  }
  netWorkServiceIsNotConfigured: boolean = true;
  getSubscriberServices() {
    this.servicedisable = false;
    if (!this.systemInfo?.subscriberId) {
      this.netWorkServiceIsNotConfigured = true;
      return
    };
    this.subServicesSubscription = this.service.getSubscriberServices(this.systemInfo?.subscriberId).subscribe((res: any[]) => {
      if (res) {
        res.forEach((el) => {
          if (el.activate) {
            this.servicedisable = true;
          }
        });
      }


      // this.netWorkServiceIsNotConfigured = (!res || !res?.length) ? true : false;

    },
      (err: HttpErrorResponse) => {
      })
  }

  /********************* CODE FOR NETWORK SERVICES ***************************/
  Dataplan = [];
  DataPlanitem;
  VoicePlan;
  VoicePlanitem;
  VideoPlan;
  VideoPlanitem;
  parallelReqSub;
  combineLat;
  defaultServices: any = {};
  subscriberInfo;
  subscriberImpacted;
  from;
  serviceParams: any;
  serviceData: { data: any; data1: any; video: any; voice: any; };

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
  dataservice = {};
  dataservice1 = {}
  videoservice = {};
  VoiceService: any = {};
  createdSubcriberData: any;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  devicesList: any;
  NotCocService: any;
  devices: any;
  subsSysServiceForm: any = {
    subscriber: {

    },
    services: {

    },
    edgeSuites: {

    },
    systems: []

  }
  removedOntPortValues = [];
  getServiceForm(form){
    this.serviceForm = form;
  }
  serviceForm:FormGroup;
  getAllSubsServicesData(onSave?, value?) {
    //debugger
    if (!this.subscriberInfo || !this.subscriberInfo?.subscriberId) {
      this.subscriberInfo = {};
      this.subscriberInfo['subscriberId'] = this.createdSubscriberId ? this.createdSubscriberId : this.createdSubcriberData?._id ? this.createdSubcriberData._id : this.systemInfo.subscriberId ? this.systemInfo.subscriberId : '';
    }
    this.dataservice = {};
    this.dataservice1 = {}
    this.videoservice = {};
    this.VoiceService = {};
    //text
    this.allSubsServicesDataSubs = this.systemService.getDetailedSubscriberServices(this.subscriberInfo.subscriberId).subscribe((res: any) => {
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        this.devicesList = res?.devices
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          if (!services[i].activate) {
            this.NotCocService = true
          }
          if (services[i].type === 'data' || services[i].type === 'DATA') {
            this.dataservice = services[i] ? services[i] : {};
            if(onSave) this.serviceForm.patchValue({data:services[i]})
          } else if (services[i].type === 'data1' || services[i].type === 'DATA1') {
            this.dataservice1 = services[i] ? services[i] : {};;
          } else if (services[i].type === 'video' || services[i].type === 'VIDEO') {
            this.videoservice = services[i] ? services[i] : {};
            if(onSave) this.serviceForm.patchValue({video:services[i]})
          } else if (services[i].type === 'voice' || services[i].type === 'VOICE') {
            this.VoiceService = services[i] ? services[i] : {};
            if(onSave) this.serviceForm.patchValue({voice:services[i]})
            this.VoiceService.voiceInterfaces = this.VoiceService.voiceInterfaces.filter(e => {
              if (e.name.includes('p')) {
                this.removedOntPortValues.push(e)
                return false;
              }
              return true;

            })

          }
        }
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
      } else {
        this.subsSysServiceForm.services = {
          data: {},
          data1: {},
          video: {},
          voice: {}
        }
        // this.disableSystem = false
        this.defaultServices = {
          data: {},
          data1: {},
          video: {},
          voice: {}

        };
      }
      //to fix: CCL-33855

      if (!onSave) {
        this.getServicesStatus();
        this.loading = false;
      } else {
        this.error = false;
        this.success = true;
        this.successInfo = 'Network Services updated successfully';
        this.loading = false;
        setTimeout(() => {
          this.success = false;

        }, 1000);
      }
      //this.subsSysServiceForm.systems = res?.devices ? res?.devices : [];

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  DialPlanitems: any;
  dialplansub: any;
  getDialPlan() {
    this.dialplansub = this.systemService.getDialPlan(this.ORG_ID).subscribe((res: any) => {
      this.DialPlanitems = res ? res : [];
      this.formOptions.DialPlanitems = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  formDataUpdate(data, key) {
    this.subsSysServiceForm[key] = data;
    console.log(JSON.parse(JSON.stringify(this.subsSysServiceForm[key])));
  }
  saveServiceData() {
  
    const paramsData = []
    const subId = this.createdSubscriberId ? this.createdSubscriberId : this.createdSubcriberData?._id ? this.createdSubcriberData._id : this.systemInfo.subscriberId ? this.systemInfo.subscriberId : '';
    //DATA PROCESS
    this.serviceParams = JSON.parse(JSON.stringify(this.subsSysServiceForm.services));
    console.log(this.serviceParams)
    // console.log("service params", this.serviceParams);
    delete this.serviceParams?.data?.isStaticHost;
    //if(this.serviceParams?.data?.interface !== 'G1') delete this.serviceParams?.data?.staticIpAddressFamily;
    this.serviceParams.data = _.pickBy(this.serviceParams.data, v => {
      return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    });
    if (!this.serviceParams?.data?.usoc) {
      this.serviceParams.data = {_id:this.serviceParams.data._id || false};
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
      this.serviceParams.video = {_id:this.serviceParams.video._id || false};
    } else {
      this.serviceParams.video.type = "video";
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
        name: this.serviceParams?.voice?.voiceInterfaces['L1'].SIP.name || 'L1',
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
        name: this.serviceParams?.voice?.voiceInterfaces['L1'].X_000631_H248.name,
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
        name: this.serviceParams?.voice?.voiceInterfaces['L2'].SIP.name || 'L2',
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
      this.serviceParams.voice = {_id:this.serviceParams.voice._id || false};
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
      this.serviceParams.voice.voiceInterfaces = voiceInterfaces ? voiceInterfaces.concat(this.removedOntPortValues) : [];
    } else {
      this.serviceParams.voice.voiceInterfaces = [];
    }
    if (!this.serviceParams.voice?.staticIpAddress) {
      delete this.serviceParams.voice?.staticNetmask;
      delete this.serviceParams.voice?.staticGateway;
    }
    this.serviceParams.voice = _.pickBy(this.serviceParams.voice, v => v !== null && v !== "");
    if(!this.serviceParams.voice.voiceInterfaces.length) delete this.serviceParams.voice.voiceInterfaces;
    const voiceparams = this.serviceParams.voice;
    paramsData.push(voiceparams);
    if (paramsData[2]?.staticIpConfigurations && !paramsData[2]?.staticIpConfigurations[0]?.staticIpAddress) {
      delete paramsData[2]?.staticIpConfigurations
    }
    let serviceData = paramsData.map((e: any) => {
      let billingData = this.allSubsServicesData?.services.find(x => x.type === e.type) || {};
      if (billingData?.customerType) {
        return Object.assign(billingData, e);
      };
      return e;
    })

    serviceData.forEach(e=>{
      if(Object.keys(e).length === 1 && !e._id) return;
      this.loading = true;
      this.systemService.saveServiceData(subId, e).subscribe((res: any) => {
        this.loading = false;
        // to check service configured or not
        if(!res){
          let type = Object.keys(this.serviceForm.value)[Object.values(this.serviceForm.value).findIndex((c:any)=> c._id === e._id)];
          this.serviceForm.get(type).patchValue({_id:''});
        }
       
        this.netWorkServiceIsNotConfigured = serviceData.every(e => Object.keys(e).length <= 1);
          this.getServicesStatus(true);
        this.getAllSubsServicesData(true);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    })
  }
  dataServicesStatus: any;
  videoServicesStatus: any;
  voiceServicesStatus: any;
  dataservices1: any;
  DataService: any;
  allSubsServicesStatusSubs: any;
  dataServicesStatus1: any;
  getServicesStatus(onSave?) {
    if (!this.subscriberInfo || !this.subscriberInfo?.subscriberId) {
      this.subscriberInfo = {};
      this.subscriberInfo['subscriberId'] = this.createdSubscriberId ? this.createdSubscriberId : this.createdSubcriberData?._id ? this.createdSubcriberData._id : this.systemInfo.subscriberId ? this.systemInfo.subscriberId : '';
      this.serviceData = {
        data: {},
        data1: {},
        video: {},
        voice: {}
      };
      if (!this.subscriberInfo['subscriberId']) return;

    }
    this.loading = true;
    this.allSubsServicesStatusSubs = this.systemService.getServicesStatus(this.subscriberInfo.subscriberId).subscribe((res: any) => {
      if(!onSave) this.netWorkServiceIsNotConfigured = true;
      if (res) {
        // if(onSave){
          if(!onSave) this.netWorkServiceIsNotConfigured = Object.values(res).every((e: any) => !e.length);
        // }

        // this.servicedisable = !this.netWorkServiceIsNotConfigured;
        if (res && res?.dataServices && res?.dataServices.length) {
          let l = res?.dataServices?.length - 1
          this.dataServicesStatus = res?.dataServices[0] ? res?.dataServices[0] : {}
        } else {
          this.dataServicesStatus = {};
        }
        if (res && res?.videoServices && res?.videoServices.length) {
          let l = res?.videoServices?.length - 1
          this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
        } else {
          this.videoServicesStatus = {};
        }
        if (res && res?.voiceServices && res?.voiceServices.length) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
        } else {
          this.voiceServicesStatus = {};
        }

      } else {
        this.DataService = {};
        this.dataservices1 = {};
        this.videoServicesStatus = {};
        this.voiceServicesStatus = {};
      }
      if (this.subsSysServiceForm?.services?.data?.usoc) {
        if (this.subsSysServiceForm?.services?.data?.usoc === this.dataServicesStatus?.serviceDefinitionName) {
          this.DataService = this.dataServicesStatus;
          this.dataservices1 = this.dataServicesStatus1
        } else if (this.subsSysServiceForm?.services?.data?.usoc !== this.dataServicesStatus?.serviceDefinitionName) {
          this.DataService = this.dataServicesStatus1;
          this.dataservices1 = this.dataServicesStatus
        }
      } else {
        this.DataService = this.dataServicesStatus;
        this.dataservices1 = this.dataServicesStatus1;
      }

      this.serviceData = {
        data: this.DataService,
        data1: this.dataservices1,
        video: this.videoServicesStatus,
        voice: this.voiceServicesStatus
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.DataService = {};
      this.dataservices1 = {};
      this.videoServicesStatus = {};
      this.voiceServicesStatus = {};
      this.serviceData = {
        data: {},
        data1: {},
        video: {},
        voice: {}
      }
      this.loading = false;
    })
  };
  disableService: boolean = true;
  // disable(data) {
  //   if (data) {
  //     this.disableService = true;
  //   } else {
  //     this.disableService = true;
  //   }
  // }
}
