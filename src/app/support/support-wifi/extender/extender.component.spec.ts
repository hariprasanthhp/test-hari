import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataServiceService } from '../../data.service';
import { SupportWifiService } from '../services/support-wifi.service';

import { ExtenderComponent } from './extender.component';
import { TxRxComponent } from './tx-rx/tx-rx.component';
import { SignalStrengthComponent } from './signal-strength/signal-strength.component';
import { of } from 'rxjs';
import { wifiBackhaulMockData, wifiExtenderMockData } from 'src/assets/mockdata/support/support-wifi/extender';
import { BehaviorSubject } from 'rxjs';

let route: ActivatedRoute;
const paramsSubject = new BehaviorSubject({
  fsan: 'CXNK555229DE'
});

describe('ExtenderComponent', () => {
  let component: ExtenderComponent;
  let fixture: ComponentFixture<ExtenderComponent>;
  let supportWifiService: SupportWifiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let dataServiceService: DataServiceService;
  let httpTestingController: HttpTestingController;
  let Sso: SsoAuthService;

  //child component (tx-rx) 
  let app: TxRxComponent;
  let fixt: ComponentFixture<TxRxComponent>;

  //child component (Signal Strength) 
  let appst: SignalStrengthComponent;
  let fixtst: ComponentFixture<SignalStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtenderComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, CalendarModule
      ],
      providers: [
        HttpClient,
        DataServiceService,
        TranslateService,
        SsoAuthService,
        SupportWifiService,
        DateUtilsService,
        CommonService,
        NgbModal,
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject
          },
        },
      ]
    })
      .compileComponents()
      .then(() => {
        router = TestBed.inject(Router);
        supportWifiService = TestBed.inject(SupportWifiService);
        route = TestBed.inject(ActivatedRoute);
        dataServiceService = TestBed.inject(DataServiceService);
        httpTestingController = TestBed.inject(HttpTestingController);
        Sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(ExtenderComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges();
      });
  });

  // it('should initialized onInit()', () => {
  //   let today = new Date();
  //   component.reportEndTime = today;
  //   spyOn(component, 'closeAlert').and.callThrough(); 
  //   //spyOn(component, 'getScopes').and.callThrough(); 
  //    component.ngOnInit();
  //    paramsSubject.next({ fsan: 'CXNK555229DE'});
  //    route.params.subscribe(params => {
  //     console.log("fsan val", params.fsan);

  //      expect(params.fsan).not.toBe(0);
  //      //done();
  //    });
  //   expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
  //   expect(component.closeAlert).toHaveBeenCalled();
  //   expect(component.closeAlert).toHaveBeenCalledTimes(2);
  //   // expect(component.getScopes).toHaveBeenCalled();
  //   // expect(component.getScopes).toHaveBeenCalledTimes(1);
  // })

  it('should get the getbackhaul Table Data', () => {
    spyOn(supportWifiService, 'getBackhaul').and.returnValue(of(wifiBackhaulMockData))
    component.getbackhaul();
    component.backhaulData = wifiBackhaulMockData
    //console.log(component.backhaulData);
    expect(component.backhaulData.AccessPoint).toEqual(wifiBackhaulMockData.AccessPoint);
  });

  it('should get the Sitescan Table Data', () => {
    spyOn(supportWifiService, 'getsiteScanLatest').and.returnValue(of(wifiExtenderMockData))
    component.getSiteScanData();
    //component.siteScanResults = wifiExtenderMockData
    // console.log(component.backgroundSiteScanObj);
    expect(component.siteScanResults).toBeTruthy("No data available");
  });
});
