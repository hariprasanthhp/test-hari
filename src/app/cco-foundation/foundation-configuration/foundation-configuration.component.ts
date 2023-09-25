import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { environment } from 'src/environments/environment';
import { FoundationHomeService } from '../foundation-home/foundation-home.service';

@Component({
  selector: 'app-foundation-configuration',
  templateUrl: './foundation-configuration.component.html',
  styleUrls: ['./foundation-configuration.component.scss']
})
export class FoundationConfigurationComponent implements OnInit {
  @ViewChild('GetStartedModal', { static: true }) private GetStartedModal: TemplateRef<any>;
  language;
  languageSubject;

  settingsShow: boolean = false;
  workflowPreShow: boolean = false;
  workflowsShow: boolean = false;
  ORG_ID
  dataAvailable: boolean;
  validateScopeStage: boolean = false;
  modalRef: any;
  HideModel: boolean;
  constructor(
    private translateService: TranslateService, public sso: SsoAuthService, public router: Router,
    private home: FoundationHomeService, private modalService: NgbModal,
    private api: NetopsServiceService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    this.HideModel=window.localStorage.getItem("HideModel")? true:false
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   this.validateScopeStage = true;
    // } else this.validateScopeStage = false;
    let scopes = this.sso.getScopes();

    scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.configurations'])) {
      if (scopes['cloud.rbac.foundation.configurations'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.configurations'].indexOf('write') !== -1)
        this.settingsShow = true;
      this.workflowPreShow = true;
      this.workflowsShow = true;
    }
    if (this.router.url.includes("cco-foundation/foundation-configuration/configuration-settings/subnet-configuration")
      ||
      this.router.url.includes("cco-foundation/foundation-configuration/configuration-prerequisites/device-groups")) {
      this.getHSI()
    }
    // this.getHSI()
  }

  getHSI() {
    this.api.GetWorkflowGrid(this.ORG_ID).subscribe((wkflw: any[]) => {
      if (wkflw.length == 0) {
        this.home.getHSI(this.ORG_ID)
          .subscribe(res => {
            if (res) {
              this.dataAvailable = true;
            } else if(!this.HideModel){
              this.modalRef = this.modalService.open(this.GetStartedModal, {
                size: 'lg',
                centered: true,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'custom-modal',
              });
            }
          }, (err: HttpErrorResponse) => {
            if (err.status == 404 && !this.HideModel) {
              this.modalRef = this.modalService.open(this.GetStartedModal, {
                size: 'lg',
                centered: true,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'custom-modal',
              });
            } else {
              this.dataAvailable = true;
            }
          });
      }
    })
  }
  goToInitialOnboarding() {
    this.modalService.dismissAll("closed");
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-workflow/workflows']);
  }
  closeAllModal() {
    this.HideModel=true
    window.localStorage.setItem('HideModel', 'true');
    this.modalService.dismissAll();
   
  }
}
