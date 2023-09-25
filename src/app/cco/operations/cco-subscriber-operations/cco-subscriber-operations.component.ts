import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-subscriber-operations',
  templateUrl: './cco-subscriber-operations.component.html',
  styleUrls: ['./cco-subscriber-operations.component.scss']
})
export class CcoSubscriberOperationsComponent implements OnInit {
  language: any;
  languageSubject: any;
  scope: any = [];
  showOperations: boolean = true;
  configurationUrl = '/cco/operations/cco-subscriber-operations/configurations';
  isConfigurationsActive = false;
  constructor(private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router) {
    if ((router.url).indexOf('/cco/operations/cco-subscriber-operations/configurations') !== -1) {
      this.isConfigurationsActive = true;
    }
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })

    let scopes = this.sso.getScopes();
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.showOperations = false;
    }

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.subscriber.operations') !== -1) {
            this.scope['operationsAccess'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.subscriber.configurations') !== -1) {
            this.scope['configurationsAccess'] = true;
            continue;
          }
        }
      }

    } else {
      this.scope = {
        subscriberprofileread: true,
        operationsAccess: true,
        configurationsAccess: true
      }

    }

    if (!(enttlmnts[118] || enttlmnts[120]) && this.scope['configurationsAccess']) {
      this.configurationUrl = '/cco/operations/cco-subscriber-operations/configurations/dial-plan';
      return;
    }

    if (!(enttlmnts[118] || enttlmnts[120]) && !this.scope['configurationsAccess']) {
      this.configurationUrl = '/cco';
      return;
    }

    if (!(scopes && scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) && this.scope['configurationsAccess']) {
      this.configurationUrl = '/cco/operations/cco-subscriber-operations/configurations/dial-plan';
      return;
    }

    if (!(scopes && scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) && !this.scope['configurationsAccess']) {
      this.configurationUrl = '/cco';
      return;
    }

  }

}
