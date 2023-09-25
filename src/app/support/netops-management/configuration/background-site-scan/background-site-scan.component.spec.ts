import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { Sitescan, Sitescanlanguage } from 'src/assets/mockdata/support/netops-management/configuration/sitescan.data';

import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { BackgroundSiteScanService } from '../../shared/service/background-site-scan.service';

import { BackgroundSiteScanComponent } from './background-site-scan.component';
import { of, Subscription, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('BackgroundSiteScanComponent', () => {
  let component: BackgroundSiteScanComponent;
  let fixture: ComponentFixture<BackgroundSiteScanComponent>;
  let BGSiteScanService: BackgroundSiteScanService;
  let httpTestingController :HttpTestingController
  let translateService :TranslateService
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackgroundSiteScanComponent],
      imports: [
        HttpClientTestingModule
,       RouterTestingModule,
        FormsModule
      ],
      providers: [
        TranslateService, BackgroundSiteScanService, Title, SsoAuthService
      ]
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        BGSiteScanService = TestBed.inject(BackgroundSiteScanService);
        fixture = TestBed.createComponent(BackgroundSiteScanComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges()
    });
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BackgroundSiteScanComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should initialized onInit()', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    spyOn(component, 'getScopes');
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.getScopes).toHaveBeenCalled();
    expect(component.getScopes).toHaveBeenCalledTimes(1);
  })

  it('should get the background site scan data', () => {
    spyOn(BGSiteScanService, 'getAutositeScanStatus').and.returnValue(of(Sitescan))
    component.getBackGroundsiteScan();
    // console.log(component.backgroundSiteScanObj);
     expect(component.backgroundSiteScanObj).toBeTruthy("No data available");
  });

  it('should get the background site scan data error', () => {
    spyOn(BGSiteScanService, 'getAutositeScanStatus').and.returnValue(throwError(errorStatus401))
    component.getBackGroundsiteScan();
  });

  it('checks checkbox change event',fakeAsync(()=>{
    let myCheckBox = fixture.debugElement.query(By.css('input[type=checkbox'));
    // change this line
    spyOn(component, 'onSubmit').and.callThrough(); 
    // change this line as well to mock the object
    myCheckBox.triggerEventHandler('change', { target: { checked: true }});
    tick();
    fixture.detectChanges();
    expect(component.loading).toBeTrue();
    expect(component.onSubmit).toHaveBeenCalled();
   }));

  // it('Check onCancel has been called', () => {
  //   spyOn(component, 'onCancel');
  //   component.onCancel();
  //   // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
  //   expect(component.onCancel).toHaveBeenCalled();
  // });

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

  it('Check whether scopes works', () => {
    environment.VALIDATE_SCOPE = "true";
    console.log("ee val", environment.VALIDATE_SCOPE);
    component.scopes['cloud.rbac.csc.netops.config.site_scan'] = [
      "read",
      "write"
  ]
    expect(component.scopes['cloud.rbac.csc.netops.config.site_scan'][0]).toEqual('read')
  });

  it('Check whether onCancel function workss', () => {
    spyOn(component, 'onCancel').and.callThrough()
    component.onCancel()
    expect(component.onCancel).toHaveBeenCalled()
  });

  it('Check whether Onsubmit update api works', () => {
    spyOn(BGSiteScanService, 'updateAutoSiteScanStatus').and.returnValue(of(Sitescan));
    component.onSubmit();
    fixture.detectChanges();
    // expect(component.showSuccess).toBeTruthy();
    // expect(component.successMsg).toMatch('Successfully updated');
  });

  it('Check whether Onsubmit update api error', () => {
    spyOn(BGSiteScanService, 'updateAutoSiteScanStatus').and.returnValue(throwError(errorStatus401))
    component.onSubmit();
  });

  it('Check whether ngOnDestroy works', () => {
    if (component.languageSubject) {
    spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalledTimes(1);
    }
  });
});
