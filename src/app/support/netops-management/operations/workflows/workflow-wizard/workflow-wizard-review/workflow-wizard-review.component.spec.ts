import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { workflow_review_data,system_groups } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-review/workflow-review';
import { of } from 'rxjs';

import { WorkflowWizardReviewComponent } from './workflow-wizard-review.component';
import { DataTablesModule } from 'angular-datatables';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnglishJSON } from 'src/assets/language/english.service';
import { workflow_wiz_microsite } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';

describe('WorkflowWizardReviewComponent', () => {
  let component: WorkflowWizardReviewComponent;
  let fixture: ComponentFixture<WorkflowWizardReviewComponent>;

  let translateService: TranslateService;
  let api: NetopsServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowWizardReviewComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule

      ],
      providers: [
        TranslateService, 
        NetopsServiceService, 
        SsoAuthService
      ],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(()=>{
        api = TestBed.inject(NetopsServiceService);
        translateService = TestBed.inject(TranslateService);

        fixture = TestBed.createComponent(WorkflowWizardReviewComponent);
        component = fixture.componentInstance;
        component.workflowInputData = workflow_review_data;
        fixture.detectChanges();
      })
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('Ng-OnInit test', () => {
    spyOn(component,'getDeviceGrp').and.callThrough();
    component.workflowInputData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
  });

  it('device group test', () => {
    spyOn(api,'GetDeviceGroup').and.returnValue(of(system_groups));
    component.getDeviceGrp();
    expect(component.deviceData).toEqual(system_groups);
  });

  it('submit/finish click test', () => {
    spyOn(component.submitWorkflow,'emit').and.callThrough();
    component.submit();
    expect(component.submitWorkflow.emit).toHaveBeenCalledWith(workflow_review_data);
  });

  it('showMicroSiteName test', () => {
    component.communityArr = workflow_wiz_microsite;
    component.showMicroSiteName('ca30e208-afd5-4681-9a22-54d7e32b6de3');
  });

});
