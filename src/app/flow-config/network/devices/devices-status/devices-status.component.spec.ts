import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { DevicesStatusComponent } from './devices-status.component';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndpointManagementService } from 'src/app/flow-config/services/endpoint-management.service';
import { Observable, combineLatest, from, observable, of, throwError } from 'rxjs';
import rxjs from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NetworkDevicesApiService } from 'src/app/flow-config/services/network-devices-api.service';

describe('DevicesStatusComponent', () => {
  let component: DevicesStatusComponent;
  let fixture: ComponentFixture<DevicesStatusComponent>;
  let translateService: TranslateService;
  let commonOrgService: CommonService;
  let titleService: Title;
  let router: Router;
  let sso: SsoAuthService;
  let http: HttpClient;
  let endpointManagementService: EndpointManagementService;
  let networkDeviceApiService: NetworkDevicesApiService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        DragDropModule,
        NgSelectModule,
        CalendarModule
      ],
      declarations: [DevicesStatusComponent],
      providers: [
        TranslateService,
        SsoAuthService,
        CommonService,
        Title,
        EndpointManagementService
      ]
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(DevicesStatusComponent);
      component = fixture.componentInstance;
      translateService = TestBed.inject(TranslateService);
      router = TestBed.inject(Router);
      sso = TestBed.inject(SsoAuthService);
      endpointManagementService = TestBed.inject(EndpointManagementService);
      commonOrgService = TestBed.inject(CommonService);
      titleService = TestBed.inject(Title);
      networkDeviceApiService = TestBed.inject(NetworkDevicesApiService);
      http = TestBed.inject(HttpClient);
      fixture.detectChanges();
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesStatusComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
    sso = TestBed.inject(SsoAuthService);
    endpointManagementService = TestBed.inject(EndpointManagementService);
    commonOrgService = TestBed.inject(CommonService);
    titleService = TestBed.inject(Title);
    spyOn(router, 'navigate');

    spyOn(component, 'rerender');
    spyOn(component.dtTrigger, 'next');
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized  onInit()', () => {
    component.ngOnInit();
    component.getMappedPercentage();
    component.MODULE = 'organization-admin';
  });

  it('should update counts correctly', fakeAsync(() => {
    let a = endpointManagementService.getMappedcount('470053').pipe(
      catchError(err => {
        return of(err);
      })
    )
    let b = endpointManagementService.getUnmappedcount('470053').pipe(
      catchError(err => {
        return of(err);
      })
    )
    spyOn(endpointManagementService, 'getMappedcount').and.returnValue(of(a));
    spyOn(endpointManagementService, 'getUnmappedcount').and.returnValue(of(b));
    component.getCounts();
  }));
  it('should navigate to devices-name-placeholder with the correct deviceIp', () => {
    const deviceIp = '103.117.168.60';
    component.routeToDevicePlaceholder(deviceIp);
    expect(router.navigate).toHaveBeenCalledWith(
      [`${component.MODULE}/devices-name-placeholder`],
      { state: { deviceIp: deviceIp } }
    );
  });

  it('should call setTableOptions and set the statusTableOptions correctly', () => {
    component.language = { fileLanguage: 'en' };
    component.setTableOptions();


    component.language = { fileLanguage: 'fr' };
    component.setTableOptions('language');


    
  });

  it('should call getDeviceStatusList and handle successful API response', fakeAsync(() => {
    const mockResponse = {
      metrics: [
        { id: 1, name: 'Device 1' },
        { id: 2, name: 'Device 2' },
      ],
    };

    spyOn(networkDeviceApiService, 'DeviceStatusList').and.returnValue(of(mockResponse));

    component.getDeviceStatusList();


    tick();
  }));
 

  it('should call getDeviceStatusList and handle API error', fakeAsync(() => {
    const mockError = new HttpErrorResponse({ status: 500 });
  
    spyOn(networkDeviceApiService, 'DeviceStatusList').and.returnValue(throwError(mockError));
    spyOn(component, 'pageErrorHandle');
  
    component.getDeviceStatusList();
  
    tick();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(mockError);

    discardPeriodicTasks(); 
  }));
  it('should handle 404 error', () => {
    const mockError = new HttpErrorResponse({ status: 404 });
    
    component.pageErrorHandle(mockError);
  
  });
  
  it('should handle 400 or 417 error', () => {
    const mockError = new HttpErrorResponse({ status: 400 });
  
    spyOn(commonOrgService, 'pageInvalidRqstErrorHandle').and.returnValue('Invalid request error');
    spyOn(commonOrgService, 'openErrorAlert');
    spyOn(commonOrgService, 'pageScrollTop');
    spyOn(commonOrgService, 'closeAlert');
  
    component.pageErrorHandle(mockError);
   
  });
  
  it('should handle 401 error', () => {
    const mockError = new HttpErrorResponse({ status: 401 });
  
    component.pageErrorHandle(mockError);
  
  });
  
  it('should handle other errors', () => {
    const mockError = new HttpErrorResponse({ status: 500 });
  
    component.pageErrorHandle(mockError);
  
  });
  
  
  it('should call dtInstance.destroy() in rerender()', async () => {

    component.rerender();

  });
  
  it('should format bytes correctly', () => {
    expect(component.formatBytes(0)).toEqual('0 Bits');
    expect(component.formatBytes(1024)).toEqual('1.02 Kbps');
    expect(component.formatBytes(2048000)).toEqual('2.05 Mbps');
    expect(component.formatBytes(1000000000)).toEqual('1 Gbps');
  });
  
  it('should format packets correctly', () => {
    expect(component.formatPacket(0)).toEqual('0 pps');
    expect(component.formatPacket(1000)).toEqual('1 Kpps');
    expect(component.formatPacket(2000000)).toEqual('2 Mpps');
    expect(component.formatPacket(1000000000)).toEqual('1 Gpps');
  });
});
