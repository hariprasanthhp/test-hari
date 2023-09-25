import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { workflow_list } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';

import * as schedule_mock from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-schedule/workflow-schedule-parameters';
import { search_res, workflow_download_res, workflow_exec_logs_res, workflow_status_res } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-status/workflow-status';
import { DataServiceService } from '../../data.service';
import { NetopsServiceService } from '../netops-management.service';
import { FileService } from '../operations/services/files.service';
import { WorkflowStatusComponent } from './workflow-status.component';


describe('WorkflowStatusComponent', () => {
  let component: WorkflowStatusComponent;
  let fixture: ComponentFixture<WorkflowStatusComponent>;

  let api: NetopsServiceService;
  let service: DataServiceService;
  let downloadService: DownloadService;
  let fileService: FileService;
  let sso: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;
  let date: DatePipe;

  let translateService: TranslateService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowStatusComponent],
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
        DataServiceService,
        NetopsServiceService,
        FileService,
        SsoAuthService,
        CommonService,
        Title,
        DownloadService,
        WindowRefService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate'), url: `/support/netops-management/operations/workflows/workflow-status` } },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ item: '6ce3a553-73b0-47be-ad88-5a70094d4fda', name: 'Jing_2028_backup' })
          }
        },
        DatePipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        api = TestBed.inject(NetopsServiceService);
        service = TestBed.inject(DataServiceService);
        downloadService = TestBed.inject(DownloadService);
        fileService = TestBed.inject(FileService);
        translateService = TestBed.inject(TranslateService);
        httpTestingController = TestBed.inject(HttpTestingController);
        sso = TestBed.inject(SsoAuthService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        date = TestBed.inject(DatePipe);

        fixture = TestBed.createComponent(WorkflowStatusComponent);
        component = fixture.componentInstance;
        component.orgId = 470053;
        spyOn(api, 'getWorkFlowExcLogsCount').and.returnValue(of({ "count": 1 }));
        fixture.detectChanges();
      })
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('Ng-OnInit test', () => {
    spyOn(api, 'GetWorkFlowCountHist').and.returnValue(of({ "count": 1 }));
    spyOn(api, 'GetWorkflowHisyPagination').and.returnValue(of(workflow_status_res));
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    component.workflowData = workflow_status_res;
    fixture.detectChanges();
  });

  it('workflow status data', () => {
    spyOn(api, 'GetWorkFlowCountHist').and.returnValue(of({ "count": 1 }));
    spyOn(api, 'GetWorkflowHisyPagination').and.returnValue(of(workflow_status_res));
    component.ngOnInit();
    component.workflowData = workflow_status_res;
    fixture.detectChanges();
    let listDate = document.querySelector('#workflow-status-table tbody tr td:nth-child(1) span').innerHTML;
    expect(listDate).toBe(date.transform(workflow_status_res[0].start, 'MM/dd/yyyy hh:mm a'));
  });

  it('Filtered Data test', () => {
    spyOn(component, 'getExcLogsCout').and.callThrough();
    component.showDetails = true;
    component.workflowFil = workflow_status_res;
    component.doFilter('Succeeded',workflow_status_res[0]);
    fixture.detectChanges();
    component.doFilter('Failed',workflow_status_res[0]);
    fixture.detectChanges();
    component.doFilter('In Progress',workflow_status_res[0]);
    fixture.detectChanges();
    component.doFilter('Pending',workflow_status_res[0]);
    fixture.detectChanges();
  });

  it('Filtered Data test', () => {
    spyOn(component, 'getExcLogsCout').and.callThrough();
    component.showDetails = true;
    component.workflowFil = workflow_status_res;
    component.succeed = true;
    component.doFilter('Succeeded',workflow_status_res[0]);
    fixture.detectChanges();
    component.failed = true;
    component.doFilter('Failed',workflow_status_res[0]);
    fixture.detectChanges();
    component.inprogress = true;
    component.doFilter('In Progress',workflow_status_res[0]);
    fixture.detectChanges();
    component.pending = true;
    component.doFilter('Pending',workflow_status_res[0]);
    fixture.detectChanges();
  });

  it('go_details click test', () => {
    spyOn(component, 'getExcLogsCout').and.callThrough();
    spyOn(component, 'getWorkflowStatus').and.callThrough();
    component.go_details(workflow_status_res[0]);
  });

  it('Downlod/Export click test', () => {
    // spyOn(api, 'DownloadpartWkflwData').and.returnValue(of(workflow_download_res))
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    component.workflowFil = workflow_status_res[0];
    component.filter = 'Succeeded';
    fixture.detectChanges();
    component.Download();
  });
  it('Downlod/Export click test else', () => {
    // spyOn(api, 'DownloadpartWkflwData').and.returnValue(of(workflow_download_res))
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    // component.workflowFil = workflow_status_res[0];
    component.filter = 'Succeeded';
    fixture.detectChanges();
    component.Download();
  });
  it('fetchWorkFlowExcLogs click test', fakeAsync(() => {
    component.filter = 'Succeeded';
    component.fetchWorkFlowExcLogs();
    let request = httpTestingController.match(req => {
      return req.url.includes('netops-wf/workflow-exec-logs') && req.method == 'GET';
    })
    request[0]?.flush(workflow_exec_logs_res);
    request[1]?.flush(workflow_exec_logs_res);
    tick(3000);
  }));

  it('GetWorkFlowCountHist click test', () => {
    spyOn(api, 'GetWorkFlowCountHist').and.returnValue(of({count: 1}))
    component.GetWorkFlowCountHist();
  });

  it('go_back click test', () => {
    component.go_back();
    component.closeWorkflow();
  });

  it('pageErrorHandle test', () => {
    component.pageErrorHandle(errorStatus401);
  });
  it('pageErrorHandle test', () => {
    component.pageErrorHandle(errorStatus500);
  })
  it('Refresh test1', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = true;
    component.succeed = true;
    component.Refresh();
  })
  it('Refresh test2', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = true;
    component.inprogress = true;
    component.Refresh();
  })
  it('Refresh test3', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = true;
    component.pending = true;
    component.Refresh();
  });
  it('Refresh test4', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = true;
    component.failed = true;
    component.Refresh();
  });
  it('Refresh test5 else', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = true;
    component.succeed = false;
    component.inprogress = false;
    component.pending = false;
    component.failed = false;
    component.Refresh();
  });

  it('Refresh test6', () => {
    component.workflowFil = workflow_exec_logs_res[0];
    component.showDetails = false;
    component.Refresh();
  });

  it('getStatusHistory click test', () => {
    component.isRerender = true;
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    component.workflowFil = workflow_exec_logs_res[0];
    spyOn(api, 'getExecLogs').and.returnValue(of(workflow_exec_logs_res));
    spyOn(component, 'getWorkflowStatus').and.callThrough();
    component.getStatusHistory("",workflow_status_res[0]);
  });
  it('getStatusHistory click test', () => {
    component.isRerender = true;
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    component.workflowFil = workflow_exec_logs_res[0];
    spyOn(api, 'getExecLogs').and.returnValue(throwError(errorStatus401));
    component.getStatusHistory("faild",workflow_status_res[0]);
  });

  it('tableLanguageOptions click test', () => {
    sessionStorage.setItem('defaultLanguage','fr');
    component.tableLanguageOptions();
    fixture.detectChanges();
    sessionStorage.setItem('defaultLanguage','es');
    component.tableLanguageOptions();
    fixture.detectChanges();
    sessionStorage.setItem('defaultLanguage','de_DE');
    component.tableLanguageOptions();
    fixture.detectChanges();
  });

  it('go_device click test', () => {
    component.isRerender = true;
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    component.workflowFil = workflow_exec_logs_res[0];
    spyOn(service, 'performSearch').and.returnValue(of(search_res));
    component.go_device(workflow_exec_logs_res[0]);
  });
  it('go_device click test', () => {
    component.isRerender = true;
    component.workflowId = '0ee09963-0af0-415a-bbea-b12b7c098c6b';
    component.workflowFil = workflow_exec_logs_res[0];
    spyOn(service, 'performSearch').and.returnValue(throwError(errorStatus401));
    component.go_device(workflow_exec_logs_res[0]);
  });
});
