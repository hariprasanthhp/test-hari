import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "src/app-services/translate.service";
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";
import { CommonService } from "src/app/sys-admin/services/common.service";
import { NetopsServiceService } from "../../../netops-management.service";
import { FileService } from "../../services/files.service";
import { SelectAlarmDeviceGroupComponent } from "./select-alarm-device-group/select-alarm-device-group.component";
import { StartAlarmWizardComponent } from "./start-alarm-wizard/start-alarm-wizard.component";
import { WorkflowAlarmWizardReviewComponent } from "./workflow-alarm-wizard-review/workflow-alarm-wizard-review.component";
import { WrkflowAlarmWizardOprParametersComponent } from "./wrkflow-alarm-wizard-opr-parameters/wrkflow-alarm-wizard-opr-parameters.component";
import { WrkflowAlarmWizardScheduleParametersComponent } from "./wrkflow-alarm-wizard-schedule-parameters/wrkflow-alarm-wizard-schedule-parameters.component";

@Component({
  selector: 'app-alarm-workflow-wizard',
  templateUrl: './alarm-workflow-wizard.component.html',
  styleUrls: ['./alarm-workflow-wizard.component.scss']
})
export class WorkflowAlarmWizardComponent implements OnInit {

  @Input() activeTab: string = 'Start';
  @ViewChild(StartAlarmWizardComponent, { static: false }) startElement: StartAlarmWizardComponent;
  @ViewChild(SelectAlarmDeviceGroupComponent, { static: false }) deviceElement: SelectAlarmDeviceGroupComponent;
  @ViewChild(WrkflowAlarmWizardOprParametersComponent, { static: false }) oprElement: WrkflowAlarmWizardOprParametersComponent;
  @ViewChild(WrkflowAlarmWizardScheduleParametersComponent, { static: false }) scheduleElement: WrkflowAlarmWizardScheduleParametersComponent;
  @ViewChild(WorkflowAlarmWizardReviewComponent, { static: false }) reviewElement: WorkflowAlarmWizardReviewComponent;


  language: any;
  languageSubject;
  editItem_id
  getWorkflowByIdSubscribe
  editWorkFlow = false
  editAllWorkflowData
  addAllWorkflowData
  workflowInputData = {
    orgId: 0,
    name: "",
    selectedDeviceGroup: undefined,
    groups: [],
    actions: [],
    execPolicy: {},
    policy: {},
    description: "",
    fullGroupExecute: false,
    bPriorNewAndFailed: true,
    levelPassed: 0,
    source: "",
    selectedAlarm: undefined,
    selectedCategories: undefined,
    categories: [],
    region: '',
    location: '',
    system: '',
    additionalParams: [],
    alarmName: [],
    duration: 60,
    count: 1,
    email: '',
    regionName: "All",
    locationName: 'All',
    systemName: 'All',
    startDate: null,
    endDate: null,
  }
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  addProfileTab: Array<string> = ['Start', 'Select Device Groups', 'Select Operation Parameters', 'Select Schedule Parameters', 'Review'];

  validlevels = {
    1: 'start',
    2: 'device',
    3: 'opr',
    4: 'schedule',
    5: 'review'
  };

