import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';

import { CcoFoundationComponent } from './cco-foundation.component';
import { CcoFoundationModule } from './cco-foundation.module';

describe('CcoFoundationComponent', () => {
  let component: CcoFoundationComponent;
  let fixture: ComponentFixture<CcoFoundationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoFoundationComponent],
      imports: [HttpClientTestingModule
, RouterTestingModule, CcoFoundationModule],
      providers: [TranslateService, SsoAuthService, Title,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
