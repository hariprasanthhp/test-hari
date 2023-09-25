import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketingCampaignsApiService {
  public baseURL = environment.API_BASE_URL;

  // CAMPAIGN APIS
  private campaign: string;
  private fileUploadAPI: string;
  private channel: string;
  private qlik: string
  private qlik_1: string
  private validateDeployCampaign$ = new BehaviorSubject(false);
  deployCampaignValidation = this.validateDeployCampaign$.asObservable();


  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
  ) {
    this.campaign = this.baseURL + 'cmc-campaigns/campaign';
    this.fileUploadAPI = this.baseURL + 's3/upload/files';
    this.channel = this.baseURL + 'cmc-campaigns';
    this.qlik = this.baseURL + 'cmc/qlik/getCreateSegment'
    this.qlik_1 = this.baseURL + 'cmc/qlik/UpdateSegment'


  }
  public CampaignsChartSeries(data) {
    return this.httpClient.get(`${this.channel}/dailyTotals/revenue/org?months=` + data)
  }
  public CampaignEventTrigger(resend,eventtype,threshold,segmentId,campaignId,segemntcategory) {
    let _campaignId = campaignId != undefined && campaignId != '' ? campaignId :''
    let _segmentId = segmentId != undefined && segmentId != '' ? segmentId :''
    return this.httpClient.get(`${this.channel}/triggered_campaign/estimate_next_audience/${eventtype}/${threshold}?segmentId=${_segmentId}&campaignId=${_campaignId}&segmentCategory=${segemntcategory}`)
    // return this.httpClient.post(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }

  public getEventTrigger() {
    return this.httpClient.get(`${this.channel}/triggered_campaign/threshold_values`)
    // return this.httpClient.post(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }
  public SubscriberChartSeries(data) {
    return this.httpClient.get(`${this.channel}/dailyTotals/subscriber/org?months=` + data)
  }
  public CampaignsChartSeries_rev(data, campaignId) {
    return this.httpClient.get(`${this.channel}/dailyTotals/revenue/campaign/${campaignId}?months=` + data)
  }
  public SubscriberChartSeries_rev(data, campaignId) {
    return this.httpClient.get(`${this.channel}/dailyTotals/subscriber/campaign/${campaignId}?months=` + data)
  }
  public CampaignsListGET(from,lang) {
    return this.httpClient.get(`${this.campaign}/campaign-list/${from}?langId=${lang}`)
  }
  public CampaignsListPopup(from,type) {
    return this.httpClient.get(`${this.campaign}/campaign-list/${from}/${type}`)
  }
  public TriggeredChartSeries_rev(data, campaignId) {
    return this.httpClient.get(`${this.channel}/dailyTotals/performance/campaign/${campaignId}?months=` + data)
  }
 
  public CampaignDetailGET(id) {
    return this.httpClient.get(`${this.campaign}/${id}`)
    // return this.httpClient.get(`${this.campaign}/${id}/${this.ssoAuthService.getUsername()}`)
  }
  public CampaignPUT(campaignData) {
    return this.httpClient.put(`${this.campaign}`, campaignData)
    // return this.httpClient.put(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }
  public CampaignPOST(campaignData) {
    return this.httpClient.post(`${this.campaign}`, campaignData)
    // return this.httpClient.post(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }
  //
  public CampaignCreate(campaignData, data) {
    return this.httpClient.post(`${this.qlik}?segmentName=${campaignData.segmentName}&segmentDescription=${campaignData.segmentDescription}`, data)
    // return this.httpClient.post(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }
  public CampaignUpdate(campaignData, data) {
    return this.httpClient.post(`${this.qlik_1}?segmentName=${campaignData.segmentName}&segmentDescription=${campaignData.segmentDescription}&segmentId=${campaignData.segmentId}`, data)
    // return this.httpClient.post(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`, campaignData)
  }
  //
  public CampaignDELETE(campaignId) {
    return this.httpClient.delete(`${this.campaign}/${campaignId}`)
    // return this.httpClient.delete(`${this.campaign}/${this.ssoAuthService.getOrgId()}/campaignId/${campaignId}`)
  }

  public CampaignPauseUnpause(campaignId,status) {
    return this.httpClient.put(`${this.campaign}/${campaignId}/status/${status}`,{})
    // return this.httpClient.delete(`${this.campaign}/${this.ssoAuthService.getOrgId()}/campaignId/${campaignId}`)
  }
  public fileUpload(formData) {
    return this.httpClient.post<any>(this.fileUploadAPI, formData);
  }
  public getDeplyValidation(value: boolean) {
    this.validateDeployCampaign$.next(value)
  }

  public SubRevChartSeries(data, campaignId) {
    return this.httpClient.get(`${this.channel}/dailyTotals/subscriber/campaign/${campaignId}?months=` + data)
  }
}
