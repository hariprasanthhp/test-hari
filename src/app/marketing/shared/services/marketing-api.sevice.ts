import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { openQlikConnection, openApp, openApp_aq } from './qlik-connection.js';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable.js';
import { ThoughtSpotInsightsModel } from '../models/thoughtspot-insights-model.js';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
const axios = require('axios'); 
const axiosCookieJar = require('axios-cookiejar-support'); 
const tough_cookie = require("tough-cookie");
@Injectable({
    providedIn: 'root'
})
export class MarketingApiService {
    qlikApp: any;
    qlikApp_Aqui: any;
    public baseURL = environment.cmcBaseURL;
    public baseURLCMC = environment.API_BASE_URL_CMC;
    Ts_baseURL = `${environment.QLIK_TS_BASEURL}`
    Ts_TokenUrl =`${environment.QLIK_TS_TOKEN_URL}`
    Ts_VizId =`${environment.QLIK_TS_VIZID}`
    Ts_KPIId =`${environment.QLIK_TS_KPIID}`
    Ts_AdvanceId =`${environment.QLIK_TS_ADVANCE_ID}`
    Ts_ProspectId =`${environment.QLIK_TS_PROSPECT_ID}`
    private qlikThoughtspotInsightsBaseUrl = environment.QLIK_THOUTSPOT_INSIGHTS;
    public qlikOpenConnectionApp = new Subject<any>();
    public qlikOpenConnectionApp_Aqui = new Subject<any>();
    dev:boolean = false
    dev_func
    stg
    constructor(
        private httpClient: HttpClient,
        private ssoAuthService: SsoAuthService,
    ) {
        let base = `${environment.API_BASE}`;
        if (base.indexOf('/dev.api.calix.ai') > -1) {
          this.dev = true
        } else {
          this.dev = false
        }
        this.stg = `${WindowRefService.prototype.nativeWindow}`.includes('cloud-stg.calix.com') ? true : false
        this.dev_func = WindowRefService.prototype.nativeWindow.includes('cloud-devfunc.calix.com') ? true : false

    }

