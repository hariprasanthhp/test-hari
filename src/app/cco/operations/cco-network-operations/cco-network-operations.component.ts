import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-network-operations',
  templateUrl: './cco-network-operations.component.html',
  styleUrls: ['./cco-network-operations.component.scss']
})
export class CcoNetworkOperationsComponent implements OnInit {
  language: any;
  languageSubject: any;
  isDev: boolean = false;
  menus = {
    'policies': false,
    'alarm-category-sub-groups': false,
    'transformed-alarm-rules': false,
    'alarm-notifications': false
  }

  emailNtfcnActive = false;

  constructor(private translateService: TranslateService, private sso: SsoAuthService) {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      if (scopes['cloud.rbac.coc.operations.network.policies']) {
        this.menus['policies'] = true;
      }

      if (scopes['cloud.rbac.coc.operations.network.transformalarmrules']) {
        this.menus['transformed-alarm-rules'] = true;
      }

      if (scopes['cloud.rbac.coc.operations.network.alarmnotifications']) {
        this.menus['alarm-notifications'] = true;
      }

    } else {
      this.menus = {
        'policies': true,
        'alarm-category-sub-groups': true,
        'transformed-alarm-rules': true,
        'alarm-notifications': true
      }
    }

    let validUrls = ['cco-alarm-notifications', '/outage-workflow/view/', '/workflow/view/'];
    validUrls.forEach((url: any) => {
      if ((window.location.pathname).indexOf(url) !== -1) {
        this.emailNtfcnActive = true;
      }
    });

  }

}

