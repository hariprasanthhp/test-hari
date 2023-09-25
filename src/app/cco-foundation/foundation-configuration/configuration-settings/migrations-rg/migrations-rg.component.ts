import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-migrations-rg',
  templateUrl: './migrations-rg.component.html',
  styleUrls: ['./migrations-rg.component.scss']
})
export class MigrationsRgComponent implements OnInit {
  language: any;
  languageSubject;
  menus: any = {};
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  hasScope: boolean;
  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    console.log("scopes",scopes)
    if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']) {
      this.hasScope = true
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    if (!this.hasScope) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

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

}
