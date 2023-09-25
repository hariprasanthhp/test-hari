import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';


@Injectable({
    providedIn: 'root'
})
export class HealthService {

    public baseURL = environment.API_BASE_URL;
    commonHighChartOptions: any;
    languageSubject: any;
    language: any;
    private regions: string;
    private locations: string;
    private systems: string;
    private reports: string;
    private ont: string;
    private ontBipError: string;
    ontlowlightcount: string;
    private Interface: string;
    private OntNames: string;
    previousUrl: string = "";
    isReport: boolean = false;
    query1: string;

    constructor(private translateService: TranslateService,
        private dateUtils: DateUtilsService, private httpClient: HttpClient, private ssoAuthService: SsoAuthService, private activeRoute: Router) {
        this.language = this.translateService.defualtLanguage;
        this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
            this.language = data;
        });
        this.regions = this.baseURL + 'nfa/regions?tenant=0';
        this.locations = this.baseURL + 'nfa/locations?tenant=0';
        this.systems = this.baseURL + 'nfa/systems?tenant=0';
        this.reports = this.baseURL + 'health/reports/';
        this.ont = this.baseURL + 'nfa/onts/count?tenant=0&reportType=DEVICE_CHECKED_IN&type=pon';
        this.ontBipError = this.baseURL + 'health/reports/biperror/thresholdexceededcount?tenant=0&granularity=15min&direction=both&groupBy=ont';
        this.ontlowlightcount = this.baseURL + 'health/reports/lowlightlevelcount?tenant=0&granularity=15min&groupBy=ont';
        this.Interface = this.baseURL + 'nfa/interfaces/names?';
        this.OntNames = this.baseURL + 'nfa/onts/names?';
    }

    ontBipErrornew(query) {
        let query1 = query + "&countBy=ont"
        return this.httpClient.get(`${environment.API_BASE_URL}health/reports/biperror/count?${query1}`).pipe(
            catchError(this.handleError));
    }
    GetBipError(query): Observable<any> {
        return this.httpClient.get(` ${this.reports + "/biperror?"}${query}`).pipe(
            catchError(this.handleError) // Error handle
        );
    }
    //offset=0&limit=500&reportType=DISCOVERED_DEVICE&
    ontname(fsan) {
        return this.httpClient.get(`${environment.API_BASE_URL}nfa/onts?fsanMac=${fsan}`).pipe(
            catchError(this.handleError));
    }
    getfsan() {
        return this.httpClient.get(`${this.regions}`).pipe(
            catchError(this.handleError)
        )
        // let arr = [{ fsan: 'sdfsdafsdaf' }, { fsan: 'sdfsdafsdaf' }, { fsan: 'sdfsdafsdaf' }, { fsan: 'sdfsdafsdaf' }]
        // return arr;
    }
    timeseries(query, type?) {
        if (type == 'pon') {
            let field = "&field=usOct&field=dsOct&field=rxPkt&field=rxDis&field=rxErr&field=txPkt&field=txDis&field=txErr&field=rxErrRate&field=txErrRate&field=rxDisRate&field=txDisRate&field=dsRate&field=usRate&interfaceCategory=pon"
            let field1 = "&&field=dsBipErr&field=usBipErr"
            return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                catchError(this.handleError));
        }
        else if (type == 'ont') {
            let field = `&field=dsBipErr&field=usBipErr&field=usFecTotCodeWord&field=dsFecTotCodeWord&field=upTime&field=rxOptPwr&field=neOptSignalLvl&field=txOptLvl&field=usFecCor&field=dsFecCor&field=usFecUncorCodeWord&field=dsFecUncorCodeWord`
            return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                catchError(this.handleError));
        }

        else if (type == 'ethernet' || type == "ae") {
            let field = "&field=oct&field=pkt&field=rxPkt&field=rxOct&field=rxDis&field=rxErr&field=txPkt&field=txDis&field=txErr&field=txOct&field=rxErrRate&field=txErrRate&field=rxDisRate&field=txDisRate&field=dsRate&field=usRate"
            if (type == 'ae') {
                field = field + "&format=grouped&groupBy=system&groupBy=interface&groupBy=ont&interfaceCategory=ae"
                return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                    catchError(this.handleError));
            }
            else {
                field = field + "&interfaceCategory=ethernet"
                return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                    catchError(this.handleError));
            }

        } else if (type == 'dsl') {
            let field = "&field=rxPkt&field=rxOct&field=rxDis&field=rxErr&field=txPkt&field=txOct&field=usCurRate&field=dsCurRate&field=usAttRate&field=dsAttRate&field=usSnrMargin&field=dsSnrMargin&field=usTargetSnr&field=dsTargetSnr&field=upTime&field=retrainCnt&field=usRate&field=dsRate&field=rxDisRate&field=rxErrRate"
                field = field + "&interfaceCategory=dsl"
                return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                    catchError(this.handleError));

        }
        else if (type == 'ae_General') {
            let field = "&field=oct&field=pkt&field=rxPkt&field=rxOct&field=rxDis&field=rxErr&field=txPkt&field=txDis&field=txErr&field=txOct&field=rxErrRate&field=txErrRate&field=rxDisRate&field=txDisRate&field=dsRate&field=usRate&interfaceCategory=ae&aeMgmt=true&format=grouped&groupBy=region&groupBy=location&groupBy=system&groupBy=interface&groupBy=ont";
            return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                catchError(this.handleError));
        }
    }

    timeseriesBipError(query, type?) {
        if (type == 'pon') {
            let field = "&field=dsBipErr&field=usBipErr"
            return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                catchError(this.handleError));
        }else if (type =='ont') {
            let field = "&field=dsBer&field=usBer"
            return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
                catchError(this.handleError));
        }
    }
    // Interface 
    GetInterfaces(query, type?) {
        // let system = '&system' + systemId;
        return this.httpClient.get(`${this.Interface}${query}`).pipe(
            map((res: any) => {
                res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: true }))
                return res;
            }),
            catchError(this.handleError)
        )
    }
    // ont Names
    GetOntNames(query) {
        return this.httpClient.get(`${this.OntNames}${query}`)
    }

    pontimeseries(query) {
        let field = "&field=usOct&field=dsOct&field=rxPkt&field=rxDis&field=rxErr&field=txPkt&field=txDis&field=txErr"
        return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
            catchError(this.handleError));
    }
    ethernertimeseries(query) {
        let field = "&field=oct&field=pkt&field=rxPkt"
        return this.httpClient.get(`${this.baseURL + "/health/timeseries?"}${query}${field}`).pipe(
            catchError(this.handleError));
    }
    public Lowlightlevelcount(query) {


        return this.httpClient.get(`${this.reports + "/lowlightlevelcount?"}${query}`).pipe(
            catchError(this.handleError));
    }
    public getRegions() {
        return this.httpClient.get(`${this.regions}`).pipe(
            catchError(this.handleError)
        )
    }

    public getLocations(id) {
        let region = '&region=' + id;
        return this.httpClient.get(`${this.locations}${region}`).pipe(
            map((res: any) => {
                res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
                return res;
            }),
            catchError(this.handleError)
        )
    }

    public getSystems(regionId: any, locationId: any, page?) {
        let region = '&region=' + regionId;
        let location = '&location=' + locationId;
        if (page) location += `&interfaceCategory=${page}`;
        return this.httpClient.get(`${this.systems}${region}${location}`).pipe(
            map((res: any) => {
                res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
                return res;
            }),
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    public getOnt() {
        return this.httpClient.get(`${this.ont}`)
    }
    
    getEthernetCount(query) {
        if(query=='ethernet'){
            this.query1=`aeMgmt=false&adminStatus=UP`
        }else{
            this.query1=`aeMgmt=true&adminStatus=UP`
        }
      
        return this.httpClient.get(`${environment.API_BASE_URL}nfa/interfaces/ethernet/count?${this.query1}`).pipe(
            catchError(this.handleError));
    }

    getEthernetActiveCount(query) {
        this.query1=`aeMgmt=false&adminStatus=UP&operStatus=UP`
        
        return this.httpClient.get(`${environment.API_BASE_URL}nfa/interfaces/ethernet/count?${this.query1}`).pipe(
            catchError(this.handleError));
    }

    getAECount(query) {
        this.query1=`adminStatus=UP`    
        return this.httpClient.get(`${environment.API_BASE_URL}nfa/onts/ae/count?${this.query1}`).pipe(
            catchError(this.handleError));
    }

    public getOntBipError(FromDate, EndDate) {

        return this.httpClient.get(`${this.ontBipError}&startTime=${FromDate}&endTime=${EndDate}`).pipe(
            catchError(this.handleError));
    }
    public getLowlightlevelcount(fromdate, endtime?) {
        return this.httpClient.get(`${this.ontlowlightcount}&startTime=${fromdate}&endTime=${endtime}`).pipe(
            catchError(this.handleError));
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

    chartDataFraming(chartdata, chartName?, type?, extraData?,value?) {
        //debugger
        let resultArray = [];
        let title = type == 'fsan' ? 'ont' : type;
        type = type == 'ont' ? 'fsan' : type;
        if (chartName == 'Packet Dropped') {

            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [this.language['Received Discarded Packets']]: chartdata[i].rxDis ? chartdata[i].rxDis : 0,
                        [this.language['Transmitted Discarded Packets']]: chartdata[i].txDis ? chartdata[i].txDis : 0
                    }
                )
            }


        }
        else if (chartName == 'ethernet_packet' || chartName == 'ae_packet') {

            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [this.language['Received Error Packets']]: chartdata[i].rxErr ? chartdata[i].rxErr : 0,
                        [this.language['Transmitted Error Packets']]: chartdata[i].txErr ? chartdata[i].txErr : 0
                    }
                )
            }
        }
        else if (chartName == 'PON Port Courts' ||chartName=='PON Interface Count' || chartName == 'ae_threshold') {
            let us = this.language['Upstream'];
            let ds = this.language['Downstream']
            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [us]: chartdata[i].usUtilExcCnt ? chartdata[i].usUtilExcCnt : 0,
                        [ds]: chartdata[i].dsUtilExcCnt ? chartdata[i].dsUtilExcCnt : 0
                    }
                )
            }
        }
        else if (value==='DSL' && (chartName.includes("Threshold") ||chartName.includes("Not At Attainable") || chartName.includes("Not At Target"))) {
            let us = this.language['Upstream'];
            let ds = this.language['Downstream']
            if(chartName.includes("Not At Attainable")){
                for (var i = 0; i < chartdata?.length; i++) {
                    let name = chartdata[i][type] ? chartdata[i][type] : "other";
                    resultArray.push(
                        {
                            [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                            [us]: chartdata[i].usCurRateBelowThresCnt ? chartdata[i].usCurRateBelowThresCnt : 0,
                            [ds]: chartdata[i].dsCurRateBelowThresCnt ? chartdata[i].dsCurRateBelowThresCnt : 0
                        }
                    )
                }
            }else if(chartName.includes("Not At Target")){
                for (var i = 0; i < chartdata?.length; i++) {
                    let name = chartdata[i][type] ? chartdata[i][type] : "other";
                    resultArray.push(
                        {
                            [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                            [us]: chartdata[i].usSnrBelowThresCnt ? chartdata[i].usSnrBelowThresCnt : 0,
                            [ds]: chartdata[i].dsSnrBelowThresCnt ? chartdata[i].dsSnrBelowThresCnt : 0
                        }
                    )
                }
            }else{
                for (var i = 0; i < chartdata?.length; i++) {
                    let name = chartdata[i][type] ? chartdata[i][type] : "other";
                    resultArray.push(
                        {
                            [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                            [us]: chartdata[i].usUtilExcCnt ? chartdata[i].usUtilExcCnt : 0,
                            [ds]: chartdata[i].dsUtilExcCnt ? chartdata[i].dsUtilExcCnt : 0
                        }
                    )
                }
            }
           
        }
        else if (chartName == 'PON Error Rate' || chartName == "BIP Error Rate") {
            let urls = this.activeRoute.url;
            let bipE;
            if (urls.includes('health/ont'))
                bipE = this.language["BIP Error Count"]
            else
                bipE = this.language['BIP Error Interfaces']
            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [bipE]: chartdata[i].count ? chartdata[i].count : 0,

                    }
                )
            }
        }
        else if (chartName == 'low light') {
            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [this.language["Optical Power Low Threshold Count"]]: chartdata[i].count ? chartdata[i].count : 0,

                    }
                )
            }
        }
        else if (chartName == 'systemUtilization') {
            for (var i = 0; i < chartdata?.length; i++) {
                let name = chartdata[i][type] ? chartdata[i][type] : "other";
                resultArray.push(
                    {
                        [this.language[title]]: chartdata[i]["deleted"] ? name + ' (Deleted)' : name,
                        [this.language['Upstream']]: chartdata[i].usUtilizationPercent ? chartdata[i].usUtilizationPercent : 0,
                        [this.language['Downstream']]: chartdata[i].dsUtilizationPercent ? chartdata[i].dsUtilizationPercent : 0

                    }
                )
            }
        }
        if (resultArray.length)
            return resultArray
        else {
            resultArray.push({ [this.language["No Data Available"]]: " " });
            return resultArray
        }


    }
    public stackedAreaChartOptions(): Observable<{}> {
        const object = {
            ...this.commonHighChartOptions,
            chart: {
                type: 'area'
            },
            title: {
                text: 'Stacked Area Chart'
            },
            colors: ['#338107', '#fbe936', '#fa423b'],
            // subtitle: {
            //   text: 'Source: Wikipedia.org'
            // },
            xAxis: {
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                categories: [
                    '09/25 12:15',
                    '09/25 20:15',
                    '09/26 04:15',
                    '09/26 12:15',
                    '09/26 20:15',
                    '09/27 04:15',
                    '09/27 12:15',
                    '09/27 20:15',
                    '09/28 04:15',
                    '09/28 12:15',
                    '09/28 20:15',
                    '09/29 04:15',
                    '09/29 12:15',
                    '09/29 20:15',
                    '09/30 04:15',
                    '09/30 12:15',
                    '09/30 20:15',
                    '10/01 04:15',
                    '10/01 12:15',
                    '10/01 20:15',
                    '10/02 04:15'
                ],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                tickInterval: 25,
                title: {
                    text: 'Percentage(%)'
                },
                // labels: {
                //   formatter() {
                //     return this.value / 1000;
                //   }
                // }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.percentage:.1f}%'
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            // tslint:disable-next-line:object-literal-shorthand
                            click: function () {
                                console.log('Category: ' + this.category + ', Series:' + this.series.name + ', value: ' + this.y);
                            }
                        }
                    }
                },
                area: {
                    stacking: 'normal',
                    // lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        },
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [
                {
                    name: 'Free',
                    data: [100, 100, 100, 100, 100, 100, null, null, null, null, null, null, 100, 100, 100, 100, 100, 100, null, null, null]
                }, {
                    name: 'Used',
                    data: [5, 4, 6, 5, 4, 9, null, null, null, null, null, null, 4, 5, 2, 4, 5, 7, null, null, null]
                }, {
                    name: 'Interference',
                    data: [20, 25, 18, 25, 22, 24, null, null, null, null, null, null, 20, 22, 25, 21, 23, 18, null, null, null],
                }]
        };
        return of(object);
    }
    duplicateDataHandle(data,groupby,type){
        if (data?.length) {
            let count = 0; let duplicate = []; let modifyData=[]
            data.forEach((element: any) => {
              count = count + 1; 
              if (!element[groupby] || element[groupby] == "       ") {
                element[groupby] = "Other";
              }
              if (duplicate.indexOf(element[groupby]) === -1) {
                duplicate.push(element[groupby])
              }
              else { 
                modifyData.push(element[groupby])
              }
            });
            data.forEach((element: any) => {
              modifyData.forEach((el:any)=>{
                if(element[groupby] ===el ){
                  element[groupby]  = element[groupby] + "_" + element[type].slice(0, 5)
                }
              })
              
            })
          }
          return data
    }
    generateDownloadName(chartName: string, type1?, page?) {
        let type;
        // type1 = type1 == 'interface' ? "Port" : type1;
        if (type1 == 'ont' || type1 == "fsan")
            type = 'ONT';

        else
            type = type1.charAt(0).toUpperCase() + type1.slice(1);

        if (chartName == 'PON Port Courts'|| chartName=='PON Interface Count' ) {
            switch (type) {
                case "Region": { chartName = this.language[page] + " " + this.language["Threshold By Region"]; break; }
                case "Location": { chartName = this.language[page] + " " + this.language["Threshold By Location"]; break; }
                case "System": { chartName = this.language[page] + " " + this.language["Threshold By System"]; break; }
                case "Interface": { chartName = this.language[page] + " " + this.language["Threshold By Interface"]; break; }
                case "ONT": { chartName = this.language[page] + " " + this.language["Threshold Exceeded By Ont"]; break; }
            }
        } else if (chartName == 'Packet Dropped') {
            switch (type) {
                case "Region": { chartName = this.language[page] + " " + this.language["HPacketDroppedByRegion"]; break; }
                case "Location": { chartName = this.language[page] + " " + this.language["HPacketDiscardsByLocation"]; break; }
                case "System": { chartName = this.language[page] + " " + this.language["HPacketDroppedBySystem"]; break; }
                case "Interface": { chartName = this.language[page] + " " + this.language["HPacketDroppedByInterface"]; break; }
                case "ONT": { chartName = this.language[page] + " " + this.language["HPacketDroppedByOnt"]; break; }
            }
        } else if (chartName == "low light") {
            switch (type) {
                case "Region": { chartName = this.language[page] + " " + this.language["HLowLightLevelbyregion"]; break; }
                case "Location": { chartName = this.language[page] + " " + this.language["HLowLightLevelByLocation"]; break; }
                case "System": { chartName = this.language[page] + " " + this.language["HLowLightLevelBySystem"]; break; }
                case "Interface": { chartName = this.language[page] + " " + this.language["HLowLightLevelByInterface"]; break; }
                case "ONT": { chartName = this.language[page] + " " + this.language["Low Level Light By Ont"]; break; }
            }
        } else if (chartName == "systemUtilization") {
            chartName = this.language[page] + " " + this.language["HUtilizationByInterface"];
        }
        else if (chartName == "BIP Error Rate" && page == 'PON') {
            if (type == "Interface") {

                chartName = this.language[page] + " " + this.language["Interfaces with BIP Errors"];
            }
            else {
                switch (type) {
                    case "Region": { chartName = this.language[page] + " " + this.language["BIP Error Interfaces By Region"]; break; }
                    case "Location": { chartName = this.language[page] + " " + this.language["BIP Error Interfaces By Location"]; break; }
                    case "System": { chartName = this.language[page] + " " + this.language["BIP Error Interfaces By System"]; break; }
                    case "Interface": { chartName = this.language[page] + " " + this.language["Interfaces with BIP Errors"]; break; }
                }

            }
        }
        else if (chartName == "BIP Error Rate" || chartName =='PON Error Rate') {
            switch (type) {
                case "Region": { chartName = this.language[page] + " " + this.language["HBIPErrorbyregion"]; break; }
                case "Location": { chartName = this.language[page] + " " + this.language["HBIPErrorByLocation"]; break; }
                case "System": { chartName = this.language[page] + " " + this.language["HBIPErrorBySystem"]; break; }
                case "Interface": { chartName = this.language[page] + " " + this.language["HBIPErrorByInterface"]; break; }
                case "ONT": { chartName = this.language[page] + " " + this.language["Bip Error By Ont"]; break; }
            }
        }
        else {
            chartName = this.language[page] + " " + this.language[chartName];
        }
        let splitName = chartName.split(" ");
        let joinName = splitName.join('_');
        let time = new Date().getTime();
        let name = '';
        let date = this.formatTodayDate() ? this.formatTodayDate() : '';
        name += joinName;// + '-' + date + '-' + time;
        return name;
    }
    getGranularity(startDate: any, endDate: any) {
        endDate = this.dateUtils.getCurrentUtcTime();
        console.log(endDate);
        let granularity = '24hour';
        let diff = (moment(endDate * 1000).diff(moment(startDate * 1000), "days") + 1);
        if (diff <= 30) {
            granularity = "15min"
        }
        else if (diff > 30 && diff <= 90) {
            granularity = "1hour"
        }
        else if (diff > 90 && diff <= 182) {
            granularity = "24hour"
        }
        else if (diff > 182 && diff <= 728) {
            granularity = "1month"
        }
        else
            granularity = "1month"

        console.log(diff);
        return granularity;
    }
    chart_color(element, value, color = 'first') {

        // if (element?.deleted && element[value] != 0 && element[value])
        //     return environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'][color]
        // else if (element?.deleted && element[value] == 0) {
        //     return environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'][color]
        // }
        // else if (!element[value] || element[value] == 0) {
        //     return environment.OPERATIONS.HEALTH['BAR_TRANSPARENT'][color]
        // }
        if (element?.deleted)
            return environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'][color]
        else
            return environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'][color]
    }
    toolip_color(color) {
        if (color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first)
            return environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first;
        else if (color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].second)
            return environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].second;
        else if (color == environment.OPERATIONS.HEALTH['BAR_TRANSPARENT'].first)
            return environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first;
        else if (color == environment.OPERATIONS.HEALTH['BAR_TRANSPARENT'].second)
            return environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second;
        else
            return color
    }
    totalcoutsort(data, key1, key2, charttype = 'Region') {

        let a = [];
        let b = [];
        let name = charttype.toLowerCase()
        if (name == "interface") {
            data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: true }))
        }
        else {
            data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: false }))
        }
        data.forEach(obj => {
            if ((obj[key1] || obj[key2]) || (obj[key1] == 0 || obj[key2] == 0)) {
                a.push(obj);
            }
            else
                b.push(obj);
        });
        a.sort(function (a, b) {
            let a1 = (a[key1] ? a[key1] : 0) + (a[key2] ? a[key2] : 0)
            let b1 = (b[key1] ? b[key1] : 0) + (b[key2] ? b[key2] : 0)
            return (b1 - a1)
        });
        //a.reverse();
        data = [...a, ...b];
        return data;

    }
    totalcountsort(data, key1, key2, key3,key4,key5, charttype = 'Region') {

        let a = [];
        let b = [];
        let name = charttype.toLowerCase()
        if (name == "interface") {
            data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: true }))
        }
        else {
            data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: false }))
        }
        data.forEach(obj => {
            if ((obj[key1] || obj[key2]|| obj[key3]|| obj[key4]|| obj[key5]) || (obj[key1] == 0 || obj[key2] == 0|| obj[key3] == 0|| obj[key4] == 0|| obj[key5] == 0)) {
                a.push(obj);
            }
            else
                b.push(obj);
        });
        a.sort(function (a, b) {
            let a1 = (a[key1] ? a[key1] : 0) + (a[key2] ? a[key2] : 0)+ (a[key3] ? a[key3] : 0)+ (a[key4] ? a[key4] : 0)+ (a[key5] ? a[key5] : 0)
            let b1 = (b[key1] ? b[key1] : 0) + (b[key2] ? b[key2] : 0)+ (b[key3] ? b[key3] : 0)+ (b[key4] ? b[key4] : 0)+ (b[key5] ? b[key5] : 0)
            return (b1 - a1)
        });
        //a.reverse();
        data = [...a, ...b];
        return data;
    
    }
}
