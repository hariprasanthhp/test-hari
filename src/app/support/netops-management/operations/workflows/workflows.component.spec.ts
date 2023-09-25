import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { HSIService } from 'src/app/cco-foundation/cco-foundation-service/hsi.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetopsServiceService } from '../../netops-management.service';
import { FileService } from '../services/files.service';

import { WorkflowsComponent } from './workflows.component';
import * as $ from 'jquery';

import * as workflow from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { WorkflowWizardComponent } from './workflow-wizard/workflow-wizard.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { workflow_config_res, workflow_image_res, workflow_static_group_res } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-wizard-opr-parameters/workflow-wizard-opr-parameters';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { FilesModel } from '../model/files.model';


describe('WorkflowsComponent', () => {
  let component: WorkflowsComponent;
  let fixture: ComponentFixture<WorkflowsComponent>;

  let service: DataServiceService;
  let api: NetopsServiceService;
  let fileService: FileService;
  let hsiService: HSIService;
  let sso: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;
  let translateService: TranslateService;
  let httpTestingController: HttpTestingController;
  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/operations/workflows/workflow-wizard' };

  let images;

  const getFileList = () => {
    const dt = new DataTransfer();
    dt.items.add(new File(images,'img'));
    return dt.files;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowsComponent, WorkflowWizardComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DataTablesModule,
        NgSelectModule,
        CalendarModule,
        FormsModule
      ],
      providers: [
        CommonService,
        DataServiceService,
        CustomTranslateService,
        NetopsServiceService,
        NgbModal,
        FileService,
        HSIService,
        SsoAuthService,
        TranslateService,
        Title,
        { provide: Router, useValue: mockUrl },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({})
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        service = TestBed.inject(DataServiceService);
        api = TestBed.inject(NetopsServiceService);
        fileService = TestBed.inject(FileService);
        hsiService = TestBed.inject(HSIService);
        translateService = TestBed.inject(TranslateService);
        sso = TestBed.inject(SsoAuthService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);

        httpTestingController = TestBed.inject(HttpTestingController);


        fixture = TestBed.createComponent(WorkflowsComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        component.hasWriteAccess = true;
        component.router = router;
        images = workflow_image_res;
        images[1].isOfficialImage = false;
        sessionStorage.setItem('swi', JSON.stringify(images));
        fixture.detectChanges();
        localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));

      })
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  // afterEach(() => {
  //   fixture.destroy();
  //   TestBed.resetTestingModule();
  //   spyOn(component.language, 'workflowDeleteInfo').and.returnValue(`Are you sure you want to delete the workflow 123abcd`);
  //   // mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
  //   spyOn(component, 'getScopes').and.callThrough();
  //   component.languageSubject = translateService.selectedLanguage.subscribe(data => {
  //     component.language = data;
  //     component.deleteInfo = `${component.language.workflowDeleteInfo('123abcd')}?`

  //   })
  //   environment.VALIDATE_SCOPE = 'true';
  //   let eng = new EnglishJSON;
  //   translateService.selectedLanguage.next(of(eng));
  //   component.ngOnInit();
  // });


  it('Ng-OnInit test COC', fakeAsync(() => {
    spyOn(component.language, 'workflowDeleteInfo').and.returnValue(`Are you sure you want to delete the workflow 123abcd`);
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco/operations/cco-subscriber-operations/operations/workflows' }
    spyOn(component, 'getScopes').and.callThrough();
    component.languageSubject = translateService.selectedLanguage.subscribe(data => {
      component.language = data;
      component.deleteInfo = `${component.language.workflowDeleteInfo('123abcd')}?`

    })
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('Ng-OnInit test Foundation', fakeAsync(() => {
    spyOn(component.language, 'workflowDeleteInfo').and.returnValue(`Are you sure you want to delete the workflow 123abcd`);
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    spyOn(component, 'getScopes').and.callThrough();
    component.languageSubject = translateService.selectedLanguage.subscribe(data => {
      component.language = data;
      component.deleteInfo = `${component.language.workflowDeleteInfo('123abcd')}?`

    })
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('Ng-OnInit test CSC', fakeAsync(() => {
    spyOn(component.language, 'workflowDeleteInfo').and.returnValue(`Are you sure you want to delete the workflow 123abcd`);
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/operations/workflows' }
    spyOn(component, 'getScopes').and.callThrough();
    component.languageSubject = translateService.selectedLanguage.subscribe(data => {
      component.language = data;
      component.deleteInfo = `${component.language.workflowDeleteInfo('123abcd')}?`

    })
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));


  it('Workflow-List test', fakeAsync(() => {
    fixture = TestBed.createComponent(WorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(api, 'GetWorkflowGrid').and.returnValue(of(workflow.workflow_list));
    component.getWrkflwData();
    fixture.detectChanges();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
    // expect(workflow.workflow_list[0].name).toEqual(fixture.nativeElement.querySelector('#workflow-table tbody tr:nth-child(1) td:nth-child(1)').innerText);
  }));

  it('addWorkflow click test', fakeAsync(() => {
    fixture = TestBed.createComponent(WorkflowsComponent);
    component = fixture.componentInstance;
    spyOn(api, 'GetWorkflowGrid').and.returnValue(of(workflow.workflow_list));
    component.getWrkflwData();
    fixture.detectChanges();
    //for addworkflow button click
    spyOn(component, 'addWorkflow').and.callThrough();
    spyOn(sso, 'redirectByUrl').and.callFake(() => {
      (router.url.includes('cco/operations/')) ? router.navigate([`/cco/operations/cco-subscriber-operations/operations/workflows/workflow-wizard`], { queryParams: { isNewwrkflw: true } }) :
        (router.url.includes('/cco-foundation/')) ? router.navigate([`/cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-wizard`], { queryParams: { isNewwrkflw: true } }) :
          (router.url.includes('/support/netops-management')) ? router.navigate([`/support/netops-management/operations/workflows/workflow-wizard`], { queryParams: { isNewwrkflw: true } }) : router.navigate([`/support/netops-management/operations/workflows/workflow-wizard`], { queryParams: { isNewwrkflw: true } })
    });
    let addWrkflw = fixture.nativeElement.querySelector('#add_workflow');
    component.addWorkflow();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('editWorkflow click test', fakeAsync(() => {
    component.enableMyCommunity = true;
    spyOn(api, 'GetWorkflowGrid').and.returnValue(of(workflow.workflow_list));
    component.getWrkflwData();
    fixture.detectChanges();
    //for editWorkflow button click
    spyOn(component, 'editWorkflow').and.callThrough();
    spyOn(sso, 'redirectByUrl').and.callFake(() => {
      (router.url.includes('cco/operations/')) ? router.navigate([`/cco/operations/cco-subscriber-operations/operations/workflows/workflow-wizard`], { queryParams: { item: workflow.workflow_list[0]._id } }) :
        (router.url.includes('/cco-foundation/')) ? router.navigate([`/cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-wizard`], { queryParams: { item: workflow.workflow_list[0]._id } }) :
          (router.url.includes('/support/netops-management')) ? router.navigate([`/support/netops-management/operations/workflows/workflow-wizard`], { queryParams: { item: workflow.workflow_list[0]._id } }) : router.navigate([`/support/netops-management/operations/workflows/workflow-wizard`], { queryParams: { item: workflow.workflow_list[0]._id } })
    });
    let editWrkflw = fixture.nativeElement.querySelector('#wk-edit-btn');
    component.editWorkflow(workflow.workflow_list[0],false);
    component.editWorkflow({ type: 'Onboarding Scheduler', _id: '0' }, false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('editWorkflow click test', fakeAsync(() => {
    component.enableMyCommunity = true;
    spyOn(api, 'GetWorkflowGrid').and.returnValue(throwError(errorStatus401));
    component.getWrkflwData();
    fixture.detectChanges();
    component.editWorkflow({ type: 'Onboarding Scheduler', _id: '0' }, true);
    fixture.detectChanges();
    component.editWorkflow({ type: 'Onboarding Scheduler', _id: '1' }, false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('Suspended click test', fakeAsync(() => {
    spyOn(api, 'GetWorkflowGrid').and.returnValue(of(workflow.workflow_list));
    spyOn(api, 'suspendWrkflw').and.callThrough();
    component.getWrkflwData();
    fixture.detectChanges();

    spyOn(component, 'suspendWrkflw').and.callThrough();
    spyOn(component, 'closeAlert').and.callThrough();
    spyOn(component, 'confirmSuspendSecleted').and.callThrough();
    let suspendWrkflw = fixture.nativeElement.querySelector('#workflow-table tbody tr:nth-child(2) .actions .action-tab-btn button:nth-child(3) i');
    // suspendWrkflw.dispatchEvent(new Event('click'));//for trigger events
    component.suspendWrkflw(workflow.workflow_list[1]);
    fixture.detectChanges();
    let confirm = fixture.nativeElement.querySelector('#warning-cnf');
    component.confirm();
    // confirm.dispatchEvent(new Event('click'));//for trigger events
    fixture.detectChanges();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))

  it('status button click', fakeAsync(() => {
    spyOn(api, 'GetWorkflowGrid').and.returnValue(of(workflow.workflow_list));
    component.getWrkflwData();
    fixture.detectChanges();

    spyOn(sso, 'redirectByUrl').and.callFake(() => {
      (router.url.includes('cco/operations/')) ? router.navigate([`/cco/operations/cco-subscriber-operations/operations/workflows/workflow-status`], { queryParams: { item: workflow.workflow_list[0]._id, name: workflow.workflow_list[0].name } }) :
        (router.url.includes('/cco-foundation/')) ? router.navigate([`/cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-status`], { queryParams: { item: workflow.workflow_list[0]._id, name: workflow.workflow_list[0].name } }) :
          (router.url.includes('/support/netops-management')) ? router.navigate([`/support/netops-management/operations/workflows/workflow-status`], { queryParams: { item: workflow.workflow_list[0]._id, name: workflow.workflow_list[0].name } }) : router.navigate([`/support/netops-management/operations/workflows/workflow-status`], { queryParams: { item: workflow.workflow_list[0]._id, name: workflow.workflow_list[0].name } })
    });

    spyOn(component, 'showStatus').and.callThrough();
    let workflowStatus = fixture.nativeElement.querySelector('#workflow-table tbody tr:nth-child(1) .actions .action-tab-btn button:nth-child(2) i');
    // workflowStatus.dispatchEvent(new Event('click'));//for trigger events
    component.showStatus(workflow.workflow_list[1]);
    fixture.detectChanges();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
    // expect(component.showStatus).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith([`/support/netops-management/operations/workflows/workflow-status`], { queryParams: { item: workflow.workflow_list[0]._id, name: workflow.workflow_list[0].name } });
  }));

  it('functions test 1 ', fakeAsync(() => {
    spyOn(fileService, 'makeUnOfficialImge').and.returnValue(of({}));
    spyOn(fileService, 'makeOfficialImage').and.returnValue(of({}));
    component.selectedSSID.WlanIndex = '';
    component.EnableShow((new Event('click')));
    component.EnableShow1((new Event('click')));
    component.enable();
    component.officialImageId = images[0];
    component.swOfficialConfirmation();
    let imageFile = images;
    imageFile[1].isOfficialImage = true;
    component.onSoftwareChange(imageFile[2]);
    component.EnableShow1({ isTrusted: true });

    fixture.detectChanges();
    component.officialImageId = imageFile[1];
    component.swOfficialConfirmation();
    component.closeswOfficialConfirmation();
    component.fetchSoftwareImageList();
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/sw/image') && reqs.method == 'GET'
    });
    req[0].flush(images);
    req[1].flush(images);
    req[2].flush(images);

    let dtObj = {
      oPreviousSearch: { sSearch: 'test name' },
      _bInitComplete: true,
      _drawHold: false,
      _iDisplayLength: 10,
      _iDisplayStart: 0,
      _iRecordsDisplay: 7772,
      _iRecordsTotal: 7772
    }
    component.changeTableStatusLanguage(dtObj);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('functions test 2 and else test', fakeAsync(() => {
    spyOn(fileService, 'makeUnOfficialImge').and.returnValue(throwError(errorStatus401));
    spyOn(fileService, 'makeOfficialImage').and.returnValue(throwError(errorStatus401));
    component.officialImageId = images[0];
    component.swOfficialConfirmation();
    let imageFile = images;
    // imageFile[2].isOfficialImage = true;
    imageFile[2]['models'] = ['844E', '844E-1', 'GS4227', 'GS4227W'];
    sessionStorage.setItem('swi', JSON.stringify(imageFile));
    component.onSoftwareChange(imageFile[2]);
    fixture.detectChanges();
    imageFile[1].isOfficialImage = true;
    component.officialImageId = imageFile[1];
    component.swOfficialConfirmation();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('functions test 3', fakeAsync(() => {
    spyOn(fileService, 'getSwFilesCount').and.returnValue(of({}));
    component.openOutModal(fixture.nativeElement.querySelector('[role="dialog"]'));
    // component.getSwImagesListCout();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('getHSI test', fakeAsync(() => {
    let HsiObj = workflow.hsiRes;
    // delete HsiObj.wifiSsidExos;
    spyOn(hsiService, 'getHSI').and.returnValue(of(HsiObj));
    component.getHSI();
    fixture.detectChanges();

    component.hsiModel.wifiSsidExos = [];
    component.createSSIDItems();

    component.selectedSecuritySSID({ id: '11iandWPA3' });
    fixture.detectChanges();
    component.selectedSecuritySSID({ id: '11i' }, 'drop');
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('getHSI test error', fakeAsync(() => {
    spyOn(hsiService, 'getHSI').and.returnValue(throwError(errorStatus401));
    component.getHSI();
    fixture.detectChanges();

    component.hsiModel.wifiSsidExos = [{}];
    let hsi = workflow.hsiRes;
    component.selectedSSID = hsi.wifiSsidExos[1];
    localStorage.setItem('hsiSave', JSON.stringify(hsi));
    // component.createSSIDItems();
    component.selectedSecuritySSID({ id: '11i' }, '');
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onTimeZoneChange test', fakeAsync(() => {
    component.onTimeZoneChange({ 
      id: '1', 
      value: 'abcd',
      displayName:"Africa/Abidjan" 
    });
    component.closeModal('saved');
    // component.newRedraw();
    // component.redraw();
    component.hideError();
    component.hideSuccess();
    component.closeini();
    component.closeAllModal();
    component.EnableTZ();
    component.addNewSoftwareImage();
    component.officialImage = true;
    component.checkForOfficialImage();
    // component.helpRoute();
    component.moveArrayItemToNewIndex(workflow.workflow_list, 0, 1);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('render test', fakeAsync(() => {
    // component.render();
    // component.rerender();
    // component.search('test123');
    component.addAlarmWorkflow();
    component.addOfficialImageWorkflow();
    component.confirmUpdateSecleted();
    component.officialImage = false;
    component.checkForOfficialImage();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))

  it('gotoWrkflwDetail test', fakeAsync(() => {
    spyOn(api, 'GetWorkflowById').and.returnValue(of(workflow.workflow_list[0]));
    spyOn(fileService, 'getSwFileById').and.returnValue(of(workflow.workflow_list[0]));

    let workflowData = workflow.workflow_list[0];
    workflowData.actions[1] = {actionType:'Download SW/FW Image'};
    workflowData.execPolicy.initialTrigger.type = 'maintanance Window';
    workflowData.execPolicy['window'] = {
      weekdays: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
      type: '',
      frequency: 23,
      windowLength: 8,
      startDateTime: '01/02/2023'
    };
    spyOn(api, 'getWorkflowById').and.returnValue(of(workflowData));

    component.getWorkflowById();
    component.gotoWrkflwDetail(workflow.workflow_list[0]);
    component.getWokflowDetails(workflow.workflow_list[0]);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('gotoWrkflwDetail test', fakeAsync(() => {
    spyOn(api, 'GetWorkflowById').and.returnValue(of(workflow.workflow_list[0]));
    spyOn(fileService, 'deleteConfigFileById').and.returnValue(of(workflow_config_res[0]));

    let workflowData = workflow.workflow_list[0];
    workflowData.actions[1] = {actionType:'Configuration File Download'};
    workflowData.execPolicy.initialTrigger.type = 'maintanance Window';
    workflowData.execPolicy['window'] = {
      weekdays: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
      type: '',
      frequency: 23,
      windowLength: 8,
      startDateTime: '01/02/2023'
    };    
    spyOn(api, 'getWorkflowById').and.returnValue(of(workflowData));

    component.getWorkflowById();
    component.gotoWrkflwDetail(workflow.workflow_list[0]);
    component.getWokflowDetails(workflow.workflow_list[0]);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('gotoWrkflwDetail test error', fakeAsync(() => {
    spyOn(api, 'GetWorkflowById').and.returnValue(throwError(errorStatus401));
    spyOn(api, 'getWorkflowById').and.returnValue(throwError(errorStatus401));
    component.gotoWrkflwDetail(workflow.workflow_list[0]);
    fixture.detectChanges();
    let row = workflow.workflow_list[0];
    row.name = 'Default Onboarding Workflow';
    row._id = '0';
    fixture.detectChanges();
    component.getWokflowDetails(row);
    component.getWorkflowById();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))

  it('confirmSuspendSecleted test', fakeAsync(() => {
    component.suspenddata = workflow.workflow_list[1];
    spyOn(api, 'suspendWrkflw').and.returnValue(of(workflow.workflow_list[0]));
    component.confirmSuspendSecleted();
    tick(4000);
  }));
  it('confirmSuspendSecleted test error', fakeAsync(() => {
    component.suspenddata = workflow.workflow_list[1];
    spyOn(api, 'suspendWrkflw').and.returnValue(throwError(errorStatus401));
    component.confirmSuspendSecleted();
    tick(4000);
  }))

  it('confirmResumeSecleted test', fakeAsync(() => {
    component.resumedata = workflow.workflow_list[1];
    spyOn(api, 'resumeWrkflw').and.returnValue(of(workflow.workflow_list[0]));
    component.confirmResumeSecleted();
    tick(4000);
  }));
  it('confirmResumeSecleted test error', fakeAsync(() => {
    component.resumedata = workflow.workflow_list[1];
    spyOn(api, 'resumeWrkflw').and.returnValue(throwError(errorStatus401));
    component.confirmResumeSecleted();
    tick(4000);
  }))

  it('confirmDeleteSecleted test', fakeAsync(() => {
    component.deletedata = workflow.workflow_list[1];
    spyOn(api, 'DeleteWrkflw').and.returnValue(of(workflow.workflow_list[0]));
    component.confirmDeleteSecleted();
    tick(4000);
  }));
  it('confirmDeleteSecleted test error', fakeAsync(() => {
    component.deletedata = workflow.workflow_list[1];
    spyOn(api, 'DeleteWrkflw').and.returnValue(throwError(errorStatus401));
    component.confirmDeleteSecleted();
    tick(4000);
  }))

  it('tableLanguageOptions fr test', fakeAsync(() => {
    sessionStorage.setItem('defaultLanguage', 'fr')
    component.tableLanguageOptions();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('tableLanguageOptions es test', fakeAsync(() => {
    sessionStorage.setItem('defaultLanguage', 'es')
    component.tableLanguageOptions();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('tableLanguageOptions de_DE test', fakeAsync(() => {
    sessionStorage.setItem('defaultLanguage', 'de_DE')
    component.tableLanguageOptions();
    let err = errorStatus401;
    component.pageErrorHandle(err);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('tableLanguageOptions en test', fakeAsync(() => {
    component.workFlowtableOptions.language = {};
    sessionStorage.setItem('defaultLanguage', 'en')
    component.tableLanguageOptions();
    let err = errorStatus401;
    err.status = 501;
    component.pageErrorHandle(err);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('setActiveTab test', fakeAsync(() => {
    component.setActiveTab('Onboarding Workflow');
    fixture.detectChanges();
    component.setActiveTab('Software Images');
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSWFileSubmit test', fakeAsync(() => {
    spyOn(fileService, 'uploadSwFile').and.returnValue(of({
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    }));
    component.onSWFileSubmit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSWFileSubmit error test', fakeAsync(() => {
    spyOn(fileService, 'uploadSwFile').and.returnValue(throwError(errorStatus401));
    component.onSWFileSubmit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSWFileSubmit error test', fakeAsync(() => {
    let err = errorStatus401;
    err.status = 409;
    spyOn(fileService, 'uploadSwFile').and.returnValue(throwError(err));
    component.onSWFileSubmit();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile test', fakeAsync(() => {
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(of({}));
    // spyOn(fileService, 'makeOfficialImage').and.returnValue(of({}));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile test', fakeAsync(() => {
    component.officialImage = true;
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(of({}));
    spyOn(fileService, 'makeOfficialImage').and.returnValue(of({}));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile test', fakeAsync(() => {
    component.officialImage = true;
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(of({}));
    spyOn(fileService, 'makeOfficialImage').and.returnValue(throwError(errorStatus401));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile error test', fakeAsync(() => {
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(throwError(errorStatus401));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });  
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile error test2', fakeAsync(() => {
    let err = errorStatus401;
    err.status = 413;
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(throwError(err));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });  
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('uploadFile error test3', fakeAsync(() => {
    let err = errorStatus401;
    err.status = 513;
    err.statusText = "Unknown Error";
    spyOn(fileService, 'fileUploadIntoUrl').and.returnValue(throwError(err));
    component.uploadFile(null, {
      _id: '0',
      username: '',
      password: '',
      uploadUrl: ''
    });  
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload test', fakeAsync(() => {
    component.swFileObj = new FilesModel();
    component.swFileObj.name = 'abcd123';
    let list = workflow_image_res;
    list[0].name = 'abcd123';
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(list));
    spyOn(fileService, 'deleteSwFileById').and.returnValue(of({}));
    component.reverseUpload(!false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload test 1st api error', fakeAsync(() => {
    component.swFileObj = new FilesModel();
    component.swFileObj.name = 'abcd123';
    let list = workflow_image_res;
    list[0].name = 'abcd123';
    spyOn(fileService, 'getSwFilesList').and.returnValue(throwError(errorStatus401));
    component.reverseUpload(!false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload test 2nd api error', fakeAsync(() => {
    component.swFileObj = new FilesModel();
    component.swFileObj.name = 'abcd123';
    let list = workflow_image_res;
    list[0].name = 'abcd123';
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(list));
    spyOn(fileService, 'deleteSwFileById').and.returnValue(throwError(errorStatus401));
    component.reverseUpload(!false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload else test', fakeAsync(() => {
    component.swFileObj.name = 'fwu_gc_data+video(l2 APAS)321+voip_810';
    let list = workflow_image_res;
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(list));
    component.reverseUpload(!false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload else test1', fakeAsync(() => {
    component.swFileObj.name = '';
    let list = workflow_image_res;
    list[0].name = '';
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(list));
    spyOn(fileService, 'deleteSwFileById').and.returnValue(of(list));
    component.reverseUpload(true);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload else error test', fakeAsync(() => {
    component.swFileObj.name = '';
    let list = workflow_image_res;
    list[0].name = '';
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(list));
    spyOn(fileService, 'deleteSwFileById').and.returnValue(throwError(errorStatus401));
    component.reverseUpload(true);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('reverseUpload error test2', fakeAsync(() => {
    let err = errorStatus401;
    err.status = 413;
    spyOn(fileService, 'getSwFilesList').and.returnValue(throwError(err));
    component.reverseUpload(false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onFileChange error test', fakeAsync(() => {
    component.selectedSSID = workflow.hsiRes.wifiSsidExos[2];
    component.onFileChange(getFileList());
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    fixture.detectChanges();
    component.onSubmitSSID();
    component.onDiscardSSID('discard');
    flush(5000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSaveWorkFlow test',fakeAsync(()=>{
    spyOn(hsiService, 'updateHSI').and.returnValue(of(workflow.hsiRes));
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    component.hsiModel = workflow.hsiRes;
    component.onSaveWorkFlow(false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));
  it('onSaveWorkFlow error test',fakeAsync(()=>{
    spyOn(hsiService, 'updateHSI').and.returnValue(throwError(errorStatus401));
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    component.hsiModel = workflow.hsiRes;
    component.onSaveWorkFlow(false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))
  it('onSaveWorkFlow else test',fakeAsync(()=>{
    component.hsiModel = {};
    spyOn(hsiService, 'postHSI').and.returnValue(of({}));
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    fixture.detectChanges();
    component.onSaveWorkFlow(false);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));
  it('changeWifiSsid else test',fakeAsync(()=>{
    component.selectedSSID = workflow.hsiRes.wifiSsidExos[0];
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    fixture.detectChanges();
    component.changeWifiSsid();
    flush(5000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))

  it('getDeviceGrp test',fakeAsync(()=>{
    spyOn(api, 'GetDeviceGroup').and.returnValue(of(workflow_static_group_res));
    component.getDeviceGrp();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));
  it('getDeviceGrp error test',fakeAsync(()=>{
    spyOn(api, 'GetDeviceGroup').and.returnValue(throwError(errorStatus401));
    component.getDeviceGrp();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }))

  it('ngOnDestroy test', fakeAsync(() => {
    component.translateSubscribe = new Subject();
    component.allwrkflowSubscribe = new Subject();
    component.wrkflowDtlSubscribe = new Subject();
    component.deleteSubs = new Subject();
    component.resumeSubs = new Subject();
    component.ngOnDestroy();
    fixture.detectChanges();
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('selectedDropdownSSID test', fakeAsync(() => {
    component.selectedDropdownSSID(new Event(''));
    fixture.detectChanges();
    flush(5000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('deleteWrkflw test', fakeAsync(() => {
    let workdlowData = workflow.workflow_list;
    component.deleteWrkflw(workdlowData[1]);
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('deleteWrkflw if test', fakeAsync(() => {
    let workdlowData = JSON.parse(JSON.stringify(workflow.workflow_list));
    component.deleteWrkflw(workdlowData[1]);
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('resumeWrkflw test', fakeAsync(() => {
    let workdlowData = workflow.workflow_list;
    component.resumeWrkflw(workdlowData[1]);
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));


  it('getWokflowDetails if condition test', fakeAsync(() => {
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    component.getWokflowDetails(workflow.workflow_list.filter(obj => obj.name == 'Default Onboarding Workflow')[0]);
    flush(2000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('fetchVersionModel test', fakeAsync(() => {
    component.fetchVersionModel(getFileList()[0]);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('fillVersionAndName test', fakeAsync(() => {
    component.swFileObj = workflow_config_res[0];
    fixture.detectChanges();
    component.fillVersionAndName(workflow_config_res[0].version);
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSubmitSSID test else if', fakeAsync(() => {
    let hsi = {
      _id: "8f3a2f0e-73d8-4db5-94ed-c3673894a9c8",
      orgId: "470053",
      timezonePosix: {
        Tz: "Asia/Kolkata",
        TzName: "Asia/Kolkata",
        TzValue: "IST-5:30",
        NTPEnable: true,
        NTPServer1: "time.facebook.com",
        NTPServer2: "2.2.2.2",
        NTPServer3: "3.3.3.3",
        NTPServer4: "4.4.4.4"
      },
      userCredentials: {
        Password: "Testing@1670290255635",
        Username: "autotest1670290255635"
      },
      wifiSsidExos: [{SSID:'SSID1',Enable:false,WlanIndex:'1',PreSharedKey:{1:{KeyPassphrase: null }}}]
    };
    component.selectedSSID = hsi.wifiSsidExos[0];
    localStorage.setItem('hsiSave', JSON.stringify(hsi));
    fixture.detectChanges();
    component.onSubmitSSID();
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

  it('onSubmitSSID test else', fakeAsync(() => {
    component.selectedSSID = workflow.hsiRes.wifiSsidExos[0];
    localStorage.setItem('hsiSave', JSON.stringify(workflow.hsiRes));
    fixture.detectChanges();
    component.onSubmitSSID();
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));
  it('onSubmitSSID test if', fakeAsync(() => {
    component.selectedSSID = workflow.hsiRes.wifiSsidExos[0];
    localStorage.removeItem('hsiSave');
    fixture.detectChanges();
    component.onSubmitSSID();
    flush(3000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));
  
  it('set sorting function test', fakeAsync(() => {
    component.swFileObj = workflow_config_res[0];
    let ElementSelected = document.querySelectorAll(`#workflow-table thead tr th`)[0] as HTMLElement;
    // ElementSelected.classList.add('sorting');
    fixture.detectChanges();
    component.setSorting(ElementSelected,'asc');
    flush(1000);
    expect(component).toBeTruthy();
    fixture.destroy();
  }));

});
