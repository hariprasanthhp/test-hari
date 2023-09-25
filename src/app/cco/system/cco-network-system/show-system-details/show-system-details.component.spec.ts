import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetworkSystemsApiService } from '../../services/network-systems-api.service';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ShowSystemDetailsComponent } from './show-system-details.component';

describe('ShowSystemDetailsComponent', () => {
  let component: ShowSystemDetailsComponent;
  let fixture: ComponentFixture<ShowSystemDetailsComponent>;

  beforeEach(() => {
    const routerStub = () => ({
      navigate: array => ({}),
      serializeUrl: arg => ({}),
      createUrlTree: (array, object) => ({})
    });
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) },
      de_DE: {},
      fr: {},
      es: {}
    });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    const networkSystemsApiServiceStub = () => ({
      getSystemController: uuid => ({ pipe: () => ({}) }),
      getCardDetails: arg => ({ pipe: () => ({}) }),
      sortStringHavingSplChar: (data, string) => ({}),
      secondsToDhms: arg => ({}),
      getCardInterfaceSummary: (card, arg) => ({ subscribe: f => f({}) })
    });
    const titleStub = () => ({ setTitle: arg => ({}) });
    const ssoAuthServiceStub = () => ({ getScopes: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ShowSystemDetailsComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: NetworkSystemsApiService,
          useFactory: networkSystemsApiServiceStub
        },
        { provide: Title, useFactory: titleStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub }
      ]
    });
    spyOn(ShowSystemDetailsComponent.prototype, 'tableLanguageOptions');
    spyOn(ShowSystemDetailsComponent.prototype, 'setPageTitle');
    spyOn(ShowSystemDetailsComponent.prototype, 'setApiToCall');
    spyOn(ShowSystemDetailsComponent.prototype, 'modifyInfo');
    spyOn(ShowSystemDetailsComponent.prototype, 'setSystemcontrollerColumns');
    fixture = TestBed.createComponent(ShowSystemDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`openCoverages has default value`, () => {
    expect(component.openCoverages).toEqual(false);
  });

  it(`indexSelectedCoverage has default value`, () => {
    expect(component.indexSelectedCoverage).toEqual(1);
  });

  it(`dataRefresh has default value`, () => {
    expect(component.dataRefresh).toEqual(false);
  });

  it(`selectedSlot has default value`, () => {
    expect(component.selectedSlot).toEqual([]);
  });

  it(`interfaceSummaryLoader has default value`, () => {
    expect(component.interfaceSummaryLoader).toEqual(false);
  });

  it(`redenderOnce has default value`, () => {
    expect(component.redenderOnce).toEqual(false);
  });

  it(`isAxos has default value`, () => {
    expect(component.isAxos).toEqual(false);
  });

  it(`canShowHeaderButtons has default value`, () => {
    expect(component.canShowHeaderButtons).toEqual(true);
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

  // fdescribe('constructor', () => {
  //   it('makes expected calls', () => {
  //     expect(
  //       ShowSystemDetailsComponent.prototype.tableLanguageOptions
  //     ).toHaveBeenCalled();
  //     expect(
  //       ShowSystemDetailsComponent.prototype.setPageTitle
  //     ).toHaveBeenCalled();
  //     expect(
  //       ShowSystemDetailsComponent.prototype.setApiToCall
  //     ).toHaveBeenCalled();
  //     expect(
  //       ShowSystemDetailsComponent.prototype.modifyInfo
  //     ).toHaveBeenCalled();
  //     expect(
  //       ShowSystemDetailsComponent.prototype.setSystemcontrollerColumns
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      // spyOn(component, 'validateScopes');
      // spyOn(component, 'setPageTitle');
      // spyOn(component, 'setApiToCall');
      // (<jasmine.Spy>component.setPageTitle).calls.reset();
      // (<jasmine.Spy>component.setApiToCall).calls.reset();
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      // expect(component.validateScopes).toHaveBeenCalled();
      // expect(component.setPageTitle).toHaveBeenCalled();
      // expect(component.setApiToCall).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  describe('setPageTitle', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(titleStub, 'setTitle').and.callThrough();
      (<jasmine.Spy>component.setPageTitle).and.callThrough();
      component.setPageTitle();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  describe('gotoEdit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.gotoEdit();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('gotoList', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.gotoList();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('goToActiveAlarms', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'serializeUrl').and.callThrough();
      spyOn(routerStub, 'createUrlTree').and.callThrough();
      component.goToActiveAlarms();
      expect(routerStub.serializeUrl).toHaveBeenCalled();
      expect(routerStub.createUrlTree).toHaveBeenCalled();
    });
  });

  describe('validateScopes', () => {
    it('makes expected calls', () => {
      const ssoAuthServiceStub: SsoAuthService = fixture.debugElement.injector.get(
        SsoAuthService
      );
      spyOn(ssoAuthServiceStub, 'getScopes').and.callThrough();
      component.validateScopes();
      expect(ssoAuthServiceStub.getScopes).toHaveBeenCalled();
    });
  });
});
