import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Pipe({
  name: 'weekDays'
})
export class WeekDaysPipe implements PipeTransform, OnDestroy {
  language;
  languageSubject;
  constructor(private translateService : TranslateService){
      this.language = this.translateService.defualtLanguage;
      this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any)=>{
        this.language = data;
      })
  }


  transform(value: boolean): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    let day;
    switch (String(value)){
      case '0' : day = this.language['Sunday']
      break;
      case '1' : day = this.language['Monday']
      break;
      case '2' : day = this.language['Tuesday']
      break;
      case '3' : day = this.language['Wednesday']
      break;
      case '4' : day = this.language['Thursday']
      break;
      case '5' : day = this.language['Friday']
      break;
      case '6' : day = this.language['Saturday']
      break;

    }
    return day;
  }
  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }
}
