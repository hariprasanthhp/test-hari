import { Component, OnInit , OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  language: any;
  languageSubject;

  filterTab = 'content';

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
