import {Component, NgModule, VERSION, Pipe, PipeTransform} from '@angular/core'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { TranslateService } from 'src/app-services/translate.service';

@Pipe({
    name: 'OnboardingPipe'
})
export class OnboardingConverter implements PipeTransform {

  language;
  languageSubject;

  constructor(private sanitizer: DomSanitizer, private translateService : TranslateService){
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
  }

  transform(value: any): any {
    // If there's no match, just return the original value.
    if (value) {
      return this.language.Enabled;
    }else{
        return this.language.Disabled;
    }
  }

  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }
}