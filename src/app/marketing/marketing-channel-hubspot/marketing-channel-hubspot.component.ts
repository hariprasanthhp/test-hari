import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';

@Component({
  selector: 'app-marketing-channel-hubspot',
  templateUrl: './marketing-channel-hubspot.component.html',
  styleUrls: ['./marketing-channel-hubspot.component.scss']
})
export class MarketingChannelHubspotComponent implements OnInit {
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
  validHubspotToken = false;
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
    this.clientId = environment.HUBSPOT_CLIENT_ID
    this.clientSecret = environment.HUBSPOT_CLIENT_SECRET_ID
    this.serviceUrl = `${WindowRefService.prototype.nativeWindow}/marketing/channels/hubspot`;
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
      "channelName": "Hubspot",
      "orgId": this.sso.getOrgId(),
      "key": this.code
    };


    this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validHubspotToken = true;
          this.sso.setValidHubSpotAuth(true);
        } else {
          this.sso.setValidHubSpotAuth(false);
        }

        this.mailchimpStatus = json.status;
      }

      this.router.navigate(['/engagement/channels/hubspot']);

      this.loading = false;
      // this.accessToken = json.access_token;
      // this.serverPrefix = json.dc

    }, (err: any) => {
      this.loading = false;
      this.router.navigate(['/engagement/channels/hubspot']);
      if (err.status === 404) {
        this.mailchimpStatus = 'Not Configured';
      }
    });
  }


  getAuthenticationToken(): any {
    // let params = {
    //   'grant_type': "authorization_code",
    //   'client_id': this.clientId,
    //   'client_secret': this.clientSecret,
    //   'redirect_uri': this.serviceUrl,
    //   'code': this.code
    // };

    let params = `grant_type=authorization_code&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.serviceUrl}&code=${this.code}`
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-type', `application/x-www-form-urlencoded\r\n`);


    this.http.post(`${this.tokenUrl}`, params, { headers }).subscribe((json: any) => {
      this.accessToken = json.access_token;
      this.getUserServerPrefix();

    }, (err: any) => {
    });
  }

  getUserServerPrefix() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', `OAuth ${this.accessToken}`);

    this.http.get(`${this.metaDataUrl}`, { headers }).subscribe((json: any) => {
      this.serverPrefix = json.dc;



    }, (err: any) => {
    });
  }

  getMrktngChnlAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/Hubspot`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active') {
          this.validHubspotToken = true;
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

