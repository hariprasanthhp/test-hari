import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingHomeApiService } from 'src/app/marketing/marketing-home/marketing-home-Apiservice';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marketing-customtab',
  templateUrl: './marketing-customtab.component.html',
  styleUrls: ['./marketing-customtab.component.scss']
})
export class MarketingCustomtabComponent implements OnInit {
  iframeUrl: SafeResourceUrl;
  ticketId
  ticketIdUser
  baseUrl_TS = `${environment.QLIK_TS_BASEURL}`
  Ts_TokenURL = `${environment.QLIK_TS_TOKEN_URL}`
  Ts_RedirectUrl =`${environment.QLIK_TS_REDIRECT}`
  language: any;
  languageSubject;
  @Input() segmentId;
  constructor(private sanitizer: DomSanitizer, private marketingHomeApiService: MarketingHomeApiService, private sso: SsoAuthService,
    private translateService: TranslateService,
    private titleService: Title) {
   
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`Custom Tab - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    });
    if(this.language){
      this.titleService.setTitle(`Custom Tab - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    }
    this.qlikTicketURL();
  }

  qlikTicketURL() {
    return new Promise((resolve, reject) => {
      this.marketingHomeApiService.getTsAuthToken().subscribe((res) => {
      }, err => {
        let ticket = err.error.text ? err.error.text : '';
        if(ticket.includes("~~")){
          var stringArray = ticket.split("~~");
          this.ticketId = stringArray[0];
          this.ticketIdUser=stringArray[1];
         }else{
          this.ticketId = ticket;
          this.ticketIdUser = '';
         }
        if (this.ticketId) this.formFrameUrl();
        resolve(err.error.text);
        //this.getList();
      })
    })
    // this.marketingHomeApiService.getTsAuthToken().subscribe((res: any) => {
    //   this.ticketId = res ? res : '';
    //   console.log(res,'res')
    //   if (this.ticketId) this.formFrameUrl();
    // })
  }
  formFrameUrl() {
  
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl_TS}${this.Ts_TokenURL}?auth_token=${this.ticketId}&username=${this.ticketIdUser}&redirect_url=${this.Ts_RedirectUrl}/custom_dashboard`)
  }

  

}
