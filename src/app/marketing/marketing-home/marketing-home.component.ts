import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { MarketingRoutingsService } from './../shared/services/marketing-routings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingHighchartServiceService } from './marketing-highchart-service.service';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
import { MarketingHomeApiService } from './marketing-home-Apiservice';
import { HomeDataAssignerService } from './home-data-assigner-service';
import { MarketingExploreDataDownloadDataService } from '../marketing-explore-data/basic/shared/services/explore-data-download.service';
import { DownloadFileNameService } from '../marketing-explore-data/basic/shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { getHomeInsightsKPI } from '../shared/services/qlik-connection.js';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingApiService } from '../shared/services/marketing-api.sevice';
import { MarketingExploreCommonService } from './../marketing-explore-data/basic/shared/services/explore-data-common.service';
import { MarketingSegmentsApiService } from '../marketing-segments/shared/marketing-segments-api.service';
import { MarketingExploreDataAssignerService } from '../marketing-explore-data/basic/shared/services/data-assigners.service';
import { ExportDataChartOptionsService } from '../marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { MarketingCampaignDefineApiService } from '../marketing-new-campaigns/shared/services/marketing-campaign-define-api.service';

@Component({
  selector: 'app-marketing-home',
  templateUrl: './marketing-home.component.html',
  styleUrls: ['./marketing-home.component.scss'],
})
export class MarketingHomeComponent implements OnInit, OnDestroy {

  language: any;
  languageSubject: any;
  qlikOpenConnectionAppSubject: any;
  qlikTicketSubject: any;
  chartAvailable: boolean = false;

  // RPAC CONTROLLER
  scopes: any;
  insightsShow: boolean = false;
  subscriberTrendsShow: boolean = false;
  campaignsShow: boolean = false;
  segmentsShow: boolean = false;
  churnTrends: boolean = false;
  SSTTshow: boolean = false;
  socialChannelHeatmapShow: boolean = false;
  noDataRecomended: boolean = false
  noDataSaved: boolean = false
  Campaigns: boolean = true
  campaignUser: any
  recommended: boolean = true
  saved: boolean = false
  popup_heading: any
  // DATA
  topAppDataArray: any;
  savedSegmentArray: any;
  recommendedSegmentArray: any;
  segmentImageShow: boolean = false;
  recommendImageShow: boolean = false;
  campaignImageShow: boolean = false;

  campaigndataAvailable: boolean = false;
  campaignLoader: boolean = true;
  segmentCheck: boolean = false;
  segmentCheck1: boolean = false;
  //error
  subscriberTierTechDataError: boolean = false
  subscriberTierTechDataErrorMsg: any
  topAppDataError: boolean = false
  topAppDataErrorMsg: any
  churnTrendsDataError: boolean = false
  churnTrendsErrorMsg: any

  // NORMAL VIEW
  subscriberTierTechSubject: any;
  topAppSubject: any;
  acquisitionTrendsSubject: any
  churnTrendssSubject: any
  campaignListSubject: any
  savedSegmentSubject: any;
  recommendedSegmentSubject: any;

  subscriberTierTechDataAvailable: boolean = false
  topAppDataAvailable: boolean = false;
  dataAvailable: boolean = false;
  acquisitionTrendsDataAvailable: boolean = false;
  churnTrendsDataAvailable: boolean = false;
  qlickDataAvailable: boolean = false
  campaignDataAvailable: boolean = false;
  fullScreenChart: any
  inSightErrorMsg: string = "";
  inSightError: boolean = false;
//Ts
AllSubscriberDataTs: any
gamerDataTs: any
streamerDataTs: any
workFromHomeDataTs: any
acquisitionRateDataTs: any
chumRateDataTs: any
ARPUDataTs: any
NewSubsPerDayDataTs: any
AllSubscriberDataPercentTs: any
subsciberPercentValueIsZeroTs: any;
streamerPercentValueIsZeroTs: any;
gamerPercentValueIsZeroTs: any;
wfhPercentValueIsZeroTs: any;
acquisitionPercentValueIsZeroTs: any;
churnPercentValueIsZeroTs: any;
ARPUDataPercentValueIsZeroTs: any;
gamerDataPercentTs: any
streamerDataPercentTs: any
workFromHomeDataPercentTs: any
acquisitionRateDataPercentTs: any
chumRateDataPercentTs: any
ARPUDataPercentTs: any
NewSubsPerDayDataPercentTs: any

