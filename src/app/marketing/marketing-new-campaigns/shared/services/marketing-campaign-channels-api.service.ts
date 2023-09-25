import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})
export class MarketingCampaignChannelsApiService {

  public baseURL = environment.API_BASE_URL;

  // CAMPAIGN APIS
  private campaignChannel: string;
  private campaignDetails: string;
  private campaignCSVTS: string;
  private campaignList: string;
  private audienceSync:string
  private customFieldAPI: string;
  private customFieldPost:string
  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
  ) {
    this.campaignChannel = this.baseURL + 'cmc-channel/channel';
    // https://occ-api-dev.calixcloud/campaign/occ/cmcConfig/v1/campaign
    this.campaignDetails = this.baseURL + 'cmc-campaigns/campaign';
    this.campaignCSVTS = this.baseURL + 'cmc-channel/channel/download';
    this.campaignList= this.baseURL +'cmc-campaigns/campaign/channel_list'
    this.audienceSync = this.baseURL + 'cmc-campaigns/triggered_campaign/audience'
    this.customFieldAPI = this.baseURL +'cmc-campaigns/campaign/available_fields_detail'
    this.customFieldPost = this.baseURL +'cmc-campaigns/campaign/custom_fields'
  }
  public CampaignChannelListGET() {
    return this.httpClient.get(this.campaignChannel)
  }
  public customFieldListGET() {
    return this.httpClient.get(this.customFieldAPI)
  }
  public CampaignChannelByOrgGET(id) {
    return this.httpClient.get(`${this.campaignChannel}/${id}`)
    // return this.httpClient.get(`${this.campaignChannel}/${this.ssoAuthService.getOrgId()}/${this.ssoAuthService.getUsername()}/campaign/${id}`)
  }
  public CampaignChannelPUT(data) {
    return this.httpClient.put(this.campaignChannel, data)
  }
  public CampaignChannelListPUT(id,data) {
    return this.httpClient.put(`${this.campaignList}/${id}`, data)
  }
  public CampaignChannelPOST(data) {
    return this.httpClient.post(this.campaignChannel, data)
  }
  public CampaignCustomFIeldPOST(data) {
    return this.httpClient.post(this.customFieldPost, data)
  }
  public CampaignChannelByCampaignDELETE() {
    return this.httpClient.get(this.campaignChannel)
  }
  public CampaignChannelByCampaignGET() {
    return this.httpClient.get(this.campaignChannel)
  }
  public audeinceSyncDetailGET(id) {
    return this.httpClient.get(`${this.audienceSync}/${id}`)
  }
  // public GetCampaignDetails(campaignId) {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = headers.append('Accept', 'application/json');
  //   headers = headers.append('X-Calix-AccessToken', this.ssoAuthService.getAccessToken());
  //   headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
  //   return this.httpClient.get(this.campaignDetails, { headers });
  // }
  public GetCampaignDetails(campaignId) {
    return this.httpClient.get(`${this.campaignDetails}/${campaignId}`);
  }
  public downloadCSVTS(campaignId) {
    let downloadURL =  `${this.campaignCSVTS}/${campaignId}`;
    return { downloadURL: downloadURL, fileName: campaignId }
  }
}
