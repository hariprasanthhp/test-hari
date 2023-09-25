import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingCampaignDefineApiService } from './../shared/services/marketing-campaign-define-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import { getRecommendedSegmentAdditionalFilters } from './../../shared/services/qlik-connection.js';
@Component({
  selector: 'app-marketing-campaigns-summary',
  templateUrl: './marketing-campaigns-summary.component.html',
  styleUrls: ['./marketing-campaigns-summary.component.scss']
})
export class MarketingCampaignsSummaryComponent implements OnInit {

  language: any;
  languageSubject: any;
  baseUrl = `${environment.SUMMARY_URL}&select=clearall&opt=nointeraction`
  baseUrl_pro = `${environment.QLIK_SUMMARY_URL_AQUI}`
  pocURL: any
  Url: SafeUrl

  isRefreshing: boolean = false
  ticketId: any;
  qlikTicketSubject: any;
  savedSegmentSubject: any
  dev: any
  uploadData:boolean = false
  constructor(
    private translateService: TranslateService,
    private ssoAuthService: SsoAuthService,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCommonService: MarketingCommonService,
    private sanitizer: DomSanitizer, private http: HttpClient, private marketingApiService: MarketingApiService) {
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

    // this.pocURL = `${this.baseUrl}&qlikTicket=${this.ticketId}`
    this.pocURL = `${this.baseUrl}`
    const selectedLang = sessionStorage.getItem('defaultLanguage') == 'en' ? `&lang=en&select=%25LANGUAGE,English` : sessionStorage.getItem('defaultLanguage') == 'fr' ? `&lang=fr&select=%25LANGUAGE,French%20Canadian` : sessionStorage.getItem('defaultLanguage') == 'de_DE' ? `&lang=de&select=%25LANGUAGE,German` : `lang=es&select=%25LANGUAGE,Spanish%20Latin%20America`;
    // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocURL);
    // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}?qlikTicket=${this.ticketId}${selectedLang}`);
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}${selectedLang}`);
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
        this.pocURL = this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl_pro}&select=clearall&opt=nointeraction${selectedLang}`, segment)
      }else{
        this.pocURL =this.marketingCommonService.extraParamsAssignerForQlik(`${this.baseUrl}${selectedLang}`, segment) 
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
  // resizeIframe(obj) {
  //   obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  // }
  // myLoadEvent() {

  //   let locData = []
  //   let app1 = this.marketingApiService.getQlikConnectedApp();
  //   getRecommendedSegmentAdditionalFilters(app1, 'LFeyjKg').then(res => {
  //     console.log(res.data, 'objId LFeyjKg -LocationSummary')

  //     // this.locationData = [...this.locationData, ...locData];
  //     // this.locationSelected = constants.CLOUD_ALL;
  //     // this.selectLocation(this.locationSelected, from)



  //   }, (error: any) => {
  //     console.log(error)
  //   })
  // }


  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.qlikTicketSubject) {
      this.qlikTicketSubject.unsubscribe();
    }
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
  }
}
