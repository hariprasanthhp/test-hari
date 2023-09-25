import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { AlarmNotificationsTimezoneService } from 'src/app/cco/alarm-notifications/services/alarm-notifications-timezone.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../data.service';
import { NetopsServiceService } from '../netops-management.service';

enum wfState {
  Failed = "Failed",
  InProgress = "In Progress",
  Succeeded = "Succeeded",
  Pending = "Pending",
}
@Component({
  selector: 'app-workflow-status',
  templateUrl: './workflow-status.component.html',
  styleUrls: ['./workflow-status.component.scss']
})
export class WorkflowStatusComponent implements OnInit {


  orgId: number
  language: any;
  showDetails: boolean
  name: string
  workflowId
  workflowhistory
  workflowData
  getExecLogsSubscribe
  getWorkflowByHistSubscribe
  dataAvailable: boolean;
  loading: boolean = true;
  isRerender: boolean = false;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  languageSubject;
  wfCount: number;
  tableOptions: DataTables.Settings = {}
  /*   tableOptions: DataTables.Settings = {
      pagingType: 'full_numbers',
      dom: 't',
      ordering: false,
      paging: false,
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
        }
      }
    }; */
  successPercent
  failPercent
  inprgPercent
  pendingPercent
  totalRec
  tableFilterOptions: DataTables.Settings = {};

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtTrigger: Subject<any> = new Subject();
  detailDataAvailable: boolean;
  completePercent: any;
  count: number;
  excLogVisible: boolean = false;
  selectedWorkFlow: any;
  filter: string = "";
  frTable;
  esTable;
  germanTable;
  tableCounts;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  workflow: any;

