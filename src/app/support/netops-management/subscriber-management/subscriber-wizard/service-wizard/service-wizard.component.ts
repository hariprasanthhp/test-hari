import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MODE_FOR_2_4_GZ_SSID, MODE_FOR_ALL_SSID, SERVICE_BANDWIDTH_PROFILE_LIST, SERVICE_DIAL_PLAN, SERVICE_PROFILE_LIST } from '../../subscriber.constants';
import { ISubscriberAddDeviceModel } from '../../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { constructSecurityValues, NamePatternError, ssidMetaPattern, SSIDNamePattern, wifiFetchSecurityOptionsFromSSIDMeta } from 'src/app/support/shared/service/utility.class';
import { DataServiceService } from 'src/app/support/data.service';
import { MetaField } from 'src/app/support/shared/models/ssid-meta-fields.model';
import { ManagementService } from '../../service/management.service';
import { transpileModule } from 'typescript';
import { createElementCssSelector } from '@angular/compiler';

@Component({
  selector: 'app-service-wizard',
  templateUrl: './service-wizard.component.html',
  styleUrls: ['./service-wizard.component.scss']
})
export class ServiceWizardComponent implements OnInit, OnDestroy {
  loader = false;
  deleteServicesAssociateWithSbscrbrMsg = '';
  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' },
    { label: 'TDM GW', value: 'X_000631_TDMGW' }
  ];
  dialPlanList = SERVICE_DIAL_PLAN;
  addressingType = ['DHCP', 'Static'];
  isSecurityOn: boolean = false;
  isDataService: boolean = true;
  isvideoService: boolean = true;
  addressType: string = 'DHCP';
  faxRelay: boolean = true;
  isVoiceService: boolean = true;
  isCallWaiting: boolean = true;
  isCallerId: boolean = true;
  isThreeWayCalling: boolean = true;
  messageWaitIndi: boolean = true;
  isDirectCon: boolean = false;
  systemLoss: string = 'ANSI';
  serviceObj: any = {};
  dataServices: Array<any> = [];
  videoServices: Array<any> = [];
  _addDeviceObj: ISubscriberAddDeviceModel;
  showVocieService: boolean = false;
  isLineOne: boolean = true;
  isLineTwo: boolean = false;
  switchedWifiSSID: string = '2.4GHz Primary SSID';
  switchedWifiSSIDRadio: string = 'FiveGRadio'
  bandWidthProfileList: Array<any> = SERVICE_BANDWIDTH_PROFILE_LIST;
  dataServiceProfileList: Array<any> = [];
  voiceServiceProfileList: Array<any> = [];
  videoServiceProfileList: Array<any> = [];
  _isTabChange: boolean;
  language: any;
  languageSubject;
  defaultLanValidation: boolean = false;
  ONLY2_4GZSSID = MODE_FOR_2_4_GZ_SSID;
  allSSID = MODE_FOR_ALL_SSID;
  serviceErrorMsg: string = '';
  isBWOverRide: boolean = false;
  isSSID2_4GZ: boolean = true;
  isSSID5_4GZ: boolean = true;
  isSSID6_4GZ: boolean = true;
  dataPbitList: any = [0, 1, 2, 3, 4, 5, 6, 7];
  isSIPVoiceServiceType: boolean = true;
  vlanErrorMsg: string = undefined;
  clientQDN: any = ["GS4227E-2", "GS4220E-2", "GS4220E", "GS4227S", "GS4227E", "GS4227", "GS4227W"]
  bandwidthList: any = ['BW_1G_1G', 'BW_0', 'bw 100', 'bandwidth', 'bw_lai']
  readonly IP_ADDRESS_PATERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  showSSIDOption = true;
  security = [];
  tempAddDeviceObj: any;
  metaData2G: any = {};
  metaData5G: any = {};
  metaData6G: any = {};
  metaData: any;
  @Input() editMode: any;
  noProfileVoiceError: boolean;
  noProfileVoiceErrorMsg: string;
  ftrProperties: any = {};
  six_Ghz_SecurityOptions: any[];
  unifiedSSID_SecurityOptions: any[];
  tempSecurityOptions: any[];
  oldAddDeviceObj: any;
  tempwifiSSID: any;
  voiceStatus: boolean = false;
  secretEyeIcon: boolean = false;
  orgId;
  isLan5Support: boolean = false;
  @Input() bSmbMode: boolean;
  @Input() tempWifiObj: any;
  @Input()
  set addDeviceObj(value: ISubscriberAddDeviceModel) {
    this.tempAddDeviceObj = Object.assign({}, value)
    //this.tempwifiSSID = { ...value.services.wifiSSID }
    this.tempwifiSSID = JSON.parse(JSON.stringify(value.services.wifiSSID))
    this.oldAddDeviceObj = value
    if (typeof value.device === "object" && value.device.deviceMode === "WAP" || value.device.deviceMode === "WAP-IGMP") {
      if (/844E(-\d)?/i.test(value.device.selectedModel)) {
        this.showSSIDOption = true; // To fix CCL-39717
      } else {
        this.showSSIDOption = false;
      }
    }
    this._addDeviceObj = value;
    if (this._addDeviceObj.configurationObj) {
      if (this._addDeviceObj.configurationObj.seriviceList && this._addDeviceObj.configurationObj.seriviceList.length > 0) {
        this.dataServiceProfileList = this._addDeviceObj.configurationObj.seriviceList.filter(service => {
          if (this.ssoService.acceptGSModel(this._addDeviceObj.device.selectedModel) && service.configurations.category === 'Data Service') {
            return (service.configurations.parameterValues.productFamily === 'EXOS')
          } else if ((this._addDeviceObj.device.selectedModel === '844GE-1' || this._addDeviceObj.device.selectedModel === '844GE-2') && service.configurations.category === 'Data Service') {
            return (service.configurations.parameterValues.productFamily !== 'EXOS')
          } else {
            return (service.configurations.category === 'Data Service');
          }
        });
        this.videoServiceProfileList = this._addDeviceObj.configurationObj.seriviceList.filter(service => {
          if (this.ssoService.acceptGSModel(this._addDeviceObj.device.selectedModel) && service.configurations.category === 'Video Service') {
            return (service.configurations.parameterValues.productFamily === 'EXOS')
          } else if ((this._addDeviceObj.device.selectedModel === '844GE-1' || this._addDeviceObj.device.selectedModel === '844GE-2') && service.configurations.category === 'Video Service') {
            return (service.configurations.parameterValues.productFamily !== 'EXOS')
          } else {
            return (service.configurations.category === 'Video Service');
          }
        });
      }
      if ((this._addDeviceObj.device.deviceMode === 'Managed ONT' || this._addDeviceObj?.device?.deviceMode === 'RG') && this._addDeviceObj.configurationObj.seriviceList) {
        this.voiceServiceProfileList = this._addDeviceObj.configurationObj.seriviceList.filter(service => {
          return (service.configurations.category === 'Voice Service');
        });

        setTimeout(() => {
          if (!this.voiceServiceProfileList.length) {
            this._addDeviceObj.services.voiceService.showVocieService = false;
          }
        }, 0);

        // let allVoices = this._addDeviceObj.configurationObj.seriviceList.filter(service => {
        //   return (service.configurations.category === 'Voice Service');
        // })
        if (this._addDeviceObj?.device?.deviceMode == 'RG') {
          this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.serviceTypeList[0].value : this._addDeviceObj.services.voiceService.serviceType;
        } else {
          this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.serviceType;
        }
        //this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : (this._addDeviceObj.services.voiceService.VoiceProfile) ? this._addDeviceObj.services.voiceService.VoiceProfile : this.voiceServiceProfileList[0];
        this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList : (this._addDeviceObj.services.voiceService.VoiceProfile) ? this._addDeviceObj.services.voiceService.VoiceProfile : this.voiceServiceProfileList;
      } else if (this._addDeviceObj.device.deviceMode === 'Managed ONT' && !this._addDeviceObj.configurationObj.seriviceList) {
        this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? undefined : this._addDeviceObj.services.voiceService.serviceType;
      }
      else if (this._addDeviceObj.device.deviceMode === 'RG' && !this._addDeviceObj.configurationObj.seriviceList) {
        this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.serviceTypeList[0].value : this._addDeviceObj.services.voiceService.serviceType;
        this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? undefined : this._addDeviceObj.services.voiceService.VoiceProfile;
      } else {
        //this.voiceServiceProfileList = this.serviceTypeList;
        this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.serviceTypeList[0].value : this._addDeviceObj.services.voiceService.serviceType;
        this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.VoiceProfile;
      }
      this.bandWidthProfileList = this._addDeviceObj.configurationObj.serviceBWList;
      this.dialPlanList = this._addDeviceObj.configurationObj.serviceDialPlan;
    }
    // this.isSSID2_4GZ = (this.ONLY2_4GZSSID.indexOf(value.device.selectedModel) !== -1);
    // this.isSSID5_4GZ = (this.allSSID.indexOf(value.device.selectedModel) !== -1);
    // this.isSSID2_4GZ = this.isSSID5_4GZ ? this.isSSID5_4GZ : this.isSSID2_4GZ;


    this.showVocieService = (value.device.deviceMode === 'RG');
    //To Fix CCL-34335
    if (this._addDeviceObj?.device?.deviceMode === 'Managed ONT' && this._addDeviceObj?.services?.voiceService?.serviceType && typeof this._addDeviceObj?.services?.voiceService?.serviceType === 'string') {
      this._addDeviceObj.services.voiceService.serviceType = this.voiceServiceProfileList[0];
    } else if (this._addDeviceObj?.device?.deviceMode === 'RG' && this._addDeviceObj?.services?.voiceService?.serviceType && typeof this._addDeviceObj?.services?.voiceService?.serviceType === 'object') {
      this._addDeviceObj.services.voiceService.serviceType = 'SIP';
      if (this._addDeviceObj?.services?.voiceService?.VoiceProfile && typeof this._addDeviceObj?.services?.voiceService?.VoiceProfile === 'object')
        this._addDeviceObj.services.voiceService.VoiceProfile = this.voiceServiceProfileList;
    }
    this.onVoiceServiceTypeChange();
    if (!this._addDeviceObj.isNewRecord) {
      this._addDeviceObj.services.ontDataService.forEach((item, i) => {
        this.onServiceProfileChange(item, false, i);
      });
      this._addDeviceObj.services.ontVideoService.forEach((item, i) => {
        this.onServiceProfileChange(item, false, i);
      })
    }
    setTimeout(() => {
    }, 10);
    this.loader = true;
    let params = { orgId: this.ssoService.getOrgId() };
    let serialNumber = this.discoveredDeviceInfo?.serialNumber;
    let query;
    if (!serialNumber) {
      query = `${this.ssoService.getOrg(this.orgId)}modelName=${encodeURIComponent(this.addDeviceObj.device.selectedModel)}`;
    }
    if (serialNumber) {
      query = `${this.ssoService.getOrg(this.orgId)}serialNumber=${encodeURIComponent(serialNumber)}`;
    }


    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${query}`).subscribe((json: any) => {

      this.ftrProperties = json ? json : {};

      if (this.ftrProperties && this.ftrProperties?.properties) {
        this.showUnifiedSSIDButton = this.ftrProperties?.properties.find(property => property?.featureName === 'UnifiedSSID')?.supported ?? false;
        let ftrs = this.ftrProperties?.properties.filter(res => res?.featureName == 'VoiceStatus');
        if (ftrs && ftrs.length > 0) { this.ftrPropertiesVoice_status(ftrs) }
        else { this.voiceStatussen.emit(this.voiceStatus) }
      }

      if (json?.properties.filter(obj => obj?.featureName == "lanPort5" && obj?.supported).length > 0) {
        this.isLan5Support = true;
        if (!this._addDeviceObj.isNewRecord) { // for edit ont device lanport5 support config
          this._addDeviceObj.services.ontDataService.forEach((item, i) => {
            this.onServiceProfileChange(item, false, i);
          });
          this._addDeviceObj.services.ontVideoService.forEach((item, i) => {
            this.onServiceProfileChange(item, false, i);
          })
        }
      }else{
        this.isLan5Support = false;
      }

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
        if (this.metaData2G.Enable == false && this.addDeviceObj.services.wifiSSID?.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID) {
          this.addDeviceObj.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID.serviceEnabled = 'true';
        }
      }
      if (selectedFieldMeta5G) {
        selectedFieldMeta5G.fields.forEach(x => {
          if (typeof x.writable === "boolean") {
            this.metaData5G[x.name] = x.writable
          }
        })
        if (this.metaData5G.Enable == false && this.addDeviceObj.services.wifiSSID
          .X_CALIX_SXACC_PRIMARY_5GHZ_SSID) {
          this.addDeviceObj.services.wifiSSID
            .X_CALIX_SXACC_PRIMARY_5GHZ_SSID.serviceEnabled = 'true';
        }
      }
      if (selectedFieldMeta6G) {
        selectedFieldMeta6G.fields.forEach(x => {
          if (typeof x.writable === "boolean") {
            this.metaData6G[x.name] = x.writable
          }
        })
        if (this.metaData6G.Enable == false && this.addDeviceObj.services.wifiSSID
          .X_CALIX_SXACC_PRIMARY_6GHZ_SSID) {
          this.addDeviceObj.services.wifiSSID
            .X_CALIX_SXACC_PRIMARY_6GHZ_SSID.serviceEnabled = 'true';
        }
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

        // if (this.addDeviceObj.device.selectedModel === '836GE') {
        //   this.onSwitchingWifiSSID('Primary SSID');
        // }

        if (this.addDeviceObj.device.selectedModel === '836GE') {
          this.onSwitchingWifiSSID('Primary SSID');
          this.showUnifiedPrimarySSID = false;
        }
        else if (this.ssoService.acceptGSModel(this.addDeviceObj?.device.selectedModel) || this.addDeviceObj?.device.selectedModel.includes('GPR')) {
          // this._addDeviceObj.device.selectedModel).substr(0, 2) === 'GS'
          // this.onSwitchingWifiSSID('Primary SSID');
          this.showUnifiedWiFiSIDtoggle = true;
          if (this.editMode) {
            var wifiSSIDs = this.addDeviceObj.services.wifiSSID;
            var two_four_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
            var five_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_5GHZ_SSID;
            var six_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_6GHZ_SSID;
            //  this.isSSID6_4GZ = false;
            if (this.isSSID2_4GZ && this.isSSID5_4GZ && this.isSSID6_4GZ) {
              var compared = this.compareWifiSIDs(two_four_Ghz, five_Ghz, six_Ghz);
              if (compared && five_Ghz?.name && five_Ghz?.securityType && five_Ghz?.broadcastEnabled != "undefined" && five_Ghz?.encryption) {
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
              if (compared && five_Ghz?.name && five_Ghz?.securityType && five_Ghz?.broadcastEnabled != "undefined" && five_Ghz?.encryption) {
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
        this.wifiSsidMngrStngs.emit(obj);
        this.loader = false;


      }

    }, (err: any) => {
      //this.pageErrorHandle(err);
      this.loader = false
    });


  }
  get addDeviceObj(): ISubscriberAddDeviceModel {
    return this._addDeviceObj;
  }


  _wifiSsidMngrStngsValues: any = {};
  @Input()
  set wifiSsidMngrStngsValues(value: any) {
    this._wifiSsidMngrStngsValues = value;

    // this.isSSID2_4GZ = value['2DOT4GHZ_PRIMARY'] ? true : false;
    // this.isSSID5_4GZ = value['5GHZ_PRIMARY'] ? true : false;
    // this.isSSID2_4GZ = this.isSSID5_4GZ ? this.isSSID5_4GZ : this.isSSID2_4GZ;

  }

  get wifiSsidMngrStngsValues() {
    return this._wifiSsidMngrStngsValues;
  }

  @Output() disableFinish: EventEmitter<any> = new EventEmitter();
  @Output() disableNext: EventEmitter<boolean> = new EventEmitter();
  @Output() voiceStatussen: EventEmitter<boolean> = new EventEmitter();
  discoveredDeviceInfo: any = {};
  @Output() wifiSsidMngrStngs: EventEmitter<any> = new EventEmitter();
  @Input() set isPRConfiguredOutside(value: any) {
    this._isPRConfiguredOutside = value;
    if (value) {
      this.addDeviceObj.services.configuredService = 'Yes';
    }
  }
  _isPRConfiguredOutside: any;
  showUnifiedWiFiSIDtoggle: boolean = false;
  showUnifiedPrimarySSID: boolean = false;
  showUnifiedSSIDButton = false;
  isZyxelModel: boolean = false;
  constructor(private translateService: TranslateService, private cd: ChangeDetectorRef,
    public ssoService: SsoAuthService, private http: HttpClient,
    private managementService: ManagementService
  ) {
    this.discoveredDeviceInfo = this.managementService.getDiscoveredDeviceInfo();
  }

  ngOnInit(): void {
    // this.isProvision = true
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if ((this._addDeviceObj?.services?.ontDataService?.length == 1 && (this._addDeviceObj?.services?.ontDataService[0]?.vLAN == undefined || '')) ||
      (this._addDeviceObj?.services?.ontVideoService?.length == 1 && (this._addDeviceObj?.services?.ontVideoService[0]?.vLAN == undefined || ''))) {
      setTimeout(() => {
        this.disableNext.emit(true);
      }, 10);
    }
    else {
      this.addDeviceObj?.services?.ontDataService.forEach((res, i) => {
        this.onblurValidation('inValidVLan',
          this.addDeviceObj.services.ontDataService[i])
      })
    }
    this.isZyxelModel = this.checkThirdParty();
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  ftrPropertiesVoice_status(obj) {
    if (obj[0].fields.length) {
      this.voiceStatus = !this.voiceStatus;
    }
  }

  handleOnOffBtn(buttonName: string): void {
    switch (buttonName) {
      case 'DataService':
        this.addDeviceObj.services.dataService.isDataService = !this.addDeviceObj.services.dataService.isDataService;
        break;
      case 'VideoService':
        this.addDeviceObj.services.videoService.isVideoService = !this.addDeviceObj.services.videoService.isVideoService;
        break;
      default:
        break;
    }
  }
  onAddAndRemoveDataService(index: number) {
    if (!this.addDeviceObj.services.showDataServiceByDefault && this.addDeviceObj.services?.ontDataService?.length === 1) {
      this.addDeviceObj.services.showDataServiceByDefault = true;
      return;
    }
    if (index !== -1) {
      this.addDeviceObj.services.ontDataService.splice(index, 1);
      this.serviceErrorMsg = " ";
      this.defaultLanValidation = false;
      this.addDeviceObj.configurationObj.defaultLanValidation = false;
      this.disableNext.emit(false)
    } else {
      this.addDeviceObj.services.showDataServiceByDefault = true;
      let dataServiceLenth = this.addDeviceObj.services.ontDataService.length;
      const newDataDeviceObj = {
        serviceProfile: this.dataServiceProfileList[dataServiceLenth] ? this.dataServiceProfileList[dataServiceLenth] : undefined,
        isServiceEnabled: true,
        bandwidthProfile: undefined,
        vLAN: this.dataServiceProfileList[dataServiceLenth] ? this.dataServiceProfileList[dataServiceLenth].VLAN : undefined,
      }
      this.addDeviceObj.services.ontDataService.push(newDataDeviceObj);
      if (this.dataServiceProfileList.length <= 0 && this.addDeviceObj.services.ontDataService[0].vLAN == undefined || '' || -1) {
        this.disableNext.emit(true);
        if (this.dataServiceProfileList.length != 0) {
          this.disableNext.emit(false);
        }
      }
      if (this.dataServiceProfileList[0]) {
        let selectedProfile = this.addDeviceObj.services.ontDataService[0]
        this.addDeviceObj.services.ontDataService.forEach((item, i) => {
          this.onServiceProfileChange(item, false, i);
          this.onVLANChange(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
          // this.bridgeMBRPortValidation(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
        });
        // this.onVLANChange(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
        // this.bridgeMBRPortValidation(this.addDeviceObj.services.ontDataService[this.addDeviceObj.services.ontDataService.length - 1]);
      }
    }
    this.cd.detectChanges();
  }
  onAddAndRemoveVideoService(index: number) {

    this.addDeviceObj.services.showVideoServiceByDefault = true;
    if (index !== -1) {
      this.addDeviceObj.services.ontVideoService.splice(index, 1);
      this.serviceErrorMsg = " ";
      this.defaultLanValidation = false;
      this.addDeviceObj.configurationObj.defaultLanValidation = false;
      this.disableNext.emit(false);
    } else if (this.addDeviceObj.services.ontVideoService.length === 0) {
      const newDeviceObj = {
        serviceProfile: this.videoServiceProfileList[0] ? this.videoServiceProfileList[0] : undefined,
        isServiceEnabled: true,
        bandwidthProfile: undefined,
        vLAN: this.videoServiceProfileList[0] ? this.videoServiceProfileList[0].VLAN : undefined
      }
      this.addDeviceObj.services.ontVideoService.push(newDeviceObj);
      if (this.videoServiceProfileList.length <= 0 && this.addDeviceObj.services.ontDataService.length == 0) {
        this.disableNext.emit(true);
        if (this.videoServiceProfileList.length != 0) {
          this.disableNext.emit(false);
        }
      }
      if (this.videoServiceProfileList[0]) {
        this.onVLANChange(this.addDeviceObj.services.ontVideoService[this.addDeviceObj.services.ontVideoService.length - 1]);
        this.bridgeMBRPortValidation(this.addDeviceObj.services.ontVideoService[this.addDeviceObj.services.ontVideoService.length - 1]);
      }
    }
    this.cd.detectChanges();
  }
  showPPPOE: boolean = true;
  onServiceProfileChange(selectedProfile, isFromEvent, index, dataService?) {
    if (selectedProfile.serviceProfile
      && selectedProfile.serviceProfile.configurations
      && selectedProfile.serviceProfile.configurations.parameterValues &&
      selectedProfile.serviceProfile.configurations.parameterValues.ServiceConnectionType == "PPPOE"
    ) {
      this.showPPPOE = true;
      if (this.tempAddDeviceObj.services.ontDataService.length != 0) {
        this.tempAddDeviceObj.services.ontDataService[index].showPPPOE = true;
      }
    } else {
      if (this.addDeviceObj.services.ontDataService.length != 0 && dataService) {
        this.addDeviceObj.services.ontDataService[index].PPPoEPwd = '';
        this.addDeviceObj.services.ontDataService[index].PPPoEUsername = '';
      }
      this.showPPPOE = false;
      if (this.tempAddDeviceObj.services.ontDataService.length != 0 && selectedProfile.serviceProfile?.configurations?.category == 'Data Service') {

        this.tempAddDeviceObj.services.ontDataService[index].showPPPOE = false;
      }
      if (this.addDeviceObj.services.ontVideoService.length != 0 && selectedProfile.serviceProfile?.configurations?.category == 'Video Service') {
        if (isFromEvent) {
          this.addDeviceObj.services.ontVideoService[0].vLAN = selectedProfile.serviceProfile.VLAN;
        }
      }
    }
    const defaultBWProfile = selectedProfile.serviceProfile ? selectedProfile.serviceProfile?.configurations?.parameterValues.X_CALIX_SXACC_BW_PROFILE : undefined;
    const antPortAnyService = selectedProfile.serviceProfile?.configurations?.parameterValues.AnyPortAnyServiceEnabled;
    if (isFromEvent) {
      selectedProfile.vLAN = selectedProfile.serviceProfile.VLAN !== undefined ? selectedProfile.serviceProfile.VLAN : 0;
      selectedProfile.bandwidthProfile = defaultBWProfile !== undefined ? defaultBWProfile : undefined;
    }
    selectedProfile.isAPAS = antPortAnyService
    if (selectedProfile.serviceProfile) {
      this.onBandWidthChange(selectedProfile);
      this.onVLANChange(selectedProfile);
    }
  }
  onAddAndRemoveVoiceService(add = false) {
    if (add && !this.voiceServiceProfileList.length) {
      //show error
      this.noProfileVoiceError = true;
      this.noProfileVoiceErrorMsg = 'No Voice Service profile data available';
      setTimeout(() => {
        this.noProfileVoiceError = false;
      }, 3000);
    }
    if (!this.addDeviceObj.services.voiceService.showVocieService) {
      if (this.addDeviceObj.device.deviceMode === 'Managed ONT') {
        this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.serviceType.configurations ?
          this._addDeviceObj.services.voiceService.serviceType : this.voiceServiceProfileList[0];

        //this._addDeviceObj.services.voiceService.serviceType = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.serviceType;
      } else if (this.addDeviceObj.device.deviceMode === 'RG') {
        this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.VoiceProfile.configurations ?
          this._addDeviceObj.services.voiceService.VoiceProfile : this.voiceServiceProfileList;

        //this._addDeviceObj.services.voiceService.VoiceProfile = this._addDeviceObj.isNewRecord ? this.voiceServiceProfileList[0] : this._addDeviceObj.services.voiceService.VoiceProfile;
      } else {
        this._addDeviceObj.services.voiceService.serviceType = this.voiceServiceProfileList[0] ? this.voiceServiceProfileList[0] : [];
        this._addDeviceObj.services.voiceService.VoiceProfile = this.voiceServiceProfileList ? this.voiceServiceProfileList : [];
      }
    } else {
      this._addDeviceObj.services.voiceService.serviceType = [];
      this._addDeviceObj.services.voiceService.VoiceProfile = [];
    }
    this.addDeviceObj.services.voiceService.showVocieService = !this.addDeviceObj.services.voiceService.showVocieService;
    this.cd.detectChanges();
  }

  onVoiceServiceTypeChange() {
    if (this.addDeviceObj.device.deviceMode && this.addDeviceObj.device.deviceMode === 'Managed ONT' && !this.addDeviceObj.services.voiceService.showVocieService) return;

    if (this.addDeviceObj.services.voiceService.serviceType === 'SIP' ||
      (this.addDeviceObj.device.deviceMode === 'Managed ONT' &&
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'SIP')) {
      this.isSIPVoiceServiceType = true;
      this.addDeviceObj.services.voiceService.dialPlan = this.addDeviceObj?.services?.voiceService?.dialPlan ? this.addDeviceObj?.services?.voiceService?.dialPlan : 'system-default';
      this.addDeviceObj.services.voiceService.faxRelay = (this._addDeviceObj.isNewRecord) ? false : this.addDeviceObj.services.voiceService.faxRelay;
    } else if (this.addDeviceObj.services.voiceService.serviceType === 'H.248' || this.addDeviceObj.services.voiceService.serviceType === 'MGCP') {
      this.isSIPVoiceServiceType = false;
      this.addDeviceObj.services.voiceService.faxRelay = false;
    } else {
      this.isSIPVoiceServiceType = undefined;
      this.addDeviceObj.services.voiceService.faxRelay = false;
    }
    if (this._addDeviceObj.isNewRecord) {
      this.addDeviceObj.services.voiceService.lineOne.isVoiceService = false;
      this.addDeviceObj.services.voiceService.lineTwo.isVoiceService = false;
    }
  }

  onSwitchingLines(name: string) {
    this.isLineOne = (name === 'LineOne') ? true : false;
    this.isLineTwo = (name === 'LineTwo') ? true : false;
    if (this.isLineOne && this.addDeviceObj.services.voiceService.lineOne.isVoiceService) {
      this.lineServiceValidation('lineOne');
    }
    if (this.isLineTwo && this.addDeviceObj.services.voiceService.lineTwo.isVoiceService) {
      this.lineServiceValidation('lineTwo');
    }
  }
  //switchedWifiSSIDRadio: any;
  onSwitchingWifiSSID(wifiSSIDName: string) {
    this.switchedWifiSSID = wifiSSIDName;
    if (wifiSSIDName == "UNIFIED_PRIMARY_SSID") {
      if (!this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"]) {
        this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"] = {}
      }
      if (this.unifiedSSID_SecurityOptions?.length > 0) {
        // this.security = this.six_Ghz_SecurityOptions;
        // this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"].securityType = this.six_Ghz_SecurityOptions[0]?.id

        if (!this.editMode && !this.addDeviceObj.isUnifiedPrimarySSID && !this.addDeviceObj.toggeledUnifiedPrimarySSID) {
          var options = this.unifiedSSID_SecurityOptions.filter(x => x.id == "11iandWPA3");
          if (options?.length > 0) {
            this.addDeviceObj.services.wifiSSID["UNIFIED_PRIMARY_SSID"].securityType = options[0].id;
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
  onSwitchingWifiSSIDRadio(wifiSSIDRadioName: string) {
    this.switchedWifiSSIDRadio = wifiSSIDRadioName
  }

  handleDropDownCahnge(value, selectedObject, objKey) {
    selectedObject[objKey] = value;
  }

  checkValidation(field, value) {
    this.addDeviceObj.services.voiceService[field] = (value === '') || !this.IP_ADDRESS_PATERN.test(value);
  }

  onDNSServerValidation(field, value) {
    this.addDeviceObj.services.voiceService[field] = false;
    let ipFormat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (field === 'inValidDNSServer') {
      if (value) {
        let arr = value.split(",");
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i] ? arr[i].trim() : "";

          if (ele) {
            this.addDeviceObj.services.voiceService[field] = !ipFormat.test(ele);
            if (this.addDeviceObj.services.voiceService[field]) {
              return;
            }
          } else {
            this.addDeviceObj.services.voiceService[field] = true;
            return;
          }
        }
      }

    }
  }


  onDropDownChange(event) {
    this.addDeviceObj.services.voiceService.inValidgateway = false;
    this.addDeviceObj.services.voiceService.inValidIP = false;
    this.addDeviceObj.services.voiceService.inValidSubnet = false;
    this.addDeviceObj.services.voiceService.ipAddress = '';
    this.addDeviceObj.services.voiceService.dnsServers = '';
    this.addDeviceObj.services.voiceService.defaultGateway = '';
    this.addDeviceObj.services.voiceService.subnetMask = '';
  }
  onblurValidation(field, obj, serviceType = "") {
    obj[field] = false;
    let flag = false;
    let array = [];
    /*
     *fix CCL-24039
     * added condition this.addDeviceObj?.device?.deviceMode === 'Managed ONT'
     */
    if (obj['vLAN'] === '' && this.addDeviceObj?.device?.deviceMode === 'Managed ONT') {
      obj[field] = true;
      flag = true;
      // this.disableNext.emit(true);
      this.vlanErrorMsg = 'VLAN must be a number between 0 and 4094.';
      array.push(this.vlanErrorMsg);
      // return;
    } else if (((obj['vLAN'] < 1) || obj['vLAN'] > 4093) || (obj['vLAN'] !== '') && !(/^[0-9]*$/).test(obj['vLAN'])) {
      obj[field] = true;
      flag = true;
      // this.disableNext.emit(false);
      if (obj['vLAN'] < 1) this.vlanErrorMsg = 'Please enter a value greater than 0.';
      else this.vlanErrorMsg = (obj['vLAN'] > 4093) ? 'Please enter a value less than or equal to 4093.' : 'Please enter only digits.';
    }

    this.disableNext.emit(false);
    this.addDeviceObj.services.ontDataService.forEach(ele => {
      let value: any
      value = ele['vLAN'];
      if (ele['vLAN'] === '' && this.addDeviceObj?.device?.deviceMode === 'Managed ONT') {
        this.disableNext.emit(true);
        return;
      } else if ((value > 4093) || (ele['vLAN'] !== '') && !(/^[0-9]*$/).test(obj['vLAN'])) {
        this.disableNext.emit(true);
        return;
      }
    })
    this.addDeviceObj.services.ontVideoService.forEach(ele => {
      let value: any
      value = ele['vLAN'];
      if (ele['vLAN'] === '' && this.addDeviceObj?.device?.deviceMode === 'Managed ONT') {
        this.disableNext.emit(true);
        return;
        // return;
      } else if ((value > 4093) || (ele['vLAN'] !== '') && !(/^[0-9]*$/).test(obj['vLAN'])) {
        this.disableNext.emit(true);
        return;
      }
    })
    //this.disableNext.emit(false);

  }

  onBandWidthChange(selectedProfile) {
    if (selectedProfile) {
      selectedProfile.isBWOverRide = (selectedProfile.bandwidthProfile !== selectedProfile.serviceProfile.configurations.parameterValues.X_CALIX_SXACC_BW_PROFILE);
    }
  }

  onVLANChange(selectedProfile) {
    this.bridgeMBRPortValidation(selectedProfile);
    if (selectedProfile.vLAN !== '') {
      selectedProfile.isVLANOverRide = ((selectedProfile.vLAN !== undefined && selectedProfile.serviceProfile.VLAN !== undefined)
        && Number(selectedProfile.vLAN) !== Number(selectedProfile.serviceProfile.VLAN));
    }
    const vLAnVal: any = [];
    const modeDataVal: any = [];
    const modeVideoVal: any = [];
    if (!this.defaultLanValidation) {
      this.addDeviceObj.services.ontDataService.forEach(item => {
        vLAnVal.push(Number(item.vLAN));
      });
      this.addDeviceObj.services.ontVideoService.forEach(item => {
        vLAnVal.push(Number(item.vLAN));
      });

      const vlanduplicate = _.filter(vLAnVal, (val, i, iteratee) => _.includes(iteratee, val, i + 1));;

      this.addDeviceObj.services.ontDataService.forEach(item => {
        if (vlanduplicate.indexOf(Number(item.vLAN)) !== -1)
          modeDataVal.push(item.serviceProfile.Mode);
      });
      this.addDeviceObj.services.ontVideoService.forEach(item => {
        if (vlanduplicate.indexOf(Number(item.vLAN)) !== -1)
          modeVideoVal.push(item.serviceProfile.Mode);
      });

      const servicelength: number = this.addDeviceObj.services.ontDataService.length + this.addDeviceObj.services.ontVideoService.length;

      const uniqueMode = modeDataVal.filter((item, i, ar) => ar.indexOf(item) === i).sort();

      if (uniqueMode.length >= 1 && (modeVideoVal[0] !== 'RG Routed' || uniqueMode[0] !== 'RG Routed')) {
        this.defaultLanValidation = _.filter(vLAnVal, (val, i, iteratee) => _.includes(iteratee, val, i + 1)).length > 0;
        if (this.defaultLanValidation) {
          this.addDeviceObj.configurationObj.defaultLanValidation = true;
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

  bridgeMBRPortValidation(selectedProfile) {
    // this.serviceErrorMsg = '';
    this.defaultLanValidation = false;
    this.addDeviceObj.configurationObj.defaultLanValidation = false;
    const defaultPort = selectedProfile.serviceProfile?.BridgeMemberPort;

    if (defaultPort) {
      selectedProfile.bridgeMBRPort = defaultPort;
    }
    else {
      selectedProfile.bridgeMBRPort = undefined;
    }
    if (selectedProfile.serviceProfile.defaultConnectionService) {
      selectedProfile.bridgeMBRPort = ['1', '2', '3', '4'];
      if(this.isLan5Support) selectedProfile.bridgeMBRPort.push('5'); 
    }
    const defaultLanValidation = this.addDeviceObj.services.ontDataService.filter(data => {
      return (data.serviceProfile.defaultConnectionService === true);
    });
    const nonDataDefaultLanValidation = this.addDeviceObj.services.ontDataService.filter(data => {
      return (data.serviceProfile.defaultConnectionService === false);
    });
    const nonVideoDefaultLanValidation = this.addDeviceObj.services.ontVideoService.filter(data => {
      return (data.serviceProfile.defaultConnectionService === false);
    });
    if (defaultLanValidation.length > 1) {
      this.defaultLanValidation = true;
      this.addDeviceObj.configurationObj.defaultLanValidation = true;
      this.serviceErrorMsg = 'Error! Only one RG Routed Data Service may have a Default WAN Connection.';
      return;
    }
    let portUniqValidation = [];
    this.addDeviceObj.services.ontDataService.forEach(item => {
      if (item.serviceProfile.defaultConnectionService) {
        item.bridgeMBRPort = ['1', '2', '3', '4'];
        if(this.isLan5Support) item.bridgeMBRPort.push('5'); 
      }
    })
    this.addDeviceObj.services.ontVideoService.forEach(item => {
      if (item.serviceProfile.Mode === 'RG Routed') {
        item.bridgeMBRPort = ['1', '2', '3', '4'];
        if(this.isLan5Support) item.bridgeMBRPort.push('5'); 
      }
    })
    nonDataDefaultLanValidation.forEach(service => {
      if (service.serviceProfile.Mode !== 'RG Routed') {
        portUniqValidation = portUniqValidation.concat(service.bridgeMBRPort);
        this.addDeviceObj.services.ontDataService.forEach(item => {
          if (item.serviceProfile.defaultConnectionService) {
            if (item.bridgeMBRPort) {
              item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                return (service.bridgeMBRPort.indexOf(data) === -1);
              })
            }
          }
        });
        this.addDeviceObj.services.ontVideoService.forEach(item => {
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
      if (service.serviceProfile.Mode !== 'RG Routed') {
        if (service.bridgeMBRPort) {
          portUniqValidation = portUniqValidation.concat(service.bridgeMBRPort);
          this.addDeviceObj.services.ontDataService.forEach(item => {
            if (item.serviceProfile.defaultConnectionService) {
              if (item.bridgeMBRPort) {
                item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                  return (service.bridgeMBRPort.indexOf(data) === -1);
                })
              }
            }
          });
          this.addDeviceObj.services.ontVideoService.forEach(item => {
            if (item.serviceProfile.Mode === 'RG Routed') {
              if (item.bridgeMBRPort) {
                item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                  return (service.bridgeMBRPort.indexOf(data) === -1);
                })
              }
            }
          });
        }
        else if (service.serviceProfile.BridgeMemberPort) {
          portUniqValidation = portUniqValidation.concat(service.serviceProfile.BridgeMemberPort);
          this.addDeviceObj.services.ontDataService.forEach(item => {
            if (item.serviceProfile.defaultConnectionService) {
              if (item.bridgeMBRPort) {
                item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                  return (service.serviceProfile.BridgeMemberPort.indexOf(data) === -1);
                })
              }
            }
          });
          this.addDeviceObj.services.ontVideoService.forEach(item => {
            if (item.serviceProfile.Mode === 'RG Routed') {
              if (item.bridgeMBRPort) {
                item.bridgeMBRPort = item.bridgeMBRPort.filter(data => {
                  return (service.bridgeMBRPort.indexOf(data) === -1);
                })
              }
            }
          });
        }
      }
    });
    this.defaultLanValidation = _.filter(portUniqValidation, (val, i, iteratee) => _.includes(iteratee, val, i + 1)).length > 0;
    if (this.defaultLanValidation) {
      this.addDeviceObj.configurationObj.defaultLanValidation = true;
      this.serviceErrorMsg = 'Error! ONT Half Bridge and ONT Full Bridge services cannot share ports.';

      const findDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index);
      const duplicateElements = findDuplicates(portUniqValidation);
      const firstDupElement = duplicateElements[0];
      let dataVideoServices = [...this.addDeviceObj.services.ontDataService, ...this.addDeviceObj.services.ontVideoService];
      let dataVideoServicesAll = [...dataVideoServices];
      const matches = dataVideoServices.filter(el => el?.bridgeMBRPort && el?.bridgeMBRPort.includes(firstDupElement));

      if (matches.length && matches.length > 1) {
        this.serviceErrorMsg = `Error! ${matches[0].serviceProfile?.configurations?.parameterValues?.Mode}  ${'and ' + matches[1].serviceProfile?.configurations?.parameterValues?.Mode} services cannot share ports.`;
      }

    }




  }

  lineServiceValidation(line) {
    if (this.addDeviceObj.services.voiceService[line] && this.addDeviceObj.services.voiceService[line].isVoiceService) {
      if (!this.addDeviceObj.services.voiceService[line]['password'] && (this.addDeviceObj.services.voiceService.serviceType === 'SIP' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'SIP')) {
        this.addDeviceObj.services.voiceService[line].inValidPWD = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['uri'] && (this.addDeviceObj.services.voiceService.serviceType === 'SIP' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'SIP')) {
        this.addDeviceObj.services.voiceService[line].inValidURI = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['direConnectNum'] && (this.addDeviceObj.services.voiceService.serviceType === 'SIP' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'SIP')
        && this.addDeviceObj.services.voiceService[line].isDirectCon) {
        this.addDeviceObj.services.voiceService[line].inValidDireConnectNum = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['username'] && (this.addDeviceObj.services.voiceService.serviceType === 'SIP' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'SIP')) {
        this.addDeviceObj.services.voiceService[line].inValidUserName = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['terminateId'] && (this.addDeviceObj.services.voiceService.serviceType === 'H.248' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'H.248')) {
        this.addDeviceObj.services.voiceService[line].inValidTerminateId = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['CRV'] && this.addDeviceObj.services.voiceService.serviceType === 'X_000631_TDMGW' ||
        this.addDeviceObj.services.voiceService.serviceType?.configurations?.parameterValues?.Type === 'X_000631_TDMGW') {
        this.addDeviceObj.services.voiceService[line].inValidCRV = true;
      }
    }
    const result = _.pickBy(this.addDeviceObj.services.voiceService[line], function (value, key) {
      return (_.startsWith(key, "inValid") && value === true);
    });
    return result;
  }

  getWifiData(event: any) {
    if (this._addDeviceObj?.services?.wifiSSID) {
      // var oldAddDeviceObj = this._addDeviceObj;
      // oldAddDeviceObj.services.wifiSSID[event.type] = Object.assign({}, event.old_Data)
      this._addDeviceObj.services.wifiSSID[event.type] = event.data;
      if (this.checkKeyPassPhraseLength(this._addDeviceObj.services.wifiSSID)) {
        this.disableFinish.emit(false);
        if (this._addDeviceObj.device.deviceMode == "Managed ONT") {
          if (!this._addDeviceObj?.isUnifiedPrimarySSID) {
            this.disableNext.emit(false);
          }
          else {
            this.disableNext.emit(false);
          }

        }
      } else {
        if (this._addDeviceObj.device.deviceMode == "Managed ONT" && this._addDeviceObj?.isUnifiedPrimarySSID) {
          this.disableNext.emit(true);
        }
        this.disableFinish.emit(true);
      }
    }
  }



  checkKeyPassPhraseLength(obj, oldData = {}) {
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

        // if (tempObj) {
        //   var temp = tempObj[key];
        //   if (key != "UNIFIED_PRIMARY_SSID" && temp?.securityType == "Basic" && obj[key]?.securityType != "Basic" && obj[key]?.passphrase?.length == 0) {
        //     res = false;
        //   }
        // }
        if (tempObj) {
          var temp = tempObj[key];
          if ((temp?.securityType == "Basic" && obj[key]?.securityType != "Basic") && obj[key]?.passphrase?.length == 0) {
            res = false;
          }
          if (temp?.passphrase && obj[key]?.securityType != "Basic") {
            if (temp?.passphrase?.length == 0 && obj[key]?.securityType != "Basic") {
              res = false;
            }
            // res = false;
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


        if ((obj[key]?.securityType !== 'Basic') && obj[key]?.passphrase) {


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
        if (this.editMode) {
          var oldName = tempObj[key]?.name;
          var newName = obj[key].name;

          var oldpassphrase = tempObj[key]?.passphrase;
          var newPassphrase = obj[key]?.passphrase;
          var oldSecurityType = tempObj[key]?.securityType;
          var newSecurityType = obj[key]?.securityType;

          if (oldName && newName == "") {
            res = false;
          }
          else if (key == "UNIFIED_PRIMARY_SSID") {
            //  if (!oldName) {
            if (newName?.length > 0) {

              if (!obj[key]?.securityType) {
                res = false;
              }
              // else if ((oldName && (oldName != newName)) && (oldSecurityType && (oldSecurityType != newSecurityType))) {
              //   res = false;
              // }
              else if (obj[key]?.securityType && obj[key]?.securityType !== 'Basic') {

                if (!obj[key]?.passphrase && (!oldName || !oldSecurityType)) {
                  res = false;
                }
                else if ((oldName && (oldName != newName))) {
                  if (obj[key]?.passphrase?.length == 0) {
                    res = false;
                  }

                }
                else if ((oldSecurityType && (oldSecurityType != newSecurityType))) {
                  if (obj[key]?.passphrase?.length == 0) {
                    res = false;
                  }

                }
              }
              // else if ((oldName && (oldName != newName)) && (oldSecurityType && (oldSecurityType != newSecurityType))) {
              //   //res=
              // }

            }
            else if (obj[key]?.securityType) {
              if (obj[key]?.securityType !== 'Basic') {

                if (newName?.length == 0) {
                  res = false;
                }
                if (!obj[key]?.passphrase) {
                  res = false;
                }
              }
              else if (obj[key]?.securityType == 'Basic') {
                if (newName?.length == 0) {
                  res = false;
                }

              }

            }
            else if (oldName && newName == "") {
              res = false;
            }
            // }
          }
        }
        else if (!this.editMode) {
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

  yesDifferentSystem() {
    //todo
    //this.deleteServicesAssociateWithSbscrbrMsg = 'Do you want to delete the services associated with the subscriber?';
  }

  noDifferentSystem() {
    this.closeDeleteServicesAssociateWithSbscrbrMsg();
  }

  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
  }

  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] && myArray[i]['featureName'] === value) {
        return true;
      }
    }
    return false;
  }

  validateHostNAmeAndIPAddress(value) {
    value = (value || '');
    const zeroIP = "0.0.0.0";
    const domainNameFormat = /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/;
    let isValidHostName = (value !== '');
    if (value.length > 253) { //  Hostname has a maximum of 253 ASCII characters
      isValidHostName = false;
    }
    let domains = value.split(".");
    for (let i = 0; i < domains.length; i++) {
      if (!domainNameFormat.test(domains[i])) {
        isValidHostName = false;
      }
    }
    return ((this.IP_ADDRESS_PATERN.test(value) && value !== zeroIP) || isValidHostName);
  }
  UnifiedWiFiSID: boolean = false;
  changeUnifiedWiFiSID(e) {
    var x = e;
    this.showUnifiedPrimarySSID = e.target.checked;
    if (e?.target?.checked) {
      this.onSwitchingWifiSSID('UNIFIED_PRIMARY_SSID');
      this.showUnifiedPrimarySSID = true;
      this.addDeviceObj.isUnifiedPrimarySSID = true;
      // this.security = this.six_Ghz_SecurityOptions;
      // this.addDeviceObj.toggeledUnifiedPrimarySSID
      var unifiedSSID = Object.assign({}, this.addDeviceObj.services.wifiSSID.X_CALIX_SXACC_PRIMARY_5GHZ_SSID);
      if (this.unifiedSSID_SecurityOptions?.length > 0) {
        var options = this.unifiedSSID_SecurityOptions.filter(x => x.id == "11iandWPA3");
        if (options?.length > 0) {
          unifiedSSID.securityType = options[0].id;
        }
      }
      // unifiedSSID.securityType = this.six_Ghz_SecurityOptions[0].id;
      this.addDeviceObj.services.wifiSSID.UNIFIED_PRIMARY_SSID = unifiedSSID;
    }
    else {
      this.onSwitchingWifiSSID('2.4GHz Primary SSID');
      this.showUnifiedPrimarySSID = false;
      this.addDeviceObj.isUnifiedPrimarySSID = false;
      this.security = this.tempSecurityOptions;
      this.addDeviceObj.services.wifiSSID.UNIFIED_PRIMARY_SSID = {}
    }

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
        name: fiveGhz?.name,
        broadcastEnabled: fiveGhz?.broadcastEnabled,
        securityType: fiveGhz?.securityType,
        encryption: fiveGhz?.encryption,
        passphrase: fiveGhz?.passphrase,
      }

      let keys = Object.keys(primary_Five_ghz_obj);
      let primary_Two_four_ghz = Object.values(primary_Two_four_ghz_obj);
      let primary_Five_ghz = Object.values(primary_Five_ghz_obj);


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
  checkThirdParty(): boolean {
    // const deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    // return (/ZYXEL/gi.test(deviceInfo.filter((obj) => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName")))[0].manufacturer))

    const deviceInfo: any = this.addDeviceObj.device;
    let manufacturer = "";
    if (deviceInfo?.selectedModel?.startsWith("EX")) {
      manufacturer = "ZYXEL"
    }
    return (/ZYXEL/gi.test(deviceInfo?.deviceMode == 'RG' && manufacturer))

  }
}
