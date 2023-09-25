import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { iterator } from 'rxjs/internal-compatibility';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { FaUtilsService } from 'src/app/support/support-traffic-reports/service/fa-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ethernet_timeseries, pon_bip_timeseries } from 'src/assets/mockdata/cco/health/pon-utilization/service/report.data';
import { CcochartService } from '../../pon-utilization/service/ccochart.service';
import { NfainventoryService } from '../../pon-utilization/service/nfainventory.service';
import { HealthService } from '../../service/health.service';

import { TimeserieschartComponent } from './timeserieschart.component';

describe('TimeserieschartComponent', () => {
  let component: TimeserieschartComponent;
  let fixture: ComponentFixture<TimeserieschartComponent>;
  let healthService: HealthService;
  let router: Router;
  let data = {
    params: {
      tenant: "0",
      startTime: new Date(1666636200 * 1000),
      endTime: new Date(1666767405 * 1000),
      region: 'd10ce65c-9526-4173-a467-103804d66336',
      location: 'fa53c57b-a23b-4737-b9ce-841528d924bd',
      system: '12c4c348-83ad-4803-b9cf-a6819d4f10e2',
      interface: '1/1/x1',
      granularity: '15min'
    },
    paramname: {
      regionname: 'CDC_Lab_2',
      locationname: 'Rack 45',
      systemname: 'E7-2_NGPON2-4_10.245.45.140',
      interfacename: '1/1/x1',
    },
    charttype: 'General',
    chartname: 'General',
    divid: 'general23',
    page: 'ethernet'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeserieschartComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule
      ],
      providers: [
        TranslateService,
        HealthService,
        CcochartService,
        NfainventoryService,
        ExportExcelService,
        NgbModal,
        CommonService,
        CommonFunctionsService,
        ShortnumberPipe,
        DateUtilsService,
        FaUtilsService,]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TimeserieschartComponent);
        healthService = TestBed.inject(HealthService);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
        (component as any).scrollIntoView = { behavior: 'smooth' };
      })
  });

  // it('timeseries', () => {
  //   spyOn(component, 'TimeseriesApiCall').and.callThrough();
  //   spyOnProperty(router, 'url', 'get').and.returnValue('/health/uplink')
  //   spyOn(healthService, 'timeseries').and.returnValue(of(ethernet_timeseries))
  //   component.params = data.params;
  //   component.paramname = data.paramname;
  //   component.page = data.page;
  //   component.charttype = data.charttype;
  //   component.chartname = data.chartname;
  //   component.divid = data.divid;
  //   component.wholedata = data;
  //   component.ngOnInit();
  //   expect(component.timeseriesname).toMatch('Uplink Health By Timeseries');
  //   expect(component.TimeseriesApiCall).toHaveBeenCalled();
  // });

  // it('calling for PON Error timeseries', () => {
  //   spyOn(component, 'TimeseriesApiCallForBipError').and.callThrough();
  //   spyOnProperty(router, 'url', 'get').and.returnValue('/pon-utilization/overview/basic')
  //   spyOn(healthService, 'timeseriesBipError').and.returnValue(of(pon_bip_timeseries))
  //   component.params = data.params;
  //   component.paramname = data.paramname;
  //   component.page = data.page;
  //   component.charttype = data.charttype;
  //   component.chartname = data.chartname;
  //   component.divid = 'biptimeseries';
  //   component.wholedata = data;
  //   component.ngOnInit();
  //   expect(component.timeseriesnameBip).toMatch('BIP Error By Timeseries');
  //   expect(component.TimeseriesApiCallForBipError).toHaveBeenCalled();
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
