import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { OutlierWorkflowService } from 'src/app/cco/outliers-workflow/outlier-workflow.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  language: any;
  languageSubject: any;
  loading = false;

  detailsForm = this.fb.group({
    description: '',
    deviceType:['ONT',[Validators.required]],
    name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$'), Validators.maxLength(50)]]
  });
  submitted = false;
  @Input() data
  @Output() private isFormValid: EventEmitter<any> = new EventEmitter();
  nameError: boolean;
  smpId: any;
  deviceType: any;
  constructor(private translateService: TranslateService,
    private fb: FormBuilder,private route: ActivatedRoute,) { }

  ngOnInit(): void {
      this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.route.queryParams.subscribe(params => {
      if (params['smpId']) {
        this.smpId = params['smpId'];
        this.deviceType=params['type']
        this.detailsForm.patchValue({deviceType:this.deviceType})
       
      }
    })
    this.initialise()
   
  }
  initialise(){
    this.detailsForm.patchValue(this.data)
    this.isFormValid.emit(this.detailsForm)
  }
  formvaluechange() {
    this.isFormValid.emit(this.detailsForm)
  }
  nameValidation(){
    var regex = new RegExp("^[a-zA-Z0-9_.-]{1,48}$");
    let result =this.detailsForm.value.name
    if(this.detailsForm.value.name){
      if (regex.test(result)) {
        this.nameError=false
       }else{
         this.nameError=true
       }
    }else{
      this.nameError=false
    }
    
  }
  get formControls() { return this.detailsForm.controls; }
  ngOnDestroy() {
  }
}
