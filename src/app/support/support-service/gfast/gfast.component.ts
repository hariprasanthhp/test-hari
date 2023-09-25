import { Component, OnInit } from '@angular/core';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { SupportServiceService } from '../services/support-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gfast',
  templateUrl: './gfast.component.html',
  styleUrls: ['./gfast.component.scss']
})
export class GfastComponent implements OnInit {

  metaData: any = {};
  language;
  languageSubject;
  orgId = this.sso.getOrgId();
  loader: boolean;
  deviceInfo: any;
  serialNumberSelected: any;
  alertMessage: any;
  isError: boolean;
  gfastCollection = [];
  gfastRecord: any = {};

  constructor(
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private supportService: SupportServiceService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.gfastData();
  }

  gfastData() {
    this.loader = true;
    this.deviceInfo = sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`)? JSON.parse(sessionStorage.getItem(`${this.sso.getTabId()}calix.deviceData`)):'';
    this.serialNumberSelected = this.deviceInfo ? this.deviceInfo[0]?.serialNumber : '';

    this.supportService.getGfastData(this.serialNumberSelected, this.orgId).subscribe((res: any) => {
      this.loader = false;
      if (res && res.length) {
        this.gfastCollection = res[0]["result"];
        if (this.gfastCollection) {
          this.gfastCollection.forEach(obj => {
            obj.Upstream = ((obj.Upstream || 0) / Math.pow(1000, 2));
            obj.Downstream = ((obj.Downstream || 0) / Math.pow(1000, 2));
          });
          this.gfastRecord = this.gfastCollection[0];
        } else {
          this.gfastRecord = {};
        }
      }
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 408) {
      this.alertMessage = this.language.Time_Out
    }
    this.isError = true;
  }

}
