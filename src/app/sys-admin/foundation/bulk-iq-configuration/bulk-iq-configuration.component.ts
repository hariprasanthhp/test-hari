import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { AdminFoundationService } from '../admin-foundation.service';

@Component({
  selector: 'app-bulk-iq-configuration',
  templateUrl: './bulk-iq-configuration.component.html',
  styleUrls: ['./bulk-iq-configuration.component.scss']
})
export class BulkIqConfigurationComponent implements OnInit {

  language;
  languageSubject;
  errorInfo: any;
  successInfo: string;
  success: boolean;
  error: boolean;
  ORG_ID: any;
  settingsForm: FormGroup;
  showSaveButtons: boolean = false;
  loading: boolean;
  getListSubs: any;
  settings = {
    subscribedToProtectIq: false,
    subscribedToExperienceIq: false
  }
  updateListSubs: any;
  hasWriteAccess: boolean = false;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  validateScopeStage: boolean;
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private service: AdminFoundationService,
    private router: Router,
    private sso: SsoAuthService,
    private titleService: Title
  ) {
    this.ORG_ID = this.ssoService.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.settitle()
    })
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.validateScopeStage = true;
    } else this.validateScopeStage = false;
    let scopes = this.ssoService.getScopes();
    scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.configurations'])) {
      if (scopes['cloud.rbac.foundation.configurations'].indexOf('read') !== -1 && scopes['cloud.rbac.foundation.configurations'].indexOf('write') !== -1)
        this.hasWriteAccess = true;
    }
  }
settitle(){
  this.titleService.setTitle(`${this.language['EDGE Suites Bulk Provisioning']} - ${this.language['settings']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
}
  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      subscribedToProtectIq: new FormControl(false),
      subscribedToExperienceIq: new FormControl(false)
    });
    this.closeAlert();
    this.getSettings();
    this.getEdgeSuiteEntitlement();
    this.settitle()
  }

  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.getListSubs) this.getListSubs.unsubscribe();
    if (this.updateListSubs) this.updateListSubs.unsubscribe();
  }

  getSettings() {
    this.loading = true;
    this.showSaveButtons = false;
    this.getListSubs = this.service.getIQSuitesConfigs(this.ORG_ID).subscribe((resp: any) => {
      if (resp && Object.keys(resp).length !== 0) {
        this.settings = resp;
        this.loading = false;
      } else {
        this.settings = {
          subscribedToProtectIq: false,
          subscribedToExperienceIq: false
        }
      }

      this.settingsForm.patchValue(this.settings);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.settings = {
        subscribedToProtectIq: false,
        subscribedToExperienceIq: false
      }
      this.settingsForm.patchValue(this.settings);
      this.loading = false;
    });
  }

  changeForm() {
    let form = JSON.stringify(this.settingsForm.value);
    let list = JSON.stringify(this.settings);

    if (form !== list) {
      this.showSaveButtons = true;
    } else {
      this.showSaveButtons = false;
    }

  }

  reset() {
    this.getSettings();
  }

  save() {
    this.loading = true;
    let form = this.settingsForm.value;
    this.updateListSubs = this.service.updateIQSuitesConfigs(this.ORG_ID, form).subscribe((resp: any) => {
      this.getSettings();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    setTimeout(() => {
      this.error = true;
      this.loading = false;
    }, 500);

  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }
  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    if (entitlement && entitlement['ProtectIQ'] && (entitlement['ProtectIQ'].name === "ProtectIQ")) {
      this.productIQEnableentitlement = true;
    }
    else {
      this.productIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ'] && (entitlement['ExperienceIQ'].name === "ExperienceIQ")) {
      this.ExperienceIQEnableentitlement = true;
    }
    else {
      this.ExperienceIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ And ProtectIQ'] && (entitlement['ExperienceIQ And ProtectIQ'].name === "ExperienceIQ And ProtectIQ")) {
      this.proAndExpEnableentitlement = true;
    }
    else {
      this.proAndExpEnableentitlement = false;
    }
  }

}
