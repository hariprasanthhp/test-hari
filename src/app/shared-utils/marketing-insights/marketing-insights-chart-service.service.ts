import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
import { CircularEdge } from 'gojs';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);
import * as constants from "../../marketing/shared/constants/marketing.constants";
import { MarketingExploreCommonService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-common.service';
import { TranslateService } from 'src/app-services/translate.service';

// const $: any = require('jquery');
@Injectable({
    providedIn: 'root'
})
export class MarketingInsightsChartServiceService {
    stackedColumnInlineColors = ['#82bf00', '#a3a5ed', '#b3d974', '#349885', '#0279ff']
    pieChartColurs = ['#84bbf8', '#a3a5ed', '#b3d974', '#fd9e4c', '#fc6784']
    stackedColumnColors = ['#82BF1F', '#0279ff']
    SubscriberUsagechartHeight: number = 268;
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
    xAxisLabels = {
        style: {
            fontSize: '10px'
        },
        autoRotationLimit: 40
    }
    styleOptions = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '10px',
        color: '#4c4c4c'
    }
    selectOptions = {
        enabled: true,
        color: null,
        borderWidth: 2,
        borderColor: '#AAAAAA'
    }
    styleOptions_tooltip =
        {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
        }
    language: any
    languageSubject: any
    constructor(private marketingExploreCommonService: MarketingExploreCommonService, private translateService: TranslateService,) {
        this.language = this.translateService.defualtLanguage;

        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
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

    public insightSubscriberUsageOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let streamingOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnInlineColors,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
            },
            xAxis: {
                crosshair: true,
                categories: categories,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions
                    },
                },

            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                labels:
                {
                    formatter: function () {
                        return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0);
                    },
                    style: {
                        ...this.styleOptions
                    },
                },
                title: {
                    text: '',
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                },
                stackLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.total, 1, '.', ',') + ' GB';
                    },
                    style: {
                        stacking: 'normal',
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
                series: {
                    ...this.plotOptions,
                    allowPointSelect: false,
                    maxPointWidth: 24,
                    cursor: 'pointer',
                    point: {
                        events: {}
                    },
                    states: {
                        inactive: {
                            enabled: false
                        },
                        select: {
                            ...this.selectOptions,
                        }
                    },
                },
                column: {
                    borderWidth: 0,
                    minPointLength: 3,
                }
            },
            tooltip: {
                valueDecimals: 2,
                crosshairs: true,
                headerFormat: '{point.key}<br>',
                // pointFormat: '<span style="color:{series.color};padding:0">● </span>' +
                //     '<span style="padding:0">{series.name}: <b>{point.y} GB</b></span> <br>',
                pointFormat: `<span style="color:{point.color}"> </span>{series.name}:<b> {point.y} GB </b> <br>`,
                shared: true,
                // useHTML: true,
                style: {
                    ...this.styleOptions
                }
            },

            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },

        };
        return of(streamingOptions);
    }
    public WIFIOptions(result?: any): Observable<{}> {

        let percentage = this.marketingExploreCommonService.arraysObjectsPercentageCalculator
        let WIFIOptions = {
            colors: this.pieChartColurs,
            chart: {
                type: 'pie',
                style: {
                    ...this.styleOptions
                },
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    point: {
                        events: {}
                    },
                    states: {
                        inactive: {
                            enabled: false
                        },
                        select: {
                            ...this.selectOptions,
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
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
                            width: '70px',
                            height: '100px',
                            ...this.styleOptions
                        }
                    },
                }
            },
            tooltip: {
                opacity: '1',
                formatter: function () {
                    let arrayofUsage: Array<any> = [];
                    result.forEach(el => {
                        arrayofUsage.push(+el.originalValue);
                    });
                    // let unscalled = true;
                    let scaleUnit = 'TB'
                    let usage = this.point.y
                    usage = usage / 102.4 | 0;
                    // if (usage < 100) {
                    //     scaleUnit = 'GB';
                    //     unscalled = false;
                    // }
                    return ` Total Number of Devices <br/>
                            <b>${result[this.point.x].name}: ${percentage(arrayofUsage, result[this.point.x].originalValue, 1)} % </b> <br/> 
                            <b> ${this.point.y}</b>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    fontSize: '10px',
                }
            },
            series: [
                {
                    // name: "",
                    colorByPoint: true,
                    data: result
                }
            ],
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(WIFIOptions);
    }


    public insightServiceLimitOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let serviceOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: ['#82BF1F', '#0279ff'],
            xAxis: {
                categories: categories,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions

                    },
                },
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                softMax: 10,
                title: {
                    text: '',
                    style: {
                        // stacking: 'normal',
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
                        ...this.styleOptions
                    },
                },
            },
            legend: {
                reversed: true,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    cursor: 'pointer',
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {

                        }
                    },
                    enableMouseTracking: true
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name} <br/> 
                      <b>${this.x}: ${this.point.y} </b> <br/>`;
                },
                style: {
                    ...this.styleOptions
                }
            },
            series: data.series.reverse(),
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(serviceOptions);
    }

    // WIFI TRENDS 
    public insightWiFiTrendsOptions(data): Observable<{}> {
        console.log("dsgfdsg", data)
        let categories = this.addMonthOnCategories(data.categories);
        let serviceOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: ['#82BF1F', '#0279ff'],
            xAxis: {
                categories: categories,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions

                    },
                },
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                softMax: 10,
                title: {
                    text: '',
                    style: {
                        // stacking: 'normal',
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
                        ...this.styleOptions
                    },
                },
            },
            legend: {
                reversed: true,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {

                        }
                    },
                    enableMouseTracking: true
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name} <br/> 
                      <b>${this.x}: ${this.point.y} </b> <br/>`;
                },
                style: {
                    ...this.styleOptions
                }
            },
            series: data.series.reverse(),
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(serviceOptions);
    }

    public insightSubscriberCompetitorOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let subscriberCompetitorChartOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },

            },

            xAxis: {
                categories: categories,

                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions

                    },
                },
            },

            yAxis: {
                allowDecimals: false,
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
                    },
                },
                min: 0,
                softMax: 1,
                title: {
                    text: '',
                    style: {
                        ...this.styleOptions
                    }
                },

                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.total, 1, '.', ',') ;
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            tooltip: {
                crosshairs: true,
                headerFormat: '<span>{point.key}</span><br>',
                pointFormat: '<span style="color:{series.color};padding:0"></span>' +
                    '<span style="padding:0">{series.name}: <b>{point.y} minutes</b></span><br>',
                shared: true,
                // useHTML: true,
                style: {
                    ...this.styleOptions
                }
            },

            series: data.series,
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    allowPointSelect: false,
                    maxPointWidth: 24,
                    cursor: 'pointer',
                    point: {
                        events: {}
                    },
                    states: {
                        inactive: {
                            enabled: false
                        },
                        select: {
                            ...this.selectOptions,
                        }
                    },
                },
                column: {
                    borderWidth: 0,
                    minPointLength: 3,
                }
            },
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(subscriberCompetitorChartOptions);
    }
}
