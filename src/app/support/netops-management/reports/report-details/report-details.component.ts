import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/shared/services/download.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
import { environment } from 'src/environments/environment';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {
  orgId: any;
  loading: boolean;
  reportid;
  summarylist;
  summarylistDetail;
  totalcount: any;
  errorindetail: boolean = false;
  fulldate: any;
  name: any;
  description: any;
  fullDetails: any;
  indetail: boolean = false;
  constructor(private router: Router,
    private reportService: ReportsService,
    public sso: SsoAuthService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.orgId = this.sso.getOrgId();
    if (history?.state?.jobid) {
      this.loading = true;
      this.Summary(history?.state?.jobid)
      this.name = history?.state?.name;
      this.description = history?.state?.description;
    }
  }
  Reportlist() {
    this.router.navigate(['/support/netops-management/reports/call-avoidance-report']);

  }
  Summary(id) {
    this.loading = true;
    this.reportService.getSummary(this.orgId, id).subscribe(
      (res) => {
        this.summarylist = res;
        this.totalcount = this.summarylist.length;
        this.fulldate = this.summarylist[0].endTime;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      });
  }
  SummaryDetail(detail) {
    this.fullDetails = detail;
    let id = detail["jobId"];
    this.fulldate = detail["endTime"];
    this.loading = true;
    this.reportService.getSummaryDetails(this.orgId, id).subscribe(
      (res) => {
        this.summarylistDetail = res;
        this.indetail = true;
        this.loading = false;
      },
      (err) => {
        this.errorindetail = true;
        this.loading = false;
      });

  }

  export() {
    let name = this.generateExportName();
    let relativeUrl = this.fullDetails.result.reportUri;
    this.downloadService.saveToDisk(relativeUrl, name);
  }

  generateExportName() {
    var today = new Date();
    return new Date(today).getTime() + " - Report";
  }

}
