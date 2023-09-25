import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from "../shared/services/sso-auth.service";
import { Router } from '@angular/router';
import { qlikLogout } from '../marketing/shared/services/qlik-connection.js';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: SsoAuthService, private router: Router) { }
  thoughtspotLogout() {
    this.auth.logoutThoughtspot().subscribe((res) => {
      console.log(res)
    })
  }
  ngOnInit() {
    if (!this.auth.getRefreshToken()) {
      this.router.navigate(['login']);
      return;
    }

    this.thoughtspotLogout();
    // (async () => {
    //   const token = this.auth.getAccessToken() ? this.auth.getAccessToken() : 'token';

    //   this.auth.doLogoutCSC();
    //   this.auth.doLogout();
    //   localStorage.removeItem('calix.login_data');
    //   localStorage.removeItem('calix.userInfo');
    //   this.clearCalixAdminSessionData();

    //   const cleanApi = await fetch(`${environment.CALIX_URL}cleanupSession`, {
    //     method: 'GET',
    //     headers: {
    //       'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
    //       'X-Calix-AccessToken': token,
    //     },
    //   })
    //     .then(response => {
    //       console.log(response);
    //       if (response.redirected) {
    //         window.location.href = response.url;
    //       }

    //       if (response.status === 200) {

    //       }

    //     })
    //     .then((data: any) => {
    //       console.log(data)
    //     })
    //     .catch((error: any) => {
    //       console.error(error);
    //       //this.router.navigate(['login']);
    //     });

    // })();

    this.auth.setLogoutFlag(true);

    this.auth.setActionLog('CSC', 'logout', 'logout', window.location.href, 'User logged out the app');

    if (this.auth.getAccessToken()) {
      this.auth.getCleanupSessionApi().subscribe((json: any) => {

        if (json.success) {
          this.auth.doLogoutCSC();
          this.auth.doLogout();
          localStorage.removeItem('calix.login_data');
          localStorage.removeItem('calix.userInfo');
          localStorage.removeItem('specificlangliterals');
          this.clearCalixAdminSessionData();
          qlikLogout();
          window.location.href = json.success;
        }

      }, (err: any) => {
        console.log(err);
        this.auth.doLogoutCSC();
        this.auth.doLogout();
        localStorage.removeItem('calix.login_data');
        localStorage.removeItem('calix.userInfo');
        localStorage.removeItem('specificlangliterals');

        this.clearCalixAdminSessionData();
        this.router.navigate(['login']);
      });
    } else {
      this.auth.doLogoutCSC();
      this.auth.doLogout();
      localStorage.removeItem('calix.login_data');
      localStorage.removeItem('calix.userInfo');
      localStorage.removeItem('specificlangliterals');

      this.clearCalixAdminSessionData();
      const state = history?.state?.externalUser ? history?.state : {}
      this.router.navigate(['login'], { state: state });
    }


  }

  clearCalixAdminSessionData() {
    sessionStorage.removeItem('calixAdminOrgDetail');
    sessionStorage.removeItem('calixAdminOrgID');
    sessionStorage.removeItem('calixAdminUserDetail');
    sessionStorage.removeItem('calixAdminAddRole');
    sessionStorage.removeItem('calixAdminAddRoleId');
    sessionStorage.removeItem('SecuredAccessUser');
    sessionStorage.removeItem('Orgacceforssid');

  }

}
