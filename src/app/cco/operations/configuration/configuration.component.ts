import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  language: any;
  languageSubject;
  menus: any = {
    workflows: false,
    systemgroups: false,
    softwareimages: false,
    performancetesting: false,
    configurationfiles: false,
    axosmigration: false,
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  activeMenus = {
    'configuration': false,
    'software': false,
    'devices-group':false

  }
  dev: boolean;
  constructor(private translateService: TranslateService,
    public router: Router,
    private sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    //this.dev = WindowRefService.prototype.nativeWindow.includes('cloud-dev.calix.com') ? true : false
    this.setActiveMenu();
    let scopes = this.sso.getScopes();

    if (scopes['cloud.rbac.coc.operations.configuration']) {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = true;
      });
    } else {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = scopes[`cloud.rbac.coc.operations.configuration.${element}`];
      });
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

  ngOnDestroy() {
    this.pageAcceesObs?.unsubscribe();
    this.languageSubject?.unsubscribe();
  }
  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.sso.isMenuActive(menu);
    }

  }
}
