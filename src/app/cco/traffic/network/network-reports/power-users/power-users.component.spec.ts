import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { PowerUser } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { NetworkReportApiService } from '../../reports/network-report-api.service';

import { PowerUsersComponent } from './power-users.component';

describe('PowerUsersComponent', () => {
  let component: PowerUsersComponent;
  let fixture: ComponentFixture<PowerUsersComponent>;
  let networkReportService: NetworkReportApiService;
  let customTranslateService: CustomTranslateService
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

  let columnDefs = [
    { headerName: 'Subscriber', field: 'name' },
    { headerName: 'maxRate' + '(bps)', field: 'maxBps' },
    { headerName: 'hitCount', field: 'hitCount' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerUsersComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DataTablesModule
      ],
      providers: [
        CustomTranslateService, 
        SsoAuthService, 
        CommonService, 
        CommonFunctionsService, 
        NetworkReportApiService, 
        ExportExcelService, 
        ChartOptionsService
      ]
    })
      .compileComponents()
      .then(() => {
        networkReportService = TestBed.inject(NetworkReportApiService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        fixture = TestBed.createComponent(PowerUsersComponent);
        component = fixture.componentInstance;
    });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.filters = params;
    component.data = PowerUser;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });
  

  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert');
    component.ngOnInit();
    
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    expect(component.closeAlert).toHaveBeenCalled();
  })

  it('should call the get data method', () => {
    spyOn(component, 'getData').and.callThrough();
    component.loadChartData(params);
    expect(component.startEndDates).toBeTruthy("No data available");
    expect(component.getData).toHaveBeenCalledTimes(1);
  });

  it('should get the table data', () => {
    spyOn(networkReportService, 'getPowerUsers').and.returnValue(of(PowerUser))
    spyOn(component, 'renderTable').and.callThrough();
    component.getData(false);
    expect(component.tableData).toBeTruthy("No data available");
    expect(component.tableData.length).toBe(2, "Length is wrong");
    expect(component.renderTable).toHaveBeenCalledTimes(1);
  });

  it('should get the table data1', () => {
    spyOn(networkReportService, 'getPowerUsers').and.returnValue(throwError({error: {title: 'defined'}}))
    spyOn(component, 'renderTable').and.callThrough();
    component.getData(false);
    expect(component.renderTable).toHaveBeenCalled();
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

  it('downloadCSV and downloadPdf and convertBytes', () => {
    component.exportData = PowerUser;
    component.filters = params;
    component.columnDefs = columnDefs;
    component.downloadCSV();
    component.downloadPdf();

    component.exportData = [];
    component.downloadCSV();

    component.convertBytes(7891237);
  });

});




