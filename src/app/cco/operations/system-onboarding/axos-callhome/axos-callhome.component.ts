import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-axos-callhome',
  templateUrl: './axos-callhome.component.html',
  styleUrls: ['./axos-callhome.component.scss']
})
export class AxosCallhomeComponent implements OnInit {
  language: any;
  languageSubject: any;
  menus: any = {
    systems: false,
    callhome: false
  };

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.setActiveMenu();
    let scopes = this.sso.getScopes();
    if (scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome']) {
      this.menus = {
        systems: true,
        callhome: true
      };
    } else {
      this.menus['systems'] = scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems'];
      this.menus['callhome'] = scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome'];
    }

  }

  activeMenus = {
    'callhome': false
  }

  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.sso.isMenuActive(menu);
    }

  }

}
