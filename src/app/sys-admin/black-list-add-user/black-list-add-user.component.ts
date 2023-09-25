import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';

import { Router } from '@angular/router';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { BlackListUsersService } from '../services/black-list-users.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from '../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-black-list-add-user',
  templateUrl: './black-list-add-user.component.html',
  styleUrls: ['./black-list-add-user.component.scss']
})
export class BlackListAddUserComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;

  usermail: any = [];
  usermailSelected: any;
  reason: any = [];
  reasonSelected: any;


  modalRef: any;
  loading: boolean;

  errorTitle: string = '';
  errorBody: string = '';

  dataAvailable: boolean = false;

  error: boolean;
  success: boolean;

  errorInfo: string = '';
  successInfo: string = '';

  ORG_ID: string;
  MODULE: string = 'calixAdmin';
  usersCount: number | string = 0;
  translateSubscribe: any;
  usersCountSubs: any;
  usersListSubs: any;
  userUpdateSubs: any;
  loader: boolean = true;

  noResultsFound: string = 'No results found';

  constructor(
    private router: Router,
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,
    private apiService: BlackListUsersService,
    private usersApiService: OrganizationApiService,
    private sso: SsoAuthService,
    private titleService: Title,
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['deactivatedusers']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.noResultsFound = this.language['No results found'];
    });

    this.commonOrgService.currentPageAdder('blacklistAddUser');

    this.getUserList();
    this.titleService.setTitle(`${this.language['deactivatedusers']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }



  ngOnInit() {

    this.reason = [
      {
        name: this.language['User is not allowed to access'],
        value: '1'
      },
      {
        name: this.language['User has left the organization'],
        value: '2'
      },
      {
        name: this.language['User in the wrong org'],
        value: '3'
      },
    ];

    this.reasonSelected = '1';

    this.closeAlert();
    this.noResultsFound = this.language['No results found'];
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.usersCountSubs) {
      this.usersCountSubs.unsubscribe();
    }

    if (this.usersListSubs) {
      this.usersListSubs.unsubscribe();
    }

    if (this.userUpdateSubs) {
      this.userUpdateSubs.unsubscribe();
    }
  }

  getUserList() {

    this.usersCountSubs = this.usersApiService.UsersCountByOrgId(this.ORG_ID).subscribe((res: any) => {
      this.usersCount = res;
      if (res) {
        this.usersListSubs = this.usersApiService.UsersListByOrgId(this.ORG_ID, res).subscribe((res: any) => {
          this.usermail = res;
          this.dataAvailable = true;
          this.loader = false;
          if (res && res.length) {
            this.usermailSelected = res[0];
          }

        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.usermail = [];
          this.dataAvailable = true;
          this.loader = false;

        })
      } else {
        this.usermail = [];
        this.dataAvailable = true;
        this.loader = false;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.usermail = [];
      this.dataAvailable = true;
      this.loader = false;

    })

  }

  save() {
    if (!this.usermailSelected || this.usermailSelected == undefined) {
      this.errorInfo = this.language['Invalid username of deleted portal user'];
      this.error = true;
      this.commonOrgService.pageScrollTop();
      return;
    }

    if (!this.reasonSelected || this.reasonSelected == undefined) {
      this.errorInfo = this.language['Invalid Request'];
      this.commonOrgService.pageScrollTop();
      this.error = true;
      return;
    }
    let params = {
      username: this.usermailSelected.username,
      firstName: this.usermailSelected.firstName ? this.usermailSelected.firstName : '',
      lastName: this.usermailSelected.lastName ? this.usermailSelected.lastName : '',
      reason: parseInt(this.reasonSelected)

    };

    this.loader = true;
    this.userUpdateSubs = this.apiService.updateBlacklistUsersByOrgId(params, this.ORG_ID).subscribe(
      (res) => {
        this.closeAlert();
        this.successInfo = this.language['User has been added successfully'];
        this.success = true;
        this.commonOrgService.pageScrollTop();
        this.loader = false;

        setTimeout(() => {
          this.closeAlert();
          this.goToUserList();
        }, 1000);
      }, (err: HttpErrorResponse) => {

        this.pageErrorHandle(err);
        this.loader = false;
      });

  }

  cancel() {
    this.goToUserList();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }


  goToUserList(): void {
    this.router.navigate([`${this.MODULE}/blacklist`]);
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.commonOrgService.pageScrollTop();
  }

}
