import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingExploreDataServiceApiService } from './marketing-explore-data-service-api.service';
import { MarketingExploreDataAssignerService } from '../shared/services/data-assigners.service';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { MarketingExploreDataDownloadDataService } from '../shared/services/explore-data-download.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingExploreCommonService } from '../shared/services/explore-data-common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingExploreDataBasicApiService } from '../explore-data-basic-api.service';
import { MarketingExploreDataSubscriberApiService } from '../marketing-subscrib-chart/marketing-explore-data-subscriberapi.service';
import { MarketingApiService } from 'src/app/marketing/shared/services/marketing-api.sevice';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { Spanish as SpanishJSON } from 'src/assets/language/spanish.service';
import { German as GermanJSON } from 'src/assets/language/german.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-marketing-service-chart',
  templateUrl: './marketing-service-chart.component.html',
  styleUrls: ['./marketing-service-chart.component.scss']
})
export class MarketingServiceChartComponent implements OnInit, OnDestroy {
  Highcharts = Highcharts;
  language: any;
  languageSubject;
  popup_heading: any

  houseHoldDeviceTrendsSubscribers: any;

  clickData: any;
  chartAvailable: boolean = false;
  tableLoader: boolean = false;
  fullScreenTableAvailable: boolean = false;
  fullScreenTableDataNotAvailable: boolean = false;
  loadMoreButton: boolean = false;
  loadingBtn: boolean = false;
  //exportMenu: any;
  exportMenuAvailable: boolean = false;
  // DATA VARIABLES
  subscriberTierTechDataObject: any;
  householdDevicesTrendsDataObject: any;
  serviceModuleAdoptionRateDataObject: any;
  wifiDeviceCategoryTrendsDataObject: any;
  blockThreatsInsightsDataArray: any;
  wifiDeviceCategoryTrendsDataObjectLength: any

  // NORMAL VIEW
  searchFilterSubject: any
  subscriberTierTechSubject: any;
  householdDevicesTrendsSubject: any;
  devicePerHouseHoldSubject: any;
  serviceModuleAdoptionRateSubject: any;
  wifiDeviceCategoryTrendsSubject: any;
  blockThreatsInsightsSubject: any;
  commandIQInsightsSubject: any;

  // DRILL DOWN
  subscribersTierTechDrillDownSubject: any;
  blockThreatsInsightsDrillDownSubject: any;
  ecoModuleAdoptionRateSubject: any;
  ecoModuleAdoptionRateDataObject: any;
  // DRILL DOWN EXPORT 
  subscribersTierTechDrillDownExportSubject: any;
  blockedThreatsInsightsDrillDownExportSubject: any;
  serviceModuleAdoptionRateExportSubject: any



  subscriberTierTechDataAvailable: boolean = false;
  householdDevicesDataAvailable: boolean = false;
  serviceModuleAdoptionRateDataAvailable: boolean = false;
  wifiDeviceCategoryTrendsDataAvailable: boolean = false;
  blockThreatsInsightsDataAvailable: boolean = false;
  commandIQInsightsDataAvailable: boolean = false;
  fullScreenDownload: boolean = false


  // ERROR
  subscriberTierTechDataError: boolean = false;
  subscriberTierTechDataErrorMsg: any;
  householdDevicesDataError: boolean = false;
  householdDevicesDataErrorMsg: any;
  serviceModuleAdoptionRateDataError: boolean = false;
  serviceModuleAdoptionRateDataErrorMsg: any;
  wifiDeviceCategoryTrendsDataError: boolean = false;
  wifiDeviceCategoryTrendsDataErrorMsg: any;
  blockThreatsInsightsDataError: boolean = false;
  blockThreatsInsightsDataErrorMsg: any;
  commandIQInsightsDataError: boolean = false;
  commandIQInsightsDataErrorMsg: any;
  ecoModuleAdoptionRateDataAvailable: boolean = false;
  ecoModuleAdoptionRateDataError: boolean = false
  ecoModuleAdoptionRateDataErrorMsg: any;
  fullcharterrormsg: any;
  servicechartDownloadError: any
  servicechartDownloadErrorMsg: any

  fullScreen: boolean = false
  fullScreenChart: any
  // emptyDataValue: boolean = false;

  commandIQ_Array: any

