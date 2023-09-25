import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { Traffic } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { TrafficChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';

import { TrafficComponent } from './traffic.component';

describe('TrafficComponent', () => {
  let component: TrafficComponent;
  let fixture: ComponentFixture<TrafficComponent>;
  let locationReportService: LocationReportApiService;
  let optionsService: ChartOptionsService;
  let customTranslateService: CustomTranslateService;
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
      declarations: [TrafficComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        CustomTranslateService,
        SsoAuthService,
        CommonService,
        ChartOptionsService,
        LocationReportApiService,
        ChangeDetectorRef
      ]
    })
      .compileComponents()
      .then(() => {
        locationReportService = TestBed.inject(LocationReportApiService);
        optionsService = TestBed.inject(ChartOptionsService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(TrafficComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.renderOnce = true;
    component.filters = params;
    component.data = Traffic;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized ngOnInit()', () => {
    spyOn(component, 'closeAlert');
    component.ngOnInit();

    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('should render the chart', () => {
    spyOn(locationReportService, 'getTraffic').and.returnValue(of(Traffic))
    spyOn(optionsService, 'makeOptionsForNWTraffic').and.returnValue(TrafficChartOptions);
    params['criteriaSelected'] = 'usage';
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].startPeriodSec).toMatch('1663200000');
    expect(component.trafficChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.trafficChartOptions.title.text).toMatch('Network Traffic');
  });

  it('should render the rate chart', () => {
    spyOn(locationReportService, 'getTraffic').and.returnValue(of(Traffic))
    spyOn(optionsService, 'makeOptionsForLineChart').and.returnValue(TrafficChartOptions);
    params['criteriaSelected'] = 'rate';
    component.loadChartData(params);
    expect(component.data).toBeTruthy();
  });

  it('should render the usage chart1', () => {
    spyOn(locationReportService, 'getTraffic').and.returnValue(throwError({ error: { title: 'defined' } }))
    params['criteriaSelected'] = 'usage';
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
    component.loadChartData(params);
  });

  it('should render the rate chart1', () => {
    spyOn(locationReportService, 'getTraffic').and.returnValue(throwError({ error: { title: 'defined' } }))
    params['criteriaSelected'] = 'rate';
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
  });

  it('should re-render usage chart', () => {
    spyOn(optionsService, 'makeOptionsForNWTraffic').and.returnValue(TrafficChartOptions);
    component.filters = params;
    component.filters['criteriaSelected'] = 'usage';
    component.renderChart();
    expect(component.trafficChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.trafficChartOptions.title.text).toMatch('Network Traffic');
  });

  it('should re-render rate chart', () => {
    spyOn(optionsService, 'makeOptionsForLineChart').and.returnValue(TrafficChartOptions);
    component.filters = params;
    component.filters['criteriaSelected'] = 'rate';
    component.renderChart();
    expect(component.trafficChartOptions.title.text).toMatch('Network Traffic');
  });

  it('should handle error 500', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should handle error 401', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Access Denied");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toEqual(true);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('check ng After ViewChecked', () => {
    component.ngAfterViewChecked()
  });

});
