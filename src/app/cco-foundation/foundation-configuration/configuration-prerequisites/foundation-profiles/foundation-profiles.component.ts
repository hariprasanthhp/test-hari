import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-foundation-profiles',
  templateUrl: './foundation-profiles.component.html',
  styleUrls: ['./foundation-profiles.component.scss']
})
export class FoundationProfilesComponent implements OnInit {
  language;
  languageSubject;
  constructor(private translateService: TranslateService) { 
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  }

  ngOnInit(): void {
  }

}
