import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, throwError } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingHomeComponent } from './marketing-home.component';
import { MarketingHighchartServiceService } from './marketing-highchart-service.service';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { MarketingHomeApiService } from './marketing-home-Apiservice';
import { HomeDataAssignerService } from './home-data-assigner-service';
import { MarketingExploreDataDownloadDataService } from '../marketing-explore-data/basic/shared/services/explore-data-download.service';
import { DownloadFileNameService } from '../marketing-explore-data/basic/shared/services/download-file-name.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingApiService } from '../shared/services/marketing-api.sevice';
import { ExportDataChartOptionsService } from '../marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { MarketingExploreCommonService } from '../marketing-explore-data/basic/shared/services/explore-data-common.service';
import { MarketingSegmentsApiService } from '../marketing-segments/shared/marketing-segments-api.service';
import { MarketingExploreDataAssignerService } from '../marketing-explore-data/basic/shared/services/data-assigners.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import * as HomeInsights from '../shared/services/qlik-connection.js';

describe('MarketingHomeComponent', () => {
    let component: MarketingHomeComponent;
    let fixture: ComponentFixture<MarketingHomeComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MarketingHomeComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{
                provide: NgbModal, useValue: {
                    open: jasmine.createSpy(),
                    dismissAll: jasmine.createSpy(),
                }
            },
            {
                provide: MarketingHighchartServiceService, useValue: {
                    serviceTierTechnologyOptions: jasmine.createSpy().and.returnValue(of({})),
                    aquisationTrendsOption: jasmine.createSpy().and.returnValue(of({})),
                    churnTrendsOption: jasmine.createSpy().and.returnValue(of({ plotOptions: { series: { point: { events: {} } } } })),
                }
            },
            {
                provide: MarketingRoutingsService, useValue: {
                    newCampaignPageEdit: jasmine.createSpy(),
                    exploreDataPage: jasmine.createSpy(),
                    campaignsPage: jasmine.createSpy(),
                    campaignsMarkPage: jasmine.createSpy(),
                    newCampaignPage: jasmine.createSpy(),
                    segmentsPage: jasmine.createSpy(),
                }
            },
            { provide: TranslateService, useClass: CustomTranslateService },
            {
                provide: MarketingHomeApiService, useValue: {
                    CampaignsListGET: () => of({}),
                    connectcheck: jasmine.createSpy().and.returnValue(of({})),
                    SocialChannelAppList: () => of([{}]),
                    SubscriberTierTech: () => of(''),
                    AquisitionTrends: () => of({}),
                    SocialHeatMap: () => of({}),
                    ChurnTrends: () => of({}),
                    getTsAuthToken: () => of({}),

                }
            },
            {
                provide: HomeDataAssignerService, useValue: {
                    aquisitionTrendsFormatData: jasmine.createSpy().and.returnValue({}),
                    churnTrendsDataFormatter: jasmine.createSpy().and.returnValue({}),


                }
            },
            {
                provide: MarketingExploreDataDownloadDataService, useValue: {
                    subscriberTierTechExportDataForming: jasmine.createSpy().and.returnValue([]),
                    acquisitionRateInsightsDataFormatter: jasmine.createSpy().and.returnValue([]),
                    socialChannelMapExportDataFormatter: jasmine.createSpy().and.returnValue([]),
                    churnRateInsightsDataFormatter: jasmine.createSpy().and.returnValue([]),
                }
            },
            {
                provide: DownloadFileNameService, useValue: {
                    generateDownloadNameHome: jasmine.createSpy().and.returnValue(''),
                    generateDownloadName: () => 'name'
                }
            },
            {
                provide: ExportExcelService, useValue: {
                    downLoadCSVRevenue: jasmine.createSpy().and.returnValue(''),
                }
            },
            {
                provide: SsoAuthService, useValue: {
                    getEntitlements: jasmine.createSpy().and.returnValue(''),
                }
            },
            {
                provide: MarketingApiService, useValue: {
                    qlikOpenConnectionApp: of(''),
                    getQlikConnectedApp: jasmine.createSpy().and.returnValue({}),


                }
            },
            {
                provide: ExportDataChartOptionsService, useValue: {
                    timezoneCreator: jasmine.createSpy().and.returnValue(''),
                    SocialChannelHeatMapHomeOptions: jasmine.createSpy().and.returnValue(of({})),

                }
            },
            {
                provide: MarketingExploreCommonService, useValue: {
                    arraySlicer: jasmine.createSpy().and.returnValue([]),

                }
            },
            {
                provide: MarketingSegmentsApiService, useValue: {
                    SavedSegmentsListNotGET: () => of({}),
                    recommendedSegmentsListNotGET: () => of({}),
                }
            },
            {
                provide: MarketingExploreDataAssignerService, useValue: {
                    socialChannelDataFormatter: jasmine.createSpy().and.returnValue([]),
                    socialChannelsListDataFormatter: jasmine.createSpy().and.returnValue([{}]),
                }
            },
            {
                provide: MarketingCommonService, useValue: {
                    getCMCScopes: jasmine.createSpy().and.returnValue({ campaignRead: true, exploredataRead: true }),
                    errorHandling: jasmine.createSpy().and.returnValue(''),
                }
            },
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingHomeComponent);
                component = fixture.componentInstance;
            });
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });


    it('should page load data', () => {
        //arrange
        spyOn(component, 'campaignChannelList');
        spyOn(component, 'getQlikDataValue');
        spyOn(component, 'baseApiLoader');
        spyOn(component, 'connectionList');
        (component as any).translateService.selectedLanguage = of([]);
        //act
        fixture.detectChanges();
        //assert
        expect(component.campaignChannelList).toHaveBeenCalled();
        expect(component.getQlikDataValue).toHaveBeenCalled();
        expect(component.baseApiLoader).toHaveBeenCalled();
        expect(component.connectionList).toHaveBeenCalled();
        expect(component.language).toEqual([]);
    });

    it('should list campaignChannels', () => {
        //arrange
        spyOn((<any>component).marketingHomeApiService, 'CampaignsListGET').and.returnValue(of([]));
        //action
        component.language = {fileLanguage:'fileLanguage'};
        component.campaignChannelList();
        //assert
        expect(component.campaignError).toBeFalsy();
        expect(component.marketingCampaignTable).toEqual([]);
        expect(component.campaigndataAvailable).toBeTruthy();
        expect(component.campaignLoader).toBeFalsy();
        expect(component.campaignImageShow).toBeFalsy();
    });

    it('should list campaignChannels if else', () => {
        //arrange
        spyOn((<any>component).marketingHomeApiService, 'CampaignsListGET').and.returnValue(of(''));
        //action
        component.language = {fileLanguage: 'fileLanguage'};
        component.campaignChannelList();
        //assert
        expect(component.campaignError).toBeFalsy();
        expect(component.marketingCampaignTable).toEqual([]);
        expect(component.campaigndataAvailable).toBeFalsy();
        expect(component.campaignLoader).toBeFalsy();
        expect(component.campaignImageShow).toBeTruthy();
    });

    it('should list campaignChannels if error response', () => {
        //arrange
        spyOn((<any>component).marketingHomeApiService, 'CampaignsListGET').and.returnValue(throwError(''));
        //action
        component.language = [];
        component.campaignChannelList();
        //assert
        expect(component.campaignError).toBeTruthy();
        expect((component as any).marketingCommonService.errorHandling).toHaveBeenCalled();
        expect(component.marketingCampaignTable).toEqual([]);
        expect(component.campaigndataAvailable).toBeFalsy();
        expect(component.campaignLoader).toBeFalsy();
    });

    it('should get QlikDataValue', () => {
        //arrange
        spyOn(component, 'getInsightsKPISnippetTrigger');
        (<any>component).marketingApiService.qlikOpenConnectionApp = of({});
        //action
        component.getQlikDataValue();
        //assert
        expect(component.getInsightsKPISnippetTrigger).toHaveBeenCalled();

    });

    it('should get QlikDataValue,error response', () => {
        //arrange
        spyOn(component, 'getInsightsKPISnippetTrigger');
        (<any>component).marketingApiService.qlikOpenConnectionApp = throwError({});
        //action
        component.getQlikDataValue();
        //assert
        expect(component.getInsightsKPISnippetTrigger).toHaveBeenCalled();
        expect(component.loading).toBeFalsy();
        expect(component.qlickDataAvailable).toBeFalsy();
        expect(component.inSightError).toBeTruthy();

    });
    it('should get SegmentsTrigger_saved array seg', () => {
        //arrange
        spyOn(component, 'checkSegmentsSize');
        spyOn((component as any).marketingSegmentsApiService, 'SavedSegmentsListNotGET').and.returnValue(of([{ segmentType: 'saved' }]));
        //action
        component.getSegmentsTrigger();
        //assert
        expect((component as any).marketingExploreCommonService.arraySlicer).toHaveBeenCalledWith([{ segmentType: 'saved' }], 1, 5);
        // expect(component.checkSegmentsSize).toHaveBeenCalled();
    });

    it('should get SegmentsTrigger_saved array seg,error response', () => {
        //arrange
        spyOn((component as any).marketingSegmentsApiService, 'SavedSegmentsListNotGET').and.returnValue(throwError({}));
        //action
        component.getSegmentsTrigger();
        //assert
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
        expect(component.savedLoader).toBeFalsy();
        expect(component.savedError).toBeTruthy();
    });

    it('should get SegmentsTrigger_recommended array seg', () => {
        //arrange
        spyOn(component, 'checkSegmentsSize');
        spyOn((component as any).marketingSegmentsApiService, 'recommendedSegmentsListNotGET').and.returnValue(of([{ segmentType: 'recommended' }]));
        //action
        component.getSegmentsTrigger();
        //assert
        expect((component as any).marketingExploreCommonService.arraySlicer).toHaveBeenCalledWith([{ segmentType: 'recommended' }], 1, 5);
        // expect(component.checkSegmentsSize).toHaveBeenCalled();
    });

    it('should get SegmentsTrigger_recommended array seg,error response', () => {
        //arrange
        spyOn((component as any).marketingSegmentsApiService, 'recommendedSegmentsListNotGET').and.returnValue(throwError({}));
        //action
        component.getSegmentsTrigger();
        //assert
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
        expect(component.recomendedLoader).toBeFalsy();
        expect(component.recomendedError).toBeTruthy();
    });

    it('should get Insights KPI SnippetTrigger', fakeAsync(() => {
        //arrange
        spyOnProperty(HomeInsights, 'getHomeInsightsKPI').and.returnValue(() => Promise.resolve({ New_Subscribers_Per_Day: '10,20', All_Subscribers_Percentage: '', Gaming_Subscribers_Percentage: '', Streaming_Subscribers_Percentage: '', Work_From_Home_Subscribers_Percentage: '', Acquisition_Rate_Percentage: '', Churn_Rate_Percentage: '', ARPU_Percentage: '', New_Subscribers_Per_Day_Percentage: '' }));
        component.scopes.exploredataRead = true;
        //action
        component.getInsightsKPISnippetTrigger();
        tick();

        //assert
        expect((<any>component).marketingApiService.getQlikConnectedApp).toHaveBeenCalled();
        expect(component.qlickDataAvailable).toBeTruthy();
        expect(component.NewSubsPerDayData).toEqual('1020');

    }));

    it('should get Insights KPI SnippetTrigger - error response', fakeAsync(() => {
        //arrange
        spyOnProperty(HomeInsights, 'getHomeInsightsKPI').and.returnValue(() => Promise.reject());
        //action
        component.getInsightsKPISnippetTrigger();
        tick();

        //assert
        expect((<any>component).marketingApiService.getQlikConnectedApp).toHaveBeenCalled();
        expect(component.loading).toBeFalsy();
        expect(component.qlickDataAvailable).toBeFalsy();
        expect(component.inSightError).toBeTruthy();
    }));

    it('should call baseApiLoader', () => {
        //arrange
        spyOn(component, 'subscriberTierTechApiLoader');
        spyOn(component, 'socialChannelListApiLoader');
        spyOn(component, 'acquisitionTrendsApiLoader');
        spyOn(component, 'churnTrendsApiLoader');
        //action
        component.baseApiLoader();
        //assert
        expect(component.subscriberTierTechApiLoader).toHaveBeenCalled();
        expect(component.socialChannelListApiLoader).toHaveBeenCalled();
        expect(component.acquisitionTrendsApiLoader).toHaveBeenCalled();
        expect(component.churnTrendsApiLoader).toHaveBeenCalled();
    });

    it('should not call baseApiLoader', () => {
        //arrange
        component.scopes.exploredataRead = false;
        spyOn(component, 'subscriberTierTechApiLoader');
        spyOn(component, 'socialChannelListApiLoader');
        spyOn(component, 'acquisitionTrendsApiLoader');
        spyOn(component, 'churnTrendsApiLoader');
        //action
        component.baseApiLoader();
        //assert
        expect(component.subscriberTierTechApiLoader).not.toHaveBeenCalled();
        expect(component.socialChannelListApiLoader).not.toHaveBeenCalled();
        expect(component.acquisitionTrendsApiLoader).not.toHaveBeenCalled();
        expect(component.churnTrendsApiLoader).not.toHaveBeenCalled();

    });
    it('should get close', () => {
        //arrange
        //action
        component.close();
        //assert
        expect(component.faceError).toBeFalsy();
    });

    it('should check Positve Negative', () => {
        //arrange

        //action
        let result = component.checkPositvNegativ('-0');
        //assert
        expect(result).toEqual('+');

        //action
        result = component.checkPositvNegativ('-');
        //assert
        expect(result).toEqual('-');

        //action
        result = component.checkPositvNegativ('');
        //assert
        expect(result).toEqual('+');
    });

    it('should remove NegativeSign', () => {
        //arrange

        //action
        let result = component.removeNegativeSign('-');
        //assert
        expect(result).toEqual('');
    });

    it('should  get scopeAsssiner', () => {
        //arrange
        //action
        component.scopeAsssiner();
        //assert
        expect((component as any).marketingCommonService.getCMCScopes).toHaveBeenCalled();
    });


    it('should select Segments', () => {
        //arrange
        let data = { segmentId: '12we12', segmentType: 'streamer' }
        //action
        component.selectSegments(data);
        //assert
        expect((component as any).marketingRoutingsService.exploreDataPage).toHaveBeenCalledWith('12we12', 'streamer', false);
    });

    it('should get selectCampaign', () => {
        //arrange
        let data = { campaignId: '12we1' }
        //action
        component.language = {Active:'Active'};
        component.selectCampaign(data);
        //assert
        expect((component as any).marketingRoutingsService.newCampaignPageEdit).toHaveBeenCalledWith('12we1');
    });

    it('should get downloadFunction', () => {
        //arrange
        spyOn(component, 'getFullScreenChartOptions');
        component.language = [];
        //action
        component.downloadFunction('Serv_Tier_');
        //assert
        expect(component.getFullScreenChartOptions).toHaveBeenCalledWith('Serv_Tier_', true);
    });

    it('should get FullScreen ChartOptions case1', () => {
        //arrange
        spyOn(component, 'subscriberTierTechApiLoader');
        component.language = { Serv_Tier_Tech: 'Serv_Tier_Tech' };
        //action
        component.getFullScreenChartOptions('Serv_Tier_Tech', true);
        //assert
        expect(component.subscriberTierTechApiLoader).toHaveBeenCalledWith('Serv_Tier_Tech', true);

        //action
        component.getFullScreenChartOptions('Serv_Tier_Tech', false);
        //assert
        expect(component.subscriberTierTechApiLoader).toHaveBeenCalledWith('Serv_Tier_Tech');
    });

    it('should get FullScreen ChartOptions case2', () => {
        //arrange
        spyOn(component, 'socialHeatMapApiLoader');
        component.language = { SocialHeatMap: 'SocialHeatMap' };
        //action
        component.getFullScreenChartOptions('SocialHeatMap', true);
        //assert
        expect(component.socialHeatMapApiLoader).toHaveBeenCalledWith('SocialHeatMap', true);

        //action
        component.getFullScreenChartOptions('SocialHeatMap', false);
        //assert
        expect(component.socialHeatMapApiLoader).toHaveBeenCalledWith('SocialHeatMap');
    });

    it('should get FullScreen ChartOptions case3', () => {
        //arrange
        spyOn(component, 'acquisitionTrendsApiLoader');
        component.language = { New_Subscribers_home: 'New_Subscribers_home' };
        //action
        component.getFullScreenChartOptions('New_Subscribers_home', true);
        //assert
        expect(component.acquisitionTrendsApiLoader).toHaveBeenCalledWith('New_Subscribers_home', true);

        //action
        component.getFullScreenChartOptions('New_Subscribers_home', false);
        //assert
        expect(component.acquisitionTrendsApiLoader).toHaveBeenCalledWith('New_Subscribers_home');
    });

    it('should get FullScreen ChartOptions case 4', () => {
        //arrange
        spyOn(component, 'churnTrendsApiLoader');
        component.language = { Churn_Trends: 'Churn_Trends' };
        //action
        component.getFullScreenChartOptions('Churn_Trends', true);
        //assert
        expect(component.churnTrendsApiLoader).toHaveBeenCalledWith('Churn_Trends', true);

        //action
        component.getFullScreenChartOptions('Churn_Trends', false);
        //assert
        expect(component.churnTrendsApiLoader).toHaveBeenCalledWith('Churn_Trends');
    });

    it('should get segments TableSwitch', () => {
        //arrange
        let tab = 'recommended';
        //action
        component.segmentsTableSwitch(tab);
        //assert
        expect(component.recommended).toBeTruthy();

        //arrange
        tab = '';
        //action
        component.segmentsTableSwitch(tab);
        //assert
        expect(component.recommended).toBeFalsy();

        //arrange
        tab = 'saved';
        //action
        component.segmentsTableSwitch(tab);
        //assert
        expect(component.saved).toBeTruthy();

        //arrange
        tab = '';
        //action
        component.segmentsTableSwitch(tab);
        //assert
        expect(component.saved).toBeFalsy();
    });

    it('should get campaigns', () => {
        //arrange
        //action
        component.campaigns();
        //assert
        expect((component as any).marketingRoutingsService.campaignsPage).toHaveBeenCalled();
    });

    it('should get campaignsNewPage', () => {
        //arrange
        //action
        component.campaignsNewPage();
        //assert
        expect((component as any).marketingRoutingsService.campaignsMarkPage).toHaveBeenCalled();
    });

    it('should get newCampaign', () => {
        //arrange
        //action
        component.newCampaign(1);
        //assert
        expect((component as any).marketingRoutingsService.newCampaignPage).toHaveBeenCalled();
    }); 

    it('should get segments', () => {
        //arrange
        component.segments();
        //assert
        expect((component as any).marketingRoutingsService.segmentsPage).toHaveBeenCalled();
    });

    it('should select SocialChannel', () => {
        //arrange
        spyOn(component, 'socialHeatMapApiLoader');

        //action
        component.selectSocialChannel('fb');
        //assert
        expect(component.socialChannelSelected).toEqual('fb');
        expect(component.socialHeatMapDataAvailable).toBeFalsy();
        expect(component.socialHeatMapApiLoader).toHaveBeenCalled();
    });

    it('should get close Modal', () => {
        //arrange
        //action
        component.closeModal();
        //assert
        expect((component as any).dialogService.dismissAll).toHaveBeenCalled();
    });

    it('should get newSegments', () => {
        //arrange
        component.scopes.exploredataWrite = true;
        //action
        component.newSegments();
        //assert
        expect((component as any).marketingRoutingsService.exploreDataPage).toHaveBeenCalledWith('segment', '', false);
    });

    it('should get campaignAndSegments ModalOpen case1', () => {
        //arrange
        let model = 'SocialHeatMap'
        component.language = { SocialHeatMap: 'SocialHeatMap' };
        //action
        component.campaignAndSegmentsModalOpen(model);
        //assert 
        expect(component.popup_heading).toEqual('SocialHeatMap');
        expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).applicationTopAppChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    });

    it('should get campaignAndSegments ModalOpen case2', () => {
        //arrange
        let model = 'Serv_Tier_Tech'
        component.language = { Serv_Tier_Tech: 'Serv_Tier_Tech' };
        //action
        component.campaignAndSegmentsModalOpen(model);
        //assert 
        expect(component.popup_heading).toEqual('Serv_Tier_Tech');
        expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).serviceChartModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    });

    it('should get campaignAndSegments ModalOpen case3', () => {
        //arrange
        let model = 'New_Subscribers_home'
        component.language = { New_Subscribers_home: 'New_Subscribers_home' };
        //action
        component.campaignAndSegmentsModalOpen(model);
        //assert 
        expect(component.popup_heading).toEqual('New_Subscribers_home');
        expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).acquisationTrendsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    });

    it('should get campaignAndSegments ModalOpen case4', () => {
        //arrange
        let model = 'Churn_Trends'
        component.language = { Churn_Trends: 'Churn_Trends' };
        //action
        component.campaignAndSegmentsModalOpen(model);
        //assert 
        expect(component.popup_heading).toEqual('Churn_Trends');
        expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).churnTrendsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    });

    it('should get errorReset', () => {
        //arrange
        //action
        component.errorReset();
        //assert
        expect(component.inSightError).toBeFalsy();
        expect(component.campaignError).toBeFalsy();
        expect(component.inSightErrorMsg).toEqual('');
    });
    it('should get errorReset as Recomended', () => {
        //arrange
        //action
        component.errorResetRecomended();
        //assert
        expect(component.recomendedError).toBeFalsy();
        expect(component.recomendedErrorMsg).toEqual('');
    });
    it('should get errorReset as Saved', () => {
        //arrange
        //action
        component.errorResetSaved();
        //assert
        expect(component.savedError).toBeFalsy();
        expect(component.savedErrorMsg).toEqual('');
    });

    it('should check SegmentsSize', () => {
        //arrange
        component.savedSegmentArray = [];
        component.recommendedSegmentArray = [];
        //action
        component.checkSegmentsSize();
        //assert
        expect(component.segmentImageShow).toBeTruthy();
        expect(component.noDataRecomended).toBeFalsy('');
        expect(component.noDataSaved).toBeFalsy();
    });
    it('should check SegmentsSize if else', () => {
        //arrange
        component.savedSegmentArray = ['steramer'];
        component.recommendedSegmentArray = ['recom seg'];
        //action
        component.checkSegmentsSize();
        //assert
        expect(component.segmentImageShow).toBeFalsy();
    });

    it('should call subscriberTierTechApiLoader', fakeAsync(() => {
        //arrange
        // spyOn((component as any).marketingHomeApiService, 'SubscriberTierTech').and.returnValue(of({ categories: [] }));
        component.language = { home_subscriber1: '' };
        //action
        component.subscriberTierTechApiLoader('subscriber-tier-home-chart', true);
        //assert
        // expect((component as any).marketingExploreDataDownloadDataService.subscriberTierTechExportDataForming).toHaveBeenCalled();
        // expect((component as any).downloadFileNameService.generateDownloadNameHome).toHaveBeenCalled();
        // expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();

        component.subscriberTierTechApiLoader('subscriber-tier-home-chart', false);

        tick();
        //assert
        // expect((component as any).marketingHomeChartServiceService.serviceTierTechnologyOptions).toHaveBeenCalled();
        expect(component.subscriberTierTechDataAvailable).toBeFalsy();
        expect(component.chartAvailable).toBeFalsy();

    }));

    it('should call subscriberTierTechApiLoader,error response', fakeAsync(() => {
        //arrange
        spyOn((component as any).marketingHomeApiService, 'SubscriberTierTech').and.returnValue(throwError({}));
        //action
        component.subscriberTierTechApiLoader('subscriber-tier-home-chart');
        //assert
        expect((component as any).marketingHomeApiService.SubscriberTierTech).toHaveBeenCalled();
        expect(component.subscriberTierTechDataError).toBeTruthy();

    }));

    it('should call acquisitionTrendsApiLoader', fakeAsync(() => {
        //arrange
        spyOn((component as any).marketingHomeApiService, 'AquisitionTrends').and.returnValue(of([]));
        component.language = { New_Subscribers_home_d: '' };
        //action
        component.acquisitionTrendsApiLoader('home-acquisitions-chart', true);
        //assert
        expect((component as any).marketingExploreDataDownloadDataService.acquisitionRateInsightsDataFormatter).toHaveBeenCalled();
        expect((component as any).downloadFileNameService.generateDownloadNameHome).toHaveBeenCalled();
        expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();

        component.acquisitionTrendsApiLoader('home-acquisitions-chart', false);

        tick();
        //assert
        expect((component as any).marketingHomeChartServiceService.aquisationTrendsOption).toHaveBeenCalled();
        expect(component.acquisitionTrendsDataAvailable).toBeTruthy();
        expect(component.dataAvailable).toBeTruthy();

    }));

    it('should call acquisitionTrendsApiLoader,error response', fakeAsync(() => {
        //arrange
        spyOn((component as any).marketingHomeApiService, 'AquisitionTrends').and.returnValue(throwError({}));

        //action
        component.acquisitionTrendsApiLoader('home-acquisitions-chart');
        //assert
        expect((component as any).marketingHomeApiService.AquisitionTrends).toHaveBeenCalled();
        expect(component.homeacquisitionsError).toBeTruthy();
    }));

    it('should call socialHeatMapApiLoader', fakeAsync(() => {
        //arrange
        component.socialChannelSelected = 'instagram';
        component.language = { SocialHeatMap_d: '' };
        spyOn((component as any).marketingHomeApiService, 'SocialHeatMap').and.returnValue(of({}));

        //action
        component.socialHeatMapApiLoader('social-heat-map', true);
        tick();
        //assert
        expect((component as any).marketingHomeApiService.SocialHeatMap).toHaveBeenCalled();
        expect((component as any).marketingExploreDataAssignerService.socialChannelDataFormatter).toHaveBeenCalled();
        expect((component as any).marketingExploreDataDownloadDataService.socialChannelMapExportDataFormatter).toHaveBeenCalled();
        expect((component as any).exportDataChartOptionsService.timezoneCreator).toHaveBeenCalled();
        expect((component as any).downloadFileNameService.generateDownloadNameHome).toHaveBeenCalled();
        expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();

        component.socialHeatMapApiLoader('social-heat-map', false);

        tick();
        //assert
        expect((component as any).exportDataChartOptionsService.SocialChannelHeatMapHomeOptions).toHaveBeenCalled();
        expect(component.socialHeatMapDataAvailable).toBeTruthy();
        expect(component.dataAvailable).toBeTruthy();

        //arrange
        component.socialChannelSelected = '';
        //action
        component.socialHeatMapApiLoader('social-heat-map', true);

        tick();
        //assert
        expect(component.socialHeatMapDataError).toBeTruthy();

    }));

    it('should call socialChannelListApiLoader,error response', fakeAsync(() => {
        //arrange
        spyOn((component as any).marketingHomeApiService, 'SocialChannelAppList').and.returnValue(throwError({}));
        //action
        component.socialChannelListApiLoader();
        //assert
        expect((component as any).marketingHomeApiService.SocialChannelAppList).toHaveBeenCalled();
        expect(component.socialHeatMapDataError).toBeTruthy();

    }));

    it('should call socialHeatMapApiLoader,error response', fakeAsync(() => {
        //arrange
        component.socialChannelSelected = 'instagram';
        spyOn((component as any).marketingHomeApiService, 'SocialHeatMap').and.returnValue(throwError({}));
        //action
        component.socialHeatMapApiLoader('social-heat-map');
        //assert
        expect((component as any).marketingHomeApiService.SocialHeatMap).toHaveBeenCalled();
        expect(component.socialHeatMapDataError).toBeTruthy();

    }));

    it('should call churnTrendsApiLoader', fakeAsync(() => {
        //arrange
        component.language = { Churn_Trends_d: '' };
        //action
        component.churnTrendsApiLoader('churn-Home-Trends', true);
        tick();
        //assert
        expect((component as any).marketingExploreDataDownloadDataService.churnRateInsightsDataFormatter).toHaveBeenCalled();
        expect((component as any).downloadFileNameService.generateDownloadNameHome).toHaveBeenCalled();
        expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();

        component.churnTrendsApiLoader('churn-Home-Trends', false);

        tick();
        //assert
        expect((component as any).marketingHomeChartServiceService.churnTrendsOption).toHaveBeenCalled();
        expect(component.churnTrendsDataAvailable).toBeTruthy();

    }));

    it('should call churnTrendsApiLoader,error response', fakeAsync(() => {
        //arrange
        spyOn((component as any).marketingHomeApiService, 'ChurnTrends').and.returnValue(throwError({}));
        //action
        component.churnTrendsApiLoader('churn-Home-Trends');
        tick();
        //assert
        expect((component as any).marketingHomeApiService.ChurnTrends).toHaveBeenCalled();
        expect(component.churnTrendsDataError).toBeTruthy();
    }));
});



;