  serviceFullScreenContent: any
  serviceDownloadContent: any
  serviceCloseContent: any

  isusagebydata: boolean = false

  //chart variable for test cases
  serviceTierChartData:any;
  houseHoldTrendsData:any;
  houseHoldChartData:any;
  serviceAdoptionChartData:any;
  serviceAdoptionData:any;
  ecoAdoptionData:any;
  ecoAdoptionChartData:any;
  wifiDeviceData:any;
  wifiChartData:any;
  blockThreatsChartData:any;
  blockThreatsData:any;



  @ViewChild('serviceChartModal', { static: true }) private serviceChartModal: TemplateRef<any>;
  @ViewChild('serviceHouseChartModal', { static: true }) private serviceHouseChartModal: TemplateRef<any>;
  @ViewChild('serviceAdoptionChartModal', { static: true }) private serviceAdoptionChartModal: TemplateRef<any>;
  @ViewChild('serviceWiFiChartModal', { static: true }) private serviceWiFiChartModal: TemplateRef<any>;
  @ViewChild('serviceBlockedChartModal', { static: true }) private serviceBlockedChartModal: TemplateRef<any>;
  @ViewChild('serviceInsightsChartModal', { static: true }) private serviceInsightsChartModal: TemplateRef<any>;
  //@ViewChild('serviceInsightsChartModal', { static: true }) private serviceInsightsChartModal: TemplateRef<any>;


