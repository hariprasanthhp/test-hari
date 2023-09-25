import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-prerequisites',
  templateUrl: './configuration-prerequisites.component.html',
  styleUrls: ['./configuration-prerequisites.component.scss']
})
export class ConfigurationPrerequisitesComponent implements OnInit {

  language;
  languageSubject;

  systemGroupShow: boolean = false;
  profilesShow: boolean = false;
  dialPlansShow: boolean = false;
  softwareImagesShow: boolean = false;
  validateScopeStage: boolean = false;
  constructor(
    private translateService: TranslateService, public sso: SsoAuthService, public router: Router
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  }

  ngOnInit(): void {

    let scopes = this.sso.getScopes();

    scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.configurations'])) {
      if (scopes['cloud.rbac.foundation.configurations'].indexOf('read') !== -1 || scopes['cloud.rbac.foundation.configurations'].indexOf('write') !== -1)
        this.profilesShow = true;
      this.systemGroupShow = true;
      this.dialPlansShow = true;
      this.softwareImagesShow = true;
    }
  }

}
