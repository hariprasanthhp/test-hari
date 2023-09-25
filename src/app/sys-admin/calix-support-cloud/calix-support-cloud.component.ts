import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
// import { OrganizationApiService } from '../services/organization-api.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from '../../shared/services/auth.service';
// import { CommonFunctionsService } from '../../flow-config/services/common-functions.service';

@Component({
  selector: 'app-calix-support-cloud',
  templateUrl: './calix-support-cloud.component.html',
  styleUrls: ['./calix-support-cloud.component.scss']
})
export class CalixSupportCloudComponent implements OnInit, OnDestroy {

  language: any;
  acslist: any;
  httpsipv4: any;
  username: any;
  password: any;
  ipv4v6: any;
  httpipv4: any;
  https: any;
  downloadUrl: any;
  uploadUrl: any;
  uploadSize: any;
  speedTestData: any;
  formError: boolean = false;
  apiusername: any;
  apipassword: any;
  captiveurl: any;
  captiveproxy: any;
  apiHttpsUrl: any;
  apiClientPassword: any;
  allsub: any;
  hideACS: boolean = true;
  hideAPI: boolean = true;
  orgData: any;
  id: any;

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
  speedDataadd = {
    _id: "",
    downloadUrl: "",
    uploadUrl: "",
    uploadSize: "",
    username: "",
    password: "",
    name: "",
    apiClientUsername: "",
    apiClientPassword: "",
    url: "",
  };
  ORG_ID: string;
  MODULE: string = 'calixAdmin';

  orgDetails: any;


  acsOld: any;

  orgInfo = {
    "_id": 12884251,
    "name": "(3455)Testing",
    "description": "(3455)Testing",
    "url": "http://gcs-dev.calix.com:8080/12884251/OfndSUM54r",
    "username": "acs-user-uilhr",
    "password": "qeAEKItGKwijGl1",
    "apiClientUsername": "api-user-3JxyE",
    "apiClientPassword": "D5i4zvTKg71WSUt",
    "captivePortalUrl": "http://gcs-dev.calix.com:8080/12884251/OfndSUM54r",
    "internalProxy": "http://gcs-dev.calix.com:8080/12884251/OfndSUM54r"
  };


  aclUsername: string;
  apiUsername: string;
  captiveUrl: string;
  proxy: string;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  spShowButtons: boolean = false;
  acsShowButtons: boolean = false;
  spDataAvail: boolean = false;

  spSaveClicked: boolean = false;
  spDownloadUrlErr: boolean = false;
  spUploadurlErr: boolean = false;
  spUploadSizeErr: boolean = false;
  uploadSizeErrorInfo: string;

  acsSaveClicked: boolean = false;
  acsUsernameErr: boolean = false;
  apiUsernameErr: boolean = false;
  captiveUrlErr: boolean = false;
  proxyErr: boolean = false;

  constructor(
    // private organizationApiService: OrganizationApiService,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
  ) {

  }

  ngOnInit() {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })

  }

  ngOnDestroy() {
    this.commonOrgService.closeAlert();
  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }




}
