import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ColorPickerService } from 'ngx-color-picker';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, CheckScopes, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { environment } from 'src/environments/environment';
import { WhitelabelService } from '../../../shad/service/whitelabel.service';

@Component({
  selector: 'app-commandiq-pro',
  templateUrl: './commandiq-pro.component.html',
  styleUrls: ['./commandiq-pro.component.scss'],
  providers: [ColorPickerService]

})
export class CommandiqProComponent implements OnInit {
  language;
  languageSubject;
  isActive: boolean = false;
  spId: any
  whitelabellist: any = [];
  hideAdd: boolean;
  editvisibility: boolean;
  addWhitelabel: boolean = false;
  spid: any;
  spidfromservice: any;
  appname: any;
  primarycolor: any;
  logo: any;
  appicon: any;
  timestamp: number;

  showSuccess = this.routerService.showSuccess;
  createdWhiteLabel = '';
  updateSuccessMessage: boolean = this.routerService.updateSuccessMessage;
  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: any;
  getOrgInfoSubs: any;
  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';
  showCreateBtn: boolean;
  showUpdateBtn: boolean;
  errorMsg: string;
  showError: boolean;

  constructor(private service: WhitelabelService,
    private router: Router,
    private sso: SsoAuthService,
    private routerService: RouterService,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,
  ) {
    let url = this.router.url;
    if (url.indexOf('/shad/') === -1) {
      this.isShad = false;
      this.ADMIN_ORG_ID = this.sso.getOrganizationID(url);
      this.REDIRECT_URL = this.sso.getRedirectModule(url);
      this.SPID = this.sso.getAdminSPID(this.ADMIN_ORG_ID);
      //this.SPID = this.sso.getSPID();
    } else {
      this.SPID = this.sso.getSPID();
    }
    if (url.indexOf('/foundation-configuration/') > -1) {
      this.REDIRECT_URL = 'cco-foundation/foundation-configuration/configuration-settings';
    }
    this.commonOrgService.currentPageAdder('commandWorx');

  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    this.routerService.setShowSuccess(false);
    this.routerService.setCreateFlag(false);
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();
  }

  ngOnInit(): void {
    let scope = this.sso.getScopes();
    let url = this.router.url;
    // let validateScopeStage = false;
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   validateScopeStage = true;
    // } else validateScopeStage = false;
    if (url.indexOf('/shad/') !== -1) {
      if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('write') !== -1) {
        this.showCreateBtn = true;
        this.showUpdateBtn = true;
      }
    } else {
      //foundation scope check
      if (this.sso.checkAdminScopes(AcessModifiers.WRITE)) {
        this.showCreateBtn = true;
        this.showUpdateBtn = true;
      }

    }

    //this.getWhitelabel();
    if (!this.SPID && !this.isShad) {
      this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
        this.sso.setAdminOrgInfo(res);
        if (res && res.spId) {
          this.SPID = res.spId;
          this.list();
        }

      }, (err: HttpErrorResponse) => {
      })
    } else {
      this.list();
    }
    //this.list();

    this.spid = this.sso.getSPID();

    setTimeout(() => {
      this.showSuccess = false;
      this.createdWhiteLabel = '';
    }, 5000);

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['CommandIQ_BIZ']} - ${this.language['Mobile App']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['CommandIQ_BIZ']} - ${this.language['Mobile App']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    if (this.updateSuccessMessage) {
      this.createdWhiteLabel = this.routerService.getCreateFlag() ? this.language['Created Successfully'] : this.language['Updated Succesfully'];
    }


  }

  hideSuccess() {
    this.showSuccess = false;
    this.createdWhiteLabel = '';
  }


  getWhitelabel() {
    this.showError = false;
    var saveFile = this.sso.getSPID()
    this.service.spinfo(saveFile).toPromise().then((response: any) => {
      this.addWhitelabel = false;
      this.list();
    }).catch((err: any) => {
      if (err?.error?.errorType == 404) {
        this.addWhitelabel = true;
      }
    });

  }

  list() {
    var saveFile = this.sso.getSPID()
    this.service.commandIqList(this.SPID).toPromise().then((res: any) => {
      this.timestamp = new Date().getTime();
      //this.service.whiteLabellist(this.SPID).subscribe((res: any) => {
      let errorCode = res["errorType"];
      if (errorCode != 404) {
        this.hideAdd = true;
        this.editvisibility = false;
        this.whitelabellist.push(res);
        this.spidfromservice = res.body.spid;
        this.appname = res.body.appName;
        this.primarycolor = res.body.primaryColor;
        this.logo = res.body.primaryLogo;
        this.appicon = res.body.whiteLogo;
        this.isActive = res.body.isActive;
      } else {
        this.hideAdd = false;
        this.editvisibility = true;
        this.whitelabellist = [];
      }

      if (this.whitelabellist.length > 0) {
        this.hideAdd = false;
        this.editvisibility = true;
      } else {
        this.hideAdd = true;
        this.editvisibility = false;
        this.whitelabellist = [];
      }

      this.addWhitelabel = false;
      /*}, (err: any) => {
        if (err.error.errorType == 404) {
          this.addWhitelabel = true;
        }
      })*/
    }).catch((err: any) => {
      this.addWhitelabel = true;
      //this.dataAvailable = true;
      if (err.status == 401) {
        this.errorMsg = err.statusText ? err.statusText : "Unauthorized User";
        this.showError = true;
      }
    });


  }

  update() {
    if (this.isShad) {
      this.router.navigate([`/shad/commandWorx-update`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandWorx-update`]);
    }
    //this.router.navigate(['/shad/whitelabel-update']);
  }

  createWhiteLabel() {
    if (this.isShad) {
      this.router.navigate([`/shad/commandWorx-create`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandWorx-create`]);
    }
  }

  hideError() {
    this.showError = false;
  }

}
