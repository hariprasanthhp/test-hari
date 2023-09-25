import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from '../marketing-explore-data/basic/shared/services/explore-data-common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';


@Injectable({
  providedIn: 'root'
})
export class MarketingHomeApiService {
  public baseURL = environment.cmcBaseURL;
  public baseURL_camp = environment.API_BASE_URL;


  // Normal View
  private subscriberTierTech: string;
  private topApp: string;
  private aquisitionRateInsights: string;
  private churnTrends: string
  private socialMapAppList: string
  private socialHeatMap: string

  private campaign: string
  private sendData: string
  private authUrl:string
  
  private thoughtspotCheck:string
  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private ssoAuthService: SsoAuthService,
    private dateUtilsService: DateUtilsService,
  ) {
    this.subscriberTierTech = this.baseURL + 'target-segmentation/service-tier-counts?';
    this.topApp = this.baseURL + 'insights/top-applications?';
    this.aquisitionRateInsights = this.baseURL + 'acquisition/acquisition-user-count-by-month?';
    this.churnTrends = this.baseURL + 'insights/churn-user-count-by-month?';
    this.socialMapAppList = this.baseURL + 'insights/social-channel-list?';
    this.campaign = this.baseURL_camp + 'cmc-campaigns/campaign';
    this.socialHeatMap = this.baseURL + 'insights/application-heatmap?';
    this.sendData = `${environment.API_BASE_URL}` + 'cmc-mchannel/marketingChannel/checkChannelTokenStatus'
    this.authUrl =this.baseURL_camp + 'cmc/thoughtspot/auth/token';
    this.thoughtspotCheck =this.baseURL_camp + 'cmc-campaigns/organizationConfig';

  }

  public SubscriberTierTech() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(this.subscriberTierTech))
  }
  public TopApp() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(`${this.topApp}limit=10&`))
  }
  public AquisitionTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(`${this.aquisitionRateInsights}page=1&size=10&output=json&`))
  }
  public ChurnTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(this.churnTrends))
  }
  public CampaignsListGET(lang) {
    return this.httpClient.get(`${this.campaign}/campaign-list?langId=${lang}`)
    // return this.httpClient.get(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`)
  }
  public connectcheck(value) {
    return this.httpClient.get(`${this.sendData}/${value}`)
    // return this.httpClient.get(`${this.campaign}/org/${this.ssoAuthService.getOrgId()}/userId/${this.ssoAuthService.getUsername()}`)
  }
  public SocialChannelAppList() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(`${this.socialMapAppList}timezone=${this.dateUtilsService.getOffsetInHoursAndMin()}&`))
  }
  public getTsAuthToken() {
    return this.httpClient.get(this.authUrl)
  }
  public thoughtSpotStatusCheckGET() {
    return this.httpClient.get(`${this.thoughtspotCheck}`)
  }
  public SocialHeatMap(socialChannelName?: any) {
    let url = `${this.socialHeatMap}social-channel-name=${socialChannelName}&timezone=${this.dateUtilsService.getOffsetInHoursAndMin()}&interval=2&`;
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(url))
  }
}
