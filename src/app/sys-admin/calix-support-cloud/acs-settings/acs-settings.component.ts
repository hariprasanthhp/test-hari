import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common.service';
// import { CustomTranslateService } from '../../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../../shared/services/auth.service';
import { CommonFunctionsService } from '../../../flow-config/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-acs-settings',
  templateUrl: './acs-settings.component.html',
  styleUrls: ['./acs-settings.component.scss']
})
export class AcsSettingsComponent implements OnInit, OnDestroy {

  language: any;
  acslist: any;

  password: any;
  apiHttpsUrl: any;
  apiClientPassword: any;
  allsub: any;
  hideACS: boolean = true;
  hideAPI: boolean = true;
  orgData: any;

  acsIPv4Url: any;
  acsIPv6Url: any;
  cpeAcsUrl: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  modalRef: any;

  errorTitle: string = '';
  errorBody: string = '';
  acsServerAlias: any;

  add = {
    orgId: "",
    cpeAcsUrl: "",
    username: "",
    password: "",
    acsIPv6Url: "",
    apiURL: "",
    https: "",
    apiClientUsername: "",
    apiClientPassword: "",
    captiveurl: "",
    captiveproxy: "",

  };

  ORG_ID: string;
  MODULE: string = 'calixAdmin';

  orgDetails: any;


  acsOld: any;

