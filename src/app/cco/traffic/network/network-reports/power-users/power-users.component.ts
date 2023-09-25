import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { NetworkReportApiService } from '../../reports/network-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';

@Component({
  selector: 'app-power-users',
  templateUrl: './power-users.component.html',
  styleUrls: ['./power-users.component.scss']
})

export class PowerUsersComponent implements OnInit {

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
  pdfSubs: any;
  columnDefs: any;
  exportData: any;
  url = '';

  renderedOnce: boolean;
  emptyData = {
    'Subscriber': '',
    'Max Rate(bps)': '',
    'Hit Count': ''
  }
  startEndDates: any = {};
  hasScopeAccess = false;
  timezoneName = 'Coordinated Universal Time';


  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private commonFunctionsService: CommonFunctionsService,
    private exportExcel: ExportExcelService,
    private service: NetworkReportApiService,
    private options: ChartOptionsService
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
      setTimeout(() => {
        //this.redraw();
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
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network.report') !== -1) {
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
      order: []
    }
    this.closeAlert();
    this.tableLanguageOptions();

    this.columnDefs = [
      { headerName: this.language.Subscriber, field: 'name' },
      { headerName: this.language.maxRate + '(bps)', field: 'maxBps' },
      { headerName: this.language.hitCount, field: 'hitCount' },
    ];

  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubs) {
      this.languageSubs.unsubscribe();
    }
  }

  loadChartData(data: any) {
    this.error = false;
    this.filters = data;
    this.runClicked = true;
    this.loading = true;
    this.options.btnDisabled = true;

    this.runClicked = true;
    let period = data.periodSelected ? parseInt(data.periodSelected) : -1;
    this.startEndDates = this.service.getDatePrevMonth(period);
    this.getData(false);
  }

  getData(rerender?) {
    this.timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    this.subscribe = this.service.getPowerUsers(this.filters).subscribe((res: any) => {
      this.tableData = res ? res : [];
      this.exportData = (this.tableData && this.tableData.length) ? this.tableData.slice(0) : [];
      this.renderTable(rerender);
      this.options.btnDisabled = false;
    }, (err: HttpErrorResponse) => {
      this.tableData = [];
      this.exportData = [];
      this.renderTable(rerender);
      this.pageErrorHandle(err);
      this.options.btnDisabled = false;
      //this.loading = false;
    })
  }

  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (rerender || this.renderedOnce) {
      this.rerender();
      this.dataAvailable = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000)
    } else {
      this.dtTrigger.next();
      this.renderedOnce = true;
      this.dataAvailable = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000)
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
    let exportData = this.exportDataConvertor(this.exportData);
    // let name = this.commonFunctionsService.generateExportName('PowerUsers');
    let name = 'Power_Users';
    let date = new Date();
    let lastDate = new Date(date.getFullYear(), date.getMonth(), 0)
    let extraData = `Power Users\r\nDirection : ${this.filters['directionSelected']}\r\n${this.language['Bandwidth']}   : ${this.filters.peakRateFrom ? this.filters.peakRateFrom : ''} Mbps to ${this.filters.peakRateTo ? this.filters.peakRateTo : ''} Mbps\r\n${this.language['time_win']}: ${pipe.transform(this.startEndDates.start, 'MM/dd/yyyy')} - ${pipe.transform(lastDate, 'MM/dd/yyyy')} [${this.timezoneName}]\r\n`;
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
    // let name = this.commonFunctionsService.generateExportName('PowerUsers');
    let name = 'Power_Users';
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        rowDatum.push(obj[colObj.field] ? obj[colObj.field] : '');
      });
      bodyData.push(rowDatum);
    });

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text('Power Users', (pageWidth / 2) - 20, 10);
    doc.setFontSize(10);
    if(document.getElementById('criteriaTextLine1') || document.getElementById('criteriaTextLine2')){
      doc.text(document.getElementById('criteriaTextLine1').innerText, (pageWidth / 2) - 40, 20);
      doc.text(document.getElementById('criteriaTextLine2').innerText, (pageWidth / 2) - 50, 25);
    }
    autoTable(doc, {
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      startY: 30,
      showHead: 'everyPage',
      pageBreak: 'auto',
      theme: 'striped',
      head: [headerArray],
      body: bodyData
    });
    doc.save(`${name}.pdf`);
  }

  exportDataConvertor(array) {
    let check = Array.isArray(array);
    let data = [];
    if (check) {
      array.forEach(el => {
        data.push({
          'Subscriber': el.name ? el.name : '',
          'Max Rate(bps)': el.maxBps ? el.maxBps : '',
          'Hit Count': el.hitCount ? el.hitCount : ''
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

  convertBytes(byte) {
    let num = byte / 1000000;
    return num.toFixed(2);
  }

}


