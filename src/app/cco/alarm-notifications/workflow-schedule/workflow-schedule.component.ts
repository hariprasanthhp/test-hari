import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { AlarmNotificationsTimezoneService } from '../services/alarm-notifications-timezone.service';
@Component({
  selector: 'app-workflow-schedule',
  templateUrl: './workflow-schedule.component.html',
  styleUrls: ['./workflow-schedule.component.scss'],
})
export class WorkflowScheduleComponent implements OnInit {
  language: any;
  languageSubject;
  workFlowScheduleForm: FormGroup;
  formatType = [
    { value: 'html', name: 'HTML' },
    { value: 'pdf', name: 'PDF' },
  ];
  inputBoxData: string = '';
  @ViewChild('mail_recepients', { static: true }) mail_recepients: ElementRef;
  // @ViewChildren('attendee') attendeeInputs: QueryList<ElementRef>;
  _workFlowScheduleData: any = {};
  minWeekEndEndDate: Date;
  defaultWeekEndEndDate: Date;
  notifyOnClearSubject;
  scheduleFormSubject;
  @Output() getWorkFlowAPIEmitter = new EventEmitter();
  onChangeRecurrenceSubject;
  onChangeTriggerSubject;
  validEmail: boolean = true;
  @Input()
  set workFlowScheduleData(value: any) {
    this._workFlowScheduleData = value;
  }
  get workFlowScheduleData() {
    return this._workFlowScheduleData;
  }
  triggerType = [
    { value: 'true', name: 'Immediately' },
    // { value: 'false', name: 'On a schedule' },
  ];
  @ViewChild('tagInput')
  tagInput: any;
  selectedCar: number;

  addFirstAttemptFailed = false;
  onAddedFunc: any;
  // timezoneId = '';
  timezones = [];
  must_be_email(control: FormControl) {
    if (this.addFirstAttemptFailed && !this.validateEmail(control.value)) {
      return { must_be_email: true };
    }
    return null;
  }
  emailValidators = [this.must_be_email.bind(this)];
  @Input() scheduleFormSubmitted: Subject<boolean>;
  errorMessages = {
    must_be_email: 'Please be sure to use a valid email format',
  };
  constructor(
    private translateService: TranslateService,
    private workflowService: WorkflowService,
    private utils: AlarmNotificationsTimezoneService,
    private dateUtils: DateUtilsService
  ) {
    this.onAddedFunc = this.beforeAdd.bind(this);
  }

  ngOnInit(): void {
    this.timezones = this.utils.getTimeZones();

    let localeDate = new Date().toString().split(' '),
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
    this.timezones = this.timezones.sort((a, b) =>
      (a['name'] || '')
        .toString()
        .localeCompare((b['name'] || '').toString(), 'en', {
          numeric: false,
        })
    );
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    const filteringFormControl = this.workFlowScheduleData && this.workFlowScheduleData.workFlowScheduleForm && this.workFlowScheduleData.workFlowScheduleForm['controls'] ?
      this.workFlowScheduleData.workFlowScheduleForm['controls']: {};
    // if (!this.workFlowScheduleData.scheduleFormEntered) {
      this.workFlowScheduleData.workFlowScheduleForm =
        this.workFlowScheduleData.workFlowScheduleForm;
      // this.workFlowScheduleData.workFlowScheduleForm = this.formBuilder.group({
      //   notes: [''],
      //   emails: [''],
      //   clearThreshold: [0],
      //   immediate: ['true', Validators.required],
      //   notifyOnClear: [false],
      //   weekDays: new FormArray([]),
      //   // everyCount: [1],
      //   recurrence: ['daily'],
      //   scheduleStartTime: [''],
      //   numberOfMonths: [''],
      //   timezone : [gmtId]
      // });
      if(filteringFormControl){
        filteringFormControl['timezone']?.setValue(gmtId);

        this.notifyOnClearSubject = filteringFormControl[
          'notifyOnClear'
        ]?.valueChanges?.subscribe((selectedValue) => {
          filteringFormControl['clearThreshold']?.setValue(0);
          if (selectedValue) {
            filteringFormControl['clearThreshold'].enable();
            filteringFormControl['clearThreshold'].setValidators([
              Validators.required,
            ]);
          } else {
            filteringFormControl['clearThreshold'].disable();
            filteringFormControl['clearThreshold'].setErrors(null);
            filteringFormControl['clearThreshold'].clearValidators();
          }
        });
        this.onChangeRecurrenceSubject = filteringFormControl[
          'recurrence'
        ]?.valueChanges?.subscribe((selectedValue) => {
          this.onSelectReccurence();
        });
        this.onChangeTriggerSubject = filteringFormControl[
          'immediate'
        ]?.valueChanges?.subscribe((selectedValue) => {
          this.onSelectReccurence();
        });
      }
     
      // this.patchFormValue();
      // this.workFlowScheduleData.scheduleFormEntered = true;
    // }

    
    //markAllAsToched
    this.scheduleFormSubject = this.scheduleFormSubmitted?.subscribe((v) => {
      this.workFlowScheduleData?.workFlowScheduleForm?.markAllAsTouched();
    });
    this.callMultipleAPI();
  }
  async callMultipleAPI() {
    //Call Get workflow API in alarm Notification page
    this.getWorkFlowAPIEmitter.emit(true);
  }
  // patchFormValue() {
  //   const weeklyDays = this.workFlowScheduleData.workFlowScheduleForm.get(
  //     'weekDays'
  //   ) as FormArray;

