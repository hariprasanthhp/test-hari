import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationsService } from '../services/organizations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;
  alertVisible: boolean = false;
  secondalertVisible: boolean = false;
  successalertvisible: boolean = false;
  modalRef: any;

  orgName: string = '';
  orgDescription: string = '';
  nameError: boolean;
  nameErrorInfo: string;
  successInfo: string;
  success: boolean;

  add = {
    name: "",
    description: "",
    externalOrgRef: null,
    salesforceId: null,
    oracleId: null,
    parentId: null,
    capStatus: null,
    capOverride: null,
    capExpires: null,
    bypassCAP: false,
    inheritList: null,
    parentOrgName: null,
    territory: null,
    cloudGeography: null,
    country: null
  };

  loader: boolean = false;
  translateSubscribe: any;
  addSubs: any;
  constructor(
    private router: Router,
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,
    private api: OrganizationsService,
    private titleService: Title,
    private CommonFunctionsService:CommonFunctionsService,
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['addOrganization']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.currentPageAdder('organizations');
    this.titleService.setTitle(`${this.language['addOrganization']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.success = false;
    this.nameError = false;
  }

  ngOnDestroy(): void {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.addSubs) {
      this.addSubs.unsubscribe();
    }
  }


  goToOrgList() {
    this.router.navigate(['systemAdministration/organizations']);
  }

  addNewOrg() {
    this.nameError = false;
    this.validation();
    if (this.nameError) {
      return;
    }

    let params = this.add;
    params.name = this.orgName;
    params.description = this.orgDescription ? this.orgDescription : '';

    this.loader = true;
    this.addSubs = this.api.AddOrg(params).subscribe((res: any) => {
      this.loader = false;
      this.successInfo = 'Organization added Successfully';
      this.success = true;
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.closeAlert();
        this.goToOrgList();
      }, 1000);

    }, (err: HttpErrorResponse) => {
      this.loader = false;
      if (err.status == 401) {
        this.nameErrorInfo = this.language['Access Denied'];
      } else if (err.status == 500) {
        this.nameErrorInfo = `Internal Server Error`;
      } else {
        if (err.error != undefined && typeof err.error == 'object' && err.error.errorMessage) {
          this.nameErrorInfo = `${err.error.errorMessage}`;
        } else {
          this.nameErrorInfo = `${err.message}`;
        }
      }
      this.closeAlert();
      this.commonOrgService.pageScrollTop();
      this.nameError = true;
    });
  }

  validation(): void {
    let name = this.orgName.trim();
    if (name == '') {
      this.nameErrorInfo = this.language['Organization name is mandatory!'];
      //this.nameErrorInfo = 'Organization name must be of at least 2 letters';
      this.nameError = true;
      this.alertVisible = true;
      this.secondalertVisible = false;
      this.successalertvisible = false;
    } else if (name.length < 2) {
      this.nameErrorInfo = this.language['Organization name must be of at least 2 letters'];
      this.nameError = true;
      this.secondalertVisible = true;
      this.alertVisible = false;
      this.successalertvisible = false;
    } else { }
  }

  cancel() {
    this.goToOrgList();
  }

  closeAlert() {
    this.success = false;
    this.nameError = false;
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.nameErrorInfo = this.language['Access Denied'];
    } else {
      this.nameErrorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.nameError = true;
  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}
