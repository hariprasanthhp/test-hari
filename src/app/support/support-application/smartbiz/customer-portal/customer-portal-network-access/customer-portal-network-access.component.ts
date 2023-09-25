import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'customer-portal-network-access',
  templateUrl: './customer-portal-network-access.component.html',
  styleUrls: ['./customer-portal-network-access.component.scss']
})
export class CustomerPortalNetworkAccessComponent implements OnInit {

  @Input() language: any = {};
  @Input() set detectLanguageChange(language) {
    this.ngOnInit();
  };
  @Input() set detectScheduleChange(schedules) {
    if (this.networkAccessType == 'Custom') {
      this.ngOnInit();
      this.validateDays();
    }
  }
  @Output() submitForm: any = new EventEmitter();

  @ViewChild('addScheduleModal', { static: true }) private addScheduleModal: TemplateRef<any>;

  form: FormGroup;
  disableAddButton = false;
  formSubmitted = false;
  duplicateTimeRangeError = false;
  networkAccessType = 'Always';
  errorMessage = '';
  networkAccess = [];
  days = [];
  formattedSchedules = [];
  newSchedule = {
    selectedDays: [],
    enabled: true,
    startTime: new Date(),
    stopTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
  }
  maxDate = new Date('2023/7/18 11:58:00 pm');

  constructor(
    public parent: FormGroupDirective,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.parent.form;
    this.networkAccess = [
      {
        id: 'Always',
        name: 'Always On',
        label: this.language['Always_On'],
      },
      {
        id: 'Everyday',
        name: 'Everyday',
        label: this.language['everyDay'],
      },
      {
        id: 'Custom',
        name: 'Custom',
        label: this.language['Custom'],
      }
    ];
    this.days = [
      { id: 'mon', name: 'Monday', label: this.language['Monday'], timeRanges: [] },
      { id: 'tue', name: 'Tuesday', label: this.language['Tuesday'], timeRanges: [] },
      { id: 'wed', name: 'Wednesday', label: this.language['Wednesday'], timeRanges: [] },
      { id: 'thu', name: 'Thursday', label: this.language['Thursday'], timeRanges: [] },
      { id: 'fri', name: 'Friday', label: this.language['Friday'], timeRanges: [] },
      { id: 'sat', name: 'Saturday', label: this.language['Saturday'], timeRanges: [] },
      { id: 'sun', name: 'Sunday', label: this.language['Sunday'], timeRanges: [] },
    ];

    if (this.schedules.length == 0) {
      this.networkAccessType = 'Always';
      return;
    }
    this.formSubmitted = false;
    this.initNewSchedule();
    this.formatSchedules();
  }

  get schedules() {
    return this.form.get('schedules').value;
  }

  get scheduleFormArray(): FormArray {
    return this.form.get('schedules') as FormArray;
  }

  get startTimeString() {
    return this.newSchedule.startTime ? this.getDateString(this.newSchedule.startTime) : '';
  }

  get stopTimeString() {
    return this.newSchedule.stopTime ? this.getDateString(this.newSchedule.stopTime) : '';
  }

  getDateString(date) {
    let hours = String(date.getHours() ? (String(date.getHours()).length == 1 ? '0' + date.getHours() : date.getHours()) : '00');
    let minutes = String(date.getMinutes() ? (String(date.getMinutes()).length == 1 ? '0' + date.getMinutes() : date.getMinutes()) : '00');
    return hours + minutes;
  }

  networkChange() {
    this.formattedSchedules = [];
    // if (this.networkAccessType == 'Always') {
    //   this.scheduleFormArray.clear();
    //   this.submitForm.emit('');
    //   return;
    // } else if (this.networkAccessType == 'Everyday') {
    //   this.addSchedule(false);
    //   return;
    // }

    if (this.networkAccessType == 'Always' || this.networkAccessType == 'Everyday') {
      this.initNewSchedule();
      this.addSchedule(false);
      return;
    }

    this.scheduleFormArray.clear();
    this.days.forEach((day: any) => {
      let newScheduleFormGroup = this.formBuilder.group({
        timeRanges: this.formBuilder.array([{
          startTime: '0000',
          stopTime: '2359'
        }]),
        weekDays: day.id
      });
      newScheduleFormGroup.patchValue({ weekDays: day.id });
      this.scheduleFormArray.push(newScheduleFormGroup);
    });
    this.initNewSchedule();
  }

  initNewSchedule() {
    this.errorMessage = '';
    this.duplicateTimeRangeError = false;
    this.newSchedule = {
      selectedDays: [],
      enabled: true,
      startTime: new Date(),
      stopTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
    }
  }

