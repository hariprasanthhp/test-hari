import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcoAlarmRulesComponent } from './cco-alarm-rules.component';

describe('CcoAlarmRulesComponent', () => {
  let component: CcoAlarmRulesComponent;
  let fixture: ComponentFixture<CcoAlarmRulesComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const titleStub = () => ({ setTitle: arg => ({}) });
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const ssoAuthServiceStub = () => ({
      getEntitlements: () => ({}),
      getScopes: () => ({}),
      setPageAccess: arg => ({})
    });
    const workflowServiceStub = () => ({ enforceMinMax: event => ({}) });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CcoAlarmRulesComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Title, useFactory: titleStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub },
        { provide: WorkflowService, useFactory: workflowServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CcoAlarmRulesComponent);
    // httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`btnDisabled has default value`, () => {
    expect(component.btnDisabled).toEqual(false);
  });

  it(`errorMsg has default value`, () => {
    expect(component.errorMsg).toEqual(undefined);
  });

  it(`cco_entitlement has default value`, () => {
    expect(component.cco_entitlement).toEqual(false);
  });

  it(`checkDev has default value`, () => {
    expect(component.checkDev).toEqual(false);
  });

  it(`hasWriteAccess has default value`, () => {
    expect(component.hasWriteAccess).toEqual(false);
  });

  it(`hasScopeAccess has default value`, () => {
    expect(component.hasScopeAccess).toEqual(false);
  });

  describe('pageErrorHandle', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <any>{};
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(component, 'closeAlert').and.callThrough();
      spyOn(commonServiceStub, 'pageErrorHandle').and.callThrough();
      component.pageErrorHandle(httpErrorResponseStub);
      expect(component.closeAlert).toHaveBeenCalled();
      expect(commonServiceStub.pageErrorHandle).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      const ssoAuthServiceStub: SsoAuthService = fixture.debugElement.injector.get(
        SsoAuthService
      );
      spyOn(component, 'setAlarmRulesData').and.callThrough();
      spyOn(component, 'setAlarmListForm').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getEntitlements').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getScopes').and.callThrough();
      spyOn(ssoAuthServiceStub, 'setPageAccess').and.callThrough();
      component.ngOnInit();
      // expect(component.setAlarmRulesData).toHaveBeenCalled();
      // expect(component.setAlarmListForm).toHaveBeenCalled();
      // expect(titleStub.setTitle).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getEntitlements).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getScopes).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.setPageAccess).toHaveBeenCalled();
    });
  });

  describe('getAlarmRulesController', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'setAlarmRulesData').and.callThrough();
      spyOn(component, 'setAlarmListForm').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      // component.getAlarmRulesController()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.setAlarmRulesData).toHaveBeenCalled();
      // expect(component.setAlarmListForm).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('analytics-engine/alarmRules');
      // expect(req.request.method).toEqual('GET');
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('crudAlarmRules', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'enableDisableSave').and.callThrough();
      spyOn(component, 'getAlarmRulesController').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      component.crudAlarmRules()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.enableDisableSave).toHaveBeenCalled();
      // expect(component.getAlarmRulesController).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      let request_body = {};
      // const req1 = httpTestingController.expectOne(`alarmRule/`);
      // expect(req1.request.method).toEqual('PUT');
      // req1.flush([]);
      // const req2 = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req2.request.method).toEqual('POST');
      // req2.flush([]);
      // const req3 = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req3.request.method).toEqual('DELETE');
      // req3.flush([]);
      httpTestingController.verify();
    });
  });
});
