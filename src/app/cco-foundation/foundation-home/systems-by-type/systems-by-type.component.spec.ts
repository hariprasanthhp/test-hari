import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home.service';
import { HomeChartOptionsService } from '../home-chart-options.service';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { SystemsByTypeComponent } from './systems-by-type.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { chartdatahome, chartdatares, systemTypeChartData } from 'src/assets/mockdata/foundation/home/system-type-home';
import Highcharts from 'highcharts';

describe('SystemsByTypeComponent', () => {
  let component: SystemsByTypeComponent;
  let fixture: ComponentFixture<SystemsByTypeComponent>;
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
      declarations: [SystemsByTypeComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule],
      providers: [TranslateService, DataService,
        HomeChartOptionsService,
        DateUtilsService,
        FoundationHomeService,
        SsoAuthService,
        CcoHomeService]
    })
      .compileComponents()
      .then(() => {
        dataService = TestBed.inject(DataService);
        chartOptions = TestBed.inject(HomeChartOptionsService);
        translateService = TestBed.inject(TranslateService);
        dateUtils = TestBed.inject(DateUtilsService);
        service = TestBed.inject(FoundationHomeService);
        sso = TestBed.inject(SsoAuthService);
        ccoHomeService = TestBed.inject(CcoHomeService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(SystemsByTypeComponent);
        component = fixture.componentInstance;
        component.loadChart();
        fixture.detectChanges();
      })
  });

  it('system by type onInit()', () => {
    spyOn(component, 'loadChart').and.callThrough();
    component.loadChart();
    expect(component.loadChart).toHaveBeenCalled();
  });

  it('system by type loadchart', fakeAsync(() => {
    spyOn(service, 'getSystemTypeChartData').and.returnValue(of(systemTypeChartData));
    spyOn(chartOptions, 'getCommonSubscribersChartOptions').and.returnValue(of(chartdatahome));
    spyOn(component, 'chartDataModify').and.callThrough();
    component.loadChart();
    component.chartDataOptions = chartdatahome;
    component.chartDataModify(chartdatares);
    jasmine.clock().tick(100)
    fixture.detectChanges()
    Highcharts.chart('systems-by-type-graph-div', component.chartDataOptions);
    expect(component.loading).toBeFalsy();
    expect(component.chartDataModify).toHaveBeenCalled();
    expect(component.chartDataOptions.xAxis[0].categories.length).toBeGreaterThan(0);
    flush(100);
  }));
  it('Should call watchFilterDays', () => {
    ccoHomeService.filterDays$.next('7')
    component.watchFilterDays();
    expect(component.filterDays).toEqual('7');
  })
});
