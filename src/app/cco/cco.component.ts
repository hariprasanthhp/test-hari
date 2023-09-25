declare let pendo: any;
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from '../shared/services/window-ref.service';
import { HealthService } from './health/service/health.service';
import { WebsocketService } from './shared/services/websocket.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cco',
  templateUrl: './cco.component.html',
  styleUrls: ['./cco.component.scss']
})
export class CcoComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject: any;
  tosAgreed: boolean = false;
  baseUrl: string;

  menus = {
    home: false,
    issues: false,
    health: false,
    traffic: false,
    services: false,
    operations: false,
    dashboard: false
  }

  noScopes = true;


  constructor(private translateService: TranslateService,
    public router: Router,
    private sso: SsoAuthService,
    private healthService: HealthService,
    private webSocketService: WebsocketService, private titleService: Title) {
    this.baseUrl = WindowRefService.prototype.nativeWindow.split('//')[1].split('.')[0];
    if (this.router.url.split("/")[1] == 'cco') {
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
      })("c68f6635-46a2-4b81-497f-30da53e4a7a6");

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
    this.titleService.setTitle('Calix Cloud - Operations');
    this.sso.setRelativeUrl('cco');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit(): void {
    this.sso.dwnldCcoWrkflwReportId();
    this.sso.isFromCcoModule = true;
    if (!this.router.url.includes("/health")) {
      this.healthService.previousUrl = "";
      this.healthService.isReport = false;
    }

    if (!this.router.url.includes("/traffic")) {
      this.webSocketService.previousURL = "";
    }

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.insights') !== -1) {
            this.menus['home'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.issues') !== -1) {
            this.menus['issues'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.health') !== -1) {
            this.menus['health'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic') !== -1) {
            this.menus['traffic'] = true;
            continue;
          }

          // if (validScopes[i].indexOf('cloud.rbac.coc.systems') !== -1) {
          //   this.menus['systems'] = true;
          //   continue;
          // }

          if (validScopes[i].indexOf('cloud.rbac.coc.services') !== -1) {
            this.menus['services'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations') !== -1) {
            this.menus['operations'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.dashboard') !== -1) {
            this.menus['dashboard'] = true;
            continue;
          }
        }
      }

    } else {
      this.menus = {
        home: true,
        issues: true,
        health: true,
        traffic: true,
        services: true,
        operations: true,
        dashboard: true
      }

    }

    let keys = Object.keys(this.menus);

    keys.forEach((key: any) => {
      if (this.menus[key]) {
        this.noScopes = false;

      }
    });

    this.verifyTOS();

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  verifyTOS() {
    if (this.sso.isCcoTermsAccept()) {
      this.tosAgreed = true;
    }

    this.sso.ccoTos$.subscribe((data) => {
      // console.log('subscribe from cco ', data);
      this.tosAgreed = true;
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
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
