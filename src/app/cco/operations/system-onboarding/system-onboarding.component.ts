import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system-onboarding',
  templateUrl: './system-onboarding.component.html',
  styleUrls: ['./system-onboarding.component.scss']
})
export class SystemOnboardingComponent implements OnInit {
  axosSystemsUrl: any = '/cco/operations/system-onboarding/axos-callhome/axos/list';
  language: any;
  languageSubject;
  menus: any = {
    axoscallhome: false,
    cmsexacallhome: false,
    regionsettings: false,
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  activeMenus = {
    'axos-callhome': false
  }

  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.setActiveMenu();
    let scopes = this.sso.getScopes();

    if (scopes['cloud.rbac.coc.operations.systemonboarding']) {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = true;
      });
    } else {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = scopes[`cloud.rbac.coc.operations.systemonboarding.${element}`];
      });

      if (!this.menus['axoscallhome']) {
        this.menus['axoscallhome'] = scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome'] || scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems'];
      }

      if (!scopes['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems']) {
        this.axosSystemsUrl = '/cco/operations/system-onboarding/axos-callhome/callhome/list';
      }
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });
  }

  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.sso.isMenuActive(menu);
    }

  }

  ngOnDestroy() {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    this.languageSubject?.unsubscribe();
  }

}
