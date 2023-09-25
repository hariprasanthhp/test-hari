import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { environment } from '../../../../../environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { take } from 'rxjs/operators';
import { DataServiceService } from 'src/app/support/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-protect-iq-details',
  templateUrl: './protect-iq-details.component.html',
  styleUrls: ['./protect-iq-details.component.scss']
})
export class ProtectIqDetailsComponent implements OnInit {
  advLoading: any;
  smbOrSmarttownEnabled: any;
  isSmartTownActivated: any;
  deviceInfo: any;
  language: any;
  languageSubject;
  loading = true;
  protectIQ_Uptime: string;
  myDate: Date;
  lastUpdated: string;
  packetsAnalyzedToday: any;
  totalVirusDetected: any;
  totalIntrusions: any;
  totalWebThreats: any;
  notificationUserId: any;
  newData: any = {};
  deviceStatus = false;
  deviceSubscription = false;
  showDetail: any;
  scopeFlag: any = {};
  enabledUpdated: boolean = false;
  tempDeviceStatus: any;
  warningMessage: any;
  experienceiqstatus;
  subscriptionUpdated: boolean = false;
  undiscoveredGS: any = false;
  orgId: any;
  hasSubscriber;
  subscriberStructure: any;
  deviceStatusSet = 0;
  smbEnabled: any;
  isEduroamEnable: boolean = false;

