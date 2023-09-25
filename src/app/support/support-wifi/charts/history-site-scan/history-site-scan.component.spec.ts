import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportWifiService } from '../../services/support-wifi.service';

import { HistorySiteScanComponent } from './history-site-scan.component';
import { wifiHistorySiteScanChartData } from 'src/assets/mockdata/support/support-wifi/charts';

describe('HistorySiteScanComponent', () => {
  let component: HistorySiteScanComponent;
  let fixture: ComponentFixture<HistorySiteScanComponent>;
  let supportWifiService: SupportWifiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorySiteScanComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService,
        SupportWifiService,
        CommonService,
      ]
    })
      .compileComponents()
      .then(() => {
        router = TestBed.inject(Router);
        supportWifiService = TestBed.inject(SupportWifiService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(HistorySiteScanComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        component.type = '5g';
        component.siteScanChannelSelected = {

        }
        component.siteScanSSIDSelected = {

        }
        fixture.detectChanges()
      });
  });


  // it('should initialized onInit()', () => {
  //   spyOn(component, 'siteScanData').and.callThrough(); 
  //   component.ngOnInit();
  //   // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
  //   expect(component.siteScanData).toHaveBeenCalled();
  //   expect(component.siteScanData).toHaveBeenCalledTimes(1);
  // })

  it('Load History Site Scan check', () => {
    //spyOn(supportWifiService, 'getAirtimeAnalysis').and.returnValue(of(wifiRGAirTimeMockData));
    spyOn(component, 'siteScanData').and.callThrough();
    component.siteScanData(wifiHistorySiteScanChartData, '5g');
    component.chartData = wifiHistorySiteScanChartData;
    // console.log(component.chartData)
    fixture.detectChanges();
    expect(component.chartData).toBeTruthy("No data available");  
  })
});
