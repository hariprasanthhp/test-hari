import { ComponentFixture, TestBed } from '@angular/core/testing';
//import 'jasmine';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { MarketingInsightsComponent } from './marketing-insights.component';
import { MarketingRoutingsService } from 'src/app/marketing/shared/services/marketing-routings.service';
import { MarketingInsightsChartServiceService } from './marketing-insights-chart-service.service';
import { MarketingInsightspplicationApiService } from './marketing-insights-application-api.service';
import { MarketingExploreDataAssignerService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/data-assigners.service';
import { MarketingExploreDataDownloadDataService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-download.service';
import { DownloadFileNameService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { ExportDataChartOptionsService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import * as Highcharts from 'highcharts';


describe('MarketingInsightsComponent', () => {
    let component: MarketingInsightsComponent;
    let fixture: ComponentFixture<MarketingInsightsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingInsightsComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule],
            providers: [{
                provide: HttpClient, useValue: {
                    get: jasmine.createSpy().and.returnValue(of({})),
                }
            },
            {
                provide: MarketingRoutingsService, useValue: {
                    searchResultsPage: jasmine.createSpy()
                }
            },
            {
                provide: MarketingInsightsChartServiceService, useValue: {
                    WIFIOptions: jasmine.createSpy().and.returnValue(of('pie-wifi-chart')),
                    insightSubscriberUsageOptions: jasmine.createSpy().and.returnValue(of({})),
                    insightWiFiTrendsOptions: jasmine.createSpy().and.returnValue(of({})),
                    insightSubscriberCompetitorOptions: jasmine.createSpy().and.returnValue(of({})),

                }
            },
            {
                provide: MarketingInsightspplicationApiService, useValue: {
                    SingleUser: jasmine.createSpy().and.returnValue(of()),
                    subscribersSummaryGET: jasmine.createSpy().and.returnValue(of({ serviceAddress: 'sample', email: 'samplemail@gmail.com', phone: '1234567891', name: 'testraji', insights: '11', pastMonthCall: '111', churnRisk: '12', service: { video: 'samp.mp4', voice: 'sampvoice.mp3' } })),
                    UsageByApplication: jasmine.createSpy().and.returnValue(of([])),
                    TopApplications: jasmine.createSpy().and.returnValue(of([])),
                    WifiCategory: jasmine.createSpy().and.returnValue(of([{}])),
                    ServiceLimit: jasmine.createSpy().and.returnValue(of({ lens: '', subscriber: { serviceTier: '' } })),
                }
            },
            {
                provide: MarketingExploreDataAssignerService, useValue: {
                    usageByApplicationDataFormatter: jasmine.createSpy().and.returnValue([]),
                    topAppDataFormater: jasmine.createSpy().and.returnValue([]),
                    serviceLimitDataAssign: jasmine.createSpy().and.returnValue([]),
                    deviceWifiTrendDataAssign: jasmine.createSpy().and.returnValue([]),
                    competitorDataAssign: jasmine.createSpy().and.returnValue([]),
                    subscriberUsageDataAssign: jasmine.createSpy().and.returnValue([]),

                }
            },
            {
                provide: MarketingExploreDataDownloadDataService, useValue: {
                    usageByAppDataForming: jasmine.createSpy().and.returnValue([]),
                    topAppDataFormatter: jasmine.createSpy().and.returnValue([]),
                    WIFIDataForming: jasmine.createSpy().and.returnValue([]),
                }
            },
            {
                provide: DownloadFileNameService, useValue: {
                    generateDownloadName: jasmine.createSpy().and.returnValue(''),
                    generateDownloadNameSearchPage: jasmine.createSpy().and.returnValue(''),
                    generateDownloadWOPeriodName: jasmine.createSpy().and.returnValue(''),

                }
            },
            {
                provide: ExportExcelService, useValue: {
                    downLoadCSVRevenue: jasmine.createSpy().and.returnValue(''),
                }
            },
            {
                provide: ExportDataChartOptionsService, useValue: {
                    usageByAppInsightOptions: jasmine.createSpy().and.returnValue(of({})),

                }
            },
            {

                provide: SsoAuthService, useValue: {
                    getOrgId: jasmine.createSpy().and.returnValue(''),

                }
            },
            {

                provide: MarketingCommonService, useValue: {
                    getSubscriberID: jasmine.createSpy().and.returnValue(''),
                    setSubscriberID: jasmine.createSpy(),
                    setSearchValue: jasmine.createSpy(),
                    setCSCtrueOrFalse: jasmine.createSpy(),
                    getSearchValue: jasmine.createSpy().and.returnValue('camp1'),
                    getCSCtrueOrFalse: jasmine.createSpy().and.returnValue(true),
                    getCMCScopes: jasmine.createSpy().and.returnValue({ subscriberRead: true }),


                }
            },
            {
                provide: Title, useValue: {
                    setTitle: jasmine.createSpy(),

                }
            },
            { provide: TranslateService, useClass: CustomTranslateService },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(MarketingInsightsComponent);
        component = fixture.componentInstance;
        spyOn(Highcharts, 'chart').and.stub();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should  call on init', () => {
        //arrange
        spyOn(component, 'scopeAsssiner');
        spyOn(component, 'loadData');
        //act
        component.ngOnInit();
        //assert
        expect(component.scopeAsssiner).toHaveBeenCalled();
        expect(component.loadData).toHaveBeenCalled();
    });
    it('should load data', () => {
        //arrange
        component.subscriberId = '122';
        spyOn(component, 'getSubscriberEndOptionId');
        spyOn(component, 'getSubscriberSummary');
        //act
        fixture.detectChanges();
        //assert
        expect(component.getSubscriberEndOptionId).toHaveBeenCalledOnceWith('122');
        expect(component.getSubscriberSummary).toHaveBeenCalled();
    });
    it('should load baseApiLoader', () => {
        //arrange
        //component.subscriberId = '122';
        spyOn(component, 'topAppApiLoader');
        spyOn(component, 'usageByAppApiLoader');
        spyOn(component, 'WIFICategoryApiLoader');
        spyOn(component, 'commonAppApiLoader');

        //act
        component.baseApiLoader();
        //assert
        expect(component.topAppApiLoader).toHaveBeenCalled();
        expect(component.usageByAppApiLoader).toHaveBeenCalled();
        expect(component.WIFICategoryApiLoader).toHaveBeenCalled();
        expect(component.commonAppApiLoader).toHaveBeenCalled();

    });
    it('should  get Subscriber EndOptionId', () => {
        //arrange
        component.subscriberId = '122';
        //act
        component.getSubscriberEndOptionId(122);
        //assert
        expect((component as any).marketingInsightApplicationApiService.SingleUser).toHaveBeenCalledOnceWith(122);
    });

    it('should  get Subscriber Summary', () => {
        //arrange
        component.subscriberId = '122';
        //act
        component.getSubscriberSummary();
        //assert
        expect((component as any).marketingInsightApplicationApiService.subscribersSummaryGET).toHaveBeenCalledOnceWith('122');
        expect(component.loading).toBeFalsy();
        expect(component.showDataTable).toBeTruthy();
        expect(component.searchName).toEqual('testraji');
        expect(component.searchInsights).toEqual('11');
        expect(component.searchpastMonthCall).toEqual('111');
        expect(component.searchchurnRisk).toEqual('12');
        expect(component.searchVideo).toEqual('samp.mp4');
        expect(component.searchVoice).toEqual('sampvoice.mp3');


    });
});  
