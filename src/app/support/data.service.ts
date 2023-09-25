import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
import { environment } from "../../environments/environment";
import { SearchListModel } from './shared/models/search-list.model';
import { getSubscribeList } from './shared/service/endpoints';
import { catchError } from 'rxjs/operators';
// const borderRadius = require('highcharts-border-radius')
// borderRadius(Highcharts);
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { TranslateService } from 'src/app-services/translate.service';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  subscriberInfo;
  voiceData;
  videoData;
  subscriberTabInfo;
  DeviceCount: any;
  serviceTabData;
  latencyTabInfo;
  NetworkStatus: any;
  OverviewApiData: any;
  IssuesList: any;
  multipleRegId: any;
  dataSaver: any = {};
  language: any;
  languageSubject;
  sbStatus: boolean;
  showTopology = new BehaviorSubject<any>(false);
  showQoe = new BehaviorSubject<any>(false);
  ontSerialnumber: any;

  constructor(
    private http: HttpClient,
    private sso: SsoAuthService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  pieChartColurs = ['#84bbf8', '#a3a5ed', '#b3d974', '#fd9e4c', '#fc6784'];
  stackedColumnColors = ['#82bf00', '#349885', '#0279ff'];
  commonHighChartOptions = {
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    responsive: {
      rules: [{
        condition: {
        },
        chartOptions: {
          chart: {
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: false
          }
        }
      }]
    }
  };
  metaData: any = {};
  timeZoneItem = [
    {
      name: "(UTC-12:00) International Date Line West",
      value: "(UTC-12:00) International Date Line West"
    },
    {
      name: "(UTC-11:00) Coordinated Universal Time-11",
      value: "(UTC-11:00) Coordinated Universal Time-11"
    },
    {
      name: "(UTC-10:00) Hawaii",
      value: "(UTC-10:00) Hawaii"
    },
    {
      name: "(UTC-09:00) Alaska",
      value: "(UTC-09:00) Alaska"
    },
    {
      name: "(UTC-08:00) Baja California",
      value: "(UTC-08:00) Baja California"
    },
    {
      name: "(UTC-08:00) Pacific Time (US and Canada)",
      value: "(UTC-08:00) Pacific Time (US and Canada)"
    },
    {
      name: "(UTC-07:00) Arizona",
      value: "(UTC-07:00) Arizona"
    },
    {
      name: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
      value: "(UTC-07:00) Chihuahua, La Paz, Mazatlan"
    },
    {
      name: "(UTC-07:00) Mountain Time (US and Canada)",
      value: "(UTC-07:00) Mountain Time (US and Canada)"
    },
    {
      name: "(UTC-06:00) Central America",
      value: "(UTC-06:00) Central America"
    },
    {
      name: "(UTC-06:00) Central Time (US and Canada)",
      value: "(UTC-06:00) Central Time (US and Canada)"
    },
    {
      name: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
      value: "(UTC-06:00) Guadalajara, Mexico City, Monterrey"
    },
    {
      name: "(UTC-06:00) Saskatchewan",
      value: "(UTC-06:00) Saskatchewan"
    },
    {
      name: "(UTC-05:00) Bogota, Lima, Quito",
      value: "(UTC-05:00) Bogota, Lima, Quito"
    },
    {
      name: "(UTC-05:00) Eastern Time (US and Canada)",
      value: "(UTC-05:00) Eastern Time (US and Canada)"
    },
    {
      name: "(UTC-05:00) Indiana (East)",
      value: "(UTC-05:00) Indiana (East)"
    },
    {
      name: "(UTC-04:30) Caracas",
      value: "(UTC-04:30) Caracas"
    },
    {
      name: "(UTC-04:00) Asuncion",
      value: "(UTC-04:00) Asuncion"
    },
    {
      name: "(UTC-04:00) Atlantic Time (Canada)",
      value: "(UTC-04:00) Atlantic Time (Canada)"
    }

  ]

  public postcall(requestData) {
    return this.http.post(`${environment.SUPPORT_URL}/call/persist`, requestData);
  }

  // ROUNDED COLUMN CHARTS

  public SpeedTestChartOptions(orgId, serialNumber, isRefreshed = false) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-summary/data?${ID}serialNumber=${serialNumber}${isRefreshed ? '&forceRefresh=true' : ''}`);
  }
  // /support/subscriber-experience/qoe-score
  public qoeScoreChartOptions(orgId, serialNumber, period, startTime, endTime) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/support/subscriber-experience/qoe-score?
    ${ID}
    serialNumber=${serialNumber}&
    period=${period}&
    startTime=${startTime}&
    endTime=${endTime}`);
  }
  // /support/subscriber-experience/wan-service
  public wanServiceChartOptions(orgId, serialNumber, period) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/support/subscriber-experience/qoe-score?
    ${ID}
    serialNumber=${serialNumber}&
    period=${period}`);
  }
  // /support/subscriber-experience/wan-status
  public wanContinuityChartOptions(orgId, serialNumber, period, startTime, endTime) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/support/subscriber-experience/qoe-score?
    ${ID}
    serialNumber=${serialNumber}&
    period=${period}&
    startTime=${startTime}&
    endTime=${endTime}`);
  }
  // /support/subscriber-experience/home-efficiency
  public homeEfficiencyChartOptions(orgId, serialNumber, period, startTime, endTime) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/support/subscriber-experience/qoe-score?
    ${ID}
    serialNumber=${serialNumber}&
    period=${period}&
    startTime=${startTime}&
    endTime=${endTime}`);
  }
  // /support/subscriber-experience/client-efficiency
  public clientEfficiencyChartOptions(orgId, serialNumber, period, startTime, endTime, macAddress) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/support/subscriber-experience/qoe-score?
    ${ID}
    serialNumber=${serialNumber}&
    period=${period}&
    startTime=${startTime}&
    endTime=${endTime}
    macAddress=${macAddress}`);
  }



  public RoundedBarChartOptions(orgId, endpointId) {
    /* orgId = 10;
    endpointId = "2705d400-58a5-4cca-8091-8ee2843ea2c9"; */
    let currentDate: any = new Date(), weekBeforeDate: any = new Date();
    weekBeforeDate.setDate(weekBeforeDate.getDate() - 7);
    /* weekBeforeDate = "2020-11-30T00:00:00Z";
    currentDate = "2020-11-23T00:00:00Z"; */
    // let orgId= this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/traffic/timeseries?${this.sso.getOrg(orgId)}endpoint=${endpointId}&granularity=1hour&tenant=0&startTime=${weekBeforeDate.toISOString()}&endTime=${currentDate.toISOString()}&output=rate`);//&groupBy=application
  }

  public getServiceVideo(orgId, serialNumber, isRefreshed = false) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-summary/video?${ID}serialNumber=${serialNumber}${isRefreshed ? '&forceRefresh=true' : ''}`);
  }
  public setVideo(data) {
    this.videoData = data;
    console.log('85', this.videoData);
  }
  public getVideo() {
    console.log('88', this.videoData);
    return this.videoData;
  }
  public getServiceVoice(orgId, serialNumber, isRefreshed = false) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-summary/voice?${ID}serialNumber=${serialNumber}${isRefreshed ? '&forceRefresh=true' : ''}`);
  }
  public setVoice(data) {
    this.voiceData = data;
    console.log('89', this.voiceData);
  }
  public getVoice() {
    console.log('91', this.voiceData);
    return this.voiceData;
  }
  // ROUNDED COLUMN STACKED CHART

  public singleColumnChartOptions(): Observable<{}> {
    let object = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        plotBackgroundColor: '#A5C380',
        // width: 1400,
        // height: this.HouseholdchartHeight,
      },

      xAxis: [{
        gridLineWidth: 1,
        categories: [
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
        ],
        crosshair: true
      }],
      yAxis: [
        { // Primary yAxis
          allowDecimals: true,
          labels: {
            format: '{value} KB'
            // formatter: function () {
            //     return this.value.toFixed(1) >= 1 ? (this.value.toFixed(1) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            // style: {
            //     color: '#727272',
            // },
          },
          // title: {
          //   enabled: false
          // },
          title: {
            text: null,
          },
          opposite: true

        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB',
            // formatter: function () {
            //     return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },


          },
          title: {
            enabled: false
          }
          // title: {
          //     text: 'Devices',
          //     style: {
          //         color: '#7cb5ec'
          //     }
          // },
        },],

      series: [
        {
          name: 'per 10 minutes',
          yAxis: 1,
          data: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
          color: '#2577A6'

          // data: data.numberOfDevices,

        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          point: {
            events: {

            }
          }
        }
      },
    }
    return of(object);
  }

  // ROUNDED BAR CHART


  // ROUNDED STACKED BAR CHART

  public stackedBarChartOptions(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'bar'
      },
      colors: this.stackedColumnColors,
      title: {
        text: 'Stacked Bar Chart'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total fruit consumption'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          maxPointWidth: 20,
          borderRadius: 0,
          stacking: 'normal',
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        bar: {
          stacking: 'normal',
          borderWidth: 0,
          // borderRadiusTopLeft: 20,
          // borderRadiusTopRight: 20,
          dataLabels: {
            enabled: false
          }
        }

      },
      series: [{
        name: 'John',
        borderRadiusTopLeft: 30,
        borderRadiusTopRight: 30,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }]
    };
    return of(object);
  }

  // PIE DONUT CHARTS
  public pieChartOptions(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: this.pieChartColurs,
      title: {
        text: 'Pie Chart'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,

          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: false,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    };
    return of(object);
  }
  public airTimeAnalysisChart(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      colors: ['#b3d974', '#26c0eb', '#fd9e4c'],
      title: {
        style: {
          fontSize: '100%'
        },
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 10,
      },
      tooltip: {
        pointFormat: '{series.name} : {point.percentage:.1f}%'
      },
      legend: {
        reversed: true

      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          innerSize: '90%',
          dataLabels: {
            enabled: false,
            format: '{point.name}<br>{point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Free', 95.0],
          ['Used', 26.8],
          ['Interference', 12.8],
        ]
      }]
    };
    return of(object);
  }

  public airTimeAnalysisChart1(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      colors: ['#b3d974', '#26c0eb', '#fd9e4c'],
      title: {
        style: {
          fontSize: '100%'
        },
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 10,
      },
      tooltip: {
        pointFormat: '{series.name} : {point.percentage:.1f}%'
      },
      legend: {
        reversed: true

      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          innerSize: '90%',
          dataLabels: {
            enabled: false,
            format: '{point.name}<br>{point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Free', 95.0],
          ['Used', 26.8],
          ['Interference', 12.8],
        ]
      }]
    };
    return of(object);
  }
  // AREA CHARTS
  public stackedAreaChartOptions(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'area'
      },
      title: {
        text: 'Stacked Area Chart'
      },
      colors: ['#338107', '#fbe936', '#fa423b'],
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      xAxis: {
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        },
        categories: [
          '09/25 12:15',
          '09/25 20:15',
          '09/26 04:15',
          '09/26 12:15',
          '09/26 20:15',
          '09/27 04:15',
          '09/27 12:15',
          '09/27 20:15',
          '09/28 04:15',
          '09/28 12:15',
          '09/28 20:15',
          '09/29 04:15',
          '09/29 12:15',
          '09/29 20:15',
          '09/30 04:15',
          '09/30 12:15',
          '09/30 20:15',
          '10/01 04:15',
          '10/01 12:15',
          '10/01 20:15',
          '10/02 04:15'
        ],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 25,
        title: {
          text: 'Percentage(%)'
        },
        // labels: {
        //   formatter() {
        //     return this.value / 1000;
        //   }
        // }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.percentage:.1f}%'
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              // tslint:disable-next-line:object-literal-shorthand
              click: function () {
                console.log('Category: ' + this.category + ', Series:' + this.series.name + ', value: ' + this.y);
              }
            }
          }
        },
        area: {
          stacking: 'normal',
          // lineColor: '#666666',
          lineWidth: 1,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [
        {
          name: 'Free',
          data: [100, 100, 100, 100, 100, 100, null, null, null, null, null, null, 100, 100, 100, 100, 100, 100, null, null, null]
        }, {
          name: 'Used',
          data: [5, 4, 6, 5, 4, 9, null, null, null, null, null, null, 4, 5, 2, 4, 5, 7, null, null, null]
        }, {
          name: 'Interference',
          data: [20, 25, 18, 25, 22, 24, null, null, null, null, null, null, 20, 22, 25, 21, 23, 18, null, null, null],
        }]
    };
    return of(object);
  }

  public stackedAreaChartOptions1(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'area'
      },
      title: {
        text: 'Stacked Area Chart'
      },
      colors: ['#338107', '#fbe936', '#fa423b'],
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      xAxis: {
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        },
        categories: [
          '09/25 12:15',
          '09/25 20:15',
          '09/26 04:15',
          '09/26 12:15',
          '09/26 20:15',
          '09/27 04:15',
          '09/27 12:15',
          '09/27 20:15',
          '09/28 04:15',
          '09/28 12:15',
          '09/28 20:15',
          '09/29 04:15',
          '09/29 12:15',
          '09/29 20:15',
          '09/30 04:15',
          '09/30 12:15',
          '09/30 20:15',
          '10/01 04:15',
          '10/01 12:15',
          '10/01 20:15',
          '10/02 04:15'
        ],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 25,
        title: {
          text: 'Percentage(%)'
        },
        // labels: {
        //   formatter() {
        //     return this.value / 1000;
        //   }
        // }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.percentage:.1f}%'
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              // tslint:disable-next-line:object-literal-shorthand
              click: function () {
                console.log('Category: ' + this.category + ', Series:' + this.series.name + ', value: ' + this.y);
              }
            }
          }
        },
        area: {
          stacking: 'normal',
          // lineColor: '#666666',
          lineWidth: 1,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [{
        name: 'Free',
        data: [100, 100, 100, 100, 100, 100, null, null, null, null, null, null, 100, 100, 100, 100, 100, 100, null, null, null]
      }, {
        name: 'Used',
        data: [2, 3, 2, 3, 2, 2, null, null, null, null, null, null, 3, 3, 2, 2, 2, 3, null, null, null]
      }, {
        name: 'Interference',
        data: [2, 2, 3, 2, 2, 2, null, null, null, null, null, null, 2, 2, 2, 2, 3, 2, null, null, null],
      }]
    };
    return of(object);
  }
  public areaChartOptions(): Observable<{}> {
    const object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'area'
      },
      // accessibility: {
      // tslint:disable-next-line:max-line-length
      //   description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
      // },
      title: {
        text: 'Area Chart'
      },
      // subtitle: {
      //   text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
      //     'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
      //     'armscontrol.org</a>'
      // },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter() {
            return this.value; // clean, unformatted number for year
          }
        },
        accessibility: {
          rangeDescription: 'Range: 1940 to 2017.'
        }
      },
      yAxis: {
        title: {
          text: 'Nuclear weapon states'
        },
        labels: {
          formatter() {
            return this.value / 1000 + 'k';
          }
        }
      },
      tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
      },
      plotOptions: {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: 'USA',
        data: [
          null, null, null, null, null, 6, 11, 32, 110, 235,
          369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
          20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
          26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
          24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
          21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
          10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
          5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
        ]
      }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null, null, null, null,
          5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
          1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
          11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
          30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
          37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
          21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
          12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
        ]
      }]

    };
    return of(object);
  }
  // LINE CHARTS
  public multiLineChartOptions(): Observable<{}> {
    let object = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        // plotBackgroundColor: '#A5C380',
        // width: 1400,
        // height: this.HouseholdchartHeight,
      },

      xAxis: [{
        categories: [
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
        ],
        crosshair: true,
        // gridLineColor: '#ffffff',
        // lineColor: '#ffffff'
      }],
      yAxis: [
        { // Primary yAxis
          allowDecimals: true,
          labels: {
            // format: '{value} KB'
            enabled: false
            // formatter: function () {
            //     return this.value.toFixed(1) >= 1 ? (this.value.toFixed(1) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            // style: {
            //     color: '#727272',
            // },
          },
          // title: {
          //   enabled: false
          // },
          title: {
            text: null,
          },
          opposite: true,
          gridLineColor: '#ffffff',
          lineColor: '#ffffff'
        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB',
            formatter: function () {
              return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            },


          },
          gridLineColor: '#ffffff',
          lineColor: '#ffffff',
          title: {
            enabled: false
          }
          // title: {
          //     text: 'Devices',
          //     style: {
          //         color: '#7cb5ec'
          //     }
          // },
        },],

      series: [
        {
          name: 'per 10 minutes',
          yAxis: 1,
          data: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.39, 1.5, 1.5, 1.5, 1.45, 1.5, 1.5, 1.5],
          color: '#BA7528'

          // data: data.numberOfDevices,

        },
        {
          name: null,
          data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
          color: '#2577A6'

          // data: data.numberOfDevices,

        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          point: {
            events: {

            }
          }
        }
      }
    };
    return of(object);
  }

  public ChannelScoreChart1Options(): Observable<{}> {
    const object = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line'
      },
      title: {
        text: 'Channel Score'
      },
      xAxis: {
        categories: ['Sep 05', '', '', 'Sep 16', '', '',
          '']
      },
      // xAxis: {
      //     min: Date.UTC(2015, 4, 1),
      //     max: Date.UTC(2015, 4, 30),
      //     scrollbar: {
      //         enabled: true
      //     }
      // },
      yAxis: {
        min: 0,
        max: 5,
        title: {
          text: 'Channel Score'
        },
        plotLines: [{
          color: '#338107',
          width: 2,
          value: 3,
          dashStyle: 'line'
        }]
      },
      plotOptions: {
        line: {
          marker: {
            radius: 10
          },
          dataLabels: {
            align: 'center',
            enabled: true
          },
        },
      },
      series: [{
        name: 'channel Score',
        marker: {
          symbol: 'circle',
        },
        data: [3, null, null, 3, null, null, null],
        color: '#fa423b'

      }]
    };
    return of(object);
  }






  public getMeshTxExtendOptions(): Observable<{}> {
    // let category = this.addMonthOnCategories(data.categories)

    let householdOptions = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        // width: 1400,
        // height: this.HouseholdchartHeight,
      },

      xAxis: [{
        gridLineWidth: 1,
        categories: [
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
        ],
        crosshair: true
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB'
            // formatter: function () {
            //     return this.value.toFixed(1) >= 1 ? (this.value.toFixed(1) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            // style: {
            //     color: '#727272',
            // },
          },
          // title: {
          //   enabled: false
          // },
          title: {
            text: null,
            style: {
              color: '#727272'
            }
          },
          opposite: true

        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB',
            // formatter: function () {
            //     return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            style: {
              color: '#7cb5ec'
            },

          },
          title: {
            enabled: false
          }
          // title: {
          //     text: 'Devices',
          //     style: {
          //         color: '#7cb5ec'
          //     }
          // },
        },],
      // tooltip: {
      //     formatter: function () {
      //         return `${this.series.name}<br/>
      //                 <b>${data.categories[this.point.x]}: ${this.y}</b> `
      //     }
      // },

      series: [
        {
          name: 'Total Transmitted 5.5KB',
          yAxis: 1,
          data: [0.5, 0.5, 0.5, 0.5, 0.5, 5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 4, 0.5, 0.5, 0.5, 2, 0.5, 5, 0.5, 0.5],
          color: '#35c7fc'

          // data: data.numberOfDevices,

        },
        {
          name: 'Total Recieved 256.6B',
          // yAxis: 1,

          data: [0.3, 0.3, 0.3, 0.3, 0.3, 1, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 1, 0.3, 0.3, 4.5, 0.3, 0.3, 3, 5.4, 0.3, 0.3, 0.3, 0.3],

          color: '#F7C343'

          // data: data.wifiScore,

        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          point: {
            events: {

            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
          // chartOptions: {
          //     yAxis: [
          //         {
          //             labels: {
          //                 align: 'right',
          //                 x: 15,
          //                 y: 5
          //             },
          //             title: {
          //                 x: 15
          //             },
          //             showLastLabel: true
          //         },
          //         {
          //             labels: {
          //                 align: 'left',
          //                 x: -15,
          //                 y: 5
          //             },
          //             title: {
          //                 x: -15
          //             },
          //             showLastLabel: true
          //         }, {
          //             visible: false
          //         }]
          // }
        }]
      }
    }

    return of(householdOptions);
  }

  public getHouseholdOptions(): Observable<{}> {
    // let category = this.addMonthOnCategories(data.categories)

    let householdOptions = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        // width: 1400,
        // height: this.HouseholdchartHeight,
      },

      xAxis: [{
        gridLineWidth: 1,
        categories: [
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
        ],
        crosshair: true
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB'
            // formatter: function () {
            //     return this.value.toFixed(1) >= 1 ? (this.value.toFixed(1) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            // style: {
            //     color: '#727272',
            // },
          },
          // title: {
          //   enabled: false
          // },
          title: {
            text: null,
            style: {
              color: '#727272'
            }
          },
          opposite: true

        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            format: '{value} KB',
            // formatter: function () {
            //     return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'KB' : this.value.toFixed(0) + 'B';
            // },
            style: {
              color: '#7cb5ec'
            },

          },
          title: {
            enabled: false
          }
          // title: {
          //     text: 'Devices',
          //     style: {
          //         color: '#7cb5ec'
          //     }
          // },
        },],
      // tooltip: {
      //     formatter: function () {
      //         return `${this.series.name}<br/>
      //                 <b>${data.categories[this.point.x]}: ${this.y}</b> `
      //     }
      // },

      series: [
        {
          name: 'Total Transmitted 5.5KB',
          yAxis: 1,
          data: [0.5, 0.5, 0.5, 0.5, 0.5, 5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 4, 0.5, 0.5, 0.5, 2, 0.5, 5, 0.5, 0.5],
          color: '#35c7fc'

          // data: data.numberOfDevices,

        },
        {
          name: 'Total Recieved 256.6B',
          // yAxis: 1,

          data: [0.3, 0.3, 0.3, 0.3, 0.3, 1, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 1, 0.3, 0.3, 4.5, 0.3, 0.3, 3, 5.4, 0.3, 0.3, 0.3, 0.3],

          color: '#F7C343'

          // data: data.wifiScore,

        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          point: {
            events: {

            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
          // chartOptions: {
          //     yAxis: [
          //         {
          //             labels: {
          //                 align: 'right',
          //                 x: 15,
          //                 y: 5
          //             },
          //             title: {
          //                 x: 15
          //             },
          //             showLastLabel: true
          //         },
          //         {
          //             labels: {
          //                 align: 'left',
          //                 x: -15,
          //                 y: 5
          //             },
          //             title: {
          //                 x: -15
          //             },
          //             showLastLabel: true
          //         }, {
          //             visible: false
          //         }]
          // }
        }]
      }
    }

    return of(householdOptions);
  }

  public ChannelScoreChartOptions(): Observable<{}> {
    const object = {
      // ...this.commonHighChartOptions,
      chart: {
        type: 'line'
      },
      title: {
        text: 'Channel Score'
      },
      xAxis: {
        categories: ['Sep 05', 'Sep 05', 'Sep 10', 'Sep 16', 'Sep 17', 'Sep 23',
          'Sep 28']
      },
      // xAxis: {
      //     min: Date.UTC(2015, 4, 1),
      //     max: Date.UTC(2015, 4, 30),
      //     scrollbar: {
      //         enabled: true
      //     }
      // },
      yAxis: {
        min: 0,
        max: 5,
        title: {
          text: 'Channel Score'
        },
      },
      plotOptions: {
        line: {
          marker: {
            radius: 10
          },
          dataLabels: {
            align: 'center',
            enabled: true
          },
        },
      },
      series: [{
        name: 'channel Score',
        marker: {
          symbol: 'circle'
        },
        data: [4, 4, 5, 5, 5, 5, 5],
        color: '#338107'

      }]
    };
    return of(object);
  }

  performSearch(orgId, filter, pageNumber, pageSize): Observable<SearchListModel> {
    const params = new HttpParams()
      // .set("orgId", orgId)
      .set("filter", filter || "")
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<SearchListModel>(`${environment.SUPPORT_URL}${getSubscribeList}`, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  searchBySubscriberId(subscriberId, orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}includeDeviceData=true&queryByLocationId=false`);
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
  async getSubscriberInfo(orgId, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.SUPPORT_URL}/subscriber-summary/${subscriberId}?${ID}`;
    const ontData = this.sso.getDeviceData()?.filter(obj => obj.hasOwnProperty('ont'));
    if (ontData.length && !this.sso.getDeviceData()?.some(obj => obj.opMode == 'RG')) {
      url = url + `&ontSerialNumber=${ontData[0]?.ont?.serialNumber}`;
    }
    return await this.http.get(url).toPromise();

    // return await this.http.get(`${environment.SUPPORT_URL}/subscriber-summary/${subscriberId}?orgId=${orgId}`).toPromise();
  }
  async getSubscriberInfoEmailUpadte(orgId, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.SUPPORT_URL}/subscriber-summary/${subscriberId}?${ID}`;
    const ontData = this.sso.getDeviceData()?.filter(obj => obj.hasOwnProperty('ont'));
    if (ontData.length && !this.sso.getDeviceData()?.some(obj => obj.opMode == 'RG')) {
      url = url + `&ontSerialNumber=${ontData[0]?.ont?.serialNumber}`;
    }
    return await this.http.get(url).toPromise();

    // return await this.http.get(`${environment.SUPPORT_URL}/subscriber-summary/${subscriberId}?orgId=${orgId}`).toPromise();
  }

  getSubscriberTabInfo(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber/network/status?${ID}serialNumber=${serialNumber}`);
  }

  setSubscriberInfo(subscribrData) {
    this.subscriberInfo = subscribrData;
  }

  getStoredSubscriberInfo() {
    return this.subscriberInfo;
  }

  setSubscriberTabInfoData(subscriberTabInfo) {
    this.subscriberTabInfo = subscriberTabInfo
  }

  getSubscriberTabInfoData() {
    return this.subscriberTabInfo;
  }

  setDataSaver(key, value) {
    this.dataSaver[key] = value;
  }

  getDataSaver(key) {
    return this.dataSaver[key];
  }

  removeDataSaver() {
    this.dataSaver = {};
  }

  setDeviceTabCount(DeviceCount) {
    this.DeviceCount = DeviceCount;
  }
  getDeviceTabCount() {
    return this.DeviceCount;
  }

  fetchMetaData(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.API_BASE_URL}calix/support/device/feature-properties?${ID}serialNumber=${serialNumber}`);
  }
  fetchMetaDataByModel(orgId, model) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.API_BASE_URL}calix/support/device/feature-properties?${ID}modelName=${model}`);
  }
  //new add apis


  fetchMetaDatavalues(userid) {
    return this.http.get(`${environment.API_BASE_URL}csc/router/wifi/secondarynetwork/list?userId=${userid}`);
  }

  fetchMetaDatavaluesNew(orgid, serialNumber, isRefreshed = false) {
    return this.http.get(`${environment.API_BASE_URL}csc/device/${orgid}/${serialNumber}/ssidPool${isRefreshed ? '?forceRefresh=true' : ''}`);
  }

  getnetworktypevalues(userid) {
    return this.http.get(`${environment.API_BASE_URL}csc/router/wifi/secondarynetwork/type?userId=${userid}`);
  }
  getEncryptionvalues(userid) {
    return this.http.get(`${environment.API_BASE_URL}csc/router/wifi/encryptionType?userId=${userid}`);
  }
  getSMBWifiTypes() {
    return this.http.get(`${environment.API_BASE_URL}csc/device/smb-wifi-type`);
  }
  getUserIdValues(serialNumber) {
    return this.http.get(`${environment.SUPPORT_URL}/router/onboarded?sn=${serialNumber}`);
  }
  fetchMetaDatasingleValues(userid, eventid) {
    return this.http.get(`${environment.API_BASE_URL}csc/router/wifi/secondarynetwork/single?userId=
    ${userid}&eventId=${eventid}`);
  }
  updatefunctionssidpolling(orgId, serialNumber, data) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/ssidPool`, data).pipe(
      catchError(this.handleError));
  }
  addfunctionforssidpolling(orgId, serialNumber, data) {
    return this.http.post(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/ssidPool`, data).pipe(
      catchError(this.handleError));
  }

  updateSMBssidpolling(orgId, serialNumber, data) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/ssidPool`, data).pipe(
      catchError(this.handleError));
  }
  deleteSMBSSID(serialNumber, type) {
    return this.http.delete(`${environment.SUPPORT_URL}/device/smb-wifi?serialNumber=${serialNumber}&smbWifiNetworkType=${type}`);
  }

  // deleteSubscriber(subscriberId: any, orgId: any) {
  //   return this.http.delete(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`);
  // }
  deleteProfileSSID(orgid, serialNumber, eventid) {
    return this.http.delete(`${environment.SUPPORT_URL}/device/${orgid}/${serialNumber}/secondarynetwork/delete?eventId=${eventid}`);
  }
  //new add apis

  getMetaData(serialNumber) {
    return this.metaData.hasOwnProperty(serialNumber) ? this.metaData[serialNumber] : false;
  }

  setMetaData(serialNumber, metaData, reset = false) {
    reset ? this.metaData = {} : this.metaData[serialNumber] = metaData;
  }

  recentSubscriber(request) {
    return this.http.post(`${environment.SUPPORT_URL}/recentSubscribers`, request);
  }

  serviceTabInfo(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/speed-test/latest?${ID}sn=${serialNumber}`);
  }
  speedTestPrivPolicy(orgId) {
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test/config/${orgId}`);
  }

  speedTest(request) {
    return this.http.post(`${environment.SUPPORT_URL}/device-st/run-speed-test`, request);
  }

  speedTestPublicChart(orgId, serialNumber, limit) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test-results?${ID}sn=${serialNumber}&limit=${limit}&public-only=true`);
  }
  speedTestPrivateChart(orgId, serialNumber, limit) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test-results?${ID}sn=${serialNumber}&limit=${limit}&private-only=true`);
  }
  speedTestThirdPartyChart(orgId, serialNumber, limit) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test-results?${ID}sn=${serialNumber}&limit=${limit}`);
  }
  speedTestTcp_UdpChart(orgId, serialNumber, limit, type:string){
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test-results?sn=${serialNumber}&limit=${limit}&type=${type == 'Private' ? 'ookla-'+type.toLowerCase() : type.toLowerCase()}`);
  }

  speedTestAvailabilityCount(sn, days?){
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test-stats?sn=${sn}${days ? '&days=' + days : ''}`);
  }

  latencyTestChart(orgId, serialNumber, limit) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-st/latency-test-results?${ID}sn=${serialNumber}&limit=${limit}`);
  }

  latencyTest(request) {
    return this.http.post(`${environment.SUPPORT_URL}/device-st/run-latency-test`, request);
  }

  setServiceTabInfo(serviceData) {
    this.serviceTabData = serviceData;
  }

  getSpeedTestCapability(serialNumber,subId?){
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test/capability?serialNumber=${serialNumber}${subId ? '&subscriberId=' + subId : ''}`);
  }

  ///////ont data service/////////
  servicedefinitionsapicall() {
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=DATA`);
  }
  servicestatusapicall(subId) {
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/subscribers/${subId}/services/status`);
  }
  getDetailedSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}?includeDeviceData=false&includeDecommissionedDevices=false`);
  }

  bandwidthtiers(name) {
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers?name=${name}`);
  }

  ///////////////////////////

  getServiceTabInfo() {
    return this.serviceTabData;
  }

  setLatencyTabInfo(serviceData) {
    this.latencyTabInfo = serviceData;
  }

  getLatencyTabInfo() {
    return this.latencyTabInfo;
  }

  pageErrorHandle(err: any) {
    if (typeof err === 'string' && err) {
      return err;
    }
    let errorInfo;
    console.log('1404', err);
    if (err?.error?.errorDesc) {
      errorInfo = `${err?.error?.errorDesc}`;
    } else if (err.error != undefined && err.error != null && typeof err.error == 'string') {
      errorInfo = `${err.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error != undefined && typeof err.error.error == 'string') {
      console.log('1408', `${err.error.error}`);
      errorInfo = `${err.error.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'string') {
      errorInfo = `${err.error.fault}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'object' && err.error.fault.faultstring != undefined && typeof err.error.fault.faultstring == 'string') {
      errorInfo = `${err.error.fault.faultstring}`;
    } else if (err.error && err.error.errorMessage) {
      errorInfo = err.error.errorMessage;
    }
    else if (err.statusText == 'Unknown Error' && err.status == '0') {
      // errorInfo = "Unknown Error - Please refresh the page"; // remove later 
      errorInfo = "An unknown error has occurred. Refresh the page to try again";
    }
    else if (err.error != undefined) {
      errorInfo = `${err.error.message}`;
    }
    else {
      errorInfo = `${err.message}`;
    }
    let langfromapi = this.sso.getspecificlangliterals()
    errorInfo = errorInfo != 'undefined' && errorInfo && langfromapi[errorInfo] ? langfromapi[errorInfo] : errorInfo

    return (errorInfo != 'undefined' && errorInfo.length) ? errorInfo : Object.values(this.flatten(err)).join(' - ');
  }

  traverseAndFlatten(currentNode, target, flattenedKey?) {
    for (var key in currentNode) {
      if (currentNode.hasOwnProperty(key)) {
        var newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = flattenedKey + '.' + key;
        }

        var value = currentNode[key];
        if (typeof value === "object") {
          this.traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey] = value;
        }
      }
    }
  }

  flatten(obj) {
    let flattenedObject = {};
    try {
      this.traverseAndFlatten(obj, flattenedObject);
    } catch (ex) {
      flattenedObject = {};
    }
    return flattenedObject;
  }

  timeToDays(time) {
    let seconds = time;
    const day = Math.floor(seconds / (24 * 3600));
    seconds = seconds % (24 * 3600);
    const hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);

    return `${day ? day + 'd' : ''}
              ${hour ? hour + 'h' : ''}
              ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
              ${second ? String(second).padStart(2, '0') + 's' : ''}`;
  }

  timeSetter(createTime, timeCheck) {
    let value = 0, overtime = '', connectingTime = 'second';
    const min = 60, hour = min * 60, day = hour * 24, week = day * 7, month = week * 4;
    if (createTime) {
      if (timeCheck >= month) {
        overtime = timeCheck > month ? this.language['Over'] + ' ' : '';
        connectingTime = timeCheck > month ? 'Months' : 'month';
        value = Math.ceil(timeCheck / month);
      } else if (timeCheck >= week) {
        overtime = timeCheck > week ? this.language['Over'] + ' ' : '';
        connectingTime = timeCheck > week ? 'weeks' : 'week';
        value = Math.ceil(timeCheck / week);
      } else if (timeCheck >= day) {
        overtime = timeCheck > day ? this.language['Over'] + ' ' : '';
        connectingTime = timeCheck > day ? 'Days' : 'day';
        value = Math.round(timeCheck / day);
      } else if (timeCheck >= hour) {
        overtime = timeCheck > hour ? this.language['Over'] + ' ' : '';
        connectingTime = timeCheck > hour ? 'Hours' : 'Hour';
        value = Math.ceil(timeCheck / hour);
      } else if (timeCheck >= min) {
        overtime = timeCheck > min ? this.language['Over'] + ' ' : '';
        connectingTime = timeCheck > min ? 'Minutes' : 'Minutes';
        value = Math.ceil(timeCheck / min);
      }
    }
    return [overtime, connectingTime, value];
  }

  getDeviceInfo(serialNumber) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${this.sso.getOrg(this.sso.getOrgId())}/${serialNumber}/deviceinfo`);
  }
  getDeviceDetails(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/detail?${ID}deviceId=${serialNumber}`);
  }
  getUnassociatedDevice(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/unassociated-device-summary?${ID}serialNumber=${serialNumber}`);
  }

  setNetworkStatus(flag) {
    this.NetworkStatus = flag;
  }
  getNetworkStatus() {
    return this.NetworkStatus;
  }

  putOverview(orgId: number, data) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/network/overview?${ID}`, data).pipe(
      catchError(this.handleError));
  }

  setSubscriberOverviewData(data) {
    this.OverviewApiData = data;
  }
  getSubscriberOverviewData() {
    return this.OverviewApiData;
  }

  setAllIssues(AllIssues) {
    this.IssuesList = AllIssues;
  }

  getAllIssues() {
    return this.IssuesList;
  }


  getL2SecurityData(orgId, serialNumber) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/l2security`).pipe(
      catchError(this.handleError)
    );
  }


  //begin-aswin-09-04-2021-siteScan-ssidNamaInfo-data-fetch
  SsidNameInfoData: any = {};
  fetchSsidNameInfoData(orgId, serialNumber) {
    return this.http.get(`${environment.API_BASE_URL}csc/device/${orgId}/${serialNumber}/ssid`);
  }

  getSsidNameInfoData(serialNumber) {
    return this.SsidNameInfoData.hasOwnProperty(serialNumber) ? this.SsidNameInfoData[serialNumber] : false;
  }

  setSsidNameInfoData(serialNumber, SsidNameInfoData, reset = false) {
    reset ? this.SsidNameInfoData = {} : this.SsidNameInfoData[serialNumber] = SsidNameInfoData;
  }
  //end-aswin-09-04-2021-siteScan-ssidNamaInfo-data-fetch


  getWanInfo(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-summary/waninfo?${ID}serialNumber=${serialNumber}`);
  }

  getDevicePR(orgId, deviceId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${ID}deviceId=${deviceId}`);
  }

  /***begin-aswin-10-05-2021-highchart-streamoption-algorithm-change-try */
  restoreChartObj: any = {};
  getRestoreChartData(key) {
    return this.restoreChartObj.hasOwnProperty(key) ? this.restoreChartObj[key] : false;
  }

  setRestoreChartData(key, restoreChartObj, reset) {
    reset ? this.restoreChartObj = {} : this.restoreChartObj[key] = restoreChartObj;
  }
  /***end-aswin-10-05-2021-highchart-streamoption-algorithm-change-try */

  get multipleRegInstance() {
    return this.multipleRegId;
  }

  set multipleRegInstance(data) {
    this.multipleRegId = data;
  }

  getRegIdInstance(orgId, regId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/deviceInfo?${ID}registrationId=${regId}`);
  }

  getHubbData(subId) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/fccIdentifiers/${subId}`.replace(/%E2%80%8B/g, ''));
  }

  createHubbData(input) {
    return this.http.post(`${environment.SUPPORT_URL}/netops-perf-testing/fccIdentifiers`, input).pipe(
      catchError(this.handleError));
  }

  updateHubbData(subId, input) {
    return this.http.put(`${environment.SUPPORT_URL}/netops-perf-testing/fccIdentifiers/${subId}`, input).pipe(
      catchError(this.handleError));
  }

  deleteHubbData(subId) {
    return this.http.delete(`${environment.SUPPORT_URL}/netops-perf-testing/fccIdentifiers/${subId}`);
  }

  getSpeedTestAvailability(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-st/speed-test/availability?${ID}sn=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }

  getDeleteAndFactoryreset(orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?${ID}`);
  }

  resetBaseline(request) {
    return this.http.put(`${environment.SUPPORT_URL}/device-st/speed-test/reset-service-tier`, request).pipe(
      catchError(this.handleError)
    );
  }

  cscSearch(params: any) {
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-search`, { params });
  }
  getDeviceStatus(srNo, name) {
    return this.http.get(`${environment.SUPPORT_URL}/device/app/status?fsn=${srNo}&appName=${name}`).pipe(
      catchError(this.handleError)
    )

  }
  getqoslist_V2(userId: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId);
    return this.http.get(`${environment.SUPPORT_URL}/qos/summary`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  deleteWarningSubscriber(orgId: any, subscriberId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/servify-contract?${ID}subscriberId=${subscriberId}`);
  }
  getAvailibilityStatus(orgId: any, serialNumber: any) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/availability`)
  }
  deleteSSID(orgId: any, serialNumber: any, event_id) {
    return this.http.delete(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/secondarynetwork/delete?eventId=${event_id}`)
  }

  getAsmServiceInfo(subscriberId, serialNumber, interfaceName) {
    // to be changed
    return this.http.delete(`${environment.SUPPORT_URL}/cnap/v1/inventoryMgr/topology/subscriber/${subscriberId}?interfaceName=${serialNumber}/${interfaceName}`)
  }
}
