import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { environment } from '../../../../../environments/environment';
import { CallOutcomeReportService } from '../../shared/service/call-outcome-report.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from 'src/app/support/data.service';



@Component({
  selector: 'app-call-outcome-report',
  templateUrl: './call-outcome-report.component.html',
  styleUrls: ['./call-outcome-report.component.scss']
})
export class CallOutcomeReportComponent implements OnInit {
  language: any;
  languageSubject;
  timePeriod = [{ name: 'Last 30 days', id: "30D" }, { name: 'Last 60 days', id: "60D" }, { name: 'Last 90 days', id: "90D" }];
  hasWriteAccess = false;
  orgId: string;
  isModalError = false;
  selectedTimePeriod: string;
  hasScopeAccess = false;
  bttnDissable: boolean = false;
  submit: boolean = false;
  constructor(private translateService: TranslateService, private downloadService: DownloadService,
    private sso: SsoAuthService, private callOutcomeReportService: CallOutcomeReportService,
    private router: Router, private titleService: Title, private service: DataServiceService,) {
    this.orgId = this.sso.getOrgId();
  }

  setTitle() {
    if (this.router.url.includes("support/netops-management/reports/call-outcome-report")) {
      this.titleService.setTitle(`${this.language['Call_Outcome_Report']} - ${this.language['Reports']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
    else {
      this.titleService.setTitle(`${this.language['Call Outcome']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;

    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle()
      this.timePeriod = [{ name: this.language['Last_30_days'], id: "30D" }, { name: this.language['Last_60_days'], id: "60D" }, { name: this.language['Last_90_days'], id: "90D" }];
    });
    this.setTitle()
    let scopes = this.sso.getScopes();
    if (!this.router.url.includes('cco/operations/cco-reports')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.reports.call_outcome'] = scopes['cloud.rbac.csc.netops.reports.call_outcome'] ? scopes['cloud.rbac.csc.netops.reports.call_outcome'] : [];

        if (scopes && scopes['cloud.rbac.csc.netops.reports.call_outcome'].length) {
          this.hasScopeAccess = true;
        }

        if (scopes && (scopes['cloud.rbac.csc.netops.reports.call_outcome'] && scopes['cloud.rbac.csc.netops.reports.call_outcome'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.coc.operations.report.calloutcomereports'] = scopes['cloud.rbac.coc.operations.report.calloutcomereports'] ? scopes['cloud.rbac.coc.operations.report.calloutcomereports'] : [];

        if (scopes && scopes['cloud.rbac.coc.operations.report.calloutcomereports'].length) {
          this.hasScopeAccess = true;
        }

        if (scopes && (scopes['cloud.rbac.coc.operations.report.calloutcomereports'] && scopes['cloud.rbac.coc.operations.report.calloutcomereports'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.timePeriod = [{ name: this.language['Last_30_days'], id: "30D" }, { name: this.language['Last_60_days'], id: "60D" }, { name: this.language['Last_90_days'], id: "90D" }];
  }

  downloadReportFile() {
    this.submit = true;
    // this.bttnDissable= true;
    if (!this.selectedTimePeriod) return;
    this.isError = false;
    this.isModalError = false;
    let timeZone = this.getTimezoneName()
    this.callOutcomeReportService.getCallOutcomeFilePath(this.orgId, this.selectedTimePeriod, timeZone).subscribe(res => {
      this.selectedTimePeriod = null;
      res = res?.replace(/"/g, '');
      if (res != null) {
        this.downloadService.saveToDisk(res);
      } else {
        this.isModalError = true;
      }
      this.isError = false;
      this.submit = false;
    }, err => {
      this.isError = true;
      this.pageErrorHandle(err);
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
  onChangeTimePeriod() {
    if (this.selectedTimePeriod) {
      this.bttnDissable = false;
    } else {
      this.bttnDissable = true;
    }
  }
  getTimezoneName(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  alertMessage = '';
  isError: boolean;
  pageErrorHandle(err: any, type = "") {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 500 && type == "callcoutcome") {
      this.alertMessage = this.language['internalServerError'];
    }
    else if (err.status == 400) {
      let errorMsg = JSON.parse(err.error);
      this.alertMessage = errorMsg.errorMessage;
    }
    else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

}
