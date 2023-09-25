import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ReportsService } from '../reports.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-call-avoidance-report',
  templateUrl: './call-avoidance-report.component.html',
  styleUrls: ['./call-avoidance-report.component.scss']
})
export class CallAvoidanceReportComponent implements OnInit {
  language: any;
  languageSubject;
  isModalError: boolean = false;
  loading: boolean = false;
  modalWarningMessage;
  listitem;
  successmsg: boolean = false;
  error: boolean = false;
  ErrorMsg;
  reporttableshow: boolean = false;
  stopConfirmation(item) {
    //this.modalLoader = false;
    this.modalWarningMessage = ` <h5 style="width:500px; display:inline-block;">
       Do you want to delete this ${item.name} report? <div class="btn-con-sec ch">         
       <div class="btn warn-btn br-26 b-none modalWarningConfirm">Confirm</div>
       <div class="btn warn-btn transparant ml-2 br-26 modalWarningCancel">Cancel</div>
     </div> </h5>
     
    </div>`;

    this.isModalError = true;

    setTimeout(() => {
      document.getElementById("confirmDelete").scrollIntoView
      $(document).off('click', ".modalWarningCancel");
      $(document).on('click', ".modalWarningCancel", () => {
        this.isModalError = false
      });

      $(document).off('click', ".modalWarningConfirm");
      $(document).on('click', ".modalWarningConfirm", () => {
        this.isModalError = false;
        this.deleteReport(item);
      });
    }, 500);

  }

  reportLists: any;
  constructor(private reportService: ReportsService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router,
    private dialogService: NgbModal,
  ) {
    this.reportLists = [];
  }

  ngOnInit(): void {
    /* this.displayWaringMessageModels('deletePopup','list'); */
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    sessionStorage.copyitem = false;
    this.getReports();
    if (history?.state?.isRedirect) {
      this.successmsg = true;
    }

  }
  // this function will get all reports
  getReports = () => {
    const data = {
      orgId: this.sso.getOrgId(),
      type: 'SubscriberReport'
    }
    if (history?.state?.isRedirect) {
      this.loading = true;
      setTimeout(() => {
        this.loadReport(data);
      }, 8000);
    }
    else {
      this.loadReport(data);
    }
  }

  loadReport(data) {
    this.loading = true;
    this.reportService.getCallAvoidanceReport(data).subscribe(
      (res) => {
        this.reportLists = res;
        this.sort(0);
        this.loading = false;
        this.reporttableshow = true;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.ErrorMsg = err.statusText
        this.reporttableshow = false;
      });
  }
  addReport = () => {
    sessionStorage.reportId = "";
    sessionStorage.name = "Add"
    this.router.navigate(['/support/netops-management/reports/add-report']);
  }
  editReport = (data) => {
    sessionStorage.reportId = data._id;
    sessionStorage.copyitem = false;
    sessionStorage.name = "Edit"
    this.router.navigate(['/support/netops-management/reports/add-report']);
  }
  CopyReport = (data) => {
    sessionStorage.reportId = data._id;
    sessionStorage.copyitem = true;
    sessionStorage.name = "Copy"
    this.router.navigate(['/support/netops-management/reports/add-report']);
  }
  reportDetails(data) {
    this.router.navigate(['/support/netops-management/reports/report-details'], { state: { jobid: data._id, name: data.name, description: data.description } });
  }

  deleteReport = (item) => {
    const data = {
      _id: item._id,
      orgId: item.orgId
    }
    this.reportService.deleteReport(data).subscribe(
      (res) => {
        this.getReports();
      },
      (err) => {
      }
    )
  }

  displayWaringMessageModels(deletePopup, list) {
    this.listitem = list;
    // setTimeout(()=>{

    // },1000)
    /*  */
    /* alert('Delete Works! ' + deletePopup + ' ' + list); */
    /* this.dialogService.open(deletePopup, { centered: true }).result.then((result) => {
      
    }, (reason) => {

    }); */

    this.dialogService.open(deletePopup, { centered: true }).result.then((result) => {

    }, (reason) => {

    });

  }
  removeDevice() {
    const data = {
      _id: this.listitem._id,
      orgId: this.listitem.orgId
    }
    this.reportService.deleteReport(data).subscribe(
      (res) => {
        this.getReports();
      },
      (err) => {
        this.error = true;
        this.ErrorMsg = err;
      }
    )
  }

  sort($event) {
    if ($event == 0) {
      this.reportLists.sort((a, b) => {
        return +new Date(a.createTime) - +new Date(b.createTime);
      })
      this.reportLists.reverse();
    }
    if ($event == 3) {
      let a = [];
      let b = [];
      this.reportLists.forEach(obj => {
        if (obj.statistic.lastRun) {
          a.push(obj);
        }
        else
          b.push(obj);
      });
      a.sort((a, b) => {
        return +new Date(a.createTime) - +new Date(b.createTime);
      })
      this.reportLists = [...a, ...b];

    }
    if ($event == 4) {
      let a = [];
      let b = [];
      this.reportLists.forEach(obj => {
        if (obj.statistic.latestResult) {
          if (obj.statistic.latestResult.subscriberCount >= 0) {
            a.push(obj);
          }
          else
            b.push(obj);
        }
        else
          b.push(obj);

      });
      a.sort(function (a, b) {
        return (a.statistic.latestResult.subscriberCount - b.statistic.latestResult.subscriberCount)
      });
      this.reportLists = [...a, ...b];
    }
    if ($event == 2) {

      let a = [];
      let b = [];
      this.reportLists.forEach(obj => {
        if (obj.statistic.runCount >= 0) {
          a.push(obj);
        }
        else
          b.push(obj);
      });
      a.sort(function (a, b) {
        return (a.statistic.runCount - b.statistic.runCount)
      });
      this.reportLists = [...a, ...b];
    }
    if ($event == 1) {
      //this.reportLists.sort();
      this.reportLists.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString()))
    }
    // this.reportLists.sort(function (a, b) {
    //   return (a.statistic.latestResult.subscriberCount - b.statistic.latestResult.subscriberCount);
    // })

    //  this.reportLists= this.reportLists.sort(function(a, b){
    //     if(a.name < b.name) { return -1; }
    //     if(a.name > b.name) { return 1; }
    //     return 0;
    // })
  }
}
