import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, flush } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateService } from "src/app-services/translate.service";
import { MarketingApiService } from "src/app/marketing/shared/services/marketing-api.sevice";
import { blockedThreatsInsights, ecosystemSubscribers, edgeIqSuiteSubscribers, houseHoldDeviceTrends, serviceTierAndTechnology, smartHomeInsights, wifiDeviceCategoryTrends } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/services/servicelens.service";
import { MarketingExploreDataSubscriberApiService } from "../marketing-subscrib-chart/marketing-explore-data-subscriberapi.service";
import { MarketingExploreDataAssignerService } from "../shared/services/data-assigners.service";
import { ExportDataChartOptionsService } from "../shared/services/explore-data-chart-options.service";
import { MarketingExploreCommonService } from "../shared/services/explore-data-common.service";
import { MarketingExploreDataServiceApiService } from "./marketing-explore-data-service-api.service";
import { MarketingServiceChartComponent } from "./marketing-service-chart.component";
import { of, throwError } from "rxjs";
import { blockedThreatsChartOptions, ecosystemSubscriberChartOptions, edgeIqSuiteSubscribersChartOption, householdDeviceTrendsChartOptions, serviceTierChartOptions, wifiCategoryTrendsChartOptions } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/services/servicechartoptions.service";
import Highcharts from "highcharts";
import { selectlanguageData } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/acquisition/acquisition.data";
import { devicePerHousehold } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/subscriber/subscriber.service";


