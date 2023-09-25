import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import more from 'highcharts/highcharts-more';
import StreamgraphModule from 'highcharts/modules/streamgraph';
more(Highcharts);
StreamgraphModule(Highcharts);
import { TranslateService } from '../../../../app-services/translate.service';
import { HttpClient } from '@angular/common/http';
import { ConvertorService } from '../../../shared/services/convertor.service'
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { StreamService } from '../stream.service';
import { UnitConversionPipe } from 'src/app/cco/shared/pipes/unit-conversion.pipe';
@Component({
  selector: 'app-new-stram-path-chart',
  templateUrl: './new-stram-path-chart.component.html',
  styleUrls: ['./new-stram-path-chart.component.scss']
})
export class NewStramPathChartComponent implements OnInit, OnDestroy {
  conversions = {
    'bps': 1, 'Kbps': 1000, 'Mbps': 1000000, 'Gbps': 1000000000, 'Tbps': 1000000000000,
    'pps': 1, 'Kpps': 1000, 'Mpps': 1000000, 'Gpps': 1000000000, 'Tpps': 1000000000000
  };
  sizes = {
    'bps': 1,
    'Kbps': 1000,
    'Mbps': 1000000,
    'Gbps': 1000000000,
    'Tbps': 1000000000000,
    'pps': 1,
    'Kpps': 1000,
    'Mpps': 1000000,
    'Gpps': 1000000000,
    'Tpps': 1000000000000,
  };
  load = true;
  title = 'myHighchart';
  highcharts = Highcharts;
  streamOptions: any;
  @Input() chartName;
  @Input() yAxixTitle: string = '';
  interval: any;
  interval2: any;
  language: any;
  pageAvailable: boolean = false;
  upStream: string;
  downStream: string;
  originalData: any;
  @Input() data: any;
  @Input() windowLen: any = 5;
  lastData: any = [0, 0];
  currentData: any;
  chartData: any = [0, 0];
  upRate: any;
  downRate: any;
  upRateUnit: any;
  downRateUnit: any;
  lastChartDataObj = {};
  triggerReloadChart = false;
  @Input() time: number;
  @Input() history: any;
  isDownStreamVisible = true;
  isUpStreamVisible = true;
  reloadChart = false;
  ssssData: any;
  unit = '';

  constructor(private customTranslateService: TranslateService, private http: HttpClient, private convertorService: ConvertorService,
    private dateUtilsService: DateUtilsService, public ss: StreamService,
    public UnitConversionPipe: UnitConversionPipe) {
    this.ss.latestValues.subscribe(res => {
      const data: any = res;
      this.ssssData = res;
      if (this.ssssData.upRateData) {
        setTimeout(() => {
          this.unit = this.chartName === 'RATE' ? this.getYAxisUnit(this.ssssData.upRateData[300]) : this.getYAxisUnit(this.ssssData.packetUpData[300]);
        }, 1000 / 60);
        this.buildNewChart();
        if (this.chartName === 'RATE') {
          this.upRate = this.ssssData.upRateData[300];
          this.downRate = this.ssssData.downRateData[300];
        } else {
          this.upRate = this.ssssData.packetUpData[300];
          this.downRate = this.ssssData.packetDownData[300];
        }
      }
    })

  }

  ngOnInit() {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.unit = this.chartName === 'RATE' ? 'Kbps' : 'Kpps';
  }

  toggleDownStream(): void {
    if (this.streamOptions.series[1].visible) {
      this.streamOptions.series[1].visible = false;
      this.isDownStreamVisible = false;
    } else {
      this.streamOptions.series[1].visible = true;
      this.isDownStreamVisible = true;
    }
    this.rebuildData();
  }

  toggleUpStream(): void {
    if (this.streamOptions.series[0].visible) {
      this.streamOptions.series[0].visible = false;
      this.isUpStreamVisible = false;
    } else {
      this.streamOptions.series[0].visible = true;
      this.isUpStreamVisible = true;
    }

    this.rebuildData();
  }

  ngOnDestroy(): void {
    this.streamOptions = {};
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.interval = null;
    this.interval2 = null;
  }

  removeLast3Chars(str: any): any {
    str = str.toString();
    str = str.slice(0, -3);
    str = parseInt(str);
    return str;
  }

  timezoneDetected() {
    var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear());
    var intOffset = 10000;
    var intMonth;
    for (intMonth = 0; intMonth < 12; intMonth++) {
      dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);

