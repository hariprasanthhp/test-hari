import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, OnChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ExperianceIQService } from 'src/app/support/support-application/shared/service/experiance-iq.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import _ from 'lodash';
import { environment } from 'src/environments/environment';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';
@Component({
  selector: 'app-edge-suits',
  templateUrl: './edge-suits.component.html',
  styleUrls: ['./edge-suits.component.scss']
})
export class EdgeSuitsComponent implements OnInit, OnDestroy, OnChanges {

  language;
  languageSubject;
  @Input() systemInfo;
  @Input() sys_EdgeSuites;
  @Input() AllFormData;
  @Input() IQ_SuiteEnable;
  @Input() arloEntitleEnable;
  @Input() ServifyEnableentitlement;
  @Input() ServifyPlatinumentitlement;
  @Input() ServifySilverentitlement;
  @Input() ServifyGoldentitlement;
  @Input() Bark_Premiumentitlement;
  @Input() Bark_Juniorentitlement;
  @Input() ProductIQEntitleEnable;
  @Input() ExpIQEntitleEnable;
  @Input() ProAndExpIQEntitleEnable;
  @Input() smallBizIQentitlement;
  @Input() arloUnlimitedentitlement;
  @Input() arloUnlimitedplusentitlement;
  @Input() formOptions;
  @Input() myCommunityIQEntitlement;
  @Input() proExpDisable;
  @Output() private Out_sys_EdgeSuites: EventEmitter<any> = new EventEmitter();
  @Output() private allFormData: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_edge_suits_submit: EventEmitter<any> = new EventEmitter();
  @Output() parentOpMode: EventEmitter<any> = new EventEmitter();
  @Output() private Out_System_Focus: EventEmitter<any> = new EventEmitter();
  @ViewChild('removeCameraModal', { static: true }) private removeCameraModal: TemplateRef<any>;
  @ViewChild('cancelServifyModal', { static: true }) private cancelServifyModal: TemplateRef<any>;
  @ViewChild('cancelArloSecureModal', { static: true }) private cancelArloSecureModal: TemplateRef<any>;
  @ViewChild('cancelBarkModal', { static: true }) private cancelBarkModal: TemplateRef<any>;
  //Table
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
  ErrorMsgForZip: string;
  twoKPlanData1: any;
  fourKPlanData: any = [];


  edgeSuitsForm: FormGroup;


  enable_toggle: boolean = false;
  test1: boolean = true;
  sample_check1: boolean = false;

  enableToggle: boolean = false;
  test: boolean = true;
  sampleCheck: boolean = false;
  emailmsg: string;
  submitted: boolean;
  arloEnabled: boolean = false;
  servyEnabled: any;

  error: boolean;
  success: boolean;
  errorInfo: any;
  successInfo: any;

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
  servifyDisable: boolean = false;
  ArloDisable: boolean = false;
  deviceInfosub: any;
  deviceData: any;
  opMode: any;
  iqsuitDisable: boolean = false;
  ORG_ID: any;
  system: any;
  scopeFlag: any = { arlo: false, iqsuits: false };
  iQsuiteenable: boolean;
  productIqEnable: boolean;
  ExpIQEnable1: boolean;
  ExpIQEnable: boolean;
  experianceIQDisabled: boolean = true;
  protectIQDisabled: boolean = true;
  experianceIqPrevEnableState: boolean;
  protectIqPrevEnableState: boolean;
  showArlo: boolean;
  servifyenabled: boolean = false;
  BarkEnable: boolean = false;
  emailmsgarlo: string;
  cancelcode: any;
  stateItem: any = [];
  HOSTDATA: any;
  updationEdgeSuitesData: any;
  edgeSuiteLoading: boolean;
  edgeSuitsUpdateSubs: any;
  systemGetSubs: any;
  syetemsAllData: any;
  zipMsg: string;
  ziperr: boolean;
  array: any;
  ArloTitle = "Arlo Secure Plan";
  submittedcancelcode: boolean;
  cancelloading: boolean;
  PostalMsg: string;
  communityArr: any;
  subscriberMembershipList: any = [];
  rgMembershipList: any = [];
  subscriberForm: FormGroup;
  rgMembership: FormGroup;
  addBspsub: any;
  myCommunityIQ = {
    vlanId: true,
    // customerVlanId: true
  }
  selectedCommunityList: any;
  deleteId: any;
  SubscriberCommunityArr: any = [];
  rgCommunityArr: any = [];
  refresh: boolean = true;
  RGrefresh: boolean = true;
  noEmailAlert: boolean=false;
  subscriberError: boolean = false;
  commIqEnable: boolean = true;
  rgStatus: any;
  rgStatusImg: any;
  rgStatusMsg: string;
  rgStatusClass: string;
  enableStatus: boolean = false;
  enablesmallBizStatus: boolean = false;
  enableRefresh: boolean = false;
  bspInfermationSubmitted: string;
  BspProvidersub: any;
  lowerVersion: string;
  esTable: any;
  dev: boolean;
  passpointNAReason: any;
  hideStatus: boolean;
  passpointItem: { name: string; value: string; }[];
  emailbarkmsg: string;
  status: any;
  barkEmailError: boolean;
  passpointItemdev: any[];
  allowSmallBiz: boolean = true;
  sbIstatus: any;
  sbIStatusClass: string;
  sbIStatusImg: string;
  sbIStatusMsg: string;
  elijaDevice: boolean;
  enablesmallBiz: boolean;
  enablePlan: boolean = true;
  commSubStatus: any;
  comSysStatus: any;
  sbIStatus: string;
  CAUser: boolean = false;
  allowSmallBizIQ: boolean = false;
  CancelProcess: boolean;
  allowRGCommunity: boolean = false;
  secretEyeIcon: boolean = false;
  allowEduroam: boolean = false;
  showPasspointNAAlert: boolean = false;
  eduroamStatus: any;
  eduroamStatusImg: string;
  eduroamStatusMsg: string;
  eduroamStatusClass: string;
  enableeduroamStatus: boolean;
  enableeduroamRefresh: boolean;
  subscribedStatus: boolean;
  ClaimEligible: boolean;
  subscriptionEndDt: string;
  cancelledStatus: boolean;
  PlanPurchasedDt: Date;
  errorStatus: any;
  errorStatusEdurom: any;
  errorStatusRg: any;
  PIQEIQDisable: boolean=false;
  hidePlan: boolean;
  hideSmartbiz: boolean;
  smbNAReason: any;
  smbEnable: boolean = true;
  showsmbNAAlert: boolean;
  hidesmbStatus: boolean;
  constructor(
    private supportWifi: SupportWifiService,
    private translateService: TranslateService,
    private service: FoundationManageService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private dialogService: NgbModal,
    private dataService: DataService,
    private OrganizationApiService: OrganizationApiService,
    private formBuilder: FormBuilder,
    private communityService: MycommunityIqService,
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.ORG_ID = this.sso.getOrgId();
    this.getScopes();

  }

