import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { environment } from '../../../environments/environment';
import { DataServiceService } from '../data.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WhitelabelService } from 'src/app/shad/service/whitelabel.service';
import { ProtectIqService } from './shared/service/protect-iq.service';

@Component({
  selector: 'app-support-application',
  templateUrl: './support-application.component.html',
  styleUrls: ['./support-application.component.scss'],
})
export class SupportApplicationComponent implements OnInit {

  language: any;
  languageSubject;
  scopeFlag: any = {};
  activeTab
  apiCallDone: boolean;
  containGS: number = 0;
  hasSubscriber: any = false;
  loader = false;
  spId: string;
  getEIQandPIQNameAPI: any;
  customAppName: any = {};

  constructor(
    private translateService: TranslateService,
    public ssoService: SsoAuthService,
    private dataService: DataServiceService,
    private router: Router,
    private http: HttpClient,
    private service: WhitelabelService,
    private protectIqService: ProtectIqService
  ) {
    this.tabSelection();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.getScopes();
    this.getEiq_PiqActiveStatus();

    this.apiCallDone = true;
    let i = 0;
    this.loader = true;
    const interval = setInterval(() => {
      i++;
      if (sessionStorage.getItem('overviewStatus') == 'isLoaded') {
        this.showTab()
        this.loader = false;
        clearInterval(interval);
      } else if (i == 200) {
        this.loader = false;
        clearInterval(interval);
      }
    }, 200);

  }

  showTab() {
    const devices = JSON.parse(sessionStorage.getItem(`calix.deviceData`));
    let containGS = devices.filter(obj => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoService.acceptGSModel(obj.modelName)));
    containGS = containGS.length ? containGS : (devices.map(obj => obj.deviceId).includes(sessionStorage.getItem('undiscoveredSn'))
      ? [{ 'deviceId': sessionStorage.getItem('undiscoveredSn') }]
      : []);
    this.containGS = parseInt(history.state?.containGS || "0") || containGS.length;
    this.hasSubscriber = history.state?.hasSubscriber || (sessionStorage.getItem(`calix.subscriberId`) && sessionStorage.getItem(`calix.subscriberId`) != 'undefined');
    /* Commented if condition series for fix of CCL-46786 */
    /* if (!this.containGS) {
      this.router.navigate(['/support/application/arlo-smart']);
      this.setActiveTab('arlo-smart');
    } */
    if (history.state?.iseiqfromissue) {
      this.router.navigate(['/support/application/experienceIQ'], { state: { ispriorities: true } });
      this.setActiveTab('experienceIQ');
    }
    else if ((this.ssoService.getEntitlementsArr().includes('203') || this.ssoService.getEntitlementsArr().includes('205') || (this.ssoService.getEntitlementsArr().includes('218') && this.ssoService.isSmbEnabled())) && this.scopeFlag.protectiq && this.containGS) {
      this.router.navigate(['/support/application/protect-iq']);
      this.setActiveTab('protect-iq');
    } else if ((this.ssoService.getEntitlementsArr().includes('204') || this.ssoService.getEntitlementsArr().includes('205') || (this.ssoService.getEntitlementsArr().includes('218') && this.ssoService.isSmbEnabled())) && this.scopeFlag.experienceiq && this.containGS) {
      this.router.navigate(['/support/application/experienceIQ']);
      this.setActiveTab('experienceIQ');
    } else if ((this.ssoService.getEntitlementsArr().includes('206') || this.ssoService.getEntitlementsArr().includes('213') || this.ssoService.getEntitlementsArr().includes('212')) && this.isSectionAvailable('isArlo') && this.scopeFlag.arlo) {
      this.router.navigate(['/support/application/arlo-smart']);
      this.setActiveTab('arlo-smart');
    } else if ((this.ssoService.getEntitlementsArr().includes('207')) && this.scopeFlag.servify && this.isSectionAvailable('isServify')) {
      this.router.navigate(['/support/application/servify-care']);
      this.setActiveTab('servify-care');
    } else if (this.scopeFlag.mycommunityiq && this.isSectionAvailable('isMyComm', ['214', '222', '223'])) {
      this.router.navigate(['/support/application/SmartTownWiFi']);
      this.setActiveTab('MyCommunityIQ');
    } else if ((this.ssoService.getEntitlementsArr().includes('219') || this.ssoService.getEntitlementsArr().includes('220')) && this.scopeFlag.bark && this.isSectionAvailable('isBark')) {
      this.router.navigate(['/support/application/bark']);
      this.setActiveTab('bark');
    } else if (this.isCaptivePortAvail() && this.ssoService.getEntitlementsArr().includes('218')) {
      this.router.navigate(['/support/application/customer-portal']);
    }
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

