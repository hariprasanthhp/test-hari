import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DatePipe } from '@angular/common';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { Router } from '@angular/router';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';

@Component({
  selector: 'app-active-subscribers',
  templateUrl: './active-subscribers.component.html',
  styleUrls: ['./active-subscribers.component.scss']
})
export class ActiveSubscribersComponent implements OnInit {
  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;

  tableData: any = [];
  dataCount: number | string;
  filterCount: number | string = 0;
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  ORG_ID: any;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  runClicked: boolean;
  dataAvailable: boolean;
  renderedOnce: boolean;
  pdfSubs: any;
  columnDefs: any;
  exportData: any;
  baseUrl = `${environment.CCO_REPORTS_BASE_URL}reports/activesubscribers?`;
  url = "";

  hasScopeAccess = false;

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private locationservice: LocationReportApiService,
    private exportExcel: ExportExcelService,
    private chartOptionService: ChartOptionsService,
    private router: Router
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.customTranslateService.defualtLanguage;
    this.frTable = this.customTranslateService.fr;
    this.esTable = this.customTranslateService.es;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.languageSubs = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loading = true;
      setTimeout(() => {
        if (this.renderedOnce) this.renderTable(true);
      }, 500);
    });
  }

  ngOnInit() {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/traffic/') > -1) {
      if (scopes['cloud.rbac.coc.traffic.network.report']?.indexOf('read') !== -1 || scopes['cloud.rbac.coc.traffic.location.report']?.indexOf('read') !== -1) {
        this.hasScopeAccess = true;
      }
    } else {
      this.hasScopeAccess = true;
    }

    this.renderedOnce = false;
    this.closeAlert();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      order: [],
      paging: true,
      initComplete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 300)
      }
    }
    this.tableLanguageOptions();

    this.columnDefs = [
      { headerName: this.language.location, field: 'location' },
      { headerName: this.language.subscriber, field: 'subscriber' },
      { headerName: this.language.upUsage, field: 'usOctets' },
      { headerName: this.language.downUsage, field: 'dsOctets' },
      { headerName: this.language.totalUsage, field: 'totalOctets' },
      { headerName: this.language.hitCount, field: 'hitCount' }
      // { headerName: this.language.aggregateCount, field: 'aggCount' }
    ];
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubs) {
      this.languageSubs.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
      this.dtTrigger.complete();
    }
  }
  loadChartData(data: any) {
    let orgId = this.sso.getOrganizationID(this.router.url);
    this.error = false;
    this.loading = true;
    this.chartOptionService.btnDisabled = true;
    let loc = data.locationsSelected != undefined ? data.locationsSelected.length : 0;
    let app = data.applicationsSelected != undefined ? data.applicationsSelected.length : 0;
    let minUnresolvedOnly = data.thresholdTypeSelected == 'AllEndpoints' ? 'false' : 'true';
    let eliminateUnknownSelected = data.eliminateUnknownSelected == 'Yes' || data.eliminateUnknownSelected == "yes" ? `&eliminateUnknown=subscriber` : "";
    let location1 = "", application1 = "";
    if (loc > 0 && !data.locationsSelected.includes("All")) {
      data.locationsSelected.forEach(element => {
        location1 = location1 + '&location=' + element;
      });
    }
    if (app > 0 && !data.applicationsSelected.includes("All")) {
      data.applicationsSelected.forEach(element => {
        application1 = application1 + '&application=' + element;
      });
    }

    let startDate: string | Date = new Date(data.startDate);
    let endDate: string | Date = new Date(data.endDate);
    let granularity = '24hour';
    startDate = this.locationservice.getISOStartOfDay(startDate);
    endDate = this.locationservice.getISOEndOfDay(endDate);

    this.url = `${this.baseUrl}org=${orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}${application1}${location1}${eliminateUnknownSelected}&min=${data.threshold}&minUnresolvedOnly=${minUnresolvedOnly}`;

    let eliminateUnknown = '';
    if (data['type'] && data['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      this.url = `${this.url}${eliminateUnknown}`;
    }

    this.filters = data;
    this.runClicked = true;
    this.getdata(false);
  }

  getdata(rerender?) {
    // will change after the original API gets
    let url = `${environment.FA_API_BASE_URL}correlator/flowendpoint/count`;
    this.subscribe = this.http.get(this.url).subscribe((res: any) => {
      if (sessionStorage.getItem('showSensitiveInfo') != 'true' && res) {
        res.forEach(r => r.subscriber = maskString(r.subscriber));
      }
      this.tableData = res ? res : [];
      this.exportData = res;
      this.renderTable(rerender);
      // this.loading = false;
      this.chartOptionService.btnDisabled = false;
    }, (err: HttpErrorResponse) => {
      this.tableData = [];
      this.exportData = [];
      this.renderTable(rerender);
      this.pageErrorHandle(err);
      //this.loading = false;
      this.chartOptionService.btnDisabled = false;
    })
  }

  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (rerender || this.renderedOnce) {
      this.rerender();
      this.dataAvailable = true;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1000)
    } else {
      this.dtTrigger.next();
      this.renderedOnce = true;
      this.dataAvailable = true;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1000)
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  search(term: string) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.customTranslateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  getAllData(pdf) {
    let url = `${environment.FA_API_BASE_URL}correlator/flowendpoint?pagenumber=${0}&pagesize=${this.dataCount}`;
    this.pdfSubs = this.locationservice.getData(this.url).subscribe((data: any) => {
      this.exportData = data ? data : [];
      if (pdf) {
        this.doPDFDownload();
      } else {
        this.doCSVDownload();
      }
    }, (err: HttpErrorResponse) => {
      if (pdf) {
        this.doPDFDownload();
      } else {
        this.doCSVDownload();
      }
      this.pageErrorHandle(err);
    })
  }

  downloadCSV(): void {
    if (this.exportData && this.exportData.length) {
      this.doCSVDownload();
    } else {
      this.getAllData(false);
    }
  }

  doCSVDownload() {
    let pipe = new DatePipe('en-US');
    let timezoneName = 'UTC';
    let exportData = this.exportDataConvertor(this.exportData);
    let name = this.filters.type === 'location' ? 'Location_Active_Subscribers' : 'Network_Active_Subscribers';
    let extraData = `${this.language.network} ${this.language.Active_subscriber}\r\n${this.language.Application} : ${this.filters['applicationsSelectedNames'] ? this.filters['applicationsSelectedNames'] : ""}\r\n${this.language.timeWindow} : ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.treshold} (Bytes): ${this.filters['threshold']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n${this.language.thres} : ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n`;
    if (this.filters.type === 'location') {
      extraData = `${this.language.location} ${this.language.Active_subscriber}\r\n${this.language.location} : ${this.filters['locationsSelectedNames']}\r\n${this.language.Application} : ${this.filters['applicationsSelectedNames'] ? this.filters['applicationsSelectedNames'] : ""}\r\n${this.language.timeWindow} : ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.treshold} (Bytes): ${this.filters['threshold']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n${this.language.thres} : ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n`;
    }
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData, extraData);
    } else {
      this.exportExcel.downLoadCSV(name, [], extraData);
    }
  }

  downloadPdf(): void {
    if (this.exportData && this.exportData.length) {
      this.doPDFDownload();
    } else {
      this.getAllData(true);
    }
  }


  doPDFDownload() {
    let data = this.exportData;
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        if (colObj.field == 'usOctets' || colObj.field == 'dsOctets' || colObj.field == 'totalOctets') {
          rowDatum.push(obj[colObj.field] ? this.convertByteToGB(obj[colObj.field]) : 0);
        }
        else {
          rowDatum.push(obj[colObj.field] ? obj[colObj.field] : (colObj.field === 'hitCount' ? 0 : ''));
        }

      });
      bodyData.push(rowDatum);
    });
    let pipe = new DatePipe('en-US');
    let timezoneName = 'UTC';
    let extraData = `\n${this.language.Application} : ${this.filters['applicationsSelectedNames'] ? this.filters['applicationsSelectedNames'] : ""}\r\n${this.language.timeWindow} : ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.treshold} (Bytes): ${this.filters['threshold']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? "Yes" : "No"}\r\n${this.language.thres} : ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n`;
    if (this.filters.type === 'location') {
      extraData = `\n${this.language.location} : ${this.filters['locationsSelectedNames']}\r\n${this.language.Application} : ${this.filters['applicationsSelectedNames'] ? this.filters['applicationsSelectedNames'] : ""}\r\n${this.language.timeWindow} : ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.treshold} (Bytes): ${this.filters['threshold']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? "Yes" : "No"}\r\n${this.language.thres} : ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n`;
    }
    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text(`${this.filters.type === 'location' ? this.language.location : this.language.network} ${this.language.Active_subscriber}`, (pageWidth / 2) - 30, 10);
    doc.setFontSize(10);
    var strArr = doc.splitTextToSize(`${extraData}`, 280)
    doc.text(strArr, 7, 10);
    //doc.text(document.getElementById('criteriaText').innerText, 5, 20);
    //doc.text(`${extraData}`, 5, 10);
    autoTable(doc, {
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      startY: 50,
      tableWidth: "auto",
      showHead: 'everyPage',
      pageBreak: 'auto',
      theme: 'striped',
      head: [headerArray],
      body: bodyData
    });
    let name = this.filters.type === 'location' ? 'Location_Active_Subscribers' : 'Network_Active_Subscribers';
    doc.save(`${name}.pdf`);
  }

  exportDataConvertor(array) {
    let check = Array.isArray(array);
    let data = [];
    if (check) {
      array.forEach(el => {
        data.push({
          'Location': el.location ? el.location : '',
          'Subscriber': el.subscriber ? el.subscriber : '',
          'Up Usage(GB)': el.usOctets ? this.convertByteToGB(el.usOctets) : 0,
          'Down Usage(GB)': el.dsOctets ? this.convertByteToGB(el.dsOctets) : 0,
          'Total Usage(GB)': el.totalOctets ? this.convertByteToGB(el.totalOctets) : 0,
          'Hit Count': el.hitCount ? el.hitCount : 0
          // 'Aggregate Count': el.aggCount ? el.aggCount : ''
        });
      });
    }
    return data;
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.showError(this.errorInfo);
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  makeIsoDate(value: any): any {
    let a = value.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  convertByteToGB(bytes) {
    if (bytes) {
      return (bytes / Math.pow(1000, 3)).toFixed(5);
    }
    else return "";
  }
}


