import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { PrimeNGConfig } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationReportApiService } from '../../applications/reports/application-report-api.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import * as moment from 'moment';
import { TrafficComponent } from './traffic/traffic.component';
import { TopLocationsComponent } from './top-locations/top-locations.component';
import { TopSubscribersComponent } from './top-subscribers/top-subscribers.component';
import { ChartOptionsService } from '../../shared/chart-options.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { FilterPresets } from '../../shared/favorites-api.service';

@Component({
  selector: 'app-application-reports',
  templateUrl: './application-reports.component.html',
  styleUrls: ['./application-reports.component.scss']
})
export class ApplicationReportsComponent implements OnInit {

  @ViewChild('TrafficComponent', { static: false }) public TrafficComponent: TrafficComponent;
  @ViewChild('TopLocationsComponent', { static: false }) private TopLocationsComponent: TopLocationsComponent;
  @ViewChild('TopSubscribersComponent', { static: false }) private TopSubscribersComponent: TopSubscribersComponent;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  @ViewChild('scheduleReportModal', { static: true }) private scheduleReportModal: TemplateRef<any>;


  language: any;
  locations: any = [];
  locationsSelected: any = [];
  locationsSelectedNames: any = ['All'];
  applications: any = [];
  applicationsSelected: any = [];
  applicationsSelectedNames: any = [];

  //applicationsOnly: any = [];
  applicationGroups: { id: string, name: string }[] = [];
  applicationGroupSelected: string[];
  applicationGroupSelectedNames: string[];
  criteria: any = [];
  criteriaSelected: any;
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  limit: any;
  groups: any = [];
  groupSelected: any;
  directions: any = [];
  directionSelected: any;
  runActive: boolean = false;
  Initialloading: boolean = false;
  searchInputLocText = '';
  searchInputAppText = '';
  searchInputAppGroupText = '';
  peakRateFrom: any = 4;
  peakRateTo: any = 5;
  period: any = [
    {
      name: 'Last month',
      value: '-1'
    },
    {
      name: 'Last 3 months',
      value: '-3'
    },
    {
      name: 'Last 6 months',
      value: '-6'
    },
    {
      name: 'Last year',
      value: '-12'
    },

  ];
  periodSelected: any = '-1';

  scope: any = [
    {
      name: 'Overall',
      value: '1'
    },
    {
      name: 'Within Location',
      value: '2'
    },
    {
      name: 'Out of Location',
      value: '3'
    }
  ];
  scopeSelected: any = '1';
  treshold: any = '0';
  thresholdTypeSelected: any = 'AllEndpoints';
  eliminateUnknownSelected: any = 'no';
  aggregateSelected: any = 'false';
  endHour: any = 23;
  startHour: any = 0;
  monthSelected: any = '2020-06-01';
  rateSelected: any = 'Average';
  monthCount: any = 3;
  minDate = new Date();

  metricSelected = 'Rate';
  month: any = [];
  rate = [
    {
      name: 'Average',
      value: 'Average'
    },
    {
      name: 'Peak',
      value: 'Peak'
    },
  ]
  aggregate: any = [
    {
      name: 'No',
      value: 'false'
    },
    {
      name: 'Yes',
      value: 'true'
    }
  ];

  eliminateUnknown: any = [
    {
      name: 'No',
      value: 'no'
    },
    {
      name: 'Yes',
      value: 'yes'
    }
  ];

  thresholdType: any = [
    {
      name: 'All Endpoints',
      value: 'AllEndpoints'
    },
    {
      name: 'Unresolvable Endpoints',
      value: 'UnresolvableEndpoints'
    }
  ];

  metric: any = [
    {
      name: 'Rate',
      value: 'Rate'
    },
    {
      name: 'Packets',
      value: 'Packets'
    }
  ];

  pageDetails: any
  appSubs: any;
  locSubs: any;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  combineLatest: any;
  parallelReqSubscribtion: any;
  globalApps: any;
  curOrgApps: any;
  loading: boolean;
  startTime: number = 0;
  endTime: number = 25;
  isRate: boolean = false;
  isOneDate: boolean = false;
  timeRange: string = "0 - 24"
  secureAccessRole: any;
  orgidfromlocal: any;
  loginData: any;
  sensitiveChecked = false;

  slideOptions: Options = {
    floor: 1,
    ceil: 25,
    translate: (value: number, label: LabelType): string => {
      return `<b>${(value <= 73 && value >= 1) ? (value - 1) : 24}</b>`;
    }
  };

  types: any = [];
  typeSelected: string = 'traffic';
  hasScopeAccess: boolean = false;
  urlParams: any;
  isDev: boolean;
  hasClickRun: boolean = false;
  forkJoinSubscription: any;

