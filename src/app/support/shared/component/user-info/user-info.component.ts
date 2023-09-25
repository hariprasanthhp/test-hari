import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
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
