import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { AverageSubscriberRate } from 'src/assets/mockdata/cco/traffic/locaion/reports.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';

import { AverageSubscriberRateComponent } from './average-subscriber-rate.component';

describe('AverageSubscriberRateComponent', () => {
  let component: AverageSubscriberRateComponent;
  let fixture: ComponentFixture<AverageSubscriberRateComponent>;
  let locationReportService: LocationReportApiService;
  let httpTestingController: HttpTestingController;
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
    "eliminateUnknownSelected": "yes",
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

  let  columnDefs = [
    { headerName: 'location', field: 'location' },
    { headerName: 'subscriber', field: 'subscriber' },
    { headerName: 'Date', field: 'startPeriodSec' },
    { headerName: 'Avg Up(Mbps)', field: 'avgUsRate' },
    { headerName: 'Avg Down(Mbps)', field: 'avgDsRate' },
    { headerName: 'Max Up(Mbps)', field: 'peakUsRate' },
    { headerName: 'Max Down(Mbps)', field: 'peakDsRate' },
    { headerName: 'Min Up(Mbps)', field: 'minPeakUsRate' },
    { headerName: 'Min Down(Mbps)', field: 'minPeakDsRate' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageSubscriberRateComponent],
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
      customTranslateService = TestBed.inject(CustomTranslateService);
      fixture = TestBed.createComponent(AverageSubscriberRateComponent);
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
    spyOn(component, 'getDataCount').and.callThrough();
    component.loadChartData(params);
    expect(component.runClicked).toBeTrue();
    expect(component.getDataCount).toHaveBeenCalled();
  });

  it('should get the table data', () => {
    spyOn(component, 'renderTable').and.callThrough();
    component.filters = params;
    component.getDataCount(false);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(AverageSubscriberRate);
    expect(component.tableData[1].subscriber).toMatch("user-radius6");
    expect(component.renderTable).toHaveBeenCalledTimes(1);
  });

  it('should get the table data with error', () => {
    component.filters = params;
    component.getDataCount(false);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
    expect(component.loading).toBeFalse();
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

  it('bytesToMegaBytes and getGranularity and makeIsoDateZero', () => {
    component.bytesToMegaBytes(7891237);
    component.getGranularity(new Date(), new Date());
    component.getGranularity(new Date(), (new Date().setDate(new Date().getDate() + 45)));
    component.makeIsoDateZero('2022-11-08T00:00:00Z');
  });

  it('downloadCSV and downloadPdf and convertBytes', () => {
    component.exportData = AverageSubscriberRate;
    component.filters = params;
    component.columnDefs = columnDefs;
    component.downloadCSV();
    component.downloadPdf();

    component.exportData = [];
    component.downloadCSV();
    component.downloadPdf();
  });

  it('get all Data', () => {
    spyOn(locationReportService, 'getData').and.returnValue(of(AverageSubscriberRate))
    component.filters = params;
    component.columnDefs = columnDefs;
    component.getAllData(true);
    expect(component.exportData).toEqual(AverageSubscriberRate);
    component.getAllData(false);
  });

  it('get all Data with error', () => {
    spyOn(locationReportService, 'getData').and.returnValue(throwError({error: {title: 'defined'}}))
    component.filters = params;
    component.columnDefs = columnDefs;
    component.exportData = [];
    component.getAllData(true);
  });

});