  //QlickData
  AllSubscriberData: any
  gamerData: any
  streamerData: any
  workFromHomeData: any
  acquisitionRateData: any
  chumRateData: any
  ARPUData: any
  NewSubsPerDayData: any
  AllSubscriberDataPercent: any
  subsciberPercentValueIsZero: any;
  streamerPercentValueIsZero: any;
  gamerPercentValueIsZero: any;
  wfhPercentValueIsZero: any;
  acquisitionPercentValueIsZero: any;
  churnPercentValueIsZero: any;
  ARPUDataPercentValueIsZero: any;
  homeacquisitionsError: boolean = false;
  homeacquisitionsErrorMsg: string;
  gamerDataPercent: any
  streamerDataPercent: any
  workFromHomeDataPercent: any
  acquisitionRateDataPercent: any
  chumRateDataPercent: any
  ARPUDataPercent: any
  NewSubsPerDayDataPercent: any
  marketingCampaignTable: any = []
  //Qlick success error check
  AllSubscriberDataSuccess: boolean
  gamerDataSuccess: boolean
  streamerDataSuccess: boolean
  workFromHomeDataSuccess: boolean
  acquisitionRateDataSuccess: boolean
  churnRateDataSuccess: boolean
  ARPUDataSuccess: boolean
  NewSubsPerDayDataSuccess: boolean

  AllSubscriberDataSuccessTs: boolean
  gamerDataSuccessTs: boolean
  streamerDataSuccessTs: boolean
  workFromHomeDataSuccessTs: boolean
  acquisitionRateDataSuccessTs: boolean
  churnRateDataSuccessTs: boolean
  ARPUDataSuccessTs: boolean
  NewSubsPerDayDataSuccessTs: boolean
  //error
  recomendedLoader: boolean = true;
  savedLoader: boolean = true;

  savedErrorMsg: any;
  savedError: boolean = false;
  recomendedError: any
  recomendedErrorMsg: string;
  campaignError: boolean = false;
  campaignErrorMsg: any;
  loading: boolean = true;
  //heat Map
  socialHeatMapDataError: boolean = false;
  socialChannelSelected: any
  socialChannels: any;
  socialchannelListSubject: any;
  socialHeatMapSubject: any;
  exportMenuAvailable: boolean = false;
  socialHeatMapDataErrorMsg: any;
  socialHeatMapDataAvailable: boolean = false;
  facebookError: boolean = false;
  hubspotError: boolean = false;
  mailchimpError: boolean = false;
  constantError: boolean = false;
  faceError: boolean = true;
  facebookexpired: boolean = false;
  internalProd: any
  salesUser: any
  ticketId: any
  ticketIdUser: any
  //thoughtspot
  thoughtSpotInsights: any = [];
  thoughtSpotLoading = true;
  thoughtSpotError = '';
  qlikError = '';
  math = Math;
  insightTS: boolean = false
  CMCType
  iscmc: boolean = false
  isThoughspotAvailable : boolean = false
  @ViewChild('serviceChartModal', { static: true }) private serviceChartModal: TemplateRef<any>;
  @ViewChild('applicationTopAppChartModal', { static: true }) private applicationTopAppChartModal: TemplateRef<any>;
  @ViewChild('acquisationTrendsModal', { static: true }) private acquisationTrendsModal: TemplateRef<any>;
  @ViewChild('churnTrendsModal', { static: true }) private churnTrendsModal: TemplateRef<any>;
  constructor(private marketingHomeChartServiceService: MarketingHighchartServiceService, private marketingRoutingsService: MarketingRoutingsService, private dialogService: NgbModal,
    private translateService: TranslateService,
    private marketingHomeApiService: MarketingHomeApiService,
    private homeDataAssignerService: HomeDataAssignerService,
    private marketingExploreDataDownloadDataService: MarketingExploreDataDownloadDataService,
    private downloadFileNameService: DownloadFileNameService,
    private exportExcelService: ExportExcelService,
    private sso: SsoAuthService,
    private marketingApiService: MarketingApiService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private marketingSegmentsApiService: MarketingSegmentsApiService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title,
    private marketingCampaignDefineApiService: MarketingCampaignDefineApiService,

  ) {

    this.internalProd = WindowRefService.prototype.nativeWindow.includes('internal-calixcloud.calix.com') ? true : false
    this.scopeAsssiner();
    this.getSegmentsTrigger();
  }

