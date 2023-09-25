import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import _ from 'lodash';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { AdvancedSystemComponent } from '../advanced-system/advanced-system.component';
import { environment } from 'src/environments/environment';
import { ILanPortModel, ISettingsModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubscriberService } from '../add-subscriber.service';

@Component({
  selector: 'app-add-system',
  templateUrl: './add-system.component.html',
  styleUrls: ['./add-system.component.scss']
})
export class AddSystemComponent implements OnInit {

  @ViewChildren(AdvancedSystemComponent) childAdvanced: AdvancedSystemComponent[];
  @ViewChild('deleteDeviceModel', { static: true }) private deleteDeviceModel: TemplateRef<any>;

  showAdvanced: boolean;
  systemsListForm: FormGroup;
  systemList: FormArray;


  language;
  languageSubject;
  tempWifiObj: any;
  @Input() linkageType;
  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() formOptions;
  @Input() servicesListData;
  @Input() formData;
  @Input() subscriberData;
  @Input() In_Systems_Data;
  @Input() DialPlanitem;
  @Input() DEFAULT_SYTEMS;
  @Input() disableSystem;
  @Input() continue
  @Output() private Out_Data_Change: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Data_Provision: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Default_Data: EventEmitter<any> = new EventEmitter();
  @Output() private disable_service: EventEmitter<any> = new EventEmitter();
  @Output() private delete_system: EventEmitter<any> = new EventEmitter();
  @Output() private unSavedData_emit: EventEmitter<any> = new EventEmitter();
  @Input() subsSysServiceForm;
  getAllProfileSubscribe: any;
  ORG_ID: any;
  allProfileList: any;
  deviceProvRecord: any = {};
  getAllDialPlanSubscribe: any;
  error: boolean;
  success: boolean;
  errorInfo: any;
  successInfo: any;
  loading: boolean;
  editMode = false;
  submitted: boolean;

  saveSystemLoading: boolean;
  updateSystemSusbsciberSubs: any;
  updateSystemServicesSubs: any;
  //-----------------------

  exosModel: boolean = false;
  Modelitems: any[];
  deviceModels: string[];
  modelLoading: boolean;
  deviceListSubs: any;
  deviceDataList: any;
  devGrpLoading: boolean;

