import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from '../../shared/services/sso-auth.service'

@Component({
  selector: 'app-cco-footer',
  templateUrl: './cco-footer.component.html',
  styleUrls: ['./cco-footer.component.scss']
})
export class CcoFooterComponent implements OnInit {

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
    //console.log('24', this.loginType);
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }

}
