declare var require: any;
import { Component, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {
  Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, ActivatedRoute
} from '@angular/router';
import { SsoAuthService } from "../app/shared/services/sso-auth.service";
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
const borderRadius = require('highcharts-border-radius')

borderRadius(Highcharts);
import * as Highcharts from 'highcharts';
import { fromEvent, Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { preserveWhitespacesDefault, ThrowStmt } from '@angular/compiler';
import { CustomTranslateService } from './shared/services/custom-translate.service';
import { CommonService } from './sys-admin/services/common.service';
import { RouterService } from 'src/app-services/routing.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('tosModal', { static: true }) private tosModal: TemplateRef<any>;
  @ViewChild('declineTOSModal', { static: true }) private declineTOSModal: TemplateRef<any>;
  @ViewChild('apigeeErrorModal', { static: true }) private apigeeErrorModal: TemplateRef<any>;
  @ViewChild('refreshModal', { static: true }) private refreshModal: TemplateRef<any>;

  loading = true;

  body: any;
  tosAgreed = true;
  errorMsg: any;
  modalRef: any;
  isLogout = false;
  language: any;
  languageSubject: Subscription;

  ngbModalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false,
    windowClass: 'custom-md-modal'
  };

  loadingRouteConfig: boolean;
  date = new Date();
  updateLaterClicked = false;
  isUpdateAnimation: boolean = true;
  isUpdateAvailable: boolean = false;
  constructor(private router: Router, private sso: SsoAuthService,
    private http: HttpClient,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
    private elementRef: ElementRef,
    private commonOrgService: CommonService,
    private routerService: RouterService,
  ) {

    this.detectRptPathPrm();
    if (!sessionStorage.getItem('defaultLanguage')) {
      sessionStorage.setItem('defaultLanguage', 'en');
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
    this.router.events.subscribe((ev) => {
      if (ev instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (ev instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }

      if (ev instanceof NavigationEnd) {
        this.loadingRouteConfig = false;
        this.routerService.previousUrl = this.routerService.currentUrl ? this.routerService.currentUrl : '';
        this.routerService.currentUrl = ev && ev.url ? ev.url : '';
      }

    });

  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("calix.loggedIn"))) {
      this.commonOrgService.initUpdateCronJob(false);
    }
    this.commonOrgService.isNewVersionAvailable.subscribe((response: any) => {
      this.isUpdateAnimation = response.isUpdateAnimation;
      this.isUpdateAvailable = response.isUpdateAvailable;
    });
    const url = new URL(window.location.href);
    // setTimeout(() => {
    //   window.location.reload();
    // },1000)
    if (url.pathname.includes('/subscriber/search') || history?.state?.externalUser) {
      let param = {};
      const urlSplit = window.location.href.split('?')
      if (urlSplit.length > 1) {
        param = urlSplit[1].split('&').map(obj => {
          const keyValue = obj.split('=');
          return { [keyValue[0]]: keyValue[1] };
        }).reduce((prev, curr) => Object.assign(prev, curr), {})
      }
      const params = {
        'subscriberLocationId': encodeURIComponent(decodeURIComponent(param['subscriberLocationId'] || '').trim()),
        'ticketId': encodeURIComponent(param['ticketId'])
      }
      sessionStorage.setItem('outsideUser', JSON.stringify({ url: url.pathname, param: params, externalUser: true }))
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });

    //this.checkRightClicksForNewTab();
    //this.checkDataAvailableForNewTab();
    this.sso.setTabId(Math.random().toString());
    //this.getActiveTabsParam();
    //this.sso.changeStorage();
    this.getPageName();
    this.watchActiveLogin();
    this.watchIdleTime();
    this.receiveLogoutFlag();
    this.checkUserActivityIdle();
    this.catchApigeeError();
  }

  checkDataAvailableForNewTab() {
    if (localStorage.sessionStorage && !sessionStorage.length) {
      Object.entries(JSON.parse(localStorage.sessionStorage)).forEach(arr => {

      })
    }
  }

  checkRightClicksForNewTab() {
    document.addEventListener('contextmenu', function (evt) {
      evt.stopPropagation();
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    }, false);
  }

  intervalId: any;
  lastActivityMs = Date.now();
  IDLE_4_HOURS_MS = 4 * 60 * 60 * 1000;
  IDLE_15_MINUTES_MS = 15 * 60 * 1000;
  idleTimeoutMs;

  watchIdleTime(): any {
    if (environment.API_BASE_URL.indexOf('dev.api.calix.ai') !== -1) {
      //console.log(`idle time out set to ${15 * 60 * 1000} milli seconds`)
      this.idleTimeoutMs = this.IDLE_4_HOURS_MS; // 15 minutes
    } else {
      this.idleTimeoutMs = this.IDLE_4_HOURS_MS; // 15 minutes
    }

    // this.idleTimeoutMs = this.IDLE_4_HOURS_MS;

    this.addSessionTimeoutTimer();

  }

  addDocumentClickEvent(): any {
    fromEvent(document, 'click')
      .subscribe((event) => {
        this.sso.setLastActivityTime();
      });
  }

  checkUserActivityIdle(): void {
    let path = window.location.pathname;

    if (path.indexOf('login') !== -1 || path.indexOf('redirect') !== -1) {
      return;
    }
    if ((this.sso.getLastActivityTime() + this.idleTimeoutMs) < Date.now()) {
      console.log(`Force to Logout for idle TOO long (${this.idleTimeoutMs / 1000 / 60} minutes) --------------------`);
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.isUpdateAvailable = false;
      this.router.navigate(['/logout']);
    }
  }

  addSessionTimeoutTimer() {

    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.intervalId = window.setInterval(() => {
      this.checkUserActivityIdle();
    }, 1 * 60 * 1000);
  };

  watchLoginService: any;
  watchActiveLogin(): any {
    this.loginCheck();
    this.watchLoginService = setInterval(() => {
      this.loginCheck();
    }, 10000);
  }

  logoutSubscribe: any;
  receiveLogoutFlag() {
    this.logoutSubscribe = this.sso.logoutResult$.subscribe((json: any) => {
      this.watchIdleTime();
      if (json.logout) {
        this.isLogout = true;
      } else {
        this.isLogout = false;
      }

    });
  }

  loginCheck() {
    // if (this.isLogout) {
    //   return;
    // }

    if (!this.sso.isLoggedIn()) {
      let path = window.location.pathname;

      if (path.indexOf('login') !== -1 || path.indexOf('redirect') !== -1) {
        return;
      }

      console.log('logged out from other tab');

      const searchParam = new URL(window.location.href).searchParams;
      const param = {
        'subscriberLocationId': (searchParam.get('subscriberLocationId') || '').trim(),
        'ticketId': searchParam.get('ticketId')
      }
      const state = path.includes('/subscriber/search') ? { url: path, param: param, externalUser: true } : {};
      this.router.navigate(['logout'], { state: state });
    }
  }


  loadTosFile(): any {
    this.errorMsg = '';
    this.tosAgreed = false;
    let url = '';
    let entArr = this.sso.getEntitlementsArr();
    this.page = this.sso.getRelativeUrl();

    if (this.page === 'cco') {
      url = `${environment.TOS_API_URL}/coc/${environment.CCO_TOS_MD_HASH}`;
    } else if (this.page === 'foundation') {
      url = `${environment.TOS_API_URL}/foundation/${environment.FOUNDATION_TOS_MD_HASH}`;
    } else if (this.page === 'support') {
      if (entArr.indexOf("118") !== -1) {
        url = `${environment.TOS_API_URL}/support/${environment.CSC_TOS_MD_HASH}`;
      } else {
        url = `${environment.TOS_API_URL}/support_basic/${environment.CSC_BASIC_TOS_MD_HASH}`;
      }
    } else {
      url = `${environment.TOS_API_URL}/marketing/${environment.CMC_TOS_MD_HASH}`;
    }


    this.http.get(url).subscribe((json: any) => {

      if (json.accept) {
        this.tosAgreed = true;
        if (this.page === 'cco') {
          this.sso.setCcoTos(true);
        } else if (this.page === 'foundation') {
          this.sso.setFoundationTos(true);
        } else if (this.page === 'support') {
          this.sso.setCscTos(true);
        } else {
          this.sso.setCmcTos(true);
        }
      } else {
        this.tosAgreed = false;

        this.loadTosModal();
      }

    }, (error: any) => {
      this.errorMsg = this.commonOrgService.pageErrorHandle(error);
      this.tosAgreed = true;
      if (this.page === 'cco') {
        this.sso.setCcoTos(true);
      } else if (this.page === 'foundation') {
        this.sso.setFoundationTos(true);
      } else if (this.page === 'support') {
        this.sso.setCscTos(true);
      } else {
        this.sso.setCmcTos(true);
      }
    });

  }



  loadTosModal() {

    let entArr = this.sso.getEntitlementsArr();
    let appType = '';
    if (this.page === 'cco') {
      appType = 'coc';
    } else if (this.page === 'foundation') {
      appType = 'foundation';
    } else if (this.page === 'support') {
      if (entArr.indexOf("118") !== -1) {
        appType = 'support';
      } else {
        appType = 'support_basic';
      }
    } else {
      if (entArr.indexOf("119") !== -1 || entArr.indexOf("209") !== -1) {
        appType = 'marketing';
      }

    }

    this.acceptBtnDisabled = true;

    let url = `assets/tos/${appType}/tos-agreement.html`;
    this.http.get(url, { responseType: 'text' }).subscribe((text) => {
      this.body = text;
      this.close();
      if (this.page === 'foundation') {
        this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
      } else if (this.page === 'cco') {
        if (this.sso.checkUserHasServiceAccessByAppId("coc")) {
          this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
        } else {
          this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
        }

      } else if (this.page === 'support') {
        if (this.sso.checkUserHasServiceAccessByAppId("csc")) {
          this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
        } else {
          this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
        }
      } else {
        if (this.sso.checkUserHasServiceAccessByAppId("cmc")) {
          this.modalRef = this.dialogService.open(this.tosModal, this.ngbModalOptions);
        } else {
          this.tosAgreed = true;
          this.sso.setCmcTos(true);
        }
      }

      this.addScrollListener();



    }, (error: any) => {
    });



  }

  acceptBtnDisabled = true;

  addScrollListener(): void {
    var myDiv = document.getElementById('tos-body');
    myDiv.scrollTop = 0;
    let that = this;
    $('#tos-body').on('scroll', function () {
      // if ($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - 50)) {
      //   console.log('end reached');

      //   that.acceptBtnDisabled = false;
      // }

      let frameContents = $(".terms-content").contents();
      let frameHeight = frameContents.height();
      let modelBodyHeight = $('.terms-content').height();
      let scrollTop = $(this).scrollTop();
      if (scrollTop + modelBodyHeight > frameHeight - 50) {
        that.acceptBtnDisabled = false;
      }

    });

  }

  loadDeclineTosModal(): void {
    var myDiv = document.getElementById('tos-body');
    myDiv.scrollTop = 0;

    if (this.tosAgreed) {
      return;
    }

    this.close();

    this.modalRef = this.dialogService.open(this.declineTOSModal, this.ngbModalOptions);

  }

  doLogout() {
    this.close();
    this.tosAgreed = true;
    this.router.navigate(['logout']);
  }

  agreeTos(): any {
    this.acceptBtnDisabled = true;
    var myDiv = document.getElementById('tos-body');

    let entArr = this.sso.getEntitlementsArr();
    let version = '';
    let appType = '';
    if (this.page === 'foundation') {
      appType = 'foundation';
      version = environment.FOUNDATION_TOS_MD_HASH;
    } else if (this.page === 'cco') {
      appType = 'coc';
      version = environment.CCO_TOS_MD_HASH;
    } else if (this.page === 'support') {
      if (entArr.indexOf("118") !== -1) {
        version = environment.CSC_TOS_MD_HASH;
        appType = 'support';
      } else {
        version = environment.CSC_BASIC_TOS_MD_HASH;
        appType = 'support_basic';
      }
    } else {
      if (entArr.indexOf("119") !== -1 || entArr.indexOf("209") !== -1) {
        version = environment.CMC_TOS_MD_HASH;
        appType = 'marketing';
      }

    }


    let params = { "version": version, "appType": appType, "accept": true };
    this.http.post(environment.TOS_API_URL, params, { responseType: 'text' }).subscribe((json: any) => {
      myDiv.scrollTop = 0;
      this.acceptBtnDisabled = false;

      if (this.page === 'foundation') {
        this.sso.setFoundationTos(true);
      } else if (this.page === 'cco') {
        this.sso.setCcoTos(true);
      } else if (this.page === 'support') {
        this.sso.setCscTos(true);
      } else {
        this.sso.setCmcTos(true);
      }

      this.tosAgreed = true;
      this.close();
      //this.tosModalClose.nativeElement.click();

    }, (error: any) => {
      this.tosAgreed = true;
      myDiv.scrollTop = 0;
      this.acceptBtnDisabled = false;
    });

  }

  page = '';
  getPageName(): any {
    this.sso.relativeUrlResult$.subscribe((json: any) => {
      this.page = json.page;
      if (this.page === 'cco' && !this.sso.isCcoTermsAccept()) {
        this.tosAgreed = false;
        this.loadTosFile();
      } else if (this.page === 'foundation' && !this.sso.isFoundationTermsAccept()) {
        this.tosAgreed = false;
        this.loadTosFile();
      } else if (this.page === 'support' && !this.sso.isSupportTermsAccept()) {
        this.tosAgreed = false;
        this.loadTosFile();
      } else if (this.page === 'marketing' && !this.sso.isMarketingTermsAccept()) {
        this.tosAgreed = false;
        this.loadTosFile();
      }

      // else if (this.page === 'cco' && !this.sso.isCcoTermsAccept()) {
      //   this.tosAgreed = false;
      //   this.loadTosFile();
      // }

      this.tosAgreed = true;

    }, (err: any) => {
      this.tosAgreed = true;
    });
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }

  }


  ngOnDestroy() {
    // if (this.watchLoginService) {
    //   clearInterval(this.watchLoginService);
    // }

    if (this.logoutSubscribe) {
      this.logoutSubscribe.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }

  actionAuditLog(url) {
    const loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    if (loginData) {
      for (let i = 0; i < 2; i++) {
        const path = `/support/system/${i ? 'auditlog' : 'actionlog'}`;
        const request = {
          "orgid": loginData.OrgId,
          "user": loginData.OrgId,
          "appid": "CSC",
          "optype": url,
          "target": "system",
          "timestamp": {},
          "severity": "0",
          "message": i ? `[uname=${loginData.username}][ip=${loginData.clientIp}]` : ''
        };

        this.sso.actionAuditLog(path, request).subscribe(
          (res: any) => {

          }, (err: any) => {
          }
        );
      }
    }
  }

  getActiveTabsParam() {
    $(window).off('focus');
    $(window).on('focus', () => {
      let obj = {};
      const tabId = this.sso.getTabId();
      for (let key in window.localStorage) {
        const val = localStorage.getItem(key);
        if (val.includes(tabId)) obj[key] = val.replace(tabId, '');
      }
    });
  }

  catchApigeeError() {
    this.sso.apigeeError$.subscribe((json: any) => {

      sessionStorage.setItem('hard_refresh_the_page', 'true');

      this.modalRef = this.dialogService.open(this.apigeeErrorModal);

      setTimeout(() => {
        this.doLogout();
      }, 10000);

    });
  }

  ngAfterViewInit(): void {
    this.addDocumentClickEvent();
    if (localStorage.getItem('defaultLanguage')) {
      sessionStorage.setItem('defaultLanguage', localStorage.getItem('defaultLanguage'));
      this.translateService.changeLanguage(localStorage.getItem('defaultLanguage'));
      this.customTranslateService.changeLanguage(localStorage.getItem('defaultLanguage'));
    }
  }

  ngAfterViewChecked(): void {
    if (this.elementRef.nativeElement.querySelector('input[type]'))
      this.elementRef.nativeElement.querySelectorAll('input[type]').forEach(input =>
        input.addEventListener("blur", this.removeTrialingSpaces)
      );
  }

  removeTrialingSpaces(event) {
    if (environment.API_BASE_URL.includes('dev.api.calix'))
      event.target.value = event.target.value.trim();
  }




  refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  updateLater() {
    this.updateLaterClicked = true;
    this.commonOrgService.initUpdateCronJob(true);
  }

  hideUpdatePopup() {
    this.isUpdateAnimation = false;
    setTimeout(() => {
      this.isUpdateAvailable = false;
    }, 500);
  }

  detectRptPathPrm() {
    if (window.location.href?.indexOf('/rpt/') !== -1) {
      const ccoWrkflwRptId = window.location.href?.split('/rpt/')?.[1]?.trim();
      this.sso.setCcoWrkflwReportId(ccoWrkflwRptId);
    }
  }

}
