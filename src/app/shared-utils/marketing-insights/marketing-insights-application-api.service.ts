import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingExploreCommonService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-common.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingInsightspplicationApiService {
  activeTabObject: any = {
    subscribers: true,
    campaigns: false
  };
  campaignSearchResults = new Subject<any>()
  public baseURL = environment.cmcBaseURL;
  public baseURL_summary = environment.API_BASE_URL

  private subscriberUsage: any;
  private serviceLimit: string;
  private usageByApplication: string;
  private topApplications: string;
  private subscriberSummary: string;
  private search: string;
  private singleUser: string;
  private userDetails: string;
  private campaignSearch: string;
  private wifiCategory: string;

  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private ssoAuthService: SsoAuthService,

  ) {
  //  this.search = this.baseURL + 'subscriber/search?';
  this.search = `${environment.SUPPORT_URL}/subscriber-search?`;
   // this.singleUser = this.baseURL + 'csc/subscribers/';
    this.singleUser = `${environment.SUPPORT_URL}/subscriber/`;
    this.userDetails = this.baseURL + 'search/prioritySearch/id?'
    this.subscriberSummary = this.baseURL_summary + 'csc/subscriber-summary/';
    this.subscriberUsage = this.baseURL + 'subscriber/single-subscriber-usage';
    this.serviceLimit = this.baseURL + 'subscriber/single-subscriber-insight';
    this.usageByApplication = this.baseURL + 'subscriber/single-subscriber-usage-by-app-type';
    this.topApplications = this.baseURL + 'subscriber/single-subscriber-top-apps';
    this.campaignSearch = this.baseURL_summary + 'cmc-campaigns/campaign/search';
    this.wifiCategory = this.baseURL + 'subscriber/single-subscriber-device-category-trend';
    // this.deviceWifiScoreTrend = this.baseURL + 'subscriber/single-subscriber-device-category-trend';
  }
  public Search(filterStr) {
    return this.httpClient.get(`${this.search}pageNumber=1&pageSize=10&filter=${encodeURIComponent(filterStr)}`)
  }
  public SearchResultSubscriber(filterStr, pageno) {
    return this.httpClient.get(`${this.search}pageNumber=${pageno}&pageSize=10&filter=${encodeURIComponent(filterStr)}`)
  }
  public SearchCampaign(filterStr, lang) {
    return this.httpClient.get(`${this.campaignSearch}?name=${encodeURIComponent(filterStr)}&langId=${lang}`)
  }
  public SingleUser(id) {
    return this.httpClient.get(`${this.singleUser}${id}`)
  }
  public UserDetails(id) {
    return this.httpClient.get(`${this.userDetails}filter="${id}"`)
  }
  public UsageByApplication(endpoint_id) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.usageByApplication}?endpoint-id=${endpoint_id}&month=6&`))
  }
  public TopApplications(endpoint_id) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.topApplications}?endpoint-id=${endpoint_id}&month=6&`))
  }

  public ServiceLimit(endpoint_id) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.serviceLimit}?endpoint-id=${endpoint_id}&month=6&`))
  }
  public WifiCategory(endpoint_id) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.wifiCategory}?endpoint-id=${endpoint_id}&month=6&`))
  }
  public subscribersSummaryGET(id) {
    return this.httpClient.get(`${this.subscriberSummary}${id}`)
  }
  getCustomerNameByCustomerID(id): Promise<string> {
    return this.httpClient.get(this.baseURL +
      'search/prioritySearch/id?' + 'filter="' + id, { responseType: 'text' })
      .toPromise()
      .then((res) => { console.log(res); return res; });
  }
  setResultsActiveTab(tabName) {
    this.activeTabObject['subscribers'] = tabName == 'subscribers' ? true : false;
    this.activeTabObject['campaigns'] = tabName == 'campaigns' ? true : false;
  }
  getResultsActiveTab() {
    return this.activeTabObject;
  }
  setCampaignSearchResults(data) {
    this.campaignSearchResults.next(data);
  }


  ////

}


