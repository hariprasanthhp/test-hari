import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
var CryptoJS = require('crypto-js');
@Component({
  selector: 'app-marketing-channel-constant',
  templateUrl: './marketing-channel-constant.component.html',
  styleUrls: ['./marketing-channel-constant.component.scss']
})
export class MarketingChannelConstantComponent implements OnInit {

  code: any;
  accessToken = '';
  serverPrefix = '';
  serviceUrl: any = '';
  clientId = '';
  clientSecret = '';

  // clientId = '891410219098';
  // clientSecret = '73a79a3cf91327d8d3596c3a0f63898bca4f8f6a4f9cce8d41';

  tokenUrl = 'https://login.mailchimp.com/oauth2/token';
  metaDataUrl = 'https://login.mailchimp.com/oauth2/metadata';
  loading = true;
  validConstantContactToken = false;
  validMailchimpToken = false;
  mailchimpStatus = 'Not Configured';
  language;
  languageSubject;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sso: SsoAuthService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    // this.clientId = environment.HUBSPOT_CLIENT_ID
    // this.clientSecret = environment.HUBSPOT_CLIENT_SECRET_ID
    // this.serviceUrl = `${WindowRefService.prototype.nativeWindow}/marketing/channels/hubspot`;

    // uSKfxJdTDf6WTZWkpj3T1hKOlVfW9RBBVzNYjGpe0Oc
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (this.code) {
        this.getMailChimpToken();
      } else {
        this.getMrktngChnlAuth()
      }

    });

  }

  getMailChimpToken(): any {

    let params = {
      "channelName": "ConstantContact",
      "orgId": this.sso.getOrgId(),
      "key": this.code
    };


    this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validConstantContactToken = true;
          this.sso.setValidConstantAuth(true);
        } else {
          this.sso.setValidConstantAuth(false);
        }

        this.mailchimpStatus = json.status;
      }

      this.router.navigate(['/engagement/channels/constant']);

      this.loading = false;
      // this.accessToken = json.access_token;
      // this.serverPrefix = json.dc

    }, (err: any) => {
      this.loading = false;
      this.router.navigate(['/engagement/channels/constant']);
      if (err.status === 404) {
        this.mailchimpStatus = 'Not Configured';
      }
    });
  }

  getMrktngChnlAuth() {
    var channel = 'ConstantContact'
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/${channel}`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active') {
          this.validConstantContactToken = true;
          this.sso.setValidMailChimpAuth(true);
        } else {
          this.sso.setValidMailChimpAuth(false);
        }

        this.mailchimpStatus = json.status;
      }
      this.loading = false;

    }, (err: any) => {
      this.loading = false;
      if (err.status === 404) {
        this.mailchimpStatus = 'Not Configured';
      }

    });
  }
}
