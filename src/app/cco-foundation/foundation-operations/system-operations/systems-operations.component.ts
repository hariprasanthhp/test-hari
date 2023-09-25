import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from '../../../shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cco-systems-operations',
  templateUrl: './systems-operations.component.html',
  styleUrls: ['./systems-operations.component.scss']
})
export class CcoSystemsOperationsComponent implements OnInit, OnDestroy {

  language;
  languageSubject;
  showDialPlan = false;
  showSubnetConfig = false;
  showDeviceGrps = false;
  showProfiles = false;
  showSoftwareImage = false;
  showWorkFlow = false;
  showBlackPageTemplates = true;
  showCommandIQ = true;


  constructor(private translateService: TranslateService, public sso: SsoAuthService, public router: Router) { }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
    if( this.sso.checFoundationScope(AcessModifiers.READ)){
      this.showProfiles = true;
      this.showWorkFlow = true;
      this.showSoftwareImage = true;
      this.showSubnetConfig = true;
      this.showDialPlan = true;
      this.showDeviceGrps = true;
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
