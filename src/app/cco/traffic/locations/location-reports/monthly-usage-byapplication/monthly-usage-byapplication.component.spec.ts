import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { MonthlyUsageByApplication } from 'src/assets/mockdata/cco/traffic/locaion/reports.data';
import { MonthlyUsageByApplicationChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';

import { MonthlyUsageByapplicationComponent } from './monthly-usage-byapplication.component';

describe('MonthlyUsageByapplicationComponent', () => {
  let component: MonthlyUsageByapplicationComponent;
  let fixture: ComponentFixture<MonthlyUsageByapplicationComponent>;
  let locationReportService: LocationReportApiService;
  let optionsService: ChartOptionsService;
  let customTranslateService: CustomTranslateService
  let params = {
    "locationsSelected": [
      "e48a915f-2393-4917-bf6e-2f7280b5f7aa"
    ],
    "locationsSelectedNames": [
      "Testing"
    ],
    "applicationsSelected": [
      "e48a915f-2393-4917-bf6e-2f7280b5f7aa"
    ],
    "applicationsSelectedNames": [
      "Testing"
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
      declarations: [MonthlyUsageByapplicationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
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
        optionsService = TestBed.inject(ChartOptionsService);
        fixture = TestBed.createComponent(MonthlyUsageByapplicationComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.filters = params;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert');
    component.ngOnInit();
    expect(component.closeAlert).toHaveBeenCalled();

    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
  })

  it('should render the chart', () => {
    spyOn(locationReportService, 'getMonthlyUsageByApp').and.returnValue(of(MonthlyUsageByApplication))
    spyOn(optionsService, 'monthlyUsageByAppChartOptions').and.returnValue(MonthlyUsageByApplicationChartOptions);
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data[1].startPeriodSec).toMatch('1656633600');
    expect(component.monthusageChartOptions.title.text).toMatch("Monthly Usage By Application");
  });

  it('should render the chart with error', () => {
    spyOn(locationReportService, 'getMonthlyUsageByApp').and.returnValue(throwError({ error: 'undefined' }))
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
  });

  it('should re-render the chart', () => {
    spyOn(optionsService, 'monthlyUsageByAppChartOptions').and.returnValue(MonthlyUsageByApplicationChartOptions);
    component.filters = params;
    component.renderChart();
    expect(component.monthusageChartOptions.title.text).toMatch("Monthly Usage By Application");
  });

  it('should handle error 500', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.showError).toHaveBeenCalled();
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
