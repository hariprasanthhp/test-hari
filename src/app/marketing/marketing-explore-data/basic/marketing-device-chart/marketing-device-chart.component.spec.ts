import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDeviceChartComponent } from './marketing-device-chart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingExploreDataDeviceApiService } from './marketing-explore-data-device-api.service';
import { ExportDataChartOptionsService } from '../shared/services/explore-data-chart-options.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { HomeChartOptionsService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { DownloadFileNameService } from '../shared/services/download-file-name.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { Title } from '@angular/platform-browser';
import { EnglishJSON } from 'src/assets/language/english.service';
import { FrenchJSON } from 'src/assets/language/french.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { of } from "rxjs";
import { commandIQStatus30recordOptions, commandIqTrendingData, getCommonSubscribersChartOptionsfor30records, languageData, revenueData, systemModelData } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/devices/device.data';
import { commandIqTrendingChartOption, revenueEdgeSuiteTrendingChartoptions, systemByModelChartOptions } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/devices/devicechartoption.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('MarketingDeviceChartComponent', () => {
  let component: MarketingDeviceChartComponent;
  let fixture: ComponentFixture<MarketingDeviceChartComponent>;
  let service: MarketingExploreDataDeviceApiService;
  let languageService: TranslateService;
  let router: Router;
  let chartOptions: HomeChartOptionsService;
  let systemService: FoundationManageService;
  let exportDataChartOptionsService : ExportDataChartOptionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingDeviceChartComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [NgbModal, MarketingExploreDataDeviceApiService, ExportDataChartOptionsService, MarketingCommonService, HomeChartOptionsService,
        SsoAuthService, FoundationManageService, CommonService, ExportExcelService, DownloadFileNameService, DateUtilsService, Title, EnglishJSON, FrenchJSON]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingDeviceChartComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MarketingExploreDataDeviceApiService);
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    chartOptions = TestBed.inject(HomeChartOptionsService)
    systemService = TestBed.inject(FoundationManageService)
    exportDataChartOptionsService = TestBed.inject(ExportDataChartOptionsService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'baseApiLoader').and.callThrough();
    languageService.selectedLanguage.next(languageData);
    component.ngOnInit();
    expect(component.baseApiLoader).toHaveBeenCalled()
    // expect(component.baseApiLoader).toHaveBeenCalledTimes(1)
  })

  it('should get commandTrendinIq Details', () => {
    spyOn(service, 'CommandIQStatus').and.returnValue(of(commandIqTrendingData))
    spyOn(component, 'chartDataModify').and.callThrough()
    spyOn(chartOptions, 'sortByTimestamp').and.returnValue(commandIqTrendingData)
    spyOn(exportDataChartOptionsService , 'commandIQStatus30recordOptions').and.returnValue(commandIQStatus30recordOptions);
    component.Highcharts.chart('command-status-IQ-chart', commandIqTrendingChartOption)
    component.chartDataModify(commandIqTrendingData)
    component.commandIQStatusApiLoader('command-status-IQ-chart', false)
    expect(component.commandIQSatusDataObject).toBeTruthy('value is not matched');
    expect(component.commandIQSatusDataObject).toBe(commandIqTrendingData, 'value is not matched');
    expect(component.ciqChartData.chart.type).toMatch(commandIqTrendingChartOption.chart.type, 'type matched')
    expect(component.ciqChartData.yAxis[0].title.text).toMatch('Subscribers')
  })
  it('should get commandTrendinIq Details', () => {
    spyOn(service, 'CommandIQStatus').and.returnValue(of(commandIqTrendingData))
    spyOn(component, 'chartDataModify').and.callThrough()
    spyOn(chartOptions, 'sortByTimestamp').and.returnValue(commandIqTrendingData)
    spyOn(exportDataChartOptionsService , 'commandIQStatus30recordOptions').and.returnValue(commandIQStatus30recordOptions);
    component.Highcharts.chart('command-status-IQ-chart', commandIqTrendingChartOption)
    component.chartDataModify(commandIqTrendingData)
    component.commandIQStatusApiLoader('command-status-IQ-chart', true)
  })
  it('should get commandTrendinIq Details', () => {
    const mockChartData = {
      categories: new Array(30).fill('Category'),
    };
    spyOn(component, 'chartDataModify').and.returnValue(mockChartData)
    spyOn(service, 'CommandIQStatus').and.returnValue(of(commandIqTrendingData))
    spyOn(chartOptions, 'sortByTimestamp').and.returnValue(commandIqTrendingData)
    spyOn(exportDataChartOptionsService , 'commandIQStatus30recordOptions').and.returnValue(of(commandIQStatus30recordOptions));
    component.Highcharts.chart('command-status-IQ-chart', commandIqTrendingChartOption)
    component.chartDataModify(mockChartData)
    component.commandIQStatusApiLoader('command-status-IQ-chart', false)
  })

  it('should get systemModel details', () => {
    component.systemModelDataObject =  new Array(30).fill('Category'),

    spyOn(service, 'getSubscriberSystemsModel').and.returnValue(of(systemModelData))
    spyOn(exportDataChartOptionsService,'getCommonSubscribersChartOptionsfor30records').and.returnValue(of(getCommonSubscribersChartOptionsfor30records));
    component.Highcharts.chart('systemModel-graph-div-system', systemByModelChartOptions)
    component.systemModelApiLoader('systemModel-graph-div-system', false)
    // expect(component.systemModelDataObject).toBeTruthy('value is not ,atched')
    // expect(component.systemModelDataObject).toBe(systemModelData, 'value mismatch')
    // expect(component.systeModelChartData).toBeTruthy('Could not find the chart options')
    // expect(component.systeModelChartData.chart.type).toMatch(systemByModelChartOptions.chart.type, 'type is matched')
    // expect(component.systeModelChartData.yAxis[0].title.text).toMatch('Systems')
  })
  it('should get systemModel details', () => {
    spyOn(service, 'getSubscriberSystemsModel').and.returnValue(of(systemModelData))
    component.Highcharts.chart('systemModel-graph-div-system', systemByModelChartOptions)
    component.systemModelApiLoader('systemModel-graph-div-system', true)
  })
  it('should modify the data correctly', () => {
    const cData1 = [{ date:  20230720, value: 100 }, { date: 20230724, value: 200 }];
    const cData2 = [{ date: 20230721, value: 50 }, { date: 20230725, value: 150 }];
    const cData3 = [{ date: 20230722, value: 75 }, { date: 20230726, value: 175 }];
    const cData4 = [{ date: 20230723, value: 125 }, { date: 20230727, value: 225 }];
    
    const expectedData = {
      series: [
        { name: 'ExperienceIQ', data: [100, 200] },
        { name: 'ProtectIQ', data: [50, 150] },
        { name: 'Arlo', data: [75, 175] },
        { name: 'Servify', data: [125, 225] }
      ],
      categories: ['07/02/23', '07/01/23']
    };
    
    component.revenueChartDDataModify(cData1, cData2, cData3, cData4);
    
    // expect(actualData).toEqual(expectedData);
  });
  it('should get revenueEdgeSuites Details', () => {
    spyOn(systemService, 'callRestApi').and.returnValue(of(revenueData[0].histories))
    spyOn(chartOptions, 'sortByTimestamp').and.returnValue(revenueData[0].histories)
    component.revenueEdgeSuitsApiLoader('revenue-edge-graph-div-system', false)
    component.revenueChartDataModify(revenueData[0].histories, revenueData[1].histories, revenueData[2].histories, revenueData[3].histories)
    component.Highcharts.chart('revenue-edge-graph-div-system', revenueEdgeSuiteTrendingChartoptions)
    component.getIqSuitesDatas('revenue-edge-graph-div-system', false)
    expect(component.revenueResponseData[0].name).toBeTruthy('value is not matched')
    expect(component.revenueResponseData[0].name).toBe(revenueData[0].histories[0].name, 'value  mismatched')
    expect(component.chartDataOptions).toBeTruthy('Could not find the chart options')
    expect(component.chartDataOptions.chart.type).toMatch(revenueEdgeSuiteTrendingChartoptions.chart.type, 'type is matched')
    expect(component.chartDataOptions.yAxis[0].title.text).toMatch('Subscribers')
  })

  it('should resetData details', () => {
    spyOn(component, 'resetDataFunction').and.callThrough()
    expect(component.commandIQStatusDataAvailable).toBeFalse();
    expect(component.revenueEdgeSuitsDataAvailable).toBeFalse();
    expect(component.systemModelDataAvailable).toBeFalse();
  });

  it('should get resetData Details', () => {
    spyOn(component, 'resetDataFunction').and.callThrough()
    component.resetDataFunction()
    expect(component.commandIQStatusDataAvailable).toBeFalse()
    expect(component.revenueEdgeSuitsDataAvailable).toBeFalse()
    expect(component.systemModelDataAvailable).toBeFalse()
    expect(component.resetDataFunction).toHaveBeenCalled()
  });

  it('should sortByTime Data', () => {
    spyOn(component, 'sortByTimestamp').and.callThrough()
    component.sortByTimestamp(commandIqTrendingData, 'date')
    expect(component.sortByTimestamp).toHaveBeenCalled()
  });

  it('should call fullScreenClose Function', () => {
    spyOn(component, 'fullScreenCloseFunction').and.callThrough()
    spyOn(component, 'resetDataFunction').and.callThrough()
    component.fullScreenCloseFunction()
    expect(component.fullScreen).toBe(false)
    expect(component.clickData).toBeUndefined();
    expect(component.fullScreenCloseFunction).toHaveBeenCalled()
    expect(component.resetDataFunction).toHaveBeenCalled()
  })

  it('should call api errorhandle', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401)
    expect(component.errorInfo).toBe("Access Denied")
    expect(component.error).toBe(true)
    expect(component.pageErrorHandle).toHaveBeenCalled()
  })

  it('should get fullScreenExpandFunction Details', () => {
    spyOn(component, 'fullScreenExpandFunction').and.callThrough()
    component.fullScreenExpandFunction('CommandIQ Trending')
    expect(component.fullScreen).toBe(true)
    expect(component.fullScreenChart).toBe('CommandIQ Trending')
    expect(component.fullScreenExpandFunction).toHaveBeenCalled()
  })

  it('should get fullScreenExpandFunction', () => {
    component.fullScreen=false;
    spyOn(component, 'fullScreenExpandFunction').and.callThrough()
    component.fullScreenExpandFunction('CommandIQ Trending')
    expect(component.chartAvailable).toBeFalse()
    expect(component.fullScreenTableAvailable).toBeFalse()
    expect(component.fullScreenExpandFunction).toHaveBeenCalled()
  })

  it('should call downloadFunction Details',()=>{
    spyOn(component,'downloadFunction').and.callThrough()
    spyOn(component,'getFullScreenChartOptions').and.callThrough()
    component.getFullScreenChartOptions("CommandIQ Trending", true)
    component.downloadFunction("Subscriber Data Usage")
    expect(component.downloadFunction).toHaveBeenCalled()
    expect(component.getFullScreenChartOptions).toHaveBeenCalled()
 })
 it('should call downloadFunction Details',()=>{
  spyOn(component,'downloadFunction').and.callThrough()
  spyOn(component,'getFullScreenChartOptions').and.callThrough()
  component.getFullScreenChartOptions('Managed Services Trending', true)
  component.downloadFunction("Subscriber Data Usage")
  expect(component.downloadFunction).toHaveBeenCalled()
  expect(component.getFullScreenChartOptions).toHaveBeenCalled()
})
 it('should call downloadFunction Details',()=>{
    spyOn(component,'downloadFunction').and.callThrough()
    spyOn(component,'getFullScreenChartOptions').and.callThrough()
    component.getFullScreenChartOptions('System by Model', true)
    component.downloadFunction("Subscriber Data Usage")
    expect(component.downloadFunction).toHaveBeenCalled()
    expect(component.getFullScreenChartOptions).toHaveBeenCalled()
 })
 it('should call downloadFunction Details',()=>{
  spyOn(component,'downloadFunction').and.callThrough()
  spyOn(component,'getFullScreenChartOptions').and.callThrough()
  component.getFullScreenChartOptions('Managed Services Trending', false)
  component.downloadFunction("Subscriber Data Usage")
  expect(component.downloadFunction).toHaveBeenCalled()
  expect(component.getFullScreenChartOptions).toHaveBeenCalled()
})
it('should call downloadFunction Details',()=>{
  spyOn(component,'downloadFunction').and.callThrough()
  spyOn(component,'getFullScreenChartOptions').and.callThrough()
  component.getFullScreenChartOptions('System by Model', false)
  component.downloadFunction("Subscriber Data Usage")
  expect(component.downloadFunction).toHaveBeenCalled()
  expect(component.getFullScreenChartOptions).toHaveBeenCalled()
})

 it('should call revenueEdgeSuitsApiLoader Details',()=>{
   spyOn(component,'revenueEdgeSuitsApiLoader').and.callThrough()
   spyOn(chartOptions, 'sortByTimestamp').and.returnValue(revenueData[0].histories)
   component.revenueEdgeSuitsApiLoader('Managed Services Trending',true)
   component.revenueChartDataModify(revenueData[0].histories, revenueData[1].histories, revenueData[2].histories, revenueData[3].histories)
   expect(component.fullScreenDownload).toBe(true)
   expect(component.revenueEdgeSuitsApiLoader).toHaveBeenCalled()
 })
  
  it('should create', () => {
    expect(component).toBeTruthy()
  });

});
