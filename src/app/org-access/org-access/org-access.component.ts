import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { OrgSecureAccessService } from '../../sys-admin/services/org-secure-access.service';
import { CommonService } from '../../sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';
declare var require: any;
const $: any = require('jquery');

@Component({
  selector: 'app-org-access',
  templateUrl: './org-access.component.html',
  styleUrls: ['./org-access.component.scss']
})
export class OrgAccessComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    rowId: 'id',
    lengthChange: false,
    columnDefs: [
      { targets: [1, 2, 3, 4], orderable: false },
      { targets: [0], orderable: true }
    ],
    dom: 'tipr',
    order: [0, 'asc'],
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  orgsTableData: any = [];
  dataAvailable: boolean;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  loading: boolean = true;
  apps = {
    cmc: false,
    csc: false,
    cco: false,
    //shad: false,
    foundation: false,
    orgAdmin: false,
    calixAdmin: false
  };

  dataSubscribe: any;
  orgsDataSubscribe: any;
  frTable: any;
  translateSubscribe: any;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  searchClearable: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    private service: OrgSecureAccessService,
    private commonOrgService: CommonService,
    private titleService: Title,
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Secured Access Organizations']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.dataAvailable = false;
      this.loading = true;
      this.isRerender = true;
      this.setTableOptions('language');
    });
    this.frTable = this.customTranslateService.fr;

    let url = this.router.url;
    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Secured Access Organizations']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  isCSCLoggedOut: boolean = false;
  ngOnInit() {
    this.isCSCLoggedOut = this.sso.isCscLoggedOut();
    if (this.isCSCLoggedOut) {
      this.loading = true;
      this.sso.setCscLoggedOut(false);
    }

    this.tableLanguageOptions();
    this.getOrgsData();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

    if (this.doSub) {
      this.doSub.unsubscribe();
    }

    if (this.dataSubscribe) {
      this.dataSubscribe.unsubscribe();
    }

    if (this.orgsDataSubscribe) {
      this.orgsDataSubscribe.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

  }

  // @HostListener("window:message", ["$event"])
  // onMessage(e: MessageEvent) {

  //   if (e.origin != environment.CSC_BASE_URL) {
  //     return false;
  //   }

  //   if (e.data && (e.data.type === 'window.login' || e.data.type === 'window.logout')) {
  //     let iframe = document.getElementById('csc') as HTMLIFrameElement;
  //     iframe.contentWindow.postMessage({ type: 'window.logout' }, '*');
  //     this.loading = false;
  //   }

  // }

  getOrgsData() {
    let url = `${environment.CALIX_ADMIN_BASE_URL}org-access/username/${this.sso.getUsername()}`;
    this.dataSubscribe = this.http.get(url).subscribe((res: any) => {

      if (res) {
        if (res.length == 1 && res[0].orgId == '*') {
          this.getAllOrgsData(res[0]);
        } else {
          this.orgsTableData = res;
          this.setTableOptions();
          this.renderTable();
          this.loading = false;
        }

      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.setTableOptions();
      this.renderTable();
      this.loading = false;
    });
  }

  getAllOrgsData(allOrgData) {
    //    let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations`;
    //CCL-25458 : use _expand instead of hitting the org admin page
    let url = `${environment.CALIX_ADMIN_BASE_URL}org-access/username/${this.sso.getUsername()}/_expand`;
    this.orgsDataSubscribe = this.http.get(url).subscribe((res: any) => {

      if (res) {
        //    this.orgsTableData = this.processAllOrgs(res, allOrgData);
        this.orgsTableData = res;
        this.setTableOptions();
        this.renderTable();
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.setTableOptions();
      this.renderTable();

      this.loading = false;

    });
  }

  renderTable() {
    //this.setTableOptions();
    if (this.isRerender) {
      this.rerender();
      this.isRerender = false;
    } else {
      this.dtTrigger.next();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: 'id',
      lengthChange: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [1, 2, 3, 4], orderable: false },
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };

    this.tableLanguageOptions();

    if (type && type == 'language') {
      setTimeout(() => {
        this.dataAvailable = true;

        this.renderTable();
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }, 100);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        //this.hideSearch();
      }, 500);
    }


  }

  doSub: any;
  gotoSecureAcccess(orgId: any): any {
    this.loading = true;
    let data = {
      client_secret: environment.X_CALIX_SECURE_CLIENTID,
      orgId: orgId
    }
    this.doSub = this.sso.getAuthToken(data, 'secure_access').subscribe((res: any) => {
      this.loading = false;
      if (res['access_token']) {

        if (!res.entitlements.length && res.landingPage !== 'grantor_orgs') {

          let msg = this.language['Error: No Valid Entitlement'];
          this.showErrorMessage(msg);
          return;
        }

        let validAccessTime = this.checkAccessTime(res);
        if (!validAccessTime) {

          let msg = this.language['Access Denied'];
          this.showErrorMessage(msg);
          return;
        }

        this.sso.setSecureAccessStartTime(res['beginTime']);
        this.sso.setSecureAccessEndTime(res['endTime']);
        this.sso.setCSCLoggedIn(false);

        //this.sso.setGracePeriodsByData(res.entitlements);
        this.sso.setLoginInfo(res);
        this.sso.setSecureAccess(true);
        this.sso.setSecureAccessLoginData(res);

        this.showApps();

        if (res['landingPage'] && res['landingPage'].toLowerCase() == 'grantor_orgs') {
          this.router.navigate(['federated-dashboard']);
        } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cco' && this.apps.cco) {
          this.router.navigate(['/cco']);
        } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cmc' && this.apps.cmc) {
          this.router.navigate(['/marketing']);
        } else if (res['landingPage'] && (res['landingPage'].toLowerCase() == 'csc' || res['landingPage'].toLowerCase() == 'main page') && this.apps.csc) {
          this.router.navigate(['/support']);
        } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'DC' && this.apps.foundation) {
          this.router.navigate(['/cco-foundation']);
        } else {
          this.gotoDP();
        }

      }
    }, (err: any) => {
      this.loading = true;
    });
  }

  showApps(): void {
    this.apps = this.sso.showApps();
  }

  gotoDP(): void {
    let entArr = this.sso.getEntitlementsArr();

    let ent = this.sso.getValidEntitlements();

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
      this.router.navigate(['/no-entitlements']);

    }

  }

  checkType(str: string) {
    return this.service.checkType(str);
  }

  checkExpiry(obj: any) {
    return this.service.checkExpiryOrgAccess(obj);
  }

  processAllOrgs(orgs: any, allOrgData: any) {
    orgs.forEach(org => {

      org['beginTime'] = allOrgData.beginTime;
      org['endTime'] = allOrgData.endTime;
      org['orgId'] = org.id;
      org['orgName'] = org.name;
      org['type'] = allOrgData.type;
      //_id: "2Vx1UyCFmF7NZ6bPww"
    });
    return orgs;
  }

  hideSearch() {
    setTimeout(() => {
      $('#organizations-list .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#organizations-list .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 100);
  }

  search(term: string) {
    this.searchClearable = term.length ? true : false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  onSearchClearing(searchBar) {
    this.searchClearable = false;
    searchBar.value = '';
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchBar.value).draw();
    });
  }

  checkAccessTime(json) {
    if (!json['beginTime'] && !json['endTime']) {
      return false;
    }

    let startTime = this.service.roundOffTimestamp(json['beginTime']); // Start time in UTC timestamp to Local timestamp
    let now = new Date().getTime(); // Current time in Local timestamp
    if (json['endTime'] == -1) {
      if (now >= startTime) {
        return true;
      }

    } else {
      let endTime = this.service.roundOffTimestamp(json['endTime']); // End time in UTC timestamp to Local timestamp
      if (now >= startTime && now < endTime) {
        return true;
      }
    }
    return false;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.customTranslateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.customTranslateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showErrorMessage(msg: string) {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    this.commonOrgService.pageScrollTop();
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
