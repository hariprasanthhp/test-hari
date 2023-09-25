import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { MarketingChannelsApiService } from '../../marketing-channels/shared/services/marketing-channels-api.service';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Title } from '@angular/platform-browser';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
@Component({
  selector: 'app-marketingchannel',
  templateUrl: './marketingchannel.component.html',
  styleUrls: ['./marketingchannel.component.scss']
})
export class MarketingchannelComponent implements OnInit {
  language: any;
  languageSubject: any;
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
  validMailchimpToken = false;
  validHubspotToken = false;
  validFacebookToken = false;
  validConstantToken = false;
  mailchimpStatus = 'Not Configured';
  facebookStatus = 'Not Configured';
  hubspotStatus = 'Not Configured';
  constantStatus = 'Not Configured';
  getCampaignChannelListApiSubject: any;
  campaignChannelsDataArray: any;
  selectedChannelList: any;
  mobileNotificationCount: any
  mailchimpNotifCount: any
  hubspotNotifCount: any
  facebookNotifCount: any;
  constantNotifCount: any;
  mailchimpError: boolean = false;
  mailchimpErrorMsg: string = "";
  facebookError: boolean = false;
  faceerror: boolean = false;
  facebookErrorMsg: string = ""
  hubspotError: boolean = false;
  hubspotErrorMsg: string = ""
  constantError: boolean = false;
  constantErrorMsg: string = ""
  commandIQError: boolean = false;
  hasScope: boolean = false
  commandIQErrorMsg: string = ""
  val_hub: boolean = false
  menus:any=[]
  scopes: any;
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private titleService: Title,
    private marketingHomeApiService: MarketingHomeApiService,
    private marketingCommonService: MarketingCommonService,
    private marketingChannelsApiService: MarketingChannelsApiService) {

      this.scopeAsssiner()

  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  ngOnInit(): void {
    
 
  
    if ((this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else if ((!this.scopes.campaignRead && this.scopes.campaignWrite)) {
      this.hasScope = true
    } else {
      this.hasScope = false
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Marketing_Channels"]}-${this.language["Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      if (this.mailchimpStatus == 'Inactive' || this.mailchimpStatus == 'Inactif' || this.mailchimpStatus == 'Inactivo') {
        this.mailchimpStatus = 'Inactive';
      }
      if (this.hubspotStatus == 'Inactive' || this.hubspotStatus == 'Inactif' || this.hubspotStatus == 'Inactivo') {
        this.hubspotStatus = 'Inactive';
      }
      if (this.facebookStatus == 'Inactive' || this.facebookStatus == 'Inactif' || this.facebookStatus == 'Inactivo') {
        this.facebookStatus = 'Inactive';
      }
      if (this.constantStatus == 'Inactive' || this.constantStatus == 'Inactif' || this.constantStatus == 'Inactivo') {
        this.constantStatus = 'Inactive';
      }
    });
    this.titleService.setTitle(`${this.language["Marketing_Channels"]}-${this.language["Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.clientId = environment.MAILCHIMP_CLIENT_ID;
    this.clientSecret = environment.MAILCHIMP_CLIENT_SECRET;
    this.serviceUrl = `${WindowRefService.prototype.nativeWindow}/marketing/channels/config`;
    this.getCampaignChannelListApiLoader()
    this.getMrktngChnlFaceAuth();
    this.getConstantChnlAuth();
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (this.code) {
        this.getMailChimpToken();
        this.getHubspotToken();
      } else {
        this.getMrktngChnlAuth();
        this.getMrktngChnlHubSpotAuth();
      }

    });
  }


  getMailChimpToken(): any {
    let params = {
      "channelName": "Mailchimp",
      "orgId": this.sso.getOrgId(),
      "key": this.code
    };


    this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active') {
          this.validMailchimpToken = true;
          this.sso.setValidMailChimpAuth(true);
        } else {
          this.sso.setValidMailChimpAuth(false);
        }

        this.mailchimpStatus = json.status;
      }

      this.loading = false;

      this.router.navigate(['/engagement/channels/config']);
      // this.accessToken = json.access_token;
      // this.serverPrefix = json.dc

    }, (error: any) => {
      this.loading = false;


    });
  }


  getCampaignChannelListApiLoader() {

    this.getCampaignChannelListApiSubject =
      this.marketingChannelsApiService.MarketingChannelsListGET()
        .subscribe((res: any) => {
          if (res) {
            this.campaignChannelsDataArray = res[0];
            this.mobileNotificationCount = this.sumOff(this.campaignChannelsDataArray.completedCampaigns,
              this.campaignChannelsDataArray.inprogressCampaigns, this.campaignChannelsDataArray.scheduleCampaigns)
            this.selectedChannelList = res[1]
            this.mailchimpNotifCount = this.sumOff(this.selectedChannelList.completedCampaigns,
              this.selectedChannelList.inprogressCampaigns, this.selectedChannelList.scheduleCampaigns)
            for (var i = 0; i < res.length; i++) {
              if (res[i].marketingChannel.toLowerCase() == 'mailchimp') {
                this.mailchimpNotifCount = this.sumOff(res[i].completedCampaigns,
                  res[i].inprogressCampaigns, res[i].scheduleCampaigns)
              } else if (res[i].marketingChannel.toLowerCase() == 'mobile notification') {
                this.mobileNotificationCount = this.sumOff(res[i].completedCampaigns,
                  res[i].inprogressCampaigns, res[i].scheduleCampaigns)
              } else if (res[i].marketingChannel.toLowerCase() == 'facebook') {
                this.facebookNotifCount = this.sumOff(res[i].completedCampaigns,
                  res[i].inprogressCampaigns, res[i].scheduleCampaigns)
              } else if (res[i].marketingChannel.toLowerCase() == 'hubspot') {
                this.hubspotNotifCount = this.sumOff(res[i].completedCampaigns,
                  res[i].inprogressCampaigns, res[i].scheduleCampaigns)
              } else if (res[i].marketingChannel.toLowerCase() == 'constantcontact') {
                this.constantNotifCount = this.sumOff(res[i].completedCampaigns,
                  res[i].inprogressCampaigns, res[i].scheduleCampaigns)
                console.log(this.constantNotifCount, 'this.constantNotifCount')
              }
            }

          } else {

          }

        }, (error) => {
          this.loading = false;
          // if (error.status === 404) {
          //   this.mailchimpStatus = 'Inactive';
          // }
          //else
          if (error.status == 504 || error.status == 502) {
            this.commandIQError = true;
            this.commandIQErrorMsg = this.language.timeoutErrorError;
            return;
          }
          else if (error.status == 400) {
            this.commandIQError = true;
            if (error.error) {
              return error.error
            } else {
              this.commandIQErrorMsg = this.language.errorOccured;
              return;
            }
          }
          else if (error.status == 401) {
            this.commandIQError = true;
            this.commandIQErrorMsg = this.language['Access Denied'];
          }
          else if (error.status == 500) {
            this.commandIQError = true;
            this.commandIQErrorMsg = this.language.internalServerError;
            return;
          }
          else {
            this.commandIQError = true;
            if (error.error && error.error.errorDesc) {
              this.commandIQErrorMsg = `${error.error.errorDesc}`;
            } else if (error.error && error.error.message) {
              this.commandIQErrorMsg = `${error.error.message}`;
            } else {
              this.commandIQErrorMsg = `${error.message}`;
            }
          }
        })

  }
  sumOff(completedCampaigns, inprogressCampaigns, scheduleCampaigns) {
    let val = completedCampaigns + inprogressCampaigns + scheduleCampaigns
    return val
  }
  getMrktngChnlAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/Mailchimp`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validMailchimpToken = true;
          this.sso.setValidMailChimpAuth(true);
          this.mailchimpStatus = "Active";
        } else {
          if (json['status'].toLowerCase() === 'failed') {
            this.mailchimpStatus = "Connection Error";
          } else if (json['status'] === 'Channel Unknown') {
            this.mailchimpStatus = 'Inactive';
          }
          this.sso.setValidMailChimpAuth(false);
        }
      }
      this.loading = false;

    }, (error: any) => {
      this.loading = false;
      if (error.status === 404) {
        this.mailchimpStatus = 'Inactive';
      }
      else if (error.status == 504 || error.status == 502) {
        this.mailchimpError = true;
        this.mailchimpErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else if (error.status == 400) {
        this.mailchimpError = true;
        if (error.error) {
          return error.error
        } else {
          this.mailchimpErrorMsg = this.language.errorOccured;
          return;
        }
      }
      else if (error.status == 401) {
        this.mailchimpError = true;
        this.mailchimpErrorMsg = this.language['Access Denied'];
      }
      else if (error.status == 500) {
        this.mailchimpError = true;
        this.mailchimpErrorMsg = this.language.internalServerError;
        return;
      }
      else {
        this.mailchimpError = true;
        if (error.error && error.error.errorDesc) {
          this.mailchimpErrorMsg = `${error.error.errorDesc}`;
        } else if (error.error && error.error.message) {
          this.mailchimpErrorMsg = `${error.error.message}`;
        } else {
          this.mailchimpErrorMsg = `${error.message}`;
        }
      }

    });
  }

  getMrktngChnlFaceAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/Facebook`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validFacebookToken = true;
          // this.sso.setValidMailChimpAuth(true);
          this.facebookStatus = "Active";
        } else {
          console.log(json['status'])
          if (json['status'].toLowerCase() === 'failed') {
            this.facebookStatus = "Connection Error";
          } else if (json['status'] === 'Channel Unknown') {
            this.facebookStatus = 'Inactive';
          } else if (json['status'] == 'Failed - Expired') {
            console.log(json['status'])
            this.facebookStatus = 'Failed - Expired';
          }
          //     this.sso.setValidMailChimpAuth(false);
        }
      }
      this.loading = false;

    }, (error: any) => {
      this.loading = false;
      if (error.status === 404) {
        this.facebookStatus = 'Inactive';
      } else if (error.status == 504 || error.status == 502) {
        this.facebookError = true;
        this.facebookErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else if (error.status == 400) {
        this.facebookError = true;
        if (error.error) {
          return error.error
        } else {
          this.facebookErrorMsg = this.language.errorOccured;
          return;
        }
      }
      else if (error.status == 401) {
        this.facebookError = true;
        this.facebookErrorMsg = this.language['Access Denied'];
      }
      else if (error.status == 500) {
        this.facebookError = true;
        this.facebookErrorMsg = this.language.internalServerError;
        return;
      }
      else {
        this.facebookError = true;
        if (error.error && error.error.errorDesc) {
          this.facebookErrorMsg = `${error.error.errorDesc}`;
        } else if (error.error && error.error.message) {
          this.facebookErrorMsg = `${error.error.message}`;
        } else {
          this.facebookErrorMsg = `${error.message}`;
        }
      }


    });
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.getCampaignChannelListApiSubject) {
      this.getCampaignChannelListApiSubject.unsubscribe();
    }
  }
  getHubspotToken(): any {
    let params = {
      "channelName": "HubSpot",
      "orgId": this.sso.getOrgId(),
      "key": this.code
    };
    this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active') {
          this.validHubspotToken = true;
          this.sso.setValidHubSpotAuth(true);
        } else {
          this.sso.setValidHubSpotAuth(false);
        }

        this.hubspotStatus = json.status;
      }

      this.loading = false;

      this.router.navigate(['/engagement/channels/config']);
      // this.accessToken = json.access_token;
      // this.serverPrefix = json.dc

    }, (err: any) => {
      this.loading = false;

      if (err.status === 404) {
        this.hubspotStatus = this.language.Not_Configured;
      }
    });
  }

  getMrktngChnlHubSpotAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/HubSpot`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validHubspotToken = true;
          this.sso.setValidHubSpotAuth(true);
          this.hubspotStatus = "Active";
        } else {
          if (json['status'].toLowerCase() === 'failed') {
            this.hubspotStatus = "Connection Error";
          } else if (json['status'] === 'Channel Unknown') {
            this.hubspotStatus = 'Inactive';
          }
          this.sso.setValidHubSpotAuth(false);
        }
      }
      this.loading = false;

    }, (error: any) => {
      this.loading = false;
      if (error.status === 404) {
        this.hubspotStatus = 'Inactive';
      } else if (error.status == 504 || error.status == 502) {
        this.hubspotError = true;
        this.hubspotErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else if (error.status == 400) {
        this.hubspotError = true;
        if (error.error) {
          return error.error
        } else {
          this.hubspotErrorMsg = this.language.errorOccured;
          return;
        }
      }
      else if (error.status == 401) {
        this.hubspotError = true;
        this.hubspotErrorMsg = this.language['Access Denied'];
      }
      else if (error.status == 500) {
        this.hubspotError = true;
        this.hubspotErrorMsg = this.language.internalServerError;
        return;
      }
      else {
        this.hubspotError = true;
        if (error.error && error.error.errorDesc) {
          this.hubspotErrorMsg = `${error.error.errorDesc}`;
        } else if (error.error && error.error.message) {
          this.hubspotErrorMsg = `${error.error.message}`;
        } else {
          this.hubspotErrorMsg = `${error.message}`;
        }
      }


    });
  }


  ////////////////////////////////

  getConstantChnlAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/ConstantContact`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validConstantToken = true;
          this.sso.setValidConstantAuth(true);
          this.constantStatus = "Active";
        } else {
          if (json['status'].toLowerCase() === 'failed') {
            this.constantStatus = "Connection Error";
          } else if (json['status'] === 'Channel Unknown') {
            this.constantStatus = 'Inactive';
          }
          this.sso.setValidConstantAuth(false);
        }
      }
      this.loading = false;

    }, (error: any) => {
      this.loading = false;
      if (error.status === 404) {
        this.constantStatus = 'Inactive';
      }
      else if (error.status == 504 || error.status == 502) {
        this.constantError = true;
        this.constantErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else if (error.status == 400) {
        this.constantError = true;
        if (error.error) {
          return error.error
        } else {
          this.constantErrorMsg = this.language.errorOccured;
          return;
        }
      }
      else if (error.status == 401) {
        this.constantError = true;
        this.constantErrorMsg = this.language['Access Denied'];
      }
      else if (error.status == 500) {
        this.constantError = true;
        this.constantErrorMsg = this.language.internalServerError;
        return;
      }
      else {
        this.constantError = true;
        if (error.error && error.error.errorDesc) {
          this.constantErrorMsg = `${error.error.errorDesc}`;
        } else if (error.error && error.error.message) {
          this.constantErrorMsg = `${error.error.message}`;
        } else {
          this.constantErrorMsg = `${error.message}`;
        }
      }

    });
  }



}