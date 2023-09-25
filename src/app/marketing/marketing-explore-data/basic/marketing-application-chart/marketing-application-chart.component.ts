import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);

const $: any = require('jquery');
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingExploreDataApplicationApiService } from './marketing-explore-data-application-api.service';
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
import { Spanish as SpanishJSON } from 'src/assets/language/spanish.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Title } from '@angular/platform-browser';
import { German as GermanJSON } from 'src/assets/language/german.service';

@Component({
  selector: 'app-marketing-application-chart',
  templateUrl: './marketing-application-chart.component.html',
  styleUrls: ['./marketing-application-chart.component.scss']
})
export class MarketingApplicationChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  language: any;
  languageSubject;
  popup_heading: any
  ///full view
  fullScreen: boolean = false
  fullScreenChart: any
  fullScreenTableAvailable: boolean = false;
  fullScreenTableDataNotAvailable: boolean = false;


  clickData: any;
  dataAvailable: boolean = false;
  tableLoader: boolean = false;
  loadMoreButton: boolean = false;
  loadingBtn: boolean = false;
  //exportMenu: any;
  exportMenuAvailable: boolean = false;
  isusagebydata: boolean = false;
  isSocialMapData: boolean = false;
  // BASIC API
  searchFilterSubject: any;
  socialchannelListSubject: any;
  usageByAppSubject: any;
  topAppSubject: any;
  topGamingAppSubject: any;
  socialHeatMapSubject: any;

  // DRILL DOWM
  usageByAppDrillDownSubject: any;
  topAppDrillDownSubject: any;
  topGamingAppDrillDownSubject: any;
  // DRILL DOWN EXPORT
  usageByAppDrillDownExportSubject: any;
  topAppDrillDownExportSubject: any;
  topGamingAppDrillDownExportSubject: any

  // DATA
  topAppDataArray: any = [];
  topGamingAppDataArray: any = [];
  appHistoryTableDataArray: any;

  // DATA AVAILABLITY
  usageByAppDataAvailable: boolean = false;
  topAppDataAvailable: boolean = false;
  topGamingAppDataAvailable: boolean = false;
  socialHeatMapDataAvailable: boolean = false;


  // ERROR
  usageByAppDataError: boolean = false;
  usageByAppDataErrorMsg: any;
  topAppDataError: boolean = false;
  topAppDataErrorMsg: any;
  topGamingAppDataError: boolean = false;
  topGamingAppDataErrorMsg: any;
  socialHeatMapDataError: boolean = false;
  socialHeatMapDataErrorMsg: any;
  fullScreenDownload: boolean = false
  applicationFullScreenContent: any
  applicationDownloadContent: any
  applicationCloseContent: any

  @ViewChild('applicationChartModal', { static: true }) private applicationChartModal: TemplateRef<any>;
  @ViewChild('applicationTopAppChartModal', { static: true }) private applicationTopAppChartModal: TemplateRef<any>;
  @ViewChild('applicationGamingChartModal', { static: true }) private applicationGamingChartModal: TemplateRef<any>;
  @ViewChild('applicationSocialChartModal', { static: true }) private applicationSocialChartModal: TemplateRef<any>;

  socialChannelSelected: any
  socialChannels: any;

  applicationchartDownloadError: any
  applicationchartDownloadErrorMsg: any

  //variables for test cases
  applicationChartData:any;
  applicationUsageData:any;
  socialHeatMapData:any;
  socialHeatMapChartData:any;
  socialChannelListData:any;
  topLoaderAppData:any;
  topGamingLoaderData:any;
  usageByAppDrillDownData:any;
  topAppApiLoaderDrillData:any;
  topGamingAppApiLoaderDrillData:any;

  constructor(
    private dialogService: NgbModal,
    private marketingApiService: MarketingApiService,
    private marketingExploreDataApplicationApiService: MarketingExploreDataApplicationApiService,
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
    private titleService: Title,
    private marketingCommonService: MarketingCommonService,

  ) { }

  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.titleService.setTitle(`${this.language["Applications"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
      this.language = data;
      this.resetDataFunction();
      this.baseApiLoader();
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.Usage_By_Appln || chartname == this.English.data.Usage_By_Appln || chartname == this.Spanish.data.Usage_By_Appln || chartname == this.German.data.Usage_By_Appln) {
          this.fullScreenChart = this.language.Usage_By_Appln;
          this.usageByAppApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Top_Appln || chartname == this.English.data.Top_Appln || chartname == this.Spanish.data.Top_Appln || chartname == this.German.data.Top_Appln) {
          this.fullScreenChart = this.language.Top_Appln;
          this.topAppApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Top_gaming_Applicatins || chartname == this.English.data.Top_gaming_Applicatins || chartname == this.Spanish.data.Top_gaming_Applicatins || chartname == this.German.data.Top_gaming_Applicatins) {
          this.fullScreenChart = this.language.Top_gaming_Applicatins;
          this.topGammingAppApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.SocialHeatMap || chartname == this.English.data.SocialHeatMap || chartname == this.Spanish.data.SocialHeatMap || chartname == this.German.data.SocialHeatMap) {
          this.fullScreenChart = this.language.SocialHeatMap;
          this.socialChannelListApiLoader(this.fullScreenChart);
        }

      }
    });
    this.titleService.setTitle(`${this.language["Applications"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    // FOR SEARCH FILTER
    this.searchFilterApplyCheck();
    this.baseApiLoader();

  }
  baseApiLoader() {
    this.usageByAppApiLoader();
    this.topAppApiLoader();
    this.topGammingAppApiLoader();
    this.socialChannelListApiLoader();
  }
  searchFilterApplyCheck() {
    this.searchFilterSubject = this.marketingExploreDataBasicApiService.filerValuesSubject.subscribe(data => {
      if (data) {
        if (!this.fullScreen) {
          this.resetDataFunction();
          this.baseApiLoader();

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
    this.dataAvailable = false;
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
  //
  errorReset() {
    this.applicationchartDownloadError = false
    this.applicationchartDownloadErrorMsg = false
  }

  // BASIC API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    if (this.language) {
      this.applicationDownloadContent = this.language.subs_download_tip;
      this.applicationCloseContent = this.language.subs_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language.Usage_By_Appln:
        if (this.language) {
          this.applicationFullScreenContent = this.language.UsageByApplication_Info;
          this.applicationDownloadContent = this.language.subs_download_tip;
          this.applicationCloseContent = this.language.subs_fullscreen_close_tip;
        }
        if (download) {
          this.usageByAppApiLoader(chartName, download)
        } else {
          this.usageByAppApiLoader(chartName)
        }
        break;
      case this.language.Top_Appln:
        if (this.language) {
          this.applicationFullScreenContent = this.language.TopApp_Info;
          this.applicationDownloadContent = this.language.subs_download_tip;
          this.applicationCloseContent = this.language.subs_fullscreen_close_tip;
        }
        if (download) {
          this.topAppApiLoader(chartName, download)
        } else {
          this.topAppApiLoader(chartName)
        }
        break;
      case this.language.Top_gaming_Applicatins:
        if (this.language) {
          this.applicationFullScreenContent = this.language.TopGamingApp_Info;
          this.applicationDownloadContent = this.language.subs_download_tip;
          this.applicationCloseContent = this.language.subs_fullscreen_close_tip;
        }
        if (download) {
          this.topGammingAppApiLoader(chartName, download);
        } else {
          this.topGammingAppApiLoader(chartName)
        }
        break;
      case this.language.SocialHeatMap:
        if (this.language) {
          this.applicationFullScreenContent = this.language.Heat_Map_ShowInfo;
          this.applicationDownloadContent = this.language.subs_download_tip;
          this.applicationCloseContent = this.language.subs_fullscreen_close_tip;
        }
        if (download) {
          this.socialHeatMapApiLoader(chartName, download)
        } else {
          this.socialChannelListApiLoader(chartName)
        }
        break;


      default:
        break;
    }
  }
  // BASIC API 
  socialChannelListApiLoader(chartName?: string) {
    this.socialChannels = [];
    this.socialChannelSelected = '';
    this.isSocialMapData = true;
    this.socialHeatMapDataAvailable = false;
    this.socialchannelListSubject = this.marketingExploreDataApplicationApiService.SocialChannelAppList()
      .subscribe((res: any) => {
        if (res.length > 0 && res != undefined) {
          this.socialChannelListData=res;
          this.socialChannels = this.marketingExploreDataAssignerService.socialChannelsListDataFormatter(res);

          if (this.socialChannels.length > 0) {
            let periviousSelection = sessionStorage.getItem('socialChannel');
            this.socialChannelSelected = periviousSelection ? periviousSelection : this.socialChannels[0].name;
          }
          this.socialHeatMapApiLoader(chartName);
        } else {
          this.dataAvailable = true;
          this.socialHeatMapDataAvailable = false
          this.socialHeatMapDataError = true;
          this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
        }
      }, (error: any) => {
        this.socialHeatMapApiLoader(chartName);
      })
  }
  usageByAppApiLoader(chartName?: string, download?: boolean) {
    // USAGE BY APPLICATION
    this.errorReset()
    this.usageByAppDataError = false
    if (!download) {
      this.isusagebydata = false;
      this.usageByAppDataAvailable = false;
    }
    if (chartName && !download) {
      this.dataAvailable = false;
      this.fullScreenChart = chartName
    }
    this.usageByAppSubject = this.marketingExploreDataApplicationApiService.UsageByApp().subscribe((res: any) => {
      this.applicationUsageData=res
      let usageByAppData = this.marketingExploreDataAssignerService.usageByApplicationDataFormatter(res)
      if (download) {
        $('#usageAppDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.usageByAppDataForming(usageByAppData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.usage_by_application_type);
        if (this.usageByAppSubject) {
          setTimeout(() => {
            $('#usageAppDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        usageByAppData.forEach(element => {
          if (element['y'] != 0) {
            this.isusagebydata = true;
          }
        });
        if (this.isusagebydata == true) {
        } else {
          usageByAppData = [];
        }
        this.exportDataChartOptionsService.usageByApplicationOptions(usageByAppData, this.clickData).subscribe((data: any) => {
          this.applicationChartData=data;
          this.usageByAppDataAvailable = true;
          data.plotOptions.series.point.events = {
            click: function (event) {
              let clickData = {
                tech: this.name,
                page: 1,
                size: 10,
                yvalue: this.y
              };
              that.exportMenuAvailable = true;
              that.fullScreenExpandFunction(that.language.Usage_By_Appln, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'usage-by-app-chart', data)
          this.dataAvailable = true
        })
      }
    },
      (error: any) => {
        if (download) {
          $('#usageAppDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.applicationchartDownloadError = true
          this.applicationchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.usageByAppDataError = true
          this.usageByAppDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  topAppApiLoader(chartName?: string, download?: boolean) {
    // Top Application 
    this.errorReset()
    this.topAppDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.topAppSubject = this.marketingExploreDataApplicationApiService.TopApp().subscribe((res: any) => {
      this.topLoaderAppData=res;
      let topAppData = this.marketingExploreDataAssignerService.topAppData(res);
      if (download) {
        $('#topAppDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.topAppDataFormatter(topAppData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.top_applications);
        if (this.topAppSubject) {
          setTimeout(() => {
            $('#topAppDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.topAppDataArray = topAppData;
        this.topAppDataAvailable = true;
        this.dataAvailable = true;
      }

    },
      (error: any) => {
        if (download) {
          $('#topAppDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.applicationchartDownloadError = true
          this.applicationchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.topAppDataError = true
          this.topAppDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });

  }
  topGammingAppApiLoader(chartName?: string, download?: boolean) {
    // TOP GAMING APPLICATION
    this.errorReset()
    this.topGamingAppDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.topGamingAppSubject = this.marketingExploreDataApplicationApiService.TopGamingApp().subscribe((res: any) => {
      this.topGamingLoaderData=res;
      let topGamingAppData = this.marketingExploreDataAssignerService.topGamingAppData(res);
      if (download) {
        $('#topGamingDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.topAppDataFormatter(topGamingAppData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.top_gaming_applications);
        if (this.topGamingAppSubject) {
          setTimeout(() => {
            $('#topGamingDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.topGamingAppDataArray = topGamingAppData;
        this.topGamingAppDataAvailable = true;
        this.dataAvailable = true;
      }
    },
      (error: any) => {
        //  this.topGamingAppDataAvailable = false;
        if (download) {
          $('#topGamingDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.applicationchartDownloadError = true
          this.applicationchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.topGamingAppDataError = true
          this.topGamingAppDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  apiErrorHandling(error) {
    this.topGamingAppDataError = true
    this.topGamingAppDataErrorMsg = this.marketingCommonService.errorHandling(error)
  }
  socialHeatMapApiLoader(chartName?: string, download?: boolean) {
    // Social Heatmap
    this.errorReset()
    if (!download) {
      this.socialHeatMapDataAvailable = false;
      this.isSocialMapData = true;
    } else {
      this.socialHeatMapDataAvailable = true;
    }
    this.socialHeatMapDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    if (this.socialChannelSelected) {
      this.socialHeatMapSubject = this.marketingExploreDataApplicationApiService.SocialHeatMap(this.socialChannelSelected).subscribe((res: any) => {
        this.socialHeatMapData=res;
        //  if (res.length > 0 && res != undefined) {
        let socialChannelHeatMapData = this.marketingExploreDataAssignerService.socialChannelDataFormatter(res)
        if (download) {
          $('#socialHeatDownloadSection').addClass('spinnershow');
          this.fullScreenDownload = true
          let data = this.marketingExploreDataDownloadDataService.socialChannelMapExportDataFormatter(socialChannelHeatMapData);
          let time = this.exportDataChartOptionsService.timezoneCreator();
          let ftime = time.replace(':', '-');
          let name = this.socialChannelSelected;
          let s_name = name.replaceAll(' ', '-');
          let fname = this.downloadFileNameService.generateDownloadName(`${this.language.SocialHeatMap_d}-${s_name}-${ftime}`);
          if (this.socialHeatMapSubject) {
            setTimeout(() => {
              $('#socialHeatDownloadSection').removeClass('spinnershow');
              this.fullScreenDownload = false
            }, 1000);
          }
          this.exportExcelService.downLoadCSVRevenue(fname, data);
        } else {
          this.isSocialMapData = (res && res.data && res.data.length > 0);
          this.socialChannelChartLoader(socialChannelHeatMapData, chartName)
        }
        // } else {
        //   this.socialChannelChartLoader([], chartName)
        // }
      },
        (error: any) => {
          if (download) {
            $('#socialHeatDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false;
            this.applicationchartDownloadError = true
            this.applicationchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
          } else {
            this.dataAvailable = true;
            this.isSocialMapData = false;
            this.socialHeatMapDataError = true
            this.socialHeatMapDataErrorMsg = this.marketingCommonService.errorHandling(error)
          }
        });
    } else {
      // this.dataAvailable = true;
      // this.isSocialMapData = false;
      // this.socialHeatMapDataError = true
      // this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
      if (download) {
        $('#socialHeatDownloadSection').addClass('spinnershow');
        let time = this.exportDataChartOptionsService.timezoneCreator();
        let ftime = time.replace(':', '-');
        let name = this.socialChannelSelected;
        let s_name = name.replaceAll(' ', '-');
        let fname = this.downloadFileNameService.generateDownloadName(`${this.language.SocialHeatMap_d}-${s_name}-${ftime}`);
        this.exportExcelService.downLoadCSVRevenue(fname, []);
        $('#socialHeatDownloadSection').removeClass('spinnershow');
        this.isSocialMapData = false;
        this.socialHeatMapDataError = true;
        this.dataAvailable = true;
        this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
      }
      else {
        this.isSocialMapData = false;
        this.socialHeatMapDataError = true;
        this.dataAvailable = true;
        this.socialHeatMapDataErrorMsg = this.language["No Data Available"]
      }
      //this.socialChannelChartLoader([], chartName)
    }
  }
  socialChannelChartLoader(socialChannelHeatMapData, chartName?: any,) {
    // console.log(socialChannelHeatMapData, 'socialChannelHeatMapData')
    this.exportDataChartOptionsService.SocialChannelHeatMapOptions(socialChannelHeatMapData).subscribe((data: any) => {
      this.socialHeatMapChartData=data;
      if (this.fullScreen) {
        data.legend = {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 300,
          enabled: true
        }
      }
      this.socialHeatMapDataAvailable = true;
      let chart = Highcharts.chart(chartName ? chartName : 'social-heat-map', data)
      this.dataAvailable = true
    })
  }
  // CHANGE SOCIAL CHANNELS
  selectSocialChannel(channelName) {
    this.socialChannelSelected = channelName;
    sessionStorage.setItem('socialChannel', channelName)
    this.socialHeatMapDataAvailable = false;
    if (this.fullScreen) {
      this.getFullScreenChartOptions(this.language.SocialHeatMap)
    } else {
      this.socialHeatMapApiLoader();
    }
  }
  // DRILL DOWN API TRIGGER SWITCH
  getFullScreenTablesData(chartName, clickData) {
    switch (chartName) {
      case this.language.Usage_By_Appln:
        this.usageByAppDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Application List (' + clickData.tech + ')' }
        ]; */
        break;
      case this.language.Top_Appln:
        this.topAppDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Application List' },
          { title: 'Export Subscriber Counts (' + clickData.application1 + ' Subscribers )' }
        ]; */
        break;
      case this.language.Top_gaming_Applicatins:
        this.topGamingAppDrillDownApiLoader(clickData)
        /*  this.exportMenu = [
           { title: 'Export Application List' },
           { title: 'Export Subscriber Counts (' + clickData.application1 + ' Subscribers )' }
 
         ]; */
        break;
      default:
        break;
    }
  }
  get getExportMenus(): string[] {
    const exportMenus: string[] = [];
    if (this.clickData) {
      switch (this.fullScreenChart) {
        case this.language.Usage_By_Appln:
          exportMenus.push(...[this.language.Export_Chart_Data, this.language.Export_Application_List + '(' + this.clickData.tech + ')']);
          break;
        case this.language.Top_Appln:
          exportMenus.push(...[this.language.Export_Application_List, this.language.Export_Subscriber_Counts + '(' + this.clickData.application1 + this.language.subscribers + ')']);
          break;
        case this.language.Top_gaming_Applicatins:
          exportMenus.push(...[this.language.Export_Application_List, this.language.Export_Subscriber_Counts + '  (' + this.clickData.application1 + this.language.subscribers + ')']);
          break;
      }
    }
    return exportMenus;
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

  // DRILL DOWN API LOADER
  usageByAppDrillDownApiLoader(clickData) {
    this.errorReset()
    this.usageByAppDrillDownSubject =
      this.marketingExploreDataApplicationApiService.UsageByAppDrillDown(clickData)
        .subscribe((res: any) => {
          this.usageByAppDrillDownData=res;
          let data = this.marketingExploreDataAssignerService.usageByAppDrillDownDataFormatter(res)
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
         
          <td style="font-weight:400 !important;font-size:13px;">${data[i].appName}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].pctUsage}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].avgSubs}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].avgPctSubs}</td>
          <td></td>
        </tr>`;
          }
          $('#append-table-list').append(html);
          this.fullScreenTableAvailable = true;
          this.fullScreenTableDataNotAvailable = false
          if (this.clickData.page == 1 && data.length == 0) {
            this.fullScreenTableDataNotAvailable = true
          }
          this.tableLoader = false;
          this.loadMoreButton = data.length > 9 ? true : false;
          this.loadingBtn = false;
        }, (error: any) => {

          this.apiErrorHandling(error)
        });
  }
  topAppDrillDownApiLoader(clickData) {
    this.appHistoryTableDataArray = undefined;
    clickData.page = 1;
    clickData.size = 100;
    this.topAppDrillDownSubject = this.marketingExploreDataApplicationApiService.TopAppDrillDown(clickData).subscribe((res: any) => {
      this.topAppApiLoaderDrillData=res;
      let topAppDrillDownData = this.marketingExploreDataAssignerService.topAppDrillDownDataFormatter(res);
      this.fullScreenTableAvailable = true;
      this.fullScreenTableDataNotAvailable = false
      if (this.clickData.page == 1 && res.length == 0) {
        this.fullScreenTableDataNotAvailable = true
      }
      this.appHistoryTableDataArray = topAppDrillDownData;
      this.tableLoader = false;
    },
      (error: any) => {
        this.tableLoader = false;

      });

  }
  topGamingAppDrillDownApiLoader(clickData) {
    this.appHistoryTableDataArray = undefined;
    clickData.page = 1;
    clickData.size = 100;
    this.topGamingAppDrillDownSubject = this.marketingExploreDataApplicationApiService.TopGamingAppDrillDown(clickData).subscribe((res: any) => {
     this.topGamingAppApiLoaderDrillData=res
      let topGamingAppDrillDownData = this.marketingExploreDataAssignerService.topAppDrillDownDataFormatter(res);
      this.fullScreenTableAvailable = true;
      this.fullScreenTableDataNotAvailable = false
      if (this.clickData.page == 1 && res.length == 0) {
        this.fullScreenTableDataNotAvailable = true
      }
      this.appHistoryTableDataArray = topGamingAppDrillDownData;
      this.tableLoader = false;
    },
      (error: any) => {
        this.tableLoader = false;

      });

  }

  // DRILL DOWN EXPORT API TRIGGER SWITCH
  drillDownExportApiLoader(chartName, clickData) {
    switch (chartName) {
      case this.language.Usage_By_Appln:
        this.usageByAppDrillDownExportApiLoader(clickData)
        break;
      case this.language.Top_Appln:
        this.topAppDrillDownExportApiLoader(clickData)
        break;
      case this.language.Top_gaming_Applicatins:
        this.topGamingAppDrillDownExportApiLoader(clickData)
        break;
      default:
        break;
    }
  }

  // DRILL DOWN API
  usageByAppDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#applicationChartModalDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataApplicationApiService.UsageByApplicationExport(clickData)
    this.usageByAppDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.usageByAppDrillDownExportSubject) {
        setTimeout(() => {
          $('#applicationChartModalDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#applicationChartModalDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  topAppDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#applicationChartModalDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataApplicationApiService.TopAppsDrillDownExport(clickData)
    this.topAppDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.topAppDrillDownExportSubject) {
        setTimeout(() => {
          $('#applicationChartModalDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#applicationChartModalDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  topGamingAppDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#applicationChartModalDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataApplicationApiService.TopGamingAppsDrillDownExport(clickData)
    this.topGamingAppDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.topGamingAppDrillDownExportSubject) {
        setTimeout(() => {
          $('#applicationChartModalDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#applicationChartModalDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }

  downloadFunction(chartName, exportMenu?: string) {
    if (exportMenu && exportMenu.includes('(')) {
      this.drillDownExportApiLoader(chartName, this.clickData)
    } else {
      this.getFullScreenChartOptions(chartName, true)
    }
  }
  fullScreenExpandFunction(chartName?: any, clickData?: any) {

    if (!this.fullScreen) {
      this.dataAvailable = false;
      this.fullScreenTableAvailable = false;
      this.getFullScreenChartOptions(chartName)
    }
    this.fullScreen = true
    this.fullScreenChart = chartName;
    localStorage.setItem("fullScreenChart", chartName)
    let sameClickData = JSON.stringify(this.clickData) == JSON.stringify(clickData)
    if (!sameClickData) {
      this.tableLoader = true;
      this.clearTableBody();
      this.fullScreenTableAvailable = false;
      this.getFullScreenTablesData(chartName, clickData)
    }
    this.clickData = clickData;
  }
  resetDataFunction() {
    this.loadMoreButton = false
    this.usageByAppDataAvailable = false;
    this.topAppDataAvailable = false;
    this.topGamingAppDataAvailable = false;
    this.socialHeatMapDataAvailable = false;
  }
  fullScreenCloseFunction() {
    this.fullScreen = false
    this.appHistoryTableDataArray = undefined;
    this.fullScreenTableAvailable = false;
    this.clickData = undefined;
    //this.exportMenu = undefined;
    this.clearTableBody();
    this.resetDataFunction();
    this.baseApiLoader();
    this.socialHeatMapApiLoader()
  }
  clearTableBody() {
    $('#append-table-list').empty();
  }
  applicationChartModalOpen(modeldata) {
    this.popup_heading = modeldata
    switch (modeldata) {
      case this.language.Usage_By_Appln:
        this.dialogService.open(this.applicationChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Top_Appln:
        this.dialogService.open(this.applicationTopAppChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Top_gaming_Applicatins:
        this.dialogService.open(this.applicationGamingChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.SocialHeatMap:
        this.dialogService.open(this.applicationSocialChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      default:
        break;
    }

  }
  closeModal() {
    this.dialogService.dismissAll();
  }
  ngOnDestroy() {
    sessionStorage.removeItem('socialChannel')
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.searchFilterSubject) {
      this.searchFilterSubject.unsubscribe();
    }
    // BASIC API    
    if (this.socialchannelListSubject) {
      this.socialchannelListSubject.unsubscribe();
    }
    if (this.usageByAppSubject) {
      this.usageByAppSubject.unsubscribe();
    }
    if (this.topAppSubject) {
      this.topAppSubject.unsubscribe();
    }
    if (this.topGamingAppSubject) {
      this.topGamingAppSubject.unsubscribe();
    }
    if (this.socialHeatMapSubject) {
      this.socialHeatMapSubject.unsubscribe();
    }
    //DRILL
    if (this.usageByAppDrillDownSubject) {
      this.usageByAppDrillDownSubject.unsubscribe();
    }
    if (this.topAppDrillDownSubject) {
      this.topAppDrillDownSubject.unsubscribe();
    }
    if (this.topGamingAppDrillDownSubject) {
      this.topGamingAppDrillDownSubject.unsubscribe();
    }
    //Export
    if (this.usageByAppDrillDownExportSubject) {
      this.usageByAppDrillDownExportSubject.unsubscribe();
    }
    if (this.topAppDrillDownExportSubject) {
      this.topAppDrillDownExportSubject.unsubscribe();
    }
    if (this.topGamingAppDrillDownExportSubject) {
      this.topGamingAppDrillDownExportSubject.unsubscribe();
    }
  }
}
