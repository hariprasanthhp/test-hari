import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingExploreCommonService } from '../marketing-explore-data/basic/shared/services/explore-data-common.service';


@Injectable({
    providedIn: 'root'
})
export class HomeDataAssignerService {
    constructor(
        private marketingExploreCommonService: MarketingExploreCommonService

    ) { }

    topAppData(data) {
        let topapps = []
        for (const item of data) {
            for (var key in item) {
                topapps.push({ "application": key, 'application1': this.marketingExploreCommonService.gamingReplacer(key), "average": item[key][0], "percentage": (item[key][1] * 100).toFixed(1) })
            }

        }
        return topapps;
    }
    // ACQUISITION RATE INSIGHTS
    aquisitionTrendsFormatData(results) {
        let returnObject = {};
        var categories = [];
        var seriesObj = {};
        var totalObj = {};
        var total = 0;
        var categoryFeatureTotal = [];
        var categoryExistingTotal = [];
        results.forEach(month => {
            for (var key in month) {
                if (month.hasOwnProperty(key)) {
                    var emptyCategory = false;
                    var monthlyNewTotal = 0;
                    var monthlyExistingTotal = 0;
                    if (typeof month[key] === 'object') {
                        month[key].forEach(wrapper => {
                            for (const key in wrapper) {
                                if (wrapper.hasOwnProperty(key)) {
                                    let newSubsExistingSubs = wrapper[key]
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
                        });
                    }
                    categories.push(String(key));
                    categoryFeatureTotal.push(monthlyNewTotal);
                    categoryExistingTotal.push(monthlyExistingTotal);
                }
            }
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
        returnObject["categoryExistingTotal"] = categoryExistingTotal;
        returnObject["categoryFeatureTotal"] = categoryFeatureTotal;
        returnObject["series"] = series;
        returnObject['totalObj'] = totalObj;
        returnObject['total'] = total;
        return returnObject
    }
    //CHurn TRENDS
    // CHURN RATE INSIGHTS
    churnTrendsDataFormatter(results) {
        let returnObject = {};
        var categories = [];
        var seriesObj = {};
        var totalObj = {};
        var total = 0;
        var categoryFeatureTotal = [];
        var categoryExistingTotal = [];
        results.forEach(month => {
            for (var key in month) {
                if (month.hasOwnProperty(key)) {
                    var emptyCategory = false;
                    var monthlyNewTotal = 0;
                    var monthlyExistingTotal = 0;
                    if (typeof month[key] === 'object') {
                        month[key].forEach(wrapper => {
                            for (const key in wrapper) {
                                if (wrapper.hasOwnProperty(key)) {
                                    let newSubsExistingSubs = wrapper[key]
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
                        });
                    }
                    // if (!emptyCategory) {
                    categories.push(String(key));
                    categoryFeatureTotal.push(monthlyNewTotal);
                    categoryExistingTotal.push(monthlyExistingTotal);

                    // }

                }
            }
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
        return returnObject;

    }

}







