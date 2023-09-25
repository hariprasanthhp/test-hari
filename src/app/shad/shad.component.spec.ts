import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';

import { ShadComponent } from './shad.component';
import { ShadModule } from './shad.module';

describe('ShadComponent', () => {
  let component: ShadComponent;
  let fixture: ComponentFixture<ShadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShadComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ShadModule],
      providers: [SsoAuthService, Title, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
