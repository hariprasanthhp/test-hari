import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { combineLatest, of, Subscriber } from 'rxjs';
import { SubscriberManagement } from '../subscriber.constants';
import { IDataServiceModel, IDeviceModel, ILanPortModel, ISettingsModel, ISubscriberAddDeviceModel, IVideoServiceModel, IVocieServiceModel, IVoiceLineServiceModel } from '../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';
import * as _ from 'lodash';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ManagementService } from '../service/management.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DataServiceService } from 'src/app/support/data.service';
import { settings } from 'cluster';
import { ProfileService } from '../../operations/services/profile.service';
import { profile } from 'console';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { DeviceGroupService } from '../../operations/services/device-group.service';
import { getSubscribeList } from 'src/app/support/shared/service/endpoints';
import { SearchListModel } from 'src/app/support/shared/models/search-list.model';
import * as $ from "jquery";
import { environment } from 'src/environments/environment';
import { SSIDNamePattern } from 'src/app/support/shared/service/utility.class';
import { catchError, map, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-subscriber-wizard',
  templateUrl: './subscriber-wizard.component.html',
  styleUrls: ['./subscriber-wizard.component.scss']
})
export class SubscriberWizardComponent implements OnInit, OnDestroy {
  deleteServicesAssociateWithSbscrbrMsg = '';
  activeTab: string = SubscriberManagement.DEVICE_LABEL;
  subscriberManagement = SubscriberManagement;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  showModeErrorMsg: boolean = false;
  showDeviceIDErrorMsg: boolean = false;
  showModelErrorMsg: boolean = false;
  addDeviceObj: ISubscriberAddDeviceModel;
  language: any;
  languageSubject;
  orgId: any = '';
  loader: boolean = false;
  subscriberInfo: any = {};
  errorMessage: string = '';
  isError: boolean = false;
  editDeviceObj: any = {};
  allDeviceGrpSubscribe: any;
  getAllProfileSubscribe: any;
  getAllDialPlanSubscribe: any;
  profileList: any = [];
  serviceProfileList: any = [];
  allProfileList: any = [];
  dialPlanList: any = [];
  listSubscribe: any;
  deviceDataList: any = [];
  pageTitle: string = 'Add Device';
  searchedMACAddress: string = '';
  searchText: string = "";
  editMode = false;
  disableFinishBtn: boolean = false
  isCMS: boolean = false;
  disableNextBtn: boolean = false;
  noServicesType: boolean;
  updatedOpmode = null;
  deviceProvRecord: any = {};
  isProvision: boolean = false;
  combineLatestPR: any;
  isPRConfiguredOutside: boolean;
  subServicesSubscription: any;
  tempWifiObj: any;
  voiceStatus: boolean = true;
  bSmbMode: boolean = false;
  staticGrpError: boolean = false;
  constructor(private translateService: TranslateService,
    private ssoService: SsoAuthService,
    private service: DataServiceService,
    private deviceService: DeviceGroupService,
    private router: Router, private http: HttpClient,
    private profileService: ProfileService,
    private managementService: ManagementService,
    private cd: ChangeDetectorRef,
    private titleService: Title
  ) {
    if (history?.state?.subscriberData) this.managementService.setSelectedDeviceInfo(history);

    let selectedDeviceInfo = JSON.parse(this.managementService.getSelectedDeviceInfo());
    if (!history?.state?.subscriberData && selectedDeviceInfo?.subscriberData) {

      if (!selectedDeviceInfo?.editDeviceObj && selectedDeviceInfo?.subscriberData) {
        this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: selectedDeviceInfo });
      }

