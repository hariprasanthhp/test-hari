import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { environment } from '../../../../../environments/environment';
import { CallOutcomeReportService } from '../../shared/service/call-outcome-report.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataServiceService } from 'src/app/support/data.service';
@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})
export class AuditReportComponent implements OnInit {
  language: any;
  languageSubject;
  timePeriod = [{ name: 'Last 30 days', id: "30" }, { name: 'Last 60 days', id: "60" }, { name: 'Last 90 days', id: "90" }];
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

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;

    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Audit_Report']} - ${this.language['Reports']} - ${this.language['NetOps']} - ${this.language['Service']} -  ${this.language['Calix Cloud']}`);
      this.timePeriod = [{ name: this.language['Last_30_days'], id: "30" }, { name: this.language['Last_60_days'], id: "60" }, { name: this.language['Last_90_days'], id: "90" }];
    });
    let scopes = this.sso.getScopes();
    if (!this.router.url.includes('cco/operations/cco-reports')) {
      this.titleService.setTitle(`${this.language['Audit_Report']} - ${this.language['Reports']} - ${this.language['NetOps']} - ${this.language['Service']} -  ${this.language['Calix Cloud']}`);
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.reports.auditreports'] = scopes['cloud.rbac.csc.netops.reports.auditreports'] ? scopes['cloud.rbac.csc.netops.reports.auditreports'] : [];
        if (scopes && scopes['cloud.rbac.csc.netops.reports.auditreports'].length) {
          this.hasScopeAccess = true;
        }

        if (scopes && (scopes['cloud.rbac.csc.netops.reports.auditreports'] && scopes['cloud.rbac.csc.netops.reports.auditreports'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
      }
    } else {
      this.titleService.setTitle('Audit Report - Reports - Operations - Operations -  Calix Cloud');

      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.coc.operations.report.auditreports'] = scopes['cloud.rbac.coc.operations.report.auditreports'] ? scopes['cloud.rbac.coc.operations.report.auditreports'] : [];

        if (scopes && scopes['cloud.rbac.coc.operations.report.auditreports'].length) {
          this.hasScopeAccess = true;
        }

        if (scopes && (scopes['cloud.rbac.coc.operations.report.auditreports'] && scopes['cloud.rbac.coc.operations.report.auditreports'].indexOf('write') !== -1)) {
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

    this.timePeriod = [{ name: this.language['Last_30_days'], id: "30" }, { name: this.language['Last_60_days'], id: "60" }, { name: this.language['Last_90_days'], id: "90" }];
  }

  onChangeTimePeriod() {
    if (this.selectedTimePeriod) {
      this.bttnDissable = false;
    } else {
      this.bttnDissable = true;
    }
  }
  downloadReportFile() {
    this.submit = true;
    // this.bttnDissable= true;
    if (!this.selectedTimePeriod) return;
    this.isError = false;
    this.isModalError = false;
    let timeZone = this.getTimezoneName()
    this.callOutcomeReportService.getAuditReportFilePath(this.orgId, this.selectedTimePeriod, timeZone).subscribe(res => {
      this.selectedTimePeriod = null;
      if (res != null) {
        this.downloadService.saveToDisk(JSON.parse(res).fileName, null, true);
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
  getTimezoneName(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  alertMessage = '';
  isError: boolean;
  pageErrorHandle(err: any, type = "") {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 500) {
      this.alertMessage = this.language['internalServerError'];
    }
    else if (err.status == 400) {
      let errorMsg = JSON.parse(err.error);
      this.alertMessage = errorMsg.error;

    }
    else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

}