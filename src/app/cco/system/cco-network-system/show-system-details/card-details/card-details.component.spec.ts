import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetworkSystemsApiService } from '../../../services/network-systems-api.service';
import { FormsModule } from '@angular/forms';
import { CardDetailsComponent } from './card-details.component';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;

  beforeEach(() => {
    const routerStub = () => ({
      serializeUrl: arg => ({}),
      createUrlTree: (array, object) => ({})
    });
    const shortnumberPipeStub = () => ({ transform: (value, arg) => ({}) });
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) },
      de_DE: {},
      fr: {},
      es: {}
    });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    const networkSystemsApiServiceStub = () => ({
      getInterfaceDetails: cardDetails => ({ pipe: () => ({}) }),
      getNfaOntList: (cardDetails, reportTypeSelected) => ({
        subscribe: f => f({})
      }),
      getOntDetails: (cardDetails, ont) => ({ subscribe: f => f({}) }),
      secondsToDhms: upTime => ({}),
      bitsToSize: (value, arg, number) => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CardDetailsComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ShortnumberPipe, useFactory: shortnumberPipeStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: NetworkSystemsApiService,
          useFactory: networkSystemsApiServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`redenderOnce has default value`, () => {
    expect(component.redenderOnce).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`ontDetailsLoader has default value`, () => {
    expect(component.ontDetailsLoader).toEqual(false);
  });

  it(`reportTypes has default value`, () => {
    expect(component.reportTypes).toEqual([{name:'Checked In and Not Checked In',value:'DEVICE_CHECKED_IN_AND_NOT_CHECKED_IN'},
    {name:'Systems Checked In',value:'DEVICE_CHECKED_IN'},
    {name:'Systems Not Checked In',value:'DEVICE_NOT_CHECKED_IN'}]);
  });

  it(`reportTypeSelected has default value`, () => {
    expect(component.reportTypeSelected).toEqual(
      `DEVICE_CHECKED_IN_AND_NOT_CHECKED_IN`
    );
  });

  it(`isICLPort has default value`, () => {
    expect(component.isICLPort).toEqual(false);
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
      spyOn(component, 'tableLanguageOptions');
      spyOn(component, 'callInterfaceAPIS');
      component.ngOnInit();
      expect(component.tableLanguageOptions).toHaveBeenCalled();
      expect(component.callInterfaceAPIS).toHaveBeenCalled();
    });
  });

  // fdescribe('callInterfaceAPIS', () => {
  //   it('makes expected calls', () => {
  //     const networkSystemsApiServiceStub: NetworkSystemsApiService = fixture.debugElement.injector.get(
  //       NetworkSystemsApiService
  //     );
  //     spyOn(component, 'getInterfaceDetails')
  //     spyOn(
  //       networkSystemsApiServiceStub,
  //       'getInterfaceDetails'
  //     )
  //     component.callInterfaceAPIS();
  //     expect(component.getInterfaceDetails).toHaveBeenCalled();
  //     expect(
  //       networkSystemsApiServiceStub.getInterfaceDetails
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('getNfaOntList', () => {
    it('makes expected calls', () => {
      const networkSystemsApiServiceStub: NetworkSystemsApiService = fixture.debugElement.injector.get(
        NetworkSystemsApiService
      );
      spyOn(component, 'getOntList').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      spyOn(networkSystemsApiServiceStub, 'getNfaOntList').and.callThrough();
      component.getNfaOntList();
      expect(component.getOntList).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      expect(networkSystemsApiServiceStub.getNfaOntList).toHaveBeenCalled();
    });
  });

  describe('goToHealth', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'serializeUrl').and.callThrough();
      spyOn(routerStub, 'createUrlTree').and.callThrough();
      component.goToHealth();
      expect(routerStub.serializeUrl).toHaveBeenCalled();
      expect(routerStub.createUrlTree).toHaveBeenCalled();
    });
  });
});
