declare var require: any;
const $: any = require('jquery');
import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import moment from 'moment';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { CcoOperationsReportsService } from '../cco-operations-reports.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-unmapped-ips',
  templateUrl: './unmapped-ips.component.html',
  styleUrls: ['./unmapped-ips.component.scss']
})
export class UnmappedIpsComponent implements OnInit, OnDestroy {

  language;
  translateSubscribe;
  unmappedIPsData: any = [];
  dtOptions: DataTables.Settings = {};
  exportData: any;
  tableCounts: any;
  tableCount: number;
  ORG_ID: string;
  frTable: any;
  esTable: any;
  loading: boolean = true;
  countSubs: any;
  pageAvailable: boolean;
  allUnMappedIPsData: any[] = [];
  tableCountAvailable: boolean;
  exportLoading: boolean;
  hasScopeAccess = false;
  error: boolean;
  errorInfo: string = '';
  showTable: boolean = true;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  isCcoReports: boolean = true;

  constructor(
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private exportExcel: ExportExcelService,
    private apiService: CcoOperationsReportsService,
    private commonOrgService: CommonService,
    private commonFunctionsService: CommonFunctionsService,
    private titleService: Title,
    private router: Router
  ) {
    this.ORG_ID = this.sso.getOrganizationID(this.router.url)

    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.tableLanguageOptions();
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
        this.tableCount = 0;
        this.unmappedIPsData = [];
        this.getTableCount();
      }, 100)
      // this.redraw();
      this.setTitle(this.router.url)
    });
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
  }
  setTitle(url) {
    if (window.location.pathname.indexOf('/cco/operations/') > -1) {
      this.titleService.setTitle(`${this.language['Unmapped IPs']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.isCcoReports = false;
      this.titleService.setTitle(`${this.language['Unmapped IPs']} - ${this.language['Reports']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {

    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/operations/') > -1) {

      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.unmappedips') !== -1) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }
    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }
    this.getPercentage();
    this.getTableCount();
    this.tableLanguageOptions();
  }

  ngOnDestroy(): void {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.listObs) {
      this.listObs.unsubscribe();
    }
    if (this.expSubscription) {
      this.expSubscription.unsubscribe();
    }
  }

  getTableCount() {
    this.countSubs = this.apiService.getUnMappedIPsCount(this.ORG_ID).subscribe((data: any) => {
      this.tableCount = data;
      this.tableCountAvailable = true;
      this.tableRender();
    }, (err: HttpErrorResponse) => {
      this.tableCountAvailable = true;
      this.tableRender();
      this.pageErrorHandle(err);
    })
  }

  sortBy: string;
  sortType: string;
  tableRender() {
    this.showTable = true;
    const that = this;
    let pageNumber: number;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      searching: false,
      processing: false,
      order: [0, 'asc'],
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        that.loading = true;
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;
        if (dataTablesParameters.start == 0) {
          pageNumber = 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        url = `${environment.faAdminCorrelatorURL}flowendpoint/unmapped?org-id=${this.ORG_ID}&pagenumber=${pageNumber}&pagesize=${dataTablesParameters.length}`

        that.http
          .get<DataTablesResponse>(
            url
          ).subscribe((resp: any) => {
            resp.forEach(element => {
              element.isSource = element.isSource === true ? 'Yes' : 'No';
            });
            const isArray = Array.isArray(resp);
            // that.unmappedIPsData = resp;
            that.unmappedIPsData = [];
            if (isArray) {
              that.unmappedIPsData = this.sortData(resp, that.sortBy, that.sortType);
            } else {
              that.unmappedIPsData = [resp];
            }
            that.commonOrgService.closeAlert();
            that.loading = false;
            setTimeout(() => {
              callback({
                recordsTotal: that.tableCount ? that.tableCount : 0,
                recordsFiltered: that.tableCount ? that.tableCount : 0,
                data: []
              });
            }, 100)

          },
            (err: HttpErrorResponse) => {
              if (err.status == 404) {
                that.unmappedIPsData = [];
                that.loading = false;
                callback({
                  recordsTotal: that.tableCount ? that.tableCount : 0,
                  recordsFiltered: that.tableCount ? that.tableCount : 0,
                  data: []
                });
              } else {
                this.pageErrorHandle(err);
              }
            });
      },
      drawCallback: (Settings) => {
        this.tableLanguageOptions();
      },
      columns: [{ data: 'ipAddress' }, { data: 'createTime' }, { data: 'updateTime' }, { data: 'isSource' }]
    };
    this.tableLanguageOptions();

  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  expSubscription: any;
  getAllUnMappedIPsData() {
    this.tableCount = this.tableCount > 0 ? this.tableCount : 1;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint/unmapped?org-id=${this.ORG_ID}&pagesize=${this.tableCount}`
    this.expSubscription = this.http.get(url).subscribe((data: any) => {
      this.allUnMappedIPsData = data;
      this.exportAllData();
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.exportAllData();
      });

    // const calls: Observable<any>[] = [];
    // let pageLength = 1;
    // if (this.tableCount > 1000) {
    //   pageLength = Math.ceil(this.tableCount / 1000);
    // }

    // for (let i = 0; i < pageLength; i++) {
    //   calls.push(this.apiService.getAllUnMappedIPs(this.ORG_ID, i));
    // }

    // forkJoin(calls).pipe(delay(500)).subscribe(
    //   results => {
    //     results.forEach((el) => {
    //       this.allUnMappedIPsData = [...this.allUnMappedIPsData, ...el];
    //     });
    //     this.exportAllData();
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.pageErrorHandle(err);
    //     this.exportAllData();
    //   }
    // );
  }


  export() {
    if (this.exportLoading) {
      return;
    }
    this.exportLoading = true;
    this.getAllUnMappedIPsData();

  }

  exportAllData() {
    // let name = this.commonFunctionsService.generateExportName('Unmapped_IPs');
    let name = 'Unmapped_IPs';
    let exportData = this.allUnMappedIPsData ? this.exportDataConvertor(this.allUnMappedIPsData) : [];
    let extraData = `Unmapped IPs\n\r`;
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData, extraData);
    } else {
      this.exportExcel.downLoadCSV(name, [], extraData);
    }
    setTimeout(() => {
      this.exportLoading = false;
    }, 3000)
  }

  exportDataConvertor(array) {
    let exportData = [];
    array.forEach(el => {
      exportData.push({
        'IP Address': el.ipAddress ? el.ipAddress : '',
        'Created On': el.createTime ? this.convertToDateTime(el.createTime) : '',
        'Updated On': el.updateTime ? this.convertToDateTime(el.updateTime) : '',
        'Solicited': el.isSource === true ? 'Yes' : 'No'
      });
    });
    return exportData;
  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'ipAddress');
    } else if (by == 1) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'createTime');
    } else if (by == 2) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'updateTime');
    } else {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'isSource');
    }
    return sorted;
  }


  // convertToDateTime(dt: any) {
  //   if(!dt){
  //     return '';
  //   }
  //   let date = dt.split(".");
  //   let pipe = new DatePipe('en-US');
  //   return pipe.transform(new Date(date[0]), 'short')
  // }

  convertToDateTime(dt: any) {
    if (!dt) {
      return '';
    }
    return moment(new Date(dt)).format("MM/DD/YY, HH:mm A");
    // let timeZone = new Date(dt).toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');
    // return moment(new Date(dt)).format("YYYY-MM-DD HH:mm A") + ' (' + timeZone + ')';
  }


  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.showError(this.errorInfo);
    this.loading = false;
  }


  closeAlert() {
    this.error = false;
  }


  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  discoveredCount = 0;
  solicitedCount = 0;
  unsolicitedCount = 0;
  solicitedPercentage: any = 0;
  unsolicitedPercentage: any = 0;
  listObs: any;
  getPercentage() {
    let types = ['discovered', 'solicited', 'unsolicited'];
    const requests: any = {};
    let obj = {
      discovered: `${environment.faAdminCorrelatorURL}flowendpoint/count?discovered=true&org-id=${this.ORG_ID}`,
      solicited: `${environment.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${this.ORG_ID}&source=true`,
      unsolicited: `${environment.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${this.ORG_ID}&source=false`
    }

    types.forEach(type => {
      const req = this.http.get(`${obj[type]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }),
      );
      requests[type] = req;
    });

    this.listObs = forkJoin(requests).subscribe((response: any) => {
      this.discoveredCount = response['discovered'].toLocaleString();
      this.solicitedCount = response['solicited'].toLocaleString();
      this.unsolicitedCount = response['unsolicited'].toLocaleString();
      let total = parseFloat(response['discovered']) + parseFloat(response['solicited']) + parseFloat(response['unsolicited']);
      this.solicitedPercentage = (this.solicitedCount / total) ? ((this.solicitedCount / total) * 100) : 0;
      this.unsolicitedPercentage = (this.unsolicitedCount / total) ? ((this.unsolicitedCount / total) * 100) : 0;
      if (!Number.isInteger(this.solicitedPercentage) || this.solicitedPercentage == 'Infinity') {
        this.solicitedPercentage = this.solicitedPercentage.toFixed(2);
      }
      if (!Number.isInteger(this.unsolicitedPercentage) || this.unsolicitedPercentage == 'Infinity') {
        this.unsolicitedPercentage = this.unsolicitedPercentage.toFixed(2);
      }
    }, err => {
      this.pageErrorHandle(err);
    });

  }

}
