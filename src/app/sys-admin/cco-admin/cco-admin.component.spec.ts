import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { CcoAdminComponent } from './cco-admin.component';

describe('CcoAdminComponent', () => {
  let component: CcoAdminComponent;
  let fixture: ComponentFixture<CcoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoAdminComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule
      ],
      providers: [
        SsoAuthService, TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
