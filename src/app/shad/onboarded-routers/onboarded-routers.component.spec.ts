import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ExosReportService } from '../service/exos-report.service';

import { OnboardedRoutersComponent } from './onboarded-routers.component';

describe('OnboardedRoutersComponent', () => {
  let component: OnboardedRoutersComponent;
  let fixture: ComponentFixture<OnboardedRoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedRoutersComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [ExosReportService, SsoAuthService, TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedRoutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
