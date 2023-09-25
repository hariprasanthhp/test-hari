import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DevicesNamePlaceholderComponent } from './devices-name-placeholder.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { DevicesStatusComponent } from 'src/app/flow-config/network/devices/devices-status/devices-status.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Options, OptionsStackingValue, OptionsZoomTypeValue } from 'highcharts';
import { AlignValue } from 'highcharts';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Highcharts from 'highcharts';
import { NetworkDevicesApiService } from 'src/app/flow-config/services/network-devices-api.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { apiData, chartOptions, packetTimingchartData } from 'src/assets/mockdata/admin/deviceplaceholder/device-placeholder.data';
import { Schemas } from 'aws-sdk';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Option } from 'aws-sdk/clients/rds';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SysAdminModule } from '../sys-admin.module';

describe('DevicesNamePlaceholderComponent', () => {
  let component: DevicesNamePlaceholderComponent;
  let fixture: ComponentFixture<DevicesNamePlaceholderComponent>;
  let commonOrgService: CommonService;
  let titleService: Title;
  let router: Router;
  let sso: SsoAuthService;
  let translateService: TranslateService;
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
        CalendarModule,
        AppRoutingModule,
        SysAdminModule
      ],
      declarations: [DevicesNamePlaceholderComponent],
      providers: [
        TranslateService,DatePipe
      ],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents().then(()=>{
      translateService = TestBed.inject(TranslateService);
      commonOrgService = TestBed.inject(CommonService);
      titleService = TestBed.inject(Title);
      router = TestBed.inject(Router);
      sso = TestBed.inject(SsoAuthService);
      networkDeviceApiService = TestBed.inject(NetworkDevicesApiService);
      fixture = TestBed.createComponent(DevicesNamePlaceholderComponent);
      component = fixture.componentInstance;
      let eng = new EnglishJSON;
      translateService?.selectedLanguage.next(of(eng));
      component.language = eng;
      fixture.detectChanges();
    })
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    commonOrgService = TestBed.inject(CommonService);
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
    sso = TestBed.inject(SsoAuthService);
    spyOn(router, 'navigate');
    component.endDate = ''; 

  });
 
  

  it('should initialise', () => {
    
    let eng = new EnglishJSON;
    translateService?.selectedLanguage.next(of(eng));
    component.language = eng;
    fixture.detectChanges(); 
    component.ngOnInit();
    fixture.detectChanges(); 

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to device status page', () => {
    component.routeToDeviceStatus();
    expect(router.navigate).toHaveBeenCalledWith([
      `${component.MODULE}/flowAnalyze/network/devices/devices-status`,
    ]);
  });
  it('should handle 400 error status', () => {
    const errorResponse: HttpErrorResponse = { status: 400 } as HttpErrorResponse;
    spyOn(component.commonOrgService, 'pageInvalidRqstErrorHandle').and.returnValue('Invalid request error');
    spyOn(component, 'openInfoModal');
    component.pageErrorHandle(errorResponse);
  
  });

  it('handle 417 error status without error message', () => {
    const errorResponse: HttpErrorResponse = { status: 417 } as HttpErrorResponse;
    spyOn(component.commonOrgService, 'pageInvalidRqstErrorHandle');
    spyOn(component, 'openInfoModal');
    component.pageErrorHandle(errorResponse);
  });
  it('handle 417 error status with error message', () => {
    const errorResponse: HttpErrorResponse = { status: 417, error: { message: 'Custom error message' } } as HttpErrorResponse;
    spyOn(component.commonOrgService, 'pageInvalidRqstErrorHandle');
    spyOn(component, 'openInfoModal');
    component.pageErrorHandle(errorResponse);
  });
  it(' handle 401 error status', () => {
    const errorResponse: HttpErrorResponse = { status: 401 } as HttpErrorResponse;
    spyOn(component.commonOrgService, 'pageErrorHandle').and.returnValue('Access Denied');
    spyOn(component.commonOrgService, 'openErrorAlert');
    spyOn(component.commonOrgService, 'pageScrollTop');
    component.pageErrorHandle(errorResponse);

  });

  it(' create chart options correctly', () => {
    const apiResponse = {
      metricSeries: [
        {
          metricName: 'metric1',
          metricValues: [
            { time: 1624023078432, value: 10 },
            { time: 1624023079432, value: 20 },
          ],
        },
        {
          metricName: 'metric2',
          metricValues: [
            { time: 1624023078432, value: 5 },
            { time: 1624023079432, value: 15 },
          ],
        },
      ],
    };

    const datePipe = TestBed.inject(DatePipe);
    spyOn(datePipe, 'transform').and.returnValue('formattedDate');

    const options = component.makeOptionsForLineChart(apiResponse);

  });
  it(' create correct chart options', () => {
    const apiResponse = apiData
    const datePipe = TestBed.inject(DatePipe);
    spyOn(datePipe, 'transform').and.returnValue('formattedDate');

    component.makeOptionsForLineChart(apiResponse);

  });
  it(' clear requestPayload.endDate when event  not provided', () => {
    component.onSelectEndTime(null);

    expect(component.requestPayload.endDate).toEqual('');
  });
    
  it('should set endDate and maxStartDate', fakeAsync(() => {
    const event = new Date('2023-06-18');
    const expectedMaxStartDate = new Date('2023-06-17').getTime() / 1000; 
    const expectedEndDate = Math.floor(event.getTime() / 1000);
  
    component.onSelectEndTime(event);
  
    tick();  
    // expect(component.maxStartDate.getTime() / 1000).toEqual(expectedMaxStartDate);
  }));
    it('should call the API and display the chart ', () => {
    const startDate = '2023-06-18';
    const endDate = '2023-06-19';
    const apiResponse = apiData;
    const expectedOptions = chartOptions;

    spyOn(component, 'makeOptionsForLineChart').and.returnValue(expectedOptions);
    spyOn(networkDeviceApiService, 'DeviceMatricSeries').and.returnValue(of(apiResponse));

    component.startDate = startDate;
    component.endDate = endDate;
    component.getDecodeFlowCount();
    expect(component.show.loading).toBeFalse();
    expect(component.show.chart).toBeFalse();
   
  });
  
  it('update the chart', () => {
    component.requestPayload = {
      startDate: '2023-07-01', 
      endDate: '2023-07-05' 
    };
    spyOn(component, 'openInfoModal');
    spyOn(component.commonOrgService, 'closeAlert');
    spyOn(component.networkDeviceApiService, 'DeviceMatricSeries').and.returnValue(
      of({ // Use 'of' to create an Observable
        metricSeries: [] 
      })
    );
    spyOn(component.Highcharts, 'chart');
  
    component.getDecodeFlowCount();
  
    expect(component.openInfoModal).not.toHaveBeenCalled();
    expect(component.commonOrgService.closeAlert).toHaveBeenCalled();
    expect(component.activeTab).toBe('decodeFlowCountGraph');
    expect(component.show.loading).toBe(false);
    expect(component.networkDeviceApiService.DeviceMatricSeries).toHaveBeenCalledWith(
      component.deviceIp,
      component.requestPayload.startDate,
      component.requestPayload.endDate,
      component.ORG_ID
    );
    expect(component.show.loading).toBe(false);
    expect(component.Highcharts.chart).toHaveBeenCalled();
  });

  it('should call the necessary methods when startDate is missing', () => {
    component.requestPayload = {
      startDate: null, 
      endDate: '2023-07-05'
    };
    spyOn(component, 'openInfoModal');
    spyOn(component.commonOrgService, 'closeAlert');
    spyOn(component.networkDeviceApiService, 'DeviceMatricSeries');
    spyOn(component.Highcharts, 'chart');
  
    component.getDecodeFlowCount();
  
    expect(component.openInfoModal).toHaveBeenCalled();
    expect(component.commonOrgService.closeAlert).not.toHaveBeenCalled();
    expect(component.activeTab).toBe('');
    expect(component.show.loading).toBe(true);
    expect(component.networkDeviceApiService.DeviceMatricSeries).not.toHaveBeenCalled();
    expect(component.Highcharts.chart).not.toHaveBeenCalled();
    expect(component.infoTitle).toBe(component.language['Invalid request']);
    expect(component.infoBody).toBe(component.language['Start date required']);
  });
  it('should display an error message when the API request fails', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });
  
    spyOn(networkDeviceApiService, 'DeviceMatricSeries').and.returnValue(throwError(errorResponse));
    spyOn(component, 'pageErrorHandle');
  
    component.requestPayload.startDate = '2023-06-18';
    component.requestPayload.endDate = '2023-06-19';
    component.getDecodeFlowCount();
  
    expect(component.show.loading).toBeFalse();
    expect(component.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
  });
 
  
  it('routing to decodeFlowCount', () => {
    component.activeTab = 'someOtherTab';
  
    spyOn(component, 'configureDate');
    spyOn(component, 'onSelectStartTime');
    spyOn(component, 'onSelectEndTime');
    spyOn(component, 'getDecodeFlowCount');
    spyOn(component, 'setPageTitle');
  
    component.routeToDecodeFlowCount();
  
    expect(component.configureDate).toHaveBeenCalled();
    expect(component.onSelectEndTime).toHaveBeenCalledWith(component.endDate);
    expect(component.getDecodeFlowCount).toHaveBeenCalled();
    expect(component.setPageTitle).toHaveBeenCalled();
  });
  it('should return  message when entry is provided', () => {
    const entry = {
      total_count: 100,
      missing: 20,
      invalids: 10,
      minval: 0.1,
      maxval: 0.1
    };
  
    const result = component.on_one_entry(entry);
  
  });
  
  
  it('should return an empty string  is not provided', () => {
    const entry = null;
  
    const result = component.on_one_entry(entry);
  
    expect(result).toBe('');
  });
  it('should format the tooltip correctly', () => {
    const x = '2023-07-13 12:00:00';
    const seriesLabel = 'virtualPacketRate';
    const seriesName = 'Packet Rate';
    const y = 1000;
  
    const result = component.formatTooltip(x, seriesLabel, seriesName, y);
  
    expect(result).toBe('<b>2023-07-13 12:00:00</b><br><b>Packet Rate: 1 Kpps</b>');
  });
  
  it('should format bytes correctly', () => {
    let bits = 1024;
    let result = component.formatBytes(bits);
    expect(result).toBe('1.02 Kbps');
  
    bits = 1024 * 1024 * 2.5;
    result = component.formatBytes(bits, 1);
    expect(result).toBe('2.6 Mbps');
  
    bits = 1024 * 1024 * 1024 * 3.7;
    result = component.formatBytes(bits, 3);
    expect(result).toBe('3.973 Gbps');
  
    bits = 0;
    result = component.formatBytes(bits);
    expect(result).toBe('0 bps');
  });
  it('should return the correct time scale', () => {
    let timeScale  = [
      { input: 50000, expected: { value: '50.0', name: 'Seconds', short: 'Seconds' } },
      { input: 150000, expected: { value: '2.5', name: 'Minutes', short: 'Minutes' } },
      { input: 9000000, expected: { value: '2.5', name: 'hours', short: 'hours' } },
      { input: 259200000, expected: { value: '3.0', name: 'days', short: 'd' } },
    ];

    timeScale.forEach((timeScale) => {
      const result = component.time_scale(timeScale.input);
    });
  });

  it('should expand the duration chart when flag is true and false', () => {
    component.show.durationFullChart = false;
    component.show.delayFullChart = false;
    component.show.fullChart = false;
    component.language = component.translateService.defualtLanguage;
    component.packetTimingData = {
      duration: {
        seconds: {} 
      },
      delay: {
        seconds: {} 
      }
    };
  
    component.expandDurationChart(true);
  
    expect(component.show.durationFullChart).toBe(false);
    expect(component.show.delayFullChart).toBe(true);
    expect(component.show.fullChart).toBe(true);
  
    const durationExpandElement = document.getElementById('duration_expand');
    expect(durationExpandElement.style.display).toBe('block');
  
    const durationCollapsElement = document.getElementById('duration_collaps');
    expect(durationCollapsElement.style.display).toBe('none');
  
    const delayCollapsElement = document.getElementById('delay_collaps');
    expect(delayCollapsElement.style.display).toBe('none');
  
    const delayExpandElement = document.getElementById('delay_expand');
    expect(delayExpandElement.style.display).toBe('none');
  
    component.expandDurationChart(false);
  
    expect(component.show.durationFullChart).toBe(false);
    expect(component.show.delayFullChart).toBe(false);
    expect(component.show.fullChart).toBe(false);
  
    expect(durationExpandElement.style.display).toBe('none');
    expect(durationCollapsElement.style.display).toBe('block');
    expect(delayCollapsElement.style.display).toBe('block');
    expect(delayExpandElement.style.display).toBe('none');
  });
  
  it('should expand the delay chart when flag is true and false', () => {
    component.show.durationFullChart = false;
    component.show.delayFullChart = false;
    component.show.fullChart = false;
    component.language = component.translateService.defualtLanguage;
    component.packetTimingData = {
      duration: {
        seconds: {} 
      },
      delay: {
        seconds: {} 
      }
    };
  
    component.expandDelayChart(true);
  
    expect(component.show.durationFullChart).toBe(true);
    expect(component.show.delayFullChart).toBe(false);
    expect(component.show.fullChart).toBe(true);
  
    const durationExpandElement = document.getElementById('duration_expand');
    expect(durationExpandElement.style.display).toBe('none');
  
    const durationCollapsElement = document.getElementById('duration_collaps');
    expect(durationCollapsElement.style.display).toBe('none');
  
    const delayCollapsElement = document.getElementById('delay_collaps');
    expect(delayCollapsElement.style.display).toBe('none');
  
    const delayExpandElement = document.getElementById('delay_expand');
    expect(delayExpandElement.style.display).toBe('block');
  
    component.expandDelayChart(false);
  
    expect(component.show.durationFullChart).toBe(false);
    expect(component.show.delayFullChart).toBe(false);
    expect(component.show.fullChart).toBe(false);
  
    expect(durationExpandElement.style.display).toBe('none');
    expect(durationCollapsElement.style.display).toBe('block');
    expect(delayCollapsElement.style.display).toBe('block');
    expect(delayExpandElement.style.display).toBe('none');
  });
  
  it('should hide the packet timing graph', () => {
    component.show.fullChart = true;
    component.show.delayFullChart = false;
    component.show.durationFullChart = false;
    component.show.durationShortChart = true;
    component.show.delayShortChart = true;
  
    component.hidePacketTimingGraph();
  
    expect(component.show.fullChart).toBe(false);
    expect(component.show.delayFullChart).toBe(true);
    expect(component.show.durationFullChart).toBe(true);
    expect(component.show.durationShortChart).toBe(false);
    expect(component.show.delayShortChart).toBe(false);
  });

it('should retrieve packet timing data and load the chart', () => {
  const tabName = 'seconds';
  const isRefresh = false;

  const mockResponse =  packetTimingchartData;
    spyOn(networkDeviceApiService, 'GetPacketTimingData').and.callFake((deviceIp: string, orgId: any): Observable<any> => {
      return of(mockResponse);
    });
    
  component.activeTab = 'decodeFlowCountGraph';
  component.packetTimingData = {};

  component.getPacketTimingData(tabName, isRefresh);

  expect(component.activeTab).toBe('packetTimingGraph');
  expect(component.show.loading).toBe(false);
});

it('destroy',fakeAsync(()=>{
  component.languageSub = new BehaviorSubject({});
  component.getDeviceMetricSeriesSub = new BehaviorSubject({});

  fixture.detectChanges();
  component.ngOnDestroy();
  expect(component).toBeTruthy();
}));
it('should update properties  when event is provided', () => {
  const mockStartDate = new Date('2023-08-01T00:00:00'); 
  const mockEndDateFlag = true;

  component.onSelectStartTime(mockStartDate, mockEndDateFlag);
});

it('should clear start date when event is not provided', () => {
  component.onSelectStartTime(null, true);

  expect(component.requestPayload.startDate).toBe('');
});


});
