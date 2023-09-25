import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { Title } from '@angular/platform-browser';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-facebook-configuration',
  templateUrl: './facebook-configuration.component.html',
  styleUrls: ['./facebook-configuration.component.scss']
})
export class FacebookConfigurationComponent implements OnInit {
  @ViewChild('facebookModal', { static: true }) private facebookModal: TemplateRef<any>;
  @ViewChild('mailchimpModal', { static: true }) private mailchimpModal: TemplateRef<any>;
  @ViewChild('successConnectModal', { static: true }) private successConnectModal: TemplateRef<any>;
  @ViewChild('saveConnectModal', { static: true }) private saveConnectModal: TemplateRef<any>;
  @ViewChild('successConnectErrorModal', { static: true }) private successConnectErrorModal: TemplateRef<any>;
  @ViewChild('successLoadingModal', { static: true }) private successLoadingModal: TemplateRef<any>;
  @ViewChild('successFbLoadingModal', { static: true }) private successFbLoadingModal: TemplateRef<any>;
  @ViewChild('errorMailModal', { static: true }) private errorMailModal: TemplateRef<any>;
  @ViewChild('testConnectionBlur') testConnectionBlur:ElementRef;
  code: any;
  fbApiKey: any;
  fbBussines: any
  u_id = '';
  accessToken = '';
  audiencefaild: boolean = false
  serverPrefix = '';
  serviceUrl: any = '';
  clientId = '';
  clientSecret = '';
  facebookError: boolean;
  facebookErrorCon: boolean = false
  facebookexpired: boolean = false
  facebookErrorMsg: string;
  hasAudienceList: boolean = false;
  facebookconnection: boolean = false
  loading = true;
  loading1: boolean = false
  validMailchimpToken = false;
  mailchimpStatus = 'Not Configured';
  statusSelected: any;
  checkValid: boolean = false
  checkValid1: boolean = false
  audienceSelected: any;
  statusSelec: any = '';
  key: any
  ListId: any = ''
  Status: any
  statusData = []
  message = ''
  audiencePostSuccess: boolean = false
  checkValid2: boolean = false
  language: any;
  languageSubject: any;
  checkBox: boolean = false
  saveEnable: boolean = true
  rem_active: boolean = false;
  validApiKey: boolean = false;
  validAccountId: boolean = false;
  validCheck: boolean = false;
  // statusData = [
  //   {
  //     "id": "fedcba74321",
  //     "name": "Calix CMC Audience"
  //   }
  // ]
  constructor(private dialogService: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private marketingHomeApiService: MarketingHomeApiService,
    private titleService: Title,
    private sso: SsoAuthService,
    private CommonFunctionsService:CommonFunctionsService,) {

  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  @HostListener('window:popstate', ['$event'])
  onBrowserBackBtnClose(event: Event) {

    event.preventDefault();
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "", replaceUrl: true } });
  }
  focusElement: string = '';
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key === 'Enter' && this.focusElement) {
      if (this.focusElement === 'facebook') {
        this.openMailchimp();
      } else if (this.focusElement == 'successConnect' || this.focusElement == 'saveConnect') {
        this.openMarketingChannel();
      } else if (this.focusElement == 'errorConnect') {
        this.closeModalOk();
      } else if (this.focusElement == 'errorMail') {
        this.remove_connection();
      }
      this.focusElement = '';
    }
  }
  ngOnInit(): void {
    
    this.loading = false;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Facebook Marketing Channel Configuration"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    });
    this.titleService.setTitle(`${this.language["Facebook Marketing Channel Configuration"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.apiCall()

  }
  apiCall() {
    this.getMrktngChnlFaceAuth();
  }
  openMailchimp() {
    // window.location.href = (`https://developers.facebook.com/`);
    window.open(`https://developers.facebook.com/`, '_blank');
    // this.rem_active = true
    // this.facebookconnection = true
    this.dialogService.dismissAll();
  }
  facebookModalOpen() {
    this.dialogService.open(this.facebookModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'facebook';
  }
  mailchimpModalOpen() {
    this.dialogService.open(this.mailchimpModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
  }
  errorMailModalOpen() {
    this.dialogService.open(this.errorMailModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'errorMail';
  }
  getMrktngChnlFaceAuth() {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/Facebook`).subscribe((json: any) => {


      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.facebookconnection = true;
          this.facebookError = false;
          this.facebookexpired = false

          this.fbApiKey = json['key']
          this.fbBussines = json['audienceList']
          this.u_id = json['id']
          this.rem_active = true
          // this.validFacebookToken = true;
          // this.sso.setValidMailChimpAuth(true);
          // this.facebookStatus = "Active";
        } else {
          if (json['status'] == 'Failed - Expired') {
            this.facebookexpired = true
          } else {
            this.facebookexpired = false
          }
          this.fbApiKey = json['key']
          this.fbBussines = json['audienceList']
          this.u_id = json['id']
          this.rem_active = true

        }
      }
      this.loading = false;

    }, (err: any) => {
      this.facebookconnection = false;

      if (err.status == 504 || err.status == 502) {
        this.facebookError = true;
        this.facebookErrorMsg = this.language.timeoutErrorError;
        return;
      }
      else
        if (err.status == 500) {
          this.facebookError = true;
          this.facebookErrorMsg = this.language.internalServerError;;
          return;
        }
        else if (err.status == 400) {
          this.facebookError = true;
          if (err.error) {
            return err.error
          } else {
            this.facebookErrorMsg = this.language.errorOccured;
            return;
          }
        }
      // else if (err.error) {
      //   let errorMsg = err.error.errorDesc;
      //   this.facebookErrorMsg = errorMsg ? errorMsg : err.error;
      // }
      this.loading = false;
    });
  }
  errorReset() {
    this.loading = false;
    this.facebookconnection = false;
    this.facebookError = false;
  }

  checkValue(event) {
    if (event.target.checked) {
      this.checkBox = true
      this.checkValid2 = false
      this.validCheck = true;
      if (this.fbApiKey == undefined && this.fbBussines == undefined) {
        this.enableFb();
      } else {
        this.enableFb1()
      }
      // console.log(this.fbApiKey, "dfewrgwreg", this.fbBussines)

      // if ((this.fbApiKey == undefined) &&
      //   (this.fbBussines == undefined)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey == undefined) &&
      //   (this.fbBussines != undefined)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey != undefined) &&
      //   (this.fbBussines == undefined)) {
      //   this.saveEnable = true
      // } else {
      //   this.enableFb();
      // }
    } else {
      this.validCheck = false;
      this.saveEnable = true
      this.checkBox = false
    }
  }
  handleChange(event) {
    if (event.target.value != null && event.target.value.length > 0) {
      // if ((this.fbApiKey == null && this.fbApiKey == "" && this.fbApiKey == undefined) &&
      //   (this.fbBussines == null && this.fbBussines == "" && this.fbBussines == undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey == null && this.fbApiKey == "" && this.fbApiKey == undefined) &&
      //   (this.fbBussines != null && this.fbBussines != "" && this.fbBussines != undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey != null && this.fbApiKey != "" && this.fbApiKey != undefined) &&
      //   (this.fbBussines == null && this.fbBussines == "" && this.fbBussines == undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else {
      this.validApiKey = true;
      this.enableFb();
      //this.saveEnable = false
      //}
    } else {
      // if (event.target.value.length == 0) {
      //   this.saveEnable = true
      // }
      // this.saveEnable = true
      this.validApiKey = false;
      this.saveEnable = true
    }
  }

  enableFb() {
    if (((this.fbApiKey != '' && this.fbApiKey != undefined) || this.validApiKey) && this.validCheck && ((this.fbBussines != '' && this.fbBussines != undefined) || this.validAccountId)) {
      this.saveEnable = false
    }
    else {
      this.saveEnable = true

    }
  }
  enableFb1() {
    if ((this.fbApiKey != '' && this.fbApiKey != undefined) && this.validCheck && (this.fbBussines != '' && this.fbBussines != undefined)) {
      this.saveEnable = false
    }
    else {
      this.saveEnable = true

    }
  }
  handleChange1(event) {
    //debugger;
    if (event.target.value != null && event.target.value.length > 0) {
      // if ((this.fbApiKey == null && this.fbApiKey == "" && this.fbApiKey == undefined) &&
      //   (this.fbBussines == null && this.fbBussines == "" && this.fbBussines == undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey == null && this.fbApiKey == "" && this.fbApiKey == undefined) &&
      //   (this.fbBussines != null && this.fbBussines != "" && this.fbBussines != undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else if ((this.fbApiKey != null && this.fbApiKey != "" && this.fbApiKey != undefined) &&
      //   (this.fbBussines == null && this.fbBussines == "" && this.fbBussines == undefined) && (!this.checkBox)) {
      //   this.saveEnable = true
      // } else {
      //   this.saveEnable = false
      // }
      this.validAccountId = true;
      this.enableFb();
    } else {
      // if (event.target.value.length == 0) {
      //   this.saveEnable = true
      // }
      // this.saveEnable = true
      this.validAccountId = false;
      this.saveEnable = true
    }
  }
  savefb() {
    this.testConnectionBlur.nativeElement.blur();
    if (this.fbApiKey == null || this.fbApiKey == "" || this.fbApiKey == undefined) {
      this.checkValid = true
    } else if (this.fbBussines == null || this.fbBussines == "" || this.fbBussines == undefined) {
      this.checkValid = false
      this.checkValid1 = true
    } else {
      this.checkValid = false
      this.checkValid1 = false
      if (this.checkBox) {
        let params = {
          "channelName": "Facebook",
          "orgId": this.sso.getOrgId(),
          "key": this.fbApiKey,
          "listId": this.fbBussines
        };

        this.successFbLoadingModalOpen()
        this.http.put(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

          if (json && json.status) {
            this.loading = false;

            if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
              this.message = this.language.Successfully_Saved
              //  this.saveConnectModalOpen()
              this.dialogService.dismissAll();
              this.successConnectModalOpen()
              this.audiencePostSuccess = false;
              this.apiCall()
            } else {
              this.audiencePostSuccess = true;
              this.closeModal()
              if (json['status'].toLowerCase() === 'failed') {
                this.audiencefaild = false
                //  this.message = this.language.Facebook_invalid
                this.dialogService.dismissAll();
                this.apiCall()
                this.successConnectErrorModalOpen()
              } else {
                this.audiencefaild = false
                this.message = json['status'].toLowerCase()
                this.dialogService.dismissAll();
                this.apiCall()
                this.successConnectErrorModalOpen()
              }

            }
          } else {
            this.loading = false;
            this.message = this.language.Not_Saved
            this.audiencePostSuccess = true;
          }
        }, (err: any) => {

          this.loading = false;

          if (err.status === 404) {
            this.dialogService.dismissAll();
            this.successConnectErrorModalOpen()
          } else if (err.status === 401) {
            this.dialogService.dismissAll();
            this.successConnectErrorModalOpen()
          } else {
            this.closeModal()
            this.dialogService.dismissAll();
            this.successConnectErrorModalOpen()
          }
          // if (err.status === 500) {
          //   this.message = this.language.Successfully_notSaved
          //   this.audiencePostSuccess = true;
          //   this.dialogService.dismissAll();
          //   this.successConnectErrorModalOpen()
          // }
        });
      } else {
        this.checkValid2 = true
      }
    }
  }
  successConnectModalOpen() {
    this.dialogService.open(this.successConnectModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'successConnect';
    // setTimeout(() => {
    //   this.openMarketingChannel()
    // }, 5000);
  }
  successConnectErrorModalOpen() {
    this.dialogService.open(this.successConnectErrorModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'errorConnect';
  }
  saveConnectModalOpen() {
    this.dialogService.dismissAll();
    this.dialogService.open(this.saveConnectModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'saveConnect';
  }
  closeModal() {
    this.dialogService.dismissAll();
    this.focusElement = '';
  }
  closeModalOk() {
    this.apiCall()
    this.dialogService.dismissAll()

  }
  openMarketingChannel() {
    this.dialogService.dismissAll();
    this.apiCall()
    // this.router.navigate(['/marketing/engagement-channel'], { state: { value: 'channel' || "" } })
  }
  successLoadingModalOpen() {
    this.dialogService.open(this.successLoadingModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });

  }
  successFbLoadingModalOpen() {
    this.dialogService.open(this.successFbLoadingModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });

  }
  closeComponent() {
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })
  }

  onclose() {
    this.audiencePostSuccess = false
  }
  testConnection() {
    // this.loading = true;
    this.successLoadingModalOpen();

    this.getTestconnection('Facebook').subscribe((res: any) => {
      if (res.status == 200) {
        this.dialogService.dismissAll();
        this.apiCall()
        this.successConnectModalOpen()
      } else {
        this.apiCall()
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      }
      //  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&1&")
    }, (err: HttpErrorResponse) => {
      // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
      this.loading = false;
      if (err.status === 404) {
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      } else if (err.status === 401) {
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      }

    });

  }

  getTestconnection(mail) {
    return this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/test/${mail}`, {});
  }
  remove_connection() {
    this.http.delete(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/` + this.u_id).subscribe((json: any) => {

      this.dialogService.dismissAll();
      this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })

    }, (err: any) => {

    });
  }
}