  constructor(
    private translateService: TranslateService,
    private protectIqService: ProtectIqService,
    public ssoService: SsoAuthService,
    private dataService: DataServiceService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.getScopes();
    this.orgId = this.ssoService.getOrgId();
    this.protectIqService.routerOnboardInfo.subscribe((res: any) => {
      this.newData = res;
    })

    this.deviceStatusSet = 0;
    this.protectIqService.availabilityInfo.subscribe((availability: any) => {
      if (Object.keys(availability).length != 0) {
        this.protectIqService.currentAvailabilityInfo.next(availability);
      }
    });

    this.protectIqService.currentAvailabilityInfo
      .pipe(take(2))
      .subscribe((availability: any) => {
        if (Object.keys(availability).length != 0) {
          this.deviceStatusSet++;
          this.showDetail = availability.showDetail;
          this.deviceInfo = availability.deviceInfo;
          this.undiscoveredGS = availability.undiscoveredGS;
          this.hasSubscriber = availability.hasSubscriber;
          this.subscriberStructure = availability.subscriberStructure;
          if (this.deviceStatusSet == 1) {
            this.getSubsciberStatus();
          }
        }
      });
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

  showStatusNotification() {
    this.loading = true;
    this.notificationUserId = this.newData?.userId;
    if (!this.notificationUserId) return;
    this.protectIqService.getNotification(this.notificationUserId).subscribe((data: any) => {
      this.loading = false;
      this.protectIQ_Uptime = this.timeConvert(data.active_since);
      this.myDate = new Date(data.last_updated)
      this.lastUpdated = this.myDate.toString();
      this.packetsAnalyzedToday = data.packet_analyzed_today;
      this.totalVirusDetected = data.virus_detected;
      this.totalIntrusions = data.intrusions;
      this.totalWebThreats = data.web_based_threats;
    }, err => {
      this.warningMessage = this.protectIqService.errorHandler(err);
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

  getSubsciberStatus(statusFor?, update?) {
    const subId = sessionStorage.getItem(`calix.subscriberId`);
    const availInd = this.deviceInfo ? 1 : (subId ? 2 : 0);
    let Api = [], API_identifier = [];
    let forkApiCall: any;

    if ((availInd && !statusFor) || (availInd && statusFor == 'system')) {
      Api.push(this.protectIqService.getArloAccount(this.ssoService.getOrgId(), (availInd == 1 ? this.deviceInfo : subId), availInd))
      API_identifier.push('system');
    }

    if ((this.deviceInfo && !statusFor) || (this.deviceInfo && statusFor == 'device')) {
      Api.push(this.protectIqService.getDeviceStatus(this.deviceInfo, 'CIES'));
      API_identifier.push('device');
    } else {
      this.deviceStatus = JSON.parse(sessionStorage.getItem('iqStatus'))?.protectIQEnabled || false;
    }

    if (Api.length > 0) {
      this.loading = true;
      forkApiCall = forkJoin(Api).subscribe((res: any) => {
        this.loading = false;
        let sys: any, dev: any;
        if (res.length == 2) {
          sys = res[0];
          dev = res[1];
        }
        if (res.length == 1 && API_identifier.includes('system')) sys = res[0];
        if (res.length == 1 && API_identifier.includes('device')) dev = res[0];

        if (API_identifier.includes('system') && sys.edgeSuites) {
          this.experienceiqstatus = sys.edgeSuites.experienceIQ.subscribed
          this.smbOrSmarttownEnabled = (sys?.edgeSuites?.myCommunityIQ?.passpoint?.enable && sys?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result !== 'failed')
            || (sys?.edgeSuites?.myCommunityIQ?.eduroam?.enable && sys?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result !== 'failed')
            || (sys?.edgeSuites?.smallBizIQ?.enable && sys?.edgeSuites?.smallBizIQ?.status?.result !== 'failed');
          this.isEduroamEnable = (sys?.edgeSuites?.myCommunityIQ?.eduroam?.enable && sys?.edgeSuites?.myCommunityIQ?.eduroam?.status?.result !== 'failed');
          this.isSmartTownActivated = sys?.edgeSuites?.myCommunityIQ?.passpoint?.enable && ['pending', 'succeeded'].includes(sys?.edgeSuites?.myCommunityIQ?.passpoint?.status?.result);
          this.smbEnabled = sys?.edgeSuites?.smallBizIQ?.enable || (sessionStorage['calix.subscriberId'] == 'undefined' && this.ssoService.isSmbEnabled())

          if (sys) {

            if (update) {
              this.subscriptionUpdated = (this.deviceSubscription == sys.edgeSuites.protectIQ.subscribed);
              return;
            }
            else this.deviceSubscription = this.smbEnabled || !!sys.edgeSuites.protectIQ.subscribed;
            if (sys.edgeSuites.protectIQ.subscribed && !this.undiscoveredGS) this.deviceStatus = sys.edgeSuites.protectIQ.enabled;
          }
        }

        if (API_identifier.includes('device')) {
          if (update) {
            this.enabledUpdated = (this.deviceStatus == dev?.status?.installed);
            this.tempDeviceStatus = dev?.status?.installed;
            return;
          } else this.deviceStatus = dev?.status?.installed;
          if (!this.newData.userId) this.onBoardedCheck();
          else if (this.deviceStatus) {
            this.showStatusNotification();
          }
        }

        this.updatedSubscriptionStatus();
        this.deviceStatusSet = 0;
      }, err => {
        this.loading = false;
        this.deviceStatusSet = 0;
        this.warningMessage = this.protectIqService.errorHandler(err);
        // (err[1]) ? this.warningMessage = this.protectIqService.errorHandler(err[1]) : this.warningMessage = this.protectIqService.errorHandler(err[0]);
      })
    }
  }

  onBoardedCheck() {
    this.protectIqService.getUserId(this.deviceInfo).subscribe((newData: any) => {
      this.loading = false;
      if (newData && newData.userId) {
        this.newData = newData;
        if (this.deviceStatus) {
          this.showStatusNotification();
          // this.showFeatureAvailability();
        }
      }
    }, err => {
      this.loading = false;
      this.warningMessage = this.protectIqService.errorHandler(err);
    })
  }

  toggleSubscription(state) {
    if (this.deviceSubscription == state) return;
    this.deviceSubscription = state;
    this.updatedSubscriptionStatus();
    this.advLoading = true;
    if (this.hasSubscriber) {

      this.protectIqService.toggleAppSubscription(this.orgId, 'ProtectIQ', this.subscriberStructure.subscriberLocationId, this.deviceSubscription).subscribe((res: any) => {
        let i = 0;
        this.getSubsciberStatus('system', true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getSubsciberStatus('device', false);
          } else if (i == 12) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubsciberStatus('system', true) : this.getSubsciberStatus('device', true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.updatedSubscriptionStatus();
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.warningMessage = this.protectIqService.errorHandler('Device is offline')
          : this.warningMessage = this.protectIqService.errorHandler(err);
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

      this.protectIqService.toggleAppSubscriptionwithoutsubscriber(this.orgId, this.deviceInfo, params).subscribe((res: any) => {

        let i = 0;

        let delay = 2000;
        if (res && res.estimatedDelay) {
          delay += res.estimatedDelay * 1000;
        }
        setTimeout(() => {
          this.getSubsciberStatus('system', true);
        }, delay);

        const statusInterval = setInterval(() => {
          i++;
          if (this.subscriptionUpdated && (this.undiscoveredGS || this.deviceSubscription == this.tempDeviceStatus)) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            if (!this.undiscoveredGS) this.getSubsciberStatus('device', false);
          } else if (i == 12) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
          } else {
            !this.subscriptionUpdated ? this.getSubsciberStatus('system', true) : this.getSubsciberStatus('device', true);
          }
        }, 10000);
      }, err => {
        this.deviceSubscription = !this.deviceSubscription;
        this.updatedSubscriptionStatus();
        this.advLoading = false;
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.warningMessage = this.protectIqService.errorHandler('Device is offline')
          : this.warningMessage = this.protectIqService.errorHandler(err);
      });
    }

  }
  onSubscription(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.advLoading = true;
    let deviceSubDetails = {
      fsn: this.deviceInfo,
      appName: "CIES",
      orderId: this.newData.userId
    }
    if (this.deviceStatus) {
      this.protectIqService.setInstall(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getSubsciberStatus('device', true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getSubsciberStatus('device', false);
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getSubsciberStatus('device', true);
          }
        }, 10000);
      }, err => {
        this.deviceStatus = false;
        this.updatedSubscriptionStatus();
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.warningMessage = this.protectIqService.errorHandler('Device is offline')
          : this.warningMessage = this.protectIqService.errorHandler(err);
        this.advLoading = false;
      })
    } else {
      this.protectIqService.setUnInstall(deviceSubDetails).subscribe((data: any) => {
        let i = 0;
        this.getSubsciberStatus('device', true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getSubsciberStatus('device', false);
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            clearInterval(statusInterval);
          } else {
            this.getSubsciberStatus('device', true);
          }
        }, 10000);

      }, err => {
        this.deviceStatus = true;
        this.updatedSubscriptionStatus();
        (err?.error?.error?.msg.includes('not communicating with router'))
          ? this.warningMessage = this.protectIqService.errorHandler('Device is offline')
          : this.warningMessage = this.protectIqService.errorHandler(err);
        this.advLoading = false;
      })
    }
  }

