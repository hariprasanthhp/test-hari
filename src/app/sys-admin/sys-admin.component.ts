import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router, Event } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.scss']
})
export class SysAdminComponent implements OnInit, OnDestroy {
  @ViewChild('scrollTopId', { static: true }) private scrollTopId: ElementRef<any>;
  scrollSubs: any;

  language;
  languageSubject;

  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;
  closeSubs: any;
  successSubs: any;
  errorSubs: any;
  rouerSubs: any;
  showRecord: any;
  constructor(
    private common: CommonService,
    private router: Router,
    private translateSerice: TranslateService,
    private titleService: Title
  ) {
    this.showRecord = this.common.recordView;
    //this.titleService.setTitle('Calix Cloud - System Administration');
    this.rouerSubs = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.common.closeAlert();
      }
    });

    this.language = this.translateSerice.defualtLanguage;
    this.languageSubject = this.translateSerice.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    //this.titleService.setTitle('Calix Cloud - System Administration');
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

    if (this.rouerSubs) {
      this.rouerSubs.unsubscribe();
    }

    this.languageSubject.unsubscribe();
  }

  scrollTop() {
    this.scrollTopId.nativeElement.scrollIntoView();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  openSuccessAlert(info: string) {
    if (info) {
      this.successInfo = info;
      this.success = true;
    }

  }

  openErrorAlert(info: string) {
    if (info) {
      this.errorInfo = info;
      this.error = true;
    }

  }

}
