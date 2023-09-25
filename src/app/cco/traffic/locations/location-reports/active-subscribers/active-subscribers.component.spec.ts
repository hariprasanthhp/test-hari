import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { ActiveSubscriber } from 'src/assets/mockdata/cco/traffic/locaion/reports.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { ActiveSubscribersComponent } from './active-subscribers.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ActiveSubscribersComponent', () => {
  let component: ActiveSubscribersComponent;
  let fixture: ComponentFixture<ActiveSubscribersComponent>;
  let locationReportService: LocationReportApiService;
  let exportExcelService: ExportExcelService;
  let customTranslateService: CustomTranslateService;
  let httpTestingController: HttpTestingController;
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
  let columnDefs = [
    { headerName: 'location', field: 'location' },
    { headerName: 'subscriber', field: 'subscriber' },
    { headerName: 'upUsage', field: 'usOctets' },
    { headerName: 'downUsage', field: 'dsOctets' },
    { headerName: 'totalUsage', field: 'totalOctets' },
    { headerName: 'hitCount', field: 'hitCount' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveSubscribersComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DataTablesModule
      ],
      providers: [
        CustomTranslateService,
        SsoAuthService,
        CommonService,
        ChartOptionsService,
        LocationReportApiService,
        ExportExcelService
      ]
    })
      .compileComponents()
      .then(() => {
        locationReportService = TestBed.inject(LocationReportApiService);
        exportExcelService = TestBed.inject(ExportExcelService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(ActiveSubscribersComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.filters = params;
    // component.renderedOnce = true;
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

  it('should call the get data method', () => {
    spyOn(component, 'getdata').and.callThrough();
    component.loadChartData(params);
    expect(component.runClicked).toBeTrue();
    expect(component.getdata).toHaveBeenCalled();
  });

  it('should get the table data', () => {
    component.getdata(false);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
    expect(component.loading).toBeFalse();
  });

  it('should get the table data', () => {
    sessionStorage.setItem("showSensitiveInfo", "false");
    spyOn(component, 'renderTable').and.callThrough();
    component.getdata(false);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(ActiveSubscriber);
    expect(component.tableData).toBeTruthy("No data available");
    expect(component.tableData[1].subscriber).toEqual("wa*********");
    expect(component.renderTable).toHaveBeenCalledTimes(1);
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
    expect(component.showError).toHaveBeenCalled();
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toBeTrue();
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('tableLanguageOptions', () => {
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
  });

  it('makeIsoDate and convertByteToGB', () => {
    component.makeIsoDate('2022-11-08T00:00:00Z');
    component.convertByteToGB(7891237);
    component.convertByteToGB(null);
  });

  it('downloadCSV and downloadPdf and convertBytes', () => {
    component.exportData = ActiveSubscriber;
    component.filters = params;
    component.columnDefs = columnDefs;
    component.downloadCSV();
    component.downloadPdf();

    component.exportData = [];
    component.downloadCSV();
  });

  it('get all Data', () => {
    component.filters = params;
    component.columnDefs = columnDefs;
    component.getAllData(true);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(ActiveSubscriber);
    expect(component.exportData).toEqual(ActiveSubscriber);
    component.getAllData(false);
    const req1 = httpTestingController.expectOne(request => {
      return true;
    });
    req1.flush(ActiveSubscriber);
  });

  it('get all Data with error', () => {
    component.filters = params;
    component.columnDefs = columnDefs;
    component.exportData = [];
    component.getAllData(true);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
    component.getAllData(false);
    const req1 = httpTestingController.expectOne(request => {
      return true;
    });
    req1.error(ErrorEvent['error']);
  });

});
