import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BedTimeAllDay } from "../models/bed-time-all-day.model";
import { BedtimeModel } from "../models/bed-time.model";
import { CategoriesModel } from "../models/categories.model";
import { ContentFilterModel } from "../models/content-filter.model";
import { EditAppModel } from "../models/edit-app.model";
import { EditBedTimeModel } from "../models/edit-bedtime-profile.model";
import { EditProfileNameModel } from "../models/edit-profile-name.model";
import { ExperianceIQUserModel } from "../models/experiance-iq-user.model";
import { FeatureList } from "../models/feature-list.model";
import { profileWebUrl } from "../models/get-profile-web-url.model";
import { NotificationModel } from "../models/notifications.model";
import { ProfileAppsModel } from "../models/profile-apps.model";
import { ProfileBlockStatusModel } from "../models/profile-block-status.model";
import { profileDeviceModel } from "../models/profile-device.model";
import { ProfileNewDeviceModel } from "../models/profile-new-device.model";
import { SafeSearchModel } from "../models/safe-search.model";
import { Apps, SearchAppModel } from "../models/search-app.model";
import { StationListAllModel } from "../models/ststion-list-all.model";
import { UsageEnum, UsageModel } from "../models/usage-model";
import { userProfileSummaryModel } from "../models/user-profile-summary.model";
import { WebAddressProfile } from "../models/web-address-profile.model";
import { ProfileAdd } from '../models/profileadd.model'
import { environment } from "../../../../../environments/environment";
import {
    addDeviceProfile, addNewProfilewithDevice, addWebAddressProfile, allProfilesBlockStatusUpdate,
    allUsersSummary, applicationDisabled, applicationEnable, applicationInstall, applicationStatus, applicationUnInstall, avatarUpload, deleteAllBedTimeProfile, deleteBedTimeProfileByDayId, deleteDeviceProfile, deleteProfile, deleteSpecificBEdTIme,
    editCategoryProfile, editProfileApp, editProfileAppCategory, editProfileBedTime, featureList,
    getAllCategoryProfile, getNotification, getProfileAppsList, getProfileBedTime, getSafeSearchStatus, getSearchList,
    getSelectedAppList, getUserId, getYoutubeRestrictionStatus, listProfileWebUrl,
    profileBlockStatusUpdate, profilerouterUsageList, profileStaionList, removeProfileWebUrl,
    removeSelectedApp, setBedTieDayEnable, setBedTimeAllDay, updateContentFilterMain,
    setSafeSearchStatus, setYoutubeRestrictionStatus, stationListAll, updateAllBedTimeProfile,
    updateContentFilter, updateProfileName, updateWebAddressProfile, usersProfileSummary, getAllCategory, getAppList, getWebList,
    editCategoryMain, editProfileAppMain, getSearchListMain, addWebAddressMain, removeProfileWebUrlMain, removeSelectedAppMain,
    setWebAddressMain, updateWebAddressMain, setSafeSearchStatusMain, getSafeSearchStatusMain, setyoutubeStatusMain, getyoutubeStatusMain,
    getDns, setDns, getDnsMain, setDnsMain, getIcloud, setIcloud, getIcloudMain, setIcloudMain, getParentControlCategories
} from "./endPoints";
import { FormBuilder } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})
export class ExperianceIQService {
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {

    }

