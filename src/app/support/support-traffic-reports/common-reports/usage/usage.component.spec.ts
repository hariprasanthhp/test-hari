import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { UsageChartOptionsCSC, Usagedata } from 'src/assets/mockdata/support/support-traffic-reports/monthlyusage.data';
import { ReportApiService } from '../../reports/service/report-api.service';
import { OptionsManagerService } from '../../service/options-manager.service';

import { UsageComponent } from './usage.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TranslateService } from 'src/app-services/translate.service';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  let ReportService: ReportApiService;
  let optionsService: OptionsManagerService;
  let languageservice: TranslateService;

  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-10-07T07:28:22.588Z",
    "endDate": "2022-10-17T07:28:22.587Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": "0",
    "metric": "Rate",
    "monthSelected": "2022-10-17",
    "eliminateUnknownSelected": "no",
    "scopeSelected": "1"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsageComponent],
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
        fixture = TestBed.createComponent(UsageComponent);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageComponent);
    component = fixture.componentInstance;
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    fixture.detectChanges();
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert');
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    component.ngOnInit();
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalledTimes(1);
  })

  it('should render the chart', () => {
    spyOn(ReportService, 'getUsage').and.returnValue(of(Usagedata))
    spyOn(optionsService, 'makeOptionsForTraffic').and.returnValue(UsageChartOptionsCSC);
    // spyOn(component, 'loadChartData').and.callThrough();
    component.loadChartData(params);
    // expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].startPeriodSec).toMatch('1665187200');
    expect(component.trafficChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.trafficChartOptions.title.text).toMatch("Subscriber Usage");
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
