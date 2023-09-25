import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import * as Highcharts from "highcharts/highstock";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { IssueService } from '../../service/issue.service';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map } from 'rxjs/operators';
import { of, forkJoin, Subject, Observable, throwError, fromEvent } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
import customEvents from 'highcharts-custom-events';
import { FormBuilder, FormControl } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
customEvents(Highcharts);

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';

(function (Highcharts: any) {
  Highcharts.seriesTypes.line.prototype.drawLegendSymbol = Highcharts.seriesTypes.area.prototype.drawLegendSymbol;
})(Highcharts);

@Component({
  selector: 'app-activeissue',
  templateUrl: './activeissue.component.html',
  styleUrls: ['./activeissue.component.scss']
})
export class ActiveissueComponent implements OnInit {

  subscriptionObj: any = {};

  @ViewChild('calendar') private calendar: any;
  isDev = false;

  showNewPagination = true;
  transformedAlarms = ['multiple-onts-down-network', 'multiple-onts-down-pon', 'multiple-onts-down-olt'];
  data = {
    alarm: {
      'byday': [],
      'severity': [],
      'region': [],
      'location': [],
      'system': [],
    },
    event: {
      'region': [],
      'location': [],
      'system': [],
    }
  }

  params = {
    alarm: {
      'byday': {},
      'severity': {},
      'region': {},
      'location': {},
      'system': {},
    },
    event: {
      'region': {},
      'location': {},
      'system': {},
    }
  }

  deleteParams = {
    alarm: {
      'byday': {},
      'severity': {},
      'region': {},
      'location': {},
      'system': {},
    },
    event: {
      'region': {},
      'location': {},
      'system': {},
    }
  }

  filters = {
    alarm: {
      'byday': {},
      'severity': {},
      'region': {},
      'location': {},
      'system': {},
    },
    event: {
      'region': {},
      'location': {},
      'system': {},
    }
  }

  loaders = {
    alarm: {
      'byday': false,
      'severity': false,
      'region': false,
      'location': false,
      'system': false,
    }
  }

  fullScrenSubHeading = '';
  maxDate = new Date();
  maxForStartDate = new Date();
  count: any = 0;
  initLoad = false;
  types: any = [];
  typeSelected: string = '';
  showTable = false;
  dataAvailable = false;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  isRerender = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  language: any;
  languageSubject;
  loading: boolean = false;
  renderOnce: boolean = false;
  error: boolean = false;
  serverityError: boolean = false;
  systemError: boolean = false;
  locationError: boolean = false;
  regionError: boolean = false;
  errorInfo: any;
  serverityErrorInfo: any;
  systemErrorInfo: any;
  locationErrorInfo: any;
  regionErrorInfo: any;

  applyDisabled: boolean = false;
  fullScreen: boolean = false;
  value: number = 6;
  Region: any;
  Location: any;
  System: any;
  FSAN: any;
  Severity: any;
  category: any = ["All"];
  loadLocationChart: boolean = false;
  Highcharts = Highcharts;
  fullScreenChartName: string;
  fullScreenName: string;
  fullScreenData: any;

  countSubscribe: any;
  countData: any;

  severitySubscribe: any;
  severityChartData: any;
  severityChartOptions: any;

  systemSubscribe: any;
  systemChartData: any;
  systemChartOptions: any;

  locationSubscribe: any;
  locationChartData: any;
  locationChartOptions: any;

  regionSubscribe: any;
  regionChartData: any;
  regionChartOptions: any;

  baseUrl = `${environment.API_BASE_URL}analytics-engine/`
  url = "";
  dateParam = "";
  FromDate: any;
  ToDate: any;

  regionSelected: any;
  regionsDataArray = ["All"];
  regionArray = ["All"];
  locationSelected: any;
  locationDataArray = ["All"];
  systemSelected: any
  systemDataArray = ["All"]

  regionName: any;
  locationName: any;
  systemName: any;

  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  @ViewChild('addNotesModal', { static: true }) private addNotesModal: TemplateRef<any>;
  @ViewChild('showNotesModal', { static: true }) private showNotesModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('addSubscriberInfoModel', { static: true }) private addSubscriberInfoModel: TemplateRef<any>;

  modalRef: any;
  modalInfo: any;
  modalTitle: any;

  categoryParam: string;
  clickedLocation: string;
  clickedRegion: string;
  clickedSystem = '';
  loadSystemChart: boolean;
  alarmType: string;
  both: boolean;
  eventName: any;
  filterApplied = false;
  list: any = [];

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

  categories = [];
  acknowledgedAlarms = [
    { id: 'all', name: 'All' },
    { id: 'false', name: 'Hide Acknowledged Alarms' },
    { id: 'true', name: 'Show Acknowledged Alarms' }
  ];

  filtersForm = this.fb.group({
    date: [undefined],
    alarmType: [''],
    region: [''],
    location: [''],
    system: [''],
    fsan: [''],
    severity: [''],
    category: [''],
    eventName: [''],
    customCategory: [''],
    cco_ack: 'all'
  });

  appliedFilters = {
    date: true,
    alarmType: true,
    region: true,
    location: true,
    system: true,
    fsan: true,
    severity: true,
    category: true,
    eventName: true,
    customCategory: true,
    cco_ack: true
  }

  filtersDataInNS: any;
  hasParamsInUrl = false;
  tableCounts: any;

  last24hours = false;
  last7Days = false;
  last30Days = false;
  fsanvalid: boolean;
  sverityData: string;
  expandsubscriberRow: boolean;
  subscriberInfosub: any;
  subscriberInfo: any;
  Infosub: boolean;
  timeZone: string;
  toggleSubscription: any;
  redrirectUrl = "";
  geoMapIssue = 'false';
  fromNs = 'false';
  issuesGeoMapFilters: any;
  networkSystemsFilters: any;
  systemsObj = {};
  hasWriteAccess: boolean = false;
  previousFlag = false;
  nextFlag = false;
  entries = [
    { id: 10, name: 10 },
    { id: 25, name: 25 },
    { id: 50, name: 50 },
    { id: 100, name: 100 }
  ]
  paginateQuery = '';
  entry = new FormControl(10);

  urls = this.router.url;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private exportExcelService: ExportExcelService,
    private issueService: IssueService,
    private chartOptionService: HistoryChartOptionsService,
    private dialogService: NgbModal,
    private fb: FormBuilder,
    public ssoService: SsoAuthService,
    private dateUtilsService: DateUtilsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {

    window.scrollTo(0, 0);
    this.chartOptionService.setFiltersObj();


    this.toggleSubscription = this.ssoService.toggled$.subscribe((data: any) => {
      Highcharts.charts.forEach((chart) => {
        setTimeout(() => {
          if (chart != undefined)
            chart.reflow();
        }, 100)

      });
    });

    if (history?.state?.last24hours) {
      this.last24hours = true;
    } else if (history?.state?.last7Days) {
      this.last7Days = true;
    } else if (history?.state?.last30Days) {
      this.last30Days = true;
    }

    let date = new Date();
    // this.FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    // this.ToDate = new Date();

    this.route.queryParams.subscribe((params: any) => {
      if (params['severity'] || params['days']) {
        let fromDate: any;
        if (params['days']) {
          fromDate = new Date(date.getTime() - ((params['days'] - 1) * 24 * 60 * 60 * 1000));
        }

        let toDate = new Date();

        this.hasParamsInUrl = true;
        this.filtersForm.patchValue({
          date: [fromDate, toDate],
          region: ['All'],
          location: ['All'],
          system: ['All'],
          severity: params['severity'] || 'All',
          category: ['All'],
          fsan: '',
          customCategory: 'None',
          eventName: ['All'],
          cco_ack: 'all'
        });
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.doSearchNew();
    }, 1000);
    this.setAppliedFilters();
    this.timeZone = new Date().toString().split(" ")[5].replace(/(.{2})$/, ':$1');
    this.Severity = 'all';
    this.fullScreen = false
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.loadIntialData();
      this.setTitle()
    });
    this.setTitle()

    let date = new Date();
    // this.FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    //this.ToDate = new Date();

    if (!this.hasParamsInUrl) {
      this.filtersForm.patchValue({
        //date: [null, null],
        region: ['All'],
        location: ['All'],
        system: ['All'],
        severity: 'All',
        category: ['All'],
        fsan: '',
        customCategory: 'None',
        eventName: ['All'],
        cco_ack: 'all'
      });
    }

