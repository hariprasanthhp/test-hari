import { SelfHealModel } from './../../shared/model/self-heal.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SelfHealService } from '../../shared/service/self-heal.service'
import { SsoAuthService } from '../../../../shared/services/sso-auth.service'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-self-heal',
  templateUrl: './self-heal.component.html',
  styleUrls: ['./self-heal.component.scss'],
  //providers: [SelfHealService, SsoAuthService]
})
export class SelfHealComponent implements OnInit {
  language: any;
  languageSubject;
  orgId: string;
  selfHealObj: SelfHealModel = new SelfHealModel();
  checkboxToggle: boolean;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  disableSelfHeal = false;
  hasScopeAccess = false;
  constructor(private translateService: TranslateService, private ssoAuthService: SsoAuthService,
    private selfHealService: SelfHealService,
    private titleService: Title,
    private router: Router) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.scopes = this.ssoAuthService.getScopes();
  }
  setTitle(url) {
    if (this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      this.titleService.setTitle(`${this.language['Self Heal']} - ${this.language['Configurations']} - ${this.language['Subscriber_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['Self Heal']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    let enttlmnts = this.ssoAuthService.getEntitlements();

    if (this.router.url.includes('cco/operations') && enttlmnts[210] && !enttlmnts[102]) {
      this.disableSelfHeal = true;
    }


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.successMsg = this.language['successfully updated'];
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    if (!this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.config.self_heal'] = this.scopes['cloud.rbac.csc.netops.config.self_heal'] ? this.scopes['cloud.rbac.csc.netops.config.self_heal'] : [];
        if (this.scopes['cloud.rbac.csc.netops.config.self_heal'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.config.self_heal'] && this.scopes['cloud.rbac.csc.netops.config.self_heal'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.coc.operations.subscriber.configurations'] = this.scopes['cloud.rbac.coc.operations.subscriber.configurations'] ? this.scopes['cloud.rbac.coc.operations.subscriber.configurations'] : [];
        if (this.scopes['cloud.rbac.coc.operations.subscriber.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.coc.operations.subscriber.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }

    this.fetchSelfHeal();
  }
  fetchSelfHeal() {
    this.loading = true;
    this.selfHealService.getSelfHeal(this.orgId).subscribe((res: SelfHealModel) => {
      this.selfHealObj = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMsg = error.statusText;
      this.showError = true;
    }
    )
  }
  submitSelfHeal() {
    if (!this.selfHealObj.enableTime) {
      let timeStamp = (new Date().getTime() / 1000).toFixed(0)
      this.selfHealObj.enableTime = timeStamp.toString();
    } else {
      let timeStamp = (new Date(this.selfHealObj.enableTime).getTime() / 1000).toFixed(0);
      this.selfHealObj.enableTime = timeStamp.toString();
    }
    this.loading = true;
    this.selfHealService.putSelfHeal(this.selfHealObj, this.orgId).subscribe(res => {
      this.loading = false;
      this.showSuccess = true;
      this.successMsg = this.language['successfully updated'];
      //updating the form with recent data
      this.fetchSelfHeal();
    }, error => {
      this.loading = false;

      this.errorMsg = error.statusText;
      this.showError = true;
    }
    )
  }

  onCancelSelfHeal() {
    this.fetchSelfHeal();
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

}
