import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-marketing-campaigns-map',
  templateUrl: './marketing-campaigns-map.component.html',
  styleUrls: ['./marketing-campaigns-map.component.scss']
})
export class MarketingCampaignsMapComponent implements OnInit {

  pocURL: any
  Url: SafeUrl
  baseUrl = `${environment.MAP_URL}&select=clearall`;
  baseUrl_pro = `${environment.QLIK_MAP_URL_AQUI}`
  qlikTicketSubject: any;
  savedSegmentSubject: any;
  ticketId: any;
  isRefreshing: boolean = false
  dev: any;
  uploadData: boolean = false
  @Input() hidden: any
  constructor(
    private ssoAuthService: SsoAuthService,
    private sanitizer: DomSanitizer,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService,

  ) {
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true
    } else {
      this.dev = false
    }
  }

  ngOnInit(): void {
    this.translateService.selectedLanguage.subscribe(data => {
      if (this.ticketId) this.formFrameUrl();
    });

    this.qlikTicketURL()
  }

  qlikTicketURL() {
    let entitlement = this.ssoAuthService.getEntitlements();
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
    this.ssoAuthService.getQlikTOkenByAppType(cmcType).subscribe((res: any) => {
      this.ticketId = res ? res?.Ticket : '';
      if (this.ticketId) this.formFrameUrl();
    })

  }

  formFrameUrl() {
    const selectedLang = sessionStorage.getItem('defaultLanguage') == 'en' ? `&lang=en&select=%25LANGUAGE,English` : sessionStorage.getItem('defaultLanguage') == 'fr' ? `&lang=fr&select=%25LANGUAGE,French%20Canadian` : sessionStorage.getItem('defaultLanguage') == 'de_DE' ? `&lang=de&select=%25LANGUAGE,German` : `lang=es&select=%25LANGUAGE,Spanish%20Latin%20America`;
    this.pocURL = `${this.baseUrl}`;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}&opt=noselections${selectedLang}`);

    // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocURL);
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
    // GET CHANGE SEGMENTS
    this.savedSegmentSubject = this.marketingCampaignDefineApiService.savedSegmentSubject.subscribe((segment: any) => {
      if (segment != '' && segment != undefined) {
        this.Url = undefined;
        if(segment.segmentType == 'Upload'){
          let name = segment.segmentName
          let segmentname = name.substring(name.lastIndexOf("_")+1)
          this.uploadData = segmentname == 'Prospects' ? true : false
        }else{
          this.uploadData = false
        }
if(segment.segmentType == 'Acquisition' || this.uploadData ){
  this.pocURL = this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl_pro}&select=clearall&opt=noselections${selectedLang}`, segment)
}else{
  this.pocURL = this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl}&opt=noselections${selectedLang}`, segment)
}

        

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
  ngOnDestroy() {
    if (this.qlikTicketSubject) {
      this.qlikTicketSubject.unsubscribe();
    }
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
  }

}
