import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Secureonboard, Secureonboardupdate } from 'src/assets/mockdata/support/netops-management/configuration/secureOnboarding.data';
import { OnboardingConverter } from 'src/app/support/shared/custom-pipes/onboardingConverter.pipe';
import { SecureOnBoardingService } from '../../shared/service/secure-on-boarding.service';

import { SecureOnboardingComponent } from './secure-onboarding.component';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { EnglishJSON } from 'src/assets/language/english.service';

describe('SecureOnboardingComponent', () => {
  let component: SecureOnboardingComponent;
  let fixture: ComponentFixture<SecureOnboardingComponent>;
  let translateService: TranslateService;
  let SecureOnboardService: SecureOnBoardingService;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureOnboardingComponent, OnboardingConverter],
      imports: [
        HttpClientTestingModule
        , RouterTestingModule
      ],
      providers: [TranslateService, SsoAuthService, Title, SecureOnBoardingService]
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        SecureOnboardService = TestBed.inject(SecureOnBoardingService);
        fixture = TestBed.createComponent(SecureOnboardingComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges()
      });
  });

  it('should initialized onInit()', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    spyOn(component, 'fetchSecureOnBoarding').and.callThrough();
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    // expect(component.fetchSecureOnBoarding).toHaveBeenCalled();
    // expect(component.fetchSecureOnBoarding).toHaveBeenCalledTimes(1);
  })

  it('should get the secure onboarding data', () => {
    spyOn(SecureOnboardService, 'getSecureOnBoarding').and.returnValue(of(Secureonboard))
    component.fetchSecureOnBoarding();
    // console.log(component.backgroundSiteScanObj);
    expect(component.secureOnBoardingObj).toBeTruthy("No data available");
  });

  // it('checks checkbox change event',fakeAsync(()=>{
  //   let myCheckBox = fixture.debugElement.query(By.css('input[type=checkbox'));
  //   fixture.detectChanges()
  //   // change this line
  //   spyOn(component, 'updateSecureOnBoarding').and.callThrough(); 
  //   // change this line as well to mock the object
  //   myCheckBox.triggerEventHandler('change', { target: { checked: true }});
  //   tick();
  //   fixture.detectChanges();
  //   expect(component.loading).toBeTrue();
  //   expect(component.updateSecureOnBoarding).toHaveBeenCalled();
  //  }));

  it('should update the secure onboarding data', () => {
    spyOn(component, 'fetchSecureOnBoarding').and.callThrough();
    spyOn(SecureOnboardService, 'updateSecureOnBoarding').and.returnValue(of(Secureonboardupdate))
    fixture.detectChanges()
    component.updateSecureOnBoarding();
    // console.log(component.backgroundSiteScanObj);
    expect(component.fetchSecureOnBoarding).toHaveBeenCalled();
  });

  it('Check hideError details', () => {
    spyOn(component, 'hideError').and.callThrough()
    component.hideError()
    expect(component.showError).toBeFalsy()
    expect(component.errorMsg).toEqual('')
  });

  it('Check hideSuccess details', () => {
    spyOn(component, 'hideSuccess').and.callThrough()
    component.hideSuccess()
    expect(component.showSuccess).toBeFalsy()
    expect(component.successMsg).toEqual('')
  });

  it('Check whether onCancel function workss', () => {
    spyOn(component, 'onCancel').and.callThrough()
    component.onCancel()
    expect(component.onCancel).toHaveBeenCalled()
  });

  it('Check whether getSecureOnBoarding api error', () => {
    spyOn(SecureOnboardService, 'getSecureOnBoarding').and.returnValue(throwError(errorStatus401))
    component.fetchSecureOnBoarding();
  });

  it('Check whether updateSecureOnBoarding api error', () => {
    spyOn(SecureOnboardService, 'updateSecureOnBoarding').and.returnValue(throwError(errorStatus401))
    component.updateSecureOnBoarding();
  });

  it('Check whether onSecureOnBoardingChange function workss', () => {
    let secureOnBoardingObj = {
      "secureOnboarding": false,
      "orgId": "470053"
    }
    spyOn(component, 'updateSecureOnBoarding').and.callThrough()
    spyOn(component, 'onSecureOnBoardingChange').and.callThrough()
    component.onSecureOnBoardingChange()
    component.secureOnBoardingObj.secureOnboarding = secureOnBoardingObj.secureOnboarding;
    fixture.detectChanges();
    expect(component.onSecureOnBoardingChange).toHaveBeenCalled()
    expect(component.updateSecureOnBoarding).toHaveBeenCalled()
  });
});
