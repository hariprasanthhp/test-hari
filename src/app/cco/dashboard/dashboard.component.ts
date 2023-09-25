import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from 'src/app/support/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  frameUrl: SafeResourceUrl;
  isError;
  alertMessage;
  loader;
  ticketId = '';
  isRefreshing: boolean;
  noScopes = true;
  language: any;

  constructor(
    private ssoService: SsoAuthService,
    private dataService: DataServiceService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (this.ticketId) this.formUrl(this.ticketId);
      this.titleService.setTitle(`${this.language['Calix Cloud']} - ${this.language['Operations']}`);
    });
    this.titleService.setTitle(`${this.language['Calix Cloud']} - ${this.language['Operations']}`);
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      if (Object.keys(scopes).length && scopes['cloud.rbac.coc.dashboard']) {
        this.noScopes = false;
        this.loadUrl();
      }
    } else {
      this.noScopes = false;
      this.loadUrl();
    }

  }

  loadUrl() {
    const pageUrl = window.location.href;
    let qlikCscType = 'CCO';
    this.loader = true;
    this.ssoService.getQlikTOkenByAppType(qlikCscType).subscribe((res: any) => {
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
    let langParams = {
      en: '#/?lang=en&select=%25LANGUAGE,English',
      fr: '#/?lang=fr&select=%25LANGUAGE,French%20Canadian',
      es: '#/?lang=es&select=%25LANGUAGE,Spanish%20Latin%20America',
      de_DE: `#/?lang=de&select=%25LANGUAGE,German`,
    }
    let lang = sessionStorage.getItem('defaultLanguage');
    const selectedLang = langParams[lang];
    this.frameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${urlArr[0].replace('#/', '')}?qlikTicket=${ticketId}${selectedLang}&stream_id=e1mg7db1626871735441`);
    this.refreshIframe();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = 'Access Denied';
    } else {
      this.alertMessage = this.dataService.pageErrorHandle(err);
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