  tabSelection() {
    if (this.router.url.includes('protect-iq')) {
      this.setActiveTab('protect-iq')
    } else if (this.router.url.includes('experienceIQ')) {
      this.setActiveTab('experienceIQ')
    } else if (this.router.url.includes('arlo-smart')) {
      this.setActiveTab('arlo-smart');
    } else if (this.router.url.includes('servify-care')) {
      this.router.navigate(['/support/application/servify-care']);
      this.setActiveTab('servify-care');
    } else if (this.router.url.includes('SmartTownWiFi')) {
      this.router.navigate(['/support/application/SmartTownWiFi']);
      this.setActiveTab('MyCommunityIQ');
    } else if (this.router.url.includes('bark')) {
      this.router.navigate(['/support/application/bark']);
      this.setActiveTab('bark');
    }
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      //   scopes['cloud.rbac.csc.apps.protectiq.configuration'] = scopes['cloud.rbac.csc.apps.protectiq.configuration'] ? scopes['cloud.rbac.csc.apps.protectiq.configuration'] : [];

      const validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.experienceiq') !== -1 && scopes["cloud.rbac.csc.apps.experienceiq.configuration"]) {
            this.scopeFlag.experienceiq = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.protectiq') !== -1 && scopes["cloud.rbac.csc.apps.protectiq.configuration"]) {
            this.scopeFlag.protectiq = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.arlo') !== -1) {
            this.scopeFlag.arlo = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.servify') !== -1) {
            this.scopeFlag.servify = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.mycommunityiq') !== -1) {
            this.scopeFlag.mycommunityiq = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.apps.bark') !== -1) {
            this.scopeFlag.bark = true;
            continue;
          }
        }
      }
    } else {
      this.scopeFlag.experienceiq = true;
      this.scopeFlag.protectiq = true;
      this.scopeFlag.arlo = true;
      this.scopeFlag.servify = true;
      this.scopeFlag.mycommunityiq = true;
      this.scopeFlag.bark = true;
    }
  }

  setActiveTab(activeUrl: String) {
    this.activeTab = activeUrl;
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.getEIQandPIQNameAPI) this.getEIQandPIQNameAPI.unsubscribe();
    if (this.protectIqService.currentAvailabilityInfo) this.protectIqService.currentAvailabilityInfo.next({});// because of this is behaviour subject so if we unsubscribe means it will never invoke next time..
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.tabSelection();
    if (!this.containGS || !this.hasSubscriber) history.go(-2)
  }

  isSectionAvailable(attr, ents = []) {
    const isEntAvial = ents.filter(ent => {
      return this.ssoService.getEntitlementsArr().includes(ent);
    }).length;
    return $(`#applicationTabId`).attr(attr) && (!ents.length ? true : isEntAvial);
  }

  isSmbEnabled() {
    const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
    return (subInfo?.devices || []).filter(obj => obj.bSmbMode).length && subInfo?.isSmbOnboarded;
  }
  getEiq_PiqActiveStatus() {
    const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
    if ((subInfo?.devices || []).filter(obj => obj.bSmbMode).length > 0) return;
    this.spId = this.ssoService.getSPID();
    this.service.whiteLabellist(this.spId).subscribe((res: any) => {
      if (res?.body?.isActive) this.getEIQandPIQName();
    })
  }

  getEIQandPIQName() {
    this.spId = this.ssoService.getSPID();
    let requestEndpoints = [];
    requestEndpoints.push(
      this.http.get(`${environment.apiHost}/admin/application/custom/name?spid=${this.spId}&appName=CIES`).pipe(),
      this.http.get(`${environment.apiHost}/admin/application/custom/name?spid=${this.spId}&appName=CIEP`).pipe()
    )
    this.getEIQandPIQNameAPI = forkJoin(requestEndpoints).subscribe(([Piq, Eiq]: any) => {
      if (Piq[0].customAppName) {
        this.customAppName['ProtectIQ_Name'] = Piq[0].customAppName;
      }
      if (Eiq[0].customAppName) {
        this.customAppName['ExperienceIQ_Name'] = Eiq[0].customAppName;
      }
    })

  }

}
