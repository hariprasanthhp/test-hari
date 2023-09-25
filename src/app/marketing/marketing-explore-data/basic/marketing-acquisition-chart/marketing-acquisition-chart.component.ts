import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
declare var require: any;
import * as Highcharts from "highcharts";
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
import { MarketingExploreDataAcquisitionApiService } from './marketing-acquisition.explore-data.service';
import { MarketingExploreDataAssignerService } from '../shared/services/data-assigners.service';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { MarketingExploreDataDownloadDataService } from '../shared/services/explore-data-download.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingExploreCommonService } from '../shared/services/explore-data-common.service';
import { MarketingExploreDataBasicApiService } from '../explore-data-basic-api.service';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Spanish as SpanishJSON } from 'src/assets/language/spanish.service';
import { German as GermanJSON } from 'src/assets/language/german.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-marketing-acquisition-chart',
  templateUrl: './marketing-acquisition-chart.component.html',
  styleUrls: ['./marketing-acquisition-chart.component.scss']
})
export class MarketingAcquisitionChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  language: any;
  languageSubject: any;
  popup_heading: any
  period = {
    'last-30d': 'Last 30 days',
    'last-1m': 'Last Month',
    'last-2m': 'Last Two Months'
  };
  currentPeriod = 'Last 30 days';
  newServiceTierTechTotalAcquired: any;
  acquisitionRateInsightsTotalAcquired: any
  maxPotentialRevenue: any;
  actualRevenue: any
  fullScreen: boolean = false
  fullScreenChart: any
  fullScreenTableData: any
  tableLoader: boolean = false;
  fullScreenTableAvailable: boolean = false;
  fullScreenTableDataNotAvailable: boolean = false;
  clickData: any;
  dataAvailable: boolean = false;
  loadMoreButton: boolean = false;
  loadingBtn: boolean = false;
  //exportMenu: any;
  exportMenuAvailable: boolean = false;

  openedRowDetail: any = {};
  openedRowDetailOld: any = {};
  // BASIC API
  searchFilterSubject: any;
  newSubscribersByTechSubject: any;
  acquisitionRateInsightsSubject: any;
  acquisitionRevenueInsightsSubject: any;

  // DATA AVAILABLITY
  newSubscribersByTechDataAvailable: boolean = false;
  acquisitionRateInsightsDataAvailable: boolean = false;
  acquisitionRevenueInsightsDataAvailable: boolean = false;

  //Error
  newSubscribersByTechError: boolean = false;
  acquisitionRateInsightsError: boolean = false;
  acquisitionRevenueInsightsError: boolean = false;
  newSubscribersByTechErrorMsg: any;
  acquisitionRateInsightsErrorMsg: any
  acquisitionRevenueInsightsErrorMsg: any

  // Fullscreen error
  fullscreenTableError: boolean = false;
  fullscreenTableErrorMsg: any
  // DRILL DOWN
  newSubscribersServiceTierTechDrillDownSubject: any;
  acquisitionRateInsightsDrillDownSubject: any;
  acquisitionRevenueInsightsDrillDownSubject: any;

  // INLINE TABLE CHARTS API
  acquisitionServiceLimitSubject: any;
  acquisitionSubscriberUsageSubject: any
  acquisitionUsageByAppSubject: any
  acquisitionDeviceTrendsSubject: any
  acquisitionTopAppSubject: any
  // DRILL DOWN EXPORT
  newSubscribersTierTechDrillDownExportSubject: any;
  acquisitionRateInsightsDrillDownExportSubject: any;
  acquisitionRevenueInsightsDrillDownExportSubject

  // INLINE CHART DATA
  subscriberUsageData: any;
  serviceLimitData: any;
  usageByAppData: any;
  wifiTrendsData: any;
  topAppsData: any;

  revenueInsightsAccess: boolean = false
  acquisitionFullScreenContent: any
  acquisitionDownloadContent: any
  acquisitionCloseContent: any
  fullScreenDownload: boolean = false

  acquisitionchartDownloadError: any
  acquisitionchartDownloadErrorMsg: any;

  //variables for ngtest
  newSubscriberData:any;
  newSubscriberChartData:any;
  acquisitionRevenueData:any;
  acquisationChartData:any;
  acquisitionRateData:any;
  acquisitionRatechartData:any;
  newSubscriberDrillData:any;



  @ViewChild('acquisationChartModal', { static: true }) private acquisationChartModal: TemplateRef<any>;
  @ViewChild('acquisationRevenueChartModal', { static: true }) private acquisationRevenueChartModal: TemplateRef<any>;
  @ViewChild('acquisationRateChartModal', { static: true }) private acquisationRateChartModal: TemplateRef<any>;

  constructor(private dialogService: NgbModal,
    private marketingExploreDataAcquisitionApiService: MarketingExploreDataAcquisitionApiService,
    private marketingExploreDataBasicApiService: MarketingExploreDataBasicApiService,
    private marketingApiService: MarketingApiService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private marketingExploreDataDownloadDataService: MarketingExploreDataDownloadDataService,
    private downloadFileNameService: DownloadFileNameService,
    private exportExcelService: ExportExcelService,
    private marketingExploreCommonService: MarketingExploreCommonService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private English: EnglishJSON,
    private French: FrenchJSON,
    private Spanish: SpanishJSON,
    private German: GermanJSON,
    private titleService: Title,
    private marketingCommonService: MarketingCommonService) { }

  ngOnInit(): void {
    
    this.getScopes()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Acquisitions"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]} - ${this.language["Calix Cloud"]}`);
      this.baseApiLoader();
      this.getCurrentLocalizedPeriod();
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.new_subscribe || chartname == this.English.data.new_subscribe || chartname == this.Spanish.data.new_subscribe || chartname == this.German.data.new_subscribe) {
          this.fullScreenChart = this.language.new_subscribe;
          this.newSubscribersByTechApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.revenue_Insight || chartname == this.English.data.revenue_Insight || chartname == this.Spanish.data.revenue_Insight || chartname == this.German.data.revenue_Insight) {
          this.fullScreenChart = this.language.revenue_Insight;
          this.acquisitionRevenueInsightsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.acquisition || chartname == this.English.data.acquisition || chartname == this.Spanish.data.acquisition || chartname == this.German.data.acquisition) {
          this.fullScreenChart = this.language.acquisition;
          this.acquisitionRateInsightsApiLoader(this.fullScreenChart);
        }

      }
      // if (this.clickData) {
      //   this.fullScreenSearch(this.fullScreenChart, this.clickData)
      //   this.acquisitionRateInsightsDrillDownLoader(this.clickData)
      //   this.appendRowClickEvent()
      // }
    });
    this.titleService.setTitle(`${this.language["Acquisitions"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]} - ${this.language["Calix Cloud"]}`);
    // FOR SEARCH FILTER
    this.searchFilterApplyCheck();
    this.baseApiLoader()


  }
  getScopes() {
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.cmc.revenue'] = scopes['cloud.rbac.cmc.revenue'] ? scopes['cloud.rbac.cmc.revenue'] : [];

      if (scopes && (scopes['cloud.rbac.cmc.revenue'] && scopes['cloud.rbac.cmc.revenue'].length)) {
        this.revenueInsightsAccess = true;
      }

    } else {
      this.revenueInsightsAccess = false;
    }

  }
  baseApiLoader() {
    this.newSubscribersByTechApiLoader()
    if (this.revenueInsightsAccess) {
      this.acquisitionRevenueInsightsApiLoader();
    }
    this.acquisitionRateInsightsApiLoader();
  }
  searchFilterApplyCheck() {
    this.searchFilterSubject = this.marketingExploreDataBasicApiService.filerValuesSubject.subscribe(data => {
      if (data) {
        if (!this.fullScreen) {
          this.resetAllData();
          this.baseApiLoader()
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
  errorReset() {
    this.acquisitionchartDownloadError = false
    this.acquisitionchartDownloadErrorMsg = false
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
  // BASIC API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    if (this.language) {
      this.acquisitionDownloadContent = this.language.subs_download_tip;
      this.acquisitionCloseContent = this.language.subs_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language.new_subscribe:
        if (this.language) {
          this.acquisitionFullScreenContent = this.language.serviceTierNew_content_tip;
        }
        if (download) {
          this.newSubscribersByTechApiLoader(chartName, download)
        } else {
          this.newSubscribersByTechApiLoader(chartName)
        }
        break;
      case this.language.revenue_Insight:
        if (this.language) {
          this.acquisitionFullScreenContent = this.language.AcquisitionRevenueAndInsights_Info;
        }
        if (download) {
          this.acquisitionRevenueInsightsApiLoader(chartName, download)
        } else {
          this.acquisitionRevenueInsightsApiLoader(chartName)
        }
        break;
      case this.language.acquisition:
        if (this.language) {
          this.acquisitionFullScreenContent = this.language.AcquisitionRateAndInsights_Info;
        }
        if (download) {
          this.acquisitionRateInsightsApiLoader(chartName, download);
        } else {
          this.acquisitionRateInsightsApiLoader(chartName)
        }
        break;
      default:
        break;
    }
  }

  // Function is used to translate a period
  getCurrentLocalizedPeriod() {
    let period = this.period[this.marketingApiService.getPeriod()];
    if (period == 'Last Two Months') {
      this.currentPeriod = this.language['lasttwomonths'];
    } else if (period == 'Last 30 days') {
      this.currentPeriod = this.language['last 30 days'];
    } else if (period == 'Last Month') {
      this.currentPeriod = this.language['lastmonth'];
    }
  }
  // BASIC API
  newSubscribersByTechApiLoader(chartName?: string, download?: boolean) {
    // NEW SUBSCRIBER TIER TECH
    this.errorReset()
    this.newSubscribersByTechError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.newSubscribersByTechSubject = this.marketingExploreDataAcquisitionApiService.NewSubscribersServiceTierTech().subscribe((res: any) => {
      this.newSubscriberData=res;
      let newSubscribersTierTechData = res;
      this.getCurrentLocalizedPeriod();
      // this.currentPeriod = this.period[this.marketingApiService.getPeriod()];
      this.newServiceTierTechTotalAcquired = this.marketingExploreCommonService.sumOfObjectValues(res.totals);
      if (download) {
        $('#subscriberNewDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.subscriberTierTechExportDataForming(newSubscribersTierTechData);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.new_subscribers_by_service_tier_technology);
        if (this.newSubscribersByTechSubject) {
          setTimeout(() => {
            $('#subscriberNewDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.newSubscribersByTechDataAvailable = true;
        var that = this;
        this.exportDataChartOptionsService.newsubscribersTierTechChartOptions(newSubscribersTierTechData, this.clickData).subscribe((data: any) => {
          this.newSubscriberChartData=data;
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
              that.fullScreenExpandFunction(that.language.new_subscribe, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'new-subscriber-tier-tech-chart', data)
          this.dataAvailable = true;
        })
      }

    }, (error: any) => {
      if (download) {
        $('#subscriberNewDownloadSection').removeClass('spinnershow');
        this.fullScreenDownload = false;
        this.acquisitionchartDownloadError = true
        this.acquisitionchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
      } else {
        this.newSubscribersByTechError = true
        this.newSubscribersByTechErrorMsg = error.statusText
      }

    });
  }
  acquisitionRevenueInsightsApiLoader(chartName?: string, download?: boolean) {
    // ACQUISITION REVENUE INSIGHTS
    this.errorReset()
    this.acquisitionRevenueInsightsError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.acquisitionRevenueInsightsSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueInsights().subscribe((res: any) => {
      this.acquisitionRevenueData=res;
      let acquisitionRevenueInsightsData: any = this.marketingExploreDataAssignerService.aquisitionRevenueDataFormater(res);
      this.maxPotentialRevenue = acquisitionRevenueInsightsData.maxPotentialRevenue;
      this.actualRevenue = acquisitionRevenueInsightsData.actualRevenue;
      if (download) {
        $('#revenueInsigtDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true

        let data = this.marketingExploreDataDownloadDataService.aquisitionRevenueExportDataFormatter(res);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.acquisition_revenue_insights);
        if (this.acquisitionRevenueInsightsSubject) {
          setTimeout(() => {
            $('#revenueInsigtDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.acquisitionRevenueInsightsDataAvailable = true;
        var that = this;
        this.exportDataChartOptionsService.acquisitionRevenueInsightsOptions(acquisitionRevenueInsightsData, this.clickData).subscribe((data: any) => {
          this.acquisationChartData=data;
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
              that.fullScreenExpandFunction(that.language.revenue_Insight, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'acquisition-revenue-insights-chart', data)
          this.dataAvailable = true
        })
      }
    }, (error: any) => {
      if (download) {
        $('#revenueInsigtDownloadSection').removeClass('spinnershow');
        this.fullScreenDownload = false;
        this.acquisitionchartDownloadError = true
        this.acquisitionchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
      } else {
        this.acquisitionRevenueInsightsError = true
        this.acquisitionRevenueInsightsErrorMsg = this.marketingCommonService.errorHandling(error)
      }
    });
  }
  acquisitionRateInsightsApiLoader(chartName?: string, download?: boolean) {
    // SUBSCRIBER DATA USAGE
    this.errorReset()
    this.acquisitionRateInsightsError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.acquisitionRateInsightsSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRateInsights().subscribe((res: any) => {
      this.acquisitionRateData=res;
      let acquisitionRateInsightsData: any = this.marketingExploreDataAssignerService.aquisitionRateInsightsFormatData(res);
      this.acquisitionRateInsightsTotalAcquired = acquisitionRateInsightsData.total
      // var count = acquisitionRateInsightsData["series"].length;
      // acquisitionRateInsightsData["series"][count - 1].borderRadiusTopLeft = '30px'
      // acquisitionRateInsightsData["series"][count - 1].borderRadiusTopRight = '30px'
      if (download) {
        $('#acquisitionDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.acquisitionRateInsightsDataFormatter(acquisitionRateInsightsData, res);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.acquisition_rate_insights);
        if (this.acquisitionRateInsightsSubject) {
          setTimeout(() => {
            $('#acquisitionDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.acquisitionRateInsightsDataAvailable = true;
        var that = this;
        this.exportDataChartOptionsService.acquisitionRateInsightsOptions(acquisitionRateInsightsData, this.clickData).subscribe((data: any) => {
          this.acquisitionRatechartData=data;
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
              that.fullScreenExpandFunction(that.language.acquisition, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'acquisition-rate-insights-chart', data)
          this.dataAvailable = true
        })
      }
    },
      (error: any) => {
        if (download) {
          $('#acquisitionDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.acquisitionchartDownloadError = true
          this.acquisitionchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.acquisitionRateInsightsError = true
          this.acquisitionRateInsightsErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  // DRILL DOWN API TRIGGER SWITCH
  getFullScreenTablesData(chartName, clickData) {
    switch (chartName) {
      case this.language.new_subscribe:
        this.newSubscribersTierTechDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }
        ]; */

        break;
      case this.language.revenue_Insight:
        this.acquisitionRevenueInsightsDrillDownLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' Revenue)' }

        ]; */
        break;
      case this.language.acquisition:
        this.acquisitionRateInsightsDrillDownLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }

        ]; */
        break;
      default:
        break;
    }
  }
  get getExportMenus(): string[] {
    const exportMenus = [this.language.Export_Chart_Data];
    if (this.clickData) {
      switch (this.fullScreenChart) {
        case this.language.new_subscribe:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')');
          break;
        case this.language.revenue_Insight:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + this.language.Revenue + ')');
          break;
        case this.language.acquisition:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')');
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
        this.loadingBtn = true;
      }
    }
  }

  // DRILL DOWN API LOADER
  newSubscribersTierTechDrillDownApiLoader(clickData) {
    this.errorReset()
    this.fullscreenTableError = false;
    this.newSubscribersServiceTierTechDrillDownSubject =
      this.marketingExploreDataAcquisitionApiService.NewSubscribersServiceTierTechDrillDown(clickData)
        .subscribe((res: any) => {
          this.newSubscriberDrillData=res;
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
                <td  style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
                <td  style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>               
                <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
                <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
                <td class="text-center" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
                <td style="font-weight:400 !important;font-size:13px;">${data[i].startDate}</td>
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
        }, (error) => {
          this.fullscreenTableError = true;
          this.fullscreenTableErrorMsg = this.marketingCommonService.errorHandling(error)
          this.apiErrorHandling(error)
        })
  }
  apiErrorHandling(error) {
    this.acquisitionRateInsightsError = true
    this.acquisitionRateInsightsErrorMsg = this.marketingCommonService.errorHandling(error)

  }
  acquisitionRateInsightsDrillDownLoader(clickData) {
    this.errorReset()
    this.fullscreenTableError = false;
    this.acquisitionRateInsightsDrillDownSubject =
      this.marketingExploreDataAcquisitionApiService.AquisitionRateInsightsDrillDown(clickData)
        .subscribe((res: any) => {
          this.fullScreenTableData = res
          let data = res
          var counter = 0;
          let html = '';
          for (let i = 0; i < data.length; i++) {
            data[i].counter = counter;
            counter++
            if (data[i].endpointId) {
              html += `<tr id="row-${data[i].endpointId}-${data[i].counter}">`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-angle-right pointer" id="open-${data[i].endpointId}-${data[i].counter}"></i>&nbsp;${data[i].accountNumber}</td>`;
            } else {
              html += `<tr>`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-ban cursor-ban" aria-hidden="true"> </i>&nbsp;${data[i].accountNumber}</td>`;
            }

            html += `
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-center" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage ? data[i].totalUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].streamingUsage ? data[i].streamingUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].gamingUsage ? data[i].gamingUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].upstreamServiceLimit != null ? data[i].upstreamServiceLimit : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downstreamServiceLimit != null ? data[i].downstreamServiceLimit : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].curFee != null ? data[i].curFee : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].maxFee != null ? data[i].maxFee : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].startDate}</td>
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
          this.appendRowClickEvent();
        }, (error) => {
          this.fullscreenTableError = true;
          this.fullscreenTableErrorMsg = this.marketingCommonService.errorHandling(error)
          this.apiErrorHandling(error)
        })
  }
  acquisitionRevenueInsightsDrillDownLoader(clickData) {
    this.errorReset()
    this.fullscreenTableError = false;
    this.acquisitionRevenueInsightsDrillDownSubject =
      this.marketingExploreDataAcquisitionApiService.AquisitionRevenueInsightsDrillDown(clickData)
        .subscribe((res: any) => {
          this.fullScreenTableData = res
          let data = res
          let html = '';
          var counter = 0;
          for (let i = 0; i < data.length; i++) {
            data[i].counter = counter;
            counter++
            if (data[i].endpointId) {
              html += `<tr id="row-${data[i].endpointId}-${data[i].counter}">`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-angle-right pointer" id="open-${data[i].endpointId}-${data[i].counter}"></i>&nbsp;${data[i].accountNumber}</td>`;
            } else {
              html += `<tr>`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-ban cursor-ban" aria-hidden="true"> </i>&nbsp;${data[i].accountNumber}</td>`;
            }

            html += `
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].region}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].location}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].technologyType}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-center" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage ? data[i].totalUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].streamingUsage ? data[i].streamingUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].gamingUsage ? data[i].gamingUsage : '0'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].upstreamServiceLimit != null ? data[i].upstreamServiceLimit : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downstreamServiceLimit != null ? data[i].downstreamServiceLimit : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].curFee != null ? data[i].curFee : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].maxFee != null ? data[i].maxFee : 'N/A'}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].startDate}</td>
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
          this.appendRowClickEvent();

        }, (error) => {
          this.fullscreenTableError = true;
          this.fullscreenTableErrorMsg = this.marketingCommonService.errorHandling(error)
          this.apiErrorHandling(error)
        })
  }
  // ACQUISITION INLINE CHARTS API
  acquisitionChartsApiLoader(data) {
    this.acquisitionSubscriberRevenueApiLoader(data);
    this.acquisitionSubscriberUsageApiLoader(data);
    this.acquisitionServiceLimitApiLoader(data);
    this.acquisitionUsageByAppApiLoader(data);
    this.acquisitionDeviceTrendsApiLoader(data);
    this.acquisitionTopAppApiLoader(data);
  }
  // ACQUISITION INLINE CHARTS API LOADERS
  acquisitionSubscriberRevenueApiLoader(data) {
    this.errorReset()
    let acquisitionRevenue = data.data.curFee ? data.data.curFee : 0;
    this.exportDataChartOptionsService.acquisitionSubscriberRevenueOptions(acquisitionRevenue).subscribe(
      (data: {}) => {
        setTimeout(() => {
          Highcharts.chart('acquisition-subscriber-revenue', data);
        }, 100);
      }, (error: any) => {
        this.apiErrorHandling(error)
      });

  }
  acquisitionSubscriberUsageApiLoader(data) {
    this.errorReset()
    this.acquisitionSubscriberUsageSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueSubscriberUsage(data).subscribe((res: any) => {
      this.subscriberUsageData = this.marketingExploreDataAssignerService.aquisitionInnerTableSubscriberUsageDataFormatter(res);
      this.exportDataChartOptionsService.acquisitionSubscribersUsageOptions(this.subscriberUsageData).subscribe(
        (data: any) => {
          setTimeout(() => {
            $('#acq-subscriber-usage-total').html(this.subscriberUsageData.totals);
            Highcharts.chart('acquisition-subscriber-usage', data);
          }, 100);
        }
      );
    }, (error: any) => {
      this.apiErrorHandling(error)
    });
  }
  acquisitionServiceLimitApiLoader(data) {
    this.errorReset()
    this.acquisitionServiceLimitSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueServiceLimit(data).subscribe(res => {
      this.serviceLimitData = this.marketingExploreDataAssignerService.aquisitionInnerTableServiceLimitDataFormatter(res);
      this.exportDataChartOptionsService.acquitionservicelimitOptions(this.serviceLimitData).subscribe(
        (data: any) => {
          setTimeout(() => {
            Highcharts.chart('acquisition-service-limits', data);
          }, 100);
        }
      );
    }, (error: any) => {
      this.apiErrorHandling(error)
    });
  }
  acquisitionUsageByAppApiLoader(data) {
    this.errorReset()
    this.acquisitionUsageByAppSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueUsageByApp(data).subscribe(res => {
      this.usageByAppData = this.marketingExploreDataAssignerService.usageByApplicationDataFormatter(res);
      this.exportDataChartOptionsService.usageByApplicationOptions(this.usageByAppData).subscribe(
        (data: any) => {
          setTimeout(() => {
            Highcharts.chart('acquisition-usage-by-application', data);
          }, 100);
        }
      );
    }, (error: any) => {
      this.apiErrorHandling(error)
    });


  }
  acquisitionDeviceTrendsApiLoader(data) {
    this.errorReset()
    this.acquisitionDeviceTrendsSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueDeviceTrends(data).subscribe(res => {
      this.wifiTrendsData = this.marketingExploreDataAssignerService.acquisitionInnerTableDeviceTrendsDataFormatter(res);
      this.exportDataChartOptionsService.acquisitionWiFiTrendsOptions(this.wifiTrendsData).subscribe(
        (data: any) => {
          setTimeout(() => {
            Highcharts.chart('acquisition-devices-and-wifi-score-trend', data);
          }, 100);
        }
      );
    }, (error: any) => {
      this.apiErrorHandling(error)
    });

  }
  acquisitionTopAppApiLoader(data) {
    this.errorReset()
    this.acquisitionTopAppSubject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueTopApp(data).subscribe((res: any) => {
      this.topAppsData = this.marketingExploreDataAssignerService.acquisitionInnerTabletopAppData(res);
      let app = '';
      for (var i = 0; i < this.topAppsData.length; i++) {
        app += `<tr >
                <td  style="padding:2px 4px ;font-size: 10px; ">${this.topAppsData[i].application}</td>
                <td  style="padding:2px 4px;font-size: 10px;" class="text-right">${this.topAppsData[i].usage} GB </td>
              </tr>`;
      }
      if (this.topAppsData.length === 0) {
        app += `<tr> <td colspan="2" class="text-center"> ${this.language["No Data Available"]} </td></tr>`;
      }
      $('#chart-top-applications-tbody').append(app);
    }, (error: any) => {
      this.apiErrorHandling(error)
    });

  }

  appendRowClickEvent() {
    let data = this.fullScreenTableData;
    var that = this;
    //  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].endpointId) {
        $(`#open-${data[i].endpointId}-${data[i].counter}`)[0].addEventListener("click", function () {
          that.openedRowDetail = {
            chartId: that.fullScreenChart,
            endPointId: data[i].endpointId,
            data: data[i],
            serviceAddress: data[i].serviceAddress,
            counter: data[i].counter
          };
          that.openInnerCharts(that.openedRowDetail);
        }, false);
      }

    }
    //  }
  }

  adressReplacer(address) {
    return address.split(' ').join('').replaceAll(',', '')
  }
  openInnerCharts(data) {
    $(".delete").remove();
    if (Object.keys(this.openedRowDetailOld).length != 0) {
      if (this.openedRowDetail.endPointId == this.openedRowDetailOld.endPointId && this.openedRowDetail.counter == this.openedRowDetailOld.counter) {
        $(`#open-${this.openedRowDetail.endPointId}-${this.openedRowDetail.counter}`).removeClass('fa-angle-down');
        $(`#open-${this.openedRowDetail.endPointId}-${this.openedRowDetail.counter}`).addClass('fa-angle-right');
        this.openedRowDetailOld = {};
        return;
      } else {
        $(`#open-${this.openedRowDetailOld.endPointId}-${this.openedRowDetailOld.counter}`).removeClass('fa-angle-down');
        $(`#open-${this.openedRowDetailOld.endPointId}-${this.openedRowDetailOld.counter}`).addClass('fa-angle-right');

        $(`#open-${this.openedRowDetail.endPointId}-${this.openedRowDetail.counter}`).removeClass('fa-angle-right');
        $(`#open-${this.openedRowDetail.endPointId}-${this.openedRowDetail.counter}`).addClass('fa-angle-down');
      }
    } else {
      $(`#open-${data.endPointId}-${this.openedRowDetail.counter}`).removeClass('fa-angle-right');
      $(`#open-${data.endPointId}-${this.openedRowDetail.counter}`).addClass('fa-angle-down');
    }
    this.openedRowDetailOld = this.openedRowDetail;
    this.acquisitionChartsApiLoader(data);
    var newrow = `<tr class="delete">
                      <td colspan='21'>
                        <div class="row p-2">
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card"  style="
                              height: 350px !important;
                              margin-bottom: 30px !important;">
                                  <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                                  margin-bottom: 0;">
                                      <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2 pl-2" style="font-size: 24px;" >Subscriber Revenue</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row">
                                            <li class="list-inline-item">
                                              <a id="download-subscriber-revenue">
                                                <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" 
                                                title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                      </div>
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="acquisition-subscriber-revenue" style="height: 280px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card"  style="
                              height: 350px !important;
                              margin-bottom: 30px !important;" >
                          <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                          margin-bottom: 0;">
                                    <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Subscriber Usage</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row">
                                            <li class="list-inline-item">
                                              <a id="download-subscriber-usage">
                                              <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                      </div>
                                  </div>
                                  <div class="card-body py-0">
                                      <span class="border pl-1 mb-3" style="width:max-width">
                                        <span class="greyaa mb0  heading-subtitle" style="font-size: 14px;"> 6 Month Total Usage: <span id="acq-subscriber-usage-total"></span> GB &nbsp;</span>
                                      </span>
                                      <div id="acquisition-subscriber-usage" style="height: 270px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;">
                          <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                          margin-bottom: 0;">
                                    <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Usage By Application</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row">
                                            <li class="list-inline-item">
                                              <a id="download-usage-by-application">
                                              <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                      </div>
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="acquisition-usage-by-application" style="height: 290px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;"
                          >
                          <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                          margin-bottom: 0;">
                                    <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Service Limits</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row">
                                            <li class="list-inline-item">
                                              <a id="download-service-limits">
                                              <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                      </div>
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="acquisition-service-limits" style="height: 290px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;"
                          >
                          <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                          margin-bottom: 0;">
                                    <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Devices and Wi-Fi Score Trend</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row">
                                            <li class="list-inline-item">
                                              <a id="download-devices-wifi-score">
                                              <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                      </div>
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="acquisition-devices-and-wifi-score-trend" style="height: 290px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;">

                          <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                          margin-bottom: 0;">
                                    <div class="d-flex justify-content-between">
                                         <div class="chart-heading mb-2" style="font-size: 24px;padding-left:10px;">Top Applications</div> 
                                         <ul class="list-inline map-tool d-flex flex-direction-row" style="margin-right:5px;">
                                            <li class="list-inline-item">
                                              <a id="download-top-applications">
                                              <i class="btn-round btn-small-24 btn-grey" style=" background-image: url(assets/img/ic_download_grey.svg);" title="${this.language.subs_download_tip}"></i>
                                              </a>
                                            </li>
                                         </ul>
                                    </div>
                                  </div>
                                  <div class="card-body py-0">
                                    <table id="acquisition-top-applications" class="table-striped top-application" width="100%" style="max-height: 280px; overflow-y:scroll;">
                                      <thead>
                                        <tr class="theading" style="background-color: unset !important;">
                                          <th width="50%" style="font-size: 10px; padding:3px 0px ">Application</th>
                                          <th width="50%" style="font-size: 10px;  padding:3px 0px " class="text-right">Usage</th>
                                        </tr>
                                      </thead>
                                      <tbody style="border-bottom: 1px solid #dee2e6" class="tbodyheading" id="chart-top-applications-tbody">
                                      </tbody>
                                    </table>
                                  </div>                      
                              </div>
                           </div>
                        </div>
                      </td>
                    </tr>
                    `;
    $(`#row-${this.openedRowDetail.endPointId}-${this.openedRowDetail.counter}`).after(newrow);
    $(".smal thead>tr>th").css({ "padding": "5px", "border-bottom": "1px solid #ccc", "font-family": 'Source Sans Pro' });
    $(".smal tbody>tr>td").css({ "padding": "5px", "font-family": 'Source Sans Pro', "border-top": "unset" });

    this.appendDownloadEvent();
  }
  appendDownloadEvent() {
    var that = this;
    $(`#download-subscriber-revenue`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.acquisitionSubscriberRevenueExport(that.openedRowDetail);
      }
    }, false);

    $(`#download-subscriber-usage`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.acquisitionSubscriberUsageExport();
      }
    }, false);

    $(`#download-usage-by-application`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.acquisitionUsageByAppExport();
      }
    }, false);

    $(`#download-service-limits`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.acquisitionServiceLimitsExport();
      }
    }, false);

    $(`#download-devices-wifi-score`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.acquisitionWifiScoreExport();
      }
    }, false);

    $(`#download-top-applications`)[0].addEventListener("click", function () {
      if (Object.keys(that.openedRowDetail).length != 0) {
        that.topAppsExport();
      }
    }, false);
  }

  acquisitionSubscriberRevenueExport(data) {
    let array = [
      {
        'ACCOUNTNUMBER': data.data.accountNumber,
        'NAME': data.data.name,
        'PHONENUMBER': data.data.phoneNumber,
        'SERVICEADDRESS': data.data.serviceAddress,
        'EMAIL': data.data.email,
        'SERVICETIER': data.data.serviceTier,
        'REGION': data.data.region,
        'LOCATION': data.data.location,
        'TECHNOLOGYTYPE': data.data.technologyType,
        'CUSTOMERTYPE': data.data.customerType,
        'DOWNLOADSPEED': data.data.downloadSpeed,
        'UPLOADSPEED': data.data.uploadSpeed,
        'ATTAINABLERATE': data.data.attainableRate,
        'ENDPOINTID': data.data.endpointId,
        'TOTALUSAGE': data.data.totalUsage,
        'STREAMINGUSAGE': data.data.streamingUsage,
        'GAMINGUSAGE': data.data.gamingUsage,
        'DOWNSTREAMSERVICELIMIT': data.data.downstreamServiceLimit,
        'UPSTREAMSERVICELIMIT': data.data.upstreamServiceLimit,
        'COMPETITOR': data.data.competitor,
        'SPEEDTEST': data.data.speedTest,
        'NUMOFDEVICES': data.data.numOfDevices,
        'WIFISCORE': data.data.wifiScore,
        'CURFEE': data.data.curFee,
        'MAXFEE': data.data.maxFee,
        'STARTDATE': data.data.startDate,
        'HASCALIXSMARTHOMEAPP': data.data.mac ? 'Y' : 'N',

      }
    ];
    let date = localStorage.getItem('aquiredTier');
    let serviceTier = data.data.serviceTier ? data.data.serviceTier.replace('+', '') : '';
    let fname = this.downloadFileNameService.generateInlineChartDownloadName(`subscriber-revenue-${date}-${serviceTier}--${data.data.accountNumber}`);
    this.exportExcelService.downLoadCSVRevenue(fname, array)
  }
  acquisitionSubscriberUsageExport() {
    let chartsData = this.subscriberUsageData;
    let len = chartsData.categories.length;
    let stream = {};
    let game = {};
    let other = {};
    for (let obj of chartsData.series) {
      for (let key in obj) {
        if (obj[key] == 'Streaming Usage') {
          stream['name'] = 'Streaming Usage';
          stream['data'] = obj.data;
        }
        if (obj[key] == 'Gaming Usage') {
          game['name'] = 'Gaming Usage';
          game['data'] = obj.data;
        }
        if (obj[key] == 'Other Usage') {
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
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadName(this.language.subscriberUsage), data);

  }
  acquisitionUsageByAppExport() {
    let data = this.marketingExploreDataDownloadDataService.usageByAppDataForming(this.usageByAppData, 'search');
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadName(this.language.usagebyapplication), data);
  }
  acquisitionWifiScoreExport() {
    let devices = [];
    let wifi = [];
    let data = [];
    let category = this.wifiTrendsData.categories;
    let len = category.length;
    for (let obj of this.wifiTrendsData.series) {
      for (let key in obj) {
        if (obj[key] == 'Devices') {
          devices = obj.data;
        }
        if (obj[key] == 'Wi-Fi Score') {
          wifi = obj.data;
        }
      }
    }
    for (let i = 0; i < len; i++) {
      let obj = {};
      obj['MONTH'] = category[i];
      obj['NUMBER OF DEVICES'] = devices[i];
      obj['WIFI SCORE'] = wifi[i];
      data.push(obj);
    }
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadName(this.language.deviceandwifi), data);
  }
  topAppsExport() {
    let data = this.marketingExploreDataDownloadDataService.topAppDataFormatter(this.topAppsData);
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadName(this.language.Top_Appln), data);
  }
  acquisitionServiceLimitsExport() {
    let upStream = {};
    let downStream = {};
    let data = [];
    let category = this.serviceLimitData.categories;
    let len = category.length;
    for (let obj of this.serviceLimitData.series) {
      for (let key in obj) {
        if (obj[key] == 'Upstream Limit Hits') {
          upStream['name'] = 'Upstream Limit Hits';
          upStream['data'] = obj.data;
        }
        if (obj[key] == 'Downstream Limit Hits') {
          downStream['name'] = 'Downstream Limit Hits';
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
    this.exportExcelService.downLoadCSVRevenue(this.downloadFileNameService.generateDownloadName(this.language.servicelimits), data);

  }
  // DRILL DOWN EXPORT API TRIGGER SWITCH
  drillDownExportApiLoader(chartName, clickData) {
    switch (chartName) {
      case this.language.new_subscribe:
        this.newSubscribersTierTechDrillDownExportApiLoader(clickData)
        break;
      case this.language.revenue_Insight:
        this.acquisitionRevenueInsightsDrillDownExportApiLoader(clickData)
        break;
      case this.language.acquisition:
        this.acquisitionRateInsightsDrillDownExportApiLoader(clickData)
        break;
      default:
        break;
    }
  }

  // DRILL DOWN API
  newSubscribersTierTechDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#acquisitionModelChartDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataAcquisitionApiService.NewSubscriberServiceTierDrillDownExport(clickData)
    this.newSubscribersTierTechDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.newSubscribersTierTechDrillDownExportSubject) {
        setTimeout(() => {
          $('#acquisitionModelChartDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#acquisitionModelChartDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  acquisitionRateInsightsDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#acquisitionModelChartDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataAcquisitionApiService.AquisitionRateInsightsDrillDownExport(clickData)
    this.acquisitionRateInsightsDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.acquisitionRateInsightsDrillDownExportSubject) {
        setTimeout(() => {
          $('#acquisitionModelChartDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#acquisitionModelChartDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  acquisitionRevenueInsightsDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#acquisitionModelChartDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataAcquisitionApiService.AquisitionRevenueInsightsDrillDownExport(clickData)
    this.acquisitionRevenueInsightsDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.acquisitionRevenueInsightsDrillDownExportSubject) {
        setTimeout(() => {
          $('#acquisitionModelChartDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#acquisitionModelChartDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }

  acquisationChartModalOpen(modeldata) {
    this.popup_heading = modeldata

    switch (modeldata) {
      case this.language.new_subscribe:
        this.dialogService.open(this.acquisationChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.revenue_Insight:
        this.dialogService.open(this.acquisationRevenueChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.acquisition:
        this.dialogService.open(this.acquisationRateChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      default:
        break;
    }
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
  resetAllData() {
    this.loadMoreButton = false
    this.newSubscribersByTechDataAvailable = false;
    this.acquisitionRateInsightsDataAvailable = false;
    this.acquisitionRevenueInsightsDataAvailable = false;
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
    // BSIC API
    if (this.newSubscribersByTechSubject) {
      this.newSubscribersByTechSubject.unsubscribe();
    }
    if (this.acquisitionRateInsightsSubject) {
      this.acquisitionRateInsightsSubject.unsubscribe();
    }
    if (this.acquisitionRevenueInsightsSubject) {
      this.acquisitionRevenueInsightsSubject.unsubscribe();
    }
    // DRILL DOWN
    if (this.newSubscribersServiceTierTechDrillDownSubject) {
      this.newSubscribersServiceTierTechDrillDownSubject.unsubscribe();
    }
    if (this.acquisitionRateInsightsDrillDownSubject) {
      this.acquisitionRateInsightsDrillDownSubject.unsubscribe();
    }
    if (this.acquisitionRevenueInsightsDrillDownSubject) {
      this.acquisitionRevenueInsightsDrillDownSubject.unsubscribe();
    }
    // INLINE TABLE CHARTS
    if (this.acquisitionServiceLimitSubject) {
      this.acquisitionServiceLimitSubject.unsubscribe();
    }
    if (this.acquisitionSubscriberUsageSubject) {
      this.acquisitionSubscriberUsageSubject.unsubscribe();
    }
    if (this.acquisitionUsageByAppSubject) {
      this.acquisitionUsageByAppSubject.unsubscribe();
    }
    if (this.acquisitionDeviceTrendsSubject) {
      this.acquisitionDeviceTrendsSubject.unsubscribe();
    }
    if (this.acquisitionTopAppSubject) {
      this.acquisitionTopAppSubject.unsubscribe();
    }
    // EXPORT API
    if (this.newSubscribersTierTechDrillDownExportSubject) {
      this.newSubscribersTierTechDrillDownExportSubject.unsubscribe();
    }
    if (this.acquisitionRateInsightsDrillDownExportSubject) {
      this.acquisitionRateInsightsDrillDownExportSubject.unsubscribe();
    }
    if (this.acquisitionRevenueInsightsDrillDownExportSubject) {
      this.acquisitionRevenueInsightsDrillDownExportSubject.unsubscribe();
    }
    // INLINE CHARTS 

  }


}
