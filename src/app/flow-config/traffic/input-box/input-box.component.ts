import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;
  menus: any
  activeRoute: any;
  endpointID: any = '';
  subscriberName: any = '';
  locationName: any = '';
  regionName: any = '';
  endPointName: any = '';
  modelName: any = "";
  IPAddress: any = '';
  mappedBy: any = '';
  lastUpdatedTime: any = "";
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  url = "";
  ORG_ID: any;
  endPointList: any[] = [];
  showEndpointSearch: boolean = true;
  loading: boolean = false;
  subscriberId: any;
  showHyperLink: boolean = false;
  showSubscriber: boolean = false;
  isDev: boolean;
  pageAcceesObs: any;
  hasPageAccess: boolean = false;
  searchData: any[] = [];
  epSearchError = false;
  searchText: any = ''
  subscribers$;
  private searchText$ = new Subject<string>();
  showTextSubs: any

  constructor(
    public router: Router,
    private customTranslateService: CustomTranslateService,
    public webSocketService: WebsocketService,
    private http: HttpClient,
    private sso: SsoAuthService,
  ) {
    if (!window.location.pathname.includes('/realtime')) {
      this.showEndpointSearch = false;
    }
    this.showTextSubs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes('/realtime')) {
          this.showEndpointSearch = false;
        } else {
          this.showEndpointSearch = true;
        }
      }
    })
  }

  ngOnInit(): void {
    this.ORG_ID = this.sso.getOrganizationID(this.router.url);
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
    this.doSearch();
  }

  get showSensitiveInfo(): boolean {
    return sessionStorage.getItem("showSensitiveInfo") == "true";
  }

  doSearch() {
    this.subscribers$ = this.searchText$.pipe(
      debounceTime(500),
      switchMap(textEntered => {
        return this.mappedSearchEndPoint(textEntered);
      }),
      switchMap((textEntered: any) => {
        if (textEntered == 404 || textEntered.length === 0) {
          return this.unmappedSearchEndPoint(this.searchText);
        } else {
          return textEntered;
        }
      }),
    ).subscribe(
      (res: any) => {
        if (res !== 404) {
          if (Array.isArray(res)) {
            this.searchData = res;
            this.getEndpointName(this.searchData);
            this.epSearchError = false;
            this.webSocketService.isUnmapped = true;
          } else {
            this.searchData.push(res);
            this.getEndpointName(this.searchData);
            this.epSearchError = false;
            this.webSocketService.isUnmapped = false;
          }
          this.loading = false;
        }
        else {
          this.epSearchError = true;
          this.loading = false;
        }
      },
      err => {
        this.epSearchError = true;
        this.loading = false;
      }
    );
  }


  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();
    if (textEntered.length < 2) {
      this.epSearchError = false;
      return;
    }
    if (event.keyCode !== 13) {
      this.loading = true;
      this.epSearchError = false;
    }
    this.searchData = [];
    this.searchText$.next(textEntered);
  }

  mappedSearchEndPoint(searchtext: any): Observable<any> {
    this.url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&searchstring=${searchtext}`
    return this.http.get(this.url).pipe(
      catchError((error => of(error.status)))
    )
  }

  unmappedSearchEndPoint(searchtext: any): Observable<any> {
    this.searchData = [];
    let url = `${environment.FA_API_BASE_URL}correlator/flowendpoint/unmapped?org-id=${this.ORG_ID}&ip=${searchtext}`;
    return this.http.get(url).pipe(
      catchError((error => of(error.status)))
    )
  }

  performIconSearch() {
    if (this.searchData.length === 0) {
      this.performSearch();
    }
    else {
      this.loading = true;
      let hasEndpoint = false;
      this.searchData.forEach(element => {
        if (this.searchText === element.ipAddress || this.searchText === element.name) {
          this.loading = false;
          hasEndpoint = true;
          this.gotoEndpoint(element);
        }
      })
      if (!hasEndpoint) {
        this.loading = false;
        this.gotoEndpoint(this.searchData[0]);
      }
    }
  }


  performSearch() {
    const textEntered: string = this.searchText;
    if (textEntered.length < 2) {
      return;
    }
    this.loading = true;
    this.searchText$.next(textEntered);
  }

  gotoEndpoint(data: any) {
    let url = window.location.pathname.indexOf('/organization-admin/') > -1 ? '/organization-admin/flowAnalyze/traffic/endpoint/realtime' : '/systemAdministration/flowAnalyze/traffic/endpoint/realtime'
    if (!this.webSocketService.isUnmapped) {
      if (data.id && data.id !== null) {
        this.webSocketService.setEndpointValue(data.id)
        if (!this.epSearchError && this.searchText && !this.loading) {
          window.sessionStorage.setItem('endpointName', data.endPointName ?? data.name ?? data.ipAddress)
          this.router.navigate([url], { queryParams: { id: data.id } });
        }
      }
    } else {
      this.webSocketService.setEndpointValue(data.ipAddress)
      if (!this.epSearchError && this.searchText && !this.loading) {
        window.sessionStorage.setItem('endpointName', data.endPointName ?? data.name ?? data.ipAddress)
        this.router.navigate([url], { queryParams: { id: data.ipAddress } });
      }
    }

  }

  ngOnDestroy() {
    if (this.showTextSubs) {
      this.showTextSubs.unsubscribe();
    }
  }

  getEndpointName(searchData: any) {
    if (searchData && searchData.length > 0) {
      searchData.map((element) => {
        if (!element.name) {
          element.name = element.ipAddress
        }
        if (!this.showSensitiveInfo) {
          element.name = maskString(element.name);
        }
        if (element.name !== element.ipAddress && !(element.name.includes(element.ipAddress))) {
          element['endPointName'] = element.name + '_' + element.ipAddress;
        }
        if (element.name !== element.ipAddress && element.name.includes(element.ipAddress)) {
          element['endPointName'] = element.name
        }
        if (element.name === element.ipAddress) {
          element['endPointName'] = element.name;
        }
      })
    }
  }

}
