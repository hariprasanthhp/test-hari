import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, RouterModule } from '@angular/router';

import { AccountManagementComponent } from './account-management.component';
import { TranslateService } from 'src/app-services/translate.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { Title } from '@angular/platform-browser';

const routes: Routes = [];

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, RouterModule],
      declarations: [AccountManagementComponent],
      providers: [
        TranslateService,
        FormBuilder,
        HttpClient,
        SsoAuthService,
        Title,
        CommonService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});