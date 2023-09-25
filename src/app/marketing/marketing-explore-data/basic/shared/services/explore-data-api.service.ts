import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from './explore-data-common.service';

// import { SEGMENTATION_CATEGORIES } from "../../../App-Services/insights.constants";
// import { InsightsService } from './../../shared/services/insights.service';
// import {
//   reformatSeriesDataForCategories, reformatCategoriesWithObjectSeries,
//   reformatDataToPieSeries
// } from '../../shared/utils/utils';
// import * as AWS from "aws-sdk";
// (window as any).global = window;
// import * as AWS from 'aws-sdk';

// import * as constants from "./../../../App-Services/insights.constants";

const httpOptions = {
    headers: new HttpHeaders({
        responseType: 'text'
    })
};

@Injectable({
    providedIn: 'root'
})
export class MarketingExploreDataApiService {

    public baseURL = environment.cmcBaseURL;
    // Normal View

    constructor(
        private httpClient: HttpClient,
        private marketingExploreCommonService: MarketingExploreCommonService
    ) {
    }





}
