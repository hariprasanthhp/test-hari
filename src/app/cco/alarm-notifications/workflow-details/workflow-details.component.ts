import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.scss'],
})
export class WorkflowDetailsComponent implements OnInit {
  language: any;
  languageSubject;
  // workFlowDetailsForm: FormGroup;
  _workFlowDetailsData: any = {};
  @ViewChild('notification_name', { static: true }) notification_name: ElementRef;
  @Output() getWorkFlowAPIEmitter = new EventEmitter();
  loading: boolean;
  @Input()
  set workFlowDetailsData(value: any) {
    this._workFlowDetailsData = value;
    if (value?.workflowId != '') {
      this.workFlowDetailsData?.workFlowDetailsForm?.controls['name']?.disable();
    }
  }
  get workFlowDetailsData() {
    return this._workFlowDetailsData;
  }
  @Input() loadOnEdit : Observable<boolean>
  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    if(this.loadOnEdit){
      this.loadOnEdit.subscribe((v) => {
        this.loading = v;
      })
    }
    
    // if(this.workFlowDetailsData.workflowId == ''){
    //   this.notification_name.nativeElement.focus();
    // }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    // this.workFlowDetailsForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   description: [''],
    // });
    const filteringFormControl = this.workFlowDetailsData && this.workFlowDetailsData.workFlowDetailsForm ?
      this.workFlowDetailsData.workFlowDetailsForm.controls: {};
    if(filteringFormControl){
      this.workFlowDetailsData.workFlowDetailsForm.valueChanges.subscribe((formValue) => {
        if (formValue.name) {
          this.workFlowDetailsData.isNameEntered = true;
        }
      });
    }
    
  }

  async callMultipleAPI() {
    //Call Get workflow API in alarm Notification page
    this.getWorkFlowAPIEmitter.emit(true);
  }
  avoidInitialSpacing(event : any){
    if(event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault()
    }
  }
  keyPressAlphanumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  clearSearch() {
    this.workFlowDetailsData.description = '';
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }
}