      if (selectedDeviceInfo?.subscriberData && selectedDeviceInfo?.editDeviceObj) {
        this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: selectedDeviceInfo });
        let DeviceId = sessionStorage.getItem('selectedSubDeviceId');
        let opModeWithOnt = sessionStorage.getItem('selectedSubDeviceopModeWithOnt');
        this.editDevice(selectedDeviceInfo.subscriberData, DeviceId, opModeWithOnt ? opModeWithOnt : '');
      }
    }
    this.deviceModels = this.managementService.getDeviceModels(this.ssoService.getOrgId());
    this.getDeviceModels();
  }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Subscriber_Management']} - ${this.language["NetOps"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);


    });
    this.titleService.setTitle(`${this.language['Subscriber_Management']} - ${this.language["NetOps"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);
    this.subscriberInfo = history?.state?.subscriberData;
    this.editDeviceObj = history?.state?.editDeviceObj;
    this.pageTitle = history?.state?.editDeviceObj ? this.language['Edit Device'] : this.language['Add_Device'];
    this.editMode = history?.state?.editDeviceObj ? true : false;
    this.searchText = history?.state?.searchText;
    this.orgId = this.ssoService.getOrgId();
    this.initAddDeviceOject(undefined);
    if (history?.state?.isProvision) {
      this.isProvision = history?.state?.isProvision;
    }
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.getDeviceData();
      this.getProfileData();
      this.onTabChange(0);
      this.getDialPlanList();
      this.getStaticGroupMemebers();
      if (history?.state?.isUnassociateSubscriber && history?.state?.subscriberData?.devices[0]) {
        this.getDeviceDetail(history?.state?.subscriberData?.devices[0].deviceId);
      }

      if (this.editDeviceObj && this.editDeviceObj.rgConfigMode && this.editDeviceObj.rgConfigMode == "Native") {
        this.isCMS = true;
      }
      if (this.editDeviceObj) {
        if (this.editDeviceObj?.wifi && this.editDeviceObj?.wifi["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]) {
          this.editDeviceObj.wifi["UNIFIED_PRIMARY_SSID"] = this.editDeviceObj.wifi["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"];
        }

        // this.tempWifiObj = JSON.parse(JSON.stringify(this.editDeviceObj.wifi));
      }


      this.deviceProvRecord = this.editDeviceObj ? { ...this.editDeviceObj } : {};
      //if (this.editMode && this.editDeviceObj) this.checkIfDeviceConfiguredOutside(this.editDeviceObj);
    }, 3000);
    this.getSubscriberServices();
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.combineLatestPRSubs) this.combineLatestPRSubs.unsubscribe();
    if (this.subServicesSubscription) this.subServicesSubscription.unsubscribe();
    sessionStorage.removeItem('selectedSubHistInfo');
    sessionStorage.removeItem('selectedSubDeviceId');
    sessionStorage.removeItem('selectedSubDeviceopModeWithOnt');
  }
  getProfileData() {
    if (this.getAllProfileSubscribe) this.getAllProfileSubscribe.unsubscribe();
    this.loader = true;
    this.getAllProfileSubscribe = this.profileService.getProfileList(this.orgId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.buildeServiceProfileList(res);
        this.buildBWProfile(res);
        this.allProfileList = res;
        if (!history.state.isNewRecord && this.editDeviceObj) {
          this.patchVlaue(this.editDeviceObj.deviceId);
        }
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    }, () => {
    });
  }

  getDeviceData() {
    if (this.allDeviceGrpSubscribe) this.allDeviceGrpSubscribe.unsubscribe();
    this.loader = true;
    this.allDeviceGrpSubscribe = this.deviceService.getDeviceGoupCount(this.orgId).subscribe((res: any) => {
      this.listSubscribe = this.deviceService.getDeviceGoupList(this.ssoService.getOrgId(), res.count).subscribe((data: any) => {
        this.loader = false;
        if (data) {
          this.deviceDataList = data;
        }
      }, (err: any) => {
        this.pageErrorHandle(err);
      })

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }


  getDialPlanList() {
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
    this.loader = true;
    this.getAllDialPlanSubscribe = this.managementService.getDialPlanList(this.orgId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.addDeviceObj.configurationObj['serviceDialPlan'] = res;
        this.dialPlanList = res;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    }, () => {
    });
  }

  onValidateExistingDevice(deviceID) {
    this.isError = false;
    const MACADDRESS = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;
    if (deviceID) {
      this.loader = true;
      if (MACADDRESS.test(deviceID)) {
        this.searchDeviceByMACAddressDetail(deviceID);
      } else {
        this.getDeviceDetail(deviceID)
      }
    } else {
      this.initAddDeviceOject(deviceID);
      this.buildeServiceProfileList(this.allProfileList);
      this.buildBWProfile(this.allProfileList);
      this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
    }

  }

  error = false;
  errorInfo = '';

  closeAlert() {
    this.error = false;
    this.errorInfo = '';
  }

  duplicateSbcrbrAscDevice = false;
  deviceDiscovery = null;
  getDeviceDetail(deviceID, macAddress = undefined) {
    this.duplicateSbcrbrAscDevice = false;
    this.closeAlert();
    /***
     * fix CCL-27987
     */
    //if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
    this.getPRAndFDDeviceInfo(deviceID, macAddress);
    /*
    this.managementService.getDeviceInfo(this.orgId, deviceID).subscribe(
      (res: any) => {
        this.loader = false;
        this.deviceProvRecord = {};
        if (res) {
          if (this.subscriberInfo.subscriberId && res.subscriberId && this.subscriberInfo.subscriberId == res.subscriberId) {
            if (!(typeof this.editDeviceObj === "object" && this.editDeviceObj._id) && !history.state.isUnassociateSubscriber) {
              this.error = true;
              this.errorInfo = 'Error! Subscriber already has an associated device with the same ID.';
              this.duplicateSbcrbrAscDevice = true;            //alert("duplicate");

            }

          }
          this.editDeviceObj = res;
          this.deviceProvRecord = { ...res };
          this.deviceDiscovery = true;
          if (macAddress) {
            this.patchVlaue(macAddress);
          } else {
            this.patchVlaue(deviceID);
          }
          this.buildeServiceProfileList(this.allProfileList);
          this.buildBWProfile(this.allProfileList);
          this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;

        } else {
          //this.initAddDeviceOject(deviceID);
          // this.buildeServiceProfileList(this.allProfileList);
          //this.buildBWProfile(this.allProfileList);
          this.deviceDiscovery = false;
          this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
          if (macAddress) {
            this.loadSubscriberdata(macAddress);
          } else {
            this.loadSubscriberdata(deviceID);
          }
          this.deviceProvRecord = {};
        }
      },
      (err) => { this.pageErrorHandle(err); this.deviceProvRecord = {}; }
    );

    */
  }

  combineLatestPRSubs: any;
  getPRAndFDDeviceInfo(deviceID, macAddress = undefined) {

    const requestEndpoints = [
      `${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${this.ssoService.getOrg(this.orgId)}deviceId=${deviceID}`,
      `${environment.FOUNDATION_BASE_URL}subscriber-systems?${this.ssoService.getOrg(this.orgId)}systemId=${deviceID}`,
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.managementService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatestPR = combineLatest(requests);

    // let requests = [
    //   this.managementService.getDeviceInfo(this.orgId, deviceID).pipe(take(1)),
    //   this.managementService.getedgesuiteData(this.orgId, deviceID).pipe(take(1))
    // ];
    // this.combineLatestPR = combineLatest(requests).pipe(map((reqRes: any) => {
    //   return reqRes;
    // },
    //   catchError((error: any) => {
    //     return of(error);
    //   }))
    // );
    this.combineLatestPRSubs = this.combineLatestPR.subscribe((res: any) => {

      //PR Record Operations
      if (res[0] && res[0].error == undefined && Object.keys(res[0]).length) {
        // if (this.subscriberInfo.subscriberId && res[0].subscriberId && this.subscriberInfo.subscriberId == res.subscriberId) {
        //   if (!(typeof this.editDeviceObj === "object" && this.editDeviceObj._id) && !history.state.isUnassociateSubscriber) {
        //     this.error = true;
        //     this.errorInfo = 'Error! Subscriber already has an associated device with the same ID.';
        //     this.duplicateSbcrbrAscDevice = true;            //alert("duplicate");

        //   }

        // }
        this.editDeviceObj = res[0];
        if (this.editDeviceObj) {
          if (this.editDeviceObj?.wifi && this.editDeviceObj?.wifi["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]) {
            this.editDeviceObj.wifi["UNIFIED_PRIMARY_SSID"] = this.editDeviceObj.wifi["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"];
          }

          // this.tempWifiObj = JSON.parse(JSON.stringify(this.editDeviceObj.wifi));
        }

        this.deviceProvRecord = { ...res[0] };
        this.deviceDiscovery = true;
        if (macAddress) {
          this.patchVlaue(macAddress);
        } else {
          this.patchVlaue(deviceID);
        }
        this.buildeServiceProfileList(this.allProfileList);
        this.buildBWProfile(this.allProfileList);
        this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
        //this.checkIfDeviceConfiguredOutside(res[0]);

      } else {
        //this.initAddDeviceOject(deviceID);
        // this.buildeServiceProfileList(this.allProfileList);
        //this.buildBWProfile(this.allProfileList);
        this.deviceDiscovery = false;
        this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
        if (macAddress) {
          this.loadSubscriberdata(macAddress);
        } else {
          this.loadSubscriberdata(deviceID);
        }
        this.deviceProvRecord = {};
      }



      //Foundation Systems Records Operations
      if (res[1] && res[1].error == undefined && res[1]?.subscriber && res[1]?.subscriber.name) {
        this.error = true;
        this.errorInfo = this.language.alreadySysAssociated(res[1]?.subscriber?.name);
        this.duplicateSbcrbrAscDevice = true;
      }

      setTimeout(() => {
        this.loader = false;
      }, 100)
    });
  }

  loadSubscriberdata(deviceID) {
    this.service.performSearch(this.orgId, deviceID, 1, 1).subscribe((res: SearchListModel) => {

      if (res && res.records && res.records[0]?.devices && res.records[0]?.devices[0]?.modelName) {
        let devicesObj = {};
        if (res.records[0]?.devices) {
          let devices = res.records[0]?.devices;
          devices.forEach((element: any) => {
            if (element['serialNumber']) {
              devicesObj[element['serialNumber']] = element
            }

            if (element['deviceId']) {
              devicesObj[element['deviceId']] = element
            }

            if (element['macAddress']) {
              devicesObj[element['macAddress']] = element
            }

          });

          if (devicesObj[deviceID]) {
            //to fix CCL-37524
            if (devicesObj[deviceID]?.modelName && this.deviceModels.includes(devicesObj[deviceID]?.modelName)) {
              this.addDeviceObj.device.selectedModel = devicesObj[deviceID]?.modelName;
            } else {
              this.addDeviceObj.device.selectedModel = undefined;
              /* if (devicesObj[deviceID]?.modelName) {
                this.errorMessage = `Entered System's model ${devicesObj[deviceID]?.modelName} is not present in available Models`;
                this.isError = true;
              } */
            }
            this.addDeviceObj.device.isDisableModel = true;

            if (!this.addDeviceObj.device?.deviceMode && this.addDeviceObj.device.selectedModel) {
              this.addDeviceObj.device.deviceMode = devicesObj[deviceID].deviceMode;
            }
          }


        }

        /**
         * to fix CCL-25924
         */
        // this.addDeviceObj.device.selectedModel = res.records[0]?.devices[0]?.modelName;
        // this.addDeviceObj.device.isDisableModel = true;
        this.addDeviceObj = Object.assign(this.addDeviceObj, this.addDeviceObj);
      } else {
        this.addDeviceObj.device.selectedModel = '';
        this.addDeviceObj.device.isDisableModel = false;
      }
      this.initAddDeviceOject(deviceID, this.addDeviceObj.device.selectedModel, this.addDeviceObj.device.deviceMode);
      this.buildeServiceProfileList(this.allProfileList);
      this.buildBWProfile(this.allProfileList);
      this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
    }, error => {
      this.initAddDeviceOject(deviceID, this.addDeviceObj.device.selectedModel);
      this.buildeServiceProfileList(this.allProfileList);
      this.buildBWProfile(this.allProfileList);
      this.addDeviceObj.configurationObj['serviceDialPlan'] = this.dialPlanList;
      this.loader = false;
    })
  }

  searchDeviceByMACAddressDetail(macAddress) {
    const params = new HttpParams()
      // .set("orgId", this.orgId)
      .set("filter", macAddress)
      .set("pageNumber", '1')
      .set("pageSize", '1')
    if (this.ssoService.getOrg(this.orgId)) {
      params.set("orgId", this.orgId)
    }
    this.http.get(`${environment.SUPPORT_URL}${getSubscribeList}`, { params }).subscribe((resp: SearchListModel) => {
      this.loader = false;
      if (resp && resp.records.length > 0) {
        const matchedDeviceID = resp.records[0].devices.filter(device => {
          return (device.macAddress === macAddress.toLowerCase());
        })[0]?.deviceId;
        if (matchedDeviceID) {
          this.searchedMACAddress = macAddress;
          this.getDeviceDetail(matchedDeviceID, macAddress);
        }
      }
    }), error => {
      this.pageErrorHandle(error);
    }
  }

  buildeServiceProfileList(profileLists) {
    let serviceList = [];
    profileLists.forEach(item => {
      if (item.configurations.filter(service => { return (service.category.indexOf('Service') !== -1) }).length === 1) {

        item.configurations.forEach(category => {
          if (category.category.indexOf('Service') !== -1) {
            const cateObj: any = {
              name: item.name,
              _id: item._id,
              orgId: item.orgId,
              configurations: category,
              VLAN: this.getVLANValue(category),
              Mode: category.parameterValues.Mode,
              BridgeMemberPort: this.getBridgePort(category.parameterValues),
              defaultConnectionService: category.parameterValues.defaultConnectionService !== undefined ? category.parameterValues.defaultConnectionService : false,
              IPTVSSID: category.parameterValues.EnableIPTV_SSID !== undefined ? category.parameterValues.EnableIPTV_SSID : false,
            }
            serviceList.push(cateObj);
          }
        });
        this.addDeviceObj.configurationObj['seriviceList'] = serviceList;
      }
    });
  }

  getBridgePort(parameterValues) {
    const videoServiceBridgePort = [{
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.15",
      "displayName": "5GHz IPTV SSID"
    },
    {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.1",
      "displayName": "LAN Port 1"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.2",
      "displayName": "LAN Port 2"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.3",
      "displayName": "LAN Port 3"
    }, {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.4",
      "displayName": "LAN Port 4"
    },
    //.6 added To fix CCL-36445
    {
      "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.6",
      "displayName": "5GHz IPTV SSID"
    },
    // {
    //   "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.17",
    //   "displayName": "LAN Port 1"
    //   },
    //TO fix CCL-35127
    {
      "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1",
      "displayName": "LAN Port 1"
    },
    {
      "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2",
      "displayName": "LAN Port 2"
    },
    {
      "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3",
      "displayName": "LAN Port 3"
    },
    {
      "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4",
      "displayName": "LAN Port 4"
    },
      //InternetGatewayDevice.Layer2Bridging.AvailableInterface.6
    ]
    if (parameterValues.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS) {
      return parameterValues.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS;
    }
    if (parameterValues.BridgedInterface) {
      let bridgePort = [];
      videoServiceBridgePort.forEach(item => {
        if (parameterValues.BridgedInterface.indexOf(item.value) !== -1) {
          bridgePort.push(item.displayName.replace('LAN Port ', ''));
        }
      })
      return bridgePort;
    }

    if (parameterValues.ExosBridgedInterface) {
      let bridgePort = [];
      videoServiceBridgePort.forEach(item => {
        if (parameterValues.ExosBridgedInterface.indexOf(item.value) !== -1) {
          bridgePort.push(item.displayName.replace('LAN Port ', ''));
        }
      })
      return bridgePort;
    }
  }

  getVLANValue(category) {
    if (category.parameterValues.Mode === 'ONT Full Bridge' || category.parameterValues.Mode === 'ONT Half Bridge') {
      return category.parameterValues.VLANID !== undefined ? category.parameterValues.VLANID : 0;
    } else {
      return category.parameterValues.X_000631_VlanMuxID !== undefined ? category.parameterValues.X_000631_VlanMuxID : 0;
    }
  }

  buildBWProfile(profileList) {
    const bwProfile = profileList.filter(profile => {
      return (profile.innerProfileCategory === 'Bandwidth')
    });

    if (bwProfile && bwProfile[0] && bwProfile[0]._id) {
      bwProfile.unshift({
        _id: '',
        name: ''
      });
    }

    this.addDeviceObj.configurationObj['serviceBWList'] = bwProfile;
  }
  patchVlaue(deviceID = undefined) {
    if (this.editDeviceObj) {
      this.addDeviceObj = {
        isNewRecord: false,
        addDeviceTab: [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL],
        showModeErrorMsg: false,
        showDeviceIDErrorMsg: false,
        showModelErrorMsg: false,
        configurationObj: Object.assign({ defaultLanValidation: false }, this.addDeviceObj.configurationObj),
        device: this.patchDeviceData(deviceID),
        isUnifiedPrimarySSID: false,
        toggeledUnifiedPrimarySSID: false,
        services: {
          configuredService: (this.editDeviceObj.data || this.editDeviceObj.video || this.editDeviceObj.voice) ? 'No' : 'Yes',
          dataService: (this.editDeviceObj.data) ? this.patchDataServiceData() : this.initSeriveObjects('Data'),
          videoService: (this.editDeviceObj.video) ? this.patchVideoServiceData() : this.initSeriveObjects('Video'),
          voiceService: (this.editDeviceObj.voice) ? this.patchVoiceServiceData() : this.initSeriveObjects('Voice'),
          ontDataService: (this.editDeviceObj.services) ? this.patchONTServiceData('Data Service') : [],
          ontVideoService: (this.editDeviceObj.services) ? this.patchONTServiceData('Video Service') : [],
          wifiSSID: this.editDeviceObj.wifi ? this.patchWifiData() : this.initSeriveObjects('WIFI'),
          showVideoServiceByDefault: (!history.state.isNewRecord) ? true : false,
          showDataServiceByDefault: (!history.state.isNewRecord) ? true : false,
          isCMS: this.isCMS
        },
        settings: (this.editDeviceObj.ports) ? this.pathSettingsData() : this.initSeriveObjects('Settings')
      }
      if (this.editDeviceObj.rgConfigMode) {
        this.addDeviceObj.services.configuredService = "Yes"
      }
      if (this.editMode) {
        this.tempWifiObj = JSON.parse(JSON.stringify(this.addDeviceObj.services.wifiSSID))
      }
    }
  }

  patchWifiData() {
    let allowedWifissids = ["X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_5GHZ_SSID", "X_CALIX_SXACC_GUEST_5GHZ_SSID", "X_CALIX_SXACC_PRIMARY_6GHZ_SSID", "X_CALIX_SXACC_GUEST_6GHZ_SSID", "UNIFIED_PRIMARY_SSID"];
    let allwifiObj = {};
    // this.editDeviceObj.wifi["UNIFIED_PRIMARY_SSID"] = {};
    for (let key of Object.keys(this.editDeviceObj.wifi)) {
      if (allowedWifissids.indexOf(key) === -1) {
        continue;
      }

      const wifiObject: any = {
        name: this.editDeviceObj.wifi[key].SSID,
        serviceEnabled: this.editDeviceObj.wifi[key].Enable,
        securityType: this.editDeviceObj.wifi[key].BeaconType,
        encryption: this.editDeviceObj.wifi[key].IEEE11iEncryptionModes ? this.editDeviceObj.wifi[key].IEEE11iEncryptionModes : "",
        passphrase: this.editDeviceObj.wifi[key].KeyPassphrase,
        //encryption: this.editDeviceObj.wifi[key].WPAEncryptionModes,
        broadcastEnabled: this.editDeviceObj.wifi[key].SSIDAdvertisementEnabled,
        mumimoEnabled: this.editDeviceObj.wifi[key].MUMIMOEnabled,
        enableDfsChannels: this.editDeviceObj.wifi[key].EnableDfsChannels,
        isUnifiedPrimarySSID: this.editDeviceObj.wifi[key].isUnifiedPrimarySSID
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
    // if (allwifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"]) {
    //   var _PRIMARY_5GHZ_SSID = Object.assign({}, allwifiObj["X_CALIX_SXACC_PRIMARY_5GHZ_SSID"])
    //   allwifiObj["UNIFIED_PRIMARY_SSID"] = _PRIMARY_5GHZ_SSID;
    // }


    return allwifiObj;

  }

  pathSettingsData() {
    const settingsKey: string[] = ['lanPortOne', 'lanPortTwo', 'lanPortThree', 'lanPortFour'];
    if (this.editDeviceObj.ports['eth-5']) settingsKey.push('lanPortFive');
    const patchedObj: ISettingsModel = {};
    patchedObj['isPowerSaving'] = !this.editDeviceObj.enableRgOnBattery;
    let portObj: ILanPortModel = {
      adminState: 'Enable',
      duplex: 'Auto',
      DHCPLeaseLimit: 0,
      powerSaving: true,
      speed: 'Auto'
    }
    if (this.editDeviceObj.ports) {
      settingsKey.forEach((key, index) => {
        const settingsObj = this.editDeviceObj.ports['eth-' + (index + 1)];
        if (settingsObj) {
          portObj = {
            adminState: settingsObj.Enable !== undefined ? settingsObj.Enable ? 'Enable' : 'Disable' : 'Enable',
            duplex: settingsObj.DuplexMode !== undefined ? settingsObj.DuplexMode : 'Auto',
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

  patchONTServiceData(serviceType): IDataServiceModel[] {
    const patchObj = [];
    if (this.editDeviceObj.services) {
      this.editDeviceObj.services.forEach(service => {
        if (service.category === serviceType) {
          const obj: IDataServiceModel = {
            PPPoEPwd: service?.pppoe?.Password ? service.pppoe.Password : "",
            PPPoEUsername: service?.pppoe?.Username ? service.pppoe.Username : "",
            isServiceEnabled: service.Enable ? true : false,
            isBWOverRide: (service.Overrides && service.Overrides.BwProfile) ? true : false,
            isVLANOverRide: (service.Overrides && service.Overrides.VlanId !== undefined) ? true : false,
            bandwidthProfile: (service.Overrides && service.Overrides.BwProfile) ? service.Overrides.BwProfile : this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
              return (profile._id === service.ProfileId);
            })[0].configurations.parameterValues.X_CALIX_SXACC_BW_PROFILE,
            vLAN: (service.Overrides && service.Overrides.VlanId !== undefined) ? service.Overrides.VlanId : this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
              return (profile._id === service.ProfileId);
            })[0].VLAN,
            serviceProfile: this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
              return (profile._id === service.ProfileId);
            })[0],
            bridgeMBRPort: this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
              return (profile._id === service.ProfileId);
            })[0].configurations.parameterValues.X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS
          }
          patchObj.push(obj);
        }
      })
    }
    return patchObj;
  }

  patchDeviceData(deviceID): IDeviceModel {
    return {
      regId: deviceID,
      selectedModel: this.deviceModels.includes(this.editDeviceObj?.modelName) ? this.editDeviceObj?.modelName : undefined,
      deviceMode: this.editDeviceObj.opMode,
      //isDisableModel: this.editDeviceObj.modelName ? true : false,
      isDisableModel: (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(deviceID),
      isStaticGroup: this.getStaticGroupList().length > 0 ? 'Yes' : 'No',
      selectedStaticGroup: this.getStaticGroupList(),
    }
  }

  getStaticGroupList() {
    let selectedStaticGroup = [];
    if (this.editDeviceObj.staticGroupMember) {
      this.editDeviceObj.staticGroupMember.forEach(group => {
        if (group.memberInfo.toLowerCase() === this.editDeviceObj.deviceId.toLowerCase()) {
          selectedStaticGroup.push(group.groupId)
        }
      });
    }
    return selectedStaticGroup;
  }
  patchDataServiceData(): IDataServiceModel {
    return {
      PPPoEUsername: (this.editDeviceObj.data.pppoe) ? this.editDeviceObj.data.pppoe.Username : undefined,
      PPPoEPwd: (this.editDeviceObj.data.pppoe) ? this.editDeviceObj.data.pppoe.Password : undefined,
      vLAN: this.editDeviceObj.data.VlanId,
      priority: this.editDeviceObj.data.Pbit,
      bandwidth: this.editDeviceObj.data.BwProfile,
      isDataService: this.editDeviceObj.data.Enable
    }
  }

  patchVideoServiceData(): IVideoServiceModel {
    return {
      isVideoService: this.editDeviceObj.video.Enable,
      vLAN: this.editDeviceObj.video.VlanId,
      priority: this.editDeviceObj.video.Pbit,
      bandwidth: this.editDeviceObj.video.BwProfile
    }
  }

  patchVoiceServiceData(): IVocieServiceModel {
    let ipAddress = '';

    //CCL-38091
    if (this.editDeviceObj.voice && !this.editDeviceObj.voice?.X_CALIX_SXACC_RG_WAN) {
      this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN = {};
    }
    /***
     * CCL-28604
     */

    if (this.editDeviceObj?.voice?.ServiceType === 'SIP') {
      ipAddress = this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN?.ExternalIPAddress;
    } else {
      if (this.editDeviceObj.voice?.X_CALIX_SXACC_RG_WAN && this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN?.ServiceConnectionType == "DHCP") {
        ipAddress = this.editDeviceObj.voice?.X_000631_Opt81ClientFQDN ? this.editDeviceObj.voice.X_000631_Opt81ClientFQDN : '';
      } else {
        ipAddress = this.editDeviceObj.voice?.X_CALIX_SXACC_RG_WAN?.ExternalIPAddress ? this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN?.ExternalIPAddress : '';
      }
    }

    let ipHostName = '';
    if (this.editDeviceObj.opMode === 'Managed ONT') {
      ipHostName = this.editDeviceObj?.voice?.X_000631_Opt81ClientFQDN ? this.editDeviceObj.voice.X_000631_Opt81ClientFQDN : '';
    }

    return {
      serviceType: (this.editDeviceObj.opMode === 'Managed ONT') ? this.patchServiceType('Voice Service') : this.editDeviceObj.voice.ServiceType,
      VoiceProfile: (this.editDeviceObj.opMode === 'RG') ? this.patchVoiceProfile('Voice Service') : this.editDeviceObj.services,
      faxRelay: (this.editDeviceObj.voice.FaxT38) ? this.editDeviceObj.voice.FaxT38.Enable : false,
      dialPlan: this.editDeviceObj.voice.DialPlan,
      addressType: this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN.ServiceConnectionType,
      ipAddress: ipAddress,
      subnetMask: this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN.SubnetMask,
      defaultGateway: this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN.DefaultGateway,
      dnsServers: this.editDeviceObj.voice.X_CALIX_SXACC_RG_WAN.DNSServers,
      showVocieService: (!history.state.isNewRecord) ? true : false,
      lineOne: this.patchVoiceLineData(1),
      lineTwo: this.patchVoiceLineData(2),
      ipHostName: ipHostName
    }
  }

  patchServiceType(serviceType) {
    let sericeType: any = undefined;
    this.editDeviceObj.services.forEach(service => {
      if (service.category === serviceType) {
        sericeType = this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
          return (profile._id === service.ProfileId);
        })[0];
      }
    })
    return sericeType;
  }

  patchVoiceProfile(VoiceProfile: any) {
    let voiceProfille: any = undefined;
    this.editDeviceObj.services?.forEach(service => {
      if (service.category === VoiceProfile) {
        voiceProfille = this.addDeviceObj.configurationObj['seriviceList'].filter(profile => {
          return (profile._id === service.ProfileId);
        })[0];
      }
    })
    return voiceProfille || '';
  }

  patchVoiceLineData(lineIndex): IVoiceLineServiceModel {
    if (this.editDeviceObj.voice.Line[lineIndex].Enable === 'Enabled') {
      return {
        username: this.editDeviceObj.voice.Line[lineIndex].SIP ? this.editDeviceObj.voice.Line[lineIndex].SIP.AuthUserName : undefined,
        password: this.editDeviceObj.voice.Line[lineIndex].SIP ? this.editDeviceObj.voice.Line[lineIndex].SIP.AuthPassword : undefined,
        uri: this.editDeviceObj.voice.Line[lineIndex].SIP ? this.editDeviceObj.voice.Line[lineIndex].SIP.URI : undefined,
        isCallWaiting: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.CallWaitingEnable : false,
        isCallerId: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.CallerIDEnable : false,
        isDirectCon: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.X_000631_DirectConnectEnable : false,
        isThreeWayCalling: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.X_000631_ThreewayCallingEnable : false,
        isVoiceService: (this.editDeviceObj.voice.Line[lineIndex].Enable === 'Enabled'),
        direConnectNum: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.X_000631_DirectConnectNumber : undefined,
        directConnectTimer: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? Number(this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.X_000631_DirectConnectTimer) : undefined,
        messageWaitIndi: (this.editDeviceObj.voice.Line[lineIndex].CallingFeatures) ? this.editDeviceObj.voice.Line[lineIndex].CallingFeatures.MWIEnable : false,
        terminateId: this.editDeviceObj.voice.Line[lineIndex].X_000631_H248 ? this.editDeviceObj.voice.Line[lineIndex].X_000631_H248.TerminationId : undefined,
        isGR303: this.editDeviceObj.voice.Line[lineIndex].MGCP ? this.editDeviceObj.voice.Line[lineIndex].MGCP.X_000631_GR303 : undefined,
        CRV: this.editDeviceObj.voice.Line[lineIndex].X_000631_TdmGw ? this.editDeviceObj.voice.Line[lineIndex].X_000631_TdmGw.Crv : undefined,
        systemLoss: this.patchSystemLoss(lineIndex),
        systemRXLoss: this.editDeviceObj.voice.Line[lineIndex].VoiceProcessing.ReceiveGain / 10,
        systemTXLoss: this.editDeviceObj.voice.Line[lineIndex].VoiceProcessing.TransmitGain / 10
      }
    } else {
      // return {
      //   username: undefined,
      //   password: undefined,
      //   uri: undefined,
      //   isCallWaiting: (lineIndex === 1) ? false : true,
      //   isCallerId: (lineIndex === 1) ? false : true,
      //   isDirectCon: false,
      //   isThreeWayCalling: (lineIndex === 1) ? false : true,
      //   isVoiceService: (this.editDeviceObj.voice.Line[lineIndex].Enable === 'Enabled'),
      //   direConnectNum: undefined,
      //   directConnectTimer: undefined,
      //   messageWaitIndi: (lineIndex === 1) ? false : true,
      //   systemLoss: 'ANSI',  // to fix CCL-25408
      //   systemRXLoss: -9,
      //   systemTXLoss: -3
      // }
      return this.initVoiceLineObj();
    }
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
        return { serviceType: 'SIP', faxRelay: false, dialPlan: 'system-default', addressType: 'DHCP', ipAddress: '', subnetMask: '', defaultGateway: '', dnsServers: '', lineOne: this.initVoiceLineObj(), lineTwo: this.initVoiceLineObj() };
        break;
      case 'WIFI':
        return {
          X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined },
          X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined },
          X_CALIX_SXACC_PRIMARY_5GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_GUEST_5GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_PRIMARY_6GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          X_CALIX_SXACC_GUEST_6GHZ_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
          isUnifiedPrimarySSID: false,
          toggeledUnifiedPrimarySSID: false,
          UNIFIED_PRIMARY_SSID: { encryption: '', showPassPhrase: false, passphrase: '', securityType: '', broadcastEnabled: undefined, serviceEnabled: undefined, mumimoEnabled: undefined, enableDfsChannels: undefined },
        };
        break;
      case 'Settings':
        return { isPowerSaving: true, lanPortOne: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortTwo: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortThree: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }, lanPortFour: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 } };
        break;
      default:
        break;
    }
  }

  initVoiceLineObj() {
    return {
      username: undefined,
      password: undefined,
      uri: undefined,
      isCallWaiting: true,
      isCallerId: true,
      isDirectCon: false,
      isThreeWayCalling: true,
      isVoiceService: false,
      direConnectNum: undefined,
      directConnectTimer: 0,
      messageWaitIndi: true,
      systemLoss: 'ANSI', // to fix CCL-25408
      systemRXLoss: -9,
      systemTXLoss: -3
    }
  }

  initAddDeviceOject(deviceID, model?: any, opMode?: any): void {
    this.addDeviceObj = {
      isNewRecord: true,
      addDeviceTab: [SubscriberManagement.DEVICE_LABEL, SubscriberManagement.SERVICE_LABEL],
      configurationObj: { defaultLanValidation: false },
      showModeErrorMsg: false,
      showDeviceIDErrorMsg: false,
      showModelErrorMsg: false,
      isUnifiedPrimarySSID: false,
      toggeledUnifiedPrimarySSID: false,
      device: {
        regId: deviceID,
        selectedModel: model ? model : undefined,
        deviceMode: opMode ? opMode : undefined,
        isDisableModel: this.addDeviceObj?.device?.isDisableModel ? true : false,
        isStaticGroup: 'No',
        selectedStaticGroup: [],
      },
      services: {
        configuredService: 'Yes',
        ontDataService: [],
        ontVideoService: [],
        dataService: this.initSeriveObjects('Data'),
        videoService: this.initSeriveObjects('Video'),
        voiceService: this.initSeriveObjects('Voice'),
        wifiSSID: this.initSeriveObjects('WIFI'),
        showVideoServiceByDefault: false,
        showDataServiceByDefault: false,

      },
      settings: this.initSeriveObjects('Settings')
    };
  }

  levelsPassed = 0;
  onTabChange(index: number, type = null) {

    if (!this.addDeviceObj?.device?.regId?.trim() && index > 0) {
      this.addDeviceObj.showDeviceIDErrorMsg = true;
      return;
    }
    if (!this.addDeviceObj.device.selectedModel && index > 0) {
      this.addDeviceObj.showModeErrorMsg = true;
      return;
    }
    if (!this.addDeviceObj.device.deviceMode && index > 0) {
      this.addDeviceObj.showModelErrorMsg = true;
      return;
    }
    if (this.addDeviceObj.configurationObj.defaultLanValidation === true) {
      return;
    }
    if (this.addDeviceObj?.device?.isStaticGroup == 'Yes') {
      this.staticGrpError = this.addDeviceObj?.device.selectedStaticGroup.length <= 0 ? true : false;
      if (this.staticGrpError) return;
    }
    if (this.addDeviceObj?.device?.isStaticGroup == 'No') this.staticGrpError = false;
    // if (!(_.isEmpty(this.voiceServiceValidation()) && !this.dataVidoeServiceValidation())) {
    //   return;
    // }
    if (index > 0 && history?.state?.isProvision && this.isPRConfiguredOutside) this.addDeviceObj.services.configuredService = 'Yes';
    if (index > 0) this.isProvision = false;
    this.activeTab = this.addDeviceObj.addDeviceTab[index];
    this.disableNextBtn = false;
    this.selectedTabIndex = index;
    this.isTabChange = !this.isTabChange;
    if (this.levelsPassed < index) {
      this.levelsPassed = index;
    }
    if (!this.editMode && index != 2) {
      this.addDeviceObj.services.wifiSSID.UNIFIED_PRIMARY_SSID = {};
      this.addDeviceObj.isUnifiedPrimarySSID = false;
    }

  }

  voiceServiceValidation() {
    if (this.addDeviceObj.services.voiceService.addressType === 'Static') {
      for (let key of Object.keys(this.addDeviceObj.services.voiceService)) {
        if (key === 'ipAddress' && !this.addDeviceObj.services.voiceService[key]) {
          this.addDeviceObj.services.voiceService.inValidIP = true;
        } else if (key === 'subnetMask' && !this.addDeviceObj.services.voiceService[key]) {
          this.addDeviceObj.services.voiceService.inValidSubnet = true;
        } else if (key === 'defaultGateway' && !this.addDeviceObj.services.voiceService[key]) {
          this.addDeviceObj.services.voiceService.inValidgateway = true;
        }
      }
    }
    const voiceServiceValidation = Object.assign({}, _.pickBy(this.addDeviceObj.services.voiceService, function (value, key) {
      return (_.startsWith(key, "inValid") && value === true);
    }), this.lineServiceValidation('lineOne'), this.lineServiceValidation('lineTwo'));
    return voiceServiceValidation;
  }

  dataVidoeServiceValidation() {
    if (this.addDeviceObj.services.dataService.inValidVLan || this.addDeviceObj.services.videoService.inValidVLan) {
      return true;
    } else {
      return false;
    }
  }

  lineServiceValidation(line) {
    if (this.addDeviceObj.services.voiceService[line] && this.addDeviceObj.services.voiceService[line].isVoiceService) {
      if (!this.addDeviceObj.services.voiceService[line]['password'] && this.addDeviceObj.services.voiceService.serviceType === 'SIP') {
        this.addDeviceObj.services.voiceService[line].inValidPWD = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['uri'] && this.addDeviceObj.services.voiceService.serviceType === 'SIP') {
        this.addDeviceObj.services.voiceService[line].inValidURI = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['direConnectNum'] && this.addDeviceObj.services.voiceService.serviceType === 'SIP'
        && this.addDeviceObj.services.voiceService[line].isDirectCon) {
        this.addDeviceObj.services.voiceService[line].inValidDireConnectNum = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['username'] && this.addDeviceObj.services.voiceService.serviceType === 'SIP') {
        this.addDeviceObj.services.voiceService[line].inValidUserName = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['terminateId'] && this.addDeviceObj.services.voiceService.serviceType === 'H.248') {
        this.addDeviceObj.services.voiceService[line].inValidTerminateId = true;
      }
      if (!this.addDeviceObj.services.voiceService[line]['CRV'] && this.addDeviceObj.services.voiceService.serviceType === 'X_000631_TDMGW') {
        this.addDeviceObj.services.voiceService[line].inValidCRV = true;
      }
    }
    const result = _.pickBy(this.addDeviceObj.services.voiceService[line], function (value, key) {
      return (_.startsWith(key, "inValid") && value === true);
    });
    return result;
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorMessage = this.language['Access Denied'];
    } else {
      this.errorMessage = this.ssoService.pageErrorHandle(err);
    }
    this.loader = false;
    this.isError = true;
    $("body").scrollTop(0);
  }

  buildWIFIReqObj() {
    let allowedWifissids = ["X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID", "X_CALIX_SXACC_PRIMARY_5GHZ_SSID", "X_CALIX_SXACC_GUEST_5GHZ_SSID", "X_CALIX_SXACC_PRIMARY_6GHZ_SSID", "X_CALIX_SXACC_GUEST_6GHZ_SSID", "UNIFIED_PRIMARY_SSID"];

    let allwifiObj = {};
    for (let key of Object.keys(this.addDeviceObj.services.wifiSSID)) {
      if (allowedWifissids.indexOf(key) === -1) {
        continue;
      }


      if (!this.checkWifiSSIDForBuildKeys(key)) continue;
      let prevWifiValues = this.deviceProvRecord?.wifi?.[key] ? this.deviceProvRecord?.wifi?.[key] : {};


      if (this.deviceProvRecord?.wifi?.[key]?.SSID == undefined) {
        prevWifiValues['SSID'] = "";
      }
      if (this.deviceProvRecord?.wifi?.[key]?.KeyPassphrase == undefined) {
        prevWifiValues['KeyPassphrase'] = "";
      }
      if (this.addDeviceObj.services.wifiSSID[key].serviceEnabled == 'undefined') {
        this.addDeviceObj.services.wifiSSID[key].serviceEnabled = undefined;
      } else if (this.addDeviceObj.services.wifiSSID[key].serviceEnabled == 'true') {
        this.addDeviceObj.services.wifiSSID[key].serviceEnabled = true;
      } else if (this.addDeviceObj.services.wifiSSID[key].serviceEnabled == 'false') {
        this.addDeviceObj.services.wifiSSID[key].serviceEnabled = false;
      }

      if (this.addDeviceObj.services.wifiSSID[key].name != undefined) {
        this.addDeviceObj.services.wifiSSID[key].name = this.addDeviceObj.services.wifiSSID[key].name.trim();
      }
      if (this.addDeviceObj.services.wifiSSID[key].passphrase != undefined) {
        this.addDeviceObj.services.wifiSSID[key].passphrase = this.addDeviceObj.services.wifiSSID[key].passphrase.trim();
      }

      let wifiObject: any = {
        SSID: (prevWifiValues?.SSID != this.addDeviceObj.services.wifiSSID[key].name) ? (this.addDeviceObj.services.wifiSSID[key].name != undefined ? this.addDeviceObj.services.wifiSSID[key].name : undefined) : undefined,
        Enable: (prevWifiValues?.Enable != this.addDeviceObj.services.wifiSSID[key].serviceEnabled) ? (this.addDeviceObj.services.wifiSSID[key].serviceEnabled != undefined ? this.addDeviceObj.services.wifiSSID[key].serviceEnabled : undefined) : undefined,
        SSIDAdvertisementEnabled: (prevWifiValues?.SSIDAdvertisementEnabled != this.addDeviceObj.services.wifiSSID[key].broadcastEnabled) ? (this.addDeviceObj.services.wifiSSID[key].broadcastEnabled != undefined ? this.addDeviceObj.services.wifiSSID[key].broadcastEnabled : undefined) : undefined,
        BeaconType: (prevWifiValues?.BeaconType != this.addDeviceObj.services.wifiSSID[key].securityType) ? ((this.addDeviceObj.services.wifiSSID[key].securityType != undefined && this.addDeviceObj.services.wifiSSID[key].securityType !== "") ? this.addDeviceObj.services.wifiSSID[key].securityType : undefined) : undefined,
        MUMIMOEnabled: (prevWifiValues?.MUMIMOEnabled != this.addDeviceObj.services.wifiSSID[key].mumimoEnabled) ? (this.addDeviceObj.services.wifiSSID[key].mumimoEnabled != undefined ? this.addDeviceObj.services.wifiSSID[key].mumimoEnabled : undefined) : undefined,
        EnableDfsChannels: (prevWifiValues?.EnableDfsChannels != this.addDeviceObj.services.wifiSSID[key].enableDfsChannels) ? (this.addDeviceObj.services.wifiSSID[key].enableDfsChannels != undefined ? this.addDeviceObj.services.wifiSSID[key].enableDfsChannels : undefined) : undefined,
      };
      if (this.addDeviceObj.services.wifiSSID[key].securityType !== 'Basic') {
        wifiObject['IEEE11iEncryptionModes'] = (prevWifiValues?.IEEE11iEncryptionModes != this.addDeviceObj.services.wifiSSID[key].encryption) ? ((typeof this.addDeviceObj.services.wifiSSID[key].encryption === 'string' && this.addDeviceObj.services.wifiSSID[key].encryption !== "") ? this.addDeviceObj.services.wifiSSID[key].encryption : undefined) : undefined;
        wifiObject['KeyPassphrase'] = (prevWifiValues?.KeyPassphrase != this.addDeviceObj.services.wifiSSID[key].passphrase) ? (this.addDeviceObj.services.wifiSSID[key].passphrase != undefined ? this.addDeviceObj.services.wifiSSID[key].passphrase : undefined) : undefined;
        wifiObject['WPAEncryptionModes'] = (prevWifiValues?.IEEE11iEncryptionModes != this.addDeviceObj.services.wifiSSID[key].encryption) ? ((typeof this.addDeviceObj.services.wifiSSID[key].encryption === 'string' && this.addDeviceObj.services.wifiSSID[key].encryption !== "") ? this.addDeviceObj.services.wifiSSID[key].encryption : undefined) : undefined;
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
    if (this.addDeviceObj?.isUnifiedPrimarySSID && !(this.addDeviceObj.toggeledUnifiedPrimarySSID)) {
      var unifiedPrimarySsid = Object.assign({}, this.addDeviceObj?.services?.wifiSSID["UNIFIED_PRIMARY_SSID"]);

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
      //  allwifiObj["UNIFIED_PRIMARY_SSID"] = unifiedWifiObject;
      allwifiObj["UNIFIED_PRIMARY_SSID"] = _.pickBy(unifiedWifiObject, function (value, key) {
        return !(value === undefined || value === "undefined" || value === null || value === "");
      });

    }
    else if (!(this.addDeviceObj?.isUnifiedPrimarySSID) && !(this.addDeviceObj.toggeledUnifiedPrimarySSID)) {
      delete allwifiObj["UNIFIED_PRIMARY_SSID"];
    }
    else if (this.editMode && this.addDeviceObj?.isUnifiedPrimarySSID) {
      var unifiedPrimarySsid = Object.assign({}, this.addDeviceObj?.services?.wifiSSID["UNIFIED_PRIMARY_SSID"]);
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

      allwifiObj["UNIFIED_PRIMARY_SSID"] = _.pickBy(unifiedWifiObject, function (value, key) {
        return !(value === undefined || value === "undefined" || value === null || value === "");
      });
    }

    return allwifiObj;
  }
  buildDataReqObj() {
    let dataReqObj = {};
    if (this.addDeviceObj.services.dataService.isDataService) {
      dataReqObj = {
        Pbit: this.addDeviceObj.services.dataService.priority,
        pppoe: _.pickBy({
          Password: this.addDeviceObj.services.dataService.PPPoEPwd,
          Username: this.addDeviceObj.services.dataService.PPPoEUsername
        }, function (value, key) {
          return !(value === undefined || value === "" || value === " ");
        }),
        Enable: this.addDeviceObj.services.dataService.isDataService,
        VlanId: this.addDeviceObj.services.dataService.vLAN !== '' ? Number(this.addDeviceObj.services.dataService.vLAN) : undefined,
        BwProfile: this.addDeviceObj.services.dataService.bandwidth
      }

      if (typeof dataReqObj['Pbit'] === 'object') {
        delete dataReqObj['Pbit'];
      }

      if (!Object.keys(dataReqObj['pppoe']).length) {
        delete dataReqObj['pppoe'];
      }
    } else {
      dataReqObj = {
        Enable: this.addDeviceObj.services.dataService.isDataService,
        BwProfile: this.addDeviceObj.services.dataService.bandwidth
      }
    }

    // if (typeof dataReqObj['pbit'] === 'object') {

    // }
    if (!this.addDeviceObj.services.dataService.bandwidth) {
      delete dataReqObj['BwProfile'];
    }

    return dataReqObj;
  }
  buildVideoReqObj() {
    let videoReqObj = {};
    if (this.addDeviceObj.services.videoService.isVideoService) {
      videoReqObj = {
        Pbit: this.addDeviceObj.services.videoService.priority,
        Enable: this.addDeviceObj.services.videoService.isVideoService,
        VlanId: this.addDeviceObj.services.videoService.vLAN !== '' ? Number(this.addDeviceObj.services.videoService.vLAN) : undefined,
        BwProfile: this.addDeviceObj.services.videoService.bandwidth
      }

      if (typeof videoReqObj['Pbit'] === 'object') {
        delete videoReqObj['Pbit'];
      }
    } else {
      videoReqObj = {
        Enable: this.addDeviceObj.services.videoService.isVideoService,
        BwProfile: this.addDeviceObj.services.videoService.bandwidth
      }
    }
    return videoReqObj;
  }
  buildVoiceReqObj() {
    const isSIPStatic: boolean = (this.addDeviceObj.services.voiceService.addressType === 'Static' || this.addDeviceObj.device.deviceMode === 'Managed ONT');
    // let serviceType = '';
    // if (!history.state.isNewRecord) {
    //   serviceType = this.addDeviceObj.services.voiceService.serviceType;
    // } else {
    //   serviceType = (this.addDeviceObj.device.deviceMode === 'Managed ONT' && this.addDeviceObj.services.voiceService.serviceType?.configurationObj?.parameterValues) ? this.addDeviceObj.services.voiceService.serviceType.configurations.parameterValues.Type :
    //     this.addDeviceObj.services.voiceService.serviceType;
    // }
    const serviceType = this.addDeviceObj.device.deviceMode === 'Managed ONT' ? this.addDeviceObj?.services?.voiceService?.serviceType?.configurations?.parameterValues.Type :
      (typeof this.addDeviceObj.services.voiceService.serviceType === 'object' && this.addDeviceObj.services.voiceService.serviceType) ? this.addDeviceObj.services.voiceService.serviceType.value : this.addDeviceObj.services.voiceService.serviceType;

    let voiceReqObj = {};
    // if (this.addDeviceObj.device.deviceMode !== 'Managed ONT' && this.addDeviceObj.services?.voiceService && Object.keys(this.addDeviceObj.services?.voiceService).length && this.addDeviceObj.services.voiceService.serviceType) {

    if ((this.addDeviceObj.services.voiceService.showVocieService && this.addDeviceObj.device.deviceMode === 'Managed ONT') ||
      (this.addDeviceObj.device.deviceMode !== 'Managed ONT' && this.addDeviceObj.services?.voiceService && Object.keys(this.addDeviceObj.services?.voiceService).length && this.addDeviceObj.services.voiceService.serviceType)) {
      voiceReqObj = {
        Line: {
          1: this.buildLineObject('lineOne'),
          2: this.buildLineObject('lineTwo')
        },
        DialPlan: this.addDeviceObj.services.voiceService.dialPlan,
        ServiceType: serviceType === 'TDM GW' ? 'X_000631_TDMGW' : serviceType,
        X_CALIX_SXACC_RG_WAN: _.pickBy({
          ServiceConnectionType: this.addDeviceObj.services.voiceService.addressType,
          DNSServers: (isSIPStatic) ? this.addDeviceObj.services.voiceService.dnsServers : undefined,
          DefaultGateway: (isSIPStatic) ? this.addDeviceObj.services.voiceService.defaultGateway : undefined,
          ExternalIPAddress: (isSIPStatic) ? this.addDeviceObj.services.voiceService.ipAddress : undefined,
          SubnetMask: (isSIPStatic) ? this.addDeviceObj.services.voiceService.subnetMask : undefined,
        }, _.identity)
      }

      /** fix CCL-23821 */
      if (voiceReqObj['ServiceType'] !== 'SIP') {
        delete voiceReqObj['DialPlan'];
      }

      if (serviceType === 'H.248' || serviceType === 'MGCP') {
        /***
         * CCL-28604
         */
        if (this.addDeviceObj.services.voiceService?.addressType === 'DHCP') {
          voiceReqObj['X_000631_Opt81ClientFQDN'] = this.addDeviceObj.services.voiceService.ipAddress;
        }

      }

      if (this.addDeviceObj.device.deviceMode === 'Managed ONT') {
        voiceReqObj['X_000631_Opt81ClientFQDN'] = this.addDeviceObj.services.voiceService.ipHostName;
      }

      if (serviceType === 'SIP') {
        voiceReqObj['FaxT38'] = {
          Enable: this.addDeviceObj.services.voiceService.faxRelay
        }
      }
    }
    return voiceReqObj;
  }

  buildLineObject(Line) {
    const serviceType = this.addDeviceObj.device.deviceMode === 'Managed ONT' ? this.addDeviceObj.services.voiceService.serviceType.configurations.parameterValues.Type :
      this.addDeviceObj.services.voiceService.serviceType;

    // let serviceType = '';

    // if (!history.state.isNewRecord) {
    //   serviceType = this.addDeviceObj.services.voiceService.serviceType;
    // } else {
    //   serviceType = (this.addDeviceObj.device.deviceMode === 'Managed ONT' && this.addDeviceObj.services.voiceService.serviceType?.configurationObj?.parameterValues) ? this.addDeviceObj.services.voiceService.serviceType.configurations.parameterValues.Type :
    //     this.addDeviceObj.services.voiceService.serviceType;

    // }
    if (serviceType === 'SIP') {
      if (this.addDeviceObj.services.voiceService[Line] && this.addDeviceObj.services.voiceService[Line].isVoiceService) {

        return {
          SIP: _.pickBy({
            URI: this.addDeviceObj.services.voiceService[Line].uri,
            AuthPassword: this.addDeviceObj.services.voiceService[Line].password,
            AuthUserName: this.addDeviceObj.services.voiceService[Line].username
          }, function (value, key) {
            return !(value === undefined || value === "" || value === " ");
          }),
          Enable: this.addDeviceObj.services.voiceService[Line].isVoiceService ? 'Enabled' : 'Disabled',
          CallingFeatures: _.omitBy({
            MWIEnable: this.addDeviceObj.services.voiceService[Line].messageWaitIndi,
            CallerIDEnable: this.addDeviceObj.services.voiceService[Line].isCallerId,
            CallWaitingEnable: this.addDeviceObj.services.voiceService[Line].isCallWaiting,
            X_000631_DirectConnectTimer: Number(this.addDeviceObj.services.voiceService[Line].directConnectTimer),
            X_000631_DirectConnectEnable: this.addDeviceObj.services.voiceService[Line].isDirectCon,
            X_000631_DirectConnectNumber: this.addDeviceObj.services.voiceService[Line].direConnectNum,
            X_000631_ThreewayCallingEnable: this.addDeviceObj.services.voiceService[Line].isThreeWayCalling
          }, _.isNil),
          VoiceProcessing: _.pickBy({
            ReceiveGain: this.addDeviceObj.services.voiceService[Line].systemRXLoss != undefined ? Number(this.addDeviceObj.services.voiceService[Line].systemRXLoss) * 10 : -90,
            TransmitGain: this.addDeviceObj.services.voiceService[Line].systemTXLoss != undefined ? Number(this.addDeviceObj.services.voiceService[Line].systemTXLoss) * 10 : -30
          }, function (value, key) {
            return !(value === undefined || value === "" || value === " ");
          })
        };
      } else {
        return {
          Enable: 'Disabled'
        };
      }
    } else {
      if (this.addDeviceObj.services.voiceService[Line] && this.addDeviceObj.services.voiceService[Line].isVoiceService) {
        // if (this.addDeviceObj.services.voiceService[Line].systemRXLoss && Math.abs(this.addDeviceObj.services.voiceService[Line].systemRXLoss) < 1) {
        //   this.addDeviceObj.services.voiceService[Line].systemRXLoss = Number(this.addDeviceObj.services.voiceService[Line].systemRXLoss) * 10;
        // }

        // if (this.addDeviceObj.services.voiceService[Line].systemTXLoss && Math.abs(this.addDeviceObj.services.voiceService[Line].systemTXLoss) < 1) {
        //   this.addDeviceObj.services.voiceService[Line].systemTXLoss = Number(this.addDeviceObj.services.voiceService[Line].systemTXLoss) * 10;
        // }

        let lionObj: any = {
          VoiceProcessing: _.pickBy({
            ReceiveGain: this.addDeviceObj.services.voiceService[Line].systemRXLoss != undefined ? Number(this.addDeviceObj.services.voiceService[Line].systemRXLoss) * 10 : -90,
            TransmitGain: this.addDeviceObj.services.voiceService[Line].systemTXLoss != undefined ? Number(this.addDeviceObj.services.voiceService[Line].systemTXLoss) * 10 : -30
          }, function (value, key) {
            return !(value === undefined || value === "" || value === " ");
          }),
          Enable: this.addDeviceObj.services.voiceService[Line].isVoiceService ? 'Enabled' : 'Disabled',
        };

        if (serviceType === 'H.248') {
          lionObj['X_000631_H248'] = {
            TerminationId: this.addDeviceObj.services.voiceService[Line].terminateId
          };
        }
        if (serviceType === 'MGCP') {
          lionObj['MGCP'] = {
            X_000631_GR303: this.addDeviceObj.services.voiceService[Line].isGR303 === undefined ? false : this.addDeviceObj.services.voiceService[Line].isGR303
          };
        }
        if (serviceType === 'X_000631_TDMGW') {
          lionObj['X_000631_TdmGw'] = {
            Crv: this.addDeviceObj.services.voiceService[Line].CRV
          };
        }

        return lionObj;
      } else {
        return {
          Enable: 'Disabled'
        };
      }
    }
  }

  buildPortsObj() {
    let portObjs = {};
    let i = 0;
    for (let key of Object.keys(this.addDeviceObj.settings)) {
      if (Object.keys(this.addDeviceObj.settings[key]).length > 0) {
        i++
        let portObj = {};
        if (this.addDeviceObj.settings[key].DHCPLeaseLimit !== '') {
          portObj['DhcpLeaseLimit'] = this.addDeviceObj.settings[key].DHCPLeaseLimit;
        }
        if (this.addDeviceObj.settings[key].speed) {
          portObj['MaxBitRate'] = this.addDeviceObj.settings[key].speed
        }
        if (this.addDeviceObj.settings[key].adminState !== "Enable") {
          portObj['Enable'] = false;
        } else {
          portObj['Enable'] = true;
        }
        if (this.addDeviceObj.settings[key].hasOwnProperty('powerSaving')) {
          portObj['OnBatteryEnable'] = !this.addDeviceObj.settings[key].powerSaving; //TO fix CCL-35150
        }

        //to fix CCL-38136
        // if (this.addDeviceObj.settings[key].duplex && this.addDeviceObj.settings[key].duplex.trim() !== 'Auto') {
        //   portObj['OnBatteryEnable'] = false;
        // }
        if (this.addDeviceObj.settings[key].duplex !== '') {
          portObj['DuplexMode'] = this.addDeviceObj.settings[key].duplex;
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

  checkSettingsChanged(settingsObj) {
    let defaultVal = {
      isPowerSaving: true,
      lanPortOne:
      {
        adminState: 'Enable',
        powerSaving: true,
        speed: 'Auto',
        duplex: 'Auto',
        DHCPLeaseLimit: 0
      },
      lanPortTwo: {
        adminState: 'Enable',
        powerSaving: true,
        speed: 'Auto',
        duplex: 'Auto',
        DHCPLeaseLimit: 0
      },
      lanPortThree: {
        adminState: 'Enable',
        powerSaving: true,
        speed: 'Auto',
        duplex: 'Auto',
        DHCPLeaseLimit: 0
      },
      lanPortFour: {
        adminState: 'Enable',
        powerSaving: true,
        speed: 'Auto',
        duplex: 'Auto',
        DHCPLeaseLimit: 0
      }
    };
    if (JSON.stringify(defaultVal) === JSON.stringify(settingsObj)) {
      return true;
    } else {
      return false;
    }
  }

  buildONTModeReqObject() {
    const serviceObj = [];
    if (this.addDeviceObj.services.ontDataService.length > 0) {
      this.addDeviceObj.services.ontDataService.forEach(data => {
        const dataObj: any = {
          Enable: data.isServiceEnabled,
          ProfileId: data?.serviceProfile?._id,
        }
        if (data.isBWOverRide || data.isVLANOverRide) {
          dataObj['Overrides'] = {};
          if (data.isBWOverRide && data.bandwidthProfile) {
            dataObj['Overrides']['BwProfile'] = data.bandwidthProfile;
          }
          if (data.isVLANOverRide) {
            dataObj['Overrides']['VlanId'] = Number(data.vLAN);
          }
        } if (data.PPPoEUsername || data.PPPoEPwd) {
          dataObj["pppoe"] = {
            "Password": data.PPPoEPwd,
            "Username": data.PPPoEUsername
          }
        }
        serviceObj.push(dataObj);
      });
    }
    if (this.addDeviceObj.services.ontVideoService.length > 0) {
      const videoObj = {
        Enable: this.addDeviceObj.services.ontVideoService[0]?.isServiceEnabled,
        ProfileId: this.addDeviceObj.services.ontVideoService[0]?.serviceProfile?._id
      }
      if (this.addDeviceObj.services.ontVideoService[0].isBWOverRide || this.addDeviceObj.services.ontVideoService[0].isVLANOverRide) {
        videoObj['Overrides'] = {};
        if (this.addDeviceObj.services.ontVideoService[0].isBWOverRide && this.addDeviceObj.services.ontVideoService[0].bandwidthProfile) {
          videoObj['Overrides']['BwProfile'] = this.addDeviceObj.services.ontVideoService[0].bandwidthProfile;
        }
        if (this.addDeviceObj.services.ontVideoService[0].isVLANOverRide) {
          videoObj['Overrides']['VlanId'] = Number(this.addDeviceObj.services.ontVideoService[0].vLAN);
        }
      }
      serviceObj.push(videoObj);
    }
    if (this.addDeviceObj.services.voiceService.showVocieService) {
      const voiceObj = {
        Enable: this.addDeviceObj.services.voiceService.showVocieService,
        ProfileId: this.addDeviceObj?.services?.voiceService?.serviceType?._id
      }
      serviceObj.push(voiceObj);
    }


    return serviceObj;
  }
  changedOpmode(event) {
    this.updatedOpmode = event;

  }
  confirmDeleteServicesAssociateWithSbscrbr = false;
  onSaveDeviceInfo() {
    this.closeAlert();

    if (_.isEmpty(this.voiceServiceValidation()) && !this.dataVidoeServiceValidation()) {
      this.loader = true;
      if (this.duplicateSbcrbrAscDevice) {
        this.error = true;
        this.loader = false;
        this.errorInfo = 'Error! Subscriber already has an associated device with the same ID.';
        return;
      }
      if (!history.state.isNewRecord && this.addDeviceObj && !this.isCMS && this.addDeviceObj.services.configuredService === 'Yes' && typeof this.editDeviceObj === "object" && (this.editDeviceObj.data || this.editDeviceObj.video || this.editDeviceObj.voice)) {
        if (!this.confirmDeleteServicesAssociateWithSbscrbr) {
          this.loader = false;
          this.deleteServicesAssociateWithSbscrbrMsg = 'Do you want to delete the services associated with the subscriber?';
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return;
        }

      } else {
        this.loader = false;
        this.deleteServicesAssociateWithSbscrbrMsg = '';
      }
      let provisioningRecord: any;
      if (this.updatedOpmode) {
        this.addDeviceObj.device.deviceMode = this.updatedOpmode;
        this.updatedOpmode = null;
      }
      if (this.editDeviceObj && this.editDeviceObj.rgConfigMode) {
        this.editDeviceObj.wifi = this.buildWIFIReqObj()
        let tempProvRec = Object.assign({}, this.editDeviceObj)
        delete tempProvRec.staticGroupMember;
        provisioningRecord = tempProvRec;
      } else {
        provisioningRecord = {
          wifi: this.buildWIFIReqObj(),
          // orgId: this.orgId,
          opMode: this.addDeviceObj.device.deviceMode,
          deviceId: this.addDeviceObj.device.regId ? this.addDeviceObj.device.regId.trim() : '',
          modelName: this.addDeviceObj.device.selectedModel,
          subscriberId: this.subscriberInfo.subscriberId
        }
        if (history.state.isNewRecord || this.editDeviceObj) {
          if (this.addDeviceObj.services.configuredService === 'No') {
            if (this.addDeviceObj.services.voiceService?.VoiceProfile?._id) {
              provisioningRecord['services'] = [{
                Enable: true,
                ProfileId: (this.addDeviceObj.services.voiceService?.VoiceProfile?._id) ? this.addDeviceObj.services.voiceService?.VoiceProfile?._id : this.editDeviceObj?.services?.ProfileId,
                category: (this.addDeviceObj.services.voiceService.VoiceProfile?.configurations?.category) ? this.addDeviceObj.services.voiceService.VoiceProfile?.configurations?.category : this.editDeviceObj?.services?.category
              }]
            }
          }
        }
        if (!history.state.isNewRecord || (typeof this.editDeviceObj === "object" && this.editDeviceObj._id)) {
          provisioningRecord['_id'] = this.editDeviceObj._id;
        }
        if (this.addDeviceObj.device.deviceMode !== 'Managed ONT' && this.addDeviceObj.device.deviceMode !== 'WAP' && this.addDeviceObj.device.deviceMode !== 'WAP-IGMP' && this.addDeviceObj.services.configuredService === 'No') {
          provisioningRecord['data'] = _.pickBy(this.buildDataReqObj(), function (value, key) {
            return !(value === undefined || value === "" || value === " ");
          }),
            provisioningRecord['video'] = _.pickBy(this.buildVideoReqObj(), function (value, key) {
              return !(value === undefined || value === "" || value === " ");
            }),

            provisioningRecord['voice'] = _.pickBy(this.buildVoiceReqObj(), function (value, key) {
              return !(value === undefined || value === "" || value === " ");
            })
          //if (this.addDeviceObj?.device.selectedModel == 'GPR2032H') {
          if (!this.voiceStatus) {
            delete provisioningRecord['voice'];
            delete provisioningRecord['services'];
          }
          //console.log("voice status",this.voiceStatus)
          // if (!this.addDeviceObj.services.voiceService.showVocieService)
          // {
          //   delete provisioningRecord['voice'];
          //   delete provisioningRecord['services'];
          // }
          // if (!provisioningRecord['video']?.Enable) {
          //   delete provisioningRecord['video'];
          // }
          // if (!provisioningRecord['data']?.Enable) {
          //   delete provisioningRecord['data'];
          // }
          // if(this.addDeviceObj.services.videoService.serviceProfile.Mode)
          // {
          //   delete provisioningRecord['voice'];
          // }
        } else if (this.addDeviceObj.device.deviceMode !== 'Managed ONT' && this.addDeviceObj.services.configuredService === 'Yes') {
          delete provisioningRecord['data'];
          delete provisioningRecord['video'];
          delete provisioningRecord['voice'];
          delete provisioningRecord['services'];
        } else if (this.addDeviceObj.device.deviceMode === 'Managed ONT') {
          provisioningRecord['services'] = this.buildONTModeReqObject();
          if (!this.checkSettingsChanged(this.addDeviceObj.settings)) {
            provisioningRecord['ports'] = this.buildPortsObj();
          }
          provisioningRecord['enableRgOnBattery'] = !this.addDeviceObj.settings.isPowerSaving;
          if (provisioningRecord['services'].length) {
            if (this.addDeviceObj.services.voiceService.showVocieService) {
              const serviceType = this.addDeviceObj?.services?.voiceService?.serviceType?.configurations?.parameterValues.Type
              if (!serviceType) {
                this.error = true;
                this.errorInfo = this.language['Please select profile for added services'] ? this.language['Please select profile for added services'] : 'Please select profile for added services';

                return;
              }

              provisioningRecord['voice'] = _.pickBy(this.buildVoiceReqObj(), function (value, key) {
                return !(value === undefined || value === "" || value === " ");
              });


            }
            const noProfiles = provisioningRecord['services'].filter(el => !el.ProfileId);
            if (noProfiles.length) {
              this.error = true;
              this.errorInfo = this.language['Please select profile for added services'] ? this.language['Please select profile for added services'] : 'Please select profile for added services';
              return;
            }

            const noVoiceProfiles = provisioningRecord['services'].filter(el => !el.ProfileId);
            if (noVoiceProfiles.length) {
              this.error = true;
              this.errorInfo = this.language['Please select voice profile for added services'] ? this.language['Please select voice profile for added services'] : 'Please select voice profile for added services';
              return;
            }

            if (provisioningRecord['voice'] && Object.keys(provisioningRecord['voice']).length === 0 || !this.voiceStatus) {
              delete provisioningRecord['voice'];
            }
          } else {
            delete provisioningRecord['voice'];
          }
        }
      }

      if ((this.addDeviceObj.device.isStaticGroup === "Yes" && this.addDeviceObj.device.selectedStaticGroup) || (history.state && history.state.editDeviceObj && history.state.editDeviceObj.staticGroupMember)) {
        let newStaticGrpArr = [];
        let sgIds = this.addDeviceObj.device.selectedStaticGroup ? this.addDeviceObj.device.selectedStaticGroup : [];
        if (sgIds && this.addDeviceObj.device.isStaticGroup === "Yes") {

          sgIds.forEach((id: any) => {
            newStaticGrpArr.push({
              //"type": this.staticGroupTypes[id] ? this.staticGroupTypes[id] : 'FSAN',
              "type": (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(this.addDeviceObj.device.regId) ? 'MAC Address' : (/^CXNK[A-Z\0-9]{8}/).test(this.addDeviceObj.device.regId) ? 'FSAN' : null,
              "groupId": id,
              "memberInfo": this.addDeviceObj.device.regId ? this.addDeviceObj.device.regId.trim() : ''
            });
          });
        }

        provisioningRecord['newStaticGroup'] = newStaticGrpArr;

        if (history.state && history.state.editDeviceObj && history.state.editDeviceObj.staticGroupMember) {
          let oldStaticGrpArr = [];
          let sgIds = history.state.editDeviceObj.staticGroupMember;
          sgIds.forEach((element: any) => {
            oldStaticGrpArr.push({
              "_id": element['_id'],
              "type": element['type'],
              "groupId": element['groupId'],
              "memberInfo": element['memberInfo']
            });
          });

          provisioningRecord['oldStaticGroup'] = oldStaticGrpArr;
        }
      }

      // if (this.addDeviceObj.services?.dataService && Object.keys(this.addDeviceObj.services?.dataService).length) {
      //   provisioningRecord["data"] = {};
      //   if (this.addDeviceObj.services.dataService.bandwidth) {
      //     provisioningRecord["data"]["BwProfile"] = this.addDeviceObj.services.dataService.bandwidth;
      //   }

      //   if (this.addDeviceObj.services.dataService.isDataService) {
      //     provisioningRecord["data"]["Enable"] = true;
      //   }

      //   if (this.addDeviceObj.services.dataService.priority) {
      //     provisioningRecord["data"]["Pbit"] = this.addDeviceObj.services.dataService.priority;
      //   }

      //   if (this.addDeviceObj.services.dataService.vLAN) {
      //     provisioningRecord["data"]["VlanId"] = parseInt(this.addDeviceObj.services.dataService.vLAN);
      //   }

      //   if (this.addDeviceObj.services.dataService.PPPoEPwd || this.addDeviceObj.services.dataService.PPPoEUsername) {
      //     provisioningRecord["data"]["pppoe"] = {};
      //     if (this.addDeviceObj.services.dataService.PPPoEUsername) {
      //       provisioningRecord["data"]["pppoe"]["Username"] = this.addDeviceObj.services.dataService.PPPoEUsername;
      //     }

      //     if (this.addDeviceObj.services.dataService.PPPoEPwd) {
      //       provisioningRecord["data"]["pppoe"]["Password"] = this.addDeviceObj.services.dataService.PPPoEPwd;
      //     }
      //   }


      // }

      // if (this.addDeviceObj.services?.videoService && Object.keys(this.addDeviceObj.services?.videoService).length) {
      //   provisioningRecord["video"] = {};
      //   if (this.addDeviceObj.services.videoService.bandwidth) {
      //     provisioningRecord["video"]["BwProfile"] = this.addDeviceObj.services.videoService.bandwidth;
      //   }

      //   if (this.addDeviceObj.services.videoService.isVideoService) {
      //     provisioningRecord["video"]["Enable"] = true;
      //   }

      //   if (this.addDeviceObj.services.videoService.priority) {
      //     provisioningRecord["video"]["Pbit"] = this.addDeviceObj.services.videoService.priority;
      //   }

      //   if (this.addDeviceObj.services.videoService.vLAN) {
      //     provisioningRecord["video"]["VlanId"] = parseInt(this.addDeviceObj.services.videoService.vLAN);
      //   }

      // }

      // if (this.addDeviceObj.services?.voiceService && Object.keys(this.addDeviceObj.services?.voiceService).length) {
      //   provisioningRecord["voice"] = {};
      //   if (this.addDeviceObj.services.voiceService.dialPlan) {
      //     provisioningRecord["voice"]["DialPlan"] = this.addDeviceObj.services.voiceService.dialPlan;
      //   }

      //   if (this.addDeviceObj.services.voiceService.faxRelay) {
      //     provisioningRecord["voice"]["FaxT38"] = {};
      //     provisioningRecord["voice"]["FaxT38"]["Enable"] = this.addDeviceObj.services.voiceService.faxRelay;
      //   }

      //   if (this.addDeviceObj.services.voiceService.serviceType) {
      //     provisioningRecord["voice"]["ServiceType"] = this.addDeviceObj.services.voiceService.serviceType;
      //   }

      //   if (this.addDeviceObj.services.voiceService.addressType) {
      //     provisioningRecord["voice"]["X_CALIX_SXACC_RG_WAN"] = {};
      //     provisioningRecord["voice"]["X_CALIX_SXACC_RG_WAN"]["ServiceConnectionType"] = this.addDeviceObj.services.voiceService.addressType;
      //   }

      //   if (this.addDeviceObj.services.voiceService.lineOne) {
      //     let data = this.addDeviceObj.services.voiceService.lineOne;
      //     let obj = {
      //       "SIP": {
      //         "URI": data["uri"] ? data["uri"] : "",
      //         "AuthPassword": data["password"] ? data["password"] : "",
      //         "AuthUserName": data["username"] ? data["username"] : "",
      //       },
      //       "Enable": "Enabled",
      //       "CallingFeatures": {
      //         "MWIEnable": false,
      //         "CallerIDEnable": false,
      //         "CallWaitingEnable": false,
      //         "X_000631_DirectConnectTimer": 0,
      //         "X_000631_DirectConnectEnable": false,
      //         "X_000631_DirectConnectNumber": "",
      //         "X_000631_ThreewayCallingEnable": false
      //       },
      //       "VoiceProcessing": {
      //         "ReceiveGain": -9,
      //         "TransmitGain": -3
      //       }
      //     };
      //   }



      // }

      // return;
      // if (provisioningRecord && provisioningRecord?.services && provisioningRecord?.services.length) {
      //   const noProfiles = provisioningRecord?.services.filter(el => !el.ProfileId);
      //   if (noProfiles.length) {

      //     return;
      //   }
      // }
      const addDeviceObj: any = {
        isNeedAssociateDeviceToSubscriber: history.state.isNewRecord,
        subscriber: {
          _id: this.subscriberInfo.subscriberId ? this.subscriberInfo.subscriberId : this.subscriberInfo._id,
          account: this.subscriberInfo.account,
          subscriberLocationId: this.subscriberInfo.subscriberLocationId,
          name: this.subscriberInfo.name,
          serviceAddress: this.subscriberInfo.serviceAddress,
          phone: this.subscriberInfo.phone,
          email: this.subscriberInfo.email
        },
        deviceId: (!history.state.isNewRecord && this.editDeviceObj) ? this.editDeviceObj.deviceId?.trim() : this.addDeviceObj.device?.regId?.trim(),
        //deviceId: this.addDeviceObj.device.regId.trim(),
        provisioningRecord: provisioningRecord
      }


      this.loader = true;
      if (!history.state.isNewRecord || (typeof this.editDeviceObj === "object" && this.editDeviceObj._id)) {
        if (this.checkKeyPassPhraseLength(addDeviceObj)) {
          this.managementService.updateDeviceBySubscriber(addDeviceObj).subscribe(
            (res) => {
              if (typeof res === 'object' && res && res['errorCode'] && res['errorMessage']) {
                this.isError = true;
                this.errorMessage = `Error! Fail to update subscriber: ${res['errorMessage']}`;
                this.loader = false;
              } else {
                setTimeout(() => {
                  this.loader = false;
                  this.router.navigate(['/support/netops-management'], { queryParams: { searchText: this.searchText || '' } });
                }, 2000);
              }
            },
            (err) => { this.pageErrorHandle(err); }
          );
        } else {
          this.loader = false;
          this.isError = true;
          this.errorMessage = `Error! WIFI Password incorrect`;
        }
      } else {
        if (this.checkKeyPassPhraseLength(addDeviceObj)) {
          this.managementService.addDevice(addDeviceObj).subscribe(
            (res) => {
              if (res && res['errorCode'] && res['errorMessage']) {
                this.isError = true;
                this.errorMessage = `Error! Fail to update subscriber: ${res['errorMessage']}`;
                this.loader = false;
              } else {
                setTimeout(() => {
                  this.loader = false;
                  this.router.navigate(['/support/netops-management'], { queryParams: { searchText: this.searchText || '' } });
                }, 2000);
              }
            },
            (err) => { this.loader = false; this.pageErrorHandle(err); }
          );
        } else {
          this.loader = false;
          this.isError = true;
          this.errorMessage = `Error! WIFI Password incorrect`;
        }
      }
    }
  }

  // checkKeyPassPhraseLength(obj) {
  //   let wifi = obj.provisioningRecord.wifi;
  //   let res = true;
  //   if (wifi) {
  //     let objKeys = Object.keys(wifi);
  //     objKeys.forEach(key => {
  //       if (wifi[key].KeyPassphrase) {
  //         if (wifi[key].KeyPassphrase.length < 8 ||
  //           wifi[key].KeyPassphrase.length > 63) {
  //           res = false;
  //         }
  //       }
  //     })
  //   }
  //   return res;
  // }

  checkKeyPassPhraseLength(addDeviceOb) {
    let obj = addDeviceOb.provisioningRecord?.wifi;
    let res = true;
    if (obj) {
      var tempObj = this.tempWifiObj;
      let objKeys = Object.keys(obj);

      objKeys.forEach(key => {
        if (tempObj) {
          var temp = tempObj[key];
          if ((temp?.securityType == "Basic" && obj[key]?.securityType != "Basic") && obj[key]?.passphrase?.length == 0) {
            res = false;
          }
          else if (temp?.passphrase && obj[key]?.passphrase?.length == 0 && obj[key]?.securityType != "Basic") {
            res = false;
          }
        }

        // if (tempObj) {
        //   var temp = tempObj[key];
        //   if (key != "UNIFIED_PRIMARY_SSID" && temp?.securityType == "Basic" && obj[key]?.securityType != "Basic" && obj[key]?.passphrase?.length == 0) {
        //     res = false;
        //   }
        // }

        if (tempObj) {
          var temp = tempObj[key];
          if (temp?.securityType == "Basic" && obj[key]?.securityType != "Basic") {
            if (obj[key].passphrase?.length < 8 ||
              obj[key].passphrase?.length > 63) {
              res = false;
            }
          }
        }


        if (obj[key]?.passphrase) {
          if (obj[key].passphrase.length < 8 ||
            obj[key].passphrase.length > 63) {
            res = false;
          }
          //let regexp = new RegExp('^[a-zA-Z0-9]+$')
          let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,}$/gm);
          if (!regexp.test(obj[key].passphrase)) {
            res = false;
          }
          if ((/^\s+|\s+$/g.test(obj[key].passphrase))) {
            res = false;
          }
        }
        if (obj[key]?.SSID) {
          if (!new RegExp(SSIDNamePattern).test(obj[key].SSID)) {
            res = false;
          } if (obj[key].SSID.length > 32) {
            res = false;
          }
          // if (!(obj[key]?.securityType)) {
          //   res = false;
          // }
        }
        if (this.editMode) {
          var oldName = tempObj[key]?.name;
          var newName = obj[key].name;
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
  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
  }

  confirmDeleteServicesAssociateWithSbscrbrMsg() {
    this.confirmDeleteServicesAssociateWithSbscrbr = true;
    this.onSaveDeviceInfo();
  }

  staticGroupTypes = {};
  getStaticGroupMemebers() {
    let obj = {};
    this.managementService.getStaticGroupMembers(this.orgId).subscribe(
      (res: any) => {
        if (res) {

          res.forEach((element: any) => {
            obj[element.groupId] = element.type;
          });
        }

        this.staticGroupTypes = obj;
      },
      (err) => { this.pageErrorHandle(err); }
    );

  }

  deviceModels = [];
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

      }
    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }

  wifiSsidMngrStngsValues = {};
  getWifiSsidMngrStngs(obj: any) {
    this.wifiSsidMngrStngsValues = obj;
  }
  getbSmbMode(value: any) {
    this.bSmbMode = value;
  }
  disableComplete(event) {
    this.disableFinishBtn = event;
    this.cd.detectChanges();
  }
  disableNext(event) {
    this.disableNextBtn = event;
  }
  voiceStatusres(event) {
    this.voiceStatus = event;
  }

  patchSystemLoss(lineIndex) {
    let systemTXLoss = this.editDeviceObj.voice.Line[lineIndex].VoiceProcessing.TransmitGain / 10;
    let systemRXLoss = this.editDeviceObj.voice.Line[lineIndex].VoiceProcessing.ReceiveGain / 10;

    if (systemTXLoss === -4 && systemRXLoss === -11) {
      return "ETSI-PSTN";
    } else if (systemTXLoss === -3 && systemRXLoss === -9) {
      return "ANSI";
    } else if (systemTXLoss === -2 && systemRXLoss === -4) {
      return "GR-909";
    } else {
      return 'Manual';
    }
  }

  checkWifiSSIDForBuildKeys(key) {

    if (key == 'X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['2DOT4GHZ_PRIMARY'];
    } else if (key == 'X_CALIX_SXACC_PRIMARY_5GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_PRIMARY'];
    } else if (key == 'X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['2DOT4GHZ_PRIMARY'] && !this.ssoService.acceptGSModel(this.addDeviceObj.device.selectedModel);
    } else if (key == 'X_CALIX_SXACC_GUEST_5GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_GUEST'] && !this.ssoService.acceptGSModel(this.addDeviceObj.device.selectedModel);
    }
    else if (key == 'X_CALIX_SXACC_PRIMARY_6GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['6GHZ_PRIMARY']
    } else if (key == 'X_CALIX_SXACC_GUEST_6GHZ_SSID') {
      return this.wifiSsidMngrStngsValues['6GHZ_GUEST'] && !this.ssoService.acceptGSModel(this.addDeviceObj.device.selectedModel);
    }
    else if (key == 'UNIFIED_PRIMARY_SSID') {
      return this.wifiSsidMngrStngsValues['5GHZ_PRIMARY'];
    }
    return false;
  }

  getSubscriberServices() {
    this.isPRConfiguredOutside = false;
    let selectedDeviceInfo = JSON.parse(this.managementService.getSelectedDeviceInfo());
    let subsciberId = (this.subscriberInfo?.subscriberId) ? this.subscriberInfo?.subscriberId : (selectedDeviceInfo?.editDeviceObj?.subscriberId) ? selectedDeviceInfo?.editDeviceObj?.subscriberId : '';
    if (!subsciberId) return;
    this.subServicesSubscription = this.managementService.getSubscriberServices(subsciberId).subscribe((res: any[]) => {
      if (res) {
        res.forEach((el) => {
          if (el.activate) {
            this.isPRConfiguredOutside = true;
          }
        });
      }
    },
      (err: HttpErrorResponse) => {
      })
  }
  editDevice(deviceInfo: any, deviceId, opModeWithOnt = '') {
    this.managementService.getDeviceInfo(this.orgId, deviceId).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: res, searchText: this.searchText || '', isProvision: this.isProvision } });

        } else {
          this.service.getDeviceInfo(deviceId).subscribe((json: any) => {
            let prObj = {
              "wifi": {},
              // "orgId": this.orgId,
              "opMode": (json && json.opMode) ? json.opMode : '',
              "deviceId": deviceId,
              "modelName": (json && json.modelName) ? json.modelName : '',
              "subscriberId": deviceInfo.subscriberId,
              "opModeWithOnt": opModeWithOnt,
              "staticGroupMember": []
            };
            this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: prObj, searchText: this.searchText || '', isProvision: this.isProvision } });
          }, (err: any) => {
            let prObj = {
              "wifi": {},
              // "orgId": this.orgId,
              "opMode": "",
              "deviceId": deviceId,
              "modelName": "",
              "subscriberId": deviceInfo.subscriberId,
              "opModeWithOnt": opModeWithOnt,
              "staticGroupMember": []
            };
            this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: prObj, searchText: this.searchText || '', isProvision: this.isProvision } });
          });
        }

      },
      (err) => { this.pageErrorHandle(err); }
    );
  }
}
