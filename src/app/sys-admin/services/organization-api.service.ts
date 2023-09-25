import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        //'X-Calix-Username': 'admin@calix.com'
    })
};
@Injectable({
    providedIn: 'root'
})
export class OrganizationApiService {


    public baseURL = environment.calixAdminURL;
    public OrgBaseURL = environment.CALIX_ADMIN_ORG_BASE_URL;
    public org_id = environment.faAdminOrgId;
    //API
    private users: string;
    private userDelete: string;
    private userAdd: string;
    private roles: string;
    private roleDelete: string;
    private deactivateUsersList: string;
    aclList: string;
    private ssoconfigAdd: string;
    private ssoconfigUpdate: string;
    private ssoconfigGet: string;
    private ssoconfigDelete: string;
    private aclDelete: string;
    private aclAdd: string;
    private acsList: string;
    private acsDelete: string;
    private orgInfo: string;
    private acsUpdate: string;
    private orgInfoEntitlements: string;
    private getSpeedTest: string;



    constructor(private httpClient: HttpClient,) {
        this.users = this.baseURL + 'users';
        this.userDelete = this.baseURL + `user`;
        this.userAdd = this.baseURL + `user/signup`;
        this.roles = this.baseURL + `roles`;
        this.roleDelete = this.baseURL + 'role';
        this.deactivateUsersList = this.baseURL + 'dpu/list';
        this.aclList = this.baseURL + `org/50/orgacl`;
        this.ssoconfigAdd = this.baseURL + `config`;
        this.ssoconfigUpdate = this.baseURL + `config`;
        this.ssoconfigGet = this.baseURL + `config/org/`;
        this.ssoconfigDelete = this.baseURL + `config/`;
        this.aclDelete = this.baseURL + `org/12622588/orgacl`;
        this.aclAdd = this.baseURL + `org/50/orgacl`;
        this.acsList = this.OrgBaseURL + `orgshare/acs`;
        this.acsUpdate = this.OrgBaseURL + `orgshare/acs`;
        this.acsDelete = this.baseURL + `orgshare/acs/remove/1234`;
        this.orgInfo = this.OrgBaseURL + `organizations/50`;
        this.orgInfoEntitlements = this.OrgBaseURL + `entitlements/50`;


    }

