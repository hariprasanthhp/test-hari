import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './../shared/services/explore-data-common.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service'
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingExploreDataApplicationApiService {
  public baseURL = environment.cmcBaseURL;

  // Normal View 
  private usageByApp: string;
  private topApp: string;
  private topGamingApp: string;
  private socialMapAppList: string;
  private socialHeatMap: string;
  language: any
  languageSubject: any
  // DRILL DOWN
  private usageByAppDrillDown: string;
  private topAppDrillDown: string;
  private topGamingAppDrillDown: string;



  // DRILL DOWN EXPORT 
  private usageByApplicationExport: string;
  private topAppsDrillDownExport: string;
  private topGamingAppsDrillDownExport: string;

  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private downloadFileNameService: DownloadFileNameService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private dateUtilsService: DateUtilsService,

    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // NORMAL VIEW
    this.socialMapAppList = this.baseURL + 'insights/social-channel-list?';
    this.socialHeatMap = this.baseURL + 'insights/application-heatmap?';
    this.usageByApp = this.baseURL + 'insights/application-group-usage?';
    this.topApp = this.baseURL + 'insights/top-applications?';
    this.topGamingApp = this.baseURL + 'insights/top-gaming-applications?';

    // DRILL DOWN
    this.usageByAppDrillDown = this.baseURL + 'insights/app-info-by-group?';
    this.topAppDrillDown = this.baseURL + 'insights/user-count-by-app?';
    this.topGamingAppDrillDown = this.baseURL + 'insights/user-count-by-app?';
    // DRILL DOWN EXPORT
    this.usageByApplicationExport = this.baseURL + 'insights/app-info-by-group?';
    this.topAppsDrillDownExport = this.baseURL + 'insights/user-count-by-app?';
    this.topGamingAppsDrillDownExport = this.baseURL + 'insights/user-count-by-app?';
  }
  // NOEMAL API
  public UsageByApp() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.usageByApp}limit=4&others=true&`))
  }
  public TopApp() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.topApp}limit=10&`))
  }
  public TopGamingApp() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.topGamingApp}limit=10&`))
  }
  public SocialChannelAppList() {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssignerHome(`${this.socialMapAppList}timezone=${this.dateUtilsService.getOffsetInHoursAndMin()}&`))
  }
  public SocialHeatMap(socialChannelName?: any) {
    let url = `${this.socialHeatMap}social-channel-name=${socialChannelName}&timezone=${this.dateUtilsService.getOffsetInHoursAndMin()}&interval=2&`;
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(url))
  }

  // DRILL DOWN API
  public TopAppDrillDown(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.topAppDrillDown}app=${clickData.application}&page=${clickData.page}&size=${clickData.size}&`))
  }
  public TopGamingAppDrillDown(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.topGamingAppDrillDown}app=${clickData.application}&group=gaming&page=${clickData.page}&size=${clickData.size}&`))
  }
  public UsageByAppDrillDown(clickData) {
    return this.httpClient.get(this.marketingExploreCommonService.queryParamsAssigner(`${this.usageByAppDrillDown}group=${clickData.tech}&page=${clickData.page}&size=${clickData.size}&`))
  }
  // DRILL DOWN EXPORT
  public UsageByApplicationExport(clickData) {
    let tech = clickData.tech.replace(' ', '%20');
    let fileNameTech = clickData.tech.replace(' ', '-');
    var name = clickData.tech;
    var filenamechange = name.replaceAll(/,/g, "");
    var filenamechange1 = filenamechange.toLowerCase().replaceAll(' ', '-');
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.usage_by_application_type}-${filenamechange1}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.usageByApplicationExport}group=${tech}&filename=usage-by-application-type-${fileNameTech}&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public TopAppsDrillDownExport(clickData) {
    let filename = clickData.application.replace(' (', '-');
    let name = filename.replace(')', '-');
    let filename1 = name.replaceAll(' ', '-');
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.top_applications}-${filename1.toLowerCase()}-${this.language.subscribers}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.topAppsDrillDownExport}app=${clickData.application}&file=true&filename=top-applications-${clickData.application.toLowerCase()}-${this.language.subscribers}&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }
  public TopGamingAppsDrillDownExport(clickData) {
    let app = clickData.application.replace(' ', '%20')
    let attributename = clickData.application.replace(' ', '')
    let filename1 = attributename.replaceAll(' ', '-');
    let fileName = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.top_gaming_applications}-${this.marketingExploreCommonService.gamingReplacer(filename1.toLowerCase())}-${this.language.subscribers}`);
    let downloadURL = this.marketingExploreCommonService.queryParamsAssigner(`${this.topGamingAppsDrillDownExport}app=${app}&group=gaming&file=true&filename=top-gaming-applications-${this.marketingExploreCommonService.gamingReplacer(app)}-${this.language.subscribers}&`)
    return { downloadURL: downloadURL, fileName: fileName }
  }



}
