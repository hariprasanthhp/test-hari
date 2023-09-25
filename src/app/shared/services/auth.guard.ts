import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate, UrlSegment, Route, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { SsoAuthService } from './sso-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanDeactivate<any> {
  previousUrl: string = "";

  constructor(private router: Router, private sso: SsoAuthService, private activatedRoute: ActivatedRoute) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((state.url).indexOf('/logout') > -1 && !this.sso.getRefreshToken()) {
      console.log("user got already logged out, redirecting to login");
      this.router.navigate(['/login']);
      return false;
    }

    let enttlmnts = this.sso.getEntitlements();
    // if ((state.url).indexOf('/organization-admin/') !== -1) {
    //   let roles = this.sso.getRoles();
    //   if (roles && roles.indexOf('OrgAdmin') === -1) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // } else 
    if ((state.url).indexOf('/systemAdministration/') !== -1) {
      let roles = this.sso.getRoles();
      if (roles && roles.indexOf('SysAdmin') === -1) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if ((state.url).indexOf('/cco-subscriber-operations/operations/') !== -1) {
      if (enttlmnts[210] && !enttlmnts[102]) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if ((state.url).indexOf('/cco/operations/cco-subscriber-operations/configurations/background-site-scan') !== -1) {
      if (!(enttlmnts[118] || enttlmnts[120])) {
        this.router.navigate(['/cco/operations/cco-subscriber-operations/configurations/dial-plan']);
        return false;
      }
    }


    if (enttlmnts[210] && !enttlmnts[102]) {
      let blockedRoutes = ['/organization-admin/cco-admin/network-systems/list',
        '/organization-admin/cco-admin/network-systems/add',
        '/organization-admin/cco-admin/cco-admin-configurations',
        '/cco/system/cco-network-system/add',
        '/cco/system/cco-subscriber-system/add-service-system',
        '/cco/dashboard',
        '/cco/operations/cco-reports/ont-devices',
        '/cco/services/subscribers/system/list'
      ];

      if (blockedRoutes.indexOf(state.url) !== -1) {
        this.router.navigate(['/login']);
        return false;
      }

    }



    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let pathname = window.location.pathname;

    if (pathname.indexOf('/shad/') > -1) {
      this.router.navigate(['/login']);
      return false;
    }

    const state = this.sso.checkScope('cloud.rbac.csc.calloutcome.enforce', 'read')
      ? JSON.parse(sessionStorage.getItem('extUserCheckModuleWise') || "{}")
      : {};
    const redirectionPath = segments.map((obj) => `/${obj.path}`).join('');
    if (Object.keys(state).length
      && redirectionPath != state?.routeTo
      && this.sso.commonOutcomeWarnConditn(false)) {
      state.externalUserNotAllowed = true;
      this.router.navigate([state?.routeTo || '/support/overview'], { "state": state });
      return false;
    } else if ((state.routeTo || '').includes('support') && (sessionStorage.getItem('insideSubView') || sessionStorage.getItem('supportInsights')) && history?.state) {
      history.state.externalUserNotAllowed = true;
    }

    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(route);
    let url = state.url;

    if (url.indexOf('traffic-reports') !== -1) {
      if (this.sso.getSubscriberEndpointId()) {
        return true;
      } else {
        this.router.navigate(['/support/subscriber/search']);
        return false;
      }
    }

    return true;
  }

  checkLogin() {
    if (this.sso.isLoggedIn()) {
      //console.log(this.router.url);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((history?.state?.externalSearch || sessionStorage.getItem('insideSubView') || sessionStorage.getItem('supportInsights'))
      && this.sso.commonOutcomeWarnConditn()) {
      let navigatedToTile = ['overview', 'service', 'router', 'wifi', 'device', 'application', 'traffic-reports', 'insights']
        .some((ele) => (nextState.url.includes(`support/${ele}`) || nextState.url.includes('logout')))
      history.state.externalUserNotAllowed = !navigatedToTile;
      if (nextState.url.includes('logout') && document.querySelector('#openLogoutConfirmationModel')) {
        (document.querySelector('#openLogoutConfirmationModel') as HTMLButtonElement).click();
        return false;
      }
      const navInfo = this.sso.parseStored('extUserCheckModuleWise');
      sessionStorage.setItem(
        'extUserCheckModuleWise',
        JSON.stringify({
          ...history.state,
          ...{
            "prevUrl": navigatedToTile ? currentState.url : (navInfo?.prevUrl || currentState.url),
            "routeTo": (navigatedToTile ? nextState.url : currentState.url)
          }
        })
      );
      if (history?.state?.externalSearch) this.router.navigate([navigatedToTile ? nextState.url : currentState.url], { state: history.state })
      setTimeout(() => {
        if (!navigatedToTile && document.getElementById('extUserCreateWarning')) document.getElementById('extUserCreateWarning').classList.remove('d-none')
      }, 100);
      return navigatedToTile;
    }

    return true;
  }

}
