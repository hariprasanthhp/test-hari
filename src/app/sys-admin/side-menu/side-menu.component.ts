import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { SsoAuthService } from '../../shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiUsageService } from '../services/api-usage.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ZipCodeApiService } from '../services/zipcode-upload.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  currentPage: string = 'organizations';
  language: any;
  pageAvailable: boolean;
  userInfo: any;
  orgData: any;
  orgName: string = '';
  isSysAdmin: boolean = false;
  showCOC = false;
  calloutcomeRead: boolean;
  calloutcomeWrite: boolean;
  showBlackPage: boolean;
  showCommandIQ: boolean;
  ORG_ID: any;
  showAPIUsage = false;
  orgInfoSubs: any;
  orgInfoEntitlementdata: any;
  showMobileApp = false
  billingStatusEnabled: boolean = false;
  isCA: boolean = false

  constructor(
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    public router: Router,
    private apiUsageService: ApiUsageService,
    private organizationApiService: OrganizationApiService,
    private http: HttpClient,
    private zipcodeService: ZipCodeApiService,
  ) {
    this.commonOrgService.currentPageData.subscribe((data: any) => {
      this.currentPage = data ? data : 'organizations';
    });
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));
    if (this.orgData) {
      this.orgName = this.orgData.name ? this.orgData.name : 'Calix';
    }

    this.commonOrgService.currentOrgData.subscribe((data: any) => {
      this.orgName = data;
    });
    let url = this.router.url;
    this.isSysAdmin = this.checkApplication(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.getorgInfoData();
  }

  ngOnInit() {
    this.isCA = WindowRefService.prototype.nativeWindow.includes('calixcloud-ca.calix.com') ? true : false
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.userInfo = this.sso.getUserInfo();
    this.getBillingList()

    //this.showApps();

    /* Nawas
      As this.showApps(); is being commented above. 
      For time being we have added csc check below 
    */
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[118] || enttlmnts[120]) {
      this.apps.csc = true;
    }
    if (enttlmnts[214] || enttlmnts[222] || enttlmnts[223]) {
      this.apps.Community = true;
    }
    if (enttlmnts[119] || enttlmnts[209]) {
      this.apps.cmc = true;
    }
    if (enttlmnts[209]) {
      this.apps.cmcPro = true;
    }
    // if (enttlmnts[200] || enttlmnts[201]) {
    //   this.apps.foundation = true;
    // }
    this.orgName = this.orgName ? this.orgName : 'Calix';

    if (environment['SSO_API_URL'] !== 'https://api.calix.ai') {
      this.showCOC = true;
    }

    let scope = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scope['cloud.rbac.csc.calloutcome.createview'] = scope['cloud.rbac.csc.calloutcome.createview'] ? scope['cloud.rbac.csc.calloutcome.createview'] : [];

      if ((scope['cloud.rbac.csc.calloutcome.createview'] && scope['cloud.rbac.csc.calloutcome.createview'].includes('read'))) {
        this.calloutcomeRead = true;
      }
      if ((scope['cloud.rbac.csc.calloutcome.createview'] && scope['cloud.rbac.csc.calloutcome.createview'].includes('write'))) {
        this.calloutcomeWrite = true;
      }

      if (scope['cloud.admin.orgs'] && (scope['cloud.admin.orgs'].includes('write') || scope['cloud.admin.orgs'].includes('read'))) {
        this.showBlackPage = true;
        this.showCommandIQ = true;
      }

      if (scope['cloud.admin.users'] && (scope['cloud.admin.users'].includes('write') || scope['cloud.admin.users'].includes('read'))) {
        this.showBlackPage = true;
        this.showCommandIQ = true;
      }
    } else {
      this.calloutcomeRead = true;
      this.calloutcomeWrite = true;
    }

    this.commonOrgService.showApiUsage.subscribe(res => {
      if (res) {
        this.showAPIUsage = res;
      } else {
        this.showAPIUsage = false;
      }
    })

    const showApiUsage = localStorage.getItem('apiUsage')
    if (showApiUsage && showApiUsage == 'true') {
      this.showAPIUsage = true;
    } else {
      this.showAPIUsage = false;
    }

    this.getGranteeOrgs();

    this.commonOrgService.showAccountManagement.subscribe(res => {
      if (res) {
        this.ORG_ID = res;
        this.getorgInfoData();
        this.getGranteeOrgs();
      }
    })
  }
  getorgInfoData() {
    this.orgInfoSubs = this.organizationApiService.orgInfoEntitlement(this.ORG_ID).subscribe((result: any) => {
      this.orgInfoEntitlementdata = result;

      if (result) {
        let obj = {};
        for (let i = 0; i < this.orgInfoEntitlementdata?.length; i++) {

          obj[this.orgInfoEntitlementdata[i].appType] = this.orgInfoEntitlementdata[i];

        }
        if ((obj[218]?.status !== 'Expired') || (obj[200] && obj[200].status !== 'Expired') || (obj[201] && obj[201].status !== 'Expired')) {
          this.apps.foundation = true;
          this.showMobileApp = true;
        }
        if ((obj[119] && obj[119].status !== 'Expired') || (obj[209] && obj[209].status !== 'Expired')) {
          this.apps.cmc = true;
        } else {
          this.apps.cmc = false;
        }
        if ((obj[209] && obj[209].status !== 'Expired')) {
          this.apps.cmcPro = true;
        } else {
          this.apps.cmcPro = false;
        }
        if (!obj[118] || (obj[118]?.status == 'Expired')) {
          this.apps.chatBot = false;
        } else {
          this.apps.chatBot = true;
        }

      }
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
    })
  }
  goToLink(url: string) {
    window.open(url, "_blank");
  }
  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }

  apps = {
    cmc: false,
    csc: false,
    fa: false,
    shad: false,
    orgAdmin: false,
    calixAdmin: false,
    foundation: false,
    Community: false,
    cmcPro: false,
    chatBot: true,
  };

  showApps(): void {
    this.apps = { ...this.apps, ...this.sso.showApps() };
    this.apps.fa = this.apps['cco'];
  }

  checkApplication(url: string) {
    if (url.indexOf('/systemAdministration/') > -1) {
      return true;
    }
    return false;
  }

  showAccountManagement = false;
  getGranteeOrgs() {
    this.http.get(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    ).subscribe((json: any) => {
      if (json?.['api-error']) {
        return;
      }

      if (json?.length) {
        this.showAccountManagement = true;
      } else {
        this.showAccountManagement = false;
      }
    });
  }

  getBillingList() {
    this.zipcodeService.marketingCloudCheck().subscribe((res: any) => {
      if (res) {
        this.billingStatusEnabled = res.billingStatusEnabled
      }
    }, (error) => {
      this.billingStatusEnabled = false
    })
  }

}
