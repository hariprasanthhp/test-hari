import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { EndpointTopApplicationTraffic } from 'src/assets/mockdata/cco/traffic/endpoint/reports.data';
import { EndpointTopApplicationTrafficChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { EndpointReportsService } from '../endpoint-reports.service';
import { TopApplicationTrafficComponent } from './top-application-traffic.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TopApplicationTrafficComponent', () => {
  let component: TopApplicationTrafficComponent;
  let fixture: ComponentFixture<TopApplicationTrafficComponent>;
  let endpointAPIService: EndpointReportsService;
  let optionsService: ChartOptionsService;
  let customTranslateService: CustomTranslateService
  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-09-23T13:37:25.529Z",
    "endDate": "2022-09-29T13:37:25.528Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "metric": "Rate",
    "monthSelected": "2022-09-29",
    "endpointID": "4e8b1495-13a4-4541-9ca0-5765cb0dae5d",
    "startTime": 0,
    "endTime": 25,
    "groupBy": "application"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopApplicationTrafficComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        CustomTranslateService,
        EndpointReportsService,
        DateUtilsService,
        CommonService,
        ExportExcelService,
        SsoAuthService,
        ChartOptionsService
      ]
    })
      .compileComponents()
      .then(() => {
        endpointAPIService = TestBed.inject(EndpointReportsService);
        optionsService = TestBed.inject(ChartOptionsService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(TopApplicationTrafficComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };;
        component.filters = { groupSelected: 'no' };
        component.data = [];
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized ngOnInit()', () => {
    component.ngOnInit();
    expect(component.page.sub_route).toMatch('top-applications-traffic');
  });

  it('should load the chart', () => {
    spyOn(endpointAPIService, 'getAppTraffic').and.returnValue(of(EndpointTopApplicationTraffic))
    spyOn(component, 'makeAreaChartOptions').and.returnValue(EndpointTopApplicationTrafficChartOptions);
    params.rateSelected = 'Average';
    component.loadChartData(params);
    expect(component.data[1].name).toMatch('Apple_WWnet');
    params.rateSelected = 'Max';
    component.loadChartData(params);
  });

  it('should render the chart ', () => {
    spyOn(component, 'makeAreaChartOptions');
    component.filters = { rateSelected: 'Average' };
    component.language = [];
    component.data = [{}];
    component.renderChart();
    expect(component.makeAreaChartOptions).toHaveBeenCalled();
  });

  it('should load the chart with error', () => {
    spyOn(endpointAPIService, 'getAppTraffic').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
  });

  it('should handle error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('should handle error', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Access Denied");
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toEqual(true);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('topApplicationTrafficColors and topApplicationTrafficTooltip', () => {
    component.topApplicationTrafficTooltip(1000000);
    component.topApplicationTrafficColors();
  });

  it('getSize', () => {
    component.getSize({});
    component.getSize(EndpointTopApplicationTraffic);
    component.downLoadCSV("topApplications", [], []);
    component.downLoadCSV("topApplications", EndpointTopApplicationTraffic, []);
    component.ConvertToCSV({}, []);
  });

  it('makeAreaChartOptions', () => {
    component.makeAreaChartOptions(EndpointTopApplicationTraffic, 'usRate', 'Up', params);
  });

});
