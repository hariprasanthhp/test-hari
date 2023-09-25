import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from '../shared/services/explore-data-common.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingExploreDataDeviceApiService {
  public baseURL = environment.cmcBaseURL;
  language: any
  languageSubject: any

  // Normal View
  private commandIQStatus: string;

  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
    private marketingExploreCommonService: MarketingExploreCommonService,
    //private downloadFileNameService: DownloadFileNameService,
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.commandIQStatus = this.baseURL + 'foundation/dashboard/ciq';
  }
  public CommandIQStatus() {
    let orgID = this.ssoAuthService.getOrgId();
    return this.httpClient.get(`${environment.FOUNDATION_BASE_URL}dashboard/ciq?days=30`)
  }
  getSubscriberSystemsModel() {
    let orgID = this.ssoAuthService.getOrgId();
    return this.httpClient.get(`${environment.FOUNDATION_BASE_URL}dashboard/system-model?productType=all&limit=30`);
  }
}
