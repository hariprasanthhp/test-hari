import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';


@Component({
  selector: 'ngx-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

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
    // //console.log(this.chartOptions);
    // //console.log(this.updateFlag);

    //this.barChartOptions = { ...this.chartOptions };
    this.update = this.updateFlag;

  }

  ngOnChanges(changes: SimpleChanges) {

    ////console.log(changes.windowLen);

    if (changes.chartOptions && changes.chartOptions.currentValue) {
      this.barChartOptions = { ...this.chartOptions };
      this.updateFlag = true;
      this.update = true;
      ////console.log('new bar chart window called');
    }

  }

  chartCallback(chart: any) { // on complete
    //chart.redraw();

    //this.chart = chart;

  }

}
