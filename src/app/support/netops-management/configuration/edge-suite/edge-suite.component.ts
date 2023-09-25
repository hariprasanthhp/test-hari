import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { NetopsServiceService } from '../../netops-management.service';

@Component({
  selector: 'app-edge-suite',
  templateUrl: './edge-suite.component.html',
  styleUrls: ['./edge-suite.component.scss']
})
export class EdgeSuiteComponent implements OnInit {

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
  allowSubnetConfig = true;
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    public sso: SsoAuthService,
    private service: NetopsServiceService,
    private router: Router,
    private titleService: Title,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })

    let scopes = this.sso.getScopes();


    if (environment.VALIDATE_SCOPE && environment.VALIDATE_FOUNDATION_SCOPE) {

      scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] = scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] ? scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning'] : [];

      //Secure Onboarding、 Stale Device Purge、Subscriber Profile and Subnet Configuration - admin scope check
      if (scopes && scopes['cloud.rbac.csc.netops.config.edgesuitesbulkprovisioning']?.includes('write')) {
        this.hasWriteAccess = true;
      }
      if (scopes && (scopes['cloud.rbac.coc.operations.subscriber.configurations']?.includes('write'))) {
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


  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      subscribedToProtectIq: new FormControl(false),
      subscribedToExperienceIq: new FormControl(false)
    });
    if (this.router.url.includes('cco/operations/cco-subscriber-operations')) {
      this.titleService.setTitle('Edge Suites Bulk Provisioning - Configurations - Subscriber Operations - Operations - Operations - Calix Cloud');

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle('Edge Suites Bulk Provisioning - Configurations - Netops - Service - Calix Cloud');
    }

    this.closeAlert();
    this.getSettings();
  }

  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.getListSubs) this.getListSubs.unsubscribe();
    if (this.updateListSubs) this.updateListSubs.unsubscribe();
  }

  getSettings() {
    this.loading = true;
    this.showSaveButtons = false;
    this.getListSubs = this.service.getIqSuites(this.ORG_ID).subscribe((resp: any) => {

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
      this.errorInfo = this.sso.pageErrorHandle(err);
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

}
