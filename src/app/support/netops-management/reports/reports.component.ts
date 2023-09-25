import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  language: any;
  languageSubject;

  showInventoryReport = false;
  showUnassociatedDevices = false;
  showOrphanDevices = false;
  showCallOutcome = false;
  showCallAvoidance = false;
  showAuditReport = false;

  orgId: any;

  constructor(private translateService: TranslateService,
    public sso: SsoAuthService,
    private router: Router) { }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.netops.reports.inv_report'] = scopes['cloud.rbac.csc.netops.reports.inv_report'] ? scopes['cloud.rbac.csc.netops.reports.inv_report'] : [];
      scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] = scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] ? scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] : [];
      scopes['cloud.rbac.csc.netops.reports.call_outcome'] = scopes['cloud.rbac.csc.netops.reports.call_outcome'] ? scopes['cloud.rbac.csc.netops.reports.call_outcome'] : [];
      scopes['cloud.rbac.csc.netops.reports.auditreports'] = scopes['cloud.rbac.csc.netops.reports.auditreports'] ? scopes['cloud.rbac.csc.netops.reports.auditreports'] : [];
      scopes['cloud.rbac.csc.netops.reports.call_avoidance'] = scopes['cloud.rbac.csc.netops.reports.call_avoidance'] ? scopes['cloud.rbac.csc.netops.reports.call_avoidance'] : [];

      if (scopes && scopes['cloud.rbac.csc.netops.reports.inv_report'] && scopes['cloud.rbac.csc.netops.reports.inv_report'].indexOf('read') !== -1) {
        this.showInventoryReport = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] && scopes['cloud.rbac.csc.netops.reports.unassociated_devices'].indexOf('read') !== -1) {
        this.showUnassociatedDevices = true;
      }

      this.orgId = this.sso.getOrgId();
      if (this.orgId == 50) {
        this.showOrphanDevices = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.reports.call_avoidance'] && scopes['cloud.rbac.csc.netops.reports.call_avoidance'].indexOf('read') !== -1) {
        this.showCallAvoidance = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.reports.call_outcome'] && scopes['cloud.rbac.csc.netops.reports.call_outcome'].indexOf('read') !== -1) {
        this.showCallOutcome = true;
      }
      if (scopes && scopes['cloud.rbac.csc.netops.reports.auditreports'] && scopes['cloud.rbac.csc.netops.reports.auditreports'].indexOf('read') !== -1) {
        this.showAuditReport = true;
      }

    } else {
      this.showInventoryReport = true;
      this.showUnassociatedDevices = true;
      this.showOrphanDevices = true;
      this.showCallOutcome = true;
      this.showCallAvoidance = true;
      this.showAuditReport = true;

    }



    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }



}
