import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { PerformanceServiceService } from '../../performance-testing.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { SsoAuthService } from '../../../../../../shared/services/sso-auth.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-instance-wizard',
  templateUrl: './instance-wizard.component.html',
  styleUrls: ['./instance-wizard.component.scss']
})
export class InstanceWizardComponent implements OnInit {
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  language: any;
  languageSubject;

  saveClicked: boolean = false;
  formError: boolean = false;
  @Input() inputData
  @Output() outputdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();

  constructor(private translateService: TranslateService,
    private performanceService: PerformanceServiceService,
    private router: Router,
    private commonOrgService: CommonService,
    private CommonFunctionsService: CommonFunctionsService,
    public sso: SsoAuthService) {
  }

  ngOnInit(): void {
    this.name = this.inputData.name;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  validate() {
    this.formError = false;
    this.name = this.name.trim();
    if (!this.name) {
      this.formError = true;
      return
    }

  }

  loading = false;
  name: any = '';
  go_next() {
    this.saveClicked = true;
    this.validate();
    if (this.formError) {
      return;
    }
    this.loading = true;
    if (this.inputData._id) {
      if (this.inputData.name == this.name) {
        this.outputdata.emit(this.inputData);
        this.activeTab.emit('Devices');
        return;
      }
    }

    this.inputData.name = this.name;
    this.performanceService.getPerfTestByName(this.inputData.name).subscribe((data: any) => {
      this.loading = false;
      if (data && data.length) {
        this.showError(`A test with the name "${this.inputData.name}" already exists.`);
        return;
      }

      if (this.inputData.levelPassed <= 1) {
        this.inputData.levelPassed = 1;
      }
      this.outputdata.emit(this.inputData);
      this.activeTab.emit('Devices');
    }, (err: any) => {

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
    this.closeAlert();
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  reload(): any {
    if (window.location.href?.indexOf('/cco/operations/configuration/performance-testing') !== -1) {
      this.router.navigate(['./cco/operations/configuration/performance-testing']);
      return;
    }
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing`,
      `cco/operations/cco-system-operations/performance-testing`, '',
      `/cco/operations/cco-subscriber-operations/operations/performance-testing`
    ]);
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}