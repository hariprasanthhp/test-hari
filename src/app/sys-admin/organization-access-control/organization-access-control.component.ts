import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { CommonFunctionsService } from '../../flow-config/services/common-functions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-organization-access-control',
  templateUrl: './organization-access-control.component.html',
  styleUrls: ['./organization-access-control.component.scss']
})
export class OrganizationAccessControlComponent implements OnInit, OnDestroy {

  createSubnetName: string;
  createView: boolean;
  createCurrentSubnet: any;
  createSubnets: any = [];
  allSubnets: any = [];
  language: any;
  add: [];
  allsub: any = [];
  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;


  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;

  subnetError: boolean = false;
  invalidSubnet: boolean = false;

  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  modalRef: any;

  errorTitle: string = '';
  errorBody: string = '';
  formError: boolean = false;
  showBtns: boolean = false;
  orgData: any;
  ORG_ID: string;
  subnetErrorInfo: string = 'Invalid Subnet';

  oldSubnets: any = [];
  isRerender: boolean = false;
  loading: boolean = true;
  translateSubscribe: any;
  aclListSubs: any;
  aclAddSubs: any;
  aclDeleteSubs: any;
  MODULE: string;
  constructor(
    private commonOrgService: CommonService,
    private commonFunctionsService: CommonFunctionsService,
    // private customTranslateService: CustomTranslateService,
    private organizationApiService: OrganizationApiService,
    private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    private titleService: Title,
    private common:common
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.currentPageAdder('orgacl');
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
      this.titleService.setTitle(`${this.language['orgacl']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['orgacl']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.success = false;
    this.error = false;
    this.showBtns = false;
    this.getACLList();

  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.aclListSubs) {
      this.aclListSubs.unsubscribe();
    }

    if (this.aclAddSubs) {
      this.aclAddSubs.unsubscribe();
    }

    if (this.aclDeleteSubs) {
      this.aclDeleteSubs.unsubscribe();
    }

  }

  getACLList() {
    this.loading = true;
    this.aclListSubs = this.organizationApiService.AclList(this.ORG_ID).subscribe((resp: any) => {
      if (typeof resp == 'object') {
        this.allSubnets = resp;
        this.allsub = resp.acl != undefined ? [...resp.acl] : [];
        this.oldSubnets = resp.acl != undefined ? [...resp.acl] : [];
        this.showBtns = true;
      } else {
        this.allSubnets = [];
        this.allsub = [];
        this.oldSubnets = [];
        this.showBtns = false;
      }

      if (this.isRerender) {
        this.showBtns = false;
      }

    }, (err: HttpErrorResponse) => {
      if (err.status == 404) {
        this.allSubnets = [];
        this.allsub = [];
        this.oldSubnets = [];
      } else {
        this.pageErrorHandle(err);
      }
      this.showBtns = false;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }


  validateSubnet(subnet: string): void {
    this.subnetError = false;
    if (!subnet) {
      this.subnetErrorInfo = this.language['Invalid subnet'];
      this.subnetError = true;
    }
    let ip = this.commonFunctionsService.trimSubnet(subnet);
    if (ip) {
      if (!this.commonFunctionsService.isValidSubnetV4(ip) && !this.commonFunctionsService.isValidSubnetV6(ip)) {
        this.subnetError = true;
        this.subnetErrorInfo = this.language['Invalid subnet'];
      }
    } else {
      this.subnetError = true;
      this.subnetErrorInfo = this.language['Invalid subnet'];
    }

  }

  addSubnet() {
    this.subnetError = false;
    if (this.createCurrentSubnet == undefined || this.createCurrentSubnet == "") {
      this.subnetError = true;
      this.subnetErrorInfo = this.language['Subnet cannot be empty'];
      return;
    }

    this.validateSubnet(this.createCurrentSubnet);

    if (this.subnetError) {
      return;
    }

    if (this.createSubnets.filter(e => e === this.createCurrentSubnet).length > 0) {
      this.subnetError = true;
      this.subnetErrorInfo = this.language['Subnet already added'];
      return;
    }

    this.allsub.push(this.createCurrentSubnet);
    this.createCurrentSubnet = "";
    this.subnetError = false;
    this.showBtns = true;
  }

  removeSubnet(rid) {
    this.allsub.splice(rid, 1);
    this.showBtns = true;
    if (!this.allsub.length && !this.oldSubnets.length) {
      this.showBtns = false;
    }

  }

  saveSubnet() {

    if (this.allsub.length) {
      this.updateSubnet();
    } else {
      this.deleteSubnet();
    }


  }

  updateSubnet() {
    this.loading = true;
    this.aclAddSubs = this.organizationApiService.AclAdd(this.allsub, this.ORG_ID).subscribe((json: any) => {
      this.successInfo = this.language['Organization Acl updated Successfully'];
      this.success = true;
      this.commonOrgService.pageScrollTop();
      this.resetData(); // gets new Data
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
      this.subnetError = false;   
      this.subnetErrorInfo = '';
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });

  }

  deleteSubnet() {
    this.loading = true;
    this.aclDeleteSubs = this.organizationApiService.AclDelete(this.ORG_ID).subscribe((json: any) => {
      this.successInfo = this.language['Organization Acl updated Successfully'];
      this.success = true;
      this.commonOrgService.pageScrollTop();
      this.resetData(); // gets new Data
      this.subnetError = false;   
      this.subnetErrorInfo = '';
      setTimeout(() => {
        this.closeAlert();
      }, 2500);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.translateService.changeLanguage(language);
  }

  resetData() {
    this.isRerender = true;
    this.getACLList();
  }


  closeAlert() {
    this.error = false;
    this.success = false;
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

  subnetChange() {
    if (!this.createCurrentSubnet) {
      this.subnetError = false;
    }
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
}
