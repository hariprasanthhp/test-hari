
import { Injectable } from '@angular/core';
import { MarketingExploreDataSubscriberApiService } from '../../marketing-subscrib-chart/marketing-explore-data-subscriberapi.service';
import * as constants from "../../../../shared/constants/marketing.constants";
import { MarketingExploreDataAssignerService } from './data-assigners.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
    providedIn: 'root'
})
export class MarketingExploreDataDownloadDataService {
    datePipe = new DatePipe('en-US');
    language: any;
    languageSubject;
    months
    constructor(
        private marketingExploreDataSubscriberApiService: MarketingExploreDataSubscriberApiService,
        private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,
        private translateService: TranslateService,
        ) {
            this.language = this.translateService.defualtLanguage;
            this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
                this.language = data;
            });
        }

    // SUBSCRIBERS TAB 
    //   SUBSCRIBER DATA USAGE
    subscriberDataUsageExportDataForming(object) {
        var result = [];
        var tmp = { "ACTIVE SUBSCRIBERS": (this.marketingExploreDataSubscriberApiService.getActiveSubscribersCount()) };
        object.categories.forEach(function (obj, index) {
            var key = 'USAGE (' + obj + ')';
            tmp[key] = String(object.series[index]);
        })
        result.push(tmp);
        return result;
    }
    subscriberDataUsageDrillDownExportDataForming(array) {
        let returnArray = [];
        array.forEach(el => {
            let obj = {
                'ACCOUNT NUMBER': el.accountNumber,
                'NAME': el.name,
                'PHONE NUMBER': el.phoneNumber,
                'SERVICE ADDRESS': el.serviceAddress,
                'BILLING ADDRESS': el.billingAddress,
                'EMAIL': el.email,
                'USOC': el.usoc,
                'SERVICE TIER': el.serviceTier,
                'REGION': el.region,
                'LOCATION': el.location,
                'TECHNOLOGY TYPE': el.technologyType,
                'CUSTOMER TYPE': el.customerType,
                'OPTOUT': el.optOut,
                'DS(Mbps)': el.downloadSpeed,
                'US(Mbps)': el.uploadSpeed,
                'ATTAINABLE RATE(Mbps)': el.attainableRate,
                'DOWN USAGE(GB)': el.downUsage,
                'UP USAGE(GB)': el.upUsage,
                'TOTAL USAGE(GB)': el.totalUsage,
            }
            returnArray.push(obj);
        });
        return returnArray;
    }

    // STREAMING,GAMING,WFH
    subscribersServiceTiersExportDataForming(object) {
        let returnArray = [];
        let categoryArray = object.categories;
        let seriesArray = object.series;
        seriesArray.forEach(el => {
            let obj = { "NAME": el.name };
            for (let i = 0; i < categoryArray.length; i++) {
                obj[categoryArray[i]] = el.data[i];
            }
            returnArray.push(obj);
        });
        return returnArray;
    }
    // SUBSCRIBER DATA USAGE
    subscriberActivityTrendsDataForming(object, chart?: any) {
        let returnArray = [];
        for (let key in object) {
            let obj = {};
            obj['NAME'] = key.charAt(0).toUpperCase() + key.substring(1);
            object[key].forEach(el => {
                for (let key1 in el) {
                    if (chart) {
                        obj[key1 + ' USAGE (TB)'] = Math.floor((el[key1] / 1024)).toFixed(0);
                    } else {
                        obj[key1] = el[key1];
                    }
                }
            });
            returnArray.push(obj);
        }

        return returnArray;
    }
    // DATA USAGE TRENDS
    dataUsageTrendsDataForming(object) {
        let returnArray = [];
        let categoryArray = object.categories;
        let seriesArray = object.series;
        seriesArray.forEach(el => {
            let obj = { "NAME": el.name ? el.name.split(' ')[0] : '' };
            for (let i = 0; i < categoryArray.length; i++) {
                obj[categoryArray[i] + ' USAGE (TB)'] = el.data[i];
            }
            returnArray.push(obj);
        });
        return returnArray;
    }
    // DEVICE PER HOUSEHOLD
    devicePerHouseholdDataForming(array) {
        let returnArray = [];
        let obj = {}
        array.forEach(el => {
            for (let [key, value] of Object.entries(el)) {
                obj['DEVICE (' + key + ')'] = value;
            }
        });
        returnArray.push(obj);

        return returnArray;
    }

    // SERVICES TAB
    // SUBSCRIBER TIER TECH && NEW SUBSCRIBERS TIER TECH
    subscriberTierTechExportDataForming(object) {
        let keys = Array.from(object['categories']);
        let series = object['series'];
        let result = [];
        series.map((obj) => {
            let tmp = {};
             tmp[(this.language.Technology).toUpperCase()] = obj['name']
            let arr = obj['data'];
            if (Array.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    var key = String(keys[i]);
                    if (key) {
                        var trans_key = key.toUpperCase();
                        tmp[trans_key] = String(arr[i]);
                    }
                }
            }
            result.push(tmp);
        });
        return result;
    }
    // HOUSEHOLD DEVICE TRENDS
    houseHoldDeviceTrendsDataForming(object) {
        let returnArray = [];
        for (let key in object) {
            let obj = {};
            obj['TREND'] = key == 'numberOfDevices' ? 'Device Count' : 'Wi-Fi Score';
            object[key].forEach(el => {
                for (let key1 in el) {
                    obj[key1] = el[key1];

                }
            });
            returnArray.push(obj);
        }
        return returnArray;
    }
    // WIFI DEVICE CATEGORY TRENDS
    wifiDeviceCategoryTrendsDataFormatter(object) {
        let returnArray = [];
        let categoryArray = object.categories;
        let seriesArray = object.series;
        seriesArray.forEach(el => {
            let obj = { "CATEGORY": (el.name).toUpperCase() };
            for (let i = 0; i < categoryArray.length; i++) {
                obj[categoryArray[i]] = el.data[i];
            }
            returnArray.push(obj);
        });
        return returnArray;

    }
    // BLOCKED THREATS INSIGHTS
    blockedThreatsInsightsDataFormatter(array) {
        let returnArray = [];
        array.forEach(el => {
            let obj = { 'CATEGORY': constants.THREATS_RENAME[el[0]], 'COUNT': el[1] }
            returnArray.push(obj);
        });
        return returnArray;

    }
    // BLOCKED THREATS DRILL DOWN
    blockedThreatsDrillDownExportData(array) {
        let returnArray = [];
        array.forEach(el => {
            let obj = {
                'ACCOUNT NUMBER': el.accountNumber,
                'NAME': el.name,
                'PHONE NUMBER': el.phoneNumber,
                'EMAIL': el.email,
                'MAC ADDRESS': el.mac_address,
                'SERVICE ADDRESS': el.serviceAddress,
                'SERVICE TIER': el.serviceTier,
                'THREAT COUNT': el.threat_count,
                'TOTAL USAGE (GB)': el.totalUsage,
                'STREAMING USAGE (GB)': el.streamingUsage,
                'GAMING USAGE (GB)': el.gamingUsage
            }
            returnArray.push(obj);
        });
        return returnArray;

    }
    // APPLICATIONS TAB
    // USAGE BY APP
    usageByAppDataForming(array, page?: any) {
        let returnArray = [];
        let obj = {}
        if (page) {
            let totals = this.marketingExploreDataAssignerService.getArraySum(array.map(el => el.originalValue));
            array.forEach(el => {
                returnArray.push({ 'APPLICATION': el.name, 'USAGE (TB)': (el.originalValue / 1024).toFixed(2), 'PERCENT OF TOTAL': ((el.originalValue / totals) * 100).toFixed(2) })
            });
        } else {
            for (let i = 0; i < array.length; i++) {
                let name = array[i].name.toUpperCase().replaceAll(',', '_');
                obj[name + ' (TB)'] = (array[i].originalValue / 1024).toFixed(2);
            }
            returnArray.push(obj)
        }
        return returnArray;
    }

    WIFIDataForming(array, page?: any) {
        let returnArray = [];
        let obj = {}
        if (page) {
            let totals = this.marketingExploreDataAssignerService.getArraySum(array.map(el => el.originalValue));
            array.forEach(el => {
                returnArray.push({ 'APPLICATION': el.name, 'USAGE (GB)': el.originalValue, 'PERCENT OF TOTAL': ((el.originalValue / totals) * 100).toFixed(2) })
            });
        } else {
            for (let i = 0; i < array.length; i++) {
                let name = array[i].name.toUpperCase().replaceAll(',', '_');
                obj[name + ' (GB)'] = array[i].originalValue;
            }
            returnArray.push(obj)
        }
        return returnArray;
    }
    // SOCIAL HEAT MAP 
    socialChannelMapExportDataFormatter(object) {
        let returnArray = [];
        let categoryArray = ['00~02HR (%)', '02~04HR (%)', '04~06HR (%)', '06~08HR (%)', '08~10HR (%)', '10~12HR (%)',
            '12~14HR (%)', '14~16HR (%)', '16~18HR (%)', '18~20HR (%)', '20~22HR (%)', '22~24HR (%)'];
        let nameArray = object.ycategories;
        let dataArray = object.heatmapdata;
        for (let i = 0; i < nameArray.length; i++) {
            let data = []
            dataArray.forEach(el => {
                if (el[1] == i) {
                    data.push(el[2]);
                }
            })
            let obj = { 'DAY': nameArray[i] }
            for (let j = 0; j < categoryArray.length; j++) {
                obj[categoryArray[j]] = data[j]
            }
            returnArray.push(obj);
        }
        return returnArray;
    }
    // TOP APP 
    topAppDataFormatter(array) {
        let returnArray = [];
        array.forEach(el => {
            let obj = {}
            for (let [key, value] of Object.entries(el)) {
                if (key == 'percentage') {
                    obj[(this.language.Percentage) + '(%)'] = value;
                } else if (key == 'usage') {
                    obj[(this.language.usage) + '(GB)'] = value;
                }
                else if (key == 'average') {
                    obj[this.language.average_user_count] = value;
                } else if (key == 'application1') {
                    obj[(this.language.application)] = value;
                }
            }
            returnArray.push(obj);
        });
        return returnArray;
    }

    // RETENTION
    // CHURN RATE INSIGHTS
    churnRateInsightsDataFormatter(object, results) {
        let returnArray = [];
        let categoryArray = object.categories;
        let monthLength;
        results.forEach(month => {
            for (var key in month) {
                monthLength = month[key].length;
                if (monthLength === 0) {
                    let index = categoryArray.indexOf(key);
                    categoryArray.splice(index, 1);
                }
            }
        });
        const newSubscribersChartData = new Map<string, Map<string, number[]>>();
        results.forEach(m => {
            const key = Object.keys(m)[0];
            const innerMap = new Map<string, number[]>();
            m[key].forEach(n => {
                const innerKey = Object.keys(n)[0];
                innerMap.set(innerKey, n[innerKey]);
            })
            newSubscribersChartData.set(key, innerMap);
        });

        categoryArray.forEach(cat => {
            let obj = {};
            obj[this.language.MONTH] = cat
            const monthData = newSubscribersChartData.get(cat);

            for (const key of monthData.keys()) {
                const item = monthData.get(key);
                obj[key + ' '+this.language.CHURNED] = item[0];
                obj[key + ' '+this.language.EXISTING] = item[1];
            }
            returnArray.push(obj);
        });
        return returnArray;
    }

    // AQUISITION RATE INSIGHTS    
    acquisitionRateInsightsDataFormatter(object, results) {
        let returnArray = [];
        let categoryArray = object.categories;
        let monthLength;
        results.forEach(month => {
            for (var key in month) {
                monthLength = month[key].length;
                if (monthLength === 0) {
                    let index = categoryArray.indexOf(key);
                    categoryArray.splice(index, 1);
                }
            }
        });
        const newSubscribersChartData = new Map<string, Map<string, number[]>>();
        results.forEach(m => {
            const key = Object.keys(m)[0];
            const innerMap = new Map<string, number[]>();
            m[key].forEach(n => {
                const innerKey = Object.keys(n)[0];
                innerMap.set(innerKey, n[innerKey]);
            })
            newSubscribersChartData.set(key, innerMap);
        });

        categoryArray.forEach(cat => {
             let obj = { }
          obj[this.language.MONTH]= cat 
            const monthData = newSubscribersChartData.get(cat);
            for (const key of monthData.keys()) {
                const item = monthData.get(key);
                obj[key + ' '+this.language.ACQUIRED] = item[0];
                obj[key +  ' '+this.language.EXISTING] = item[1];
            }
            returnArray.push(obj);
        });

        return returnArray;
    }
    // AQUISITION REVENUE INSIGHTS
    aquisitionRevenueExportDataFormatter(results) {
        // categories
        // console.log(object, '111', results)
        // let returnArray = [];
        // let categoryArray = object.categories;
        // let monthLength;
        // results.forEach(month => {
        //     for (var key in month) {
        //         monthLength = month[key].length;
        //         if (monthLength === 0) {
        //             let index = categoryArray.indexOf(key);
        //             categoryArray.splice(index, 1);
        //         }
        //     }
        // });
        // const newSubscribersChartData = new Map<string, Map<string, number[]>>();
        // results.forEach(m => {
        //     const key = Object.keys(m)[0];
        //     const innerMap = new Map<string, number[]>();
        //     m[key].forEach(n => {
        //         const innerKey = Object.keys(n)[0];
        //         innerMap.set(innerKey, n[innerKey]);
        //     })
        //     newSubscribersChartData.set(key, innerMap);
        // });

        // categoryArray.forEach(cat => {
        //     let obj = { "MONTH": cat };
        //     console.log(obj, 'obj======')
        //     const monthData = newSubscribersChartData.get(cat);

        //     for (const key of monthData.keys()) {
        //         const item = monthData.get(key);
        //         obj[key + ' CURRENT'] = item[0];
        //         obj[key + ' MAX'] = item[1];
        //         obj[key + ' COUNT'] = item[2];
        //     }
        //     returnArray.push(obj);
        // });

        // return returnArray;



        let returnArray = [];
        results.forEach(el => {
            let obj = {}
            for (const key in el) {
                obj[this.language.MONTH] = key;
                if (el[key].length > 0) {
                    el[key].forEach(el => {
                        for (const key in el) {
                            obj[`${key} ${this.language.CURRENT}`] = el[key][0] ? el[key][0] : 0;
                            obj[`${key} ${this.language.MAX}`] = el[key][1] ? el[key][1] : 0;
                            obj[`${key} ${this.language.COUNT}`] = el[key][2] ? el[key][2] : 0;
                        }
                    });
                }
                returnArray.push(obj)
            }
        });
        return returnArray;
    }
    // CommandIQ Status
    commandIQStatusDataForming(object) {
        let keys: any = Array.from(object['categories']);
        let series = object['series'];
        let result = [];
        for (let i = 0; i < keys.length; i++) {
            let obj = { "DATE": this.datePipe.transform(keys[i], 'MM-dd-yyyy') }
            // if (monthLength > 0) {
            for (let j = 0; j < series.length; j++) {
                obj['CommandIQ subscribers'] = series[j].data[i];
            }
            result.push(obj)
            // }
        }
        return result;
    }
    systemmodel(object) {
        let keys: any = Array.from(object['categories']);
        let series = object['series'];
        let result = [];
        for (let i = 0; i < keys.length; i++) {
            let obj = { "DATE": this.datePipe.transform(keys[i], 'MM-dd-yyyy') }
            for (let j = 0; j < series.length; j++) {
                obj[series[j].name] = series[j].data[i];

            }
            result.push(obj)
        }
        return result;
    }
    // REVENUE EDGE SUITS
    revenueEdgeSuitsDataForming(object) {
        let keys: any = Array.from(object['categories']);
        let series = object['series'];
        let result = [];
        for (let i = 0; i < keys.length; i++) {
            let obj = { "DATE": this.datePipe.transform(keys[i], 'MM-dd-yyyy') }
            // if (monthLength > 0) {
            for (let j = 0; j < series.length; j++) {
                if (series[j].name === 'ExperienceIQ') {
                    obj['ExperienceIQ subscribers'] = series[j].data[i];
                } else if (series[j].name === 'ProtectIQ') {
                    obj['ProtectIQ subscribers'] = series[j].data[i];
                } else if (series[j].name === 'Arlo') {
                    obj['Arlo subscribers'] = series[j].data[i];
                } else if (series[j].name === 'Servify') {
                    obj['Servify subscribers'] = series[j].data[i];
                }
            }
            result.push(obj)
            // }
        }
        return result;
    }

}