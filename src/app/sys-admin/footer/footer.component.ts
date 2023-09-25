import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  language: any;
  languageSubject;
  loginType: any;

  constructor(private translateService: TranslateService, private sso: SsoAuthService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.loginType = this.sso.getCscType()
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

}
