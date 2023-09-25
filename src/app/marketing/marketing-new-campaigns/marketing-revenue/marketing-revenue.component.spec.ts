import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingExploreDataAssignerService } from '../../marketing-explore-data/basic/shared/services/data-assigners.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignsChartServiceService } from '../marketing-campaigns-result/marketing-campaigns-chart-service.service';

import { MarketingRevenueComponent } from './marketing-revenue.component';
import { revenueData } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/devices/device.data';

describe('MarketingRevenueComponent', () => {
  let component: MarketingRevenueComponent;
  let fixture: ComponentFixture<MarketingRevenueComponent>;
  let marketingCamApiSer: MarketingCampaignsApiService;
  let series = [ { name: 'Total_Revenue', data: [], zoneAxis: 'x', zones: [] }, { name: 'MaxPotentialRevenue', data: [], zoneAxis: 'x', zones: [] }]
  let categories = ['T:0']; 
  let marketingCampaignChartSerSer :MarketingCampaignsChartServiceService;
  let exportExcelService: ExportExcelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      declarations: [MarketingRevenueComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [MarketingCampaignsApiService,MarketingCampaignsChartServiceService,
        
      {
        provide: MarketingCommonService, useValue: {
          formatMonthForRevCampaignChart: jasmine.createSpy().and.returnValue(''),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
       { provide: MarketingExploreDataAssignerService, useValue: {} }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingRevenueComponent);
        component = fixture.componentInstance;
        marketingCamApiSer = TestBed.inject(MarketingCampaignsApiService);
        marketingCampaignChartSerSer = TestBed.inject(MarketingCampaignsChartServiceService);
        exportExcelService = TestBed.inject(ExportExcelService);

      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load data', () => {
    //arrange
    spyOn(component, 'chartApiCall');
    spyOn(component, 'chartSeries');
    spyOn(component, 'setLanguageTimeFrame');
    component.selectVal = 'chart';
    component.campaign_id = '111';

    //act
    fixture.detectChanges();
    //assert
    expect(component.chartApiCall).toHaveBeenCalledOnceWith(component.selectVal, component.campaign_id);
    expect(component.chartSeries).toHaveBeenCalledOnceWith(component.selectVal);
    expect(component.setLanguageTimeFrame).toHaveBeenCalled();
  });

  it('should call setLanguageTimeFrame', () => {
    component.language = {revenue_month:{Past_1_month:'Past_1_month'}};
    component.timeframes = [{ value: '1', name: component.language.revenue_month.Past_1_month }];
    component.activePeriod = component.language.revenue_month.Past_3_months
    component.setLanguageTimeFrame();
  });

  it('should call selectTimeFrame', () => {
    let data = 'Past_1_month';
    component.language = {revenue_month:{Past_1_month:'Past_1_month'}};
    component.timeframes = [{ value: '1', name: component.language.revenue_month.Past_1_month }];
    component.selectTimeFrame(data);
  });

  it('should call chartApi', () => {
    let res = {data:{timestamp:'01:T'}}
    spyOn(marketingCamApiSer, 'CampaignsChartSeries_rev').and.returnValue(of(res));
    component.chartApiCall('111', 'chart');
  });

  it('should call chartApi', () => {
    let res = null;
    spyOn(marketingCamApiSer, 'CampaignsChartSeries_rev').and.returnValue(of(res));
    component.chartApiCall('111', 'chart');
  });

  it('should call chartApi', () => {
    let error = {message:'error'};
    spyOn(marketingCamApiSer, 'CampaignsChartSeries_rev').and.returnValue(throwError(error));
    component.chartApiCall('111', 'chart');
  });

  it('should call chartSeries', () => {
    let res = {data:{timestamp:'01:T'}}
    spyOn(marketingCamApiSer, 'CampaignsChartSeries').and.returnValue(of(res));
    component.chartSeries('111');
  });

  it('should call chartSeries', () => {
    let res = null;
    spyOn(marketingCamApiSer, 'CampaignsChartSeries').and.returnValue(of(res));
    component.chartSeries('111');
  });

  it('should call chartSeries', () => {
    let error = {message:'error'};
    spyOn(marketingCamApiSer, 'CampaignsChartSeries').and.returnValue(throwError(error));
    component.chartSeries('111');
  });

  it('should call ChartFinalData', () => {
    let revenueArray = [{totalRevenue:'4:T'}];
    component.language = [];
    component.ChartFinalData(revenueArray,1)
  });

  it('should call campaignChart', () => {
    let campaignArray = [{totalRevenue:'4:T'}];
    component.language = [];
    component.campaignChart(campaignArray,1)
  });

  it('should call passChartOption', fakeAsync(() => {
    spyOn(marketingCampaignChartSerSer,'revenueTrendsOption').and.returnValue(of(revenueData));
    component.passChartOption(series,categories,'Revenue',1,1,0);
    setTimeout(() => {

    },500);
    flush(500)
  }));

  it('should call passChartOptioncamp', fakeAsync(() => {
    spyOn(marketingCampaignChartSerSer,'revenue_campTrendsOption').and.returnValue(of(revenueData));
    component.passChartOptioncamp(series,categories,'Revenue',1,1,0);
    setTimeout(() => {

    },500);
    flush(500)
  }));

  it('should call expandFull', () => {
    component.campaignArray = [{totalRevenue:'4:T'}];
    spyOn(component,'campaignChart');
    component.expandFull();

    component.campaignArray = [];
    component.expandFull();
  });

  it('should call expandFull_rev', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    spyOn(component,'ChartFinalData');
    component.expandFull_rev();

    component.revenueArray = [];
    component.expandFull_rev();
  });

  it('should call expandFull1', () => {
    component.campaignArray = [{totalRevenue:'4:T'}];
    spyOn(component,'campaignChart');
    component.expandFull1();
  });

  it('should call expandFull1', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    spyOn(component,'ChartFinalData');
    component.expandFull1();
  });

  it('should call download', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    component.language = [];
    spyOn(component,'usageByAppDataForming');
    spyOn(exportExcelService,'downLoadCSVRevenue');
    component.download();
  });

  it('should call usageByAppDataForming', () => {
    let array = [{timestamp:'793872372',totalRevenue:4}];
    let page = 0;
    component.language = [];
    component.usageByAppDataForming(array,page)
  });

  it('should call download_camp', () => {
    component.campaignArray = [{totalRevenue:'4:T'}];
    component.language = [];
    spyOn(component,'usageByAppDataForming_1');
    spyOn(exportExcelService,'downLoadCSVRevenue');
    component.download_camp();
  });

  it('should call usageByAppDataForming_1', () => {
    let array = [{timestamp:'793872372',totalRevenue:4}];
    let page = 0;
    component.language = [];
    component.usageByAppDataForming_1(array,page)
  });
});