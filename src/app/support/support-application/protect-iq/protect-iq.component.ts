import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { NotifListModel, ProtectIqAlertModel } from '../shared/models/protectIqAlertModel';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { environment } from '../../../../environments/environment';
import { DataServiceService } from '../../data.service';
import { Router } from '@angular/router';
import { truncate } from 'fs';
import { Title } from '@angular/platform-browser';
import { IoTThingsGraph } from 'aws-sdk';

// import { ProtectSecurityComponent } from './protect-security/protect-security.component';

interface AlertType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-protect-iq',
  templateUrl: './protect-iq.component.html',
  styleUrls: ['./protect-iq.component.scss']
})



export class ProtectIQComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  sectionToShow = "details";
  protectIQTab;
  alertMessage;
  protectIQ_Uptime;
  lastUpdated: Date;
  packetsAnalyzedToday;
  totalVirusDetected;
  totalIntrusions;
  totalWebThreats;
  myDate;
  securityType: number;
  alertDetails;
  detailType;
  trustListDetails;
  skipDevicesDetails;
  securitySettingPA: boolean;
  securitySettingPSD: boolean;
  securitySettingPA1: boolean;
  securitySettingPSD2: boolean;
  hasSubscriber;
  notificationUserId;
  isWFHAvailable = false;
  experienceiqstatus;
  srlNum = sessionStorage.getItem('calix.deviceData') ? (JSON.parse(sessionStorage.getItem('calix.deviceData'))?.[0]?.serialNumber || '') : '';
  securityDetails: any = {};

  selectedValue: string;
  selecedAType = "Select A Type";
  isExpanded = [];
  isExpandedSkipDevice = [];
  featureAvailabilitys;

  //feature Availability
  showSkippedDevice: boolean;
  showSecuritySetting: boolean;
  showDetail: boolean;

  deviceInfo;
  deviceStatus: any = false;
  deviceSubscription: any = false;
  loading: boolean = false;



  alerts: AlertType[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'IPS', viewValue: 'Intrusion' },
    { value: 'AV', viewValue: 'Virus' },
    { value: 'WG', viewValue: 'Web Threat' }
  ];
  alertTypes = {
    'All': 'All',
    'IPS': 'Intrusion',
    'AV': 'Virus',
    'WG': 'Web Threat'
  };
  selectedType: string = 'All';
  scopeFlag: any = {};
  isError: boolean = false;
  warningMessage: any;
  newData: any = {};
  orgId: any;
  subscriberStructure: any;
  undiscoveredGS: any = false;
  subscriptionUpdated: boolean = false;
  enabledUpdated: boolean = false;
  advLoading: boolean = false;
  tempDeviceStatus: any;
  undiscoveredSn: string;
  smbEnabled: boolean = true;
  smbOrSmarttownEnabled: boolean = false;
  isSmartTownActivated: boolean = false;

  constructor(private translateService: TranslateService,
    private protectIqservices: ProtectIqService,
    public ssoService: SsoAuthService,
    private dataService: DataServiceService,
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.ssoService.setActionLog('CSC', 'pageHit', 'Application', this.router.url, 'Application protectIQ page is loaded');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Security']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Security']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.getScopes();
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (sessionStorage.getItem('overviewStatus') == 'isLoaded') {
        this.loadContent()
        clearInterval(interval);
      } else if (i == 200) {
        clearInterval(interval);
      }
    }, 200);

    this.undiscoveredSn = sessionStorage.getItem('undiscoveredSn');
  }

  loadContent() {
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    let containGS = this.deviceInfo.filter(obj => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoService.acceptGSModel(obj.modelName)));
    containGS = containGS.length ? containGS : (this.deviceInfo.map(obj => obj.deviceId).includes(sessionStorage.getItem('undiscoveredSn'))
      ? [{ 'deviceId': sessionStorage.getItem('undiscoveredSn') }]
      : []);
    containGS = parseInt(history.state?.containGS || "0") || containGS.length;
    this.hasSubscriber = history.state?.hasSubscriber || (sessionStorage.getItem(`calix.subscriberId`) && sessionStorage.getItem(`calix.subscriberId`) != 'undefined');

    if (!containGS) {
      this.router.navigate(['/support/application/arlo-smart']);
      return;
    } else if (this.ssoService.getEntitlementsArr().indexOf('203') == -1 && this.ssoService.getEntitlementsArr().indexOf('205') == -1 && !this.scopeFlag.protectiq) {
      if (this.ssoService.getEntitlementsArr().indexOf('204') > -1 && this.scopeFlag.experienceiq) {
        this.router.navigate(['/support/application/experienceIQ']);
      } else {
        this.router.navigate(['/support/application/arlo-smart']);
      }
      return;
    }

    if ((this.ssoService.getEntitlementsArr().includes('203') || this.ssoService.getEntitlementsArr().includes('205')) && this.scopeFlag.protectiq && containGS) {
      //this.router.navigate(['/support/application/protectIQ']);
    } else {
      if ((this.ssoService.getEntitlementsArr().includes('204') || this.ssoService.getEntitlementsArr().includes('205')) && this.scopeFlag.experienceiq && containGS) {
        this.router.navigate(['/support/application/experienceIQ']);
      } else if ((this.ssoService.getEntitlementsArr().includes('206') || this.ssoService.getEntitlementsArr().includes('213') || this.ssoService.getEntitlementsArr().includes('212')) && this.scopeFlag.arlo) {
        this.router.navigate(['/support/application/arlo-smart']);
      } else if ((this.ssoService.getEntitlementsArr().includes('207')) && this.scopeFlag.servify) {
        this.router.navigate(['/support/application/servify-care']);
      } else if ((this.ssoService.getEntitlementsArr().includes('214')) && this.scopeFlag.mycommunityiq) {
        this.router.navigate(['/support/application/SmartTownWiFi']);
      } else if ((this.ssoService.getEntitlementsArr().includes('219') || this.ssoService.getEntitlementsArr().includes('220')) && this.scopeFlag.bark) {
        this.router.navigate(['/support/application/bark']);
      } else if (this.isCaptivePortAvail()) {
        this.router.navigate(['/support/application/customer-portal']);
      }
      return;
    }

    this.undiscoveredGS = (
      !this.deviceInfo.filter((obj: any) => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoService.acceptGSModel(obj.modelName))).length &&
      this.deviceInfo.filter(obj => !obj.hasOwnProperty("modelName")).length
    );
    this.deviceInfo = this.deviceInfo.filter(obj => obj.opMode == "RG");
    this.deviceInfo = this.deviceInfo && this.deviceInfo.length ? this.deviceInfo[0].serialNumber : '';

    this.orgId = this.ssoService.getOrgId();
    this.subscriberStructure = this.dataService.getStoredSubscriberInfo() || { subscriberLocationId: sessionStorage.getItem(`calix.subLocationId`), _id: sessionStorage.getItem(`calix.subscriberId`) } || {};
    this.getSubscribedStatus();
    this.getDeviceStatus();
    //this.isWfhAvailable();

  }

  isCaptivePortAvail() {
    let hasSmb = 0;
    for (let i = 0; i <= 15; i++) {
      if (this.dataService.getStoredSubscriberInfo()) {
        hasSmb = this.ssoService.isSmbEnabled() ? 1 : 0;
        break;
      } else this.ssoService.sleep(1000);
    }
    return hasSmb;
  }

  getSubscribedStatus(checkUpdated = false) {
    this.loading = true;
    //if(this.hasSubscriber){alert("133hasSubscriber"+this.hasSubscriber)}
    // alert("this.deviceInfo protectiq"+this.deviceInfo+"this.hasSubscriber"+this.hasSubscriber)

    const subId = sessionStorage.getItem(`calix.subscriberId`);
    const availInd = this.deviceInfo ? 1 : (subId ? 2 : 0);
    if (!availInd) return;
    this.protectIqservices.getArloAccount(this.orgId, (availInd == 1 ? this.deviceInfo : subId), availInd).subscribe((res: any) => {
      this.experienceiqstatus = res?.edgeSuites?.experienceIQ?.subscribed
      // if(res?.edgeSuites){
      this.smbOrSmarttownEnabled = (res?.edgeSuites?.myCommunityIQ?.passpoint?.enable && res?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result !== 'failed')
        || (res?.edgeSuites?.myCommunityIQ?.eduroam?.enable && res?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result !== 'failed')
        || (res?.edgeSuites?.smallBizIQ?.enable && res?.edgeSuites?.smallBizIQ?.status?.result !== 'failed');

      this.isSmartTownActivated = res?.edgeSuites?.myCommunityIQ?.passpoint?.enable
        && ['pending', 'succeeded'].includes(res?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result);

      // if(typeof (this.smbOrSmarttownEnabled) == "undefined"){
      //   this.smbOrSmarttownEnabled = false;
      // }

      //}
      this.smbEnabled = res?.edgeSuites?.smallBizIQ?.enable
      this.loading = false;
      if (res) {

        if (checkUpdated) {
          this.subscriptionUpdated = (this.deviceSubscription == res.edgeSuites.protectIQ.subscribed);
          return;
        }
        else this.deviceSubscription = res.edgeSuites.protectIQ.subscribed;
        if (res.edgeSuites.protectIQ.subscribed && !this.undiscoveredGS) this.deviceStatus = res.edgeSuites.protectIQ.enabled//this.getDeviceStatus();
      }
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });

    /* if (this.hasSubscriber) {
      this.protectIqservices.subscribeStatus(this.orgId, 'ProtectIQ', this.subscriberStructure.subscriberLocationId).subscribe((res: any) => {
        this.loading = false;
        if (res) {

          if (checkUpdated) {
            this.subscriptionUpdated = (this.deviceSubscription == res.subscribe);
            return;
          }
          else this.deviceSubscription = res.subscribe;
          if (res.subscribe && !this.undiscoveredGS) this.getDeviceStatus();
        }
      }, err => {
        this.loading = false;
        this.pageErrorHandle(err);
      });
    }
    else {
      this.protectIqservices.subscribeStatuswithoutsubscriber(this.orgId, this.deviceInfo).subscribe((res: any) => {
        this.experienceiqstatus = res.edgeSuites.experienceIQ.subscribed

        this.loading = false;
        if (res) {

          if (checkUpdated) {
            this.subscriptionUpdated = (this.deviceSubscription == res.edgeSuites.protectIQ.subscribed);
            return;
          }
          else this.deviceSubscription = res.edgeSuites.protectIQ.subscribed;
          if (res.edgeSuites.protectIQ.subscribed && !this.undiscoveredGS) this.deviceStatus = res.edgeSuites.protectIQ.enabled//this.getDeviceStatus();
        }
      }, err => {
        this.loading = false;
        this.pageErrorHandle(err);
      });
    } */
    /*  this.protectIqservices.subscribeStatus(this.orgId, 'ProtectIQ', this.subscriberStructure.subscriberLocationId).subscribe((res: any) => {
        this.loading = false;
        if (res) {
          
          if (checkUpdated) {
            this.subscriptionUpdated = (this.deviceSubscription == res.subscribe);
            return;
          }
          else this.deviceSubscription = res.subscribe;
          if (res.subscribe && !this.undiscoveredGS) this.getDeviceStatus();
        }
      }, err => {
        this.loading = false;
        this.pageErrorHandle(err);
      });*/
  }

  getDeviceStatus(checkUpdated = false) {
    this.loading = true;
    if (this.deviceInfo) {
      this.protectIqservices.getDeviceStatus(this.deviceInfo, 'CIES').subscribe((data: any) => {
        this.loading = false;
        if (checkUpdated) {
          this.enabledUpdated = (this.deviceStatus == data.status.installed);
          this.tempDeviceStatus = data.status.installed;
          return;
        } else this.deviceStatus = data.status.installed;
        if (!this.newData.userId) this.onBoardedCheck();
        else if (this.deviceStatus) {
          this.showStatusNotification();
          this.showFeatureAvailability();
        }
      }, (err) => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    } else {
      this.deviceStatus = JSON.parse(sessionStorage.getItem('iqStatus'))?.protectIQEnabled || false;
    }
  }

  onBoardedCheck() {
    this.protectIqservices.getUserId(this.deviceInfo).subscribe((newData: any) => {
      this.loading = false;
      if (newData && newData.userId) {
        this.newData = newData;
        if (this.deviceStatus) {
          this.showStatusNotification();
          this.showFeatureAvailability();
        }
      }
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      const validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.experienceiq') !== -1) {
            this.scopeFlag.experienceiq = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.protectiq') !== -1) {
            this.scopeFlag.protectiq = true;
            continue;
          }
        }
      }
      scopes['cloud.rbac.csc.apps.protectiq.configuration'] = scopes['cloud.rbac.csc.apps.protectiq.configuration'] ? scopes['cloud.rbac.csc.apps.protectiq.configuration'] : [];
      scopes['cloud.rbac.csc.apps.protectiq.enablement'] = scopes['cloud.rbac.csc.apps.protectiq.enablement'] ? scopes['cloud.rbac.csc.apps.protectiq.enablement'] : [];

      if (scopes && (scopes['cloud.rbac.csc.apps.protectiq.configuration'])) {
        if (scopes['cloud.rbac.csc.apps.protectiq.configuration'].indexOf('read') !== -1) this.scopeFlag.configRead = true;
        if (scopes['cloud.rbac.csc.apps.protectiq.configuration'].indexOf('write') !== -1) this.scopeFlag.configWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.apps.protectiq.enablement'])) {
        if (scopes['cloud.rbac.csc.apps.protectiq.enablement'].indexOf('read') !== -1) this.scopeFlag.enableRead = true;
        if (scopes['cloud.rbac.csc.apps.protectiq.enablement'].indexOf('write') !== -1) this.scopeFlag.enableWrite = true;
      }
    } else {
      this.scopeFlag.configRead = true;
      this.scopeFlag.configWrite = true;
      this.scopeFlag.enableRead = true;
      this.scopeFlag.enableWrite = true;
      this.scopeFlag.experienceiq = true;
      this.scopeFlag.protectiq = true;
    }
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  showStatusNotification() {
    this.loading = true;
    this.notificationUserId = this.newData.userId
    this.protectIqservices.getNotification(this.notificationUserId).subscribe((data: any) => {
      this.loading = false;
      this.protectIQ_Uptime = this.timeConvert(data.active_since);
      this.myDate = new Date(data.last_updated)
      this.lastUpdated = this.myDate.toLocaleString();
      this.packetsAnalyzedToday = data.packet_analyzed_today;
      this.totalVirusDetected = data.virus_detected;
      this.totalIntrusions = data.intrusions;
      this.totalWebThreats = data.web_based_threats;
    }, err => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  timeConvert(time: number) {
    let d = Math.floor(time / 1440); // 60*24
    let h = Math.floor((time - (d * 1440)) / 60);
    let m = Math.round(time % 60);
    if (d > 0) {
      return (d + " Days " + h + " Hrs , " + m + " Mins");
    } else {
      return (h + (h > 1 ? " Hrs " : " Hr, ") + m + " Mins");
    }
  }

  showAlerts(isTabPress = false) {
    this.isExpanded = [];
    this.loading = true;
    this.alertDetails = [];
    if (isTabPress) this.selectedType = 'All';
    this.protectIqservices.getAlerts(this.newData.userId, this.selectedType).subscribe((data: any) => {
      this.loading = false;
      this.alertDetails = data?.body?.datas || [];
      this.alertDetails.forEach(element => {
        this.isExpanded.push(false);
      });
    }, err => {
      if (err?.status != 404) this.pageErrorHandle(err);
      this.loading = false;
    })
  }



  // onSecurityClick(secType : any){

  //   this.protectIqservices.getUserId(this.srlNum).subscribe((this.newData : any)=>{

  //     if(secType.target.id == 'selfHealbox'){
  //       console.log("coming here")
  //       this.securityDetails = {
  //         userId : this.newData.userId,
  //         securitySettings : [
  //           {
  //             type : 1,
  //             enabled : this.securitySettingPA
  //           }
  //         ]
  //       }

  //     }else if(secType.target.id == 'selfHealbox1'){
  //       console.log("coming here PSD")
  //       this.securityDetails = {
  //         userId : this.newData.userId,
  //         securitySettings : [
  //           {
  //             type : 2,
  //             enabled : this.securitySettingPSD
  //           }
  //         ]
  //       }
  //     }

  //     this.protectIqservices.setSecuritySettings(this.securityDetails).subscribe((data : any)=>{
  //       console.log(data);
  //       this.showSecuritySettings();
  //     }, err=>{
  //       this.pageErrorHandle(err);
  //     })
  //   })
  // }

  onPAClick() {
    this.securityType = 1
    let securityDetails = {
      userId: this.newData.userId,
      securitySettings: [
        {
          type: this.securityType,
          enabled: this.securitySettingPA
        }
      ]
    }
    this.protectIqservices.setSecuritySettings(securityDetails).subscribe((data: any) => {

      this.showSecuritySettings();
    }, err => {
      this.pageErrorHandle(err);
    })

  };

  onPSDClick() {
    this.securityType = 2
    let securityDetails = {
      userId: this.newData.userId,
      securitySettings: [
        {
          type: this.securityType,
          enabled: this.securitySettingPSD
        }
      ]
    }
    this.protectIqservices.setSecuritySettings(securityDetails).subscribe((data: any) => {

      this.showSecuritySettings();
    }, err => {
      this.pageErrorHandle(err);
    })
  }

  showSecuritySettings() {
    this.loading = true;
    this.notificationUserId = this.newData.userId
    this.protectIqservices.getSecurityList(this.notificationUserId).subscribe((data: any) => {
      this.loading = false;
      // const element = data.securitySettings.data[i];
      if (data.securitySettings.data[0].name == 'PA') {
        this.securitySettingPA = data.securitySettings.data[0].enabled

      }
      if (data.securitySettings.data[1].name == 'PSD') {
        this.securitySettingPSD = data.securitySettings.data[1].enabled

      }

    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })

  }

  addTrustList(notifyDetails, event) {
    event.stopPropagation();
    event.preventDefault();
    this.loading = true;
    let whiteListDetails: NotifListModel = {
      userId: this.newData.userId,
      type: notifyDetails?.securityAlarm?.type,
      signatureId: notifyDetails?.securityAlarm?.signatureId,
      url: notifyDetails?.securityAlarm?.url,
      message: notifyDetails?.securityAlarm?.message,
      notifId: notifyDetails?.notifId
    }
    this.protectIqservices.addWhitelistDetails(whiteListDetails).subscribe((data: any) => {
      this.loading = false;
      this.showAlerts();
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  showTrustList(isTabPress = false) {
    this.isExpanded = [];
    this.loading = true;
    this.trustListDetails = { whitelist: [] };
    if (isTabPress) this.selectedType = "All";
    this.protectIqservices.getTrustList(this.selectedType, this.newData.userId).subscribe((data: any) => {
      this.loading = false;
      this.trustListDetails = data?.body;
      this.trustListDetails?.whitelist.forEach(element => {
        this.isExpanded.push(false);
      });
    }, (err) => {
      if (err?.status != 404) this.pageErrorHandle(err);
      this.loading = false;
    })

  }

  deleteWhiteListItem(whiteListItemId) {
    this.loading = true;
    this.protectIqservices.removeItemInTrustList(whiteListItemId, this.newData.userId).subscribe((data: any) => {
      this.loading = false;
      this.showTrustList();
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  showSkipDevices(resetAccordian = true) {
    this.loading = true;
    if (resetAccordian) this.isExpandedSkipDevice = [];
    this.protectIqservices.getSkipList(this.newData.userId).subscribe((data: any) => {
      this.loading = false;
      this.skipDevicesDetails = data;
      Object.keys(this.skipDevicesDetails).forEach(element => {
        this.isExpandedSkipDevice.push(false);
      })
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  changeSkipStatus(deviceId, status: boolean) {
    this.loading = true;
    let skipStatusDetails = {
      userId: this.newData.userId,
      deviceId: deviceId,
      skip: !status
    }
    this.protectIqservices.updateSkipStatus(skipStatusDetails).subscribe((data: any) => {
      this.loading = false;
      this.showSkipDevices(false);
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  skipStatusChangeAll(status: boolean) {
    this.loading = true;
    let skipInfo = {
      userId: this.newData.userId,
      skip: status
    }
    this.protectIqservices.setAllSkipStatus(skipInfo).subscribe((data: any) => {
      this.showSkipDevices(false);
      this.loading = false;
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  showFeatureAvailability() {

    this.loading = true;
    this.protectIqservices.getFeatureAvailability(this.newData.userId).subscribe((data: any) => {
      this.loading = false;
      this.showSkippedDevice = data.psd;
      this.showSecuritySetting = data.securityByPass;
      this.showDetail = data.proofService;
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  toggleEnable(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.advLoading = true;
    const input = { "app": "protectIQ", "enable": this.deviceStatus };
    this.protectIqservices.setEnableStatus(this.orgId, this.deviceInfo, input).subscribe((data: any) => {
      setTimeout(() => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);
      }, ((data?.estimatedDelay || 0) * 1000 + 2000));
    }, (err) => {
      this.deviceStatus = false;
      (err?.error?.error?.msg.includes('not communicating with router'))
        ? this.pageErrorHandle('Device is offline')
        : this.pageErrorHandle(err);
      //this.pageErrorHandle(err);
      this.advLoading = false;
    });
  }

  onSubscription(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.advLoading = true;
    //this.deviceStatus = !(this.deviceStatus || (this.deviceStatus == 'true'));

    let deviceSubDetails = {
      fsn: this.deviceInfo,
      appName: "CIES",
      orderId: this.newData.userId
    }
    if (this.deviceStatus) {
      this.protectIqservices.setInstall(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);
      }, err => {
        this.deviceStatus = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline')
          : this.pageErrorHandle(err);
        //this.pageErrorHandle(err);
        this.advLoading = false;
      })
    } else {
      this.protectIqservices.setUnInstall(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getDeviceStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getDeviceStatus(true);
          }
        }, 10000);

      }, err => {
        this.deviceStatus = true;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline')
          : this.pageErrorHandle(err);
        //this.pageErrorHandle(err);
        this.advLoading = false;
      })
    }
  }

  toggleSubscription(state) {
    if (this.deviceSubscription == state) return;
    this.deviceSubscription = state;
    this.advLoading = true;
    //this.deviceSubscription = !(this.deviceSubscription || (this.deviceSubscription == 'true'))
    if (this.hasSubscriber) {

      this.protectIqservices.toggleAppSubscription(this.orgId, 'ProtectIQ', this.subscriberStructure.subscriberLocationId, this.deviceSubscription).subscribe((res: any) => {
        let i = 0;
        this.getSubscribedStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            //this.deviceSubscription = !this.deviceSubscription;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubscribedStatus(true) : this.getDeviceStatus(true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline')
          : this.pageErrorHandle(err);
        //this.pageErrorHandle(err);
      });
    }
    else {
      let params = {
        protectIQ: {},
        experienceIQ: {},
      };

      params.experienceIQ = {
        subscribed: this.experienceiqstatus
      }

      params.protectIQ = {
        subscribed: this.deviceSubscription
      }

      this.protectIqservices.toggleAppSubscriptionwithoutsubscriber(this.orgId, this.deviceInfo, params).subscribe((res: any) => {

        let i = 0;

        let delay = 2000;
        if (res && res.estimatedDelay) {
          delay += res.estimatedDelay * 1000;
        }
        setTimeout(() => {
          this.getSubscribedStatus(true);
        }, delay);

        //this.getSubscribedStatus(true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getDeviceStatus();
          } else if (i == 12) {
            this.advLoading = false;
            //this.deviceSubscription = !this.deviceSubscription;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubscribedStatus(true) : this.getDeviceStatus(true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.pageErrorHandle('Device is offline')
          : this.pageErrorHandle(err);
        //this.pageErrorHandle(err);
      });
    }

  }

  onEnabled() {
    // this.deviceStatus = !this.deviceStatus;
    this.loading = true;
    let deviceSubDetails = {
      sn: this.deviceInfo,
      appName: "CIES"
    }
    if (this.deviceSubscription === true) {
      this.protectIqservices.setEnabled(deviceSubDetails).subscribe((data: any) => {
        this.loading = false;
        this.getDeviceStatus();
      }, err => {
        this.pageErrorHandle(err);
        this.loading = false;
        this.deviceSubscription = false;
      })
    } else if (this.deviceSubscription === false) {
      this.protectIqservices.setUnEnabled(deviceSubDetails).subscribe((data: any) => {
        setTimeout(() => {
          this.loading = false;
          this.getDeviceStatus();
        }, 20000);
        return;
        // this.protectIqservices.setUnInstall(deviceSubDetails).subscribe((disableAll: any) => {
        //   setTimeout(() => {
        //     this.loading = false;
        //     this.getDeviceStatus();
        //   }, 15000);
        //   //console.log(disableAll);
        // }, err => {
        //   this.pageErrorHandle(err);
        //   this.loading = false;
        // })
        // setTimeout(() => {
        //   this.loading = false;
        //   this.getDeviceStatus();
        // }, 45000)
      }, err => {
        this.pageErrorHandle(err);
        this.loading = false;
      })
    }

  }

  updateAppTile() {
    this.advLoading = true;
    const sn = this.deviceInfo || sessionStorage.getItem('undiscoveredSn') || '';
    if (sn) {
      this.protectIqservices.tileStatus(this.orgId, sn, this.subscriberStructure._id).subscribe((data: any) => {
        this.advLoading = false;
        data = data || {};
        let hasIQ = 0;
        const scopes = this.ssoService.getScopes();
        const hasServify = (
          data?.app?.servifyCare?.email
            && (this.getEntitlemnt('207') || this.getEntitlemnt('215') || this.getEntitlemnt('216') || this.getEntitlemnt('217'))
            && scopes['cloud.rbac.csc.apps.servify']
            ? 1 : 0
        );
        const hasArlo = (
          data?.app?.arloSmart?.email
            && (this.getEntitlemnt('206') || this.getEntitlemnt('212') || this.getEntitlemnt('213'))
            && scopes['cloud.rbac.csc.apps.arlo']
            ? 1 : 0
        );
        const hasMyComm = (
          data?.app?.myCommunityIQ?.subscriber?.enable
            && (this.getEntitlemnt('214'))
            && scopes['cloud.rbac.csc.apps.mycommunityiq']
            ? 1 : 0
        );

        const hasBark = (
          data?.app?.bark?.email
            && (this.getEntitlemnt('219') || this.getEntitlemnt('220'))
            && scopes['cloud.rbac.csc.apps.bark']
            ? 1 : 0
        );

        if (((this.getEntitlemnt('203') || this.getEntitlemnt('205'))) && scopes['cloud.rbac.csc.apps.protectiq'] && data?.app?.protectIQ?.subscribed) hasIQ++;
        if (((this.getEntitlemnt('204') || this.getEntitlemnt('205'))) && scopes['cloud.rbac.csc.apps.experienceiq'] && data?.app?.experienceIQ?.subscribed) hasIQ++;
        $('#commandIQEmailId').text((data?.commandIQ?.fduser ? '-' : (data?.commandIQ?.email || '-')));
        $('#appSubscribedId').text(((hasIQ + hasServify + hasArlo + hasMyComm + hasBark) != 0 ? (hasIQ + hasServify + hasArlo + hasMyComm + hasBark) : '-'));
        $('#appInstalledId').text((data?.installed?.count != undefined ? data?.installed?.count : '-'));

        let tileInfo: any = this.dataService.getSubscriberTabInfoData() || {};
        if (!tileInfo?.networkStatus?.appCount) tileInfo.networkStatus = { 'appCount': {} };
        tileInfo.networkStatus.appCount = {
          subscriberAppCount: (hasIQ + hasServify + hasArlo + hasMyComm + hasBark),
          enabledAppCount: data?.installed?.count
        }
        this.dataService.setSubscriberTabInfoData(tileInfo);
      }, err => {
        this.pageErrorHandle(err);
        this.advLoading = false;
      })
    }
  }

  getEntitlemnt(ind) {
    return this.ssoService.getEntitlementsArr().includes(ind);
  }

  accordianChange(i) {
    //this.isExpanded[i] = !this.isExpanded[i];
    /* setTimeout(() => {
      this.isExpanded[i] ? $('#collapseOne_'+i).addClass('show') : $('#collapseOne_'+i).removeClass('show');
    }, 100); */
  }

  pageErrorHandle(err: any) {
    /* if(err.status == 400){
      this.alertMessage = this.language.Bad_Request;
    }if(err.status == 498){
      this.alertMessage = this.language.token_invalid;
    }if(err.status == 499){
      this.alertMessage = this.language['need a token']
    }if(err.status == 500){
      this.alertMessage = this.language.Microservice_issues;
    } */
    this.isError = true;
    if (err.status === 401) {
      this.warningMessage = this.language['Access Denied'];
    }
    else if (err.status === 504) {
      this.warningMessage = this.language['This alert is already trusted and requires no further action.'];
    } else {
      this.warningMessage = this.ssoService.pageErrorHandle(err);
    }
  }

  formValueChanges() {

  }
  isWfhAvailable(isRefreshed = false) {
    this.loading = true;
    this.dataService.fetchMetaDatavaluesNew(this.orgId, this.deviceInfo, isRefreshed).subscribe((res: any) => {
      this.loading = false;
      res["secondary-ssid"].forEach((el: any, index) => {
        if (el.type == 2) {
          this.isWFHAvailable = true;

        }
      })
    });
  }


}
