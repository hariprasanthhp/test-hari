import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { HealthService } from '../../service/health.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  language: any = {};
  languageSubject;

  constructor(private translateService: TranslateService,
    private healthService: HealthService) { }

  ngOnInit(): void {
    this.healthService.isReport = true;
    this.healthService.previousUrl = '';
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }
}
