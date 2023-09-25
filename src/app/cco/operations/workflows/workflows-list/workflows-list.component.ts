import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-workflows-list',
  templateUrl: './workflows-list.component.html',
  styleUrls: ['./workflows-list.component.scss']
})
export class WorkflowsListComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  constructor(private translateService : TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any) =>{
      this.language = data;
    })
  }

  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }


}
