declare var require: any;
const $: any = require('jquery');
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { environment } from 'src/environments/environment';
import { FoundationCommonService } from '../cco-foundation-service/foundation-common.service';
import { FoundationHomeService } from '../foundation-home/foundation-home.service';

@Component({
  selector: 'app-foundation-systems',
  templateUrl: './foundation-systems.component.html',
  styleUrls: ['./foundation-systems.component.scss']
})
export class FoundationSystemsComponent implements OnInit, OnDestroy, AfterViewChecked {
  language: any = {};
  languageSubject;
  currentPage: any = 'foundation-manage';
  currentPageSubs: any;
  routeChangeSubs: any;
  showTabs: boolean = false;
  @ViewChild('GetStartedModal', { static: true }) private GetStartedModal: TemplateRef<any>;
  ORG_ID
  dataAvailable: boolean;
  modalRef: any;
  scopeFlag: any = {
    manage: false,
    geographic: false
  }
  validateScopeStage: boolean;
  HideModel: boolean;
  isProvisioned:any;
  ccoSearchText:any;
  constructor(
    private translateService: TranslateService,
    private foundation: FoundationCommonService,
    private router: Router,
    private modalService: NgbModal,
    private home: FoundationHomeService,
    private api: NetopsServiceService,
    private ccoCommonService: CcoCommonService,
    public ssoService: SsoAuthService,
    private titleService:Title
  ) {
    this.ORG_ID = this.ssoService.getOrgId();
    this.getScopes();
    this.currentPageSubs = this.foundation.currentPageData.subscribe((data: any) => {
      this.currentPage = data;
      setTimeout(() => {
        if (data == 'foundation-geographic-view' && $('#manage').hasClass('active')) {
          $('#manage').removeClass('active');
        }
      }, 100);

    });

    this.checkShowTabs();
    this.routeChangeSubs = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkShowTabs();
      }
    });

  }
setTitle(url){
  if(url.includes('/foundation-systems/foundation-geographic-view')){
    this.titleService.setTitle(`${this.language['Geographic_View']} - ${this.language['Systems']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
  }else{
    this.titleService.setTitle(`${this.language['Manage']} - ${this.language['Systems']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
  }
}
  ngOnInit(): void { 

    this.HideModel=window.localStorage.getItem("HideModel")? true:false
    // this.titleService.setTitle('Manage - Systems - Deployment - Calix Cloud');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url);
   
    });
    this.getHSI()
    this.setTitle(this.router.url);

    this.ccoCommonService.textSearch.subscribe((value)=>{
      this.ccoSearchText = value.searchText;
      this.isProvisioned = value.isProvisioned;
    })
  }

  ngOnDestroy(): void {
    this.languageSubject.unsubscribe();
    this.currentPageSubs.unsubscribe();
    this.routeChangeSubs.unsubscribe();
  }

  ngAfterViewChecked() {
    let url = this.router.url;
    if (url.indexOf('/foundation-manage/') === -1 && $('#manage').hasClass('active')) {
      $('#manage').removeClass('active');
    }

  }

  setCurrentTab(tab) {
    this.currentPage = tab;
    this.foundation.currentPageAdder(tab);
  }

  checkShowTabs() {
    let url = this.router.url;
    if (url.indexOf('/foundation-system-list') > -1 || url.indexOf('/foundation-geographic-view') > -1) {
      this.showTabs = true;
    } else {
      this.showTabs = false;
    }
  }

  getScopes() {
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.validateScopeStage = true;
    } else this.validateScopeStage = false;
    let scopes = this.ssoService.getScopes();

    scopes['cloud.rbac.foundation.systems'] = scopes['cloud.rbac.foundation.systems'] ? scopes['cloud.rbac.foundation.systems'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.systems'])) {
      if (scopes['cloud.rbac.foundation.systems'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.systems'].indexOf('write') !== -1) this.scopeFlag.manage = true;
      this.scopeFlag.geographic = true;
    }
    // if (!this.validateScopeStage && this.ssoService.checFoundationScope(AcessModifiers.READ) || this.ssoService.checFoundationScope(AcessModifiers.WRITE)) {
    //   this.scopeFlag.manage = true;
    //   this.scopeFlag.geographic = true;
    // }
    /* this.scopeFlag = {
      manage: true,
      geographic: true
    } */
  }


  getHSI() {
    this.api.GetWorkflowGrid(this.ORG_ID).subscribe((wkflw: any[]) => {
      if (wkflw.length == 0) {
        this.home.getHSI(this.ORG_ID)
          .subscribe(res => {
            if (res) {
              this.dataAvailable = true;
            } else if(!this.HideModel) {
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

  gotoServiceProfiles(){
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'])
  }

  
}
