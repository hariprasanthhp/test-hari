import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';

@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.scss']
})
export class MobileAppComponent implements OnInit {
  language: any;
  languageSubject: any;
  currentPage: string = 'commandIq';
  orgInfoSubs: any;
  orgInfoEntitlementdata: any;
  showCommandIqBiz = false;
  ORG_ID: any;
  constructor(
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private organizationApiService: OrganizationApiService,
    public router: Router,
    private translateService: TranslateService
  ) { 
    let url = this.router.url;
    this.currentPage = url.split('/').pop();
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.getorgInfoData();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
    this.commonOrgService.currentPageData.subscribe((data: any) => {
      this.currentPage = data ? data : 'commandIq';
    });
  }

  ngOnDestroy(): void {
    if (this.orgInfoSubs) {
      this.orgInfoSubs.unsubscribe()
    }
  }

  getorgInfoData() {
    this.orgInfoSubs = this.organizationApiService.orgInfoEntitlement(this.ORG_ID).subscribe((result: any) => {
      this.orgInfoEntitlementdata = result;

      if (result) {
        let obj = {};
        for (let i = 0; i < this.orgInfoEntitlementdata?.length; i++) {

          obj[this.orgInfoEntitlementdata[i].appType] = this.orgInfoEntitlementdata[i];

        }
        if ((obj[218] && obj[218].status !== 'Expired')) {
          this.showCommandIqBiz = true;
        } else {
          this.showCommandIqBiz = false;
        }
      }
    })
  }

}
