import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-ont-age-out',
  templateUrl: './ont-age-out.component.html',
  styleUrls: ['./ont-age-out.component.scss']
})
export class OntAgeOutComponent implements OnInit {

  language;
  languageSubject;

  constructor(private translateService: TranslateService) { }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
}
