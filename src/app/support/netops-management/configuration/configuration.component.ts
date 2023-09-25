import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit, OnDestroy {

  language: any;
  languageSubject: Subscription;

  showAutoSiteScan = false;
  showDialPlan = false;
  showExtrnlFileSrvr = false;
  showSecureOnboarding = false;
  showSelfHeal = false;
  showStaleDevicePurge = false;
  showSubnetConfig = false;
  showSpeedTest: boolean = false;
  showEdgeSuite: boolean = false;

  constructor(
    private translateService: TranslateService,
    public router: Router,
    public sso: SsoAuthService
  ) {
    this.sso.setActionLog('CSC', 'pageHit', 'Configuration', '/support/netops-management/configuration/background-site-scan', 'Configuration Module background-site-scan page loaded');
  }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.netops.config.site_scan'] = scopes['cloud.rbac.csc.netops.config.site_scan'] ? scopes['cloud.rbac.csc.netops.config.site_scan'] : [];
      scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];
      scopes['cloud.rbac.csc.netops.config.ext_file_server'] = scopes['cloud.rbac.csc.netops.config.ext_file_server'] ? scopes['cloud.rbac.csc.netops.config.ext_file_server'] : [];
      scopes['cloud.rbac.csc.netops.config.secure_onboarding'] = scopes['cloud.rbac.csc.netops.config.secure_onboarding'] ? scopes['cloud.rbac.csc.netops.config.secure_onboarding'] : [];
      scopes['cloud.rbac.csc.netops.config.self_heal'] = scopes['cloud.rbac.csc.netops.config.self_heal'] ? scopes['cloud.rbac.csc.netops.config.self_heal'] : [];
      scopes['cloud.rbac.csc.netops.config.stale_purge'] = scopes['cloud.rbac.csc.netops.config.stale_purge'] ? scopes['cloud.rbac.csc.netops.config.stale_purge'] : [];
      scopes['cloud.rbac.csc.netops.config.subnet_config'] = scopes['cloud.rbac.csc.netops.config.subnet_config'] ? scopes['cloud.rbac.csc.netops.config.subnet_config'] : [];
      scopes['cloud.rbac.csc.netops.config.speed_test'] = scopes['cloud.rbac.csc.netops.config.speed_test'] ? scopes['cloud.rbac.csc.netops.config.speed_test'] : [];
      // scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] = scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] || [];



      if (scopes && scopes['cloud.rbac.csc.netops.config.dial_plan'] !== undefined && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('read') !== -1) {
        this.showDialPlan = true;
      }


      if (scopes && scopes['cloud.rbac.csc.netops.config.ext_file_server'] !== undefined && scopes['cloud.rbac.csc.netops.config.ext_file_server'].indexOf('read') !== -1) {
        this.showExtrnlFileSrvr = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.secure_onboarding'] !== undefined && scopes['cloud.rbac.csc.netops.config.secure_onboarding'].indexOf('read') !== -1) {
        this.showSecureOnboarding = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.self_heal'] !== undefined && scopes['cloud.rbac.csc.netops.config.self_heal'].indexOf('read') !== -1) {
        this.showSelfHeal = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.stale_purge'] !== undefined && scopes['cloud.rbac.csc.netops.config.stale_purge'].indexOf('read') !== -1) {
        this.showStaleDevicePurge = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.subnet_config'] !== undefined && scopes['cloud.rbac.csc.netops.config.subnet_config'].indexOf('read') !== -1) {
        this.showSubnetConfig = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) {
        this.showAutoSiteScan = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.speed_test'] !== undefined && scopes['cloud.rbac.csc.netops.config.speed_test'].indexOf('read') !== -1) {
        this.showSpeedTest = true;
      }

      // if (scopes && scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] !== undefined && scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'].indexOf('read') !== -1) {
      //   this.showEdgeSuite = true;
      // }

    } else {
      this.showAutoSiteScan = true;
      this.showDialPlan = true;
      this.showExtrnlFileSrvr = true;
      this.showSecureOnboarding = true;
      this.showSelfHeal = true;
      this.showStaleDevicePurge = true;
      this.showSubnetConfig = true;
      this.showSpeedTest = true
      // this.showEdgeSuite = true;
    }



    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy(): void {
    this.languageSubject.unsubscribe();
  }

}
