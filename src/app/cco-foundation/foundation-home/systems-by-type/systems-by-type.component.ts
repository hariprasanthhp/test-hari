import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { HomeChartOptionsService } from 'src/app/cco-foundation/foundation-home/home-chart-options.service'
import * as Highcharts from 'highcharts/highstock';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { FoundationManageService } from '../../foundation-systems/foundation-manage/foundation-manage.service';
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
  selector: 'app-systems-by-type',
  templateUrl: './systems-by-type.component.html',
  styleUrls: ['./systems-by-type.component.scss']
})
export class SystemsByTypeComponent implements OnInit, OnDestroy {

  Highcharts = Highcharts;
  chartData: any;
  ORG_ID: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  filterDays: any = '7';
  rgText = 'RG';
  wapText = 'Mesh(SAT)';
  systemByTypesub: any;

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
      this.rgText = this.language.RG;
      this.wapText = this.language.cco_mesh_sat;
      this.loadChart();
    });
  }

  ngOnInit(): void {
    if (this.language.fileLanguage == 'fr') {
      this.rgText = 'Passerelle résidentielle';
      this.wapText = 'Maillon';
    }
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

  ngOnDestroy(): void {
    if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
    if (this.systemByTypesub) this.systemByTypesub.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  loadChart() {
    this.systemByTypesub = this.service.getSystemTypeChartData(this.ORG_ID, this.filterDays).subscribe((res: any) => {
      let chartData = res;
      this.chartData = this.chartDataModify(chartData);
      if (this.chartData?.categories.length === 30) {
        this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('systems-by-type-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)

        });
      } else {
        this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('systems-by-type-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)

        });
      }

    }, (err: HttpErrorResponse) => {
      let series = [
        {
          name: this.rgText,
          data: []
        },
        {
          name: this.wapText,
          data: []
        },
      ];
      let data = {
        series: series,
        categories: []
      }
      this.chartOptions.getCommonSubscribersChartOptions(data, 'Number_of_Systems', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        setTimeout(() => {
          this.Highcharts.chart('systems-by-type-graph-div', res);
          this.loading = false;
        }, 100)

      });
      this.loading = false;
    });
  }

  chartDataModify(cData) {
    let RG = [], Mesh = [], series = [], categories = [];
    let data = {};
    cData = this.chartOptions.sortByTimestamp(cData, 'time');
    cData.forEach(el => {
      categories.push(this.dateUtils.getChartFormatDate(el.time, 'M/d/yy', true))
      // el.outage = el.outage > 10000 ? el.outage / 100 : el.outage;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      let url = this.router.url;
      if (url.indexOf('/cco/home/system-service-trends') > -1) {
        el['ExosRG'] = el.RG ? el.RG : 0;
        el['ExosWAP'] = el.WAP ? el.WAP : 0;
      } else {
        el['ExosRG'] = el.ExosRG ? el.ExosRG : 0;
        el['ExosWAP'] = el.ExosWAP ? el.ExosWAP : 0;
      }

      RG.push(parseInt(el.ExosRG));
      Mesh.push(parseInt(el.ExosWAP));
    });


    series = [
      {
        name: this.rgText,
        data: RG
      },
      {
        name: this.wapText,
        data: Mesh
      },

    ];
    data = {
      series: series,
      categories: categories
    }
    return data;
  }

  closeAlert() {

  }

  filterDaysSubscription: any;
  watchFilterDays() {
    this.filterDaysSubscription = this.ccoHomeService.filterDays$.subscribe((value: any) => {
      this.filterDays = value;
      this.loadChart();
    })
  }

}
