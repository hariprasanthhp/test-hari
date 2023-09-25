import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common.service';
// import { CustomTranslateService } from '../../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss']
})
export class SpeedTestComponent implements OnInit, OnDestroy {

  language: any;

  downloadUrl: any;
  uploadUrl: any;
  uploadSize: any;
  speedTestData: any;

  spDataAvail: boolean = false;
  spSaveClicked: boolean = false;
  spDownloadUrlErr: boolean = false;
  spUploadurlErr: boolean = false;
  spUploadSizeErr: boolean = false;
  uploadSizeErrorInfo: string;
  spShowButtons: boolean = false;


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

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  loading: boolean = true;
  translateSubscribe: any;
  spListSubs: any;
  spUpdateSubs: any;
  spAddSubs: any;
  showForm: boolean;

  speedTestResult: any;
  constructor(
    private organizationApiService: OrganizationApiService,
    // private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private sso: SsoAuthService,
    private translateService: TranslateService
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);

    this.commonOrgService.currentPageAdder('csccfg');
    this.getSPList();

  }

  ngOnInit() {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })

    this.commonOrgService.closeAlert();
    this.spShowButtons = false;
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.spListSubs) {
      this.spListSubs.unsubscribe();
    }

    if (this.spAddSubs) {
      this.spAddSubs.unsubscribe();
    }

    if (this.spUpdateSubs) {
      this.spUpdateSubs.unsubscribe();
    }


  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.translateService.changeLanguage(language);
  }

  // ----Get Speedtest
  getSPList() {
    this.spListSubs = this.organizationApiService.GetSpeedTestData(this.ORG_ID).subscribe((speedres: any) => {
      if (speedres && typeof speedres == 'object' && Object.keys(speedres).length && speedres.tr143Servers && speedres.tr143Servers.length) {
        this.speedTestResult = speedres;
        this.speedTestData = speedres.tr143Servers[0];
        this.downloadUrl = this.speedTestData.downloadUrl;
        this.uploadUrl = this.speedTestData.uploadUrl;
        this.uploadSize = this.speedTestData.uploadSize;
        this.spDataAvail = true;
        //this.spShowButtons = true;
        this.loading = false;
      }
      this.showForm = true;
    }, (err: HttpErrorResponse) => {
      if (err.status != 404) {
        this.pageErrorHandle(err);
      } else {
        this.showForm = false;
        this.errorInfo = this.language['No organization found with the given query filter!'];
        this.commonOrgService.openErrorAlert(this.errorInfo);
      }
      this.loading = false;
    });
  }

  // ** Speed Test Save ** //
  spSave() {
    if (this.speedTestData && (this.speedTestData.downloadUrl || this.speedTestData.uploadUrl || this.speedTestData.uploadSize)) {
      this.updatespeedtestdata();
    } else {
      // if (!this.speedTestData || (this.speedTestData && (!this.speedTestData.downloadUrl && !this.speedTestData.uploadUrl && !this.speedTestData.uploadSize))) {
      //   this.errorInfo = this.language['No organization found with the given query filter!'];
      //   this.commonOrgService.openErrorAlert(this.errorInfo);
      // }
      //this.addSpeedTestData(); //in 21.1 update only
    }
  }

  addSpeedTestData() {
    this.spSaveClicked = true;
    this.spValidation();
    if (this.spDownloadUrlErr || this.spUploadurlErr || this.spUploadSizeErr) {
      return;
    }

    let params = this.speedDataadd;

    params._id = this.ORG_ID;
    params.username = this.speedTestData.username;
    params.password = this.speedTestData.password;
    params.apiClientUsername = this.speedTestData.apiClientUsername;
    params.apiClientPassword = this.speedTestData.apiClientPassword;
    params.downloadUrl = this.downloadUrl;
    params.uploadUrl = this.uploadUrl;
    params.uploadSize = this.uploadSize;
    params.url = this.speedTestData.url;
    this.loading = true;
    this.spAddSubs = this.organizationApiService.AddSpeedTestData(params).subscribe((json: any) => {
      this.successInfo = 'Speedtest data added Successfully';
      this.success = true;
      this.commonOrgService.openSuccessAlert(this.successInfo);
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.commonOrgService.closeAlert();
      }, 2500);
      this.resetSpeedtestForm();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    });
  }

  // ** Add Speedtest Data Ends ** //

  // ** Update Speedtest Data Starts ** //
  updatespeedtestdata() {
    this.spValidation();
    if (this.spDownloadUrlErr || this.spUploadurlErr || this.spUploadSizeErr) {
      return;
    }

    let params = this.speedDataadd;
    params._id = this.ORG_ID;
    params.username = this.speedTestData.username;
    params.password = this.speedTestData.password;
    params.apiClientUsername = this.speedTestData.apiClientUsername;
    params.apiClientPassword = this.speedTestData.apiClientPassword;
    params.downloadUrl = this.downloadUrl ? this.downloadUrl.trim() : '';
    params.uploadUrl = this.uploadUrl ? this.uploadUrl.trim() : '';
    params.uploadSize = this.uploadSize ? this.uploadSize : 0;
    params.url = this.speedTestData.url;
    this.loading = true;
    let newParams = {
      "backgroundTestEnabled": this.speedTestResult.backgroundTestEnabled ? this.speedTestResult.backgroundTestEnabled : false,
      "defaultPingTarget": this.speedTestResult.defaultPingTarget ? this.speedTestResult.defaultPingTarget : '',
      ratelimit: this.speedTestResult.ratelimit ? this.speedTestResult.ratelimit : null,
      "tr143Servers": [
        {
          "downloadUrl": this.downloadUrl ? this.downloadUrl.trim() : '',
          "uploadUrl": this.uploadUrl ? this.uploadUrl.trim() : '',
          "uploadSize": this.uploadSize ? this.uploadSize : 0
        }
      ]
    };
    this.spUpdateSubs = this.organizationApiService.UpdateSpeedTestData(this.ORG_ID, newParams).subscribe((json: any) => {

      this.successInfo = this.language['Speed test Settings Updated Successfully'];
      this.success = true;
      this.commonOrgService.openSuccessAlert(this.successInfo);
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.commonOrgService.closeAlert();
      }, 2500);
      this.resetSpeedtestForm();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;

    });

  }
  // ** Update Speedtest Data Ends ** //

  // ** Input field chnage show button starts ** //
  on_ChangeInput() {

    if (this.spDataAvail) {
      this.spShowButtons = true;
    } else {
      if (!this.downloadUrl || !this.uploadUrl || !this.uploadSize) {
        this.spShowButtons = false;
      } else {
        this.spShowButtons = true;
      }
    }


  }

  changeDownloadUrl() {
    this.spDownloadUrlErr = true;
    this.on_ChangeInput();
    if (this.downloadUrl != '') {
      this.spDownloadUrlErr = false;
    }
  }

  changeUploadurl() {
    this.spUploadurlErr = true;
    this.on_ChangeInput();
    if (this.uploadUrl != '') {
      this.spUploadurlErr = false;
    }
  }

  changeUploadSize() {
    this.spUploadSizeErr = true;
    this.on_ChangeInput();
    if (this.uploadSize != undefined) {
      this.spUploadSizeErr = false;
    }
    this.setSpUploadSizeErr();
  }

  spValidation() {
    this.spSaveClicked = true;
    if (this.downloadUrl == undefined || this.downloadUrl.trim() == '') {
      this.spDownloadUrlErr = true;
    } else {
      this.spDownloadUrlErr = false;
    }

    if (this.uploadUrl == undefined || this.uploadUrl.trim() == '') {
      this.spUploadurlErr = true;
    } else {
      this.spUploadurlErr = false;
    }

    if (this.uploadSize == undefined || this.uploadSize == 0) {
      this.spUploadSizeErr = true;
      this.setSpUploadSizeErr();

    } else {
      this.spUploadSizeErr = false;
    }


  }

  setSpUploadSizeErr() {
    if (this.uploadSize == undefined) {
      this.uploadSizeErrorInfo = this.language['This field is required'];
    } else {
      this.uploadSizeErrorInfo = this.language['Please enter a value greater than or equal to 1.'];
    }
  }


  resetSpeedtestForm() {
    this.loading = true;
    this.getSPList();
    this.spShowButtons = false;
  }

  //---------Form Reset
  reset() {
    this.downloadUrl = "";
    this.uploadUrl = "";
    this.uploadSize = "";
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
    this.commonOrgService.closeAlert();
    this.commonOrgService.openErrorAlert(this.errorInfo);
    this.commonOrgService.pageScrollTop();
  }

}
