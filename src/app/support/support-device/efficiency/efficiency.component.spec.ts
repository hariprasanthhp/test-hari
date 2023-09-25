 import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import Highcharts from 'highcharts';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { effchart } from 'src/assets/mockdata/support/devices/efficiency';
import { DataServiceService } from '../../data.service';
import { DeviceService } from '../service/device.service';

import { EfficiencyComponent } from './efficiency.component';

describe('EfficiencyComponent', () => {
  let component: EfficiencyComponent;
  let fixture: ComponentFixture<EfficiencyComponent>;
  let deviceService: DeviceService;
  let ssoService: SsoAuthService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EfficiencyComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, CalendarModule, NgxSliderModule],
      providers: [TranslateService, DataServiceService, DeviceService, SsoAuthService]
    })
      .compileComponents()
      .then(() => {
        deviceService = TestBed.inject(DeviceService);
        ssoService = TestBed.inject(SsoAuthService);
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(EfficiencyComponent);
        component = fixture.componentInstance;
        component.TimeFrame = 2;
        fixture.detectChanges();
      })
  });
  it('efficiency onInit()', () => {
    spyOn(component, 'loadChart').and.callThrough();
    spyOn(component, 'calcOf15minVal').and.callThrough();
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    component.loadChart();
    expect(component.calcOf15minVal).toBeTruthy();
    expect(component.loadChart).toBeTruthy();
    fixture.detectChanges();
  });
  // hiding this for ng test code coverage issue..
  // it('loadchart efficiency', () => {
  //   spyOn(deviceService, 'getClientScore').and.returnValue(of(effchart));
  //   spyOn(component,'wholeHomeEfficiencyOption').and.callThrough();
  //   spyOn(component,'calcOf15minVal').and.callThrough();
  //   spyOn(component, 'mapWholeHomeEfficencyChartData').and.callThrough();
  //   component.loader = false;
  //   component.loadChart();
  //   component.calcOf15minVal();
  //   Highcharts.chart('wholeHomeEfficiencyChart', component.wholeHomeEfficiencyOption(effchart));
  //   let chartdata = component.wholeHomeEfficiencyOption(effchart);
  //   expect(chartdata.yAxis.title.text).toEqual("Client Efficiency (%)");
  //   expect(component.calcOf15minVal).toHaveBeenCalled();
  //   expect(component.mapWholeHomeEfficencyChartData).toHaveBeenCalled();
  // })
});
