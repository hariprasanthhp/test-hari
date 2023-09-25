import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { MarketingExploreDataDeviceApiService } from './marketing-explore-data-device-api.service';
import { DatePipe } from '@angular/common';
import { HomeChartOptionsService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { combineLatest, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { catchError, map } from 'rxjs/operators';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { MarketingExploreDataDownloadDataService } from '../shared/services/explore-data-download.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Spanish as SpanishJSON } from 'src/assets/language/spanish.service';
import { German as GermanJSON } from 'src/assets/language/german.service';
import { Title } from '@angular/platform-browser';
const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
@Component({
  selector: 'app-marketing-device-chart',
  templateUrl: './marketing-device-chart.component.html',
  styleUrls: ['./marketing-device-chart.component.scss']
})
export class MarketingDeviceChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  language: any;
  languageSubject;
  popup_heading: any
  clickData: any;

  chartAvailable: boolean = false;
  fullScreen: boolean = false;
  fullScreenTableAvailable: boolean = false;
  filterDays: any = '30';
  fullScreenChart: any
  fullScreenDownload: boolean = false
  exportMenuAvailable: boolean = false;

  deviceDownloadContent: any
  deviceCloseContent: any

  // EDGE SUIT
  loading: boolean = true;
  chartData: any;
  chartDataOptions: any;
  productIQ: any[];
  experienceIQ: any[];
  arloData: any[];
  servifyData: any[];
  ProtectIQ: any;
  ExperienceIQ: any;
  Arlo: any;
  servify: any;
  ORG_ID: any;
  combineLatest: any;
  errorInfo: string = '';
  error: boolean = false;
  parallelReqSubscribtion: any;

  // DATA VARIABLES
  commandIQSatusDataObject: any;
  systemModelDataObject: any;
  // NORMAL VIEW
  commandIQStatusSubject: any;
  systemModelSubject: any;
  commandIQStatusDataAvailable: boolean = false;
  revenueEdgeSuitsDataAvailable: boolean = false;
  systemModelDataAvailable: boolean = false;
  devicechartDownloadError: boolean = false;
  devicechartDownloadErrorMsg: any;
  // ERROR
  commandIQStatusError: boolean = false;
  commandIQStatusErrorMsg: any;
  revenueEdgeSuitsError: boolean = false;
  revenueEdgeSuitsErrorMsg: any;
  systemModelError: boolean = false;
  systemModelErrorMsg: any;
  baseHeight: any;
  moreThanOne: boolean;
  nodata: boolean;
 // variables for test cases
  ciqChartData:any;
  systeModelChartData:any;
  revenueResponseData:any;

  @ViewChild('deviceChartModal', { static: true }) private deviceChartModal: TemplateRef<any>;
  constructor(
    private dialogService: NgbModal,
    private marketingExploreDataDeviceApiService: MarketingExploreDataDeviceApiService,
    private exportDataChartOptionsService: ExportDataChartOptionsService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService,
    private chartOptions: HomeChartOptionsService,
    private sso: SsoAuthService,
    private systemservice: FoundationManageService,
    private commonOrgService: CommonService,
    private exportExcelService: ExportExcelService,
    private downloadFileNameService: DownloadFileNameService,
    private dateUtils: DateUtilsService,
    private English: EnglishJSON,
    private French: FrenchJSON,
    private Spanish: SpanishJSON,
    private German: GermanJSON,
    private titleService: Title,

    private marketingExploreDataDownloadDataService: MarketingExploreDataDownloadDataService,

  ) { }

  ngOnInit(): void {
    
    this.ORG_ID = this.sso.getOrgId();
    this.filterDays = '30';
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.titleService.setTitle(`${this.language["Systems"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      this.language = data;
      this.baseApiLoader();
      this.revenueEdgeSuitsApiLoader();
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.command_status_Chart || chartname == this.English.data.command_status_Chart || chartname == this.Spanish.data.command_status_Chart || chartname == this.German.data.command_status_Chart) {
          this.fullScreenChart = this.language.command_status_Chart;
          this.commandIQStatusApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.revenue_edge_suite_Chart || chartname == this.English.data.revenue_edge_suite_Chart || chartname == this.Spanish.data.revenue_edge_suite_Chart || chartname == this.German.data.revenue_edge_suite_Chart) {
          this.fullScreenChart = this.language.revenue_edge_suite_Chart;
          this.getIqSuitesDatas(this.fullScreenChart);
        }
        else if (chartname == this.French.data.system_by_model || chartname == this.English.data.system_by_model || chartname == this.Spanish.data.system_by_model || chartname == this.German.data.system_by_model) {
          this.fullScreenChart = this.language.system_by_model;
          this.systemModelApiLoader(this.fullScreenChart);
        }

      }
    });
    this.titleService.setTitle(`${this.language["Systems"]}-${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    // FOR SEARCH FILTER
    this.baseApiLoader();
  }
  baseApiLoader() {
    this.commandIQStatusApiLoader();
    this.getIqSuitesDatas()
    this.systemModelApiLoader()
  }
  commandIQStatusApiLoader(chartName?: string, download?: boolean) {
    this.commandIQStatusError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.commandIQStatusSubject = this.marketingExploreDataDeviceApiService.CommandIQStatus().subscribe((res: any) => {
      this.commandIQSatusDataObject = res;
      let chartData:any = this.chartDataModify(this.commandIQSatusDataObject.histories);
      if (download) {
        $('#deviceDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.commandIQStatusDataForming(chartData);
        let fname = this.downloadFileNameService.generateDownloadPeriodName(this.language.command_status_Chart);
        if (chartData) {
          setTimeout(() => {
            $('#deviceDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        if(chartData?.categories.length == 30){
        this.exportDataChartOptionsService.commandIQStatus30recordOptions(chartData, 'Subscribers', true).subscribe((data: any) => {
          this.ciqChartData=data;
          this.commandIQStatusDataAvailable = true;
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
              that.fullScreenExpandFunction(that.language.command_status_Chart, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'command-status-IQ-chart', data)
          this.chartAvailable = true
        })
      }else{
        this.exportDataChartOptionsService.commandIQStatusOptions(chartData, 'Subscribers', true).subscribe((data: any) => {
          this.ciqChartData=data;
          this.commandIQStatusDataAvailable = true;
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
              that.fullScreenExpandFunction(that.language.command_status_Chart, clickData)
            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'command-status-IQ-chart', data)
          this.chartAvailable = true
        })
      }
      }

    },
      (error: any) => {
        this.commandIQStatusError = true
        this.commandIQStatusErrorMsg = this.marketingCommonService.errorHandling(error)
        // console.log(this.commandIQStatusErrorMsg)
        // console.log(this.commandIQStatusError)
      });
  }
  getIqSuitesDatas(chartName?: string, download?: boolean) {
    this.revenueEdgeSuitsError = false;
    this.loading = true;
    let requestEndpoints = [];
    requestEndpoints.push(
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=CIEP&days=${this.filterDays ? this.filterDays : '30'}`),
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=CIES&days=${this.filterDays ? this.filterDays : '30'}`),
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=ARLO&days=${this.filterDays ? this.filterDays : '30'}`),
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=SERVIFY&days=${this.filterDays ? this.filterDays : '30'}`),
    )
    const requests = [];
    requestEndpoints.forEach(endpoint => {
      const req = this.systemservice.callRestApi(endpoint).pipe(map((res: any) => {
        this.revenueResponseData=res;
        return res;
      }),
        catchError((error: any) => {
          //  console.log(error)
          this.revenueEdgeSuitsError = true;
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatest = combineLatest(requests);    
    this.makeParallelRequest(chartName, download);
  }
  makeParallelRequest(chartName?: string, download?: boolean) {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.error = false;

      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0]);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }

      if (response[1] && response[1].error) {
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[1] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }

      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2]);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3]);
        this.servifyData = [];
      } else {
        let servifyData = response[3] ? response[3] : [];
        this.servifyData = servifyData.histories
      }
      if (!this.error) {
        setTimeout(() => {
          this.revenueEdgeSuitsApiLoader(chartName, download);
        }, 1500)
      }

    }, (err: HttpErrorResponse) => {
      // console.log(err)
      this.loading = false;
      this.revenueEdgeSuitsError = true;
      this.revenueEdgeSuitsDataAvailable = false;
      //this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    })
  }
  revenueEdgeSuitsApiLoader(chartName?: string, download?: boolean) {
    let chartData:any = this.revenueChartDataModify(this.productIQ, this.experienceIQ, this.arloData, this.servifyData);
  
   // let chartData1 = this.revenueChartDDataModify(this.productIQ, this.experienceIQ, this.arloData, this.servifyData)
    this.revenueEdgeSuitsError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    if (download) {
      $('#revenueEdgeSuitsDownloadSection').addClass('spinnershow');
      this.fullScreenDownload = true;
      let data = this.marketingExploreDataDownloadDataService.revenueEdgeSuitsDataForming(chartData);
      let fname = this.downloadFileNameService.generateDownloadPeriodName(this.language.revenue_edge_suite_Chart);
      if (chartData) {
        setTimeout(() => {
          $('#revenueEdgeSuitsDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
        }, 1000);
      }
      // console.log('formate Data ', data);
      this.exportExcelService.downLoadCSVRevenue(fname, data);
    } else {
if (chartData?.categories.length === 30){
  this.chartOptions.getCommonSubscribersChart30recordsOptions(chartData, 'Subscribers', true).subscribe((res: any) => {
    this.chartDataOptions = res;
    var that = this;
    this.revenueEdgeSuitsDataAvailable = true;
    res.plotOptions.series.point.events = {
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
        that.fullScreenExpandFunction(that.language.revenue_edge_suite_Chart, clickData)
      }
    };
    setTimeout(() => {
      this.Highcharts.chart(chartName ? chartName : 'revenue-edge-graph-div-system', this.chartDataOptions);
      this.loading = false;
      this.chartAvailable = true
    }, 500)

  });
}else{
      this.chartOptions.getCommonSubscribersChartOptions(chartData, 'Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        var that = this;
        this.revenueEdgeSuitsDataAvailable = true;
        res.plotOptions.series.point.events = {
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
            that.fullScreenExpandFunction(that.language.revenue_edge_suite_Chart, clickData)
          }
        };
        setTimeout(() => {
          this.Highcharts.chart(chartName ? chartName : 'revenue-edge-graph-div-system', this.chartDataOptions);
          this.loading = false;
          this.chartAvailable = true
        }, 500)

      });
    }
    }

  }

  resetDataFunction() {
    this.commandIQStatusDataAvailable = false;
    this.revenueEdgeSuitsDataAvailable = false;
    this.systemModelDataAvailable = false;
  }
  // deviceChartModalOpen(modeldata) {
  //   this.popup_heading = modeldata

  //   switch (modeldata) {
  //     case this.language.command_status_Chart:
  //       this.dialogService.open(this.deviceChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  //       break;

  //   }
  // }
  chartDataModify(cData) {
    let value = [], series = [], categories = [];
    let data = {};
    cData = this.chartOptions.sortByTimestamp(cData, 'date');
    cData.forEach(el => {
      categories.push(this.reverseString(el.date, 'MM/dd/yy'))
      el['value'] = el.value ? el.value : 0;
      //el.value = el.value + Math.floor(Math.random() * 1000) + 1500;
      value.push(parseInt(el.value));
    });
    series = [
      {
        name: 'CommandIQ',
        data: value
      }
    ];
    data = {
      series: series,
      categories: categories
    }
    return data;
  }
  revenueChartDataModify(cData1, cData2, cData3, cData4) {
    let ExperienceIQ = [], ProtectIQ = [], Arlo = [], servify = [], series = [], categories = [], countper = [];
    let data = {};
    cData1 = this.chartOptions.sortByTimestamp(cData1, 'date');
    cData1?.forEach(el1 => {
      categories.push(this.reverseString(el1.date, 'MM/dd/yy'))
      el1['value'] = el1.value ? el1.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      ExperienceIQ.push(parseInt(el1.value));
      // suspended.push(parseInt(el.degrade));
      // terminated.push(el.degrade - 1000);
      // servify.push(el.outage + 1000);

    });
   
    cData2 = this.chartOptions.sortByTimestamp(cData2, 'date');
    cData2?.forEach(el2 => {
      //categories.push(this.reverseString(el2.date, 'M/d/yy'))
      el2['value'] = el2.value ? el2.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      ProtectIQ.push(parseInt(el2.value));

    });
  
    cData3 = this.chartOptions.sortByTimestamp(cData3, 'date');
    cData3?.forEach(el3 => {
      //categories.push(this.reverseString(el3.date, 'M/d/yy'))
      el3['value'] = el3.value ? el3.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      Arlo.push(parseInt(el3.value));
    });
    
    cData4 = this.chartOptions.sortByTimestamp(cData4, 'date');
    cData4?.forEach(el4 => {
      //categories.push(this.reverseString(el4.date, 'M/d/yy'))
      el4['value'] = el4.value ? el4.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      servify.push(parseInt(el4.value));
    });
    

    series = [
      {
        name: 'ExperienceIQ',
        data: ExperienceIQ
      },
      {
        name: 'ProtectIQ',
        data: ProtectIQ
      },
      {
        name: 'Arlo',
        data: Arlo
      },
      {
        name: 'Servify',
        data: servify
      }
    ];
    data = {
      series: series,
      categories: categories
    }
    return data;
  }

  revenueChartDDataModify(cData1, cData2, cData3, cData4) {
    let ExperienceIQ = [], ProtectIQ = [], Arlo = [], servify = [], series = [], categories = [], countper = [];
    let data = {};
    cData1 = this.chartOptions.sortByTimestamp(cData1, 'date');
    cData1.forEach(el1 => {
      categories.push(this.reverseString(el1.date, 'MM/dd/yy'))
      el1['value'] = el1.value ? el1.value : 0;
      ExperienceIQ.push(parseInt(el1.value));
    });

    cData2 = this.chartOptions.sortByTimestamp(cData2, 'date');
    cData2.forEach(el2 => {
      el2['value'] = el2.value ? el2.value : 0;
      ProtectIQ.push(parseInt(el2.value));

    });
    cData3 = this.chartOptions.sortByTimestamp(cData3, 'date');
    cData3.forEach(el3 => {
      el3['value'] = el3.value ? el3.value : 0;
      Arlo.push(parseInt(el3.value));
    });
    cData4 = this.chartOptions.sortByTimestamp(cData4, 'date');
    cData4.forEach(el4 => {
      el4['value'] = el4.value ? el4.value : 0;
      servify.push(parseInt(el4.value));
    });
    ExperienceIQ.pop();
    Arlo.pop();
    ProtectIQ.pop();
    categories.pop();
    servify.pop();

    series = [
      {
        name: 'ExperienceIQ',
        data: ExperienceIQ
      },
      {
        name: 'ProtectIQ',
        data: ProtectIQ
      },
      {
        name: 'Arlo',
        data: Arlo
      },
      {
        name: 'Servify',
        data: servify
      }
    ];
    data = {
      series: series,
      categories: categories
    }
    return data;
  }

  downloadFunction(chartName, exportMenu?: string) {
    if (exportMenu && exportMenu.includes('(')) {
      this.commandIQStatusApiLoader(chartName, this.clickData)
    } else {
      this.getFullScreenChartOptions(chartName, true)
    }
  }
  fullScreenExpandFunction(chartName?: any, clickData?: any) {
    if (!this.fullScreen) {
      this.chartAvailable = false;
      this.fullScreenTableAvailable = false;
      this.getFullScreenChartOptions(chartName)
    }
    this.fullScreen = true
    this.fullScreenChart = chartName;
    localStorage.setItem("fullScreenChart", chartName)

    // let sameClickData = JSON.stringify(clickData) == JSON.stringify(clickData)
    // if (!sameClickData) {
    //   // this.tableLoader = true;
    //   // this.clearTableBody();
    //   this.fullScreenTableAvailable = false;
    //   this.getFullScreenTablesData(chartName, clickData)
    // }
    this.clickData = clickData;
  }

  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    if (this.language) {
      this.deviceDownloadContent = this.language.subs_download_tip;
      this.deviceCloseContent = this.language.command_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language.command_status_Chart:
        if (download) {
          this.commandIQStatusApiLoader(chartName, download)
        } else {
          this.commandIQStatusApiLoader(chartName)
        }
        break;
      case this.language.revenue_edge_suite_Chart:
        if (download) {
          this.getIqSuitesDatas(chartName, download)
        } else {
          this.getIqSuitesDatas(chartName)
        }
        break;
      case this.language.system_by_model:
        if (download) {
          this.systemModelApiLoader(chartName, download)
        } else {
          this.systemModelApiLoader(chartName)
        }
        break;
      default:
        break;
    }
  }
  fullScreenCloseFunction() {
    this.fullScreen = false
    this.clickData = undefined;
    // this.exportMenu = undefined;
    this.resetDataFunction();
    this.baseApiLoader();

  }
  sortByTimestamp(list, key) {
    list?.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      return x[key] - y[key];
    });
    return list;
  }

  reverseString(str, format?) {
    //debugger;
    var string = str.toString();
    var month = parseInt(string.slice(4, 6)) - (1)
    let dateObj = new Date();
    dateObj.setFullYear(string.slice(0, 4));
    dateObj.setMonth(month);
    dateObj.setDate(string.slice(6, 8));
    let pipe = new DatePipe('en-US');
    let dateString = '';
    if (format) {
      dateString = `${pipe.transform(dateObj, format)}`;
    } else {
      dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    }

    return dateString;
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.systemModelErrorMsg = this.marketingCommonService.errorHandling(err);
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
  }
 
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    // BASIC API
    if (this.commandIQStatusSubject) {
      this.commandIQStatusSubject.unsubscribe();
    }
    if (this.systemModelSubject) {
      this.systemModelSubject.unsubscribe();
    }
  }
  systemModelApiLoader(chartName?: string, download?: boolean) {
    this.systemModelError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.systemModelSubject = this.marketingExploreDataDeviceApiService.getSubscriberSystemsModel().subscribe((res: any) => {
      //this.systemModelDataObject = res;
      //  console.log(this.systemModelDataObject)

      // if (this.systemModelDataObject.length == 30) {
      //   let last_index3 = this.systemModelDataObject[this.systemModelDataObject.length - 1]
      //   this.systemModelDataObject.push(last_index3)
      // } else {
        this.systemModelDataObject = res;
     // }
      let chartData = this.chartDataModifySystem(this.systemModelDataObject);
      if (download) {
        $('#systemmodelDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.systemmodel(chartData);
        let fname = this.downloadFileNameService.generateDownloadPeriodName(this.language.system_by_model);
        if (chartData) {
          setTimeout(() => {
            $('#systemmodelDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
if(this.systemModelDataObject.length == 30){
  this.exportDataChartOptionsService.getCommonSubscribersChartOptionsfor30records(chartData, 'Systems', true).subscribe((data: any) => {
    this.systeModelChartData=data;
    this.systemModelDataAvailable = true;
    let chart = Highcharts.chart(chartName ? chartName : 'systemModel-graph-div-system', data)
    this.chartAvailable = true
  })
}else{
        this.exportDataChartOptionsService.getCommonSubscribersChartOptionsSystemMyModel(chartData, 'Systems', true).subscribe((data: any) => {
          this.systeModelChartData=data;
          this.systemModelDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'systemModel-graph-div-system', data)
          this.chartAvailable = true
        })

      }
    }
    },
      (error: any) => {
        this.loading = false;
        this.systemModelError = true
        this.systemModelErrorMsg = this.marketingCommonService.errorHandling(error);
      });
  }


  chartDataModifySystem(cData) {
    //debugger;
    let seriesName = [];
    if (cData.length) {
      cData.forEach((element: any) => {
        for (let key in element) {
          if (seriesName.indexOf(key) === -1 && key !== 'time') {
            seriesName.push(key);
          }
        }
      });
    }
    // console.log(seriesName);
    let categories = [];
    let data = {};
    cData = this.chartOptions.sortByTimestamp(cData, 'time');
    cData.forEach(val => {
      seriesName.forEach(sn => {
        val[sn] = val[sn] ? val[sn] : 0;
      })
    })
    let seriesData = [], time: string;
    seriesName.forEach(el => {
      var obj: any = {};
      obj.name = el;
      obj.data = [];
      cData.forEach(cd => {
        time = this.dateUtils.getChartFormatDate(cd.time, 'M/d/yy', true);
        if (categories.indexOf(time) === -1) {
          categories.push(time);
        }
        //categories.push(this.dateUtils.getChartFormatDate(cd.time, 'M/d/yy', true));
        for (let type in cd) {
          if (type === el) {
            obj.data.push(cd[type] == undefined ? 0 : cd[type]);
          }
        }
      });
      seriesData.push(obj);
    });

    if (seriesData.length == 0) {
      seriesData.push({
        name: '',
        data: []
      })
    }
    this.baseHeight = '300px';
    if (seriesData.length > 3) {
      let noOfRows = (Math.ceil(seriesData.length / 3)) - 1
      this.baseHeight = `${300 + (noOfRows * 15)}px`;
      this.moreThanOne = true;
    }

    data = {
      series: seriesData,
      categories: categories
    }
    return data;
  }
}