  aclUsername: string;
  apiUsername: string;
  captiveUrl: string;
  proxy: string;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  acsShowButtons: boolean = false;
  acsSaveClicked: boolean = false;
  acsUsernameErr: boolean = false;
  apiUsernameErr: boolean = false;
  captiveUrlErr: boolean = false;
  proxyErr: boolean = false;
  loading: boolean = true;
  translateSubscribe: any;
  getACSListSubs: any;
  getOrgDetailSubs: any;
  createACSSubs: any;
  acsUpdateSubs: any;
  isCalixAdminModule: boolean = false;
  acsPasswordErr: boolean = false;
  apiClientPasswordErr: boolean = false;
  constructor(
    private organizationApiService: OrganizationApiService,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    // private auth: AuthService,
    private commonFunctionsService: CommonFunctionsService,
    private sso: SsoAuthService,
    private titleService: Title,
    private common:common
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.isCalixAdminModule = this.checkModule(url);
    this.commonOrgService.currentPageAdder('csccfg');
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));
    this.getACSList();

  }

  ngOnInit() {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['acsConfig']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['acsConfig']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.commonOrgService.closeAlert();
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.getACSListSubs) {
      this.getACSListSubs.unsubscribe();
    }

    if (this.getOrgDetailSubs) {
      this.getOrgDetailSubs.unsubscribe();
    }

    if (this.createACSSubs) {
      this.createACSSubs.unsubscribe();
    }

    if (this.acsUpdateSubs) {
      this.acsUpdateSubs.unsubscribe();
    }

  }

  // languageChange(language) {
  //   sessionStorage.setItem('defaultLanguage', language)
  //   this.translateService.changeLanguage(language);
  // }


  getACSList() {
    this.getACSListSubs = this.organizationApiService.ACSList(this.ORG_ID).subscribe((resp: any) => {

      if (resp && Object.keys(resp).length !== 0) {
        this.acsOld = resp;
        this.acslist = this.dataProcess(resp);
        this.aclUsername = this.acslist.orgInfo.username;
        this.apiUsername = this.acslist.orgInfo.apiClientUsername;
        this.captiveUrl = this.acslist.orgInfo.captivePortalUrl ? this.acslist.orgInfo.captivePortalUrl : '';
        this.proxy = this.acslist.orgInfo.internalProxy ? this.acslist.orgInfo.internalProxy : '';
        this.acsServerAlias = this.acslist.orgInfo.serverAlias ? this.acslist.orgInfo.serverAlias : '';
        this.acsIPv4Url = this.acslist.orgInfo.acsIPv4Url;
        this.password = this.acslist.orgInfo.password;
        this.acsIPv6Url = this.acslist.acsIPv6Url;
        this.cpeAcsUrl = this.acslist.cpeAcsUrl;
        this.apiHttpsUrl = this.acslist.apiHttpsUrl;
        this.apiClientPassword = this.acslist.orgInfo.apiClientPassword;

        this.resetValidations();
        this.getOrgDetails();
        this.loading = false;
      } else {
        this.createNew();
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  dataProcess(data) {

    let url = data.orgInfo.url;
    let arr = url.split("/");
    let result = arr[0] + "//" + arr[2];

    let rArr = result.split(':');

    rArr = ['https', rArr[1], data.acsHttpsPort]

    let newUrl = rArr.join(':') + '/' + arr[arr.length - 2] + '/' + arr[arr.length - 1];

    let nArr = newUrl.split('/');

    if (nArr.length > 3) {
      data.acsIPv6Url += `/${nArr[3]}`;
    }

    if (nArr.length > 4) {
      data.acsIPv6Url += `/${nArr[4]}`;
    }


    data.acsIPv6Url = data.acsIPv6Url;


    url = data.orgInfo.url;
    arr = url.split("/");
    result = arr[0] + "//" + arr[2];

    rArr = result.split(':');

    rArr = ['https', rArr[1], data.acsHttpsPort]

    data.orgInfo.url = rArr.join(':') + '/' + arr[arr.length - 2] + '/' + arr[arr.length - 1];
    data.orgInfo.acsIPv4Url = data.orgInfo.url;

    url = data.apiURL;
    arr = url.split("/");
    result = arr[0] + "//" + arr[2];

    rArr = result.split(':');
    rArr = ['https', rArr[1], data.apiHttpsPort]

    data.apiURL = rArr.join(':');
    data.apiHttpsUrl = data.apiURL;

    return data;

  }



  createNew() {
    this.getOrgDetailSubs = this.organizationApiService.OrganzationDetail(this.ORG_ID).subscribe((res: any) => {
      this.orgDetails = res;
      if (this.orgDetails) {
        this.createACS();
      } else {
        this.loading = false;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  getOrgDetails() {
    this.loading = false;
    this.organizationApiService.OrganzationDetail(this.ORG_ID).subscribe((res: any) => {
      this.orgDetails = res;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  createACS() {
    let params = {
      _id: this.orgDetails.calixOrganization.id,
      name: this.orgDetails.calixOrganization.name,
      description: this.orgDetails.calixOrganization.description ? this.orgDetails.calixOrganization.description : '',
      oracleId: this.orgDetails.calixOrganization.oracleId ? this.orgDetails.calixOrganization.oracleId : this.orgDetails.calixOrganization.oracleId,
      spid: this.orgDetails.spId
    }

    this.createACSSubs = this.organizationApiService.ACSAdd(params).subscribe((res: any) => {
      this.getACSList();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });

  }

  showPass(type) {
    if (type == 'acs') {
      this.hideACS = !this.hideACS;
    } else {
      this.hideAPI = !this.hideAPI;
    }

  }

  acsSave() {

    this.acsSaveClicked = true;
    this.validateACSUsernames();

    if (this.acsUsernameErr || this.apiUsernameErr || this.acsPasswordErr || this.apiClientPasswordErr) {
      return;
    }

    if (this.captiveUrl != undefined && this.captiveUrl != '' && !this.commonFunctionsService.validateURL(this.captiveUrl)) {
      return;
    }

    let params = {
      _id: this.acslist.orgInfo._id,
      name: this.orgDetails.calixOrganization.name,
      description: this.orgDetails.calixOrganization.description ? this.orgDetails.calixOrganization.description : '',
      url: this.acslist.orgInfo.url ? this.acslist.orgInfo.url : '',
      username: this.aclUsername ? this.aclUsername : '',
      // password: this.acslist.orgInfo.password ? this.acslist.orgInfo.password : '', /* CCL-43163 */
      password: this.password ? this.password : '', /* CCL-43163 */
      apiClientUsername: this.apiUsername ? this.apiUsername : '',
      // apiClientPassword: this.acslist.orgInfo.apiClientPassword ? this.acslist.orgInfo.apiClientPassword : '', /* CCL-43163 */
      apiClientPassword: this.apiClientPassword ? this.apiClientPassword : '', /* CCL-43163 */
      captivePortalUrl: this.captiveUrl ? this.captiveUrl : null,
      internalProxy: this.proxy ? this.proxy : '',
      serverAlias: this.acsServerAlias ? this.acsServerAlias.trim() : ''
    }

    this.loading = true;
    this.acsUpdateSubs = this.organizationApiService.ACSUpdate(params, this.ORG_ID).subscribe((json: any) => {

      this.successInfo = this.language['ACS Settings Updated Successfully'];
      this.success = true;
      this.commonOrgService.openSuccessAlert(this.successInfo);
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.commonOrgService.closeAlert();
      }, 2500);

      this.getACSList();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  validateACSUsernames() {
    this.acsUsernameErr = false;
    this.apiUsernameErr = false;
    if (this.aclUsername.trim() == '') {
      this.acsUsernameErr = true;
    }

    if (this.apiUsername.trim() == '') {
      this.apiUsernameErr = true;
    }

    if (this.password.trim() == '') {
      this.acsPasswordErr = true;
    }

    if (this.apiClientPassword.trim() == '') {
      this.apiClientPasswordErr = true;
    }

  }

  changeAclUsername() {
    this.acsUsernameErr = false;
    if (this.aclUsername == '') {
      this.acsUsernameErr = true;
    }
    this.on_ChangeACSInput();
  }

  changeApiUsername() {
    this.apiUsernameErr = false;
    if (this.apiUsername == '') {
      this.apiUsernameErr = true;
    }
    this.on_ChangeACSInput();
  }

  changeCaptiveUrl() {
    this.captiveUrlErr = false;
    if (this.captiveUrl != '' && !this.commonFunctionsService.validateURL(this.captiveUrl)) {
      this.captiveUrlErr = true;
    }
    this.on_ChangeACSInput();
  }

  on_ChangeACSInput() {
    if (!this.aclUsername || !this.apiUsername || !this.captiveUrl || !this.proxy || !this.acsServerAlias.trim() || !this.password || !this.apiClientPassword) {
      this.acsShowButtons = true;
    }
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  resetACSList() {
    this.loading = true;
    this.getACSList();
  }

  resetValidations() {
    this.acsShowButtons = false;
    this.acsSaveClicked = false;
    this.acsUsernameErr = false;
    this.apiUsernameErr = false;
    this.captiveUrlErr = false;
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.commonOrgService.closeAlert();
    this.commonOrgService.openErrorAlert(this.errorInfo);
    this.commonOrgService.pageScrollTop();
  }

  checkModule(url: string) {
    let sysAdmin = `${environment.SYS_ADMIN_ROUTE}`;
    if (url.indexOf(`/${sysAdmin}/`) > -1) {
      return true;
    }
    return false;
  }

  changeAcsPassword() {
    this.acsPasswordErr = false;
    if (this.password === '') {
      this.acsPasswordErr = true;
    }
    this.on_ChangeACSInput();
  }

  changeApiClientPassword() {
    this.apiClientPasswordErr = false;
    if (this.apiClientPassword === '') {
      this.apiClientPasswordErr = true;
    }
    this.on_ChangeACSInput();
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
}