  valid = {
    'Start': 1,
    'Select Device Groups': 2,
    'Select Operation Parameters': 3,
    'Select Schedule Parameters': 4,
    'Review': 5
  };

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private api: NetopsServiceService,
    public router: Router, private fileService: FileService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,

  ) {

    // this.workflowInputData.orgId = this.sso.getOrgId();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.route.queryParams
      .subscribe(params => {
        this.editItem_id = params.item;
        if (this.editItem_id) this.getWorkflowById()
      }
      );

  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.editItem_id) this.getWorkflowByIdSubscribe.unsubscribe()
  }

  getWorkflowById() {
    this.getWorkflowByIdSubscribe = this.api.getWorkflowById(this.editItem_id).subscribe((res: any) => {
      if (res) {
        this.workflowInputData = res;
        this.workflowInputData.levelPassed = 5;
        this.editWorkFlow = true;
        if (this.workflowInputData.groups.length == 0) {
          this.workflowInputData['selectedDeviceGroup'] = 'No'
        } else {
          this.workflowInputData['selectedDeviceGroup'] = 'Yes'
        }
        for (let i = 0; i < this.workflowInputData.actions.length; i++) {
          if (!this.workflowInputData.actions[i].profileName) {
            switch (this.workflowInputData.actions[i].actionType) {
              case "Download SW/FW Image": {
                this.fileService.getSwFileById(this.workflowInputData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowInputData.actions[i]['profileName'] = res.name
                })
                break;
              }
              case "Configuration File Download": {
                this.fileService.deleteConfigFileById(this.workflowInputData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowInputData.actions[i]['profileName'] = res.name
                })
                break;
              }
            }
          }
        }
        this.setStepperColors();
      }
    }, (err: HttpErrorResponse) => {

    }, () => {
      //this.loading = false;
    });
  }

  getCurrentTab(event) {
    this.activeTab = event;
    this.setStepperColors();
  }
  validateStart() {
    if (!this.workflowInputData.name) {
      this.startElement.go_next()
    }
    else {
      this.activeTab = 'Select Device Groups'
    }
  }
  getStartData(event) {
    this.workflowInputData = event
    this.activeTab = 'Select Device Groups'
  }

  getDeviceData(event) {
    this.workflowInputData['groups'] = event.groups
    this.activeTab = 'Select Operation Parameters'
  }

  getOptData(event) {
    this.workflowInputData['actions'] = event.actions
    this.activeTab = 'Select Schedule Parameters'

  }
  getScheduleData(event) {
    this.workflowInputData['execPolicy'] = event.execPolicy
    this.activeTab = 'Review'

  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }


  submitWorkflow(event) {
    let actions = this.workflowInputData.actions;
    this.workflowInputData.actions.forEach(e => {
      if (e.actionType === 'Edge Suites Bulk Activation') {
        let obj = e;
        obj["actionType"] = "Edge Suites Provision";
      }
    });
    setTimeout(() => {
      if (this.editWorkFlow) {
        let finalData = {}
        finalData['_id'] = this.editItem_id
        // finalData['orgId'] = this.workflowInputData.orgId
        finalData['name'] = this.workflowInputData.name
        finalData['description'] = this.workflowInputData.description
        finalData['groups'] = this.workflowInputData.groups
        finalData['actions'] = this.workflowInputData.actions
        finalData['execPolicy'] = this.workflowInputData.execPolicy
        finalData['bPriorNewAndFailed'] = true
        finalData['fullGroupExecute'] = this.workflowInputData.fullGroupExecute;
        if (this.router.url.includes("/cco-foundation")) {
          if (this.workflowInputData.source) {
            finalData['source'] = this.workflowInputData.source;
          }
        }
        if (this.router.url.endsWith("official-workflow-wizard")) {
          finalData['source'] = this.workflowInputData.source;
        }
        this.editAllWorkflowData = this.api.editWorkflowData(finalData).subscribe(res => {
          //this.router.navigate(['/support/netops-management/operations/workflows'])
          this.sso.redirectByUrl([
            `/support/netops-management/operations/workflows`,
            `/cco/operations/cco-system-operations/workflows`,
            `./cco-foundation/foundation-configuration/configuration-workflow/workflows`,
            `/cco/operations/cco-subscriber-operations/operations/workflows`,
          ]);
          this.editWorkFlow = false
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.commonOrgService.pageScrollTop();
        }, () => {
          //this.loading = false;
        })
      }
      else {
        let finalData = {}
        // finalData['orgId'] = this.workflowInputData.orgId
        finalData['name'] = this.workflowInputData.name
        finalData['description'] = this.workflowInputData.description
        finalData['groups'] = this.workflowInputData.groups
        finalData['actions'] = this.workflowInputData.actions
        finalData['execPolicy'] = this.workflowInputData.execPolicy
        finalData['bPriorNewAndFailed'] = true
        finalData['fullGroupExecute'] = this.workflowInputData.fullGroupExecute;
        if (this.router.url.includes("/cco-foundation")) {
          if (this.workflowInputData.source) {
            finalData['source'] = this.workflowInputData.source;
          }
        }
        if (this.router.url.endsWith("official-workflow-wizard")) {
          finalData['source'] = this.workflowInputData.source;
          finalData['type'] = "Onboarding Scheduler"
        }
        this.addAllWorkflowData = this.api.AddWorkflowData(finalData).subscribe(res => {
          //this.router.navigate(['/support/netops-management/operations/workflows'])
          this.sso.redirectByUrl([
            `/support/netops-management/operations/workflows`,
            `/cco/operations/cco-system-operations/workflows`,
            `./cco-foundation/foundation-configuration/configuration-workflow/workflows`,
            `/cco/operations/cco-subscriber-operations/operations/workflows`,
          ]);
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.commonOrgService.pageScrollTop();
        }, () => {
          //this.loading = false;
        })
      }
    }, 0);
  }

  setActiveTab(value) {
    let tab = this.valid[value];

    if (this.activeTab == 'Start') {
      this.startElement.go_next();

    } else if (this.activeTab == 'Select Device Groups') {
      if (!this.deviceElement.go_next()) {
        return;
      }

    } else if (this.activeTab == 'Select Operation Parameters') {
      if (!this.oprElement.go_next()) {
        return;
      }
    } else if (this.activeTab == 'Select Schedule Parameters') {
      if (!this.scheduleElement.go_next()) {
        return;
      }
    }


    if (this.workflowInputData.levelPassed >= tab - 1) {
      this.activeTab = value;
    } else {
      this.activeTab = this.validlevels[this.workflowInputData.levelPassed + 1]
    }

    // setTimeout(() => {

    // }, 500);

    this.setStepperColors();


  }



  setStepperColors() {

    let activeInt = this.valid[this.activeTab];
    for (let i = 1; i <= this.workflowInputData.levelPassed; i++) {
      $(`#wk-${this.validlevels[i]}`).removeClass('step');
      $(`#wk-${this.validlevels[i]}`).removeClass('step-done');
      $(`#wk-${this.validlevels[i]}`).removeClass('step-current');
      // if (i == 1) {
      //   continue;
      // }

      if (activeInt === i) {
        $(`#wk-${this.validlevels[i]}`).addClass('step-current');
      } else {
        $(`#wk-${this.validlevels[i]}`).addClass('step-done');
      }

    }

    /*  if (activeInt == 5) {
       $(`#wk-review`).removeClass('step');
       $(`#wk-review`).addClass('step-current');
     } else {
       $(`#wk-review`).removeClass('step');
       $(`#wk-review`).removeClass('step-current');
     } */

  }
  closeWorkflow() {
    this.sso.redirectByUrl(['/support/netops-management/operations/workflows', '',
      `/cco-foundation/foundation-configuration/configuration-workflow/workflows`,
      '/cco/operations/cco-subscriber-operations/operations/workflows'
    ]);
  }
}
