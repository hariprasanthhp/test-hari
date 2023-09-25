import { DatePipe, PlatformLocation, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { forkJoin, of, Subscription, throwError, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { IssueService } from '../../service/issue.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { Title } from '@angular/platform-browser';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { RouterService } from 'src/app-services/routing.services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-current-issues',
  templateUrl: './current-issues.component.html',
  styleUrls: ['./current-issues.component.scss']
})
export class CurrentIssuesComponent implements OnInit, OnDestroy {

  //@ViewChild(CommonRealtimeFilterComponent) hello;
  //Input() visible:boolean = false

  isDev: boolean = false;
  language: any;
  languageSubject;
  clickedRegion: any;
  regionName: any;
  clickedLocation: any;
  locationName: any;
  systemName: any;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  loading: boolean = true;
  locked = false;
  interval = 15 * 1000;

  regionSelected: any;
  regionsDataArray = ["All"];
  regionArray = ["All"];
  locationSelected: any;
  locationDataArray = ["All"];
  systemSelected: any
  systemDataArray = ["All"];
  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;
  timer: any;
  limit = 10;

  systemStatusData = [
    {
      id: 'connected',
      name: 'Connected'
    },
    {
      id: 'disconnected',
      name: 'Disconnected'
    },
  ];

  severity = {
    MINOR: 'assets/img/outline-error-minor.svg',
    MAJOR: 'assets/img/outline-error-major.svg',
    CRITICAL: 'assets/img/outline-error-red.svg',
    WARNING: "assets/img/outline-error-warning.svg",
    INFO: "assets/img/outline-error-info.svg"
  }
  countSubscribe: any;
  countData: any;
  criticalAlarms: any;
  majorAlarms: any;
  minorAlarms: any;
  totalAlarms: any;
  errorInfo: any;
  error: boolean;

  filtersForm = this.fb.group({
    region: [''],
    location: [''],
    system: [''],
    limit: [20, [numValidator]],
    systemStatus: 'connected',
    alarmEventName: [''],
    fsan_serialno: '',
    device_type: 'ALL'
  });

  colors = {
    MINOR: '#F3B426',
    MAJOR: '#FC7235',
    CRITICAL: '#C70000',
    WARNING: "#f7e9c1",
    INFO: "#7cb5ec"
  }

  colorClass = {
    MINOR: 'minor-but',
    MAJOR: 'major-but',
    CRITICAL: 'critical-but',
    WARNING: "warning-but",
    INFO: "severity-info-but"
  }

  timerSubscription: Subscription;

  filtersObj: any = {
    'region': 'Region', 'location': 'Location', 'system': 'System', 'alarmCount': 'Display Limit', 'alarmEventName': 'Exclude Alarms'
  }

  filters = ['region', 'location', 'system', 'alarmEventName', 'alarmCount'];

  userPreferenceObj = {};
  timeZone: string;
  geoMapfilterSubscription: Subscription;
  geoMapFilters: boolean = false;
  geoMapIssue = 'false';
  issuesGeoMapFilters: {};
  homeGeoMapFilters: {};



  constructor(private translateService: TranslateService,
    private issueService: IssueService,
    public ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    private exportExcelService: ExportExcelService,
    private titleService: Title,
    private chartOptionService: HistoryChartOptionsService,
    private routerService: RouterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: PlatformLocation) {
    this.location.onPopState(() => {
      //from geomap
      // if (this.routerService.currentUrl.indexOf('geoMapIssue=true') !== -1) {
      //   this.issueService.fromMapNavigation(true);
      // }
    });

  }

