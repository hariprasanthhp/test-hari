import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { unassociatedDeviceData } from 'src/assets/mockdata/support/support-traffic-reports/reports.data';
import { DataServiceService } from '../../data.service';

import { UnassociatedDevicesComponent } from './unassociated-devices.component';
import { UnassociateddevicesService } from './unassociateddevices.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { Router } from '@angular/router';

describe('UnassociatedDevicesComponent', () => {
  let component: UnassociatedDevicesComponent;
  let fixture: ComponentFixture<UnassociatedDevicesComponent>;
  let unassociateddevice: UnassociateddevicesService;
  let translateService: TranslateService;
  let router: Router;

  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/' };


   beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnassociatedDevicesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TranslateService, UnassociateddevicesService, SsoAuthService, DateUtilsService,
        DataServiceService, CommonService, Title,WindowRefService,
        { provide: Router, useValue: mockUrl },]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        unassociateddevice = TestBed.inject(UnassociateddevicesService);
        fixture = TestBed.createComponent(UnassociatedDevicesComponent);
        component = fixture.componentInstance;
      });
      router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassociatedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('unassociatedDevices onInit()', () => {
    spyOn(component, 'getDeviceCount').and.callThrough();
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
      
    })
    component.ngOnInit();
    component.getDeviceCount();
    expect(component.getDeviceCount).toBeTruthy();
    fixture.detectChanges();
  });
  it('should render the table', () => {
    component.ngOnInit();
    spyOn(unassociateddevice, 'getUnassociatedDeviceData').and.returnValue(of(unassociatedDeviceData))
    component.getDevices();
    expect(component.unassociatedDeviceData).toBeTruthy("No data available");
    expect(component.unassociatedDeviceData.length).toBe(2, "Length is wrong");
    expect(component.unassociatedDeviceData[0].serialNumber).toMatch('CXNK008A7961');
  });

  it('should downloadUnassociatedSysReport', () => {
    spyOn(component, 'downloadUnassociatedSysReport').and.callThrough()
    component.downloadUnassociatedSysReport()
    expect(component.downloadUnassociatedSysReport).toHaveBeenCalled()
  });
 
});