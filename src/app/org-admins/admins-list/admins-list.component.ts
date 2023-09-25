declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SsoAuthService } from '../../shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { Title } from '@angular/platform-browser';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit, OnDestroy {


  language: any;
  pageAvailable: boolean = false;

  dataAvailable: any;
  adminsTableData: any = [];

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();

  ORG_ID: string;
  isCalixAdminModule: boolean = false;

  deleteData: any;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  MODULE: string = 'systemAdministration';

  adminsCount: number | string;
  filterCount: number | string = 0;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 20,
    lengthChange: false,
    serverSide: true,
    processing: true,
    dom: 'tipr',
    columnDefs: [
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      let total = settings._iRecordsDisplay;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find('#admins-table_last').addClass('disabled');
      } else {
        //$(settings.nTableWrapper).find('#admins-table_last').removeClass('disabled');
      }
    }
  };

  sortBy: string;
  sortType: string;

  isLoggedUserSameOrganization: boolean = false;
  frTable: any;
  loader: boolean = false;
  translateSubscribe: any;
  tableCounts;
  modalRef: any;
  rolesDeleteSubs: any;
  loading: boolean = true;
  ORG_NAME: string = '';
  searchClearable: boolean = false;
  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private organizationApiService: OrganizationApiService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title

  ) {

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrgId();
    this.ORG_NAME = this.sso.getOrgName();
    this.MODULE = this.sso.getRedirectModule(url);

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      setTimeout(() => {
        this.redraw();
      }, 500);
      this.titleService.setTitle(`${this.language['Organization Admins']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Organization Admins']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.commonOrgService.currentPageAdder('org-admins');
    this.getadminsCount();
    this.frTable = this.customTranslateService.fr;

  }

  ngOnInit() {

    this.closeAlert();
    this.tableLanguageOptions();

    $("body").off('click', '.languageContent ul li a');
    $("body").on('click', '.languageContent ul li a', () => {
      const tempObj = {
        _iDisplayStart: this.tableCounts.start,
        _iDisplayLength: this.tableCounts.displayCount,
        _iRecordsDisplay: this.tableCounts.displayed,
        _iRecordsTotal: this.tableCounts.total,
        oPreviousSearch: {
          sSearch: this.tableCounts.searchText
        }
      };
      this.changeTableStatusLanguage(tempObj);
    });
  }

  ngOnDestroy() {
    $("body").off('click', '.languageContent ul li a');
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.rolesDeleteSubs) {
      this.rolesDeleteSubs.unsubscribe();
    }


  }

  getadminsCount() {
    let url = `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/orgadmin/users/_count`;
    this.http.get(url).subscribe((res: any) => {
      this.adminsCount = res;
      this.dataAvailable = true;
      this.tableRender();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.dataAvailable = true;
      this.tableRender();
      this.loading = false;
    })
  }


  tableRender() {
    let url = `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/orgadmin/users`;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;

        that.callCount(dataTablesParameters.search.value);

        that.http
          .get<DataTablesResponse>(
            `${url}?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}&filter=${dataTablesParameters.search.value}`).subscribe((resp: any) => {
              that.adminsTableData = this.sortData(resp, that.sortBy, that.sortType);
              that.hideNoDataRow();
              that.loading = false;
              this.tableLanguageOptions();
              setTimeout(() => {
                callback({
                  recordsTotal: (that.adminsCount != undefined) ? that.adminsCount : 0,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.adminsCount,
                  data: []
                });
              }, 100);
            },
              (err: HttpErrorResponse) => {
                if (err.status == 404) {
                  that.adminsTableData = [];
                  that.hideNoDataRow();
                  that.loading = false;
                  this.tableLanguageOptions();
                  setTimeout(() => {
                    callback({
                      recordsTotal: (that.adminsCount != undefined) ? that.adminsCount : 0,
                      recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.adminsCount,
                      data: []
                    });
                  }, 100);
                } else {
                  this.pageErrorHandle(err);
                  that.loading = false;
                }
              });
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#admins-table_last').addClass('disabled');
        }
      },
    };

    this.tableLanguageOptions();

  }

  callCount(str) {
    this.http.get(`${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/orgadmin/users/_count?filter=${str}`).subscribe((res: number) => {
      this.filterCount = res;
    })
  }

  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }



  search(term: string) {
    this.searchClearable = term.length ? true : false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  onSearchClearing(searchBar){
    this.searchClearable = false;
    searchBar.value = '';
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchBar.value).draw();
    });
  }

  gotoUserDetail(info: any): void {
    sessionStorage.setItem('calixAdminUserDetail', JSON.stringify(info));
    this.router.navigate([`${this.MODULE}/usersDetail`]);
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  hideSearch() {
    setTimeout(() => {
      $('#admins-list-table .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#admins-list-table .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 50);
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.sortByColumn(data, type, 'firstName');
    } else if (by == 1) {
      sorted = this.sortByColumn(data, type, 'lastName');
    } else if (by == 2) {
      sorted = this.sortByColumn(data, type, 'email');
    }
    return sorted;
  }

  sortByColumn(data, type, column): any {
    data.sort((a, b) => {
      var nameA = a[column] ? a[column].toUpperCase() : '';
      var nameB = b[column] ? b[column].toUpperCase() : '';
      if (type == 'asc') {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
      // names must be equal
      return 0;
    });

    return data;
  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.trim(),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
      filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
        (isFrench ?
          `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
          `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
        ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    )
    $(".first").text(isFrench ? 'Le début' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : 'Last');
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
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
