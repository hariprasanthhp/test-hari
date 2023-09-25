import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { CommonService } from '../sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-federated-dashboard',
  templateUrl: './federated-dashboard.component.html',
  styleUrls: ['./federated-dashboard.component.scss']
})
export class FederatedDashboardComponent implements OnInit {
  searchOrg = new FormControl('');
  isSecureAccess = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  loading = false;
  showTable = false;
  hasScopeAccess = true;
  language: any;
  languageSubject: any;
  orgsList: any = [];

  accountsForm = this.fb.group({
    org: ['']
  });


  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  initLoad: any;

  constructor(private translateService: TranslateService,
    private fb: FormBuilder,
    private sso: SsoAuthService,
    private http: HttpClient,
    private router: Router,
    private commonOrgService: CommonService,
    private titleService: Title,) { }

  ngOnInit(): void {
    this.isSecureAccess = this.sso.isSecureAccess();

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Federated']} - ${this.language['Dashboards']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Federated']} - ${this.language['Dashboards']} - ${this.language['Calix Cloud']}`);
    let landingPage = this.sso.getLandingPage();
    if (!(landingPage?.toLowerCase() === 'grantor_orgs')) {
      this.router.navigate(['/login']);
      return;
    }

    this.listenSearch();
    this.subscribeCount('');
  }

  searchSub;
  listenSearch() {
    this.searchSub = fromEvent(document.getElementById('search-org'), 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((e: any) => {
          this.orgsList = [];
          return this.getCount(e.target.value);
        }),
      )
      .subscribe(value => {
        if (value?.['api-error']) {
          return;
        }
        //console.log(value);
        this.filterCount = value;
        //this.getData(this.searchOrg.value);
        this.redraw();
      });
  }

  count: any = 0;
  filterCount: any;
  getCount(searchValue) {
    this.loading = true;
    let url = `${environment.API_BASE_URL}grantor/orgs/_count`;
    if (searchValue) {
      url += `?filter=${searchValue}`;
    }
    return this.http.get(url).pipe(
      catchError(err => {
        err['api-error'] = true;
        this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
        return of(err);
      }),
    );
  }

  subscribeCount(searchValue) {
    this.getCount(searchValue).subscribe((value: any) => {
      if (value?.['api-error']) {
        return;
      }
      this.count = value;
      this.filterCount = value;
      if (this.initLoad) {
        this.redraw();
      } else {
        this.getData(searchValue);
      }

    });
  }

  getData(searchValue?: any) {
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
        let url = `${environment.API_BASE_URL}/grantor/orgs?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}&filter=${dataTablesParameters.search.value}`;
        // if (searchValue) {
        //   url += `&filter=${searchValue}`
        // }
        this.http
          .get(url)
          .subscribe((resp: any) => {
            //console.log(resp);
            this.orgsList = resp ? resp : [];
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
            this.loading = false;
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

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger?.unsubscribe();
    //this.searchSub?.unsubscribe();
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.destroy();
  //     this.dtTrigger.next();
  //   });
  // }

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

  doSub: any;
  gotoFederatedAcccess(orgId: any): any {
    this.loading = true;
    // let data = {
    //   client_secret: environment.X_CALIX_SECURE_CLIENTID,
    //   orgid: orgId,
    //   access_token: this.sso.getAccessToken()
    // }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let data = `client_secret=${environment.X_CALIX_SECURE_CLIENTID}&orgid=${orgId}&access_token=${this.sso.getAccessToken()}`;


    this.doSub = this.http.post(`${environment.API_BASE_URL}grantor/changeorg`, data, { headers }).subscribe((res: any) => {
      //console.log(res);
      this.loading = false;
      if (res['access_token']) {

        if (!res?.entitlements?.length) {

          let msg = this.language['Error: No Valid Entitlement'];
          this.showErrorMessage(msg);
          return;
        }
        let apps: any = this.sso.showApps(res);
        let keys = Object.keys(apps);
        let hasValidApp = false;
        keys?.forEach((type: any) => {
          if (apps[type]) {
            hasValidApp = true;
            return;
          }
        });

        if (!hasValidApp) {
          let msg = this.language['Error: No Valid Entitlement'];
          this.showErrorMessage(msg);
          return;
        }

        this.sso.setCSCLoggedIn(false);

        //this.sso.setGracePeriodsByData(res.entitlements);
        this.sso.setLoginInfo(res);
        this.sso.setFederatedLogin(true);



        if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cco' && apps.cco) {
          this.router.navigate(['/cco']);
        } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'cmc' && apps.cmc) {
          this.router.navigate(['/engagement']);
        } else if (res['landingPage'] && (res['landingPage'].toLowerCase() == 'csc' || res['landingPage'].toLowerCase() == 'main page') && apps.csc) {
          this.router.navigate(['/support']);
        } else if (res['landingPage'] && res['landingPage'].toLowerCase() == 'DC' && apps.foundation) {
          this.router.navigate(['/cco-foundation']);
        } else {
          this.gotoDP();
        }

      }
    }, (err: any) => {
      this.loading = false;
    });
  }

  gotoDP() {
    this.router.navigate([this.sso.getDefaultRoute()]);
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showErrorMessage(msg: string) {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    this.loading = false;
    //this.commonOrgService.pageScrollTop();
  }

  clearSearchInp() {
    this.searchOrg.setValue('');
    this.subscribeCount('');
  }

  redraw() {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchOrg.value).draw();
    });
  }

}
