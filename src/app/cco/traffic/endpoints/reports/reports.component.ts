import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { PrimeNGConfig } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../shared/chart-options.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsageComponent } from './usage/usage.component';
import { TopApplicationTrafficComponent } from './top-application-traffic/top-application-traffic.component';
import { RateComponent } from './rate/rate.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import * as moment from 'moment';
import { ApplicationGroupsComponent } from './application-groups/application-groups.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('UsageComponent', { static: false }) private UsageComponent: UsageComponent;
  @ViewChild('TopApplicationTrafficComponent', { static: false }) private TopApplicationTrafficComponent: TopApplicationTrafficComponent;
  @ViewChild('RateComponent', { static: false }) private RateComponent: RateComponent;
  @ViewChild('MonthlyUsageComponent', { static: false }) private MonthlyUsageComponent: MonthlyUsageComponent;
  @ViewChild('ApplicationsComponent', { static: false }) private ApplicationsComponent: ApplicationsComponent;
  @ViewChild('ApplicationGroupsComponent', { static: false }) private ApplicationGroupsComponent: ApplicationGroupsComponent;

  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;

  language: any;
  criteria: any = [];
  criteriaSelected: any;
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  minDate = new Date();
  limit: any;
  groups: any = [];
  groupSelected: any;
  directions: any = [];
  directionSelected: any;
  Initialloading: boolean = false;
  monthSelected: any = '2020-06-01';
  rateSelected: any = 'Average';
  monthCount: any = 3;
  pageDetails: any;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  loading: boolean;
  isRate: boolean = false;
  types: any = [];
  typeSelected: string = 'usage';
  languageSubject: any;
  endpointID: any
  metricSelected = 'Rate';
  month: any = [];
  monthArray: any = [];
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

  startTime: number = 0;
  endTime: number = 25;
  isOneDate: boolean = false;
  timeRange: string = "0 - 24"
  hasClickRun: boolean = false;
  slideOptions: Options = {
    floor: 1,
    ceil: 25,
    translate: (value: number, label: LabelType): string => {
      return `<b>${(value <= 73 && value >= 1) ? (value - 1) : 24}</b>`;
    }
  };

  constructor(
    private customTranslateService: CustomTranslateService,
    private canlenderConfig: PrimeNGConfig,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    public service: ChartOptionsService,
    private websocketservice: WebsocketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private sso: SsoAuthService
  ) {
    this.endpointID = sessionStorage.getItem('aggregate_Endpoint_Id') ? JSON.parse(sessionStorage.getItem('aggregate_Endpoint_Id')) : this.activatedRoute.snapshot.queryParamMap.get('id');
    this.websocketservice.previousURL = this.router.url;
    let date = new Date();
    this.startDate = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
    this.minDate = new Date(date.getTime() - (270 * 24 * 60 * 60 * 1000));
    this.language = this.customTranslateService.defualtLanguage;
    this.setHideShowFilter();
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.monthArray = [
        { value: 1, name: this.language.PastMonths['Past 1 month'] },
        { value: 2, name: this.language.PastMonths['Past 2 months'] },
        { value: 3, name: this.language.PastMonths['Past 3 months'] },
        { value: 4, name: this.language.PastMonths['Past 4 months'] },
        { value: 5, name: this.language.PastMonths['Past 5 months'] },
        { value: 6, name: this.language.PastMonths['Past 6 months'] },
        { value: 7, name: this.language.PastMonths['Past 7 months'] },
        { value: 8, name: this.language.PastMonths['Past 8 months'] },
        { value: 9, name: this.language.PastMonths['Past 9 months'] },
        { value: 10, name: this.language.PastMonths['Past 10 months'] },
        { value: 11, name: this.language.PastMonths['Past 11 months'] },
        { value: 12, name: this.language.PastMonths['Past 12 months'] }
      ]
      this.changeClenderlang();
      this.intializeValues();
      this.setTitle(this.router.url)
    });
    this.setMonthData();
    this.service.btnDisabled = false;
  }
  setTitle(url) {
    if (url.includes('/cco/traffic/endpoints/reports')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Endpoints']} - ${this.language['Traffic']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}  `);
    }
  }
  ngOnInit(): void {
    this.setTitle(this.router.url)
    this.sso.setPageAccess(true);
    this.criteriaSelected = 'usage';

    this.intializeValues();
    this.limit = 10;
    this.groupSelected = 'no';
    this.directionSelected = 'Down';
    this.monthArray = [
      { value: 1, name: this.language.PastMonths['Past 1 month'] },
      { value: 2, name: this.language.PastMonths['Past 2 months'] },
      { value: 3, name: this.language.PastMonths['Past 3 months'] },
      { value: 4, name: this.language.PastMonths['Past 4 months'] },
      { value: 5, name: this.language.PastMonths['Past 5 months'] },
      { value: 6, name: this.language.PastMonths['Past 6 months'] },
      { value: 7, name: this.language.PastMonths['Past 7 months'] },
      { value: 8, name: this.language.PastMonths['Past 8 months'] },
      { value: 9, name: this.language.PastMonths['Past 9 months'] },
      { value: 10, name: this.language.PastMonths['Past 10 months'] },
      { value: 11, name: this.language.PastMonths['Past 11 months'] },
      { value: 12, name: this.language.PastMonths['Past 12 months'] }
    ]
  }

  ngOnDestroy() {

  }

  intializeValues() {
    this.types = [
      {
        name: "Usage",
        value: 'usage'
      },
      {
        name: "Rate",
        value: 'rate'
      },
      {
        name: this.language['Monthly_Usage'],
        value: 'monthly_usage'
      },
      {
        name: "Applications",
        value: 'applications'
      },
      {
        name: "Application Groups",
        value: 'application_groups'
      },
      {
        name: "Top Application Traffic",
        value: 'top_application_traffic'
      },
      // {
      //   name: "Top Endpoints",
      //   value: 'top_endpoints'
      // }
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
        name: this.language['usage'],
        value: 'usage'
      },
      {
        name: this.language['rate'],
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

  changeTimeRange() {
    setTimeout(() => {
      this.timeRange = (this.startTime - 1).toString() + ' - ' + (this.endTime - 1).toString();
    }, 500)
  }


  changeFilter() {
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

  loadChartData() {
    if (!this.typeSelected) {
      this.modalTitle = this.language['Invalid input'];
      this.modalInfo = this.language.Select_Type_Reports;
      this.openModalInfo();
      return;
    };
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
    if (this.limit > 500) {
      this.limit = 500
    }
    let data = {};
    data['criteriaSelected'] = this.criteriaSelected;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['limit'] = (this.limit == 0 || this.limit) ? this.limit : 10;
    //data['groupSelected'] = this.groupSelected;
    data['directionSelected'] = this.directionSelected;
    data['rateSelected'] = this.rateSelected;
    data['monthCount'] = this.monthCount;
    data['metric'] = this.metricSelected;
    data['monthSelected'] = this.monthSelected;
    data['endpointID'] = this.endpointID;
    data["startTime"] = this.startTime;
    data["endTime"] = this.endTime;
    this.service.btnDisabled = true;
    this.hasClickRun = true;
    if (this.typeSelected == 'usage') {
      this.UsageComponent?.loadChartData(data);
    } else if (this.typeSelected == 'rate') {
      this.RateComponent?.loadChartData(data);
    } else if (this.typeSelected == 'monthly_usage') {
      this.MonthlyUsageComponent?.loadChartData(data);
    } else if (this.typeSelected == 'applications') {
      this.ApplicationsComponent?.loadChartData(data);
    } else if (this.typeSelected == 'application_groups') {
      this.ApplicationGroupsComponent?.loadChartData(data);
    } else if (this.typeSelected == 'top_application_traffic') {
      this.TopApplicationTrafficComponent?.loadChartData(data);
    }

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
    if (this.typeSelected == 'usage') {
      this.pageDetails = {
        main_route: 'endpoints',
        sub_route: 'traffic',
        showStartDate: true,
        showEndDate: true,
        showLimit: false,
        showDirection: false
      };
    } else if (this.typeSelected == 'rate') {
      this.pageDetails = {
        main_route: 'endpoints',
        sub_route: 'rate',
        showStartDate: true,
        showEndDate: true,
        showDirection: false,
        showRate: true
      };
    } else if (this.typeSelected == 'monthly_usage') {
      this.pageDetails = {
        mmain_route: 'endpoints',
        sub_route: 'monthly_usage',
        showDirection: false,
        showMonthCount: true
      };
    } else if (this.typeSelected == 'applications' || this.typeSelected == 'application_groups') {
      this.pageDetails = {
        main_route: 'endpoints',
        sub_route: this.typeSelected == 'applications' ? 'applications' : 'application_groups',
        showCriteria: true,
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        //showGroup: true,
        showDirection: true
      };
    } else if (this.typeSelected == 'top_application_traffic') {
      this.pageDetails = {
        main_route: 'endpoints',
        sub_route: 'top_application_traffic',
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        showDirection: false,
        showRate: true
      };
    }
    this.changeCriteria();
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event?.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  clearFilter() {
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
    this.setHideShowFilter();
    if (this.hasClickRun) {
      this.loadChartData();
    }
  }


}
