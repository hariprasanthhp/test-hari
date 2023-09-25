import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { MonthlyUsage, MonthlyUsageChartOptionsCSC } from 'src/assets/mockdata/support/support-traffic-reports/monthlyusage.data';
import { ReportApiService } from '../../reports/service/report-api.service';
import { OptionsManagerService } from "../../service/options-manager.service";

import { MonthlyUsageComponent } from './monthly-usage.component';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';

describe('MonthlyUsageComponent', () => {
  let component: MonthlyUsageComponent;
  let fixture: ComponentFixture<MonthlyUsageComponent>;
  let ReportService: ReportApiService;
  let optionsService: OptionsManagerService;
  let languageservice: TranslateService;

  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-10-04T09:37:35.183Z",
    "endDate": "2022-10-14T09:37:35.183Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": "0",
    "metric": "Rate",
    "monthSelected": "2022-10-14",
    "eliminateUnknownSelected": "no",
    "scopeSelected": "1",
    "granularity": "1month"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyUsageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        CustomTranslateService,
        ReportApiService,
        OptionsManagerService,
        CommonService,
        SsoAuthService
      ]
    })
      .compileComponents().then(() => {
        ReportService = TestBed.inject(ReportApiService);
        optionsService = TestBed.inject(OptionsManagerService);
        fixture = TestBed.createComponent(MonthlyUsageComponent);
        component = fixture.componentInstance;
        let eng = new EnglishJSON;
        languageservice?.selectedLanguage.next(of(eng));
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert');
    component.ngOnInit();
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalledTimes(1);
  })

  it('should render the chart', () => {
    spyOn(ReportService, 'getMonthlyUsage').and.returnValue(of(MonthlyUsage))
    spyOn(optionsService, 'makeOptionsForMonthlyUsage').and.returnValue(MonthlyUsageChartOptionsCSC);
    // spyOn(component, 'loadChartData').and.callThrough();
    component.loadChartData(params);
    // expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].startPeriodSec).toMatch('1659312000');
    expect(component.trafficChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.trafficChartOptions.title.text).toMatch("Subscriber Monthly Usage");
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
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    // expect(component.errorInfo).toMatch("Access Denied");
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toBeTrue();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

});
