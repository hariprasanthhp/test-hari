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
import { SubscribersSystemModelComponent } from './subscribers-system-model.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { subscriberchart, subscriberdatares,subscriberSystemsModel } from 'src/assets/mockdata/foundation/home/subscriber-system';
import Highcharts from 'highcharts';

describe('SubscribersSystemModelComponent', () => {
  let component: SubscribersSystemModelComponent;
  let fixture: ComponentFixture<SubscribersSystemModelComponent>;
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
      declarations: [ SubscribersSystemModelComponent ],
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
      fixture = TestBed.createComponent(SubscribersSystemModelComponent);
      component = fixture.componentInstance;
      component.loadChart();
      fixture.detectChanges();
    })
  });

  it('subscribers system model onInit()', () => {
    spyOn(component, 'loadChart').and.callThrough();
    component.loadChart();
    expect(component.loadChart).toHaveBeenCalled();
  });

  it('subscribers system model loadchart', () => {
    spyOn(service,'getSubscriberSystemsModel').and.returnValue(of(subscriberSystemsModel));
    spyOn(chartOptions, 'getCommonSubscribersChartOptions').and.returnValue(of(subscriberchart));
    spyOn(component, 'chartDataModify').and.callThrough();
    component.loadChart();
    component.dataAvailable = true;
    component.chartDataOptions = subscriberchart;
    component.chartDataModify(subscriberdatares);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector("#system-model-graph-div");
    Highcharts.chart('system-model-graph-div', component.chartDataOptions);
    expect(component.chartDataModify).toHaveBeenCalled();
    expect(component.chartDataOptions.xAxis[0].categories.length).toBeGreaterThan(0);
    expect(component.chartDataOptions.series.length).toBeGreaterThan(0);
    fixture.detectChanges();
  });
  it('Should call watchFilterDays', () => {
    ccoHomeService.filterDays$.next('7')  
    component.watchFilterDays();
    expect(component.filterDays).toEqual('7');
  })
});
