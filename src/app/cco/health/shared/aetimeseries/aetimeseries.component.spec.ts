import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { ExpectedConditions } from 'protractor';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ae_timeseries, ae_timeseries_with_no, pon_bip_timeseries } from 'src/assets/mockdata/cco/health/pon-utilization/service/report.data';
import { HealthService } from '../../service/health.service';

import { AetimeseriesComponent } from './aetimeseries.component';

describe('AetimeseriesComponent', () => {
  let component: AetimeseriesComponent;
  let fixture: ComponentFixture<AetimeseriesComponent>;
  let healthService: HealthService;
  let router: Router;
  let data = {
    //last24hours: false,
    params: {
      tenant: "0",
      startTime: new Date(1666636200 * 1000),
      endTime: new Date(1666767405 * 1000),
      region: '122a3972-08bf-43b3-a414-ce3c8e090465',
      location: 'b40ce101-152f-41da-899a-e0fc1e844951',
      system: '64de4870-f22d-40f7-8c19-c91469db4b06',
      interface: '1/1/x5',
      granularity: '15min',
      divid: 'general23',
    },
    paramname: {
      regionname: 'Texas',
      locationname: 'Addison',
      systemname: 'Health_Testbed_10.245.93.103',
      interfacename: '1/1/x5',
    },
    charttype: 'ae_General',
    chartname: 'General',
    page: 'ae'
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AetimeseriesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule
      ],
      providers: [
        TranslateService,
        HealthService,
        DateUtilsService,
        CommonService,
        NgbModal]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AetimeseriesComponent);
        healthService = TestBed.inject(HealthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });
  // it('calling for ae timeseries', fakeAsync(() => {
  //   const last24hours = false;
  //   spyOn(component, 'getlistoffsan').and.callThrough();
  //   spyOn(healthService, 'timeseries').and.returnValue(of(ae_timeseries))
  //   component.wholedata = data;
  //   component.ngOnInit();
  //   expect(component.timeseriesname).toMatch('AE Interface Health');
  //   //expect(component.getlistoffsan).toHaveBeenCalled();
  //   setTimeout(() => {
  //     expect(component.MultipleTimeseriesChartList.length).toEqual(1);
  //   }, 500)
  //   flush(500);
  // }));

  // it('ae timeseries with no data ', fakeAsync(() => {
  //   const last24hours = false;
  //   spyOn(component, 'getlistoffsan').and.callThrough();
  //   spyOn(healthService, 'timeseries').and.returnValue(of(ae_timeseries_with_no))
  //   component.wholedata = data;
  //   component.ngOnInit();
  //   expect(component.timeseriesname).toMatch('AE Interface Health');
  //   //expect(component.getlistoffsan).toHaveBeenCalled();
  //   setTimeout(() => {
  //     expect(component.MultipleTimeseriesChartList[0].chartdata).toBeTruthy([]);
  //   }, 500)
  //   flush(500);
  // }));
  afterEach(() => {
    fixture.destroy();
  });


});
