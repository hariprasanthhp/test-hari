import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';


@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.scss']
})
export class SubscriberListComponent implements OnInit {
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

}
