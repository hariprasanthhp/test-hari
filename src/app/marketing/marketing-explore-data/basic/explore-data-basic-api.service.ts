import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './shared/services/explore-data-common.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { Subject } from 'rxjs';
import * as constants from "../../shared/constants/marketing.constants";

@Injectable({
    providedIn: 'root'
})
export class MarketingExploreDataBasicApiService {

    public baseURL = environment.cmcBaseURL;
    filerValuesSubject = new Subject<any>()

    private cloudRegions: string;
    private locationHierarchy: string;
    private regionvalue: string



    constructor(
        private httpClient: HttpClient,
        private marketingExploreCommonService: MarketingExploreCommonService,
        private ssoAuthService: SsoAuthService
    ) {
        this.cloudRegions = this.baseURL + 'cloud/regions?';
        this.locationHierarchy = this.baseURL + 'cloud/region-location-hierarchy?';
        //this.regionvalue = this.baseURL + 'qlik';

    }

    public CloudRegions() {
        return this.httpClient.get(`${this.cloudRegions}}&`)
    }

    public LocationHierarchy() {
        return this.httpClient.get(`${this.locationHierarchy}}&`)
    }
    prepareLocationRegionHierachy(result: any) {
        let regionsLocations = [];
        let regionMap = {};
        result.map((item) => {
            if (!regionMap.hasOwnProperty(item[0])) {
                regionsLocations.push({
                    value: item[0],
                    parent: constants.CLOUD_ALL
                });
                regionMap[item[0]] = true;
            }
            regionsLocations.push({
                value: item[1],
                parent: item[0]
            });
        });
        return regionsLocations;
    }

}
