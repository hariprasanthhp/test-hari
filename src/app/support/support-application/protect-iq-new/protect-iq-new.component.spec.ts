import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectIqNewComponent } from './protect-iq-new.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import { DataServiceService } from '../../data.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { scopesmock } from 'src/assets/mockdata/support/edge-suites/experience-iq';
import { environment } from 'src/environments/environment';

describe('ProtectIqNewComponent', () => {
  let component: ProtectIqNewComponent;
  let fixture: ComponentFixture<ProtectIqNewComponent>;
  let protectIqService: ProtectIqService;
  let dataService: DataServiceService;
  let ssoAuthService: SsoAuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectIqNewComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ProtectIqService,
        DataServiceService,
        SsoAuthService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectIqNewComponent);
    component = fixture.componentInstance;
    protectIqService = TestBed.inject(ProtectIqService);
    dataService = TestBed.inject(DataServiceService);
    ssoAuthService = TestBed.inject(SsoAuthService);
    router = TestBed.inject(Router);
    let deviceInfo = [
      {
        "serialNumber": "CXNK01019C7C",
        "macAddress": "b8:94:70:2f:76:82",
        "modelName": "GS2128G",
        "ont": {
          "uuid": "314ab0fd-516b-4f0b-af3e-7f9b8a48676f",
          "serialNumber": "CXNK01019C7C",
          "macAddress": "b8:94:70:2f:76:82",
          "modelName": "GS2128G"
        },
        "deviceId": "CXNK01019C7C",
        "opModeWithOnt": "ONT",
        "softwareVersion": '23.3.5'
      }
    ]
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    component.unitTesting = true;
    fixture.detectChanges();
  });

  it('should load all simple functions', () => {
    component.unitTesting = true;
    component.translateService.selectedLanguage.next({});
    protectIqService.subscribtionStatus.next({});
    component.preReqData = {
      id: 'test'
    }
    spyOn(router, 'navigateByUrl');
    ssoAuthService.currentSubscriberInfo.next({});
    expect(router.navigateByUrl).toHaveBeenCalledWith('/support/application/protect-iq');

    component.preReqData = {};
    ssoAuthService.currentSubscriberInfo.next({});

    component.isCaptivePortAvail();
    dataService.setSubscriberInfo(true);
    component.isCaptivePortAvail();
    // component.ngOnInit();
    component.initMenus();
    component.subscribtionStatus = {
      deviceSubscription: true,
      deviceStatus: true,
    }
    component.formatMenus();
    component.ngOnDestory();
  });

  it('should get scopes', () => {
    environment.VALIDATE_SCOPE = 'true';
    window.localStorage.setItem('calix.scopes', JSON.stringify(scopesmock));
    component.getScopes();
  });

  it('should make onboarded check - when API succeeds', () => {
    let response = {
      userId: 'test'
    }
    spyOn(protectIqService, 'getUserId').and.returnValue(of(response));
    component.onBoardedCheck();
  });

  it('should make onboarded check - when API fails', () => {
    spyOn(protectIqService, 'getUserId').and.returnValue(throwError(errorStatus401));
    component.onBoardedCheck();
  });

  it('should load availability data - when API succeeds', () => {
    spyOn(protectIqService, 'getFeatureAvailability').and.returnValue(of({}));
    component.showFeatureAvailability({});
    component.ngOnDestory();
  });

  it('should load data - when API fails', () => {
    spyOn(protectIqService, 'getFeatureAvailability').and.returnValue(throwError(errorStatus401));
    component.showFeatureAvailability({});
  });


});
