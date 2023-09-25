import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TopApplicationTraffic } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ApplicationReportsComponent } from '../../../applications/application-reports/application-reports.component';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';

import { TopApplicationTrafficComponent } from './top-application-traffic.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TopApplicationTrafficComponent', () => {
  let component: TopApplicationTrafficComponent;
  let fixture: ComponentFixture<TopApplicationTrafficComponent>;
  let locationReportService: LocationReportApiService;
  let customTranslateService: CustomTranslateService
  let params = {
    "locationsSelected": [
      "All"
    ],
    "locationsSelectedNames": [
      "All"
    ],
    "applicationsSelected": [
      "All"
    ],
    "applicationsSelectedNames": [
      "All"
    ],
    "criteriaSelected": "usage",
    "startDate": "2022-09-20T14:08:50.025Z",
    "endDate": "2022-09-26T14:08:13.959Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": 0,
    "metric": "Rate",
    "monthSelected": "2022-09-26",
    "eliminateUnknownSelected": "no",
    "aggregateSelected": "false",
    "thresholdTypeSelected": "AllEndpoints",
    "scopeSelected": "1",
    "startHour": 0,
    "endHour": 23,
    "periodSelected": "-1",
    "peakRateFrom": 4,
    "peakRateTo": 5,
    "startTime": 0,
    "endTime": 25,
    "showTimeRange": false,
    "type": "location"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopApplicationTrafficComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/traffic/applications/reports', component: ApplicationReportsComponent },
      ]), HttpClientTestingModule],
      providers: [
        CustomTranslateService,
        SsoAuthService,
        CommonService,
        ChartOptionsService,
        LocationReportApiService
      ]
    })
      .compileComponents()
      .then(() => {
        locationReportService = TestBed.inject(LocationReportApiService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(TopApplicationTrafficComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.renderOnce = true;
    component.filters = params;
    component.data = TopApplicationTraffic;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized ngOnInit()', () => {
    component.ngOnInit();

    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
  });

  it('should render the chart', () => {
    spyOn(locationReportService, 'getAppTraffic').and.returnValue(of(TopApplicationTraffic))
    spyOn(component, 'makeAreaChartOptions').and.callThrough();
    params.rateSelected = 'Average';
    component.loadChartData(params);
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[0].name).toMatch('Zoom Video Conferencing');
    expect(component.makeAreaChartOptions).toHaveBeenCalled();
    params.rateSelected = 'Max';
    component.loadChartData(params);
  });

  it('should render the chart1', () => {
    spyOn(component, 'pageErrorHandle')
    spyOn(locationReportService, 'getAppTraffic').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should re-render the chart', () => {
    (component as any).HighCharts = { chart: () => { } };
    component.data = TopApplicationTraffic;
    component.filters = params;
    component.filters['rateSelected'] = 'Average';
    component.renderChart();
    component.filters['rateSelected'] = 'Max';
    component.renderChart();
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

  it('topApplicationTrafficColors and topApplicationTrafficTooltip', () => {
    component.topApplicationTrafficTooltip(1000000);
    component.topApplicationTrafficColors();
  });

  it('getSize', () => {
    component.getSize({});
    component.downLoadCSV("topApplications", [], []);
    component.ConvertToCSV({}, []);
  });

});
