import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { AdminFoundationService } from '../admin-foundation.service';

@Component({
  selector: 'app-system-delete-settings',
  templateUrl: './system-delete-settings.component.html',
  styleUrls: ['./system-delete-settings.component.scss']
})
export class SystemDeleteSettingsComponent implements OnInit, OnDestroy {

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
    deleteAssociatedSystems: false,
    factoryResetOnDelete: false,
    factoryResetOnRma: false,
  }
  updateListSubs: any;
  hasWriteAccess: boolean = false;
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private service: AdminFoundationService,
    private router: Router,
  ) {
    this.ORG_ID = this.ssoService.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })

  }

  ngOnInit(): void {
    let scopes = this.ssoService.getScopes();
    if (!this.router.url.includes('cco-foundation')) {
      if (environment.VALIDATE_SCOPE) {
        this.hasWriteAccess = true;
      } else {
        this.hasWriteAccess = true;
      }
    } else {
      if (this.ssoService.checFoundationScope(AcessModifiers.WRITE)) {
        this.hasWriteAccess = true;
      }
    }
    this.settingsForm = new FormGroup({
      deleteAssociatedSystems: new FormControl(false),
      factoryResetOnDelete: new FormControl(false),
      factoryResetOnRma: new FormControl(false),
    });
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
    this.getListSubs = this.service.getSettings(this.ORG_ID).subscribe((resp: any) => {
      if (resp && Object.keys(resp).length !== 0) {
        this.settings = resp;
        this.loading = false;
      } else {
        this.settings = {
          deleteAssociatedSystems: false,
          factoryResetOnDelete: false,
          factoryResetOnRma: false,
        }
      }

      this.settingsForm.patchValue(this.settings);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.settings = {
        deleteAssociatedSystems: false,
        factoryResetOnDelete: false,
        factoryResetOnRma: false,
      }
      this.settingsForm.patchValue(this.settings);
      this.loading = false;
    });
  }

  changeDeletSubscriber() {
    this.changeForm();
  }

  changeFactoryResetOnDelete() {
    this.changeForm();
  }

  changeFactoryResetOnReplace() {
    this.changeForm();
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
    this.updateListSubs = this.service.updateSettings(this.ORG_ID, form).subscribe((resp: any) => {
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
}
