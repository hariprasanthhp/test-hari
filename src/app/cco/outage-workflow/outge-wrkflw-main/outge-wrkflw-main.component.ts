import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { stat } from 'fs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { OutageWorkflow } from '../outage-workflow.constants';
import { OutageWorkflowService } from '../outage-workflow.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonWorkflowService } from '../../workflow-shared/common-workflow.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SmsConsentComponent } from '../../workflow-shared/sms-consent/sms-consent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-outge-wrkflw-main',
  templateUrl: './outge-wrkflw-main.component.html',
  styleUrls: ['./outge-wrkflw-main.component.scss']
})
export class OutgeWrkflwMainComponent implements OnInit {
  recepientFormFields: any = [
    {
      key: 'emails',
      required: true
    },
    {
      key: 'notes',
      required: false
    },
    {
      key: 'sms',
      required: true
    },
    {
      key: 'webhooks',
      required: true
    }
  ];


  recepientFormFieldsObj: any = {
    emailRecipients: 'emails',
    emailNotes: 'notes',
    sms: 'sms',
    webhooks: 'webhooks'
  };
  loader = false;
  disableFinishBtn = false;
  outageWorkflow = OutageWorkflow;
  activeTab: string = OutageWorkflow?.DETAILS_LABEL;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  disableNextBtn: boolean = false;
  error = false;
  errorInfo = '';
  success = false;
  successInfo = '';
  language: any;
  languageSubject: any;
  tabs = [OutageWorkflow?.DETAILS_LABEL, OutageWorkflow?.NOTIFICATION_LABEL, OutageWorkflow?.RECEPIENTS_LABEL, OutageWorkflow?.SUMMARY_LABEL];
  workflowObj: any = {
    "uuid": "",
    "name": "",
    "tenantId": 0,
    "emails": [],//["ARULPRAKASH.CINNADURAI@calix.com", "ARULPRAKASH@calix.com"],
    "notes": "",
    "region": ['All'],//['34a91963-3404-41c1-9afc-a1f65047be87', 'af3fcd61-8dc2-44d4-9847-96f8a27e542d', '529a4503-f796-4d48-a457-35c4684cd8c8'],
    "location": ['All'],//['a3ac7be8-9204-4d4a-bd02-76383917393d', 'dbd1d2ba-77cf-4856-8e4e-0ac802490d95', '1f2b077b-2a9d-4b85-8b05-9c0938d9c407', '6a5f135f-1b7f-49fb-b53f-5bc2715c5471', 'd5480e12-7e00-47a8-9e57-a5d7e8f14955', '4de2b07f-8116-4ed0-a17d-c31eb322a6f8', '8d5eedb9-197f-41d2-8852-3c41ffe16e5f'],
    "filter": [],
    "schedule": {
      "immediate": true,
      "type": null,
      "recurrencePattern": null
    },
    "notifyOnClear": true,
    "outageThreshold": 1,
    "outageDuration": 1,
    "description": "",
    "status": "DRAFT",
    "format": "HTML",
    "timezone": "",
    "outagePollInterval": 15,
    "sms": [],
    "webhooks": [],
    "forms": {
      "0": {
        valid: false
      },
      "1": {
        valid: false
      },
      "2": {
        valid: false
      }
    },
    isConsentMsgSmsPopupAccepted: false,
    isLoadConsentMsgSmsPopupApplicable: true
  };


