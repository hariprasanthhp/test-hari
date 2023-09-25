import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, flush } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import {  of, throwError } from "rxjs";
import { TranslateService } from "src/app-services/translate.service";
import { MarketingApiService } from "src/app/marketing/shared/services/marketing-api.sevice";
import { ExportDataChartOptionsService } from "../shared/services/explore-data-chart-options.service";
import { MarketingExploreCommonService } from "../shared/services/explore-data-common.service";
import { MarketingApplicationChartComponent } from "./marketing-application-chart.component";
import { MarketingExploreDataApplicationApiService } from "./marketing-explore-data-application-api.service";
import { applicationChannelHeatmap, socialChannelList, topApplications, topGamingApplications, usageByApplicationDrillData, usageByApplicationType, userCountByTopApp, userCountTopGamingApp } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/application/application.service';
import { socialHeatmapChartOptions, usageByApplicatonChartOptions } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/application/applicationchartoptions.service';
import { errorStatus401 } from "src/assets/mockdata/shared/error.data";
import { MarketingExploreDataBasicApiService } from "../explore-data-basic-api.service";
import Highcharts from "highcharts";
import { EnglishJSON } from "src/assets/language/english.service";

describe('MarketingApplicationChartComponent', () => {
    let component: MarketingApplicationChartComponent;
    let fixture: ComponentFixture<MarketingApplicationChartComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let httpTestingController: HttpTestingController;
    let service: MarketingExploreDataApplicationApiService;
    let marketingApiService: MarketingApiService;
    let languageService: TranslateService;
    let serviceSubject: MarketingExploreDataBasicApiService;
    let clickData = {
        group: 'Streaming Media',
        page: 1,
        size: 10,
        period: 'last-30d',
        tech: "",
        application: ""
    }
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingApplicationChartComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: 'marketing/explore-data', component: MarketingApplicationChartComponent },
            ]), HttpClientTestingModule, NgSelectModule
            ],
            providers: [TranslateService, Title, MarketingExploreCommonService, MarketingApiService,
                MarketingExploreDataApplicationApiService,
                ExportDataChartOptionsService, MarketingExploreDataBasicApiService]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingApplicationChartComponent);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                httpTestingController = TestBed.inject(HttpTestingController);
                service = TestBed.inject(MarketingExploreDataApplicationApiService);
                languageService = TestBed.inject(TranslateService);
                marketingApiService = TestBed.inject(MarketingApiService);
                serviceSubject = TestBed.inject(MarketingExploreDataBasicApiService);
            });
    })
    it('should initialized onInit()', () => {
        spyOn(component, 'searchFilterApplyCheck').and.callThrough();
        spyOn(component, 'baseApiLoader').and.callThrough();
    
        component.ngOnInit();
        let eng = new EnglishJSON;
        languageService.selectedLanguage.next(of(eng));
        expect(component.searchFilterApplyCheck).toHaveBeenCalled();
        expect(component.searchFilterApplyCheck).toHaveBeenCalledTimes(1);
        expect(component.baseApiLoader).toHaveBeenCalled();
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = 'Usage by Application Type'
        fixture.detectChanges()
        component.getExportMenus
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = 'Top Applications'
        fixture.detectChanges()
        component.getExportMenus
    })
    it('should call getExportMenus', () => {
        component.clickData = true;
        component.fullScreenChart = 'Top Gaming Applications'
        fixture.detectChanges()
        component.getExportMenus
    })
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
        serviceSubject.filerValuesSubject.next(true);
        expect(component.fullScreenSearch).toHaveBeenCalledWith(component.fullScreenChart, component.clickData);
    });
    it('should call fullScreenSearch , clickData is undefined', () => {
        spyOn(component, 'fullScreenSearch');
        component.fullScreen = false;
        component.clickData = undefined;
        component.searchFilterApplyCheck();
        serviceSubject.filerValuesSubject.next(true);   
    });
    it('should get usageByApplication type', () => {
        spyOn(service, 'UsageByApp').and.returnValue(of(usageByApplicationType))
        component.usageByAppApiLoader('usage-by-app-chart', false)
        expect(component.applicationUsageData).toBeTruthy('value is not matched')
        expect(component.applicationUsageData).toBe(usageByApplicationType, 'value mismatched')
        expect(component.applicationChartData).toBeTruthy('')
        expect(component.applicationChartData.title.text).toMatch('')
        expect(component.applicationChartData.chart.type).toMatch(usageByApplicatonChartOptions.chart.type, 'type matched')
    })

    it('should get socialChannelList Details', () => {
        spyOn(service, 'SocialChannelAppList').and.returnValue(of(socialChannelList))
        component.socialChannelListApiLoader()
        expect(component.socialChannelListData).toBeTruthy('value is not matched')
        expect(component.socialChannelListData).toBe(socialChannelList, 'value mismatched')
    })

    it('should get socialHeatMap details', () => {
        spyOn(service, 'SocialHeatMap').and.returnValue(of(applicationChannelHeatmap))
        languageService.selectedLanguage.subscribe(data => {
            component.language = data;
        })
        component.socialChannelSelected = 'Facebook'
        component.socialChannelChartLoader(applicationChannelHeatmap, 'social-heat-map')
        component.socialHeatMapApiLoader('social-heat-map', false)
        expect(component.socialHeatMapData).toBeTruthy('value is not matched')
        expect(component.socialHeatMapData).toBe(applicationChannelHeatmap, 'value mismatched')
        expect(component.socialHeatMapChartData).toBeTruthy('')
        expect(component.socialHeatMapDataError).toBeFalse()
        expect(component.socialHeatMapChartData.title.text).toMatch('')
        expect(component.socialHeatMapChartData.xAxis.type).toMatch(socialHeatmapChartOptions.xAxis.type, 'type matched')
    })

    it('should render charts', () => {
        component.Highcharts.chart('usage-by-app-chart', usageByApplicatonChartOptions)
        component.Highcharts.chart('social-heat-map', socialHeatmapChartOptions)
        fixture.detectChanges();
        const testTopApplication = fixture.nativeElement.querySelectorAll('#TopApplication')
        const testTopGamingApplication = fixture.nativeElement.querySelectorAll('#TopgamingApplicatins')
        const testUsage = fixture.nativeElement.querySelectorAll('#UsageByAppln')
        const testSocialMap = fixture.nativeElement.querySelectorAll('#SocialHeatMap')
        expect(testUsage[0].textContent).toMatch('Usage by Application Type')
        expect(testSocialMap[0].textContent).toMatch('Social Channel Heatmap')
        expect(testTopApplication[0].textContent).toMatch('Top Applications')
        expect(testTopGamingApplication[0].textContent).toMatch('Top Gaming Applications')

    })

    it('should get top application details', () => {
        spyOn(service, 'TopApp').and.returnValue(of(topApplications))
        component.topAppApiLoader()
        expect(component.topLoaderAppData).toBeTruthy('value is not matched')
        expect(component.topLoaderAppData).toBe(topApplications, 'value mismatched')
    })

    it('should get top gaming application details', () => {
        spyOn(service, 'TopGamingApp').and.returnValue(of(topGamingApplications))
        component.topGammingAppApiLoader()
        expect(component.topGamingLoaderData).toBeTruthy('value is not matched')
        expect(component.topGamingLoaderData).toBe(topGamingApplications, 'value mismatched')
    })

    it('should get usageByDrilldata details', () => {
        spyOn(service, 'UsageByAppDrillDown').and.returnValue(of(usageByApplicationDrillData))
        component.clickData = {
            group: 'Streaming Media',
            page: 1,
            size: 10,
            period: 'last-30d'
        }
        component.usageByAppDrillDownApiLoader(component.clickData)
        expect(component.usageByAppDrillDownData).toBeTruthy('value is not matched')
        expect(component.usageByAppDrillDownData).toBe(usageByApplicationDrillData, 'value mismatched')
    })

    it('should get TopAppDrilldata details', () => {
        spyOn(service, 'TopAppDrillDown').and.returnValue(of(userCountByTopApp))
        component.clickData = {
            group: 'Google',
            page: 1,
            size: 10,
            period: 'last-30d'
        }
        component.topAppDrillDownApiLoader(component.clickData)
        expect(component.topAppApiLoaderDrillData).toBeTruthy('value is not matched')
        expect(component.topAppApiLoaderDrillData).toBe(userCountByTopApp, 'value mismatched')
    })

    it('should get TopGamingAppDrilldata details', () => {
        spyOn(service, 'TopGamingAppDrillDown').and.returnValue(of(userCountTopGamingApp))
        component.clickData = {
            app: 'Gaming (Twitch TV)',
            group: 'gaming',
            page: 1,
            size: 100,
            period: 'last-30d'
        }
        component.topGamingAppDrillDownApiLoader(component.clickData)
        expect(component.topGamingAppApiLoaderDrillData).toBeTruthy('value is not matched')
        expect(component.topGamingAppApiLoaderDrillData).toBe(userCountTopGamingApp, 'value mismatched')
    })

    it('should render resetData details', () => {
        spyOn(component, 'resetDataFunction').and.callThrough()
        expect(component.loadMoreButton).toBeFalse()
        expect(component.usageByAppDataAvailable).toBeFalse()
        expect(component.topAppDataAvailable).toBeFalse()
        expect(component.topGamingAppDataAvailable).toBeFalse()
        expect(component.socialHeatMapDataAvailable).toBeFalse()
    })

    it('should call apiErrorHandling', () => {
        spyOn(component, 'apiErrorHandling').and.callThrough()
        component.apiErrorHandling(errorStatus401)
        expect(component.topGamingAppDataError).toBe(true)
        expect(component.topGamingAppDataErrorMsg).toBe('Access Denied')
        expect(component.apiErrorHandling).toHaveBeenCalled()
    })

    it('should call fullScreenExpandFunction Details with clickdata', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        let clickData = { page: 1, size: '10', tech: "", tier: "1G" }
        spyOn(component, 'fullScreenExpandFunction').and.callThrough()
        component.fullScreenExpandFunction('Usage by Application Type', clickData)
        expect(component.fullScreen).toBe(true)
        expect(component.fullScreenChart).toBe('Usage by Application Type')
        expect(component.fullScreenExpandFunction).toHaveBeenCalled()
    })

    it('should call fullScreenExpandFunction Details', () => {
        component.fullScreen = false
        let clickData = { page: 1, size: '10', tech: "", tier: "1G" }
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'fullScreenExpandFunction').and.callThrough()
        component.fullScreenExpandFunction('Usage by Application Type', clickData)
        expect(component.fullScreen).toBe(true)
        expect(component.fullScreenChart).toBe('Usage by Application Type')
        expect(component.fullScreenExpandFunction).toHaveBeenCalled()
    })

    it('should call fullScreenCloseFunction details', () => {
        component.language = { "No Data Available": "No Data Available" }
        component.socialHeatMapDataErrorMsg = 'No Data Available'
        spyOn(component, 'fullScreenCloseFunction').and.callThrough()
        component.fullScreenCloseFunction()
        expect(component.fullScreen).toBeFalsy()
        expect(component.appHistoryTableDataArray).toBeUndefined();
        expect(component.fullScreenTableAvailable).toBeFalsy();
        expect(component.clickData).toBeUndefined();
        expect(component.fullScreenCloseFunction).toHaveBeenCalled()
    })

    it('should call errorReset', () => {
        spyOn(component, 'errorReset').and.callThrough()
        component.errorReset()
        expect(component.applicationchartDownloadError).toBeFalsy()
        expect(component.applicationchartDownloadErrorMsg).toBeFalsy()
        expect(component.errorReset).toHaveBeenCalled()
    })

    it('should call fullScreenSearch', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'fullScreenSearch').and.callThrough()
        component.fullScreenSearch('Usage by Application Type')
        expect(component.dataAvailable).toBeFalsy()
        expect(component.fullScreenTableAvailable).toBeFalsy()
        expect(component.fullScreenSearch).toHaveBeenCalled()
    })

    it('should call fullScreenSearch with clickData', () => {
        component.clickData = {
            group: '',
            page: 1,
            size: 10,
            period: ''
        }
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'fullScreenSearch').and.callThrough()
        component.fullScreenSearch('Usage by Application Type', component.clickData)
        expect(component.tableLoader).toBe(true)
        expect(component.fullScreenTableAvailable).toBeFalsy()
        expect(component.fullScreenSearch).toHaveBeenCalled()
    })

    it('should select social channel', () => {
        spyOn(component, 'selectSocialChannel').and.callThrough()
        component.selectSocialChannel('Facebook')
        expect(component.socialChannelSelected).toBe('Facebook')
        expect(component.socialHeatMapDataAvailable).toBeFalsy()
        expect(component.selectSocialChannel).toHaveBeenCalled()
    })

    it('should select social channel with fullscreen', () => {
        component.fullScreen = true
        component.language = { SocialHeatMap: "Social Channel Heatmap" }
        spyOn(component, 'selectSocialChannel').and.callThrough()
        component.getFullScreenChartOptions(component.language.SocialHeatMap)
        component.selectSocialChannel('Facebook')
        expect(component.selectSocialChannel).toHaveBeenCalled()
    })

    it('should call loadMore details', () => {
        component.clickData = {
            group: '',
            page: 1,
            size: 10,
            period: ''
        }
        component.loadingBtn = false;
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        component.fullScreenChart = component.language.Usage_By_Appln
        spyOn(component, 'loadMore').and.callThrough()
        component.loadMore()
        expect(component.loadMore).toHaveBeenCalled()
    })

    it('should call download functions', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('Usage by Application Type')
        expect(component.downloadFunction).toHaveBeenCalled()
    })

    it('should call download functions with exportmenu', () => {
        component.clickData = {
            page: 1,
            size: 10,
            period: 'last-30d',
            tech: "Streaming Meadia",
            application: ""
        }
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('Usage by Application Type', 'Export Applications List(Streaming Meadia)')
        expect(component.downloadFunction).toHaveBeenCalled()
    })

    it('should get download csv usageByApplicationtype', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(service, 'UsageByApp').and.returnValue(of(usageByApplicationType))
        component.usageByAppApiLoader('Usage by Application Type', true)
        expect(component.applicationUsageData).toBeTruthy('value is not matched')
        expect(component.applicationUsageData).toBeTruthy('value is not matched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should get top application details download', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(service, 'TopApp').and.returnValue(of(topApplications))
        component.topAppApiLoader('Top Applications', true)
        expect(component.topLoaderAppData).toBeTruthy('value is not matched')
        expect(component.topLoaderAppData).toBe(topApplications, 'value mismatched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should get top gaming application details download', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(service, 'TopGamingApp').and.returnValue(of(topGamingApplications))
        component.topGammingAppApiLoader('Top Gaming Applications', true)
        expect(component.topGamingLoaderData).toBeTruthy('value is not matched')
        expect(component.topGamingLoaderData).toBe(topGamingApplications, 'value mismatched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should get socialHeatMap details', () => {
        component.language = { SocialHeatMap: "Social Channel Heatmap" }
        spyOn(service, 'SocialHeatMap').and.returnValue(of(applicationChannelHeatmap))
        languageService.selectedLanguage.subscribe(data => {
            component.language = data;
        })
        component.socialChannelSelected = 'Facebook'
        component.socialChannelChartLoader(applicationChannelHeatmap, 'social-heat-map')
        component.socialHeatMapApiLoader('Social Channel Heatmap', true)
        expect(component.socialHeatMapData).toBeTruthy('value is not matched')
        expect(component.socialHeatMapData).toBe(applicationChannelHeatmap, 'value mismatched')
        expect(component.fullScreenDownload).toBe(true)
    })

    it('should call usageByAppDrillDownExportApiLoader details', () => {
        spyOn(component, 'usageByAppDrillDownExportApiLoader').and.callThrough()
        component.usageByAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.usageByAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topAppDrillDownExportApiLoader details', () => {
        spyOn(component, 'topAppDrillDownExportApiLoader').and.callThrough()
        component.topAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.topAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topGamingAppDrillDownExportApiLoader details', () => {
        spyOn(component, 'topGamingAppDrillDownExportApiLoader').and.callThrough()
        component.topGamingAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.topGamingAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call drillDownExportApiLoader usageapplication', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('Usage by Application Type', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call drillDownExportApiLoader topapplication', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('Top Applications', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call drillDownExportApiLoader topgamingapplication', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(component, 'drillDownExportApiLoader').and.callThrough()
        component.drillDownExportApiLoader('Top Gaming Applications', clickData)
        expect(component.drillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call getFullScreenTablesData topgamingapplication', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(component, 'getFullScreenTablesData').and.callThrough()
        component.getFullScreenTablesData('Top Gaming Applications', clickData)
        expect(component.getFullScreenTablesData).toHaveBeenCalled()
    })

    it('should call getFullScreenTablesData topapplication', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(component, 'getFullScreenTablesData').and.callThrough()
        component.getFullScreenTablesData('Top Applications', clickData)
        expect(component.getFullScreenTablesData).toHaveBeenCalled()
    })


    it('should call usageByAppDrillDown csv', () => {
        let res: any = { size: "405", type: "application/csv" }
        let blob = new Blob([res], { type: res.type })
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        spyOn(component, 'usageByAppDrillDownExportApiLoader').and.callThrough()
        component.usageByAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.usageByAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topAppDrillDown csv', () => {
        let res: any = { size: "405", type: "application/csv" }
        let blob = new Blob([res], { type: res.type })
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        spyOn(component, 'topAppDrillDownExportApiLoader').and.callThrough()
        component.topAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.topAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topGamingAppDrillDown csv', () => {
        let res: any = { size: "405", type: "application/csv" }
        let blob = new Blob([res], { type: res.type })
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        spyOn(component, 'topGamingAppDrillDownExportApiLoader').and.callThrough()
        component.topGamingAppDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.topGamingAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions with application details', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions(component.language.Top_Appln)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions with gaming details ', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(component, 'getFullScreenChartOptions').and.callThrough()
        component.getFullScreenChartOptions(component.language.Top_gaming_Applicatins)
        expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should get usageByApplication throw error', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(service, 'UsageByApp').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'usageByAppApiLoader').and.callThrough()
        component.usageByAppApiLoader('usage-by-app-chart', true)
        expect(component.fullScreenDownload).toBeFalsy()
        expect(component.usageByAppApiLoader).toHaveBeenCalled()

    })

    it('should  topApplication throw error', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(service, 'TopApp').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topAppApiLoader').and.callThrough()
        component.topAppApiLoader('Top Applications', true)
        expect(component.fullScreenDownload).toBeFalsy()
        expect(component.topAppApiLoader).toHaveBeenCalled()

    })

    it('should  topgamingApplication throw error', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(service, 'TopGamingApp').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topGammingAppApiLoader').and.callThrough()
        component.topGammingAppApiLoader('Top Gaming Applications', true)
        expect(component.fullScreenDownload).toBeFalsy()
        expect(component.topGammingAppApiLoader).toHaveBeenCalled()

    })

    it('should get socialHeatMap error details', () => {
        spyOn(service, 'SocialHeatMap').and.returnValue(throwError({ status: 404 }))
        component.socialChannelSelected = 'Facebook'
        component.socialChannelChartLoader(applicationChannelHeatmap, 'social-heat-map')
        component.socialHeatMapApiLoader('social-heat-map', true)
        expect(component.fullScreenDownload).toBeFalsy()
    })

    it('should get socialHeatMap socialChannel DeSelected', () => {
        component.language = { SocialHeatMap_d: "social-channel-heatmap" }
        spyOn(component, 'socialHeatMapApiLoader').and.callThrough()
        component.socialChannelSelected = ''
        component.socialHeatMapApiLoader('social-heat-map', true)
        expect(component.isSocialMapData).toBeFalsy()
    })

    it('should call closeModal details', () => {
        spyOn(component, 'closeModal').and.callThrough()
        component.closeModal()
        expect(component.closeModal).toHaveBeenCalled()
    })

    it('should call applicationChartModalOpen usage by application', () => {
        component.language = { Usage_By_Appln: "Usage by Application Type" }
        spyOn(component, 'applicationChartModalOpen').and.callThrough()
        component.applicationChartModalOpen('Usage by Application Type')
        expect(component.popup_heading).toBe('Usage by Application Type')
        expect(component.applicationChartModalOpen).toHaveBeenCalled()

    })

    it('should call applicationChartModalOpen top application', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(component, 'applicationChartModalOpen').and.callThrough()
        component.applicationChartModalOpen('Top Applications')
        expect(component.popup_heading).toBe('Top Applications')
        expect(component.applicationChartModalOpen).toHaveBeenCalled()

    })

    it('should call applicationChartModalOpen top gaming application', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(component, 'applicationChartModalOpen').and.callThrough()
        component.applicationChartModalOpen('Top Gaming Applications')
        expect(component.popup_heading).toBe('Top Gaming Applications')
        expect(component.applicationChartModalOpen).toHaveBeenCalled()

    })

    it('should call applicationChartModalOpen socail heat map', () => {
        component.language = { SocialHeatMap: "Social Channel Heatmap" }
        spyOn(component, 'applicationChartModalOpen').and.callThrough()
        component.applicationChartModalOpen('Social Channel Heatmap')
        expect(component.popup_heading).toBe('Social Channel Heatmap')
        expect(component.applicationChartModalOpen).toHaveBeenCalled()

    })

    it('should call usageByAppDrillDown error', () => {
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'usageByAppDrillDownExportApiLoader').and.callThrough()
        component.usageByAppDrillDownExportApiLoader(clickData)
        expect(component.usageByAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topAppDrillDown error', () => {
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topAppDrillDownExportApiLoader').and.callThrough()
        component.topAppDrillDownExportApiLoader(clickData)
        expect(component.topAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call topGamingAppDrillDown error', () => {
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topGamingAppDrillDownExportApiLoader').and.callThrough()
        component.topGamingAppDrillDownExportApiLoader(clickData)
        expect(component.topGamingAppDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should get socialHeatMap download error details', () => {
        spyOn(service, 'SocialHeatMap').and.returnValue(throwError({ status: 404 }))
        component.socialChannelSelected = 'Facebook'
        component.socialChannelChartLoader(applicationChannelHeatmap, 'social-heat-map')
        component.socialHeatMapApiLoader('social-heat-map', false)
        expect(component.isSocialMapData).toBeFalsy()
    })

    it('should  topApplication throw download error', () => {
        component.language = { Top_Appln: "Top Applications" }
        spyOn(service, 'TopApp').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topAppApiLoader').and.callThrough()
        component.topAppApiLoader('Top Applications', false)
        expect(component.topAppDataError).toBe(true)
        expect(component.topAppApiLoader).toHaveBeenCalled()

    })

    it('should  topgamingApplication throw download error', () => {
        component.language = { Top_gaming_Applicatins: "Top Gaming Applications" }
        spyOn(service, 'TopGamingApp').and.returnValue(throwError({ status: 404 }))
        spyOn(component, 'topGammingAppApiLoader').and.callThrough()
        component.topGammingAppApiLoader('Top Gaming Applications', false)
        expect(component.topGamingAppDataError).toBe(true)
        expect(component.topGammingAppApiLoader).toHaveBeenCalled()

    })

    it('should get socialChannelList with no response', () => {
        component.language = { "No Data Available": "No Data Available" }
        component.socialHeatMapDataErrorMsg = 'No Data Available'
        spyOn(service, 'SocialChannelAppList').and.returnValue(of([]))
        spyOn(component, 'socialChannelListApiLoader').and.callThrough()
        component.socialChannelListApiLoader()
        expect(component.dataAvailable).toBe(true)
        expect(component.socialHeatMapDataAvailable).toBeFalsy()
    })

    



})

