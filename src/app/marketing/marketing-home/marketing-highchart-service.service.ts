import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
import { CircularEdge } from 'gojs';
import { MarketingExploreCommonService } from '../marketing-explore-data/basic/shared/services/explore-data-common.service';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);
import * as constants from "../shared/constants/marketing.constants"
import { TranslateService } from 'src/app-services/translate.service';
// const $: any = require('jquery');
@Injectable({
  providedIn: 'root'
})
export class MarketingHighchartServiceService {
  pieChartColurs = ['#5acfea', '#B926F0', '#b3d974', '#FF8238', '#FF489D']
  stackedColumnColors = constants.chartColorCodes
  stackedAqiteColors = constants.chartColorCodes
  language: any
  languageSubject: any
  isRerender: boolean
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
            styledMode: true,
            color: '#1A1F22'
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
  selectOptions = {
    enabled: true,
    color: null,
    borderWidth: 2,
    borderColor: '#AAAAAA'
  }
  styleOptions = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '14px',
    color: '#1A1F22',
    lineHeight: '18px'
  }
  styleOptions_stacklabel = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '12px',
    color: '#1A1F22',
    lineHeight: '18px'
  }
  styleOptions_legendtext = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '14px',
    color: '#1A1F22'
  }
  styleOptions_xaxis = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '14px',
    color: '#1A1F22'
  }
  styleOptions_yaxis = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '14px',
    color: '#1A1F22'
  }
  styleOptions_tooltip =
    {
      fontFamily: 'Source Sans Pro,Regular',
      fontSize: '14px',
      color: '#1A1F22'
    }
  xAxisLabels = {
    style: {
      fontSize: '14px',
      color: '#1A1F22'
    },
    autoRotationLimit: 40
  }
  linePlotOptions = {
    states: {
      inactive: {
        enabled: false
      }
    }
  }
  plotOptions = {
    stacking: 'normal',
    series: {
      allowPointSelect: true,
    },
    states: {
      inactive: {
        enabled: false
      },
      select: {
        color: null,
        borderWidth: 7,
        borderColor: 'rgb(170, 170, 170)'
      }
    }
  }
  constructor(private marketingExploreCommonService: MarketingExploreCommonService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.isRerender = true;
    });
  }
  // SUSBSCRIBERS SERVICE BY TECH


  public serviceTierTechnologyOptions(data): Observable<{}> {
    // data.series.filter(arrayData => {
    //   arrayData.data.filter((value, index) => {
    //     if (value === 0) {
    //       arrayData.data.splice(index, 1, null);
    //     }
    //   })
    // })

    let totalsubs: any;
    totalsubs = this.marketingExploreCommonService.sumOfObjectValues(data.totals);
let that = this;
    let serviceTierTechnologyOptions = {
      ...this.commonHighChartOptions,
      colors: this.stackedAqiteColors,
      chart: {
        type: 'column',
        style: {
          ...this.styleOptions
        },
      },
      xAxis: {
        categories: data.categories,
        labels: {
          ...this.xAxisLabels,
          style: {
            ...this.styleOptions_xaxis
          },
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      tooltip: {
        formatter: function () {
          return this.series.xAxis.categories[this.point.x] + ' ' + that.language['Total'] + ': ' + Highcharts.numberFormat(data.totals[this.key], 0, '', ',') +
            ' (' + Highcharts.numberFormat(data.totals[this.key] / (totalsubs / 100), 1) + '%' + ')<br>' +
            '<b>' + this.series.name + ': ' + Highcharts.numberFormat(this.point.y, 0, '', ',') + ' (' +
            Highcharts.numberFormat(this.point.y / (data.totals[this.key] / 100), 1) + '%)</b><br>';
        },
        style: {
          ...this.styleOptions_tooltip
        }
      },
      plotOptions: {
        series: {
          ...this.plotOptions,
          allowPointSelect: true,
          maxPointWidth: 24,
          cursor: 'pointer',
          point: {
            events: {}
          },
          states: {
            inactive: {
              enabled: false
            },

          },
        },
        column: {
          borderWidth: 0,
          minPointLength: 3,
        }
      },
      // series: data.series,
      series: data.series,
      yAxis: {
        min: 0,
        softMax: 1,
        title: {
          text: this.language.Subscribers,
          style: {
            stacking: 'normal',
            ...this.styleOptions
          },
        },
        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions_yaxis
          },
        },
        gridLineColor: '#E6E6E6',
        stackLabels: {
          enabled: true,
          allowOverlap: true,
          formatter: function () {
            return Highcharts.numberFormat((this.total / (totalsubs / 100)), 1) + '%';
          },
          style: {
            ...this.styleOptions_stacklabel
          },
        },
        reversedStacks: false,
      },
      lang: {
        noData: this.language["No Data Available"]
      },
    };


    return of(serviceTierTechnologyOptions);
  }
  //Acquisation Trends

  public aquisationTrendsOption(data): Observable<{}> {
    let category = this.addMonthOnCategories(data.categories);
    let that = this;
    let aquisationTrendsOption = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: ['#0027ff'],
      xAxis: {
        categories: category,
        labels: { ...this.xAxisLabels },
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language.Subscribers,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },
        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} ${that.language['Subscribers']}</b> <br/>`;
        },
        style: {
          ...this.styleOptions_tooltip
        }
      },
      series: [{
        showInLegend: false,
        data: data.categoryFeatureTotal
      }],
      lang: {
        noData: this.language["No Data Available"]
      },
    };
    return of(aquisationTrendsOption);
  }
  //Churn Trends

  public churnTrendsOption(data): Observable<{}> {
    let category = this.addMonthOnCategories(data.categories);
    let that = this;
    let aquisationTrendsOption = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: ['#0027ff'],
      xAxis: {
        categories: category,
        labels: { ...this.xAxisLabels },
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language.Subscribers,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },
        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} ${that.language['Subscribers']} </b> <br/>`;
        },
        style: {
          ...this.styleOptions_tooltip
        }
      },
      series: [{
        showInLegend: false,
        data: data.categoryFeatureTotal
      }],
      lang: {
        noData: this.language["No Data Available"]
      },
    };
    return of(aquisationTrendsOption);
  }
  // LINE CHARTS
  public multiLineChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      colors: this.stackedColumnColors.reverse(),
      chart: {
        type: 'line',
        events: {
          load: function (event) {
            $('.highcharts-legend-item path').attr('height', '13').attr('y', '5');
          }
        }
      },
      yAxis: {
        labels: {
          formatter: function () {
            {
              return this.value.toFixed(0) >= 1000 ? (this.value / 1000).toFixed(0) + 'K' : this.value.toFixed(0)

            }
          }
        },
        title: {
          text: 'Usage',
          style: {
            ...this.styleOptions_yaxis
          },
        }
      },

      tooltip: {
        formatter: function () {
          return `${this.series.name} <br/> 
                    <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
        }
      },
      legend: {



        // enabled: true,
        // symbolHeight: 50,
        // symbolWidth: 0,
        // symbolRadius: 30,
        itemStyle: {

          ...this.styleOptions_tooltip
        },
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep'],
        crosshair: false,

      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
          marker: {
            enabled: false
          },
          label: {
            connectorAllowed: false
          },
        }
      },

      series: [
        {
          name: 'Total Usage (TB)',
          showInLegend: false,
          data: [5717, 658, 9731, 1931, 1133, 1175]
        }, {
          name: 'Streamingl Usage (TB)',
          showInLegend: false,
          data: [292, 2851, 490, 3282, 3821, 4434]
        }],
      lang: {
        noData: this.language["No Data Available"]
      },
    }
    return of(object);
  }





  // SOME COMMON FUNCTIONS
  addMonthOnCategories(categoryArray) {
    let newMonth: any;
    let newCategories = [];
    categoryArray.forEach(element => {
      let type: any = typeof element;
      let category: any;
      if (type == 'object') {
        element = element[0];
      }
      newMonth = element.split('-');
      category = `${constants.monthsArray[+newMonth[1]]}-${+newMonth[0] - 2000}`;
      newCategories.push(category)

    });
    return newCategories;
  }

}
