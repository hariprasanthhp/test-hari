import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './../shared/services/explore-data-common.service';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingExploreDataSubscriberApiService {

  public baseURL = environment.cmcBaseURL;
  language: any
  languageSubject: any

  // Normal View
  private activeSubsriber: string;
  private segmentUserSummary: string;
  private subscriberDataUsage: string;
  private streamingSubscribers: string;
  private gamingSubscribers: string;
  private wfhSubscribers: string;
  private subscriberActivityTrends: string;
  private dataUsageTrends: string;
  private devicePerHouseHold: string;

  // DRILL DOWN
  private subscriberDataUsageDrillDown: string;
  private streamingSubscribersDrillDown: string;
  private gamingSubscribersDrillDown: string;
  private wfhSubscribersDrillDown: string;
  private devicePerHouseHoldDrillDown: string;

  // DRILL DOWN EXPORT 
  private subscriberDataUsageDrillDownExport: string;
  private streamingSubscribersDrillDownExport: string;
  private gamingSubscribersDrillDownExport: string;
  private wfhSubscribersDrillDownExport: string;
  private deviceHouseholdExport: string;

  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private marketingApiService: MarketingApiService,
    private downloadFileNameService: DownloadFileNameService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.activeSubsriber = this.baseURL + 'insights/total-active-subscribers?';
    this.segmentUserSummary = this.baseURL + 'target-segmentation/user-counts?';
    this.subscriberDataUsage = this.baseURL + 'insights/total-bandwidth-consumed?'
    this.streamingSubscribers = this.baseURL + 'target-segmentation/service-tier-counts-by-user-type?';
    this.gamingSubscribers = this.baseURL + 'target-segmentation/service-tier-counts-by-user-type?';
    this.wfhSubscribers = this.baseURL + 'target-segmentation/service-tier-counts-by-user-type?';
    this.subscriberActivityTrends = this.baseURL + 'insights/subscriber-trends-by-application-group?';
    this.dataUsageTrends = this.baseURL + 'insights/total-and-streaming-usage-trend?';
    this.devicePerHouseHold = this.baseURL + 'insights/connected-device-number-distribution?';

    // DRILL DOWN
    this.subscriberDataUsageDrillDown = this.baseURL + 'insights/user-list-by-usage?';
    this.streamingSubscribersDrillDown = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.gamingSubscribersDrillDown = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.wfhSubscribersDrillDown = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.devicePerHouseHoldDrillDown = this.baseURL + 'insights/user-list-by-connected-device-number?';


    // DRILL DOWN EXPORT
    this.subscriberDataUsageDrillDownExport = this.baseURL + 'insights/user-list-by-usage?';
    this.streamingSubscribersDrillDownExport = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.gamingSubscribersDrillDownExport = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.wfhSubscribersDrillDownExport = this.baseURL + 'insights/user-list-by-tier-and-group?';
    this.deviceHouseholdExport = this.baseURL + 'insights/user-list-by-connected-device-number?';

  }
  public ActiveSubsriber() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.activeSubsriber))
  }
  getActiveSubscribersCount() {
    return sessionStorage.getItem('activeSubscribers')
  }
  public SegmentationUserSummary() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.segmentUserSummary))
  }
  public SubscriberDataUsage() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberDataUsage}categories=75-200-500-1000-2000-3000&`))
  }
  public StreamingSubscribers() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.streamingSubscribers}type=streaming&`))
  }
  public StreamingSubscribersDownload() {
    return this.marketingExploreCommonService.queryParamsAssigner(`${this.streamingSubscribers}type=streaming&`)
  }
  public GamingSubscribers() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.gamingSubscribers}type=gaming&`))
  }
  public WfhSubscribers() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.wfhSubscribers}type=wfh&`))
  }
  public SubscriberActivityTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberActivityTrends}month=6&`))
  }
  public DataUsageTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.dataUsageTrends}month=6&`))
  }
  public DevicePerHouseHold() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.devicePerHouseHold))
  }

  // DRILL DOWN
  public SubscriberDataUsageDrillDown(clickData) {
    let tier = clickData.tier.replace('+', '');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberDataUsageDrillDown}category=${tier}&page=${clickData.page}&size=${clickData.size}&refresh=true&`))
  }
  public StreamingSubscribersDrillDown(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.streamingSubscribersDrillDown}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=streaming&page=${clickData.page}&size=${clickData.size}&`))

  }
  public GamingSubscribersDrillDown(clickData) {

    let tier = clickData.tier.replace('+', '%2B');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.gamingSubscribersDrillDown}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=gaming&page=${clickData.page}&size=${clickData.size}&`))

  }
  public WfhSubscribersDrillDown(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.wfhSubscribersDrillDown}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=wfh&page=${clickData.page}&size=${clickData.size}&`))

  }
  public DevicePerHouseHoldDrillDown(clickData) {
    let tier = clickData.tier.replace('+', '');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.devicePerHouseHoldDrillDown}category=${tier}&page=${clickData.page}&size=${clickData.size}&`))

  }

  // DRILL DOWN EXPORT
  public SubscriberDataUsageDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberDataUsageDrillDownExport}category=${tier}&page=1&size=${clickData.yValue}&`))
  }
  public StreamingSubscribersDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    // let fileNameTier = clickData.tier.replace('+', '');
    let fileNameTier = clickData.tier.replace('<', 'lt');


    // let sym = '<';
    // let char = '';
    // if (clickData.tier.includes(sym)) {
    //   char = clickData.tier.replace('<', 'lt');
    // }
    // console.log(char);

    // let symbol = "LT";
    // fileNameTier = +symbol;
    // console.log(fileNameTier);

    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.streaming_subscribers}-${fileNameTier}-${clickData.tech.toLowerCase()}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.streamingSubscribersDrillDownExport}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=streaming&filename=streaming-subscribers-${fileNameTier}-streaming&`);
    return { downloadURL: downloadURL, fileName: fileName }


  }
  public GamingSubscribersDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    // let fileNameTier = clickData.tier.replace('+', '');
    let fileNameTier = clickData.tier.replace('<', 'lt');


    // let sym = '<';
    // let char = '';
    // if (clickData.tier.includes(sym)) {
    //   char = clickData.tier.replace('<', 'lt');
    // }
    // console.log(char);
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.gaming_subscribers}-${fileNameTier}-${clickData.tech.toLowerCase()}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.gamingSubscribersDrillDownExport}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=gaming&filename=gaming-subscribers-${fileNameTier}-gaming&`)
    return { downloadURL: downloadURL, fileName: fileName }

  }
  public WfhSubscribersDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    // let fileNameTier = clickData.tier.replace('+', '');
    let fileNameTier = clickData.tier.replace('<', 'lt');


    // let sym = '<';
    // let char = '';
    // if (clickData.tier.includes(sym)) {
    //   char = clickData.tier.replace('<', 'lt');
    // }
    // console.log(char);
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.work_from_home_subscribers}-${fileNameTier}-${clickData.tech.toLowerCase()}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.wfhSubscribersDrillDownExport}tier=${tier}&reverse=${this.reverseCheck(clickData)}&group=wfh&filename=wfh-subscribers-${fileNameTier}-wfh&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public DeviceHouseholdDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '');
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.devices_per_household}-${clickData.tier}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.deviceHouseholdExport}category=${tier}&filename=devices-per-household-${clickData.tier}&`)
    return { downloadURL: downloadURL, fileName: fileName }

  }
  reverseCheck(clickData) {
    return clickData.tech.includes('Non' || 'non') ? true : false
  }
}
