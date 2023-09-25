import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingExploreDataSubscriberApiService } from './marketing-explore-data-subscriberapi.service';
import { MarketingExploreDataAssignerService } from '../shared/services/data-assigners.service';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { MarketingExploreDataDownloadDataService } from '../shared/services/explore-data-download.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingExploreCommonService } from '../shared/services/explore-data-common.service';
import { MarketingExploreDataBasicApiService } from '../explore-data-basic-api.service';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Spanish as SpanishJSON } from 'src/assets/language/spanish.service';
import { German as GermanJSON } from 'src/assets/language/german.service';
import { Title } from '@angular/platform-browser';
const $: any = require('jquery');

@Component({
  selector: 'app-marketing-subscrib-chart',
  templateUrl: './marketing-subscrib-chart.component.html',
  styleUrls: ['./marketing-subscrib-chart.component.scss']
})
export class MarketingSubscribChartComponent implements OnInit, OnDestroy {

  Highcharts = Highcharts;
  language: any;
  languageSubject: any;
  popup_heading: any
  activeSubscribers: any;
  activeSubscribersForUI: any
  segmentSummary: any;

  streamingSubscribersPercentage: any;
  gamingSubscribersPercentage: any;
  wfhSubscribersPercentage: any;
  devicePerHouseholdSubscribers: any


  clickData: any;
  clickDataHighlight: any;
  chartAvailable: boolean = false;
  tableLoader: boolean = false;
  fullScreenTableAvailable: boolean = false;
  fullScreenTableDataNotAvailable: boolean = false;
  loadMoreButton: boolean = false;
  loadingBtn: boolean = false;
  //exportMenu: any;
  exportMenuAvailable: boolean = false;
  fullScreenDownload: boolean = false;




  // NORMAL VIEW
  searchFilterSubject: any;
  activeSubscribersSubject: any;
  segmentationUserSummarySubject: any;
  subscriberDataUsageSubject: any;
  streamingSubscribersSubject: any;
  gamingSubscribersSubject: any;
  WFHSubscribersSubject: any;
  dataUsageTrendsSubject: any;
  subscriberActivityTrendsSubject: any;
  devicePerHouseholdSubject: any;

  // DRILL DOWN
  subscriberDataUsageDrillDownSubject: any;
  streamingSubscribersDrillDownSubject: any;
  gamingSubscribersDrillDownSubject: any;
  WFHSubscribersDrillDownSubject: any;
  devicePerHouseHoldDrillDownSubject: any;

  // DRILL DOWN EXPORT 
  subscriberDataUsageDrillDownExportSubject: any;
  streamingSubscribersDrillDownExportSubject: any;
  gamingSubscribersDrillDownExportSubject: any;
  WFHSubscribersDrillDownExportSubject: any;
  devicePerHouseHoldDrillDownExportSubject: any;


  subscriberDataUsageDataAvailable: boolean = false;
  streamingSubscribersDataAvailable: boolean = false;
  gamingSubscribersDataAvailable: boolean = false;
  WFHSubscribersDataAvailable: boolean = false;
  dataTrendsDataAvailable: boolean = false;
  subscriberActivityDataAvailable: boolean = false;
  dataHouseholdDataAvailable: boolean = false;

  // ERROR
  subscriberDataUsageError: boolean = false;
  subscriberDataUsageErrorMsg: any;
  streamingSubscriberError: boolean = false;
  streamingSubscriberErrorMsg: any;
  gamingSubscriberError: boolean = false;
  gamingSubscriberErrorMsg: any;
  WFHSubscriberError: boolean = false;
  WFHSubscriberErrorMsg: any;
  dataTrendsError: boolean = false;
  dataTrendsErrorMsg: string;
  subscriberActivityError: boolean = false;
  subscriberActivityErrorMsg: any;
  dataHouseholdError: boolean = false;
  dataHouseholdErrorMsg: string;
  subscribechartDownloadError: any
  subscribechartDownloadErrorMsg: any
  fullScreen: boolean = false
  fullScreenChart: any

  scopes: any;
  subscriberUsage: any;
 //variables for ngtest 
  subscriberBandwidth:any;
  subscriberChartData:any;
  streamingData:any;
  streamingChartData:any;
  gamingData:any;
  gamingChartData:any;
  wfhData:any;
  wfhChartData:any;
  subscriberActivityData:any;
  subscriberActivityChartData:any;
  dataUsageTrends:any;
  dataTrendsChartData:any;
  devicehouseholddata:any;
  deviceHoldChartData:any;
  subscriberDrillData:any;
  streamingDrillData:any;
  gamingDrillData:any;
  wfhDrillData:any;









  @ViewChild('subscribChartModal', { static: true }) private subscribChartModal: TemplateRef<any>;
  @ViewChild('subscribStreamingChartModal', { static: true }) private subscribStreamingChartModal: TemplateRef<any>;
  @ViewChild('subscribGamingChartModal', { static: true }) private subscribGamingChartModal: TemplateRef<any>;
  @ViewChild('subscribWFHChartModal', { static: true }) private subscribWFHChartModal: TemplateRef<any>;
  @ViewChild('subscribActivityChartModal', { static: true }) private subscribActivityChartModal: TemplateRef<any>;
  @ViewChild('subscribDataChartModal', { static: true }) private subscribDataChartModal: TemplateRef<any>;
  @ViewChild('subscribDevicesChartModal', { static: true }) private subscribDevicesChartModal: TemplateRef<any>;

