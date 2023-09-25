import { Component, OnInit, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportRealtimeService } from '../support-realtime.service';
import { Router, NavigationEnd } from '@angular/router';

import * as Highcharts from 'highcharts';
// declare var require: any;

// const More = require('highcharts/highcharts-more');
// More(Highcharts);

// import Histogram from 'highcharts/modules/histogram-bellcurve';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
// Histogram(Highcharts);

// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);


// const Streamgraph = require('highcharts/modules/streamgraph');
// Streamgraph(Highcharts);
import { Options } from "highcharts";
import { filter } from 'rxjs/operators';

var upData = [];
var downData = [];
var areaChart;

@Component({
  selector: 'poc-realtime-chart',
  templateUrl: './poc-realtime-chart.component.html',
  styleUrls: ['./poc-realtime-chart.component.scss']
})
export class PocRealtimeChartComponent implements OnInit, OnDestroy {
  ratePacketStreamSubscription: any;

  rateData: any[] = [];

  public activity;
  public xData;
  public label;
  options: any;
  interval: any;
  myVar: any;
  upData: any[] = [];
  downData: any[] = [];
  originalData: any;
  lastData: any = [0, 0];
  currentData: any;
  chartData: any = [0, 0];

  upRate: any = 0;
  downRate: any = 0;
  // data: any = {
  //   maxRate: [],
  //   packet: []
  // };
  @Input() data: any;
  @Input() chartName;
  @Input() yAxixTitle: string = '';
  @Input() time: number;
  source: any;
  showRealTime: boolean;
  lastChartDataObj = {};
  triggerReloadChart = false;
  chartOptions: {};

  Highcharts: typeof Highcharts = Highcharts;
  currentUrl: any;
  previousUrl: any;
  prieviousurlString = 'previousurl';
  resorchartObjString = 'resorchartObj';
  restoreChartObj = {
    'up': [],
    'down': []
  }

  constructor(private sso: SsoAuthService,
    private rtService: SupportRealtimeService,
    private dateUtilsService: DateUtilsService,
    private router: Router) {

  }



