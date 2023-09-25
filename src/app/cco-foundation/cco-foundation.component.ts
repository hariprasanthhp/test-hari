declare let pendo;
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { WindowRefService } from '../shared/services/window-ref.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cco-foundation',
  templateUrl: './cco-foundation.component.html',
  styleUrls: ['./cco-foundation.component.scss']
})
export class CcoFoundationComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  baseUrl: string;
  isDev: boolean = false;
  hideFoundation: boolean = false;
  tosAgreed: boolean = false;
  validateScopeStage: boolean;
  constructor(
    private router: Router,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.isDev = true;
    // } else this.isDev = false;

    // if (!this.isDev) {
    //   this.router.navigate(['./support']);
    // }
    this.baseUrl = WindowRefService.prototype.nativeWindow.split('//')[1].split('.')[0];
    if (this.router.url.split("/")[1] == 'cco-foundation') {
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
      })("dea8dc45-9d31-4ba6-7194-2c18b0b1164e");

      if (localStorage.getItem("calix.userId") && localStorage.getItem('calix.spid')) {
        pendo.initialize({
          visitor: {
            id: localStorage.getItem("calix.userId"), // Required if user is logged in
            lang: sessionStorage.getItem("defaultLanguage"),
            url: this.getUrl(),
            orgId: JSON.parse(localStorage.getItem("calix.login_data")).OrgId,
            userType: JSON.parse(localStorage.getItem("calix.login_data")).user_type
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

    this.titleService.setTitle('Insights - Home - Deployment - Calix Cloud');
    this.sso.setRelativeUrl('foundation');

    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => {
      if (this.router.url.includes("/cco-foundation/foundation-home") || this.router.url.includes("/cco-foundation/foundation-operations/foundation-system-operation/secure-onboard") || this.router.url.includes("/cco-foundation/subscribers-systems/search") || this.router.url.includes("/cco-foundation/foundation-systems/foundation-manage/foundation-system-list") || this.router.url.includes("/cco-foundation/foundation-systems/foundation-geographic-view")) {
        return false;
      }
      return curr.routeConfig === future.routeConfig;
    };

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })

  }

  ngOnInit(): void {
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.validateScopeStage = true;
    // } else this.validateScopeStage = false;
    this.sso.dwnldCcoWrkflwReportId();
    let scopes = this.sso.getScopes();
    let validScopes: any = Object.keys(scopes);
    if (validScopes) {
      for (let i = 0; i < validScopes.length; i++) {
        if (validScopes[i].indexOf('cloud.rbac.foundation.configurations') !== -1 || validScopes[i].indexOf('cloud.rbac.foundation.insights') !== -1 || validScopes[i].indexOf('cloud.rbac.foundation.reports') !== -1 || validScopes[i].indexOf('cloud.rbac.foundation.systems') !== -1) {
          let enttlmnts = this.sso.getEntitlements();
          if (enttlmnts[200] || enttlmnts[201] || enttlmnts[218]) {
            this.hideFoundation = true;
          }
          break;
        }
      }
      // } else {
      //   for (let i = 0; i < validScopes.length; i++) {
      //     if (validScopes[i].indexOf('cloud.rbac.foundation') !== -1) {
      //       let enttlmnts = this.sso.getEntitlements();
      //       if (enttlmnts[200] || enttlmnts[201]) {
      //         this.hideFoundation = true;
      //       }
      //       break;
      //     }
      //   }
    }
    this.verifyTOS();
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.tosSub) {
      this.tosSub.unsubscribe();
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

  tosSub: any;

  verifyTOS() {
    if (this.sso.isFoundationTermsAccept()) {
      this.tosAgreed = true;
    }

    this.tosSub = this.sso.foundationTos$.subscribe((data) => {
      this.tosAgreed = true;
    });
  }

}
