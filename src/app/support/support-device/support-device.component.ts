import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../data.service';
import { IssuesService } from '../support-overview/services/issues.service';
import { SupportWifiService } from '../support-wifi/services/support-wifi.service';
import { DeviceService } from './service/device.service';
import { Router } from '@angular/router'
import { SupportRouterService } from '../support-system/support-router/services/support-router.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import _ from 'lodash';
import { bool } from 'aws-sdk/clients/signer';

@Component({
  selector: 'app-support-device',
  templateUrl: './support-device.component.html',
  styleUrls: ['./support-device.component.scss'],
  // changeDetection : ChangeDetectionStrategy.OnPush,
})
export class SupportDeviceComponent implements OnInit, AfterViewChecked {
  loading: boolean;
  language: any;
  languageSubject;
  devices;
  isDeviceTable = true;
  tabVisible: any = 1;
  orgId: any;
  RGData: any = [];
  deviceData: any = [];
  deviceList: any = [];
  routerSerialNumber = '';
  message;
  serialNo = 0;
  hostname;
  deviceDetail;
  selectedDevice: any;
  selectedDeviceFSAN: any;
  Lanconnect: boolean = false;
  txrxtabcheck: boolean = false;
  Connectionlist = [];
  ssid = [];
  datacopy = [];
  error: boolean = false;
  ErrorMsg: any;
  status: any;
  icon: any;
  bytes: number;
  onboard: boolean;
  DeviceCount: any;
  connection = "All";
  ssidDrop = "All";
  offline = "All";
  a = `<img src='assets/img/outline-warning-orange.svg'>`;
  Lan: any;
  currentTime: any;
  REDICON: boolean = false;
  IserialNumber: any = " ";
  ImacAddress: any;
  dhyRW: boolean = false;
  disabletab = false;
  isOnlineNow = history?.state?.is_online_now
  rmode;
  showSteering: boolean = false;
  totalissues: any;
  apiCallDone: boolean;
  deviceCountDone: boolean;
  qoeSupported: boolean = false;
  hostNameState;
  scope: any = {
    qoeRead: false
  };
  showQOE: any;
  showClientEfficiency: string = '';

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtInstance: DataTables.Api;
  tableOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 20,
    // searching: true,
    // responsive: true,
    serverSide: false,
    processing: true,
    dom: 'tipr',
    ordering: false,
    // columnDefs: [
    //   { targets: '_all', orderable: false },
    // ],
  };

  devicePageLoaded = false;
  qoeSubscribed: any;
  showNoData = false;
  constructor(
    private translateService: TranslateService,
    public ssoAuthService: SsoAuthService,
    private deviceService: DeviceService,
    private api: SupportWifiService,
    private service: DataServiceService,
    private issuseservice: IssuesService,
    private router: Router,
    private routerService: SupportRouterService,
    private titleService: Title,
    private chRef: ChangeDetectorRef) {
    let url = this.router.url;
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'DEVICE', url, 'Device page loaded');
    sessionStorage.setItem('exosVersion', null);
    this.ssoAuthService.checkExosModel("21.2");
  }
  isExosModel: boolean = false;
  dtOptions: DataTables.Settings = {};
  isDevEnv = false;
  ngOnInit(): void {
    this.isDevEnv = this.ssoAuthService.API.includes('dev');
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['devices']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.tableLanguageOptions();
    });
    this.titleService.setTitle(`${this.language['devices']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    // let onboarded = sessionStorage.getItem('calix.routerOnboard') == 'true' ? true : false;
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    // this.showClientEfficiency = this.ssoAuthService.exosVersionCheck('21.3') && onboarded && !fduser;
    // this.showClientEfficiency = this.ssoAuthService.exosVersionCheck('21.3') && !fduser;
    // this.ssoAuthService.EfficiencyScore.subscribe(value => this.showClientEfficiency = (value == 'ClientEfficiencyScore') ? true : false);
    this.ssoAuthService.isExosModel.subscribe((res: boolean) => {
      this.isExosModel = res
    });
    this.qoeCheck();

    this.isDeviceTable = true;
    this.dtOptions = {
      paging: false,
      info: false,
      columnDefs: [{
        "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
        "orderable": false,
      }],
      searching: false
    };

    this.orgId = this.ssoAuthService.getOrgId();
    this.deviceData = JSON.parse(sessionStorage.getItem(`${this.ssoAuthService.getTabId()}calix.deviceData`));
    if (this.deviceData?.filter(obj => obj._id).length == 0) return;
    this.loading = true;
    this.getFeatureProperties();//to check supported columns and init the device data;
    // this.chRef.checkNoChanges();
  }

  ngAfterViewChecked(): void {
    if (this.deviceList.length == 0) {
      setTimeout(() => {
        this.devicePageLoaded = true;
      }, 5000);
      this.deviceList = [];
      // this.rerender();
      this.showNoData = true;
    }
    this.chRef.detectChanges();
  }

  getFeatureProperties() {
    this.showClientEfficiency = "";
    let orgId = this.ssoAuthService.getOrgId();
    let serialNo = JSON.parse(window.sessionStorage.getItem(`calix.deviceData`))?.filter(obj => obj.opMode == "RG")[0]?.serialNumber;
    let meshSN = (JSON.parse(window.sessionStorage.getItem(`calix.deviceData`)) || [])[0]?.serialNumber;
    let result = this.service.getMetaData(serialNo ? serialNo : meshSN);
    if (result) {
      if (result.hasOwnProperty('ClientEfficiencyScore') || result.hasOwnProperty('WifiScore')) {
        this.showClientEfficiency = (result['ClientEfficiencyScore']?.supported) ? 'ClientEfficiencyScore' : (result['WifiScore']?.supported) ? 'WifiScore' : '';
      }
      this.initDataLoad();//this will load the data
      return;
    }
    if (serialNo && orgId) { // it executes only if we have serial number
      this.service.fetchMetaData(orgId, serialNo).subscribe((res: any) => {
        if (res) {
          res?.properties?.filter(obj => {
            if ((obj?.featureName == 'ClientEfficiencyScore' || obj?.featureName == 'WifiScore') && obj?.supported) {
              this.showClientEfficiency = obj?.featureName;
            }
          })
          this.initDataLoad();//this will load the data
        }
        // this.chRef.detectChanges();
      })
    }
  }

  initDataLoad() {
    if (history?.state?.isDataModel != true)
      this.getAllDevices();
    // if (sessionStorage.getItem(`${this.ssoAuthService.getTabId()}calix.routerOnboard`) == 'true')
    //   this.onboard = true;
    // else
    //   this.onboard = false;

    if (history?.state?.isDataModel == true) {
      this.rmode = history?.state?.allDeviceissues;
      this.totalissues = history?.state?.allDeviceissues;
      //this.REDICON = history.state.ssR ? history.state.ssR : false;
      this.IserialNumber = history?.state?.serialNumber;
      this.ImacAddress = history?.state?.macAddress;

      //this.dhyRW = history.state.dhyRW ? history.state.dhyRW : false;
      //this.rmode = history.state.rmode ? history.state.rmode : false;

      /* Added in behalf of Sathish */
      this.selectedDevice = {};
      this.selectedDevice.MACAddress = this.ImacAddress;
      this.selectedDeviceFSAN = this.IserialNumber;

      for (var element of this.deviceData) {
        if (element.opMode === "RG") {
          this.RGData = element;
        }
      }
      // let Device = this.deviceData.filter(obj => {
      //   obj.serialNumber.indexOf(this.IserialNumber)
      //   return obj;
      // })
      this.deviceService.getdevices(this.IserialNumber, this.orgId)
        .subscribe(data => {
          this.deviceList = data;
          this.dtTrigger.next();
          this.datacopy = this.deviceList;
          this.SsidandConFilter();
          this.sortinalphbet();
          //this.loading = false;
          this.callsecong();
          // sort((a, b) => (a["Connection"] || "").toString().localeCompare((b["Connection"] || "").toString()));
          this.deviceService.getDeviceDetails(this.orgId, this.IserialNumber, this.ImacAddress)
            .subscribe((data: any) => {
              this.deviceDetail = data;


              //this.deviceDetail['Client-efficiency-score'] = this.deviceList[0]['Client-efficiency-score'];
              this.Lan = this.deviceDetail["Connection-type"];
              for (var element of this.datacopy) {
                if (element.HostName === this.deviceDetail.HostName) {
                  this.deviceDetail['Client-efficiency-score'] = element["Client-efficiency-score"];
                  break;
                }
              }
              let Model, manufacture;
              for (var element of this.deviceData) {
                if (element.serialNumber === this.selectedDeviceFSAN) {
                  Model = element.modelName;
                  manufacture = element.manufacturer;
                  break;
                }
              }
              let productClasscheck = this.deviceDetail ? this.deviceDetail['AccessPointDeviceInfo']?.productClass : " "
              // if (manufacture == 'Calix') {
              if (['GigaSpire', 'GigaPoint', 'GigaMesh', 'GigaPro'].includes(productClasscheck)) { //productclass = GS || GM 
                this.txrxtabcheck = true
                this.showSteering = false;
                if (this.deviceDetail["Connection-type"] != 'LAN') //wifi
                {
                  this.Lanconnect = true; //signalstrength
                }
                else
                  this.Lanconnect = false;
              } else {
                // if (this.deviceDetail["Connection-type"] != 'LAN' && this.onboard == true) {
                if (this.deviceDetail["Connection-type"] != 'LAN') {
                  this.Lanconnect = true;
                  this.txrxtabcheck = true
                  this.showSteering = false;
                }
                else {
                  this.Lanconnect = false;
                  this.txrxtabcheck = false
                  if (this.deviceDetail["Connection-type"] != 'LAN')
                    this.showSteering = true;
                  else
                    this.showSteering = false;
                }
              }

              this.loading = false;
              this.devicePageLoaded = true;
              this.isDeviceTable = false;
            },
              (err) => {
                this.loading = false;
                this.devicePageLoaded = true;
                this.ErrorMsg = err;
              });
        }, (err) => {
          this.loading = false;
          this.devicePageLoaded = true;
        });
    }
    if (this.deviceData?.length == 0) {
      this.loading = false;
      this.devicePageLoaded = true;
    }
    this.currentTime = (new Date().getTime());
    this.totalissues = this.issuseservice.getDeviceIssues();
    this.rmode = this.issuseservice.getDeviceIssues();
    this.apiCallDone = true;
  }

  historyclose() {
    history.state.endTime = false;
    history.state.stationMac = false;
    history.state.period = false;
    this.getAllDevices('refresh');
  }
  callsecong() {
    let onlineDevices = [];
    this.datacopy.forEach(element => {
      if (element.Status == 'online')
        onlineDevices.push(element);
    });
    this.DeviceCount = onlineDevices ? onlineDevices?.length : 0;
    this.service.setDeviceTabCount(this.DeviceCount);
    let tabInfo = this.service.getSubscriberTabInfoData() ? this.service.getSubscriberTabInfoData() : '';
    tabInfo.networkStatus.lanHostsList.connectedDeviceCount = this.DeviceCount;
    this.service.setSubscriberTabInfoData(tabInfo);
    if (this.deviceCountDone == true)
      this.deviceCountDone = false;
    else
      this.deviceCountDone = true;

    let sn = [];
    let serialNumber = history?.state?.serialNumber;
    this.deviceList.forEach(element => {
      if (element.AccessPointSerialNumber == serialNumber) {
        sn.push(element);
      }
    });
    if (sn.length) {
      this.status = sn[0].status;
      this.icon = sn[0]["Client-type"];
      this.hostname = sn[0].HostName;
      let macAddress = sn[0].MACAddress;
    }

  }
  getAllDevices(refresh?: any) {

    if (refresh) {
      this.totalissues = this.issuseservice.getDeviceIssues();
      this.rmode = this.issuseservice.getDeviceIssues();
    }
    let deviceHit: any = {};
    if (this.deviceData) {
      for (var element of this.deviceData) {
        if (history?.state?.stationMac == element.macAddress) {
          deviceHit = element;
        } else {
          if (element.opMode === "RG") {
            deviceHit = element;
            break;
          } else if (element.opMode && element.opMode.includes("WAP")) {
            this.loading = false;
            this.devicePageLoaded = true;
            this.devicePageLoaded = true;
            deviceHit = element;
          }
        }

      }
    }
    if (deviceHit.opMode) {
      this.RGData = deviceHit;
      //this.deviceService.getdevices(element.serialNumber, this.orgId, element.modelName, element.softwareVersion)
      this.loading = true;
      this.deviceService.getdevices(deviceHit.serialNumber, this.orgId, refresh)
        .subscribe((data: any) => {
          this.deviceList = data || [];
          this.datacopy = this.deviceList;
          this.sortinalphbet();
          this.loading = false;
          this.devicePageLoaded = true;
          this.onLoadTime = false;
          if (refresh == 'refresh') {
            this.deviceList = data || [];
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.clear().draw();
            })
          } else {
            this.deviceList = data || [];
            this.dtTrigger.next();
          }
          if (this.deviceService.efficiencyChart == true) {

            let routerMac = history?.state?.routerMac;
            let stationMac = history?.state?.stationMac;
            let index = this.deviceList.findIndex(el => el.MACAddress === stationMac);
            if (index !== -1) {
              this.deviceSelected(index);
            } else {
              if (history?.state?.stationMac) {
                this.deviceList.push({
                  'AccessPointSerialNumber': "",
                  'Status': "",
                  'Client-type': "",
                  'HostName': history?.state?.stationMac,
                  'Connection': ""
                });
                this.deviceSelected(this.deviceList.length - 1);
              }
            }

          }

          let onlineDevices = [];
          data.forEach(element => {
            if (element.Status == 'online')
              onlineDevices.push(element);
          });
          this.SsidandConFilter();
          this.sort();
          this.DeviceCount = onlineDevices ? onlineDevices.length : 0;
          this.service.setDeviceTabCount(this.DeviceCount);
          let tabInfo = this.service.getSubscriberTabInfoData() ? this.service.getSubscriberTabInfoData() : '';
          if (tabInfo) {
            tabInfo.networkStatus.lanHostsList.connectedDeviceCount = this.DeviceCount;
            this.service.setSubscriberTabInfoData(tabInfo);
            if (this.deviceCountDone == true)
              this.deviceCountDone = false;
            else
              this.deviceCountDone = true;
          }
          if (refresh) this.custom_sort('', '');
          this.onLoadTime = false;
          // this.DeviceCount = this.deviceList.length;

        }, (err) => {
          this.loading = false;
          this.devicePageLoaded = true;
          this.onLoadTime = false;
          this.ErrorMsg = err;
          if (refresh) this.custom_sort('', '');
        });
    }
    else {
      this.devicePageLoaded = false;
    }

    if (!refresh) {
      this.connection = "All";
      this.ssidDrop = "All";
    }
    if (refresh) this.custom_sort('', '');
    this.devicePageLoaded = true;

  }
  sortinalphbet() {
    let a = [];
    let b = [];
    this.deviceList.forEach(obj => {
      if (obj.Status == 'online') {
        a.push(obj);
      }
      else
        b.push(obj);
    });
    a.sort((a, b) => (a["Connection"] || "").toString().localeCompare((b["Connection"] || "").toString()));
    b.sort((a, b) => (a["Connection"] || "").toString().localeCompare((b["Connection"] || "").toString()));
    this.deviceList = [...a, ...b];
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.qoeSubscribed) this.qoeSubscribed.unsubscribe();
  }
  deviceStatus(status) {
    if (status === 'offline')
      return '( offline )';
  }
  BytesConvert(byte, decimals = 2) {
    if (byte === 0) return 0;  //'0 Bytes' 0.0009765625;
    //return (byte * 0.000977).toFixed(decimals);
    return parseFloat((byte / Math.pow(1024, 1)).toFixed(decimals))
  }


  deviceSelected(i) {
    this.disabletab = false;
    this.tabVisible = 1;
    this.selectedDevice = this.deviceList[i];
    this.selectedDeviceFSAN = this.deviceList[i]?.AccessPointSerialNumber;
    this.status = this.deviceList[i].Status;
    this.icon = this.deviceList[i]["Client-type"];
    this.hostname = this.deviceList[i].HostName;
    this.Lan = this.deviceList[i].Connection;
    let Model, manufacture;
    for (var element of this.deviceData) {
      if (element.serialNumber === this.selectedDeviceFSAN) {
        Model = element.modelName;
        manufacture = element.manufacturer;
        break;
      }
    }

    /*if (manufacture == 'Calix') {
      if (Model.indexOf("GS") == 0) {
        this.txrxtabcheck = true;
        this.showSteering = false;
        if (this.deviceList[i].Connection != 'LAN')
          this.Lanconnect = true;
        else
          this.Lanconnect = false;
      } else {
        // if (this.deviceList[i].Connection != 'LAN' && this.onboard == true) {
        if (this.deviceList[i].Connection != 'LAN') {
          this.Lanconnect = true;
          this.txrxtabcheck = true;
          this.showSteering = false;
        }
        else {
          this.Lanconnect = false;
          this.txrxtabcheck = false;
          if (this.deviceList[i].Connection != 'LAN')
            this.showSteering = true;
          else
            this.showSteering = false;
        }
      }
    /*} else {
      // if (this.onboard == true) {
      //   this.Lanconnect = true;
      //   this.showSteering = false;
      // }
      // else {
      //   this.Lanconnect = false;
      //   this.showSteering = false;
      // }
      this.txrxtabcheck = false;
      this.Lanconnect = false;
      this.showSteering = false;
    }*/



    if (this.deviceList[i].MACAddress) {
      this.loading = true;
      this.deviceService.getDeviceDetails(this.orgId, this.RGData.serialNumber, this.deviceList[i].MACAddress)
        .subscribe((data: any) => {
          this.deviceDetail = data;
          this.deviceDetail['Client-efficiency-score'] = this.deviceList[i]['Client-efficiency-score'];
          this.loading = false;
          this.devicePageLoaded = true;
          this.isDeviceTable = false;
          let productClasscheck = this.deviceDetail ? this.deviceDetail['AccessPointDeviceInfo']?.productClass : " "
          // if (manufacture == 'Calix') {
          if (['GigaSpire', 'GigaPoint', 'GigaMesh', 'GigaPro'].includes(productClasscheck)) { //productclass = GS || GM 

            this.txrxtabcheck = true;
            this.showSteering = false;
            if (this.deviceList[i].Connection != 'LAN')
              this.Lanconnect = true;
            else
              this.Lanconnect = false;
          } else {
            // if (this.deviceList[i].Connection != 'LAN' && this.onboard == true) {
            if (this.deviceList[i].Connection != 'LAN') {
              this.Lanconnect = true;
              this.txrxtabcheck = true;
              this.showSteering = false;
            }
            else {
              this.Lanconnect = false;
              this.txrxtabcheck = false;
              if (this.deviceList[i].Connection != 'LAN')
                this.showSteering = true;
              else
                this.showSteering = false;
            }
          }
          if (this.deviceService.efficiencyChart == true) {
            this.tabVisible = 5;
            this.deviceService.efficiencyChart = false;
          }
        },
          (err) => {
            this.deviceDetail = {};

            this.isDeviceTable = false;
            this.loading = false;
            this.devicePageLoaded = true;
          });
    } else {
      this.loading = false;
      this.devicePageLoaded = true;
      this.deviceDetail = {};
      // this.deviceDetail['Client-efficiency-score'] = history?.state?.eff_score;
      this.deviceDetail['Hostname'] = history?.state?.stationMac
      this.hostNameState = this.deviceDetail['Hostname']
      this.deviceService.efficiencyChart = false;
      this.tabVisible = 5;
      this.deviceList.slice(0, i);
      this.isDeviceTable = this.deviceDetail['Hostname'] ? false : true;
      let tempIsOnlineNow = this.isOnlineNow
      if (this.isOnlineNow) {
        tempIsOnlineNow = this.isOnlineNow
      }


      if (tempIsOnlineNow == undefined) {
        this.disabletab = false;
      } else if (tempIsOnlineNow != true) {
        this.disabletab = true;
      }
      else {
        this.disabletab = false;
      }
      //this.Lanconnect = true;
      //this.txrxtabcheck = true;

    }
    // if(this.deviceService.efficiencyChart==true){
    //   this.tabVisible=5;
    // }
  }

  onDeviceClick() {
    this.deviceList = this.datacopy;
    this.isDeviceTable = true;
    // this.devicePageLoaded  = true;
    this.connection = "All";
    this.ssidDrop = "All";
    this.offline = "All";
    this.sortinalphbet();
    this.rerender();
    this.custom_sort('', '');
  }
  snr(number) {
    if (Number.isInteger(number)) {
      return number;
    }
    else
      return number.toFixed(2);
  }
  sort(onClick?) {
    this.deviceList = [];
    let tempArr = [];
    if (this.connection == "All" && this.ssidDrop == "All" && this.offline == "All") {
      if (onClick) {
        // this.onLoadTime = true;
        this.getAllDevices('refresh');
        return;
      } else {
        this.deviceList = this.datacopy;
      }
    }
    else if (this.offline == "All") {

      if (this.connection == "All" && this.ssidDrop != "All") {
        this.datacopy.forEach(obj => {
          if (obj.SSID == this.ssidDrop) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop == "All") {
        this.datacopy.forEach(obj => {
          if (obj.Connection == this.connection) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop != "All") {
        this.datacopy.forEach(element => {
          if (element.Connection == this.connection && element.SSID == this.ssidDrop) {
            this.deviceList.push(element)
          }
        });
      }


    }
    else if (this.offline == "Online") {
      this.deviceList = [];
      tempArr = this.datacopy.filter(data => data.Status === "online");
      if (this.connection == "All" && this.ssidDrop == "All")
        this.deviceList = this.datacopy.filter(data => data.Status === "online");
      else if (this.connection == "All" && this.ssidDrop != "All") {
        tempArr.forEach(obj => {
          if (obj.SSID == this.ssidDrop) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop == "All") {
        tempArr.forEach(obj => {
          if (obj.Connection == this.connection) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop != "All") {
        tempArr.forEach(element => {
          if (element.Connection == this.connection && element.SSID == this.ssidDrop) {
            this.deviceList.push(element)
          }
        });
      }
    }
    else if (this.offline == "Offline") {
      this.deviceList = [];
      tempArr = this.datacopy.filter(data => data.Status === "offline");
      if (this.connection == "All" && this.ssidDrop == "All")
        this.deviceList = this.datacopy.filter(data => data.Status === "offline");
      else if (this.connection == "All" && this.ssidDrop != "All") {
        tempArr.forEach(obj => {
          if (obj.SSID == this.ssidDrop) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop == "All") {
        tempArr.forEach(obj => {
          if (obj.Connection == this.connection) {
            this.deviceList.push(obj)
          }
        });
      }
      else if (this.connection != "All" && this.ssidDrop != "All") {
        tempArr.forEach(element => {
          if (element.Connection == this.connection && element.SSID == this.ssidDrop) {
            this.deviceList.push(element)
          }
        });
      }
    }
    // this.tableOptions.order = this.showClientEfficiency ? [6, 'asc'] : [7, 'asc'];
    this.rerender();
    this.custom_sort('', '');
    this.sortinalphbet();
  }
  iconimage(type, status) {
    let type1 = parseInt(type);
    let image;
    switch (type1) {
      case 0: return image = status == 'offline' ? './assets/images/deviceicons/question_mark_grey_icon.png' : './assets/images/deviceicons/question_mark_blue_icon.png';
      case 1: {
        return image = status == 'offline' ? './assets/images/deviceicons/phone_grey_icon.png' : './assets/images/deviceicons/phone_blue_icon.png';
      }
      case 2: {
        return image = status == 'offline' ? './assets/images/deviceicons/computer_grey_icon.png' : './assets/images/deviceicons/computer_blue_icon.png';
      }
      case 3: {
        return image = status == 'offline' ? './assets/images/deviceicons/console_grey_icon.png' : './assets/images/deviceicons/console_blue_icon.png';
      }
      case 4: {
        return image = status == 'offline' ? './assets/images/deviceicons/media_player_grey_icon.png' : './assets/images/deviceicons/media_player_blue_icon.png';
      }
      case 5: {
        return image = status == 'offline' ? './assets/images/deviceicons/printer_grey_icon.png' : './assets/images/deviceicons/printer_blue_icon.png';
      }
      case 6: {
        return image = status == 'offline' ? './assets/images/deviceicons/television_grey_icon.png' : './assets/images/deviceicons/television_blue_icon.png';
      }
      case 7: {
        return image = status == 'offline' ? './assets/images/deviceicons/network_icon_grey.png' : './assets/images/deviceicons/network_blue_icon.png';
      }
      case 8: {
        return image = status == 'offline' ? './assets/images/deviceicons/camera_grey_icon.png' : './assets/images/deviceicons/camera_blue_icon.png';
      }
      case 9: {
        return image = status == 'offline' ? './assets/images/deviceicons/tablet_grey_icon.png' : './assets/images/deviceicons/tablet_blue_icon.png';
      }
      case 10: {
        return image = status == 'offline' ? './assets/images/deviceicons/voip_grey.png' : './assets/images/deviceicons/voip_blue.png';
      } case 11: {
        return image = status == 'offline' ? './assets/images/deviceicons/iot_grey.png' : './assets/images/deviceicons/iot_blue.png';
      }
      case 30: {
        return image = status == 'offline' ? './assets/images/deviceicons/ic_modem-24px.svg' : './assets/images/deviceicons/ic_modem_grey.png';
      }
      default:
        {
          return image = status == 'offline' ? './assets/images/deviceicons/question_mark_grey_icon.png' : './assets/images/deviceicons/question_mark_blue_icon.png';

        }

    }

  }

  kbpsTO(val, valueOnly?, unitOnly?) {
    let kbpsString = this.api.kbpsTO(val, valueOnly, unitOnly);
    return kbpsString;
  }

  SignalStrength(type, status) {
    let type1 = parseInt(type);
    let image;
    if (status == 'online') {
      if (type1 >= -50)
        return image = './assets/images/SignalIcons/signal_bar_icon.png';
      else if (type1 >= -66 && type1 <= -51)
        return image = './assets/images/SignalIcons/signalstrength04.png';
      else if (type1 >= -69 && type1 <= -67)
        return image = './assets/images/SignalIcons/signalstrength03.png';
      else if (type1 >= -79 && type1 <= -70)
        return image = './assets/images/SignalIcons/signalstrength02.png';
      else if (type1 <= -80)
        return image = './assets/images/SignalIcons/signalstrength01.png';
    }
    else {
      if (type1 >= -50)
        return image = './assets/images/signalstrength_grey/05.png';
      else if (type1 >= -66 && type1 <= -51)
        return image = './assets/images/signalstrength_grey/04.png';
      else if (type1 >= -69 && type1 <= -67)
        return image = './assets/images/signalstrength_grey/03.png';
      else if (type1 >= -79 && type1 <= -70)
        return image = './assets/images/signalstrength_grey/02.png';
      else if (type1 <= -80)
        return image = './assets/images/signalstrength_grey/01.png';
    }

  }
  responseFromStatus(flag) {
    this.totalissues = this.issuseservice.getDeviceIssues();
    this.rmode = this.issuseservice.getDeviceIssues();
    this.devicePageLoaded = flag;
  }
  totalsymbol(serialno, place) {
    if (this.totalissues) {
      for (var element of this.totalissues) {
        if (element.serialNumber == serialno) {
          if (element.warning == place) {
            switch (element.warning) {
              case 'ssR': if (place == 'ssR') return 'ssR';
              case 'dhyRW': if (place == 'dhyRW') return 'dhyRW';
              case 'rmode': if (place == 'rmode') return 'rmode';
              case 'LES': if (place == 'LES') return 'LES';
              default: return "";
            }
          }

        }
      }
    }
    else return false;

  }

  SsidandConFilter() {
    this.datacopy = this.deviceList;
    this.deviceList.forEach(element => {
      if (element.Connection) {
        this.Connectionlist.push(element.Connection);
      }
      if (element.SSID) {
        this.ssid.push(element.SSID)
      }
    });
    this.Connectionlist = this.Connectionlist.filter(
      function (x, i, a) {
        return a.indexOf(x) === i;
      });
    this.ssid = this.ssid.filter(
      function (x, i, a) {
        return a.indexOf(x) === i;


      });
  }

  qoeCheck() {
    this.qoeSubscribed = this.service.showQoe.subscribe(flag => {
      this.showQOE = flag;
    });
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
    }
    else if (this.language.fileLanguage == 'en') {
      this.tableOptions.language = this.translateService.en;
    }
    this.rerender();
  }

  rerender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  asc_Order: boolean = true;
  sortedColumn = '';
  deviceListCopy: any;
  onLoadTime = false;

  custom_sort(selectedField?, newColumn?) {
    let tempDeviceList = [];
    this.deviceListCopy = this.deviceList;

    if (this.sortedColumn != newColumn && this.sortedColumn != '') this.asc_Order = true;

    if (this.sortedColumn != newColumn && this.sortedColumn != '' && this.sortedColumn != 'EfficiencyHeader') {
      if (document.getElementById(this.sortedColumn)?.className?.includes('sorting_asc')) document.getElementById(this.sortedColumn)?.classList?.remove('sorting_asc');
      else if (document.getElementById(this.sortedColumn)?.className?.includes('sorting_desc')) document.getElementById(this.sortedColumn)?.classList?.remove('sorting_desc');
    }

    if (this.sortedColumn == 'EfficiencyHeader' && newColumn !== 'EfficiencyHeader') {
      if (document.querySelector('.' + this.sortedColumn)?.className?.includes('sorting_asc')) document.querySelector('.' + this.sortedColumn)?.classList?.remove('sorting_asc');
      else if (document.querySelector('.' + this.sortedColumn)?.className?.includes('sorting_desc')) document.querySelector('.' + this.sortedColumn)?.classList?.remove('sorting_desc');
    }

    this.sortedColumn = newColumn;

    let slectedHead = (newColumn == 'EfficiencyHeader') ? document.querySelector('.' + newColumn) : document.getElementById(newColumn);

    if (this.asc_Order) {
      if (slectedHead?.className?.includes('sorting_desc')) slectedHead?.classList?.remove('sorting_desc');
      slectedHead?.classList?.add('sorting_asc');
    } else {
      if (slectedHead?.className?.includes('sorting_asc')) slectedHead?.classList?.remove('sorting_asc');
      slectedHead?.classList?.add('sorting_desc');
    }

    //sorting
    if (selectedField == 'device' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, (obj) => obj.HostName?.toUpperCase(), ['asc']);
    } else if (selectedField == 'device' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, (obj) => obj.HostName?.toUpperCase(), ['desc']);
    }

    if (selectedField == 'Connection' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Connection'], ['asc']);
    } else if (selectedField == 'Connection' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Connection'], ['desc']);

    }

    if (selectedField == 'Access_Point' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['AccessPointHostName', 'AccessPoint'], ['asc', 'asc']);
    } else if (selectedField == 'Access_Point' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['AccessPointHostName', 'AccessPoint'], ['desc', 'desc']);
    }

    if (selectedField == 'SSID' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['SSID'], ['asc']);
    } else if (selectedField == 'SSID' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['SSID'], ['desc']);
    }

    if (selectedField == 'Mode' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Mode'], ['asc']);
    } else if (selectedField == 'Mode' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Mode'], ['desc']);
    }

    if (selectedField == 'WiFi_Score' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Wifi-score'], ['asc']);
    } else if (selectedField == 'WiFi_Score' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Wifi-score'], ['desc']);
    }

    if (selectedField == 'Signal_Strength' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Signal-strength', 'SNR'], ['asc', 'asc']);
    } else if (selectedField == 'Signal_Strength' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Signal-strength', 'SNR'], ['desc', 'desc']);
    }

    if (selectedField == 'Efficiency Score' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Client-efficiency-score'], ['asc']);
    } else if (selectedField == 'Efficiency Score' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['Client-efficiency-score'], ['desc']);
    }

    if (selectedField == 'Pkts_Dropped' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['DS-packet-drops'], ['asc']);
    } else if (selectedField == 'Pkts_Dropped' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['DS-packet-drops'], ['desc']);
    }

    if (selectedField == 'dsUsPhyRate' && this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['DS-phy-rate', 'US-phy-rate'], ['asc', 'asc']);
    } else if (selectedField == 'dsUsPhyRate' && !this.asc_Order) {
      tempDeviceList = _.orderBy(this.deviceListCopy, ['DS-phy-rate', 'US-phy-rate'], ['desc', 'desc']);
    }

    if (tempDeviceList.length > 1) {
      this.onLoadTime = true;
      this.deviceList = [];
      this.rerender();
      setTimeout(() => {
        this.deviceList = tempDeviceList;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        })
        this.onLoadTime = false;
      }, 0);
      this.chRef.checkNoChanges();
    }
    if (selectedField !== '') this.asc_Order = !this.asc_Order;
  }

}