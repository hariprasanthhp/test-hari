import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { workflow_add_inputData, workflow_data_byId, workflow_list, workflow_wiz_microsite } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';
import { workflow_image_res, workflow_opr_input_data } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-wizard-opr-parameters/workflow-wizard-opr-parameters';
import { environment } from 'src/environments/environment';
import { NetopsServiceService } from '../../../netops-management.service';
import { FileService } from '../../services/files.service';
import { SelectDeviceGroupComponent } from './select-device-group/select-device-group.component';

import { WorkflowWizardComponent } from './workflow-wizard.component';
import { WrkflowWizardOprParametersComponent } from './wrkflow-wizard-opr-parameters/wrkflow-wizard-opr-parameters.component';
import { WrkflowWizardScheduleParametersComponent } from './wrkflow-wizard-schedule-parameters/wrkflow-wizard-schedule-parameters.component';

describe('WorkflowWizardComponent', () => {
  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/operations/workflows/workflow-wizard' }

  let component: WorkflowWizardComponent;
  let fixture: ComponentFixture<WorkflowWizardComponent>;

  let api: NetopsServiceService;
  let fileService: FileService;
  let communityIqService: MycommunityIqService;
  let translateService: TranslateService;
  let sso: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowWizardComponent,SelectDeviceGroupComponent,WrkflowWizardOprParametersComponent,WrkflowWizardScheduleParametersComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule, ReactiveFormsModule,
        // RouterTestingModule.withRoutes([]),
      ],
      providers: [
        TranslateService,
        NetopsServiceService,
        FileService,
        SsoAuthService,
        CommonService,
        MycommunityIqService,
        { provide: Router, useValue: mockUrl },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({
              isNewwrkflw: "true"
            })
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        api = TestBed.inject(NetopsServiceService);
        fileService = TestBed.inject(FileService);
        communityIqService = TestBed.inject(MycommunityIqService);
        translateService = TestBed.inject(TranslateService);
        sso = TestBed.inject(SsoAuthService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);

        fixture = TestBed.createComponent(WorkflowWizardComponent);
        component = fixture.componentInstance;
        component.router = router;
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(scopes))
      })
  });

  // afterEach (() => {
  //   fixture.destroy();
  //   TestBed.resetTestingModule();
  // });

  it('Ng-OnInit test', () => {
    environment.VALIDATE_SCOPE = 'true';
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco/operations/cco-subscriber-operations/workflows/workflow-wizard' }
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    expect(component.hasScopeAccess).toBeTruthy();
    expect(component.isNewwrkflw).toBeTruthy();
  });

  it('Ng-OnInit test1', () => {
    component.hasScopeAccess = false;
    // fixture.destroy();
    environment.VALIDATE_SCOPE = 'true';
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    component.ngOnInit();
  });

  // *** commented because 'GetMicrosites' varaible no longer exists *** //
  // remove later

  // it('GetMicrosites test', () => {
  //   spyOn(component, 'GetMicrosites').and.callThrough();
  //   spyOn(communityIqService, 'GetMicrosite').and.returnValue(of(workflow_wiz_microsite));
  //   component.GetMicrosites();
  //   expect(component.communityArr).toEqual(workflow_wiz_microsite);

  // })

  // it('GetMicrosites error test', () => {
  //   spyOn(communityIqService, 'GetMicrosite').and.returnValue(throwError(errorStatus401));
  //   component.GetMicrosites();
  // })
  // end

  it('getWorkflowById test', () => {
    component.editItem_id = "6ce3a553-73b0-47be-ad88-5a70094d4fda";
    fixture.detectChanges();
    spyOn(api, 'getWorkflowById').and.returnValue(of(workflow_list[4]));
    spyOn(fileService, 'getSwFileById').and.returnValue(of(workflow_image_res));
    component.getWorkflowById();
    // expect(component.workflowInputData.levelPassed).toEqual(5);
    // expect(component.workflowInputData.actions[0].actionType).toEqual("Reboot");
    fixture.detectChanges();
  })

  it('AddWorkflowData/saveWorkflow test else', fakeAsync(() => {
    component.workflowInputData = workflow_add_inputData;
    component.editItem_id = "6ce3a553-73b0-47be-ad88-5a70094d4fda";
    // component.editWorkFlow = true;
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    fixture.detectChanges();

    spyOn(component, 'submitWorkflow').and.callThrough();
    spyOn(api, 'AddWorkflowData').and.returnValue(of({ _id: "234bcf63-1555-45e6-ac0e-dd80aa602538" }));
    spyOn(sso, 'redirectByUrl').and.callFake(() => {
      (router.url.includes('cco/operations/')) ? router.navigate([`/cco/operations/cco-subscriber-operations/operations/workflows`]) :
        (router.url.includes('/cco-foundation/')) ? router.navigate([`/cco-foundation/foundation-configuration/configuration-workflow/workflows`]) :
          (router.url.includes('/support/netops-management')) ? router.navigate([`/support/netops-management/operations/workflows`]) : router.navigate([`/support/netops-management/operations/workflows`])
    });
    component.submitWorkflow({});
    tick(1000);
    // expect(api.AddWorkflowData).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith([`/support/netops-management/operations/workflows`]);
  }));

  it('AddWorkflowData/saveWorkflow test', fakeAsync(() => {
    component.workflowInputData = workflow_add_inputData;
    component.editItem_id = "6ce3a553-73b0-47be-ad88-5a70094d4fda";
    component.editWorkFlow = true;
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    fixture.detectChanges();

    spyOn(component, 'submitWorkflow').and.callThrough();
    spyOn(api, 'editWorkflowData').and.returnValue(of({ _id: "234bcf63-1555-45e6-ac0e-dd80aa602538" }));
    spyOn(sso, 'redirectByUrl').and.callFake(() => {
      (router.url.includes('cco/operations/')) ? router.navigate([`/cco/operations/cco-subscriber-operations/operations/workflows`]) :
        (router.url.includes('/cco-foundation/')) ? router.navigate([`/cco-foundation/foundation-configuration/configuration-workflow/workflows`]) :
          (router.url.includes('/support/netops-management')) ? router.navigate([`/support/netops-management/operations/workflows`]) : router.navigate([`/support/netops-management/operations/workflows`])
    });
    component.submitWorkflow({});
    tick(1000);
    // expect(api.AddWorkflowData).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith([`/support/netops-management/operations/workflows`]);
  }));

  it('AddWorkflowData/saveWorkflow test else error hadle', fakeAsync(() => {
    component.workflowInputData = workflow_add_inputData;
    component.editItem_id = "6ce3a553-73b0-47be-ad88-5a70094d4fda";
    component.editWorkFlow = true;
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    fixture.detectChanges();
    spyOn(api, 'editWorkflowData').and.returnValue(throwError(errorStatus401));
    component.submitWorkflow({});
    tick(1000);
  }));

  it('AddWorkflowData/saveWorkflow test error hadle', fakeAsync(() => {
    component.workflowInputData = workflow_add_inputData;
    component.editItem_id = "6ce3a553-73b0-47be-ad88-5a70094d4fda";
    // component.editWorkFlow = true;
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    fixture.detectChanges();
    spyOn(api, 'AddWorkflowData').and.returnValue(throwError(errorStatus401));
    component.submitWorkflow({});
    tick(1000);
  }));

  it('function test', () => {
    component.workflowInputData = workflow_opr_input_data;
    fixture.detectChanges();
    component.getCurrentTab('start');
    component.getStartData('start');
  });

  it('function test1', () => {
    component.workflowInputData.levelPassed = 5;
    component.activeTab = 'Start';
    component.setActiveTab('');
    // fixture.detectChanges();
    component.activeTab = 'Select Device Groups';
    component.setActiveTab('');
    // fixture.detectChanges();
    component.activeTab = 'Select Operation Parameters';
    component.setActiveTab('');
    // fixture.detectChanges();
    component.activeTab = 'Select Schedule Parameters';
    component.setActiveTab('');
    // fixture.detectChanges();
  });

  it('getDeviceData test', () => {
    component.getDeviceData(workflow_data_byId);
    component.getOptData(workflow_data_byId);
    component.pageErrorHandle(errorStatus500);
  });
  it('getScheduleData test', () => {
    component.getScheduleData(workflow_data_byId);
    component.workflowInputData = workflow_opr_input_data;
    component.validateStart();
    component.closeAlert();
    component.closeWorkflow();
    component.pageErrorHandle(errorStatus401);
  });

  it('Ng-destroy test1', () => {
    component.getWorkflowByIdSubscribe = new BehaviorSubject('');
    component.languageSubject = new BehaviorSubject('');
    component.ngOnDestroy();
  });
});
