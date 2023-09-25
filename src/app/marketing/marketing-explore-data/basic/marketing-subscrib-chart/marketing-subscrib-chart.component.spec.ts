import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { async, of, throwError } from "rxjs";
import { TranslateService } from "src/app-services/translate.service";
import { MarketingApiService } from "src/app/marketing/shared/services/marketing-api.sevice";
import { MarketingCommonService } from "src/app/marketing/shared/services/marketing-common.service";
import { dataUsageTrendsChartOption, devicePerHouseholdChartOption, gamingSubscriberChartOption, streamingSubscriberChartOption, subscriberActivityTrendsChartOption, subscriberDataUsageChartOption, wfhSubscribersChartOption } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/subscriber/chartoption.service";
import { ActiveSubscribercount, dataUsageTrendsMockData, serviceGamingSubscribers, serviceWfhSubscribers, streamingSubscribers, subscriberActivityTrendsData, SubscriberDataUsage, Usercount, devicePerHousehold, subscriberDataUsageDrilldown, streamingSubscriberDrilldown, gamingSubscriberDrilldown, wfhSubscriberDrilldown } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/subscriber/subscriber.service";
import { errorStatus401 } from "src/assets/mockdata/shared/error.data";
import { MarketingExploreDataAssignerService } from "../shared/services/data-assigners.service";
import { ExportDataChartOptionsService } from "../shared/services/explore-data-chart-options.service";
import { MarketingExploreDataSubscriberApiService } from "./marketing-explore-data-subscriberapi.service";
import { MarketingSubscribChartComponent } from "./marketing-subscrib-chart.component"