  ngOnInit(): void {
    console.log('aswin----->ngoninit')
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.rtService.setPreviousUrlData(this.prieviousurlString, this.previousUrl, false);
      // this.loadChartDataZeroValues();
    });

    // areaChart = Highcharts.chart('container', this.options);
    //this.buildAreaChart2();
    // areaChart = Highcharts.chart('container', this.chartOptions);
  }
  ngAfterContentInit() {
    let previousUrl = this.rtService.getPreviousUrlData(this.prieviousurlString);
    if (previousUrl == '/support/traffic-reports/common-reports') {

    } else {

    }
    console.log('aswin----->ngAfterContentInit', previousUrl)
    this.buildAreaChart2();
    // areaChart = Highcharts.chart('container', this.chartOptions);
    console.log("ngAfterContentInit");
  }

  ngOnDestroy(): void {
    //this.ratePacketStreamSubscription.unsubscribe();
    //console.log("unsubscription this.data", this.data);
    clearInterval(this.interval);
    this.rtService.setRestoreChartData(this.resorchartObjString, this.restoreChartObj, false);
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log('aswin- ', changes);
    // let upRate = this.bitsToSize(this.data[0]);
    // let downRate = this.bitsToSize(this.data[1]);
    console.log('aswin-poc', changes.data);
    if (changes.data && changes.data.currentValue && this.data) {
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

      if (this.currentData) {
        this.lastData = this.currentData;
      } else {
        this.chartData = [0, 0];
      }

      this.currentData = this.data;
    }

    //if ((changes.windowLen && changes.windowLen.currentValue && this.data)) {
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;

    //this.triggerReloadChart = false;
    //this.load = true;
    this.yAxixTitle = (this.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    //this.lastChartDataObj = this.history ? this.history : {};

    if (Object.keys(this.lastChartDataObj).length) {
      this.lastData = this.data;
      this.chartData = this.data;
    }

    //console.log('history', this.history);
    //this.buildAreaChart();
    //this.buildAreaChart2();
    //}
  }

  inc = 0;

  // buildAreaChart() {
  //   let colors = ['#D24A2D', '#D2CD2D'];
  //   let timezoneDetected = this.timezoneDetected()
  //   let loadTime = this.time + timezoneDetected;
  //   var chartxaxis = {
  //     type: 'datetime',
  //     tickPixelInterval: 150,
  //   }
  //   var charcredits = {
  //     enabled: false
  //   }
  //   var chartyaxis = {
  //     gridLineDashStyle: 'longdash',
  //     opposite: false,
  //     startOnTick: false,
  //     endOnTick: false,
  //     title: {
  //       text: this.yAxixTitle,
  //       margin: 40
  //     },
  //     labels: {
  //       align: 'left',
  //       x: -35,
  //       formatter: function () {
  //         return Math.abs(this.value);
  //       }
  //     }
  //   }
  //   let that: any = this;
  //   this.options = {
  //     chart: {
  //       type: 'areaspline',
  //       //height: 220,
  //       marginBottom: 30,
  //       zoomType: 'x',
  //       events: {
  //         // load: function () {
  //         //   let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
  //         //   var series = this.series;
  //         //   that.interval = setInterval(function () {
  //         //     that.inc++

  //         //     let data = that.transformData(that.currentData, that.lastData, that.chartData);
  //         //     that.chartData = data;
  //         //     console.log('event data', that.chartData)
  //         //     if (!data[0]) {
  //         //       data[0] = 0;
  //         //     }

  //         //     if (!data[1]) {
  //         //       data[1] = 0;
  //         //     }
  //         //   }, 1000);
  //         // }
  //         load: function () {
  //           let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
  //           var series = this.series;
  //           that.interval = setInterval(function () {
  //             that.inc++

  //             let data = that.transformData(that.currentData, that.lastData, that.chartData);
  //             that.chartData = data;
  //             if (!data[0]) {
  //               data[0] = 0;
  //             }

  //             if (!data[1]) {
  //               data[1] = 0;
  //             }

  //             let upRate = that.bitsToSize(data[0]);
  //             let downRate = that.bitsToSize(data[1]);
  //             let vArr1 = upRate.split(" ");
  //             let vArr2 = downRate.split(" ");
  //             let upRateValue = vArr1[0];
  //             let downRateValue = vArr2[0];
  //             let upRateUnit = vArr1[1] ? vArr1[1] : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
  //             let downRateUnit = vArr2[1] ? vArr2[1] : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
  //             let maxUnit = '';

  //             upRateUnit = (upRateUnit == 'undefined') ? (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps' : upRateUnit;
  //             downRateUnit = (downRateUnit == 'undefined') ? (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps' : downRateUnit;

  //             if (data[0] || data[1]) {
  //               if (data[0] > data[1]) {
  //                 maxUnit = vArr1[1];
  //               } else {
  //                 maxUnit = vArr2[1];
  //               }
  //             } else {
  //               maxUnit = that.yAxixTitle ? that.yAxixTitle : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
  //             }

  //             if (maxUnit == 'undefined') {
  //               maxUnit = that.yAxixTitle ? that.yAxixTitle : (that.chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
  //             }


  //             if ((maxUnit != undefined) && that.yAxixTitle != maxUnit && (data[0] || data[1])) {

  //               console.log(`scale changed from ${that.yAxixTitle} to ${maxUnit}`);
  //               //console.log(data);
  //               that.yAxixTitle = maxUnit;
  //               that.streamOptions.yAxis.title.text = that.yAxixTitle;
  //               // var time = (new Date()).getTime() + timezoneDetected;
  //               // let key = that.removeLast3Chars(time);
  //               //that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
  //               that.rebuildData();
  //               return;

  //             }

  //             if (typeof maxUnit === 'string') {
  //               that.yAxixTitle = maxUnit;
  //             }



  //             let v1 = parseFloat(vArr1[0]);
  //             let v2 = parseFloat(vArr2[0]);

  //             if ((data[0] || data[1]) && (data[0] < data[1]) && vArr1[1] !== vArr2[1]) {
  //               let indexV1 = sizes.indexOf(vArr1[1]);
  //               let indexV2 = sizes.indexOf(vArr2[1]);
  //               let diff = indexV2 - indexV1;
  //               if (diff) {
  //                 for (let i = diff; i > 0; i--) {
  //                   v1 = v1 / 1000;
  //                 }
  //               }

  //               //console.log("after manu v1", v1);
  //               //v1 = v1 / 1000;
  //             }

  //             if ((data[0] || data[1]) && (data[0] > data[1]) && vArr1[1] !== vArr2[1]) {
  //               let indexV1 = sizes.indexOf(vArr1[1]);
  //               let indexV2 = sizes.indexOf(vArr2[1]);
  //               let diff = indexV1 - indexV2;
  //               if (diff) {
  //                 for (let i = diff; i > 0; i--) {
  //                   v2 = v2 / 1000;
  //                 }
  //               }

  //               //console.log("originafter manu v2", v2);

  //             }

  //             if (data) {
  //               var time = (new Date()).getTime() + timezoneDetected;
  //               let num = parseFloat(Highcharts.numberFormat(Math.abs(v1), 2));

  //               if (num < 1) {
  //                 //num *= 1000;
  //               }
  //               that.upRate = `${upRateValue} ${upRateUnit}`;

  //               num = parseFloat(Highcharts.numberFormat(Math.abs(v2), 2));

  //               if (num < 1) {
  //                 //num *= 1000;
  //               }

  //               that.removeOldKeys();

  //               that.downRate = `${downRateValue} ${downRateUnit}`;
  //               var x = time, y = v1;
  //               series[0].addPoint([x, y], true, true);

  //               var sx = time, sy = -v2;
  //               series[1].addPoint([sx, sy], true, true);

  //               let key = that.removeLast3Chars(time);

  //               that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
  //               that.lastChartDataObj[key + 1] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];


  //             }

  //           }, 1000);
  //         }
  //       }
  //     },

  //     title: {
  //       floating: true,
  //       align: 'left',
  //       text: ''
  //     },
  //     subtitle: {
  //       floating: true,
  //       align: 'left',
  //       y: 30,
  //       text: ''
  //     },

  //     time: {
  //       useUTC: true
  //     },
  //     //colors: ['rgba(232, 123, 0, 0.75)', 'rgba(68, 54, 125, 0.75)'],,
  //     colors: ['#FF8238', '#836EE8'],
  //     xAxis: chartxaxis,

  //     // yAxis: {
  //     //   visible: true,
  //     //   startOnTick: false,
  //     //   endOnTick: false
  //     // },
  //     yAxis: chartyaxis,
  //     credits: charcredits,
  //     legend: {
  //       enabled: false
  //     },

  //     // annotations: [{
  //     //   labels: [{
  //     //     point: {
  //     //       x: 5.5,
  //     //       xAxis: 0,
  //     //       y: 30,
  //     //       yAxis: 0
  //     //     },
  //     //     text: 'Cancelled<br>during<br>World War II'
  //     //   }, {
  //     //     point: {
  //     //       x: 18,
  //     //       xAxis: 0,
  //     //       y: 90,
  //     //       yAxis: 0
  //     //     },
  //     //     text: 'Soviet Union fell,<br>Germany united'
  //     //   }],
  //     //   labelOptions: {
  //     //     backgroundColor: 'rgba(255,255,255,0.5)',
  //     //     borderColor: 'silver'
  //     //   }
  //     // }],

  //     // plotOptions: {
  //     //   series: {
  //     //     label: {
  //     //       minFontSize: 5,
  //     //       maxFontSize: 15,
  //     //       style: {
  //     //         color: 'rgba(255,255,255,0.75)'
  //     //       }
  //     //     }
  //     //   }
  //     // },
  //     plotOptions: {
  //       areaspline: {
  //         lineWidth: 1,
  //         marker: {
  //           enabled: false
  //         },
  //         fillOpacity: 0.75
  //       },
  //       spline: {
  //         animation: false,
  //         marker: {
  //           enabled: false,
  //           radius: 0.9,
  //           lineWidth: 0.7
  //         }
  //       }
  //     },
  //     tooltip: {
  //       formatter: function () {
  //         //console.log(this.point);
  //         let dateValue = this.point.x - timezoneDetected;
  //         var d = new Date(dateValue);
  //         var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //         let num = parseFloat(Highcharts.numberFormat(Math.abs(this.point.y), 2));
  //         let datakey = that.removeLast3Chars(this.point.x)
  //         // console.log(that.lastChartDataObj);
  //         // console.log(this.point.x);
  //         //console.log(that.lastChartDataObj[datakey]);

  //         let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][2] : '';
  //         let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
  //         // if (num < 1) {
  //         let index = sizes.indexOf(that.yAxixTitle);
  //         let rate = that.yAxixTitle;
  //         return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
  //                ${this.series.name}stream: ${num} ${rate}`;

  //         //}

  //       }
  //     },
  //     // Data parsed with olympic-medals.node.js
  //     // series: [{
  //     //   name: "Up",

  //     //   data: upData
  //     // }, {
  //     //   name: "Down",

  //     //   data: downData
  //     // }],
  //     series: [
  //       {
  //         name: 'Up',
  //         data: (function () {
  //           var data = [],
  //             time = (new Date()).getTime() + timezoneDetected,
  //             i;

  //           for (i = -299; i <= 0; i += 1) {
  //             let timeKey = time + i * 1000;
  //             let key = that.removeLast3Chars(timeKey);
  //             let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][0] : (that.lastChartDataObj[key] && that.lastChartDataObj[key][0]) ? that.lastChartDataObj[key][0] : 0;
  //             if (that.reloadChart && !value) {
  //               value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][0] : (that.lastChartDataObj[key - 1] && that.lastChartDataObj[key - 1][0]) ? that.lastChartDataObj[key - 1][0] : 0;
  //             }
  //             if (value) {
  //               value = value / that.sizes[that.yAxixTitle];
  //             }

  //             data.push({
  //               x: timeKey,
  //               y: value
  //             });
  //           }
  //           return data;
  //         }())
  //       }, {
  //         name: 'Down',
  //         data: (function () {
  //           // generate an array of random data
  //           var data = [],
  //             time = (new Date()).getTime() + timezoneDetected,
  //             i;

  //           //console.log(" series", that.lastChartDataObj)

  //           for (i = -299; i <= 0; i += 1) {
  //             let timeKey = time + i * 1000
  //             let key = that.removeLast3Chars(timeKey);
  //             let value = that.lastChartDataObj[key] ? that.lastChartDataObj[key][1] : 0;
  //             if (that.reloadChart && !value) {
  //               value = that.lastChartDataObj[key - 1] ? that.lastChartDataObj[key - 1][0] : 0;
  //             }
  //             if (value) {
  //               value = value / that.sizes[that.yAxixTitle];
  //             }


  //             value = value * -1;
  //             data.push({
  //               x: timeKey,
  //               y: value
  //             });
  //           }

  //           ////console.log(data);
  //           return data;
  //         }())
  //       }
  //     ],

  //     exporting: {
  //       sourceWidth: 800,
  //       sourceHeight: 600
  //     }
  //   };

  // }
  loadChartDataZeroValues() {
    // let len = 300;
    let timezoneDetected = 0;
    let time = (new Date()).getTime() + timezoneDetected,
      i;

    //console.log(" series", that.lastChartDataObj)

    for (i = -299; i <= 0; i += 1) {
      let timeKey = time + i * 1000
      let upValue = 0;
      let downValue = 0 * -1;
      this.restoreChartObj['up'].push({ x: timeKey, y: upValue });
      this.restoreChartObj['down'].push({ x: timeKey, y: downValue });
    }
    return this.restoreChartObj

  }

  addInitData(stream) {
    let previousUrl = this.rtService.getPreviousUrlData(this.prieviousurlString);
    if (previousUrl == '/support/traffic-reports/common-reports') {
      this.restoreChartObj = this.rtService.getRestoreChartData(this.resorchartObjString);
      this.removeChartOldKeys();
    } else {
      this.restoreChartObj = this.loadChartDataZeroValues();
    }
    var data = stream == 'up' ? this.restoreChartObj['up'] : this.restoreChartObj['down'];
    return data;
  }

  buildAreaChart2() {
    let that: any = this;
    let timezoneDetected = 0;
    this.time = this.dateUtilsService.getCurrentUtcTime() * 1000;
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
      },
      labels: {
        align: 'left',
        x: -35,
        formatter: function () {
          //return Math.abs(this.value);
          return bytes(Math.abs(this.value), true);
        }
      }
    };

    this.chartOptions = {
      chart: {
        type: 'areaspline',
        //marginRight: 10,
        events: {
          // load: function () {

          //   // set up the updating of the chart each second
          //   let data = that.transformData(that.currentData, that.lastData, that.chartData);
          //   if (!data[0]) {
          //     data[0] = 0;
          //   }

          //   if (!data[1]) {
          //     data[1] = 0;
          //   }
          //   this.upRate = that.bitsToSize(data[0]);
          //   this.downRate = that.bitsToSize(data[1]);
          //   var series = this.series[0];
          //   var series2 = this.series[1];
          //   setInterval(function () {
          //     var upvalue = data[0];
          //     var downvalue = data[1] * -1
          //     var x = (new Date()).getTime(), // current time
          //       y = Math.random(),
          //       z = Math.random();
          //     series.addPoint([x, y], false, true);
          //     series2.addPoint([x, z], true, true);


          //   }, 1000);
          // },
          load: function () {
            let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
            var series1 = this.series[0];
            var series2 = this.series[1];
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
              // let v1 = parseFloat(vArr1[0]);
              // let v2 = parseFloat(vArr2[0]);
              let v1 = parseFloat(data[0])
              let v2 = parseFloat(data[1])
              var time = (new Date()).getTime() + timezoneDetected;
              that.upRate = `${upRateValue} ${upRateUnit}`;
              that.removeOldKeys();
              that.removeChartOldKeys();
              that.downRate = `${downRateValue} ${downRateUnit}`;
              var x = time, y = v1;
              series1.addPoint([x, y], true, true);

              var sx = time, sy = -v2;
              series2.addPoint([sx, sy], true, true);

              let key = that.removeLast3Chars(time);

              that.restoreChartObj['up'].push({ x: x, y: v1 });
              that.restoreChartObj['down'].push({ x: sx, y: sy });

              that.lastChartDataObj[key] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];
              that.lastChartDataObj[key + 1] = [data[0], data[1], that.yAxixTitle, upRateUnit, downRateUnit];

            }, 1000)

          }

        }

      },
      title: {
        text: 'Live random data'
      },
      colors: ['#FF8238', '#836EE8'],
      // xAxis: {
      //   type: 'datetime',
      //   tickPixelInterval: 150
      // },
      // yAxis: [{
      //   title: {
      //     text: 'Value1'
      //   },
      //   plotLines: [{
      //     value: 0,
      //     width: 1,
      //     color: '#808080'
      //   }]
      // },
      // {
      //   title: {
      //     text: 'Value2'
      //   },
      //   plotLines: [{
      //     value: 0,
      //     width: 1,
      //     color: '#808080'
      //   }]
      // }],
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

      // tooltip: {
      //   formatter: function () {
      //     // let yLabel = that.bitsToSize(this.y)
      //     // return '<b>' + this.series.name + '</b><br/>' +
      //     //   Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
      //     //   Highcharts.numberFormat(yLabel, 2);
      //     let dateValue = this.point.x - timezoneDetected;
      //     var d = new Date(dateValue);
      //     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      //     let num = parseFloat(Highcharts.numberFormat(Math.abs(this.point.y), 2));
      //     let datakey = that.removeLast3Chars(this.point.x)
      //     let unit = that.lastChartDataObj[datakey] ? that.lastChartDataObj[datakey][4] : '';
      //     let sizes = (that.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
      //     let rate = that.yAxixTitle;
      //     let yUnit = that.bitsToSize(this.point.y);
      //     let vArr1 = yUnit.split(" ");
      //     let label = vArr1[1];
      //     // return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
      //     // ${this.series.name}stream: ${yUnit}`;
      //     // var i = parseInt(Highcharts.numberFormat(Math.floor(Math.log(this.point.y) / Math.log(1000)), 2));
      //     //return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];

      //     var i = (Math.floor(Math.log(this.point.y) / Math.log(1000)));

      //     return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
      //            ${this.series.name}stream: ${Highcharts.numberFormat(Math.abs(this.point.y / Math.pow(1000, i)), 2)}-${unit} `;
      //   }
      // },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Up',
        data: (function () {
          // generate an array of random data
          var data = that.addInitData('up')
          // time = (new Date()).getTime(),
          // i;

          // for (i = -299; i <= 0; i++) {
          //   data.push({
          //     x: time + i * 1000,
          //     y: Math.random()
          //   });
          // }
          // console.log('aswin-poc-up', data)
          return data;
        })(),

        tooltip: {
          pointFormatter: function () {
            return `<b> ${that.toolTipSet(this.options.x, this.options.y, this.series.name)} `;
          }
        }
        // name: 'Up',
        // data: (function () {
        //   var data = [],
        //     time = (new Date()).getTime() + timezoneDetected,
        //     i;

        //   for (i = -299; i <= 0; i += 1) {
        //     let timeKey = time + i * 1000;
        //     let key = that.removeLast3Chars(timeKey);
        //     let value = typeof that.lastChartDataObj[key] !== 'undefined' ? that.lastChartDataObj[key][0] : (that.lastChartDataObj[key] && that.lastChartDataObj[key][0]) ? that.lastChartDataObj[key][0] : 0;
        //     if (that.reloadChart && !value) {
        //       value = typeof that.lastChartDataObj[key - 1] !== 'undefined' ? that.lastChartDataObj[key - 1][0] : (that.lastChartDataObj[key - 1] && that.lastChartDataObj[key - 1][0]) ? that.lastChartDataObj[key - 1][0] : 0;
        //     }
        //     if (value) {
        //       value = value / that.sizes[that.yAxixTitle];
        //     }

        //     data.push({
        //       x: timeKey,
        //       y: value
        //     });
        //   }
        //   console.log('aswin-poc-up', that.lastChartDataObj)
        //   return data;
        // }())
      },
      {
        name: 'Down',
        data: (function () {
          // generate an array of random data
          var data = that.addInitData('down');
          //   time = (new Date()).getTime(),
          //   i;

          // for (i = -299; i <= 0; i++) {
          //   var value = Math.random();
          //   if (Math.sign(value) > 0) {
          //     value = value * -1
          //   } else {
          //     value = value;
          //   }
          //   data.push({
          //     x: time + i * 1000,
          //     y: value
          //   });
          // }
          //console.log('aswin-poc-down', data)
          return data;
        })(),
        tooltip: {
          pointFormatter: function () {
            return `<b> ${that.toolTipSet(this.options.x, Math.abs(this.options.y), this.series.name)} `;
          }
        }
        // name: 'Down',
        // data: (function () {
        //   // generate an array of random data
        //   var data = [],
        //     time = (new Date()).getTime() + timezoneDetected,
        //     i;

        //   //console.log(" series", that.lastChartDataObj)

        //   for (i = -299; i <= 0; i += 1) {
        //     let timeKey = time + i * 1000
        //     let key = that.removeLast3Chars(timeKey);
        //     let value = that.lastChartDataObj[key] ? that.lastChartDataObj[key][1] : 0;
        //     if (that.reloadChart && !value) {
        //       value = that.lastChartDataObj[key - 1] ? that.lastChartDataObj[key - 1][0] : 0;
        //     }
        //     if (value) {
        //       value = value / that.sizes[that.yAxixTitle];
        //     }


        //     value = value * -1;
        //     data.push({
        //       x: timeKey,
        //       y: value
        //     });
        //   }

        //   ////console.log(data);
        //   console.log('aswin-poc-down', data)
        //   return data;
        // }())
      }]
    }

  };
  toolTipSet(pointx, pointy, seriesname) {
    let dateValue = pointx;
    var d = new Date(dateValue);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let yUnit = this.bitsToSize(pointy);
    return `<b> ${d.getDate()}-${months[d.getMonth()]} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  </b><br/>
  ${seriesname}stream: ${yUnit}`;
  }

  removeChartOldKeys(): void {
    let keys = Object.keys(this.restoreChartObj);

    for (let i of keys) {
      let innerKey = Object.keys(this.restoreChartObj[i]);
      let len = innerKey.length;
      if (len > 300) {

        let removelen = len - 300;
        this.restoreChartObj[i] = this.restoreChartObj[i].slice(removelen);
      }
    }
    console.log("aswin removal of old restoreChartObj  length", Object.keys(this.restoreChartObj).length);

  }

  removeLast3Chars(str: any): any {
    str = str.toString();
    str = str.slice(0, -3);
    str = parseInt(str);

    return str;
  };

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

      console.log("aswin removal of old chart length", Object.keys(this.lastChartDataObj).length);

    }
  };


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
  transformData(currentData: any, lastData: any, data: any): any {
    if (this.chartName.toLowerCase() === 'rate') {

    }

    let chartData = [];
    for (let i = 0; i < currentData.length; i++) {
      let delta = parseFloat(currentData[i]) - parseFloat(lastData[i]);

      if (!parseFloat(currentData[i]) && !parseFloat(lastData[i])) {
        data[i] = 0;
      }

      let deltaRate = delta / 15;

      let value = Math.abs(parseFloat(data[i]) + deltaRate);

      chartData.push(value);
    }

    return chartData;
  }

  reloadChart = false;
  rebuildData() {
    let sizes = (this.chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    let keys = Object.keys(this.lastChartDataObj);
    let length = keys.length;

    if (length) {

      //console.log(this.lastChartDataObj);
      this.reloadChart = true;
      this.buildAreaChart2();
    }
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
}
function pos_to_neg(num) {
  return -Math.abs(num);
}

function addPoint(upvalue, downvalue) {
  var chart = areaChart;
  chart.series[0].addPoint(upvalue);
  chart.series[1].addPoint(pos_to_neg(downvalue));
}


function bytes(bytes, label) {
  if (bytes == 0) return '0';
  var s = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  var value = ((bytes / Math.pow(1024, Math.floor(e))).toFixed(2));
  e = (e < 0) ? (-e) : e;
  if (label) value += ' ' + s[e];
  return value;
}
