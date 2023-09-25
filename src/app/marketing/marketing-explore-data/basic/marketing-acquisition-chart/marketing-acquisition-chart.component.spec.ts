
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "../../../../../app-services/translate.service";
import { CommonService } from "../../../../../app/sys-admin/services/common.service";
import { OrganizationApiService } from "../../../../../app/sys-admin/services/organization-api.service";
import { MarketingAcquisitionChartComponent } from "./marketing-acquisition-chart.component";
import { ComponentFixture, TestBed, flush, fakeAsync, tick } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { MarketingExploreDataAcquisitionApiService } from "./marketing-acquisition.explore-data.service";
import { acquisitionData, acquisitionRateInsights, acquisitionRevenueInsights, acquisitionRevenueInsightsOptionsData, newSubscriberandService, selectlanguageData } from "../../../../../../src/assets/mockdata/cmc/marketing/exploredata/basiclens/acquisition/acquisition.data";
import { of, throwError } from "rxjs";
import { acquisitionRateInsightsChartOptions, acquisitionRateOverallUserReport, acquisitionRevenueChartOptions, acquisitionRevenueOverallUserReport, newSubscribeOverallReport, newSubscriberChartoptions } from "../../../../../../src/assets/mockdata/cmc/marketing/exploredata/basiclens/acquisition/acquisitionchartoption.data";
import { MarketingApiService } from "../../../../../../src/app/marketing/shared/services/marketing-api.sevice";
import { MarketingExploreDataBasicApiService } from "../explore-data-basic-api.service";
import { SsoAuthService } from "../../../../shared/services/sso-auth.service";
import { errorStatus401 } from "src/assets/mockdata/shared/error.data";
import Highcharts from "highcharts";
import { CustomTranslateService } from "src/app/shared/services/custom-translate.service";
import { ExportDataChartOptionsService } from "../shared/services/explore-data-chart-options.service";
import { Title } from "@angular/platform-browser";

