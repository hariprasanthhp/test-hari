import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { HomeChartOptionsService } from 'src/app/cco-foundation/foundation-home/home-chart-options.service';
import * as Highcharts from 'highcharts/highstock';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { FoundationHomeService } from '../foundation-home.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
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
  selector: 'app-subscribers-system-model',
  templateUrl: './subscribers-system-model.component.html',
  styleUrls: ['./subscribers-system-model.component.scss']
})
export class SubscribersSystemModelComponent implements OnInit, OnDestroy {

  Highcharts = Highcharts;
  chartData: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  ORG_ID: any;
  dataAvailable: boolean;
  noData: boolean;
  twolinedata: any;
  threelinedata: boolean;
  fourlinedata: boolean;
  baseHeight: any;
  moreThanOne: boolean;
  filterDays: any = '7';
  nodata: boolean;
  systemModelSub: any;
  ccoKPI: boolean;

  constructor(
    private dataService: DataService,
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
      this.filterDays = this.ccoHomeService.filterDays;
      this.watchFilterDays();
      setTimeout(() => {
        this.loadChart();
      }, 500);

    } else {
      this.filterDays = '7';
      this.loadChart();
    }
  }

  ngOnChanges(): void {
    //this.loadChart();
  }

  loadChart() {
    let chartData = this.dataService.getNetworkAvailabilityData();


    this.loading = true;
    let url = this.router.url;
    let chartName = 'system_by_model';

    if (url.indexOf('/cco/home/system-service-trends') > -1) {
      this.ccoKPI = true;
    } else {
      this.ccoKPI = false;
    }
    this.systemModelSub = this.service.getSubscriberSystemsModel(this.ORG_ID, this.filterDays, this.ccoKPI).subscribe((res: any) => {
      let chartData = res;
      if (res && res.length) {
        this.noData = false;
      } else this.noData = true;
      this.chartData = this.chartDataModify(chartData);
      if (this.chartData?.categories.length === 30) {
        this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number_of_Systems', !this.noData, chartName).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('system-model-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)
        });
      } else {
        this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number_of_Systems', !this.noData, chartName).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('system-model-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)
        });
      }

    }, (err: HttpErrorResponse) => {
      let series = [
        {
          name: '',
          data: []
        },
      ];
      let data = {
        series: series,
        categories: []
      }
      this.chartOptions.getCommonSubscribersChartOptions(data, 'Number_of_Systems', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        this.nodata = true;
        setTimeout(() => {
          this.Highcharts.chart('system-modelno-graph-div', res);
          this.loading = false;
        }, 100)

      });
      this.loading = false;
    });
  }

  chartDataModify(cData) {
    //debugger;
    let seriesName = [];
    if (cData.length) {
      cData.forEach((element: any) => {
        for (let key in element) {
          if (seriesName.indexOf(key) === -1 && key !== 'time') {
            seriesName.push(key);
          }
        }
      });
    }

    let categories = [];
    let data = {};
    cData = this.chartOptions.sortByTimestamp(cData, 'time');
    cData.forEach(val => {
      seriesName.forEach(sn => {
        val[sn] = val[sn] ? val[sn] : 0;
      })
    })
    let seriesData = [], time: string;
    seriesName.forEach(el => {
      var obj: any = {};
      obj.name = el;
      obj.data = [];
      cData.forEach(cd => {
        time = this.dateUtils.getChartFormatDate(cd.time, 'M/d/yy', true);
        if (categories.indexOf(time) === -1) {
          categories.push(time);
        }
        //categories.push(this.dateUtils.getChartFormatDate(cd.time, 'M/d/yy', true));
        for (let type in cd) {
          if (type === el) {
            obj.data.push(cd[type] == undefined ? 0 : cd[type]);
          }
        }
      });
      seriesData.push(obj);
    });

    if (seriesData.length == 0) {
      seriesData.push({
        name: '',
        data: []
      })
      this.noData = true;
    }
    this.baseHeight = '315px';
    if (seriesData.length > 3) {
      let noOfRows = (Math.ceil(seriesData.length / 3)) - 1
      this.baseHeight = `${315 + (noOfRows * 15)}px`;
      this.moreThanOne = true;
      // if (seriesData.length == 6 || seriesData.length < 6) {
      //   this.twolinedata = true;
      // }
      // if (seriesData.length == 9 || seriesData.length < 9) {
      //   this.threelinedata = true;
      // }
      // if (seriesData.length == 12 || seriesData.length < 12) {
      //   this.fourlinedata = true;
      //}

    }

    data = {
      series: seriesData,
      categories: seriesData.length == 0 ? '' : categories
    }
    return data;
  }

  closeAlert() {

  }

  ngOnDestroy(): void {
    if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
    if (this.systemModelSub) this.systemModelSub.unsubscribe();
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
