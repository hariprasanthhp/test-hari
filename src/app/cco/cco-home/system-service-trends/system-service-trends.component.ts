import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';
import { HomeChartOptionsService } from '../services/home-chart-options.service';
import { SystemService } from './system.service';

@Component({
  selector: 'app-system-service-trends',
  templateUrl: './system-service-trends.component.html',
  styleUrls: ['./system-service-trends.component.scss']
})
export class SystemServiceTrendsComponent implements OnInit, OnDestroy {
  @Output() private Out_sysStatus: EventEmitter<any> = new EventEmitter();
  language: any;
  languageSubject;
  MODULE: any;
  commandIQ: any;
  arrowcommandIqperEnable: boolean;
  commandIqper: string;
  arrowPositivecommand: boolean;
  edgeSuit: any;
  arrowedgeSuitperEnable: boolean;
  arrowPositiveedge: boolean;
  edgeSuitper: string;
  FormData: any;
  active: any;
  unassociate: any;
  preprovision: any;
  arrowprovisionEnable: boolean;
  preprovisionper: string;
  arrowactiveEnable: boolean;
  activeper: string;
  arrowunassoEnable: boolean;
  unassociateper: string;
  arrowPositivepro: boolean;
  arrowPositive: boolean;
  arrowPositiveunasso: boolean;
  filterDays: any = "7";
  menus = {
    systemstatus: false,
    systemtype: false,
    systemmodel: false,
    cmndiqstatus: false,
    revedgesuitestatus: false,
    revedgesuiteecosystemstatus:false,
    systembyrevenueedgeiqsuites:false
  }
  commandIQvalue: any;
  hasScopeAccess = false;
  edgeSuiteco: any;
  arrowedgeSuitecoperEnable: boolean;
  edgeSuitpereco: string;
  arrowPositiveedgeEco: boolean;
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
    private router: Router,
    private systemserive: DataService,
    private service: DataService,
    private sso: SsoAuthService,
    private chartOptionService: HomeChartOptionsService,
    private titleService: Title
  ) {
    this.getEdgeSuiteEntitlement();
    let url = this.router.url;
    this.MODULE = this.getRedirectModule(url);
    this.systemserive.CommandIQdata.subscribe((data: any) => {
      this.on_CommandIQdata(data)
    });

    // this.systemserive.edgesuitData.subscribe((data: any) => {
    //   this.on_edgesuitData(data)
    // });

    // this.systemserive.systemvalue.subscribe((data: any) => {
    //   this.OnFormData(data)
    // });

    // this.getOutagesInfo();
    // this.getActiveSystemsInfo();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Subscriber_Trends']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Subscriber_Trends']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {

          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.systemstatus') !== -1) {
            this.menus['systemstatus'] = true;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.systemtype') !== -1) {
            this.menus['systemtype'] = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.systemmodel') !== -1) {
            this.menus['systemmodel'] = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.cmndiqstatus') !== -1) {
            this.menus['cmndiqstatus'] = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.revedgesuitestatus') !== -1) {
            this.menus['revedgesuitestatus'] = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.revedgesuiteecosystemstatus') !== -1) {
            this.menus['revedgesuiteecosystemstatus'] = true;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems.systembyrevenueedgeiqsuites') !== -1) {
            this.menus['systembyrevenueedgeiqsuites'] = true;
          }
        }
      }

    } else {
      this.menus = {
        systemstatus: true,
        systemtype: true,
        systemmodel: true,
        cmndiqstatus: true,
        revedgesuitestatus: true,
        revedgesuiteecosystemstatus:true,
        systembyrevenueedgeiqsuites:true
      }

    }

    for (let key in this.menus) {
      if (this.menus[key]) {
        this.hasScopeAccess = true;
      }
    }

    if (this.hasScopeAccess) {
      this.sso.setPageAccess(true);
    } else {
      this.sso.setPageAccess(false);
    }
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  getRedirectModule(url: string) {
    let foundation = `cco-foundation`;
    if (url.indexOf(`/cco-foundation/`) > -1) {
      return `cco-foundation`;
    } else {
      return `cco`;
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
    if (entitlement && entitlement['arlo'] && (entitlement['arlo'].name === "ARLO")) {
      this.arloEnableentitlement = true;
    }
    else {
      this.arloEnableentitlement = false;
    }
    entitlement['arloUnlimited'] = entitlement[212] ? entitlement[212] : [];
    entitlement['arloUnlimitedPlus'] = entitlement[213] ? entitlement[213] : [];
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
    if (entitlement && entitlement['arloUnlimited'] && (entitlement['arloUnlimited'].name === "ARLO Unlimited") ) {
      this.arloUnlimitedentitlement = true;
    }
    else {
      this.arloUnlimitedentitlement = false;
    }
    if (entitlement && entitlement['arloUnlimitedPlus'] && (entitlement['arloUnlimitedPlus'].name === "ARLO Unlimited Plus") ) {
      this.arloUnlimitedplusentitlement = true;
    }
    else {
      this.arloUnlimitedplusentitlement = false;
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
  // OnFormData(value) {
  //   this.Out_sysStatus.emit(value);
  //   this.service.setsystemsvalue(value);
  // }
  getData() {
    this.chartOptionService.setFilterDays(this.filterDays);
  }
  OnFormData(value?) {
    // this.Out_sysStatus.emit(value);
    // this.service.setsystemsvalue(value);
    this.FormData = value;
    if (this.FormData) {
      this.active = (this.FormData?.active).toLocaleString();
      this.preprovision = (this.FormData?.preprovision).toLocaleString();
      this.unassociate = (this.FormData?.unassociate).toLocaleString();
      if (this.FormData?.preprovisionper == '0') {
        this.arrowprovisionEnable = true;
        this.preprovisionper = '0%'
      } else {
        this.arrowprovisionEnable = false;
      }
      if (this.FormData?.activeper == '0') {
        this.arrowactiveEnable = true;
        this.activeper = '0%';
      } else {
        this.arrowactiveEnable = false;
      }
      if (this.FormData?.unassociateper == '0') {
        this.arrowunassoEnable = true;
        this.unassociateper = '0%';
      } else {
        this.arrowunassoEnable = false;
      }
      if (value.positiveOrNegative == "+") {
        this.preprovisionper = this.FormData?.preprovisionper + '%';
        this.arrowPositivepro = true;
      }
      else {
        this.preprovisionper = this.FormData?.preprovisionper + '%';
        this.arrowPositivepro = false;
      }
      if (value.positiveOrNegativeactive == "+") {
        this.activeper = this.FormData?.activeper ? (this.FormData?.activeper + '%') : "0%";
        this.arrowPositive = true;
      }
      else {
        this.activeper = this.FormData?.activeper ? (this.FormData?.activeper + '%') : "0%"
        this.arrowPositive = false;
      }
      if (value.positiveOrNegativeunassociate == "+") {
        this.unassociateper = this.FormData?.unassociateper ? (this.FormData?.unassociateper + '%') : "0%";
        this.arrowPositiveunasso = true;
      }
      else {
        this.unassociateper = this.FormData?.unassociateper ? (this.FormData?.unassociateper + '%') : "0%"
        this.arrowPositiveunasso = false;
      }
    }

  }

  // on_CommandIQdata(value) {
  //   this.service.setcommandiq(value);
  // }

  // on_edgesuitData(value) {
  //   this.service.setedgesuite(value);
  // }

  on_CommandIQdata(value?) {
    this.commandIQvalue = value
    if (value) {
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


  }

  on_edgesuitiqData(value?) {
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

}
