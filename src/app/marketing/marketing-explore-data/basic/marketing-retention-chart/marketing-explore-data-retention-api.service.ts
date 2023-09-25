import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './../shared/services/explore-data-common.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import * as constants from '../../../shared/constants/marketing.constants'
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
@Injectable({
  providedIn: 'root'
})
export class MarketingExploreDataRetentionApiService {

  public baseURL = environment.cmcBaseURL;
  language: any
  languageSubject: any

  // BASIC API
  private churnRateInsights: string;
  private churnRisk: string;
  private churnRiskSummary: string;
  private retention: string;




  // DRILL DOWN API
  private churnRateInsightsDrillDown: string;

  // INLINE CHARTS 
  churnRateInsightsInlineCharts: string;
  // DRILL DOWN EXPORT API
  private churnRateInsightsDrillDownExport: string;
  private churnRateInsightsDrillDownHistoryExport: string;
  private churnRateInsightsDrillDownHistorySingleExport: string;
  private retentionExport: string;
  private churnRiskExport: string;

  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private downloadFileNameService: DownloadFileNameService,
    private ssoAuthService: SsoAuthService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // BASIC
    this.churnRateInsights = this.baseURL + 'insights/churn-user-count-by-month?';
    this.retention = this.baseURL + 'target-segmentation/retention-insights-report?';
    this.churnRisk = this.baseURL + 'marketing/churn-candidate?';
    this.churnRiskSummary = this.baseURL + 'marketing/churn-candidate-count?';

    // DRILL DOWN
    this.churnRateInsightsDrillDown = this.baseURL + 'insights/churn-user-report-overall?';

    // INLINE TABLE CHARTS
    this.churnRateInsightsInlineCharts = this.baseURL + 'insights/single-churn-user-history?';


    // DRILL DOWN EXPORT
    this.churnRateInsightsDrillDownExport = this.baseURL + 'insights/churn-user-report-overall?';
    this.churnRateInsightsDrillDownHistoryExport = this.baseURL + 'insights/churn-user-history?';
    this.churnRateInsightsDrillDownHistorySingleExport = this.baseURL + 'insights/single-churn-user-history?';
    this.retentionExport = this.baseURL + 'target-segmentation/retention-insights-report?';
    this.churnRiskExport = this.baseURL + 'marketing/churn-candidate?';
  }
  // BASIC
  public ChurnRateInsights() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.churnRateInsights))
  }
  public ChurnRisk() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.churnRisk}page=1&size=10&output=json&`))
  }
  public ChurnRiskSummary() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.churnRiskSummary}`) + '&output=json')
  }
  public Retention() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.retention}page=1&size=10&output=json&`))
  }
  // DRILL DOWN
  public ChurnRateInsightsDrillDown(clickData) {
    let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier)
    let tech = clickData.tech.replace('+', '%2B');
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsWithoutPeriod(`${this.churnRateInsightsDrillDown}tier=${tech}&page=${clickData.page}&size=${clickData.size}&start=${startEndDate.startDate}&end=${startEndDate.endDate}&`))

  }

  // DRILL DOWN CHARTS
  ChurnRateInsightsInlineCharts(clickData, rowDetails) {
    let newMonth: any;
    var element = clickData.tier;
    newMonth = element.split('-');
    var month = constants.monthsArray.findIndex(x => x === newMonth[0]);
    var category = parseInt(newMonth[1]) + 2000;
    var tier_data = category + "-" + month;
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.churnRateInsightsInlineCharts}endpoint-id=${rowDetails.endPointId}&churn-date=${tier_data}&`))
  }
  // DRILL DOWN EXPORT 
  public ChurnRateInsightsDrillDownExport(clickData) {
    let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier)
    let tier = clickData.tech.replace('+', '%2B');
    let fileNameTier = this.downloadFileNameService.generateReplaceSpecialChar(clickData.tech)
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.churn_rate_insights}-${clickData.tier}-${fileNameTier.toLowerCase()}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsWOPeriodAssigner(`${this.churnRateInsightsDrillDownExport}tier=${tier}&start=${startEndDate.startDate}&end=${startEndDate.endDate}&filename=churn-rate-insights-${clickData.tier}-${fileNameTier}&`)
    return { downloadURL: downloadURL, fileName: fileName }

  }
  public ChurnRateInsightsDrillDownHistoryExport(clickData) {
    let tier = clickData.tech.replace('+', '%2B');
    let fileNameTier = this.downloadFileNameService.generateReplaceSpecialChar(clickData.tech)
    let month = clickData.tier.toLowerCase();
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.churn_rate_insights}-${month}-${fileNameTier.toLowerCase()}-history`);
    let downloadURL = this.marketingExploreCommonService.queryParamsWOPeriodAssigner(`${this.churnRateInsightsDrillDownHistoryExport}tier=${tier}&file=true&filename=churn-rate-insights-${month}-${fileNameTier}-history&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  ////
  public ChurnRateInsightsDrillDownHistorySingleExport(clickData, exportData) {
    let tier = clickData.tech.replace('+', '%2B');
    let fileNameTech = exportData.data.name.replace(' ', '-');
    let fileNameTier = this.downloadFileNameService.generateReplaceSpecialChar(clickData.tech)
    let month = clickData.tier.toLowerCase();
    let newMonth: any;
    var element = clickData.tier;
    newMonth = element.split('-');
    var monthVal = constants.monthsArray.findIndex(x => x === newMonth[0]);
    var category = parseInt(newMonth[1]) + 2000;
    var tier_data = category + "-" + monthVal;
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.churn_rate_insights}-${month}-${fileNameTier.toLowerCase()}--${exportData.data.accountNumber}-${fileNameTech.toLowerCase()}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.churnRateInsightsDrillDownHistorySingleExport}endpoint-id=${exportData.endPointId}&churn-date=${tier_data}&file=true&filename=churn-rate-insights-${month}-${fileNameTier}-${exportData.data.accountNumber}-${fileNameTech.toLowerCase()}&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }

  ///


  public RetentionExport() {
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(this.language.retention_insights_report);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.retentionExport}`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public ChurnRiskExport() {
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.Churn_Risk}-${this.language.Report}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.churnRiskExport}`)
    return { downloadURL: downloadURL, fileName: fileName }
  }


}
