import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TopSubscriber } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { TopSubscriberChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { NetworkReportApiService } from '../../../network/reports/network-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { TopSubscribersComponent } from './top-subscribers.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TopSubscribersComponent', () => {
  let component: TopSubscribersComponent;
  let fixture: ComponentFixture<TopSubscribersComponent>;
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
      declarations: [TopSubscribersComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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
        fixture = TestBed.createComponent(TopSubscribersComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });


  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.renderOnce = true;
    component.filters = params;
    component.data = TopSubscriber;
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
    sessionStorage.setItem("showSensitiveInfo", "false");
    spyOn(networkReportService, 'getTopSubdata').and.returnValue(of(TopSubscriber))
    spyOn(component, 'renderChart').and.callThrough()
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[0].name).toEqual('wa*********');
    setTimeout(() => {
      expect(component.renderChart).toHaveBeenCalledTimes(1);
    }, 1500)
    flush(1500);
  }));

  it('should render the chart1', fakeAsync(() => {
    spyOn(networkReportService, 'getTopSubdata').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
    flush();
  }));

  it('should re-render the chart', () => {
    spyOn(optionsService, 'topSub_ChartOptions').and.returnValue(TopSubscriberChartOptions);
    component.isUUID = true;
    component.data = TopSubscriber;
    component.renderChart();
    expect(component.tobSubChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.tobSubChartOptions.title.text).toMatch('Network Top Subscribers');
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
