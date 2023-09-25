import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { AlarmNotificationsTimezoneService } from 'src/app/cco/alarm-notifications/services/alarm-notifications-timezone.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { OutlierWorkflowService } from 'src/app/cco/outliers-workflow/outlier-workflow.service';
import * as _ from 'lodash';
import { CommonWorkflowService } from '../common-workflow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recepients',
  templateUrl: './recepients.component.html',
  styleUrls: ['./recepients.component.scss']
})
export class RecepientsComponent implements OnInit {
  @ViewChild('mail_recepients', { static: true }) mail_recepients: ElementRef;
  @Output() isFormValid = new EventEmitter();
  @Input() dynamicFields: any;
  @Input() dynamicFieldsObj: any = {};
  language: any;
  languageSubject: any;
  inputBoxData: string;
  validEmail: boolean;
  recepientForm: any;//= this.fb.group({
  //   emailRecipients: ['', [Validators.required, emailValidator.bind(this)]],
  //   emailNotes: ''
  // });
  tabSub: any;
  consentSmsSub: any;
  submitted: boolean;
  formSub: any;
  errorMessage: string = 'At least one recipient must be entered';
  modalRef: any;
  @Input()
  set workflowObj(data: any) {
    console.log(data);
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any;

  phoneRegx = /^\+[-0-9]*$/;

  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private commonWorkflowService: CommonWorkflowService
  ) { }

  ngOnInit(): void {
    this.tabSub = this.commonWorkflowService.tabChanged$.subscribe((value: any) => {
      this.submitted = true;
    });

    this.emitFormStatus();

    this.recepientForm = this.prepareForm();
    this.addValidators();

    let that = this;
    let patchValue = _.pickBy(this.workflowObj, function (value, key) {
      return key === that.dynamicFieldsObj['emailNotes'];
    })

    console.log(patchValue);

    this.recepientForm.patchValue(patchValue);

    this.formSub = this.recepientForm.valueChanges.subscribe((value: any) => {
      this.workflowObj[this.dynamicFieldsObj['emailNotes']] = value[this.dynamicFieldsObj['emailNotes']];
      this.emitFormStatus();
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  get formControls() { return this.recepientForm.controls; }

  onCustomPasteClick(key: any, event: any) {
    event.preventDefault();
    //this.mail_recepients.nativeElement.focus();
  }
  removeData(key: any, index: any) {
    this.workflowObj?.[key]?.splice(index, 1);
    this.workflowObj[key] = [...this.workflowObj?.[key]];
    // if (!this.workflowObj?.[key]?.length) {
    //   this.isFormValid.emit(false);
    // }

    this.emitFormStatus();

  }
  makeList(key: any, values?) {
    console.log(key);
    this.validEmail = true;
    let data = '',
      newTags = '';
    if (values) {
      data = values;
      newTags = values;
      this.recepientForm.get(key).setValue('');
    } else {
      data = this.recepientForm.get(key).value;
      newTags = this.recepientForm.get(key).value;
    }

    let items = [];
    newTags = newTags.trim();
    newTags = newTags.replace(/,/g, ' ');
    newTags = newTags.replace(/,\s+/g, ' ');
    newTags = newTags.replace(/\n/g, ' ');
    newTags = newTags.replace(/\s\s+/g, ' ');
    let regex: any = '';
    if (key === this.dynamicFieldsObj['emailRecipients']) {
      regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i;
    } else if (key === this.dynamicFieldsObj['webhooks']) {
      regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    } else if (key === this.dynamicFieldsObj['sms']) {
      regex = this.phoneRegx;
    }

    if (newTags?.length) {
      this.recepientForm.get(key).setValue('');
      Array.prototype.push.apply(items, newTags.split(' '));
      items = items.filter((el) => el);
      if (items && items.length) {
        items = this.getUniqueArr(items);
        let filteredData = [];
        items.forEach((element) => {
          if (!this.workflowObj[key].includes(element) && regex.test(element?.trim())) {
            filteredData.push(element.trim());
          }
        });

        this.workflowObj[key] = [
          ...this.workflowObj[key],
          ...filteredData,
        ];

        this.emitFormStatus();
        console.log(this.workflowObj)
      }
    } else {
      if (newTags && newTags != '') {
        //this.validEmail = false;
        // this.isFormValid.emit(false);
        this.emitFormStatus();
      }
    }

    // console.log(items)
  }
  pasteMakeList(key: any, event: ClipboardEvent) {
    event.preventDefault();
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let values = clipboardData.getData('text');
    this.makeList(key, values);
  }
  getUniqueArr(arr: any = []) {
    var uniqueNames = [];
    $.each(arr, function (i, el) {
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return uniqueNames;
  }
  clearSearch() {
    // const formControls =
    //   this.workFlowScheduleData?.workFlowScheduleForm?.controls;
    // formControls['emailNotes']?.setValue('');
  }

  validateEmail(text: string) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i;
    return text && EMAIL_REGEXP.test(text);
  }

  prepareForm() {
    const group: any = {};
    this.dynamicFields?.forEach((field: any) => {
      group[field.key] = field.required ? new FormControl('')
        : new FormControl();
    });

    return new FormGroup(group);
  }

  ngOnDestroy() {
    this.formSub?.unsubscribe();
    this.tabSub?.unsubscribe();
  }

  addValidators() {
    this.recepientForm.controls[this.dynamicFieldsObj['emailRecipients']]?.addValidators([emailValidator.bind(this)]);
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.recepientForm.controls[this.dynamicFieldsObj['webhooks']]?.addValidators([Validators.pattern(urlRegex)]);
    this.recepientForm.controls[this.dynamicFieldsObj['sms']]?.addValidators([Validators.pattern(this.phoneRegx)]);
  }

  emitFormStatus() {
    if (this.workflowObj?.[this.dynamicFieldsObj['emailRecipients']]?.length ||
      this.workflowObj?.[this.dynamicFieldsObj['sms']]?.length ||
      this.workflowObj?.[this.dynamicFieldsObj['webhooks']]?.length) {
      this.isFormValid.emit(true);
      this.errorMessage = '';
    } else {
      this.isFormValid.emit(false);
      this.errorMessage = 'At least one recipient must be entered';
    }
  }

}

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value) {
    return null;
  }

  if (!this.validateEmail(control.value)) {
    return { 'invalidEmail': true };
  }

  return null;

}

