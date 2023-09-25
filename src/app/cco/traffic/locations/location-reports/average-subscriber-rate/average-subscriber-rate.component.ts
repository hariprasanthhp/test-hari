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
import * as moment from 'moment';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { Router } from '@angular/router';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';

@Component({
  selector: 'app-average-subscriber-rate',
  templateUrl: './average-subscriber-rate.component.html',
  styleUrls: ['./average-subscriber-rate.component.scss']
})
export class AverageSubscriberRateComponent implements OnInit {

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
  url: string;
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

    this.ORG_ID = this.sso.getOrganizationID(this.router.url);
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
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.report') !== -1) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }

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
      { headerName: this.language['Date'], field: 'startPeriodSec' },
      { headerName: this.language['Avg Up(Mbps)'], field: 'avgUsRate' },
      { headerName: this.language['Avg Down(Mbps)'], field: 'avgDsRate' },
      { headerName: this.language['Max Up(Mbps)'], field: 'peakUsRate' },
      { headerName: this.language['Max Down(Mbps)'], field: 'peakDsRate' },
      { headerName: this.language['Min Up(Mbps)'], field: 'minPeakUsRate' },
      { headerName: this.language['Min Down(Mbps)'], field: 'minPeakDsRate' },
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
    this.error = false;
    this.runClicked = true;
    this.loading = true;
    this.chartOptionService.btnDisabled = true;
    this.filters = data;
    this.getDataCount(false);
  }

  makeIsoDateZero(value: any): any {
    let a = value.split('.');
    let b = a[0].split("T");
    b.pop();
    return b.join(':') + 'T00:00:00Z';
  }

  getDataCount(rerender?) {
    // will change after the original API gets
    let locationParams = '';
    if (this.filters['locationsSelected'] && !this.filters['locationsSelected'].includes("All")) {
      this.filters['locationsSelected'].forEach((element) => {
        locationParams += `&location=${element}`
      });
    }

    //let same = this.locationservice.checkSameDate(this.filters);
    let startDate: string | Date = new Date(this.filters.startDate);
    let endDate: string | Date = new Date(this.filters.endDate);
    // let startDate = moment.utc(new Date(this.filters.startDate))?.toISOString();
    // let endDate = moment.utc(new Date(this.filters.endDate))?.toISOString();
    //let granularity = this.getGranularity(this.filters.startDate, this.filters.endDate);
    //if (same) {
    startDate = this.locationservice.getISOStartOfDay(startDate);
    endDate = this.locationservice.getISOEndOfDay(endDate);

    // else {
    //   startDate = this.locationservice.getStartUTCDate(startDate, false);
    //   endDate = this.locationservice.getISOLocalStartEndDate(endDate, true);
    // }

    this.url = `${environment.CCO_REPORTS_BASE_URL}reports/averagesubscriberrate?org=${this.ORG_ID}&tenant=0&granularity=1hour&startTime=${startDate}&endTime=${endDate}${locationParams}&startHour=${this.filters.startHour}&endHour=${this.filters.endHour}`;
    if (this.filters['eliminateUnknownSelected'] == 'yes') {
      this.url = `${this.url}&eliminateUnknown=subscriber`;
    }
    let eliminateUnknown = '';
    if (this.filters['type'] && this.filters['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      this.url = `${this.url}${eliminateUnknown}`;
    }
    this.subscribe = this.http.get(this.url).subscribe((res: any) => {
      this.tableData = res;
      this.exportData = res;
      this.renderTable(rerender)
      //this.loading = false;
      this.chartOptionService.btnDisabled = false;
      this.exportData = res;
    }, (err: HttpErrorResponse) => {
      this.tableData = [];
      this.exportData = [];
      this.renderTable(rerender)
      this.pageErrorHandle(err);
      // this.loading = false;
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
    // let url = `${environment.FA_API_BASE_URL}correlator/flowendpoint?org-id=${this.sso.getOrgId()}&pagenumber=${0}&pagesize=${this.dataCount}`;
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
    let timezoneName = 'Coordinated Universal Time';
    let exportData = this.exportDataConvertor(this.exportData);
    let name = this.filters.type === 'location' ? 'Location_Average_Subscriber_Rate' : 'Network_Average_Subscriber_Rate';
    let extraData = `${this.language.network} ${this.language.locationMenuAverageSubscriberRate}\r\n${this.language.timeWindow}: ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.start_hour} : ${this.filters['startHour']}\r\n${this.language.end_hour} : ${this.filters['endHour']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n`;
    if (this.filters.type === 'location') {
      extraData = `${this.language.location} ${this.language.locationMenuAverageSubscriberRate}\r\n${this.language.location} : ${this.filters['locationsSelectedNames']}\r\n${this.language.timeWindow}: ${pipe.transform(this.filters.startDate, 'MM/dd/yyyy')} - ${pipe.transform(this.filters.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.start_hour} : ${this.filters['startHour']}\r\n${this.language.end_hour} : ${this.filters['endHour']}\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n`;
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
    let pipe = new DatePipe('en-US');
    let data = this.exportData;
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        if (colObj.field == 'location' || colObj.field == 'subscriber') {
          rowDatum.push(obj[colObj.field] ? obj[colObj.field] : '');
        }
        else if (colObj.field == 'startPeriodSec') {
          let dateconvert = new Date(obj[colObj.field] * 1000)
          rowDatum.push(obj[colObj.field] ? `${pipe.transform(dateconvert, 'MM/dd/yyyy')}` : '');
        }
        else {
          rowDatum.push(obj[colObj.field] ? this.bytesToMegaBytes(obj[colObj.field]) : '0.000');
        }
      });
      bodyData.push(rowDatum);
    });

    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text(`${this.filters.type === 'location' ? this.language.location : this.language.network} ${this.language.locationMenuAverageSubscriberRate}`, (pageWidth / 2) - 30, 10);
    doc.setFontSize(10);
    if (document.getElementById('criteriaText')) {
      doc.text(document.getElementById('criteriaText').innerText, 20, 20);
    }
    autoTable(doc, {
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      startY: 40,
      showHead: 'everyPage',
      pageBreak: 'auto',
      theme: 'striped',
      head: [headerArray],
      body: bodyData
    });
    let name = this.filters.type === 'location' ? 'Location_Average_Subscriber_Rate' : 'Network_Average_Subscriber_Rate';
    doc.save(`${name}.pdf`);
  }

  exportDataConvertor(array) {
    let pipe = new DatePipe('en-US');
    let check = Array.isArray(array);
    let data = [];
    if (check) {
      array.forEach(el => {
        data.push({
          'Location': el.location ? el.location : '',
          'Subscriber': el.subscriber ? el.subscriber : '',
          'Date': el.startPeriodSec ? `${pipe.transform(new Date(el.startPeriodSec * 1000), 'MM/dd/yyyy')}` : '',
          'Avg Up(Mbps)': el.avgUsRate ? this.bytesToMegaBytes(el.avgUsRate) : '0.000',
          'Avg Down(Mbps)': el.avgDsRate ? this.bytesToMegaBytes(el.avgDsRate) : '0.000',
          'Max Up(Mbps)': el.peakUsRate ? this.bytesToMegaBytes(el.peakUsRate) : '0.000',
          'Max Down(Mbps)': el.peakDsRate ? this.bytesToMegaBytes(el.peakDsRate) : '0.000',
          'Min Up(Mbps)': el.minPeakUsRate ? this.bytesToMegaBytes(el.minPeakUsRate) : '0.000',
          'Min Down(Mbps)': el.minPeakDsRate ? this.bytesToMegaBytes(el.minPeakDsRate) : '0.000'
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

  bytesToMegaBytes(bytes) {
    return (bytes / (1000 * 1000)).toFixed(3);
  }

  getGranularity(startDate: any, endDate: any) {
    let granularity = '24hour';
    let diff = moment(endDate).diff(moment(startDate), "day")
    if (diff < 32) {
      granularity = "1hour"
    }
    else {
      granularity = "24hour"
    }

    return granularity;
  }

}


