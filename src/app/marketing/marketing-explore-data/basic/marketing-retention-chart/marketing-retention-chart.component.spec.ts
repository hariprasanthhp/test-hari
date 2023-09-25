import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, flush } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from 'rxjs';
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateService } from "src/app-services/translate.service";
import { MarketingApiService } from "src/app/marketing/shared/services/marketing-api.sevice";
import { ExportDataChartOptionsService } from "../shared/services/explore-data-chart-options.service";
import { MarketingExploreCommonService } from "../shared/services/explore-data-common.service";
import { MarketingExploreDataRetentionApiService } from "./marketing-explore-data-retention-api.service";
import { MarketingRetentionChartComponent } from "./marketing-retention-chart.component";
import { churnCount, churnRateInsights, churnRisk, churnUserReportOverall, retentiontableData, rowDetails, singleLineUserData } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/retention/retention.service";
import { churnRiskChartOptions, compititorVisitChartOptions, serviceLimitsChartOptions, serviceTierChartOptions, subscriberUsageChartOptions, wifiScoreChartOptions } from "src/assets/mockdata/cmc/marketing/exploredata/basiclens/retention/retentionchartoption.service";
import { MarketingExploreDataAssignerService } from "../shared/services/data-assigners.service";

describe('MarketingRetentionChartComponent', () => {
    let component: MarketingRetentionChartComponent;
    let fixture: ComponentFixture<MarketingRetentionChartComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let httpTestingController: HttpTestingController;
    let service: MarketingExploreDataRetentionApiService;
    let dataAssignService: MarketingExploreDataAssignerService;
    let languageService: TranslateService;
    let marketingApiservice: MarketingApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingRetentionChartComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: 'marketing/explore-data', component: MarketingRetentionChartComponent },
            ]), HttpClientTestingModule, NgSelectModule
            ],
            providers: [TranslateService, Title, MarketingExploreCommonService,
                 MarketingExploreDataRetentionApiService, MarketingApiService,MarketingExploreDataAssignerService, {
                    provide: ExportDataChartOptionsService, useValue: {
                        churnRateInsightsOptions: () => (of({})),
                        churnRateSubscriberUsageOptions: () => (of({})),
                        churnRateServiceLimitOptions: () => (of({})),
                        subscriberCompetitorOptions: () => (of({})),
                        acquisitionWiFiTrendsOptions: () => (of({})),
                        serviceTierOptions: () => (of({})),
                    }
                 },]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingRetentionChartComponent);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                httpTestingController = TestBed.inject(HttpTestingController);
                service = TestBed.inject(MarketingExploreDataRetentionApiService);
                dataAssignService = TestBed.inject(MarketingExploreDataAssignerService)
                languageService = TestBed.inject(TranslateService);
                marketingApiservice = TestBed.inject(MarketingApiService);
            });

    })

    it('should initialized onInit()', () => {
        spyOn(component, 'searchFilterApplyCheck').and.callThrough();
        spyOn(component, 'baseApiLoader').and.callThrough();
        languageService.selectedLanguage.subscribe(data => {
            component.language = data;
        })
        component.ngOnInit();
        expect(component.searchFilterApplyCheck).toHaveBeenCalled();
        expect(component.searchFilterApplyCheck).toHaveBeenCalledTimes(1);
        expect(component.baseApiLoader).toHaveBeenCalled();
        expect(component.baseApiLoader).toHaveBeenCalledTimes(1);
    })

    // it('should churnRateInsight Details', () => {
    //     spyOn(service, 'ChurnRateInsights').and.returnValue(of(churnRisk));
    //     spyOn(data, 'ChurnRateInsights').and.returnValue(of(churnRisk));
    //     component.churnRateInsightsApiLoader('churn-rate-insights-chart', false)
    //     expect(component.churnRateData).toBeTruthy('value is not matched')
    //     expect(component.churnRateData).toBe(churnRisk, 'value mismatched')
    // });
    it('should render churninsights chart', () => {
        component.Highcharts.chart('churn-rate-insights-chart', churnRiskChartOptions)
        fixture.detectChanges()
        const testInsights = fixture.nativeElement.querySelectorAll('#churnRate')
        const testChurnRisk = fixture.nativeElement.querySelectorAll('#churnRisk')
        const testRetention = fixture.nativeElement.querySelectorAll('#Retention')
        expect(testInsights[0].textContent).toMatch('Churn Rate & Insights')
        expect(testChurnRisk[0].textContent).toMatch('Churn Risk')
        expect(testRetention[0].textContent).toMatch('Retention')
    })

    it('should churnRiskData details', () => {
        spyOn(service, 'ChurnRisk').and.returnValue(of(churnRisk))
        component.churnRiskApiLoader()
        expect(component.churnRiskDataArray).toBeTruthy('value is not matched');
        expect(component.churnRiskDataArray).toBe(churnRisk, 'value mismatched');
    });

    it('should churnRate candidatecount details', () => {
        spyOn(service, 'ChurnRiskSummary').and.returnValue(of(churnCount))
        component.churnRiskSummaryApiLoader()
        expect(component.churnCountData).toBeTruthy('value is not matched');
        expect(component.churnCountData).toBe(churnCount, 'value mismatched');
    });

    it('should retentionInsights  details', () => {
        spyOn(service, 'Retention').and.returnValue(of(retentiontableData))
        component.retentionApiLoader()
        expect(component.retentionDataArray).toBeTruthy('value is not matched');
        expect(component.retentionDataArray).toBe(retentiontableData, 'value mismatched');
    });

    it('should resetAllData', () => {
        spyOn(component, 'resetAllData').and.callThrough()
        expect(component.loadMoreButton).toBeFalse()
        expect(component.churnRateInsightsDataAvailable).toBeFalse()
        expect(component.churnRiskDataAvailable).toBeFalse()
        expect(component.retentionDataAvailable).toBeFalse()
    });

    it('should churnUserReportOverall Details', () => {
        spyOn(service, 'ChurnRateInsightsDrillDown').and.returnValue(of(churnUserReportOverall))
        component.clickData = {
            tier: '300M',
            page: 1,
            size: 10,
            start: '2022-04-01',
            end: '2022-04-30'
        }
        component.churnRateInsightsDrillDownApiLoader(component.clickData)
        expect(component.fullScreenTableData).toBeTruthy('value is not matched')
        expect(component.fullScreenTableData).toBe(churnUserReportOverall, 'value mismatched')
    })

    // it('should singleLineUser Details', () => {
    //     spyOn(service, 'ChurnRateInsightsInlineCharts').and.returnValue(of(singleLineUserData))
    //     component.openInnerCharts(rowDetails)
    //     component.churnRateInsightsInlineChartsApiLoader(rowDetails)
    //     expect(component.singleLineUserChartData).toBeTruthy('value is not matched')
    //     expect(component.singleLineUserChartData).toBe(singleLineUserData, 'value mismatched')
    // })

    // it('should render highcharts',()=>{
    //   component.Highcharts.chart('churn-subscriber-usage',subscriberUsageChartOptions)
    //   component.Highcharts.chart('churn-service-limits',serviceLimitsChartOptions)
    //   component.Highcharts.chart('churn-competitor-visit-and-speed-test',compititorVisitChartOptions)
    //   component.Highcharts.chart('churn-devices-and-wifi-score-trend',wifiScoreChartOptions)
    //   component.Highcharts.chart('churn-service-tier-change',serviceTierChartOptions)
    //   fixture.detectChanges()
    // })
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
        let chartName = 'Churn Rate& Insights';
        let download = true;
        component.language= {churn_Rate:'Churn Rate& Insights'};
        component.getFullScreenChartOptions(chartName,download);

        download = false;
        component.getFullScreenChartOptions(chartName);
    });

    it('should getFullScreenChartOptions', () => {
        let chartName = 'Churn Risk';
        let download = true;
        component.language= {ChurnRisk_Title:'Churn Risk'};
        component.getFullScreenChartOptions(chartName,download);

        download = false;
        component.getFullScreenChartOptions(chartName);
    });

    it('should getFullScreenChartOptions', () => {
        let chartName = 'Retention';
        let download = true;
        component.language= {Retention_Title:'Retention'};
        component.getFullScreenChartOptions(chartName,download);

        download = false;
        component.getFullScreenChartOptions(chartName);
    });

    it('should churnRateInsightsApiLoader', () => {
        let chartName = 'Retention';
        let download = true;
        spyOn(service, 'ChurnRateInsights').and.returnValue(of(churnRateInsights));
        component.language = [];
        component.churnRateInsightsApiLoader(chartName,download);
    });

    it('should churnRateInsightsApiLoader', () => {
        let chartName = 'Retention';
        let download = true;
        let error = {status:'',message:'Error'}
        spyOn(service, 'ChurnRateInsights').and.returnValue(throwError(error));
        component.language = [];
        component.churnRateInsightsApiLoader(chartName,download);

        download = false;
        component.churnRateInsightsApiLoader(chartName,download);
    });

    it('should churnRiskApiLoader', () => {
        let chartName = 'Retention';
        let error = {status:'',message:'Error'}
        spyOn(service, 'ChurnRisk').and.returnValue(throwError(error));
        component.churnRiskApiLoader(chartName)
    });

    it('should churnRiskSummaryApiLoader', () => {
        let error = {status:'',message:'Error'}
        spyOn(service, 'ChurnRiskSummary').and.returnValue(throwError(error));
        component.churnRiskSummaryApiLoader()
    });

    it('should retentionApiLoader', () => {
        let error = {status:'',message:'Error'}
        spyOn(service, 'Retention').and.returnValue(throwError(error));
        component.retentionApiLoader()
    });

    it('should call getFullScreenTablesData', () => {
        let chartName = 'Churn Rate & Insights';
        let clickData = {page:0};
        component.language = {churn_Rate: 'Churn Rate & Insights'};
        spyOn(component,'churnRateInsightsDrillDownApiLoader');
        component.getFullScreenTablesData(chartName,clickData)
    });

    it('should call getExportMenus', () => {
        component.fullScreenChart = 'Churn Rate & Insights';
        component.clickData = {
            tier: '300M',
            page: 1,
            size: 10,
            start: '2022-04-01',
            end: '2022-04-30'
        }        
        component.language = {churn_Rate: 'Churn Rate & Insights'};
        spyOn(component,'churnRateInsightsDrillDownApiLoader');
        component.getExportMenus

        component.fullScreenChart = 'Churn Rate & Insights';
        component.language = {churn_Rate: 'Churn Rate'};
        component.getExportMenus
    });

    it('should call resetAllData', () => {
        component.resetAllData();
    });

    it('should call churnRateInsightsDrillDownApiLoader', () => {
        let error = {status:'',message:'Error'};
        component.clickData = {
            tier: '300M',
            page: 1};
        spyOn(service, 'ChurnRateInsightsDrillDown').and.returnValue(throwError(error));
        component.churnRateInsightsDrillDownApiLoader(component.clickData);
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

    it('should call openInnerCharts', () => {
        let data = {endPointId:'0011'};
        component.clickData = {
            tier: '300M',
            page: 1,
            size: 10,
            start: '2022-04-01',
            end: '2022-04-30'
        };
        spyOn(component,'adressReplacer')
        component.openInnerCharts(data);
    });

    it('should call inlineChartOptionsLoader', () => {
        spyOn((<any>component).exportDataChartOptionsService,'serviceTierOptions').and.returnValue(of({}));
        component.inlineChartOptionsLoader();
        expect((component as any).exportDataChartOptionsService.serviceTierOptions)
    });

    it('should call churnRateInsightsInlineChartsApiLoader', () => {
        let rowDetails = {endPointId:'1122'};
        spyOn(service, 'ChurnRateInsightsInlineCharts').and.returnValue(of(churnRateInsights));
        component.churnRateInsightsInlineChartsApiLoader(rowDetails);
    });

    it('should call churnRateInsightsInlineChartsApiLoader', () => {
        let rowDetails = {endPointId:'1122'};
        let error = {message:'error'}
        spyOn(service, 'ChurnRateInsightsInlineCharts').and.returnValue(throwError(error));
        component.churnRateInsightsInlineChartsApiLoader(rowDetails);
    });

    it('should call drillDownExportApiLoader', () => {
        let chartName = 'Churn Rate& Insights';
        let clickData = {page:1};
        component.language= {churn_Rate:'Churn Rate& Insights'};
        spyOn(component,'churnRateInsightsDrillDownApiExportLoader');
        component.drillDownExportApiLoader(chartName,clickData);

        component.language= {churn_Rate:'Churn Rate'};
        component.drillDownExportApiLoader(chartName,clickData);
    });

    it('should churnRateInsightsDrillDownApiExportLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.churnRateInsightsDrillDownApiExportLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should churnRateInsightsDrillDownApiExportLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.churnRateInsightsDrillDownApiExportLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should churnRateInsightsDrillDownHistoryApiExportLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.churnRateInsightsDrillDownHistoryApiExportLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should churnRateInsightsDrillDownHistoryApiExportLoader event', () => {
        let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
        let error = { message:'error' };
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.churnRateInsightsDrillDownHistoryApiExportLoader(clickData)
        expect(component.fullScreenDownload).toBe(true)
    });

    // it('should churnRateInsightsDrillDownHistoryAccountApiExportLoader event', () => {
    //     let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
    //     let res: any = { size: 405, type: 'application/csv' }
    //     let blob = new Blob([res], { type: res.type });
    //     let downloadDataObject = {downloadURL:'www.com'}
    //     spyOn(service,'ChurnRateInsightsDrillDownHistorySingleExport');
    //     spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob));
    //     component.churnRateInsightsDrillDownHistoryAccountApiExportLoader(clickData,{data:{}})
    //     expect(component.fullScreenDownload).toBe(true);
    //     expect(marketingApiservice.getDownloadFileContent).toHaveBeenCalledWith(downloadDataObject.downloadURL);
    // });

    // it('should churnRateInsightsDrillDownHistoryAccountApiExportLoader event', () => {
    //     let clickData = { page: 1, size: '10', tech: '', tier: '1G' }
    //     let error = { message:'error' };
    //     spyOn(service,'ChurnRateInsightsDrillDownHistorySingleExport');
    //     spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(throwError(error))
    //     component.churnRateInsightsDrillDownHistoryAccountApiExportLoader(clickData,{data:{}})
    //     expect(component.fullScreenDownload).toBe(true)
    // });

    it('should churnRiskExportApiLoader ', () => {
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.churnRiskExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should churnRiskExportApiLoader event', () => {
        let error = { message:'error' };
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.churnRiskExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should retentionExportApiLoader ', () => {
        let res: any = { size: 405, type: 'application/csv' }
        let blob = new Blob([res], { type: res.type });
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(of(blob))
        component.retentionExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

    it('should retentionExportApiLoader ', () => {
        let error = { message:'error' };
        spyOn(marketingApiservice, 'getDownloadFileContent').and.returnValue(throwError(error))
        component.retentionExportApiLoader()
        expect(component.fullScreenDownload).toBe(true)
    });

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

    it('should call retentionChartModalOpen', () => {
        let modeldata = 'Churn Rate& Insights';
        component.language= {churn_Rate:'Churn Rate& Insights'};
        component.retentionChartModalOpen(modeldata);

        modeldata = 'Churn Risk';
        component.language= {Churn_Risk:'Churn Risk'};
        component.retentionChartModalOpen(modeldata);

        modeldata = 'Retention';
        component.language= {Retention:'Retention'};
        component.retentionChartModalOpen(modeldata);
    });

    it('should call closeModal', () => {
        component.closeModal();
    });

})

