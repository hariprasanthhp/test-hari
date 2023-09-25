import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../shared/services/sso-auth.service'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-netops-management',
  templateUrl: './netops-management.component.html',
  styleUrls: ['./netops-management.component.scss']
})
export class NetopsManagementComponent implements OnInit {
  language: any;
  languageSubject;

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => {
      if (this.router.url.includes("subscriber-management") || this.router.url.includes("/support/subscriber/search")) {
        return false;
      }
      return curr.routeConfig === future.routeConfig;
    };
  }

  pageavailble: boolean = false;
  showSubscriberMngmnt = false;
  showReports = false;
  showOperations = false;
  showConfiguration = false;

  ngOnInit(): void {
    let scopes = this.sso.getScopes();

    console.log(this.router.url);
    let path = this.router.url;

    if (environment.VALIDATE_SCOPE) {
      // scopes['cloud.rbac.csc.netops.mgmt'] = scopes['cloud.rbac.csc.netops.mgmt'] ? scopes['cloud.rbac.csc.netops.mgmt'] : [];
      // scopes['cloud.rbac.csc.netops.reports'] = scopes['cloud.rbac.csc.netops.reports'] ? scopes['cloud.rbac.csc.netops.reports'] : [];
      // scopes['cloud.rbac.csc.netops.operations'] = scopes['cloud.rbac.csc.netops.operations'] ? scopes['cloud.rbac.csc.netops.operations'] : [];
      // scopes['cloud.rbac.csc.netops.config'] = scopes['cloud.rbac.csc.netops.config'] ? scopes['cloud.rbac.csc.netops.config'] : [];

      // if (path.indexOf('subscriber-management') !== -1 && scopes['cloud.rbac.csc.netops.mgmt'].length) {

      // } else if (path.indexOf('/reports') !== -1 && scopes['cloud.rbac.csc.netops.reports'].length) {

      // } else if (path.indexOf('/operations') !== -1 && scopes['cloud.rbac.csc.netops.operations'].length) {

      // } else if (path.indexOf('/configuration') !== -1 && scopes['cloud.rbac.csc.netops.config'].length) {

      // } else if (path.indexOf('/workflow-status') !== -1) {

      // } else {
      //   this.redirect(scopes);
      // }

      // if (scopes && scopes['cloud.rbac.csc.netops.mgmt'] !== undefined && scopes['cloud.rbac.csc.netops.mgmt'].indexOf('read') !== -1) {
      //   this.showSubscriberMngmnt = true;
      // }

      // if (scopes && scopes['cloud.rbac.csc.netops.operations'] !== undefined && scopes['cloud.rbac.csc.netops.operations'].indexOf('read') !== -1) {
      //   this.showOperations = true;
      // }

      // if (scopes && scopes['cloud.rbac.csc.netops.reports'] !== undefined && scopes['cloud.rbac.csc.netops.reports'].indexOf('read') !== -1) {
      //   this.showReports = true;
      // }

      // if (scopes && scopes['cloud.rbac.csc.netops.config'] !== undefined && scopes['cloud.rbac.csc.netops.config'].indexOf('read') !== -1) {
      //   this.showConfiguration = true;
      // }


      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.mgmt') !== -1) {
            this.showSubscriberMngmnt = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.csc.netops.operations') !== -1) {
            if (validScopes[i] == 'cloud.rbac.csc.netops.operations.perf_testing' && this.sso.getCscType() === 'DME') {
              continue;
            }
            this.showOperations = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.csc.netops.reports') !== -1) {
            if (['cloud.rbac.csc.netops.operations.call_outcome', 'cloud.rbac.csc.netops.reports.auditreports', 'cloud.rbac.csc.netops.operations.call_avoidance'].indexOf(validScopes[i]) > -1 && this.sso.getCscType() === 'DME') {
              continue;
            }
            this.showReports = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.csc.netops.config') !== -1) {
            if (['cloud.rbac.csc.netops.config.self_heal', 'cloud.rbac.csc.netops.config.site_scan', 'cloud.rbac.csc.netops.config.secure_onboarding'].indexOf(validScopes[i]) > -1 && this.sso.getCscType() === 'DME') {
              continue;
            }
            this.showConfiguration = true;
            continue;
          }
        }
      }

      if (this.showSubscriberMngmnt || this.showOperations || this.showReports || this.showConfiguration) {

      } else {
        this.redirect(scopes);
      }


    } else {
      this.showSubscriberMngmnt = true;
      this.showReports = true;
      this.showOperations = true;
      this.showConfiguration = true;
    }




    //console.log(scopes);
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    localStorage.removeItem("callOutComeTicketID")
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  redirect(scopes: any) {
    // if (scopes['cloud.rbac.csc.netops.mgmt'].length) {
    //   this.router.navigate(['/support/netops-management/subscriber-management']);

    // } else if (scopes['cloud.rbac.csc.netops.reports'].length) {
    //   this.router.navigate(['/support/netops-management/reports']);

    // } else if (scopes['cloud.rbac.csc.netops.operations'].length) {
    //   this.router.navigate(['/support/netops-management/operations']);

    // } else if (scopes['cloud.rbac.csc.netops.config'].length) {
    //   this.router.navigate(['/support/netops-management/configuration']);
    // } else {
    //   this.router.navigate(['/support']);
    // }

    if (this.showSubscriberMngmnt) {
      this.router.navigate(['/support/netops-management/subscriber-management']);

    } else if (this.showReports) {
      this.router.navigate(['/support/netops-management/reports']);

    } else if (this.showOperations) {
      this.router.navigate(['/support/netops-management/operations']);

    } else if (this.showConfiguration) {
      this.router.navigate(['/support/netops-management/configuration']);
    } else {
      this.router.navigate(['/support']);
    }

  }

}
