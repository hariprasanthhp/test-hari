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
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'ngx-stream-path-chart',
  templateUrl: './stream-path-chart.component.html',
  styleUrls: ['./stream-path-chart.component.scss']
})
export class StreamPathChartComponent implements OnInit {
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

  constructor(private customTranslateService: TranslateService, private http: HttpClient, private convertorService: ConvertorService,
    private dateUtilsService: DateUtilsService,
    private sso: SsoAuthService) {
  }

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

    ////console.log(changes.windowLen);
    let v1: any, v2: any;
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (changes.data && changes.data.currentValue && this.data) {
      this.msgLen++;
      this.originalData = changes.data.currentValue;
      let upRate = this.bitsToSize(this.data[0]);
      let downRate = this.bitsToSize(this.data[1]);
      console.log(this.data);
      if (this.chartName.toLowerCase() === 'rate') {
        console.log('Up Rate - ', upRate);
        console.log('Down Rate - ', downRate);
      } else {
        console.log('Up Packet Rate - ', upRate);
        console.log('Down Packer Rate - ', downRate);
      }

      // if (this.currentData) {
      //   this.lastData = this.currentData;
      // } else {
      //   this.chartData = [0, 0];
      // }

      if (this.currentData) {
        this.lastData = this.currentData;
        this.chartData = this.currentData;
      } else {
        this.lastData = [0, 0];
        this.chartData = [0, 0];
      }

      this.currentData = this.data;


    }

    if ((changes.windowLen && changes.windowLen.currentValue && this.data)) {
      //console.log(this.lastChartDataObj);
      // let keys = Object.keys(this.lastChartDataObj);
      // let length = keys.length;

      // if (length) {
      //   for (let i = 0; i < length; i++) {
      //     if (!this.lastChartDataObj[keys[i]]) {
      //       continue;
      //     }
      //     let indexV1 = sizes.indexOf(this.lastChartDataObj[keys[i]][2]);
      //     let indexV2 = sizes.indexOf(this.yAxixTitle);


      //     if (indexV1 > indexV2) {
      //       let diff = indexV1 - indexV2;
      //       for (let j = diff; j > 0; j--) {
      //         this.lastChartDataObj[keys[i]][0] = this.lastChartDataObj[keys[i]][0] * 1000;
      //         this.lastChartDataObj[keys[i]][1] = this.lastChartDataObj[keys[i]][1] * 1000;
      //         this.lastChartDataObj[keys[i]][2] = this.yAxixTitle;
      //       }
      //     } else if (indexV2 > indexV1) {
      //       let diff = indexV2 - indexV1;
      //       for (let j = diff; j > 0; j--) {
      //         this.lastChartDataObj[keys[i]][0] = this.lastChartDataObj[keys[i]][0] / 1000;
      //         this.lastChartDataObj[keys[i]][1] = this.lastChartDataObj[keys[i]][1] / 1000;
      //         this.lastChartDataObj[keys[i]][2] = this.yAxixTitle;
      //       }
      //     }

      //   }
      // }

      this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;

      this.triggerReloadChart = false;
      this.load = true;
      this.yAxixTitle = (this.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      this.lastChartDataObj = this.history ? this.history : {};

      if (Object.keys(this.lastChartDataObj).length) {
        this.lastData = this.data;
        this.chartData = this.data;
        this.rebuildData();
      } else {
        console.log('intial call for load chart');
        this.buildNewChart();
      }

      //console.log('history', this.history);


    }

  }

  inc = 0;

  buildChart() {
    console.log('chart reloaded');
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;
    this.streamOptions = {};
    let timezoneDetected = this.timezoneDetected()
    let loadTime = this.time + timezoneDetected;
    let windowLen = 5 * -60;
    var chartxaxis = {
      type: 'datetime',
      tickPixelInterval: 150,
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
        style: {
          fontWeight: 'bold',
          textAlign: 'left'
        }
      },
      labels: {
        align: 'left',
        x: 0,
        y: 0,
        formatter: function () {
          return Math.abs(this.value);
        }
      }
    }

