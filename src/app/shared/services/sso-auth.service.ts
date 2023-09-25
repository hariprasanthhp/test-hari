import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WindowRefService } from './window-ref.service';
import { env } from 'process';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from './common-functions.service';
import { integer } from 'aws-sdk/clients/cloudfront';
import { saveAs } from 'file-saver';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { CustomTranslateService } from "../../app-services/custom-translate.service";
// import { OrgSecureAccessService } from './../organisation/shared/services/org-secure-access.service';
export enum AcessModifiers {
  READ = "read",
  WRITE = "write"
}

export enum CheckScopes {
  VALIDATE_SCOPE = "VALIDATE_SCOPE",
  VALIDATE_FOUNDATION_SCOPE = "VALIDATE_FOUNDATION_SCOPE"
}
@Injectable({
  providedIn: 'root'
})
export class SsoAuthService {
  API = `${environment.AUTH_API_HOST}`;
  authorization = 'apikey=' + environment.X_CALIX_CLIENTID;
  client_secret = environment.X_CALIX_SECURE_CLIENTID;
  public loggedIn: boolean;
  public shadSp = false;
  public secResult$ = new Subject();
  public federatedLogin$ = new Subject();
  public relativeUrlResult$ = new Subject();
  public logoutResult$ = new Subject();
  public cmcTos$ = new Subject();
  public cscTos$ = new Subject();
  public ccoTos$ = new Subject();
  public foundationTos$ = new Subject();
  public apiError$ = new Subject();
  public subscriberEndPointId$ = new Subject();
  public refreshTokenNew$ = new Subject();
  public apigeeError$ = new Subject();
  errorInfo: string;
  public isExosModel = new Subject();
  public commandIQData = new Subject();
  public hasPageAccess$ = new Subject();
  public toggled$ = new Subject<any>();
  public isFromCcoModule: boolean = false;
  private thoughtspotLougoutUrl = 'https://dashboards-dev.calix.com/callosum/v1/tspublic/v1/session/logout';
  public EfficiencyScore = new Subject();
  public currentSubscriberInfo = new Subject();


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    // private language: CustomTranslateService,
    // private secService: OrgSecureAccessService
    private dateUtils: DateUtilsService,
    private commonFunction: CommonFunctionsService,
    private modalService: NgbModal
  ) { }
  logoutThoughtspot() {
    return this.http.post(this.thoughtspotLougoutUrl, null, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-By': 'ThoughtSpot' } })
  }
  checkUsername(username) {
    return this.http.get(`${this.API}/usertype?username=${encodeURIComponent(username)}`);
  }

  getAuthCode(userCredentials) {
    return this.http.post(`${this.API}/LocalAuth?${this.authorization}`, userCredentials)
      .pipe(
        tap(error => this.errorHandler(error))
      );
  }

  getAuthToken(formData, grantType): any {
    //console.log(grantType);
    let param = '';
    if (grantType === 'authorization_code') {
      param = `grant_type=${grantType}&auth_code=${formData.code}&redirect_uri=${formData.redirect_uri}&client_secret=${formData.client_secret}`;
    } else if (grantType === 'password') {
      param = `grant_type=${grantType}&username=${formData.username}&password=${(encodeURIComponent(formData.password) || '').replace('&', '%26')}&client_secret=${formData.client_secret}`;
      /* param = {
        grant_type: grantType,
        username: formData.username,
        password: encodeURI(formData.password),
        client_secret: formData.client_secret
      } */
    } else if (grantType === 'refresh_token') {
      const refreshToken = localStorage.getItem('refresh-token');
      param = `grant_type=${grantType}&refresh_token=${refreshToken}&scope=openid`;
    } else if (grantType === 'secure_access') {
      param = `grant_type=${grantType}&client_secret=${formData.client_secret}&access_token=${this.getAccessToken()}&orgid=${formData.orgId}`;
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.API}/token`, param, { headers });
  }


  getallsupportedlanguages(): any {

    return this.http.get(`${environment.SUPPORT_URL}/locale/language`);

  }

  getspecificliterals(getlangid): any {

    return this.http.get(`${environment.SUPPORT_URL}/locale?lang_id=${getlangid}`);

  }
  errorHandler(error) {
    //console.log('## ERROR ##', error);
  }

  getUrlParams(paramsObj): any {
    let params = "";
    for (var key in paramsObj) {
      if (params != "") {
        params += "&";
      }
      params += key + "=" + encodeURIComponent(paramsObj[key]);
    }

    return params;
  }

  public setAccessToken(token: any): void {
    if (!token) {
      window.localStorage.removeItem('calix.sso_access_token');
    } else {
      window.localStorage.setItem('calix.sso_access_token', token);
    }
  }

  public getAccessToken(): string {
    return window.localStorage.getItem('calix.sso_access_token');
  }


  public setRefreshToken(token: any): void {
    if (!token) {
      window.localStorage.removeItem('calix.sso_refresh_token');
    } else {
      window.localStorage.setItem('calix.sso_refresh_token', token);
    }
  }

  public getRefreshToken(): string {
    return window.localStorage.getItem('calix.sso_refresh_token');
  }

  public setShadToken(token: any): void {
    if (!token) {
      window.localStorage.removeItem('calix.sso_shadToken');
    } else {
      window.localStorage.setItem('calix.sso_shadToken', token);
    }

  }

  public setSpid(spid: any): void {
    this.setSPID(spid);
  }

  public manageScopes(scopeArr: any): void {
    let okey = ''; let val = []; let obj = {};
    let scopes = [];
    for (let i = 0; i < scopeArr.length; i++) {
      let arr = scopeArr[i].split(':');
      okey = arr[0];
      val = arr[1].split(',');
      obj[okey] = val;

      //scopes.push(obj);
    }

    window.localStorage.setItem('calix.scopes', JSON.stringify(obj));
  }

  public getScopes(): any {
    return window.localStorage.getItem('calix.scopes') ? JSON.parse(window.localStorage.getItem('calix.scopes')) : {};
  }


  public manageEntitlements(entitlements: any): void {
    let obj = {};
    let date = new Date(this.getTodayDateStr());
    date.setHours(0, 0, 0, 0);
    // let currentDate = date;
    // let endDate: any = '';
    // let overriddenDate: any = '';
    let skipAppTypes = [122];
    for (let i = 0; i < entitlements.length; i++) {
      if (skipAppTypes.indexOf(entitlements[i].apptype) !== -1) {
        continue;
      }

      // endDate = entitlements[i].enddate ? new Date(entitlements[i].enddate) : "";
      // overriddenDate = entitlements[i].overriddendate ? new Date(entitlements[i].overriddendate) : "";

      // if (((!endDate && !overriddenDate && !entitlements[i].enddate) || ((endDate && endDate >= currentDate) || (overriddenDate && overriddenDate >= currentDate)))) {
      //   if (typeof obj[entitlements[i].apptype] == "undefined") {
      //     obj[entitlements[i].apptype] = entitlements[i];
      //   }
      // }

      obj[entitlements[i].apptype] = entitlements[i];
    }

    window.localStorage.setItem('calix.entitlements', JSON.stringify(obj));
  }

  public getEntitlements(): any {
    return window.localStorage.getItem('calix.entitlements') ? JSON.parse(window.localStorage.getItem('calix.entitlements')) : [];
  }

  public getEntitlementsStr(): any {
    let entStr = [];

    let enttlmnts = this.getEntitlements();
    let entKeys = Object.keys(enttlmnts).length === 0 ? [] : Object.keys(enttlmnts);
    return entKeys.join(',');
  }

  public getEntitlementsArr(): any {
    let entStr = [];

    let enttlmnts = this.getEntitlements();
    let entKeys = Object.keys(enttlmnts).length === 0 ? [] : Object.keys(enttlmnts);
    return entKeys;
  }

  public setUserInfo(data: any): void {
    let name = '';
    name = (data.firstName !== 'undefined') ? data.firstName : '';
    if (name) {
      name = name + ', ';
    } else {
      name = '';
    }
    let str = `${name} ${data.lastName ? data.lastName : ''}`;
    str = `${str.trim() != '' ? str : data.username} `;

    window.localStorage.setItem('calix.userInfo', str);

    this.setUserId(data['UserId']);
    this.setOrgName(data.OrgName);
  }

  public getUserInfo(): any {
    return localStorage.getItem('calix.userInfo') ? localStorage.getItem('calix.userInfo') : '';
  }

  getAuthTokenByRT(): any {

    let grantType = 'refresh_token';
    let param = '';

    const refreshToken = this.getRefreshToken();
    param = `grant_type=${grantType}&refresh_token=${refreshToken}&client_secret=${this.client_secret}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if (this.isFederatedLogin()) {
      return this.http.post(`${environment.API_BASE_URL}grantor/changeorg_refreshtoken`, param, { headers });
    } else {
      return this.http.post(`${this.API}/token`, param, { headers });
    }


  }

  public setLandingPage(page: any): void {
    if (!page) {
      window.localStorage.removeItem('calix.landing_page');
    } else {
      window.localStorage.setItem('calix.landing_page', page);
    }
  }

  public getLandingPage(): string {
    return window.localStorage.getItem('calix.landing_page');
  }

  public setRoles(roles: any): void {
    if (!roles) {
      window.localStorage.removeItem('calix.roles');
    } else {
      window.localStorage.setItem('calix.roles', JSON.stringify(roles));
    }
  }

  public getRoles(): any {
    return JSON.parse(window.localStorage.getItem('calix.roles'));
  }

  public setOrgId(org_id: any): void {
    if (!org_id) {
      window.localStorage.removeItem('calix.org_id');
    } else {
      window.localStorage.setItem('calix.org_id', org_id);
    }
  }

  public getOrgId(): any {
    return window.localStorage.getItem('calix.org_id') ? window.localStorage.getItem('calix.org_id') : '';
  }
  public getOrg(orgId: any): any {
    // return 'orgId=' + `${orgId}`;
    return '';
  }
  public getSerialNo(): any {
    return window.sessionStorage.getItem(`${this.getTabId()}calix.deviceData`) ? window.sessionStorage.getItem(`${this.getTabId()}calix.deviceData`) : '';
  }

  public getDeviceData() { return this.getSerialNo() ? JSON.parse(this.getSerialNo()) : [] }

  public setServiceDownSpeed(downSpeed: any): void {
    !downSpeed ?
      window.localStorage.removeItem('calix.serviceDownSpeed') :
      window.localStorage.setItem('calix.serviceDownSpeed', downSpeed);
  }

  public getServiceDownSpeed(): any {
    return window.localStorage.getItem('calix.serviceDownSpeed') ? window.localStorage.getItem('calix.serviceDownSpeed') : '';
  }

  public setLoggedIn(flag: boolean): void {
    this.loggedIn = flag ? true : false;
    if (!this.loggedIn) {
      window.localStorage.removeItem('calix.loggedIn');
    } else {
      this.shadSp = true;
      window.localStorage.setItem('calix.loggedIn', 'true');
    }
  }

  public isLoggedIn(): boolean {
    try {
      return this.loggedIn = (window.localStorage.getItem('calix.loggedIn') ? true : false);
    } catch (ex) {
      //
    }
  }

  public setShowHeader(key: boolean) {
    if (key) {
      window.localStorage.setItem('showHeader', 'true');
    } else {
      window.localStorage.removeItem('showHeader');
    }

  }

  public getShowHeader(): any {
    return window.localStorage.getItem('showHeader') ? true : false;
  }

  public setLoginInfo(res: any): void {
    this.setCscLoggedOut(false);
    this.setCSCLoggedIn(false);
    this.setAccessToken(res['access_token']);
    this.setLoggedIn(true);
    this.manageScopes(res.scopes);
    this.manageEntitlements(res.entitlements);
    this.setRefreshToken(res['refresh_token']);
    this.setShadToken(res['access_token']);
    this.setSpid(res['SpId']);
    this.setOrgId(res['OrgId']);
    this.setLandingPage(res['landingPage']);
    this.setUserInfo(res);
    this.setCSCToken(res['cscToken']);
    this.setUserId(res['UserId']);
    this.setRoles(res['roles']);
    this.setUsername(res['username']);
    this.setOrgSFID(res['org_sfid']);

    let entArr = this.getEntitlementsArr();

    if (entArr.indexOf("118") !== -1) {
      this.setCscType('EME');
    } else {
      this.setCscType('DME');
    }

    this.insertScopesForOrgAdmin();
    this.removeScopesForFlowLtdEnt();
  }


  public doLogout() {
    this.setLoggedIn(false);
    this.manageScopes([]);
    this.manageEntitlements([]);
    this.setAccessToken('');
    this.setRefreshToken('');
    this.setShadToken('');
    this.setSpid('');
    this.setOrgId('');
    this.setLandingPage('');
    this.setUserInfo([]);
    this.setCSCToken('');
    this.setUserId('');
    this.setRoles([]);
    this.setUsername('');
    //this.removeGracePeriobShown();
    this.removeGracePeriobShownNew();
    sessionStorage.setItem('defaultLanguage', 'en')
    //this.language.changeLanguage('en');
    //this.auth.doLogout();
    this.removeOrgSFID();
    this.setCSCLoggedIn(false);
    this.setMarketingTermsAccept(false);
    this.setSupportTermsAccept(false);
    this.setCcoTermsAccept(false);
    this.setFoundationTermsAccept(false);
    this.setLogoutFlag(true);
    this.setCscType('');
    this.removeRefresh();
    this.setSecureAccess('');
    this.removeActionLogInfo();
    this.setFederatedLogin('');
    this.setSecureAccessLoginData('');
    localStorage.removeItem('defaultLanguage');
    localStorage.removeItem('defaultLanguage');
    sessionStorage.removeItem('showSensitiveInfo');
    //this.router.navigate(['login']);
  }

  public setRefresh(value) {
    localStorage.setItem('refresh', value)
  }
  public getRefresh() {
    return localStorage.getItem('refresh')
  }
  public removeRefresh() {
    localStorage.removeItem('refresh')

  }

  public setCSCToken(token) {
    if (token) {
      window.localStorage.setItem('calix.csc_token', token);
    } else {
      window.localStorage.removeItem('calix.csc_token');
    }

  }

  public getCSCToken(): any {
    return window.localStorage.getItem('calix.csc_token') ? window.localStorage.getItem('calix.csc_token') : '';
  }

  public setUserId(userId) {
    if (userId) {
      window.localStorage.setItem('calix.userId', userId);
    } else {
      window.localStorage.removeItem('calix.userId');
    }

  }

  public getUserId(): any {
    return window.localStorage.getItem('calix.userId') ? window.localStorage.getItem('calix.userId') : '';
  }

  public getSecureOrgList(): any {
    let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}secureaccess/orglist/${this.getUserId()}/count`;
    return this.http.get(url);
  }


  public setLoginData(res: any): void {
    if (res) {
      //this.setGracePeriodsByData(res.entitlements);
      window.localStorage.setItem('calix.login_data', JSON.stringify(res));
    } else {
      window.localStorage.removeItem('calix.login_data');
    }


  }

  public getLoginData(): any {
    return window.localStorage.getItem('calix.login_data') ? JSON.parse(window.localStorage.getItem('calix.login_data')) : [];
  }

  public getspecificlangliterals(): any {
    return window.localStorage.getItem('specificlangliterals') ? JSON.parse(window.localStorage.getItem('specificlangliterals')) : '';
  }
  public setSecureAccessLoginData(res: any): void {
    if (res) {
      //this.setGracePeriodsByData(res.entitlements);
      window.localStorage.setItem('calix.secure_access_login_data', JSON.stringify(res));
    } else {
      window.localStorage.removeItem('calix.secure_access_login_data');
    }
  }

  public getSecureAccessLoginData(): any {
    return window.localStorage.getItem('calix.secure_access_login_data') ? JSON.parse(window.localStorage.getItem('calix.secure_access_login_data')) : [];
  }


  public setUsername(username: any): void {
    if (username) {
      window.localStorage.setItem('calix.username', username);
    } else {
      window.localStorage.removeItem('calix.username');
    }
  }

  public getUsername(): any {
    return window.localStorage.getItem('calix.username') ? window.localStorage.getItem('calix.username') : '';
  }

  public setSecureAccess(secure: any): void {
    if (secure) {
      window.localStorage.setItem('calix.secure_access', 'true');
      this.secResult$.next({
        secure: true
      });
    } else {
      window.localStorage.removeItem('calix.secure_access');
      this.secResult$.next({
        secure: false
      });
    }
  }

  public isSecureAccess(checkExitedWithin5sec = false): any {
    /* Below code finds the seconds diff between secure access exited time and current time and whether it is within 5 secs */
    const exitedWithin = !checkExitedWithin5sec || (Math.floor((new Date().getTime() - (Number(localStorage.getItem('secureAccessExitedAt')) || 0)) / 1000) <= 5)
    return (window.localStorage.getItem('calix.secure_access') ? true : false) || (checkExitedWithin5sec ? exitedWithin : checkExitedWithin5sec);
  }

  public isPageVisible(): any {
    var stateKey, eventKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
      if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
      }
    }
    return function (c) {
      if (c) document.addEventListener(eventKey, c);
      return !document[stateKey];
    }


  }


  public doLogoutCSC(): void {
    this.setCscLoggedOut(true);
  }

  public isCscLoggedOut(): any {
    return window.localStorage.getItem('calix.csc_logged_out') ? true : false;
  }

  public setCscLoggedOut(flag: any): void {
    if (flag) {
      window.localStorage.setItem('calix.csc_logged_out', 'true');
    } else {
      window.localStorage.removeItem('calix.csc_logged_out');
    }

  }

  public doExitSecureAccess(): void {
    this.setAccessToken('');
    this.setCSCLoggedIn(false);
    let res = this.getLoginData();
    this.manageEntitlements(res.entitlements);
    this.setLoginInfo(this.getLoginData());
    this.doLogoutCSC();
    this.setSecureAccess('');
    this.setSecureAccessLoginData('');

    //this.router.navigate(['org-access']);

    window.location.href = `${WindowRefService.prototype.nativeWindow}/org-access`;
  }

  public setGracePeriodsByData(entitlements: any): void {
    let gracePeriods = [];
    let oDate: any;
    let cDate: any = new Date(this.getTodayDateStr());

    let date = new Date();
    let currentDate = date.getTime();
    let endDate: any = '';
    let overriddenDate: any = '';
    this.manageEntitlements(entitlements);
    let enttlmnts = this.getEntitlements();
    let obj = {};
    let missedEntitlements = {};
    let skipAppTypes = [122];
    for (let i = 0; i < entitlements.length; i++) {
      if (skipAppTypes.indexOf(entitlements[i].apptype) !== -1) {
        continue;
      }

      let data = entitlements[i];

      endDate = entitlements[i].enddate ? new Date(entitlements[i].enddate) : "";
      overriddenDate = entitlements[i].overriddendate ? new Date(entitlements[i].overriddendate) : "";

      if (enttlmnts[data.apptype] && data.overriddendate) {
        oDate = new Date(data.overriddendate);

        const diffTime = Math.abs(oDate - cDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log(diffDays);
        if (diffDays <= 30) {

          obj[data.apptype] = {
            valid: true,
            message: `${data.name} expires in ${diffDays} ${diffDays ? 'days' : 'day'}`
          };
          missedEntitlements[data.apptype] = data;
        }
      } else if (enttlmnts[data.apptype] && data.enddate) {
        oDate = new Date(data.enddate);

        const diffTime = Math.abs(oDate - cDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log(diffDays);

        if (Math.sign(oDate - cDate) === 1) {
          if (diffDays <= 30) {

            obj[data.apptype] = {
              valid: true,
              message: `${data.name} expires in ${diffDays} ${diffDays ? 'days' : 'day'}`
            };
            missedEntitlements[data.apptype] = data;
          }
        } else {
          if (diffDays <= 30) {

            obj[data.apptype] = {
              valid: true,
              message: `${data.name} has expired on ${data.overriddendate}. Please renew in ${Math.ceil(30 - diffDays)} days to prevent service disruption`
            };
            missedEntitlements[data.apptype] = data;
          }
        }

      } else if (!data.startdate && !data.enddate && data.overriddendate) {
        oDate = new Date(data.overriddendate);

        const diffTime = Math.abs(oDate - cDate);
        const diff = diffTime / (1000 * 60 * 60 * 24);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        obj[data.apptype] = {
          valid: false,
          message: `${data.name} has expired on ${data.overriddendate}. Please renew in ${Math.ceil(30 - diff)} days to prevent service disruption`
        };

        if (diffDays <= 30) {
          missedEntitlements[data.apptype] = data;
        }
      } else if (data.enddate && data.overriddendate) {
        oDate = new Date(data.overriddendate);

        const diffTime = Math.abs(oDate - cDate);
        const diff = diffTime / (1000 * 60 * 60 * 24);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        obj[data.apptype] = {
          valid: false,
          message: `${data.name} has expired on ${data.overriddendate}. Please renew in ${Math.ceil(30 - diff)} days to prevent service disruption`
        };

        if (diffDays <= 30) {
          missedEntitlements[data.apptype] = data;
        }
      } else if (data.enddate && !data.overriddendate) {
        oDate = new Date(data.enddate);

        const diffTime = Math.abs(oDate - cDate);
        const diff = diffTime / (1000 * 60 * 60 * 24);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        obj[data.apptype] = {
          valid: false,
          message: `${data.name} has expired on ${data.overriddendate}. Please renew in ${Math.ceil(30 - diff)} days to prevent service disruption`
        };

        if (diffDays <= 30) {
          missedEntitlements[data.apptype] = data;
        }
      } else if (data.overriddendate) {
        oDate = new Date(data.overriddendate);

        const diffTime = Math.abs(oDate - cDate);
        const diff = diffTime / (1000 * 60 * 60 * 24);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        obj[data.apptype] = {
          valid: false,
          message: `${data.name} has expired on ${data.overriddendate}. Please renew in ${Math.ceil(30 - diff)} days to prevent service disruption`
        };

        if (diffDays <= 30) {
          missedEntitlements[data.apptype] = data;
        }
      }
    }

    let newentitelments = { ...enttlmnts, ...missedEntitlements }

    window.localStorage.setItem('calix.entitlements', JSON.stringify(newentitelments));



    if (Object.keys(obj).length) {
      // if (obj[200] || obj[201]) {
      //   if ((obj[200] && !this.checkEntitlementInGPByApp(200)) || (obj[201] && !this.checkEntitlementInGPByApp(201))) {
      //     //no need to push grace period
      //   } else {
      //     if (obj[200]) {
      //       gracePeriods.push(obj[200]);
      //     }

      //     if (obj[201]) {
      //       gracePeriods.push(obj[201]);
      //     }

      //   }
      // }

      // if (obj[119] || obj[122]) {
      //   if ((obj[119] && !this.checkEntitlementInGPByApp(119)) || (obj[122] && !this.checkEntitlementInGPByApp(122))) {
      //     //no need to push grace period
      //   } else {
      //     if (obj[119]) {
      //       gracePeriods.push(obj[119]);
      //     }

      //     if (obj[122]) {
      //       gracePeriods.push(obj[122]);
      //     }

      //   }
      // }

      // if (obj[118] || obj[120]) {
      //   if ((obj[118] && !this.checkEntitlementInGPByApp(118)) || (obj[120] && !this.checkEntitlementInGPByApp(120))) {
      //     //no need to push grace period
      //   } else {
      //     if (obj[118]) {
      //       gracePeriods.push(obj[118]);
      //     }

      //     if (obj[120]) {
      //       gracePeriods.push(obj[120]);
      //     }

      //   }
      // }

      let entArr = this.getEntitlementsArr();
      if (entArr.indexOf("118") !== -1) {
        this.setCscType('EME');
      } else {
        this.setCscType('DME');
      }
      let keys = Object.keys(obj);
      let cscType = this.getCscType();
      if (cscType === "EME") {
        let cscDmeType = keys.indexOf("120");
        if (cscDmeType !== -1) {
          keys.splice(cscDmeType, 1);
        }

      }

      if (keys.indexOf("122") !== -1) {
        let mIndex = keys.indexOf("122");
        keys.splice(mIndex, 1);
      }

      if (entArr.indexOf("200") !== -1 || entArr.indexOf("201") !== -1) {
        if ((obj["201"] && obj["201"]["valid"]) || (entArr.indexOf("201") !== -1 && !obj["201"])) {
          let mIndex = keys.indexOf("200");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

        } else if ((obj["200"] && obj["200"]["valid"]) || (entArr.indexOf("200") !== -1 && !obj["200"])) {
          let mIndex = keys.indexOf("201");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }
        }

      }


      if (entArr.indexOf("203") !== -1 || entArr.indexOf("204") !== -1 || entArr.indexOf("205") !== -1) {
        if ((obj["205"] && obj["205"]["valid"]) || (entArr.indexOf("205") !== -1 && !obj["205"])) {
          let mIndex = keys.indexOf("203");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

          mIndex = keys.indexOf("204");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

        } else if ((obj["203"] && obj["203"]["valid"]) || (entArr.indexOf("203") !== -1 && !obj["203"])) {
          let mIndex = keys.indexOf("205");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

          mIndex = keys.indexOf("204");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

        } else if ((obj["204"] && obj["204"]["valid"]) || (entArr.indexOf("204") !== -1 && !obj["204"])) {
          let mIndex = keys.indexOf("205");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

          mIndex = keys.indexOf("203");
          if (mIndex !== -1) {
            keys.splice(mIndex, 1);
          }

        }

      }


      for (let i = 0; i < keys.length; i++) {
        gracePeriods.push(obj[keys[i]]['message']);
      }
    }

    this.setGracePeriodNew(entitlements);
    return;
    window.localStorage.setItem('calix.grace_periods', JSON.stringify(gracePeriods));



    // let date = new Date();
    // let currentDate = date.getTime();
    // let endDate: any = '';
    // let overriddenDate: any = '';
    // for (let i = 0; i < entitlements.length; i++) {
    //   endDate = entitlements[i].enddate ? new Date(entitlements[i].enddate) : "";
    //   overriddenDate = entitlements[i].overriddendate ? new Date(entitlements[i].overriddendate) : "";

    //   if (entitlements[i].entitlement && ((!endDate && !overriddenDate && !entitlements[i].enddate) || ((endDate && endDate > currentDate) || (overriddenDate && overriddenDate > currentDate)))) {
    //     if (typeof obj[entitlements[i].apptype] == "undefined") {
    //       obj[entitlements[i].apptype] = entitlements[i];
    //     }
    //   }
    // }

  }
  setGracePeriodNew(entitlements: any) {
    let gracePeriods = [];
    entitlements.forEach(obj => {
      if (obj.ingraceperiod == 'yes') {
        gracePeriods.push(`${obj.name} is in Grace Period`);
      }
      if (obj.bannernoofdays) {
        gracePeriods.push(`${obj.name} expires in ${obj.bannernoofdays} ${obj.bannernoofdays > 1 ? 'days' : 'day'}`);
      }
    });
    window.localStorage.setItem('calix.grace_periods_new', JSON.stringify(gracePeriods));
  }

  public setGracePeriods(): void {
    let gracePeriods = [];
    let enttlmnts = this.getEntitlements();
    let oDate: any;
    let cDate: any = new Date();

    if (enttlmnts[102]) {
      let data = enttlmnts[102];

      if (data.overriddendate) {
        oDate = new Date(data.overriddendate);

        const diffTime = Math.abs(oDate - cDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log(diffDays);
        if (diffDays <= 30) {
          gracePeriods.push(`Your grace period for FA Plus is ${diffDays} days`);
        }
      }
    }

    if (enttlmnts[200] || enttlmnts[201]) {
      if (enttlmnts[200]) {
        let data = enttlmnts[200];

        if (data.overriddendate) {
          oDate = new Date(data.overriddendate);

          const diffTime = Math.abs(oDate - cDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          //console.log(diffDays);
          if (diffDays <= 30) {
            gracePeriods.push(`Your grace period for SHAD is ${diffDays} days`);
          }
        }
      }

      if (enttlmnts[201]) {
        let data = enttlmnts[201];

        if (data.overriddendate) {
          oDate = new Date(data.overriddendate);

          const diffTime = Math.abs(oDate - cDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          //console.log(diffDays);
          if (diffDays <= 30) {
            gracePeriods.push(`Your grace period for SHAD is ${diffDays} days`);
          }
        }
      }
    }

    if (enttlmnts[119]) {
      let data = enttlmnts[119];

      if (data.overriddendate) {
        oDate = new Date(data.overriddendate);
        const diffTime = Math.abs(oDate - cDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log(diffDays);
        if (diffDays <= 30) {
          gracePeriods.push(`Your grace period for Marketing Cloud is ${diffDays} days`);
        }
      }
    }

    window.localStorage.setItem('calix.grace_periods', JSON.stringify(gracePeriods));
  }

  checkEntitlementInGPByApp(data: any): any {
    let oDate: any;
    let cDate: any = new Date();

    if (data.overriddendate) {
      oDate = new Date(data.overriddendate);

      const diffTime = Math.abs(oDate - cDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //console.log(diffDays);
      if (diffDays <= 30) {
        return true;
      }
    }

    return false;
  }

  public getGracePeriods(): any {
    let data = window.localStorage.getItem('calix.grace_periods') ? JSON.parse(window.localStorage.getItem('calix.grace_periods')) : [];
    if (this.getGracePeriobShown()) {
      data = [];
    }
    this.setGracePeriobShown();
    return data;
  }

  public getGracePeriodsNew(): any {
    let data = window.localStorage.getItem('calix.grace_periods_new') ? JSON.parse(window.localStorage.getItem('calix.grace_periods_new')) : [];
    if (this.getGracePeriobShownNew()) {
      data = [];
    }
    this.setGracePeriobShownNew();
    return data;
  }

  setGracePeriobShown(): void {
    window.localStorage.setItem('calix.grace_periods_shown', 'true');
  }

  removeGracePeriobShown(): void {
    window.localStorage.removeItem('calix.grace_periods_shown');
  }

  getGracePeriobShown(): boolean {
    return window.localStorage.getItem('calix.grace_periods_shown') ? true : false;
  }

  setGracePeriobShownNew(): void {
    window.localStorage.setItem('calix.grace_periods_shown_new', 'true');
  }

  removeGracePeriobShownNew(): void {
    window.localStorage.removeItem('calix.grace_periods_shown_new');
  }

  getGracePeriobShownNew(): boolean {
    return window.localStorage.getItem('calix.grace_periods_shown_new') ? true : false;
  }

  checkUserHasServiceAccess(app: any, page: any, route: any): any {
    let scopes = this.getScopes();
    let scopeNames: any = Object.keys(scopes);
    let appName = `cloud.${app}`;
    let appScopes = {};

    scopeNames.forEach((element: any) => {
      if (element.indexOf(appName) !== -1) {
        let arr = element.split(`${appName}.`);
        let scopeName = arr[1];
        if (typeof appScopes[appName] !== 'undefined') {
          appScopes[appName].push(scopeName);
        } else {
          appScopes[appName] = [scopeName];
        }
      }
    });

    if (appScopes[appName]) {
      if (appScopes[appName].indexOf(page) === -1) {
        let appRoutes = this.getAppRoutes(app);
        if (appRoutes[appScopes[appName][0]]) {
          this.router.navigate([`/${route}/${appRoutes[appScopes[appName][0]]}`]);
        } else {
          this.router.navigate([`/${route}`]);
        }

      }
    }
  }


  checkUserHasServiceAccessByAppId(app: any): boolean {
    let scopes = this.getScopes();
    let scopeNames: any = Object.keys(scopes);
    let appName = `cloud.${app}`;
    let appRbacName = `cloud.rbac.${app}`;
    let appScopes = {};

    scopeNames.forEach((element: any) => {
      if (element.indexOf(appName) !== -1) {
        let arr = element.split(`${appName}.`);
        let scopeName = arr[1];
        if (typeof appScopes[appName] !== 'undefined') {
          appScopes[appName].push(scopeName);
        } else {
          appScopes[appName] = [scopeName];
        }
      }

      if (element.indexOf(appRbacName) !== -1) {
        let arr = element.split(`${appRbacName}.`);
        let scopeName = arr[1];
        if (typeof appScopes[appRbacName] !== 'undefined') {
          appScopes[appRbacName].push(appRbacName);
        } else {
          appScopes[appRbacName] = [scopeName];
        }
      }

    });

    if (appScopes[appName] || appScopes[appRbacName]) {
      return true;
    } else {
      return false;
    }

  }

  getAppRoutes(app: any): any {
    const routes = {
      cmc: {
        insights: 'insights',
        upsell: 'upsell',
        retention: 'retention',
        acquisition: 'acquisition',
        mobilenotifications: 'promotions',
        search: 'search'
      }
    }

    return routes[app] ? routes[app] : {};
  }

  setLogoURL(apps) {
    let logoRedirectURL = '/support';
    if (apps.csc) {
      logoRedirectURL = '/support';
    } else if (apps.cmc) {
      logoRedirectURL = '/engagement';
    } else if (apps.shad) {
      logoRedirectURL = '/shad';
    } else if (apps.fa) {
      logoRedirectURL = '/fa';
    } else {
      let entArr = this.getEntitlementsArr();

      let ent = {
        102: 'fa',
        118: 'support',
        119: 'marketing',
        200: 'shad',
        201: 'shad'
      }

      if (entArr && entArr[0]) {
        logoRedirectURL = ent[entArr[0]];
      } else {
        logoRedirectURL = '/no-entitlements';
      }

    }

    return logoRedirectURL;
  }


  setOrgSFID(org_sfid: any) {
    if (typeof org_sfid !== 'undefined') {
      window.localStorage.setItem('calix.sfid', org_sfid);
    } else {
      this.removeOrgSFID();
    }

  }

  getOrgSFID() {
    return typeof window.localStorage.getItem('calix.sfid') !== 'undefined' ? window.localStorage.getItem('calix.sfid') : 'undefined';
  }

  removeOrgSFID() {
    window.localStorage.removeItem('calix.sfid');
  }

  setCSCLoggedIn(flag: boolean): void {
    if (flag) {
      window.localStorage.setItem("calix.csc_logged_in", "true");
    } else {
      window.localStorage.removeItem("calix.csc_logged_in");
    }
  }

  isCSCLoggedIn(): any {
    return window.localStorage.getItem("calix.csc_logged_in") ? true : false;
  }

  setSecureAccessStartTime(time: any): void {
    window.localStorage.setItem('calix.secure_access_start_time', time);
  }

  getSecureAccessStartTime(): any {
    return window.localStorage.getItem('calix.secure_access_start_time') ? window.localStorage.getItem('calix.secure_access_start_time') : "";
  }

  setSecureAccessEndTime(time: any): void {
    window.localStorage.setItem('calix.secure_access_end_time', time);
  }

  getSecureAccessEndTime(): any {
    return window.localStorage.getItem('calix.secure_access_end_time') ? window.localStorage.getItem('calix.secure_access_end_time') : "";
  }

  checkValidSecureAccessTime() {
    // let sbeginTime = this.getSecureAccessStartTime();
    // let sendTime = this.getSecureAccessEndTime();
    // if (!sbeginTime && !sendTime) {
    //   return false;
    // }

    // let startTime = this.secService.roundOffTimestamp(sbeginTime); // Start time in UTC timestamp to Local timestamp
    // let now = new Date().getTime(); // Current time in Local timestamp
    // if (sendTime == -1) {
    //   if (now >= startTime) {
    //     return true;
    //   }

    // } else {
    //   let endTime = this.secService.roundOffTimestamp(sendTime); // End time in UTC timestamp to Local timestamp
    //   if (now >= startTime && now < endTime) {
    //     return true;
    //   }
    // }

    // return false;
  }

  setRelativeUrl(page: any): void {
    if (page) {
      window.localStorage.setItem('calix.current_module', page);

      this.relativeUrlResult$.next({
        page: page
      });
    } else {
      window.localStorage.removeItem('calix.current_module');
    }

  }

  getRelativeUrl(): any {
    return window.localStorage.getItem('calix.current_module') ? window.localStorage.getItem('calix.current_module') : '';

  }

  setMarketingTermsAccept(flag: boolean) {
    if (flag) {
      window.localStorage.setItem('calix.marketing_tos_accept', 'true');
    } else {
      window.localStorage.removeItem('calix.marketing_tos_accept');
    }

  }

  isMarketingTermsAccept() {
    return window.localStorage.getItem('calix.marketing_tos_accept') ? true : false;
  }

  setSupportTermsAccept(flag: boolean) {
    if (flag) {
      window.localStorage.setItem('calix.support_tos_accept', 'true');
    } else {
      window.localStorage.removeItem('calix.support_tos_accept');
    }
  }

  isSupportTermsAccept() {
    return window.localStorage.getItem('calix.support_tos_accept') ? true : false;
  }

  setCcoTermsAccept(flag: boolean) {
    if (flag) {
      window.localStorage.setItem('calix.cco_tos_accept', 'true');
    } else {
      window.localStorage.removeItem('calix.cco_tos_accept');
    }
  }

  isCcoTermsAccept() {
    return window.localStorage.getItem('calix.cco_tos_accept') ? true : false;
  }

  setFoundationTermsAccept(flag: boolean) {
    if (flag) {
      window.localStorage.setItem('calix.foundation_tos_accept', 'true');
    } else {
      window.localStorage.removeItem('calix.foundation_tos_accept');
    }
  }

  isFoundationTermsAccept() {
    return window.localStorage.getItem('calix.foundation_tos_accept') ? true : false;
  }

  setLogoutFlag(flag: any): void {
    this.logoutResult$.next({
      logout: flag
    });
  }

  setCmcTos(flag: any): void {
    this.setMarketingTermsAccept(true);
    this.cmcTos$.next({
      accept: true
    });
  }

  setCscTos(flag: any): void {
    this.setSupportTermsAccept(true);
    this.cscTos$.next({
      accept: true
    });
  }

  setCcoTos(flag: any): void {
    this.setCcoTermsAccept(true);
    this.ccoTos$.next({
      accept: true
    });
  }

  setFoundationTos(flag: any): void {
    this.setFoundationTermsAccept(true);
    this.foundationTos$.next({
      accept: true
    });
  }

  checkCMCTOS(): any {
    let url = `${environment.TOS_API_URL}/marketing/${environment.CMC_TOS_MD_HASH}`;

    return this.http.get(url);
  }

  setCscType(type: any): void {
    if (type) {
      window.localStorage.setItem('calix.csc_type', type);
    } else {
      window.localStorage.removeItem('calix.csc_type');
    }
  }

  getCscType(): any {
    return window.localStorage.getItem('calix.csc_type') ? window.localStorage.getItem('calix.csc_type') : '';
  }

  setApiError(error: any): void {
    this.apiError$.next(error);
  }

  public getOrganizationID(url: string) {
    let orgId = '50';
    let sysAdmin = `${environment.SYS_ADMIN_ROUTE}`;
    if (url.indexOf(`/${sysAdmin}/`) > -1) {
      orgId = sessionStorage.getItem('calixAdminOrgID') ? sessionStorage.getItem('calixAdminOrgID') : '';
      return `${orgId}`;
    } else {
      orgId = this.getOrgId();
      return orgId ? `${orgId}` : '';
    }

  }


  public getRedirectModule(url) {
    let sysAdmin = `${environment.SYS_ADMIN_ROUTE}`;
    if (url.indexOf(`/${sysAdmin}/`) > -1) {
      return `${environment.SYS_ADMIN_ROUTE}`;
    } else {
      return `${environment.ORG_ADMIN_ROUTE}`;
    }
  }


  public setSPID(spid: any): void {
    if (spid) {
      window.localStorage.setItem('calix.spid', spid);
    } else {
      window.localStorage.removeItem('calix.spid');
    }

  }

  public getSPID(): any {
    return window.localStorage.getItem('calix.spid');
  }

  public setOrgName(name: any): void {
    if (name) {
      window.localStorage.setItem('calix.org_name', name);
    } else {
      window.localStorage.removeItem('calix.org_name');
    }

  }

  public getOrgName(): any {
    return window.localStorage.getItem('calix.org_name');
  }

  public getQlikTOkenByAppType(type) {
    let url = `${environment.API_BASE_URL}qlik/ticket?app=${type}`;
    return this.http.get(url);
  }

  public getCleanupSessionApi() {
    let url = `${environment.CALIX_URL}cleanupSession`;
    return this.http.get(url);
  }

  setCmcQlikToken(token: any): void {
    if (token) {
      window.localStorage.setItem('calix.cmc_qlik_token', token);
    } else {
      window.localStorage.removeItem('calix.cmc_qlik_token');
    }
  }


  getCmcQlikToken(): any {
    return window.localStorage.getItem('calix.cmc_qlik_token') ? window.localStorage.getItem('calix.cmc_qlik_token') : '';
  }

  setCscQlikToken(token: any): void {
    if (token) {
      window.localStorage.setItem('calix.csc_qlik_token', token);
    } else {
      window.localStorage.removeItem('calix.csc_qlik_token');
    }
  }


  getCscQlikToken(): any {
    return window.sessionStorage.getItem('calix.csc_qlik_token') ? window.sessionStorage.getItem('calix.csc_qlik_token') : '';
  }

  getSubscriberEndpointId(): any {
    return window.sessionStorage.getItem(`calix.endpointId`) ? window.sessionStorage.getItem(`calix.endpointId`) : '';
  }

  setSubscriberEndpointId(id: any): any {
    this.subscriberEndPointId$.next(id);
    if (id) {
      window.sessionStorage.setItem(`calix.endpointId`, id);
    } else {
      return window.sessionStorage.removeItem(`calix.endpointId`);
    }

  }

  getReportChartSubscriberInfo(): any {
    return window.localStorage.getItem('calix.reportChartSubscriberInfo') ? window.localStorage.getItem('calix.reportChartSubscriberInfo') : '';
  }

  setReportChartSubscriberInfo(sn: any): any {
    if (sn) {
      window.localStorage.setItem('calix.reportChartSubscriberInfo', sn);
    } else {
      return window.localStorage.removeItem('calix.reportChartSubscriberInfo');
    }

  }
  getTrafficReportChartSubscriberInfo(): any {
    return window.sessionStorage.getItem('calix.trafficreportChartSubscriberInfo') ? window.sessionStorage.getItem('calix.trafficreportChartSubscriberInfo') : '';
  }

  setTrafficReportChartSubscriberInfo(sn: any): any {
    if (sn) {
      window.sessionStorage.setItem('calix.trafficreportChartSubscriberInfo', sn);
    } else {
      return window.sessionStorage.removeItem('calix.trafficreportChartSubscriberInfo');
    }

  }

  getRealtimeDelay(): any {
    return window.localStorage.getItem('calix.traffic.realtimedelay') ? window.localStorage.getItem('calix.traffic.realtimedelay') : 0;
  }

  setRealtimeDelay(sn: any): any {
    if (sn) {
      window.localStorage.setItem('calix.traffic.realtimedelay', sn);
    } else {
      return window.localStorage.removeItem('calix.traffic.realtimedelay');
    }
  }

  getCSCSubscriberId(): any {
    return window.sessionStorage.getItem(`${this.getTabId()}calix.subscriberId`) ? window.sessionStorage.getItem(`${this.getTabId()}calix.subscriberId`) : '';
  }

  actionAuditLog(path, request) {
    return this.http.post(`${environment.API_BASE}${path}`, request);
  }

  setRefreshTokenNew() {
    this.refreshTokenNew$.next(true);
  }

  setLastActivityTime() {
    window.localStorage.setItem('calix.lastActivityMs', (Date.now()).toString());
  }


  getLastActivityTime() {
    return window.localStorage.getItem('calix.lastActivityMs') ? parseInt(window.localStorage.getItem('calix.lastActivityMs')) : Date.now();
  }

  redirectByUrl(url, additionalParam = {}) {
    let timer = 0
    const ind = (this.router.url.indexOf('/cco-foundation') == 0)
      ? 2 : (this.router.url.indexOf('/cco/operations/software-images-form') == 0) ? 3
        : ((this.router.url.indexOf('/cco/operations/configuration') == 0) ? 3 : (this.router.url.indexOf('/cco/services/configuration') == 0) ? 3 : (this.router.url.indexOf('/cco') == 0) ? 1 : 0);
    const module = this.router.url.split('/').filter(str => {
      if (['cco-system-operations', 'configuration', 'cco-network-operations', 'foundation-system-operation', 'foundation-reports'].indexOf(str) > -1) return str;
    })
    const destUrl = (url[ind] ? url[ind] : '')
    if (ind) {
      destUrl.replace(
        (new RegExp("cco-system-operations|configuration|cco-network-operations|foundation-system-operation|foundation-reports", "gi")),
        (module.length ? module[0] : (ind == 2 ? 'foundation-system-operation' : (this.router.url.indexOf('/cco/operations/software-images-form') == 0 ? 'configuration' : 'cco-system-operations')))
      );
    }
    if (this.router.url.indexOf(destUrl) > -1 && this.router.url.replace(destUrl, '').length < 5) {
      this.router.navigate(['cco/operations/cco-system-operations/dummy']);
      timer = 100;
    }
    setTimeout(() => {
      this.router.navigate([destUrl], additionalParam);
    }, timer);
  }

  redirectByUrlForWorkflow(url, additionalParam = {}) {
    let timer = 0
    const ind = (this.router.url.indexOf('/cco-foundation') == 0)
      ? 2 : (this.router.url.indexOf('/cco/operations/software-images-form') == 0) ? 3
        : ((this.router.url.indexOf('/cco/operations/configuration') == 0) ? 3 : (this.router.url.indexOf('/cco') == 0) ? 1 : 0);
    const module = this.router.url.split('/').filter(str => {
      if (['cco-system-operations', 'foundation-configuration', 'cco-network-operations', 'foundation-system-operation', 'foundation-reports'].indexOf(str) > -1) return str;
    })
    const destUrl = (url[ind] ? url[ind] : '')
      .replace(
        (new RegExp("cco-system-operations|foundation-configuration|cco-network-operations|foundation-system-operation|foundation-reports", "gi")),
        (module.length ? module[0] : (ind == 2 ? 'foundation-system-operation' : (this.router.url.indexOf('/cco/operations/software-images-form') == 0 ? 'foundation-configuration' : 'cco-system-operations')))
      );
    if (this.router.url.indexOf(destUrl) > -1 && this.router.url.replace(destUrl, '').length < 5) {
      this.router.navigate(['cco/operations/cco-system-operations/dummy']);
      timer = 100;
    }
    setTimeout(() => {
      this.router.navigate([destUrl], additionalParam);
    }, timer);
  }

  setTabId(tabId) {
    if (!sessionStorage.getItem('browserTabId') || window.performance.navigation.type == 2) {

      sessionStorage.setItem('browserTabId', tabId);
    }
  }

  getTabId() {
    //return sessionStorage.getItem('browserTabId') || '';
    return '';
  }

  changeStorage() {
    const prefix = sessionStorage.getItem('browserTabId');
    Storage.prototype.setItem = (function (key, value) {

      this.call(localStorage, prefix + key, value);
    }).bind(Storage.prototype.setItem);

    Storage.prototype.getItem = (function (key) {
      return this.call(localStorage, prefix + key);
    }).bind(Storage.prototype.getItem);
  }

  setActionLog(appId, optype, module, path, message, onlyMessage = false, returnObservable = false) {
    let url = `${environment.CALIX_URL}support/system/actionlog`;
    let time = this.dateUtils.currentDateToUTC();
    appId = 'NEW-CSC';
    let params = {
      // orgid: this.getOrg(this.orgId),
      orgName: this.getOrgName(),
      user: this.getUsername(),
      appid: appId ? appId : "NEW-CSC",
      optype: optype ? optype : "pageHit",
      target: path ? path : "system",
      pathname: path ? path : "system",
      oracleid: this.getOrgOracleId(),
      clientSessionId: this.getClientSessionId(),
      timestamp: time,
      clientLocalTime: this.dateUtils.getCurrentLocalDateTimeString('MM/dd/yyyy HH:mm:ss'),
      severity: 0,
      message: onlyMessage ? message : `CCO - ${message ? message : 'Page hit'}`
    }

    if (returnObservable) return this.http.post(url, params);
    else {
      this.http.post(url, params).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  public setValidMailChimpAuth(flag: boolean): void {
    let valid = flag ? true : false;
    if (!valid) {
      window.localStorage.removeItem('calix.ValidMailChimpAuth');
    } else {
      this.shadSp = true;
      window.localStorage.setItem('calix.ValidMailChimpAuth', 'true');
    }
  }

  public isValidMailChimpAuth(): boolean {
    try {
      return this.loggedIn = (window.localStorage.getItem('calix.ValidMailChimpAuth') ? true : false);
    } catch (ex) {
      //
    }
  }
  //COnstant
  public setValidConstantAuth(flag: boolean): void {
    let valid = flag ? true : false;
    if (!valid) {
      window.localStorage.removeItem('calix.ValidConstantAuth');
    } else {
      this.shadSp = true;
      window.localStorage.setItem('calix.ValidConstantAuth', 'true');
    }
  }

  public isValidConstantAuth(): boolean {
    try {
      return this.loggedIn = (window.localStorage.getItem('calix.ValidConstantAuth') ? true : false);
    } catch (ex) {
      //
    }
  }
  //Hubspot

  public setValidHubSpotAuth(flag: boolean): void {
    let valid = flag ? true : false;
    if (!valid) {
      window.localStorage.removeItem('calix.ValidHubspotAuth');
    } else {
      this.shadSp = true;
      window.localStorage.setItem('calix.ValidHubspotAuth', 'true');
    }
  }

  public isValidHubSpotAuth(): boolean {
    try {
      return this.loggedIn = (window.localStorage.getItem('calix.ValidHubspotAuth') ? true : false);
    } catch (ex) {
      //
    }
  }
  //
  public setOrgOracleId(oracle_id: any): void {
    window.localStorage.setItem('calix.org_oracle_id', oracle_id);
  }

  public getOrgOracleId(): any {
    return window.localStorage.getItem('calix.org_oracle_id') ? window.localStorage.getItem('calix.org_oracle_id') : '';
  }

  public setClientSessionId(): void {
    let sessionId = '';
    sessionId = this.commonFunction.getUniqueId(17);
    window.localStorage.setItem('calix.client_session_id', sessionId);
  }

  public getClientSessionId(): any {
    return window.localStorage.getItem('calix.client_session_id') ? window.localStorage.getItem('calix.client_session_id') : '';
  }

  removeActionLogInfo() {
    window.localStorage.removeItem('calix.org_oracle_id');
    window.localStorage.removeItem('calix.client_session_id');
  }

  getTodayDateStr() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  isIpv4Address(val) {
    const ipV4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipV4Regex.test(val);
  }

  isIpv6Address(val) {
    const ipV6Regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    return ipV6Regex.test(val);
  }

  setAdminOrgInfo(orgInfo) {
    sessionStorage.setItem('calix.admin_org_information', JSON.stringify(orgInfo));
  }

  getAdminOrgInfo() {
    return sessionStorage.getItem('calix.admin_org_information') ? sessionStorage.getItem('calix.admin_org_information') : '';
  }

  getAdminSPID(orgId: any) {
    let orgData = this.getAdminOrgInfo() ? JSON.parse(this.getAdminOrgInfo()) : {};
    if (orgData && orgData.spId && orgData.calixOrganization && orgData.calixOrganization?.id && orgData.calixOrganization?.id == orgId) {
      return orgData.spId;
    }
    return '';
  }

  setApigeeError(error: any): void {
    console.log('set apigee error')
    this.apigeeError$.next(error);
  }

  setEPRredirectFrom(relativePath?: string) {
    if (relativePath) {
      window.sessionStorage.setItem('calix.ep_url_redirect_from', relativePath);
    } else {
      window.sessionStorage.removeItem('calix.ep_url_redirect_from');
    }
  }

  getEPRredirectFrom() {
    return window.sessionStorage.getItem('calix.ep_url_redirect_from') ? window.sessionStorage.getItem('calix.ep_url_redirect_from') : '';
  }

  setEndpointRedirectTo(path?: any) {
    if (path) {
      window.sessionStorage.setItem('calix.endpoint_redirect_to', JSON.stringify(path));
    } else {
      window.sessionStorage.removeItem('calix.endpoint_redirect_to');
    }
  }

  getEndpointRedirectTo() {
    return window.sessionStorage.getItem('calix.endpoint_redirect_to') ? JSON.parse(window.sessionStorage.getItem('calix.endpoint_redirect_to')) : [];
  }

  pageErrorHandle(err) {
    if (err.error != undefined && err.error != null && typeof err.error == 'string') {
      this.errorInfo = `${err.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.message != undefined && typeof err.error.message == 'string') {
      this.errorInfo = `${err.error.message}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.errorDesc != undefined && typeof err.error.errorDesc == 'string') {
      this.errorInfo = `${err.error.errorDesc}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error != undefined && typeof err.error.error == 'string') {
      this.errorInfo = `${err.error.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error_code != undefined && typeof err.error.error_code == 'string') {
      this.errorInfo = `${err.error.error_code}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'string') {
      this.errorInfo = `${err.error.fault}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'object' && err.error.fault.faultstring != undefined && typeof err.error.fault.faultstring == 'string') {
      this.errorInfo = `${err.error.fault.faultstring}`;
    } else if (err.error && err.error.errorMessage) {
      this.errorInfo = `${err.error.errorMessage}`;
    } else if (err.error && err.error.message) {
      this.errorInfo = `${err.error.message}`;
    } else if (err.statusText == 'Unknown Error' && err.status == 0) {
      // this.errorInfo = "U\nknown Error - Please refresh the page"; // remove later
      this.errorInfo = "An unknown error has occurred. Refresh the page to try again";
    } else if (err.status && err.status == 401) {
      this.errorInfo = "User Unauthorized";
    } else {
      this.errorInfo = `${err.message}`;
    }
    let langfromapi = this.getspecificlangliterals()
    this.errorInfo = this.errorInfo != 'undefined' && this.errorInfo && langfromapi[this.errorInfo] ? langfromapi[this.errorInfo] : this.errorInfo

    return (this.errorInfo != 'undefined' && this.errorInfo.length) ? this.errorInfo : Object.values(this.flatten(err)).join(' - ');
  }

  traverseAndFlatten(currentNode, target, flattenedKey?) {
    for (var key in currentNode) {
      if (currentNode.hasOwnProperty(key)) {
        var newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = flattenedKey + '.' + key;
        }

        var value = currentNode[key];
        if (typeof value === "object") {
          this.traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey] = value;
        }
      }
    }
  }

  flatten(obj) {
    let flattenedObject = {};
    try {
      this.traverseAndFlatten(obj, flattenedObject);
    } catch (ex) {
      flattenedObject = {};
    }
    return flattenedObject;
  }

  checFoundationScope(access: AcessModifiers, checkScopes?: CheckScopes) {
    let scopes = this.getScopes();
    if (checkScopes) {
      if (checkScopes == CheckScopes.VALIDATE_FOUNDATION_SCOPE) {
        if (environment.VALIDATE_FOUNDATION_SCOPE) {
          scopes['cloud.rbac.foundation'] = scopes['cloud.rbac.foundation'] ? scopes['cloud.rbac.foundation'] : [];
          if (scopes && (scopes['cloud.rbac.foundation'])) {
            if (scopes['cloud.rbac.foundation'].includes('read') && access == AcessModifiers.READ) {
              return true;
            }
            if (scopes['cloud.rbac.foundation'].includes('write') && access == AcessModifiers.WRITE) {
              return true;
            }
            return false;

          } else {
            return false;
          }
        } else {
          return true;
        }
      } else if (checkScopes == CheckScopes.VALIDATE_SCOPE) {
        if (environment.VALIDATE_SCOPE) {
          scopes['cloud.rbac.foundation'] = scopes['cloud.rbac.foundation'] ? scopes['cloud.rbac.foundation'] : [];
          if (scopes && (scopes['cloud.rbac.foundation'])) {
            if (scopes['cloud.rbac.foundation'].includes('read') && access == AcessModifiers.READ) {
              return true;
            }
            if (scopes['cloud.rbac.foundation'].includes('write') && access == AcessModifiers.WRITE) {
              return true;
            }
            return false;

          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    } else {
      if (environment.VALIDATE_SCOPE && environment.VALIDATE_FOUNDATION_SCOPE) {
        scopes['cloud.rbac.foundation'] = scopes['cloud.rbac.foundation'] ? scopes['cloud.rbac.foundation'] : [];
        if (scopes && (scopes['cloud.rbac.foundation'])) {
          if (scopes['cloud.rbac.foundation'].includes('read') && access == AcessModifiers.READ) {
            return true;
          }
          if (scopes['cloud.rbac.foundation'].includes('write') && access == AcessModifiers.WRITE) {
            return true;
          }
          return false;

        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
  orgId;
  public checkExosModel(checkVersion?: string, equal?: integer) {
    let Id_org = this.getOrg(this.orgId);
    let getserialno = this.getSerialNo()
    let serialNumber = getserialno ? JSON.parse(getserialno) : '';
    if (serialNumber && serialNumber.length != 0 && serialNumber[0].serialNumber) {
      this.http.get(`${environment.API_BASE_URL}calix/support/device/feature-properties?${Id_org}serialNumber=${serialNumber[0].serialNumber}`).subscribe((res: any) => {
        if (checkVersion) {
          const v1 = res.softwareVersion.substring(0, res.softwareVersion.indexOf(".") + 1);
          const version = v1 + res.softwareVersion.replace(v1, '').substring(0, res.softwareVersion.replace(v1, '').indexOf("."));
          const check = equal ? (parseFloat(version) == parseFloat(checkVersion)) : false;
          if (this.acceptGSModel(res.modelName)) sessionStorage.setItem('exosVersion', version);
          if (this.acceptGSModel(res.modelName) && (parseFloat(version) > parseFloat(checkVersion) || check)) {
            this.isExosModel.next(true);
          } else {
            this.isExosModel.next(false);
          }
        } else if (this.acceptGSModel(res.modelName)) {
          this.isExosModel.next(true);
        } else {
          this.isExosModel.next(false);
        }
      }, error => {
        this.isExosModel.next(false);
      });
    }
  }

  exosVersionCheck(version, notReqModel = false, selectedSn = '') {
    let versionMatched = false;
    let deviceData = this.getSerialNo();
    let obj = deviceData ? JSON.parse(deviceData).filter(obj => (selectedSn ? obj.serialNumber == selectedSn : obj.opMode == 'RG')) : '';
    if (obj && obj.length != 0) {
      //if (obj.length) {
      obj = obj[0];
      obj.softwareVersion = obj.softwareVersion || '0';
      const v1 = obj.softwareVersion.substring(0, obj.softwareVersion.indexOf(".") + 1);
      const sv = v1 + obj.softwareVersion.replace(v1, '').substring(0, obj.softwareVersion.replace(v1, '').indexOf("."));
      versionMatched = (notReqModel || this.acceptGSModel(obj.modelName || '')) && parseFloat(sv) >= parseFloat(version)
    }
    return versionMatched;
  }
  getSoftwareVersion(notReqModel = false) {
    let versionMatched = false;
    let getserialnodata = this.getSerialNo()
    let obj = getserialnodata ? JSON.parse(getserialnodata).filter(obj => obj.opMode == 'RG') : '';
    if (obj && obj.length != 0) {
      //if (obj.length) {
      obj = obj[0];
      obj.softwareVersion = obj.softwareVersion || '0';
      const v1 = obj.softwareVersion.substring(0, obj.softwareVersion.indexOf(".") + 1);
      const sv = v1 + obj.softwareVersion.replace(v1, '').substring(0, obj.softwareVersion.replace(v1, '').indexOf("."));
      if ((notReqModel || this.acceptGSModel((obj.modelName || '')))) {
        return parseFloat(sv);
      }

    }
  }
  sendUserCommandIQData(data) {
    this.commandIQData.next(data);
  }

  getISOString(time) {
    return time.toISOString().substr(0, 16) + ':00';
  }

  checkAdminScopes(access: AcessModifiers) {
    let scopeAvail: boolean = false;
    let scopes = this.getScopes();
    if (environment.VALIDATE_SCOPE) {
      if (access == AcessModifiers.READ) {
        if (scopes['cloud.admin.orgs'] && (scopes['cloud.admin.orgs'].includes('write') || scopes['cloud.admin.orgs'].includes('read'))) {
          scopeAvail = true;
        }

        if (scopes['cloud.admin.users'] && (scopes['cloud.admin.users'].includes('write') || scopes['cloud.admin.users'].includes('read'))) {
          scopeAvail = true;
        }
      } else if (access == AcessModifiers.WRITE) {
        if (scopes['cloud.admin.orgs'] && (scopes['cloud.admin.orgs'].includes('write'))) {
          scopeAvail = true;
        }

        if (scopes['cloud.admin.users'] && (scopes['cloud.admin.users'].includes('write'))) {
          scopeAvail = true;
        }
      }

    } else {
      scopeAvail = true;
    }
    return scopeAvail;
  }

  isDevCheckFromBaseURL() {
    let base = `${environment.API_BASE}`;
    let isDev = false;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      isDev = true;
    }

    //isDev = true;
    return isDev;
  }

  isProdCheckFromBaseURL() {
    const base = `${environment.API_BASE}`;
    let isProd = false;
    if (base.indexOf('/api.calix.ai') > -1) {
      isProd = true;
    }
    return isProd;
  }

  validateUrl(value) {
    return /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i.test(value);
  }

  matchDomainAlone(str) {  /* Eg : google.com, cloud-stg.calix.com */
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9][\.a-zA-Z\.]{0,20}\.[a-zA-Z]{2,}$/i.test(str);
  }

  supportsGS(specificDevice = []) {
    return specificDevice.length
      ? this.acceptGSModel((specificDevice[0]?.modelName || ""))
      : (JSON.parse(this.getSerialNo()) || []).filter(obj => this.acceptGSModel(obj?.modelName || ""));
  }

  supportsGsRg() {
    return (JSON.parse(this.getSerialNo()) || []).filter(obj => (obj?.opMode || "").includes("RG") && this.acceptGSModel(obj?.modelName || ""));
  }

  setPageAccess(flag: boolean) {
    this.hasPageAccess$.next({
      access: flag
    });
  }

  isTSeries(modelName) {
    const tSeriesModelPattern = new RegExp("^T07(1|2|3|6|7)G");
    if (modelName) {
      return tSeriesModelPattern.test(modelName.toUpperCase());
    }
    return false;
  }

  getSubscriberInfo() {
    return JSON.parse(sessionStorage.getItem('calix.subscriberInfo') || '{}');
  }

  copyToClipboard(subId, bodyContentSelector) {
    let text = 'Subject:\n';
    text += `${document.querySelector(subId).textContent.trim()}\n\nBody:\n`
    document.querySelectorAll(bodyContentSelector).forEach(elem => {
      text += elem.textContent.trim() + '\n';
    });

    if (!navigator.clipboard) {
      this.copyForOldBrowser(text);
    } else {
      navigator.clipboard.writeText(text).then(function () {
        //console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        //console.error('Async: Could not copy text: ', err);
      });
    }
  }

  copyForOldBrowser(text: string) {
    let textArea: any = document.createElement("textarea");

    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      //console.log('Copying text command was ' + msg);
    } catch (err) {
      //console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }

  acceptGSModel(model) {
    return model?.includes('GS') || model?.includes('GPR') || model?.includes('GM')
  }

  triggerToggle() {
    this.toggled$.next(true);
  }

  getCCOUrlInfo() {
    return {
      home: {
        networktrends: {
          scope: 'cloud.rbac.coc.insights.networktrends',
          path: '/cco/home/network-trends'
        },
        'networktrends.activealarm': {
          scope: 'cloud.rbac.coc.insights.networktrends.activealarm',
          path: '/cco/home/network-trends'
        },
        'networktrends.biperrors': {
          scope: 'cloud.rbac.coc.insights.networktrends.biperrors',
          path: '/cco/home/network-trends'
        },
        'networktrends.activepons': {
          scope: 'cloud.rbac.coc.insights.networktrends.activepons',
          path: '/cco/home/network-trends'
        },
        'networktrends.subscriberimpacted': {
          scope: 'cloud.rbac.coc.insights.networktrends.subscriberimpacted',
          path: '/cco/home/network-trends'
        },
        systemtrends: {
          scope: 'cloud.rbac.coc.insights.subscribersystems',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.cmndiqstatus': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.cmndiqstatus',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.revedgesuiteecosystemstatus': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.revedgesuiteecosystemstatus',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.revedgesuitestatus': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.revedgesuitestatus',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.systemmodel': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.systemmodel',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.systemstatus': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.systemstatus',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.systemtype': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.systemtype',
          path: '/cco/home/system-service-trends'
        },
        'systemtrends.systembyrevenueedgeiqsuites': {
          scope: 'cloud.rbac.coc.insights.subscribersystems.systembyrevenueedgeiqsuites',
          path: '/cco/home/system-service-trends'
        },
        'insights.activdevicesgeomap': {
          scope: 'cloud.rbac.coc.insights.activdevicesgeomap',
          path: '/cco/home/active-systems-geomap'
        }

      },
      issues: {
        'cloud.rbac.coc.issues.systemalarms.realtime': {
          scope: 'cloud.rbac.coc.issues.systemalarms.realtime',
          path: '/cco/alerts/system/realtime/current-issues'
        },
        'cloud.rbac.coc.issues.systemalarms.activereports': {
          scope: 'cloud.rbac.coc.issues.systemalarms.activereports',
          path: '/cco/alerts/system/active-reports'
        },
        'cloud.rbac.coc.issues.systemalarms.historicalreports': {
          scope: 'cloud.rbac.coc.issues.systemalarms.historicalreports',
          path: '/cco/alerts/system/history-reports'
        },
        'cloud.rbac.coc.issues.transformalarms.realtime': {
          scope: 'cloud.rbac.coc.issues.transformalarms.realtime',
          path: '/cco/alerts/transformed/realtime/current-issues'
        },
        'cloud.rbac.coc.issues.transformalarms.activereports': {
          scope: 'cloud.rbac.coc.issues.transformalarms.activereports',
          path: '/cco/alerts/transformed/active-reports'
        },
        'cloud.rbac.coc.issues.transformalarms.historicalreports': {
          scope: 'cloud.rbac.coc.issues.transformalarms.historicalreports',
          path: '/cco/alerts/transformed/history-reports'
        },
        'cloud.rbac.coc.issues.healthalerts.realtime': {
          scope: 'cloud.rbac.coc.issues.healthalerts.realtime',
          path: '/cco/alerts/health/realtime/current-issues'
        },
        'cloud.rbac.coc.issues.healthalerts.activereports': {
          scope: 'cloud.rbac.coc.issues.healthalerts.activereports',
          path: '/cco/alerts/health/active-reports'
        },
        'cloud.rbac.coc.issues.healthalerts.historicalreports': {
          scope: 'cloud.rbac.coc.issues.healthalerts.historicalreports',
          path: '/cco/alerts/health/history-reports'
        },
        'cloud.rbac.coc.issues.cloudconnectivity.realtime': {
          scope: 'cloud.rbac.coc.issues.cloudconnectivity.realtime',
          path: '/cco/alerts/connectivity/realtime/current-issues'
        },
        'cloud.rbac.coc.issues.cloudconnectivity.activereports': {
          scope: 'cloud.rbac.coc.issues.cloudconnectivity.activereports',
          path: '/cco/alerts/connectivity/active-reports'
        },
        'cloud.rbac.coc.issues.cloudconnectivity.historicalreports': {
          scope: 'cloud.rbac.coc.issues.cloudconnectivity.historicalreports',
          path: '/cco/alerts/connectivity/history-reports'
        },
        'cloud.rbac.coc.issues.servicedisruptions': {
          scope: 'cloud.rbac.coc.issues.servicedisruptions',
          path: '/cco/alerts/disruption/list'
        },
        'cloud.rbac.coc.issues.events': {
          scope: 'cloud.rbac.coc.issues.events',
          path: '/cco/alerts/events/view'
        },

      },
      health: {
        pon_realtime: {
          scope: 'cloud.rbac.coc.health.pon.realtime',
          path: '/cco/health/pon-utilization/realtime'
        },
        pon_reports: {
          scope: 'cloud.rbac.coc.health.pon.report',
          path: '/cco/health/pon-utilization/overview'
        },
        ethernet: {
          scope: 'cloud.rbac.coc.health.ethernet',
          path: '/cco/health/uplink'
        },
        ont: {
          scope: 'cloud.rbac.coc.health.ont',
          path: '/cco/health/ont'
        },
        ae: {
          scope: 'cloud.rbac.coc.health.ae',
          path: '/cco/health/ae'
        },
        'cloud.rbac.coc.health.dsl': {
          scope: 'cloud.rbac.coc.health.dsl',
          path: '/cco/health/dsl'
        }
      },
      traffic: {
        network_realtime: {
          scope: 'cloud.rbac.coc.traffic.network.realtime',
          path: '/cco/traffic/network/realtime'
        },
        network_report: {
          scope: 'cloud.rbac.coc.traffic.network.report',
          path: '/cco/traffic/network/reports'
        },
        location_realtime: {
          scope: 'cloud.rbac.coc.traffic.location.realtime',
          path: '/cco/traffic/locations/realtime'
        },
        location_report: {
          scope: 'cloud.rbac.coc.traffic.location.report',
          path: '/cco/traffic/locations/reports'
        },
        application_realtime: {
          scope: 'cloud.rbac.coc.traffic.applications.realtime',
          path: '/cco/traffic/applications/realtime'
        },
        application_report: {
          scope: 'cloud.rbac.coc.traffic.applications.report',
          path: '/cco/traffic/applications/reports'
        },

      },
      services: {
        'cloud.rbac.coc.services.subscribers.subscriberslist': {
          scope: 'cloud.rbac.coc.services.subscribers.subscriberslist',
          path: '/cco/services/subscribers/system/list'
        },
        'cloud.rbac.coc.services.serviceprofiles.serviceprofiles': {
          scope: 'cloud.rbac.coc.services.serviceprofiles.serviceprofiles',
          path: '/cco/services/service-profiles/ONT-profile'
        },
        'cloud.rbac.coc.services.serviceprofiles.rgprofiles': {
          scope: 'cloud.rbac.coc.services.serviceprofiles.rgprofiles',
          path: '/cco/services/service-profiles/profiles'
        },
        'cloud.rbac.coc.services.serviceprofiles.rgdialplans': {
          scope: 'cloud.rbac.coc.services.serviceprofiles.rgdialplans',
          path: '/cco/services/service-profiles/dial-plan'
        },
        'cloud.rbac.coc.services.configuration.ontconfigurations': {
          scope: 'cloud.rbac.coc.services.configuration.ontconfigurations',
          path: '/cco/services/configuration/ONT-configurations'
        },
        'cloud.rbac.coc.services.configuration.externalfileserver': {
          scope: 'cloud.rbac.coc.services.configuration.externalfileserver',
          path: '/cco/services/configuration/external-file-server-list'
        },
        'cloud.rbac.coc.services.configuration.secureonboarding': {
          scope: 'cloud.rbac.coc.services.configuration.secureonboarding',
          path: '/cco/services/configuration/secure-onboarding'
        },
        'cloud.rbac.coc.services.configuration.stalesystempurge': {
          scope: 'cloud.rbac.coc.services.configuration.stalesystempurge',
          path: '/cco/services/configuration/stale-system-purge'
        },
        'cloud.rbac.coc.services.configuration.subnetconfiguration': {
          scope: 'cloud.rbac.coc.services.configuration.subnetconfiguration',
          path: '/cco/services/configuration/subnet-configuration'
        },
        'cloud.rbac.coc.services.configuration.speedtest': {
          scope: 'cloud.rbac.coc.services.configuration.speedtest',
          path: '/cco/services/configuration/speed-test'
        },
      },
      operations: {
        'cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems': {
          scope: 'cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems',
          path: '/cco/operations/system-onboarding/axos-callhome/axos/list',
        },
        'cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome': {
          scope: 'cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome',
          path: '/cco/operations/system-onboarding/axos-callhome/callhome/list',
        },
        'cloud.rbac.coc.operations.systemonboarding.cmsexacallhome': {
          scope: 'cloud.rbac.coc.operations.systemonboarding.cmsexacallhome',
          path: '/cco/operations/system-onboarding/cms-exa/list',
        },
        'cloud.rbac.coc.operations.systemonboarding.regionsettings': {
          scope: 'cloud.rbac.coc.operations.systemonboarding.regionsettings',
          path: '/cco/operations/system-onboarding/region-settings',
        },
        'cloud.rbac.coc.operations.alarms.transformalarmrules': {
          scope: 'cloud.rbac.coc.operations.alarms.transformalarmrules',
          path: '/cco/operations/alarms/transform-alarm-rules',
        },
        'cloud.rbac.coc.operations.alarms.alarmsandhealthnotifications': {
          scope: 'cloud.rbac.coc.operations.alarms.alarmsandhealthnotifications',
          path: '/cco/operations/alarms/health-alarm-notifications',
        },
        'cloud.rbac.coc.operations.alarms.alarmsettings': {
          scope: 'cloud.rbac.coc.operations.alarms.alarmsettings',
          path: '/cco/operations/alarms/settings',
        },
        'cloud.rbac.coc.operations.health.monitoringthresholds': {
          scope: 'cloud.rbac.coc.operations.health.monitoringthresholds',
          path: '/cco/operations/health/monitoring-thresholds',
        },
        'cloud.rbac.coc.operations.configuration.workflows': {
          scope: 'cloud.rbac.coc.operations.configuration.workflows',
          path: '/cco/operations/configuration/workflows',
        },
        'cloud.rbac.coc.operations.configuration.systemgroups': {
          scope: 'cloud.rbac.coc.operations.configuration.systemgroups',
          path: '/cco/operations/configuration/system-groups',
        },
        'cloud.rbac.coc.operations.configuration.softwareimages': {
          scope: 'cloud.rbac.coc.operations.configuration.softwareimages',
          path: '/cco/operations/configuration/software-images-list',
        },
        'cloud.rbac.coc.operations.configuration.performancetesting': {
          scope: 'cloud.rbac.coc.operations.configuration.performancetesting',
          path: '/cco/operations/configuration/performance-testing',
        },
        'cloud.rbac.coc.operations.configuration.configurationfiles': {
          scope: 'cloud.rbac.coc.operations.configuration.configurationfiles',
          path: '/cco/operations/configuration/configuration-files-list',
        },
        'cloud.rbac.coc.operations.configuration.axosmigration': {
          scope: 'cloud.rbac.coc.operations.configuration.axosmigration',
          path: '/cco/operations/configuration/migrations',
        },
        'cloud.rbac.coc.operations.report.mappedeplists': {
          scope: 'cloud.rbac.coc.operations.report.mappedeplists',
          path: '/cco/operations/cco-reports/mapped-endpoint-list',
        },
        'cloud.rbac.coc.operations.report.epcountbymapper': {
          scope: 'cloud.rbac.coc.operations.report.epcountbymapper',
          path: '/cco/operations/cco-reports/endpoint-count-bymapper',
        },
        'cloud.rbac.coc.operations.report.ontdevices': {
          scope: 'cloud.rbac.coc.operations.report.ontdevices',
          path: '/cco/operations/cco-reports/ont-devices',
        },
        'cloud.rbac.coc.operations.report.unmappedips': {
          scope: 'cloud.rbac.coc.operations.report.unmappedips',
          path: '/cco/operations/cco-reports/unmapped-ips',
        },
        'cloud.rbac.coc.operations.report.invreports': {
          scope: 'cloud.rbac.coc.operations.report.invreports',
          path: '/cco/operations/cco-reports/inventory-report',
        },
        'cloud.rbac.coc.operations.report.calloutcomereports': {
          scope: 'cloud.rbac.coc.operations.report.calloutcomereports',
          path: '/cco/operations/cco-reports/call-outcome-report',
        },
        'cloud.rbac.coc.operations.report.auditreports': {
          scope: 'cloud.rbac.coc.operations.report.auditreports',
          path: '/cco/operations/cco-reports/Audit-report',
        },
        'cloud.rbac.coc.operations.report.unassociatedsystems': {
          scope: 'cloud.rbac.coc.operations.report.unassociatedsystems',
          path: '/cco/operations/cco-reports/unassociated-devices',
        },

      },
      dashboard: {
        dashboard: {
          scope: 'cloud.rbac.coc.dashboard',
          path: '/cco/dashboard'
        },
      }
    }
  }

  /* Sanitizes the given input and returns only the accepted input to search */
  sanitizeSearch(val) {
    return (val.match(/[A-Za-z0-9&@,.()-]*/g) || []).join('');
  }

  getModelWithSn(sn) {
    return JSON.parse(this.getSerialNo()).filter((obj) => obj.serialNumber == sn).map((obj) => obj.modelName).join('');
  }

  queryStringToJSON(qs) {
    qs = qs || location.search.slice(1);

    var pairs = qs.split('&');
    var result = {};
    pairs.forEach(function (p) {
      var pair = p.split('=');
      var key = pair[0];
      var value = decodeURIComponent(pair[1] || '');

      if (result[key]) {
        if (Object.prototype.toString.call(result[key]) === '[object Array]') {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    });

    return JSON.parse(JSON.stringify(result));
  };

  jsonToQueryString(json = {}) {
    return Object.entries(json).map(e => e.join('=')).join('&');
  }

  public setFederatedLogin(value: any): void {
    if (value) {
      window.localStorage.setItem('calix.federated_login', 'true');
      this.federatedLogin$.next({
        secure: true
      });
    } else {
      window.localStorage.removeItem('calix.federated_login');
      this.federatedLogin$.next({
        secure: false
      });
    }
  }

  public isFederatedLogin(): any {
    return window.localStorage.getItem('calix.federated_login') ? true : false;
  }

  public doExitFederatedAccess(): void {
    this.setAccessToken('');
    this.setCSCLoggedIn(false);
    let res = this.isSecureAccess() ? this.getSecureAccessLoginData() : this.getLoginData();
    this.manageEntitlements(res.entitlements);
    this.setLoginInfo(this.isSecureAccess() ? this.getSecureAccessLoginData() : this.getLoginData());
    this.setFederatedLogin('');

    window.location.href = `${WindowRefService.prototype.nativeWindow}/federated-dashboard`;
  }

  getDefaultRoute() {
    let entArr = this.getEntitlementsArr();

    let ent = this.getValidEntitlements();

    let redirectRoute = '';

    if (entArr) {
      for (let i = 0; i < entArr.length; i++) {
        if (ent[entArr[i]]) {
          redirectRoute = ent[entArr[i]];
          break;
        }
      }
    }

    if (redirectRoute) {
      return redirectRoute;
    } else {
      return '/no-entitlements';

    }
  }

  showApps(res?: any): any {
    let apps: any = {};
    let enttlmnts = {}, roles = [];

    if (res && Object.keys(res).length) {
      res?.entitlements?.forEach((ent: any) => {
        enttlmnts[ent.apptype] = ent;
      })
      roles = res?.['roles'];
    } else {
      enttlmnts = this.getEntitlements();
      roles = this.getRoles();
    }

    if (enttlmnts[200] || enttlmnts[201] || enttlmnts[218]) {
      apps.foundation = true;
    }

    if (enttlmnts[119] || enttlmnts[209]) {
      apps.cmc = true;
    }

    if (enttlmnts[118] || enttlmnts[120]) {
      apps.csc = true;
    }

    if (enttlmnts[102] || enttlmnts[210]) {
      apps.cco = true;
    }

    if (roles && roles.indexOf('OrgAdmin') !== -1) {
      apps.orgAdmin = true;
    }

    if (roles && roles.indexOf('System Admin') !== -1) {
      apps.calixAdmin = true;
    }

    if (roles && roles.indexOf('SysAdmin') !== -1) {
      apps.calixAdmin = true;
    }

    return apps;
  }

  getValidEntitlements() {
    return {
      210: 'cco',
      102: 'cco',
      118: 'support',
      120: 'support',
      119: 'marketing',
      122: 'marketing',
      209: 'marketing',
      200: 'cco-foundation',
      201: 'cco-foundation',
      218: 'cco-foundation'
    };
  }

  isSmbEnabled(onboard = true, checkUnassociated = false) {
    const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
    return ((subInfo?.devices || []).some(obj => obj.bSmbMode) || subInfo?.device?.bSmbMode) && (onboard ? subInfo?.isSmbOnboarded : true); // || unassoSmb;
  }

  validateHexCode(testcase) {
    return testcase ? new RegExp("^#([A-Fa-f0-9]{3,6})$").test(testcase) : true;
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  checkScope(path, access) {
    const scopes = this.getScopes();
    return scopes[path] && scopes[path].includes(access)
  }

  checkSubWithinTime() {
    return parseInt(sessionStorage.getItem('outcomeTimer') || (new Date((new Date().getTime() + 5000))).toString()) < new Date().getTime()
  }

  commonOutcomeWarnConditn(scopeCheck = true) {
    return (scopeCheck ? this.checkScope('cloud.rbac.csc.calloutcome.enforce', 'read') : true)
      && sessionStorage.getItem('calloutcomeSubmitted') != 'true'
      && !this.isSecureAccess(true)
      && this.checkSubWithinTime();
  }

  isMenuActive(menuName: string) {
    if ((window.location.pathname).indexOf(`/${menuName}/`) !== -1) {
      return true;
    }

    return false;
  }

  auditLogParam(msg, objectType) {
    const subInfo = this.getSubscriberInfo();
    const rgDetail = (this.getDeviceData() || []).filter(device => device.opMode == "RG");
    return {
      "accessType": (sessionStorage.getItem('Orgacceforssid') == 'true') ? 'Calix' : 'BSP',
      "accountId": subInfo.subscriberLocationId,
      "accountName": subInfo.name,
      "action": msg,
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": rgDetail.length ? rgDetail[0]?.deviceId : '',
      "deviceType": rgDetail.length ? rgDetail[0]?.modelName : '',
      "objectType": objectType,
      "orgId": this.getOrgId(),
      "originator": this.getLoginData()?.username,
      "description": msg
    }
  }

  insertScopesForOrgAdmin() {
    let enttlmnts = this.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      return;
    }

    let scopes = this.getScopes();
    let roles = this.getRoles();
    let scopesToInsert = ['cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome', 'cloud.rbac.coc.operations.health.monitoringthresholds', 'cloud.rbac.coc.operations.systemonboarding.regionsettings', 'cloud.rbac.coc.operations.alarms.alarmsettings', 'cloud.rbac.coc.services.configuration.ontconfigurations'];
    if (roles?.indexOf('OrgAdmin') !== -1) {
      scopesToInsert?.forEach((scope: any) => {
        scopes[scope] = ["read", "write"];
      });

      window.localStorage.setItem('calix.scopes', JSON.stringify(scopes));

    }
  }

  removeScopesForFlowLtdEnt() {
    let scopes = this.getScopes();
    let enttlmnts = this.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102] && Object.keys(scopes)?.length) {
      delete scopes['cloud.rbac.coc.services.subscribers'];
      delete scopes['cloud.rbac.coc.services.subscribers.subscriberslist'];
      delete scopes['cloud.rbac.coc.services.serviceprofiles.serviceprofiles'];
      delete scopes['cloud.rbac.coc.services.serviceprofiles'];
      delete scopes['cloud.rbac.coc.operations.configuration.axosmigration'];
      delete scopes['cloud.rbac.coc.operations.configuration'];

      const readScopes = ['workflows', 'systemgroups', 'softwareimages', 'performancetesting', 'configurationfiles'];
      readScopes?.forEach((scope: any) => {
        if (scopes[`cloud.rbac.coc.operations.configuration.${scope}`]) {
          scopes[`cloud.rbac.coc.operations.configuration.${scope}`] = ['read'];
        }
      });

      if (scopes['cloud.rbac.coc.services.configuration.subnetconfiguration']?.length) {
        scopes['cloud.rbac.coc.services.configuration.subnetconfiguration'] = ['read'];
      }

      if (scopes['cloud.rbac.coc.services.serviceprofiles.rgprofiles']) {
        scopes['cloud.rbac.coc.services.serviceprofiles.rgprofiles'] = ['read'];
      }

      if (scopes['cloud.rbac.coc.services.configuration.speedtest']) {
        scopes['cloud.rbac.coc.services.configuration.speedtest'] = ['read'];
      }

      window.localStorage.setItem('calix.scopes', JSON.stringify(scopes));
    }

  }

  parseStored(key) {
    return JSON.parse(sessionStorage[key] || '{}')
  }

  callOutcomeBeforeUnload(e) {
    if (this.commonOutcomeWarnConditn()) {
      if (!e) e = window.event;
      const message = "Are you sure you want to close the tab";
      //e.cancelBubble is supported by IE - this will kill the bubbling process.
      e.cancelBubble = true;
      e.returnValue = message;
      //e.stopPropagation works in Firefox.
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }
      //return works for Chrome and Safari
      return message;
    }
  }

  callOutcomeOnUnload() {
    if (this.commonOutcomeWarnConditn()) {
      const url = `${environment.SUPPORT_URL}/useraudit/saveAuditLog`;
      //const data = ((this.auditLogParam(`Call Outcome not saved on tab close`, 'Call outcome not saved')) as unknown) as BodyInit;

      const data = this.auditLogParam(`Call Outcome not saved on tab close`, 'Call outcome not saved');
      navigator.sendBeacon = ((url, data) => {
        const params = {
          method: 'POST',
          body: data,
          headers: {
            'X-Calix-ClientID': environment.X_CALIX_CLIENTID, //todo sample
            'X-Calix-AccessToken': this.getAccessToken() ? this.getAccessToken() : 'token'
          }
        }
        window.fetch(url, params).then(res => {
          console.log("Updated tab close event");
        });
        this.sleep(2000);
        return true;
      });
      navigator.sendBeacon(url, JSON.stringify(data));
      /* const params: RequestInit = {
        method: 'POST',
        body: data,
        headers: {
          'X-Calix-ClientID': environment.X_CALIX_CLIENTID, //todo sample
          'X-Calix-AccessToken': this.getAccessToken() ? this.getAccessToken() : 'token'
        }
      }
      sessionStorage.removeItem('outcomeTimer');
      window.fetch(url, params).then(res => {
        console.log("Updated tab close event");
      }); */
    }
  }

  setCcoWrkflwReportId(id: any) {
    if (id) {
      window.sessionStorage.setItem('calix.cco_wrkflw_rpt_id', id);
    } else {
      window.sessionStorage.removeItem('calix.cco_wrkflw_rpt_id');
    }

  }

  getCcoWrkflwReportId() {
    return window.sessionStorage.getItem('calix.cco_wrkflw_rpt_id') ? window.sessionStorage.getItem('calix.cco_wrkflw_rpt_id') : undefined;
  }

  dwnldCcoWrkflwReportId() {
    const ccoWrkflwRptId = this.getCcoWrkflwReportId();

    if (!ccoWrkflwRptId) {
      return;
    }

    this.http.get(`${environment.API_BASE_URL}cco/report/download?shortId=${ccoWrkflwRptId}`, { responseType: 'text', observe: 'response' as 'body' }).subscribe((response: any) => {
      console.log(response);
      this.setCcoWrkflwReportId(undefined);
      let filename: string;
      try {
        filename = response.headers.get('Content-Disposition').split('=')?.[1]?.replace(/['"]+/g, '');
      } catch (e) {
        filename = 'reports.csv';
      }
      const blob = new Blob([response.body], { type: 'text/csv' })
      saveAs(blob, filename);
      this.openAlertModal({
        status: 'Success',
        message: 'File is downloaded successfully'
      });
    }, (err: any) => {
      console.log(err);
      this.setCcoWrkflwReportId(undefined);
      const errors = {
        401: `File can't be downloaded. Validation is failed.`,
        403: `File can't be downloaded. Validation is failed.`,
        500: `File can't  be downloaded. Report link is already expired or invalid.`,
        502: `File can't  be downloaded. Report link is already expired or invalid.`
      }
      this.openAlertModal({
        status: 'Error',
        message: errors[err.status] ? errors[err.status] : `File can't  be downloaded. Report link is already expired or invalid.`
      });
    });
  }

  isArray(inp) {
    return Array.isArray(inp);
  }

  openAlertModal(data: any) {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.data = data;
  }


}

