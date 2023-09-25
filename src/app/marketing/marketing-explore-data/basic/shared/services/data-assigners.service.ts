import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingExploreDataSubscriberApiService } from '../../marketing-subscrib-chart/marketing-explore-data-subscriberapi.service';
import { MarketingExploreCommonService } from './explore-data-common.service';
import * as constants from "../../../../shared/constants/marketing.constants";
import { type } from 'os';
import { months } from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
@Injectable({
    providedIn: 'root'
})
export class MarketingExploreDataAssignerService {
    language: any;
    languageSubject: any;
    constructor(
        private marketingExploreDataSubscriberApiService: MarketingExploreDataSubscriberApiService,
        private marketingExploreCommonService: MarketingExploreCommonService,
        private translateService: TranslateService,

    ) {
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
    }
    //  CATEGORIES ASSIGNER
    assignCategoriesFunction(arrayOrObj) {
        let series = Object.values(arrayOrObj);
        let categories = Object.values(series);
        let categoriesArray = []
        categories.forEach(el => {
            categoriesArray.push(...Object.keys(el));
        });
        return categoriesArray;

    }
    //  SERIES ASSIGNER
    assignSeriesFunction(arrayOrObj) {
        let series = Object.values(arrayOrObj);
        let categories = Object.values(series);
        let seriesArray = []
        categories.forEach(el => {
            if (Object.values(el).length >= 1) {
                let newArray = Object.values(el);
                seriesArray.push(...Object.values(newArray));
            } else {
                seriesArray.push(...Object.values(el));
            }

        });
        return seriesArray;
    }
    // ARRAY & OBJECT SUM
    getArraySum(value) {
        let arrayData = value;
        if (typeof arrayData == 'object') {
            arrayData = Object.values(value);
        }
        let sum = value.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sum;
    }
    // GET OBJECT LENGTH
    keyLength(data) {
        let keys = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                keys.push(key);
            }
            return keys.length;
        }
    }
    // ARRAY ELEMENT SPLICE
    elementRemover(array, arrayElement) {
        let returnArray = [];
        array.forEach(el => {
            if (el != arrayElement) {
                returnArray.push(el)
            }
        });
        return returnArray;
    }

    //DATA ASSIGNERS
    // SUBSCRIBERS DATA USAGE
    subscriberDataUsageDataFormatter(data) {
        let results = {};
        results['series'] = this.assignSeriesFunction(data);
        var categories = this.assignCategoriesFunction(data);
        results['totalSubs'] = +this.marketingExploreDataSubscriberApiService.getActiveSubscribersCount();
        var resultcategory = [];
        for (var i = 0; i < categories.length; i++) {
            var key = categories[i];
            const sizes = ['GB', 'TB'];
            var size1 = "";
            var size2 = "";
            var value1 = "";
            var value2 = "";
            var conversion1 = "";
            var conversion2 = "";
            var keydata = key.split("-");
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
                var keydata = key.split("+");
                if (Number(keydata[0]) >= 1000) {
                    size1 = sizes[1];
                    if (keydata[0].includes('001')) {
                        let value = keydata[0];
                        value1 = ((Number(value) + 9) / 1000).toFixed(2);
                    } else {
                        value1 = (keydata[0] / 1000).toFixed(2);
                    }
                    // value1 = ((keydata[0] + 9) / 1000).toFixed(2);
                }
                else if (Number(keydata[0]) < 1000) {
                    size1 = sizes[0];
                    value1 = keydata[0];
                }
                conversion1 = value1 + size1 + "+";
            }
            resultcategory.push(conversion1 + conversion2);
        }
        results['categories'] = resultcategory;
        return results;
    }
    // STREAMING,GAMING,WFH SUBSCRIBERS
    streamGameWFHsubscribersDataFormatter(data, seriesNames) {
        let map = {};
        let series = [];
        let categories = [];
        let totals = {};
        for (let i = 0; i < seriesNames.length; i++) {
            for (let j in data) {
                if (data.hasOwnProperty(j)) {
                    if (!map[seriesNames[i]]) {
                        map[seriesNames[i]] = [];
                    }
                    for (let k in data[j]) { // single item object
                        if (data[j].hasOwnProperty(k)) {
                            if (i == 0) { // only save the categories during first outer-outer loop
                                categories.push(k);
                            }
                            map[seriesNames[i]].push(data[j][k][i]);
                            if (totals[k]) {
                                totals[k] += data[j][k][i];
                            } else {
                                totals[k] = data[j][k][i];
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < seriesNames.length; i++) {
            if (seriesNames.hasOwnProperty(i)) {
                series.push({
                    name: seriesNames[i],
                    data: map[seriesNames[i]] != undefined ? map[seriesNames[i]] : []
                });
            }
        }
        return {
            categories: categories,
            series: series,
            totals: totals
        };
    }

    // DATA USAGE TRENDS
    dataUsageTrendsDataFormater(data) {
        let returnDataObject = {}
        let categories = [];
        let series = [];
        let streamingSeriesObject = { name: 'Streaming Usage (TB)', data: [] };
        let totalSeriesObject = { name: 'Total Usage (TB)', data: [] };
        data.streaming.forEach(el => {
            for (const key in el) {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    categories.push(key)
                    streamingSeriesObject.data.push(el[key] != 0 ? Math.floor(el[key] / 1024) : 0)
                }
            }
        });
        data.total.forEach(el => {
            for (const key in el) {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    totalSeriesObject.data.push(el[key] != 0 ? Math.floor(el[key] / 1024) : 0)
                }
            }
        });
        series.push(totalSeriesObject, streamingSeriesObject);
        returnDataObject['categories'] = categories;
        returnDataObject['series'] = series;
        return returnDataObject;


    }
    // SUBSCRIBER ACTIVITY TRENDS
    subscriberActivityTrendsDataForming(data) {
        let returnDataObject = {}
        let categories = [];
        let series = [];
        let gamingSeriesObject = { name: this.language['Gaming_Title'], data: [] }
        let streamingSeriesObject = { name: this.language['Streaming_Title'], data: [] };
        let wfhSeriesObject = { name: this.language['Work From Home Subscribers'], data: [] };
        // let gamingSeriesObject;
        // let streamingSeriesObject;
        // let wfhSeriesObject;
        // if (sessionStorage.getItem('defaultLanguage') == 'fr') {
        //     gamingSeriesObject = { name: "Abonnés joueurs", data: [] }
        //     streamingSeriesObject = { name: 'Abonnés vidéo', data: [] };
        //     wfhSeriesObject = { name: 'Abonnés travaillant à la maison', data: [] };
        // } else {
        //     gamingSeriesObject = { name: "Gaming Subscribers", data: [] }
        //     streamingSeriesObject = { name: 'Streaming Subscribers', data: [] };
        //     wfhSeriesObject = { name: 'Work From Home Subscribers', data: [] };
        // }
        data.streaming.forEach(el => {
            for (const key in el) {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    categories.push(key)
                    streamingSeriesObject.data.push(el[key])
                }
            }
        });
        data['work from home'].forEach(el => {
            for (const key in el) {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    wfhSeriesObject.data.push(el[key])
                }
            }
        });
        data.gaming.forEach(el => {
            for (const key in el) {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    gamingSeriesObject.data.push(el[key])
                }
            }
        });
        series.push(streamingSeriesObject, wfhSeriesObject, gamingSeriesObject);
        returnDataObject['categories'] = categories;
        returnDataObject['series'] = series;
        return returnDataObject;
    }
    // DEVICE PER HOUSEHOLD
    devicePerHouseHoldDataFormater(data) {
        let results = {};
        results['series'] = this.assignSeriesFunction(data);
        results['categories'] = this.assignCategoriesFunction(data);
        results['totalSubs'] = this.getArraySum(results['series']);
        return results;
    }

    // HOUSEHOLD DEVICES TRENDS
    houseHoldDataForming(data) {
        let returnObject = {}
        returnObject['categories'] = data.numberOfDevices.map(el => {
            return Object.keys(el)
        });
        returnObject["numberOfDevices"] = data.numberOfDevices.map(el => {
            el = Object.values(el)[0];
            return el == null || el == 'null' ? [0] : [el]
        });
        returnObject['wifiScore'] = data.wifiScore.map(el => {
            el = Object.values(el)[0];
            return el == null || el == 'null' ? [0] : [el]
        });
        return returnObject;
    }
    // SERVICE MODULE ADOPTION  & WIFI DEVICE CATEGORY TRENDS
    commonDataFormatter(results, dataFormatFunc = undefined) {
        let categories = [];
        let series = [];
        let index = 0;
        for (let i in results) {
            if (results.hasOwnProperty(i)) {
                let name = i;
                let data = [];
                for (let j in results[i]) {
                    if (results[i].hasOwnProperty(j)) {
                        let item = results[i][j];
                        for (let k in item) { // expecting only one
                            if (item.hasOwnProperty(k)) {
                                if (index == 0) { // assumes symertical categories
                                    categories.push(k);
                                }
                                item[k] = item[k] == null ? 0 : item[k]
                                data.push(dataFormatFunc ? dataFormatFunc(item[k]) : item[k]);
                            }
                        }
                    }

                }
                series.push({
                    name: name,
                    data: data
                });
            }
            index++;
        }
        return {
            categories: categories,
            series: series
        };
    };

    // BLOCKED THREATS INSIGHTS
    blockThreatsInsightsDataFormatter(results) {
        var rearrange = []; // reformat for Highcharts pie data series
        var longline = -1;
        for (var i = 0; i < results.length; i++) {
            for (var j in results[i]) {
                if (results[i].hasOwnProperty(j)) {
                    rearrange.push([j, results[i][j]]);
                    // look for a name that has commas
                    if (j.indexOf(",") != -1) {
                        longline = i;
                    }
                }
            }
        }
        if (longline >= 0 && longline < rearrange.length) {
            var temp = rearrange[1];
            rearrange[1] = rearrange[longline];
            rearrange[longline] = temp;
        }
        return rearrange;
    }

    // USAGE BY APPLICATION && AQUISITION INLINE CHART 
    usageByApplicationDataFormatter(data) {
        let returnData = []
        for (const item of data) {
            for (var key in item) {
                returnData.push({ "name": key, "originalValue": item[key], "y": item[key] })
            }
        }
        return returnData;
    }
    // SOCIAL CHANNEL HEAT MAP
    socialChannelDataFormatter(data) {
        let results = {}
        results["xcategories"] = constants.HeatMap.XCategories;
        results["ycategories"] = [this.language.Sunday, this.language.Monday, this.language.Tuesday, this.language.Wednesday, this.language.Thursday, this.language.Friday, this.language.Saturday];
        results["heatmapdata"] = data.data ? data.data : [];
        return results;
    }
    // USAGE BY APP DRILL DOWN
    usageByAppDrillDownDataFormatter(data) {
        let returnArray = [];
        data.forEach(el => {
            let obj = {
                appName: Object.keys(el).toString(),
                totalUsage: '',
                pctUsage: '',
                avgSubs: '',
                avgPctSubs: ''
            }
            Object.values(el).forEach(el => {
                obj.totalUsage = el[0].toFixed(1);
                obj.pctUsage = (el[1] * 100).toFixed(1);
                obj.avgSubs = el[2];
                obj.avgPctSubs = (el[3] * 100).toFixed(1)
            });
            returnArray.push(obj)
        });
        console.log(returnArray,'returnArray')
        return returnArray;
    }
    // TOP APP & TOP GAMING APP
    topAppData(data) {
        let topapps = []
        for (const item of data) {
            for (var key in item) {
                topapps.push({ "application": key, 'application1': key, "average": item[key][0], "percentage": (item[key][1] * 100).toFixed(1) })
            }

        }
        return topapps;
    }
    topGamingAppData(data) {
        let topapps = []
        for (const item of data) {
            for (var key in item) {
                topapps.push({ "application": key, 'application1': this.marketingExploreCommonService.gamingReplacer(key), "average": item[key][0], "percentage": (item[key][1] * 100).toFixed(1) })
            }

        }
        return topapps;
    }

    topAppDrillDownDataFormatter(data) {
        let retuenArray = []
        for (const item of data) {
            for (var key in item) {
                retuenArray.push({ "date": key, "userCount": item[key][0], "userPercentage": (item[key][1] * 100).toFixed(1) })
            }
        }
        return retuenArray;
    }
    // SOCIAL CHANNEL APP LIST
    socialChannelsListDataFormatter(data) {
        let returnArray = [];
        if (data.length > 0) {
            data.forEach(el => {
                for (const key in el) {
                    if (Object.prototype.hasOwnProperty.call(el, key)) {
                        returnArray.push({ count: el[key], name: key, value: key });
                    }
                }
            });
        }
        return returnArray;
    }
    // CHURN RATE INSIGHTS
    churnRateInsightsDataFormatter(results) {
        let returnObject = {};
        var categories = [];
        var seriesObj = {};
        var totalObj = {};
        var total = 0;
        var categoryFeatureTotal = [];
        var categoryExistingTotal = [];

        let ndata = {};
        let types = {};
        results.forEach((element: any) => {
            if (typeof element === 'object') {
                Object.keys(element).forEach((monthKey: any) => {
                    ndata[monthKey] = {};

                    if (element[monthKey]) {
                        element[monthKey].forEach((dataObj: any) => {
                            if (typeof dataObj === 'object') {
                                Object.keys(dataObj).forEach((typeKey: any) => {
                                    if (dataObj[typeKey]) {
                                        ndata[monthKey][typeKey] = dataObj[typeKey];
                                    }

                                    types[typeKey] = typeKey;

                                });
                            }
                        });
                    }

                });
            }
        });

        //  console.log(ndata);

        Object.keys(ndata).forEach(monthKey => {
            var monthlyNewTotal = 0;
            var monthlyExistingTotal = 0;
            for (const key in types) {
                if (types.hasOwnProperty(key)) {
                    let newSubsExistingSubs = [];
                    if (ndata[monthKey][key]) {
                        newSubsExistingSubs = ndata[monthKey][key];
                    } else {
                        newSubsExistingSubs = [null, null];
                    }

                    let tier = key;
                    if (!seriesObj[tier]) {
                        seriesObj[tier] = [];
                    }
                    seriesObj[tier].push(newSubsExistingSubs[0]);
                    monthlyNewTotal += Number(newSubsExistingSubs[0]);
                    total += Number(newSubsExistingSubs[0]);
                    if (!totalObj[tier]) {
                        totalObj[tier] = [];
                    }
                    totalObj[tier].push(newSubsExistingSubs[1]);
                    monthlyExistingTotal += Number(newSubsExistingSubs[1]);
                }
            }
            categories.push(String(monthKey));
            categoryFeatureTotal.push(monthlyNewTotal);
            categoryExistingTotal.push(monthlyExistingTotal);

        });



        let series = [];
        for (const item in seriesObj) {
            let value, key;
            if (seriesObj.hasOwnProperty(item)) {
                value = seriesObj[item]
                key = item;
            }
            series.push({
                name: key,
                data: value,
            });
        };

        returnObject["categories"] = categories;
        returnObject["categoryFeatureTotal"] = categoryFeatureTotal;
        returnObject["series"] = series;
        returnObject['totalObj'] = totalObj;
        returnObject['categoryExistingTotal'] = categoryExistingTotal;
        returnObject['total'] = total;
        //  console.log(returnObject);
        return returnObject;

    }

    // churnRateInsightsDataFormatter(results) {
    //     let returnObject = {};
    //     var categories = [];
    //     var seriesObj = {};
    //     var totalObj = {};
    //     var total = 0;
    //     var categoryFeatureTotal = [];
    //     var categoryExistingTotal = [];

    //     let ndata = {};
    //     let types = {};
    //     results.forEach((element: any) => {
    //         if (typeof element === 'object') {
    //             Object.keys(element).forEach((monthKey: any) => {
    //                 ndata[monthKey] = {};

    //                 if (element[monthKey]) {
    //                     element[monthKey].forEach((dataObj: any) => {
    //                         if (typeof dataObj === 'object') {
    //                             Object.keys(dataObj).forEach((typeKey: any) => {
    //                                 if (dataObj[typeKey]) {
    //                                     ndata[monthKey][typeKey] = dataObj[typeKey];
    //                                 }

    //                                 types[typeKey] = typeKey;

    //                             });
    //                         }
    //                     });
    //                 }

    //             });
    //         }
    //     });

    //     console.log(ndata);

    //     Object.keys(ndata).forEach(monthKey => {
    //         var monthlyNewTotal = 0;
    //         var monthlyExistingTotal = 0;
    //         for (const key in types) {
    //             if (types.hasOwnProperty(key)) {
    //                 let newSubsExistingSubs = [];
    //                 if (ndata[monthKey][key]) {
    //                     newSubsExistingSubs = ndata[monthKey][key];
    //                 } else {
    //                     newSubsExistingSubs = [null, null];
    //                 }

    //                 let tier = key;
    //                 if (!seriesObj[tier]) {
    //                     seriesObj[tier] = [];
    //                 }
    //                 seriesObj[tier].push(newSubsExistingSubs[0]);
    //                 monthlyNewTotal += Number(newSubsExistingSubs[0]);
    //                 total += Number(newSubsExistingSubs[0]);
    //                 if (!totalObj[tier]) {
    //                     totalObj[tier] = [];
    //                 }
    //                 totalObj[tier].push(newSubsExistingSubs[1]);
    //                 monthlyExistingTotal += Number(newSubsExistingSubs[1]);
    //             }
    //         }
    //         categories.push(String(monthKey));
    //         categoryFeatureTotal.push(monthlyNewTotal);
    //         categoryExistingTotal.push(monthlyExistingTotal);

    //     });



    //     let series = [];
    //     for (const item in seriesObj) {
    //         let value, key;
    //         if (seriesObj.hasOwnProperty(item)) {
    //             value = seriesObj[item]
    //             key = item;
    //         }
    //         series.push({
    //             name: key,
    //             data: value,
    //         });
    //     };

    //     returnObject["categories"] = categories;
    //     returnObject["categoryFeatureTotal"] = categoryFeatureTotal;
    //     returnObject["series"] = series;
    //     returnObject['totalObj'] = totalObj;
    //     returnObject['categoryExistingTotal'] = categoryExistingTotal;
    //     returnObject['total'] = total;




    //     console.log(returnObject);
    //     return returnObject;

    // }
    // CHURN RATE INSIGHTS INLINE CHART DATA 
    churnRateInsightsInlineChartDataFormatter(data) {
        let returnObject = {
            competitor: {},
            deviceTrend: {},
            serviceTier: {},
            serviceUsage: {},
            serviceLimit: {}
        };
        let categories = data.map(el => el.month);
        //  Competitor
        let competitor = { name: 'Competitor Visit', data: [] }
        let speedTest = { name: 'Speed Test', data: [] };
        returnObject.competitor['categories'] = categories;
        competitor.data = data.map(el => el.competitor == null ? 0 : el.competitor)
        speedTest.data = data.map(el => el.speedTest == null ? 0 : el.speedTest)
        returnObject.competitor['totals'] = +this.getArraySum(speedTest.data) + +this.getArraySum(competitor.data);
        returnObject.competitor['series'] = [competitor, speedTest]
        // Device Trends
        returnObject.deviceTrend = this.acquisitionInnerTableDeviceTrendsDataFormatter(data);
        returnObject.serviceUsage = this.aquisitionInnerTableSubscriberUsageDataFormatter(data);
        returnObject.serviceLimit = this.aquisitionInnerTableServiceLimitDataFormatter(data)
        if (data[0].serviceChangeDesc == null || !undefined) {
            // serviceTier        
            let serviceTierScatterData = {
                name: "Service Tier Change",
                data: data.map(el => el.serviceChangeTier == null ? '' : el.serviceChangeTier),
                tierDesc: data.map(el => el.serviceChangeDesc == null ? '' : el.serviceChangeDesc),
                tierDate: data.map(el => el.serviceChangeDate == null ? '' : el.serviceChangeDate)
            }
            returnObject.serviceTier['categories'] = categories;
            returnObject.serviceTier['series'] = [serviceTierScatterData];
        }
        return returnObject;

    }

    // ACQUISITION REVENUE INSIGHTS
    aquisitionRevenueDataFormater(results) {
        let returnObject = {}
        var axisIndex = 1;
        var colorIndex = 0;
        var categories = [];
        var seriesObj = {};
        var totalObj = {};
        var countObj = {};
        var total = 0;
        var categoryCurrentRevenueTotal = [];
        var categoryPotentialRevenueTotal = [];
        var categoryMissedRevenueTotal = [];
        var categoryMissedData = [], categoryCurrentData = [];
        var categoryUserCountTotal = [];
        var totalMissedRevenue = 0, totalCurrentRevenue = 0;
        var drilldownObj = {};
        results.forEach(month => {
            for (var key in month) {
                if (month.hasOwnProperty(key)) {
                    var emptyCategory = false;
                    var monthlyCurrentRevenueTotal = 0;
                    var monthlyPotentialRevenueTotal = 0;
                    var monthlyUserCountTotal = 0;
                    colorIndex = 0;
                    if (typeof month[key] === 'object') {
                        month[key].forEach(wrapper => {
                            for (const key in wrapper) {
                                if (wrapper.hasOwnProperty(key)) {
                                    let currentAndPotentialRevenue = wrapper[key]
                                    let tier = key;
                                    if (!seriesObj[tier]) {
                                        seriesObj[tier] = [];
                                    }
                                    seriesObj[tier].push(currentAndPotentialRevenue[0]);
                                    monthlyCurrentRevenueTotal += Number(currentAndPotentialRevenue[0]);
                                    total += Number(currentAndPotentialRevenue[0]);
                                    if (!totalObj[tier]) {
                                        totalObj[tier] = [];
                                    }
                                    totalObj[tier].push(currentAndPotentialRevenue[1]);
                                    monthlyPotentialRevenueTotal += Number(currentAndPotentialRevenue[1]);
                                    if (!countObj[tier]) {
                                        countObj[tier] = [];
                                    }
                                    countObj[tier].push(currentAndPotentialRevenue[2]);
                                    monthlyUserCountTotal += Number(currentAndPotentialRevenue[2]);
                                    if (!drilldownObj[key]) {
                                        drilldownObj[key] = [];
                                    }
                                    drilldownObj[key].push({
                                        name: tier,
                                        data: [{ name: String(key) + ' Current', y: currentAndPotentialRevenue[0] }, { y: currentAndPotentialRevenue[1] - currentAndPotentialRevenue[0], name: String(key) + ' Potential' }],
                                        tooltip: {
                                            valuePrefix: '$'
                                        },
                                    });
                                };

                            }
                        });
                    };

                    if (!emptyCategory || this.keyLength(seriesObj) > 0) {
                        categories.push(String(key));
                    }
                    categoryMissedData.push(
                        Number(monthlyPotentialRevenueTotal) - Number(monthlyCurrentRevenueTotal),
                    );
                    categoryCurrentData.push(
                        Number(monthlyCurrentRevenueTotal),
                    );
                    axisIndex++;
                    categoryCurrentRevenueTotal.push(monthlyCurrentRevenueTotal);
                    categoryPotentialRevenueTotal.push(monthlyPotentialRevenueTotal);
                    categoryMissedRevenueTotal.push(monthlyPotentialRevenueTotal - monthlyCurrentRevenueTotal);
                    categoryUserCountTotal.push(monthlyUserCountTotal);
                    totalMissedRevenue = totalMissedRevenue + monthlyPotentialRevenueTotal - monthlyCurrentRevenueTotal;
                    totalCurrentRevenue += monthlyCurrentRevenueTotal;
                }
            }
        });

        var series = [];
        colorIndex = 0;
        series.push({
            name: this.language['currentrevenue'],
            data: categoryCurrentData,
        });
        series.push({
            name: this.language['POTENTIAL REVENUE'],
            data: categoryMissedData,
        });
        returnObject["series"] = series;
        returnObject["categories"] = categories
        returnObject['maxPotentialRevenue'] = (+totalCurrentRevenue + +totalMissedRevenue);
        returnObject['actualRevenue'] = totalCurrentRevenue;
        return returnObject;

    }
    // ACQUISITION RATE INSIGHTS   
    // aquisitionRateInsightsFormatData(results) {

    //     let returnObject = {};
    //     var categories = [];
    //     var seriesObj = {};
    //     var totalObj = {};
    //     var total = 0;
    //     var categoryFeatureTotal = [];
    //     var categoryExistingTotal = [];

    //     results.forEach(month => {
    //         for (var key in month) {
    //             if (month.hasOwnProperty(key)) {
    //                 var monthlyNewTotal = 0;
    //                 var monthlyExistingTotal = 0;
    //                 if (typeof month[key] === 'object') {
    //                     month[key].forEach(wrapper => {
    //                         for (const key in wrapper) {
    //                             if (wrapper.hasOwnProperty(key)) {
    //                                 let newSubsExistingSubs = wrapper[key]
    //                                 let tier = key;
    //                                 if (!seriesObj[tier]) {
    //                                     seriesObj[tier] = [];
    //                                 }
    //                                 seriesObj[tier].push(newSubsExistingSubs[0]);
    //                                 monthlyNewTotal += Number(newSubsExistingSubs[0]);
    //                                 total += Number(newSubsExistingSubs[0]);
    //                                 if (!totalObj[tier]) {
    //                                     totalObj[tier] = [];
    //                                 }
    //                                 totalObj[tier].push(newSubsExistingSubs[1]);
    //                                 monthlyExistingTotal += Number(newSubsExistingSubs[1]);
    //                             }
    //                         }
    //                     });
    //                 }
    //                 if (this.keyLength(seriesObj) > 0) {
    //                     categories.push(String(key));
    //                 }

    //                 categoryFeatureTotal.push(monthlyNewTotal);
    //                 categoryExistingTotal.push(monthlyExistingTotal);
    //             }
    //         }
    //     });
    //     let series = [];
    //     for (const item in seriesObj) {
    //         let value, key;
    //         if (seriesObj.hasOwnProperty(item)) {
    //             value = seriesObj[item]
    //             key = item;
    //         }
    //         series.push({
    //             name: key,
    //             data: value,
    //         });
    //     };

    //     returnObject["categories"] = categories;
    //     returnObject["categoryExistingTotal"] = categoryExistingTotal;
    //     returnObject["categoryFeatureTotal"] = categoryFeatureTotal;
    //     returnObject["series"] = series;
    //     returnObject['totalObj'] = totalObj;
    //     returnObject['total'] = total;
    //     return returnObject
    // }
    aquisitionRateInsightsFormatData(results) {
        let returnObject = {};
        var categories = [];
        var seriesObj = {};
        var totalObj = {};
        var total = 0;
        var categoryFeatureTotal = [];
        var categoryExistingTotal = [];

        let ndata = {};
        let types = {};
        results.forEach((element: any) => {
            if (typeof element === 'object') {
                Object.keys(element).forEach((monthKey: any) => {
                    ndata[monthKey] = {};

                    if (element[monthKey]) {
                        element[monthKey].forEach((dataObj: any) => {
                            if (typeof dataObj === 'object') {
                                Object.keys(dataObj).forEach((typeKey: any) => {
                                    if (dataObj[typeKey]) {
                                        ndata[monthKey][typeKey] = dataObj[typeKey];
                                    }

                                    types[typeKey] = typeKey;

                                });
                            }
                        });
                    }

                });
            }
        });

        //   console.log(ndata);

        Object.keys(ndata).forEach(monthKey => {
            var monthlyNewTotal = 0;
            var monthlyExistingTotal = 0;
            for (const key in types) {
                if (types.hasOwnProperty(key)) {
                    let newSubsExistingSubs = [];
                    if (ndata[monthKey][key]) {
                        newSubsExistingSubs = ndata[monthKey][key];
                    } else {
                        newSubsExistingSubs = [null, null];
                    }

                    let tier = key;
                    if (!seriesObj[tier]) {
                        seriesObj[tier] = [];
                    }
                    seriesObj[tier].push(newSubsExistingSubs[0]);
                    monthlyNewTotal += Number(newSubsExistingSubs[0]);
                    total += Number(newSubsExistingSubs[0]);
                    if (!totalObj[tier]) {
                        totalObj[tier] = [];
                    }
                    totalObj[tier].push(newSubsExistingSubs[1]);
                    monthlyExistingTotal += Number(newSubsExistingSubs[1]);
                }
            }
            categories.push(String(monthKey));
            categoryFeatureTotal.push(monthlyNewTotal);
            categoryExistingTotal.push(monthlyExistingTotal);

        });



        let series = [];
        for (const item in seriesObj) {
            let value, key;
            if (seriesObj.hasOwnProperty(item)) {
                value = seriesObj[item]
                key = item;
            }
            series.push({
                name: key,
                data: value,
            });
        };

        returnObject["categories"] = categories;
        returnObject["categoryFeatureTotal"] = categoryFeatureTotal;
        returnObject["series"] = series;
        returnObject['totalObj'] = totalObj;
        returnObject['categoryExistingTotal'] = categoryExistingTotal;
        returnObject['total'] = total;
        //  console.log(returnObject);
        return returnObject;

    }
    acquisitionInnerTabletopAppData(data) {
        let topapps = []
        for (const item of data) {
            for (var key in item) {
                topapps.push({ "application": key, "application1": key, "usage": (item[key]).toFixed(2) })
            }
        }
        return topapps;
    }
    // ACQUISITION & CHURN RATE INSIGHTS
    aquisitionInnerTableSubscriberUsageDataFormatter(data, chartID?: any) {
        let returnObject = {};
        let name = chartID == 'churn-rate-insights' ? '' : ' Usage';
        let gaming = { name: 'Gaming' + name, data: [] }
        let streaming = { name: 'Streaming' + name, data: [] };
        let other = { name: 'Other' + name, data: [] };
        returnObject['categories'] = data.map(el => el.month);
        gaming.data = data.map(el => el.gamingUsage == null ? 0 : el.gamingUsage)
        streaming.data = data.map(el => el.streamingUsage == null ? 0 : el.streamingUsage)
        other.data = data.map(el => el.totalUsage == null ? 0 : el.totalUsage - (el.streamingUsage + el.gamingUsage))
        let totalValues = data.map(el => el.totalUsage)
        returnObject['totals'] = (+this.getArraySum(totalValues)).toFixed(2)
        returnObject['gamingTotals'] = (+this.getArraySum(gaming.data)).toFixed(2)
        returnObject['streamingTotals'] = (+this.getArraySum(streaming.data)).toFixed(2)
        returnObject['series'] = [streaming, gaming, other]
        return returnObject;
    }
    aquisitionInnerTableServiceLimitDataFormatter(data) {
        let returnObject = {};
        let downStream = { name: `Downstream Limit Hits`, data: [] }
        let upStream = { name: `Upstream Limit Hits`, data: [] };
        returnObject['categories'] = data.map(el => el.month);
        downStream.data = data.map(el => el.downstreamServiceLimit == null ? 0 : el.downstreamServiceLimit)
        upStream.data = data.map(el => el.upstreamServiceLimit == null ? 0 : el.upstreamServiceLimit)
        returnObject['series'] = [upStream, downStream];
        returnObject['downstreamTotals'] = (+this.getArraySum(downStream.data)).toFixed(0);
        returnObject['upStreamTotals'] = (+this.getArraySum(upStream.data)).toFixed(0);
        return returnObject;
    }
    acquisitionInnerTableDeviceTrendsDataFormatter(data, page?: any) {
        let returnObject = {}
        let type = page ? 'line' : 'column';
        let wifi = { type: type, name: 'Wi-Fi Score', data: [] }
        let devices = { type: 'line', name: 'Devices', data: [] }
        returnObject['categories'] = data.map(el => el.month);
        wifi.data = data.map(el => el.wifiScore == null ? 0 : el.wifiScore)
        if (page) {
            devices.data = data.map(el => el.connectDevicesCount == null ? 0 : el.connectDevicesCount)
        } else {
            devices.data = data.map(el => el.numOfDevices == null ? 0 : el.numOfDevices)
        }
        returnObject['series'] = [wifi, devices];
        let wifiScoreCount = this.elementRemover(wifi.data, 0).length;
        let deviceCount = this.elementRemover(devices.data, 0).length;

        // returnObject['wifiScore'] = Math.round((+this.getArraySum(wifi.data)) / (wifiScoreCount != 0 ? wifiScoreCount : 1))
        // returnObject['connectDevicesCount'] = Math.round((+this.getArraySum(devices.data)) / (deviceCount != 0 ? deviceCount : 1))
        returnObject['wifiScore'] = (+this.getArraySum(wifi.data)).toFixed(0);
        returnObject['connectDevicesCount'] = (+this.getArraySum(devices.data)).toFixed(0);
        return returnObject;
    }


    //insight lens formatter
    deviceWifiTrendDataAssign(data, page?: any) {
        // let returnObject = {}
        // let type = page ? 'line' : 'column';
        // let wifi = { type: 'line', name: this.language.Wi_Fi_Score, data: [] }
        // let devices = { type: 'line', name: this.language.Devices_1, data: [] }
        // returnObject['categories'] = data.map(el => el.month);
        // wifi.data = data.map(el => el.wifiScore == null ? 0 : el.wifiScore)
        // if (page) {
        //     devices.data = data.map(el => el.connectDevicesCount == null ? 0 : el.connectDevicesCount)
        // } else {
        //     devices.data = data.map(el => el.numOfDevices == null ? 0 : el.numOfDevices)
        // }
        // returnObject['series'] = [wifi, devices];
        // let wifiScoreCount = this.elementRemover(wifi.data, 0).length;
        // let deviceCount = this.elementRemover(devices.data, 0).length;
        // returnObject['wifiScore'] = Math.round((+this.getArraySum(wifi.data)) / (wifiScoreCount != 0 ? wifiScoreCount : 1))
        // returnObject['connectDevicesCount'] = Math.round((+this.getArraySum(devices.data)) / (deviceCount != 0 ? deviceCount : 1))
        // return returnObject;
        let returnObject = {};
        let wifi = { name: this.language.Wi_Fi_Score, data: [] }
        let devices = { name: this.language.Devices_1, data: [] };
        let count;
        returnObject['categories'] = data.map(el => el.month);
        wifi.data = data.map(el => el.wifiScore == null ? 0 : el.wifiScore)
        devices.data = data.map(el => el.connectDevicesCount == null ? 0 : el.connectDevicesCount)
        //  count.data = data.length
        //   console.log(devices.data, '***** devices.data*****', wifi.data, count)
        returnObject['series'] = [wifi, devices];
        returnObject['wifiScore'] = (+this.getArraySum(wifi.data)).toFixed(0);
        returnObject['connectDevicesCount'] = (+this.getArraySum(devices.data)).toFixed(0);
        returnObject['datacount'] = data.length
        return returnObject;
    }

    competitorDataAssign(data: any,isSubscriber:any) {
        let returnObject = {}
        let competitor = { name: this.language.Competitor_Visits_1, data: [] }
        let speedTest = { name: this.language.Speed_Tests_1, data: [] };
        returnObject['categories'] = data.map(el => el.month);
        speedTest.data = data.map(el => el.speedTest == null ? 0 : el.speedTest)
        if(!isSubscriber){
        competitor.data = data.map(el => el.competitor == null ? 0 : el.competitor)
        returnObject['totals'] = +this.getArraySum(speedTest.data) + +this.getArraySum(competitor.data);
        returnObject['series'] = [competitor, speedTest]
        returnObject['speedTest'] = +this.getArraySum(speedTest.data)
        returnObject['competitor'] = +this.getArraySum(competitor.data);
        }else{
            returnObject['totals'] = +this.getArraySum(speedTest.data);
            returnObject['series'] = [speedTest]
            returnObject['speedTest'] = +this.getArraySum(speedTest.data)  
        }
        return returnObject;

    }
    serviceLimitDataAssign(data: any) {
        let returnObject = {};
        let downStream = { name: this.language.Downstream_Limit_Hits, data: [] }
        let upStream = { name: this.language.Upstream_Limit_Hits, data: [] };
        returnObject['categories'] = data.map(el => el.month);
        downStream.data = data.map(el => el.downstreamServiceLimit == null ? 0 : el.downstreamServiceLimit)
        upStream.data = data.map(el => el.upstreamServiceLimit == null ? 0 : el.upstreamServiceLimit)
        returnObject['series'] = [downStream, upStream];
        returnObject['downstreamTotals'] = (+this.getArraySum(downStream.data)).toFixed(0);
        returnObject['upStreamTotals'] = (+this.getArraySum(upStream.data)).toFixed(0);
        return returnObject;
    }

    subscriberUsageDataAssign(data: any) {
        let returnObject = {};
        let gaming = { name: this.language.Gaming_Usage, data: [] }
        let streaming = { name: this.language.Streaming_Usage, data: [] };
        let other = { name: this.language.Other_Usage, data: [] };
        returnObject['categories'] = data.map(el => el.month);
        gaming.data = data.map(el => el.gamingUsage == null ? 0 : el.gamingUsage)
        streaming.data = data.map(el => el.streamingUsage == null ? 0 : el.streamingUsage)
        other.data = data.map(el => el.totalUsage == null ? 0 : el.totalUsage - (el.streamingUsage + el.gamingUsage))
        let totalValues = data.map(el => el.totalUsage)
        returnObject['totals'] = (+this.getArraySum(totalValues)).toFixed(2)
        returnObject['gamingTotals'] = (+this.getArraySum(gaming.data)).toFixed(2)
        returnObject['streamingTotals'] = (+this.getArraySum(streaming.data)).toFixed(2)
        returnObject['series'] = [streaming, gaming, other]
        return returnObject;
    }

    topAppDataFormater(array) {
        let returnArray = [];
        array.forEach(el => {
            returnArray.push({ application1: Object.keys(el).toString(), usage: Object.values(el).toString() })
        });
        return returnArray;
    }

}







