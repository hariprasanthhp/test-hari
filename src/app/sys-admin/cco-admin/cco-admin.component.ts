import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-admin',
  templateUrl: './cco-admin.component.html',
  styleUrls: ['./cco-admin.component.scss']
})
export class CcoAdminComponent implements OnInit, OnDestroy {

  isDev: boolean = false;
  language;
  languageSubject;
  constructor(private translateService: TranslateService,
    private sso: SsoAuthService) {
    this.showApps();
    let base = `${environment.API_BASE}`;
    let host = window.location.host;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  apps = {
    coc: false,
    config: false

  }
  showApps(): void {
    let enttlmnts = this.sso.getEntitlements();
    let roles = this.sso.getRoles();

    if (!enttlmnts[102]) {
      this.apps.coc = true;
    }

    this.apps.config = true;
  }
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
