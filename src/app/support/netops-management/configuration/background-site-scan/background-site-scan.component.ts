import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { BackgroundSiteScanService } from '../../shared/service/background-site-scan.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { BackgroundSiteScanModel } from '../../shared/model/background-site-scan.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-background-site-scan',
  templateUrl: './background-site-scan.component.html',
  styleUrls: ['./background-site-scan.component.scss']
})
export class BackgroundSiteScanComponent implements OnInit {
  language: any;
  languageSubject;
  backgroundSiteScanObj: BackgroundSiteScanModel = new BackgroundSiteScanModel();
  orgId: string;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  show: boolean = false;
  allowSubnetConfig = true;
  constructor(private translateService: TranslateService, private backgroundSiteScanService: BackgroundSiteScanService,
    private sso: SsoAuthService, private router: Router, private titleService: Title,
  ) {
    let enttlmnts = this.sso.getEntitlements();
    this.orgId = this.sso.getOrgId();
    this.scopes = this.sso.getScopes();
    if (this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      // this.titleService.setTitle(' Site Scan - Configurations - Subscriber Operations - Operations - Operations - Calix Cloud');
      if (!(enttlmnts[118] || enttlmnts[120]) && this.scopes['cloud.rbac.coc.operations.subscriber.configurations']) {
        this.router.navigate(['/cco/operations/cco-subscriber-operations/configurations/dial-plan']);
        return;
      }

      if (!(enttlmnts[118] || enttlmnts[120]) && !this.scopes['cloud.rbac.coc.operations.subscriber.configurations']) {
        this.router.navigate(['/cco']);
        return;
      }

      if (!(this.scopes && this.scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && this.scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) && this.scopes['cloud.rbac.coc.operations.subscriber.configurations']) {
        this.router.navigate(['/cco/operations/cco-subscriber-operations/configurations/dial-plan']);
        return;
      }

      if (!(this.scopes && this.scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && this.scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) && !this.scopes['cloud.rbac.coc.operations.subscriber.configurations']) {
        this.router.navigate(['/cco']);
        return;
      }

    } else if (this.router.url.includes('/support/netops-management')) {
      // this.titleService.setTitle('Site Scan - Configurations - Netops - Service - Calix Cloud');
    }

  }
  setTitle(url) {
    if (this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      this.titleService.setTitle(`${this.language['Site_Scan']} - ${this.language['Configurations']} - ${this.language['Subscriber_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['Site_Scan']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    console.log("language", this.language);
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.successMsg = this.language['successfully updated'];
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    this.getScopes();
    let entitlementsObj = this.sso.getEntitlements();
    if (entitlementsObj[118] || entitlementsObj[120]) {
      this.getBackGroundsiteScan();
    }
    if (!this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      this.show = false;
    } else {
      this.show = true;
    }
    if (environment.VALIDATE_SCOPE) {
      this.scopes['cloud.rbac.csc.netops.config.site_scan'] = this.scopes['cloud.rbac.csc.netops.config.site_scan'] ? this.scopes['cloud.rbac.csc.netops.config.site_scan'] : [];
      if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.site_scan'] && this.scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      }
    } else {
      this.hasWriteAccess = true;
    }
    let enttlmnts = this.sso.getEntitlements();
    if (this.router.url.includes('cco/operations') && enttlmnts[210] && !enttlmnts[102]) {
      this.allowSubnetConfig = false;
    }
  }
  getBackGroundsiteScan() {
    this.loading = true;
    this.backgroundSiteScanService.getAutositeScanStatus(this.orgId).subscribe((res: BackgroundSiteScanModel) => {
      this.backgroundSiteScanObj = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMsg = error.statusText;
      this.showError = true;
    })
  }
  onSubmit() {
    this.loading = true;
    this.backgroundSiteScanService.updateAutoSiteScanStatus(this.backgroundSiteScanObj, this.orgId).subscribe(res => {
      this.showSuccess = true;
      this.successMsg = this.language['successfully updated'];
      this.getBackGroundsiteScan();
    }, error => {
      this.loading = false;
      this.errorMsg = error.statusText;
      this.showError = true;
    })
  }
  onCancel() {
    this.getBackGroundsiteScan();
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  getScopes() {

    let scopes = this.scopes;

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.netops.config.site_scan'] = scopes['cloud.rbac.csc.netops.config.site_scan'] ? scopes['cloud.rbac.csc.netops.config.site_scan'] : [];
      scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];
      scopes['cloud.rbac.csc.netops.config.ext_file_server'] = scopes['cloud.rbac.csc.netops.config.ext_file_server'] ? scopes['cloud.rbac.csc.netops.config.ext_file_server'] : [];
      scopes['cloud.rbac.csc.netops.config.secure_onboarding'] = scopes['cloud.rbac.csc.netops.config.secure_onboarding'] ? scopes['cloud.rbac.csc.netops.config.secure_onboarding'] : [];
      scopes['cloud.rbac.csc.netops.config.self_heal'] = scopes['cloud.rbac.csc.netops.config.self_heal'] ? scopes['cloud.rbac.csc.netops.config.self_heal'] : [];
      scopes['cloud.rbac.csc.netops.config.stale_purge'] = scopes['cloud.rbac.csc.netops.config.stale_purge'] ? scopes['cloud.rbac.csc.netops.config.stale_purge'] : [];
      scopes['cloud.rbac.csc.netops.config.subnet_config'] = scopes['cloud.rbac.csc.netops.config.subnet_config'] ? scopes['cloud.rbac.csc.netops.config.subnet_config'] : [];
      scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] = scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] ? scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] : [];
      scopes['cloud.rbac.csc.netops.config.speed_test'] = scopes['cloud.rbac.csc.netops.config.speed_test'] ? scopes['cloud.rbac.csc.netops.config.speed_test'] : [];

      let scopeFlagCheck: any = {};
      if (scopes && scopes['cloud.rbac.csc.netops.config.dial_plan'] !== undefined && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('read') !== -1) {
        scopeFlagCheck.showDialPlan = true;
      }


      if (scopes && scopes['cloud.rbac.csc.netops.config.ext_file_server'] !== undefined && scopes['cloud.rbac.csc.netops.config.ext_file_server'].indexOf('read') !== -1) {
        scopeFlagCheck.showExtrnlFileSrvr = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.secure_onboarding'] !== undefined && scopes['cloud.rbac.csc.netops.config.secure_onboarding'].indexOf('read') !== -1) {
        scopeFlagCheck.showSecureOnboarding = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.self_heal'] !== undefined && scopes['cloud.rbac.csc.netops.config.self_heal'].indexOf('read') !== -1) {
        scopeFlagCheck.showSelfHeal = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.stale_purge'] !== undefined && scopes['cloud.rbac.csc.netops.config.stale_purge'].indexOf('read') !== -1) {
        scopeFlagCheck.showStaleDevicePurge = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.subnet_config'] !== undefined && scopes['cloud.rbac.csc.netops.config.subnet_config'].indexOf('read') !== -1) {
        scopeFlagCheck.showSubnetConfig = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.site_scan'] !== undefined && scopes['cloud.rbac.csc.netops.config.site_scan'].indexOf('read') !== -1) {
        scopeFlagCheck.showAutoSiteScan = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] !== undefined && scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'].indexOf('read') !== -1) {
        scopeFlagCheck.showEdgeSuite = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.config.speed_test'] !== undefined && scopes['cloud.rbac.csc.netops.config.speed_test'].indexOf('read') !== -1) {
        scopeFlagCheck.showSpeedTest = true;
      }

      if (this.router.url.includes('support/netops-management')) {
        if (scopeFlagCheck.showAutoSiteScan && this.sso.getCscType() !== 'DME') { }
        else if (scopeFlagCheck.showDialPlan) { this.router.navigate(['./support/netops-management/configuration/dial-plan']) }
        else if (scopeFlagCheck.showExtrnlFileSrvr) { this.router.navigate(['./support/netops-management/configuration/external-file-server-list']) }
        else if (scopeFlagCheck.showSecureOnboarding && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/configuration/secure-onboarding']) }
        else if (scopeFlagCheck.showSelfHeal && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/configuration/self-heal']) }
        else if (scopeFlagCheck.showStaleDevicePurge) { this.router.navigate(['./support/netops-management/configuration/stale-device-purge']) }
        else if (scopeFlagCheck.showSubnetConfig) { this.router.navigate(['./support/netops-management/configuration/subnet-configuration']) }
        else if (scopeFlagCheck.showSpeedTest && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/configuration/speed-test']) }
        else if (scopeFlagCheck.showEdgeSuite) { this.router.navigate(['./support/netops-management/configuration/edge-suites']) }
      }

    } else if (this.sso.getCscType() === 'DME' && this.router.url.includes('support/netops-management')) {
      this.router.navigate(['./support/netops-management/configuration/dial-plan'])
    }
  }

}