  constructor(
    private customTranslateService: CustomTranslateService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private canlenderConfig: PrimeNGConfig,
    private dialogService: NgbModal,
    private apiService: ApplicationReportApiService,
    private commonOrgService: CommonService,
    public service: ChartOptionsService,
    public websocketservice: WebsocketService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private callOutComeService: CallOutComeService,
    private dateUtils: DateUtilsService,
  ) {
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.isDev = true;
    } else this.isDev = false
    this.websocketservice.previousURL = this.router.url;
    this.Initialloading = true;
    let date = new Date();
    this.startDate = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
    this.minDate = new Date(date.getTime() - (270 * 24 * 60 * 60 * 1000));
    this.language = this.customTranslateService.defualtLanguage;
    this.setHideShowFilter();
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.changeClenderlang();
      this.intializeValues();
      this.setTitle(this.router.url)
    });
    this.setMonthData();
    this.service.btnDisabled = false;

  }
  setTitle(url) {
    if (url.includes('cco/traffic/applications/reports')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Applications']} - ${this.language['Traffic']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else if (url.includes('organization-admin/flowAnalyze/traffic/application/reports')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Applications']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    } else if (url.includes('systemAdministration/flowAnalyze/traffic/application/reports')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Applications']} - ${this.language['Traffic']} - ${this.language['flowconfiguration']} - ${this.language['System Administration']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit() {

    this.sensitiveChecked = sessionStorage.getItem("showSensitiveInfo") == "true" ? true : false;
    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/traffic/') > -1) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications.report') !== -1) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      this.websocketservice.previousURL = "";
      //this.router.navigate(['/cco/traffic/applications/realtime']);
      return;
    } else {
      this.sso.setPageAccess(true);
    }
    this.getLocations();
    this.getApps();
    this.criteriaSelected = 'usage';

    setTimeout(() => {
      this.Initialloading = false;
    }, 2500)

    this.route.queryParams.subscribe(params => {
      this.urlParams = params;
      if (this.urlParams.typeSelected) {
        this.typeSelected = this.urlParams.typeSelected;
      }
      if (this.urlParams['applicationsSelected'] && this.urlParams['isApplicationGroup'] == 'no') {
        this.applicationsSelected = Array.isArray(this.urlParams['applicationsSelected']) ? this.urlParams['applicationsSelected'] : [this.urlParams['applicationsSelected']];
      }
      if (this.urlParams['applicationsSelected'] && this.urlParams['isApplicationGroup'] == 'yes') {
        this.applicationGroupSelected = Array.isArray(this.urlParams['applicationsSelected']) ? this.urlParams['applicationsSelected'] : [this.urlParams['applicationsSelected']];
      }
      if (this.urlParams['locationsSelected']) {
        this.locationsSelected = Array.isArray(this.urlParams['locationsSelected']) ? this.urlParams['locationsSelected'] : [this.urlParams['locationsSelected']];
      }
      if (this.urlParams['startDate']) {
        this.startDate = new Date(this.urlParams['startDate']);
      }
      if (this.urlParams['endDate']) {
        this.endDate = new Date(this.urlParams['endDate']);
      }
      let diff = moment(this.getISOEndOfDay(this.endDate)).diff(moment(this.getISODate(this.startDate)), "hour");
      if (diff <= 72 && this.urlParams["criteria"] === 'rate') {
        this.isRate = true;
        this.slideChangeDate(diff);
      }
      if (this.urlParams["criteria"]) {
        this.criteriaSelected = this.urlParams["criteria"];
      }
      // if (this.urlParams['isApplicationGroup'] && this.urlParams['isApplicationGroup'] == 'yes') {
      //   setTimeout(() => {
      //     let id = Array.isArray(this.urlParams['applicationsSelected']) ? this.urlParams['applicationsSelected'] : [this.urlParams['applicationsSelected']];
      //     this.getApplicationGroup(id);
      //   }, 1500)
      //   this.runActive = true;
      // }

      if (this.applicationsSelected?.length > 0 || this.applicationGroupSelected?.length > 0) {
        setTimeout(() => {
          // this.locationsSelectedNames = ['All'];
          this.loadChartData(true);
        }, 5000)
        this.runActive = true;
      }
    });

    this.intializeValues();
    this.limit = 10;
    this.groupSelected = 'no';
    this.directionSelected = 'Down';
  }

  setTopSubEndpointFilters() {
    if (window.sessionStorage.getItem('traffic_TopSub_Endpoint_filters')) {
      let filters = JSON.parse(window.sessionStorage.getItem('traffic_TopSub_Endpoint_filters'));
      this.typeSelected = 'top_subscribers';
      this.startDate = new Date(filters['startDate']);
      this.endDate = new Date(filters['endDate']);
      this.criteriaSelected = filters["criteriaSelected"];
      this.limit = filters['limit'];
      this.directionSelected = filters['directionSelected'];
      this.locationsSelected = filters['locationsSelected'].includes('All') ? this.applications.map(a => a.value) : filters['locationsSelected'];
      this.applicationsSelected = filters['applicationsSelected'];
      this.applicationGroupSelected = filters['applicationGroupSelected'];
      this.runActive = true;
      this.setHideShowFilter();
    }
    this.orgidfromlocal = localStorage.getItem('calix.org_id') ?? ' ';
    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    if (sessionStorage.getItem('Orgacceforssid')) {
      this.secureAccessRole = 'Calix'
    }
    else {
      this.secureAccessRole = 'BSP'
    }
  }

  ngOnDestroy(): void {
    if (this.appSubs) this.appSubs.unsubscribe();
    if (this.locSubs) this.locSubs.unsubscribe();
    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
    if (this.forkJoinSubscription) this.forkJoinSubscription.unsubscribe();
  }

  dropDownItemsLocClear(isRequired: boolean) {
    this.locationsSelected = [];
    if (isRequired) {
      this.runActive = false;
    }
  }

  dropDownAppItemsClear(isRequired: boolean) {
    this.applicationsSelected = [];
    if (isRequired) {
      this.runActive = false;
    }
  }

  dropDownAppGroupItemsClear(isRequired: boolean) {
    this.applicationGroupSelected = [];
    if (isRequired) {
      this.runActive = false;
    }
  }

  intializeValues() {
    this.types = [
      {
        name: "Traffic",
        value: 'traffic'
      },
      {
        name: "Top Locations",
        value: 'top_locations'
      },
      {
        name: "Top Subscribers",
        value: 'top_subscribers'
      }
    ];

    this.rate = [
      {
        name: this.language['Average'],
        value: 'Average'
      },
      {
        name: this.language['Peak'],
        value: 'Peak'
      },
    ]

    this.criteria = [
      {
        name: 'Usage',
        value: 'usage'
      },
      {
        name: 'Rate',
        value: 'rate'
      }
    ];

    this.groups = [
      {
        name: this.language['Yes'],
        value: 'yes'
      },
      {
        name: this.language['No'],
        value: 'no'
      },
    ];

    this.directions = [
      {
        name: this.language['Down'],
        value: 'Down'
      },
      {
        name: this.language['Up'],
        value: 'Up'
      },
      {
        name: this.language['Both(Down+Up)'],
        value: 'both'
      }
    ];
  }

  getIndeterminateGroup(item) {
    return item.children && item.children.some(c => c.selected) && !item.children.every(c => c.selected);
  }

  changeDate() {
    let diff = moment(this.getISOEndOfDay(this.endDate)).diff(moment(this.getISODate(this.startDate)), "hour");
    if (diff > 0) {
      this.slideChangeDate(diff);
    } else {
      this.isOneDate = false;
      let date = new Date(this.startDate);
      this.endDate = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000));
      if (this.endDate > this.maxDate) {
        this.endDate = this.maxDate;
      }
      diff = moment(this.getISOEndOfDay(this.endDate)).diff(moment(this.getISODate(this.startDate)), "hour");
      this.slideChangeDate(diff);
    }
  }

  slideChangeDate(diff: any) {
    if (diff <= 72) {
      this.isOneDate = true;
      const newOptions: Options = Object.assign({}, this.slideOptions);
      newOptions.ceil = (diff == 24) ? 25 : (diff == 48) ? 49 : (diff == 72) ? 73 : 25;
      this.startTime = 1;
      this.endTime = (diff == 24) ? 25 : (diff == 48) ? 49 : (diff == 72) ? 73 : 25;
      this.timeRange = (diff == 24) ? "0 - 24" : (diff == 48) ? "0 - 48" : (diff == 72) ? "0 - 72" : "0 - 24";
      this.slideOptions = newOptions;
    } else {
      this.isOneDate = false;
    }
  }

  changeFilter() {
  }

  changeLocation() {
    if (this.locationsSelected.length > 1 && this.locationsSelected.includes("All")) {
      if (this.locationsSelected.indexOf("All") === 0) {
        let arr = Object.assign([], this.locationsSelected);
        let index = arr.indexOf("All");
        arr.splice(index, 1);
        this.locationsSelected = arr;
      } else if (this.locationsSelected.indexOf("All") > 0) {
        this.locationsSelected = ["All"];
      }
    }
    this.getLocationNames();
  }

  getLocationNames() {
    this.locationsSelectedNames = [];
    if (this.locationsSelected && this.locationsSelected.length) {
      if ((this.locationsSelected.length === this.locations.length) || this.locationsSelected.includes('All')) {

        this.locationsSelectedNames = ['All'];
      } else {
        this.locationsSelected.forEach(e => {
          let match = this.locations.filter((el) => el.value == e);
          if (match.length) {
            this.locationsSelectedNames.push(match[0].name);
          }
        });
      }
    } else {
      this.locationsSelectedNames = ['All']
    }
  }

  changeApplication() { //commented below lines as due to story CCL-58646 for bringing up new drop down (App Group) and remove "ALL" in both drop downs(app and app group)

    // if (this.applicationsSelected.length > 1 && this.applicationsSelected.includes("All")) {
    //   if (this.applicationsSelected.indexOf("All") === 0) {
    //     let arr = Object.assign([], this.applicationsSelected);
    //     let index = arr.indexOf("All");
    //     arr.splice(index, 1);
    //     this.applicationsSelected = arr;
    //   } else if (this.applicationsSelected.indexOf("All") > 0) {
    //     this.applicationsSelected = ["All"];
    //   }
    // }

    if (this.applicationsSelected.length != 0) {
      this.runActive = true;
    } else {
      this.runActive = false;
    }
    this.getApplicationNames();

  }

  getApplicationNames() {
    this.applicationsSelectedNames = [];
    if (this.applicationsSelected && this.applicationsSelected.length) {
      // if (this.applicationsSelected.length === this.applications.length) {
      //   this.applicationsSelectedNames = ['All'];
      // }
      //  else

      this.applicationsSelected.forEach(e => {
        let match = this.applications.filter(el => el.value === e);
        if (match.length) {
          this.applicationsSelectedNames.push(match[0].label);
        }
      });

    }
    // else {
    //   this.applicationsSelectedNames = ['All'];
    // }
  }

  changeApplicationGroup() { //commented below lines as due to story CCL-58646 for bringing up new drop down (App Group) and remove "ALL" in both drop downs(app and app group)
    // if (this.applicationGroupSelected.length > 1 && this.applicationGroupSelected.includes("All")) {
    //   if (this.applicationsSelected.indexOf("All") === 0) {
    //     let arr = Object.assign([], this.applicationsSelected);
    //     let index = arr.indexOf("All");
    //     arr.splice(index, 1);
    //     this.applicationsSelected = arr;
    //   } else if (this.applicationsSelected.indexOf("All") > 0) {
    //     this.applicationsSelected = ["All"];
    //   }
    // }

    if (this.applicationGroupSelected.length != 0) {
      this.runActive = true;
    } else {
      this.runActive = false;
    }
    this.getApplicationGroupNames();

  }

  getApplicationGroupNames() {
    this.applicationGroupSelectedNames = [];
    if (this.applicationGroupSelected && this.applicationGroupSelected.length) {
      // if (this.applicationGroupSelected.length === this.applicationGroups.length) {
      //   this.applicationGroupSelectedNames = ['All'];
      // }
      //else
      this.applicationGroupSelected.forEach(e => {
        let match = this.applicationGroups.filter(el => el.id == e);
        if (match.length) {
          this.applicationGroupSelectedNames.push(match[0].name);
        }
      });

    }
    //  else {
    //   this.applicationsSelectedNames = ['All'];
    // }
  }

  clearSearch(search, select) {
    search.value = '';
    select.filter('');
    this.searchInputAppText = '';
    this.searchInputLocText = '';
    this.searchInputAppGroupText = '';

  }

  changeCriteria() {
    if (this.criteriaSelected == 'rate') {
      this.isRate = true;
      this.directions = [
        {
          name: this.language['Down'],
          value: 'Down'
        },
        {
          name: this.language['Up'],
          value: 'Up'
        }
      ];
      this.directionSelected = 'Down';
    } else {
      this.isRate = false;
      this.directions = [
        {
          name: this.language['Down'],
          value: 'Down'
        },
        {
          name: this.language['Up'],
          value: 'Up'
        },
        {
          name: this.language['Both(Down+Up)'],
          value: 'both'
        }
      ];
    }
  }

  // get sensitiveInfoChecked(): boolean {
  //   return sessionStorage.getItem("showSensitiveInfo") == "true";
  // }

  confirmShow() {
    const request = {
      "accessType": this.secureAccessRole,
      "accountId": "",
      "accountName": "",
      "action": "pii",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": "",
      "deviceType": "",
      "objectType": "Traffic/Top Endpoints",
      "orgId": this.orgidfromlocal,
      "originator": this.loginData?.username,
      "description": "Show PII subscriber data"
    };
    this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
      if (res) {
        this.loading = false;
      }
    }, (error: any) => {
    })
    sessionStorage.setItem('showSensitiveInfo', 'true');
    this.loadChartData(false);
    setTimeout(() => this.dialogService.dismissAll(), 200);
  }

  sensitiveModalCancel(modal): void {
    modal.close('');
    this.sensitiveChecked = false;
  }

  loadChartDataOrModal(showSensitiveChecked: boolean, modal: any) {
    if (showSensitiveChecked && sessionStorage.getItem('showSensitiveInfo') != 'true') {
      this.modalOpener(modal);
    }
    else {
      sessionStorage.setItem('showSensitiveInfo', showSensitiveChecked ? 'true' : 'false');
      this.loadChartData(false);
    }
  }

  loadChartData(timeout: any) {
    if (!this.typeSelected) {
      this.modalTitle = this.language['Invalid input'];
      this.modalInfo = this.language.Select_Type_Reports;
      this.openModalInfo();
      return;
    };
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      // this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
    if (!this.validatePeakRate()) {
      this.modalTitle = this.language['Invalid input'];
      this.modalInfo = this.language['You must apply input values before the report can be displayed.']
      this.openModalInfo();
      return;
    };
    if (this.limit > 500) {
      this.limit = 500
    }

    this.getApplicationNames();
    this.getLocationNames();
    let data = {};
    data['locationsSelected'] = (this.locationsSelected && this.locationsSelected.length > 0 && this.locationsSelected.length === this.locations.length) ? ['All'] : this.locationsSelected;
    data['locationsSelectedNames'] = this.locationsSelectedNames;
    data['applicationsSelected'] = this.applicationsSelected;
    data['applicationGroupSelected'] = this.applicationGroupSelected;
    data['applicationsSelectedNames'] = this.applicationsSelectedNames;
    data['applicationGroupSelectedNames'] = this.applicationGroupSelectedNames;
    data['criteriaSelected'] = this.criteriaSelected;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['limit'] = (this.limit == 0 || this.limit) ? this.limit : 10;
    data['groupSelected'] = this.groupSelected;
    data['directionSelected'] = this.directionSelected;
    data['rateSelected'] = this.rateSelected;
    data['monthCount'] = this.monthCount;
    data['threshold'] = this.treshold;
    data['metric'] = this.metricSelected;
    data['monthSelected'] = this.monthSelected;
    data['eliminateUnknownSelected'] = this.eliminateUnknownSelected;
    data['aggregateSelected'] = this.aggregateSelected;
    data['thresholdTypeSelected'] = this.thresholdTypeSelected;
    data['scopeSelected'] = this.scopeSelected;
    data['startHour'] = this.startHour;
    data['endHour'] = this.endHour;
    data['periodSelected'] = this.periodSelected;
    data['peakRateFrom'] = this.peakRateFrom;
    data['peakRateTo'] = this.peakRateTo;
    data["startTime"] = this.startTime;
    data["endTime"] = this.endTime;
    data["showTimeRange"] = (this.typeSelected == 'traffic' ? true : false);
    this.service.btnDisabled = true;
    let delay = timeout ? 1000 : 0;
    this.hasClickRun = true;
    setTimeout(() => {
      if (this.typeSelected == 'traffic') {
        this.TrafficComponent?.loadChartData(data);
      } else if (this.typeSelected == 'top_locations') {
        this.TopLocationsComponent?.loadChartData(data);
      } else if (this.typeSelected == 'top_subscribers') {
        this.TopSubscribersComponent?.loadChartData(data);
      }
    }, delay)

  }

  setMonthData() {
    this.month = [];

    var now = new Date();
    this.month.push({
      name: this.formatDate(now),
      value: this.formatDateFull(now),
    })

    for (let i = 0; i < 3; i++) {
      let prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
      this.month.push({
        name: this.formatDate(prevMonthFirstDate),
        value: this.formatDateFull(prevMonthFirstDate),
      })
      now = prevMonthFirstDate;
    }

    this.monthSelected = this.month[0].value;

  }

  formatDateFull(date) {
    return date.getFullYear() + '-' + this.formatDateComponent(date.getMonth() + 1) + '-' + this.formatDateComponent(date.getDate());
  }

  formatDate(date) {
    return date.getFullYear() + '-' + this.formatDateComponent(date.getMonth() + 1);
  }

  formatDateComponent(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  }

  locObj = {};
  getLocations(): any {
    let url = `${environment.FA_API_BASE_URL}config/location?org-id=${this.sso.getOrganizationID(this.router.url)}`;
    this.locSubs = this.http.get(url).subscribe((json: any) => {

      let data = [];

      let obj = {
        name: "All",
        value: "All"
      }

      json.forEach(element => {
        data.push({
          name: element.name,
          value: element._id,
          region: element.region ? element.region : null
        });

        this.locObj[element._id] = element.name;
      });

      this.locations = data.filter((value, index, self) =>
        index === self.findIndex((t) => (t.value === value.value))
      );
      this.locations.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false })).sort((a, b) => (a["region"] || "").toString().localeCompare((b["region"] || "").toString(), 'en', { numeric: false }));
      // this.locations.splice(0, 0, obj);
      if (this.urlParams['locationsSelected']) {
        if (this.locationsSelected.includes('All')) {
          this.locationsSelected = this.locations.map(l => l.value);
        }
        this.getLocationNames();
      }
    }, (err: HttpErrorResponse) => {
      this.locations = [];
    });
  }

  appObj = {};
  getAppsOld(): any {
    let url = `${environment.FA_API_BASE_URL}config/application?org-id=0`;
    this.appSubs = this.http.get(url).subscribe((json: any) => {
      let data = [];

      if (json) {
        json.forEach(element => {
          data.push({
            label: element.name,
            value: element._id,
            app: element.name
          });

          this.appObj[element._id] = element.name;
        });
      }


      this.applications = [...data];
    }, (err: HttpErrorResponse) => {
      this.applications = [];
    });
  }

  getApps() {
    const requestEndpoints = [
      `${environment.faAdminURL}application?org-id=0`,
      `${environment.faAdminURL}application?org-id=${this.sso.getOrganizationID(this.router.url)}`,
      `${environment.faAdminURL}application-group?org-id=0`,
      `${environment.faAdminURL}application-group?org-id=${this.sso.getOrganizationID(this.router.url)}`,
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.apiService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }), catchError((error: any) => {
        return of(error);
      }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.globalApps = response[0];
      this.curOrgApps = response[1];
      let applicationGroup: any = [];
      if (Array.isArray(response[2]) || Array.isArray(response[3])) {
        applicationGroup = [...response[2], ...response[3]];
      }

      this.applications = [];
      let obj = {
        app: "All",
        label: "All",
        name: "All",
        type: "Global",
        value: "All",
        _id: "All"
      }
      if (Array.isArray(this.combineApps())) {
        this.applications = [...this.combineApps()];
      }
      this.applications.forEach(element => {
        applicationGroup.forEach(items => {
          if (element._id === items.applicationId) {
            element['groupName'] = items.trafficTypeName;
            element['groupId'] = items.groupId;
          }
        })
      })

      let application = [];
      applicationGroup.forEach(items => {
        if (items.marketingCloudAppName) {
          let obj = {
            app: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            groupName: items.trafficTypeName,
            groupId: items.groupId,
            label: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            name: items.applicationName ? items.applicationName : items.marketingCloudAppName,
            _id: items.applicationId,
            value: items.applicationId
          }
          application.push(obj)
        }
      })

      // this.applications.forEach(element => {
      //   application.forEach(items => {
      //     if (element.name === items.name && !element.groupName) {
      //       element['groupName'] = items.groupName;
      //     }
      //     if (!element.groupName && element.name.includes('VPN') && items.groupName === 'VPN') {
      //       element['groupName'] = items.groupName;
      //     }
      //   })
      // })

      // this.applications = this.applications.reduce((unique, obj1) => {
      //   if (!unique.some(obj => obj.name === obj1.name && obj.groupName === obj1.groupName)) {
      //     unique.push(obj1);
      //   }
      //   return unique;
      // }, []);

      this.applications.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
      let result = this.applications.filter(element => {
        if (element['groupName']) {
          return element;
        }
      });
      let result1 = this.applications.filter(element => {
        if (!element['groupName']) {
          return element;
        }
      });

      let finalResult = [];
      if (Array.isArray(result) || Array.isArray(result1)) {
        finalResult = [...result1, ...result];
      }
      this.applications = [...finalResult].filter((value, index, self) =>
        index === self.findIndex((t) => (t.value === value.value))
      );
      this.applications.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));


      // this.applicationGroups = [];
      const orgId = this.sso.getOrganizationID(this.router.url);
      const appGroups = this.applications ? this.applications.filter(a => a.groupId) : [];// splitted accordingly for application group drop down
      appGroups.forEach(g => {
        const group = this.applicationGroups.find(a => a.name == g.groupName);
        if (!group) {
          this.applicationGroups.push({ id: g.groupId, name: g.groupName })
        } else if (g.orgId == orgId) {
          this.applicationGroups = this.applicationGroups.filter(a => a.name != g.groupName);
          this.applicationGroups.push({ id: g.groupId, name: g.groupName })
        }
      });

      this.applicationGroups.sort((a, b) => (a.name || "").toString().localeCompare((b.name || "").toString(), 'en', { numeric: false }));


      if (this.urlParams['applicationsSelected'] && this.urlParams['isApplicationGroup'] != 'yes') {
        let hasNotApplications = false;
        this.applications.forEach(element => {
          if (element.value == this.urlParams['applicationsSelected']) {
            hasNotApplications = true;
          }
        });
        if (!hasNotApplications) {
          const name = Array.isArray(this.urlParams['applicationsNames']) ? this.urlParams['applicationsNames'][0] : this.urlParams['applicationsNames'];
          const value = Array.isArray(this.urlParams['applicationsSelected']) ? this.urlParams['applicationsSelected'][0] : this.urlParams['applicationsSelected'];
          let obj = {
            app: "All",
            label: name,
            name: name,
            type: "Global",
            value: value,
            _id: value
          }
          this.applications.push(obj);
        }
        this.getApplicationNames();
      }
      if (this.urlParams['applicationsSelected'] && this.urlParams['isApplicationGroup'] == 'yes') {
        let hasNotApplications = false;
        this.applicationGroups.forEach(element => {
          if (element.id == this.urlParams['applicationsSelected']) {
            hasNotApplications = true;
          }
        });
        if (!hasNotApplications) {
          const name = Array.isArray(this.urlParams['applicationsNames']) ? this.urlParams['applicationsNames'][0] : this.urlParams['applicationsNames'];
          const value = Array.isArray(this.urlParams['applicationsSelected']) ? this.urlParams['applicationsSelected'][0] : this.urlParams['applicationsSelected'];
          let obj = {
            name: name,
            id: value
          }
          this.applicationGroups.push(obj);
        }
        this.getApplicationGroupNames();
      }

      this.setTopSubEndpointFilters();
    });
  }
  //commented below lines as due to story CCL-58646 for bringing up new drop down (App Group) and remove "ALL" in both drop downs(app and app group)
  // selectAllApplication(event) {
  //   if (event.target.checked) {
  //     this.applicationsSelected = [...new Set(this.applications.map(x => x.value))];
  //     this.applicationsSelectedNames = ['All'];
  //   } else {
  //     this.applicationsSelected = [];
  //     this.applicationsSelectedNames = [];
  //   }
  // }

  selectAllLocations(event) {
    if (event.target.checked) {
      this.locationsSelected = this.locations.length > 0 ? [...new Set(this.locations.map(x => x.value))] : ['All'];
      this.locationsSelectedNames = ['All'];
    } else {
      this.locationsSelected = [];
      this.locationsSelectedNames = [];
    }
  }

  combineApps() {
    let curOrgApps = this.curOrgApps ? this.curOrgApps : [];
    let globalApps = this.globalApps ? this.globalApps : [];
    let temp;
    let availCurOrgApps: any = [];
    let data = [];

    if (curOrgApps && Array.isArray(curOrgApps)) {
      curOrgApps = curOrgApps.map((obj) => {
        if (!obj) return;
        obj.type = "Local";
        obj.type = "Global";
        obj['label'] = obj.name;
        obj['value'] = obj._id;
        obj['app'] = obj.name;
        this.appObj[obj._id] = obj.name;
        return obj;
      });
    }
    let curs = curOrgApps.length ? curOrgApps.slice(0) : [];
    if (globalApps && globalApps.length) {
      let currentOrgName: any = "";
      if (curOrgApps && Array.isArray(curOrgApps)) {
        currentOrgName = curOrgApps.map((obj) => obj.name);
      }
      globalApps = globalApps.map((obj) => {
        if (obj) {
          const currentOrgIndex = currentOrgName.indexOf(obj.name);
          if (currentOrgIndex == -1) {
            obj.type = "Global";
            obj['label'] = obj.name;
            obj['value'] = obj._id;
            obj['app'] = obj.name;
            this.appObj[obj._id] = obj.name;
          } else {
            obj = curOrgApps[currentOrgIndex];
            curs.splice(currentOrgIndex, 1);
          }
          return obj;
        }

      });
      globalApps = [...globalApps, ...curs];

    } else if (curOrgApps.length) {
      globalApps = curOrgApps
    }

    return globalApps;

  }

  changeClenderlang() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.canlenderConfig.setTranslation({
        monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],


      })
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
      this.canlenderConfig.setTranslation({
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      })
    }
  }

  validateStartEndDates() {
    if (this.pageDetails.showStartDate && this.pageDetails.showEndDate) {
      if (!this.startDate || !this.endDate) {
        this.modalInfo = 'Please enter the valid input dates.'
        return false;
      }
      else if (this.getISODate(this.startDate) > this.getISODate(this.endDate)) {
        this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  validatePeakRate() {
    if (this.pageDetails.showPeakRateFrom && this.pageDetails.showPeakRateTo) {
      if (!this.peakRateFrom || !this.peakRateTo) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  changelimit() {
    if (this.limit < 3) {
      this.limit = 3;
    }
    if (this.limit > 500) {
      this.limit = 500;
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 401) {
      errorInfo = this.language['Access Denied'];
    } else {
      errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.commonOrgService.openErrorAlert(errorInfo);
    this.commonOrgService.pageScrollTop();
    this.loading = false;

  }

  getISODate(startDate: any) {
    let date = new Date(startDate);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let stdate = `${year}-${month}-${day}T00:00:00Z`;
    let d = new Date(stdate)
    return d
  }

  getISOEndOfDay(dt) {
    let d = new Date(dt);
    d.setDate(new Date(d).getDate() + 1);
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  changeTimeRange() {
    setTimeout(() => {
      this.timeRange = (this.startTime - 1).toString() + ' - ' + (this.endTime - 1).toString();
    }, 500)
  }

  changeType() {
    this.hasClickRun = false;
    if (this.service.btnDisabled) {
      this.service.btnDisabled = false;
    }
    this.setHideShowFilter();
  }


  setHideShowFilter() {
    let date = new Date();
    this.startDate = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
    this.endDate = new Date();
    if (this.typeSelected == 'traffic') {
      this.pageDetails = {
        main_route: 'applications',
        sub_route: 'traffic',
        showLocation: true,
        showApplication: true,
        showCriteria: true,
        showStartDate: true,
        showEndDate: true,
        showLimit: false
      };
    } else if (this.typeSelected == 'top_locations') {
      this.pageDetails = {
        main_route: 'applications',
        sub_route: 'top-locations',
        showLocation: false,
        showApplication: true,
        showCriteria: true,
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        showGroup: false,
        showDirection: true,
        showRate: false
      };
    } else if (this.typeSelected == 'top_subscribers') {
      this.pageDetails = {
        main_route: 'applications',
        sub_route: 'top-subscribers',
        showLocation: false,
        showApplication: true,
        showCriteria: true,
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        showGroup: false,
        showDirection: true,
        showRate: false
      };
    }
    this.changeCriteria();
  }


  getApplicationGroup(groupName: any) {
    const requestEndpoints = [
      `${environment.FA_API_BASE_URL}config/application-group/${groupName}?org-id=0`,
      `${environment.FA_API_BASE_URL}config/application-group/${groupName}?org-id=${this.sso.getOrganizationID(this.router.url)}`
    ];
    let obj = [];
    this.forkJoinSubscription = forkJoin([
      this.apiService.callRestApi(requestEndpoints[0]),
      this.apiService.callRestApi(requestEndpoints[1])
    ]).subscribe((res: any) => {
      let data = [...res[0], ...res[1]];
      if (data && data.length) {
        data.forEach(element => {
          obj.push(element.applicationId);
        });
        if (obj.length > 0) {
          this.applicationsSelected = obj;
          this.getApplicationNames();
        }
        this.loadChartData(true);
      }
      else {
        this.getApplicationGroup(groupName);
      }
    }, (err: HttpErrorResponse) => {
    });
  }
  newTrafficWorkFlow() {
    // this.router.navigate(['cco/operations/new-traffic-workflow']);
    // this.router.navigateByUrl('/cco/new-traffic-workflow');
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  viewScheduleReport() {
    this.modalRef = this.dialogService.open(this.scheduleReportModal, { size: 'xl', windowClass: 'custom-lg-modal', backdrop: 'static', keyboard: false });
  }

  clearFilter() {
    this.periodSelected = '-1';
    this.scopeSelected = '1';
    this.treshold = '0';
    this.thresholdTypeSelected = 'AllEndpoints';
    this.eliminateUnknownSelected = 'no';
    this.aggregateSelected = 'false';
    this.endHour = 23;
    this.startHour = 0;
    this.monthSelected = '2020-06-01';
    this.rateSelected = 'Average';
    this.monthCount = 3;
    this.metricSelected = 'Rate';
    this.timeRange = "0 - 24"
    // this.typeSelected = 'traffic';
    this.criteriaSelected = 'usage';
    this.limit = 10;
    this.groupSelected = 'no';
    this.directionSelected = 'Down';
    this.startTime = 0;
    this.endTime = 25;
    this.isRate = false;
    this.isOneDate = false;
    let date = new Date();
    this.startDate = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
    this.maxDate = new Date();
    this.endDate = new Date();
    this.locationsSelected = [];
    this.applicationsSelected = [];
    this.applicationGroupSelected = [];
    this.locationsSelectedNames = [];
    this.applicationsSelectedNames = [];
    this.applicationGroupSelectedNames = [];
    this.runActive = false;
    this.hasClickRun = false;
    this.setHideShowFilter();
  }
  modalOpener(modal) {
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-warning-modal clx-custom-modal',
    });
  }

  get showSensitiveInfo(): boolean {
    return sessionStorage.getItem("showSensitiveInfo") == "true";
  }

  onSelectFilterPreset(item: FilterPresets) {
    let isFilterChange = false;
    if (item.settingJsonTyped.criteria) {
      this.criteriaSelected = item.settingJsonTyped.criteria;
      this.changeCriteria();
    }

    if (item.settingJsonTyped.fromDate || item.settingJsonTyped.toDate) {
      this.startDate = item.settingJsonTyped.fromDate;
      this.endDate = item.settingJsonTyped.toDate;
      this.changeDate();
    }

    if (item.settingJsonTyped.limit) {
      this.limit = item.settingJsonTyped.limit;
      this.changelimit();
    }

    if (item.settingJsonTyped.application?.length > 0) {
      //this.applicationsSelected = item.settingJsonTyped.application;
      this.applicationsSelected = this.applications.filter(ao => item.settingJsonTyped.application?.includes(ao.value))?.map(a => a.value);
      this.changeApplication();
    } else {
      this.applicationsSelected = [];
    }

    if (item.settingJsonTyped.applicationGroup?.length > 0) {
      //this.applicationGroupSelected = item.settingJsonTyped.applicationGroup;
      this.applicationGroupSelected = this.applicationGroups.filter(ag => item.settingJsonTyped.applicationGroup?.includes(ag.id))?.map(a => a.id);

      this.changeApplicationGroup();
    } else {
      this.applicationGroupSelected = [];
    }

    if (item.settingJsonTyped.location?.length > 0) {
      // this.locationsSelected = item.settingJsonTyped.location;
      this.locationsSelected = this.locations.filter(ls => item.settingJsonTyped.location?.includes(ls.value))?.map(l => l.value);

      this.changeLocation();
    } else {
      this.locationsSelected = [];
    }

    if (item.settingJsonTyped.direction) {
      this.directionSelected = item.settingJsonTyped.direction;
      isFilterChange = true;
    }


    if (isFilterChange) {
      this.changeFilter();
    }
  }

}

