import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit, OnDestroy {

  language;
  languageSubject;
  menus: any = [];
  pageAcceesObs: any;
  hasPageAccess: boolean = true;;

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService) { }


  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.health.pon') !== -1) {
            this.menus['pon'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.health.ont') !== -1) {
            this.menus['ont'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.health.ethernet') !== -1) {
            this.menus['ethernet'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.health.ae') !== -1) {
            this.menus['ae'] = true;
            continue;
          }
          // if (validScopes[i].indexOf('cloud.rbac.coc.health.dsl') !== -1) {
          //   this.menus['dsl'] = true;
          //   continue;
          // }

          // if (validScopes[i].indexOf('cloud.rbac.coc.health.pon.realtime') !== -1) {
          //   this.menus['realtime'] = true;
          //   continue;
          // }

        }
      }

    } else {
      this.menus = {
        pon: true,
        ont: true,
        ethernet: true,
        ae: true,
        dsl:true,
      }

    }




  }

  ngOnDestroy(): void {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
