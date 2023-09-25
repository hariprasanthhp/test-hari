import { SecureOnboardModel } from './../../shared/model/secure-onboard.model';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SecureOnBoardingService } from '../../shared/service/secure-on-boarding.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-secure-onboarding',
  templateUrl: './secure-onboarding.component.html',
  styleUrls: ['./secure-onboarding.component.scss'],
  //providers: [SecureOnBoardingService, SsoAuthService]
})
export class SecureOnboardingComponent implements OnInit {
  language: any;
  languageSubject;
  secureOnBoardingObj: SecureOnboardModel = new SecureOnboardModel();
  orgId: any;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  disableSecureOnBoarding: boolean = false;
  hasScopeAccess = false;
  constructor(private translateService: TranslateService,
    private SsoAuthService: SsoAuthService,
    private titleService: Title,
    private secureOnBoardingService: SecureOnBoardingService, public router: Router) {
    this.scopes = this.SsoAuthService.getScopes();

  }
  setTitle(url) {
    if (this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Secure Onboarding']} - ${this.language['settings']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/cco/services/configuration/secure-onboarding')) {
      this.titleService.setTitle(`${this.language['Secure Onboarding']} - ${this.language['Configuration']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['Secure Onboarding']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url);
      // this.updateSecureOnBoarding();
      //this.successMsg = this.language['successfully updated'];
    });
    this.setTitle(this.router.url);
    this.orgId = this.SsoAuthService.getOrgId();
    let enttlmnts = this.SsoAuthService.getEntitlements();

    if (this.router.url.includes('cco/services') && enttlmnts[210] && !enttlmnts[102]) {
      this.disableSecureOnBoarding = true;
    }
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'] = this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'] ? this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'] : [];

        if (this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'].length) {
          this.hasScopeAccess = true;
        }

        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'] && this.scopes['cloud.rbac.csc.netops.config.secure_onboarding'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/configuration/secure-onboarding')) {
      let scopes = this.scopes;
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.configuration.secureonboarding']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.services.configuration.secureonboarding']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.scopes;
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (this.scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.SsoAuthService.setPageAccess(false);
      return;
    }

    this.fetchSecureOnBoarding();
  }
  errorInfo: string = ''
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.SsoAuthService.pageErrorHandle(err);
    }
    this.showError = true;
  }

  fetchSecureOnBoarding() {
    this.loading = true;
    this.secureOnBoardingService.getSecureOnBoarding(this.orgId).subscribe((res: SecureOnboardModel) => {
      this.secureOnBoardingObj = res;

      this.loading = false;
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
      // this.errorMsg = this.SsoAuthService.pageErrorHandle(err);
      // this.errorMsg = error.statusText;
      this.showError = true;
    })
  }

  updateSecureOnBoarding() {
    this.loading = true;
    this.secureOnBoardingService.updateSecureOnBoarding(this.secureOnBoardingObj, this.orgId).subscribe(res => {
      this.loading = false;
      //this.showSuccess = true;
      //this.successMsg = this.language['successfully updated'];
      //updating the form with recent data
      this.fetchSecureOnBoarding();
    }, error => {
      this.loading = false;
      this.errorMsg = error.statusText;
      this.showError = true;
      this.secureOnBoardingObj.secureOnboarding = !this.secureOnBoardingObj.secureOnboarding
    })
  }
  onSecureOnBoardingChange() {
    this.secureOnBoardingObj.secureOnboarding = !this.secureOnBoardingObj.secureOnboarding
    this.updateSecureOnBoarding()
  }
  onCancel() {
    this.fetchSecureOnBoarding();
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
    this.languageSubject.unsubscribe();
  }


}
