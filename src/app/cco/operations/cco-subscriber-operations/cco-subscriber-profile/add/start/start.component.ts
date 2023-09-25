import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  language: any;
  languageSubject: any;
  _addProfileObj: any;
  myForm: FormGroup;
  name: boolean = false;
  nameError: boolean=false;
  @Input() submitted = false;
  @Output() private Out_Start_Focus: EventEmitter<any> = new EventEmitter();
  @Output() private Out_Name_Error: EventEmitter<any> = new EventEmitter();
  copyName: any;
  copynameError: boolean = false
  @Input()
  set addProfileObj(value: any) {
    this._addProfileObj = value;
    // console.log(this._addProfileObj, "fromseer");
    if (this.addProfileObj?.start)
      this.addProfileObj.start.count = this.addProfileObj.start?.count + 1;
      this.myForm.patchValue({
        //profileName: value?.start?.name,
        description: value?.start?.description
      })
      this.route.queryParams.subscribe((params: any) => {
        if (params['name'] && params['key']==='copy') {
          this.name = false;
          this.copyName=params['name']
          this.myForm.patchValue({profileName:params['name'] + '_copy'})
        }else if(params['name'] && params['key']!=='copy'){
          this.myForm.patchValue({profileName:params['name']})
           
          this.name = true
        } else {
          this.name = false;
          this.myForm.patchValue({
            profileName: value?.start?.name,
            description: value?.start?.description
          })
        }
      })
     
    
  }
  get addProfileObj() {
    //  console.log(this._addProfileObj, "from get");
    return this._addProfileObj;
  }
  constructor(private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.myForm = this.formBuilder.group({
      profileName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.-]{1,48}$")]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.Out_Start_Focus.emit(false)
    this.Out_Name_Error.emit(false)
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // profileName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]{1,48}$")]],
    if (this.route.snapshot.paramMap.get("id")) {

      this.name = true;
    }
    else
      this.name = false;
    this.route.queryParams.subscribe((params: any) => {
      if (params['name'] && params['key']==='copy') {
        this.name = false;
        this.copyName=params['name']
        this.nameValidation()
        this.myForm.patchValue({profileName:params['name'] + '_copy'})
      }else if(params['name'] && params['key']!=='copy'){
        this.myForm.patchValue({profileName:params['name']})
         
        this.name = true
      } else {
        this.name = false;
      }
    })
   
    this.myForm.valueChanges.subscribe(formValue => {
      // console.log(this.myForm.valid, this.myForm.controls.profileName.value);
      //console.log(this.myForm.controls.profileName.value.trim());
      this.addProfileObj.start.name = this.myForm.controls.profileName.value;
      this.addProfileObj.start.description = this.myForm.controls.description.value;
      if (this.myForm.valid) {
        this.addProfileObj.start.allfieldvalid = true;
      }
      else this.addProfileObj.start.allfieldvalid = false;
    })
  }
  nameValidation(){
    var regex = new RegExp("^[a-zA-Z0-9_.-]{1,40}$");
    let result =this.myForm.value.profileName ? this.myForm.value.profileName:this.copyName
    if (regex.test(result)) {
     this.nameError=false
     this.Out_Start_Focus.emit(false)
    }else{
      this.nameError=true
      this.Out_Start_Focus.emit(true)
    }
    if(this.copyName === this.myForm.value.profileName){
      this.copynameError = true
      this.Out_Name_Error.emit(true)
    }else{
      this.copynameError=false
      this.Out_Name_Error.emit(false)
    }
  }
}
