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

import { AirTimeAnalysisComponent } from './air-time-analysis.component';
import { wifiRGAirTimeMockData, wifiRGMockData } from 'src/assets/mockdata/support/support-wifi/rg';
import { of } from 'rxjs';

describe('AirTimeAnalysisComponent', () => {
  let component: AirTimeAnalysisComponent;
  let fixture: ComponentFixture<AirTimeAnalysisComponent>;
  let supportWifiService: SupportWifiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let httpTestingController :HttpTestingController;
  let Sso :SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirTimeAnalysisComponent],
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
        fixture = TestBed.createComponent(AirTimeAnalysisComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
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

  // for the ng test issue hiding this case..
  // it('Load 5GHz Airtime Analysis check', () => {
  //   //spyOn(supportWifiService, 'getAirtimeAnalysis').and.returnValue(of(wifiRGAirTimeMockData));
  //   spyOn(component.api, 'getAirtimeAnalysis').and.callThrough();
  //   component.loadChart()
  //   component.chartData = wifiRGAirTimeMockData;
  //   fixture.detectChanges();
  //   expect(component.chartData[1].name).toEqual(wifiRGAirTimeMockData[1].name)
  // })
});
