import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CcoCommonService } from '../../shared/services/cco-common.service';

@Component({
  selector: 'app-cco-network-system',
  templateUrl: './cco-network-system.component.html',
  styleUrls: ['./cco-network-system.component.scss']
})
export class CcoNetworkSystemComponent implements OnInit, OnDestroy {

  language;
  languageSubject;
  currentPage: any;
  currentPageSubs: any;
  menus = {
    network: false,
    subscriber: false,
  }

  constructor(
    private translateService: TranslateService,
    private ccoCommonService: CcoCommonService,
    private sso: SsoAuthService,
    private router: Router
  ) {
    this.currentPageSubs = this.ccoCommonService.currentPageData.subscribe((data: any) => {
      this.currentPage = data;

      //console.log(this.currentPage)
    });

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.systems.network') !== -1) {
            this.menus['network'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.systems.subscriber') !== -1) {
            this.menus['subscriber'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        network: true,
        subscriber: true,
      }

    }

    if (!this.menus['network'] && this.menus['subscriber']) {
      this.router.navigate(['/cco/system/cco-subscriber-system/system-table-view']);
    }
  }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.currentPageSubs) this.currentPageSubs.unsubscribe();
  }

  downloadExport() {
    this.ccoCommonService.doExport('network-system-table-list');
  }

}
