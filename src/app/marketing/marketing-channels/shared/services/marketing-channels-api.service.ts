import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { openQlikConnection, openApp } from '../../../shared/services/qlik-connection.js';

@Injectable({
  providedIn: 'root'
})
export class MarketingChannelsApiService {

  public baseURL = environment.API_BASE_URL;

  // CAMPAIGN APIS
  private marketingChannels: string;


  //base value
  orgId: any
  userId: any

  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
  ) {


    this.marketingChannels = this.baseURL + 'cmc-mchannel/marketingChannel';


  }
  public MarketingChannelsListGET() {
    return this.httpClient.get(`${this.marketingChannels}`)
  }
  public MarketingChannelsDetailGET() {
    return this.httpClient.get(this.marketingChannels)
  }

}
