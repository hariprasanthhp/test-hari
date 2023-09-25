import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { OrgAdminSideMenuComponent } from './org-admin-side-menu.component';

describe('OrgAdminSideMenuComponent', () => {
  let component: OrgAdminSideMenuComponent;
  let fixture: ComponentFixture<OrgAdminSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminSideMenuComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [CustomTranslateService, TranslateService, CommonService, SsoAuthService, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
