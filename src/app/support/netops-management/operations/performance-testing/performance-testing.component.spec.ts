import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { cafIITestList } from 'src/assets/mockdata/support/netops-management/operations/performance-testing/performance.data';

import { PerformanceTestingComponent } from './performance-testing.component';
import { PerformanceServiceService } from './performance-testing.service';

describe('PerformanceTestingComponent', () => {
  let component: PerformanceTestingComponent;
  let fixture: ComponentFixture<PerformanceTestingComponent>;
  let performanceService: PerformanceServiceService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceTestingComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService, PerformanceServiceService, CommonService, DownloadService, DateUtilsService, WindowRefService, Title
      ]
    })
      .compileComponents().then(() => {
        performanceService = TestBed.inject(PerformanceServiceService);
        fixture = TestBed.createComponent(PerformanceTestingComponent);
        component = fixture.componentInstance;
        component.orgId = "470053";
        component.hasWriteAccess = true;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PerformanceTestingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get performance list data', () => {
    spyOn(performanceService, 'GetPerformanceDataGrid').and.returnValue(of(cafIITestList));
    spyOn(component, 'GetPerformanceDataGrid').and.callThrough();
    component.GetPerformanceDataGrid();
    fixture.detectChanges();
    expect(component.performanceDataGrid?.length).toBe(2, "Length is wrong");
    expect(component.performanceDataGrid[0]?.name).toMatch("margo-CCL-48793-CXNK00AFB8AB-24hrs-7.23-4th");
    expect(component.GetPerformanceDataGrid).toHaveBeenCalled();
    expect(component.GetPerformanceDataGrid).toHaveBeenCalledTimes(1);
  });

  it('should delete performance data', () => {
    component.deleteId = "ff6f8fdb-e1df-4c38-a019-e06c21584bc1"
    spyOn(performanceService, 'delete').and.returnValue(of(cafIITestList));
    spyOn(component, 'doDeleteTest').and.callThrough();
    component.doDeleteTest();
    fixture.detectChanges();
    expect(component.btnDisabled).toBe(false);
    expect(component.doDeleteTest).toHaveBeenCalled();
    expect(component.doDeleteTest).toHaveBeenCalledTimes(1);
  });
});
