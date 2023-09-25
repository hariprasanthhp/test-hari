import { HttpClientModule
, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrgSecureAccessService } from 'src/app/sys-admin/services/org-secure-access.service';

import { OrgAccessComponent } from './org-access.component';

describe('OrgAccessComponent', () => {
  let component: OrgAccessComponent;
  let fixture: ComponentFixture<OrgAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAccessComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [HttpClient, CustomTranslateService, SsoAuthService, OrgSecureAccessService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
