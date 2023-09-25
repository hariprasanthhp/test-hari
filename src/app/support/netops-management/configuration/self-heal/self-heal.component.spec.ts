import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { Selfheal } from 'src/assets/mockdata/support/netops-management/configuration/selfheal.data';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SelfHealService } from '../../shared/service/self-heal.service';

import { SelfHealComponent } from './self-heal.component';
import { of } from 'rxjs';
import { EnglishJSON } from 'src/assets/language/english.service';
import { Router } from '@angular/router';

describe('SelfHealComponent', () => {
  let component: SelfHealComponent;
  let fixture: ComponentFixture<SelfHealComponent>;
  let selfHealService: SelfHealService;
  let httpTestingController :HttpTestingController;
  let translateService :TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfHealComponent],
      imports: [
        HttpClientTestingModule
,       RouterTestingModule
      ],
      providers: [TranslateService, SsoAuthService, SelfHealService, Title]
    })
      .compileComponents()
      .then(() => {
        selfHealService = TestBed.inject(SelfHealService);
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(SelfHealComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges()
      });
  });


  it('should initialized onInit()', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    spyOn(component, 'fetchSelfHeal').and.callThrough(); 
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    // expect(component.fetchSelfHeal).toHaveBeenCalled();
    // expect(component.fetchSelfHeal).toHaveBeenCalledTimes(1);
  })

  it('should get the self heal data', () => {
    spyOn(selfHealService, 'getSelfHeal').and.returnValue(of(Selfheal))
    component.fetchSelfHeal();
    // console.log(component.backgroundSiteScanObj);
     expect(component.selfHealObj).toBeTruthy("No data available");
  });

  it('Check whether router url works', () => {
    const router = TestBed.get(RouterTestingModule);
    router.url = '/cco/operations';
    // now you can run your tested method:
    component.ngOnInit();
  });

  it('Check onCancelSelfHeal has been called', () => {
    spyOn(component, 'onCancelSelfHeal');
    component.onCancelSelfHeal();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.onCancelSelfHeal).toHaveBeenCalled();
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

  it('checks checkbox change event',fakeAsync(()=>{
    let myCheckBox = fixture.debugElement.query(By.css('input[type=checkbox'));
    // change this line
    spyOn(component, 'submitSelfHeal').and.callThrough(); 
    // change this line as well to mock the object
    // myCheckBox.triggerEventHandler('change', { target: { checked: true }});
    // tick();
    // fixture.detectChanges();
    // expect(component.loading).toBeTrue();
    // expect(component.submitSelfHeal).toHaveBeenCalled();
   }));
});


