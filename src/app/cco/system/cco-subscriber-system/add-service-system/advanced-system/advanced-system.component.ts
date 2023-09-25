import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { MetaField } from 'src/app/support/shared/models/ssid-meta-fields.model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { DeviceGroupService } from 'src/app/support/netops-management/operations/services/device-group.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import _ from 'lodash';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DEVICE_RG_MODEL_COLLECTIONS, DEVICE_WEP_MODEL_COLLECTIONS, DEVICE_MANAGE_MODEL_COLLECTIONS, DEVICE_MODAM_MODEL_COLLECTIONS, SubscriberManagement } from 'src/app/support/netops-management/subscriber-management/subscriber.constants';
import { ILanPortModel, ISettingsModel, IwifiSSIDModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { AdvancedSystemOntComponent } from '../advanced-system-ont/advanced-system-ont.component';
import { constructSecurityValues, ssidMetaPattern, SSIDNamePattern, wifiFetchSecurityOptionsFromSSIDMeta } from 'src/app/support/shared/service/utility.class';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { AddSubscriberService } from '../add-subscriber.service';

@Component({
  selector: 'app-advanced-system',
  templateUrl: './advanced-system.component.html',
  styleUrls: ['./advanced-system.component.scss']
})
export class AdvancedSystemComponent implements OnInit, OnDestroy {

  dataTest: any;
  Enable = new FormControl(false);
  protectiq = false;
  language;
  languageSubject;
  enable_toggle: boolean = false;
  isSIPVoiceServiceType: boolean = false;
  isFormDisabled: boolean;
  tempSecurityOptions: any[];
  six_Ghz_SecurityOptions: any[];
  unifiedSSID_SecurityOptions: any[];
  @Input() isPreProvistionedSystem;
  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() formOptions;
  @Input() servicesListData;
  @Input() formData;
  @Input() iId;
  @Input() systemId;
  @Input() deviceData;
  @Input() deviceDataList: any[];
  @Input() deviceModels: any[];
  @Input() systemInfoData: any;
  @Input() ontDevice
  @Input() wifiObj: any;
  @Input() addDevObj: any;
  @Input() disableSystem
  @Input() editMode: any;
  @Input() tempWifiObj: any;
  @Output() private Out_Data_Change: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Data_Submit: EventEmitter<any> = new EventEmitter();
  @Output() private Out_System_Info: EventEmitter<any> = new EventEmitter();
  @Output() private Out_unsavedData: EventEmitter<any> = new EventEmitter();
  @Output() private Out_wifiNotchanged: EventEmitter<any> = new EventEmitter();
  @Output() private Out_WiFi_Info: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Unified: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Lan_Info: EventEmitter<any> = new EventEmitter();
  @ViewChild(AdvancedSystemOntComponent) childAdvancedONT: AdvancedSystemOntComponent;
  switchedWifiSSIDRadio: string = 'FiveGRadio'
  UnifiedWiFiSID: boolean = false;
  showUnifiedPrimarySSID: boolean = false;
  showUnifiedWiFiSIDtoggle: boolean = false;
  servicetierForm: FormGroup;
  test1: boolean;
  sample_check1: boolean;
  dataShowAllFields: boolean = false;
  Shown: boolean;
  vlanErrorMsg: string;
  vlanErrorMsg2: string;
  emailmsg: string;
  submitted: boolean;
  metaData2G: any = {};
  metaData5G: any = {};
  metaData6G: any = {};
  isSIPVoiceServiceType1: boolean = false;
  isSIPVoiceServiceType2: boolean = false;
  opModeWritable: any = [];
  dataEnable: boolean;
  VideoEnable: boolean;
  isSSID6_4GZ: boolean = true;
  checkEnableBtnList = ['protectiq', 'Voice', 'Video', 'Voice-L2'];
  getAllProfileSubscribe: any;
  ORG_ID: any;
  allProfileList: any;
  errorInfo: any;
  getAllDialPlanSubscribe: any;
  error: boolean;
  loading: boolean;
  dialPlanList: any;
  videoShowAllFields: boolean;
  advanceSettingsLbl: string = 'Show Advanced Settings';
  isShowAdvSetting: boolean = false;
  addressingTypeItems = ['DHCP', 'Static'];
  voiceParam = ['GR-909', 'ANSI', 'ETSI-PSTN', 'Manual'];
  isAddressTypeStatic: boolean;
  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' },
    { label: 'TDM GW', value: 'X_000631_TDMGW' }
  ];

  voiceFormValidate: any = {
    X_CALIX_SXACC_RG_WAN: {
      ExternalIPAddress: true,
      SubnetMask: true,
      DefaultGateway: true,
      DNSServers: true,
    },
    X_000631_Opt81ClientFQDN: true
  };

  lineFormValidate = {
    1: {
      //Enable: false,
      SIP: {
        AuthUserName: true,
        AuthPassword: true,
        URI: true,
      },
      X_000631_H248: {
        TerminationId: true
      },
      MGCP: {
        X_000631_GR303: true
      },
      X_000631_TdmGw: {
        Crv: true
      },
      CallingFeatures: {
        CallWaitingEnable: true,
        X_000631_ThreewayCallingEnable: true,
        MWIEnable: true,
        X_000631_DirectConnectEnable: true,
        X_000631_DirectConnectNumber: true,
        X_000631_DirectConnectTimer: true
      },
      VoiceProcessing: {
        systemLoss: true,
        ReceiveGain: true,
        TransmitGain: true
      }
    },
    2: {
      //Enable: false,
      SIP: {
        AuthUserName: true,
        AuthPassword: true,
        URI: true,
      },
      X_000631_H248: {
        TerminationId: true
      },
      MGCP: {
        X_000631_GR303: true
      },
      X_000631_TdmGw: {
        Crv: true
      },
      CallingFeatures: {
        CallWaitingEnable: true,
        X_000631_ThreewayCallingEnable: true,
        MWIEnable: true,
        X_000631_DirectConnectEnable: true,
        X_000631_DirectConnectNumber: true,
        X_000631_DirectConnectTimer: true
      },
      VoiceProcessing: {
        systemLoss: true,
        ReceiveGain: true,
        TransmitGain: true
      }
    }
  };
  videoFormValidate: any = {
    BwProfile: true,
    Enable: true,
    VlanId: true,
    Pbit: true
  };

  dataFormValidate: any = {
    Enable: true,
    VlanId: true,
    Pbit: true,
    BwProfile: true,
    pppoe: {
      Username: true,
      Password: true
    }
  };

  userNameErrorMsg: string;
  systemLoss: any;
  ReceiveGain: number;
  TransmitGain: number;
  gainErrorMsg: any;
  serviceLabel: string;
  WAPmode: boolean;
  ModemMode: boolean;
  modelForm: FormGroup;
  systemInfoForm: FormGroup;
  staticGroupError: boolean;
  isStatic: boolean;
  isRgBtnShow: boolean;
  isMangeBtnShow: boolean;
  isWapBtnShow: boolean;
  fpLoader: boolean;
  isModemBtnShow: any;
  readonly rgBtnArray: Array<any> = DEVICE_RG_MODEL_COLLECTIONS;
  readonly wapBtnArray: Array<string> = DEVICE_WEP_MODEL_COLLECTIONS
  readonly manageBtnArray: Array<string> = DEVICE_MANAGE_MODEL_COLLECTIONS;
  readonly modemBtnArray: Array<string> = DEVICE_MODAM_MODEL_COLLECTIONS;
  addDeviceTab: SubscriberManagement[];
  wapModeWarning: boolean = false;
  showSSIDOption: boolean = true;
  isSSID2_4GZ: boolean;
  isSSID5_4GZ: boolean;
  switchedWifiSSID: string = '2.4GHz Primary SSID';

  addDeviceObj: any = {
    settings: {}
  };
  private _addDeviceObj: any = {};
  showLanSettings: boolean;
  ManagedONTMode: boolean;
  security: any = [];
  hidepwd: boolean = true;
  wifiAndSettingsAvail: boolean;
  ONTmode: boolean;
  discoveredDevice: boolean = false;
  getstatussub: any;
  hideRadioButton: boolean;
  discoverdedONt: boolean = false;
  unsaveddata: boolean;
  ftrProperties: any;
  wifiNotchanged: boolean;
  DisableWifiSSID: boolean = false;
  constructor(
    private translateService: TranslateService,
    private dataService: FoundationDataService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private deviceService: DeviceGroupService,
    private service: FoundationManageService,
    private http: HttpClient,
    private profileService: ProfileService,
    public ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private systemService: AddSubscriberService,
    private commonFunc: CommonFunctionsService,
    private uriValidate: UriValidatorService
  ) {
    this.ORG_ID = this.ssoService.getOrgId();
    //this.servicetierForm.ServiceType
  }


  ngOnInit(): void {
    //debugger;
    if (!this.disableSystem) {
      this.disableSystem = false;
    }
    if (this.systemId) {
      this.provosionrecord()
      this.devicedetails()
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    this.systemInfoForm = new FormGroup({
      modelName: new FormControl(''),
      opMode: new FormControl(),
      static: new FormControl(false),
      staticGroupList: new FormControl([]),
    })

    this.servicetierForm = new FormGroup({
      configuredService: new FormControl(''),
      data: new FormGroup({
        Enable: new FormControl(false),
        VlanId: new FormControl(''),
        Pbit: new FormControl(),
        BwProfile: new FormControl(null),
        pppoe: new FormGroup({
          Username: new FormControl(''),
          Password: new FormControl('')
        })
      }),
      video: new FormGroup({
        BwProfile: new FormControl(null),
        Enable: new FormControl(false),
        VlanId: new FormControl(''),
        Pbit: new FormControl()
      }),
      voice: new FormGroup({
        ServiceType: new FormControl('SIP'),
        DialPlan: new FormControl('system-default'),
        FaxT38: new FormGroup({
          Enable: new FormControl(false),
        }),
        X_CALIX_SXACC_RG_WAN: new FormGroup({
          ServiceConnectionType: new FormControl('DHCP'),
          ExternalIPAddress: new FormControl(''),
          SubnetMask: new FormControl(''),
          DefaultGateway: new FormControl(''),
          DNSServers: new FormControl(''),
        }),
        X_000631_Opt81ClientFQDN: new FormControl(''),
        Line: new FormGroup({
          1: new FormGroup({
            Enable: new FormControl(false),
            SIP: new FormGroup({
              AuthUserName: new FormControl(''),
              AuthPassword: new FormControl(''),
              URI: new FormControl(''),
            }),
            X_000631_H248: new FormGroup({
              TerminationId: new FormControl('')
            }),
            MGCP: new FormGroup({
              X_000631_GR303: new FormControl(false)
            }),
            X_000631_TdmGw: new FormGroup({
              Crv: new FormControl('')
            }),
            CallingFeatures: new FormGroup({
              CallWaitingEnable: new FormControl(false),
              CallerIDEnable: new FormControl(false),
              X_000631_ThreewayCallingEnable: new FormControl(false),
              MWIEnable: new FormControl(false),
              X_000631_DirectConnectEnable: new FormControl(false),
              X_000631_DirectConnectNumber: new FormControl(''),
              X_000631_DirectConnectTimer: new FormControl()
            }),
            VoiceProcessing: new FormGroup({
              systemLoss: new FormControl('ANSI'),
              TransmitGain: new FormControl(-3),
              ReceiveGain: new FormControl(-9)
            })
          }),
          2: new FormGroup({
            Enable: new FormControl(false),
            SIP: new FormGroup({
              AuthUserName: new FormControl(''),
              AuthPassword: new FormControl(''),
              URI: new FormControl(''),
            }),
            X_000631_H248: new FormGroup({
              TerminationId: new FormControl('')
            }),
            MGCP: new FormGroup({
              X_000631_GR303: new FormControl(false)
            }),
            X_000631_TdmGw: new FormGroup({
              Crv: new FormControl('')
            }),
            CallingFeatures: new FormGroup({
              CallWaitingEnable: new FormControl(false),
              CallerIDEnable: new FormControl(false),
              X_000631_ThreewayCallingEnable: new FormControl(false),
              MWIEnable: new FormControl(false),
              X_000631_DirectConnectEnable: new FormControl(false),
              X_000631_DirectConnectNumber: new FormControl(''),
              X_000631_DirectConnectTimer: new FormControl()
            }),
            VoiceProcessing: new FormGroup({
              systemLoss: new FormControl('ANSI'),
              TransmitGain: new FormControl(-3),
              ReceiveGain: new FormControl(-9)
            })
          })
        })
      })
    });

    setTimeout(() => {
      this.setInitialData();
    }, 100);
    setTimeout(() => {
      this.getFeatureAPI();
    }, 2000);
  }
  provosionrecord() {
    ////debugger;
    this.loading = true;
    this.service.getProvisionrecord(this.ORG_ID, this.systemId).subscribe((res: any) => {
      //this.provisionData = res ? res : [];
      if (res) {
        this.wifiObj = res?.wifi
        if (this.wifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]) {
          this.wifiObj["UNIFIED_PRIMARY_SSID"] = this.wifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"];
        }
        this.tempWifiObj = res?.wifi;
      }
      this.addDeviceObj = {
        deviceMode: this.systemInfoData?.opMode ? this.systemInfoData?.opMode : "RG",
        isDisableModel: false,
        isStaticGroup: "No",
        regId: this.systemId,
        selectedModel: this.systemInfoData.modelName ? this.systemInfoData.modelName : undefined,
        wifiSSID: Object.keys(this.wifiObj).length ? this.patchWifiData() : this.initSeriveObjects('WIFI'),
        settings: (this.addDevObj.settings && Object.keys(this.addDevObj.settings).length) ? this.addDevObj.settings : this.initSeriveObjects('Settings')
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  devicedetails() {
    this.loading = true;
    this.service.getDeviceInfo(this.ORG_ID, this.systemId).subscribe((res: any) => {
      //this.deviceData = res ? res : {};
      if (res) {
        this.DisableWifiSSID = res?.bSmbMode
        this.discoveredDevice = true;
        this.systemInfoForm.patchValue({ modelName: res?.modelName, opMode: res?.opMode });
        if (res?.opMode === 'WAP') {
          this.isRgBtnShow = false;
          this.isWapBtnShow = true;
          this.isModemBtnShow = false;
        }

        if (res?.modelName) {
          this.discoverdedONt = true;
          let params = {
            orgId: this.ssoService.getOrgId(),
            serialNumber: res.serialNumber ? encodeURIComponent(res.serialNumber) : undefined,
          }

          let query = "";
          for (var key in params) {

            if (params[key] == undefined) {
              continue;
            }

            if (query != "") {
              query += "&";
            }

            query += key + "=" + encodeURIComponent(params[key]);

          }

          this.getFeatureProperties(res?.modelName, false, query, res?.serialNumber);

        }
      }
      if (this.discoveredDevice === true) {
        this.modelnoteditable = true
      }
      if (this.isPreProvistionedSystem) {
        this.OntDetails();
      }
      this.Out_System_Info.emit(this.systemInfoForm.value);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  OntDetails() {
    this.getstatussub = this.systemService.getOntDeviceStatus(this.systemId).subscribe((res: any) => {
      if (res?.ontDevices?.length > 0) {
        this.discoveredDevice = true;
        this.systemInfoForm.patchValue({ modelName: res?.ontDevices[0].discoveredModel });
        this.systemInfoData.modelName = this.systemInfoData?.modelName ? this.systemInfoData?.modelName : res?.ontDevices[0].discoveredModel
      }
      if (this.discoveredDevice === true) {
        this.modelnoteditable = true
      }
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    })
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.getstatussub) this.getstatussub.unsubscribe();

    if (!this.ManagedONTMode) {
      this.Out_Data_Change.emit(this.servicetierForm.value);
    } else {
      this.Out_Data_Change.emit(this.ontServices);
    }

    this.systemInfochange();
    if (this.addDeviceObj?.settings) {
      this.Out_Lan_Info.emit(this.addDeviceObj.settings);
    }

    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    //debugger;
    if (changes.servicesListData && changes.servicesListData.currentValue) {
      this.servicesListData = changes.servicesListData.currentValue;
      this.setServicesData();
    }
    if (changes.systemInfoData && changes.systemInfoData.currentValue) {
      this.systemInfoData = changes.systemInfoData.currentValue;
      //this.initializeSystemInfo();
    }

  }
  showPass() {
    this.hidepwd = !this.hidepwd;
  }
  setInitialData() {
    this.Brandwidthitems = this.formOptions?.Brandwidthitems ? this.formOptions?.Brandwidthitems : [];
    this.DialPlanitems = this.formOptions?.DialPlanitems ? this.formOptions?.DialPlanitems : [];
    // 
    // this.voiceServiceTypeChange('SIP');

    if (this.systemInfoData?.opMode === "WAP") {
      this.WAPmode = true;
    } else if (this.systemInfoData?.opMode === "Modem") {
      this.ModemMode = true;
    } else if (this.systemInfoData?.opMode === "Managed ONT") {
      this.ManagedONTMode = true;
    }
    else {
      this.WAPmode = false;
      this.ModemMode = false;
      this.ManagedONTMode = false;
    }
    this.setInitializeSSID();
    this.initializeSystemInfo();

    if (!this.ManagedONTMode) {
      if (this.sys_ServiceTiers) {
        this.servicetierForm.patchValue(this.sys_ServiceTiers);
      }
      this.initialize();
    }


    this.serviceList = [
      {
        name: 'SIP',
        value: 'SIP',
      },
      {
        name: 'H.248',
        value: 'H.248',
      },
      {
        name: 'MGCP',
        value: 'MGCP',
      },
      {
        name: 'TDM GW',
        value: 'TDM GW',
      },
    ]
    this.priorityItems = [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ];

    this.AddressingTypeitems = [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
    ];
  }

  initialize() {
    //debugger;
    if (this.sys_ServiceTiers?.configuredService === "No") {
      this.servicetierForm.patchValue({ configuredService: 'No' })
    }
    else {
      this.servicetierForm.patchValue({ configuredService: 'Yes' })
    }
    this.dataInitialize();
    this.voiceInitialize();
    this.videoInitialize();
  }

  initializeSystemInfo() {

    if (this.systemInfoData) {
      this.systemInfoForm.patchValue(this.systemInfoData);
      if (this.systemInfoData?.opMode === "WAP") {
        this.WAPmode = true;
      } else if (this.systemInfoData?.opMode === "Modem") {
        this.ModemMode = true;
      } else if (this.systemInfoData?.opMode === "Managed ONT") {
        this.ManagedONTMode = true;
      } else if (this.systemInfoData?.opMode === "ONT") {
        this.systemInfoForm.patchValue({ modelName: this.systemInfoData.modelName, opMode: this.systemInfoData?.opMode });
        this.ONTmode = true;
        this.modelnoteditable = true;
      } else {
        this.WAPmode = false;
        this.ModemMode = false;
        this.ManagedONTMode = false;
        this.ONTmode = false;
      }

      if (this.systemInfoData?.opMode === 'WAP') {
        this.WAPmode = true;
        this.isRgBtnShow = false;
        this.isWapBtnShow = true;
        this.isMangeBtnShow = false;
        this.isModemBtnShow = false;
        this.ONTmode = false;
        this.hideRadioButton = true
      }


    }
  }

  getFeatureAPI() {
    if (!this.discoverdedONt && this.systemInfoData?.modelName && this.systemInfoData?.opMode !== 'ONT') {
      this.getFeatureProperties(this.systemInfoData?.modelName, false);
    } else {
      this.loading = false
    }
  }

  dataInitialize() {
    if (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.Enable) {
      this.dataShowAllFields = true;
    } else {
      this.dataShowAllFields = false;
    }
    if (this.disableSystem) {
      this.servicetierForm.patchValue({
        data: {
          Enable: false, VlanId: '',
          Pbit: null,
          BwProfile: null,
          pppoe: {
            Username: '',
            Password: ''
          }
        }

      })
      this.dataShowAllFields = false;
    }
    if (!this.sys_ServiceTiers || !Object.keys(this.sys_ServiceTiers).length || (this.sys_ServiceTiers?.data && !Object.keys(this.sys_ServiceTiers?.data).length)) {
      this.servicetierForm.patchValue({ data: { Enable: false } });
      this.servicetierChange();
    }
    this.Out_Data_Change.emit(this.servicetierForm.value)
  }

  voiceInitialize() {
    this.systemlossChange();
    this.addressTypeChange();
    if ((this.sys_ServiceTiers?.voice?.ServiceType && this.sys_ServiceTiers?.voice?.ServiceType == 'SIP') || (this.sys_ServiceTiers && !Object.keys(this.sys_ServiceTiers).length) || !this.sys_ServiceTiers) {
      this.voiceServiceTypeChange('SIP');
    } else {
      this.voiceServiceTypeChange();
    }

    if (this.sys_ServiceTiers.voice?.Line['1']?.Enable && (this.sys_ServiceTiers.voice?.Line['1']?.Enable == 'Enabled' || this.sys_ServiceTiers.voice?.Line['1']?.Enable == true)) {
      this.servicetierForm.patchValue({
        voice: {
          Line: {
            '1': {
              Enable: true
            }
          }
        }
      });
    } else {
      this.servicetierForm.patchValue({ voice: { Line: { '1': { Enable: false } } } });
    }

    if (this.sys_ServiceTiers.voice?.Line['2']?.Enable && (this.sys_ServiceTiers.voice?.Line['2']?.Enable == 'Enabled' || this.sys_ServiceTiers.voice?.Line['2']?.Enable == true)) {
      this.servicetierForm.patchValue({
        voice: {
          Line: {
            '2': {
              Enable: true
            }
          }
        }
      });
    } else {
      this.servicetierForm.patchValue({ voice: { Line: { '2': { Enable: false } } } });
    }
    this.EnableVoiceLine(1);
    this.EnableVoiceLine(2);
  }

  videoInitialize() {
    if (this.sys_ServiceTiers.video?.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
    }
    if (this.disableSystem) {
      this.servicetierForm.patchValue({
        video: {
          Enable: false, Pbit: null,
          BwProfile: null,
        }
      });
    }
    this.Out_Data_Change.emit(this.servicetierForm.value)
  }

  get f() {
    return this.servicetierForm.controls;
  }

  changeConfigure() {
    this.voiceServiceTypeChange('SIP');
    if (this.servicetierForm.value.configuredService == 'No') {
      this.servicetierChange();
    }
  }

  addressTypeChange() {
    if (this.servicetierForm.value.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType && this.servicetierForm.value.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType == 'Static') {
      this.isAddressTypeStatic = true;
    } else {
      this.isAddressTypeStatic = false;
      this.servicetierForm.patchValue({ voice: { X_CALIX_SXACC_RG_WAN: { DNSServers: '', DefaultGateway: '', ExternalIPAddress: '', SubnetMask: '' } } });
    }
    this.Out_Data_Change.emit(this.servicetierForm.value)
  }

  someFunc(value) {
    if (value == "") {
      this.vlanErrorMsg = 'VLAN must be a number between 0 and 4094.';
      return
    }
    if (value > 4093) {
      this.vlanErrorMsg = 'Please enter a value less than or equal to 4095.';
      return
    }
    else {
      this.vlanErrorMsg = '';
    }

  }

  emailChange(value) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      this.emailmsg = ""
      this.Out_Data_Change.emit(this.servicetierForm.value)
      return
    }
    else {
      this.emailmsg = "You have entered an invalid email address!";
      this.Out_Data_Change.emit(this.servicetierForm.value)
      return
    }

  }

  servicetierChange() {
    let form = this.servicetierForm.value;
    if (form.data.Enable) {
      this.dataShowAllFields = true;
    } else {
      this.dataShowAllFields = false;
      this.servicetierForm.patchValue({ data: { Pbit: null, VlanId: '', BwProfile: null, pppoe: { Password: '', Username: '' } } });
    }

    if (form.video.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
      this.servicetierForm.patchValue({ video: { Pbit: null, VlanId: '', BwProfile: null } });
    }
    this.Out_Data_Change.emit(this.servicetierForm.value)
  }

  voiceServiceTypeChange(event?) {
    if (event && (event.value == 'SIP' || event == 'SIP')) {
      this.isSIPVoiceServiceType = true;
    } else {
      this.isSIPVoiceServiceType = false;
    }

    this.EnableVoiceLine(1);
    this.EnableVoiceLine(2);
  }

  checkIPValidation(field) {
    let value = this.servicetierForm.value.voice.X_CALIX_SXACC_RG_WAN[field];
    value = value ? value.trim() : '';
    this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = (value !== '' && this.commonFunc.ValidateIpV4Addr(value)) ? true : false;
  }

  checkDNSServerValidation(field) {
    let value = this.servicetierForm.value.voice.X_CALIX_SXACC_RG_WAN[field];
    value = value ? value.trim() : '';
    let ipFormat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (value) {
      let arr = value.split(",");
      let arr2 = arr.slice(0);
      arr2 = arr2.filter(el => el && el.trim());
      if (arr2.length) {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i] ? arr[i].trim() : "";

          if (ele) {
            this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = ipFormat.test(ele);
            if (!ipFormat.test(ele)) return;
          } else {
            this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = false;
            return;
          }
        }
      } else {
        this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = false;
      }

    } else {
      this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = true;
    }
  }

  checkLineValidation(line, feature, field) {
    //debugger;
    let value = this.servicetierForm.value.voice.Line[line][feature][field];
    switch (field) {
      case 'X_000631_DirectConnectNumber':
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = (/^[0-9]+$/).test(value);
        break;
      case 'X_000631_DirectConnectTimer':
        this.lineFormValidate[line][feature][field] = (value >= 0 && value <= 35);
        break;
      case 'AuthUserName':
        const usenameREX = /[\"<>#%]+$/;
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        } else if (usenameREX.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineFormValidate[line][feature][field] = false;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'AuthPassword':
        const passwordREX = /[\"]+$/;
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        }
        // else if (passwordREX.test(value) || (value.indexOf('@@') !== -1)) {
        //   this.lineFormValidate[line][feature][field] = false;
        //   this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        // }
        break;
      case 'URI':
        value = value ? value.trim() : '';
        // const REX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        // this.lineFormValidate[line][feature][field] = (value !== '' && REX.test(value)) ? true : false

        if (value !== '') {
          let isValid = this.uriValidate.uriValidate(value);
          this.lineFormValidate[line][feature][field] = isValid;
        } else {
          this.lineFormValidate[line][feature][field] = false;
        }

        break;
      case 'TerminationId':
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = (value !== '');
        break;
      case 'Crv':
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = (value !== '');
        break;
      case 'TransmitGain':
        value = value ? (_.isNumber(value) ? value : value.trim()) : '';
        this.lineFormValidate[line][feature][field] = (value !== '' && Number(value) >= -12 && Number(value) <= 6);
        break;
      case 'ReceiveGain':
        value = value ? (_.isNumber(value) ? value : value.trim()) : '';
        this.lineFormValidate[line][feature][field] = (value !== '' && Number(value) >= -12 && Number(value) <= 6);
        break;
      default:
        break;
    }
  }

  checkIPHostValidation(field) {
    let value = this.servicetierForm.value.voice[field];
    value = value ? value.trim() : '';
    this.voiceFormValidate.X_000631_Opt81ClientFQDN = (value === '' || (value !== '' && this.commonFunc.validateIpORHost(value))) ? true : false;
    //console.log(this.voiceFormValidate)
  }

  lanValidate(feature, field) {
    let value = this.servicetierForm.value[feature][field];
    //value = value ? value.trim() : '';
    if (feature == 'video') {
      this.videoFormValidate[field] = (value == null || (value != undefined && value >= 0 && value <= 4093));
    } else {
      this.dataFormValidate[field] = (value == null || (value != undefined && value >= 0 && value <= 4093));
    }

  }


  // submitChange(togglevalue) {
  //   this.VideoEnable = !this.VideoEnable;
  //   this.dataService.setdataEnableVideo(togglevalue, this.VideoEnable);
  //   this.enable_toggle = !this.enable_toggle

  // }

  // toggleShow(togglevalue) {
  //   this.dataEnable = !this.dataEnable;
  //   this.dataService.setdataEnableData(togglevalue, this.dataEnable);
  //   this.dataShowAllFields = !this.dataShowAllFields;

  // }

  showLineOneTab() {
    this.EnableVoiceLine(1);
  }

  showLineTwoTab() {
    this.EnableVoiceLine(2);
  }

  EnableVoiceLine(line?) {
    //this.dataEnable = !this.dataEnable;
    if (line && line == 1) {
      if (this.isSIPVoiceServiceType && this.servicetierForm.value.voice.Line['1'].Enable) {
        this.isSIPVoiceServiceType1 = true;
      } else if (!this.isSIPVoiceServiceType && this.servicetierForm.value.voice.Line['1'].Enable) {
        this.isSIPVoiceServiceType1 = false;
      } else {
        this.isSIPVoiceServiceType1 = false;
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '1': {
                SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: {
                  CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false,
                  X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: ''
                }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: '' }, X_000631_TdmGw: { Crv: '' }
              }
            }
          }
        });
      }
    } else if (line && line == 2) {
      if (this.isSIPVoiceServiceType && this.servicetierForm.value.voice.Line['2'].Enable) {
        this.isSIPVoiceServiceType2 = true;
      } else if (!this.isSIPVoiceServiceType && this.servicetierForm.value.voice.Line['2'].Enable) {
        this.isSIPVoiceServiceType2 = false;
      } else {
        this.isSIPVoiceServiceType2 = false;
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '2': {
                SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: {
                  CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false,
                  X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: ''
                }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: '' },
                X_000631_TdmGw: { Crv: '' }
              }
            }
          }
        });
      }
    }
    //this.dataService.setdataEnableData(line, this.dataEnable);
  }

  saveSystem() {

    if (this.ManagedONTMode) {
      let systemForm = this.systemInfoForm.value;
      let systemError = false;
      // if (!systemForm.modelName) {
      //   systemError = true;
      // }

      this.validateStaticGroups();
      if (this.staticGroupError) {
        systemError = true;
      }
      this.childAdvancedONT.saveSystem();
    } else {

      this.error = false;
      let formError = false, lineOneError = false, lineTwoError = false, videoFormError = false, dataFormError = false;
      this.submitted = true;

      //System Form
      let systemForm = this.systemInfoForm.value;
      let systemError = false;
      // if (!systemForm.modelName) {
      //   systemError = true;
      // }
      this.validateStaticGroups();
      if (this.staticGroupError) {
        systemError = true;
      }

      if (this.disableSystem) {
        this.servicetierForm.patchValue({
          data: {
            Enable: false, VlanId: '',
            Pbit: null,
            BwProfile: null,
            pppoe: {
              Username: '',
              Password: ''
            }
          }

        })
      }


      let formData = this.servicetierForm.value;
      formData.systemId = this.systemId;
      this.Out_Data_Change.emit(this.servicetierForm.value)
      const ServiceType = formData.voice?.ServiceType ? formData.voice?.ServiceType : '';
      const ServiceConnectionType = formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType ? formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType : '';
      if (ServiceConnectionType === 'Static') {
        this.checkIPValidation('ExternalIPAddress');
        this.checkIPValidation('SubnetMask');
        this.checkIPValidation('DefaultGateway');
        this.checkDNSServerValidation('DNSServers');
        formError = (!this.voiceFormValidate.X_CALIX_SXACC_RG_WAN.ExternalIPAddress || !this.voiceFormValidate.X_CALIX_SXACC_RG_WAN.SubnetMask || !this.voiceFormValidate.X_CALIX_SXACC_RG_WAN.DefaultGateway || !this.voiceFormValidate.X_CALIX_SXACC_RG_WAN.DNSServers);
      } else if ((ServiceType == 'MGCP' && ServiceConnectionType === 'DHCP') || (ServiceType == 'H.248' && ServiceConnectionType === 'DHCP')) {
        this.checkIPHostValidation('X_000631_Opt81ClientFQDN');
        if (!this.voiceFormValidate.X_000631_Opt81ClientFQDN) {
          formError = true
        }
      }

      formData = ((formData) => {
        for (let i = 1; i < 3; i++) {
          if (ServiceType == 'SIP' && formData.voice?.Line[i].Enable) {
            this.checkLineValidation(i, 'SIP', 'AuthUserName');
            this.checkLineValidation(i, 'SIP', 'AuthPassword');
            this.checkLineValidation(i, 'SIP', 'URI');
            if (formData.voice?.Line[i].CallingFeatures?.X_000631_DirectConnectEnable) {
              this.checkLineValidation(i, 'CallingFeatures', 'X_000631_DirectConnectNumber');
              if (formData.voice?.Line[i]?.CallingFeatures?.X_000631_DirectConnectTimer) {
                this.checkLineValidation(i, 'CallingFeatures', 'X_000631_DirectConnectTimer');
              }
            }

            if (!this.lineFormValidate[i].SIP.AuthUserName || !this.lineFormValidate[i].SIP.AuthPassword || !this.lineFormValidate[i].SIP.URI) {
              if (i == 1) {
                lineOneError = true;
              } else {
                lineTwoError = true;
              }
              continue;
            }
            if (!this.lineFormValidate[i].CallingFeatures.X_000631_DirectConnectNumber || !this.lineFormValidate[i].CallingFeatures.X_000631_DirectConnectTimer) {
              if (i == 1) {
                lineOneError = true;
              } else {
                lineTwoError = true;
              }
            }
          } else if (ServiceType == 'H.248' && formData.voice?.Line[i].Enable) {
            this.checkLineValidation(i, 'X_000631_H248', 'TerminationId');
            if (!this.lineFormValidate[i].X_000631_H248.TerminationId) {
              if (i == 1) {
                lineOneError = true;
              } else {
                lineTwoError = true;
              }
            }
          } else if (ServiceType == 'X_000631_TDMGW' && formData.voice?.Line[i].Enable) {
            this.checkLineValidation(i, 'X_000631_TdmGw', 'Crv');
            if (!this.lineFormValidate[i].X_000631_TdmGw.Crv) {
              if (i == 1) {
                lineOneError = true;
              } else {
                lineTwoError = true;
              }
            }
          }
          //Service loss validation
          if (formData.voice?.Line[i].Enable && formData.voice?.Line[i].VoiceProcessing.systemLoss === 'Manual') {
            this.checkLineValidation(i, 'VoiceProcessing', 'TransmitGain');
            this.checkLineValidation(i, 'VoiceProcessing', 'ReceiveGain');
            if (!this.lineFormValidate[i].VoiceProcessing.TransmitGain || !this.lineFormValidate[i].VoiceProcessing.ReceiveGain) {
              if (i == 1) {
                lineOneError = true;
              } else {
                lineTwoError = true;
              }
            }
          }
        }
        return formData;
      })(formData);

      if (formData.video.Enable) {
        if (formData.video.VlanId != null && formData.video.VlanId != undefined) {
          this.lanValidate('video', 'VlanId');
          videoFormError = !this.videoFormValidate.VlanId;
        }
      }
      if (formData.data.Enable) {
        if (formData.data.VlanId != null && formData.data.VlanId != undefined) {
          this.lanValidate('data', 'VlanId');
          dataFormError = !this.dataFormValidate.VlanId;
        }
      }


      if (systemError) {
        return;
      }

      //Wifi form 
      let wifiForm = this.addDeviceObj.wifiSSID;
      let wifiError = false;
      if (!this.checkKeyPassPhraseLength(wifiForm)) {
        wifiError = true;
        return;
      }
      //this.Out_Unified.emit(this.addDeviceObj)
      this.Out_WiFi_Info.emit(wifiForm);
      this.systemInfochange();

      //Save Event
      this.Out_Data_Submit.emit();
    }



  }

  saveSystemONT(formError) {
    this.error = false;

    this.submitted = true;

    //System Form
    let systemForm = this.systemInfoForm.value;
    let systemError = false;
    if (!systemForm.modelName) {
      systemError = true;
    }

    this.validateStaticGroups();
    if (this.staticGroupError) {
      systemError = true;
    }

    if (systemError) {
      return;
    }

    if (formError) {
      return;
    }

    //Wifi form 
    let wifiForm = this.addDeviceObj.wifiSSID;
    let wifiError = false;
    if (!this.checkKeyPassPhraseLength(wifiForm)) {
      wifiError = true;
      return;
    }
    this.Out_WiFi_Info.emit(wifiForm);
    this.systemInfochange();

    //Save Event
    this.Out_Data_Submit.emit();
  }


  priorityItems = [];
  serviceList = [];

  Brandwidthitems = [];
  //BrandwidthitemSelected = '1';

  DialPlanitems = [];
  //DialPlanSelected = '1';

  AddressingTypeitems = [];

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }

    this.error = true;
    this.loading = false;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  //advanced setting
  onToggleAdvSettings() {
    this.advanceSettingsLbl = (!this.isShowAdvSetting) ? this.language['Hide_Advanced_Settings'] : this.language['Show_Advanced_Settings'];
    this.isShowAdvSetting = !this.isShowAdvSetting;
  }
  onSysLossChange(line) {
    //debugger
    switch (this.servicetierForm.value.voice.Line[line].VoiceProcessing.systemLoss) {
      case "GR-909":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -2;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -4;
        this.Out_Data_Change.emit(this.servicetierForm.value)
        break;
      case "ANSI":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -3;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -9;
        this.Out_Data_Change.emit(this.servicetierForm.value)
        break;
      case "ETSI-PSTN":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -4;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -11;
        this.Out_Data_Change.emit(this.servicetierForm.value)
        break;
      default:
        break
    }

  }
  systemlossChange() {
    //debugger;
    if (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing) {
      //this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.TransmitGain = this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain ? this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain / 10 : -3;
      //this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.ReceiveGain = this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain ? this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain / 10 : -9;
      if ((this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain == -2) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -4)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
      }
      else if ((this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain == -3) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -9)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
      }
      else if ((this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain == -4) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -11)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
      } else {
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '1': {
                VoiceProcessing: {
                  systemLoss: "Manual",
                  TransmitGain: this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.TransmitGain,
                  ReceiveGain: this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.ReceiveGain

                }
              }
            }
          }
        });
      }
    }
    else {
      this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
    }
    if (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing) {
      //this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.TransmitGain = this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain ? this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain / 10 : -3;
      //this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.ReceiveGain = this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain ? this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain / 10 : -9;

      if ((this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain == -2) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -4)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
      }
      else if ((this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain == -3) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -9)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
      }
      else if ((this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain == -4) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -11)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
      } else {
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '2': {
                VoiceProcessing: {
                  systemLoss: "Manual",
                  TransmitGain: this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.TransmitGain,
                  ReceiveGain: this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.ReceiveGain
                }
              }
            }
          }
        });
      }
    } else {
      this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
    }
  }

  showError() {

  }

  setServicesData() {
    this.serviceLabel = this.dataService.setServicesData(this.servicesListData);
  }
  directconnectenable() {
    if (this.servicetierForm.value.voice.Line['1'].CallingFeatures.X_000631_DirectConnectEnable) {
      this.Out_Data_Change.emit(this.servicetierForm.value)
    }
    else {
      this.servicetierForm.patchValue({ voice: { Line: { '1': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    if (this.servicetierForm.value.voice.Line['2'].CallingFeatures.X_000631_DirectConnectEnable) {
      this.Out_Data_Change.emit(this.servicetierForm.value)
    }
    else {
      this.servicetierForm.patchValue({ voice: { Line: { '2': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    this.Out_Data_Change.emit(this.servicetierForm.value)
  }


  modelnoteditable: boolean = false;
  unsavedDta() {
    this.unsaveddata = true;
    this.Out_unsavedData.emit(this.unsaveddata)
  }
  systemInfochange() {


    this.Out_System_Info.emit(this.systemInfoForm.value);
  }

  changeStatic() {
    //debugger;
    this.staticGroupError = false;
    this.submitted = false;
    let formData = this.systemInfoForm.value;
    if (formData.staticGroup && formData.staticGroup?.static) {
      this.isStatic = true;
    } else { this.isStatic = false; }

    if (!this.isStatic) {
      this.systemInfoForm.patchValue({ staticGroupList: [] });
    }

    this.systemInfochange();
  }

  validateStaticGroups() {
    let formData = this.systemInfoForm.value;
    if (formData.static) {
      if (formData.staticGroupList && formData.staticGroupList.length) {
        this.staticGroupError = false;
      } else this.staticGroupError = true;
    } else {
      this.staticGroupError = false;
    }
  }

  onModelChange(event) {
    if (event) {
      this.getFeatureProperties(this.systemInfoForm.value.modelName, true);

    } else {
      this.isRgBtnShow = false;
      this.isMangeBtnShow = false;
      this.isWapBtnShow = false;
    }
    if (this.systemInfoForm.value.opMode) {
      if (/844E(-\d)?/i.test(this.systemInfoForm.value.modelName)) {
        this.showSSIDOption = true;
      } else {
        this.showSSIDOption = false;
      }
    }

  }

  getFeatureProperties(modelName: any, eventChange = false, query = "", serialNumber?) {
    this.loading = true;
    this.wifiAndSettingsAvail = false;
    if (!query) {
      query = `modelName=${encodeURIComponent(modelName)}`;
    }
    if (serialNumber) {
      query = `serialNumber=${encodeURIComponent(serialNumber)}`;
    }
    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${query}`).subscribe((json: any) => {
      this.ftrProperties = json ? json : {};
      let ssidMetaData: MetaField[] = json.properties.filter(x => x.featureName.match(ssidMetaPattern))
      var selectedFieldMeta2G = ssidMetaData.filter(x => x.featureName == 'SSID1')[0]
      var selectedFieldMeta5G = ssidMetaData.filter(x => x.featureName == 'SSID9')[0]
      var selectedFieldMeta6G = ssidMetaData.filter(x => x.featureName == 'SSID17')[0]
      if (selectedFieldMeta2G) {
        selectedFieldMeta2G.fields.forEach(x => {
          if (typeof x.writable === "boolean") {
            this.metaData2G[x.name] = x.writable
          }
        })
        if (this.metaData2G.Enable == false && (this.addDeviceObj?.wifiSSID?.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID)) {
          this.addDeviceObj.wifiSSID
            .X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID.serviceEnabled = 'true';
        }
      }
      if (selectedFieldMeta5G) {
        selectedFieldMeta5G.fields.forEach(x => {
          if (typeof x.writable === "boolean") {
            this.metaData5G[x.name] = x.writable
          }
        })
        if (this.metaData5G.Enable == false && this.addDeviceObj?.wifiSSID
          ?.X_CALIX_SXACC_PRIMARY_5GHZ_SSID) {
          this.addDeviceObj.wifiSSID
            .X_CALIX_SXACC_PRIMARY_5GHZ_SSID.serviceEnabled = 'true';
        }
      }
      if (selectedFieldMeta6G) {
        selectedFieldMeta6G.fields.forEach(x => {
          if (typeof x.writable === "boolean") {
            this.metaData6G[x.name] = x.writable
          }
        })
        if (this.metaData6G.Enable == false && this.addDeviceObj?.wifiSSID
          ?.X_CALIX_SXACC_PRIMARY_6GHZ_SSID) {
          this.addDeviceObj.wifiSSID
            .X_CALIX_SXACC_PRIMARY_6GHZ_SSID.serviceEnabled = 'true';
        }
      }
      if (json && json.properties) {

        let opmodes = {};

        let opmodesObj = this.findObjByKeyValue('OpModeOptions', json.properties);
        this.opModeWritable = [];
        let writableCheck, isOpmodeAvailInOptions = false;
        let opmodeData = Object.keys(opmodesObj['configuration']);
        if (opmodeData?.length === 1) {
          this.hideRadioButton = true;
          this.systemInfoForm.patchValue({ opMode: opmodeData[0] })
          this.handleModeChange(opmodeData[0]);
          this.systemInfochange();
        } else {
          this.hideRadioButton = false;
        }
        let opmodeAvail = this.systemInfoForm.value.opMode ? this.systemInfoForm.value.opMode : json.opMode;
        if (opmodesObj && opmodesObj['configuration'] && opmodeAvail && opmodeAvail in opmodesObj['configuration']) {

          writableCheck = opmodesObj['configuration'][opmodeAvail]?.writable;
          isOpmodeAvailInOptions = true;

          if (opmodesObj['configuration'].RG?.writable != undefined && opmodesObj['configuration'].RG?.writable === writableCheck) {
            opmodes['RG'] = true;
          }

          if (opmodesObj['configuration'].WAP?.writable != undefined && opmodesObj['configuration'].WAP?.writable === writableCheck) {
            opmodes['WAP'] = true;
          }
          if (opmodesObj['configuration']['WAP-IGMP']?.writable != undefined && opmodesObj['configuration']['WAP-IGMP']?.writable === writableCheck) {
            opmodes['WAP-IGMP'] = true;
          }

          if (opmodesObj['configuration']['Modem']?.writable != undefined && opmodesObj['configuration']['Modem']?.writable === writableCheck) {
            opmodes['Modem'] = true;
          }
        } else {

          if (opmodesObj['configuration'].RG?.writable != undefined || opmodesObj['configuration'].RG?.writable) {
            opmodes['RG'] = true;
          }
          if (opmodesObj['configuration'].WAP?.writable != undefined || opmodesObj['configuration'].WAP?.writable) {
            opmodes['WAP'] = true;
          }

          if (opmodesObj['configuration']['Managed ONT']?.writable != undefined || opmodesObj['configuration']['Managed ONT']?.writable) {
            opmodes['Managed ONT'] = true;
          }

          if (opmodesObj['configuration']['WAP-IGMP']?.writable != undefined || opmodesObj['configuration']['WAP-IGMP']?.writable) {
            opmodes['WAP-IGMP'] = true;
          }

          if (opmodesObj['configuration']['Modem']?.writable != undefined || opmodesObj['configuration']['Modem']?.writable) {
            opmodes['Modem'] = true;
          }
        }

        this.onModeRadioBtnDisplayNew(opmodes, modelName, eventChange);


      }

      if (json && json.properties) {
        let obj = {};

        if (this.findObjByKeyValue('SSID1', json.properties)) {
          obj['2DOT4GHZ_PRIMARY'] = true;

        }

        if (this.findObjByKeyValue('SSID2', json.properties)) {
          obj['2DOT4GHZ_GUEST'] = true;

        }

        if (this.findObjByKeyValue('SSID9', json.properties)) {
          obj['5GHZ_PRIMARY'] = true;

        }

        if (this.findObjByKeyValue('SSID10', json.properties)) {
          obj['5GHZ_GUEST'] = true;

        }
        // 6 GHZ Primary SSID


        if (this.findObjByKeyValue('SSID17', json.properties)) {
          obj['6GHZ_PRIMARY'] = true;

        }

        if (this.findObjByKeyValue('SSID18', json.properties)) {
          obj['6GHZ_GUEST'] = true;

        }
        this.security = constructSecurityValues(json);
        this.tempSecurityOptions = constructSecurityValues(json);
        if (selectedFieldMeta6G) {
          var six_security = wifiFetchSecurityOptionsFromSSIDMeta(selectedFieldMeta6G, ssidMetaData, this.security);
          if (six_security?.length > 0) {
            this.six_Ghz_SecurityOptions = six_security;
          }

        }

        if (selectedFieldMeta5G) {
          var unifiedSSID_SecurityOptions = wifiFetchSecurityOptionsFromSSIDMeta(selectedFieldMeta5G, ssidMetaData, this.security);
          if (unifiedSSID_SecurityOptions?.length > 0) {
            this.unifiedSSID_SecurityOptions = unifiedSSID_SecurityOptions;
          }

        }
        this.isSSID2_4GZ = obj['2DOT4GHZ_PRIMARY'] ? true : false;
        this.isSSID5_4GZ = obj['5GHZ_PRIMARY'] ? true : false;
        this.isSSID6_4GZ = obj['6GHZ_PRIMARY'] ? true : false;
        this.isSSID2_4GZ = this.isSSID5_4GZ ? this.isSSID5_4GZ : this.isSSID2_4GZ;

      }
      if (this.addDeviceObj.selectedModel === '836GE') {
        this.onSwitchingWifiSSID('Primary SSID');
        this.showUnifiedPrimarySSID = false;
      }
      else if (this.ssoService.acceptGSModel(this.addDeviceObj?.selectedModel) || this.addDeviceObj?.selectedModel.includes('GPR')) {
        // this._addDeviceObj.device.selectedModel).substr(0, 2) === 'GS'
        // this.onSwitchingWifiSSID('Primary SSID');
        this.showUnifiedWiFiSIDtoggle = true;
        if (this.editMode && this.systemInfoData?.modelName) {
          var wifiSSIDs = this.addDeviceObj.wifiSSID;
          var two_four_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
          var five_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_5GHZ_SSID;
          var six_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_6GHZ_SSID;

          if (this.isSSID2_4GZ && this.isSSID5_4GZ && this.isSSID6_4GZ) {
            var compared = this.compareWifiSIDs(two_four_Ghz, five_Ghz, six_Ghz);
            if (compared) {
              this.showUnifiedWiFiSIDtoggle = true;
              this.onSwitchingWifiSSID('UNIFIED_PRIMARY_SSID');
              this.showUnifiedPrimarySSID = true;
              this.UnifiedWiFiSID = true;
              this.addDeviceObj.isUnifiedPrimarySSID = true;
              this.security = this.six_Ghz_SecurityOptions;
              this.addDeviceObj.toggeledUnifiedPrimarySSID = true;

            }
            else {
              this.addDeviceObj.isUnifiedPrimarySSID = false;
              this.addDeviceObj.toggeledUnifiedPrimarySSID = false;;
            }
          }
          else if (this.isSSID2_4GZ && this.isSSID5_4GZ) {
            var compared = this.compareWifiSIDs(two_four_Ghz, five_Ghz, null)
            if (compared) {
              this.showUnifiedWiFiSIDtoggle = true;
              this.onSwitchingWifiSSID('UNIFIED_PRIMARY_SSID');
              this.showUnifiedPrimarySSID = true;
              this.UnifiedWiFiSID = true;
              this.addDeviceObj.isUnifiedPrimarySSID = true;
              this.addDeviceObj.toggeledUnifiedPrimarySSID = true;
            }
            else {
              this.addDeviceObj.isUnifiedPrimarySSID = false;
              this.addDeviceObj.toggeledUnifiedPrimarySSID = false;;
            }
          }
        }
      }
      else {
        this.showUnifiedWiFiSIDtoggle = false;
      }
      if (this.systemInfoData?.opMode && this.systemInfoData?.opMode === "WAP") {
        if (/844E(-\d)?/i.test(this.systemInfoData.modelName)) {
          this.showSSIDOption = true;
        } else {
          this.showSSIDOption = false;
        }
      } else {
        this.showSSIDOption = true;
      }
      setTimeout(() => {
        this.loading = false;
      }, 100);
      //this.Out_Unified.emit(this.addDeviceObj)


    }, (err: any) => {
      //this.pageErrorHandle(err);

      this.onModeRadioBtnDisplayNew({}, modelName, eventChange);
      this.loading = false;
    });
  }

  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] && myArray[i]['featureName'] === value) {
        return myArray[i];
      }
    }
    return false;
  }

  onModeRadioBtnDisplayNew(opmodes, selectedModel, eventChange = false) {
    this.systemInfoForm.value.opMode = eventChange ? undefined : this.systemInfoForm.value.opMode;
    this.isRgBtnShow = opmodes['RG'] ? true : false;
    this.isWapBtnShow = (opmodes['WAP'] || opmodes['WAP-IGMP']) ? true : false;
    this.isMangeBtnShow = opmodes['Managed ONT'] ? true : false;
    this.isModemBtnShow = (opmodes['Modem'] || this.modemBtnArray.indexOf(selectedModel) !== -1);
    if (this.isRgBtnShow) {
      this.systemInfoForm.value.opMode = !this.systemInfoForm.value.opMode ? 'RG' : this.systemInfoForm.value.opMode;
      if (this.systemInfoForm.value.opMode === 'Managed ONT') {
        this.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL, SubscriberManagement.SETTINGS_LABEL];
      } else {
        if (this.addDeviceTab?.length > 2) {
          this.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL];
        }
      }
    }
    if (this.systemInfoForm.value.opMode !== 'RG') {
      this.systemInfoForm.value.opMode = this.isWapBtnShow ? 'WAP' : this.isModemBtnShow ? 'Modem' : this.isMangeBtnShow ? 'Managed ONT' : 'RG';
    }
    if (!this.systemInfoForm.value.opMode && this.systemInfoData?.opMode) {
      this.systemInfoForm.value.opMode = this.systemInfoData?.opMode ? this.systemInfoData?.opMode : "";
      //this.subscriberForm.patchValue({ opMode: this.sys_Det?.opMode })
    }


    this.addDeviceObj.selectedModel = selectedModel;

  }
  handleModeChange(event) {
    this.wifiAndSettingsAvail = false;
    if (event?.target?.value === 'Managed ONT' || event === 'Managed ONT') {
      this.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL, SubscriberManagement.SETTINGS_LABEL];
      this.addDeviceObj.settings = this.initSeriveObjects('Settings');
      this.showLanSettings = true;
      this.ManagedONTMode = true;
    } else {
      this.ManagedONTMode = false;
      this.wapModeWarning = (event?.target?.value === 'WAP' || event === 'WAP');
      if (this.addDeviceTab?.length > 2) {
        this.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL];
      }

      if (event?.target?.value === 'WAP' || event === 'WAP') {
        this.WAPmode = true;
        if (/844E(-\d)?/i.test(this.systemInfoForm.value.modelName)) {
          this.showSSIDOption = true;
        } else {
          this.showSSIDOption = false;
        }
      } else {
        this.WAPmode = false;
        this.showSSIDOption = true;
      }

      this.addDeviceObj.deviceMode = event?.target?.value ? event?.target?.value : event;

      this.showLanSettings = false;
    }

    setTimeout(() => {
      this.wifiAndSettingsAvail = true;
    }, 100);
  }

  setInitializeSSID() {
    //debugger
    if (this.systemInfoData?.opMode && this.systemInfoData?.opMode === "WAP") {
      if (/844E(-\d)?/i.test(this.systemInfoData.modelName)) {
        this.showSSIDOption = true;
      } else {
        this.showSSIDOption = false;
      }
    } else {
      this.showSSIDOption = true;
    }

    this.addDeviceObj = {
      deviceMode: this.systemInfoData?.opMode ? this.systemInfoData?.opMode : "RG",
      isDisableModel: false,
      isStaticGroup: "No",
      regId: this.systemId,
      selectedModel: this.systemInfoData?.modelName ? this.systemInfoData?.modelName : undefined,
      wifiSSID: Object.keys(this.wifiObj).length ? this.patchWifiData() : this.initSeriveObjects('WIFI'),
      settings: (this.addDevObj?.settings && Object.keys(this.addDevObj?.settings).length) ? this.addDevObj?.settings : this.initSeriveObjects('Settings')
    }

    if (this.systemInfoData?.opMode == 'Managed ONT') {
      this.showLanSettings = true;
    } else {
      this.showLanSettings = false;
    }
    setTimeout(() => {
      //this.wifiAndSettingsAvail = true;
    }, 0);
  }

  onSwitchingWifiSSID(wifiSSIDName: string) {
    this.switchedWifiSSID = wifiSSIDName;
    if (wifiSSIDName == "UNIFIED_PRIMARY_SSID") {
      if (!this.addDeviceObj.wifiSSID["UNIFIED_PRIMARY_SSID"]) {
        this.addDeviceObj.wifiSSID["UNIFIED_PRIMARY_SSID"] = {}
      }
      if (this.unifiedSSID_SecurityOptions?.length > 0) {
        // this.security = this.six_Ghz_SecurityOptions;
        // this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"].securityType = this.six_Ghz_SecurityOptions[0]?.id

        if (!this.editMode && !this.addDeviceObj.isUnifiedPrimarySSID && !this.addDeviceObj.toggeledUnifiedPrimarySSID) {
          var options = this.unifiedSSID_SecurityOptions.filter(x => x.id == "11iandWPA3");
          if (options?.length > 0) {
            this.addDeviceObj.wifiSSID["UNIFIED_PRIMARY_SSID"] = { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined }
            this.addDeviceObj.wifiSSID["UNIFIED_PRIMARY_SSID"].securityType = options[0].id;
          }
        }
        // else{
        //   var options = this.unifiedSSID_SecurityOptions.filter(x => x.id == "11iandWPA3");
        //   if (options?.length > 0) {
        //     this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"].securityType = options[0].id;
        //   }
        // }

      }

    }
  }

  getWifiData(event: any) {

    this.addDeviceObj.wifiSSID[event.type] = event.data;
    setTimeout(() => {
      this.Out_WiFi_Info.emit(this.addDeviceObj.wifiSSID);
    }, 0);


  }
  unsavedData(event) {
    this.wifiNotchanged = true;
    this.Out_wifiNotchanged.emit(event)
    this.Out_unsavedData.emit(event)
  }
  onSwitchingWifiSSIDRadio(wifiSSIDRadioName: string) {
    this.switchedWifiSSIDRadio = wifiSSIDRadioName
  }
  checkKeyPassPhraseLength(obj) {
    let res = true;
    if (obj) {
      var tempObj = this.tempWifiObj
      //  this.oldAddDeviceObj.services.wifiSSID[] = Object.assign({}, oldData)
      let objKeys = Object.keys(obj);
      if (!(this.UnifiedWiFiSID)) {
        // delete objKeys["UNIFIED_PRIMARY_SSID"]

        objKeys = objKeys?.filter(x => x !== "UNIFIED_PRIMARY_SSID");
      }
      else {
        objKeys = objKeys?.filter(x => x == "UNIFIED_PRIMARY_SSID");
      }
      objKeys.forEach(key => {
        if (tempObj) {
          var temp = tempObj[key];
          if ((temp?.securityType == "Basic" && obj[key]?.securityType != "Basic") && obj[key]?.passphrase?.length == 0) {
            res = false;
          }
        }

        if (tempObj) {
          var temp = tempObj[key];
          if (temp?.securityType == "Basic" && obj[key]?.securityType != "Basic") {
            if (obj[key].passphrase.length < 8 ||
              obj[key].passphrase.length > 63) {
              res = false;
            }
          }
        }
        // if ((obj[key]?.securityType && obj[key]?.securityType !== 'Basic') && obj[key]?.passphrase?.length == 0) {
        //   res = false;
        // }


        if ((obj[key]?.securityType && obj[key]?.securityType !== 'Basic') && obj[key]?.passphrase) {
          if (obj[key].passphrase.length < 8 ||
            obj[key].passphrase.length > 63) {
            res = false;
          }
          //let regexp = new RegExp('^[a-zA-Z0-9]+$')
          //let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,}$/gm);
          //let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^,./"~()|'`#$@!%*-?&]{8,}$/gm);
          let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^,./"~()|\\ '`#$@!%*-?&]{8,}$/gm);
          if (!regexp.test(obj[key].passphrase)) {
            res = false;
          }
          if ((/^\s+|\s+$/g.test(obj[key].passphrase))) {
            res = false;
          }
        }

        if (obj[key].name) {
          if (!new RegExp(SSIDNamePattern).test(obj[key].name)) {
            res = false;
          } if (obj[key].name.length > 32) {
            res = false;
          }

          // if (!(obj[key]?.securityType)) {
          //   res = false;
          // }
        }
        if (this.editMode && tempObj) {
          var oldName = tempObj[key]?.name;
          var newName = obj[key].name;

          if (oldName && newName == "") {
            res = false;
          }
        } else if (!this.editMode) {
          if (key == "UNIFIED_PRIMARY_SSID") {
            if (obj[key].name?.length == 0) {
              res = false;
            }
            if (obj[key]?.passphrase?.length == 0 && obj[key]?.securityType !== 'Basic') {
              res = false;
            }
          }
        }

      })
    }
    return res;
  }

  initSeriveObjects(serviceName) {
    switch (serviceName) {
      case 'Data':
        return { isDataService: true, vLAN: '', priority: '', bandwidth: '', PPPoEPwd: '', PPPoEUsername: '' };
        break;
      case 'Video':
        return { isVideoService: false, vLAN: '', priority: '', bandwidth: '' };
        break;
      case 'Voice':
        return {};
        //return { serviceType: 'SIP', faxRelay: false, dialPlan: 'system-default', addressType: 'DHCP', ipAddress: '', subnetMask: '', defaultGateway: '', dnsServers: '', lineOne: this.initVoiceLineObj(), lineTwo: this.initVoiceLineObj() };
        break;
      case 'WIFI':
        return {
          X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined }, X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined }, X_CALIX_SXACC_PRIMARY_5GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_GUEST_5GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_PRIMARY_6GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_GUEST_6GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          isUnifiedPrimarySSID: false,
          toggeledUnifiedPrimarySSID: false,
          UNIFIED_PRIMARY_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined }
        };
        break;
      case 'Settings':
        return { isPowerSaving: true, lanPortOne: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortTwo: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortThree: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortFour: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 } };
        break;
      default:
        break;
    }
  }

  patchWifiData() {
    let allowedWifissids = ["X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_5GHZ_SSID", "X_CALIX_SXACC_GUEST_5GHZ_SSID", 'X_CALIX_SXACC_PRIMARY_6GHZ_SSID', "X_CALIX_SXACC_GUEST_6GHZ_SSID", 'UNIFIED_PRIMARY_SSID'];
    let allwifiObj = {};
    for (let key of Object.keys(this.wifiObj)) {
      if (allowedWifissids.indexOf(key) === -1) {
        continue;
      }

      const wifiObject: any = {
        name: this.wifiObj[key].SSID,
        serviceEnabled: this.wifiObj[key].Enable,
        securityType: this.wifiObj[key].BeaconType,
        encryption: this.wifiObj[key].IEEE11iEncryptionModes ? this.wifiObj[key].IEEE11iEncryptionModes : this.wifiObj[key].SSIDAdvertisementEnabled,
        passphrase: this.wifiObj[key].KeyPassphrase,
        //encryption: this.wifiObj[key].WPAEncryptionModes,
        broadcastEnabled: this.wifiObj[key].SSIDAdvertisementEnabled,
        mumimoEnabled: this.wifiObj[key].MUMIMOEnabled,
        enableDfsChannels: this.wifiObj[key].EnableDfsChannels,
        isUnifiedPrimarySSID: this.wifiObj[key].isUnifiedPrimarySSID
      };
      // if (!_.isEmpty(_.pickBy(wifiObject, _.identity)))
      //   allwifiObj[key] = _.pickBy(wifiObject, _.identity);

      if (!_.isEmpty(_.pickBy(wifiObject, function (value, key) {
        return !(value === undefined || value === "" || value === " ");
      })))
        allwifiObj[key] = _.pickBy(wifiObject, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        });


    }

    return allwifiObj;

  }

  updateSettings(lan) {
    this.addDeviceObj.settings = lan;
    this.Out_Lan_Info.emit(lan);
  }
  changeUnifiedWiFiSID(e) {
    var x = e;
    this.showUnifiedPrimarySSID = e.target.checked;
    this.wifiNotchanged = true;
    this.Out_wifiNotchanged.emit(this.wifiNotchanged)
    if (e?.target?.checked) {
      this.onSwitchingWifiSSID('UNIFIED_PRIMARY_SSID');
      this.showUnifiedPrimarySSID = true;
      this.addDeviceObj.isUnifiedPrimarySSID = true;
      // this.security = this.six_Ghz_SecurityOptions;
      // this.addDeviceObj.toggeledUnifiedPrimarySSID
      var unifiedSSID = Object.assign({}, this.addDeviceObj.wifiSSID.X_CALIX_SXACC_PRIMARY_5GHZ_SSID);
      if (this.unifiedSSID_SecurityOptions?.length > 0) {
        // if (this.six_Ghz_SecurityOptions?.length == 1) {
        //   unifiedSSID.securityType = this.six_Ghz_SecurityOptions[0].id;
        // }
        // else if (this.six_Ghz_SecurityOptions?.length >= 3) {
        //   unifiedSSID.securityType = this.six_Ghz_SecurityOptions[3].id;
        // }

        // var options = this.six_Ghz_SecurityOptions.filter(x => x.id == "WPA3");
        // if (options?.length > 0) {
        //   unifiedSSID.securityType = options[0].id;
        // }

        var options = this.unifiedSSID_SecurityOptions.filter(x => x.id == "11iandWPA3");
        if (options?.length > 0) {
          unifiedSSID.securityType = options[0].id;
        }




      }
      // unifiedSSID.securityType = this.six_Ghz_SecurityOptions[0].id;
      this.addDeviceObj.wifiSSID.UNIFIED_PRIMARY_SSID = unifiedSSID;
    }
    else {
      this.onSwitchingWifiSSID('2.4GHz Primary SSID');
      this.showUnifiedPrimarySSID = false;
      this.addDeviceObj.isUnifiedPrimarySSID = false;
      this.security = this.tempSecurityOptions;
      this.addDeviceObj.wifiSSID.UNIFIED_PRIMARY_SSID = {}
    }
    this.Out_Unified.emit(this.addDeviceObj)
  }

  ontServices: any = {}
  updateServicesData(data, id) {
    this.ontServices = data;
    this.Out_Data_Change.emit(data);
  }

  updateSystemForm(data, id) {

  }

  save(id) {

  }
  comparePrimary_SSIDs: boolean = false;
  compareWifiSIDs(two_fourGhz, fiveGhz, sixGhz): boolean {
    var isCompared: boolean = true;
    // if (two_fourGhz && fiveGhz && sixGhz) {
    if (this.isSSID2_4GZ && this.isSSID5_4GZ && this.isSSID6_4GZ) {
      var primary_Two_four_ghz_obj = {
        name: two_fourGhz?.name || "",
        broadcastEnabled: two_fourGhz?.broadcastEnabled || "",
        securityType: two_fourGhz?.securityType || "",
        encryption: two_fourGhz?.encryption || "",
        passphrase: two_fourGhz?.passphrase || "",
      }
      var primary_Five_ghz_obj = {
        name: fiveGhz?.name || "",
        broadcastEnabled: fiveGhz?.broadcastEnabled || "",
        securityType: fiveGhz?.securityType || "",
        encryption: fiveGhz?.encryption || "",
        passphrase: fiveGhz?.passphrase || "",
      }
      var primary_Six_ghz_obj = {
        name: sixGhz?.name || "",
        broadcastEnabled: sixGhz?.broadcastEnabled || "",
        securityType: sixGhz?.securityType || "",
        encryption: sixGhz?.encryption || "",
        passphrase: sixGhz?.passphrase || "",
      }
      if (primary_Two_four_ghz_obj?.securityType && primary_Five_ghz_obj?.securityType) {
        if (primary_Two_four_ghz_obj?.securityType == primary_Five_ghz_obj?.securityType) {
          primary_Six_ghz_obj.securityType = primary_Five_ghz_obj.securityType
        }
      }
      let keys = Object.keys(primary_Five_ghz_obj);
      let primary_Two_four_ghz = Object.values(primary_Two_four_ghz_obj);
      let primary_Five_ghz = Object.values(primary_Five_ghz_obj);
      let primary_Six_ghz = Object.values(primary_Six_ghz_obj);

      if (primary_Two_four_ghz.every(e => e === '')){
        return false;
      }

        for (let i = 0; i < keys.length; i++) {
          if ((primary_Two_four_ghz[i] == primary_Five_ghz[i]) && (primary_Five_ghz[i] == primary_Six_ghz[i])) {
            isCompared = true;
            this.comparePrimary_SSIDs = true;
          }
          else {
            this.comparePrimary_SSIDs = false;
            return false;
          }
        }

    }
    else if (this.isSSID2_4GZ && this.isSSID5_4GZ) {

      var primary_Two_four_ghz_obj = {
        name: two_fourGhz?.name,
        broadcastEnabled: two_fourGhz?.broadcastEnabled,
        securityType: two_fourGhz?.securityType,
        encryption: two_fourGhz?.encryption,
        passphrase: two_fourGhz?.passphrase,
      }
      var primary_Five_ghz_obj = {
        name: two_fourGhz?.name,
        broadcastEnabled: fiveGhz?.broadcastEnabled,
        securityType: fiveGhz?.securityType,
        encryption: fiveGhz?.encryption,
        passphrase: fiveGhz?.passphrase,
      }

      let keys = Object.keys(primary_Five_ghz_obj);
      let primary_Two_four_ghz = Object.values(primary_Two_four_ghz_obj);
      let primary_Five_ghz = Object.values(primary_Five_ghz_obj);
      if (primary_Two_four_ghz.every(e => e === '')){
        return false;
      }

      for (let i = 0; i < keys.length; i++) {
        if ((primary_Two_four_ghz[i] == primary_Five_ghz[i])) {
          isCompared = true;
          this.comparePrimary_SSIDs = true;

        }
        else {
          this.comparePrimary_SSIDs = false;

          return false;
        }
      }
    }

    return isCompared

  }


}