      if (intOffset > (dtDate.getTimezoneOffset() * -1)) {
        intOffset = (dtDate.getTimezoneOffset() * -1);
      }
    }
    return intOffset * 60 * 1000;
  }

  rebuildData() {
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    let keys = Object.keys(this.lastChartDataObj);
    let length = keys.length;

    if (length) {
      this.reloadChart = true;
      this.buildNewChart();
    }
  }

  buildNewChart() {
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;
    this.streamOptions = {};
    let timezoneDetected = 0;
    let loadTime = (new Date()).getTime() - 5 * 60000;
    var chartxaxis = {
      type: 'datetime',
      tickPixelInterval: 120,
    }
    var charcredits = {
      enabled: false
    }

    var chartyaxis = {
      gridLineDashStyle: 'longdash',
      opposite: false,
      startOnTick: false,
      endOnTick: false,
      title: {
        text: this.unit,
        margin: 10
      },
      labels: {
        labels: {
          enabled: false
        },
        align: 'left',
        x: -35,
        formatter: function () {
          var temp = that.bitsConversion(this.value);
          return Math.abs(temp);
        }
      }
    }

    let that: any = this;

    this.streamOptions = {
      chart: {
        type: 'areaspline',
        height: 220
      },

      time: {
        useUTC: true
      },

      title: {
        text: ''
      },
      colors: ['#0027FF', '#5ACFEA'],
      xAxis: chartxaxis,
      yAxis: chartyaxis,
      credits: charcredits,
      plotOptions: {
        areaspline: {
          lineWidth: 1,
          marker: {
            enabled: false
          },
          fillOpacity: 0.75
        },
        spline: {
          animation: false,
          marker: {
            enabled: false,
            radius: 0.9,
            lineWidth: 0.7
          }
        }
      },

      tooltip: {
        formatter: function () {
          let dateValue = this.point.x;
          var d = new Date(dateValue);
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
            ${this.series.name}stream: ${that.bitsToSize(this.y)}`;
        }
      },

      legend: {
        enabled: false
      },

      exporting: {
        enabled: false
      },
      series: [
        {
          name: 'Up',
          data: (function () {
            var data = [],
              time = loadTime,
              i;
            for (i = 0; i <= 300; i++) {
              let timeKey = time + i * 1000;
              let key = that.removeLast3Chars(timeKey);
              let value = that.chartName === 'RATE' ? that.ssssData.upRateData[i] : that.ssssData.packetUpData[i];
              if (value) {
                value = value;
              }
              data.push({
                x: timeKey,
                y: value
              });
            }
            return data;
          }())
        }, {
          name: 'Down',
          data: (function () {
            var data = [],
              time = loadTime,
              i;
            for (i = 0; i <= 300; i++) {
              let timeKey = time + i * 1000
              let key = that.removeLast3Chars(timeKey);
              let value = that.chartName === 'RATE' ? that.ssssData.downRateData[i] : that.ssssData.packetDownData[i];
              if (value) {
                value = value;
              }
              value = value * -1;
              data.push({
                x: timeKey,
                y: value
              });
            }
            return data;
          }())
        }],
    }
    this.streamOptions.series[0].visible = this.isUpStreamVisible;
    this.streamOptions.series[1].visible = this.isDownStreamVisible;
    this.streamOptions = Object.assign({}, this.streamOptions);

  }

  bitsToSize(bits: any) {
    let down = false;
    if (bits < 0) {
      bits = -bits;
      down = true;
    }
    let bytes = parseFloat(bits);

    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (bytes == 0 && this.chartName.toLowerCase() === 'rate') return '0 bps';
    if (bytes == 0 && this.chartName.toLowerCase() === 'packet') return '0 pps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    var val = Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizes[i]
    return down ? '-' + val : val;
  }

  bitsConversion(bits: any) {
    let down = false;
    if (bits < 0) {
      bits = -bits;
      down = true;
    }
    let bytes = parseFloat(bits);
    if (bytes == 0) return 0;
    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    var val = parseInt(Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2));
    return down ? -1 * val : val;
  }

  getYAxisUnit(bits: any) {
    if (bits < 0) {
      bits = -bits;
    }
    let bytes = parseFloat(bits);
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    if (bytes == 0 && this.chartName.toLowerCase() === 'rate') return 'bps';
    if (bytes == 0 && this.chartName.toLowerCase() === 'packet') return 'pps';
    return sizes[i];
  }

}