  //   this.workFlowScheduleData.weekDays.forEach((days) => {
  //     days['scheduleWeeklyStatus'] = days['scheduleWeeklyStatus']
  //       ? days['scheduleWeeklyStatus']
  //       : false;
  //     weeklyDays.push(
  //       new FormGroup({
  //         name: new FormControl(days.name),
  //         value: new FormControl(days.value),
  //         dayFrom: new FormControl(days.dayFrom),
  //         dayTo: new FormControl(days.dayTo),
  //         defaultTime: new FormControl(days.defaultTime),
  //         minTime: new FormControl(days.minTime),
  //         checked: new FormControl(days['checked'] || false),
  //         scheduleWeeklyStatus: new FormControl(days['scheduleWeeklyStatus']),
  //       })
  //     );
  //   });

  //   console.log(weeklyDays, 'weeklyDays');
  // }
  // onChangeExclusionTime(event, type, index, event_type?) {
  //   const weeklyDays = (
  //     this.workFlowScheduleData.workFlowScheduleForm.get(
  //       'weekDays'
  //     ) as FormArray
  //   ).at(index);

  //   //Set Seconds as 0
  //   if (weeklyDays.value.dayFrom) {
  //     let dayFrom = new Date(weeklyDays.value.dayFrom);
  //     dayFrom.setSeconds(0);
  //     weeklyDays.value.dayFrom = dayFrom;
  //   }
  //   if (weeklyDays.value.dayTo) {
  //     let dayTo = new Date(weeklyDays.value.dayTo);
  //     dayTo.setSeconds(0);
  //     weeklyDays.value.dayTo = dayTo;
  //   }

  //   if (
  //     type == 'dayFrom' &&
  //     weeklyDays.value.dayFrom &&
  //     ((event && event.target && event.target.value && event.target?.value.length >= 8) ||
  //       event_type == 'select')
  //   ) {
  //     let minTime = this.getDefaultMinDate(weeklyDays.value.dayFrom, 'min'),
  //       defaultTime = this.getDefaultMinDate(
  //         weeklyDays.value.dayFrom,
  //         'default'
  //       );
  //     if (
  //       weeklyDays.value.dayTo &&
  //       weeklyDays.value.dayFrom >= weeklyDays.value.dayTo
  //     ) {
  //       weeklyDays.patchValue({
  //         dayTo: '',
  //       });
  //     }

