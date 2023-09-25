import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingTotalsubscriberComponent } from './marketing-totalsubscriber.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCampaignsChartServiceService } from '../marketing-campaigns-result/marketing-campaigns-chart-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, throwError } from 'rxjs';
import * as Highcharts from 'highcharts';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ComponentFactoryResolver } from '@angular/core';
import { revenueData } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/devices/device.data';

describe('MarketingTotalsubscriberComponent', () => {
  let component: MarketingTotalsubscriberComponent;
  let fixture: ComponentFixture<MarketingTotalsubscriberComponent>;
  let marketingCamApiSer: MarketingCampaignsApiService;
  let marketingCampaignChartSer : MarketingCampaignsChartServiceService;
  let exportExcelService: ExportExcelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingTotalsubscriberComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [MarketingCampaignsApiService,ExportExcelService,
      {
        provide: MarketingCommonService, useValue: {
          formatMonthForRevCampaignChart: jasmine.createSpy().and.returnValue(''),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
    ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingTotalsubscriberComponent);
        component = fixture.componentInstance;
        marketingCamApiSer = TestBed.inject(MarketingCampaignsApiService);
        marketingCampaignChartSer = TestBed.inject(MarketingCampaignsChartServiceService);
        exportExcelService = TestBed.inject(ExportExcelService)
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'chartApiCall');
    spyOn(component, 'chartSubcreibeApiCall');
    spyOn(component, 'setLanguageTimeFrame');
    component.selectVal = 'chart';

    //act
    fixture.detectChanges();
    //assert
    expect(component.chartApiCall).toHaveBeenCalledOnceWith(component.selectVal, 0);
    expect(component.chartSubcreibeApiCall).toHaveBeenCalledOnceWith(component.selectVal, 0);
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
    let res = {data:[{timestamp:'01:T'}]};
    component.revenueArray = res.data;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubscriberChartSeries').and.returnValue(of(res));
    spyOn(marketingCampaignChartSer,'revenueTrendsOption').and.returnValue(of(revenueData));
    component.chartApiCall('111', 0);
  });

  it('should call chartApi', () => {
    let res = {data:[{timestamp:'01:T'}]};
    component.revenueArray = res.data;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubscriberChartSeries').and.returnValue(of(res));
    spyOn(marketingCampaignChartSer,'revenueTrendsOption').and.returnValue(of(revenueData));
    component.chartApiCall('111', 1);
  });

  it('should call chartApi', () => {
    let res = null;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubscriberChartSeries').and.returnValue(of(res));
    component.chartApiCall('111', 1);
  });

  it('should call chartApi', () => {
    let error = {error:{message:'Error'}};
    component.language = [];
    spyOn(marketingCamApiSer, 'SubscriberChartSeries').and.returnValue(throwError(error));
    component.chartApiCall('111', 0);
  });

  it('should call chartSubcreibeApiCall', () => {
    let res = {data:[{timestamp:'01:T'}]};
    component.subscriberArray = res.data;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubRevChartSeries').and.returnValue(of(res));
    spyOn(marketingCampaignChartSer,'revenueTrendsOption').and.returnValue(of(revenueData));
    component.chartSubcreibeApiCall('111', 0);
  });

  it('should call chartSubcreibeApiCall', () => {
    let res = {data:[{timestamp:'01:T'}]};
    component.subscriberArray = res.data;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubRevChartSeries').and.returnValue(of(res));
    spyOn(marketingCampaignChartSer,'revenueTrendsOption').and.returnValue(of(revenueData));
    component.chartSubcreibeApiCall('111', 1);
  });

  it('should call chartSubcreibeApiCall', () => {
    let res = null;
    component.language = [];
    spyOn(marketingCamApiSer, 'SubRevChartSeries').and.returnValue(of(res));
    component.chartSubcreibeApiCall('111', 1);
  });

  it('should call chartSubcreibeApiCall', () => {
    let error = {error:{message:'Error'}};
    component.language = [];
    spyOn(marketingCamApiSer, 'SubRevChartSeries').and.returnValue(throwError(error));
    component.chartSubcreibeApiCall('111', 0);
  });

  it('should call download', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    component.language = [];
    spyOn(component,'usageByAppDataForming');
    spyOn(exportExcelService,'downLoadCSVRevenue');
    component.download();
  });

  it('should call downloadSubcriber', () => {
    component.subscriberArray = [{totalRevenue:'4:T'}];
    component.language = [];
    spyOn(component,'usageByAppDataFormingSub');
    spyOn(exportExcelService,'downLoadCSVRevenue');
    component.downloadSubcriber();
  });

  it('should call usageByAppDataForming', () => {
    let array = [{timestamp:'793872372',totalRevenue:4}];
    let page = 0;
    component.language = [];
    component.usageByAppDataForming(array,page)
  });

  it('should call usageByAppDataFormingSub', () => {
    let array = [{timestamp:'793872372',totalRevenue:4}];
    let page = 0;
    component.language = [];
    component.usageByAppDataFormingSub(array,page)
  });

  it('should call expandFull', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    spyOn(component,'chartApiCall');
    component.expandFull();

    component.revenueArray = [];
    component.expandFull();
  });

  it('should call expandFullSubcriber', () => {
    component.subscriberArray = [{totalRevenue:'4:T'}];
    spyOn(component,'chartSubcreibeApiCall');
    component.expandFullSubcriber();

    component.subscriberArray = [];
    component.expandFull();
  });

  it('should call expandFull1', () => {
    component.revenueArray = [{totalRevenue:'4:T'}];
    spyOn(component,'chartApiCall');
    component.expandFull1();
  });

  it('should call expandFull1', () => {
    component.subscriberArray = [{totalRevenue:'4:T'}];
    spyOn(component,'chartSubcreibeApiCall');
    component.expandFull1();
  });
  

  // it('should call chartApi', () => {
  //   let res = null;
  //   spyOn(marketingCamApiSer, 'SubscriberChartSeries').and.returnValue(of(res));
  //   component.chartApiCall('111', 'chart');
  // });

  // it('should call chartSubcreibeApi', () => {
  //   //arrange
  //   component.language = {Subscribers: '' };

  //   //act
  //   component.chartSubcreibeApiCall('101', 'chartSubcreibeApi');
  //   //assert
  //   expect(component.revenueDataSubscriber).toBeTruthy();
  //   expect((component as any).marketingCampaignsChartServiceService.revenueTrendsOption).toHaveBeenCalled();  

  // });
});
