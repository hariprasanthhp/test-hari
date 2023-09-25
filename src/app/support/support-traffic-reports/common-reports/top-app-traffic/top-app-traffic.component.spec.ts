import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { topApplicationChartOptionsCSC, topapplicationdata } from 'src/assets/mockdata/support/support-traffic-reports/monthlyusage.data';
import { ReportApiService } from '../../reports/service/report-api.service';
import { OptionsManagerService } from '../../service/options-manager.service';

import { TopAppTrafficComponent } from './top-app-traffic.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TranslateService } from 'src/app-services/translate.service';

describe('TopAppTrafficComponent', () => {
  let component: TopAppTrafficComponent;
  let fixture: ComponentFixture<TopAppTrafficComponent>;
  let ReportService: ReportApiService;
  let optionsService: OptionsManagerService;
  let languageservice: TranslateService;
  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-10-09T02:40:52.751Z",
    "endDate": "2022-10-19T02:40:52.751Z",
    "limit": 10,
    "groupSelected": "yes",
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
      declarations: [TopAppTrafficComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        CustomTranslateService,
        ReportApiService,
        DateUtilsService,
        CommonService,
        ExportExcelService,
        SsoAuthService,
        OptionsManagerService
      ]
    })
      .compileComponents().then(() => {
        ReportService = TestBed.inject(ReportApiService);
        optionsService = TestBed.inject(OptionsManagerService);
        fixture = TestBed.createComponent(TopAppTrafficComponent);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    expect(component).toBeTruthy();
  });
  it('should render the chart', () => {

    spyOn(ReportService, 'getAppTraffic').and.returnValue(of(topapplicationdata))
    spyOn(component, 'makeAreaChartOptions').and.callThrough();
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data.length).toBe(2, "Length is wrong");
    expect(component.data[0].name).toMatch('Zoom Video Conferencing');
    expect(component.makeAreaChartOptions).toHaveBeenCalled();
    expect(component.makeAreaChartOptions).toHaveBeenCalledTimes(2);
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
