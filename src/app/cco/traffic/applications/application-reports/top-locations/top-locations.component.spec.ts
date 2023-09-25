import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TopLocation } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { TopLocationChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { NetworkReportApiService } from '../../../network/reports/network-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';

import { TopLocationsComponent } from './top-locations.component';

describe('TopLocationsComponent', () => {
  let component: TopLocationsComponent;
  let fixture: ComponentFixture<TopLocationsComponent>;
  let networkReportService: NetworkReportApiService;
  let optionsService: ChartOptionsService;
  let customTranslateService: CustomTranslateService;
  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-09-06T15:49:40.416Z",
    "endDate": "2022-09-12T15:49:40.416Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": "0",
    "metric": "Rate",
    "monthSelected": "2022-09-12",
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
    "groupBy": "location"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopLocationsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        CustomTranslateService,
        SsoAuthService,
        CommonService,
        ChartOptionsService,
        NetworkReportApiService
      ]
    })
      .compileComponents()
      .then(() => {
        networkReportService = TestBed.inject(NetworkReportApiService);
        optionsService = TestBed.inject(ChartOptionsService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(TopLocationsComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.renderOnce = true;
    component.filters = params;
    component.data = TopLocation;
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

  it('should render the chart', fakeAsync(() => {
    spyOn(networkReportService, 'getTopLocations').and.returnValue(of(TopLocation))
    spyOn(optionsService, 'makeOptionsForLocations').and.returnValue(TopLocationChartOptions);
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].name).toMatch('tloc14');
    setTimeout(() => {
      expect(component.chartOptions).toBeTruthy("Could not find the chart options");
      expect(component.chartOptions.title.text).toMatch('Network Top Locations');
    }, 1500)
    flush(1500);
  }));

  it('should render the chart1', fakeAsync(() => {
    spyOn(networkReportService, 'getTopLocations').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
    flush();
  }));

  it('should re-render the chart', () => {
    spyOn(optionsService, 'makeOptionsForLocations').and.returnValue(TopLocationChartOptions);
    component.renderChart();
    expect(component.chartOptions).toBeTruthy("Could not find the chart options");
    expect(component.chartOptions.title.text).toMatch('Network Top Locations');
  });


  it('should handle error 500', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should handle error 401', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Access Denied");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toBeTrue();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

});
