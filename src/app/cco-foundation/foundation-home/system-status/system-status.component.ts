import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { HomeChartOptionsService } from 'src/app/cco-foundation/foundation-home/home-chart-options.service'
import * as Highcharts from 'highcharts/highstock';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { FoundationHomeService } from '../foundation-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { Router } from '@angular/router';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);


@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.scss']
})
export class SystemStatusComponent implements OnInit, OnDestroy {
  @Output() private Out_sysStatus: EventEmitter<any> = new EventEmitter();

  Highcharts = Highcharts;
  chartData: any;
  ORG_ID: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  dataAvailable: boolean;
  catelength: number;
  preproval: any;
  activeval: any;
  preprovper: any;
  catelenth: number;
  preprobefore: any;
  activeper: any;
  activebefore: any;
  systemstatus: any;
  unassociate: any;
  unassociatebefore: any;
  unassociateper: any;
  filterDays: any = '7';
  MODULE: string = 'foundation';
  systemStatusSub: any;

  constructor(
    private chartOptions: HomeChartOptionsService,
    private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private service: FoundationHomeService,
    private sso: SsoAuthService,
    private ccoHomeService: CcoHomeService,
    private router: Router
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
  }

  ngOnInit(): void {
    let url = this.router.url;
    if (url.indexOf('/cco/home/system-service-trends') > -1) {
      this.MODULE = 'cco';
      this.filterDays = this.ccoHomeService.filterDays;
      this.watchFilterDays();
      setTimeout(() => {
        this.loadChart();
      }, 500);
    } else {
      this.MODULE = 'foundation';
      this.filterDays = '7';
      this.loadChart();
    }
  }

  ngOnChanges(): void {
    //this.loadChart();
  }

  loadChart() {
    this.dataAvailable = false;
    this.loading = true;
    this.systemStatusSub = this.service.getSystemstatusChartData(this.ORG_ID, this.filterDays).subscribe((res: any) => {
      let chartData = res;
      this.chartData = this.chartDataModify(chartData);
      if (this.chartData?.categories.length === 30) {
        this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          this.dataAvailable = true;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('system-status-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)

        });
      } else {
        this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          this.dataAvailable = true;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('system-status-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)

        });
      }

    }, (err: HttpErrorResponse) => {
      let series = [
        {
          name: this.language['Pre_Provisioned'],
          data: []
        },
        {
          name: this.language['active'],
          data: []
        },
        {
          name: this.language['Not Checked In'],
          data: []
        }
      ];
      let data = {
        series: series,
        categories: []
      }
      this.chartOptions.getCommonSubscribersChartOptions(data, 'Number_of_Systems', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        this.dataAvailable = true;
        setTimeout(() => {
          this.Highcharts.chart('system-status-graph-div', res);
          this.loading = false;
        }, 100)

      });
      this.loading = false;
    });
  }

  chartDataModify(cData) {
    let active = [], preprovision = [], offline = [], series = [], categories = [], unassociate = [];
    let data = {};
    cData = this.chartOptions.sortByTimestamp(cData, 'time');
    cData.forEach(el => {
      categories.push(this.dateUtils.getChartFormatDate(el.time, 'M/d/yy', true))
      let url = this.router.url;
      if (url.indexOf('/cco/home/system-service-trends') > -1) {
        el['active'] = el.rgActive ? el.rgActive : 0;
        el['offline'] = el.rgOffline ? el.rgOffline : 0;
      } else {
        el['active'] = el.active ? el.active : 0;
        el['offline'] = el.offline ? el.offline : 0;
      }

      el['preprovision'] = el.preprovision ? el.preprovision : 0;
      el['unassociate'] = el.unassociate ? el.unassociate : 0;
      active.push(parseInt(el.active));
      preprovision.push(parseInt(el.preprovision));
      offline.push(el.offline);
      unassociate.push(el.unassociate);
    });

    this.catelength = categories.length - 1;
    this.catelenth = categories.length - 2;
    this.preproval = preprovision[this.catelength];
    this.preprobefore = preprovision[this.catelenth]
    this.activeval = active[this.catelength];
    this.activebefore = active[this.catelenth];
    this.unassociate = unassociate[this.catelength];
    this.unassociatebefore = unassociate[this.catelenth]
    if (this.preprobefore === 0 && this.preproval != 0) {
      this.preprovper = (this.preproval * 100).toFixed();
    }
    else {
      this.preprovper = (this.setpercentage(this.preproval, this.preprobefore, 2) == '0.00' ? '0' : this.setpercentage(this.preproval, this.preprobefore, 0));
    }
    if (this.activebefore == 0 && this.activeval != 0) {
      this.activeper = (this.activeval * 100).toFixed();
    }
    else {
      this.activeper = (this.setpercentage(this.activeval, this.activebefore, 2) == '0.00' ? '0' : this.setpercentage(this.activeval, this.activebefore, 0));
    }
    if (this.unassociatebefore == 0 && this.unassociate != 0) {
      this.unassociateper = (this.unassociate * 100).toFixed();
    }
    else {
      this.unassociateper = (this.setpercentage(this.unassociate, this.unassociatebefore, 2) == '0.00' ? '0' : this.setpercentage(this.unassociate, this.unassociatebefore, 0));
    }
    this.systemstatus = {
      preprovision: (this.preproval == undefined ? 0 : this.preproval),
      active: (this.activeval == undefined ? 0 : this.activeval),
      unassociate: (this.unassociate == undefined ? 0 : this.unassociate),
      preprovisionper: Math.abs(this.preprovper == 'NaN' ? 0 : this.preprovper),
      activeper: Math.abs(this.activeper == 'NaN' ? 0 : this.activeper),
      unassociateper: Math.abs(this.unassociateper == 'NaN' ? 0 : this.unassociateper),
      positiveOrNegative: this.checkPositvNegativ(this.preprovper),
      positiveOrNegativeactive: this.checkPositvNegativ(this.activeper),
      positiveOrNegativeunassociate: this.checkPositvNegativ(this.unassociateper),
    }
    this.Out_sysStatus.emit(this.systemstatus);
    if (this.MODULE && this.MODULE == 'cco') {
      this.ccoHomeService.setSystemStatusData(this.systemstatus);
    }

    series = [
      {
        name: this.language['Pre_Provisioned'],
        data: preprovision
      },
      {
        name: this.language['active'],
        data: active
      },
      {
        name: this.language['Not Checked In'],
        data: offline
      }
    ];
    data = {
      series: series,
      categories: categories
    }
    return data;
  }

  setpercentage(a, b, degit?: any) {
    //return ((100 * ((a - b) / ((a + b) / 2))).toFixed(degit ? degit : 0))
    return ((100 * ((a - b) / b)).toFixed(degit ? degit : 2))
  }

  checkPositvNegativ(returnqlickdata) {
    if (returnqlickdata == '0') {
      return '+';
    }
    if (returnqlickdata.charAt(0) == '-')
      return '-';
    else
      return '+';
  }
  closeAlert() {

  }
  ngOnDestroy(): void {

    this.Out_sysStatus.emit(this.systemstatus)
    // this.dataService.setSystemSubscription(this.subscriberForm.value);
    if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
    if (this.systemStatusSub) this.systemStatusSub.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  filterDaysSubscription: any;
  watchFilterDays() {
    this.filterDaysSubscription = this.ccoHomeService.filterDays$.subscribe((value: any) => {
      this.filterDays = value;
      this.loadChart();
    })
  }


}
