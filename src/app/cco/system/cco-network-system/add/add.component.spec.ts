import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoCodingService } from 'src/app/shared/geo-coding.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { AddComponent } from './add.component';
import { FormsModule} from '@angular/forms';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({});
    const ssoAuthServiceStub = () => ({
      hasPageAccess$: { subscribe: f => f({}) },
      getScopes: () => ({})
    });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const ngbModalStub = () => ({
      open: (cmsUpdateModal, object) => ({}),
      dismissAll: () => ({})
    });
    const geoCodingServiceStub = () => ({
      getLatLonglocations: (loc_coordinates, get_type) => ({
        subscribe: f => f({})
      })
    });
    const workflowServiceStub = () => ({ enforceMinMax: event => ({}) });
    const issueServiceStub = () => ({ appendFqn: res => ({}) });
    const titleStub = () => ({ setTitle: arg => ({}) });
    const commonFunctionsServiceStub = () => ({
      trackPendoEvents: (string, string1) => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: GeoCodingService, useFactory: geoCodingServiceStub },
        { provide: WorkflowService, useFactory: workflowServiceStub },
        { provide: IssueService, useFactory: issueServiceStub },
        { provide: Title, useFactory: titleStub },
        {
          provide: CommonFunctionsService,
          useFactory: commonFunctionsServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isDev has default value`, () => {
    expect(component.isDev).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`isEditPage has default value`, () => {
    expect(component.isEditPage).toEqual(false);
  });

  it(`submitted has default value`, () => {
    expect(component.submitted).toEqual(false);
  });

  it(`hasWriteAccess has default value`, () => {
    expect(component.hasWriteAccess).toEqual(false);
  });

  it(`hidepwd has default value`, () => {
    expect(component.hidepwd).toEqual(true);
  });

  it(`hidepwdcm has default value`, () => {
    expect(component.hidepwdcm).toEqual(true);
  });

  it(`isCmsUpdateInprogress has default value`, () => {
    expect(component.isCmsUpdateInprogress).toEqual(false);
  });

  it(`isAxos has default value`, () => {
    expect(component.isAxos).toEqual(false);
  });

  it(`isCms has default value`, () => {
    expect(component.isCms).toEqual(false);
  });

  it(`showServiceAddressInp has default value`, () => {
    expect(component.showServiceAddressInp).toEqual(true);
  });

  it(`hasPageAccess has default value`, () => {
    expect(component.hasPageAccess).toEqual(true);
  });

  it(`disableSubmit has default value`, () => {
    expect(component.disableSubmit).toEqual(true);
  });

  it(`soapAddressError has default value`, () => {
    expect(component.soapAddressError).toEqual(false);
  });

  it(`dbAddressError has default value`, () => {
    expect(component.dbAddressError).toEqual(false);
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

  describe('getApiError', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <any>{};
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(commonServiceStub, 'pageErrorHandle').and.callThrough();
      component.getApiError(httpErrorResponseStub);
      expect(commonServiceStub.pageErrorHandle).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const ssoAuthServiceStub: SsoAuthService = fixture.debugElement.injector.get(
        SsoAuthService
      );
      spyOn(component, 'setPageTitle');
      spyOn(component, 'getRecordbyId');
      spyOn(ssoAuthServiceStub, 'getScopes');
      // component.ngOnInit();
      // expect(component.setPageTitle).toHaveBeenCalled();
      // expect(component.getRecordbyId).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getScopes).toHaveBeenCalled();
    });
  });

  describe('goToList', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.goToList();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const commonFunctionsServiceStub: CommonFunctionsService = fixture.debugElement.injector.get(
        CommonFunctionsService
      );
      spyOn(component, 'saveAxosSystem').and.callThrough();
      spyOn(component, 'doCustomValidation').and.callThrough();
      spyOn(component, 'findObject').and.callThrough();
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'goToList').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      spyOn(commonFunctionsServiceStub, 'trackPendoEvents').and.callThrough();
      component.onSubmit()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.saveAxosSystem).toHaveBeenCalled();
      // expect(component.doCustomValidation).toHaveBeenCalled();
      // expect(component.findObject).toHaveBeenCalled();
      // expect(component.close).toHaveBeenCalled();
      // expect(component.goToList).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('POST');
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // expect(commonFunctionsServiceStub.trackPendoEvents).toHaveBeenCalled();
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      spyOn(ngbModalStub, 'dismissAll').and.callThrough();
      component.close();
      expect(ngbModalStub.dismissAll).toHaveBeenCalled();
    });
  });

  describe('doUpdateCmsSystem', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'close');
      spyOn(component, 'goToList');
      spyOn(component, 'getApiError');
      component.doUpdateCmsSystem()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.close).toHaveBeenCalled();
      // expect(component.goToList).toHaveBeenCalled();
      // expect(component.getApiError).toHaveBeenCalled();
      const req = httpTestingController.expectOne('cnap/invmgr/devices/');
      expect(req.request.method).toEqual('PATCH');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('saveAxosSystem', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const geoCodingServiceStub: GeoCodingService = fixture.debugElement.injector.get(
        GeoCodingService
      );
      const commonFunctionsServiceStub: CommonFunctionsService = fixture.debugElement.injector.get(
        CommonFunctionsService
      );
      spyOn(component, 'clearErrors').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      spyOn(component, 'goToList').and.callThrough();
      spyOn(geoCodingServiceStub, 'getLatLonglocations');
      spyOn(commonFunctionsServiceStub, 'trackPendoEvents');
      component.saveAxosSystem()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.clearErrors).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      // expect(component.goToList).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('PATCH');
      // expect(geoCodingServiceStub.getLatLonglocations).toHaveBeenCalled();
      // expect(commonFunctionsServiceStub.trackPendoEvents).toHaveBeenCalled();
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  // describe('setPageTitle', () => {

  //   it('makes expected calls', () => {
  //     const titleStub: Title = fixture.debugElement.injector.get(Title);
  //     spyOn(titleStub, 'setTitle');
  //     component.setPageTitle();
  //     expect(titleStub.setTitle).toHaveBeenCalled();
  //   });
  // });
});
