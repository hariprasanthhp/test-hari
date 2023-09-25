import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { ApiService } from 'src/app/shared/services/api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { FileService } from 'src/app/support/netops-management/operations/services/files.service';
import { HSIService } from '../cco-foundation-service/hsi.service';
import { FoundationManageService } from '../foundation-systems/foundation-manage/foundation-manage.service';

import { FoundationHeaderComponent } from './foundation-header.component';

describe('FoundationHeaderComponent', () => {
  let component: FoundationHeaderComponent;
  let fixture: ComponentFixture<FoundationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationHeaderComponent],
      imports: [HttpClientTestingModule
, RouterTestingModule, NgSelectModule, SharedUtilsModule],
      providers: [TranslateService, SsoAuthService,
        DataServiceService,
        ChangeDetectorRef,
        NgbModal, ApiService,
        FileService, SsoAuthService,
        HSIService,
        FoundationManageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
