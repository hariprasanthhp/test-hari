import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, OnChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcessModifiers, CheckScopes, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { AddSubscriberService } from '../add-subscriber.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import _ from 'lodash';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';

@Component({
  selector: 'app-add-edge-suites',
  templateUrl: './add-edge-suites.component.html',
  styleUrls: ['./add-edge-suites.component.scss']
})
export class AddEdgeSuitesComponent implements OnInit {
  language;
  languageSubject;

  @Input() EdgeSuites;
  @Input() AllFormData;
  @Input() systemInfo;
  @Input() createdSubscriberId
  @Input() createdSubcriberData
  @Input() devicesList;
  @Input() deviceData;
  @Input() allowSmallBiz
  @Input() arloEntitleEnable;
  @Input() ProductIQEntitleEnable;
  @Input() ExpIQEntitleEnable;
  @Input() ProAndExpIQEntitleEnable;
  @Input() ServifyEnableentitlement;
  @Input() ServifyPlatinumentitlement;
  @Input() ServifySilverentitlement;
  @Input() ServifyGoldentitlement;
  @Input() arloUnlimitedplusentitlement;
  @Input() arloUnlimitedentitlement
  @Input() Bark_Premiumentitlement;
  @Input() Bark_Juniorentitlement;
  @Input() smallBizIQentitlement;
  @Input() subscriberData;
  @Input() IQSuiteDevice;
  @Input() IQSuiteShow;
  @Input() IQ_SuiteEnable;
  @Input() subsSysServiceForm;
  @Input() formOptions;
  @Input() systemDetails;
  @Input() deviceInfoData;
  @Output() private Out_EdgeSuites: EventEmitter<any> = new EventEmitter();
  @Output() private allFormData: EventEmitter<any> = new EventEmitter();
  @Output() private out_edge_suits_submit: EventEmitter<any> = new EventEmitter();
  @ViewChild('cancelArloSecureModal', { static: true }) private cancelArloSecureModal: TemplateRef<any>;
  @ViewChild('cancelServifyModal', { static: true }) private cancelServifyModal: TemplateRef<any>;
  @ViewChild('removeCameraModal', { static: true }) private removeCameraModal: TemplateRef<any>;
  @ViewChild('cancelBarkModal', { static: true }) private cancelBarkModal: TemplateRef<any>;
  @Input() myCommunityIQEntitlement;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    ordering: false,
    dom: 'tipr',
    pageLength: 5,
    destroy: true,
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtInstance: Promise<DataTables.Api>;

  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger: Subject<any>[] = [];
  twoKPlanData: any = [];
  fourKPlanData: any = [];


  edgeSuiteForm: FormGroup;
  enablesmallBiz: boolean;
  BarkEnable: boolean = false;
  enable_toggle: boolean = false;
  test1: boolean = true;
  sample_check1: boolean = false;
  servifyDisable: boolean = false;
  enableToggle: boolean = false;
  test: boolean = true;
  sampleCheck: boolean = false;
  emailmsg: string;
  submitted: boolean;
  arloEnabled: boolean = false;
  servyEnabled: any;
  ArloDisable: boolean = false;
  error: boolean;
  success: boolean;
  errorInfo: any;
  successInfo: any;
  servifyenabled: boolean = false;
  is2KChecked: boolean;
  is4KChecked: boolean;
  emailDisabled: boolean;
  loading: boolean;
  ArloData: any;
  devices: any = [];
  k2Cameras: any;
  deviceType: any;
  deviceId: any;
  modelId: any;
  k4Cameras: any;
  isTableRenderedOnce: boolean;
  frTable: any;
  tableDataAvailable: boolean;
  modalRef: any;
  isModalError: boolean = false;
  modalWarningMessage: string;
  modalLoader: boolean = false;
  removeConfirmMsg: string;
  removeCameraInfo: any;
  arloLoading: boolean;
  arloError: boolean;
  arloErrorInfo: any;
  arloSmartListSubs: any;
  showArlo: boolean;
  showArloEnablingError: boolean;
  arlovalue: any = {
    '2kCameras': true,
    '4kCameras': true,
  };
  arlo2kcameraError: boolean = false;
  arlo4kcameraError: boolean = false;
  warningArlomessage: boolean;
  arlodelete: boolean;
  arlocamera: any = {
    '2kCameras': true,
    '4kCameras': true,
  };
  arlo2kplanError: boolean = false;
  arlo4kplanError: boolean;
  showwarning: boolean = false;
  deviceInfosub: any;
  opMode: any;
  iqsuitDisable: boolean = false;
  ORG_ID: any;
  system: any;
  scopeFlag: any = { arlo: false, iqsuits: false };
  productIqEnable: boolean;
  ExpIQEnable: boolean;
  isDisabled: boolean;

  experianceIQDisabled: boolean = false;
  protectIQDisabled: boolean = false;
  experianceIqPrevEnableState: boolean;
  protectIqPrevEnableState: boolean;

  systemDataAvail: boolean;
  getAllSubscriberActiveSys: any;
  getAllSystemsSubs: any;
  //IQSuiteDevice: any = {};
  allSystemsReceived: boolean;
  edgeSuitsUpdateSubs: any;
  ArloTitle = "Arlo Secure Plan";
  cancelloading: boolean;
  array: any;
  cancelcode: string;
  submittedcancelcode: boolean;
  zipMsg: string;
  ziperr: boolean;
  HOSTDATA: any;
  stateItem: any;
  emailmsgarlo: string;
  PostalMsg: string;
  esTable: any;
  emailbarkmsg: string;
  status: any;
  dev: boolean;
  barkEmailError: boolean;
  enablesmallBizStatus: boolean = false;
  sbIStatusClass: string;
  sbIStatusMsg: string;
  sbIStatusImg: string;
  sbIstatus: string;
  enablePlan: boolean = true;
  sbIStatus: string;
  CAUser: boolean = false;


  rgStatus: any;
  rgStatusImg: any;
  rgStatusMsg: string;
  rgStatusClass: string;
  enableStatus: Boolean = false;
  enableRefresh: Boolean = false;
  BspProvidersub: any;
  bspInfermationSubmitted: string;
  noEmailAlert: boolean;
  refresh: boolean = true;
  subscriberMembershipList: any = [];
  SubscriberCommunityArr: any = [];
  communityArr: any;
  rgMembershipList: any = [];
  RGrefresh: boolean = true;
  rgCommunityArr: any = [];
  deleteId: any;
  commIqEnable: boolean = true;
  lowerVersion: string;
  subscriberError: boolean = false;
  savedSystems
  passpointItem = [
    {
      name: 'Bridged',
      value: 'Bridge',
    },
    {
      name: 'Routed on HSI VLAN',
      value: 'Route',
    },
    {
      name: 'Routed on Separate VLAN',
      value: 'Policy_Route',
    }
  ];
  passpointItemdev = [
    {
      name: 'Bridged',
      value: 'Bridge',
    },
    {
      name: 'Routed on HSI VLAN',
      value: 'Route',
    }
  ];
  myCommunityIQ = {
    vlanId: true,
    // customerVlanId: true
  }
  passpointNAReason: any;
  hideStatus: boolean;
  secretEyeIcon: boolean = false;
  addBspsub: any;
  selectedCommunityList: any;
  allowRGCommunity: boolean = false;
  assignAvailablityMessage: boolean = false;
  showPasspointNAAlert: boolean = false;
  allowEduroam: boolean = false;
  CancelProcess: boolean;
  showUnder: string;
  showRadiousError: boolean;
  eduroamStatus: any;
  eduroamStatusImg: string;
  eduroamStatusMsg: string;
  eduroamStatusClass: string;
  enableeduroamStatus: boolean;
  enableeduroamRefresh: boolean;
  cancelledStatus: boolean;
  subscriptionEndDt: string;
  ClaimEligible: boolean;
  subscribedStatus: boolean;
  PlanPurchasedDt: Date;
  proExpDisable: boolean;
  errorStatusRg: any;
  errorStatusEdurom: any;
  errorStatus: any;
  PIQEIQDisable: boolean;
  showsmbNAAlert: boolean;
  smbEnable: boolean = true;
  hidesmbStatus: boolean;
  smbNAReason: any;
  constructor(private translateService: TranslateService,
    private service: FoundationManageService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private dialogService: NgbModal,
    private systemService: AddSubscriberService,
    private OrganizationApiService: OrganizationApiService,
    private dataService: DataService,
    private communityService: MycommunityIqService,
    private supportWifi: SupportWifiService,
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.ORG_ID = this.sso.getOrgId();
    this.getScopes();
  }

