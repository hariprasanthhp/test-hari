import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Edgesuite } from 'src/assets/mockdata/support/netops-management/configuration/edgesuite.data';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from '../../netops-management.service';

import { EdgeSuiteComponent } from './edge-suite.component';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('EdgeSuiteComponent', () => {
  let component: EdgeSuiteComponent;
  let fixture: ComponentFixture<EdgeSuiteComponent>;
  let netopsService: NetopsServiceService;
  let Sso: SsoAuthService;
  let httpTestingController :HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdgeSuiteComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService, NgbModal, SsoAuthService, NetopsServiceService, Title
      ]
    })
      .compileComponents()
      .then(() => {
        netopsService = TestBed.inject(NetopsServiceService);
        Sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(EdgeSuiteComponent);
        component = fixture.componentInstance;
        component.ORG_ID = '470053';
        fixture.detectChanges()
      });
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'closeAlert').and.callThrough(); 
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalledTimes(1);
  })

  it('should get the edge suite data', () => {
    spyOn(netopsService, 'getIqSuites').and.returnValue(of(Edgesuite))
    component.getSettings();
     //console.log(component.settings);
     expect(component.settings).toBeTruthy("No data available");
  });

  it('checks checkbox Protect IQ change event',fakeAsync(()=>{
    component.sso.getAuthTokenByRT().pipe(
      tap((res: any) => {
        let entitlementdata = Sso.manageEntitlements(res.entitlements);
        console.log(entitlementdata);
        
      }, (err: any) => {
        // component.refreshTokenInProgress = false;
      }),
        );
        
    // component.sso.getEntitlementsArr().indexOf('203') = 1
    // component.sso.getEntitlementsArr().indexOf('204') == 1
    // component.sso.getEntitlementsArr().indexOf('203') == 1
    //let myCheckBox = document.getElementById("subscribedToProtectIq");
    if(Sso.getEntitlementsArr().indexOf('203') > -1 || Sso.getEntitlementsArr().indexOf('205') > -1) {
    let myCheckBox = fixture.debugElement.query(By.css('#subscribedToProtectIq'));
    //let myCheckBox = fixture.nativeElement.querySelector('#subscribedToProtectIq');
    //let myCheckBox = debugElement.nativeElement.querySelector(subscribedToProtectIq);
    
    // change this line
    spyOn(component, 'save').and.callThrough(); 
    // // change this line as well to mock the object
    myCheckBox.triggerEventHandler('change', { target: { checked: true }});
    tick();
    fixture.detectChanges();
    expect(component.loading).toBeTrue();
    // expect(component.save).toHaveBeenCalled();
    }
   }));

   it('checks checkbox Experience IQ change event',fakeAsync(()=>{
    component.sso.getAuthTokenByRT().pipe(
      tap((res: any) => {
        let entitlementdata = Sso.manageEntitlements(res.entitlements);
        console.log(entitlementdata);
        
      }, (err: any) => {
        // component.refreshTokenInProgress = false;
      }),
        );
        
    // component.sso.getEntitlementsArr().indexOf('203') = 1
    // component.sso.getEntitlementsArr().indexOf('204') == 1
    // component.sso.getEntitlementsArr().indexOf('203') == 1
    //let myCheckBox = document.getElementById("subscribedToExperienceIq");
    if(Sso.getEntitlementsArr().indexOf('204') > -1 || Sso.getEntitlementsArr().indexOf('205') > -1) {
    let myCheckBox = fixture.debugElement.query(By.css('#subscribedToExperienceIq'));
    //let myCheckBox = fixture.nativeElement.querySelector('#subscribedToExperienceIq');
    //let myCheckBox = debugElement.nativeElement.querySelector(subscribedToExperienceIq);
    
    // change this line
    spyOn(component, 'save').and.callThrough(); 
    // // change this line as well to mock the object
    myCheckBox.triggerEventHandler('change', { target: { checked: true }});
    tick();
    fixture.detectChanges();
    expect(component.loading).toBeTrue();
    // expect(component.save).toHaveBeenCalled();
    }
   }));
});
