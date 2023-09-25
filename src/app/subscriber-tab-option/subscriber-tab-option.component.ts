import { Component, OnInit ,OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-subscriber-tab-option',
  templateUrl: './subscriber-tab-option.component.html',
  styleUrls: ['./subscriber-tab-option.component.scss']
})
export class SubscriberTabOptionComponent implements OnInit {
  language: any;
  languageSubject;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }


  tabChange(){
    
  }

}
