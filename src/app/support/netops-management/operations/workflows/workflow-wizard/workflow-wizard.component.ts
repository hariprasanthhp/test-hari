import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetopsServiceService } from '../../../netops-management.service';
import { WorkflowWizardReviewComponent } from './workflow-wizard-review/workflow-wizard-review.component';
import { WrkflowWizardScheduleParametersComponent } from './wrkflow-wizard-schedule-parameters/wrkflow-wizard-schedule-parameters.component';
import { SelectDeviceGroupComponent } from './select-device-group/select-device-group.component';
import { StartWizardComponent } from './start-wizard/start-wizard.component';
import { WrkflowWizardOprParametersComponent } from './wrkflow-wizard-opr-parameters/wrkflow-wizard-opr-parameters.component';
import { FileService } from '../../services/files.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { element } from 'protractor';


@Component({
  selector: 'app-workflow-wizard',
  templateUrl: './workflow-wizard.component.html',
  styleUrls: ['./workflow-wizard.component.scss']
})
export class WorkflowWizardComponent implements OnInit {

  @Input() activeTab: string = 'Start';
  @ViewChild(StartWizardComponent, { static: false }) startElement: StartWizardComponent;
  @ViewChild(SelectDeviceGroupComponent, { static: false }) deviceElement: SelectDeviceGroupComponent;
  @ViewChild(WrkflowWizardOprParametersComponent, { static: false }) oprElement: WrkflowWizardOprParametersComponent;
  @ViewChild(WrkflowWizardScheduleParametersComponent, { static: false }) scheduleElement: WrkflowWizardScheduleParametersComponent;
  @ViewChild(WorkflowWizardReviewComponent, { static: false }) reviewElement: WorkflowWizardReviewComponent;


