import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { WorkflowAlarmsComponent } from './workflow-alarms.component';

describe('WorkflowAlarmsComponent', () => {
  let component: WorkflowAlarmsComponent;
  let fixture: ComponentFixture<WorkflowAlarmsComponent>;

  beforeEach(() => {
    const ngbModalStub = () => ({ open: (deleteModal, object) => ({}) });
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkflowAlarmsComponent],
      providers: [
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WorkflowAlarmsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`alarmsActiveTab has default value`, () => {
    expect(component.alarmsActiveTab).toEqual(`individual_alarm`);
  });

  it(`selectedAlarmsActiveTab has default value`, () => {
    expect(component.selectedAlarmsActiveTab).toEqual(
      `selected_individual_alarms`
    );
  });

  describe('addSelectedIndividualAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'removeDuplicate').and.callThrough();
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.addSelectedIndividualAlarmList();
      // expect(component.removeDuplicate).toHaveBeenCalled();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('addSelectedGroupAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'removeDuplicate').and.callThrough();
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.addSelectedGroupAlarmList();
      // expect(component.removeDuplicate).toHaveBeenCalled();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('addSelectedTransformAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'removeDuplicate').and.callThrough();
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.addSelectedTransformAlarmList();
      // expect(component.removeDuplicate).toHaveBeenCalled();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('removeSelectedIndividualAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.removeSelectedIndividualAlarmList();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('removeSelectedGroupAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.removeSelectedGroupAlarmList();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('removeSelectedTransformAlarmList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'calculateTotalMonitoredAlarms').and.callThrough();
      // component.removeSelectedTransformAlarmList();
      // expect(component.calculateTotalMonitoredAlarms).toHaveBeenCalled();
    });
  });

  describe('checkrulesExist', () => {
    it('makes expected calls', () => {
      spyOn(component, 'addSelectedIndividualAlarmList').and.callThrough();
      // component.checkrulesExist();
      // expect(component.addSelectedIndividualAlarmList).toHaveBeenCalled();
    });
  });

  describe('checkCategorySeverity', () => {
    it('makes expected calls', () => {
      spyOn(component, 'addSelectedIndividualAlarmList').and.callThrough();
      spyOn(component, 'removeAlarms').and.callThrough();
      // component.checkCategorySeverity();
      // expect(component.addSelectedIndividualAlarmList).toHaveBeenCalled();
      // expect(component.removeAlarms).toHaveBeenCalled();
    });
  });

  describe('doRemoveAlarms', () => {
    it('makes expected calls', () => {
      spyOn(component, 'addSelectedIndividualAlarmList').and.callThrough();
      spyOn(component, 'close').and.callThrough();
      // component.doRemoveAlarms();
      // expect(component.addSelectedIndividualAlarmList).toHaveBeenCalled();
      // expect(component.close).toHaveBeenCalled();
    });
  });
});
