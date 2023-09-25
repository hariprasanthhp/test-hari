import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import _ from 'lodash';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { DeviceGroupService } from 'src/app/support/netops-management/operations/services/device-group.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { DEVICE_RG_MODEL_COLLECTIONS, DEVICE_WEP_MODEL_COLLECTIONS, DEVICE_MANAGE_MODEL_COLLECTIONS, DEVICE_MODAM_MODEL_COLLECTIONS, SubscriberManagement } from 'src/app/support/netops-management/subscriber-management/subscriber.constants';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advanced-system-ont',
  templateUrl: './advanced-system-ont.component.html',
  styleUrls: ['./advanced-system-ont.component.scss']
})
export class AdvancedSystemOntComponent implements OnInit {

  dataTest: any;
  Enable = new FormControl(false);
  protectiq = false;
  language;
  languageSubject;
  enable_toggle: boolean = false;
  isSIPVoiceServiceType: boolean = false;
  isFormDisabled: boolean;

  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  serviceErrorMsg: string;
  defaultLanValidation: boolean;
  //@Input() formOptions;
  profiles: any = {}
  selectedProfiles: any = {};
  showServiceForm: boolean;
  @Input()
  set formOptions(value: any) {
    if (value && value?.Profiles && value?.Profiles.length) {
      this.dataServiceProfileList = value.Profiles.filter(service => {
        return (service.configurations.category === 'Data Service');
      });
      this.videoServiceProfileList = value.Profiles.filter(service => {
        return (service.configurations.category === 'Video Service');
      });
      this.voiceServiceProfileList = value.Profiles.filter(service => {
        return (service.configurations.category === 'Voice Service');
      });
      value.Profiles.forEach(e => {
        this.profiles[e._id] = e;
      });

    }

    this.Brandwidthitems = value?.Brandwidthitems ? value?.Brandwidthitems : [];
    this.DialPlanitems = value?.DialPlanitems ? value?.DialPlanitems : [];

  }
  @Input() servicesListData;
  @Input() formData;
  @Input() iId;
  @Input() systemId;
  @Input() deviceData;
  @Input() deviceDataList: any[];
  @Input() deviceModels: any[];
  @Input() systemInfoData: any;

  @Input() addDevObj: any;
  @Output() private Out_Data_Change: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Data_Submit: EventEmitter<any> = new EventEmitter();



  servicetierForm: FormGroup;
  test1: boolean;
  sample_check1: boolean;
  dataShowAllFields: boolean = false;
  Shown: boolean;
  vlanErrorMsg: string;
  vlanErrorMsg2: string;
  emailmsg: string;
  submitted: boolean;

  isSIPVoiceServiceType1: boolean = false;
  isSIPVoiceServiceType2: boolean = false;

  dataEnable: boolean;
  VideoEnable: boolean;

  checkEnableBtnList = ['protectiq', 'Voice', 'Video', 'Voice-L2'];
  getAllProfileSubscribe: any;
  ORG_ID: any;
  allProfileList: any;
  errorInfo: any;
  getAllDialPlanSubscribe: any;
  error: boolean;
  loading: boolean;
  dialPlanList: any;

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

  dataList: FormArray;
  videoList: FormArray;

  dataServiceProfileList: Array<any> = [];
  voiceServiceProfileList: Array<any> = [];
  videoServiceProfileList: Array<any> = [];
  constructor(
    private translateService: TranslateService,
    private dataService: FoundationDataService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private deviceService: DeviceGroupService,
    // private router: Router,
    private http: HttpClient,
    private profileService: ProfileService,
    private ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private managementService: ManagementService,
    private commonFunc: CommonFunctionsService,
    private uriValidate: UriValidatorService
  ) {
    this.ORG_ID = this.ssoService.getOrgId();
    //this.servicetierForm.ServiceType
  }


