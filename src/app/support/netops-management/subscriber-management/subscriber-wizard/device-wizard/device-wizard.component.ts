import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { DEVICE_MANAGE_MODEL_COLLECTIONS, DEVICE_MODAM_MODEL_COLLECTIONS, DEVICE_MODELS_COLLECTIONS, DEVICE_RG_MODEL_COLLECTIONS, DEVICE_STATIC_GROUP_DATA, DEVICE_WEP_MODEL_COLLECTIONS, SubscriberManagement } from '../../subscriber.constants';
import { ISubscriberAddDeviceModel } from '../../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';
import { AnalysisErrorType } from 'aws-sdk/clients/quicksight';
import { DataServiceService } from 'src/app/support/data.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient } from '@angular/common/http';
import { ManagementService } from '../../service/management.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { DataTableDirective } from 'angular-datatables';
import { SearchListModel } from 'src/app/support/shared/models/search-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-device-wizard',
  templateUrl: './device-wizard.component.html',
  styleUrls: ['./device-wizard.component.scss']
})
export class DeviceWizardComponent implements OnInit, OnDestroy {
  showMode = false;
  @Output() onValidateExistingDevice = new EventEmitter<string>();
  @Output() changedOpMode = new EventEmitter<string>();
  @Output() tabChange = new EventEmitter<number>();

  @Output() wifiSsidMngrStngs = new EventEmitter();
  @Output() bSmbModeEmit = new EventEmitter();
  isModalError: boolean = false;
  modalWarningMessage: any = '';
  modalLoader = false;
  searchText: string = "";
  name;
  macAddressLength: number = 10;
  isRgBtnShow: boolean = false;
  showError1: boolean;
  isWapBtnShow: boolean = false;
  isWapIGMPBtnShow: boolean = false;
  hasWriteAccessForDevice: boolean = false;
  showResult = false;
  isMangeBtnShow: boolean = false;
  count: number;
  isModemBtnShow: boolean = false;
  isONT: boolean = false;
  //isStaticGroup: string = 'No';
  orgId: string;
  isStaticGroup = false;
  selectedModel: string;
  deviceMode: string = 'RG';
  regId: string;
  _addDeviceObj: ISubscriberAddDeviceModel;
  _staticGroupList: any = [];
  modelList: Array<any> = DEVICE_MODELS_COLLECTIONS;
  language: any;
  filterCount: number;
  showFilterCount: boolean = false;
  editDeviceObj: any = {};
  languageSubject;
  wapModeWarning: boolean = false;
  deviceInfo: any;
  isLan5Support:boolean = false;
  readonly rgBtnArray: Array<any> = DEVICE_RG_MODEL_COLLECTIONS;
  readonly wapBtnArray: Array<string> = DEVICE_WEP_MODEL_COLLECTIONS
  readonly manageBtnArray: Array<string> = DEVICE_MANAGE_MODEL_COLLECTIONS;
  readonly modemBtnArray: Array<string> = DEVICE_MODAM_MODEL_COLLECTIONS;
  @Input() editMode;
  @Input() checkDeviceDiscovery;
  @Input() dataObj;
  @Input() bSmbMode;
  replaceCheck: any;
  serialNumber: any;
  successInfo: any;
  @Input() set _staticGrpError(value) {
    this.staticGrpError = value;
  };
  staticGrpError;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  opModeWritable: any = [];
  undiscoveredDevice: any = 0;
  hideRadioButton: boolean;
  @ViewChild('replaceConfirm', { static: true }) private replaceConfirm: TemplateRef<any>;

