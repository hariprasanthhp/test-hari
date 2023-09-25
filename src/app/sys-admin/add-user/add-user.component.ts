import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { AuthService } from '../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;

  addUserName: string;
  addUserEmail: string;
  addUserFirstName: string;
  addUserLastName: string;
  addUserPassword: string;
  addUserCPassword: string;

  add = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    idpType: "local",
    local: {
      orgId: "50",
      password: ""
    },
    //landingPage: "cmc"
  };

  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  modalRef: any;

  errorTitle: string = '';
  errorBody: string = '';

  saveClicked: boolean = false;
  formError: boolean = false;
  emailError: boolean = false;
  cpassError: boolean = false;

  ORG_ID: string;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  isOrgAdminUsers: boolean = false;
  MODULE: string = 'systemAdministration';
  sysAdminRoute: string = 'systemAdministration';
  addUserSubs: any;
  translateSubscribe: any;
  /* NG Test solved*/
  loader: boolean = false; 
  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private organizationApiService: OrganizationApiService,
    // private auth: AuthService,
    private sso: SsoAuthService,
    private titleService: Title,
    private CommonFunctionsService:CommonFunctionsService
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.isOrgAdminUsers = this.checkOrgAdminUsers(url);
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['addUser']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.currentPageAdder('addUser');
    this.checkAccess();
    this.titleService.setTitle(`${this.language['addUser']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.saveClicked = false;
    this.closeAlert();
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.addUserSubs) {
      this.addUserSubs.unsubscribe();
    }
  }
/* NG Test solved*/
/*   ngAfterViewInit() {
    this.loader = false;
  } */

  addUser() {
    this.saveClicked = true;
    this.validate();
    this.validateEmail();
    if (this.emailError) {
      return;
    }
    let params = this.add;
    if (this.formError) {
      return;
    }

    params.username = this.addUserName;
    params.email = this.addUserEmail;
    params.firstName = this.addUserFirstName;
    params.lastName = this.addUserLastName;
    params.local.password = this.addUserPassword;
    params.local.orgId = `${this.ORG_ID}`;
    this.loader = true;
    this.addUserSubs = this.organizationApiService.UserAdd(params).subscribe((json: any) => {
      this.closeAlert();
      this.successInfo = this.language['User registred successfully'];
      this.success = true;
      this.commonOrgService.pageScrollTop();
      this.loader = false;
      //this.reset();
      setTimeout(() => {
        this.closeAlert();
        this.goToUsersList();
      }, 1000);

    }, (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else if (typeof err.error == 'string' && err.error.indexOf('already exists') > -1) {
        this.errorInfo = this.language['Username already exists'];
      } else if (typeof err.error == 'string') {
        this.errorInfo = `${err.error}`;
      } else {
        this.errorInfo = `${err.message}`;
      }
      this.closeAlert();
      this.error = true;
      this.commonOrgService.pageScrollTop();
      this.loader = false;
      // setTimeout(() => {
      //   this.closeAlert();
      // }, 2000);
    });

  }



  validate() {
    this.formError = false;
    if (!this.addUserName || !this.addUserEmail || !this.addUserPassword || !this.addUserCPassword) {
      this.formError = true;
      return
    }
    if (this.addUserPassword != this.addUserCPassword) {
      this.formError = true;
      return
    }

  }

  validateEmail() {
    this.emailError = !this.commonOrgService.validateEmail(this.addUserEmail);
  }

  validateConfirmPassword() {
    if (this.addUserPassword && this.addUserPassword == this.addUserCPassword) {
      this.cpassError = false;
    } else {
      this.cpassError = true;
    }
  }

  cancel() {
    this.goToUsersList();
  }

  goToUsersList() {
    this.router.navigate([`${this.MODULE}/users`]);
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  checkOrgAdminUsers(url: string) {
    // let tokenData: any;
    // tokenData = JSON.parse(localStorage.getItem('calix.login_data'));
    let org_sfid: any = '';
    org_sfid = this.sso.getOrgSFID();
    let roles = this.sso.getRoles();
    let isSecureAccess = this.sso.isSecureAccess() ? true : false;
    if (!isSecureAccess && url.indexOf('/organization-admin/') > -1 && typeof org_sfid != 'undefined' && (org_sfid == '' || org_sfid == null) && roles.includes('OrgAdmin')) {
      return true;
    }
    return false;

  }

  checkAccess() {
    if (this.MODULE != this.sysAdminRoute && !this.isOrgAdminUsers) {
      this.router.navigate([`/unauthorize`]);
    }

    // let roles = this.sso.getRoles();
    // if (this.MODULE != this.sysAdminRoute || !roles.includes('SysAdmin')) {
    //   this.router.navigate([`/unauthorize`]);
    // }
  }

  reset() {
    this.addUserName = undefined;
    this.addUserEmail = undefined;
    this.addUserFirstName = undefined;
    this.addUserLastName = undefined;
    this.addUserPassword = undefined;
    this.addUserCPassword = undefined;
  }

  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  showPasswords = false;
  toggleShowPasswords() {
    this.showPasswords = !this.showPasswords;
  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}
