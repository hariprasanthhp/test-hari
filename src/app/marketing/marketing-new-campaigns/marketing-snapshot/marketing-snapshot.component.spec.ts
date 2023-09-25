import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MarketingSnapshotComponent } from './marketing-snapshot.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCampaignsChartServiceService } from '../marketing-campaigns-result/marketing-campaigns-chart-service.service';
import { MarketingExploreDataAssignerService } from '../../marketing-explore-data/basic/shared/services/data-assigners.service';
import Highcharts from 'highcharts';


describe('MarketingSnapshotComponent', () => {
  let component: MarketingSnapshotComponent;
  let fixture: ComponentFixture<MarketingSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      declarations: [ MarketingSnapshotComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: MarketingCampaignsApiService, useValue: {
          CampaignsChartSeries_rev: jasmine.createSpy().and.returnValue(of({ data: [] })),
          CampaignsChartSeries: jasmine.createSpy().and.returnValue(of({ data: [] })),
          SubscriberChartSeries_rev: jasmine.createSpy().and.returnValue(of({ data: [] })),
        }
      },
      {
        provide: MarketingCommonService, useValue: {
          formatMonthForRevCampaignChart: jasmine.createSpy().and.returnValue(''),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
      {
        provide: ExportExcelService, useValue: {
          downLoadCSVRevenue: jasmine.createSpy(),

        }
      }, {
        provide: MarketingCampaignsChartServiceService, useValue: {
          revenueTrendsOption: jasmine.createSpy().and.returnValue(of({})),
          revenue_campTrendsOption: jasmine.createSpy().and.returnValue(of({})),
          revenuenewTrendsOption: jasmine.createSpy().and.returnValue(of({}))
        }
      }, { provide: MarketingExploreDataAssignerService, useValue: {} }]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MarketingSnapshotComponent);
      component = fixture.componentInstance
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(sessionStorage,'getItem').and.returnValue('12345');
    spyOn(component, 'chartApiCall');
    spyOn(component, 'setLanguageTimeFrame');
    spyOn(component, 'ChartFinalData');
    spyOn(component, 'campaignChart');
    //act
    (component as any).translateService.selectedLanguage = of([]);
    component.selectVal = 'chart';
    component.campaign_id = '111';
    fixture.detectChanges();
    //assert
    expect(component.chartApiCall).toHaveBeenCalledWith(component.selectVal, component.campaign_id);
    expect(component.setLanguageTimeFrame).toHaveBeenCalled();
    expect(component.language).toEqual([]);
  });

  it('should call setLanguageTimeFrame', () => {
    component.language = { revenue_month: 'revenue_month' };
    component.setLanguageTimeFrame();
    component.language = { revenue_month: 'revenue_month' };
    expect(component.timeframes.length).toEqual(4);
    expect(component.timeframes[0].value).toEqual('1');
    expect(component.timeframes[1].value).toEqual('3');
    expect(component.timeframes[2].value).toEqual('6');
    expect(component.timeframes[3].value).toEqual('12');
    expect(component.timeframes[0].name).toEqual(component.language.revenue_month.Past_1_month);
    expect(component.timeframes[1].name).toEqual(component.language.revenue_month.Past_3_month);
    expect(component.timeframes[2].name).toEqual(component.language.revenue_month.Past_6_month);
    expect(component.timeframes[3].name).toEqual(component.language.revenue_month.Past_12_month);
    expect(component.activePeriod).toEqual(component.language.revenue_month.Past_3_months);
  });

  it('should call selectTimeFrame', () => {
    spyOn(component, 'chartApiCall');
    component.selectVal = 'chart';
    component.campaign_id = '111';
    component.selectTimeFrame('name');
    expect(component.chartApiCall).toHaveBeenCalledWith(component.selectVal, component.campaign_id);
  });

  it('should call chartApi', () => {
    //arrange
    let id = '111';
    let camp = '3';
    let res = {data: [{potentialRevenue: null, timestamp: "2023-04-20T00:00:00.000+00:00", totalNonOptOutRevenue: null, totalRevenue: 180, totalSubscribers: 8 }]}
    spyOn(component, 'campaignChart');
    spyOn(component, 'ChartFinalData');
    //act
    component.language = [];
    component.chartApiCall(id,camp);
    //assert
    // expect(component.campaignArray).toEqual(res.data);
    expect(component.revenuecampEdgeSuitsError).toBeFalsy();
    // expect(component.revenueArray).toEqual(res.data);
    expect(component.revenueEdgeSuitsError).toBeFalsy();
    expect(component.campaignChart).toHaveBeenCalled();
    expect(component.ChartFinalData).toHaveBeenCalled();
  });

  it('should call ChartFinalData', () => {
    let data = [{potentialRevenue: null, timestamp: "2023-04-20T00:00:00.000+00:00", totalNonOptOutRevenue: null, totalRevenue: 180, totalSubscribers: 8 }]
    //arrange
    spyOn(component, 'getUpdatedDate')
    //set
    component.campaignChartArgs = [[data],0];
    component.language = [];
    component.ChartFinalData(data,0);
    //expect
    expect(component.ChartFinalDataArgs).toEqual([data,0]);
    expect(component.getUpdatedDate).toHaveBeenCalledWith(data);
  
  });

  it('should call campaignChart', () => {
    let data = [{potentialRevenue: null, timestamp: "2023-04-20T00:00:00.000+00:00", totalNonOptOutRevenue: null, totalRevenue: 180, totalSubscribers: 8 }]
    //set
    spyOn(component, 'getUpdatedDate');
    spyOn((component as any), 'passChartOptioncamp').and.returnValue(of('series', 'categories', 'Revenue', 'from', 'to', 'val'));
    //arrange
    component.language = [];
    component.campaignChart(data,0);
    component.campaignChartArgs = [data, 0];
  });

  it('should call passChartOption', () => {
    //arrange
    
    //assert
    component.passChartOption('series', 'categories', 'Revenue', 'from', 'to', 'val');
    
  });

  it('should call passChartOptioncamp', () => {
    //arrange
    
    //assert
    component.passChartOptioncamp('series', 'categories', 'Revenue', 'from', 'to', 'val');
    
  });

  it('should call expandFull', () => {
    spyOn(component, 'campaignChart');
    component.expandFull();
    expect(component.expand).toBeTruthy();
    expect(component.fullScreen).toBeTruthy();
    expect(component.deduplicatedDataAvailable_cam).toBeTruthy();
    expect(component.deduplicatedDataAvailable_rev).toBeFalsy();
    expect(component.revenuecampEdgeSuitsError).toBeTruthy();
    expect(component.campaignChart).toHaveBeenCalled();
  });

  it('should call expandFull_rev', () => {
    component.expandFull_rev();
    expect(component.expand).toBeTruthy();
    expect(component.fullScreen).toBeTruthy();
    expect(component.deduplicatedDataAvailable_cam).toBeFalsy();
    expect(component.deduplicatedDataAvailable_rev).toBeTruthy();
    expect(component.revenueEdgeSuitsError).toBeTruthy();
  });

  it('should call expandFull1', () => {
    spyOn(component, 'ChartFinalData');
    component.expandFull1();
    expect(component.expand).toBeFalsy();
    expect(component.fullScreen).toBeFalsy();
    expect(component.deduplicatedDataAvailable).toBeFalsy();
    expect(component.deduplicatedDataAvailable_rev).toBeFalsy();
    expect(component.deduplicatedDataAvailable_cam).toBeFalsy();
    expect(component.revenuecampEdgeSuitsError).toBeTruthy();
    expect(component.revenueEdgeSuitsError).toBeTruthy();
  });

  it('should call download', () => {
    //set
    spyOn((component as any), 'usageByAppDataForming').and.returnValue(of([]));
    //arrange
    component.language = { total_audience: 'total_audience' };
    component.download();
    //expect
    expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();
  });

  it('should call getUpdatedDate', () => {
    // component.dateArray = [];
    let data = [{potentialRevenue: null, timestamp: "2023-04-20T00:00:00.000+00:00", totalNonOptOutRevenue: null, totalRevenue: 180, totalSubscribers: 8 }];
    component.getUpdatedDate(data);
  });

  it('should call usageByAppDataForming', () => {
    //set
    spyOn((component as any), 'getArraySum').and.returnValue(of([]));
    //arrange
    component.usageByAppDataForming([],0);
  });

  it('should call download_camp', () => {
    //set
    spyOn((component as any), 'usageByAppDataForming_1').and.returnValue(of([]));
    //arrange
    component.language = { Average_revenue: 'Average_revenue' };
    component.download_camp();
    //expect
    expect((component as any).exportExcelService.downLoadCSVRevenue).toHaveBeenCalled();
  });

  it('should call usageByAppDataForming_1', () => {
    //set
    spyOn((component as any), 'getArraySum').and.returnValue(of([]));
    //arrange
    component.usageByAppDataForming_1([],0);
  });

  it('should call getArraySum', () => {
    component.getArraySum([]);
    //expect
  });
});
