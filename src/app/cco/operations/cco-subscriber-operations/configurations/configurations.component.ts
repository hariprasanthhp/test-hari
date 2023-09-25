import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  language: any;
  languageSubject: any;
  showSiteScan = false;
  showEdgeSuite: boolean = false;
  constructor(
    private translateService: TranslateService,
    public router: Router,
    public sso: SsoAuthService
  ) { }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    let entitlementsObj = this.sso.getEntitlements();
    if ((entitlementsObj[118] || entitlementsObj[120]) && (scopes && scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1)) {
      this.showSiteScan = true;
    }

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.coc.operations.subscriber.operations.edgesuitesbulkprovisioning'] = scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] || [];
      if (scopes && scopes['cloud.rbac.coc.operations.subscriber.operations.edgesuitesbulkprovisioning'] && scopes['cloud.rbac.coc.operations.subscriber.operations.edgesuitesbulkprovisioning'].indexOf('read') !== -1) {
        this.showEdgeSuite = true;
      }
    } else {
      this.showEdgeSuite = true;
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }

}
