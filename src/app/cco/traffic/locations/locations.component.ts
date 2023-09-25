import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  language: any;
  languageSubject;

  menus = {
    realtime: false,
    report: false,
  }

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/traffic/') > -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.realtime') !== -1) {
            this.menus['realtime'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.report') !== -1) {
            this.menus['report'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        realtime: true,
        report: true,
      }
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
