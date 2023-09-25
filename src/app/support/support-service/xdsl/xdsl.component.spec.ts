import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportServiceService } from '../services/support-service.service';
import { SupportServiceComponent } from '../support-service.component';
import { xdslapidata, deviceInfo, xdsltapidataerror } from 'src/assets/mockdata/support/support-service/xdsl/xdsl.service';

import { XdslComponent } from './xdsl.component';
import { of ,throwError } from 'rxjs';
describe('XdslComponent', () => {
  let component: XdslComponent;
  let fixture: ComponentFixture<XdslComponent>;
  let dataservice: SupportServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XdslComponent],
      imports: [RouterTestingModule
        , HttpClientTestingModule],
      providers: [SsoAuthService, SupportServiceService, TranslateService]
    })
      .compileComponents()
      .then(() => {
        dataservice = TestBed.inject(SupportServiceService);
        fixture = TestBed.createComponent(XdslComponent);
        //  component.serialNumberSelected='CXNK00A0D228'
        // component.orgId='470053'
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XdslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('xdsl functions with onInit flow', () => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));

    spyOn(component, 'onRefresh').and.callThrough();
    spyOn(dataservice, 'getXsdlDetails').and.returnValue(of(xdslapidata))
    spyOn(component, 'resetTable').and.callThrough();
    expect(component).toBeTruthy();

    component.ngOnInit();
    fixture.detectChanges();

  })

  it('xdsl function', () => {
    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.onRefresh();
    spyOn(dataservice, 'getXsdlDetails').and.returnValue(of(xdslapidata))
    expect(component).toBeTruthy();
  })
  it('xdsl error handling', () => {
    component.onRefresh();
    spyOn(dataservice, 'getXsdlDetails').and.returnValue(throwError(xdsltapidataerror));
    expect(component).toBeTruthy();

  })
  /*it('xdsl function err case', () => {
    component.gfastCollection = []
    component.onRefresh();
    expect(component).toBeTruthy();

  })*/
  it('pageErrorHandle function', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(xdsltapidataerror);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

});
