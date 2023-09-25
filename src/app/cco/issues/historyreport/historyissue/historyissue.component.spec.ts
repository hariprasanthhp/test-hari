import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { environment } from 'src/environments/environment';
import {
  HttpClient, HttpClientModule
  , HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { HistoryChartOptionsService } from '../service/history-chart-options.service';
import { IssueService } from '../../service/issue.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { HistoryissueComponent } from './historyissue.component';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { Title } from '@angular/platform-browser';
import { REGIONS } from 'src/assets/mockdata/cco/issues/service/regions';
import { LOCATIONS } from 'src/assets/mockdata/cco/issues/service/locations';
import { SYSTEMS } from 'src/assets/mockdata/cco/issues/service/systems';
import { ALARMS } from 'src/assets/mockdata/cco/issues/service/alarms'
import { CATEGORIES } from 'src/assets/mockdata/cco/issues/service/categories';
import { CUSTOM_CATEGORIES } from 'src/assets/mockdata/cco/issues/service/customCategories';
import { ALARM_BY_INTERVAL } from 'src/assets/mockdata/cco/issues/service/alarm_by_interval';
import { ALARM_BY_SEVERITY } from 'src/assets/mockdata/cco/issues/service/alarm_by_severity';
import { ALARM_BY_REGION } from 'src/assets/mockdata/cco/issues/service/alarm_by_region';
import { ENGLISH } from 'src/assets/mockdata/language/english';
import * as Highcharts from 'highcharts';

describe('HistoryissueComponent', () => {
  let component: HistoryissueComponent;
  let fixture: ComponentFixture<HistoryissueComponent>;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;
  let translateService: TranslateService;
  let commonOrgService: CommonService;
  let exportExcelService: ExportExcelService;
  let issueService: IssueService;
  let chartOptionService: HistoryChartOptionsService;
  let dialogService: NgbModal;
  let fb: FormBuilder;
  let ssoService: SsoAuthService;
  let changeDetect: ChangeDetectorRef;
  let dateUtilsService: DateUtilsService;
  let route: ActivatedRoute;
  let validatorService: ValidatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
        , CalendarModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      declarations: [HistoryissueComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [TranslateService, CommonService, ExportExcelService, IssueService, HistoryChartOptionsService, NgbModal, FormBuilder, SsoAuthService, ChangeDetectorRef, DateUtilsService, ValidatorService, Title]
    })
      .compileComponents()
      .then(() => {
        issueService = TestBed.inject(IssueService);
        fixture = TestBed.createComponent(HistoryissueComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryissueComponent);
    component = fixture.componentInstance;
    (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
    fixture.detectChanges();
  });

  // it('should get the regions data', () => {
  //   spyOn(issueService, 'getRegions').and.returnValue(of(REGIONS));
  //   component.regionsApiLoader();
  //   expect(component.regionsDataArray.length).toBe(2, "Length is wrong");
  //   // spyOn(component, 'renderTable').and.callThrough();
  //   // component.getData(false);
  //   // expect(component.tableData).toBeTruthy("No data available");
  //   // expect(component.tableData.length).toBe(2, "Length is wrong");
  //   // expect(component.renderTable).toHaveBeenCalledTimes(1);
  // });

  // it('should get the alarms data', () => {
  //   component.getAlarmNames();
  //   const req = httpTestingController.expectOne(request => {
  //     return true;
  //   });
  //   req.flush(ALARMS);

  //   expect(component.alarmNames).toBeTruthy("Could not find the data");
  //   expect(component.alarmNames.length).toBeGreaterThan(1);
  // });

  // it('should get the categories data', () => {
  //   component.getCategories();
  //   const req = httpTestingController.expectOne(request => {
  //     return true;
  //   });
  //   req.flush(CATEGORIES);

  //   expect(component.categories).toBeTruthy("Could not find the data");
  //   expect(component.categories.length).toBeGreaterThan(1);
  // });

  // it('should get the custom categories data', () => {
  //   component.getCustomCategories();
  //   const req = httpTestingController.expectOne(request => {
  //     return true;
  //   });
  //   req.flush(CUSTOM_CATEGORIES);

  //   expect(component.customCategories).toBeTruthy("Could not find the data");
  //   expect(component.customCategories.length).toBeGreaterThan(1);
  // });

  // it('should get the locations data', () => {
  //   component.filtersForm.get('region').setValue(['region']);
  //   component.loadLocationValue(false);
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("url: ", request.url);
  //     return true;
  //   });
  //   req.flush(LOCATIONS);

  //   expect(component.locationDataArray).toBeTruthy("Could not find the data");
  //   expect(component.locationDataArray.length).toBeGreaterThan(1);
  // });

  // it('should get the systems data', () => {
  //   component.filtersForm.get('region').setValue(['region']);
  //   component.filtersForm.get('location').setValue(['location']);
  //   component.filtersForm.get('system').setValue(['system']);
  //   component.loadSystemValue(false);
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("url: ", request.url);
  //     return true;
  //   });
  //   req.flush(SYSTEMS);

  //   expect(component.locationDataArray).toBeTruthy("Could not find the data");
  //   expect(component.locationDataArray.length).toBe(1);
  // });


  // it('should get the alarms by locations', () => {
  //   component.clickedRegion = 'region';
  //   //component.clickedEventRegion = 'region';
  //   component.getChartByLocation('Alarm');
  //   const req = httpTestingController?.expectOne(request => {
  //     console.log("alarms by locations url: ", request.url);
  //     return true;
  //   });
  //   req.flush(LOCATIONS);

  //   expect(component.clickedLoctionsObj).toBeTruthy("Could not find the data");
  //   expect(Object.keys(component.clickedLoctionsObj).length).toBe(1);
  // });

  // it('should get the alarms by systems', () => {
  //   component.clickedRegion = 'region';
  //   //component.clickedEventRegion = 'region';
  //   component.getAlarmBySystem('Alarm');
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("alarms by systems url: ", request.url);
  //     return true;
  //   });
  //   req.flush(SYSTEMS);

  //   expect(component.clickedSystemsObj).toBeTruthy("Could not find the data");
  //   expect(Object.keys(component.clickedSystemsObj).length).toBe(1);
  // });

  it('should get load the intial data', () => {
    component.language = ENGLISH
    component.alarmType = 'Alarm';
    component.baseUrl = `https://stage.api.calix.ai/v1/`
    let date = new Date();
    let FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    let ToDate = new Date();
    component.FromDate = FromDate;
    component.ToDate = ToDate;

    component.filtersForm.patchValue({
      startDate: FromDate,
      endDate: ToDate,
      alarmType: 'Alarm',
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: 'All',
      category: ['All'],
      customCategory: 'None',
      eventName: 'All',
      cco_ack: 'all',
      cco_shelv: 'all'
    });

    spyOn(component, 'alarmsCount').and.callThrough();

    component.loadIntialData();
    // const alarmbyRegion = httpTestingController.expectOne(request => {
    //   console.log("alarms by region url: ", request.url);
    //   return true;
    // });
    // const alarmbySeverity = httpTestingController.expectOne(request => {
    //   console.log("alarms by severity url: ", request.url);
    //   return true;
    // });
    // const alarmbyInterval = httpTestingController.expectOne(request => {
    //   console.log("alarms by interval url: ", request.url);
    //   return true;
    // });

    const alarmbyRegion = httpTestingController.expectOne(request => request.url.includes('alarmbyRegion?notificationType=Alarm'));
    const alarmbySeverity = httpTestingController.expectOne(request => request.url.includes('alarmbySeverity?notificationType=Alarm'));
    const alarmbyInterval = httpTestingController.expectOne(request => request.url.includes('alarmbyInterval?notificationType=Alarm'));
    expect(alarmbyRegion.request.method).toBe('GET');
    expect(alarmbySeverity.request.method).toBe('GET');
    expect(alarmbyInterval.request.method).toBe('GET');
    alarmbyRegion.flush(ALARM_BY_REGION);
    alarmbySeverity.flush(ALARM_BY_SEVERITY);
    alarmbyInterval.flush(ALARM_BY_INTERVAL);

    //expect(component.clickedSystemsObj).toBeTruthy("Could not find the data");
    //expect(Object.keys(component.clickedSystemsObj).length).toBe(1);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
