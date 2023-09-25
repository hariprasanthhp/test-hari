import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalNetworkAccessComponent } from './customer-portal-network-access.component';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { on } from 'events';

describe('CustomerPortalNetworkAccessComponent', () => {
  let component: CustomerPortalNetworkAccessComponent;
  let fixture: ComponentFixture<CustomerPortalNetworkAccessComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerPortalNetworkAccessComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        CalendarModule,
      ],
      providers: [
        FormGroupDirective,
        // { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPortalNetworkAccessComponent);
    component = fixture.componentInstance;
    component.parent.form = formBuilder.group({
      name: '',
      schedules: formBuilder.array([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    component.detectLanguageChange = {};
    component.networkAccessType = 'Custom';
    component.detectScheduleChange = {};
    component.ngOnInit();
    let newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '0000',
        stopTime: '0000'
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.ngOnInit();

    let schedules = [
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'mon'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'tue'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'wed'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'thu'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'fri'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'sat'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'sun'
      },
    ];
    component.scheduleFormArray.clear();
    schedules.forEach(schedule => {
      newScheduleFormGroup = formBuilder.group(
        {
          timeRanges: formBuilder.array(schedule.timeRanges),
          weekDays: schedule.weekDays
        }
      );
      component.scheduleFormArray.push(newScheduleFormGroup);
    });

    component.networkAccessType = 'Everyday';
    component.ngOnInit();

    schedules = [
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'mon'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'tue'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'wed'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'thu'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'fri'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'sat'
      },
      {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: 'sun'
      },
    ];
    component.scheduleFormArray.clear();
    schedules.forEach(schedule => {
      newScheduleFormGroup = formBuilder.group(
        {
          timeRanges: formBuilder.array(schedule.timeRanges),
          weekDays: schedule.weekDays
        }
      );
      component.scheduleFormArray.push(newScheduleFormGroup);
    });
    component.ngOnInit();
  });


  it('load all simple functions', () => {
    component.initNewSchedule();
    component.openAddScheduleModal();
    component.formatTime('12,30', 'object');
    component.formatTime('00,00', 'string');
    component.getDateString(new Date());
    component.networkChange();
    component.networkAccessType = 'always';
    component.networkChange();
    component.networkAccessType = 'Everyday';
    component.networkChange();
    component.newSchedule.startTime = new Date();
    component.calcualteStopTime('get');
    component.calcualteStopTime('set');
    component.disabledNetworkAccess();
    component.newSchedule.enabled = false;
    component.disabledNetworkAccess();

    let timeRange = {
      startTime: '1205',
      stopTime: '1305',
    }
    component.getTimeString(timeRange);
    timeRange.startTime = '0000';
    timeRange.stopTime = '0000';
    fixture.detectChanges();
    component.getTimeString(timeRange);
    component.getMinDate()
  });

  it('should validate days', () => {
    // case 1 - when formatted schedules is empty
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [];
    component.validateDays();

    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: false,
      startTime: new Date('1/1/1 10:30:00'),
      stopTime: new Date(new Date().setMinutes(new Date('1/1/1 11:30:00').getMinutes() + 1)),
    };
    component.validateDays();

    component.newSchedule.enabled = true;
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];

    // case 2 - adding date and time which already exists
    let newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '10:30 am',
        stopTime: '11:30 am',
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.validateDays();

    // case 3 - adding date which already exists 5 times
    component.scheduleFormArray.clear();
    newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array(
        [
          {
            startTime: '0530',
            stopTime: '0630',
          },
          {
            startTime: '0635',
            stopTime: '0735',
          },
          {
            startTime: '0740',
            stopTime: '0840',
          },
          {
            startTime: '0845',
            stopTime: '0945',
          },
          {
            startTime: '1045',
            stopTime: '1145',
          },
        ]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.validateDays();

    // case 4
    component.scheduleFormArray.clear();
    newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array(
        [{
          startTime: '0000',
          stopTime: '2359',
        }]
      ),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.validateDays();
  });

  it('should add schedule', () => {
    // case 1 when no days are selected
    component.networkAccessType = 'Custom';
    component.newSchedule.selectedDays = [];
    component.addSchedule(false);

    // case 2 when schedule for everyday are added
    component.newSchedule.selectedDays = ['mon', 'tue'];
    component.networkAccessType = 'Everyday';
    component.addSchedule(false);

    // case 3 when fresh custom schedules are added
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [];
    component.newSchedule.selectedDays = ['mon', 'tue'];
    component.addSchedule(true);

    // case 4 when a day in custom schedules is disabled
    component.scheduleFormArray.clear();
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 00:00:00'),
      stopTime: new Date('1/1/1 00:00:00'),
    };
    let newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '0200',
        stopTime: '0300'
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.addSchedule(true);

    // case 5 when new custom schedule is added to disabled day
    component.scheduleFormArray.clear();
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 01:00:00'),
      stopTime: new Date('1/1/1 02:00:00'),
    };
    newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '0000',
        stopTime: '0000'
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.addSchedule(true);

    // case 6
    component.scheduleFormArray.clear();
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '0000',
          stopTime: '2359',
        },
        label: 'Monday'
      }
    ];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 01:00:00'),
      stopTime: new Date('1/1/1 02:00:00'),
    };
    newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '0000',
        stopTime: '2359'
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.addSchedule(true);

    // case 7
    component.scheduleFormArray.clear();
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 01:00:00'),
      stopTime: new Date('1/1/1 02:00:00'),
    };
    component.addSchedule(true);
  });

  it('should delete schedule', () => {
    // case 1 - when there is only one schedule in a day
    let newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([{
        startTime: '0000',
        stopTime: '0000'
      }]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.deleteNetworkAccess('mon', 0);

    // case 2 - when there are multiple schedules in a day
    component.scheduleFormArray.clear();
    newScheduleFormGroup = formBuilder.group({
      timeRanges: formBuilder.array([
        {
          startTime: '0930',
          stopTime: '1030'
        },
        {
          startTime: '1030',
          stopTime: '1130'
        },
      ]),
      weekDays: 'mon'
    });
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.deleteNetworkAccess('mon', 0);
  });


});
