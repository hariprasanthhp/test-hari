declare let pendo: any;
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { WindowRefService } from '../shared/services/window-ref.service';
import { TranslateService } from 'src/app-services/translate.service';
import { combineLatest, Observable, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { qlikLogout } from '../marketing/shared/services/qlik-connection.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../sys-admin/services/common.service';
//import { PrimeNGConfig } from 'primeng/api';
//import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //providers: [MessageService]

})
export class LoginComponent implements OnInit {
  isLogInProcess = false;
  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  bgImageLoaded: boolean = false;
  bgimgloaded: boolean = false;
  actionUrl = '';
  serviceUrl = '';
  authCode = '';
  salesForceUser = '';
  isLoading = false;
  isLocalUser = false;
  username: any = '';
  ClientID: any = environment.X_CALIX_CLIENTID;
  nonce = this.nonceMake(5);
  state = 'kIkEzov59UkRpsFf';
  scope = 'openid';
  response_type = 'code';
  client_secret = environment.X_CALIX_SECURE_CLIENTID;
  disabled: boolean = false;
  errorMsg = '';
  showError = false;
  isCSCLoggedOut = false;
  noTerms: boolean = true;
  apps = {
    cmc: false,
    csc: false,
    cco: false,
    foundation: false,
    shad: false,
    orgAdmin: false,
    calixAdmin: false
  };
  language: any;
  //  langfromapi: any;
  languageSubject;
  ssoLoading = false;
  entitlementError: any = '';
  specificlangliteralsobj: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SsoAuthService,
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
    private ssoAuthService: SsoAuthService,
    //    private pcalendarconfig: PrimeNGConfig,
    //    private messageService: MessageService,
    private http: HttpClient,
    private titleService: Title,
    private commonService: CommonService
  ) {

    if (!sessionStorage.getItem('defaultLanguage')) {
      sessionStorage.setItem('defaultLanguage', 'en');
    }
  }

  ngOnInit(): void {

    //    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});

    //   this.pcalendarconfig.ripple = true;
    this.titleService.setTitle('Login - Calix Cloud');
    sessionStorage.removeItem('extUserCheckModuleWise');
    this.urlsInfo = this.ssoAuthService.getCCOUrlInfo();
    //  FOR WINDOW REFRESH ADVANCED KPIS
    if (!this.ssoAuthService.getRefresh()) {
      // window.location.reload();
      qlikLogout();
      this.ssoAuthService.setRefresh(true)
    }
    setTimeout(() => {
      this.bgimgloaded = true;
    });

    setTimeout(() => {
      this.bgImageLoaded = true;
    });

    if (sessionStorage.getItem('hard_refresh_the_page')) {
      sessionStorage.removeItem('hard_refresh_the_page')
      window.location.reload();
    }

    this.watchActiveLogin();
    //this.service.setLogoutFlag(true);
    if (this.service.isLoggedIn()) {
      this.gotoUserSessionPage();
    }

    this.isCSCLoggedOut = this.service.isCscLoggedOut();
    if (this.isCSCLoggedOut) {
      this.service.setCscLoggedOut(false);
    }
    //this.serviceUrl = WindowRefService.prototype.nativeWindow + '/#/login';
    this.serviceUrl = WindowRefService.prototype.nativeWindow + '/login';
    this.actionUrl = `${environment.AUTH_API_HOST}/authorize`;

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (typeof params['isLocalUser'] !== "undefined") {
        console.log("defined", typeof params['isLocalUser']);
        if (params['isLocalUser'] == 'true' && params['username']) {
          this.username = params['username'];
          this.isLocalUser = true;
        } else if (params['isLocalUser'] == 'false' && params['username']) {
          this.username = params['username'];
          this.salesForceUser = params['username'];

          setTimeout(() => {
            document.getElementById('form-submit').click();
          }, 1000)
        }

        return;
      }

      this.authCode = params['code'];

      if (this.authCode) {
        this.ssoLoading = true;
        this.getAuthenticationToken({ code: this.authCode }, 'authorization_code');
      }

      if (params['error']) {
        this.addError(params['error']);
      }

    });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.receiveLogoutFlag();
    //    this.langfromapi=this.ssoAuthService.getspecificlangliterals()
  }

  hideWalkMeIntrvl: any;
  ngAfterViewInit() {
  }

  isIframeEventPassed = false;
  iframeLoadEvent(): any {

  }

  loading = false;
  onSignin(formData): any {
    if (this.loading) {
      return;
    }
    this.loading = true;
    event.preventDefault();
    this.clearError();
    let username = formData.username;
    username = username.trim();
    if (!username) {
      this.addError('Missing Username');
      this.isLocalUser = false;
      return;
    }
    this.service.setShowHeader(true);
    //console.log(formData);
    this.disabled = true;
    if (!this.isLocalUser) {
      this.salesForceUser = formData.username;

      this.service.checkUsername(formData.username).subscribe(
        (res: any) => {
          this.loading = false;
          //this.toastr.success('User verified successfully!', 'User Verification');
          //console.log(res);
          this.disabled = false;
          this.isLocalUser = false;
          let domainGeos = {
            'https://calixcloud.calix.com': 'United States',
            'https://www.calixcloud.calix.com': 'United States',
            'https://calixcloud-ca.calix.com': 'Canada',
            'https://www.calixcloud-ca.calix.com': 'Canada',
            'http://localhost:4200': 'United States',
            'http://localhost:61059': 'Canada',
            'https://cloud-dev.calix.com': 'United States',
            'https://cloud-stg.calix.com': 'United States',
            'http://ec2-13-127-84-165.ap-south-1.compute.amazonaws.com': 'Canada',
            'https://stage.elitecorpusa.in': 'United States',
            'https://cloud-devfunc.calix.com': 'United States',
            'https://cloud-stg-internal.calix.com': 'United States'
          }

          let geoUrls = {
            'United States': 'https://calixcloud.calix.com/login',
            'Canada': 'https://calixcloud-ca.calix.com/login'
          }

          let origin = WindowRefService.prototype.nativeWindow;

          if (origin.indexOf('cloud-dev.calix.com') !== -1) {
            geoUrls = {
              'United States': 'https://cloud-dev.calix.com/login',
              'Canada': 'http://ec2-13-127-84-165.ap-south-1.compute.amazonaws.com/login'
            }
          } else if (origin.indexOf('cloud-stg.calix.com') !== -1) {
            geoUrls = {
              'United States': 'https://cloud-stg.calix.com/login',
              'Canada': 'https://cloud-stg.calix.com/login'
            }
          } else if (origin.indexOf('localhost') !== -1) {
            geoUrls = {
              'United States': 'http://localhost:4200/login',
              'Canada': 'http://localhost:61059/login'
            }
          } else if (origin.indexOf('calixcloud.calix.com') === -1 && origin.indexOf('calixcloud-ca.calix.com') === -1) {
            geoUrls = {
              'United States': `${origin}/login`,
              'Canada': `${origin}/login`
            }
          } else if (origin.indexOf('cloud-devfunc.calix.com') !== -1) {
            geoUrls = {
              'United States': 'https://cloud-devfunc.calix.com/login',
              'Canada': 'https://cloud-devfunc.calix.com/login'
            }
          } else if (origin.indexOf('cloud-stg-internal.calix.com') !== -1) {
            geoUrls = {
              'United States': 'https://cloud-stg-internal.calix.com/login',
              'Canada': 'https://cloud-stg-internal.calix.com/login'
            }
          }

          if (res['success'] && res['cloudGeography'] && domainGeos[origin] !== res['cloudGeography']) {
            if (res['success'] === 'local') {
              let params = {
                isLocalUser: true,
                username: formData.username,
                redirectUrl: geoUrls[res['cloudGeography']]
              }

              this.router.navigate(['redirect'], { queryParams: params });
            } else if (res['success'] !== 'local') {
              let params = {
                isLocalUser: false,
                username: formData.username,
                redirectUrl: geoUrls[res['cloudGeography']]
              }

              this.router.navigate(['redirect'], { queryParams: params });
            }
          } else if (res['success'] === 'local') {
            this.isLocalUser = true;
          } else if (res['success'] !== 'local') {
            if (history?.state?.externalUser && history?.state?.url.includes('/subscriber/search')) {
              //localStorage.setItem('externalUser', history.state);
              localStorage.setItem('externalUser', JSON.stringify(history.state));
            }
            document.getElementById('form-submit').click();
          }
        }, err => {
          //console.log(err);
          //console.log(err.status);
          this.disabled = false;
          this.loading = false;
          this.addError(err.statusText);
          //this.toastr.error('Something went wrong!', 'User Verification');
        }
      );
    } else {
      let password = formData.password;
      if (!password) {
        this.addError('Please enter Password');
        this.disabled = false;
        return;
      }
      this.getAuthenticationToken(formData, 'password');

      return;
    }
  }

  getAuthenticationToken(formValue, grantType) {
    ////console.log(formValue);
    formValue['client_secret'] = this.client_secret;
    formValue['redirect_uri'] = this.serviceUrl;

    this.service.getAuthToken(formValue, grantType).subscribe(
      (res: any) => {
        this.isLogInProcess = true;
        //console.log(res);
        this.isLoading = false;
        this.service.setLogoutFlag(false);

        if (res['access_token']) {
          this.commonService.initUpdateCronJob(false);
          this.service.setCSCLoggedIn(false);
          this.service.setLoginData(res);
          this.service.setLoginInfo(res);
          let salesUserCheck = grantType == 'authorization_code' ? localStorage.setItem('salesuser', 'true') : localStorage.setItem('salesuser', 'false')
          this.showApps();
          if (!sessionStorage.getItem('defaultLanguage')) {
            sessionStorage.setItem('defaultLanguage', 'en');
          }

          if (res?.language) {

            let languageObjForUI = {
              'en_US': 'en',
              'fr_CA': 'fr',
              'es_US': 'es',
              'de_DE': 'de_DE'
            }

            let language = languageObjForUI[res.language] ? languageObjForUI[res.language] : 'en';

            sessionStorage.setItem('defaultLanguage', language);
            localStorage.setItem('defaultLanguage', language);

            this.translateService.changeLanguage(language, true);
            this.customTranslateService.changeLanguage(language);
            this.getsupportedlanguages(language)
          }

          this.setActionLogOrgInfo(res);

        }


      }, (err: any) => {
        //console.log(err);
        this.loading = false;
        this.ssoLoading = false;

        if (err.status == '403') {
          this.addError('ACL Check Failed');
        } else if (err.status == '404') {
          this.addError(err.statusText);
        } else {
          this.isLocalUser = false;
          this.addError('Invalid Username/Password');
        }
        this.isLoading = false;
        this.disabled = false;
        //this.toastr.error('Authentication error!', 'Authentication');
      });
  }
  getsupportedlanguages(langfromtoken) {
    this.service.getallsupportedlanguages().subscribe(
      (res: any) => {
        //this.isLogInProcess = true;
        // this.isLoading = false;
        if (res) {
          localStorage.setItem('lang_id', JSON.stringify(res));
        }
        this.specificliterals(langfromtoken)
      }, (err: any) => {
        // this.loading = false;
        // this.ssoLoading = false;
        // this.addError(err.statusText);
        //  this.isLoading = false;
        //  this.disabled = false;
      });
  }
  specificliterals(langfromtoken) {
    let lang_id
    let getlangid = localStorage.getItem('lang_id') ? JSON.parse(localStorage.getItem('lang_id')) : '';
    for (var i = 0; i < getlangid?.length; i++) {
      if (getlangid[i]?.code == langfromtoken) {
        lang_id = getlangid[i]?.id
      }
    }
    this.service.getspecificliterals(lang_id).subscribe(
      (res: any) => {
        //  this.isLogInProcess = true;
        //console.log(res);
        //  this.isLoading = false;
        if (res) {
          for (var i = 0; i < res?.length; i++) {
            this.specificlangliteralsobj[res[i]?.literals.key] = res[i]?.literals.value
          }
        }

        //console.log("specificlangliteralsobj",this.specificlangliteralsobj.length, this.specificlangliteralsobj)
        //console.log(JSON.stringify(this.specificlangliteralsobj))

        localStorage.setItem('specificlangliterals', JSON.stringify(this.specificlangliteralsobj))
        // let retrived = localStorage.getItem('specificlangliterals') ? JSON.parse(localStorage.getItem('specificlangliterals')) : '';

        // console.log("retrived",retrived.length,retrived)

      }, (err: any) => {
        /*    this.loading = false;
            this.ssoLoading = false;
            this.addError(err.statusText);
            this.isLoading = false;
            this.disabled = false;*/
      });
  }


  nonceMake(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  gotoDP(): void {
    let entArr = this.service.getEntitlementsArr();

    let ent = this.ssoAuthService.getValidEntitlements();

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
      this.router.navigate([redirectRoute]);
    } else {
      //this.router.navigate(['/no-entitlements']);
      this.ssoAuthService.doLogout();
      this.addError(this.entitlementError ? this.entitlementError : ' No Valid Entitlement [401]');
      this.entitlementError = '';
      this.isLoading = false;
      this.disabled = false;
    }

  }

  showApps(): void {
    this.apps = this.service.showApps();

    if (this.apps.cco) {
      this.getCCOUrl();
    }
  }

  public addError(str: string): void {
    this.errorMsg = str;
    this.showError = true;
    this.loading = false;
  }

  public clearError(): void {
    this.errorMsg = '';
    this.showError = false;
  }

  watchLoginService: any;
  watchActiveLogin(): any {
    console.log('watch login from login component');
    this.watchLoginService = setInterval(() => {
      if (this.service.isLoggedIn() && !this.isLogInProcess) {
        console.log('logged in from other tab');
        this.gotoUserSessionPage();
      }
    }, 10000);
  }

  isLogout = false;
  logoutSubscribe: any;
  receiveLogoutFlag() {
    this.logoutSubscribe = this.service.logoutResult$.subscribe((json: any) => {
      if (json.logout) {
        this.isLogout = true;
      } else {
        this.isLogout = false;
      }

    });
  }


  gotoUserSessionPage(): any {
    // if (this.isLogout) {
    //   return;
    // }
    this.showApps();
    let landingPage = this.service.getLandingPage();

    if (landingPage && landingPage.toLowerCase() == 'grantor_orgs') {
      this.router.navigate(['federated-dashboard']);
    } else if (landingPage && landingPage.toLowerCase() == 'cco' && this.apps.cco) {
      this.router.navigate([this.ccoUrl]);
    } else if (landingPage && this.apps.cmc && landingPage.toLowerCase() == 'cmc') {
      this.router.navigate(['/engagement']);
    } else if (landingPage && (landingPage.toLowerCase() == 'csc' || landingPage.toLowerCase() == 'main page') && this.apps.csc) {
      if (this.router.url.includes('/subscriber/search') || history?.state?.externalUser) {
        const state = Object.assign({ 'externalUser': true }, (history?.state?.externalUser ? history?.state : this.route.snapshot.queryParams));
        this.router.navigate(['/support/search'], { state: state });
      }
      else if (sessionStorage.getItem('outsideUser'))
        this.router.navigate(['/support/search'], { state: JSON.parse(sessionStorage.getItem('outsideUser')) });
      else this.router.navigate(['/support']);
    } else if (landingPage && landingPage.toLowerCase() == 'DC' && this.apps.foundation) {
      this.router.navigate(['/cco-foundation']);
    } else if (landingPage && landingPage.toLowerCase() == 'shad' && this.apps.shad) {
      this.router.navigate(['/shad']);
    } else {
      this.gotoDP();
    }
  }

  ngOnDestroy() {
    if (this.watchLoginService) {
      clearInterval(this.watchLoginService);
    }

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.logoutSubscribe) {
      this.logoutSubscribe.unsubscribe();
    }

  }

  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  setActionLogOrgInfo(redirectRes) {
    let orgId = this.service.getOrgId();
    let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/${orgId}`;

    this.http.get(url).subscribe((res: any) => {
      this.ssoLoading = false;
      let oracleId = '';
      this.ssoAuthService.setClientSessionId();
      if (res && res.calixOrganization && res.calixOrganization.oracleId) {
        oracleId = res.calixOrganization.oracleId;
      }
      this.ssoAuthService.setOrgOracleId(oracleId);
      setTimeout(() => {
        this.ssoAuthService.setActionLog('CSC', 'login', 'login', window.location.href, 'User logged into the app');
        setTimeout(() => {
          this.pageRedirection(redirectRes);
        }, 10);
      }, 10);
    }, (err: HttpErrorResponse) => {
      this.ssoLoading = false;
      this.ssoAuthService.setClientSessionId();
      this.ssoAuthService.setOrgOracleId('');
      setTimeout(() => {
        this.ssoAuthService.setActionLog('CSC', 'login', 'login', window.location.href, 'User logged into the app');
        setTimeout(() => {
          this.pageRedirection(redirectRes);
        }, 10);
      }, 10);
    })
  }

  pageRedirection(res) {
    if (res['landingPage'] && res['landingPage'].toLowerCase() == 'grantor_orgs') {
      this.router.navigate(['federated-dashboard']);
    } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cco' && this.apps.cco) {
      this.router.navigate([this.ccoUrl]);
    } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cmc' && this.apps.cmc) {

      this.router.navigate(['/engagement']);
    } else if (res['landingPage'] && (res['landingPage'].toLowerCase() == 'csc' || res['landingPage'].toLowerCase() == 'main page') && this.apps.csc) {
      if (history?.state?.externalUser && history?.state?.url.includes('/subscriber/search')) {
        const state = Object.assign({ 'externalUser': true }, history?.state?.param);
        this.router.navigate(['/support/search'], { state: state });
      } else if (sessionStorage.getItem('outsideUser')) {
        this.router.navigate(['/support/search'], { state: JSON.parse(sessionStorage.getItem('outsideUser')) });
      }
      else this.router.navigate(['/support']);
    } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'DC' && this.apps.foundation) {
      this.router.navigate(['/cco-foundation']);
    }

    // else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'shad' && this.apps.shad && this.service.checkUserHasServiceAccessByAppId('shad')) {
    //   this.router.navigate(['/shad']);
    // } 
    else {
      this.gotoDP();
    }
  }


  menus = {
    home: false,
    issues: false,
    health: false,
    traffic: false,
    services: false,
    operations: false,
    dashboard: false
  }

  urls = {
    home: '/cco/home',
    issues: '/cco/issues',
    health: '/cco/health',
    traffic: '/cco/traffic',
    services: '/cco/services',
    operations: '/cco/operations',
    dashboard: './dashboard'
  }

  urlsInfo = {}

  ccoUrl = '';

  getCCOUrl() {
    let scopes = this.ssoAuthService.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.insights') !== -1) {
            this.menus['home'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.issues') !== -1) {
            this.menus['issues'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.health') !== -1) {
            this.menus['health'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic') !== -1) {
            this.menus['traffic'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.services') !== -1) {
            this.menus['services'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations') !== -1) {
            this.menus['operations'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.dashboard') !== -1) {
            this.menus['dashboard'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        home: true,
        issues: true,
        health: true,
        traffic: true,
        services: true,
        operations: true,
        dashboard: true
      }

    }

    let keys = Object.keys(this.menus);

    if (keys) {
      for (let k = 0; k < keys.length; k++) {
        let key = keys[k];

        if (!this.menus[key]) {
          continue;
        }


        if (this.urlsInfo[key]) {
          let ukeys = Object.keys(this.urlsInfo[key]);

          if (ukeys.length) {
            for (let i = 0; i < ukeys.length; i++) {
              if (scopes[this.urlsInfo[key][ukeys[i]].scope]) {
                this.urls[key] = this.urlsInfo[key][ukeys[i]].path;
                if (!this.ccoUrl) {
                  this.ccoUrl = this.urlsInfo[key][ukeys[i]].path;
                }


                break;
              }
            }
          }

        }

        if (this.menus[key]) {
          break;
        }
      }
    }
  }

  getUserPreference(userId) {
    return this.http.get(`${environment.calixAdminURL}user/${userId}`);
  }

}