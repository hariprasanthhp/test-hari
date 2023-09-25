import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import {  barkgetaccount, barkgetaccountmock, barkgethealth } from 'src/assets/mockdata/support/edge-suites/bark';
import { DataServiceService } from '../../data.service';
import { BarkService } from '../shared/service/bark.service';

import { BarkComponent } from './bark.component';

describe('BarkComponent', () => {
  let component: BarkComponent;
  let fixture: ComponentFixture<BarkComponent>;
  // let translateService: TranslateService;
  let dataService: DataServiceService;
  let modalService: NgbModal;
  let titleService: Title;
  let service: BarkService;
  let sso: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarkComponent ],
      imports: [RouterTestingModule
        , SharedModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule],
      providers: [DataServiceService, BarkService, Title, NgbModal]
    })
    .compileComponents()
    .then(()=>{
    //  translateService = TestBed.inject(TranslateService);
     dataService = TestBed.inject(DataServiceService);
     modalService = TestBed.inject(NgbModal);
     titleService = TestBed.inject(Title);
     service = TestBed.inject(BarkService);
      sso = TestBed.inject(SsoAuthService);
     fixture = TestBed.createComponent(BarkComponent);
     component = fixture.componentInstance;
    //  const mailSubject = `Calix Partner Escalation from ${localStorage.setItem('calix.login_data',JSON.stringify(calixloginDataMock))} ${this.CSR_Data.lastName} at ${this.CSR_Data.OrgName}`;
    //  localStorage.setItem('calix.login_data',JSON.stringify(calixloginDataMock))
     fixture.detectChanges();
    })
  });

  // it('should initialized bark onInit()', () => {
  //   component.ngOnInit();
  //   component.getAccount();
  //   component.getHealth();
  //   expect(component.getAccount).toHaveBeenCalled();
  //   expect(component.getHealth).toHaveBeenCalled();
  //   fixture.detectChanges();
  // })

  // it('bark get account', () => {
  //   spyOn(service,'getBarkAccount').and.returnValue(of(barkgetaccount));
  //   component.getAccount();
  //   expect(component.userId).toEqual(barkgetaccount.bark.userId);
  //   fixture.detectChanges();
  // })

  // it('bark get account', () => {
  //   spyOn(service,'getBarkAccount').and.returnValue(throwError(errorStatus401));
  //   component.getAccount();
  //   fixture.detectChanges();
  // })

  // it('bark get health', () => {
  //   spyOn(service,'getBarkHealth').and.returnValue(of(barkgethealth));
  //   component.getHealth();
  //   component.loading = false;
  //   expect(component.health[0].health_name).toEqual(barkgethealth.healths[0].health_name);
  //   fixture.detectChanges();
  // })

  // it('bark get health', () => {
  //   spyOn(service,'getBarkHealth').and.returnValue(throwError(errorStatus401));
  //   component.getHealth();
  //   fixture.detectChanges();
  // })

  // it('bark get account setup', () => {
  //   spyOn(service,'getBarkAccountSetup').and.returnValue(of(barkgetaccountmock));
  //   component.userId = "33db2b5b-4835-4cd3-bb29-a78e8bdfc5d1";
  //   component.getBarkAccountSetup("33db2b5b-4835-4cd3-bb29-a78e8bdfc5d1");
  //   fixture.detectChanges();
  // })

  // it('bark get account setup error', () => {
  //   spyOn(service,'getBarkAccountSetup').and.returnValue(throwError(errorStatus401));
  //   component.userId = "33db2b5b-4835-4cd3-bb29-a78e8bdfc5d1";
  //   component.getBarkAccountSetup("33db2b5b-4835-4cd3-bb29-a78e8bdfc5d1");
  //   fixture.detectChanges();
  // })

  // it('escalationProcessModalOpen', () => {
  //   component.escalationProcessModalOpen();
  //   fixture.detectChanges();
  // })

  // it('escalationProcessEditorModal', () => {
  //   spyOn(service, 'getUserEmail').and.returnValue(of(barkEmailMock));
  //   component.escalationProcessEditorModal();
  //   fixture.detectChanges();
  // })

  // it('escalationProcessEditorModal', () => {
  //   spyOn(service, 'getUserEmail').and.returnValue(throwError(errorStatus401));
  //   component.escalationProcessEditorModal();
  //   fixture.detectChanges();
  // })

  // it('copyToClipboard', fakeAsync(() => {
  //   document.getElementById('#barkTemplateBody');
  //   component.copyToClipboard();
  //   component.copyForOldBrowser('Subject:\n');
  //   tick(2000);
  //   fixture.detectChanges();
  // }))

  // it('copyForOldBrowser', () => {
  //   component.copyForOldBrowser('Subject:\n');
  //   fixture.detectChanges();
  // })

  // it('pageErrorHandle', () => {
  //   component.pageErrorHandle(errorStatus401);
  //   fixture.detectChanges();
  // })

  // it('sendEmail', () => {
  //   component.sendTo = 'abcd@gmail.com';
  //   spyOn(service, 'sendEmail').and.returnValue(of("success"));
  //   component.sendEmail();
  //   fixture.detectChanges();
  // })

  // it('patternCheck', () => {
  //   component.patternCheck("calix@gmail.com");   
  //   fixture.detectChanges();
  // })
  // it('patternCheck', () => {
  //   component.patternCheck("calix.com");   
  //   fixture.detectChanges();
  // })
});
