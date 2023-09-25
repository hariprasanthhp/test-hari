import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from '../data.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  frameUrl: SafeResourceUrl;
  isError;
  alertMessage;
  loader;
  ticketId = '';
  isRefreshing: boolean;
  scopeFlag: any = {};
  language: any;
  languageSubject: any;
  constructor(
    private sso: SsoAuthService,
    private dataService: DataServiceService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      if (this.ticketId) this.formUrl(this.ticketId);
    });

    this.loadUrl();
    this.titleService.setTitle(`${this.language["Dashboard"]}-${this.language["Service"]}-${this.language["Calix Cloud"]}`);
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Dashboard"]}-${this.language["Service"]}-${this.language["Calix Cloud"]}`);
    })
  }

  getScope() {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.dashboardse'] = scopes['cloud.rbac.csc.dashboardse'] ? scopes['cloud.rbac.csc.dashboardse'] : [];

      if (scopes && (scopes['cloud.rbac.csc.dashboardse'])) {
        if (scopes['cloud.rbac.csc.dashboardse'].indexOf('read') !== -1) this.scopeFlag.dashboardRead = true;
        if (scopes['cloud.rbac.csc.dashboardse'].indexOf('write') !== -1) this.scopeFlag.dashboardWrite = true;
      }
    } else {
      this.scopeFlag.dashboardRead = true;
      this.scopeFlag.dashboardWrite = true;
    }
  }

  loadUrl() {
    const pageUrl = window.location.href;
    let qlikCscType = (this.sso.getCscType() === 'DME') ? 'CSC-DME' : 'CSC-EME';
    this.loader = true;
    this.sso.getQlikTOkenByAppType(qlikCscType).subscribe((res: any) => {
      this.loader = false;
      this.ticketId = res.Ticket;
      this.formUrl(this.ticketId);
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });
    //if(pageUrl.includes("dashboard")) 
  }

  formUrl(ticketId) {
    let url = environment.ADVANCED_URL;
    let urlArr = url.split("?");
    const langSuffix = {
      'en': '#/?lang=en&select=%25LANGUAGE,English',
      'fr': `#/?lang=fr&select=%25LANGUAGE,French%20Canadian`,
      'es': `#/?lang=es&select=%25LANGUAGE,Spanish%20Latin%20America`,
      'de_DE': `#/?lang=de&select=%25LANGUAGE,German`,
    };
    const selectedLang = langSuffix[sessionStorage.getItem('defaultLanguage')] || langSuffix['en'];
    this.frameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${urlArr[0].replace('#/', '')}?qlikTicket=${ticketId}${selectedLang}&stream_id=41ifky01626783869132`);
    this.refreshIframe();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = 'Access Denied';
    } else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

  refreshIframe() {
    this.isRefreshing = true;

    setTimeout(() => {
      this.isRefreshing = false;
    }, 50);
  }

}
