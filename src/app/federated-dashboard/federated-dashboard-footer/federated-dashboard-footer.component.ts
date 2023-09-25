import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-federated-dashboard-footer',
  templateUrl: './federated-dashboard-footer.component.html',
  styleUrls: ['./federated-dashboard-footer.component.scss']
})
export class FederatedDashboardFooterComponent implements OnInit {

  language: any;
  languageSubject: any;
  loginType: any;

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService) { }

  ngOnInit(): void {
    this.loginType = this.sso.getCscType()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

}