    openQlikConnection() {
        console.log("1.Open_qlik_connection", new Date())
        let entitlement = this.ssoAuthService.getEntitlements();
        let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
        this.ssoAuthService.getQlikTOkenByAppType(cmcType).subscribe((res: any) => {
            openQlikConnection(res.Ticket).then((res) => {
                console.log("2.Open_qlik_connection_response", new Date())
                this.openApp()
            }, (error: any) => {
                // this.openQlickConnectionWithTicket();
            });
        })
    }
    openQlickConnectionWithTicket() {
        let entitlement = this.ssoAuthService.getEntitlements();
        let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro'
        this.ssoAuthService.getQlikTOkenByAppType(cmcType).subscribe((res: any) => {
            openQlikConnection(res.Ticket).then((res) => {
                //  this.openApp()
            }, (error: any) => {
                // this.openQlikConnection();
            });
        })
    }
    openApp() {
        console.log("3.Qlik_app_opening_func", new Date())
        openApp().then((app) => {
            console.log("4.Qlik_app_opening_response", app, new Date())
            this.setQlickConnetedApp(app)
            this.qlikOpenConnectionApp.next(this.qlikApp);
        })
        openApp_aq().then((app) => {
            console.log("4_1.Qlik_app_opening_response", app, new Date())
            this.setQlickConnetedApp_Aqui(app)
            this.qlikOpenConnectionApp_Aqui.next(this.qlikApp_Aqui);
        })
    }
    getDownloadFileContent(url) {
        let fileUrl = `${url}&file=true`
        return this.httpClient.get(fileUrl, { responseType: 'blob' });
    }
    getDownloadFileContentTS(url) {
        let fileUrl = `${url}`
        return this.httpClient.get(fileUrl, { responseType: 'blob' });
    }
    setQlickConnetedApp(app) {
        this.qlikApp = app;
    }
    getQlikConnectedApp() {
        return this.qlikApp
    }
    setQlickConnetedApp_Aqui(app) {
        this.qlikApp_Aqui = app;
    }
    getQlikConnectedApp_Aqui() {
        return this.qlikApp_Aqui
    }
    userPreferences: any;
    getUserPreference(region: any, period?: any, location?: any): any {
        let url = `${this.baseURLCMC}pref/user-preferences`;
        this.httpClient.get(url).subscribe((json: any) => {
            this.userPreferences = json;
            this.setUserPreference(region, period, location)
        }, (error: any) => {
        });
    }
    getUserPreferenceInsights() {
        let url = `${this.baseURLCMC}pref/user-preferences`;
        return this.httpClient.get(url)
    }
    setUserPreference(region: any, period?: any, location?: any): any {
        let preference = {
            region: region,
            period: period,
            location: location,
            timezone: this.getTimezone()
        };
        this.userPreferences = { ...this.userPreferences, ...preference };
        let url = `${this.baseURLCMC}pref/user-preferences`;
        this.httpClient.post(url, this.userPreferences).subscribe((json: any) => {
        }, (error: any) => {
        });

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
            timezone_standard = offset_hrs + ':' + offset_min;
        else if (timezone_offset_min > 0)
            timezone_standard = '-' + offset_hrs + ':' + offset_min;
        else if (timezone_offset_min == 0)
            timezone_standard = '00:00';


        return timezone_standard
        // Timezone difference in hours and minutes
        // String such as +5:30 or -6:00 or Z
        //console.log(timezone_standard);
    }
    userPreferenceApiLoader() {
        this.getUserPreferenceInsights()
            .subscribe((res: any) => {
                this.setSearchFilterValues(res);
            }, (error: any) => {
                this.setSearchFilterValues();
            });
    }
    setSearchFilterValues(res?: any) {
        if (res && res.period) {
            this.setPeriod(res.period == 'last-28d' ? 'last-30d' : res.period)
        } else {
            this.setPeriod('last-2m')
        }
        if (res && res.region) {
            this.setRegion(res.region)
        } else {
            this.setRegion('All')
        }
        if (res && res.location) {
            this.setLocation(res.location)
        } else {
            this.setLocation('All')
        }

    }
    getLocation() {
        return localStorage.getItem('location') ? localStorage.getItem('location') : 'All'
    }
    getRegion() {
        return localStorage.getItem('region') ? localStorage.getItem('region') : 'All'
    }
    getPeriod() {
        return localStorage.getItem('period') ? localStorage.getItem('period') : 'last-2m'
    }
    setLocation(location) {
        return localStorage.setItem('location', location)
    }
    setRegion(region) {
        return localStorage.setItem('region', region)
    }
    setPeriod(period) {
        return localStorage.setItem('period', period)
    }

