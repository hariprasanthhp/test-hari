import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from 'src/app/cco-foundation/foundation-systems/foundation-data.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { DeviceGroupService } from 'src/app/support/netops-management/operations/services/device-group.service';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { AdvancedSystemOntComponent } from './advanced-system-ont.component';

describe('AdvancedSystemOntComponent', () => {
  let component: AdvancedSystemOntComponent;
  let fixture: ComponentFixture<AdvancedSystemOntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedSystemOntComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, FormBuilder, FoundationDataService, DeviceGroupService, ProfileService, SsoAuthService, CommonService, ManagementService, SsoAuthService, NgbModal, CommonFunctionsService, UriValidatorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSystemOntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
