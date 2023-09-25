import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';


@Component({
  selector: 'app-workflow-wizard-review',
  templateUrl: './workflow-wizard-review.component.html',
  styleUrls: ['./workflow-wizard-review.component.scss']
})
export class WorkflowWizardReviewComponent implements OnInit {

  @Input() workflowInputData
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  @Output() submitWorkflow: EventEmitter<any> = new EventEmitter();
  @Input() invalidDta
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
  enableMyCommunity: boolean;
  communityArr=[];
  micrositeLoader: boolean;
  constructor(
    private translateService: TranslateService,
    private api: NetopsServiceService,
    private router: Router,
    private sso: SsoAuthService,
    private communityService:MycommunityIqService
  ) {
    this.orgId = this.sso.getOrgId();
  }

  ngOnInit(): void {
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }
    if(this.workflowInputData) {
      console.log(this.workflowInputData?.actions)
      this.workflowInputData.actions.forEach(e => {
        if (e.actionType === 'Edge Suites Provision') {
          let obj = e;
          obj["actionType"] = "Edge Suites Bulk Activation";
        }
        if(e.actionType === 'myCommunityIQ Bulk Activation' && this.enableMyCommunity){
          this.GetMicrosites()
        }
      });
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.getDeviceGrp()
    //
    // this.reviewData.push(this.workflowInputData)
    if(this.workflowInputData) {
    if (this.workflowInputData.execPolicy.initialTrigger.type === 'Maintenance Window') {
      let window = this.workflowInputData.execPolicy.window
      if(this.workflowInputData.startTime) {
        this.startDateTime = new Date(this.workflowInputData.startTime)
      } else {
        this.startDateTime = new Date(this.workflowInputData.execPolicy.window.startDateTime)
      }
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
  }
    this.priortize = this.workflowInputData ? this.workflowInputData.priortize : '';
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
  GetMicrosites() {
    this.micrositeLoader = true;
    this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      this.communityArr.sort((a, b) => {
        return a.communityName.localeCompare(b.communityName);;
      });
      this.micrositeLoader = false;
    }, err => {
      this.micrositeLoader = false;
    })
  }
  getDeviceGrp() {
    let skip = 0
    let limit = 0
    this.micrositeLoader=true
    this.getDeviceGrpData = this.api.GetDeviceGroup(this.orgId, skip, limit).subscribe((res: any) => {

      this.deviceData = res
      this.deviceArray = this.deviceData.filter((e) => this.workflowInputData.groups.includes(e._id))
      this.dataAvailable = true
      this.micrositeLoader=false
    }, err => {
      this.micrositeLoader = false;
    })


  }

  go_previous() {
    // if (this.workflowInputData.levelPassed <= 5) {
    //   this.workflowInputData.levelPassed = 5;
    // }
    this.activeTab.emit('Select Schedule Parameters')
  }
  submit() {
    if(this.invalidDta && this.invalidDta?.length !== 0){
      this.workflowInputData.actions.push(this.invalidDta[0])
    }
    this.submitWorkflow.emit(this.workflowInputData)
  }
  showMicroSiteName(id) {
    for(let i=0;i<this.communityArr.length;i++){
      if (this.communityArr[i].id == id) {
            return this.communityArr[i].communityName
          }
    }
  }
}
