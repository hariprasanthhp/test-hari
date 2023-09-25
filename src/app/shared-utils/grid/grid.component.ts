import { Component, OnDestroy, OnInit } from '@angular/core';

import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
export enum AcessModifiers {
  READ = "read",
  WRITE = "write"
}


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  language: any;
  languageSubject;
  baseUrl: string;

  isDev: boolean = false;

  menus = {
    home: false,
    issues: false,
    health: false,
    traffic: false,
    systems: false,
    operations: false
  }

  urls = {
    home: '/cco/home',
    issues: '/cco/issues',
    health: '/cco/health',
    traffic: '/cco/traffic',
    systems: '/cco/system',
    operations: '/cco/operations'
  }

  urlsInfo = {}


  ccoUrl = '/cco';
  secureAccessSub: any;
  federatedLoginSub: any;


  constructor(private router: Router,
    public sso: SsoAuthService, private translateService: TranslateService) {
    this.showApps();
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    let roles = this.sso.getRoles();
    let isSysAdmin: boolean = false;
    if (roles && (roles.indexOf('SysAdmin') !== -1 || roles.indexOf('System Admin') !== -1)) {
      isSysAdmin = true;
    }
    if (this.sso.isSecureAccess() || isSysAdmin) {
      this.sso.isFromCcoModule = false;
    }
  }

  ngOnInit(): void {
    this.urlsInfo = this.sso.getCCOUrlInfo();
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

          if (validScopes[i].indexOf('cloud.rbac.coc.systems') !== -1) {
            this.menus['systems'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations') !== -1) {
            this.menus['operations'] = true;
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
        systems: true,
        operations: true
      }

    }

    let keys = Object.keys(this.menus);

    if (keys) {
      for (let k = 0; k < keys.length; k++) {
        let key = keys[k];

        if (!this.menus[key]) {
          continue;
        }


        if (this.urlsInfo[key]) {
          let ukeys = Object.keys(this.urlsInfo[key]);

          if (ukeys.length) {
            for (let i = 0; i < ukeys.length; i++) {
              if (scopes[this.urlsInfo[key][ukeys[i]].scope]) {
                this.urls[key] = this.urlsInfo[key][ukeys[i]].path;

                this.ccoUrl = this.urlsInfo[key][ukeys[i]].path;

                break;
              }
            }
          }

        }

        if (this.menus[key]) {
          break;
        }
      }
    }



    // keys.forEach((key: any) => {
    //   if (this.urlsInfo[key]) {
    //     let ukeys = Object.keys(this.urlsInfo[key]);

    //     if (ukeys.length) {
    //       for (let i = 0; i < ukeys.length; i++) {
    //         if (scopes[this.urlsInfo[key][ukeys[i]].scope]) {
    //           this.urls[key] = this.urlsInfo[key][ukeys[i]].path;

    //           break;
    //         }
    //       }
    //     }

    //   }
    // });


    //let urlKeys = Object.keys(this.urls);




    this.baseUrl = WindowRefService.prototype.nativeWindow;

    this.secureAccessSub = this.sso.secResult$.subscribe((json: any) => {
      this.showApps();
    });

    this.federatedLoginSub = this.sso.federatedLogin$.subscribe((json: any) => {
      this.showApps();
    });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject?.unsubscribe();
    this.federatedLoginSub?.unsubscribe();
    this.secureAccessSub?.unsubscribe();
  }

  apps = {
    cmc: false,
    csc: false,
    cco: false,
    shad: false,
    orgAdmin: false,
    calixAdmin: false,
    OrgAccess: false,
    exitOrgAccess: false,
    foundation: false
  };

  userIconPath = 'assets/images/nick.png';
  showApps(): void {
    this.apps = this.sso.showApps();
  }

  doExitSecureAccess(): any {
    this.sso.doExitSecureAccess();
  }


  doLogout(): any {
    this.router.navigate(['logout']);
  }

  isActive(basePath) {
    return this.router.url.includes(basePath);
  }

}
