import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { SsoAuthService } from "./sso-auth.service";
import { Router, ActivationEnd } from '@angular/router';

import { Injector } from "@angular/core";
import { takeUntil } from 'rxjs/operators';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  private pendingHTTPRequests$ = new Subject<void>();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  isDev: boolean;


  constructor(
    private router: Router,
    private injector: Injector,
    private sso: SsoAuthService,
  ) {

    this.router.events.subscribe(event => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationEnd) {
        // Cancel pending calls
        this.refreshTokenInProgress = false;
        this.cancelPendingRequests();
      }
    });

    this.sso.refreshTokenNew$.subscribe((res: any) => {
      //console.log('set refreshTokenInProgress to false')
      this.refreshTokenInProgress = false;
    })

  }




  // Cancel Pending HTTP calls
  public cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
  addAuthHeader(request) {
    let rqstUrl = request.url;
    let hostName = window.location.host;
    if (hostName.includes('cloud-dev')) {
      this.isDev = true;
    } else {
      this.isDev = false;
    }
    const token = this.sso.getAccessToken() ? this.sso.getAccessToken() : 'token';
    if (rqstUrl.indexOf('login.mailchimp.com') !== -1) {

    } else if (rqstUrl.indexOf('gcs-dev') !== -1) {

    } else if (rqstUrl.indexOf('dev.virtualearth.net') !== -1) {

    } else if (rqstUrl.indexOf('/authentication/token') !== -1) {
      let headers = {
        'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
        //'X-Calix-AccessToken': token
      };

      // if (environment['IS_PRE_PRODUCTION']) {
      //   let body = request.body;
      //   if (body && body.indexOf("grant_type=secure_access") !== -1 || this.sso.isSecureAccess()) {
      //     // do not send 'X-Calix-PreProduction' header
      //   } else {
      //     headers['X-Calix-PreProduction'] = "yes";
      //   }
      // }

      request = request.clone({
        setHeaders: headers
      });
    } else if (rqstUrl.indexOf('/fa/') !== -1) {
      request = request.clone({
        setHeaders: {
          'X-Calix-ClientID': environment.X_CALIX_CLIENTID, //todo sample
          'X-Calix-AccessToken': token,
        }
      });
    } else if ((rqstUrl.indexOf('authentication/usertype') === -1 && token) && !rqstUrl.includes('dashboards-dev.calix.com')) {
      if (this.isDev) {
        request = request.clone({
          setHeaders: {
            'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
            'X-Calix-AccessToken': token
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            'X-Calix-ClientID': environment.X_CALIX_CLIENTID, //todo sample
            'X-Calix-AccessToken': token
          }
        });
      }
    } else if (rqstUrl.indexOf('authentication/usertype') !== -1) {
      request = request.clone({
        setHeaders: {
          'X-Calix-ClientID': environment.X_CALIX_CLIENTID, //todo sample
          'X-Calix-AccessToken': token
        }
      });
    } else {
      // request = request.clone({
      //   setHeaders: {
      //     Cookie: 'custom=ramu'
      //   }
      // });
    }

    /****************** Space Removing Code Temporarily Commented ******************/


    // if (request.body) {
    //   if (typeof request.body == 'object' && request.body !== null && !Array.isArray(request.body)) {
    //     request.body = this.removeSpaceFromObjects(request.body);
    //   } else if (typeof request.body == 'object' && Array.isArray(request.body)) {
    //     request.body = this.removeSpaceFromArrayElements(request.body);
    //   } else if (typeof request.body == 'string') {
    //     request.body = request.body
    //       .replace(/^[\s]+/, '')
    //       .replace(/[\s]+$/, '')
    //   .replace(/[\=][\w\s\-\%\*\$\#\@\!\^\<\>\,\.\?\/]+[\&]?/g,(word)=>{
    //   return `=${word.replace(/[=&]/g,'').replace(/^[\s]+/, '')
    //   .replace(/[\s]+$/, '')
    //   }${(word[word.length-1] == '&'?'&':'')}`
    // })
    //   }
    // }

    // if(request.urlWithParams && request.urlWithParams.includes('?')){
    //   let params = decodeURIComponent(request.urlWithParams).split('?');
    //   params[1] = params[1].replace(/[\=][\w\s\-\%\*\$\#\@\!\^\<\>\,\.\?\/]+[\&]?/g,(word)=>{
    //     return `=${word.replace(/[=&]/g,'').replace(/^[\s]+/, '')
    //     .replace(/[\s]+$/, '')
    //     }${(word[word.length-1] == '&'?'&':'')}`
    //   });
    //   request.urlWithParams = encodeURI(params.join('?'));
    // }
    return request;
  }

  /****************** Space Removing Code Temporarily Commented ******************/

  // removeSpaceFromObjects(obj) {
  //   for (let key in obj) {
  //     if (typeof obj[key] == 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
  //       obj[key] = this.removeSpaceFromObjects(obj[key]);
  //     } else if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
  //       obj[key] = this.removeSpaceFromArrayElements(obj[key]);
  //     } else if (typeof obj[key] == 'string') {
  //       try {
  //         const descriptors1 = Object.getOwnPropertyDescriptors(obj);
  //         console.log(descriptors1[key]?.writable)
  //         console.log(descriptors1[key]?.configurable)
  //         obj[key] = obj[key]
  //         .replace(/^[\s]+/, '')
  //         .replace(/[\s]+$/, '')
  //         ;
  //       }catch(err){
  //         console.clear();
  //         console.log(err)
  //       }

  //     }
  //   }
  //   return obj;
  // }
  // removeSpaceFromArrayElements(arr) {
  //   return arr.map((element) => {
  //     if (typeof element == 'object' && typeof element !== null && !Array.isArray(element)) {
  //       return this.removeSpaceFromObjects(element);
  //     } else if (typeof element == 'object' && Array.isArray(element)) {
  //       return this.removeSpaceFromArrayElements(element);
  //     } else if (typeof element == 'string') {
  //      return element = element
  //         .replace(/^[\s]+/, '')
  //         .replace(/[\s]+$/, '')
  //         ;
  //     }
  //   });
  // }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.sso.getAuthTokenByRT().pipe(
        tap((res: any) => {
          this.sso.manageScopes(res.scopes);
          this.sso.manageEntitlements(res.entitlements);
          this.sso.setAccessToken(res['access_token']);
          this.sso.setRefreshToken(res['refresh_token']);
          this.sso.setShadToken(res['access_token']);
          this.sso.setSpid(res['SpId']);
          this.sso.setUserInfo(res);

          this.sso.setLoginInfo(res);
          if (!this.sso.isSecureAccess() && !this.sso.isFederatedLogin()) {
            this.sso.setLoginData(res);
          }

          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }, (err: any) => {
          this.refreshTokenInProgress = false;
        }),
        // catchError(() => {
        //     this.refreshTokenInProgress = false;
        //     this.logout();
        // })
      );
    }
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
    // next.handle(request).pipe(takeUntil(this.onCancelPendingRequests()))
    return next.handle(request).pipe(catchError(error => {
      return this.handleResponseError(error, request, next);
    }));
  }


  handleResponseError(error, request?, next?) {
    // Business error
    if (error.status === 404) {
      // Show message

      console.log(error);
      if (typeof error.error == 'object') {
        let err = error.error;

        if (err && err.fault && err.fault.faultstring && err.fault.faultstring.toLowerCase() == 'invalid access token') {
          console.log("Received invalid access token from apigee");
          //this.router.navigate(['logout'], { queryParams: { error: err.fault.faultstring } });
        }
      }

    } else if (error.status === 403) {
      const isAcl = (error.statusText && error.statusText.toLowerCase().includes("acl error"));
      if (error.statusText === 'Forbidden' || !isAcl) {
        return throwError(error);
      }

      if (this.sso.isSecureAccess()) {
        this.sso.doExitSecureAccess();
        return;
      } else {
        this.sso.doLogoutCSC();
        this.sso.doLogout();
        localStorage.removeItem('calix.login_data');
        localStorage.removeItem('calix.userInfo');
        this.clearCalixAdminSessionData();
        if (typeof error.error === 'string') {
          this.router.navigate(['login'], { queryParams: { error: error.error } });
        } else {
          this.router.navigate(['login'], { queryParams: { error: 'ACL Check Failed' } });
        }

      }

    }

    // Invalid token error
    else if (error.status === 401) {
      if (error.url && error.url.includes('dashboards-dev.calix.com/')) {
        return throwError(error)
      }
      if (typeof error.error == 'object') {
        let err = error.error;

        if (err && err.fault && err.fault.faultstring && err.fault.faultstring.toLowerCase() == 'apikey not approved') {
          console.log("Received invalid access token from apigee api");
          //this.router.navigate(['logout'], { queryParams: { error: err.fault.faultstring } });

          this.sso.setApigeeError(true);

          return throwError(error);
        }
      }
      if (error.statusText && error.statusText === 'User Unauthorized' || error['statusText'].toLowerCase() === 'user unauthorized') {
        if (this.sso.isSecureAccess()) {
          this.sso.doExitSecureAccess();
        }

        this.sso.doLogoutCSC();
        this.sso.doLogout();
        localStorage.removeItem('calix.login_data');
        localStorage.removeItem('calix.userInfo');
        this.clearCalixAdminSessionData();
        this.router.navigate(['login']);
      }

      let rqstUrl = request?.url;
      let path = this.router.url;
      let validErrorCodesForRT = ["Invalid Access Token", "Expired Access Token", "Invalid or expired Access Token"];
      if (request && (rqstUrl.indexOf('authentication/token') !== -1 && path.indexOf('login') !== -1) || (typeof error.error == 'object' && error.error.errorMessage && validErrorCodesForRT.indexOf(error.error.errorMessage) === -1)) {
        //console.log("something went wrong , received 401 from refresh token api");
        //window.location.reload();
        return throwError(error);
      }

      if (error.statusText && path.indexOf('/organization-admin/csccfg/acs-settings') !== 1 && (error.statusText === 'Unauthorized User' || error['statusText'].toLowerCase() === 'unauthorized user')) {
        return throwError(error);
      }

      if ((error?.url || "").indexOf("calloutcome/extrefconfig/nisc/test") != -1) {
        return throwError(error);
      }

      if (request && rqstUrl.indexOf('/rt/sse/') !== -1) {
        //console.log("something went wrong , received 401 from refresh token api");
        window.location.reload();
        //return throwError(error);
      }

      //this.refreshTokenInProgress = false;

      if(request){
        return this.refreshToken().pipe(
          switchMap(() => {
            request = this.addAuthHeader(request);
  
            if (request?.url?.indexOf('/authentication/token') !== -1) {
              console.log(this.sso.queryStringToJSON(request.body));
              let formData = this.sso.queryStringToJSON(request.body);
              if (formData?.grant_type === 'secure_access') {
                formData.access_token = this.sso.getAccessToken();
                let formDataStr = this.sso.jsonToQueryString(formData);
                request = request.clone({
                  body: formDataStr
                });
              }
  
            } else if (request?.url?.indexOf('/grantor/changeorg') !== -1 && this.router.url.includes("federated-dashboard")) {
              console.log(this.sso.queryStringToJSON(request.body));
              let formData = this.sso.queryStringToJSON(request.body);
              formData.access_token = this.sso.getAccessToken();
              let formDataStr = this.sso.jsonToQueryString(formData);
              request = request.clone({
                body: formDataStr
              });
  
            }
  
            return next.handle(request).pipe(catchError(error => {
              return throwError(error);
            }));
          }),
          catchError(e => {
            this.refreshTokenInProgress = false;
            return this.handleResponseError(e);
            // if (e.status !== 401) {
            //   return this.handleResponseError(e);
            // } else {
            //   return throwError(error);
            //   //this.logout();
            // }
          }));
      }
    }

    // Server error
    else if (error.status === 500) {
      if (typeof error.error == 'object') {
        let err = error.error;

        if (err && err.fault && err.fault.faultstring && err.fault.faultstring.toLowerCase() == 'consumer key not approved') {
          console.log("Received Consumer Key not approved from apigee api");

          this.sso.setApigeeError(true);

          return throwError(error);
        }
      }

      this.sso.setApiError("Internal Server Error");
      let rqstUrl = request.url;
      if (rqstUrl.indexOf('authentication/token') !== -1) {
        console.log("something went wrong , received 500 from apigee api");
        if (!this.router.url.includes("login")) {
          this.router.navigate(['/logout']);
        }
        //window.location.reload();
        if (!this.router.url.includes("login")) {
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      }
      // Show message

    } else if (error.status === 502) {
      this.sso.setApiError(error);
    } else if (error.status === 503) {
      // Show message
      // Redirect to the maintenance page
      this.sso.setApiError(error);
    } else if (error.status === 504) {
      //this.sso.setApiError(error);
      this.sso.setApiError("Gateway Timeout");
    } else if (error.status === 599) {
      this.sso.setApiError(error);
    }

    return throwError(error);
  }

  clearCalixAdminSessionData() {
    sessionStorage.removeItem('calixAdminOrgDetail');
    sessionStorage.removeItem('calixAdminOrgID');
    sessionStorage.removeItem('calixAdminUserDetail');
    sessionStorage.removeItem('calixAdminAddRole');
    sessionStorage.removeItem('calixAdminAddRoleId');
    sessionStorage.removeItem('SecuredAccessUser');

  }


}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpConfigInterceptor,
  multi: true
};