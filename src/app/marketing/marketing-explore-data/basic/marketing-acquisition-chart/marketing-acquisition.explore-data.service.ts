import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './../shared/services/explore-data-common.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
    providedIn: 'root'
})
export class MarketingExploreDataAcquisitionApiService {
    public baseURL = environment.cmcBaseURL;
    language: any
    languageSubject: any
    // Normal View 
    private aquisitionRateInsights: string;
    private aquisitionRevenueInsights: string;
    private newSubscribersServiceTierTech: string;
    // DRILL DOWN
    private aquisitionRateInsightsDrillDown: string;
    private aquisitionRevenueInsightsDrillDown: string;
    private newSubscribersServiceTierTechDrillDown: string;

    // AQUISITION REVENUE INSIGHTS TABLE ACCORDION CHARTS
    private aquisitionRevenueServiceLimit: string;
    private aquisitionRevenueSubscriberUsage: string;
    private aquisitionRevenueDeviceTrends: string;
    private aquisitionRevenueUsageByApp: string;
    private aquisitionRevenueTopApp: string;


    // DRILL DOWN EXPORT 
    private aquisitionRateInsightsExport: string;
    private aquisitionRevenueInsightsExport: string;
    private newSubscriberServiceTierDrillDownExport: string;


    constructor(
        private httpClient: HttpClient,
        private marketingExploreCommonService: MarketingExploreCommonService,
        private downloadFileNameService: DownloadFileNameService,
        private translateService: TranslateService,
    ) {
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
        // NORMAL VIEW
        this.aquisitionRateInsights = this.baseURL + 'acquisition/acquisition-user-count-by-month?';
        this.aquisitionRevenueInsights = this.baseURL + 'acquisition/acquisition-and-potential-revenue?';
        this.newSubscribersServiceTierTech = this.baseURL + 'acquisition/new-service-tier-counts?';

        // DRILL DOWN
        this.aquisitionRateInsightsDrillDown = this.baseURL + 'acquisition/acquisition-user-report-overall?';
        this.aquisitionRevenueInsightsDrillDown = this.baseURL + 'acquisition/acquisition-user-report-overall?';
        this.newSubscribersServiceTierTechDrillDown = this.baseURL + 'acquisition/new-user-list?';

        // AQUISITION REVENUE INSIGHTS TABLE ACCORDION CHARTS
        this.aquisitionRevenueServiceLimit = this.baseURL + 'subscriber/single-subscriber-service-limit?';
        this.aquisitionRevenueSubscriberUsage = this.baseURL + 'subscriber/single-subscriber-usage?';
        this.aquisitionRevenueDeviceTrends = this.baseURL + 'subscriber/single-subscriber-device-trends?';
        this.aquisitionRevenueUsageByApp = this.baseURL + 'subscriber/single-subscriber-usage-by-app-type?';
        this.aquisitionRevenueTopApp = this.baseURL + 'subscriber/single-subscriber-top-apps?';
        // DRILL DOWN EXPORT
        this.aquisitionRateInsightsExport = this.baseURL + 'acquisition/acquisition-user-report-overall?';
        this.aquisitionRevenueInsightsExport = this.baseURL + 'acquisition/acquisition-user-report-overall?';
        this.newSubscriberServiceTierDrillDownExport = this.baseURL + 'acquisition/new-user-list?';
    }
    // NOEMAL API
    public AquisitionRateInsights() {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRateInsights}page=1&size=10&output=json&`))
    }
    public AquisitionRevenueInsights() {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.aquisitionRevenueInsights))
    }
    public NewSubscribersServiceTierTech() {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(this.newSubscribersServiceTierTech))
    }

    // DRILL DOWN API
    public AquisitionRateInsightsDrillDown(clickData) {
        let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier)
        let tech = clickData.tech.replace('+', '%2B');
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsWithoutPeriod(`${this.aquisitionRateInsightsDrillDown}tier=${tech}&page=${clickData.page}&size=${clickData.size}&start=${startEndDate.startDate}&end=${startEndDate.endDate}&`))

    }
    public AquisitionRevenueInsightsDrillDown(clickData) {
        let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier)
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsWithoutPeriod(`${this.aquisitionRevenueInsightsDrillDown}page=${clickData.page}&size=${clickData.size}&start=${startEndDate.startDate}&end=${startEndDate.endDate}&`))

    }
    public NewSubscribersServiceTierTechDrillDown(clickData) {
        let tier = clickData.tier.replace('+', '%2B');
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.newSubscribersServiceTierTechDrillDown}tier=${tier}&tech=${clickData.tech}&page=${clickData.page}&size=${clickData.size}&`))

    }
    // AQUISITION REVENUE INSIGHTS TABLE ACCORDION CHARTS
    public AquisitionRevenueServiceLimit(clickData) {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRevenueServiceLimit}endpoint-id=${clickData.endPointId}&`))
    }
    public AquisitionRevenueSubscriberUsage(clickData) {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRevenueSubscriberUsage}endpoint-id=${clickData.endPointId}&`))
    }
    public AquisitionRevenueDeviceTrends(clickData) {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRevenueDeviceTrends}endpoint-id=${clickData.endPointId}&`))
    }
    public AquisitionRevenueUsageByApp(clickData) {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRevenueUsageByApp}endpoint-id=${clickData.endPointId}&`))
    }
    public AquisitionRevenueTopApp(clickData) {
        return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.aquisitionRevenueTopApp}endpoint-id=${clickData.endPointId}&`))
    }
    // DRILL DOWN EXPORT
    public AquisitionRateInsightsDrillDownExport(clickData) {
        let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier);
        let tier = clickData.tech.replace('+', '%2B');
        // let fileNameTier = clickData.tech.replace('+', '');
        // console.log(clickData.tech, 'clickData.tech')
        let fileNameTier = this.downloadFileNameService.generateReplaceSpecialChar(clickData.tech)
        // console.log(fileNameTier, 'fileNameTier')
        let month = clickData.tier.toLowerCase();
        let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.acquisition_rate_insights}-${month}-${fileNameTier}`);
        // let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.acquisition_rate_insights}-${month}-${clickData.tech}`);
        let downloadURL = this.marketingExploreCommonService.queryParamsWOPeriodAssigner(`${this.aquisitionRateInsightsExport}tier=${tier}&start=${startEndDate.startDate}&end=${startEndDate.endDate}&file=true&filename=acquisition-rate-insights-${month}-${fileNameTier}-&`)
        return { downloadURL: downloadURL, fileName: fileName }

    }
    public AquisitionRevenueInsightsDrillDownExport(clickData) {
        let startEndDate = this.marketingExploreCommonService.monthStartEndCategoriesCreator(clickData.tier)
        let month = clickData.tier.toLowerCase();
        let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.acquisition_revenue_insights}-${month}-${this.language.Revenue}`);
        let downloadURL = this.marketingExploreCommonService.queryParamsWOPeriodAssigner(`${this.aquisitionRevenueInsightsExport}start=${startEndDate.startDate}&end=${startEndDate.endDate}&file=true&refresh&filename=acquisition-revenue-insights-${month}-revenue-&`)
        return { downloadURL: downloadURL, fileName: fileName }
    }
    public NewSubscriberServiceTierDrillDownExport(clickData) {
        let tier = clickData.tier.replace('+', '%2B');
        // let fileNameTier = clickData.tier.replace('+', '');
        let fileNameTier = clickData.tier.replace('<', 'lt');

        let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.new_subscribers_by_service_tier_technology}-${fileNameTier}-${clickData.tech}`);
        let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.newSubscriberServiceTierDrillDownExport}tier=${tier}&tech=${clickData.tech}&file=true&filename=new-subscribers-by-service-tier-technology-${fileNameTier}-${clickData.tech}&`)
        return { downloadURL: downloadURL, fileName: fileName }
    }



}
