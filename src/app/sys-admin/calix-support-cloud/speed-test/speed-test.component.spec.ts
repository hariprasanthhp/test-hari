import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { OrganizationApiService } from '../../services/organization-api.service';

import { SpeedTestComponent } from './speed-test.component';

describe('SpeedTestComponent', () => {
  let component: SpeedTestComponent;
  let fixture: ComponentFixture<SpeedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeedTestComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        CommonService, OrganizationApiService, SsoAuthService, TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