  toggleEnable(state) {
    if (this.deviceStatus == state) return;
    this.deviceStatus = state;
    this.updatedSubscriptionStatus();
    this.advLoading = true;
    const input = { "app": "protectIQ", "enable": this.deviceStatus };
    this.protectIqService.setEnableStatus(this.orgId, this.deviceInfo, input).subscribe((data: any) => {
      setTimeout(() => {
        let i = 0;
        this.getSubsciberStatus('device', true);
        const statusInterval = setInterval(() => {
          i++;
          if (this.enabledUpdated) {
            this.advLoading = false;
            clearInterval(statusInterval);
            this.updateAppTile();
            this.getSubsciberStatus('device', false);
          } else if (i == 12) {
            this.advLoading = false;
            this.deviceStatus = !this.deviceStatus;
            this.updatedSubscriptionStatus();
            clearInterval(statusInterval);
          } else {
            this.getSubsciberStatus('device', true);
          }
        }, 10000);
      }, ((data?.estimatedDelay || 0) * 1000 + 2000));
    }, (err) => {
      this.deviceStatus = false;
      this.updatedSubscriptionStatus();
      (err?.error?.error?.msg.includes('not communicating with router'))
        ? this.warningMessage = this.protectIqService.errorHandler('Device is offline')
        : this.warningMessage = this.protectIqService.errorHandler(err);
      this.advLoading = false;
    });
  }

  updateAppTile() {
    const sn = this.deviceInfo || sessionStorage.getItem('undiscoveredSn') || '';
    if (sn) {
      this.advLoading = true;
      this.protectIqService.tileStatus(this.orgId, sn, this.subscriberStructure._id).subscribe((data: any) => {
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
            && (this.getEntitlemnt('214') || this.getEntitlemnt('222') || this.getEntitlemnt('223'))
            && scopes['cloud.rbac.csc.apps.mycommunityiq']
            ? 1 : 0
        );

        const hasBark = (
          data?.app?.bark?.email
            && (this.getEntitlemnt('219') || this.getEntitlemnt('220'))
            && scopes['cloud.rbac.csc.apps.bark']
            ? 1 : 0
        );

        if ((this.getEntitlemnt('203') || this.getEntitlemnt('205') || (this.ssoService.isSmbEnabled() && this.getEntitlemnt('218'))) && scopes['cloud.rbac.csc.apps.protectiq'] && data?.app?.protectIQ?.subscribed) hasIQ++;
        if ((this.getEntitlemnt('204') || this.getEntitlemnt('205') || (this.ssoService.isSmbEnabled() && this.getEntitlemnt('218'))) && scopes['cloud.rbac.csc.apps.experienceiq'] && data?.app?.experienceIQ?.subscribed) hasIQ++;
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
        this.warningMessage = this.protectIqService.errorHandler(err);
        this.advLoading = false;
      })
    }
  }
  getEntitlemnt(ind) {
    return this.ssoService.getEntitlementsArr().includes(ind);
  }

  updatedSubscriptionStatus() {
    this.protectIqService.subscribtionStatus.next({
      deviceSubscription: this.deviceSubscription,
      deviceStatus: this.deviceStatus,
      smbEnabled: this.smbEnabled
    });
  }
}
