import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { arrayMax } from 'highcharts';


@Injectable({
    providedIn: 'root'
})
export class MarketingCommonService {
    language: any
    constructor(
        private sso: SsoAuthService,
        private translateService: TranslateService

    ) {
        this.language = this.translateService.defualtLanguage;
        this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;

        });

    }

    timeSplitter(date) {
        let hour = new Date(date).getHours();
        let min = new Date(date).getMinutes();
        // let Hours24 = +hour > 12 ? hour - 12 : hour;
        let Hours = +hour < 10 ? '0' + hour : hour;
        let Minutes = +min < 10 ? '0' + min : min;
        return `${Hours}:${Minutes}`;
    }
    objectProperyRemover(object, propertyValue) {
        if (object[propertyValue]) {
            delete object[propertyValue];
        }
        return object;
    }
    formatDateForCampaign(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    formatDateForCampaignChart(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month].join('/');
    }
    formatMonthForCampaignChart(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('-');
    }
    formatMonthForRevCampaignChart(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }
    extraParamsAssignerForQlik(url, selectedValues?: any) {
        let bookMark = ''
        if (selectedValues != undefined) {
            bookMark = selectedValues.recommended ? `&select=$::Primary_Seg_Name,${selectedValues.segmentName}&select=$::Upsell_Category,${selectedValues.segmentType}` : `&bookmark=${selectedValues.segmentId}`
        }
        let newUrl = url + bookMark;
        let regionUrl = '';
        let loctionUrl = '';
        let serviceUrl = '';
        let propensityUrl = ''
        let zipcodeUrl = ''
        let zipplusfourUrl = ''
        if (selectedValues) {
            if (selectedValues.region && selectedValues.region.length != 0) {
                if (selectedValues.region[0] != 'All') {
                    let region = `&select=$::region,${selectedValues.region[0]}`
                    regionUrl = region ? region : '';
                }
            } else {
                regionUrl = ''
            }
            if (selectedValues.location && selectedValues.location.length != 0) {
                if (selectedValues.location[0] != 'All') {
                    let location = `&select=$::location,${selectedValues.location[0]}`
                    loctionUrl = location ? location : ''
                }
            } else {
                loctionUrl = ''
            }
            if (selectedValues.serviceTier && selectedValues.serviceTier.length != 0) {
                if (selectedValues.serviceTier[0] != 'All') {
                    let service = `&select=$::servicegrp,${selectedValues.serviceTier[0]}`
                    serviceUrl = service ? service : ''
                }
            } else {
                serviceUrl = ''
            }
            if (selectedValues.propensity) {
                if (selectedValues.propensity != 'All') {
                    let propensity = `&select=$::propensity,${selectedValues.propensity}`
                    propensityUrl = propensity ? propensity : ''
                }
            } else {
                propensityUrl = ''
            }
            if (selectedValues.zipcode != null) {
                let zipcode = `&select=$::zipcode,${selectedValues.zipcode}`
                zipcodeUrl = zipcode ? zipcode : ''

            } else {
                zipcodeUrl = ''
            }
            if (selectedValues.zipPlusFour != null) {
                let zipplusfour = `&select=$::zipplusfour,${selectedValues.zipPlusFour}`
                zipplusfourUrl = zipplusfour ? zipplusfour : ''

            } else {
                zipplusfourUrl = ''
            }
        }

        return newUrl + regionUrl + loctionUrl + serviceUrl + propensityUrl + zipcodeUrl + zipplusfourUrl;
    }
  getCMCScopes() {
        let scopes = this.sso.getScopes();
        let returnObject = {};
        returnObject['exploredata'] = scopes['cloud.rbac.cmc.exploredata'] ? scopes['cloud.rbac.cmc.exploredata'] : [];
        returnObject['campaign'] = scopes['cloud.rbac.cmc.campaign'] ? scopes['cloud.rbac.cmc.campaign'] : [];
        returnObject['subscriber'] = scopes['cloud.rbac.cmc.subscriber'] ? scopes['cloud.rbac.cmc.subscriber'] : [];
        returnObject['revenue'] = scopes['cloud.rbac.cmc.revenue'] ? scopes['cloud.rbac.cmc.revenue'] : [];

        let accessObject: any = {};
        accessObject['exploredataNoAccess'] = returnObject['exploredata'].length == 0 ? true : false;
        accessObject['exploredataRead'] = returnObject['exploredata'].length >= 1 ? true : false;
        accessObject['exploredataWrite'] = returnObject['exploredata'].length == 2 ? true : false;

        accessObject['campaignNoAccess'] = returnObject['campaign'].length == 0 ? true : false;
        accessObject['campaignRead'] = returnObject['campaign'].length >= 1 ? true : false;
        accessObject['campaignWrite'] = returnObject['campaign'].length == 2 ? true : false;

        accessObject['subscriberNoAccess'] = returnObject['subscriber'].length == 0 ? true : false;
        accessObject['subscriberRead'] = returnObject['subscriber'].length >= 1 ? true : false;
        accessObject['subscriberWrite'] = returnObject['subscriber'].length == 2 ? true : false;

        accessObject['revenueNoAccess'] = returnObject['revenue'].length == 0 ? true : false;
        accessObject['revenueRead'] = returnObject['revenue'].length >= 1 ? true : false;
        accessObject['revenueWrite'] = returnObject['revenue'].length == 2 ? true : false;

        accessObject['allNoAccess'] = accessObject['exploredataNoAccess'] && accessObject['campaignNoAccess'] && accessObject['subscriberNoAccess'] && accessObject['revenueNoAccess'] ? true : false;
        accessObject['allRead'] = accessObject['exploredataRead'] && accessObject['campaignRead'] && accessObject['subscriberRead'] && accessObject['revenueRead'] ? true : false;
        accessObject['allWrite'] = accessObject['exploredataWrite'] && accessObject['campaignWrite'] && accessObject['subscriberRead'] && accessObject['revenueWrite'] ? true : false

        if (!environment.VALIDATE_SCOPE) {
            accessObject['exploredataNoAccess'] = false;
            accessObject['exploredataRead'] = true;
            accessObject['exploredataWrite'] = true;

            accessObject['campaignNoAccess'] = false;
            accessObject['campaignRead'] = true
            accessObject['campaignWrite'] = true

            accessObject['subscriberNoAccess'] = false;
            accessObject['subscriberRead'] = true
            accessObject['subscriberWrite'] = true

            accessObject['revenueNoAccess'] = false;
            accessObject['revenueRead'] = true
            accessObject['revenueWrite'] = true

            accessObject['allNoAccess'] = false;
            accessObject['allRead'] = true
            accessObject['allWrite'] = true
        }

        return accessObject;
    }
    setCampaignID(id) {
        return localStorage.setItem('campaignID', id)
    }
    removeCampaignID() {
        return localStorage.removeItem('campaignID')
    }
    getCampaignID() {
        return localStorage.getItem('campaignID')
    }
    setSubscriberID(id) {
        return sessionStorage.setItem('subscriberID', id)
    }
    getSubscriberID() {
        return sessionStorage.getItem('subscriberID')
    }
    setSearchValue(value) {
        return localStorage.setItem('searchValue', value)
    }
    getSearchValue() {
        return localStorage.getItem('searchValue')
    }
    setCSCtrueOrFalse(boolean) {
        return localStorage.setItem('fromCSCpage', boolean)
    }
    getCSCtrueOrFalse() {
        return localStorage.getItem('fromCSCpage')
    }
    errorHandling(err) {
        console.log(err.error)
        if (err.status == 401) {
            return this.language['Access Denied'];
        }
        else if (err.status == 503) {
            return "Service Temporarily Unavailable";
        } else if (err.status == 500) {
            return this.language.internalServerError;
        } else if (err.status == 404) {
            return this.language.URLnotFoungError;
        } else if (err.status == 504 || err.status == 502) {
            return this.language.timeoutErrorError;
        } else if (err.status == 400) {
            return err.error? err.error.error : this.language.timeoutErrorError;
        } else if (err.status == 0) {
            return this.language.connectionLost;
        } else {
            if (err.error && err.error.errorDesc) {
                return `${err.error.errorDesc}`;
            } else if (err.error && err.error.message) {
                return `${err.error.message}`;
            } else {
                return `${err.message}`;
            }
        }
    }
}
