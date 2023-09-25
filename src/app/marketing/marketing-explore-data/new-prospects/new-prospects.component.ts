import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-prospects',
  templateUrl: './new-prospects.component.html',
  styleUrls: ['./new-prospects.component.scss']
})
export class NewProspectsComponent implements OnInit {
  @Input() segmentId;
  pocURL: any
  Url: any
  counter: boolean = false;
  bookmark: any;
  frenchchange: any
  isRefreshing: boolean = false
  ticketId: any;
  language: any;
  languageSubject;
  constructor(
    private ssoAuthService: SsoAuthService,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private titleService: Title

  ) {

  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["prospects"]} - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    });
    if(this.language){
      this.titleService.setTitle(`${this.language["prospects"]} - ${this.language["Explore_Data"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    }
    this.translateService.selectedLanguage.subscribe(data => {
      if (this.ticketId) this.formFrameUrl();
    });

    this.qlikTicketURL();
  }
  qlikTicketURL() {
    let entitlement = this.ssoAuthService.getEntitlements();
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
    // https://clouddashboards-stg.calix.com/ticket/extensions/InfoXD_New/InfoXD_New.html?qlikTicket=TmEALHgjSu80GLoP#/?appId=y6b2per1608308687294&boardId=2cbuhe01608205645836&lang=fr&select=%25LANGUAGE,French%20Canadian
    this.ssoAuthService.getQlikTOkenByAppType(cmcType).subscribe((res: any) => {
      this.ticketId = res ? res?.Ticket : '';
      if (this.ticketId) this.formFrameUrl();
    })
  }
 
  formFrameUrl() {
    this.bookmark = this.segmentId ? `&bookmarkId=${this.segmentId}` : ''
    const selectedLang = sessionStorage.getItem('defaultLanguage') == 'en' ? `&lang=en&select=clearall&select=%25LANGUAGE,English&stream_id=id8s6v51626783900713` : sessionStorage.getItem('defaultLanguage') == 'fr' ? `&lang=fr&select=clearall&select=%25LANGUAGE,French%20Canadian&stream_id=id8s6v51626783900713` : sessionStorage.getItem('defaultLanguage') == 'de_DE' ? `&lang=de&select=clearall&select=%25LANGUAGE,German&stream_id=id8s6v51626783900713` : `&lang=es&select=clearall&select=%25LANGUAGE,Spanish%20Latin%20America&stream_id=id8s6v51626783900713`;

    this.pocURL = `${environment.ADVANCED_URL.replace('?', '')}`;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}?qlikTicket=${this.ticketId}#/?appId=${environment.APP_ID_PRO}&boardId=${environment.BOARD_ID_PRO}${this.bookmark}${selectedLang}`);
    this.refreshIframe();
  }

  resizeIframe(obj) {
    let iFrameID: any = document.getElementById('prospect-iframe');
    if (iFrameID && !this.counter) {
      this.counter = true;
      // here you can make the height, I delete it first, then I make it again
      iFrameID.height = "";
      let height = iFrameID.contentWindow.document.body.scrollHeight;
      iFrameID.height = height ? height + "px" : 1200 + 'px';
    }
    // iFrameID.height = "";
    // let height = iFrameID.contentWindow.document.body.scrollHeight + 'px';
    // iFrameID.height = height;
    // console.log(iFrameID.height, 'height1')
    // $('.myIframe').css('height', $(window).height() + 'px');
    // obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
  refreshIframe() {
    this.isRefreshing = true;

    setTimeout(() => {
      this.isRefreshing = false;
    }, 50);
  }

}