    let that: any = this;
    this.streamOptions = {
      time: {
        useUTC: false
      },
      chart: {
        backgroundColor: "#FFFFFF",
        type: 'areaspline',
        zoomType: 'x',
        height: 220,
        margin: {},
        animation: false,
        renderTo: 'custom-mirrot-chart',
        events: {
          load: function () {
            let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
            var series = this.series;
            that.interval = setInterval(function () {
              that.inc++

              let data = that.transformData(that.currentData, that.lastData, that.chartData);
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

                console.log(`scale changed from ${that.yAxixTitle} to ${maxUnit}`);
                //console.log(data);
                that.yAxixTitle = maxUnit;
                that.streamOptions.yAxis.title.text = that.yAxixTitle;
                var time = loadTime + (that.inc * 1000);
                let key = that.removeLast3Chars(time);
                //that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
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

                //console.log("after manu v1", v1);
                //v1 = v1 / 1000;
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

                //console.log("originafter manu v2", v2);

              }

              if (data) {
                var time = loadTime + (that.inc * 1000);
                let num = parseFloat(Highcharts.numberFormat(Math.abs(v1), 2));

                if (num < 1) {
                  //num *= 1000;
                }
                that.upRate = `${upRateValue} ${upRateUnit}`;

                num = parseFloat(Highcharts.numberFormat(Math.abs(v2), 2));

                if (num < 1) {
                  //num *= 1000;
                }

                that.downRate = `${downRateValue} ${downRateUnit}`;
                var x = time, y = v1;
                series[0].addPoint([x, y], true, true);

                var sx = time, sy = -v2;
                series[1].addPoint([sx, sy], true, true);

                let key = that.removeLast3Chars(time);

                that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];

                that.removeOldKeys();
              }

            }, 1000);

          }


        }
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: '',
      },
      //subtitle: chartsubtitle,
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
          //console.log(this.point);
          let dateValue = this.point.x - timezoneDetected;
          var d = new Date(dateValue);
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let num = parseFloat(Highcharts.numberFormat(Math.abs(this.point.y), 2));
          let datakey = that.removeLast3Chars(this.point.x)
          // console.log(that.lastChartDataObj);
          // console.log(this.point.x);
          //console.log(that.lastChartDataObj[datakey]);

          let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][2] : '';
          let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
          if (num < 1) {
            //num *= 1000;

            let index = sizes.indexOf(that.yAxixTitle);
            if (index >= 1) {
              index = index - 1;
            }

            if (index === -1) {
              index = 0;
            }

            let rate = that.yAxixTitle;
            if (this.point.y < 0) {
              let indexV1 = sizes.indexOf(that.yAxixTitle);
              rate = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][4] : that.yAxixTitle;
              let indexV2 = sizes.indexOf(rate);
              let diff = indexV1 - indexV2;
              if (diff) {
                for (let i = diff; i > 0; i--) {
                  num = num * 1000;
                }
              }
            } else {
              let indexV1 = sizes.indexOf(that.yAxixTitle);
              rate = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][3] : that.yAxixTitle;
              let indexV2 = sizes.indexOf(rate);
              let diff = indexV1 - indexV2;
              if (diff) {
                for (let i = diff; i > 0; i--) {
                  num = num * 1000;
                }
              }
            }



            return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
                 ${this.series.name}stream: ${num} ${rate}`;

          } else {

            let rate = that.yAxixTitle;
            if (this.point.y < 0 && Math.abs(this.point.y) > 1000) {
              let indexV1 = sizes.indexOf(that.yAxixTitle);
              rate = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][4] : that.yAxixTitle;
              let indexV2 = sizes.indexOf(rate);
              let diff = indexV2 - indexV1;
              if (diff) {
                for (let i = diff; i > 0; i--) {
                  num = num / 1000;
                }
                this.point.y = num;
              }
            } else if (this.point.y > 0 && Math.abs(this.point.y) > 1000) {
              let indexV1 = sizes.indexOf(that.yAxixTitle);
              rate = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][3] : that.yAxixTitle;
              let indexV2 = sizes.indexOf(rate);
              let diff = indexV2 - indexV1;
              if (diff) {
                for (let i = diff; i > 0; i--) {
                  num = num / 1000;
                }

                this.point.y = num;
              }
            }

            return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
                 ${this.series.name}stream: ${Highcharts.numberFormat(Math.abs(this.point.y), 2)} ${unit ? unit : that.yAxixTitle}`;
          }

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

            for (i = -300; i <= 0; i += 1) {
              let timeKey = time + i * 1000;
              let key = that.removeLast3Chars(timeKey);
              let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][0] : 0;
              if (that.reloadChart && !value) {
                value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][0] : 0;
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
          }())
        }, {
          name: 'Down',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = loadTime,
              i;

            for (i = -300; i <= 0; i += 1) {
              let timeKey = time + i * 1000
              let key = that.removeLast3Chars(timeKey);
              let value = that.lastChartDataObj[key] ? that.lastChartDataObj[key][1] : 0;
              if (that.reloadChart && !value) {
                value = that.lastChartDataObj[key - 1] ? that.lastChartDataObj[key - 1][0] : 0;
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

            ////console.log(data);
            return data;
          }())
        }],
    };


  }

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

    //this.streamOptions = Object.assign({}, this.streamOptions);

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

    //this.streamOptions = Object.assign({}, this.streamOptions);
  }

  ngOnDestroy(): void {
    this.streamOptions = {};
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.interval = null;
    this.interval2 = null;
  }

  // transformData(currentData: any, lastData: any, data: any): any {
  //   if (this.chartName.toLowerCase() === 'rate') {
  //     // console.log("current api value", currentData);
  //     // console.log("last api value", lastData);
  //     // console.log("last chart value", data);
  //   }

  //   if (typeof lastData[0] == 'undefined' || isNaN(lastData[0])) {
  //     lastData[0] = 0;
  //   }

  //   if (typeof lastData[1] == 'undefined' || isNaN(lastData[1])) {
  //     lastData[1] = 0;
  //   }

  //   let chartData = [];
  //   for (let i = 0; i < currentData.length; i++) {
  //     let delta = parseFloat(currentData[i]) - parseFloat(lastData[i]);
  //     //delta = Math.abs(delta);

  //     if (!parseFloat(currentData[i]) && !parseFloat(lastData[i])) {
  //       data[i] = 0;
  //     }

  //     let deltaRate = delta / 15;

  //     let value = Math.abs(parseFloat(data[i]) + deltaRate);

  //     chartData.push(value);
  //   }

  //   return chartData;
  // }


  transformData(currentData: any, lastData: any, data: any): any {
    if (this.chartName.toLowerCase() === 'rate') {
      // console.log("last chart value", data);
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
    //return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];

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

    if (len > 300) {
      let obj = this.lastChartDataObj;

      let removeLen = len - 300;

      for (let i = 0; i < removeLen; i++) {
        delete obj[keys[i]];
      }

      this.lastChartDataObj = obj;

      console.log("removal of old chart length", Object.keys(this.lastChartDataObj).length);

    }
  }

  getPacketRate(bits: any) {
    //console.log(bits);
    //let bytes: any = bits / 15;
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
    return intOffset * 60 * 1000;
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

      let time = (new Date()).getTime() + parseInt(this.sso.getRealtimeDelay()),
        i;

      for (i = -299; i <= 0; i += 1) {
        let timeKey = time + i * 1000;
        let key = this.removeLast3Chars(timeKey);

        if (typeof this.lastChartDataObj[key] == 'undefined' && typeof this.lastChartDataObj[key - 1] !== 'undefined') {
          this.lastChartDataObj[key] = this.lastChartDataObj[key - 1];
        } else if (typeof this.lastChartDataObj[key] == 'undefined' && typeof this.lastChartDataObj[key - 2] !== 'undefined') {
          this.lastChartDataObj[key] = this.lastChartDataObj[key - 2];
        }

      }


      //console.log(this.lastChartDataObj);
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
    console.log('chart reloaded');
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;
    this.streamOptions = {};
    //let timezoneDetected = this.timezoneDetected()
    // let timezoneDetected = 0;
    // let timezoneDetected = -75 * 1000;
    let timezoneDetected = parseInt(this.sso.getRealtimeDelay());
    let loadTime = (new Date()).getTime();
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
        margin: 40
        // style: {
        //   fontWeight: 'bold',
        //   textAlign: 'left'
        // }
      },
      labels: {
        align: 'left',
        x: -35,
        //y: 100,
        // padding: 50,
        formatter: function () {
          return Math.abs(this.value);
        }
      }
    }

    let that: any = this;
    this.streamOptions = {

      time: {
        useUTC: false
      },
      chart: {
        type: 'areaspline',
        //marginLeft: 100,
        height: 220,
        events: {
          load: function () {
            let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
            var series = this.series;
            that.interval = setInterval(function () {
              that.inc++

              let data = that.transformData(that.currentData, that.lastData, that.chartData);
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

                console.log(`scale changed from ${that.yAxixTitle} to ${maxUnit}`);
                //console.log(data);
                that.yAxixTitle = maxUnit;
                that.streamOptions.yAxis.title.text = that.yAxixTitle;
                // var time = (new Date()).getTime() + timezoneDetected;
                // let key = that.removeLast3Chars(time);
                //that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
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

                //console.log("after manu v1", v1);
                //v1 = v1 / 1000;
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

                //console.log("originafter manu v2", v2);

              }

              if (data) {
                var time = (new Date()).getTime() + timezoneDetected;
                let num = parseFloat(Highcharts.numberFormat(Math.abs(v1), 2));

                if (num < 1) {
                  //num *= 1000;
                }
                that.upRate = `${upRateValue} ${upRateUnit}`;

                num = parseFloat(Highcharts.numberFormat(Math.abs(v2), 2));

                if (num < 1) {
                  //num *= 1000;
                }

                that.removeOldKeys();

                that.downRate = `${downRateValue} ${downRateUnit}`;
                var x = time, y = v1;
                series[0].addPoint([x, y], true, true);

                var sx = time, sy = -v2;
                series[1].addPoint([sx, sy], true, true);

                let key = that.removeLast3Chars(time);

                that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
                that.lastChartDataObj[key + 1] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];


              }

            }, 1000);
          }
        },

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
        }
      },

      tooltip: {
        formatter: function () {
          //console.log(this.point);
          // let dateValue = this.point.x - timezoneDetected;

          // var dateStr = that.concatDateTime(dateValue);
          // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          // let num = parseFloat(Highcharts.numberFormat(Math.abs(this.point.y), 2));
          // let datakey = that.removeLast3Chars(this.point.x)


          // let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][2] : '';
          // let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];

          let dateValue = this.point.x;
          var dateStr = that.dateUtilsService.getLocalRealtimeDateFormat(dateValue);
          let datakey = that.removeLast3Chars(this.point.x)
          let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][2] : '';

if(this.series.name == 'up'){
  return `<b> ${dateStr}  </b><br/>
  ${that.language.Upstream}: ${Highcharts.numberFormat(Math.abs(this.point.y), 2)} ${that.yAxixTitle}`;
} 
if(this.series.name == 'down'){
  return `<b> ${dateStr}  </b><br/>
  ${that.language.Downstream}: ${Highcharts.numberFormat(Math.abs(this.point.y), 2)} ${that.yAxixTitle}`;

} 
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
          name: that?.language?.upStream ? that.language.upStream : 'up',
          data: (function () {
            var data = [],
              time = (new Date()).getTime() + timezoneDetected,
              i;

            for (i = -299; i <= 0; i += 1) {
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
          }())
        }, {
          name: that?.language?.downStream ? that.language.downStream : 'down',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime() + timezoneDetected,
              i;

            //console.log(" series", that.lastChartDataObj)

            for (i = -299; i <= 0; i += 1) {
              let timeKey = time + i * 1000
              let key = that.removeLast3Chars(timeKey);
              // let value = that.lastChartDataObj[key] ? that.lastChartDataObj[key][1] : 0;
              // if (that.reloadChart && !value) {
              //   value = that.lastChartDataObj[key - 1] ? that.lastChartDataObj[key - 1][0] : 0;
              // }

              let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][1] : (that.lastChartDataObj[key - 1] && that.lastChartDataObj[key - 1][1]) ? that.lastChartDataObj[key - 1][1] : 0;
              if (that.reloadChart && !value) {
                value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][1] : (that.lastChartDataObj[key - 2] && that.lastChartDataObj[key - 2][1]) ? that.lastChartDataObj[key - 2][1] : 0;
              }

              if (that.lastChartDataObj[key]) {
                that.lastChartDataObj[key][1] = value;
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

            ////console.log(data);
            return data;
          }())
        }
      ]
    }

    this.streamOptions.series[0].visible = this.isUpStreamVisible;
    this.streamOptions.series[1].visible = this.isDownStreamVisible;

    this.streamOptions = Object.assign({}, this.streamOptions);


  }

  concatDateTime(dateTime) {
    const d = new Date(dateTime);
    return `${this.roundingDigit(d.getDate())}-${d.toLocaleString('default', { month: 'short' })} ${this.roundingDigit(d.getHours())}:${this.roundingDigit(d.getMinutes())}:${this.roundingDigit(d.getSeconds())}`;
  }

  roundingDigit(digit) {
    return digit < 10 ? `0${digit}` : digit;
  }

}
