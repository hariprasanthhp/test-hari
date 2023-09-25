import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home.service';
import { HomeChartOptionsService } from '../home-chart-options.service';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { SystemStatusComponent } from './system-status.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import Highcharts from 'highcharts';
import { chartdataresstatus, chartdatastatus,systemstatusChartData } from 'src/assets/mockdata/foundation/home/system-type-status';

describe('SystemStatusComponent', () => {
  let component: SystemStatusComponent;
  let fixture: ComponentFixture<SystemStatusComponent>;
  let dataService: DataService;
  let chartOptions: HomeChartOptionsService;
  let translateService: TranslateService;
  let dateUtils: DateUtilsService;
  let service: FoundationHomeService;
  let sso: SsoAuthService;
  let ccoHomeService: CcoHomeService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemStatusComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,DataService,
        HomeChartOptionsService,
        DateUtilsService,
        FoundationHomeService,
        SsoAuthService,
        CcoHomeService]
    })
    .compileComponents()
    .then(()=>{
      dataService = TestBed.inject(DataService);
      chartOptions = TestBed.inject(HomeChartOptionsService);
      translateService = TestBed.inject(TranslateService);
      dateUtils = TestBed.inject(DateUtilsService);
      service = TestBed.inject(FoundationHomeService);
      sso = TestBed.inject(SsoAuthService);
      ccoHomeService = TestBed.inject(CcoHomeService);
      router = TestBed.inject(Router);
      route = TestBed.inject(ActivatedRoute);
      fixture = TestBed.createComponent(SystemStatusComponent);
      component = fixture.componentInstance;
      component.loadChart();
      fixture.detectChanges();
    })
  });

  it('system by status onInit()', () => {
    spyOn(component, 'loadChart').and.callThrough();
    component.loadChart();
    expect(component.loadChart).toHaveBeenCalled();
  });

  it('system by status loadchart', () => {
    spyOn(service, 'getSystemstatusChartData').and.returnValue(of(systemstatusChartData));
    spyOn(chartOptions, 'getCommonSubscribersChartOptions').and.returnValue(of(chartdatastatus));
    spyOn(component, 'chartDataModify').and.callThrough();
    component.loadChart();
    component.dataAvailable = true;
    component.chartDataOptions = chartdatastatus;
    component.chartDataModify(chartdataresstatus);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector("#system-status-graph-div");
    Highcharts.chart('system-status-graph-div', component.chartDataOptions);
    expect(component.chartDataModify).toHaveBeenCalled();
    expect(component.chartDataOptions.series[0].name).toEqual("Pre-Provisioned");
    expect(component.chartDataOptions.series[1].name).toEqual("Active");
    expect(component.chartDataOptions.series[2].name).toEqual("Not Checked In");
    fixture.detectChanges();
  });
  it('Should call watchFilterDays', () => {
    ccoHomeService.filterDays$.next('7')  
    component.watchFilterDays();
    expect(component.filterDays).toEqual('7');
  })
});
