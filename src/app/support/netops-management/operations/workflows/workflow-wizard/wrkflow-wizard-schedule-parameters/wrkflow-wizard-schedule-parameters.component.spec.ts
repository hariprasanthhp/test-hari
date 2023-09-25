import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomMinDirective } from 'src/app/support/shared/custom-directives/custom-min.directive';
import { EnglishJSON } from 'src/assets/language/english.service';

import * as schedule_mock from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-schedule/workflow-schedule-parameters';

import { WrkflowWizardScheduleParametersComponent } from './wrkflow-wizard-schedule-parameters.component';

describe('WrkflowWizardScheduleParametersComponent', () => {
  let component: WrkflowWizardScheduleParametersComponent;
  let fixture: ComponentFixture<WrkflowWizardScheduleParametersComponent>;

  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrkflowWizardScheduleParametersComponent, CustomMinDirective],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,

      ],
      providers: [TranslateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(WrkflowWizardScheduleParametersComponent);
        component = fixture.componentInstance;
        component.workflowInputData = schedule_mock.workflow_opr_execPolicy;
        fixture.detectChanges();

        translateService = TestBed.inject(TranslateService);

      })
  });

  // afterEach (() => {
  //   fixture.destroy();
  //   TestBed.resetTestingModule();
  // });

  it('Ng-OnInit and time schedule', fakeAsync(() => {
    component.workflowInputData = schedule_mock.workflow_opr_execPolicy;
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    flush(1000);
  }));

  it('Ng-OnInit official image and time schedule', fakeAsync(() => {
    component.workflowInputData = schedule_mock.workflow_opr_execPolicy;
    component.workflowInputData.actions.push(schedule_mock.officialImage);
    component.workflowInputData.actions.splice(0,1);
    component.workflowInputData.execPolicy.window = {type:'weekly',recurrence :undefined,weekdays:['SUN','MON','TUE','WEN','THU','FRI','SAT']};
    console.log('the actions',component.workflowInputData.actions)
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    fixture.detectChanges();
    component.workflowInputData.execPolicy.window = {type:'monthly',recurrence :undefined,daysOfMonth:['SUN','MON','TUE','WEN','THU','FRI','SAT'],frequency:1};
    component.ngOnInit();
    translateService.selectedLanguage.next(of(eng));
    flush(1000);
  }));

  it('Ng-OnInit else and time schedule', fakeAsync(() => {
    component.workflowInputData = schedule_mock.workflowWithCpeEvent;
    // component.workflowInputData.actions.push(schedule_mock.officialImage);
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    flush(1000);
  }));

  it('Time schedular getRangeRecurrence', fakeAsync(() => {
    spyOn(component,'getRangeRecurrence').and.callThrough();
    component.getRangeRecurrence({target:{value:'endBy'}});
    flush(1000);
  }));

  it('Time schedular getRangeRecurrence else', fakeAsync(() => {
    spyOn(component,'getRangeRecurrence').and.callThrough();
    component.getRangeRecurrence({target:{value:'endAfter'}});
    flush(1000);
  }));

  it('go_previous click test', fakeAsync(() => {
    spyOn(component.activeTab, 'emit').and.callThrough();
    let clicked = fixture.nativeElement.querySelector('#previous');
    clicked.click();
    fixture.detectChanges();
    flush(1000);
    expect(component.activeTab.emit).toHaveBeenCalledWith('Select Operation Parameters');
  }));

  it('go_next click test', fakeAsync(() => {
    component.workflowInputData = schedule_mock.workflow_opr_data;
    component.startDateTime  = new Date();
    component.RangeRecurrenceEndBy  = true;
    component.weekScheduling  = true;
    component.weekselected  = [];
    fixture.detectChanges();
    component.go_next();

    // fixture.detectChanges();
    // component.startDateTime  = new Date();
    // component.RangeRecurrenceEndBy  = true;
    // component.weekScheduling  = true;
    // component.weekselected  = [];
    // component.weekselected.push('FRI');
    // fixture.detectChanges();
    // component.go_next();
    flush(2000)
  }));

  it('validateWindow test', fakeAsync(() => {
    component.validateWindow(null);
    fixture.detectChanges();
    flush(1000);
  }));
  it('validateWindow test1', fakeAsync(() => {
    component.validateWindow(0);
    fixture.detectChanges();
    flush(1000);
  }))
  it('validateWindow test2', fakeAsync(() => {
    component.validateWindow(1441);
    fixture.detectChanges();
    flush(1000);
  }))

  it('onSelectStartTime test', fakeAsync(() => {
    component.onSelectStartTime({target:{value:new Date()}});
    fixture.detectChanges();
    flush(1000);
  }));

  it('onSelectStartOnlyTime test', fakeAsync(() => {
    component.onSelectStartOnlyTime({target:{value:(new Date()).toString()}});
    fixture.detectChanges();
    flush(1000);
  }))

  it('onSelectEndTime test', fakeAsync(() => {
    component.onSelectEndTime({target:{value:new Date()}});
    fixture.detectChanges();
    flush(1000);
  }))
    
  it('onChangeEndTime test', fakeAsync(() => {
    component.onChangeEndTime({target:{value:new Date()}});
    fixture.detectChanges();
    flush(1000);
  }))

  it('Time schedular optionValChoose', fakeAsync(() => {
    component.scheduleValueSelected ='Time Scheduler';
    component.optionValChoose();
    fixture.detectChanges();
    component.scheduleValueSelected ='On Discovery';
    component.optionValChoose();
    flush(1000);
  }));

  it('Time schedular getRecurrenceData', fakeAsync(() => {
    component.getRecurrenceData({target:{value:'daily'}});
    fixture.detectChanges();
    component.getRecurrenceData({target:{value:'weekly'}});
    fixture.detectChanges();
    component.getRecurrenceData({target:{value:'monthly'}});
    fixture.detectChanges();
    flush(1000);
  }));

  it('Time schedular bindData', fakeAsync(() => {
    component.bindData({target:{checked:true,value:'SAT'}});
    fixture.detectChanges();
    component.bindData({target:{checked:false,value:'THU'}});
    flush(1000);
  }));

});
