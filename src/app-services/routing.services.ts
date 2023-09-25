import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  showSuccess: any = false;
  updateSuccessMessage: any = false;
  currentUrl: string = '';
  previousUrl: string = '';
  constructor(
    private router: Router,
    private location: Location,
  ) { }

  backPage() {
    this.location.back();
  }
  helpDeskPage() {
    let link = 'https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/oc/shad-help/index.htm#97777.htm'
    this.router.navigate([]).then(result => { window.open(link, '_blank') });
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate([''])
  }
  loginPage() {
    this.router.navigate(['']);
  }
  forgotPasswordPage() {
    this.router.navigate(['forget_password']);
  }
  resetPasswordPage() {
    this.router.navigate(['reset_password']);
  }
  ccoShadDashboardPage() {
    this.router.navigate(['shad', 'dashboard']);
  }
  routerManagementPageEdit(data) {
    this.router.navigate(['shad', 'router_management', data]);
  }
  routerManagementPage() {
    this.router.navigate(['shad', 'router_management']);
  }
  blockPageList() {
    this.router.navigate(['shad', 'block_page_template_list']);
  }

  whiteLabelCreate = false;
  WhiteLabelList(create?: any) {
    this.setCreateFlag(create);
    this.showSuccess = true;
    this.updateSuccessMessage = true;
    //this.router.navigate(['shad', 'whitelabel']);
  }
  newBlockPageCreate() {
    this.router.navigate(['shad', 'block_page_template']);
  }
  blockPageView() {
    this.router.navigate([]).then(result => { window.open("/block_page_template_view", '_blank') });
    // this.router.navigate([]).then(result => { window.open("block_page_template_view", '_blank') });
  }
  blockPageUpdate(data) {
    this.router.navigate(['shad', 'block_page_template', data])
  }
  profileDetails() {
    this.router.navigate(['support', 'application', 'experienceIQ', 'profile']);
  }

  setShowSuccess(flag: any) {
    if (flag) {
      this.showSuccess = true;
    } else {
      this.showSuccess = false;
    }
  }


  setCreateFlag(flag?: any) {
    if (flag) {
      this.whiteLabelCreate = true;
    } else {
      this.whiteLabelCreate = false;
    }
  }


  getCreateFlag() {
    return this.whiteLabelCreate;
  }

}


