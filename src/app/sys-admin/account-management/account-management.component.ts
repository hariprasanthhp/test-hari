import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { RouteRef } from 'aws-sdk/clients/appmesh';
import { forkJoin, fromEvent, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  showMFALink = false;
  searchUser = new FormControl('');
  language: any;
  languageSubject: any;
  orgsList: any = []; //[{ "orgId": '', "orgName": "Select" }]
  userListForOrg: any = [];
  defaultRoleForOrg: any = {};
  roles: any = [{ _id: '', name: 'Unassigned' }];
  MODULE: string = 'systemAdministration';
  accountsForm = this.fb.group({
    org: [null, [Validators.required]],
    roleId: ['', [Validators.required]]
  });

  formSub: any;
  orgsListSub: any;
  disableBtn = true;
  ORG_ID: any;
  count: any = 0;
  filterCount: any;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  loading = false;
  showTable = false;
  defaultRoleId: any = '';
  initLoad: boolean;
  filterAndSearchFlag = false;
  constructor(private translateService: TranslateService,
    private fb: FormBuilder,
    private http: HttpClient,
    private sso: SsoAuthService,
    private router: Router,
    private commonOrgService: CommonService,
    private titleService: Title) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.listenSearch();

    this.commonOrgService.currentPageAdder('account-management');

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);

    if (!(this.MODULE === 'systemAdministration' || this.sso.isSecureAccess())) {
      this.showMFALink = true;
    }

    this.titleService.setTitle(`Account Management - ${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);

    this.accountsForm.valueChanges
      .subscribe((changedObj: any) => {
        this.watchDisableBtn();
      });

    this.formSub = this.accountsForm.get('org').valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((org: any) => {
        this.accountsForm.get('roleId').setValue('');
        return this.getUsersAndDefaultRoles(org);
      }))
      .subscribe((json: any) => {
        this.userListForOrg = [];
        this.defaultRoleId = '';
        this.searchUser.setValue('');
        if (!json?.users?.['api-error']) {
          this.count = json.users ? json.users : 0;
          this.filterCount = json.users ? json.users : 0;
          if (this.initLoad) {
            this.redraw();
          } else {
            this.showTable = true;
            this.getData();
          }

        }

        if (!json?.defaultrole?.['api-error']) {
          if (json['defaultrole'] && Object.keys(json['defaultrole'])?.length) {
            this.accountsForm.get('roleId').setValue(json['defaultrole']?._id);
            this.defaultRoleId = json['defaultrole']?._id;
          }
        }

        this.watchDisableBtn();

      });

    this.getOrgsAndRoles();
  }

  getUsersAndDefaultRoles(orgId) {
    if (!orgId) {
      this.initLoad = false;
      this.showTable = false;
      this.accountsForm.get('roleId').setValue('');
      return new Observable(subsciber => subsciber.next({
        users: [],
        defaultrole: {},
      }));
    }
    const requests = {};
    let types = ['users', 'defaultrole'];
    types.forEach(type => {
      let url = `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${orgId}/${type}`;
      if (type === 'users') {
        url += `/_count`
      }
      requests[type] = this.http.get(url).pipe(
        catchError(err => {
          err['api-error'] = true;
          this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
          return of(err);
        })
      );
    });

    return forkJoin(requests);
  }



  getOrgsAndRoles() {
    const requests = {};
    requests['orgs'] = this.http.get(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee`).pipe(
      catchError(err => {
        return of(err);
      })
    );

    requests['roles'] = this.http.get(`${environment.API_BASE_URL}admin/org/${this.ORG_ID}/roles`).pipe(
      catchError(err => {
        return of(err);
      })
    );

    this.orgsListSub = forkJoin(requests).subscribe((json: any) => {
      this.orgsList = [...this.orgsList, ...json.orgs];
      this.roles = [...this.roles, ...json.roles];
    });

  }

  onSubmit() {
    this.disableBtn = true;
    let fields = this.accountsForm.value;
    let request = this.http.post(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${fields['org']}/defaultrole/${fields['roleId']}`, {});
    if (this.defaultRoleId && !this.accountsForm.get('roleId').value) {
      request = this.http.delete(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${fields['org']}/defaultrole/${this.defaultRoleId}`, {});
    }
    request.subscribe((json: any) => {
      this.successMessage()
    }, (err: any) => {
      this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
    }, () => {
      this.disableBtn = false;
    });
  }

  clearForm() {
    this.accountsForm.patchValue({
      org: null,
      roleId: ''
    });
  }

  successMessage() {
    this.closeAlert();
    this.successInfo = 'Default role saved successfully';
    this.success = true;
    this.commonOrgService.pageScrollTop();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showErrorMessage(msg: string) {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    //this.commonOrgService.pageScrollTop();
  }

  gotoUserDetail(info: any): void {
    localStorage.setItem('calix.federated_grantee_orgId', this.accountsForm.get('org').value);
    sessionStorage.setItem('calixAdminUserDetail', JSON.stringify(info));
    this.router.navigate([`${this.MODULE}/federated-user-details`]);
  }

  getData(searchValue?: any) {
    if (!this.accountsForm.get('org').value) {
      this.showTable = false;
      return;
    }
    this.showTable = true;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: false,
      lengthChange: false,
      ordering: false,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        let url = `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${this.accountsForm.get('org').value}/users?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}&filter=${dataTablesParameters.search.value}`;
        this.http
          .get(url)
          .subscribe((resp: any) => {
            this.userListForOrg = resp ? resp : [];
            this.loading = false;
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.filterCount != undefined ? this.filterCount : this.count,
              data: []
            });
          }, (err: any) => {
            this.loading = false;
            this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.filterCount != undefined ? this.filterCount : this.count,
              data: []
            });
          }, () => {
            this.initLoad = true;
          });
      }, drawCallback: (settings) => {
        //this.changeTableStatusLanguage(settings);
        // let total = settings._iRecordsDisplay; // for server side rendering
        // let length = settings._iDisplayLength;
        // if (total <= length) {
        // }
      },
    };
    this.tableLanguageOptions();

  }

  ngOnDestroy() {
    this.formSub?.unsubscribe();
    this.orgsListSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  clearSearchInp() {
    this.searchUser.setValue('');
    this.subscribeCount('');
  }

  getCount(searchValue) {
    let url = `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${this.accountsForm.get('org').value}/users/_count`;
    if (searchValue) {
      url += `?filter=${searchValue}`;
    }
    this.filterAndSearchFlag = true;
    return this.http.get(url).pipe(
      catchError(err => {
        err['api-error'] = true;
        this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
        return of(err);
      })
    )
  }

  subscribeCount(searchValue) {
    this.getCount(searchValue).subscribe((count: any) => {
      if (count?.['api-error']) {
        return;
      }
      this.count = count;
      this.filterCount = count;
      this.redraw();
      //this.getData(searchValue);
    });
  }

  searchSub;
  listenSearch() {
    this.searchSub = fromEvent(document.getElementById('search-user'), 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((e: any) => {
          this.userListForOrg = [];
          return this.getCount(e.target.value);
        }),
      )
      .subscribe(value => {
        if (value?.['api-error']) {
          return;
        }
        this.filterCount = value;
        this.redraw();

      });
  }

  watchDisableBtn() {
    if (this.defaultRoleId && !this.accountsForm.get('roleId').value) {
      this.disableBtn = false;
    } else {
      this.disableBtn = !this.accountsForm.valid;
    }
  }

  redraw() {
    if (!this.accountsForm.get('org').value) {
      return;
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchUser.value).draw();
    });
  }

  openMFALink() {
    window.open(environment.EMBEDDING_LINK, "_blank")
  }

  tableRerender(){
    this.accountsForm.valueChanges.subscribe((value) => {
      if(value.org){
        this.filterAndSearchFlag = false;
        this.dtTrigger.next();
      }
    });
}

}