  ngOnInit(): void {
    this.Out_System_Focus.emit(true);
    let base = `${environment.API_BASE}`;
    this.status = undefined;
    if ((base.indexOf('/dev.api.calix.ai') > -1)) {
      this.dev = true;
    } else {
      this.dev = false;
    }
    if (this.myCommunityIQEntitlement) {
      this.GetMicrosites();
      this.getBspProvider()
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
      this.tableDataAvailable = false;
      this.tableLanguageOptions();
      setTimeout(() => {
        this.tableDataAvailable = true;
      }, 100);
    })
    this.getHostData();
    this.deviceDetails();
    this.removeConfirmMsg = `${this.language.removeCameraMsg()}`;
    this.subscriberForm = this.formBuilder.group({
      communityName: [null, [Validators.required]],
      isSubscribed: ['option1']
    });
    this.rgMembership = this.formBuilder.group({
      communityName: [null, [Validators.required]],
      check: [null]
    })
    this.edgeSuitsForm = new FormGroup({
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
          protocol: new FormControl(''),
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
    this.passpointItem = [
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
    this.passpointItemdev = [
      {
        name: 'Bridged',
        value: 'Bridge',
      },
      {
        name: 'Routed on HSI VLAN',
        value: 'Route',
      }
    ]
    if((this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable && (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result=="succeeded")) ||(this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable && (this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result=="succeeded"))||(this.AllFormData?.edgeSuites?.smallBizIQ?.enable && (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=="succeeded")) ){
      this.proExpDisable=true
    }
    if(this.AllFormData?.modelName == '844E-2') this.hideSmartbiz = true;
    if((this.AllFormData?.edgeSuites?.smallBizIQ?.enable && (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=='pending' ||this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result=="succeeded")) ){
      this.PIQEIQDisable=true
    }
    if (this.AllFormData?.edgeSuites && Object.keys(this.AllFormData?.edgeSuites).length) {
      this.selectedCommunityList = this.AllFormData?.edgeSuites;
     
      (this.AllFormData.edgeSuites.myCommunityIQ?.subscriber?.communities) ? this.AllFormData.edgeSuites.myCommunityIQ.subscriber.communities = this.AllFormData.edgeSuites.myCommunityIQ.subscriber.communities.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      (this.AllFormData.edgeSuites.myCommunityIQ?.passpoint?.communities) ? this.AllFormData.edgeSuites.myCommunityIQ.passpoint.communities = this.AllFormData.edgeSuites.myCommunityIQ.passpoint.communities.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      setTimeout(() => {

        this.edgeSuitsForm.patchValue(this.AllFormData?.edgeSuites);
        if (this.edgeSuitsForm.value?.myCommunityIQ.eduroam.enable) {
          this.addValidatiorEduroamGroup();
        }
      }, 100)
    } else if (this.sys_EdgeSuites) {
      this.selectedCommunityList = this.sys_EdgeSuites;
      (this.sys_EdgeSuites.myCommunityIQ?.subscriber?.communities) ? this.sys_EdgeSuites.myCommunityIQ.subscriber.communities = this.sys_EdgeSuites.myCommunityIQ.subscriber.communities.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      (this.sys_EdgeSuites.myCommunityIQ?.passpoint?.communities) ? this.sys_EdgeSuites.myCommunityIQ.passpoint.communities = this.sys_EdgeSuites.myCommunityIQ.passpoint.communities.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      setTimeout(() => {
        this.edgeSuitsForm.patchValue(this.sys_EdgeSuites);
        if (this.edgeSuitsForm.value?.myCommunityIQ.eduroam.enable) {
          this.addValidatiorEduroamGroup();
        }
      }, 100)


    }
    if (this.AllFormData?.status == "Pre Provisioned" || !this.systemInfo.sn) {
      this.experianceIQDisabled = true;
      this.protectIQDisabled = true;
    }

    this.initialize();
    this.showArlo = false;
    if (this.AllFormData?.subscriber?.subscriberLocationId) {
      this.showArlo = true;
    }
    // delete this.AllFormData?.subscriber?.email
    this.noEmailAlert = (this.AllFormData?.subscriber?.email) ? false : true;
    this.commSubStatus = this.edgeSuitsForm.value.myCommunityIQ.subscriber.enable ? this.language['Subscribed'] : this.AllFormData?.subscriber?.subscriberLocationId ? this.language.Unsubscribed : '';
    this.comSysStatus = this.edgeSuitsForm.value.myCommunityIQ.passpoint.enable ? this.language['rgStatusMsg'] : this.rgStatusMsg ? this.language['rgStatusMsg'] : (!this.opMode || this.opMode === 'RG' ) && this.AllFormData?.systemId ? this.language.Unsubscribed : ''

  }
  addValidationForHotspotConfiguration(event) {
    if (event.target.checked) {
      this.myCommunityControl.get('network').get('type').addValidators(Validators.required);
    } else {
      this.myCommunityControl.get('network').get('type').clearValidators();
      this.myCommunityControl.get('network').get('vlanId').clearValidators();
      this.myCommunityControl.get('network').get('protocol').clearValidators();
      this.myCommunityControl.get('network').get('protocol').updateValueAndValidity();
      this.myCommunityControl.get('network').get('vlanId').updateValueAndValidity();
      this.myCommunityControl.get('network').get('type').updateValueAndValidity();
    }
    setTimeout(()=>{
      this.addAndRemoveNetworkGroupValidation();
    },100)


  }
  showRadiousError: boolean;
  showUnder: string;
  radiousServerShoudNotMatchValidation(show?) {
    if (show) this.showUnder = show;
    this.showRadiousError = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(this.myCommunityControl?.value?.eduroam?.secondaryServer) && (this.myCommunityControl?.value?.eduroam?.secondaryServer == this.myCommunityControl?.value?.eduroam?.primaryServer)
  }
  smallBizEdit() {
    this.allowSmallBizIQ = true;
  }
  communityEdit() {
    this.allowRGCommunity = true;
  }
  getBspProvider() {
    this.BspProvidersub = this.communityService.GetBspproviderInfo().subscribe((res: any) => { this.bspInfermationSubmitted = 'submitted' }, err => { this.bspInfermationSubmitted = 'notSubmitted' });
  }
  NewPlanCode(value) {
    return value === 'SERVIFYCAREPLATINUM' ? 'Platinum ' : value === 'SERVIFYCAREBRONZE' ? 'Bronze ' : value === 'SERVIFYCAREGOLD' ? 'Gold' : value === 'SERVIFYCARESILVER' ? 'Silver' : '-';
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
  get myCommunityControl() {
    return this.edgeSuitsForm.get('myCommunityIQ') as FormGroup;
  }
  deviceDetails() {

    let system = this.AllFormData?.systemId ? this.AllFormData?.systemId : '';
    if (system) {
      this.service.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
        this.deviceData = res ? res : [];
        if(this.deviceData?.manufacturer == 'ZYXEL'){
          this.hidePlan = true;
        }
       


        setTimeout(() => {
          if (res?.softwareVersion?.substring(0, 4) <= 22.2) {
            this.lowerVersion = 'lowerVersion';
          } else {
            this.lowerVersion = '';
          }
          if (res?.softwareVersion?.substring(0, 4) < 23.1) {
            this.allowSmallBiz = false
          } else {
            this.allowSmallBiz = true
          }
          if ((res?.modelName.indexOf('GPR') > -1)) {
            this.elijaDevice = true
          }
        }, 1000)
        this.opMode = this.deviceData?.opMode;
        if (this.deviceData?.serialNumber) {
          this.supportWifi.wifiAvailability(this.ORG_ID, this.deviceData.serialNumber).subscribe((res: any) => {
            if (res && res?.passpoint) {
              this.showPasspointNAAlert = true;
              this.commIqEnable = true;
              this.hideStatus = false;
            } else if (res && !res?.passpoint) {
              this.showPasspointNAAlert = false;
              this.commIqEnable = false;
              this.hideStatus = true;
              this.passpointNAReason = res?.passpointNAReason
            } else if (!res || res === null) {
              this.showPasspointNAAlert = false;
              this.commIqEnable = false;
              this.hideStatus = true;
              this.passpointNAReason = 'Hotspot is not supported (Unknown)'
            } 
            if (res && res?.smb) {
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
            this.showPasspointNAAlert = false;
            this.commIqEnable = false;
          })

        }
        if (!(this.deviceData?.modelName)) {
          this.showPasspointNAAlert = true;
          this.commIqEnable = true;
        }
        this.parentOpMode.emit(this.opMode);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }


  }
  lanValidate(field) {
    //debugger
    let value = this.myCommunityControl.get('network').value[field];
    this.myCommunityIQ[field] = (value == null || (value != undefined && value != 0 && value >= 1 && value <= 4093));
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
  GetMicrosites() {
    this.loading = true
    this.addBspsub = this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res.filter(x => x.status === "READY") : [];
      this.communityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.subscriberMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < this.selectedCommunityList.myCommunityIQ?.subscriber?.communities?.length; i++) {
          if (x.id === this.selectedCommunityList.myCommunityIQ?.subscriber?.communities[i]) {
            return true;
          }
        }
        return false;
      });
      this.rgMembershipList = this.communityArr.filter(x => {
        for (let i = 0; i < this.selectedCommunityList.myCommunityIQ?.passpoint?.communities?.length; i++) {
          if (x.id === this.selectedCommunityList.myCommunityIQ?.passpoint?.communities[i]) {
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
      this.loading = false
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loading = false
    })
  }
  addCommunity() {
    this.refresh = false;
    for (let i = 0; i < this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate.length; i++) {
      if (!this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communities.includes(this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i])) {
        this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communities.push(this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i]);

      }
      for (let j = 0; j < this.SubscriberCommunityArr.length; j++) {
        if (this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communitiesDuplicate[i] == this.SubscriberCommunityArr[j].id) {
          this.SubscriberCommunityArr.splice(j, 1);
        }
      }
    }
    let data = this.edgeSuitsForm.value.myCommunityIQ?.subscriber;
    setTimeout(() => {
      this.refresh = true;
    })

    setTimeout(() => {

      this.edgeSuitsForm.get('myCommunityIQ').get('subscriber').patchValue({
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
    for (let i = 0; i < this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate.length; i++) {
      if (!this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communities.includes(this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i])) {
        this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communities.push(this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i])
      }
      for (let j = 0; j < this.rgCommunityArr.length; j++) {
        if (this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communitiesDuplicate[i] == this.rgCommunityArr[j].id) {
          this.rgCommunityArr.splice(j, 1);
        }
      }
    }

    setTimeout(() => {
      this.RGrefresh = true;
    })
    let data = this.edgeSuitsForm.value.myCommunityIQ?.passpoint;
    setTimeout(() => {
      this.edgeSuitsForm.get('myCommunityIQ').get('passpoint').patchValue({
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
  planChange(value) {
    this.Out_System_Focus.emit(false);
    this.edgeSuitsForm.get('arloSmart').patchValue({
      '2kCameras': 0
    })
    this.ArloTitle = (value.includes('PARTNER_REGULAR')) ? "Arlo Secure Plan" : (value.includes('PARTNER_UNLIMITED')) ? 'Arlo Secure Unlimited Plan' : 'Arlo Secure Unlimited Plus Plan'
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.AllFormData && changes.AllFormData?.currentValue) {
      this.AllFormData = changes.AllFormData?.currentValue;
      this.getPasspointStatus()
      this.getSmallBizStatus()
      this.geteduroamStatus()
    }
    if (this.sys_EdgeSuites?.protectIQ?.subscribed && this.AllFormData?.status && this.AllFormData?.status !== "Pre Provisioned" && this.AllFormData?.edgeSuites?.protectIQ?.subscribed && (this.sys_EdgeSuites?.protectIQ?.agentConnected == undefined || this.sys_EdgeSuites?.protectIQ?.agentConnected)) {
      this.protectIQDisabled = false
    } else {
      this.protectIQDisabled = true;
    }
    if (this.sys_EdgeSuites?.experienceIQ?.subscribed && this.AllFormData?.status && this.AllFormData?.status !== "Pre Provisioned" && this.AllFormData?.edgeSuites?.experienceIQ?.subscribed && (this.sys_EdgeSuites?.protectIQ?.agentConnected == undefined || this.sys_EdgeSuites?.experienceIQ?.agentConnected)) {
      this.experianceIQDisabled = false
    } else {
      this.experianceIQDisabled = true;
    }

  }
  getSmallBizStatus() {
    this.sbIstatus = (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result) ? this.AllFormData?.edgeSuites?.smallBizIQ?.status?.result : '';
    this.errorStatus= (this.AllFormData?.edgeSuites?.smallBizIQ?.status?.error) ? this.AllFormData?.edgeSuites?.smallBizIQ?.status?.error : '';
    if (this.sbIstatus) {
      if (this.sbIstatus == 'pending' && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.sbIStatusMsg = 'Activation_in_Progress';
        this.sbIStatus = 'Activation_in_Progress';
        this.sbIStatusClass = 'activation-progress';
        this.enablesmallBiz = true;
        this.enablesmallBizStatus = true;
      } else if (this.sbIstatus == 'pending' && !this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_progress-circle.svg';
        this.sbIStatusMsg = 'Deactivation_in_Progress';
        this.sbIStatus = 'Deactivation_in_Progress';
        this.enablesmallBiz = true;
        this.sbIStatusClass = 'activation-progress';
        this.enablesmallBizStatus = true;
      } else if (this.sbIstatus == "succeeded" && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has been enabled';
        this.sbIStatus = '';
        this.enablesmallBiz = false;
        this.sbIStatusClass = 'success-message-info';
        this.enablesmallBizStatus = true;
      } else if (this.sbIstatus == "succeeded" && !this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_success-circle-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has been disabled';
        this.sbIStatus = '';
        this.sbIStatusClass = 'success-message-info';
        this.enablesmallBizStatus = true;
        this.enablesmallBiz = false;
      } else if (this.sbIstatus == "failed" && this.AllFormData?.edgeSuites?.smallBizIQ?.enable) {
        this.sbIStatusImg = '../../../../../../assets/img/ic_error-outline.svg';
        this.sbIStatusMsg = 'SmartBiz has failed to enable';
        this.sbIStatus = 'Failed to enable';
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
  geteduroamStatus(val?) {
    this.eduroamStatus = (this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result : val?.result;
    this.errorStatusEdurom=(this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.error) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.status?.error :val?.error ;
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
  getPasspointStatus(val?) {
    this.rgStatus = (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result : val?.result;
    this.errorStatusRg= (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.error) ? this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.status?.error : val?.error;
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

  initialize() {
    this.initializeEdgeSuits();
    this.initializeArloSmarts();
    this.initializeServyCare();
    this.initializeBark();
    this.initializeSmallBiz();
  }
  initializeSmallBiz() {
    if (this.AllFormData?.edgeSuites?.smallBizIQ && this.sys_EdgeSuites && this.sys_EdgeSuites?.smallBizIQ && this.sys_EdgeSuites?.smallBizIQ?.enable) {
      this.edgeSuitsForm.patchValue({
        smallBizIQ: {
          enable: true,
        }
      });
    } else {
      this.edgeSuitsForm.patchValue({
        smallBizIQ: {
          enable: false,
        }
      });
    }
  }
  initializeEdgeSuits() {
    let value = this.sys_EdgeSuites.arloSmart?.plan;
    if (this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.protectIQ) {
      this.protectIqPrevEnableState = this.AllFormData?.edgeSuites?.protectIQ?.enabled ? true : false;
    }
    if (this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.experienceIQ) {
      this.experianceIqPrevEnableState = this.AllFormData?.edgeSuites?.experienceIQ?.enabled;
    }

    if (this.AllFormData?.edgeSuites && Object.keys(this.AllFormData?.edgeSuites).length) {
      (this.AllFormData?.edgeSuites.myCommunityIQ?.subscriber?.communities) ? this.AllFormData.edgeSuites.myCommunityIQ.subscriber.communities = this.AllFormData?.edgeSuites?.myCommunityIQ?.subscriber?.communities?.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      (this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.communities) ? this.AllFormData.edgeSuites.myCommunityIQ.passpoint.communities = this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.communities.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      setTimeout(() => {
        this.edgeSuitsForm.patchValue(this.AllFormData?.edgeSuites);
        if (!this.sys_EdgeSuites?.arloSmart?.plan.includes('PARTNER_REGULAR')) {
          this.edgeSuitsForm.patchValue({ arloSmart: { '2kCameras': 0 } });
        }
      }, 100)
    } else if (this.sys_EdgeSuites) {
      (this.sys_EdgeSuites?.myCommunityIQ?.subscriber?.communities) ? this.sys_EdgeSuites.myCommunityIQ.subscriber.communities = this.sys_EdgeSuites?.myCommunityIQ?.subscriber?.communities?.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      (this.sys_EdgeSuites?.myCommunityIQ?.passpoint?.communities) ? this.sys_EdgeSuites.myCommunityIQ.passpoint.communities = this.sys_EdgeSuites?.myCommunityIQ?.passpoint?.communities?.map(element => {
        if (typeof (element) == 'object') {
          return element.micrositeId
        } else { return element }
      }) : null;
      setTimeout(() => {
        this.edgeSuitsForm.patchValue(this.sys_EdgeSuites);
        if (!this.sys_EdgeSuites?.arloSmart?.plan.includes('PARTNER_REGULAR')) {
          this.edgeSuitsForm.patchValue({ arloSmart: { '2kCameras': 0 } });
        }
      }, 100)
    }
  }
  initializeBark() {
    if (this.AllFormData?.edgeSuites?.bark && this.sys_EdgeSuites && this.sys_EdgeSuites?.bark && this.sys_EdgeSuites?.bark?.email) {
      this.BarkEnable = true
      this.edgeSuitsForm.patchValue({
        bark: {
          enable: true,
          email: this.sys_EdgeSuites.bark.email,
          planCode: this.sys_EdgeSuites.bark.planCode,
        }
      });
    } else {
      this.BarkEnable = false
      this.edgeSuitsForm.patchValue({
        bark: {
          enable: false,
          email: this.AllFormData?.subscriber?.email,
          planCode: '',
        }
      });
    }
  }
  initializeArloSmarts() {
    if (this.AllFormData?.edgeSuites?.arloSmart && this.sys_EdgeSuites && this.sys_EdgeSuites?.arloSmart && this.sys_EdgeSuites?.arloSmart?.email) {
      this.arloEnabled = true;
      this.ArloDisable = true;
      let value = this.sys_EdgeSuites.arloSmart?.plan;
      this.ArloTitle = (value.includes('PARTNER_REGULAR')) ? "Arlo Secure Plan" : (value.includes('PARTNER_UNLIMITED')) ? 'Arlo Secure Unlimited Plan' : 'Arlo Secure Unlimited Plus Plan'
      this.edgeSuitsForm.patchValue({ arloSmart: { enabled: this.arloEnabled, plan: this.sys_EdgeSuites.arloSmart?.plan } });
      if (!this.sys_EdgeSuites.arloSmart?.plan.includes('PARTNER_REGULAR')) {
        this.edgeSuitsForm.patchValue({ arloSmart: { '2kCameras': 0 } });
      }
      if (this.sys_EdgeSuites.arloSmart['2kCameras']) {
        this.is2KChecked = true;
      }

      // if (this.sys_EdgeSuites.arloSmart['4kCameras']) {
      //   this.is4KChecked = true;
      // }

      if (this.AllFormData && this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.arloSmart && this.AllFormData?.edgeSuites?.arloSmart?.email) {
        this.edgeSuitsForm.patchValue({ arloSmart: { email: this.AllFormData?.edgeSuites?.arloSmart?.email ? this.AllFormData?.edgeSuites?.arloSmart?.email : this.sys_EdgeSuites.arloSmart?.email } });
        this.emailDisabled = true;
      }
    } else {
      this.arloEnabled = false;
      this.ArloDisable = false;
    }

    if (this.AllFormData?.edgeSuites?.arloSmart?.userId) {
      if (this.arloEntitleEnable || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) {
        this.GetArlosmart();
      }
    } else {
      this.loadArloTables();
    }

  }
  refreshValues() {
    this.edgeSuitsForm.patchValue({ myCommunityIQ: { network: { vlanId: '' } } });
  }
  addAndRemoveNetworkGroupValidation() {
    let value = this.myCommunityControl.get('network').get('type').value;
    if (value == 'Bridge' && (this.myCommunityControl.get('eduroam')?.value?.enable || this.myCommunityControl.get('passpoint')?.value?.eneble)) {
      this.myCommunityControl.get('network').get('vlanId').addValidators(Validators.required);
      this.myCommunityControl.get('network').get('protocol').clearValidators();
      this.myCommunityControl.get('network').get('protocol').updateValueAndValidity();
    } else if (value == 'Policy_Route' && (this.myCommunityControl.get('eduroam')?.value?.enable || this.myCommunityControl.get('passpoint')?.value?.eneble)) {
      this.myCommunityControl.get('network').get('vlanId').addValidators(Validators.required);
      this.myCommunityControl.get('network').get('protocol').addValidators(Validators.required);
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
    this.myCommunityControl.get('eduroam').get('primaryServer').addValidators(Validators.pattern(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/)
    )
    this.myCommunityControl.get('eduroam').get('primaryServer').addValidators(Validators.required);
    this.radiousServerShoudNotMatchValidation();
  }

  removeValidatiorEduroamGroup() {
    this.allowEduroam = true;
    this.myCommunityControl.get('eduroam').get('secret').clearValidators();
    this.myCommunityControl.get('eduroam').get('secret').updateValueAndValidity();
    this.myCommunityControl.get('eduroam').get('primaryServer').clearValidators();
    this.myCommunityControl.get('eduroam').get('primaryServer').updateValueAndValidity()
    this.showRadiousError = false;

  }
  addValidatorForprimaryServer() {
    if (this.myCommunityControl.get('eduroam').get('primaryServer').value && !this.myCommunityControl.get('eduroam').get('primaryServer').errors) {
      this.myCommunityControl.get('eduroam').get('primaryServer').addValidators(Validators.pattern(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/))
    }
  }
  addValidatorForSecondaryServer() {
    if (this.myCommunityControl.get('eduroam').get('secondaryServer').value) {
      this.myCommunityControl.get('eduroam').get('secondaryServer').addValidators(Validators.pattern(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\])|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$|^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}[:](6553[0-4]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/))
    } else {
      this.myCommunityControl.get('eduroam').get('secondaryServer').clearValidators();
      this.myCommunityControl.get('eduroam').get('secondaryServer').updateValueAndValidity();
    }
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
      if (dateOne > dateTwo) {
        this.enablePlan = true
      } else {
        this.enablePlan = false
      }
    }
    let name =this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name.split(/(\s+)/):'';
    let firstName = name?.length ? name[0] : '';
    this.array = name? name.shift():'';
    let lastName =name? name.join(""):'';
    if (this.AllFormData?.edgeSuites?.servifyCare && this.sys_EdgeSuites && this.sys_EdgeSuites.servifyCare && this.sys_EdgeSuites.servifyCare.planCode) {
      this.servifyenabled = true;
      this.edgeSuitsForm.patchValue({
        servifyCare: {
          enabled: true,
          email: this.sys_EdgeSuites.servifyCare.email,
          firstName: this.sys_EdgeSuites.servifyCare.firstName,
          lastName: this.sys_EdgeSuites.servifyCare.lastName,
          planCode: this.sys_EdgeSuites.servifyCare.planCode,
          address: this.sys_EdgeSuites.servifyCare.address,
          city: this.sys_EdgeSuites.servifyCare.city,
          state: this.sys_EdgeSuites.servifyCare.state,
          postal: this.sys_EdgeSuites.servifyCare.postal,

        }
      });
      this.servifyDisable = true;
    } else {
      this.servifyenabled = false;
      this.servifyDisable = false;
      this.edgeSuitsForm.patchValue({
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
  }
  GetArlosmart(reload?) {
    this.arloLoading = true;
    let userID = this.sys_EdgeSuites?.arloSmart?.userId ? this.sys_EdgeSuites?.arloSmart?.userId : this.AllFormData?.edgeSuites?.arloSmart?.userId;
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
        // this.fourKPlanData = [...fourKDevices];
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

  cancel() {
    this.showPasspointNAAlert = true;
    this.lowerVersion = 'close'
  }
  cancelServify(data?) {
    this.cancelcode = '';
    this.submittedcancelcode = false;
    let name =this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name.split(/(\s+)/):'';
    let firstName = name? name[0]:'';
    this.array = name?name.shift():'';
    let lastName =name? name.join(""):'';
    this.closeAlert();
    if (this.AllFormData && this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.servifyCare) {
      this.modalRef = this.dialogService.open(this.cancelServifyModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.edgeSuitsForm.patchValue({
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
    this.Out_System_Focus.emit(false);

  }
  cancelBarkService(data?) {
    if (this.AllFormData && this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.bark && this.AllFormData?.edgeSuites?.bark?.email) {
      this.modalRef = this.dialogService.open(this.cancelBarkModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.edgeSuitsForm.patchValue({
        bark: {
          enable: false,
          email: this.AllFormData?.subscriber?.email,
          planCode: ''
        }
      });
      this.BarkEnable = false;
    }
    this.Out_System_Focus.emit(false);
    this.closeAlert();
  }
  cancelArloSecure(data?) {
    if (this.AllFormData && this.AllFormData?.edgeSuites && this.AllFormData?.edgeSuites?.arloSmart && this.AllFormData?.edgeSuites?.arloSmart?.email) {
      this.modalRef = this.dialogService.open(this.cancelArloSecureModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.edgeSuitsForm.patchValue({ arloSmart: { enabled: false, email: this.AllFormData?.subscriber?.email, '2kCameras': 0, plan: '' } })
      this.arloEnabled = false;
    }
    this.Out_System_Focus.emit(false);
    this.closeAlert();

  }
  Cancelarlo() {
    this.edgeSuitsForm.patchValue({ arloSmart: { enabled: false, email: '', '2kCameras': 0, plan: '' } });
    let formData = Object.assign({}, this.edgeSuitsForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG') && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.AllFormData?.systemId || !this.commIqEnable) {
      delete formData.myCommunityIQ?.passpoint
    }
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG' ) && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowSmallBizIQ && !formData.smallBizIQ?.enable) {
      delete formData.smallBizIQ
    }
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
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
    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }
    params.myCommunityIQ = formData.myCommunityIQ;
    if (this.opMode && this.opMode != "RG") {
      params.myCommunityIQ.passpoint.enable = false;
    }
    (params.myCommunityIQ?.subscriber?.communities?.length > 0) ? params.myCommunityIQ.subscriber.communities = params.myCommunityIQ?.subscriber?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    (params.myCommunityIQ?.passpoint?.communities?.length > 0) ? params.myCommunityIQ.passpoint.communities = params.myCommunityIQ?.passpoint?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    let arrayLength = params?.myCommunityIQ?.passpoint?.communities?.length, deletedCount = 0;
    for (let i = 0; i < arrayLength; i++) {
      let count = 0;
      for (let j = 0; j < this.communityArr?.length; j++) {
        if (params.myCommunityIQ.passpoint.communities[i].micrositeId == this.communityArr[j].id) {
          ++count;
        }
        if (((this.communityArr?.length - 1) == j) && count == 0) {
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
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
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
    if (formData?.arloSmart?.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData?.servifyCare?.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete formData?.servifyCare
    }
    this.closeAlert();
    this.cancelloading = true;
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {
      this.arloEnabled = false;
      this.is2KChecked = false;
      this.emailDisabled = false;
      this.edgeSuitsForm.patchValue({ arloSmart: { enabled: false, email: this.AllFormData?.subscriber?.email, '2kCameras': 0, plan: '' } });
      let msg = this.language['Arlo Secure Plan Data Removed successfully'];
      this.showSuccessMessage(msg);
      this.getSyetemsAllData();
      this.ArloDisable = false;
    }, (err: HttpErrorResponse) => {
      this.cancelloading = false;
      this.pageErrorHandle(err);
    })
    //this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }
  CancelBark() {
    this.edgeSuitsForm.patchValue({
      bark: {
        enable: false,
        email: '',
        planCode: ''
      }
    });
    let formData = Object.assign({}, this.edgeSuitsForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG') && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG') && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowSmallBizIQ && !formData.smallBizIQ?.enable) {
      delete formData.smallBizIQ
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (!this.AllFormData?.systemId || !this.commIqEnable) {
      delete formData.myCommunityIQ?.passpoint
    }
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
    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }
    params.myCommunityIQ = formData.myCommunityIQ;
    if (this.opMode && this.opMode != "RG") {
      params.myCommunityIQ.passpoint.enable = false;
    }
    (params.myCommunityIQ?.subscriber?.communities?.length > 0) ? params.myCommunityIQ.subscriber.communities = params.myCommunityIQ?.subscriber?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    (params.myCommunityIQ?.passpoint?.communities?.length > 0) ? params.myCommunityIQ.passpoint.communities = params.myCommunityIQ?.passpoint?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    let arrayLength = params?.myCommunityIQ?.passpoint?.communities?.length, deletedCount = 0;
    for (let i = 0; i < arrayLength; i++) {
      let count = 0;
      for (let j = 0; j < this.communityArr?.length; j++) {
        if (params.myCommunityIQ.passpoint.communities[i].micrositeId == this.communityArr[j].id) {
          ++count;
        }
        if (((this.communityArr?.length - 1) == j) && count == 0) {
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
    if (formData?.arloSmart?.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData?.servifyCare?.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
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
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete formData?.servifyCare
    }
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {
      this.BarkEnable = false;
      this.edgeSuitsForm.patchValue({
        bark: {
          enable: false,
          email: this.AllFormData?.subscriber?.email,
          planCode: ''
        }
      });
      let msg = this.language['Bark Plan Data Removed successfully'];
      this.showSuccessMessage(msg);
      this.getSyetemsAllData();
    }, (err: HttpErrorResponse) => {
      this.cancelloading = false;
      this.pageErrorHandle(err);
    })
    //this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }
  getSyetemsAllData() {
    this.systemGetSubs = this.service.getSubscribersSystemList(this.ORG_ID, this.systemInfo, true).subscribe((res: any) => {
      if (res) {
        this.AllFormData = res ? res : {};
      }
      if (this.AllFormData?.edgeSuites?.servifyCare) {
        this.servifyenabled = true
        this.servifyDisable = true
        this.CancelProcess = true
        this.edgeSuitsForm.patchValue({
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
        let name =this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name.split(/(\s+)/):'';
        let firstName =name? name[0]:'';

        this.array =name? name.shift():'';
        let lastName =name? name.join(""):'';
        this.edgeSuitsForm.patchValue({
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

      this.allFormData.emit(this.AllFormData);
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
      this.closeAllModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
      this.cancelloading = false
    })
  }
  Cancelservify() {
    this.submittedcancelcode = true;
    if (!this.cancelcode) {
      return
    }
    this.edgeSuitsForm.patchValue({
      servifyCare: {
       planCode:this.AllFormData.edgeSuites?.servifyCare?.planCode,
        reasonCode: this.cancelcode ? this.cancelcode : 'JUST_TRYING',
        cancelDate: this.planPurchaseDate(),
      }
    });
    let formData = Object.assign({}, this.edgeSuitsForm.value);
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG') && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG') && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowSmallBizIQ && !formData.smallBizIQ?.enable) {
      delete formData.smallBizIQ
    }
    if (!this.AllFormData?.systemId || !this.commIqEnable) {
      delete formData.myCommunityIQ?.passpoint
    }
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
    params.experienceIQ = {
      subscribed: formData.experienceIQ.subscribed,
      enabled: formData.experienceIQ.enabled
    }

    params.protectIQ = {
      subscribed: formData.protectIQ.subscribed,
      enabled: formData.protectIQ.enabled
    }
    params.myCommunityIQ = formData.myCommunityIQ;
    if (this.opMode && this.opMode != "RG") {
      params.myCommunityIQ.passpoint.enable = false;
    }
    (params.myCommunityIQ?.subscriber?.communities?.length > 0) ? params.myCommunityIQ.subscriber.communities = params.myCommunityIQ?.subscriber?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    (params.myCommunityIQ?.passpoint?.communities?.length > 0) ? params.myCommunityIQ.passpoint.communities = params.myCommunityIQ?.passpoint?.communities?.map(element => { if (typeof (element) == 'object' && element != null) { return element } else { return { micrositeId: element } } }) : null;
    let arrayLength = params?.myCommunityIQ?.passpoint?.communities?.length, deletedCount = 0;
    for (let i = 0; i < arrayLength; i++) {
      let count = 0;
      for (let j = 0; j < this.communityArr?.length; j++) {
        if (params.myCommunityIQ.passpoint.communities[i].micrositeId == this.communityArr[j].id) {
          ++count;
        }
        if (((this.communityArr?.length - 1) == j) && count == 0) {
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
    if (formData?.arloSmart?.enabled) {
      params['arloSmart'] = _.pickBy(formData.arloSmart, v => v !== null && v !== "" && v !== false);
      if (params['arloSmart'].enabled) delete params['arloSmart'].enabled;
      if (!params['arloSmart'].plan.includes('PARTNER_REGULAR')) delete params['arloSmart']["2kCameras"];
      // delete params['arloSmart']['2kCameras'];
      // delete params['arloSmart']['4kCameras'];
    }
    if (formData?.servifyCare?.enabled) {
      params['servifyCare'] = _.pickBy(formData.servifyCare, v => v !== null && v !== "" && v !== false);
      if (params['servifyCare'].enabled) delete params['servifyCare'].enabled;
    }

    params = _.pickBy(params, v => !(v == null || v == "" || (typeof v == 'object' && !Object.keys(v).length)));

    let paramsEnabled = _.cloneDeep(params);
    if (params.experienceIQ['enabled'] != undefined) delete params.experienceIQ['enabled'];
    if (params.protectIQ['enabled'] != undefined) delete params.protectIQ['enabled'];

    this.closeAlert();
    this.cancelloading = true;
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
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
    this.edgeSuitsUpdateSubs = this.service.updateEdgeSuitsData(this.ORG_ID, this.systemInfo, params).subscribe((res: any) => {
      let name =this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name.split(/(\s+)/):'';
      let firstName =name? name[0]:'';
      this.array = name?name.shift():'';
      let lastName = name?name.join(""):'';
      // this.edgeSuitsForm.patchValue({
      //   servifyCare: {
      //     enabled: false,
      //     email: this.AllFormData?.subscriber?.email,
      //     firstName: firstName,
      //     lastName: lastName.trim(),
      //     planCode: '',
      //     address: this.AllFormData?.subscriber?.serviceAddress,
      //     city: '',
      //     state: '',
      //     postal: '',
      //   }
      // });
      let msg = this.language['Servify Plan Data Removed successfully'];
      this.showSuccessMessage(msg);

      this.servifyenabled = false;
      this.servifyDisable = false;
      this.getSyetemsAllData();
    }, (err: HttpErrorResponse) => {
      this.cancelloading = false;
      this.cancelcode = '';
      this.pageErrorHandle(err);
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
  showConfirmMsg() {
    this.showwarning = true;
    this.removeConfirmMsg = `${this.language.removeCameraMsg()} <br>Seriel Number: ${this.removeCameraInfo.deviceId}<br>Model Number: ${this.removeCameraInfo.modelId}`;
  }

  closeConfirmMsg() {
    this.removeConfirmMsg = '';
    this.showwarning = false;
  }

  confirmDelete() {
    let userId = this.sys_EdgeSuites?.arloSmart?.userId;
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
    this.submittedcancelcode = false;
    this.cancelcode = '';
    this.loading = false;
    this.dialogService.dismissAll();
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
    this.submitted = false;
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
    this.Out_System_Focus.emit(false);
  }

  arloEnableDisable() {
    this.submitted = false;
    this.showArloEnablingError = false;
    // if (!this.arloEnabled && this.AllFormData?.edgeSuites && this.AllFormData.edgeSuites.arloSmart && this.AllFormData.edgeSuites.arloSmart?.email) {
    //   //TRYING TO ADD WHEN USER DELETED ARLO EMAIL IN UI ALONE 
    //   this.showArloEnablingError = true;
    //   setTimeout(() => {
    //     this.showArloEnablingError = false;
    //   }, 2000);
    //   return;
    // }
    this.arloEnabled = !this.arloEnabled;
    this.edgeSuitsForm.patchValue({ arloSmart: { enabled: this.arloEnabled } });
    //this.formValueChanges();
    if (this.arloEnabled) {
      let email = this.edgeSuitsForm.value.arloSmart?.email ? this.edgeSuitsForm.value.arloSmart?.email.trim() : '';
      if (!email && this.AllFormData?.subscriber && this.AllFormData?.subscriber?.email) {
        this.edgeSuitsForm.patchValue({ arloSmart: { email: this.AllFormData?.subscriber?.email } });
      }
    } else {
    }
    //this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }

  servifyEnableDisable() {
    this.submitted = false;
    this.servifyenabled = !this.servifyenabled;
    this.edgeSuitsForm.patchValue({ servifyCare: { enabled: true } })
    this.formValueChanges();
    if (this.servifyenabled) {
      if (this.AllFormData?.subscriber && !this.AllFormData?.edgeSuites?.servifyCare) {
        let name =this.AllFormData?.subscriber?.name ? this.AllFormData?.subscriber?.name.split(/(\s+)/):'';
        let firstName =name? name[0]:'';
        this.array =name? name.shift():'';
        let lastName =name? name.join(""):'';

        this.edgeSuitsForm.patchValue({ servifyCare: { email: this.AllFormData?.subscriber?.email, address: this.AllFormData?.subscriber?.serviceAddress, firstName: firstName, lastName: lastName.trim() } });
      }
    } else {
    }
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }
  BarkEnableDisable() {
    this.submitted = false;
    this.BarkEnable = !this.BarkEnable;
    this.edgeSuitsForm.patchValue({ bark: { enable: true } })
    this.formValueChanges();
    if (this.BarkEnable) {
      if (this.AllFormData?.subscriber && !this.AllFormData?.edgeSuites?.bark) {

        this.edgeSuitsForm.patchValue({
          bark: {
            enable: true,
            email: this.AllFormData?.subscriber?.email,
          }
        });
      }
    } else {
    }
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }
  arloDisable() {
    this.warningArlomessage = true;
  }
  RemoveArlo() {
    this.arloEnabled = false;
    this.is2KChecked = false;
    this.is4KChecked = false;
    this.edgeSuitsForm.patchValue({ arloSmart: { enabled: this.arloEnabled } });
    this.edgeSuitsForm.patchValue({ arloSmart: { email: '', '2kCameras': 0, '4kCameras': 0 } });
    this.emailDisabled = false;
    this.warningArlomessage = false;
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }

  EnableDisable2K() {
    this.is2KChecked = !this.is2KChecked;
    if (!this.is2KChecked) {
      this.edgeSuitsForm.patchValue({ arloSmart: { '2kCameras': 0 } });
    }
  }
  cancelDelete() {
    this.warningArlomessage = false;
  }
  EnableDisable4K() {
    this.is4KChecked = !this.is4KChecked;
    if (!this.is4KChecked) {
      this.edgeSuitsForm.patchValue({ arloSmart: { '4kCameras': 0 } });
    }
  }

  change2K() {
    let arloSmart = this.edgeSuitsForm.value.arloSmart;
    if (arloSmart['2kCameras']) {
      this.is2KChecked = true;
    } else {
      this.is2KChecked = false;
    }
  }

  change4K() {
    let arloSmart = this.edgeSuitsForm.value.arloSmart;
    if (arloSmart['4kCameras']) {
      this.is4KChecked = true;
    } else {
      this.is4KChecked = false;
    }
  }

  Emailchange(value, name) {
    if (name === 'arlo') {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailmsgarlo = "";
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      } else if (!value) {
        this.emailmsgarlo = "";
      }
      else {
        this.emailmsgarlo = "You have entered an invalid email address!";
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      }
    } else if (name === 'bark') {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailbarkmsg = "";
        this.barkEmailError = false;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      } else if (!value) {
        this.emailbarkmsg = "";
        this.barkEmailError = false;
      }
      else {
        this.emailbarkmsg = "You have entered an invalid email address!";
        this.barkEmailError = true;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      }
    } else {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        this.emailmsg = "";
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      } else if (!value) {
        this.emailmsg = "";
      }
      else {
        this.emailmsg = "You have entered an invalid email address!";
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      }
    }
  }
  servyEnableDisable() {
    this.submitted = false;
    this.servyEnabled = !this.servyEnabled;
    this.edgeSuitsForm.patchValue({ servifyCare: { enabled: this.servyEnabled } });
    if (!this.servyEnabled) {
      this.edgeSuitsForm.patchValue({ servifyCare: { tier: 0 } });
    }
    this.formValueChanges();
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.arloSmartListSubs) this.arloSmartListSubs.unsubscribe();
    if (this.deviceInfosub) this.deviceInfosub.unsubscribe();
    this.BspProvidersub?.unsubscribe();
    this.addBspsub?.unsubscribe();
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
  }
  cameraValidate(field) {
    //debugger;
    let value = this.edgeSuitsForm.value.arloSmart[field];
    //value = value ? value.trim() : '';
    if (field == '2kCameras') {
      this.arlovalue[field] = (value == null || (value != undefined && value >= 0 && value <= 50));
      if (this.arlovalue[field] === false) {
        this.arlo2kcameraError = true
      }
      else {
        this.arlo2kcameraError = false
      }
      if (this.twoKPlanData && (this.edgeSuitsForm.value.arloSmart.plan.includes('PARTNER_REGULAR'))) {
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
  planPurchaseDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let date = yyyy + '-' + mm + '-' + dd;
    this.edgeSuitsForm.patchValue({ servifyCare: { planPurchaseDate: date } })
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
    return date
  }
  openRequiredCollapse(id){
    let element = document.getElementById(id);
    if(element.className=='collapsed'){
      element.click();
    } ;
  }
  saveSystem() {
    //debugger;
    this.addAndRemoveNetworkGroupValidation()
    this.edgeSuitsForm.patchValue({
      servifyCare: {
        reasonCode: '',
        cancelDate: ''
      }
    })

    this.formValueChanges();
    this.planPurchaseDate();
    this.submitted = true;
    let formData = this.edgeSuitsForm.value;
    let arloError = false;
    if (formData.myCommunityIQ?.network?.vlanId) {
      this.lanValidate('vlanId')
    }
    // if((formData.myCommunityIQ?.network?.type == 'Bridge' || formData.myCommunityIQ?.network?.type == 'Route')){
    //  delete formData.myCommunityIQ?.network?.protocol 
    // }

    if (this.IQ_SuiteEnable && this.smallBizIQentitlement && (!this.opMode || this.opMode === 'RG' ) && this.allowSmallBiz && this.AllFormData?.systemId) {
    } else {
      delete formData.smallBizIQ
    }
    if (!this.allowSmallBizIQ && !formData.smallBizIQ?.enable) {
      delete formData.smallBizIQ
    }
    if (!this.allowRGCommunity && !formData.myCommunityIQ?.passpoint?.enable) {
      delete formData.myCommunityIQ.passpoint
    }
    if (!this.allowEduroam && !formData.myCommunityIQ?.eduroam?.enable) {
      delete formData.myCommunityIQ?.eduroam;
    }
    if (!this.AllFormData?.systemId || !this.commIqEnable) {
      delete formData.myCommunityIQ?.passpoint
    }
    if ((formData.myCommunityIQ?.passpoint?.enable || formData?.myCommunityIQ?.eduroam?.enable) && formData.myCommunityIQ?.network?.type !== 'Route') {
      if (!formData.myCommunityIQ?.network?.vlanId) {
         this.openRequiredCollapse('collapseMyCommunityIQToggle');
         return
      }
    }
    if ((formData.myCommunityIQ?.passpoint?.enable || formData?.myCommunityIQ?.eduroam?.enable) && formData.myCommunityIQ?.network?.type == 'Policy_Route') {
      if (!formData.myCommunityIQ?.network?.protocol) {
        this.openRequiredCollapse('collapseMyCommunityIQToggle');
        return
      }
    }
    if (formData?.myCommunityIQ?.eduroam?.enable && this.showRadiousError){ 
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return
    };
    // if (formData.myCommunityIQ.passpoint?.network?.customerVlanId) {
    //   this.lanValidate('customerVlanId')
    //|| !this.myCommunityIQ.customerVlanId
    // }
    if (this.edgeSuitsForm.get('myCommunityIQ').invalid) {
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return;
    }
    if (this.edgeSuitsForm.value?.arloSmart?.enabled && !this.edgeSuitsForm.value?.arloSmart?.plan) {
      this.openRequiredCollapse('collapseArloSecureToggle');
      return
    }
    if (!this.myCommunityIQ.vlanId) {
      this.openRequiredCollapse('collapseMyCommunityIQToggle');
      return
    }
    if (formData.bark.enable) {
      this.Emailchange(formData.bark.email, 'bark');
      if (!formData.bark.email || !formData.bark.planCode || this.barkEmailError) {
        this.openRequiredCollapse('collapseBarkToggle');
        return
      }
    }
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
      if (formData.arloSmart['2kCameras'] != null && formData.arloSmart['2kCameras'] != undefined) {
        if (formData.arloSmart.plan.includes('PARTNER_REGULAR')) {
          this.cameraValidate('2kCameras');
          this.arlo2kcameraError = !this.arlovalue['2kCameras'];
        }else{
          this.arlo2kplanError=false
        }
      }
      //|| !this.myCommunityIQ.customerVlanId 
      if (this.arlo2kcameraError == true || this.arlo2kplanError || !this.myCommunityIQ.vlanId || !formData.arloSmart.plan) {
        if(this.arlo2kcameraError == true || this.arlo2kplanError || !formData.arloSmart.plan){
          this.openRequiredCollapse('collapseArloSecureToggle');
        }else {
          this.openRequiredCollapse('collapseMyCommunityIQToggle');
        }
        this.errorInfo = `Please fill all required fields with valid data`;
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);

        return
      }
    }
    if (this.servifyenabled === true) {
      this.Emailchange(formData.servifyCare.email, 'servify');
      this.allowOnlyNumbers(formData.servifyCare.postal)
      if (this.ziperr) {
        return
      }
      if (!formData.servifyCare.planCode || !formData.servifyCare.email || !formData.servifyCare.firstName || !formData.servifyCare.lastName || !formData.servifyCare.address || !formData.servifyCare.city || !formData.servifyCare.state || !formData.servifyCare.postal) {
        this.openRequiredCollapse('collapseServifyCareToggle');
        return
      } else {
        this.edgeSuitsForm.patchValue({ servifyCare: { enabled: true } })
      }
    }

    let updateEnabled: any = {
      protectIQ: false,
      experienceIQ: false
    };

    //(this.protectIqPrevEnableState != this.sys_EdgeSuites.protectIQ.enabled) ? this.updateApplicationService("protectIQ") : "";
    //(this.experianceIqPrevEnableState != this.sys_EdgeSuites.experienceIQ.enabled) ? this.updateApplicationService("experienceIQ") : ""
    let arrayLength = (this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communities?.length) ? this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communities?.length : 0, deleteCount = 0;
    if (!this.myCommunityControl.value.subscriber.enable) {
      this.subscriberMembershipList = [];
      this.SubscriberCommunityArr = Object.assign([], this.communityArr);
      this.myCommunityControl.get('subscriber').patchValue({
        communities: [],
        communitiesDuplicate: []
      })
    };
    if (!this.myCommunityControl.get('passpoint').value.enable) {
      this.rgMembershipList = [];
      this.rgCommunityArr = Object.assign([], this.communityArr);
      this.myCommunityControl.get('passpoint').patchValue({
        communities: [],
        communitiesDuplicate: [],
        network: {
          vlanId: '',
        }
      })
    }
    for (let i = 0; i < arrayLength; i++) {
      let count = 0;
      for (let j = 0; j < this.communityArr?.length; j++) {
        if (typeof (this.edgeSuitsForm.value.myCommunityIQ.subscriber.communities[i]) == "object" && this.edgeSuitsForm.value.myCommunityIQ.subscriber.communities[i] !== null) {
          if (this.edgeSuitsForm.value.myCommunityIQ.subscriber.communities[i].micrositeId == this.communityArr[j].id) {
            ++count;
          }
        } else if (this.edgeSuitsForm.value.myCommunityIQ.subscriber.communities[i] == this.communityArr[j].id) {
          ++count;
        }

        if (((this.communityArr?.length - 1) == j) && count == 0) {
          this.edgeSuitsForm.value.myCommunityIQ.subscriber.communities.splice((i - deleteCount), 1);
          deleteCount++;
        }
      }

    }
    if (this.protectIqPrevEnableState != this.sys_EdgeSuites.protectIQ.enabled && !this.protectIQDisabled) {
      updateEnabled.protectIQ = true;
    }
    if (this.experianceIqPrevEnableState != this.sys_EdgeSuites.experienceIQ.enabled && !this.experianceIQDisabled) {
      updateEnabled.experienceIQ = true;
    }
    if ((!this.opMode || this.opMode === 'RG') && this.myCommunityControl.get('passpoint').value.enable && this.myCommunityControl.get('network').value.type == 'Bridge') {
      if (!this.myCommunityControl.get('network').value.vlanId) {
        this.myCommunityIQ.vlanId = false;
        this.openRequiredCollapse('collapseMyCommunityIQToggle');
        return
      }
    }
    if (this.edgeSuitsForm?.value?.myCommunityIQ?.subscriber?.enable) {
      if (this.edgeSuitsForm?.value?.myCommunityIQ?.subscriber?.communities?.length == 0) {
        this.subscriberError = true;
        this.openRequiredCollapse('collapseMyCommunityIQToggle');
        return;
      } else {
        this.subscriberError = false;
      }
    }
    if (this.AllFormData?.edgeSuites?.servifyCare?.cancelDate) {
      delete formData?.servifyCare
    }
    if (!((!this.opMode || this.opMode === 'RG') && this.AllFormData?.systemId)) {
      if (formData?.myCommunityIQ?.passpoint) delete formData?.myCommunityIQ?.passpoint;
      if (formData?.myCommunityIQ?.network) delete formData?.myCommunityIQ?.network;
      if (formData?.myCommunityIQ?.eduroam) delete formData?.myCommunityIQ?.eduroam;
      delete formData?.myCommunityIQ?.prioritizeTraffic;

    }
    if((this.opMode && this.opMode !== 'RG') || !this.allowSmallBiz){
      delete formData?.smallBizIQ
    }
    this.out_sys_edge_suits_submit.emit(updateEnabled);
    this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value);
  }
  
  closeAlert() {
    this.error = false;
    this.success = false;
    this.arloError = false;
    this.showwarning = false;
  }
  preventPastingWrongValues(event) {
    const text = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (/^\d/.test(text) || text > 4093) event.preventDefault();
  }
  allowOnlyNumbers(value) {
    if (!this.HOSTDATA) {
      if (/^[0-9]{5}/.test(value)) {
        this.zipMsg = "";
        this.ziperr = false;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      } else if (!value) {
        this.zipMsg = "";
      }
      else {
        this.zipMsg = "You have entered an invalid ZIP Code!";
        this.ziperr = true;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      }
    } else {
      if (/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]●?[0-9][A-Z][0-9]$/.test(value)) {
        this.PostalMsg = "";
        this.ziperr = false;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      } else if (!value) {
        this.PostalMsg = "";
      }
      else {
        this.PostalMsg = "You have entered an invalid Postal Code!";
        this.ziperr = true;
        this.Out_sys_EdgeSuites.emit(this.edgeSuitsForm.value)
        return
      }
    }

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
  closeSmb(){
    this.showsmbNAAlert=false;
  }
  getScopes() {
    if (this.sso.checFoundationScope(AcessModifiers.READ) || this.sso.checFoundationScope(AcessModifiers.WRITE)) {
      this.scopeFlag.arlo = true;
      this.scopeFlag.iqsuits = true;
    }
    /*    this.scopeFlag = {
         arlo: true,
         iqsuits: true
       } */
  }

  updateApplicationService(appName) {
    let deviceSubDetails = {
      app: appName,
      enable: this.edgeSuitsForm.value[appName].enabled
    }
    this.service.updateEnableApp(this.ORG_ID, this.systemInfo, deviceSubDetails).subscribe((data: any) => {
      setTimeout(() => {
        // will be executed after the specified time
      }, 10000);
    }, err => {
      //this.pageErrorHandle(err);
    })
  }
  deleteType: string;
  openCommunityDeleteModal(item, content, type) {
    this.dialogService.open(content, { size: 'md' })
    this.deleteId = item.id;
    this.deleteType = type;
  }
  DeleteMicrosite(modal) {
    let deleteItem: any, dropDownArr: any, formArray: any;
    if (this.deleteType == 'subscriber') {
      deleteItem = this.subscriberMembershipList;
      dropDownArr = this.SubscriberCommunityArr;
      formArray = this.edgeSuitsForm.value.myCommunityIQ?.subscriber?.communities;
      this.refresh = false;
    } else {
      deleteItem = this.rgMembershipList;
      dropDownArr = this.rgCommunityArr;
      formArray = this.edgeSuitsForm.value.myCommunityIQ?.passpoint?.communities;
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
    this.Out_System_Focus.emit(false);
    modal.dismiss();
  }
  allowNumberOnly(event) {
    if (event.key === '-' || event.key === '.' || event.target.value.length > 3 || /[^\d]/.test(event.key)) { event.preventDefault(); }
  }
  allowNumberOnly2kCamera(event) {
    if (event.key === '-' || event.key === '.' || event.target.value.length > 1) { event.preventDefault(); }
  }
  refreshRGstatus() {
    this.loading = true;
    this.service.getPasspointStatus(this.ORG_ID, this.AllFormData?.systemId).subscribe((res: any) => {
      if (this.AllFormData.edgeSuites.myCommunityIQ?.passpoint) {
        this.AllFormData.edgeSuites.myCommunityIQ.passpoint.status.result = res?.passpoint?.status?.result;
      }
      if (this.AllFormData.edgeSuites.myCommunityIQ?.eduroam) {
        this.AllFormData.edgeSuites.myCommunityIQ.eduroam.status.result = res?.eduroam?.status?.result;
      }

      this.loading = false;
      this.getPasspointStatus(res?.passpoint?.status);
      this.geteduroamStatus(res?.eduroam?.status)
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  refreshSmallBiz() {
    this.loading = true;
    this.service.getsmallBizStatus(this.ORG_ID, this.AllFormData?.systemId).subscribe((res: any) => {
      this.AllFormData.edgeSuites.smallBizIQ.status.result = res.status.result;
      this.loading = false;
      this.getSmallBizStatus();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }
  calculateMaximumSelect(type) {
    if (type == 'passpoint') {
      return (this.rgMembershipList.length + ((this.myCommunityControl?.get('passpoint')?.value?.communitiesDuplicate?.length) ? this.myCommunityControl.get('passpoint').value.communitiesDuplicate.length : 0)) < 16 ? 16 : 0;
    } else if (type == 'subscriber') {
      return (this.subscriberMembershipList.length + ((this.myCommunityControl?.get('subscriber')?.value?.communitiesDuplicate?.length) ? this.myCommunityControl.get('subscriber').value.communitiesDuplicate.length : 0)) < 8 ? 8 : 0;
    }
  }
}
