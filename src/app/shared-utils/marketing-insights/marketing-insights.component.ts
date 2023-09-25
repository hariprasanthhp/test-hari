import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MarketingInsightsChartServiceService } from './marketing-insights-chart-service.service';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingInsightspplicationApiService } from './marketing-insights-application-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketingRoutingsService } from 'src/app/marketing/shared/services/marketing-routings.service';
import { MarketingExploreDataAssignerService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/data-assigners.service';
import { MarketingExploreDataDownloadDataService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-download.service';
import { DownloadFileNameService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/download-file-name.service';
import { ExportDataChartOptionsService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-marketing-insights',
  templateUrl: './marketing-insights.component.html',
  styleUrls: ['./marketing-insights.component.scss']
})
export class MarketingInsightsComponent implements OnInit, OnDestroy {
  public baseURL = environment.cmcBaseURL;
  Highcharts = Highcharts;
  hasWifiData: boolean = false
  // columnChartOptions: any
  language: any;
  languageSubject;
  dataAvailable: boolean = false;

  endpointId: any;
  searchNameSubject;

  ///full view
  fullScreen: boolean = false
  fullScreenChart: any

  topAppSubject: any;
  usageAppSubject: any;
  endpointIdSubject: any;
  endOptionId: any
  endOptionIdSubject: any;

  showDataTable: boolean = false
  // DATA
  topAppDataArray: any = [];

  // DATA AVAILABLITY
  topAppDataAvailable: boolean = false;
  usageByAppDataAvailable: boolean = false;



  clickData: any;
  usageByAppDrillDownExportSubject: any;

  applicationFullScreenContent: any
  applicationDownloadContent: any
  applicationCloseContent: any

  ///
  deviceWifiTrendDataAssign: any
  competitorDataAssign: any
  serviceLimitDataAssign: any
  subscriberUsageDataAssign: any

  subsUsage: any;
  searchAddress: any;
  searchName: any
  searchInsights: any
  searchpastMonthCall: any
  searchchurnRisk: any
  subscriberId: any
  searchVideo: any
  searchVoice: any
  searchServiceTier: any
  attainableRates: any
  streamingUsage: any
  gamingUsage: any
  totalUsage: any
  upsteamLimitHits: any
  downsteamLimitHits: any
  devices: any
  WiFiscore: any
  speedTest: any;
  competitorVisits: any;
  showSubscriberData: any
  showSubscriberData1: any
  scopes: any

  ///
  usageByAppDataError: boolean = false;
  usageByAppDataErrorMsg: any;
  topAppDataError: boolean = false;
  topAppDataErrorMsg: any;
  insightSubscriberError: boolean = false;
  insightSubscriberErrorMsg: any;
  insightServiceLimitError: boolean = false;
  insightServiceLimitErrorMsg: any;
  insightWiFiTrendsError: boolean = false;
  insightWiFiTrendsErrorMsg: any;
  insightCompetitorError: boolean = false;
  insightCompetitorErrorMsg: any;
  WIFICategoryDataError: boolean = false;
  WIFICategoryErrorMsg: any;
  insightSubscriberDataAvailable: boolean = false
  insightServiceLimitDataAvailable: boolean = false
  insightWiFiTrendsDataAvailable: boolean = false
  insightCompetitorDataAvailable: boolean = false
  wifiCategory: any
  wifiAppDataAvailable: boolean = false;
  searchNameDataSubject: any
  loading: boolean = false;
  inSightError: boolean = false;
  inSightErrorMsg: string = "";
  headerTitle: any
  chartTitle: any
  subchartTitle: any
  isSubscriber: boolean

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(e: BeforeUnloadEvent) {
    return this.ssoAuthService.callOutcomeBeforeUnload(e);
  }

  @HostListener('window:unload', ['$event'])
  onUnload(e: any) {
    this.ssoAuthService.callOutcomeOnUnload();
  }

  constructor(
    private httpClient: HttpClient,
    private marketingRoutingsService: MarketingRoutingsService,
    private marketingInsightsChartServiceService: MarketingInsightsChartServiceService,
    private translateService: TranslateService,
    private marketingInsightApplicationApiService: MarketingInsightspplicationApiService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
    private marketingExploreDataDownloadDataService: MarketingExploreDataDownloadDataService,
    private downloadFileNameService: DownloadFileNameService,
    private exportExcelService: ExportExcelService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title,
    private ssoAuthService: SsoAuthService,
    private router: Router,

    private marketingCommonService: MarketingCommonService,
  ) {
    if (history?.state?.isCSCResult == 'true') sessionStorage.setItem('supportInsights', 'true');
    const outcomeTime = sessionStorage.getItem('outcomeTimer');
    if (outcomeTime) sessionStorage.setItem('outcomeTimerTemp', outcomeTime);
    setTimeout(() => {
      if (sessionStorage.getItem('outcomeTimerTemp')) {
        sessionStorage.setItem('outcomeTimer', outcomeTime);
        sessionStorage.removeItem('outcomeTimerTemp');
      }
    }, 300);
    this.subscriberId = history.state?.id;
    // if (history.state?.id != "" || history.state?.id != undefined) {
    // this.marketingCommonService.setSubscriberID(history.state?.id);
    // }
    if (history.state?.value != "" || history.state?.value != undefined) {
      this.searchNameDataSubject = history.state?.value;
    } else {
      this.searchNameDataSubject = ""
    }
    console.log(this.marketingCommonService.getSubscriberID(), history.state?.id)

    if (!this.marketingCommonService.getSubscriberID()) {
      this.marketingCommonService.setSubscriberID(this.subscriberId);
      this.marketingCommonService.setSearchValue(this.searchNameDataSubject)
      this.marketingCommonService.setCSCtrueOrFalse(history.state?.isCSCResult)

    } else {

      this.subscriberId = history.state?.id ? history.state?.id : this.marketingCommonService.getSubscriberID();
      this.searchNameDataSubject = this.marketingCommonService.getSearchValue()
      history.state.isCSCResult = this.marketingCommonService.getCSCtrueOrFalse()

    }

    this.isSubscriber = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? true : false
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  ngOnInit(): void {
    if (!!history?.state?.externalUserNotAllowed) {
      document.getElementById('extUserCreateWarning').classList.remove('d-none');
    }
    this.scopeAsssiner();
    this.loadData();
    console.log(this.marketingCommonService.getCSCtrueOrFalse())
    if (this.language) {
      this.headerTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language['Service Insights'] : this.language.Marketing_Insights
      this.chartTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language.competitorcsc_insight : this.language.competitor_insight
      this.subchartTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language.Insight_speedtest : this.language.Insightcsc_speedtest
      this.getTitle()
    }

  }
  getTitle() {
    if (!this.isSubscriber) {
      this.titleService.setTitle(`${this.language["Marketing_Insights"]}- ${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    } else {
      this.titleService.setTitle(`${this.language["Service Insights"]}- ${this.language["Service"]}- ${this.language["Calix Cloud"]}`)
    }
  }
  loadData() {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.headerTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language['Service Insights'] : this.language.Marketing_Insights
      this.chartTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language.competitorcsc_insight : this.language.competitor_insight
      this.subchartTitle = this.marketingCommonService.getCSCtrueOrFalse() == 'true' ? this.language.Insight_speedtest : this.language.Insightcsc_speedtest
      this.getTitle()
      if (this.endpointId != null) {
        this.baseApiLoader()
      }
    });
    if (this.scopes.subscriberRead) {
      this.getSubscriberEndOptionId(this.subscriberId)
      this.getSubscriberSummary();
    }
  }
  ngOnDestroy() {
    sessionStorage.removeItem('supportInsights')
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.endpointIdSubject) {
      this.endpointIdSubject.unsubscribe();
    }
    if (this.usageAppSubject) {
      this.usageAppSubject.unsubscribe();
    }
    if (this.topAppSubject) {
      this.topAppSubject.unsubscribe();
    }
    this.marketingCommonService.setSubscriberID('');
    this.marketingCommonService.setSearchValue('');
    this.marketingCommonService.setCSCtrueOrFalse('')
  }

  baseApiLoader() {
    this.topAppApiLoader();
    this.usageByAppApiLoader()
    this.WIFICategoryApiLoader()
    this.commonAppApiLoader('', false)
  }
  getSubscriberEndOptionId(subscriberId) {
    this.endOptionId = this.marketingInsightApplicationApiService.SingleUser(subscriberId).subscribe((res: any) => {
      if (res && res.hasOwnProperty('endpointMappingOptions') && res.endpointMappingOptions[0]) {
        let endpointfilters = res.endpointMappingOptions.join(' ');
        this.getID(encodeURIComponent(endpointfilters))
        this.inSightError = false;
      } else {
        this.showSubscriberData1 = true;
      }
    }, (err: any) => {
      this.loading = false;

      if (err.status == 504 || err.status == 502) {
        this.inSightError = true;
        this.inSightErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else if (err.status == 500) {
        this.inSightError = true;
        this.inSightErrorMsg = this.language.internalServerError;;
        return;
      }
      else if (err.status == 400) {
        this.inSightError = true;
        if (err.error) {
          return err.error
        } else {
          this.inSightErrorMsg = this.language.errorOccured;
          return;
        }
      }
      // else if (err.error) {
      //   let errorMsg = err.error.errorDesc;
      //   this.mailchimpStatus = errorMsg ? errorMsg : err.error;
      // }


    });
  }
  errorReset() {
    this.inSightError = false;
    this.inSightErrorMsg = "";
  }
  getID(id): Promise<string> {
    return this.httpClient.get(this.baseURL +
      'search/prioritySearch/id?filter=' + id, { responseType: 'text' })
      .toPromise()
      .then((res) => {
        if (res) {
          this.showSubscriberData = true
          this.endpointId = res;
          this.baseApiLoader()
        } else {
          this.showSubscriberData1 = true
        }


        return res;
      });
  }

  getSubscriberSummary() {
    this.showDataTable = false
    this.loading = true
    this.usageAppSubject = this.marketingInsightApplicationApiService.subscribersSummaryGET(this.subscriberId).subscribe((res: any) => {
      if (res) {
        this.loading = false
        this.showDataTable = true;
        let serviceAddress = res.hasOwnProperty('serviceAddress') ? res.serviceAddress + '\n' : ''
        let email = res.hasOwnProperty('email') ? res.email + ',' : ''
        let phone = res.hasOwnProperty('phone') ? '\n' + res.phone : ''
        this.searchAddress = serviceAddress + email + phone
        this.searchName = res.name
        this.searchInsights = res.insights
        this.searchpastMonthCall = res.pastMonthCall
        this.searchchurnRisk = res.churnRisk
        // if (res.service != null && res.service.data != null) {
        //   this.searchServiceTier = res.service.data
        // } else {
        //   this.searchServiceTier = '-'
        // }
        if (res.service != null && res.service.video != null) {
          this.searchVideo = res.service.video
        } else {
          this.searchVideo = '-'
        }
        if (res.service != null && res.service.voice != null) {
          this.searchVoice = res.service.voice
        } else {
          this.searchVoice = '-'
        }
      }
    });
  }
  usageDatas: any = {};
  usageByAppApiLoader(chartName?: string, download?: boolean) {
    // USAGE BY APPLICATION
    this.usageByAppDataError = false
    this.usageAppSubject = this.marketingInsightApplicationApiService.UsageByApplication(this.endpointId).subscribe((res: any) => {
      this.usageDatas['total'] = 0;
      res.forEach((element) => {
        let current = Object.keys(element)[0]
        this.usageDatas['total'] += Number(element[current]);
        this.usageDatas = { ... this.usageDatas, [current]: element[current].toFixed(2) }
      });
      this.usageDatas['total'] = this.usageDatas['total'].toFixed(2);
      // this.usageDatas['total'] = Object.values(res).reduce((acc:any, current:any) => {
      //   return acc + current;
      // }, 0)
      let usageByAppData = this.marketingExploreDataAssignerService.usageByApplicationDataFormatter(res)
      if (download) {
        let data = this.marketingExploreDataDownloadDataService.usageByAppDataForming(usageByAppData, 'subscriber_insights');
        let fname = this.downloadFileNameService.generateDownloadName(this.language.Usage_By_Appln_insit);
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.usageByAppInsightOptions(usageByAppData).subscribe((data: any) => {
          this.usageByAppDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'pie-Usage-chart', data)
          this.dataAvailable = true
        })
      }
    },
      (error: any) => {
        this.usageByAppDataError = true
        this.usageByAppDataErrorMsg = error.error
      });
  }

  topAppApiLoader(chartName?: string, download?: boolean) {
    // Top Application 
    this.topAppDataError = false
    this.topAppSubject = this.marketingInsightApplicationApiService.TopApplications(this.endpointId).subscribe((res: any) => {
      let topAppData = this.marketingExploreDataAssignerService.topAppDataFormater(res);
      if (download) {
        let data = this.marketingExploreDataDownloadDataService.topAppDataFormatter(topAppData);
        let fname = this.downloadFileNameService.generateDownloadNameSearchPage(this.language.Top_Appln);
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.topAppDataArray = topAppData;
        this.topAppDataAvailable = true;
        this.dataAvailable = true;
      }
    },
      (error: any) => {
        this.topAppDataError = true
        this.topAppDataErrorMsg = error.error
      });
  }
  WIFICategoryApiLoader(chartName?: string, download?: boolean) {
    // USAGE BY APPLICATION
    this.WIFICategoryDataError = false
    this.wifiCategory = this.marketingInsightApplicationApiService.WifiCategory(this.endpointId).subscribe((res: any) => {
      if (res.length > 0) {
        this.hasWifiData = true
        let wifiAppData = this.marketingExploreDataAssignerService.usageByApplicationDataFormatter(res)

        if (download) {
          let data = this.marketingExploreDataDownloadDataService.WIFIDataForming(wifiAppData, 'subscriber_insights');
          let fname = this.downloadFileNameService.generateDownloadWOPeriodName(this.language.Wi_FiDeviceCategory);
          this.exportExcelService.downLoadCSVRevenue(fname, data);
        } else {
          var that = this;
          this.marketingInsightsChartServiceService.WIFIOptions(wifiAppData).subscribe((data: any) => {
            this.wifiAppDataAvailable = true;
            let chart = Highcharts.chart(chartName ? chartName : 'pie-wifi-chart', data)
            this.dataAvailable = true
          })
        }
      } else {
        this.hasWifiData = false
        this.WIFICategoryDataError = true
        this.WIFICategoryErrorMsg = this.language.nodata
      }
    },
      (error: any) => {
        this.WIFICategoryDataError = true
        this.WIFICategoryErrorMsg = error.error
      });
  }
  commonAppApiLoader(chartName?: string, download?: boolean) {
    this.subsUsage = this.marketingInsightApplicationApiService.ServiceLimit(this.endpointId).subscribe((res: any) => {
      this.serviceLimitDataAssign = this.marketingExploreDataAssignerService.serviceLimitDataAssign(res.lens)
      this.deviceWifiTrendDataAssign = this.marketingExploreDataAssignerService.deviceWifiTrendDataAssign(res.lens)
      this.competitorDataAssign = this.marketingExploreDataAssignerService.competitorDataAssign(res.lens, this.isSubscriber)
      this.subscriberUsageDataAssign = this.marketingExploreDataAssignerService.subscriberUsageDataAssign(res.lens)

      if (res.subscriber.serviceTier) {
        this.searchServiceTier = res.subscriber.serviceTier
        this.attainableRates = res.subscriber.attainableRate;
      } else {
        this.searchServiceTier = '-'
        this.attainableRates = 0;
      }
      if (this.subscriberUsageDataAssign) {
        this.totalUsage = +(this.subscriberUsageDataAssign.totals)
        this.streamingUsage = +this.subscriberUsageDataAssign.streamingTotals
        this.gamingUsage = +this.subscriberUsageDataAssign.gamingTotals
      }
      if (this.deviceWifiTrendDataAssign) {
        this.WiFiscore = Math.round(this.deviceWifiTrendDataAssign.wifiScore / this.deviceWifiTrendDataAssign.datacount)
        this.devices = Math.round(this.deviceWifiTrendDataAssign.connectDevicesCount / this.deviceWifiTrendDataAssign.datacount)
      }
      if (this.serviceLimitDataAssign) {
        this.downsteamLimitHits = this.serviceLimitDataAssign.downstreamTotals
        this.upsteamLimitHits = this.serviceLimitDataAssign.upStreamTotals
      }
      if (this.competitorDataAssign) {
        this.speedTest = this.competitorDataAssign.speedTest
        this.competitorVisits = this.competitorDataAssign.competitor
      }

      this.insightSubscriberUsageChartData(this.subscriberUsageDataAssign)
      this.insightServiceLimitChartData(this.serviceLimitDataAssign)
      this.insightWiFiTrendsChartData(this.deviceWifiTrendDataAssign)
      this.insightSubscriberCompetitorChartData(this.competitorDataAssign)

    },
      (error: any) => {
        this.insightSubscriberError = true;
        this.insightServiceLimitError = true;
        this.insightWiFiTrendsError = true;
        this.insightWiFiTrendsError = true;
        this.insightSubscriberErrorMsg = error.error
        this.insightServiceLimitErrorMsg = error.error
        this.insightCompetitorErrorMsg = error.error
        this.insightWiFiTrendsErrorMsg = error.error
      });
  }
  // exportTrends() {
  //   let devices = [];
  //   let wifi = [];
  //   let data = [];
  //   let category = this.deviceWifiTrendDataAssign.categories;
  //   let len = category.length;
  //   for (let obj of this.deviceWifiTrendDataAssign.series) {
  //     for (let key in obj) {
  //       if (obj[key] == 'Devices') {
  //         devices = obj.data;
  //       }
  //       if (obj[key] == 'Wi-Fi Score') {
  //         wifi = obj.data;
  //       }
  //     }
  //   }
  //   for (let i = 0; i < len; i++) {
  //     let obj = {};
  //     obj['MONTH'] = category[i];
  //     obj['NUMBER OF DEVICES'] = devices[i];
  //     obj['WIFI SCORE'] = wifi[i];
  //     data.push(obj);
  //   }
  //   this.exportExcelService.downLoadCSV(this.downloadFileNameService.generateDownloadNameSearchPage(this.language.deviceandwifi_d), data);
  // }

  exportTrends() {
    let devices = {};
    let wifi = {};
    let data = [];
    let category = this.deviceWifiTrendDataAssign.categories;
    let len = category.length;
    for (let obj of this.deviceWifiTrendDataAssign.series) {
      for (let key in obj) {
        if (obj[key] == this.language.Devices_1) {
          devices['name'] = 'Devices';
          devices['data'] = obj.data;
        }
        if (obj[key] == this.language.Wi_Fi_Score) {
          wifi['name'] = 'Wi- Fi Score';
          wifi['data'] = obj.data;
        }
        if (obj[key] == this.language.Wi_Fi_Score) {
          wifi['name'] = 'Wi- Fi Score';
          wifi['data'] = obj.data;
        }
      }
    }
    for (let i = 0; i < len; i++) {
      let obj = {};
      obj['MONTH'] = category[i];
      obj['NUMBER OF DEVICES'] = devices['data'][i];
      obj['WIFI SCORE'] = wifi['data'][i];
      data.push(obj);
    }
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadNameSearchPage(this.language.deviceandwifi), data);
  }


  exportCompetitorVisits() {
    let compet: any = {};
    let speed: any = {};
    let data = [];
    let category = this.competitorDataAssign.categories;
    let len = category.length;

    for (let obj of this.competitorDataAssign.series) {
      for (let key in obj) {
        if (!this.isSubscriber) {
          if (obj['name'] == this.language.Competitor_Visits_1) {
            compet['data'] = obj.data;
          }
        }
        if (obj['name'] == this.language.Speed_Tests_1) {
          speed['data'] = obj.data;
        }
      }
    }

    for (let i = 0; i < len; i++) {
      let obj = {};
      obj['MONTH'] = category[i];
      if (!this.isSubscriber) {
        obj['COMPETITOR WEB VISITS (MINUTES)'] = compet['data'][i];
      }
      obj['SPEED TESTS (MINUTES)'] = speed['data'][i];
      data.push(obj);
    }
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadNameSearchPage(this.chartTitle), data);
  }
  exportSubscriberUsage() {
    let chartsData = this.subscriberUsageDataAssign;
    let len = chartsData.categories.length;
    let stream = {};
    let game = {};
    let other = {};
    for (let obj of chartsData.series) {
      for (let key in obj) {
        if (obj[key] == this.language.Streaming_Usage) {
          stream['name'] = 'Streaming Usage';
          stream['data'] = obj.data;
        }
        if (obj[key] == this.language.Gaming_Usage) {
          game['name'] = 'Gaming Usage';
          game['data'] = obj.data;
        }
        if (obj[key] == this.language.Other_Usage) {
          other['name'] = 'Other Usage';
          other['data'] = obj.data;
        }
      }
    }
    let data = [];
    for (let i = 0; i < len; i++) {
      let obj = {};
      obj['MONTH'] = chartsData.categories[i];
      obj['STREAMING USAGE (GB)'] = stream['data'][i];
      obj['GAMING USAGE (GB)'] = game['data'][i];
      obj['OTHER USAGE (GB)'] = other['data'][i];
      data.push(obj);


    }
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadNameSearchPage(this.language.subscriberUsage), data);
  }

  exportServiceLimits() {
    let upStream = {};
    let downStream = {};
    let data = [];
    let category = this.serviceLimitDataAssign.categories;
    let len = category.length;
    for (let obj of this.serviceLimitDataAssign.series) {
      for (let key in obj) {
        if (obj[key] == this.language.Upstream_Limit_Hits) {
          upStream['name'] = 'Upstream Limit Hits';
          upStream['data'] = obj.data;
        }
        if (obj[key] == this.language.Downstream_Limit_Hits) {
          downStream['name'] = 'Downstream Limit Hits';
          downStream['data'] = obj.data;
        }
        if (obj[key] == this.language.Downstream_Limit_Hits) {
          downStream['name'] = ' Downstream Limit Hits';
          downStream['data'] = obj.data;
        }
      }
    }
    for (let i = 0; i < len; i++) {
      let obj = {};
      obj['MONTH'] = category[i];
      obj['UPSTREAM SERVICE LIMIT HITS'] = upStream['data'][i];
      obj['DOWNSTREAM SERVICE LIMIT HITS'] = downStream['data'][i];
      data.push(obj);
    }
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadNameSearchPage(this.language.servicelimits), data);
  }

  insightSubscriberUsageChartData(formatData) {
    this.insightSubscriberError = false
    this.marketingInsightsChartServiceService.insightSubscriberUsageOptions(formatData).subscribe((data: any) => {
      if (data) {
        this.insightSubscriberDataAvailable = true
        let chart = Highcharts.chart('subscribe-usage', data)
      }
    },
      (error: any) => {
        this.insightSubscriberError = true
        this.insightServiceLimitErrorMsg = error.error
      });
  }
  insightServiceLimitChartData(formatData) {
    this.insightServiceLimitError = false
    this.marketingInsightsChartServiceService.insightWiFiTrendsOptions(formatData).subscribe((data: any) => {
      if (data) {
        this.insightServiceLimitDataAvailable = true
        let chart = Highcharts.chart('service-limits-chart', data)
      }
    },
      (error: any) => {
        this.insightServiceLimitError = true
        this.insightServiceLimitErrorMsg = error.error
      });
  }

  insightWiFiTrendsChartData(formatData) {
    this.insightWiFiTrendsError = false
    this.marketingInsightsChartServiceService.insightWiFiTrendsOptions(formatData).subscribe((data: any) => {

      if (data) {
        this.insightWiFiTrendsDataAvailable = true
        let chart = Highcharts.chart('device-chart', data)
      }

    },
      (error: any) => {
        this.insightWiFiTrendsError = true
        this.insightWiFiTrendsErrorMsg = error.error
      });
  }

  insightSubscriberCompetitorChartData(formatData) {
    this.insightCompetitorError = false
    this.marketingInsightsChartServiceService.insightSubscriberCompetitorOptions(formatData).subscribe((data: any) => {
      if (data) {
        this.insightCompetitorDataAvailable = true
        let chart = Highcharts.chart('speed-test-chart', data)
      }
    },
      (error: any) => {
        this.insightCompetitorError = true
        this.insightCompetitorErrorMsg = error.error
      });
  }
  downloadFunction(chartName) {
    switch (chartName) {
      case this.language.Top_Appln:
        this.topAppApiLoader(chartName, true)
        break;
      case this.language.Usage_By_Appln_insit:
        this.usageByAppApiLoader(chartName, true)
        break;
      case this.language.Wi_FiDeviceCategory:
        this.WIFICategoryApiLoader(chartName, true)
        break;
      default:
        break;
    }

  }
  searchResults() {
    if (history.state?.isCSCResult == "true" || sessionStorage.supportInsights) {
      if (sessionStorage.extUserCheckModuleWise) this.router.navigate([JSON.parse(sessionStorage.extUserCheckModuleWise || '{}')?.prevUrl || '/support/overview'])
      else this.router.navigate(['/support/overview'])
    } else {
      this.marketingRoutingsService.searchResultsPage(this.searchNameDataSubject)
    }

  }

  toggleExtUserCreateWarning() {
    document.getElementById('extUserCreateWarning').classList.add('d-none');
  }

}