import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';

@Injectable({
    providedIn: 'root'
})
export class HomeChartOptionsService {
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
                        color: '#4c4c4c'
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
    language: any;
    languageSubject: any;
    lineChartColors = ['#5ACFEA', '#FF8238', '#FF489D']
    colors = ['#0027FF', '#5ACFEA', '#B926F0', '#FF8238', '#029A7C', '#F7C343', '#FF489D', '#F7500F', '#0279ff', '#82bf00', '#836ee8', '#DE428E', '#6574A6', '#41EAD4', '#BB8B1A', '#A44A3F', '#277DA1', '#FFC9B9', '#219EBC', '#7678ed', '#8a817c', '#7f7f7f', '#136f63', '#92b6b1', '#662e9b']
    constructor(
        private dateUtils: DateUtilsService,
        private translateService: TranslateService,
    ) {
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
    }

    public getNetworkAvailabilityOptions(cData, yLabel?: any, showLegend?: boolean): any {

        let categories = [], outage = [], degrade = [];
        let chartData = [];


        var that = this;

        if (cData.length) {
            cData = this.sortByTimestamp(cData, 'time');
            cData.forEach(e => {
                categories.push(this.dateUtils.getChartFormatDate(e.time, 'M/d/yy', true));
                outage.push(e.outage);
                degrade.push(e.degrade);
            });

            chartData
        }



        let options = {
            ...this.commonHighChartOptions,
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
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: categories,
                tickInterval: 5,
                //crosshair: true,
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    allowDecimals: true,
                    // labels: {
                    //   formatter: function () {
                    //     //var maxElement = Math.abs(this.axis.min);
                    //     var maxElement = Math.abs(this.axis.max);
                    //     var unit = that.getStackedUnit(maxElement);
                    //     var m = this.value;
                    //     m = Math.abs(m);
                    //     let displayValue = (m / unit[0]).toFixed(2);
                    //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
                    //   },
                    // },
                    title: {
                        text: (yLabel && this.language) ? this.language[yLabel] : (yLabel ? yLabel : ''),
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
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
            },
            series: [
                {
                    name: `${this.language['Service Outage']}`,
                    data: outage,
                    //color: '#35c7fc'
                },
                {
                    name: `${this.language['Service Degradation']}`,
                    data: degrade,
                    //color: '#F7C343',
                    //yAxis: 1,
                }],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    // groupPadding: 0.1,
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

    public getCommonSubscribersChartOptions(cData, yLabel?: any, showLegend?: boolean, chartName?: string): Observable<any> {
        let that = this;
        let options: any = {
            ...this.commonHighChartOptions,
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
            colors: this.colors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: cData.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
                showLastLabel: true,
                tickInterval: (function () {
                    let sLength = cData.series ? cData.series.length : 0;
                    let xCategLength = cData.categories ? cData.categories.length : 0;
                    let xAxisLen = Math.floor(xCategLength / sLength);
                    let f = 1;
                    if (xCategLength <= 6) {
                        f = 1;
                    } else if (xCategLength > 6 && xCategLength < 13) {
                        f = 2;
                    } else {
                        f = Math.floor(xCategLength / 6) ? Math.floor(xCategLength / 6) : 1;
                    }
                    return f;
                })(),
                labels: {
                    rotation: -25,
                }
                //crosshair: true,
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,
                    // labels: {
                    //   formatter: function () {
                    //     //var maxElement = Math.abs(this.axis.min);
                    //     var maxElement = Math.abs(this.axis.max);
                    //     var unit = that.getStackedUnit(maxElement);
                    //     var m = this.value;
                    //     m = Math.abs(m);
                    //     let displayValue = (m / unit[0]).toFixed(2);
                    //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
                    //   },
                    // },
                    title: {
                        text: yLabel ? this.language[yLabel] : (yLabel ? yLabel : ''),
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
            lang: {
                noData: that.language["No Data Available"]
            },
            legend: {
                symbolRadius: 100,
                enabled: showLegend ? true : false
              },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            series: [...cData.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
                    marker: {
                        enabled: cData.categories.length == 1 ? true : false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                          hover: {
                            enabled: true
                          }
                        },
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
        if (chartName && chartName == 'system_by_model') {
            options = this.addTooltipformatter(options);
        }
        return of(options);
    }
    public getCommonSubscribersChartOptionsfor30records(cData, yLabel?: any, showLegend?: boolean, chartName?: string): Observable<any> {
        let that = this;
        let options = {
            ...this.commonHighChartOptions,
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
            colors: this.colors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: cData.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
                showLastLabel: true,
                tickPositions: [0, 5, 10, 15, 20, 25, 29],
                tickInterval: (function () {
                    let sLength = cData.series ? cData.series.length : 0;
                    let xCategLength = cData.categories ? cData.categories.length : 0;
                    let xAxisLen = Math.floor(xCategLength / sLength);
                    let f = 1;
                    if (xCategLength <= 6) {
                        f = 1;
                    } else if (xCategLength > 6 && xCategLength < 13) {
                        f = 2;
                    } else {
                        f = Math.floor(xCategLength / 6) ? Math.floor(xCategLength / 6) : 1;
                    }
                    return f;
                })(),
                labels: {
                    rotation: -25,
                }
                //crosshair: true,
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,
                    // labels: {
                    //   formatter: function () {
                    //     //var maxElement = Math.abs(this.axis.min);
                    //     var maxElement = Math.abs(this.axis.max);
                    //     var unit = that.getStackedUnit(maxElement);
                    //     var m = this.value;
                    //     m = Math.abs(m);
                    //     let displayValue = (m / unit[0]).toFixed(2);
                    //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
                    //   },
                    // },
                    title: {
                        text: (yLabel && this.language) ? this.language[yLabel] : (yLabel ? yLabel : ''),
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
            lang: {
                noData: that.language["No Data Available"]
            },
            legend: {
                symbolRadius: 100,
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
            },
            series: [...cData.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
                    marker: {
                        enabled: cData.categories.length == 1 ? true : false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                          hover: {
                            enabled: true
                          }
                        },
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
        if (chartName && chartName == 'system_by_model') {
            options = this.addTooltipformatter(options);
        }

        return of(options);
    }

    public getColumnChartOption(cData, yLabel?: any, showLegend?: boolean): Observable<any> {
        let options = {
            ...this.commonHighChartOptions,
            credits: {
                enabled: false
            },
            chart: {
                type: 'column',
                inverted: true,
                style: {
                    fontFamily: 'Source Sans Pro,Regular',
                    fontSize: '12px',
                    color: '#4c4c4c'
                },
            },
            colors: ['#0027FF', '#5ACFEA', '#fd9e4c', '#F7C343'],
            title: {
                text: (this.language && this.language['Firmware Image Count (%) / Model']) ? this.language['Firmware Image Count (%) / Model'] : 'Firmware Image Count (%) / Model',
                style: {
                    fontFamily: 'Source Sans Pro,Regular',
                    fontSize: '12px',
                    color: '#4c4c4c',
                },
            },
            xAxis: {
                categories: [...cData.categories],
                title: {
                    text: 'Model',
                },
            },
            yAxis: {
                opposite: true,
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        // color: ( // theme
                        //   Highcharts.defaultOptions.title.style &&
                        //   Highcharts.defaultOptions.title.style.color
                        // ) || 'gray'
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    data: [...cData.series]
                }
            ]
        };

        return of(options);
    }

    sortByTimestamp(list, key) {
        list.sort(function (x, y) {
            x[key] = x[key] ? parseInt(x[key]) : 0;
            y[key] = y[key] ? parseInt(y[key]) : 0;
            return x[key] - y[key];
        });
        return list;
    }

    addTooltipformatter(options) {
        options['tooltip'] = {
            shared: true,
            crosshairs: true,
            useHTML: true,
            formatter: function () {
                var s = this.x + '</br>';
                var points = this.points;
                s += '<table>';
                s += '<tr>';

                if (points && points.length > 24) {
                    $.each(this.points, function (i: number, point) {
                        if (i % 2 == 0) {
                            s += '<tr></tr>';
                        }
                        s += '<td style="width: 120px;padding-right: 20px;"><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b> </td><td style="width: 30px;"></td>';
                    });
                } else {
                    $.each(this.points, function (i: number, point) {
                        s += '<tr></tr>';
                        s += '<td style="width: 120px;"><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b> </td>';
                    });
                }

                s += '</tr>';
                s += '</table>';
                //console.log(s)
                return s;
            }
        }
        return options;
    }
}
