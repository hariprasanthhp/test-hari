import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { WrkflowAlarmWizardOprParametersComponent } from './wrkflow-alarm-wizard-opr-parameters.component';

describe('WrkflowAlarmWizardOprParametersComponent', () => {
  let component: WrkflowAlarmWizardOprParametersComponent;
  let fixture: ComponentFixture<WrkflowAlarmWizardOprParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrkflowAlarmWizardOprParametersComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, CalendarModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, NetopsServiceService, SsoAuthService, CustomTranslateService, CommonService, FormBuilder, IssueService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrkflowAlarmWizardOprParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
