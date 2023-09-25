import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
var CryptoJS = require('crypto-js');
@Component({
  selector: 'app-constant-configuration',
  templateUrl: './constant-configuration.component.html',
  styleUrls: ['./constant-configuration.component.scss']
})
export class ConstantConfigurationComponent implements OnInit {

  @ViewChild('hubspotModal', { static: true }) private hubspotModal: TemplateRef<any>;
  @ViewChild('successConnectModal', { static: true }) private successConnectModal: TemplateRef<any>;
  @ViewChild('saveConnectModal', { static: true }) private saveConnectModal: TemplateRef<any>;
  @ViewChild('successConnectErrorModal', { static: true }) private successConnectErrorModal: TemplateRef<any>;
  @ViewChild('successLoadingModal', { static: true }) private successLoadingModal: TemplateRef<any>;
  @ViewChild('errorMailModal', { static: true }) private errorMailModal: TemplateRef<any>;
  @ViewChild('testConnectionBlur') testConnectionBlur: ElementRef;
  code: any;
  accessToken = '';
  serverPrefix = '';
  serviceUrl: any = '';
  clientId = '';
  clientSecret = '';
  refreshbtn: any;
  hasAudienceList: boolean = false;
  // clientId = '891410219098';
  // clientSecret = '73a79a3cf91327d8d3596c3a0f63898bca4f8f6a4f9cce8d41';
  tokenUrl = 'https://login.hubspot.com/oauth2/token';
  metaDataUrl = 'https://login.hubspot.com/oauth2/metadata';
  loading = true;
  validConstantToken = false;
  constantStatus = 'Not Configured';
  statusSelected: any;
  checkValid: boolean = false
  audienceSelected: any;
  statusSelec: any = '';
  key: any
  u_id: any
  ListId: any = ''
  Status: any
  statusData = []
  message = ''
  audiencePostSuccess: boolean = false
  language: any;
  languageSubject: any;
  constantPostError: boolean = false;
  constantPostErrorMsg: string;
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
    private titleService: Title,
    private sso: SsoAuthService) {

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
      if (this.focusElement === 'hubspot') {
        this.openHubSpot();
      } else if (this.focusElement == 'successConnect' || this.focusElement == 'errorConnect') {
        this.closeModal();
      } else if (this.focusElement == 'saveConnect') {
        this.openMarketingChannel();
      } else if (this.focusElement == 'removeConnection') {
        this.remove_connection();
      }
      this.focusElement = '';
    }
  }
  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Constant_Contact_Config_Title"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    });
    this.titleService.setTitle(`${this.language["Constant_Contact_Config_Title"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.clientId = environment.CONSTANT_CLIENT_ID;
    this.serviceUrl = `${WindowRefService.prototype.nativeWindow}/engagement/channels/constantcontactconfig`;
    this.getMrktngChnlAuth(0);
  }
  openHubSpot() {
    window.location.href = (`https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${this.clientId}&redirect_uri=${this.serviceUrl}&state=U2FsdGVkX1+FijwueDBRD5toBWXOmqBR1mT/k3HHw3Q=&response_type=code&scope=contact_data+campaign_data+offline_access`);
    this.dialogService.dismissAll();

  }
  hubspotModalOpen() {
    this.dialogService.open(this.hubspotModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'hubspot';
  }

  successConnectModalOpen() {
    this.dialogService.open(this.successConnectModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'successConnect';
    // setTimeout(() => {
    //   this.dialogService.dismissAll();
    // }, 5000);
  }
  successConnectErrorModalOpen() {
    this.dialogService.open(this.successConnectErrorModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'errorConnect';
  }
  saveConnectModalOpen() {
    this.dialogService.open(this.saveConnectModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'saveConnect';
    // setTimeout(() => {
    //   this.openMarketingChannel();
    // }, 5000);
  }
  closeModal() {
    this.dialogService.dismissAll();
    this.focusElement = '';
  }
  openMarketingChannel() {
    this.dialogService.dismissAll();
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })
  }
  successLoadingModalOpen() {
    this.dialogService.open(this.successLoadingModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });

  }
  errorMailModalOpen() {
    this.dialogService.open(this.errorMailModal, { size: 'lg', centered: true, windowClass: 'custom-xs-modal', backdrop: 'static', keyboard: false });
    this.focusElement = 'removeConnection';
  }

  getMrktngChnlAuth(val) {
    this.constantPostError = false;
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/ConstantContact`).subscribe((json: any) => {

      if (json && json.status) {
        if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
          this.validConstantToken = true;
          this.key = json['key']
          this.u_id = json['id']
          if (json.hasOwnProperty('audienceList') && json['audienceList'] != null && json['audienceList'] != "" && json['audienceList'] != undefined) {
            this.hasAudienceList = true;
            this.audienceSelected = json['audienceListName']
          } else {
            this.hasAudienceList = false;
          }
          this.Status = json['status']
          this.sso.setValidConstantAuth(true);
          // if (val == 0) {
          //   this.getAudience(0);
          // }

        } else {
          this.sso.setValidConstantAuth(false);
        }

        this.constantStatus = json.status;

      }
      this.loading = false;

    }, (err: any) => {

      this.loading = false;
      if (err.status === 404) {
        this.constantStatus = this.language.Not_Configured;
      } else if (err.status === 504) {
        this.constantPostError = true;
        this.constantPostErrorMsg = this.language.timeoutErrorError;
      }

    });

  }
  selectstatus(event) {
    this.ListId = event.id
    this.statusSelec = event.name
    this.checkValid = false

  }
  errorReset() {
    this.audiencePostSuccess = false;
  }
  updateAudi() {
    this.hasAudienceList = false;
  }
  saveAudi() {
    if (this.ListId == null || this.ListId == "" || this.ListId == undefined) {
      this.checkValid = true
    } else {
      this.checkValid = false
      let params = {
        "channelName": "ConstantContact",
        "orgId": this.sso.getOrgId(),
        "listId": this.ListId,
        "status": this.Status,
        "listName": this.statusSelec
      };

      this.http.put(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization`, params).subscribe((json: any) => {

        if (json && json.status) {
          this.loading = false;

          if (json['status'].toLowerCase() === 'valid' || json['status'].toLowerCase() === 'active' || json['status'].toLowerCase() === 'success') {
            this.message = this.language.Successfully_Saved
            this.saveConnectModalOpen()
          } else {
            this.message = json['status'].toLowerCase()
            this.audiencePostSuccess = true;
          }
        } else {
          this.loading = false;
          this.message = this.language.Not_Saved
          this.audiencePostSuccess = true;
        }
      }, (err: any) => {

        this.loading = false;

      });
    }
  }
  refreshAudience(val) {
    this.refreshbtn = document.getElementById('serviceDataRefresh');
    this.refreshbtn.children[0].classList.add('spin-animation');
    // this.getAudience(val)
  }
  getAudience(val) {
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/lists/ConstantContact`).subscribe((json: any) => {

      if (this.refreshbtn != null && this.refreshbtn != undefined) {
        this.refreshbtn.children[0].classList.remove('spin-animation');
      }
      if (json) {
        this.statusData = json
        if (this.statusData.length > 0) {
          if (val == 1) {
            this.successConnectModalOpen()
          }
        } else {
          if (val == 1) {
            this.successConnectErrorModalOpen()
          }
        }
      } else {
        if (val == 1) {
          this.successConnectErrorModalOpen()
        }
      }
    });
  }
  closeComponent() {
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })
  }

  remove_connection() {
    this.http.delete(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/` + this.u_id).subscribe((json: any) => {

      this.dialogService.dismissAll();
      this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })

    }, (err: any) => {

    });
  }
  testConnection() {
    // this.loading = true;
    this.successLoadingModalOpen();
    this.testConnectionBlur.nativeElement.blur();
    this.getTestconnection('ConstantContact').subscribe((res: any) => {

      if (res.status == 200) {
        this.dialogService.dismissAll();

        this.successConnectModalOpen()
      } else {
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      }
    }, (err: any) => {

      this.loading = false;
      if (err.status === 404 || err.status === 404) {
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      } else if (err.status === 401) {
        this.dialogService.dismissAll();
        this.successConnectErrorModalOpen()
      }

    });
    // this.getAudience(1);
    // this.getMrktngChnlAuth(1)
  }

  getTestconnection(mail) {
    return this.http.post(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/authorization/test/${mail}`, {});
  }
  errorResetTab() {
    this.constantPostErrorMsg = "";
    this.constantPostError = false;
  }



}