  ngOnInit(): void {
    //debugger;
    this.language = this.translateService.defualtLanguage;
    this.advanceSettingsLbl = this.language['Show_Advanced_Settings']
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.advanceSettingsLbl = this.language['Show_Advanced_Settings']
    })


    this.servicetierForm = new FormGroup({
      //configuredService: new FormControl('No'),

      data: new FormArray([]),
      video: new FormArray([]),
      voice: new FormGroup({
        Enable: new FormControl(false),
        ProfileId: new FormControl(),
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
      setTimeout(() => {
        this.showServiceForm = true;
        this.loading = false;
        this.setInitialData();
      }, 200);
    }, 200);

  }

  createItem(data?): FormGroup {
    return this.formBuilder.group({
      Enable: data?.Enable || true,
      ProfileId: data?.ProfileId || undefined,
      Overrides: new FormGroup({
        BwProfile: new FormControl(data?.Overrides?.BwProfile || ''),
        VlanId: new FormControl(data?.Overrides?.VlanId || ''),
      }),
      pppoe: new FormGroup({
        Username: new FormControl(''),
        Password: new FormControl('')
      }),
      serviceProfile: data?.serviceProfile || {},
      isAPAS: data?.isAPAS || undefined,
      bridgeMBRPort: new FormControl(data?.bridgeMBRPort || undefined),
      isBWOverRide: data?.isBWOverRide || false,
      isVLANOverRide: data?.isVLANOverRide || undefined,
      //vLAN: data?.vLAN || undefined,
    });
  }

  createVideoItem(data?): FormGroup {
    return this.formBuilder.group({
      Enable: data?.Enable || true,
      ProfileId: data?.ProfileId || '',
      Overrides: new FormGroup({
        BwProfile: new FormControl(data?.Overrides?.BwProfile || ''),
        VlanId: new FormControl(data?.Overrides?.VlanId || ''),
      }),
      serviceProfile: data?.serviceProfile || {},
      isAPAS: data?.isAPAS || undefined,
      bridgeMBRPort: new FormControl(data?.bridgeMBRPort || undefined),
      isBWOverRide: data?.isBWOverRide || false,
      isVLANOverRide: data?.isVLANOverRide || undefined,
    });
  }



  addAvailableSystems(list, isData?) {
    this.dataList = this.servicetierForm.get('systems') as FormArray;
    if (isData) {
      this.dataList = this.servicetierForm.get('data') as FormArray;
      list.forEach(e => {
        this.dataList.push(this.createItem(e));
      });
    } else {
      this.videoList = this.servicetierForm.get('video') as FormArray;
      list.forEach(e => {
        this.dataList.push(this.createVideoItem(e));
      });
    }

    // setTimeout(() => {
    //   list.forEach((e, i) => {
    //     setTimeout(() => {
    //       this.deviceDetails(i);
    //     }, 500);
    //   });
    // }, 100);

  }



  ////////////////

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }


    this.Out_Data_Change.emit(this.servicetierForm.value);

    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    //debugger;
    if (changes.servicesListData && changes.servicesListData.currentValue) {
      this.servicesListData = changes.servicesListData.currentValue;
      //this.setServicesData();
    }
    if (changes.systemInfoData && changes.systemInfoData.currentValue) {
      this.systemInfoData = changes.systemInfoData.currentValue;
      //this.initializeSystemInfo();
    }

  }

  setInitialData() {

    // this.Brandwidthitems = this.formOptions?.Brandwidthitems ? this.formOptions?.Brandwidthitems : [];
    // this.DialPlanitems = this.formOptions?.DialPlanitems ? this.formOptions?.DialPlanitems : [];

    if (this.sys_ServiceTiers?.voice) {
      this.servicetierForm.patchValue({ voice: this.sys_ServiceTiers?.voice });
    }
    // this.onAddVoiceService();


    this.initialize();

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

    this.dataInitialize();
    this.voiceInitialize();
    this.videoInitialize();
  }

  dataInitialize() {
    if (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data.length) {
      this.sys_ServiceTiers.data.forEach(el => {
        this.AddMoreDataService(el);
      });

    }

    if (this.sys_ServiceTiers?.video && this.sys_ServiceTiers?.video.length) {
      this.sys_ServiceTiers.video.forEach(el => {
        this.AddMoreVideoService(el);
      });

    }

    setTimeout(() => {
      if (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data.length) {
        this.sys_ServiceTiers?.data.forEach((el, i) => {
          this.onServiceProfileChange('data', i);
        });

      }
      if (this.servicetierForm.value.video && this.servicetierForm.value.video?.length) {
        this.servicetierForm.value.video?.forEach((el, i) => {
          this.onServiceProfileChange('video', i);
        });
      }
    }, 10);

  }

  voiceInitialize() {
    this.setVoiceServiceType();
    this.systemlossChange();
    this.addressTypeChange();
    if ((this.sys_ServiceTiers?.voice?.ServiceType && this.sys_ServiceTiers?.voice?.ServiceType == 'SIP') || (this.sys_ServiceTiers && !Object.keys(this.sys_ServiceTiers).length)) {
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

  setVoiceServiceType() {
    if (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers?.voice?.ProfileId) {
      let data = this.sys_ServiceTiers?.voice;
      this.servicetierForm.patchValue({
        voice: {
          ProfileId: data.ProfileId ? data.ProfileId : undefined
        }
      });
    } else {
      this.servicetierForm.patchValue({
        voice: {
          ProfileId: this.voiceServiceProfileList[0] ? this.voiceServiceProfileList[0] : undefined
        }
      });
    }
  }

  videoInitialize() {
    // if (this.sys_ServiceTiers?.video && this.sys_ServiceTiers?.video.length) {
    //   this.sys_ServiceTiers.video.forEach(el => {
    //     this.AddMoreVideoService(el);
    //   });

    //   this.sys_ServiceTiers.video.forEach((el, i) => {
    //     this.onServiceProfileChange('video', i);
    //   });
    // }
  }

  get f() {
    return this.servicetierForm.controls;
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



  servicetierChange() {
    //debugger;

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
      } else {
        this.isSIPVoiceServiceType1 = false;
        this.servicetierForm.patchValue({ voice: { Line: { '1': { SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: { CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false } } } } });

      }
    } else if (line && line == 2) {
      if (this.isSIPVoiceServiceType && this.servicetierForm.value.voice.Line['2'].Enable) {
        this.isSIPVoiceServiceType2 = true;
      } else {
        this.isSIPVoiceServiceType2 = false;
        this.servicetierForm.patchValue({ voice: { Line: { '2': { SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: { CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false } } } } });
      }
    }
    //this.dataService.setdataEnableData(line, this.dataEnable);
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



  saveSystem() {
    this.error = false;
    let formError = false, lineOneError = false, lineTwoError = false, videoFormError = false, dataFormError = false;
    this.submitted = true;

    let formData = this.servicetierForm.value;
    formData.systemId = this.systemId;
    //this.Out_Data_Change.emit(this.servicetierForm.value);
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

    if (formError || lineOneError || lineTwoError || videoFormError || dataFormError) {
      if (!lineOneError && lineTwoError) {
        let ele = document.getElementById('profile-tab') as HTMLElement;
        ele.click();
      } else if (lineOneError && !lineTwoError) {
        let ele = document.getElementById('home-tab') as HTMLElement;
        ele.click();
      }

      this.errorInfo = `${this.language['Please fill all required fields with valid data']}`;
      this.error = true;
      return;
    }

    this.Out_Data_Change.emit(this.servicetierForm.value);
    setTimeout(() => {
      this.Out_Data_Submit.emit();
    }, 10)

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
    if (this.sys_ServiceTiers.voice?.Line && this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing) {
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
    if (this.sys_ServiceTiers.voice?.Line && this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing) {
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
  }
  getFeatureProperties(modelName: any, eventChange = false, query = "") {
    this.loading = true;

    if (!query) {
      query = `${this.ssoService.getOrg(this.ORG_ID)}&modelName=${encodeURIComponent(modelName)}`;
    }

    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${query}`).subscribe((json: any) => {

      if (json && json.properties) {

        let opmodes = {};

        let opmodesObj = this.findObjByKeyValue('OpModeOptions', json.properties);

        if (opmodesObj && opmodesObj['configuration']) {
          if (opmodesObj['configuration'].RG) {
            opmodes['RG'] = true;
          }

          if (opmodesObj['configuration'].WAP) {
            opmodes['WAP'] = true;
          }

          if (opmodesObj['configuration']['Managed ONT']) {
            opmodes['Managed ONT'] = true;
          }

          if (opmodesObj['configuration']['WAP-IGMP']) {
            opmodes['WAP-IGMP'] = true;
          }

          if (opmodesObj['configuration']['Modem']) {
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

        this.isSSID2_4GZ = obj['2DOT4GHZ_PRIMARY'] ? true : false;
        this.isSSID5_4GZ = obj['5GHZ_PRIMARY'] ? true : false;
        this.isSSID2_4GZ = this.isSSID5_4GZ ? this.isSSID5_4GZ : this.isSSID2_4GZ;

      }
      setTimeout(() => {
        this.loading = false;
      }, 100);



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
    if (this.systemInfoData?.opMode) {
      this.systemInfoForm.value.opMode = this.systemInfoData?.opMode ? this.systemInfoData?.opMode : "";
      //this.subscriberForm.patchValue({ opMode: this.sys_Det?.opMode })
    }

  }




  onAddAndRemoveDataService(index: number) {
    // if (!this.addDeviceObj.services.showDataServiceByDefault && this.addDeviceObj.services?.ontDataService?.length === 1) {
    //   this.addDeviceObj.services.showDataServiceByDefault = true;
    //   return;
    // }
    // if (index !== -1) {
    //   this.addDeviceObj.services.ontDataService.splice(index, 1);
    // } else {
    //   this.addDeviceObj.services.showDataServiceByDefault = true;
    //   const newDataDeviceObj = {
    //     serviceProfile: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0] : undefined,
    //     isServiceEnabled: true,
    //     bandwidthProfile: undefined,
    //     vLAN: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0].VLAN : undefined,
    //   }
    //   this.addDeviceObj.services.ontDataService.push(newDataDeviceObj);
    //   if (this.dataServiceProfileList[0]) {
    //     this.onVLANChange(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
    //     this.bridgeMBRPortValidation(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
    //   }
    // }
    //this.cd.detectChanges();
  }

  get datas(): FormArray {
    return this.servicetierForm.get('data') as FormArray;
  }

  AddMoreDataService(data?) {
    this.dataList = this.servicetierForm.get('data') as FormArray;
    let createForm = {};
    if (data) {
      if (data.serviceProfile) {
        createForm = data;
      } else {
        createForm = {
          Enable: data.Enable,
          ProfileId: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId] : undefined,
          Overrides: {
            BwProfile: data.BwProfile ? data.BwProfile : undefined,
            VlanId: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId].VLAN : undefined,
          },
          pppoe: {
            Username: data.Username ? data.Username : '',
            Password: data.Password ? data.Password : ''
          },
          serviceProfile: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId] : undefined,
          isAPAS: undefined,
          bridgeMBRPort: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId]?.configurations?.parameterValues?.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS : undefined,
          isBWOverRide: data.BwProfile ? true : false,
          isVLANOverRide: (this.profiles[data.ProfileId] && this.profiles[data.ProfileId]?.VLAN) ? true : false,
        };
      }

    } else {
      createForm = {
        Enable: true,
        ProfileId: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0] : undefined,
        Overrides: {
          BwProfile: undefined,
          VlanId: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0].VLAN : undefined,
        },
        pppoe: {
          Username: '',
          Password: ''
        },
        serviceProfile: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0] : undefined,
        isAPAS: undefined,
        bridgeMBRPort: undefined,
        isBWOverRide: false,
        isVLANOverRide: undefined,
        //vLAN: this.dataServiceProfileList[0] ? this.dataServiceProfileList[0].VLAN : undefined,
      };
    }

    this.dataList.push(this.createItem(createForm));
    let formData = this.servicetierForm.value.data;
    let index = formData.length - 1;
    //setTimeout(() => {
    if (data) {
      //this.onServiceProfileChange('data', index);
    } else {
      if (this.dataServiceProfileList[0]) {
        this.onVLANChange(true, index);
        this.bridgeMBRPortValidation(true, index);
      }
    }
    //}, 10);



  }

  AddMoreVideoService(data?) {
    this.videoList = this.servicetierForm.get('video') as FormArray;
    let createForm = {};
    if (data) {
      if (data.serviceProfile) {
        //edit flow
        createForm = data;
      } else {
        createForm = {
          Enable: data.Enable,
          ProfileId: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId] : undefined,
          Overrides: {
            BwProfile: data.BwProfile ? data.BwProfile : undefined,
            VlanId: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId].VLAN : undefined,
          },
          serviceProfile: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId] : undefined,
          isAPAS: undefined,
          bridgeMBRPort: this.profiles[data.ProfileId] ? this.profiles[data.ProfileId]?.configurations?.parameterValues?.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS : undefined,
          isBWOverRide: data.BwProfile ? true : false,
          isVLANOverRide: (this.profiles[data.ProfileId] && this.profiles[data.ProfileId]?.VLAN) ? true : false,
        };
      }

    } else {
      createForm = {
        Enable: true,
        ProfileId: this.videoServiceProfileList[0] ? this.videoServiceProfileList[0] : undefined,
        Overrides: {
          BwProfile: undefined,
          VlanId: this.videoServiceProfileList[0] ? this.videoServiceProfileList[0].VLAN : undefined,
        },
        serviceProfile: this.videoServiceProfileList[0] ? this.videoServiceProfileList[0] : undefined,
        isAPAS: undefined,
        bridgeMBRPort: undefined,
        isBWOverRide: false,
        isVLANOverRide: undefined,
      };
    }

    this.videoList.push(this.createVideoItem(createForm));

    let formData = this.servicetierForm.value.video;
    let index = formData.length - 1;
    //setTimeout(() => {
    if (data) {
      //this.onServiceProfileChange('video', index);
    } else {
      if (this.videoServiceProfileList[0]) {
        this.onVLANChange(false, index);
        this.bridgeMBRPortValidation(false, index);
      }
    }
    //}, 10);

  }

  removeService(i, isData = false) {
    if (isData) {
      this.dataList.removeAt(i);
    } else {
      this.videoList.removeAt(i);
    }

  }

  bridgeMBRPortValidation(isDataService, index?) {
    //return;
    let serviceStr = isDataService ? 'data' : 'video';
    let formDatas = isDataService ? this.servicetierForm.value.data : this.servicetierForm.value.video;
    let ind = formDatas.length - 1;

    this.serviceErrorMsg = '';
    this.defaultLanValidation = false;
    if (index != undefined) {
      ind = index;
    }

    let selectedProfile = formDatas[ind];
    const defaultPort = selectedProfile?.serviceProfile?.BridgeMemberPort;

    let formData = this.servicetierForm.value;
    let defaultLanValidation = [];
    let nonDataDefaultLanValidation = [];
    let nonVideoDefaultLanValidation = [];

    if (defaultPort) {
      this.servicetierForm.value[serviceStr][ind].bridgeMBRPort = defaultPort;
    }
    if (selectedProfile?.serviceProfile?.defaultConnectionService) {
      this.servicetierForm.value[serviceStr][ind].bridgeMBRPort = ['1', '2', '3', '4'];
    }
    formData.data.forEach(el => {
      if (el.serviceProfile.defaultConnectionService === true) {
        defaultLanValidation.push(el);
      }
    });
    formData.data.forEach(el => {
      if (el.serviceProfile.defaultConnectionService === false) {
        nonDataDefaultLanValidation.push(el);
      }
    });

    formData.video.forEach(el => {
      if (el.serviceProfile.defaultConnectionService === false) {
        nonVideoDefaultLanValidation.push(el);
      }
    });

    if (defaultLanValidation.length > 1) {
      this.defaultLanValidation = true;
      // this.addDeviceObj.configurationObj.defaultLanValidation = true;
      this.serviceErrorMsg = 'Error! Only one RG Routed Data Service may have a Default WAN Connection.';
      return;
    }

    //return
    let portUniqValidation = [];
    this.servicetierForm.value.data.forEach(item => {
      if (item.serviceProfile.defaultConnectionService) {
        item.bridgeMBRPort = ['1', '2', '3', '4'];
      }
    });

    this.servicetierForm.value.video.forEach(item => {
      if (item.serviceProfile.Mode === 'RG Routed') {
        item.bridgeMBRPort = ['1', '2', '3', '4'];
      }
    })

    nonDataDefaultLanValidation.forEach(service => {
      if (service.serviceProfile.Mode !== 'RG Routed') {
        portUniqValidation = portUniqValidation.concat(service.bridgeMBRPort);
        this.servicetierForm.value.data.forEach(item => {
          if (item.serviceProfile?.defaultConnectionService) {
            if (item.bridgeMBRPort) {
              item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                return (service.bridgeMBRPort.indexOf(data) === -1);
              })
            }
          }
        });
        this.servicetierForm.value.video.forEach(item => {
          if (item.serviceProfile.Mode === 'RG Routed') {
            if (item.bridgeMBRPort) {
              item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                return (service.bridgeMBRPort.indexOf(data) === -1);
              })
            }
          }
        });
      }
    });

    nonVideoDefaultLanValidation.forEach(service => {
      if (service.serviceProfile?.Mode !== 'RG Routed') {
        portUniqValidation = portUniqValidation.concat(service.bridgeMBRPort);
        this.servicetierForm.value.data.forEach(item => {
          if (item.serviceProfile.defaultConnectionService) {
            if (item.bridgeMBRPort) {
              item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                return (service.bridgeMBRPort.indexOf(data) === -1);
              })
            }
          }
        });
        this.servicetierForm.value.video.forEach(item => {
          if (item.serviceProfile.Mode === 'RG Routed') {
            if (item.bridgeMBRPort) {
              item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                return (service.bridgeMBRPort.indexOf(data) === -1);
              })
            }
          }
        });
      }
    });
    this.defaultLanValidation = _.filter(portUniqValidation, (val, i, iteratee) => _.includes(iteratee, val, i + 1)).length > 0;
    if (this.defaultLanValidation) {
      //this.addDeviceObj.configurationObj.defaultLanValidation = true;
      this.serviceErrorMsg = 'Error! ONT Half Bridge and ONT Full Bridge services cannot share ports.';
    }
  }

  onServiceProfileChange(service, index, isFromEvent = false) {
    let selectedProfile = this.servicetierForm.value[service][index];
    selectedProfile.serviceProfile = selectedProfile['ProfileId'];
    if (service == 'data') {
      if (selectedProfile.serviceProfile
        && selectedProfile.serviceProfile.configurations &&
        selectedProfile.serviceProfile.configurations
        && selectedProfile.serviceProfile.configurations.parameterValues &&
        selectedProfile.serviceProfile.configurations.parameterValues.ServiceConnectionType == "PPPOE"
      ) {
        //this.showPPPOE = true;
      } else {
        this.servicetierForm.value[service][index].pppoe.Username = '';
        this.servicetierForm.value[service][index].pppoe.Password = '';
      }
    }

    const defaultBWProfile = selectedProfile.serviceProfile ? selectedProfile.serviceProfile.configurations.parameterValues.X_CALIX_SXACC_BW_PROFILE : undefined;
    const antPortAnyService = selectedProfile.serviceProfile.configurations.parameterValues.AnyPortAnyServiceEnabled;
    if (isFromEvent) {
      this.servicetierForm.value[service][index].Overrides.VlanId = selectedProfile.serviceProfile.VLAN !== undefined ? selectedProfile.serviceProfile.VLAN : 0;
      this.servicetierForm.value[service][index].Overrides.BwProfile = defaultBWProfile !== undefined ? defaultBWProfile : undefined;
    }
    this.servicetierForm.value[service][index].isAPAS = antPortAnyService;
    if (selectedProfile.serviceProfile) {
      let isData = (service == 'data') ? true : false;
      this.onBandWidthChange(isData, index);
      this.onVLANChange(isData, index);
    }
  }

  onVLANChange(isData, index?) {
    let formDatas = isData ? this.servicetierForm.value.data : this.servicetierForm.value.video;
    let selectedProfile = formDatas[index];
    this.bridgeMBRPortValidation(isData, index);
    if (selectedProfile?.Overrides?.VlanId !== '') {
      selectedProfile.isVLANOverRide = ((selectedProfile?.Overrides?.VlanId !== undefined && selectedProfile.serviceProfile.VLAN !== undefined)
        && Number(selectedProfile?.Overrides?.VlanId) !== Number(selectedProfile.serviceProfile.VLAN));
    }
    const vLAnVal: any = [];
    const modeDataVal: any = [];
    const modeVideoVal: any = [];
    if (!this.defaultLanValidation) {
      this.servicetierForm.value.data.forEach(item => {
        vLAnVal.push(Number(item.Overrides?.VlanId));
      });
      this.servicetierForm.value.video.forEach(item => {
        vLAnVal.push(Number(item.Overrides?.VlanId));
      });

      const vlanduplicate = _.filter(vLAnVal, (val, i, iteratee) => _.includes(iteratee, val, i + 1));;

      this.servicetierForm.value.data.forEach(item => {
        if (vlanduplicate.indexOf(Number(item.Overrides?.VlanId)) !== -1)
          modeDataVal.push(item.serviceProfile.Mode);
      });
      this.servicetierForm.value.video.forEach(item => {
        if (vlanduplicate.indexOf(Number(item.Overrides?.VlanId)) !== -1)
          modeVideoVal.push(item.serviceProfile.Mode);
      });

      //const servicelength: number = this.addDeviceObj.services.ontDataService.length + this.addDeviceObj.services.ontVideoService.length;

      const uniqueMode = modeDataVal.filter((item, i, ar) => ar.indexOf(item) === i).sort();

      if (uniqueMode.length >= 1 && (modeVideoVal[0] !== 'RG Routed' || uniqueMode[0] !== 'RG Routed')) {
        this.defaultLanValidation = _.filter(vLAnVal, (val, i, iteratee) => _.includes(iteratee, val, i + 1)).length > 0;
        if (this.defaultLanValidation) {
          //this.addDeviceObj.configurationObj.defaultLanValidation = true;
          if ((uniqueMode.indexOf('RG Routed') !== -1 || modeVideoVal.indexOf('RG Routed') !== -1) && uniqueMode.length === modeVideoVal.length) {
            const concateModeArray = uniqueMode.concat(modeVideoVal);
            this.serviceErrorMsg = `Error! VLAN ${vlanduplicate[0]} cannot be used by ${concateModeArray[0]} and ${concateModeArray[1]} services at the same time.`;
          } else {
            if (modeVideoVal.length !== 0) {
              this.serviceErrorMsg = `Error! VLAN ${vlanduplicate[0]} cannot be used by multiple Bridged services.`;
            } else {
              this.serviceErrorMsg = `Error! VLAN ${vlanduplicate[0]} cannot be used by multiple Data services`;
            }
          }
        }
      }
    }
  }

  onBandWidthChange(isData, index) {
    let service = isData ? 'data' : 'video';
    let selectedProfile = this.servicetierForm.value[service][index];
    if (selectedProfile) {
      this.servicetierForm.value[service][index].isBWOverRide = (selectedProfile.Overrides?.BwProfile !== selectedProfile.serviceProfile.configurations.parameterValues.X_CALIX_SXACC_BW_PROFILE);
    }
  }

  onAddVoiceService() {
    //this.servicetierForm.value.voice.Enable = true;
    this.servicetierForm.patchValue({ voice: { Enable: true } });
    //this.servicetierForm.value.voice.ProfileId = this.voiceServiceProfileList[0] ? this.voiceServiceProfileList[0] : undefined;
    this.setVoiceServiceType();
    this.systemlossChange();
    this.addressTypeChange();
  }

  onRemoveVoiceService() {
    this.servicetierForm.value.voice.Enable = false;
  }

  onVoiceServiceTypeChange() {
    let formData = this.servicetierForm.value.voice;
    this.servicetierForm.patchValue({ voice: { ServiceType: formData.ProfileId.configurations?.parameterValues?.Type ? formData.ProfileId.configurations?.parameterValues?.Type : 'SIP' } })
    if (formData.ProfileId && formData.ProfileId.configurations?.parameterValues?.Type === 'SIP') {
      this.voiceServiceTypeChange('SIP');
    } else {
      this.voiceServiceTypeChange();
    }

  }


}
