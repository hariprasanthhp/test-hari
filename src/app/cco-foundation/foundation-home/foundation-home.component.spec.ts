import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CcoFoundationModule } from '../cco-foundation.module';

import { FoundationHomeComponent } from './foundation-home.component';
import { FoundationHomeService } from './foundation-home.service';

describe('FoundationHomeComponent', () => {
  let component: FoundationHomeComponent;
  let fixture: ComponentFixture<FoundationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationHomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, CcoFoundationModule],
      providers: [TranslateService, SsoAuthService, NgbModal, FoundationHomeService, NetopsServiceService, Title]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