  constructor(
    private dialogService: NgbModal,
    private sso: SsoAuthService,
    private marketingApiService: MarketingApiService,
    private marketingExploreDataServiceApiService: MarketingExploreDataServiceApiService,
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
    private titleService: Title,

    private marketingCommonService: MarketingCommonService
  ) { }

  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Services"]}- ${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
      //   this.baseApiLoader();
      if (localStorage.getItem("fullScreenChart") != null && localStorage.getItem("fullScreenChart") != undefined) {
        var chartname = localStorage.getItem("fullScreenChart");
        if (chartname == this.French.data.Serv_Tier_Tech || chartname == this.English.data.Serv_Tier_Tech || chartname == this.Spanish.data.Serv_Tier_Tech || chartname == this.German.data.Serv_Tier_Tech) {
          this.fullScreenChart = this.language.Serv_Tier_Tech;
          this.subscriberTierTechApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.Household_Device_Trends || chartname == this.English.data.Household_Device_Trends || chartname == this.Spanish.data.Household_Device_Trends || chartname == this.German.data.Household_Device_Trends) {
          this.fullScreenChart = this.language.Household_Device_Trends;
          this.householdDevicesTrendsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.adoption_Chart || chartname == this.English.data.adoption_Chart || chartname == this.Spanish.data.adoption_Chart || chartname == this.German.data.adoption_Chart) {
          this.fullScreenChart = this.language.adoption_Chart;
          this.serviceModuleAdoptionRateApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.wifi_Category || chartname == this.English.data.wifi_Category || chartname == this.Spanish.data.wifi_Category || chartname == this.German.data.wifi_Category) {
          this.fullScreenChart = this.language.wifi_Category;
          this.wifiDeviceCategoryTrendsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.blocked_threat || chartname == this.English.data.blocked_threat || chartname == this.Spanish.data.blocked_threat || chartname == this.German.data.blocked_threat) {
          this.fullScreenChart = this.language.blocked_threat;
          this.blockThreatsInsightsApiLoader(this.fullScreenChart);
        }
        else if (chartname == this.French.data.command_Chart || chartname == this.English.data.command_Chart || chartname == this.Spanish.data.command_Chart || chartname == this.German.data.command_Chart) {
          this.fullScreenChart = this.language.command_Chart;
          this.commandIQInsightsApiLoader(this.fullScreenChart);
        } 
        // else if (chartname == this.French.data.ecosystem_Chart || chartname == this.English.data.ecosystem_Chart || chartname == this.Spanish.data.ecosystem_Chart || chartname == this.German.data.ecosystem_Chart) {
        //   this.fullScreenChart = this.language.ecosystem_Chart;
        //   this.ecoRateApiLoader(this.fullScreenChart);
        // }

      }
    });
    this.titleService.setTitle(`${this.language["Services"]}- ${this.language["Basic"]}-${this.language["Explore_Data"]}-${this.language["Marketing_Cloud"]}- ${this.language["Calix Cloud"]}`);
    // FOR SEARCH FILTER
    this.searchFilterApplyCheck();
    this.baseApiLoader();
  }

  baseApiLoader() {
    this.fullcharterrormsg = ''
    this.subscriberTierTechApiLoader()
    this.householdDevicesTrendsApiLoader();
    this.serviceModuleAdoptionRateApiLoader();
    this.wifiDeviceCategoryTrendsApiLoader();
    this.blockThreatsInsightsApiLoader();
    this.commandIQInsightsApiLoader();
   // this.ecoRateApiLoader()
  }
  searchFilterApplyCheck() {
    this.searchFilterSubject = this.marketingExploreDataBasicApiService.filerValuesSubject.subscribe(data => {
      if (data) {
        if (!this.fullScreen) {
          this.resetDataFunction();
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
    this.fullScreen = true
    //EDGE Suites Adoption Rate
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
  // BASIC API TRIGGER SWITCH
  getFullScreenChartOptions(chartName?: string, download?: boolean) {
    if (this.language) {
      this.serviceDownloadContent = this.language.subs_download_tip;
      this.serviceCloseContent = this.language.subs_fullscreen_close_tip;
    }
    switch (chartName) {
      case this.language.Serv_Tier_Tech:
        if (this.language) {
          this.serviceFullScreenContent = this.language.serviceTier_content_tip;
        }
        if (download) {
          this.subscriberTierTechApiLoader(chartName, download)
        } else {
          this.subscriberTierTechApiLoader(chartName)
        }
        break;
      case this.language.Household_Device_Trends:
        if (this.language) {
          this.serviceFullScreenContent = this.language.HouseholdOptions_Info;
        }
        if (download) {
          this.householdDevicesTrendsApiLoader(chartName, download)
        } else {
          this.householdDevicesTrendsApiLoader(chartName)
        }
        break;
      case this.language.adoption_Chart:
        if (this.language) {
          this.serviceFullScreenContent = this.language.ServiceModuleAdoptionRate_Info;
        }
        if (download) {
          this.serviceModuleAdoptionRateExportApiLoader();
        } else {
          this.serviceModuleAdoptionRateApiLoader(chartName)
        }
        break;

      // case this.language.ecosystem_Chart:
      //   if (this.language) {
      //     this.serviceFullScreenContent = this.language.ServiceModuleAdoptionRate_Info;
      //   }
      //   if (download) {
      //     this.ecoModuleAdoptionRateExportApiLoader();
      //   } else {
      //     this.ecoRateApiLoader(chartName)
      //   }
      //   break;
      case this.language.wifi_Category:
        if (this.language) {
          this.serviceFullScreenContent = this.language.wifi_Category_6;
        }
        if (download) {
          this.wifiDeviceCategoryTrendsApiLoader(chartName, download)
        } else {
          this.wifiDeviceCategoryTrendsApiLoader(chartName)
        }
        break;
      case this.language.blocked_threat:
        if (this.language) {
          this.serviceFullScreenContent = this.language.BlockedThreats_Info;
        }
        if (download) {
          this.blockThreatsInsightsApiLoader(chartName, download)
        } else {
          this.blockThreatsInsightsApiLoader(chartName)
        }
        break;
      case this.language.command_Chart:
        if (this.language) {
          this.serviceFullScreenContent = this.language.CommandIQ_Info;
        }
        if (download) {
          this.commandIQInsightsExportApiLoader()
        } else {
          this.commandIQInsightsApiLoader(chartName)
        }
        break;
      default:
        break;
    }
  }
  //
  errorReset() {
    this.servicechartDownloadError = false
    this.servicechartDownloadErrorMsg = false
  }
  // BASIC API 
  subscriberTierTechApiLoader(chartName?: string, download?: boolean) {
    // SUBSCRIBER SERIVICE TIER TECH
    this.errorReset()
    this.subscriberTierTechDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.subscriberTierTechSubject = this.marketingExploreDataServiceApiService.SubscriberTierTech().subscribe((res: any) => {
      this.subscriberTierTechDataObject = res
      this.subscriberTierTechDataObject.categories = this.subscriberTierTechDataObject.categories.map(item =>
        item.charAt(0) != '/' ? item.replace('/', '&#47;') : item
      );
      if (download) {
        $('#serviceTierDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.subscriberTierTechExportDataForming(this.subscriberTierTechDataObject);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.subscribers_by_service_tier_technology);
        if (this.subscriberTierTechSubject) {
          setTimeout(() => {
            $('#serviceTierDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.subscriberTierTechDataAvailable = true;
        var that = this;
        this.exportDataChartOptionsService.serviceTierTechnologyOptions(this.subscriberTierTechDataObject, this.clickData).subscribe((data: any) => {
          this.serviceTierChartData=data;
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
              that.fullScreenExpandFunction(that.language.Serv_Tier_Tech, clickData)

            }
          };
          let chart = Highcharts.chart(chartName ? chartName : 'subscriber-tier-tech-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#serviceTierDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.servicechartDownloadError = true
          this.servicechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.subscriberTierTechDataError = true
          this.subscriberTierTechDataErrorMsg = this.marketingCommonService.errorHandling(error)

        }
      });
  }
  householdDevicesTrendsApiLoader(chartName?: string, download?: boolean) {
    // Household Device Trends TRENDS
    this.errorReset()
    this.householdDevicesDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.devicePerHouseHoldSubject = this.marketingExploreDataSubscriberApiService.DevicePerHouseHold().subscribe((res: any) => {
      let devicePerHouseHoldData: any = this.marketingExploreDataAssignerService.devicePerHouseHoldDataFormater(res)
      this.houseHoldDeviceTrendsSubscribers = devicePerHouseHoldData.totalSubs;
    }, (error) => {

    });
    this.householdDevicesTrendsSubject = this.marketingExploreDataServiceApiService.HouseHoldDeviceTrends().subscribe((res: any) => {
      this.houseHoldTrendsData=res;
      this.householdDevicesTrendsDataObject = this.marketingExploreDataAssignerService.houseHoldDataForming(res);
      if (download) {
        $('#houseHoldDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.houseHoldDeviceTrendsDataForming(res);
        let fname = this.downloadFileNameService.generateDownloadWOPeriodName(this.language.household_device_trends);
        if (this.householdDevicesTrendsSubject) {
          setTimeout(() => {
            $('#houseHoldDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.exportDataChartOptionsService.houseHoldDeviceTrendsOptions(this.householdDevicesTrendsDataObject).subscribe((data: any) => {
          this.houseHoldChartData=data;
          this.householdDevicesDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'household-device-trends-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#houseHoldDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.servicechartDownloadError = true
          this.ecoModuleAdoptionRateDataError = false
          this.servicechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.householdDevicesDataError = true
          this.ecoModuleAdoptionRateDataError = false
          this.householdDevicesDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  serviceModuleAdoptionRateApiLoader(chartName?: string) {
    // EDGE Suites Adoption Rate
    this.serviceModuleAdoptionRateDataError = false
    if (chartName) {
      this.fullScreenChart = chartName
    }
    this.serviceModuleAdoptionRateSubject = this.marketingExploreDataServiceApiService.ServiceModuleAdoption().subscribe((res: any) => {
      this.serviceAdoptionData=res;
      this.serviceModuleAdoptionRateDataObject = this.marketingExploreDataAssignerService.commonDataFormatter(res);
      var that = this;
      this.exportDataChartOptionsService.serviceModuleAdoptionRateOptions(this.serviceModuleAdoptionRateDataObject).subscribe((data: any) => {
        this.serviceAdoptionChartData=data;
        this.serviceModuleAdoptionRateDataAvailable = true;
        let chart = Highcharts.chart(chartName ? chartName : 'service-module-adoption-rate-chart', data)
        this.chartAvailable = true
      })
    },
      (error: any) => {
        this.serviceModuleAdoptionRateDataError = true
        this.ecoModuleAdoptionRateDataError = false
        this.serviceModuleAdoptionRateDataErrorMsg = this.marketingCommonService.errorHandling(error)
      });
  }

  ///
  ecoRateApiLoader(chartName?: string) {
    // EDGE Suites Adoption Rate
    this.ecoModuleAdoptionRateDataError = false
    if (chartName) {
      this.fullScreenChart = chartName
    }
    this.ecoModuleAdoptionRateSubject = this.marketingExploreDataServiceApiService.EcoModuleAdoption().subscribe((res: any) => {
      this.ecoAdoptionData=res;
      this.ecoModuleAdoptionRateDataObject = this.marketingExploreDataAssignerService.commonDataFormatter(res);
      var that = this;
      this.exportDataChartOptionsService.serviceModuleAdoptionRateOptions(this.ecoModuleAdoptionRateDataObject).subscribe((data: any) => {
        this.ecoAdoptionChartData=data;
        this.ecoModuleAdoptionRateDataAvailable = true;
        let chart = Highcharts.chart(chartName ? chartName : 'eco-rate-chart', data)
        this.chartAvailable = true
      })
    },
      (error: any) => {
        this.ecoModuleAdoptionRateDataError = true
        this.ecoModuleAdoptionRateDataErrorMsg = this.marketingCommonService.errorHandling(error)
        this.fullcharterrormsg = this.marketingCommonService.errorHandling(error)
      });

  }

  wifiDeviceCategoryTrendsApiLoader(chartName?: string, download?: boolean) {
    // WIFI DEVICE CATEGORY TRENDS
    this.errorReset()
    this.wifiDeviceCategoryTrendsDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.wifiDeviceCategoryTrendsSubject = this.marketingExploreDataServiceApiService.WifiDeviceTrends().subscribe((res: any) => {
      // SAME FUCTION USING HERE ALSO
      this.wifiDeviceData=res;
      this.wifiDeviceCategoryTrendsDataObject = this.marketingExploreDataAssignerService.commonDataFormatter(res);
      this.wifiDeviceCategoryTrendsDataObjectLength = Object.keys(res).length

      if (download) {
        $('#wifiDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.wifiDeviceCategoryTrendsDataFormatter(this.wifiDeviceCategoryTrendsDataObject);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.wi_fi_device_category_trends);
        if (this.wifiDeviceCategoryTrendsSubject) {
          setTimeout(() => {
            $('#wifiDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        this.exportDataChartOptionsService.wifiDeviceCategoryTrendsOptions(this.wifiDeviceCategoryTrendsDataObject).subscribe((data: any) => {
          this.wifiChartData=data;
          this.wifiDeviceCategoryTrendsDataAvailable = true;
          let chart = Highcharts.chart(chartName ? chartName : 'wifi-device-category-chart', data)
          this.chartAvailable = true
        })
      }

    },
      (error: any) => {
        if (download) {
          $('#wifiDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.servicechartDownloadError = true
          this.ecoModuleAdoptionRateDataError = false
          this.servicechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.wifiDeviceCategoryTrendsDataError = true
          this.ecoModuleAdoptionRateDataError = false
          this.wifiDeviceCategoryTrendsDataErrorMsg = this.marketingCommonService.errorHandling(error)
        }
      });
  }
  blockThreatsInsightsApiLoader(chartName?: string, download?: boolean) {
    // BLOCKED THREATS INSIGHTS
    this.errorReset()
    this.isusagebydata = false;
    this.blockThreatsInsightsDataError = false
    if (chartName && !download) {
      this.fullScreenChart = chartName
    }
    this.blockThreatsInsightsSubject = this.marketingExploreDataServiceApiService.BlockedThreatsInsights().subscribe((res: any) => {
      this.blockThreatsData=res;
      this.blockThreatsInsightsDataArray = this.marketingExploreDataAssignerService.blockThreatsInsightsDataFormatter(res)
      if (download) {
        $('#blockThreatDownloadSection').addClass('spinnershow');
        this.fullScreenDownload = true
        let data = this.marketingExploreDataDownloadDataService.blockedThreatsInsightsDataFormatter(this.blockThreatsInsightsDataArray);
        let fname = this.downloadFileNameService.generateDownloadName(this.language.blocked_threats_insights);
        if (this.blockThreatsInsightsSubject) {
          setTimeout(() => {
            $('#blockThreatDownloadSection').removeClass('spinnershow');
            this.fullScreenDownload = false
          }, 1000);
        }
        this.exportExcelService.downLoadCSVRevenue(fname, data);
      } else {
        var that = this;
        this.blockThreatsInsightsDataArray.forEach(element => {
          if (element['y'] != 0) {
            this.isusagebydata = true;
          }
        });
        if (this.isusagebydata == true) {
        } else {
          this.blockThreatsInsightsDataAvailable = false;
          this.blockThreatsInsightsDataError = true
          this.blockThreatsInsightsDataArray = [];
        }
        if (this.blockThreatsInsightsDataArray.length > 0) {
          this.exportDataChartOptionsService.blockedThreatsInsightsOptions(this.blockThreatsInsightsDataArray, this.clickData).subscribe((data: any) => {
            this.blockThreatsChartData=data;
            this.blockThreatsInsightsDataAvailable = true;
            data.plotOptions.series.point.events = {
              click: function (event) {
                let clickData = {
                  tech: this.realName,
                  name: this.name,
                  yValue: this.y,
                  page: 1,
                  size: 10
                };
                that.exportMenuAvailable = true;
                that.fullScreenExpandFunction(that.language.blocked_threat, clickData)
              }
            };
            if (data.length != 0) {
              this.chartAvailable = true;
              // this.emptyDataValue = false;
              let chart = Highcharts.chart(chartName ? chartName : 'block-threats-insights-chart', data)

            }
          })
        } else {
          this.chartAvailable = true;
          // this.emptyDataValue = true;
          if (chartName) {
            Highcharts.chart(chartName, res).destroy();
          }
          this.blockThreatsInsightsDataArray = [];
          this.blockThreatsInsightsDataAvailable = true;
          this.blockThreatsInsightsDataError = true
          //   this.blockThreatsInsightsDataErrorMsg = "No data Available"

        }
      }
    },
      (error: any) => {
        if (download) {
          $('#blockThreatDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false;
          this.servicechartDownloadError = true
          this.ecoModuleAdoptionRateDataError = false
          this.servicechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
        } else {
          this.blockThreatsInsightsDataError = true
          this.blockThreatsInsightsDataErrorMsg = error.error
          this.ecoModuleAdoptionRateDataError = false
        }
      });
  }
  commandIQInsightsApiLoader(chartName?: string) {
    // Household Device Trends TRENDS
    this.commandIQInsightsDataError = false
    if (chartName) {
      this.fullScreenChart = chartName
    }
    this.commandIQInsightsSubject = this.marketingExploreDataServiceApiService.CommandIQinsights().subscribe((res: any) => {
      this.commandIQInsightsDataAvailable = true
      this.commandIQ_Array = res;
      this.chartAvailable = true

    },
      (error: any) => {
        this.commandIQInsightsDataError = true
        this.commandIQInsightsDataErrorMsg = error.error
        this.ecoModuleAdoptionRateDataError = false
      });
  }

  // SERVICE MODULE ADOPTION EXPORT
  serviceModuleAdoptionRateExportApiLoader() {
    this.errorReset()
    $('#serviceModuleDownloadSection').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataServiceApiService.ServiceModuleAdoptionRateExport();
    this.serviceModuleAdoptionRateExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.serviceModuleAdoptionRateExportSubject) {
        setTimeout(() => {
          $('#serviceModuleDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#serviceModuleDownloadSection').removeClass('spinnershow');
      this.fullScreenDownload = false;
      this.ecoModuleAdoptionRateDataError = false
      this.apiErrorHandling(error)
    });
  }

  // Eco MODULE ADOPTION EXPORT
  ecoModuleAdoptionRateExportApiLoader() {
    this.errorReset()
    $('#ecoModuleDownloadSection').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataServiceApiService.EcoModuleAdoptionRateExport();
    this.serviceModuleAdoptionRateExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.serviceModuleAdoptionRateExportSubject) {
        setTimeout(() => {
          $('#ecoModuleDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#ecoModuleDownloadSection').removeClass('spinnershow');
      this.fullScreenDownload = false;
      this.ecoModuleAdoptionRateDataError = false
      // this.ecoModuleAdoptionRateDataError = true
      // this.ecoModuleAdoptionRateDataErrorMsg = this.marketingCommonService.errorHandling(error)
      this.apiErrorHandling(error)
    });
  }
  // COMMAND IQ INSIGHTS
  commandIQInsightsExportApiLoader() {
    this.errorReset()
    $('#commandInDownloadSection').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataServiceApiService.CommandIqInsightsExport();
    this.serviceModuleAdoptionRateExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (this.serviceModuleAdoptionRateExportSubject) {
        setTimeout(() => {
          $('#commandInDownloadSection').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#commandInDownloadSection').removeClass('spinnershow');
      this.fullScreenDownload = false;
      this.apiErrorHandling(error)
    });
  }

  // DRILL DOWN API TRIGGER SWITCH
  getFullScreenTablesData(chartName, clickData) {
    switch (chartName) {
      case this.language.Serv_Tier_Tech:
        this.subscribersTierTechDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Subscriber List (' + clickData.tier + ' / ' + clickData.tech + ')' }
        ]; */
        break;
      case this.language.blocked_threat:
        this.blockedThreatsInsightsDrillDownApiLoader(clickData)
        /* this.exportMenu = [
          { title: 'Export Chart Data' },
          { title: 'Export Blocked Threats (' + clickData.name + ')' }
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
        case this.language.Serv_Tier_Tech:
          exportMenus.push(this.language.Export_Subscriber_Data + ' (' + this.clickData.tier + ' / ' + this.clickData.tech + ')');
          break;
        case this.language.blocked_threat:
          exportMenus.push(this.language.Export_Blocked_Threats + ' (' + this.clickData.name + ')');
          break;
      }
    }
    return exportMenus;
  }

  //
  apiErrorHandling(error) {
    this.servicechartDownloadError = true
    this.servicechartDownloadErrorMsg = this.marketingCommonService.errorHandling(error)
  }

  subscribersTierTechDrillDownApiLoader(clickData) {
    this.errorReset()
    this.subscribersTierTechDrillDownSubject =
      this.marketingExploreDataServiceApiService.SubscriberTierTechDrillDown(clickData)
        .subscribe((res: any) => {
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
          <td style="font-weight:400 !important;font-size:13px;">${data[i].customerType}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].downloadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].uploadSpeed}</td>
          <td class="text-right" style="font-weight:400 !important;font-size:13px;">${data[i].attainableRate}</td>
          <td></td>import { MarketingExploreDataSubscriberApiService } from './../marketing-subscrib-chart/marketing-explore-data-subscriberapi.service';


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
  blockedThreatsInsightsDrillDownApiLoader(clickData) {
    this.errorReset()
    this.blockThreatsInsightsDrillDownSubject =
      this.marketingExploreDataServiceApiService.BlockedThreatsInsightsDrillDown(clickData)
        .subscribe((res: any) => {
          let data = res
          let html = '';
          for (let i = 0; i < data.length; i++) {
            html += `<tr>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].accountNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].name}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].phoneNumber}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceAddress}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].serviceTier}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].email ? data[i].email : 'N/A'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].mac_address}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].threat_count}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].totalUsage ? data[i].totalUsage : '0'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].streamingUsage ? data[i].streamingUsage : '0'}</td>
          <td style="font-weight:400 !important;font-size:13px;">${data[i].gamingUsage ? data[i].gamingUsage : '0'}</td>
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
          this.tableLoader = false;
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
  // DRILL DOWN EXPORT API TRIGGER SWITCH
  drillDownExportApiLoader(chartName, clickData) {
    switch (chartName) {
      case this.language.Serv_Tier_Tech:
        this.subscribersTierTechDrillDownExportApiLoader(clickData)
        break;
      case this.language.blocked_threat:
        this.blockedThreatsInsightsDrillDownExportApiLoader(clickData)
        break;

      default:
        break;
    }
  }
  // DRILL DOWN EXPORT
  subscribersTierTechDrillDownExportApiLoader(clickData) {
    this.errorReset()
    $('#serviceChartModelDownload').addClass('spinnershow');
    this.fullScreenDownload = true
    let downloadDataObject = this.marketingExploreDataServiceApiService.SubscriberByServiceTierDrillDownExport(clickData);
    this.subscribersTierTechDrillDownExportSubject = this.marketingApiService.getDownloadFileContent(downloadDataObject.downloadURL).subscribe(res => {
      if (downloadDataObject) {
        setTimeout(() => {
          $('#serviceChartModelDownload').removeClass('spinnershow');
          this.fullScreenDownload = false
        }, 1000);
      }
      this.marketingExploreCommonService.downLoadFileFunction(res, "application/csv", downloadDataObject.fileName)
    }, (error: any) => {
      $('#serviceChartModelDownload').removeClass('spinnershow');
      this.fullScreenDownload = false;
      this.apiErrorHandling(error)
    });

  }
  blockedThreatsInsightsDrillDownExportApiLoader(clickData) {
    this.errorReset()
    let name = clickData.name.replace(' ', '-').toLowerCase();
    let orgID = this.sso.getOrgId();
    $('#serviceChartModelDownload').addClass('spinnershow');
    this.fullScreenDownload = true
    this.blockedThreatsInsightsDrillDownExportSubject =
      this.marketingExploreDataServiceApiService.BlockedThreatsInsightsDrillDownExport(clickData)
        .subscribe((res: any) => {
          let data = this.marketingExploreDataDownloadDataService.blockedThreatsDrillDownExportData(res);
          let fname = this.downloadFileNameService.generateDownloadName(`${this.language.blocked_threats_insights}-${name}-${orgID}`);
          if (data) {
            setTimeout(() => {
              $('#serviceChartModelDownload').removeClass('spinnershow');
              this.fullScreenDownload = false
            }, 1000);
          }
          this.exportExcelService.downLoadCSVRevenue(fname, data);
        }, (error: any) => {
          $('#serviceChartModelDownload').removeClass('spinnershow');
          this.fullScreenDownload = false;
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

  fullScreenCloseFunction() {
    this.fullScreen = false
    this.clickData = undefined;
    //this.exportMenu = undefined;
    // this.emptyDataValue = false;
    this.clearTableBody();
    this.resetDataFunction();
    this.baseApiLoader();
  }
  clearTableBody() {
    $('#append-table-list').empty();
  }

  resetDataFunction() {
    this.loadMoreButton = false
    this.subscriberTierTechDataAvailable = false;
    this.householdDevicesDataAvailable = false;
    this.serviceModuleAdoptionRateDataAvailable = false;
    this.wifiDeviceCategoryTrendsDataAvailable = false;
    this.blockThreatsInsightsDataAvailable = false;
    this.commandIQInsightsDataAvailable = false;
    this.ecoModuleAdoptionRateDataAvailable = false;
  }




  serviceChartModalOpen(modeldata) {
    this.popup_heading = modeldata

    switch (modeldata) {
      case this.language.Serv_Tier_Tech:
        this.dialogService.open(this.serviceChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.Household_Device_Trends:
        this.dialogService.open(this.serviceHouseChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.adoption_Chart:
        this.dialogService.open(this.serviceAdoptionChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.wifi_Category:
        this.dialogService.open(this.serviceWiFiChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.blocked_threat:
        this.dialogService.open(this.serviceBlockedChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
        break;
      case this.language.command_Chart:
        this.dialogService.open(this.serviceInsightsChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
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
    if (this.subscriberTierTechSubject) {
      this.subscriberTierTechSubject.unsubscribe();
    }
    if (this.householdDevicesTrendsSubject) {
      this.householdDevicesTrendsSubject.unsubscribe();
    }
    if (this.serviceModuleAdoptionRateSubject) {
      this.serviceModuleAdoptionRateSubject.unsubscribe();
    }
    if (this.wifiDeviceCategoryTrendsSubject) {
      this.wifiDeviceCategoryTrendsSubject.unsubscribe();
    }
    if (this.blockThreatsInsightsSubject) {
      this.blockThreatsInsightsSubject.unsubscribe();
    }
    if (this.commandIQInsightsSubject) {
      this.commandIQInsightsSubject.unsubscribe();
    }
    // EXPORT
    if (this.serviceModuleAdoptionRateExportSubject) {
      this.serviceModuleAdoptionRateExportSubject.unsubscribe();
    }
    if (this.blockedThreatsInsightsDrillDownExportSubject) {
      this.blockedThreatsInsightsDrillDownExportSubject.unsubscribe();
    }
    if (this.serviceModuleAdoptionRateExportSubject) {
      this.serviceModuleAdoptionRateExportSubject.unsubscribe();
    }

    if (this.subscribersTierTechDrillDownExportSubject) {
      this.subscribersTierTechDrillDownExportSubject.unsubscribe();
    }

    // DRILL DOWN
    if (this.subscribersTierTechDrillDownSubject) {
      this.subscribersTierTechDrillDownSubject.unsubscribe();
    }
    if (this.blockThreatsInsightsDrillDownSubject) {
      this.blockThreatsInsightsDrillDownSubject.unsubscribe();
    }


  }
}
