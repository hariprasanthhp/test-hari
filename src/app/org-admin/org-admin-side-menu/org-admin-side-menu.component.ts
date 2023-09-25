import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { AcessModifiers, SsoAuthService } from '../../shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { ApiUsageService } from 'src/app/sys-admin/services/api-usage.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ZipCodeApiService } from 'src/app/sys-admin/services/zipcode-upload.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { ChatBotService } from 'src/app/sys-admin/services/chat-bot.service';
@Component({
  selector: 'app-org-admin-side-menu',
  templateUrl: './org-admin-side-menu.component.html',
  styleUrls: ['./org-admin-side-menu.component.scss']
})
export class OrgAdminSideMenuComponent implements OnInit, OnDestroy {

  currentPage = 'users';
  language: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  languageSubject: any;

  userInfo: any = '';
  showCOC = false;
  isDev: boolean;
  showBlackPage: boolean;
  showCommandIQ: boolean;
  showSupportInfo: boolean;
  calloutcomeRead: boolean = false;
  calloutcomeWrite: boolean = false;
  isExternalTicketInvisible: boolean = false;
  apiUsageSub: any;
  ORG_ID: any;
  showAPIUsage = false;
  billingStatusEnabled: boolean = false;
  isCA: boolean = false;
  chatbotSub: any;
  constructor(private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    public router: Router,
    private apiUsageService: ApiUsageService,
    private http: HttpClient,
    private zipcodeService: ZipCodeApiService,
    private chatBotService: ChatBotService,

  ) {
    this.commonOrgService.currentPageData.subscribe((data: any) => {
      this.currentPage = data ? data : "users";
    });
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    const url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    localStorage.setItem('apiUsage', 'false');
  }
  ngOnDestroy(): void {
    this.languageSubject.unsubscribe();
    this.apiUsageSub.unsubscribe();
    this.chatbotSub.unsubscribe();
  }

  ngOnInit() {
    this.isCA = WindowRefService.prototype.nativeWindow.includes('calixcloud-ca.calix.com') ? true : false
    console.log(this.isCA, 'isCA')
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.getBillingList()
    this.userInfo = this.sso.getUserInfo();

    this.showApps();

    if (environment['SSO_API_URL'] !== 'https://api.calix.ai') {
      this.showCOC = true;
    }
    this.isExternalTicketInvisible = localStorage.getItem("calix.csc_type") === 'EME';
    this.getApiUsageQuota();
    this.getGranteeOrgs();
  }


  goToLink(url: string) {
    window.open(url, "_blank");
  }
  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.translateService.changeLanguage(language);
  }

  flowAnalyzePageSet() {
    this.currentPage = 'flowAnalyze';
  }

  apps = {
    cmc: false,
    cmcPro: false,
    csc: false,
    fa: false,
    shad: false,
    orgAdmin: false,
    calixAdmin: false,
    foundation: false,
    Community: false,
    chatBot: true,
  };

  showCallHome: boolean = true;
  showOpsCloud = true;
  showApps(): void {
    let enttlmnts = this.sso.getEntitlements();
    let roles = this.sso.getRoles();

    if (enttlmnts[200] || enttlmnts[201]) {
      this.apps.shad = true;
    }

    if (enttlmnts[210] && !enttlmnts[102]) {
      this.showCallHome = false;
      this.showOpsCloud = false;
    }

    if (enttlmnts[200] || enttlmnts[201] || enttlmnts[218]) {
      this.apps.foundation = true;
      if (this.sso.checFoundationScope(AcessModifiers.WRITE) || this.sso.checFoundationScope(AcessModifiers.READ)) {
        //this.showBlackPage = true;
        //this.showCommandIQ = true;
        this.showSupportInfo = true;
      }
    }

    if (enttlmnts[119] || enttlmnts[209]) {
      this.apps.cmc = true;
    }

    if (enttlmnts[118] || enttlmnts[120]) {
      this.apps.csc = true;
    }

    if (enttlmnts[102] || enttlmnts[210]) {
      this.apps.fa = true;
    }
    if (enttlmnts[214] ||enttlmnts[222] || enttlmnts[223]  ) {
      this.apps.Community = true;
    }
    if (enttlmnts[209]) {
      this.apps.cmcPro = true;
    }

    if (roles && roles.indexOf('OrgAdmin') !== -1) {
      this.apps.orgAdmin = true;
    }

    if (roles && roles.indexOf('System Admin') !== -1) {
      this.apps.calixAdmin = true;
    }

    if (roles && roles.indexOf('SysAdmin') !== -1) {
      this.apps.calixAdmin = true;
    }
    this.getChatbotFlag(enttlmnts);

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
      if (!scope['cloud.admin.users']) {
        this.apps.chatBot = false;
      }

    } else {
      this.calloutcomeRead = true;
      this.calloutcomeWrite = true;
      this.showBlackPage = true;
      this.showCommandIQ = true;
    }

  }


  getApiUsageQuota() {
    this.apiUsageSub = this.apiUsageService.getaApiQuotaDetails(this.ORG_ID).subscribe(
      (res: any) => {
        if (res && res?.allowed_count && res?.allowed_count != "0") {
          this.showAPIUsage = true;
        }
      },
    );
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

  getChatbotFlag(enttlmnts) {
    this.chatbotSub = this.chatBotService.fetchChatbotFlag().subscribe((res: any) => {
      if (res?.allowed_for_chatbot =='true' && enttlmnts[118]) {
        this.apps.chatBot = true;
      } else {
        this.apps.chatBot = false;
      }
    }, (error) => {
      console.log('error ==>', JSON.stringify(error));
      this.apps.chatBot = false;
    })
  }
}
