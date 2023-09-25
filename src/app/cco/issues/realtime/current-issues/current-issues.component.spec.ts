import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { IssueService } from '../../service/issue.service';
import { CurrentIssuesComponent } from './current-issues.component';
import { REGIONS } from 'src/assets/mockdata/cco/issues/service/regions';
import { LOCATIONS } from 'src/assets/mockdata/cco/issues/service/locations';
import { SYSTEMS } from 'src/assets/mockdata/cco/issues/service/systems';
import { ALARMS } from 'src/assets/mockdata/cco/issues/service/alarms'
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CurrentIssuesComponent', () => {
  let component: CurrentIssuesComponent;
  let fixture: ComponentFixture<CurrentIssuesComponent>;
  let issueService: IssueService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentIssuesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService, IssueService, CommonService, HttpClient, FormBuilder, ExportExcelService, Title, HistoryChartOptionsService]
    })
      .compileComponents()
      .then(() => {
        issueService = TestBed.inject(IssueService);
        fixture = TestBed.createComponent(CurrentIssuesComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
        (component as any).timerSubscription = { unsubscribe: () => { } };
      });
  });

  it('should get the regions data', () => {
    spyOn(issueService, 'getRegions').and.returnValue(of(REGIONS));
    component.regionsApiLoader();
    expect(component.regionsDataArray.length).toBe(2, "Length is wrong");
    // spyOn(component, 'renderTable').and.callThrough();
    // component.getData(false);
    // expect(component.tableData).toBeTruthy("No data available");
    // expect(component.tableData.length).toBe(2, "Length is wrong");
    // expect(component.renderTable).toHaveBeenCalledTimes(1);
  });

  it('should get the alarms data', () => {
    component.getAlarmNames();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(ALARMS);


    expect(component.alarmNames).toBeTruthy("Could not find the data");
    expect(component.alarmNames.length).toBeGreaterThan(1);
  });

  it('should get the locations data', () => {
    component.filtersForm.get('region').setValue(['region']);
    component.loadLocationValue(false);
    const req = httpTestingController.expectOne(request => {
      console.log("url: ", request.url);
      return true;
    });
    req.flush(LOCATIONS);


    expect(component.locationDataArray).toBeTruthy("Could not find the data");
    expect(component.locationDataArray.length).toBeGreaterThan(1);
  });

  it('should get the systems data', () => {
    component.filtersForm.get('region').setValue(['region']);
    component.filtersForm.get('location').setValue(['location']);
    component.filtersForm.get('system').setValue(['system']);
    component.loadSystemValue(false);
    const req = httpTestingController.expectOne(request => {
      console.log("url: ", request.url);
      return true;
    });
    req.flush(SYSTEMS);


    expect(component.locationDataArray).toBeTruthy("Could not find the data");
    expect(component.locationDataArray.length).toBe(1);
  });

  it('should clear the filters', () => {
    component.clearFilter();
    expect(component.filtersForm.get('limit').value).toBe(20);
  });

  it('should validate the region with value All', () => {
    component.filtersForm.get('region').setValue(['All', 'regionId']);
    const param = 'All';
    spyOn(component, 'validateRegion')
    component.validateRegion(param);
    expect(component.validateRegion).toHaveBeenCalledWith(param);
  });

  it('should validate the location with value All', () => {
    component.filtersForm.get('location').setValue(['All', 'locationId']);
    const param = 'All';
    spyOn(component, 'validateLocation')
    component.validateLocation(param);
    expect(component.validateLocation).toHaveBeenCalledWith(param);
  });

  it('should validate the system with value All', () => {
    component.filtersForm.get('system').setValue(['All', 'systemId']);
    const param = 'All';
    spyOn(component, 'validateSystem')
    component.validateSystem(param);
    expect(component.validateSystem).toHaveBeenCalledWith(param);
  });

  it('should validate the region with regionId', () => {
    component.filtersForm.get('region').setValue(['All', 'regionId']);
    const param = 'regionId';
    spyOn(component, 'validateRegion')
    component.validateRegion(param);
    expect(component.validateRegion).toHaveBeenCalledWith(param);
  });

  it('should validate the location with locationId', () => {
    component.filtersForm.get('location').setValue(['All', 'locationId']);
    const param = 'locationId';
    spyOn(component, 'validateLocation')
    component.validateLocation(param);
    expect(component.validateLocation).toHaveBeenCalledWith(param);
  });

  it('should validate the system with systemId', () => {
    component.filtersForm.get('system').setValue(['All', 'systemId']);
    const param = 'systemId';
    spyOn(component, 'validateSystem')
    component.validateSystem(param);
    expect(component.validateSystem).toHaveBeenCalledWith(param);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
