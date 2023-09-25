
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-alarm-wrkflow-wizard-schedule-parameters',
  templateUrl: './wrkflow-alarm-wizard-schedule-parameters.component.html',
  styleUrls: ['./wrkflow-alarm-wizard-schedule-parameters.component.scss']
})
export class WrkflowAlarmWizardScheduleParametersComponent implements OnInit {

  @Input() workflowInputData: any = {};
  @ViewChild('endTime') endTime: NgModel;
  @Output() workflowOprData: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  endtimeError: boolean = false;
  language: any;
  languageSubject;
  inputOperationType
  // weekData = ['SUN','MON','TUE','WED','THUR','FRI','SAT']

  scheduleValueSelected: any
  timeWindow = 60
  startDate
  timeschedule: boolean
  dailyChecked: boolean = true
  weekChecked: boolean = false
  monthChecked: boolean = false
  weekScheduling: boolean = false;
  monthScheduling: boolean = false;
  RangeRecurrenceEndBy: boolean = false;
  RangeRecurrenceEndAfter: boolean = true;
  customStartDate = new Date();
  customStartRange: any = new Date();
  customEndRange: any = new Date()
  startDateTime = new Date();
  weekselected = []
  daysOfMonth = 1;
  rangeOccurrence = 1
  daily
  weekly
  monthly
  endBy = false
  endAfter = true
  radio = true;
  daily_frequency = 1
  week_frequency = 1
  month_frequency = 1
  weekerror = false
  Sunday: boolean;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Thursday: boolean;
  disablefullGroupExecute: boolean = false;
  constructor(
    private translateService: TranslateService,
    private dateUtils: DateUtilsService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if (this.workflowInputData) {
      this.workflowInputData?.actions?.filter(element => {
        if (element.actionType === 'Download SW/FW Image' &&
          this.router.url.includes("/cco-foundation/foundation-operations/foundation-system-operation/workflows/workflow-wizard")) {
          this.disablefullGroupExecute = true;
        }
      });
    }
    let replaceProfile = this.workflowInputData ? this.workflowInputData?.actions?.filter(element => element.actionType === 'Replace Service Profile' || element.actionType === 'Edge Suites Bulk Activation') : '';
    let officialImage = this.workflowInputData ? this.workflowInputData?.actions?.filter(element => element.actionType === 'Download Official Image') : '';
    if (replaceProfile?.length) {
      this.scheduleValueSelected = 'Time Scheduler'
      this.timeschedule = true
      this.inputOperationType = [{ name: 'Time Scheduler', id: 'Time Scheduler' }]
    } else if (officialImage?.length) {
      this.scheduleValueSelected = 'Time Scheduler'
      this.disablefullGroupExecute = true;
      this.workflowInputData.source = "Foundation"
      this.timeschedule = true
      this.workflowInputData.fullGroupExecute = true;
      this.inputOperationType = [{ name: 'Time Scheduler', id: 'Time Scheduler' }]
    }
    else {
      this.scheduleValueSelected = 'On Discovery'
      this.timeschedule = false
      this.inputOperationType = [{ name: 'On Discovery', id: 'On Discovery' }];
    }
    if (this.workflowInputData) {
      if (this.workflowInputData.execPolicy === {} || typeof this.workflowInputData?.execPolicy?.initialTrigger === 'undefined' || this.workflowInputData?.execPolicy?.initialTrigger?.type === 'CPE Event') {
        /** fix CCL-24907 add if condition to check replace profiles  */
        console.log("officialImage=>", officialImage)
        if (!replaceProfile?.length && !officialImage?.length) {
          console.log("officialImage in if=>", officialImage)
          this.scheduleValueSelected = 'On Discovery'
          this.timeschedule = false
        }

      } else {
        console.log("officialImage in else=>", officialImage)
        this.scheduleValueSelected = 'Time Scheduler'
        this.timeschedule = true
        this.startDateTime = this.workflowInputData.execPolicy.window.startDateTime ? new Date(this.workflowInputData.execPolicy.window.startDateTime) : new Date();
        this.customStartDate = this.workflowInputData.execPolicy.window.startDateTime ? new Date(this.workflowInputData.execPolicy.window.startDateTime) : new Date();

        this.timeWindow = this.workflowInputData.execPolicy.window.windowLength ? this.workflowInputData.execPolicy.window.windowLength / 60 : 60;
        if (this.workflowInputData.execPolicy.window.recurrence !== undefined) {
          this.rangeOccurrence = this.workflowInputData.execPolicy.window.recurrence
          this.RangeRecurrenceEndAfter = true
          this.endAfter = true
          this.endBy = false
        }
        else {
          this.customStartDate = this.workflowInputData.execPolicy.window.startDateTime ? new Date(this.workflowInputData.execPolicy.window.startDateTime) : new Date();
          this.customEndRange = new Date(this.workflowInputData.execPolicy.window.endDateTime)
          this.RangeRecurrenceEndBy = true;
          this.RangeRecurrenceEndAfter = false
          this.endAfter = false
          this.endBy = true
        }
        switch (this.workflowInputData.execPolicy.window.type) {
          case 'weekly': {
            console.log('weekly')
            this.weekScheduling = true;
            this.monthScheduling = false;
            this.weekChecked = true
            this.dailyChecked = false
            this.monthChecked = false
            this.weekly = 'yes'
            this.daily = 'no'
            this.monthly = 'no'
            this.week_frequency = this.workflowInputData.execPolicy.window.frequency
            this.daily_frequency = 1
            this.month_frequency = 1
            if (this.workflowInputData.execPolicy.window.weekdays) {
              if (this.workflowInputData.execPolicy.window.weekdays.includes("SUN")) {
                this.Sunday = true
                this.weekselected.push('SUN')
              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("MON")) {
                this.Monday = true
                this.weekselected.push('MON')

              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("TUE")) {
                this.Tuesday = true
                this.weekselected.push('TUE')

              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("WEN")) {
                this.Wednesday = true
                this.weekselected.push('WEN')

              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("THU")) {
                this.Thursday = true
                this.weekselected.push('THU')

              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("FRI")) {
                this.Friday = true
                this.weekselected.push('FRI')

              }
              if (this.workflowInputData.execPolicy.window.weekdays.includes("SAT")) {
                this.Saturday = true
                this.weekselected.push('SAT')
              }
            }
            else {
              this.weekselected = []
            }
            break
          }
          case 'monthly': {
            console.log('weekly')
            this.monthScheduling = true;
            this.weekScheduling = false;
            this.monthChecked = true;
            this.dailyChecked = false;
            this.weekChecked = false
            this.monthly = 'yes'
            this.weekly = 'no'
            this.daily = 'no'
            this.month_frequency = this.workflowInputData.execPolicy.window.frequency
            this.daysOfMonth = this.workflowInputData.execPolicy.window.daysOfMonth[0]
            this.week_frequency = 1
            this.daily_frequency = 1


            break
          }
          default: {
            console.log('daily')
            this.weekScheduling = false;
            this.monthScheduling = false;
            this.dailyChecked = true;
            this.weekChecked = false
            this.monthChecked = false;
            this.daily = 'yes'
            this.monthly = 'no'
            this.weekly = 'no'
            this.week_frequency = 1
            this.month_frequency = 1
            this.daily_frequency = this.workflowInputData.execPolicy.window.frequency
            break
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
  optionValChoose() {
    if (this.scheduleValueSelected === 'Time Scheduler') {
      this.timeschedule = true
    } else {
      this.timeschedule = false
      this.scheduleValueSelected = "On Discovery"
    }
  }
  getRecurrenceData(event) {
    if (event.target.value === 'daily') {
      this.weekScheduling = false;
      this.monthScheduling = false;
      this.dailyChecked = true;
      this.weekChecked = false
      this.monthChecked = false;
      this.daily = 'yes'
      this.monthly = 'no'
      this.weekly = 'no'
      this.week_frequency = 1
      this.month_frequency = 1
      this.daysOfMonth = 1

    } else if (event.target.value === 'weekly') {
      this.weekScheduling = true;
      this.monthScheduling = false;
      this.weekChecked = true
      this.dailyChecked = false
      this.monthChecked = false
      this.weekly = 'yes'
      this.daily = 'no'
      this.monthly = 'no'
      this.month_frequency = 1
      this.daily_frequency = 1
      this.daysOfMonth = 1

    } else {
      this.monthScheduling = true;
      this.weekScheduling = false;
      this.monthChecked = true;
      this.dailyChecked = false;
      this.weekChecked = false
      this.monthly = 'yes'
      this.weekly = 'no'
      this.daily = 'no'
      this.week_frequency = 1
      this.daily_frequency = 1

    }
  }

  bindData(event) {
    if (event.target.checked) {
      this.weekselected.push(event.target.value)
    }
    else {
      this.weekselected = this.weekselected?.filter(e => e != event.target.value)
    }
  }

  go_next() {
    this.customStartDate.setHours(+this.startDateTime.getHours());
    this.customStartDate.setMinutes(+this.startDateTime.getMinutes());
    this.customStartDate.setMilliseconds(+this.startDateTime.getMilliseconds());
    if (this.scheduleValueSelected === 'On Discovery') {
      this.workflowInputData['execPolicy'] = {
        "initialTrigger": {
          "type": "CPE Event",
          "cpeEvent": "CC EVENT - New CPE Discovered"
        }
      }
    }
    else if (this.scheduleValueSelected === 'Time Scheduler') {
      if (this.weekScheduling === true) {
        if (this.weekselected?.length < 1) {
          this.weekerror = true
          return
        }
        else {
          this.weekerror = false
        }
        this.workflowInputData['execPolicy'] = {
          "initialTrigger": {
            "type": "Maintenance Window"
          },
          "window": {
            "type": "weekly",
            "startDateTime": this.customStartDate.toISOString(),
            "windowLength": this.timeWindow * 60,
            "frequency": this.week_frequency,
            "weekdays": this.weekselected,
          }
        }
      }
      else if (this.monthScheduling === true) {
        this.workflowInputData['execPolicy'] = {
          "initialTrigger": {
            "type": "Maintenance Window"
          },
          "window": {
            "type": "monthly",
            "startDateTime": this.customStartDate.toISOString(),
            "windowLength": this.timeWindow * 60,
            "frequency": this.month_frequency,
            "daysOfMonth": [
              this.daysOfMonth
            ],
          }
        }
      }
      else {
        this.workflowInputData['execPolicy'] = {
          "initialTrigger": {
            "type": "Maintenance Window"
          },
          "window": {
            "type": 'daily',
            "startDateTime": this.customStartDate.toISOString(),
            "windowLength": this.timeWindow * 60,
            "frequency": this.daily_frequency,
          }
        }
      }
      if (this.RangeRecurrenceEndBy) {
        if (this.endtimeError) {
          return
        }
        this.workflowInputData['execPolicy']['window']['endDateTime'] = this.customEndRange ? new Date(this.customEndRange).toISOString() : ''
      } else {
        this.workflowInputData['execPolicy']['window']['recurrence'] = this.rangeOccurrence ? this.rangeOccurrence : 0
      }
    }
    this.workflowInputData["startTime"] = new Date(this.startDateTime).toISOString()
    if (this.workflowInputData.levelPassed <= 4) {
      this.workflowInputData.levelPassed = 4;
    }
    this.workflowOprData.emit(this.workflowInputData)
    this.activeTab.emit('Review')
    return true;
  }

  go_previous() {
    this.activeTab.emit('Select Operation Parameters')
  }

  getRangeRecurrence(event) {
    if (event.target.value === 'endBy') {
      this.RangeRecurrenceEndBy = true;
      this.RangeRecurrenceEndAfter = false;
      this.endBy = true
      this.endAfter = false
    } else {
      this.RangeRecurrenceEndAfter = true;
      this.RangeRecurrenceEndBy = false;
      this.endAfter = true
      this.endBy = false
    }
  }

  WindowerrorMsg: string = null;
  validateWindow(event: number) {
    console.log("event=>", event);
    if (!event) {
      this.WindowerrorMsg = "";
    } else {
      if (event == 0) {
        this.WindowerrorMsg = this.language['Input_Number_Validation'] + ' 0';
      } else if (event > 1440) {
        this.WindowerrorMsg = this.language['Input_Number_Validation2'] + " 1440"
      } else {
        this.WindowerrorMsg = "";
      }
    }
  }
  onSelectStartTime(event) {
    console.log("event=>", event.target.value);
    let selectedDate = event.target.value;
    if (!Date.parse(selectedDate.toString())) {
      this.customStartDate = new Date;
    }
  }
  onSelectStartOnlyTime(event) {
    console.log("event=>", event);
    let re = /^\d{1,2}:\d{2}( [ap || AP]M)?$/;
    let selectedDate = event.target.value;
    if (!selectedDate.match(re)) {
      console.log("selected Date=>", !selectedDate.match(re));
      this.startDateTime = new Date();
    }
  }
  onSelectEndTime(event) {
    console.log("event endtime=>", event);
    console.log("event starttime=>", this.customStartDate);
    let endDate = event;
    let startDate = this.customStartDate;
    if (!Date.parse(endDate.toString())) {
      this.customEndRange = new Date();
    } else if (endDate.getTime() > startDate.getTime()) {
      this.endtimeError = false;
    } else {
      this.endtimeError = true;
    }
  }
  onChangeEndTime(event) {
    console.log("event=>", event.target.value);
    let endDate = event.target.value;
    let startDate = this.customStartDate;
    if (!Date.parse(endDate)) {
      this.customEndRange = new Date();
    } else if (new Date(endDate).getTime() > startDate.getTime()) {
      this.endtimeError = false;
    } else {
      this.endtimeError = true;
    }
  }
}
