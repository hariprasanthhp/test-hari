import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'; // CLI imports router

@Component({
  selector: 'app-support-overview',
  templateUrl: './support-overview.component.html',
  styleUrls: ['./support-overview.component.scss']
})
export class SupportOverviewComponent implements OnInit {
  language: any;
  languageSubject;

  constructor(
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

}
