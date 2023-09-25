import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
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

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network.realtime') !== -1) {
            this.menus['realtime'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network.report') !== -1) {
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
