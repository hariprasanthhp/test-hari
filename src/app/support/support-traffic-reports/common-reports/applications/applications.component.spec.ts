import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { applicationChartOptionsCSC, applicationdata } from 'src/assets/mockdata/support/support-traffic-reports/monthlyusage.data';
import { ReportApiService } from '../../reports/service/report-api.service';
import { OptionsManagerService } from '../../service/options-manager.service';

import { ApplicationsComponent } from './applications.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TranslateService } from 'src/app-services/translate.service';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let ReportService: ReportApiService;
  let optionsService: OptionsManagerService;
  let languageservice: TranslateService;

  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-10-09T02:40:52.751Z",
    "endDate": "2022-10-19T02:40:52.751Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": "0",
    "metric": "Rate",
    "monthSelected": "2022-10-19",
    "eliminateUnknownSelected": "no",
    "scopeSelected": "1"
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsComponent],
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
        fixture = TestBed.createComponent(ApplicationsComponent);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should render the chart', () => {
    spyOn(ReportService, 'getApplications').and.returnValue(of(applicationdata))
    spyOn(ReportService, 'makeOptions').and.returnValue(applicationChartOptionsCSC);
    // spyOn(component, 'loadChartData').and.callThrough();
    component.loadChartData(params);
    // expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[1].startPeriodSec).toMatch('1665187200');
    expect(component.topAppsChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.topAppsChartOptions.title.text).toMatch("Top Applications");
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