  @Input()
  set addDeviceObj(value: ISubscriberAddDeviceModel) {
    this._addDeviceObj = value;
    /**
     * fix https://calix.atlassian.net/browse/CCL-27725
     */
    //this.onModeRadioBtnDisplay(value.device.selectedModel);


    if (value && value?.device && value?.device?.isStaticGroup === "Yes") {
      this.isStaticGroup = true;
    }
    this.undiscoveredDevice = (history?.state?.subscriberData?.devices || []).filter(obj => [(obj.deviceId || '').toLowerCase(), (obj.serialNumber || '').toLowerCase()].includes(value?.device?.regId?.toLowerCase()) && !obj._id).length;
    console.log('56', history?.state);
    if (history?.state?.editDeviceObj?.opModeWithOnt == 'ONT') {
      this.isONT = true;
    } else {
      this.isONT = false;
    }
    console.log(value);
    this.getDeviceInfo();
  }
  get addDeviceObj(): ISubscriberAddDeviceModel {
    return this._addDeviceObj;
  }
  @Input()
  set staticGroupList(value: any) {
    this._staticGroupList = [];
    if (value && value.length > 0) {
      this._staticGroupList = value.filter(device => {
        return (device.type === 'static');
      });
      // if(this.addDeviceObj.device.selectedStaticGroup.length === 0) {
      //   this._staticGroupList.forEach( group => {
      //     if(this.addDeviceObj.configurationObj.selectedStaticGroup.indexOf(group._id) !== -1 && group.memberInfo) {
      //       this.addDeviceObj.device.selectedStaticGroup.push(group._id);
      //     }
      //   });
      // }
    }

  }
  get staticGroupList(): any {
    return this._staticGroupList;
  }


  @Input() deviceModels: any;
  @Input() isProvision: any;

  ngOnChanges(changes: SimpleChanges) {
    let data = changes['addDeviceObj'];
    let devicediscovered = changes['checkDeviceDiscovery'];
    if (changes['checkDeviceDiscovery'] && changes['checkDeviceDiscovery'].currentValue) {
      this.getFeatureProperties(this.addDeviceObj?.device?.selectedModel, true, null, this.addDeviceObj?.device?.regId)
    }
    if (changes['addDeviceObj'] && changes['addDeviceObj'].currentValue) {
      if (changes['addDeviceObj'].currentValue.device && changes['addDeviceObj'].currentValue?.device?.selectedModel) {
        this.addDeviceObj.device.selectedModel = changes['addDeviceObj'].currentValue?.device?.selectedModel;
        this.showMode = true;
      }
    }
    if (this.addDeviceObj) {
      if (this.addDeviceObj.device) {
        if (this.addDeviceObj.device.deviceMode == "WAP-IGMP") {
          this.changedOpMode.emit("WAP-IGMP");
          //this.addDeviceObj.device.deviceMode = this.addDeviceObj?.device?.deviceMode ? this.addDeviceObj.device.deviceMode.split("-")[0] : '';
        } else {
          this.changedOpMode.emit(null);
        }
      }
    }
  }


