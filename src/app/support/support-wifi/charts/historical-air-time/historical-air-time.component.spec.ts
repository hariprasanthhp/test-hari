import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HistoricalAirTimeComponent } from './historical-air-time.component';
import { wifiRGAirTimeMockData, wifiRGMockData } from 'src/assets/mockdata/support/support-wifi/rg';
import { of } from 'rxjs';
import { wifiHistoricalAirTimeSiteScanradio5ChannelList } from 'src/assets/mockdata/support/support-wifi/charts';

describe('HistoricalAirTimeComponent', () => {
  let component: HistoricalAirTimeComponent;
  let fixture: ComponentFixture<HistoricalAirTimeComponent>;
  let supportWifiService: SupportWifiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let httpTestingController :HttpTestingController;
  let Sso :SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalAirTimeComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        CalendarModule,
      ],
      providers: [
        HttpClient,
        SsoAuthService,
        NgbModal,
        TranslateService,
        CommonService,
        DateUtilsService
      ]
    })
      .compileComponents()
      .then(() => {
        supportWifiService = TestBed.inject(SupportWifiService);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        httpTestingController = TestBed.inject(HttpTestingController);
        Sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(HistoricalAirTimeComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        component.refStartTime = '2022-10-18T07:15:05.091Z';
        component.refEndTime = '2022-10-25T07:15:05.091Z';
        component.fsan = 'CXNK00E4F519';
        component.interval = '15min';
        component.showTabName = '1';
        fixture.detectChanges()
      });
  });

  // it('should initialized onInit()', () => {
  //   component.isDev = false;
  //   // spyOn(Sso, 'isDevCheckFromBaseURL').and.returnValue(of(wifiRGMockData));
  //   spyOn(component.ssoAuthService, 'isDevCheckFromBaseURL').and.callThrough();
  //   component.ngOnInit();
  //   // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
  //   expect(component.ssoAuthService.isDevCheckFromBaseURL).toHaveBeenCalled();
  //   // expect(component.ssoAuthService.isDevCheckFromBaseURL).toHaveBeenCalledTimes(1);
  // })

  it('Load History Air time analysis check', () => {
    spyOn(supportWifiService, 'getHistoryAirtimeAnalysis').and.returnValue(of(wifiHistoricalAirTimeSiteScanradio5ChannelList));
    component.getChartData()
    spyOn(component, 'appendChart').and.callThrough();
     component.appendChart(wifiHistoricalAirTimeSiteScanradio5ChannelList);
    fixture.detectChanges();
    expect(component.appendChart).toHaveBeenCalled();
    // expect(component.chartData[1].name).toEqual(wifiRGAirTimeMockData[1].name)
  })
});
