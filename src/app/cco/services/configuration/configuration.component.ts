import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  language: any;
  languageSubject;
  isToggleSidebar = false;
  menus: any = {
    ontconfigurations: false,
    externalfileserver: false,
    secureonboarding: false,
    stalesystempurge: false,
    subnetconfiguration: false,
    speedtest: false,
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  constructor(private translateService: TranslateService,
    public router: Router,
    public sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    let scopes = this.sso.getScopes();

    if (scopes['cloud.rbac.coc.services.configuration']) {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = true;
      });
    } else {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = scopes[`cloud.rbac.coc.services.configuration.${element}`];
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
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    this.languageSubject.unsubscribe();
  }
  toggleSideBar() {
    this.isToggleSidebar = !this.isToggleSidebar;
    this.sso.triggerToggle();
  }
}