  language: any;
  languageSubject;
  editItem_id
  getWorkflowByIdSubscribe
  editWorkFlow = false
  editAllWorkflowData
  addAllWorkflowData
  micrositeLoader: boolean = false;
  workflowInputData = {
    orgId: 0,
    name: "",
    selectedDeviceGroup: "Yes",
    groups: [],
    actions: [],
    execPolicy: {},
    policy: {},
    description: "",
    fullGroupExecute: false,
    bPriorNewAndFailed: true,
    levelPassed: 0,
    source: ""
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

  hasScopeAccess = false;
  invalidDta: any[];

  isNewwrkflw: boolean = false;

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private api: NetopsServiceService,
    public router: Router, private fileService: FileService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private titleService: Title,
    private communityService: MycommunityIqService

  ) {
    // this.workflowInputData.orgId = this.sso.getOrgId();
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Operations']}  - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      // this.getWorkflowById();
      this.setTitle(this.router.url);
    });
    this.setTitle(this.router.url);
    let scopes = this.sso.getScopes();
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration/workflows')) {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.sso.getScopes();
        scopes['cloud.rbac.csc.netops.operations.workflow'] = scopes['cloud.rbac.csc.netops.operations.workflow'] ? scopes['cloud.rbac.csc.netops.operations.workflow'] : [];
        if (scopes['cloud.rbac.csc.netops.operations.workflow'].length) {
          this.hasScopeAccess = true;
        }
      } else {
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/operations/configuration/workflows')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes?.['cloud.rbac.coc.operations.configuration.workflows']?.length) {
          this.hasScopeAccess = true;
        }

      } else {
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
      } else {
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

    this.route.queryParams
      .subscribe(params => {
        this.editItem_id = params.item;
        this.isNewwrkflw = params.isNewwrkflw;
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
        this.workflowInputData.actions = this.workflowInputData.actions.map(element => {
          if (element.actionType == 'SmartBiz Bulk Activation') {
            if (element.actionConfig.enable == true) {
              element['profileName'] = 'SmartBiz: Subscribed';
            }
            else {
              element['profileName'] = 'SmartBiz: Unsubscribed';
            }
            //element['conditionLogic'] = element.conditionLogic
          }
          return element;

        })
        let data = this.workflowInputData?.actions
        data = data.filter(el => !el?.isInvalid)
        this.invalidDta = this.workflowInputData?.actions.filter(el => el?.isInvalid)
        if (data?.length) {
          this.workflowInputData.actions = data.map(element => {
            if (element.actionType == 'ProtectIQ Bulk Activation') {
              element['name'] = 'ProtectIQ';
            } else if (element.actionType == 'ExperienceIQ Bulk Activation') {
              element['name'] = 'ExperienceIQ';
            }
            return element;
          });
        }
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
      if (e.actionType === 'SmartBiz Bulk Activation') {
        let obj = e;
        // let profileNameUnsubscribed = 'SmartBiz: ' + this.language['Unsubscribed'];
        // let profileNameSubscribed = 'SmartBiz: ' + this.language['Subscribed'];

        if (obj.profileName === 'SmartBiz: Unsubscribed') {
          //delete obj.profileName;
          obj["actionType"] = "SmartBiz Bulk Activation";
          obj["actionConfig"] = {
            "enable": false
          };
        }
        else if (obj.profileName === 'SmartBiz: Subscribed') {
          //delete obj.profileName;
          obj["actionType"] = "SmartBiz Bulk Activation";
          obj["actionConfig"] = {
            "enable": true
          };
        }
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
        finalData['actions'] = Object.assign([], this.workflowInputData.actions).map(element => {
          element = Object.assign({}, element)
          if (element.actionType == "SmartBiz Bulk Activation") {
            delete element.profileName;
            delete element.conditionLogic;
          }
          return element;
        })
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
        finalData['actions'] = Object.assign([], this.workflowInputData.actions).map((element) => {
          element = Object.assign({}, element);
          if (element.hasOwnProperty('bulkActivationConfig')) {
            delete element.name;
            delete element.description;
          };
          return element;
        })

        this.editAllWorkflowData = this.api.editWorkflowData(finalData).subscribe(res => {
          //this.router.navigate(['/support/netops-management/operations/workflows'])
          if (window.location.href?.indexOf('/cco/operations/configuration/workflows/workflow-wizard') !== -1) {
            this.router.navigate(['./cco/operations/configuration/workflows']);
          } else {
            this.sso.redirectByUrl([
              `/support/netops-management/operations/workflows`,
              `/cco/operations/cco-system-operations/workflows`,
              `./cco-foundation/foundation-configuration/configuration-workflow/workflows`,
              `/cco/operations/cco-subscriber-operations/operations/workflows`,
            ]);
          }

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
        finalData['actions'] = Object.assign([], this.workflowInputData.actions).map((element) => {
          element = Object.assign({}, element);
          if (element.hasOwnProperty('bulkActivationConfig')) {
            delete element.name;
            delete element.description;
          }
          else if (element.actionType == "SmartBiz Bulk Activation") {
            delete element.profileName;
            delete element.conditionLogic;
          }
          return element;

        })
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
          if (window.location.href?.indexOf('/cco/operations/configuration/workflows/workflow-wizard') !== -1) {
            this.router.navigate(['./cco/operations/configuration/workflows']);
            return;
          }
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
      this.startElement?.go_next();

    } else if (this.activeTab == 'Select Device Groups') {
      if (!this.deviceElement?.go_next()) {
        return;
      }

    } else if (this.activeTab == 'Select Operation Parameters') {
      if (!this.oprElement?.go_next()) {
        return;
      }
    } else if (this.activeTab == 'Select Schedule Parameters') {
      if (!this.scheduleElement?.go_next()) {
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
    if (window.location.href?.indexOf('/cco/operations/configuration/workflows/workflow-wizard') !== -1) {
      this.router.navigate(['./cco/operations/configuration/workflows']);
      return;
    }
    this.sso.redirectByUrl(['/support/netops-management/operations/workflows', '',
      `/cco-foundation/foundation-configuration/configuration-workflow/workflows`,
      '/cco/operations/cco-subscriber-operations/operations/workflows'
    ]);
  }
}
