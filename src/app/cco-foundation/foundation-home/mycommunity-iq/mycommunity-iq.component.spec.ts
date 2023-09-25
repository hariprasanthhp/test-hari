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
import { MycommunityIQComponent } from './mycommunity-iq.component';
import { FoundationManageService } from '../../foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Router } from '@angular/router';
import { mycommunityiqChart,makeParallelRequest } from 'src/assets/mockdata/Foundation/Home/myCommunityIq';
import { Observable, of } from 'rxjs';
import Highcharts from 'highcharts';
import { iterator } from 'rxjs/internal-compatibility';
import { ENGLISH } from 'src/assets/mockdata/language/english';
import { EnglishJSON } from 'src/assets/language/english.service';

describe('MycommunityIQComponent', () => {
  let component: MycommunityIQComponent,
    fixture: ComponentFixture<MycommunityIQComponent>,
    dataService: DataService,
    chartOptions: HomeChartOptionsService,
    translateService: TranslateService,
    dateUtils: DateUtilsService,
    service: FoundationHomeService,
    sso: SsoAuthService,
    systemservice: FoundationManageService,
    commonOrgService: CommonService,
    ccoHomeService: CcoHomeService,
    router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycommunityIQComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule],
      providers: [TranslateService, DataService,
        HomeChartOptionsService,
        DateUtilsService,
        FoundationHomeService,
        SsoAuthService,
        CcoHomeService]
    })
      .compileComponents().then(() => {
        chartOptions = TestBed.inject(HomeChartOptionsService)
        translateService = TestBed.inject(TranslateService)
        dateUtils = TestBed.inject(DateUtilsService)
        service = TestBed.inject(FoundationHomeService)
        sso = TestBed.inject(SsoAuthService)
        systemservice = TestBed.inject(FoundationManageService)
        commonOrgService = TestBed.inject(CommonService)
        ccoHomeService = TestBed.inject(CcoHomeService)
        router = TestBed.inject(Router)
        fixture = TestBed.createComponent(MycommunityIQComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('OnInIt ', () => {
    spyOn(component, 'getMyCommunityIQEntitlement');
    spyOn(component, 'getIqSuitesDatas');
    component.ngOnInit();
    expect(component.getIqSuitesDatas).toHaveBeenCalled();
    expect(component.getMyCommunityIQEntitlement).toHaveBeenCalled();
  })

  it('Should call getIqSuitesDatas function', () => {
    spyOn(component, 'makeParallelRequest');
    component.getIqSuitesDatas()
    expect(component.loading).toBeTruthy();
    expect(component.makeParallelRequest).toHaveBeenCalled();
  })

  it('Should call loadChart function', () => {
    spyOn(component, 'chartDataModify');
    spyOn(chartOptions, 'getCommonSubscribersChartOptions').and.returnValue(of(mycommunityiqChart));
    component.loadChart();
    expect(component.chartDataModify).toHaveBeenCalled(); 
    expect(component.chartDataOptions.xAxis[0].categories.length).toBeGreaterThan(0);
    expect(component.chartDataOptions.series.length).toBeGreaterThan(0);
  })

  it('Should call watchFilterDays', () => {
    ccoHomeService.filterDays$.next('7')  
    component.watchFilterDays();
    expect(component.filterDays).toEqual('7');
  })
  it('Should call reverseString',()=>{
    component.reverseString(20221103,'M/d/yy');
    component.reverseString(20221103);
    expect( component.reverseString(20221103,'M/d/yy')).toBeTruthy();
    expect( component.reverseString(20221103)).toBeTruthy()
  })
  it('Should Call Constructor',()=>{
  let english = new EnglishJSON();
    translateService.selectedLanguage.next(english.data);
    spyOn(component,'loadChart')
    component.constructor;
  })

  it('Should Call makeParallelRequest',()=>{
    component.makeParallelRequest();
  })

});
