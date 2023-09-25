import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as Highcharts from 'highcharts';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { combineLatest, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DataServiceService } from 'src/app/support/data.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { alldataforchart, res1, res2, signalchart, steeringmock } from 'src/assets/mockdata/support/devices/signal-strength';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { SupportWifiService } from '../../services/support-wifi.service';

import { SignalStrengthComponent } from './signal-strength.component';
import { title } from 'process';
import { DataTablesModule } from 'angular-datatables';

describe('SignalStrengthComponent', () => {
  let component: SignalStrengthComponent;
  let fixture: ComponentFixture<SignalStrengthComponent>;
  let supportwifiservice: SupportWifiService;
  let wifichart: SupportWifiChartOptionsService;
  let commonservice: CommonService;
  let translateService: TranslateService;
  let httptestingcontroller: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalStrengthComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, DataTablesModule
      ],
      providers: [
        SupportWifiService,
        SupportWifiChartOptionsService,
        CommonService,
        TranslateService,
        DateUtilsService,
        DataServiceService,
      ]
    })
      .compileComponents()
      .then(() => {
        supportwifiservice = TestBed.inject(SupportWifiService);
        wifichart = TestBed.inject(SupportWifiChartOptionsService);
        commonservice = TestBed.inject(CommonService);
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(SignalStrengthComponent);
        httptestingcontroller = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
        component.periodSelected = '1';
        component.orgId = '102';
        component.showCharts = true;
        component.showChart = true;
        component.showSteeringLog = true;
        component.hasSteering = true;
        fixture.detectChanges();

      })
  });
  it('signal strength onInit()', () => {
    spyOn(component, 'calcOf15minVal').and.callThrough();
    spyOn(component, 'loadChart').and.callThrough();
    component.ngOnInit();
    expect(component.calcOf15minVal).toBeTruthy();
    expect(component.loadChart).toBeTruthy();
    fixture.detectChanges();
  });

  it('signal strength get data', () => {
    let routeraddr = component.routerData = {
      "HostName": "MyQ-8B9",
      "MACAddress": "64:52:99:71:7e:17",
      "IPAddress": "192.168.51.189",
      "Connection": "2.4GHz",
      "AccessPoint": "RG GS2037E",
      "SSID": "MN4UH",
      "Mode": "11n",
      "Signal-strength": -52,
      "DS-packet-drops": 0,
      "SNR": 43,
      "Airtime-usage": 0,
      "DS-phy-rate": 65000,
      "US-phy-rate": 72200,
      "DS-retx-packets": 1,
      "Status": "online",
      "Address-source": "dhcp",
      "Model": "MyQ Smart Home",
      "Manufacture": "Chamberlain",
      "Code-version": "Unknown",
      "Lease-time-expiry": 1665994265000,
      "Connection-type": "WiFi",
      "Band": "2.4",
      "Channel-number": 1,
      "RX-bandwidth-usage": 0.14,
      "TX-bandwidth-usage": 0.11,
      "Client-efficiency-score": 0.9082,
      "TX-bytes": 573,
      "RX-bytes": 573,
      "AccessPointSerialNumber": "CXNK00FEEEA5",
      "AccessPointHostName": "Office Router",
      "Client-type": 11
    };

    let rgroutesnnum = component.RGRouter = {
      "deviceId": "FEEEA5",
      "serialNumber": "CXNK00FEEEA5",
      "macAddress": "b8:94:70:23:0f:a3",
      "registrationId": "FEEEA5",
      "ipAddress": "172.16.1.141",
      "modelName": "GS2037E",
      "softwareVersion": "22.3.0.0.33",
      "opMode": "RG",
      "_id": "102-B89470-CXNK00FEEEA5",
      "manufacturer": "Calix",
      "opModeWithOnt": "RG"
    }
    spyOn(component, 'makeParallelRequest');
    component.getData();
    component.routerData.macAddress = routeraddr.MACAddress;
    component.RGRouter.serialNumber = rgroutesnnum.serialNumber;
    component.loading = true;
    expect(component.makeParallelRequest).toHaveBeenCalled();
    fixture.detectChanges();
  });

  it('charts and data', () => {
    translateService.selectedLanguage.subscribe(data => {
      component.language = data; })
    spyOn(wifichart, 'SignalStrengthChartOptions').and.returnValue(of(signalchart));
    spyOn(commonservice, 'sortByColumn').and.returnValue(steeringmock);
    component.combineLatest = combineLatest(alldataforchart);
    //component.makeParallelRequest();
    component.steeringTableData = steeringmock;
    component.loading = false;
    fixture.detectChanges()
    let wifi = fixture.nativeElement.querySelector('#wifi-signal-chart');
    wifichart.SignalStrengthChartOptions(res1,1,component.language,res2,[]).subscribe(res =>{
      Highcharts.chart(wifi,res);
      if (component.isRerender) {
        component.rerender();
      } else {
        component.dtTrigger.next();
        component.renderedOnce = true;
      }
      component.steeringAvailable = true;
      fixture.detectChanges();
      
    expect(res.title.text).toEqual('Signal Strength & Phy Rate');
    let len = res.series[0].data.length;
    expect(len).toBeGreaterThan(0);
  })
    expect(component.showChart).toBeTruthy();
    expect(component.steeringTableData[0].ending.routerName).toEqual(steeringmock[0].ending.routerName);
    fixture.detectChanges();
  });

  // it('steering logs', () => {
  //   component.combineLatest = combineLatest(alldataforchart);
  //   component.makeParallelRequest();
  //   spyOn(commonservice, 'sortByColumn').and.returnValue(steeringmock);
  //   component.steeringTableData = steeringmock;
  //   if (component.isRerender) {
  //     component.rerender();
  //   } else {
  //     component.dtTrigger.next();
  //     component.renderedOnce = true;
  //   }
  //   component.steeringAvailable = true;
  //   fixture.detectChanges();
    
  //   expect(component.steeringTableData[0].ending.routerName).toEqual(steeringmock[0].ending.routerName)
  // })
});
