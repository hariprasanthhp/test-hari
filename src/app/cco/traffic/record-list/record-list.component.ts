import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketService } from '../../shared/services/websocket.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
declare var require: any;
const $: any = require('jquery');

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {

  recordingList: any = [];
  recordData: any = [];
  language: any;
  languageSubject;
  showchart: boolean = false;
  loading: boolean = false;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  renderedOnce: boolean = false;
  errorInfo: string = ""
  error: boolean = false;
  success: boolean = false;
  successInfo: any;
  durations: any = [
    {
      name: 'Last Month',
      value: 'lastMonth'
    },
    {
      name: 'Last 3 Months',
      value: 'last3Months'
    },
    {
      name: 'Older than 3 Months',
      value: 'OlderThan3Months'
    }
  ];
  durationSelected: any = 'lastMonth';
  searchText: any;
  countSubs: any;
  tableCount: number;
  tableCountAvailable: boolean = false;
  ORG_ID: any;
  tableCounts;
  filterCount: any;
  btnDisabled: boolean = false;
  modalRef: any;
  deleteData: any;
  stopRecordData: any
  sortBy: string;
  sortType: string;
  scopes: any;
  showTable: boolean = true;
  isCcoTraffic: boolean = false;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('stopModal', { static: true }) private stopModal: TemplateRef<any>;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private http: HttpClient,
    private commonOrgService: CommonService,
    public dateUtils: DateUtilsService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private websocketservice: WebsocketService,
    private titleService: Title,
    private commonService: CommonFunctionsService
  ) {
    this.titleService.setTitle('Traffic Recording - Traffic - Operations - Calix Cloud');
    this.ORG_ID = this.sso.getOrganizationID(this.router.url);
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.showTable = true;
      setTimeout(() => {
        this.showTable = false;
        this.recordData = []
        this.tableCount = 0;
        this.filterCount = 0;
        this.getTableCount();
      }, 100)
    });
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
  }

  ngOnInit(): void {
    this.commonService.showTabMenu$.next(false);
    // this.commonOrgService.showRecordView$.next(false);
    if (window.location.pathname.indexOf('/cco/record/list') > -1) {
      this.isCcoTraffic = true;
    } else {
      this.commonOrgService.currentPageAdder('flowAnalyze');
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      order: []
    }

    this.scopes = this.sso.getScopes();
    // this.renderTable();
    this.getTableCount()
    this.tableRender();
    this.doSearch();

  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.countSubs) {
      this.countSubs.unsubscribe();
    }
    if (this.recordErrorSubscription) {
      this.recordErrorSubscription.unsubscribe();
    }
    if (this.recordStopSubscription) {
      this.recordStopSubscription.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
    this.commonService.showTabMenu$.next(true);
  }


  performSearch() {
    if (this.searchText.length < 2) {
      return;
    }
    this.searchFilterByDateTime(this.searchText);
    this.loading = true;
    // this.redraw();
    if (this.searchText) {
      this.searchText$.next(this.searchText);
    } else {
      this.searchText$.next("");
    }
  }

  searchByDuration: any;
  searchByDateTime: any;
  searchFilterByDateTime(textEntered: any) {
    if (/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/.test(textEntered) && !/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/.test(textEntered)) {
      let split: any = textEntered.split(':')
      let hour = split[0] * 60 * 60 * 1000
      let min = split[1] * 60 * 1000
      let sec = split[2] * 1000
      this.searchByDuration = hour + min + sec;
    } else {
      this.searchByDuration = null;
    }
    if (/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/.test(textEntered)) {
      let date = new Date(textEntered)
      this.searchByDateTime = (date.getTime()).toString();
      this.searchByDateTime = this.searchByDateTime.slice(0, -3);
      this.searchByDateTime = parseInt(this.searchByDateTime);
    } else {
      this.searchByDateTime = null;
    }
  }

  searchByCharacters(event: any) {
    // console.log("event", event);
    let textEntered: string = $(event.target).val().toString();
    if (textEntered && textEntered.length < 2) {
      return;
    }
    this.searchFilterByDateTime(textEntered);
    if (event.keyCode !== 13) {
      this.loading = true;
    }
    // this.redraw();
    if (textEntered) {
      this.searchText$.next(textEntered);
    } else {
      this.searchText$.next("");
    }
  }


  getTableCount() {
    let url = `${environment.API_BASE_URL}record/job/count?orgId=${this.ORG_ID}&tenentid=0&timeRange=${this.durationSelected}`
    this.countSubs = this.http.get(url).subscribe((data: any) => {
      this.tableCount = data ? data : 0;
      this.tableCountAvailable = true;
      this.showTable = true;
      if (this.renderedOnce) {
        this.redraw();
      } else {
        this.tableRender();
      }
    }, (err: HttpErrorResponse) => {
      this.tableCountAvailable = true;
      this.tableRender();
      this.pageErrorHandle(err);
    })
  }

  getFilterCount(str: string) {
    let url = `${environment.API_BASE_URL}record/job/count?orgId=${this.ORG_ID}&tenentid=0&${str}`
    this.countSubs = this.http.get(url).subscribe((res: number) => {
      this.filterCount = res ? res : 0;
    },
      (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.filterCount = 0;
        } else {
          this.pageErrorHandle(err);
        }
      })
  }


  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  private searchText$ = new Subject<string>();
  doSearch() {
    this.searchText$.pipe(
      debounceTime(500),
      switchMap(textEntered => {
        return new Observable(subsciber => subsciber.next(textEntered));
      })
    ).subscribe((res: any) => {
      this.redraw();
    })
  }


  tableRender() {
    const that = this;
    let url = ``
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      order: [0, 'asc'],
      // stateSave: true,
      columnDefs: [
        { targets: [8],orderable: false }
      ],
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = this.getSortColumn(dataTablesParameters.order[0].column);
        this.sortType = dataTablesParameters.order[0].dir;
        that.loading = true;
        this.showTable = true;
        this.filterCount = undefined;
        let searchValue = this.durationSelected ? "timeRange=" + this.durationSelected : "";
        let searchFilter = this.searchText ? "&filter=" + encodeURIComponent(this.searchText) : "";
        if (this.searchByDuration && this.searchText) {
          searchFilter = "&filter=" + this.searchByDuration;
        }
        if (this.searchByDateTime && this.searchText) {
          searchFilter = "&filter=" + this.searchByDateTime;
        }
        searchValue = searchValue + searchFilter;
        let pageNumber = 0;
        if (dataTablesParameters.start !== 0) {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        if (searchFilter) {
          this.getFilterCount(searchValue);
        }
        url = `${environment.API_BASE_URL}record/job/list?orgId=${this.ORG_ID}&tenentid=0&timeRange=${this.durationSelected}&offset=${pageNumber}&size=${dataTablesParameters.length}${searchFilter}&column=${this.sortBy}&sortingOrder=${this.sortType}`
        that.http
          .get<DataTablesResponse>(
            url
          ).subscribe((resp: any) => {
            that.recordData = resp ? resp : [];
            this.renderedOnce = true;
            // that.recordData = this.sortData(resp ? resp : [], that.sortBy, that.sortType);
            that.recordData = that.checkScopeAccess(that.recordData);
            that.loading = false;
            this.error = false;

            setTimeout(() => {
              callback({
                recordsTotal: that.tableCount ? that.tableCount : 0,
                recordsFiltered: (that.filterCount != undefined) ? that.filterCount : (that.tableCount ? that.tableCount : 0),
                data: []
              });
            }, 1000)

          },
            (err: HttpErrorResponse) => {
              if (err.status == 404) {
                that.recordData = [];
                that.loading = false;
                callback({
                  recordsTotal: that.tableCount ? that.tableCount : 0,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : (that.tableCount ? that.tableCount : 0),
                  data: []
                });
              } else {
                this.pageErrorHandle(err);
              }
            });
      },
      language: this.esTable,
      drawCallback: (Settings) => {
        this.tableLanguageOptions();
      },
    };
    this.tableLanguageOptions();
  }


  changeFilter() {
    this.getTableCount();
    // this.redraw()
  }

  getSortColumn(column: any): any {
    let columnName = "startTime";
    if (column == 0) {
      columnName = "name"
    } else if (column == 1) {
      columnName = "startTime";
    } else if (column == 2) {
      columnName = "length";
    } else if (column == 3) {
      columnName = "status";
    } else if (column == 4) {
      columnName = "monitorType";
    } else if (column == 5) {
      columnName = "trigger";
    } else if (column == 6) {
      columnName = "userName";
    } else if (column == 7) {
      columnName = "description";
    } else if (column == 8) {
      columnName = "name";
    }
    return columnName;
  }


  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.sortByColumn(data, type, 'name');
    } else if (by == 1) {
      sorted = this.sortByColumn(data, type, 'startTime');
    } else if (by == 2) {
      sorted = this.sortByColumn(data, type, 'length');
    } else if (by == 3) {
      sorted = this.sortByColumn(data, type, 'status');
    } else if (by == 4) {
      sorted = this.sortByColumn(data, type, 'monitorType');
    } else if (by == 5) {
      sorted = this.sortByColumn(data, type, 'trigger');
    } else if (by == 6) {
      sorted = this.sortByColumn(data, type, 'userName');
    } else if (by == 7) {
      sorted = this.sortByColumn(data, type, 'description');
    } else if (by == 8) {
      sorted = data;
    }
    return sorted;
  }

  sortByColumn(data, type, column) {
    data.sort((a, b) => {
      var nameA = a[column] ? a[column].toString().toUpperCase() : '';
      var nameB = b[column] ? b[column].toString().toUpperCase() : '';
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

  convertSecondsToTime(seconds: any) {
    // if (seconds >= 3600000) {
    //   return new Date(seconds).toISOString().substr(11, 8);
    // } else {
    //   return new Date(seconds).toISOString().substr(14, 5)
    // }
    return new Date(seconds).toISOString().substr(11, 8);
  }

  goToRecording(item: any) {
    this.router.navigate(['/cco/record'], { queryParams: { id: item.id } });
  }

  stopRecordConfirm(item: any) {
    if (this.modalRef) {
      this.close();
    }
    this.stopRecordData = item;
    this.stopErrorInfo = "";
    this.stopError = false;
    this.modalRef = this.dialogService.open(this.stopModal);
  }

  recordStopSubscription: any;
  recordErrorSubscription: any;
  stopRecording() {
    if (this.recordErrorSubscription) {
      this.recordErrorSubscription.unsubscribe();
    }
    if (this.recordStopSubscription) {
      this.recordStopSubscription.unsubscribe();
    }
    // let orgId = this.sso.getOrgId();
    let url = this.router.url;
    let orgId = this.sso.getOrganizationID(url);
    this.loading = true;
    this.btnDisabled = true;
    let params = {
      "orgId": orgId.toString(),
      "tenentid": '0',
      "recordingId": this.stopRecordData.id
    };
    if (!this.websocketservice.WebSocketServer.isConnected) {
      this.websocketservice.getUnSignedUrl().subscribe((res: any) => {
        this.websocketservice.Checkconnectornot(res.signedurl);
        this.send("STOP_RECORDING", params);
        this.websocketservice.listenRecord("STOP_RECORDING");
        this.websocketservice.listenRecord("error");
      });
    }

    if (this.websocketservice.WebSocketServer.isConnected) {
      this.send("STOP_RECORDING", params);
      this.websocketservice.listenRecord("STOP_RECORDING");
      this.websocketservice.listenRecord("error");
    }

    this.recordStopSubscription = this.websocketservice.stopRecordResponseData$.subscribe((res: string) => {
      this.btnDisabled = false;
      this.loading = false;
      if (res.includes('Successfully')) {
        this.close();
        this.loading = true;
        setTimeout(() => {
          this.getTableCount();
          this.redraw();
        }, 2000);

      }
    }, err => {
      this.btnDisabled = false;
      this.loading = false;
      this.close();
    })


    this.recordErrorSubscription = this.websocketservice.recordErrorResponseData$.subscribe((res: any) => {
      if (res && res.message) {
        // this.close();
        // this.getTableCount();
        // this.redraw();
        this.stopErrorInfo = res.message;
        this.stopError = true;
        this.loading = false;
      }
    })

  }

  stopError: boolean = false;
  stopErrorInfo = ""
  send(eventname, data) {
    this.websocketservice.emit(eventname, data);
  }

  deleteSubs: any;
  deleteRecording() {
    let url = `${environment.API_BASE_URL}record/job/delete?orgId=${this.ORG_ID}&tenentid=0&recordingId=${this.deleteData.id}&monitorType=${this.deleteData.monitorType}&graphType=${this.deleteData.graphType}`;
    this.btnDisabled = true;
    this.deleteSubs = this.http.delete(url).subscribe((res) => {
      this.btnDisabled = false;
      this.successInfo = 'Recording deleted successfully'
      this.success = true;
      this.close()
      this.getTableCount();
      this.redraw();
    }, (err: HttpErrorResponse) => {
      this.btnDisabled = false;
      this.close()
      this.pageErrorHandle(err);
    })
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    this.error = true;
    this.loading = false;


    // if (err.status == 401) {
    //   this.errorInfo = this.language['Access Denied'];
    // } else {
    //   this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    // }
    // this.error = true;
    // this.loading = false;
  }

  goBack() {
    // this.location.back();
    let url = '/cco/traffic/network/realtime';
    if (localStorage.getItem('cco_record_list_history')) {
      url = localStorage.getItem('cco_record_list_history')
    }
    if (url.indexOf('/endpoints/') > -1 || url.indexOf('/endpoint/') > -1) {
      let arr = url.split('?');
      let id = arr[1].split('=')[1];
      this.router.navigate([arr[0]], { queryParams: { id: id } });
      return;
    }
    this.router.navigate([url]);
  }


  deleteConfirmation(item: any) {
    if (this.modalRef) {
      this.close();
    }
    this.deleteData = item;
    this.modalRef = this.dialogService.open(this.deleteModal);
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.btnDisabled = false;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.stopError = false;
  }


  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: this.searchText,
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
      filtered = `${this.searchText ?
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

  checkScopeAccess(data: any) {
    data.forEach(element => {
      element["hasWriteAccess"] = false;
      if (window.location.pathname.indexOf('/cco/record/list') > -1) {
        if ((element.monitorType === 'NET' || element.monitorType === 'EP') && this.scopes && (this.scopes['cloud.rbac.coc.traffic.network.realtime'].indexOf('write') !== -1)) {
          element["hasWriteAccess"] = true;
        }
        if ((element.monitorType === 'LOC' || element.monitorType === 'EP') && this.scopes && (this.scopes['cloud.rbac.coc.traffic.location.realtime'].indexOf('write') !== -1)) {
          element["hasWriteAccess"] = true;
        }
        if ((element.monitorType === 'APP' || element.monitorType === 'EP') && this.scopes && (this.scopes['cloud.rbac.coc.traffic.applications.realtime'].indexOf('write') !== -1)) {
          element["hasWriteAccess"] = true;
        }
      } else {
        element["hasWriteAccess"] = true;
      }
    });
    return data;
  }

  gotoRecordView(data: any) {
    let url = '/cco/record';
    if (!this.isCcoTraffic) {
      url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/record-view' : '/organization-admin/flowAnalyze/record-view';
    }
    this.router.navigate([url], { queryParams: { id: data.id } })
  }

}
