import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { FoundationHomeService } from './foundation-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-foundation-home',
  templateUrl: './foundation-home.component.html',
  styleUrls: ['./foundation-home.component.scss']
})
export class FoundationHomeComponent implements OnInit {

  @ViewChild('GetStartedModal', { static: true }) private GetStartedModal: TemplateRef<any>;

  days: any;
  language: any;
  languageSubject;
  dataAvailable: boolean;
  FormData: any;
  active: any = "";
  preprovision: any = "";
  preprovisionper: any = "";
  activeper: any;
  commandIQ: any = "";
  commandIqper: any = "";
  edgeSuit: any = "";
  edgeSuitper: any = "";
  arrowEnable: boolean = false;
  arrowprovisionEnable: boolean = true;
  arrowactiveEnable: boolean = true;
  arrowedgeSuitperEnable: boolean = true;
  arrowedgeSuitecoperEnable: boolean = true;
  arrowcommandIqperEnable: boolean = true;
  arrowPositive: boolean;
  arrowPositivecommand: boolean;
  arrowPositiveedge: boolean;
  arrowPositiveedgeEco:boolean;
  arrowPositivepro: boolean;
  unassociate: any;
  unassociateper: string;
  arrowPositiveunasso: boolean;
  arrowunassoEnable: boolean = true;
  showHome: boolean;
  isDev: boolean;
  modalRef: any;
  ORG_ID: any;
  tosSub: any;
  validateScopeStage: boolean;
  HideModel: boolean=false;
  edgeSuiteco: any;
  edgeSuitpereco: any;
  MyCommunityIQentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  arloEnableentitlement: boolean;
  ServifyEnableentitlement: boolean;
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  smallBizIQentitlement: boolean;

  constructor(
    private translateService: TranslateService,
    public sso: SsoAuthService,
    private modalService: NgbModal,
    private router: Router,
    private home: FoundationHomeService,
    private api: NetopsServiceService,
    private titleService:Title
  ) {
    this.getEdgeSuiteEntitlement();
    this.ORG_ID = this.sso.getOrgId();
    this.getScopes();
  }

