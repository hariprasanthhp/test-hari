import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import * as Highcharts from "highcharts/highstock";
import { FaUtilsService } from '../../support-traffic-reports/service/fa-utils.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { formattedError } from '@angular/compiler';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import { lang } from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { LanguageServiceMode } from 'typescript';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);


@Injectable({
  providedIn: 'root'
})
export class SupportWifiChartOptionsService {
  public subject = new Subject<any>();
  // inputvalue: any;
  pieChartColurs = ['#0027FF', '#B926F0', '#5acfea', '#FF8238', '#FF489D'];
  pieChartColorsV212 = ['#0027FF', '#82BF00', '#836EE8', '#FF813E'];
  stackedColumnColors = ['#82bf00', '#349885', '#0027FF'];
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
  signalColors = ['#CFFEEF', '#FED7CF', '#F6FECF', '#FEEFCF', '#DFFECF', '#CFFED7', '#CFEEFE'];
  language: any;
  days: string;

  constructor(
    private utils: FaUtilsService,
    private dateUtils: DateUtilsService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  public airTimeAnalysisChart(data, type, radioSummary, lang?): any {
    let currentChannel: number | string = '';
    if (radioSummary && radioSummary[type] && radioSummary[type].Channel) {
      currentChannel = radioSummary[type].Channel ? radioSummary[type].Channel : '';
    } else {
      currentChannel = '';
    }
    let title

    title = this.language.Airtimechartitle(type, currentChannel, data.interfer.toFixed(1))
    /*   if (this.language.fileLanguage == 'en') {
         title = `${type}Hz ${currentChannel ? ' Channel ' + currentChannel : ''} has ${data.interfer.toFixed(1)}% interference`;
       }
       else if (this.language.fileLanguage == 'fr') {
         title = `Le ${currentChannel ? ' canal radio ' + currentChannel : ''} à ${type}Hz a ${data.interfer.toFixed(1)}% d’interférences
         `;
       }
       else if (this.language.fileLanguage == 'es') {
   
         title = ` ${data.interfer.toFixed(1)}% de interferencia en el ${currentChannel ? ' canal ' + currentChannel : ''} de ${type}Hz`;
   
       }
   */

    let options: any = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: `<span style="font-family: Lato; color: #000000; font-size: 14px; line-height: 1.1640625;">${title}</span>`
      },
      colors: environment.SUPPORT.WIFI.AIRTIME_ANALYSIS, // blue, green, orange
      // title: {
      //   style: {
      //     fontSize: '100%'
      //   },
      //   text: '',
      //   align: 'center',
      //   verticalAlign: 'middle',
      //   y: 10,
      // },
      tooltip: {
        //pointFormat: '{series.name} : {point.percentage:.1f}%',
        formatter: function () {
          return '<p>' + this.point.name + '<br/><span> Airtime: <strong>' + this.point.y.toFixed(1) + ' %</strong><br/></span></p>';
        },
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
            //format: '{point.name}<br>{point.percentage:.1f} %',

            style: {
              color: 'black'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Airtime',
        data: [
          [lang['Free'], data.free],
          [lang['Used'], data.used],
          [lang['Interference'], data.interfer],
        ]
      }]
    };
    return options;
  }

  public airTimeAnalysisChartV221(data, type, radioSummary, lang?): any {
    let currentChannel: number | string = '';
    if (radioSummary && radioSummary[type] && radioSummary[type].Channel) {
      currentChannel = radioSummary[type].Channel ? radioSummary[type].Channel : '';
    } else {
      currentChannel = '';
    }
    let title = `${type}Hz ${currentChannel ? ' Channel ' + currentChannel : ''} has ${data.interfer.toFixed(1)}% interference`;
    if (this.language.fileLanguage == 'fr') {
      title = `Le ${type}Hz ${currentChannel ? ' canal ' + currentChannel : ''} présente un pourcentage d'interférences de ${data.interfer.toFixed(1)}%`;
    }

    let options: any = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: `<span style="font-family: Lato; color: #000000; font-size: 14px; line-height: 1.1640625;">${title}</span>`,
        align: 'left'
      },
      colors: ['#82BF00', '#F7C343', '#E51A1A'], // lightgreen, yellow,  red
      // title: {
      //   style: {
      //     fontSize: '100%'
      //   },
      //   text: '',
      //   align: 'center',
      //   verticalAlign: 'middle',
      //   y: 10,
      // },
      tooltip: {
        //pointFormat: '{series.name} : {point.percentage:.1f}%',
        formatter: function () {
          return '<p>' + this.point.name + '<br/><span> Airtime: <strong>' + this.point.y.toFixed(1) + ' %</strong><br/></span></p>';
        },
      },
      legend: {
        //reversed: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 10,
        itemMarginBottom: 10
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
          //innerSize: '90%',
          dataLabels: {
            enabled: false,
            //format: '{point.name}<br>{point.percentage:.1f} %',

            style: {
              color: 'black'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Airtime',
        data: [
          [lang['Free'], data.free],
          [lang['Used'], data.used],
          [lang['Interference'], data.interfer],
        ]
      }]
    };
    return options;
  }

  public airTimeAnalysisChartV212(data, type, radioSummary, lang?): any {
    let currentChannel: number | string = '';
    if (radioSummary && radioSummary[type] && radioSummary[type].Channel) {
      currentChannel = radioSummary[type].Channel ? radioSummary[type].Channel : '';
    } else {
      currentChannel = '';
    }
    let title = `${type}Hz ${currentChannel ? ' Channel ' + currentChannel : ''} has ${data.interfer.toFixed(1)}% interference`;
    if (this.language.fileLanguage == 'fr') {
      title = `Le ${type}Hz ${currentChannel ? ' canal ' + currentChannel : ''} présente un pourcentage d'interférences de ${data.interfer.toFixed(1)}%`;
    }
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: this.pieChartColorsV212,
      title: {
        text: `<span style="font-family: Lato; color: #000000; font-size: 14px; line-height: 1.1640625;">${title}</span>`,
        align: 'left'
      },
      tooltip: {
        formatter: function () {
          return '<p>' + this.point.name + '<br/><span> Airtime: <strong>' + this.point.y.toFixed(1) + ' %</strong><br/></span></p>';
        },
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
        itemMarginBottom: 20,
        // x: -60,
        // y: 10
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
          size: '65%',
          center: [150, 150],
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
        }
      },
      series: [{
        name: 'Airtime',
        colorByPoint: true,
        data: [{
          name: lang['Free'],
          y: data.free,
        }, {
          name: lang['Used'],
          y: data.used
        }, {
          name: lang['Interference'],
          y: data.interfer
        }]
      }]
    }
    return object;
  }

  public historicalAirtimeAnlysis(cData, range, type, lang): Observable<{}> {

    let categories = [];
    let interfer = [];
    let used = [];
    let free = [];
    let percents;
    let numOfDays = '';
    let percentTotal = 0;
    let avgPercent: any = 0;

    let totalAnalysis = {

    }


    if (range == 'day') {
      numOfDays = this.language.interference_1days;//'interference over the last 1 day';
    } else if (range == 'past_week') {
      numOfDays = this.language.interference_7days;//'interference over the last 7 days';
    } else if (range == 'past_month') {
      numOfDays = this.language.interference_1month;//'interference over the last 1 month';
    } else {
      numOfDays = this.language.interference_range;//'interference over the selected range of days';
    }

    let l = 0;

    if (cData.length) {
      cData = this.sortByTimestamp(cData, 'timestamp');
    }
    cData.forEach(e => {
      categories.push(this.dateUtils.getChartFormat(e.timestamp));
      percents = this.calculatePercent(e);
      interfer.push(percents.interfer);
      used.push(percents.used);
      free.push(percents.free);
      percentTotal += percents.interfer;
      if (e['interference_avg'] != undefined && e['utilization_avg'] != undefined && (e['interference_avg'] != null || e['utilization_avg'] != null)) {
        l++;
      }

    });
    if (percentTotal && l) {
      avgPercent = (percentTotal / l).toFixed(1);
    }
    let title = this.language.historicalAirtimetitle(type,avgPercent,numOfDays)
    //let title = `${type} radio has averaged ${avgPercent}% ${numOfDays}`;
    //let title = `${type}  ${this.language.radio_has_averaged} ${avgPercent}% ${numOfDays}`;
    /*if (this.language.fileLanguage == 'fr') {
      if (range == 'day') {
        numOfDays = 'dernier jour';
      } else if (range == 'past_week') {
        numOfDays = 'des 7 derniers jours';
      } else if (range == 'past_month') {
        numOfDays = '1 dernier mois';
      } else {
        numOfDays = 'plage de jours sélectionnée';
      }

      title = `Le signal radio de ${type} a une moyenne d’interférences de ${avgPercent}% au cours ${numOfDays}`
    }
    if (this.language.fileLanguage == 'es') {
      if (range == 'day') {
        numOfDays = 'en el último 1 día';
      } else if (range == 'past_week') {
        numOfDays = 'en los últimos 7 días';
      } else if (range == 'past_month') {
        numOfDays = 'en el último 1 mes';

      } else {
        numOfDays = 'intervalo de días seleccionado';
      }

      title = `La banda de radio de ${type} ha promediado un ${avgPercent}% de interferencia ${numOfDays}`
    }*/

    const options = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'area'
      },
      title: {
        text: `<span style="font-family: Lato; color: #000000; font-size: 16px; line-height: 1.1640625;">${title}</span>`
      },
      //colors: ['#338107', '#fbe936', '#fa423b'], // green, yelllow, red
      colors: ['#0027FF', '#82BF00', '#836EE8'], // blue, green, violet
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      xAxis: {
        labels: {
          rotation: -45,
          // style: {
          //   fontSize: '13px',
          //   fontFamily: 'Verdana, sans-serif'
          // }
        },
        categories: categories,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        //tickInterval: 100,
        title: {
          text: (lang && lang.Percentage) ? `${lang.Percentage}(%)` : 'Percentage(%)'
        },
        // labels: {
        //   formatter() {
        //     return this.value / 1000;
        //   }
        // }
      },
      tooltip: {
        //headerFormat: '<b>{series.name}</b><br>',
        //pointFormat: '{point.percentage:.1f}%',
        shared: true,
        crosshairs: true,
        formatter: function () {
          var s = '<b>' + this.x + '</b>';

          $.each(this.points, function (i, point) {
            s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(1) + '%';
          });

          return s;
        },
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              // tslint:disable-next-line:object-literal-shorthand
              click: function () {
                // console.log('Category: ' + this.category + ', Series:' + this.series.name + ', value: ' + this.y);
              }
            }
          },
          turboThreshold: 1000000
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
        name: lang['Free'],
        data: free
      }, {
        name: lang['Used'],
        data: used
      }, {
        name: lang['Interference'],
        data: interfer,
      }]
    };
    return of(options);
  }

  public ChannelScoreChartOptionsOLd(cData, type, channelChangeLogs?, slfHeal?, radioSummary?): any {

    let categories = [];
    let scores = [];
    let color = 'red';
    let selfHeal = slfHeal ? 'On' : 'Off';
    if (type != '2.4G') {
      selfHeal = 'Off';
    }
    let currentChannel: number | string = '';
    if (radioSummary && radioSummary[type] && radioSummary[type].Channel) {
      currentChannel = radioSummary[type].Channel ? radioSummary[type].Channel : '';
    }

    if (cData.length) {
      cData.forEach(e => {
        e['timestamp'] = e.date ? new Date(e.date).getTime() : 0;
      });
      cData = cData = this.sortByTimestamp(cData, 'timestamp');

    }

    cData.forEach(e => {
      categories.push(this.dateUtils.getChartFormatDate(e.date, 'MMM dd'));
      color = 'red';
      if (e.score >= 4) {
        color = '#1d9e74';
      } else if (e.score >= 2) {
        color = 'yellow';
      }
      scores.push({ y: e.score, color: color });
    });

    const options = {
      //...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        scrollablePlotArea: {
          minWidth: 450,
          scrollPositionX: 1
        },
        events: {
          load: function () {
            var catLen = this.xAxis[0].categories.length - 1;
            this.xAxis[0].setExtremes(catLen - 6, catLen);
          }
        }
      },
      title: {
        text: `<span style="display: flex;justify-content: space-between;"><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${type}Hz Self Heal ${selfHeal} </span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> Current Channel ${currentChannel}</span></span>`
      },
      xAxis: {
        categories: categories,
        allowDecimals: false,
        min: 0,
        max: 4,
        scrollbar: {
          enabled: categories.length ? true : false
        },
      },
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
            radius: 6,
          },
          dataLabels: {
            align: 'center',
            enabled: true
          },
          color: 'grey'
        },
        series: {
          pointPlacement: 'on',
        }
      },
      series: [{
        name: 'Channel Score',
        marker: {
          symbol: 'circle'
        },
        data: scores,
        color: '#338107'

      }]
    };
    return options;
  }

  public ChannelScoreChartOptions(cData, type, lang?, channelChangeLogs?, slfHeal?, radioSummary?): any {

    var that = this;
    let categories = [];
    let categoriesTS = [];
    let scores = [];
    let color = 'red';
    let logType = '2.4g';
    let selfHeal = slfHeal ? 'On' : 'Off';
    if (type != '2.4G') {
      selfHeal = 'Off';
      logType = '5g';
    }
    let currentChannel: number | string = '';
    if (radioSummary && radioSummary[type] && radioSummary[type].Channel) {
      currentChannel = radioSummary[type].Channel ? radioSummary[type].Channel : '';
    }

    if (cData.length) {
      cData = this.removeDuplicate(cData, 'date');
      cData.forEach(e => {
        e['timestamp'] = e.date ? new Date(e.date).getTime() : 0;
      });
      cData = this.sortByTimestamp(cData, 'timestamp');

    }
    let zones = [];
    let scoreWithLogs = [];

    cData.forEach((e, i) => {
      categories.push(this.dateUtils.getChartFormatDate(e.date, 'MMM dd'));
      categoriesTS.push(e.timestamp);
      color = 'red';
      if (e.score >= 4) {
        color = '#1d9e74';
      } else if (e.score >= 2) {
        color = 'yellow';
      }
      scores.push({
        x: i,
        y: e.score,
        color: color,
        dType: 'score',
        timestamp: new Date(e.timestamp).setHours(0, 0, 0, 0),
        label: e.timestamp
      });
    });
    scoreWithLogs = scores.slice(0);
    let lastValue = scoreWithLogs[scoreWithLogs.length - 1];

    // channelChangeLogs = [{
    //   name: 'ChannelChangeLogs5G',
    //   result: [
    //     {
    //       TimeStamp: 1611939900,
    //       NewChannel: 149
    //     }
    //   ]
    // }]

    let logLine = [];

    if (channelChangeLogs) {
      let channelChangeLogsData = [];
      channelChangeLogs.forEach(e => {
        if (e.name === 'ChannelChangeLogs2.4G') {
          channelChangeLogsData['2.4g'] = e.result ? e.result : [];
        }
        if (e.name === 'ChannelChangeLogs5G') {
          channelChangeLogsData['5g'] = e.result ? e.result : [];
        }
      });
      if (channelChangeLogsData[logType] && channelChangeLogsData[logType].length) {
        channelChangeLogsData[logType].forEach(e => {
          //if (lastValue.timestamp >= parseInt(e.TimeStamp) * 1000) {
          scoreWithLogs.push({
            timestamp: parseInt(e.TimeStamp) * 1000,
            y: 3,
            color: color,
            dType: 'channel_log',
            logData: e,
            marker: {
              symbol: 'url(./assets/images/wrench_bw.png)'
            },
          });
          //}

        });

        scoreWithLogs = this.sortByTimestamp(scoreWithLogs, 'timestamp');
        scoreWithLogs.forEach((sc, index) => {
          if (sc.dType == 'channel_log') {
            let next, point, nextScoreIndex;
            let i = index;
            let sidx = index;
            for (i = index; i >= 0; i--) {
              if (scoreWithLogs[i] && scoreWithLogs[i].dType === 'score') {
                sidx = i;
                break;
              }
            }

            for (let j = index; j <= scoreWithLogs.length; j++) {
              if (scoreWithLogs[j] && scoreWithLogs[j].dType === 'score') {
                nextScoreIndex = j;
                break;
              }
            }

            next = scoreWithLogs[sidx].x + 1;
            //if there's no score data before channel change log
            if (sidx === index) {
              let tmp = new Date(scoreWithLogs[index].timestamp);
              scoreWithLogs[index].x = (tmp.getHours() * 60 * 60 + tmp.getMinutes() * 60 + tmp.getSeconds()) / (24 * 60 * 60) - 1;
            } else {
              let indxDif = nextScoreIndex - sidx;
              point = scoreWithLogs[sidx].x + ((scoreWithLogs[index].timestamp / 1000) - (scoreWithLogs[sidx].timestamp / 1000)) / (60 * 60 * 24);
              if (indxDif > 4 && point > scoreWithLogs[nextScoreIndex].x) {
                scoreWithLogs[index].x = scoreWithLogs[sidx].x + ((scoreWithLogs[index].timestamp / 1000) - (scoreWithLogs[sidx].timestamp / 1000)) / (60 * 60 * 24 * 10);
              } else {
                scoreWithLogs[index].x = point;
              }
            }
            scoreWithLogs[index]['label'] = scoreWithLogs[sidx].timestamp;
            logLine.push(scoreWithLogs[index]);
          } else {
            scoreWithLogs[index]['label'] = scoreWithLogs[index].timestamp;
          }

        });

        logLine.forEach(element => {
          element.y = 0;
        });
      }

    }

    scoreWithLogs.forEach((sc, index) => {
      if (sc.dType == 'score') {
        zones.push(sc);
      }
    });

    let title = ` ${type}Hz ${lang['Self Heal']} ${lang[selfHeal]}   ${lang.Current_Channel} ${currentChannel}`;
    let options = {
      //...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        scrollablePlotArea: {
          minWidth: 450,
          scrollPositionX: 1
        },
        events: {
          load: function () {
            var catLen = scores.length - 1;
            this.xAxis[0].setExtremes(catLen - 6, catLen);
          }
        }
      },
      title: {
        text: `<span style="display: flex;justify-content: space-between;"><span style="font-family: Lato; color: #000000; font-size: 14px; line-height: 1.1640625;"> ${title}</span></span>`
      },
      xAxis: {
        allowDecimals: false,
        tickWidth: 0,
        labels: {
          useHTML: true,
          formatter: function () {
            let x = this.value;
            let time;
            let match = scoreWithLogs.filter((e) => e.x == x);
            if (match.length && match[0].dType == 'score') {
              time = match[0].timestamp;
              return that.dateUtils.getChartFormatDate(time, 'MMM dd', true);
            } else {
              return '';
            }
          }
        },
        scrollbar: {
          enabled: (categories && categories.length && categories.length > 3) ? true : false
        },
      },
      yAxis: [{
        min: 0,
        max: 5,
        title: {
          text: lang.Channel_Score ? lang.Channel_Score : 'Channel Score'
        },
      }],
      plotOptions: {
        line: {
          marker: {
            radius: 6,
            enabled: true,
            enabledThreshold: 0
          },
          color: 'grey'
        },
        series: {
          pointPlacement: 'on',
          states: {
            inactive: {
              enabled: false
            }
          },
        }
      },
      tooltip: {
        formatter: function () {
          let point = this.point;
          var s = '';
          if (point.dType == 'score') {
            let time = zones[point.index].timestamp;
            let x = that.dateUtils.getChartFormatDate(time, 'MMM dd', true);
            s = '<b>' + x + '</b>';
            s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y;
          } else {
            let match = logLine.filter((el) => el.x == point.x);
            if (match && match.length) {
              let chnl = match[0].logData.NewChannel;
              let time = match[0].timestamp;
              let x = that.dateUtils.getChartFormatDate(time, 'MM/dd/yyyy HH:mm:ss', true);
              let data = ``;
              s = `<div><b>${x}</b><br/>
              <span>The system selected channel ${chnl} as the<br/>optimum channel and will continue to<br/>monitor the Wi-Fi experience</span></div>`
            }
          }
          return s;
        },
      },
      series: [{
        name: 'Channel Score',
        marker: {
          symbol: 'circle'
        },
        data: zones,
        color: '#338107',
        dataLabels: {
          align: 'center',
          enabled: true
        },
        showInLegend: false,
      },
      {
        name: null,
        marker: {
          symbol: 'circle'
        },
        data: logLine,
        color: 'transparent',
        showInLegend: false,
      }]
    };
    return options;
  }

  public getMeshTxExtendOptions(cData, days, lang): any {
    let categories = [];
    let categoriesTS = [];
    let transmitted = [];
    let received = [];
    let transmittedTotal = 0;
    let receivedTotal = 0;
    let transmittedTotalInfo = '0 Kb';
    let receivedTotalInfo = '0 Kb';
    let max = {
      tx: 0,
      rx: 0,
      txUnit: 'B',
      rxUnit: 'B',
    };

    var that = this;
    let reqCategoryLength = {
      '1': 96, //15min
      '2': 15, //1min
      '3': 72, //1hour
      '7': 168 //1hour
    }

    if (cData.length) {
      cData = this.sortByTimestamp(cData, 'time');
      cData = this.removeDuplicate(cData, 'time');
      if (days != '1') {
        let requiredDataCount = cData.length;

        if (cData.length != requiredDataCount) {
          cData = this.getFullCategoriesList(cData, requiredDataCount, days);

        }

      }

    }
    cData.forEach(e => {
      categories.push(this.dateUtils.getChartFormatDate(e.time, 'MM/dd/yyyy hh:mm', true));
      categoriesTS.push(e.time);
      e.bytesUp = e.bytesUp ? e.bytesUp : 0;
      e.bytesDown = e.bytesDown ? e.bytesDown : 0;

      transmitted.push(e.bytesUp);
      transmittedTotal += e.bytesUp;
      received.push(e.bytesDown);
      //received.push(-e.bytesDown);
      receivedTotal += e.bytesDown;
      if (max.tx < e.bytesUp) max.tx = e.bytesUp;
      if (max.rx < e.bytesDown) max.rx = e.bytesDown;
    });
    transmittedTotalInfo = this.getByteInfo(transmittedTotal);
    receivedTotalInfo = this.getByteInfo(receivedTotal);
    max.txUnit = this.getStackedUnit(max.tx)[1];
    max.rxUnit = this.getStackedUnit(max.rx)[1];

    // let options = {
    //   // ...this.commonHighChartOptions,
    //   credits: {
    //     enabled: false
    //   },
    //   chart: {
    //     type: 'line',
    //   },
    //   title: {
    //     text: 'TX RX Bytes'
    //   },
    //   xAxis: [{
    //     min: 0,
    //     //gridLineWidth: 1,
    //     categories: categories,
    //     crosshair: true,
    //   }],
    //   yAxis: [
    //     { // Primary yAxis
    //       //min: 0,
    //       allowDecimals: true,
    //       labels: {
    //         formatter: function () {
    //           var maxElement = Math.abs(this.axis.min);
    //           var unit = that.getStackedUnit(maxElement);
    //           var m = this.value;
    //           m = Math.abs(m);
    //           let displayValue = (m / unit[0]).toFixed(2);
    //           return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
    //         },
    //       },
    //       title: {
    //         text: 'TX RX Bytes',
    //         style: {
    //           color: '#727272'
    //         }
    //       },
    //       gridLineWidth: 0,
    //       minorGridLineWidth: 0,
    //       plotLines: [{
    //         value: 0,
    //         width: 1,
    //         color: '#aaa',
    //         zIndex: 10
    //       }]
    //     },
    //     // { // Secondary yAxis
    //     //   min: 0,
    //     //   allowDecimals: true,
    //     //   labels: {
    //     //     formatter: function () {
    //     //       var maxElement = this.axis.max;
    //     //       var unit = that.getStackedUnit(maxElement);
    //     //       var m = this.value;
    //     //       let displayValue = (m / unit[0]).toFixed(2);
    //     //       return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
    //     //     },
    //     //     style: {
    //     //       color: '#7cb5ec'
    //     //     },

    //     //   },
    //     //   title: {
    //     //     text: 'Rx Bytes',
    //     //     style: {
    //     //       color: '#727272'
    //     //     }
    //     //   },
    //     //   reversed: true,
    //     //   //opposite: true
    //     // }
    //   ],
    //   tooltip: {
    //     shared: true,
    //     crosshairs: true,
    //     formatter: function () {
    //       var s = '<b>' + this.x + '</b>';
    //       let p = 0;
    //       $.each(this.points, function (i, point) {
    //         if (point.series.name) {
    //           if (point.series.name.indexOf('Transmitted') > -1) {
    //             s += '<br/><p><span style="color:' + point.color + '">\u25CF</span> <span>Transmitted: <strong>' + that.getByteInfo(point.y) + '</strong><br/></span></p>';
    //           } else {
    //             p = Math.abs(point.y);
    //             s += '<br/><p><span style="color:' + point.color + '">\u25CF</span> <span>Received: <strong>' + that.getByteInfo(p) + '</strong><br/></span></p>';
    //           }
    //         }
    //       });

    //       return s;
    //     },
    //   },
    //   series: [
    //     {
    //       name: `Total Transmitted ${transmittedTotalInfo}`,

    //       data: transmitted,
    //       color: '#35c7fc'
    //     },
    //     {
    //       name: `Total Recieved  ${receivedTotalInfo}`,
    //       data: received,
    //       color: '#F7C343',
    //       //yAxis: 1,
    //     }],
    //   plotOptions: {
    //     series: {
    //       // ...this.plotOptions,
    //       cursor: 'pointer',
    //       pointPadding: 2, // Defaults to 0.1
    //       // groupPadding: 0.1,
    //       marker: {
    //         enabled: false
    //       },
    //       pointPlacement: 'on',
    //       point: {
    //         events: {

    //         }
    //       }
    //     }
    //   },
    //   responsive: {
    //     rules: [{
    //       condition: {
    //       },
    //     }]
    //   }
    // }
    let options
    const self = this;
    options = {
      // ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      lang: {
        noData: !cData?.length ? this.language["No Data Available"] : ""
      },
      chart: {
        type: 'line',
        events: {
          load: function () {
            let x = 0, element;
            document.querySelectorAll(".highcharts-grid-line").forEach((elem) => {
              const xVal = Number(elem.getAttribute("d").split(" ")[1]);
              if (xVal < x || x == 0) {
                x = xVal;
                element = elem;
              }
            });
            if (element) element.classList.add("d-none");
          }
        }
      },
      title: {
        text: (lang && lang.TX_RX_Bytes) ? lang.TX_RX_Bytes : 'TX RX Bytes'
      },
      xAxis: [{
        min: 0,
        gridLineWidth: 2,

        categories: categoriesTS,
        labels: {
          rotation: -55,
          formatter: function () {
            let x = this.value;
            return that.dateUtils.getChartFormatDate(x, 'MM/dd/yyyy hh:mm a', true);
          },
        },
        crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,

          allowDecimals: true,
          labels: {
            formatter: function () {
              //var maxElement = Math.abs(this.axis.min);
              var maxElement = Math.abs(this.axis.max);
              var unit = that.getStackedUnit(maxElement);
              var m = this.value;
              m = Math.abs(m);
              let displayValue = (m / unit[0]).toFixed(2);
              return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
            },
          },

          title: {

            text: (lang && lang.TX_RX_Bytes) ? lang.TX_RX_Bytes : 'TX RX Bytes',
            style: {
              color: '#727272'
            }
          },
          // gridLineWidth: 0,
          // minorGridLineWidth: 0,
          // plotLines: [{
          //   value: 0,
          //   width: 1,
          //   color: '#aaa',
          //   zIndex: 10
          // }]
        }
      ],
      tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function () {
          let x = that.dateUtils.getChartFormatDate(this.x, 'MM/dd HH:mm', true)
          var s = '<b>' + x + '</b>';
          let p = 0;
          $.each(this.points, function (i, point) {
            if (point.series.name) {
              if(point.series.name.indexOf(that.language["Transmitted"])>-1)
              {
              //if (point.series.name.indexOf('Transmitted') > -1 || point.series.name.indexOf('transmis') > -1) {
                s += '<br/><p><span style="color:' + point.color + '">\u25CF</span> <span>  ' + that.language["Transmitted"] +':'+' <strong>' + that.getByteInfo(point.y) + '</strong><br/></span></p>';
              } else {
                p = Math.abs(point.y);
                s += '<br/><p><span style="color:' + point.color + '">\u25CF</span> <span>' + that.language["Received"] +':'+'  <strong>' + that.getByteInfo(p) + '</strong><br/></span></p>';
              }
            }
          });

          return s;
        },
      },
      series: [
        {
          name: `${(lang && lang['Total Transmitted']) ? lang['Total Transmitted'] : 'Total Transmitted'} ${transmittedTotalInfo}`,

          data: transmitted,
          color: '#0027FF' //blue
        },
        {
          name: `${(lang && lang['Total Received']) ? lang['Total Received'] : 'Total Received'}  ${receivedTotalInfo}`,
          data: received,
          color: '#5ACFEA', // green
          //yAxis: 1,
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
          pointPlacement: 'on',

          point: {

            events: {


              click: function () {

                if (days == '1') {
                  const inputs = {
                    period: "2",
                    endTime: this.category

                  }
                  self.subject.next(inputs)
                  // self.inputvalue = inputs
                }
              }
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      },
      // additionalValie: this.inputvalue
    }

    return options;
  }

  public getDownstreamOptions(data, type, lang?): any {


    let transmitted = [];

    var that = this;
    let pktsDroppedDwn = [];
    let pktsTxDown = [];
    let pktsReTxDwn = [];
    let time = [];
    let categories = [];
    let typeString = `${type}Hz`;
    if (data.length) {
      data = this.sortByTimestamp(data, 'timestamp');
    }
    data.forEach(function (element, value, index) {
      if (element.packetstransmitteddownstream >= 0 && element.packetsdroppeddownstream >= 0 && element.packetretransmitteddownstream >= 0) {
        if (element.packetstransmitteddownstream != 0) {
          let pktsTxDwn = Math.round(element.packetstransmitteddownstream * 100) / 100;
          pktsTxDown.push(pktsTxDwn);
          let pktsDroppdDown = (element.packetsdroppeddownstream / element.packetstransmitteddownstream) * 100;
          pktsDroppdDown = Math.round(pktsDroppdDown * 100) / 100;
          pktsDroppedDwn.push(pktsDroppdDown);
          let pktsReTxDown = (element.packetretransmitteddownstream / element.packetstransmitteddownstream) * 100;
          pktsReTxDown = Math.round(pktsReTxDown * 100) / 100;
          pktsReTxDwn.push(pktsReTxDown);
          if (type != '2.4G' && (pktsTxDwn < 0 || pktsDroppdDown < 0 || pktsReTxDown < 0)) {
          }

        } else {
          pktsTxDown.push(0);
          pktsDroppedDwn.push(0);
          pktsReTxDwn.push(0);
        }
        let time = that.dateUtils.getChartFormatDate(element.timestamp, "MM/dd HH:mm");
        categories.push(time);
      }

    });

    let options = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line'
      },
      title: {
        text: `<span style="font-family: Lato; color: #000000; font-size: 16px; line-height: 1.1640625;">${typeString} ${!categories.length ? ' - ' + that.language["No Data Available"] : ''} </span>`
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}'
        },
        title: {
          text: (lang && lang['Packets Retransmitted - Down (%)']) ? lang['Packets Retransmitted - Down (%)'] : 'Packets Retransmitted - Down (%)'
        }
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: (lang && lang['Packets Dropped - Down (%)']) ? lang['Packets Dropped - Down (%)'] : 'Packets Dropped - Down (%)'
        },
        labels: {
          format: '{value}'
        },
        opposite: true
      }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: (lang && lang['Packets Transmitted - Down']) ? lang['Packets Transmitted - Down'] : 'Packets Transmitted - Down'
        },
        labels: {
          format: '{value}'
        },
        opposite: true
      }],
      plotOptions: {
        line: {
          enableMouseTracking: true,
        },
        series: {
          marker: {
            enabled: false
          }
        }
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: [
        {
          name: (lang && lang['Packets Retransmitted - Down (%)']) ? lang['Packets Retransmitted - Down (%)'] : 'Packets Retransmitted - Down (%)',
          color: '#FF8238', // orange
          data: pktsReTxDwn
        }, {
          name: (lang && lang['Packets Dropped - Down (%)']) ? lang['Packets Dropped - Down (%)'] : 'Packets Dropped - Down (%)',
          color: '#E51A1A', // red
          yAxis: 1,
          data: pktsDroppedDwn
        }, {
          name: (lang && lang['Packets Transmitted - Down']) ? lang['Packets Transmitted - Down'] : 'Packets Transmitted - Down',
          color: '#5ACFEA', // light-blue
          yAxis: 2,
          data: pktsTxDown
        }
      ],
      legend: {
        align: 'center',
        //verticalAlign: 'top',
        //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      exporting: {
        enabled: false
      }
    }

    return options;
  }

  public SignalStrengthChartOptions(cData, days, lang, steering?, association?): any {

    let categories = [];
    let categoriesTS = [];
    let phyrateUp = [];
    let phyrateDown = [];
    let bytesUp = [];
    let bytesDown = [];
    let rssi = [];
    let phyrateUpTotal = 0;
    let phyrateDownTotal = 0;
    let rssiTotal = 0;
    let phyrateUpTotalInfo;
    let phyrateDownTotalInfo;
    let rssiTotalInfo;
    var that = this;
    let c = cData ? cData.length : 0;
    let lineClrs = {
      phyUp: '#FF8238', // orange
      phyDown: '#0027FF', // blue
      strength: '#5ACFEA' // green
    }
    if (!cData || !cData.length) {
      //return;
    }

    // if (cData.length) {
    //   cData = this.sortByTimestamp(cData, 'time');
    // }
    let reqCategoryLength = {
      '1': 96, //15min
      '2': 15,  //1min
      '3': 72, //1hour
      '7': 168 //1hour
    }
    if (cData.length) {
      cData = this.sortByTimestamp(cData, 'time');
      cData = this.removeDuplicate(cData, 'time');
      if (days != '1') {
        let requiredDataCount = cData.length;

        if (cData.length != requiredDataCount) {
          cData = this.getFullCategoriesList(cData, requiredDataCount, days);

        }
      }

    }

    cData.forEach((e, i) => {
      categories.push(this.dateUtils.getChartFormatDate(e.time, 'MM/dd hh:mm', true));
      categoriesTS.push(e.time);
      e.phyrateUp = e.phyrateUp ? e.phyrateUp : 0;
      e.phyrateDown = e.phyrateDown ? e.phyrateDown : 0;
      e.bytesUp = e.bytesUp ? e.bytesUp : 0;
      e.bytesDown = e.bytesDown ? e.bytesDown : 0;
      e.rssi = e.rssi ? e.rssi : null;
      // phyrateUp.push(e.phyrateUp);
      // phyrateDown.push(e.phyrateDown);
      phyrateUp.push({ realX: e.time, x: i, y: e.phyrateUp });
      phyrateDown.push({ realX: e.time, x: i, y: e.phyrateDown });
      rssi.push({ realX: e.time, x: i, y: e.rssi });

      /*
      phyrateUp.push([e.time, e.phyrateUp]);
      phyrateDown.push([e.time, e.phyrateDown]);
      rssi.push([e.time, e.rssi]);
      */

      bytesUp.push(e.bytesUp);
      bytesDown.push(e.bytesDown);

      phyrateUpTotal += e.phyrateUp;
      phyrateDownTotal += e.phyrateDown;
      rssiTotal += e.rssi ? e.rssi : 0;
    });
    phyrateUpTotalInfo = this.getByteInfo(phyrateUpTotal);
    phyrateDownTotalInfo = this.getByteInfo(phyrateDownTotal);
    rssiTotalInfo = rssiTotal ? (rssiTotal / c) : 0;
    let colors = ['#CFFEEF', '#FED7CF', '#F6FECF', '#FEEFCF', '#DFFECF', '#CFFED7', '#CFEEFE'];
    let labelDividers = {
      K:100,
      M: 1000,
      G: 1000000,
      TG: 1000000000,
    }
    const self = this;
    let object = {
      credits: {
        enabled: false
      },
      chart: {
        //type: 'line',
        //plotBackgroundColor: '#f6f6f6',
      },
      title: {
        text: (lang && lang.Signal_Strength_PHY_Rate) ? lang.Signal_Strength_PHY_Rate : 'Signal Strength & Phy Rate'
      },
      lang: {
        noData: !cData?.length ? this.language["No Data Available"] : ""
      },
      xAxis: [{
        tickInterval: 1,
        type: 'datetime',
        //tickWidth: 0,
        categories: categoriesTS,
        //tickInterval: 1,
        //min: 0,
        //ordinal: true,
        labels: {
          rotation: -55,
          formatter: function () {
            let x = this.value;
            return that.dateUtils.getChartFormatDate(x, 'MM/dd/yyyy hh:mm a', true);
          },
        },

      }],
      yAxis: [
        { // Primary yAxis
          allowDecimals: true,
          labels: {
            format: '{value}',
            enabled: true
          },

          title: {
            text: (lang && lang.Signal_Strength) ? lang.Signal_Strength + ' dBm' : 'Signal Strength dBm',
          },
          //opposite: true,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: '#ffffff'
        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            //format: '{value} KB',
            formatter: function () {
              var maxElement = this.axis.max;
              var unitsonly = that.kbpsTO(maxElement, false, true);
              var maxElementValue = that.kbpsTO(maxElement, true);
              var m = this.value;
              let displayValue = (m / labelDividers[unitsonly]).toFixed(2);
              return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unitsonly + 'bps';
            },
          },
          title: {
            text: (lang && lang['Up/Down Phy Rate']) ? lang['Up/Down Phy Rate'] : 'Up/Down Phy Rate',
          },
          opposite: true,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: '#ffffff',
        },
        { // Third yAxis for Association/Disasociation
          allowDecimals: true,
          labels: {
            format: '{value}',
            enabled: false
          },

          title: {
            text: null,
          },
          //opposite: true,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: '#ffffff',
          min: 0,
          max: 100,
          //colors: colors
        },
      ],
      tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function () {
          let x = that.dateUtils.getChartFormatDate(this.x, 'MM/dd HH:mm', true)
          var s = '<b>' + x + '</b>';
          let unit;
          let signal;
          $.each(this.points, function (i, point) {
            if (point.series) {
              if (point.series.name == 'Up Phy Rate' || point.series.name == 'Down Phy Rate' || point.series.name == 'Débit Phy amont' || point.series.name == 'Débit Phy aval') {
                unit = that.kbpsTO(point.y);
                s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + that.kbpsTO(point.y, true) + ' ' + that.kbpsTO(point.y, false, true) + 'bps';
              } else if (point.series.name == 'Signal Strength' || point.series.name == 'Puissance du signal') {
                signal = point.y ? point.y : '';
                s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + signal + ' dBm';
              } else {
                let p = point.point;
                if (p.series.area && p.series.processedYData[p.index]) {
                  let start, end, startTime, endTime;
                  if (p.index == 0) {
                    start = p.category;
                    end = p.series.processedXData[p.index + 1];
                  } else {
                    if (p.series.processedYData[p.index - 1]) {
                      start = p.series.processedXData[p.index - 1];
                      end = p.category;
                    } else {
                      start = p.category;
                      end = p.series.processedXData[p.index + 1];
                    }
                  }

                  startTime = that.dateUtils.getChartFormatDate(start, 'MM/dd HH:mm', true);
                  endTime = that.dateUtils.getChartFormatDate(end, 'MM/dd HH:mm', true);
                  s += '<br/><span style="color:' + p.color + '">\u25CF</span> ' + p.series.name + ': ' + startTime + ' - ' + endTime;
                } else {
                  return false;
                }
              }
            }
          });

          return s;
        },
      },
      series: [
        {
          // name: `Signal Strength ${rssiTotalInfo}`,
          type: 'line',
          name: (lang && lang.Signal_Strength) ? lang.Signal_Strength : 'Signal Strength',
          data: rssi,
          color: lineClrs.strength,
          legendIndex: 0,
        },
        {
          //name: `phyrateUp ${phyrateUpTotalInfo}`,
          type: 'line',
          name: (lang && lang['Up Phy Rate']) ? lang['Up Phy Rate'] : 'Up Phy Rate',
          yAxis: 1,
          data: phyrateUp,
          color: lineClrs.phyUp,
          legendIndex: 1,
        },
        {
          //name: `phyrateDown ${phyrateDownTotalInfo}`,
          type: 'line',
          name: (lang && lang['Down Phy Rate']) ? lang['Down Phy Rate'] : 'Down Phy Rate',
          yAxis: 1,
          data: phyrateDown,
          color: lineClrs.phyDown,
          legendIndex: 2,
        },

      ],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          pointPlacement: 'on',
          point: {
            events: {
              click: function () {

                if (days == '1') {
                  const inputs = {
                    period: "2",
                    endTime: new Date(this.category).toString().substring(0, 21) + ':00'

                  }
                  self.subject?.next(inputs)
                  // self.inputvalue = inputs
                }
              }
            }
          },
          turboThreshold: 10000000
        }
      }
    };
    if (days == '1' && object.xAxis[0]?.type) {
      delete object.xAxis[0]?.type;
      object.xAxis[0]['breakSize'] = 3600000;
    }
    return of(object);

    /*
  
  
  
    let object = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        plotBackgroundColor: '#f6f6f6',
      },
      title: {
        text: 'Signal Strength & Phy rate'
      },
      xAxis: [{
        categories: categories,
        crosshair: true,
        min: 0,
        //gridLineWidth: 1,
      }],
      yAxis: [
        { // Primary yAxis
          allowDecimals: true,
          labels: {
            format: '{value}',
            enabled: true
          },
  
          title: {
            text: 'Signal Strength dBm',
          },
          //opposite: true,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: '#ffffff'
        },
        { // Secondary yAxis
          min: 0,
          allowDecimals: true,
          labels: {
            //format: '{value} Mbps',
            formatter: function () {
              var maxElement = this.axis.max;
              var unitsonly = that.kbpsTO(maxElement, false, true);
              var maxElementValue = that.kbpsTO(maxElement, true);
              var m = this.value;
              let displayValue = (m / labelDividers[unitsonly]).toFixed(2);
              return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unitsonly + 'bps';
            },
          },
          title: {
            text: 'Up/Down Phy Rate',
          },
          opposite: true,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: '#ffffff',
        },
      ],
      tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function () {
          var s = '<b>' + this.x + '</b>';
          let unit;
          $.each(this.points, function (i, point) {
            if (point.color == lineClrs.phyUp || point.color == lineClrs.phyDown) {
              unit = that.kbpsTO(point.y);
              s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + that.kbpsTO(point.y, true) + ' ' + that.kbpsTO(point.y, false, true) + 'bps';
            } else {
              s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y + ' dBm';
            }
  
          });
  
          return s;
        },
      },
      series: [
        {
          // name: `Signal Strength ${rssiTotalInfo}`,
          name: `Signal Strength`,
          data: rssi,
          color: lineClrs.strength
  
        },
        {
          //name: `phyrateUp ${phyrateUpTotalInfo}`,
          name: `Up Phy Rate`,
          yAxis: 1,
          data: phyrateUp,
          color: lineClrs.phyUp
  
        },
        {
          //name: `phyrateDown ${phyrateDownTotalInfo}`,
          name: `Down Phy Rate`,
          yAxis: 1,
          data: phyrateDown,
          color: lineClrs.phyDown
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
          pointPlacement: 'on',
          point: {
            events: {
  
            }
          }
        }
      }
    };
    return object;
  */
  }

  getNearestDate(date, list) {
    // let closest = list.reduce((a, b) => a - date < b - date ? a : b);
    let closest = list.reduce((prev, curr) => Math.abs(curr - date) < Math.abs(prev - date) ? curr : prev);
    return closest;
  }


  getAreaPlotsForAssociations(categoriesTS, IsAsso, dataList) {
    let cLen = categoriesTS.length;
    let closestStart;
    let closestEnd;
    let areaData = []
    let nullArray = Array.apply(null, Array(cLen)).map(_ => null);
    let data = nullArray.slice(0);
    if (Object.keys(dataList).length) {
      for (let key in dataList) {
        data = nullArray.slice(0);
        dataList[key].forEach(el => {
          closestStart = this.getNearestDate(el.from, categoriesTS);
          closestEnd = this.getNearestDate(el.to, categoriesTS);
          categoriesTS.forEach((c, i) => {
            if (c >= closestStart && c <= closestEnd) {
              data[i] = 100;
            }
          });
        });
        areaData.push({
          type: 'area',
          name: key,
          yAxis: 2,
          data: data,
          //color: IsAsso ? '#BDCABD' : '#BDCABD',
          legendIndex: 5,
        });
        data = [];

      }

    }

    return areaData;
  }

  getStartEndLines(categoriesTS, start, end, inventeryData) {
    let cLen = categoriesTS.length;
    let closestStart, closestEnd;
    let areaData = {}
    let normalLine = Array.apply(null, Array(cLen)).map(_ => null);
    let dashedLine = Array.apply(null, Array(cLen)).map(_ => null);


    categoriesTS.forEach((el, i) => {
      if (el == start) {
        closestStart = i;
      }
      if (el == end) {
        closestEnd = i;
      }
    });

    categoriesTS.forEach((el, i) => {
      if (el >= closestStart && el <= closestEnd) {
        normalLine[i] = inventeryData[i]; // yaxis value
      } else {
        dashedLine[i] = inventeryData[i];
      }

      if (el == closestStart || el == closestStart) {
        dashedLine[i] = inventeryData[i];
      }
    });

    areaData = {
      normalLine: normalLine,
      dashedLine: dashedLine,
    }
    return areaData;
  }

  getAreaPlotsForSteering(categoriesTS, dataList) {
    let xValue = categoriesTS.slice(0);
    let cLen = categoriesTS.length;
    let closestStart;
    let closestEnd;
    let areaData = []
    let nullArray = Array.apply(null, Array(cLen)).map(_ => null);
    let data = nullArray.slice(0);
    let area = [];
    if (Object.keys(dataList).length) {
      let clr = 0, clrLen = this.signalColors.length;
      for (let key in dataList) {
        data = nullArray.slice(0);
        dataList[key].forEach((el, i) => {
          el.to = (el.to == null) ? xValue[cLen - 1] : el.to;
          //closestStart = this.getNearestDate(el.from, categoriesTS);
          //closestEnd = this.getNearestDate(el.to, categoriesTS);
          if (i != 0) {
            area.push([el.from - 10, null]);
          }
          area.push([el.from, 100]);
          area.push([el.to, 100]);
          area.push([el.to - 10, null]);
          //area.push([Math.ceil(el.to / 1000) * 1000, 0]);
          // categoriesTS.forEach((c, i) => {
          //   if (c >= closestStart && c <= closestEnd) {
          //     data[i] = 100;
          //   }
          // });
        });
        areaData.push({
          type: 'area',
          name: key,
          //xAxis: 1,
          yAxis: 2,
          data: area,
          //color: this.signalColors[clr],
          legendIndex: 5,
          myData: dataList[key]
        })
        data = [];
        area = [];
        clr++;
        if (clr > clrLen) {
          clr = 0;
        }

      }

    }


    // areaData = [];
    // areaData.push({
    //   type: 'area',
    //   name: 'test',
    //   xAxis: 1,
    //   yAxis: 2,
    //   data: [[1611710726775, 100], [1611710783460, 100], [1611710784000, 0], [1612158616792, 100], [1612158673469, 100], [1612158674000, 0], [1612161241336, 100], [1612161433475, 100], [1612161434000, 0]],
    //   //color: this.signalColors[clr],
    //   legendIndex: 5,
    // })

    return areaData;
  }

  getDataBtwTwoTimeStamps(array, from, to) {
    let newData = [];
    newData = array.filter((element) => from >= element.time && to <= element.time);
  }


  calculatePercent(cData: any) {

    if (cData['interference_avg'] == null && cData['utilization_avg'] == null) {
      return {
        interfer: null,
        used: null,
        free: null
      };
    }

    let interfer = cData['interference_avg'] ? parseFloat(cData['interference_avg']) : 0;
    let used = cData['utilization_avg'] ? parseFloat(cData['utilization_avg']) : 0;
    let free = 1000 - (interfer + used);
    let percents = {
      interfer: 0,
      used: 0,
      free: 0
    }
    if (interfer) {
      percents.interfer = (interfer / 1000) * 100;
    }
    if (used) {
      percents.used = (used / 1000) * 100;
    }
    if (free) {
      //percents.free = (free / 1000) * 100;
      percents.free = 100 - (percents.interfer + percents.used);
    }

    return percents;

  }

  getStackedUnit(m) {
    let unit: any;
    if (m > 1099511627776) {
      unit = [1099511627776, 'TB'];
    } else if (m > 1073741824) {
      unit = [1073741824, 'GB'];
    } else if (m > 1048576) {
      unit = [1048576, 'MB'];
    } else if (m > 1024) {
      unit = [1024, 'KB'];
    } else if (m < 1024) {
      unit = [1024, 'KB'];
    } else {
      unit = [1, 'KB'];
    }
    return unit;
  }

  getStackedUnitUpdate(m) {
    let unit: any;
    if (m > 1099511627776) {
      unit = [1099511627776, 'T'];
    } else if (m > 1073741824) {
      unit = [1073741824, 'G'];
    } else if (m > 1048576) {
      unit = [1048576, 'M'];
    } else if (m > 1024) {
      unit = [1024, 'K'];
    } else {
      unit = [1, ''];
    }
    return unit;
  }

  kbpsTO(m, valueOnly?, UnitOnly?) {
    let unit: any;
    let units: any = [];
    m = parseInt(m);
    if (m > 1000000000) {
      unit = (m / 1000000000).toFixed(2) + 'T';
      units = [(m / 1000000000).toFixed(2), 'T'];
    } else if (m > 1000000) {
      unit = (m / 1000000).toFixed(2) + 'G';
      units = [(m / 1000000).toFixed(2), 'G'];
    } else if (m > 1000) {
      unit = (m / 1000).toFixed(2) + 'M';
      units = [(m / 1000).toFixed(2), 'M'];
    } else {
      unit = m + 'K';
      units = [m, 'K'];
    }
    if (valueOnly) {
      return units[0];
    } else if (UnitOnly) {
      return units[1];
    }
    return unit;
  }

  getByteInfo(pointValue, bps?) {
    let unit;
    if (bps) {
      unit = this.getStackedUnitUpdate(pointValue);
    } else {
      unit = this.getStackedUnit(pointValue);
    }
    let displayValue = (pointValue / unit[0]).toFixed(2);
    return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
  }

  sortByTimestamp(list, key) {
    list.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      return x[key] - y[key];
    });
    return list;
  }

  removeDuplicate(list, key) {
    let elements = list.reduce(function (previous, current) {
      // current[key] = new Date(current[key]).toString().substring(0, 21)

      // var object = previous.filter(object => new Date(object[key]).toString().substring(0, 21) === current[key]);
      var object = previous.filter(object => object[key] === current[key]);
      if (object.length == 0) {
        // current.time = new Date(current.time)
        // current.time = new Date(current.time).getTime()
        previous.push(current);
      }
      return previous;
    }, []);

    return elements;
  }


  dummySteeringData() {
    let dummy = [
      {
        "sta": "78:7E:61:C6:AF:EE",
        "reason": 0,
        "technique": 0,
        "mode": 1,
        "status": 1,
        "startTime": 1611568800000,
        "endTime": 1611572400000,
        "start": {
          "accessPoint": "260123123123",
          "radio": "2.4GHz",
          "ssid": "CityWest"
        },
        "target": {
          "accessPoint": "260123123123",
          "radio": "5GHz",
          "ssid": "CityWest"
        },
        "end": {
          "accessPoint": "260123123123",
          "radio": "5GHz",
          "ssid": "CityWest"
        }
      },
      {
        "sta": "78:7E:61:C6:AF:EE",
        "reason": 0,
        "technique": 0,
        "mode": 1,
        "status": 1,
        "startTime": 1611788400000,
        "endTime": 1611792000000,
        "start": {
          "accessPoint": "260123123123",
          "radio": "5 GHZ",
          "ssid": "CityWest"
        },
        "target": {
          "accessPoint": "260123123123",
          "radio": "2.4GHz",
          "ssid": "CityWest"
        },
        "end": {
          "accessPoint": "260123123123",
          "radio": "2.4GHz",
          "ssid": "CityWest"
        }
      }
    ];

    return dummy;
  }

  getFullCategoriesList(data, lengthOfCategory, days) {
    let modifiedData = [];
    let modifiedCategories = [];
    let dataLen = data.length;
    let startTime = data[dataLen - 1].time;
    let match;

    for (let i = 0; i < lengthOfCategory; i++) {
      modifiedCategories.push(startTime);
      startTime -= 3600000;
    }
    modifiedCategories.sort(function (a, b) { return a - b });

    modifiedCategories.forEach(time => {
      match = data.filter((e) => e.time == time);
      if (match.length) {
        modifiedData.push(match[0]);
        match = [];
      } else {
        modifiedData.push({
          bytesDown: null,
          bytesUp: null,
          phyrateDown: null,
          phyrateUp: null,
          rssi: null,
          time: time,
        });
      }
    });


    return modifiedData;

  }

  dummySteeringData2() {
    let data = [{ "sta": "74:d8:3e:96:bf:8b", "startTime": 1611553643460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611551433460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611551303462, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611555643458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611553053459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611557123466, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611560633460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611561153468, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611554933458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611560503458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611560713489, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611556863457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611559613460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611556603459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611552793459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611564373459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611563673472, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611566103469, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611566293458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611556733460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611556993461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611566443458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611568543459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611566633459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611569233459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611551113461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611564173458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611568683461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611570183458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611568823458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611569763459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611570733459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611558703461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611570053460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611578993459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611575493459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611577483458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611572873459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611572713459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611557253459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611573033459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611574113457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611570863461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611570323460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611575363458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611576603459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611573983459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611579153459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611580113458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611574263459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611579973457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611581883459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611585453461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611582653460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611582943459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611584603458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611585843460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611581353458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611583593461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611580583460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611586683459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611588323461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611586223459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611589523457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611585653459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611589653461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611596323458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611586833458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611591173463, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611597093458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611591503459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611588703458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611591363459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611588923459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611600943452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611598313459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611601663452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611595363460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611598183457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611599803469, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611589783460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611595553459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611601083453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611591653457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611602983453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611597233460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611601793452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611589113459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611603553452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611606293452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611610963453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611608183451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611606453452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611603403452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611603273453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611610353453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611603973452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611609943455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611608833587, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611616993452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611604103452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611612583451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611608993452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611606583452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611604633453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611605963452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611610763452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611618823454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611606093451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611608053454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611607823456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611611623452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611690953453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611611463454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611687973452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611603683452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611617123451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611642093452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611620213452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611607113452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611620353453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611617203450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611642223452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611649223452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611655353453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611666213452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611620503451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611696823451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611642983452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MIA", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611665653453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611649903451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611711133453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611690823451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611692653453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611712413451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611693513451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611709743452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611713773453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611691113452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611709093452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611706393451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611691243453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611708903454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611724903450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611723713452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611707673452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611713935450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611723843451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611725633455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611724733451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611729663476, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611729803450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611728473450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611744353454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611731303455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611741955454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611726633451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611748413454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611735563456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611748335452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611734253461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611734179450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611741620458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Timeout", "method": "11V", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611744223453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611747253454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MIA", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611771503456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611751073451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611754683462, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611731603451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "topo5's RG", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611760713461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611759513463, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611755293461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611764333460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611767943462, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611742253456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611734383450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611754083464, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611744803452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MIA", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611777605456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1626325273452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611743053454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611772755452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611781103453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611778853453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611742565453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611781293454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611858275450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611783203452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611858465450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611785203454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611747683454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611859445456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611765533464, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611862885458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611859360947, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611862753459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611868063467, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611867923458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611862323459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611867073458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611869673459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611868893457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611867003459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611871833459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611869023458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611862463458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611866873459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611875393458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611870173458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611869803458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611875263458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876003458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611869933457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876133457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876673460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611875813458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611875683457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611879763457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611877943458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876543458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611873763458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876863458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880313459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611870303458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611878553457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611879383458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880183458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611878073458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611879573457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880443459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880583458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611879893458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611883463457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880713458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611873683459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611880053457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611888420667, "stationMac": "74:d8:3e:96:bf:8b", "result": "Timeout", "method": "11V", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611883333459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611884873456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611893493451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611883873458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611876993458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611893623450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611897693452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611884223458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611882913456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611893753452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611883043458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611888630101, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611897455464, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611897103450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611900003452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611899223452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611878423459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611901343453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611898263451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611894113453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611898103452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611897963453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611902473450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611899373455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611902183450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611902323450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611897823451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611899513452, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611904853453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611893983450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611903173449, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611903260449, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-1", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611899653451, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611898453450, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611904235017, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611882023457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611905003454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611904543457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611905963455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611907413454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611904775454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611906353454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611906223459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611907333455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611909903456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611906093459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "n/a", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611910043455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611910183455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611908373463, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611910453455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611909273457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611910323457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611910593453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611912163454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611911453456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611912943455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611915703454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611917443455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611912803454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611916053456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611913073454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611919533456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611915863457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611918953457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611915373453, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611922083456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611919183455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611917583457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611921353457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611926863456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611928773454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611924413457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611920313455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611919723455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611915573456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611927923456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611923523461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611922733455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611912633455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611931293454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611921793457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611928513456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611927393455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611923203456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611931433455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611943103456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611940003456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611931663456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611930153455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611934763458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611934413456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611939813455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611946423456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611947263456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611947133456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611941313455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611931153456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611936133458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611945893455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611952383456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611946903455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611948783461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611949103459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611946613454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611945003456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611947403456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611950053456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611952793458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611953263456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611948863460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955083456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611954953456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955823458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611952213457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611960873458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955213457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611956113458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611954823456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611956393456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611947573454, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611957433457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611960183457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611957163456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611962573457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611958743457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955343458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955473456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611953393457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611956253458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611957583458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611960403461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611962773458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611957303458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611957043457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611964133460, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611955953456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611960053461, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611965843456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611964353456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611965713457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611965553457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611968133456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611963363457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611966593459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611967123457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611970693458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611964263458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611982693456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611968783457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611969623456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611968913458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611969483458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985703459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611971563457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611971693457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611983423457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611982823456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985423458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611983753459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611969323457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611971393455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611969053457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985223457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved*", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611991793456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985983457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611991653459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611983923458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611970983458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611987183456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611969183457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985563456, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "target": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611982403455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611985843457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "NotMoved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611988383458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "resultCode": "Reject-7", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611989403458, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "Moved", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611974313455, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611991293457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's  SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:cf:67:cb" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }, { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611982953457, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } },
    { "sta": "74:d8:3e:96:bf:8b", "startTime": 1611991423459, "stationMac": "74:d8:3e:96:bf:8b", "result": "Success", "method": "11V", "note": "MovedToOtherBssid", "resultCode": "Accept-0", "current": { "routerName": "Topo5's Router", "radio": "5 GHZ", "routerMac": "d0:76:8f:42:54:29" }, "target": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" }, "ending": { "routerName": "Topo5's SAT 2", "radio": "5 GHZ", "routerMac": "48:77:46:86:b6:71" } }];
    return data;
  }

}