  formatSchedules() {
    // if (this.schedules.length == 0) {
    //   this.networkAccessType = 'Always';
    //   return;
    // }
    let ranges = [];
    this.formattedSchedules = [...this.days];
    let schedules = [...this.schedules];

    schedules.forEach((schedule: any, i) => {
      let timeRanges = [];

      schedule.timeRanges.forEach(time => {
        const range = String(time.startTime) + String(time.stopTime);
        const timeRange = {
          startTime: this.formatTime(range.substring(0, 2) + ',' + range.substring(2, 4), 'string'),
          stopTime: this.formatTime(range.substring(4, 6) + ',' + range.substring(6, 8), 'string'),
        }

        if (range != '00002359') {
          timeRanges.push(timeRange);
        }
        if (!ranges.includes(range)) ranges.push(range);
      });

      let existingDay = this.formattedSchedules.find(day => day.id == schedule.weekDays);
      existingDay['timeRanges'] = timeRanges;
    });

    ranges.forEach(range => {
      let days = [];
      schedules.forEach(schedule => {
        schedule.timeRanges.forEach(time => {
          if (range == String(time.startTime) + String(time.stopTime)) days.push(schedule.weekDays);
        });
      });

      let scheduledDays = days.sort().join(',');
      let allDays = this.days.map(day => {
        return day.id;
      }).sort().join(',');

      if (scheduledDays == allDays && this.networkAccessType != 'Custom') {
        if (ranges.length == 1 && (ranges[0] == '00002359')) {
          this.networkAccessType = 'Always';
        } else {
          this.networkAccessType = 'Everyday';
          this.newSchedule.startTime = this.formatTime(range.substring(0, 2) + ',' + range.substring(2, 4), 'object');
          this.newSchedule.stopTime = this.formatTime(range.substring(4, 6) + ',' + range.substring(6, 8), 'object');
        }
      } else {
        this.networkAccessType = 'Custom';
      }
    });
  }

  formatTime(timeString, returnType): any {
    let hours = timeString.split(',').shift();
    let minutes = timeString.split(',').pop();
    if (hours == '00' && minutes == '00' && this.networkAccessType != 'Everyday') {
      return '0000';
    }
    let date = new Date('1/1/1 ' + hours + ':' + minutes + ':00');
    if (returnType == 'object') {
      return date;
    }
    return moment(date).format('hh:mm A');
  }

