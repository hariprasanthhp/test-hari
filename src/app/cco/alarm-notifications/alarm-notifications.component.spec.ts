import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { IssueService } from '../issues/service/issue.service';
import { Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';
import { AlarmNotificationsComponent } from './alarm-notifications.component';
import { AlarmNotificationsModule } from './alarm-notifications.module';
import { AlarmNotificationsApisService } from './services/alarm-notifications-apis.service';

describe('AlarmNotificationsComponent', () => {
  let component: AlarmNotificationsComponent;
  let fixture: ComponentFixture<AlarmNotificationsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmNotificationsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, AlarmNotificationsModule],
      providers: [TranslateService, CommonService, SsoAuthService, FormBuilder, AlarmNotificationsApisService]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // on add mode
  it('should call callMultipleAPI', fakeAsync(() => {
    let AlarmNotificationsService = fixture.debugElement.injector.get(AlarmNotificationsApisService);
    component.callMultipleAPI();
    component.getCategories();
    component.getIndividualAlarmData();
    component.getTransformAlarmData();
    component.regionsApiLoader();


    tick();
    component.notificationsData.workflowId = '';
    spyOn(component, "mergeAlarmRules").and.stub();

    expect(component.notificationsData.alarms.individualAlarmData.categoryList).toEqual([]);
    expect(component.notificationsData.alarms.monitoredIndividualAlarm.categoryList).toEqual([]);
    expect(component.notificationsData.alarms.individualAlarmData.data).toEqual([]);
    expect(component.notificationsData.alarms.transformAlarmData).toEqual({ data: [  ] });
    expect(component.notificationsData.conditions.regionsDataArray).toEqual(['All']);

  }));

  it('should saveAndContinue', () => {
    component.activeTab = 'Details';
    component.notificationsData.workflowId = '';

    component.saveAndContinue(0);
    const req = httpTestingController?.expectOne(request => {
      console.log("deployWorkflow", request.url)
      return true;
    });
    req?.flush('saved successfully');

    fixture.detectChanges();

    //expect(component.updateStepperCompleted).toHaveBeenCalled();
  });

  // it('should pause and run workflow', () => {
  //   expect(component.loading).toEqual(false);
  //   expect(component.errorMsg).toEqual(undefined);
  //   expect(component.successInfo).toEqual('');
  //   component.notificationsData.workflowId = 'd524a51b-ab47-4c1e-8611-068d91b5326b';
  //   component.pauseContinueWorkflow('pause');
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("deployWorkflow", request.url)
  //     return true;
  //   });
  //   req.flush('Workflow successfully deployed');

  //   fixture.detectChanges();

  //   expect(component.pauseContinueWorkflow).toHaveBeenCalled();
  // });
});
