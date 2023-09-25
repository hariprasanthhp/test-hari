import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ApiUsageService } from '../services/api-usage.service';
import { CommonService } from '../services/common.service';
import * as Highcharts from 'highcharts/highstock';
import * as _ from 'lodash';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-api-usage',
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.scss'],
})
export class ApiUsageComponent implements OnInit {
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  language: any;
  languageSubject: any;
  orgApiStatus = [];

  public month = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  apiUsageData: any;

  apiUsageOptions: DataTables.Settings =  {
      paging: false,
      info: false,
      lengthChange: false,
      ordering: false,
      searching: false,
      dom: 'tipr',
      retrieve: false,
  };
  loading: boolean = false;
  modalRef: any;


  ORG_ID: string;
  infoTitle: string;
  infoBody: string;
  Highcharts = Highcharts;
  public currentMonthData: any;
  public tableData: any[] = [];
  orgUsageStatusSub: any;
  apiUsageSub: any;
  MODULE:any
  constructor(
    private translateService: TranslateService,
    private apiUsageService: ApiUsageService,
    private router: Router,
    private sso: SsoAuthService,
    private titleService: Title,
    private dialogService: NgbModal,
    private dateUtils: DateUtilsService,
    private commonOrgService: CommonService) {
    const url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.currentPageAdder('api-usage');

  }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data) => {
      this.language = data;
      this.getApiUsageQuota();
      //this.getOrgUsageStatus();
      this.getData();
      this.setTableOptions('language');
      this.titleService.setTitle(`${this.language['API Usage']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['API Usage']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.getData();
    this.getApiUsageQuota();
    this.tableLanguageOptions();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  getApiUsageQuota() {
    this.loading = true;
    this.apiUsageSub = this.apiUsageService.getaApiQuotaDetails(this.ORG_ID).subscribe(
      (res: any) => {
        if (res) {
          this.apiUsageData = res;
          if (this.apiUsageData.allowed_count) {
            this.apiUsageData.allowed_count = (Math.round(this.apiUsageData.allowed_count * 100) / 100).toLocaleString()
          }
        }
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.pageErrorHandle(error);
      }
    );
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
    if(this.orgUsageStatusSub){
      this.orgUsageStatusSub.unsubscribe();
    }
    if(this.apiUsageSub){
      this.apiUsageSub.unsubscribe();
    }
 }

  setTableOptions(type?: string) {
    this.tableLanguageOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        this.rerender();
      }, 200);
    } else {
      this.loading = false;
    }
  }

  private tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.apiUsageOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.apiUsageOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.apiUsageOptions.language = this.translateService.de_DE;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.apiUsageOptions.language
    ) {
      delete this.apiUsageOptions.language;
    }
  }

  makeOptionsForLineChart(): any {
    let apiCalls = this.language['API Calls'];
    let that = this;
    let categories = [];
    let dailyCount = [];
    let pipe = new DatePipe('en-US');
    for (let index = 0; index < that.tableData.length; index++) {
      if (moment().format('MM/yyyy') == that.tableData[index].month) {
        that.currentMonthData = that.tableData[index];
        break;
      } else if (moment().subtract(1, 'month').format('MM/yyyy') == that.tableData[index].month) {
          that.currentMonthData = that.tableData[index];
      }
    }
    for (let index = 0; index < that.currentMonthData?.dailyCount.split(',').length; index++) {
      dailyCount.push(Number(that.currentMonthData?.dailyCount.split(',')[index]))
      categories.push(pipe.transform(new Date(Number(that.currentMonthData.month.split('/')[1]), Number(that.currentMonthData.month.split('/')[0] - 1), index + 1), 'MMM, dd'))
    }
    let options: any = {
      chart: {
        type: 'line',
        zoomType: 'xy',
      },
      time: {
        useUTC: false,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      mapNavigation: {
        enableMouseWheelZoom: true,
      },
      tooltip: {
        formatter: function () {
          var y = `<b>${this.x}</b><br><b>${that.language['API Calls']}: ${(Math.round(this.y * 100) / 100).toLocaleString()}</b>`
          return y
        }
      },
      xAxis: {
        categories: categories ? categories : [],
        tickInterval: 1,
        labels: {
          allowOverlap: false,
          maxStaggerLines: 1,
        },
      },
      yAxis: {
        title: {
          text: this.language['Daily API Calls'],
        },
        min: 0,
        minRange: 1,
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolRadius: 0,
      },
      lang: {
        noData: this.language['No Data Available'],
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
          },
        }
      },
      series: [
        {
          showInLegend: false,
          name: apiCalls,
          color: '#0027FF',
          data: dailyCount ? dailyCount : [],
        },
      ],
      credits: {
        enabled: false,
      },
    };

    return options;
  }

  pageErrorHandle(err: HttpErrorResponse, widget?) {
    let errorInfo = '';
    this.infoTitle = 'Error';
    if (err.status == 400) {
      this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoTitle = this.language['Invalid request'];
      this.openInfoModal();
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }
  }

  getData() {
    this.loading = true;
    this.orgUsageStatusSub = this.apiUsageService.getOrgUsageStatus(this.ORG_ID).subscribe((res: any) => {
      let mdata = [];
      if (res && res?.length && res?.length >= 6) {
        res.forEach(e => {
          let arr = e.month.split('/');
          e.m = arr[0]
          e.y = arr[1]
        })
        res = _.orderBy(res, ['y', 'm'] )
        this.tableData = res;
      } else if (res && res?.length && res?.length < 6) {
        let yearData = this.currentAndLastYearData(res);
        let lastDateStr = yearData.lastYearData[yearData.lastYearData.length - 1]?.month?.replace('/', '/01/');
        mdata = this.generateMissingDates(lastDateStr, res.length);
        this.tableData = [...yearData.lastYearData, ...mdata];
        this.tableData.reverse();
        yearData.currentYearData.reverse();
        this.tableData = [...this.tableData, ...yearData.currentYearData]
      } else {
        let dateStr = this.dateUtils.getFirstDayDateStr();
        this.tableData = this.generateMissingDates(dateStr, 0);
      }
      this.tableData.forEach(data => {
        data.count = (Math.round(data.count * 100) / 100).toLocaleString()
      })
      this.rerender();
      let option = this.makeOptionsForLineChart();
      this.Highcharts.chart('container', option);
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.pageErrorHandle(error);

    })
  }

  generateMissingDates(lastDateStr, valueTOSubtract) {
    let mdata = [];
    if (!valueTOSubtract) {
      let month = `${lastDateStr?.split('/')?.[0]}/${lastDateStr?.split('/')?.[2]}`;
      mdata.push({
        month: `${month}`,
        count: 0,
        dailyCount: ''
      });
    }
    for (let i = 1; i <= (6 - valueTOSubtract); i++) {
      let lastDate = new Date(lastDateStr);
      lastDate.setMonth(lastDate.getMonth() - i);
      let month = '' + (lastDate.getMonth() + 1);
      if (month.length < 2) {
        month = '0' + month;
      }
      mdata.push({
        month: `${month}/${lastDate.getFullYear()}`,
        count: 0,
        dailyCount: ''
      });
    }

    if (!valueTOSubtract) {
      mdata.pop();
      const b = mdata.shift();
      mdata.push(b);
    }
    return mdata;

  }

  currentAndLastYearData(res) {
    let years = []
    let lastYearData = []
    let currentYearData = []
    res.forEach((e) => {
        years.push(Number(e.month.split('/')[1]));        
        if (e.month.split('/')[1] == Math.min.apply(null, years)) {
          lastYearData.push(e);
        } else {
          currentYearData.push(e);
        }
      });

      return {lastYearData: lastYearData, currentYearData: currentYearData};
  }

}
