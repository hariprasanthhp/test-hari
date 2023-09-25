import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OperationsCloudAlarmsComponent } from './operations-cloud-alarms.component';
import { ENGLISH } from 'src/assets/mockdata/language/english';
import { environment } from 'src/environments/environment';
describe('OperationsCloudAlarmsComponent', () => {
  let component: OperationsCloudAlarmsComponent;
  let fixture: ComponentFixture<OperationsCloudAlarmsComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: arg => ({}) });
    const translateServiceStub = () => ({
      fr: {},
      es: {},
      de_DE: {},
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const ssoAuthServiceStub = () => ({
      getScopes: () => ({}),
      setPageAccess: arg => ({}),
      getRedirectModule: url => ({})
    });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    const routerStub = () => ({ url: {} });
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OperationsCloudAlarmsComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(OperationsCloudAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`renderedOnce has default value`, () => {
    expect(component.renderedOnce).toEqual(true);
  });

  it(`isDev has default value`, () => {
    expect(component.isDev).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`severityList has default value`, () => {
    expect(component.severityList).toEqual([{
      name: 'Critical',
      value: 'critical'
    },
    {
      name: 'Major',
      value: 'major'
    },
    {
      name: 'Minor',
      value: 'minor'
    },
    {
      name: 'Warning',
      value: 'warning'
    },
    {
      name: 'Info',
      value: 'info'
    }]);
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
      spyOn(component, 'tableLanguageOptions').and.callThrough();
      spyOn(component, 'rerender').and.callThrough();
      spyOn(component, 'getAlarmListData').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getScopes').and.callThrough();
      spyOn(ssoAuthServiceStub, 'setPageAccess').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getRedirectModule').and.callThrough();
      component.ngOnInit();
      // expect(component.tableLanguageOptions).toHaveBeenCalled();
      // expect(component.rerender).toHaveBeenCalled();
      // expect(component.getAlarmListData).toHaveBeenCalled();
      // expect(titleStub.setTitle).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getScopes).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.setPageAccess).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getRedirectModule).toHaveBeenCalled();
    });
  });

  describe('getAlarmListData', () => {
    it('makes expected calls', () => {
      component.baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'getCustomAlarmListData').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      component.getAlarmListData()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.getCustomAlarmListData).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      const req = httpTestingController.expectOne(`${component.baseUrl}alarmMasterDetails`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);

      // component.getCustomAlarmListData();
      const req1 = httpTestingController.expectOne(`${component.baseUrl}customAlarms`);
      expect(req1.request.method).toEqual('GET');
      req1.flush([]);
      httpTestingController.verify();
    });
  });

  describe('deletePerceivedSeverity', () => {
    it('makes expected calls', () => {
      component.language = ENGLISH;
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'closeModal').and.callThrough();
      spyOn(component, 'getCustomAlarmListData').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      component.deletePerceivedSeverity()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.closeModal).toHaveBeenCalled();
      // expect(component.getCustomAlarmListData).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      const req = httpTestingController.expectOne(`analytics-engine/customAlarm/undefined/customization?newPerceivedSeverity=undefined&originalSeverity=undefined`);
      expect(req.request.method).toEqual('DELETE');
      req.flush('Custom Alarm deleted successfully');
      httpTestingController.verify();
    });
  });
});
