import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import more from 'highcharts/highcharts-more';
import StreamgraphModule from 'highcharts/modules/streamgraph';
more(Highcharts);
StreamgraphModule(Highcharts);

import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';

@Component({
  selector: 'app-record-stream-chart',
  templateUrl: './record-stream-chart.component.html',
  styleUrls: ['./record-stream-chart.component.scss']
})
export class RecordStreamChartComponent implements OnInit {

  _play: any;
  _reload: any;

  @Input() startTime: any;
  @Input() endTime: any;
  @Input() totalTime: any;
  @Input() playedTime: any;
  @Input()
  set play(value) {
    this._play = value;
    if (value) {
      this.buildNewChart();
    }
  }

  get play() {
    return this._play;
  }

  @Input()
  set reload(value) {
    this._reload = value;
    if (value) {
      this.buildNewChart();
    }

  }

  get reload() {
    return this._reload;
  }

  load = true;
  title = 'myHighchart';
  highcharts = Highcharts;
  // streamOptions: any;
  @Input() chartName;
  @Input() yAxixTitle: string = '';
  @Input() xAxix: any;
  interval: any;
  interval2: any;
  language: any;
  pageAvailable: boolean = false;
  upStream: string;
  downStream: string;
  originalData: any;

  @Input() data: any;
  @Input() windowLen: any = 5;
  @Input() selectedFilter: number = 1;
  @Input() selectedLocation: any = [];
  @Input() selectedApplication: any = [];

  @Input() selectedRegion: any = [];
  @Input() selectedSystem: any = [];

  @Input() monitorId: any;


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
  streamOptions: any;
  minutes = [5, 10, 15, 20, 25, 30];;

  constructor(
    private customTranslateService: TranslateService,
    private dateUtilsService: DateUtilsService,
  ) { }

  ngOnInit() {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

  }

  msgLen = 0;
  ngOnChanges(changes: SimpleChanges) {
    let v1: any, v2: any;
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];

