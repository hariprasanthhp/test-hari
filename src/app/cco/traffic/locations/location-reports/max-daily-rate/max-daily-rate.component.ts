import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { DatePipe } from '@angular/common';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';

@Component({
  selector: 'app-max-daily-rate',
  templateUrl: './max-daily-rate.component.html',
  styleUrls: ['./max-daily-rate.component.scss']
})

export class MaxDailyRateComponent implements OnInit {

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
  dtOptions: DataTables.Settings = {};
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
  columnDefs: any = [];
  csvSubs: any;
  exportData: any;
  startDate: any;

  selectedLocations: string = '';
  emptyData = {
    'Location': '',
    'Subscriber': '',
    'Max Up Rate(Mbps)': '',
    'Max Down Rate(Mbps)': ''
  }
  hasScopeAccess = false;

  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private service: LocationReportApiService,
    private exportExcel: ExportExcelService,
    private chartOptionService: ChartOptionsService
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

    this.renderedOnce = false;
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
    this.closeAlert();
    this.tableLanguageOptions();

    this.columnDefs = [
      { headerName: this.language.location, field: 'location' },
      { headerName: this.language.subscriber, field: 'subscriber' },
      { headerName: this.language['Max Up Rate(Mbps)'], field: 'peakUsRate' },
      { headerName: this.language['Max Down Rate(Mbps)'], field: 'peakDsRate' },
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

  locationNames: any = "";
  loadChartData(data: any) {
    this.error = false;
    this.loading = true;
    this.filters = data;
    this.chartOptionService.btnDisabled = true;
    this.startDate = this.getISODate(this.filters.startDate);
    if (this.filters['locationsSelectedNames']) {
      this.locationNames = "";
      this.filters['locationsSelectedNames'].forEach((element, i) => {
        if (i < 3) {
          this.locationNames += `${i == 0 ? '' : ','} ${element}`;
        }
      });
      if (this.filters['locationsSelectedNames'].length > 3) {
        this.locationNames += `, ...`;
      }
    }
    data.groupBy = 'subscriber';
    this.runClicked = true;
    this.closeAlert();
    this.getData(false);
  }

  getData(rerender?) {
    this.loading = true;
    this.subscribe = this.service.getMaxDailyRate(this.filters).subscribe((res: any) => {
      this.tableData = res ? res : [];
      this.exportData = (this.tableData && this.tableData.length) ? this.tableData.slice(0) : [];
      this.renderTable(rerender);
      this.dataAvailable = true;
      //this.loading = false;
      this.chartOptionService.btnDisabled = false;
    }, (err: HttpErrorResponse) => {
      this.tableData = [];
      this.exportData = [];
      this.loading = false;
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

  downloadCSV(): void {
    // if (this.exportData && this.exportData.length) {
    //   this.doCSVDownload();
    // } else {
    //   this.getAllData(false);
    // }
    this.doCSVDownload();
  }

  doCSVDownload() {
    let pipe = new DatePipe('en-US');
    let timezoneName = 'Coordinated Universal Time';
    let LocationNames = ""
    if (this.filters['locationsSelectedNames']) {
      LocationNames = this.filters['locationsSelectedNames']
    }
    let exportData = this.exportDataConvertor(this.exportData);
    let name = this.filters.type === 'location' ? 'Location_Max_Daily_Rate' : 'Network_Max_Daily_Rate';
    let extraData = `${this.language.network} ${this.language.maxrate}\r\n${this.language.timeWindow} : ${pipe.transform(this.startDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n\r\n`;
    if (this.filters.type === 'location') {
      extraData = `${this.language.location} ${this.language.maxrate}\r\n${this.language.location} : ${LocationNames}\r\n${this.language.timeWindow} : ${pipe.transform(this.startDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.elim} : ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n\r\n`;
    }
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData, extraData);
    } else {
      this.exportExcel.downLoadCSV(name, [{ ...this.emptyData }], extraData);
    }
  }

  downloadPdf(): void {
    // if (this.exportData && this.exportData.length) {
    //   this.doPDFDownload();
    // } else {
    //   this.getAllData(true);
    // }
    this.doPDFDownload();
  }

  doPDFDownload() {
    let data = this.exportData;
    let name = this.filters.type === 'location' ? 'Location_Max_Daily_Rate' : 'Network_Max_Daily_Rate';
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        if (colObj.field == 'peakDsRate' || colObj.field == 'peakUsRate') {
          rowDatum.push(obj[colObj.field] ? this.bytesToMegaBytes(obj[colObj.field]) : obj[colObj.field] == 0 ? "0.000" : "");
        }
        else {
          rowDatum.push(obj[colObj.field] ? obj[colObj.field] : '');
        }

      });
      bodyData.push(rowDatum);
    });

    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text(`${this.filters.type === 'location' ? this.language.location : this.language.network} ${this.language.maxrate}`, (pageWidth / 2) - 30, 10);
    doc.setFontSize(10);
    let header = '';
    if (document.getElementById('criteriaText')) {
      header = document.getElementById('criteriaText').innerText;
    }
    var strArr = doc.splitTextToSize(`${header}`, 280)
    doc.text(strArr, 7, 20);
    let curHeight = 0;
    autoTable(doc, {
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      startY: 30,
      showHead: 'everyPage',
      pageBreak: 'auto',
      theme: 'striped',
      head: [headerArray],
      body: bodyData,
      didDrawPage: data => {
        curHeight = data.cursor.y;
      }
    });
    this.addFooters(doc, curHeight);
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
          'Max Up Rate(bps)': el.peakUsRate ? el.peakUsRate : '0',
          'Max Down Rate(bps)': el.peakDsRate ? el.peakDsRate : '0',
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
    let rs = (bytes / (1000 * 1000)).toFixed(3);
    if (rs === '0.000') {
      rs = (bytes / (1000 * 1000)).toFixed(4)
    }
    return rs;
  }

  getISODate(dt: any): any {
    let d = new Date(dt);
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  addFooters(doc, curHeight) {
    let pageCount = doc.internal.getNumberOfPages();
    curHeight = curHeight + 10;
    if (curHeight >= doc.internal.pageSize.height) {
      pageCount = pageCount + 1;
      doc.addPage();
    }
    doc.setFont('Lato');
    doc.setFontSize(12)
    for (var i = 1; i <= pageCount; i++) {
      if (pageCount == i) {
        doc.setPage(i)
        doc.text('Total Subscribers: ' + String(this.tableData.length), 25, (doc.internal.pageSize.height - 10), {
          align: 'center'
        })
      }
    }
  }
}

