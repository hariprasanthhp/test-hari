import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
// import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
declare var require: any;
const $: any = require('jquery');
import { SsoAuthService } from '../../shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  language: any;
  languageSubject: any;
  pageAvailable: boolean = false;

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;

  dataAvailable: any;
  editOnValue: any;

  usersTableData: any = [];

  modalTitle: string;
  modalInfo: string;

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

  usersCount: number | string;
  filterCount: number | string = 0;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 20,
    lengthChange: false,
    serverSide: true,
    processing: true,
    dom: 'tipr',
    columnDefs: [
      { targets: [3, 4], orderable: false },
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      let total = settings._iRecordsDisplay;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
      } else {
        //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
      }
    }
  };

  sortBy: string;
  sortType: string;

  isLoggedUserSameOrganization: boolean = false;
  frTable: any;
  loader: boolean = false;
  translateSubscribe: any;
  showAddUsers: boolean = false;
  tableCounts;
  modalRef: any;
  rolesDeleteSubs: any;
  userDeleteSubs: any;
  getCountSubs: any;
  countReceived: boolean;
  getOrgInfoSubs: any;
  mfaRequestForm = environment.EMBEDDING_LINK;
  showMFARequestForm = false;
  tableAjaxSubscription: Subscription;
  searchClearable: boolean = false;

  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    // private customTranslateService: CustomTranslateService,
    private organizationApiService: OrganizationApiService,
    // private auth: AuthService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private titleService: Title

  ) {

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.isCalixAdminModule = this.checkModule(url);
    this.showAddUsers = this.checkShowAddUsers(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['users']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.tableLanguageOptions();
      this.reloadCurrentRoute();
      // setTimeout(() => {
      //   this.redraw();
      // }, 500);
    });

    this.commonOrgService.currentPageAdder('users');
    //this.getUserOrgDetails();
    this.getUsersCount();
    this.checkUserOrganization();
    this.frTable = this.translateService.fr;
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.language['users']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    //this.getUserList();
    this.tableRender();
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
    this.showMFARequestForm = this.MODULE === 'systemAdministration' || this.sso.isSecureAccess() ? false : true;
  }

  ngOnDestroy() {
    $("body").off('click', '.languageContent ul li a');
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.rolesDeleteSubs) {
      this.rolesDeleteSubs.unsubscribe();
    }

    if (this.userDeleteSubs) {
      this.userDeleteSubs.unsubscribe();
    }

    if (this.getCountSubs) {
      this.getCountSubs.unsubscribe();
    }

    if (this.getOrgInfoSubs) {
      this.getOrgInfoSubs.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.tableAjaxSubscription) {
      this.tableAjaxSubscription.unsubscribe();
    }

    this.dest();

  }

  getUserOrgDetails() {
    this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ORG_ID).subscribe((res: any) => {
      this.sso.setAdminOrgInfo(res);
    });
  }

  getUsersCount() {
    this.getCountSubs = this.organizationApiService.UsersCountByOrgId(this.ORG_ID).subscribe((res: any) => {
      this.usersCount = res;
      this.countReceived = true;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
      this.usersCount = undefined;
      this.countReceived = true;
    })
  }


  tableRender() {
    let url = `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/users`;
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [3, 4], orderable: false },
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;

        that.callCount(dataTablesParameters.search.value);

        that.tableAjaxSubscription = that.http
          .get<DataTablesResponse>(
            `${url}?offset=${dataTablesParameters.start}&size=${dataTablesParameters.length}&filter=${dataTablesParameters.search.value}`).subscribe((resp: any) => {
              that.usersTableData = this.sortData(resp, that.sortBy, that.sortType);
              that.hideNoDataRow();
              //that.hideSearch();
              that.dataAvailable = true;
              this.tableLanguageOptions();
              setTimeout(() => {
                callback({
                  recordsTotal: (that.usersCount != undefined) ? that.usersCount : 0,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.usersCount,
                  data: []
                });
              }, 100);
            },
              (err: HttpErrorResponse) => {
                if (err.status == 404) {
                  that.usersTableData = [];
                  that.hideNoDataRow();
                  that.dataAvailable = true;
                  this.tableLanguageOptions();
                  setTimeout(() => {
                    callback({
                      recordsTotal: (that.usersCount != undefined) ? that.usersCount : 0,
                      recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.usersCount,
                      data: []
                    });
                  }, 100);
                } else {
                  this.pageErrorHandle(err);
                  this.dataAvailable = true;
                }
              });
      },
      drawCallback: (settings) => {
        //this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
      columns: [{ data: 'username' }, { data: 'email' }, { data: 'firstName' }, { data: 'lastName' }, { data: '' }]
    };

    this.tableLanguageOptions();

    //this.dtTrigger.next();

  }

  callCount(str) {
    this.http.get(`${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/users/_count?filter=${str}`).subscribe((res: number) => {
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
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
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

  deleteUser(data: any) {
    this.deleteData = data;
    this.modalTitle = this.language['Delete user'];
    this.modalInfo = `${this.language['Are you sure you want to delete']} ${data.username}?`
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });

  }

  confirmDeleteSecleted(): void {
    this.closeModal();
    this.rolesDeleteSubs = this.organizationApiService.DeleteRolesListByUserId(this.deleteData._id).subscribe((res: any) => {
      this.userDeleteSubs = this.organizationApiService.UserDelete(this.deleteData._id).subscribe((res: any) => {

        this.closeAlert();
        this.successInfo = this.language['User deleted Successfully'];
        this.success = true;
        this.commonOrgService.pageScrollTop();

        this.dataAvailable = false;
        this.usersCount = undefined;
        this.filterCount = undefined;
        this.deleteData = undefined;
        this.getUsersCount();
        this.redraw();
        setTimeout(() => {
          this.closeAlert();
        }, 1500);
      },
        (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.commonOrgService.pageScrollTop();
        });
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.commonOrgService.pageScrollTop();
      });


  }

  redraw() {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  redrawnew() {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.tableRender();
    });
  }




  addUser() {
    this.router.navigate([`${this.MODULE}/addUser`]);
  }

  hideSearch() {
    setTimeout(() => {
      $('#users-list-table .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#users-list-table .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 50);
  }

  checkModule(url: string) {
    let sysAdmin = `${environment.SYS_ADMIN_ROUTE}`;
    if (url.indexOf(`/${sysAdmin}/`) > -1) {
      return true;
    }
    return false;
  }

  checkShowAddUsers(url: string) {

    let roles = this.sso.getRoles();
    let org_sfid: any = '';
    org_sfid = this.sso.getOrgSFID();
    let isSecureAccess = this.sso.isSecureAccess() ? true : false;
    if (!isSecureAccess && url.indexOf('/organization-admin/') > -1 && typeof org_sfid != 'undefined' && (org_sfid == '' || org_sfid == null) && roles.includes('OrgAdmin')) {
      return true;
    }
    return false;


  }


  openDeleteModal() {
    document.getElementById("deleteModalHiddenButton").click();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.sortByColumn(data, type, 'username');
    } else if (by == 1) {
      sorted = this.sortByColumn(data, type, 'email');
    } else if (by == 2) {
      sorted = this.sortByColumn(data, type, 'firstName');
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

  gotoUserSecuredAccess(item: any) {
    sessionStorage.setItem('SecuredAccessUser', JSON.stringify(item));
    this.router.navigate([`${this.MODULE}/UserSecuredAccess`]);
  }

  checkUserOrganization() {
    let loggedUsersOrgId = this.sso.getOrgId();
    if (this.ORG_ID == loggedUsersOrgId) {
      this.isLoggedUserSameOrganization = true;
    } else {
      this.isLoggedUserSameOrganization = false;
    }
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  dest() {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      //dtInstance.draw();
    });
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openMFAForm() {
    window.open(this.mfaRequestForm, "_blank")
  }
}