  checkAvailablity() {
    this.deviceInfoData.forEach(({ serialNumber, opmode,discoveredDevice
    }) => {
      if(this.opMode != 'RG' && this.opMode != 'ONT/RG')
      this.opMode = opmode;
      if (discoveredDevice && (opmode === 'RG' || opmode === 'ONT/RG')) {
        this.supportWifi.wifiAvailability(this.ORG_ID, serialNumber).subscribe((res: any) => {
          if (res && res?.passpoint) {
            this.assignAvailablityMessage = true;
            this.commIqEnable = true;
            this.hideStatus = false;
            this.showPasspointNAAlert = false;
          } else if ((res && !res?.passpoint) && !this.assignAvailablityMessage) {
            this.commIqEnable = false;
            this.hideStatus = true;
            this.passpointNAReason = res?.passpointNAReason;
            this.showPasspointNAAlert = true;
          }
          else if ((!res || res === null) && (!this.passpointNAReason && !this.assignAvailablityMessage)) {
            this.hideStatus = true;
            this.commIqEnable = false;
            this.passpointNAReason = 'Hotspot is not supported (Unknown)';
            this.showPasspointNAAlert = true;
          }if (res && res?.smb) {
            this.showsmbNAAlert = false;
            this.smbEnable = true;
            this.hidesmbStatus = false;
          } else if (res && !res?.smb) {
            this.showsmbNAAlert = true;
            this.smbEnable = false;
            this.hidesmbStatus = true;
            this.smbNAReason = res?.smbNAReason
          } else if (!res || res === null) {
            this.showsmbNAAlert = true;
            this.smbEnable = false;
            this.hidesmbStatus = true;
            this.smbNAReason = 'SmartBiz is not supported (Unknown)'
          }
        }, err => {

        })
      }

    })

  }
  ngOnInit(): void {
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.myCommunityIQEntitlement = true;
    } else {
      this.myCommunityIQEntitlement = false;
    }
    let base = `${environment.API_BASE}`;
    this.isDisabled = true;
    this.status = undefined;
    if ((base.indexOf('/dev.api.calix.ai') > -1)) {
      this.dev = true;
    } else {
      this.dev = false;
    }
    if (this.formOptions?.ArloServicePlan && this.formOptions?.ArloServicePlan?.reasons) {
      if (this.formOptions?.ArloServicePlan?.reasons?.length !== 0) {
        if (this.formOptions?.ArloServicePlan?.reasons[0].code == 'PARTNER_REGULAR_CANADA') {
          this.CAUser = true
        }
      }
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableLanguageOptions();
      this.tableDataAvailable = false;
      setTimeout(() => {
        this.tableDataAvailable = true;
      }, 500);

    })
    if (this.myCommunityIQEntitlement) {
      this.GetMicrosites();
      this.getBspProvider()
    }
    this.getHostData();
    this.removeConfirmMsg = `${this.language.removeCameraMsg()}`;
    this.edgeSuiteForm = new FormGroup({
      protectIQ: new FormGroup({
        enabled: new FormControl(false),
        subscribed: new FormControl(false),
        agentConnected: new FormControl(false),
      }),
      experienceIQ: new FormGroup({
        enabled: new FormControl(false),
        subscribed: new FormControl(false),
        agentConnected: new FormControl(false),
      }),
      arloSmart: new FormGroup({
        enabled: new FormControl(false),
        email: new FormControl(''),
        "2kCameras": new FormControl(0),
        plan: new FormControl(''),
      }),
      servifyCare: new FormGroup({
        enabled: new FormControl(false),
        email: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        planCode: new FormControl(''),
        address: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(null),
        postal: new FormControl(''),
        planPurchaseDate: new FormControl(''),
        reasonCode: new FormControl(''),
        cancelDate: new FormControl(''),
      }),
      myCommunityIQ: new FormGroup({
        subscriber: new FormGroup({
          enable: new FormControl(false),
          communities: new FormControl([]),
          communitiesDuplicate: new FormControl([])
        }),
        passpoint: new FormGroup({
          enable: new FormControl(false),
          communities: new FormControl([]),
          communitiesDuplicate: new FormControl([]),
        }),
        eduroam: new FormGroup({
          enable: new FormControl(false),
          secret: new FormControl(""),
          primaryServer: new FormControl(""),
          secondaryServer: new FormControl("")
        }),
        network: new FormGroup({
          type: new FormControl('Bridge'),
          vlanId: new FormControl(''),
          protocol: new FormControl(null),
          // customerVlanId: new FormControl(-1),

        }),
        prioritizeTraffic: new FormControl(false)
      }),
      smallBizIQ: new FormGroup({
        enable: new FormControl(false),
      }),
      bark: new FormGroup({
        enable: new FormControl(false),
        email: new FormControl(''),
        planCode: new FormControl(''),
      })

    });
    this.initialize();
    if((this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable && (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result=="succeeded")) ||(this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable && (this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result=="succeeded"))||(this.AllFormData?.edgeSuites?.smallBizIQ?.enable && (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=="succeeded")) ){
      this.proExpDisable=true
    }
    if((this.AllFormData?.edgeSuites?.smallBizIQ?.enable && (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=="succeeded")) ){
      this.PIQEIQDisable=true
    }
    if (this.AllFormData?.edgeSuites && Object.keys(this.AllFormData?.edgeSuites).length) {

      this.selectedCommunityList = this.AllFormData?.edgeSuites;
      if (this.AllFormData.edgeSuites.myCommunityIQ?.subscriber?.communities) {
        this.AllFormData.edgeSuites.myCommunityIQ.subscriber.communities = this.AllFormData.edgeSuites.myCommunityIQ.subscriber.communities.map(element => {
          if (typeof (element) == 'object') {
            return element.micrositeId
          } else { return element }
        })
      }
      if (this.AllFormData.edgeSuites.myCommunityIQ?.passpoint?.communities) {
        this.AllFormData.edgeSuites.myCommunityIQ.passpoint.communities = this.AllFormData.edgeSuites.myCommunityIQ.passpoint.communities.map(element => {
          if (typeof (element) == 'object') {
            return element.micrositeId
          } else { return element }
        })
      }

      setTimeout(() => {
        this.edgeSuiteForm.patchValue(this.AllFormData?.edgeSuites);
        if (this.edgeSuiteForm.value.arloSmart['2kCameras'] == -1) {
          this.edgeSuiteForm.patchValue({ arloSmart: { '2kCameras': 0 } });
        }
      }, 100)
    } else if (this.EdgeSuites) {
      this.edgeSuiteForm.patchValue(this.EdgeSuites);
      if (this.edgeSuiteForm.value.arloSmart['2kCameras'] == -1) {
        this.edgeSuiteForm.patchValue({ arloSmart: { '2kCameras': 0 } });
      }
    }
    //this.getAllSystems()

    this.showArlo = false;
    if (this.AllFormData?.subscriber?.subscriberLocationId) {
      this.showArlo = true;
    }
    this.noEmailAlert = (this.AllFormData?.subscriber?.email || this.systemDetails?.email) ? false : true;
    this.checkAvailablity();
    this.addValidatorTrafficConfiguration();

    if (this.edgeSuiteForm?.value?.myCommunityIQ?.eduroam?.enable) {
      this.addValidatiorEduroamGroup();
    }

    this.savedSystems = this.subsSysServiceForm?.systems?.some(element => element.saved)
  }


  /************************ *        My Community IQ Code Start          * ****************************/

  cancel() {
    this.showPasspointNAAlert = false;
    this.lowerVersion = 'close';
  }
  closeSmb(){
    this.showsmbNAAlert=false;
  }
  communityEdit() {
    this.allowRGCommunity = true;
  }
  GetMicrosites() {
    this.loading = true
    this.addBspsub = this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res.filter(x => x.status === "READY") : [];
      this.communityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.subscriberMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < this.selectedCommunityList?.myCommunityIQ?.subscriber?.communities?.length; i++) {
          if (x.id === this.selectedCommunityList?.myCommunityIQ?.subscriber?.communities[i]) {
            return true;
          }
        }
        return false;
      });
      this.rgMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < this.selectedCommunityList?.myCommunityIQ?.passpoint?.communities?.length; i++) {
          if (x.id === this.selectedCommunityList?.myCommunityIQ?.passpoint?.communities[i]) {
            return true;
          }
        }
        return false;
      });
      this.SubscriberCommunityArr = res ? (() => {
        let communityList = Object.assign([], res.filter(x => x.status === "READY"));
        for (let i = 0; i < this.subscriberMembershipList.length; i++) {
          for (let j = 0; j < communityList.length; j++) {
            if (this.subscriberMembershipList[i].id == communityList[j].id) {
              communityList.splice(j, 1);
            }
          }
        }
        return communityList;
      })() : [];
      this.SubscriberCommunityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.rgCommunityArr = res ?
        (() => {
          let communityList = Object.assign([], res.filter(x => x.status === "READY"));
          for (let i = 0; i < this.rgMembershipList.length; i++) {
            for (let j = 0; j < communityList.length; j++) {
              if (this.rgMembershipList[i].id == communityList[j].id) {
                communityList.splice(j, 1);
              }
            }
          }
          return communityList;
        })() : [];
      this.rgCommunityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.loading = false;
      this.addCommunity();
      this.addRGCommunity();
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loading = false
    })
  }
  deleteType: string;
  openCommunityDeleteModal(item, content, type) {
    this.dialogService.open(content, { size: 'md' })
    this.deleteId = item.id;
    this.deleteType = type;
  }
  addValidatorTrafficConfiguration() {
    setTimeout(() => {
      if (this.myCommunityControl.get('passpoint')?.value?.enable || this.myCommunityControl.get('eduroam')?.value?.enable) {
        if (this.myCommunityControl.get('eduroam')?.value?.enable) this.showRadiousError = false;
        this.addAndRemoveNetworkGroupValidation(this.myCommunityControl.get('network')?.value?.type);
      } else {
        this.myCommunityControl.get('network').get('type').clearValidators();
        this.myCommunityControl.get('network').get('type').updateValueAndValidity();
        this.myCommunityControl.get('network').get('vlanId').clearValidators();
        this.myCommunityControl.get('network').get('vlanId').updateValueAndValidity();
      }
      console.log(this.myCommunityControl.get('network'))
    }, 50)
  }
  lanValidate(field) {
    //debugger
    let value = this.myCommunityControl.get('network').value[field];
    this.myCommunityIQ[field] = (value == null || (value != undefined && value != 0 && value >= 1 && value <= 4093));
  }
  allowNumberOnly(event) {
    if (event.key === '-' || event.key === '.' || event.target.value.length > 3 || /[^\d]/.test(event.key)) { event.preventDefault(); }
  }
  preventPastingWrongValues(event) {
    const text = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (/^\d/.test(text) || text > 4093) event.preventDefault();
  }
  DeleteMicrosite(modal) {
    let deleteItem: any, dropDownArr: any, formArray: any;
    if (this.deleteType == 'subscriber') {
      deleteItem = this.subscriberMembershipList;
      dropDownArr = this.SubscriberCommunityArr;
      formArray = this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communities;
      this.refresh = false;
    } else {
      deleteItem = this.rgMembershipList;
      dropDownArr = this.rgCommunityArr;
      formArray = this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communities;
      this.RGrefresh = false;
    }
    for (let i = 0; i < deleteItem.length; i++) {
      if (deleteItem[i].id == this.deleteId) {
        dropDownArr.push(deleteItem[i]);
        deleteItem.splice(i, 1);
      }
    }
    formArray = formArray.filter((element) => {
      return element != this.deleteId
    });
    if (this.deleteType == 'subscriber') {
      setTimeout(() => {
        this.refresh = true;
      });
      this.myCommunityControl.get('subscriber').patchValue({
        communities: formArray
      });
      this.SubscriberCommunityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
    } else {
      setTimeout(() => {
        this.RGrefresh = true;
      })
      this.myCommunityControl.get('passpoint').patchValue({
        communities: formArray
      });
      this.rgCommunityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
    }
    modal.dismiss();
  }

  addCommunity() {
    this.refresh = false;
    for (let i = 0; i < this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate.length; i++) {
      if (!this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communities.includes(this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i])) {
        this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communities.push(this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i]);

      }
      for (let j = 0; j < this.SubscriberCommunityArr.length; j++) {
        if (this.edgeSuiteForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i] == this.SubscriberCommunityArr[j].id) {
          this.SubscriberCommunityArr.splice(j, 1);
        }
      }
    }
    let data = this.edgeSuiteForm.value.myCommunityIQ?.subscriber;
    setTimeout(() => {
      this.refresh = true;
    })

    setTimeout(() => {

      this.edgeSuiteForm.get('myCommunityIQ').get('subscriber').patchValue({
        communitiesDuplicate: []
      })
      this.subscriberMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < data.communities.length; i++) {
          if (x.id === data.communities[i]) {
            return true;
          }
        }
        return false;
      });
    }, 100);

  }
  addRGCommunity() {
    this.RGrefresh = false;
    for (let i = 0; i < this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate.length; i++) {
      if (!this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communities.includes(this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i])) {
        this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communities.push(this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i])
      }
      for (let j = 0; j < this.rgCommunityArr.length; j++) {
        if (this.edgeSuiteForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i] == this.rgCommunityArr[j].id) {
          this.rgCommunityArr.splice(j, 1);
        }
      }
    }

    setTimeout(() => {
      this.RGrefresh = true;
    })
    let data = this.edgeSuiteForm.value.myCommunityIQ?.passpoint;
    setTimeout(() => {
      this.edgeSuiteForm.get('myCommunityIQ').get('passpoint').patchValue({
        communitiesDuplicate: []
      })
      this.rgMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < data.communities.length; i++) {
          if (x.id === data.communities[i]) {
            return true;
          }
        }
        return false;
      });
    }, 100)
  }
  addAndRemoveNetworkGroupValidation(event) {
    if (event == 'Bridge') {
      this.myCommunityControl.get('network').get('vlanId').addValidators(Validators.required);
      this.myCommunityControl.get('network').get('vlanId').updateValueAndValidity();
      this.myCommunityControl.get('network').get('protocol').clearValidators();
      this.myCommunityControl.get('network').get('protocol').updateValueAndValidity();
    } else if (event == 'Policy_Route') {
      this.myCommunityControl.get('network').get('vlanId').addValidators(Validators.required);
      this.myCommunityControl.get('network').get('vlanId').updateValueAndValidity();
      this.myCommunityControl.get('network').get('protocol').addValidators(Validators.required);
      this.myCommunityControl.get('network').get('protocol').updateValueAndValidity();
    } else {
      this.myCommunityControl.get('network').get('vlanId').clearValidators();
      this.myCommunityControl.get('network').get('vlanId').updateValueAndValidity();
      this.myCommunityControl.get('network').get('protocol').clearValidators();
      this.myCommunityControl.get('network').get('protocol').updateValueAndValidity();
      this.myCommunityIQ.vlanId = true;
    }
  }
  addValidatiorEduroamGroup() {
    this.allowEduroam = true;
    this.myCommunityControl.get('eduroam').get('secret').addValidators(Validators.required);
    this.myCommunityControl.get('eduroam').get('primaryServer').addValidators(Validators.pattern(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/))
    this.myCommunityControl.get('eduroam').get('primaryServer').addValidators(Validators.required);
    this.myCommunityControl.get('eduroam').get('secret').updateValueAndValidity();
    this.myCommunityControl.get('eduroam').get('primaryServer').updateValueAndValidity();
  }
  removeValidatiorEduroamGroup() {
    this.allowEduroam = true;
    this.myCommunityControl.get('eduroam').get('secret').clearValidators();
    this.myCommunityControl.get('eduroam').get('secret').updateValueAndValidity();
    this.myCommunityControl.get('eduroam').get('primaryServer').clearValidators();
    this.myCommunityControl.get('eduroam').get('primaryServer').updateValueAndValidity();
  }
  addValidatorForSecondaryServer() {
    if (this.myCommunityControl.get('eduroam').get('secondaryServer').value) {
      this.myCommunityControl.get('eduroam').get('secondaryServer').addValidators(Validators.pattern(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/))
      this.myCommunityControl.get('eduroam').get('secondaryServer').updateValueAndValidity();
    } else {
      this.myCommunityControl.get('eduroam').get('secondaryServer').clearValidators();
      this.myCommunityControl.get('eduroam').get('secondaryServer').updateValueAndValidity();
    }
  }

  getBspProvider() {
    this.BspProvidersub = this.communityService.GetBspproviderInfo().subscribe((res: any) => { this.bspInfermationSubmitted = 'submitted' }, err => { this.bspInfermationSubmitted = 'notSubmitted' });
  }

  radiousServerShoudNotMatchValidation(show?) {
    if (show) {
      this.showUnder = show;
    }

    this.showRadiousError = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(this.myCommunityControl?.value?.eduroam?.secondaryServer) && (this.myCommunityControl?.value?.eduroam?.secondaryServer == this.myCommunityControl?.value?.eduroam?.primaryServer)
  }

  getPasspointStatus() {
    this.rgStatus = (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result : '';
    this.errorStatusRg= (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.error) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.error : '';
    if (this.rgStatus) {
      if (this.rgStatus == 'pending' && this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.rgStatusMsg = 'Activation_in_Progress';
        this.rgStatusClass = 'activation-progress';
        this.enableStatus = true;
        this.enableRefresh = true;
      } else if (this.rgStatus == 'pending' && !this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.rgStatusMsg = 'Deactivation_in_Progress';
        this.rgStatusClass = 'activation-progress';
        this.enableStatus = true;
        this.enableRefresh = true;
      } else if (this.rgStatus == "succeeded" && this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.rgStatusMsg = 'Hotspot_has_been_activated';
        this.rgStatusClass = 'success-message-info';
        this.enableStatus = true;
        this.enableRefresh = false;
      } else if (this.rgStatus == "succeeded" && !this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.rgStatusMsg = 'Hotspot_has_been_deactivated';
        this.rgStatusClass = 'success-message-info';
        this.enableStatus = true;
        this.enableRefresh = false;
      } else if (this.rgStatus == "failed" && this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.rgStatusMsg = 'Hotspot_has_failed_to_activate';
        this.rgStatusClass = 'error-message-info';
        this.enableStatus = true;
        this.enableRefresh = false;
      } else if (this.rgStatus == "failed" && !this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable) {
        this.rgStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.rgStatusMsg = 'Hotspot_has_failed_to_deactivate';
        this.rgStatusClass = 'error-message-info';
        this.enableStatus = true;
        this.enableRefresh = false;
      }
      // setTimeout(() => {
      //   if (this.enableRefresh) {
      //     this.myCommunityControl.get('passpoint').disable();
      //   } else {
      //     this.myCommunityControl.get('passpoint').enable();
      //   }
      // }, 1000)
    }
  }
  refreshValues() {
    this.edgeSuiteForm.patchValue({ myCommunityIQ: { passpoint: { network: { vlanId: '' } } } });
  }
  get myCommunityControl() {
    return this.edgeSuiteForm.get('myCommunityIQ') as FormGroup;
  }
  refreshRGstatus() {
    this.loading = true;
    this.service.getPasspointcocStatus(this.ORG_ID, this.createdSubscriberId).subscribe((res: any) => {
      if(this.AllFormData.edgeSuites.myCommunityIQ?.passpoint){
        this.AllFormData.edgeSuites.myCommunityIQ.passpoint.status.result = res?.passpoint?.status?.result;
      }
      if(this.AllFormData.edgeSuites.myCommunityIQ?.eduroam){
        this.AllFormData.edgeSuites.myCommunityIQ.eduroam.status.result = res?.eduroam?.status?.result;
      }
      this.loading = false;
      this.getPasspointStatus();
      this.geteduroamStatus()
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }


  /************************ *        My Community IQ Code Start          * ****************************/



  NewPlanCode(value) {
    return value === 'SERVIFYCAREPLATINUM' ? 'Platinum ' : value === 'SERVIFYCAREBRONZE' ? 'Bronze ' : value === 'SERVIFYCAREGOLD' ? 'Gold' : value === 'SERVIFYCARESILVER' ? 'Silver' : '-';
  }
  cancelBarkService(data?) {
    if (this.AllFormData && this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.bark && this.AllFormData?.edgeSuites?.bark?.email) {
      this.modalRef = this.dialogService.open(this.cancelBarkModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.edgeSuiteForm.patchValue({
        bark: {
          enable: false,
          email: this.AllFormData?.subscriber?.email,
          planCode: ''
        }
      });
      this.BarkEnable = false;
    }
    this.closeAlert();
  }
  CancelBark() {
    this.edgeSuiteForm.patchValue({
      bark: {
        enable: false,
        email: '',
        planCode: ''
      }
    });
    let formData = Object.assign({}, this.edgeSuiteForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && this.allowSmallBiz && this.subsSysServiceForm?.systems?.length !== 0) {
    } else {
      delete formData.smallBizIQ
    }
    if (formData.arloSmart.enabled && !formData.arloSmart.email) {
      return;
    } else if (formData.arloSmart.enabled && formData.arloSmart.email && !(this.commonOrgService.validateEmail(formData.arloSmart.email))) {
      return;
    }

    let params: any = {
      protectIQ: {},
      experienceIQ: {},
      bark: {},
      smallBizIQ: {},
      myCommunityIQ: formData.myCommunityIQ
    };
    if (formData.smallBizIQ?.enable) {
      params.smallBizIQ = {
        enable: formData.smallBizIQ?.enable
      }
    } else if (formData?.smallBizIQ) {
      params.smallBizIQ = {
        enable: false
      }
    } else {
      params.smallBizIQ = {}
    }
    if (formData.bark?.enable) {
      params.bark = {
        email: formData.bark?.email,
        planCode: formData.bark?.planCode,
      }
    } else {
      params.bark = {}
    }

    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }

    if (formData.arloSmart.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData.servifyCare.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
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
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (this.enableRefresh || (this.bspInfermationSubmitted == 'notSubmitted' || this.bspInfermationSubmitted == 'closed') || !this.commIqEnable) {
      delete formData?.myCommunityIQ?.passpoint
    }
    if(!((!this.opMode || this.opMode === 'RG' || this.opMode === 'ONT/RG') && this.savedSystems)){
      delete formData?.myCommunityIQ?.passpoint;
      delete formData?.myCommunityIQ?.network;
      delete formData?.myCommunityIQ?.eduroam;
      delete formData?.myCommunityIQ?.prioritizeTraffic;
    }
    if (params.myCommunityIQ?.network?.type == 'Bridge') {
      delete params.myCommunityIQ?.network?.protocol;
    } else if (params.myCommunityIQ?.network?.type !== 'Policy_Route') {
      delete params.myCommunityIQ?.network?.protocol;
      delete params.myCommunityIQ?.network?.vlanId;
    }
    if (params.myCommunityIQ?.eduroam && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.eduroam?.primaryServer;
      delete params.myCommunityIQ?.eduroam?.secret;
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
    }
    if (params.myCommunityIQ?.network?.type == null) delete params.myCommunityIQ?.network?.type;
    if (params.myCommunityIQ?.network?.vlanId == '') delete params.myCommunityIQ?.network?.vlanId;
    if (params.myCommunityIQ?.network?.protocol == '') delete params.myCommunityIQ?.network?.protocol;
    if (!params.myCommunityIQ?.passpoint) {
      delete params.myCommunityIQ?.passpoint;
    } else if (!params.myCommunityIQ?.passpoint?.enable) {
      delete params.myCommunityIQ?.passpoint?.communities;
    }
    if (!params.myCommunityIQ?.passpoint?.enable && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.network;
      delete params.myCommunityIQ?.prioritizeTraffic;
    }
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete params.servifyCare
    }
    this.closeAlert();
    this.cancelloading = true;
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsDataCOC(this.ORG_ID, this.createdSubscriberId, params).subscribe((res: any) => {
      this.BarkEnable = false;
      this.edgeSuiteForm.patchValue({
        bark: {
          enable: false,
          email: this.AllFormData?.subscriber?.email,
          planCode: ''
        }
      });
      let msg = "Bark Plan Data Removed successfully";
      this.showSuccessMessage(this.language[msg]);
      this.getSyetemsAllData();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false
    })
    //this.Out_sys_EdgeSuites.emit(this.edgeSuiteForm.value);
  }
  BarkEnableDisable() {
    this.submitted = false;
    this.BarkEnable = !this.BarkEnable;
    this.edgeSuiteForm.patchValue({ bark: { enable: true } })
    this.formValueChanges();
    if (this.BarkEnable) {
      if ((this.AllFormData?.subscriber || this.createdSubcriberData) && !this.AllFormData?.edgeSuites?.bark) {

        this.edgeSuiteForm.patchValue({
          bark: {
            enable: true,
            email: this.subscriberData?.email,
          }
        });
      }
    } else {
    }
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value);
  }
  geteduroamStatus() {
    this.eduroamStatus = (this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result : '';
    this.errorStatusEdurom=(this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.error) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.error : '';
    if (this.eduroamStatus) {
      if (this.eduroamStatus == 'pending' && this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.eduroamStatusMsg = 'Enable in progress';
        this.eduroamStatusClass = 'activation-progress';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = true;
      } else if (this.eduroamStatus == 'pending' && !this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.eduroamStatusMsg = 'Disable in progress';
        this.eduroamStatusClass = 'activation-progress';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = true;
      } else if (this.eduroamStatus == "succeeded" && this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.eduroamStatusMsg = 'Eduroam_has_been_activated';
        this.eduroamStatusClass = 'success-message-info';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = false;
      } else if (this.eduroamStatus == "succeeded" && !this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.eduroamStatusMsg = 'Eduroam_has_been_deactivated';
        this.eduroamStatusClass = 'success-message-info';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = false;
      } else if (this.eduroamStatus == "failed" && this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.eduroamStatusMsg = 'Eduroam_has_failed_to_activate';
        this.eduroamStatusClass = 'error-message-info';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = false;
      } else if (this.eduroamStatus == "failed" && !this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) {
        this.eduroamStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.eduroamStatusMsg = 'Eduroam_has_failed_to_deactivate';
        this.eduroamStatusClass = 'error-message-info';
        this.enableeduroamStatus = true;
        this.enableeduroamRefresh = false;
      }

    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.AllFormData && changes.AllFormData.currentValue) {
      this.AllFormData = changes.AllFormData.currentValue;
      this.getSmallBizStatus()
      this.getPasspointStatus()
      this.geteduroamStatus()
    }
    if (this.AllFormData?.subscriber?.subscriberLocationId) {
    }

    if (this.IQSuiteDevice && Object.keys(this.IQSuiteDevice).length) {
      if (this.EdgeSuites?.protectIQ?.subscribed && (this.IQSuiteDevice?.device && Object.keys(this.IQSuiteDevice?.device).length) && this.AllFormData?.edgeSuites?.protectIQ?.subscribed && (this.EdgeSuites.protectIQ?.agentConnected == undefined || this.EdgeSuites?.protectIQ?.agentConnected)) {
        this.protectIQDisabled = false;
      } else {
        this.protectIQDisabled = true;
      }
      if (this.EdgeSuites?.experienceIQ?.subscribed && (this.IQSuiteDevice?.device && Object.keys(this.IQSuiteDevice?.device).length) && this.AllFormData?.edgeSuites?.experienceIQ?.subscribed && (this.EdgeSuites.protectIQ?.agentConnected == undefined || this.EdgeSuites?.experienceIQ?.agentConnected)) {
        this.experianceIQDisabled = false;
      } else {
        this.experianceIQDisabled = true;
      }
    } else {
      this.experianceIQDisabled = true;
      this.protectIQDisabled = true;
    }



  }

  initialize() {
    this.initializeEdgeSuits();
    this.initializeArloSmarts();
    this.initializeServyCare();
    this.initializeBark();
    this.initializeSmallBiz();

  }
  initializeSmallBiz() {
    if (this.AllFormData?.edgeSuites?.smallBizIQ && this.EdgeSuites && this.EdgeSuites?.smallBizIQ && this.EdgeSuites?.smallBizIQ?.enable) {
      this.edgeSuiteForm.patchValue({
        smallBizIQ: {
          enable: true,
        }
      });
    } else {
      this.edgeSuiteForm.patchValue({
        smallBizIQ: {
          enable: false,
        }
      });
    }
  }
  initializeBark() {
    if (this.AllFormData?.edgeSuites?.bark && this.EdgeSuites && this.EdgeSuites.bark && this.EdgeSuites.bark.email) {
      this.BarkEnable = true
      this.edgeSuiteForm.patchValue({
        bark: {
          enable: true,
          email: this.EdgeSuites.bark.email,
          planCode: this.EdgeSuites.bark.planCode,
        }
      });
    } else {
      this.edgeSuiteForm.patchValue({
        bark: {
          enable: false,
          email: this.subscriberData?.email,
          planCode: '',
        }
      });
    }
  }
  planChange(value) {
    this.edgeSuiteForm.get('arloSmart').patchValue({
      '2kCameras': 0
    })
    this.ArloTitle = (value.includes('PARTNER_REGULAR')) ? "Arlo Secure Plan" : (value.includes('PARTNER_UNLIMITED')) ? 'Arlo Secure Unlimited Plan' : 'Arlo Secure Unlimited Plus Plan'
  }
  initializeEdgeSuits() {

    if (this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.protectIQ) {
      this.protectIqPrevEnableState = this.AllFormData?.edgeSuites?.protectIQ?.enabled ? true : false;
    }
    if (this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.experienceIQ) {
      this.experianceIqPrevEnableState = this.AllFormData?.edgeSuites?.experienceIQ?.enabled;
    }


    if (this.AllFormData?.edgeSuites && Object.keys(this.AllFormData?.edgeSuites).length) {
      this.edgeSuiteForm.patchValue(this.AllFormData?.edgeSuites);
    } else if (this.EdgeSuites) {
      this.edgeSuiteForm.patchValue(this.EdgeSuites);
    }
  }

  initializeArloSmarts() {
    if (this.subscriberData?.email) {
      this.edgeSuiteForm.patchValue({ arloSmart: { email: this.subscriberData?.email } });
    }
    if (this.AllFormData?.edgeSuites && Object.keys(this.AllFormData?.edgeSuites).length && this.AllFormData?.edgeSuites?.arloSmart && this.AllFormData?.edgeSuites?.arloSmart.email) {
      this.ArloDisable = true;
      this.arloEnabled = true;

      let value = this.EdgeSuites.arloSmart?.plan;
      this.ArloTitle = (value.includes('PARTNER_REGULAR')) ? "Arlo Secure Plan" : (value.includes('PARTNER_UNLIMITED')) ? 'Arlo Secure Unlimited Plan' : 'Arlo Secure Unlimited Plus Plan'
      this.edgeSuiteForm.patchValue({ arloSmart: { enabled: this.arloEnabled, plan: this.EdgeSuites.arloSmart?.plan, '2kCameras': this.EdgeSuites.arloSmart['2kCameras'] } });
      if (!this.EdgeSuites.arloSmart?.plan.includes('PARTNER_REGULAR')) {
        this.edgeSuiteForm.patchValue({ arloSmart: { '2kCameras': '' } });
      }
      if (this.EdgeSuites.arloSmart['2kCameras']) {
        this.is2KChecked = true;
      }

      if (this.EdgeSuites.arloSmart['4kCameras']) {
        this.is4KChecked = true;
      }

      if (this.AllFormData && this.AllFormData.edgeSuites && this.AllFormData.edgeSuites.arloSmart && this.AllFormData.edgeSuites.arloSmart.email) {
        this.edgeSuiteForm.patchValue({ arloSmart: { email: this.AllFormData.edgeSuites.arloSmart.email ? this.AllFormData.edgeSuites.arloSmart.email : this.EdgeSuites.arloSmart?.email } });
        this.emailDisabled = true;
      }
    } else {
      this.arloEnabled = false;
      this.ArloDisable = false;
    }

    if (this.AllFormData?.edgeSuites?.arloSmart?.userId) {
      this.GetArlosmart();
    } else {
      this.loadArloTables();
    }

  }


  cancelArloSecure(data?) {
    if (this.AllFormData && this.AllFormData.edgeSuites && this.AllFormData.edgeSuites.arloSmart && this.AllFormData.edgeSuites.arloSmart.email) {
      this.modalRef = this.dialogService.open(this.cancelArloSecureModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {

      this.edgeSuiteForm.patchValue({ arloSmart: { enabled: false, email: this.AllFormData?.subscriber?.email, '2kCameras': 0, plan: '' } })
      this.arloEnabled = false;
    }
    this.closeAlert();

    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
  }

  Cancelarlo() {
    this.edgeSuiteForm.patchValue({ arloSmart: { enabled: false, email: '', '2kCameras': 0, plan: '' } });
    let formData = Object.assign({}, this.edgeSuiteForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && this.allowSmallBiz && this.subsSysServiceForm?.systems?.length !== 0) {
    } else {
      delete formData.smallBizIQ
    }
    if (formData.arloSmart.enabled && !formData.arloSmart.email) {
      return;
    } else if (formData.arloSmart.enabled && formData.arloSmart.email && !(this.commonOrgService.validateEmail(formData.arloSmart.email))) {
      return;
    }

    let params: any = {
      protectIQ: {},
      experienceIQ: {},
      bark: {},
      smallBizIQ: {},
      myCommunityIQ: formData.myCommunityIQ
    };
    if (formData.smallBizIQ?.enable) {
      params.smallBizIQ = {
        enable: formData.smallBizIQ?.enable
      }
    } else if (formData?.smallBizIQ) {
      params.smallBizIQ = {
        enable: false
      }
    } else {
      params.smallBizIQ = {}
    }
    if (formData.bark?.enable) {
      params.bark = {
        email: formData.bark?.email,
        planCode: formData.bark?.planCode,
      }
    } else {
      params.bark = {}
    }

    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }

    if (formData.arloSmart.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData.servifyCare.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
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
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (this.enableRefresh || (this.bspInfermationSubmitted == 'notSubmitted' || this.bspInfermationSubmitted == 'closed') || !this.commIqEnable) {
      delete formData?.myCommunityIQ?.passpoint
    }
    if(!((!this.opMode || this.opMode === 'RG' || this.opMode === 'ONT/RG' ) && this.savedSystems)){
      delete formData?.myCommunityIQ?.passpoint;
      delete formData?.myCommunityIQ?.network;
      delete formData?.myCommunityIQ?.eduroam;
      delete formData?.myCommunityIQ?.prioritizeTraffic;
    }
    if (params.myCommunityIQ?.network?.type == 'Bridge') {
      delete params.myCommunityIQ?.network?.protocol;
    } else if (params.myCommunityIQ?.network?.type !== 'Policy_Route') {
      delete params.myCommunityIQ?.network?.protocol;
      delete params.myCommunityIQ?.network?.vlanId;
    }
    if (params.myCommunityIQ?.eduroam && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.eduroam?.primaryServer;
      delete params.myCommunityIQ?.eduroam?.secret;
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
    }
    if (params.myCommunityIQ?.network?.type == null) delete params.myCommunityIQ?.network?.type;
    if (params.myCommunityIQ?.network?.vlanId == '') delete params.myCommunityIQ?.network?.vlanId;
    if (params.myCommunityIQ?.network?.protocol == '') delete params.myCommunityIQ?.network?.protocol;
    if (!params.myCommunityIQ?.passpoint) {
      delete params.myCommunityIQ?.passpoint;
    } else if (!params.myCommunityIQ?.passpoint?.enable) {
      delete params.myCommunityIQ?.passpoint?.communities;
    }
    if (!params.myCommunityIQ?.passpoint?.enable && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.network;
      delete params.myCommunityIQ?.prioritizeTraffic;
    }
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete params.servifyCare
    }
    this.closeAlert();
    this.cancelloading = true;
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsDataCOC(this.ORG_ID, this.createdSubscriberId, params).subscribe((res: any) => {
      this.arloEnabled = false;
      this.is2KChecked = false;
      this.emailDisabled = false;
      this.edgeSuiteForm.patchValue({ arloSmart: { enabled: false, email: '', '2kCameras': 0, plan: '' } });
      let msg = "Arlo Secure Plan Data Removed successfully";
      this.showSuccessMessage(this.language[msg]);
      this.getSyetemsAllData();
      this.ArloDisable = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false
    })
  }
  getSyetemsAllData() {
    this.service.getedgesuiteData(this.ORG_ID, this.createdSubscriberId, true).subscribe((res: any) => {
      if (res) {
        this.AllFormData = res ? res : {};
      }
      this.allFormData.emit(this.AllFormData);
      if (this.AllFormData?.edgeSuites?.servifyCare) {
        this.servifyenabled = true
        this.CancelProcess = true
        this.servifyDisable = true
        this.edgeSuiteForm.patchValue({
          servifyCare: {
            enabled: true,
            email: this.AllFormData?.edgeSuites?.servifyCare?.email,
            firstName: this.AllFormData?.edgeSuites?.servifyCare?.firstName,
            lastName: this.AllFormData?.edgeSuites?.servifyCare?.lastName,
            planCode: this.AllFormData?.edgeSuites?.servifyCare?.planCode,
            address: this.AllFormData?.edgeSuites?.servifyCare?.address,
            city: this.AllFormData?.edgeSuites?.servifyCare?.city,
            state: this.AllFormData?.edgeSuites?.servifyCare?.state,
            postal: this.AllFormData?.edgeSuites?.servifyCare?.postal,
          }
        });
      } else {
        let name = this.AllFormData?.subscriber?.name.split(/(\s+)/);
        let firstName = name[0];
        this.array = name.shift();
        let lastName = name.join("");
        this.edgeSuiteForm.patchValue({
          servifyCare: {
            enabled: false,
            email: this.AllFormData?.subscriber?.email,
            firstName: firstName,
            lastName: lastName.trim(),
            planCode: '',
            address: this.AllFormData?.subscriber?.serviceAddress,
            city: '',
            state: null,
            postal: '',
          }
        });
      }
      this.status = this.AllFormData?.edgeSuites?.servifyCare?.planChange
      if(this.AllFormData?.edgeSuites?.servifyCare?.email){
        let PlanPurchasedDate=this.AllFormData?.edgeSuites?.servifyCare?.planPurchaseDate
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
        let todayDate = new Date().toJSON().slice(0,10);
        let cancelDtSplit : any
        let todayDateSplit : any = todayDate.split("-");
        let PlanPurchasedDtSplit : any =PlanPurchasedDate.split("-");
        if(PlanPurchasedDtSplit){
          this.PlanPurchasedDt = new Date(PlanPurchasedDtSplit[0], parseInt(PlanPurchasedDtSplit[1])-1, PlanPurchasedDtSplit[2]);
        }
        let check = new Date(todayDateSplit[0], parseInt(todayDateSplit[1])-1, todayDateSplit[2]);
    
        let monthset
        let from : any;
    
        let thisMonth
        let to
        let cancelDate =this.AllFormData?.edgeSuites?.servifyCare?.cancelDate
        if(cancelDate) {
         cancelDtSplit = cancelDate.split("-");    
         monthset = cancelDtSplit[1]
         from = new Date(cancelDtSplit[0], parseInt(cancelDtSplit[1])-1, cancelDtSplit[2]);  // -1 because months are from 0 to 11
         let PreviousDate = PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
         let mm = this.monthDiff(this.PlanPurchasedDt, check)
         this.PlanPurchasedDt.setDate(this.PlanPurchasedDt.getDate() -1)
         this.PlanPurchasedDt.setMonth(this.PlanPurchasedDt.getMonth() + mm)
         let mmset = check.getTime() > this.PlanPurchasedDt.getTime() ? 1 : 0
         this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
         let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
         to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
         /********** Claim eligible(for Cancellation) **********/
         if(ExactDays > 30)
         {
         if(check >= from && check <= to) {
           this.ClaimEligible = true
         }
         else
         {
           this.ClaimEligible = false
         }
         }
         else
         {
           this.subscribedStatus = false
           this.ClaimEligible = false
           this.subscriptionEndDt = cancelDate;
           let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
           to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
         }
         }
         else
         {
           thisMonth = StartDate.getMonth()+1;
           monthset = thisMonth
           /********** For setting Subscription end date **********/
    
           if(todayDateSplit[2] >= PlanPurchasedDtSplit[2])
           {
             let PreviousDate = PlanPurchasedDtSplit[2] - 1;
             let nextMonth = StartDate.getMonth()+2;
             this.subscriptionEndDt = currentYear + "-" + nextMonth + "-" + PreviousDate;
             let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
             to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
             //console.log(this.subscriptionEndDt);
             
           }
           else
           {
             let PreviousDate = PlanPurchasedDtSplit[2] - 1;
             this.subscriptionEndDt = currentYear + "-" + monthset + "-" + PreviousDate;
             let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
             to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
             //console.log(this.subscriptionEndDt);
             
           }
           /********** Claim eligible(Not for Cancellation) **********/
           if(ExactDays > 30)
           {
             this.ClaimEligible = true
           }
           else
           {
             this.ClaimEligible = false
           }
         }
    
         /********** For checking subscribed or unsubscribed based on subscription end date **********/
         if(cancelDate && ExactDays < 30) {
           this.subscribedStatus = false
         }
         else if(cancelDate && ExactDays > 30) {
         if(check > to) {
           this.subscribedStatus = false
         }
         else
         {
           this.subscribedStatus = true
         }
       }
       else
       {
         this.subscribedStatus = true
       }
      }else{
        this.subscribedStatus = false
      }
      if (this.status?.status === 'accepted') {
        let date = this.compareDate(new Date)
        let effectiveDate = this.compareDate(this.status?.effective)
        var dateOne = new Date(date);
        var dateTwo = new Date(effectiveDate);
        if (dateOne >= dateTwo) {
          this.enablePlan = true
        } else {
          this.enablePlan = false
        }
      } else {
        this.enablePlan = true
      }
      this.cancelloading = false
      this.initialize();
      this.closeAllModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      this.cancelloading = false
    })
  }
  showSuccessMessage(msg: any) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2500)
  }
  formatDate(date) {
    var a = new Date(date);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'december'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var dat = a.getDate();
    var time = month + ' ' + dat + ',' + ' '+ year;
    return time;
  }
  compareDate(date) {
    var a = new Date(date);
    var year = a.getFullYear();
    var month = a.getMonth()
    var dat = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var cDate = year + '-' + month + '-' + dat + '' + hour + ':' + min + ':' + sec;
    return cDate
  }
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  initializeServyCare() {
    this.status = this.AllFormData?.edgeSuites?.servifyCare?.planChange
    if(this.AllFormData?.edgeSuites?.servifyCare?.email){
      let PlanPurchasedDate=this.AllFormData?.edgeSuites?.servifyCare?.planPurchaseDate
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
      let todayDate = new Date().toJSON().slice(0,10);
      let cancelDtSplit : any
      let todayDateSplit : any = todayDate.split("-");
      let PlanPurchasedDtSplit : any =PlanPurchasedDate.split("-");
      if(PlanPurchasedDtSplit){
        this.PlanPurchasedDt = new Date(PlanPurchasedDtSplit[0], parseInt(PlanPurchasedDtSplit[1])-1, PlanPurchasedDtSplit[2]);
      }
      let check = new Date(todayDateSplit[0], parseInt(todayDateSplit[1])-1, todayDateSplit[2]);
  
      let monthset
      let from : any;
  
      let thisMonth
      let to
      let cancelDate =this.AllFormData?.edgeSuites?.servifyCare?.cancelDate
      if(cancelDate) {
       cancelDtSplit = cancelDate.split("-");    
       monthset = cancelDtSplit[1]
       from = new Date(cancelDtSplit[0], parseInt(cancelDtSplit[1])-1, cancelDtSplit[2]);  // -1 because months are from 0 to 11
       let PreviousDate = PlanPurchasedDtSplit[2] - 1; //planPurchaseDate: "2022-07-28"
       let mm = this.monthDiff(this.PlanPurchasedDt, check)
       this.PlanPurchasedDt.setDate(this.PlanPurchasedDt.getDate() -1)
       this.PlanPurchasedDt.setMonth(this.PlanPurchasedDt.getMonth() + mm)
       let mmset = check.getTime() > this.PlanPurchasedDt.getTime() ? 1 : 0
       this.subscriptionEndDt = currentYear + "-" + (parseInt(todayDateSplit[1]) + mmset) + "-" + PreviousDate;
       let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
       to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
       /********** Claim eligible(for Cancellation) **********/
       if(ExactDays > 30)
       {
       if(check >= from && check <= to) {
         this.ClaimEligible = true
       }
       else
       {
         this.ClaimEligible = false
       }
       }
       else
       {
         this.subscribedStatus = false
         this.ClaimEligible = false
         this.subscriptionEndDt = cancelDate;
         let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
         to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
       }
       }
       else
       {
         thisMonth = StartDate.getMonth()+1;
         monthset = thisMonth
         /********** For setting Subscription end date **********/
  
         if(todayDateSplit[2] >= PlanPurchasedDtSplit[2])
         {
           let PreviousDate = PlanPurchasedDtSplit[2] - 1;
           let nextMonth = StartDate.getMonth()+2;
           this.subscriptionEndDt = currentYear + "-" + nextMonth + "-" + PreviousDate;
           let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
           to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
           //console.log(this.subscriptionEndDt);
           
         }
         else
         {
           let PreviousDate = PlanPurchasedDtSplit[2] - 1;
           this.subscriptionEndDt = currentYear + "-" + monthset + "-" + PreviousDate;
           let subscriptionEndDtSplit : any = this.subscriptionEndDt.split("-");
           to   = new Date(subscriptionEndDtSplit[0], parseInt(subscriptionEndDtSplit[1])-1, subscriptionEndDtSplit[2]);
           //console.log(this.subscriptionEndDt);
           
         }
         /********** Claim eligible(Not for Cancellation) **********/
         if(ExactDays > 30)
         {
           this.ClaimEligible = true
         }
         else
         {
           this.ClaimEligible = false
         }
       }
  
       /********** For checking subscribed or unsubscribed based on subscription end date **********/
       if(cancelDate && ExactDays < 30) {
         this.subscribedStatus = false
       }
       else if(cancelDate && ExactDays > 30) {
       if(check > to) {
         this.subscribedStatus = false
       }
       else
       {
         this.subscribedStatus = true
       }
     }
     else
     {
       this.subscribedStatus = true
     }
    }else{
      this.subscribedStatus = false
    }
    if (this.status?.status === 'accepted') {
      let date = this.compareDate(new Date)
      let effectiveDate = this.compareDate(this.status?.effective)
      var dateOne = new Date(date);
      var dateTwo = new Date(effectiveDate);
      if (dateOne >= dateTwo) {
        this.enablePlan = true
      } else {
        this.enablePlan = false
      }
    }
    let name = this.subscriberData?.name?.split(/(\s+)/);
    let firstName = name ? name[0] : '';
    this.array = name ? name.shift() : [];
    let lastName = name ? name.join("") : '';
    if (this.AllFormData?.edgeSuites?.servifyCare && this.EdgeSuites && this.EdgeSuites.servifyCare && this.EdgeSuites.servifyCare.planCode) {
      this.servifyenabled = true;
      this.edgeSuiteForm.patchValue({
        servifyCare: {
          enabled: true,
          email: this.EdgeSuites.servifyCare.email,
          firstName: this.EdgeSuites.servifyCare.firstName,
          lastName: this.EdgeSuites.servifyCare.lastName,
          planCode: this.EdgeSuites.servifyCare.planCode,
          address: this.EdgeSuites.servifyCare.address,
          city: this.EdgeSuites.servifyCare.city,
          state: this.EdgeSuites.servifyCare.state,
          postal: this.EdgeSuites.servifyCare.postal,

        }
      });
      this.servifyDisable = true;
    } else {
      this.servifyenabled = false;
      this.servifyDisable = false;
      this.edgeSuiteForm.patchValue({
        servifyCare: {
          enabled: false,
          email: this.subscriberData?.email,
          firstName: firstName,
          lastName: lastName.trim(),
          planCode: '',
          address: this.subscriberData?.serviceAddress,
          city: '',
          state: null,
          postal: '',
        }
      });
    }
  }

  cancelServify(data?) {
    this.cancelcode = '';
    this.submittedcancelcode = false;
    let name = this.AllFormData?.subscriber?.name?.split(/(\s+)/);
    let firstName = name ? name[0] : '';
    this.array = name ? name.shift() : [];
    let lastName = name ? name.join("") : "";
    this.closeAlert();
    if (this.AllFormData && this.AllFormData.edgeSuites && this.AllFormData.edgeSuites.servifyCare) {
      this.modalRef = this.dialogService.open(this.cancelServifyModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.edgeSuiteForm.patchValue({
        servifyCare: {
          enabled: false,
          email: this.AllFormData?.subscriber?.email,
          firstName: firstName,
          lastName: lastName.trim(),
          planCode: '',
          address: this.AllFormData?.subscriber?.serviceAddress,
          city: '',
          state: null,
          postal: '',
        }
      });
      this.servifyenabled = false;
    }

  }

  Cancelservify() {
    this.submittedcancelcode = true;
    if (!this.cancelcode) {
      return
    }
    this.edgeSuiteForm.patchValue({
      servifyCare: {
        planCode:this.AllFormData.edgeSuites?.servifyCare?.planCode,
        reasonCode: this.cancelcode ? this.cancelcode : 'JUST_TRYING',
        cancelDate: this.planPurchaseDate(),
      }
    });
    let formData = Object.assign({}, this.edgeSuiteForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && this.allowSmallBiz && this.subsSysServiceForm?.systems?.length !== 0) {
    } else {
      delete formData.smallBizIQ
    }
    if (formData.arloSmart.enabled && !formData.arloSmart.email) {
      return;
    } else if (formData.arloSmart.enabled && formData.arloSmart.email && !(this.commonOrgService.validateEmail(formData.arloSmart.email))) {
      return;
    }

    let params: any = {
      protectIQ: {},
      experienceIQ: {},
      bark: {},
      smallBizIQ: {},
      myCommunityIQ: formData.myCommunityIQ
    };
    if (formData.smallBizIQ?.enable) {
      params.smallBizIQ = {
        enable: formData.smallBizIQ?.enable
      }
    } else if (formData?.smallBizIQ) {
      params.smallBizIQ = {
        enable: false
      }
    } else {
      params.smallBizIQ = {}
    }
    if (formData.bark?.enable) {
      params.bark = {
        email: formData.bark?.email,
        planCode: formData.bark?.planCode,
      }
    } else {
      params.bark = {}
    }

    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }

    if (formData.arloSmart.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData.servifyCare.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
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
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (this.enableRefresh || (this.bspInfermationSubmitted == 'notSubmitted' || this.bspInfermationSubmitted == 'closed') || !this.commIqEnable) {
      delete formData?.myCommunityIQ?.passpoint
    }
    if(!((!this.opMode || this.opMode === 'RG' || this.opMode === 'ONT/RG') && this.savedSystems)){
      delete formData?.myCommunityIQ?.passpoint;
      delete formData?.myCommunityIQ?.network;
      delete formData?.myCommunityIQ?.eduroam;
      delete formData?.myCommunityIQ?.prioritizeTraffic;
    }
    if (params.myCommunityIQ?.network?.type == 'Bridge') {
      delete params.myCommunityIQ?.network?.protocol;
    } else if (params.myCommunityIQ?.network?.type !== 'Policy_Route') {
      delete params.myCommunityIQ?.network?.protocol;
      delete params.myCommunityIQ?.network?.vlanId;
    }
    if (params.myCommunityIQ?.eduroam && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.eduroam?.primaryServer;
      delete params.myCommunityIQ?.eduroam?.secret;
      delete params.myCommunityIQ?.eduroam?.secondaryServer;
    }
    if (params.myCommunityIQ?.network?.type == null) delete params.myCommunityIQ?.network?.type;
    if (params.myCommunityIQ?.network?.vlanId == '') delete params.myCommunityIQ?.network?.vlanId;
    if (params.myCommunityIQ?.network?.protocol == '') delete params.myCommunityIQ?.network?.protocol;
    if (!params.myCommunityIQ?.passpoint) {
      delete params.myCommunityIQ?.passpoint;
    } else if (!params.myCommunityIQ?.passpoint?.enable) {
      delete params.myCommunityIQ?.passpoint?.communities;
    }
    if (!params.myCommunityIQ?.passpoint?.enable && !params.myCommunityIQ?.eduroam?.enable) {
      delete params.myCommunityIQ?.network;
      delete params.myCommunityIQ?.prioritizeTraffic;
    }
    this.closeAlert();
    this.cancelloading = true;
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsDataCOC(this.ORG_ID, this.createdSubscriberId, params).subscribe((res: any) => {
      let name = this.AllFormData?.subscriber?.name.split(/(\s+)/);
      let firstName = name[0];
      this.array = name.shift();
      let lastName = name.join("");
      // this.edgeSuiteForm.patchValue({
      //   servifyCare: {
      //     enabled: false,
      //     email: this.AllFormData.subscriber?.email,
      //     firstName: firstName,
      //     lastName: lastName.trim(),
      //     planCode: '',
      //     address: this.AllFormData.subscriber?.serviceAddress,
      //     city: '',
      //     state: '',
      //     postal: '',
      //   }
      // });
      let msg = "Servify Plan Data Removed successfully";
      this.showSuccessMessage(this.language[msg]);

      this.servifyenabled = false;
      this.servifyDisable = false;
      this.initializeServyCare()
      this.getSyetemsAllData();
    }, (err: HttpErrorResponse) => {
      this.cancelloading = false;
      this.cancelcode = '';
      this.pageErrorHandle(err);
    })
  }
  GetArlosmart(reload?) {
    this.arloLoading = true;
    let userID = this.EdgeSuites?.arloSmart?.userId ? this.EdgeSuites?.arloSmart?.userId : this.AllFormData?.edgeSuites?.arloSmart?.userId;
    this.arloSmartListSubs = this.service.gerArloSmartData(userID).subscribe((res: any) => {
      this.tableDataAvailable = false;
      if (res && Object.keys(res).length && res.devices && res.devices.length) {
        this.ArloData = (res.devices && res.devices.length) ? res.devices : [];
        let twoKDevices = [], fourKDevices = [];
        this.ArloData.forEach(el => {
          if (el.planId && el.planId.trim() === 'Arlo-Secure-Single-Camera') {
            twoKDevices.push(el);
            this.ArloTitle = "Arlo Secure Plan"
          }
          if (el.planId && el.planId.trim() === 'Arlo-Secure-Unlimited-Plan') {
            twoKDevices.push(el);
            this.ArloTitle = "Arlo Secure Unlimited Plan"
          }
          if (el.planId && el.planId.trim() === 'Arlo-Secure-Plus-Unlimited-Plan') {
            twoKDevices.push(el);
            this.ArloTitle = "Arlo Secure Unlimited Plus Plan"
          }
        });

        this.twoKPlanData = [...twoKDevices];
        setTimeout(() => {
          this.loadArloTables();
        }, 50);

      } else {
        this.twoKPlanData = [];
        this.fourKPlanData = [];

        setTimeout(() => {
          this.loadArloTables();
        }, 50);
      }
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loadArloTables();
      this.arloLoading = false;
    })
  }

  loadArloTables() {

    this.tableLanguageOptions();

    setTimeout(() => {
      this.tableDataAvailable = true;
      this.arloLoading = false
    }, 100);

  }

  RemoveArloData(data?) {
    this.closeAlert();
    this.removeCameraInfo = data;
    this.modalRef = this.dialogService.open(this.removeCameraModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });


  }

  showConfirmMsg() {
    this.showwarning = true;
    this.removeConfirmMsg = `${this.language.removeCameraMsg()} <br>Seriel Number: ${this.removeCameraInfo.deviceId}<br>Model Number: ${this.removeCameraInfo.modelId}`;
  }

  closeConfirmMsg() {
    this.removeConfirmMsg = '';
    this.showwarning = false;
  }

  confirmDelete() {
    let userId = this.EdgeSuites?.arloSmart?.userId;
    let deviceId = this.removeCameraInfo.deviceId;
    this.arloLoading = true;

    this.service.deleteArloSmartData(userId, deviceId).subscribe((res: any) => {

      this.removeCameraInfo = undefined;

      this.closeAllModal();
      setTimeout(() => {
        this.GetArlosmart();
        this.arloLoading = false;
      }, 3000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, 'arlo');
      this.arloLoading = false;
    })
  }

  closeAllModal() {
    this.loading = false;
    this.dialogService.dismissAll();
  }
  openRequiredCollapse(id){
    let element = document.getElementById(id);
    if(element.className=='collapsed'){
      element.click();
    } ;
  }
  pageErrorHandle(err: HttpErrorResponse, feature?) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }

    setTimeout(() => {
      this.closeAllModal()
    }, 2500);

    if (feature && feature == 'arlo') {
      this.arloErrorInfo = this.errorInfo;
      this.arloError = true;
    } else {
      this.error = true;
      this.loading = false;
    }


  }

  formValueChanges() {
    // this.submitted = false
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
  }

  productIQchanges() {
    this.productIqEnable = !this.productIqEnable;
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
  }
  ExpIQChanges() {
    this.ExpIQEnable = !this.ExpIQEnable;
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
  }

  arloEnableDisable() {
    this.submitted = false;
    this.showArloEnablingError = false;
    this.arloEnabled = !this.arloEnabled;
    this.edgeSuiteForm.patchValue({ arloSmart: { enabled: this.arloEnabled } });
    this.formValueChanges();
    if (this.arloEnabled) {
      let email = this.edgeSuiteForm.value.arloSmart?.email ? this.edgeSuiteForm.value.arloSmart?.email.trim() : '';
      if (!email && this.createdSubcriberData && this.createdSubcriberData?.email) {
        this.edgeSuiteForm.patchValue({ arloSmart: { email: this.createdSubcriberData?.email ? this.createdSubcriberData?.email : this.AllFormData?.subscriber?.email } });
      }
    } else {
    }
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value);
  }
  arloDisable() {
    this.warningArlomessage = true;
  }
  RemoveArlo() {
    this.arloEnabled = false;
    this.is2KChecked = false;
    this.is4KChecked = false;
    this.edgeSuiteForm.patchValue({ arloSmart: { enabled: this.arloEnabled } });
    this.edgeSuiteForm.patchValue({ arloSmart: { email: '', '2kCameras': 0, '4kCameras': 0 } });
    this.emailDisabled = false;
    this.warningArlomessage = false;
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value);
  }

  EnableDisable2K() {
    this.is2KChecked = !this.is2KChecked;
    if (!this.is2KChecked) {
      this.edgeSuiteForm.patchValue({ arloSmart: { '2kCameras': 0 } });
    }
  }
  cancelDelete() {
    this.warningArlomessage = false;
  }
  EnableDisable4K() {
    this.is4KChecked = !this.is4KChecked;
    if (!this.is4KChecked) {
      this.edgeSuiteForm.patchValue({ arloSmart: { '4kCameras': 0 } });
    }
  }

  change2K() {
    let arloSmart = this.edgeSuiteForm.value.arloSmart;
    if (arloSmart['2kCameras']) {
      this.is2KChecked = true;
    } else {
      this.is2KChecked = false;
    }
  }

  change4K() {
    let arloSmart = this.edgeSuiteForm.value.arloSmart;
    if (arloSmart['4kCameras']) {
      this.is4KChecked = true;
    } else {
      this.is4KChecked = false;
    }
  }
  getSmallBizStatus() {
    this.sbIstatus = (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result) ? this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result : '';
    this.errorStatus= (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.error) ? this.AllFormData?.edgeSuites?.smallBizIQ?.status?.error : '';
    if (this.sbIstatus) {
      if (this.sbIstatus == 'pending' && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.sbIStatusMsg = 'Activation in Progress';
        this.sbIStatus = 'Activation_in_Progress';
        this.sbIStatusClass = 'activation-progress';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = true;
      } else if (this.sbIstatus == 'pending' && !this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.sbIStatusMsg = 'Deactivation in Progress';
        this.sbIStatus = 'Deactivation_in_Progress';
        this.sbIStatusClass = 'activation-progress';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = true;
      } else if (this.sbIstatus == "succeeded" && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has been enabled';
        this.sbIStatusClass = 'success-message-info';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = false;
      } else if (this.sbIstatus == "succeeded" && !this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has been disabled';
        this.sbIStatusClass = 'success-message-info';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = false;
      } else if (this.sbIstatus == "failed" && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.sbIStatusMsg = 'Failed to enable';
        this.sbIStatus = 'SmartBiz has failed to enable';
        this.sbIStatusClass = 'error-message-info';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = false;
      } else if (this.sbIstatus == "failed" && !this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has failed to disable';
        this.sbIStatus = 'Failed to disable';
        this.sbIStatusClass = 'error-message-info';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = false;
      }
    }
  }
  refreshSmallBiz() {
    this.loading = true;
    this.service.getsmallBizStatusCOC(this.ORG_ID, this.createdSubscriberId).subscribe((res: any) => {
      this.AllFormData.edgeSuites.smallBizIQ.status.result = res.status.result;
      this.loading = false;
      this.getSmallBizStatus();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  Emailchange(value, name) {
    if (name === 'arlo') {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailmsgarlo = "";
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      } else if (!value) {
        this.emailmsgarlo = "";
      }
      else {
        this.emailmsgarlo = "You have entered an invalid email address!";
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      }
    } else if (name === 'bark') {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailbarkmsg = "";
        this.barkEmailError = false;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      } else if (!value) {
        this.emailbarkmsg = "";
        this.barkEmailError = false;
      }
      else {
        this.emailbarkmsg = "You have entered an invalid email address!";
        this.barkEmailError = true;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      }
    } else {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailmsg = "";
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      } else if (!value) {
        this.emailmsg = "";
      }
      else {
        this.emailmsg = "You have entered an invalid email address!";
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      }
    }
  }
  servyEnableDisable() {
    this.submitted = false;
    this.servyEnabled = !this.servyEnabled;
    this.edgeSuiteForm.patchValue({ servifyCare: { enabled: this.servyEnabled } });
    if (!this.servyEnabled) {
      this.edgeSuiteForm.patchValue({ servifyCare: { tier: 0 } });
    }
    this.formValueChanges();
  }
  planPurchaseDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let date = yyyy + '-' + mm + '-' + dd;
    this.edgeSuiteForm.patchValue({ servifyCare: { planPurchaseDate: date } })
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
    return date
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.arloSmartListSubs) this.arloSmartListSubs.unsubscribe();
    if (this.deviceInfosub) this.deviceInfosub.unsubscribe();
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
    if (this.getAllSystemsSubs) this.getAllSystemsSubs.unsubscribe();
    if (this.getAllSubscriberActiveSys) this.getAllSubscriberActiveSys.unsubscribe();

  }
  cameraValidate(field) {
    //debugger;
    let value = this.edgeSuiteForm.value.arloSmart[field];
    //value = value ? value.trim() : '';
    if (field == '2kCameras') {
      this.arlovalue[field] = (value == null || (value != undefined && value >= 0 && value <= 50));
      if (this.arlovalue[field] === false) {
        this.arlo2kcameraError = true
      }
      else {
        this.arlo2kcameraError = false
      }
      if (this.twoKPlanData && (this.edgeSuiteForm.value.arloSmart.plan.includes('PARTNER_REGULAR'))) {
        this.arlocamera[field] = (value >= this.twoKPlanData.length)
        if (this.arlocamera[field] == false) {
          this.arlo2kplanError = true
        }
        else {
          this.arlo2kplanError = false
        }
      }
    } else {
      this.arlovalue[field] = (value == null || (value != undefined && value >= 0 && value <= 50));
      if (this.arlovalue[field] === false) {
        this.arlo4kcameraError = true
      }
      else {
        this.arlo4kcameraError = false
      }
      if (this.fourKPlanData) {
        this.arlocamera[field] = (value >= this.fourKPlanData.length)
        if (this.arlocamera[field] == false) {
          this.arlo4kplanError = true
        }
        else {
          this.arlo4kplanError = false
        }
      }
    }

  }
  getHostData() {
    this.OrganizationApiService.GetHostData('assets/config/config.json').subscribe((res: any) => {
      this.HOSTDATA = res?.isCAInstance;
      if (this.HOSTDATA) {
        this.stateItem = this.dataService.getCanadaStates();
      } else {
        this.stateItem = this.dataService.getUnitedStates();
      }
    });
  }
  allowOnlyNumbers(value) {
    if (!this.HOSTDATA) {
      if (/^[0-9]{5}/.test(value)) {
        this.zipMsg = "";
        this.ziperr = false;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      } else if (!value) {
        this.zipMsg = "";
      }
      else {
        this.zipMsg = "You have entered an invalid ZIP Code!";
        this.ziperr = true;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      }
    } else {
      if (/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]●?[0-9][A-Z][0-9]$/.test(value)) {
        this.PostalMsg = "";
        this.ziperr = false;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      } else if (!value) {
        this.PostalMsg = "";
      }
      else {
        this.PostalMsg = "You have entered an invalid Postal Code!";
        this.ziperr = true;
        this.Out_EdgeSuites.emit(this.edgeSuiteForm.value)
        return
      }
    }

  }

  saveSubscriber() {
    //debugger;
    this.edgeSuiteForm.patchValue({
      servifyCare: {
        reasonCode: '',
        cancelDate: ''
      }
    })
    this.formValueChanges();
    this.planPurchaseDate();
    this.submitted = true;
    let formData = this.edgeSuiteForm.value;
    let arloError = false
    if (formData.bark.enable) {
      this.Emailchange(formData.bark.email, 'bark');
      if (!formData.bark.email || !formData.bark.planCode || this.barkEmailError) {
        this.openRequiredCollapse('collapseBarkToggle');
        return
      }
    }
    if (formData.myCommunityIQ?.subscriber?.enable && !formData.myCommunityIQ?.subscriber?.communities?.length) {
      this.subscriberError = true;
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return;
    }
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && this.allowSmallBiz && this.subsSysServiceForm?.systems?.length !== 0) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (this.arloEntitleEnable) {
      if (formData.arloSmart.enabled) {
        this.Emailchange(formData.arloSmart.email, 'arlo');
        formData.arloSmart.email = formData.arloSmart.email ? formData.arloSmart.email : '';
        if (!formData.arloSmart.email) {
          this.openRequiredCollapse('collapseArloSecureToggle');
          return
        }
        if (formData.arloSmart.email && !this.commonOrgService.validateEmail(formData.arloSmart.email)) {
          arloError = true;
        }
        if (formData.arloSmart['2kCameras'] != null && formData.arloSmart['2kCameras'] != undefined && formData.arloSmart.plan.includes('PARTNER_REGULAR')) {
          this.cameraValidate('2kCameras');
          this.arlo2kcameraError = !this.arlovalue['2kCameras'];
        }else{
          this.arlo2kplanError=false
        }
        if (this.arlo2kcameraError == true || this.arlo2kplanError || !formData.arloSmart.plan) {
          this.errorInfo = `${this.language['Please fill all required fields with valid data']}`;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
          this.openRequiredCollapse('collapseArloSecureToggle');
          return
        }
      }
    } else {
      if (formData.arloSmart) delete formData.arloSmart;
    }
    if (this.servifyenabled === true) {
      this.Emailchange(formData?.servifyCare?.email, 'servify');
      this.allowOnlyNumbers(formData?.servifyCare?.postal)
      if (this.ziperr) {
        return
      }
      if (!formData?.servifyCare?.planCode || !formData?.servifyCare?.email || !formData?.servifyCare?.firstName || !formData?.servifyCare?.lastName || !formData?.servifyCare?.address || !formData?.servifyCare?.city || !formData?.servifyCare?.state || !formData?.servifyCare?.postal) {
        this.openRequiredCollapse('collapseServifyCareToggle');
        return
      } else {
        this.edgeSuiteForm.patchValue({ servifyCare: { enabled: true } })
      }
    }
    if (this.myCommunityControl.invalid || !this.myCommunityIQ.vlanId) {
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return;
    }
    if (this.myCommunityControl?.get('eduroam')?.value?.enable && this.showRadiousError) {
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return;
    }
    let updateEnabled: any = {
      protectIQ: false,
      experienceIQ: false
    };

    if (this.protectIqPrevEnableState != this.EdgeSuites?.protectIQ?.enabled && !this.protectIQDisabled) {
      updateEnabled.protectIQ = true;
    }
    if (this.experianceIqPrevEnableState != this.EdgeSuites?.experienceIQ?.enabled && !this.experianceIQDisabled) {
      updateEnabled.experienceIQ = true;
    }
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete formData?.servifyCare
    }
    if (this.enableRefresh || (this.bspInfermationSubmitted == 'notSubmitted' || this.bspInfermationSubmitted == 'closed') || !this.commIqEnable) {
      delete formData?.myCommunityIQ?.passpoint
    }
    if(!((!this.opMode || this.opMode === 'RG' || this.opMode === 'ONT/RG') && this.savedSystems)){
      delete formData?.myCommunityIQ?.passpoint;
      delete formData?.myCommunityIQ?.network;
      delete formData?.myCommunityIQ?.eduroam;
      delete formData?.myCommunityIQ?.prioritizeTraffic;
    }
    this.out_edge_suits_submit.emit(updateEnabled);
  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.arloError = false;
    this.showwarning = false;
  }
  servifyEnableDisable() {
    this.submitted = false;
    this.servifyenabled = !this.servifyenabled;
    this.edgeSuiteForm.patchValue({ servifyCare: { enabled: true } })
    this.formValueChanges();
    if (this.servifyenabled) {
      if ((this.AllFormData?.subscriber || this.createdSubcriberData) && !this.AllFormData?.edgeSuites?.servifyCare) {
        let name = this.createdSubcriberData?.name ? this.createdSubcriberData?.name.split(/(\s+)/) : this.AllFormData?.subscriber?.name.split(/(\s+)/);
        let firstName = name ? name[0] : '';
        this.array = name ? name.shift() : [];
        let lastName = name ? name.join("") : "";

        this.edgeSuiteForm.patchValue({ servifyCare: { email: this.createdSubcriberData?.email ? this.createdSubcriberData?.email : this.AllFormData?.subscriber?.email, address: this.createdSubcriberData?.serviceAddress ? this.createdSubcriberData?.serviceAddress : this.AllFormData?.subscriber?.serviceAddress, firstName: firstName, lastName: lastName.trim() } });
      }
    } else {
    }
    this.Out_EdgeSuites.emit(this.edgeSuiteForm.value);
  }
  rerender(): void {
    this.tableDataAvailable = false;
    let that = this;
    this.dtElements.forEach((dtElement: DataTableDirective, i) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.destroy();
          if (i == 1) {
            that.reload()
          }
        });
    });


  }

  reload() {
    setTimeout(() => {
      this.dtTrigger1.next();
      this.dtTrigger2.next();
      this.tableDataAvailable = true;
      this.arloLoading = false;
    }, 50);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  getScopes() {
    if (this.sso.checFoundationScope(AcessModifiers.READ, CheckScopes.VALIDATE_SCOPE) || this.sso.checFoundationScope(AcessModifiers.WRITE, CheckScopes.VALIDATE_SCOPE)) {
      this.scopeFlag.arlo = true;
      this.scopeFlag.iqsuits = true;
    }
  }

  getAllSystems() {
    this.getAllSystemsSubs = this.service.getSubscriberSystemList(this.subscriberData._id).subscribe((list: any) => {
      let devices = (list && list.length) ? list : [];
      if (list && list.length) {
        this.getALLActiveSystems(devices);
      } else {
        this.IQSuiteShow = true;
        this.IQSuiteDevice = {};
      }

    }, (err: HttpErrorResponse) => {
      this.IQSuiteShow = true;
      this.IQSuiteDevice = {};
      this.allSystemsReceived = true;
    });

  }

  getALLActiveSystems(allDevices?) {
    this.getAllSubscriberActiveSys = this.systemService.getAllDatafSubscriber(this.ORG_ID, this.subscriberData._id).subscribe((res: any) => {

      this.devices = [];
      if (res && res.devices && res.devices.length) {
        let noDataDevices = [];
        allDevices.forEach(el => {
          const match = res.devices.filter(f => f.serialNumber && f.serialNumber == el);
          if (match.length) {
            this.devices.push({
              deviceId: el,
              ...match[0]
            });
          } else {
            this.devices.push({
              deviceId: el.trim()
            });
            noDataDevices.push(el.trim());
          }
        });
        //GET All devices info
        if (noDataDevices.length) {
          this.allPreProvRecord(noDataDevices);
        } else {
          this.checkIQSuitesShow();
        }

      } else {
        allDevices = allDevices.map(el => {
          this.devices.push({
            deviceId: el.trim()
          });
          return el.trim();
        });

        //GET All devices info
        this.allPreProvRecord(allDevices);
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      allDevices = allDevices.map(el => {
        this.devices.push({
          deviceId: el.trim()
        });
        return el.trim();
      });
      this.allPreProvRecord(allDevices);
    })
  }

  allPreProvRecord(devices) {
    const getCalls: Observable<any>[] = [];
    devices.forEach(el => {
      getCalls.push(this.service.getProvisionrecord(this.ORG_ID, el));
    });
    forkJoin(getCalls).subscribe(
      resultArray => {
        let extraDeviceSN = {};
        devices.forEach((el, i) => {
          extraDeviceSN[el] = resultArray[i];
        });
        this.checkIQSuitesShow(resultArray, extraDeviceSN);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.checkIQSuitesShow();
      });
  }


  checkIQSuitesShow(extraDevices?, extraDeviceSN?) {

    if (extraDevices) {
      this.devices = this.devices.map(el => {
        if (el.deviceId && extraDeviceSN[el.deviceId]) {
          return { deviceId: el.deviceId, ...extraDeviceSN[el.deviceId] };
        }
        return el;
      });
    }

    let order = {
      'RG': 1
    }
    this.devices = this.devices.sort((a, b) => { return (order[b.opMode] ? order[b.opMode] : 0) - (order[a.opMode] ? order[a.opMode] : 0); });
    const RGs = this.devices.filter(el => (el.opMode == 'RG' ));
    if (RGs.length && RGs) {
      this.IQSuiteDevice = RGs[0];
      if ((this.IQSuiteDevice?.opMode === 'RG' ) && this.IQSuiteDevice?.modelName) {
        //RG & Model avail
        if ((this.IQSuiteDevice?.modelName).indexOf("GS") !== -1 || (this.IQSuiteDevice?.modelName).indexOf("GM") !== -1) {
          this.IQSuiteShow = true;
        } else {
          this.IQSuiteShow = false;
        }
      } else if ((this.IQSuiteDevice === 'RG' ) && !this.IQSuiteDevice?.modelName) {
        //No Model
        this.IQSuiteShow = true;
      }
    } else {
      //No RGs
      this.IQSuiteShow = true;
    }
    setTimeout(() => {
      this.allSystemsReceived = true;
    }, 10);
  }
  allowNumberOnly2kCamera(event) {
    if (event.key === '-' || event.key === '.' || event.target.value.length > 1) { event.preventDefault(); }
  }
}