  constructor(
    private dialogService: NgbModal,
    private marketingExploreDataSubscriberApiService: MarketingExploreDataSubscriberApiService,
    private marketingExploreDataBasicApiService: MarketingExploreDataBasicApiService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private marketingExploreDataDownloadDataService: MarketingExploreDataDownloadDataService,
    private downloadFileNameService: DownloadFileNameService,
    private exportExcelService: ExportExcelService,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private translateService: TranslateService,
    private English: EnglishJSON,
    private French: FrenchJSON,
    private Spanish: SpanishJSON,
    private German: GermanJSON,
    private marketingApiService: MarketingApiService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title,


  ) {

    this.scopeAsssiner();
  }

  subsTierFullScreenContent: any;
  subsTierDownloadContent: any;
  subsTierCloseContent: any;
  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Subscribers"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.SUBS_DATA_USAGE_TITLE || chartname == this.English.data.SUBS_DATA_USAGE_TITLE || chartname == this.Spanish.data.SUBS_DATA_USAGE_TITLE || chartname == this.German.data.SUBS_DATA_USAGE_TITLE) {
          this.fullScreenChart = this.language.SUBS_DATA_USAGE_TITLE;
          this.subscribersDataUasgeApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Streaming_Title || chartname == this.English.data.Streaming_Title || chartname == this.Spanish.data.Streaming_Title || chartname == this.German.data.Streaming_Title) {
          this.fullScreenChart = this.language.Streaming_Title;
          this.streamingSubscribersApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Gaming_Title || chartname == this.English.data.Gaming_Title || chartname == this.Spanish.data.Gaming_Title || chartname == this.German.data.Gaming_Title) {
          this.fullScreenChart = this.language.Gaming_Title;
          this.gamingSubscribersApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.WFH_Title || chartname == this.English.data.WFH_Title || chartname == this.Spanish.data.WFH_Title || chartname == this.German.data.WFH_Title) {
          this.fullScreenChart = this.language.WFH_Title;
          this.WFHSubscribersApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.SubscribersActivityTrends_Title || chartname == this.English.data.SubscribersActivityTrends_Title || chartname == this.Spanish.data.SubscribersActivityTrends_Title || chartname == this.German.data.SubscribersActivityTrends_Title) {
          this.fullScreenChart = this.language.SubscribersActivityTrends_Title;
          this.subscriberActivityTrendsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.DataUsageTrends_Title || chartname == this.English.data.DataUsageTrends_Title || chartname == this.Spanish.data.DataUsageTrends_Title || chartname == this.German.data.DataUsageTrends_Title) {
          this.fullScreenChart = this.language.DataUsageTrends_Title;
          this.dataUsageTrendsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.DevicePerHousehold_Title || chartname == this.English.data.DevicePerHousehold_Title || chartname == this.Spanish.data.DevicePerHousehold_Title || chartname == this.German.data.DevicePerHousehold_Title) {
          this.fullScreenChart = this.language.DevicePerHousehold_Title;
          this.devicePerHouseHoldApiLoader(this.fullScreenChart);
        }

      }
      
      this.baseApiLoader()
    });
    this.titleService.setTitle(`${this.language["Subscribers"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);

    // FOR SEARCH FILTER
    this.searchFilterApplyCheck();
    this.apiLoaderforSubscribers().then(() => this.baseApiLoader());
  }
  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  async apiLoaderforSubscribers() {
    if (this.scopes.exploredataRead) {
      await this.activeSubcribersApiLoader();
    }
  }
  baseApiLoader() {
    if (this.scopes.exploredataRead) {
      // API LOADERS   
      this.subscribersDataUasgeApiLoader();
      this.streamingSubscribersApiLoader();
      this.gamingSubscribersApiLoader();
      this.WFHSubscribersApiLoader();
      this.dataUsageTrendsApiLoader();
      this.subscriberActivityTrendsApiLoader();
      this.devicePerHouseHoldApiLoader();
    }
  }

  searchFilterApplyCheck() {
    this.searchFilterSubject = this.marketingExploreDataBasicApiService.filerValuesSubject.subscribe(data => {
      if (data) {
        if (!this.fullScreen) {
          this.resetAllData();
          this.apiLoaderforSubscribers().then(() => this.baseApiLoader());
        } else {
          if (this.clickData) {
            this.fullScreenSearch(this.fullScreenChart, this.clickData)
          } else {
            this.fullScreenSearch(this.fullScreenChart)
          }
        }
      }
    })
  }
  // FULL SCREEN EXPAND WHILE SEARCHING
  fullScreenSearch(chartName?: any, clickData?: any) {
    this.getFullScreenChartOptions(chartName)
    this.chartAvailable = false;
    this.fullScreenTableAvailable = false;
    if (clickData) {
      clickData.page = 1;
      this.tableLoader = true;
      this.clearTableBody();
      this.fullScreenTableAvailable = false;
      this.getFullScreenTablesData(chartName, clickData)
      this.clickData = clickData;
    }
  }
  fullScreenExpandFunction(chartName?: any, clickData?: any) {
    if (!this.fullScreen) {
      this.chartAvailable = false;
      this.fullScreenTableAvailable = false;
      this.getFullScreenChartOptions(chartName)
    }
    this.fullScreen = true;
    localStorage.setItem("fullScreenChart", chartName)
    this.fullScreenChart = chartName;
    let sameClickData = JSON.stringify(this.clickData) == JSON.stringify(clickData)
    if (!sameClickData) {
      this.tableLoader = true;
      this.clearTableBody();
      this.fullScreenTableAvailable = false;
      this.getFullScreenTablesData(chartName, clickData)
    }
    this.clickData = clickData;
  }
  async activeSubcribersApiLoader() {
    const res = await this.marketingExploreDataSubscriberApiService.ActiveSubsriber().toPromise<any>();
    if (res) {
      this.activeSubscribers = res.activeSubscribers ? res.activeSubscribers : 0;
      this.activeSubscribersForUI = res.activeSubscribers ? res.activeSubscribers : 0;
      sessionStorage.setItem("activeSubscribers", JSON.stringify(this.activeSubscribers));
      this.segmentationUserSummaryApiLoader();
    }
    else {
      this.activeSubscribers = 1;
      this.activeSubscribersForUI = 0;
      sessionStorage.setItem("activeSubscribers", JSON.stringify(1));
    }
  }
  segmentationUserSummaryApiLoader() {
    this.segmentationUserSummarySubject = this.marketingExploreDataSubscriberApiService.SegmentationUserSummary().subscribe((res: any) => {
      this.segmentSummary = this.marketingExploreCommonService.objectNullHandler(res);
      this.streamingSubscribersPercentage = this.marketingExploreCommonService.valuesPercentageCalculator(+this.segmentSummary.streamingUsers, +this.marketingExploreDataSubscriberApiService.getActiveSubscribersCount(), 1)
      this.gamingSubscribersPercentage = this.marketingExploreCommonService.valuesPercentageCalculator(+this.segmentSummary.gamingUsers, +this.marketingExploreDataSubscriberApiService.getActiveSubscribersCount(), 1)
      this.wfhSubscribersPercentage = this.marketingExploreCommonService.valuesPercentageCalculator(+this.segmentSummary.wfhUsers, +this.marketingExploreDataSubscriberApiService.getActiveSubscribersCount(), 1)
    }, (error: any) => {
      this.segmentSummary = {
        streamingUsers: 0,
        gamingUsers: 0,
        wfhUsers: 0

      }
    });
  }
  subscribersDataUasgeApiLoader(chartName?: string, download?: boolean) {
    // SUBSCRIBER DATA USAGE
    this.errorReset()
    this.subscriberDataUsageError = false;
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.subscriberDataUsageSubject = this.marketingExploreDataSubscriberApiService.SubscriberDataUsage().subscribe((res: any) => {
      this.subscriberBandwidth=res;
      let subscriberDataUsageData = this.marketingExploreDataAssignerService.subscriberDataUsageDataFormatter(res)
      if (download) {
        $('#subscriberDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.subscriberDataUsageExportDataForming(subscriberDataUsageData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language?.subscriber_data_usage);
        if (this.subscriberDataUsageSubject) {
          setTimeout(() => {
            $('#subscriberDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.subscriberDataUsageOptions(subscriberDataUsageData, this.clickData).subscribe((data: any) => {
          this.subscriberChartData=data;
          this.subscriberDataUsageDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                active: this.x,
                tech: this.series.name,
                page: 1,
                size: 10,
              };

              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.SUBS_DATA_USAGE_TITLE, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'subscriber-data-usage-chart', data)
          this.chartAvailable = true

        })
      }

    },
      (error: any) => {
        if (download) {
          $('#subscriberDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.subscriberDataUsageError = true;
          this.subscriberDataUsageErrorMsg = this.marketingCommonService.errorHandling(error);
        }

      });
  }
  highlight(event) {
    if (this.fullScreen) {
      event.point = this.clickDataHighlight
    } else {
      this.clickDataHighlight = event?.point
    }
  }
  streamingSubscribersApiLoader(chartName?: string, download?: boolean) {
    // STREAMING SUBSCRIBERS
    this.errorReset()
    this.streamingSubscriberError = false;
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.streamingSubscribersSubject = this.marketingExploreDataSubscriberApiService.StreamingSubscribers().subscribe((res: any) => {
      this.streamingData=res;
      let streamingSubscribersData = res;
      streamingSubscribersData.categories = streamingSubscribersData.categories.map(item =>
        item.charAt(0) != '/' ? item.replace('/', '&#47;') : item
      );
      if (download) {
        $('#streamingDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.subscribersServiceTiersExportDataForming(streamingSubscribersData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language?.streaming_subscribers);
        if (this.streamingSubscribersSubject) {
          setTimeout(() => {
            $('#streamingDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.streamingGamingWFHSubscriberOptions(streamingSubscribersData, this.clickData).subscribe((data: any) => {
           this.streamingChartData=data;
          this.streamingSubscribersDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                tech: this.series.name,
                page: 1,
                size: 10,
                index: this.x,
                indexS: this.series.index,
              };
              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.Streaming_Title, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'streaming-subscribers-chart', data)
          this.chartAvailable = true
        })

      }

    },
      (error: any) => {
        if (download) {
          $('#streamingDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.streamingSubscriberError = true;
          this.streamingSubscriberErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  errorReset() {
    this.subscribechartDownloadError = false
    this.subscribechartDownloadErrorMsg = false
  }
  apiErrorHandling(error) {
    this.subscribechartDownloadError = true
    this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
  }
  apiDrillErrorHandling(error) {
    $('#subscriberChartDownload').removeClass('spinnershow');
    this.fullScreenDownload = false;
    this.subscribechartDownloadError = true
    this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
  }
  gamingSubscribersApiLoader(chartName?: string, download?: boolean) {
    // GAMING SUBSCRIBERS
    this.errorReset()
    this.gamingSubscriberError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.gamingSubscribersSubject = this.marketingExploreDataSubscriberApiService.GamingSubscribers().subscribe((res: any) => {
      this.gamingData=res;
      let gamingSubscribersData = res;
      gamingSubscribersData.categories = gamingSubscribersData.categories.map(item =>
        item.charAt(0) != '/' ? item.replace('/', '&#47;') : item
      );
      if (download) {
        $('#gamingSubscriberDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.subscribersServiceTiersExportDataForming(gamingSubscribersData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language?.gaming_subscribers_gaming);
        if (this.WFHSubscribersSubject) {
          setTimeout(() => {
            $('#gamingSubscriberDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.streamingGamingWFHSubscriberOptions(gamingSubscribersData, this.clickData).subscribe((data: any) => {
          this.gamingChartData=data;
          this.gamingSubscribersDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                tech: this.series.name,
                page: 1,
                size: 10,
                index: this.x,
                indexS: this.series.index,
              };
              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.Gaming_Title, clickData)
            }
          };
          this.highlight(event)
          let chart = Highcharts.chart(chartName ? chartName : 'gaming-subscribers-chart', data)
          this.chartAvailable = true
        })
      }
    },
      (error: any) => {
        if (download) {
          $('#gamingSubscriberDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.gamingSubscriberError = true
          this.gamingSubscriberErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  WFHSubscribersApiLoader(chartName?: string, download?: boolean) {
    // WFH SUBSCRIBERS
    this.errorReset()
    this.WFHSubscriberError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.WFHSubscribersSubject = this.marketingExploreDataSubscriberApiService.WfhSubscribers().subscribe((res: any) => {
      this.wfhData=res;
      let WFHSubscribersData = res
      WFHSubscribersData.categories = WFHSubscribersData.categories.map(item =>
        item.charAt(0) != '/' ? item.replace('/', '&#47;') : item
      );
      // this.marketingExploreDataAssignerService.streamGameWFHsubscribersDataFormatter(res, SEGMENTATION_CATEGORIES.WFH);
      if (download) {
        $('#WFHSubscriberDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.subscribersServiceTiersExportDataForming(WFHSubscribersData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language?.work_from_home_wfh_subscribers_wfh);
        if (this.WFHSubscribersSubject) {
          setTimeout(() => {
            $('#WFHSubscriberDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.streamingGamingWFHSubscriberOptions(WFHSubscribersData, this.clickData).subscribe((data: any) => {
          this.wfhChartData=data;
          this.WFHSubscribersDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                tech: this.series.name,
                page: 1,
                size: 10,
                index: this.x,
                indexS: this.series.index,
              };
              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.WFH_Title, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'wfh-subscribers-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#WFHSubscriberDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.WFHSubscriberError = true
          this.WFHSubscriberErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  dataUsageTrendsApiLoader(chartName?: string, download?: boolean) {
    // DATA USAGE TRENDS
    this.errorReset()
    this.dataTrendsError = false;
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.dataUsageTrendsSubject = this.marketingExploreDataSubscriberApiService.DataUsageTrends().subscribe((res: any) => {
      this.dataUsageTrends=res;
      let dataUsageTrendsData = res
      if (download) {
        $('#dataUsageDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.dataUsageTrendsDataForming(dataUsageTrendsData);
        let fname = this.downloadFileNameService.generateDownloadWOPeriodName(this.language?.data_usage_trends);
        if (this.dataUsageTrendsSubject) {
          setTimeout(() => {
            $('#dataUsageDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadTrendsCSV(fname, data);
      } else {
        this.exportDataChartOptionsService.dataUsageTrendsOptions(dataUsageTrendsData).subscribe((data: any) => {
          this.dataTrendsChartData=data;
          this.dataTrendsDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'data-usage-trends-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#dataUsageDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.dataTrendsError = true;
          this.dataTrendsErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });

  }
  subscriberActivityTrendsApiLoader(chartName?: string, download?: boolean) {
    // SUBSCRIBER ACTIVTY TRENDS
    this.errorReset()
    this.subscriberActivityError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.subscriberActivityTrendsSubject = this.marketingExploreDataSubscriberApiService.SubscriberActivityTrends().subscribe((res: any) => {
      this.subscriberActivityData=res;
      let subscriberActivityTrends = this.marketingExploreDataAssignerService.subscriberActivityTrendsDataForming(res);
      if (download) {
        $('#subscriberActivityDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.subscriberActivityTrendsDataForming(res);
        let fname = this.downloadFileNameService.generateDownloadWOPeriodName(this.language?.subscriber_activity_trends);
        if (this.subscriberActivityTrendsSubject) {
          setTimeout(() => {
            $('#subscriberActivityDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }

        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.subscriberActivityTrendsOptions(subscriberActivityTrends).subscribe((data: any) => {
          this.subscriberActivityChartData=data;
          this.subscriberActivityDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'subscriber-activity-trends-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#subscriberActivityDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.subscriberActivityError = true
          this.subscriberActivityErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  devicePerHouseHoldApiLoader(chartName?: string, download?: boolean) {
    // DEVICE PER HOUSEHOLD
    this.errorReset()
    this.dataHouseholdError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.devicePerHouseholdSubject = this.marketingExploreDataSubscriberApiService.DevicePerHouseHold().subscribe((res: any) => {
      this.devicehouseholddata=res;
      let devicePerHouseHoldData: any = this.marketingExploreDataAssignerService.devicePerHouseHoldDataFormater(res);
      this.devicePerHouseholdSubscribers = devicePerHouseHoldData.totalSubs;
      if (download) {
        $('#deviceDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true;
        let data = this.marketingExploreDataDownloadDataService.devicePerHouseholdDataForming(res);
        let fname = this.downloadFileNameService.generateDownloadName(this.language?.devices_per_household);
        if (this.devicePerHouseholdSubject) {
          setTimeout(() => {
            $('#deviceDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.deviceperHouseHoldOptions(devicePerHouseHoldData, this.clickData).subscribe((data: any) => {
          this.deviceHoldChartData=data;
          this.dataHouseholdDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tier: this.category,
                yValue: this.y,
                tech: this.series.name,
                page: 1,
                size: 10,
              };
              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.DevicePerHousehold_Title, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'device-per-household-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#deviceDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.subscribechartDownloadError = true
          this.subscribechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.dataHouseholdError = true;
          this.dataHouseholdErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  // NORMAL API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    this.apiLoaderforSubscribers().then(() => {
      if (this.language) {
        this.subsTierDownloadContent = this.language.subs_download_tip;
        this.subsTierCloseContent = this.language.subs_fullscreen_close_tip;
      }
      switch (chartName) {
        case this.language.SUBS_DATA_USAGE_TITLE:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.subs_fullscreen_content;
          }
          if (download) {
            this.subscribersDataUasgeApiLoader(chartName, download)
          } else {
            this.subscribersDataUasgeApiLoader(chartName)
          }
          break;
        case this.language.Streaming_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.Streaming_Show_Tittle;
          }
          if (download) {
            this.streamingSubscribersApiLoader(chartName, download)
          } else {
            this.streamingSubscribersApiLoader(chartName)
          }
          break;
        case this.language.Gaming_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.Gaming_Show_Title;
          }
          if (download) {
            this.gamingSubscribersApiLoader(chartName, download)
          } else {
            this.gamingSubscribersApiLoader(chartName)
          }
          break;
        case this.language.WFH_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.WFH_Show_Title;
          }
          if (download) {
            this.WFHSubscribersApiLoader(chartName, download)
          } else {
            this.WFHSubscribersApiLoader(chartName)
          }
          break;
        case this.language.DataUsageTrends_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.usage_Show_Title;
          }
          if (download) {
            this.dataUsageTrendsApiLoader(chartName, download)
          } else {
            this.dataUsageTrendsApiLoader(chartName)
          }
          break;
        case this.language.DevicePerHousehold_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.DevicePerHousehold_Info;
          }
          if (download) {
            this.devicePerHouseHoldApiLoader(chartName, download)
          } else {
            this.devicePerHouseHoldApiLoader(chartName)
          }
          break;

        case this.language.SubscribersActivityTrends_Title:
          if (this.language) {
            this.subsTierFullScreenContent = this.language.activity_Show_Title;
          }
          if (download) {
            this.subscriberActivityTrendsApiLoader(chartName, download)
          } else {
            this.subscriberActivityTrendsApiLoader(chartName)
          }
          break;
        default:
          break;
      }
    });
  }
  // DRILL DOWN API TRIGGER SWITCH
  getFullScreenTablesData(chartName, clickData) {
    if (this.language) {
      this.subsTierDownloadContent = this.language.subs_download_tip;
      this.subsTierCloseContent = this.language.subs_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language?.SUBS_DATA_USAGE_TITLE:
        if (this.language) {
          this.subsTierFullScreenContent = this.language.subs_fullscreen_content;
        }
        if (clickData.tier.indexOf('GB') > -1 || clickData.tier.indexOf('TB') > -1) {
          this.subscriberUsage = clickData.tier;
    
          var data = clickData.tier;
          data = data.replaceAll("GB", "");
          data = data.replaceAll("TB", "");
          var conversion1 = "";
          var conversion2 = "";
          clickData.tier = data;
          if (this.subscriberUsage.indexOf('TB') > -1) {
    
            var keydata = clickData.tier.split("-");
            if (keydata.length == 2 && keydata[0] != 501) {
              conversion1 = (Math.floor(keydata[0]) * 1000 + 1).toString();
            }
            else if (keydata[0] == "501") {
              conversion1 = keydata[0];
            }
    
            if (Number(keydata[1]) && keydata.length == 2) {
              conversion2 = "-" + (Number(keydata[1]) * 1000).toString();
            }
            else {
              var keydata = clickData.tier.split("+");
              if (Number(keydata[0])) {
                conversion1 = (Math.floor(keydata[0]) * 1000 + 1).toString();
              }
            }
            clickData.tier = conversion1 + conversion2;
          }
        }
        this.subscribersDataUsageDrillDownApiLoader(clickData);
        /* var conversionData = this.conversion(clickData);

        this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + conversionData + ' )' }
        ]; */
        break;
      case this.language?.Streaming_Title:
        if (this.language) {
          this.subsTierFullScreenContent = this.language.Streaming_Show_Tittle;
        }
        this.streamingSubscribersDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }
        ]; */
        break;
      case this.language?.Gaming_Title:
        if (this.language) {
          this.subsTierFullScreenContent = this.language.Gaming_Show_Title;
        }
        this.gamingSubscribersDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }
        ]; */
        break;
      case this.language?.WFH_Title:
        if (this.language) {
          this.subsTierFullScreenContent = this.language.WFH_Show_Title;
        }
        this.wfhSubscribersDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }
        ]; */
        break;
      case this.language?.DevicePerHousehold_Title:
        if (this.language) {
          this.subsTierFullScreenContent = this.language.DevicePerHousehold_Info;
        }
        this.devicePerHouseHoldDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' Devices)' }
        ]; */
        break;
      default:
        break;
    }
  }
  get getExportMenus(): string[] {
    const exportMenus = [this.language['Export Chart Data']];
    if (this.clickData) {
      switch (this.fullScreenChart) {
        case this.language.SUBS_DATA_USAGE_TITLE:
          var conversionData = this.conversion(this.clickData);
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + conversionData + ')');
          break;
        case this.language.Streaming_Title:
        case this.language.Gaming_Title:
        case this.language.WFH_Title:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')');
          break;
        case this.language.DevicePerHousehold_Title:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + this.language.devices + ' )');
          break;
      }
    }
    return exportMenus;
  }
  conversion(clickData) {
    const sizes = ['GB', 'TB'];
    var size1 = "";
    var size2 = "";
    var value1 = "";
    var value2 = "";
    var conversion1 = "";
    var conversion2 = "";
    if (!clickData.tier.includes('GB') && !clickData.tier.includes('TB')) {
      var keydata = clickData.tier.split("-");
      if (keydata[0] != null && keydata[0] != undefined && keydata.length == 2) {
        if (Number(keydata[0]) >= 1000) {
          size1 = sizes[1];
          value1 = (keydata[0] / 1000).toString();
        }
        else if (Number(keydata[0]) < 1000) {
          size1 = sizes[0];
          value1 = keydata[0];
          // if(Number(keydata[0] == 501)) {
          //   size1 = sizes[0];
          // }
        }
        conversion1 = value1 + size1;
      }
      if (keydata[1] != null && keydata[1] != undefined && keydata.length == 2) {
        if (Number(keydata[1]) >= 1000) {
          size2 = sizes[1];
          value2 = (keydata[1] / 1000).toFixed(2);
        }
        else if (Number(keydata[1]) < 1000) {
          size2 = sizes[0];
          value2 = keydata[1];
        }
        conversion2 = "-" + value2 + size2;
      }
      else {
        var keydata = clickData.tier.split("+");
        if (Number(keydata[0]) >= 1000) {
          size1 = sizes[1];
          value1 = (keydata[0] / 1000).toString();
        }
        else if (Number(keydata[0]) < 1000) {
          size1 = sizes[0];
          value1 = keydata[0];
        }
        conversion1 = value1 + size1 + "+";
      }
      return conversion1 + conversion2;
    }
    else {
      return clickData.tier;
    }
  }
  // DRILL DOWN API 
  subscribersDataUsageDrillDownApiLoader(clickData) {
    this.errorReset()
    this.subscriberDataUsageDrillDownSubject =
      this.marketingExploreDataSubscriberApiService.SubscriberDataUsageDrillDown(clickData)
        .subscribe((res: any) => {
          this.subscriberDrillData=res;
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
                <td  style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
                <td  style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].email}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage}</td>
              </tr>`;
          }
          this.fullScreenTableOptions(html, data);
        },
          (error: any) => {
            this.apiErrorHandling(error)
          });
  }
  streamingSubscribersDrillDownApiLoader(clickData) {
    this.errorReset()
    this.streamingSubscribersDrillDownSubject =
      this.marketingExploreDataSubscriberApiService.StreamingSubscribersDrillDown(clickData)
        .subscribe((res: any) => {
          this.streamingDrillData=res;
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-center" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].streamingUsage}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage}</td>
        </tr>`;
          }
          this.fullScreenTableOptions(html, data);

        },
          (error: any) => {
            this.apiErrorHandling(error)
          });
  }
  gamingSubscribersDrillDownApiLoader(clickData) {
    this.errorReset()
    this.gamingSubscribersDrillDownSubject =
      this.marketingExploreDataSubscriberApiService.GamingSubscribersDrillDown(clickData)
        .subscribe((res: any) => {
          this.gamingDrillData=res;
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].gamingUsage}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage}</td>
        </tr>`;
          }
          this.fullScreenTableOptions(html, data);

        },
          (error: any) => {
            this.apiErrorHandling(error)
          });
  }
  wfhSubscribersDrillDownApiLoader(clickData) {
    this.errorReset()
    this.WFHSubscribersDrillDownSubject =
      this.marketingExploreDataSubscriberApiService.WfhSubscribersDrillDown(clickData)
        .subscribe((res: any) => {
          this.wfhDrillData=res;
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right header-font" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right header-font" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-center header-font" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td class="text-right header-font" style="font-weight:400 !important;font-size:13px;">${data[i].wfhTime}</td>
        </tr>`;
          }
          this.fullScreenTableOptions(html, data);

        },
          (error: any) => {
            this.apiErrorHandling(error)
          });
  }
  devicePerHouseHoldDrillDownApiLoader(clickData) {
    this.errorReset()
    this.devicePerHouseHoldDrillDownSubject =
      this.marketingExploreDataSubscriberApiService.DevicePerHouseHoldDrillDown(clickData)
        .subscribe((res: any) => {
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].optOut}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].wifiScore}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].wirelessDeviceNumber}</td>
          <td></td>import { MarketingApiService } from './../../../shared/services/marketing-api.sevice';

        </tr>`;
          }
          this.fullScreenTableOptions(html, data);
        },
          (error: any) => {
            this.apiErrorHandling(error)
          });
  }

  fullScreenTableOptions(html, data) {
    $('#append-table-list').append(html);
    this.fullScreenTableAvailable = true;
    this.fullScreenTableDataNotAvailable = false
    if (this.clickData.page == 1 && data.length == 0) {
      this.fullScreenTableDataNotAvailable = true
    }
    this.tableLoader = false;
    this.loadMoreButton = data.length > 9 ? true : false;
    this.loadingBtn = false;
  }
  loadMore() {
    if (this.clickData) {
      this.clickData.page += 1;
      if (!this.loadingBtn) {
        this.getFullScreenTablesData(this.fullScreenChart, this.clickData)
      }
      this.loadingBtn = true;
    }
  }

  // DRILL DOWN EXPORT API TRIGGER SWITCH
  drillDownExportApiLoader(chartName, clickData) {
    switch (chartName) {
      case this.language?.SUBS_DATA_USAGE_TITLE:
        this.subscriberDataUsageDrillDownExportApiLoader(clickData)
        break;
      case this.language?.Streaming_Title:
        this.streamingSubscribersDrillDownExportApiLoader(clickData)
        break;
      case this.language?.Gaming_Title:
        this.gamingSubscribersDrillDownExportApiLoader(clickData)
        break;
      case this.language?.WFH_Title:
        this.WFHSubscribersDrillDownExportApiLoader(clickData)
        break;
      case this.language?.DevicePerHousehold_Title:
        this.devicePerHouseHoldDrillDownExportApiLoader(clickData)
        break;
      default:
        break;
    }
  }
  // DRILL DOWN EXPORT API  
  subscriberDataUsageDrillDownExportApiLoader(clickData) {
    if (clickData.tier.indexOf('GB') > -1 || clickData.tier.indexOf('TB') > -1) {
      this.subscriberUsage = clickData.tier;

      var data = clickData.tier;
      data = data.replaceAll("GB", "");
      data = data.replaceAll("TB", "");
      var conversion1 = "";
      var conversion2 = "";
      clickData.tier = data;
      if (this.subscriberUsage.indexOf('TB') > -1) {

        var keydata = clickData.tier.split("-");
        if (keydata.length == 2 && keydata[0] != 501) {
          conversion1 = (Math.floor(keydata[0]) * 1000 + 1).toString();
        }
        else if (keydata[0] == "501") {
          conversion1 = keydata[0];
        }

        if (Number(keydata[1]) && keydata.length == 2) {
          conversion2 = "-" + (Number(keydata[1]) * 1000).toString();
        }
        else {
          var keydata = clickData.tier.split("+");
          if (Number(keydata[0])) {
            conversion1 = (Math.floor(keydata[0]) * 1000 + 1).toString();
          }
        }
        clickData.tier = conversion1 + conversion2;
      }
    }
    this.errorReset()
    this.subscriberDataUsageDrillDownExportSubject =
      this.marketingExploreDataSubscriberApiService.SubscriberDataUsageDrillDownExport(clickData)
        .subscribe((res: any) => {
          $('#subscriberChartDownload').addClass('spinnershow');
          this.fullScreenDownload = true;
          let data = this.marketingExploreDataDownloadDataService.subscriberDataUsageDrillDownExportDataForming(res);
          let fname = this.downloadFileNameService.generateDownloadNameForDrillDown(`${this.language.subscriber_data_usage}-${this.conversion(clickData)}`);
          if (data) {
            setTimeout(() => {
              $('#subscriberChartDownload').removeClass('spinnershow');
              this.fullScreenDownload = false;
            }, 1000);
          }
          this.exportExcelService.downLoadCSVRevenue(fname, data);
        },
          (error: any) => {
            this.apiDrillErrorHandling(error)
          });
  }
  streamingSubscribersDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#subscriberChartDownload').addClass('spinnershow');
    this.fullScreenDownload = true;
    let downloadDataObject = this.marketingExploreDataSubscriberApiService.StreamingSubscribersDrillDownExport(clickData);
    this.streamingSubscribersDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.streamingSubscribersDrillDownExportSubject) {
        setTimeout(() => {
          $('#subscriberChartDownload').removeClass('spinnershow');
          this.fullScreenDownload = false;
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    },
      (error: any) => {
        this.apiDrillErrorHandling(error)
      });
  }
  gamingSubscribersDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#subscriberChartDownload').addClass('spinnershow');
    this.fullScreenDownload = true;
    let downloadDataObject = this.marketingExploreDataSubscriberApiService.GamingSubscribersDrillDownExport(clickData);
    this.gamingSubscribersDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (res) {
        setTimeout(() => {
          $('#subscriberChartDownload').removeClass('spinnershow');
          this.fullScreenDownload = false;
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    },
      (error: any) => {
        this.apiDrillErrorHandling(error)
      });
  }
  WFHSubscribersDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#subscriberChartDownload').addClass('spinnershow');
    this.fullScreenDownload = true;
    let downloadDataObject = this.marketingExploreDataSubscriberApiService.WfhSubscribersDrillDownExport(clickData);
    this.WFHSubscribersDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (res) {
        setTimeout(() => {
          $('#subscriberChartDownload').removeClass('spinnershow');
          this.fullScreenDownload = false;
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    },
      (error: any) => {
        this.apiDrillErrorHandling(error)
      });
  }
  devicePerHouseHoldDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#subscriberChartDownload').addClass('spinnershow');
    this.fullScreenDownload = true;
    let downloadDataObject = this.marketingExploreDataSubscriberApiService.DeviceHouseholdDrillDownExport(clickData);
    this.devicePerHouseHoldDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (res) {
        setTimeout(() => {
          $('#subscriberChartDownload').removeClass('spinnershow');
          this.fullScreenDownload = false;
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    },
      (error: any) => {
        this.apiDrillErrorHandling(error)
      });
  }


  downloadFunction(chartName, exportMenu?: string) {
    if (exportMenu && exportMenu.includes('(')) {
      this.drillDownExportApiLoader(chartName, this.clickData)
    } else {
      this.getFullScreenChartOptions(chartName, true)
    }
  }
  resetAllData() {
    this.loadMoreButton = false
    this.subscriberDataUsageDataAvailable = false;
    this.streamingSubscribersDataAvailable = false;
    this.gamingSubscribersDataAvailable = false;
    this.WFHSubscribersDataAvailable = false;
    this.dataTrendsDataAvailable = false;
    this.subscriberActivityDataAvailable = false;
    this.dataHouseholdDataAvailable = false;
  }
  fullScreenCloseFunction() {
    this.fullScreen = false
    this.clickData = undefined;
    //this.exportMenu = undefined;
    this.clearTableBody();
    this.resetAllData();
    this.baseApiLoader();

  }
  clearTableBody() {
    $('#append-table-list').empty();
  }


  subscribChartModalOpen(modeldata) {
    this.popup_heading = modeldata
    switch (this.popup_heading) {
      case this.language?.SUBS_DATA_USAGE_TITLE:
        this.dialogService.open(this.subscribChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.Streaming_Title:
        this.dialogService.open(this.subscribStreamingChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.Gaming_Title:
        this.dialogService.open(this.subscribGamingChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.WFH_Title:
        this.dialogService.open(this.subscribWFHChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.SubscribersActivityTrends_Title:
        this.dialogService.open(this.subscribActivityChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.DataUsageTrends_Title:
        this.dialogService.open(this.subscribDataChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language?.DevicePerHousehold_Title:
        this.dialogService.open(this.subscribDevicesChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      default:
        break;
    }
  }

  closeModal() {
    this.dialogService.dismissAll();
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.searchFilterSubject) {
      this.searchFilterSubject.unsubscribe();
    }
    // BASIC API    
    if (this.activeSubscribersSubject) {
      this.activeSubscribersSubject.unsubscribe();
    }
    if (this.segmentationUserSummarySubject) {
      this.segmentationUserSummarySubject.unsubscribe();
    }
    if (this.subscriberDataUsageSubject) {
      this.subscriberDataUsageSubject.unsubscribe();
    }
    if (this.streamingSubscribersSubject) {
      this.streamingSubscribersSubject.unsubscribe();
    }
    if (this.gamingSubscribersSubject) {
      this.gamingSubscribersSubject.unsubscribe();
    }
    if (this.WFHSubscribersSubject) {
      this.WFHSubscribersSubject.unsubscribe();
    }
    if (this.dataUsageTrendsSubject) {
      this.dataUsageTrendsSubject.unsubscribe();
    }
    if (this.subscriberActivityTrendsSubject) {
      this.subscriberActivityTrendsSubject.unsubscribe();
    }
    if (this.devicePerHouseholdSubject) {
      this.devicePerHouseholdSubject.unsubscribe();
    }
    // DRILL DOWN
    if (this.subscriberDataUsageDrillDownSubject) {
      this.subscriberDataUsageDrillDownSubject.unsubscribe();
    }
    if (this.streamingSubscribersDrillDownSubject) {
      this.streamingSubscribersDrillDownSubject.unsubscribe();
    }
    if (this.gamingSubscribersDrillDownSubject) {
      this.gamingSubscribersDrillDownSubject.unsubscribe();
    }
    if (this.WFHSubscribersDrillDownSubject) {
      this.WFHSubscribersDrillDownSubject.unsubscribe();
    }
    if (this.devicePerHouseHoldDrillDownSubject) {
      this.devicePerHouseHoldDrillDownSubject.unsubscribe();
    }
    // DRILL DOWN EXPORT API
    if (this.subscriberDataUsageDrillDownExportSubject) {
      this.subscriberDataUsageDrillDownExportSubject.unsubscribe();
    }
    if (this.streamingSubscribersDrillDownExportSubject) {
      this.streamingSubscribersDrillDownExportSubject.unsubscribe();
    }
    if (this.gamingSubscribersDrillDownExportSubject) {
      this.gamingSubscribersDrillDownExportSubject.unsubscribe();
    }
    if (this.WFHSubscribersDrillDownExportSubject) {
      this.WFHSubscribersDrillDownExportSubject.unsubscribe();
    }
    if (this.devicePerHouseHoldDrillDownExportSubject) {
      this.devicePerHouseHoldDrillDownExportSubject.unsubscribe();
    }

  }








}
