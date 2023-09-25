import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from '../foundation-manage.service';

import { FoundationSystemListComponent } from './foundation-system-list.component';

describe('FoundationSystemListComponent', () => {
  let component: FoundationSystemListComponent;
  let fixture: ComponentFixture<FoundationSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationSystemListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService,
        CommonFunctionsService,
        NgbModal,
        CcoCommonService,
        CommonService,
        CcoSystemService,
        ExportExcelService,
        FoundationManageService,
        AddSubscriberService,
        FormBuilder,
        ChangeDetectorRef,
        SupportRouterService,
        DataServiceService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
