declare let pendo: any;
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service'
import { WindowRefService } from '../shared/services/window-ref.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [MessageService]
})
export class SupportComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  tosAgreed = false;
  showSupport = false;
  baseUrl: string;

  constructor(private messageService: MessageService, public router: Router,
    private translateService: TranslateService,
    private sso: SsoAuthService, private titleService: Title) {
    this.baseUrl = WindowRefService.prototype.nativeWindow.split('//')[1].split('.')[0];
    if (this.router.url.split("/")[1] == 'support') {
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
      })("84bae293-65f4-42f3-731d-a06b928db61f");

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
    this.titleService.setTitle('Calix Cloud - Support');
    this.sso.setRelativeUrl('support');
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => {
      if (this.router.url.includes("/support/subscriber/search") || this.router.url.includes("/support/overview")) {
        return false;
      }
      return curr.routeConfig === future.routeConfig;
    };
    let externalUserInfo = localStorage.getItem('externalUser');
    if (externalUserInfo && JSON.parse(externalUserInfo) instanceof Object && JSON.parse(externalUserInfo)?.externalUser)
      this.router.navigate(['/support/search'], { state: JSON.parse(externalUserInfo) });
  }


  ngOnInit() {
    this.sso.dwnldCcoWrkflwReportId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    if (this.sso.isSupportTermsAccept()) {
      this.tosAgreed = true;
    }

    this.sso.cscTos$.subscribe((data) => {
      console.log('subscribe from csc ', data);
      this.tosAgreed = true;
    });

    let scopes = this.sso.getScopes();
    let validScopes: any = Object.keys(scopes);

    if (validScopes) {
      for (let i = 0; i < validScopes.length; i++) {
        if (validScopes[i].indexOf('cloud.csc') !== -1 || validScopes[i].indexOf('cloud.rbac.csc') !== -1 || validScopes[i].indexOf('cloud.rbac.csc.netops') !== -1) {
          let enttlmnts = this.sso.getEntitlements();
          if (enttlmnts[118] || enttlmnts[120]) {
            this.showSupport = true;
          }

          break;
        }
      }
    }

    setTimeout(() => {
      this.showSuccess();
    }, 2000);


  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
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

  clear() {
    this.messageService.clear();
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
