declare var require: any;
const $: any = require('jquery');
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { saveAs } from 'file-saver';
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
  selector: 'app-mapped-endpoint-list',
  templateUrl: './mapped-endpoint-list.component.html',
  styleUrls: ['./mapped-endpoint-list.component.scss']
})
export class MappedEndpointListComponent implements OnInit, OnDestroy {

  language;
  translateSubscribe;

  mappedEndpointData: any = [];
  dataAvailable: any;
  dtOptions: DataTables.Settings = {
    order: [0, 'asc']
  };
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  exportData: any;
  tableCount: number;
  sortBy: string;
  sortType: string;
  filterCount: string | number;
  ORG_ID: string;
  frTable: any;
  esTable: any;
  tableCounts;
  loading: boolean = true;
  countSubs: any;
  filterCountSubs: any;
  pageAvailable: boolean;
  allMappedEndpointData: any[] = [];
  tableCountAvailable: boolean;
  exportLoading: boolean;
  hasScopeAccess = false;
  showTable: boolean = true;
  isDev: boolean = false;
  error: boolean = false;
  errorInfo: string = "";
  isCcoReports: boolean = true;

  constructor(
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router,
    private http: HttpClient,
    private exportExcel: ExportExcelService,
    private apiService: CcoOperationsReportsService,
    private commonOrgService: CommonService,
    private commonFunctionsService: CommonFunctionsService,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url)

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
        this.tableCount = 0
        this.filterCount = 0;
        this.mappedEndpointData = [];
        this.getTableCount();
      }, 100)
      //this.setFilterOptions();
      this.setTitle(this.router.url)
    });


    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else { this.isDev = false; }
  }
  setTitle(url) {
    if (window.location.pathname.indexOf('/cco/operations/') > -1) {
      this.titleService.setTitle(`${this.language['Mapped Endpoint List']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.isCcoReports = false;
      this.titleService.setTitle(`${this.language['Mapped Endpoint List']} - ${this.language['Reports']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/operations/') > -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.mappedeplists') !== -1) {
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
      this.loading = false;
      return;
    }

    this.getTableCount();
    this.tableLanguageOptions();

  }

  ngOnDestroy(): void {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.countSubs) {
      this.countSubs.unsubscribe();
    }

    if (this.filterCountSubs) {
      this.filterCountSubs.unsubscribe();
    }
  }

  getTableCount() {
    this.countSubs = this.apiService.getMappedEndpointCount(this.ORG_ID).subscribe((data: any) => {
      this.tableCount = data;
      this.tableCountAvailable = true;
      this.tableRender();
      // setTimeout(() => {
      //   this.getAllMappedEndpointData()
      // }, 2000);
    }, (err: HttpErrorResponse) => {
      this.tableCountAvailable = true;
      this.tableRender();
      this.pageErrorHandle(err);
    })
  }

  getFilterCount(url: string) {
    // this.filterCount = 0;
    this.filterCountSubs = this.http.get(url).subscribe((res: number) => {
      this.filterCount = res;
    },
      (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.filterCount = 0;
        } else {
          this.pageErrorHandle(err);
        }
      })
  }

  tableRender() {
    const that = this;
    let orgId = this.ORG_ID;
    let pageNumber: number;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: true,
      processing: false,
      order: [0, 'asc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;
        let filterUrl: string;
        this.filterCount = undefined;
        let orderBy = parseInt(this.sortBy) == 0 ? 'name' : parseInt(this.sortBy) == 1 ? 'ip' : parseInt(this.sortBy) == 2 ? 'mappedby' : parseInt(this.sortBy) == 3 ? 'discovered' : 'aggGroup';
        if (dataTablesParameters.start == 0) {
          pageNumber = 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        if (dataTablesParameters.search.value.length < 2 && dataTablesParameters.search.value.length > 0) {
          return;
        }

        let searchString = `&searchstring=`;
        if (dataTablesParameters.search.value && dataTablesParameters.search.value.trim()) {
          if (dataTablesParameters.search.value.length <= 2) {
            return;
          }
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
          searchString = `&searchstring=${dataTablesParameters.search.value.trim()}`
          filterUrl = `${environment.faAdminCorrelatorURL}flowendpoint?count=true&org-id=${orgId}${searchString}`;
          this.getFilterCount(filterUrl);
        }
        url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${pageNumber}&pagesize=${dataTablesParameters.length}&orderby=${orderBy}${searchString}&sortdirection=${this.sortType}`
        that.loading = true;

        that.http
          .get<DataTablesResponse>(
            url
          ).subscribe((resp: any) => {
            const isArray = Array.isArray(resp);
            if (isArray) {
              that.mappedEndpointData = resp;
            } else {
              that.mappedEndpointData = [resp];
            }
            this.setAggGroupValue();
            that.closeAlert();
            that.loading = false;
            setTimeout(() => {
              callback({
                recordsTotal: that.tableCount ? that.tableCount : 0,
                recordsFiltered: (that.filterCount != undefined) ? that.filterCount : (that.tableCount ? that.tableCount : 0),
                data: []
              });
            }, 100)

          },
            (err: HttpErrorResponse) => {
              if (err.status == 404) {
                that.mappedEndpointData = [];
                this.dataAvailable = true;
                that.loading = false;
                callback({
                  recordsTotal: that.tableCount ? that.tableCount : 0,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : (that.tableCount ? that.tableCount : 0),
                  data: []
                });
              } else {
                this.pageErrorHandle(err);
                this.dataAvailable = true;
              }
            });
      },
      drawCallback: (Settings) => {
        this.tableLanguageOptions();
      },
      columnDefs: [
        { targets: 4, orderable: false }
      ],
      columns: [{ data: 'ipAddress' }, { data: 'ipAddress' }, { data: 'cmMappedBy' }, { data: 'discovered' }, { data: 'aggGroup' }]
    };
    this.tableLanguageOptions();
  }
  setAggGroupValue() {
    this.mappedEndpointData.forEach((el) => {
      el['isAggGroup'] = el && el.aggGroup ? (this.commonFunctionsService?.validateUUID(el?.aggGroup) ? this.language.Yes : this.language.No) : this.language.No;
    })
  }

  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'name');
    } else if (by == 1) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'ipAddress');
    } else if (by == 2) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'mappedBy');
    } else if (by == 3) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'discovered');
    }
    // sorted = this.combineLocations(sorted);
    return sorted;
  }

  combineLocations(data) {
    data = data ? data : [];
    let locs = [], locString: string = '';
    data.forEach(e => {
      if (e.locations && e.locations.length) {
        // e.locations.forEach(lc => {
        //   if (lc.serviceAddress) {
        //     locs.push(lc.serviceAddress);
        //   }
        // });
        e['locString'] = this.mergeLocations(e);
      }
      locs = [];
    });
    return data;
  }

  mergeLocations(e) {
    let locs = []
    e.locations.forEach(lc => {
      if (lc.location) {
        locs.push(lc.location);
      }
    });

    return locs.join(', ');
  }


  getAllMappedEndpointData() {
    // const calls: Observable<any>[] = [];
    this.tableCount = this.tableCount > 0 ? this.tableCount : 1;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&pagesize=${this.tableCount}&orderby=name`
    this.http.get(url).subscribe((data: any) => {
      this.allMappedEndpointData = data;
      this.exportAllData();
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.exportLoading = false;
        //this.exportAllData();
      });
    // let pageLength = 1;
    // if (this.tableCount > 1000) {
    //   pageLength = Math.ceil(this.tableCount / 1000);
    // }

    // for (let i = 0; i < pageLength; i++) {
    //   calls.push(this.apiService.getAllMappedEndpoints(this.ORG_ID, i));
    // }

    // forkJoin(calls).pipe(delay(500)).subscribe(
    //   results => {
    //     results.forEach((el) => {
    //       this.allMappedEndpointData = [...this.allMappedEndpointData, ...el];
    //     });
    //     this.exportAllData();
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.pageErrorHandle(err);
    //     this.exportAllData();
    //   }
    // );
  }

  getAllMappedEndpointDataForExportCSV() {
    this.tableCount = this.tableCount > 0 ? this.tableCount : 1;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint/export?orderby=name&org-id=${this.ORG_ID}&pagesize=${this.tableCount}`
    this.http.get(url, { responseType: 'text' }).subscribe((data: any) => {
      this.exportLoading = false;
      const blob = new Blob([data], { type: 'text/csv' })
      saveAs(blob, 'Mapped_Endpoint_List.csv');
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.exportLoading = false;
      });
  }

  export() {
    if (this.exportLoading) {
      return;
    }
    this.exportLoading = true;
    this.getAllMappedEndpointDataForExportCSV();
  }

  exportAllData() {
    // let name = this.commonFunctionsService.generateExportName('mapped_endpoint_list');
    let name = 'Mapped_Endpoint_List';
    let exportData = this.allMappedEndpointData ? this.exportDataConvertor(this.allMappedEndpointData) : [];
    let extraData = `Mapped Endpoint List\n\r`;
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
        'Subscriber': el.name ? el.name : '',
        'IP': el.ipAddress ? el.ipAddress : '',
        'Mapped By': el.mappedBy ? el.mappedBy : '',
        'Flow Discovered': el.discovered === true ? this.language.Yes : this.language.No,
        'Aggregated Groups': this.commonFunctionsService.validateUUID(el.aggGroup) ? this.language.Yes : this.language.No
      });
    });
    return exportData;
  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.errorInfo = '';
    this.error = true;
    if (err.status == 400) {
      this.loading = false;
    } else {
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.pageScrollTop();
    }
    this.loading = false;
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  closeAlert() {
    this.error = false;
    this.errorInfo = "";
  }

}
