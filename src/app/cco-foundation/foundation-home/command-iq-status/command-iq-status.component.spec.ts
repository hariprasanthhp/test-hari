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
import { CommandIqStatusComponent } from './command-iq-status.component';
import { FoundationManageService } from '../../foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Router } from '@angular/router';
import { EnglishJSON } from 'src/assets/language/english.service';
import { commonSubscribersChartOptions,commandIqChartData,chartDataModifyArguement } from 'src/assets/mockdata/Foundation/Home/command-iq-status';
import { Observable, of } from 'rxjs';
import Highcharts from 'highcharts';
describe('CommandIqStatusComponent', () => {
  let component: CommandIqStatusComponent,
  fixture: ComponentFixture<CommandIqStatusComponent>,
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
      declarations: [ CommandIqStatusComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,DataService,
      HomeChartOptionsService,
      DateUtilsService,
      FoundationHomeService,
      SsoAuthService,
      CcoHomeService]
    })
    .compileComponents().then(()=>{
      chartOptions = TestBed.inject(HomeChartOptionsService)
      translateService = TestBed.inject(TranslateService)
      dateUtils = TestBed.inject(DateUtilsService)
      service = TestBed.inject(FoundationHomeService)
      sso = TestBed.inject(SsoAuthService)
      systemservice = TestBed.inject(FoundationManageService)
      commonOrgService = TestBed.inject(CommonService)
      ccoHomeService = TestBed.inject(CcoHomeService)
      router = TestBed.inject(Router)
      fixture = TestBed.createComponent(CommandIqStatusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  beforeEach(function() {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should Call Constructor',()=>{
    let english = new EnglishJSON();
      translateService.selectedLanguage.next(english.data);
      spyOn(component,'loadChart')
      component.constructor;
    });

    // it('Should call loadChart function',  fakeAsync(() => {
    //   spyOn(component, 'chartDataModify');
    //   spyOn(component, 'loadChart');
    //   spyOn(service,'getCommandIqChartData').and.returnValue(of(commandIqChartData));
    //   spyOn(chartOptions, 'getCommonSubscribersChartOptions').and.returnValue(of(commonSubscribersChartOptions));
    //   component.loadChart();
    //   expect(component.loading).toBeTruthy();
    
    //   fixture.detectChanges();
    //   Highcharts.chart('commandiq-graph-div', component.chartDataOptions);
    //   // expect(component.chartDataModify).toHaveBeenCalled(); 
     
    //   expect(component.chartDataOptions.xAxis[0].categories.length).toBeGreaterThan(0);
    //   expect(component.chartDataOptions.series.length).toBeGreaterThan(0);
    //   flush(100);
    //   expect(component.loading).toBeFalsy();
    // }))
    it('Should call watchFilterDays', () => {
      ccoHomeService.filterDays$.next('7')  
      component.watchFilterDays();
      expect(component.filterDays).toEqual('7');
    })
    it('should be call checkPositvNegativ',()=>{
      expect(component.checkPositvNegativ('0')).toBe('+');
      expect(component.checkPositvNegativ('-')).toBe('-');
      expect(component.checkPositvNegativ('1')).toBe('+');
    })
it('should be call setpercentage',()=>{
  expect(component.setpercentage(20,10,2)).toBe('100.00');
})
it('it should call reverseString',()=>{
  component.reverseString(20221103,'M/d/yy');
  component.reverseString(20221103);
  expect(component.reverseString(20221103,'M/d/yy')).toBeTruthy();
  expect(component.reverseString(20221103)).toBeTruthy();
})
it('should call OnInit',()=>{
spyOn(component, 'loadChart');
component.ngOnInit();
expect(component.filterDays).toBe('7');
// expect(component.loadChart).toHaveBeenCalled();
})

// it('Should Call chartDataModify',()=>{
//   expect(component.chartDataModify(chartDataModifyArguement,undefined)).toBeTruthy();
// })
});
