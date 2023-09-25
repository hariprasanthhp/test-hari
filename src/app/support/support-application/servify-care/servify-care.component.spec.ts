import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { claimsmock, emailMock, servifyhealth, servifyinfomock } from 'src/assets/mockdata/support/edge-suites/servify-care';
import { DataServiceService } from '../../data.service';
import { ServifyService } from '../shared/service/servify.service';
import * as Quill from 'quill';
import { ServifyCareComponent } from './servify-care.component';

describe('ServifyCareComponent', () => {
  let component: ServifyCareComponent;
  let fixture: ComponentFixture<ServifyCareComponent>;
  let servifyService: ServifyService;
  let sso: SsoAuthService;
  let dataService: DataServiceService;
  let translateService: TranslateService;
  let callOutComeService: CallOutComeService;
  let modalService: NgbModal;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServifyCareComponent],
      imports: [RouterTestingModule
        , SharedModule, HttpClientTestingModule],
      providers: [SsoAuthService, ServifyService, Title],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        servifyService = TestBed.inject(ServifyService);
        sso = TestBed.inject(SsoAuthService);
        dataService = TestBed.inject(DataServiceService);
        translateService = TestBed.inject(TranslateService);
        callOutComeService = TestBed.inject(CallOutComeService);
        modalService = TestBed.inject(NgbModal);
        fixture = TestBed.createComponent(ServifyCareComponent);
        component = fixture.componentInstance;
        component.fFamily = Quill.import('attributors/style/font');
        component.fSize = Quill.import('attributors/style/size');
        fixture.detectChanges();
      })
  });

  // it('ngOnInit', () => {
  //   component.ngOnInit();
  //   Quill.register(component.fFamily, true);
  //   Quill.register(component.fSize, true);
  //   component.initialLoad();
  //   fixture.detectChanges();
  // })

  // it('initialLoad', () => {
  //   spyOn(servifyService, 'getServifyInfo').and.returnValue(of(servifyinfomock));
  //   component.initialLoad();
  //   fixture.detectChanges();
  // })

  // it('initialLoad', () => {
  //   spyOn(servifyService, 'getServifyInfo').and.returnValue(throwError(errorStatus401));
  //   component.initialLoad();
  //   fixture.detectChanges();
  // })

  // it('ClaimsEligible', () => {
  //   component.ClaimsEligible('2022-11-28',undefined,undefined);
  //   fixture.detectChanges();
  // })

  // it('ClaimsEligible', () => {
  //   component.ClaimsEligible('2022-11-28','2022-12-28',undefined);
  //   fixture.detectChanges();
  // })

  // it('monthDiff', () => {
  //   let d1 = new Date();
  //   let d2 = new Date().setFullYear(d1.getFullYear() + 4);
  //   let d3 = new Date(d2)
  //   component.monthDiff(d1,d3);
  //   fixture.detectChanges();
  // })

  // it('getClaims', () => {
  //   spyOn(servifyService, 'getServifyClaims').and.returnValue(of(claimsmock));
  //   component.getClaims("bcb94f5b-88d0-4e02-8829-9f9aaca592a1");
  //   fixture.detectChanges();
  // })


  // it('getClaims', () => {
  //   spyOn(servifyService, 'getServifyClaims').and.returnValue(throwError(errorStatus401));
  //   component.getClaims("bcb94f5b-88d0-4e02-8829-9f9aaca592a1");
  //   fixture.detectChanges();
  // })

  // it('showClaimStatus', () => {
  //   component.showClaimStatus('SC0059');
  //   fixture.detectChanges();
  // })

  // it('getHealth', () => {
  //   spyOn(servifyService, 'getServifyHealth').and.returnValue(of(servifyhealth));
  //   component.getHealth();
  //   fixture.detectChanges();
  // })

  // it('getHealth', () => {
  //   spyOn(servifyService, 'getServifyHealth').and.returnValue(throwError(errorStatus401));
  //   component.getHealth();
  //   fixture.detectChanges();
  // })

  // it('escalationProcessModalOpen', () => {
  //   component.escalationProcessModalOpen();
  //   fixture.detectChanges();
  // })

  // it('copyToClipboard', fakeAsync(() => {
  //   document.getElementById('servifyTemplateSubject');
  //   component.copyToClipboard();
  //   component.copyForOldBrowser('Subject:\n');
  //   tick(2000);
  //   fixture.detectChanges();
  // }))

  // it('copyForOldBrowser', () => {
  //   component.copyForOldBrowser('Subject:\n');
  //   fixture.detectChanges();
  // })

  // it('escalationProcessEditorModal', () => {
  //   spyOn(servifyService, 'getUserEmail').and.returnValue(of(emailMock));
  //   component.escalationProcessEditorModal();
  //   fixture.detectChanges();
  // })

  // it('escalationProcessEditorModal', () => {
  //   spyOn(servifyService, 'getUserEmail').and.returnValue(throwError(errorStatus401));
  //   component.escalationProcessEditorModal();
  //   fixture.detectChanges();
  // })


  // it('sendEmail', () => {
  //   component.sendTo = 'abcd@gmail.com';
  //   spyOn(servifyService, 'sendEmail').and.returnValue(of("success"));
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

  // it('sendEmail', () => {
  //   spyOn(servifyService, 'sendEmail').and.returnValue(throwError(errorStatus401));
  //   component.sendEmail();
  //   fixture.detectChanges();
  // })

});
