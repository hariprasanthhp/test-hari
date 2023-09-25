import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { OutlierWorkflowService } from '../outlier-workflow.service';
import { OutliersWorkflow } from '../outliers-workflow.constant';
import { CommonWorkflowService } from '../../workflow-shared/common-workflow.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmsConsentComponent } from '../../workflow-shared/sms-consent/sms-consent.component';

@Component({
  selector: 'app-outliers-workflow-wizward',
  templateUrl: './outliers-workflow-wizward.component.html',
  styleUrls: ['./outliers-workflow-wizward.component.scss']
})
export class OutliersWorkflowWizwardComponent implements OnInit {
  titleObj: any = {
    OPTICAL_OUTLIERS: 'Optical Outlier Notification',
    EARLY_WARN_PON_CAP: 'Early Warning PON Capacity Notification',
    EARLY_WARN_ETH_CAP: 'Early Warning Ethernet Capacity Notification',
    EARLY_WARN_PON_LOSS: 'Early Warning PON Loss Notification'
  };

  title: any;
  recepientFormFields: any = [
    {
      key: 'emailRecipients',
      required: true
    },
    {
      key: 'emailNotes',
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
    emailRecipients: 'emailRecipients',
    emailNotes: 'emailNotes',
    sms: 'sms',
    webhooks: 'webhooks'
  };
  loader = false;
  disableFinishBtn = false;
  outliersWorkflow = OutliersWorkflow;
  activeTab: string = OutliersWorkflow?.DETAILS_LABEL;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  disableNextBtn: boolean = false;
  error = false;
  errorInfo = '';
  language: any;
  languageSubject: any;
  tabs = [OutliersWorkflow?.DETAILS_LABEL, OutliersWorkflow?.SYSTEMS_LABEL, OutliersWorkflow?.RECEPIENTS_LABEL, OutliersWorkflow?.SUMMARY_LABEL];
  workflowObj: any = {
    "isNew": true,
    "active": true,
    // "regions": ["6382c0b6-a4db-4342-9f74-31861b680cdd", "82cd3169-7b74-473b-9d04-0fb0966601a2", "5fda988a-eb93-4c50-9744-a2634827235d", "56764f50-1bf5-488b-8b10-e55dc6a76f3a", "58bad929-37cf-4418-a502-c85963d3365a"], //['All']
    // "locations": ["95f04de8-96fe-4591-98b4-f9de327783db", "4980e86d-21d8-4824-b0f5-e88104c2f655", "1f2ba1be-cb00-497d-9612-6880bdaa83cc", "cf477d31-5bea-4c99-991c-899afa885ba3"], //['All'],
    // "systems": ["33e73c0e-20a2-4e2d-bd92-6d1c3b7384ee", "01d2d8c0-d2fc-40aa-a26b-2134a53478eb", "3a361b89-6f94-47bb-b382-fb54da1f5adb"],//['All'],
    "regions": ['All'],
    "locations": ['All'],
    "systems": ['All'],
    "emailRecipients": [],
    "emailNotes": "",
    "uuid": "",
    "name": "",
    "description": "",
    "status": "DRAFT",
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
  success: boolean;
  successInfo: any;

  constructor(private translateService: TranslateService,
    private titleService: Title,
    private otlrWrkflwSrvc: OutlierWorkflowService,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private http: HttpClient,
    private router: Router,
    private commonWorkflowService: CommonWorkflowService,
    private dateUtils: DateUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title = `New ${this.titleObj[this.otlrWrkflwSrvc.getType()]}`;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.titleObj[this.otlrWrkflwSrvc.getType()]} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.titleObj[this.otlrWrkflwSrvc.getType()]} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let id = this.route.snapshot.paramMap.get("id");
    console.log(this.route.snapshot.params);
    // let type = this.route.snapshot.paramMap.get("type");
    // console.log(type);
    // if (type) {
    //   this.workflowObj.type = type;
    // } else {
    //   //this.router.navigate(['/cco/operations/alarms/health-alarm-notifications']);
    // }

    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));
      console.log(params.get('type'));
    })

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

      if (this.selectedTabIndex == 0 && this.workflowObj?.isNew) {
        let data = {
          name: this.workflowObj.name,
          description: this.workflowObj.description,
          type: this.otlrWrkflwSrvc.getType(),
          timeZone: this.dateUtils.getTImeZoneWithOffset()
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
    let url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(id)}`;
    this.http.get(url).subscribe((json: any) => {
      if (json && Object.keys(json).length) {

        //json = this.otlrWrkflwSrvc.updateRegLocToAll(json);
        this.setFormStatus(json);
        this.workflowObj = { ...this.workflowObj, ...json };
        this.workflowObj.isNew = false;
        console.log(this.workflowObj);
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
    //this.updateTab(index); return;
    this.http.post(`${environment.API_BASE_URL}health/config/notifications`, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      this.setSuccessInfo("Successfully Saved");
      this.workflowObj.isNew = false;
      this.updateTab(index);
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  update(index: any) {
    //this.updateTab(index); return;
    let url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(this.workflowObj.name)}`;
    let data: any = {
      name: this.workflowObj.name,
      description: this.workflowObj.description,
      status: this.workflowObj?.status ? this.workflowObj?.status : 'DRAFT',
      type: this.otlrWrkflwSrvc.getType(),
      timeZone: this.dateUtils.getTImeZoneWithOffset()
    };

    if (this.workflowObj.regions?.length) {
      let index = this.workflowObj.regions?.indexOf('All');
      if (index !== -1) {
        this.workflowObj.regions?.splice(index, 1);
      }

    }

    if (this.workflowObj.locations?.length) {
      let index = this.workflowObj.locations?.indexOf('All');
      if (index !== -1) {
        this.workflowObj.locations?.splice(index, 1);
      }

    }

    if (this.workflowObj.systems?.length) {
      let index = this.workflowObj.systems?.indexOf('All');
      if (index !== -1) {
        this.workflowObj.systems?.splice(index, 1);
      }

    }

    if (this.selectedTabIndex == 1) {
      data = {
        ...data, ...{
          regions: this.workflowObj.regions,
          locations: this.workflowObj.locations,
          systems: this.workflowObj.systems
        }
      }
    } else if (this.selectedTabIndex == 2) {
      data = {
        ...data, ...{
          regions: this.workflowObj.regions,
          locations: this.workflowObj.locations,
          systems: this.workflowObj.systems,
          emailRecipients: this.workflowObj.emailRecipients,
          emailNotes: this.workflowObj.emailNotes,
          sms: this.workflowObj.sms,
          webhooks: this.workflowObj.webhooks
        }
      }

    }

    //data['status'] = this.workflowObj.status;

    // if (this.selectedTabIndex > 0) {
    //   data = this.otlrWrkflwSrvc.updateRegLoc(data);
    // }

    this.http.put(url, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      this.setSuccessInfo("Successfully Saved");
      // if (this.selectedTabIndex > 2) {
      //   this.router.navigate(['/cco/operations/alarms/health-alarm-notifications']);
      // }

      this.updateTab(index);
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  deploy(status: any) {
    let url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(this.workflowObj.name)}`;
    let data: any = {
      name: this.workflowObj.name,
      description: this.workflowObj.description,
      regions: this.workflowObj.regions,
      locations: this.workflowObj.locations,
      systems: this.workflowObj.systems,
      emailRecipients: this.workflowObj.emailRecipients,
      emailNotes: this.workflowObj.emailNotes,
      status: status,
      type: this.otlrWrkflwSrvc.getType(),
      sms: this.workflowObj.sms,
      webhooks: this.workflowObj.webhooks,
      timeZone: this.dateUtils.getTImeZoneWithOffset()
    };

    //data = this.otlrWrkflwSrvc.updateRegLoc(data);

    this.http.put(url, data, { responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      let msg = `${this.titleObj[this.otlrWrkflwSrvc.getType()]} Schedule successfully paused`;
      if (status === 'RUN') {
        msg = `${this.titleObj[this.otlrWrkflwSrvc.getType()]} Schedule successfully deployed`;
      }
      this.setSuccessInfo(msg);

      setTimeout(() => {
        if (this.selectedTabIndex > 2) {
          this.router.navigate(['/cco/operations/alarms/health-alarm-notifications']);
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

    if (json?.name) {
      this.workflowObj.forms[1].valid = true;
      this.levelsPassed = 2;
    }

    if (json?.name && json?.emailRecipients?.length || json?.sms?.length || json?.webhooks?.length) {
      this.workflowObj.forms[2].valid = true;
      this.levelsPassed = 3;
    }

    // if (json?.status === 'PAUSE' || json?.status === 'RUN') {
    //   this.levelsPassed = 4;
    // }
  }

}
