import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { CcoAlarmNotificationsComponent } from './cco-alarm-notifications.component';
import { FormBuilder } from '@angular/forms';

describe('CcoAlarmNotificationsComponent', () => {
  let component: CcoAlarmNotificationsComponent;
  let fixture: ComponentFixture<CcoAlarmNotificationsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoAlarmNotificationsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [FormBuilder, TranslateService, CommonService,
        {
          provide: SsoAuthService, useValue: {
            getEntitlements: jasmine.createSpy().and.returnValue('210'),
            getScopes: jasmine.createSpy().and.returnValue([]),
          }
        },]
    })
      // .compileComponents().then(() => {
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(CcoAlarmNotificationsComponent);
        component = fixture.componentInstance;
      // });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAlarmWorkflowList', () => {

    component.getAlarmWorkflowList();
    const req = httpTestingController.match(request => {
      console.log("getAlarmWorkflowList", request.url)
      return true;
    });
    // req.flush([]);

    fixture.detectChanges();

    // expect(component.getAlarmWorkflowList).toHaveBeenCalled();
    expect(component.alarmWorkFlowList).toEqual([]);
  });

  it('should delete workflow', () => {
    component.error = false;
    component.success = false;
    component.errorInfo = undefined;
    component.successInfo = undefined;
    component.btnDisabled = false;
    component.loading = false;
    component['workflowId']  = '78274e824bhbdshgjgsjhk'
    // component.deleteAlarmWorkflowId();
    const req = httpTestingController.match(request => {
      console.log("deleteAlarmWorkflowId", request.url)
      return true;
    });
    // req.flush(true);


    // expect(component.getAlarmWorkflowList).toHaveBeenCalled();
  });


  it('should pause and run workflow', () => {
    component.loading = true;
    component.errorMsg = undefined;
    component.successInfo = undefined;

    component.pauseContinueWorkflow('d524a51b-ab47-4c1e-8611-068d91b5326b', 'pause', 'outliers');
    const req = httpTestingController.match(request => {
      console.log("deployWorkflow", request.url)
      return true;
    });
    // req.flush(true);

    fixture.detectChanges();

    // expect(component.getAlarmWorkflowList).toHaveBeenCalled();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoAlarmNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
