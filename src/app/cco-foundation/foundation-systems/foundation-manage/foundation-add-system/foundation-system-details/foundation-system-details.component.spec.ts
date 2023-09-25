import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from '../../foundation-manage.service';

import { FoundationSystemDetailsComponent } from './foundation-system-details.component';

describe('FoundationSystemDetailsComponent', () => {
  let component: FoundationSystemDetailsComponent;
  let fixture: ComponentFixture<FoundationSystemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationSystemDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService,
        NgbModal,
        FoundationManageService,
        CommonService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
