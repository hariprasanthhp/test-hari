import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportApplicationComponent } from './support-application.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { devicesdata, subscriberInfo } from 'src/assets/mockdata/support/edge-suites/support-application';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProtectIqNewModule } from './protect-iq-new/protect-iq-new.module';

describe('SupportApplicationComponent', () => {
  let component: SupportApplicationComponent;
  let fixture: ComponentFixture<SupportApplicationComponent>;
  let translateService: TranslateService;
  let ssoService: SsoAuthService;
  let testController: HttpTestingController;
  let router: Router;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/support/application/protect-iq' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportApplicationComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'protect-iq', loadChildren: () => import('./protect-iq-new/protect-iq-new.module').then(m => m.ProtectIqNewModule)
        }
      ])
        , SharedModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule,ProtectIqNewModule],
      providers: [TranslateService, SsoAuthService,{ provide: Router, useValue: routerSpy }]
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        ssoService = TestBed.inject(SsoAuthService);
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(SupportApplicationComponent);
        testController = TestBed.inject(HttpTestingController);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
      })
  });
  // it('ngOnInit', () => {
  //   component.ngOnInit();
  //   sessionStorage.setItem('overviewStatus', 'isLoaded');
  //   fixture.detectChanges();
  // });

  // it('showTab', () => {
  //   sessionStorage.setItem('calix.deviceData', JSON.stringify(devicesdata));
  //   sessionStorage.setItem('calix.subscriberInfo', JSON.stringify(subscriberInfo));
  //   sessionStorage.setItem('unassoDeviceReferrer', subscriberInfo.commandIQ.referrer);
  //   component.showTab();
  //   component.containGS = devicesdata.length;
  //   ssoService.getEntitlementsArr().indexOf('203');
  //   // router.navigate(['/support/application/protectIQ']);
  //   component.setActiveTab('protectIQ');
  //   fixture.detectChanges();
  // });

  // it('tabSelection', () => {
  //   component.tabSelection();
  //   fixture.detectChanges();
  // });

  // it('should get EIQ and PIQ names', () => {
  //   let spId = localStorage.setItem('calix.spid', JSON.stringify('verizon123'));
  //   const Piq = { customAppName: 'ProtectIQ' };
  //   const Eiq = { customAppName: 'ExperienceIQ' };
  //   const expectedCustomAppName = {
  //     ProtectIQ_Name: 'ProtectIQ',
  //     ExperienceIQ_Name: 'ExperienceIQ'
  //   };

    // const req = testController.match('https://dev.api.calix.ai/v1/shad/admin/application/custom/name?spid=FfjNGdWhoI&appName=CIES');
    // // expect(req.request.method).toBe('GET');
    // req.flush[0](mockResponse[0]);


    // const req2 = testController.match('https://dev.api.calix.ai/v1/shad/admin/application/custom/name?spid=FfjNGdWhoI&appName=CIEP');
    // // expect(req2.request.method).toBe('GET');
    // req2.flush(mockResponse[1]);

    // const PiqRequest = testController.expectOne(`${environment.apiHost}/admin/application/custom/name?spid=${spId}&appName=CIES`);
    // expect(PiqRequest.request.method).toBe('GET');
    // PiqRequest.flush([Piq]);

    // const EiqRequest = testController.expectOne(`${environment.apiHost}/admin/application/custom/name?spid=${spId}&appName=CIEP`);
    // expect(EiqRequest.request.method).toBe('GET');
    // EiqRequest.flush([Eiq]);

    // component.getEIQandPIQName();
    // fixture.detectChanges();

    // expect(service.customAppName['ProtectIQ_Name']).toEqual(mockResponse[0].customAppName);
    // expect(service.customAppName['ExperienceIQ_Name']).toEqual(mockResponse[1].customAppName);
  // });
});