  ngOnInit(): void {

    
    this.salesUser = localStorage.getItem('salesuser')
    let entitlement = this.sso.getEntitlements();
    this.iscmc= entitlement['209'] ? true :false
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.campaignChannelList()
      this.baseApiLoader()
      this.titleService.setTitle(`${this.language["Home"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    });
    this.titleService.setTitle(`${this.language["Home"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    if(this.internalProd){
     if(this.iscmc){
      //TS function CMC Plus users
        this.qlikTicketURL()
        this.isThoughspotAvailable = true
     }else{
      // Qlik function CMC users
      sessionStorage.setItem('TSAVAIL','false') 
      this.isThoughspotAvailable = false
      this.getQlikDataValue()
     }
    }else{
   // if(this.iscmc){
       this.checkTSStatus()
    // }else{
    //   sessionStorage.setItem('TSAVAIL','false') 
    //   this.getQlikDataValue()
    // }
  }
     

    this.campaignChannelList()
    this.baseApiLoader()
    this.connectionList('Facebook')
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }

  checkTSStatus(){
   this.marketingHomeApiService.thoughtSpotStatusCheckGET().subscribe((res: any) => {
    if(res){
    this.isThoughspotAvailable = res.thoughtspotSupported  == true ? true : false
    this.setTsAvailable()
    if((this.isThoughspotAvailable && this.iscmc) || (this.isThoughspotAvailable && !this.iscmc)){
       this.qlikTicketURL()
    }else{
      this.getQlikDataValue() 
    }
    }
   },(error: any) => {
    this.isThoughspotAvailable = false
    this.setTsAvailable()
    if((!this.isThoughspotAvailable && !this.iscmc) || (!this.isThoughspotAvailable && this.iscmc)){
    this.getQlikDataValue() 
    }
  })
  }
setTsAvailable(){
  this.isThoughspotAvailable ? sessionStorage.setItem('TSAVAIL','true') : sessionStorage.setItem('TSAVAIL','false');
}
  campaignChannelList() {
    if (this.scopes.campaignRead) {
      let lang = this.language.fileLanguage == 'fr' ? 2 : this.language.fileLanguage == 'es' ? 3 : this.language.fileLanguage == 'de_DE' ? 4 : 1
      this.campaignListSubject = this.marketingHomeApiService.CampaignsListGET(lang).subscribe((res: any) => {
        this.campaignError = false;
        if (Array.isArray(res)) {

          this.marketingCampaignTable = this.marketingExploreCommonService.arraySlicer(res, 1, 5);
          this.campaigndataAvailable = true;
          this.campaignLoader = false;
          this.campaignImageShow = false;
        } else {
          this.marketingCampaignTable = []
          this.campaigndataAvailable = false;
          this.campaignLoader = false;
          this.campaignImageShow = true;
        }

      },
        (error: any) => {
          // if (error.status === 204) {
          this.campaignError = true;
          this.campaignErrorMsg = this.marketingCommonService.errorHandling(error)
          this.marketingCampaignTable = []
          this.campaigndataAvailable = false;
          this.campaignLoader = false;

          // }
        });
    }
  }
  close() {
    this.faceError = false
  }
  connectionList(value) {

    this.marketingHomeApiService.connectcheck(value).subscribe((res: any) => {
      if (res) {
        this.facebookError = res.unReportedChannelExpiredStatus
      }

    });

  }

  selectCampaign(data) {
    let datas = data.campaignType == 'Triggered' ? sessionStorage.setItem('triggered','new'): sessionStorage.removeItem('triggered')
    let fromData = data.status == this.language.Active ? sessionStorage.setItem('StatusAct','Active'): sessionStorage.removeItem('StatusAct')
    this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
  }
  selectSegments(data) {
    let segmentCheck:boolean = false
    if(data.segmentType == 'Upload'){
      let name = data.segmentName
      let segmentname = name.substring(name.lastIndexOf("_")+1)
      segmentCheck = segmentname == 'Prospects' ? true : false
    }
    this.marketingRoutingsService.exploreDataPage(data.segmentId, data.segmentType ,segmentCheck)
    sessionStorage.setItem('explore','0')
  }
  socialChannelListApiLoader() {
    this.socialchannelListSubject = this.marketingHomeApiService.SocialChannelAppList()
      .subscribe((res: any) => {
        if (res.length > 0 && res != undefined) {
          this.socialChannels = this.marketingExploreDataAssignerService.socialChannelsListDataFormatter(res);
          //let periviousSelection = sessionStorage.getItem('socialChannel');
          if (this.socialChannels.length > 0) {
            this.socialChannelSelected = this.socialChannels[0].name
          }
          this.socialHeatMapApiLoader();
        } else {
          this.socialHeatMapDataError = true;
          this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
        }
      }, (error: any) => {
        this.socialHeatMapDataError = true;
        this.socialHeatMapDataErrorMsg = this.marketingCommonService.errorHandling(error);
      })
  }
  getQlikDataValue() {
    this.qlikOpenConnectionAppSubject = this.marketingApiService.qlikOpenConnectionApp.subscribe((app: any) => {
      this.loading = false;
      this.getInsightsKPISnippetTrigger();
    }, (error: any) => {
      this.loading = false;
      this.qlickDataAvailable = false;
      this.inSightError = true;
      this.inSightErrorMsg = this.marketingCommonService.errorHandling(error)
    })
    if (this.marketingApiService.getQlikConnectedApp()) {
      this.getInsightsKPISnippetTrigger();
    } else {
      this.loading = false;
      //this.inSightError = true;
      //if(this.language){
      //this.inSightErrorMsg =this.language.internalServerError
      // }
    }
  }
  getInsightsKPISnippetTrigger() {
    this.qlickDataAvailable = false;
    this.loading = false;
    let app = this.marketingApiService.getQlikConnectedApp();
    console.log("5.Getting_Kpi_Data", new Date())
    if (app) {
      if (this.scopes.exploredataRead) {
        getHomeInsightsKPI(app).then(res => {
          this.loading = false;
          console.log('6.Kpi_Data_response', res, new Date())
          this.qlickDataAvailable = true
          let qlickResponse = res
          this.inSightError = false;
          this.AllSubscriberData = qlickResponse.All_Subscribers

          this.gamerData = qlickResponse.Gaming_Subscribers
          this.streamerData = qlickResponse.Streaming_Subscribers
          this.workFromHomeData = qlickResponse.Work_From_Home_Subscribers
          this.acquisitionRateData = qlickResponse.Acquisition_Rate
          this.chumRateData = qlickResponse.Churn_Rate
          this.ARPUData = qlickResponse.ARPU
          this.NewSubsPerDayData = qlickResponse.New_Subscribers_Per_Day.replaceAll(',', '')
          this.AllSubscriberDataSuccess = this.checkPositvNegativ(qlickResponse.All_Subscribers_Percentage) == '+' ? true : false;
          this.AllSubscriberDataPercent = this.removeNegativeSign(qlickResponse.All_Subscribers_Percentage) + '%'
          this.subsciberPercentValueIsZero = (this.AllSubscriberDataPercent == '0%' || this.AllSubscriberDataPercent == '0.0%') ? true : false;

          this.gamerDataSuccess = this.checkPositvNegativ(qlickResponse.Gaming_Subscribers_Percentage) == '+' ? true : false;
          this.gamerDataPercent = this.removeNegativeSign(qlickResponse.Gaming_Subscribers_Percentage) + '%'
          this.gamerPercentValueIsZero = (this.gamerDataPercent == '0%' || this.gamerDataPercent == '0.0%') ? true : false;

          this.streamerDataSuccess = this.checkPositvNegativ(qlickResponse.Streaming_Subscribers_Percentage) == '+' ? true : false;
          this.streamerDataPercent = this.removeNegativeSign(qlickResponse.Streaming_Subscribers_Percentage) + '%'
          this.streamerPercentValueIsZero = (this.streamerDataPercent == '0%' || this.streamerDataPercent == '0.0%') ? true : false;

          this.workFromHomeDataSuccess = this.checkPositvNegativ(qlickResponse.Work_From_Home_Subscribers_Percentage) == '+' ? true : false;
          this.workFromHomeDataPercent = this.removeNegativeSign(qlickResponse.Work_From_Home_Subscribers_Percentage) + '%'
          this.wfhPercentValueIsZero = (this.workFromHomeDataPercent == '0%' || this.workFromHomeDataPercent == '0.0%') ? true : false;

          this.acquisitionRateDataSuccess = this.checkPositvNegativ(qlickResponse.Acquisition_Rate_Percentage) == '+' ? true : false;
          this.acquisitionRateDataPercent = this.removeNegativeSign(qlickResponse.Acquisition_Rate_Percentage) + '%'
          this.acquisitionPercentValueIsZero = (this.acquisitionRateDataPercent == '0%' || this.acquisitionRateDataPercent == '0.0%') ? true : false;

          this.churnRateDataSuccess = this.checkPositvNegativ(qlickResponse.Churn_Rate_Percentage) == '+' ? true : false;
          console.log(qlickResponse.Churn_Rate_Percentage, 'qlickResponse.Churn_Rate_Percentage')
          this.chumRateDataPercent = this.removeNegativeSign(qlickResponse.Churn_Rate_Percentage) + '%'
          this.churnPercentValueIsZero = (this.chumRateDataPercent == '0%' || this.chumRateDataPercent == '0.0%') ? true : false;

          this.ARPUDataSuccess = this.checkPositvNegativ(qlickResponse.ARPU_Percentage) == '+' ? true : false;
          this.ARPUDataPercent = this.removeNegativeSign(qlickResponse.ARPU_Percentage) + '%'
          this.ARPUDataPercentValueIsZero = (this.ARPUDataPercent == '0%' || this.ARPUDataPercent == '0.0%') ? true : false;

          this.NewSubsPerDayDataSuccess = this.checkPositvNegativ(qlickResponse.New_Subscribers_Per_Day_Percentage) == '+' ? true : false;
          this.NewSubsPerDayDataPercent = this.removeNegativeSign(qlickResponse.New_Subscribers_Per_Day_Percentage) + '%'
          console.log('7.Kpi_data_rendered_success', new Date())
        }, (error: any) => {
          this.loading = false;
          this.qlickDataAvailable = false;
          this.inSightError = true;
          this.inSightErrorMsg = this.marketingCommonService.errorHandling(error)
        });
      }
    }

  }
  qlikTicketURL() {
    return new Promise((resolve, reject) => {
      this.marketingHomeApiService.getTsAuthToken().subscribe((res) => {
      }, err => {
        let ticket = err.error.text ? err.error.text : '';
        if (ticket.includes("~~")) {
          var stringArray = ticket.split("~~");
          this.ticketId = stringArray[0];
          this.ticketIdUser = stringArray[1];
        } else {
          this.ticketId = ticket;
          this.ticketIdUser = '';
        }
        this.getThoughSpotInsights(this.ticketIdUser, this.ticketId);
        //if (this.ticketId) this.formFrameUrl();
        resolve(err.error.text);
        //this.getList();
      })
    })
  }
  async getThoughSpotInsights(ticketIdUser, ticketId): Promise<void> {
 
    await this.marketingApiService.getHomePageInsightsKPI(ticketIdUser, ticketId)
      .then((result) => {
        this.thoughtSpotInsights = result;
        if (Object.keys(this.thoughtSpotInsights).length) {
          this.insightTS = true
          this.AllSubscriberDataTs = this.thoughtSpotInsights.All_Subscribers

        this.gamerDataTs = this.thoughtSpotInsights.Gaming_Subscribers
        this.streamerDataTs = this.thoughtSpotInsights.Streaming_Subscribers
        this.workFromHomeDataTs = this.thoughtSpotInsights.Work_From_Home_Subscribers
        this.acquisitionRateDataTs = this.thoughtSpotInsights.Acquisition_Rate
        this.chumRateDataTs = this.thoughtSpotInsights.Churn_Rate
        this.ARPUDataTs = this.thoughtSpotInsights.ARPU
        this.NewSubsPerDayDataTs = this.thoughtSpotInsights.New_Subscribers_Per_Day
        this.AllSubscriberDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.All_Subscribers_Percentage) == '+' ? true : false;
        this.AllSubscriberDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.All_Subscribers_Percentage) + '%'
        console.log(this.AllSubscriberDataPercentTs,'AllSubscriberDataPercentTs')
        this.subsciberPercentValueIsZeroTs = (this.AllSubscriberDataPercentTs == '0%' || this.AllSubscriberDataPercentTs == '0.0%') ? true : false;
  
        this.gamerDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.Gaming_Subscribers_Percentage) == '+' ? true : false;
        this.gamerDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.Gaming_Subscribers_Percentage) + '%'
        this.gamerPercentValueIsZeroTs = (this.gamerDataPercentTs == '0%' || this.gamerDataPercentTs == '0.0%') ? true : false;
  
        this.streamerDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.Streaming_Subscribers_Percentage) == '+' ? true : false;
        this.streamerDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.Streaming_Subscribers_Percentage) + '%'
        this.streamerPercentValueIsZeroTs = (this.streamerDataPercentTs == '0%' || this.streamerDataPercentTs == '0.0%') ? true : false;
  
        this.workFromHomeDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.Work_From_Home_Subscribers_Percentage) == '+' ? true : false;
        this.workFromHomeDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.Work_From_Home_Subscribers_Percentage) + '%'
        this.wfhPercentValueIsZeroTs= (this.workFromHomeDataPercentTs == '0%' || this.workFromHomeDataPercentTs == '0.0%') ? true : false;
  
        this.acquisitionRateDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.Acquisition_Rate_Percentage) == '+' ? true : false;
        this.acquisitionRateDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.Acquisition_Rate_Percentage) + '%'
        this.acquisitionPercentValueIsZeroTs = (this.acquisitionRateDataPercentTs == '0%' || this.acquisitionRateDataPercentTs == '0.0%') ? true : false;
  
        this.churnRateDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.Churn_Rate_Percentage) == '+' ? true : false;
    
        this.chumRateDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.Churn_Rate_Percentage) + '%'
        this.churnPercentValueIsZeroTs = (this.chumRateDataPercentTs == '0%' || this.chumRateDataPercentTs == '0.0%') ? true : false;
  
        this.ARPUDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.ARPU_Percentage) == '+' ? true : false;
        this.ARPUDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.ARPU_Percentage) + '%'
        this.ARPUDataPercentValueIsZeroTs = (this.ARPUDataPercentTs == '0%' || this.ARPUDataPercentTs == '0.0%') ? true : false;
  
        this.NewSubsPerDayDataSuccessTs = this.checkPositvNegativ(this.thoughtSpotInsights.New_Subscribers_Per_Day_Percentage) == '+' ? true : false;
        this.NewSubsPerDayDataPercentTs = this.removeNegativeSign(this.thoughtSpotInsights.New_Subscribers_Per_Day_Percentage) + '%'
        } else {
          this.insightTS = false
        }
        
      //}
        this.thoughtSpotLoading = false;
      }, (error) => {
        this.thoughtSpotInsights = []
        this.thoughtSpotLoading = false;
        this.insightTS = false
        this.thoughtSpotError = this.marketingCommonService.errorHandling(error);
      })
   
  }

  errorReset() {
    this.inSightError = false;
    this.campaignError = false;
    this.inSightErrorMsg = "";
  }
  errorResetRecomended() {
    this.recomendedError = false;
    this.recomendedErrorMsg = "";

  }
  errorResetSaved() {
    this.savedError = false;
    this.savedErrorMsg = "";
  }
  getSegmentsTrigger() {
    if (this.scopes.exploredataRead) {
      this.savedSegmentSubject = this.marketingSegmentsApiService.SavedSegmentsListNotGET().subscribe((res: any) => {
        this.savedErrorMsg = undefined;
        this.savedLoader = false;
        this.savedError = false;
        if (Array.isArray(res)) {
          let entitlement = this.sso.getEntitlements();
          this.CMCType = entitlement['209'] ? 'CMC Plus' : 'CMC'
        
          if (!entitlement['209']) {
            res = res.filter(segmenttype => {
              if(segmenttype.segmentType == 'Upload'){
                let name = segmenttype.segmentName
                let segmentname = name.substring(name.lastIndexOf("_")+1)
                this.segmentCheck = segmentname == 'Prospects' ? true : false
              }
            return  segmenttype.segmentType != 'Acquisition' && !this.segmentCheck
            }
            );
          
          }
          this.savedSegmentArray = this.marketingExploreCommonService.arraySlicer(res, 1, 5);
          if(this.savedSegmentArray.length > 0){
            this.segmentImageShow = false
          }else{
            this.segmentImageShow = true
          }
        } else {
         
          this.savedSegmentArray = [];
          this.segmentImageShow = true
          this.noDataSaved = true;
        }
      }, (error) => {
        this.savedLoader = false;
        this.savedError = true;
        this.savedErrorMsg = this.marketingCommonService.errorHandling(error)
        this.savedSegmentArray = [];
        // this.noDataSaved = true;
        // this.checkSegmentsSize();
      })
      this.recommendedSegmentSubject = this.marketingSegmentsApiService.recommendedSegmentsListNotGET().subscribe((res: any) => {
        this.recomendedError = false;
        this.recomendedLoader = false;
        if (Array.isArray(res)) {
          let entitlement = this.sso.getEntitlements();
          if (!entitlement['209']) {
            res = res.filter(segmenttype => {
              if(segmenttype.segmentType == 'Upload'){
                let name = segmenttype.segmentName
                let segmentname = name.substring(name.lastIndexOf("_")+1)
                this.segmentCheck1 = segmentname == 'Prospects' ? true : false
              }
            return  segmenttype.segmentType != 'Acquisition' && !this.segmentCheck1
            }
            );
          }
          this.recommendedSegmentArray = this.marketingExploreCommonService.arraySlicer(res, 1, 5);
          if(this.recommendedSegmentArray.length > 0){
            this.recommendImageShow = false
          }else{
            this.recommendImageShow = true
          }
        } else {
         // console.log('else')
          this.recommendedSegmentArray = [];
          this.noDataRecomended = true;
          this.recommendImageShow = true
        }
        //this.checkSegmentsSize();
      },
        (error: any) => {
          this.recomendedLoader = false;
          this.recomendedError = true;
          this.recommendedSegmentArray = [];
          this.recomendedErrorMsg = this.marketingCommonService.errorHandling(error)
          // this.recommendedSegmentArray = [];
          // this.noDataRecomended = true;
          // this.checkSegmentsSize();
          // }
        });
    }
  }
  checkSegmentsSize() {
    if ((this.savedSegmentArray && this.savedSegmentArray.length == 0) && (this.recommendedSegmentArray && this.recommendedSegmentArray.length == 0)) {
      this.segmentImageShow = true;
      this.noDataRecomended = false;
      this.noDataSaved = false;
    } else {
      this.segmentImageShow = false;

    }
  }

  //check positive/negative
  checkPositvNegativ(returnqlickdata) {
    if (returnqlickdata.charAt(0) == '-') {
      if (returnqlickdata == "-0") {
        return '+';
      } else {
        return '-';
      }
    } else {
      return '+';
    }
  }
  removeNegativeSign(value) {
    return value.replace('-', '')
  }
  baseApiLoader() {
    if (this.scopes.exploredataRead) {
      this.subscriberTierTechApiLoader()
      this.socialChannelListApiLoader()
      this.acquisitionTrendsApiLoader();
      this.churnTrendsApiLoader();
    }
  }
  // BASIC API 
  subscriberTierTechApiLoader(chartName?: string, download?: boolean) {
    // SUBSCRIBER SERIVICE TIER TECH
    this.subscriberTierTechDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.subscriberTierTechSubject = this.marketingHomeApiService.SubscriberTierTech().subscribe((res: any) => {
      if (res && res.categories?.length && res.series?.length) {
        let subscriberTierTechData = res;
        subscriberTierTechData.categories = subscriberTierTechData.categories.map(item =>
          item.charAt(0) != '/' ? item.replace('/', '&#47;') : item
        );
        if (download) {
          let data = this.marketingExploreDataDownloadDataService.subscriberTierTechExportDataForming(subscriberTierTechData);
          let fname = this.downloadFileNameService.generateDownloadNameHome(this.language.home_subscriber1);
          this.exportExcelService.downLoadCSVRevenue(fname, data);
        } else {
          var that = this;
          this.marketingHomeChartServiceService.serviceTierTechnologyOptions(subscriberTierTechData).subscribe((data: any) => {
            this.subscriberTierTechDataAvailable = true;
            let chart = Highcharts.chart(chartName ? chartName : 'subscriber-tier-home-chart', data)
            this.chartAvailable = true
          })
        }
      } else {
        this.subscriberTierTechDataError = true;
        this.subscriberTierTechDataErrorMsg = this.language["No Data Available"];
      }
    },
      (error: any) => {
        this.subscriberTierTechDataError = true
        this.subscriberTierTechDataErrorMsg = this.marketingCommonService.errorHandling(error);
      });
  }

  acquisitionTrendsApiLoader(chartName?: string, download?: boolean) {
    // Aquisation
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.acquisitionTrendsSubject = this.marketingHomeApiService.AquisitionTrends().subscribe((res: any) => {
      let acquisitionTrendssData = this.homeDataAssignerService.aquisitionTrendsFormatData(res);
      this.homeacquisitionsError = false;
      if (download) {
        let data = this.marketingExploreDataDownloadDataService.acquisitionRateInsightsDataFormatter(acquisitionTrendssData, res);
        let fname = this.downloadFileNameService.generateDownloadNameHome(this.language.New_Subscribers_home_d);
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.marketingHomeChartServiceService.aquisationTrendsOption(acquisitionTrendssData).subscribe((data: any) => {
          this.acquisitionTrendsDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'home-acquisitions-chart', data)
          this.dataAvailable = true
        })
      }
    },
      (error: any) => {

        this.homeacquisitionsError = true
        this.homeacquisitionsErrorMsg = this.marketingCommonService.errorHandling(error);
      });
  }
  //
  socialHeatMapApiLoader(chartName?: string, download?: boolean) {
    this.socialHeatMapDataError = false

    if (this.socialChannelSelected) {
      this.socialHeatMapSubject = this.marketingHomeApiService.SocialHeatMap(this.socialChannelSelected).subscribe((res: any) => {
        let socialChannelHeatMapData = this.marketingExploreDataAssignerService.socialChannelDataFormatter(res)
        if (download) {
          let data = this.marketingExploreDataDownloadDataService.socialChannelMapExportDataFormatter(socialChannelHeatMapData);

          let time = this.exportDataChartOptionsService.timezoneCreator();
          let ftime = time.replace(':', '-');
          let name = this.socialChannelSelected;
          let s_name = name.replaceAll(' ', '-');
          let fname = this.downloadFileNameService.generateDownloadNameHome(`${this.language.SocialHeatMap_d}-${s_name}-${ftime}`);

          this.exportExcelService.downLoadCSVRevenue(fname, data);
        } else {
          this.exportDataChartOptionsService.SocialChannelHeatMapHomeOptions(socialChannelHeatMapData).subscribe((data: any) => {

            this.socialHeatMapDataAvailable = true;
            let chart = Highcharts.chart(chartName ? chartName : 'social-heat-map', data)
            this.dataAvailable = true
          })
        }
      },
        (error: any) => {
          this.socialHeatMapDataError = true;
          this.socialHeatMapDataErrorMsg = this.marketingCommonService.errorHandling(error);
        });
    } else {
      if (download) {
        let time = this.exportDataChartOptionsService.timezoneCreator();
        let ftime = time.replace(':', '-');
        let fname = this.downloadFileNameService.generateDownloadName(`${this.language.SocialHeatMap_d}-${ftime}`);
        this.exportExcelService.downLoadCSVRevenue(fname, []);
        this.socialHeatMapDataError = true;
        this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
      }
    }



  }
  //churn trends
  churnTrendsApiLoader(chartName?: string, download?: boolean) {
    // CHURN RATE & INSIGHTS
    this.churnTrendsDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.churnTrendssSubject = this.marketingHomeApiService.ChurnTrends().subscribe((res: any) => {
      let churnTrendsData = this.homeDataAssignerService.churnTrendsDataFormatter(res)
      if (download) {
        let data = this.marketingExploreDataDownloadDataService.churnRateInsightsDataFormatter(churnTrendsData, res);
        let fname = this.downloadFileNameService.generateDownloadNameHome(this.language.Churn_Trends_d);
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.marketingHomeChartServiceService.churnTrendsOption(churnTrendsData).subscribe((data: any) => {
          this.churnTrendsDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                tech: this.series.name,
                page: 1,
                size: 10,
              };

            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'churn-Home-Trends', data)
          this.dataAvailable = true
        })
      }

    },
      (error: any) => {
        this.churnTrendsDataError = true
        this.churnTrendsErrorMsg = this.marketingCommonService.errorHandling(error);
      });
  }

  //download
  downloadFunction(chartName) {
    this.getFullScreenChartOptions(chartName, true)
  }

  // BASIC API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    switch (chartName) {
      case this.language.Serv_Tier_Tech:
        if (download) {
          this.subscriberTierTechApiLoader(chartName, download)
        } else {
          this.subscriberTierTechApiLoader(chartName)
        }
        break;
      case this.language.SocialHeatMap:
        if (download) {
          this.socialHeatMapApiLoader(chartName, download)
        } else {
          this.socialHeatMapApiLoader(chartName)
        }
        break;

      case this.language.New_Subscribers_home:
        if (download) {
          this.acquisitionTrendsApiLoader(chartName, download)
        } else {
          this.acquisitionTrendsApiLoader(chartName)
        }
        break;

      case this.language.Churn_Trends:
        if (download) {
          this.churnTrendsApiLoader(chartName, download)
        } else {
          this.churnTrendsApiLoader(chartName)
        }
        break;
      default:
        break;
    }
  }

  segmentsTableSwitch(tabName) {
    this.recommended = tabName == 'recommended' ? true : false;
    this.saved = tabName == 'saved' ? true : false;
  }
  campaigns() {
    this.marketingRoutingsService.campaignsPage();
  }
  campaignsNewPage() {
    this.marketingRoutingsService.campaignsMarkPage();
  }
  
  newCampaign(from) {
    sessionStorage.setItem('camp_filter_change', 'new')
    if(from == 1){
    sessionStorage.removeItem('triggered')
    }else{
     sessionStorage.setItem('triggered','new')
    }
    this.marketingRoutingsService.newCampaignPage();
  }
  segments() {
    this.marketingRoutingsService.segmentsPage();
  }
  newSegments() {
    if (this.scopes.exploredataWrite) {
      this.marketingRoutingsService.exploreDataPage('segment', '',false);
      sessionStorage.setItem('explore','0')
    }
  }
  campaignAndSegmentsModalOpen(modelData) {
    this.popup_heading = modelData
    switch (modelData) {
      case this.language.SocialHeatMap:
        this.dialogService.open(this.applicationTopAppChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;

      case this.language.Serv_Tier_Tech:
        this.dialogService.open(this.serviceChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.New_Subscribers_home:
        this.dialogService.open(this.acquisationTrendsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Churn_Trends:
        this.dialogService.open(this.churnTrendsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      default:
        break;
    }
  }
  closeModal() {
    this.dialogService.dismissAll();
  }
  ngOnDestroy() {
    if (this.qlikOpenConnectionAppSubject) {
      this.qlikOpenConnectionAppSubject.unsubscribe()
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();

    }
    if (this.socialHeatMapSubject) {
      this.socialHeatMapSubject.unsubscribe();
    }
    if (this.socialchannelListSubject) {
      this.socialchannelListSubject.unsubscribe();
    }
    if (this.campaignListSubject) {
      this.campaignListSubject.unsubscribe();
    }
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe();
    }
    if (this.recommendedSegmentSubject) {
      this.recommendedSegmentSubject.unsubscribe();
    }
    if (this.subscriberTierTechSubject) {
      this.subscriberTierTechSubject.unsubscribe();
    }
    if (this.acquisitionTrendsSubject) {
      this.acquisitionTrendsSubject.unsubscribe();
    }
    if (this.churnTrendssSubject) {
      this.churnTrendssSubject.unsubscribe();
    }
  }
  // CHANGE SOCIAL CHANNELS
  selectSocialChannel(channelName) {
    this.socialChannelSelected = channelName;
    sessionStorage.setItem('socialChannel', channelName)
    this.socialHeatMapDataAvailable = false;
    this.socialHeatMapApiLoader();

  }

}
