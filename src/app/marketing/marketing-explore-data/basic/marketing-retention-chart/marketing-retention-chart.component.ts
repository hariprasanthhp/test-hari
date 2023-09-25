import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingExploreDataRetentionApiService } from './marketing-explore-data-retention-api.service';
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
import { Title } from '@angular/platform-browser';
import { German } from 'src/assets/language/german.service';
@Component({
  selector: 'app-marketing-retention-chart',
  templateUrl: './marketing-retention-chart.component.html',
  styleUrls: ['./marketing-retention-chart.component.scss']
})
export class MarketingRetentionChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  language: any;
  languageSubject;
  popup_heading: any;
  totalChurnSubscribers: any;

  clickData: any;
  dataAvailable: boolean = false;
  tableLoader: boolean = false;
  fullScreenTableAvailable: boolean = false;
  fullScreenTableDataNotAvailable: boolean = false;
  loadMoreButton: boolean = false;
  loadingBtn: boolean = false;
  //exportMenu: any;
  exportMenuSingleAccount: any;
  exportMenuAvailable: boolean = false;

  openedRowDetail: any = {};
  openedRowDetailOld: any = {};
  // BASIC API
  searchFilterSubject: any;
  churnRateInsightsSubject: any;
  churnRiskSubject: any;
  churnRiskSummarySubject: any;
  retentionSubject: any

  // DRILL DOWN 
  churnRateInsightsDrillDownSubject: any

  // EXPORT
  churnRiskExportSubject: any;
  retentionExportSubject: any;
  churnRateInsightsDrillDownExportSubject: any
  churnRateInsightsDrillDownHistoryExportSubject: any

  // INLINE CHARTS
  churnRateInsightsInlineChartsSubject: any
  // DATA AVAILABITY
  churnRateInsightsDataAvailable: boolean = false;
  churnRiskDataAvailable: boolean = false;
  retentionDataAvailable: boolean = false;

  fullScreen: boolean = false
  fullScreenChart: any
  fullScreenTableData: any
  fullScreenDownload: boolean = false;

  //Error
  churnRateInsightsDataError: boolean = false;
  churnRateInsightsDataErrorMsg: any
  churnRiskDataError: boolean = false;
  churnRiskDataErrorMsg: any
  retentionDataError: boolean = false;
  retentionDataErrorMsg: any

  churnRiskDataArray: any = [];
  churnRiskSummaryDataArray: any;
  retentionDataArray: any = [];

  // INLINE CHART DATA
  subscriberUsageData: any;
  competitorVisitData: any;
  wiFiScoreData: any;
  serviceLimitData: any;
  serviceTierEventsData: any;

  retentionFullScreenContent: any
  retentionDownloadContent: any
  retentionCloseContent: any


  retentionchartDownloadError: any
  retentionchartDownloadErrorMsg: any
  @ViewChild('retensionRateChartModal', { static: true }) private retensionRateChartModal: TemplateRef<any>;
  @ViewChild('retensionRiskChartModal', { static: true }) private retensionRiskChartModal: TemplateRef<any>;
  @ViewChild('retensionChartModal', { static: true }) private retensionChartModal: TemplateRef<any>;

  //variables for testcases
  churnRateData:any;
  churnRateChartData:any;
  churnCountData:any;
  singleLineUserChartData:any;

  constructor(
    private dialogService: NgbModal,
    private marketingApiService: MarketingApiService,
    private marketingExploreDataRetentionApiService: MarketingExploreDataRetentionApiService,
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
    private titleService: Title,
    private marketingCommonService: MarketingCommonService,
    private German: German
  ) { }

  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(` ${this.language["Retention_Title"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]} - ${this.language["Calix Cloud"]}`);
      this.baseApiLoader();
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.churn_Rate || chartname == this.English.data.churn_Rate || chartname == this.Spanish.data.churn_Rate || chartname == this.German.data.churn_Rate) {
          this.fullScreenChart = this.language.churn_Rate;
          this.churnRateInsightsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.churn_Risk || chartname == this.English.data.churn_Risk || chartname == this.Spanish.data.churn_Risk || chartname == this.German.data.churn_Risk) {
          this.fullScreenChart = this.language.churn_Risk;
          this.churnRiskApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Retention_Title || chartname == this.English.data.Retention_Title || chartname == this.Spanish.data.Retention_Title || chartname == this.German.data.Retention_Title) {
          this.fullScreenChart = this.language.Retention_Title;
          this.retentionApiLoader(this.fullScreenChart);
        }
      }

    });
    this.titleService.setTitle(` ${this.language["Retention_Title"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]} - ${this.language["Calix Cloud"]}`);
    // FOR SEARCH FILTER
    this.searchFilterApplyCheck();
    this.baseApiLoader();

  }
  baseApiLoader() {
    this.churnRateInsightsApiLoader();
    this.churnRiskApiLoader();
    this.churnRiskSummaryApiLoader();
    this.retentionApiLoader();
  }
  searchFilterApplyCheck() {
    this.searchFilterSubject = this.marketingExploreDataBasicApiService.filerValuesSubject.subscribe(data => {
      if (data) {
        if (!this.fullScreen) {
          this.resetAllData();
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
      this.fullScreenTableAvailable = false;
      this.clearTableBody();
      this.getFullScreenTablesData(chartName, clickData)
    }
    this.clickData = clickData;
  }

  // BASIC API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    if (this.language) {
      this.retentionDownloadContent = this.language.subs_download_tip;
      this.retentionCloseContent = this.language.subs_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language.churn_Rate:
        if (this.language) {
          this.retentionFullScreenContent = this.language.Churn_Info;
        }
        if (download) {
          this.churnRateInsightsApiLoader(chartName, download)
        } else {
          this.churnRateInsightsApiLoader(chartName)
        }
        break;
      case this.language.ChurnRisk_Title:
        if (this.language) {
          this.retentionFullScreenContent = this.language.ChurnRisk_Info;
        }
        if (download) {
          this.churnRiskExportApiLoader()
        } else {
          this.churnRiskSummaryApiLoader();
          this.churnRiskApiLoader()
        }
        break;
      case this.language.Retention_Title:
        if (this.language) {
          this.retentionFullScreenContent = this.language.Retention_Info;
        }
        if (download) {
          this.retentionExportApiLoader();
        } else {
          this.retentionApiLoader(chartName)
        }
        break;
      default:
        break;
    }
  }
  errorReset() {
    this.retentionchartDownloadError = false
    this.retentionchartDownloadErrorMsg = false
  }
  churnRateInsightsApiLoader(chartName?: string, download?: boolean) {
    // CHURN RATE & INSIGHTS
    this.errorReset()
    this.churnRateInsightsDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.churnRateInsightsSubject = this.marketingExploreDataRetentionApiService.ChurnRateInsights().subscribe((res: any) => {
      this.churnRateData=res;
      let churnRateInsightsData: any = this.marketingExploreDataAssignerService.churnRateInsightsDataFormatter(res)
      this.totalChurnSubscribers = churnRateInsightsData.total
      if (download) {
        $('#churnRateDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.churnRateInsightsDataFormatter(churnRateInsightsData, res);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.churn_rate_insights);
        if (this.churnRateInsightsSubject) {
          setTimeout(() => {
            $('#churnRateDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.churnRateInsightsOptions(churnRateInsightsData, this.clickData).subscribe((data: any) => {
          this.churnRateChartData=data;
          this.churnRateInsightsDataAvailable = true;
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
              that.fullScreenExpandFunction(that.language.churn_Rate, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'churn-rate-insights-chart', data)
          this.dataAvailable = true
        })
      }
    },
      (error: any) => {
        if (download) {
          $('#churnRateDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.retentionchartDownloadError = true
          this.retentionchartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.churnRateInsightsDataError = true
          this.churnRateInsightsDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  churnRiskApiLoader(chartName?: string) {
    // CHURN RISK 
    this.churnRiskDataError = false
    if (chartName) {
      this.fullScreenChart = chartName
    }
    this.churnRiskSubject = this.marketingExploreDataRetentionApiService.ChurnRisk().subscribe((res: any) => {
      this.churnRiskDataArray = res;
      this.churnRiskDataAvailable = true
      this.dataAvailable = true

    },
      (error: any) => {
        // this.churnRiskDataAvailable = false;
        this.churnRiskDataError = true
        this.churnRiskDataErrorMsg = error.error

      });
  }
  churnRiskSummaryApiLoader() {
    // CHURN RISK SUMMARY    
    let data = [
      { churnScore: 3, count: 0 },
      { churnScore: 2, count: 0 },
      { churnScore: 1, count: 0 }
    ];
    this.churnRiskSummarySubject = this.marketingExploreDataRetentionApiService.ChurnRiskSummary().subscribe((res: any) => {
      this.churnCountData=res;
      res && res.sort((a, b) => b.churnScore - a.churnScore);
      let result = data.map(x => {
        let item = res.find(({ churnScore }) => churnScore === x.churnScore);
        return item ? item : x;
      });
      this.churnRiskSummaryDataArray = result;
    },
      (error: any) => {
        this.churnRiskSummaryDataArray = data;
      });
  }
  retentionApiLoader(chartName?: string, download?: boolean) {
    // CHURN RISK 
    this.retentionDataError = false
    if (chartName) {
      this.fullScreenChart = chartName
    }
    this.retentionSubject = this.marketingExploreDataRetentionApiService.Retention().subscribe((res: any) => {
      this.retentionDataArray = res;
      this.retentionDataAvailable = true;
      this.dataAvailable = true;

    },
      (error: any) => {
        //  this.retentionDataAvailable = false;
        this.retentionDataError = true
        this.retentionDataErrorMsg = error.error
      });
  }
  // DRILL DOWN API TRIGGER SWITCH
  getFullScreenTablesData(chartName, clickData) {
    switch (chartName) {
      case this.language.churn_Rate:
        this.churnRateInsightsDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' },
          { title: 'Export All Subscriber History (' + clickData.tier + ' / ' + clickData.tech + ')' }

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
        case this.language.churn_Rate:
          exportMenus.push(...[
            this.language.Export_Chart_Data,
            this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')',
            this.language.Export_All_Subscriber_History + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')'
          ]);
          break;
        default:
          break;
      }
    }
    return exportMenus;
  }
  resetAllData() {
    this.loadMoreButton = false
    this.churnRateInsightsDataAvailable = false
    this.churnRiskDataAvailable = false
    this.retentionDataAvailable = false;
  }
  churnRateInsightsDrillDownApiLoader(clickData) {
    this.errorReset()
    this.churnRateInsightsDrillDownSubject =
      this.marketingExploreDataRetentionApiService.ChurnRateInsightsDrillDown(clickData)
        .subscribe((res: any) => {
          this.fullScreenTableData = res
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            if (data[i].endpointId) {
              html += `<tr id="row-${data[i].endpointId}-${this.adressReplacer(data[i].serviceAddress)}">`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-angle-right pointer"  id="open-${data[i].endpointId}-${this.adressReplacer(data[i].serviceAddress)}"></i>&nbsp;${data[i].accountNumber}</td>`;
            } else {
              html += `<tr>`;
              html += `<td style="font-weight:400 !important;font-size:13px;"><i style="font-weight:400 !important;font-size:16px;" class="fa fa-ban cursor-ban" aria-hidden="true"> </i>&nbsp;${data[i].accountNumber}</td>`;
            }

            html += `
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-center">${data[i].attainableRate}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].upstreamServiceLimit != null ? data[i].upstreamServiceLimit : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].downstreamServiceLimit != null ? data[i].downstreamServiceLimit : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].speedTest != null ? data[i].speedTest : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].competitor != null ? data[i].competitor : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].streamingUsage}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].gamingUsage}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].totalUsage}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].wifiScore != null ? data[i].wifiScore : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].numOfDevices != null ? data[i].numOfDevices : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;" class="text-right">${data[i].dateOfChurn}</td>
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

        }, (error: any) => {
          this.apiErrorHandling(error)
        });
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


  adressReplacer(address) {
    return address.split(' ').join('').replaceAll(',', '').replaceAll('.', '').replaceAll('#','')
  }
  appendRowClickEvent() {
    let data = this.fullScreenTableData;
    var that = this;
    for (let i = 0; i < data.length; i++) {
      if (data[i].endpointId) {
        $(`#open-${data[i].endpointId}-${this.adressReplacer(data[i].serviceAddress)}`)[0].addEventListener("click", function () {
          that.openedRowDetail = {
            chartId: that.fullScreenChart,
            endPointId: data[i].endpointId,
            data: data[i],
            serviceAddress: data[i].serviceAddress
          };

          that.openInnerCharts(that.openedRowDetail);
        }, false);
      }

    }
  }
  openInnerCharts(data) {
    $(".delete").remove();
    if (Object.keys(this.openedRowDetailOld).length != 0) {
      if (this.openedRowDetail.endPointId == this.openedRowDetailOld.endPointId && this.openedRowDetail.serviceAddress == this.openedRowDetailOld.serviceAddress) {
        $(`#open-${this.openedRowDetail.endPointId}-${this.adressReplacer(this.openedRowDetail.serviceAddress)}`).removeClass('fa-angle-down');
        $(`#open-${this.openedRowDetail.endPointId}-${this.adressReplacer(this.openedRowDetail.serviceAddress)}`).addClass('fa-angle-right');
        this.openedRowDetailOld = {};
        //this.exportMenu.splice(this.exportMenu.length - 1, 1)
        return;
      } else {
        $(`#open-${this.openedRowDetailOld.endPointId}-${this.adressReplacer(this.openedRowDetailOld.serviceAddress)}`).removeClass('fa-angle-down');
        $(`#open-${this.openedRowDetailOld.endPointId}-${this.adressReplacer(this.openedRowDetailOld.serviceAddress)}`).addClass('fa-angle-right');

        $(`#open-${this.openedRowDetail.endPointId}-${this.adressReplacer(this.openedRowDetail.serviceAddress)}`).removeClass('fa-angle-right');
        $(`#open-${this.openedRowDetail.endPointId}-${this.adressReplacer(this.openedRowDetail.serviceAddress)}`).addClass('fa-angle-down');

        // swapping the account number
        //this.exportMenu.splice(this.exportMenu.length - 1, 1)
        //this.exportMenu.push({ title: 'Export Subscriber History (' + data.data.accountNumber + ')' });
        this.exportMenuSingleAccount = data
      }
    } else {
      $(`#open-${data.endPointId}-${this.adressReplacer(data.serviceAddress)}`).removeClass('fa-angle-right');
      $(`#open-${data.endPointId}-${this.adressReplacer(data.serviceAddress)}`).addClass('fa-angle-down');
      // add the export

      //this.exportMenu.push({ title: 'Export Subscriber History (' + data.data.accountNumber + ')' });
      this.exportMenuSingleAccount = data
    }
    this.openedRowDetailOld = this.openedRowDetail;
    this.churnRateInsightsInlineChartsApiLoader(data);
    var newrow = `<tr class="delete">
                      <td colspan='21'>
                        <div class="row p-2">
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 380px !important;
                              margin-bottom: 30px !important;" >
                              <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                              margin-bottom: 0;">
                                    <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Subscriber Usage</div> 
                                  </div>
                                  <div class="card-body py-0">
                                    <span class="border pl-1"  style="width:max-width;">
                                      <span style="font-size: 14px;"> 6 Month Total Usage: <span id="churn-subscriber-usage-total" style="font-size: 10px;">0</span> GB &nbsp;</span>
                                    </span>
                                     <div id="churn-subscriber-usage" style="height: 280px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;" >
                              <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                              margin-bottom: 0;">
                                    <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Service Limits</div> 
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="churn-service-limits" style="height: 300px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;" >
                              <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                              margin-bottom: 0;">
                                    <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Competitor Visit and Speed Test Minutes</div> 
                                  </div>
                                  <div class="card-body py-0">
                                    <span class="border pl-1"  style="width:max-width;">
                                      <span style="font-size: 14px;"> Total Competitor and Speed Test Minutes: <span id="churn-speed-test-total" style="font-size: 10px;">0</span> &nbsp;</span>
                                    </span>
                                     <div id="churn-competitor-visit-and-speed-test" style="height: 280px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;" >
                              <div class="inlinechartheader" style="padding: .75rem .75rem 0;
                              margin-bottom: 0;">
                                    <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Devices and Wi-Fi Score Trend</div> 
                                  </div>
                                  <div class="card-body py-0">
                                     <div id="churn-devices-and-wifi-score-trend" style="height: 280px"></div>  
                                  </div>                      
                              </div>
                           </div>
                           <div class="col-md-4 inner-charts-wrapper">
                              <div class="card table-inner-chart-card" style="
                              height: 350px !important;
                              margin-bottom: 30px !important;" >
                              <div class="inlinechartheader" style="padding: .75rem 1.25rem 0 1.25rem;
                              margin-bottom: 0;">
                                    <div class="chart-heading mb-2 pl-2" style="font-size: 24px;">Service Tier Change Events</div> 
                                  </div>
                                  <div class="card-body py-0">
                                    <div class="subscriber pl-1 fullscreen-inline-info subscriber-info" id="churn-service-tier-info-div">
                                      <span  id="churn-service-tier-info" style="font-size: 14px;"> No Service Tier Changes for User  </span>
                                    </div>
                                     <div id="churn-service-tier-change" style="height: 280px"></div>  
                                  </div>                      
                              </div>
                           </div>
                        </div>
                      </td>
                    </tr>
                    `;
    $(`#row-${this.openedRowDetail.endPointId}-${this.adressReplacer(this.openedRowDetail.serviceAddress)}`).after(newrow);

  }
  inlineChartOptionsLoader() {
    this.exportDataChartOptionsService.churnRateSubscriberUsageOptions(this.subscriberUsageData).subscribe(
      (data: {}) => {
        Highcharts.chart('churn-subscriber-usage', data);
      });
    this.exportDataChartOptionsService.churnRateServiceLimitOptions(this.serviceLimitData).subscribe(
      (data: {}) => {
        Highcharts.chart('churn-service-limits', data);
      });
    this.exportDataChartOptionsService.subscriberCompetitorOptions(this.competitorVisitData).subscribe(
      (data: {}) => {
        Highcharts.chart('churn-competitor-visit-and-speed-test', data);
      });
    this.exportDataChartOptionsService.acquisitionWiFiTrendsOptions(this.wiFiScoreData).subscribe(
      (data: {}) => {
        Highcharts.chart('churn-devices-and-wifi-score-trend', data);
      });
    this.exportDataChartOptionsService.serviceTierOptions(this.serviceTierEventsData).subscribe(
      (data: {}) => {
        Highcharts.chart('churn-service-tier-change', data);
      });


  }



  churnRateInsightsInlineChartsApiLoader(rowDetails) {
    this.errorReset()
    this.churnRateInsightsInlineChartsSubject =
      this.marketingExploreDataRetentionApiService.ChurnRateInsightsInlineCharts(this.clickData, rowDetails)
        .subscribe((res: any) => {
          this.singleLineUserChartData=res;
          let data = this.marketingExploreDataAssignerService.churnRateInsightsInlineChartDataFormatter(res);
          this.competitorVisitData = data.competitor;
          this.wiFiScoreData = data.deviceTrend;
          this.serviceTierEventsData = data.serviceTier;
          this.subscriberUsageData = data.serviceUsage;
          this.serviceLimitData = data.serviceLimit;
          let dataSum = false;
          if (this.serviceTierEventsData) {
            this.serviceTierEventsData.series[0].data.forEach(el => {
              dataSum = el > 0 ? false : true
            });

          }
          setTimeout(() => {
            if (dataSum) {
              $('#churn-service-tier-info-div').show();
            } else {
              $('#churn-service-tier-info-div').hide();
            }
          }, 200);
          $('#churn-speed-test-total').html(this.competitorVisitData.totals);
          $('#churn-subscriber-usage-total').html(this.subscriberUsageData.totals);
          this.inlineChartOptionsLoader();
        }, (error: any) => {
          this.apiErrorHandling(error)
        });
  }

  // DRILL DOWN EXPORT API TRIGGER SWITCH
  drillDownExportApiLoader(chartName, clickData) {
    switch (chartName) {
      case this.language.churn_Rate:
        this.churnRateInsightsDrillDownApiExportLoader(clickData)
        break;
      default:
        break;
    }
  }
  // CHURN RATE INSIGHTS DRILL DOWN SUBSRIBER LIST
  churnRateInsightsDrillDownApiExportLoader(clickData) {
    this.errorReset()
    $('#retentionChartFullViewDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataRetentionApiService.ChurnRateInsightsDrillDownExport(clickData)
    this.churnRateInsightsDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.churnRateInsightsDrillDownExportSubject) {
        setTimeout(() => {
          $('#retentionChartFullViewDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#retentionChartFullViewDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  // CHURN RATE ALL HISTORY
  churnRateInsightsDrillDownHistoryApiExportLoader(clickData) {
    this.errorReset()
    $('#retentionChartFullViewDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataRetentionApiService.ChurnRateInsightsDrillDownHistoryExport(clickData)
    this.churnRateInsightsDrillDownHistoryExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.churnRateInsightsDrillDownHistoryExportSubject) {
        setTimeout(() => {
          $('#retentionChartFullViewDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }

      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#retentionChartFullViewDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }

  // CHURN RATE Single HISTORY
  churnRateInsightsDrillDownHistoryAccountApiExportLoader(clickData, exportData) {
    this.errorReset()
    $('#retentionChartFullViewDownlod').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataRetentionApiService.ChurnRateInsightsDrillDownHistorySingleExport(clickData, exportData)
    this.churnRateInsightsDrillDownHistoryExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.churnRateInsightsDrillDownHistoryExportSubject) {
        setTimeout(() => {
          $('#retentionChartFullViewDownlod').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#retentionChartFullViewDownlod').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }



  // CHURN RISK
  churnRiskExportApiLoader() {
    this.errorReset()
    $('#churnRiskDownloadSection').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataRetentionApiService.ChurnRiskExport()
    this.churnRiskExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.churnRiskExportSubject) {
        setTimeout(() => {
          $('#churnRiskDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#churnRiskDownloadSection').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  // RETENTION
  retentionExportApiLoader() {
    this.errorReset()
    $('#RetentionDownloadSection').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataRetentionApiService.RetentionExport()
    this.retentionExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.retentionExportSubject) {
        setTimeout(() => {
          $('#RetentionDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#RetentionDownloadSection').removeClass('spinnershow');
      this.apiErrorHandling(error)
    });
  }
  apiErrorHandling(error) {
    this.churnRateInsightsDataError = true
    this.churnRateInsightsDataErrorMsg = this.marketingCommonService.errorHandling(error)

  }
  downloadFunction(chartName, exportMenu?: string) {
    if (exportMenu && exportMenu.includes('(')) {
      if (exportMenu.includes('History')) {
        if (exportMenu.includes('All')) {
          this.churnRateInsightsDrillDownHistoryApiExportLoader(this.clickData)
        } else {
          // NEED TO WORK         
          this.churnRateInsightsDrillDownHistoryAccountApiExportLoader(this.clickData, this.exportMenuSingleAccount)
        }
      } else {
        this.drillDownExportApiLoader(chartName, this.clickData)
      }
    } else {
      this.getFullScreenChartOptions(chartName, true)
    }
  }

  fullScreenCloseFunction() {
    this.fullScreen = false
    this.clickData = undefined;
    //this.exportMenu = undefined;
    this.resetAllData()
    this.clearTableBody();
    this.baseApiLoader()
  }
  clearTableBody() {
    $('#append-table-list').empty();
  }
  retentionChartModalOpen(modeldata) {
    this.popup_heading = modeldata
    switch (modeldata) {
      case this.language.churn_Rate:
        this.dialogService.open(this.retensionRateChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Churn_Risk:
        this.dialogService.open(this.retensionRiskChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Retention:
        this.dialogService.open(this.retensionChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
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
    if (this.churnRateInsightsSubject) {
      this.churnRateInsightsSubject.unsubscribe();
    }
    if (this.churnRiskSubject) {
      this.churnRiskSubject.unsubscribe();
    }
    if (this.churnRiskSummarySubject) {
      this.churnRiskSummarySubject.unsubscribe();
    }
    if (this.retentionSubject) {
      this.retentionSubject.unsubscribe();
    }
    if (this.churnRiskExportSubject) {
      this.churnRiskExportSubject.unsubscribe();
    }

    if (this.retentionExportSubject) {
      this.retentionExportSubject.unsubscribe();
    }
    if (this.churnRateInsightsDrillDownSubject) {
      this.churnRateInsightsDrillDownSubject.unsubscribe();
    }
    if (this.churnRateInsightsDrillDownExportSubject) {
      this.churnRateInsightsDrillDownExportSubject.unsubscribe();
    }
    if (this.churnRateInsightsDrillDownHistoryExportSubject) {
      this.churnRateInsightsDrillDownHistoryExportSubject.unsubscribe();
    }
    if (this.churnRateInsightsInlineChartsSubject) {
      this.churnRateInsightsInlineChartsSubject.unsubscribe();
    }
  }
}