  datatableVisible: boolean = false
  isError: boolean;
  isModalError: boolean;
  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private service: DataServiceService,
    private api: NetopsServiceService,
    private router: Router, private http: HttpClient,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private titleService: Title,
    private downloadService: DownloadService

  ) {
    this.orgId = this.sso.getOrgId();
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.name = params.name;
        this.workflowId = params.item
      }
      );
    // this.GetWorkFlowCountHist();
    this.getWorkflowStatus()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      setTimeout(() => {
        this.redraw();
      }, 500);

      this.tableLanguageOptions();
      this.rerender();
      this.newRedraw();

    });
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/')) {
      this.titleService.setTitle('Workflows - Operations  - Netops - Service - Calix Cloud');
    } else if (this.router.url.includes('cco/operations/')) {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle('Workflow - Configuration - Deployment - Calix Cloud');
    }
    this.fetchWorkFlowExcLogs();
  }

  getExcLogsCout(state?: string) {
    this.api.getWorkFlowExcLogsCount(this.orgId, this.workflowId, this.workflowFil.execId, state).subscribe((res: any) => {
      this.count = res.count;
      this.excLogVisible = true;
      this.detailDataAvailable = true;
      this.isRerender = false
      this.rerender()
    })
  }
  fetchWorkFlowExcLogs() {
    this.loading = true;
    const that = this;
    this.tableFilterOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: false,
      dom: "tip",
      responsive: true,
      columnDefs: [
        { targets: [5, 6], orderable: true },
        { type: 'date', targets: [5, 6] }
      ],
      order: [[5, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        let orderBy = encodeURIComponent(JSON.stringify({ "end": -1 }))
        let sortBy = dataTablesParameters.order[0].column;
        let sortType = dataTablesParameters.order[0].dir;
        if (sortBy == 6) {
          if (sortType == "asc") {
            orderBy = encodeURIComponent(JSON.stringify({ "end": 1 }))
          } else {
            orderBy = encodeURIComponent(JSON.stringify({ "end": -1 }))
          }
        } else {
          if (sortType == "asc") {
            orderBy = encodeURIComponent(JSON.stringify({ "start": 1 }))
          } else {
            orderBy = encodeURIComponent(JSON.stringify({ "start": -1 }))
          }
        }
        let params: HttpParams = new HttpParams();
        // params = params.set("orgId", String(this.orgId))
        params = params.set("skip", dataTablesParameters.start)
        params = params.set("limit", dataTablesParameters.length)
        params = params.set("workflowId", this.workflowId);
        params = params.set("execId", this.workflowFil.execId)
        if (this.sso.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        }
        if (this.filter === "Succeeded" || this.filter === 'Failed' || this.filter === 'In Progress' || this.filter === 'Pending') {
          params = params.set("state", this.filter)
        } this.workflowhistory = [];
        that.http.get(environment.SUPPORT_URL + '/netops-wf/workflow-exec-logs?orderby=' + orderBy, { params }).subscribe((res: any[]) => {
          console.log("res=>", res)
          if (res) {
            this.workflowhistory = res;
            this.workflowfilter = this.workflowhistory.filter(e => e.execId === this.workflowFil.execId)
            if (this.filter === "") {
              this.totalRec = this.workflowfilter.length
              this.successPercent = Math.round((this.workflowfilter.filter(e => e.state === "Succeeded").length / this.totalRec) * 100)
              this.failPercent = Math.round((this.workflowfilter.filter(e => e.state === "Failed").length / this.totalRec) * 100)
              this.inprgPercent = Math.round((this.workflowfilter.filter(e => e.state === "In Progress").length / this.totalRec) * 100)
              this.pendingPercent = Math.round((this.workflowfilter.filter(e => e.state === "Pending").length / this.totalRec) * 100)
              this.completePercent = this.successPercent + this.failPercent
            }
            this.setTableOptions();
            if (this.isRerender) {
              this.rerender();
              this.isRerender = false;
            } else {
              this.dtTrigger.next();
              this.loading = false

            }
          }
          callback({
            recordsTotal: this.count,
            recordsFiltered: this.count,
            data: []
          });
        }), error => {
          this.setTableOptions();
          if (this.isRerender) {
            this.rerender();
            this.isRerender = false;
          } else {
            this.dtTrigger.next();
          }
          this.loading = false;
          this.pageErrorHandle(error);
          this.commonOrgService.pageScrollTop();
        }
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
      }
    };
    this.tableLanguageOptions();
  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
  getTimezoneName(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  workflowFil
  go_details(item) {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
      this.dtTrigger = new Subject();
    }
    this.isRerender = false;
    this.showDetails = true;
    this.workflowFil = item
    this.loading = true;
    this.getExcLogsCout();
    this.getWorkflowStatus()
  }

  setTableOptions(type?: string) {
    /*  this.tableFilterOptions = {
       pagingType: 'full_numbers',
       rowId: 'id',
       lengthChange: false,
       pageLength: 20,
       processing: true,
       //searching: false,
       dom: 'tipr',
       columnDefs: [
         { targets: [0,1,2,3,4,5,6], orderable: true }
       ],
       order: [6, 'desc'],
       drawCallback: (settings) => {
         let total = settings.aoData.length;
         let length = settings._iDisplayLength;
         if (total <= length) {
           $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
         }
       }
     }; */

    // this.tableLanguageOptions();
    /*  if (type && type == 'language') {
       console.log('type && type')
       setTimeout(() => {
         this.rerender();
         setTimeout(() => {
           this.detailDataAvailable = true;
           this.loading = false;
         }, 100);
       }, 100);
     } else {
       setTimeout(() => {
         this.detailDataAvailable = true;
         this.loading = false;
       }, 500);
     }
  */
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     this.dtTrigger.next();
  //   });
  // }

  rerender(): void {
    let i = 0;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
        this.dtTrigger.next();
      });
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    }
    else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }
  Refresh() {
    this.loading = true
    this.isRerender = true
    if (this.showDetails) {
      if (this.succeed) {
        this.filter = "Succeeded"
        this.rerender()
        // this.getStatusHistory("Succeeded",this.workflowFil)
      } else if (this.failed) {
        this.filter = "Failed"
        this.rerender()
        // this.getStatusHistory("Failed",this.workflowFil)
      } else if (this.inprogress) {
        this.filter = "In Progress"
        this.rerender()
        // this.getStatusHistory("In Progress",this.workflowFil)
      } else if (this.pending) {
        this.filter = "Pending"
        this.rerender()
        // this.getStatusHistory("Pending",this.workflowFil)
      } else {
        this.filter = ""
        this.getExcLogsCout();
        this.rerender()
        // this.getWorkflowStatus();
        // this.getStatusHistory("",this.workflowFil)
      }

    } else {
      this.getWorkflowStatus()
      this.newRedraw()
    }
  }
  Download() {
    this.isError = false;
    this.isModalError = false;
    let timeZone = this.getTimezoneName();
    let namefile;
    if (this.workflowFil?.execId) {
      this.api.DownloadpartWkflwData(this.orgId, this.workflowId, this.workflowFil.execId, timeZone, this.filter).subscribe(res => {
        if (res != null) {
          this.route.queryParams
            .subscribe(params => {
              namefile = params.name;
            })
          this.downloadService.saveToDiskwkflw(JSON.parse(res)[1].fileName, null, false, namefile);
        } else {
          this.isModalError = true;
        }
        this.isError = false;
      }, err => {
        this.isError = true;
        this.pageErrorHandle(err);
      });
    }
    else {
      this.api.DownloadWholeWkflwData(this.orgId, this.workflowId, timeZone).subscribe(res => {
        if (res != null) {
          this.route.queryParams
            .subscribe(params => {
              namefile = params.name;
            })
          this.downloadService.saveToDiskwkflw(JSON.parse(res)[1].fileName, null, false, namefile);
        } else {
          this.isModalError = true;
        }
        this.isError = false;
      }, err => {
        this.isError = true;
        this.pageErrorHandle(err);
      });
    }
  }
  go_device(item) {
    this.service.performSearch(this.orgId, `device:"${item.serialNumber}"`, 1, 1).subscribe(
      (res: any) => {
        if (res) {
          if (this.router.url.includes('cco-foundation')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: item.serialNumber, subscriber: res.records[0].subscriberId } })
          } else if (this.router.url.includes('/cco/operations')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            localStorage.setItem("calix.Device_Details", JSON.stringify(res?.records[0]));
            this.router.navigate([`/cco/system/cco-subscriber-system/system-details`], { queryParams: { sn: item.serialNumber, subscriber: res.records[0].subscriberId, regId: "" } })
          }
          else {
            let subscriberId = res.records[0].subscriberId
            sessionStorage.setItem('calix.subscriberId', subscriberId);
            sessionStorage.setItem('calix.deviceData', JSON.stringify(res.records[0].devices))
            sessionStorage.setItem('calix.serialNo', item.serialNumber)
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            this.router.navigate(['/support/router'], { state: { serialNumber: item.serialNumber, isRouter: true } })
          }

        }
      },
      err => { }
    );
  }

  getWorkflowStatus() {
    this.loading = true;
    let orgId = this.sso.getOrg(this.orgId)
    this.tableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      ordering: false,
      processing: false,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        console.log('1146');
        const that = this;
        let page = dataTablesParameters.start;
        let size = dataTablesParameters.length;
        forkJoin([
          this.api.GetWorkFlowCountHist(orgId, this.workflowId),
          this.api.GetWorkflowHisyPagination(orgId, this.workflowId, page, size)
        ]).subscribe((res: any) => {
          const [countres, listres] = [res[0], res[1]]
          if (countres) {
            this.wfCount = countres['count'];
            console.log(countres)
          }

          if (listres) {
            console.log(listres)
            listres.forEach((element, i) => {
              element.id = i + 1;
            });
            this.workflowData = listres;
            this.loading = false;
            this.dataAvailable = true;
            this.workflowFil = this.workflowData?.find(workflow => workflow.execId === this.workflowFil?.execId) ?? {}
          }
          callback({
            recordsTotal: (that.wfCount != undefined) ? that.wfCount : 0,
            recordsFiltered: (that.wfCount != undefined) ? that.wfCount : that.wfCount,
            data: []
          });
        })
      },
      // this.getWorkflowByHistSubscribe = this.api.GetWorkflowHisyPagination(this.orgId, this.workflowId, page, size).subscribe((res: any) => {
      //   if (res) {
      //     res.forEach((element, i) => {
      //       element.id = i + 1;
      //     });
      //     this.workflowData = res;
      //     this.loading = false;
      //     this.dataAvailable = true;
      //     this.workflowFil = this.workflowData?.find(workflow => workflow.execId === this.workflowFil?.execId) ?? {}
      //   if (this.workflowFil) {
      //     var workflowFil = this.workflowData?.filter(x => x.execId == this.workflowFil?.execId)[0];
      //     if (workflowFil) {
      //       this.workflowFil = workflowFil;
      //    }
      //   }
      //   else{
      //     var workflowFil = this.workflowData?.filter(x => x.workflowId == this.workflowId);
      //   if (workflowFil) {
      //     this.workflowFil = workflowFil;
      //   }
      // }
      // }
      // callback({
      //   recordsTotal: (that.wfCount != undefined) ? that.wfCount : 0,
      //   recordsFiltered: (that.wfCount != undefined) ? that.wfCount : that.wfCount,
      //   data: []
      // });
      /*  callback({
         recordsTotal: that.wfCount,
         recordsFiltered: that.wfCount,
         data: []
       }); */
      // }, (err: HttpErrorResponse) => {
      //   if (err.status == 404) {

      //     setTimeout(() => {
      //       callback({
      //         recordsTotal: (that.wfCount != undefined) ? that.wfCount : 0,
      //         recordsFiltered: (that.wfCount != undefined) ? that.wfCount : that.wfCount,
      //         data: []
      //       });
      //     }, 100);
      //   } else

      //     this.loading = false;
      //   this.pageErrorHandle(err);
      //   this.commonOrgService.pageScrollTop();
      // }, () => {
      //   //this.loading = false;
      // });
      // },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
        }

      }
    };
  }
  newRedraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  /* getWorkflowStatus() {
   
    // this.getWorkflowByHistSubscribe = this.api.GetWorkflowHisyPagination(this.orgId, this.workflowId, page, Size).subscribe((res: any) => {
    this.getWorkflowByHistSubscribe = this.api.getWorkflowByHist(this.orgId, this.workflowId).subscribe((res: any) => {
      if (res) {
        this.workflowData = res;
        this.loading = false;
        this.dataAvailable = true;
      }
    }, (err: HttpErrorResponse) => {

      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    });
  }
 */
  GetWorkFlowCountHist() {
    this.loading = true
    this.api.GetWorkFlowCountHist(this.orgId, this.workflowId).subscribe((res: any) => {
      this.wfCount = res.count;
      this.datatableVisible = true;
    })
  }
  go_back() {
    this.filter = '';
    this.inprogress = false;
    this.failed = false;
    this.succeed = false;
    this.pending = false;
    this.isRerender = false;
    this.showDetails = false;
    this.detailDataAvailable = false;
    this.GetWorkFlowCountHist()
    this.newRedraw()
  }
  succeed = false
  failed = false
  inprogress = false
  pending = false
  doFilter(filter, workflowFil) {
    this.isRerender = true
    this.workflowFil = workflowFil;
    this.loading = true;
    switch (filter) {
      case "Succeeded": {
        this.succeed = !this.succeed
        this.failed = false
        this.inprogress = false
        this.pending = false
        if (this.succeed) {
          this.filter = "Succeeded"
          this.getExcLogsCout(wfState.Succeeded)
          // this.getStatusHistory("Succeeded",workflowFil)
        }
        else {
          this.filter = ""
          this.getExcLogsCout()
          // this.getStatusHistory("",workflowFil)
        }
        break
      }
      case "Failed": {
        this.failed = !this.failed
        this.succeed = false
        this.inprogress = false
        this.pending = false
        if (this.failed) {
          this.filter = "Failed"
          this.getExcLogsCout(wfState.Failed)
          // this.getStatusHistory("Failed",workflowFil)
        }
        else {
          this.filter = ""
          this.getExcLogsCout()
          // this.getStatusHistory("",workflowFil)
        }
        break
      }
      case "In Progress": {
        this.inprogress = !this.inprogress
        this.failed = false
        this.succeed = false
        this.pending = false
        if (this.inprogress) {
          this.filter = "In Progress"
          this.getExcLogsCout(wfState.InProgress)
          // this.getStatusHistory("In Progress",workflowFil)
        }
        else {
          this.filter = ""
          this.getExcLogsCout()
          //  this.getStatusHistory("",workflowFil)
        }
        break
      }
      case "Pending": {
        this.pending = !this.pending
        this.inprogress = false
        this.failed = false
        this.succeed = false
        if (this.pending) {
          this.filter = "Pending"
          this.getExcLogsCout(wfState.Pending)
          // this.getStatusHistory("Pending",workflowFil)
        }
        else {
          this.filter = ""
          this.getExcLogsCout()
          // this.getStatusHistory("",workflowFil)
        }
        break
      }
    }

  }
  workflowfilter = [];
  getStatusHistory(filter, item) {
    this.loading = true
    this.getExecLogsSubscribe = this.api.getExecLogs(this.orgId, this.workflowId, filter, this.workflowFil.execId).subscribe((res: any) => {
      if (res) {
        this.workflowhistory = res;
        this.workflowfilter = this.workflowhistory.filter(e => e.execId === item.execId)
        if (filter === "") {
          this.totalRec = this.workflowfilter.length
          this.successPercent = Math.round((this.workflowfilter.filter(e => e.state === "Succeeded").length / this.totalRec) * 100)
          this.failPercent = Math.round((this.workflowfilter.filter(e => e.state === "Failed").length / this.totalRec) * 100)
          this.inprgPercent = Math.round((this.workflowfilter.filter(e => e.state === "In Progress").length / this.totalRec) * 100)
          this.pendingPercent = Math.round((this.workflowfilter.filter(e => e.state === "Pending").length / this.totalRec) * 100)
          this.completePercent = this.successPercent + this.failPercent
        }
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
          this.loading = false

        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    });
  }

  // destroyTable() {
  //   // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //   //   dtInstance.destroy();
  //   // });
  // }
  closeWorkflow() {
    this.sso.redirectByUrlForWorkflow(['/support/netops-management/operations/workflows',
      '',
      `./cco-foundation/foundation-configuration/configuration-workflow/workflows`,
      `/cco/operations/configuration/workflows`
    ]);
  }

  // changeTableStatusLanguage(dtObj) {
  //   const nf = new Intl.NumberFormat();
  //   this.tableCounts = {
  //     searchText: dtObj.oPreviousSearch.sSearch.trim(),
  //     total: dtObj._iRecordsTotal,
  //     displayCount: dtObj._iDisplayLength,
  //     displayed: dtObj._iRecordsDisplay,
  //     start: dtObj._iDisplayStart
  //   };
  //   const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
  //     filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
  //       (isFrench ?
  //         `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
  //         `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
  //       ''}`;
  //   const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  //   const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  //   $('div [role="status"]').text(isFrench ?
  //     `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
  //     `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  //   )
  //   $(".first").text(isFrench ? 'Le début' : 'First');
  //   $(".previous").text(isFrench ? 'Précédent' : 'Previous');
  //   $(".next").text(isFrench ? 'Suivant' : 'Next');
  //   $(".last").text(isFrench ? 'Dernière' : 'Last');
  // }
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
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $(`#workflows-status ${dtObj.sTableId || ''} div [role="status"]`).text(isFrench ?
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

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.tableFilterOptions.language = this.frTable;
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
      this.tableFilterOptions.language = this.esTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      this.tableFilterOptions.language = this.germanTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en' && this.tableFilterOptions.language) {
      delete this.tableFilterOptions.language;
    }
    //console.log(this.dtOptions)
  }
  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
function page(orgId: number, workflowId: any, page: any, size: any) {
  throw new Error('Function not implemented.');
}

function Size(orgId: number, workflowId: any, page: (orgId: number, workflowId: any, page: any, size: any) => void, Size: any) {
  throw new Error('Function not implemented.');
}

