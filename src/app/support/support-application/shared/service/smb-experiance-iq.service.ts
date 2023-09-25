import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ExperianceIQUserModel } from "../models/experiance-iq-user.model";
import { FeatureList } from "../models/feature-list.model";

import { FormBuilder } from "@angular/forms";
import { environment } from "src/environments/environment";
import { addProfileAppUrl, addWebAddressUrl, checkProfileListUrl, getAppListUrl, getResSettingsByIDUrl, getSearchListUrl, getWebAddressUrl, removeSelectedAppUrl, removeWebUrl, roleProfileListUrl, updateRoleProfileUrl } from "./endPoints";
import { Apps, SearchAppModel } from "../models/search-app.model";


@Injectable({
    providedIn: 'root'
})
export class SmbExperianceIQService {
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {

    }

    getRoleProfileList(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<any>(roleProfileListUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getResSettingsById(userId: string, roleId: number, profileId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('roleId', roleId)
            .set('profileId', profileId);
        return this.http.get<any>(getResSettingsByIDUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    updateRoleProfile(body: any): Observable<any> {
        return this.http.post(updateRoleProfileUrl, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getWebList(userId: string, profileId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId);
        return this.http.get<any>(getWebAddressUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    addWebAddressMain(body): Observable<any> {
        return this.http.put(addWebAddressUrl, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    removeWebUrlMain(webUrlId: string, profileId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId)
            .set('id', webUrlId);
        return this.http.delete(removeWebUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getAppListMain(userId: string, profileId: string): Observable<SearchAppModel> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId);
        return this.http.get<SearchAppModel>(getAppListUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    searchAppMain(keyWord: string, userId: string, profileId: string): Observable<Apps[]> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId)
            .set('keyword', keyWord);

        return this.http.get<SearchAppModel>(getSearchListUrl, { params }).pipe(map(data => data.apps),
            catchError(this.handleError)) //  handle the error)); 
    }
    editAppMain(body): Observable<any> {

        return this.http.post(addProfileAppUrl, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    deleteAppByProfileAndAppIdMain(appId: string, userId: string, profileId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId)
            .set('aid', appId);
        return this.http.delete(removeSelectedAppUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    checkRoleProfilesCreated(userId: any) {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<any>(checkProfileListUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Return an observable with a user-facing error message.
        return throwError(error);
    }
}