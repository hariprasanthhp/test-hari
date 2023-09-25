import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ReportApiService } from 'src/app/support/support-traffic-reports/reports/service/report-api.service';
import { OptionsManagerService } from 'src/app/support/support-traffic-reports/service/options-manager.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { EndpointUsage } from 'src/assets/mockdata/cco/traffic/endpoint/reports.data';
import { UsageChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { UsageComponent } from './usage.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  let endpointAPIService: ReportApiService;
  let optionsService: OptionsManagerService;
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
      declarations: [UsageComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        CustomTranslateService,
        ReportApiService,
        OptionsManagerService,
        CommonService,
        SsoAuthService
      ]
    })
      .compileComponents()
      .then(() => {
        endpointAPIService = TestBed.inject(ReportApiService);
        optionsService = TestBed.inject(OptionsManagerService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(UsageComponent);
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
    spyOn(component, 'closeAlert').and.callThrough();
    component.ngOnInit();
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('should load the chart', () => {
    sessionStorage.setItem('aggregate_Endpoint_Id', JSON.stringify('1645c1f3-d730-4f38-bc2a-6b588d2de1a3'));
    spyOn(endpointAPIService, 'getUsage').and.returnValue(of(EndpointUsage))
    spyOn(optionsService, 'makeOptionsForTraffic').and.returnValue(UsageChartOptions);
    component.loadChartData(params);
    expect(component.data[1].startPeriodSec).toMatch('1663977600');
    expect(component.trafficChartOptions.title.text).toMatch('Subscriber Usage');
  });

  it('should load the chart with error', () => {
    spyOn(endpointAPIService, 'getUsage').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
  });

  it('should render the chart ', () => {
    spyOn(optionsService, 'makeOptionsForTraffic');
    component.filters = { groupSelected: 'no' };
    component.language = [];
    component.data = [{}];
    component.renderChart();
    expect(optionsService.makeOptionsForTraffic).toHaveBeenCalled();
  });

  it('should handle error 500', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should handle error 401', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Access Denied");
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toEqual(true);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

});
