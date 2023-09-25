import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FileDataResponse, FileListItem } from '../subscriber-prospect-upload/subscriber-propect.model';

@Injectable({
    providedIn: 'root'
})
export class ProspectSubscriberService {
    public baseURL = environment.API_BASE;

    constructor(
        private httpClient: HttpClient,
        private ssoAuthService: SsoAuthService,
        private router: Router) {
        const url = this.router.url;
        const MODULE = this.ssoAuthService.getRedirectModule(url);
    }

    private getHttpHeaders() {
        const headers = new HttpHeaders({
            'X-Calix-OrgId': this.ssoAuthService.getOrganizationID(this.router.url)
        });
        return headers;
    }

    saveProspectFile(file: File, listName: string): Observable<boolean> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("listName", listName);
        return this.httpClient.post<boolean>(`${this.baseURL}/v1/cmc-campaigns/match/list/prospects`, formData, { headers: this.getHttpHeaders() });
    }

    saveSubscriberFile(file: File, listName: string): Observable<boolean> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("listName", listName);
        return this.httpClient.post<boolean>(`${this.baseURL}/v1/cmc-campaigns/match/list/subscribers`, formData, { headers: this.getHttpHeaders() });
    }

    getFileData(id: string, listType: string): Observable<FileDataResponse> {
        return this.httpClient.get<FileDataResponse>(`${this.baseURL}/v1/cmc-campaigns/match/list/${listType}/${id}`, { headers: this.getHttpHeaders() });
    }

    getFileList(): Observable<FileListItem[]> {
        return this.httpClient.get<FileListItem[]>(`${this.baseURL}/v1/cmc-campaigns/match/list`, { headers: this.getHttpHeaders() });
    }

    deleteProspect(id: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${this.baseURL}/v1/cmc-campaigns/match/list/prospects/${id}`, { headers: this.getHttpHeaders() });
    }

    deleteSubscriber(id: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${this.baseURL}/v1/cmc-campaigns/match/list/subscribers/${id}`, { headers: this.getHttpHeaders() });
    }
}
