import { Component, OnInit , OnDestroy} from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-subscriber-sub-header',
  templateUrl: './subscriber-sub-header.component.html',
  styleUrls: ['./subscriber-sub-header.component.scss']
})
export class SubscriberSubHeaderComponent implements OnInit {
  language: any;
  languageSubject;

  constructor( private translateService: TranslateService) { }

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
