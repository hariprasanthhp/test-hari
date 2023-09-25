import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { LocationReportApiService } from '../../reports/location-report-api.service';
const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts)


@Component({
  selector: 'app-monthly-usage-byservice-category',
  templateUrl: './monthly-usage-byservice-category.component.html',
  styleUrls: ['./monthly-usage-byservice-category.component.scss']
})

export class MonthlyUsageByserviceCategoryComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  monthlyUsageByServiceChartOptions: any;
  chart: any;
  upUsage: string = '';
  downUsage: string = '';
  error: boolean;
  errorInfo: string = '';
  subscribe: any
  data: any;
  languageSubs: any;
  columnDefs;
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dataAvailable: boolean;
  pdfSubs: any;
  exportData: any;
  endDate: any;
  startDate: any;
  renderedOnce: boolean;
  renderOnce: boolean = false;
  hasScopeAccess = false;

  constructor(
    private customTranslateService: CustomTranslateService,
    private locationService: LocationReportApiService,
    public chartOptionService: ChartOptionsService,
    private commonOrgService: CommonService,
    private exportExcel: ExportExcelService,
    private sso: SsoAuthService,
  ) {

    this.language = this.customTranslateService.defualtLanguage;
    this.frTable = this.customTranslateService.fr;
    this.esTable = this.customTranslateService.es;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.languageSubs = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
      setTimeout(() => {
        if (this.renderedOnce) this.renderTable(true);
        if (this.renderOnce) {
          this.renderChart()
        }
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
      pageLength: 10,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      order: [],
      columnDefs: [{ targets: 0, type: 'date' }]
    }
    this.tableLanguageOptions();
    this.renderedOnce = false;
    this.columnDefs = [
      { headerName: 'Month', field: 'startPeriodSec' },
      { headerName: 'Group Name', field: 'key' },
      { headerName: 'Down Usage(GB)', field: 'dsOctets' },
      { headerName: 'Up Usage(GB)', field: 'usOctets' },
      { headerName: 'Total Usage(GB)', field: 'totalOctets' }
    ];
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

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubs) {
      this.languageSubs.unsubscribe();
    }
  }

  makeIsoDateZero(value: any): any {
    let a = value.split('.');
    let b = a[0].split("T");
    b.pop();
    return b.join(':') + 'T00:00:00Z';
  }

  loadChartData(data: any) {
    this.error = false;
    this.filters = data;
    this.chartOptionService.btnDisabled = true;
    let date = new Date(data.endDate);
    this.startDate = new Date(date.getFullYear() - 1, date.getMonth(), 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth(), 0);
    this.loading = true;
    this.monthlyUsageByServiceChartOptions = null;
    let granularity = '1hour';
    data['granularity'] = granularity;

    this.subscribe = this.locationService.getMonthlyUsageByService(data).subscribe((res: any) => {
      this.data = res;
      this.exportData = res;
      this.monthlyUsageByServiceChartOptions = this.chartOptionService.monthlyUsageByServiceChartOptions(res, data);
      if (document.getElementById('container')) {
        this.Highcharts.chart('container', this.monthlyUsageByServiceChartOptions);
      }
      this.renderTable(false);
      this.loading = false;
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
    }, (err: HttpErrorResponse) => {
      this.exportData = [];
      this.monthlyUsageByServiceChartOptions = this.chartOptionService.monthlyUsageByServiceChartOptions([], data);
      if (document.getElementById('container')) {
        this.Highcharts.chart('container', this.monthlyUsageByServiceChartOptions);
      }
      this.pageErrorHandle(err);
      this.renderTable(false);
      this.loading = false;
      this.renderOnce = true;
      this.chartOptionService.btnDisabled = false;
    });
  }

  renderChart() {
    this.monthlyUsageByServiceChartOptions = null;
    this.monthlyUsageByServiceChartOptions = this.chartOptionService.monthlyUsageByServiceChartOptions(this.data, this.filters);
    if (document.getElementById('container')) {
      this.Highcharts.chart('container', this.monthlyUsageByServiceChartOptions);
    }
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

  convertByteToGB(bytes) {
    if (bytes) {
      return (bytes / Math.pow(1000, 3)).toFixed(5);
    }
    else return 0;
  }

  getAllData(pdf) {
    this.pdfSubs = this.locationService.getMonthlyUsageByService(this.filters).subscribe((data: any) => {
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
    if (this.exportData && this.exportData.length > 0) {
      this.doCSVDownload();
    } else {
      this.getAllData(false);
    }
  }

  exportDataConvertor(array) {
    let pipe = new DatePipe('en-US');
    let check = Array.isArray(array);
    let data = [];
    if (check) {
      array.forEach(el => {
        data.push({
          'Month': el.startPeriodSec ? `${this.chartOptionService.getUTCDateFormatFromUTCTime(el.startPeriodSec, true, 'MM/dd/yyyy')}` : '',
          'Group Name': el.key ? el.key : '',
          'Down Usage(GB)': (el.dsOctets && el.dsOctets !== -1) ? this.convertByteToGB(el.dsOctets) : '0',
          'Up Usage(GB)': (el.usOctets && el.usOctets !== -1) ? this.convertByteToGB(el.usOctets) : '0',
          'Total Usage(GB)': (el.totalOctets && el.totalOctets !== -1) ? this.convertByteToGB(el.totalOctets) : '0',
        });
      });
    }
    return data;
  }

  doCSVDownload() {
    let timezoneName = 'Coordinated Universal Time';
    let pipe = new DatePipe('en-US');
    let LocationNames = ""
    if (this.filters['locationsSelectedNames']) {
      LocationNames = this.filters['locationsSelectedNames']
    }
    let direction = "";
    if (this.filters.directionSelected == 'both') {
      direction = this.language['Both(Down+Up)'];
    } else if (this.filters.directionSelected == 'Down') {
      direction = this.language['Down'];
    } else {
      direction = this.language['Up'];
    }
    let exportData = this.exportDataConvertor(this.exportData);
    let name = this.filters.type === 'location' ? 'Location_Monthly_Usage_By_Service_Category' : 'Network_Monthly_Usage_By_Service_Category';
    // let name = this.commonFunctionsService.generateExportName('Monthly_Usage_ByService_Category');
    let date = this.chartOptionService.getMonthlyUsageDates();
    let extraData = `${this.language.network} ${this.language.locationMenuMonthlyUsageByServiceCategory}\r\n${this.language['time_win']}: ${pipe.transform(date.startDate, 'MM/dd/yyyy')} - ${pipe.transform(date.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.direction}: ${this.filters['directionSelected'] ? direction : ''}\r\n`;
    if (this.filters.type === 'location') {
      extraData = `${this.language.location} ${this.language.locationMenuMonthlyUsageByServiceCategory}\r\n${this.language['time_win']}: ${pipe.transform(date.startDate, 'MM/dd/yyyy')} - ${pipe.transform(date.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.location} : ${this.filters['locationsSelectedNames']}\r\n${this.language.direction}: ${this.filters['directionSelected'] ? direction : ''}\r\n`;
    }
    // let extraData = `${this.language.locationMenuMonthlyUsageByServiceCategory}\r\n${this.language.location} : ${LocationNames}\r\n${this.language.Month} : ${pipe.transform(this.filters['monthSelected'], 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.direction} : ${this.filters['directionSelected']}\r\n${this.language.treshold} (KB): ${this.filters['threshold']}\r\n${this.language.aggre}: ${this.filters['aggregateSelected']}\r\n${this.language.elim}: ${this.filters['eliminateUnknownSelected']}\r\n${this.language.thres}: ${this.filters['thresholdTypeSelected']}\r\n\r\n`;
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
    this.loading = true;
    let pipe = new DatePipe('en-US');
    let data = this.exportData;
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        if (colObj.field == 'dsOctets' || colObj.field == 'usOctets' || colObj.field == 'totalOctets') {
          rowDatum.push((obj[colObj.field] && obj[colObj.field] !== -1) ? this.convertByteToGB(obj[colObj.field]) : "0");
        }
        else if (colObj.field == 'startPeriodSec') {

          // let dateconvert = new Date(obj[colObj.field] * 1000)
          rowDatum.push(obj[colObj.field] ? `${this.chartOptionService.getUTCDateFormatFromUTCTime(obj[colObj.field], true, 'MM/dd/yyyy')}` : '');
        }
        else {
          rowDatum.push(obj[colObj.field] ? obj[colObj.field] : '');
        }
      });

      bodyData.push(rowDatum);
    });

    const higherChartData = $('.highcharts-container')[0];
    const width = (higherChartData && higherChartData.offsetWidth) ? higherChartData.offsetWidth : 0;
    const height = (higherChartData && higherChartData.offsetHeight) ? higherChartData.offsetHeight : 0;
    html2canvas(higherChartData, { width: (width + 200), height: (height + 300), scrollX: 20, scrollY: (window.pageYOffset * -1), scale: 4 }).then(canvas => {
      let contentDataURL = canvas.toDataURL('image/png', 1);
      const doc = new jsPDF("landscape");
      doc.addImage(contentDataURL, 'JPEG', 20, 20, 280, 210);
      let curHeight = 0;
      doc.addPage();
      autoTable(doc, {
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        startY: 5,
        showHead: 'everyPage',
        pageBreak: 'auto',
        theme: 'striped',
        head: [headerArray],
        body: bodyData,
        didDrawPage: data => {
          curHeight = data.cursor.y;
        }
      });
      setTimeout(() => {
        // doc.addImage(contentDataURL, 'JPEG', 10, (curHeight + 10), 200, 170);
        let name = this.filters.type === 'location' ? 'Location_Monthly_Usage_By_Service_Category' : 'Network_Monthly_Usage_By_Service_Category';
        doc.save(`${name}.pdf`);
        this.loading = false;
      }, 300)
    });
  }

}

