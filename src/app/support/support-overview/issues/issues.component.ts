import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { IssuesService } from '../services/issues.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { interval, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DataServiceService } from '../../data.service';
import { createTrue } from 'typescript';
import { Title } from '@angular/platform-browser';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  language: any;
  subscription: Subscription;
  languageSubject;
  issueData;
  hoveredIndex;
  hiconplus: string;
  hiconminus: string;
  isIconClicked = [];
  serialNo = [];
  path: string;
  scopeFlag: any = {};
  orgId: string;
  Devices;
  sample = "/support/router";
  stateinfo;
  serialNumber = " "; /// to pass for page redirect
  Description = [];
  severity = [];
  SubscriberId: string;
  isWifi = false;
  macadd: any;
  totalissues: any;
  issueList;
  loading: Boolean = false;
  isqosalert: Boolean = false;
  primaryActionButton = [];
  reason = [];
  allDeviceissues = [];
  clickicon = -1;
  searchText = "";
  severityfilter = "All";
  codelist = ["LATENCY_HIGH", "VIRUS_ATTACK", "CLIENT_DEVICE_LOW_SIGNAL_DETECTED", "CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED", "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED",
    "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED", "REBOOT_ISSUE", "SOFTWARE_UPGRADE_FAILED", "STALE_SOFTWARE_VERSION", "GATEWAY_FAILED",
    "WIFI_RADIO_DISABLED_24G", "WIFI_RADIO_DISABLED_5G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G", "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G", "BACKHAUL_TOO_CLOSE", "BACKHAUL_TOO_FAR", "MESH_DEGRADE", "ATTACK_DETECTED",
    "GATEWAY_FAILED", "WAP_FAILED", "SPEED_LOW_75", "SPEED_LOW_75_80", "TRAFFIC_HIGH", "QOS_DAMP_ALERT", "WIFI_INTERFERENCE_HIGH_24G", "WIFI_INTERFERENCE_HIGH_5G", "DS_SPEED_LOW_85", "US_SPEED_LOW_85", "DS_SPEED_LOW_75", "US_SPEED_LOW_75",
    "SFP_THERMAL_TOO_HIGH", "SFP_THERMAL_HIGH", "ONT_OFFLINE", "GC_MAX_DOWNSTREAM_ACHIEVED", "GC_MAX_UPSTREAM_ACHIEVED", "WFH_SSID_WITHOUT_CIQ", "MAP_CONNECTIVITY_FAILED", "WIFI_RADIO_DISABLED_6G", "NOT_CERTIFIED_AND_SFP_NOT_SUPPORTED", "LAN_DISABLED", "CERTIFIED_BUT_SFP_NOT_SUPPORTED_IN_CURRENT_VERSION",
    "THERMAL_HIGH", "THERMAL_TOO_HIGH", "UI_CREATED_ISSUE_FOR_TR069MAPDOWN", "LOW_ONT_LIGHT_LEVELS", "PON_ERRORS", "LOW_ONT_LEVEL_ISSUE", "ONT_DS_SDBER_ISSUE", "ONT_US_SDBER_ISSUE", "NETWORK_RESILIENCE_ACTIVE_WITH_TR69_CONNECTED", "NETWORK_RESILIENCE_ACTIVE_WITH_TR69_DISCONNECTED", "NETWORK_RESILIENCE_INACTIVE"];
  apiCallDone: boolean = false;
  source: any;
  MODULE: string = 'support';
  scope: any = {
    qoeRead: false,
    topologyRead: false
  };
  isExosModel: boolean = false;
  commandIQDataSubs: Subscription;
  SupportCloud = false;
  opsCloud = false;
  exosModelTemp = {
    "GM1028_h": 85,
    "GS2028E_h": 85,
    "GM1028-2_h": 85,
    "GS2028E-2_h": 85,
    "GM1028_vh": 105,
    "GS2028E_vh": 105,
    "GM1028-2_vh": 105,
    "GS2028E-2_vh": 105,
    "GS2020E_h": 110,
    "GS2026E_h": 110,
    "GS4220E_h": 110,
    "GS4227E_h": 110,
    "GS4220E-2_h": 110,
    "GS4227E-2_h": 110,
    "GS2020E_vh": 135,
    "GS2026E_vh": 135,
    "GS4220E_vh": 135,
    "GS4227E_vh": 135,
    "GS4220E-2_vh": 135,
    "GS4227E-2_vh": 135,
    "GM1020_h": 110,
    "GM1020_vh": 135,
  };
  hasTopology: boolean;
  showTopologyTab = false;
  showQoeTab = false;
  backupWifiStatus = null;
  isSmbOnboarded: any;
  qoeSubscribed: any;
  realtimescope:boolean = false;
  healthAlertsRealtimeScope = false;

  constructor(
    private translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private issuseservice: IssuesService,
    private router: Router, private route: ActivatedRoute,
    private service: DataServiceService,
    private titleService: Title,
    private marketingCommonService: MarketingCommonService,
    private supportWifiService: SupportWifiService,
  ) {
    router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate' && event.url === "/support/netops-management/subscriber-management") {
          this.router.navigateByUrl('/support/netops-management/subscriber-management', { state: { searchText: this.searchText || '' } });
        }
      });
    sessionStorage.setItem('qoeCheck', null);

    let url = this.router.url;
    if (sessionStorage.getItem('stopOverviewActions') != 'true') {
      this.ssoAuthService.setActionLog('CSC', 'pageHit', 'ISSUE', url, 'Issue page loaded');
    }

    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
  }
  isDevEnv = false;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.qoeCheck();
    this.commandIQDataSubs = this.ssoAuthService.commandIQData.subscribe((data: any) => {
      this.scope.qoeRead = true;
      this.qoeCheck();
    });
    this.isDevEnv = this.ssoAuthService.API.includes('dev');
    let devices = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    let deviceInfo: any;
    /* if (devices?.length > 0) {
      deviceInfo = devices.filter(x => x.opMode == "RG");
      if (deviceInfo.length || this.ssoAuthService.acceptGSModel(deviceInfo[0]?.modelName || '')) {
        this.showTopologyTab = true;
        this.showQoeTab = true;
      }
    } */
    let a = "";
    this.route.queryParams.subscribe(params => {
      if (history.state) {
        let srTxt = history.state.searchText ? history.state.searchText : '';
        this.searchText = params['searchText'] || srTxt || history.state?.subscriberId;
      }
    });
    this.issuseservice.setIssues(a);
    this.dtOptions = {
      //pagingType: 'full_numbers'
      paging: false,
      info: false,
      //order:[[0, 'desc']],
      columnDefs: [{
        "targets": [1, 2, 3, 4],
        "orderable": false,
      }],
      searching: false
    };

    this.hiconplus = "fa fa-plus-circle";
    this.hiconminus = "fa fa-minus-circle";
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Issues']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Issues']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    let getSerialNo = this.ssoAuthService.getSerialNo();
    if (getSerialNo != '') {
      this.Devices = JSON.parse(getSerialNo);
    }

    localStorage.setItem('isqosalert', JSON.stringify(this.isqosalert));

    if (this.getScopes()) return;
    this.loading = true;
    // this.getIssues();
    //  this.issueData =[ 
    //    {
    //     code: "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G",
    //     reason: "Reboots detect in the last 3 days is greater than 4",
    //     serialNumber: "CXNK007D3F42",
    //     severity: 0,
    //     source: "CXNK007D3F42",
    //     sourceId: "CXNK007D3F42",
    //     type: "WIFI",
    //    },
    // {
    //  code: "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
    //  reason: "The WAN link is down, no internet service detected",
    //  serialNumber: "CXNK007D3F42",
    //  severity: 0,
    //  source: "CXNK007D3F42",
    //  sourceId: "CXNK007D3F42",
    //  type: "WIFI"},
    //  {
    //  code: "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
    //  reason: "The WAN link is down, no internet service detected",
    //  serialNumber: "CXNK008A79B1",
    //  severity: 0,
    //  source: "CXNK008A79B1",
    //  sourceId: "CXNK008A79B1",
    //  type: "WIFI",
    //  }]
    /* const seconds = interval(60000);
    this.subscription = seconds.subscribe(val => this.getIssuesformin()); */
    //this.getIssuesformin();


    setTimeout(() => {
      this.qoeCheck();
    }, 2000);

    this.service.showTopology.subscribe(flag => {
      this.showTopologyTab = flag;
    });

    setTimeout(() => {
      this.qoeSubscribed = this.service.showQoe.subscribe(flag => {
        this.showQoeTab = flag;
      });
    }, 100);

  }

  qoeCheck() {
    let scopes = this.ssoAuthService.getScopes();
    let validScopes: any = Object.keys(scopes);
    this.scope.qoeRead = false;
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.qoe'] = scopes['cloud.rbac.csc.qoe'] ? scopes['cloud.rbac.csc.qoe'] : [];

      if (scopes && (scopes['cloud.rbac.csc.qoe'] && scopes['cloud.rbac.csc.qoe'].length)) {
        if (scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) this.scope.qoeRead = true;
      }
    } else {
      this.scope.qoeRead = true;
    }

    // let modelName = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData"))[0].modelName : '';
    // let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    // if(this.ssoAuthService.acceptGSModel(modelName)){
    // this.showQoeTab = this.ssoAuthService.exosVersionCheck('21.4') && this.scope.qoeRead && !fduser;
    // sessionStorage.setItem('qoeCheck', this.isExosModel.toString());
    // return sessionStorage.getItem('qoeCheck');
    // }
    // else{
    //   this.showQoeTab = this.scope.qoeRead;
    //   sessionStorage.setItem('qoeCheck', this.isExosModel.toString());
    // return sessionStorage.getItem('qoeCheck');
    // }


    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    this.isExosModel = this.ssoAuthService.exosVersionCheck('21.4') && this.scope.qoeRead;
    sessionStorage.setItem('qoeCheck', this.isExosModel.toString());
    return sessionStorage.getItem('qoeCheck');
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
    if (this.commandIQDataSubs) this.commandIQDataSubs.unsubscribe();
    if (this.qoeSubscribed) this.qoeSubscribed.unsubscribe();
  }
  getScopes() {
    let isDME = this.ssoAuthService.getCscType() == 'DME';
    let scopes = this.ssoAuthService.getScopes();
    let validScopes: any = Object.keys(scopes);

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.topology'] = scopes['cloud.rbac.csc.topology'] ? scopes['cloud.rbac.csc.topology'] : [];

      if (scopes && (scopes['cloud.rbac.csc.topology'] && scopes['cloud.rbac.csc.topology'].length)) {
        if (scopes['cloud.rbac.csc.topology'].indexOf('read') !== -1) this.scope.topologyRead = true;
      }
      
      if(scopes && (scopes['cloud.rbac.coc.issues.systemalarms.realtime']))
      {
        this.realtimescope = true
      }

      if(scopes && (scopes['cloud.rbac.coc.issues.healthalerts.realtime'])) {
        this.healthAlertsRealtimeScope = true;
      }
    } else {
      this.scope.topologyRead = true;
      this.realtimescope = true

    }
    if (isDME && environment.VALIDATE_SCOPE && validScopes) {
      let scopeFlag: any = {};
      for (let i = 0; i < validScopes.length; i++) {
        if (validScopes[i].indexOf('cloud.rbac.csc.services') !== -1) {
          scopeFlag.serviceTabRead = true;
          continue;
        }
        if (validScopes[i].indexOf('cloud.rbac.csc.cpe') !== -1) {
          scopeFlag.routerTabRead = true;
          continue;
        }
        if (validScopes[i].indexOf('cloud.rbac.csc.wifi') !== -1) {
          scopeFlag.wifiRead = true;
          continue;
        }
        if (validScopes[i].indexOf('cloud.rbac.csc.devices') !== -1) {
          scopeFlag.devicesRead = true;
          continue;
        }
      }

      if (scopeFlag.serviceTabRead || scopeFlag.routerTabRead || scopeFlag.wifiRead || scopeFlag.devicesRead) {
        if (scopeFlag.serviceTabRead) { this.router.navigate([`./${this.MODULE}/service`]); }
        else if (scopeFlag.routerTabRead) { this.router.navigate([`./${this.MODULE}/router`]); }
        else if (scopeFlag.wifiRead) { this.router.navigate([`./${this.MODULE}/wifi`]); }
        else if (scopeFlag.devicesRead) { this.router.navigate([`./${this.MODULE}/device`]); }
      } else { this.router.navigate([`./${this.MODULE}/application`]); }
    }
    else if (isDME && (!environment.VALIDATE_SCOPE || !validScopes)) {
      this.router.navigate([`./${this.MODULE}/service`]);
    }

    return isDME;
  }

  getIssues() {
    this.orgId = this.ssoAuthService.getOrgId();
    this.Devices = JSON.parse(this.ssoAuthService.getSerialNo());
    this.SubscriberId = this.ssoAuthService.getCSCSubscriberId();
    this.Devices.forEach(element => {
      if (element.serialNumber) {
        var newElement = {};
        newElement["serialNumber"] = element.serialNumber,
          newElement["opMode"] = element.opMode,
          this.serialNo.push(newElement);
      }


    });

    let data = {
      "subscriberId": this.SubscriberId,
      "devices": this.serialNo

    }
    this.loading = true;
    this.issuseservice.putissues(this.orgId, data).subscribe(data => {
      this.apiCallDone = true;
      this.issueData = data;
      this.issueData = this.issueData.filter(obj => this.codelist.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
      this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? 1 : ((a.severity > b.severity) ? -1 : 0))
      this.issueList = this.issueData
      this.issuseservice.setIssues(this.issueData);
      this.totalissues = this.issueList.length;
      this.initalize();
      this.get();
      this.loading = false;
    }, (err) => {
      this.apiCallDone = true;
      this.loading = false;

    });



    // this.issuseservice.getIssues(this.orgId, this.serialNo, this.SubscriberId).subscribe(data =>{
    //   this.issueData = data;
    //   this.totalissues = this.issueData.length;

    // });
  }
  initalize() {
    for (let i = 0; i < this.totalissues; i++) {
      this.isIconClicked[i] = false;
      this.primaryActionButton[i] = false;
      this.Description[i] = " ";
      this.reason[i] = " ";
      this.severity[i] = " ";
    }

  }


  ReasonDescription(code, data?: any, i?) {
    if (data) {
      this.serialNumber = data ? data.serialNumber : '';
      var source = data ? data.source : "";
      var opMode;
      var modelName;
      var manufacturer;
      this.Devices.forEach(obj => {
        if (obj.serialNumber == this.serialNumber && obj.serialNumber) {
          opMode = obj.opMode;
          modelName = obj.modelName;
          manufacturer = obj.manufacturer;
        }
      });


      this.macadd = data.sourceId ? data.sourceId : ' ';
      if (data.Code)
        code = data.Code.toUpperCase();
      else
        code = data.code.toUpperCase();
    }

    switch (code) {

      case "ATTACK_DETECTED":
      case "VIRUS_ATTACK":
        {
          // link to application
          this.path = "/" + this.MODULE + "/application/protect-iq";
          const containGS = JSON.parse(sessionStorage.getItem(`calix.deviceData`)).filter(obj => {
            if (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoAuthService.acceptGSModel(obj.modelName)) return obj;
          })
          this.stateinfo = { containGS: containGS.length, hasSubscriber: sessionStorage.getItem('calix.subscriberId') };
          if (data.type !== 'DEVICE') {
            this.Description[i] = this.language['Issue_Description1'];
            this.reason[i] = this.language['Issue_Reason1'];
          } else {
            this.Description[i] = this.language['Issue_Description_DEVICE1'];
            this.reason[i] = this.language['Issue_Reason_DEVICE1'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Application"];
        }

      case 'CLIENT_DEVICE_LOW_SIGNAL_DETECTED':
        {

          const onboard = sessionStorage.getItem(`${this.ssoAuthService.getTabId()}calix.routerOnboard`);
          // if (onboard == 'true') {  //signal strenght icon should show red icon
          if (opMode != "RG") {
            if (opMode == "RG")    //historical
              this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
            else
              this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;
            this.stateinfo = {};
            this.reason[i] = this.language['Issue_Reason2'];
            this.Description[i] = this.language['Issue_Description2'];
            this.primaryActionButton[i] = true;
            this.severity[i] = 1;
            return this.language["Go To WiFi"];
          } else {
            this.path = "/" + this.MODULE + "/device";
            this.stateinfo = { serialNumber: this.serialNumber, macAddress: this.macadd, isDataModel: true, ssR: true, allDeviceissues: this.allDeviceissues };
            this.reason[i] = this.language['Issue_Reason_DEVICE2'];
            this.Description[i] = this.language['Issue_Description_DEVICE2'];
            this.primaryActionButton[i] = true;
            this.severity[i] = 1;
            return this.language["Go To Client Detail"];
          }
          // } else {
          //   if (opMode == "RG")    //historical
          //     this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          //   else
          //     this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// this.isWifi= false; In line action to reboot RG
          //   this.stateinfo = { backhaul: true };
          //   this.reason[i] = this.language['Issue_Reason2'];
          //   this.Description[i] = this.language['Issue_Description2'];
          //   this.primaryActionButton[i] = true;
          //   this.severity[i] = 0;
          //   return this.language["Go  To Backhaul"];
          // }
        }
      //case 'CLIENT_DEVICE_LOW_PHY_RATE_DETECTED':
      case 'CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED':
        {
          this.path = "/" + this.MODULE + "/device";
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason3'];
            this.Description[i] = this.language['Issue_Description3'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE3'];
            this.Description[i] = this.language['Issue_Description_DEVICE3'];
          }
          this.stateinfo = { serialNumber: this.serialNumber, macAddress: this.macadd, isDataModel: true, dhyRW: true, allDeviceissues: this.allDeviceissues };
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Client Detail"];
        }
      case 'CLIENT_DEVICE_LOW_PHY_RATE_DETECTED':
        {
          this.path = "/" + this.MODULE + "/device";
          this.reason[i] = this.language['Issue_Reason_new4'];
          this.Description[i] = this.language['Issue_Description_new4'];
          this.stateinfo = { serialNumber: this.serialNumber, macAddress: this.macadd, isDataModel: true, dhyRW: true, allDeviceissues: this.allDeviceissues };
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Client Detail"];
        }
      case 'CLIENT_DEVICE_LEGACY_DEVICE_DETECTED':
        {

          this.path = "/" + this.MODULE + "/device";
          this.stateinfo = { serialNumber: this.serialNumber, macAddress: this.macadd, isDataModel: true, rmode: true, allDeviceissues: this.allDeviceissues };
          if (data.type !== 'DEVICE') {
            this.Description[i] = this.language['Issue_Description4'];
            this.reason[i] = this.language['Issue_Reason4'];
          } else {
            this.Description[i] = this.language['Issue_Description_DEVICE4'];
            this.reason[i] = this.language['Issue_Reason_DEVICE4'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Client Detail"];
        }
      case 'REBOOT_ISSUE':
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['Issue_Reason5'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
            .filter(obj => obj.serialNumber == this.serialNumber)
            .map(obj => obj.opMode);
          const replaceText = (opMode.length && opMode[0] == 'RG' ? opMode[0] : 'Mesh');
          this.Description[i] = this.language['Issue_Description5'].replace(/RG/g, replaceText);
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"].replace('Router', replaceText).replace('Routeur', `Go To ${replaceText}`);
        }
      case 'SOFTWARE_UPGRADE_FAILED':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber, modelName: modelName, isRouter: true };
          if (data.type !== 'Device') {
            this.reason[i] = this.language['Issue_Reason6'];
            this.Description[i] = this.language['Issue_Description6'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE6'];
            this.Description[i] = this.language['Issue_Description_DEVICE6'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      case 'STALE_SOFTWARE_VERSION':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true, modelName: modelName, manufacturer: manufacturer, isUpgrade: true };
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason7'];
            this.Description[i] = this.language['Issue_Description7'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE7'];
            this.Description[i] = this.language['Issue_Description_DEVICE7'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Upgrade Software"];
        }
      case 'WAP_FAILED':
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['Issue_Reason43'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true, isFactoryReset: true };
          this.Description[i] = this.language['Issue_Description43'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Mesh(SAT)"];
        }
      case 'GATEWAY_FAILED':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true, isFactoryReset: true }; // Future link to CCO to check fiber link
          let secondaryWanStatus = {
            reason: '',
            description: ''
          };

          // if (this.isSmbOnboarded && this.backupWifiStatus) {
          //   secondaryWanStatus.reason = (this.backupWifiStatus.running ? this.language['The secondary WAN is up'] : this.language['The secondary WAN is down']) + '.';
          //   secondaryWanStatus.description = (this.backupWifiStatus.running ? 
          //     this.language['The Network Resilience interface is up and running'] : 
          //     this.language['The Network Resilience interface is configured but it is not running. Ensure that the mobile device or hotspot associated is powered on and in range'])
          //     + '.';
          // }

          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason44'] + ' ' + secondaryWanStatus.reason;
            this.Description[i] = this.language['Issue_Description44'] + ' ' + secondaryWanStatus.description;
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE11'] + ' ' + secondaryWanStatus.reason;
            this.Description[i] = this.language['Issue_Description_DEVICE11'] + ' ' + secondaryWanStatus.description;
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      case "SPEED_LOW_75_80":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason12'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description12'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Speed Test"];
        }
      case "SPEED_LOW_75":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason13'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description13'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Speed Test"];
        }
      case "TRAFFIC_HIGH":
        {
          let subscriber = this.service.getStoredSubscriberInfo();
          // "/marketing/insights/" + this.ssoAuthService.getCSCSubscriberId() + "/" + (subscriber?.name ? subscriber.name : " ");
          this.path = '/' + this.MODULE + '/insights';
          this.reason[i] = this.language['Issue_Reason14'];
          this.stateinfo = { id: this.ssoAuthService.getCSCSubscriberId(), value: "", isCSCResult: true }; // Upsell if possible - Service /data page link - Future which client is using the most data
          this.marketingCommonService.setCSCtrueOrFalse(true)
          this.marketingCommonService.setSubscriberID(this.ssoAuthService.getCSCSubscriberId());
          this.Description[i] = this.language['Issue_Description14'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          if (!this.ssoAuthService.getEntitlements()[119]) data.isValid = false
          return this.language["Go To Upsell"];
        }
      case "LATENCY_HIGH":
        {
          this.path = "/" + this.MODULE + "/service/data";
          this.reason[i] = this.language['Issue_Reason15'];
          this.stateinfo = { serialNumber: this.serialNumber, islatency: true }; // Check state of WAN link - Future CCO to figure out what is happening north bound
          this.Description[i] = this.language['Issue_Description15'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Latency"];
        }
      case 'WIFI_INTERFERENCE_HIGH_24G':
        {
          if (opMode == "RG")    //historical
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;
          this.stateinfo = { Radiodisable2g: true };
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason17'];
            this.Description[i] = this.language['Issue_Description17'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE17'];
            this.Description[i] = this.language['Issue_Reason_DEVICE17'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To WiFi"];
        }
      case 'QOS_DAMP_ALERT':
        {

          this.path = "/" + this.MODULE + "/application";// this.isWifi= false; In line action to reboot RG
          this.stateinfo = { iseiqfromissue: true };
          this.reason[i] = this.language['Issue_Reason41'];
          this.Description[i] = this.language['Issue_Description41'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          this.isqosalert = true;
          localStorage.setItem('isqosalert', JSON.stringify(this.isqosalert));
          return this.language["qos_issues"];


        }
      case 'WIFI_INTERFERENCE_HIGH_5G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// Link to historical Site scan Results in Wi-Fi tab.
          this.stateinfo = { Radiodisable5g: true };
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason18'];
            this.Description[i] = this.language['Issue_Description18'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE18'];
            this.Description[i] = this.language['Issue_Description_DEVICE18'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To WiFi"];
        }
      case 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// Link to historical Site scan Results in Wi-Fi tab.
          this.stateinfo = { Sitescan: true };
          this.reason[i] = this.language['Issue_Reason19'];
          this.Description[i] = this.language['Issue_Description19'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Site Scan"];
        }
      case 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// Link to historical Site scan Results in Wi-Fi tab.
          this.stateinfo = { Sitescan: true, Show5Gtab: true };
          // this.path = "/" + this.MODULE + "/wifi/extender/"+this.serialNumber;// Link to backhaul information under Wi-Fi
          // this.stateinfo = { backhaul:true};Sitescan: true
          this.reason[i] = this.language['Issue_Reason20'];
          this.Description[i] = this.language['Issue_Description20'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Site Scan"];
        }
      case 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// Link to historical Site scan Results in Wi-Fi tab.
          this.stateinfo = { Sitescan: true };
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason21'];
            this.Description[i] = this.language['Issue_Description21'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE21'];
            this.Description[i] = this.language['Issue_Description_DEVICE21'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Site Scan"];
        }
      case 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// Link to historical Site scan Results in Wi-Fi tab.
          this.stateinfo = { Sitescan: true, Show5Gtab: true };
          if (data.type !== 'DEVICE') {
            this.reason[i] = this.language['Issue_Reason22'];
            this.Description[i] = this.language['Issue_Description22'];
          } else {
            this.reason[i] = this.language['Issue_Reason_DEVICE22'];
            this.Description[i] = this.language['Issue_Description_DEVICE22'];
          }
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Site Scan"];
        }
      case 'MESH_DEGRADE':
        {
          this.path = "/" + this.MODULE + "/router";// this.isWifi= false; In line action to reboot RG
          this.stateinfo = { serialNumber: this.serialNumber, isReboot: true, isRouter: true };
          this.reason[i] = this.language['Issue_Reason23'];
          this.Description[i] = this.language['Issue_Description23'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Reboot"];
        }
      case 'BACKHAUL_TOO_CLOSE':
        {
          this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// this.isWifi= false; In line action to reboot RG
          this.stateinfo = { backhaul: true };
          this.reason[i] = this.language['Issue_Reason24'];
          this.Description[i] = this.language['Issue_Description24'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go  To Backhaul"];
        }
      case 'BACKHAUL_TOO_FAR':
        {
          this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;// this.isWifi= false; In line action to reboot RG
          this.stateinfo = { backhaul: true };
          this.reason[i] = this.language['Issue_Reason25'];
          this.Description[i] = this.language['Issue_Description25'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go  To Backhaul"];
        }
      case 'WIFI_RADIO_DISABLED':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true, isReboot: true };
          this.reason[i] = this.language['Issue_Reason28'];
          this.Description[i] = this.language['Issue_Description28'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Re-Enable Band"];
        }
      case 'WIFI_RADIO_DISABLED_24G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;   // this.isWifi= false; In line action to reboot RG
          this.stateinfo = {};
          this.reason[i] = this.language['Issue_Reason29'];
          this.Description[i] = this.language['Issue_Description29'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Re-Enable Band"];
        }
      case 'WIFI_RADIO_DISABLED_5G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;   // this.isWifi= false; In line action to reboot RG
          this.stateinfo = {};
          this.reason[i] = this.language['Issue_Reason30'];
          this.Description[i] = this.language['Issue_Description30'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Re-Enable Band"];
        }
      case "DS_SPEED_LOW_85":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason31'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description31'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Speed Test"];
        }
      case "US_SPEED_LOW_85":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason32'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description32'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Speed Test"];
        }
      case "DS_SPEED_LOW_75":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason33'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description33'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Speed Test"];
        }
      case "US_SPEED_LOW_75":
        {
          this.path = "" + this.MODULE + "/service";
          this.reason[i] = this.language['Issue_Reason34'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['Issue_Description34'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To Speed Test"];
        }
      // case "THERMAL_HIGH":
      case "SFP_THERMAL_HIGH":
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['Issue_Reason35'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.Description[i] = this.language['Issue_Description35'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      // case "THERMAL_TOO_HIGH":
      case "SFP_THERMAL_TOO_HIGH":
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['Issue_Reason36'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.Description[i] = this.language['Issue_Description36'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      /* This feature from Thermal_high to SFP_Thermal_high has been changed above because of CCL-42435
      which broke the functionality, adding this case for fix of CCL-44998 */
      case "THERMAL_HIGH":
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['THERMAL_HIGH_Reason'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          const modelTemp = this.exosModelTemp[this.ssoAuthService.getModelWithSn(this.serialNumber) + '_h'];
          this.Description[i] = this.language.THERMAL_HIGH_Description(modelTemp);
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      /* This feature from THERMAL_TOO_HIGH to SFP_THERMAL_TOO_HIGH has been changed above because of CCL-42435
      which broke the functionality, adding this case for fix of CCL-44998 */
      case "THERMAL_TOO_HIGH":
        {
          this.path = "/" + this.MODULE + "/router";
          this.reason[i] = this.language['THERMAL_TOO_HIGH_Reason'];
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          const modelTemp = this.exosModelTemp[this.ssoAuthService.getModelWithSn(this.serialNumber) + '_vh'];
          this.Description[i] = this.language.THERMAL_TOO_HIGH_Description(modelTemp);
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language["Go To System"];
        }
      case "ONT_OFFLINE":
        { 
          this.path = "./../../../cco/alerts/system/realtime/current-issues";
          this.reason[i] = this.language['issue_reason37'];
          this.stateinfo = this.serialNumber;
          //this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
          this.Description[i] = this.language['issue_description37'];
          this.primaryActionButton[i] = this.ssoAuthService.getEntitlementsArr().indexOf('102') > -1 && this.realtimescope ? true :false;
          this.severity[i] = 0;
          return this.language["Open Operations Cloud"];
        }
      case "GC_MAX_DOWNSTREAM_ACHIEVED":
        {
          this.path = "/" + this.MODULE + "/service";
          this.reason[i] = this.language['issue_reason38'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['issue_description38'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Speed Test"];
        }
      case "GC_MAX_UPSTREAM_ACHIEVED":
        {
          this.path = "/" + this.MODULE + "/service";
          this.reason[i] = this.language['issue_reason39'];
          this.stateinfo = { isSpeedtest: true };
          this.Description[i] = this.language['issue_description39'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Speed Test"];
        }
      case "WFH_SSID_WITHOUT_CIQ":
        {
          this.path = "/" + this.MODULE + "/wifi/ssid";
          this.reason[i] = this.language['issue_reason40'];
          this.stateinfo = {};
          this.Description[i] = this.language['issue_description40'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To SSID"];
        }
      case "MAP_CONNECTIVITY_FAILED":
        {
          this.path = "/" + this.MODULE + "/router";
          const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
            .filter(obj => obj.serialNumber == this.serialNumber)
            .map(obj => obj.opMode);
          const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');
          this.reason[i] = this.language[`Issue_Reason${lang}`]; //.replace(/System/g, replaceText);
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.Description[i] = this.language[`Issue_Description${lang}`]; //.replace(/System/g, replaceText);
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language[(lang == '10' ? "Go To Mesh(SAT)" : "Go To System")];
        }
      case 'WIFI_RADIO_DISABLED_6G':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;   // this.isWifi= false; In line action to reboot RG
          this.stateinfo = {};
          this.reason[i] = this.language['Issue_Reason42'];
          this.Description[i] = this.language['Issue_Description42'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Re-Enable Band"];
        }
      case 'NOT_CERTIFIED_AND_SFP_NOT_SUPPORTED':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber };
          this.reason[i] = this.language['Issue_Reason45'];
          this.Description[i] = this.language['Issue_Description45'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To System"];
        }
      case 'CERTIFIED_BUT_SFP_NOT_SUPPORTED_IN_CURRENT_VERSION':
        {
          if (opMode == "RG")
            this.path = "/" + this.MODULE + "/wifi/rg/" + this.serialNumber;
          else
            this.path = "/" + this.MODULE + "/wifi/extender/" + this.serialNumber;
          this.stateinfo = {};
          this.reason[i] = this.language['Issue_Reason46'];
          this.Description[i] = this.language['Issue_Description46'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To WiFi"];
        }
      case 'LAN_DISABLED':
        {
          this.path = "" + this.MODULE + "/service";
          this.stateinfo = {};
          this.reason[i] = this.language['Issue_Reason47'];
          this.Description[i] = this.language['Issue_Description47'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Service"];
        }
      case 'UI_CREATED_ISSUE_FOR_TR069MAPDOWN':
        {
          this.path = "/" + this.MODULE + "/router";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
            .filter(obj => obj.serialNumber == this.serialNumber)
            .map(obj => obj.opMode);
          const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');

          let secondaryWanStatus = {
            reason: '',
            description: ''
          };
          // if (this.isSmbOnboarded && this.backupWifiStatus) {  
          //   secondaryWanStatus.reason = (this.backupWifiStatus.running ? this.language['The secondary WAN is up'] : this.language['The secondary WAN is down']) + '.';
          //   secondaryWanStatus.description = (this.backupWifiStatus.running ? 
          //   this.language['The Network Resilience interface is up and running'] : 
          //   this.language['The Network Resilience interface is configured but it is not running. Ensure that the mobile device or hotspot associated is powered on and in range'])
          //   + '.';
          // }

          this.reason[i] = this.language[`Issue_Reason_mapNtr${lang}`] + ' ' + secondaryWanStatus.reason;
          this.Description[i] = this.language[`Issue_Description_mapNtr${lang}`] + ' ' + secondaryWanStatus.description;
          // this.reason[i] = this.language[`Issue_Reason_mapNtr${lang}`]; //.replace(/System/g, replaceText);
          // this.Description[i] = this.language[`Issue_Description_mapNtr${lang}`]; //.replace(/System/g, replaceText);
          this.primaryActionButton[i] = true;
          this.severity[i] = 0;
          return this.language[(lang == '10' ? "Go To Mesh(SAT)" : "Go To System")];
        }
      // case 'PON_ERRORS':
      //     {
      //       this.path = "/" + this.MODULE + "/router";
      //       // const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
      //       //   .filter(obj => obj.serialNumber == this.serialNumber)
      //       //   .map(obj => obj.opMode);
      //       // const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');
      //       this.reason[i] = this.language['PON issue observed']; //.replace(/System/g, replaceText);
      //       this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
      //       this.Description[i] = this.language['PON issue observed']; //.replace(/System/g, replaceText);
      //       this.primaryActionButton[i] = true;
      //       this.severity[i] = 0;
      //       return this.language["Go To ONT"];
      //     }
      //     case 'LOW_ONT_LIGHT_LEVELS':
      //       {
      //         this.path = "/" + this.MODULE + "/router";
      //         // const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
      //         //   .filter(obj => obj.serialNumber == this.serialNumber)
      //         //   .map(obj => obj.opMode);
      //         // const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');
      //         this.reason[i] = this.language['Low ONT light levels observed']; //.replace(/System/g, replaceText);
      //         this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
      //         this.Description[i] = this.language['Low ONT light levels observed']; //.replace(/System/g, replaceText);
      //         this.primaryActionButton[i] = true;
      //         this.severity[i] = 0;
      //         return this.language["Go To ONT"];
      //       }

      case 'LOW_ONT_LEVEL_ISSUE':
        {
          //this.path = "/" + this.MODULE + "/router";
          this.path = "./../../../cco/alerts/health/realtime/current-issues";
          this.reason[i] = this.language['low power levels measured at the ONT'];
          //this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
          this.stateinfo = this.serialNumber;
          this.Description[i] = this.language['ONT has low power level'];
          this.primaryActionButton[i] = this.ssoAuthService.getEntitlementsArr().indexOf('102') > -1 && this.healthAlertsRealtimeScope;
          this.severity[i] = 0;
          //return this.language["Go To ONT"];
          return this.language["Open Operations Cloud"];
        }
      case 'ONT_DS_SDBER_ISSUE':
        {
          //this.path = "/" + this.MODULE + "/router";
          this.path = "./../../../cco/alerts/system/realtime/current-issues";
          this.reason[i] = this.language['ONT downstream SDBER rate exceeded'];
          this.stateinfo = this.serialNumber;
          //this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
          this.Description[i] = this.language['Downstream Signal Degrade Bit Error Rate'];
          this.primaryActionButton[i] = this.ssoAuthService.getEntitlementsArr().indexOf('102') > -1 && this.realtimescope ? true :false;
          this.severity[i] = 0;
          //return this.language["Go To ONT"];
          return this.language["Open Operations Cloud"];
        }

      case 'ONT_US_SDBER_ISSUE':
        {
          //this.path = "/" + this.MODULE + "/router";
          this.path = "./../../../cco/alerts/system/realtime/current-issues";
          this.reason[i] = this.language['ONT upstream SDBER rate exceeded'];
          this.stateinfo = this.serialNumber;
          //this.stateinfo = { serialNumber: this.serialNumber, isOnt: true };
          this.Description[i] = this.language['Upstream Signal Degrade Bit Error Rate'];
          this.primaryActionButton[i] = this.ssoAuthService.getEntitlementsArr().indexOf('102') > -1 && this.realtimescope ? true :false;
          this.severity[i] = 0;
          //return this.language["Go To ONT"];
          return this.language["Open Operations Cloud"];
        }
      case 'NETWORK_RESILIENCE_ACTIVE_WITH_TR69_CONNECTED':
        {
          this.path = "" + this.MODULE + "/service";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.reason[i] = this.language['Issue_Reason48'];
          this.Description[i] = this.language['Issue_Description48'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Service"];
        }
      case 'NETWORK_RESILIENCE_ACTIVE_WITH_TR69_DISCONNECTED':
        {
          this.path = "" + this.MODULE + "/service";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.reason[i] = this.language['Issue_Reason49'];
          this.Description[i] = this.language['Issue_Description49'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Service"];
        }
      case 'NETWORK_RESILIENCE_INACTIVE':
        {
          this.path = "" + this.MODULE + "/service";
          this.stateinfo = { serialNumber: this.serialNumber, isRouter: true };
          this.reason[i] = this.language['Issue_Reason50'];
          this.Description[i] = this.language['Issue_Description50'];
          this.primaryActionButton[i] = true;
          this.severity[i] = 1;
          return this.language["Go To Service"];
        }

      default: this.Description[i] = ' '; this.reason[i] = " "; this.primaryActionButton[i] = false; return "";
    }

  }

  onIconClick(index, reason?: string) {
    if (reason) this.ReasonDescription(reason);
    for (let i = 0; i < this.issueData.length; i++) {
      if (index !== i) {
        this.isIconClicked[i] = false;
      } else {
        this.isIconClicked[i] = !this.isIconClicked[i];
      }
    }
  }

  routeforissues(data, i?) {
    // let reason = data.filter(obj => {
    //   if (obj.hasOwnProperty("Code")  return data.Code;
    // })
    if (this.primaryActionButton[i] == true)
      return " ";

    let reason
    if (data.Code)
      reason = data.Code;
    else
      reason = data.code;

    this.ReasonDescription(reason, data);
    if (this.path == " ")
      return " ";
    // if ( this.isWifi)
    // this.router.navigate(['/support/wifi/extender/',this.serialNumber] ,{ state: this.stateinfo });
    //  //this.router.navigate([this.path,this.serialNumber],{fragment: "HistoricalAirtimeAnalysis"} );
    // else
    this.router.navigate([this.path], { state: this.stateinfo })
  }
  routeforbutton(data, i?) {
    // let reason = data.filter(obj => {
    //   if (obj.hasOwnProperty("Code")  return data.Code;
    // })


    let reason
    if (data.Code)
      reason = data.Code;
    else
      reason = data.code;

    let reasoncode
    if (data.Code)
      reasoncode = data.Code.toUpperCase();
    else
      reasoncode = data.code.toUpperCase();

    this.ReasonDescription(reason, data);
   

    if (this.path == " ")
      return " ";
    // if ( this.isWifi)
    // this.router.navigate(['/support/wifi/extender/',this.serialNumber] ,{ state: this.stateinfo });
    //  //this.router.navigate([this.path,this.serialNumber],{fragment: "HistoricalAirtimeAnalysis"} );
    // else
    if (reasoncode === 'ONT_OFFLINE' || reasoncode === 'ONT_US_SDBER_ISSUE' || reasoncode === 'ONT_DS_SDBER_ISSUE') {
      //window.open(`./../../../cco/issues`, "_blank")

       // this.router.navigate([], { state: {filters: {fsan_serialno: "CXNK78000000"} } }).then((result: any) => {  window.open('./../../../cco/alerts/system/realtime/current-issues', '_blank'); });
     // window.open(`./../../../cco/alerts/system/realtime/current-issues`, "_blank")
     //this.router.navigate([], { state: this.stateinfo }).then((result: any) => {  window.open('./../../../cco/alerts/system/realtime/current-issues', '_blank'); })
     //this.router.navigate(['./../../../cco/alerts/system/realtime/current-issues'], { state: this.stateinfo });

     window.open(`./../../../cco/alerts/system/realtime/current-issues?fsan=${this.stateinfo}`, "_blank");
    } else if (reasoncode ===  'LOW_ONT_LEVEL_ISSUE') {
      window.open(`./../../../cco/alerts/health/realtime/current-issues?fsan=${this.stateinfo}`, "_blank");
    }
    else{
      this.router.navigate([this.path], { state: this.stateinfo })
    }
  }
  getdate(time) {
    return new Date(time).getTime();
  }

  sort() {
    let temp = this.issueList;
    this.issueData = [];
    if (this.severityfilter == 'All') {
      this.issueData = this.issueList;
    }
    else if (this.severityfilter == 'Issues') {
      this.issueList.forEach(element => {
        if (element.severity == 0)
          this.issueData.push(element);
      });
    }
    else if (this.severityfilter == 'Warning') {
      this.issueList.forEach(element => {
        if (element.severity == 1)
          this.issueData.push(element);
      });
    }
  }

  responseFromStatus(flag) {
    this.loading = false;
    this.severityfilter = "All";
    let temp = this.service.getSubscriberTabInfoData() ? this.service.getSubscriberTabInfoData() : "";
    if (temp) {
      let enttlmnts = this.ssoAuthService.getEntitlements();
      if (enttlmnts[118]) {
        this.SupportCloud = true;
      }
      if (enttlmnts[102]) {
        this.opsCloud = true;
      }
      let issueData = temp?.allIssues, mapTrSerial = [];
      const wapFailed = issueData.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
      issueData = issueData.filter((obj, i) => {
        if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
          return obj;
        } else {
          mapTrSerial.push(obj?.serialNumber);
        }
      });
      for (let i = issueData.length - 1; i >= 0; i--) {
        if (mapTrSerial.includes(issueData[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(issueData[i]["code"])) {
          if (["GATEWAY_FAILED"].includes(issueData[i]["code"])) {
            const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
            this.isSmbOnboarded = (subInfo?.devices || []).filter(obj => obj.bSmbMode).length && subInfo?.isSmbOnboarded;
            let userId = subInfo.commandIQ ? subInfo.commandIQ.userId : '';
            if (userId) {
              this.supportWifiService.getBackupWanStatus(userId).subscribe(response => {
                this.backupWifiStatus = response;
              });
            }
          }
          issueData.push({
            "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
            "subscriberId": "",
            "serialNumber": issueData[i]["serialNumber"],
            "source": issueData[i]["serialNumber"],
            "sourceId": issueData[i]["serialNumber"],
            "type": "ROUTER",
            "severity": 0,
            "reason": "High Operating Temperature Observed",
            "isValid": true
          },);
          issueData.splice(i, 1);
        }
      }
      this.issueData = issueData.filter(obj => this.codelist.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
      this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
      this.issueList = this.issueData;
      this.totalissues = this.issueList.length;
      this.initalize();
      // this.get();
    }
  }


  get() {
    if (this.issueData.length > 0) {
      let totalDeviceissues = this.issueData.filter(obj => obj.type.includes("CLIENT") || obj.type.includes("Client") || obj.type.includes("DEVICE") || obj.type.includes("Device"));
      this.allDeviceissues = [];
      totalDeviceissues.forEach(element => {

        if (element.code == "CLIENT_DEVICE_LOW_SIGNAL_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "ssR";
          this.allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "dhyRW";
          this.allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LOW_Efficiency_SCORE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "dhyRW";
          this.allDeviceissues.push(newElement);
        }
        else if (element.code == "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED") {
          var newElement = {};
          newElement["serialNumber"] = element.sourceId,
            newElement["warning"] = "rmode";
          this.allDeviceissues.push(newElement);
        }
      });
      if (this.allDeviceissues) {
        this.issuseservice.setDeviceIssues(this.allDeviceissues);
      } else this.issuseservice.setDeviceIssues({});
    }

  }
}
