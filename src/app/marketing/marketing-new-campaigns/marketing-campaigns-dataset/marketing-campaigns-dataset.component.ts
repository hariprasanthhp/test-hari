import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-marketing-campaigns-dataset',
  templateUrl: './marketing-campaigns-dataset.component.html',
  styleUrls: ['./marketing-campaigns-dataset.component.scss']
})
export class MarketingCampaignsDatasetComponent implements OnInit, OnDestroy {
  pocURL: any
  Url: SafeUrl
  baseUrl = `${environment.SMART_TABLE_URL}&select=clearall`;
  qlikTicketSubject: any
  savedSegmentSubject: any
  ticketId: any;
  isRefreshing: boolean = false
  @Input() hidden: any
  constructor(
    private ssoAuthService: SsoAuthService,
    private sanitizer: DomSanitizer,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.selectedLanguage.subscribe(data => {
      if (this.ticketId) this.formFrameUrl();
    });

    this.qlikTicketURL();
  }
  ngOnDestroy() {
    if (this.qlikTicketSubject) {
      this.qlikTicketSubject.unsubscribe();
    }
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
  }
  qlikTicketURL() {
    let entitlement = this.ssoAuthService.getEntitlements();
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
    this.qlikTicketSubject = this.ssoAuthService.getQlikTOkenByAppType(cmcType).subscribe((res: any) => {
      this.ticketId = res ? res?.Ticket : '';
      if (this.ticketId) this.formFrameUrl();
    })
  }
  formFrameUrl() {
    // this.pocURL = `${this.baseUrl}&qlikTicket=${this.ticketId}&opt=noselections`
    // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocURL);
    const selectedLang = sessionStorage.getItem('defaultLanguage') == 'en' ? `&lang=en&select=%25LANGUAGE,English` : sessionStorage.getItem('defaultLanguage') == 'fr' ? `&lang=fr&select=%25LANGUAGE,French%20Canadian` : sessionStorage.getItem('defaultLanguage') == 'de_DE' ? `&lang=de&select=%25LANGUAGE,German` : `lang=es&select=%25LANGUAGE,Spanish%20Latin%20America`;
    this.pocURL = `${this.baseUrl}`;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}&opt=noselections${selectedLang}`);
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
    // GET CHANGE SEGMENTS
    this.savedSegmentSubject = this.marketingCampaignDefineApiService.savedSegmentSubject.subscribe((segment: any) => {
      if (segment != 'empty') {
        this.Url = undefined;
        // this.pocURL = this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl}&opt=noselections`, segment)
        this.pocURL = this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl}&opt=noselections${selectedLang}`, segment)
        this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocURL);
      }
    })
    this.refreshIframe();
  }
  refreshIframe() {
    this.isRefreshing = true;

    setTimeout(() => {
      this.isRefreshing = false;
    }, 50);
  }
  resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

}
