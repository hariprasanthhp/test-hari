
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import * as Highcharts from "highcharts/highstock";
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { HistoryChartOptionsService } from '../service/history-chart-options.service';
import { IssueService } from '../../service/issue.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, fromEvent, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';

const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
import customEvents from 'highcharts-custom-events';
import { DatePipe, TitleCasePipe } from '@angular/common';
customEvents(Highcharts);

import { FormBuilder, FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { Title } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

(function (Highcharts: any) {
  Highcharts.seriesTypes.line.prototype.drawLegendSymbol = Highcharts.seriesTypes.area.prototype.drawLegendSymbol;
})(Highcharts);

@Component({
  selector: 'app-historyissue',
  templateUrl: './historyissue.component.html',
  styleUrls: ['./historyissue.component.scss']
})
export class HistoryissueComponent implements OnInit {
  subscriptionObj: any = {};
  @ViewChild('calendar') private calendar: any;
  skipParamsForEvents = ['severity', 'cco_ack', 'cco_shelv', 'customCategory'];
  showNewPagination = true;
  disableExportBtn = false;
  appliedParams: any = {};
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

  loaders = {
    alarm: {
      'byday': false,
      'severity': false,
      'region': false,
      'location': false,
      'system': false,
    },
    event: {
      'region': false,
      'location': false,
      'system': false,
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

  maxDate = new Date();
  maxForStartDate = new Date();
  minDate: any;
  //minForEndDatee = new Date();
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
  serverityEventError: boolean = false;
  systemEventError: boolean = false;
  locationEventError: boolean = false;
  regionEventError: boolean = false;
  fullScreenError: boolean = false;

  errorInfo: any;
  serverityErrorInfo: any;
  systemErrorInfo: any;
  locationErrorInfo: any;
  regionErrorInfo: any;
  serverityEventErrorInfo: any;
  systemEventErrorInfo: any;
  locationEventErrorInfo: any;
  regionEventErrorInfo: any;
  fullScreenErrorInfo: any;

  btnDisabled: boolean = false;
  applyDisabled: boolean = false;
  DateValue: any = '1';
  Region: any;
  Location: any;
  System: any;
  FSAN: any;
  Severity: any;
  category: any = ['All'];
  loadLocationChart: boolean = false;
  loadAalarmLocationChart: boolean = false;
  loadEventLocationChart: boolean = false;
  Highcharts = Highcharts;
  fullScreenChartName: string;
  fullScreenName: string;
  fullScreenData: any;

  totalAlarms: any = 0;
  criticalAlarms: any;
  majorAlarms: any;
  minorAlarms: any;

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
  regionParam = "";
  locationParam = "";
  systemParam = "";
  FSANParam = "";
  severityParam = "";
  alarmTypeParam = "";
  dateParam = ""
  typeParam = "historyReport=true"
  fullScreen: boolean = false
  paseWeekValue: number = 1;
  pastMonthValue: number = 1;
  alarmType: any = 'Alarm';
  alarmBy: any = "";
  alarmEventName: any = "";

  regionSelected: any;
  regionsDataArray = ["All"];
  regionArray = ["All"];
  locationSelected: any;
  locationDataArray = ["All"];
  systemSelected: any
  systemDataArray = ["All"];

  regionName: any;
  locationName: any;
  systemName: any;

  allLocationData: Array<any>;
  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;
  FromDate: any;
  ToDate: any;
  eventName: any;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  @ViewChild('addNotesModal', { static: true }) private addNotesModal: TemplateRef<any>;
  @ViewChild('showNotesModal', { static: true }) private showNotesModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('addSubscriberInfoModel', { static: true }) private addSubscriberInfoModel: TemplateRef<any>;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  showSevertiyFullChart: boolean = false;
  fullScrenSubHeading: string = '';

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
  shelvedAlarms = [
    { id: 'all', name: 'All' },
    { id: 'false', name: 'Hide Shelved Alarms' },
    { id: 'true', name: 'Show Shelved Alarms' }
  ];

  entries = [
    { id: 10, name: 10 },
    { id: 25, name: 25 },
    { id: 50, name: 50 },
    { id: 100, name: 100 }
  ]

  chartId: any;
  setClear: boolean = true;
  both: boolean = false;
  categoryParam: string;
  list: any[];

  filtersForm = this.fb.group({
    date: [undefined],
    alarmType: [''],
    region: [''],
    location: [''],
    system: [''],
    fsan: [''],
    severity: [''],
    category: [''],
    customCategory: [''],
    eventName: 'All',
    cco_ack: 'all',
    cco_shelv: 'all'
  });


  appliedFilters = {
    date: true,
    alarmType: false,
    region: true,
    location: true,
    system: true,
    fsan: true,
    severity: true,
    category: true,
    eventName: true,
    customCategory: true,
    cco_ack: true,
    cco_shelv: true
  }


  filtersDataInNS: any;
  tableCounts: any;
  fsanvalid: boolean;
  eventCountData: any;
  totalEvents: boolean;
  warningAlarms: any;
  warningData: any;
  subscriberInfosub: any;
  Infosub: boolean;
  subscriberInfo: any;
  alarmTypesToExport: string[] = [];
  timeZone: string;
  exportParams = {};
  exportAlarmCount = 0;
  toggleSubscription: any;
  isDev: boolean = false;
  clearedCountData: any;
  totalAlarms_cleared: any = 0;
  systemsObj = {};
  hasWriteAccess: boolean = false;
  previousFlag = false;
  nextFlag = false;

  urls = this.router.url;
  constructor(
    private translateService: TranslateService,
    private chartOptionService: HistoryChartOptionsService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private exportExcelService: ExportExcelService,
    private issueService: IssueService,
    private dialogService: NgbModal,
    private fb: FormBuilder,
    public ssoService: SsoAuthService,
    private dateUtilsService: DateUtilsService,
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
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.doSearchNew();
    }, 1000);
    let date = new Date();
    this.minDate = new Date(date.getTime() - (90 * 24 * 60 * 60 * 1000))
    this.setAppliedFilters()
    this.timeZone = new Date().toString().split(" ")[5].replace(/(.{2})$/, ':$1');
    this.Severity = 'all';
    let fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    let toDate = new Date();


    this.filtersForm.patchValue({
      date: [fromDate, toDate],
      alarmType: this.issueService.getAlertType() === 'EVENTS' ? 'Event' : 'Alarm',
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: 'All',
      category: ['All'],
      customCategory: 'None',
      eventName: ['All'],
      cco_ack: 'all',
      cco_shelv: 'all'
    });
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.tableLanguageOptions();
      this.language = data;
      setTimeout(() => {
        this.loadIntialData();
      }, 1000)

      if (this.showTable) {
        this.redraw();
      }
      this.setTitle()
    });
    this.setTitle()




    this.ToDate = new Date();

    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      const alertScopes = this.issueService.getAlertScopes();
      if (scopes?.[alertScopes?.[this.issueService.getAlertType()]] || scopes?.[alertScopes?.[this.issueService.getAlertType()]?.history]) {
        this.hasScopeAccess = true;

        if (this.issueService.getAlertType() === 'EVENTS') {
          if (scopes?.[alertScopes?.[this.issueService.getAlertType()]]?.indexOf('write') !== -1) {
            this.hasWriteAccess = true;
          }
        } else {
          if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.history]?.indexOf('write') !== -1) {
            this.hasWriteAccess = true;
          }
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

    this.getCategories();
    if (this.appliedFilters.customCategory) {
      this.getCustomCategories();
    }

    let type = this.issueService.getAlertType() === 'EVENTS' ? 'Event' : 'Alarm';
    this.getAlarmNames(type);
    this.loadRegionsSystemsOptionsData();

    if (history?.state?.filters) {
      this.filtersForm.patchValue(history.state.filters)
    }
  }
  isNotesModalOpen = false;
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


  titleValue: any
  titleObject: any
  setTitleValue: any
  setTitle() {
    if (this.issueService.getAlertType() === 'EVENTS') {
      this.titleService.setTitle(` ${this.issueService.getPageTitle()[this.issueService.getAlertType()]} - ${this.language['Alerts']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
    else {
      this.titleService.setTitle(`${this.language['Historical Reports']} - ${this.issueService.getPageTitle()[this.issueService.getAlertType()]} - ${this.language['Alerts']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
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
      if (json?.regions?.['api-error']) {
        this.loadIntialData();
        return;
      }
      this.regionSelected = 'All';
      this.locationSelected = "All";
      this.systemSelected = "All";
      let res = json['regions'];
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



      let systems = json['systems'];
      this.systemsObj = {};
      let sysObj = {};
      if (systems) {
        systems.forEach((element: any) => {
          sysObj[element.uuid] = element.name;
        })
      }
      this.systemsObj = sysObj;
      this.loadIntialData();
    });

  }

  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.clickedEventRegion = '';
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
        this.regionName = null;
        this.locationName = null;
        this.systemName = null;
        this.locationDataArray = ["All"];
        this.systemDataArray = ["All"];
      }



    }

  }

  loadSystemValue(event?: any) {
    this.clickedRegion = '';
    this.clickedEventRegion = '';
    this.clickedLocation = '';
    this.clickedEventLocation = '';
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

        }, (error) => {
        });

      this.locationName = locationids;
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

  selectSystem(event: any) {
    let systemid = this.filtersForm.get('system').value;
    this.systemName = systemid

    if (systemid == 'All') {
      this.systemName = null;
    }
  }

  showSeverity = true;
  showAlarmGroup = true;
  showAckShelve = true;
  selectAlarmType() {
    this.getCategories();

    let alarmType = this.filtersForm.get('alarmType').value;
    this.showSeverity = true;
    this.showAlarmGroup = true;
    this.showAckShelve = true;
    if (alarmType == 'Alarm') {
      this.eventName = null;
      this.getAlarmNames('Alarm');
    } else if (alarmType == 'Event') {
      this.showSeverity = false;
      this.showAlarmGroup = false;
      this.showAckShelve = false;
      this.filtersForm.get('severity').setValue('All');
      this.getAlarmNames('Event');
    } else {
      this.getAlarmNames('Both');
    }
    if (alarmType == 'Event') {
      this.filtersForm.get('customCategory').setValue('None');
    }
  }

  alarmsCount() {
    let fields = this.filtersForm.value;
    this.dateParam = `&date=${this.issueService.getDateParam(fields)}`;
    this.issueService.filterCounts(this.dateParam);
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
    this.DateValue = null;
    this.Region = null;
    this.Location = null;
    this.System = null;
    this.FSAN = null;
    this.eventName = null;
    this.regionSelected = undefined;
    this.locationSelected = undefined;
    this.systemSelected = undefined;
    this.alarmType = 'Alarm';
    this.Severity = null;
    this.severityParam = '';
    this.regionParam = '';
    this.locationParam = '';
    this.systemParam = '';
    this.FSANParam = '';
    this.dateParam = '';
    this.category = null;
    this.alarmEventName = '';
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    //this.applyfilter(true);
    this.showSeverity = true;
    this.showAlarmGroup = true;
    this.filtersForm.get('category').enable();
    this.filtersForm.get('customCategory').enable();

    this.regionName = undefined;
    this.locationName = undefined;
    this.systemName = undefined;

    let date = new Date();
    let fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    let toDate = new Date();

    this.maxDate = new Date();
    this.maxForStartDate = new Date();

    this.filtersForm.patchValue({
      alarmType: this.issueService.getAlertType() === 'EVENTS' ? 'Event' : 'Alarm',
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: 'All',
      category: ['All'],
      fsan: '',
      customCategory: 'None',
      eventName: ['All'],
      cco_ack: 'all',
      cco_shelv: 'all'
    });

    this.filtersForm.get('date').setValue([fromDate, toDate]);

    this.getCategories();
    this.loadIntialData();

  }

  fullScreenInvertFunction() {
    this.setSearchQuery('');
    this.fullscreenParams = [];
    this.deleteFullScreenParams();
    this.clickedAlarmTypeInBC = '';
    this.clickOnClearedAlarms = false;
    this.clickOnRaisedAlarms = false;

    this.searchTerm = '';
    this.clickedSeverity = '';
    // this.clickedRegion = '';
    // this.clickedSeverity = '';
    this.clickedSystem = '';
    this.fullScreen = false;
    this.searchText$.next('');
    this.entry.setValue(10);
    this.showSevertiyFullChart = false;
    //this.loadIntialData();

    //this.filtersForm.patchValue(this.filtersDataInNS);

    if (this.applyFiltersInFS) {
      this.applyFiltersInFS = false;
      this.loadIntialData();
    }

  }

  closeAlert() {
    this.error = false;
  }

  filterApplied = false;

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loading = false;
  }

  clickedRegion = '';
  clickedEventRegion = '';
  clickedLocation = '';
  clickedEventLocation = '';
  clickedSystem = '';

  clickedLoctionsObj = {};
  clickedSystemsObj = {};

  clickedEventLoctionsObj = {};
  clickedEventSystemsObj = {};

  getChartByLocation(alarmType = '') {
    let titlepipe = new TitleCasePipe();
    this.errors['location'] = '';

    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    if (!alarmType) {
      alarmType = this.alarmType;
    }

    let region = '';
    if (alarmType == 'Alarm') {
      region = this.clickedRegion ? this.clickedRegion : this.regionName;
      this.loaders['alarm']['location'] = true;
    } else {
      region = this.clickedEventRegion ? this.clickedEventRegion : this.regionName;
      this.loaders['event']['location'] = true;
    }

    let params = {
      region: region,
      location: fields.location,
      system: fields.system,
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      severity: fields['severity'],
      notificationType: alarmType,
      historyReport: true,
      //status: 'Both',
      category: fields['category'],
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['alertType'] = this.appendAlarmType(params);
    if (params['notificationType'] !== 'Alarm') {
      let skipParams = ['customCategory', 'severity', 'cco_ack', 'cco_shelv'];
      skipParams.forEach(param => {
        delete params[param];
      });
    }

    params['date'] = this.issueService.getDateParam(fields);

    if (params['notificationType'] === 'Event') {
      delete params['severity'];
      delete params['status'];
    }


    let query = this.issueService.buildQuery(params);

    let regionQuery = `&region=${params['region']}`;
    let that = this;

    if (this.alarmType === 'Both') {
      this.bothLocation = true;
      if (alarmType === 'Alarm') {
        this.bothLocationAlarm = true;
      } else {
        this.bothLocationEvent = true;
      }
    } else {
      this.loadLocationChart = true;
    }
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

        if (alarmType == 'Alarm') {
          this.clickedLoctionsObj = locObj;
        } else {
          this.clickedEventLoctionsObj = locObj;
        }


        this.url = `${this.baseUrl}alarmbyLocation?${query}`;
        let locationChartOptions: any;
        this.subscriptionObj['alarmbyLocation']?.unsubscribe();
        this.subscriptionObj['alarmbyLocation'] = this.http.get(`${this.url}`).subscribe((res: any) => {
          this.locationChartData = res;

          this.locationError = false;
          if (alarmType == 'Alarm') {
            locationChartOptions = this.chartOptionService.locationChartOptions(res, false, params, locObj);
            this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation(res, locObj, 'histoy', params);
            this.params['alarm']['location'] = params;
          } else {
            locationChartOptions = this.chartOptionService.getEventOptions(res, 'location', params, locObj);
            this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation(res, locObj);
            this.params['event']['location'] = params;
          }

          locationChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              //console.log(event);
              let index = $(this.series.data).index(this);
              if (alarmType == 'Alarm') {
                that.clickedLocation = event.point.series.userOptions.data[index].locationId;
              } else {
                that.clickedEventLocation = event.point.series.userOptions.data[index].uuid;
              }

              that.getAlarmBySystem(alarmType);
            },
            contextmenu: function (event) {
              event.preventDefault();
              let index = $(this.series.data).index(this);
              if (alarmType == 'Alarm') {
                that.clickedLocation = event.point.series.userOptions.data[index].locationId;
                that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
                that.params['alarm']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['alarm']['location']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['alarm']['location']['location'] = true;
                that.deleteParams['alarm']['location']['severity'] = true;
                that.deleteParams['alarm']['location']['status'] = true;

              } else {
                that.clickedEventLocation = event.point.series.userOptions.data[index].uuid;
                that.params['event']['location']['location'] = event.point.series.userOptions.data[index].uuid;
                that.params['event']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['event']['location']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['event']['location']['location'] = true;
              }
              that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
              let userParams = that.chartOptionService.getUserFilters('alarm', 'location');
              userParams['Location'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);
              that.gotoFullScreen('location', alarmType, locObj);
            },
          };

          locationChartOptions = Object.assign({}, locationChartOptions);

          if (this.alarmType === 'Both') {
            this.bothLocation = true;
            if (alarmType === 'Alarm') {
              this.bothLocationAlarm = true;
              this.Highcharts.chart('location-alarm-container-both', locationChartOptions);
            } else {
              this.bothLocationEvent = true;
              this.Highcharts.chart('location-event-container-both', locationChartOptions);
            }

            setTimeout(() => {
              var elmnt = document.getElementById("both-locationwrapper");
              elmnt.scrollIntoView({ behavior: 'smooth' });
            }, 300);


          } else {
            this.Highcharts.chart('locationContainer', locationChartOptions);
            var elmnt = document.getElementById("dynamic-location-chart-div");
            elmnt.scrollIntoView({ behavior: 'smooth' });
          }

          this.loaders['alarm']['location'] = false;
          this.loaders['event']['location'] = false;


          this.loading = false;
        }, (err: HttpErrorResponse) => {
          this.loaders['alarm']['location'] = false;
          this.loaders['event']['location'] = false;
          this.locationError = true;
          if (err.status == 401) {
            this.locationErrorInfo = this.language['Access Denied'];
          } else {
            this.locationErrorInfo = this.commonOrgService.pageErrorHandle(err);
          }
          if (this.alarmType == 'Both') {

            this.bothLocation = true;
            this.loadLocationChart = false;
            if (alarmType === 'Alarm') {
              this.bothLocationAlarm = true;
            } else {
              this.bothLocationEvent = true;
            }

            this.locationEventError = true;
            this.locationEventErrorInfo = this.locationErrorInfo
          }
          locationChartOptions = null;
          if (this.loadLocationChart) {
            this.Highcharts.chart('locationContainer', locationChartOptions);
          }
          this.loading = false;
        });

      }, (error) => {
        this.loaders['alarm']['location'] = false;
        this.loaders['event']['location'] = false;
        this.errors['location'] = this.commonOrgService.pageErrorHandle(error);
      });
  }

  loadSystemChart = false;
  getAlarmBySystem(alarmType = '') {
    let titlepipe = new TitleCasePipe();
    this.errors['system'] = '';
    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    if (!alarmType) {
      alarmType = this.alarmType;
    }

    if (this.alarmType === 'Both') {
      this.bothSystem = true;
      if (alarmType === 'Alarm') {
        this.bothSystemAlarm = true;
      } else {
        this.bothSystemEvent = true;
      }
    } else {
      this.loadSystemChart = true;
    }

    let region = '';
    let location = '';
    if (alarmType == 'Alarm') {
      region = this.clickedRegion ? this.clickedRegion : this.regionName;
      location = this.clickedLocation;
      this.loaders['alarm']['system'] = true;
    } else {
      region = this.clickedEventRegion ? this.clickedEventRegion : this.regionName;
      location = this.clickedEventLocation;
      this.loaders['event']['system'] = true;
    }

    let params = {
      region: region,
      location: location,
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      severity: fields['severity'],
      notificationType: alarmType,
      historyReport: true,
      category: fields['category'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['alertType'] = this.appendAlarmType(params);

    if (params['notificationType'] !== 'Alarm') {
      let skipParams = ['customCategory', 'severity', 'cco_ack', 'cco_shelv'];
      skipParams.forEach(param => {
        delete params[param];
      });
    }

    params['date'] = this.issueService.getDateParam(fields);

    if (params['notificationType'] === 'Event') {
      delete params['severity'];
      delete params['status'];
    }


    let query = this.issueService.buildQuery(params);

    //let regionQuery = `&region=${this.clickedRegion}`
    let regionQuery = `&region=${params['region']}`
    let locationQuery = `&location=${params['location']}`;
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

        if (alarmType == 'Alarm') {
          this.clickedSystemsObj = sysObj;
        } else {
          this.clickedEventSystemsObj = sysObj;
        }


        this.url = `${this.baseUrl}alarmbySystem?${query}`;
        this.subscriptionObj['alarmbySystem']?.unsubscribe();
        this.subscriptionObj['alarmbySystem'] = this.http.get(`${this.url}`).subscribe((res: any) => {
          this.systemError = false;
          if (alarmType == 'Alarm') {
            systemChartOptions = this.chartOptionService.systemChartOptions(res, false, params, this.clickedLoctionsObj, this.clickedSystemsObj);
            this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem(res, this.clickedSystemsObj, 'histoy', params);
            this.params['alarm']['system'] = params;
          } else {
            systemChartOptions = this.chartOptionService.getEventOptions(res, 'system', params, this.clickedEventLoctionsObj, this.clickedEventSystemsObj);
            this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem(res, this.clickedEventSystemsObj);
            this.params['event']['system'] = params;
          }

          systemChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              event.preventDefault();
              let locObj = {};
              that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
              let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
              userParams['System'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);

              if (alarmType == 'Alarm') {
                that.clickedSystem = event.point.series.userOptions.data[index].systemId;
                locObj = that.clickedLoctionsObj;
                that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
                that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['alarm']['system']['system'] = true;
                that.deleteParams['alarm']['system']['severity'] = true;
                that.deleteParams['alarm']['system']['status'] = true;

                that.gotoFullScreen('system', alarmType, locObj, that.clickedSystemsObj);

              } else {
                that.clickedSystem = event.point.series.userOptions.data[index].uuid;
                locObj = that.clickedEventLoctionsObj;
                that.params['event']['system']['system'] = event.point.series.userOptions.data[index].uuid;
                that.params['event']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['event']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['event']['system']['system'] = true;

                that.gotoFullScreen('system', alarmType, locObj, that.clickedEventSystemsObj);
              }


            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              event.preventDefault()
              let locObj = {};
              that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;

              let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
              userParams['System'] = event.point.category;
              userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
              userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);
              if (alarmType == 'Alarm') {
                that.clickedSystem = event.point.series.userOptions.data[index].systemId;
                locObj = that.clickedLoctionsObj;
                that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
                that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['alarm']['system']['system'] = true;
                that.deleteParams['alarm']['system']['severity'] = true;
                that.deleteParams['alarm']['system']['status'] = true;

                that.gotoFullScreen('system', alarmType, locObj, that.clickedSystemsObj);

              } else {
                that.clickedSystem = event.point.series.userOptions.data[index].uuid;
                locObj = that.clickedEventLoctionsObj;
                that.params['event']['system']['system'] = event.point.series.userOptions.data[index].uuid;
                that.params['event']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
                that.params['event']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

                that.deleteParams['event']['system']['system'] = true;

                that.gotoFullScreen('system', alarmType, locObj, that.clickedEventSystemsObj);
              }



            },
          };

          systemChartOptions = Object.assign({}, systemChartOptions);



          if (this.alarmType === 'Both') {
            this.bothSystem = true;
            if (alarmType === 'Alarm') {
              this.bothSystemAlarm = true;
              this.Highcharts.chart('system-alarm-container-both', systemChartOptions);
            } else {
              this.bothSystemEvent = true;
              this.Highcharts.chart('system-event-container-both', systemChartOptions);
            }

            setTimeout(() => {
              var elmnt = document.getElementById("both-systemwrapper");
              elmnt.scrollIntoView({ behavior: 'smooth' });
            }, 300);


          } else {
            this.Highcharts.chart('systemContainerByClick', systemChartOptions);
            var elmnt = document.getElementById("dynamic-system-chart-div");
            elmnt.scrollIntoView({ behavior: 'smooth' });
          }

          this.loaders['alarm']['system'] = false;
          this.loaders['event']['system'] = false;



          this.loading = false;
        }, (err: HttpErrorResponse) => {
          this.loaders['alarm']['system'] = false;
          this.loaders['event']['system'] = false;
          this.systemError = true;
          if (err.status == 401) {
            this.systemErrorInfo = this.language['Access Denied'];
          } else {
            this.systemErrorInfo = this.commonOrgService.pageErrorHandle(err);
          }

          if (this.alarmType === 'Both') {
            this.systemEventError = true;
            this.systemEventErrorInfo = this.systemErrorInfo;
            this.bothSystem = true;
            if (alarmType === 'Alarm') {
              this.bothSystemAlarm = true;
              this.Highcharts.chart('system-alarm-container-both', systemChartOptions);
            } else {
              this.bothSystemEvent = true;
              this.Highcharts.chart('system-event-container-both', systemChartOptions);
            }
          } else {
            this.Highcharts.chart('systemContainerByClick', systemChartOptions);
          }

          systemChartOptions = null;
          this.Highcharts.chart('systemContainerByClick', systemChartOptions);
          this.loading = false;
        });
      }, (error) => {
        this.errors['system'] = this.commonOrgService.pageErrorHandle(error);
        this.loaders['alarm']['system'] = false;
        this.loaders['event']['system'] = false;
      });
  }

  listObs: any;
  loadRegionChart = true;
  clickedSeverity = '';

  hasScopeAccess = false;

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

  /**
   * clicked severity in bar chart
   */
  clickedAlarmTypeInBC = '';
  loadIntialData() {
    if (this.fsanvalidated("d")) return;
    let titlepipe = new TitleCasePipe();
    this.clickedLoctionsObj = {};
    this.clickedSystemsObj = {};
    this.clickedSeverity = '';
    this.closeErrors();

    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    if (this.fullScreen) {
      this.deleteFullScreenParams();
      this.applyFiltersInFullScreen();
      return;
    }

    this.alarmType = fields['alarmType'];
    this.clickedLocation = '';
    this.clickedEventLocation = '';
    this.clickedRegion = '';
    this.clickedEventRegion = '';
    this.clickedSystem = '';
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
    this.systemChartOptions = null;
    this.locationChartOptions = null;
    this.regionChartOptions = null;

    this.loading = true

    this.applyDisabled = true;

    if (this.alarmType == 'Both') {
      this.both = true;
      this.loadBothDataNew();
      return;
    } else {
      this.both = false;
    }

    let params = {
      region: fields['region'],
      location: fields['location'],
      fsan_serialnumber: fields['fsan'],
      alarmEventName: fields['eventName'],
      severity: fields['severity'],
      notificationType: fields['alarmType'],
      historyReport: true,
      //status: 'Both',
      category: fields['category'],
      customCategory: fields['customCategory'],
      system: fields['system'],
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['alertType'] = this.appendAlarmType(params);
    this.issueService.setAppliedFilters(params);

    if (params['notificationType'] !== 'Alarm') {
      delete params['cco_ack'];
      delete params['cco_shelv'];
    }

    params['date'] = this.issueService.getDateParam(fields);

    let query = this.issueService.buildQuery(params);

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

    this.alarmTypesToExport = types;
    this.exportParams = params;

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
        })
      );

      requests[type] = req;

    });

    const subscriptions = ['rgn-lctn-stm', 'byday', 'severity'];
    subscriptions?.forEach((sub: any) => {
      this.subscriptionObj[sub]?.unsubscribe();
    });

    if (this.issueService.getAlertType() !== 'EVENTS') {
      this.loaders['alarm']['byday'] = true;
      this.loaders['alarm']['severity'] = true;
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

    }

    let that = this;
    let regionChartOptions: any;
    this.subscriptionObj['rgn-lctn-stm'] = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;

      if (json && typeof json['region'] != 'undefined' && json['region'] && !json['region']['api-error']) {
        this.loadRegionChart = true;
        let regionChartData: any = json['region'];
        this.regionError = false;
        if (this.alarmType == 'Alarm') {
          regionChartOptions = this.chartOptionService.regionChartOptions(regionChartData, false, params);
          this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion(regionChartData, 'histoy', params);
          this.params['alarm']['region'] = params;
        } else {
          regionChartOptions = this.chartOptionService.getEventOptions(regionChartData, 'region', params);
          this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion(regionChartData);
          this.params['event']['region'] = params;
        }

        regionChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);

            if (that.alarmType == 'Alarm') {
              that.clickedRegion = event.point.series.userOptions.data[index].regionId;
            } else {
              that.clickedEventRegion = event.point.series.userOptions.data[index].uuid;
            }
            that.getChartByLocation();
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            //console.log(event.point.series.userOptions.stack);
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            if (that.alarmType == 'Alarm') {
              that.clickedRegion = event.point.series.userOptions.data[index].regionId;
              that.params['alarm']['region']['region'] = event.point.series.userOptions.data[index].regionId;
              that.params['alarm']['region']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.params['alarm']['region']['status'] = titlepipe.transform(event.point.series.userOptions.stack);
              that.deleteParams['alarm']['region']['region'] = true;
              if (!fields['severity']) {
                that.deleteParams['alarm']['region']['severity'] = true;
              }
              that.deleteParams['alarm']['region']['status'] = true;

            } else {
              that.clickedEventRegion = event.point.series.userOptions.data[index].uuid;
              that.params['event']['region']['region'] = event.point.series.userOptions.data[index].uuid;
              that.deleteParams['event']['region']['region'] = true;
            }
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();

            let userParams = that.chartOptionService.getUserFilters('alarm', 'region');
            userParams['Region'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);

            that.gotoFullScreen('region', that.alarmType == 'Alarm' ? 'Alarm' : 'Event');
          },
        };


        regionChartOptions = Object.assign({}, regionChartOptions);

        if (!this.loadLocationChart) {
          this.Highcharts.chart('regionContainer', regionChartOptions);
        }

      } else {
        if (json['region'] && json['region']['api-error']) {
          if (this.alarmType == 'Alarm') {
            this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'histoy', params);
            this.params['alarm']['region'] = params;
          } else {
            this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion([]);
            this.params['event']['region'] = params;
          }
          this.errors['region'] = this.commonOrgService.pageErrorHandle(json['region']);
        } else {
          if (this.alarmType == 'Alarm') {
            this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'histoy', params);
            this.params['alarm']['region'] = params;
          } else {
            this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion([]);
            this.params['event']['region'] = params;
          }
          if (typeof json['region'] !== "undefined") {
            regionChartOptions = this.chartOptionService.regionChartOptions([], true, params);
            this.Highcharts.chart('regionContainer', regionChartOptions);
          }


        }
      }

      if (json && typeof json['location'] != 'undefined' && json['location'] && !json['location']['api-error']) {

        this.locationError = false;
        if (this.alarmType == 'Alarm') {
          this.locationChartOptions = this.chartOptionService.locationChartOptions(json['location'], false, params);
          this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation(json['location'], {}, 'histoy', params);
          this.params['alarm']['location'] = params;
        } else {
          //this.locationChartOptions = this.chartOptionService.locationEventChartOptions(this.locationChartData);
          this.locationChartOptions = this.chartOptionService.getEventOptions(json['location'], 'location', params);
          this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation(json['location']);
          this.params['event']['location'] = params;
        }

        this.locationChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            if (that.alarmType == 'Alarm') {
              //console.log(event.point.series);
              that.clickedLocation = event.point.series.userOptions.data[index].locationId;
            } else {
              that.clickedEventLocation = event.point.series.userOptions.data[index].uuid;
            }

            //this.clickedSeverity = event.point.series.name;
            that.getAlarmBySystem();
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            if (that.alarmType == 'Alarm') {
              //console.log(event.point.series);
              that.clickedLocation = event.point.series.userOptions.data[index].locationId;
              that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
              that.params['alarm']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.params['alarm']['location']['status'] = titlepipe.transform(event.point.series.userOptions.stack);
              if (fields['location'] && fields['location'].indexOf('All') !== -1) {
                that.deleteParams['alarm']['location']['location'] = true;
              }

              if (!fields['severity']) {
                that.deleteParams['alarm']['location']['severity'] = true;
              }
              that.deleteParams['alarm']['location']['status'] = true;

            } else {
              that.clickedEventLocation = event.point.series.userOptions.data[index].uuid;
              that.params['event']['location']['location'] = event.point.series.userOptions.data[index].uuid;
              if (fields['location'] && fields['location'].indexOf('All') !== -1) {
                that.deleteParams['event']['location']['location'] = true;
              }

            }
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            let userParams = that.chartOptionService.getUserFilters('alarm', 'location');
            userParams['Location'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);
            that.gotoFullScreen('location', that.alarmType == 'Alarm' ? 'Alarm' : 'Event');
          },
        };

        this.locationChartOptions = Object.assign({}, this.locationChartOptions);

        if (this.loadLocationChart) {
          this.Highcharts.chart('locationContainer', this.locationChartOptions);
        }



      } else {
        if (json['location'] && json['location']['api-error']) {
          if (this.alarmType == 'Alarm') {
            this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'histoy', params);
            this.params['alarm']['location'] = params;
          } else {
            this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation([]);
            this.params['event']['location'] = params;
          }
          this.errors['location'] = this.commonOrgService.pageErrorHandle(json['location']);
        } else {
          if (typeof json['location'] !== "undefined") {
            if (this.alarmType == 'Alarm') {
              this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'histoy', params);
              this.params['alarm']['location'] = params;
            } else {
              this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation([]);
              this.params['event']['location'] = params;
            }
            this.locationChartOptions = this.chartOptionService.locationChartOptions([], true, params);
            this.Highcharts.chart('locationContainer', this.locationChartOptions);
          }
        }

      }

      if (json && typeof json['system'] != 'undefined' && json['system'] && !json['system']['api-error']) {
        this.loadSystemChart = true;
        this.systemError = false;
        if (this.alarmType == 'Alarm') {
          this.systemChartOptions = this.chartOptionService.systemChartOptions(json['system'], false, params);
          this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem(json['system'], {}, 'histoy', params);
          this.params['alarm']['system'] = params;
        } else {
          this.systemChartOptions = this.chartOptionService.getEventOptions(json['system'], 'system', params);
          this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem(json['system']);
          this.params['event']['system'] = params;
        }

        this.systemChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);

            if (that.alarmType == 'Alarm') {
              that.clickedSystem = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

              if (fields['system'] && fields['system'].indexOf('All') !== -1) {
                that.deleteParams['alarm']['system']['system'] = true;
              }

              if (!fields['severity']) {
                that.deleteParams['alarm']['system']['severity'] = true;
              }

              that.deleteParams['alarm']['system']['status'] = true;
            } else {
              that.clickedSystem = event.point.series.userOptions.data[index].uuid;
              that.params['event']['system']['system'] = event.point.series.userOptions.data[index].uuid;
              if (fields['system'] && fields['system'].indexOf('All') !== -1) {
                that.deleteParams['event']['system']['system'] = true;
              }

            }
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            event.preventDefault();
            let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
            userParams['System'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);
            that.gotoFullScreen('system', that.alarmType == 'Alarm' ? 'Alarm' : 'Event');
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            if (that.alarmType == 'Alarm') {
              that.clickedSystem = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
              that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
              that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

              if (fields['system'] && fields['system'].indexOf('All') !== -1) {
                that.deleteParams['alarm']['system']['system'] = true;
              }
              that.deleteParams['alarm']['system']['severity'] = true;
              that.deleteParams['alarm']['system']['status'] = true;

            } else {
              that.clickedSystem = event.point.series.userOptions.data[index].uuid;
              that.params['event']['system']['system'] = event.point.series.userOptions.data[index].uuid;

              if (fields['system'] && fields['system'].indexOf('All') !== -1) {
                that.deleteParams['event']['system']['system'] = true;
              }
            }
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;

            let userParams = that.chartOptionService.getUserFilters('alarm', 'system');
            userParams['System'] = event.point.category;
            userParams['Severity'] = titlepipe.transform(event.point.series.userOptions.data[index].severity);
            userParams['Status'] = titlepipe.transform(event.point.series.userOptions.stack);

            that.gotoFullScreen('system', that.alarmType == 'Alarm' ? 'Alarm' : 'Event');
          },
        };

        this.Highcharts.chart('systemContainerByClick', this.systemChartOptions);

        var elmnt = document.getElementById("dynamic-system-chart-div");
        elmnt.scrollIntoView({ behavior: 'smooth' });
      } else {
        if (json['system'] && json['system']['api-error']) {
          if (this.alarmType == 'Alarm') {
            this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'histoy', params);
            this.params['alarm']['system'] = params;
          } else {
            this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem([]);
            this.params['event']['system'] = params;
          }
          this.errors['system'] = this.commonOrgService.pageErrorHandle(json['system']);
        } else {
          if (typeof json['system'] !== "undefined") {
            if (this.alarmType == 'Alarm') {
              this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'histoy', params);
              this.params['alarm']['system'] = params;
            } else {
              this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem([]);
              this.params['event']['system'] = params;
            }
            this.systemChartOptions = this.chartOptionService.systemChartOptions([], true, params);
            this.Highcharts.chart('systemContainerByClick', this.systemChartOptions);
          }
        }

      }



      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
    });

  }


  alarmTypeInBoth = '';
  alarmTitleInBoth = '';
  eventTitleInBoth = '';

  alarmChartType: any = '';
  eventChartType: any = '';

  clickedAlarmType = '';
  //isSeverityChartInFS = false;
  chartTypeInFS = '';
  clickOnClearedAlarms = false;
  clickOnRaisedAlarms = false;
  fullscreenParams = [];
  gotoFullScreen(chartName: any, alarmType?: any, clickedLoctionInfo = {}, clickedSystemInfo = {}) {
    this.loading = true
    this.fullscreenParams = [chartName, alarmType, clickedLoctionInfo, clickedSystemInfo];



    //this.isSeverityChartInFS = false;
    if (!Object.keys(clickedLoctionInfo).length && (Object.keys(this.clickedLoctionsObj).length || Object.keys(this.clickedEventLoctionsObj).length)) {
      if (alarmType && alarmType.toLowerCase() === 'event') {
        clickedLoctionInfo = this.clickedEventLoctionsObj;
      } else {
        clickedLoctionInfo = this.clickedLoctionsObj;
      }

    }

    if (!Object.keys(clickedSystemInfo).length && (Object.keys(this.clickedSystemsObj).length || Object.keys(this.clickedEventSystemsObj).length)) {

      if (alarmType && alarmType.toLowerCase() === 'event') {
        clickedSystemInfo = this.clickedEventSystemsObj;
      } else {
        clickedSystemInfo = this.clickedSystemsObj;
      }

    }

    this.clickOnClearedAlarms = false;
    this.clickOnRaisedAlarms = false;

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
      },
      event: {
        region: this.language['Select an event to view all instances of that event for that region'],
        location: this.language['Select an event to view all instances of that event for that location'],
        system: this.language['Select an event to view all instances of that event for that system']
      },
    }

    this.fullScreenChartName = chartNameobj[chartName];
    this.chartTypeInFS = chartName;
    this.clickedAlarmType = alarmType ? alarmType : 'Alarm';

    let fields = this.filtersForm.value;
    this.filtersDataInNS = fields;
    this.initLoad = false;
    this.showTable = false;

    let params = this.params[alarmType?.toLowerCase()][chartName];
    if (!this.both) {
      //params['notificationType'] = fields['alarmType'];
    } else {
      params['notificationType'] = alarmType;
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || (params['notificationType'] === 'Event' && this.skipParamsForEvents.indexOf(key) !== -1)) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    const requests: any = {};

    let types = [];

    let obj = {
      alarmevent: `${this.baseUrl}alarmbyAlarmEvent?${query}`,
      severity: `${this.baseUrl}alarmbySeverity?${query}`,
      region: `${this.baseUrl}alarmbyRegion?${query}`,
      location: `${this.baseUrl}alarmbyLocation?${query}`,
      system: `${this.baseUrl}alarmbySystem?${query}`,
    }

    if (chartName === 'severity') {
      types.push('alarmevent');
    } else {
      types.push(chartName);
    }

    if (alarmType !== 'Event') {
      types = ['alarmevent'];
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
    this.subscriptionObj['fullscreen']?.unsubscribe();
    this.subscriptionObj['fullscreen'] = forkJoin(requests).subscribe((json: any) => {
      let that = this;
      this.loading = false;
      this.fullScreen = true;
      let count = 0;

      if (typeof json['alarmevent'] === "object" && !json['alarmevent']) {
        json['alarmevent'] = [];
      }

      if (this.clickedAlarmTypeInBC) {

        if (json && typeof json['alarmevent'] === "object" && !json['alarmevent']['api-error']) {
          this.count = this.getCountByData(json['alarmevent']);

          if (!this.count) {
            json['alarmevent'] = [];
          }

          this.showSevertiyFullChart = true;

          this.serverityError = false;
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()]

          setTimeout(() => {

            if (this.clickedAlarmTypeInBC === 'raised') {
              let severityChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'raised', alarmType, chartName);
              severityChartOptions.plotOptions.series.point.events = {
                click: (event) => {
                  //this.clickedAlarmTypeInBC = '';
                  this.clickOnRaisedAlarms = true;
                  this.clickedSeverity = this.getSeverityByObj(event.point.extraData);

                  if (this.clickOnClearedAlarms) {
                    this.clickOnClearedAlarms = false;
                    if (this.searchTerm == event.point.name) {
                      this.initLoad = false;
                      this.showTable = false;

                      setTimeout(() => {
                        this.showTable = true;
                        this.count = 0;
                        //this.getList('severity', false);
                        if (this.showNewPagination) {
                          this.getListSub(event.point.name);
                        } else {
                          this.getList('severity', false);
                        }
                      }, 500);

                      return;
                    }


                  }

                  if (this.searchTerm == event.point.name) {
                    return;
                  }
                  //console.log(event);
                  //console.log(event.point.name);
                  this.searchTerm = event.point.name;
                  this.initLoad = false;
                  this.showTable = false;

                  //this.search(event.point.name);
                  setTimeout(() => {
                    this.showTable = true;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.getList('severity', alarmType, false);
                    }

                  }, 500);
                }
              };
              this.Highcharts.chart('fullChartAlarmEventContainer', severityChartOptions);
            } else {

              let severityClearedChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'cleared', alarmType, chartName);

              severityClearedChartOptions.plotOptions.series.point.events = {
                click: (event) => {
                  //this.clickedAlarmTypeInBC = '';
                  //console.log(event);
                  //console.log(event.point.name);

                  this.clickedSeverity = 'CLEAR';
                  this.clickOnClearedAlarms = true;

                  if (this.clickOnRaisedAlarms) {
                    this.clickOnRaisedAlarms = false;

                    if (this.searchTerm == event.point.name) {
                      this.initLoad = false;
                      this.showTable = false;

                      setTimeout(() => {
                        this.showTable = true;
                        this.count = 0;
                        //this.getList('severity', false);
                        if (this.showNewPagination) {
                          this.getListSub(event.point.name);
                        } else {
                          this.getList('severity', false);
                        }
                      }, 500);

                      return;
                    }

                  }

                  if (this.searchTerm == event.point.name) {
                    return;
                  }

                  this.searchTerm = event.point.name;
                  this.initLoad = false;
                  this.showTable = false;

                  //this.search(event.point.name);
                  setTimeout(() => {
                    this.showTable = true;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.getList('severity', alarmType, false);
                    }

                  }, 500);
                }
              };

              this.Highcharts.chart('fullChartAlarmEventContainer', severityClearedChartOptions);
            }

          }, 500)

          this.showTable = true;

          if (this.initLoad) {
            this.redraw();
          } else {
            this.getList(chartName, alarmType);
          }

        } else {
          if (json['alarmevent']) {
            this.errors['alarmevent'] = this.commonOrgService.pageErrorHandle(json['alarmevent']);
          }

        }

        return;
      }

      if (json && typeof json['alarmevent'] === "object" && !json['alarmevent']['api-error']) {
        this.count = this.getCountByData(json['alarmevent']);

        if (!this.count) {
          json['alarmevent'] = [];
        }

        this.showSevertiyFullChart = true;
        // if (!this.both) {
        //   this.fullScreenChartName = this.alarmType == 'Alarm' ? this.language['Alarm by Severity'] : this.language['Event by Severity'];
        // } else {
        //   this.fullScreenChartName = alarmType == 'Alarm' ? this.language['Alarm by Severity'] : this.language['Event by Severity'];
        // }

        this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()]
        this.serverityError = false;

        setTimeout(() => {

          let severityChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], (params['status'] ? params['status'].toLowerCase() : 'raised'), alarmType, chartName);
          severityChartOptions.plotOptions.series.point.events = {
            click: (event) => {
              this.clickedAlarmTypeInBC = '';
              this.clickOnRaisedAlarms = true;
              //this.clickedSeverity = this.getSeverityByObj(event.point.extraData);

              if (this.clickOnClearedAlarms) {
                this.clickOnClearedAlarms = false;
                if (this.searchTerm == event.point.name) {
                  this.initLoad = false;
                  this.showTable = false;

                  setTimeout(() => {
                    this.showTable = true;
                    this.count = 0;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.getList('severity', alarmType, false);
                    }

                  }, 500);

                  return;
                }

              }

              if (this.searchTerm == event.point.name) {
                return;
              }

              //console.log(event);
              //console.log(event.point.name);
              this.searchTerm = event.point.name;
              this.initLoad = false;
              this.showTable = false;
              setTimeout(() => {
                this.showTable = true;
                if (this.showNewPagination) {
                  this.getListSub(event.point.name);
                } else {
                  this.getList('severity', alarmType, false);
                }

              }, 500);
            }
          };

          let severityClearedChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'cleared', alarmType, chartName);

          severityClearedChartOptions.plotOptions.series.point.events = {
            click: (event) => {
              this.clickedAlarmTypeInBC = '';
              //console.log(event);
              //console.log(event.point.name);

              //this.clickedSeverity = 'CLEAR';
              this.clickOnClearedAlarms = true;

              if (this.clickOnRaisedAlarms) {
                this.clickOnRaisedAlarms = false;

                if (this.searchTerm == event.point.name) {
                  this.initLoad = false;
                  this.showTable = false;

                  setTimeout(() => {
                    this.showTable = true;
                    this.count = 0;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.getList('severity', alarmType, false);
                    }
                  }, 500);

                  return;
                }

              }

              if (this.searchTerm == event.point.name) {
                return;
              }

              this.searchTerm = event.point.name;
              this.initLoad = false;
              this.showTable = false;

              setTimeout(() => {
                this.showTable = true;
                if (this.showNewPagination) {
                  this.getListSub(event.point.name);
                } else {
                  this.getList('severity', alarmType, false);
                }

              }, 500);
            }
          };

          this.Highcharts.chart('fullChartContainer', severityChartOptions);
          this.Highcharts.chart('fullChartSeverityClearedContainer', severityClearedChartOptions);

        }, 500)

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList(chartName, alarmType);
        }

      } else {
        if (json['alarmevent']) {
          this.getListSub();
          this.errors['alarmevent'] = this.commonOrgService.pageErrorHandle(json['alarmevent']);
        }

      }

      if (json && typeof json['region'] != 'undefined') {
        if (!this.both) {
          this.fullScrenSubHeading = chartSubHeadingObj[this.alarmType.toLowerCase()][chartName.toLowerCase()];
          this.fullScreenChartName = this.alarmType == 'Alarm' ? this.language['Alarm by Region'] : this.language['Event by Region'];
        } else {
          this.fullScreenChartName = alarmType == 'Alarm' ? this.language['Alarm by Region'] : this.language['Event by Region'];
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()];
        }
        this.loadRegionChart = true;
        this.regionChartData = json['region'];



        count = this.getCountByData(json['region'], alarmType);

        this.count = count;

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('region', alarmType);
        }



        this.regionError = false;
        let regionChartOptions: any = {};
        if (params['notificationType'] === 'Event') {
          regionChartOptions = this.chartOptionService.getEventOptions(this.regionChartData, 'region', params, {}, {}, true);
          regionChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'region', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'region', that);
            },
          };
        } else {
          regionChartOptions = this.chartOptionService.regionChartOptions(this.regionChartData, false);
        }


        regionChartOptions = Object.assign({}, regionChartOptions);
        this.Highcharts.chart('fullChartContainer', regionChartOptions);

      }

      if (json && typeof json['location'] != 'undefined') {
        if (!this.both) {
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()];
          this.fullScreenChartName = this.alarmType == 'Alarm' ? this.language['Alarm by Location'] : this.language['Event by Location'];
        } else {
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()];
          this.fullScreenChartName = alarmType == 'Alarm' ? this.language['Alarm by Location'] : this.language['Event by Location'];
        }

        this.locationChartData = json['location'];

        count = this.getCountByData(json['location'], alarmType);

        this.count = count;

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('location', alarmType);
        }

        this.locationError = false;
        let locationChartOptions: any = [];

        if (params['notificationType'] === 'Event') {
          locationChartOptions = this.chartOptionService.getEventOptions(this.locationChartData, 'location', params, clickedLoctionInfo, {}, true);
          locationChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'location', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'location', that);
            },
          };
        } else {
          locationChartOptions = this.chartOptionService.locationChartOptions(this.locationChartData, false, params, clickedLoctionInfo);
        }

        this.locationChartOptions = Object.assign({}, locationChartOptions);
        this.Highcharts.chart('fullChartContainer', locationChartOptions);

      }

      if (json && typeof json['system'] != 'undefined') {
        if (!this.both) {
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()];
          this.fullScreenChartName = this.alarmType === 'Alarm' ? this.language['Alarm by System'] : this.language['Event by System'];
        } else {
          this.fullScrenSubHeading = chartSubHeadingObj[alarmType.toLowerCase()][chartName.toLowerCase()];
          this.fullScreenChartName = alarmType === 'Alarm' ? this.language['Alarm by System'] : this.language['Event by System'];
        }

        count = this.getCountByData(json['system'], alarmType);

        this.count = count;
        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList('system', alarmType);
        }

        this.systemChartData = json['system'];
        this.systemError = false;
        let systemChartOptions: any = [];

        if (params['notificationType'] === 'Event') {
          systemChartOptions = this.chartOptionService.getEventOptions(this.systemChartData, 'system', params, clickedLoctionInfo, clickedSystemInfo, true);
          systemChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'system', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, alarmType, 'system', that);
            },
          };
        } else {
          systemChartOptions = this.chartOptionService.systemChartOptions(this.systemChartData, false, params, clickedLoctionInfo, clickedSystemInfo);
        }

        this.Highcharts.chart('fullChartContainer', systemChartOptions);

      }


      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
      this.getListSub();
    });
  }

  getList(chartName, alarmType?: any, applyFiltersInFS?: any) {
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
        customCategory = fields['customCategory'];
      } else {
        customCategory = undefined;
      }

      if (fields['eventName'] && fields['eventName'].length && fields['eventName'].indexOf('All') === -1) {
        //todo
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

      if (fields['severity'] === 'All') {
        fields['severity'] = undefined;
      }
      params = {
        region: this.regionName,
        location: this.locationName,
        system: this.systemName,
        fsan_serialnumber: fields['fsan'] ? fields['fsan'] : '',
        severity: this.clickedSeverity || fields['severity'],
        historyReport: true,
        category: category,
        notificationType: alarmType ? alarmType : fields['alarmType'],
        alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
        customCategory: customCategory,
        cco_ack: fields['cco_ack'],
        cco_shelv: fields['cco_shelv']
      }

      if (params['notificationType'] !== 'Alarm') {
        delete params['cco_ack'];
        delete params['cco_shelv'];
      }

      params['date'] = this.issueService.getDateParam(fields);

      if (params['notificationType'] === 'Event') {
        delete params['severity'];
        delete params['status'];
      }

      if (chartName === 'severity') {
        if (this.clickedRegion || this.clickedEventRegion) {
          delete params['region'];
        }

        if (this.clickedLocation || this.clickedEventLocation) {
          delete params['location'];
        }

        if (this.clickedSystem) {
          delete params['system'];
        }

      }

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
      params = this.params[alarmType?.toLowerCase()][chartName];

    }

    if (this.clickOnRaisedAlarms) {
      params['status'] = 'Raised';
    }

    if (this.clickedAlarmTypeInBC === 'cleared') {
      params['status'] = 'Cleared';
    } else if (this.clickedAlarmTypeInBC === 'raised') {
      params['status'] = 'Raised';
    } else {
      delete params['status'];
    }
    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || (params['notificationType'] === 'Event' && this.skipParamsForEvents.indexOf(key) !== -1)) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

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
                if (!element['subject']['deviceName']) {
                  element['subject']['deviceName'] = this.systemsObj[element['subject']['deviceId']];

                }

                element['subject']['deviceName'] = element['subject']['deviceName']?.replace('device=', '');
                element['subject']['deviceName'] = element['subject']['deviceName']?.replace('DEVICE=', '');

                element['subject']['resourceForUI'] = this.issueService.generateResourceForUI(element, (element.type === 'EXA' ? true : false));

                data.push(element);
              });
            }

            this.list = resp['alarms'];

            // if (resp && resp.devices) {
            //   this.list = resp.devices;
            // } else {
            //   this.list = [];
            // }

            this.initLoad = true;

            this.loading = false;
            callback({
              recordsTotal: resp['totalCount'] ? resp['totalCount'] : 0,
              recordsFiltered: (dataTablesParameters.search.value && resp) ? resp.length : (resp['totalCount'] ? resp['totalCount'] : 0),
              data: []
            });
          });
      }, drawCallback: (settings) => {
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


  getCountByData(data: any, alarmType?: any) {
    let count = 0;
    if (data && data.length) {

      data.forEach((element: any) => {
        if (alarmType === 'Event') {
          count += (element && element['event'] && element['event']['count'] != undefined) ? element['event']['count'] : 0;
        } else {
          let keys = element['alarm'] && element['alarm']['cleared'] ? Object.keys(element['alarm']['cleared']) : (element['cleared'] ? Object.keys(element['cleared']) : []);
          keys.forEach((key: any) => {
            count += (element['alarm'] && typeof element['alarm']['cleared'][key] != undefined) ? element['alarm']['cleared'][key] : element['cleared'][key];
          });

          keys = element['alarm'] && element['alarm']['raised'] ? Object.keys(element['alarm']['raised']) : (element['raised'] ? Object.keys(element['raised']) : []);
          keys.forEach((key: any) => {
            count += (element['alarm'] && typeof element['alarm']['raised'][key] != undefined) ? element['alarm']['raised'][key] : element['raised'][key];
          });
        }


      });


    }

    return count;
  }

  getCountByDataObj(data: any) {
    let count = 0;
    if (data && data['alarm']) {
      data = data['alarm'];
    }
    if (data && Object.keys(data).length) {

      let pkeys = Object.keys(data);

      pkeys.forEach((pkey: any) => {


        let keys = data[pkey] ? Object.keys(data[pkey]) : [];
        keys?.forEach((key: any) => {
          count += data[pkey][key];
        });

      });
    }

    return count;
  }

  applyFiltersInFS: any = false;
  applyFiltersInFullScreen() {
    this.setSearchQuery('');
    this.searchTerm = '';
    let chartSubHeadingObj = {
      alarm: {
        severity: this.language['Select an alarm to view all instances of that alarm for that severity'],
        region: this.language['Select an alarm to view all instances of that alarm for that region'],
        location: this.language['Select an alarm to view all instances of that alarm for that location'],
        system: this.language['Select an alarm to view all instances of that alarm for that system']
      },
      event: {
        region: this.language['Select an event to view all instances of that event for that region'],
        location: this.language['Select an event to view all instances of that event for that location'],
        system: this.language['Select an event to view all instances of that event for that system']
      },
    }
    this.alarmsCount();
    this.clickedAlarmTypeInBC = '';
    this.clickOnClearedAlarms = false;
    this.clickOnRaisedAlarms = false;

    this.clickedRegion = '';
    this.clickedEventRegion = '';
    this.clickedLocation = '';
    this.clickedEventLocation = '';
    this.clickedSystem = '';
    this.clickedSeverity = '';

    this.applyFiltersInFS = true;
    let fields = this.filtersForm.value;
    let paramAlarmType = 'Alarm';

    if (fields['alarmType'] === 'Both' && this.clickedAlarmType === 'Event') {
      //fields['alarmType'] = 'Event';
      this.alarmType = 'Event';
      paramAlarmType = 'Event';
    } else if (fields['alarmType'] === 'Both') {
      this.alarmType = 'Alarm';
      paramAlarmType = 'Alarm';
      this.clickedAlarmType = 'Alarm';
    } else {
      this.alarmType = fields['alarmType'];
      paramAlarmType = fields['alarmType'];
      this.clickedAlarmType = fields['alarmType'];
    }

    this.loading = true;
    this.initLoad = false;
    this.showTable = false;
    this.showSevertiyFullChart = false;

    let params = {
      region: fields['region'],
      location: fields['location'],
      system: fields['system'],
      fsan_serialnumber: fields['fsan'] ? fields['fsan'] : undefined,
      alarmEventName: fields['eventName'] ? fields['eventName'] : undefined,
      severity: fields['severity'],
      notificationType: paramAlarmType,
      historyReport: true,
      category: fields['category'],
      customCategory: fields['customCategory'],
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['alertType'] = this.appendAlarmType(params);
    this.issueService.setAppliedFilters(params);

    if (params['notificationType'] !== 'Alarm') {
      this.skipParamsForEvents?.forEach((element: any) => {
        if (params[element]) {
          delete params[element];
        }
      });
    }

    params['date'] = this.issueService.getDateParam(fields);

    let query = this.issueService.buildQuery(params);

    const requests: any = {};

    let types = ['severity', 'region'];
    this.loadRegionChart = true;

    if (this.alarmType === 'Event' || (fields['alarmType'] === 'Both' && this.clickedAlarmType === 'Event')) {
      this.loadRegionChart = false;
      this.alarmType = 'Event';
      let index = types.indexOf('severity');
      types.splice(index, 1);
    }

    if (params['region']) {
      this.loadRegionChart = false;
      let index = types.indexOf('severity');

      if (index !== -1) {
        types.splice(index, 1);
      }


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

    if (paramAlarmType !== 'Event') {
      let chartNameobj = {
        alarmevent: `${this.language['Alarm by Severity']}`,
        severity: `${this.language['Alarm by Severity']}`,
        region: `${this.language['Alarm by Region']}`,
        location: `${this.language['Alarm by Location']}`,
        system: `${this.language['Alarm by System']}`,
      }

      if (types.length == 2) {
        this.fullScreenChartName = chartNameobj[types[0]];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()][types[0]];
      } else {
        this.fullScreenChartName = chartNameobj[types[types.length - 1]];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()][types[types.length - 1]];
      }



      types = ['alarmevent'];
    }

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

      this.fullScreen = true;
      let count = 0;
      let that = this;

      if (typeof json['alarmevent'] === "object" && !json['alarmevent']) {
        json['alarmevent'] = [];
      }

      if (json && typeof json['alarmevent'] === "object" && !json['alarmevent']['api-error']) {
        this.count = this.getCountByData(json['alarmevent']);
        this.params['alarm']['severity'] = params;

        if (!this.count) {
          json['alarmevent'] = [];
        }

        this.showSevertiyFullChart = true;

        this.serverityError = false;
        this.chartOptionService.getSubTitle(params, {}, {}, 'alarm', 'severity');

        setTimeout(() => {

          let severityChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'raised', 'alarm', 'severity');

          severityChartOptions.plotOptions.series.point.events = {
            click: (event) => {

              this.clickOnRaisedAlarms = true;
              this.clickedSeverity = this.getSeverityByObj(event.point.extraData);

              if (this.clickOnClearedAlarms) {
                this.clickOnClearedAlarms = false;
                if (this.searchTerm == event.point.name) {
                  this.initLoad = false;
                  this.showTable = false;

                  setTimeout(() => {
                    this.showTable = true;
                    this.count = 0;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.search(event.point.name);
                    }
                  }, 500);

                  return;
                }


              }

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

          let severityClearedChartOptions: any = this.chartOptionService.getPieChartOptionsForFS(json['alarmevent'], 'cleared', 'alarm', 'severity');

          severityClearedChartOptions.plotOptions.series.point.events = {
            click: (event) => {

              this.clickedSeverity = 'CLEAR';
              this.clickOnClearedAlarms = true;

              if (this.clickOnRaisedAlarms) {
                this.clickOnRaisedAlarms = false;

                if (this.searchTerm == event.point.name) {
                  this.initLoad = false;
                  this.showTable = false;

                  setTimeout(() => {
                    this.showTable = true;
                    this.count = 0;
                    if (this.showNewPagination) {
                      this.getListSub(event.point.name);
                    } else {
                      this.search(event.point.name);
                    }
                  }, 500);

                  return;
                }

              }

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
          this.Highcharts.chart('fullChartSeverityClearedContainer', severityClearedChartOptions);

        }, 500)

        this.showTable = true;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.chartTypeInFS = 'severity';
          this.clickedAlarmType = this.alarmType;
          this.getListSub();
        }

      } else {
        if (json['alarmevent']) {
          this.errors['alarmevent'] = this.commonOrgService.pageErrorHandle(json['alarmevent']);
        }

      }

      if (json && json['severity']) {
        this.showSevertiyFullChart = true;
        this.fullScreenChartName = this.alarmType == 'Alarm' ? this.language['Alarm by Severity'] : this.language['Event by Severity'];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()]['severity'];
        let severityChartData: any = json['severity']['alarm'] ? json['severity']['alarm'] : json['severity'];
        this.serverityError = false;

        setTimeout(() => {
          let severityChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.raised, ((!this.both ? this.alarmType : "") + " Raised"), "full");
          this.Highcharts.chart('fullChartContainer', severityChartOptions);

          let severityClearedChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.cleared, ((!this.both ? this.alarmType : "") + " Cleared"), "full");
          this.Highcharts.chart('fullChartSeverityClearedContainer', severityClearedChartOptions);
        }, 500)

        count = this.getCountByDataObj(severityChartData);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.chartTypeInFS = 'severity';
          this.clickedAlarmType = paramAlarmType;
          this.getListSub();
        }

        this.showTable = true;

      }


      if (json && typeof json['region'] != 'undefined') {
        this.params['event']['region'] = params;
        this.fullScreenChartName = this.alarmType === 'Alarm' ? this.language['Alarm by Region'] : this.language['Event by Region'];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()]['region'];
        this.loadRegionChart = true;
        this.regionChartData = json['region'];

        count = this.getCountByData(json['region'], this.alarmType);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.chartTypeInFS = 'region';
          this.clickedAlarmType = paramAlarmType;
          this.getListSub();
        }

        this.showTable = true;

        this.regionError = false;
        //let regionChartOptions: any = this.chartOptionService.regionChartOptions(this.regionChartData, false);

        let regionChartOptions: any;

        if (this.alarmType == 'Alarm') {
          regionChartOptions = this.chartOptionService.regionChartOptions(this.regionChartData, false);
        } else {
          //this.regionChartOptions = this.chartOptionService.regionEventChartOptions(this.regionChartData);
          regionChartOptions = this.chartOptionService.getEventOptions(this.regionChartData, 'region', params);

          regionChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'region', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'region', that);;

            },
          };
        }

        regionChartOptions = Object.assign({}, regionChartOptions);
        this.Highcharts.chart('fullChartContainer', regionChartOptions);

      }

      if (json && typeof json['location'] != 'undefined') {
        this.params['event']['location'] = params;
        this.fullScreenChartName = this.alarmType === 'Alarm' ? this.language['Alarm by Location'] : this.language['Event by Location'];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()]['location'];
        this.locationChartData = json['location'];

        count = this.getCountByData(json['location'], this.alarmType);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.chartTypeInFS = 'location';
          this.clickedAlarmType = paramAlarmType;
          this.getListSub();
        }

        this.showTable = true;

        this.locationError = false;
        //let locationChartOptions: any = this.chartOptionService.locationChartOptions(this.locationChartData, false);

        let locationChartOptions: any;
        if (this.alarmType == 'Alarm') {
          locationChartOptions = this.chartOptionService.locationChartOptions(this.locationChartData, false, params);
        } else {
          locationChartOptions = this.chartOptionService.getEventOptions(this.locationChartData, 'location', params);
          locationChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'location', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'location', that);;

            },
          };
        }

        this.Highcharts.chart('fullChartContainer', locationChartOptions);

      }

      if (json && typeof json['system'] != 'undefined') {
        this.params['event']['system'] = params;
        this.fullScreenChartName = this.alarmType === 'Alarm' ? this.language['Alarm by System'] : this.language['Event by System'];
        this.fullScrenSubHeading = chartSubHeadingObj[params['notificationType'].toLowerCase()]['system'];
        count = this.getCountByData(json['system'], this.alarmType);

        this.count = count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.chartTypeInFS = 'system';
          this.clickedAlarmType = paramAlarmType;
          this.getListSub();
        }

        this.showTable = true;

        this.systemChartData = json['system'];
        this.systemError = false;
        //let systemChartOptions: any = this.chartOptionService.systemChartOptions(this.systemChartData, false);
        let systemChartOptions: any;

        if (this.alarmType == 'Alarm') {
          systemChartOptions = this.chartOptionService.systemChartOptions(this.systemChartData, false, params);
        } else {
          systemChartOptions = this.chartOptionService.getEventOptions(this.systemChartData, 'system', params);
          systemChartOptions.plotOptions.series.point.events = {
            click: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'system', that);
            },
            contextmenu: function (event) {
              let index = $(this.series.data).index(this);
              that.generateEvent(params, event, index, 'event', 'system', that);;

            },
          };
        }

        this.Highcharts.chart('fullChartContainer', systemChartOptions);

      }

      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
    });

  }

  listSub$;
  private searchText$ = new Subject<string>();

  doSearch() {
    this.initLoad = false;
    this.showTable = false;
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

              //this.changeDetect.detectChanges();

              this.getList(this.chartTypeInFS, (this.alarmType ? this.alarmType : 'Alarm'), this.applyFiltersInFS);

            } else {

              this.getList(this.chartTypeInFS, this.clickedAlarmType, this.applyFiltersInFS);
            }
          }

        }, 100)

      },
      err => {

      }
    );
  }

  search(name: string) {
    if (this.showNewPagination) {
      return;
    }
    if (!name) {
      this.resetALarmEventChart();
    }
    this.searchText$.next(name);
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

  showAckShelveBtn = false;
  fullData: any = {};
  hideSource = false;
  viewDetails(item: any, index?: any) {
    item.isHistoryAlarmFromUI = true;
    this.hideSource = false;
    this.index = index;
    this.fullData = item;
    this.showAckShelveBtn = true;
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

  clearSearchInp() {
    this.setSearchQuery('');
    if (this.showNewPagination) {
      this.searchTerm = '';
      this.getListSub();
    } else {
      this.searchTerm = '';
      this.search('');
    }

  }

  getCategories() {

    let fields = this.filtersForm.value;

    let params = {
      historyReport: true,
      notificationType: this.filtersForm.controls.alarmType.value
    }

    params['alertType'] = this.appendAlarmType(params);
    params['date'] = this.issueService.getDateParam(fields);

    let query = this.issueService.buildQuery(params);

    this.http.get(`${this.baseUrl}category?${query}`).subscribe((json: any) => {


      let temp = [];

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

          if (fields['category']?.indexOf('All') === -1 && fields['category']?.indexOf(element) !== -1) {
            temp.push(element);
          }

          categories.push({
            id: element,
            name: element
          })
        });
      }

      this.categories = categories;

      if (temp.length) {
        this.filtersForm.get('category').setValue(temp);
      } else {
        this.filtersForm.get('category').setValue(['All']);
      }

    });
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

  getAlarmNames(notificationType = `Alarm`) {

    let url = `${this.baseUrl}alarmEvent?notificationType=${notificationType}&historyalarm=true`;

    if (notificationType === `Alarm`) {
      url += `&alertType=${this.issueService.getAlertType()}`;
    }

    this.http.get(url).subscribe((json: any) => {

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
      // if (this.serviceDisruption['isServiceDisruption'])
      //   this.filtersForm.get('eventName').setValue(['loss-of-pon']);
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
  getSeverityByObj(obj: any) {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]]) {
        return keys[i];
      }

    }

    return 'major';
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

  closeNotes() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  notes: any = new FormControl('');
  alarmId: any;
  showEdit: boolean = false;
  index: any;
  openNotesModal(id: any, notes?: any, isEdit?: any, index?: any) {
    this.btnDisabled = true;
    this.isNotesModalOpen = true;
    this.index = index;
    this.noteError = false;
    this.showEdit = isEdit;
    this.alarmId = id;
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
    this.noteSaveLoader = true;
    this.btnDisabled = true;
    this.url = `${this.baseUrl}notes/${this.alarmId}?notesDescription=${encodeURIComponent(this.notes.value)}&historyReport=true`
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
      // //console.log("error", err)
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
  deleteIndex: any
  deleteConfirmModal(id: any, index: any) {
    if (this.modalRef) {
      this.closeNotes();
    }
    this.btnDisabled = false;
    this.deleteId = id;
    this.deleteIndex = index;
    this.modalRef = this.dialogService.open(this.deleteModal);
  }

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
      this.closeNotes();
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

  bothRegion = false;
  bothLocation = false;
  bothSystem = false;
  bothRegionAlarm = false;
  bothLocationAlarm = false;
  bothSystemAlarm = false;
  bothRegionEvent = false;
  bothLocationEvent = false;
  bothSystemEvent = false;

  makeDefaultVarForBoth() {
    this.bothRegion = false;
    this.bothLocation = false;
    this.bothSystem = false;
    this.bothRegionAlarm = false;
    this.bothLocationAlarm = false;
    this.bothSystemAlarm = false;
    this.bothRegionEvent = false;
    this.bothLocationEvent = false;
    this.bothSystemEvent = false;
  }

  loadBothDataNew() {

    this.makeDefaultVarForBoth();

    let fields = this.filtersForm.value;
    let titlepipe = new TitleCasePipe();

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
      customCategory = fields['customCategory'];
    } else {
      customCategory = undefined;
    }

    if (fields['eventName'] && fields['eventName'].length && fields['eventName'].indexOf('All') === -1) {
      //todo
    } else {
      fields['eventName'] = undefined;
    }

    this.clickedAlarmTypeInBC = '';
    this.clickedLocation = '';
    this.clickedEventLocation = '';
    this.clickedRegion = '';
    this.clickedEventRegion = '';
    this.clickedSystem = '';
    this.loadLocationChart = false;
    this.loadSystemChart = false;
    this.serverityError = false;
    this.systemError = false;
    this.regionError = false;
    this.locationError = false;
    this.severityChartData = null;
    this.systemChartData = null;
    this.locationChartData = null;
    this.regionChartData = null;

    this.loading = true;
    this.applyDisabled = true;

    if (fields['alarmType'] == 'Both') {
      this.both = true;
    } else {
      this.both = false;
    }

    let system = '';
    if (this.systemName && this.systemName.length && this.systemName.indexOf('All') === -1) {
      let filtered = this.systemName.filter(function (el) {
        return (el && el.length && el !== 'All');
      });

      system = filtered;
    } else {
      system = undefined;
    }

    if (fields['severity'] && fields['severity'].toLowerCase() === 'all') {
      fields['severity'] = undefined;
    }

    let params = {
      region: this.regionName !== 'All' ? this.regionName : undefined,
      location: this.locationName !== 'All' ? this.locationName : undefined,
      fsan_serialnumber: fields['fsan'],
      alarmEventName: fields['eventName'],
      severity: fields['severity'],
      historyReport: true,
      category: category,
      system: system,
      customCategory: customCategory,
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['date'] = this.issueService.getDateParam(fields);
    params['alertType'] = this.appendAlarmType(params);

    let query = this.issueService.buildQuery(params);

    let eventQuery = "";
    let skipParams = ['customCategory', 'severity', 'cco_ack', 'cco_shelv'];
    for (var key in params) {

      if (params[key] == undefined || skipParams.indexOf(key) !== -1) {
        continue;
      }

      if (eventQuery != "") {
        eventQuery += "&";
      }

      eventQuery += key + "=" + encodeURIComponent(params[key]);

    }

    const requests: any = {};

    let types = ['severity', 'byday', 'region', 'region-event'];
    this.loadRegionChart = true;

    if (params['location']) {
      let index = types.indexOf('location');
      if (index > -1) {
        types.splice(index, 1);
      }

      index = types.indexOf('location-event');
      if (index > -1) {
        types.splice(index, 1);
      }

      index = types.indexOf('region');
      if (index > -1) {
        types.splice(index, 1);
      }

      index = types.indexOf('region-event');
      if (index > -1) {
        types.splice(index, 1);
      }

      types.push('system');
      types.push('system-event');

      this.bothSystem = true;
      this.bothSystemAlarm = true;
      this.bothSystemEvent = true;

    } else if (params['region']) {
      this.loadRegionChart = false;
      let index = types.indexOf('region');
      if (index > -1) {
        types.splice(index, 1);
      }

      index = types.indexOf('region-event');
      if (index > -1) {
        types.splice(index, 1);
      }

      types.push('location');
      types.push('location-event');

      this.bothLocation = true;
      this.bothLocationAlarm = true;
      this.bothLocationEvent = true;

    }

    this.alarmTypesToExport = types;
    this.exportParams = params;

    if (!(params['region'] || params['location'])) {
      this.bothRegion = true;
      this.bothRegionAlarm = true;
      this.bothRegionEvent = true;
    }

    let diffDays = this.chartOptionService.getDateDiff(params);
    let interval = 'Days';

    if (diffDays > 5) {
      interval = 'Hours';
    } else {
      interval = 'Minutes';
    }


    let obj = {
      byday: `${this.baseUrl}alarmbyInterval?${query}&interval=${interval}&notificationType=Alarm`,
      severity: `${this.baseUrl}alarmbySeverity?${query}&notificationType=Alarm`,
      region: `${this.baseUrl}alarmbyRegion?${query}&notificationType=Alarm`,
      location: `${this.baseUrl}alarmbyLocation?${query}&notificationType=Alarm`,
      system: `${this.baseUrl}alarmbySystem?${query}&notificationType=Alarm`,
      'severity-event': `${this.baseUrl}alarmbySeverity?${eventQuery}&notificationType=Event`,
      'region-event': `${this.baseUrl}alarmbyRegion?${eventQuery}&notificationType=Event`,
      'location-event': `${this.baseUrl}alarmbyLocation?${eventQuery}&notificationType=Event`,
      'system-event': `${this.baseUrl}alarmbySystem?${eventQuery}&notificationType=Event`,
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

    let that = this;

    this.listObs = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;

      if (json && json['severity'] && !json['severity']['api-error']) {
        let severityChartData: any = json['severity']['alarm'] ? json['severity']['alarm'] : json['severity'];
        this.serverityError = false;
        let severityChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.raised, "Alarms Raised", "small", params);
        let severityClearedChartOptions: any = this.chartOptionService.severityChartOptions(severityChartData.cleared, "Alarms Cleared", "small", params);

        this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity(severityChartData, 'histoy', params);
        this.params['alarm']['severity'] = params;
        severityChartOptions.plotOptions.series.point.events = {
          contextmenu: (event) => {
            event.preventDefault();
            this.clickedSeverity = (event.point.severity).toLowerCase();
            this.params['alarm']['severity']['severity'] = (event.point.severity).toLowerCase();
            let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
            userParams['Severity'] = titlepipe.transform(event.point.severity);
            this.gotoFullScreen('severity', 'Alarm');
          },
          click: (event) => {
            event.preventDefault();
            this.clickedSeverity = (event.point.severity).toLowerCase();
            this.params['alarm']['severity']['severity'] = (event.point.severity).toLowerCase();
            let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
            userParams['Severity'] = titlepipe.transform(event.point.severity);
            this.gotoFullScreen('severity', 'Alarm');
          }
        };
        severityClearedChartOptions.plotOptions.series.point.events = {
          contextmenu: (event) => {
            event.preventDefault();
            this.clickedSeverity = (event.point.severity).toLowerCase();
            this.params['alarm']['severity']['severity'] = (event.point.severity).toLowerCase();
            let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
            userParams['Severity'] = titlepipe.transform(event.point.severity);
            this.gotoFullScreen('severity', 'Alarm');
          },
          click: (event) => {
            event.preventDefault();
            this.clickedSeverity = (event.point.severity).toLowerCase();
            this.params['alarm']['severity']['severity'] = (event.point.severity).toLowerCase();
            let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
            userParams['Severity'] = titlepipe.transform(event.point.severity);
            this.gotoFullScreen('severity', 'Alarm');
          }
        };

        this.Highcharts.chart('severityAlarmContainer', severityChartOptions);
        this.Highcharts.chart('severityClearedAlarmContainer', severityClearedChartOptions);

      } else {
        if (json['severity'] && json['severity']['api-error']) {
          this.params['alarm']['severity'] = params;
          this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'histoy', params);
          this.errors['severity'] = this.commonOrgService.pageErrorHandle(json['severity']);
        } else {
          if (typeof json['severity'] !== "undefined") {
            this.params['alarm']['severity'] = params;
            this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'histoy', params);

            let severityChartOptions = this.chartOptionService.severityChartOptions([], this.language["Alarms Raised"], "medium", params);
            this.Highcharts.chart('severityAlarmContainer', severityChartOptions);

            let clearedChartOptions = this.chartOptionService.severityChartOptions([], this.language["Alarms Cleared"], "medium", params);
            this.Highcharts.chart('severityClearedAlarmContainer', clearedChartOptions);
          }
        }
      }

      if (json && typeof json['region'] != 'undefined' && json['region'] && !json['region']['api-error']) {
        this.alarmTitleInBoth = this.language['Alarm by Region'];
        this.alarmChartType = 'region';
        this.loadRegionChart = true;
        //this.regionChartData = json['region'];
        this.regionError = false;
        let regionChartOptions: any = this.chartOptionService.regionChartOptions(json['region'], false, params);
        this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion(json['region'], 'histoy', params);
        this.params['alarm']['region'] = params;

        regionChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            //console.log(event.point.category);
            that.clickedRegion = event.point.series.userOptions.data[index].regionId;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;
            that.alarmTypeInBoth = 'Alarm';
            that.getChartByLocation('Alarm');
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            //console.log(event.point.series.userOptions.stack);
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            //that.clickedLocation = event.point.category;
            that.clickedRegion = event.point.series.userOptions.data[index].regionId;
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.params['alarm']['region']['region'] = event.point.series.userOptions.data[index].regionId;
            that.params['alarm']['region']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.params['alarm']['region']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

            that.deleteParams['alarm']['region']['region'] = true;
            if (!fields['severity']) {
              that.deleteParams['alarm']['region']['severity'] = true;
            }
            that.deleteParams['alarm']['region']['status'] = true;
            that.gotoFullScreen('region', 'Alarm');
          },
        };

        regionChartOptions = Object.assign({}, regionChartOptions);

        this.Highcharts.chart('region-alarm-container-both', regionChartOptions);

      } else {

        if (json['region'] && json['region']['api-error']) {
          this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'histoy', params);
          this.params['alarm']['region'] = params;
          this.alarmTitleInBoth = this.language['Alarm by Region'];
          this.errors['region'] = this.commonOrgService.pageErrorHandle(json['region']);
        } else {
          if (typeof json['region'] !== "undefined") {
            this.data['alarm']['region'] = this.chartOptionService.prepareAlarmCSVDataforRegion([], 'histoy', params);
            this.params['alarm']['region'] = params;
            this.alarmTitleInBoth = this.language['Alarm by Region'];
            let regionChartOptions: any = this.chartOptionService.regionChartOptions([], true, params);
            this.Highcharts.chart('region-alarm-container-both', regionChartOptions);
          }
        }
      }


      if (json && typeof json['region-event'] != 'undefined' && json['region-event'] && !json['region-event']['api-error']) {
        this.eventTitleInBoth = this.language['Event by Region'];
        this.eventChartType = 'region';
        this.loadRegionChart = true;
        this.regionError = false;
        let regionChartOptions: any = this.chartOptionService.getEventOptions(json['region-event'], 'region', params);
        this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion(json['region-event']);
        this.params['event']['region'] = params;
        regionChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            //console.log(event.point);
            that.clickedEventRegion = event.point.series.userOptions.data[index].uuid;
            //that.clickedSeverity = event.point.series.userOptions.data[index].severity;;
            that.alarmTypeInBoth = 'Event';

            that.deleteParams['event']['region']['region'] = true;

            that.getChartByLocation('Event');
          }
        };

        regionChartOptions = Object.assign({}, regionChartOptions);

        this.Highcharts.chart('region-event-container-both', regionChartOptions);

      } else {
        if (json['region-event'] && json['region-event']['api-error']) {
          this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion([]);
          this.params['event']['region'] = params;
          this.eventTitleInBoth = this.language['Event by Region'];
          this.errors['region-event'] = this.commonOrgService.pageErrorHandle(json['region-event']);
        } else {
          if (typeof json['region-event'] !== "undefined") {
            this.data['event']['region'] = this.chartOptionService.prepareEventCSVDataforRegion([]);
            this.params['event']['region'] = params;
            this.eventTitleInBoth = this.language['Event by Region'];
            let regionChartOptions: any = this.chartOptionService.getEventOptions([], true, params);
            this.Highcharts.chart('region-event-container-both', regionChartOptions);
          }


        }
      }


      if (json && typeof json['location'] != 'undefined' && json['location'] && !json['location']['api-error']) {
        this.alarmChartType = 'location';
        this.alarmTitleInBoth = this.language['Alarm by Location'];
        this.loadRegionChart = true;
        this.locationError = false;
        let locationChartOptions: any = this.chartOptionService.locationChartOptions(json['location'], false, params);
        this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation(json['location'], {}, 'histoy', params);
        this.params['alarm']['location'] = params;
        locationChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);

            that.clickedLocation = event.point.series.userOptions.data[index].locationId;
            that.clickedSeverity = event.point.series.userOptions.data[index].severity;;
            that.alarmTypeInBoth = 'Alarm';
            that.getAlarmBySystem('Alarm');
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            that.clickedLocation = event.point.series.userOptions.data[index].locationId;
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            that.params['alarm']['location']['location'] = event.point.series.userOptions.data[index].locationId;
            that.params['alarm']['location']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.params['alarm']['location']['status'] = titlepipe.transform(event.point.series.userOptions.stack);

            if (fields['location'] && fields['location'].indexOf('All') !== -1) {
              that.deleteParams['alarm']['location']['location'] = true;
            }

            if (!fields['severity']) {
              that.deleteParams['alarm']['location']['severity'] = true;
            }

            that.deleteParams['alarm']['location']['status'] = true;

            that.gotoFullScreen('location', 'Alarm');
          },
        };

        locationChartOptions = Object.assign({}, locationChartOptions);

        this.Highcharts.chart('location-alarm-container-both', locationChartOptions);

      } else {
        if (json['location'] && json['location']['api-error']) {
          this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'histoy', params);
          this.params['alarm']['location'] = params;
          this.alarmTitleInBoth = this.language['Alarm by Location'];
          this.errors['location'] = this.commonOrgService.pageErrorHandle(json['location']);
        } else {
          if (typeof json['location'] !== "undefined") {
            this.data['alarm']['location'] = this.chartOptionService.prepareAlarmCSVDataforLocation([], {}, 'histoy', params);
            this.params['alarm']['location'] = params;
            this.alarmTitleInBoth = this.language['Alarm by Location'];
            let locationChartOptions: any = this.chartOptionService.locationChartOptions([], true, params);
            this.Highcharts.chart('location-alarm-container-both', locationChartOptions);
          }


        }

      }

      if (json && typeof json['system'] != 'undefined' && json['system'] && !json['system']['api-error']) {
        this.alarmChartType = 'system';
        this.alarmTitleInBoth = this.language['Alarm by System'];
        this.loadRegionChart = true;
        this.systemError = false;
        let systemChartOptions: any = this.chartOptionService.systemChartOptions(json['system'], false, params);
        this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem(json['system'], {}, 'histoy', params);
        this.params['alarm']['system'] = params;
        systemChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            that.clickedSystem = event.point.options.category;
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
            that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);
            if (fields['system'] && fields['system'].indexOf('All') !== -1) {
              that.deleteParams['alarm']['system']['system'] = true;
            }
            if (!fields['severity']) {
              that.deleteParams['alarm']['system']['severity'] = true;
            }
            that.deleteParams['alarm']['system']['status'] = true;
            event.preventDefault()
            that.gotoFullScreen('system', 'Alarm');
          },
          contextmenu: function (event) {
            let index = $(this.series.data).index(this);
            event.preventDefault();
            that.clickedSystem = event.point.options.category;
            that.clickedSeverity = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.clickedAlarmTypeInBC = event.point.series.userOptions.stack;
            that.params['alarm']['system']['system'] = event.point.series.userOptions.data[index].systemId;
            that.params['alarm']['system']['severity'] = (event.point.series.userOptions.data[index].severity)?.toLowerCase();
            that.params['alarm']['system']['status'] = titlepipe.transform(event.point.series.userOptions.stack);
            if (fields['system'] && fields['system'].indexOf('All') !== -1) {
              that.deleteParams['alarm']['system']['system'] = true;
            }
            if (!fields['severity']) {
              that.deleteParams['alarm']['system']['severity'] = true;
            }
            that.deleteParams['alarm']['system']['status'] = true;
            that.gotoFullScreen('system', 'Alarm');
          },
        };

        this.Highcharts.chart('system-alarm-container-both', systemChartOptions);

        var elmnt = document.getElementById("both-systemwrapper");
        elmnt.scrollIntoView({ behavior: 'smooth' });
      } else {
        if (json['system'] && json['system']['api-error']) {
          this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'histoy', params);
          this.params['alarm']['system'] = params;
          this.alarmTitleInBoth = this.language['Alarm by System'];
          this.errors['system'] = this.commonOrgService.pageErrorHandle(json['system']);
        } else {
          if (typeof json['system'] !== "undefined") {
            this.data['alarm']['system'] = this.chartOptionService.prepareAlarmCSVDataforSystem([], {}, 'histoy', params);
            this.params['alarm']['system'] = params;
            this.alarmTitleInBoth = this.language['Alarm by System'];
            let systemChartOptions: any = this.chartOptionService.systemChartOptions([], true, params);
            this.Highcharts.chart('system-alarm-container-both', systemChartOptions);
          }
        }
      }


      if (json && typeof json['location-event'] != 'undefined' && json['location-event'] && !json['location-event']['api-error']) {
        this.eventChartType = 'location';
        this.eventTitleInBoth = this.language['Event by Location'];
        this.loadRegionChart = true;
        this.regionError = false;
        let regionChartOptions: any = this.chartOptionService.getEventOptions(json['location-event'], 'location', params);
        this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation(json['location-event']);
        this.params['event']['location'] = params;
        regionChartOptions.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);
            that.clickedEventLocation = event.point.series.userOptions.data[index].uuid;
            //that.clickedSeverity = event.point.series.userOptions.data[index].severity;;
            that.alarmTypeInBoth = 'Event';
            that.getAlarmBySystem('Event');
          }
        };

        regionChartOptions = Object.assign({}, regionChartOptions);

        this.Highcharts.chart('location-event-container-both', regionChartOptions);

      } else {
        if (json['location-event'] && json['location-event']['api-error']) {
          this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation([]);
          this.params['event']['location'] = params;
          this.eventTitleInBoth = this.language['Event by Location'];
          this.errors['location-event'] = this.commonOrgService.pageErrorHandle(json['location-event']);
        } else {
          if (typeof json['location-event'] !== "undefined") {
            this.data['event']['location'] = this.chartOptionService.prepareEventCSVDataforLocation([]);
            this.params['event']['location'] = params;
            this.eventTitleInBoth = this.language['Event by Location'];
            let locationChartOptions: any = this.chartOptionService.locationChartOptions([], true, params);
            this.Highcharts.chart('location-event-container-both', locationChartOptions);
          }
        }

      }

      if (json && typeof json['system-event'] != 'undefined' && json['system-event'] && !json['system-event']['api-error']) {
        this.eventChartType = 'system';
        this.eventTitleInBoth = this.language['Event by System'];
        this.loadRegionChart = true;
        this.regionError = false;
        let options: any = this.chartOptionService.getEventOptions(json['system-event'], 'system', params);
        this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem(json['system-event']);
        this.params['event']['system'] = params;
        options.plotOptions.series.point.events = {
          click: function (event) {
            let index = $(this.series.data).index(this);

            that.clickedSystem = event.point.series.userOptions.data[index].uuid;
            //that.clickedSeverity = event.point.series.userOptions.data[index].severity;;
            event.preventDefault()
            if (fields['system'] && fields['system'].indexOf('All') !== -1) {
              that.deleteParams['event']['system']['system'] = true;
            }
            that.gotoFullScreen('system', 'Event');
          },
          contextmenu: function (event) {
            event.preventDefault();
            let index = $(this.series.data).index(this);
            that.clickedSystem = event.point.series.userOptions.data[index].uuid;
            //that.clickedSeverity = event.point.series.userOptions.data[index].severity;
            if (fields['system'] && fields['system'].indexOf('All') !== -1) {
              that.deleteParams['event']['system']['system'] = true;
            }
            that.gotoFullScreen('system', 'Event');
          },
        };

        options = Object.assign({}, options);

        this.Highcharts.chart('system-event-container-both', options);

      } else {
        if (json['system-event'] && json['system-event']['api-error']) {
          this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem([]);
          this.params['event']['system'] = params;
          this.eventTitleInBoth = this.language['Event by System'];
          this.errors['system-event'] = this.commonOrgService.pageErrorHandle(json['system-event']);
        } else {
          if (typeof json['system-event'] !== "undefined") {
            this.data['event']['system'] = this.chartOptionService.prepareEventCSVDataforSystem([]);
            this.params['event']['system'] = params;
            this.eventTitleInBoth = this.language['Event by System'];
            let systemChartOptions: any = this.chartOptionService.systemChartOptions([], true, params);
            this.Highcharts.chart('system-event-container-both', systemChartOptions);
          }
        }
      }

      if (json && typeof json['byday'] === "object" && json['byday'] && !json['byday']['api-error']) {

        let options: any = this.chartOptionService.getLineChartOptionsNew(json['byday'], false, params, fields);
        this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay(json['byday'], '', params);

        this.Highcharts.stockChart('both-event-alarm-line-chart-container', options);

      } else {
        if (json['byday'] && json['byday']['api-error']) {
          this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([]);
          this.errors['byday'] = this.commonOrgService.pageErrorHandle(json['byday']);
        } else {
          if (typeof json['byday'] !== "undefined") {
            this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([]);
            let options: any = this.chartOptionService.getLineChartOptionsNew([], true, params, fields);

            this.Highcharts.stockChart('both-event-alarm-line-chart-container', options);
          }

        }
      }

      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
    });

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
    const subTitle = `${obj[chartType]} By ${obj[datatype]} \r\n${this.chartOptionService.getSubTitleStr(chartType, datatype)} \r\n`;
    let filename = '';
    if (this.issueService.getAlertType() === 'EVENTS') {
      filename = `${obj[chartType]}By${obj[datatype]}_${this.dateUtilsService.getDateTimeStrWithOffset()}`;
    } else {
      filename = `${(this.issueService.getFileTitleMap())?.[this.issueService.getAlertType()]}_HistoryReports_${obj[chartType]}By${obj[datatype]}_${this.dateUtilsService.getDateTimeStrWithOffset()}`;
    }
    this.exportExcelService.downLoadCSV(`${filename}`, data, subTitle);
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

  exportNew() {
    if (this.fsanvalidated("d")) return;
    this.disableExportBtn = true;

    let fields = this.filtersForm.value;
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
      customCategory = fields['customCategory'];
    } else {
      customCategory = undefined;
    }

    if (!(fields['eventName'] && fields['eventName'].length && fields['eventName'].indexOf('All') === -1)) {
      fields['eventName'] = undefined;
    }

    let system = '';
    if (this.systemName && this.systemName.length && this.systemName.indexOf('All') === -1) {
      let filtered = this.systemName.filter(function (el) {
        return (el && el.length && el !== 'All');
      });

      system = filtered;
    } else {
      system = undefined;
    }

    if (fields['severity'] && (fields['severity'].toLowerCase() === 'all' || fields['alarmType'].toLowerCase() === 'event')) {
      fields['severity'] = undefined;
    }


    let params = {
      region: this.regionName !== 'All' ? this.regionName : undefined,
      location: this.locationName !== 'All' ? this.locationName : undefined,
      fsan_serialnumber: fields['fsan'],
      alarmEventName: fields['eventName'],
      severity: fields['severity'],
      notificationType: fields['alarmType'],
      historyReport: true,
      category: category,
      customCategory: customCategory,
      system: system,
      cco_ack: fields['cco_ack'],
      cco_shelv: fields['cco_shelv']
    }

    params['alertType'] = this.appendAlarmType(params);

    if (params['notificationType'] !== 'Alarm') {
      delete params['cco_ack'];
      delete params['cco_shelv'];
    }

    params['date'] = this.issueService.getDateParam(fields);


    let query = "";
    let offset = (new Date()).toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

    // else {
    //   url += `&size=${(this.totalAlarms ? this.totalAlarms : 100) + (this.totalEvents ? this.totalEvents : 100)}`;
    // }

    if (fields['alarmType'] === 'Both') {
      delete params['notificationType'];
      query = this.issueService.buildQuery(params);
      const requests = {};

      let types = ['Event', 'Alarm'];

      types.forEach(type => {
        let url = `${this.baseUrl}notifications?${query}&from=0&exportReport=true&timeZone=${encodeURIComponent(offset)}`;
        if (type === 'Event') {
          url += `&notificationType=${type}&size=${this.Export_FileSize(this.removeCommaInNumber(this.totalEvents))}`;
        } else {
          url += `&notificationType=${type}&size=${this.Export_FileSize(this.removeCommaInNumber(this.totalAlarms) + this.totalAlarms_cleared)}`;
        }

        const req = this.http.get(`${url}`);

        requests[type] = req;

      });
      const s3requests = {};
      let alarmS3Url, eventS3Url = '';
      requests['Alarm'].subscribe((json: any) => {
        if (json?.s3Url) {
          alarmS3Url = json?.s3Url;
          s3requests['Alarms'] = this.http.get(`${json?.s3Url}`, { responseType: 'blob' }).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            })
          );
        }
      }, err => {
        //todo
      }, () => {
        requests['Event'].subscribe((json: any) => {
          if (json?.s3Url) {
            eventS3Url = json?.s3Url;
            s3requests['Events'] = this.http.get(`${json?.s3Url}`, { responseType: 'blob' }).pipe(
              catchError(err => {
                err['api-error'] = true;
                return of(err);
              })
            );
          }
        }, err => {
          //todo
        }, () => {
          forkJoin(s3requests).subscribe((res: any) => {
            if (res['Alarms']) {
              let filename = alarmS3Url.split('/').pop().split('?')[0];
              saveAs(res['Alarms'], `${filename}`);
            }
            if (res['Events']) {
              let filename = eventS3Url.split('/').pop().split('?')[0];
              saveAs(res['Events'], `${filename}`);
            }
            this.disableExportBtn = false;
          }, err => {
            this.disableExportBtn = false;
          });
        });
      });

    } else {
      query = this.issueService.buildQuery(params);

      let url = `${this.baseUrl}notifications?${query}&from=0&exportReport=true&timeZone=${encodeURIComponent(offset)}`;
      const countObj: any = this.issueService.getAlertsCount();
      if (fields['alarmType'] === 'Alarm') {
        url += `&size=${this.Export_FileSize(countObj.alerts)}`;
      } else if (fields['alarmType'] === 'Event') {
        url += `&size=${this.Export_FileSize(countObj.events)}`;
      }

      this.http.get(url).subscribe((json: any) => {
        if (json?.s3Url) {
          this.http.get(json?.s3Url, { responseType: 'blob' }).subscribe((res: any) => {
            let filename = json?.s3Url.split('/').pop().split('?')[0];
            saveAs(res, `${filename}`);
            this.disableExportBtn = false;
          }, err => {
            this.disableExportBtn = false;
          });
        }

      }, err => {
        this.disableExportBtn = false;
      });
    }

  }

  Export_FileSize(count) {
    if (count <= 9999)
      return count;
    else if (count > 9999)
      return 10000;
    else
      return 100;
  }

  downloadFile(filePath) {
    var link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }

  resetALarmEventChart() {
    if (this.applyFiltersInFS) {
      this.applyFiltersInFullScreen();
    } else {
      this.gotoFullScreen(this.fullscreenParams[0], this.fullscreenParams[1], this.fullscreenParams[2], this.fullscreenParams[3]);
    }

  }

  removeCommaInNumber(num) {
    num = num?.replace(/\,/g, '');
    return parseInt(num);
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

  gotoSubscriberImpactedPage(issue?: any) {
    if (issue) {
      issue.redirectUrl = `/cco/alerts/${this.issueService.getAlertType()?.toLowerCase()}/history-reports`;
    }
    localStorage.setItem('calix.impactedSubsFSANData', JSON.stringify(issue));
    this.router.navigate(['/cco/system/subscribers-impact']);
  }

  getListNew(chartName, alarmType?: any, applyFiltersInFS?: any, searchTerm?: any, extraQuery?: any) {
    if (!this.fullScreen) {
      return;
    }
    let params = {};

    params = this.params[alarmType?.toLowerCase()][chartName];

    console.log(params);

    if (this.clickOnRaisedAlarms) {
      params['status'] = 'Raised';
    }

    if (this.clickedAlarmTypeInBC === 'cleared') {
      params['status'] = 'Cleared';
    } else if (this.clickedAlarmTypeInBC === 'raised') {
      params['status'] = 'Raised';
    } else {
      delete params['status'];
    }
    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "" || (params['notificationType'] === 'Event' && this.skipParamsForEvents.indexOf(key) !== -1)) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    if (extraQuery) {
      query += `&${extraQuery}`;
    }

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
    this.searchSub = fromEvent(document.getElementById('alarms-list-search-history'), 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((e: any) => {
          this.paginateLoading = true;
          return this.getListNew(this.chartTypeInFS, this.clickedAlarmType, this.applyFiltersInFS, e.target.value).pipe(
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
    this.getListNew(this.chartTypeInFS, this.clickedAlarmType, this.applyFiltersInFS, searchTerm, extraQuery).subscribe((resp: any) => {
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

  paginateQuery = '';
  entry = new FormControl(10);
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
  onRefreshAckShelve(value: any) {
    this.showAckShelveBtn = false;
  }

  setAppliedFilters() {
    const removeFilters = this.issueService.getRemoveFiltersData();
    const alertType = this.issueService.getAlertType();
    removeFilters[alertType]?.forEach((ele: any) => {
      this.appliedFilters[ele] = false;
    });

  }

  generateEvent(params: any, event: any, index: any, alarmType: any, type: any, that: any) {
    const fields = this.filtersForm.value;
    if (params['notificationType'] === 'Event') {
      that.params['event'][type][type] = event.point.series.userOptions.data[index].uuid;
    } else {
      that.clickedRegion = event.point.series.userOptions.data[index].regionId;
    }

    that.deleteParams['event'][type][type] = true;
    event.point.setState('hover');

    that.initLoad = false;
    that.showTable = false;

    setTimeout(() => {
      that.showTable = true;
      that.count = 0;
      that.getListSub();
    }, 500);
  }

  renderAlarmByDay(json: any, params: any, fields: any) {
    if (json && json && this.alarmType === 'Alarm' && json && !json['api-error']) {
      let options: any = this.chartOptionService.getLineChartOptionsNew(json, false, params, fields);
      this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay(json, '', params);
      Highcharts.setOptions({
        lang: {
          rangeSelectorZoom: this.language['duration'],
        }
      });

      this.Highcharts.stockChart('event-alarm-line-chart-container', options);

    } else {
      if (json && json['api-error']) {
        this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([]);
        this.errors['byday'] = this.commonOrgService.pageErrorHandle(json);
      } else {
        if (typeof json !== "undefined") {
          this.data['alarm']['byday'] = this.chartOptionService.prepareAlarmCSVDataforDay([]);
          let options: any = this.chartOptionService.getLineChartOptionsNew([], true, params, fields);
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

  appendAlarmType(params: any) {
    if (params['notificationType'] === 'Alarm') {
      return this.issueService.getAlertType()
    } else {
      return undefined;
    }
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
    if (json && json && !json?.['api-error']) {
      let severityChartData: any = json['alarm'] ? json['alarm'] : {};
      this.serverityError = false;
      let clearedChartOptions: any;
      let severityChartOptions: any;
      if (this.alarmType == 'Alarm') {
        this.exportAlarmCount = this.getCountByDataObj(json);
        severityChartOptions = this.chartOptionService.severityChartOptions(severityChartData.raised, this.language["Alarms Raised"], "medium", params);
        clearedChartOptions = this.chartOptionService.severityChartOptions(severityChartData.cleared, this.language["Alarms Cleared"], "medium", params);
        this.params['alarm']['severity'] = params;
        this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity(severityChartData, 'histoy', params);
      } else {
        severityChartOptions = this.chartOptionService.severityEventChartOptions(severityChartData.raised, this.language["Events Raised"], "medium");
        clearedChartOptions = this.chartOptionService.severityEventChartOptions(severityChartData.cleared, this.language["Events Cleared"], "medium");
      }
      severityChartOptions.plotOptions.series.point.events = {
        dblclick: (event: any) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity', 'Alarm');
        },
        contextmenu: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity', 'Alarm');
        },
        click: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity', 'Alarm');
        }
      };
      clearedChartOptions.plotOptions.series.point.events = {
        dblclick: (event: any) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);

          this.gotoFullScreen('severity', 'Alarm');
        },
        contextmenu: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity', 'Alarm');
        },
        click: (event) => {
          event.preventDefault();
          let name = event.point.severity;
          this.clickedSeverity = name.toLowerCase();
          this.params['alarm']['severity']['severity'] = name.toLowerCase();
          this.deleteParams['alarm']['severity']['severity'] = true;
          let userParams = that.chartOptionService.getUserFilters('alarm', 'severity');
          userParams['Severity'] = titlepipe.transform(name);
          this.gotoFullScreen('severity', 'Alarm');
        }
      };
      this.Highcharts.chart('severityContainer', severityChartOptions);
      this.Highcharts.chart('severityClearedContainer', clearedChartOptions);

    } else {
      if (json && json['api-error']) {
        this.params['alarm']['severity'] = params;
        this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'histoy', params);
        this.errors['severity'] = this.commonOrgService.pageErrorHandle(json);
      } else {
        if (typeof json !== "undefined") {
          this.params['alarm']['severity'] = params;
          this.data['alarm']['severity'] = this.chartOptionService.prepareAlarmCSVDataforSeverity({}, 'histoy', params);

          let severityChartOptions = this.chartOptionService.severityChartOptions([], this.language["Alarms Raised"], "medium", params);
          this.Highcharts.chart('severityContainer', severityChartOptions);

          let clearedChartOptions = this.chartOptionService.severityChartOptions([], this.language["Alarms Cleared"], "medium", params);
          this.Highcharts.chart('severityClearedContainer', clearedChartOptions);
        }
      }

    }

    this.loaders['alarm']['severity'] = false;
  }

}
