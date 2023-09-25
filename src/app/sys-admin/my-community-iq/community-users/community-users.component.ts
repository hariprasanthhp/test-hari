import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MycommunityIQComponent } from 'src/app/cco-foundation/foundation-home/mycommunity-iq/mycommunity-iq.component';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { Subscription } from 'rxjs-compat/Subscription';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataTablesResponse } from 'src/app/support/netops-management/shared/model/data-table-response';
import { CommonService } from '../../services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  orgId: number;
  communitySubscriberList: any[] = [];
  CSVLimitExceded: boolean = false;
  selectedUserForEditOrDelete: any;
  selectedCommunityForRemove: number;
  private _iDisplayStart: number;
  language: any;
  frTable: any;
  esTable: any;
  de_DETable: any;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr',
    lengthChange: false,
    pageLength: 10,
    processing: true,
    
  };
  loader: boolean = false;
  disabledAddUser: boolean = true;
  deleteSuccess:boolean = false;
  
  constructor(
    private dialogService: NgbModal,
    private myCommunityIqService: MycommunityIqService,
    private router: Router,
    private translateService: TranslateService,
    public http: HttpClient,
    private commonOrgService: CommonService,
    private systemservice: FoundationManageService,
    private titleService: Title
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnInit(): void {
    this.orgId = JSON.parse(localStorage.getItem('calix.org_id'));
    this.language = this.translateService.defualtLanguage;
    this.subscriptions.push(this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableLanguageOptions();
      this.titleService.setTitle(`${this.language['Community Users']} - ${this.language['SmartTown Wi-Fi']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
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
    }));
    this.titleService.setTitle(`${this.language['Community Users']} - ${this.language['SmartTown Wi-Fi']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.getCommunitySubscribers();
    this.getCount();
    this.GetBspProvider();
    this.getMicroSites();
  }
  tableCounts:any;
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj._iRecordsTotal > 10000 && (dtObj.oPreviousSearch.sSearch == '' || dtObj.oPreviousSearch.sSearch != '') ?
      (isFrench ?
        `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isSpanish ? `(filtrado de un total de  ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isGermen ? `(gefiltert aus  ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
          `(filtered from  ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '')) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }
  /*Fetch all community Users */
  count: number = 0;
  filteredValueCount:number = 0
  getCount() {
    this.loader = true;
    this.myCommunityIqService.getSmartTownUsersCount(this.selectedMicroSite , this.filter).subscribe((res: number) => {
      this[this.selectedMicroSite || this.filter ? 'filteredValueCount' :'count'] = res;
      this.rerender()
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err)
    })
  }
  dtTrigger: Subject<any> = new Subject();
  rerender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  microSiteList: any = [];
  bspDataLoader:boolean;
  getMicroSites() {
    this.bspDataLoader = true;
    this.subscriptions.push(this.myCommunityIqService.GetMicrosite().subscribe((res: any) => {
      this.microSiteList = [{ communityName: this.language['All_communities'], id: '' }, ...res];
      this.bspDataLoader = false;
    },err=>{
      this.bspDataLoader = false;
      if(err.error.errorMessage !== "No BSP Provider Found."){
        this.pageErrorHandle(err);
      }
      //
    }))
  };
  dataTableSetting:any;
  show:boolean;
  getCommunitySubscribers(count?): void {
    let that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      search: false,
      paging: true,
      dom: "tipr",
      responsive: true,
      
      drawCallback: (settings) => {
        this.dataTableSetting = settings;
        
        this.changeTableStatusLanguage(settings)
       
        let length = settings._iDisplayLength,pageLimit = 10, value = this.count - length; 
        if (value <= pageLimit) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        if (this.dataTableSetting && dataTablesParameters.start == 9990) {
          this.show = true
          this.changeTableStatusLanguage(this.dataTableSetting);
        } else {
          this.show = false;
        }
        let pageNumber, limit, value, pageSize = 10;
        pageNumber = Math.round(dataTablesParameters.start / pageSize);
        value = this.count - pageNumber * pageSize;
        limit = (value > pageSize || !this.count) ? pageSize : value;
        pageNumber *= pageSize;
        let url = `${environment.FOUNDATION_BASE_URL}/subscriber-systems/passpoint-subscribers?org-id=${this.orgId}&offset=${pageNumber}&limit=${limit}${this.selectedMicroSite ? ('&micrositeId=' + this.selectedMicroSite) : ''}${this.filter ? ('&filter='+this.filter) :''}`
        that.loader = true;
        that.http.get<DataTablesResponse>(
          url
        ).subscribe((res: any) => {
          this.communitySubscriberList = res
          that.loader = false;
          callback({
            recordsTotal: this.count,
            recordsFiltered: (this.selectedMicroSite || this.filter) ? this.filteredValueCount : this.count,
            data: []
          });
          let element = (document.getElementsByClassName('dataTables_empty')[0] as HTMLElement)
         if(element) element.style.display = res.length ? 'none' : 'table-cell';
        },
          (err: HttpErrorResponse) => {
            that.loader = false;
            if (err.status == 404) {
         
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            } else {
              this.pageErrorHandle(err);
            }
          });

      }
    }
  };
  errorInfo
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }
  selectedMicroSite: any = '';

  openAddUserPopup(modal) {
    this.CSVLimitExceded = false;
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'add-user-modal' });
  };

  openEditOrDeleteUsersModal(user, modal) {
    this.selectedUserForEditOrDelete = user;
    this.selectedCommunityForRemove = undefined;
    this.editSuccess = false;
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'edit-user-modal' });
  };
  close() {
    this.dialogService.dismissAll();
  };
  readSingleFile(e) {

    var file = e.target.files[0];

    if (!file || (!file.type?.includes('csv') && !/^(application\/vnd.ms-excel)$/.test(file.type))) {
      return;
    };

    var reader = new FileReader();
    let that = this;
    reader.onload = function (e) {
      var contents = e.target.result;
      that.displayContents(contents);
    };
    reader.readAsText(file);
  };

  displayContents(contents) {
   
     let values = contents.split(/\r?\n/).map(e => {
      let row = e.split(','), value = { firstName: '', lastName: '', email: '', community: [] };
      if (row.length) {
        value.firstName = row[0];
        if (row[1]) value.lastName = row[1];
        if (row[2]) value.email = row[2];
        if (row[3]) value.community = [...new Set(row.slice(3).map(e => (JSON.stringify({ "communityName": e.replace(/"/g,'') }))))].map((e:string)=> (JSON.parse(e)));
      };
      return value;
    });
    values = [...new Set(values.map(e=>JSON.stringify(e)))].map((e:string)=> JSON.parse(e)).filter(e=> Object.keys(e).some(c=> Array.isArray(e[c]) ? e[c].length : e[c]));
    const maximumAllowedUserCount = 1000;
    this.CSVLimitExceded = values.length> maximumAllowedUserCount;
    if (this.CSVLimitExceded) return;
    this.myCommunityIqService.communityListSubject.next(values);
    
    this.close();

    this.router.navigate(['/organization-admin/SmartTownWi-Fi/confirm-users']);
  };
  editSuccess:boolean = false;
  removedCommunity:any;
  removeCommunityName:string;
  EditLoader:boolean = false;
  removeCommunity() {
    this.EditLoader = true;

    this.removedCommunity =  this.selectedUserForEditOrDelete?.community?.splice(this.selectedCommunityForRemove, 1);
    this.subscriptions.push(this.myCommunityIqService.editCommunityAccess({enable:Boolean(this.selectedUserForEditOrDelete?.community?.length),communities:this.selectedUserForEditOrDelete.community}, this.orgId,this.selectedUserForEditOrDelete.subscriberId).subscribe(res => {
      this.selectedCommunityForRemove = undefined;
      this.EditLoader = false;
      if(!this.selectedUserForEditOrDelete?.community?.length) {
        this.close();
        this.getCount();
      }
      this.editSuccess = true; 
  
    },err=> {
      this.selectedUserForEditOrDelete?.community?.splice(this.selectedCommunityForRemove, 0,this.removedCommunity[0]);
      this.selectedCommunityForRemove = undefined;
      this.EditLoader = false;
      this.editSuccess = false;
      this.close();
      this.pageErrorHandle(err);
    }));
  };

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  GetBspProvider() {
    this.subscriptions.push(this.myCommunityIqService.GetBspproviderInfo().subscribe((res: any) => {
      this.disabledAddUser = res?.status !== 'READY'
    },err=>{
      if(err.error.errorMessage !== "No BSP Provider Found."){
        this.pageErrorHandle(err);
      }
    }));
  }
  deleteUser(id) {
    this.close();
    this.loader = true;
    this.subscriptions.push(this.systemservice.deleteSubscriber(id, this.orgId).subscribe((res: any) => {
     this.deleteSuccess  = true;
      setTimeout(() => {
        this.deleteSuccess  = false;
        this.getCount();
      }, 3500);
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
    })
    );
  };
  typingTimer:any;
  filter:string;
  filterValue(){
    clearTimeout(this.typingTimer);
    // Start a new timer for 500 milliseconds (adjust as needed)
    this.typingTimer = setTimeout(() => {
      this.getCount();
    }, 500);
  }
  ngOnDestroy(): void {
    this.subscriptions?.forEach(e => e.unsubscribe());
  };
  replaceLimitValue(message:string):string{
    return message.replace('500','1000');
  };
}


