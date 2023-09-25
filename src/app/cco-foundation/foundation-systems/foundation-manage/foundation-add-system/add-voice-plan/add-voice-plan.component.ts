import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import _ from 'lodash';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
@Component({
  selector: 'app-add-voice-plan',
  templateUrl: './add-voice-plan.component.html',
  styleUrls: ['./add-voice-plan.component.scss']
})
export class AddVoicePlanComponent implements OnInit, OnChanges {
  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() formOptions;
  @Input() servicesListData;
  @Input() servicedisable;
  @Output() private Out_sys_ServiceTiers: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_service_tiers_submit: EventEmitter<any> = new EventEmitter();
  vlanErrorMsg: string;
  vlanErrorMsg2: string;
  errorInfo: any;
  getAllDialPlanSubscribe: any;
  error: boolean;
  loading: boolean;
  userNameErrorMsg: string;
  language;
  languageSubject;
  servicetierForm: FormGroup;
  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' }
  ];
  voiceServiceProfileList: Array<any> = [];
  DialPlanitems = [];
  isAddressTypeStatic: boolean;
  isSIPVoiceServiceType: boolean = false;
  isSIPVoiceServiceType1: boolean = false;
  isSIPVoiceServiceType2: boolean = false;
  voiceLineOnePwd: boolean = false;
  voiceLineTwoPwd: boolean = false;
  voiceParam = ['GR-909', 'ANSI', 'ETSI-PSTN', 'Manual'];
  isShowAdvSetting: boolean = false;
  advanceSettingsLbl: string = 'Show Advanced Settings';
  addressingTypeItems = ['DHCP', 'Static'];
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
  getAllProfileSubscribe: any;
  allProfileList: any;
  ORG_ID: any;
  profile: any;
  serviceProfile: boolean = false;
  constructor(private translateService: TranslateService, private profileService: ProfileService, private sso: SsoAuthService, private commonFunc: CommonFunctionsService,
    private uriValidate: UriValidatorService) {
    this.ORG_ID = this.sso.getOrgId();
    this.getProfileData()
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
              X_000631_DirectConnectTimer: new FormControl('')
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
              X_000631_DirectConnectTimer: new FormControl('')
            }),
            VoiceProcessing: new FormGroup({
              systemLoss: new FormControl('ANSI'),
              TransmitGain: new FormControl(-3),
              ReceiveGain: new FormControl(-9)
            })
          })
        })
      }),
      services: new FormGroup({
        Enable: new FormControl(false),
        ProfileId: new FormControl(null),
        category: new FormControl('Voice Service')
      })
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    // this.voiceInitialize();
    if (this.sys_ServiceTiers) {
      this.servicetierForm.patchValue(this.sys_ServiceTiers)
      // if(this.AllFormData?.rgService?.services){
      //   this.servicetierForm.patchValue({services:{Enable:this.sys_ServiceTiers?.services ? this.sys_ServiceTiers?.services[0]?.Enable:false,
      //     ProfileId:this.sys_ServiceTiers?.services  ? this.sys_ServiceTiers?.services[0]?.ProfileId:'', 
      //     category:'Voice Service'}})
      // }
    }
  }
  allowNumberOnly(event) {
    if (event.key === '-' || event.key === '.' || /[^\d]/.test(event.key)) { event.preventDefault(); }
  }
  ngOnInit(): void {

    // this.servicetierForm = new FormGroup({
    //   data: new FormGroup({
    //     Enable: new FormControl(false),
    //     VlanId: new FormControl(''),
    //     Pbit: new FormControl(),
    //     //BwProfile: new FormControl(''),
    //     pppoe: new FormGroup({
    //       Username: new FormControl(''),
    //       Password: new FormControl('')
    //     })
    //   }),
    //   video: new FormGroup({
    //     //BwProfile: new FormControl(''),
    //     Enable: new FormControl(false),
    //     VlanId: new FormControl(''),
    //     Pbit: new FormControl()
    //   }),
    //   voice: new FormGroup({
    //     ServiceType: new FormControl('SIP'),
    //     DialPlan: new FormControl('system-default'),
    //     FaxT38: new FormGroup({
    //       Enable: new FormControl(false),
    //     }),
    //     X_CALIX_SXACC_RG_WAN: new FormGroup({
    //       ServiceConnectionType: new FormControl('DHCP'),
    //       ExternalIPAddress: new FormControl(''),
    //       SubnetMask: new FormControl(''),
    //       DefaultGateway: new FormControl(''),
    //       DNSServers: new FormControl(''),
    //     }),
    //     X_000631_Opt81ClientFQDN: new FormControl(''),
    //     Line: new FormGroup({
    //       1: new FormGroup({
    //         Enable: new FormControl(false),
    //         SIP: new FormGroup({
    //           AuthUserName: new FormControl(''),
    //           AuthPassword: new FormControl(''),
    //           URI: new FormControl(''),
    //         }),
    //         X_000631_H248: new FormGroup({
    //           TerminationId: new FormControl('')
    //         }),
    //         MGCP: new FormGroup({
    //           X_000631_GR303: new FormControl(false)
    //         }),
    //         X_000631_TdmGw: new FormGroup({
    //           Crv: new FormControl('')
    //         }),
    //         CallingFeatures: new FormGroup({
    //           CallWaitingEnable: new FormControl(false),
    //           CallerIDEnable: new FormControl(false),
    //           X_000631_ThreewayCallingEnable: new FormControl(false),
    //           MWIEnable: new FormControl(false),
    //           X_000631_DirectConnectEnable: new FormControl(false),
    //           X_000631_DirectConnectNumber: new FormControl(''),
    //           X_000631_DirectConnectTimer: new FormControl('')
    //         }),
    //         VoiceProcessing: new FormGroup({
    //           systemLoss: new FormControl('ANSI'),
    //           TransmitGain: new FormControl(-3),
    //           ReceiveGain: new FormControl(-9)
    //         })
    //       }),
    //       2: new FormGroup({
    //         Enable: new FormControl(false),
    //         SIP: new FormGroup({
    //           AuthUserName: new FormControl(''),
    //           AuthPassword: new FormControl(''),
    //           URI: new FormControl(''),
    //         }),
    //         X_000631_H248: new FormGroup({
    //           TerminationId: new FormControl('')
    //         }),
    //         MGCP: new FormGroup({
    //           X_000631_GR303: new FormControl(false)
    //         }),
    //         X_000631_TdmGw: new FormGroup({
    //           Crv: new FormControl('')
    //         }),
    //         CallingFeatures: new FormGroup({
    //           CallWaitingEnable: new FormControl(false),
    //           CallerIDEnable: new FormControl(false),
    //           X_000631_ThreewayCallingEnable: new FormControl(false),
    //           MWIEnable: new FormControl(false),
    //           X_000631_DirectConnectEnable: new FormControl(false),
    //           X_000631_DirectConnectNumber: new FormControl(''),
    //           X_000631_DirectConnectTimer: new FormControl('')
    //         }),
    //         VoiceProcessing: new FormGroup({
    //           systemLoss: new FormControl('ANSI'),
    //           TransmitGain: new FormControl(-3),
    //           ReceiveGain: new FormControl(-9)
    //         })
    //       })
    //     })
    //   }),
    //   services: new FormGroup({
    //     Enable: new FormControl(false),
    //     ProfileId: new FormControl(''),
    //     category:new FormControl('Voice Service')
    //   })
    // });
    if (this.sys_ServiceTiers) {
      this.servicetierForm.patchValue(this.sys_ServiceTiers)
      if (this.AllFormData?.rgService?.services) {
        this.serviceProfile = true
      }

    }
    let service: any = this.sys_ServiceTiers?.services;
    if (Array.isArray(this.sys_ServiceTiers?.services)) {
      service = this.sys_ServiceTiers?.services[0]
    }
    this.servicetierForm = new FormGroup({
      data: new FormGroup({
        Enable: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers.data.Enable != undefined) ? new FormControl(this.sys_ServiceTiers.data.Enable) : new FormControl(true),
        VlanId: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers.data.VlanId) ? new FormControl(this.sys_ServiceTiers.data.VlanId) : new FormControl(''),
        Pbit: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers.data.Pbit) ? new FormControl(this.sys_ServiceTiers.data.Pbit) : new FormControl(),
        //BwProfile: new FormControl(''),
        pppoe: new FormGroup({
          Username: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers.data.pppoe && this.sys_ServiceTiers.data.pppoe.Username) ? new FormControl(this.sys_ServiceTiers.data.pppoe.Username) : new FormControl(''),
          Password: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers.data.pppoe && this.sys_ServiceTiers.data.pppoe.Password) ? new FormControl(this.sys_ServiceTiers.data.pppoe.Password) : new FormControl('')
        })
      }),
      video: new FormGroup({
        //BwProfile: new FormControl(''),
        Enable: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers.video.Enable) ? new FormControl(this.sys_ServiceTiers.video.Enable) : new FormControl(false),
        VlanId: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers.video.VlanId) ? new FormControl(this.sys_ServiceTiers.video.VlanId) : new FormControl(''),
        Pbit: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers.video.Pbit) ? new FormControl(this.sys_ServiceTiers.video.Pbit) : new FormControl()
      }),
      voice: new FormGroup({
        ServiceType: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.ServiceType) ? new FormControl(this.sys_ServiceTiers.voice.ServiceType) : new FormControl('SIP'),
        DialPlan: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.DialPlan) ? new FormControl(this.sys_ServiceTiers.voice.DialPlan) : new FormControl('system-default'),
        FaxT38: new FormGroup({
          Enable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.FaxT38 && this.sys_ServiceTiers.voice.FaxT38.Enable) ? new FormControl(this.sys_ServiceTiers.voice.FaxT38.Enable) : new FormControl(false),
        }),
        X_CALIX_SXACC_RG_WAN: new FormGroup({
          ServiceConnectionType: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.ServiceConnectionType) ? new FormControl(this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.ServiceConnectionType) : new FormControl('DHCP'),
          ExternalIPAddress: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.ExternalIPAddress) ? new FormControl(this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.ExternalIPAddress) : new FormControl(''),
          SubnetMask: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.SubnetMask) ? new FormControl(this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.SubnetMask) : new FormControl(''),
          DefaultGateway: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.DefaultGateway) ? new FormControl(this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.DefaultGateway) : new FormControl(''),
          DNSServers: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN && this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.DNSServers) ? new FormControl(this.sys_ServiceTiers.voice.X_CALIX_SXACC_RG_WAN.DNSServers) : new FormControl(''),
        }),
        X_000631_Opt81ClientFQDN: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.X_000631_Opt81ClientFQDN) ? new FormControl(this.sys_ServiceTiers.voice.X_000631_Opt81ClientFQDN) : new FormControl(''),
        Line: new FormGroup({
          1: new FormGroup({
            Enable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].Enable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].Enable) : new FormControl(false),
            SIP: new FormGroup({
              AuthUserName: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].SIP && this.sys_ServiceTiers.voice.Line['1'].SIP.AuthUserName) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].SIP.AuthUserName) : new FormControl(''),
              AuthPassword: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].SIP && this.sys_ServiceTiers.voice.Line['1'].SIP.AuthPassword) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].SIP.AuthPassword) : new FormControl(''),
              URI: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].SIP && this.sys_ServiceTiers.voice.Line['1'].SIP.URI) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].SIP.URI) : new FormControl(''),
            }),
            X_000631_H248: new FormGroup({
              TerminationId: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].X_000631_H248 && this.sys_ServiceTiers.voice.Line['1'].X_000631_H248.TerminationId) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].X_000631_H248.TerminationId) : new FormControl('')
            }),
            MGCP: new FormGroup({
              X_000631_GR303: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].MGCP && this.sys_ServiceTiers.voice.Line['1'].MGCP.X_000631_GR303) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].MGCP.X_000631_GR303) : new FormControl(false)
            }),
            X_000631_TdmGw: new FormGroup({
              Crv: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].X_000631_TdmGw && this.sys_ServiceTiers.voice.Line['1'].X_000631_TdmGw.Crv) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].X_000631_TdmGw.Crv) : new FormControl('')
            }),
            CallingFeatures: new FormGroup({
              CallWaitingEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.CallWaitingEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.CallWaitingEnable) : new FormControl(false),
              CallerIDEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.CallerIDEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.CallerIDEnable) : new FormControl(false),
              X_000631_ThreewayCallingEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_ThreewayCallingEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_ThreewayCallingEnable) : new FormControl(false),
              MWIEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.MWIEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.MWIEnable) : new FormControl(false),
              X_000631_DirectConnectEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectEnable) : new FormControl(false),
              X_000631_DirectConnectNumber: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectNumber) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectNumber) : new FormControl(''),
              X_000631_DirectConnectTimer: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectTimer) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectTimer) : new FormControl('')
            }),
            VoiceProcessing: new FormGroup({
              systemLoss: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.systemLoss) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.systemLoss) : new FormControl('ANSI'),
              TransmitGain: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.TransmitGain) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.TransmitGain) : new FormControl(-3),
              ReceiveGain: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.ReceiveGain) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.ReceiveGain) : new FormControl(-9)
            })
          }),
          2: new FormGroup({
            Enable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].Enable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].Enable) : new FormControl(false),
            SIP: new FormGroup({
              AuthUserName: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].SIP && this.sys_ServiceTiers.voice.Line['2'].SIP.AuthUserName) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].SIP.AuthUserName) : new FormControl(''),
              AuthPassword: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].SIP && this.sys_ServiceTiers.voice.Line['2'].SIP.AuthPassword) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].SIP.AuthPassword) : new FormControl(''),
              URI: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].SIP && this.sys_ServiceTiers.voice.Line['2'].SIP.URI) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].SIP.URI) : new FormControl(''),
            }),
            X_000631_H248: new FormGroup({
              TerminationId: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].X_000631_H248 && this.sys_ServiceTiers.voice.Line['2'].X_000631_H248.TerminationId) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].X_000631_H248.TerminationId) : new FormControl('')
            }),
            MGCP: new FormGroup({
              X_000631_GR303: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].MGCP && this.sys_ServiceTiers.voice.Line['2'].MGCP.X_000631_GR303) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].MGCP.X_000631_GR303) : new FormControl(false)
            }),
            X_000631_TdmGw: new FormGroup({
              Crv: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].X_000631_TdmGw && this.sys_ServiceTiers.voice.Line['2'].X_000631_TdmGw.Crv) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].X_000631_TdmGw.Crv) : new FormControl('')
            }),
            CallingFeatures: new FormGroup({
              CallWaitingEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.CallWaitingEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.CallWaitingEnable) : new FormControl(false),
              CallerIDEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.CallerIDEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.CallerIDEnable) : new FormControl(false),
              X_000631_ThreewayCallingEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_ThreewayCallingEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_ThreewayCallingEnable) : new FormControl(false),
              MWIEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.MWIEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.MWIEnable) : new FormControl(false),
              X_000631_DirectConnectEnable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectEnable) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectEnable) : new FormControl(false),
              X_000631_DirectConnectNumber: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectNumber) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectNumber) : new FormControl(''),
              X_000631_DirectConnectTimer: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectTimer) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectTimer) : new FormControl('')
            }),
            VoiceProcessing: new FormGroup({
              systemLoss: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.systemLoss) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.systemLoss) : new FormControl('ANSI'),
              TransmitGain: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.TransmitGain) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.TransmitGain) : new FormControl(-3),
              ReceiveGain: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing && this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.ReceiveGain) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.ReceiveGain) : new FormControl(-9)
            })
          })
        })
      }),
      services: new FormGroup({
        Enable: new FormControl(service?.Enable),
        ProfileId: new FormControl((service?.ProfileId) ? service?.ProfileId : null),
        category: new FormControl('Voice Service')
      })
    });
    //TO Fix CCL-33482 
    if (!this.sys_ServiceTiers || !Object.keys(this.sys_ServiceTiers).length || (this.sys_ServiceTiers?.data && !Object.keys(this.sys_ServiceTiers.data).length)) {
      this.servicetierForm.patchValue({ data: { Enable: true } });
      this.servicetierChange();
    }
    this.voiceInitialize();
  }
  getProfileData() {
    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    this.loading = true;
    this.getAllProfileSubscribe = this.profileService.getProfileList(this.ORG_ID).subscribe((res: any) => {
      this.loading = false;
      if (res) {
        this.buildeServiceProfileList(res);
        this.allProfileList = res;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
    }, () => {
    });
  }
  buildeServiceProfileList(profileLists) {
    let serviceList = [];
    profileLists.forEach(item => {
      if (item.configurations.filter(service => { return (service.category.indexOf('Service') !== -1) }).length === 1) {

        item.configurations.forEach(category => {
          if (category.category === 'Voice Service') {
            const cateObj: any = {
              name: item.name,
              _id: item._id,
              orgId: item.orgId,
              configurations: category,
            }
            serviceList.push(cateObj);
          }
        });
        this.voiceServiceProfileList = serviceList;

      }

    });
    //  this.servicetierForm.patchValue({services:{
    //         ProfileId:this.serviceProfile ? this.sys_ServiceTiers?.services[0]?.ProfileId:'', 
    //         category:'Voice Service'}})
  }
  voiceInitialize() {
    // this.servicetierForm.patchValue({services:{
    //   ProfileId:this.serviceProfile ? this.sys_ServiceTiers?.services[0]?.ProfileId:'', 
    //   category:'Voice Service'}})
    this.DialPlanitems = this.formOptions?.DialPlanitems ? this.formOptions?.DialPlanitems : [];
    this.systemlossChange();
    this.addressTypeChange();
    if ((this.sys_ServiceTiers?.voice?.ServiceType && this.sys_ServiceTiers?.voice?.ServiceType == 'SIP') || (this.sys_ServiceTiers && !Object.keys(this.sys_ServiceTiers).length)) {
      this.voiceServiceTypeChange('SIP');
    } else {
      this.voiceServiceTypeChange();
    }
    if (this.sys_ServiceTiers) {
      this.servicetierForm.patchValue(this.sys_ServiceTiers);
    }
    if (this.sys_ServiceTiers?.voice?.Line['1']?.Enable && (this.sys_ServiceTiers.voice?.Line['1']?.Enable == 'Enabled' || this.sys_ServiceTiers.voice?.Line['1']?.Enable == true)) {
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

    if (this.sys_ServiceTiers?.voice?.Line['2']?.Enable && (this.sys_ServiceTiers.voice?.Line['2']?.Enable == 'Enabled' || this.sys_ServiceTiers.voice?.Line['2']?.Enable == true)) {
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

  systemlossChange() {
    //debugger;
    if (this.sys_ServiceTiers?.voice?.Line['1']?.VoiceProcessing) {
      //this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.TransmitGain = this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain ? this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.TransmitGain / 10 : -3;
      //this.sys_ServiceTiers.voice.Line['1'].VoiceProcessing.ReceiveGain = this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain ? this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain / 10 : -9;
      if ((this.sys_ServiceTiers?.voice?.Line['1']?.VoiceProcessing.TransmitGain == -2) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -4)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
      }
      else if ((this.sys_ServiceTiers?.voice?.Line['1']?.VoiceProcessing.TransmitGain == -3) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -9)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
      }
      else if ((this.sys_ServiceTiers?.voice?.Line['1']?.VoiceProcessing.TransmitGain == -4) && (this.sys_ServiceTiers.voice?.Line['1']?.VoiceProcessing.ReceiveGain == -11)) {
        this.servicetierForm.patchValue({ voice: { Line: { '1': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
      } else {
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '1': {
                VoiceProcessing: {
                  systemLoss: "Manual",
                  TransmitGain: this.sys_ServiceTiers?.voice.Line['1'].VoiceProcessing.TransmitGain,
                  ReceiveGain: this.sys_ServiceTiers?.voice.Line['1'].VoiceProcessing.ReceiveGain

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
    if (this.sys_ServiceTiers?.voice?.Line['2']?.VoiceProcessing) {
      //this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.TransmitGain = this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain ? this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.TransmitGain / 10 : -3;
      //this.sys_ServiceTiers.voice.Line['2'].VoiceProcessing.ReceiveGain = this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain ? this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain / 10 : -9;

      if ((this.sys_ServiceTiers?.voice?.Line['2']?.VoiceProcessing.TransmitGain == -2) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -4)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "GR-909" } } } } });
      }
      else if ((this.sys_ServiceTiers?.voice?.Line['2']?.VoiceProcessing.TransmitGain == -3) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -9)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "ANSI" } } } } });
      }
      else if ((this.sys_ServiceTiers?.voice?.Line['2']?.VoiceProcessing.TransmitGain == -4) && (this.sys_ServiceTiers.voice?.Line['2']?.VoiceProcessing.ReceiveGain == -11)) {
        this.servicetierForm.patchValue({ voice: { Line: { '2': { VoiceProcessing: { systemLoss: "ETSI-PSTN" } } } } });
      } else {
        this.servicetierForm.patchValue({
          voice: {
            Line: {
              '2': {
                VoiceProcessing: {
                  systemLoss: "Manual",
                  TransmitGain: this.sys_ServiceTiers?.voice.Line['2'].VoiceProcessing.TransmitGain,
                  ReceiveGain: this.sys_ServiceTiers?.voice.Line['2'].VoiceProcessing.ReceiveGain
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


  addressTypeChange() {
    if (this.servicetierForm.value.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType && this.servicetierForm.value.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType == 'Static') {
      this.isAddressTypeStatic = true;
    } else {
      this.isAddressTypeStatic = false;
      this.servicetierForm.patchValue({ voice: { X_CALIX_SXACC_RG_WAN: { DNSServers: '', DefaultGateway: '', ExternalIPAddress: '', SubnetMask: '' } } });
    }
    // this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
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
                }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: false }
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
                }, X_000631_H248: { TerminationId: '' }, MGCP: { X_000631_GR303: false }
              }
            }
          }
        });
      }
    }
    //this.dataService.setdataEnableData(line, this.dataEnable);
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
        value = value ? value.toString().trim() : '';
        if (!value) {
          this.lineFormValidate[line][feature][field] = false
        } else {
          this.lineFormValidate[line][feature][field] = (value >= 0 && value <= 35);
        }

        break;
      case 'AuthUserName':
        const usenameREX = /[\"<>#%]+$/;
        value = value ? value.replace(/\s/g, "") : '';
        this.servicetierForm.value.voice.Line[line][feature][field] = value
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

  servicetierChange() {
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
  }

  //advanced setting
  onToggleAdvSettings() {
    this.advanceSettingsLbl = (!this.isShowAdvSetting) ? 'Hide Advanced Settings' : 'Show Advanced Settings';
    this.isShowAdvSetting = !this.isShowAdvSetting;
  }
  showLineOneTab() {
    this.EnableVoiceLine(1);
  }
  showLineTwoTab() {
    this.EnableVoiceLine(2);
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

  checkIPHostValidation(field) {
    let value = this.servicetierForm.value.voice[field];
    value = value ? value.trim() : '';
    this.voiceFormValidate.X_000631_Opt81ClientFQDN = (value === '' || (value !== '' && this.commonFunc.validateIpORHost(value))) ? true : false;
    //console.log(this.voiceFormValidate)
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

  checkIPValidation(field) {
    let value = this.servicetierForm.value.voice.X_CALIX_SXACC_RG_WAN[field];
    value = value ? value.trim() : '';
    this.voiceFormValidate.X_CALIX_SXACC_RG_WAN[field] = (value !== '' && this.commonFunc.ValidateIpV4Addr(value)) ? true : false;
  }

  enableService(event) {
    this.servicetierForm.get('services').patchValue({ Enable: Boolean(event) });
    this.servicetierChange()
  }

  saveSystem() {
    //debugger;
    this.error = false;
    let formError = false, lineOneError = false, lineTwoError = false, videoFormError = false, dataFormError = false;
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
    let formData = this.servicetierForm.value;
    const ServiceType = formData.voice?.ServiceType ? formData.voice?.ServiceType : '';
    const ServiceConnectionType = formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType ? formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType : '';
    if (formData.services?.ProfileId) {
      let service = [];
      let profileData = {
        "Enable": true,
        "ProfileId": formData.services?.ProfileId,
        //"Name": this.profile[0]?.name,
        "category": "Voice Service"
      }
      //service.push(profileData)
      formData.services = profileData
    } else {
      formData.services = [];

    }
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
            this.checkLineValidation(i, 'CallingFeatures', 'X_000631_DirectConnectTimer');
          }
          if (!this.lineFormValidate[i].SIP.AuthUserName || !this.lineFormValidate[i].SIP.AuthPassword || !this.lineFormValidate[i].SIP.URI) {
            if (i == 1) {
              lineOneError = true;
            } else {
              lineTwoError = true;
            }
            continue;
          }
          if (formData.voice?.Line[i].CallingFeatures?.X_000631_DirectConnectEnable && (!this.lineFormValidate[i].CallingFeatures.X_000631_DirectConnectNumber || !this.lineFormValidate[i].CallingFeatures.X_000631_DirectConnectTimer)) {
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
  VoiceLineOne_Pwd() {
    this.voiceLineOnePwd = !this.voiceLineOnePwd;
  }
  VoiceLineTwo_Pwd() {
    this.voiceLineTwoPwd = !this.voiceLineTwoPwd;
  }
}

