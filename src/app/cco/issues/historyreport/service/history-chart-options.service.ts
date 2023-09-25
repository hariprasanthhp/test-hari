import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);
import More from "highcharts/highcharts-more";
More(Highcharts);
import Drilldown from "highcharts/modules/drilldown";
Drilldown(Highcharts);
//Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// // Initialize exporting module.
Exporting(Highcharts);
import customEvents from "highcharts-custom-events";
import { TranslateService } from 'src/app-services/translate.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
customEvents(Highcharts);
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { keys } from 'highcharts/highstock';
import { HealthService } from 'src/app/cco/health/service/health.service';
import { IssueService } from '../../service/issue.service';
//import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
const $: any = require('jquery');
@Injectable({
  providedIn: 'root'
})
export class HistoryChartOptionsService {
  subTitleObj = {
    alarm: {
      'byday': '',
      'severity': '',
      'region': '',
      'location': '',
      'system': '',
    },
    event: {
      'region': '',
      'location': '',
      'system': '',
    }
  }

  colors = {
    "critical": "#C70000", "major": "#FC7235", "minor": "#F3B426", "warning": "#f7e9c1", "info": "#7cb5ec"
  }

  fadecolors = {
    "critical": "#ff8585", "major": "#fdb89b", "minor": "#f9d88b", "warning": "#faf2db", "info": "#b8d7f5"
  }

  filters = ['region', 'location', 'system', 'fsan_serialnumber', 'severity', 'category', 'customCategory', 'alarmEventName', 'cco_ack', 'cco_shelv'];
  filtersObj: any = {
    'region': 'Region', 'location': 'Location', 'system': 'System', 'severity': 'Severity', 'category': 'Category', 'customCategory': 'Alarm Group',
    'alarmEventName': (window.location.pathname.indexOf('/history-reports') !== -1) ? 'Alarm/Event Name' : 'Alarm Name',
    'fsan_serialnumber': 'FSAN', 'cco_ack': 'Acknowledged Alarms', 'cco_shelv': 'Shelved Alarms'
  }

