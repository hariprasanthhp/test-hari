import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';

@Component({
  selector: 'app-cco-reports',
  templateUrl: './cco-reports.component.html',
  styleUrls: ['./cco-reports.component.scss']
})
export class CcoReportsComponent implements OnInit {
  language: any;
  languageSubject: any;
  showOntDevices = false;
  showMappedeplists = false;
  showEpcountbymapper = false;
  unmappedIPsAccess = false;
  inventoryReportAccess = false;
  unassociatedSystemAccess = false;
  calloutcomeReportAccess = false;
  auditReportAccess = false;
  allowReports = true;

  constructor(private translateService: TranslateService, public sso: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    let scopes = this.sso.getScopes();
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowReports = false;
    }

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);
      scopes['cloud.rbac.coc.operations.report.calloutcomereports'] = scopes['cloud.rbac.coc.operations.report.calloutcomereports'] ? scopes['cloud.rbac.coc.operations.report.calloutcomereports'] : [];
      scopes['cloud.rbac.coc.operations.report.auditreports'] = scopes['cloud.rbac.coc.operations.report.auditreports'] ? scopes['cloud.rbac.coc.operations.report.auditreports'] : [];

      if (scopes['cloud.rbac.coc.operations.report.calloutcomereports'].length) {
        this.calloutcomeReportAccess = true;
      }
      if (scopes['cloud.rbac.coc.operations.report.auditreports'].length) {
        this.auditReportAccess = true;
      }

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.epcountbymapper') !== -1) {
            this.showEpcountbymapper = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.mappedeplists') !== -1) {
            this.showMappedeplists = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.ontdevices') !== -1) {
            this.showOntDevices = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.unmappedips') !== -1) {
            this.unmappedIPsAccess = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.invreports') !== -1) {
            this.inventoryReportAccess = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.unassociatedsystems') !== -1) {
            this.unassociatedSystemAccess = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.calloutcomereports') !== -1) {
            this.calloutcomeReportAccess = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.auditreports') !== -1) {
            this.auditReportAccess = true;
          }

        }
      }

    } else {
      this.auditReportAccess = true;
      this.showEpcountbymapper = true;
      this.showMappedeplists = true;
      this.showOntDevices = true;
      this.unmappedIPsAccess = true;
      this.inventoryReportAccess = true;
      this.unassociatedSystemAccess = true;
      this.calloutcomeReportAccess = true;
    }

  }

}
