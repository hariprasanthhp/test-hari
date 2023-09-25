import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';


@Component({
  selector: 'app-alarm-workflow-wizard-review',
  templateUrl: './workflow-alarm-wizard-review.component.html',
  styleUrls: ['./workflow-alarm-wizard-review.component.scss']
})
export class WorkflowAlarmWizardReviewComponent implements OnInit {

  @Input() workflowInputData
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  @Output() submitWorkflow: EventEmitter<any> = new EventEmitter();

  language: any;
  languageSubject;
  orgId: number

  addAllWorkflowData
  tableRevOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    paging: false,
    ordering: false,
    dom: 't'
  };
  reviewData = []
  execPolicy = {}
  startDateTime
  windowlength
  custumStartDate = new Date()
  customEndRange = new Date()
  endAfter = false
  rangeOccurrence
  recurrence
  getDeviceGrpData
  deviceData
  deviceArray
  priortize
  dataAvailable = false
  weekdays = []
  constructor(
    private translateService: TranslateService,
    private api: NetopsServiceService,
    private router: Router,
    private sso: SsoAuthService,

  ) {
    this.orgId = this.sso.getOrgId();
  }
  listofEmail = [];
  ngOnInit(): void {
    if (this.workflowInputData) { 
      this.workflowInputData.actions.forEach(e => {
        if (e.actionType === 'Edge Suites Provision') {
          let obj = e;
          obj["actionType"] = "Edge Suites Bulk Activation";
        }
      });
    }
    this.language = this.translateService.defualtLanguage;
this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
  this.language = data;
});
if (this.workflowInputData) {
  if (this.workflowInputData.email) {
    this.listofEmail = this.workflowInputData.email.split(',');
  }
}
if (this.workflowInputData) {
if (this.workflowInputData.selectedAlarm == 'Yes') {
  this.dataAvailable = true
  if (this.workflowInputData.categories.length != 0) {
    let tempCategory = [];
    this.workflowInputData.categories.forEach(element => {
      tempCategory.push({ name: element })
    });
    this.deviceArray = tempCategory;
  }
} else {
  this.getDeviceGrp()
}
}

// this.reviewData.push(this.workflowInputData)
if (this.workflowInputData) {
if (this.workflowInputData.execPolicy.initialTrigger.type === 'Maintenance Window') {
  let window = this.workflowInputData.execPolicy.window
  this.startDateTime = new Date(this.workflowInputData.startTime)
  this.windowlength = window.windowLength / 60
  this.custumStartDate = new Date(window.startDateTime)
  this.recurrence = window.frequency
  if (this.workflowInputData.execPolicy.window.weekdays) {
    this.weekdays = []
    if (this.workflowInputData.execPolicy.window.weekdays.includes("SUN")) {
      this.weekdays.push("Sunday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("MON")) {
      this.weekdays.push("Monday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("TUE")) {
      this.weekdays.push("Tuesday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("WEN")) {
      this.weekdays.push("Wednesday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("THU")) {
      this.weekdays.push("Thursday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("FRI")) {
      this.weekdays.push("Friday")
    }
    if (this.workflowInputData.execPolicy.window.weekdays.includes("SAT")) {
      this.weekdays.push("Saturday")
    }
  }
  if (window.endDateTime) {
    this.customEndRange = new Date(window.endDateTime)
    this.endAfter = false
  }
  else {
    this.rangeOccurrence = window.recurrence
    this.endAfter = true
  }
} else {
  this.execPolicy = this.workflowInputData.execPolicy
}
this.priortize = this.workflowInputData.priortize
  }
    // this.recurrence = window.frequency
    // this.custumStartDate = this.workflowInputData.policy.startDate
    // this.customEndRange = this.workflowInputData.window.endDateTime ? new Date(this.workflowInputData.window.endDateTime) : undefined
    // this.endAfter = (this.workflowInputData.policy.endAfter === false) ? false : true
    // this.rangeOccurrence = this.workflowInputData.policy.rangeOccurrence
    // this.priortize = this.workflowInputData.policy.priortize
  }

ngOnDestroy() {
  this.languageSubject.unsubscribe();
}

getDeviceGrp() {
  let skip = 0
  let limit = 0
  this.getDeviceGrpData = this.api.GetDeviceGroup(this.orgId, skip, limit).subscribe((res: any) => {

    this.deviceData = res
    this.deviceArray = this.deviceData.filter((e) => this.workflowInputData.groups.includes(e._id))
    this.dataAvailable = true
  })


}

go_previous() {
  // if (this.workflowInputData.levelPassed <= 5) {
  //   this.workflowInputData.levelPassed = 5;
  // }
  this.activeTab.emit('Select Schedule Parameters')
}

submit() {
  this.submitWorkflow.emit(this.workflowInputData)
}
}
