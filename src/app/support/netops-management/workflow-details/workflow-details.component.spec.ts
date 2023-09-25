import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { NetopsServiceService } from '../netops-management.service';
import { FileService } from '../operations/services/files.service';

import { workflow_by_id,system_groups_res, microsite_res } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-details/workflow-details';

import { WorkflowDetailsComponent } from './workflow-details.component';
import { DataTablesModule } from 'angular-datatables';
import { EnglishJSON } from 'src/assets/language/english.service';
import { workflow_res } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-wizard-opr-parameters/workflow-wizard-opr-parameters';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('WorkflowDetailsComponent', () => { 
  let component: WorkflowDetailsComponent;
  let fixture: ComponentFixture<WorkflowDetailsComponent>;

  let api: NetopsServiceService;
  let communityService: MycommunityIqService;
  let fileService: FileService;
  let sso: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;
  let translateService: TranslateService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule

      ],
      providers: [
        TranslateService,
        NetopsServiceService,
        FileService,
        SsoAuthService,
        Title,
        MycommunityIqService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate'), url: `/support/netops-management/operations/workflows/workflow-details` } },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ item: '6ce3a553-73b0-47be-ad88-5a70094d4fda', name: 'Jing_2028_backup' })
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        api = TestBed.inject(NetopsServiceService);
        communityService = TestBed.inject(MycommunityIqService);
        fileService = TestBed.inject(FileService);
        sso = TestBed.inject(SsoAuthService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        translateService = TestBed.inject(TranslateService);

        fixture = TestBed.createComponent(WorkflowDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('Ng-OnInit test', () => {
    component.workflowData = workflow_res;
    component.enableMyCommunity = true;
    spyOn(api,'getWorkflowById').and.returnValue(of(workflow_by_id));
    spyOn(communityService,'GetMicrosite').and.returnValue(of(microsite_res));
    // spyOn(api,'getWorkflowById').and.returnValue(of(workflow_by_id));
    component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
  });

  it('getWorkflowById test', () => {
    component.workflowData = workflow_res;
    // component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    spyOn(api,'getWorkflowById').and.returnValue(of(component.workflowData));
    component.getWorkflowById();
    component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
  });

  it('getWorkflowById error test', () => {
    component.workflowData = workflow_res;
    component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    spyOn(api,'getWorkflowById').and.returnValue(throwError(errorStatus401));
    component.getWorkflowById();
  });

  it('GetMicrosites test', () => {
    component.workflowData = workflow_res;
    component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    spyOn(communityService,'GetMicrosite').and.returnValue(of(microsite_res));
    component.GetMicrosites();
  });

  it('GetMicrosites error test', () => {
    component.workflowData = workflow_res;
    component.workflowData.execPolicy.window = {type:'monthly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    spyOn(communityService,'GetMicrosite').and.returnValue(throwError(errorStatus401));
    component.GetMicrosites();
  });

  it('showMicroSiteName  test', () => {
    component.communityArr = workflow_res;
    component.showMicroSiteName('0e6ccb0a-5f9f-4432-95c8-40d5990a8a86');
  });

  it('getDeviceGrp test', () => {
    component.workflowData = workflow_res;
    spyOn(api,'GetDeviceGroup').and.returnValue(of(system_groups_res));
    component.getDeviceGrp();
  });

  it('getDeviceGrp error test', () => {
    component.workflowData = workflow_res;
    spyOn(api,'GetDeviceGroup').and.returnValue(throwError(errorStatus401));
    component.getDeviceGrp();
  });

  
  it('tableLanguageOptions fr test', () => {
    spyOn(sessionStorage,'getItem').and.returnValue('fr');
    component.tableLanguageOptions();
  });
  it('tableLanguageOptions es test', () => {
    spyOn(sessionStorage,'getItem').and.returnValue('es');
    component.tableLanguageOptions();
  });
  it('tableLanguageOptions es test', () => {
    spyOn(sessionStorage,'getItem').and.returnValue('de_DE');
    component.tableLanguageOptions();
  });
  it('tableLanguageOptions en test', () => {
    spyOn(sessionStorage,'getItem').and.returnValue('en');
    component.tableLanguageOptions();
  });

});
