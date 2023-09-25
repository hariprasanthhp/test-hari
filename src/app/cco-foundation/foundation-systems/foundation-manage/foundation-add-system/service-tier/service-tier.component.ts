import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoundationDataService } from '../../../foundation-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { DeviceGroupService } from 'src/app/support/netops-management/operations/services/device-group.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import _ from 'lodash';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';

@Component({
  selector: 'app-service-tier',
  templateUrl: './service-tier.component.html',
  styleUrls: ['./service-tier.component.scss']
})
export class ServiceTierComponent implements OnInit, OnDestroy {
  Enable = new FormControl(false);
  protectiq = false;
  language;
  languageSubject;
  enable_toggle: boolean = false;
  isSIPVoiceServiceType: boolean = false;
  isFormDisabled: boolean;

  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() formOptions;
  @Input() servicesListData;
  @Output() private Out_sys_ServiceTiers: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_service_tiers_submit: EventEmitter<any> = new EventEmitter();



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
  constructor(
    private translateService: TranslateService,
    private dataService: FoundationDataService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private deviceService: DeviceGroupService,
    // private router: Router,
    // private http: HttpClient,
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
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    this.servicetierForm = new FormGroup({
      data: new FormGroup({
        Enable: new FormControl(false),
        VlanId: new FormControl(''),
        Pbit: new FormControl(),
        //BwProfile: new FormControl(''),
        pppoe: new FormGroup({
          Username: new FormControl(''),
          Password: new FormControl('')
        })
      }),
      video: new FormGroup({
        //BwProfile: new FormControl(''),
        Enable: new FormControl(false),
        VlanId: new FormControl(''),
        Pbit: new FormControl()
      }),
      voice: new FormGroup({
        ServiceType: new FormControl('SIP'),
        DialPlan: new FormControl(null),
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

    this.setInitialData();
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }


    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)

    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.servicesListData && changes.servicesListData.currentValue) {
      this.servicesListData = changes.servicesListData.currentValue;
      this.setServicesData();
    }

  }

  setInitialData() {
    this.Brandwidthitems = this.formOptions?.Brandwidthitems ? this.formOptions?.Brandwidthitems : [];
    this.DialPlanitems = this.formOptions?.DialPlanitems ? this.formOptions?.DialPlanitems : [];
    // 
    // this.voiceServiceTypeChange('SIP');

    if (this.sys_ServiceTiers) {
      this.servicetierForm.patchValue(this.sys_ServiceTiers);
    }

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
    if (this.sys_ServiceTiers.data && this.sys_ServiceTiers.data.Enable) {
      this.dataShowAllFields = true;
    } else {
      this.dataShowAllFields = false;
    }
  }

  voiceInitialize() {
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

  videoInitialize() {
    if (this.sys_ServiceTiers.video?.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
    }
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
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
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
      this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
      return
    }
    else {
      this.emailmsg = "You have entered an invalid email address!";
      this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
      return
    }

  }

  servicetierChange() {
    let form = this.servicetierForm.value;
    if (form.data.Enable) {
      this.dataShowAllFields = true;
    } else {
      this.dataShowAllFields = false;
      this.servicetierForm.patchValue({ data: { Pbit: null, VlanId: '', pppoe: { Password: '', Username: '' } } });
    }

    if (form.video.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
      this.servicetierForm.patchValue({ video: { Pbit: null, VlanId: '' } });
    }
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
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
    this.voiceFormValidate.X_000631_Opt81Client = (value === '' || (value !== '' && this.commonFunc.validateIpORHost(value))) ? true : false;
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

  saveSystem() {
    //debugger;
    this.error = false;
    let formError = false, lineOneError = false, lineTwoError = false, videoFormError = false, dataFormError = false;

    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
    this.submitted = true;
    let formData = this.servicetierForm.value;
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

      this.errorInfo = `Please fill all required fields with valid data`;
      this.error = true;
      return;
    }
    this.out_sys_service_tiers_submit.emit();
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
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }

    this.error = true;
    this.loading = false;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  //advanced setting
  onToggleAdvSettings() {
    this.advanceSettingsLbl = (!this.isShowAdvSetting) ? 'Hide Advanced Settings' : 'Show Advanced Settings';
    this.isShowAdvSetting = !this.isShowAdvSetting;
  }
  onSysLossChange(line) {
    //debugger
    switch (this.servicetierForm.value.voice.Line[line].VoiceProcessing.systemLoss) {
      case "GR-909":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -2;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -4;
        this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
        break;
      case "ANSI":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -3;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -9;
        this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
        break;
      case "ETSI-PSTN":
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.TransmitGain = -4;
        this.servicetierForm.value.voice.Line[line].VoiceProcessing.ReceiveGain = -11;
        this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
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
      this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
    }
    else {
      this.servicetierForm.patchValue({ voice: { Line: { '1': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    if (this.servicetierForm.value.voice.Line['2'].CallingFeatures.X_000631_DirectConnectEnable) {
      this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
    }
    else {
      this.servicetierForm.patchValue({ voice: { Line: { '2': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
  }

}


