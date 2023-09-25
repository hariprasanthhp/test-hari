import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { OutlierWorkflowService } from 'src/app/cco/outliers-workflow/outlier-workflow.service';
import { CommonWorkflowService, nameValidator } from '../common-workflow.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  language: any;
  languageSubject: any;
  loading = false;

  detailsForm = this.fb.group({
    description: '',
    name: ['', [Validators.required, Validators.maxLength(50), nameValidator]]
  });
  formSub: any;

  @Input()
  set workflowObj(data: any) {
    console.log(data);
    if (data?.name) {
      //this.detailsForm.controls['name'].disable();
      let inp: any = document.getElementById("name");
      inp.readOnly = true;
    }
    this._workflowObj = data;
    this.patchValue();
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any;
  public tabSub: any;
  submitted = false;
  @Output() isFormValid = new EventEmitter();

  constructor(private translateService: TranslateService,
    private fb: FormBuilder,
    private commonWorkflowService: CommonWorkflowService) { }

  ngOnInit(): void {

    this.tabSub = this.commonWorkflowService.tabChanged$.subscribe((value: any) => {
      this.submitted = true;
    });

    this.formSub = this.detailsForm.valueChanges.subscribe((value: any) => {
      this.prepareDetailsFormData(value);
      this.isFormValid.emit(this.detailsForm.valid);
    });

    this.detailsForm.patchValue({
      name: this.workflowObj?.name,
      description: this.workflowObj?.description,
    });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  get formControls() { return this.detailsForm.controls; }

  prepareDetailsFormData(value: any) {
    this._workflowObj.name = value?.name;
    this._workflowObj.description = value?.description;
  }

  patchValue() {
    this.detailsForm.patchValue({
      name: this.workflowObj?.name,
      description: this.workflowObj?.description,
    });
  }

  ngOnDestroy() {
    this.formSub?.unsubscribe();
    this.tabSub?.unsubscribe();
  }

}
