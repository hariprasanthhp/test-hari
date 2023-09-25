import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CcoCommonService } from '../../shared/services/cco-common.service';
@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  allowSubscriberSystems = true;
  language: any;
  languageSubject;
  menus: any = {};
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  ccoSearchText: any;
  isProvisioned: any;
  constructor(private translateService: TranslateService,
    private router: Router,
    private ccoCommonService: CcoCommonService,
    private sso: SsoAuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      //todo
    } else {

    }
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowSubscriberSystems = false;
    }
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        if (scopes['cloud.rbac.coc.services.subscribers'] || scopes['cloud.rbac.coc.services.subscribers.subscriberslist']) {
          this.menus['subscriber'] = true;
        }
      }

    } else {
      this.menus = {
        subscriber: true,
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
    this.ccoCommonService.textSearch.subscribe((value)=>{
      this.ccoSearchText = value.searchText;
      this.isProvisioned = value.isProvisioned;
    })
  }
  ngOnDestroy(): void {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
}
