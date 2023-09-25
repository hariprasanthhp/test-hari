import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';

import { WorkflowAlarmWizardReviewComponent } from './workflow-alarm-wizard-review.component';

describe('WorkflowAlarmWizardReviewComponent', () => {
  let component: WorkflowAlarmWizardReviewComponent;
  let fixture: ComponentFixture<WorkflowAlarmWizardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowAlarmWizardReviewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, CalendarModule],
      providers: [TranslateService, NetopsServiceService, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlarmWizardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
