import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { IssueService } from '../../issues/service/issue.service';
import { FormsModule } from '@angular/forms';
import { WorkflowConditionsComponent } from './workflow-conditions.component';

describe('WorkflowConditionsComponent', () => {
  let component: WorkflowConditionsComponent;
  let fixture: ComponentFixture<WorkflowConditionsComponent>;

  beforeEach(() => {
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const ssoAuthServiceStub = () => ({});
    const workflowServiceStub = () => ({ enforceMinMax: event => ({}) });
    const issueServiceStub = () => ({ appendFqn: res => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkflowConditionsComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub },
        { provide: WorkflowService, useFactory: workflowServiceStub },
        { provide: IssueService, useFactory: issueServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WorkflowConditionsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`regionSelected has default value`, () => {
    expect(component.regionSelected).toEqual(`All`);
  });

  it(`locationSelected has default value`, () => {
    expect(component.locationSelected).toEqual(`All`);
  });

  it(`recurrenceList has default value`, () => {
    expect(component.recurrenceList).toEqual([{ id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' }]);
  });

  it(`triggerType has default value`, () => {
    expect(component.triggerType).toEqual([{ value: 'true', name: 'immediately' },
    { value: 'false', name: 'On a schedule' }]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSelectReccurence').and.callThrough();
      component.ngOnInit();
      // expect(component.onSelectReccurence).toHaveBeenCalled();
    });
  });
});
