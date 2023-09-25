import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-marketing-audience-history',
  templateUrl: './marketing-audience-history.component.html',
  styleUrls: ['./marketing-audience-history.component.scss']
})
export class MarketingAudienceHistoryComponent implements OnInit {

  language: any;
  languageSubject: any;
  chartFilterArray = [
    {label:'Past 3 Months',value:'Past 3 Months'}
  ]
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
  }

}