  //     this.workFlowScheduleData.weekDays[index].minTime = minTime;
  //     this.workFlowScheduleData.weekDays[index].defaultTime = defaultTime;
  //   } else if (
  //     type == 'dayTo' &&
  //     weeklyDays.value.dayTo &&
  //     ((event && event.target && event.target.value && event.target?.value.length >= 8) ||
  //       event_type == 'select')
  //   ) {
  //     if (weeklyDays.value.dayFrom >= weeklyDays.value.dayTo) {
  //       weeklyDays.patchValue({
  //         dayTo: '',
  //       });
  //     }
  //   }
  // }
  // getDefaultMinDate(date, type?) {
  //   let dateSel = new Date(date);
  //   if (type == 'default') {
  //     dateSel.setHours(23);
  //     dateSel.setMinutes(59);
  //     dateSel.setSeconds(0);
  //   } else {
  //     dateSel.setMinutes(dateSel.getMinutes() + 1);
  //   }
  //   return dateSel;
  // }
  beforeAdd(tag: string) {
    if (!this.validateEmail(tag)) {
      if (!this.addFirstAttemptFailed) {
        this.addFirstAttemptFailed = true;
        this.tagInput.setInputValue(tag);
      }

      return throwError(this.errorMessages['must_be_email']);
      //return of('').pipe(tap(() => setTimeout(() => this.tagInput.setInputValue(tag))));
    }
    this.addFirstAttemptFailed = false;
    return of(tag);
  }
  validateEmail(text: string) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i;
    return text && EMAIL_REGEXP.test(text);
  }

  enforceMinMax(event, controlName) {
    
    let value = this.workflowService.enforceMinMax(event);
    if(value != -1){
      this.workFlowScheduleData.workFlowScheduleForm
      .get(controlName)
      ?.setValue(value);
    }
  }

  selectWeeklySchedule(day) {
    let dayOfWeek = this.workFlowScheduleData.weekDays.find(
      (el) => el.value == day.value
    );
    dayOfWeek['scheduleWeeklyStatus'] = !dayOfWeek['scheduleWeeklyStatus'];
    const formControls =
      this.workFlowScheduleData?.workFlowScheduleForm?.controls;
    formControls['weekDays']?.controls.forEach((el) => {
      if (el['value']['value'] == day['value']) {
        el?.controls['scheduleWeeklyStatus']?.setValue(
          dayOfWeek['scheduleWeeklyStatus']
        );
      }
    });
  }

  onSelectReccurence() {
    const recurrence =
      this.workFlowScheduleData?.workFlowScheduleForm?.controls?.recurrence?.value;
    const formControls =
      this.workFlowScheduleData?.workFlowScheduleForm?.controls;
    if(formControls){
      if (formControls['immediate'].value == 'false') {
        formControls['timezone'].disable();
        formControls['weekDays']?.controls?.forEach((el) => {
          el?.controls['checked']?.disable();
          el?.controls['dayFrom']?.disable();
          el?.controls['dayTo']?.disable();
        });
        if (
          recurrence == 'daily' ||
          recurrence == 'weekly' ||
          recurrence == 'monthly'
        ) {
          formControls['scheduleStartTime'].setValidators([Validators.required]);
          // formControls['everyCount'].setValidators([Validators.required]);
        }
        if (recurrence == 'monthly') {
          formControls['numberOfMonths'].setValidators([Validators.required]);
        }
  
        if (recurrence == 'daily' || recurrence == 'weekly' || recurrence == '') {
          formControls['numberOfMonths'].setErrors(null);
          formControls['numberOfMonths'].clearValidators();
        }
        // if(recurrence == 'weekly' || recurrence == 'monthly' || recurrence == ''){
        //   formControls['dailyDayCount'].clearValidators();
        //   formControls['dailyDayCount'].setErrors(null);
        // }
        // if(recurrence == 'monthly' || recurrence == 'daily' || recurrence == ''){
        //   formControls['weeklyDayCount'].clearValidators();
        //   formControls['weeklyDayCount'].setErrors(null);
        // }
      } else {
        formControls['timezone'].enable();
        formControls['weekDays']?.controls?.forEach((el) => {
          el?.controls['checked']?.enable();
          el?.controls['dayFrom']?.enable();
          el?.controls['dayTo']?.enable();
        });
        formControls['numberOfMonths'].setErrors(null);
        formControls['numberOfMonths'].clearValidators();
        formControls['scheduleStartTime'].setErrors(null);
        formControls['scheduleStartTime'].clearValidators();
        // formControls['everyCount'].setErrors(null);
        // formControls['everyCount'].clearValidators();
      }
    }
    
  }
  onCustomPasteClick(event) {
    event.preventDefault();
    this.mail_recepients.nativeElement.focus();
  }
  removeData(index) {
    this.workFlowScheduleData.mailRecepients.splice(index, 1);
  }
  makeList(values?) {
    this.validEmail = true;
    let data = '',
      newTags = '';
    if (values) {
      data = values;
      newTags = values;
      $('#mail_recepients').val('');
    } else {
      data = this.inputBoxData;
      newTags = this.inputBoxData;
    }

    let items = [];
    newTags = newTags.trim();
    newTags = newTags.replace(/,/g, ' ');
    newTags = newTags.replace(/,\s+/g, ' ');
    newTags = newTags.replace(/\n/g, ' ');
    newTags = newTags.replace(/\s\s+/g, ' ');

    let validMail = this.validateEmail(newTags);

    if (validMail) {
      this.workFlowScheduleData.mailEntered = true;
      this.inputBoxData = '';
      Array.prototype.push.apply(items, newTags.split(' '));
      items = items.filter((el) => el);
      if (items && items.length) {
        let arr = [];

        items.forEach((element) => {
          if (element) {
            arr.push({
              id: element.trim(),
              text: element.trim(),
            });
          }
        });

        items = this.getUniqueArr(items);

        let filteredData = [];
        items.forEach((element) => {
          //if (!this.devicesAdded.includes(element) && !this.deviceData.includes(element)) {
          if (!this.workFlowScheduleData.mailRecepients.includes(element)) {
            filteredData.push(element.trim());
          }
        });

        this.workFlowScheduleData.mailRecepients = [
          ...this.workFlowScheduleData.mailRecepients,
          ...filteredData,
        ];
      }
    } else {
      if (newTags && newTags != '') {
        this.validEmail = false;
      }
    }

    // console.log(items)
  }
  pasteMakeList(event: ClipboardEvent) {
    event.preventDefault();
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let values = clipboardData.getData('text');
    this.makeList(values);
  }
  getUniqueArr(arr: any = []) {
    var uniqueNames = [];
    $.each(arr, function (i, el) {
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return uniqueNames;
  }
  clearSearch() {
    const formControls =
      this.workFlowScheduleData?.workFlowScheduleForm?.controls;
    formControls['notes']?.setValue('');
  }
  // onCheckExclusionDays(event, index) {
  //   let checked = event.target.checked;
  //   const weeklyDays = (
  //     this.workFlowScheduleData.workFlowScheduleForm.get(
  //       'weekDays'
  //     ) as FormArray
  //   ).at(index);
  //   if (checked) {
  //     if (!weeklyDays.value.dayFrom && !weeklyDays.value.dayTo) {
  //       let start = new Date();
  //       start.setHours(0);
  //       start.setMinutes(0);
  //       start.setSeconds(0);

  //       let end = new Date();
  //       end.setHours(23);
  //       end.setMinutes(59);
  //       end.setSeconds(0);

  //       weeklyDays.patchValue({
  //         dayFrom: start,
  //         dayTo: end,
  //       });
  //       let minTime = this.getDefaultMinDate(start, 'min'),
  //         defaultTime = this.getDefaultMinDate(start, 'default');
  //       this.workFlowScheduleData.weekDays[index].minTime = minTime;
  //       this.workFlowScheduleData.weekDays[index].defaultTime = defaultTime;
  //     }
  //   }else{
  //     weeklyDays.patchValue({
  //       dayFrom: '',
  //       dayTo: '',
  //     });
  //   }
  // }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    // if (this.scheduleFormSubmitted) this.scheduleFormSubmitted.unsubscribe();
    if (this.notifyOnClearSubject) this.notifyOnClearSubject.unsubscribe();
    if (this.onChangeRecurrenceSubject)
      this.onChangeRecurrenceSubject.unsubscribe();
    if (this.onChangeTriggerSubject) this.onChangeTriggerSubject.unsubscribe();
    // if (this.scheduleFormSubject) this.scheduleFormSubject.unsubscribe();
  }
}
