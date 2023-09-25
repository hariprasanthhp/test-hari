import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectIqAlertsComponent } from './protect-iq-alerts.component';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpResponse } from '@angular/common/http';

describe('ProtectIqAlertsComponent', () => {
  let component: ProtectIqAlertsComponent;
  let fixture: ComponentFixture<ProtectIqAlertsComponent>;
  let protectIqService: ProtectIqService;
  let translateService: TranslateService;
  let ssoAuthService: SsoAuthService;
  const alertDetail = {
    notifId: 'test',
    securityAlarm: {
      type: 'test',
      signatureId: 'test',
      url: 'test',
      message: 'test'
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectIqAlertsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        ProtectIqService,
        SsoAuthService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectIqAlertsComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    ssoAuthService = TestBed.inject(SsoAuthService);
    protectIqService = TestBed.inject(ProtectIqService);
    history.pushState({
      userId: 'test',
    }, '');
    fixture.detectChanges();
  });

  it('should set the language and load data on initialization', () => {
    component.translateService.selectedLanguage.next({});
    component.getAlertLabel('IPS');
  });

  it('should load data - when API succeeds', () => {
    let mockdata = {
      body: {
        datas: ['test-1', 'test-2']
      }
    };
    const response = new HttpResponse({
      body: {
        datas: ['test-1', 'test-2']
      }
    });

    spyOn(protectIqService, 'getAlerts').and.returnValue(of(response));
    component.loadData();
  });

  it('should load data - when API fails', () => {
    spyOn(protectIqService, 'getAlerts').and.returnValue(throwError(errorStatus401));
    component.loadData();
  });

  it('should add device to trust list - when API succeeds', () => {
    spyOn(protectIqService, 'addWhitelistDetails').and.returnValue(of(alertDetail));
    component.addToTrustList(alertDetail);
  });

  it('should add device to trust list - when API fails', () => {
    spyOn(protectIqService, 'addWhitelistDetails').and.returnValue(throwError(errorStatus401));
    component.addToTrustList(alertDetail);
  });

});
