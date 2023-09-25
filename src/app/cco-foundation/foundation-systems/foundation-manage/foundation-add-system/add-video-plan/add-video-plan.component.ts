import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-add-video-plan',
  templateUrl: './add-video-plan.component.html',
  styleUrls: ['./add-video-plan.component.scss']
})
export class AddVideoPlanComponent implements OnInit, OnChanges {
  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() formOptions;
  @Input() servicesListData;
  @Input() servicedisable;
  @Output() private Out_sys_ServiceTiers: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_service_tiers_submit: EventEmitter<any> = new EventEmitter();

  servicetierForm: FormGroup;
  language;
  languageSubject;
  videoShowAllFields: boolean;
  priorityItems = [];
  errorInfo: any;
  error: boolean;
  loading: boolean;
  videoFormValidate: any = {
    BwProfile: true,
    Enable: true,
    VlanId: true,
    Pbit: true
  };
  constructor(private translateService: TranslateService) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
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
      }),
      services: new FormGroup({
        Enable: new FormControl(false),
        ProfileId: new FormControl(null),
        category: new FormControl('Voice Service')
      })
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.sys_ServiceTiers) {
      this.servicetierForm.patchValue(this.sys_ServiceTiers)
    }
    this.videoInitialize();
  }

  ngOnInit(): void {
    this.servicetierForm = null;
    let service: any = this.sys_ServiceTiers?.services;
    if (Array.isArray(this.sys_ServiceTiers?.services)) {
      service = this.sys_ServiceTiers?.services[0];
    }

    this.servicetierForm = new FormGroup({
      data: new FormGroup({
        Enable: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.Enable != undefined) ? new FormControl(this.sys_ServiceTiers.data.Enable) : new FormControl(true),
        VlanId: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.VlanId) ? new FormControl(this.sys_ServiceTiers.data.VlanId) : new FormControl(''),
        Pbit: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.Pbit) ? new FormControl(this.sys_ServiceTiers.data.Pbit) : new FormControl(),
        //BwProfile: new FormControl(''),
        pppoe: new FormGroup({
          Username: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.pppoe && this.sys_ServiceTiers?.data?.pppoe?.Username) ? new FormControl(this.sys_ServiceTiers.data.pppoe.Username) : new FormControl(''),
          Password: (this.sys_ServiceTiers?.data && this.sys_ServiceTiers?.data?.pppoe && this.sys_ServiceTiers?.data?.pppoe?.Password) ? new FormControl(this.sys_ServiceTiers?.data?.pppoe?.Password) : new FormControl('')
        })
      }),
      video: new FormGroup({
        //BwProfile: new FormControl(''),
        Enable: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers?.video?.Enable) ? new FormControl(this.sys_ServiceTiers.video.Enable) : new FormControl(false),
        VlanId: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers?.video?.VlanId) ? new FormControl(this.sys_ServiceTiers.video.VlanId) : new FormControl(''),
        Pbit: (this.sys_ServiceTiers?.video && this.sys_ServiceTiers?.video?.Pbit) ? new FormControl(this.sys_ServiceTiers.video.Pbit) : new FormControl()
      }),
      voice: new FormGroup({
        ServiceType: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers?.voice.ServiceType) ? new FormControl(this.sys_ServiceTiers.voice.ServiceType) : new FormControl('SIP'),
        DialPlan: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.DialPlan) ? new FormControl(this.sys_ServiceTiers.voice.DialPlan) : new FormControl('system-default'),
        FaxT38: new FormGroup({
          Enable: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.FaxT38 && this.sys_ServiceTiers?.voice.FaxT38.Enable) ? new FormControl(this.sys_ServiceTiers.voice.FaxT38.Enable) : new FormControl(false),
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
              X_000631_DirectConnectTimer: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures && this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectTimer) ? new FormControl(this.sys_ServiceTiers.voice.Line['1'].CallingFeatures.X_000631_DirectConnectTimer) : new FormControl()
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
              X_000631_DirectConnectTimer: (this.sys_ServiceTiers?.voice && this.sys_ServiceTiers.voice.Line && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures && this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectTimer) ? new FormControl(this.sys_ServiceTiers.voice.Line['2'].CallingFeatures.X_000631_DirectConnectTimer) : new FormControl()
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
        Enable: new FormControl(Boolean(service?.Enable || service?.ProfileId)),
        ProfileId: new FormControl((service?.ProfileId)?service?.ProfileId:''),
        category: new FormControl('Voice Service')
      })
    });
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
    //TO Fix CCL-33482 
    if (!this.sys_ServiceTiers || !Object.keys(this.sys_ServiceTiers).length || (this.sys_ServiceTiers?.data && !Object.keys(this.sys_ServiceTiers.data).length)) {
      this.servicetierForm.patchValue({ data: { Enable: true } });
      this.servicetierChange();
    }
    this.videoInitialize();
  }

  videoInitialize() {
    if (this.sys_ServiceTiers?.video?.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
    }
  }

  servicetierChange() {
    let form = this.servicetierForm.value;

    if (form.video.Enable) {
      this.videoShowAllFields = true;
    } else {
      this.videoShowAllFields = false;
      this.servicetierForm.patchValue({ video: { Pbit: null, VlanId: '' } });
    }
    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
  }

  lanValidate(feature, field) {
    let value = this.servicetierForm.value[feature][field];
    //value = value ? value.trim() : '';
    this.videoFormValidate[field] = (value == null || (value != undefined && value >= 0 && value <= 4093));
  }

  saveSystem() {
    //debugger;
    this.error = false;
    let formError = false, lineOneError = false, lineTwoError = false, videoFormError = false, dataFormError = false;

    this.Out_sys_ServiceTiers.emit(this.servicetierForm.value)
    let formData = this.servicetierForm.value;
    if (formData.video.Enable) {
      if (formData.video.VlanId != null && formData.video.VlanId != undefined) {
        this.lanValidate('video', 'VlanId');
        videoFormError = !this.videoFormValidate.VlanId;
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
  allowNumberOnly(event) {
    if (event.key === '-' || event.key === '.' || event.target.value.length > 3 || /[^\d]/.test(event.key)) { event.preventDefault(); }
  }
}
