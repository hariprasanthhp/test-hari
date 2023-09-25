import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';

@Component({
  selector: 'app-advance-explorer-qlik',
  templateUrl: './advance-explorer-qlik.component.html',
})
export class AdvanceExplorerQlikComponent implements OnInit {
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
      this.titleService.setTitle(`${this.language["Advanced"]} - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    });
    if(this.language){
      this.titleService.setTitle(`${this.language["Advanced"]} - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
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
    let entitlement = this.sso.getEntitlements();
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl_TS}${this.Ts_TokenURL}?auth_token=${this.ticketId}&username=${this.ticketIdUser}&redirect_url=${this.Ts_RedirectUrl}?segment_id=${this.segmentId}&userType=${cmcType}`)
  }

  

}
