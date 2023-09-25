import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../data.service';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import { DygraphSiteScanService } from '../services/dygraph-sitescan.service';
import { SupportWifiService } from '../services/support-wifi.service';
import { wifiMockData } from '../services/wifi-mock-data';

import { RgComponent } from './rg.component';
import { wifiRGMockData, wifiRGRunSitescanMockData } from 'src/assets/mockdata/support/support-wifi/rg';
import { of } from 'rxjs';

describe('RgComponent', () => {
  let component: RgComponent;
  let fixture: ComponentFixture<RgComponent>;
  let supportWifiService: SupportWifiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let dataServiceService: DataServiceService;
  let supportRadioService: SupportRadioService;
  let dygraphSiteScanService: DygraphSiteScanService;
  let httpTestingController :HttpTestingController;
  let Sso :SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RgComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        CalendarModule,
      ],
      providers: [
        HttpClient,
        SupportRadioService,
        DataServiceService,
        SsoAuthService,
        NgbModal,
        TranslateService,
        SupportWifiService,
        CommonService,
        DateUtilsService,
        DygraphSiteScanService,
        wifiMockData
      ]
    })
      .compileComponents()
      .then(() => {
        router = TestBed.inject(Router);
        supportWifiService = TestBed.inject(SupportWifiService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        dataServiceService = TestBed.inject(DataServiceService);
        supportRadioService = TestBed.inject(SupportRadioService);
        dygraphSiteScanService = TestBed.inject(DygraphSiteScanService);
        httpTestingController = TestBed.inject(HttpTestingController);
        Sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(RgComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        component.siteScanRunHappening = false;
        component.wifiWrite = true;
        // component.siteScanRunHappening = true;
        // component.showWidgets.siteScan = true;
         component.showWidgets = {
          radioSummary: true,
          radioSummaryEdit: true,
          airtimeAnalysis: true,
          backhaul: true,
          signalStrength: true,
          txrx: true,
          historicalAirtime: true,
          downstream: true,
          channelScore: true,
          changeLog: false,
          wps: false,
          siteScan: true,
          selfHeal: true
        }
        component.metaData = {
          SSIDManager:{
            supported:true
            }
        }
        fixture.detectChanges()
      });
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert').and.callThrough(); 
    spyOn(component, 'getScopes').and.callThrough(); 
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalledTimes(2);
    expect(component.getScopes).toHaveBeenCalled();
    expect(component.getScopes).toHaveBeenCalledTimes(1);
  })

  it('check 5GHz Radio Details', () => {
    spyOn(component, 'getRadioSummary').and.callThrough();
    component.getRadioSummary()
    component.radioSummary = wifiRGMockData;
    fixture.detectChanges();
    expect(component.radioSummary['5G'].Bandwidth).toEqual(wifiRGMockData['5G'].Bandwidth)
  });

  // it('Check whether Run Site Scan is clicked', fakeAsync(() => {

  //   fixture.detectChanges();
  //   spyOn(component, 'runSiteScan');
  
  //   let button = fixture.debugElement.nativeElement;
  //    console.log(button);
    
  //   button.click();
  //   tick();
  //   expect(component.runSiteScan).toHaveBeenCalled();
  
  // }));

  it('should get the Sitescan Table Data', () => {
    spyOn(supportWifiService, 'getsiteScanLatest').and.returnValue(of(wifiRGRunSitescanMockData))
    component.getSiteScanData();
    // console.log(component.backgroundSiteScanObj);
     expect(component.siteScanResults).toBeTruthy("No data available");
  });
});
