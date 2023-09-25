import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { AlarmNotificationsApisService } from './services/alarm-notifications-apis.service';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { IssueService } from '../issues/service/issue.service';
import { CommonWorkflowService, nameValidator } from '../workflow-shared/common-workflow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmsConsentComponent } from '../workflow-shared/sms-consent/sms-consent.component';

@Component({
  selector: 'app-alarm-notifications',
  templateUrl: './alarm-notifications.component.html',
  styleUrls: ['./alarm-notifications.component.scss'],
})
export class AlarmNotificationsComponent implements OnInit {
  recepientFormFields: any = [
    {
      key: 'mailRecepients',
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
    emailRecipients: 'mailRecepients',
    emailNotes: 'notes',
    sms: 'sms',
    webhooks: 'webhooks'
  };

  language: any;
  languageSubject: any;
  isDev: boolean = false;
  loadEditable: Subject<boolean> = new Subject<boolean>();
  scheduleFormSubmit: Subject<boolean> = new Subject();
  conditionFormSubmit: Subject<boolean> = new Subject();
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  loading: boolean = false;
  btnDisabled: boolean = false;
  alarmNotificationsSteppers = [
    {
      name: 'Details',
      value: 'Details'
    },
    {
      name: 'Alarms',
      value: 'Alarms'
    },
    {
      name: 'Notification Trigger',
      value: 'Conditions'
    },
    {
      name: 'Recipients',
      value: 'notification'
    },
    {
      name: 'Summary',
      value: 'Summary'
    }
  ];
  // alarmNotificationsSteppers = [
  //   'Details',
  //   'Alarms',
  //   'Conditions',
  //   'notification',
  //   'Summary',
  // ];
  activeTab: string = 'Details';
  levelsPassed = 0;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  errorMsg: string = undefined;
  notificationsData: any = {
    alarm_notifications_summary: true,
    workFlowData: {},
    workFlowTab: this.alarmNotificationsSteppers,
    workflowId: '',
    details: {
      name: undefined,
      description: undefined,
      isNameEntered: true,
      workFlowSaved: false,
      workflowId: '',
      workFlowDetailsForm: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50), nameValidator]],
        description: [''],
      })
    },
    alarms: {
      workFlowSaved: false,
      alarmSelectedList: [],
      exisitingAlarmSelectedList: [],
      workFlowAlarmsForm: undefined,
      alarmsFormEntered: false,
      receiveAlert: 'No',
      alert_threshold: 0,
      clear_threshold: 0,
      duration: 0,
      // workflowAlarmFilter : '',
      // workflowAlarmFilterValues: [],
      totMonitoredAlarms: 0,
      groupAlarmData: {
        data: [],
      },
      individualAlarmData: {
        data: [],
        categoryList: [],
        searchCategory: undefined,
        searchSeverity: undefined,
        prevSearchCategory: undefined,
        prevSearchSeverity: undefined,
        categoryOrSeverity: undefined
      },
      transformAlarmData: {
        data: [],
      },
      monitoredIndividualAlarm: {
        data: [],
        categoryList: []
      },
      monitoredGroupAlarm: {
        data: [],
      },
      monitoredTransformAlarm: {
        data: [],
      },
    },
    conditions: {
      workFlowStatus: undefined,
      workFlowSaved: false,
      isFormValid: false,
      immediate: 'true',
      exclusionsValid: 'valid',
      weeklyScheduleValid: 'valid',
      // workFlowConditionsForm: undefined,
      conditionsFormEntered: false,
      regionsDataArray: ['All'],
      locationDataArray: ['All'],
      minRaiseThreshold: 1,
      recurrence: 'daily',
      // immediate: 'true',
      weekDays: [],
      soakTime: 0,
      minClearThreshold: 0,
      oldNotifyOnClear: false,
      soakTimeChanged: false,
      workFlowConditionsForm:
        this.formBuilder.group({
          region: ['', Validators.required],
          location: ['', Validators.required],
          soakTime: [0, [Validators.required, Validators.max(240), Validators.min(0)]],
          raiseThreshold: [1, [Validators.required, Validators.max(10000)]],
          duration: [1, [Validators.required, Validators.max(120), Validators.min(1)]],
          immediate: ['true', Validators.required],

          clearThreshold: [0],
          // immediate: ['true', Validators.required],
          notifyOnClear: [false],
          weekDays: new FormArray([]),
          // everyCount: [1],
          recurrence: ['daily'],
          scheduleStartTime: [new Date(new Date().setMonth(11))],
          // numberOfMonths: [''],
          dayOfMonth: [1],
          timezone: ['']
        })
    },
    notification: {
      mailRecepients: [],
      mailEntered: true,
      workFlowSaved: false,
      isFormValid: false,
      // exclusionsValid: 'valid',
      // workFlowScheduleForm: undefined,
      scheduleFormEntered: false,
      // recurrence: 'daily',
      // // immediate: 'true',
      // weekDays: [],
      // minClearThreshold: 0,
      isConsentMsgSmsPopupAccepted: false,
      isLoadConsentMsgSmsPopupApplicable: true,

      workFlowScheduleForm: this.formBuilder.group({
        notes: [''],
        // mailFormat: ['html', Validators.required],
        // clearThreshold: [0],
        // // immediate: ['true', Validators.required],
        // notifyOnClear: [false],
        // weekDays: new FormArray([]),
        // // everyCount: [1],
        // recurrence: ['daily'],
        // scheduleStartTime: [''],
        // numberOfMonths: [''],
        // timezone : [''],        
      }),
      "sms": [],
      "webhooks": []
    },
    summary: {
      workFlowSaved: false,
    },
  };
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    public ssoService: SsoAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiPreDataSevice: AlarmNotificationsApisService,
    private titleService: Title,
    private issueService: IssueService,
    @Inject(DOCUMENT) private document: Document,
    private commonWorkflowService: CommonWorkflowService,
    private modalService: NgbModal
  ) {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.notificationsData.workflowId = params['workflowId'] ? params.workflowId : '';
      this.notificationsData.details.workflowId = params['workflowId'] ? params.workflowId : '';
    })
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['alarm_notifications']} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      }
    );
    this.titleService.setTitle(`${this.language['alarm_notifications']} - ${this.language['Email Notifications']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.setDefaultWeekDays();
    this.callMultipleAPI();

  }

  openModal() {
    const modalRef = this.modalService.open(SmsConsentComponent);
    modalRef.componentInstance.workflowObj = this.notificationsData.notification;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.onTabChange(this.selectedTabIndex + 1, 'forward');
      }
    }).catch((res) => { });;
  }

  async callMultipleAPI() {
    await Promise.all([

      // get categories
      this.getCategories(),

      //alarm data
      this.getIndividualAlarmData(),
      // this.getGroupAlarmData(),
      this.getTransformAlarmData(),

      //regions data
      this.regionsApiLoader()
    ]);

    this.mergeAlarmRules();
    if (this.notificationsData.workflowId != '') {
      this.getWorkflowData();
    }

    //Call Get workflow API in alarm Notification page
    // this.getWorkFlowAPIEmitter.emit(true);
  }

  getCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getCategories().then((data) => {
        this.notificationsData.alarms.individualAlarmData.categoryList = [
          ...data,
        ];
        this.notificationsData.alarms.monitoredIndividualAlarm.categoryList = [
          ...data,
        ];
        resolve();
      });
    })
  }
  getIndividualAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getIndividualAlarmData().then((data) => {
        this.notificationsData.alarms.individualAlarmData.data = [...data];
        this.notificationsData.alarms.individualAlarmData = {
          ...this.notificationsData.alarms.individualAlarmData,
        };
        resolve();
      });
    })
  }
  getGroupAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getGroupAlarmData().then((data) => {
        this.notificationsData.alarms.groupAlarmData.data = [...data];
        this.notificationsData.alarms.groupAlarmData = {
          ...this.notificationsData.alarms.groupAlarmData,
        };
        resolve();
      });
    })
  }
  getTransformAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getTransformAlarmData().then((data) => {
        this.notificationsData.alarms.transformAlarmData.data = [...data];
        this.notificationsData.alarms.transformAlarmData = {
          ...this.notificationsData.alarms.transformAlarmData,
        };
        resolve();
      });
    })
  }
  regionsApiLoader(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.regionsApiLoader().then((data) => {
        this.notificationsData.conditions.regionsDataArray = [
          ...this.notificationsData.conditions.regionsDataArray,
          ...data,
        ];
        resolve();
      });
    })
  }
  mergeAlarmRules() {

    if (this.notificationsData.alarms.individualAlarmData.data.length > 0) {
      let alarmRulesObj = this.notificationsData.alarms.individualAlarmData.data.filter((el) => el.alarm_name.includes('multiple-onts-down') && el.alarm_category == 'PON transformed');
      // if(this.notificationsData.alarms.transformAlarmData.data.length == 0){
      //   if(alarmRulesObj.length > 0){
      //     alarmRulesObj.forEach((el) => {
      //       el['rulesnotexist'] = true;
      //     })
      //   }

      //   return;
      // } else {
      if (alarmRulesObj.length > 0) {
        alarmRulesObj.forEach((element) => {
          let transformAlarmRule = this.notificationsData.alarms.transformAlarmData.data.find((el) => el['alarm_name'] == element['alarm_name']);

          if (transformAlarmRule) {
            element['alarm_id'] = transformAlarmRule['alarmRuleId'];
            element['rulesexist'] = true;
          } else {
            element['rulesnotexist'] = true;
          }
        })
      }
      // }
    }
  }
  patchNotificationFormValue() {
    const weeklyDays = this.notificationsData.conditions.workFlowConditionsForm.get(
      'weekDays'
    ) as FormArray;
    if (weeklyDays.controls) {
      weeklyDays.controls.length = 0;
    }
    this.notificationsData.conditions.weekDays.forEach((days) => {
      days['scheduleWeeklyStatus'] = days['scheduleWeeklyStatus']
        ? days['scheduleWeeklyStatus']
        : false;
      weeklyDays.push(
        new FormGroup({
          name: new FormControl(days.name),
          short_name: new FormControl(days.short_name),
          value: new FormControl(days.value),
          dayFrom: new FormControl(days.dayFrom),
          dayTo: new FormControl(days.dayTo),
          defaultTime: new FormControl(days.defaultTime),
          minTime: new FormControl(days.minTime),
          maxTime: new FormControl(days.maxTime),
          checked: new FormControl(days['checked'] || false),
          scheduleWeeklyStatus: new FormControl(days['scheduleWeeklyStatus']),
        })
      );
    });
  }
  onTabChange(index: number, type) {
    this.errorMsg = undefined;
    this.notificationsData.notification.mailEntered = true;
    this.notificationsData.conditions.exclusionsValid = 'valid';
    this.notificationsData.conditions.weeklyScheduleValid = 'valid';
    if (type == 'forward') {
      if (
        (this.notificationsData?.details?.workFlowDetailsForm?.valid &&
          index < 2 &&
          this.activeTab == 'Details') ||
        ((this.notificationsData.alarms.monitoredIndividualAlarm?.data.length >
          0 ||
          this.notificationsData.alarms.monitoredGroupAlarm?.data.length > 0 ||
          this.notificationsData.alarms.monitoredTransformAlarm?.data.length >
          0) &&
          index == 2 &&
          this.activeTab == 'Alarms') ||
        (index == 3 &&
          this.activeTab == 'Conditions' && this.exclusionValidations() && !this.weeklyScheduleValidation() &&
          this.notificationsData.conditions?.workFlowConditionsForm?.valid) ||
        (/*this.notificationsData.notification?.workFlowScheduleForm?.valid && */
          this.notificationsData.notification?.mailRecepients?.length > 0 ||
          this.notificationsData.notification?.sms?.length > 0 ||
          this.notificationsData.notification?.webhooks?.length > 0 &&
          index == 4 &&
          this.activeTab == 'notification')
      ) {

        if (this.notificationsData.notification?.isLoadConsentMsgSmsPopupApplicable && !this.notificationsData.notification?.isConsentMsgSmsPopupAccepted &&
          this.notificationsData.notification?.sms?.length) {
          this.openModal();
          return;
        }

        this.saveAndContinue(index);
      } else if (
        index == 4 &&
        (/*!this.notificationsData.notification.workFlowScheduleForm.valid || */
          (this.notificationsData.notification?.mailRecepients?.length <= 0 &&
            this.notificationsData.notification?.sms?.length <= 0 &&
            this.notificationsData.notification?.webhooks?.length <= 0))

      ) {
        /*if (this.notificationsData.notification?.mailRecepients.length <= 0) {
          this.notificationsData.notification.mailEntered = false;
        }
        this.scheduleFormSubmit.next(true);*/
        this.commonWorkflowService.setTabChange();
      } else if (
        index == 3 &&
        (!this.notificationsData.conditions.workFlowConditionsForm.valid || this.notificationsData.conditions.exclusionsValid == 'not-valid' || this.notificationsData.conditions.weeklyScheduleValid == 'not-valid')
      ) {
        if (
          this.notificationsData.conditions.exclusionsValid == 'not-valid'
        ) {
          this.errorMsg =
            'Please select start time and end time of all selected exclusion days.';
        } else if (
          this.notificationsData.conditions.weeklyScheduleValid == 'not-valid'
        ) {
          this.errorMsg =
            'Please select at least one day.';
        }
        this.conditionFormSubmit.next(true);
      } else if (
        index == 2 &&
        ((this.notificationsData.alarms?.monitoredIndividualAlarm?.data
          .length == 0 &&
          this.notificationsData.alarms?.monitoredGroupAlarm?.data.length ==
          0) ||
          this.notificationsData.alarms?.monitoredTransformAlarm?.data.length ==
          0)
      ) {
        this.errorMsg = 'Please add at least one alarm.';
      } else {
        this.notificationsData.details.workFlowDetailsForm.markAllAsTouched();
        this.notificationsData.details.isNameEntered =
          index !== 0 ? false : true;
      }
    } else if (type == 'backward') {
      // if (
      //   ((this.notificationsData.alarms.monitoredIndividualAlarm?.data.length >
      //     0 ||
      //     this.notificationsData.alarms.monitoredGroupAlarm?.data.length > 0 ||
      //     this.notificationsData.alarms.monitoredTransformAlarm?.data.length >
      //       0) &&
      //     index == 0 &&
      //     this.activeTab == 'Alarms') ||
      //   (index == 1 &&
      //     this.activeTab == 'Conditions' &&
      //     this.notificationsData.conditions?.workFlowConditionsForm?.valid) ||
      //   (index == 2 &&
      //     this.activeTab == 'notification' &&
      //     this.notificationsData.notification?.mailRecepients.length > 0 &&
      //     this.notificationsData.notification?.workFlowScheduleForm?.valid &&
      //     this.exclusionValidations())
      // ) {
      //   this.saveAndContinue(index);
      // } else if (
      //   index == 0 &&
      //   ((this.notificationsData.alarms?.monitoredIndividualAlarm?.data
      //     .length == 0 &&
      //     this.notificationsData.alarms?.monitoredGroupAlarm?.data.length ==
      //       0) ||
      //     this.notificationsData.alarms?.monitoredTransformAlarm?.data.length ==
      //       0)
      // ) {
      //   this.errorMsg = 'Please add at least one alarm.';
      // } else if (
      //   index == 1 &&
      //   !this.notificationsData.conditions.workFlowConditionsForm.valid
      // ) {
      //   this.conditionFormSubmit.next(true);
      // } else if (
      //   index == 2 &&
      //   (!this.notificationsData.notification.workFlowScheduleForm.valid ||
      //     this.notificationsData.notification.exclusionsValid == 'not-valid' ||
      //     this.notificationsData.notification?.mailRecepients.length <= 0)
      // ) {
      //   if (
      //     this.notificationsData.notification.exclusionsValid == 'not-valid'
      //   ) {
      //     this.errorMsg =
      //       'Please select start time and end time of all selected exclusion days.';
      //   }
      //   if(this.notificationsData.notification?.mailRecepients.length <= 0){
      //     this.notificationsData.notification.mailEntered = false;
      //   }
      //   this.scheduleFormSubmit.next(true);
      // } else if (index == 3 && this.activeTab == 'Summary') {
      setTimeout(() => {
        this.updateStepperCompleted(index);
      }, 1000)
      // } else {
      //   this.notificationsData.details.isNameEntered =
      //     index !== 0 ? false : true;
      // }
    } else if (type == 'stepperClick') {
      if (index > this.selectedTabIndex) {
        if (
          (index - 1 == this.selectedTabIndex ||
            this.notificationsData[
              this.alarmNotificationsSteppers[index].value.toLowerCase()
            ].workFlowSaved) &&
          !(index == this.selectedTabIndex)
        ) {
          if (
            (this.notificationsData.details.workFlowDetailsForm.valid &&
              this.activeTab == 'Details') ||
            ((this.notificationsData.alarms.monitoredIndividualAlarm?.data
              .length > 0 ||
              this.notificationsData.alarms.monitoredGroupAlarm?.data.length >
              0 ||
              this.notificationsData.alarms.monitoredTransformAlarm?.data.length >
              0) &&
              this.activeTab == 'Alarms') ||
            (this.activeTab == 'Conditions' &&
              this.notificationsData.conditions?.workFlowConditionsForm?.valid && !this.weeklyScheduleValidation() && this.exclusionValidations()) ||
            (this.activeTab == 'notification' &&
              this.notificationsData.notification?.mailRecepients.length > 0 ||
              this.notificationsData.notification?.sms?.length > 0 ||
              this.notificationsData.notification?.webhooks?.length > 0/* &&
              this.notificationsData.notification?.workFlowScheduleForm?.valid */) ||
            this.activeTab == 'Summary'
          ) {
            if (this.notificationsData.notification?.isLoadConsentMsgSmsPopupApplicable && !this.notificationsData.notification?.isConsentMsgSmsPopupAccepted &&
              this.notificationsData.notification?.sms?.length) {
              this.openModal();
              return;
            }
            this.saveAndContinue(index);
          } else if (
            this.activeTab == 'Alarms' &&
            ((this.notificationsData.alarms?.monitoredIndividualAlarm?.data
              .length == 0 &&
              this.notificationsData.alarms?.monitoredGroupAlarm?.data.length ==
              0) ||
              this.notificationsData.alarms?.monitoredTransformAlarm?.data
                .length == 0)
          ) {
            this.errorMsg = 'Please add at least one alarm.';
          } else if (
            this.activeTab == 'Conditions' &&
            (!this.notificationsData.conditions.workFlowConditionsForm.valid || this.notificationsData.conditions.exclusionsValid == 'not-valid' || this.notificationsData.conditions.weeklyScheduleValid == 'not-valid')
          ) {
            if (
              this.notificationsData.conditions.exclusionsValid == 'not-valid'
            ) {
              this.errorMsg =
                'Please select start time and end time of all selected exclusion days.';
            } else if (
              this.notificationsData.conditions.weeklyScheduleValid == 'not-valid'
            ) {
              this.errorMsg =
                'Please select atleast one day.';
            }
            this.conditionFormSubmit.next(true);
          } else if (
            this.activeTab == 'notification' &&
            (/*!this.notificationsData.notification.workFlowScheduleForm.valid ||*/
              this.notificationsData.notification?.mailRecepients.length <= 0 && this.notificationsData.notification?.sms?.length <= 0 &&
              this.notificationsData.notification?.webhooks?.length <= 0)
          ) {
            this.commonWorkflowService.setTabChange();
            // if (this.notificationsData.notification?.mailRecepients.length <= 0) {
            //   this.notificationsData.notification.mailEntered = false;
            // }
            // this.scheduleFormSubmit.next(true);
          } else if (
            (!this.notificationsData.details.workFlowDetailsForm.valid) &&
            this.activeTab == 'Details'
          ) {
            this.notificationsData.details.isNameEntered = false;
          }
        }
      } else {
        setTimeout(() => {
          this.updateStepperCompleted(index);
        }, 1000)
      }

    }
  }
  weeklyScheduleValidation() {
    const conditionForm = {
      ...this.notificationsData?.conditions?.workFlowConditionsForm?.value,
    };
    let validate = false;
    if (
      conditionForm.weekDays.length > 0 &&
      conditionForm.weekDays &&
      conditionForm.immediate == 'false' &&
      conditionForm.recurrence == 'weekly'
    ) {
      validate = conditionForm.weekDays.every(el => !el['scheduleWeeklyStatus']);
      if (validate) {
        this.notificationsData.conditions.weeklyScheduleValid = 'not-valid';
      }
    }

    return validate;
  }
  exclusionValidations() {
    const conditionForm = {
      ...this.notificationsData?.conditions?.workFlowConditionsForm?.value,
    };
    let validate = true;
    if (
      conditionForm.weekDays.length > 0 &&
      conditionForm.weekDays &&
      conditionForm.immediate == 'true'
    ) {
      conditionForm.weekDays = conditionForm.weekDays.forEach((element) => {
        if (element.checked) {
          if (element.dayFrom == '' || element.dayTo == '') {
            this.notificationsData.conditions.exclusionsValid = 'not-valid';
            validate = false;
          }
        }
      });
    }
    return validate;
  }
  saveAndContinue(index) {
    if (this.activeTab == 'Summary') {
      this.updateStepperCompleted(index);
    } else {
      if (
        this.activeTab == 'Details' &&
        this.notificationsData.workflowId == ''
      ) {
        let detailsForm = {
          ...this.notificationsData.details.workFlowDetailsForm?.controls,
        };
        let request_body = {
          name: detailsForm['name']?.value,
          description: (detailsForm['description']?.value)
            ? detailsForm['description']['value']
            : '',
        };
        this.loading = true;
        this.btnDisabled = true;
        this.errorMsg = undefined;
        this.error = false;
        this.http
          .post(`${this.baseUrl}workflow`, request_body, {
            responseType: 'text',
          })
          .subscribe(
            (res: any) => {
              if (res && res != '') {
                this.loading = false;
                this.success = true;
                setTimeout(() => {
                  this.btnDisabled = false;
                  this.success = false;
                }, 2000);
                this.notificationsData.workflowId = res;
                this.notificationsData.details.workflowId = res;
                this.successInfo = 'Successfully Saved';
                this.updateStepperCompleted(index);
              } else {
                this.loading = false;
                this.btnDisabled = false;
                this.errorMsg = this.language['Error'];
              }
            },
            (err: HttpErrorResponse) => {
              this.error = true;
              this.loading = false;
              this.btnDisabled = false;
              this.pageErrorHandle(err);
            }
          );
      } else {
        let request_body = {};
        if (this.activeTab == 'Details') {
          let detailsForm = {
            ...this.notificationsData.details.workFlowDetailsForm?.controls,
          };
          request_body = {
            name: detailsForm['name']?.value,
            description: (detailsForm['description']?.value)
              ? detailsForm['description'].value
              : '',
          };
        } else if (this.activeTab == 'Alarms') {
          let monitoredGroupAlarm =
            this.notificationsData.alarms.monitoredGroupAlarm.data.map(
              (el) => el.group_id
            );
          // ,
          // monitoredIndividualAlarm =
          //   this.notificationsData.alarms.monitoredIndividualAlarm.data.map(
          //     (el) => el.alarm_id
          //   ),
          // monitoredTransformAlarm =
          //   this.notificationsData.alarms.monitoredTransformAlarm.data.map(
          //     (el) => el.alarmRuleId
          //   );


          // mergeTransformRulesToIndividualAlarmsChanges
          let monitoredIndividualAlarm =
            this.notificationsData.alarms.monitoredIndividualAlarm.data.filter((el) => !el['rulesexist']).map(
              (el) => el.alarm_id
            ),
            monitoredTransformAlarm =
              this.notificationsData.alarms.monitoredIndividualAlarm.data.filter((el) => el['rulesexist']).map(
                (el) => el.alarm_id
              );


          //   let monitoredGroupAlarm =
          //   this.notificationsData.alarms.monitoredGroupAlarm.data.map(
          //     (el) => el.group_name
          //   ),
          // monitoredIndividualAlarm =
          //   this.notificationsData.alarms.monitoredIndividualAlarm.data.map(
          //     (el) => el.alarm_name
          //   ),
          // monitoredTransformAlarm =
          //   this.notificationsData.alarms.monitoredTransformAlarm.data.map(
          //     (el) => el.group_name
          //   );

          let workflowAlarmFilterValues = [];
          let workflowAlarmFilter = 'CATEGORY';
          /*workflow mutually exclusive post
             
              let categorySeverityName = '';
              if(this.notificationsData.alarms.individualAlarmData.categoryOrSeverity == 'CATEGORY'){
                if(this.notificationsData.alarms.individualAlarmData.prevSearchCategory){
                  categorySeverityName = this.notificationsData.alarms.individualAlarmData.prevSearchCategory
                }else{
                  categorySeverityName = this.notificationsData.alarms.individualAlarmData.searchCategory
                }
                workflowAlarmFilterValues.push(categorySeverityName);
                workflowAlarmFilter = 'CATEGORY';
              }else if(this.notificationsData.alarms.individualAlarmData.categoryOrSeverity == 'SEVERITY'){
                if(this.notificationsData.alarms.individualAlarmData.prevSearchSeverity){
                  categorySeverityName = this.notificationsData.alarms.individualAlarmData.prevSearchSeverity
                }else{
                  categorySeverityName = this.notificationsData.alarms.individualAlarmData.searchSeverity
                }
                workflowAlarmFilterValues.push(categorySeverityName);
                workflowAlarmFilter = 'SEVERITY';
              }
  
  
               workflow mutually exclusive post */

          // if(this.notificationsData.alarms.individualAlarmData.searchCategory){
          //   workflowAlarmFilterValues.push(this.notificationsData.alarms.individualAlarmData.searchCategory);
          //   workflowAlarmFilter = 'CATEGORY';
          // }else if(this.notificationsData.alarms.individualAlarmData.searchSeverity){
          //   workflowAlarmFilterValues.push(this.notificationsData.alarms.individualAlarmData.searchSeverity);
          //   workflowAlarmFilter = 'SEVERITY';
          // }
          // if(monitoredGroupAlarm.length > 0){
          //   request_body['alarmGroups'] = monitoredGroupAlarm;
          // }
          // if(monitoredIndividualAlarm.length > 0){
          //   request_body['alarmNames'] = monitoredIndividualAlarm;
          // }
          // if(monitoredTransformAlarm.length > 0){
          //   request_body['transformAlarms'] = monitoredTransformAlarm;
          // }
          request_body = {
            alarmGroups: monitoredGroupAlarm,
            alarmNames: monitoredIndividualAlarm,
            transformAlarms: monitoredTransformAlarm
          };
          // if(workflowAlarmFilterValues.length > 0 && monitoredIndividualAlarm.length > 0){
          request_body['workflowAlarmFilterValues'] = workflowAlarmFilterValues;
          request_body['workflowAlarmFilter'] = workflowAlarmFilter;
          // }
        } else if (this.activeTab == 'Conditions') {
          let conditionForm = {
            ...this.notificationsData.conditions.workFlowConditionsForm?.value,
          };
          request_body = {
            region:
              conditionForm['region'] && conditionForm['region'].length > 0
                ? conditionForm['region'].indexOf('All') != -1
                  ? ['11111111-1111-1111-1111-111111111111']
                  : conditionForm['region']
                : [],
            location:
              conditionForm['location'] && conditionForm['location'].length > 0
                ? conditionForm['location'].indexOf('All') != -1
                  ? ['11111111-1111-1111-1111-111111111111']
                  : conditionForm['location']
                : []
          };
          request_body['timezone'] = conditionForm['timezone'];
          request_body['schedule'] = {};
          if (conditionForm['immediate'] == 'true') {
            request_body['raiseThreshold'] = conditionForm['raiseThreshold'] ? conditionForm['raiseThreshold'] : 1;
            request_body['duration'] = conditionForm['duration'] ? conditionForm['duration'] : 1;
            request_body['soakTime'] = conditionForm['soakTime'] ? conditionForm['soakTime'] : 0;

            if (conditionForm['notifyOnClear'] == true) {
              request_body['notifyOnClear'] = true;

              request_body['clearThreshold'] = conditionForm['clearThreshold']
                ? conditionForm['clearThreshold']
                : 0;
            } else if (conditionForm['notifyOnClear'] == false) {
              request_body['notifyOnClear'] = false;

              request_body['clearThreshold'] = 0;
            }
            let filter = [];
            conditionForm.weekDays.forEach((element) => {
              if (element['checked']) {
                let obj = {};
                obj['fromTime'] =
                  (element.dayFrom.getHours() < 10 ? '0' : '') +
                  element.dayFrom.getHours() +
                  ':' +
                  (element.dayFrom.getMinutes() < 10 ? '0' : '') +
                  element.dayFrom.getMinutes();
                obj['toTime'] =
                  (element.dayTo.getHours() < 10 ? '0' : '') +
                  element.dayTo.getHours() +
                  ':' +
                  (element.dayTo.getMinutes() < 10 ? '0' : '') +
                  element.dayTo.getMinutes();
                obj['daysOfWeek'] = element.short_name?.toUpperCase();

                filter.push(obj);
              }
            });
            request_body['schedule']['immediate'] = true;
            // if(filter.length > 0){
            request_body['filter'] = filter;
            // }
          } else {
            request_body['schedule']['immediate'] = false;
            request_body['schedule']['recurrencePattern'] = {};
            request_body['schedule']['type'] = conditionForm['recurrence'];
            if (conditionForm['recurrence'] == 'daily') {
              request_body['schedule']['recurrencePattern']['daily'] = {};
              let reqStartTime = new Date(
                conditionForm['scheduleStartTime']
              );
              request_body['schedule']['recurrencePattern']['daily']['startTime'] = (reqStartTime.getHours() < 10 ? '0' : '') +
                reqStartTime.getHours() +
                ':' +
                (reqStartTime.getMinutes() < 10 ? '0' : '') +
                reqStartTime.getMinutes();
            } else if (conditionForm['recurrence'] == 'weekly') {
              let weekly = conditionForm.weekDays
                .map((el) => {
                  if (el['scheduleWeeklyStatus']) {
                    if (el['short_name']) {
                      return el['short_name'].toUpperCase();
                    }
                  }
                })
                .filter((notUndefined) => notUndefined !== undefined);
              request_body['schedule']['recurrencePattern']['weekly'] = {};
              request_body['schedule']['recurrencePattern']['weekly']['days'] = weekly;
              let reqStartTime = new Date(
                conditionForm['scheduleStartTime']
              );
              request_body['schedule']['recurrencePattern']['weekly']['startTime'] = (reqStartTime.getHours() < 10 ? '0' : '') +
                reqStartTime.getHours() +
                ':' +
                (reqStartTime.getMinutes() < 10 ? '0' : '') +
                reqStartTime.getMinutes();
            } else if (conditionForm['recurrence'] == 'monthly') {
              request_body['schedule']['recurrencePattern']['monthly'] = {};
              request_body['schedule']['recurrencePattern']['monthly']['dayOfMonth'] = conditionForm['dayOfMonth'] ? conditionForm['dayOfMonth'] : 1;
              // new Date(
              //   conditionForm['scheduleStartTime']
              // ).getDate()
              let reqStartTime = new Date(
                conditionForm['scheduleStartTime']
              );
              request_body['schedule']['recurrencePattern']['monthly']['startTime'] = (reqStartTime.getHours() < 10 ? '0' : '') +
                reqStartTime.getHours() +
                ':' +
                (reqStartTime.getMinutes() < 10 ? '0' : '') +
                reqStartTime.getMinutes();
              // request_body['schedule']['recurrencePattern']['monthly'][
              // 'numberOfMonths'
              // ] = conditionForm['numberOfMonths'];
            }

            // request_body['schedule']['scheduleStartTime'] = new Date(
            //   conditionForm['scheduleStartTime']
            // ).getTime();
          }


        } else if (this.activeTab == 'notification') {
          // let scheduleForm = {
          //   ...this.notificationsData.notification.workFlowScheduleForm?.value,
          // };
          request_body = {
            // notes: this.isDev ? scheduleForm['notes'] : (scheduleForm['notes'] ? scheduleForm['notes'].replace(/\n/g, "<br />") : ''),
            // format : scheduleForm['mailFormat'] ? scheduleForm['mailFormat'].toUpperCase() : '',
            notes: this.notificationsData.notification.notes,
            emails:
              this.notificationsData.notification.mailRecepients && this.notificationsData.notification.mailRecepients.length > 0
                ? this.notificationsData.notification.mailRecepients.map((el) => {
                  return el
                })
                : [],
            sms: this.notificationsData.notification.sms,
            webhooks: this.notificationsData.notification.webhooks
          };
        }

        this.loading = true;
        this.btnDisabled = true;
        this.errorMsg = undefined;
        this.http
          .put(
            `${this.baseUrl}workflow/${this.notificationsData.workflowId}`,
            request_body, {
            responseType: 'text',
          })
          .subscribe(
            (res: any) => {
              if (res && res != '') {
                this.loading = false;
                this.success = true;
                setTimeout(() => {
                  this.btnDisabled = false;
                  this.success = false;
                }, 2000);
                this.successInfo = 'Successfully Saved';
                this.updateStepperCompleted(index);
              } else {
                this.loading = false;
                this.btnDisabled = false;
                this.errorMsg = this.language['Error'];
              }
            },
            (err: HttpErrorResponse) => {
              this.error = true;
              this.loading = false;
              this.btnDisabled = false;
              this.pageErrorHandle(err);
            }
          );
      }
    }
  }
  updateStepperCompleted(index) {
    this.notificationsData[this.activeTab.toLowerCase()].workFlowSaved = true;
    this.goToNextStepper(index);
  }
  goToNextStepper(index) {
    this.activeTab = this.alarmNotificationsSteppers[index].value;
    this.selectedTabIndex = index;
    this.isTabChange = !this.isTabChange;
    if (this.levelsPassed < index) {
      this.levelsPassed = index;
    }
  }
  getWorkflowData(event?) {
    this.loadEditable.next(true);
    this.http
      .get(
        `${this.baseUrl}workflow?workflowId=${this.notificationsData.workflowId}`
      )
      .subscribe(
        (data: any) => {
          if (data && Object.entries(data).length > 0) {
            this.notificationsData.workFlowData = JSON.parse(JSON.stringify(data));
            //Set Details page
            this.notificationsData['details'].workFlowSaved = true;
            this.levelsPassed = 1;
            const detailsForm = {
              ...this.notificationsData?.details?.workFlowDetailsForm?.controls,
            };
            if (detailsForm && Object.entries(detailsForm).length > 0) {
              detailsForm['name'].setValue(data['name']
                ? data['name']
                : detailsForm['name']?.value);
              detailsForm['description'].setValue(data['description']
                ? data['description']
                : detailsForm['description']?.value);
            }
            //Set Alarms page
            //Set group alarm
            if ((data.alarmGroups && data.alarmGroups.length > 0) || (data.transformAlarms && data.transformAlarms.length > 0) || (data.alarmNames && data.alarmNames.length > 0)) {
              this.notificationsData['alarms'].workFlowSaved = true;
              this.levelsPassed = 2;
            }
            if (this.notificationsData.alarms?.monitoredGroupAlarm?.data) {
              this.notificationsData.alarms.monitoredGroupAlarm.data = [];
            }
            if (this.notificationsData.alarms.groupAlarmData.data && this.notificationsData.alarms.groupAlarmData.data.length > 0) {
              this.notificationsData.alarms.groupAlarmData.data.forEach((element) => {
                element['isChecked'] = false;
                element['disabled'] = false;
                element['selectedAlready'] = false;
              });
            }
            if (data.alarmGroups && data.alarmGroups.length > 0) {
              data.alarmGroups.forEach((el) => {
                let alarmObj =
                  this.notificationsData.alarms.groupAlarmData.data.find(
                    // (alarm) => alarm.group_name == el
                    (alarm) => alarm.group_id == el
                  );
                if (alarmObj) {
                  delete alarmObj['isChecked'];
                  delete alarmObj['disabled'];
                  delete alarmObj['selectedAlready'];
                  this.notificationsData.alarms.monitoredGroupAlarm.data.push({
                    ...alarmObj,
                  });
                  alarmObj['isChecked'] = true;
                  alarmObj['disabled'] = true;
                  alarmObj['selectedAlready'] = true;
                }
              });
            }
            if (
              this.notificationsData.alarms?.monitoredGroupAlarm
                ?.rerenderSubject
            ) {
              this.notificationsData.alarms.monitoredGroupAlarm.rerenderSubject.next(
                true
              );
            }
            //Set transform alarm
            if (this.notificationsData.alarms?.monitoredTransformAlarm?.data) {
              this.notificationsData.alarms.monitoredTransformAlarm.data = [];
            }
            if (this.notificationsData.alarms.transformAlarmData.data && this.notificationsData.alarms.transformAlarmData.data.length > 0) {
              this.notificationsData.alarms.transformAlarmData.data.forEach((element) => {
                element['isChecked'] = false;
                element['disabled'] = false;
                element['selectedAlready'] = false;
              });
            }
            if (data.transformAlarms && data.transformAlarms.length > 0) {
              data.transformAlarms.forEach((el) => {
                let alarmObj =
                  this.notificationsData.alarms.transformAlarmData.data.find(
                    (alarm) => alarm.alarmRuleId == el
                    // (alarm) => alarm.group_name == el
                  );

                if (alarmObj) {
                  delete alarmObj['isChecked'];
                  delete alarmObj['disabled'];
                  delete alarmObj['selectedAlready'];
                  this.notificationsData.alarms.monitoredTransformAlarm.data.push(
                    { ...alarmObj }
                  );
                  alarmObj['isChecked'] = true;
                  alarmObj['disabled'] = true;
                  alarmObj['selectedAlready'] = true;
                }
              });
            }
            if (
              this.notificationsData.alarms?.monitoredTransformAlarm
                ?.rerenderSubject
            ) {
              this.notificationsData.alarms.monitoredTransformAlarm.rerenderSubject.next(
                true
              );
            }
            //Set individual alarm
            if (this.notificationsData.alarms?.monitoredIndividualAlarm?.data) {
              this.notificationsData.alarms.monitoredIndividualAlarm.data = [];
            }
            if (this.notificationsData.alarms.individualAlarmData.data && this.notificationsData.alarms.individualAlarmData.data.length > 0) {
              this.notificationsData.alarms.individualAlarmData.data.forEach((element) => {
                element['isChecked'] = false;
                element['disabled'] = false;
                element['selectedAlready'] = false;
              });
            }
            if (this.notificationsData?.alarms?.individualAlarmData?.searchCategory) {
              this.notificationsData.alarms.individualAlarmData.searchCategory = undefined;
              this.notificationsData.alarms.individualAlarmData.prevSearchCategory = undefined;
            }
            if (this.notificationsData?.alarms?.individualAlarmData?.searchSeverity) {
              this.notificationsData.alarms.individualAlarmData.searchSeverity = undefined;
              this.notificationsData.alarms.individualAlarmData.prevSearchSeverity = undefined;
            }
            if ((data.alarmNames && data.alarmNames.length > 0) || (data.transformAlarms && data.transformAlarms.length > 0)) {
              //mergeTransformAlarmsToIndividualAlarmschanges
              data.alarmNames = [...data.alarmNames, ...data.transformAlarms];
              this.notificationsData.alarms.monitoredTransformAlarm.data = [];
              data.alarmNames.forEach((el) => {
                let alarmObj =
                  this.notificationsData.alarms.individualAlarmData.data.find(
                    (alarm) => alarm.alarm_id == el
                    // (alarm) => alarm.alarm_name == el
                  );

                if (alarmObj) {
                  delete alarmObj['isChecked'];
                  delete alarmObj['disabled'];
                  delete alarmObj['selectedAlready'];
                  this.notificationsData.alarms.monitoredIndividualAlarm.data.push(
                    { ...alarmObj }
                  );
                  alarmObj['isChecked'] = true;
                  alarmObj['disabled'] = true;
                  alarmObj['selectedAlready'] = true;
                }
              });
              // if(data['workflowAlarmFilter'] && data['workflowAlarmFilter'] == 'CATEGORY'){
              //   this.notificationsData.alarms.individualAlarmData.categoryOrSeverity = 'CATEGORY';
              //   this.notificationsData.alarms.individualAlarmData.searchCategory = data['workflowAlarmFilterValues'] && data['workflowAlarmFilterValues'].length > 0?data['workflowAlarmFilterValues'][0] : '';
              //   this.notificationsData.alarms.individualAlarmData.prevSearchCategory = data['workflowAlarmFilterValues'] && data['workflowAlarmFilterValues'].length > 0?data['workflowAlarmFilterValues'][0] : '';
              // }else if(data['workflowAlarmFilter'] && data['workflowAlarmFilter'] == 'SEVERITY'){
              //   this.notificationsData.alarms.individualAlarmData.categoryOrSeverity = 'SEVERITY'
              //   this.notificationsData.alarms.individualAlarmData.searchSeverity = data['workflowAlarmFilterValues'] && data['workflowAlarmFilterValues'].length > 0?data['workflowAlarmFilterValues'][0] : '';
              //   this.notificationsData.alarms.individualAlarmData.prevSearchSeverity = data['workflowAlarmFilterValues'] && data['workflowAlarmFilterValues'].length > 0?data['workflowAlarmFilterValues'][0] : '';
              // }

            }
            if (
              this.notificationsData.alarms?.monitoredIndividualAlarm
                ?.rerenderSubject
            ) {
              this.notificationsData.alarms.monitoredIndividualAlarm.rerenderSubject.next(
                true
              );
            }

            setTimeout(() => {
              if (this.notificationsData.alarms.individualAlarmData) {
                this.notificationsData.alarms.individualAlarmData = {
                  ...this.notificationsData.alarms.individualAlarmData
                };
              }
            }, 500)
            this.calculateTotalMonitoredAlarms();
            this.setConditionPageData(data);
            this.loadEditable.next(false);
            // this.goToNextStepper(index);
          }
        },
        (error) => {
          this.loadEditable.next(false);
          this.error = true;
          this.pageErrorHandle(error);
        }
      );
  }
  async setConditionPageData(data) {
    //setDefaultWeekDays
    this.setDefaultWeekDays();
    if (data.region && data.region.length > 0) {
      data.region = this.notificationsData.conditions.regionsDataArray?.filter(region => data.region?.includes(region.id))?.map(el => el['id']);
      this.notificationsData['conditions'].workFlowSaved = true;
      this.levelsPassed = 3;
    }

    this.notificationsData['conditions'].workFlowStatus = data && data.status ? data.status : undefined;
    //Set Conditions data
    const conditionForm = {
      ...this.notificationsData?.conditions?.workFlowConditionsForm?.controls,
    };
    if (conditionForm && Object.entries(conditionForm).length > 0) {
      if (data.region && data.region.length > 0) {
        this.notificationsData.conditions.locationDataArray =
          await this.loadLocationValue(data.region);
        this.notificationsData.conditions.locationDataArray = this.issueService.appendFqn(this.notificationsData.conditions.locationDataArray);
        this.notificationsData.conditions.locationDataArray =
          this.notificationsData.conditions.locationDataArray.sort((a, b) =>
            (a['name'] || '')
              .toString()
              .localeCompare((b['name'] || '').toString(), 'en', {
                numeric: false,
              })
          );

        let mod_res = this.notificationsData.conditions.locationDataArray.map((el) => {
          let strings = el.fqn.split(','),
            regionFound = strings.find((el) => el.includes('REGION'));
          if (regionFound.split('=').length > 0) {
            el['region_name'] = regionFound.split('=')[1];
          }
          return el;
        });

        let counts = {};
        mod_res.forEach((x, parent_index) => {
          let duplicateObj = mod_res.find((el, i) => el.region_name == x.region_name && el.regionId != x.regionId && i != parent_index);
          if (duplicateObj) {
            counts[x.region_name] = (counts[x.region_name] || 0) + 1;
          }
        });

        mod_res.forEach((element, index) => {
          element['check_region_name'] = element.region_name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")";
          if (counts[element['region_name']] > 1) {
            element.region_name = element['check_region_name'];
          }
        });

        this.notificationsData.conditions.locationDataArray = [...mod_res];

        this.notificationsData.conditions.locationDataArray.unshift({
          name: 'All',
          id: 'All',
        });
        if (data.region.indexOf('11111111-1111-1111-1111-111111111111') == -1) {
          conditionForm['region'].setValue(data.region);
        } else {
          conditionForm['region'].setValue(['All']);
        }
      }
      data['location'] = this.notificationsData.conditions.locationDataArray?.filter(location => data.location?.includes(location.id))?.map(el => el['id']);
      if (data.location && data.location.length > 0) {
        if (
          data.location.indexOf('11111111-1111-1111-1111-111111111111') == -1
        ) {
          conditionForm['location'].setValue(data.location);
        } else {
          conditionForm['location'].setValue(['All']);
        }
      }

      conditionForm['duration'].setValue(1);
      conditionForm['soakTime'].setValue(0);
      conditionForm['raiseThreshold'].setValue(1);
      conditionForm['notifyOnClear'].setValue(false);
      conditionForm['clearThreshold'].setValue(0);
      conditionForm['recurrence'].setValue('daily');

      //default timezone
      let localeDate = new Date().toString().split(' '),
        gmtId =
          (localeDate[5] ? localeDate[5] : '') +
          ' ' +
          (localeDate[6] ? localeDate[6] : '') +
          ' ' +
          (localeDate[7] ? localeDate[7] : '') +
          ' ' +
          (localeDate[8] ? localeDate[8] : '');
      conditionForm['timezone'].setValue(gmtId);
      if (data.timezone && data.timezone != '') {
        conditionForm['timezone'].setValue(data.timezone);
      }

      // conditionForm['immediate'].setValue('true');
      // conditionForm['immediate'].setValue(data?.schedule?.immediate && data.schedule.immediate == true ? 'true' : (!this.notificationsData['conditions'].workFlowSaved?'true' : 'false'));

      conditionForm['immediate'].setValue(!data?.schedule ? 'true' : (data?.schedule?.immediate && data.schedule.immediate == true ? 'true' : (!this.notificationsData['conditions'].workFlowSaved ? 'true' : 'false')));


      if (data?.schedule?.immediate) {

        this.notificationsData.conditions.minClearThreshold =
          0;
        // this.notificationsData.conditions.minRaiseThreshold =
        //   data['clearThreshold'] ? Number(data.clearThreshold) + 1 : 1;

        if (data.duration && data.duration != '') {
          conditionForm['duration'].setValue(data.duration);
        }
        if ((data.soakTime && data.soakTime != '') || data.soakTime == 0) {
          conditionForm['soakTime'].setValue(data.soakTime);
          this.notificationsData.conditions.soakTime =
            data.soakTime;
        }
        if (data.raiseThreshold && data.raiseThreshold != '') {
          conditionForm['raiseThreshold'].setValue(data.raiseThreshold);
          this.notificationsData.conditions.minClearThreshold =
            data.raiseThreshold;
          // this.notificationsData.conditions.minRaiseThreshold =
          //   data['clearThreshold'] ? Number(data.clearThreshold) + 1 : 1;
        }

        if (data && data.soakTime != undefined && data.soakTime != null && data.soakTime > 0) {
          conditionForm['notifyOnClear'].setValue(true);
          conditionForm['clearThreshold'].setValue(
            data?.clearThreshold ? data.clearThreshold : 0
          );
        } else if (data && data.soakTime != undefined && data.soakTime != null && data.soakTime == 0) {
          conditionForm['notifyOnClear'].setValue(
            data?.notifyOnClear == true ? true : false
          );
          conditionForm['clearThreshold'].setValue(
            data?.clearThreshold ? data.clearThreshold : 0
          );
        }

        if (data?.filter && data.filter.length > 0) {
          if (conditionForm['weekDays']?.value && conditionForm['weekDays']['value']?.length > 0) {
            data.filter.forEach((element) => {
              let weekDaysObj = conditionForm.weekDays.value.findIndex(
                (el) =>
                  el['short_name']?.toLowerCase() ==
                  element['daysOfWeek']?.toLowerCase()
              );

              if (weekDaysObj >= 0) {
                let dayFromTime = new Date(),
                  dayToTime = new Date();
                let dayFromSplit = element['fromTime'].split(':'),
                  dayToSplit = element['toTime'].split(':');
                dayFromTime.setHours(dayFromSplit[0]);
                dayFromTime.setMinutes(dayFromSplit[1]);
                dayToTime.setHours(dayToSplit[0]);
                dayToTime.setMinutes(dayToSplit[1]);
                // weekDaysObj['dayFrom'] = dayFromTime;
                // weekDaysObj['dayTo'] = dayToTime;
                conditionForm.weekDays.controls[weekDaysObj].controls['dayFrom'].setValue(dayFromTime);
                conditionForm.weekDays.controls[weekDaysObj].controls['dayTo'].setValue(dayToTime);
                conditionForm.weekDays.controls[weekDaysObj].controls['checked'].setValue(true);
              }
            });
          }
        }
      }
      else {
        let startTime = new Date();


        if (data?.schedule?.type == 'daily') {
          if (
            data?.schedule?.recurrencePattern?.daily?.startTime
          ) {
            let startTimeSplit = data.schedule.recurrencePattern.daily.startTime.split(':');
            startTime.setHours(startTimeSplit[0]);
            startTime.setMinutes(startTimeSplit[1]);
          }
          if (
            data?.schedule?.recurrencePattern?.daily?.startTime
          ) {
            conditionForm['scheduleStartTime'].setValue(startTime);
          }
          conditionForm['recurrence'].setValue('daily');
        } else if (
          data?.schedule?.type == 'weekly' &&
          data?.schedule?.recurrencePattern?.weekly?.days &&
          data.schedule.recurrencePattern.weekly.days.length > 0
        ) {
          if (
            data?.schedule?.recurrencePattern?.weekly?.startTime
          ) {
            let startTimeSplit = data.schedule.recurrencePattern.weekly.startTime.split(':');
            startTime.setHours(startTimeSplit[0]);
            startTime.setMinutes(startTimeSplit[1]);
          }
          conditionForm['scheduleStartTime'].setValue(startTime);
          if (conditionForm['weekDays']?.value && conditionForm['weekDays']['value']?.length > 0) {
            conditionForm['recurrence'].setValue('weekly');
            conditionForm.weekDays.value.forEach((el, index) => {
              if (el && el != '') {
                if (
                  data.schedule.recurrencePattern.weekly.days.findIndex(
                    (ele) => ele?.toLowerCase() == el.short_name?.toLowerCase()
                  ) != -1
                ) {
                  conditionForm.weekDays.controls[index].controls['scheduleWeeklyStatus'].setValue(true);
                  // el['scheduleWeeklyStatus'] = true;
                } else {
                  conditionForm.weekDays.controls[index].controls['scheduleWeeklyStatus'].setValue(false);
                  // el['scheduleWeeklyStatus'] = false;
                }
              }
            });
            if (this.notificationsData.conditions.weekDays && this.notificationsData?.conditions?.weekDays?.length > 0) {
              this.notificationsData.conditions.weekDays.forEach((el, index) => {
                if (el && el != '') {
                  if (
                    data.schedule.recurrencePattern.weekly.days.findIndex(
                      (ele) => ele?.toLowerCase() == el.short_name?.toLowerCase()
                    ) != -1
                  ) {
                    el['scheduleWeeklyStatus'] = true;
                  } else {
                    el['scheduleWeeklyStatus'] = false;
                  }
                }
              });
            }

          }
        } else if (
          data?.schedule?.type == 'monthly' &&
          data?.schedule?.recurrencePattern?.monthly?.dayOfMonth &&
          data.schedule.recurrencePattern.monthly.dayOfMonth >= 0
        ) {
          if (
            data?.schedule?.recurrencePattern?.monthly?.startTime
          ) {
            let startTimeSplit = data.schedule.recurrencePattern.monthly.startTime.split(':');
            startTime.setHours(startTimeSplit[0]);
            startTime.setMinutes(startTimeSplit[1]);
            // startTime.setDate(data.schedule.recurrencePattern.monthly.dayOfMonth);
            conditionForm['scheduleStartTime'].setValue(startTime);
          }
          conditionForm['recurrence'].setValue('monthly');
          conditionForm['dayOfMonth'].setValue(data.schedule.recurrencePattern.monthly.dayOfMonth);
          // conditionForm['numberOfMonths'].setValue(data.schedule.recurrencePattern.monthly.numberOfMonths);
        }


      }
    }
    this.setNotificationsPageData(data);
  }
  setNotificationsPageData(data) {
    if (data?.emails?.length || data?.sms?.length || data?.webhooks?.length) {

      this.notificationsData['notification'].workFlowSaved = true;
      this.notificationsData['summary'].workFlowSaved = true;
      this.levelsPassed = 5;
    }
    // //setDefaultWeekDays
    // this.setDefaultWeekDays();
    const scheduleForm = {
      ...this.notificationsData.notification.workFlowScheduleForm?.controls,
    };
    if (scheduleForm && Object.entries(scheduleForm).length > 0) {
      scheduleForm['notes'].setValue('');
      // scheduleForm['mailFormat'].setValue('');
      // if (data.format && data.format != '') {
      //   // let patternRegex = /<br\s*[\/]?>/gi;
      //   // let newline = "\n";
      //   // if(this.isDev){
      //     scheduleForm['mailFormat'].setValue(data.format.toLowerCase());
      //   // }else{
      //   //   scheduleForm['notes'].setValue(data.notes.replaceAll(patternRegex, newline));
      //   // }

      // }
      if (data.notes && data.notes != '') {
        // let patternRegex = /<br\s*[\/]?>/gi;
        // let newline = "\n";
        // if(this.isDev){
        scheduleForm['notes'].setValue(data.notes);
        // }else{
        //   scheduleForm['notes'].setValue(data.notes.replaceAll(patternRegex, newline));
        // }

      }
      if (data.emails && data.emails.length > 0) {
        this.notificationsData.notification.mailRecepients = [...data.emails];
        // scheduleForm['emails'].setValue(data.emails.map((el) => {
        //   let obj = {};
        //   obj['display'] = el;
        //   obj['value'] = el;
        //   return obj;
        // }));
      } else {
        this.notificationsData.notification.mailRecepients = [];
      }

      if (data?.sms?.length) {
        this.notificationsData.notification.sms = [...data.sms];
        this.notificationsData.notification.isConsentMsgSmsPopupAccepted = true;
        this.notificationsData.notification.isLoadConsentMsgSmsPopupApplicable = false;

      } else {
        this.notificationsData.notification.sms = [];
      }

      if (data?.webhooks?.length) {
        this.notificationsData.notification.webhooks = [...data.webhooks];
      } else {
        this.notificationsData.notification.webhooks = [];
      }

      this.notificationsData.notification.notes = data?.notes;


    }

  }
  setDefaultWeekDays() {
    let maxTime = new Date();
    maxTime.setHours(23);
    maxTime.setMinutes(58);
    maxTime.setSeconds(0);
    this.notificationsData.conditions.weekDays = [
      {
        name: 'Monday',
        short_name: 'Mon',
        value: 'monday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'M',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Tuesday',
        short_name: 'Tue',
        value: 'tuesday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'T',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Wednesday',
        short_name: 'Wed',
        value: 'wednesday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'W',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Thursday',
        short_name: 'Thu',
        value: 'thursday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'Th',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Friday',
        short_name: 'Fri',
        value: 'friday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'F',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Saturday',
        short_name: 'Sat',
        value: 'saturday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'Sat',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
      {
        name: 'Sunday',
        short_name: 'Sun',
        value: 'sunday',
        dayFrom: '',
        dayTo: '',
        scheduleWeekly: 'Sun',
        defaultTime: '',
        minTime: '',
        maxTime: maxTime
      },
    ];
    this.patchNotificationFormValue();
  }
  loadLocationValue(regions: any) {
    if (
      regions &&
      regions != ['All'] &&
      regions != ['11111111-1111-1111-1111-111111111111'] &&
      regions.length > 0
    ) {
      let regionQuery = '';
      regions.forEach((element) => {
        if (
          element == 'All' ||
          element == '11111111-1111-1111-1111-111111111111'
        ) {
          return;
        }
        regionQuery += `&region=${element}`;
      });
      if (regionQuery != '') {
        return this.http
          .get(
            `${environment.API_BASE_URL
            }nfa/locations?tenant=0${regionQuery}`
          )
          .toPromise();
      } else {
        return [];
      }
    }
  }
  calculateTotalMonitoredAlarms() {
    let groupAlarms = this.notificationsData.alarms.monitoredGroupAlarm.data.reduce((acc, curr) => { return acc + Number(curr['no_of_alarms']) }, 0);
    this.notificationsData.alarms.totMonitoredAlarms =
      this.notificationsData.alarms.monitoredIndividualAlarm.data.length +
      groupAlarms +
      this.notificationsData.alarms.monitoredTransformAlarm.data.length;
  }
  onCloseError() {
    this.errorMsg = undefined;
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  pauseContinueWorkflow(type) {
    let query = `workflowId=${this.notificationsData.workflowId}`;
    let searchText = history?.state?.ccoAlarmNotificationsText;
    if (type == 'pause') {
      query = query.concat(`&status=PAUSE`)
    } else if (type == 'activate') {
      query = query.concat(`&status=RUN`)
    }

    this.loading = true;
    this.btnDisabled = true;
    this.errorMsg = undefined;
    this.successInfo = undefined;
    this.http
      .put(
        `${this.baseUrl}deployWorkflow?${query}`, null, {
        responseType: 'text',
      }).subscribe(
        (res: any) => {
          if (res == 'Workflow successfully deployed' || res == 'Workflow successfully deployed!') {
            this.success = true;
            this.successInfo = 'Alarm Notification Schedule successfully deployed';
            setTimeout(() => {
              this.success = false;
              this.loading = false;
              this.btnDisabled = false;
              this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications`, { state: { ccoAlarmNotificationsText: searchText || '' } });
            }, 3000);
          } else if (res == 'Workflow successfully paused' || res == 'Workflow successfully paused!') {
            this.success = true;
            this.loading = false;
            this.btnDisabled = false;
            this.successInfo = 'Alarm Notification Schedule successfully paused';
            setTimeout(() => {
              this.success = false;
              this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications`, { state: { ccoAlarmNotificationsText: searchText || '' } });
            }, 3000);
          } else {
            this.error = true;
            this.loading = false;
            this.btnDisabled = false;
            this.errorInfo = "Something went wrong";
          }

        },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
          this.btnDisabled = false;
          this.pageErrorHandle(err);
        }
      );

  }
  goToListView() {
    let searchText = history?.state?.ccoAlarmNotificationsText;
    this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications`, { state: { ccoAlarmNotificationsText: searchText || '' } });
  }

  getErrorMsg(msg?) {
    if (!msg) {
      this.errorMsg = undefined;
      return;
    }
    this.errorMsg = msg;
    this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    // if (this.scheduleFormSubmit) this.scheduleFormSubmit.unsubscribe();
    // if (this.conditionFormSubmit) this.conditionFormSubmit.unsubscribe();
  }
}
