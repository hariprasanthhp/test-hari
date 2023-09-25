declare let pendo: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from "../shared/services/sso-auth.service";
import { MarketingApiService } from './shared/services/marketing-api.sevice';
import { MessageService } from 'primeng/api';
import { TranslateService } from 'src/app-services/translate.service';
import { WindowRefService } from '../shared/services/window-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
  providers: [MessageService]
})
export class MarketingComponent implements OnInit, OnDestroy {

  language;
  languageSubject;
  baseUrl: string;


  constructor(
    private sso: SsoAuthService,
    private titleService: Title,
    private marketingApiService: MarketingApiService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.sso.setRelativeUrl('marketing');
    this.titleService.setTitle('Marketing - Calix Cloud');
    let entitlement = this.sso.getEntitlements();
    this.baseUrl = WindowRefService.prototype.nativeWindow.split('//')[1].split('.')[0];
    if (this.router.url.split("/")[1] == 'marketing') {
      (function (apiKey) {
        (function (p, e, n, d, o) {
          var v, w, x, y, z;
          o = p[d] = p[d] || {};
          o._q = [];
          v = ["initialize", "identify", "updateOptions", "pageLoad", "track"];
          for (w = 0, x = v.length; w < x; ++w)
            (function (m) {
              o[m] =
                o[m] ||
                function () {
                  o._q[m === v[0] ? "unshift" : "push"](
                    [m].concat([].slice.call(arguments, 0))
                  );
                };
            })(v[w]);
          y = e.createElement(n);
          y.async = !0;
          y.src = "https://cdn.pendo.io/agent/static/" + apiKey + "/pendo.js";
          z = e.getElementsByTagName(n)[0];
          z.parentNode.insertBefore(y, z);
        })(window, document, "script", "pendo");
      })("1a540890-2412-4f18-4d82-7e719948b829");

      if (localStorage.getItem("calix.userId") && localStorage.getItem('calix.spid')) {
        pendo.initialize({
          visitor: {
            id: localStorage.getItem("calix.userId"), // Required if user is logged in
            lang: sessionStorage.getItem("defaultLanguage"),
            url: this.getUrl(),
            orgId: JSON.parse(localStorage.getItem("calix.login_data")).OrgId,
            userType: JSON.parse(localStorage.getItem("calix.login_data")).user_type,
            CMCType: entitlement['209'] ? 'CMC Plus' : 'CMC'
            // language: "fr_CA",
            // visitor_lang: "FR_CS",
          },
          account: {
            id: localStorage.getItem("calix.spid"),
            // language: localStorage.getItem("defaultLanguage"), // Highly recommended
          },
        });
      }
    }

  }

  tosAgreed = false;
  showMarketing = false;

  ngOnInit(): void {
    this.sso.dwnldCcoWrkflwReportId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })

    if (this.sso.isMarketingTermsAccept()) {
      this.tosAgreed = true;
    }
    this.baseApiLoader();
    this.sso.cmcTos$.subscribe((data) => {
      this.tosAgreed = true;
      this.baseApiLoader();
    });

    let scopes = this.sso.getScopes();
    let validScopes: any = Object.keys(scopes);

    if (validScopes) {
      for (let i = 0; i < validScopes.length; i++) {
        if (validScopes[i].indexOf('cloud.rbac.cmc') !== -1 || validScopes[i].indexOf('cloud.cmc') !== -1) {
          let enttlmnts = this.sso.getEntitlements();
          if (enttlmnts[119] || enttlmnts[209]) {
            this.showMarketing = true;
          }

          break;
        }
      }
    }


    setTimeout(() => {
      this.showSuccess();
    }, 2000);
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  baseApiLoader() {
    if (this.tosAgreed) {
      let scope = this.sso.getScopes();
      this.marketingApiService.openQlikConnection();
      // if (!this.sso.isSecureAccess()) {
      this.marketingApiService.userPreferenceApiLoader();
      // }
    }
  }
  showSuccess() {
    let gp = this.sso.getGracePeriodsNew();     //this.sso.getGracePeriods();
    let roles = this.sso.getRoles();
    if (gp && roles && roles.indexOf('OrgAdmin') !== -1) {
      for (let i = 0; i < gp.length; i++) {
        this.messageService.add({ severity: 'warn', summary: gp[i], detail: '', sticky: true });
      }
    }

  }


  getUrl() {
    if (this.baseUrl == 'cloud-stg') {
      return 'stage'
    } else if (this.baseUrl == 'calixcloud-ca') {
      return 'prod_ca'
    } else if (this.baseUrl == 'stage') {
      return 'stage_local'
    } else if (this.baseUrl.split(':')[0] == 'localhost') {
      return 'local'
    } else if (this.baseUrl == 'calixcloud') {
      return 'prod'
    } else if (this.baseUrl == 'cloud-dev') {
      return 'dev'
    } else {
      return 'contact admin'
    }
  }
}
