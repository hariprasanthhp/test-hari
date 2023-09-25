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
import { EndpointTopApplication } from 'src/assets/mockdata/cco/traffic/endpoint/reports.data';
import { EndpointTopApplicationChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { EndpointReportsService } from '../endpoint-reports.service';

import { ApplicationsComponent } from './applications.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let endpointReportService: EndpointReportsService;
  let optionsService: ChartOptionsService;
  let customTranslateService: CustomTranslateService;
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
      declarations: [ApplicationsComponent],
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
        SsoAuthService,
        EndpointReportsService,
        ChartOptionsService
      ]
    })
      .compileComponents()
      .then(() => {
        endpointReportService = TestBed.inject(EndpointReportsService);
        optionsService = TestBed.inject(ChartOptionsService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(ApplicationsComponent);
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
    expect(component.page.sub_route).toMatch('applications');
  });

  it('should render the chart 1', () => {
    spyOn(endpointReportService, 'getApplications').and.returnValue(of(EndpointTopApplication))
    spyOn(optionsService, 'makeOptionsEndpointTopApp').and.returnValue(EndpointTopApplicationChartOptions);
    component.chartType = 'bar';
    component.loadChartData(params);
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].name).toMatch('Zynga');
    expect(component.topAppsChartOptions.title.text).toMatch('Top Applications');
  });

  it('should render the chart 2', () => {
    spyOn(optionsService, 'makeOptionsEndpointTopApp');
    component.filters = { groupSelected: 'no' };
    component.language = [];
    component.chartType = 'bar';
    component.data = [{ key: "" }];
    component.renderChart();
    expect(optionsService.makeOptionsEndpointTopApp).toHaveBeenCalled();
  });

  it('should render the chart with error', () => {
    spyOn(endpointReportService, 'getApplications').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
    expect(component.loading).toBeFalse();
  });

  it('should handle error 500', () => {
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Internal Server Error");
  });

  it('should handle error 401', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Access Denied");
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toBeTrue();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

});
