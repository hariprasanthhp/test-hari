import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { environment } from 'src/environments/environment';
import { AcessModifiers, SsoAuthService } from '../../shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home/foundation-home.service';

@Component({
  selector: 'app-foundation-reports-final',
  templateUrl: './foundation-reports-final.component.html',
  styleUrls: ['./foundation-reports-final.component.scss']
})
export class FoundationReportsFinalComponent implements OnInit {
  @ViewChild('GetStartedModal', { static: true }) private GetStartedModal: TemplateRef<any>;

  language: any = {};
  languageSubject;
  showInventoryReport = false;
  showUnassociatedDevices = false;
  showCallOutcome = false;
  dataAvailable: boolean;
  validateScopeStage: boolean = false;
  modalRef: any;
  ORG_ID: any;
  HideModel: boolean;
  constructor(
    private translateService: TranslateService, public sso: SsoAuthService,
    private modalService: NgbModal, public router: Router,
    private home: FoundationHomeService,
    private api: NetopsServiceService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
  }

  ngOnInit(): void {
    this.HideModel=window.localStorage.getItem("HideModel")? true:false
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    let scopes = this.sso.getScopes();

    scopes['cloud.rbac.foundation.reports'] = scopes['cloud.rbac.foundation.reports'] ? scopes['cloud.rbac.foundation.reports'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.reports'])) {
      if (scopes['cloud.rbac.foundation.reports'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.reports'].indexOf('write') !== -1)
        this.showInventoryReport = true;
      this.showUnassociatedDevices = true;
      this.showCallOutcome = true;
    }
    this.getHSI();
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