    if ((changes.history && changes.history.currentValue)) {

      this.lastChartDataObj = this.history ? this.history : {};


      if (Object.keys(this.lastChartDataObj).length) {
        let keys = Object.keys(this.lastChartDataObj);
        this.yAxixTitle = this.lastChartDataObj[keys[keys.length - 1]][2];
        this.lastData = this.data;
        this.chartData = this.data;
        this.rebuildData();
      } else {
        this.buildNewChart();
      }
    }

  }

  inc = 0;
  chartCallback(chart) { // on complete
  }

  isDownStreamVisible = true;
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

  isUpStreamVisible = true;
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

  transformData(currentData: any, lastData: any, data: any): any {
    if (this.chartName.toLowerCase() === 'rate') {
    }

    if (!lastData || !lastData.length) {
      lastData = [0, 0];
    }

    let chartData = [];
    for (let i = 0; i < currentData.length; i++) {
      let delta = parseFloat(currentData[i]) - parseFloat(lastData[i]);

      if (!parseFloat(currentData[i]) && !parseFloat(lastData[i])) {
        data[i] = 0;
      }
      let deltaRate = delta / 15;
      let value = (parseFloat(data[i]) + deltaRate);
      chartData.push(value);
    }

    if ((!chartData[0] && !chartData[1]) && (currentData[0] || currentData[1]) && this.msgLen > 2) {
      chartData = currentData;
    }

    return chartData;
  }

  bitsToSize(bits: any) {
    let bytes = parseFloat(bits);

    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (bytes == 0 && this.chartName.toLowerCase() === 'rate') return '0 bps';
    if (bytes == 0 && this.chartName.toLowerCase() === 'packet') return '0 pps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizes[i];
  }

  removeLast3Chars(str: any): any {
    str = str.toString();
    str = str.slice(0, -3);
    str = parseInt(str);
    return str;
  }

  removeOldKeys(): void {
    let keys = Object.keys(this.lastChartDataObj);
    let len = keys.length;
    if (len > 300 * this.selectedFilter) {
      let obj = this.lastChartDataObj;
      let removeLen = len - 300 * this.selectedFilter;
      for (let i = 0; i < removeLen; i++) {
        delete obj[keys[i]];
      }
      this.lastChartDataObj = obj;
    }
  }



  getPacketRate(bits: any) {
    let bytes = bits;
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (bytes == 0 && this.chartName.toLowerCase() === 'rate') return '0 bps';
    if (bytes == 0 && this.chartName.toLowerCase() === 'packet') return '0 pps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
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
    //return intOffset * 60 * 1000;
    return 0;

    return -75 * 1000;
  }

  conversions = {
    'bps': 1, 'Kbps': 1000, 'Mbps': 1000000, 'Gbps': 1000000000, 'Tbps': 1000000000000,
    'pps': 1, 'Kpps': 1000, 'Mpps': 1000000, 'Gpps': 1000000000, 'Tpps': 1000000000000
  }

  reloadChart = false;
  rebuildData() {
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    let keys = Object.keys(this.lastChartDataObj);
    let length = keys.length;

    if (length) {
      this.reloadChart = true;
      this.buildNewChart();
    }
  }

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
  }

  buildNewChart() {
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;
    this.streamOptions = {};
    let timezoneDetected = this.timezoneDetected();
    let loadTime = this.startTime + (this.playedTime * 1000);
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
        text: this.yAxixTitle,
        margin: 40,
      },
      labels: {
        align: 'left',
        x: -35,
        formatter: function () {
          return Math.abs(this.value);
        }
      },
    }

    let that: any = this;

    this.streamOptions = {
      chart: {
        type: 'areaspline',
        height: 200,
        events: {
          load: function () {
            let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
            var series = this.series;
            that.interval = setInterval(function () {
              if ((that.startTime + (that.playedTime * 1000)) > that.endTime || !that.play) {
                return;
              }

              var time = that.startTime + (that.playedTime * 1000) + timezoneDetected;

              let timeKey = time;
              let key = that.removeLast3Chars(timeKey);

              let data = [0, 0];
              if (typeof that.lastChartDataObj[key] !== 'undefined') {
                data = that.lastChartDataObj[key];
              }

              that.chartData = data;
              if (!data[0]) {
                data[0] = 0;
              }
              if (!data[1]) {
                data[1] = 0;
              }
              let upRate = that.bitsToSize(data[0]);
              let downRate = that.bitsToSize(data[1]);
              let vArr1 = upRate.split(" ");
              let vArr2 = downRate.split(" ");
              let upRateValue = vArr1[0];
              let downRateValue = vArr2[0];
              let upRateUnit = vArr1[1] ? vArr1[1] : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
              let downRateUnit = vArr2[1] ? vArr2[1] : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
              let maxUnit = '';
              upRateUnit = (upRateUnit == 'undefined') ? (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps' : upRateUnit;
              downRateUnit = (downRateUnit == 'undefined') ? (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps' : downRateUnit;
              if (data[0] || data[1]) {
                if (data[0] > data[1]) {
                  maxUnit = vArr1[1];
                } else {
                  maxUnit = vArr2[1];
                }
              } else {
                maxUnit = that.yAxixTitle ? that.yAxixTitle : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
              }
              if (maxUnit == 'undefined') {
                maxUnit = that.yAxixTitle ? that.yAxixTitle : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
              }
              if ((maxUnit != undefined) && that.yAxixTitle != maxUnit && (data[0] || data[1])) {
                that.yAxixTitle = maxUnit;
                that.streamOptions.yAxis.title.text = that.yAxixTitle;
                that.rebuildData();
                return;
              }
              if (typeof maxUnit === 'string') {
                that.yAxixTitle = maxUnit;
              }
              let v1 = parseFloat(vArr1[0]);
              let v2 = parseFloat(vArr2[0]);
              if ((data[0] || data[1]) && (data[0] < data[1]) && vArr1[1] !== vArr2[1]) {
                let indexV1 = sizes.indexOf(vArr1[1]);
                let indexV2 = sizes.indexOf(vArr2[1]);
                let diff = indexV2 - indexV1;
                if (diff) {
                  for (let i = diff; i > 0; i--) {
                    v1 = v1 / 1000;
                  }
                }
              }
              if ((data[0] || data[1]) && (data[0] > data[1]) && vArr1[1] !== vArr2[1]) {
                let indexV1 = sizes.indexOf(vArr1[1]);
                let indexV2 = sizes.indexOf(vArr2[1]);
                let diff = indexV1 - indexV2;
                if (diff) {
                  for (let i = diff; i > 0; i--) {
                    v2 = v2 / 1000;
                  }
                }
              }
              if (data) {

                let num = parseFloat(Highcharts.numberFormat(Math.abs(v1), 2));

                that.upRate = `${upRateValue} ${upRateUnit ? upRateUnit : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps'}`;
                num = parseFloat(Highcharts.numberFormat(Math.abs(v2), 2));

                that.downRate = `${downRateValue} ${downRateUnit ? downRateUnit : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps'}`;
                var x = time, y = v1;
                series[0].addPoint([x, y], true, true);
                var sx = time, sy = -v2;
                series[1].addPoint([sx, sy], true, true);
              }



            }, 1000);
          }
        },

      },

      time: {
        useUTC: false
      },

      title: {
        text: ''
      },
      colors: ['#0027FF', '#5ACFEA'],
      //colors: ['#FF8238', '#836EE8'],
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
        },
        series: {
          turboThreshold: 1000000
        }
      },

      tooltip: {
        formatter: function () {
          let dateValue = this.point.x;
          var dateStr = that.dateUtilsService.getLocalRealtimeDateFormat(dateValue);
          let datakey = that.removeLast3Chars(this.point.x)
          let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][2] : '';

          return `<b> ${dateStr}  </b><br/>
                 ${this.series.name}stream: ${Highcharts.numberFormat(Math.abs(this.point.y), 2)} ${that.yAxixTitle ? that.yAxixTitle : unit}`;

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
              time = loadTime + timezoneDetected,
              i;

            var pastTime = that.totalTime;

            if (that._reload) {
              pastTime = 300;
            }

            for (i = -1 * pastTime; i <= 0; i += 1) {
              let timeKey = time + i * 1000;
              let key = that.removeLast3Chars(timeKey);

              let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][0] : (that.lastChartDataObj[key - 1] && that.lastChartDataObj[key - 1][0]) ? that.lastChartDataObj[key - 1][0] : 0;
              if (that.reloadChart && !value) {
                value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][0] : (that.lastChartDataObj[key - 2] && that.lastChartDataObj[key - 2][0]) ? that.lastChartDataObj[key - 2][0] : 0;
              }

              if (value) {
                value = value / that.sizes[that.yAxixTitle];
              }

              data.push({
                x: timeKey,
                y: value
              });
            }
            return data;
          })()
        }, {
          name: 'Down',
          data: (function () {
            var data = [],
              time = loadTime + timezoneDetected,
              i;

            var pastTime = that.totalTime;

            if (that._reload) {
              pastTime = 300;
            }

            for (i = -1 * pastTime; i <= 0; i += 1) {
              let timeKey = time + i * 1000
              let key = that.removeLast3Chars(timeKey);

              let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][1] : (that.lastChartDataObj[key - 1] && that.lastChartDataObj[key - 1][1]) ? that.lastChartDataObj[key - 1][1] : 0;
              if (that.reloadChart && !value) {
                value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][1] : (that.lastChartDataObj[key - 2] && that.lastChartDataObj[key - 2][1]) ? that.lastChartDataObj[key - 2][1] : 0;
              }


              if (value) {
                value = value / that.sizes[that.yAxixTitle];
              }


              value = value * -1;
              data.push({
                x: timeKey,
                y: value
              });
            }

            return data;
          })()
        }
      ]
    }

    this.streamOptions.series[0].visible = this.isUpStreamVisible;
    this.streamOptions.series[1].visible = this.isDownStreamVisible;
    this.streamOptions = Object.assign({}, this.streamOptions);


  };
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

  getYAxisTitle(bits: any) {            // It returns YAxis title for latest data
    let bytes = bits;
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    var i = (Math.floor(Math.log(bytes) / Math.log(1024)));
    return sizes[i];
  }

  removePrevious() {                    // Replace all previous values with 0,0
    this.lastChartDataObj = Object.keys(this.lastChartDataObj).reduce((acc, key) => { acc[key] = [0, 0, "bps", "bps", "bps"]; return acc; }, {});
    this.lastData = [0, 0];
    this.currentData = [0, 0];
    this.rebuildData();
  }

}