    if (this.last24hours) {
      this.FromDate = new Date(this.dateUtilsService.getStartUtcTimeByDays(0) - 86400000);
      this.ToDate = new Date();
      this.filtersForm.patchValue({
        date: [this.FromDate, this.ToDate],
        region: ['All'],
        location: ['All'],
        system: ['All'],
        severity: 'All',
        category: ['All'],
        fsan: '',
        customCategory: 'None',
        eventName: ['loss-of-pon'],
        cco_ack: 'all'
      });
    }

    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {

      const alertScopes = this.issueService.getAlertScopes();
      if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.active]) {
        this.hasScopeAccess = true;

        if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.active]?.indexOf('write') !== -1) {
          this.hasWriteAccess = true;
        }

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
    // let timer = 0;
    this.route.queryParams.subscribe((params: any) => {
      this.redrirectUrl = params['redirect'] ? params.redirect : null;
      this.geoMapIssue = params['geoMapIssue'] && params.geoMapIssue == 'true' ? params.geoMapIssue : 'false';
      this.fromNs = params['fromNs'] && params.fromNs == 'true' ? params.fromNs : 'false';

      if (this.fromNs == 'true') {
        this.networkSystemsFilters = params;
      }

      if (this.geoMapIssue == 'true') {
        if (history?.state?.filters) {
          const filters = _.pickBy(history.state.filters, function (value, key) {
            return value;
          });
          //filters['fsan'] = filters['fsan_serialno'] || '';
          // this.filtersForm.patchValue(filters);
        }
        this.issuesGeoMapFilters = this.issueService.getGeomapAppliedFilters();
        this.filtersForm.get('cco_ack').setValue('false');
        if (this.issuesGeoMapFilters['fromIssuesGeoMap'] == 'ont') {
          this.filtersForm.get('fsan').setValue(this.issuesGeoMapFilters['fsan'] ? this.issuesGeoMapFilters['fsan'] : this.issuesGeoMapFilters['systemDetails']['fsan_serialnumber'] ? this.issuesGeoMapFilters['systemDetails']['fsan_serialnumber']
            : '');
        }
      }
    });



    this.regionsApiLoader();
    this.getCategories();
    this.getCustomCategories();
    this.getAlarmNames();
  }

  ngAfterViewInit() {
    this.listenChangeEntries();

    this.notes.valueChanges.subscribe(data => {
      if (!this.showEdit && !this.notes.value) {
        this.btnDisabled = true;
        return;
      } else if (this.showEdit && this.isNotesModalOpen) {
        this.isNotesModalOpen = false;
        return;
      }
      this.btnDisabled = false;
    });
  }

  setTitle() {
    this.titleService.setTitle(`${this.language['Active Reports']} - ${this.issueService.getPageTitle()[this.issueService.getAlertType()]} - ${this.language['Alerts']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
  }

  loadRegionsSystemsOptionsData() {
    const requests: any = {};
    let includeDeleted = true;
    requests['regions'] = this.issueService.getRegions(includeDeleted).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    );

    requests['systems'] = this.http.get(`${environment.API_BASE_URL}nfa/systems?tenant=0&includeDeleted=true`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    );

    forkJoin(requests).subscribe((json: any) => {
      this.regionSelected = 'All';
      this.locationSelected = "All";
      this.systemSelected = "All";
      let res = json['regions'];
      let filterRegions = [];
      if (res && res.length) {
        res = this.issueService.appendFqn(res);

        res.forEach((element: any) => {
          if (!element['isDeleted']) {
            filterRegions.push(element);
          }
        });
      }
      this.chartOptionService.setRegionsInfo(res);
      this.loadIntialData();
      res.sort();
      this.regionsDataArray = [...this.regionsDataArray, ...filterRegions];

      //geomap & network systems functionalities
      if ((this.geoMapIssue == 'true' && this.issuesGeoMapFilters['fromIssuesGeoMap'] == 'olt') || this.fromNs == 'true') {
        let regionArray = ['All'];
        let locationArray = ['All'];
        let systemArray = ['All'];

        let region_uuid = '', location_uuid = '', system_uuid = '';

        if (this.geoMapIssue == 'true') {
          region_uuid = this.issuesGeoMapFilters['regions'] && this.issuesGeoMapFilters['regions']['region_uuid'] ? this.issuesGeoMapFilters['regions']['region_uuid'] : undefined;

          location_uuid = this.issuesGeoMapFilters['locations'] && this.issuesGeoMapFilters['locations']['networkgroup_uuid'] ? this.issuesGeoMapFilters['locations']['networkgroup_uuid'] : undefined;

          system_uuid = this.issuesGeoMapFilters['systemUuid'] ? this.issuesGeoMapFilters['systemUuid'] : undefined;

        } else {
          region_uuid = this.networkSystemsFilters && this.networkSystemsFilters['region_uuid'] ? this.networkSystemsFilters['region_uuid'] : undefined;

          location_uuid = this.networkSystemsFilters && this.networkSystemsFilters['location_uuid'] ? this.networkSystemsFilters['location_uuid'] : undefined;

          system_uuid = this.networkSystemsFilters && this.networkSystemsFilters['system_uuid'] ? this.networkSystemsFilters['system_uuid'] : undefined;

        }

        if (region_uuid) {
          regionArray = [];
          regionArray.push(region_uuid)
        }
        if (location_uuid) {
          locationArray = [];
          locationArray.push(location_uuid)
        }

        if (system_uuid) {
          systemArray = [];
          systemArray.push(system_uuid)
        }
        this.filtersForm.get('region').setValue(regionArray);

        setTimeout(() => {
          this.filtersForm.get('location').setValue(locationArray);
          this.loadLocationValue('');
          setTimeout(() => {
            this.filtersForm.get('system').setValue(systemArray);
            this.selectSystem('');
            this.loadSystemValue();
            setTimeout(() => {
              this.loadIntialData();
            }, 1000)
          }, 200)
        }, 200);
      }

      let systems = json['systems'];
      this.systemsObj = {};
      let sysObj = {};
      if (systems) {
        systems.forEach((element: any) => {
          sysObj[element.uuid] = element.name;
        })
      }
      this.systemsObj = sysObj;
    });

  }

  regionsApiLoader() {
    const seen = new Set();
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    let includeDeleted = true;
    this.regionsSubject = this.issueService.getRegions(includeDeleted)
      .subscribe((res: any) => {
        let filterRegions = [];
        if (res && res.length) {
          res = this.issueService.appendFqn(res);
          res.forEach((element: any) => {
            //element['name'] = element.tempName;
            if (!element['isDeleted']) {
              filterRegions.push(element);
            }
          });
        }
        this.chartOptionService.setRegionsInfo(res);

        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...filterRegions];

        //geomap & network systems functionalities
        if ((this.geoMapIssue == 'true' && this.issuesGeoMapFilters['fromIssuesGeoMap'] == 'olt') || this.fromNs == 'true') {
          let regionArray = ['All'];
          let locationArray = ['All'];
          let systemArray = ['All'];

          let region_uuid = '', location_uuid = '', system_uuid = '';

          if (this.geoMapIssue == 'true') {
            region_uuid = this.issuesGeoMapFilters['regions'] && this.issuesGeoMapFilters['regions']['region_uuid'] ? this.issuesGeoMapFilters['regions']['region_uuid'] : undefined;

            location_uuid = this.issuesGeoMapFilters['locations'] && this.issuesGeoMapFilters['locations']['networkgroup_uuid'] ? this.issuesGeoMapFilters['locations']['networkgroup_uuid'] : undefined;

            system_uuid = this.issuesGeoMapFilters['systemUuid'] ? this.issuesGeoMapFilters['systemUuid'] : undefined;

          } else {
            region_uuid = this.networkSystemsFilters && this.networkSystemsFilters['region_uuid'] ? this.networkSystemsFilters['region_uuid'] : undefined;

            location_uuid = this.networkSystemsFilters && this.networkSystemsFilters['location_uuid'] ? this.networkSystemsFilters['location_uuid'] : undefined;

            system_uuid = this.networkSystemsFilters && this.networkSystemsFilters['system_uuid'] ? this.networkSystemsFilters['system_uuid'] : undefined;

          }

          if (region_uuid) {
            regionArray = [];
            regionArray.push(region_uuid)
          }
          if (location_uuid) {
            locationArray = [];
            locationArray.push(location_uuid)
          }

          if (system_uuid) {
            systemArray = [];
            systemArray.push(system_uuid)
          }
          this.filtersForm.get('region').setValue(regionArray);

          setTimeout(() => {
            this.filtersForm.get('location').setValue(locationArray);
            this.loadLocationValue('');
            setTimeout(() => {
              this.filtersForm.get('system').setValue(systemArray);
              this.selectSystem('');
              this.loadSystemValue();
              setTimeout(() => {
                this.loadIntialData();
              }, 1500)
            }, 200)
          }, 200);
        } else {
          this.loadIntialData();
        }
      }, (error) => {
        this.loadIntialData();
      })
  }

  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = "All"
    this.systemSelected = "All"
    let ids = this.filtersForm.get('region').value;
    let locationIds = this.filtersForm.get('location').value;
    this.regionSelected = ids;
    if (this.regionSelected) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          this.regionName = null;
          this.locationName = null;
          this.systemName = null;
          this.filtersForm.get('location').setValue(['All']);
          this.filtersForm.get('system').setValue(['All']);
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

        this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0${regionQuery}&includeDeleted=true`).pipe(
          map((res: any) => {
            res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
            res = this.issueService.appendFqn(res);
            return res;
          }),
          catchError(this.handleError))
          .subscribe((res: any) => {
            let filterLocations = [];
            this.chartOptionService.setLocationsInfo(res);
            this.locationDataArray = ["All"];
            res.forEach((element: any) => {
              if (!element['isDeleted']) {
                filterLocations.push(element);
              }
            });
            this.locationDataArray = [...this.locationDataArray, ...filterLocations];

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

        this.regionName = ids;
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

    if (regionids.length && locationids.length && locationids.indexOf('All') !== -1) {
      this.systemName = null;
      this.filtersForm.get('system').setValue(['All']);
      this.systemDataArray = ["All"];
      return;
    }

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

      this.systemsSubject = this.http.get(`${environment.API_BASE_URL}nfa/systems?tenant=0${regionQuery}${locationQuery}&includeDeleted=true`).pipe(
        map((res: any) => {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        }),
        catchError(this.handleError))
        .subscribe((res: any) => {
          let filterSystems = [];
          this.chartOptionService.setSystemsInfo(res);
          this.systemDataArray = ["All"];

          res.forEach((element: any) => {
            if (!element['isDeleted']) {
              filterSystems.push(element);
            }
          });

          this.systemDataArray = [...this.systemDataArray, ...filterSystems];

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

      this.locationName = locationids;
    } else {
      if (!locationids.length) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('location').setValue(['All']);
        this.locationName = null;
        this.systemName = null;
        this.systemDataArray = ["All"];
      }
    }

  }

  selectSystem(event: any) {
    let systemid = this.filtersForm.get('system').value;
    this.systemName = systemid

    if (systemid == 'All') {
      this.systemName = null;
    }
  }

  alarmsCount() {
    let fields = this.filtersForm.value;
    let dateParam = this.issueService.getDateParam(fields, this.last24hours);
    if (dateParam) {
      this.dateParam = `&date=${this.issueService.getDateParam(fields, this.last24hours)}`;
    } else {
      this.dateParam = '';
    }

    this.issueService.filterCounts(this.dateParam)

  }

  fullScreenInvertFunction() {
    this.deleteFullScreenParams();
    this.setSearchQuery('');

    this.clickedSeverity = '';
    this.searchTerm = '';
    this.fullScreen = false;
    this.searchText$.next('');
    this.entry.setValue(10);
    //this.loadIntialData();
    //this.filtersForm.patchValue(this.filtersDataInNS);

    if (this.applyFiltersInFS) {
      this.applyFiltersInFS = false;
      this.loadIntialData();
    }

  }

  ngOnDestroy() {
    for (const key in this.subscriptionObj) {
      this.subscriptionObj[key]?.unsubscribe();
    }
    this.searchSub?.unsubscribe();
    this.languageSubject?.unsubscribe();
    if (this.severitySubscribe) {
      this.severitySubscribe.unsubscribe();
    }
    if (this.systemSubscribe) {
      this.systemSubscribe.unsubscribe();
    }
    if (this.locationSubscribe) {
      this.locationSubscribe.unsubscribe();
    }
    if (this.regionSubscribe) {
      this.regionSubscribe.unsubscribe();
    }
    if (this.countSubscribe) {
      this.countSubscribe.unsubscribe();
    }

    this.toggleSubscription?.unsubscribe();
  }

  clearFilter() {
    this.entry.setValue(10);
    this.fullScreen = false;
    this.loadLocationChart = !this.loadLocationChart;
    this.regionSelected = undefined;
    this.locationSelected = undefined;
    this.systemSelected = undefined;
    this.System = undefined;
    this.FSAN = null;
    this.Severity = null;
    this.category = ["All"];
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];

    let date = new Date();
    // this.FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    // this.ToDate = new Date();

    this.FromDate = undefined;
    this.ToDate = undefined;
    this.regionName = undefined;
    this.locationName = undefined;
    this.systemName = undefined;

    this.maxDate = new Date();
    this.maxForStartDate = new Date();

    this.filtersForm.patchValue({
      //date: [null],
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: 'All',
      category: ['All'],
      fsan: '',
      eventName: ['All'],
      customCategory: 'None',
      cco_ack: 'all'
    });

    this.filtersForm.get('date').setValue(null);
    this.loadIntialData();

  }

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
    this.noteError = false;
  }

  errors = {
    byday: "",
    severity: "",
    region: "",
    location: "",
    system: ""
  }

  closeErrors() {
    this.errors = {
      byday: "",
      severity: "",
      region: "",
      location: "",
      system: ""
    }
  }

  clickedSeverity = '';
  listObs: any;
  loadRegionChart = true;
  hasScopeAccess = false;
  loadIntialData(event?: any) {

    if (this.fsanvalidated("d")) return;
    let titlepipe = new TitleCasePipe();

    if (event) {
      this.last24hours = false;
    }

    this.closeErrors();

    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    if (this.fullScreen) {
      this.applyFiltersInFullScreen();
      return;
    }

    this.alarmType = fields['alarmType'];

    this.clickedLocation = '';
    this.clickedRegion = '';
    this.loadLocationChart = false;
    this.loadSystemChart = false;
    this.alarmsCount();
    this.serverityError = false;
    this.systemError = false;
    this.regionError = false;
    this.locationError = false;
    this.severityChartData = null;
    this.systemChartData = null;
    this.locationChartData = null;
    this.regionChartData = null;
    this.severityChartOptions = null;
    this.loading = true;
    this.applyDisabled = true;

    let params = {
      region: fields['region'],
      location: fields['location'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      severity: fields['severity'],
      notificationType: "Alarm",
      historyReport: false,
      category: fields['category'],
      system: fields['system'],
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      alertType: this.issueService.getAlertType()
    }
    params['date'] = this.issueService.getDateParam(fields, this.last24hours);
    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';
    const requests: any = {};

    let types = ['region'];
    this.loadRegionChart = true;

    if (params['region']) {
      this.loadRegionChart = false;
      let index = types.indexOf('region');
      types.splice(index, 1);
      types.push('location');
      this.loadLocationChart = true;
    }

    if (params['location']) {
      this.loadLocationChart = false;
      let index = types.indexOf('location');
      types.splice(index, 1);
      types.push('system');

      this.loadSystemChart = true;
    }


    let diffDays = 10;
    let interval = 'Hours';

    if (fields['date']?.[0]) {
      diffDays = this.chartOptionService.getDateDiff(params);
    }

    if (diffDays > 5) {
      interval = 'Hours';
    } else {
      interval = 'Minutes';
    }

    let obj = {
      byday: `${this.baseUrl}alarmbyInterval?${query}&interval=${interval}`,
      severity: `${this.baseUrl}alarmbySeverity?${query}`,
      region: `${this.baseUrl}alarmbyRegion?${query}`,
      location: `${this.baseUrl}alarmbyLocation?${query}`,
      system: `${this.baseUrl}alarmbySystem?${query}`,
    }


    types.forEach(type => {
      const req = this.http.get(`${obj[type]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }
        ),
      );

      requests[type] = req;

    });

    let that = this;
    let regionChartOptions: any;
    let locationChartOptions: any;
    let systemChartOptions: any;
    this.loaders['alarm']['byday'] = true;
    this.loaders['alarm']['severity'] = true;
    const subscriptions = ['rgn-lctn-stm', 'byday', 'severity'];
    subscriptions?.forEach((sub: any) => {
      this.subscriptionObj[sub]?.unsubscribe();
    });
    this.subscriptionObj['byday'] = this.http.get(obj['byday']).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    ).subscribe((json: any) => {
      this.renderAlarmByDay(json, params, fields);
    });

    this.subscriptionObj['severity'] = this.http.get(obj['severity']).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    ).subscribe((json: any) => {
      this.renderAlarmBySeverity(json, params, fields);
    });


    this.subscriptionObj['rgn-lctn-stm'] = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;



      if (json && typeof json['region'] != 'undefined' && json['region'] && !json['region']['api-error']) {
        this.loadRegionChart = true;
        this.regionError = false;
        regionChartOptions = this.chartOptionService.regionChartOptions(json['region'], true, params);
        this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion(json['region'], 'active', params);
        this.params['alarm']['region'] = params;
        regionChartOptions.plotOptions.series.point.events = {
          dblclick: (event: any) => {
            event.preventDefault();
            //console.log('double click');
          },
          contextmenu: function (event) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedRegion = event.point.series.userOptions.data[index].regionId;
            //that.clickedSeverity = event.point.series.name;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;
            that.params['alarm']['region']['region'] = event.point.series.userOptions.data[index].regionId;
            that.params['alarm']['region']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.deleteParams['alarm']['region']['region'] = true;
            if (!fields['severity']) {
              that.deleteParams['alarm']['region']['severity'] = true;
            }

            let userParams = that.chartOptionService.getUserFilters('alarm', 'region');
            userParams['Region'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            that.gotoFullScreen('region');
          },
          click: function (event) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedRegion = event.point.series.userOptions.data[index].regionId;
            that.getChartByLocation();
          }
        };

        regionChartOptions = Object.assign({}, regionChartOptions);

        if (!this.loadLocationChart) {
          this.Highcharts.chart('regionContainer', regionChartOptions);
        }

      } else {
        if (json['region'] && json['region']['api-error']) {
          this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'active', params);
          this.params['alarm']['region'] = params;
          this.errors['region'] = this.commonOrgService.pageErrorHandle(json['region']);
        } else {
          if (typeof json['region'] !== "undefined") {
            this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'active', params);
            this.params['alarm']['region'] = params;
            regionChartOptions = this.chartOptionService.regionChartOptions([], true, params);
            this.Highcharts.chart('regionContainer', regionChartOptions);
          }


        }
      }

      if (json && typeof json['location'] != 'undefined' && json['location'] && !json['location']['api-error']) {

        this.locationError = false;
        locationChartOptions = this.chartOptionService.locationChartOptions(json['location'], true, params);
        this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation(json['location'], {}, 'active', params);
        this.params['alarm']['location'] = params;

        locationChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            that.clickedLocation = event.point.series.userOptions.data[index].locationId;
            that.getAlarmBySystem('Alarm');
          },
          contextmenu: function (event: any) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedLocation = event.point.series.userOptions.data[index].locationId;
            //that.clickedSeverity = event.point.series.name;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;
            that.params['alarm']['location'] = params;

            that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
            that.params['alarm']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

            if (fields['location'] && fields['location'].indexOf('All') !== -1) {
              that.deleteParams['alarm']['location']['location'] = true;
            }

            if (!fields['severity']) {
              that.deleteParams['alarm']['location']['severity'] = true;
            }
            let userParams = that.chartOptionService.getUserFilters('alarm', 'location');
            userParams['Location'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);

            that.gotoFullScreen('location');
          }
        };

        locationChartOptions = Object.assign({}, locationChartOptions);

        this.Highcharts.chart('locationContainer', locationChartOptions);

        if (this.geoMapIssue != 'true') {
          var elmnt = document.getElementById("dynamic-location-chart-div");
          elmnt.scrollIntoView({ behavior: 'smooth' });
        }

      } else {
        if (json['location'] && json['location']['api-error']) {
          this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'active', params);
          this.params['alarm']['location'] = params;
          this.errors['location'] = this.commonOrgService.pageErrorHandle(json['location']);
        } else {
          if (typeof json['location'] !== "undefined") {
            this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'active', params);
            this.params['alarm']['location'] = params;
            locationChartOptions = this.chartOptionService.locationChartOptions([], true, params);
            this.Highcharts.chart('locationContainer', locationChartOptions);
          }


        }

      }

      if (json && typeof json['system'] != 'undefined' && json['system'] && !json['system']['api-error']) {
        this.systemError = false;
        systemChartOptions = this.chartOptionService.systemChartOptions(json['system'], true, params);
        this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem(json['system'], {}, 'active', params);
        this.params['alarm']['system'] = params;
        systemChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedSystem = event.point.series.userOptions.data[index].systemId;
            //that.clickedSeverity = event.point.series.name;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;
            that.gotoFullScreen('system');
          },
          contextmenu: function (event: any) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedSystem = event.point.series.userOptions.data[index].systemId;
            //that.clickedSeverity = event.point.series.name;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;

            that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
            that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

            if (fields['system'] && fields['system'].indexOf('All') !== -1) {
              that.deleteParams['alarm']['system']['system'] = true;
            }
            if (!fields['severity']) {
              that.deleteParams['alarm']['system']['severity'] = true;
            }

            let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
            userParams['System'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);

            that.gotoFullScreen('system');
          }
        };

        this.Highcharts.chart('systemContainerByClick', systemChartOptions);

        if (this.geoMapIssue != 'true') {
          var elmnt = document.getElementById("dynamic-system-chart-div");
          elmnt.scrollIntoView({ behavior: 'smooth' });
        }


      } else {
        if (json['system'] && json['system']['api-error']) {
          this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'active', params);
          this.params['alarm']['system'] = params;
          this.errors['system'] = this.commonOrgService.pageErrorHandle(json['system']);
        } else {
          if (typeof json['system'] !== "undefined") {
            this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'active', params);
            this.params['alarm']['system'] = params;
            systemChartOptions = this.chartOptionService.systemChartOptions([], true, params);
            this.Highcharts.chart('systemContainerByClick', systemChartOptions);
          }


        }

      }

    }, err => {
      this.pageErrorHandle(err);
    });

  }

  clickedLoctionsObj = {};
  clickedSystemsObj = {};

  getChartByLocation(alarmType = '') {

    this.loaders['alarm']['location'] = true;
    let titlepipe = new TitleCasePipe();
    this.errors['location'] = '';
    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);
    let params = {
      region: this.clickedRegion,
      location: fields['location'],
      system: fields['system'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      severity: fields['severity'],
      notificationType: 'Alarm',
      historyReport: false,
      category: fields['category'],
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      alertType: this.issueService.getAlertType()
    }

    params['date'] = this.issueService.getDateParam(fields, this.last24hours);

    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';

    this.url = `${this.baseUrl}alarmbyLocation?${query}`;

    let regionQuery = `&region=${this.clickedRegion}`;
    let that = this;
    let locationChartOptions: any;
    this.subscriptionObj['locations-list']?.unsubscribe();
    this.subscriptionObj['locations-list'] = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0${regionQuery}&includeDeleted=true`)
      .subscribe((locations: any) => {

        let locObj = {};
        if (locations) {
          locations.forEach((element: any) => {
            locObj[element.id] = {
              name: element.name,
              isDeleted: element.isDeleted
            };
          })
        }

        this.clickedLoctionsObj = locObj;

        this.loadLocationChart = true;
        this.subscriptionObj['alarmbyLocation']?.unsubscribe();
        this.subscriptionObj['alarmbyLocation'] = this.http.get(`${this.url}`).subscribe((res: any) => {

          this.locationError = false;
          locationChartOptions = this.chartOptionService.locationChartOptions(res, true, params, locObj);
          this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation(res, locObj, 'active', params);
          this.params['alarm']['location'] = params;
          locationChartOptions.plotOptions.series.point.events = {
            // click: (event) => {
            //   //console.log(event.point.category);
            //   this.clickedLocation = event.point.series.userOptions.data[0].locationId;
            //   this.getAlarmBySystem(alarmType);
            // },

            click: function (event) {
              let index = $(this.series.data).index(this);
              that.clickedLocation = event.point.series.userOptions.data[index].locationId;
              that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
              that.getAlarmBySystem(alarmType);
            },
            contextmenu: function (event) {
              event.preventDefault();
              let index = $(this.series.data).index(this);
              that.clickedLocation = event.point.series.userOptions.data[index].locationId;
              //that.clickedSeverity = event.point.series.name;
              that.clickedSeverity = event.point.series.userOptions.data[index].severity;
              that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
              that.params['alarm']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

              that.deleteParams['alarm']['location']['location'] = true;
              that.deleteParams['alarm']['location']['severity'] = true;
              let userParams = that.chartOptionService.getUserFilters('alarm', 'location');
              userParams['Location'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              that.gotoFullScreen('location');
            }
          };

          locationChartOptions = Object.assign({}, locationChartOptions);

          this.Highcharts.chart('locationContainer', locationChartOptions);

          var elmnt = document.getElementById("dynamic-location-chart-div");
          elmnt.scrollIntoView({ behavior: 'smooth' });

          this.loaders['alarm']['location'] = false;
        }, (err: HttpErrorResponse) => {
          this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], locObj, 'active', params);
          this.params['alarm']['location'] = params;
          this.locationError = true;
          if (err.status == 401) {
            this.locationErrorInfo = this.language['Access Denied'];
          } else {
            this.locationErrorInfo = this.commonOrgService.pageErrorHandle(err);
          }

          locationChartOptions = null;
          if (this.loadLocationChart) {
            this.Highcharts.chart('locationContainer', locationChartOptions);
          }
          this.loaders['alarm']['location'] = false;
        });

      }, (error) => {
        this.loaders['alarm']['location'] = false;
        this.errors['location'] = this.commonOrgService.pageErrorHandle(error);
      });


  }

  getAlarmBySystem(alarmType = '') {
    this.loaders['alarm']['system'] = true;
    let titlepipe = new TitleCasePipe();
    this.errors['system'] = '';
    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    this.loadSystemChart = true;

    let params = {
      region: this.clickedRegion ? this.clickedRegion : this.regionName,
      location: this.clickedLocation,
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      severity: fields['severity'],
      notificationType: 'Alarm',
      historyReport: false,
      category: fields['category'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      alertType: this.issueService.getAlertType()
    }

    params['date'] = this.issueService.getDateParam(fields, this.last24hours);
    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';

    this.url = `${this.baseUrl}alarmbySystem?${query}`;

    let regionQuery = `&region=${this.clickedRegion}`
    let locationQuery = `&location=${this.clickedLocation}`;
    let that = this;
    let systemChartOptions: any;
    this.subscriptionObj['systems-list']?.unsubscribe();
    this.subscriptionObj['systems-list'] = this.http.get(`${environment.API_BASE_URL}nfa/systems?tenant=0${regionQuery}${locationQuery}&includeDeleted=true`)
      .subscribe((systems: any) => {

        let sysObj = {};
        if (systems) {
          systems.forEach((element: any) => {
            sysObj[element.uuid] = {
              name: element.name,
              isDeleted: element.isDeleted
            };
          })
        }

        this.clickedSystemsObj = sysObj;

        this.subscriptionObj['alarmbySystem']?.unsubscribe();
        this.subscriptionObj['alarmbySystem'] = this.http.get(`${this.url}`).subscribe((res: any) => {

          this.systemError = false;
          systemChartOptions = this.chartOptionService.systemChartOptions(res, true, params, this.clickedLoctionsObj, this.clickedSystemsObj);
          this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem(res, this.clickedSystemsObj, 'active', params);
          this.params['alarm']['system'] = params;
          systemChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              event.preventDefault();
              let index = $(this.series.data).index(this);
              that.clickedSystem = event.point.series.userOptions.data[index].systemId;
              //that.clickedSeverity = event.point.series.name;
              that.clickedSeverity = event.point.series.userOptions.data[index].severity;

              let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
              userParams['System'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

              that.deleteParams['alarm']['system']['system'] = true;
              that.deleteParams['alarm']['system']['severity'] = true;
              that.gotoFullScreen('system');
            },
            contextmenu: function (event) {
              event.preventDefault();
              let index = $(this.series.data).index(this);
              that.clickedSystem = event.point.series.userOptions.data[index].systemId;
              //that.clickedSeverity = event.point.series.name;
              that.clickedSeverity = event.point.series.userOptions.data[index].severity;
              let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
              userParams['System'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

              that.deleteParams['alarm']['system']['system'] = true;
              that.deleteParams['alarm']['system']['severity'] = true;
              that.gotoFullScreen('system');
            },
          };

          systemChartOptions = Object.assign({}, systemChartOptions);

          this.Highcharts.chart('systemContainerByClick', systemChartOptions);

          var elmnt = document.getElementById("dynamic-system-chart-div");
          elmnt.scrollIntoView({ behavior: 'smooth' });

          this.loaders['alarm']['system'] = false;
        }, (err: HttpErrorResponse) => {
          this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], this.clickedSystemsObj, 'active', params);
          this.params['alarm']['system'] = params;
          this.systemError = true;
          if (err.status == 401) {
            this.systemErrorInfo = this.language['Access Denied'];
          } else {
            this.systemErrorInfo = this.commonOrgService.pageErrorHandle(err);
          }

          systemChartOptions = null;
          this.Highcharts.chart('systemContainerByClick', systemChartOptions);
          this.loaders['alarm']['system'] = false;
        });

      }, (error) => {
        this.errors['system'] = this.commonOrgService.pageErrorHandle(error);
        this.loaders['alarm']['system'] = false;
      });



  }

  chartTypeInFS = '';
  fullscreenParams = [];
  gotoFullScreen(chartName: any) {
    this.fullscreenParams = [chartName];
    let chartNameobj = {
      alarmevent: `${this.language['Alarm by Severity']}`,
      severity: `${this.language['Alarm by Severity']}`,
      region: `${this.language['Alarm by Region']}`,
      location: `${this.language['Alarm by Location']}`,
      system: `${this.language['Alarm by System']}`,
    }

    let chartSubHeadingObj = {
      alarm: {
        severity: this.language['Select an alarm to view all instances of that alarm for that severity'],
        region: this.language['Select an alarm to view all instances of that alarm for that region'],
        location: this.language['Select an alarm to view all instances of that alarm for that location'],
        system: this.language['Select an alarm to view all instances of that alarm for that system']
      }
    }

    this.fullScreenChartName = chartNameobj[chartName];

    this.chartTypeInFS = chartName;

    let fields = this.filtersForm.value;
    this.filtersDataInNS = fields;

    this.fullScreenName = chartName;
    this.initLoad = false;
    this.showTable = false;

    let params = this.params['alarm'][chartName];
    params['notificationType'] = 'Alarm';

    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';

    const requests: any = {};

    let types = [];

    let obj = {
      alarmevent: `${this.baseUrl}alarmbyAlarmEvent?${query}`,
      severity: `${this.baseUrl}alarmbySeverity?${query}`,
      region: `${this.baseUrl}alarmbyRegion?${query}`,
      location: `${this.baseUrl}alarmbyLocation?${query}`,
      system: `${this.baseUrl}alarmbySystem?${query}`,
    }

    types = ['alarmevent'];

    types.forEach(type => {
      const req = this.http.get(`${obj[type]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }),
      );

      requests[type] = req;

    });
    this.subscriptionObj['fullscreen']?.unsubscribe();
    this.subscriptionObj['fullscreen'] = forkJoin(requests).subscribe((json: any) => {
      this.fullScreen = true;
      this.loading = false;

      let count = 0;

      if (typeof json['alarmevent'] === "object" && !json['alarmevent']) {
        json['alarmevent'] = [];
      }

      if (json && typeof json['alarmevent'] === "object" && !json['alarmevent']['api-error']) {
        //this.fullScreenChartName = this.language['Alarm by Severity'];
        this.count = this.getCountByData(json['alarmevent']);

        if (!this.count) {
          json['alarmevent'] = [];
        }

        this.fullScrenSubHeading = chartSubHeadingObj['alarm'][chartName.toLowerCase()]

        this.serverityError = false;
        this.errors['alarmevent'] = false;
        let severityChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'raised', 'alarm', chartName);
        severityChartOptions.plotOptions.series.point.events = {
          click: (event) => {

            if (this.searchTerm == event.point.name) {
              return;
            }
            this.searchTerm = event.point.name;

            this.initLoad = false;
            this.showTable = false;

            //this.search(event.point.name);
            if (this.showNewPagination) {
              this.getListSub(event.point.name);
            } else {
              this.search(event.point.name);
            }
          }
        };

        this.Highcharts.chart('fullChartContainer', severityChartOptions);

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList(chartName);
        }

      } else {
        if (json['alarmevent']) {
          this.errors['alarmevent'] = this.commonOrgService.pageErrorHandle(json['alarmevent']);
        }

      }

      if (json && json['severity']) {
        this.fullScreenChartName = this.language['Alarm by Severity'];
        let severityChartData: any = json['severity']['alarm'] ? json['severity']['alarm'] : json['severity'];
        this.serverityError = false;
        let severityChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.raised, "Alarms Raised", "active");

        this.Highcharts.chart('fullChartContainer', severityChartOptions);

        this.count = this.getCountByDataObj(severityChartData);

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('severity');
        }



      }


      if (json && typeof json['region'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by Region'];
        this.loadRegionChart = true;
        this.regionChartData = json['region'];
        this.regionError = false;
        let regionChartOptions: any = this.chartOptionService.regionChartOptions(this.regionChartData, true, params);

        count = this.getCountByData(json['region']);

        this.count = count;

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('region');
        }

        this.Highcharts.chart('fullChartContainer', regionChartOptions);

      }

      if (json && typeof json['location'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by Location'];

        this.locationChartData = json['location'];

        count = this.getCountByData(json['location']);

        this.count = count;

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('location');
        }

        this.locationError = false;
        let locationChartOptions: any = this.chartOptionService.locationChartOptions(this.locationChartData, true, params);

        this.Highcharts.chart('fullChartContainer', locationChartOptions);

      }

      if (json && typeof json['system'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by System'];

        this.systemChartData = json['system'];
        this.systemError = false;
        let systemChartOptions: any = this.chartOptionService.systemChartOptions(this.systemChartData, true, params);

        count = this.getCountByData(json['system']);

        this.count = count;

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('system');
        }

        this.Highcharts.chart('fullChartContainer', systemChartOptions);

      }

      this.fullScreen = true;
      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
    });
  }

  searchTerm = '';
  redraw() {
    if (this.searchTerm) {
      this.search(this.searchTerm);
    } else {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }


  getList(chartName, applyFiltersInFS?: any) {
    if (this.showNewPagination) {
      this.getListSub();
      return;
    }

    if (!this.fullScreen) {
      return;
    }
    let fields = this.filtersForm.value;
    let params = {};

    if (applyFiltersInFS) {
      let category: any;
      if (fields['category'] && fields['category'].length && fields['category'].indexOf('All') === -1) {
        let filtered = fields['category'].filter(function (el) {
          return (el && el.length && el !== 'All');
        });

        category = filtered;
      } else {
        category = undefined;
      }

      let customCategory: any;
      if (fields['customCategory'] && fields['customCategory'].length && fields['customCategory'].indexOf('None') === -1) {
        // let filtered = fields['customCategory'].filter(function (el) {
        //   return (el && el.length && el !== 'All');
        // });

        customCategory = fields['customCategory'];
      } else {
        customCategory = undefined;
      }

      if (fields['eventName'] && fields['eventName'].length && fields['eventName'].indexOf('All') === -1) {
        //
      } else {
        fields['eventName'] = undefined;
      }

      if (this.regionName === 'All') {
        this.regionName = undefined;
      }

      if (this.locationName === 'All') {
        this.locationName = undefined;
      }

      if (this.systemName === 'All') {
        this.systemName = undefined;
      }

      if (fields['severity'] && fields['severity'].toLowerCase() === 'all') {
        fields['severity'] = undefined;
      }
      params = {
        region: this.regionName,
        location: this.locationName,
        system: this.systemName,
        fsan_serialnumber: fields['fsan'] ? fields['fsan'] : '',
        severity: fields['severity'] || 'MAJOR,MINOR,CRITICAL,INFO,WARNING',
        historyReport: false,
        category: category,
        notificationType: 'Alarm',
        alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
        // searchValue: fields['eventName'] ? fields['eventName'] : undefined,
        // searchField: fields['eventName'] ? 'alarmEventName' : undefined
        customCategory: customCategory,
        cco_ack: fields['cco_ack'],
      }

      params['date'] = this.issueService.getDateParam(fields, this.last24hours);

      if (chartName === 'region') {
        delete params['region'];
        delete params['location'];
        delete params['system'];
      }

      if (chartName === 'location') {
        delete params['location'];
        delete params['system'];
      }

    } else {
      params = this.params['alarm'][chartName];
    }
    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';
    this.list = [];
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      //responsive: true,
      serverSide: true,
      processing: false,
      //searching: false,
      lengthChange: false,
      ordering: false,
      //scrollX: true,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {

        let url = `${this.baseUrl}notifications?from=${dataTablesParameters.start}&size=${dataTablesParameters.length}&${query}`;

        if (that.searchTerm) {
          //url += `&alarmEventName=${that.searchTerm}`;

          url += `&searchField=alarmEventName&searchValue=${that.searchTerm}`;
        }

        if (dataTablesParameters.search.value) {
          url = `${this.baseUrl}notifications?from=${dataTablesParameters.start}&size=${dataTablesParameters.length}&${query}&alarmEventName=${dataTablesParameters.search.value}`;
        }

        that.http
          .get(url)
          .subscribe((resp: any) => {

            let data = [];
            if (resp && resp['alarms']) {
              resp['alarms'].forEach(element => {
                if (element && element['subject']) {
                  if (!element['subject']['deviceName']) {
                    element['subject']['deviceName'] = this.systemsObj[element['subject']['deviceId']];

                  }

                  element['subject']['deviceName'] = element['subject']['deviceName']?.replace('device=', '');
                  element['subject']['deviceName'] = element['subject']['deviceName']?.replace('DEVICE=', '');

                  element['subject']['resourceForUI'] = this.issueService.generateResourceForUI(element, (element.type === 'EXA' ? true : false));

                }

                data.push(element);
              });
            }

            this.list = resp['alarms'];

            this.initLoad = true;

            this.loading = false;
            callback({
              recordsTotal: resp['totalCount'] ? resp['totalCount'] : 0,
              recordsFiltered: (dataTablesParameters.search.value && resp) ? resp.length : (resp['totalCount'] ? resp['totalCount'] : 0),
              data: []
            });
          }, (err: any) => {
            this.loading = false;
          });
      }, drawCallback: (settings) => {
        //this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
    this.tableLanguageOptions();
  }


  getCountByData(data: any) {
    let count = 0;
    if (data && data.length) {

      data.forEach((element: any) => {

        // let keys = Object.keys(element['cleared']);
        // keys.forEach((key: any) => {
        //   count += element['cleared'][key];
        // });


        let keys = element['alarm'] && element['alarm']['raised'] ? Object.keys(element['alarm']['raised']) : (element['raised'] ? Object.keys(element['raised']) : []);
        keys.forEach((key: any) => {
          count += (element['alarm'] && typeof element['alarm']['raised'][key] != undefined) ? element['alarm']['raised'][key] : element['raised'][key];
        });

      });

      return count;
    }
  }

  applyFiltersInFS: any = false;

  applyFiltersInFullScreen() {
    this.setSearchQuery('');
    this.searchTerm = '';
    this.alarmsCount();

    this.clickedRegion = '';
    this.clickedLocation = '';
    this.clickedSystem = '';
    this.clickedSeverity = '';

    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);
    this.applyFiltersInFS = true;
    this.loading = true;
    this.applyDisabled = true;
    this.initLoad = false;
    this.showTable = false;

    let params = {
      region: fields['region'],
      location: fields['location'],
      system: fields['system'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      severity: this.clickedSeverity.toLowerCase() || fields['severity'],
      notificationType: 'Alarm',
      historyReport: false,
      category: fields.category,
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      customCategory: fields.customCategory,
      cco_ack: fields['cco_ack'],
      alertType: this.issueService.getAlertType()
    }

    params['date'] = this.issueService.getDateParam(fields);
    let query = this.issueService.buildQuery(params);

    query += '&historyReport=false&cco_shelv=false';

    const requests: any = {};

    let types = [this.fullScreenName];
    this.loadRegionChart = true;

    if (params['region']) {
      this.loadRegionChart = false;
      let index = types.indexOf('severity');
      types.splice(index, 1);

      index = types.indexOf('region');
      types.splice(index, 1);

      types.push('location');
      this.loadLocationChart = true;
    }

    if (params['location']) {
      this.loadLocationChart = false;
      let index = types.indexOf('location');
      types.splice(index, 1);
      types.push('system');

      this.loadSystemChart = true;
    }

    types = ['alarmevent'];

    let obj = {
      alarmevent: `${this.baseUrl}alarmbyAlarmEvent?${query}`,
      severity: `${this.baseUrl}alarmbySeverity?${query}`,
      region: `${this.baseUrl}alarmbyRegion?${query}`,
      location: `${this.baseUrl}alarmbyLocation?${query}`,
      system: `${this.baseUrl}alarmbySystem?${query}`,
    }


    types.forEach(type => {
      const req = this.http.get(`${obj[type]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }),
      );

      requests[type] = req;

    });

    this.closeErrors();
    this.subscriptionObj['applyInFullscreen']?.unsubscribe();
    this.subscriptionObj['applyInFullscreen'] = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;
      let count = 0;

      if (typeof json['alarmevent'] === "object" && !json['alarmevent']) {
        json['alarmevent'] = [];
      }

      if (json && typeof json['alarmevent'] === "object" && !json['alarmevent']['api-error']) {
        this.count = this.getCountByData(json['alarmevent']);

        if (!this.count) {
          json['alarmevent'] = [];
        }
        this.fullScreenChartName = this.language['Alarm by Severity'];
        this.serverityError = false;
        this.chartOptionService.getSubTitle(params, {}, {}, 'alarm', 'severity');

        let severityChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'raised', 'alarm', 'severity');
        severityChartOptions.plotOptions.series.point.events = {
          click: (event) => {
            if (this.searchTerm == event.point.name) {
              return;
            }

            this.searchTerm = event.point.name;

            if (this.showNewPagination) {
              this.getListSub(event.point.name);
            } else {
              this.search(event.point.name);
            }

          }
        };

        this.Highcharts.chart('fullChartContainer', severityChartOptions);

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('severity', true);
        }

      } else {
        if (json['alarmevent']) {
          this.errors['alarmevent'] = this.commonOrgService.pageErrorHandle(json['alarmevent']);
        }

      }

      if (json && json['severity']) {
        this.fullScreenChartName = this.language['Alarm by Severity'];
        let severityChartData: any = json['severity']['alarm'] ? json['severity']['alarm'] : json['severity'];
        this.serverityError = false;
        let severityChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.raised, "Alarms Raised", "active");
        this.Highcharts.chart('fullChartContainer', severityChartOptions);

        count = this.getCountByDataObj(severityChartData);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('severity', true);
        }

        this.showTable = true;

      }


      if (json && typeof json['region'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by Region'];
        this.loadRegionChart = true;
        this.regionChartData = json['region'];
        this.regionError = false;
        let regionChartOptions: any = this.chartOptionService.regionChartOptions(this.regionChartData, true, params);

        count = this.getCountByData(json['region']);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('region', true);
        }

        this.showTable = true;

        this.Highcharts.chart('fullChartContainer', regionChartOptions);

      }

      if (json && typeof json['location'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by Location'];

        this.locationChartData = json['location'];

        count = this.getCountByData(json['location']);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('location', true);
        }

        this.showTable = true;

        this.locationError = false;
        let locationChartOptions: any = this.chartOptionService.locationChartOptions(this.locationChartData, true, params);

        this.Highcharts.chart('fullChartContainer', locationChartOptions);

      }

      if (json && typeof json['system'] != 'undefined') {
        this.fullScreenChartName = this.language['Alarm by System'];

        this.systemChartData = json['system'];
        this.systemError = false;
        let systemChartOptions: any = this.chartOptionService.systemChartOptions(this.systemChartData, true, params);

        count = this.getCountByData(json['system']);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('system', true);
        }

        this.showTable = true;

        this.Highcharts.chart('fullChartContainer', systemChartOptions);

      }

      this.fullScreen = true;
      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
      //console.log(err);
    });

  }


  getCountByDataObj(data: any) {
    let count = 0;
    if (data && data['alarm']) {
      data = data['alarm'];
    }
    if (data && Object.keys(data).length) {

      let pkeys = Object.keys(data);

      pkeys.forEach((pkey: any) => {
        let keys = Object.keys(data[pkey]);
        keys.forEach((key: any) => {
          count += data[pkey][key];
        });

      });

      return count;
    }
  }

  listSub$;
  private searchText$ = new Subject<string>();

  doSearch() {

    this.listSub$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(textEntered => {
        if (this.fullScreen) {
          this.initLoad = false;
          this.showTable = false;
        }
        this.ssoService.setRefreshTokenNew();

        return new Observable(subsciber => subsciber.next(textEntered));
      })
    ).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.showTable = true;
          this.count = 0;
          if (this.fullScreen) {
            if (res) {
              this.getList(this.chartTypeInFS, this.applyFiltersInFS);
            } else {
              this.getList(this.chartTypeInFS, this.applyFiltersInFS);
            }
          }

        }, 100);
      },
      err => {
        this.loading = false;
      }
    );
  }

  search(name: string) {
    if (!name) {
      this.resetALarmEventChart();
    }

    this.searchText$.next(name);
  }

  showAckShelveBtn = false;
  fullData: any = {};
  hideSource = false;
  viewDetails(item: any, index?: any) {
    this.hideSource = false;
    this.index = index;
    this.fullData = item;
    this.showAckShelveBtn = true;
  }

  close(): void {
    this.modalRef.close();
  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');

  }


  changeSeverity() {
    this.clickedSeverity = '';
  }

  changeCategory() {
    // if (this.category && this.category.length) {
    //   let filtered = this.category.filter(function (el) {
    //     return el === "All";
    //   });

    //   if (filtered && filtered.length) {
    //     this.category = ["All"];
    //   }

    // }
  }

  clearSearchInp() {
    this.setSearchQuery('');
    this.searchTerm = '';
    this.search('');
  }

  getCategories() {

    let fields = this.filtersForm.value;

    let params = {
      historyReport: false,
      alertType: this.issueService.getAlertType()
    }

    params['date'] = this.issueService.getDateParam(fields);

    let query = this.issueService.buildQuery(params);
    if (query != "") {
      query += "&";
    }
    query += 'historyReport=false';

    this.http.get(`${this.baseUrl}category?${query}`).subscribe((json: any) => {

      let categories = [
        { id: "All", name: "All" }
      ];
      let alarm = json.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      if (alarm) {
        alarm.forEach(element => {

          if (!element) {
            return;
          }

          categories.push({
            id: element,
            name: element
          })
        });
      }

      this.categories = categories;
    })
  }

  customCategories = [];

  getCustomCategories() {

    this.http.get(`${this.baseUrl}customCategory`).subscribe((json: any) => {
      let categories = [
        { id: "None", name: "None" }
      ];
      let alarm = [];
      json.forEach(element => {
        alarm.push(element.categoryName);
      });
      let items = alarm.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      if (items) {
        items.forEach(element => {

          if (!element) {
            return;
          }

          categories.push({
            id: element,
            name: element
          })
        });
      }

      this.customCategories = categories;
    })
  }

  alarmNames = [];

  getAlarmNames() {
    this.http.get(`${this.baseUrl}alarmEvent?historyalarm=false&notificationType=Alarm&alertType=${this.issueService.getAlertType()}`).subscribe((json: any) => {
      let alarmNames = [
        { id: "All", name: "All" }
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
      if (this.last24hours)
        this.filtersForm.get('eventName').setValue(['loss-of-pon']);
    })
  }

  changeStartDate() {
    if (this.calendar.overlayVisible == false && this.filtersForm.get('date').value) {
      if (!this.filtersForm.get('date').value?.[1]) {
        this.filtersForm.get('date').setValue([this.filtersForm.get('date').value?.[0], (new Date())]);
      }
    }
    console.log(this.filtersForm.get('date').value);
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

  validateCategory(event: any) {
    let categories = this.filtersForm.get('category').value;
    if (!categories.length) {
      categories = ['All'];
    } else if (event.id === 'All') {
      categories = ['All'];
    } else {
      let index = categories.indexOf('All');
      if (index > -1) {
        categories.splice(index, 1);
      }

      this.filtersForm.get('customCategory').setValue('None');

      this.filtersForm.get('fsan').enable();
      this.filtersForm.get('eventName').enable();

    }

    this.filtersForm.get('category').setValue(categories);

  }

  validateCustomCategory(event: any) {
    let categories = this.filtersForm.get('customCategory').value;
    if (event.id === 'None') {
      categories = ['None'];
    } else {
      let index = categories.indexOf('None');
      if (index > -1) {
        categories.splice(index, 1);
      }

    }

    this.filtersForm.get('customCategory').setValue(categories);

  }

  changeCustomCategory(event: any) {
    if (event.id !== 'None') {
      this.filtersForm.get('category').setValue(['All']);
      this.filtersForm.get('fsan').setValue('');
      this.filtersForm.get('eventName').setValue(['All']);

      // this.filtersForm.get('fsan').disable();
      // this.filtersForm.get('eventName').disable();

    }
  }

  validateAlarmEvent(event: any) {
    let almEvnts = this.filtersForm.get('eventName').value;

    if (!almEvnts.length) {
      almEvnts = ['All'];
    } else if (event.id === 'All') {
      almEvnts = ['All'];
    } else {
      let index = almEvnts.indexOf('All');
      if (index > -1) {
        almEvnts.splice(index, 1);
      }

    }

    this.filtersForm.get('eventName').setValue(almEvnts);

  }

  validateAlarmName(event: any) {
    if (this.filtersForm.get('eventName').value?.indexOf('All') === -1 || (this.filtersForm.get('eventName').value?.indexOf('All') !== -1 && this.filtersForm.get('eventName').value?.length > 1)) {
      this.filtersForm.get('customCategory').setValue('None');
    }
  }

  validateFSAN() {
    this.filtersForm.get('customCategory').setValue('None');
    if (this.filtersForm.get('fsan').value.length == 0 || this.filtersForm.get('fsan').value.length == 12) this.fsanvalid = false;
  }

  fsanvalidated($event) {
    let flength = this.filtersForm.get('fsan').value.length
    if (flength != 0 && flength < 12) {
      this.fsanvalid = true; return true;
    }
    else { this.fsanvalid = false; return false }
  }

  closeNotes() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  notes: any = new FormControl('');
  alarmId: any;
  showEdit: boolean = false;
  index: any;
  isNotesModalOpen = false;
  openNotesModal(id: any, notes?: any, isEdit?: any, index?: any) {
    this.btnDisabled = true;
    this.isNotesModalOpen = true;
    this.index = index;
    this.noteError = false;
    this.showEdit = isEdit;
    this.alarmId = id;
    //this.notes = notes ? notes : "";

    if (notes) {
      this.notes.setValue(notes);
    } else {
      this.notes.setValue('');
    }
    this.modalRef = this.dialogService.open(this.addNotesModal, { size: 'lg', centered: false, windowClass: 'custom-modal' });
  }

  openShowNotesModal(notes?: any) {
    this.btnDisabled = true;
    this.isNotesModalOpen = true;
    if (notes) {
      this.notes.setValue(notes);
    } else {
      this.notes.setValue('');
    }
    this.modalRef = this.dialogService.open(this.showNotesModal, { size: 'lg', centered: false, windowClass: 'custom-modal' });
  }

  noteError: boolean = false;
  noteErrorInfo = "";
  noteSaveLoader = false;
  addNotes() {
    this.btnDisabled = true;
    this.noteSaveLoader = true;
    this.url = `${this.baseUrl}notes/${this.alarmId}?notesDescription=${encodeURIComponent(this.notes.value)}&historyReport=false`
    this.btnDisabled = true;
    this.http.put(this.url, "").subscribe((res: any) => {
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   dtInstance.ajax.reload(() => { }, false);
      // });
      for (let i = 0; i <= this.list.length; i++) {
        if (i == this.index) {
          this.list[i]['subject']['notes'] = this.notes.value;
        }
      }
      this.closeNotes();
      this.btnDisabled = false;
      this.noteSaveLoader = false;

    }, (err: HttpErrorResponse) => {
      this.noteError = true;
      this.btnDisabled = false;
      this.noteSaveLoader = false;
      if (err.status == 401) {
        this.noteErrorInfo = this.language['Access Denied'];
      } else {
        this.noteErrorInfo = this.commonOrgService.pageErrorHandle(err);
      }
    });
  }


  deleteId: any;
  deleteIndex: any;
  deleteConfirmModal(id: any, index: any) {
    if (this.modalRef) {
      this.close();
    }
    this.btnDisabled = false;
    this.deleteId = id;
    this.deleteIndex = index;
    this.modalRef = this.dialogService.open(this.deleteModal);
  }

  btnDisabled: boolean = false;
  deleteError: boolean = false;
  deleteErrorInfo = '';
  deleteNotes() {
    this.noteSaveLoader = true;
    this.deleteError = false;
    this.deleteErrorInfo = '';
    this.btnDisabled = true;
    this.url = `${this.baseUrl}notes/${this.deleteId}`
    this.http.delete(this.url).subscribe((res) => {
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   dtInstance.ajax.reload(() => { }, false);
      // });
      for (let i = 0; i <= this.list.length; i++) {
        if (i == this.deleteIndex) {
          if (this.list[i]['subject']['notes']) {
            delete this.list[i]['subject']['notes']
          }
        }
      }
      this.btnDisabled = false;
      this.noteSaveLoader = false;
      this.close()
    }, (err: HttpErrorResponse) => {
      this.btnDisabled = false;
      this.deleteError = true;
      this.noteSaveLoader = false;
      if (err.status == 401) {
        this.deleteErrorInfo = this.language['Access Denied'];
      } else {
        this.deleteErrorInfo = this.commonOrgService.pageErrorHandle(err);
      }
    })
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  download(datatype, chartType) {
    const obj = {
      'alarm': 'Alarms',
      'event': 'Events',
      'region': 'Region', 'location': 'Location', 'system': 'System', 'severity': 'Severity', 'byday': 'Day'
    };
    const data = this.data[chartType][datatype];
    const subTitle = `${this.language[`${obj[chartType]}`]} By ${this.language[`${obj[datatype]}`]} \r\n${this.chartOptionService.getSubTitleStr(chartType, datatype)} \r\n`;
    const filename = `${(this.issueService.getFileTitleMap())?.[this.issueService.getAlertType()]}_ActiveReports_${obj[chartType]}By${obj[datatype]}_${this.dateUtilsService.getDateTimeStrWithOffset()}`;
    if (data.length) {
      this.exportExcelService.downLoadCSV(`${filename}`, data, subTitle);
    }
    else {
      this.exportExcelService.downLoadCSV(`${filename}`, data, subTitle);
    }
  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode  //key = event.charCode;
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

  deleteFullScreenParams() {
    let titlepipe = new TitleCasePipe();
    let pKeys = Object.keys(this.deleteParams);
    pKeys.forEach(pKey => {
      let cKeys = Object.keys(this.deleteParams[pKey]);
      cKeys.forEach(cKey => {
        if (Object.keys(this.deleteParams[pKey][cKey]).length) {
          let gcKeys = Object.keys(this.deleteParams[pKey][cKey]);
          let userParams = this.chartOptionService.getUserFilters(pKey, cKey);

          gcKeys.forEach(gcKey => {
            if (typeof this.params[pKey][cKey][gcKey] !== 'undefined' && this.params[pKey][cKey][gcKey]) {
              delete this.params[pKey][cKey][gcKey];
              this.deleteParams[pKey][cKey][gcKey] = false;
              delete userParams[titlepipe.transform(gcKey)];

            }
          });

          this.chartOptionService.setUserFilters(pKey, cKey, userParams);
        }
      })
    })

  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  resetALarmEventChart() {
    if (this.applyFiltersInFS) {
      this.applyFiltersInFullScreen();
    } else {
      this.gotoFullScreen(this.fullscreenParams[0]);
    }

  }


  onAckShelve(data: any) {
    if (typeof data?.ack !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoAck = data?.ack;
      }
    } else if (typeof data?.shelve !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoShelved = data?.shelve;
      }
    }

  }

  onRefreshAckShelve(value: any) {
    this.showAckShelveBtn = false;
  }

  gotoSubscriberImpactedPage(issue?: any) {
    if (issue) {
      issue.redirectUrl = `/cco/alerts/${this.issueService.getAlertType()?.toLowerCase()}/active-reports`;
    }
    localStorage.setItem('calix.impactedSubsFSANData', JSON.stringify(issue));
    this.router.navigate(['/cco/system/subscribers-impact']);
  }

  getListNew(chartName, applyFiltersInFS?: any, searchTerm?: any, extraQuery?: any) {
    if (!this.fullScreen) {
      return;
    }
    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);
    let params = {};

    if (applyFiltersInFS) {
      params = {
        region: fields['region'],
        location: fields['location'],
        system: fields['system'],
        fsan_serialnumber: fields['fsan'] ? fields['fsan'] : '',
        severity: fields['severity'] || 'MAJOR,MINOR,CRITICAL,INFO,WARNING',
        historyReport: false,
        category: fields['category'],
        notificationType: 'Alarm',
        alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
        customCategory: fields['customCategory'],
        cco_ack: fields['cco_ack'],
        alertType: this.issueService.getAlertType()
      }

      params['date'] = this.issueService.getDateParam(fields, this.last24hours);

      if (chartName === 'region') {
        delete params['region'];
        delete params['location'];
        delete params['system'];
      }

      if (chartName === 'location') {
        delete params['location'];
        delete params['system'];
      }

    } else {
      params = this.params['alarm'][chartName];
    }

    let query = this.issueService.buildQuery(params);

    if (extraQuery) {
      query += `&${extraQuery}`;
    }

    query += '&historyReport=false&cco_shelv=false';
    this.list = [];
    let url = `${this.baseUrl}alarmListByPagination?pageSize=${this.entry.value}&${query}`;

    if (searchTerm) {
      //url += `&alarmEventName=${that.searchTerm}`;
      url += `&searchField=alarmEventName&searchValue=${searchTerm}`;
      this.setSearchQuery(`searchField=alarmEventName&searchValue=${searchTerm}`);
    }

    return this.http.get(url);

  }

  searchSub: any;
  doSearchNew() {
    this.searchSub = fromEvent(document.getElementById('alarms-list-search'), 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((e: any) => {
          this.paginateLoading = true;
          return this.getListNew(this.chartTypeInFS, this.applyFiltersInFS, e.target.value).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            }
            ),
          );
        }),
      )
      .subscribe(resp => {
        this.list = [];
        this.paginateLoading = false;
        if (resp['api-error']) {
          return;
        }
        this.processListResp(resp);
      });
  }
  paginateLoading = false;
  getListSub(searchTerm?: any, extraQuery?: any) {
    this.paginateLoading = true;
    this.previousFlag = false;
    this.nextFlag = false;
    this.getListNew(this.chartTypeInFS, this.applyFiltersInFS, searchTerm, extraQuery).subscribe((resp: any) => {
      this.processListResp(resp);
    }, (err: any) => {
      //TODO
    }, () => {
      this.paginateLoading = false;
    });
    this.tableLanguageOptions();
  }

  processListResp(resp: any) {
    this.previousFlag = resp?.previousFlag;
    this.nextFlag = resp?.nextFlag;
    if (resp?.['alarms']) {
      resp['alarms'].forEach(element => {
        if (!element['subject']['deviceName']) {
          element['subject']['deviceName'] = this.systemsObj[element['subject']['deviceId']];
        }

        element['subject']['deviceName'] = element['subject']['deviceName']?.replace('device=', '');
        element['subject']['deviceName'] = element['subject']['deviceName']?.replace('DEVICE=', '');
        element['subject']['resourceForUI'] = this.issueService.generateResourceForUI(element, (element.type === 'EXA' ? true : false));
      });
    }

    this.list = resp?.['alarms'] ? resp['alarms'] : [];

    this.loading = false;

  }

  gotoPrevious() {
    if (!this.previousFlag) {
      return;
    }
    let extraQuery = `from=${this.list[0]?.sort?.join()}&paginate=PREVIOUS`;
    if (this.searchQuery) {
      extraQuery += `&${this.searchQuery}`;
    }
    this.getListSub('', extraQuery);
  }

  gotoNext() {
    if (!this.nextFlag) {
      return;
    }
    let length = this.list?.length;
    let extraQuery = `from=${this.list[length - 1]?.sort?.join()}&paginate=NEXT`;
    if (this.searchQuery) {
      extraQuery += `&${this.searchQuery}`;
    }
    this.getListSub('', extraQuery);
  }

  setPaginateQuery(query) {
    this.paginateQuery = query;
  }

  listenChangeEntries() {
    this.entry.valueChanges.subscribe((value: any) => {
      if (!value) {
        this.entry.setValue(10);
      }
      if (!this.fullScreen) {
        return;
      }
      this.getListSub('', this.searchQuery);
    });

  }

  searchQuery = '';
  setSearchQuery(value) {
    this.searchQuery = value;
  }

  setAppliedFilters() {
    const removeFilters = this.issueService.getRemoveFiltersData();
    const alertType = this.issueService.getAlertType();
    removeFilters[alertType]?.forEach((ele: any) => {
      this.appliedFilters[ele] = false;
    });

  }

  renderAlarmByDay(json: any, params: any, fields: any) {

    if (json && typeof json === "object" && json && !json['api-error']) {
      let options: any = this.chartOptionService.getLineChartOptionForActiveReports(json, true, params, fields, this.last24hours);
      this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay(json, 'active');
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: this.language['duration'],
        }
      });

      this.Highcharts.stockChart('event-alarm-line-chart-container', options);
    } else {
      if (json && json['api-error']) {
        this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([], 'active');
        this.errors['byday'] = this.commonOrgService.pageErrorHandle(json);
      } else {
        if (typeof json !== "undefined") {
          this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([], 'active');
          let options: any = this.chartOptionService.getLineChartOptionForActiveReports([], true, params, fields, this.last24hours);
          Highcharts.setOptions({
            lang: {
              rangeSelectorZoom: this.language['duration'],
            }
          });
          this.Highcharts.chart('event-alarm-line-chart-container', options);
        }

      }

    }

    this.loaders['alarm']['byday'] = false;

  }

  removeAllValues(fields: any) {
    ['severity', 'category', 'customCategory', 'eventName', 'system', 'region', 'location'].forEach((element: any) => {
      if (fields[element]?.indexOf('All') !== -1 || fields[element]?.indexOf('None') !== -1) {
        fields[element] = undefined;
      }
    });

    return fields;
  }

  renderAlarmBySeverity(json: any, params: any, fields: any) {
    const that = this;
    const titlepipe = new TitleCasePipe();
    if (json && typeof json === "object" && json && !json['api-error']) {
      let severityChartData: any = json['alarm'] ? json['alarm'] : {};
      this.serverityError = false;
      let severityChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.raised, "Alarms Raised", "active", params);
      this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity(severityChartData, 'active', params);
      this.params['alarm']['severity'] = params;
      severityChartOptions.plotOptions.series.point.events = {
        dblclick: (event: any) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();

          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);

          this.gotoFullScreen('severity');
        },
        contextmenu: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity');
        },
        click: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();

          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);

          this.gotoFullScreen('severity');
        }
      };
      this.Highcharts.chart('severityContainer', severityChartOptions);

    } else {
      if (json && json['api-error']) {
        this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'active', params);
        this.params['alarm']['severity'] = params;
        this.errors['severity'] = this.commonOrgService.pageErrorHandle(json);
      } else {
        if (typeof json !== "undefined") {
          this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'active', params);
          this.params['alarm']['severity'] = params;
          let severityChartOptions = this.chartOptionService.severityChartOptions([], "Alarms Raised", "active", params);
          this.Highcharts.chart('severityContainer', severityChartOptions);

          let data: any = { "type": "Raised", "critical": 0, "major": 0, "minor": 0, "warning": 0, "info": 0 }
          this.data['severity'] = [data];
        }
      }

    }

    this.loaders['alarm']['severity'] = false;
  }

}

