import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { AdminFoundationService } from '../admin-foundation.service';

import { SystemDeleteSettingsComponent } from './system-delete-settings.component';

describe('SystemDeleteSettingsComponent', () => {
  let component: SystemDeleteSettingsComponent;
  let fixture: ComponentFixture<SystemDeleteSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemDeleteSettingsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, CommonService, NgbModal, SsoAuthService, AdminFoundationService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDeleteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
