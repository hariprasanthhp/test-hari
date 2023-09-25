import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { DeviceGroupService } from 'src/app/support/netops-management/operations/services/device-group.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddSubscriberService } from '../add-subscriber.service';

import { AdvancedSystemComponent } from './advanced-system.component';

describe('AdvancedSystemComponent', () => {
  let component: AdvancedSystemComponent;
  let fixture: ComponentFixture<AdvancedSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedSystemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, FormBuilder, FoundationDataService, DeviceGroupService, ProfileService, SsoAuthService, CommonService, FoundationManageService, SsoAuthService, NgbModal, AddSubscriberService, CommonFunctionsService, UriValidatorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
