import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';

@Component({
  selector: 'app-marketing-campaign-ts',
  templateUrl: './marketing-campaign-ts.component.html',
  styleUrls: ['./marketing-campaign-ts.component.scss']
})
export class MarketingCampaignTSComponent implements OnInit {
  pocURL: any
  Url: SafeUrl
  baseUrl_TS = `${environment.QLIK_TS_BASEURL}`
  Ts_TokenURL = `${environment.QLIK_TS_TOKEN_URL}`
  Ts_RedirectUrl =`${environment.QLIK_TS_REDIRECT}`
  qlikTicketSubject: any;
  savedSegmentSubject: any;
  ticketId: any;
  isRefreshing: boolean = false
  uploadData: boolean = false
  @Input() hidden: any
  ticketIdUser
  constructor(
    private ssoAuthService: SsoAuthService,
    private sanitizer: DomSanitizer,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService,
    private  marketingHomeApiService :MarketingHomeApiService

  ) {
    
  }

  ngOnInit(): void {
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
  }

  formFrameUrl() {
    let entitlement = this.ssoAuthService.getEntitlements();
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
    this.pocURL = `${this.baseUrl_TS}${this.Ts_TokenURL}?auth_token=${this.ticketId}&username=${this.ticketIdUser}&redirect_url=${this.Ts_RedirectUrl}/campaign?userType=${cmcType}`;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.pocURL}`);
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe(); 
    }
    // GET CHANGE SEGMENTS
    this.savedSegmentSubject = this.marketingCampaignDefineApiService.savedSegmentSubject.subscribe((segment: any) => {
      if (segment != '' && segment != undefined) {
      this.Url = undefined;
     
      let filter={}
      if(segment.hasOwnProperty('location')){
        filter['location'] = segment.location
      }
      if(segment.hasOwnProperty('region')){
        filter['region'] = segment.region
      }
      if(segment.hasOwnProperty('serviceTier')){
        filter['servicegrp'] = segment.serviceTier
      }
      if(segment.hasOwnProperty('propensity')){
        filter['propensity'] = [segment.propensity]
      }
      if(segment.hasOwnProperty('zipPlusFour')){
        filter['zip plus four'] = segment.zipPlusFour
      }
      if(segment.hasOwnProperty('zipcode')){
        filter['zipcode'] = segment.zipcode
      }
     
      let senddata = JSON.stringify(filter)
      let formedUrl = `${this.pocURL}&segement_id=${segment.segmentId}&select=${encodeURI(senddata)}`
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(formedUrl);
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