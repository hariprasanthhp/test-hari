import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { ProfileService } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/profile.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Subject, forkJoin} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  language: any;
  languageSubject: any;
  getAllProfileData: any;
  profileList: any[];
  profileData: any;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr'
  };
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  getProfileData: any;
  isTableLoaded: any;
  loader: boolean;
  errorInfo: any;
  error: boolean;
  success: boolean;
  successInfo: any;
  deletedata: any;
  smpId: any;
  modalInfo: any;
  dataAvailable: boolean;
  frTable:any;
  esTable: any;
  de_DETable: any;
  count: any;
  searchsub: any;
  detail: any;
  sortedColumnDetails: any;
  deviceType: any;
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private service:ProfileService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private http: HttpClient
    ) {this.language = this.translateService.defualtLanguage;
      this.frTable = this.translateService.fr;
      this.esTable = this.translateService.es;
      this.de_DETable = this.translateService.de_DE;}
    scope: any = [];
   tableCounts: any;
  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']) {
      if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']?.indexOf('read') !== -1) this.scope['read'] = true;
      if (scopes['cloud.rbac.coc.operations.configuration.axosmigration']?.indexOf('write') !== -1) this.scope['write'] = true;
    }
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      //this.tableLanguageOptions();
      this.rerender();
      
    });
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthChange: true,
        processing: false,
        dom: 'tipr',
        stateSave: true,
        // stateDuration: -1,
        autoWidth: false,
        columnDefs: [
          { targets: [0], orderable: true },
          { targets: [1,2,3,4], orderable: false },
        ],
          order: [],
      }
      this.languageSubject = this.translateService.selectedLanguage.subscribe(
        (data) => {
          this.language = data;
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
          this.tableLanguageOptions();
        });
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
        this.getProfileList()
        this.tableLanguageOptions();
  }
  editProfile(data){
    console.log("data",data)
    let id = data?.id 
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/profiles/add'], { queryParams:{smpId:id}});
    
  }
  firstValues: boolean;
  Settings: any;
  show: boolean;
  searchtext: string;
  showcloseicon: boolean = false;
  closeicon(text) {
    this.searchtext = ""
    this.showcloseicon = false
    this.search(this.searchtext);
  }
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
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }
  tableLanguageOptions(value?) {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }
  search(term: string) {
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
 this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns(0).search(term).draw();
    });
   }
   private _iDisplayStart: number;
   tableCount: any = 0;
   getProfileList(val?) {
    if(val){
      this.dtTrigger.next();
    }
    this.loader=true
    const that = this;
    let pageNumber: number;
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/rg/smps`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      search: false,
      destroy:true,
      //paging: true,
      dom: "tipr",
      columnDefs: [
        { targets: [0], orderable: true },
        { targets: [1,2,3,4], orderable: false },
      ],
        order: [],
      //responsive: true,
      drawCallback: (settings) => {
        this.Settings = settings;
        this.changeTableStatusLanguage(settings)
        this._iDisplayStart = settings._iDisplayStart
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        // if (total <= length) {
        //   $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        // }
      },
      ajax: (dataTablesParameters: any, callback) => {
        if (this.Settings && dataTablesParameters.start == 9990) {
          this.show = true
          this.changeTableStatusLanguage(this.Settings);
        } else {
          this.show = false;
        }
        let limit, value, pageSize = 10;
        pageNumber = Math.round(dataTablesParameters.start / pageSize);
        this.sortedColumnDetails = dataTablesParameters.order[0]?.dir;
        // if (dataTablesParameters.start == 0) {
        //   pageNumber = 0;
        // } else {
        //   pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        // }
        // if(!this.sortedColumnDetails) this.sortedColumnDetails = 'asc'
        // var params:any = {"page": `${pageNumber }`,"size": pageSize,sort:`name,${this.sortedColumnDetails}`}
        var params:any = {"filter":`${this.searchtext || ''}`,"page": `${pageNumber }`,"size": pageSize}
        if(this.sortedColumnDetails) params = {...params,sort:`name,${this.sortedColumnDetails}`}
          this.searchsub = that.http
          .get<DataTablesResponse>(
            url, { params:params}
          ).subscribe((resp: any) => 
          {
            this.tableCount = resp?.totalNumberRecords  ?resp?.totalNumberRecords:0 ;
            //this.rerender()
            this.profileList=resp?.result ? resp?.result:[]
            // console.log("profileList",resp?.result.filter((e)=> e.voiceServiceType !== "X_000631_TDMGW"))
            that.dataAvailable = true;
              callback({
                recordsTotal: that.tableCount,
                recordsFiltered: that.tableCount,
                data: []
              });
              
              that.loader = false;
            // let element = (document.getElementsByClassName('dataTables_empty')[0] as HTMLElement)
            // if(element) element.style.display = resp.length ? 'none' : 'table-cell';

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

      },
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
    });
  }
  showdetails(data) {
   this.detail = data;
   let id=data?.id
   let type = 'RG'
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/profiles/detail'], { queryParams:{smpId:id,type:type}});
  }
  
  deleteProfile(data){
    this.smpId = data?.id
    this.deletedata=data
    this.modalInfo = this.deletedata?.name;
    $("html, body").animate({ scrollTop: 0 }, "slow");
    
  }
  DeleteProfile(){
    this.loader=true
    this.service.DeleteProfile(this.smpId,this.sso.getOrgId()).subscribe((res: any) => {
      this.success = true
      this.loader=false
      this.deletedata = "";
        this.successInfo = res?.message ? res.message : res;

      this.getProfileList(true)
     
    }, (err: HttpErrorResponse) => {
      this.loader=false
      this.deletedata = "";
      this.pageErrorHandle(err);
    })
  }
  closeModal(): void {
    this.deletedata = "";
  }
  // getProfileList(){
  //   this.loader=true
  //   this.getAllProfileData = this.service.GetAllProfile(this.sso.getOrgId(),0,1).subscribe((res: any) => {
     
  //       this.profileList = res? res?.result:[];
  //       if (this.isTableLoaded) {
  //         this.rerender();
  //       } else {
  //         this.isTableLoaded = true;
  //         this.dtTrigger.next();
  //       }
  //       this.loader=false
  //     }, (err: HttpErrorResponse) => {
  //       if (this.isTableLoaded) {
  //         this.rerender();
  //       } else {
  //         this.isTableLoaded = true;
  //         this.dtTrigger.next();
  //       }
  //       this.loader=false
  //       this.pageErrorHandle(err);
  //     })
  // }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loader = false;
  }

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  gotoAdd() {
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/profiles/add']);
  }
  closeAlert() {
    this.error = false;
    this.errorInfo = '';
  }
  
  setSuccessInfo(msg: any) {
    this.success = true;
    this.successInfo = msg;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }

}