  constructor(private translateService: TranslateService, private service: DataServiceService,
    private ssoService: SsoAuthService, private http: HttpClient,
    private managementService: ManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private foundationService: FoundationManageService,
    private dialogService: NgbModal,
  ) {
    this.editDeviceObj = history?.state?.editDeviceObj;
    this.orgId = this.ssoService.getOrgId();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    if (this.getScopes()) return;
    if (this.hasWriteAccessForDevice) this.getDeviceModels();
    $("#search").val("  ");

    $(".asso-search-dropdown").hide();

    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || history?.state?.searchText || history?.state?.subscriberId;
      if (this.searchText || this.searchText == "") {
        setTimeout(() => { this.redraw() }, 1000)
      }
    });

  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  onModelChange(event): void {
    this.wapModeWarning = false;
    if (event) {
      this.addDeviceObj.showModeErrorMsg = false;
      this.addDeviceObj.device.deviceMode = undefined;
      //this.onModeRadioBtnDisplay(event, true);
      this.getFeatureProperties(this.addDeviceObj?.device?.selectedModel, true);


    } else {
      this.isRgBtnShow = false;
      this.isMangeBtnShow = false;
      this.isWapBtnShow = false;
      this.isWapIGMPBtnShow = false;
    }
  }

  handleModeChange(event) {
    this.wapModeWarning = false;
    this.addDeviceObj.showModelErrorMsg = false;

    if (history?.state?.editDeviceObj?.opModeWithOnt == 'ONT') {
      this.addDeviceObj.device.deviceMode = 'RG';
    }
    if (event?.target?.value === 'Managed ONT' || event === 'Managed ONT') {
      this.wapModeWarning = false;
      this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL, SubscriberManagement.SETTINGS_LABEL];
      this.addDeviceObj.settings = {
        "isPowerSaving": true,
        "lanPortOne": {
          "adminState": "Enable",
          "powerSaving": true,
          "speed": "Auto",
          "duplex": "Auto",
          "DHCPLeaseLimit": 0
        },
        "lanPortTwo": {
          "adminState": "Enable",
          "powerSaving": true,
          "speed": "Auto",
          "duplex": "Auto",
          "DHCPLeaseLimit": 0
        },
        "lanPortThree": {
          "adminState": "Enable",
          "powerSaving": true,
          "speed": "Auto",
          "duplex": "Auto",
          "DHCPLeaseLimit": 0
        },
        "lanPortFour": {
          "adminState": "Enable",
          "powerSaving": true,
          "speed": "Auto",
          "duplex": "Auto",
          "DHCPLeaseLimit": 0
        }
      };
      if(this.isLan5Support){
        this.addDeviceObj.settings["lanPortFive"] = {
          "adminState": "Enable",
          "powerSaving": true,
          "speed": "Auto",
          "duplex": "Auto",
          "DHCPLeaseLimit": 0
        }
      }
      this.changedOpMode.emit("Managed ONT");
    } else {
      if(this.addDeviceObj.settings?.lanPortFive){
        delete this.addDeviceObj.settings.lanPortFive;
      }
      // this.wapModeWarning = (event?.target?.value === 'WAP' || event === 'WAP');
      if (event?.target?.value === 'WAP') {
        this.wapModeWarning = true;
        this.changedOpMode.emit("WAP");
      } 
      if (event?.target?.value === 'WAP-IGMP') {
        this.wapModeWarning = true;
        this.changedOpMode.emit("WAP-IGMP");
      }
      else if (event === 'WAP') {
        this.wapModeWarning = false;
      }
      else if (event === 'RG') {
        this.wapModeWarning = false;
      }
      if (this.addDeviceObj.addDeviceTab.length > 2) {
        this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL];
      }
      if (event?.target?.value === 'RG' || event === 'RG') {
        this.wapModeWarning = false;
        this.changedOpMode.emit("RG");
      }

    }
  }

  /**
     * fix https://calix.atlassian.net/browse/CCL-27725
     */

  // onModeRadioBtnDisplay(selectedModel: string, eventChange = false) {
  //   this.addDeviceObj.device.deviceMode = eventChange ? undefined : this.addDeviceObj.device.deviceMode;
  //   this.isRgBtnShow = this.rgBtnArray.indexOf(selectedModel) !== -1;
  //   this.isWapBtnShow = this.wapBtnArray.indexOf(selectedModel) !== -1;
  //   this.isMangeBtnShow = this.manageBtnArray.indexOf(selectedModel) !== -1;
  //   this.isModemBtnShow = this.modemBtnArray.indexOf(selectedModel) !== -1;
  //   if (this.isRgBtnShow) {
  //     this.addDeviceObj.device.deviceMode = !this.addDeviceObj.device.deviceMode ? 'RG' : this.addDeviceObj.device.deviceMode;
  //     if (this.addDeviceObj.device.deviceMode === 'Managed ONT') {
  //       this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL, SubscriberManagement.SETTINGS_LABEL];
  //     } else {
  //       if (this.addDeviceObj.addDeviceTab.length > 2) {
  //         this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL];
  //       }
  //     }
  //   }
  //   if (this.addDeviceObj.device.deviceMode !== 'RG') {
  //     this.addDeviceObj.device.deviceMode = this.isWapBtnShow ? 'WAP' : this.isModemBtnShow ? 'Modem' : this.isMangeBtnShow ? 'Managed ONT' : 'RG';
  //   }

  // }

  onModeRadioBtnDisplayNew(opmodes, selectedModel, eventChange = false, deviceNotFound = false) {
    this.error = false;
    this.onModelChange(false);
    this.addDeviceObj.device.deviceMode = eventChange ? undefined : this.addDeviceObj.device.deviceMode;
    this.reassignMode(opmodes);
    this.isRgBtnShow = opmodes['RG'] ? true : false;
    this.isWapBtnShow = (opmodes['WAP']) ? true : false;
    //this.isWapBtnShow = (opmodes['WAP'] || opmodes['WAP-IGMP']) ? true : false;
    this.isWapIGMPBtnShow = (opmodes['WAP-IGMP']) ? true : false;
    this.isMangeBtnShow = opmodes['Managed ONT'] ? true : false;
    this.isModemBtnShow = (opmodes['Modem'] || this.modemBtnArray.indexOf(selectedModel) !== -1);
    if (this.isRgBtnShow) {
      this.addDeviceObj.device.deviceMode = !this.addDeviceObj.device.deviceMode ? 'RG' : this.addDeviceObj.device.deviceMode;
      if (this.addDeviceObj.device.deviceMode == "RG") this.changedOpMode.emit("RG");
      if (this.addDeviceObj.device.deviceMode === 'Managed ONT') {
        this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL, SubscriberManagement.SETTINGS_LABEL];
      } else {
        if (this.addDeviceObj.addDeviceTab.length > 2) {
          this.addDeviceObj.addDeviceTab = [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL];
        }
      }
    }
    /* if (this.addDeviceObj.device.deviceMode !== 'RG') {
      this.addDeviceObj.device.deviceMode = this.isWapBtnShow ? 'WAP' : this.isModemBtnShow ? 'Modem' : this.isMangeBtnShow ? 'Managed ONT' : 'RG';
    } */

    if (!this.addDeviceObj.device.deviceMode && selectedModel && opmodes['WAP'] && this.isWapBtnShow) {
      this.addDeviceObj.device.deviceMode = 'WAP';
    }
    if (!this.addDeviceObj.device.deviceMode && selectedModel && opmodes['Modem'] && this.isModemBtnShow) {
      this.addDeviceObj.device.deviceMode = 'Modem';
    }
    if (history?.state?.editDeviceObj?.opModeWithOnt == 'ONT') {
      this.addDeviceObj.device.deviceMode = '';
    }

    if (history?.state?.editDeviceObj?.subscriberId != "") {
      this.addDeviceObj.device.subscriberId = history?.state?.editDeviceObj?.subscriberId ? history?.state?.editDeviceObj?.subscriberId : '';
    }

    if (history?.state?.subscriberData?.name != "") {
      this.name = history?.state?.subscriberData?.name ? history?.state?.subscriberData?.name : '';
    }


    let showWarningMessage = true;
    Object.keys(opmodes).forEach(key => {
      if (this.addDeviceObj.device.deviceMode == key) {
        showWarningMessage = false;
      }
    })

    //CCL-37251 fix
    if (showWarningMessage && this.addDeviceObj?.device?.deviceMode && (this.addDeviceObj?.device?.deviceMode == 'WAP' || this.addDeviceObj?.device?.deviceMode == 'WAP-IGMP')) {
      if (this.addDeviceObj?.device?.deviceMode == 'WAP' && opmodes['WAP-IGMP'] && !opmodes['WAP']) {
        this.addDeviceObj.device.deviceMode = 'WAP-IGMP';
        showWarningMessage = false;
        this.changedOpMode.emit("WAP-IGMP");
      } else if (this.addDeviceObj?.device?.deviceMode == 'WAP-IGMP' && opmodes['WAP'] && !opmodes['WAP-IGMP']) {
        this.addDeviceObj.device.deviceMode = 'WAP';
        showWarningMessage = false;
        this.changedOpMode.emit("WAP");
      }
    }
    this.error = false;
    if (showWarningMessage && this.addDeviceObj.device.deviceMode && !deviceNotFound) {
      this.error = true;
      this.errorInfo = "Please select the different Mode as Router doesn't support " + this.addDeviceObj.device.deviceMode;
    }
  }


  onValidateExisitingDevice() {
    let oldRegId = this.addDeviceObj.device.regId;
    this.addDeviceObj.device.regId = this.regId
    this.regId = this.addDeviceObj.device.regId ? this.addDeviceObj.device.regId.trim() : '';
    this.regId = this.addDeviceObj.device.regId.replace(/[^0-9A-Za-z:\-]/g, '').replace(/(\..?)\../g, '$1');
    this.onValidateExistingDevice.emit(this.addDeviceObj.device.regId.trim());
    if (this.addDeviceObj.isNewRecord && this.addDeviceObj.device.regId !== oldRegId) {
      this.wapModeWarning = false;
      this.addDeviceObj.device.selectedModel = '';
      this.addDeviceObj.device.isDisableModel = false;
      this.addDeviceObj.device.deviceMode = '';
      this.addDeviceObj.device.selectedStaticGroup = [];
      this.addDeviceObj.device.isStaticGroup = 'No'
    }
  }

  error = false;
  errorInfo = '';
  checkIsStaticGroup() {
    console.log(this.addDeviceObj);
    this.closeAlert();
    if (this.isStaticGroup && this.addDeviceObj?.device.selectedStaticGroup.length > 0 && this.addDeviceObj?.device.isStaticGroup === 'No') {
      this.errorInfo = 'Static Group Memberships will be removed.';
      this.error = true;
    }
  }

  closeAlert() {
    this.error = false;
    this.errorInfo = '';
  }

  modelNameReadOnly = false;
  loader = false;
  getDeviceInfo() {

    this.modelNameReadOnly = false;
    this.regId = this.addDeviceObj?.device?.regId
    if (this.regId?.trim()) {
      this.loader = true;

      this.service.getDeviceDetails(this.orgId, this.regId).subscribe((res: any) => {
        // this.service.getDeviceInfo(this.regId).subscribe((res: any) => {
        //console.log(res);
        this.loader = false;
        this.deviceInfo = res ? res : {};
        if (res) {

          if (res.opMode === 'WAP') {
            this.isRgBtnShow = false;
            this.isWapBtnShow = true;
            this.isWapIGMPBtnShow = false;
            this.isMangeBtnShow = false;
            this.isModemBtnShow = false;
          }

          if (res.opMode === 'WAP-IGMP') {
            this.isRgBtnShow = false;
            this.isWapBtnShow = false;
            this.isWapIGMPBtnShow = true;
            this.isMangeBtnShow = false;
            this.isModemBtnShow = false;
          }

          if (res.bSmbMode) {
            this.bSmbMode = true;
            this.bSmbModeEmit.emit(true);
          };

          if (res.modelName) {
            this.addDeviceObj.device.selectedModel = res.modelName;
            this.addDeviceObj.device.manufacturer = res.manufacturer;
            this.addDeviceObj.device.isDisableModel = true;
            this.modelNameReadOnly = true;
          }



          /**
           * remove CCL-25830
           */
          // if (res.opMode) {
          //   this.addDeviceObj.device.deviceMode = res.opMode;
          // }
          // if (!this.addDeviceObj?.device?.selectedModel) {
          //   this.deviceMode = res.opMode;
          //   this.modelNumberReadOnly = true;
          // }


          if (this.addDeviceObj?.device.selectedModel) {

            let params = {
              // orgId: this.ssoService.getOrgId(),
              serialNumber: res.serialNumber ? encodeURIComponent(res.serialNumber) : undefined,
              //modelName: encodeURIComponent(this.addDeviceObj.device.selectedModel),
              //wanAccessType: res['wanAccessType'],
              //softwareVersion: res['softwareVersion']
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

            this.getFeatureProperties(this.addDeviceObj.device.selectedModel, false, query);

            if (this.isProvision) {
              // this.isProvision = true
              this.tabChange.emit(1)
            }

          }


        } else {
          this.undiscoveredDevice = true;
          if (this.addDeviceObj.device.selectedModel) {
            this.getFeatureProperties(this.addDeviceObj.device.selectedModel, false);
          }
        }

        this.managementService.setDiscoveredDeviceInfo(res || {});

      }, error => {
        this.loader = false;
        this.deviceInfo = {};
        if (this.addDeviceObj.device.selectedModel) {
          this.getFeatureProperties(this.addDeviceObj.device.selectedModel, false);
        }

        console.log(error);
        this.managementService.setDiscoveredDeviceInfo({});
      })
    }

  }

  replaceDeviceBtn = false;
  replaceDevice(subscriberId, oldDeviceId) {
    if (!this.replaceDeviceId.trim()) {
      this.pageModalErrorHandle(this.language['Please enter Registered ID/FSAN/MAC Address /SN']);
      return;
    }
    //this.isReplaceModelNumberReadonly = false;
    this.replaceDeviceBtn = true;
    this.modalLoader = true;
    const newDeviceId = this.replaceDeviceId.trim();


    this.doPerformReplaceDevice(this.addDeviceObj.device.subscriberId, oldDeviceId, newDeviceId);
  }

  doPerformReplaceDevice(subscriberId, oldDeviceId, newDeviceId, skipSSID?) {
    let system = {
      "oldSystemId": oldDeviceId,
      "newSystemId": newDeviceId
    }
    this.service.performSearch(this.orgId, newDeviceId, 1, 1).subscribe(
      (res: any) => {
        if (res?.records && res.records[0]?.devices && res.records[0]?.subscriberId && res.records[0]?.devices?.deviceId == newDeviceId) {
          this.modalLoader = false;
          this.replaceDeviceBtn = false;
          this.pageModalErrorHandle(this.language['The new device selected is already associated with a different subscriber.']);
          return;
        } else {
          /**
           * to fix the CCL-27011, change new device FSAN to Uppercase
           */
          let params = {
            orgId: this.orgId,
            newDeviceId: (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(newDeviceId) ? newDeviceId : newDeviceId.toUpperCase(),
            modelName: this.replaceModelNumber,
            opMode: this.deviceMode,
            type: (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(newDeviceId) ? 'MAC Address' : 'FSAN'
          };
          this.foundationService.updateNewSystem(this.orgId, system, skipSSID).subscribe(
            (res) => {
              this.regId = system.newSystemId
              this.addDeviceObj.device.regId = this.regId
              this.editDeviceObj.deviceId = this.regId;
              this.successInfo = 'Old system replaced by New system successfully';
              setTimeout(() => {
                this.modalLoader = false;
                this.replaceDeviceBtn = false;
                //  newSystemId = system.newSystemId
                $(document.elementFromPoint(0, 0)).trigger('click');
                (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
              }, 3000);
            },
            (err) => {
              this.modalLoader = false;
              this.replaceDeviceBtn = false;
              if (err.status === 400 && [err["errorCode"], err?.error?.errorCode].includes("FAILED_RELOAD_SSID")) {
                this.dialogService.open(this.replaceConfirm, { windowClass: 'custom-warning-modal clx-custom-modal', size: 'lg', centered: true });
              } else {
                this.pageModalErrorHandle(err);
              }
            }
          );
          //this.modalLoader = false;

        }
      },
      err => {
        this.replaceDeviceBtn = false;
        this.modalLoader = false;
        this.pageModalErrorHandle(err);
      }
    );
  }
  replaceDeviceId = '';
  replaceModelNumber = '';

  isReplaceModelNumberReadonly = false;
  cloneSubscriberData: any;
  showReplaceModelNumber = false;

  assignDeviceReplace(deviceId, subscriberId, device, data?: any) {
    this.isModalError = false;
    this.modalWarningMessage = '';
    this.replaceModelNumber = '';
    this.deviceMode = '';
    this.replaceDeviceId = '';
    this.isReplaceModelNumberReadonly = false;
    this.showReplaceModelNumber = false;
    $('.replaceDeviceField').val('');
    this.deviceInfo.replaceDeviceId = deviceId;
    this.addDeviceObj.device.subscriberId = subscriberId;
    this.cloneSubscriberData = data;
  }
  pageModalErrorHandle(err: any, showError = true) {
    if (err.status === 401) {
      this.modalWarningMessage = this.language['Access Denied'];
    } else if ((!err.status || !err.error) && typeof err == 'string') {
      this.modalWarningMessage = err;
    } else {
      this.modalWarningMessage = this.ssoService.pageErrorHandle(err);
    }
    if (showError) this.isModalError = true;
    return this.modalWarningMessage;
  }


  getDeviceModels() {
    let params = { orgId: this.ssoService.getOrgId() }
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${JSON.stringify(params)}`).subscribe((json: any) => {

      let obj = {};
      if (json) {
        json.forEach((element: any) => {
          if (element && element.modelName) {
            obj[element['modelName'].trim()] = true;
          }
        });

        this.deviceModels = Object.keys(obj);
        this.managementService.setDeviceModels(this.ssoService.getOrgId(), this.deviceModels);
      }
    }, (err: any) => {
      this.pageModalErrorHandle(err);
    });
  }

  isValidOntModel(device) {
    if (device.opModeWithOnt == "ONT") {
      return this.deviceModels.filter(name => name == device.modelName).length == 0;
    }
    return false;
  }



  search(term: string) {
    if (term.length < 2) this.keupEnter();
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      this.service.performSearch(this.orgId, term, 0, 0).subscribe((res: SearchListModel) => {
        this.filterCount = res.metadata.totalHits;
        this.showResult = true;
        this.showFilterCount = true;
        dtInstance?.search(term).draw();
      }, error => {
        this.loader = false;
      })
    });

  }
  keupEnter() {

    this.searchText = this.searchText ? this.searchText : '';
    if (this.searchText.length == 0) {
      this.showFilterCount = false;
      this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
        this.service.performSearch(this.orgId, this.searchText, 0, 0).subscribe((res: SearchListModel) => {
          this.filterCount = res.metadata.totalHits;
          this.count = res.metadata.totalHits;
          this.showResult = true;
          dtInstance?.draw();
        }, error => {
          this.loader = false;
        }
        )
      });
    }

  }
  getScopes() {
    let isntSubscriber = false;
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      const scopeCheck: any = {};
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.mgmt') !== -1) {
            scopeCheck.showSubscriberMngmnt = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.operations') !== -1) {
            scopeCheck.showOperations = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.reports') !== -1) {
            scopeCheck.showReports = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.config') !== -1) {
            scopeCheck.showConfiguration = true;
            continue;
          }
        }
      }

      if (scopeCheck.showSubscriberMngmnt || scopeCheck.showOperations || scopeCheck.showReports || scopeCheck.showConfiguration) {
        if (scopeCheck.showSubscriberMngmnt) { }
        else if (scopeCheck.showReports) { isntSubscriber = true; this.router.navigate(["./support/netops-management/reports"]); }
        else if (scopeCheck.showOperations) { isntSubscriber = true; this.router.navigate(["./support/netops-management/operations"]); }
        else if (scopeCheck.showConfiguration) { isntSubscriber = true; this.router.navigate(["./support/netops-management/configuration"]); }
      }

      scopes['cloud.rbac.csc.netops.mgmt.subscribers'] = scopes['cloud.rbac.csc.netops.mgmt.subscribers'] ? scopes['cloud.rbac.csc.netops.mgmt.subscribers'] : [];
      scopes['cloud.rbac.csc.netops.mgmt.devices'] = scopes['cloud.rbac.csc.netops.mgmt.devices'] ? scopes['cloud.rbac.csc.netops.mgmt.devices'] : [];


      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt.devices'] && scopes['cloud.rbac.csc.netops.mgmt.devices'].indexOf('write') !== -1)) {
        this.hasWriteAccessForDevice = true;
      }

    } else {

      this.hasWriteAccessForDevice = true;

    }

    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || history?.state?.searchText || history?.state?.subscriberId;
      if (this.searchText || this.searchText == "") {
        setTimeout(() => { this.redraw() }, 1000)
      }
    });

    return isntSubscriber;
  }
  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] && myArray[i]['featureName'] === value) {
        return myArray[i];
      }
    }
    return false;
  }

  redraw() {
    if (this.searchText && this.searchText.length < 2) {
      this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance?.draw();
      });
    } else {
      this.search(this.searchText);
    }
  }


  fpLoader = false;
  getFeatureProperties(modelName: any, eventChange = false, query = "", serialNumber?) {
    this.fpLoader = true;

    if (!query) {
      query = `${this.ssoService.getOrg(this.orgId)}modelName=${encodeURIComponent(modelName)}`;
    }
    if (serialNumber) {
      query = `${this.ssoService.getOrg(this.orgId)}serialNumber=${encodeURIComponent(serialNumber)}`;
    }

    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${query}`).subscribe((json: any) => {
      console.log(json);
      // this.wapModeWarning = false;
      this.replaceCheck = json;
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
        this.wifiSsidMngrStngs.emit(obj);

        let opmodes = {};

        let opmodesObj = this.findObjByKeyValue('OpModeOptions', json.properties);
        this.opModeWritable = [];

        let opmodeData = Object.keys(opmodesObj['configuration']);
        // CCL-41475
        if (opmodeData?.length === 1) {
          this.hideRadioButton = true;
          this.handleModeChange(opmodeData[0]);
          this.addDeviceObj.device.deviceMode = (opmodeData[0])
        } else {
          this.hideRadioButton = false;
        }

        console.log(opmodesObj);
        let writableCheck, isOpmodeAvailInOptions = false;
        let opmodeAvail = this.addDeviceObj?.device?.deviceMode ? this.addDeviceObj?.device?.deviceMode : json.opMode;
        console.log(opmodeAvail, "opmodeAvail");
        if (opmodesObj && opmodesObj['configuration'] && opmodeAvail && opmodeAvail in opmodesObj['configuration']) {

          writableCheck = opmodesObj['configuration'][opmodeAvail]?.writable;
          isOpmodeAvailInOptions = true;

          if (opmodesObj['configuration'].RG?.writable != undefined && opmodesObj['configuration'].RG?.writable === writableCheck) {
            opmodes['RG'] = true;
          }

          if (opmodesObj['configuration'].WAP?.writable != undefined && opmodesObj['configuration'].WAP?.writable === writableCheck) {
            opmodes['WAP'] = true;
          }

          if (opmodesObj['configuration']['Managed ONT']?.writable != undefined && opmodesObj['configuration']['Managed ONT']?.writable === writableCheck) {
            opmodes['Managed ONT'] = true;
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

        if (json?.properties.filter(obj => obj?.featureName == "lanPort5" && obj?.supported).length > 0) {
          this.isLan5Support = true;
        }else{
          this.isLan5Support = false;
        }

        // Commented for CCL-37523
        // if (opmodesObj && opmodesObj['configuration']) {
        //   if (opmodesObj['configuration'].RG) {
        //     opmodes['RG'] = true;
        //     if (!opmodesObj['configuration'].RG?.writable) this.opModeWritable.push('RG');
        //   }

        //   if (opmodesObj['configuration'].WAP) {
        //     opmodes['WAP'] = true;
        //     if (!opmodesObj['configuration'].WAP?.writable) this.opModeWritable.push('WAP');
        //   }

        //   if (opmodesObj['configuration']['Managed ONT']) {
        //     opmodes['Managed ONT'] = true;
        //     if (!opmodesObj['configuration']['Managed ONT']?.writable) this.opModeWritable.push('Managed ONT');
        //   }

        //   if (opmodesObj['configuration']['WAP-IGMP']) {
        //     opmodes['WAP-IGMP'] = true;
        //     if (!opmodesObj['configuration']['WAP-IGMP']?.writable) this.opModeWritable.push('WAP-IGMP');
        //   }

        //   if (opmodesObj['configuration']['Modem']) {
        //     opmodes['Modem'] = true;
        //     if (!opmodesObj['configuration'].Modem?.writable) this.opModeWritable.push('Modem');
        //   }

        // }

        /* this.fpLoader = true;
        this.service.getDevicePR(this.ssoService.getOrgId(), this.addDeviceObj.device.regId).subscribe((res: any) => {
          this.fpLoader = false;
          this.addDeviceObj.device.deviceMode = res?.opMode || 'RG';
          this.onModeRadioBtnDisplayNew(opmodes, modelName, eventChange);
        }, err => {
          this.fpLoader = false;
        }); */
        this.onModeRadioBtnDisplayNew(opmodes, modelName, eventChange);

      }
      // let opmodeData = Object.keys( opmodesObj['configuration']);
      //   if(opmodeData?.length === 1){
      //     this.hideRadioButton=true;
      //     this.systemInfoForm.patchValue({opMode:opmodeData[0]})
      //     this.handleModeChange(opmodeData[0]);
      //     this.systemInfochange();
      //   }else{
      //     this.hideRadioButton=false;
      //   }

      this.fpLoader = false;


    }, (err: any) => {
      //this.pageErrorHandle(err);
      if (err.error?.error && err.error?.error.indexOf("Device not found") > -1) {
        this.onModeRadioBtnDisplayNew({}, modelName, false, true);
      } else {
        this.onModeRadioBtnDisplayNew({}, modelName, false);
      }

      this.fpLoader = false;
    });
  }

  reassignMode(opModes) {
    let mode = this.addDeviceObj.device.deviceMode;
    if (mode && !Object.keys(opModes).filter(obj => obj.includes(mode))) {
      this.addDeviceObj.device.deviceMode = opModes['RG '] ? 'RG' : (opModes['WAP'] ? 'WAP' : 'Managed ONT')
    }
  }

  removeTagOnBackspace(event) {
    console.log("backspace event", event)
  }
  maxLength1(event) {
    if (event.target.value.length <= 36) {
      this.showError1 = false;
    }
    else if (event.target.value.length > 36) {
      this.showError1 = true;
    }
  }
  maxLength(regId, event) {
    regId = this.addDeviceObj.device.regId

    if (event.target.value.length <= 9) {
      this.showError1 = false;
    }
    else if (event.target.value.length > 9) {
      this.showError1 = true;
    }

  }

  onPasteValidation(event: ClipboardEvent) {
    if (event.clipboardData.getData('text').length > 36) {
      this.showError1 = true;
    } else {
      this.showError1 = false;
    }
  }

  preventKeypress(event, regId) {
    if (regId?.length >= 36) {
      if (event.key !== 'Backspace') event.preventDefault();
    }
  }

  clsAlphaNoOnly(e) {

    var regex = new RegExp("^[a-zA-Z0-9:\-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  notONT1(data) {
    return data.hasOwnProperty("ont");
  }


}
