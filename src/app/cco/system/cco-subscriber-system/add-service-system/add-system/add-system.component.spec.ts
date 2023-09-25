import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddSubscriberService } from '../add-subscriber.service';

import { AddSystemComponent } from './add-system.component';

describe('AddSystemComponent', () => {
  let component: AddSystemComponent;
  let fixture: ComponentFixture<AddSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSystemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, FormBuilder, FoundationDataService, CommonFunctionsService, CommonService, ManagementService, UriValidatorService, FoundationManageService, SsoAuthService, NgbModal, AddSubscriberService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
