import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
// import { AuthService } from '../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.scss']
})
export class OrganizationInfoComponent implements OnInit, OnDestroy {

  pageAvailable: boolean = false;
  language: any;
  // orgInfoData: any = { calixOrganization};
  orgInfoData: any = { calixOrganization: {} };
  // orgInfoData.calixOrganization = {};
  orgInfoEntitlementdata: any;
  orgInfoSpID: any;
  orginfoname: any;
  orgData: any;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  ORG_ID: string;
  loading: boolean = true;
  translateSubscribe: any;
  errorInfo: any;
  error: boolean;
  orgDetailSubs: any;
  orgInfoSubs: any;
  MODULE: string;
  constructor(
    private commonOrgService: CommonService,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private organizationApiService: OrganizationApiService,
    private router: Router,
    // private auth: AuthService,
    private sso: SsoAuthService,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.currentPageAdder('orginfo');
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));

    this.MODULE = this.sso.getRedirectModule(url);
    
  }

  ngOnInit() {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['orginfo']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['orginfo']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.getorgInfoData();
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.orgDetailSubs) {
      this.orgDetailSubs.unsubscribe();
    }

    if (this.orgInfoSubs) {
      this.orgInfoSubs.unsubscribe();
    }

  }

  getorgInfoData() {
    this.orgDetailSubs = this.organizationApiService.orgInformation(this.ORG_ID).subscribe((res: any) => {
      this.orgInfoData = res;
      this.orgInfoSpID = res.spId;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);

    })
    this.orgInfoSubs = this.organizationApiService.orgInfoEntitlement(this.ORG_ID).subscribe((result: any) => {
      this.orgInfoEntitlementdata = result;
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  // languageChange(language) {
  //   sessionStorage.setItem('defaultLanguage', language)
  //   this.translateService.changeLanguage(language);
  // }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.commonOrgService.pageScrollTop();
  }

  closeAlert() {
    this.error = false;
  }

}
