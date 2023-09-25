import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../shared/services/websocket.service';
import { maskString } from '../shared/functions/cco-mask';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {
  language: any;
  languageSubject;
  dtOptions: DataTables.Settings = {};
  endpointID: any = '';
  subscriberName: any = '';
  locationName: any = '';
  regionName: any = '';
  endPointName: any = '';
  endPointNameUnMask = '';
  modelName: any = "";
  IPAddress: any = '';
  mappedBy: any = '';
  lastUpdatedTime: any = "";
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
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
  menus = {
    network: false,
    location: false,
    applications: false
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = false;
  showXIcon: boolean = true;
  ontInfo: any;
  deviceInfo: any;
  ontInfoSubs: any;
  // urlAppId: boolean;

  constructor(private translateService: TranslateService, public route: Router,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    public webSocketService: WebsocketService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {
    this.ORG_ID = this.sso.getOrganizationID(this.router.url);
    let base = `${environment.API_BASE}`;
    // let host = window.location.host;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else this.isDev = false

    this.showXIcon = this.sso.getEPRredirectFrom() ? true : false;
  }

  get showSensitiveInfo(): boolean {
    return sessionStorage.getItem("showSensitiveInfo") == "true";
  }

  ngOnInit(): void {
    // this.watchSearchError();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      processing: false,
      searching: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [-1], orderable: false }]
    }
    this.webSocketService.endPointName = "";
    this.doSearch();
    this.showModalInfo();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });

    if (this.router.url.indexOf('/reports') > -1) {
      this.showEndpointSearch = false;
    }

    if (this.router.url.indexOf('/cco/traffic/endpoints/realtime') != -1 || this.router.url.indexOf('/cco/traffic/endpoints/reports') != -1) {
      let filterData = {};
      if (this.webSocketService.getCurrentMonitorInfo('EP')) {
        filterData = this.webSocketService.getCurrentMonitorInfo('EP');

      }

      this.endpointID = this.ActivatedRoute.snapshot.queryParamMap.get('id') || (filterData && filterData['monitorId'] ? filterData['monitorId'] : 0) || 0;
      this.getEndPointsDetails(this.endpointID);
      // this.getSubscriberInfo(this.endpointID);
    }

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network') !== -1) {
            this.menus['network'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location') !== -1) {
            this.menus['location'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications') !== -1) {
            this.menus['applications'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        network: true,
        location: true,
        applications: true
      }

    }

    // this.ActivatedRoute.queryParams.subscribe((params: any) => {
    //   if (params['urlAppId']) {
    //     this.urlAppId = true;
    //   }
    // })

  }

  ngOnDestroy() {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.subscribers$) {
      this.subscribers$.unsubscribe();
    }
    if (this.modalInfoSubs) {
      this.modalInfoSubs.unsubscribe();
    }
    if (this.mappedSubs) {
      this.mappedSubs.unsubscribe();
    }
    if (this.unmappedSubs) {
      this.unmappedSubs.unsubscribe();
    }
    if (this.aggregateSubs) {
      this.aggregateSubs.unsubscribe();
    }
    if (this.subscriberSubs) {
      this.subscriberSubs.unsubscribe();
    }
    if (this.subscriptionInfoSubs) {
      this.subscriptionInfoSubs.unsubscribe();
    }
    if (this.ontInfoSubs) {
      this.ontInfoSubs.unsubscribe();
    }
    this.webSocketService.isUnmapped = false;
  }

  searchText: string;
  subscribers$;
  private searchText$ = new Subject<string>();

  search(subscribersName: string) {
    this.searchData = [];
    this.searchText$.next(subscribersName);
  }

  searchData: any[] = [];
  doSearch() {
    this.subscribers$ = this.searchText$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
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
            if (sessionStorage.getItem("showSensitiveInfo") != "true") {
              res.forEach(x => {
                x.endPointName = maskString(x.endPointName);
                x.name = maskString(x.name);
              });
            }
            this.searchData = res;
            this.getEndpointName(this.searchData);
            this.epSearchError = false;
            this.webSocketService.isUnmapped = true;
          } else {
            if (sessionStorage.getItem("showSensitiveInfo") != "true") {
              res.endPointName = maskString(res.endPointName);
              res.name = maskString(res.name);
            }
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
    this.searchData = [];
    // let url = 'https://stage.api.calix.ai/v1/cco/ep/search/flowendpoint'
    // this.url = `${url}?orgId=${this.ORG_ID}&filter=${searchtext}&pageNum=1&pageSize=5000&includeNullIP=true`
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

  epSearchError = false;
  watchSearchError() {
    this.webSocketService.endPointSearchError$.subscribe((error: any) => {
      if (error) {
        this.epSearchError = true;
      } else {
        this.epSearchError = false;
      }
    })
  }

  gotoPreviousScreen() {
    if (this.sso.getEPRredirectFrom()) {
      let url = this.sso.getEPRredirectFrom();
      let redirectionPath: any = this.sso.getEndpointRedirectTo();
      if (redirectionPath.length > 0) {
        let len = redirectionPath.length - 1;
        url = redirectionPath[len];
        let arr = url.split('?');
        let id = arr[1].split('=')[1];
        redirectionPath.splice(len, 1);
        this.sso.setEndpointRedirectTo(redirectionPath);
        this.router.navigate([arr[0]], { queryParams: { id: id } });
        return;
      }
      this.sso.setEPRredirectFrom('')
      this.router.navigate([url]);

    } else {
      history.back();
    }
  }

  modalInfoSubs: any;
  showModalInfo() {
    this.modalInfoSubs = this.webSocketService.showModalInfo$.subscribe((res: any) => {
      // console.log("this.router.url", this.router.url);
      if (this.router.url.includes("/cco/traffic/")) {
        this.modalTitle = this.language["Internet Disconnected"];
        this.modalInfo = this.language["Please checking the network cables, modem, and router"];
        this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
      }
    })
  }


  close(): void {
    this.modalRef.close();
    window.location.reload();
  }

  maskSensitiveInfo(): void {
    if (sessionStorage.getItem('showSensitiveInfo') != 'true') {
      this.endPointsInfo.subscriberName = maskString(this.endPointsInfo.subscriberName);
      this.endPointsInfo.subscriberPhone = maskString(this.endPointsInfo.subscriberPhone);
      this.endPointsInfo.cmSubscriberInfo = maskString(this.endPointsInfo.cmSubscriberInfo);
      this.endPointsInfo.email = maskString(this.endPointsInfo.email);
      this.endPointsInfo.cmEmail = maskString(this.endPointsInfo.cmEmail);
      this.endPointName = maskString(this.endPointName);
    }
  }

  isIpAddress(input): boolean {
    const isIPRegex = new RegExp(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/gsi);
    return isIPRegex.test(input);
  }

  endPointsInfo: any = {};
  mappedSubs: any;
  getEndPointsDetails(id: any) {
    if (!this.webSocketService.isUnmapped && !this.isIpAddress(id)) {
      this.url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&flowId=${id}`
      this.mappedSubs = this.http.get(this.url).subscribe((data: any) => {
        this.isAggregatedGroupAvail(data);
        this.getEndpointName([data]);
        this.endPointsInfo = data ? data : {};
        this.endPointName = data.endPointName ?? data.name ?? window.sessionStorage.getItem('endpointName');
        this.endPointNameUnMask = this.endPointName;
        this.maskSensitiveInfo();
        this.IPAddress = data.ipAddress ? data.ipAddress : "";
        this.mappedBy = data.mappedBy ? data.mappedBy : "";
        this.lastUpdatedTime = data.updateTime ? this.convertToDateTime(data.updateTime) : (data.createTime ? this.convertToDateTime(data.createTime) : "");
        if (data.subscriberId && !data.subscriberId.includes("0000")) {
          this.subscriberId = data.subscriberId ? data.subscriberId : "";
          this.showHyperLink = true;
          this.webSocketService.endPointName = data.name ? data.name : (data.ipAddress ? data.ipAddress : "");
          this.sso.setTrafficReportChartSubscriberInfo(sessionStorage.getItem('showSensitiveInfo') != 'true' ? maskString(data.name) : data.name);
          this.getSubscriberDetails();
        } else {
          this.sso.setTrafficReportChartSubscriberInfo("");
        }
        if (data.serialNumber && data.cmSerialNumber) {
          this.getONTData(data.serialNumber);
        }
        // else if (data.subscriberId == null || data.subscriberId.includes("0000")) {
        //   this.getSubscriberId(this.endPointName).then((res) => {
        //     this.subscriberId = res;
        //     this.getSubscriberDetails();
        //   })
        // }
      }, error => {
        this.getUnmappedDetails(id);
        this.sso.setTrafficReportChartSubscriberInfo("");
      });
    } else {
      this.getUnmappedDetails(id);
      this.sso.setTrafficReportChartSubscriberInfo(window.sessionStorage.getItem('endpointName'));
    }
  }


  // getSubscriberId(id): Promise<string> {
  //   let name = encodeURIComponent(id)
  //   return this.http.get(environment.API_BASE_URL +
  //     'cmc/search/prioritySearch/id?orgId=' + this.ORG_ID + '&filter="' + name, { responseType: 'text' })
  //     .toPromise()
  //     .then((res) => {
  //       return res;
  //     });
  // }

  isAggregate: boolean = false;
  aggregateGroupList: any = [];
  aggregateSubs: any;
  getEndPointsByAggGroupDetails(id: any) {
    if (!this.webSocketService.isUnmapped) {
      this.url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&agggroup=${id}`
      this.aggregateSubs = this.http.get(this.url).subscribe((data: any) => {
        if (data && data.length > 0) {
          this.isAggregate = true;
          this.webSocketService.isAggregateMember$.next({ id: data[0].aggGroup })
          sessionStorage.setItem('aggregate_Endpoint_Id', JSON.stringify(data[0].aggGroup))
          this.aggregateGroupList = data;
          if (sessionStorage.getItem('showSensitiveInfo') != 'true') {
            this.aggregateGroupList.forEach(ag => {
              ag.name = maskString(ag.name);
              ag.subscriberName = maskString(ag.subscriberName);
              ag.subscriberPhone = maskString(ag.subscriberPhone);
              ag.cmSubscriberInfo = maskString(ag.cmSubscriberInfo);
              ag.email = maskString(ag.email);
              ag.cmEmail = maskString(ag.cmEmail);
            }
            );
          }
          let hasEndpointMatch = false;
          if (data && data.length > 1) {
            data.forEach((element) => {
              if (this.endPointName === element.name) {
                hasEndpointMatch = true;
                this.IPAddress = this.IPAddress ? this.IPAddress : element.ipAddress;
                this.endPointsInfo = element;
                this.lastUpdatedTime = element.updateTime ? this.convertToDateTime(element.updateTime) : (element.createTime ? this.convertToDateTime(element.createTime) : "");
              }
            })
          }
          if (!hasEndpointMatch) {
            this.IPAddress = this.IPAddress ? this.IPAddress : data[0].ipAddress;
            this.endPointsInfo = data[0];
            this.lastUpdatedTime = data[0].updateTime ? this.convertToDateTime(data[0].updateTime) : (data[0].createTime ? this.convertToDateTime(data[0].createTime) : "");
          }
        } else {
          if (!this.endPointName) {
            this.endPointName = window.sessionStorage.getItem('endpointName')
          }
        }
      }, error => {
      });
    }
  }

  isAggregatedGroupAvail(data: any) {
    if (data && data.aggGroup) {
      if (this.validateUUID(data.aggGroup)) {
        this.getEndPointsByAggGroupDetails(data.aggGroup);
        if (data.serialNumber && data.cmSerialNumber) {
          this.getONTData(data.serialNumber);
        }
      }
    }
  }

  validateUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid) && uuid != '00000000-0000-0000-0000-000000000000';
  }

  isUnsolicitedEndpoint: boolean = false;
  unmappedSubs: any;
  getUnmappedDetails(id: any) {
    this.unmappedSubs = this.unmappedSearchEndPoint(id).subscribe((data: any) => {
      if (data !== 404 && Array.isArray(data)) {
        data.forEach(element => {
          this.webSocketService.isUnmapped = true;
          this.endPointName = element.name ? element.name : element.ipAddress;
          this.endPointNameUnMask = this.endPointName;
          this.IPAddress = element.ipAddress ? element.ipAddress : "";
          this.mappedBy = element.mappedBy ? element.mappedBy : "";
          this.lastUpdatedTime = element.updateTime ? this.convertToDateTime(element.updateTime) : (element.createTime ? this.convertToDateTime(element.createTime) : "");
        })
      } else {
        this.webSocketService.isUnmapped = false;
        if (this.validateUUID(id)) {
          this.getEndPointsByAggGroupDetails(id);
        } else {
          this.webSocketService.isUnmapped = true;
          this.isUnsolicitedEndpoint = true;
          this.IPAddress = id;
        }
      }
    }, err => {
      this.webSocketService.isUnmapped = false;
      if (this.validateUUID(id)) {
        this.getEndPointsByAggGroupDetails(id);
      } else {
        this.webSocketService.isUnmapped = true;
        this.isUnsolicitedEndpoint = true;
        this.IPAddress = id;
      }
    })
  }


  convertToDateTime(dt: any) {
    let timeZone = new Date(dt).toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');
    return moment(new Date(dt)).format("YYYY-MM-DD HH:mm:ss") + ' (' + timeZone + ')';
  }

  showEndPoints(id: any) {
    this.webSocketService.setEndpointValue(id);
    this.performSearch();
  }


  goSubscribers(value: any) {
    this.showSubscriber = value;
    // if (value) {
    //   let Url = `${environment.FOUNDATION_SERVICES_URL}subscribers/${this.subscriberId}?includeDeviceData=false&includeDecommissionedDevices=false`
    //   this.http.get(Url).subscribe((res: any) => {
    //     this.subscriberName = res.name ? res.name : "";
    //     this.locationName = res.location ? res.location : "";
    //     this.regionName = res.region ? res.region : "";
    //   })
    // }
  }

  subscriberInfo: any;
  subscriberSubs: any;
  getSubscriberDetails() {
    let Url = `${environment.FOUNDATION_SERVICES_URL}subscribers/${this.subscriberId}?includeDeviceData=false&includeDecommissionedDevices=false`
    this.subscriberSubs = this.http.get(Url).subscribe((data: any) => {
      this.subscriberInfo = data;
      this.subscriberName = this.subscriberInfo.name;
      if (sessionStorage.getItem('showSensitiveInfo') != 'true') {
        this.subscriberName = maskString(this.subscriberInfo.name);
        this.subscriberInfo.email = maskString(this.subscriberInfo.email);
        this.subscriberInfo.phone = maskString(this.subscriberInfo.phone);
        this.subscriberInfo.billingAddress = maskString(this.subscriberInfo.billingAddress);
      }
    }, error => {
      if (error && error?.status == 404) {
        this.showHyperLink = false;
      }
    });
  }

  gotoEndpoint(data: any) {
    if (!this.webSocketService.isUnmapped) {
      if (data.id && data.id !== null) {
        this.webSocketService.setEndpointValue(data.id)
        this.sso.setEPRredirectFrom(window.location.pathname);
        if (!this.epSearchError && this.searchText && !this.loading) {
          window.sessionStorage.setItem('endpointName', data.endPointName ?? data.name ?? data.ipAddress)
          this.router.navigate(['/cco/traffic/endpoints/realtime'], { queryParams: { id: data.id } });
        }
      }
    } else {
      this.webSocketService.setEndpointValue(data.ipAddress);
      this.sso.setEPRredirectFrom(window.location.pathname);
      if (!this.epSearchError && this.searchText && !this.loading) {
        window.sessionStorage.setItem('endpointName', data.endPointName ?? data.name ?? data.ipAddress)
        this.router.navigate(['/cco/traffic/endpoints/realtime'], { queryParams: { id: data.ipAddress } });
      }
    }

  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getONTData(serialNumber: any) {
    let url = `${environment.SUPPORT_URL}/subscriber-search?${this.sso.getOrg(this.ORG_ID)}filter=${serialNumber}&pageNumber=1&pageSize=1`
    this.ontInfoSubs = this.http.get(url).subscribe((res: any) => {
      this.deviceInfo = res.records[0].devices.filter((element) => element.ont);
      this.ontInfo = res.records[0].devices.filter((element) => element.ont)[0]?.ont;
      if (this.ontInfo.serialNo?.length < 12) {
        this.ontInfo.serialNo = this.deviceInfo[0].serialNumber;
      }
    })
  }

  gotoSubscriber(info: any) {
    localStorage.setItem("calix.Device_Details", JSON.stringify(this.deviceInfo));
    let queryParams = {
      sn: info.serialNo,
      subscriber: this.endPointsInfo.subscriberId
    };
    this.router.navigate(['/cco/system/cco-subscriber-system/system-details'], { queryParams: queryParams });
  }

  getEndpointName(searchData: any) {
    if (searchData && searchData.length > 0) {
      searchData.map((element) => {
        if (!element.name) {
          element.name = element.ipAddress
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

  subscriberNameInfo: any;
  subscriptionInfoSubs: any;
  getSubscriberInfo(id: any) {
    if (!this.webSocketService.isUnmapped) {
      let url = `${environment.CCO_REPORTS_BASE_URL}util/endpointinfo/${id}?org=${this.ORG_ID}`;
      this.subscriptionInfoSubs = this.http.get(url).subscribe((data: any) => {
        this.subscriberNameInfo = data;
      });
    }
  }
}