  pieChartColurs = ['#0027FF', '#5ACFEA', '#B926F0', '#FF8238'];
  stackedColumnColors = ['#5ACFEA', '#0027FF'];
  stackedWfhColors = ['#0027FF', '#5ACFEA'];
  stackedAqiteColors = ['#84BBF8', '#FC6784', '#FD9E4C', '#A3A5ED', '#CBC75F'];
  stackedSubsColors = ['#5ACFEA', '#349885', '#0027FF'];
  stackedSubsbarColors = ['#F3B426', '#FC7235', '#C70000'];
  stackedSubsbarnewColors = ['#C70000', '#FC7235', '#F3B426'];
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
            styledMode: true
          },
          // subtitle: {
          //   text: null
          // },
          navigator: {
            enabled: false
          }
        }
      }]
    }
  };
  language: any;

  constructor(private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private router: Router,
    private healthService: HealthService,
    private issueService: IssueService
  ) {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

    });
  }


  public alarmBarChart(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      colors: this.stackedSubsbarColors,
      chart: {
        type: 'column',
        inverted: false // default
      },
      credits: { enabled: false },
      legend: {
      },

      yAxis: {
        min: 0,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Duplicated Alarms (%)'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
            color: '#4c4c4c'
          },
          formatter: function () {
            return this.total + '%';
          },

        }
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },

      xAxis: {
        categories: ['S-CMM-1', 'S-CMM-2', 'S-CMM-1', 'S-CMM-2', 'S-CMM-1', 'S-CMM-2', 'S-CMM-1', 'S-CMM-2', 'S-CMM-1', 'S-CMM-2', 'S-CMM-1', 'S-CMM-2'],
        crosshair: false,


      },
      plotOptions: {
        series: {
          maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },

        },

        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },

      series: [{
        name: 'Critical',
        data: [2, 2, 3, 2, 1, 23, 2, 2, 3, 2, 1, 23],
        stack: 'criticalMajor'
      }, {
        name: 'Major',
        data: [3, 4, 4, 2, 5, 2, 2, 3, 2, 1, 23, 2],
        stack: 'criticalMajor'
      }, {
        name: 'Minor',
        data: [5, 3, 4, 7, 2, 2, 2, 3, 2, 1, 23, 2],
        stack: 'Minor'
      }]

    }
    return of(object);
  }

  ///


  public alarmBarHistoryChart(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      colors: this.stackedSubsbarColors,
      chart: {
        type: 'column',
        inverted: false // default
      },

      yAxis: {
        min: 0,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Duplicated Alarms (%)'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
            color: '#4c4c4c'
          },
          formatter: function () {
            return this.total + '%';
          },

        }
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },

      xAxis: {
        categories: ['E7-AXOS', 'E7-20', 'CMS', 'E7-2', 'E7-AXOS', 'E7-20', 'CMS', 'E7-2'],
        crosshair: false,

      },
      plotOptions: {
        series: {
          maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },

        },

        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },

      series: [{
        name: 'E7-AXOS',
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'E7-20',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'CMS',
        data: [3, 4, 4, 2, 5]
      },
      {
        name: 'E7-2',
        data: [3, 4, 4, 2, 5]
      }]

    }
    return of(object);
  }


  //pie

  public pieChartBlockedThreatOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: this.pieChartColurs,

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
              enabled: false,
            }
          },
        },
        pie: {
          size: '80%',
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            //useHTML: true,
            crop: false,
            distance: 2,
            overflow: "visible",
            style: {
              width: '100px',
              fontSize: '10px',
              font: 'Source Sans Pro,Regular',
              color: '#4C4C4C'
            },

          },
          // connectorColor: '#000000'
        }
      },

      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Critical(123)',
          y: 61.41,
          sliced: false,
          selected: true
        }, {
          name: 'Major(123)',
          y: 11.84
        }, {
          name: 'Minor(90)',
          y: 10.85
        }]
      }]
    }
    return of(object);
  }

  severityChartOptions(data: any, title: any, type?: any, params = {}) {

    let pipe = new TitleCasePipe();

    let subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'severity');

    this.filters.forEach((element, index) => {
      if (params[element]) {

        if (element === 'system') {
          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              params[element][i] = params[element][i].replace('device=', '');
              params[element][i] = params[element][i].replace('DEVICE=', '');
            });
          } else {
            params[element] = params[element].replace('device=', '');
            params[element] = params[element].replace('DEVICE=', '');
          }

        }

      }

    });

    let chartData = data;
    let seriesData = [];
    let size = (type == "small") ? "70%" : "100%";
    var a = title.split(' ')
    let name = a[1];

    if (chartData && chartData.minor >= 0) {
      let min = {
        name: `${this.language.minor} (${chartData.minor})`,
        y: chartData.minor ? chartData.minor : null,
        color: environment['OPERATIONS_HOME_ACTIVE_ALARMS_COLORS'].minor,
        legendIndex: 3,
        severity: 'Minor',
      }
      seriesData.push(min)
    }
    if (chartData && chartData.major >= 0) {
      let maj = {
        name: `${this.language.major} (${chartData.major})`,
        y: chartData.major ? chartData.major : null,
        color: environment['OPERATIONS_HOME_ACTIVE_ALARMS_COLORS'].major,
        legendIndex: 2,
        severity: 'Major'
      }
      seriesData.push(maj)
    }
    if (chartData && chartData.critical >= 0) {
      let critical = {
        name: `${this.language.critical} (${chartData.critical})`,
        y: chartData.critical ? chartData.critical : null,
        color: environment['OPERATIONS_HOME_ACTIVE_ALARMS_COLORS'].critical,
        legendIndex: 1,
        severity: 'Critical'
      }
      seriesData.push(critical)
    }

    if (chartData && chartData.warning >= 0) {
      let warning = {
        name: `${this.language.Warning} (${chartData.warning})`,
        y: chartData.warning ? chartData.warning : null,
        color: environment['OPERATIONS_HOME_ACTIVE_ALARMS_COLORS'].warning,
        legendIndex: 4,
        severity: 'Warning'
      }
      seriesData.push(warning)
    }

    if (chartData && chartData.info >= 0) {
      let info = {
        name: `${this.language.Info} (${chartData.info})`,
        y: chartData.info ? chartData.info : null,
        color: environment['OPERATIONS_HOME_ACTIVE_ALARMS_COLORS'].info,
        legendIndex: 5,
        severity: 'Info'
      }
      seriesData.push(info)
    }

    // if (chartData2.minor > 0) {
    //   let min = {
    //     name: this.language.minor,
    //     y: chartData2.minor,
    //     color: '#F3B426'
    //   }
    //   seriesData2.push(min)
    // }
    // if (chartData2.major > 0) {
    //   let maj = {
    //     name: this.language.major,
    //     y: chartData2.major,
    //     color: '#FC7235'
    //   }
    //   seriesData2.push(maj)
    // }
    // if (chartData2.critical > 0) {
    //   let critical = {
    //     name: this.language.critical,
    //     y: chartData2.critical,
    //     color: '#C70000'
    //   }
    //   seriesData2.push(critical)
    // }

    // seriesData = [{
    //   type: 'pie',
    //   name: 'Raised',
    //   data: seriesData1,
    //   center: [type == "full" ? 200 : 200, type == "full" ? 180 : 120],
    //   size: type == "full" ? 350 : 250,
    //   showInLegend: false,
    // }, {
    //   type: 'pie',
    //   name: 'Cleared',
    //   data: seriesData2,
    //   center: [type == "full" ? 650 : 600, type == "full" ? 180 : 120],
    //   size: type == "full" ? 350 : 250,
    //   showInLegend: false,
    // }]

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: type == "active" ? "" : this.language[title] || title,
      },
      subtitle: {
        text: subTitle
      },
      tooltip: {
        formatter: function () {
          var s;
          var index = this.key.indexOf('(')
          var name = this.key.substr(0, index)
          var percentage = Highcharts.numberFormat(Math.abs(this.percentage), 2);
          s = `<b> ${name} : ${this.y} </b><br/>
          <p>${this.series.name}<span>: <b>${percentage}%</b><br/></span></p>`
          return s;
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      lang: {
        noData: !data?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {

            }
          },
          colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
          states: {
            inactive: {
              enabled: false,
            }
          },
        },
        // pie: {
        //   size: size,
        //   allowPointSelect: true,
        //   cursor: 'pointer',
        //   borderWidth: 0,
        //   showInLegend: false,
        //   dataLabels: {
        //     enabled: true,
        //     format: '{point.name}',
        //     crop: false,
        //     distance: 2,
        //     overflow: "visible",
        //     style: {
        //       width: '10px',
        //       fontSize: '10px',
        //       font: 'Source Sans Pro,Regular',
        //       color: '#4C4C4C'
        //     },
        //   },
        // }

        pie: {
          size: size,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }

      },

      // legend: {
      //   align: 'right',
      //   verticalAlign: 'middle',
      //   layout: 'vertical',
      //   x: -150,
      //   y: 120
      // },
      series: []
    }

    let showData = false;
    if (chartData && Object.keys(chartData).length) {
      let keys = Object.keys(chartData);
      keys.forEach(element => {
        if (chartData[element] > 0) {
          showData = true;
          return true;
        }
      });
    }

    if (seriesData.length > 0 && showData) {
      options.series = [{
        data: seriesData,
        name: this.language[name] || name,
      }];
    }
    return options;
  }


  BIPErrorRateChart(data): any {
    let maxvalue = 0;
    const self = this;
    let category, categoryid, subTitle;
    var seriesName = [];
    var seriesData = [];
    var xAxisCategories = [];
    var seriesData1 = [];
    var groupby = "region";
    if (data.length) {
      let count = 0; let duplicate = [];//|| element.deleted == true
      data = this.healthService.duplicateDataHandle(data, groupby, 'regionId')

      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData1.push({
          y: element.count ? element.count : 0,
          color: this.healthService.chart_color(element, "count")
        })
      });
      maxvalue = xAxisCategories.length > 20 ? 21 : xAxisCategories.length
    }

    let options = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      scrollbar: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      title: {
        //text: type,
        style: {
          display: 'none'
        }
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 21 ? true : false
        },
      },

      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language['PON Interface Count']
        },
        gridLineWidth: 1,
        style: {
          stacking: 'normal',
        },
      },

      tooltip: {
        useHTML: true,
        borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px"> ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${self.healthService.toolip_color(point.color)};padding:0'> ${point.series.name} : </td>
            <td style='padding:0;margin-left:10px'>&nbsp ${point.y} </b></td></tr>`
          });
          let g = s + f;
          return h + g;
        },
        shared: true
      },
      lang: {
        noData: !data?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          //cursor: 'pointer',
          minPointLength: 3,
          point: {
            events:
            {

            }
          },
          //maxPointWidth: 16,
        },
        column: {
          // stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        // {
        //   name: this.language["DownStream"],
        //   data: (seriesData || []),
        //   color: '#0027FF'
        // },
        // {
        //   name: this.language["UpStream"],
        //   data: (seriesData1 || []),
        //   color: '#82BF00'
        // }
        {
          name: this.language['BIP Error Interfaces'],
          data: (seriesData1 || []),
          color: '#0027FF'
        }
      ]

    };
    return options;
  }
  systemChartOptions(data: any, activeReports = false, params?: any, locations = {}, systems?: any) {

    let subTitle = '';

    if (systems && Object.keys(systems).length) {
      subTitle = this.getSubTitle(params, locations, systems, 'alarm', 'system');
    } else {
      subTitle = this.getSubTitle(params, locations, {}, 'alarm', 'system');
    }


    let series = [];
    let columnTypes = [];
    let categories = [];
    if (data) {
      let clearedtypes = [];
      let raisedtypes = [];

      data.forEach((element: any) => {
        if (systems && Object.keys(systems).length) {
          let pointName = systems[element.system] ? systems[element.system].name : element.system;
          element.displayName = pointName;
        } else {
          let pointName = this.systems[element.system] ? this.systems[element.system].name : element.system;
          element.displayName = pointName;
        }

      });

      data = data?.sort((a, b) => a?.displayName?.localeCompare(b?.displayName));

      data.forEach((element: any) => {
        if (element['system']) {
          categories.push(element.displayName);
          element['original_system'] = element['system'];
          element['system'] = element['system'].replace('device=', '');
          element['system'] = element['system'].replace('DEVICE=', '');

          let ndata = element['alarm'] ? element['alarm'] : element;
          if (ndata && ndata['cleared']) {
            clearedtypes = [...clearedtypes, ...Object.keys(ndata['cleared'])];
          }

          if (ndata && ndata['raised']) {
            raisedtypes = [...raisedtypes, ...Object.keys(ndata['raised'])];
          }
        }


      });

      clearedtypes = clearedtypes.filter((x, i, a) => a.indexOf(x) === i);
      raisedtypes = raisedtypes.filter((x, i, a) => a.indexOf(x) === i);

      if (raisedtypes.length > clearedtypes.length) {
        columnTypes = raisedtypes;
      } else {
        columnTypes = clearedtypes;
      }

      //console.log(columnTypes);

      let iSeries = {};
      let stackTypes = ['raised'];

      if (!activeReports) {
        stackTypes.push('cleared');
      }
      let color = '';


      if (columnTypes) {
        columnTypes.forEach(type => {
          stackTypes.forEach((stack: any) => {
            iSeries = {};
            iSeries['name'] = this.language[type];
            iSeries['data'] = [];

            iSeries['color'] = this.colors[type];
            iSeries['stack'] = stack;

            if (stack === 'cleared') {
              iSeries['linkedTo'] = ':previous';
            }

            data.forEach((element: any) => {
              let ndata = element['alarm'] ? element['alarm'] : element;

              //iSeries['data'].push(ndata[stack][type]);

              if (systems && Object.keys(systems).length) {
                color = (systems[element.system] && systems[element.system].isDeleted) ? this.fadecolors[type] : this.colors[type];
              } else {
                color = (this.systems[element.system] && this.systems[element.system].isDeleted) ? this.fadecolors[type] : this.colors[type];
              }

              iSeries['data'].push({
                y: ndata[stack][type] ? ndata[stack][type] : null,
                category: element['original_system'],
                systemId: element['original_system'],
                severity: type,
                color: color
              });

            });

            series.push(iSeries);

          });
        });
      }
    }

    let that = this;
    let pipe = new TitleCasePipe();

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false,
        zoomType: 'y'
      },
      subtitle: {
        text: subTitle
      },
      title: {
        text: activeReports ? "" : `R-${this.language['Raised']}, C-${this.language['Cleared']}`,
        align: 'right',
        floating: false,
        style: {
          fontSize: '12px',
          fontWeight: 'normal',
          fontFamily: 'Source Sans Pro'
        }
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Count'
        },
        minRange: 1,
        stackLabels: {
          enabled: !activeReports,
          crop: false,
          overflow: 'none',
          formatter: function () {
            let label = "C";
            if (this.stack === "raised") {
              label = "R";
            }
            let s = `<span style="font-size: 12px; font-family: Source Sans Pro;font-style: normal;font-weight: normal;"> ${label} </span>`
            // if (this.total === 0) {
            //   s = "";
            // }
            return s;
          }
        }
        //type: 'logarithmic'
      },
      tooltip: {
        formatter: function () {
          var s;

          s = '<b>' + that.language[pipe.transform(this.series.userOptions.stack)] + '</b><br/>' + '<b>' + this.x + '</b><br/>' +
            pipe.transform(this.series.name) + ': ' + this.y + '<br/>' +
            that.language['Total'] + ': ' + this.point.stackTotal;

          return s;
        }
      },
      xAxis: {
        categories: categories,

      },
      lang: {
        noData: !series?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {

            }
          },
          //maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          minPointLength: 2.5,
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: []
    }

    if (series.length > 0) {
      options.series = series;
    }

    return options;
  }

  locationChartOptions(data: any, activeReports = false, params = {}, locations?: any) {

    let subTitle = '';

    if (locations && Object.keys(locations).length) {
      subTitle = this.getSubTitle(params, locations, {}, 'alarm', 'location');
    } else {
      subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'location');
    }

    let series = [];
    let columnTypes = [];
    let categories = [];
    if (data) {
      let clearedtypes = [];
      let raisedtypes = [];

      data.forEach((element: any) => {
        if (locations && Object.keys(locations).length) {
          let pointName = locations[element.location] ? locations[element.location].name : element.location;
          element.displayName = pointName;
        } else {
          let pointName = this.locations[element.location] ? this.locations[element.location].name : element.location;
          element.displayName = pointName;
        }

      });

      data = data?.sort((a, b) => a?.displayName?.localeCompare(b?.displayName));

      data.forEach((element: any) => {
        categories.push(element.displayName);
        let ndata = element['alarm'] ? element['alarm'] : element;
        if (ndata && ndata['cleared']) {
          clearedtypes = [...clearedtypes, ...Object.keys(ndata['cleared'])];
        }

        if (ndata && ndata['raised']) {
          raisedtypes = [...raisedtypes, ...Object.keys(ndata['raised'])];
        }

      });

      clearedtypes = clearedtypes.filter((x, i, a) => a.indexOf(x) === i);
      raisedtypes = raisedtypes.filter((x, i, a) => a.indexOf(x) === i);
      if (raisedtypes.length > clearedtypes.length) {
        columnTypes = raisedtypes;
      } else {
        columnTypes = clearedtypes;
      }
      let iSeries = {};
      let stackTypes = ['raised'];

      if (!activeReports) {
        stackTypes.push('cleared');
      }
      let color = '';

      if (columnTypes) {
        columnTypes.forEach(type => {
          stackTypes.forEach((stack: any) => {
            iSeries = {};
            iSeries['name'] = this.language[type];
            iSeries['data'] = [];

            iSeries['color'] = this.colors[type];
            iSeries['stack'] = stack;

            if (stack === 'cleared') {
              iSeries['linkedTo'] = ':previous';
            }

            data.forEach((element: any) => {
              let ndata = element['alarm'] ? element['alarm'] : element;

              if (locations && Object.keys(locations).length) {
                color = (locations[element.location] && locations[element.location].isDeleted) ? this.fadecolors[type] : this.colors[type];
              } else {
                color = (this.locations[element.location] && this.locations[element.location].isDeleted) ? this.fadecolors[type] : this.colors[type];
              }

              iSeries['data'].push({
                y: ndata[stack][type] ? ndata[stack][type] : null,
                locationId: element.location,
                severity: type,
                color: color
              });

            });

            series.push(iSeries);

          });
        });
      }
    }

    let that = this;
    let pipe = new TitleCasePipe();

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false,
        zoomType: 'y'
      },
      subtitle: {
        text: subTitle
      },
      title: {
        text: activeReports ? "" : `R-${this.language['Raised']}, C-${this.language['Cleared']}`,
        align: 'right',
        floating: false,
        style: {
          fontSize: '12px',
          fontWeight: 'normal',
          fontFamily: 'Source Sans Pro'
        }
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: this.language.Count
        },
        minRange: 1,
        stackLabels: {
          enabled: !activeReports,
          crop: false,
          overflow: 'none',
          formatter: function () {
            let label = "C";
            if (this.stack === "raised") {
              label = "R";
            }
            let s = `<span style="font-size: 12px; font-family: Source Sans Pro;font-style: normal;font-weight: normal;"> ${label} </span>`
            // if (this.total === 0) {
            //   s = "";
            // }
            return s;
          }
        }
        //type: 'logarithmic'
      },
      tooltip: {
        formatter: function () {
          var s;
          s = '<b>' + that.language[pipe.transform(this.series.userOptions.stack)] + '</b><br/>' + '<b>' + this.x + '</b><br/>' +
            pipe.transform(this.series.name) + ': ' + this.y + '<br/>' +
            that.language['Total'] + ': ' + this.point.stackTotal;

          return s;
        }
      },
      xAxis: {
        categories: categories
      },
      lang: {
        noData: !series?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          //maxPointWidth: 16,
          cursor: 'pointer',
          point: {
            events: {

            }
          },
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          minPointLength: 2.5,
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: []
    }
    if (series.length > 0) {
      options.series = series;
    }

    return options;
  }

  regionChartOptions(data: any, activeReports = false, params = {}) {

    let subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'region');

    let series = [];
    let columnTypes = [];
    let categories = [];
    if (typeof data === "object") {
      let clearedtypes = [];
      let raisedtypes = [];

      data.forEach((element: any) => {
        let pointName = this.regions[element.region] ? this.regions[element.region].name : element.region;
        element.displayName = pointName;

      });

      data = data?.sort((a, b) => a?.displayName?.localeCompare(b?.displayName));

      data.forEach((element: any) => {
        categories.push(element.displayName);
        let ndata = element['alarm'] ? element['alarm'] : element;
        if (ndata && ndata['cleared']) {
          clearedtypes = [...clearedtypes, ...Object.keys(ndata['cleared'])];
        }

        if (ndata && ndata['raised']) {
          raisedtypes = [...raisedtypes, ...Object.keys(ndata['raised'])];
        }

      });

      clearedtypes = clearedtypes.filter((x, i, a) => a.indexOf(x) === i);
      raisedtypes = raisedtypes.filter((x, i, a) => a.indexOf(x) === i);

      if (raisedtypes.length > clearedtypes.length) {
        columnTypes = raisedtypes;
      } else {
        columnTypes = clearedtypes;
      }

      //console.log(columnTypes);

      let iSeries = {};
      let stackTypes = ['raised'];

      if (!activeReports) {
        stackTypes.push('cleared');
      }

      iSeries['stack'] = '';

      if (columnTypes) {
        columnTypes.forEach(type => {
          stackTypes.forEach((stack: any) => {
            iSeries = {};
            iSeries['name'] = this.language[type];
            iSeries['data'] = [];

            iSeries['color'] = this.colors[type];
            iSeries['stack'] = stack;

            if (stack === 'cleared') {
              iSeries['linkedTo'] = ':previous';
            }

            data.forEach((element: any) => {
              let ndata = element['alarm'] ? element['alarm'] : element;
              //iSeries['data'].push(ndata[stack][type]);
              iSeries['data'].push({
                y: ndata[stack][type] ? ndata[stack][type] : null,
                regionId: element.region,
                severity: type,
                color: (this.regions[element.region] && this.regions[element.region].isDeleted) ? this.fadecolors[type] : this.colors[type]
              });


            });

            series.push(iSeries);

          });
        });
      }

    }

    let pipe = new TitleCasePipe();
    let that = this;
    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false,
        zoomType: 'y'
      },
      title: {
        text: activeReports ? "" : `R-${this.language['Raised']}, C-${this.language['Cleared']}`,
        align: 'right',
        floating: false,
        style: {
          fontSize: '12px',
          fontWeight: 'normal',
          fontFamily: 'Source Sans Pro'
        }
      },
      subtitle: {
        text: subTitle
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: `${this.language.Count}`
        },
        minRange: 1,
        stackLabels: {
          enabled: !activeReports,
          crop: false,
          overflow: 'none',
          formatter: function () {
            let label = "C";
            if (this.stack === "raised") {
              label = "R";
            }
            let s = `<span style="font-size: 12px; font-family: Source Sans Pro;font-style: normal;font-weight: normal;"> ${label} </span>`
            // if (this.total === 0) {
            //   s = "";
            // }
            return s;
          }
        }
        //type: 'logarithmic'
      },
      tooltip: {
        formatter: function () {
          var s;
          s = s = '<b>' + that.language[pipe.transform(this.series.userOptions.stack)] + '</b><br/>' + '<b>' + this.x + '</b><br/>' +
            pipe.transform(this.series.name) + ': ' + this.y + '<br/>' +
            that.language['Total'] + ': ' + this.point.stackTotal;
          return s;
        }

      },
      xAxis: {
        categories: categories,
      },
      lang: {
        noData: !series?.length ? this.language["No Data Available"] : " "
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {

            }
          },
          //maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          stacking: 'normal',
          minPointLength: 2.5,
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: series
    }
    // if (seriesData.length > 0) {
    //   options.series = seriesData;
    // }

    return options;
  }

  severityEventChartOptions(data: any, title: any, type: any) {
    let chartData = data;
    let seriesData = [];
    let size = (type == "small") ? "70%" : "100%"
    var a = title.split(' ');
    let name = a[1];

    if (chartData.minor > 0) {
      let min = {
        name: this.language.minor,
        y: chartData.minor,
        color: '#F3B426'
      }
      seriesData.push(min)
    }
    if (chartData.major > 0) {
      let maj = {
        name: this.language.major,
        y: chartData.major,
        color: '#FC7235'
      }
      seriesData.push(maj)
    }
    if (chartData.critical > 0) {
      let critical = {
        name: this.language.critical,
        y: chartData.critical,
        color: '#C70000'
      }
      seriesData.push(critical)
    }

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title,
      },
      // colors: this.pieChartColurs,
      tooltip: {
        formatter: function () {
          var s;
          var percentage = Highcharts.numberFormat(Math.abs(this.percentage), 2);
          s = `<b> ${this.key} : ${this.y} </b><br/>
          <p>${this.series.name}<span>: <b>${percentage} %</b><br/></span></p>`
          return s;
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      lang: {
        noData: !seriesData?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {

            }
          },
          colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
          states: {
            inactive: {
              enabled: false,
            }
          },
        },
        pie: {
          size: size,
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          showInLegend: false,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            crop: false,
            distance: 2,
            overflow: "visible",
            style: {
              width: '100px',
              fontSize: '10px',
              font: 'Source Sans Pro,Regular',
              color: '#4C4C4C'
            },
          },
        }
      },
      series: []
    }

    if (seriesData.length > 0) {
      options.series = [{
        data: seriesData,
        name: name,
      }];
    }
    return options;
  }

  systemEventChartOptions(data: any) {
    let seriesData = [];
    let categories = [];
    let minor = [];
    let critical = [];
    let major = [];
    let minorcleared = [];
    let criticalcleared = [];
    let majorcleared = [];

    if (data) {
      data.forEach(element => {
        categories.push(element.system);
        if (element.raised) {
          minor.push(element.raised.minor ? element.raised.minor : 0);
          critical.push(element.raised.critical ? element.raised.critical : 0);
          major.push(element.raised.major ? element.raised.major : 0);
        }
        if (element.cleared) {
          minorcleared.push(element.cleared.minor ? element.cleared.minor : 0);
          criticalcleared.push(element.cleared.critical ? element.cleared.critical : 0);
          majorcleared.push(element.cleared.major ? element.cleared.major : 0);
        }
      });
    }

    if (minor.length > 0) {
      let obj = {
        name: this.language.minor,
        data: minor,
        stack: 'raised',
        color: '#F3B426'
      }
      seriesData.push(obj);
    }
    if (minorcleared.length > 0) {
      let obj = {
        name: this.language.minor + ' (Cleared)',
        data: minorcleared,
        stack: 'cleared',
        color: '#F3B426',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (major.length > 0) {
      let obj = {
        name: this.language.major,
        data: major,
        stack: 'raised',
        color: '#FC7235'
      }
      seriesData.push(obj);
    }
    if (majorcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.major + ' (Cleared)',
        data: majorcleared,
        stack: 'cleared',
        color: '#FC7235',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (critical.length > 0) {
      let obj = {
        name: this.language.critical,
        data: critical,
        stack: 'raised',
        color: '#C70000'
      }
      seriesData.push(obj);
    }
    if (criticalcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.critical + ' (Cleared)',
        data: criticalcleared,
        stack: 'cleared',
        color: '#C70000',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false // default
      },
      yAxis: {
        min: 0,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Count'
        },
        minRange: 1
      },
      tooltip: {
        formatter: function () {
          var s;
          if (!this.series.name.includes("(Cleared)")) {
            if (this.series.name.includes("(Raised)")) {
              return s = '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
            }
            else {
              this.series.name = this.series.name + ' (Raised)';
            }
          }
          s = s = '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
          return s;
        }

        // formatter: function () {
        //   return '<b>' + this.x + '</b><br/>' +
        //     this.series.name + ': ' + this.y + '<br/>' +
        //     'Total: ' + this.point.stackTotal;
        // }
      },
      xAxis: {
        categories: categories,
      },
      lang: {
        noData: !seriesData?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          //maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: []
    }
    if (seriesData.length > 0) {
      options.series = seriesData;
    }
    return options;
  }

  locationEventChartOptions(data: any) {
    let seriesData = [];
    let categories = [];
    let minor = [];
    let critical = [];
    let major = [];
    let minorcleared = [];
    let criticalcleared = [];
    let majorcleared = [];

    if (data) {
      data.forEach(element => {
        categories.push(element.location);
        if (element.raised) {
          minor.push(element.raised.minor ? element.raised.minor : 0);
          critical.push(element.raised.critical ? element.raised.critical : 0);
          major.push(element.raised.major ? element.raised.major : 0);
        }
        if (element.cleared) {
          minorcleared.push(element.cleared.minor ? element.cleared.minor : 0);
          criticalcleared.push(element.cleared.critical ? element.cleared.critical : 0);
          majorcleared.push(element.cleared.major ? element.cleared.major : 0);
        }
      });
    }

    if (minor.length > 0) {
      let obj = {
        name: this.language.minor,
        data: minor,
        stack: 'raised',
        color: '#F3B426'
      }
      seriesData.push(obj);
    }
    if (minorcleared.length > 0) {
      let obj = {
        name: this.language.minor + ' (Cleared)',
        data: minorcleared,
        stack: 'cleared',
        color: '#F3B426',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (major.length > 0) {
      let obj = {
        name: this.language.major,
        data: major,
        stack: 'raised',
        color: '#FC7235'
      }
      seriesData.push(obj);
    }
    if (majorcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.major + ' (Cleared)',
        data: majorcleared,
        stack: 'cleared',
        color: '#FC7235',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (critical.length > 0) {
      let obj = {
        name: this.language.critical,
        data: critical,
        stack: 'raised',
        color: '#C70000'
      }
      seriesData.push(obj);
    }
    if (criticalcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.critical + ' (Cleared)',
        data: criticalcleared,
        stack: 'cleared',
        color: '#C70000',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false // default
      },
      yAxis: {
        min: 0,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Count'
        },
        minRange: 1
      },
      lang: {
        noData: !seriesData?.length ? this.language["No Data Available"] : ""
      },
      tooltip: {
        formatter: function () {
          var s;
          if (!this.series.name.includes("(Cleared)")) {
            if (this.series.name.includes("(Raised)")) {
              return s = '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
            }
            else {
              this.series.name = this.series.name + ' (Raised)';
            }
          }
          s = s = '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
          return s;
        }

        // formatter: function () {
        //   return '<b>' + this.x + '</b><br/>' +
        //     this.series.name + ': ' + this.y + '<br/>' +
        //     'Total: ' + this.point.stackTotal;
        // }
      },
      xAxis: {
        categories: categories,
      },
      plotOptions: {
        series: {
          point: {
            events: {

            }
          },
          //maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: []
    }
    if (seriesData.length > 0) {
      options.series = seriesData;
    }
    return options;
  }

  regionEventChartOptions(data: any) {
    let seriesData = [];
    let categories = [];
    let minor = [];
    let critical = [];
    let major = [];
    let minorcleared = [];
    let criticalcleared = [];
    let majorcleared = [];

    if (data) {
      data.forEach(element => {
        categories.push(element.region);
        if (element.raised) {
          minor.push(element.raised.minor ? element.raised.minor : 0);
          critical.push(element.raised.critical ? element.raised.critical : 0);
          major.push(element.raised.major ? element.raised.major : 0);
        }
        if (element.cleared) {
          minorcleared.push(element.cleared.minor ? element.cleared.minor : 0);
          criticalcleared.push(element.cleared.critical ? element.cleared.critical : 0);
          majorcleared.push(element.cleared.major ? element.cleared.major : 0);
        }
      });
    }

    if (minor.length > 0) {
      let obj = {
        name: this.language.minor,
        data: minor,
        stack: 'raised',
        color: '#F3B426'
      }
      seriesData.push(obj);
    }
    if (minorcleared.length > 0) {
      let obj = {
        name: this.language.minor + ' (Cleared)',
        data: minorcleared,
        stack: 'cleared',
        color: '#F3B426',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (major.length > 0) {
      let obj = {
        name: this.language.major,
        data: major,
        stack: 'raised',
        color: '#FC7235'
      }
      seriesData.push(obj);
    }
    if (majorcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.major + ' (Cleared)',
        data: majorcleared,
        stack: 'cleared',
        color: '#FC7235',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    if (critical.length > 0) {
      let obj = {
        name: this.language.critical,
        data: critical,
        stack: 'raised',
        color: '#C70000'
      }
      seriesData.push(obj);
    }
    if (criticalcleared.length > 0) {
      let obj = {
        showInLegend: false,
        name: this.language.critical + ' (Cleared)',
        data: criticalcleared,
        stack: 'cleared',
        color: '#C70000',
        linkedTo: ':previous'
      }
      seriesData.push(obj);
    }

    let options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false // default
      },
      yAxis: {
        min: 0,
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Count'
        },
        minRange: 1
      },
      tooltip: {
        formatter: function () {
          var s;
          if (!this.series.name.includes("(Cleared)")) {
            if (this.series.name.includes("(Raised)")) {
              return s = '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
            }
            else {
              this.series.name = this.series.name + ' (Raised)';
            }
          }
          s = s = '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
          return s;
        }

        // formatter: function () {
        //   return '<b>' + this.x + '</b><br/>' +
        //     this.series.name + ': ' + this.y + '<br/>' +
        //     'Total: ' + this.point.stackTotal;
        // }
      },
      xAxis: {
        categories: categories,
      },
      lang: {
        noData: !seriesData?.length ? this.language["No Data Available"] : ""
      },
      plotOptions: {
        series: {
          point: {
            events: {

            }
          },
          //maxPointWidth: 16,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: []
    }
    if (seriesData.length > 0) {
      options.series = seriesData;
    }
    return options;
  }

  getEventOptions(data: any, type: any, params = {}, locations?: any, systems?: any, fullScreen?: boolean) {

    // if (params['customCategory']) {
    //   delete params['customCategory'];
    // }

    let subTitle = '';
    if (systems && Object.keys(systems).length) {
      subTitle = this.getSubTitle(params, locations, systems, 'event', type);
    } else if (locations && Object.keys(locations).length) {
      subTitle = this.getSubTitle(params, locations, {}, 'event', type);
    } else {
      subTitle = this.getSubTitle(params, {}, {}, 'event', type);
    }


    let categories = [];
    let series = [];
    let sdata = [];

    if (data && data.length) {

      data.forEach((element: any) => {
        if (element[type]) {

          if (type === 'region') {
            let pointName = this.regions[element[type]] ? this.regions[element[type]].name : element[type];
            element.displayName = pointName;
          } else if (type === 'location') {
            if (locations && Object.keys(locations).length) {
              let pointName = locations[element[type]] ? locations[element[type]].name : element[type];
              element.displayName = pointName;
            } else {
              let pointName = this.locations[element[type]] ? this.locations[element[type]].name : element[type];
              element.displayName = pointName;
            }
          } else if (type === 'system') {
            if (systems && Object.keys(systems).length) {
              let pointName = systems[element[type]] ? systems[element[type]].name : element[type];
              element.displayName = pointName;
            } else {
              let pointName = this.systems[element[type]] ? this.systems[element[type]].name : element[type];
              element.displayName = pointName;
            }

          }
        }
      });



      data = data?.sort((a, b) => a?.displayName?.localeCompare(b?.displayName));

      data.forEach((element: any) => {
        if (element[type]) {
          element[type] = element[type].replace('device=', '');
          element[type] = element[type].replace('DEVICE=', '');
          categories.push(element.displayName);

          if (element['event'] && typeof element['event']['count'] != undefined) {
            sdata.push({
              y: element['event']['count'] ? element['event']['count'] : null,
              uuid: element[type]
            });
          }
        }
      });

      if (sdata && sdata.length) {
        series.push({
          name: 'Events',
          data: sdata
        });
      }

    }

    let options = {
      chart: {
        type: 'column',
        zoomType: 'y'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count'
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          var s = '<b>' + this.x + '</b>';
          this.points.forEach(point => {
            s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + 'Events' + ': ' + point.y;
          });

          return s;
        },

      },
      plotOptions: {
        series: {
          minPointLength: 2.5,
          cursor: 'pointer',
          point: {
            events: {

            }
          },
        },
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: series,
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      lang: {
        noData: !sdata?.length ? this.language["No Data Available"] : ""
      },
    }

    return options;
  }


  getLineChartOptions(cData: any, hideClearedAlarms = false, params = {}) {
    let titlepipe = new TitleCasePipe();

    let subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'byday');

    let diffDays = this.getDateDiff(params);

    let format = 'M/d/yy';

    if (diffDays <= 3) {
      format = 'M/d/yy HH:mm';
    }

    let categories = [], data = [], raisedData = [], clearedData = [];

    if (cData && typeof cData === 'object') {
      cData.forEach((element: any) => {
        categories.push(this.dateUtils.getChartDateByFormat(element.time, format));

        if (!hideClearedAlarms && element['alarm'] && element['alarm']['cleared']) {
          let keys = Object.keys(element['alarm']['cleared']);
          let count = 0;

          keys.forEach(key => {
            count += element['alarm']['cleared'][key];
          });

          clearedData.push(count);
        }

        if (element['alarm'] && element['alarm']['raised']) {
          let keys = Object.keys(element['alarm']['raised']);
          let count = 0;

          keys.forEach(key => {
            count += element['alarm']['raised'][key];
          });

          raisedData.push(count);
        }

      });

      data.push({
        name: `${this.language.Raised}`,
        data: raisedData
      });

      if (!hideClearedAlarms) {
        data.push({
          name: `Cleared`,
          data: clearedData
        });
      }
    }
    let options = {
      ...this.commonHighChartOptions,
      title: {
        text: ''
      },
      subtitle: {
        text: subTitle
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA'],
      xAxis: [{
        min: 0,
        gridLineWidth: 1,
        categories: categories,
        //tickInterval: 5,
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: false,

          title: {
            text: `${this.language.Count}`,
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbol: 'square',
        enabled: true
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: data,
      plotOptions: {
        series: {
          cursor: 'pointer',
          marker: {
            enabled: false
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return options;
  }

  getPieChartOptionsForFS(cData: any, type: any, chartType?: any, datatype?: any) {
    let titlepipe = new TitleCasePipe();
    let data = [];

    let subTitle = '';
    let that = this;
    if (chartType && datatype) {
      subTitle = this.getSubTitleForFullScreen(chartType.toLowerCase(), datatype.toLowerCase());
    }

    if (cData && typeof cData === 'object') {
      cData.forEach((element: any) => {

        if (element['alarm'] && element['alarm'][type]) {
          let keys = Object.keys(element['alarm'][type]);
          let count = 0;

          keys.forEach(key => {
            count += element['alarm'][type][key];
          });

          if (count) {
            data.push({
              name: element['alarmEventName'],
              y: count,
              extraData: element['alarm'][type]
            });
          }

        }

      });


    }

    let count = this.getCountForAlarmNameData(cData, type);

    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: `${this.language['Alarms']} ${this.language[titlepipe.transform(type)] || titlepipe.transform(type)}`
      },

      subtitle: {
        text: subTitle
      },
      // tooltip: {
      //   formatter: function () {
      //     var s;
      //     var percentage = Highcharts.numberFormat(Math.abs(this.percentage), 2);
      //     s = `<b> ${this.key} : ${this.y} </b><br/>
      //     <p>${this.series.name}<span>: <b>${percentage} %</b><br/></span></p>`
      //     return s;
      //   }
      // },

      tooltip: {
        //pointFormat: '<b>{point.y}</b>'
        formatter: function () {
          if (this.point['extraData']['critical']) {
            return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
            ${that.language['critical']}: ${this.point['extraData']['critical']} <br/>`
          }
          if (this.point['extraData']['major']) {
            return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
            ${that.language['major']}: ${this.point['extraData']['major']} <br/>`
          }
          if (this.point['extraData']['minor']) {
            return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
            ${that.language['minor']}: ${this.point['extraData']['minor']} <br/>`
          }
          if (this.point['extraData']['warning']) {
            return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
            ${that.language['warning']}: ${this.point['extraData']['warning']} <br/>`
          }
          if (this.point['extraData']['info']) {
            return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
            ${that.language['info']}: ${this.point['extraData']['info']} <br/>`
          }
          /* return `<b> ${this.key}</b><br> ${that.language['Total']} : ${this.y} <br>
          ${that.language['critical']}: ${this.point['extraData']['critical']} <br/>
          ${that.language['major']}: ${this.point['extraData']['major']} <br/>
          ${that.language['minor']}: ${this.point['extraData']['minor']} <br/>
          ${that.language['warning']}: ${this.point['extraData']['warning']} <br/>
          ${that.language['info']}: ${this.point['extraData']['info']} <br/>          
          `;
        }*/
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          // dataLabels: {
          //   enabled: true,
          //   format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          // }
        },
        scrollbar: {
          enabled: true
        },
        series: {
          cursor: 'pointer',
          point: {
            events: {

            }
          }
        },

      },

      lang: {
        noData: (!cData?.length || !count) ? this.language["No Data Available"] : ""
      },

      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: data
      }]
    }

    return options;
  }

  getCountForAlarmNameData(cData, type?: any) {
    let count = 0;
    if (cData && typeof cData === 'object' && type) {
      cData.forEach((element: any) => {

        if (element['alarm'] && element['alarm'][type]) {
          let keys = Object.keys(element['alarm'][type]);


          keys.forEach(key => {
            count += element['alarm'][type][key];
          });

        }

      });

    } else {
      if (cData && typeof cData === 'object') {
        cData.forEach((element: any) => {

          let types = ['raised', 'cleared'];

          types.forEach(type => {
            if (element['alarm'] && element['alarm'][type]) {
              let keys = Object.keys(element['alarm'][type]);


              keys.forEach(key => {
                count += element['alarm'][type][key];
              });

            }
          });

        });

      }
    }

    return count;

  }

  getCountForEventNameData(cData, type?: any) {
    let count = 0;
    if (cData && typeof cData === 'object') {
      cData.forEach((element: any) => {

        if (element['event'] && element['event']['count']) {
          count += element['event']['count'];
        }

      });

    }

    return count;

  }


  /**
   * 
   * @param params | Object
   * return days | number
   */
  getDateDiff(params = {}) {
    let diffDays = 0;

    if (Object.keys(params).length && params['date']) {
      let dates: any = params['date'].split(',');
      dates[0] = Number(dates[0]);
      dates[1] = Number(dates[1]);
      let end: any = new Date(dates[1]);
      let start: any = new Date(dates[0])
      const diffTime: any = Math.abs(end - start);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return diffDays;
  }

  getEndDate(params = {}) {
    if (Object.keys(params).length && params['date']) {
      let dates: any = params['date'].split(',');
      dates[0] = Number(dates[0]);
      dates[1] = Number(dates[1]);

      return dates[1];
    }

    return 0;
  }

  getLineChartOptionsNew(cData: any, hideClearedAlarms = false, params = {}, fields = {}) {
    let obj = {};
    let subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'byday');
    let data = [], raisedData = [], clearedData = [];

    if (cData && cData.length) {
      if (typeof cData === "object") {
        cData.forEach(element => {
          obj[element.time] = element;
        });
      }

      let diffDays = 10;
      if (fields['date']) {
        diffDays = this.getDateDiff(params);
      }

      let timestamps = [];

      if (fields['date']) {
        if (diffDays > 5) {
          timestamps = this.dateUtils.getUtcHoursTimeArrByDate(fields['date'][0], fields['date'][1]);
        } else {
          timestamps = this.dateUtils.getUtcMinsTimeArrByDate(fields['date'][0], fields['date'][1]);
        }

      } else {

        if (cData && typeof cData === 'object' && cData[0] && typeof cData[0] === 'object') {
          cData?.sort((a, b) => a.time - b.time);
          if (diffDays > 5) {
            timestamps = this.dateUtils.getUtcHoursTimeArrFromTimeToCurrentTime(cData[0].time);
          } else {
            timestamps = this.dateUtils.getUtcMinsTimeArrFromTimeToCurrentTime(cData[0].time);
          }

        }

      }

      let newDataObj = {};

      timestamps.forEach((element: any) => {
        if (obj[element]) {
          newDataObj[element] = obj[element];
        } else {
          newDataObj[element] = { "time": element, "alarm": { "cleared": { "critical": 0, "major": 0, "minor": 0, "warning": 0, "info": 0 }, "raised": { "critical": 0, "major": 0, "minor": 0, "warning": 0, "info": 0 } }, "event": { "count": 0 } };
        }
      });

      let newdata = [];

      for (let key in newDataObj) {
        newdata.push(newDataObj[key]);
      }

      cData = newdata;

      if (cData && typeof cData === 'object') {
        cData.forEach((element: any) => {

          if (!hideClearedAlarms && element['alarm'] && element['alarm']['cleared']) {
            let keys = Object.keys(element['alarm']['cleared']);
            let count = 0;

            keys.forEach(key => {
              count += element['alarm']['cleared'][key];
            });

            clearedData.push([element.time, count]);
          }

          if (element['alarm'] && element['alarm']['raised']) {
            let keys = Object.keys(element['alarm']['raised']);
            let count = 0;

            keys.forEach(key => {
              count += element['alarm']['raised'][key];
            });

            raisedData.push([element.time, count]);
          }

        });

        data.push({
          name: this.language['issue_raised'],
          data: raisedData,
          tooltip: {
            valueDecimals: 0
          }
        });

        if (!hideClearedAlarms) {
          data.push({
            name: this.language['Cleared'],
            data: clearedData,
            tooltip: {
              valueDecimals: 0
            }
          });
        }

      }
    }

    let options = {

      chart: {
        height: 300,
        zoomType: 'xy',
        type: 'line'
      },

      time: {
        useUTC: false
      },

      title: {
        text: ''
      },

      subtitle: {
        text: subTitle
      },
      credits: {
        enabled: false
      },

      colors: ['#0027FF', '#5ACFEA'],

      xAxis: {
        type: 'datetime'
      },
      yAxis: [
        {
          opposite: false,
          min: 0,
          allowDecimals: false,

          title: {
            text: this.language['Count'],
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],

      legend: {
        enabled: true,
        symbolRadius: 6,
        symbolWidth: 12
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },

      rangeSelector: {
      },

      navigator: {
        //margin: 60,
        enabled: false
      },

      scrollbar: {
        enabled: false
      },

      exporting: {
        enabled: false
      },

      plotOptions: {
        series: {
          //compare: 'value',

          dataGrouping: {
            enabled: false
          }
        }
      },

      lang: {
        noData: !cData?.length ? this.language["No Data Available"] : ''
      },


      series: data
    };

    if (cData && cData.length) {
      options['rangeSelector'] = {

        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'day',
          count: 1,
          text: '1d'
        }, {
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'all',
          text: 'All'
        }],
        selected: 3,
        inputEnabled: false,
        enabled: true,
        // floating: false,
        // y: -65,
        // verticalAlign: 'bottom'
      }
    }
    return options;
  }


  getLineChartOptionForActiveReports(cData: any, hideClearedAlarms = false, params = {}, fields = {}, last24hours = false) {

    let obj = {};
    let data = [], raisedData = [], dataObj = {};
    let subTitle = this.getSubTitle(params, {}, {}, 'alarm', 'byday');

    if (cData && cData.length) {
      if (typeof cData === "object") {
        cData.forEach(element => {
          obj[element.time] = element;
        });
      }

      let diffDays = 10;


      if (fields['date']) {
        diffDays = this.getDateDiff(params);
      }

      let timestamps = [];

      if (fields['date']) {
        if (last24hours) {
          const startDate = params['date']?.split(',')[0];
          const endDate = params['date']?.split(',')[1];

          if (startDate && endDate) {
            timestamps = this.dateUtils.getUtcMinsTimeArrByDateMillis(Number(startDate), Number(endDate));
          } else {
            timestamps = this.dateUtils.getUtcMinsTimeArrByDate(fields['date'][0], fields['date'][1]);
          }

        } else if (diffDays > 5) {
          timestamps = this.dateUtils.getUtcHoursTimeArrByDate(fields['date'][0], fields['date'][1]);
        } else {
          timestamps = this.dateUtils.getUtcMinsTimeArrByDate(fields['date'][0], fields['date'][1]);
        }

      } else {

        if (cData && typeof cData === 'object' && cData[0] && typeof cData[0] === 'object') {
          cData?.sort((a, b) => a.time - b.time);
          if (diffDays > 5) {
            timestamps = this.dateUtils.getUtcHoursTimeArrFromTimeToCurrentTime(cData[0].time);
          } else {
            timestamps = this.dateUtils.getUtcMinsTimeArrFromTimeToCurrentTime(cData[0].time);
          }
        }

      }
      let newDataObj = {};
      timestamps.forEach((element: any) => {

        if (obj[element]) {
          newDataObj[element] = obj[element];
        } else {
          newDataObj[element] = { "time": element, "alarm": { "cleared": { "critical": 0, "major": 0, "minor": 0, "warning": 0, "info": 0 }, "raised": { "critical": 0, "major": 0, "minor": 0, "warning": 0, "info": 0 } }, "event": { "count": 0 } };
        }
      });
      let newdata = [];

      for (let key in newDataObj) {
        newdata.push(newDataObj[key]);
      }

      cData = newdata;

      if (cData && typeof cData === 'object') {
        cData.forEach((element: any) => {

          if (element['alarm'] && element['alarm']['raised']) {
            // let keys = Object.keys(element['alarm']['raised']);
            // let count = 0;

            // keys.forEach(key => {
            //   count += element['alarm']['raised'][key];
            // });

            // raisedData.push([element.time, count]);

            let keys = Object.keys(element['alarm']['raised']);

            keys.forEach(key => {
              if (typeof dataObj[key] === 'object') {
                dataObj[key].push([element.time, element['alarm']['raised'][key]]);

              } else {
                dataObj[key] = [];
                dataObj[key].push([element.time, element['alarm']['raised'][key]]);
              }

            });
          }

        });


        let keys = Object.keys(dataObj);
        if (keys.length) {
          keys.forEach(key => {
            let sdata = [];
            if (!params['severity']) {
              sdata = dataObj[key];
            } else if (params['severity'] && params['severity'] === key) {
              sdata = dataObj[key];
            }
            data.push({
              name: this.language[key],
              data: sdata,
              tooltip: {
                valueDecimals: 0
              },
              color: this.colors[key]
            });

          })
        }

      }
    }

    let options = {

      chart: {
        height: 300,
        zoomType: 'xy',
        type: 'line'
      },

      time: {
        useUTC: false
      },

      title: {
        text: ''
      },

      subtitle: {
        text: subTitle
      },
      credits: {
        enabled: false
      },
      colors: ['#0027FF', '#5ACFEA'],

      xAxis: {
        type: 'datetime'
      },
      yAxis: [
        {
          opposite: false,
          min: 0,
          allowDecimals: false,

          title: {
            text: this.language['Count'],
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],

      legend: {
        enabled: true,
        symbolRadius: 6,
        symbolWidth: 12
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        split: true,
        distance: 30,
        padding: 5
      },

      rangeSelector: {},

      navigator: {
        //margin: 60,
        enabled: false
      },

      scrollbar: {
        enabled: false
      },

      exporting: {
        enabled: false
      },

      plotOptions: {
        series: {
          //compare: 'value',
          dataGrouping: {
            enabled: false
          }
        }
      },

      lang: {
        noData: !cData?.length ? this.language["No Data Available"] : ''
      },

      series: data
    };

    if (cData && cData.length) {
      options['rangeSelector'] = {
        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'day',
          count: 1,
          text: '1d'
        }, {
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'all',
          text: 'All'
        }],
        selected: 3,
        inputEnabled: false,
        enabled: true
      }
    }
    return options;
  }


  getSubTitle(params, locations = {}, systems = {}, chartType?: any, datatype?: any) {
    let userParams = {};
    let titlepipe = new TitleCasePipe();
    let datepipe = new DatePipe('en-US');
    let subTitle = '';
    let excelTitile = '';
    let ackAttr = ['cco_ack', 'cco_shelv'];
    let ackAttrObj = {
      'cco_ack': {
        'true': 'Show Acknowledged Alarms',
        'false': 'Hide Acknowledged Alarms'
      },
      'cco_shelv': {
        'true': 'Show Shelved Alarms',
        'false': 'Hide Shelved Alarms'
      }
    }

    // if (params['cco_ack'] == 'all') {
    //   delete params['cco_ack'];';.
    // }

    // if (params['cco_shelv'] == 'all') {
    //   delete params['cco_shelv'];
    // }

    if (params['date']) {
      let startDate = params['date']?.split(',')[0];
      let endDate = params['date']?.split(',')[1];
      excelTitile += `${this.language['Start_Date']}: ${datepipe.transform(startDate, 'MM/dd/yyyy h:mm a')}  \r\n${this.language['enddate']}: ${datepipe.transform(endDate, 'MM/dd/yyyy h:mm a')}  \r\n`;
    }
    this.filters.forEach((element, index) => {
      if (chartType === 'event' && (element === 'severity' || element === 'customCategory')) {
        return;
      }
      if (params[element]) {

        let name: any = [];

        if (element === 'region') {
          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = this.regions[params[element][i]] ? this.regions[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = this.regions[params[element]] ? this.regions[params[element]].name : params[element];
            name.push(pointName);
          }

        } else if (element === 'location') {

          if (locations && Object.keys(locations).length) {
            if (typeof params[element] === 'object') {
              params[element].forEach((e, i) => {
                let pointName = locations[params[element][i]] ? locations[params[element][i]].name : params[element][i];
                name.push(pointName);
              });
            } else {
              let pointName = locations[params[element]] ? locations[params[element]].name : params[element];
              name.push(pointName);
            }
          } else {
            if (typeof params[element] === 'object') {
              params[element].forEach((e, i) => {
                let pointName = this.locations[params[element][i]] ? this.locations[params[element][i]].name : params[element][i];
                name.push(pointName);
              });
            } else {
              let pointName = this.locations[params[element]] ? this.locations[params[element]].name : params[element];
              name.push(pointName);
            }
          }


        } else if (element === 'system') {

          if (systems && Object.keys(systems).length) {
            if (typeof params[element] === 'object') {
              params[element].forEach((e, i) => {
                let pointName = systems[params[element][i]] ? systems[params[element][i]].name : params[element][i];
                name.push(pointName);
              });
            } else {
              let pointName = systems[params[element]] ? systems[params[element]].name : params[element];
              name.push(pointName);
            }
          } else {
            if (typeof params[element] === 'object') {
              params[element].forEach((e, i) => {
                let pointName = this.systems[params[element][i]] ? this.systems[params[element][i]].name : params[element][i];
                name.push(pointName);
              });
            } else {
              let pointName = this.systems[params[element]] ? this.systems[params[element]].name : params[element];
              name.push(pointName);
            }
          }

        } else if (ackAttr.indexOf(element) !== -1) {
          if (params[element]?.toLowerCase() === 'all') {
            return;
          }
          name = ackAttrObj[element][params[element]];
        } else {
          name = params[element];
        }

        let skipAttribites = ['fsan_serialnumber', 'region', 'location', 'system', 'customCategory', 'alarmEventName', 'category', 'cco_ack', 'cco_shelv'];
        if (typeof name === 'object' && skipAttribites.indexOf(element) === -1) {
          name = name.map(x => titlepipe.transform(x));
        } else {
          if (skipAttribites.indexOf(element) === -1) {
            name = titlepipe.transform(name);
          } else if (element === 'fsan_serialnumber') {
            name = name.toUpperCase();
          }

          name = [name];
        }


        if (subTitle) {
          subTitle += ', ';
        }

        userParams[this.filtersObj[element]] = name.join(', ');

        subTitle += `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language[this.filtersObj[element]] || this.filtersObj[element]}: ${name.join(', ')}</span>`

        excelTitile += `${this.language[`${this.filtersObj[element]}`]}:${name.join('&')} \r\n`;
      }

    });

    this.userFilters[chartType][datatype] = userParams;

    this.subTitleObj[chartType][datatype] = `${excelTitile}`;
    return subTitle;
  }

  regions = {};
  locations = {};
  systems = {};

  setRegionsInfo(regions) {
    this.regions = {};
    let regObj = {};
    if (regions) {
      regions.forEach((element: any) => {
        regObj[element.id] = {
          name: element.name,
          isDeleted: element.isDeleted
        };
      })
    }
    this.regions = regObj;
  }

  getRegionsObj() {
    return this.regions;
  }

  setLocationsInfo(locations) {
    this.locations = {};
    let locObj = {};
    if (locations) {
      locations.forEach((element: any) => {
        locObj[element.id] = {
          name: element.name,
          isDeleted: element.isDeleted
        };
      })
    }
    this.locations = locObj;
  }

  getLocationsObj() {
    return this.locations;
  }

  setSystemsInfo(systems) {
    this.systems = {};
    let sysObj = {};
    if (systems) {
      systems.forEach((element: any) => {
        sysObj[element.uuid] = {
          name: element.name,
          isDeleted: element.isDeleted
        };;
      })
    }
    this.systems = sysObj;
  }

  getSystemsObj() {
    return this.systems;
  }

  setFiltersObj() {
    this.filtersObj = {
      'region': 'Region', 'location': 'Location', 'system': 'System', 'severity': 'Severity', 'category': 'Category', 'customCategory': 'Alarm Group',
      'alarmEventName': (this.issueService.getAlertType() === 'EVENTS') ? 'Event Name' : 'Alarm Name',
      'fsan_serialnumber': 'FSAN', 'cco_ack': 'Acknowledged Alarms', 'cco_shelv': 'Shelved Alarms'
    }
  }

  prepareAlarmCSVDataforSeverity(chartData: any, reportType = 'histoy', params = {}) {
    let titlepipe = new TitleCasePipe();
    let data = [];
    if (Object.keys(chartData).length) {
      let keys: any = Object.keys(chartData);
      keys.forEach(key => {
        if (reportType === 'active' && key === 'cleared') {
          return;
        }

        if (!chartData[key]) {
          return;
        }

        let inrKeys = Object.keys(chartData[key]);
        let temp = {};
        temp['Type'] = titlepipe.transform(key);
        if (Object.keys(params).length && params['severity']) {
          temp[titlepipe.transform(params['severity'])] = chartData[key][params['severity']];
        } else {
          inrKeys.forEach(inrKey => {
            temp[titlepipe.transform(inrKey)] = chartData[key][inrKey];

          });
        }

        data.push(Object.assign(temp));


      });

    }

    return data;

  }

  prepareAlarmCSVDataforRegion(regiondata: any, reportType = 'histoy', params = {}) {
    let titlepipe = new TitleCasePipe();
    let data = [];
    regiondata.forEach((element: any) => {
      let chartData = element.alarm;
      if (chartData && Object.keys(chartData).length) {
        let keys = Object.keys(chartData);
        keys.forEach(key => {
          if (reportType === 'active' && key === 'cleared') {
            return;
          }
          let temp = {};
          let inrKeys = Object.keys(chartData[key]);
          temp['Type'] = titlepipe.transform(key);
          temp['Region'] = this.regions[element.region] ? this.regions[element.region].name : element.region;

          if (Object.keys(params).length && params['severity']) {
            temp[titlepipe.transform(params['severity'])] = chartData[key][params['severity']];
          } else {
            inrKeys.forEach(inrKey => {
              temp[titlepipe.transform(inrKey)] = chartData[key][inrKey];

            });
          }
          data.push(Object.assign(temp));

        });

      }

    });

    return data;

  }

  prepareAlarmCSVDataforLocation(locationdata: any, locations?: any, reportType = 'histoy', params = {}): any {
    let titlepipe = new TitleCasePipe();
    let data = [];
    locationdata?.forEach((element: any) => {
      let chartData = element.alarm;
      if (chartData && Object.keys(chartData).length) {
        let keys = Object.keys(chartData);
        keys.forEach(key => {
          if (reportType === 'active' && key === 'cleared') {
            return;
          }
          let temp = {};
          let inrKeys = Object.keys(chartData[key]);
          temp['Type'] = titlepipe.transform(key);

          if (locations && Object.keys(locations).length) {
            temp['Location'] = locations[element.location] ? locations[element.location].name : element.location;
          } else {
            temp['Location'] = this.locations[element.location] ? this.locations[element.location].name : element.location;
          }

          if (Object.keys(params).length && params['severity']) {
            temp[titlepipe.transform(params['severity'])] = chartData[key][params['severity']];
          } else {
            inrKeys.forEach(inrKey => {
              temp[titlepipe.transform(inrKey)] = chartData[key][inrKey];

            });
          }
          data.push(Object.assign(temp));

        });


      }

    });

    return data;

  }

  prepareAlarmCSVDataforSystem(systemdata: any, systems?: any, reportType = 'histoy', params = {}): any {
    let titlepipe = new TitleCasePipe();
    let data = [];
    systemdata?.forEach((element: any) => {
      let chartData = element.alarm;
      if (chartData && Object.keys(chartData).length) {
        let keys = Object.keys(chartData);
        keys.forEach(key => {
          if (reportType === 'active' && key === 'cleared') {
            return;
          }
          let temp = {};
          let inrKeys = Object.keys(chartData[key]);
          temp['Type'] = titlepipe.transform(key);

          if (systems && Object.keys(systems).length) {
            temp['System'] = systems[element.system] ? systems[element.system].name : element.system;
          } else {
            temp['System'] = this.systems[element.system] ? this.systems[element.system].name : element.system;
          }

          if (Object.keys(params).length && params['severity']) {
            temp[titlepipe.transform(params['severity'])] = chartData[key][params['severity']];
          } else {
            inrKeys.forEach(inrKey => {
              temp[titlepipe.transform(inrKey)] = chartData[key][inrKey];

            });
          }
          data.push(Object.assign(temp));

        });


      }

    });

    return data;

  }


  prepareAlarmCSVDataforDay(dayData: any, reportType = 'histoy', params = {}): any {
    let data = [];
    let titlepipe = new TitleCasePipe();

    let pipe = new DatePipe('en-US');

    dayData?.forEach((element: any) => {
      let chartData = element.alarm;
      if (chartData && Object.keys(chartData).length) {
        let keys = Object.keys(chartData);

        keys.forEach(key => {
          if (reportType === 'active' && key === 'cleared') {
            return;
          }
          let temp = {};
          let inrKeys = Object.keys(chartData[key]);
          temp['Type'] = titlepipe.transform(key);
          temp['Date Time'] = pipe.transform(new Date(element.time), 'short');

          if (Object.keys(params).length && params['severity']) {
            temp[titlepipe.transform(params['severity'])] = chartData[key][params['severity']];
          } else {
            inrKeys.forEach(inrKey => {
              temp[titlepipe.transform(inrKey)] = chartData[key][inrKey];

            });
          }
          data.push(Object.assign(temp));

        });


      }

    });

    return data;

  }

  prepareEventCSVDataforRegion(regiondata: any) {
    let data = [];
    if (regiondata && regiondata.length) {
      regiondata.forEach((element: any) => {
        let temp = {};
        temp['Region'] = this.regions[element.region] ? this.regions[element.region].name : element.region;
        data.push(Object.assign(temp, { 'Count': element.event ? element.event['count'] : 0 }));

      });
    }

    return data;

  }

  prepareEventCSVDataforLocation(locationdata: any, locations?: any): any {
    let data = [];
    if (locationdata && locationdata.length) {
      locationdata.forEach((element: any) => {
        let temp = {};

        if (locations && Object.keys(locations).length) {
          temp['Location'] = locations[element.location] ? locations[element.location].name : element.location;
        } else {
          temp['Location'] = this.locations[element.location] ? this.locations[element.location].name : element.location;
        }

        data.push(Object.assign(temp, { 'Count': element.event ? element.event['count'] : 0 }));

      });
    }

    return data;

  }

  prepareEventCSVDataforSystem(systemdata: any, systems?: any): any {
    let data = [];
    if (systemdata && systemdata.length) {
      systemdata.forEach((element: any) => {
        let temp = {};
        if (systems && Object.keys(systems).length) {
          temp['System'] = systems[element.system] ? systems[element.system].name : element.system;
        } else {
          temp['System'] = this.systems[element.system] ? this.systems[element.system].name : element.system;
        }

        data.push(Object.assign(temp, { 'Count': element.event ? element.event['count'] : 0 }));

      });
    }

    return data;

  }

  getSubTitleStr(chartType, datatype) {
    return this.subTitleObj[chartType][datatype];
  }

  userFilters = {
    alarm: {
      'byday': {},
      'severity': {},
      'region': {},
      'location': {},
      'system': {},
    },
    event: {
      'region': {},
      'location': {},
      'system': {},
    }
  }

  getUserFilters(chartType, datatype) {
    return this.userFilters[chartType][datatype];
  }

  setUserFilters(chartType, datatype, params) {
    return this.userFilters[chartType][datatype] = params;
  }

  getSubTitleForFullScreen(chartType?: any, datatype?: any) {
    let params = this.getUserFilters(chartType, datatype);
    let subTitle = '';

    let keys = Object.keys(params);
    if (keys.length > 0) {

      keys.forEach(key => {
        if (subTitle) {
          subTitle += ', ';
        }

        subTitle += `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language[key] ? this.language[key] : key}: ${this.language[params[key]] || params[key]}</span>`;

      });
    }

    return subTitle;
  }

  prepareAlarmCSVData(data: any, type = 'alarm') {
    let titlepipe = new TitleCasePipe();
    let pipe = new DatePipe('en-US');
    let exportData = [];
    // data.forEach((element: any) => {
    //   let temp = {};
    //   if (element && Object.keys(element).length) {
    //     let keys = Object.keys(element);

    //     keys.forEach(key => {
    //       if (element[key] && typeof element[key] === 'object' && Object.keys(element[key]).length) {
    //         let levelOneKeys = Object.keys(element[key]);
    //         levelOneKeys.forEach(levelOne => {
    //           if (element[key][levelOne] && typeof element[key][levelOne] === 'object' && Object.keys(element[key][levelOne]).length) {
    //             let levelTwoKeys = Object.keys(element[key][levelOne]);
    //             levelTwoKeys.forEach(levelTwo => {
    //               temp[levelTwo] = typeof element[key][levelOne][levelTwo] === 'object' ? element[key][levelOne][levelTwo]['value'] : element[key][levelOne][levelTwo];
    //             });
    //           } else {
    //             temp[levelOne] = element[key][levelOne];
    //           }

    //         });
    //       } else {
    //         temp[key] = element[key];
    //       }
    //     });
    //   }

    //   exportData.push(temp);

    // });

    data.forEach((fullData: any) => {

      let temp = {};
      temp = {
        'Reported Time': (fullData['subject'] && fullData['subject']['timeRaised']) ?
          pipe.transform(new Date(Number(fullData['subject']['timeRaised'])), 'short') : '',
        'Synced Time': fullData['time'] ? pipe.transform(new Date(Number(fullData['time'])), 'short') : ''
      }
      if (type === 'alarm') {
        temp['Alarm Name'] = fullData['subject'] ? fullData['subject'].alarmEventName : '';
        temp['Alarm Category'] = fullData['subject'] ? fullData['subject'].category : '';

        if (fullData['subject'] && fullData['subject']['transformedAlarms']) {
          temp['Resource'] = `${(fullData['subject'] && fullData['subject']['region']) ?
            fullData['subject']['region'] : ''}${(fullData['subject'] && fullData['subject']['location']) ?
              `/${fullData['subject']['location']}` : ''}${(fullData['subject'] && fullData['subject']['deviceName']) ?
                `/${fullData['subject']['deviceName']}` : ''}, ${(fullData['subject'] && fullData['subject']['transformedAlarms']) ?
                  fullData['subject']['transformedAlarms'] : ''} `;

          temp['Type'] = fullData['type'];
        } else {
          temp['Resource'] = `${(fullData['subject'] && fullData['subject']['region']) ?
            fullData['subject']['region'] : ''}${(fullData['subject'] && fullData['subject']['location']) ?
              `/${fullData['subject']['location']}` : ''}${(fullData['subject'] && fullData['subject']['deviceName']) ?
                `/${fullData['subject']['deviceName']}` : ''}, ${(fullData['subject'] && fullData['subject']['source']) ?
                  fullData['subject']['source'] : ''} `;
          temp['Type'] = (fullData && fullData['subject']) ?
            fullData['subject'].alarmType : '';
        }

        temp['Severity'] = fullData['subject'] ? fullData['subject'].perceivedSeverity : ''

      } else {
        temp['Event Name'] = fullData['subject'] ? fullData['subject'].alarmEventName : ''
        temp['Category'] = fullData['subject'] ? fullData['subject'].category : '';
      }

      temp['Decription'] = (fullData && fullData['subject']) ?
        fullData['subject'].description : '';
      temp['Details'] = (fullData && fullData['subject']) ?
        fullData['subject'].details : '';
      temp['Manual Acknowledged'] = (fullData && fullData['subject'] &&
        fullData['subject'].manualAcknowledged) ? 'Yes' : 'No';
      temp['Manual Shelved'] = (fullData && fullData['subject'] &&
        fullData['subject'].manualShelved) ? 'Yes' : 'No';
      temp['Repair Action'] = (fullData && fullData['subject']) ?
        fullData['subject'].repairAction : '';
      temp['Service Affecting'] = (fullData && fullData['subject'] &&
        fullData['subject'].serviceAffecting) ? 'Yes' : 'No';
      temp['Service Impacting'] = (fullData && fullData['subject'] &&
        fullData['subject'].serviceImpacting) ? 'Yes' : 'No';

      if (fullData && fullData['subject'] && fullData['subject']['transformedAlarms']) {
        temp['Source'] = fullData['subject']['transformedAlarms'];
      } else {
        temp['Source'] = fullData['subject']['source'];
      }

      temp['Notes'] = (fullData && fullData['subject']) ? fullData['subject'].notes
        : '';


      if (fullData && fullData['subject'] && typeof fullData['subject']['additionalAttributes'] === "object" && fullData['subject']['additionalAttributes']) {
        let keys = Object.keys(fullData['subject']['additionalAttributes']);

        keys.forEach(element => {
          temp[titlepipe.transform(element)] = typeof fullData['subject']['additionalAttributes'][element] === 'object' ? fullData['subject']['additionalAttributes'][element].value : fullData['subject']['additionalAttributes'][element];

        });

      }

      temp['Source'] = `\t${temp['Source']}`;
      if (temp['Repair Action']) {
        temp['Repair Action'] = temp['Repair Action'].replace(/,/g, '');
        temp['Repair Action'] = temp['Repair Action'].replace(/'/g, '');
      }

      if (temp['Notes']) {
        temp['Notes'] = temp['Notes'].replace(/,/g, '');
        temp['Notes'] = temp['Notes'].replace(/'/g, '');
      }

      // if (temp['Notes']) {
      //   temp['Notes'] = temp['Notes'].replace(/,/g, '\,');
      //   temp['Notes'] = temp['Notes'].replace(/'/g, '\'');
      //   temp['Notes'] = temp['Notes'].replace(/"/g, '""');
      // }

      exportData.push(temp);

    });

    return exportData;

  }

}

