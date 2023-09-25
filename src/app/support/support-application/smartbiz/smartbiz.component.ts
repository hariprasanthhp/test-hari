import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-smartbiz',
  templateUrl: './smartbiz.component.html',
  styleUrls: ['./smartbiz.component.scss']
})
export class SmartbizComponent implements OnInit {

  loading = true;
  language: any;
  languageSubscription: any;
  activeTab = 'network-resilience';

  constructor(
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(selectedLanguage => {
      this.language = selectedLanguage;
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}
