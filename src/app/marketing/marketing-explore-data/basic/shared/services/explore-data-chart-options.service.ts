import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
import * as constants from "../../../../shared/constants/marketing.constants";
import { MarketingExploreCommonService } from './explore-data-common.service';
import * as moment from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
import { DatePipe } from '@angular/common';
import { stripExtension } from '@angular/compiler-cli/src/ngtsc/file_system/src/util';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);
const $: any = require('jquery');
@Injectable({
    providedIn: 'root'
})
export class ExportDataChartOptionsService {
    language: any;
    languageSubject: any;
    isRerender = false;
    stackedColumnColors = constants.chartColorCodes
    stackedWfhColors = ['#0027FF', '#5ACFEA']
    stackedAqiteColors = constants.chartColorCodes
    stackedColumnInlineColors = ['#5ACFEA', '#FF8238', '#0027FF']
    data_usage_series: any = [];
    data_household_series: any = [];
    data_tier_series: any = [];
    data_Pie_series: any = [];
    tier_Service_Array: any = [];
    tierAndTech_Service_Array: any = [];
    data_Servicetier_series: any = []
    data1_Acquisation_Revenue: any = [];
    data_Revenue_series: any = [];
    data_Series_WHHGamming: any = [];
    data_Series_ChurnInsightRate: any = [];
    data1_Active_WHHGamming: any = [];
    data1_Active_ChurnInsightRate: any = [];
    data_RateInsight_series: any = [];
    data1_acquisation_rate: any = [];
    data_PieBlock_series: any = [];
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
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_stacklabel={
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '12px',
        color: '#1A1F22',
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_usage_insights = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '10px',
        color: '#1A1F22',
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_usage_application = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '12px',
        color: '#1A1F22',
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_legendtext = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '14px',
        color: '#1A1F22',
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_xaxis = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '14px',
        color: '#1A1F22',
        fontStyle: "normal",
        lineHeight: '18px'
    }
    styleOptions_yaxis = {
        fontFamily: 'Source Sans Pro,Regular',
        fontSize: '14px',
        color: '#1A1F22',
        fontStyle: "normal",
    }
    styleOptions_tooltip =
        {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '14px',
            color: '#1A1F22',
            fontStyle: "normal",
        }
    xAxisLabels = {
        style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '14px',
            color: '#1A1F22',
            fontStyle: "normal",
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
    datePipe = new DatePipe('en-US');
    constructor(
        private marketingExploreCommonService: MarketingExploreCommonService,
        private translateService: TranslateService,
    ) {
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
            this.isRerender = true;
        });
    }

    // ngOnInit(): void {
    //     this.language = this.translateService.defualtLanguage;
    //     this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {

    //       this.language = data;
    //       this.isRerender = true;
    //     });
    // }

    // ngOnDestroy(): void {
    //     if (this.languageSubject) {
    //         this.languageSubject.unsubscribe();
    //       }
    // }

    // SUBSCRIBERS TAB
    // SUBSCRIBER DATA USAGE
    public subscriberDataUsageOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        if (selected.tier != null && selected.tier != undefined) {
            if (!selected.tier.includes('GB') && !selected.tier.includes('TB')) {

                const sizes = ['GB', 'TB'];
                var size1 = "";
                var size2 = "";
                var value1 = "";
                var value2 = "";
                var conversion1 = "";
                var conversion2 = "";
                var keydata = selected.tier.split("-");
                if (keydata[0] != null && keydata[0] != undefined && keydata.length == 2) {
                    if (Number(keydata[0]) >= 1000) {
                        size1 = sizes[1];
                        if (keydata[0].includes('001')) {
                            let value = keydata[0];
                            value1 = ((Number(value) + 9) / 1000).toFixed(2);
                        } else {
                            value1 = (keydata[0] / 1000).toFixed(2);
                        }
                    }
                    else if (Number(keydata[0]) < 1000) {
                        size1 = sizes[0];
                        value1 = keydata[0];
                        // if(Number(keydata[0] == 501)) {
                        //     size1 = sizes[0];
                        //   }
                    }
                    conversion1 = value1 + size1;
                }
                if (keydata[1] != null && keydata[1] != undefined && keydata.length == 2) {
                    if (Number(keydata[1]) >= 1000) {
                        size2 = sizes[1];
                        if (keydata[1].includes('001')) {
                            let value = keydata[1];
                            value2 = ((Number(value) + 9) / 1000).toFixed(2);
                        } else {
                            value2 = (keydata[1] / 1000).toFixed(2);
                        }
                        // value2 = ((keydata[1] + 9) / 1000).toFixed(2);
                    }
                    else if (Number(keydata[1]) < 1000) {
                        size2 = sizes[0];
                        value2 = keydata[1];
                    }
                    conversion2 = "-" + value2 + size2;
                }
                else {
                    var keydata = selected.tier.split("+");
                    if (Number(keydata[0]) >= 1000) {
                        size1 = sizes[1];
                        if (keydata[0].includes('001')) {
                            let value = keydata[0];
                            value1 = ((Number(value) + 9) / 1000).toFixed(2);
                        } else {
                            value1 = (keydata[0] / 1000).toFixed(2);
                        }
                    } else if (Number(keydata[0]) < 1000) {
                        size1 = sizes[0];
                        value1 = keydata[0];
                    }
                    conversion1 = value1 + size1 + "+";
                }
                selected.tier = conversion1 + conversion2;
            }
        }
        this.data_usage_series = [];
        for (var i = 0; i < data.categories.length; i++) {
            if (data.categories[i] == selected.tier) {
                this.data_usage_series.push({ 'y': data.series[i], borderColor: '#008000', 'selected': true })
            }
            else {
                this.data_usage_series.push({ 'y': data.series[i] })
            }
        }
        let subscriberDataUsageOptions = {
            ...this.commonHighChartOptions,
            colors: ['#0027FF'],
            chart: {
                type: 'column',
                inverted: false, // default
                style: {
                    ...this.styleOptions
                },
                events: {

                }
            },

            xAxis: {
                categories: data.categories,
                crosshair: true,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    },
                    rotation: -25
                },
                title: {
                    useHTML: true,
                    text: `<p class="giga-text" id="giga" style="font-size:12px !important;margin-top:5px;">${this.language.Usage}</p>`,
                    align: 'middle',

                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    },

                },
            },

            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                labels: {
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
                reversedStacks: false,
                title: {
                    style: {
                        ...this.styleOptions_legendtext
                    },
                    text: this.language.Subscribers
                },
                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        let totalDivider = data.totalSubs / 100;
                        return Highcharts.numberFormat(this.total / (totalDivider == 0 ? 1 : totalDivider), 1) + '%';
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions_legendtext
                    }
                }
            },
            tooltip: {


                formatter: function () {

                    return ` ${this.key}  ${that.language.Usage}<br/> <b>${Highcharts.numberFormat(this.y, 0, '', ',')}  ${that.language.Subscribers} ( ${Highcharts.numberFormat(this.total / (data.totalSubs / 100), 1) + '%'}) </b>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                },
            },

            plotOptions: {
                series: {
                    allowPointSelect: true,
                    maxPointWidth: 24,
                    borderRadius: 0,
                    cursor: 'pointer',
                    point: {
                        events: {

                        }
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
                    stacking: 'normal',
                    minPointLength: 3,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },

            series: [{
                showInLegend: false,
                // borderRadiusTopLeft: 20,
                // borderRadiusTopRight: 20,
                // data: data.series,
                data: this.data_usage_series
            },
            ],
            lang: {
                noData: this.language["No Data Available"]
            },

        }
        return of(subscriberDataUsageOptions);
    }
    translatestreamingGamingWFHSubscriberOptionsChartLabelName(name) {
        switch (name) {
            case 'Streaming':
                return this.language['Streaming'];
            case 'Non-Streaming':
                return this.language['Non-Streaming'];
            case 'Gaming':
                return this.language['Gaming'];
            case "Non-Gaming":
                return this.language['Non-Gaming'];
            default:
                return name;
        }
    }
    // STREAMING, GAMING, WFH SUBSCRIBERS
    public streamingGamingWFHSubscriberOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        this.data_Series_WHHGamming = [];
        for (var i = 0; i < data.series.length; i++) {
            this.data1_Active_WHHGamming = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                // if(data.series[i].data[j]==selected.yValue){
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.data1_Active_WHHGamming.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.data1_Active_WHHGamming.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.data1_Active_WHHGamming.push({ 'y': data.series[i].data[j] })
                }
            }
            // if (sessionStorage.getItem('defaultLanguage') == 'fr') {
            //     if (data.series[i].name === 'Streaming') {
            //         data.series[i].name = 'Vidéo';
            //     } else if (data.series[i].name === 'Non-Streaming') {
            //         data.series[i].name = 'Non Vidéo'
            //     } else if (data.series[i].name === 'Gaming') {
            //         data.series[i].name = 'Jeux'
            //     } else if (data.series[i].name === 'Non-Gaming') {
            //         data.series[i].name = 'Non jeux'
            //     } else if (data.series[i].name === 'WFH') {
            //         data.series[i].name = 'TAM'
            //     } else if (data.series[i].name === 'Non-WFH') {
            //         data.series[i].name = 'Non-TAM'
            //     }
            // }
            data.series[i].name = this.translatestreamingGamingWFHSubscriberOptionsChartLabelName(data.series[i].name);
            this.data_Series_WHHGamming.push({ 'name': data.series[i].name, 'data': this.data1_Active_WHHGamming })

        }

        let seriesNames = [data.series[0].name, data.series[1].name];

        let streamingGamingWFHSubscriberOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
            },
            colors: this.stackedColumnColors,
            xAxis: {
                categories: data.categories,
                crosshair: false,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
                title: {
                    style: {
                        ...this.styleOptions
                    },

                },
            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                reversedStacks: false,
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
                title: {
                    style: {
                        ...this.styleOptions_legendtext
                    },
                    text: this.language.Subscribers
                },
                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    style: {
                        ...this.styleOptions_legendtext
                    },
                    formatter: function () {
                        if (seriesNames.length === 1) {
                            const total = data.series[0].data[this.x] + data.series[1].data[this.x];
                            return Highcharts.numberFormat(this.total / (total / 100), 1) + '%';
                        } else {
                            const itemTotal = data.series.find(s => !s.name.includes('Non')).data[this.x];
                            return Highcharts.numberFormat(itemTotal / (this.total / 100), 1) + '%';
                        }
                    },
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    maxPointWidth: 16,
                    borderRadius: 0,
                    cursor: 'pointer',
                    states: {
                        inactive: {
                            enabled: false
                        },
                        select: {
                            color: null,
                            borderWidth: 2,
                            borderColor: 'Grey'
                        }
                    },
                    point: {
                        events: {
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    events: {
                        legendItemClick: function (e) {
                            if (this.visible) {
                                seriesNames = seriesNames.filter(s => s != this.name);
                            }
                            else {
                                seriesNames.push(this.name);
                            }
                        }
                    },
                },
                column: {
                    stacking: 'normal',
                    minPointLength: 3,
                    borderWidth: 0,
                    /* dataLabels: {
                        y: -15,
                        enabled: true,
                        useHTML: false,
                        allowOverlap: true,
                        // x: -20,
                        formatter: function () {
                            if (!this.series.name.includes('Non')) {
                                if (!data.totals[this.x]) {
                                    data.totals[this.x] = this.total;
                                }
                                return Highcharts.numberFormat(this.y / (data.totals[this.x] / 100), 1) + '%';
                            }
                        },
                        style: {
                            stacking: 'normal',
                            ...this.styleOptions
                        }
                    }, */
                }
            },
            tooltip: {
                formatter: function () {
                    return ` ${this.key} ${that.language.Total}:  ${Highcharts.numberFormat(data.totals[this.key], 0, '', ',')}   <br/>
                             <b>${this.series.name} : ${Highcharts.numberFormat(this.y, 0, '', ',')} ( ${((100 * this.y) / (data.totals[this.key] == 0 ? 1 : data.totals[this.key])).toFixed(1)}% ) </b>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                },
            },
            series: this.data_Series_WHHGamming[0].data == undefined ? [] : this.data_Series_WHHGamming,
            lang: {
                noData: this.language["No Data Available"]
            },
        }
        return of(streamingGamingWFHSubscriberOptions);
    }
    // DATA USAGE TRENDS
    public dataUsageTrendsOptions(data): Observable<{}> {
        for (var i = 0; i < data.series.length; i++) {

            if (data.series[i].name === 'Total Usage(TB)') {
                for (var j = 0; j < data.series[i].data.length; j++) {
                    data.series[i].data[j] = data.series[i].data[j] / 1024
                }
                // if (sessionStorage.getItem('defaultLanguage') === 'fr') {
                //     data.series[i].name = 'Utilisation totale (TB)'
                // }
                //  data.series[i].name = this.language['totalusageLabel'];
            } else if (data.series[i].name === 'Streaming Usage(TB)') {
                for (var j = 0; j < data.series[i].data.length; j++) {
                    data.series[i].data[j] = data.series[i].data[j] / 1024
                }
                // data.series[i].name = this.language['streamingUsageLabel'];
                // if (sessionStorage.getItem('defaultLanguage') === 'fr') {
                //     data.series[i].name = 'Utilisation vidéo (TB)';
                // }

            }
        }
        //   console.log(data.series, "after")
        let category = this.addMonthOnCategories(data.categories);
        let dataUsageTrendsOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: this.stackedColumnColors,
            xAxis: {
                categories: category,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                title: {
                    text: this.language.Usage,
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
                    }
                },
                style: {
                    ...this.styleOptions_yaxis
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
                    return `${this.series.name} <br/> 
                            <b>${data.categories[this.point.x]}: ${Highcharts.numberFormat(this.point.y, 2, '.', ',')} TB</b> <br/>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                },
            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(dataUsageTrendsOptions);
    }
    // SUBSCRIBERS ACTIVITY TRENDS
    public subscriberActivityTrendsOptions(data): Observable<{}> {
        const that = this;
        let category = this.addMonthOnCategories(data.categories)
        let activitylineChartOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: this.stackedColumnColors,
            xAxis: {
                categories: category,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },

            },
            yAxis: {
                min: 0,
                softMax: 1,
                // showEmpty: true,
                allowDecimals: false,
                title: {
                    text: this.language.Subscribers,
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
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
                    }

                },
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name} <br/>  <b>${data.categories[this.point.x]}: ${Highcharts.numberFormat(this.point.y, 0, '', ',')} ${that.language.Subscribers} </b> <br/>`;


                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            plotOptions: {
                series: {
                    ...this.linePlotOptions,
                    marker: {
                        enabled: false
                    },

                    point: {
                        events: {

                        }
                    }
                },

            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(activitylineChartOptions);
    }
    // DEVICE PER HOUSEHOLD
    public deviceperHouseHoldOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        this.data_household_series = [];
        // let toolTipText;
        for (var i = 0; i < data.categories.length; i++) {
            if (data.categories[i] == selected.tier) {
                this.data_household_series.push({ 'y': data.series[i], borderColor: '#008000', 'selected': true })
            }
            else {
                this.data_household_series.push({ 'y': data.series[i] })
            }
        }
        /* if (sessionStorage.getItem('defaultLanguage') == 'fr') {
            toolTipText = '<span x="3" style="fill:#4c4c4c;" y="15">Systèmes<span>';
        } else {
            toolTipText = '<span x="3" style="fill:#4c4c4c;" y="15">Devices<span>';
        } */
        let deviceperOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
            },
            colors: ['#0027FF'],
            xAxis: {
                categories: data.categories,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions
                    }
                },
                title: {
                    useHTML: true,
                    //text: '<span x="3" style="fill:#4c4c4c;" y="15">Devices<span>',
                    text: `<p class="giga-text" id="giga" style="font-size:14px !important;margin-top:20px;">${this.language.devices}</p>`, style: {
                        stacking: 'normal',
                        ...this.styleOptions_xaxis
                    },
                    align: 'middle',
                    margin: -15,
                }
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
                    }
                },
                labels: {
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
                    }
                },


            },
            legend: {
                reversed: false,
                align: 'left',
                symbolHeight: .001,
                symbolWidth: .001,
                symbolRadius: .001,
                itemStyle: {
                    ...this.styleOptions

                }
            },
            plotOptions: {
                series: {
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
                        select: {
                            ...this.selectOptions,
                        }
                    },

                },
                column: {
                    minPointLength: 3,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        useHTML: false,
                        allowOverlap: true,
                        x: 0,
                        formatter: function () {
                            return ` ${Highcharts.numberFormat(this.y * 100 / (data.totalSubs == 0 ? 1 : data.totalSubs), 1)}%`;
                        },
                        style: {
                            stacking: 'normal',
                            ...this.styleOptions
                        }
                    },
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.x} ${that.language['devices']} <br/> 
                            <b> ${Highcharts.numberFormat(this.point.y, 0, '', ',')}  ${that.language.Subscribers}  (${Highcharts.numberFormat(this.point.y * 100 / data.totalSubs, 1)}%)</b> <br/>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            series: [
                {
                    name: '',
                    // borderRadiusTopLeft: 20,
                    // borderRadiusTopRight: 20,
                    // data: data.series
                    data: this.data_household_series
                },
            ],
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(deviceperOptions);
    }

    // SERVICES TAB
    // SUSBSCRIBERS SERVICE BY TECH
    public serviceTierTechnologyOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        // data.series.filter(arrayData => {
        //     arrayData.data.filter((value, index) => {
        //         if (value === 0) {
        //             arrayData.data.splice(index, 1, null);
        //         }
        //     })
        // })
        this.data_Servicetier_series = [];
        for (var i = 0; i < data.series.length; i++) {
            this.tierAndTech_Service_Array = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.tierAndTech_Service_Array.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.tierAndTech_Service_Array.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.tierAndTech_Service_Array.push({ 'y': data.series[i].data[j] })
                }
            }
            // if (sessionStorage.getItem('defaultLanguage') == 'fr') {
            //     if (data.series[i].name === 'Fiber') {
            //         data.series[i].name = 'Fibre'
            //     }
            // }
            data.series[i].name = data.series[i].name
            this.data_Servicetier_series.push({ 'name': data.series[i].name, 'data': this.tierAndTech_Service_Array })
        }


        let totalsubs: any;
        totalsubs = this.marketingExploreCommonService.sumOfObjectValues(data.totals);

        // let serviceTierTechnologyOptions = {
        //     ...this.commonHighChartOptions,
        //     colors: this.stackedAqiteColors,
        //     chart: {
        //         type: 'column',
        //         style: {
        //             ...this.styleOptions
        //         },
        //     },
        //     xAxis: {
        //         categories: data.categories,
        //         labels: {
        //             ...this.xAxisLabels,
        //             style: {
        //                 ...this.styleOptions_xaxis
        //             },
        //         },
        //     },
        //     legend: {
        //         reversed: false,
        //         itemStyle: {
        //             ...this.styleOptions
        //         }
        //     },
        //     tooltip: {
        //         formatter: function () {
        //             return this.series.xAxis.categories[this.point.x] + ' ' + 'Total' + ': ' + Highcharts.numberFormat(data.totals[this.key], 0, '', ',') +
        //                 ' (' + Highcharts.numberFormat(data.totals[this.key] / (totalsubs / 100), 1) + '%' + ')<br>' +
        //                 '<b>' + this.series.name + ': ' + Highcharts.numberFormat(this.point.y, 0, '', ',') + ' (' +
        //                 Highcharts.numberFormat(this.point.y / (data.totals[this.key] / 100), 1) + '%)</b><br>';
        //         },
        //         style: {
        //             ...this.styleOptions_tooltip
        //         }
        //     },
        //     plotOptions: {
        //         series: {
        //             ...this.plotOptions,
        //             allowPointSelect: true,
        //             maxPointWidth: 24,
        //             cursor: 'pointer',
        //             point: {
        //                 events: {}
        //             },
        //             states: {
        //                 inactive: {
        //                     enabled: false
        //                 },
        //                 select: {
        //                     ...this.selectOptions,
        //                 }
        //             },
        //         },
        //         column: {
        //             borderWidth: 0,
        //             minPointLength: 3,
        //         }
        //     },
        //     // series: data.series,
        //     series: this.data_Servicetier_series,
        //     yAxis: {
        //         min: 0,
        //         softMax: 1,
        //         title: {
        //             text: this.language.Subscribers,
        //             style: {
        //                 stacking: 'normal',
        //                 ...this.styleOptions
        //             },
        //         },
        //         labels:
        //         {
        //             formatter: function () {
        //                 var label = this.axis.defaultLabelFormatter.call(this);
        //                 // Use thousands separator for four-digit numbers too
        //                 if (/^[0-9]{4,}$/.test(label)) {
        //                     return Highcharts.numberFormat(this.value, 0);
        //                 }
        //                 return label;
        //             },
        //             style: {
        //                 ...this.styleOptions_yaxis
        //             },
        //         },
        //         gridLineColor: '#E6E6E6',
        //         stackLabels: {
        //             enabled: true,
        //             allowOverlap: true,
        //             formatter: function () {
        //                 return Highcharts.numberFormat(this.total / (totalsubs / 100), 1) + '%';
        //             },
        //             style: {
        //                 ...this.styleOptions
        //             },
        //         },
        //         reversedStacks: false,
        //     },
        // };
        let serviceTierTechnologyOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedAqiteColors,
            chart: {
                type: 'column',
                inverted: false, // default
                style: {
                    ...this.styleOptions
                },
                events: {

                }
            },

            xAxis: {
                categories: data.categories,
                crosshair: true,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    },
                    rotation: -25
                },
                title: {
                    useHTML: true,
                    text: `<p class="giga-text" id="giga" style="font-size:12px !important;margin-top:5px;">${this.language.Usage}</p>`,
                    align: 'middle',

                    style: {
                        stacking: 'normal',
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
                reversedStacks: false,
                title: {
                    style: {
                        ...this.styleOptions_legendtext
                    },
                    text: this.language.Subscribers
                },
                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.total / (totalsubs / 100), 1) + '%';
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                }
            },
            tooltip: {


                formatter: function () {

                    return this.series.xAxis.categories[this.point.x] + ' ' + `${that.language.Total}` + ': ' + Highcharts.numberFormat(data.totals[this.key], 0, '', ',') +
                        ' (' + Highcharts.numberFormat(data.totals[this.key] / (totalsubs / 100), 1) + '%' + ')<br>' +
                        '<b>' + this.series.name + ': ' + Highcharts.numberFormat(this.point.y, 0, '', ',') + ' (' +
                        Highcharts.numberFormat(this.point.y / (data.totals[this.key] / 100), 1) + '%)</b><br>';
                },
                style: {
                    ...this.styleOptions_tooltip
                },
            },

            plotOptions: {
                series: {
                    allowPointSelect: true,
                    maxPointWidth: 24,
                    borderRadius: 0,
                    cursor: 'pointer',
                    point: {
                        events: {

                        }
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
                    stacking: 'normal',
                    minPointLength: 3,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            series: this.data_Servicetier_series,
            lang: {
                noData: this.language["No Data Available"]
            },
        }
        return of(serviceTierTechnologyOptions);
    }

    // HOUSEHOLD DEVICE TRENDS
    public houseHoldDeviceTrendsOptions(data): Observable<{}> {
        let category = this.addMonthOnCategories(data.categories)

        let householdOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: this.stackedColumnColors,
            xAxis: [{
                categories: category,
                crosshair: true,
                labels: {
                    style: {
                        ...this.styleOptions_xaxis

                    }
                }
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            // Use thousands separator for four-digit numbers too
                            if (/^[0-9]{4,}$/.test(label)) {
                                return Highcharts.numberFormat(this.value, 0);
                            }
                            return label;
                        },
                        style: {
                            color: '#5ACFEA',
                            fontSize: '13px',
                        },
                    },

                    title: {
                        text: this.language.WiFi_Score,
                        style: {
                            color: '#5ACFEA',
                            fontSize: '12px',
                        },
                    },
                    opposite: true

                },
                { // Secondary yAxis
                    min: 0,
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            // Use thousands separator for four-digit numbers too
                            if (/^[0-9]{4,}$/.test(label)) {
                                return Highcharts.numberFormat(this.value, 0);
                            }
                            return label;
                        },
                        style: {
                            color: '#0027FF',
                            fontSize: '13px',
                        },

                    },

                    title: {
                        style: {
                            color: '#0027FF',
                            fontSize: '12px',
                        },
                        text: this.language.Devices
                    },
                },],
            tooltip: {
                formatter: function () {
                    return `${this.series.name}<br/>
                            <b>${data.categories[this.point.x]}: ${this.y}</b> `
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions_legendtext

                }
            },
            series: [
                {
                    name: this.language.Average_Home_Device_Count,
                    yAxis: 1,
                    data: data.numberOfDevices,

                },
                {
                    name: this.language.WiFi_Score,
                    data: data.wifiScore,

                }],
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    cursor: 'pointer',
                    maxPointWidth: 24,
                    borderRadius: 0,
                    borderWidth: 0,
                    minPointLength: 3,
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
                    chartOptions: {
                        yAxis: [
                            {
                                labels: {
                                    align: 'right',
                                    x: 15,
                                    y: 5
                                },
                                title: {
                                    x: 15
                                },
                                showLastLabel: true
                            },
                            {
                                labels: {
                                    align: 'left',
                                    x: -15,
                                    y: 5
                                },
                                title: {
                                    x: -15
                                },
                                showLastLabel: true
                            }, {
                                visible: false
                            }]
                    }
                }]
            },
            lang: {
                noData: this.language["No Data Available"]
            },
        }

        return of(householdOptions);
    }

    // CommandIQ Status
    public commandIQStatusOptions(data, yLabel?: any, showLegend?: boolean): Observable<{}> {
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
            colors: this.stackedAqiteColors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: data.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
                tickInterval: (function () {
                    let sLength = data.series ? data.series.length : 0;
                    let xCategLength = data.categories ? data.categories.length : 0;
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
                    rotation: -25
                }
                //crosshair: true,
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,

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
                symbol: 'square',
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
            },
            series: [...data.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
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
        return of(options);
    }
    public commandIQStatus30recordOptions(data, yLabel?: any, showLegend?: boolean): Observable<{}> {
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
            colors: this.stackedAqiteColors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: data.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
                showLastLabel: true,
                tickPositions: [0, 5, 10, 15, 20, 25, 29],
                tickInterval: (function () {
                    let sLength = data.series ? data.series.length : 0;
                    let xCategLength = data.categories ? data.categories.length : 0;
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
                    rotation: -25
                }
                //crosshair: true,
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,

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
                symbol: 'square',
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
            },
            series: [...data.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
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
        return of(options);
    }
    // SERVICE MODULE ADOPTION RATE
    public serviceModuleAdoptionRateOptions(data): Observable<{}> {
        let chartSeries = data && data.series.map((obj) =>
            Object.assign({}, obj, { name: constants.ADOPTION_MODULE_RENAME[obj.name] }));

        let adoptionOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions

                },
            },
            colors: this.stackedAqiteColors,
            xAxis: {
                categories: this.addMonthOnCategories(data.categories),
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis

                    }
                },
            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,

                title: {
                    text: this.language.Subscribers,
                    style: {
                        ...this.styleOptions_legendtext

                    }
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

                    }
                },

            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name}     <br/> 
                            <b>${data.categories[this.point.x]}: ${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions

                }
            },
            plotOptions: {
                series: {
                    ...this.linePlotOptions,
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {

                        }
                    }
                }
            },
            series: chartSeries,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(adoptionOptions);
    }
    //SYSTEM MODEL

    public getCommonSubscribersChartOptions(cData, yLabel?: any, showLegend?: boolean): Observable<any> {

        let last_index = cData.categories.length - 1
        if (cData.categories.length == 30) {
            var val = last_index + 1;
            cData.categories[val] = cData.categories[last_index];
            //  cData.series[0].data[val] = cData.series[0].data[last_index];
        }
        if (cData.series[0].name == "") {
            cData.series = [];
        }
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
            colors: this.stackedAqiteColors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: cData.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
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
                //crosshair: true,
                labels: {
                    rotation: -25
                }
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,

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
                symbol: 'square',
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

        return of(options);
    }
    public getCommonSubscribersChartOptionsSystemMyModel(cData, yLabel?: any, showLegend?: boolean): Observable<any> {
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
            colors: this.stackedAqiteColors,
            title: {
                text: null
            },
            xAxis: [{
                min: 0,
                gridLineWidth: 1,
                categories: cData.categories,
                //tickInterval: 5,
                tickmarkPlacement: 'on',
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
                //crosshair: true,
                labels: {
                    rotation: -25
                }
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,

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
                symbol: 'square',
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                outside: true,
            },
            series: [...cData.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
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
            colors: this.stackedAqiteColors,
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
                //crosshair: true,
                labels: {
                    rotation: -25
                }
            }],
            yAxis: [
                { // Primary yAxis
                    min: 0,
                    softMax: 1,
                    allowDecimals: false,

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
                symbol: 'square',
                enabled: showLegend ? true : false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                outside: true,
            },
            series: [...cData.series],
            plotOptions: {
                series: {
                    // ...this.plotOptions,
                    cursor: 'pointer',
                    //pointPadding: 2, // Defaults to 0.1
                    groupPadding: 0.1,
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

        return of(options);
    }
    // WIFI DEVICE CATEGORY TRENDS
    public wifiDeviceCategoryTrendsOptions(data): Observable<{}> {
        let wifiTrendOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            color: this.stackedAqiteColors,
            xAxis: {
                categories: this.addMonthOnCategories(data.categories),

                crosshair: true,

                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: this.language.Devices,
                    style: {
                        ...this.styleOptions_legendtext
                    }
                },
                labels: {
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
                    ...this.linePlotOptions,
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {

                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name}     <br/> 
                            <b>${data.categories[this.point.x]}: ${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(wifiTrendOptions);
    }
    // BLOCK THREATS INSIGHTS
    public blockedThreatsInsightsOptions(result, selected: any = {}): Observable<{}> {
        let data = [];
        result && result.map((item) => {
            data.push({
                name: constants.THREATS_RENAME[item[0]],
                realName: item[0],
                y: item[1]
            });
        });
        this.data_PieBlock_series = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].realName == selected.tech) {
                this.data_PieBlock_series.push({ 'name': data[i].name, 'realName': data[i].realName, 'y': data[i].y, borderColor: '#008000', 'selected': true, 'sliced': true })
            } else {
                this.data_PieBlock_series.push({ 'name': data[i].name, 'realName': data[i].realName, 'y': data[i].y })
            }
        }

        let usageByApplicationOptions = {
            colors: this.stackedColumnColors,
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
                text: '',

            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions_legendtext
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
                        format: '{point.name}',

                    },

                },
                pie: {
                    size: '100%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        //useHTML: true,
                        crop: false,
                        distance: 10,
                        overflow: "visible",
                        style: {
                            width: '100px',
                            color: '#4c4c4c',
                            fontSize: '12px',
                        },

                    },
                }
            },

            tooltip: {
                headerFormat: '{series.name}',
                pointFormat: '{point.key}<br><b>{point.name}: {point.percentage:.1f}%</b><br><b>{point.y}</b>',
                style: {
                    ...this.styleOptions_tooltip
                }
            },

            series: [
                {
                    name: this.language.BlockedThreats_ToolTip,
                    colorByPoint: true,
                    data: this.data_PieBlock_series
                }
            ],
            lang: {
                noData: this.language["No Data Available"]
            },
        };

        return of(usageByApplicationOptions);
    }

    // APPLICATIONS TAB
    // USAGE BY APP && AQUISITION INLINE CHART
    public usageByApplicationOptions(result?: any, selected: any = {}): Observable<{}> {
        const that = this;
        this.data_Pie_series = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i].name == selected.tech) {
                this.data_Pie_series.push({ 'name': result[i].name, 'y': result[i].y, borderColor: '#008000', 'selected': true, 'sliced': true })
            } else {
                this.data_Pie_series.push({ 'name': result[i].name, 'y': result[i].y })
            }
        }
        let percentage = this.marketingExploreCommonService.arraysObjectsPercentageCalculator
        let usageByApplicationOptions = {
            colors: this.stackedColumnColors,
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
                            ...this.styleOptions_usage_application
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
                    usage = usage / 1024;
                    // if (usage < 100) {
                    //     scaleUnit = 'GB';
                    //     unscalled = false;
                    // }
                    return `${that.language.applicationGroup} <br/>
                            <b>${result[this.point.x].name}: ${percentage(arrayofUsage, result[this.point.x].originalValue, 1)}% </b> <br/> 
                            <b> ${Highcharts.numberFormat(usage, 2, '.', ',')} ${scaleUnit}</b>`;
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
                    // data: result
                    data: this.data_Pie_series
                }
            ],
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(usageByApplicationOptions);
    }

    public usageByAppInsightOptions(result?: any): Observable<{}> {
        let that = this;
        // debugger;
        // if (1) {
        //     result = [
        //         {
        //             name: 'Chrome',
        //             y: 61.41,
        //             sliced: true,
        //             selected: true
        //         }, {
        //             name: 'Internet ExplorerInternet ExplorerInternet ExplorerInternet Explorer',
        //             y: 11.84
        //         }, {
        //             name: 'FirefoxFirefoxFirefoxFirefoxFirefoxFirefox',
        //             y: 10.85
        //         }, {
        //             name: 'Edge',
        //             y: 4.67
        //         }, {
        //             name: 'Safari',
        //             y: 4.18
        //         }, {
        //             name: 'Sogou Explorer',
        //             y: 1.64
        //         }, {
        //             name: 'Opera',
        //             y: 1.6
        //         }, {
        //             name: 'QQ',
        //             y: 1.2
        //         }, {
        //             name: 'Other',
        //             y: 2.61
        //         }]
        // }

        let percentage = this.marketingExploreCommonService.arraysObjectsPercentageCalculator
        let usageByApplicationOptions = {
            colors: this.stackedColumnColors,
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
                    size: '55%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        //useHTML: true,
                        // crop: false,
                        distance: 2,
                        overflow: "visible",
                        style: {
                            width: '70px',
                            height: '150px',
                            ...this.styleOptions_usage_insights
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
                    let usage = this.point.y;
                    usage = usage / 1024;
                    // if (usage < 100) {
                    //     scaleUnit = 'GB';
                    //     unscalled = false;
                    // }
                    // console.log(percentage(arrayofUsage, result[this.point.x].originalValue));
                    // console.log(result[this.point.x].originalValue);
                    // console.log(arrayofUsage);
                    var data = percentage(arrayofUsage, result[this.point.x].originalValue);

                    if (data == "NaN" || data == "" || data == undefined) {
                        data = "0";
                    }
                    return `${that.language['applicationGroup']}<br/>
                            <b>${result[this.point.x].name}: ${data}% </b> <br/> 
                            <b> ${Highcharts.numberFormat(usage, 2, '.', ',')} ${scaleUnit}</b>`;
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
                    // data: [{
                    //     name: 'Chrome',
                    //     y: 61.41,
                    //     sliced: true,
                    //     selected: true
                    // }, {
                    //     name: 'Internet ExplorerInternet ExplorerInternet ExplorerInternet Explorer',
                    //     y: 11.84
                    // }, {
                    //     name: 'FirefoxFirefoxFirefoxFirefoxFirefoxFirefox',
                    //     y: 10.85
                    // }, {
                    //     name: 'Edge',
                    //     y: 4.67
                    // }, {
                    //     name: 'Safari',
                    //     y: 4.18
                    // }, {
                    //     name: 'Sogou Explorer',
                    //     y: 1.64
                    // }, {
                    //     name: 'Opera',
                    //     y: 1.6
                    // }, {
                    //     name: 'QQ',
                    //     y: 1.2
                    // }, {
                    //     name: 'Other',
                    //     y: 2.61
                    // }]
                }
            ],
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(usageByApplicationOptions);
    }

    // SOCIAL CHANNEL HEAT MAP
    public SocialChannelHeatMapOptions(data): Observable<{}> {
        const that = this;
        let heatmapChartOptions = {
            ...this.commonHighChartOptions,
            chart: {
                plotBorderWidth: 1,
                style: {
                    ...this.styleOptions
                },
            },
            className: 'heat-map',
            legend: {
                enabled: false,
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            xAxis: {
                categories: data.xcategories,
                type: 'datetime',
                labels: {
                    autoRotationLimit: 80,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
                // dateTimeLabelFormats: {
                //     day: '%I %p',
                //     hour: '%I %p',
                //     minute: '%I:%M %p'
                // },
                title: {
                    useHTML: true,
                    text: `<p class="gmt-text gmttext-app-tz" id="gmt-text">Time <span>(${this.timezoneCreator()})</span></p>`,
                    align: 'left',
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions_legendtext
                    },


                }


            },
            yAxis: {
                categories: data.ycategories,
                title: null,
                reversed: true,
                labels: {
                    align: 'left',
                    reserveSpace: true,
                    style: {
                        ...this.styleOptions_yaxis,
                    }
                },
                style: {
                    stacking: 'normal',

                    ...this.styleOptions

                },

            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#fefefe'],
                    [0.01, '#fafcfd'],
                    [0.10, '#dcebf3'],
                    [0.11, '#daeaf2'],
                    [0.20, '#c7dbe9'],
                    [0.21, '#d0dee8'],
                    [0.30, '#b4cce0'],
                    [0.31, '#b0c9df'],
                    [0.40, '#a0bdd7'],
                    [0.41, '#aec3d9'],
                    [0.49, '#6984ba'],
                    [0.50, '#f3df8f'],
                    [0.51, '#f0e0a3'],
                    [0.60, '#e9ba79'],
                    [0.61, '#e9b672'],
                    [0.70, '#df9257'],
                    [0.71, '#de8f55'],
                    [0.80, '#ce7a50'],
                    [0.81, '#ca6a3a'],
                    [0.90, '#b84822'],
                    [0.99, '#b74620'],
                    [1, '#b74620']
                ],

            },
            tooltip: {
                formatter: function () {
                    return `<b> ${this.series.yAxis.categories[this.point.y]}<b> <br/> 
                           ${that.language.hours}  <b> ${this.series.xAxis.categories[this.point.x]} - ${this.series.xAxis.categories[this.point.x + 1]}</b> <br/>  
                            <b> ${this.point.value}% </b> ${that.language.OfSubscribers}  `;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            lang: {
                noData: this.language["No Data Available"]
            },
            series: [{
                type: 'heatmap',
                animation: {
                    duration: 1000
                },
                data: data.heatmapdata,
                dataLabels: {
                    enabled: false,
                }
            }],
            plotOptions: {
                series: {
                    point: {
                        events: {

                        }
                    }
                }
            },

        };
        return of(heatmapChartOptions);
    }


    // SOCIAL CHANNEL HEAT MAP
    public SocialChannelHeatMapHomeOptions(data): Observable<{}> {
        let that = this;
        let heatmapChartOptions = {
            ...this.commonHighChartOptions,
            chart: {
                plotBorderWidth: 1,
                style: {
                    ...this.styleOptions
                },
            },
            className: 'heat-map',
            legend: {
                enabled: false,
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            xAxis: {
                categories: data.xcategories,
                type: 'datetime',
                labels: {
                    autoRotationLimit: 80,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
                // dateTimeLabelFormats: {
                //     day: '%I %p',
                //     hour: '%I %p',
                //     minute: '%I:%M %p'
                // },
                title: {
                    useHTML: true,
                    text: `<p class="gmt-text gmttext-home-tz" id="gmt-text">Time <span>(${this.timezoneCreator()})</span></p>`,
                    align: 'left',
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions_legendtext
                    },


                }


            },
            yAxis: {
                categories: data.ycategories,
                title: null,
                reversed: true,
                labels: {
                    align: 'left',
                    reserveSpace: true,
                    style: {
                        ...this.styleOptions_yaxis,
                    }
                },
                style: {
                    stacking: 'normal',

                    ...this.styleOptions

                },

            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#fefefe'],
                    [0.01, '#fafcfd'],
                    [0.10, '#dcebf3'],
                    [0.11, '#daeaf2'],
                    [0.20, '#c7dbe9'],
                    [0.21, '#d0dee8'],
                    [0.30, '#b4cce0'],
                    [0.31, '#b0c9df'],
                    [0.40, '#a0bdd7'],
                    [0.41, '#aec3d9'],
                    [0.49, '#6984ba'],
                    [0.50, '#f3df8f'],
                    [0.51, '#f0e0a3'],
                    [0.60, '#e9ba79'],
                    [0.61, '#e9b672'],
                    [0.70, '#df9257'],
                    [0.71, '#de8f55'],
                    [0.80, '#ce7a50'],
                    [0.81, '#ca6a3a'],
                    [0.90, '#b84822'],
                    [0.99, '#b74620'],
                    [1, '#b74620']
                ],

            },
            tooltip: {
                formatter: function () {
                    return `<b> ${this.series.yAxis.categories[this.point.y]}<b> <br/> 
                            ${that.language['hours']}  <b> ${this.series.xAxis.categories[this.point.x]} - ${this.series.xAxis.categories[this.point.x + 1]}</b> <br/>  
                            <b> ${this.point.value}% </b> of ${that.language['Subscribers']}  `;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },

            series: [{
                type: 'heatmap',
                animation: {
                    duration: 1000
                },
                data: data.heatmapdata,
                dataLabels: {
                    enabled: false,
                }
            }],
            lang: {
                noData: this.language["No Data Available"]
            },
            plotOptions: {
                series: {
                    point: {
                        events: {

                        }
                    }
                }
            },

        };
        return of(heatmapChartOptions);
    }
    // CHURN RATE INSIGHTS
    public churnRateInsightsOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        this.data_Series_ChurnInsightRate = [];
        for (var i = 0; i < data.series.length; i++) {
            this.data1_Active_ChurnInsightRate = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                // if(data.series[i].data[j]==selected.yValue){    
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.data1_Active_ChurnInsightRate.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.data1_Active_ChurnInsightRate.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.data1_Active_ChurnInsightRate.push({ 'y': data.series[i].data[j] })
                }
            }
            this.data_Series_ChurnInsightRate.push({ 'name': data.series[i].name, 'data': this.data1_Active_ChurnInsightRate })
        }
        let category = this.addMonthOnCategories(data.categories)
        let churnRateInsightsOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedAqiteColors,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
            },
            xAxis: {
                categories: category,
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

                    let percent = data.categoryExistingTotal[this.point.x] != 0 ? + Highcharts.numberFormat((data.categoryFeatureTotal[this.point.x] / data.categoryExistingTotal[this.point.x]) * 100, 2) + '%' : '';
                    let percent_final = percent != '' ? percent : + '0.00' + '%';
                    return this.series.xAxis.categories[this.point.x] + ', ' + this.series.name + ', ' + percent_final +
                        '<br><b>' + `${that.language.churnedsub}` + ': ' + Highcharts.numberFormat(this.point.y, 0, '', ',') + '</b><br>' +
                        '<b>' + `${that.language.existingsub}` + ':' + Highcharts.numberFormat(data.totalObj[this.series.name][this.point.index], 0, '', ',') +
                        '</b><br>';

                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    allowPointSelect: true,
                    maxPointWidth: 16,
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
            // series: data.series,
            series: this.data_Series_ChurnInsightRate,
            yAxis: {
                min: 0,
                // softMax: 1,
                softMax: 10,
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
                        return this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0);
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
                        let percent = data.categoryExistingTotal[this.x] != 0 ? Highcharts.numberFormat((data.categoryFeatureTotal[this.x] / data.categoryExistingTotal[this.x]) * 100, 2) + '%' : '0.00' + '%';
                        // let percent_final = percent != '' ? percent : ' (' + 0.0 + '%)';

                        return percent
                    },
                    style: {
                        ...this.styleOptions
                    },
                },
                reversedStacks: false,
            },
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(churnRateInsightsOptions);
    }




    // CHURN RATE INSIGHTS INLINE CHARTS
    public churnRateSubscriberUsageOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let streamingOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,
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
                        return Highcharts.numberFormat(this.total, 1, '.', ',') + 'GB';
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
                headerFormat: '<span>{point.key}</span><div>',
                pointFormat: '<div><span style="color:{series.color};padding:0"></span>' +
                    '<span style="padding:0">{series.name}: <b>{point.y} GB</b></span> <br></div>',
                footerFormat: '</div>',
                shared: true,
                useHTML: true,
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
    public churnRateServiceLimitOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let serviceOptions = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'line',
                style: {
                    ...this.styleOptions
                },
            },
            colors: ['#5ACFEA', '#0027FF'],
            xAxis: {
                categories: categories,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis

                    },
                },
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                softMax: 1,
                title: {
                    text: '',
                    style: {
                        ...this.styleOptions_legendtext
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
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                series: {
                    ...this.linePlotOptions,
                    marker: {
                        enabled: true
                    },
                    point: {
                        events: {

                        }
                    }
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
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(serviceOptions);
    }

    public subscriberCompetitorOptions(data): Observable<{}> {
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
                        return ``;
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                }
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions
                }
            },
            tooltip: {
                crosshairs: true,
                headerFormat: '<span>{point.key}</span><div>',
                pointFormat: '<div><span style="color:{series.color};padding:0"></span>' +
                    '<span style="padding:0">{series.name}: <b>{point.y} minutes</b></span><br></div>',
                footerFormat: '</div>',
                shared: true,
                useHTML: true,
                style: {
                    ...this.styleOptions
                }
            },

            series: data.series,
            plotOptions: {
                column: {
                    minPointLength: 3,
                    borderWidth: 0,
                },
                series: {
                    min: 0,
                    stacking: null,
                    maxPointWidth: 16,
                    borderRadius: 0,
                    point: {
                        events: {

                        }
                    }
                },
            },
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(subscriberCompetitorChartOptions);
    }
    public serviceTierOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        var that = this;
        let servicetierOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,

            chart: {
                type: 'scatter',
                style: {
                    ...this.styleOptions
                },

            },
            xAxis: {
                categories: categories,
            },

            yAxis: {
                min: 0,
                allowDecimals: false,
                labels: {
                    style: {
                        ...this.styleOptions
                    }
                },
                title: {
                    text: '',
                    style: {
                        ...this.styleOptions
                    }
                }
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions
                }
            },
            tooltip: {
                formatter: function () {
                    var tooltip = that.serviceTierTooltipInfoGenerate(this.point.x, data);
                    tooltip = tooltip ? tooltip : '<b>${this.x}: </b>';
                    return `${this.series.name} <br/> 
                            ${tooltip} <br/>`;
                },
                style: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                marker: {
                    enabled: true
                },
                column: {
                    minPointLength: 3,
                    borderWidth: 0
                }
            },

            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(servicetierOptions);
    }

    // AQUISITION
    // NEW SUBSCRIBERS TIER
    public newsubscribersTierTechChartOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        // data.series.filter(arrayData => {
        //     arrayData.data.filter((value, index) => {
        //         if (value === 0) {
        //             arrayData.data.splice(index, 1, null);
        //         }
        //     })
        // })
        this.data_tier_series = [];
        for (var i = 0; i < data.series.length; i++) {
            this.tier_Service_Array = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.tier_Service_Array.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.tier_Service_Array.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.tier_Service_Array.push({ 'y': data.series[i].data[j] })
                }
            }
            // if (sessionStorage.getItem('defaultLanguage') == 'fr') {
            //     if (data.series[i].name === 'Fiber') {
            //         data.series[i].name = 'Fibre'
            //     }
            // }
            data.series[i].name = data.series[i].name;
            this.data_tier_series.push({ 'name': data.series[i].name, 'data': this.tier_Service_Array })
        }

        let totalsubs: any;
        totalsubs = this.marketingExploreCommonService.sumOfObjectValues(data.totals);
        let newsubscribercolumnChartOptions = {
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
                    }
                },

            },
            yAxis: {
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
                    }
                },
                reversedStacks: false,
                min: 0,
                softMax: 1,
                allowDecimals: false,
                title: {
                    text: this.language.Subscribers,
                    style: {
                        fontWeight: 'normal',
                        ...this.styleOptions_legendtext
                    }
                },
                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.total, 0, '', ',');
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                }
            },
            legend: {
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions
                }
            },

            tooltip: {
                formatter: function () {
                    return this.series.xAxis.categories[this.point.x] + ' ' + ` ${that.language.Total}` + ': ' + Highcharts.numberFormat(data.totals[this.key], 0, '', ',') +
                        ' (' + Highcharts.numberFormat(data.totals[this.key] / (totalsubs / 100), 1) + '%' + ')<br>' +
                        '<b>' + this.series.name + ': ' + Highcharts.numberFormat(this.point.y, 0, '', ',') + ' (' +
                        Highcharts.numberFormat(this.point.y / (totalsubs / 100), 1) + '%)</b><br>';
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            series: this.data_tier_series,
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
                        select: {
                            ...this.selectOptions,
                        }
                    },
                },
                column: {
                    minPointLength: 3,
                    borderWidth: 0,
                }
            },
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(newsubscribercolumnChartOptions);
    }
    // AQUISITION RATES INSIGHTS
    public acquisitionRateInsightsOptions(data, selected: any = {}): Observable<{}> {
        const that = this;
        this.data_RateInsight_series = [];
        for (var i = 0; i < data.series.length; i++) {
            this.data1_acquisation_rate = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                // if(data.series[i].data[j]==selected.yValue){    
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.data1_acquisation_rate.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.data1_acquisation_rate.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.data1_acquisation_rate.push({ 'y': data.series[i].data[j] })
                }
            }
            this.data_RateInsight_series.push({ 'name': data.series[i].name, 'data': this.data1_acquisation_rate })
        }
        let category = this.addMonthOnCategories(data.categories);
        let acquitionrateOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedAqiteColors,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
            },
            xAxis: {
                categories: category,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                reversedStacks: false,
                labels:
                {
                    style: {
                        ...this.styleOptions_yaxis
                    },
                },
                title: {
                    text: this.language.Subscribers,
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
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
                        }
                    },
                },

                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.total, 0, '', ',');
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions
                    }
                },
            },
            legend: {
                // width: 300,
                fontSize: '10px',
                reversed: false,
                align: 'center',
                itemStyle: {
                    ...this.styleOptions
                }
            },
            tooltip: {
                formatter: function () {
                    return ` ${category[this.point.x]}, ${this.series.name} <br/>                             <b> ${that.language.acquiredsub}:   ${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/> 
                            <b${that.language.Total} ${that.language.acquiredsub}:  ${Highcharts.numberFormat(data.categoryFeatureTotal[this.point.x], 0, '', ',')} </b> <br/> 
                            <b> ${that.language.existingsub}:  ${Highcharts.numberFormat(data.totalObj[this.series.name][this.point.x], 0, '', ',')}  </b>    `;
                },
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    allowPointSelect: true,
                    maxPointWidth: 16,
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
                    minPointLength: 3,
                    borderWidth: 0,
                }
            },
            series: this.data_RateInsight_series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(acquitionrateOptions);
    }
    // AQUISITION REVENUE INSIGHTS
    public acquisitionRevenueInsightsOptions(data, selected: any = {}): Observable<{}> {
        this.data_Revenue_series = [];
        for (var i = 0; i < data.series.length; i++) {
            this.data1_Acquisation_Revenue = [];
            for (var j = 0; j < data.series[i].data.length; j++) {
                // if(data.series[i].data[j]==selected.yValue){    
                if (i == selected.indexS) {
                    if (j == selected.index) {
                        this.data1_Acquisation_Revenue.push({ 'y': data.series[i].data[j], borderColor: '#008000', 'selected': true })
                    } else {
                        this.data1_Acquisation_Revenue.push({ 'y': data.series[i].data[j] })
                    }
                }
                else {
                    this.data1_Acquisation_Revenue.push({ 'y': data.series[i].data[j] })
                }
            }
            // if (sessionStorage.getItem('defaultLanguage') == 'fr') {
            //     if (data.series[i].name === 'Current Revenue') {
            //         data.series[i].name = 'Revenu courant';
            //     } else if (data.series[i].name === 'Potential Revenue') {
            //         data.series[i].name = 'Revenu Potentiel'
            //     }
            // }
            this.data_Revenue_series.push({ 'name': data.series[i].name, 'data': this.data1_Acquisation_Revenue })
        }
        let category = this.addMonthOnCategories(data.categories)
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        let acquisitionRevenueOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,
            chart: {
                type: 'column',
                style: {
                    ...this.styleOptions
                },
                thousandsSep: ','
            },
            xAxis: {
                categories: category,
                labels: {
                    ...this.xAxisLabels,
                    style: {
                        ...this.styleOptions_xaxis
                    }
                },
            },
            yAxis: {
                min: 0,
                softMax: 1,
                allowDecimals: false,
                title: {
                    text: this.language.Revenue,
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions_legendtext
                    }
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
                    }
                },
                stackLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return '$' + Highcharts.numberFormat(this.total, 0, '', ',');
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
                headerFormat: '{point.x}<br>',
                pointFormat: `<span style="color:{point.color}">● </span>{series.name}:<b>$ {point.y:,.0f} </b> <br>`,
                shared: true,
                style: {
                    ...this.styleOptions_tooltip
                }
            },
            plotOptions: {
                series: {
                    ...this.plotOptions,
                    allowPointSelect: true,
                    maxPointWidth: 16,
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
                    minPointLength: 3,
                    borderWidth: 0,
                }
            },
            // series: data.series
            series: this.data_Revenue_series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(acquisitionRevenueOptions);
    }
    // AQUISITION INLINE CHARTS 
    // SUBSCRIBER REVENUE
    public acquisitionSubscriberRevenueOptions(data): Observable<{}> {
        let gaugeOptions = {
            chart: {
                type: 'solidgauge',
                style: {
                    ...this.styleOptions
                },
            },
            title: null,
            colors: ['#7dc82e'],
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        borderWidth: 0,
                        useHTML: false
                    }
                }
            }
        };

        // The speed gauge
        let chartSpeed: any = {
            ...gaugeOptions,
            yAxis: {
                min: 0,
                valueSuffix: '$',
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                // title: {
                //     y: -70
                // },
                labels: {
                    y: 16,
                    formatter: function () {
                        return '$' + this.value.toFixed(0);
                    },
                    style: {
                        ...this.styleOptions
                    },
                }

            },
            tooltip: { enabled: false },
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            series: [{
                data: [data],
                dataLabels: {
                    format:
                        '<div style="text-align:center;margin-top: -30px">' +
                        '<span style="font-size:10px;color: #4c4c4c";> ${y}</span><br/>' +
                        '</div>'
                },

            }],
            lang: {
                noData: this.language["No Data Available"]
            },
        };

        return of(chartSpeed);
    }
    // SUBSCRIBER USAGE
    public acquisitionSubscribersUsageOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let acquisitionSubscribersUsageOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,

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
                    // formatter: function () {
                    //     var label = this.axis.defaultLabelFormatter.call(this);
                    //     // Use thousands separator for four-digit numbers too
                    //     if (/^[0-9]{4,}$/.test(label)) {
                    //         return Highcharts.numberFormat(this.value, 1, '.', ',') + ' GB';
                    //     }
                    //     return label;
                    // },
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
                        return this.total + ' GB';
                    },
                    style: {
                        stacking: 'normal',
                        ...this.styleOptions_stacklabel
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
                    cursor: 'pointer',
                    maxPointWidth: 24,
                    borderRadius: 0,
                    point: {
                        events: {

                        }
                    },
                    marker: {
                        enabled: false
                    },
                },
                column: {
                    minPointLength: 3,
                    borderWidth: 0,
                }

            },
            tooltip: {
                valueDecimals: 2,
                crosshairs: true,
                headerFormat: '<span>{point.key}</span><div>',
                pointFormat: '<div><span style="color:{series.color};padding:0"></span>' +
                    '<span style="padding:0">{series.name}: <b>{point.y} GB</b></span> <br></div>',
                footerFormat: '</div>',
                shared: true,
                useHTML: true,
                style: {
                    ...this.styleOptions
                }
            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(acquisitionSubscribersUsageOptions);
    }
    // SERVICE LIMITS
    public acquitionservicelimitOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let acqserviceOptions = {
            ...this.commonHighChartOptions,
            colors: ['#5ACFEA', '#0027FF'],
            chart: {
                type: 'line',
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
                min: 0,
                softMax: 10,
                allowDecimals: false,

                title: {
                    text: '',
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
                    ...this.linePlotOptions,
                    cursor: 'pointer',
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {

                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name} <br/> 
                            <b>${this.x}: ${this.point.y}</b> <br/>`;
                },
                style: {
                    ...this.styleOptions
                }
            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(acqserviceOptions);
    }
    // WIFI TRENDS 
    public acquisitionWiFiTrendsOptions(data): Observable<{}> {
        let categories = this.addMonthOnCategories(data.categories);
        let acqwifiOptions = {
            ...this.commonHighChartOptions,
            colors: this.stackedColumnColors,
            chart: {
                zoomType: 'xy',
                style: {
                    ...this.styleOptions
                },

            },
            xAxis: {
                categories: categories,
                labels: {
                    style: {
                        ...this.styleOptions
                    },
                }
            },
            yAxis: [{ // Primary yAxis
                min: 0,
                softMax: 1,
                allowDecimals: false,
                tickInterval: 5,
                labels: {
                    format: '',
                    style: {
                        ...this.styleOptions
                    }
                },
                title: {
                    text: '',
                    style: {
                        ...this.styleOptions
                    }
                }
            }, { // Secondary yAxis
                min: 0,
                softMax: 1,
                allowDecimals: false,
                tickInterval: 5,
                title: {
                    text: '',
                    style: {
                        ...this.styleOptions
                    }
                },
                labels: {
                    format: '',
                    style: {
                        ...this.styleOptions
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function () {
                    return `${this.series.name} <br/> 
                            <b>${this.x}: ${this.point.y}</b> <br/>`;
                },
                style: {
                    ...this.styleOptions
                },
                shared: false
            },
            legend: {
                reversed: false,
                itemStyle: {
                    ...this.styleOptions
                }
            },
            plotOptions: {
                series: {
                    states: {
                        inactive: {
                            enabled: true
                        }
                    },
                    cursor: 'pointer',
                    maxPointWidth: 24,
                    borderRadius: 0,
                },
                line: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: data.series,
            lang: {
                noData: this.language["No Data Available"]
            },
        };
        return of(acqwifiOptions);
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
    public serviceTierTooltipInfoGenerate(x: string | number, chartData: any) {
        let data = chartData.series[0];
        let tooltip = '';
        tooltip = '<b>' + data.tierDate[x] + ': ' + data.tierDesc[x] + '</b>';
        return tooltip;
    }


    timezoneCreator() {
        // attempt to get short Timezone, fallback to full name, extra fallback to UTC.
        let timeZone: any;
        let date = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' });
        // let date = 'Fri Dec 17 2021 14:59:07 GMT+0530'

        if (date && date.split(' ').length > 2) {
            if (date.split(' ')[2] == 'GMT-3:30') {
                timeZone = 'NST'
            } else {
                timeZone = date.split(' ')[2];
            }
            // console.log(timeZone, '11111****')
        } else if (Intl && Intl.DateTimeFormat() && Intl.DateTimeFormat().resolvedOptions() && Intl.DateTimeFormat().resolvedOptions().timeZone) {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // console.log(timeZone, '11222****')
        } else {
            timeZone = moment().format("Z");
        }
        return timeZone;
    }

    timeZoneCreatorForApi() {
        let timeZone = this.timezoneCreator();
        let timeZoneWithDot = timeZone.replace(':', '.');
        let timeZoneArray = timeZoneWithDot.split('+' || '-')
        let timeAndMinutes = timeZoneArray[1];
        let onlyTime = timeAndMinutes.split('.');
        let timeZoneForApi = +onlyTime[0] < 10 ? `0${onlyTime[0]}.${onlyTime[1]}` : `${onlyTime[0]}.${onlyTime[1]}`;
        return timeZoneForApi
    }

    getTimezone() {
        var timezone_offset_min = new Date().getTimezoneOffset(),
            offset_hrs = parseInt(Math.abs(timezone_offset_min / 60).toString()).toString(),
            offset_min = Math.abs(timezone_offset_min % 60).toString(),
            timezone_standard;

        if (Number(offset_hrs) < 10)
            offset_hrs = '0' + offset_hrs;

        if (Number(offset_min) < 10)
            offset_min = '0' + offset_min;

        // Add an opposite sign to the offset
        // If offset is 0, it means timezone is UTC
        if (timezone_offset_min < 0)
            timezone_standard = 'GMT+ ' + offset_hrs + ':' + offset_min;
        else if (timezone_offset_min > 0)
            timezone_standard = 'GMT-' + offset_hrs + ':' + offset_min;
        else if (timezone_offset_min == 0)
            timezone_standard = 'GMT+ ' + '00:00';


        return timezone_standard
        // Timezone difference in hours and minutes
        // String such as +5:30 or -6:00 or Z
        //console.log(timezone_standard);
    }


}
