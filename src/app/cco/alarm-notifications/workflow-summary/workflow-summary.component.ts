import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AlarmNotificationsApisService } from '../services/alarm-notifications-apis.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { AlarmNotificationsTimezoneService } from '../services/alarm-notifications-timezone.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { IssueService } from '../../issues/service/issue.service';

@Component({
  selector: 'app-workflow-summary',
  templateUrl: './workflow-summary.component.html',
  styleUrls: ['./workflow-summary.component.scss'],
})
export class WorkflowSummaryComponent implements OnInit {
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  language: any;
  error: boolean;
  isDev: boolean = false;
  loading: boolean = false;
  languageSubject: Subscription;
  workFlowSummaryForm: FormGroup;
  _workFlowSummaryData: any = {
    name: '',
    notification: {
      mailRecepients: []
    }
  };
  conditionForm: any = {
    raiseThreshold: 0,
    soakTime: 0,
    duration: 0,
    weekDays: []
  };
  workFlowDetails: any;
  scheduleForm: any = {
    weekDays: []
  };
  alarmsForm: any = {
    monitoredIndividualAlarm: {
      data: []
    },
    monitoredGroupAlarm: {
      data: []
    },
    monitoredTransformAlarm: {
      data: []
    }
  };
  weekNames = [
    {
      name: 'MONDAY',
      short_name: 'Mon',
    },
    {
      name: 'TUESDAY',
      short_name: 'Tue',
    },
    {
      name: 'WEDNESDAY',
      short_name: 'Wed',
    },
    {
      name: 'THURSDAY',
      short_name: 'Thu',
    },
    {
      name: 'FRIDAY',
      short_name: 'Fri',
    },
    {
      name: 'SATURDAY',
      short_name: 'Sat',
    },
    {
      name: 'SUNDAY',
      short_name: 'Sun',
    }
  ]
  errorInfo: string = '';
  @Output() getWorkFlowAPIEmitter = new EventEmitter();
  notificationId: any;
  tempConditionForm: FormGroup;
  timezones: any;
  categorySubgroupsAlarms = [];
  categorySubgroupsName = '';
  recepientsInfo: any = {};
  @Input()
  set workFlowSummaryData(value: any) {
    this._workFlowSummaryData = value;
    console.log(value);
    this.recepientsInfo = {
      emailRecipients: value?.notification?.mailRecepients,
      emailNotes: value?.notification?.notes,
      sms: value?.notification?.sms,
      webhooks: value?.notification?.webhooks,
    }
  }
  get workFlowSummaryData() {
    return this._workFlowSummaryData;
  }
  notificationsData: any = {
    alarms: {
      groupAlarmData: {
        data: [],
      },
      individualAlarmData: {
        data: [],
        categoryList: [],
      },
      transformAlarmData: {
        data: [],
      },
      monitoredIndividualAlarm: {
        data: [],
        categoryList: [],
      },
      monitoredGroupAlarm: {
        data: [],
      },
      monitoredTransformAlarm: {
        data: [],
      },
    },
    conditions: {
      regionsDataArray: ['All'],
      locationDataArray: ['All'],
    },
  };
  constructor(
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private apiPreDataSevice: AlarmNotificationsApisService,
    public ssoService: SsoAuthService,
    private formBuilder: FormBuilder,
    private utils: AlarmNotificationsTimezoneService,
    private dateUtils: DateUtilsService,
    private titleService: Title,
    private issueService: IssueService
  ) {
    this.titleService.setTitle('Alarm Notifications - Email Notifications - Network Operations - Operations - Operations - Calix Cloud');
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.notificationId = params['notificationId']
        ? params.notificationId
        : '';
    });
    this.timezones = this.utils.getTimeZones();
    let localeDate = new Date().toString()?.split(' '),
      gmtId =
        (localeDate[5] ? localeDate[5] : '') +
        ' ' +
        (localeDate[6] ? localeDate[6] : '') +
        ' ' +
        (localeDate[7] ? localeDate[7] : '') +
        ' ' +
        (localeDate[8] ? localeDate[8] : '');
    let localTimeZone = this.dateUtils.getLocalTimeZoneName();
    let findTZ = this.timezones.find((zone) => zone.name == localTimeZone);
    if (findTZ) {
      //this.timezone = localTimeZone;
    } else {
      this.timezones.push({
        id: gmtId,
        name: localTimeZone,
      });
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        if (this.notificationId != '') {
          this.loading = true;
          this.tempConditionForm = this.formBuilder.group({
            region: ['', Validators.required],
            location: ['', Validators.required],
          });
          this.callMultipleAPI();
        } else {
          this.setSummaryData();
        }
      }
    );
    if (this.notificationId != '') {
      this.loading = true;
      this.tempConditionForm = this.formBuilder.group({
        region: ['', Validators.required],
        region_name: [[]],
        location: ['', Validators.required],
        location_name: [[]],
      });
      this.callMultipleAPI();
    } else {
      this.setSummaryData();
    }
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
      this.regionsApiLoader(),
    ]);
    this.mergeAlarmRules();
    if (this.notificationId != '') {
      this.getSummaryData();
    }
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
    });
  }
  getIndividualAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getIndividualAlarmData().then((data) => {
        this.notificationsData['alarms']['individualAlarmData']['data'] = [...data];
        this.notificationsData['alarms']['individualAlarmData'] = {
          ...this.notificationsData['alarms']['individualAlarmData'],
        };
        resolve();
      });
    });
  }
  getGroupAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getGroupAlarmData().then((data) => {
        this.notificationsData['alarms']['groupAlarmData']['data'] = [...data];
        this.notificationsData['alarms']['groupAlarmData'] = {
          ...this.notificationsData['alarms']['groupAlarmData'],
        };
        resolve();
      });
    });
  }
  getTransformAlarmData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.getTransformAlarmData().then((data) => {
        this.notificationsData['alarms']['transformAlarmData']['data'] = [...data];
        this.notificationsData['alarms']['transformAlarmData'] = {
          ...this.notificationsData['alarms']['transformAlarmData'],
        };
        resolve();
      });
    });
  }
  regionsApiLoader(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiPreDataSevice.regionsApiLoader().then((data) => {
        this.notificationsData['conditions']['regionsDataArray'] = [
          ...this.notificationsData['conditions']['regionsDataArray'],
          ...data,
        ];
        resolve();
      });
    });
  }
  // async callMultipleAPI(){
  //   //Call Get workflow API in alarm Notification page
  //   this.getWorkFlowAPIEmitter.emit(true);
  // }
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
  setSummaryData() {
    this.conditionForm = {
      ...this.workFlowSummaryData?.conditions?.workFlowConditionsForm?.value,
    };
    this.scheduleForm = {
      ...this.workFlowSummaryData?.notification?.workFlowScheduleForm?.value,
    };
    if (this.scheduleForm && this.scheduleForm?.notes == '') {
      this.scheduleForm['notes'] = '-';
    }
    this.scheduleForm['notes'] = this.scheduleForm['notes']?.split('\n');
    // ? this.scheduleForm['notes'].replace(/\n/g, "<br />") : '';

    // this.scheduleForm['email_format'] = this.scheduleForm['mailFormat']? this.scheduleForm['mailFormat'].toUpperCase() : '';


    this.scheduleForm['totalMail'] =
      this.workFlowSummaryData?.notification?.mailRecepients &&
        this.workFlowSummaryData.notification.mailRecepients.length > 0
        ? this.workFlowSummaryData.notification.mailRecepients.length
        : 0;
    this.alarmsForm = { ...this.workFlowSummaryData?.alarms };
    this.workFlowDetails = { ...this.workFlowSummaryData?.details };

    if (
      this.conditionForm['immediate'] &&
      this.conditionForm['immediate'] == 'true'
    ) {
      this.conditionForm['trigger'] = `Immediate`;
      let findTZ = this.timezones.find((zone) => zone.id == this.conditionForm['timezone']);
      this.conditionForm['exclusions_timezone'] = '';
      if (findTZ) {
        this.conditionForm['exclusions_timezone'] = findTZ['id'];
      }
    } else {
      let time = new Date(this.conditionForm['scheduleStartTime'])
      // .toLocaleTimeString([], {
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   hour12: true
      // })
      // .toUpperCase();
      // let h =  time.getHours(), m = time.getMinutes();
      // let startTime = '';
      // if (h == 12) {
      //   startTime = h + ":" + m + " PM";
      // } else {
      //   startTime = h > 12
      //   ? (h - 12) + ":" + m + " PM"
      //   : h == 0
      //   ? "12" + ":" + m + " AM"
      //   : h + ":" + m + " AM";
      // }
      if (this.conditionForm['recurrence'] == 'daily') {
        // let triggertime = new Date(this.conditionForm['scheduleStartTime']);
        // let triggerAt = triggertime.toLocaleDateString() + " " + triggertime.toLocaleTimeString();
        this.conditionForm['trigger'] = this.language.recurr_everyday(moment(time).format('hh:mm A'));
      } else if (this.conditionForm['recurrence'] == 'weekly') {
        let triggerDays = '';
        if (
          this.conditionForm['weekDays'] &&
          this.conditionForm['weekDays'].length > 0
        ) {
          this.conditionForm['weekDays']
            .filter((el) => el.scheduleWeeklyStatus)
            .forEach((element, index) => {
              if (
                index ==
                this.conditionForm['weekDays'].filter(
                  (el) => el.scheduleWeeklyStatus
                ).length -
                1
              ) {
                triggerDays = triggerDays.slice(0, -2);
                if (this.conditionForm['weekDays'].filter(
                  (el) => el.scheduleWeeklyStatus
                ).length == 1) {
                  triggerDays += element.short_name;
                } else {
                  triggerDays += ' and ' + element.short_name;
                }
              } else {
                triggerDays += element.short_name + ', ';
              }
            });
        }
        this.conditionForm['trigger'] = this.language.recurr_everyweek(triggerDays, moment(time).format('hh:mm A'));
      } else if (this.conditionForm['recurrence'] == 'monthly') {
        this.conditionForm[
          'trigger'
        ] = this.language.recurr_month(this.getNumberWithOrdinal(Number(this.conditionForm['dayOfMonth'])), moment(time).format('hh:mm A'));
      }
    }

    this.conditionForm['regionsLocations'] = [];
    this.conditionForm['regionsLocationsLength'] = 0;
    if (
      this.conditionForm.location &&
      (this.conditionForm.location.length == 0 || (this.conditionForm.location.length == 1 && this.conditionForm.location.findIndex(el => el == 'All') == 0)) &&
      this.conditionForm.region &&
      this.conditionForm.region.length > 0
    ) {
      this.conditionForm['regionsLocations'] = this.workFlowSummaryData.conditions.regionsDataArray.filter((el) => this.conditionForm.region.indexOf(el['id']) != -1).map((element) => {
        element['region_name'] = element['name'];
        element['noLocation'] = true;
        return element;
      });
      this.conditionForm['regionsLocations'] = this.groupByKey(this.conditionForm['regionsLocations'], 'region_name');
      this.conditionForm['regionsLocationsLength'] = Object.keys(this.conditionForm['regionsLocations']).length
    } else if (
      this.conditionForm.location &&
      this.conditionForm.location.length > 0
    ) {
      let regions = this.workFlowSummaryData.conditions.regionsDataArray.filter((el) => this.conditionForm.region.indexOf(el['id']) != -1).map((element) => {
        element['region_name'] = element['name'];
        delete element['delete'];
        return element;
      }),
        locations = this.workFlowSummaryData.conditions.locationDataArray.filter((el) => this.conditionForm.location.indexOf(el['id']) != -1).map((element) => {
          element['location_name'] = element['name'];
          delete element['delete'];
          return element;
        });
      this.conditionForm['regionsLocations'] = [...regions, ...locations];
      this.conditionForm["regionsLocations"].forEach((el) => {
        if (el["location_name"] && el["location_name"] != "") {
          let regionObj = this.conditionForm["regionsLocations"].find(
            (e) => e["check_region_name"] == el["check_region_name"]
          );
          if (regionObj) {
            regionObj["delete"] = true;
          }
        }
      });
      this.conditionForm['regionsLocations'] = this.conditionForm['regionsLocations'].filter((el) => !el['delete']).map((e) => {
        if (!e['location_name']) {
          e['noLocation'] = true;
        }
        return e;
      });

      this.conditionForm['regionsLocations'] = this.groupByKey(this.conditionForm['regionsLocations'], 'region_name');
      this.conditionForm['regionsLocationsLength'] = Object.keys(this.conditionForm['regionsLocations']).length
    }
    if (this.conditionForm && this.conditionForm['weekDays'] && this.conditionForm['weekDays'].length > 0) {
      this.conditionForm.weekDays = this.conditionForm.weekDays.filter(
        (el) => el.checked == true
      );
      this.conditionForm.weekDays.forEach((el) => {
        el['exclusions'] = this.language.exclusions_days(el['short_name'], this.changeTimeFormat(
          el['dayFrom']
        ), this.changeTimeFormat(el['dayTo']));

        // el['exclusions'] = `Every ${el['name']} ${this.changeTimeFormat(
        //   el.dayFrom
        // )} to ${this.changeTimeFormat(el.dayTo)}`;
      });
    }
  }
  changeTimeFormat(date) {
    if (date != '') {
      var dateObj = new Date(date);
      var convertedTime = dateObj.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return convertedTime;
    }
    return '';
  }

  getSummaryData() {
    this.http
      .get(`${this.baseUrl}workflow?workflowId=${this.notificationId}`)
      .subscribe(
        async (data: any) => {
          this.recepientsInfo = {
            emailRecipients: data?.emails,
            emailNotes: data?.notes,
            sms: data?.sms,
            webhooks: data?.webhooks,
          }
          if (data && Object.entries(data).length > 0) {
            this.workFlowSummaryData.notification.name = data['name'];

            this.scheduleForm['totalMail'] =
              data.emails && data.emails.length > 0 ? data.emails.length : 0;

            this.alarmsForm['monitoredIndividualAlarm'] = {
              data: [],
            };
            this.alarmsForm['monitoredGroupAlarm'] = {
              data: [],
            };
            this.alarmsForm['monitoredTransformAlarm'] = {
              data: [],
            };

            if ((data.alarmNames && data.alarmNames.length > 0) || (data.transformAlarms && data.transformAlarms.length > 0)) {
              data.alarmNames = [...data.alarmNames, ...data.transformAlarms];
              this.notificationsData.alarms.monitoredTransformAlarm.data = [];

              data.alarmNames.forEach((element) => {
                let obj =
                  this.notificationsData.alarms.individualAlarmData.data.find(
                    (el) => element == el.alarm_id
                  );
                if (obj) {
                  this.alarmsForm['monitoredIndividualAlarm'].data.push(obj);
                }
              });
            }
            if (data.alarmGroups && data.alarmGroups.length > 0) {
              data.alarmGroups.forEach((element) => {
                let obj =
                  this.notificationsData.alarms.groupAlarmData.data.find(
                    (el) => element == el.group_id
                  );
                if (obj) {
                  this.alarmsForm['monitoredGroupAlarm'].data.push(obj);
                }
              });
            }

            let groupAlarms = this.alarmsForm.monitoredGroupAlarm.data.reduce((acc, curr) => { return acc + Number(curr['no_of_alarms']) }, 0);

            if (data.transformAlarms && data.transformAlarms.length > 0) {
              data.transformAlarms.forEach((element) => {
                let obj =
                  this.notificationsData.alarms.transformAlarmData.data.find(
                    (el) => element == el.alarmRuleId
                  );
                if (obj) {
                  this.alarmsForm['monitoredTransformAlarm'].data.push(obj);
                }
              });
            }

            this.alarmsForm['totMonitoredAlarms'] =
              groupAlarms +
              data.alarmNames.length;
            // + data.transformAlarms.length;

            if (data && (data?.notes == '' || data?.notes == null)) {
              data['notes'] = '-';
            }
            this.scheduleForm['notes'] = data['notes']?.split('\n');
            // ? data['notes'].replace(/\n/g, "<br />") : '';
            // this.scheduleForm['email_format'] = data['format']? data['format'].toUpperCase() : '';

            this.workFlowSummaryData.notification.mailRecepients = data['emails'] && data['emails'].length > 0 ? data['emails'] : [];

            // region location

            const conditionForm = {
              ...this.tempConditionForm?.controls,
            };

            data.region = this.notificationsData.conditions.regionsDataArray?.filter(region => data.region?.includes(region.id))?.map(el => el['id']);
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
                let strings = el?.fqn?.split(','),
                  regionFound = strings.find((el) => el.includes('REGION'));
                if (regionFound?.split('=').length > 0) {
                  el['region_name'] = regionFound?.split('=')[1];
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
                element['check_region_name'] = element.region_name + " (" + element.fqn?.split('=')[1]?.split(',')[0] + ")";
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
            if (data && data['location'] && data['location']['length'] > 0) {
              if (
                data.location.indexOf('11111111-1111-1111-1111-111111111111') == -1
              ) {
                conditionForm['location'].setValue(data.location);
              } else {
                conditionForm['location'].setValue(['All']);
              }
            } else {
              conditionForm['location'].setValue(['All']);
            }

            this.conditionForm = {
              ...this.tempConditionForm?.value,
            };

            this.conditionForm['regionsLocations'] = [];
            this.conditionForm['regionsLocationsLength'] = 0;
            if (
              this.conditionForm.location &&
              (this.conditionForm.location.length == 0 || (this.conditionForm.location.length == 1 && this.conditionForm.location.findIndex(el => el == 'All') == 0)) &&
              this.conditionForm.region &&
              this.conditionForm.region.length > 0
            ) {
              this.conditionForm['regionsLocations'] = this.notificationsData.conditions.regionsDataArray.filter((el) => this.conditionForm.region.indexOf(el['id']) != -1).map((element) => {
                element['region_name'] = element['name'];
                element['noLocation'] = true;
                return element;
              });
              this.conditionForm['regionsLocations'] = this.groupByKey(this.conditionForm['regionsLocations'], 'region_name');
              this.conditionForm['regionsLocationsLength'] = Object.keys(this.conditionForm['regionsLocations']).length
            } else if (
              this.conditionForm.location &&
              this.conditionForm.location.length > 0
            ) {
              let regions = this.notificationsData.conditions.regionsDataArray.filter((el) => this.conditionForm.region.indexOf(el['id']) != -1).map((element) => {
                element['region_name'] = element['name'];
                delete element['delete'];
                return element;
              }),
                locations = this.notificationsData.conditions.locationDataArray.filter((el) => this.conditionForm.location.indexOf(el['id']) != -1).map((element) => {
                  element['location_name'] = element['name'];
                  delete element['delete'];
                  return element;
                });
              this.conditionForm['regionsLocations'] = [...regions, ...locations];
              this.conditionForm["regionsLocations"].forEach((el) => {
                if (el["location_name"] && el["location_name"] != "") {
                  let regionObj = this.conditionForm["regionsLocations"].find(
                    (e) => e["check_region_name"] == el["check_region_name"]
                  );
                  if (regionObj) {
                    regionObj["delete"] = true;
                  }
                }
              });
              this.conditionForm['regionsLocations'] = this.conditionForm['regionsLocations'].filter((el) => !el['delete']).map((e) => {
                if (!e['location_name']) {
                  e['noLocation'] = true;
                }
                return e;
              });

              this.conditionForm['regionsLocations'] = this.groupByKey(this.conditionForm['regionsLocations'], 'region_name');
              this.conditionForm['regionsLocationsLength'] = Object.keys(this.conditionForm['regionsLocations']).length
            }

            if (data?.schedule?.immediate && data.schedule.immediate == true) {
              this.conditionForm['trigger'] = `Immediate`;
              this.conditionForm['immediate'] = 'true';
              let findTZ = this.timezones.find((zone) => zone.id == data['timezone']);
              this.conditionForm['exclusions_timezone'] = '';
              if (findTZ) {
                this.conditionForm['exclusions_timezone'] = findTZ['id'];
              }

              this.conditionForm['clearThreshold'] = data['clearThreshold'] ? data['clearThreshold'] : 0;
              this.conditionForm['notifyOnClear'] = data['notifyOnClear'] ? data['notifyOnClear'] : false;

              this.conditionForm['raiseThreshold'] = data['raiseThreshold'] ? data['raiseThreshold'] : 0;
              this.conditionForm['duration'] = data['duration'] ? data['duration'] : 0;
              this.conditionForm['soakTime'] = data['soakTime'] ? data['soakTime'] : 0;

              if (data.filter.length > 0 && data.filter) {
                this.conditionForm.weekDays = data.filter;
                this.conditionForm.weekDays.forEach((el) => {

                  let dayFromTime = new Date(),
                    dayToTime = new Date();
                  let dayFromSplit = el['fromTime']?.split(':'),
                    dayToSplit = el['toTime']?.split(':');
                  dayFromTime.setHours(dayFromSplit[0]);
                  dayFromTime.setMinutes(dayFromSplit[1]);
                  dayToTime.setHours(dayToSplit[0]);
                  dayToTime.setMinutes(dayToSplit[1]);
                  let dayOfWeek = this.weekNames.find(ele => ele['short_name'].toLowerCase() == el['daysOfWeek'].toLowerCase());
                  if (dayOfWeek) {
                    el['exclusions'] = this.language.exclusions_days(dayOfWeek['short_name'], this.changeTimeFormat(
                      dayFromTime
                    ), this.changeTimeFormat(dayToTime));
                  }
                  // el['daysOfWeek'] = el['daysOfWeek'].toLowerCase();
                  // el['daysOfWeek'] = el['daysOfWeek'][0].toUpperCase() + el['daysOfWeek'].slice(1)
                  // el['exclusions'] = `Every ${el['daysOfWeek']} ${this.changeTimeFormat(
                  //   dayFromTime
                  // )} to ${this.changeTimeFormat(dayToTime)}`;

                });
              }

            }
            // recurrence
            else {
              let startTime = new Date();
              this.conditionForm['immediate'] = 'false'
              if (data?.schedule?.type && data.schedule.type == 'daily') {
                if (
                  data?.schedule?.recurrencePattern?.daily?.startTime
                ) {
                  let startTimeSplit = data.schedule.recurrencePattern.daily.startTime?.split(':');
                  startTime.setHours(startTimeSplit[0]);
                  startTime.setMinutes(startTimeSplit[1]);
                }
                let time = new Date(startTime)
                // .toLocaleTimeString([], {
                //   hour: '2-digit',
                //   minute: '2-digit',
                //   hour12: true
                // })
                // .toUpperCase();
                // let h =  time.getHours(), m = time.getMinutes();
                // let scheduleStartTime = '';
                // if (h == 12) {
                //   scheduleStartTime = h + ":" + m + " PM";
                // } else {
                //   scheduleStartTime = h > 12
                //   ? (h - 12) + ":" + m + " PM"
                //   : h == 0
                //   ? "12" + ":" + m + " AM"
                //   : h + ":" + m + " AM";
                // }
                // let triggertime = new Date(this.conditionForm['scheduleStartTime']);
                // let triggerAt = triggertime.toLocaleDateString() + " " + triggertime.toLocaleTimeString();
                this.conditionForm["trigger"] = this.language.recurr_everyday(moment(time).format('hh:mm A'));
              } else if (data?.schedule?.type && data.schedule.type == 'weekly') {

                if (
                  data?.schedule?.recurrencePattern?.weekly?.startTime
                ) {
                  let startTimeSplit = data.schedule.recurrencePattern.weekly.startTime?.split(':');
                  startTime.setHours(startTimeSplit[0]);
                  startTime.setMinutes(startTimeSplit[1]);
                }
                let time = new Date(startTime)
                // .toLocaleTimeString([], {
                //   hour: '2-digit',
                //   minute: '2-digit',
                //   hour12: true
                // })
                // .toUpperCase();
                // let h =  time.getHours(), m = time.getMinutes();
                // let scheduleStartTime = '';
                // if (h == 12) {
                //   scheduleStartTime = h + ":" + m + " PM";
                // } else {
                //   scheduleStartTime = h > 12
                //   ? (h - 12) + ":" + m + " PM"
                //   : h == 0
                //   ? "12" + ":" + m + " AM"
                //   : h + ":" + m + " AM";
                // }
                let triggerDays = '';
                if (data?.schedule?.recurrencePattern?.weekly?.days && data.schedule.recurrencePattern.weekly.days.length > 0) {
                  data.schedule.recurrencePattern.weekly.days.forEach((element, index) => {
                    let dayOfWeek = this.weekNames.find(el => el['short_name'].toLowerCase() == element.toLowerCase());
                    if (dayOfWeek) {
                      if (index == data.schedule.recurrencePattern.weekly.days.length - 1) {
                        triggerDays = triggerDays.slice(0, -2)
                        if (data.schedule.recurrencePattern.weekly.days.length == 1) {
                          triggerDays += dayOfWeek['short_name'];
                        } else {
                          triggerDays += " and " + dayOfWeek['short_name'];
                        }

                      } else {
                        triggerDays += dayOfWeek['short_name'] + ", "
                      }
                    }

                  });
                }
                this.conditionForm["trigger"] = this.language.recurr_everyweek(triggerDays, moment(time).format('hh:mm A'));
              } else if (data?.schedule?.type && data.schedule.type == 'monthly') {
                if (
                  data?.schedule?.recurrencePattern?.monthly?.startTime
                ) {
                  let startTimeSplit = data.schedule.recurrencePattern.monthly.startTime?.split(':');
                  startTime.setHours(startTimeSplit[0]);
                  startTime.setMinutes(startTimeSplit[1]);
                }
                let time = new Date(startTime)
                // .toLocaleTimeString([], {
                //   hour: '2-digit',
                //   minute: '2-digit',
                //   hour12: true
                // })
                // .toUpperCase();
                // let h =  time.getHours(), m = time.getMinutes();
                // let scheduleStartTime = '';
                // if (h == 12) {
                //   scheduleStartTime = h + ":" + m + " PM";
                // } else {
                //   scheduleStartTime = h > 12
                //   ? (h - 12) + ":" + m + " PM"
                //   : h == 0
                //   ? "12" + ":" + m + " AM"
                //   : h + ":" + m + " AM";
                // }
                this.conditionForm["trigger"] = this.language.recurr_month(this.getNumberWithOrdinal(Number(data.schedule.recurrencePattern.monthly.dayOfMonth)), moment(time).format('hh:mm A'));
              }
            }
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = true;
          this.pageErrorHandle(error);
        }
      );
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
  goToListView() {
    let searchText = history?.state?.ccoAlarmNotificationsText;
    this.router.navigateByUrl(`/cco/operations/alarms/health-alarm-notifications`, { state: { ccoAlarmNotificationsText: searchText || '' } });
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
  }

  getCategorySubgroupsAlarms(alarm?) {
    this.categorySubgroupsAlarms = [];
    this.categorySubgroupsName = '';
    this.loading = true;
    this.http
      .get(
        `${this.baseUrl}alarmgroup?alarmgroupId=${alarm['group_id']}`
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          if (data && Object.entries(data).length > 0) {

            this.categorySubgroupsAlarms = data['alarmEventName'];
            this.categorySubgroupsName = data['name'];

            // if(this.categorySubgroupsAlarms.length > 0){
            //   const sortedBy = {
            //     'CRITICAL'  : 0, 
            //     'MAJOR'   : 1, 
            //     'MINOR' : 2,
            //     'WARNING' : 3,
            //     'INFO' : 4,
            //   };
            //   this.categorySubgroupsAlarms = this.categorySubgroupsAlarms.sort(
            //     (a, b) => sortedBy[a.state] - sortedBy[b.state]
            //   );
            // }
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  groupByKey(arr, key) {
    let result = [];
    result = arr.reduce((r, a) => {
      r[a[key]] = r[a[key]] || [];
      r[a[key]].push(a);
      return r;
    }, Object.create(null));
    return result;
  }
  getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }
}
