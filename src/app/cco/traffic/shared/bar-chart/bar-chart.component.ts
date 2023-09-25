import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import customEvents from 'highcharts-custom-events';
customEvents(Highcharts);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  // highCharts = Highcharts;
  barChartOptions: any = {};

  @Input('type') type: any = {};
  @Input('chartOptions') chartOptions: any = {};
  @Input('updateFlag') updateFlag: boolean = true;

  data = [{
    name: 'Downstream',
    data: [107, 31, 635, 203, 2]
  }];

  update: boolean;

  highcharts = Highcharts;

  chart: any;
  // chartOptions = {
  //   chart: {
  //     type: 'bar'
  //   },
  //   title: {
  //     text: "Monthly Site Visitor"
  //   },
  //   xAxis: {
  //     categories: ['Africa', 'America', 'Asia', 'Europe'],
  //     title: {
  //       text: null
  //     }
  //   },
  //   yAxis: {
  //     min: 0,
  //     labels: {
  //       overflow: 'justify'
  //     }
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: this.data
  // };

  constructor() { }

  ngOnInit() {
    this.update = this.updateFlag;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.chartOptions && changes.chartOptions.currentValue) {
      this.barChartOptions = { ...this.chartOptions };
      this.updateFlag = true;
      this.update = true;
    }
  }

  chartCallback(chart: any) { }

}