  ngOnInit(): void {
    this.HideModel=window.localStorage.getItem("HideModel") ? true:false
    // this.titleService.setTitle('Insights - Home - Deployment - Calix Cloud');
    this.days = "7";
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Insights']} - ${this.language['Home']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Insights']} - ${this.language['Home']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    // let url = this.router.url;
    // if(url.includes('cco-foundation/foundation-home')){
    // }
    if (this.sso.isFoundationTermsAccept()) {
      this.getHSI();
    } else {
      this.tosSub = this.sso.foundationTos$.subscribe((data) => {
        this.getHSI();
      });
    }





  }
  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
    entitlement['Platinum'] = entitlement[215] ? entitlement[215] : [];
    entitlement['Silver'] = entitlement[216] ? entitlement[216] : [];
    entitlement['Gold'] = entitlement[217] ? entitlement[217] : [];
    entitlement['Bark_Premium'] = entitlement[219] ? entitlement[219] : [];
    entitlement['Bark_Junior'] = entitlement[220] ? entitlement[220] : [];
    entitlement['smallBizIQ'] = entitlement[218] ? entitlement[218] : [];
    if (entitlement && entitlement?.smallBizIQ?.apptype === 218) {
      this.smallBizIQentitlement = true;
    }
    else {
      this.smallBizIQentitlement = false;
    }
    if (entitlement && entitlement['Bark_Premium'] && (entitlement['Bark_Premium'].name === "Bark Premium")) {
      this.Bark_Premiumentitlement = true;
    }
    else {
      this.Bark_Premiumentitlement = false;
    }
    if (entitlement && entitlement['Bark_Junior'] && (entitlement['Bark_Junior'].name === "Bark Junior")) {
      this.Bark_Juniorentitlement = true;
    }
    else {
      this.Bark_Juniorentitlement = false;
    }
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.MyCommunityIQentitlement = true;
    }
    else {
      this.MyCommunityIQentitlement = false;
    }
    
    if (entitlement && entitlement['ProtectIQ'] && (entitlement['ProtectIQ'].name === "ProtectIQ")) {
      this.productIQEnableentitlement = true;
    }
    else {
      this.productIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ'] && (entitlement['ExperienceIQ'].name === "ExperienceIQ")) {
      this.ExperienceIQEnableentitlement = true;
    }
    else {
      this.ExperienceIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ And ProtectIQ'] && (entitlement['ExperienceIQ And ProtectIQ'].name === "ExperienceIQ And ProtectIQ")) {
      this.proAndExpEnableentitlement = true;
    }
    else {
      this.proAndExpEnableentitlement = false;
    }
    entitlement['arlo'] = entitlement[206] ? entitlement[206] : [];
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    entitlement['arloUnlimited'] = entitlement[212] ? entitlement[212] : [];
    entitlement['arloUnlimitedPlus'] = entitlement[213] ? entitlement[213] : [];
    if (entitlement && entitlement['arloUnlimited'] && (entitlement['arloUnlimited'].name === "ARLO Unlimited")) {
      this.arloUnlimitedentitlement = true;
    }
    else {
      this.arloUnlimitedentitlement = false;
    }
    if (entitlement && entitlement['arloUnlimitedPlus'] && (entitlement['arloUnlimitedPlus'].name === "ARLO Unlimited Plus")) {
      this.arloUnlimitedplusentitlement = true;
    }
    else {
      this.arloUnlimitedplusentitlement = false;
    }
    if (entitlement && entitlement['arlo'] && (entitlement['arlo'].name === "ARLO")) {
      this.arloEnableentitlement = true;
    }
    else {
      this.arloEnableentitlement = false;
    }
    if (entitlement && entitlement['Servify'] && (entitlement['Servify'].name === "Servify Bronze")) {
      this.ServifyEnableentitlement = true;
    }
    else {
      this.ServifyEnableentitlement = false;
    }
    if (entitlement && entitlement['Platinum'] && (entitlement['Platinum'].name === "Servify Platinum")) {
      this.ServifyPlatinumentitlement = true;
    }
    else {
      this.ServifyPlatinumentitlement = false;
    }
    if (entitlement && entitlement['Silver'] && (entitlement['Silver'].name === "Servify Silver")) {
      this.ServifySilverentitlement = true;
    }
    else {
      this.ServifySilverentitlement = false;
    }
    if (entitlement && entitlement['Gold'] && (entitlement['Gold'].name === "Servify Gold")) {
      this.ServifyGoldentitlement = true;
    }
    else {
      this.ServifyGoldentitlement = false;
    }
  }
  getScopes() {
    let scopes = this.sso.getScopes();
    scopes['cloud.rbac.foundation.insights'] = scopes['cloud.rbac.foundation.insights'] ? scopes['cloud.rbac.foundation.insights'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.insights'])) {
      if (scopes['cloud.rbac.foundation.insights'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.insights'].indexOf('write') !== -1)
        this.showHome = true;
    }


  }

  OnFormData(value?) {
    //debugger;
    this.FormData = value;
    this.active = (this.FormData.active).toLocaleString();
    this.preprovision = (this.FormData.preprovision).toLocaleString();
    this.unassociate = (this.FormData.unassociate).toLocaleString();
    if (this.FormData.preprovisionper == '0') {
      this.arrowprovisionEnable = true;
      this.preprovisionper = '0%'
    } else {
      this.arrowprovisionEnable = false;
    }
    if (this.FormData.activeper == '0') {
      this.arrowactiveEnable = true;
      this.activeper = '0%';
    } else {
      this.arrowactiveEnable = false;
    }
    if (this.FormData.unassociateper == '0') {
      this.arrowunassoEnable = true;
      this.unassociateper = '0%';
    } else {
      this.arrowunassoEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.preprovisionper = this.FormData.preprovisionper + '%';
      this.arrowPositivepro = true;
    }
    else {
      this.preprovisionper = this.FormData.preprovisionper + '%';
      this.arrowPositivepro = false;
    }
    if (value.positiveOrNegativeactive == "+") {
      this.activeper = this.FormData.activeper ? (this.FormData.activeper + '%') : "0%";
      this.arrowPositive = true;
    }
    else {
      this.activeper = this.FormData.activeper ? (this.FormData.activeper + '%') : "0%"
      this.arrowPositive = false;
    }
    if (value.positiveOrNegativeunassociate == "+") {
      this.unassociateper = this.FormData.unassociateper ? (this.FormData.unassociateper + '%') : "0%";
      this.arrowPositiveunasso = true;
    }
    else {
      this.unassociateper = this.FormData.unassociateper ? (this.FormData.unassociateper + '%') : "0%"
      this.arrowPositiveunasso = false;
    }
  }
  on_CommandIQdata(value?) {
    this.commandIQ = (value?.commandIq) ? (value.commandIq).toLocaleString() : '0';
    if (value.commandIqper == '0') {
      this.arrowcommandIqperEnable = true;
      this.commandIqper = '0%'
    } else {
      this.arrowcommandIqperEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.commandIqper = value.commandIqper + '%';
      this.arrowPositivecommand = true;
    }
    else {
      this.commandIqper = value.commandIqper + '%';
      this.arrowPositivecommand = false;
    }

  }
  on_edgesuitecoData(value){
    this.edgeSuiteco = value.edgeSuit ? (value.edgeSuit).toLocaleString() : '0';
    if (value.edgeSuitper == '0') {
      this.arrowedgeSuitecoperEnable = true;
      this.edgeSuitpereco = '0%';
    } else {
      this.arrowedgeSuitecoperEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.edgeSuitpereco = value.edgeSuitper + '%';
      this.arrowPositiveedgeEco = true;
    }
    else {
      this.edgeSuitpereco = value.edgeSuitper + '%';
      this.arrowPositiveedgeEco = false;
    }
  }

  on_edgesuitiqData(value?,data?) {
    this.edgeSuit = value.edgeSuit ? (value.edgeSuit).toLocaleString() : '0';
    if (value.edgeSuitper == '0') {
      this.arrowedgeSuitperEnable = true;
      this.edgeSuitper = '0%';
    } else {
      this.arrowedgeSuitperEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.edgeSuitper = value.edgeSuitper + '%';
      this.arrowPositiveedge = true;
    }
    else {
      this.edgeSuitper = value.edgeSuitper + '%';
      this.arrowPositiveedge = false;
    }
  }
  ngOnDestroy() {
    if (this.tosSub) {
      this.tosSub.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.modalRef) this.modalService.dismissAll();
  }

  goToInitialOnboarding() {
    this.modalService.dismissAll("closed");
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-workflow/workflows']);
  }

  getHSI() {
    this.dataAvailable = true;
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
  closeAllModal() {
    this.HideModel=true
    window.localStorage.setItem('HideModel', 'true');
    this.modalService.dismissAll();
   
  }

}
