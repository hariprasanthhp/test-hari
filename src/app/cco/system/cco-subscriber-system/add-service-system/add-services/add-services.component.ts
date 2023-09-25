import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import _ from 'lodash';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from "lodash"
import { environment } from 'src/environments/environment';
import { AddSubscriberService } from '../add-subscriber.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {
  language;
  Enable = new FormControl(false);
  languageSubject;
  isSIPvoiceServiceType: boolean = true;
  servicesListData = {};
  successInfo: any;
  portForm: FormGroup;
  @Input() createdSubscriberId;
  @Input() sys_Service;
  @Input() AllserviceData;
  @Input() DialPlanitem;
  @Input() data_plan;
  @Input() video_plan;
  @Input() voice_plan;
  @Input() serviceData;
  @Input() rgManagement;
  @Input() provisionOntService;
  @Input() disableService;
  @Input() isPRConfiguredOutside;
  @Output() private Out_Service: EventEmitter<any> = new EventEmitter();
  @Output() private out_servicesubmit: EventEmitter<any> = new EventEmitter();
  serviceForm: FormGroup;
  dataShowAllFields: boolean = false;
  submitted: boolean = false;
  isSIPvoiceServiceType1: boolean = false;
  isSIPvoiceServiceType2: boolean = false;
  advanceSettingsLbl: string = 'Show Advanced Settings';
  isShowAdvSetting: boolean = false;
  dataEnable: boolean;
  VideoEnable: boolean;
  getAllProfileSubscribe: any;
  ORG_ID: any;
  errorInfo: any;
  getAllDialPlanSubscribe: any;
  error: boolean;
  loading: boolean;
  dialPlanList: any;
  videoShowAllFields: boolean;
  addressingTypeItems = ['DHCP', 'Static'];
  portItem = [
    { label: 'RG Line 1', value: 'RG Line 1' },
    { label: 'RG Line 2', value: 'RG Line 2' },
    { label: 'ONT Line 1', value: 'ONT Line 1' },
    { label: 'ONT Line 2', value: 'ONT Line 2' },
    { label: 'ONT Line 3', value: 'ONT Line 3' },
    { label: 'ONT Line 4', value: 'ONT Line 4' },
    { label: 'ONT Line 5', value: 'ONT Line 5' },
    { label: 'ONT Line 6', value: 'ONT Line 6' },
    { label: 'ONT Line 7', value: 'ONT Line 7' },
    { label: 'ONT Line 8', value: 'ONT Line 8' },
  ];
  isCOC: boolean = this.router.url.includes('cco/system')
  voiceParam = ['GR-909', 'ANSI', 'ETSI-PSTN', 'Manual'];
  voiceFormValidate: any = {
    staticNetmask: true,
    staticGateway: true,
    staticIpAddress: true,
    DNSServers: true,
    cVlan: true
  };

  lineFormValidate = {
    'P1': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      }
    },
    'P2': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P3': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P4': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P5': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P6': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P7': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'P8': {
      //Enable: false,
      SIP: {
        sipUsername: true,
        sipPassword: true,
        sipUri: true,
        name: true
      },
      X_000631_H248: {
        terminationId: true,
        name: true
      },
    },
    'L1': {
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
    'L2': {
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
    sVlan: true,
    cVlan: true,
  };
  voiceFormValidate1: any = {
    sVlan: true,
    cVlan: true,
  };

  dataFormValidate: any = {
    Enable: true,
    sVlan: true,
    cVlan: true,
    staticIpAddress: true,
    staticNetmask: true,
    staticGateway: true,
  };
  userNameErrorMsg: string;
  isStaticHost: boolean;
  success: boolean;
  DataPlanItem: any;
  VideoPlanItem: any;
  VoicePlanItem: any;
  usenameRequired: boolean = true;
  PasswordRequired: boolean = true;
  urlRequired: boolean = true;
  terminationIdRequired: boolean = true;
  isStaticHostvideo: boolean;
  InterfaceVideoItem: any[];
  hidepwd: boolean = true;
  advancedForms1: boolean;
  isStaticHost1: boolean;
  dataPlanItem1: any[];
  ipv4addressRequired: boolean = true;
  pppoeusenameRequired: boolean = true;
  pppoePasswordRequired: boolean = true;
  pppoeusenameRequiredData: boolean = true;
  pppoePasswordRequiredData: boolean = true;
  ipv4addressRequiredData: boolean = true;
  pppoePasswordRequiredVideo: boolean = true;
  pppoeusenameRequiredVideo: boolean = true;
  ipv4addressRequiredVideo: boolean = true;
  enableadditionaldata: boolean = false;
  enableadditionalvideo: boolean = false;
  enableadditionaldata1: boolean = false;
  priorityItems: any[];
  validateScopeStage: boolean;
  isSIPvoiceServiceType3: boolean = false;
  isSIPvoiceServiceType4: boolean = false;
  enableoverrides: boolean = false;
  enableoverridesVideo: boolean = false;
  enableoverridesVoice: boolean = false;
  isAddressTypeStatic: boolean = false;
  showIPAdress: boolean = true;
  HideIPAdress: boolean = true
  getVlanModeSub: any;
  HideCvlan: boolean = true;
  HideCvlanVideo: boolean = true;
  HidecVlanVoice: boolean = true;
  dataplan: any;
  voiceplan: any;
  memberPorts: [];
  EnableStatic: boolean = true;
  passwordError: boolean = false;
  enableadditionaldataip: boolean = true;
  isSIPvoiceServicePortType3: boolean = false;
  isSIPvoiceServicePortType4: boolean = false;
  isSIPvoiceServicePortType5: boolean = false;
  isSIPvoiceServicePortType6: boolean = false;
  isSIPvoiceServicePortType7: boolean = false;
  isSIPvoiceServicePortType8: boolean = false;
  videoplan: any;
  disableInterface: boolean = false;
  disableInterfaceRG: boolean = false
  dev: boolean;
  redoServicesub: any;
  allowUsoc: boolean = false;
  isPwdVisible = {
    PPPoE: true,
    RG1: true,
    RG2: true,
    ONT1: true,
    ONT2: true,
    ONT3: true,
    ONT4: true,
    ONT5: true,
    ONT6: true,
    ONT7: true,
    ONT8: true,
  };
  public RGMemberportItem: any[];
  public RGMemberportData: any[];
  ONTmemberports: { name: string; value: string; }[];
  interfaceRGItem: { name: string; value: string; }[];
  allowUsocVideo: boolean=false;
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    public commonFunc: CommonFunctionsService,
    private uriValidate: UriValidatorService,
    private systemService: AddSubscriberService,
  ) { this.ORG_ID = this.ssoService.getOrgId(); }
  @Output() private serviceFormClone: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.portForm = new FormGroup(
      {
        port: new FormControl(null)
      }
    );
    let base = `${environment.API_BASE}`;
    if (!this.isCOC) this.portItem = this.portItem.filter(e => !e.label.includes('ONT'))
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    if (!this.disableService) {
      this.disableService = false
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    this.dataPlanItem(true);
    this.videoPlanItem(true);
    this.VoicePlan(true);
    this.serviceForm = new FormGroup({
      data: new FormGroup({
        Enable: new FormControl(false),
        usoc: new FormControl(null),
        interface1: new FormControl(null),
        interface: new FormControl(null),
        note: new FormControl(''),
        isOntService:new FormControl(false),
        sVlan: new FormControl(''),
        cVlan: new FormControl(''),
        staticIpAddress: new FormControl(''),
        staticNetmask: new FormControl(''),
        staticGateway: new FormControl(''),
        pppoeUsername: new FormControl(''),
        pppoePassword: new FormControl(''),
        memberPorts: new FormControl([]),
        _id: new FormControl('')
        //staticIpAddressFamily: new FormControl(''),
      }),
      video: new FormGroup({
        Enable: new FormControl(false),
        usoc: new FormControl(null),
        sVlan: new FormControl(''),
        cVlan: new FormControl(''),
        isOntService:new FormControl(false),
        interface: new FormControl(null),
        interface1: new FormControl(null),
        note: new FormControl(''),
        memberPorts: new FormControl([]),
        _id: new FormControl('')

      }),
      voice: new FormGroup({
        Enable: new FormControl(false),
        usoc: new FormControl(null),
        sVlan: new FormControl(''),
        interface: new FormControl(null),
        note: new FormControl(''),
        isOntService:new FormControl(false),
        cVlan: new FormControl(''),
        voiceServiceType: new FormControl('SIP'),
        port: new FormControl([]),
        ping: new FormControl(true),
        traceroute: new FormControl(true),
        staticIpAddressFamily: new FormControl(''),
        ServiceConnectionType: new FormControl('DHCP'),
        staticIpAddress: new FormControl(''),
        staticNetmask: new FormControl(''),
        staticGateway: new FormControl(''),
        DNSServers: new FormControl(''),
        voiceHostname: new FormControl(''),
        faxT38: new FormControl(false),
        _id: new FormControl(''),
        voiceInterfaces: this.voiceInterFaceGroup(),
        staticIpConfigurations: new FormArray([
          new FormGroup({
            deviceType: new FormControl('RG'),
            staticIpAddress: new FormControl(''),
            staticNetmask: new FormControl(''),
            staticGateway: new FormControl(''),

          })
        ])
      })
    });
    this.setInitialData();
    this.validateIp();
    this.serviceFormClone.emit(this.serviceForm)
  }
  voiceInterFaceGroup(): FormGroup {
    return new FormGroup({
      P1: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p1'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p1'),
          terminationId: new FormControl('')
        }),
      }),
      P2: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p2'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p2'),
          terminationId: new FormControl('')
        }),
      }),
      P3: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p3'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p3'),
          terminationId: new FormControl('')
        }),
      }),
      P4: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p4'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p4'),
          terminationId: new FormControl('')
        }),
      }),
      P5: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p5'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p5'),
          terminationId: new FormControl('')
        }),
      }),
      P6: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p6'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p6'),
          terminationId: new FormControl('')
        }),
      }),
      P7: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p7'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p7'),
          terminationId: new FormControl('')
        }),
      }),
      P8: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('p8'),
          sipUsername: new FormControl(''),
          sipPassword: new FormControl(''),
          sipUri: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('p8'),
          terminationId: new FormControl('')
        }),
      }),
      L1: new FormGroup({
        Enable: new FormControl(false),
        SIP: new FormGroup({
          name: new FormControl('L1'),
          AuthUserName: new FormControl(''),
          AuthPassword: new FormControl(''),
          URI: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('L1'),
          TerminationId: new FormControl('')
        }),
        MGCP: new FormGroup({
          name: new FormControl('L1'),
          X_000631_GR303: new FormControl(false)
        }),
        X_000631_TdmGw: new FormGroup({
          name: new FormControl('L1'),
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
      L2: new FormGroup({
        Enable: new FormControl(false),

        SIP: new FormGroup({
          name: new FormControl('L2'),
          AuthUserName: new FormControl(''),
          AuthPassword: new FormControl(''),
          URI: new FormControl(''),
        }),
        X_000631_H248: new FormGroup({
          name: new FormControl('L2'),
          TerminationId: new FormControl('')
        }),
        MGCP: new FormGroup({
          name: new FormControl('L2'),
          X_000631_GR303: new FormControl(false)
        }),
        X_000631_TdmGw: new FormGroup({
          name: new FormControl('L2'),
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
  }
  advancedForms: boolean = false;
  showAdvancedForm(value) {
    if (value === 'data') {
      this.advancedForms = !this.advancedForms
    }
  }

  advancedVoice: boolean = false;
  showAdvancedVoice() {
    this.advancedVoice = !this.advancedVoice
  }
  EnableRgMode(value) {
    if (value == 'data') {
      this.enableadditionaldata = !this.enableadditionaldata
    }
    // if (this.enableadditionaldata === false) {
    //   this.serviceForm.patchValue({ data: { pppoeUsername: '', pppoePassword: '' } })
    // }
    this.Out_Service.emit(this.serviceForm.value)

  }
  EnableOverrides(value) {
    if (value == 'data') {
      this.enableoverrides = !this.enableoverrides;
    } else if (value == 'video') {
      this.enableoverridesVideo = !this.enableoverridesVideo;
    } else {
      this.enableoverridesVoice = !this.enableoverridesVoice
    }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    this.Out_Service.emit(this.serviceForm.value)

    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes.servicesListData && changes.servicesListData.currentValue) {
      this.servicesListData = changes.servicesListData.currentValue;
    }
  }
  validStaticIp: boolean = false;
  validateIp() {
    this.validStaticIp = this.commonFunc.ValidateIpV4Addr(this.serviceForm.value.voice.staticIpAddress);
    this.serviceForm.get('voice').patchValue({
      ServiceConnectionType: this.validStaticIp ? 'Static' : 'DHCP'
    });
  }
  MemberportItem = [
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    }
  ]
  MemberportItemforONT = [
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
  ]
  InterfaceItemForVideo = [
    {
      name: 'ONT F1',
      value: 'ONT F1'
    },
    {
      name: 'G1',
      value: 'G1',
    },
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    },
    {
      name: 'RG - L2 Bridged',
      value: 'RG F1'
    }
  ]
  InterfaceItemForVoice = [
    {
      name: 'ONT F1',
      value: 'ONT F1'
    },
    {
      name: 'G1',
      value: 'G1',
    },
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    }
  ]
  InterfaceItemfoundtaion = [
    {
      name: 'G1',
      value: 'G1',
    },
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    },
    {
      name: 'RG - L2 Bridged',
      value: 'RG F1'
    }
  ]
  InterfaceItemData = [
    {
      name: 'G1',
      value: 'G1',
    },
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    },
    {
      name: 'RG - L2 Bridged',
      value: 'RG F1'
    }
  ]
  MemberItem = [
    {
      name: 'x1',
      value: 'x1',
    },
    {
      name: 'x2',
      value: 'x2',
    },
    {
      name: 'x3',
      value: 'x3',
    },
    {
      name: 'g1',
      value: 'g1',
    },
    {
      name: 'g2',
      value: 'g2',
    },
    {
      name: 'g3',
      value: 'g3',
    },
    {
      name: 'g4',
      value: 'g4',
    },
    {
      name: 'g5',
      value: 'g5',
    },
    {
      name: 'g6',
      value: 'g6',
    },
  ]
  setInitialData() {
    this.DataPlanItem = this.data_plan ? this.data_plan : [];


    this.VideoPlanItem = this.video_plan ? this.video_plan : [];
    this.VoicePlanItem = this.voice_plan ? this.voice_plan : [];
    this.initialize();
  }


  initialize() {
    this.dataInitialize();
    this.videoInitialize();
    this.voiceInitialize();
  }

  dataInitialize() {
    let data = this.serviceData?.data;


    if (this.sys_Service?.data) {
      let dataservice = this.sys_Service?.data;

      this.DataPlanItem.forEach((el) => {


        if (el.name === dataservice?.usoc) {
          this.allowUsoc = true
        }
      })
      if (this.allowUsoc && dataservice?.usoc && (dataservice?.activate || Object.keys(this.serviceData.data).length)) {
        this.serviceForm.patchValue({ data: { Enable: true, usoc: dataservice?.usoc ? dataservice?.usoc : null, cVlan: dataservice?.cVlan ? dataservice?.cVlan : '', interface: dataservice?.interface ? dataservice?.interface : '', note: dataservice?.note ? dataservice?.note : '', memberPorts: dataservice?.memberPorts ? dataservice?.memberPorts : '', _id: dataservice._id || '',isOntService:dataservice?.isOntService ? dataservice?.isOntService : false } })
        if (this.serviceForm.value.video.memberPorts?.length !== 0) {
          this.interfaceRGItem = this.InterfaceItemData
          this.serviceForm.value.video.memberPorts.forEach(data => {
            this.interfaceRGItem = this.interfaceRGItem.filter((item) => item.value !== data)
          })

        } else {
          this.interfaceRGItem = this.InterfaceItemData
        }
      }
      if (dataservice?.sVlan) {
        this.enableoverrides = true
        this.serviceForm.patchValue({ data: { interface: dataservice?.interface ? dataservice?.interface : null, sVlan: dataservice?.sVlan, _id: dataservice._id || '' } });
      }
      if (dataservice?.pppoeUsername || dataservice?.pppoePassword) {
        this.enableadditionaldata = true;
        this.serviceForm.patchValue({
          data: {
            pppoeUsername: dataservice?.pppoeUsername,
            pppoePassword: dataservice?.pppoePassword,
            _id: dataservice._id || ''
          }
        })
      }
      if (dataservice?.staticIpAddress || dataservice?.staticNetmask || dataservice?.staticGateway || dataservice?.staticIpAddressFamily) {
        this.isStaticHost = true;
        this.advancedForms = true;
        if ((dataservice?.staticIpAddressFamily === 'ipv6')) {
          this.EnableStatic = false
        }
        if (dataservice?.staticIpAddress || dataservice?.staticNetmask || dataservice?.staticGateway) {
          this.enableadditionaldataip = false
        }
        this.serviceForm.patchValue({
          data: {
            //staticHostMode: 'L2',
            staticIpAddress: dataservice?.staticIpAddress,
            staticNetmask: dataservice?.staticNetmask,
            staticGateway: dataservice?.staticGateway,
            staticIpAddressFamily: dataservice?.staticIpAddressFamily,
            _id: dataservice._id || ''
          }
        })
      }
      if (dataservice?.interface === 'G1' || data?.interface === 'G1') {
        this.showIPAdress = true
        this.HideIPAdress = false
      } else if (!dataservice?.interface) {
        this.showIPAdress = true
        this.HideIPAdress = true
      } else {
        this.showIPAdress = false
        this.HideIPAdress = true
      }
    } else {

      this.serviceForm.patchValue({ data: { Enable: false, usoc: null, ceVlan: '', interface: null, untagged: false, cVlan: '', interface1: null, sVlan: '', isStaticHost: false, staticIpAddress: '', staticNetmask: '', staticGateway: '', pppoeUsername: "", pppoePassword: "", ipV4Address: "", staticIpAddressFamily: '', pBits: '', note: '', _id: '',isOntService:false } });
    }
    this.Out_Service.emit(this.serviceForm.value)

  }


  voiceInitialize() {
    this.systemlossChange();
    let voice = this.serviceData?.voice;
    if (this.sys_Service?.voice?.usoc && (this.sys_Service?.voice?.activate || Object.keys(this.serviceData.voice).length)) {
      this.serviceForm.patchValue({ voice: { Enable: true, usoc: this.sys_Service?.voice?.usoc ? this.sys_Service?.voice?.usoc : null, voiceServiceType: this.sys_Service?.voice?.voiceServiceType, sVlan: this.sys_Service?.voice?.sVlan ? this.sys_Service?.voice?.sVlan : '', interface: this.sys_Service?.voice?.interface ? this.sys_Service?.voice?.interface : null, cVlan: this.sys_Service?.voice.cVlan ? this.sys_Service?.voice?.cVlan : "", voiceHostname: this.sys_Service?.voice?.voiceHostname, faxT38: this.sys_Service?.voice?.faxT38, staticIpAddressFamily: this.sys_Service?.voice?.staticIpAddressFamily, staticIpAddress: this.sys_Service?.voice?.staticIpAddress, staticNetmask: this.sys_Service?.voice?.staticNetmask, staticGateway: this.sys_Service?.voice?.staticGateway, note: this.sys_Service?.voice?.note ? this.sys_Service?.voice?.note : '', _id: this.sys_Service?.voice?._id || '' ,isOntService:this.sys_Service?.voice?.isOntService ? this.sys_Service?.voice?.isOntService : false} })
    }
    if (this.sys_Service?.voice?.sVlan) {
      this.enableoverridesVoice = true;
    }
    if (this.sys_Service?.voice?.voiceHostname || this.sys_Service?.voice?.faxT38 || this.sys_Service?.voice?.staticIpAddressFamily || this.sys_Service?.voice?.staticIpAddress || this.sys_Service?.voice?.staticNetmask || this.sys_Service?.voice?.staticGateway) {
      this.advancedVoice = true;
    }
    if (this.sys_Service?.voice?.staticIpAddress || this.sys_Service?.voice?.staticNetmask || this.sys_Service?.voice?.staticGateway) {
      this.isAddressTypeStatic = true
      this.serviceForm.patchValue({ voice: { ServiceConnectionType: 'Static' } })
      this.advancedVoice = true;
    }
    if (this.sys_Service?.voice?.voiceServiceType === 'SIP') {
      this.isSIPvoiceServiceType = true
    } else {
      this.isSIPvoiceServiceType = false
    }

    this.EnableVoiceLine('P1');
    this.EnableVoiceLine('P2');
    this.EnableVoiceLine('L1');
    this.EnableVoiceLine('L2');
    this.EnableVoiceLine('P3');
    this.EnableVoiceLine('P4');
    this.EnableVoiceLine('P5');
    this.EnableVoiceLine('P6');
    this.EnableVoiceLine('P7');
    this.EnableVoiceLine('P8');
    this.serviceForm.value?.voice?.port?.forEach(e => {
      if (e.includes("ONT")) {
        this.ontPortSelected = true;
      } else {
        this.RGPortSelected = true;
      }
    }
    );
  }

  videoInitialize() {
    //debugger
    let videoService = this.sys_Service?.video;
    if(this.sys_Service?.video){
      this.VideoPlanItem.forEach((el) => {
        if (el.name === videoService?.usoc) {
          this.allowUsocVideo = true
        }
      })
    }

   
    let video = this.serviceData?.video;
    if (this.allowUsocVideo && this.sys_Service?.video?.usoc && (videoService?.activate || Object.keys(this.serviceData.video))) {
      this.serviceForm.patchValue({ video: { _id: this.sys_Service?.video?._id || '', Enable: true, usoc: this.sys_Service?.video?.usoc ? this.sys_Service?.video?.usoc : null, note: this.sys_Service?.video?.note ? this.sys_Service?.video?.note : '', isOntService:this.sys_Service?.video?.isOntService ? this.sys_Service?.video?.isOntService : false } })
    }
    if (this.sys_Service?.video?.sVlan) {
      this.enableoverridesVideo = true;
    }
    if (this.sys_Service?.video?.sVlan || this.sys_Service?.video?.interface || this.sys_Service?.video?.cVlan || this.sys_Service?.video?.memberPorts) {
      if (this.sys_Service?.video?.memberPorts || this.sys_Service?.video?.interface === 'ONT F1') {
        this.disableInterface = true;
        this.ONTmemberports = this.MemberportItem.filter((item) => item.value !== this.serviceForm.value.data.interface)
      }
      if (this.sys_Service?.video?.memberPorts || this.sys_Service?.video?.interface === 'RG F1') {
        this.disableInterfaceRG = true;

      }

      this.serviceForm.patchValue({ video: { _id: this.sys_Service?.video?._id || '', sVlan: this.sys_Service?.video?.sVlan ? this.sys_Service?.video?.sVlan : '', interface: this.sys_Service?.video?.interface ? this.sys_Service?.video?.interface : null, memberPorts: this.sys_Service?.video?.memberPorts ? this.sys_Service?.video?.memberPorts : '', cVlan: this.sys_Service?.video?.cVlan ? this.sys_Service?.video?.cVlan : '', interface1: this.sys_Service?.video?.interface ? this.sys_Service?.video?.interface : '', note: this.sys_Service?.video?.note ? this.sys_Service?.video?.note : '', } });
      //this.memberPorts=this.sys_Service?.video?.memberPorts ? this.sys_Service?.video?.memberPorts[0]:''
    }
    this.Out_Service.emit(this.serviceForm.value)
  }

  dataPlanItem(value?) {

    this.DataPlanItem = this.data_plan ? this.data_plan : [];
    if (value == true) {
      let result = this.sys_Service?.data?.usoc
      this.dataplan = this.DataPlanItem.filter(obj => {
        return obj.name === result
      })

    } else {
      var result = this.serviceForm.value.data?.usoc
      this.dataplan = this.DataPlanItem.filter(obj => {
        return obj.name === result
      })
      this.getVlanModeSub = this.systemService.GetInterface(this.serviceForm.value.data?.usoc).subscribe((res: any) => {
        this.RGMemberportData = res?.BridgedInterface
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }
    const name = this.dataplan.length !== 0 ? this.dataplan[0].serviceTemplateName : '';
    if (name) {
      this.loading = true;
      this.getVlanModeSub = this.systemService.GetVlanMode(name).subscribe((res: any) => {
        let VLANMode = res?.vlanMode ? res?.vlanMode : ''
        if (VLANMode === 'N2ONE' || !VLANMode) {
          this.HideCvlan = true;
          this.serviceForm.patchValue({ data: { cVlan: '' } })
        } else {
          this.HideCvlan = false;
        }
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  RGMemberItem() {
    if (this.serviceForm.value.video.interface === 'RG F1') {
      this.serviceForm.patchValue({ video: { memberPorts: this.RGMemberportItem } })
    } else if (this.serviceForm.value.video.interface === 'ONT F1') {
      this.ONTmemberports = this.MemberportItem.filter((item) => item.value !== this.serviceForm.value.data.interface)
      this.disableInterface = false
      this.serviceForm.patchValue({ video: { memberPorts: '' } })
    }
    else {
      this.disableInterface = false
      this.serviceForm.patchValue({ video: { memberPorts: '' } })
    }
    if (this.serviceForm.value.video.interface === 'RG F1') {
      this.getVlanModeSub = this.systemService.GetInterface(this.serviceForm.value.video?.usoc).subscribe((res: any) => {
        this.disableInterfaceRG = true;
        this.RGMemberportItem = res?.BridgedInterface;
        this.serviceForm.patchValue({ video: { memberPorts: this.RGMemberportItem, interface1: '' } })
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  RGMemberItemdata() {
    if (this.serviceForm.value.data.interface === 'RG F1') {
      this.disableInterfaceRG = true
      this.serviceForm.patchValue({ data: { memberPorts: this.RGMemberportData } })
    } else if (this.serviceForm.value.data.interface === 'ONT F1') {
      this.ONTmemberports = this.MemberportItem.filter((item) => item.value !== this.serviceForm.value.video.interface)
      this.serviceForm.patchValue({ data: { memberPorts: '' } })
    }
    else {
      this.serviceForm.patchValue({ video: { memberPorts: '' } })
    }
    if (this.serviceForm.value.data.interface === 'RG F1') {
      this.getVlanModeSub = this.systemService.GetInterface(this.serviceForm.value.data?.usoc).subscribe((res: any) => {
        this.RGMemberportData = res?.BridgedInterface;
        this.serviceForm.patchValue({ data: { memberPorts: this.RGMemberportData } })
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  videoPlanItem(value?) {

    this.VideoPlanItem = this.video_plan ? this.video_plan : [];
    if (value == true) {
      let result = this.sys_Service?.video?.usoc
      this.videoplan = this.VideoPlanItem.filter(obj => {
        return obj.name === result
      })

    } else {
      var result = this.serviceForm.value.video?.usoc
      this.videoplan = this.VideoPlanItem.filter(obj => {
        return obj.name === result
      })
      this.getVlanModeSub = this.systemService.GetInterface(this.serviceForm.value.video?.usoc).subscribe((res: any) => {
        this.RGMemberportItem = res?.BridgedInterface
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })

    }
    const name = this.videoplan.length !== 0 ? this.videoplan[0].serviceTemplateName : '';
    if (name) {
      this.loading = true;
      this.getVlanModeSub = this.systemService.GetVlanMode(name).subscribe((res: any) => {
        let VLANMode = res?.vlanMode ? res?.vlanMode : ''
        if (VLANMode === 'N2ONE') {
          this.HideCvlanVideo = true;
          this.serviceForm.patchValue({ video: { cVlan: '' } })
        } else {
          this.HideCvlanVideo = false;
        }
        this.loading = false;
        this.Out_Service.emit(this.serviceForm.value)
      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }
  VoicePlan(value?) {

    this.VoicePlanItem = this.voice_plan ? this.voice_plan : [];
    if (value == true) {
      var result = this.sys_Service?.voice?.usoc
      this.voiceplan = this.VoicePlanItem.filter(obj => {
        return obj.name === result
      })
    } else {
      var result = this.serviceForm.value.voice?.usoc
      this.voiceplan = this.VoicePlanItem.filter(obj => {
        return obj.name === result
      })
    }
    const name = this.voiceplan.length !== 0 ? this.voiceplan[0].serviceTemplateName : '';
    if (name) {
      this.loading = true;
      this.getVlanModeSub = this.systemService.GetVlanMode(name).subscribe((res: any) => {
        let VLANMode = res?.vlanMode ? res?.vlanMode : ''
        if (VLANMode === 'N2ONE' || !VLANMode) {
          this.HidecVlanVoice = true;
          this.serviceForm.patchValue({ voice: { cVlan: '' } })
        } else {
          this.HidecVlanVoice = false;
        }
        let serviceType = res?.acsJsonb?.Type ? res?.acsJsonb?.Type : 'SIP'
        this.serviceForm.patchValue({ voice: { voiceServiceType: serviceType } })
        // if (!value) {
        //   this.isSIPvoiceServiceType2 = false;
        //   this.isSIPvoiceServiceType1 = false;
        //   this.isSIPvoiceServiceType3 = false;
        //   this.isSIPvoiceServicePortType3 = false;
        //   this.isSIPvoiceServicePortType4 = false;
        //   this.isSIPvoiceServicePortType5 = false;
        //   this.isSIPvoiceServicePortType6 = false;
        //   this.isSIPvoiceServicePortType7 = false;
        //   this.isSIPvoiceServicePortType8 = false;
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P8': { Enable: false, SIP: { name: 'p8', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p8', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P7': { Enable: false, SIP: { name: 'p7', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p7', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P6': { Enable: false, SIP: { name: 'p6', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p6', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P5': { Enable: false, SIP: { name: 'p5', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p5', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P4': { Enable: false, SIP: { name: 'p4', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p4', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P3': { Enable: false, SIP: { name: 'p3', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p3', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P2': { Enable: false, SIP: { name: 'p2', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p2', terminationId: '' } } } } })
        //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P1': { Enable: false, SIP: { name: 'p1', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p1', terminationId: '' } } } } })
        //   this.isSIPvoiceServiceType3 = false;
        //   this.serviceForm.patchValue({
        //     voice: {
        //       voiceInterfaces: {
        //         'L1': {
        //           Enable: false,
        //           SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: {
        //             CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false,
        //             X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: ''
        //           }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: '' }, X_000631_TdmGw: { Crv: '' }
        //         }
        //       }
        //     }
        //   });
        //   this.isSIPvoiceServiceType4 = false;
        //   this.serviceForm.patchValue({
        //     voice: {
        //       voiceInterfaces: {
        //         'L2': {
        //           Enable: false,
        //           SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: {
        //             CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false,
        //             X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: ''
        //           }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: '' },
        //           X_000631_TdmGw: { Crv: '' }
        //         }
        //       }
        //     }
        //   });
        // }

        if (this.sys_Service?.voice) {
          this.sys_Service.voice.voiceServiceType = serviceType
        }
        if (serviceType === 'MGCP' || serviceType === 'X_000631_TDMGW') {
          this.portItem = [
            { label: 'RG Line 1', value: 'RG Line 1' },
            { label: 'RG Line 2', value: 'RG Line 2' },
          ]
        } else {
          if (this.isCOC) {
            this.portItem = [
              { label: 'RG Line 1', value: 'RG Line 1' },
              { label: 'RG Line 2', value: 'RG Line 2' },
              { label: 'ONT Line 1', value: 'ONT Line 1' },
              { label: 'ONT Line 2', value: 'ONT Line 2' },
              { label: 'ONT Line 3', value: 'ONT Line 3' },
              { label: 'ONT Line 4', value: 'ONT Line 4' },
              { label: 'ONT Line 5', value: 'ONT Line 5' },
              { label: 'ONT Line 6', value: 'ONT Line 6' },
              { label: 'ONT Line 7', value: 'ONT Line 7' },
              { label: 'ONT Line 8', value: 'ONT Line 8' },]
          } else {
            this.portItem = [
              { label: 'RG Line 1', value: 'RG Line 1' },
              { label: 'RG Line 2', value: 'RG Line 2' },
            ]
          }



        }
        this.loading = false;

      }, (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.loading = false;
      })
    }else{
      this.HidecVlanVoice = false;
    }


  }

  get f() {
    return this.serviceForm.controls;
  }
  showPass() {
    this.hidepwd = !this.hidepwd;
  }
  disableChange(type) {
    if (type === 'data' && this.serviceForm.value.data.Enable === false) {
      this.advancedForms = false;
      this.serviceForm.patchValue({ data: { usoc: null, interface: null, cVlan: null, sVlan: null, staticIpAddress: '', staticNetmask: '', staticGateway: '', pppoeUsername: "", pppoePassword: "", staticIpAddressFamily: "", note: "", port: null, interface1: null } })
      this.enableadditionaldataip = true

    }
    if (type === 'video' && !this.serviceForm.value.video.Enable) {
      this.serviceForm.patchValue({ video: { usoc: null, interface: null, memberPorts: '', note: '', sVlan: null, cVlan: null, interface1: null } })
    }
    if (type === 'voice' && !this.serviceForm.value.voice.Enable) {
      this.isSIPvoiceServiceType1 = false;
      this.isSIPvoiceServiceType2 = false;
      this.isSIPvoiceServiceType3 = false;
      this.isSIPvoiceServiceType4 = false;
      this.isSIPvoiceServiceType = true;
      this.isSIPvoiceServicePortType3 = false;
      this.isSIPvoiceServicePortType4 = false;
      this.isSIPvoiceServicePortType5 = false;
      this.isSIPvoiceServicePortType6 = false;
      this.isSIPvoiceServicePortType7 = false;
      this.isSIPvoiceServicePortType8 = false;
      this.ontPortSelected = false;
      this.RGPortSelected = false;
   
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P1': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P2': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P3': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P4': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P5': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P6': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P7': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'P8': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'L1': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      this.serviceForm.patchValue({ voice: { usoc: null, note: '', sipUsername: '', sipPassword: '', sipUri: '', terminationId: '', cVlan: null, sVlan: null, interface: null, port: [], voiceInterfaces: { 'L2': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '',  AuthPassword:"", AuthUserName:"", URI:"" }, X_000631_H248: { name: '', terminationId: '' } } } } })
      // this.serviceForm.patchValue({ voice: {note:''} })
      this.portForm.patchValue({ port: null });
    }
    this.Out_Service.emit(this.serviceForm.value)
  }
  serviceChange() {
    if (this.serviceForm.value.video.memberPorts && this.serviceForm.value.video.memberPorts?.length !== 0) {
      this.interfaceRGItem = this.InterfaceItemData
      this.serviceForm.value.video?.memberPorts?.forEach(data => {
        this.interfaceRGItem = this.interfaceRGItem?.filter((item) => item.value !== data)
      })

    } else {
      this.interfaceRGItem = this.InterfaceItemData
    }
    let formDeepCopy = JSON.parse(JSON.stringify(this.serviceForm.value));
    if (!this.ontPortSelected) {
      if (formDeepCopy.voice.hasOwnProperty('staticIpAddress')) {
        delete formDeepCopy.voice.staticIpAddress
      }
      if (formDeepCopy.voice.hasOwnProperty('staticNetmask')) {
        delete formDeepCopy.voice.staticNetmask
      }
      if (formDeepCopy.voice.hasOwnProperty('staticGateway')) {
        delete formDeepCopy.voice.staticGateway
      }

    }
    this.Out_Service.emit(formDeepCopy);
  }
  portChange(e) {


    this.serviceForm.get('voice').patchValue({
      port: [e.value]
    })
    this.serviceForm.get('voice').get('voiceInterfaces').reset(this.voiceInterFaceGroup().value);
    //     'L1': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: '', terminationId: '' }
    // 'L2': { Enable: false, SIP: { name: '', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: '', terminationId: '' }
    //     this.serviceForm.get('voice').setValue(
    //       voice.map(e=>{
    //         port : [e.value]
    //       })
    // )
  }
  serviceChangeEvent(event) {

    for (let key in this.serviceForm.value.voice.voiceInterfaces) {
      this.serviceForm.value.voice.voiceInterfaces[key].Enable = false;
    };
    this.ontPortSelected = false;
    this.RGPortSelected = false;
    event.forEach(({ value }) => {
      let key = `${value.includes('ONT') ? 'P' : 'L'}${value.match(/\d/)[0]}`;
      this.serviceForm.value.voice.voiceInterfaces[key].Enable = true;
      if (value.includes('ONT')) {
        this.ontPortSelected = true;

      } else {
        this.RGPortSelected = true;
      }

    })
    if (!this.ontPortSelected) {
      this.voiceFormValidate.staticNetmask = true;
      this.voiceFormValidate.staticGateway = true;
      this.voiceFormValidate.staticIpAddress = true;
    }
    this.serviceForm.get('voice').patchValue({
      ServiceConnectionType: this.advancedVoice ? 'Static' : 'DHCP'
    });

    this.Out_Service.emit(this.serviceForm.value)

  }
  selectRgPort(e) {
    this.RGPortSelected = Boolean(e);
  }
  removePorts() {
    this.serviceForm.get('voice').patchValue({
      port: this.isCOC ? [] : this.serviceForm.get('voice').value.port
    })

  }
  usernamechange() {
    if (this.serviceForm.value.data.pppoeUsername) this.passwordError = false;
  }
  ipAdressChange() {
    if (this.serviceForm.value.data.staticIpAddressFamily !== 'ipv6') {
      this.EnableStatic = true;

    } else if ((this.serviceForm.value.data.staticIpAddressFamily === 'ipv6')) {
      this.EnableStatic = false
      this.enableadditionaldataip = true;
      this.serviceForm.patchValue({ data: { staticIpAddress: '', staticNetmask: '', staticGateway: '' } })
    }
    this.Out_Service.emit(this.serviceForm.value)
  }
  voiceServiceChange(event?) {
    let formData = this.serviceForm.value?.voice;
    if (event && (event.value == 'SIP' || event == 'SIP')) {
      this.isSIPvoiceServiceType = true;
    } else {
      this.isSIPvoiceServiceType = false;

    }

    this.EnableVoicePort('P1', true);
    this.EnableVoicePort('P2');
    this.EnableVoicePort('L1');
    this.EnableVoicePort('L2');
    this.EnableVoicePort('P3');
    this.EnableVoicePort('P4');
    this.EnableVoicePort('P5');
    this.EnableVoicePort('P6');
    this.EnableVoicePort('P7');
    this.EnableVoicePort('P8');
  }
  lanValidate(feature, field) {
    //debugger;
    let value = this.serviceForm.value[feature][field];
    if (feature == 'video') {
      this.videoFormValidate[field] = (value == null || (value != undefined && value >= 1 && value <= 4093));
    } else if (feature == 'data') {
      this.dataFormValidate[field] = (value == null || (value != undefined && value >= 1 && value <= 4093));
    } else {
      this.voiceFormValidate1[field] = (value == null || (value != undefined && value >= 1 && value <= 4093));
    }

  }

  get staticIpConfigurations() {
    return this.serviceForm.get('voice')?.get('staticIpConfigurations')?.get('0') as FormGroup;
  }

  checkIPValidation(field, feildType?) {
    // if (feildType) {
    //  let value = this.serviceForm.get('voice').get('staticIpConfigurations').value;
    //   switch(field){
    //     case 'staticIpAddress':

    //       break;
    //     case 'staticNetmask':

    //       break;
    //     case 'staticGateway':

    //       break;
    //   }
    // }else {
    if (field === 'staticNetmask') {
      let value = this.serviceForm.value.voice.staticNetmask;
      value = value ? value.trim() : '';
      this.ONTStaticNetMaskPatternValidate = /^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254|255)))))$/.test(value)
      this.voiceFormValidate.staticNetmask = (value && this.ONTStaticNetMaskPatternValidate);
    } else if (field === 'staticIpAddress') {
      let value = this.serviceForm.value.voice.staticIpAddress;
      value = value ? value.trim() : '';
      this.voiceFormValidate.staticIpAddress = (value !== '' && this.commonFunc.ValidateIpV4Addr(value)) ? true : false;
    }
    else if (field === 'staticGateway') {
      let value = this.serviceForm.value.voice.staticGateway;
      value = value ? value.trim() : '';
      this.voiceFormValidate.staticGateway = (value !== '' && this.commonFunc.ValidateIpV4Addr(value)) ? true : false;
    }
    // }

  }
  ONTStaticNetMaskPatternValidate: boolean;
  allowNumberOnly(event) {
    if (event.key === '-' || event.key === '.' || /[^\d]/.test(event.key)) { event.preventDefault(); }
  }
  checkLineValidation(line, feature, field) {
    //debugger;
    let value = this.serviceForm.value.voice.voiceInterfaces[line][feature][field];
    switch (field) {
      case 'sipUsername':
        const usenameREX = /[\"<>#%\s]+/;
        value = value ? value : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        } else if (usenameREX.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineFormValidate[line][feature][field] = false;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'name':
        const useREX = /[\"<>#%\s]+/;
        value = value ? value : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        } else if (useREX.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineFormValidate[line][feature][field] = false;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'sipPassword':
        const passwordREX = /[\"]+$/;
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        }

        break;
      case 'sipUri':
        value = value ? value.trim() : '';

        if (value !== '') {
          let isValid = this.uriValidate.uriValidate(value);
          this.lineFormValidate[line][feature][field] = isValid;
        } else {
          this.lineFormValidate[line][feature][field] = false;
        }

        break;
      case 'terminationId':
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = (value !== '');
        break;
      case 'X_000631_DirectConnectNumber':
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = (/^[0-9]+$/).test(value);
        break;
      case 'X_000631_DirectConnectTimer':
        this.lineFormValidate[line][feature][field] = (value >= 0 && value <= 35);
        break;
      case 'AuthUserName':
        const usenameREX1 = /[\"<>#%\s]+/;
        value = value ? value : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        } else if (usenameREX1.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineFormValidate[line][feature][field] = false;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'AuthPassword':
        const passwordREX1 = /[\"]+$/;
        value = value ? value.trim() : '';
        this.lineFormValidate[line][feature][field] = true;
        if (value === '') {
          this.lineFormValidate[line][feature][field] = false;
        }

        break;
      case 'URI':
        value = value ? value.trim() : '';


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
    let value = this.serviceForm.value.voice[field];
    value = value ? value.trim() : '';
    this.voiceFormValidate.X_000631_Opt81ClientFQDN = (value === '' || (value !== '' && this.commonFunc.validateIpORHost(value))) ? true : false;
  }


  showLineOneTab() {
    this.EnableVoicePort('L1');
  }

  showLineTwoTab() {
    this.EnableVoicePort('L2');
  }
  showPortOneTab() {
    this.EnableVoicePort('P1');
  }
  showPortTwoTab() {
    this.EnableVoicePort('P2');
  }
  showPortThreeTab() {
    this.EnableVoicePort('P3');
  }
  showPortFourTab() {
    this.EnableVoicePort('P4');
  }
  showPortFiveTab() {
    this.EnableVoicePort('P5');
  }
  showPortSixTab() {
    this.EnableVoicePort('P6');
  }
  showPortSevenTab() {
    this.EnableVoicePort('P7');
  }
  showPortEightTab() {
    this.EnableVoicePort('P8');
  }
  EnableVoicePort(line?, value?) {
    //debugger;
    if (line && line == 'P1') {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P1'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServiceType1 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServiceType1 = false;
      }


    } else if (line && line == 'P2') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P2'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P2'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServiceType2 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServiceType2 = false;
      }
      // } else {
      //   this.isSIPvoiceServiceType2 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P2': { SIP: { name: 'p2', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p2', terminationId: '' } } } } })
      // }


    } else if (line && line == 'P3') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P3'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P3'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServicePortType3 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType3 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType3 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P3': { SIP: { name: 'p3', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p3', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'P4') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P4'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P4'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServicePortType4 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType4 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType4 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P4': { SIP: { name: 'p4', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p4', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'P5') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P5'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P5'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServicePortType5 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType5 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType5 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P5': { SIP: { name: 'p5', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p5', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'P6') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P6'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P6'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServicePortType6 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType6 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType6 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P6': { SIP: { name: 'p6', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p6', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'P7') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P7'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P7'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServicePortType7 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType7 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType7 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P7': { SIP: { name: 'p7', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p7', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'P8') {
      // if (this.serviceForm.value.voice.voiceInterfaces['P8'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['P8'].Enable) {
        this.isSIPvoiceServicePortType8 = true;
        this.isSIPvoiceServiceType = true;
      } else {
        this.isSIPvoiceServicePortType8 = false;
      }
      // } else {
      //   this.isSIPvoiceServicePortType8 = false;
      //   this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'P8': { SIP: { name: 'p8', sipPassword: '', sipUsername: '', sipUri: '' }, X_000631_H248: { name: 'p8', terminationId: '' } } } } })
      // }


    }
    else if (line && line == 'L1') {
      // if (this.serviceForm.value.voice.voiceInterfaces['L1'].Enable) {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces && this.serviceForm.value.voice.voiceInterfaces['L1'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces) {
        this.isSIPvoiceServiceType = true;
        this.isSIPvoiceServiceType3 = true;
      } else if (!this.isSIPvoiceServiceType && this.serviceForm.value.voice.voiceInterfaces['L1'].Enable) {
        this.isSIPvoiceServiceType3 = false;
      }
      // }
      // else {
      //   this.isSIPvoiceServiceType3 = false;
      //   this.serviceForm.patchValue({
      //     voice: {
      //       voiceInterfaces: {
      //         'L1': {
      //           SIP: { AuthPassword: '', AuthUserName: '', URI: '' }, CallingFeatures: {
      //             CallWaitingEnable: false, CallerIDEnable: false, MWIEnable: false, X_000631_DirectConnectEnable: false, X_000631_ThreewayCallingEnable: false,
      //             X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: ''
      //           }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: '' }, X_000631_TdmGw: { Crv: '' }
      //         }
      //       }
      //     }
      //   });
      // }
    } else if (line && line == 'L2') {
      // if (this.serviceForm.value.voice.voiceServiceType === 'SIP' && this.serviceForm.value.voice.voiceInterfaces['L2'].Enable) {
      if (this.serviceForm.value.voice.voiceServiceType === 'SIP') {
        this.isSIPvoiceServiceType4 = true;
        this.isSIPvoiceServiceType = true;
        // } else if (!this.isSIPvoiceServiceType && this.serviceForm.value.voice.voiceInterfaces['L2'].Enable) {
      } else if (!this.isSIPvoiceServiceType) {
        this.isSIPvoiceServiceType4 = false;
      } else {
        this.isSIPvoiceServiceType4 = false;
        this.serviceForm.patchValue({
          voice: {
            voiceInterfaces: {
              'L2': {
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

  }
  EnableVoiceLine(line?) {
    let voiceservice = this.sys_Service?.voice;
    if (voiceservice?.voiceInterfaces && Object.keys(voiceservice?.voiceInterfaces).length) {
      let portConcat = [];
      for (var i = 0; i < voiceservice?.voiceInterfaces.length; i++) {
        if (voiceservice?.voiceInterfaces[i].name === 'p1') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType1 = true;
            portConcat.push('ONT Line 1');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P1': { Enable: true, SIP: { name: 'p1', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType1 = false;
            portConcat.push('ONT Line 1');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P1': { Enable: true, X_000631_H248: { name: 'p1', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }
        } else if (voiceservice?.voiceInterfaces[i].name === 'p2') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType2 = true;
            portConcat.push('ONT Line 2');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P2': { Enable: true, SIP: { name: 'p2', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType2 = false;
            portConcat.push('ONT Line 2');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P2': { Enable: true, X_000631_H248: { name: 'p2', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p3') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType3 = true;
            portConcat.push('ONT Line 3');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P3': { Enable: true, SIP: { name: 'p3', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType3 = false;
            portConcat.push('ONT Line 3');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P3': { Enable: true, X_000631_H248: { name: 'p3', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p4') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType4 = true;
            portConcat.push('ONT Line 4');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P4': { Enable: true, SIP: { name: 'p4', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType4 = false;
            portConcat.push('ONT Line 4');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P4': { Enable: true, X_000631_H248: { name: 'p4', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p5') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType5 = true;
            portConcat.push('ONT Line 5');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P5': { Enable: true, SIP: { name: 'p5', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType5 = false;
            portConcat.push('ONT Line 5');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P5': { Enable: true, X_000631_H248: { name: 'p5', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p6') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType6 = true;
            portConcat.push('ONT Line 6');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P6': { Enable: true, SIP: { name: 'p6', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType6 = false;
            portConcat.push('ONT Line 6');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P6': { Enable: true, X_000631_H248: { name: 'p6', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p7') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType7 = true;
            portConcat.push('ONT Line 7');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P7': { Enable: true, SIP: { name: 'p7', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType7 = false;
            portConcat.push('ONT Line 7');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P7': { Enable: true, X_000631_H248: { name: 'p7', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'p8') {
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType8 = true;
            portConcat.push('ONT Line 8');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P8': { Enable: true, SIP: { name: 'p8', sipPassword: voiceservice.voiceInterfaces[i].sipPassword, sipUsername: voiceservice.voiceInterfaces[i].sipUsername, sipUri: voiceservice.voiceInterfaces[i].sipUri } } } } });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServicePortType8 = false;
            portConcat.push('ONT Line 8');
            this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'P8': { Enable: true, X_000631_H248: { name: 'p8', terminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
          }

        }
        else if (voiceservice?.voiceInterfaces[i].name === 'L1') {
          this.portForm.patchValue({ port: 'RG Line 1' })
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType3 = true;
            portConcat.push('RG Line 1');
            this.serviceForm.patchValue({
              voice: {
                port: [...portConcat],
                voiceInterfaces: {
                  'L1': {
                    Enable: true,
                    SIP: { AuthPassword: voiceservice.voiceInterfaces[i].sipPassword, AuthUserName: voiceservice.voiceInterfaces[i].sipUsername, URI: voiceservice.voiceInterfaces[i].sipUri }, CallingFeatures: {
                      CallWaitingEnable: voiceservice.voiceInterfaces[i].callWaiting, CallerIDEnable: voiceservice.voiceInterfaces[i].callerId, MWIEnable: voiceservice.voiceInterfaces[i].mwi, X_000631_DirectConnectEnable: voiceservice.voiceInterfaces[i].directConnect, X_000631_ThreewayCallingEnable: voiceservice.voiceInterfaces[i].threeWayCalling, X_000631_DirectConnectTimer: voiceservice.voiceInterfaces[i].directConnectTimer, X_000631_DirectConnectNumber: voiceservice.voiceInterfaces[i].directConnectNumber
                    }
                  }
                }
              }
            });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType3 = false;
            portConcat.push('RG Line 1');
            if (voiceservice?.voiceServiceType === "H.248") {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L1': { Enable: true, X_000631_H248: { name: 'L1', TerminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
            } else if (voiceservice?.voiceServiceType === "MGCP") {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L1': { Enable: true, MGCP: { name: 'L1', X_000631_GR303: voiceservice.voiceInterfaces[i].gr303 } } } } });
            } else {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L1': { Enable: true, X_000631_TdmGw: { name: 'L1', Crv: voiceservice.voiceInterfaces[i].crv } } } } });
            }
          }
        } else if (voiceservice?.voiceInterfaces[i].name === 'L2') {
          this.portForm.patchValue({ port: 'RG Line 2' });
          if (this.isSIPvoiceServiceType) {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType4 = true;
            portConcat.push('RG Line 2');
            this.serviceForm.patchValue({
              voice: {
                port: [...portConcat],
                voiceInterfaces: {
                  'L2': {
                    Enable: true,
                    SIP: { AuthPassword: voiceservice.voiceInterfaces[i].sipPassword, AuthUserName: voiceservice.voiceInterfaces[i].sipUsername, URI: voiceservice.voiceInterfaces[i].sipUri }, CallingFeatures: {
                      CallWaitingEnable: voiceservice.voiceInterfaces[i].callWaiting, CallerIDEnable: voiceservice.voiceInterfaces[i].callerId, MWIEnable: voiceservice.voiceInterfaces[i].mwi, X_000631_DirectConnectEnable: voiceservice.voiceInterfaces[i].directConnect, X_000631_ThreewayCallingEnable: voiceservice.voiceInterfaces[i].threeWayCalling,
                      X_000631_DirectConnectTimer: voiceservice.voiceInterfaces[i].directConnectTimer, X_000631_DirectConnectNumber: voiceservice.voiceInterfaces[i].directConnectNumber
                    }
                  }
                }
              }
            });
          } else {
            // this.advancedVoice = true;
            this.isSIPvoiceServiceType4 = false;
            portConcat.push('RG Line 2');
            if (voiceservice?.voiceServiceType === "H.248") {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L2': { Enable: true, X_000631_H248: { name: 'L2', TerminationId: voiceservice.voiceInterfaces[i].terminationId } } } } });
            } else if (voiceservice?.voiceServiceType === "MGCP") {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L2': { Enable: true, MGCP: { name: 'L2', X_000631_GR303: voiceservice.voiceInterfaces[i].gr303 } } } } });
            } else {
              this.serviceForm.patchValue({ voice: { port: [...portConcat], voiceInterfaces: { 'L2': { Enable: true, X_000631_TdmGw: { name: 'L2', Crv: voiceservice.voiceInterfaces[i].crv } } } } });
            }
          }

        }
      }
    }
    if (Array.isArray(voiceservice?.staticIpConfigurations) && voiceservice?.staticIpConfigurations[0]?.staticIpAddress) {
      this.staticIpConfigurations.patchValue(voiceservice?.staticIpConfigurations[0]);
      this.RGIpAddress = true;
      this.addValidationStaticIpConfigurations();
    }
    this.Out_Service.emit(this.serviceForm.value);
  }
  addValidationStaticIpConfigurations() {

    if (this.staticIpConfigurations.value.staticIpAddress) {
      if (!this.staticIpConfigurations.get('staticIpAddress')?.errors?.hasOwnProperty('pattern')) {
        this.staticIpConfigurations.get('staticIpAddress').addValidators(Validators.pattern(/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/))
      }
      if (!this.staticIpConfigurations.get('staticNetmask').errors) {
        this.staticIpConfigurations.get('staticNetmask').addValidators(Validators.required)
        this.staticIpConfigurations.get('staticNetmask').addValidators(Validators.pattern(/^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254|255)))))$/))
      }
      if (!this.staticIpConfigurations.get('staticGateway').errors) {
        this.staticIpConfigurations.get('staticGateway').addValidators(Validators.required);
        this.staticIpConfigurations.get('staticGateway').addValidators(Validators.pattern(/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/))

      }
    } else {
      this.staticIpConfigurations.get('staticIpAddress').clearValidators();
      this.staticIpConfigurations.get('staticNetmask').clearValidators();
      this.staticIpConfigurations.get('staticGateway').clearValidators();
    }
    this.staticIpConfigurations.get('staticIpAddress').updateValueAndValidity();
    this.staticIpConfigurations.get('staticNetmask').updateValueAndValidity();
    this.staticIpConfigurations.get('staticGateway').updateValueAndValidity();
  }

  saveSubscriber() {
    this.error = false;
    let formError = false, lineOneError = false, lineTwoError = false, videoFormError1 = false, dataFormError1 = false, dataFormError2 = false, dataFormError3 = false, formError1 = false, videoFormError2 = false, videoFormError3 = false, voiceFormError1 = false, voiceFormError2 = false, dataFormError4 = false, dataFormError5 = false, dataFormError6 = false, videoFormError4 = false, videoFormError5 = false, videoFormError6 = false, dataFormError11 = false, dataFormError12 = false, dataFormError13 = false, dataFormError14 = false, dataFormError15 = false, dataFormError16 = false, videoFormError7 = false, dataFormError17 = false, PortOneError = false, PortTwoError = false, dataFormError7 = false;
    this.submitted = true;
    let formData = this.serviceForm.value;
    formData.voice.voiceInterfaces = Object.fromEntries(Object.entries<any>(formData.voice.voiceInterfaces).map((e: any) => {
      e[1].enable = false;
      return e
    }))
    this.serviceForm.value.voice.port.forEach(e => {
      let key = `${e.includes('ONT') ? 'P' : 'L'}${e.match(/[1-8]/)[0]}`;
      if (formData.voice.voiceInterfaces[key]) formData.voice.voiceInterfaces[key].Enable = true;
    });
    this.serviceChange();
    // console.log(formData.voice.voiceInterfaces);
    const voiceServiceType = formData.voice?.voiceServiceType ? formData.voice?.voiceServiceType : '';
    if (formData.voice?.Enable) {
      // if (!this.HidecVlanVoice && !formData.voice?.cVlan) {
      //   return
      // }
      if (!formData.voice.port.length) {
        return
      }
      // if (this.staticIpConfigurations.invalid) {
      //   this.errorInfo = `${this.language['Please fill all required fields with valid data']}`;
      //   this.error = true;
      //   return;
      // }
      if (formData?.voice?.port?.every(e => e.includes('ONT')) || !this.staticIpConfigurations.value.staticIpAddress) {
        delete formData?.voice?.staticIpConfigurations
      }
      if (Object.keys(formData.voice?.voiceInterfaces).length) {
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P1']?.Enable) {
          this.checkLineValidation('P1', 'SIP', 'sipUsername');
          this.checkLineValidation('P1', 'SIP', 'sipPassword');
          this.checkLineValidation('P1', 'SIP', 'sipUri');
          this.checkLineValidation('P1', 'SIP', 'name');
          if (!this.lineFormValidate['P1'].SIP.sipUsername || !this.lineFormValidate['P1'].SIP.sipPassword || !this.lineFormValidate['P1'].SIP.sipUri || !this.lineFormValidate['P1'].SIP.name) {
            PortOneError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P1']?.Enable) {
          this.checkLineValidation('P1', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P1', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P1'].X_000631_H248.terminationId || !this.lineFormValidate['P1'].X_000631_H248.name) {
            PortOneError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P2']?.Enable) {
          this.checkLineValidation('P2', 'SIP', 'sipUsername');
          this.checkLineValidation('P2', 'SIP', 'sipPassword');
          this.checkLineValidation('P2', 'SIP', 'sipUri');
          this.checkLineValidation('P2', 'SIP', 'name');
          if (!this.lineFormValidate['P2'].SIP.sipUsername || !this.lineFormValidate['P2'].SIP.sipPassword || !this.lineFormValidate['P2'].SIP.sipUri || !this.lineFormValidate['P2'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P2']?.Enable) {
          this.checkLineValidation('P2', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P2', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P2'].X_000631_H248.terminationId || !this.lineFormValidate['P2'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P3']?.Enable) {
          this.checkLineValidation('P3', 'SIP', 'sipUsername');
          this.checkLineValidation('P3', 'SIP', 'sipPassword');
          this.checkLineValidation('P3', 'SIP', 'sipUri');
          this.checkLineValidation('P3', 'SIP', 'name');
          if (!this.lineFormValidate['P3'].SIP.sipUsername || !this.lineFormValidate['P3'].SIP.sipPassword || !this.lineFormValidate['P3'].SIP.sipUri || !this.lineFormValidate['P3'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P3']?.Enable) {
          this.checkLineValidation('P3', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P3', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P3'].X_000631_H248.terminationId || !this.lineFormValidate['P3'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P4']?.Enable) {
          this.checkLineValidation('P4', 'SIP', 'sipUsername');
          this.checkLineValidation('P4', 'SIP', 'sipPassword');
          this.checkLineValidation('P4', 'SIP', 'sipUri');
          this.checkLineValidation('P4', 'SIP', 'name');
          if (!this.lineFormValidate['P4'].SIP.sipUsername || !this.lineFormValidate['P4'].SIP.sipPassword || !this.lineFormValidate['P4'].SIP.sipUri || !this.lineFormValidate['P4'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P4']?.Enable) {
          this.checkLineValidation('P4', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P4', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P4'].X_000631_H248.terminationId || !this.lineFormValidate['P4'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P5']?.Enable) {
          this.checkLineValidation('P5', 'SIP', 'sipUsername');
          this.checkLineValidation('P5', 'SIP', 'sipPassword');
          this.checkLineValidation('P5', 'SIP', 'sipUri');
          this.checkLineValidation('P5', 'SIP', 'name');
          if (!this.lineFormValidate['P5'].SIP.sipUsername || !this.lineFormValidate['P5'].SIP.sipPassword || !this.lineFormValidate['P5'].SIP.sipUri || !this.lineFormValidate['P5'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P5']?.Enable) {
          this.checkLineValidation('P5', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P5', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P5'].X_000631_H248.terminationId || !this.lineFormValidate['P5'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P6']?.Enable) {
          this.checkLineValidation('P6', 'SIP', 'sipUsername');
          this.checkLineValidation('P6', 'SIP', 'sipPassword');
          this.checkLineValidation('P6', 'SIP', 'sipUri');
          this.checkLineValidation('P6', 'SIP', 'name');
          if (!this.lineFormValidate['P6'].SIP.sipUsername || !this.lineFormValidate['P6'].SIP.sipPassword || !this.lineFormValidate['P6'].SIP.sipUri || !this.lineFormValidate['P6'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P6']?.Enable) {
          this.checkLineValidation('P6', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P6', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P6'].X_000631_H248.terminationId || !this.lineFormValidate['P6'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P7']?.Enable) {
          this.checkLineValidation('P7', 'SIP', 'sipUsername');
          this.checkLineValidation('P7', 'SIP', 'sipPassword');
          this.checkLineValidation('P7', 'SIP', 'sipUri');
          this.checkLineValidation('P7', 'SIP', 'name');
          if (!this.lineFormValidate['P7'].SIP.sipUsername || !this.lineFormValidate['P7'].SIP.sipPassword || !this.lineFormValidate['P7'].SIP.sipUri || !this.lineFormValidate['P7'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P7']?.Enable) {
          this.checkLineValidation('P7', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P7', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P7'].X_000631_H248.terminationId || !this.lineFormValidate['P7'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['P8']?.Enable) {
          this.checkLineValidation('P8', 'SIP', 'sipUsername');
          this.checkLineValidation('P8', 'SIP', 'sipPassword');
          this.checkLineValidation('P8', 'SIP', 'sipUri');
          this.checkLineValidation('P8', 'SIP', 'name');
          if (!this.lineFormValidate['P8'].SIP.sipUsername || !this.lineFormValidate['P8'].SIP.sipPassword || !this.lineFormValidate['P8'].SIP.sipUri || !this.lineFormValidate['P8'].SIP.name) {
            PortTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['P8']?.Enable) {
          this.checkLineValidation('P8', 'X_000631_H248', 'terminationId');
          this.checkLineValidation('P8', 'X_000631_H248', 'name');
          if (!this.lineFormValidate['P8'].X_000631_H248.terminationId || !this.lineFormValidate['P8'].X_000631_H248.name) {
            PortTwoError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['L1']?.Enable) {
          this.checkLineValidation('L1', 'SIP', 'AuthUserName');
          this.checkLineValidation('L1', 'SIP', 'AuthPassword');
          this.checkLineValidation('L1', 'SIP', 'URI');
          if (!this.lineFormValidate['L1'].SIP.AuthUserName || !this.lineFormValidate['L1'].SIP.AuthPassword || !this.lineFormValidate['L1'].SIP.URI) {
            lineOneError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['L1']?.Enable) {
          this.checkLineValidation('L1', 'X_000631_H248', 'TerminationId');
          if (!this.lineFormValidate['L1'].X_000631_H248.TerminationId) {
            lineOneError = true;
          }
        }
        if (voiceServiceType == 'SIP' && formData.voice?.voiceInterfaces['L2']?.Enable) {
          this.checkLineValidation('L2', 'SIP', 'AuthUserName');
          this.checkLineValidation('L2', 'SIP', 'AuthPassword');
          this.checkLineValidation('L2', 'SIP', 'URI');
          if (!this.lineFormValidate['L2'].SIP.AuthUserName || !this.lineFormValidate['L2'].SIP.AuthPassword || !this.lineFormValidate['L2'].SIP.URI) {
            lineTwoError = true;
          }
        } else if (voiceServiceType == 'H.248' && formData.voice?.voiceInterfaces['L2']?.Enable) {
          this.checkLineValidation('L2', 'X_000631_H248', 'TerminationId');
          if (!this.lineFormValidate['L2'].X_000631_H248.TerminationId) {
            lineTwoError = true;
          }
        }
        if (formData.voice?.voiceInterfaces['L1']?.Enable && formData.voice?.voiceInterfaces['L1'].VoiceProcessing.systemLoss === 'Manual') {
          this.checkLineValidation('L1', 'VoiceProcessing', 'TransmitGain');
          this.checkLineValidation('L1', 'VoiceProcessing', 'ReceiveGain');
          if (!this.lineFormValidate['L1'].VoiceProcessing.TransmitGain || !this.lineFormValidate['L1'].VoiceProcessing.ReceiveGain) {
            lineOneError = true;
          }
        }
        if (formData.voice?.voiceInterfaces['L2']?.Enable && formData.voice?.voiceInterfaces['L2'].VoiceProcessing.systemLoss === 'Manual') {
          this.checkLineValidation('L2', 'VoiceProcessing', 'TransmitGain');
          this.checkLineValidation('L2', 'VoiceProcessing', 'ReceiveGain');
          if (!this.lineFormValidate['L2'].VoiceProcessing.TransmitGain || !this.lineFormValidate['L2'].VoiceProcessing.ReceiveGain) {

            lineTwoError = true;
          }
        }
      }
    }


    if (formData.video?.Enable) {
      if (!formData.video?.usoc) {
        return
      }
      let member = []
      // if(formData.video.memberPorts){
      //   member.push(formData.video.memberPorts)
      //   formData.video.memberPorts= member
      // }
      if (formData.video.sVlan) {
        this.lanValidate('video', 'sVlan');
        videoFormError1 = !this.videoFormValidate.sVlan;
      }
      if (formData.video.cVlan) {
        this.lanValidate('video', 'cVlan');
        videoFormError2 = !this.videoFormValidate.cVlan;
      }
    }
    if (formData.data?.Enable) {
      if (!formData.data?.usoc) {
        return
      }
      // if (!this.HideCvlan && !formData.data?.cVlan) {
      //   return
      // }
      if (!formData.data.pppoeUsername && formData.data.pppoePassword) {
        this.passwordError = true;
        return
      }
      if (formData.data.sVlan) {
        this.lanValidate('data', 'sVlan');
        dataFormError1 = !this.dataFormValidate.sVlan;
      }
      if (formData.data.cVlan) {
        this.lanValidate('data', 'cVlan');
        dataFormError2 = !this.dataFormValidate.cVlan;
      }
      if (formData.data.staticIpAddress) {
        this.IPValidation('data', 'staticIpAddress');
        dataFormError4 = !this.dataFormValidate.staticIpAddress;
      }
      if (formData.data.staticNetmask) {
        this.IPValidation('data', 'staticNetmask');
        dataFormError5 = !this.dataFormValidate.staticNetmask;
      }
      if (formData.data.staticGateway) {
        this.IPValidation('data', 'staticGateway');
        dataFormError6 = !this.dataFormValidate.staticGateway;
      }
    }
    if (formData.voice?.Enable) {
      if (!formData.voice?.usoc) {
        return
      }
      if (formData.voice.sVlan) {
        this.lanValidate('voice', 'sVlan');
        voiceFormError1 = !this.voiceFormValidate1.sVlan;
      }
      if (formData.voice.cVlan) {
        this.lanValidate('voice', 'cVlan');
        voiceFormError2 = !this.voiceFormValidate1.cVlan;
      }
      const ServiceConnectionType = formData.voice?.ServiceConnectionType ? formData.voice?.ServiceConnectionType : '';
      if (this.ontPortSelected && ServiceConnectionType === 'Static') {
        this.checkIPValidation('staticIpAddress');
        this.checkIPValidation('staticNetmask');
        this.checkIPValidation('staticGateway');
        this.checkDNSServerValidation('DNSServers');
        formError = (!this.voiceFormValidate.staticIpAddress || !this.voiceFormValidate.staticNetmask || !this.voiceFormValidate.staticGateway || !this.voiceFormValidate.DNSServers);
      }
    }

    let directConnectOneError = (this.serviceForm.value.voice.voiceInterfaces['L1']?.CallingFeatures?.X_000631_DirectConnectEnable && (!this.serviceForm.value.voice.voiceInterfaces['L1']?.CallingFeatures?.X_000631_DirectConnectNumber || !/^\d+$/.test(this.serviceForm.value.voice.voiceInterfaces['L1']?.CallingFeatures?.X_000631_DirectConnectNumber))), directConnectTwoError = (this.serviceForm.value.voice.voiceInterfaces['L2']?.CallingFeatures?.X_000631_DirectConnectEnable && (!this.serviceForm.value.voice.voiceInterfaces['L2']?.CallingFeatures?.X_000631_DirectConnectNumber || !/^\d+$/.test(this.serviceForm.value.voice.voiceInterfaces['L2']?.CallingFeatures?.X_000631_DirectConnectNumber)));
 
    if (formError || formError1 || lineOneError || lineTwoError || videoFormError1 || videoFormError2 || videoFormError3 || dataFormError1 || dataFormError2 || dataFormError3 || voiceFormError1 || voiceFormError2 || dataFormError4 || dataFormError5 || dataFormError6 || videoFormError4 || videoFormError5 || videoFormError6 || dataFormError11 || dataFormError12 || dataFormError13 || dataFormError14 || dataFormError15 || dataFormError16 || dataFormError7 || dataFormError17 || videoFormError7 || PortOneError || PortTwoError || (formData.voice?.Enable && this.staticIpConfigurations.invalid) || directConnectOneError || directConnectTwoError ) {
      this.lineFormValidate['L1'].CallingFeatures.X_000631_DirectConnectNumber = !directConnectOneError;
      this.lineFormValidate.L2.CallingFeatures.X_000631_DirectConnectNumber = !directConnectTwoError;
      if (!PortOneError && PortTwoError) {
        this.serviceForm.patchValue({ voice: { port: [...this.serviceForm.value.voice.port, 'ONT Line 2'] } })
      } else if (PortOneError && !PortTwoError) {
        this.serviceForm.patchValue({ voice: { port: [...this.serviceForm.value.voice.port, 'ONT Line 1'] } })
      }
      else if (!lineOneError && lineTwoError) {
        this.serviceForm.patchValue({ voice: { port: [...this.serviceForm.value.voice.port, 'RG Line 2'] } })
      }
      else if (lineOneError && !lineTwoError) {
        this.serviceForm.patchValue({ voice: { port: [...this.serviceForm.value.voice.port, 'RG Line 1'] } })
      }

      this.errorInfo = `${this.language['Please fill all required fields with valid data']}`;
      this.error = true;
      return;
    }
    // if(!this.voiceFormValidate.staticIpAddress)
    // {
    //   delete this.voiceFormValidate.staticNetmask;
    //   delete this.voiceFormValidate.staticGateway
    // }
    this.out_servicesubmit.emit();
  }


  DialPlanitems = [];


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
  IPValidation(feature, field) {
    let value = this.serviceForm.value[feature][field];
    value = value ? value.trim() : '';

    if (field === 'staticNetmask' && feature === 'data') {
      var subnetRegex = /^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254|255)))))$/
      this.dataFormValidate[field] = (value !== '' && subnetRegex.test(value)) ? true : false;
    } else {
      if (feature === 'data') {
        this.dataFormValidate[field] = (value !== '' && this.commonFunc.ValidateIpV4Addr(value)) ? true : false;
      }
    }

  }

  closeAddEdit() {
    let searchText = sessionStorage.getItem('cco_susb_system_list_search');
    if (searchText) {
      this.router.navigate(['/cco/services/subscribers/system/list'], { state: { ccoSystemSearchText: searchText || '' } });
    } else this.router.navigate(['/cco/services/subscribers/system/list']);
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  directconnectenable() {
    if (this.serviceForm.value.voice.voiceInterfaces['L1'].CallingFeatures.X_000631_DirectConnectEnable) {
      this.Out_Service.emit(this.serviceForm.value)
    }
    else {
      this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L1': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    if (this.serviceForm.value.voice.voiceInterfaces['L2'].CallingFeatures.X_000631_DirectConnectEnable) {
      this.Out_Service.emit(this.serviceForm.value)
    }
    else {
      this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L2': { CallingFeatures: { X_000631_DirectConnectNumber: '', X_000631_DirectConnectTimer: '' } } } } })
    }
    this.Out_Service.emit(this.serviceForm.value)
  }

  onToggleAdvSettings() {
    this.advanceSettingsLbl = (!this.isShowAdvSetting) ? this.language['Hide_Advanced_Settings'] : this.language['Show_Advanced_Settings'];
    this.isShowAdvSetting = !this.isShowAdvSetting;
  }

  onSysLossChange(line) {
    //debugger
    switch (this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.systemLoss) {
      case "GR-909":
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.TransmitGain = -2;
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.ReceiveGain = -4;
        this.Out_Service.emit(this.serviceForm.value)
        break;
      case "ANSI":
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.TransmitGain = -3;
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.ReceiveGain = -9;
        this.Out_Service.emit(this.serviceForm.value)
        break;
      case "ETSI-PSTN":
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.TransmitGain = -4;
        this.serviceForm.value.voice.voiceInterfaces[line].VoiceProcessing.ReceiveGain = -11;
        this.Out_Service.emit(this.serviceForm.value)
        break;
      default:
        break
    }

  }

  systemlossChange() {
    //debugger;
    let voiceservice = this.sys_Service?.voice;
    if (voiceservice?.voiceInterfaces && Object.keys(voiceservice?.voiceInterfaces).length) {
      for (var i = 0; i < voiceservice?.voiceInterfaces.length; i++) {
        if (voiceservice?.voiceInterfaces[i].name === 'L1') {
          if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -2) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -4)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L1': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
          }
          else if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -3) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -9)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L1': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
          }
          else if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -4) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -11)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L1': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
          } else {
            this.serviceForm.patchValue({
              voice: {
                voiceInterfaces: {
                  'L1': {
                    VoiceProcessing: {
                      systemLoss: "Manual",
                      TransmitGain: voiceservice.voiceInterfaces[i].transmitGain / 10,
                      ReceiveGain: voiceservice.voiceInterfaces[i].receiveGain / 10

                    }
                  }
                }
              }
            });
          }
        } else if (voiceservice?.voiceInterfaces[i].name === 'L2') {
          if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -2) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -4)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L2': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
          }
          else if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -3) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -9)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L2': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
          }
          else if ((voiceservice.voiceInterfaces[i].transmitGain / 10 == -4) && (voiceservice.voiceInterfaces[i].receiveGain / 10 == -11)) {
            this.serviceForm.patchValue({ voice: { voiceInterfaces: { 'L2': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
          } else {
            this.serviceForm.patchValue({
              voice: {
                voiceInterfaces: {
                  'L2': {
                    VoiceProcessing: {
                      systemLoss: "Manual",
                      TransmitGain: voiceservice.voiceInterfaces[i].transmitGain / 10,
                      ReceiveGain: voiceservice.voiceInterfaces[i].receiveGain / 10

                    }
                  }
                }
              }
            });
          }
        }
      }
    }
  }
  ontPortSelected: boolean = false;
  addressTypeChange() {
    this.advancedVoice = !this.advancedVoice;
    this.Out_Service.emit(this.serviceForm.value);
  }
  RGIpAddress: boolean;
  RGPortSelected: boolean;
  RGAddressTypeChange() {
    this.RGIpAddress = !this.RGIpAddress;
  }

  checkDNSServerValidation(field) {
    let value = this.serviceForm.value.voice[field];
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
            this.voiceFormValidate[field] = ipFormat.test(ele);
            if (!ipFormat.test(ele)) return;
          } else {
            this.voiceFormValidate[field] = false;
            return;
          }
        }
      } else {
        this.voiceFormValidate[field] = false;
      }

    } else {
      this.voiceFormValidate[field] = true;
    }
  }

  interfaceChange() {
    if (this.serviceForm.value.data.interface === '' || this.serviceForm.value.data.interface == null) {
      this.showIPAdress = true
      this.HideIPAdress = false
    } else {
      this.serviceForm.patchValue({ data: { staticIpAddressFamily: '' } })
      this.showIPAdress = false
      this.HideIPAdress = true
    }
    this.Out_Service.emit(this.serviceForm.value)
  }
  requiredFieldChange() {
    if (this.serviceForm.value.data.staticIpAddress || this.serviceForm.value.data.staticNetmask || this.serviceForm.value.data.staticGateway) {
      this.enableadditionaldataip = false;
      // this.enableadditionaldata = false
      // this.serviceForm.patchValue({ data: { pppoeUsername: '', pppoePassword: '' } })
    } else {
      this.enableadditionaldata = true
      this.enableadditionaldataip = true
    }
    this.Out_Service.emit(this.serviceForm.value)
  }
}
