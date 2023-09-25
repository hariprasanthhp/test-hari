import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { CommonService } from '../sys-admin/services/common.service';

@Component({
  selector: 'app-org-admin',
  templateUrl: './org-admin.component.html',
  styleUrls: ['./org-admin.component.scss']
})
export class OrgAdminComponent implements OnInit {

  @ViewChild('scrollTopId', { static: true }) private scrollTopId: ElementRef<any>;
  scrollSubs: any;

  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;
  closeSubs: any;
  successSubs: any;
  errorSubs: any;
  showAdmin = false;
  language;
  languageSubject;
  showRecord: any;
  constructor(
    private common: CommonService,
    private titleService: Title,
    private sso: SsoAuthService,
    private translateService: TranslateService,
  ) {
    this.showRecord = this.common.recordView;
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });

    let roles = this.sso.getRoles();
    if (roles && roles.indexOf('OrgAdmin') !== -1) {
      this.showAdmin = true;
    }

    //this.titleService.setTitle('Calix Cloud - Administration');
    this.scrollSubs = this.common.scrollTop.subscribe(() => {
      try {
        this.scrollTop();
      } catch (ex) {
      }
    });

    this.closeSubs = this.common.closeAlerts.subscribe(() => {
      this.closeAlert();
    });

    this.successSubs = this.common.successAlert.subscribe((res: string) => {
      this.openSuccessAlert(res);
    });

    this.errorSubs = this.common.errorAlert.subscribe((res: string) => {
      this.openErrorAlert(res);
    });

  }
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubs) {
      this.scrollSubs.unsubscribe();
    }
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
    if (this.successSubs) {
      this.successSubs.unsubscribe();
    }
    if (this.errorSubs) {
      this.errorSubs.unsubscribe();
    }
  }

  scrollTop() {
    this.scrollTopId.nativeElement.scrollIntoView();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  openSuccessAlert(info: string = 'Error') {
    this.closeAlert();
    if (info) {
      this.successInfo = info;
      this.success = true;
    }

  }

  openErrorAlert(info: string = 'Error') {
    this.closeAlert();
    if (info) {
      this.errorInfo = info;
      this.error = true;
    }

  }

}
