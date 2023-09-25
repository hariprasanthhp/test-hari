import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-profile-start-wizard',
  templateUrl: './profile-start-wizard.component.html',
  styleUrls: ['./profile-start-wizard.component.scss']
})
export class ProfileStartWizardComponent implements OnInit {
  language: any;
  languageSubject;
  myForm: FormGroup;
  _addProfileObj: any = {}
  @Input()
  set addProfileObj(value: any) {
    this._addProfileObj = value;
    if (this.myForm) {
      this.myForm.patchValue({
        profileName: value?.start?.name,
        description: value?.start?.description
      });
    }

  }
  get addProfileObj() {
    return this._addProfileObj;
  }

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // this.myForm = this.formBuilder.group({
    //   profileName: ['', Validators.required],
    //   description: ['']
    // });
    // this.myForm.valueChanges.subscribe(formValue => {
    //   if(formValue.profileName) {
    //     this.addProfileObj.start.isNameEntered = true;
    //   }
    // })

    this.myForm = this.formBuilder.group({
      profileName: ['', Validators.required],
      description: ['']
    });

    this.myForm.patchValue({
      profileName: this.addProfileObj.start?.name,
      description: this.addProfileObj.start?.description
    });

    this.myForm.valueChanges.subscribe(formValue => {
      formValue.profileName = formValue?.profileName?.trim()
      formValue.description = formValue?.description?.trim()

      this.addProfileObj.start.name = formValue.profileName
      this.addProfileObj.start.isNameEntered = true;


      this.addProfileObj.start.description = formValue?.description

    })
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

}
