import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { apiUsageChartOptions, last6MonthsData, quotaValues } from 'src/assets/mockdata/admin/apiusage/apiusage.data';
import { ApiUsageService } from '../services/api-usage.service';
import { CommonService } from '../services/common.service';
import { of } from "rxjs";
import { ApiUsageComponent } from './api-usage.component';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('ApiUsageComponent', () => {
  let component: ApiUsageComponent;
  let fixture: ComponentFixture<ApiUsageComponent>;
  let router: Router;
  let service: ApiUsageService;
  let languageService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiUsageComponent],
      providers: [TranslateService, Title, SsoAuthService, ApiUsageService, CommonService, NgbModal],
      imports: [RouterTestingModule, HttpClientTestingModule, DataTablesModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUsageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(ApiUsageService)
    languageService = TestBed.inject(TranslateService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'getData').and.callThrough()
    spyOn(component, 'getApiUsageQuota').and.callThrough()
    component.ngOnInit()
    expect(component.getData).toHaveBeenCalled()
    expect(component.getApiUsageQuota).toHaveBeenCalled()
  });

  it('should getApiUsageQuota Details', () => {
    spyOn(service, 'getaApiQuotaDetails').and.returnValue(of(quotaValues))
    spyOn(component, 'getApiUsageQuota').and.callThrough()
    component.getApiUsageQuota()
    expect(component.apiUsageData).toBeTruthy('value is not matched')
    expect(component.apiUsageData).toBe(quotaValues, 'value mismatched')
    expect(component.getApiUsageQuota).toHaveBeenCalled()
  });

  it('should getOrgUsageStatus Details', () => {
    spyOn(service, 'getOrgUsageStatus').and.returnValue(of(last6MonthsData))
    component.Highcharts.chart('container', apiUsageChartOptions)
    spyOn(component, 'getData').and.callThrough()
    spyOn(component, 'makeOptionsForLineChart').and.callThrough()
    component.getData()
    expect(component.tableData).toBeTruthy('value is not matched')
    expect(component.tableData.length).toBeGreaterThan(1)
    expect(component.getData).toHaveBeenCalled()
    expect(component.makeOptionsForLineChart).toBeTruthy('chart option not matched')
    expect(component.makeOptionsForLineChart).toHaveBeenCalled()
    expect(component.makeOptionsForLineChart).toHaveBeenCalledTimes(1)
  });

  it('should handle error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    // *** commented because 'errorMessage' varaible no longer exists *** //
    // expect(component.errorMessage).toMatch("Access Denied"); // remove later
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
