declare var require: any;
import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
//import { CommonFunctionsService } from '../../administration/shared/services/common-functions.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
// import { OrganizationApiService } from '../services/organization-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable, forkJoin } from 'rxjs';
import { BlackListUsersService } from '../services/black-list-users.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from '../../shared/services/auth.service';
const $: any = require('jquery');
import * as moment from 'moment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-black-list-users',
  templateUrl: './black-list-users.component.html',
  styleUrls: ['./black-list-users.component.scss']
})
export class BlackListUsersComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;

  tableOptions: DataTables.Settings = {
    language: {
      emptyTable: 'Aucune donnée disponible dans le tableau',
      info: 'Affichage de _START_ à _END_ des _TOTAL_ entrées',
      infoEmpty: 'Affichage de 0 à 0 des 0 entrées',
      infoFiltered: '(filtrées à partir des _MAX_ entrées totales)',
      lengthMenu: 'Afficher les _MENU_ entrées',
      loadingRecords: 'Chargement...',
      thousands: ',',
      infoPostFix: '',
      search: 'Chercher:',
      zeroRecords: 'zeroRecords',
      paginate: {
        first: 'Le début',
        last: 'Dernière',
        next: 'Suivant',
        previous: 'Précédent'
      }
    },
    pagingType: 'full_numbers',
    columnDefs: [
      { targets: [0], orderable: false },
      { targets: '_all', orderable: true }
    ],
    dom: 'tipr',
    order: [1, 'asc'],
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find('#deactivated-users-table_last').addClass('disabled');
      }
      this.table(settings)
    }
  };

  ngAfterViewInit():void{
    this.rerender()
  }

  blacklistTableData: any;
  allData: any;
  exportData: any;


  dataAvailable: boolean = false;

  editOnValue: any;

  filterData: any;

  selectedUsers: any = [];

  modalTitle: string;
  modalInfo: string;
  modalRef: any;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;

  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  ORG_ID: string;
  MODULE: string = 'calixAdmin';
  frTable: any;
  translateSubscribe: any;
  usersListSubs: any;
  newArray:any=[];
  searchString: boolean;
  constructor(
    //private commonFunctionsService: CommonFunctionsService,
    private commonOrgService: CommonService,
    private router: Router,
    // private customTranslateService: CustomTranslateService,
    // private organizationApiService: OrganizationApiService,
    private apiService: BlackListUsersService,
    // private auth: AuthService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private titleService: Title,

  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.isRerender = true;
      this.selectedUsers = [];
      this.titleService.setTitle(`${this.language['deactivatedusers']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.setTableOptions('language');
    });

    //this.usersList();
    this.frTable = this.translateService.fr;
    this.getUsers();
    this.titleService.setTitle(`${this.language['deactivatedusers']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.closeAlert();
    this.tableLanguageOptions();
    this.commonOrgService.currentPageAdder('blacklist');
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.usersListSubs) {
      this.usersListSubs.unsubscribe();
    }
  }

  getUsers() {
    this.usersListSubs = this.apiService.getBlacklistUsersByOrgId(this.ORG_ID).subscribe((data: any) => {
      if (data) {
        this.blacklistTableData = [...data];
        this.setTableOptions();
      }
    }, (err: HttpErrorResponse) => {
      this.blacklistTableData = [];
      this.dataAvailable = true;
      setTimeout(()=>{
        this.showNoDataAvailable()   
      },0)
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    })
    this.rerender();
  }

  clearSearch(){
    let search=document.querySelector('#search-deactivated-user') as HTMLInputElement;
    search.value='';
    this.searchString=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(search.value).draw();
    })
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      // language: {
      //   emptyTable: 'Aucune donnée disponible dans le tableau',
      //   info: 'Affichage de _START_ à _END_ des _TOTAL_ entrées',
      //   infoEmpty: 'Affichage de 0 à 0 des 0 entrées',
      //   infoFiltered: '(filtrées à partir des _MAX_ entrées totales)',
      //   lengthMenu: 'Afficher les _MENU_ entrées',
      //   loadingRecords: 'Chargement...',
      //   thousands: ',',
      //   infoPostFix: '',
      //   search: 'Chercher:',
      //   zeroRecords: 'zeroRecords',
      //   paginate: {
      //     first: 'Le début',
      //     last: 'Dernière',
      //     next: 'Suivant',
      //     previous: 'Précédent'
      //   }
      // },
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthChange: false,
      //searching: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: false },
        { targets: '_all', orderable: true }
      ],
      order: [1, 'asc'],
      drawCallback: (settings) => {
        this.newArray=settings.aiDisplay;
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#deactivated-users-table_last').addClass('disabled');
        }
        this.table(settings)
      }

    };
    this.tableLanguageOptions();

    //this.dataAvailable = true;
    if (type && type == 'language') {
      setTimeout(() => {
        this.dataAvailable = true;
      }, 200);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        this.hideSearch();
      }, 500);
    }
    this.rerender();

  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
      // this.hideSearch();
    });
  }

  hideSearch() {
    setTimeout(() => {
      $('#blacklist-table .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#blacklist-table .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 100);
  }

  search(term: string) {
    if(term == ''){
      this.searchString=false;
    }
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
      this.searchString=true;
      this.showNoDataAvailable();
    });
  }
  showNoDataAvailable(){
    setTimeout(()=>{
      let span=document.querySelector('.dataTables_empty') as HTMLElement;
        if(span){
          span.style.display='table-cell';
          span.classList.add('text-center');
        };
    },100);
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }

  deactivateUser() {
    this.router.navigate([`${this.MODULE}/blacklistAddUser`]);
  }
  table(settings){
    this.selectedUsers=[];
    for(let i=0;i>settings.aoData.length;i++){
      this.blacklistTableData[i]['checked']=false;
    }
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
  }

  selectDeselectAll(isChecked) {
    //this.selectedUsers = [];

    let i = 0;
    var that = this;
    if (isChecked) {
      $('input[name^="activate_user"]').each(function () {
        if (i >= 10) {
          return false
        }
        $(this).prop('checked', true);
        that.selectedUsers.push($(this).attr('id'));
        i++;
      });
    } else {
      $('input[name^="activate_user"]').each(function () {
        if (i >= 10) {
          return false
        }
        $(this).prop('checked', false);
        that.selectedUsers = [];
        i++;
      });
    }
    this.validateCheck()
  }


  levelOneChange(item: any, isChecked: any, index) {
    var that = this;
    $(`.activate_user_${index}`).prop('checked', isChecked);

    if (isChecked) {
      that.selectedUsers.push(item.username);
      let tot = $('input[name^="activate_user"]').length;
      if (this.selectedUsers.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }
    } else {
      that.selectedUsers = that.selectedUsers.filter((e) => {
        return e != item.username;
      });
      let tot = $('input[name^="activate_user"]').length;
      if (this.selectedUsers.length) {
        if (this.selectedUsers.length != tot) {
          $('#selectDeselectAll').prop('checked', false);
          $('#selectDeselectAll-span').show();
        } else {
          $('#selectDeselectAll-span').hide();
        }
      } else {
        $('#selectDeselectAll').prop('checked', false);
        $('#selectDeselectAll-span').hide();
      }
    }
    this.validateCheck();
  }

  validateCheck() {
    let mainCheckbox = document.querySelector('.mainChk') as HTMLInputElement;
    let tot = document.querySelectorAll('input[name^="activate_user"]').length;
    this.selectedUsers=[...new Set(this.selectedUsers)];
    if (this.selectedUsers.length == tot) {
      mainCheckbox.checked = true;
    } else {
      mainCheckbox.checked = false;
    }
  }


  reActivate() {
    const selectedUsers = [...new Set(this.selectedUsers)];
    let info = selectedUsers.join(', ');
    this.modalTitle = this.language['Reactivate Users'];
    this.modalInfo = info;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }


  confirmDeleteSecleted(): void {
    this.closeModal();
    const deleteCalls: Observable<any>[] = [];
    this.selectedUsers.forEach(username => {
      deleteCalls.push(this.apiService.ReactivatetUserByOrgId(username, this.ORG_ID));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.selectedUsers = [];
        this.successInfo = `${this.language['User reactivated successfully']}!`;
        this.success = true;
        this.commonOrgService.pageScrollTop();

        this.dataAvailable = false;
        // this.getUsers();
        // this.setTableOptions();
        this.rerender();
        this.getUsers();
        (document.getElementById('search-deactivated-user') as HTMLInputElement).value = '';
        setTimeout(() => {
          this.closeAlert();
        }, 3000);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );

  }


  changeDate(dt) {
    // if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
    //   moment.locale('fr');
    //   return moment(dt).format('DD MMM YYYY, HH:mm');
    // }
    let date = new Date(dt).toString().split('(')
    date[1] = this.language[date[1].slice(0, -1)] || date[1].slice(0, -1)
    return `${date[0]} (${date[1]})`;
  }

  showAllUserCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);
    this.selectDeselectAll(true);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
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
    this.commonOrgService.pageScrollTop();
  }

}
