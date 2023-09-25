import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSysAdmin: boolean
  MODULE: string;
  constructor(
    private sso: SsoAuthService,
    private router: Router ) { }
  ngOnInit(): void {
    this.checkSysAdmin();
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
  }

  checkSysAdmin() {
    let roles = this.sso.getRoles();
    if (roles?.includes('SysAdmin')) {
      this.isSysAdmin = true;
    } else {
      this.isSysAdmin = false;
    }
  }
  navigateCurrentRoute() {
    let currentUrl = this.router.url;
    let isOrgAdmins = currentUrl.includes('/org-admins/all');
    if (!this.isSysAdmin) {

      if (isOrgAdmins) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });

      } else {
        this.router.navigate([`${this.MODULE}/users`])
      }
    } else {
      if (isOrgAdmins) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });

      } else {
        this.router.navigate(['systemAdministration/organizations'])
      }
    }

  }
}