  setTitle() {
    this.titleService.setTitle(`${this.language['Real Time']} - ${this.issueService.getPageTitle()[this.issueService.getAlertType()]} - ${this.language['Alerts']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
  }



  ngOnInit(): void {

    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      limit: 20,
      systemStatus: 'connected',
      alarmEventName: ['All'],
      fsan_serialno: '',
      device_type: 'ALL'
    });

    this.filtersForm.get('fsan_serialno').valueChanges.subscribe((fsan) => {
      if (!fsan) {
        this.fsanvalid = true;
      } else if (fsan.length == 12) {
        this.fsanvalid = true;
      }
    });

    this.timeZone = new Date().toString().split(" ")[5].replace(/(.{2})$/, ':$1');
    //this.getUserPreferences();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle()
    });
    this.setTitle()
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      const alertScopes = this.issueService.getAlertScopes();
      if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.realtime]) {
        this.hasScopeAccess = true;
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.ssoService.setPageAccess(false);
      return;
    } else {
      this.ssoService.setPageAccess(true);
    }

    this.route.queryParams.subscribe((params: any) => {
      this.geoMapIssue = params['geoMapIssue'] && params.geoMapIssue == 'true' ? params.geoMapIssue : 'false';
      if (this.geoMapIssue == 'true') {
        this.homeGeoMapFilters = this.issueService.getAppliedFilters();
        this.issuesGeoMapFilters = this.homeGeoMapFilters ? this.homeGeoMapFilters : {};

        if (this.issuesGeoMapFilters) {
          this.filtersForm.get('device_type').setValue(this.issuesGeoMapFilters['device_type'] ? (this.issuesGeoMapFilters['device_type']?.toUpperCase()) : 'ALL');
          this.onAlarmGroupChange(this.filtersForm.get('device_type').value);

          if (this.issuesGeoMapFilters['device_type']?.toUpperCase() == 'ONT') {
            this.filtersForm.get('fsan_serialno').setValue(this.issuesGeoMapFilters['fsan_serialno'] ? this.issuesGeoMapFilters['fsan_serialno'] : '');
          }
        }
      }
    });

    this.timerSubscription = timer(0, 15000).pipe(
      map(() => {
        this.alarmsCount();
      })
    ).subscribe();

    this.geoMapfilterSubscription = this.issueService.geoMapFilterChanged$.subscribe((value: boolean) => {
      this.geoMapFilters = value;
    });

    // this.geoMapfilterSubscription = this.issueService.homegeomapNavigation$.subscribe(() => {
    //   this.gotoHomeGeomap();
    // });

  }

  urls = this.router.url;

  Applybuttonfunction() { }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    clearInterval(this.timer);
    this.timerSubscription.unsubscribe();

  }


  hasScopeAccess = false;

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
  }


  regionsApiLoader() {
    const seen = new Set();
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res && res.length) {
          res = this.issueService.appendFqn(res);
        }
        this.chartOptionService.setRegionsInfo(res);
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];

        //geomap functionalities
        //set params that are set in geomap after navigated from alarm pushpins

        // if(this.geoMapIssue == 'true'){
        //   if(this.issuesGeoMapFilters && this.issuesGeoMapFilters['region'].length > 0){
        //     if(this.issuesGeoMapFilters['region'].filter(el => el?.toLowerCase() != 'all')?.length == 0){
        //       this.generateParams();
        //     } else{
        //       let regionArray = ['All'];
        //       regionArray = this.issuesGeoMapFilters['region'] || ['All'];
        //       this.filtersForm.get('region').setValue(regionArray);
        //       this.loadLocationValue('');
        //     }
        //   }
        // }

        if (this.geoMapIssue == 'true') {

          if (this.issuesGeoMapFilters) {
            let regionArray = ['All'];
            let locationArray = ['All'];
            let systemArray = ['All'];
            if (this.issuesGeoMapFilters && this.issuesGeoMapFilters['region']) {
              regionArray = this.issuesGeoMapFilters['region'] || ['All'];
            }
            if (this.issuesGeoMapFilters && this.issuesGeoMapFilters['location']) {
              locationArray = this.issuesGeoMapFilters['location'];
            }

            if (this.issuesGeoMapFilters && this.issuesGeoMapFilters['system']) {
              systemArray = this.issuesGeoMapFilters['system'];
            }
            this.filtersForm.get('region').setValue(regionArray);

            setTimeout(() => {
              this.filtersForm.get('location').setValue(locationArray);
              this.loadLocationValue('');
              setTimeout(() => {
                this.filtersForm.get('system').setValue(systemArray);
                this.selectSystem('');
                this.loadSystemValue();
                // setTimeout(() => {
                //   this.loadIntialData();
                // }, 1000)
              }, 200)
            }, 200);
          }
        }
      }, (error) => {
      })
  }


  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = "All"
    this.systemSelected = "All"
    let ids = this.filtersForm.get('region').value;
    let locationIds = this.filtersForm.get('location').value;
    this.regionSelected = ids;
    if (this.regionSelected && this.regionSelected != ['All']) {
      let regionQuery = '';

      if (ids.length && ids !== ['All']) {
        if (ids.indexOf('All') !== -1) {
          this.regionName = null;
          this.locationName = null;
          this.systemName = null;
          this.locationDataArray = ["All"];
          this.systemDataArray = ["All"];
          return;
        }
        ids.forEach(element => {
          if (element == 'All') {
            return;
          }
          regionQuery += `&region=${element}`
        });

        this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0${regionQuery}`).pipe(
          map((res: any) => {
            res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
            res = this.issueService.appendFqn(res);
            return res;
          }),
          catchError(this.handleError))
          .subscribe((res: any) => {
            //this.setLocationsInfo(res);
            this.chartOptionService.setLocationsInfo(res);
            this.locationDataArray = ["All"];
            this.locationDataArray = [...this.locationDataArray, ...res];
            // this.locationDataArray = res;
            // this.locationDataArray.push("All");

            if (locationIds && locationIds.length) {
              let locationsObj = this.chartOptionService.getLocationsObj();
              let locationListIds = Object.keys(locationsObj).length ? Object.keys(locationsObj) : []
              let validLocationIds = [];
              locationIds.forEach(element => {
                if (locationListIds.indexOf(element) !== -1) {
                  validLocationIds.push(element);
                }
              });

              if (!validLocationIds.length) {
                validLocationIds = ['All']
              }

              this.filtersForm.get('location').setValue(validLocationIds);
              this.loadSystemValue();

            }

          }, (error) => {
          });

        //start of CCL-34242
        this.regionName = ids;
        //end of CCL-34242

        this
      } else {
        this.filtersForm.get('region').setValue(['All']);
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('region').setValue(['All']);
        this.regionName = null;
        this.locationName = null;
        this.systemName = null;
        this.locationDataArray = ["All"];
        this.systemDataArray = ["All"];
      }



    }

  }

  loadSystemValue(event?: any) {
    this.clickedLocation = '';
    let regionids = this.filtersForm.get('region').value;
    let locationids = this.filtersForm.get('location').value;
    let systemIds = this.filtersForm.get('system').value;
    this.systemSelected = ["All"];
    if (regionids.length && locationids.length && locationids.indexOf('All') === -1) {

      let regionQuery = '';

      regionids.forEach(element => {
        if (element == 'All') {
          return;
        }
        regionQuery += `&region=${element}`
      });

      let locationQuery = '';

      locationids.forEach(element => {
        if (element == 'All') {
          return;
        }
        locationQuery += `&location=${element}`
      });

      this.systemsSubject = this.http.get(`${environment.API_BASE_URL}nfa/systems?tenant=0${regionQuery}${locationQuery}`).pipe(
        map((res: any) => {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        }),
        catchError(this.handleError))
        .subscribe((res: any) => {
          //this.setSystemsInfo(res);
          this.chartOptionService.setSystemsInfo(res);
          this.systemDataArray = ["All"];
          this.systemDataArray = [...this.systemDataArray, ...res];

          if (systemIds && systemIds.length) {
            let systemsObj = this.chartOptionService.getSystemsObj();
            let systemListIds = Object.keys(systemsObj).length ? Object.keys(systemsObj) : []
            let validSystemIds = [];
            systemIds.forEach(element => {
              if (systemListIds.indexOf(element) !== -1) {
                validSystemIds.push(element);
              }
            });

            if (!validSystemIds.length) {
              validSystemIds = ['All'];
              this.systemName = null;
            }

            this.filtersForm.get('system').setValue(validSystemIds);

          }
          // this.systemDataArray = res;
          // this.systemDataArray.push("All");
        }, (error) => {
        });

      //start of CCL-34242
      this.locationName = locationids;
      //end of CCL-34242
    } else {
      if (!locationids.length) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        this.locationName = null;
        this.systemName = null;
        this.systemDataArray = ["All"];
      }
    }

  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

  validateLimit($event) {
    let limit = this.filtersForm.get('limit').value;

    if (limit > 10000) {
      this.filtersForm.get('limit').setValue(10000);
    }
  }

  alarmsCount() {
    /* this.countSubscribe = this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmCount?reportType=REALTIME`).subscribe((res: any) => {
       this.countData = (res && res['alarm'] && res['alarm'].raised) ? res['alarm'].raised : {};
       this.criticalAlarms = this.countData.critical ? this.countData.critical.toLocaleString() : '0';
       this.majorAlarms = this.countData.major ? this.countData.major.toLocaleString() : '0';
       this.minorAlarms = this.countData.minor ? this.countData.minor.toLocaleString() : '0';
       this.totalAlarms = this.countData.critical + this.countData.major + this.countData.minor + this.countData.warning + this.countData.info;
       this.totalAlarms = this.totalAlarms ? this.totalAlarms.toLocaleString() : '0';
       if (this.countData && this.countData['info']) {
         this.countData['info'] = this.countData['info'].toLocaleString();
       }
 
       if (this.countData && this.countData['warning']) {
         this.countData['warning'] = this.countData['warning'].toLocaleString();
       }
 
       this.loading = false;
     }, (err: HttpErrorResponse) => {
       this.pageErrorHandle(err);
       this.criticalAlarms = '0';
       this.majorAlarms = '0';
       this.minorAlarms = '0';
       this.totalAlarms = '0';
       this.loading = false;
     });*/
  }

  clearFilter() {
    this.locked = false;
    this.showFSAN = true;

    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];

    this.clickedRegion = undefined;
    this.clickedLocation = undefined;
    this.locationName = undefined;
    this.regionName = undefined;
    this.systemName = undefined;

    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      limit: 20,
      systemStatus: 'connected',
      alarmEventName: ['All'],
      fsan_serialno: '',
      device_type: 'ALL'
    });

    let params = {
      severity: 'CRITICAL,MAJOR,MINOR,INFO,WARNING',
      historyReport: false,
      alarmCount: 20,
      limit: 20
    }
    if (this.urls.includes('/cco/issues/connectivity/realtime/current-issues')) {
      delete params['severity'],
        delete params['historyReport'],
        delete params['limit']
    }
    this.appliedParams = params;
    if (this.activeTab == 'disconncted') {
      this.geoMapFilters = false;
    }
    this.issueService.setAppliedFilters(params);


  }

  validateRegion(event: any) {
    let regions = this.filtersForm.get('region').value;

    if (event === 'All') {
      regions = ['All'];
    } else {
      let index = regions.indexOf('All');
      if (index > -1) {
        regions.splice(index, 1);
      }

    }

    this.filtersForm.get('region').setValue(regions);

    this.loadLocationValue('');

  }

  validateLocation(event: any) {
    let locations = this.filtersForm.get('location').value;

    if (event === 'All') {
      this.clickedLocation = undefined;
      this.locationName = undefined;
      locations = ['All'];
    } else {
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }

    }

    this.filtersForm.get('location').setValue(locations);
    this.loadSystemValue('');

  }

  validateSystem(event: any) {
    let systems = this.filtersForm.get('system').value;

    if (!systems.length) {
      systems = ['All'];
    } else if (event === 'All') {
      systems = ['All'];
    } else {
      let index = systems.indexOf('All');
      if (index > -1) {
        systems.splice(index, 1);
      }

    }

    this.filtersForm.get('system').setValue(systems);

  }

  selectSystem(event: any) {
    let systemid = this.filtersForm.get('system').value;
    this.systemName = systemid

    if (systemid == 'All') {
      this.systemName = null;
    }
  }



  appliedParams: any;
  generateParams(changeTab?: any) {
    this.loading = true
    if (this.filtersForm?.controls?.limit.invalid) {
      return;
    }

    this.validateFSAN();
    if (!this.fsanvalid) return;
    this.locked = false;
    let system = '';

    if (this.systemName && this.systemName.length && this.systemName.indexOf('All') === -1) {
      let filtered = this.systemName.filter(function (el) {
        return (el && el.length && el !== 'All');
      });

      system = filtered;
    } else {
      system = undefined;
    }
    let params = {
      region: this.clickedRegion || this.regionName,
      location: this.clickedLocation || this.locationName,
      system: system, //this.systemSelected !== 'All' ? this.systemSelected : undefined,
      severity: 'CRITICAL,MAJOR,MINOR,INFO,WARNING',
      historyReport: false,
      //alarmCount: this.limit ? this.limit : 10
      alarmCount: this.filtersForm.get('limit').value ? this.filtersForm.get('limit').value : 0,
      limit: this.filtersForm.get('limit').value ? this.filtersForm.get('limit').value : 0,
      systemStatus: this.filtersForm.get('systemStatus').value,
      //customCategory: 'Cloud health,Cloud connectivity'
    }

    if (this.urls.includes('/cco/issues/device/realtime/current-issues')) {
      params['fsan_serialno'] = this.filtersForm.get('fsan_serialno').value;
      params['device_type'] = this.filtersForm.get('device_type').value;

    }

    if (this.filtersForm.get('device_type').value === 'OLT') {
      delete params['fsan_serialno'];
    }

    let alarms = [];
    this.filtersForm.get('alarmEventName').value?.forEach(element => {
      if (element == 'All') {
        return;
      }
      alarms.push(element);

    });

    params['alarmEventName'] = alarms.join(',');
    this.appliedParams = params;
    if (this.activeTab == 'disconncted') {
      this.geoMapFilters = false;
    }
    if (this.urls.includes('cco/issues/connectivity/realtime/current-issues') || this.urls.includes('cco/issues/cloud-health/realtime/current-issues')) {
      delete params['severity']
      delete params['limit']
      delete params['customCategory']

      this.appliedParams = params;
      if (this.activeTab == 'disconncted') {
        this.geoMapFilters = false;
      }

      this.issueService.setAppliedFilters(params)
    }
    this.issueService.setAppliedFilters(params)
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getUserPreferences() {
    this.http.get(`${environment.API_BASE_URL}cmc/pref/user-preferences/${this.ssoService.getOrgId()}/${this.ssoService.getUserId()}`).subscribe((json: any) => {
      this.userPreferenceObj = {};
    })
  }

  setUserPreferences() {
    let obj = {
      filters: {
        cco_issues: {
          limit: this.appliedParams.limit
        }
      }
    };

    if (Object.keys(this.userPreferenceObj).length) {
      if (Object.keys(this.userPreferenceObj['filters']).length) {
        this.userPreferenceObj['filters'] = { ...this.userPreferenceObj['filters'], ...obj['filters'] };
      } else {
        this.userPreferenceObj['filters'] = obj;
      }
    } else {
      this.userPreferenceObj = obj;
    }
    this.http.post(`${environment.API_BASE_URL}cmc/pref/user-preferences/${this.ssoService.getOrgId()}/${this.ssoService.getUserId()}`, obj).subscribe((json: any) => {
    })
  }


  isNumber(evt) {
    let limit = this.filtersForm.get("limit").value;

    return /^\d*\.?\d*$/.test(limit);
  }

  validateAlarmName(event: any) {
    let alarms = this.filtersForm.get('alarmEventName').value;
    if (!alarms.length) {
      alarms = ['All'];
    } else if (event === 'All') {
      alarms = ['All'];
    } else {
      let index = alarms.indexOf('All');
      if (index > -1) {
        alarms.splice(index, 1);
      }

    }

    this.filtersForm.get('alarmEventName').setValue(alarms);
  }

  alarmNames = [];

  getAlarmNames() {
    this.http.get(`${this.baseUrl}alarmEvent?historyalarm=false&notificationType=Alarm`).subscribe((json: any) => {
      let alarmNames = [
        { id: "All", name: "None" }
      ];
      let alarm = json.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      if (alarm) {
        alarm.forEach(element => {

          if (!element) {
            return;
          }

          if (element === 'multiple-onts-down') {
            return;
          }

          alarmNames.push({
            id: element,
            name: element
          })
        });
      }

      this.alarmNames = alarmNames;

      if (this.urls.includes("/cco/issues/device/realtime/current-issues")) {
        this.getCustomAlarmsFunc();
      }
    })
  }

  getCustomAlarmsFunc() {
    this.http
      .get(`${this.baseUrl}customAlarms/false`)
      .subscribe((json: any) => {
        if (json && json.length > 0 && this.urls.includes('/cco/issues/device/realtime/current-issues')) {
          let defaultExcludeAlarms = this.alarmNames.filter(el => json.findIndex(ele => ele['alarmName'] == el['name']) != -1).map(alarms => alarms['id']);
          if (defaultExcludeAlarms && defaultExcludeAlarms.length > 0) {
            this.filtersForm.get('alarmEventName').setValue(defaultExcludeAlarms);
          }
        }
        this.generateParams();
      },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.pageErrorHandle(err);
          this.generateParams();
        });
  }

  activeTab = 'alarms';



  // changeTab(activeTab) {
  //   this.issueService.fromMapNavigation(false);
  //   this.activeTab = activeTab
  //   this.generateParams(activeTab);
  // }

  showFSAN = true;
  onAlarmGroupChange(value) {
    if (value === 'OLT') {
      this.showFSAN = false;
    } else {
      this.showFSAN = true;
    }

  }

  fsanvalid: boolean = true;
  validateFSAN() {
    this.fsanvalid = true;
    if (this.filtersForm.get('fsan_serialno').value.length !== 0 && this.filtersForm.get('fsan_serialno').value.length !== 12) {
      this.fsanvalid = false;
    }
  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode  //key = event.charCode;
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

}

export function numValidator(control: AbstractControl): { [key: string]: any } | null {
  let regex = /^\s*(\d{1,5}|-\d+)?\s*$/;
  if (control?.value == 0) {
    control?.setValue(20);
    return null;
  }
  if (!control?.value) {
    return { 'isrequired': true };
  }
  if (control?.value > 10000) {
    control?.setValue(10000);
    return null;
  }

  if (control?.value < 1) {
    control?.setValue(Math.abs(control.value));
    return null;
  }
  if (!regex.test(control.value)) {
    return { 'invalidNumber': true };
  }

  return null;

}