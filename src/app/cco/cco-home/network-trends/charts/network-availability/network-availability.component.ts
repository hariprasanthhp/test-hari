import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HomeChartOptionsService } from '../../../services/home-chart-options.service';
import * as Highcharts from 'highcharts/highstock';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-network-availability',
  templateUrl: './network-availability.component.html',
  styleUrls: ['./network-availability.component.scss']
})
export class NetworkAvailabilityComponent implements OnInit, OnChanges {
  isDev = false;
  Highcharts = Highcharts;
  chartData: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  @Input() data: any;
  @Input() chsttype: any;



  constructor(
    private dataService: DataService,
    private chartOptions: HomeChartOptionsService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
  }

  ngOnInit(): void {
    if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
      this.isDev = true;
    }
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.data) {
      this.loadChart();
    }

  }

  loadChart() {
    // if (this.isDev) {
    //   this.chartDataOptions = this.chartOptions.getBarOptions(this.data, this.language['Number of PON ports'], true);
    // } else {
    //   this.chartDataOptions = this.chartOptions.getOptions(this.data, this.language['Number of PON ports'], true);
    // }
    this.chartDataOptions = this.chartOptions.getBarOptions(this.data, this.language['Number of PON ports'], true);

    if (this.chsttype === 'fullscreen') {
      setTimeout(() => {
        this.Highcharts.chart('network-availability1', this.chartDataOptions);
        this.loading = false;
      }, 100)
    } else {
      setTimeout(() => {
        this.Highcharts.chart('network-availability', this.chartDataOptions);
        this.loading = false;
      }, 1000)
    }


  }

  closeAlert() {

  }

}
