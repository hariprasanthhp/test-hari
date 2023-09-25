import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-alarm-groups',
  templateUrl: './cco-alarm-groups.component.html',
  styleUrls: ['./cco-alarm-groups.component.scss'],
})
export class CcoAlarmGroupsComponent implements OnInit {
  language;
  languageSubject;
  searchtext: string;
  dataAvailable: boolean;
  ccoAlarmCategorySubgroupText: any;
  showcloseicon: boolean = false;
  deletedata: any;
  modalInfo: any;
  btnDisabled: boolean;
  errorInfo: string = '';
  renderedOnce: boolean = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  alarmGroupList = [];
  error: boolean;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  loading: boolean;
  pageAvailable: boolean;
  successInfo: any;
  success: boolean;
  cco_entitlement: boolean = false;
  esTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private service: SsoAuthService,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
        this.tableLanguageOptions();
        this.rerender();
        setTimeout(() => {
          if (this.renderedOnce) this.renderTable(true);
        }, 500);
      }
    );
    this.titleService.setTitle('Alarm Category Subgroups - Network Operations - Operations - Operations - Calix Cloud');
  }

  ngOnInit(): void {
    let enttlmnts = this.service.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.cco_entitlement = true;
    }
    this.renderedOnce = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      paging: true,
      processing: false,
      dom: 'tipr',
      // stateSave: true,
      // stateDuration: -1,
      columnDefs: [{ targets: [2], orderable: false, className: 'dt-right' }],
      order: [0, 'asc'],
    };
    if(this.cco_entitlement){
      this.dtOptions['columnDefs'][0]['visible'] = false; 
    }
    this.searchtext = history?.state?.ccoAlarmCategorySubgroupText || '';
    this.tableLanguageOptions();
    this.getAlarmGroupList();
  }

  ngAfterViewInit(): void {
    // this.rerender();
    this.dtTrigger.next();
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.rerender();
      setTimeout(() => {
        this.dataAvailable = true;
        this.renderedOnce = false;
        this.loading = false;
      }, 200)
    } else {
      this.rerender();
      this.dataAvailable = false;
      this.loading = true;
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 200)
    }
    setTimeout(() => {
      if(this.searchtext){
        this.search(this.searchtext);
      }
    }, 200)
    
  }
  // renderTable(rerender?) {
  //   // this.tableLanguageOptions();
  //   if (this.renderedOnce) {
  //     // this.dataAvailable = true;
  //     this.rerender();
  //   } else if (rerender) {
  //     this.rerender();
  //     this.renderedOnce = true;
  //     // this.dataAvailable = true;
  //     this.loading = false;
  //   } else {
  //     this.rerender();
  //     this.renderedOnce = true;
  //     // this.dataAvailable = true;
  //     this.loading = false;
  //   }
  //   setTimeout(() => {
  //     if(this.searchtext){
  //       this.search(this.searchtext);
  //     }
  //   }, 200)
  // }

  rerender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
    });
  }

  closeAlert() {
    this.error = false;
  }
  closeicon(text) {
    this.searchtext = ""
    this.showcloseicon = false
    this.search(this.searchtext);
  }
  search(term: string) {
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns(0).search(term).draw();
    });
  }
  getAlarmGroupList() {
    this.loading = true;
    this.error = false;
    this.errorInfo = undefined;
    this.http.get(`${this.baseUrl}alarmgroups`).subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          this.alarmGroupList = [...res.reverse()];
          this.loading = false;
          this.renderTable(false);
        } else {
          this.alarmGroupList = [];
          this.loading = false;
          this.renderTable(false);
        }
        // if(this.alarmGroupList.every((el) => el.wfLinkedFlag)){
        //   this.dtOptions['columnDefs'][0]['visible'] = false; 
        // }
      },
      (error) => {
        this.error = true;
        this.renderTable(false);
        this.loading = false;
        this.pageErrorHandle(error);
      }
    );
  }

  getAlarmGroupId(alarmGroupId, wfLinkedFlag) {
    let queryParams = { alarmGroupId: alarmGroupId, wfLinkedFlag : wfLinkedFlag };
    this.router.navigateByUrl(`/cco/operations/cco-network-operations/cco-alarm-groups/edit/${alarmGroupId}/${wfLinkedFlag}`, { state: { ccoAlarmCategorySubgroupText: this.searchtext || '' } });
    // this.router.navigate([
    //   `/cco/operations/cco-network-operations/cco-alarm-groups/edit/${alarmGroupId}/${wfLinkedFlag}`,
    // ]);
  }

  deleteGroupAlarmId() {
    let groupAlarmId = this.deletedata['uuid'];
    this.error = false;
    this.errorInfo = undefined;
    this.btnDisabled = true;
    this.loading = true;
    this.http
      .delete(`${this.baseUrl}alarmgroup/${groupAlarmId}`, {
        responseType: 'text',
      })
      .subscribe(
        (res: any) => {
          this.btnDisabled = false;
          // this.loading = false;
          this.success = true;
          this.successInfo = res;
          this.closeModal();
          setTimeout(() => {
            this.success = false;
            this.successInfo = undefined;
            this.getAlarmGroupList();
          }, 3000);
        },
        (error) => {
          this.closeModal();
          this.btnDisabled = false;
          this.error = true;
          this.loading = false;
          this.pageErrorHandle(error);
        }
      );
  }
  delete(list) {
    this.deletedata = list;
    this.modalInfo = this.deletedata['name'];
    // window.scroll(0, 0);
    this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
   });
    // $('html, body').animate({ scrollTop: 0 }, 'slow');
  }
  closeModal(): void {
    this.deletedata = '';
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  goto() {
    this.router.navigateByUrl(`/cco/operations/cco-network-operations/cco-alarm-groups/new`, { state: { ccoAlarmCategorySubgroupText: this.searchtext || '' } });
    // this.router.navigateByUrl(
    //   '/cco/operations/cco-network-operations/cco-alarm-groups/new'
    // );
  }
  avoidInitialSpacing(event : any){
    if(event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault()
    }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }
}
