import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationsService } from '../services/organizations.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { environment } from './../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ApiUsageService } from '../services/api-usage.service';
import { OrganizationApiService } from '../services/organization-api.service';

declare var require: any;
const $: any = require('jquery');

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
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
        $(settings.nTableWrapper).find('#organizations-table_last').addClass('disabled');
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
  deletedata: any;

  modalTitle: string;
  modalInfo: string;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  frTable: any;
  translateSubscribe: any;
  allOrgSubscribe: any;
  showSecureAccess = false;
  sysAdminRoute: string = 'systemAdministration';
  modalRef: any;
  deleteSubs: any;

  orgsCount: number;
  filterCount: number;
  tableCounts: any;
  sortBy: string;
  sortType: string
  countReceived: boolean;
  searchTerm: string = '';
  apiUsageSub: any;
  @Input() fromOrphanDevice;
  @Output() orgSelected = new EventEmitter();
  selectedOrg = '';
  orgInfoSubs: any;
  orgInfoEntitlementdata: any;
  searchClearable: boolean = false;

  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private api: OrganizationsService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private http: HttpClient,
    private titleService: Title,
    private apiUsageService: ApiUsageService,
    private organizationApiService: OrganizationApiService,

  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.titleService.setTitle(`${this.language['All Organizations']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.currentPageAdder('organizations');

    //this.getOrgsData();
    this.frTable = this.customTranslateService.fr;
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;
    this.titleService.setTitle(`${this.language['All Organizations']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`); 
  }

  ngOnInit() {
    this.getOrgsCount()
    this.closeAlert();
    this.tableLanguageOptions();

    let roles = this.sso.getRoles();
    if (roles && roles.indexOf('OrgAccess') !== -1) {
      this.showSecureAccess = true;
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.allOrgSubscribe) {
      this.allOrgSubscribe.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
    if (this.apiUsageSub) {
      this.apiUsageSub.unsubscribe();
    }
  }

  //New Sever-side rendering 
  getOrgsCount(redraw = false) {
    let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/count`;
    this.http.get(url).subscribe((res: any) => {
      this.orgsCount = res;
      this.countReceived = true;
      if (redraw) {
        this.redraw();
      } else {
        this.tableRender();
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }

  tableRender() {
    let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations`;
    const that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [(this.fromOrphanDevice ? 0 : 1), 2, 3, 4], orderable: false },
        { targets: [this.fromOrphanDevice ? 1 : 0], orderable: true }
      ],
      order: [(this.fromOrphanDevice ? 1 : 0), 'asc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;

        that.getFilterCount(dataTablesParameters.search.value);
        if (dataTablesParameters.search.value) {
          dataTablesParameters.search.value = dataTablesParameters.search.value ? encodeURIComponent(dataTablesParameters.search.value.trim().replace(/\s\s+/g, ' ').replace(/ /g, "%")) : '';
          url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}&filter=${dataTablesParameters.search.value}`;
        } else {
          url = `${environment.CALIX_ADMIN_ORG_BASE_URL}organizations?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}`;
        }

        that.http
          .get<DataTablesResponse>(url).subscribe((resp: any) => {
            that.orgsTableData = resp ? this.sortData(resp, that.sortBy, that.sortType) : [];
            that.hideNoDataRow();
            that.dataAvailable = true;
            that.loading = false;
            that.tableLanguageOptions();
            setTimeout(() => {
              callback({
                recordsTotal: (that.orgsCount != undefined) ? that.orgsCount : 0,
                recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.orgsCount,
                data: []
              });
            }, 150);

          },
            (err: HttpErrorResponse) => {
              if (err.status == 404) {
                that.orgsTableData = [];
                that.hideNoDataRow();
                that.loading = false;
                that.tableLanguageOptions();
                setTimeout(() => {
                  callback({
                    recordsTotal: (that.orgsCount != undefined) ? that.orgsCount : 0,
                    recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.orgsCount,
                    data: []
                  });
                }, 100);
              } else {
                that.pageErrorHandle(err);
                that.loading = false;
              }
            });
      },
      drawCallback: (settings) => {
        this.tableLanguageOptions();
        //this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#organizations-table_last').addClass('disabled');
        }
      },
    };

    this.tableLanguageOptions();

  }

  getFilterCount(str) {
    str = str ? encodeURIComponent(str.trim().replace(/\s\s+/g, ' ').replace(/ /g, "%")) : '';
    this.http.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/count?filter=${str}`).subscribe((res: number) => {
      this.filterCount = res;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  hideSearch() {
    setTimeout(() => {
      //$('#organizations-list .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#organizations-list .dataTables_wrapper .dataTables_length').css('display', 'none');
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

  gotoSecuredAccess(item: any): void {
    this.setOrganization(item);
    this.router.navigate([`${this.sysAdminRoute}/orgSecuredAccess`]);
  }

  gotoOrgDetail(item: any): void {
    this.setOrganization(item);
    this.router.navigate([`${this.sysAdminRoute}/orgDetail`]);
  }

  gotoUsers(item: any): void {
    this.setOrganization(item);
    this.commonOrgService.showAccountManagement?.next(item.id);
    this.getApiUsageQuota(item.id);
  }


  getApiUsageQuota(orgID) {
    this.apiUsageSub = this.apiUsageService.getaApiQuotaDetails(orgID).subscribe(
      (res: any) => {
        if (res && res?.allowed_count && res?.allowed_count != 0) {
          this.commonOrgService.showApiUsage?.next(true)
          localStorage.setItem('apiUsage', "true");
        }
        else {
          this.commonOrgService.showApiUsage?.next(false)
          localStorage.setItem('apiUsage', 'false');
        }
        this.router.navigate([`${this.sysAdminRoute}/users`])

      },
      (error) => {
        this.commonOrgService.showApiUsage?.next(false)
        localStorage.setItem('apiUsage', 'false')
        this.router.navigate([`${this.sysAdminRoute}/users`]);
      }
    );
  }
 
  deleteOrg(item: any): void {
    this.deletedata = item;
    this.modalTitle = this.language['Delete Organization'];
    this.modalInfo = this.deletedata.name;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDeleteSecleted(): void {
    this.closeModal();
    this.deleteSubs = this.api.DeleteOrg(this.deletedata.id).subscribe((res: any) => {
      this.closeAlert();
      this.successInfo = this.language['Organization deleted Successfully'];
      this.success = true;
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.closeAlert();
      }, 3000);

      this.loading = true;
      this.isRerender = true;
      this.getOrgsCount(true);

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  setOrganization(org) {
    sessionStorage.setItem('calixAdminOrgDetail', JSON.stringify(org));
    sessionStorage.setItem('calixAdminOrgID', org.id);
    this.commonOrgService.currentOrgAdder(org.name);
  }

  addOrg() {
    this.router.navigate([`${this.sysAdminRoute}/addOrg`]);
  }

  goToOrgList() {
    this.router.navigate([`${this.sysAdminRoute}/organizations`]);
  }

  openDeleteModal() {
    document.getElementById("deleteModalHiddenButton").click();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.customTranslateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.customTranslateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.customTranslateService.de_DE;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.tableOptions.language
    ) {
      delete this.tableOptions.language;
    }
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
  }

  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: encodeURIComponent(dtObj.oPreviousSearch.sSearch.trim()),
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

  sortData(data, by, type): any {
    let sorted = [];
    sorted = this.sortByColumn(data, type, 'name');
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

  redraw() {
    if (this.searchTerm) {
      this.search(this.searchTerm);
    } else {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }

  onPaste() {
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  assignOrg() {
    this.orgSelected.emit(this.selectedOrg);
  }

}
