import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  language: any;
  languageSubject;

  showDeviceGrps = false;
  showProfiles = false;
  showConfigFiles = false;
  showSoftwareImage = false;
  showWorkFlow = false;
  showPerfTest = false;
  showDialPlan = false

  constructor(public router: Router, private translateService: TranslateService, public sso: SsoAuthService, private titleService: Title) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.sso.setActionLog('CSC', 'pageHit', 'Operations', '/support/netops-management/operations/devices-groups', 'Operation Module devices-groups page loaded');
  }

  ngOnInit(): void {
    this.titleService.setTitle('Calix Cloud - Operations');
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.netops.operations.device_group'] = scopes['cloud.rbac.csc.netops.operations.device_group'] ? scopes['cloud.rbac.csc.netops.operations.device_group'] : [];
      scopes['cloud.rbac.csc.netops.operations.workflow'] = scopes['cloud.rbac.csc.netops.operations.workflow'] ? scopes['cloud.rbac.csc.netops.operations.workflow'] : [];
      scopes['cloud.rbac.csc.netops.operations.profiles'] = scopes['cloud.rbac.csc.netops.operations.profiles'] ? scopes['cloud.rbac.csc.netops.operations.profiles'] : [];
      scopes['cloud.rbac.csc.netops.operations.sw_images'] = scopes['cloud.rbac.csc.netops.operations.sw_images'] ? scopes['cloud.rbac.csc.netops.operations.sw_images'] : [];
      scopes['cloud.rbac.csc.netops.operations.config_files'] = scopes['cloud.rbac.csc.netops.operations.config_files'] ? scopes['cloud.rbac.csc.netops.operations.config_files'] : [];

      scopes['cloud.rbac.csc.netops.operations.perf_testing'] = scopes['cloud.rbac.csc.netops.operations.perf_testing'] ? scopes['cloud.rbac.csc.netops.operations.perf_testing'] : [];

      scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];

      if (scopes && scopes['cloud.rbac.csc.netops.operations.device_group'] !== undefined && scopes['cloud.rbac.csc.netops.operations.device_group'].indexOf('read') !== -1) {
        this.showDeviceGrps = true;
      }

      if (scopes && scopes['cloud.rbac.csc.netops.operations.sw_images'] !== undefined && scopes['cloud.rbac.csc.netops.operations.sw_images'].indexOf('read') !== -1) {
        this.showSoftwareImage = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.operations.workflow'] !== undefined && scopes['cloud.rbac.csc.netops.operations.workflow'].indexOf('read') !== -1)) {
        this.showWorkFlow = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.operations.profiles'] !== undefined && scopes['cloud.rbac.csc.netops.operations.profiles'].indexOf('read') !== -1)) {
        this.showProfiles = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.operations.config_files'] !== undefined && scopes['cloud.rbac.csc.netops.operations.config_files'].indexOf('read') !== -1)) {
        this.showConfigFiles = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.config.dial_plan'] !== undefined && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('read') !== -1)) {
        this.showDialPlan = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.operations.perf_testing'] !== undefined && scopes['cloud.rbac.csc.netops.operations.perf_testing'].indexOf('read') !== -1)) {
        // let entArr = this.sso.getEntitlementsArr();
        // if (entArr.indexOf("131") !== -1) {
        //   this.showPerfTest = true;
        // }

        this.showPerfTest = true;

      }

    } else {
      this.showDeviceGrps = true;
      this.showProfiles = true;
      this.showConfigFiles = true;
      this.showSoftwareImage = true;
      this.showWorkFlow = true;
      this.showPerfTest = true;
      this.showDialPlan = true;
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
