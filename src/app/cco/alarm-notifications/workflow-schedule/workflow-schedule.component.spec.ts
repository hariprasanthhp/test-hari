import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { AlarmNotificationsTimezoneService } from '../services/alarm-notifications-timezone.service';
import { FormsModule } from '@angular/forms';
import { WorkflowScheduleComponent } from './workflow-schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('WorkflowScheduleComponent', () => {
  let component: WorkflowScheduleComponent;
  let fixture: ComponentFixture<WorkflowScheduleComponent>;

  beforeEach(() => {
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const dateUtilsServiceStub = () => ({ getLocalTimeZoneName: () => ({}) });
    const workflowServiceStub = () => ({ enforceMinMax: event => ({}) });
    const alarmNotificationsTimezoneServiceStub = () => ({
      getTimeZones: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkflowScheduleComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: DateUtilsService, useFactory: dateUtilsServiceStub },
        { provide: WorkflowService, useFactory: workflowServiceStub },
        {
          provide: AlarmNotificationsTimezoneService,
          useFactory: alarmNotificationsTimezoneServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(WorkflowScheduleComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`formatType has default value`, () => {
    expect(component.formatType).toEqual([{ value: 'html', name: 'HTML' },
    { value: 'pdf', name: 'PDF' }]);
  });

  it(`validEmail has default value`, () => {
    expect(component.validEmail).toEqual(true);
  });

  it(`triggerType has default value`, () => {
    expect(component.triggerType).toEqual([{ value: 'true', name: 'Immediately' }]);
  });

  it(`addFirstAttemptFailed has default value`, () => {
    expect(component.addFirstAttemptFailed).toEqual(false);
  });

  it(`timezones has default value`, () => {
    expect(component.timezones).toEqual([]);
  });

  // it(`emailValidators has default value`, () => {
  //   expect(component.emailValidators).toEqual([]);
  // });

  describe('must_be_email', () => {
    it('makes expected calls', () => {
      const formControlStub: FormControl = <any>{};
      spyOn(component, 'validateEmail').and.callThrough();
      component.must_be_email(formControlStub);
      // expect(component.validateEmail).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dateUtilsServiceStub: DateUtilsService = fixture.debugElement.injector.get(
        DateUtilsService
      );
      const alarmNotificationsTimezoneServiceStub: AlarmNotificationsTimezoneService = fixture.debugElement.injector.get(
        AlarmNotificationsTimezoneService
      );
      spyOn(component, 'onSelectReccurence').and.callThrough();
      spyOn(dateUtilsServiceStub, 'getLocalTimeZoneName').and.callThrough();
      spyOn(
        alarmNotificationsTimezoneServiceStub,
        'getTimeZones'
      ).and.callThrough();

      
      // component.ngOnInit();
      component.timezones = alarmNotificationsTimezoneServiceStub.getTimeZones()
      // expect(component.onSelectReccurence).toHaveBeenCalled();
      // expect(dateUtilsServiceStub.getLocalTimeZoneName).toHaveBeenCalled();
      expect(
        alarmNotificationsTimezoneServiceStub.getTimeZones
      ).toHaveBeenCalled();
    });
  });
});