    getUserId(serialNumber: string): Observable<ExperianceIQUserModel> {
        const params = new HttpParams()
            .set('sn', serialNumber);
        return this.http.get<ExperianceIQUserModel>(getUserId, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getFeatureList(userId: string): Observable<FeatureList> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<FeatureList>(featureList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getqoslist_V2(userId: string): Observable<any> {
        /* var authToken = 'Bearer '+ token;
         
     var headers_object = new HttpHeaders({
         'Content-Type': 'application/json',
          'Authorization': authToken
       });
       const httpOptions = {
         headers: headers_object
       };*/
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos/summary`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    getprofileAdd_V1(token: string, body): Observable<any> {

        return this.http.post(`${environment.SUPPORT_URL}/qos/profile/add`, body).pipe(
            catchError(this.handleError)
        );
    }
    ActivateV1(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.post(`${environment.SUPPORT_URL}/qos/activate`, { 'userId': userId }).pipe(
            catchError(this.handleError)
        );
    }
    DeactivateV1(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.delete(`${environment.SUPPORT_URL}/qos/deactivate`, { params }).pipe(
            catchError(this.handleError)
        );
    }
    editqosDeviceV1(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos/device/edit`, { params }).pipe(
            catchError(this.handleError)
        );
    }
    getQosV1(userId: string): Observable<any> {
        /*var authToken = 'Bearer '+ token;
        
        var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': authToken
      });
      const httpOptions = {
        headers: headers_object
      };*/
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos`, { params }).pipe(
            catchError(this.handleError)
        );
    }
    editqosProfileListV1(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos/profile/list`, { params }).pipe(
            catchError(this.handleError)
        )

    }
    updateProfileV1(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos/profile/list`, { params }).pipe(
            catchError(this.handleError)
        )
    }

    deviceUpdateV1(body): Observable<any> {
        return this.http.put(`${environment.SUPPORT_URL}/qos/device/update`, body).pipe(
            catchError(this.handleError)
        );
    }

    deleteDeviceV1(userId: string, deviceId: string): Observable<any> {
        const params = new HttpParams()
            .set('macAddr', deviceId)
            .set('userId', userId);
        return this.http.delete(`${environment.SUPPORT_URL}/qos/device/remove`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    deleteProfileV1(userId: string, deviceId: string): Observable<any> {
        const params = new HttpParams()
            .set('id', deviceId)
            .set('userId', userId);
        return this.http.delete(`${environment.SUPPORT_URL}/qos/profile/remove`, { params }).pipe(
            catchError(this.handleError)
        )
    }
    getProfileV1(userId: string, profileId: string): Observable<any> {
        const params = new HttpParams()
            .set('id', profileId)
            .set('userId', userId);
        return this.http.get(`${environment.SUPPORT_URL}/qos/profile`, { params }).pipe(
            catchError(this.handleError)
        )
    }
    UpdateProfileV1(token: string, body): Observable<any> {

        return this.http.put(`${environment.SUPPORT_URL}/qos/profile/update`, body).pipe(
            catchError(this.handleError)
        );

    }
    updateDefaultProfileV1(userId: string, body): Observable<any> {

        return this.http.put(`${environment.SUPPORT_URL}/qos/update`, body).pipe(
            catchError(this.handleError)
        );
    }

    //-joy-09-03-21-network-priority
    addProfileNewDevice(body: ProfileNewDeviceModel): Observable<ProfileNewDeviceModel> {
        return this.http.put<ProfileNewDeviceModel>(addNewProfilewithDevice, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    deleteProfile(profileId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.delete(deleteProfile, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    stationListAll(userId: string): Observable<StationListAllModel> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<StationListAllModel>(stationListAll, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    profileStationList(profileId: string, userId: string): Observable<StationListAllModel> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get<StationListAllModel>(profileStaionList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    editProfileName(body: EditProfileNameModel): Observable<any> {
        return this.http.post(updateProfileName, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    uploadAvatar(file: File, profileId: string): Observable<any> {
        let formData = new FormData();
        formData.append('upfile', file);
        formData.append('profileId', profileId)
        return this.http.post(avatarUpload, formData).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getAllUsersSummary(userId: string): Observable<userProfileSummaryModel> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(allUsersSummary, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getUserProfileSummary(profileId: string, userId: string, type?: string): Observable<UsageModel> {
        if (type) {
            const params = new HttpParams()
                .set('profileId', profileId)
                .set('userId', userId)
                .set('type', type);
            return this.http.get<UsageModel>(usersProfileSummary, { params }).pipe(
                catchError(this.handleError) //  handle the error
            );
        } else {
            const params = new HttpParams()
                .set('profileId', profileId)
                .set('userId', userId);
            return this.http.get<UsageModel>(usersProfileSummary, { params }).pipe(
                catchError(this.handleError) //  handle the error
            );
        }
    }
    updateProfileBlockStatus(body: ProfileBlockStatusModel): Observable<any> {
        return this.http.post(profileBlockStatusUpdate, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    updateAllProfileBlockStatus(body: ProfileBlockStatusModel): Observable<any> {
        return this.http.post(allProfilesBlockStatusUpdate, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    addDeviceProfile(body: profileDeviceModel): Observable<any> {
        return this.http.post(addDeviceProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    removeDeviceProfile(body: profileDeviceModel): Observable<any> {
        return this.http.post(deleteDeviceProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    addWebAddressProfile(body: WebAddressProfile): Observable<WebAddressProfile> {
        return this.http.put<WebAddressProfile>(addWebAddressProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    addWebAddressMain(body): Observable<any> {
        return this.http.put(addWebAddressMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    setWebAddressMain(body): Observable<any> {
        return this.http.post(setWebAddressMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateWebAddressProfile(body: WebAddressProfile): Observable<WebAddressProfile> {
        return this.http.post<WebAddressProfile>(updateWebAddressProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateWebAddressMain(body): Observable<any> {
        return this.http.post(updateWebAddressMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getProfileWebUrl(profileId: string, userId: string): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get<profileWebUrl>(listProfileWebUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getProfileWebUrlMain(userId: string): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<profileWebUrl>(getWebList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    removeWebUrl(profileId: string, webUrlId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId)
            .set('id', webUrlId);
        return this.http.delete(removeProfileWebUrl, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    removeWebUrlMain(webUrlId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('id', webUrlId);
        return this.http.delete(removeProfileWebUrlMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getProfileUsage(userId: string, profileId: string, type?: UsageEnum): Observable<any> {
        if (type) {
            const params = new HttpParams()
                .set('type', type)
                .set('profileId', profileId)
                .set('userId', userId)
            return this.http.get<any>(profilerouterUsageList, { params }).pipe(
                catchError(this.handleError)) //  handle the error
        } else {
            const params = new HttpParams()
                .set('type', UsageEnum.DAY)
                .set('profileId', profileId)
                .set('userId', userId)
            return this.http.get<any>(profilerouterUsageList, { params }).pipe(
                catchError(this.handleError)) //  handle the error
        }
    }

    getBedTimeByProfileId(profileId: string, userId: string): Observable<BedtimeModel> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId)
        return this.http.get<BedtimeModel>(getProfileBedTime, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    editBedTimeProfile(body: EditBedTimeModel): Observable<any> {
        return this.http.post(editProfileBedTime, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    updateAllProfileBedTime(body: EditBedTimeModel): Observable<any> {
        return this.http.post(updateAllBedTimeProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    setEnableBedtimeAllDay(body: BedTimeAllDay): Observable<any> {
        return this.http.post(setBedTimeAllDay, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    updateBedTimeByDay(body: BedTimeAllDay): Observable<any> {
        return this.http.post(setBedTieDayEnable, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    deleteBedTImeByProfileId(userId: string, profileId: string, dayId: number, indexOfDay: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId)
            .set('id', String(dayId))
            .set('idx', String(indexOfDay))
        return this.http.delete(deleteSpecificBEdTIme, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getAllAppsByProfileId(profileId: string): Observable<ProfileAppsModel> {
        const params = new HttpParams()
            .set('profileId', profileId)
        return this.http.get<ProfileAppsModel>(getProfileAppsList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    editAppByProfileId(body: EditAppModel): Observable<any> {
        return this.http.post(editProfileApp, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    editAppMain(body): Observable<any> {
        return this.http.post(editProfileAppMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    editAppCategory(body: EditAppModel): Observable<any> {
        return this.http.put(editProfileAppCategory, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    getAllCategoryByProfileId(profileId: string, userId: string): Observable<CategoriesModel> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get<CategoriesModel>(getAllCategoryProfile, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    editCategoyByProfileId(body: EditAppModel): Observable<any> {
        return this.http.post(editCategoryProfile, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    editCategoyMain(body: EditAppModel): Observable<any> {
        return this.http.post(editCategoryMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    searchApp(profileId: string, keyWord: string, userId: string): Observable<Apps[]> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('keyword', keyWord)
            .set('userId', userId);
        return this.http.get<SearchAppModel>(getSearchList, { params }).pipe(map(data => data.apps),
            catchError(this.handleError)) //  handle the error)); 
    }

    searchAppMain(keyWord: string, userId: string): Observable<Apps[]> {
        const params = new HttpParams()
            .set('keyword', keyWord)
            .set('userId', userId);
        return this.http.get<SearchAppModel>(getSearchListMain, { params }).pipe(map(data => data.apps),
            catchError(this.handleError)) //  handle the error)); 
    }

    getAppListByProfileId(profileId: string, userId: string): Observable<SearchAppModel> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get<SearchAppModel>(getSelectedAppList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getAppListMain(userId: string): Observable<SearchAppModel> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<SearchAppModel>(getAppList, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    deleteAppByProfileAndAppId(profileId: string, appId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('aid', appId)
            .set('userId', userId);
        return this.http.delete(removeSelectedApp, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    deleteAppByProfileAndAppIdMain(appId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('aid', appId)
            .set('userId', userId);
        return this.http.delete(removeSelectedAppMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getSafeSearchStatus(profileId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get(getSafeSearchStatus, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getSafeSearchStatusMain(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(getSafeSearchStatusMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateSafeSearchStatus(body: SafeSearchModel): Observable<any> {

        return this.http.post(setSafeSearchStatus, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateSafeSearchStatusMain(body): Observable<any> {
        return this.http.post(setSafeSearchStatusMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getYotubeRestrictionStatus(profileId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.get(getYoutubeRestrictionStatus, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getYotubeRestrictionStatusMain(userId: string): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(getyoutubeStatusMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateYotubeRestrictionStatus(body: SafeSearchModel): Observable<any> {
        return this.http.post(setYoutubeRestrictionStatus, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateYotubeRestrictionStatusMain(body): Observable<any> {
        return this.http.post(setyoutubeStatusMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getApplicationStatus(sn: string, appName: string): Observable<any> {

        const params = new HttpParams()
            .set('fsn', sn)
            .set('appName', appName);
        return this.http.get(applicationStatus, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    installApplication(body: any): Observable<any> {
        return this.http.post(applicationInstall, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    unInstallApplication(body: any): Observable<any> {
        return this.http.post(applicationUnInstall, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    applicationEnable(body: any): Observable<any> {
        return this.http.post(applicationEnable, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    applicationDisbale(body: any): Observable<any> {
        return this.http.post(applicationDisabled, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    updateContentFilter(body: ContentFilterModel): Observable<any> {
        return this.http.post(updateContentFilter, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    updateContentFilterMain(body): Observable<any> {
        return this.http.post(updateContentFilterMain, body).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getNotification(userId: string, iqType, type): Observable<NotificationModel> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('iqType', iqType)
            .set('type', type);
        return this.http.get<NotificationModel>(getNotification, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    deleteProfileBedTimeByDayId(profileId: string, dayId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('id', dayId)
            .set('userId', userId);
        return this.http.delete(deleteBedTimeProfileByDayId, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    deleteALLBedTimeProfile(profileId: string, userId: string): Observable<any> {
        const params = new HttpParams()
            .set('profileId', profileId)
            .set('userId', userId);
        return this.http.delete(deleteAllBedTimeProfile, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }
    EIQResetPriorites(deviceId: string): Observable<any> {

        let result = { 'macAddr': deviceId }
        return this.http.post(`${environment.SUPPORT_URL}/extended/qos/clear`, result).pipe(
            catchError(this.handleError)
        );
    }
    EIQDeletePriorites(userId) {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.delete(`${environment.SUPPORT_URL}/extended/qos/damp/alert/remove?userId=${userId}`).pipe(
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        // Return an observable with a user-facing error message.
        return throwError(error);
    }

    getAllCategory(userId: string): Observable<CategoriesModel> {
        const params = new HttpParams().set('userId', userId);
        return this.http.get<CategoriesModel>(getAllCategory, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getDns(userId: string, profileId): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId);
        return this.http.get(getDns, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    setDns(input): Observable<profileWebUrl> {
        return this.http.post(setDns, input).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getDnsMain(userId: string): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(getDnsMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    setDnsMain(input): Observable<profileWebUrl> {
        return this.http.post(setDnsMain, input).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getICloud(userId: string, profileId): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('profileId', profileId);
        return this.http.get(getIcloud, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    setICloud(input): Observable<profileWebUrl> {
        return this.http.post(setIcloud, input).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getICloudMain(userId: string): Observable<profileWebUrl> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get(getIcloudMain, { params }).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    setICloudMain(input): Observable<profileWebUrl> {
        return this.http.post(setIcloudMain, input).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getParentControlCategories(): Observable<CategoriesModel> {
        return this.http.get<CategoriesModel>(getParentControlCategories).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    getExperienceIqFormGroup() {
        return this.formBuilder.group({
            categoryGroup: [null],
            categoryList: this.formBuilder.array([]),
            youtube: this.formBuilder.group({ enable: false }),
            safesearch: this.formBuilder.group({ enable: false }),
            dnsoverhttps: this.formBuilder.group({ enable: false }),
            icloudrelay: this.formBuilder.group({ enable: false }),
            app: [null],
            // appList: this.formBuilder.array([]),
            website: [null],
            webList: this.formBuilder.array([]),
        });
    }

    getStaffProfiles(userId) {
        return this.http.get(`${environment.SUPPORT_URL}/smbiq/staffprofile/all?userId=${userId}&includeDevices=true`).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

    deleteStaffProfile(userId, staffProfileId) {
        return this.http.delete(`${environment.SUPPORT_URL}/smbiq/staffprofile?userId=${userId}&staffProfileId=${staffProfileId}`).pipe(
            catchError(this.handleError) //  handle the error
        );
    }

}