  openAddScheduleModal() {
    this.formSubmitted = false;
    this.disableAddButton = true;
    this.errorMessage = '';
    this.initNewSchedule();
    this.modalService.open(this.addScheduleModal, {
      size: 'sm',
      windowClass: "add-schedule-modal",
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  addSchedule(closeModal) {
    this.formSubmitted = true;
    if (this.networkAccessType == 'Custom' && !this.newSchedule.selectedDays.length) return;
    this.disableAddButton = true;

    let timeRange = {
      startTime: this.startTimeString,
      stopTime: this.stopTimeString
    };

    if (this.networkAccessType == 'Always') {
      this.scheduleFormArray.clear();
      this.days.forEach((day: any) => {
        let newScheduleFormGroup = this.formBuilder.group({
          timeRanges: this.formBuilder.array([{
            startTime: '0000',
            stopTime: '2359'
          }]),
          weekDays: day.id
        });
        newScheduleFormGroup.patchValue({ weekDays: day.id });
        this.scheduleFormArray.push(newScheduleFormGroup);
      });
    } else if (this.networkAccessType == 'Everyday') {
      this.scheduleFormArray.clear();
      this.days.forEach((day: any) => {
        let newScheduleFormGroup = this.formBuilder.group({
          timeRanges: this.formBuilder.array([timeRange]),
          weekDays: day.id
        });
        newScheduleFormGroup.patchValue({ weekDays: day.id });
        this.scheduleFormArray.push(newScheduleFormGroup);
      });
    } else if (this.networkAccessType == 'Custom') {
      // if (!this.formattedSchedules.length) this.scheduleFormArray.clear();

      this.newSchedule.selectedDays.forEach((day: any) => {
        let existingSchedule = this.schedules.find(schedule => schedule.weekDays == day);
        if (existingSchedule) {
          if (timeRange.startTime == '0000' && timeRange.stopTime == '0000') {
            existingSchedule.timeRanges = [];
          }
          if (existingSchedule.timeRanges.find(timeRange => timeRange.startTime == '0000' && timeRange.stopTime == '0000')) {
            existingSchedule.timeRanges = [];
          }
          if ((existingSchedule.timeRanges.length == 1) && existingSchedule.timeRanges.find(timeRange => timeRange.startTime == '0000' && timeRange.stopTime == '2359')) {
            existingSchedule.timeRanges = [];
          }
          existingSchedule.timeRanges.push(timeRange);
        } else {
          let newScheduleFormGroup = this.formBuilder.group({
            timeRanges: this.formBuilder.array([timeRange]),
            weekDays: day
          });
          newScheduleFormGroup.patchValue({ weekDays: day });
          this.scheduleFormArray.push(newScheduleFormGroup);
        }
      });
    }

    this.submitForm.emit('');
    if (!closeModal) return;
    this.modalService.dismissAll();
  }

  validateDays() {
    if (this.networkAccessType != 'Custom') return;

    this.disableAddButton = true;
    this.errorMessage = '';
    this.duplicateTimeRangeError = false;

    if (this.newSchedule.selectedDays.length) {
      this.disableAddButton = false;
      if (!this.newSchedule.enabled) return;
    }
    if (this.formattedSchedules.length == 0) return;

    this.newSchedule.selectedDays.forEach((day: any) => {
      let dayExists = this.schedules.find(schedule => schedule.weekDays == day);
      if (dayExists.timeRanges[0].startTime == '0000' && dayExists.timeRanges[0].stopTime == '2359') {
        return;
      }

      if (dayExists) {
        if (dayExists.timeRanges.length == 5) {
          this.errorMessage = `${this.language['Sorry, you can set up to five network access hour time slots each day']}`;
          this.disableAddButton = true;
          return;
        }

        dayExists.timeRanges.forEach((timeRange: any) => {
          if (
            (this.startTimeString >= timeRange.startTime && this.startTimeString <= timeRange.stopTime) ||
            (this.stopTimeString >= timeRange.startTime && this.stopTimeString <= timeRange.stopTime) ||
            (timeRange.startTime >= this.startTimeString && timeRange.startTime <= this.stopTimeString) ||
            (timeRange.stopTime >= this.startTimeString && timeRange.stopTime <= this.stopTimeString)
          ) {
            this.disableAddButton = true;
            this.duplicateTimeRangeError = true;
            return;
          };
        })
      }
    });
  }

  calcualteStopTime(type = 'set') {
    if (this.newSchedule.startTime) {
      let maxDate = new Date(this.newSchedule.startTime);
      maxDate.setHours(23);
      maxDate.setMinutes(58);
      this.maxDate = new Date(maxDate);

      const startTimeCopy = new Date(this.newSchedule.startTime);
      let stopTime = new Date(startTimeCopy.setMinutes(startTimeCopy.getMinutes() + 1));
      if (type == 'get') {
        return stopTime;
      }
      this.newSchedule.stopTime = stopTime;
    }
  }

  getMinDate() {
    if (this.newSchedule.startTime) {
      const startTimeCopy = new Date(this.newSchedule.startTime);
      return new Date(startTimeCopy.setMinutes(startTimeCopy.getMinutes() + 1));
    }
  }

  getTimeString(timeRange) {
    if (timeRange.startTime == '0000' && timeRange.stopTime == '0000') {
      return this.language['Network Disabled'];
    }
    return (parseInt(timeRange.startTime) ? timeRange.startTime : '12:00 AM') + ' to ' + (parseInt(timeRange.stopTime) ? timeRange.stopTime : '12:00 AM');
  }

  disabledNetworkAccess() {
    if (!this.newSchedule.enabled) {
      this.newSchedule.startTime = new Date('1/1/1 ' + '00:00:00');
      this.newSchedule.stopTime = new Date('1/1/1 ' + '00:00:00');
    } else {
      this.newSchedule.startTime = new Date();
      this.newSchedule.stopTime = new Date(new Date().setMinutes(new Date().getMinutes() + 1));
    }
    this.validateDays();
  }

  deleteNetworkAccess(dayId, networkAccessIndex) {
    let dayIndex = this.schedules.findIndex(schedule => schedule.weekDays == dayId);
    if (this.scheduleFormArray.at(dayIndex).value.timeRanges.length > 1) {
      this.scheduleFormArray.at(dayIndex).value.timeRanges.splice(networkAccessIndex, 1)
    } else {
      this.scheduleFormArray.at(dayIndex).patchValue({
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }]
      });
      this.networkAccessType = 'Always';
    }
    this.formatSchedules();
    this.validateDays();
    this.submitForm.emit('');
  }

}
