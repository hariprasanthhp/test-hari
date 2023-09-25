import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-entitelments',
  templateUrl: './entitelments.component.html',
  styleUrls: ['./entitelments.component.scss']
})
export class EntitelmentsComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  constructor(private translateService : TranslateService) { }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
  }

  ngOnDestroy(): void {
   if(this.languageSubject){
     this.languageSubject.unsubscribe();
   }
  }

}
