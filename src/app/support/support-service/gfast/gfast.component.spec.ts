import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportServiceService } from '../services/support-service.service';

import { GfastComponent } from './gfast.component';
import { gfastapidata,deviceInfo,gfastapidataerror } from 'src/assets/mockdata/support/support-service/gfast.service';
import { of ,throwError} from 'rxjs';

describe('GfastComponent', () => {
  let component: GfastComponent;
  let fixture: ComponentFixture<GfastComponent>;
  let dataservice : SupportServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GfastComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[SsoAuthService,TranslateService,SupportServiceService]
    })
    .compileComponents()
    .then(() => {
      dataservice = TestBed.inject(SupportServiceService);
      fixture = TestBed.createComponent(GfastComponent);
    //  component.serialNumberSelected='CXNK00A0D228'
     // component.orgId='470053'
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gfast functions with onInit flow', () => {
    sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));

    spyOn(component,'gfastData').and.callThrough();
    spyOn(dataservice, 'getGfastData').and.returnValue(of(gfastapidata))
    expect(component).toBeTruthy();

    component.ngOnInit();
    fixture.detectChanges();
   
  })
  it('getGfastData function', () => {
   // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.gfastData();
    spyOn(dataservice, 'getGfastData').and.returnValue(of(gfastapidata))
    expect(component).toBeTruthy();   
  })
  it('getGfastData error handling', () => {
    component.gfastData();
    spyOn(dataservice, 'getGfastData').and.returnValue(throwError(gfastapidataerror));
    expect(component).toBeTruthy();   

  })
  it('getGfastData function err case', () => {
    component.gfastCollection = []
    component.gfastData();
    expect(component).toBeTruthy();   

  })
    it('pageErrorHandle function', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(gfastapidataerror);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });


 
});