  constructor(private translateService: TranslateService,
    private titleService: Title,
    private otgWrkflwSrvc: OutageWorkflowService,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private http: HttpClient,
    private router: Router,
    private dateUtils: DateUtilsService,
    private commonWorkflowService: CommonWorkflowService,
    private commonService: CommonFunctionsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Service Disruption Notifications']} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Service Disruption Notifications']} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    console.log(`${this.language['Service Disruption Notifications']}`)
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.getRecordById(id);
    }

  }

  openModal() {
    const modalRef = this.modalService.open(SmsConsentComponent);
    modalRef.componentInstance.workflowObj = this.workflowObj;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.onTabChange(this.selectedTabIndex + 1);
      }
    }).catch((res) => { });;
  }

  levelsPassed = 0;
  onTabChange(index: number, type = null) {
    if (index > this.selectedTabIndex) {
      let validNav = true;
      this.commonWorkflowService.setTabChange();
      for (let i = 0; i < index; i++) {
        if (!this.workflowObj?.forms?.[i]?.valid) {
          validNav = false;
          break;
        }
      }

      if (!validNav) {
        return;
      }

      if (this.selectedTabIndex == 2 && this.workflowObj?.isLoadConsentMsgSmsPopupApplicable && !this.workflowObj?.isConsentMsgSmsPopupAccepted &&
        this.workflowObj?.sms?.length) {
        this.openModal();
        return;
      }

      if (this.selectedTabIndex == 0 && !this.workflowObj?.uuid) {
        let data = {
          name: this.workflowObj.name,
          description: this.workflowObj.description,
          timezone: this.dateUtils.getTImeZoneWithOffset()
        }
        this.create(data, index);
      } else {
        this.update(index);
      }

    } else {
      this.updateTab(index);
    }

    // this.activeTab = this.tabs[index];
    // this.disableNextBtn = false;
    // this.selectedTabIndex = index;
    // this.isTabChange = !this.isTabChange;
    // if (this.levelsPassed < index) {
    //   this.levelsPassed = index;
    // }

  }

  closeAlert() {
    this.error = false;
    this.errorInfo = '';
  }

  validateForm(event: any) {
    if (this.workflowObj?.forms?.[this.selectedTabIndex]) {
      this.workflowObj.forms[this.selectedTabIndex].valid = event;
    }
  }

  getRecordById(id: any) {
    this.loader = true;
    let url = `${environment.API_BASE_URL}analytics-engine/outageworkflow?outageWorkflowId=${id}`;
    this.http.get(url).subscribe((json: any) => {
      if (json && Object.keys(json).length) {
        json = this.otgWrkflwSrvc.updateRegLocToAll(json);
        this.setFormStatus(json);
        if (!json?.outagePollInterval) {
          json.outagePollInterval = 15;
        }

        this.workflowObj = { ...this.workflowObj, ...json };

        if (this.workflowObj?.sms?.length) {
          this.workflowObj.isConsentMsgSmsPopupAccepted = true;
          this.workflowObj.isLoadConsentMsgSmsPopupApplicable = false;
        }
      }

      this.loader = false;
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loader = false;
  }

  create(data: any, index: any) {
    this.http.post(`${environment.API_BASE_URL}analytics-engine/outageworkflow`, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      this.setSuccessInfo("Successfully Saved");
      this.workflowObj.uuid = res;
      this.updateTab(index);
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  update(index: any) {
    let url = `${environment.API_BASE_URL}analytics-engine/outageworkflow/${this.workflowObj.uuid}`;
    let data: any = {
      //name: this.workflowObj.name,
      description: this.workflowObj.description,
      timezone: this.dateUtils.getTImeZoneWithOffset()
    };

    if (this.selectedTabIndex == 1) {
      data = {
        ...data, ...{
          region: this.workflowObj.region,
          location: this.workflowObj.location,
          outagePollInterval: this.workflowObj.outagePollInterval
        }
      }
    } else if (this.selectedTabIndex == 2) {
      data = {
        ...data, ...{
          region: this.workflowObj.region,
          location: this.workflowObj.location,
          outagePollInterval: this.workflowObj.outagePollInterval,
          emails: this.workflowObj.emails,
          notes: this.workflowObj.notes,
          webhooks: this.workflowObj.webhooks,
          sms: this.workflowObj.sms,
        }
      }

    }

    data['status'] = this.workflowObj.status;

    if (this.selectedTabIndex > 0) {
      data = this.otgWrkflwSrvc.updateRegLoc(data);
    }

    this.http.put(url, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      this.setSuccessInfo("Successfully Saved");
      // if (this.selectedTabIndex > 2) {
      //   this.router.navigate(['./cco/operations/alarms/health-alarm-notifications']);
      // }

      this.updateTab(index);
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  deploy(status: any) {
    let url = `${environment.API_BASE_URL}analytics-engine/outagedeployWorkflow?workflowId=${this.workflowObj.uuid}&status=${status}`;
    let data: any = {
      //name: this.workflowObj.name,
      description: this.workflowObj.description,
      region: this.workflowObj.region,
      location: this.workflowObj.location,
      outagePollInterval: this.workflowObj.outagePollInterval,
      emails: this.workflowObj.emails,
      notes: this.workflowObj.notes,
      status: status,
      webhooks: this.workflowObj.webhooks,
      sms: this.workflowObj.sms,
    };

    data = this.otgWrkflwSrvc.updateRegLoc(data);

    this.http.put(url, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      let msg = 'Service Disruption Notification Schedule successfully deployed';
      if (status === 'PAUSE') {
        msg = 'Service Disruption Notification Schedule successfully paused';
        this.commonService.trackPendoEvents('Operations_Cloud', 'Email notification modified')
      }
      else this.commonService.trackPendoEvents('Operations_Cloud', 'Email notification saved')
      this.setSuccessInfo(msg);

      setTimeout(() => {
        if (this.selectedTabIndex > 2) {
          this.router.navigate(['./cco/operations/alarms/health-alarm-notifications']);
        }
      }, 2000);

    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  updateTab(index: any) {
    this.activeTab = this.tabs[index];
    this.disableNextBtn = false;
    this.selectedTabIndex = index;
    this.isTabChange = !this.isTabChange;
    if (this.levelsPassed < index) {
      this.levelsPassed = index;
    }
  }

  setSuccessInfo(msg: any) {
    this.success = true;
    this.successInfo = msg;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }

  setFormStatus(json: any) {
    if (json?.name) {
      this.workflowObj.forms[0].valid = true;
      this.levelsPassed = 1;
    }

    if (json?.name && json?.outagePollInterval) {
      this.workflowObj.forms[1].valid = true;
      this.levelsPassed = 2;
    }

    if (json?.name && json?.outagePollInterval && json?.emails?.length || json?.sms?.length || json?.webhooks?.length) {
      this.workflowObj.forms[2].valid = true;
      this.levelsPassed = 3;
    }

    if (json?.status === 'PAUSE' || json?.status === 'RUN') {
      this.levelsPassed = 4;
    }
  }


}
