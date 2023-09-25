import { HttpClient,HttpClientModule
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';

import { CcoOrgAdminComponent } from './cco-org-admin.component';

describe('CcoOrgAdminComponent', () => {
  let component: CcoOrgAdminComponent;
  let fixture: ComponentFixture<CcoOrgAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoOrgAdminComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, NgSelectModule
      ],
      providers: [
        CcoOrgAdminService, TranslateService,
        DataServiceService, SsoAuthService, HttpClient]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoOrgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
