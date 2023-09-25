import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject, forkJoin } from 'rxjs';
import { DownloadService } from 'src/app/shared/services/download.service';
import { environment } from 'src/environments/environment';
import { ValidatorService } from 'src/app-services/validator.services';
import { Title } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { log } from 'console';
import { ProfileService } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/profile.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-migration-mapping',
  templateUrl: './migration-mapping.component.html',
  styleUrls: ['./migration-mapping.component.scss']
})
export class MigrationMappingComponent implements OnInit {

  cmodalRef: any;

  GetmigrationStatus: any;
  migrationId: any;
  loader: boolean;
  error: boolean;
  errorInfo: any;
  language: any;
  languageSubject: any;
  GetListData = [];
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr'
  };
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  isTableLoaded: any;
  success: boolean;
  successInfo: any;
  migrationName: any;
  GetExportData: any;
  frTable: any;
  esTable: any;
  de_DETable: any;
  count: any;
  dataAvailable: boolean;
  searchsub: any;
  ontInfoSubs: any;
  deviceInfo: any;
  subscriber: any;
  sortedColumnDetails: any;
  constructor(private translateService: TranslateService, private modalService: NgbModal,
    private dialogService: NgbModal, private service: ProfileService, private sso: SsoAuthService, private commonOrgService: CommonService, private router: Router, private route: ActivatedRoute, private downloadService: DownloadService, private http: HttpClient, private validatorService: ValidatorService, private titleService: Title,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
  }
  scope = []
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
      this.titleService.setTitle(`Jobs - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    })
    this.titleService.setTitle(`Jobs - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [3, 5, 6], orderable: true },
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
      }

    );
    this.route.queryParams.subscribe(params => {
      if (params['migrationId']) {
        this.migrationId = params['migrationId'];
        this.migrationName = params['migrationName'];
      }
    })
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
    this.tableRender()
    //this.getAllstatus()
    this.getallMigSer()
    this.tableLanguageOptions();
  }
  getallMigSer(val?) {
    this.loader = true
    if (val) {
      this.dtTrigger.next()
      this.tableRender()
    }
    this.service.GetAllsummary(this.migrationId).subscribe((res: any) => {

      this.GetmigrationStatus = res ? res : {};
      if (!val) this.loader = false
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
    })
  }
  firstValues: boolean;
  Settings: any;
  show: boolean;
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
  tableCount: any = 0;
  getAllstatus() {
    this.loader = true
    this.service.GetAllservices(this.migrationId).subscribe((res: any) => {
      this.count = res?.totalNumberOfPages ? res?.totalNumberOfPages : 0;
      // this.tableCount = res?.totalNumberRecords  ?res?.totalNumberRecords:0 ;
      // this.rerender()
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.tableCount = 0;
    })
  }
  private _iDisplayStart: number;
  tableRender() {
    this.loader = true
    const that = this;
    let pageNumber: number;
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/migration/${this.migrationId}/services`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      search: false,
      destroy: true,
      //paging: true,
      dom: "tipr",
      columnDefs: [
        { targets: [0,1,2,4,5,8,9,10,11,12,13,14,15,16,17,18], orderable: false },
      ],
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
        this.sortedColumnDetails = dataTablesParameters?.order[0]?.dir;
        // if (dataTablesParameters.start == 0) {
        //   pageNumber = 0;
        // } else {
        //   pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        // }
        // const params = new HttpParams()
        //   .set("page", `${pageNumber }`)
        //   .set("size", pageSize)
        var params:any;
        if(dataTablesParameters?.order[0]?.column == 7) {
          params  = {"page": `${pageNumber }`,"size": pageSize,sort:`provisioningStatus,${this.sortedColumnDetails}`,"id":`${this.migrationId}`}
        }else if(dataTablesParameters?.order[0]?.column == 6){
          params  = {"page": `${pageNumber }`,"size": pageSize,sort:`mappingStatus,${this.sortedColumnDetails}`,"id":`${this.migrationId}`}
        }else if(dataTablesParameters?.order[0]?.column == 3){
          params  = {"page": `${pageNumber }`,"size": pageSize,sort:`interface,${this.sortedColumnDetails}`,"id":`${this.migrationId}`}
        }
        else{
          params = {"page": `${pageNumber }`,"size": pageSize}
        }
          this.searchsub = that.http
          .get<DataTablesResponse>(
            url, { params }
          ).subscribe((resp: any) => {
            this.tableCount = resp?.totalNumberRecords ? resp?.totalNumberRecords : 0;
            //this.rerender()
            this.GetListData = resp?.result ? resp?.result : []

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
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
    });
  }
  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }
  convertDate(date,val?) {
    let date1= date 
    var a = new Date(date1 + '+00:00');
    var tz = this.getLocalTimeZone(a)
    var year = a.getFullYear();
    var month = a.getMonth() + 1
    var dat = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    let Hours = +hour < 10 ? '0' + hour : hour;
    let Minutes = +min < 10 ? '0' + min : min;
    var cDate = `${month}/${dat}/${year} ${Hours}:${Minutes} ${ampm} UTC/${tz}`;
    var cDate1 = `${year}-${month}-${dat}T${Hours}-${Minutes}-${sec}`;
    return val ? cDate1:cDate

  }
  GotoServiceProfile(value) {
    let queryParams = {
      searchkey: value,
      key: 'migartor'
    };
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'], { queryParams: queryParams });
  }
  getLocalTimeZone(time) {
    // var dd = time;
    // var ddStr = dd.toString();
    // var ddArr = ddStr.split(' ');
    // var tmznSTr = ddArr[5];
    // tmznSTr = tmznSTr.substring(0, tmznSTr.length);
    return time.toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');;;
  }
  getSubscriber(value: any) {
    this.loader = true
    let url = `${environment.SUPPORT_URL}/subscriber-search?filter=${value}&pageNumber=1&pageSize=1`
    this.ontInfoSubs = this.http.get(url).subscribe((res: any) => {
      this.deviceInfo = res.records[0];
      this.subscriber = res.records[0]?.subscriberId
      this.gotoSubscriber(value)
      this.loader = false
    }, (err: HttpErrorResponse) => {
      this.loader = false
    })
  }

  gotoSubscriber(value: any) {
    localStorage.setItem("calix.Device_Details", JSON.stringify(this.deviceInfo));
    let queryParams = {
      sn: value,
      subscriber: this.subscriber,
      key: 'migartor'
    };
    this.router.navigate(['/cco-foundation/foundation-systems/foundation-manage/system-details'], { queryParams: queryParams });
  }
  pageErrorHandle(err: HttpErrorResponse) {

    this.error = true;
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }

    //this.closeAlert();

  }
  openUndoMigrationPopup(modal) {
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'undo-migration-modal' });
  };

  openDeleteJobReportPopup(modal) {
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'delete-job-modal' });
  };

  openAbortMigrationPopup(modal) {
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'abort-migration-modal' });
  };
  close(): void {
    this.dialogService.dismissAll();

  }
  DeleteMigration() {
    this.loader = true
    this.service.DeleteMigration(this.migrationId, this.sso.getOrgId(), '').subscribe((res: any) => {
      this.loader = false
      this.success = true
      this.successInfo = res?.message ? res.message : res;
      this.dialogService.dismissAll();
      this.router.navigate(["/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/jobs"])
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
      this.dialogService.dismissAll();
    })
  }
  undoMigration() {
    this.loader = true
    this.service.undoMigration(this.migrationId, this.sso.getOrgId(), '').subscribe((res: any) => {
      this.success = true
      this.successInfo = res?.message ? res.message : res;
      this.dialogService.dismissAll();
      this.getallMigSer(true)
      this.loader = false
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
      this.dialogService.dismissAll();
    })
  }
  AbortMigration() {
    this.loader = true
    this.service.AbortMigration(this.migrationId, this.sso.getOrgId(), '').subscribe((res: any) => {
      this.success = true
      this.successInfo = res?.message ? res.message : res;
      this.loader = false
      this.dialogService.dismissAll();
      this.getallMigSer(true)
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
      this.dialogService.dismissAll();
    })
  }
  startMigration(data?, id?) {
    this.loader = true
    this.service.startMigration(this.migrationId, this.sso.getOrgId(), '').subscribe((res: any) => {
      this.success = true
      this.successInfo = res?.message ? res.message : res;
      this.loader = false
      this.getallMigSer(true)
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
    })
  }
  ExportMigration() {
    this.loader = true;
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/export/${this.migrationId}`
    this.http.get(url, { responseType: 'text', observe: 'response' as 'body' }).subscribe((data: any) => {
      let file=data.headers.get('Content-Disposition').split('=')[1]
      let date =this.GetmigrationStatus?.completionDate && this.GetmigrationStatus?.completionDate!=='-' ? this.convertDate(this.GetmigrationStatus?.completionDate, true):''
    let fileName = `${file.split('.')[0]}_${date}.csv`;
      this.loader = false
      const blob = new Blob([data.body], { type: 'text/csv' })
      saveAs(blob, fileName);
    },
      (err) => {
        console.log(err.headers.get('Content-Disposition'))
        this.loader = false
        this.pageErrorHandle(err);
      })

  }
  Cancel() {
    this.router.navigate(["/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/jobs"])
  }
  setStatusClass(value) {
    let currentClass = '';
    if(value){
      if(value?.toLowerCase() == 'ready to migrate'){currentClass = 'scheduled-but'}
      if(value?.toLowerCase() == 'aborted' || value?.toLowerCase() == 'deleted'){currentClass = 'complete-but'}
      if(value?.toLowerCase() == 'complete'){currentClass = 'running-but'}
      if(value?.toLowerCase() == 'failed'){currentClass = 'error-but'}
      if(value?.toLowerCase() == 'mapping' || value.toLowerCase() == 'migrating' || value.toLowerCase() == 'mapping...' || value.toLowerCase() == 'migrating...' || value.toLowerCase() == 'deleting...'){currentClass = 'draft-but'}
    }

    return currentClass
  }

}
