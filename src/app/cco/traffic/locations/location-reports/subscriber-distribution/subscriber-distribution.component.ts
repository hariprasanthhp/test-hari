import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import html2canvas from 'html2canvas';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { Router } from '@angular/router';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts)

@Component({
  selector: 'app-subscriber-distribution',
  templateUrl: './subscriber-distribution.component.html',
  styleUrls: ['./subscriber-distribution.component.scss']
})
export class SubscriberDistributionComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  Highcharts = Highcharts;
  subDisChartOptions: any;
  chart: any;
  loading: boolean = false;
  filters: any;
  page: any;
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
  url = "";
  obj: any;
  renderOnce: boolean = false;
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
      { headerName: this.language['Total BW'], field: 'strInterval' },
      { headerName: this.language['# of Subs'], field: 'subCount' },
      { headerName: this.language['% of Subs'], field: 'strSubPercent' },
      { headerName: this.language['# of Bytes(GB)'], field: 'totalBytes' },
      { headerName: this.language['% of Bytes'], field: 'strBytePercent' }
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
  directions: any = "";
  loadChartData(data: any) {
    this.error = false;
    this.chartOptionService.btnDisabled = true;

    let value = data.monthSelected.split('-');
    let date = new Date(value[0], parseInt(value[1]) - 1, value[2]);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    let startDate = this.locationservice.getISODate(firstDay);
    let endDate = this.locationservice.getISODate(lastDay);
    this.directions = this.chartOptionService.getSelectDirectionName(data.directionSelected);

    let UnresolvableEndpoints = data['thresholdTypeSelected'] == "StaticEndpoints" ? true : false;
    let eliminateUnknownSelected = data.eliminateUnknownSelected == 'Yes' || data.eliminateUnknownSelected == "yes" ? `&eliminateUnknown=subscriber` : "";
    let locationParams = "";
    if (data.locationsSelected && !data.locationsSelected.includes("All")) {
      data.locationsSelected.forEach(element => {
        locationParams += '&location=' + element;
      });
    }
    if (data['locationsSelectedNames']) {
      this.locationNames = "";
      data['locationsSelectedNames'].forEach((element, i) => {
        if (i < 3) {
          this.locationNames += `${i == 0 ? '' : ','} ${element}`;
        }
      });
      if (data['locationsSelectedNames'].length > 3) {
        this.locationNames += `, ...`;
      }
    }

    let granularity = '1month';
    let threshold = parseInt(data['threshold']) > 0 ? (parseInt(data['threshold']) * 1024) : 0;
    this.url = `${environment.CCO_REPORTS_BASE_URL}/reports/subscriberdistribution?org=${this.ORG_ID}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&direction=${data['directionSelected']}&intervals=<5G,5G-20G,20G-40G,40G-50G,50G-100G,100-250G,>250G&min=${threshold}${eliminateUnknownSelected}&minUnresolvedOnly=${UnresolvableEndpoints}${locationParams}`;

    let eliminateUnknown = '';
    if (data['type'] && data['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      this.url = `${this.url}${eliminateUnknown}`;
    }
    this.filters = data;
    this.runClicked = true;
    this.loading = true;
    this.runClicked = true;
    this.closeAlert();
    this.getData(data, false);
  }

  getData(data: any, rerender?: any) {
    this.subscribe = this.http.get(this.url).subscribe((res: any) => {
      this.data = res;
      this.tableData = res ? res : [];
      this.exportData = (this.tableData && this.tableData.length) ? this.tableData.slice(0) : [];
      this.subDisChartOptions = null;
      if (this.tableData.length > 0) {
        this.subDisChartOptions = this.chartOptionService.subDistributionChartOption(this.data, data);
        if (document.getElementById('subChart-container')) {
          this.Highcharts.chart('subChart-container', this.subDisChartOptions)
        }
      }
      else {
        this.subDisChartOptions = this.chartOptionService.subDistributionChartOption([], data);
        this.Highcharts.chart('subChart-container', this.subDisChartOptions);
      }
      this.renderTable(rerender);
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
    }, (err: HttpErrorResponse) => {
      this.tableData = [];
      this.exportData = [];
      this.subDisChartOptions = this.chartOptionService.subDistributionChartOption([], data);
      if (document.getElementById('subChart-container')) {
        this.Highcharts.chart('subChart-container', this.subDisChartOptions)
      }
      this.renderTable(rerender);
      this.pageErrorHandle(err);
      //this.loading = false;
      this.renderOnce = true;
      this.chartOptionService.btnDisabled = false;
    })
  }

  renderChart() {
    this.subDisChartOptions = null;
    this.subDisChartOptions = this.chartOptionService.subDistributionChartOption(this.data, this.filters);
    if (document.getElementById('subChart-container')) {
      this.Highcharts.chart('subChart-container', this.subDisChartOptions)
    }
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
    let timezoneName = 'Coordinated Universal Time';
    let pipe = new DatePipe('en-US');
    let LocationNames = ""
    if (this.filters['locationsSelectedNames']) {
      LocationNames = this.filters['locationsSelectedNames']
    }
    let exportData = this.exportDataConvertor(this.exportData);
    let name = this.filters.type === 'location' ? 'Location_Subscriber_Distribution' : 'Network_Subscriber_Distribution'
    let extraData = `${this.language.network} ${this.language.subdistribution}\r\n${this.language.Month} : ${pipe.transform(this.filters['monthSelected'], 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.direction} : ${this.directions}\r\n${this.language.treshold} (KB): ${this.filters['threshold']}\r\n${this.language.elim}: ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n${this.language.thres}: ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n\r\n`;
    if (this.filters.type === 'location') {
      extraData = `${this.language.location} ${this.language.subdistribution}\r\n${this.language.location} : ${LocationNames}\r\n${this.language.Month} : ${pipe.transform(this.filters['monthSelected'], 'MM/dd/yyyy')} [${timezoneName}]\r\n${this.language.direction} : ${this.directions}\r\n${this.language.treshold} (KB): ${this.filters['threshold']}\r\n${this.language.elim}: ${this.filters['eliminateUnknownSelected'] === 'yes' ? this.language.Yes : this.language.No}\r\n${this.language.thres}: ${this.filters['thresholdTypeSelected'] === 'AllEndpoints' ? this.language["All Endpoints"] : this.language["Static Endpoints"]}\r\n\r\n`;
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
    this.loading = true;
    let data = this.exportData;
    const bodyData = [], headerArray = this.columnDefs.map(obj => obj.headerName);
    data.forEach(obj => {
      const rowDatum = [];
      this.columnDefs.forEach(colObj => {
        rowDatum.push(obj[colObj.field] ? (colObj.field === "totalBytes" ? this.convertByteToGB(obj[colObj.field]) : obj[colObj.field]) : 0);
      });
      bodyData.push(rowDatum);
    });

    const higherChartData = $('.highcharts-container')[0];
    const width = higherChartData.offsetWidth;
    const height = higherChartData.offsetHeight;
    html2canvas(higherChartData, { width: (width + 200), height: (height + 300), scrollX: 20, scrollY: (window.pageYOffset * -1), scale: 5 }).then(canvas => {
      let contentDataURL = canvas.toDataURL('image/png', 1);
      // console.log("contentDataURL", contentDataURL);
      const doc = new jsPDF("landscape");
      // const doc = new jsPDF("landscape");
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      let curHeight = 0;
      doc.text(`${this.filters.type === 'location' ? this.language.location : this.language.network} ${this.language.subdistribution}`, (pageWidth / 2) - 30, 10);
      doc.setFontSize(10);
      doc.text(document.getElementById('criteriaText').innerText, 20, 20);
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
      // if ((curHeight + 170) > (doc.internal.pageSize.height)) {
      //   doc.addPage();
      //   curHeight = 5;
      // }
      setTimeout(() => {
        // console.log("curHeight", curHeight);
        doc.addImage(contentDataURL, 'PNG', 5, (curHeight + 5), 300, 190);
        let name = this.filters.type === 'location' ? 'Location_Subscriber_Distribution' : 'Network_Subscriber_Distribution'
        doc.save(`${name}.pdf`);
        this.loading = false;
      }, 300)
    });
  }

  exportDataConvertor(array) {
    let check = Array.isArray(array);
    let data = [];
    if (check) {
      array.forEach(el => {
        data.push({
          "Total BW": el.strInterval ? el.strInterval : '',
          "# of Subs": el.subCount ? el.subCount : 0,
          "% of Subs": el.strSubPercent ? el.strSubPercent : '',
          "# of Bytes(GB)": el.totalBytes ? this.convertByteToGB(el.totalBytes) : 0,
          "% of Bytes": el.strBytePercent ? el.strBytePercent : ''
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

  getISODate(dt: any): any {
    let d = new Date(dt);
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    let hr = `${new Date().getUTCHours()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    if (hr.length < 2) {
      hr = `0${hr}`;
    }

    let date = `${year}-${month}-${day}T${hr}:00:00Z`;
    return date;
  }

  convertByteToGB(bytes) {
    if (bytes) {
      return (bytes / Math.pow(1000, 3)).toFixed(2);
    }
    else return "";
  }

}