describe('MarketingAcquisitionChartComponent', () => {
    let component: MarketingAcquisitionChartComponent;
    let fixture: ComponentFixture<MarketingAcquisitionChartComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let httpTestingController: HttpTestingController;
    let service: MarketingExploreDataAcquisitionApiService;
    let marketingExploreDataServivice: MarketingExploreDataBasicApiService;
    let languageService: TranslateService;
    let marketingApiservice: MarketingApiService;
    let exportDataChartOptionsService: ExportDataChartOptionsService;
    let titleService: Title
    let response = [{
        gamingUsage: '0',
        month: "2022-07",
        streamingUsage: "0",
        totalUsage: "0"
    }]
    let chartNames = {
        new_subscribe: 'New Subscribers by Service Tier & Technology',
        revenue_Insight: 'Acquisition Revenue & Insights',
        acquisition: 'Acquisition Rate & Insights',
    }

    let useageData = {
        "categories": ["2022-07", "2022-08", "2022-09", "2022-10", "2022-11", "2022-12"],
        "totals": "2785.62",
        "gamingTotals": "469.22",
        "streamingTotals": "875.59",
        "series": [
            {
                "name": "Devices",
                "data": [0, 0, 0, 875.59, 0, 0]
            },
            {
                "name": "Wi-Fi Score",
                "data": [0, 0, 0, 875.59, 0, 0]
            },
            {
                "name": "Streaming Usage",
                "data": [0, 0, 0, 875.59, 0, 0]
            },
            {
                "name": "Gaming Usage",
                "data": [0, 0, 0, 875.59, 0, 0]
            },
            {
                "name": "Other Usage",
                "data": [0, 0, 0, 875.59, 0, 0]
            }
        ]
    }
    let marketingBasicservice: MarketingExploreDataBasicApiService


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingAcquisitionChartComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [NgbModal, SsoAuthService, TranslateService, CommonService,
                MarketingExploreDataAcquisitionApiService, MarketingApiService, Title, MarketingExploreDataBasicApiService, ExportDataChartOptionsService, { provide: TranslateService, useClass: CustomTranslateService },


            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingAcquisitionChartComponent);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                httpTestingController = TestBed.inject(HttpTestingController);
                service = TestBed.inject(MarketingExploreDataAcquisitionApiService);
                marketingExploreDataServivice = TestBed.inject(MarketingExploreDataBasicApiService);
                exportDataChartOptionsService = TestBed.inject(ExportDataChartOptionsService);
                marketingApiservice = TestBed.inject(MarketingApiService);
                titleService = TestBed.inject(Title);
                languageService = TestBed.inject(TranslateService);

                component.period = {
                    'last-30d': 'Last 30 days',
                    'last-1m': 'Last Month',
                    'last-2m': 'Last Two Months'
                };
                fixture.detectChanges();
            })
    });

    it('should initialize onInit()', () => {
        spyOn(component, 'searchFilterApplyCheck').and.callThrough()
        languageService.selectedLanguage.next(selectlanguageData);
        component.ngOnInit()
        spyOn(localStorage, 'getItem').and.returnValue('New Subscribers by Service Tier & Technology');
        marketingExploreDataServivice['filerValuesSubject'].next(true);
        expect(component.searchFilterApplyCheck).toHaveBeenCalled()
        expect(component.searchFilterApplyCheck).toHaveBeenCalledTimes(1)

    });
    
 
    it('should call fullScreenSearch ,clickData is defined', () => {
        spyOn(component, 'fullScreenSearch');
        component.fullScreen = true;
        component.clickData = {
            "tier": "Mar-23",
            "yValue": 0,
            "tech": "Potential Revenue",
            "page": 1,
            "size": 10,
            "index": 2,
            "indexS": 1
        }
        component.searchFilterApplyCheck();
        marketingExploreDataServivice.filerValuesSubject.next(true);
        expect(component.fullScreenSearch).toHaveBeenCalledWith(component.fullScreenChart, component.clickData);
    });
    it('should call to Last Two Months', () => {
        spyOn(marketingApiservice, 'getPeriod').and.returnValue('last-2m');
        component.getCurrentLocalizedPeriod();
        fixture.detectChanges();
        expect(component.currentPeriod).toBe('Last Two Months');
    });
    it('should call to Last 30 days"', () => {
        spyOn(marketingApiservice, 'getPeriod').and.returnValue('last-30d');
        component.getCurrentLocalizedPeriod();
        fixture.detectChanges();
        expect(component.currentPeriod.toLocaleUpperCase()).toBe('Last 30 days'.toLocaleUpperCase());
    });
    it('should call to Last Month', () => {
        spyOn(marketingApiservice, 'getPeriod').and.returnValue('last-1m');
        component.getCurrentLocalizedPeriod();
        fixture.detectChanges();
        expect(component.currentPeriod).toBe('Last Month');
    });
    it('should remove spinner ', () => {
        component.language = {
            'lasttwomonths': 'Last Month',
            'last 30 days': '30Days',
            'lastmonth': ' Month'
        },
        spyOn(service, 'NewSubscribersServiceTierTech').and.returnValue(of(newSubscriberandService))
        component.newSubscribersByTechApiLoader('new-subscriber-tier-tech-chart', true);
        expect(component.fullScreenDownload).toBe(true);
    });
    it('should call fullScreenSearch , clickData is undefined', () => {
        spyOn(component, 'fullScreenSearch');
        component.fullScreen = true;
        component.clickData = undefined;
        component.searchFilterApplyCheck();

        marketingExploreDataServivice.filerValuesSubject.next(true);

        expect(component.fullScreenSearch).toHaveBeenCalledWith(component.fullScreenChart);
    });

    it('should getCurrentLocalizedPeriod Details', () => {
        component.period = component.period[marketingApiservice.getPeriod()]
        spyOn(component, 'getCurrentLocalizedPeriod').and.callThrough()
        component.getCurrentLocalizedPeriod()
        expect(component.getCurrentLocalizedPeriod).toHaveBeenCalled()
        expect(component.getCurrentLocalizedPeriod).toHaveBeenCalledTimes(1)

    })


    it('should get newSubscriberServicetier Details', () => {
        component.period = component.period[marketingApiservice.getPeriod()]
        spyOn(service, 'NewSubscribersServiceTierTech').and.returnValue(of(newSubscriberandService))
        spyOn(component, 'getCurrentLocalizedPeriod').and.callThrough()
        component.getCurrentLocalizedPeriod()
        // component.Highcharts.chart('new-subscriber-tier-tech-chart', newSubscriberChartoptions)
        component.newSubscribersByTechApiLoader('new-subscriber-tier-tech-chart', false)
        expect(component.newSubscriberData).toBeTruthy('value is not Matched')
        expect(component.newSubscriberData).toBe(newSubscriberandService, 'value Matched')
        expect(component.newSubscriberChartData).toBeTruthy('could not find chart option')
        expect(component.newSubscriberChartData.title).toMatch('')
        expect(component.newSubscriberChartData.yAxis.title.text).toMatch('Subscribers')
        expect(component.newSubscriberChartData.chart.type).toMatch(newSubscriberChartoptions.chart.type, 'type is matched')
    })

    it('should getScopes Details', () => {
        spyOn(component, 'getScopes').and.callThrough()
        component.getScopes()
        expect(component.getScopes).toHaveBeenCalled()
        expect(component.getScopes).toHaveBeenCalledTimes(1)
    })



    it('should acquisitionRateInsightsApi detils', () => {
        spyOn(component, 'acquisitionRateInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRateInsights').and.returnValue(of(acquisitionRateInsights))
        component.acquisitionRateInsightsApiLoader('acquisition-rate-insights-chart', false)
        expect(component.acquisitionRateData).toBeTruthy('value is not Matched')
        expect(component.acquisitionRateData).toBe(acquisitionRateInsights, 'value Matched')
        expect(component.acquisitionRatechartData).toBeTruthy('could not find chart option')
        expect(component.acquisitionRatechartData.title).toMatch('')
        expect(component.acquisitionRatechartData.yAxis.title.text).toMatch('Subscribers')
        expect(component.acquisitionRatechartData.chart.type).toMatch(acquisitionRateInsightsChartOptions.chart.type, 'type is matched')
        expect(component.acquisitionRateInsightsApiLoader).toHaveBeenCalled()
        expect(component.acquisitionRateInsightsApiLoader).toHaveBeenCalledTimes(1)
    })

    it('should newSubscribersTierTechDrillDownApiLoader detils', () => {
        component.clickData = {
            tier: '60M',
            tech: 'Wireless',
            page: 1,
            size: 10,
            'org-id': '12921722',
            period: 'last-30d'
        }
        component.fullscreenTableError = false;
        spyOn(component, 'newSubscribersTierTechDrillDownApiLoader').and.callThrough()
        spyOn(service, 'NewSubscribersServiceTierTechDrillDown').and.returnValue(of(newSubscribeOverallReport))
        component.newSubscribersTierTechDrillDownApiLoader(component.clickData)
        expect(component.newSubscriberDrillData).toBeTruthy('value is not Matched')
        expect(component.newSubscriberDrillData).toBe(newSubscribeOverallReport, 'value misMatched')
        expect(component.newSubscribersTierTechDrillDownApiLoader).toHaveBeenCalled()
        expect(component.newSubscribersTierTechDrillDownApiLoader).toHaveBeenCalledTimes(1)
    })

    it('should acquisitionRevenueInsightsDrillDownLoader detils', () => {
        component.clickData = {
            start: '2022-04-01',
            end: '2022-04-30',
            page: 1,
            size: 10,
        }
        component.fullscreenTableError = false;
        spyOn(component, 'acquisitionRevenueInsightsDrillDownLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueInsightsDrillDown').and.returnValue(of(acquisitionRevenueOverallUserReport))
        component.acquisitionRevenueInsightsDrillDownLoader(component.clickData)
        expect(component.fullScreenTableData).toBeTruthy('value is not Matched')
        expect(component.fullScreenTableData).toBe(acquisitionRevenueOverallUserReport, 'value misMatched')
        expect(component.acquisitionRevenueInsightsDrillDownLoader).toHaveBeenCalled()
        expect(component.acquisitionRevenueInsightsDrillDownLoader).toHaveBeenCalledTimes(1)
    })

    it('should acquisitionRateInsightsDrillDownLoader detils', () => {
        component.clickData = {
            start: '2022-04-01',
            end: '2022-04-30',
            page: 1,
            size: 10,
        }
        component.fullscreenTableError = false;
        spyOn(component, 'acquisitionRateInsightsDrillDownLoader').and.callThrough()
        spyOn(service, 'AquisitionRateInsightsDrillDown').and.returnValue(of(acquisitionRateOverallUserReport))
        component.acquisitionRateInsightsDrillDownLoader(component.clickData)
        expect(component.fullScreenTableData).toBeTruthy('value is not Matched')
        expect(component.fullScreenTableData).toBe(acquisitionRateOverallUserReport, 'value misMatched')
        expect(component.acquisitionRateInsightsDrillDownLoader).toHaveBeenCalled()
        expect(component.acquisitionRateInsightsDrillDownLoader).toHaveBeenCalledTimes(1)
    })

    it('should resetAllData Details', () => {
        spyOn(component, 'resetAllData').and.callThrough()
        component.resetAllData()
        expect(component.loadMoreButton).toBeFalsy()
        expect(component.newSubscribersByTechDataAvailable).toBeFalsy()
        expect(component.acquisitionRateInsightsDataAvailable).toBeFalsy()
        expect(component.acquisitionRevenueInsightsDataAvailable).toBeFalsy()
    });


    it('should create', () => {
        expect(component).toBeTruthy()
    });

    it('should fullScreenSearch details', () => {
        component.language = chartNames
        let clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }

        spyOn(component, 'fullScreenSearch').and.callThrough()
        component.fullScreenSearch('New Subscribers by Service Tier & Technology', clickData)
        expect(component.dataAvailable).toBeFalsy()
        expect(component.fullScreenTableAvailable).toBeFalsy()
        expect(component.tableLoader).toBe(true)
        expect(component.clickData).toBe(clickData)

    })

    it('should loadMore details', () => {
        component.language = chartNames
        component.clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }

        spyOn(component, 'loadMore').and.callThrough()
        component.loadMore()
        expect(component.loadingBtn).toBe(true)
        expect(component.loadMore).toHaveBeenCalled()

    })

    it('should acquisitionChartsApiLoader details', () => {
        spyOn(component, 'acquisitionChartsApiLoader').and.callThrough()
        component.acquisitionChartsApiLoader(acquisitionData)
        expect(component.acquisitionChartsApiLoader).toHaveBeenCalled()
    })

    it('should  newSubscriberServicetier download', () => {
        component.language = { new_subscribers_by_service_tier_technology: 'new-subscribers-by-service-tier-technology' }
        component.period = component.period[marketingApiservice.getPeriod()]
        spyOn(service, 'NewSubscribersServiceTierTech').and.returnValue(of(newSubscriberandService))
        spyOn(component, 'getCurrentLocalizedPeriod').and.callThrough()
        component.getCurrentLocalizedPeriod()
        component.Highcharts.chart('new-subscriber-tier-tech-chart', newSubscriberChartoptions)
        component.newSubscribersByTechApiLoader('new-subscriber-tier-tech-chart', true)
        expect(component.newSubscriberData).toBeTruthy('value is not Matched')
        expect(component.newSubscriberData).toBe(newSubscriberandService, 'value Matched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should acquisitionRevenueInsightsApiLoader download', () => {
        component.language = {}
        component.language = { acquisition_revenue_insights: 'acquisition-revenue-insights' }
        component.revenueInsightsAccess = true;
        spyOn(component, 'acquisitionRevenueInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueInsights').and.returnValue(of(acquisitionRevenueInsights))
        component.acquisitionRevenueInsightsApiLoader('acquisition-revenue-insights-chart', true)
        expect(component.acquisitionRevenueData).toBe(acquisitionRevenueInsights, 'value Matched')
        expect(component.fullScreenDownload).toBe(true)
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = component.language.new_subscribe
        fixture.detectChanges()
        component.getExportMenus
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = component.language.revenue_Insight
        fixture.detectChanges()
        component.getExportMenus
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = component.language.acquisition
        fixture.detectChanges()
        component.getExportMenus
    })


    it('should call revenue details', () => {
        component.language = { acquisition_revenue_insights: 'acquisition-revenue-insights' }
        component.revenueInsightsAccess = true;
        spyOn(component, 'acquisitionRevenueInsightsApiLoader').and.callThrough();
        spyOn(service, 'AquisitionRevenueInsights').and.returnValue(of(acquisitionRevenueInsights))
        spyOn(exportDataChartOptionsService, 'acquisitionRevenueInsightsOptions').and.returnValue(of(acquisitionRevenueInsightsOptionsData));
        component.acquisitionRevenueInsightsApiLoader('acquisition-revenue-insights-chart', false)
        expect(component.acquisitionRevenueInsightsApiLoader).toHaveBeenCalled()
    })

    it('should acquisitionRateInsightsApi download', () => {
        component.language = { acquisition_rate_insights: 'acquisition-rate-insights' }
        spyOn(component, 'acquisitionRateInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRateInsights').and.returnValue(of(acquisitionRateInsights))
        component.acquisitionRateInsightsApiLoader('acquisition-rate-insights-chart', true)
        expect(component.acquisitionRateData).toBeTruthy('value is not Matched')
        expect(component.acquisitionRateData).toBe(acquisitionRateInsights, 'value Matched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should acquisitionSubscriberUsageApiLoader detail', () => {
        spyOn(component, 'acquisitionSubscriberUsageApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueSubscriberUsage').and.returnValue(of(response))
        component.acquisitionSubscriberUsageApiLoader(acquisitionData)
        expect(component.acquisitionSubscriberUsageApiLoader).toHaveBeenCalled()

    })
    it('should acquisitionServiceLimitApiLoader detail', () => {
        spyOn(component, 'acquisitionServiceLimitApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueServiceLimit').and.returnValue(of(response))
        component.acquisitionServiceLimitApiLoader(acquisitionData)
        expect(component.acquisitionServiceLimitApiLoader).toHaveBeenCalled()

    })
    it('should acquisitionUsageByAppApiLoader detail', () => {
        spyOn(component, 'acquisitionUsageByAppApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueUsageByApp').and.returnValue(of(response))
        component.acquisitionUsageByAppApiLoader(acquisitionData)
        expect(component.acquisitionUsageByAppApiLoader).toHaveBeenCalled()

    })

    it('should acquisitionDeviceTrendsApiLoader detail', () => {
        spyOn(component, 'acquisitionDeviceTrendsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueDeviceTrends').and.returnValue(of(response))
        component.acquisitionDeviceTrendsApiLoader(acquisitionData)
        expect(component.acquisitionDeviceTrendsApiLoader).toHaveBeenCalled()

    })
    it('should acquisitionTopAppApiLoader detail', () => {
        let res = [
            {
                "Disney": 875.588
            },
            {
                "Zoom": 657.728
            },
            {
                "Facebook": 517.006
            },
            {
                "Gaming (Zynga)": 469.219
            },
            {
                "Apple iCloud": 266.045
            }
        ]
        spyOn(component, 'acquisitionTopAppApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueTopApp').and.returnValue(of(res))
        component.acquisitionTopAppApiLoader(acquisitionData)
        expect(component.acquisitionTopAppApiLoader).toHaveBeenCalled()

    })
    it('should drillDownExportApiLoader new_subscribe', () => {
        component.language = chartNames
        let clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('New Subscribers by Service Tier & Technology', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled();
    })

    it('should drillDownExportApiLoader revenue_Insight', () => {
        component.language = chartNames
        let clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('Acquisition Revenue & Insights', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled();
    })

    it('should drillDownExportApiLoader acquisition', () => {
        component.language = chartNames
        let clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('Acquisition Rate & Insights', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled();
    })

    it('should drillDownExportApiLoader default', () => {
        component.language = chartNames
        let clickData = {
            page: 1,
            size: '10',
            tech: '',
            tier: '1G'
        }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('default', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled();
    })

    it('should newSubscribersTierTechDrillDownExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(component, 'newSubscribersTierTechDrillDownExportApiLoader').and.callThrough()
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.newSubscribersTierTechDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.newSubscribersTierTechDrillDownExportApiLoader).toHaveBeenCalled()
    });

    it('should acquisitionRateInsightsDrillDownExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(component, 'acquisitionRateInsightsDrillDownExportApiLoader').and.callThrough()
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.acquisitionRateInsightsDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.acquisitionRateInsightsDrillDownExportApiLoader).toHaveBeenCalled()
    });

    it('should acquisitionRevenueInsightsDrillDownExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(component, 'acquisitionRevenueInsightsDrillDownExportApiLoader').and.callThrough()
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.acquisitionRevenueInsightsDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.acquisitionRevenueInsightsDrillDownExportApiLoader).toHaveBeenCalled()
    });

    it('should fullScreenCloseFunction details', () => {
        spyOn(component, 'fullScreenCloseFunction').and.callThrough()
        component.fullScreenCloseFunction()
        expect(component.fullScreen).toBeFalsy()
        expect(component.clickData).toBeUndefined()
        expect(component.fullScreenCloseFunction).toHaveBeenCalled()
    })
    it('should fullScreenExpandFunction details', () => {
        component.language = chartNames
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        spyOn(component, 'fullScreenExpandFunction').and.callThrough()
        component.fullScreenExpandFunction('New Subscribers by Service Tier & Technology', clickData)
        expect(component.fullScreen).toBe(true)
        expect(component.fullScreenChart).toBe('New Subscribers by Service Tier & Technology')
        expect(component.fullScreenExpandFunction).toHaveBeenCalled()
    })

    it('should fullScreenExpandFunction fullScreen details', () => {
        component.language = chartNames
        component.fullScreen = false
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        spyOn(component, 'fullScreenExpandFunction').and.callThrough()
        component.fullScreenExpandFunction('New Subscribers by Service Tier & Technology', clickData)
        expect(component.dataAvailable).toBeFalsy()
        expect(component.fullScreenTableAvailable).toBeFalsy()
        expect(component.fullScreenExpandFunction).toHaveBeenCalled()
    })

    it('should adressReplacer details', () => {
        spyOn(component, 'adressReplacer').and.callThrough()
        component.adressReplacer('New Subscribers by Service Tier & Technology')
        expect(component.adressReplacer).toHaveBeenCalled()
    })

    it('should downloadFunction details', () => {
        component.clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        component.language = chartNames
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('New Subscribers by Service Tier & Technology', 'Export Subscriber List (<20M / Cable)')
        expect(component.downloadFunction).toHaveBeenCalled()
    })

    it('should downloadFunction else details', () => {
        component.language = chartNames
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('New Subscribers by Service Tier & Technology', 'Export Subscriber')
        expect(component.downloadFunction).toHaveBeenCalled()
    })

    it('should closeModal details', () => {
        spyOn(component, 'closeModal').and.callThrough()
        component.closeModal()
        expect(component.closeModal).toHaveBeenCalled()
    })

    it('should baseApiLoader details', () => {
        component.revenueInsightsAccess = true
        spyOn(component, 'baseApiLoader').and.callThrough()
        component.baseApiLoader()
        expect(component.baseApiLoader).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions new_subscribe', () => {
        component.language = {}
        component.language.new_subscribe = 'New Subscribers by Service Tier & Technology'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('New Subscribers by Service Tier & Technology', true)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions revenue_Insight', () => {
        component.language = {}
        component.language.revenue_Insight = 'Acquisition Revenue & Insights'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('Acquisition Revenue & Insights', true)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions acquisition', () => {
        component.language = {}
        component.language.acquisition = 'Acquisition Rate & Insights'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('Acquisition Rate & Insights', true)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions new_subscribe', () => {
        component.language = {}
        component.language.new_subscribe = 'New Subscribers by Service Tier & Technology'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('New Subscribers by Service Tier & Technology', false)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions revenue_Insight', () => {
        component.language = {}
        component.language.revenue_Insight = 'Acquisition Revenue & Insights'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('Acquisition Revenue & Insights', false)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions acquisition', () => {
        component.language = {}
        component.language.acquisition = 'Acquisition Rate & Insights'
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions('Acquisition Rate & Insights', false)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })
    it('should getFullScreenTablesData revenue_Insight', () => {
        component.language = {}
        component.language.revenue_Insight = 'Acquisition Revenue & Insights'
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        spyOn(component, 'getFullScreenTablesData').and.callThrough()
        component.getFullScreenTablesData('Acquisition Revenue & Insights', clickData)
        expect(component.getFullScreenTablesData).toHaveBeenCalled()
    })

    it('should getFullScreenTablesData acquisition', () => {
        component.language = {}
        component.language.acquisition = 'Acquisition Rate & Insights'
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        spyOn(component, 'getFullScreenTablesData').and.callThrough()
        component.getFullScreenTablesData('Acquisition Rate & Insights', clickData)
        expect(component.getFullScreenTablesData).toHaveBeenCalled()
    })


    it('should acquisationChartModalOpen new_subscribe', () => {
        component.language = {}
        component.language.new_subscribe = 'New Subscribers by Service Tier & Technology'
        spyOn(component, 'acquisationChartModalOpen').and.callThrough()
        component.acquisationChartModalOpen('New Subscribers by Service Tier & Technology')
        expect(component.acquisationChartModalOpen).toHaveBeenCalled()
    })

    it('should acquisationChartModalOpen revenue_Insight', () => {
        component.language = {}
        component.language.revenue_Insight = 'Acquisition Revenue & Insights'
        spyOn(component, 'acquisationChartModalOpen').and.callThrough()
        component.acquisationChartModalOpen('Acquisition Revenue & Insights')
        expect(component.acquisationChartModalOpen).toHaveBeenCalled()
    })

    it('should acquisationChartModalOpen acquisition', () => {
        component.language = {}
        component.language.acquisition = 'Acquisition Rate & Insights'
        spyOn(component, 'acquisationChartModalOpen').and.callThrough()
        component.acquisationChartModalOpen('Acquisition Rate & Insights')
        expect(component.acquisationChartModalOpen).toHaveBeenCalled()
    })


    it('should acquisitionSubscriberRevenueExport details', () => {
        spyOn(component, 'acquisitionSubscriberRevenueExport').and.callThrough()
        component.acquisitionSubscriberRevenueExport(acquisitionData)
        expect(component.acquisitionSubscriberRevenueExport).toHaveBeenCalled()
    })

    it('should acquisitionSubscriberUsageExport details', () => {
        let obj: any = [{ '0': 0 }, { '1': 0 }]
        useageData.series = [
            {
                "name": "Streaming Usage",
                data: obj
            }, {
                "name": "Gaming Usage",
                data: obj
            }, {
                "name": "Other Usage",
                data: obj
            },
        ]
        component.language = { subscriberUsage: 'Subscriber Usage' }
        component.subscriberUsageData = useageData
        spyOn(component, 'acquisitionSubscriberUsageExport').and.callThrough()
        component.acquisitionSubscriberUsageExport()
        expect(component.acquisitionSubscriberUsageExport).toHaveBeenCalled()
    })

    it('should acquisitionWifiScoreExport details', () => {
        component.language = { deviceandwifi: 'Devices and Wi-Fi Score Trend' }
        component.wifiTrendsData = useageData
        spyOn(component, 'acquisitionWifiScoreExport').and.callThrough()
        component.acquisitionWifiScoreExport()
        expect(component.acquisitionWifiScoreExport).toHaveBeenCalled()
    })

    it('should acquisitionServiceLimitsExport details', () => {
        component.language = { servicelimits: 'Service Limits' }
        let obj: any = [{ '0': 0 }, { '1': 0 }]
        let arr: any = [{ '0': "2022-07" }, { '1': "2022-08" }, { '2': "2022-09" }, { '3': "2022-10" }]
        useageData["categories"] = arr;
        useageData.series = [
            {
                "name": "Upstream Limit Hits",
                data: obj
            }, {
                "name": "Downstream Limit Hits",
                data: obj
            }
        ]
        component.serviceLimitData = useageData
        spyOn(component, 'acquisitionServiceLimitsExport').and.callThrough()
        component.acquisitionServiceLimitsExport()
        expect(component.acquisitionServiceLimitsExport).toHaveBeenCalled()
    })

    it('should acquisitionUsageByAppExport details', () => {
        component.usageByAppData = [{ "Unknown and Other": 21512.502 }, { "Streaming Media": 0 }]
        component.language = { usagebyapplication: 'Usage By Application', }
        spyOn(component, 'acquisitionUsageByAppExport').and.callThrough()
        component.acquisitionUsageByAppExport()
        expect(component.acquisitionUsageByAppExport).toHaveBeenCalled()
    })

    it('should topAppsExport details', () => {
        component.topAppsData = [{ application: 'Disney', application1: 'Disney', usage: '875.59' }, { application: 'Zoom', application1: 'Zoom', usage: '657.73' }, { application: 'Facebook', application1: 'Facebook', usage: '517.01' }, { application: 'Gaming (Zynga)', application1: 'Gaming (Zynga)', usage: '469.22' }, { application: 'Apple iCloud', application1: 'Apple iCloud', usage: '266.05' }]
        component.language = { Top_Appln: 'Top Applications' }
        spyOn(component, 'topAppsExport').and.callThrough()
        component.topAppsExport()
        expect(component.topAppsExport).toHaveBeenCalled()
    })

    it('should error newSubscriberServicetier Details', () => {
        component.language = {}
        component.language.new_subscribers_by_service_tier_technology = 'new-subscribers-by-service-tier-technology'
        spyOn(service, 'NewSubscribersServiceTierTech').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'newSubscribersByTechApiLoader').and.callThrough()
        component.newSubscribersByTechApiLoader('new-subscriber-tier-tech-chart', false)
        expect(component.newSubscribersByTechError).toBe(true)
        expect(component.newSubscribersByTechApiLoader).toHaveBeenCalled()

    })

    it('should error newSubscriberServicetier download', () => {
        component.language = {}
        component.language.new_subscribers_by_service_tier_technology = 'new-subscribers-by-service-tier-technology'
        spyOn(service, 'NewSubscribersServiceTierTech').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'newSubscribersByTechApiLoader').and.callThrough()
        component.newSubscribersByTechApiLoader('new-subscriber-tier-tech-chart', true)
        expect(component.newSubscribersByTechApiLoader).toHaveBeenCalled()

    })

    it('should error acquisitionRevenueInsightsApiLoader dounload', () => {
        component.language = {}
        component.language = { acquisition_revenue_insights: 'acquisition-revenue-insights' }
        component.revenueInsightsAccess = true;
        spyOn(component, 'acquisitionRevenueInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueInsights').and.returnValue(throwError({ status: 404 }))
        component.acquisitionRevenueInsightsApiLoader('acquisition-revenue-insights-chart', true)
        expect(component.fullScreenDownload).toBeFalsy()
    })

    it('should error acquisitionRevenueInsightsApiLoader details', () => {
        component.language = {}
        component.language = { acquisition_revenue_insights: 'acquisition-revenue-insights' }
        component.revenueInsightsAccess = true;
        spyOn(component, 'acquisitionRevenueInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRevenueInsights').and.returnValue(throwError({ status: 404 }))
        component.acquisitionRevenueInsightsApiLoader('acquisition-revenue-insights-chart', false)
        expect(component.fullScreenDownload).toBeFalsy()
    })

    it('should error acquisitionRateInsightsApi download', () => {
        component.language = { acquisition_rate_insights: 'acquisition-rate-insights' }
        spyOn(component, 'acquisitionRateInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRateInsights').and.returnValue(throwError({ status: 404 }))
        component.acquisitionRateInsightsApiLoader('acquisition-rate-insights-chart', true)
        expect(component.fullScreenDownload).toBeFalsy()
    })

    it('should error acquisitionRateInsightsApi details', () => {
        component.language = { acquisition_rate_insights: 'acquisition-rate-insights' }
        spyOn(component, 'acquisitionRateInsightsApiLoader').and.callThrough()
        spyOn(service, 'AquisitionRateInsights').and.returnValue(throwError({ status: 404 }))
        component.acquisitionRateInsightsApiLoader('acquisition-rate-insights-chart', false)
        expect(component.acquisitionRateInsightsError).toBe(true)
    })

    it('should apiErrorHandling', () => {
        spyOn(component, 'apiErrorHandling').and.callThrough()
        component.apiErrorHandling(errorStatus401)
        expect(component.acquisitionRateInsightsError).toBe(true)
        expect(component.apiErrorHandling).toHaveBeenCalled()
    })

    it('should error newSubscribersTierTechDrillDownApiLoader detils', () => {
        component.clickData = {
            tier: '60M',
            tech: 'Wireless',
            page: 1,
            size: 10,
            'org-id': '12921722',
            period: 'last-30d'
        }
        component.fullscreenTableError = false;
        spyOn(component, 'newSubscribersTierTechDrillDownApiLoader').and.callThrough()
        spyOn(service, 'NewSubscribersServiceTierTechDrillDown').and.returnValue(throwError({ status: 401 }))
        component.newSubscribersTierTechDrillDownApiLoader(component.clickData)
        expect(component.fullscreenTableError).toBe(true)
    })

})

