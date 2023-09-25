import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "src/app-services/translate.service";
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";
import { MycommunityIqService } from "src/app/sys-admin/services/mycommunity-iq.service";
import { NetopsServiceService } from "../netops-management.service";
import { FileService } from "../operations/services/files.service";

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.scss']
})
export class WorkflowDetailsComponent implements OnInit {

  language: any;
  languageSubject;
  workflowId
  getWorkflowData
  workflowData
  loading = true
  dataAvailable = false;
  micrositeLoading = false;
  getDeviceGrpData
  orgId
  deviceData
  deviceArray
  startDateTime: Date
  windowlength
  frequency
  noOfDays
  customEndRange
  tableRevOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    paging: false,
    ordering: false,
    dom: 't'
  };
  frTable: any;
  esTable: any;
  germanTable: any;
  weekdays = []
  prioritizeCheckBox: boolean = false;
  enableMyCommunity: boolean;
  constructor(
    private api: NetopsServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private translateService: TranslateService,
    private sso: SsoAuthService, private fileService: FileService,
    private titleService: Title,
    private communityService: MycommunityIqService
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE
  }

  ngOnInit() {
    this.orgId = this.sso.getOrgId();
    this.route.queryParams.subscribe(params => { this.workflowId = params.item });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/')) {
      this.titleService.setTitle('Workflows - Operations  - Netops - Service - Calix Cloud');
    } else if (this.router.url.includes('cco/operations/')) {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle('Workflow - Configuration - Deployment - Calix Cloud');
    }
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222 || entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }
    this.getWorkflowById();
    // if (this.enableMyCommunity) {
    //   this.GetMicrosites();
    // }
    this.tableLanguageOptions();

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.tableLanguageOptions();
      //this.rerender();
    });

  }

  getWorkflowById() {
    this.getWorkflowData = this.api.getWorkflowById(this.workflowId).subscribe((res) => {
      if (res) {
        this.workflowData = res
        this.workflowData.actions = this.workflowData.actions.map(element => {
          if (element.actionType == 'myCommunityIQ Bulk Activation' && this.enableMyCommunity) {
            this.GetMicrosites();
          }
          if (element.actionType == 'SmartBiz Bulk Activation') {
            if (element.actionConfig.enable == true) {
              element['profileName'] = 'SmartBiz: Subscribed'
            }
            else {
              element['profileName'] = 'SmartBiz: Unsubscribed'
            }
            //element['conditionLogic'] = element.conditionLogic
          }
          return element;

        })
        let data = this.workflowData?.actions
        data = data.filter(el => !el?.isInvalid)
        if (data?.length) {
          this.workflowData.actions = data.map(element => {
            if (element.actionType == 'ProtectIQ Bulk Activation') {
              element['profileName'] = 'ProtectIQ';
            } else if (element.actionType == 'ExperienceIQ Bulk Activation') {
              element['profileName'] = 'ExperienceIQ';
            }
            return element;
          });
        }
        for (let i = 0; i < this.workflowData.actions.length; i++) {
          if (!this.workflowData.actions[i].profileName) {
            if (this.workflowData.actions[i].actionType === 'Edge Suites Provision') {
              this.workflowData.actions[i].actionType = "Edge Suites Bulk Activation";
            }
            switch (this.workflowData.actions[i].actionType) {
              case "Download SW/FW Image": {
                this.fileService.getSwFileById(this.workflowData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowData.actions[i]['profileName'] = res.name
                })
                break;
              }
              case "Configuration File Download": {
                this.fileService.deleteConfigFileById(this.workflowData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowData.actions[i]['profileName'] = res.name
                })
                break;
              }
            }
          }
        }
        if (this.workflowData.execPolicy.initialTrigger.type !== "CPE Event") {
          this.startDateTime = new Date(this.workflowData.execPolicy.window.startDateTime)
          this.windowlength = this.workflowData.execPolicy.window.windowLength / 60
          this.frequency = this.workflowData.execPolicy.window.frequency
          this.noOfDays = this.workflowData.execPolicy.window.daysOfMonth ? this.workflowData.execPolicy.window.daysOfMonth : 1
          this.customEndRange = this.workflowData.execPolicy.window.endDateTime ? new Date(this.workflowData.execPolicy.window.endDateTime) : undefined
          this.prioritizeCheckBox = this.workflowData.priortize === true ? true : false
          if (this.workflowData.execPolicy.window.weekdays) {
            this.weekdays = []
            if (this.workflowData.execPolicy.window.weekdays.includes("SUN")) {
              this.weekdays.push("Sunday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("MON")) {
              this.weekdays.push("Monday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("TUE")) {
              this.weekdays.push("Tuesday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("WEN")) {
              this.weekdays.push("Wednesday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("THU")) {
              this.weekdays.push("Thursday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("FRI")) {
              this.weekdays.push("Friday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("SAT")) {
              this.weekdays.push("Saturday")
            }
          }
        }
        this.loading = false
        this.getDeviceGrp()
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.loading = false;
      // this.pageErrorHandle(err);
      // this.commonOrgService.pageScrollTop();
    }, () => {
      // this.loading = false;
    })
  }

  close() {
    this.sso.redirectByUrlForWorkflow(['/support/netops-management/operations/workflows',
      '',
      `./cco-foundation/foundation-configuration/configuration-workflow/workflows`,
      `/cco/operations/configuration/workflows`
    ]);
  }

  getDeviceGrp() {
    let skip = 0
    let limit = 0
    this.getDeviceGrpData = this.api.GetDeviceGroup(this.orgId, skip, limit).subscribe((res: any) => {
      if (res) {
        this.deviceData = res
        this.dataAvailable = true
        this.deviceArray = this.deviceData.filter((e) => this.workflowData.groups && this.workflowData.groups.includes(e._id))
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.loading = false;
      // this.pageErrorHandle(err);
      // this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    }
    )
  }
  communityArr: any = [];
  GetMicrosites() {
    this.micrositeLoading = true;
    this.communityService.GetMicrosite().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      this.micrositeLoading = false;
    }, err => {
      this.micrositeLoading = false;
    })
  }
  showMicroSiteName(id) {
    for (let i = 0; i < this.communityArr.length; i++) {
      if (this.communityArr[i].id == id) {
        return this.communityArr[i].communityName
      }
    }
  }
  /* rerender(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.clear().draw();
       dtInstance.destroy();
       this.dtTrigger.next();
     });
   }*/


  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.tableRevOptions.language = this.frTable;
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
      this.tableRevOptions.language = this.esTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      this.tableRevOptions.language = this.germanTable;
    }

    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
      delete this.tableRevOptions.language;
    }
  }
}
