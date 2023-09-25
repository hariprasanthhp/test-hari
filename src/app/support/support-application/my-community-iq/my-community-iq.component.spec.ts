import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { barkgetaccountmock } from 'src/assets/mockdata/support/edge-suites/bark';
import { alledgedata, micrositeformmock, micrositemock, subinfomock } from 'src/assets/mockdata/support/edge-suites/my-community-iq';
import { MyCommunityService } from '../shared/service/my-community.service';

import { MyCommunityIQComponent } from './my-community-iq.component';

describe('MyCommunityIQComponent', () => {
  let component: MyCommunityIQComponent;
  let fixture: ComponentFixture<MyCommunityIQComponent>;
  let translateService: TranslateService;
  let myCommService: MyCommunityService;
  let modalService: NgbModal;
  let sso: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCommunityIQComponent ],
      imports: [RouterTestingModule
        , SharedModule,HttpClientTestingModule],
      providers: [SsoAuthService, MyCommunityService, Title, NgbModal],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents()
    .then(()=>{
    translateService = TestBed.inject(TranslateService);
     myCommService = TestBed.inject(MyCommunityService);
     sso = TestBed.inject(SsoAuthService);
     fixture = TestBed.createComponent(MyCommunityIQComponent);
     component = fixture.componentInstance;
     component.successWelcome = true;
     component.successReset = true;
     component.microsites = micrositeformmock;
     fixture.detectChanges();
    })
  });

  it('should initialized smarttown wifi onInit()', () => {
    spyOn(sso,'getSubscriberInfo').and.callThrough();
    spyOn(component,'getMyCommunityStatus').and.callThrough()
    component.ngOnInit();
    component.microsites = micrositeformmock;
    expect(sso.getSubscriberInfo).toHaveBeenCalled();
    expect(component.getMyCommunityStatus).toHaveBeenCalled();
    fixture.detectChanges();
  })

  it('smarttown wifi getMyCommunityStatus', () => {
    spyOn(myCommService,'getMyCommunityStatus').and.callThrough();
    spyOn(component,'micrositeApiForm').and.callThrough();
    spyOn(myCommService,'getMicrosites').and.returnValue(of(micrositemock[0].micrositeId));
    component.getMyCommunityStatus();
    component.myCommStatus= alledgedata[0];
    component.subInfo = alledgedata[0].bark;
    component.microsites = micrositeformmock;
    let accountSetup = barkgetaccountmock;
    fixture.debugElement.nativeElement.querySelectorAll("#bark-account-details").innerText = accountSetup;
    // expect(myCommService.getMyCommunityStatus).toHaveBeenCalled();
    expect(component.micrositeApiForm).toBeTruthy();
    expect(component.microsites[0].id).toEqual("250eb5bd-6810-4cb7-b514-ac8f9affe6c7");
    fixture.detectChanges();
  })

  it('smarttown wifi resetMyCommPasswrd()', () => {
    spyOn(myCommService,'resetMyCommPasswrd').and.callThrough();
    component.resetMyCommPasswrd();
    component.loading = false;
    expect(myCommService.resetMyCommPasswrd).toHaveBeenCalled();
    fixture.detectChanges();
  })

});
