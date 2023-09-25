import { HttpClient
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { DialPlanNewComponent } from './dial-plan-new.component';

describe('DialPlanNewComponent', () => {
  let component: DialPlanNewComponent;
  let fixture: ComponentFixture<DialPlanNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialPlanNewComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [TranslateService, FormBuilder, HttpClient, SsoAuthService, CommonService, Title]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialPlanNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
