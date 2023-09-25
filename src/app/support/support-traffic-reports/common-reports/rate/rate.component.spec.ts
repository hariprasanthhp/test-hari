import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ReportApiService } from '../../reports/service/report-api.service';
import { OptionsManagerService } from '../../service/options-manager.service';

import { RateComponent } from './rate.component';
import { rateUsagedata, rateUsageChartOptionsCSC } from 'src/assets/mockdata/support/support-traffic-reports/monthlyusage.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TranslateService } from 'src/app-services/translate.service';
import { HighchartsChartModule } from 'highcharts-angular';

describe('RateComponent', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;
  let ReportService: ReportApiService;
  let optionsService: OptionsManagerService;
  let languageservice: TranslateService;

  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-10-07T07:16:20.542Z",
    "endDate": "2022-10-17T07:16:20.542Z",
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
      declarations: [RateComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule,
        HighchartsChartModule
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
        fixture = TestBed.createComponent(RateComponent);
        component = fixture.componentInstance;
        component.pageAvailable = true;
        fixture.detectChanges();
        // let eng = new EnglishJSON;
        // languageservice.selectedLanguage.next(of(eng));
      });
  });

  it('should initialized onInit()', fakeAsync(() => {
    spyOn(component, 'closeAlert');
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    component.ngOnInit();
    flush(2000)
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalledTimes(1);
  }))

  it('should render the chart', () => {
    spyOn(ReportService, 'getRate').and.returnValue(of(rateUsagedata))
    spyOn(optionsService, 'makeOptionsForLineChart').and.returnValue(rateUsageChartOptionsCSC);
    // spyOn(component, 'loadChartData').and.callThrough();
    component.loadChartData(params);
    // expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].startPeriodSec).toMatch('1665086400');
    expect(component.trafficChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.trafficChartOptions.title.text).toMatch("Subscriber Rate");
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
