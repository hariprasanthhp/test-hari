import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsConsentComponent } from './sms-consent.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('SmsConsentComponent', () => {
  let component: SmsConsentComponent;
  let fixture: ComponentFixture<SmsConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsConsentComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService, NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsConsentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
