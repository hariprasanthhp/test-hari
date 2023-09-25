import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { AppModule } from '../app.module';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { CommonService } from '../sys-admin/services/common.service';
import { SysAdminModule } from '../sys-admin/sys-admin.module';

import { OrgAdminComponent } from './org-admin.component';

describe('OrgAdminComponent', () => {
  let component: OrgAdminComponent;
  let fixture: ComponentFixture<OrgAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAdminComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, AppModule, SysAdminModule],
      providers: [CommonService, Title, SsoAuthService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