describe('MarketingSubscribChartComponent', () => {
    let component: MarketingSubscribChartComponent;
    let fixture: ComponentFixture<MarketingSubscribChartComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let httpTestingController: HttpTestingController;
    let service: MarketingExploreDataSubscriberApiService;
    let marketDataAssignService: MarketingExploreDataAssignerService;
    let chartService: ExportDataChartOptionsService;
    let languageService: TranslateService
    let marketingApiService: MarketingApiService
    let dialogService: NgbModal



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingSubscribChartComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: 'marketing/explore-data', component: MarketingSubscribChartComponent },
            ]), HttpClientTestingModule, NgSelectModule,NgbModule
            ],
            providers: [TranslateService, Title, MarketingCommonService,
                MarketingApiService, MarketingExploreDataAssignerService,
                MarketingExploreDataSubscriberApiService, ExportDataChartOptionsService,NgbModal]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingSubscribChartComponent);
                service = TestBed.inject(MarketingExploreDataSubscriberApiService)
                marketDataAssignService = TestBed.inject(MarketingExploreDataAssignerService);
                chartService = TestBed.inject(ExportDataChartOptionsService);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                languageService = TestBed.inject(TranslateService)
                marketingApiService = TestBed.inject(MarketingApiService)
                httpTestingController = TestBed.inject(HttpTestingController);
                dialogService=TestBed.inject(NgbModal)
            });

    });


    it('should initialized onInit()', () => {
        spyOn(component, 'searchFilterApplyCheck').and.callThrough();
        languageService.selectedLanguage.subscribe(data => {
            component.language = data;
        })
        component.ngOnInit();
        expect(component.searchFilterApplyCheck).toHaveBeenCalled();
        expect(component.searchFilterApplyCheck).toHaveBeenCalledTimes(1);
    })

    it('should get user count', () => {
        spyOn(service, 'SegmentationUserSummary').and.returnValue(of(Usercount));
        component.segmentationUserSummaryApiLoader();
        expect(component.segmentSummary).toBeTruthy("Could not find the data");
        expect(component.segmentSummary).toBe(Usercount, "Value mismatched");
    });


    it('should get subscriberData Usage ', () => {
        let clickData={
            tier: '0-75',
            page: 1,
            size: 10
        }
        spyOn(service, "SubscriberDataUsage").and.returnValue(of(SubscriberDataUsage))
        component.fullScreenExpandFunction('Subscriber Data Usage', clickData)
        component.subscribersDataUasgeApiLoader('subscriber-data-usage-chart', false)
        expect(component.subscriberBandwidth).toBeTruthy("Could not find the data");
        expect(component.subscriberBandwidth).toBe(SubscriberDataUsage, "Value mismatched");
        expect(component.subscriberChartData).toBeTruthy("Could not find the chart options");
        expect(component.subscriberChartData.xAxis.title.text).toMatch(subscriberDataUsageChartOption.xAxis.title.text, "Value matched");
        expect(component.subscriberChartData.title.text).toMatch('');
        expect(component.subscriberChartData.yAxis.title.text).toMatch('Subscribers');
    });

    it('should get streaming subscribers', () => {
        spyOn(service, "StreamingSubscribers").and.returnValue(of(streamingSubscribers))
        component.streamingSubscribersApiLoader('streaming-subscribers-chart', false)
        expect(component.streamingData).toBeTruthy("Could not find the data");
        expect(component.streamingData).toBe(streamingSubscribers, "Value mismatched");
        expect(component.streamingChartData.title.text).toMatch('');
        expect(component.streamingChartData.yAxis.title.text).toMatch(streamingSubscriberChartOption.yAxis.title.text, 'text matched');
    });

    it('should get gaming subscribers', () => {
        spyOn(service, "GamingSubscribers").and.returnValue(of(serviceGamingSubscribers))
        component.gamingSubscribersApiLoader('gaming-subscribers-chart', false)
        expect(component.gamingData).toBeTruthy("Could not find the data");
        expect(component.gamingData).toBe(serviceGamingSubscribers, "Value mismatched");
        expect(component.gamingChartData.title.text).toMatch('');
        expect(component.gamingChartData.yAxis.title.text).toMatch(gamingSubscriberChartOption.yAxis.title.text, 'text matched');
        expect(component.gamingChartData.chart.type).toMatch(gamingSubscriberChartOption.chart.type, 'chart type matched');
    });

    it('should get WFH subscribers', () => {
        spyOn(service, "WfhSubscribers").and.returnValue(of(serviceWfhSubscribers))
        component.WFHSubscribersApiLoader('wfh-subscribers-chart', false)
        expect(component.wfhData).toBeTruthy("Could not find the data");
        expect(component.wfhData).toBe(serviceWfhSubscribers, "Value mismatched");
        expect(component.wfhChartData.title.text).toMatch('');
        expect(component.wfhChartData.yAxis.title.text).toMatch(wfhSubscribersChartOption.yAxis.title.text, 'text matched');
        expect(component.wfhChartData.chart.type).toMatch(wfhSubscribersChartOption.chart.type, 'chart type matched');
    });

    it('should get Subscriber Activity Trends', () => {
        spyOn(service, "SubscriberActivityTrends").and.returnValue(of(subscriberActivityTrendsData))
        component.subscriberActivityTrendsApiLoader('subscriber-activity-trends-chart', false)
        expect(component.subscriberActivityData).toBeTruthy("Could not find the data");
        expect(component.subscriberActivityData).toBe(subscriberActivityTrendsData, "Value mismatched");
        expect(component.subscriberActivityChartData.title.text).toMatch('');
        expect(component.subscriberActivityChartData.yAxis.title.text).toMatch(subscriberActivityTrendsChartOption.yAxis.title.text, 'text matched');
        expect(component.subscriberActivityChartData.chart.type).toMatch(subscriberActivityTrendsChartOption.chart.type, 'chart type matched');
    });

    it('should get dataUsageTrends', () => {
        spyOn(service, "DataUsageTrends").and.returnValue(of(dataUsageTrendsMockData))
        component.dataUsageTrendsApiLoader('data-usage-trends-chart', false)
        expect(component.dataUsageTrends).toBeTruthy("Could not find the data");
        expect(component.dataUsageTrends).toBe(dataUsageTrendsMockData, "Value mismatched");
        expect(component.dataTrendsChartData.title.text).toMatch('');
        expect(component.dataTrendsChartData.yAxis.title.text).toMatch(dataUsageTrendsChartOption.yAxis.title.text, 'text matched');
        expect(component.dataTrendsChartData.chart.type).toMatch(dataUsageTrendsChartOption.chart.type, 'chart type matched');
    });

    it('should get device per house hold', () => {
        spyOn(service, "DevicePerHouseHold").and.returnValue(of(devicePerHousehold))
        component.devicePerHouseHoldApiLoader('device-per-household-chart', false)
        expect(component.devicehouseholddata).toBeTruthy("Could not find the data");
        expect(component.devicehouseholddata).toBe(devicePerHousehold, "Value mismatched");
        expect(component.deviceHoldChartData.title.text).toMatch('');
        expect(component.deviceHoldChartData.yAxis.title.text).toMatch(devicePerHouseholdChartOption.yAxis.title.text, 'text matched');
        expect(component.deviceHoldChartData.chart.type).toMatch(devicePerHouseholdChartOption.chart.type, 'chart type matched');
    });

    it('should get subscriber drill details', () => {
        spyOn(service, "SubscriberDataUsageDrillDown").and.returnValue(of(subscriberDataUsageDrilldown))
        component.clickData = {
            tier: '0-75',
            page: 1,
            size: 10
        }
        component.subscribersDataUsageDrillDownApiLoader(component.clickData)
        spyOn(component, 'fullScreenTableOptions').and.callThrough()
        component.fullScreenTableOptions('', component.subscriberDrillData)
        expect(component.subscriberDrillData).toBeTruthy("Could not find the data");
        expect(component.subscriberDrillData).toBe(subscriberDataUsageDrilldown, "Value mismatched");
    });

    it('should get streamingdrill details', () => {
        spyOn(service, "StreamingSubscribersDrillDown").and.returnValue(of(streamingSubscriberDrilldown))
        component.clickData = {
            tier: '<20M',
            page: 1,
            size: 10
        }
        component.streamingSubscribersDrillDownApiLoader(component.clickData)
        spyOn(component, 'fullScreenTableOptions').and.callThrough()
        component.fullScreenTableOptions('', component.streamingDrillData)
        expect(component.streamingDrillData).toBeTruthy("Could not find the data");
        expect(component.streamingDrillData).toBe(streamingSubscriberDrilldown, "Value mismatched");
    });

    it('should get gamingdrill details', () => {
        spyOn(service, "GamingSubscribersDrillDown").and.returnValue(of(gamingSubscriberDrilldown))
        component.clickData = {
            tier: '<20M',
            page: 1,
            size: 10
        }
        component.gamingSubscribersDrillDownApiLoader(component.clickData)
        spyOn(component, 'fullScreenTableOptions').and.callThrough()
        component.fullScreenTableOptions('', component.gamingDrillData)
        expect(component.gamingDrillData).toBeTruthy("Could not find the data");
        expect(component.gamingDrillData).toBe(gamingSubscriberDrilldown, "Value mismatched");
    });

    it('should get wfhdrill details', () => {
        spyOn(service, "WfhSubscribersDrillDown").and.returnValue(of(wfhSubscriberDrilldown))
        component.clickData = {
            tier: '<20M',
            page: 1,
            size: 10
        }
        component.wfhSubscribersDrillDownApiLoader(component.clickData)
        spyOn(component, 'fullScreenTableOptions').and.callThrough()
        component.fullScreenTableOptions('', component.wfhDrillData)
        expect(component.wfhDrillData).toBeTruthy("Could not find the data");
        expect(component.wfhDrillData).toBe(wfhSubscriberDrilldown, "Value mismatched");
    });

    it('should get baseApiLoader Details', () => {
        component.scopes.exploredataRead = true
        spyOn(component, 'baseApiLoader').and.callThrough()
        spyOn(component, 'subscribersDataUasgeApiLoader').and.callThrough()
        spyOn(component, 'streamingSubscribersApiLoader').and.callThrough()
        spyOn(component, 'gamingSubscribersApiLoader').and.callThrough()
        spyOn(component, 'WFHSubscribersApiLoader').and.callThrough()
        spyOn(component, 'dataUsageTrendsApiLoader').and.callThrough()
        spyOn(component, 'subscriberActivityTrendsApiLoader').and.callThrough()
        spyOn(component, 'devicePerHouseHoldApiLoader').and.callThrough()
        component.baseApiLoader()
        expect(component.baseApiLoader).toHaveBeenCalled();
        expect(component.subscribersDataUasgeApiLoader).toHaveBeenCalled();
        expect(component.streamingSubscribersApiLoader).toHaveBeenCalled();
        expect(component.gamingSubscribersApiLoader).toHaveBeenCalled();
        expect(component.WFHSubscribersApiLoader).toHaveBeenCalled();
        expect(component.dataUsageTrendsApiLoader).toHaveBeenCalled();
        expect(component.subscriberActivityTrendsApiLoader).toHaveBeenCalled();
        expect(component.devicePerHouseHoldApiLoader).toHaveBeenCalled();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should resetAllData', () => {
        spyOn(component, 'resetAllData').and.callThrough()
        component.resetAllData()
        expect(component.loadMoreButton).toBe(false)
        expect(component.subscriberDataUsageDataAvailable).toBe(false);
        expect(component.streamingSubscribersDataAvailable).toBe(false);
        expect(component.gamingSubscribersDataAvailable).toBe(false);
        expect(component.WFHSubscribersDataAvailable).toBe(false);
        expect(component.dataTrendsDataAvailable).toBe(false);
        expect(component.subscriberActivityDataAvailable).toBe(false);
        expect(component.dataHouseholdDataAvailable).toBe(false);

    });

    it('should call fullScreenClose Details', () => {
        spyOn(component, 'fullScreenCloseFunction').and.callThrough()
        spyOn(component, 'baseApiLoader').and.callThrough()
        spyOn(component, 'clearTableBody').and.callThrough()
        component.fullScreenCloseFunction()
        expect(component.fullScreen).toBe(false)
        expect(component.clickData).toBeUndefined();
        expect(component.baseApiLoader).toHaveBeenCalled();
        expect(component.clearTableBody).toHaveBeenCalled();
        expect(component.fullScreenCloseFunction).toHaveBeenCalled();

    })

    it('should render highCharts', () => {
        component.Highcharts.chart('subscriber-data-usage-chart', subscriberDataUsageChartOption)
        component.Highcharts.chart('streaming-subscribers-chart', streamingSubscriberChartOption)
        component.Highcharts.chart('gaming-subscribers-chart', gamingSubscriberChartOption)
        component.Highcharts.chart('wfh-subscribers-chart', wfhSubscribersChartOption)
        component.Highcharts.chart('subscriber-activity-trends-chart', subscriberActivityTrendsChartOption)
        component.Highcharts.chart('data-usage-trends-chart', dataUsageTrendsChartOption)
        component.Highcharts.chart('device-per-household-chart', devicePerHouseholdChartOption)
        fixture.detectChanges()
        const testsubdatausageId = fixture.nativeElement.querySelectorAll('#subdatausageId')
        const testStreamingTitle = fixture.nativeElement.querySelectorAll('#StreamingTitle')
        const testGamingTitle = fixture.nativeElement.querySelectorAll('#GamingTitle')
        const testWFHTitle = fixture.nativeElement.querySelectorAll('#WFHTitle')
        const testSubscribersActivityTrendsTitle = fixture.nativeElement.querySelectorAll('#SubscribersActivityTrendsTitle')
        const testDataUsageTrendsTitle = fixture.nativeElement.querySelectorAll('#DataUsageTrendsTitle')
        const testDevicePerHouseholdTitle = fixture.nativeElement.querySelectorAll('#DevicePerHouseholdTitle')
        expect(testsubdatausageId[0].textContent).toMatch('Subscriber Data Usage')
        expect(testStreamingTitle[0].textContent).toMatch('Streaming Subscribers')
        expect(testGamingTitle[0].textContent).toMatch('Gaming Subscribers')
        expect(testSubscribersActivityTrendsTitle[0].textContent).toMatch('Subscriber Activity Trends')
        expect(testDataUsageTrendsTitle[0].textContent).toMatch('Data Usage Trends')
        expect(testDevicePerHouseholdTitle[0].textContent).toMatch('Devices per Household')
    })

    it('should call api errorhandle', () => {
        spyOn(component, 'apiErrorHandling').and.callThrough()
        component.apiErrorHandling(errorStatus401)
        expect(component.subscribechartDownloadError).toBe(true)
        expect(component.apiErrorHandling).toHaveBeenCalled()
    })

    it('should call api drill error handle', () => {
        spyOn(component, 'apiDrillErrorHandling').and.callThrough()
        component.apiDrillErrorHandling(errorStatus401)
        expect(component.fullScreenDownload).toBe(false)
        expect(component.subscribechartDownloadError).toBe(true)
        expect(component.apiDrillErrorHandling).toHaveBeenCalled()
    })

    it('should convert details', () => {
        let clickData = {
            tier: '0-75',
            page: 1,
            size: 10
        }
        spyOn(component, 'conversion').and.callThrough()
        component.conversion(clickData)
        expect(component.conversion).toHaveBeenCalled()
    })

    it('should call loadMore Details', () => {
        spyOn(component, 'loadMore').and.callThrough()
        component.loadMore()
        expect(component.loadingBtn).toBe(false)
        expect(component.loadMore).toHaveBeenCalled()
    })
   
    it('should call subscriberDrillDownApi loader Details', () => {
        let clickData = {
            tier: '0-75',
            page: 1,
            size: 10
        }
        spyOn(component, 'subscriberDataUsageDrillDownExportApiLoader').and.callThrough()
        spyOn(component, 'errorReset').and.callThrough()
        component.subscriberDataUsageDrillDownExportApiLoader(clickData)
        expect(component.errorReset).toHaveBeenCalled()
        expect(component.subscriberDataUsageDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call streamingSubscribersDrillDownExportApiLoader  Details', () => {
        let clickData = {
            tier: '500M',
            page: 1,
            size: 10,
            tech:'streaming'
        }
        spyOn(component, 'streamingSubscribersDrillDownExportApiLoader').and.callThrough()
        spyOn(component, 'errorReset').and.callThrough()
        service.StreamingSubscribersDrillDownExport(clickData)
        component.streamingSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.errorReset).toHaveBeenCalled()
        expect(component.streamingSubscribersDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call gamingSubscribersDrillDownExportApiLoader  Details', () => {
        let clickData = {
            tier: '500M',
            page: 1,
            size: 10,
            tech:'streaming'
        }
        spyOn(component, 'gamingSubscribersDrillDownExportApiLoader').and.callThrough()
        spyOn(component, 'errorReset').and.callThrough()
        service.GamingSubscribersDrillDownExport(clickData)
        component.gamingSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.errorReset).toHaveBeenCalled()
        expect(component.gamingSubscribersDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call WFHSubscribersDrillDownExportApiLoader  Details', () => {
        let clickData = {
            tier: '500M',
            page: 1,
            size: 10,
            tech:'streaming'
        }
        spyOn(component, 'WFHSubscribersDrillDownExportApiLoader').and.callThrough()
        spyOn(component, 'errorReset').and.callThrough()
        service.WfhSubscribersDrillDownExport(clickData)
        component.WFHSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.errorReset).toHaveBeenCalled()
        expect(component.WFHSubscribersDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call devicePerHouseHoldDrillDownExportApiLoader  Details', () => {
        let clickData = {
            tier: '500M',
            page: 1,
            size: 10,
            tech:'streaming'
        }
        spyOn(component, 'devicePerHouseHoldDrillDownExportApiLoader').and.callThrough()
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of())
        spyOn(component, 'errorReset').and.callThrough()
        service.DeviceHouseholdDrillDownExport(clickData)
        component.devicePerHouseHoldDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
        expect(component.errorReset).toHaveBeenCalled()
        expect(component.devicePerHouseHoldDrillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call downloadFunction Details',()=>{
       spyOn(component,'downloadFunction').and.callThrough()
       spyOn(component,'getFullScreenChartOptions').and.callThrough()
       component.getFullScreenChartOptions("Subscriber Data Usage", true)
       component.downloadFunction("Subscriber Data Usage")
       expect(component.downloadFunction).toHaveBeenCalled()
       expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should getFullScreenChartOptions details',()=>{
      spyOn(component,'getFullScreenChartOptions').and.callThrough()
      component.getFullScreenChartOptions()
      expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should call get full screen search data',()=>{
      spyOn(component,'fullScreenSearch').and.callThrough()
      component.fullScreenSearch('Subscriber Data Usage')
      expect(component.chartAvailable).toBeFalsy()
      expect(component.fullScreenTableAvailable).toBeFalsy()
    })

    it('should call full screen expand method',()=>{
    spyOn(component,'fullScreenExpandFunction').and.callThrough()
    component.fullScreenExpandFunction('Subscriber Data Usage')
    expect(component.fullScreen).toBe(true)
    expect(component.fullScreenChart).toBe('Subscriber Data Usage')
    })

    it('should load more details',()=>{
    component.clickData={
        tier: '500M',
        page: 1,
        size: 10,
        tech:'streaming'
    }
    component.loadingBtn=false
     var chartname=localStorage.getItem('fullScreenChart')
     component.fullScreenChart=chartname
     spyOn(component,'loadMore').and.callThrough()
     spyOn(component,'getFullScreenTablesData').and.callThrough()
     component.getFullScreenTablesData(component.fullScreenChart,component.clickData)
     component.loadMore()
     expect(component.getFullScreenTablesData).toHaveBeenCalled()
     expect(component.loadMore).toHaveBeenCalled()
    })

    it('should call get fullscreen Table Data',()=>{
        let clickData={
            tier: '0-75 GB',
            page: 1,
            size: 10,
            tech:'streaming'
        }
      var chartname=localStorage.getItem('fullScreenChart')
      let fullScreenChart=chartname
      spyOn(component,'getFullScreenTablesData').and.callThrough()
      component.getFullScreenTablesData(fullScreenChart,clickData)
      expect(component.subscriberUsage).toBe(undefined)
    })

    it('should call get fullscreen screenchartoption Data',()=>{
      var chartname=localStorage.getItem('fullScreenChart')
      let fullScreenChart=chartname
      spyOn(component,'getFullScreenChartOptions').and.callThrough()
      component.apiLoaderforSubscribers().then(()=>{})
      component.getFullScreenChartOptions(fullScreenChart,false)
      expect(component.getFullScreenChartOptions).toHaveBeenCalled()
    })

    it('should call subscribersDataUasge download',()=>{
     spyOn(service, "SubscriberDataUsage").and.returnValue(of(SubscriberDataUsage))
     spyOn(component,'subscribersDataUasgeApiLoader').and.callThrough()
     component.subscribersDataUasgeApiLoader("Subscriber Data Usage",true)
     expect(component.subscriberBandwidth).toBeTruthy("Could not find the data");
     expect(component.fullScreenDownload).toBe(true)
     expect(component.subscribersDataUasgeApiLoader).toHaveBeenCalled()
    })

    it('should call streamingSubscribers download',()=>{
        spyOn(service, "StreamingSubscribers").and.returnValue(of(streamingSubscribers))
        spyOn(component,'streamingSubscribersApiLoader').and.callThrough()
        component.streamingSubscribersApiLoader('streaming-subscribers-chart', true)
        expect(component.streamingData).toBeTruthy("Could not find the data");
        expect(component.streamingData).toBe(streamingSubscribers, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.streamingSubscribersApiLoader).toHaveBeenCalled()
       })

       it('should call gamingsubscribers download', () => {
        spyOn(service, "GamingSubscribers").and.returnValue(of(serviceGamingSubscribers))
        spyOn(component,'gamingSubscribersApiLoader').and.callThrough()
        component.gamingSubscribersApiLoader('gaming-subscribers-chart', true)
        expect(component.gamingData).toBeTruthy("Could not find the data");
        expect(component.gamingData).toBe(serviceGamingSubscribers, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.gamingSubscribersApiLoader).toHaveBeenCalled()
    });

    it('should call WFH subscribers download', () => {
        spyOn(service, "WfhSubscribers").and.returnValue(of(serviceWfhSubscribers))
        spyOn(component,'WFHSubscribersApiLoader').and.callThrough()
        component.WFHSubscribersApiLoader('wfh-subscribers-chart', true)
        expect(component.wfhData).toBeTruthy("Could not find the data");
        expect(component.wfhData).toBe(serviceWfhSubscribers, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.WFHSubscribersApiLoader).toHaveBeenCalled()
    });

    it('should call Subscriber Activity download', () => {
        spyOn(service, "SubscriberActivityTrends").and.returnValue(of(subscriberActivityTrendsData))
        spyOn(component,'subscriberActivityTrendsApiLoader').and.callThrough()
        component.subscriberActivityTrendsApiLoader('subscriber-activity-trends-chart', true)
        expect(component.subscriberActivityData).toBeTruthy("Could not find the data");
        expect(component.subscriberActivityData).toBe(subscriberActivityTrendsData, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.subscriberActivityTrendsApiLoader).toHaveBeenCalled()
       
    });

    it('should call dataUsageTrends download', () => {
        spyOn(service, "DataUsageTrends").and.returnValue(of(dataUsageTrendsMockData))
        spyOn(component,'dataUsageTrendsApiLoader').and.callThrough()
        component.dataUsageTrendsApiLoader('data-usage-trends-chart', true)
        expect(component.dataUsageTrends).toBeTruthy("Could not find the data");
        expect(component.dataUsageTrends).toBe(dataUsageTrendsMockData, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.dataUsageTrendsApiLoader).toHaveBeenCalled()
        
    });

    it('should call device per house hold download', () => {
        spyOn(service, "DevicePerHouseHold").and.returnValue(of(devicePerHousehold))
        spyOn(component,'devicePerHouseHoldApiLoader').and.callThrough()
        component.devicePerHouseHoldApiLoader('device-per-household-chart', true)
        expect(component.devicehouseholddata).toBeTruthy("Could not find the data");
        expect(component.devicehouseholddata).toBe(devicePerHousehold, "Value mismatched");
        expect(component.fullScreenDownload).toBe(true)
        expect(component.devicePerHouseHoldApiLoader).toHaveBeenCalled()
        
    });

    it('should get drillDownExportApiLoader details',()=>{
        let clickData={
            tier: '0-75 GB',
            page: 1,
            size: 10,
            tech:'streaming'
        }
    var chartname=localStorage.getItem('fullScreenChart')
      let fullScreenChart=chartname
     spyOn(component,'drillDownExportApiLoader').and.callThrough()
     component.drillDownExportApiLoader(fullScreenChart,clickData)
     expect(component.drillDownExportApiLoader).toHaveBeenCalled()
    })

    it('should call subscribChartModalOpen details',()=>{
     spyOn(component,'subscribChartModalOpen').and.callThrough()
     component.subscribChartModalOpen('Subscriber Data Usage')
     expect(component.popup_heading).toBe('Subscriber Data Usage')
     expect(component.subscribChartModalOpen).toHaveBeenCalled()
    })

    it('should call subscrib ModalOpen details',()=>{
        spyOn(component,'subscribChartModalOpen').and.callThrough()
        spyOn(dialogService,'open').and.callThrough()
        component.subscribChartModalOpen('Subscriber Data Usage')
        dialogService.open('subscribChartModal',{size:'lg'})
        expect(dialogService.open).toHaveBeenCalled()
        expect(component.popup_heading).toBe('Subscriber Data Usage')
        expect(component.subscribChartModalOpen).toHaveBeenCalled()
       });

       it('should searchFilterApplyCheck', () => {
        (component as any).marketingExploreDataBasicApiService.filerValuesSubject = of({});
        spyOn(component,'fullScreenSearch');
        component.fullScreen = false;
        // component.clickData = true;
        component.searchFilterApplyCheck();

        component.fullScreen = true;
        component.clickData = true;
        component.searchFilterApplyCheck();

        component.clickData = false;
        component.searchFilterApplyCheck();
    });

    it('should call activeSubcribersApiLoader', () => {
        let chartName = 'Retention';
        let clickData = {page:0};
        spyOn(component,'getFullScreenChartOptions');
        spyOn(component,'getFullScreenTablesData');
        component.fullScreenSearch(chartName,clickData)
    });

    it('should fullScreenSearch', fakeAsync(() => {
        let res = 'v1/cmc/insights/total-active-subscribers?org-id=10009&period=1';
        spyOn(service,'ActiveSubsriber').and.returnValue(of({res}))
        component.activeSubcribersApiLoader();
    }));

    it('should fullScreenSearch', fakeAsync(() => {
        let res = {};
        spyOn(service,'ActiveSubsriber').and.returnValue(of({res}))
        component.activeSubcribersApiLoader();
    }));

    it('should call segmentationUserSummaryApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SegmentationUserSummary').and.returnValue(throwError(error));
        component.segmentationUserSummaryApiLoader();
    });

    it('should call subscribersDataUasgeApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SubscriberDataUsage').and.returnValue(throwError(error));
        component.subscribersDataUasgeApiLoader(chartName, download);

        download = false;
        component.subscribersDataUasgeApiLoader(chartName, download);
    });

    it('should call highlight', () => {
        let event = {point:''};
        component.fullScreen = true;
        component.highlight(event);
    });

    it('should call streamingSubscribersApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'StreamingSubscribers').and.returnValue(throwError(error));
        component.streamingSubscribersApiLoader(chartName, download);

        download = false;
        component.streamingSubscribersApiLoader(chartName, download);
    });

    it('should call gamingSubscribersApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'GamingSubscribers').and.returnValue(throwError(error));
        component.gamingSubscribersApiLoader(chartName, download);

        download = false;
        component.gamingSubscribersApiLoader(chartName, download);
    });

    it('should call WFHSubscribersApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'WfhSubscribers').and.returnValue(throwError(error));
        component.WFHSubscribersApiLoader(chartName, download);

        download = false;
        component.WFHSubscribersApiLoader(chartName, download);
    });

    it('should call dataUsageTrendsApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'DataUsageTrends').and.returnValue(throwError(error));
        component.dataUsageTrendsApiLoader(chartName, download);

        download = false;
        component.dataUsageTrendsApiLoader(chartName, download);
    });

    it('should call subscriberActivityTrendsApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SubscriberActivityTrends').and.returnValue(throwError(error));
        component.subscriberActivityTrendsApiLoader(chartName, download);

        download = false;
        component.subscriberActivityTrendsApiLoader(chartName, download);
    });

    it('should call devicePerHouseHoldApiLoader', () => {
        let chartName = 'Subscriber';
        let download = true;
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'DevicePerHouseHold').and.returnValue(throwError(error));
        component.devicePerHouseHoldApiLoader(chartName, download);

        download = false;
        component.devicePerHouseHoldApiLoader(chartName, download);
    });

    // it('should getFullScreenChartOptions', async() => {
    //     spyOn(component,'apiLoaderforSubscribers').then(() =>Promise.resolve());
    //     let chartName = 'SUBS_DATA_USAGE_TITLE';
    //     let download = true;
    //     component.language= {SUBS_DATA_USAGE_TITLE:'SUBS_DATA_USAGE_TITLE'};
    //     await component.getFullScreenChartOptions(chartName,download);

    //     download = false;
    //     await component.getFullScreenChartOptions(chartName);
    // });

    it('should getFullScreenChartOptions', () => {
        let chartName = 'SUBS_DATA_USAGE_TITLE';
        let clickData={
            tier: '0-75 GB',
            page: 1,
            size: 10
        }        
        component.language = {SUBS_DATA_USAGE_TITLE: 'SUBS_DATA_USAGE_TITLE'}
        component.getFullScreenTablesData(chartName,clickData);

        clickData={
            tier: '0-75 TB',
            page: 1,
            size: 10
        }        
        component.getFullScreenTablesData(chartName,clickData);

        chartName = 'Streaming_Title';
        component.language = {Streaming_Title: 'Streaming_Title'};
        spyOn(component,'streamingSubscribersDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData);

        chartName = 'Gaming_Title';
        component.language = {Gaming_Title: 'Gaming_Title'};
        spyOn(component,'gamingSubscribersDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData);

        chartName = 'WFH_Title';
        component.language = {WFH_Title: 'WFH_Title'};
        spyOn(component,'wfhSubscribersDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData);

        chartName = 'DevicePerHousehold_Title';
        component.language = {DevicePerHousehold_Title: 'DevicePerHousehold_Title'};
        spyOn(component,'devicePerHouseHoldDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData);
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
        component.language = {SUBS_DATA_USAGE_TITLE: 'SUBS_DATA_USAGE_TITLE'};
        // spyOn(component,'churnRateInsightsDrillDownApiLoader');
        component.getExportMenus

        component.fullScreenChart = 'Streaming_Title'; 
        component.language = {Streaming_Title: 'Streaming_Title'};
        component.getExportMenus
        
        component.fullScreenChart = 'Gaming_Title'; 
        component.language = {Gaming_Title: 'Gaming_Title'};
        component.getExportMenus

        component.fullScreenChart = 'WFH_Title'; 
        component.language = {WFH_Title: 'WFH_Title'};
        component.getExportMenus

        component.fullScreenChart = 'DevicePerHousehold_Title'; 
        component.language = {DevicePerHousehold_Title: 'DevicePerHousehold_Title'};
        component.getExportMenus
    });

    it('should call subscribersDataUsageDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'SubscriberDataUsageDrillDown').and.returnValue(throwError(error));
        component.subscribersDataUsageDrillDownApiLoader(component.clickData);
    });

    it('should call streamingSubscribersDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'StreamingSubscribersDrillDown').and.returnValue(throwError(error));
        component.streamingSubscribersDrillDownApiLoader(component.clickData);
    });

    it('should call gamingSubscribersDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'GamingSubscribersDrillDown').and.returnValue(throwError(error));
        component.gamingSubscribersDrillDownApiLoader(component.clickData);
    });

    it('should call wfhSubscribersDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'WfhSubscribersDrillDown').and.returnValue(throwError(error));
        component.wfhSubscribersDrillDownApiLoader(component.clickData);
    });

    it('should call devicePerHouseHoldDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'DevicePerHouseHoldDrillDown').and.returnValue(of(devicePerHousehold));
        component.devicePerHouseHoldDrillDownApiLoader(component.clickData);
    });

    it('should call devicePerHouseHoldDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'DevicePerHouseHoldDrillDown').and.returnValue(throwError(error));
        component.devicePerHouseHoldDrillDownApiLoader(component.clickData);
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
        let chartName = 'SUBS_DATA_USAGE_TITLE';
        let clickData = {page:1};
        component.language= {SUBS_DATA_USAGE_TITLE:'SUBS_DATA_USAGE_TITLE'};
        spyOn(component,'subscriberDataUsageDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        chartName = 'Streaming_Title';
        component.language= {Streaming_Title:'Streaming_Title'};
        spyOn(component,'streamingSubscribersDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        chartName = 'Gaming_Title';
        component.language= {Gaming_Title:'Gaming_Title'};
        spyOn(component,'gamingSubscribersDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        chartName = 'WFH_Title';
        component.language= {WFH_Title:'WFH_Title'};
        spyOn(component,'WFHSubscribersDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        chartName = 'DevicePerHousehold_Title';
        component.language= {DevicePerHousehold_Title:'DevicePerHousehold_Title'};
        spyOn(component,'devicePerHouseHoldDrillDownExportApiLoader');
        component.drillDownExportApiLoader(chartName,clickData);
    });

    it('should call subscriberDataUsageDrillDownExportApiLoader',()=>{
        let clickData={
            tier: '0-75 GB',
            page: 1,
            size: 10,
            tech:'streaming'
        }
        component.language = [];
        component.subscriberDataUsageDrillDownExportApiLoader(clickData);

        clickData={
            tier: '0-75 TB',
            page: 1,
            size: 10,
            tech:'streaming'
        };
        spyOn(service, 'SubscriberDataUsageDrillDownExport').and.returnValue(of(subscriberDataUsageDrilldown));
        component.subscriberDataUsageDrillDownExportApiLoader(clickData);
    });

    it('should call subscriberDataUsageDrillDownExportApiLoader',()=>{
        let clickData={
            tier: '0-75 TB',
            page: 1,
            size: 10,
            tech:'streaming'
        };
        let error = {messgae:'Error'}
        spyOn(service, 'SubscriberDataUsageDrillDownExport').and.returnValue(throwError(error));
        component.subscriberDataUsageDrillDownExportApiLoader(clickData);
    });

    it('should call streamingSubscribersDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        component.language = [];
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.streamingSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    // it('should call streamingSubscribersDrillDownExportApiLoader', () => {
    //     let error = {status:'',message:'error'};
    //     component.clickData = {
    //         tier: '300M',
    //         page: 1};
    //     spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error));
    //     component.streamingSubscribersDrillDownExportApiLoader(component.clickData);
    // });

    it('should call gamingSubscribersDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        component.language = [];
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.gamingSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should gamingSubscribersDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.gamingSubscribersDrillDownExportApiLoader(clickData);
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should call WFHSubscribersDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        component.language = [];
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.WFHSubscribersDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should WFHSubscribersDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.WFHSubscribersDrillDownExportApiLoader(clickData);
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should call devicePerHouseHoldDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        component.language = [];
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(of(blob))
        component.devicePerHouseHoldDrillDownExportApiLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should devicePerHouseHoldDrillDownExportApiLoader', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiService, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.devicePerHouseHoldDrillDownExportApiLoader(clickData);
        expect(component.fullScreenDownload).toBe(false)
    });

    it('should downloadFunction details', () => {
        component.language = [];
        spyOn(component,'drillDownExportApiLoader');
        spyOn(component, 'downloadFunction').and.callThrough()
        component.downloadFunction('New Subscribers by Service Tier & Technology', 'Export Subscriber List (<20M / Cable)')
        expect(component.downloadFunction).toHaveBeenCalled()
    });

    it('should call subscribChartModalOpen', () => {
        let modeldata = 'SUBS_DATA_USAGE_TITLE';
        component.language= {SUBS_DATA_USAGE_TITLE:'SUBS_DATA_USAGE_TITLE'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'Streaming_Title';
        component.language= {Streaming_Title:'Streaming_Title'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'Gaming_Title';
        component.language= {Gaming_Title:'Gaming_Title'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'WFH_Title';
        component.language= {WFH_Title:'WFH_Title'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'SubscribersActivityTrends_Title';
        component.language= {SubscribersActivityTrends_Title:'SubscribersActivityTrends_Title'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'DataUsageTrends_Title';
        component.language= {DataUsageTrends_Title:'DataUsageTrends_Title'};
        component.subscribChartModalOpen(modeldata);

        modeldata = 'DevicePerHousehold_Title';
        component.language= {DevicePerHousehold_Title:'DevicePerHousehold_Title'};
        component.subscribChartModalOpen(modeldata);
    });

    it('should call closeModal', () => {
        component.closeModal();
    });
})