  systemInfoFormData: any = {}
  systemInfoFormDataReceived: any = {}
  getSystemsListSubs: any;
  bandwidthLoading: boolean;
  wifiInfoFormData: any = {};
  addDeviceObj: any = {};
  dataServiceProfileList: any;
  videoServiceProfileList: any;
  voiceServiceProfileList: any;
  profiles: any = {};
  showDeleteBtn: boolean;
  deleteAndDisassociateSystemMsg: string;
  disassociateSystemMsg: string;
  modalRef: any;
  deleteSystemId: any;
  isModalError: boolean;
  deleteFactoryResetSub: any;
  orgData: any;
  modalLoader: boolean;
  deleteSystemSubs: any;
  disassociateSystemSubs: any;
  showwarning: boolean;
  devices: any;
  allSubsServicesDataSubs: any;
  systemDataAvail: boolean;
  systemsListLoading: boolean;
  modalWarningMessage: any;
  disableService: boolean = false;
  getstatussub: any;
  ontDevice: boolean = false;
  deltedevice: boolean = false;
  deleteDevice: any;
  modelONT: any;
  discoveredDevice: boolean;
  deviceinform: any;
  RegError: string;
  RegErrorName: string;
  showMeg: boolean = false;
  deviceId: any;
  macAddressLength: any = {};
  unSavedData: boolean = false;
  wifiNotchange: boolean = false;
  unifiedData: any;
  deletesystemOpmode: any;
  opmode: any;
  registerID: any;
  opMode: any;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private dataService: FoundationDataService,
    private commonFunc: CommonFunctionsService,
    private commonOrgService: CommonService,
    private managementService: ManagementService,
    private uriValidate: UriValidatorService,
    private service: FoundationManageService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private dialogService: NgbModal,
    private systemService: AddSubscriberService,
  ) {
    this.getDeviceModels();
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    );
  }

  ngOnInit(): void {
    if (this.linkageType === "REG_ID") {
      this.RegErrorName = `RegID`
    } else {
      this.RegErrorName = `FSAN`
    }
    this.systemsListForm = new FormGroup({
      systems: new FormArray([])
    });
    this.renderSystemsForm();
    this.getDeviceGoupCount();
    //this.getProfileData();
    this.setConfigProfileData();
  }
  maxLength(i) {
    setTimeout(() => {
      if (this.systemsListForm.value.systems[i].deviceId.indexOf(':') !== -1) {
        this.macAddressLength[i] = 17;
      } else {
        this.macAddressLength[i] = 32;
      }
    }, 100)
  }

  renderSystemsForm() {
    if (this.In_Systems_Data && this.In_Systems_Data.length) {
      this.editMode = true
      //let removeDevice = this.In_Systems_Data.filter(el => el.deviceId !== this.deleteSystem)
      let availableSys = this.In_Systems_Data.filter((el) => el.saved);
      let discoveredDevice = this.In_Systems_Data.filter((el) => el.discoveredDevice)
      if (availableSys && availableSys.length) {
        this.addAvailableSystems(availableSys, availableSys.discoveredDevice);
      } else {
        setTimeout(() => {
          this.AddMoreSystem(0);
        }, 100)
      }
    } else {
      this.editMode = false
      setTimeout(() => {
        this.AddMoreSystem(0);
      }, 100)
    }
    this.Out_Data_Change.emit(this.systemsListForm.value.systems);
  }

  createItem(data?): FormGroup {
    return this.formBuilder.group({
      deviceId: data?.deviceId || '',
      showAdvanced: false,
      saved: data?.saved || false,
      opmode: data?.opmode || ''
      //modelName: data?.modelName || ''
    });
  }

  showAdvancedForm(i) {
    //this.showAdvanced = true;
    if (this.systemsListForm?.value['systems'][i] && !this.systemsListForm?.value['systems'][i]?.saved) {
      //return;
    }
    this.systemsListForm.value['systems'][i].showAdvanced = !this.systemsListForm.value['systems'][i].showAdvanced;
  }

  AddMoreSystem(i) {
    this.editMode = false
    this.macAddressLength[i] = 20;
    if (this.systemsListForm?.value['systems'][i] && !this.systemsListForm?.value['systems'][i]?.saved) {
      return;
    }
    this.systemList = this.systemsListForm.get('systems') as FormArray;
    this.systemList.push(this.createItem());
  }

  addAvailableSystems(list, discoveredDevice) {
    this.systemList = this.systemsListForm.get('systems') as FormArray;
    list.forEach(e => {
      this.systemList.push(this.createItem(e));
    });

    setTimeout(() => {
      list.forEach((e, i) => {
        setTimeout(() => {
          this.deviceDetails(i, e.discoveredDevice);
        }, 500);
      });
    }, 100);

  }

  removeSystem(i) {
    this.systemList.removeAt(i);
  }

  /////////////////////////---------------------

  deviceChange(i) {

  }

  pageErrorHandle(err: HttpErrorResponse, place?) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    if (place && place == 'isModalError') {
      this.modalWarningMessage = this.errorInfo;
      this.isModalError = true;
    } else {
      this.closeAlert();
      this.error = true;
      this.loading = false;
    }

  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.unSavedData = false
    //this.edgeSuitsWarning = false;
  }

  system;
  modelnoteditable: boolean;
  value;
  deviceData: any = {};
  provisionData: any = {};
  systemInfoChecked: any = {};
  deviceDetails(ind, discoveredDevice?) {
    //debugger;
    this.loading = true;
    let system = this.systemsListForm?.value.systems[ind].deviceId;
    // console.log("systemsListForm",this.systemsListForm?.value)
    this.systemsListForm.value.systems[ind].deviceId = system ? system.trim() : '';
    this.systemsListForm.value.systems[ind].deviceId = system.replace(/[^0-9A-Za-z:]/g, '').replace(/(\..?)\../g, '$1');
    this.systemsListForm.value.systems[ind].deviceId = this.removeSpaces(system);
    this.systemInfoChecked[system] = false;
    if (system == "") {
      this.modelnoteditable = false;
      //this.subscriberForm.patchValue({ modelName: null });
      this.loading = false;
    } else if (this.DEFAULT_SYTEMS && this.DEFAULT_SYTEMS[system] && Object.keys(this.DEFAULT_SYTEMS[system]).length) {
      this.deviceData[system] = this.DEFAULT_SYTEMS[system].device ? this.DEFAULT_SYTEMS[system].device : {};
      this.provisionData[system] = this.DEFAULT_SYTEMS[system].provison ? this.DEFAULT_SYTEMS[system].provison : {};
      if (!Object.keys(this.deviceData[system]).length) {
        let system = this.systemsListForm?.value.systems[ind].deviceId;
        this.service.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
          //this.deviceData = res ? res : {};
          // console.log("deviceData",res)
          if (res) {
            this.deviceData[system] = res;
            this.discoveredDevice = true
          } else {
            this.deviceData[system] = {};
          }
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.loading = false;
        })
      }
      this.provosionrecord(ind);
      let res = this.provisionData[system] ? this.provisionData[system] : {};
      // console.log("res",res)
      this.systemInfoChecked[system] = true;
      this.opMode =  res?.opMode ? res?.opMode : this.deviceData[system]?.opMode ? this.deviceData[system]?.opMode : '';
      // console.log("opMode",this.opMode)
      let model = res?.modelName ? res?.modelName : this.deviceData[system]?.modelName ? this.deviceData[system]?.modelName : '';
      this.searchDeviceByMACAddressDetail(ind, this.opMode);
      if (this.opMode && this.opMode == 'Managed ONT') {
        this.formatListDataMngdONT(system, res, ind);
      } else {
        this.formatListData(system, res, ind, discoveredDevice);
      }

      setTimeout(() => {
        this.Out_Data_Provision.emit(this.provisionData);
      }, 10);
      this.loading = false;
    } else {
      let system = this.systemsListForm?.value.systems[ind].deviceId;
      this.service.getDeviceInfo(this.ORG_ID, system).subscribe((res: any) => {
        //this.deviceData = res ? res : {};
        if (res) {
          this.deviceData[system] = res;
          this.discoveredDevice = true
        } else {
          this.deviceData[system] = {};
        }

        this.provosionrecord(ind);

        this.foundationstatus(ind);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }

  systemID;
  servicesFormData = {};
  isPreProvistionedSystem: boolean = false;
  foundationstatus(ind) {
    let system = {
      sn: this.systemsListForm?.value.systems[ind].deviceId
    }
    this.getstatussub = this.systemService.getSubscribersSystemList( system).subscribe((res: any) => {
      this.isPreProvistionedSystem = true;
      this.searchDeviceByMACAddressDetail(ind, res?.opMode)
      if (res && res.error == undefined && res?.subscriber && res?.subscriber.name) {
        this.error = true;
        this.errorInfo = this.language.alreadySysAssociated(res?.subscriber?.name);
      }
    })
  }
  searchDeviceByMACAddressDetail(ind, opmode) {
    let system = this.systemsListForm?.value.systems[ind].deviceId;
    this.getstatussub = this.service.getSearchResult(this.ORG_ID, system).subscribe((res: any) => {
      setTimeout(() => {
        this.ontdeveice(ind, res, opmode);
      }, 100);


    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  ontdeveice(ind, resp, opMode) {
    if (resp && resp.records.length > 0) {
      this.deviceinform = resp.records[0]?.devices
    }
    let system = this.systemsListForm?.value.systems[ind].deviceId;
    if (this.deviceinform) {
      for (var i = 0; i < this.deviceinform?.length; i++) {
        if ((this.deviceinform[i]?.deviceId.toUpperCase() === system.toUpperCase()) || (this.deviceinform[i]?.registrationId === system)) {
          const fsan = this.deviceinform[i]?.serialNumber
          this.opmode=this.deviceinform[i]?.opModeWithOnt ? this.deviceinform[i]?.opModeWithOnt:opMode
          if(fsan){
            this.getstatussub = this.systemService.getOntDeviceStatus(fsan).subscribe((res: any) => {
              if(this.opmode ==='ONT/RG'){
                this.systemsListForm.value['systems'][ind].opmode = 'ONT/RG';
              }
              if (res?.ontDevices?.length !== 0 && this.opmode !== 'RG' && this.opmode !== 'WAP' && this.opmode !== 'ONT/RG' && this.opmode !== 'ONT') {
                let response = res?.ontDevices[0];
                this.modelONT = response?.discoveredModel
                this.showMeg = true;
                this.deviceId = this.systemsListForm?.value.systems[ind].deviceId;
                this.systemsListForm.value['systems'][ind].opmode = 'ONT';
                this.getFeatureProperties(this.modelONT, ind)
              } else if (res?.ontDevices?.length !== 0 && this.opmode === 'ONT') {
                let response = res?.ontDevices[0];
                this.modelONT = response?.discoveredModel
                this.showMeg = true
                this.systemsListForm.value['systems'][ind].opmode = 'ONT';
                this.getFeatureProperties(this.modelONT, ind)
              }
              if (res?.ontDevice?.length !== 0) {
                this.discoveredDevice = true
              }
              this.Out_Data_Change.emit(this.systemsListForm.value.systems);
            }, (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
            })
          }
         
        }
      }
    } else {
      this.getstatussub = this.systemService.getOntDeviceStatus(system).subscribe((res: any) => {
        if (res?.ontDevices?.length !== 0 && opMode !== 'RG' && opMode !== 'WAP' && opMode !== 'ONT/RG' && opMode !== 'ONT') {
          let response = res?.ontDevices[0];
          this.modelONT = response?.discoveredModel
          this.systemsListForm.value['systems'][ind].opmode = 'ONT';
          this.showMeg = true
          this.getFeatureProperties(this.modelONT, ind)
        } else if (res?.ontDevices?.length !== 0 && opMode === 'ONT') {
          let response = res?.ontDevices[0];
          this.modelONT = response?.discoveredModel
          this.showMeg = true
          this.systemsListForm.value['systems'][ind].opmode = 'ONT';
          this.getFeatureProperties(this.modelONT, ind)
        }
        if (res?.ontDevice?.length !== 0) {
          this.discoveredDevice = true
        }
        this.Out_Data_Change.emit(this.systemsListForm.value.systems);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }



  }
  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] && myArray[i]['featureName'] === value) {
        return myArray[i];
      }
    }
    return false;
  }
  getFeatureProperties(modelName: any, ind) {
    let system = this.systemsListForm?.value.systems[ind].deviceId;
    // console.log("system",system)
    this.loading = true;
    let query = `modelName=${encodeURIComponent(modelName)}`;


    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${query}`).subscribe((json: any) => {
      // console.log("json",json)

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
        //this.deviceData[system] = this.DEFAULT_SYTEMS[system].device ? this.DEFAULT_SYTEMS[system].device : {};
        let obj = this.Modelitems?.find(o => o === modelName);
        // if (obj) {
        //   // if (this.systemsListForm.value['systems'][ind].opmode = 'ONT' && opmodes['RG']) {
        //   //   this.systemsListForm.value['systems'][ind].opmode = 'ONT/RG';
        //   //   this.deviceData[system].modelName = modelName;
        //   //   this.systemInfoFormData[system] = {
        //   //     modelName: modelName,
        //   //     opMode: 'ONT/RG'
        //   //   }
        //   // }
        // } else {
        //   this.systemsListForm.value['systems'][ind].opmode = 'ONT';
        // }

        this.Out_Data_Change.emit(this.systemsListForm.value.systems);

      }

      setTimeout(() => {
        this.loading = false;
      }, 100);



    }, (err: any) => {
      //this.pageErrorHandle(err);
      this.loading = false;
    });
  }
  provosionrecord(ind, systemId?, services?, wifi?, settings?, isManagedOnt?, value?) {
    ////debugger;
    let system = this.systemsListForm?.value.systems[ind].deviceId;
    this.loading = true;
    this.service.getProvisionrecord(this.ORG_ID, system).subscribe((res: any) => {
      //this.provisionData = res ? res : [];
      if (res) {
        this.provisionData[system] = res;
      } else {
        this.provisionData[system] = {};
      }
      if (!value) {
        this.deviceProvRecord[system] = this.provisionData[system] ? { ...this.provisionData[system] } : {};
      }
      this.systemInfoChecked[system] = true;
      let opMode = res?.opMode ? res?.opMode : this.deviceData[system]?.opMode ? this.deviceData[system]?.opMode : '';
      let model = res?.modelName ? res?.modelName : this.deviceData[system]?.modelName ? this.deviceData[system]?.modelName : '';

      if (opMode && opMode == 'Managed ONT') {
        this.formatListDataMngdONT(system, res, ind);
      } else {
        this.formatListData(system, res, ind, this.discoveredDevice, systemId, services, wifi, settings, isManagedOnt, value);
      }

      setTimeout(() => {
        this.Out_Data_Provision.emit(this.provisionData);
        if (value) {
          this.Out_Default_Data.emit({
            system: system,
            device: this.deviceData[system] ? this.deviceData[system] : {},
            provision: this.provisionData[system] ? this.provisionData[system] : {}
          });
        }
      }, 10);
      this.loading = false;
      this.systemsListForm.value['systems'][ind].showAdvanced = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.provisionData[system] = {};
      this.loading = false;
    })
  }

  formatListData(id, data, i?, discoveredDevice?, systemId?, services?, wifi?, settings?, isManagedOnt?, value?) {
    this.addDeviceObj[id] = {};
    if (value) {
      this.servicesFormData[id] = this.servicesFormData[id];
    } else {
      this.servicesFormData[id] = {
        configuredService: 'Yes'
      };
    }

    if (value) {
      this.systemInfoFormData[id] = {
        modelName: this.systemInfoFormData[id]?.modelName ? this.systemInfoFormData[id]?.modelName : '',
        opMode: this.systemInfoFormData[id]?.opMode ? this.systemInfoFormData[id]?.opMode : '',
        static: this.systemInfoFormData[id]?.static ? this.systemInfoFormData[id]?.static : false,
        staticGroupList: this.systemInfoFormData[id]?.staticGroupList ? this.systemInfoFormData[id]?.staticGroupList : [],
        discoveredDevice: discoveredDevice
      }
    } else {
      this.systemInfoFormData[id] = {
        modelName: '',
        opMode: '',
        static: false,
        staticGroupList: [],
        discoveredDevice: discoveredDevice
      };
      if (data && data.staticGroupMember) {
        let grps = [];
        data.staticGroupMember.forEach(e => {
          grps.push(e.groupId);
        });

        if (grps.length) {
          this.systemInfoFormData[id] = {
            modelName: '',
            opMode: '',
            static: true,
            staticGroupList: grps,
            discoveredDevice: discoveredDevice
          };

        }


      }

      if (data && data.modelName) {
        this.systemInfoFormData[id].modelName = data.modelName;
      } else {
        this.systemInfoFormData[id].modelName = (this.deviceData[id] && this.deviceData[id]?.modelName) ? this.deviceData[id].modelName : '';
      }

      if (data && data.opMode) {
        this.systemInfoFormData[id].opMode = this.systemsListForm.value['systems'][i].opmode ? this.systemsListForm.value['systems'][i].opmode : data.opMode;
      } else {
        this.systemInfoFormData[id].opMode = this.systemsListForm.value['systems'][i].opmode ? this.systemsListForm.value['systems'][i].opmode : (this.deviceData[id] && this.deviceData[id]?.opMode) ? this.deviceData[id].opMode : ''
      }
    }
    if (value) {
      this.addDeviceObj[id]['wifiSSID'] = this.wifiInfoFormData[id] ? this.wifiInfoFormData[id] : data?.wifi
    } else {
      this.wifiInfoFormData[id] = {};
      this.addDeviceObj[id]['wifiSSID'] = {};
      if (data && data.wifi && Object.keys(data.wifi).length) {
        this.wifiInfoFormData[id] = data.wifi;
        if (this.wifiInfoFormData[id]["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]) {
          this.wifiInfoFormData[id]["UNIFIED_PRIMARY_SSID"] = this.wifiInfoFormData[id]["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"];
        }
        this.addDeviceObj[id]['wifiSSID'] = data.wifi;
        this.tempWifiObj = data.wifi;
      }
    }




    data = {
      data: data?.data,
      video: data?.video,
      voice: data?.voice,
    }

    if (data && (data.data || data.video || data.voice)) {
      if (data.data?.Enable && data.data?.Pbit != undefined) {
        data.data.Pbit = `${data.data?.Pbit}`;
        this.disableService = true;
        this.disable_service.emit(this.disableService);
      }
      if (data.voice?.Line['1']?.Enable && (data.voice?.Line['1']?.Enable == 'Enabled' || data.voice?.Line['1']?.Enable == true)) {
        data.voice.Line['1'].Enable = true;
        this.disableService = true;
        this.disable_service.emit(this.disableService);
        //Service Loss Plan
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.TransmitGain) {
          data.voice.Line['1'].VoiceProcessing.TransmitGain = data.voice?.Line['1'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['1'].VoiceProcessing.ReceiveGain = data.voice?.Line['1'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data.voice) {
          data.voice.Line['1'].Enable = false;
        } else {
          //data['voice']['Line']['1']['Enable'] = false;
        }
      }
      if (data.voice?.Line['2']?.Enable && (data.voice?.Line['2']?.Enable == 'Enabled' || data.voice?.Line['2']?.Enable == true)) {
        data.voice.Line['2'].Enable = true;
        this.disableService = true;
        this.disable_service.emit(this.disableService);
        //Service Loss Plan
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.TransmitGain) {
          data.voice.Line['2'].VoiceProcessing.TransmitGain = data.voice?.Line['2'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['2'].VoiceProcessing.ReceiveGain = data.voice?.Line['2'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data?.voice) {
          data.voice.Line['2'].Enable = false;
        } else {
          //data['voice']['Line']['2']['Enable'] = false;
        }
      }
      if (data.video?.Enable && data.video?.Pbit != undefined) {
        data.video.Pbit = `${data.video?.Pbit}`;
        this.disableService = true;
        this.disable_service.emit(this.disableService);
      }
      this.servicesFormData[id] = {
        configuredService: 'No',
        data: data?.data ? data.data : { Enable: false },
        video: data?.video ? data.video : { Enable: false },
        voice: data?.voice,
      }

      // if (this.activeTab == 'systemServices') {
      //   setTimeout(() => {
      //     this.childSystemServicetier.initialize();
      //   }, 1000);

      // }
    } else {
      this.servicesFormData[id] = {
        configuredService: 'Yes'
      };
    }

    //Wifi


    //Lan Settings
    this.addDeviceObj[id]['settings'] = {};
    if (data && data.ports && Object.keys(data.ports).length) {
      this.addDeviceObj[id]['settings'] = this.formatLanSettingsData(data);
    }
    if (this.systemInfoFormData[systemId]?.opMode == "Managed ONT") {
      isManagedOnt = true;
      services = this.buildONTServiceParams(systemId, i);
    } else {
      services = this.buildServiceParams(systemId, i);
    }
    this.loading = false;
    this.systemsListForm.value['systems'][i].showAdvanced = false;
    //this.dataAvail = true;
    setTimeout(() => {
      if (value) {
        this.saveSystemsAdvancedData(i, systemId, services, wifi, settings, isManagedOnt);
      }
    }, 1000);

  }

  formatListDataMngdONT(id, data, i?) {

    this.addDeviceObj[id] = {};

    this.servicesFormData[id] = {
      //configuredService: 'Yes'
    };
    this.systemInfoFormData[id] = {
      modelName: '',
      opMode: '',
      static: false,
      staticGroupList: [],
    };

    if (data && data.staticGroupMember) {
      let grps = [];
      data.staticGroupMember.forEach(e => {
        grps.push(e.groupId);
      });

      if (grps.length) {
        this.systemInfoFormData[id] = {
          modelName: '',
          opMode: '',
          static: true,
          staticGroupList: grps,
        };

      } else {
        this.systemInfoFormData[id] = {
          modelName: '',
          opMode: '',
          static: false,
          staticGroupList: [],
        };
      }


    }

    if (data && data.modelName) {
      this.systemInfoFormData[id].modelName = data.modelName;
    } else {
      this.systemInfoFormData[id].modelName = (this.deviceData[id] && this.deviceData[id]?.modelName) ? this.deviceData[id].modelName : '';
    }

    if (data && data.opMode) {
      this.systemInfoFormData[id].opMode = data.opMode;
    } else {
      this.systemInfoFormData[id].opMode = (this.deviceData[id] && this.deviceData[id]?.opMode) ? this.deviceData[id].opMode : '';
    }

    let dataObj = [], videoObj = [], voiceObj = [];
    if (data && data.services && data.services.length) {
      data.services.forEach(s => {
        if (s.category == 'Data Service') {
          dataObj.push(s);
        }
        if (s.category == 'Video Service') {
          videoObj.push(s);
        }
        if (s.category == 'Voice Service') {
          voiceObj.push(s);
        }

      });

    }


    if (data && data.voice && voiceObj && voiceObj.length) {

      if (data.voice?.Line['1']?.Enable && (data.voice?.Line['1']?.Enable == 'Enabled' || data.voice?.Line['1']?.Enable == true)) {
        data.voice.Line['1'].Enable = true;

        //Service Loss Plan
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.TransmitGain) {
          data.voice.Line['1'].VoiceProcessing.TransmitGain = data.voice?.Line['1'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['1'].VoiceProcessing && data.voice?.Line['1'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['1'].VoiceProcessing.ReceiveGain = data.voice?.Line['1'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['1'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data.voice) {
          data.voice.Line['1'].Enable = false;
        } else {
          //data['voice']['Line']['1']['Enable'] = false;
        }
      }
      if (data.voice?.Line['2']?.Enable && (data.voice?.Line['2']?.Enable == 'Enabled' || data.voice?.Line['2']?.Enable == true)) {
        data.voice.Line['2'].Enable = true;

        //Service Loss Plan
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.TransmitGain) {
          data.voice.Line['2'].VoiceProcessing.TransmitGain = data.voice?.Line['2'].VoiceProcessing.TransmitGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.TransmitGain = -3;
        if (data.voice?.Line['2'].VoiceProcessing && data.voice?.Line['2'].VoiceProcessing.ReceiveGain) {
          data.voice.Line['2'].VoiceProcessing.ReceiveGain = data.voice?.Line['2'].VoiceProcessing.ReceiveGain / 10;
        } else data.voice.Line['2'].VoiceProcessing.ReceiveGain = -9;
      } else {
        if (data?.voice) {
          data.voice.Line['2'].Enable = false;
        } else {
          //data['voice']['Line']['2']['Enable'] = false;
        }
      }

      this.servicesFormData[id] = {

        data: dataObj,
        video: videoObj,
        voice: {
          Enable: voiceObj.length ? true : false,
          ProfileId: (voiceObj[0].ProfileId && this.profiles[voiceObj[0].ProfileId]) ? this.profiles[voiceObj[0].ProfileId] : undefined,
          ...data.voice
        },
      }

    } else {
      this.servicesFormData[id] = {
        data: dataObj,
        video: videoObj,
        voice: {
          ProfileId: undefined,
          Enable: voiceObj.length ? true : false,
          Line: {
            '1': {
              Enable: false
            },
            '2': {
              Enable: false
            }
          }
        },
      };

    }

    //Wifi
    this.wifiInfoFormData[id] = {};
    this.addDeviceObj[id]['wifiSSID'] = {};
    if (data && data.wifi && Object.keys(data.wifi).length) {
      this.wifiInfoFormData[id] = data.wifi;
      this.addDeviceObj[id]['wifiSSID'] = data.wifi;
      this.tempWifiObj = data.wifi;
    }

    //Lan Settings
    this.addDeviceObj[id]['settings'] = {};
    if (data && data.ports && Object.keys(data.ports).length) {
      this.addDeviceObj[id]['settings'] = this.formatLanSettingsData(data);
    }

    this.loading = false;
    //this.dataAvail = true;
  }

  buildPortsObj(systemId) {
    let portObjs = {};
    let currentPortObj = this.addDeviceObj[systemId].settings;
    let i = 0;
    for (let key of Object.keys(currentPortObj)) {
      if (Object.keys(currentPortObj[key]).length > 0) {
        i++

        let portObj = {};
        if (currentPortObj[key].DHCPLeaseLimit !== '') {
          portObj['DhcpLeaseLimit'] = currentPortObj[key].DHCPLeaseLimit;
        }
        if (currentPortObj[key].speed !== 'Auto') {
          portObj['MaxBitRate'] = currentPortObj[key].speed
        }
        if (currentPortObj[key].adminState !== "Enable") {
          portObj['Enable'] = false;
        }
        if (!currentPortObj[key].powerSaving) {
          portObj['OnBatteryEnable'] = true;
        }
        if (currentPortObj[key].duplex && currentPortObj[key].duplex.trim() !== 'Auto') {
          portObj['OnBatteryEnable'] = false;
        }
        portObjs['eth-' + i] = _.pickBy(portObj, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        })
      }
    }
    return _.pickBy(portObjs, function (value, key) {
      return !(value === undefined || value === "" || value === " ");
    });
  }

  updateForm(data, ind) {
    if (this.systemsListForm.value.systems[ind]) {
      let systemId = this.systemsListForm.value.systems[ind].deviceId;
      this.servicesFormData[systemId] = data;
    }

  }

  updateSystemForm(data, ind) {
    if (this.systemsListForm.value.systems[ind]) {
      let systemId = this.systemsListForm.value.systems[ind].deviceId;
      this.systemInfoFormData[systemId] = data;
    }

  }
  unsavedData(data, ind) {
    this.unSavedData = data
    this.errorInfo = "There are unsaved changes, do you still want to go ahead?"
    this.unSavedData_emit.emit(this.unSavedData);
  }
  wifiNotchanged(data, ind) {
    this.wifiNotchange = data
  }
  Out_Unified(data, ind) {
    this.unifiedData = data;
  }
  updateWifiForm(data, ind) {
    let systemId = this.systemsListForm.value.systems[ind].deviceId;
    if (!this.wifiNotchange) {
      this.wifiInfoFormData[systemId] = {};
      this.addDeviceObj[systemId]['wifiSSID'] = {};
    } else {
      this.wifiInfoFormData[systemId] = data;
      this.addDeviceObj[systemId]['wifiSSID'] = data;
    }

  }

  updateDeviceObjForm(data, ind, obj) {
    let systemId = this.systemsListForm.value.systems[ind].deviceId;
    this.addDeviceObj[systemId][obj] = data;
  }

  saveSystem(ind) {
    this.submitted = true;
    this.unSavedData = false;
    if (!this.systemsListForm.value['systems'][ind]?.deviceId) {
      return
    }
    this.loading = true;
    if (!this.systemsListForm.value['systems'][ind].showAdvanced) {
      this.systemsListForm.value['systems'][ind].showAdvanced = true;
      setTimeout(() => {
        //this.save(ind);
        this.childAdvanced.forEach((dtElement, i) => {
          if (ind == dtElement.iId) {
            dtElement.saveSystem();
            this.loading = false;
          }
        });
      }, 1000);
    } else {
      this.systemsListForm.value['systems'][ind].showAdvanced = false;
      this.childAdvanced.forEach((dtElement, i) => {
        if (ind == dtElement.iId) {
          dtElement.saveSystem();
          this.loading = false;
        }
      });

    }


    this.unSavedData_emit.emit(this.unSavedData);
  }


  saveAllSystemsData() {
    this.loading = true
    this.systemsListForm.value['systems'].forEach((sys, ind) => {
      //this.systemsListForm.value['systems'][ind].showAdvanced = true;
    });

    setTimeout(() => {
      this.systemsListForm.value['systems'].forEach((sys, ind) => {
        this.childAdvanced.forEach((dtElement, i) => {
          if (ind == dtElement.iId) {
            dtElement.saveSystem();
            this.loading = false;
          }
        });
      });
    }, 1000);
  }

  saveSys(ind) {
    let systemId = this.systemsListForm.value.systems[ind].deviceId;
    this.systemsListForm.value['systems'][ind].showAdvanced = false;
    if (this.systemsListForm.value['systems'][ind].saved) {
      this.system = 'Edit System';
    } else {
      this.system = 'New System';
    }
    this.saveSystemLoading = true;
    this.closeAlert();
    if (this.system == 'New System') {
      this.getSystemsListSubs = this.service.getSubscriberSystemList(this.subscriberData._id).subscribe((list: any) => {
        let avail = false;
        if (list && list.length && list.includes(systemId)) {
          avail = true;
          this.saveSystemLoading = false;
        } else {
          this.updateSystemSusbsciberSubs = this.service.addSubscriberSystemList(this.subscriberData._id, systemId).subscribe((res: any) => {
            this.provosionrecord(ind);
            this.showSuccessMessage(this.language['system_associate_successfully']);
            this.Out_Data_Change.emit(this.systemsListForm.value.systems);
            this.systemsListForm.value['systems'][ind].saved = true;
            this.saveSystemLoading = false;
          }, (err: HttpErrorResponse) => {
            this.saveSystemLoading = false;
            this.Out_Data_Change.emit(this.systemsListForm.value.systems);
            this.pageErrorHandle(err);
          });
        }
      }, (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.updateSystemSusbsciberSubs = this.service.addSubscriberSystemList(this.subscriberData._id, systemId).subscribe((res: any) => {
            this.provosionrecord(ind);
            this.saveSystemLoading = false;
            this.showSuccessMessage(this.language['system_associate_successfully']);
            this.Out_Data_Change.emit(this.systemsListForm.value.systems);
            this.systemsListForm.value['systems'][ind].saved = true;
          }, (err: HttpErrorResponse) => {
            this.saveSystemLoading = false;
            this.Out_Data_Change.emit(this.systemsListForm.value.systems);
            this.pageErrorHandle(err);
          });
        } else {
          this.saveSystemLoading = false;
          this.Out_Data_Change.emit(this.systemsListForm.value.systems);
          this.systemsListForm.value['systems'][ind].saved = true;
          this.pageErrorHandle(err);
        }

      });

      this.systemsListForm.value['systems'][ind].showAdvanced = false;

    } else {
      this.saveSystemLoading = false;
      this.provosionrecord(ind)
    }

  }
  save(ind) {
    //debugger;
    this.saveSystemLoading = true
    let systemId = this.systemsListForm.value.systems[ind].deviceId;
    let services;
    let wifi = this.WifiDataParams(ind);
    let settings = this.buildPortsObj(systemId);
    let isManagedOnt = false;


    this.provosionrecord(ind, systemId, services, wifi, settings, isManagedOnt, true);

  }

  saveSystemsAdvancedData(ind, systemId, services, wifi, settings, isManagedOnt) {
    //Update Advanced Settings
    this.saveSystemLoading = true;
    let params = {
      isNeedAssociateDeviceToSubscriber: false,
      subscriber: {
        account: this.subscriberData.account,
        email: this.subscriberData.email,
        name: this.subscriberData.name,
        phone: this.subscriberData.phone,
        serviceAddress: this.subscriberData.serviceAddress,
        subscriberLocationId: this.subscriberData.subscriberLocationId,
        _id: this.subscriberData._id
      }, // subscriber data
      deviceId: systemId,
      provisioningRecord: {
        deviceId: systemId,
        opMode: this.systemInfoFormData[systemId].opMode === 'ONT/RG' ? 'RG' : this.systemInfoFormData[systemId].opMode ? this.systemInfoFormData[systemId].opMode : 'RG',
        // orgId: this.ORG_ID,
        subscriberId: this.subscriberData._id,
        wifi: {},
        // data: services.data,
        // video: services.video,
        // voice: services.voice,
      }
    };
    if (isManagedOnt) {
      if (services.voice && Object.keys(services.voice).length) {
        params.provisioningRecord['voice'] = services.voice;
      }
      if (services.services) {
        params.provisioningRecord['services'] = services.services ? services.services : [];
      }
    } else {
      if (((this.systemInfoFormData[systemId].opMode && this.systemInfoFormData[systemId].opMode != 'WAP') || (params.provisioningRecord.opMode != 'WAP')) && services) {
        if (services?.data?.Enable) {
          params.provisioningRecord['data'] = services.data;
        }
        if (services?.video?.Enable) {
          params.provisioningRecord['video'] = services.video;
        }
        if (services?.voice?.ServiceType) {
          params.provisioningRecord['voice'] = services.voice;
        }

      }
    }



    if (this.provisionData[systemId] && this.provisionData[systemId]._id) {
      params.isNeedAssociateDeviceToSubscriber = false;
      if (!this.deltedevice) {
        params.provisioningRecord['_id'] = this.provisionData[systemId]._id;
      }

    } else {
      params.isNeedAssociateDeviceToSubscriber = false;
    }

    if (this.systemInfoFormData[systemId] && this.systemInfoFormData[systemId]?.modelName) {
      params.provisioningRecord['modelName'] = this.systemInfoFormData[systemId].modelName;
    }

    //STATIC GROUPS
    if (this.systemInfoFormData[systemId].staticGroupList && this.systemInfoFormData[systemId].staticGroupList.length) {
      let groups = [];
      this.systemInfoFormData[systemId].staticGroupList.forEach(g => {
        groups.push({
          groupId: g,
          memberInfo: systemId,
          type: "FSAN"
        });
      });
      params.provisioningRecord['newStaticGroup'] = groups;
    }
    if (this.provisionData[systemId].staticGroupMember && this.provisionData[systemId].staticGroupMember.length) {
      params.provisioningRecord['oldStaticGroup'] = this.provisionData[systemId].staticGroupMember;
    }

    //WIFI
    if (wifi && Object.keys(wifi).length) {
      params.provisioningRecord['wifi'] = wifi;
    }

    // LAN SETTINGS
    if (this.systemInfoFormData[systemId]?.opMode && this.systemInfoFormData[systemId].opMode == 'Managed ONT' && settings && Object.keys(settings).length) {
      params.provisioningRecord['ports'] = settings;
      params.provisioningRecord['enableRgOnBattery'] = this.addDeviceObj[systemId]?.settings?.isPowerSaving;
    }

    //debugger;
    if (params.provisioningRecord['opMode'] !== 'ONT') {
      this.updateSystemServicesSubs = this.service.saveSubscriberSystem(params).subscribe(res => {
        this.saveSys(ind)
        this.saveSystemLoading = false;
        this.systemsListForm.value['systems'][ind].showAdvanced = false;
        this.editMode = true
        this.unifiedData = {}
      }, (err: HttpErrorResponse) => {
        this.saveSystemLoading = false;
        //this.Out_Data_Change.emit(this.systemsListForm.value.systems);
        this.pageErrorHandle(err);
      });
    } else {
      this.saveSystemLoading = false;
      this.saveSys(ind)
      //this.systemsListForm.value['systems'][ind].saved = true;
    }

  }

  buildServiceParams(sysId, ind) {
    let formData = this.servicesFormData[sysId] ? _.cloneDeep(this.servicesFormData[sysId]) : {};
    let params = {
      data: {
        Enable: false
      },
      voice: {
      },
      video: {
        Enable: false
      }
    };

    if (formData.configuredService && formData.configuredService != 'Yes') {
      const ServiceType = formData.voice?.ServiceType ? formData.voice?.ServiceType : '';
      //DATA PROCESS
      if (formData.data?.Enable) {
        formData.data.pppoe = _.pickBy(formData.data.pppoe, v => v !== null && v !== "");
        if (formData.data.Pbit != undefined) {
          formData.data.Pbit = `${formData.data.Pbit}`;
        }
      } else {
        if (formData.data?.BwProfile) {
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

      if (params.data['VlanId'] && typeof params.data['VlanId'] == 'string') {
        params.data['VlanId'] = parseInt(params.data['VlanId']);
      }
      if (params.data['Pbit'] && typeof params.data['Pbit'] == 'string') {
        params.data['Pbit'] = parseInt(params.data['Pbit']);
      }
      //VOICE PROCESS
      if (ServiceType !== 'SIP' && formData.voice?.FaxT38 != undefined) {
        delete formData.voice?.FaxT38;
      }

      if (ServiceType !== 'SIP' && formData.voice?.DialPlan != undefined) {
        delete formData.voice?.DialPlan;
      }

      if ((ServiceType !== 'MGCP' && ServiceType !== 'H.248') || formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType !== 'DHCP') {
        if (formData.voice?.X_000631_Opt81ClientFQDN != undefined) delete formData.voice.X_000631_Opt81ClientFQDN;
      }

      if (formData.voice && formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType !== 'Static') {
        formData.voice.X_CALIX_SXACC_RG_WAN = {
          ServiceConnectionType: 'DHCP'
        }
      } else if (formData.voice?.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType === 'Static' && formData.voice?.X_CALIX_SXACC_RG_WAN?.DNSServers) {
        let dns = formData.voice?.X_CALIX_SXACC_RG_WAN.DNSServers;
        let arr = dns.split(",");
        arr = arr.filter(el => el && el.trim());
        formData.voice.X_CALIX_SXACC_RG_WAN.DNSServers = arr.join(',');
      }

      formData = ((formData) => {
        for (let i = 1; i < 3; i++) {
          if (formData.voice?.Line[i].Enable && typeof formData.voice?.Line[i].Enable != 'boolean') {
            formData.voice.Line[i].Enable = (formData.voice?.Line[i].Enable == 'Enabled') ? true : false;
          }
          if (ServiceType === 'SIP' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              SIP: formData.voice.Line[i].SIP,
              CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            if (!formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectEnable) {
              delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectNumber;
              delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectTimer;
            } else {
              if (formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectTimer) formData.voice.Line[i].CallingFeatures.X_000631_DirectConnectTimer = parseInt(formData.voice.Line[i].CallingFeatures.X_000631_DirectConnectTimer);
            }

          } else if (ServiceType === 'H.248' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              X_000631_H248: formData.voice.Line[i].X_000631_H248,
              //CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            // if (formData.voice?.Line[i].MGCP) delete formData.voice?.Line[i].MGCP;
            // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
          } else if (ServiceType === 'MGCP' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              MGCP: formData.voice.Line[i].MGCP,
              //CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            // if (formData.voice?.Line[i].TerminationId) delete formData.voice?.Line[i].TerminationId;
            // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
          } else if (ServiceType === 'X_000631_TDMGW' && formData.voice?.Line[i].Enable) {
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
      if (formData.voice && !formData.voice.Line['1'].Enable) {
        params.voice['Line']['1'] = {
          Enable: "Disabled"
        };
      } else if (formData.voice) {
        params.voice['Line']['1'].Enable = "Enabled";
      }

      if (formData.voice && !formData.voice.Line['2'].Enable) {
        params.voice['Line']['2'] = {
          Enable: "Disabled"
        };
      } else if (formData.voice) {
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

      if (params.video['VlanId'] && typeof params.video['VlanId'] == 'string') {
        params.video['VlanId'] = parseInt(params.video['VlanId']);
      }
      if (params.video['Pbit'] && typeof params.video['Pbit'] == 'string') {
        params.video['Pbit'] = parseInt(params.video['Pbit']);
      }
    }

    return params;
  }

  buildONTServiceParams(sysId, ind) {
    let formData = this.servicesFormData[sysId] ? _.cloneDeep(this.servicesFormData[sysId]) : {};
    let params = {
      services: [],
      voice: {
      }
    };

    const ServiceType = formData.voice?.ServiceType ? formData.voice?.ServiceType : '';
    //DATA PROCESS
    if (formData.data) {
      formData.data.forEach(data => {
        let dataObj = {
          Enable: data.Enable,
          ProfileId: (data.ProfileId && data.ProfileId['_id']) ? data.ProfileId['_id'] : undefined,
          Overrides: {
            BwProfile: data.Overrides.BwProfile ? data.Overrides.BwProfile : undefined,
            VlanId: (data.Overrides.VlanId && data.ProfileId?.VLAN != data.Overrides.VlanId) ? data.Overrides.VlanId : undefined,
          },
          pppoe: {
            Username: data.pppoe.Username ? data.pppoe.Username : '',
            Password: data.pppoe.Password ? data.pppoe.Password : '',
          }
        }
        dataObj.pppoe = _.pickBy(dataObj.pppoe, v => v !== null && v !== "");
        if (!Object.keys(dataObj.pppoe).length) {
          delete dataObj.pppoe;
        }
        dataObj.Overrides = _.pickBy(dataObj.Overrides, v => v !== null && v !== "");
        dataObj = _.pickBy(dataObj, v => {
          return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
        });
        if (dataObj.ProfileId) {
          params.services.push(dataObj);
        }
      });
    }

    if (formData.video) {
      formData.video.forEach(data => {
        let dataObj = {
          Enable: data.Enable,
          ProfileId: (data.ProfileId && data.ProfileId['_id']) ? data.ProfileId['_id'] : undefined,
          Overrides: {
            BwProfile: data.Overrides.BwProfile ? data.Overrides.BwProfile : undefined,
            VlanId: (data.Overrides.VlanId && data.ProfileId?.VLAN != data.Overrides.VlanId) ? data.Overrides.VlanId : undefined,
          }
        }
        dataObj.Overrides = _.pickBy(dataObj.Overrides, v => v !== null && v !== "");
        dataObj = _.pickBy(dataObj, v => {
          return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
        });
        if (dataObj.ProfileId) {
          params.services.push(dataObj);
        }
      });
    }

    if (formData.voice && formData.voice.Enable) {
      let data = formData.voice;
      let dataObj = {
        Enable: data.Enable,
        ProfileId: (data.ProfileId && data.ProfileId['_id']) ? data.ProfileId['_id'] : undefined
      }
      dataObj = _.pickBy(dataObj, v => {
        return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
      });
      if (dataObj.ProfileId) {
        params.services.push(dataObj);
      }
    }

    params.services.map(m => {
      if (m.Overrides && m.Overrides?.VlanId) {
        m.Overrides.VlanId = parseInt(m.Overrides.VlanId);
      }
    });

    // params.data = _.pickBy(formData.data, v => {
    //   return ((v !== null && v !== "") || (v !== null && typeof v == 'object' && Object.keys(v).length))
    // });

    // if (params.data['VlanId'] && typeof params.data['VlanId'] == 'string') {
    //   params.data['VlanId'] = parseInt(params.data['VlanId']);
    // }
    // if (params.data['Pbit'] && typeof params.data['Pbit'] == 'string') {
    //   params.data['Pbit'] = parseInt(params.data['Pbit']);
    // }
    //VOICE PROCESS
    if (formData.voice && formData.voice.Enable) {
      if (ServiceType !== 'SIP' && formData.voice?.FaxT38 != undefined) {
        delete formData.voice?.FaxT38;
      }

      if (ServiceType !== 'SIP' && formData.voice?.DialPlan != undefined) {
        delete formData.voice?.DialPlan;
      }

      if ((ServiceType !== 'MGCP' && ServiceType !== 'H.248') || formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType !== 'DHCP') {
        if (formData.voice?.X_000631_Opt81ClientFQDN != undefined) delete formData.voice.X_000631_Opt81ClientFQDN;
      }

      if (formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType !== 'Static') {
        formData.voice.X_CALIX_SXACC_RG_WAN = {
          ServiceConnectionType: 'DHCP'
        }
      } else if (formData.voice?.X_CALIX_SXACC_RG_WAN.ServiceConnectionType === 'Static' && formData.voice?.X_CALIX_SXACC_RG_WAN.DNSServers) {
        let dns = formData.voice?.X_CALIX_SXACC_RG_WAN.DNSServers;
        let arr = dns.split(",");
        arr = arr.filter(el => el && el.trim());
        formData.voice.X_CALIX_SXACC_RG_WAN.DNSServers = arr.join(',');
      }

      formData = ((formData) => {
        for (let i = 1; i < 3; i++) {
          if (formData.voice?.Line[i].Enable && typeof formData.voice?.Line[i].Enable != 'boolean') {
            formData.voice.Line[i].Enable = (formData.voice?.Line[i].Enable == 'Enabled') ? true : false;
          }
          if (ServiceType === 'SIP' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              SIP: formData.voice.Line[i].SIP,
              CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            if (!formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectEnable) {
              delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectNumber;
              delete formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectTimer;
            } else {
              if (formData.voice?.Line[i].CallingFeatures.X_000631_DirectConnectTimer) formData.voice.Line[i].CallingFeatures.X_000631_DirectConnectTimer = parseInt(formData.voice.Line[i].CallingFeatures.X_000631_DirectConnectTimer);
            }

          } else if (ServiceType === 'H.248' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              X_000631_H248: formData.voice.Line[i].X_000631_H248,
              //CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            // if (formData.voice?.Line[i].MGCP) delete formData.voice?.Line[i].MGCP;
            // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
          } else if (ServiceType === 'MGCP' && formData.voice?.Line[i].Enable) {
            formData.voice.Line[i] = {
              Enable: formData.voice.Line[i].Enable,
              MGCP: formData.voice.Line[i].MGCP,
              //CallingFeatures: formData.voice.Line[i].CallingFeatures,
              VoiceProcessing: formData.voice.Line[i].VoiceProcessing
            }
            // if (formData.voice?.Line[i].TerminationId) delete formData.voice?.Line[i].TerminationId;
            // if (formData.voice?.Line[i].X_000631_TdmGw) delete formData.voice?.Line[i].X_000631_TdmGw;
          } else if (ServiceType === 'X_000631_TDMGW' && formData.voice?.Line[i].Enable) {
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
      if (!formData.voice.Line['1'].Enable) {
        params.voice['Line']['1'] = {
          Enable: "Disabled"
        };
      } else {
        params.voice['Line']['1'].Enable = "Enabled";
      }

      if (!formData.voice.Line['2'].Enable) {
        params.voice['Line']['2'] = {
          Enable: "Disabled"
        };
      } else {
        params.voice['Line']['2'].Enable = "Enabled";
      }

      if (params.voice && params.voice['Enable']) {
        delete params.voice['Enable'];
      }

      if (params.voice && params.voice['ProfileId']) {
        delete params.voice['ProfileId'];
      }
    }


    return params;
  }

  getDeviceModels(value?) {
    this.modelLoading = true;
    let params = { orgId: this.sso.getOrgId() }
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${JSON.stringify(params)}`).subscribe((json: any) => {
      //console.log(json);
      let obj = {};
      if (json) {
        json.forEach((element: any) => {
          if (element && element.modelName) {
            obj[element['modelName'.trim()]] = true;
          }
        });
        this.Modelitems = [];
        this.deviceModels = Object.keys(obj);
        const deviceModel = this.deviceModels.filter(el => {
          if (el.indexOf("844F") == -1 && el.indexOf("801F") == -1) {
            this.Modelitems.push(el)
          }
        })
      }
      // if (value === 'Exos') {
      //   this.exosModel = true;
      // } else {
      //   this.exosModel = false;
      // }
      this.modelLoading = false;
    }, (err: any) => {
      this.pageErrorHandle(err);
      this.modelLoading = false;
    });
  }


  getDeviceGoupCount() {
    this.devGrpLoading = true;
    this.deviceListSubs = this.service.getDeviceGroupCount(this.ORG_ID).subscribe((data: any) => {
      let count = 0;
      if (data) {
        count = data.count;
        this.getDeviceGoupList(count);
      } else {
        this.devGrpLoading = false;
      }
    }, (err: HttpErrorResponse) => {
      this.devGrpLoading = false;
      this.pageErrorHandle(err);
    })
  }

  getDeviceGoupList(count) {
    this.devGrpLoading = true;
    this.deviceListSubs = this.service.getDeviceGoupList(this.ORG_ID, count).subscribe((data: any) => {
      this.deviceDataList = data ? this.getStaticList(data) : [];
      this.devGrpLoading = false;
    }, (err: HttpErrorResponse) => {
      this.devGrpLoading = false;
      this.pageErrorHandle(err);
    })
  }

  getStaticList(list) {
    if (list && list.length > 0) {
      list = list.filter(device => {
        return (device.type === 'static');
      });

    }
    return list;
  }

  setConfigProfileData() {
    let value = this.formOptions;
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
  }

  getProfileData() {
    //if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    this.bandwidthLoading = true;
    this.getAllProfileSubscribe = this.service.getBWProfile(this.ORG_ID).subscribe((res: any) => {
      this.bandwidthLoading = false;
      if (res) {
        //this.buildeServiceProfileList(res);
        this.buildBWProfile(res);
        this.allProfileList = res;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    }, () => {
      this.bandwidthLoading = false;
    });
  }

  buildBWProfile(profileList) {
    const bwProfile = profileList.filter(profile => {
      return (profile.innerProfileCategory === 'Bandwidth')
    });
    this.formOptions.Brandwidthitems = [...bwProfile];
  }
  wifiSsidMngrStngsValues = {};
  checkWifiSSIDForBuildKeys(key) {

    if (key == 'X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['2DOT4GHZ_PRIMARY'];
    } else if (key == 'X_CALIX_SXACC_PRIMARY_5GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_PRIMARY'];
    } else if (key == 'X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['2DOT4GHZ_PRIMARY'] && !this.sso.acceptGSModel(this.addDeviceObj.device.selectedModel);
    } else if (key == 'X_CALIX_SXACC_GUEST_5GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_GUEST'] && !this.sso.acceptGSModel(this.addDeviceObj.device.selectedModel);
    }
    else if (key == 'X_CALIX_SXACC_PRIMARY_6GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['6GHZ_PRIMARY']
    } else if (key == 'X_CALIX_SXACC_GUEST_6GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['6GHZ_GUEST'] && !this.sso.acceptGSModel(this.addDeviceObj.device.selectedModel);
    }
    else if (key == 'UNIFIED_PRIMARY_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_PRIMARY'];
    }
    return false;
  }
  WifiDataParams(id) {
    let sys = this.systemsListForm.value.systems[id].deviceId;
    let wifiObj = this.wifiInfoFormData[sys] ? this.wifiInfoFormData[sys] : {};
    let allowedWifissids = ["X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_5GHZ_SSID", "X_CALIX_SXACC_GUEST_5GHZ_SSID", 'X_CALIX_SXACC_PRIMARY_6GHZ_SSID', "X_CALIX_SXACC_GUEST_6GHZ_SSID", 'UNIFIED_PRIMARY_SSID'];
    let allwifiObj:any = {};
    for (let key in wifiObj) {
      if (allowedWifissids.indexOf(key) === -1) {
        continue;
      }


      //if (!this.checkWifiSSIDForBuildKeys(key)) continue;
      let prevWifiValues = this.deviceProvRecord[sys]?.wifi?.[key] ? this.deviceProvRecord[sys]?.wifi?.[key] : {};


      if (this.deviceProvRecord[sys]?.wifi?.[key]?.SSID == undefined) {
        prevWifiValues['SSID'] = "";
      }
      if (this.deviceProvRecord[sys]?.wifi?.[key]?.KeyPassphrase == undefined) {
        prevWifiValues['KeyPassphrase'] = "";
      }
      if (wifiObj[key].serviceEnabled == 'undefined') {
        wifiObj[key].serviceEnabled = undefined;
      } else if (wifiObj[key].serviceEnabled == 'true') {
        wifiObj[key].serviceEnabled = true;
      } else if (wifiObj[key].serviceEnabled == 'false') {
        wifiObj[key].serviceEnabled = false;
      }

      if (wifiObj[key].name != undefined) {
        wifiObj[key].name = wifiObj[key].name.trim();
      }
      if (wifiObj[key].passphrase != undefined) {
        wifiObj[key].passphrase = wifiObj[key].passphrase.trim();
      }

      let wifiObject: any = {
        SSID: (prevWifiValues?.SSID != wifiObj[key].name) ? (wifiObj[key].name != undefined ? wifiObj[key].name : undefined) : undefined,
        Enable: (prevWifiValues?.Enable != wifiObj[key].serviceEnabled) ? (wifiObj[key].serviceEnabled != undefined ? wifiObj[key].serviceEnabled : undefined) : undefined,
        SSIDAdvertisementEnabled: (prevWifiValues?.SSIDAdvertisementEnabled != wifiObj[key].broadcastEnabled) ? (wifiObj[key].broadcastEnabled != undefined ? wifiObj[key].broadcastEnabled : undefined) : undefined,
        BeaconType: (prevWifiValues?.BeaconType != wifiObj[key].securityType) ? ((wifiObj[key].securityType != undefined && wifiObj[key].securityType !== "") ? wifiObj[key].securityType : undefined) : undefined,
        MUMIMOEnabled: (prevWifiValues?.MUMIMOEnabled != wifiObj[key].mumimoEnabled) ? (wifiObj[key].mumimoEnabled != undefined ? wifiObj[key].mumimoEnabled : undefined) : undefined,
        EnableDfsChannels: (prevWifiValues?.EnableDfsChannels != wifiObj[key].enableDfsChannels) ? (wifiObj[key].enableDfsChannels != undefined ? wifiObj[key].enableDfsChannels : undefined) : undefined,
      };
      if (wifiObj[key].securityType !== 'Basic') {
        wifiObject['IEEE11iEncryptionModes'] = (prevWifiValues?.IEEE11iEncryptionModes != wifiObj[key].encryption) ? ((typeof wifiObj[key].encryption === 'string' && wifiObj[key].encryption !== "") ? wifiObj[key].encryption : undefined) : undefined;
        wifiObject['KeyPassphrase'] = (prevWifiValues?.KeyPassphrase != wifiObj[key].passphrase) ? (wifiObj[key].passphrase != undefined ? wifiObj[key].passphrase : undefined) : undefined;
        wifiObject['WPAEncryptionModes'] = (prevWifiValues?.IEEE11iEncryptionModes != wifiObj[key].encryption) ? ((typeof wifiObj[key].encryption === 'string' && wifiObj[key].encryption !== "") ? wifiObj[key].encryption : undefined) : undefined;
      } else {
        wifiObject['IEEE11iEncryptionModes'] = undefined;
        wifiObject['KeyPassphrase'] = undefined;
        wifiObject['WPAEncryptionModes'] = undefined;
      }

      if (!_.isEmpty(_.pickBy(wifiObject, function (value, key) {
        return !(value === undefined || value === "undefined" || value === null);
      })))
        allwifiObj[key] = _.pickBy(wifiObject, function (value, key) {
          return !(value === undefined || value === "undefined" || value === null);
        });

    }
    if ((this.unifiedData?.isUnifiedPrimarySSID && !(this.unifiedData.toggeledUnifiedPrimarySSID)) || (allwifiObj?.UNIFIED_PRIMARY_SSID && Object.keys(allwifiObj["UNIFIED_PRIMARY_SSID"]).length) ) {
      var unifiedPrimarySsid = wifiObj["UNIFIED_PRIMARY_SSID"] ? Object.assign({}, wifiObj["UNIFIED_PRIMARY_SSID"]) : Object.assign({}, this?.unifiedData?.wifiSSID["UNIFIED_PRIMARY_SSID"]);

      delete unifiedPrimarySsid?.enableDfsChannels;
      delete unifiedPrimarySsid?.mumimoEnabled;

      delete allwifiObj["X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID"];
      var fivePrimarySsid = Object.assign({}, allwifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]);
      var sixPrimarySsid = Object.assign({}, allwifiObj["X_CALIX_SXACC_PRIMARY_6GHZ_SSID"]);

      var fiveKeys = Object.keys(fivePrimarySsid);
      var sixKeys = Object.keys(sixPrimarySsid);
      if (fiveKeys?.length > 0) {
        let fiveWifiObject: any = {
          MUMIMOEnabled: fivePrimarySsid?.MUMIMOEnabled,
          EnableDfsChannels: fivePrimarySsid?.EnableDfsChannels,
        };
        allwifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"] = {};
        allwifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"] = fiveWifiObject;
      }
      if (sixKeys?.length > 0) {
        let sixWifiObject: any = {
          MUMIMOEnabled: fivePrimarySsid?.MUMIMOEnabled,
        };
        allwifiObj["X_CALIX_SXACC_PRIMARY_6GHZ_SSID"] = {};
        allwifiObj["X_CALIX_SXACC_PRIMARY_6GHZ_SSID"] = sixWifiObject;
      }

      let unifiedWifiObject: any = {
        SSID: unifiedPrimarySsid?.name,
        Enable: unifiedPrimarySsid?.serviceEnabled,
        SSIDAdvertisementEnabled: unifiedPrimarySsid?.broadcastEnabled,
        BeaconType: unifiedPrimarySsid?.securityType,
      };
      if (unifiedPrimarySsid?.securityType !== 'Basic') {
        unifiedWifiObject['IEEE11iEncryptionModes'] = unifiedPrimarySsid?.encryption;
        unifiedWifiObject['KeyPassphrase'] = unifiedPrimarySsid?.passphrase;
        unifiedWifiObject['WPAEncryptionModes'] = unifiedPrimarySsid?.encryption;
      } else {
        unifiedWifiObject['IEEE11iEncryptionModes'] = undefined;
        unifiedWifiObject['KeyPassphrase'] = undefined;
        unifiedWifiObject['WPAEncryptionModes'] = undefined;
      }



      allwifiObj["UNIFIED_PRIMARY_SSID"] = {};
      //allwifiObj["UNIFIED_PRIMARY_SSID"] = unifiedWifiObject;
      allwifiObj["UNIFIED_PRIMARY_SSID"] = _.pickBy(unifiedWifiObject, function (value, key) {
        return !(value === undefined || value === "undefined" || value === null || value === "");
      });

    }
    else if (!(this.unifiedData?.isUnifiedPrimarySSID) && !(this.unifiedData?.toggeledUnifiedPrimarySSID)) {
      delete allwifiObj["UNIFIED_PRIMARY_SSID"];
    }

    return allwifiObj;

  }

  formatLanSettingsData(prov) {
    const settingsKey: string[] = ['lanPortOne', 'lanPortTwo', 'lanPortThree', 'lanPortFour'];
    const patchedObj: ISettingsModel = {};
    patchedObj['isPowerSaving'] = !prov.enableRgOnBattery;
    let portObj: ILanPortModel = {
      adminState: 'Enable',
      duplex: 'Auto',
      DHCPLeaseLimit: 0,
      powerSaving: true,
      speed: 'Auto'
    }
    if (prov.ports) {
      settingsKey.forEach((key, index) => {
        const settingsObj = prov.ports['eth-' + (index + 1)];
        if (settingsObj) {
          portObj = {
            adminState: settingsObj.Enable !== undefined ? settingsObj.Enable ? 'Enable' : 'Disable' : 'Enable',
            duplex: settingsObj.DuplexMode !== undefined ? settingsObj.DuplexMode : 'Auto ',
            DHCPLeaseLimit: settingsObj.DhcpLeaseLimit !== undefined ? settingsObj.DhcpLeaseLimit : 0,
            powerSaving: settingsObj.OnBatteryEnable !== undefined ? !settingsObj.OnBatteryEnable : true,
            speed: settingsObj.MaxBitRate !== undefined ? settingsObj.MaxBitRate : 'Auto',
          }
        }
        patchedObj[key] = portObj;
      });
    }
    return patchedObj;
  }


  displayWaringMessageModel(device,opmode, waringModel?) {
    this.isDeleteAndDisAss = false;
    this.showDeleteBtn = true
    this.deleteAndDisassociateSystemMsg = '';
    this.disassociateSystemMsg = '';
    this.deleteSystemId = device;
    this.deletesystemOpmode =opmode
    this.isModalError = false;
    this.modalLoader = false;
    let savedCount = this.systemsListForm.value.systems.reduce((accumulator, current) => accumulator + current.saved, 0);
    if (savedCount == 1 && ((this.subsSysServiceForm?.edgeSuites?.myCommunityIQ?.eduroam?.enable || this.AllFormData?.edgeSuites?.myCommunityIQ?.eduroam?.enable) || (this.subsSysServiceForm?.edgeSuites?.myCommunityIQ?.passpoint?.enable || this.AllFormData?.edgeSuites?.myCommunityIQ?.passpoint?.enable))) {
      this.modalRef = this.dialogService.open(waringModel, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    } else {
      this.modalRef = this.dialogService.open(this.deleteDeviceModel, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
    }


  }


  showDeleteAndDissAssConfirmMsg() {
    this.deleteAndDisassociateSystemMsg = `
      ${this.language['warning_message_subscriber_mng']}
      ${this.orgData?.factoryResetOnDelete === true ? `<br/>${this.language['warning_message_system1']}` : ''}
      <br/><br/>${this.language['sys_del']}
    `
    this.showDeleteBtn = false;
  }

  showDissAssConfirmMsg() {
    this.disassociateSystemMsg = `Warning:
    ${this.language['system_Del_assoc']}
  <br/>

   ${this.language['Do you want to proceed with the dissociate device?']}`;

    this.showDeleteBtn = false;
  }


  deleteAndDisassSystem() {
    this.modalLoader = true;
    let system = this.deleteSystemId.trim();
    for (var i = 0; i < this.deviceinform?.length; i++) {
      if ((this.deviceinform[i]?.deviceId.toUpperCase() === system.toUpperCase()) || (this.deviceinform[i]?.registrationId === system)) {
        this.registerID= this.deviceinform[i]?.serialNumber}}
    if (this.deletesystemOpmode ==='ONT' || this.deletesystemOpmode ==='ONT/RG') {
      this.deleteSystemSubs = this.systemService.DeleteONT(this.registerID?this.registerID:system).subscribe((res: any) => {
        setTimeout(() => {
            this.disassSystem(true);
        }, 1500);
        this.showwarning = false;
      this.isModalError = false;
      this.deltedevice = true;
      this.modalLoader = false;
      this.Out_Default_Data.emit({
        system: system,
        device: {},
        provision: {}
      });
      this.closeAllModal();
     
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.modalLoader = false;
      })
    } 
    if(this.deletesystemOpmode !=='ONT'){
      this.deleteSystemSubs = this.service.deleteAndDisassociatedDevice(this.ORG_ID, system).subscribe((res: any) => {
        this.showwarning = false;
      this.isModalError = false;
      this.deltedevice = true;
      this.modalLoader = false;
      this.Out_Default_Data.emit({
        system: system,
        device: {},
        provision: {}
      });
      this.closeAllModal();
      // Rerender System Page
      this.showSuccessMessage(this.language['The system has been deleted successfully']);
      this.getAllSubsServicesData();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.modalLoader = false;
      })
    }
    this.closeAllModal();
  }

  disassSystem(value?) {
    this.modalLoader = true;
    let system = this.deleteSystemId.trim();
    let subId = this.subscriberData._id;
    if (!subId && !system) {
      return;
    }
    this.disassociateSystemSubs = this.systemService.disassociateDevice(subId, system).subscribe((res: any) => {
      this.success = true;
      this.showwarning = false;
      this.isModalError = false;
      this.modalLoader = false;
      this.Out_Default_Data.emit({
        system: system,
        device: {},
        provision: {}
      });
      this.closeAllModal();
      if (value) {
        this.showSuccessMessage(this.language['The system has been deleted successfully']);
      } else {
        this.showSuccessMessage(this.language['System disassociated from subscriber successfully']);
      }
      // Rerender System Page
      this.getAllSubsServicesData();

    }, (err: HttpErrorResponse) => {
      this.modalLoader = false;
      this.pageErrorHandle(err, 'isModalError');
    })

  }

  closeDeleteModal() {
    this.closeAllModal();
    this.deleteAndDisassociateSystemMsg = '';
    this.disassociateSystemMsg = '';
  }

  closeAllModal() {
    this.dialogService.dismissAll();
  }

  isDeleteAndDisAss: boolean = false;
  getDeleteOption(event) {
    if (event.target.value === 'delete') {
      this.isDeleteAndDisAss = true
    } else {
      this.isDeleteAndDisAss = false
    }
  }

  getDeleteAndFactoryResetData() {
    this.deleteFactoryResetSub = this.service.getDeleteAndFactoryreset(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
    })
  }

  //Get SUbscriber Device lists
  getAllSubsServicesData() {
    this.systemsListLoading = true;
    this.allSubsServicesDataSubs = this.systemService.getDetailedSubscriberServices(this.subscriberData._id).subscribe((res: any) => {
      if (res && res.devices && res.devices.length) {
        this.devices = res.devices;
        let devices = [];
        res.devices.forEach(el => {
          devices.push({
            deviceId: el,
            showAdvanced: false,
            saved: true
          })
        });
        this.In_Systems_Data = devices;
      } else {
        this.In_Systems_Data = [];
      }

      setTimeout(() => {
        this.systemDataAvail = true;
        this.reloadSystemsPage();
        this.systemsListLoading = false;
      }, 100);


    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;

      this.In_Systems_Data = [];
      setTimeout(() => {
        this.systemDataAvail = true;
        this.reloadSystemsPage();
        this.systemsListLoading = false;
      }, 100);
    })
  }

  reloadSystemsPage() {
    this.loading = true;
    this.systemsListForm = new FormGroup({
      systems: new FormArray([])
    });
    this.systemList = this.systemsListForm.get('systems') as FormArray;
    if (!this.In_Systems_Data.length) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
    this.renderSystemsForm();
  }


  showSuccessMessage(msg: string, type?) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 2500);
  }


  removeSpaces(str) {
    str = str ? str : '';
    return str.replace(/\s/g, '');
  }

  clsAlphaNoOnly(e) {
    var regex = new RegExp("^[a-zA-Z0-9:-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }


}
