import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './../shared/services/explore-data-common.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingExploreDataServiceApiService {
  public baseURL = environment.cmcBaseURL;
  language: any
  languageSubject: any


  // Normal View
  private subscriberTierTech: string;
  private houseHoldDeviceTrends: string;
 // private serviceModuleAdoption: string;
  private wifiDeviceTrends: string;
  private blockedThreatsInsights: string;
  private commandIQinsights: string;
  private ecoModuleAdoption: string;

  // DRILL DOWN
  private subscriberTierTechDrillDown: string;
  private blockedThreatsInsightsDrillDown: string;



  // DRILL DOWN EXPORT 
  private subscriberByServiceTierDrillDownExport: string;
  private blockedThreatsInsightsExport: string;



  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private downloadFileNameService: DownloadFileNameService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.subscriberTierTech = this.baseURL + 'target-segmentation/service-tier-counts?';
    this.houseHoldDeviceTrends = this.baseURL + 'insights/number-of-devices-and-wifiscore-trend-by-month?';
   // this.serviceModuleAdoption = this.baseURL + 'insights/parental-control-and-network-security-usage-trend?';
    this.ecoModuleAdoption = this.baseURL + 'insights/ecosystem-subscribers-usage-trend?';
    this.wifiDeviceTrends = this.baseURL + 'marketing/device-category-trend?';
    this.blockedThreatsInsights = this.baseURL + 'marketing/subscriber-protectiq-insight?';
    this.commandIQinsights = this.baseURL + 'marketing/smart-home-candidate?';

    // DRILL DOWN
    this.subscriberTierTechDrillDown = this.baseURL + 'insights/user-list?';
    this.blockedThreatsInsightsDrillDown = this.baseURL + 'marketing/protectiq-user-report-overall?';

    // DRILL DOWN EXPORT 
    this.subscriberByServiceTierDrillDownExport = this.baseURL + 'insights/user-list?';
    this.blockedThreatsInsightsExport = this.baseURL + 'marketing/protectiq-user-report-overall?';

  }

  public SubscriberTierTech(twoMonths?: any) {
    if (twoMonths) {
      let url = `${this.subscriberTierTech}org-id=${this.ssoAuthService.getOrgId()}&period=last-2m`
      return this.httpClient.get(url)
    } else {
      return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.subscriberTierTech))

    }
  }
  public HouseHoldDeviceTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.houseHoldDeviceTrends}limit=10&`))
  }
  public ServiceModuleAdoption() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.ecoModuleAdoption))
  }
  public EcoModuleAdoption() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.ecoModuleAdoption))
  }
  public WifiDeviceTrends() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.wifiDeviceTrends}month=6&`))
  }
  public BlockedThreatsInsights() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.blockedThreatsInsights))
  }
  public CommandIQinsights() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.commandIQinsights}page=1&size=10&output=json&`))
  }

  // DRILL DOWN
  public SubscriberTierTechDrillDown(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberTierTechDrillDown}tier=${tier}&tech=${clickData.tech}&page=${clickData.page}&size=${clickData.size}&`))
  }
  public BlockedThreatsInsightsDrillDown(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.blockedThreatsInsightsDrillDown}protectiqtype=${clickData.tech}&page=${clickData.page}&size=${clickData.size}&`))

  }
  // DRILL DOWN EXPORT
  public SubscriberByServiceTierDrillDownExport(clickData) {
    let tier = clickData.tier.replace('+', '%2B');
    // let fileNameTier = clickData.tier.replace('+', '');

    let fileNameTier = clickData.tier.replace('<', 'lt');

    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.subscribers_by_service_tier_technology}-${fileNameTier}-${clickData.tech}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.subscriberByServiceTierDrillDownExport}tier=${tier}&tech=${clickData.tech}&filename=subscribers-by-service-tier-technology-${fileNameTier}-${clickData.tech}&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public HouseHoldDeviceTrendsExport(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.houseHoldDeviceTrends}endpoint-id=${clickData.endPointId}&`))
  }
  public ServiceModuleAdoptionRateExport() {
    let fileName = this.downloadFileNameService.generateDownloadName(this.language.experienceiq_protectiq_report_ar);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.ecoModuleAdoption}file=true&output=csv&month=6&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public EcoModuleAdoptionRateExport() {
    let fileName = this.downloadFileNameService.generateDownloadName(this.language.ecosubscribers_report_ar);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.ecoModuleAdoption}file=true&output=csv&month=6&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public CommandIqInsightsExport() {
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(this.language.command_Chart_d);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.commandIQinsights}file=true&output=csv&`)
    return { downloadURL: downloadURL, fileName: fileName }

  }
  public BlockedThreatsInsightsDrillDownExport(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.blockedThreatsInsightsExport}protectiqtype=${clickData.tech}&page=1&size=${clickData.yValue}&`))
  }
}
