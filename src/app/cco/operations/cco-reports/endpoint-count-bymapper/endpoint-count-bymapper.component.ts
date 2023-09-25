import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import * as Highcharts from 'highcharts';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/sys-admin/services/common.service';


const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-endpoint-count-bymapper',
  templateUrl: './endpoint-count-bymapper.component.html',
  styleUrls: ['./endpoint-count-bymapper.component.scss']
})
export class EndpointCountBymapperComponent implements OnInit, OnDestroy {

  Highcharts: typeof Highcharts = Highcharts;
  language;
  languageSubject;
  today = new Date();
  fromDate: any;
  toDate: any;
  orgId;
  modalRef: any;
  modalTitle;
  modalInfo;
  error: boolean;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;

  options: Highcharts.Options;
  errorInfo = '';
  mapperCountData;
  showTable: boolean = false;
  loading: boolean = false;

  countData: any;
  runClicked: boolean;
  selectedFromDate: any;
  selectedToDate: any;

  graphDates = [];
  chartOptionsService: any;
  hasScopeAccess = false;
  isCcoReports: boolean = true;

  constructor(private translaterService: TranslateService, private http: HttpClient, private excel: ExportExcelService,
    private dialogService: NgbModal,
    private router: Router,
    private sso: SsoAuthService, private titleService: Title,
    private commonOrgService: CommonService,) { }

