import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SsoAuthService } from "../../../../shared/services/sso-auth.service";
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import * as moment from 'moment';
import { FaUtilsService } from '../../service/fa-utils.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ReportApiService {


    public baseURL = environment.SUPPORT_URL;;
    public org_id = environment.faAdminOrgId;
    private topn: string;
    language: any;

    constructor(private httpClient: HttpClient, private sso: SsoAuthService,
        private excel: ExportExcelService,
        private customTranslateService: CustomTranslateService,
        private utils: FaUtilsService,
        private router: Router) {
        this.topn = this.baseURL + '/traffic/reports/topapplications';

        this.language = this.customTranslateService.defualtLanguage;

        this.customTranslateService.selectedLanguage.subscribe(data => {
            this.language = data;

        });


    }

    public Topn<T>(params: any, page?: string): Observable<T> {
        let orgId = this.sso.getOrgId();
        let startDate = new Date(params.startDate).toISOString();
        startDate = this.makeIsoDate(startDate);

        let endDate = new Date(params.endDate).toISOString();
        endDate = this.makeIsoDate(endDate);

        let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
        let limit = params.limit ? params.limit : 10;

        let url = `${this.topn}?org=${orgId}&tenant=0&groupBy=${params.groupBy}&sortBy=total&granularity=1month&startTime=${startDate}&endTime=${endDate}&count=${limit}&output=${criteria}`;
        if (page && page == 'top-applications') {
            let group = params.groupSelected == 'yes' ? true : false;

            url = `${this.topn}?granularity=24hour&org=${orgId}&tenant=0&startTime=${startDate}&endTime=${endDate}&endpoint=e8ba81c8-c6c7-458d-bcdc-e775af1de465&count=10&direction=both`;
        }

        return this.httpClient.get<T>(url);

    }

    getTopEndpoints(params: any): any {
        let orgId = this.sso.getOrgId();
        let startDate = new Date(params.startDate).toISOString();
        startDate = this.makeIsoDate(startDate);

        let endDate = new Date(params.endDate).toISOString();
        endDate = this.makeIsoDate(endDate);

        let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
        let limit = params.limit ? params.limit : 10;
        let url = '';

        if (params['criteriaSelected'] == 'usage') {
            let endpointId = this.sso.getSubscriberEndpointId() ? this.sso.getSubscriberEndpointId() : '33e034e2-9bcf-4d71-81d7-3a2e97d3a84b';
            url = `${environment.SUPPORT_URL}/traffic/reports/topdestinations?granularity=24hour&org=${this.sso.getOrgId()}&tenant=0&startTime=${startDate}&endTime=${endDate}&endpoint=${endpointId}&count=10&direction=${params['directionSelected'].toLowerCase()}`;
        } else {
            let endpointId = this.sso.getSubscriberEndpointId() ? this.sso.getSubscriberEndpointId() : '2a3686a2-6a92-4437-9e12-9f04e96e7fdf';
            url = `${environment.SUPPORT_URL}/traffic/timeseries?granularity=1hour&org=${this.sso.getOrgId()}&tenant=0&startTime=${startDate}&endTime=${endDate}&endpoint=${endpointId}&groupBy=destination&direction=${params['directionSelected'].toLowerCase()}&output=${params['criteriaSelected']}&count=${params['limit']}`;
        }


        return this.httpClient.get(url);

    }

    getApplications(params: any): any {
        // let startDate = new Date(params.startDate).toISOString();
        // startDate = this.makeIsoDate(startDate);

        // let endDate = new Date(params.endDate).toISOString();
        // endDate = this.makeIsoDate(endDate);

        // let startDate = this.convertStartDate(this.dateUtils.getUserDateTimeByDateObj(params.startDate));
        // let endDate = this.convertEndDate(this.dateUtils.getUserDateTimeByDateObj(params.endDate));

        //CCL-26097
        let startDate: string | Date = new Date(params.startDate);
        let endDate: string | Date = new Date(params.endDate);
        startDate = this.getStartUTCDate(params.startDate, 0);
        endDate = this.getEndUTCDate(params.endDate);


        if (params.criteriaSelected == 'usage') {
            startDate = this.getISOStartOfDay(startDate);
            endDate = this.getISOEndOfDay(endDate, 'applications');
        }
        let limit = params.limit ? params.limit : 10;
        let url = '';

        let inpParams: any = {
            granularity: '24hour',
            tenant: 0,
            startTime: startDate,
            endpoint: this.sso.getSubscriberEndpointId() ? this.sso.getSubscriberEndpointId() : 'e8ba81c8-c6c7-458d-bcdc-e775af1de465',
            output: params['criteriaSelected'],
            direction: params['directionSelected'].toLowerCase(),
            org: this.sso.getOrgId(),
            count: params['limit'],
            endTime: endDate
        }

        if (params['groupSelected'] === 'yes') {
            inpParams['groupApplications'] = true;
        }

        let query = "";
        for (var key in inpParams) {

            if (typeof inpParams[key] !== 'undefined') {
                if (query != "") {
                    query += "&";
                }

                query += key + "=" + encodeURIComponent(inpParams[key]);
            }

        }

        url = `${environment.SUPPORT_URL}/traffic/reports/topapplications?${query}`;

        return this.httpClient.get(url);

    }

    getAppTraffic(params: any): any {
        // let startDate = new Date(params.startDate).toISOString();
        // startDate = this.makeIsoDate(startDate);

        // let endDate = new Date(params.endDate).toISOString();
        // endDate = this.makeIsoDate(endDate);

        // let startDate = this.convertStartDate(this.dateUtils.getUserDateTimeByDateObj(params.startDate));
        // let endDate = this.convertEndDate(this.dateUtils.getUserDateTimeByDateObj(params.endDate));

        //CCL-26097
        let startDate: string | Date = new Date(params.startDate);
        let endDate: string | Date = new Date(params.endDate);
        startDate = this.getStartUTCDate(params.startDate, 0);
        endDate = this.getEndUTCDate(params.endDate);

        let granularity = this.getGranularityByChart(startDate, endDate);
        //granularity = '24hour';


        let url = '';

        let inpParams: any = {
            granularity: granularity ? granularity : '1hour',
            org: this.sso.getOrgId(),
            tenant: 0,
            startTime: startDate,
            endTime: endDate,
            endpoint: this.sso.getSubscriberEndpointId() ? this.sso.getSubscriberEndpointId() : '2705d400-58a5-4cca-8091-8ee2843ea2c9',
            groupBy: 'application',
            output: 'rate',
            count: params['limit'],
            direction: 'both'
        }

        let query = "";
        for (var key in inpParams) {

            if (typeof inpParams[key] !== 'undefined') {
                if (query != "") {
                    query += "&";
                }

                query += key + "=" + encodeURIComponent(inpParams[key]);
            }

        }

        url = `${environment.SUPPORT_URL}/traffic/timeseries?${query}`;

        return this.httpClient.get(url);

    }


    public getUsage<T>(params: any, enpoint): Observable<T> {
        let orgId = this.sso.getOrgId();
        let startDate: string | Date = new Date(params.startDate);
        let endDate: string | Date = new Date(params.endDate);

        startDate = this.getISOStartOfDay(startDate);
        endDate = this.getISOEndOfDay(endDate);

        let granularity = this.getGranularity(startDate, endDate);
        params['granularity'] = granularity;
        let criteria = 'usage';


        let url = `${environment.SUPPORT_URL}/traffic/timeseries?org=${orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&endpoint=${enpoint}`;
        //url = 'https://stage.api.calix.ai/v1/csc/traffic/timeseries?granularity=24hour&org=10&tenant=0&startTime=2020-11-20T00:00:00Z&endTime=2020-11-30T00:00:00Z&endpoint=42ab50f4-8185-407a-b047-81cfc5c07119';
        return this.httpClient.get<T>(url);
    }

    public getRate<T>(params: any, enpoint): Observable<T> {
        let orgId = this.sso.getOrgId();

        let startDate: string | Date = new Date(params.startDate);
        let endDate: string | Date = new Date(params.endDate);
        let granularity = this.getGranularityByChart(startDate, endDate, 'rate');

        // startDate = this.getISOStartEndDate(startDate, false);
        // endDate = this.getISOStartEndDate(endDate, true);

        //CCL-26097
        startDate = this.getStartUTCDate(params.startDate, 0);
        endDate = this.getEndUTCDate(params.endDate);

        let criteria = 'rate';

        let url = `${environment.SUPPORT_URL}/traffic/timeseries?org=${orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&endpoint=${enpoint}`;
        //url = 'https://stage.api.calix.ai/v1/csc/traffic/timeseries?granularity=1hour&org=10&tenant=0&startTime=2020-11-27T00:00:00Z&endTime=2020-11-30T00:00:00Z&endpoint=2705d400-58a5-4cca-8091-8ee2843ea2c9&output=rate';
        return this.httpClient.get<T>(url);
    }

    public getMonthlyUsage<T>(params: any, enpoint): Observable<T> {
        let orgId = this.sso.getOrgId();
        let date = new Date();
        let monthCount = params.monthCount ? params.monthCount : 1;
        let firstDay = new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

        //CCL-39421
        let startDate: string | Date = this.getISOStartOfDay(firstDay);
        let endDate: string | Date = this.getISOEndOfDay(lastDay);

        //CCL-26097
        // let startDate: string | Date = this.getStartUTCDate(firstDay,0 );
        // let endDate: string | Date = this.getEndUTCDate(lastDay);

        let criteria = 'usage';

        let url = `${environment.SUPPORT_URL}/traffic/timeseries?org=${orgId}&tenant=0&granularity=${params.granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&endpoint=${enpoint}`;
        //url = 'https://stage.api.calix.ai/v1/csc/traffic/timeseries?granularity=1month&org=10&tenant=0&startTime=2020-09-01T00:00:00Z&endTime=2020-11-30T00:00:00Z&endpoint=42ab50f4-8185-407a-b047-81cfc5c07119';
        return this.httpClient.get<T>(url);
    }

    public topAppTraffic<T>(params: any): Observable<T> {
        let orgId = this.sso.getOrgId();
        //orgId = 12615054;
        let startDate = new Date(params.startDate).toISOString();
        startDate = this.makeIsoDate(startDate);
        //startDate = '2020-09-01T22:03:00Z';

        let endDate = new Date(params.endDate).toISOString();
        endDate = this.makeIsoDate(endDate);

        let limit = params.limit ? params.limit : 10;

        return this.httpClient.get<T>(`${this.topn}?org=${orgId}&tenant=0&groupBy=application&sortBy=total&granularity=1month&startTime=${startDate}&endTime=${endDate}&count=${limit}`);
        // return this.httpClient.get<T>(`${this.topn}?org=${org}&tenant=0&groupBy=${params.groupBy}&sortBy=downstreamOctets&granularity=1month&startTime=${startDate}`)
    }

    makeOptions(data: any, type: any, params?: any, downloadData?: any): any {
        let title = downloadData.title;

        let that = this;


        let pipe = new DatePipe('en-US');
        let capitalize = new TitleCasePipe();
        let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
        if (params.criteriaSelected == 'usage') {
            timezoneName = 'Coordinated Universal Time';
        }
        // let timezoneName = 'UTC';
        //     let subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> Time Window: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><br/>
        // <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Up Usage: 4.44 GB    Down Usage: 185.4GB</span>`;

        let categories = [];
        let seriesData = [];
        let direction = `${this.language['down']}`;
        if (params.directionSelected == 'both') {
            direction = `${this.language['Both(Down+Up)']}`;
        } else if (params.directionSelected == 'Down') {
            direction = `${this.language['down']}`;
        } else {
            direction = `${this.language['up']}`;
        }
        let subscriber = ``;
        if (this.sso.getTrafficReportChartSubscriberInfo()) {
            subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
        }
        let subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['criteria']}: ${this.language[params['criteriaSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['direction']}: ${direction}</span>`;

        let options: any = {
            chart: {
                type: type,
                zoomType: "xy"
            },
            title: {
                text: title
            },
            subtitle: {
                text: subTitle
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        let y = this;
                        var m = y.axis.series[0].dataMax;
                        var s;
                        if (params['criteriaSelected'] == 'usage') {
                            var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
                            s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');;
                        } else {
                            var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
                            s = (y.isFirst ? 0 : (y.value / unit[0]).toFixed(1)) + (y.isFirst ? ' ' + unit[1] : '');
                        }
                        return s;
                    }
                },
            },
            lang: {
                noData: that.language["No Data Available"]
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    color: '#0279FF', // blue
                    //colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"]
                    cursor: 'pointer',
                    point: {
                        events: {

                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    var m = this.y;
                    var unit;
                    var s;
                    if (params['criteriaSelected'] == 'usage') {
                        unit = that.getStackedUnit(m);
                        s = `<b> ${this.key} </b><br/>
                        <p>${this.series.name}<span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
                    } else {
                        unit = that.utils.bitsToSize(m, false);
                        s = `<b> ${this.key} </b><br/>
                        <p>${this.series.name}<span>: <b>${unit}</b><br/></span></p>`
                    }
                    return s;
                }
            },
            series: [],
            exporting: {
                filename: 'Subscriber_Top_Applications',
                buttons: {
                    contextButton: {
                        menuItems: [{
                            textKey: 'downloadPDF',
                            text: this.language.exportPDF || 'Export PDF',
                            onclick: function () {
                                this.exportChart({
                                    type: 'application/pdf'
                                });
                            }
                        }, {
                            textKey: 'downloadCSV',
                            text: this.language.exportCsv || 'Export CSV',
                            onclick: function () {
                                let dataExport = [];
                                for (var i = 0; i < data.length; i++) {
                                    if (params['criteriaSelected'] == 'usage') {
                                        dataExport.push(
                                            {
                                                'Name': data[i].name ? data[i].name : '',
                                                'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets.toLocaleString() : 0,
                                                'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets.toLocaleString() : 0,
                                                'Both(Down+Up) Usage(Byte)': data[i].totalOctets ? data[i].totalOctets.toLocaleString() : 0
                                            }
                                        )
                                    } else {
                                        dataExport.push(
                                            {
                                                'Name': data[i].name ? data[i].name : data[i].key,
                                                'Up Max Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                                                'Up Average Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                                                'Down Max Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                                                'Down Average Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0
                                            }
                                        )
                                    }
                                }
                                let extraData: string = '';
                                let subscriber = ``;
                                if (that.sso.getTrafficReportChartSubscriberInfo()) {
                                    subscriber = `${that.language['Subscriber']}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`;
                                }
                                extraData = `${title}\r\n${subscriber} Criteria: ${that.language[params['criteriaSelected']]} \r\n ${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n Direction: ${direction} \r\n`;

                                that.excel.downLoadCSV("Subscriber_Top_Applications", dataExport, extraData);
                            }
                        }],
                        text: this.language['export'],
                        //className: 'export_menu',
                        // symbol: 'url(/assets/images/export.png)'
                    }
                }
            },
            credits: {
                enabled: false
            }
        };



        if (type === 'bar') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name) {
                    categories.push(data[i].name);

                } else {
                    if (!data[i].key) {
                        data[i].key = 'others';
                    }
                    categories.push(data[i].key);
                }



                if (params['criteriaSelected'] == 'usage') {
                    if (params.directionSelected == 'both') {
                        seriesData.push(data[i].totalOctets);
                    } else if (params.directionSelected == 'Down') {
                        seriesData.push(data[i].dsOctets);
                    } else {
                        seriesData.push(data[i].usOctets);
                    }
                } else if (params['criteriaSelected'] == 'rate') {
                    if (params.directionSelected == 'both') {
                        seriesData.push(data[i].dsRate + data[i].usRate);
                    } else if (params.directionSelected == 'Down') {
                        seriesData.push(data[i].dsRate);
                    } else {
                        seriesData.push(data[i].usRate);
                    }
                }



            }

            options.series = [{
                name: `${params.directionSelected == 'both' ? this.language['Both(Down+Up)'] : this.language[params.directionSelected]} ${capitalize.transform(params['criteriaSelected'])}`,
                data: seriesData

            }];
        } else if (type === 'pie') {

            for (let i = 0; i < data.length; i++) {

                if (params.directionSelected == 'Both(Down+Up)') {
                    seriesData.push({
                        name: data[i].name,
                        y: data[i].dsOctets + data[i].usOctets
                    });
                } else if (params.directionSelected == 'Down') {
                    seriesData.push({
                        name: data[i].name,
                        y: data[i].dsOctets
                    });
                } else {
                    seriesData.push({
                        name: data[i].name,
                        y: data[i].usOctets
                    });
                }

            }

            options.series = [{
                //colorByPoint: true,
                data: seriesData,
                name: this.language[params.directionSelected],
            }];

            options.plotOptions.pie = {
                allowPointSelect: true,
                cursor: 'pointer',
            }
        }



        return options;
    }

    makeIsoDate(value: any): any {
        let a = value.split('.');
        let b = a[0].split(":");
        b.pop();
        return b.join(':') + ':00Z';
    }

    getISODate(dt: any): any {
        let d = new Date(dt);
        let year = d.getFullYear();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        let hr = `${new Date().getUTCHours()}`;
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        let date = `${year}-${month}-${day}T${hr}:00:00Z`;
        return date;
    }

    convertStartDate(dateStr) {
        // let arr = dateStr.split("T");
        // arr.splice(1, 1);
        // arr.push("T");
        // arr.push("00:00:00Z")
        // return arr.join("");

        let arr = dateStr.split("T");
        arr.splice(1, 1);
        arr.push("00:00:00");
        let newDateStr = arr.join(" ");

        return new Date(newDateStr).toISOString();
    }

    convertEndDate(dateStr) {
        // let arr = dateStr.split("T");
        // arr.splice(1, 1);
        // arr.push("T");
        // arr.push(this.dateUtils.getTimeNow());
        // arr.push("Z");
        // return arr.join("");

        let arr = dateStr.split("T");
        arr.splice(1, 1);
        arr.push("23:59:59");
        let newDateStr = arr.join(" ");

        return new Date(newDateStr).toISOString();


    }

    checkSameDate(params) {
        let date1 = new Date(params.startDate).setHours(0, 0, 0, 0);
        let date2 = new Date(params.endDate).setHours(0, 0, 0, 0);
        if (date1 == date2) {
            return true;
        }
        return false;
    }

    getStartUTCDate(dt: any, addHours?: number): any {
        let d = new Date(dt);
        d.setHours(addHours, 0, 0, 0);
        let year = d.getUTCFullYear();
        let month = `${d.getUTCMonth() + 1}`;
        let day = `${d.getUTCDate()}`;
        let hr = `${d.getUTCHours()}`;
        let min = `${d.getUTCMinutes()}`;

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        if (min.length < 2) {
            min = `0${min}`;
        }

        let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
        return date;
    }

    getEndUTCDate(dt: any): any {
        let d = new Date(dt);
        d.setHours(0, 0, 0, 0);
        d.setDate(new Date(d).getDate() + 1);
        let year = d.getUTCFullYear();
        let month = `${d.getUTCMonth() + 1}`;
        let day = `${d.getUTCDate()}`;
        let hr = `${d.getUTCHours()}`;
        let min = `${d.getUTCMinutes()}`;

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        if (min.length < 2) {
            min = `0${min}`;
        }

        let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
        return date;
    }

    getISOStartOfDay(dt) {
        //returns 12AM UTC of day
        let d = new Date(dt);
        let year = d.getFullYear();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        let date = `${year}-${month}-${day}T00:00:00Z`;
        return date;
    }

    getISOEndOfDay(dt: any, type?: any) {
        //returns 12AM UTC of Next day of End date
        let d = new Date(dt);
        d.setDate(new Date(d).getDate() + (type === 'applications' ? 0 : 1));
        let year = d.getFullYear();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        let date = `${year}-${month}-${day}T00:00:00Z`;
        return date;
    }

    getISOStartEndDateNEW(dt: any, end?: boolean, addHours?: number) {
        let d = new Date(dt);
        let today = new Date();
        if (!end) {
            //let hrsToAdd = addHours ? addHours : 0;
            let hrsToAdd = 0;
            //d.setHours(0 + hrsToAdd, 0, 0, 0);
        } else {
            //sd.setHours(23, 59, 0, 0);
        }
        let year = d.getUTCFullYear();
        let month = `${d.getUTCMonth() + 1}`;
        let day = `${d.getUTCDate()}`;
        let hr = `${d.getUTCHours()}`;
        let min = `${d.getUTCMinutes()}`;

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        // if (!end || 1) {
        //     hr = `${d.getUTCHours()}`;
        // }
        // hr = `${d.getUTCHours()}`;

        if (end) {
            let selectedDate = new Date(d);
            if (selectedDate > today) {
                hr = `${new Date().getUTCHours()}`;
                min = `${new Date().getUTCMinutes()}`;
            }
        }

        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        if (min.length < 2) {
            min = `0${min}`;
        }


        let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
        return date;
    }

    getISOStartEndDate(dt: any, end?: boolean, addHours?: number): any {
        let d = new Date(dt);
        let today = new Date();
        if (!end) {
            //let hrsToAdd = addHours ? addHours : 0;
            let hrsToAdd = 0;
            d.setHours(0 + hrsToAdd, 0, 0, 0);
        } else {
            d.setHours(23, 59, 0, 0);
        }
        let year = d.getUTCFullYear();
        let month = `${d.getUTCMonth() + 1}`;
        let day = `${d.getUTCDate()}`;
        let hr = `${d.getUTCHours()}`;
        let min = `${d.getUTCMinutes()}`;

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        // if (!end || 1) {
        //     hr = `${d.getUTCHours()}`;
        // }
        // hr = `${d.getUTCHours()}`;

        if (end) {
            let selectedDate = new Date(d);
            if (selectedDate > today) {
                hr = `${new Date().getUTCHours()}`;
                min = `${new Date().getUTCMinutes()}`;
            }
        }

        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        if (min.length < 2) {
            min = `0${min}`;
        }


        let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
        return date;
    }

    getISOEndDate(dt: any): any {
        let d = new Date(dt);
        let year = d.getFullYear();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        let hr = `${new Date().getUTCHours()}`;
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }
        if (hr.length < 2) {
            hr = `0${hr}`;
        }

        let date = `${year}-${month}-${day}T${hr}:00:00Z`;
        return date;
    }

    getGranularity(startDate: any, endDate: any) {
        let granularity = '24hour';
        let diff = moment(endDate).diff(moment(startDate), "hour");
        if (diff <= 24) {
            granularity = "1hour"
        }
        else {
            granularity = "24hour"
        }

        return granularity;
    }


    getGranularityByChart(startDate: any, endDate: any, chart?, days?: number,) {
        // compareHour = compareHour ? compareHour * 60 * 60 : 1209600;
        // let granularity = '24hour';
        // let diff = moment(endDate).diff(moment(startDate), "hour") * 60 * 60;
        // if (diff < compareHour) {
        //     granularity = "1hour"
        // }
        // else {
        //     granularity = "24hour"
        // }
        let granularity = '24hour';
        let compareHour = 0;
        if (chart && chart == 'rate') {
            compareHour = days ? days * 24 * 60 * 60 : 2764800;
            let diff = moment(endDate).diff(moment(startDate), "hour") * 60 * 60;
            if (diff < compareHour) {
                granularity = "1hour"
            } else {
                granularity = "24hour"
            }
        } else {
            compareHour = days ? days * 24 * 60 * 60 : 2764800;
            let diff = moment(endDate).diff(moment(startDate), "hour") * 60 * 60;
            if (diff < compareHour) {
                granularity = "1hour"
            } else {
                granularity = "24hour"
            }
        }

        return granularity;
    }

    getStackedUnit(m) {
        let unit: any;
        if (m > 1000000000000) {
            unit = [1000000000000, 'TB'];
        } else if (m > 1000000000) {
            unit = [1000000000, 'GB'];
        } else if (m > 1000000) {
            unit = [1000000, 'MB'];
        } else if (m > 1000) {
            unit = [1000, 'KB'];
        } else {
            unit = [1, 'KB'];
        }
        return unit;
    }

}
