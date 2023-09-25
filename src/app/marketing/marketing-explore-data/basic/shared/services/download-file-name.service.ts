
import { Injectable } from '@angular/core';
import { MarketingApiService } from './../../../../shared/services/marketing-api.sevice';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadFileNameService {
    constructor(
        private marketingApiService: MarketingApiService,
        private ssoAuthService: SsoAuthService

    ) { }

    generateDownloadName(chartName: string, secondName?: string) {
        let name = '';
        let period = this.marketingApiService.getPeriod()
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';
        let days = 'past_30_days';
        if (period == 'last-1m') {
            days = 'past_month';
        } else if (period == 'last-2m') {
            days = 'past_2_months';
        }
        name += chartName;
        if (secondName) {
            name += '-' + secondName;
        }
        name += '-' + region + '-' + location + '-' + days + '-' + date;
        return name;
    }
    generateDownloadNameSearchPage(chartName: string, secondName?: string) {
        let name = '';
        let region = 'All';
        let location = 'All';
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';
        name += chartName;
        if (secondName) {
            name += '-' + secondName;
        }
        name += '-' + region + '-' + location + '-' + date;
        return name;
    }
    generateDownloadNameHome(chartName: string, secondName?: string) {
        let name = '';
        let region = 'All';
        let location = 'All';
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';
        let days = 'past_30_days';
        name += chartName;
        if (secondName) {
            name += '-' + secondName;
        }
        name += '-' + region + '-' + location + '-' + days + '-' + date;
        return name;
    }
    //genareate household
    generateDownloadWOPeriodName(chartName: string) {
        let name = '';
        let period = this.marketingApiService.getPeriod()
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';

        name += chartName;
        name += '-' + region + '-' + location + '-' + date;
        return name;
    }
    generateDownloadNameForDrillDown(chartName: string) {
        let name = '';
        let period = localStorage.getItem('currentPeriod')?.replace('/', '-')
        let region = this.marketingApiService.getRegion().toUpperCase();
        let location = this.marketingApiService.getLocation().toUpperCase();
        let date = new Date().getTime();
        name = `${chartName}-${this.ssoAuthService.getOrgId()}-${region}-${location}-${period}--${date}`
        return name;
    }
    //generatereplacespecial char
    generateReplaceSpecialChar(chartName: string) {

        let fileNameTier = chartName.replace('+', '');
        let fileNameTierVal = fileNameTier.replace('<', 'lt');
        return fileNameTierVal
    }

    generateInlineChartDownloadName(chartName: string) {
        let name = '';
        let region = this.marketingApiService.getRegion();
        let location = this.marketingApiService.getLocation();
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';
        name += chartName;
        name += '-' + region + '-' + location + '-' + date;
        return name;
    }
    generateDownloadPeriodName(chartName: string) {
        let name = '';
        let period = 'past_30_days';
        name += chartName;
        name += '-' + period;
        return name;
    }
    formatTodayDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}
