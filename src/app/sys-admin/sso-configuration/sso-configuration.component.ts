import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-sso-configuration',
  templateUrl: './sso-configuration.component.html',
  styleUrls: ['./sso-configuration.component.scss']
})
export class SsoConfigurationComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;
  formError: boolean = false;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('updateModal', { static: true }) private updateModal: TemplateRef<any>;

  SSOconfigData: any;
  id: any;
  entity: string;
  acs: string;
  emaildomainname: string;
  idp: string;
  ssologin: string;
  ssologout: string;
  orgData: any;
  orgId: any;
  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;
  modalTitle: string;
  modalInfo: string;
  modalInfocontent: string;
  modalTitle2: string;
  savebuttonDisabled: boolean;
  deletebuttonDisabled: boolean;
  logoutFieldHide: boolean;


  add = {
    _id: "",
    domain: "",
    orgId: "",
    type: "saml",
    config: {
      sp_options: {
        entity_id: "https://cloud-stg.calix.com/sso-metadata",
        assert_endpoint: "https://cloud-stg.calix.com/sso-acs?samlid=nEtmrw7czte5eDmv4"
      },
      idp_options: {
        sso_login_url: "",
        sso_logout_url: "",
        certificates: "",
      }
    }
  };

  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  modalRef: any;

  errorTitle: string = '';
  errorBody: string = '';

  configId: any;
  ORG_ID: string;
  generatedId: string;
  domain: string;
  loading: boolean = true;
  HOSTDATA: any;
  translateSubscribe: any;
  getConfigSubs: any;
  ssoUpdateSubs: any;
  ssoAddSubs: any;
  ssoDeleteSubs: any;
  MODULE: string;
  constructor(
    private commonOrgService: CommonService,
    private organizationApiService: OrganizationApiService,
    private router: Router,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title,
    private common:common,

  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.currentPageAdder('sso');
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));
    this.getHostData();

    this.MODULE = this.sso.getRedirectModule(url);
  }

  ngOnInit() {

    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['ssoconfig']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['ssoconfig']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.success = false;
    this.error = false;
    this.logoutFieldHide = true;

    this.reset();
    //this.getSSOConfigData();
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.getConfigSubs) {
      this.getConfigSubs.unsubscribe();
    }

    if (this.ssoUpdateSubs) {
      this.ssoUpdateSubs.unsubscribe();
    }

    if (this.ssoAddSubs) {
      this.ssoAddSubs.unsubscribe();
    }

    if (this.ssoDeleteSubs) {
      this.ssoDeleteSubs.unsubscribe();
    }


  }

  getHostData() {
    this.organizationApiService.GetHostData('assets/config/config.json').subscribe((res: any) => {
      this.HOSTDATA = res;
      this.getSSOConfigData();
    });
  }


  getSSOConfigData() {
    this.getConfigSubs = this.organizationApiService.SSOConfigGet(this.ORG_ID).subscribe((res: any) => {
      if (res && typeof res == 'object' && res._id != undefined) {
        this.SSOconfigData = res;
        this.configId = res._id;
        this.entity = this.SSOconfigData.config.sp_options.entity_id ? this.SSOconfigData.config.sp_options.entity_id : '';
        this.acs = this.SSOconfigData.config.sp_options.assert_endpoint ? this.SSOconfigData.config.sp_options.assert_endpoint : '';
        this.emaildomainname = this.SSOconfigData.domain;
        this.idp = this.SSOconfigData.config.idp_options.certificates;
        this.ssologin = this.SSOconfigData.config.idp_options.sso_login_url;
        this.ssologout = this.SSOconfigData.config.idp_options.sso_logout_url;

        this.deletebuttonDisabled = false;
        this.savebuttonDisabled = true;
        this.loading = false;

      } else {
        this.showDefaultData();
      }

    }, (err: HttpErrorResponse) => {

      this.deletebuttonDisabled = true;
      this.showDefaultData();
      if (err.status != 404) {
        this.pageErrorHandle(err);
      }
    },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
  }

  showDefaultData() {

    //this.domain = window.location.origin ? window.location.origin : `https://cloud-dev.calix.com`;
    this.domain = this.HOSTDATA.apiURL ? this.HOSTDATA.apiURL : environment['SSO_API_URL'];
    this.generatedId = this.makeid(17);
    this.entity = `${this.domain}/sso-metadata`;
    if (this.HOSTDATA.isCAInstance) {
      this.acs = `${this.domain}/v1/authentication/samlcacallback?samlid=${this.generatedId}`;
    } else {
      this.acs = `${this.domain}/v1/authentication/samlcallback?samlid=${this.generatedId}`;
    }

    this.loading = false;
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  save() {
    if (this.configId) {
      this.updateConfirmModal();
    } else {
      this.addSSO();
    }
  }

  updateConfirmModal() {
    this.modalInfocontent = undefined;
    if (this.emaildomainname == undefined || this.emaildomainname == '' || !this.validateDomain(this.emaildomainname)) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Domain Name Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.idp == undefined || this.idp.trim() == '') {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Certificate Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologin == undefined || this.ssologin.trim() == '' || !this.validateURL(this.ssologin.trim())) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Login URL Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologout == undefined || this.ssologout.trim() == '') {
      // || !this.validateURL(this.ssologout.trim())
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Logout URL Not Valid'];
      this.openErrorModal();
      return;
    }

    this.modalTitle = this.language['Warning'];
    this.modalInfo = this.language['Current SSO settings will be overwritten.'];
    this.modalInfocontent = this.language['Are you sure you want to continue?'];
    this.openUpdateModal();
  }

  updateSSO() {
    if (this.emaildomainname == undefined || this.emaildomainname == '' || !this.validateDomain(this.emaildomainname)) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Domain Name Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.idp == undefined || this.idp.trim() == '') {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Certificate Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologin == undefined || this.ssologin.trim() == '' || !this.validateURL(this.ssologin.trim())) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Login URL Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologout == undefined || this.ssologout.trim() == '') {
      // || !this.validateURL(this.ssologout.trim())
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Logout URL Not Valid'];
      this.openErrorModal();
      return;
    }

    let params = this.add;
    params._id = this.configId;
    params.orgId = this.ORG_ID;
    params.type = "saml";
    if (this.SSOconfigData && this.SSOconfigData.config.sp_options) {
      params.config.sp_options.entity_id = this.SSOconfigData.config.sp_options.entity_id;
      params.config.sp_options.assert_endpoint = this.SSOconfigData.config.sp_options.assert_endpoint;
    } else {
      params.config.sp_options.entity_id = this.entity;
      params.config.sp_options.assert_endpoint = this.acs;
    }
    // params.config.sp_options.entity_id = this.entity;
    // params.config.sp_options.assert_endpoint = this.acs;
    params.domain = this.emaildomainname;
    params.config.idp_options.certificates = this.idp;
    params.config.idp_options.sso_login_url = this.ssologin;
    params.config.idp_options.sso_logout_url = this.ssologout;
    this.loading = true;

    this.closeModal();
    this.ssoUpdateSubs = this.organizationApiService.SSOConfigUpdate(params, this.configId).subscribe((json: any) => {
      this.closeAlert();
      this.successInfo = this.language['SSO Configuration Updated Successfully'];
      this.success = true;
      this.loading = false;
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
      this.getSSOConfigData();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;

    });

  }


  // ** Update SSO configuration Field ** //

  addSSO() {
    let params = this.add;
    if (this.emaildomainname == undefined || this.emaildomainname == '' || !this.validateDomain(this.emaildomainname)) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Domain Name Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.idp == undefined || this.idp.trim() == '') {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['Certificate Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologin == undefined || this.ssologin.trim() == '' || !this.validateURL(this.ssologin.trim())) {
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Login URL Not Valid'];
      this.openErrorModal();
      return;
    } else if (this.ssologout == undefined || this.ssologout.trim() == '') {
      // || !this.validateURL(this.ssologout.trim())
      this.modalTitle = this.language['Error'];
      this.modalInfo = this.language['SSO Logout URL Not Valid'];
      this.openErrorModal();
      return;
    } else {

      params._id = this.generatedId;
      params.orgId = this.ORG_ID;
      params.type = "saml";
      if (this.SSOconfigData && this.SSOconfigData.config.sp_options) {
        params.config.sp_options.entity_id = this.SSOconfigData.config.sp_options.entity_id;
        params.config.sp_options.assert_endpoint = this.SSOconfigData.config.sp_options.assert_endpoint;
      } else {
        params.config.sp_options.entity_id = this.entity;
        params.config.sp_options.assert_endpoint = this.acs;
      }

      params.domain = this.emaildomainname;
      params.config.idp_options.certificates = this.idp;
      params.config.idp_options.sso_login_url = this.ssologin;
      params.config.idp_options.sso_logout_url = this.ssologout;

      this.loading = true;
      this.closeModal();
      this.ssoAddSubs = this.organizationApiService.SSOConfigAdd(params).subscribe((json: any) => {

        this.closeAlert();
        this.successInfo = this.language['SSO Configuration added Successfully'];
        this.success = true;
        this.loading = false;
        this.commonOrgService.pageScrollTop();
        setTimeout(() => {
          this.closeAlert();
        }, 2500);
        this.getSSOConfigData();

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      });
    }



  }

  on_ChangeInput() {
    if ((this.emaildomainname != undefined && this.emaildomainname.length) || (this.idp != undefined && this.idp.length) || (this.ssologin != undefined && this.ssologin.length) || (this.ssologout != undefined && this.ssologout.length)) {
      this.savebuttonDisabled = false;
    } else {
      this.savebuttonDisabled = true;
    }

  }

  domainChange() {
    if (this.SSOconfigData == undefined) {
      this.on_ChangeInput();
    } else {
      if (this.emaildomainname == this.SSOconfigData.domain) {
        this.savebuttonDisabled = true;
      } else {
        this.savebuttonDisabled = false;
      }
    }

  }

  idpChange() {
    if (this.SSOconfigData == undefined) {
      this.on_ChangeInput();
    } else {
      if (this.idp == this.SSOconfigData.config.idp_options.certificates) {
        this.savebuttonDisabled = true;
      } else {
        this.savebuttonDisabled = false;
      }
    }
  }

  ssoLoginChange() {
    if (this.SSOconfigData == undefined) {
      this.on_ChangeInput();
    } else {
      if (this.ssologin == this.SSOconfigData.config.idp_options.sso_login_url) {
        this.savebuttonDisabled = true;
      } else {
        this.savebuttonDisabled = false;
      }
    }
  }

  ssoLogoutChange() {
    if (this.SSOconfigData == undefined) {
      this.on_ChangeInput();
    } else {
      if (this.ssologout == this.SSOconfigData.config.idp_options.sso_logout_url) {
        this.savebuttonDisabled = true;
      } else {
        this.savebuttonDisabled = false;
      }
    }
  }


  // ** Delete SSO Page Info Starts** //

  deleteSSOinfo() {
    this.modalTitle = this.language['Warning'];
    this.modalInfo = this.language['Current SSO settings will be deleted.'];
    this.modalInfocontent = this.language['Are you sure you want to continue?'];
    this.openDeleteModal();
  }

  confirmDeleteSecleted() {
    if (this.configId == undefined) {
      return;
    }
    this.loading = true;
    this.closeModal();
    this.ssoDeleteSubs = this.organizationApiService.SSOConfigDelete(this.configId).subscribe((json: any) => {
      this.closeAlert();
      this.successInfo = this.language['SSO Configuration Deleted Successfully'];
      this.success = true;
      this.loading = false;
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
      this.reset();
      this.getSSOConfigData();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });

  }
  // ** Delete SSO Page Info Ends ** //

  reset() {
    this.entity = '';
    this.acs = '';
    this.emaildomainname = "";
    this.idp = "";
    this.ssologin = "";
    this.ssologout = "";

    this.SSOconfigData = undefined;
    this.configId = undefined;
    this.savebuttonDisabled = true;
    this.deletebuttonDisabled = true;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.translateService.changeLanguage(language);
  }

  openDeleteModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  openUpdateModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.updateModal, { backdrop: 'static', keyboard: false });
  }

  openErrorModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  validateDomain(str) {
    //return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(str);
    return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/ig.test(str) && this.notEndsWithDot(str); // to fix CCL-39315
  }

  validateURL(str) {
    return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(str);
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

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

  notEndsWithDot(str) {
    str = str ? str.trim() : '';
    if (str && str.length > 1 && str.substring(str.length - 1, str.length) !== '.') {
      return true
    }
    return false;

  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
}
