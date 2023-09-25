import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { MonthlyUsageByService } from 'src/assets/mockdata/cco/traffic/locaion/reports.data';
import { MonthlyUsageByServiceChartOptions } from 'src/assets/mockdata/cco/traffic/shared/chartOptions.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { LocationReportApiService } from '../../reports/location-report-api.service';

import { MonthlyUsageByserviceCategoryComponent } from './monthly-usage-byservice-category.component';

describe('MonthlyUsageByserviceCategoryComponent', () => {
  let component: MonthlyUsageByserviceCategoryComponent;
  let fixture: ComponentFixture<MonthlyUsageByserviceCategoryComponent>;
  let locationReportService: LocationReportApiService;
  let customTranslateService: CustomTranslateService
  let optionsService: ChartOptionsService;
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
    { headerName: 'Month', field: 'startPeriodSec' },
    { headerName: 'Group Name', field: 'key' },
    { headerName: 'Down Usage(GB)', field: 'dsOctets' },
    { headerName: 'Up Usage(GB)', field: 'usOctets' },
    { headerName: 'Total Usage(GB)', field: 'totalOctets' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyUsageByserviceCategoryComponent],
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
        optionsService = TestBed.inject(ChartOptionsService);
        fixture = TestBed.createComponent(MonthlyUsageByserviceCategoryComponent);
        component = fixture.componentInstance;
        (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    component.filters = params;
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

  it('should render the chart', () => {
    spyOn(locationReportService, 'getMonthlyUsageByService').and.returnValue(of(MonthlyUsageByService))
    spyOn(optionsService, 'monthlyUsageByServiceChartOptions').and.returnValue(MonthlyUsageByServiceChartOptions);
    spyOn(component, 'renderTable');
    component.loadChartData(params);
    expect(component.data).toBeTruthy("No data available");
    expect(component.data[1].startPeriodSec).toMatch('1659312000');
    expect(component.renderTable).toHaveBeenCalled();
    expect(component.monthlyUsageByServiceChartOptions.title.text).toMatch("Monthly Usage By Service Category");
  });

  it('should render the chart with error', () => {
    spyOn(locationReportService, 'getMonthlyUsageByService').and.returnValue(throwError({ error: 'undefined' }))
    component.loadChartData(params);
    expect(component.renderOnce).toBeTrue();
  });

  it('should re-render the chart', () => {
    spyOn(optionsService, 'monthlyUsageByServiceChartOptions').and.returnValue(MonthlyUsageByServiceChartOptions);
    component.filters = params;
    component.renderChart();
    expect(component.monthlyUsageByServiceChartOptions).toBeTruthy("Could not find the chart options");
    expect(component.monthlyUsageByServiceChartOptions.title.text).toMatch("Monthly Usage By Service Category");
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

  it('convertByteToGB and makeIsoDateZero', () => {
    component.makeIsoDateZero('2022-11-08T00:00:00Z')
    component.convertByteToGB(7891237);
    component.convertByteToGB(null);
  });

  it('downloadCSV and downloadPdf and convertBytes', () => {
    component.exportData = MonthlyUsageByService;
    component.filters = params;
    component.columnDefs = columnDefs;
    component.downloadCSV();
    // component.downloadPdf();

    component.exportData = [];
    component.downloadCSV();
    // component.downloadPdf();
  });

  it('get all Data', () => {
    spyOn(locationReportService, 'getMonthlyUsageByService').and.returnValue(of(MonthlyUsageByService))
    component.filters = params;
    component.columnDefs = columnDefs;
    component.getAllData(false);
  });

  it('get all Data with error', () => {
    spyOn(locationReportService, 'getMonthlyUsageByService').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.filters = params;
    component.columnDefs = columnDefs;
    component.exportData = [];
    component.getAllData(false);
  });

});
