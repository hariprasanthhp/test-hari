import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { WhitelabelService } from '../service/whitelabel.service';

import { WhitelabelCreateComponent } from './whitelabel-create.component';

describe('WhitelabelCreateComponent', () => {
  let component: WhitelabelCreateComponent;
  let fixture: ComponentFixture<WhitelabelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhitelabelCreateComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, ColorPickerModule, FormsModule],
      providers: [ColorPickerService, WhitelabelService, NgbModal, SsoAuthService, RouterService, TranslateService, CommonService, OrganizationApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
