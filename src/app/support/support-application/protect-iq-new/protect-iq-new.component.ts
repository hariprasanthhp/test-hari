import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from '../../../../environments/environment';
import { DataServiceService } from '../../data.service';
import { ProtectIqService } from '../shared/service/protect-iq.service';

interface menu {
  name: string,
  label: string,
  routerLink: string,
  display: boolean,
  active?: boolean,
  state: object,
}

@Component({
  selector: 'app-protect-iq-new',
  templateUrl: './protect-iq-new.component.html',
  styleUrls: ['./protect-iq-new.component.scss']
})
export class ProtectIqNewComponent implements OnInit {

  language: any;
  languageSubject: any;

  loading: boolean = false;
  errorMessage = '';
  scopeFlag: any = {};
  deviceInfo;
  hasSubscriber;
  undiscoveredGS: any = false;
  orgId: any;
  subscriberStructure: any;
  showSkippedDevice: boolean;
  showSecuritySetting: boolean;
  showDetail: boolean;
  preReqData: any = {};
  newData: any = {
    userId: ''
  };
  isLatestVersion: boolean;
  subscribtionStatus: any;
  menus: menu[] = [{
    name: 'details',
    label: 'Details',
    routerLink: './details',
    active: true,
    display: true,
    state: this.preReqData,
  }];
  currentSubscriberInfoSubscription: any;
  availabilityApiSubscription: any;
  unitTesting = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private ssoAuthService: SsoAuthService,
    public translateService: TranslateService,
    private dataService: DataServiceService,
    private protectIqService: ProtectIqService
  ) {
  }

  ngOnInit(): void {
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'Application', this.router.url, 'Application protectIQ page is loaded');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Security']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Security']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.protectIqService.subscribtionStatus.subscribe((res: any) => {
      this.subscribtionStatus = res;
      this.setLatestVersion();
      this.initMenus();
      this.formatMenus();
      this.loading = false;
    });

    this.currentSubscriberInfoSubscription = this.ssoAuthService.currentSubscriberInfo.subscribe(() => {
      this.router.navigateByUrl('/support/application/protect-iq');
      if (Object.keys(this.preReqData).length) {
        this.protectIqService.availabilityInfo.next(this.preReqData);
      } else {
        this.loading = true;
        this.initMenus();
        this.onBoardedCheck();
      }
    });
    this.setLatestVersion();
    this.getScopes();
    this.loadContent(); // Optimization - should try to move to parent module
  }

  ngOnDestory() {
    if (this.currentSubscriberInfoSubscription) this.currentSubscriberInfoSubscription.unsubscribe();
    if (this.availabilityApiSubscription) this.availabilityApiSubscription.unsubscribe();
  }

  setLatestVersion() {
    // check whether the software version is latest
    let deviceData = JSON.parse(sessionStorage.getItem('calix.deviceData'));
    let softwareVersion = deviceData.find(device => device.softwareVersion != '')?.softwareVersion ?? '';
    this.isLatestVersion = parseFloat(softwareVersion) >= 23.3 && this.ssoAuthService.isSmbEnabled(true);
  }

  getScopes() {
    let scopes = this.ssoAuthService.getScopes();
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

  loadContent() {
    if (this.unitTesting) return;
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    let containGS = this.deviceInfo.filter(obj => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoAuthService.acceptGSModel(obj.modelName)));
    containGS = containGS.length ? containGS : (this.deviceInfo.map(obj => obj.deviceId).includes(sessionStorage.getItem('undiscoveredSn'))
      ? [{ 'deviceId': sessionStorage.getItem('undiscoveredSn') }]
      : []);
    containGS = parseInt(history.state?.containGS || "0") || containGS.length;
    this.hasSubscriber = history.state?.hasSubscriber || (sessionStorage.getItem(`calix.subscriberId`) && sessionStorage.getItem(`calix.subscriberId`) != 'undefined');

    if (!containGS) {
      this.router.navigate(['/support/application/arlo-smart']);
      return;
    } else if (history.state?.iseiqfromissue) {
      this.router.navigate(['/support/application/experienceIQ'], { state: { ispriorities: true } });
      return;
    } else if (this.ssoAuthService.getEntitlementsArr().indexOf('203') == -1 && this.ssoAuthService.getEntitlementsArr().indexOf('205') == -1 && !(this.ssoAuthService.isSmbEnabled() && this.ssoAuthService.getEntitlementsArr().includes('218')) && !this.scopeFlag.protectiq) {
      if (this.ssoAuthService.getEntitlementsArr().indexOf('204') > -1 && this.scopeFlag.experienceiq) {
        this.router.navigate(['/support/application/experienceIQ']);
      } else {
        this.router.navigate(['/support/application/arlo-smart']);
      }
      return;
    }

    if ((this.ssoAuthService.getEntitlementsArr().includes('203') || this.ssoAuthService.getEntitlementsArr().includes('205') || (this.ssoAuthService.isSmbEnabled() && this.ssoAuthService.getEntitlementsArr().includes('218'))) && this.scopeFlag.protectiq && containGS) {
      this.router.navigate(['/support/application/protect-iq/details']);
    } else {
      if ((this.ssoAuthService.getEntitlementsArr().includes('204') || this.ssoAuthService.getEntitlementsArr().includes('205') || (this.ssoAuthService.isSmbEnabled() && this.ssoAuthService.getEntitlementsArr().includes('218'))) && this.scopeFlag.experienceiq && containGS) {
        this.router.navigate(['/support/application/experienceIQ']);
      } else if ((this.ssoAuthService.getEntitlementsArr().includes('206') || this.ssoAuthService.getEntitlementsArr().includes('213') || this.ssoAuthService.getEntitlementsArr().includes('212')) && this.scopeFlag.arlo) {
        this.router.navigate(['/support/application/arlo-smart']);
      } else if ((this.ssoAuthService.getEntitlementsArr().includes('207')) && this.scopeFlag.servify) {
        this.router.navigate(['/support/application/servify-care']);
      } else if ((this.ssoAuthService.getEntitlementsArr().includes('214')) && this.scopeFlag.mycommunityiq) {
        this.router.navigate(['/support/application/SmartTownWiFi']);
      } else if ((this.ssoAuthService.getEntitlementsArr().includes('219') || this.ssoAuthService.getEntitlementsArr().includes('220')) && this.scopeFlag.bark) {
        this.router.navigate(['/support/application/bark']);
      } else if (this.isCaptivePortAvail()) {
        this.router.navigate(['/support/application/customer-portal']);
      }
      return;
    }

    this.undiscoveredGS = (
      !this.deviceInfo.filter((obj: any) => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoAuthService.acceptGSModel(obj.modelName))).length &&
      this.deviceInfo.filter(obj => !obj.hasOwnProperty("modelName")).length
    );
    this.deviceInfo = this.deviceInfo.filter(obj => obj.opMode == "RG");
    this.deviceInfo = this.deviceInfo && this.deviceInfo.length ? this.deviceInfo[0].serialNumber : '';
    this.orgId = this.ssoAuthService.getOrgId();
    this.subscriberStructure = this.dataService.getStoredSubscriberInfo() || { subscriberLocationId: sessionStorage.getItem(`calix.subLocationId`), _id: sessionStorage.getItem(`calix.subscriberId`) } || {};

    // Optimization -should move to ngOnInit
    this.onBoardedCheck();
  }

  isCaptivePortAvail() {
    let hasSmb = 0;
    for (let i = 0; i <= 15; i++) {
      if (this.dataService.getStoredSubscriberInfo()) {
        hasSmb = this.ssoAuthService.isSmbEnabled() ? 1 : 0;
        break;
      } else this.ssoAuthService.sleep(1000);
    }
    return hasSmb;
  }

  onBoardedCheck() {
    this.loading = true;
    this.protectIqService.getUserId(this.deviceInfo).subscribe((newData: any) => {
      if (newData && newData.userId) {
        this.newData = newData;
        this.protectIqService.routerOnboardInfo.next(newData);
        // if (this.deviceStatus) { // Optimization - exists in details component. should try to move here
        this.showFeatureAvailability(newData);
        // }
      } else {
        this.loading = false;
        this.setAvailabilityInfo();
      }
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    })
  }

  showFeatureAvailability(newData) {
    this.loading = true;
    this.availabilityApiSubscription = this.protectIqService.getFeatureAvailability(newData.userId).subscribe((data: any) => {
      // this.loading = false;
      this.showSkippedDevice = data.psd;
      this.showSecuritySetting = data.securityByPass;
      this.showDetail = data.proofService;
      this.setAvailabilityInfo();
    }, error => {
      this.loading = false;
      this.errorMessage = this.protectIqService.errorHandler(error);
    })
  }

  setAvailabilityInfo() {
    this.preReqData = {
      showSkippedDevice: this.showSkippedDevice,
      showSecuritySetting: this.showSecuritySetting,
      showDetail: this.showDetail,
      deviceInfo: this.deviceInfo,
      undiscoveredGS: this.undiscoveredGS,
      subscriberStructure: this.subscriberStructure,
      scopeFlag: this.scopeFlag,
      hasSubscriber: this.hasSubscriber
    }
    this.protectIqService.availabilityInfo.next(this.preReqData);
  }

  initMenus() {
    this.menus = [{
      name: 'details',
      label: 'Details',
      routerLink: './details',
      active: true,
      display: true,
      state: this.preReqData,
    }];
  }

  formatMenus() {
    if (this.subscribtionStatus.deviceSubscription && this.subscribtionStatus.deviceStatus) {
      this.menus.push(
        {
          name: 'alerts',
          label: 'Alerts',
          routerLink: './alerts',
          display: !this.subscribtionStatus.smbEnabled && !this.isLatestVersion,// hiding alerts because of R23.3 doesn't need
          state: {
            userId: this.newData.userId
          },
        },
        {
          name: 'trusted-list',
          label: 'Trusted_List',
          routerLink: './trusted-list',
          display: !this.subscribtionStatus.smbEnabled && !this.isLatestVersion,// hiding trusted list because of R23.3 doesn't need
          state: {
            userId: this.newData.userId,
            isLatestVersion: this.isLatestVersion
          },
        },
        {
          name: 'skipped-devices',
          label: 'Skipped_Devices',
          routerLink: './skipped-devices',
          display: !this.subscribtionStatus.smbEnabled || this.isLatestVersion && this.showSkippedDevice,
          state: {
            configWrite: this.scopeFlag.configWrite,
            userId: this.newData.userId,
            isLatestVersion: this.isLatestVersion
          },
        },
        {
          name: 'security-settings',
          label: 'Security_Settings',
          routerLink: './security-settings',
          display: this.showSecuritySetting,
          state: {
            userId: this.newData.userId,
            isLatestVersion: this.isLatestVersion
          },
        }
      );
    }
  }

}