  setTitle(url) {
    if (window.location.pathname.indexOf('/cco/operations/') > -1) {
      this.titleService.setTitle(`${this.language['Endpoint Count by Mapper']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.isCcoReports = false;
      this.titleService.setTitle(`${this.language['Endpoint Count by Mapper']} - ${this.language['Reports']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {

    this.fromDate = new Date(this.today.getTime() - (7 * 24 * 60 * 60 * 1000));
    this.toDate = this.today;
    this.selectedFromDate = this.setDateFormate(this.fromDate);
    this.selectedToDate = this.setDateFormate(this.toDate);
    this.language = this.translaterService.defualtLanguage;
    this.languageSubject = this.translaterService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.setTitle(this.router.url)
      if (this.selectedFromDate && this.selectedToDate && this.runClicked) {
        this.onSubmit();
      }
    })
    this.setTitle(this.router.url)
    this.orgId = this.sso.getOrganizationID(this.router.url)

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/operations/') > -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.epcountbymapper') !== -1) {
            this.hasScopeAccess = true;
            break;
          }

        }
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

  }

  setDateFormate(selectedDate) {

    let date = new Date(selectedDate);
    let day = `${date.getDate()}`;
    let month = `${date.getMonth() + 1}`;
    let year = date.getFullYear();

    if (day.length < 2) {
      day = `0${day}`;
    }

    if (month.length < 2) {
      month = `0${month}`;
    }

    let formateDate = `${month}-${day}-${year}`;

    return formateDate;
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  selectFromDate() {
    this.selectedFromDate = this.setDateFormate(this.fromDate);
  }

  selectToDate() {
    this.selectedToDate = this.setDateFormate(this.toDate)
  }

  getMapperCount(fromDate, toDate, orgId) {
    return this.http.get(`${environment.API_BASE_URL}/fa/correlator/flowendpoint/mappercount?endDate=${toDate}&org-id=${orgId}&startDate=${fromDate}`).pipe(
      catchError(this.handleError)
    )
  }

  openModel() {
    this.modalTitle = 'Invalid dates';
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'sm', centered: true, windowClass: 'custom-modal show-info-modal' })
    this.loading = false;
    return;
  }



  onSubmit() {
    this.loading = true;
    if (this.selectedToDate == undefined && this.selectedFromDate == undefined) {
      this.openModel();
    } else if (this.selectedFromDate == undefined) {
      this.openModel();
    } else if (this.selectedToDate == undefined) {
      this.openModel();
    }

    if (this.selectedFromDate && this.selectedToDate) {
      this.runClicked = true;
      this.getMapperCount(this.selectedFromDate, this.selectedToDate, this.orgId).subscribe((data: any) => {
        this.mapperCountData = data;
        this.loadChart(data);
        this.loading = false;
      },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.pageErrorHandle(err);
        });
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.errorInfo = '';
    this.error = true;
    if (err.status == 400) {
      this.loading = false;
    } else {
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.pageScrollTop();
    }
    this.loading = false;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  // calculatedDates(startDate, endDate){
  //   let dates = [],
  //   currentDate = startDate,
  //   addDays = function(days) {
  //   let date = new Date(this.valueOf());
  //       date.setDate(date.getDate() + days);
  //       return date;
  //     };
  //   while (currentDate <= endDate) {
  //   dates.push(currentDate);
  //   currentDate = addDays.call(currentDate, 1);
  //   }	
  //     return dates;
  // }

  getDates(startDate, stopDate1) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(stopDate1);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('MM/DD/YYYY'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }


  loadChartData(res) {
    this.error = false;
    this.loading = true;
    let that = this;
    let rangeOfDates = [];
    let seriesData = [];
    let xAxisNames = [];
    let title = '', subTitle = '';

    let resultDates = this.getDates(new Date(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate()),
      new Date(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate()));

    resultDates.forEach(date => {
      rangeOfDates.push(date);
    })

    res.forEach(element => {
      xAxisNames.push(element.mappedBy);
      let obj = {
        name: element.mappedBy,
        data: [element.count]
      }
      seriesData.push(obj);
    });

    title = this.language['Endpoint Count by Mapper'];
    subTitle = `${this.language.timeWindow} ${rangeOfDates[0]} to ${rangeOfDates[rangeOfDates.length - 1]} [${this.language['Coordinated Universal Time']}]`;

    let options: any = {
      chart: {
        type: 'column'
      }, title: {
        text: title
      },

      subtitle: {
        text: subTitle
      }, xAxis: {
        visible: false
      }, yAxis: {
        min: 0,
        labels: {
          format: '{value}'
        },
        title: {
          text: this.language['Endpoint Count']
        },
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      tooltip: {
        headerFormat: '<span style="font-size:12px"><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0; font-size:12px; font-weight: 400"><b>{series.name} : </b> </td>' +
          '<td style="padding:0; font-size:12px; font-weight: 400" ><b> &nbsp {point.y:1f}</b></td></tr>',
        footerFormat: '</table>',
        useHTML: true,
      },
      plotOptions: {
        series: {
          minPointLength: 3,
          groupPadding: 0,
          pointPadding: 0.1,
          borderWidth: 0,

        }
      },
      series: seriesData,
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF || 'Export PDF',
              onclick: function () {
                this.exportChart({
                  type: 'application/pdf',
                  filename: 'Endpoint_Count_By_Mapper'
                });
              }
            }, {
              textKey: 'downloadCSV',
              text: this.language.exportCsv || 'Export CSV',
              onclick: function () {
                let extraData = `Endpoint Count By Mapper\r\n${that.language.timeWindow} ${rangeOfDates[0]} to ${rangeOfDates[rangeOfDates.length - 1]} [Coordinated Universal Time]\r\n\r\n`;
                let exportData = res ? that.exportDataConvertor(res) : [];
                that.excel.downLoadCSV('Endpoint_Count_By_Mapper', exportData, extraData)
              }
            }],
            text: that.language.export
          }
        }
      },
      credits: {
        enabled: false
      }
    }
    return options;
  }


  loadChart(res) {
    Highcharts.chart('endPointCountMapperChart', this.loadChartData(res));
  }

  exportDataConvertor(array) {
    let exportData = [];
    array.forEach(el => {
      exportData.push({
        'Mapped By': el.mappedBy ? el.mappedBy : '',
        'Count': el.count ? el.count : 0
      });
    });
    return exportData;
  }
  closeAlert() {
    this.error = false;
    this.errorInfo = "";
  }

}
