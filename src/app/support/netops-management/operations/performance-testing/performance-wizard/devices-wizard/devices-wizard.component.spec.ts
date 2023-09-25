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
import { cafIITestList, deviceCafCapabilityData } from 'src/assets/mockdata/support/netops-management/operations/performance-testing/performance.data';
import { PerformanceServiceService } from '../../performance-testing.service';
import { DevicesWizardComponent } from './devices-wizard.component';


describe('DevicesWizardComponent', () => {
  let component: DevicesWizardComponent;
  let fixture: ComponentFixture<DevicesWizardComponent>;
  let performanceService: PerformanceServiceService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesWizardComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService, PerformanceServiceService, CommonService, DownloadService, DateUtilsService, WindowRefService, Title
      ]
    }).compileComponents().then(() => {
      performanceService = TestBed.inject(PerformanceServiceService);
      fixture = TestBed.createComponent(DevicesWizardComponent);
      component = fixture.componentInstance;
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
  it('should get cafCapability data', () => {
    let orgId = 470053;
    let deviceSn = "CXNK01000D69"
    component.deviceData = ["CXNK01000D69"];
    component.inputData = {
      verifyDevice: false
    }
    spyOn(performanceService, 'checkdeviceCafCapabilityBySN').and.returnValue(of(deviceCafCapabilityData));
    spyOn(component, 'addDevices').and.callThrough();
    component.addDevices();
    fixture.detectChanges();
    console.log(component.protocols);

    expect(component.protocols?.length).toBe(1, "Length is wrong");
    expect(component.protocols[0]).toMatch("Ookla");

    expect(component.addDevices).toHaveBeenCalled();
    expect(component.addDevices).toHaveBeenCalledTimes(1);
  });


});
