import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-profiles',
  templateUrl: './service-profiles.component.html',
  styleUrls: ['./service-profiles.component.scss']
})
export class ServiceProfilesComponent implements OnInit {

  language: any;
  languageSubject;
  menus: any = {
    serviceprofiles: false,
    rgprofiles: false,
    rgdialplans: false,
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {

    let scopes = this.sso.getScopes();

    if (scopes['cloud.rbac.coc.services.serviceprofiles']) {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = true;
      });
    } else {
      Object.keys(this.menus)?.forEach((element: any) => {
        this.menus[element] = scopes[`cloud.rbac.coc.services.serviceprofiles.${element}`];
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
}
