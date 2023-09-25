import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { AcessModifiers, SsoAuthService } from '../../../shared/services/sso-auth.service';
@Component({
  selector: 'app-foundation-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class FoundationReportsComponent implements OnInit {
  language: any = {};
  languageSubject;
  showInventoryReport = false;
  showUnassociatedDevices = false;
  showCallOutcome = false;
  constructor(
    private translateService: TranslateService,public sso: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if( this.sso.checFoundationScope(AcessModifiers.READ)){
      this.showCallOutcome = true;
      this.showUnassociatedDevices = true;
      this.showInventoryReport = true;
    }

  }

}
