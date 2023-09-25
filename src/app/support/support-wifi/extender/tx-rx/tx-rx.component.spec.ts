import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import Highcharts from 'highcharts';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { chartdata1, routerdatamock, txrxusage } from 'src/assets/mockdata/support/devices/tx-rx';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { SupportWifiService } from '../../services/support-wifi.service';

import { TxRxComponent } from './tx-rx.component';

describe('TxRxComponent', () => {
  let component: TxRxComponent;
  let fixture: ComponentFixture<TxRxComponent>;
  let api: SupportWifiService;
  let options: SupportWifiChartOptionsService;
  let commonOrgService: CommonService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TxRxComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule
      ],
      providers: [
        SupportWifiService,
        SupportWifiChartOptionsService,
        CommonService,
        TranslateService,
      ]
    })
      .compileComponents()
      .then(() => {
        api = TestBed.inject(SupportWifiService);
        options = TestBed.inject(SupportWifiChartOptionsService);
        commonOrgService = TestBed.inject(CommonService);
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(TxRxComponent);
        component = fixture.componentInstance;
        component.periodSelected = '1';
        component.orgId = '470053';
        component.noChartDataAvailable = false;
        fixture.detectChanges();
      })
  });

  it('tx rx onInit()', () => {
    component.routerData = routerdatamock;
    component.routerData.macAddress = routerdatamock.MACAddress;
    spyOn(component, 'calcOf15minVal').and.callThrough();
    spyOn(component, 'loadChart').and.callThrough();
    spyOn(component, 'setPeriodOptions').and.callThrough();
    component.ngOnInit();
    component.setPeriodOptions();
    component.loadChart();
    expect(component.calcOf15minVal).toBeTruthy();
    expect(component.loadChart).toBeTruthy();
    fixture.detectChanges();
  });

  it('tx rx charts', () => {
    component.routerData = routerdatamock;
    component.routerData.macAddress = routerdatamock.MACAddress;
    component.noChartDataAvailable = false;
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    spyOn(options, 'getMeshTxExtendOptions').and.returnValue(of(chartdata1));
    spyOn(api, 'getUsageTXRX').and.returnValue(of(txrxusage));
    component.loadChart();
    fixture.detectChanges();
    let txrx = fixture.nativeElement.querySelector('#wifi-txrx-chart');
    component.chartOptions = chartdata1;
    Highcharts.chart(txrx, component.chartOptions);
    component.showChart = true;
    component.loading = false;
    expect(component.chartOptions.title.text).toEqual("TX RX Bytes");
    fixture.detectChanges();
  });
});
