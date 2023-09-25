import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-setting',
  templateUrl: './configuration-setting.component.html',
  styleUrls: ['./configuration-setting.component.scss']
})
export class ConfigurationSettingComponent implements OnInit {

  language;
  languageSubject;

  subnetsShow: boolean = false;
  secureOnboardShow: boolean = false;
  staleDeviceShow: boolean = false;
  edgeSuitesShow: boolean = false;
  systemSettingsShow: boolean = false;
  commandIQShow: boolean = false;
  blockPageShow: boolean = false;

  validateScopeStage: boolean = false;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  constructor(
    private translateService: TranslateService, public sso: SsoAuthService, public router: Router
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    this.getEdgeSuiteEntitlement();
    let scopes = this.sso.getScopes();

    scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.configurations'])) {
      if (scopes['cloud.rbac.foundation.configurations'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.configurations'].indexOf('write') !== -1)
      this.commandIQShow = true;
      this.blockPageShow = true;
      this.subnetsShow = true;
      this.secureOnboardShow = true;
      this.staleDeviceShow = true;
      this.edgeSuitesShow = true;
      this.systemSettingsShow = true;
    }
  }
  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
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

  }

}