     getHomePageInsightsKPI = async(username, auth_token) => {
       
        try {
            // create an HTTP client with session
            const sess = axiosCookieJar.wrapper(
                axios.create({
                jar: new tough_cookie.CookieJar(),
                withCredentials: true,
                baseURL: this.Ts_baseURL,
                headers: {
                    "x-requested-by": "ThoughtSpot",
                }
                })
            );
            
            var session = await sess({
                method: "POST",
                url: this.Ts_TokenUrl,
                data: `username=${username}&auth_token=${auth_token}`
            });
        
            var sessionInfo = await sess({method: "GET", url: "/callosum/v1/tspublic/v1/session/info"});
            console.log(`     GET  >> session/info    << HTTP ${sessionInfo.status}`);
        
            var response = await sess({
                method: "POST",
                url: "/tspublic/rest/v2/data/liveboard",
                data:{
                    "id": this.Ts_KPIId,
                    "vizId": [this.Ts_VizId],
                    "offset": 0,
                    "batchSize": 100,
                },
                headers: {
                    "Accept-Language": "en-US,en;q=0.5"
                }
            });
            let vizId = Object.keys(response.data)[0],
            tableColumnNames = response.data[vizId].columnNames,
            tableData = response.data[vizId].data[0],
            tableFormatted = {
    
                [tableColumnNames[0]]: (tableData[0] * 100).toFixed(2),
                
                [tableColumnNames[1]]: (tableData[1] * 100).toFixed(2),
                
                 [tableColumnNames[2]]: (tableData[2] * 100).toFixed(2),
                
                 [tableColumnNames[3]]: (tableData[3] * 100).toFixed(2),
                
                 [tableColumnNames[4]]: Math.round(tableData[4] * 100) / 100,
                
                 [tableColumnNames[5]]: tableData[5],
                
                 [tableColumnNames[6]]: tableData[6],
                
                [tableColumnNames[7]]: tableData[7],
                
                 [tableColumnNames[8]]: tableData[8],
                
                [tableColumnNames[9]]: tableData[9],
                
                 [tableColumnNames[10]]: (tableData[10] * 100).toFixed(2),
                
                 [tableColumnNames[11]]: (tableData[11] * 100).toFixed(2),
                
                [tableColumnNames[12]]: (tableData[12] * 100).toFixed(2),
                
                [tableColumnNames[13]]: (tableData[13] * 100).toFixed(2),
                
               [tableColumnNames[14]]: (tableData[14] * 100).toFixed(2),
                
                };
                
                //static formated data
                
                let tableFormatted_dataObj = {
                
               ARPU: tableFormatted[tableColumnNames[4]],
                
                 ARPU_Percentage: tableFormatted[tableColumnNames[13]],
                
                 Acquisition_Rate: tableFormatted[tableColumnNames[10]],
                
                Acquisition_Rate_Percentage: tableFormatted[tableColumnNames[11]],
                
                 All_Subscribers: tableFormatted[tableColumnNames[5]],
                
                All_Subscribers_Percentage: tableFormatted[tableColumnNames[0]],
                
               Churn_Rate: tableFormatted[tableColumnNames[12]],
                
                 Churn_Rate_Percentage: tableFormatted[tableColumnNames[14]],
                
                 Gaming_Subscribers: tableFormatted[tableColumnNames[7]],
                
                 Gaming_Subscribers_Percentage: tableFormatted[tableColumnNames[2]],
                
                 New_Subscribers_Per_Day: tableFormatted[tableColumnNames[9]],
                
                New_Subscribers_Per_Day_Percentage: '-',
                
                Streaming_Subscribers: tableFormatted[tableColumnNames[6]],
                
                Streaming_Subscribers_Percentage: tableFormatted[tableColumnNames[1]],
                
               Work_From_Home_Subscribers: tableFormatted[tableColumnNames[8]],
                
               Work_From_Home_Subscribers_Percentage:
                
               tableFormatted[tableColumnNames[3]],
                
                };
              console.log(tableFormatted_dataObj);
              return tableFormatted_dataObj;
    
        } catch(error) {
            return {};
        }
    }
    
    getCampaignFilters = async (username, auth_token, columnName, runtimeFilter = [], page) => {

        const worksheetId = page.toLowerCase() === 'advance' ? this.Ts_AdvanceId : this.Ts_ProspectId
        function getFilterQuery(
            baseQuery,
            _columnName,
            _runTimeFilter
        ) {
            let temp_runTimeFilter = [..._runTimeFilter].filter(
                elem => elem.columnName.toLowerCase() !== _columnName.toLowerCase(),
              ),
              query = '';
            temp_runTimeFilter.map(ele => {
              if (ele.values.length > 0)
                query += `[${ele.columnName}]='${ele.values.join(',')}' `;
            });
            return query + baseQuery;
        }
        try {
            const sess = axiosCookieJar.wrapper(
                axios.create({
                jar: new tough_cookie.CookieJar(),
                withCredentials: true,
                baseURL: this.Ts_baseURL,
                headers: {
                    "x-requested-by": "ThoughtSpot",
                }
                })
            );
            
            var session = await sess({
                method: "POST",
                url: this.Ts_TokenUrl,
                data: `username=${username}&auth_token=${auth_token}`
            });
        
            var sessionInfo = await sess({method: "GET", url: "/callosum/v1/tspublic/v1/session/info"});
            console.log(`     GET  >> session/info    << HTTP ${sessionInfo.status}`);
    
            // let queryString = `[${columnName}] sort by [${columnName}]`
    
            let queryString = getFilterQuery(
                `[${columnName}] sort by [${columnName}]`,
                columnName,
                runtimeFilter,
            )
            var response = await sess({method: "POST", url: `/tspublic/rest/v2/data/search`, data:{
                queryString: queryString,
                dataObjectId: worksheetId,
                offset: 0,
                batchSize: 100,
                
            },
            headers: {
                "Accept-Language": "en-US,en;q=0.5"
            }});
    
            let returnData = response.data.data.map(ele => {
                return{
                    [response.data.columnNames[0]]: ele[0]
                }
            })
            console.log({
                message:'Successfully initiated',
                data: returnData
            })
            return {
                message:'Successfully initiated',
                data: returnData
            }
           
    
    
        
        } catch(err) {
            console.log(err);
        }
    }
}
