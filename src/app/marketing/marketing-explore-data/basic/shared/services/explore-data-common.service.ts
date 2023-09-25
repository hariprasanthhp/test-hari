import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import * as constants from '../../../../shared/constants/marketing.constants';
import * as AWS from 'aws-sdk';
import { MarketingApiService } from './../../../../shared/services/marketing-api.sevice';
import { AnyARecord } from 'dns';

@Injectable({
    providedIn: 'root'
})
export class MarketingExploreCommonService {


    constructor(
        private sso: SsoAuthService,
        private marketingApiService: MarketingApiService,
    ) { }


    //QUERY PARAMS ASSIGNER
    queryParamsAssigner(url) {
       // let org_id = this.sso.getOrgId();
        let period = this.marketingApiService.getPeriod()
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        if (region != 'All' && location != 'All') {
            return `${url}period=${period}&region=${region.replace('&', '%26')}&location=${location.replace('&', '%26')}`;
        } else if (region != 'All') {
            return `${url}period=${period}&region=${region.replace('&', '%26')}`;
        } else {
            return `${url}period=${period}`;
        }
    }
    //QUERY PARAMS ASSIGNER
    queryParamsAssignerHome(url) {
       // let org_id = this.sso.getOrgId();
        let period = this.marketingApiService.getPeriod()
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        return `${url}period=${'last-30d'}`;
    }
    //churn risk w/o period
    queryParamsWOPeriodAssigner(url) {
        //let org_id = this.sso.getOrgId();
        let period = this.marketingApiService.getPeriod()
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        if (region != 'All' && location != 'All') {
            return `${url}region=${region.replace('&', '%26')}&location=${location.replace('&', '%26')}`;
        } else if (region != 'All') {
            return `${url}region=${region.replace('&', '%26')}`;
        } else {
            return `${url}`;
        }
    }
    queryParamsWithoutPeriod(url) {
       // let org_id = this.sso.getOrgId();
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        if (region != 'All' && location != 'All') {
            return `${url}region=${region.replace('&', '%26')}&location=${location.replace('&', '%26')}`;
        } else if (region != 'All') {
            return `${url}region=${region.replace('&', '%26')}`;
        } else {
            return `${url}`;
        }
    }
    // OBJECT SUM
    sumOfObjectValues(obj) {
        let count = Object.keys(obj).length;
        return count ? Object.values(obj).reduce((a: any, b: any) => a + b) : 0;
    }
    // DATA CONVERTION 
    monthStartEndCategoriesCreator(month) {
        let monthArray = constants.monthsArray;
        let monthDataArray = month.split('-');
        let monthNumber = monthArray.indexOf(monthDataArray[0]);
        let yearNumber = '20' + monthDataArray[1];
        let lastDayofMonth = this.lastdayofMonth(yearNumber, monthNumber)
        let startDate = `${yearNumber}-${monthNumber > 9 ? monthNumber : '0' + monthNumber}-01`;
        let endDate = `${yearNumber}-${monthNumber > 9 ? monthNumber : '0' + monthNumber}-${lastDayofMonth}`;
        let returnObj = {
            startDate: startDate,
            endDate: endDate
        }
        localStorage.setItem('aquiredTier', `${yearNumber}-${monthNumber > 9 ? monthNumber : '0' + monthNumber}`)
        return returnObj
    }
    lastdayofMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    // GAMING REPLACER FUNCTION
    gamingReplacer(string) {
        let removeGaming = string.replace('Gaming', '');
        removeGaming = removeGaming.replace('gaming', '');
        let removeGaming1 = removeGaming.replace('(', '');
        let returnStr = removeGaming1.replace(')', '')
        return returnStr
    }
    //  PERCENTAGE CALCULATOR FOR ARRAY,OBJECT
    arraysObjectsPercentageCalculator(obj, value, digit?: any) {
        let numbersArray = obj;
        if (typeof obj == 'object') {
            numbersArray = Object.values(obj);
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let total: any = numbersArray.reduce(reducer, 0)
        return ((100 * value) / total).toFixed(digit ? digit : 2);
    }
    // PERCENTAGE CALCULATER FOR VALUES
    valuesPercentageCalculator(value, wholeValue, digit?: any) {
        let percentage: any = ((100 * value) / wholeValue).toFixed(digit ? digit : 2);
        return isNaN(percentage) ? 0.0 : percentage

    }
    // URL DOWLOADER
    downloaderFuntion(filename) {
        let params = {
            Bucket: environment.CMC_DOWNLOAD_CSV_BUCKET,
            Key: filename.split('/').pop(),
            Expires: 60 * 15
        }
        let s3 = new AWS.S3({
            accessKeyId: environment.CMC_DOWNLOAD_CSV_AWS_ACCESS_KEY,
            secretAccessKey: environment.CMC_DOWNLOAD_CSV_AWS_ACCESS_SECRET,
        });
        let file = s3.getSignedUrl('getObject', params, function (error, data) {
            error != null ? alert('Failed') : window.open(data);
        });
    }
    downLoadFileFunction(data: any, type: string, fileName: string) {
        let blob = new Blob([data], { type: type });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = fileName + '.csv';    // put file name here
        //  console.log(link.download)
        link.click();

    }
    // NULL HANDLER FOR OBJECT
    objectNullHandler(object) {
        for (const property in object) {
            object[property] = object[property] ? object[property] : 0;
        }
        return object
    }
    // NULL HANDLER FOR ARRAY
    arrayNullHandler(array) {
        array.forEach(el => {
            el = el ? el : 0;
        });
        return array
    }
    arraySlicer(array: any, startPoint: number, endPoint: number) {
        if (array.length > endPoint) {
            return array.slice(startPoint - 1, endPoint)
        } else {
            return array
        }
    }

}