describe('MarketingServiceChartComponent', () => {
    let component: MarketingServiceChartComponent;
    let fixture: ComponentFixture<MarketingServiceChartComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let httpTestingController: HttpTestingController;
    let service: MarketingExploreDataServiceApiService;
    let subService: MarketingExploreDataSubscriberApiService;
    let languageService:TranslateService;
    let marketingApiService:MarketingApiService;



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingServiceChartComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: 'marketing/explore-data', component: MarketingServiceChartComponent },
            ]), HttpClientTestingModule, NgSelectModule
            ],
            providers: [TranslateService, Title, MarketingExploreCommonService, MarketingApiService,
                MarketingExploreDataAssignerService, MarketingExploreDataSubscriberApiService,
                ExportDataChartOptionsService, MarketingExploreDataServiceApiService]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingServiceChartComponent);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                httpTestingController = TestBed.inject(HttpTestingController);
                service = TestBed.inject(MarketingExploreDataServiceApiService);
                subService = TestBed.inject(MarketingExploreDataSubscriberApiService);
                languageService=TestBed.inject(TranslateService);
                marketingApiService=TestBed.inject(MarketingApiService);
            });

    });

    it('should initialized onInit()', () => {
        spyOn(component, 'searchFilterApplyCheck').and.callThrough();
        spyOn(component, 'baseApiLoader').and.callThrough();
        languageService.selectedLanguage.next(selectlanguageData);

        component.ngOnInit();
        expect(component.searchFilterApplyCheck).toHaveBeenCalled();
        expect(component.searchFilterApplyCheck).toHaveBeenCalledTimes(1);
        expect(component.baseApiLoader).toHaveBeenCalled();
        expect(component.baseApiLoader).toHaveBeenCalledTimes(1);
    });

    it('should searchFilterApplyCheck', () => {
        (component as any).marketingExploreDataBasicApiService.filerValuesSubject = of({});
        spyOn(component,'fullScreenSearch');
        component.fullScreen = true;
        component.clickData = true;
        component.searchFilterApplyCheck();

        component.fullScreen = true;
        component.clickData = false;
        component.searchFilterApplyCheck();
    });

    it('should fullScreenSearch', () => {
        let chartName = 'Retention';
        let clickData = {page:0};
        spyOn(component,'getFullScreenChartOptions');
        spyOn(component,'getFullScreenTablesData');
        component.fullScreenSearch(chartName,clickData)
    });

    it('should fullScreenExpandFunction', () => {
        let chartName = 'Retention';
        let clickData = {page:0};
        component.fullScreen = false;
        spyOn(component,'getFullScreenChartOptions');
        spyOn(component,'getFullScreenTablesData');
        component.fullScreenExpandFunction(chartName,clickData);
    });

    it('should getFullScreenChartOptions', () => {
        let Serv_Tier_Tech = 'Service Tier';
        let download = true;
        component.language= {Serv_Tier_Tech:'Service Tier'};
        component.getFullScreenChartOptions(Serv_Tier_Tech,download);

        download = false;
        component.getFullScreenChartOptions(Serv_Tier_Tech);
    });

    it('should getFullScreenChartOptions', () => {
        let Household_Device_Trends = 'HouseHold';
        let download = true;
        component.language= {Household_Device_Trends:'HouseHold'};
        component.getFullScreenChartOptions(Household_Device_Trends,download);

        download = false;
        component.getFullScreenChartOptions(Household_Device_Trends);
    });

    it('should getFullScreenChartOptions', () => {
        let adoption_Chart = 'Adoption';
        let download = true;
        component.language= {adoption_Chart:'Adoption'};
        component.getFullScreenChartOptions(adoption_Chart,download);

        download = false;
        component.getFullScreenChartOptions(adoption_Chart);
    });

    it('should getFullScreenChartOptions', () => {
        let wifi_Category = 'WIFI';
        let download = true;
        component.language= {wifi_Category:'WIFI'};
        component.getFullScreenChartOptions(wifi_Category,download);

        download = false;``
        component.getFullScreenChartOptions(wifi_Category);
    });

    it('should getFullScreenChartOptions', () => {
        let blocked_threat = 'Block';
        let download = true;
        component.language= {blocked_threat:'Block'};
        component.getFullScreenChartOptions(blocked_threat,download);

        download = false;
        component.getFullScreenChartOptions(blocked_threat);
    });

    it('should getFullScreenChartOptions', () => {
        let command_Chart = 'Command';
        let download = true;
        component.language= {command_Chart:'Command'};
        component.getFullScreenChartOptions(command_Chart,download);

        download = false;
        component.getFullScreenChartOptions(command_Chart);
    });

    it('should get subscriberTierTech Details ', () => {
        spyOn(service, "SubscriberTierTech").and.returnValue(of(serviceTierAndTechnology))
        component.subscriberTierTechApiLoader('subscriber-tier-tech-chart', false)
        expect(component.subscriberTierTechDataObject).toBeTruthy("Could not find the data");
        expect(component.subscriberTierTechDataObject).toBe(serviceTierAndTechnology, "Value mismatched");
        expect(component.serviceTierChartData).toBeTruthy("Could not find the chart options");
        expect(component.serviceTierChartData.xAxis.title.text).toMatch(serviceTierChartOptions.xAxis.title.text, "text matched");
        expect(component.serviceTierChartData.title.text).toMatch('');
        expect(component.serviceTierChartData.yAxis.title.text).toMatch('Subscribers');
    });

    it('should get houseHoldDeviceTrends Details ', () => {
        spyOn(service, "HouseHoldDeviceTrends").and.returnValue(of(houseHoldDeviceTrends))
        component.householdDevicesTrendsApiLoader('household-device-trends-chart', false)
        expect(component.houseHoldTrendsData).toBeTruthy("Could not find the data");
        expect(component.houseHoldTrendsData).toBe(houseHoldDeviceTrends, "Value mismatched");
        expect(component.houseHoldChartData).toBeTruthy("Could not find the chart options");
        expect(component.houseHoldChartData.chart.type).toMatch(householdDeviceTrendsChartOptions.chart.type, "type matched");
        expect(component.houseHoldChartData.title.text).toMatch('');
        expect(component.houseHoldChartData.yAxis[0].title.text).toMatch('Wi-Fi Score');
    });

    it('should get serviceModuleAdoptionRate Details ', () => {
        spyOn(service, "ServiceModuleAdoption").and.returnValue(of(edgeIqSuiteSubscribers))
        component.serviceModuleAdoptionRateApiLoader('service-module-adoption-rate-chart')
        expect(component.serviceAdoptionData).toBeTruthy("Could not find the data");
        expect(component.serviceAdoptionData).toBe(edgeIqSuiteSubscribers, "Value mismatched");
        expect(component.serviceAdoptionChartData).toBeTruthy("Could not find the chart options");
        expect(component.serviceAdoptionChartData.chart.type).toMatch(edgeIqSuiteSubscribersChartOption.chart.type, "type matched");
        expect(component.serviceAdoptionChartData.title.text).toMatch('');
        expect(component.serviceAdoptionChartData.yAxis.title.text).toMatch('Subscribers');
    });

    it('should get ecoSystemRate Details ', () => {
        spyOn(service, "EcoModuleAdoption").and.returnValue(of(ecosystemSubscribers))
        component.ecoRateApiLoader('eco-rate-chart')
        expect(component.ecoAdoptionData).toBeTruthy("Could not find the data");
        expect(component.ecoAdoptionData).toBe(ecosystemSubscribers, "Value mismatched");
        expect(component.ecoAdoptionChartData).toBeTruthy("Could not find the chart options");
        expect(component.ecoAdoptionChartData.chart.type).toMatch(ecosystemSubscriberChartOptions.chart.type, "type matched");
        expect(component.ecoAdoptionChartData.title.text).toMatch('');
        expect(component.ecoAdoptionChartData.yAxis.title.text).toMatch('Subscribers');
    });

    it('should get wifiDeviceCategoryTrends Details ', () => {
        spyOn(service, "WifiDeviceTrends").and.returnValue(of(wifiDeviceCategoryTrends))
        component.wifiDeviceCategoryTrendsApiLoader('wifi-device-category-chart',false)
        expect(component.wifiDeviceData).toBeTruthy("Could not find the data");
        expect(component.wifiDeviceData).toBe(wifiDeviceCategoryTrends, "Value mismatched");
        expect(component.wifiChartData).toBeTruthy("Could not find the chart options");
        expect(component.wifiChartData.chart.type).toMatch(wifiCategoryTrendsChartOptions.chart.type, "type matched");
        expect(component.wifiChartData.title.text).toMatch('');
    });

    it('should get blockThreatsInsights Details ', () => {
        spyOn(service, "BlockedThreatsInsights").and.returnValue(of(blockedThreatsInsights))
        component.blockThreatsInsightsApiLoader('block-threats-insights-chart',false)
        expect(component.blockThreatsData).toBeTruthy("Could not find the data");
        expect(component.blockThreatsData).toBe(blockedThreatsInsights, "Value mismatched");
        expect(component.blockThreatsChartData).toBeTruthy("Could not find the chart options");
        expect(component.blockThreatsChartData.chart.type).toMatch(blockedThreatsChartOptions.chart.type, "type matched");
        expect(component.blockThreatsChartData.title.text).toMatch('');
        expect(component.blockThreatsChartData.exporting.enabled).toBeFalse();
        expect(component.blockThreatsChartData.credits.enabled).toBeFalse();
    });


    it('should render highCharts',()=>{

        // component.Highcharts.chart('subscriber-tier-tech-chart',serviceTierChartOptions)
        // component.Highcharts.chart('household-device-trends-chart',householdDeviceTrendsChartOptions)
        // component.Highcharts.chart('service-module-adoption-rate-chart',edgeIqSuiteSubscribersChartOption)
        // component.Highcharts.chart('eco-rate-chart',ecosystemSubscriberChartOptions)
        // component.Highcharts.chart('wifi-device-category-chart',wifiCategoryTrendsChartOptions)
        // component.Highcharts.chart('block-threats-insights-chart',blockedThreatsChartOptions)
        // fixture.detectChanges()
        // const testServiceTier=fixture.nativeElement.querySelectorAll('#ServTierTech')
        // const testHousehold=fixture.nativeElement.querySelectorAll('#HouseholdDeviceTrends')
        // const testAdoption=fixture.nativeElement.querySelectorAll('#adoptionChart')
        // const testEcoRate=fixture.nativeElement.querySelectorAll('#ecoChart')
        // const testwifiCategory=fixture.nativeElement.querySelectorAll('#wifiCategory')
        // const testblockedthreat=fixture.nativeElement.querySelectorAll('#blockedthreat')
        // expect(testServiceTier[0].textContent).toMatch('Service Tier & Technology')
        // expect(testHousehold[0].textContent).toMatch('Household Device Trends')
        // expect(testAdoption[0].textContent).toMatch('Edge IQ Suite Subscribers')
        // expect(testEcoRate[0].textContent).toMatch('Ecosystem Subscribers')
        // expect(testwifiCategory[0].textContent).toMatch('Wi-Fi Device Category Trends')
        // expect(testblockedthreat[0].textContent).toMatch('Blocked Threats Insights')
    })

    it('should render Smart home insights table', () => {
        spyOn(service,'CommandIQinsights').and.returnValue(of(smartHomeInsights))
        component.commandIQInsightsApiLoader();
        expect(component.commandIQ_Array).toBeTruthy('Could not find the data')
        expect(component.commandIQ_Array).toBe(smartHomeInsights,'value matched')
        expect(component.commandIQInsightsDataAvailable).toBeTruthy();
    });

    it('should call subscriberTierTechApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
            let download = true;
        spyOn(service, 'SubscriberTierTech').and.returnValue(throwError(error));
        component.subscriberTierTechApiLoader(component.clickData,download);

        download = false;
        component.subscriberTierTechApiLoader(component.clickData,download);
    });

    it('should get householdDevicesTrendsApiLoader Details ', () => {
        spyOn(subService, "DevicePerHouseHold").and.returnValue(of(devicePerHousehold))
        component.householdDevicesTrendsApiLoader('household-device-trends-chart', false)
    });

    it('should call householdDevicesTrendsApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
            let download = true;
        spyOn(service, 'HouseHoldDeviceTrends').and.returnValue(throwError(error));
        component.householdDevicesTrendsApiLoader(component.clickData,download);

        download = false;
        component.householdDevicesTrendsApiLoader(component.clickData,download);
    });

    it('should call serviceModuleAdoptionRateApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'ServiceModuleAdoption').and.returnValue(throwError(error));
        component.serviceModuleAdoptionRateApiLoader(component.clickData,);
    });

    it('should call serviceModuleAdoptionRateApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'ServiceModuleAdoption').and.returnValue(throwError(error));
        component.serviceModuleAdoptionRateApiLoader(component.clickData,);
    });

    it('should call ecoRateApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'EcoModuleAdoption').and.returnValue(throwError(error));
        component.ecoRateApiLoader(component.clickData,);
    });

    it('should call wifiDeviceCategoryTrendsApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
            let download = true;
        spyOn(service, 'WifiDeviceTrends').and.returnValue(throwError(error));
        component.wifiDeviceCategoryTrendsApiLoader(component.clickData,download);

        download = false;
        component.wifiDeviceCategoryTrendsApiLoader(component.clickData,download);
    });

    it('should call blockThreatsInsightsApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
            let download = true;
        spyOn(service, 'BlockedThreatsInsights').and.returnValue(throwError(error));
        component.blockThreatsInsightsApiLoader(component.clickData,download);

        download = false;
        component.blockThreatsInsightsApiLoader(component.clickData,download);
    });

    it('should call commandIQInsightsApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'CommandIQinsights').and.returnValue(throwError(error));
        component.commandIQInsightsApiLoader(component.clickData);
    });

    it('should call serviceModuleAdoptionRateExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.serviceModuleAdoptionRateExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should serviceModuleAdoptionRateExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.serviceModuleAdoptionRateExportApiLoader()
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should call ecoModuleAdoptionRateExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.ecoModuleAdoptionRateExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should ecoModuleAdoptionRateExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.ecoModuleAdoptionRateExportApiLoader()
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should call commandIQInsightsExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.commandIQInsightsExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should commandIQInsightsExportApiLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.commandIQInsightsExportApiLoader()
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should call getFullScreenTablesData', () => {
        let chartName = 'Service Tier';
        let clickData = {page:0};
        component.language = {Serv_Tier_Tech: 'Service Tier'};
        spyOn(component,'subscribersTierTechDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData)
    });

    it('should call getFullScreenTablesData', () => {
        let chartName = 'Blocked Tier';
        let clickData = {page:0};
        component.language = {blocked_threat: 'Blocked Tier'};
        spyOn(component,'blockedThreatsInsightsDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData)
    });

    it('should call getExportMenus', () => {
        component.fullScreenChart = 'Service Tier';
        component.clickData = {
            tier: '300M',
            page: 1,
            size: 10,
            start: '2022-04-01',
            end: '2022-04-30'
        }        
        component.language = {Serv_Tier_Tech: 'Service Tier'};
        // spyOn(component,'churnRateInsightsDrillDownApiLoader');
        component.getExportMenus

        component.fullScreenChart = 'Blocked';
        component.language = {blocked_threat: 'Blocked'};
        component.getExportMenus
    });

    it('should call subscribersTierTechDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SubscriberTierTechDrillDown').and.returnValue(of({}));
        component.subscribersTierTechDrillDownApiLoader(component.clickData);
    });

    it('should call subscribersTierTechDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SubscriberTierTechDrillDown').and.returnValue(throwError(error));
        component.subscribersTierTechDrillDownApiLoader(component.clickData);
    });

    it('should call blockedThreatsInsightsDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'BlockedThreatsInsightsDrillDown').and.returnValue(of({}));
        component.blockedThreatsInsightsDrillDownApiLoader(component.clickData);
    });

    it('should call blockedThreatsInsightsDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'BlockedThreatsInsightsDrillDown').and.returnValue(throwError(error));
        component.blockedThreatsInsightsDrillDownApiLoader(component.clickData);
    });

    it('should call loadMore', () => {
        component.clickData = {
            tier: '300M',
            page: 1
        };
        component.loadingBtn = false;
        spyOn(component,'getFullScreenTablesData');
        component.loadMore();
    });

    it('should call drillDownExportApiLoader', () => {
        let chartName = 'Service';
        let clickData = {page:1};
        component.language= {Serv_Tier_Tech:'Service'};
        spyOn(component,'subscribersTierTechDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        chartName = 'Block';
        component.language= {blocked_threat:'Block'};
        spyOn(component,'blockedThreatsInsightsDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

    });

    it('should call subscribersTierTechDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.subscribersTierTechDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should call subscribersTierTechDrillDownExportApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error));
        component.subscribersTierTechDrillDownExportApiLoader(component.clickData);
    });

    // it('should call blockedThreatsInsightsDrillDownExportApiLoader', () => {
    //     let error = {status:'',message:'Error'};
    //     component.clickData = {
    //         tier: '300M',
    //         page: 1};
    //     spyOn(service, 'BlockedThreatsInsightsDrillDownExport').and.returnValue(of(blockedThreatsInsights));
    //     component.blockedThreatsInsightsDrillDownExportApiLoader(component.clickData);
    // });

    // it('should call blockedThreatsInsightsDrillDownExportApiLoader', () => {
    //     let error = {status:'',message:'Error'};
    //     component.clickData = {
    //         tier: '300M',
    //         page: 1};
    //     spyOn(service, 'BlockedThreatsInsightsDrillDownExport').and.returnValue(throwError(error));
    //     component.blockedThreatsInsightsDrillDownExportApiLoader(component.clickData);
    // });

    it('should downloadFunction details', () => {
        component.clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        component.language = [];
        spyOn(component,'getFullScreenChartOptions');
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('New Subscribers by Service Tier & Technology', 'Export Subscriber List (<20M / Cable)')
        expect(component.downloadFunction).toHaveBeenCalled()
    })

    it('should call fullScreenCloseFunction', () => {
        component.fullScreenCloseFunction();
    });

    it('should call serviceChartModalOpen', () => {
        let modeldata = 'Service';
        component.language= {Serv_Tier_Tech:'Service'};
        component.serviceChartModalOpen(modeldata);

        modeldata = 'Household_Device_Trends';
        component.language= {Household_Device_Trends:'Household_Device_Trends'};
        component.serviceChartModalOpen(modeldata);

        modeldata = 'adoption_Chart';
        component.language= {adoption_Chart:'adoption_Chart'};
        component.serviceChartModalOpen(modeldata);

        modeldata = 'wifi_Category';
        component.language= {wifi_Category:'wifi_Category'};
        component.serviceChartModalOpen(modeldata);

        modeldata = 'blocked_threat';
        component.language= {blocked_threat:'blocked_threat'};
        component.serviceChartModalOpen(modeldata);

        modeldata = 'command_Chart';
        component.language= {command_Chart:'command_Chart'};
        component.serviceChartModalOpen(modeldata);
    });

})