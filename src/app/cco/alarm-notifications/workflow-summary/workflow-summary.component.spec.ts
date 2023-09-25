import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AlarmNotificationsApisService } from '../services/alarm-notifications-apis.service';
import { AlarmNotificationsTimezoneService } from '../services/alarm-notifications-timezone.service';
import { Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';
import { WorkflowSummaryComponent } from './workflow-summary.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WorkflowSummaryComponent', () => {
  let component: WorkflowSummaryComponent;
  let fixture: ComponentFixture<WorkflowSummaryComponent>;
  let httpTestingController: HttpTestingController;
  let wfData = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowSummaryComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService, CommonService, AlarmNotificationsTimezoneService, AlarmNotificationsApisService, SsoAuthService, FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSummaryComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('get the workflow data', () => {
    component.getSummaryData();
    const req = httpTestingController.expectOne(request => {
      console.log("workflowdata", request.url)
      return true;
    });
    req.flush(wfData);
    expect(component.notificationsData).not.toBeUndefined();
    expect(component.notificationsData).toEqual(Object({ alarms: Object({ groupAlarmData: Object({ data: [  ] }), individualAlarmData: Object({ data: [  ], categoryList: [  ] }), transformAlarmData: Object({ data: [  ] }), monitoredIndividualAlarm: Object({ data: [  ], categoryList: [  ] }), monitoredGroupAlarm: Object({ data: [  ] }), monitoredTransformAlarm: Object({ data: [  ] }) }), conditions: Object({ regionsDataArray: [ 'All' ], locationDataArray: [ 'All' ] }) })); 
  });

  it('get the regions', () => {
    component.regionsApiLoader();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(Regions);
    expect(component.notificationsData.conditions.regionsDataArray).not.toBeUndefined();
    expect(component.notificationsData.conditions.regionsDataArray[1]).toEqual(undefined);
  });


  it('get the locations', () => {
    let region = ['d524a51b-ab47-4c1e-8611-068d91b5326b', 'd624a51b-ab47-4c1e-8611-068d91b5326b'];
    component.loadLocationValue(region);
    const req = httpTestingController?.expectOne(request => {
      console.log("locations", request.url)
      return true;
    });
    req.flush(Locations);
    expect(component.notificationsData.conditions.locationDataArray).not.toBeUndefined();
    expect(component.notificationsData.conditions.locationDataArray[1]).toEqual(undefined);
  });

});