    public UsersCountByOrgId<T>(orgId): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/users/_count`, httpOptions)
    }

    public UsersList<T>(): Observable<T> {
        return this.httpClient.get<T>(this.users, httpOptions)
    }

    public UsersListByOrgId<T>(orgId: number | string, count: number | string): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/users?size=${count}`, httpOptions)
    }

    public UserDelete<T>(id: T): Observable<T> {
        return this.httpClient.delete<T>(`${this.userDelete}/${id}`, httpOptions)
    }
    public UserAdd<T>(params: T): Observable<T> {
        return this.httpClient.put<T>(`${this.userAdd}`, params, httpOptions)
    }

    public RolesList<T>(): Observable<T> {
        return this.httpClient.get<T>(this.roles, httpOptions)
    }

    public RolesListByOrgID<T>(orgId: string): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/roles`, httpOptions)
    }

    public RoleDelete<T>(id: T): Observable<T> {
        return this.httpClient.delete<T>(`${this.roleDelete}/${id}`, httpOptions)
    }
    public DeactivateUsersList<T>(): Observable<T> {
        return this.httpClient.get<T>(this.deactivateUsersList, httpOptions)
    }

    // public AclList<T>(): Observable<T> {
    //     return this.httpClient.get<T>(this.aclList, httpOptions)
    // }

    public AclList(orgId: any): any {
        return this.httpClient.get(`${environment.calixAdminURL}org/${orgId}/orgacl`, httpOptions);
    }

    // public AclAdd<T>(params: T): Observable<T> {
    //     return this.httpClient.post<T>(`${this.aclAdd}`, params, httpOptions)
    // }
    public AclAdd<T>(params: T, orgId: any): Observable<T> {
        // return this.httpClient.post<T>(`${this.aclAdd}`, params, httpOptions)
        return this.httpClient.post<T>(`${environment.calixAdminURL}org/${orgId}/orgacl`, params, httpOptions);
    }

    public AclDelete<T>(orgId: any): Observable<T> {
        // return this.httpClient.post<T>(`${this.aclAdd}`, params, httpOptions)
        return this.httpClient.delete<T>(`${environment.calixAdminURL}org/${orgId}/orgacl`, httpOptions);
    }

    public SSOConfigAdd<T>(params: T): Observable<T> {
        return this.httpClient.put<T>(`${this.ssoconfigAdd}`, params, httpOptions)
    }

    public SSOConfigUpdate<T>(params: T, _id): Observable<T> {
        return this.httpClient.post<T>(`${this.ssoconfigUpdate}/${_id}`, params, httpOptions)
    }

    // public SSOConfigGet<T>(): Observable<T> {
    //     return this.httpClient.get<T>(this.ssoconfigGet, httpOptions)
    // }

    public SSOConfigGet(orgId: any): any {
        return this.httpClient.get(`${environment.calixAdminURL}config/org/${orgId}`, httpOptions);
    }
    public SSOConfigDelete<T>(id: T): Observable<T> {
        return this.httpClient.delete<T>(`${this.ssoconfigDelete}/${id}`, httpOptions)
    }

    // public AcsList<T>(): Observable<T> {
    //     return this.httpClient.get<T>(this.acsList, httpOptions)
    // }
    public ACSList(orgId: any): any {
        return this.httpClient.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}orgshare/acs/${orgId}`, httpOptions);
    }

    public ACSAdd(params): any {
        return this.httpClient.post(`${environment.CALIX_ADMIN_ORG_BASE_URL}orgshare/acs`, params, httpOptions);
    }

    public AcsDelete<T>(): Observable<T> {
        return this.httpClient.get<T>(this.acsDelete, httpOptions)
    }

    public ACSUpdate<T>(params: T, orgId: any): any {
        return this.httpClient.put(`${environment.CALIX_ADMIN_ORG_BASE_URL}orgshare/acs/${orgId}`, params, httpOptions)
    }

    // public orgInformation(orgId: any): any {
    //     // return this.httpClient.get<T>(this.orgInfo, httpOptions)
    //     return this.httpClient.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/${orgId}`, httpOptions);
    // }
    public orgInformation(orgId: any): any {
        // return this.httpClient.get<T>(this.orgInfo, httpOptions)
        return this.httpClient.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/${orgId}`, httpOptions);
    }
    public orgInfoEntitlement(orgId: any): any {
        // return this.httpClient.get<T>(this.orgInfoEntitlements, httpOptions)
        return this.httpClient.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/${orgId}`, httpOptions);
    }

    public OrganzationDetail<T>(orgId): Observable<T> {
        return this.httpClient.get<T>(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/${orgId}`, httpOptions)
    }

    public GetSpeedTestData<T>(orgId: any): any {
        //return this.httpClient.get(`${environment.calixAdminURL}speedtest/organization/${orgId}`, httpOptions);
        return this.httpClient.get(`${environment.SUPPORT_URL}/device/speed-test/config/${orgId}`);
    }
    public UpdateSpeedTestData<T>(orgId: any, params: T): any {
        //return this.httpClient.put(`${environment.calixAdminURL}speedtest/organization/${orgId}`, params, httpOptions);
        return this.httpClient.put(`${environment.SUPPORT_URL}/device/speed-test/config/${orgId}`, params);
    }
    public AddSpeedTestData<T>(params: T): any {
        return this.httpClient.post(`${environment.calixAdminURL}speedtest/organization`, params, httpOptions);
    }
    public DeleteSpeedTestData<T>(orgId: any): any {
        return this.httpClient.delete(`${environment.calixAdminURL}speedtest/organization/${orgId}`, httpOptions);
    }

    callRestApi(endpoint, filters?) {
        return this.httpClient.get<any>(`${endpoint}`, httpOptions)
            .pipe(catchError(this.handleError));
    }

    handleError(error) {
        return throwError(error);
    }

    public DeleteRolesListByUserId<T>(userId): Observable<T> {
        return this.httpClient.delete<T>(`${environment.calixAdminURL}user/${userId}/roles`, httpOptions)
    }

    public GetHostData<T>(url): any {
        return this.httpClient.get(`${url}`);
    }


    public GetACSData<T>(orgId: any): any {
        return this.httpClient.get(`${environment.calixAdminURL}acs/organization/${orgId}`);
    }

    public UpdateACSData<T>(params: T, orgId: any): any {
        return this.httpClient.put(`${environment.calixAdminURL}acs/organization/${orgId}`, params, httpOptions)
    }

    public getOrgInfo(orgId: any): any {
        // return this.httpClient.get<T>(this.orgInfo, httpOptions)
        return this.httpClient.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations/${orgId}`, httpOptions);
    }

    public fetchBillingSummaryInfo(): any {
        return this.httpClient.get(`${environment.API_BASE_URL}billing/subscriber-pipeline/summary`);
    }
}
