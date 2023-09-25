import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ApplicationsComponent } from './applications/applications.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { RateComponent } from './rate/rate.component';
import { TopAppTrafficComponent } from './top-app-traffic/top-app-traffic.component';
import { UsageComponent } from './usage/usage.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-common-reports',
  templateUrl: './common-reports.component.html',
  styleUrls: ['./common-reports.component.scss']
})
export class CommonReportsComponent implements OnInit {

  @ViewChild('UsageComponent', { static: false }) private UsageComponent: UsageComponent;
  @ViewChild('RateComponent', { static: false }) private RateComponent: RateComponent;
  @ViewChild('MonthlyUsageComponent', { static: false }) private MonthlyUsageComponent: MonthlyUsageComponent;
  @ViewChild('TopAppTrafficComponent', { static: false }) private TopAppTrafficComponent: TopAppTrafficComponent;
  @ViewChild('ApplicationsComponent', { static: false }) private ApplicationsComponent: ApplicationsComponent;

  language: any;
  pageAvailable: boolean = false;
  isError: boolean = false;
  isError1: boolean = false;
  locations: any = [];
  locationsSelected: any;
  applications: any = [];
  applicationsSelected: any;
  applicationsSettings: any;
  criteria: any = [];
  criteriaSelected: any;
  startDate: any = new Date();
  endDate: any = new Date();
  limit: any;
  groups: any = [];
  groupSelected: any;
  directions: any = [];
  directionSelected: any;
  runActive: boolean;

  peakRateFrom: any = '4 Mbps';
  peakRateTo: any = '5 Mbps';

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

  @Output() loadData = new EventEmitter<object>();
  @Input('pageDetails') pageDetails: any;

  types: any = [];
  typeSelected: string = 'usage';
  constructor(
    private customTranslateService: CustomTranslateService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Reports - Data - Service - Service - Calix Cloud');
    let date = new Date();
    this.startDate = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.setHideShowFilter();
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.intializeValues();
      this.loadChartData();
    });

    this.setMonthData();
  }
  ngOnInit() {
    if (this.pageDetails.urlParams) {
      if (this.pageDetails.urlParams['applicationsSelected']) {
        this.applicationsSelected = this.pageDetails.urlParams['applicationsSelected'];
      }

      if (this.pageDetails.urlParams['locationsSelected']) {
        this.locationsSelected = this.pageDetails.urlParams['locationsSelected'];
      }

      if (this.locationsSelected || this.applicationsSelected) {
        this.loadChartData();
      }


    }

    this.applicationsSettings = {
      singleSelection: false,
      text: "None Selected",
      selectAllText: 'Select All',
      unSelectAllText: 'Select All',
      enableSearchFilter: true,
      groupBy: 'app',
      //labelKey: 'label',
      //primaryKey: 'value',
      badgeShowLimit: 1
    };

    this.intializeValues();

    this.groups = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
    this.directions = [
      { label: 'Down', value: 'Down' },
      { label: 'Up', value: 'Up' },
      { label: 'Both(Down+Up)', value: 'both' }
    ];
    this.criteriaSelected = 'usage';
    this.limit = 10;
    this.groupSelected = 'no';
    this.directionSelected = 'Down';

    if (this.pageDetails.main_route == 'network') {
      this.runActive = true;
    }
    $('.time').hide();
  }

  intializeValues() {
    this.types = [
      {
        name: this.language.Usage,
        value: 'usage'
      },
      {
        name: this.language.rate,
        value: 'rate'
      },
      {
        name: this.language.Monthly_Usage,
        value: 'monthly_usage'
      },
      {
        name: this.language.Applications,
        value: 'applications'
      },
      {
        name: this.language.Top_Appln_Traffic,
        value: 'top_app_traffic'
      },
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
  }

  changeLocation() {
    if (this.pageDetails.main_route != 'applications') {
      if (this.locationsSelected.length != 0 && this.pageDetails.main_route == 'locations') {
        this.runActive = true;
      } else {
        this.runActive = false;
      }
    }

  }

  changeApplication() {
    if (this.pageDetails.main_route != 'locations') {
      if (this.applicationsSelected.length != 0 && this.pageDetails.main_route == 'applications') {
        this.runActive = true;
      } else {
        this.runActive = false;
      }
    }

  }

  changeCriteria() {
  }

  loadChartData() {
    let data = {};
    data['locationsSelected'] = this.locationsSelected;
    data['applicationsSelected'] = this.applicationsSelected;
    data['criteriaSelected'] = this.criteriaSelected;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['limit'] = this.limit;
    data['groupSelected'] = this.groupSelected;
    data['directionSelected'] = this.directionSelected;
    data['rateSelected'] = this.rateSelected;
    data['monthCount'] = this.monthCount;
    data['threshold'] = this.treshold;
    data['metric'] = this.metricSelected;
    data['monthSelected'] = this.monthSelected;
    data['eliminateUnknownSelected'] = this.eliminateUnknownSelected;
    data['scopeSelected'] = this.scopeSelected;

    if (this.typeSelected == 'usage') {
      this.UsageComponent?.loadChartData(data);
    } else if (this.typeSelected == 'rate') {
      this.RateComponent?.loadChartData(data);
    } else if (this.typeSelected == 'monthly_usage') {
      this.MonthlyUsageComponent?.loadChartData(data);
    } else if (this.typeSelected == 'applications') {
      this.ApplicationsComponent?.loadChartData(data);
    } else if (this.typeSelected == 'top_app_traffic') {
      this.TopAppTrafficComponent?.loadChartData(data);
    }

  }

  parentCall() {
    alert('child Called from parent');
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
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

  changeType() {
    this.setHideShowFilter();
  }

  setHideShowFilter() {


    if (this.typeSelected == 'usage') {
      this.pageDetails = {
        main_route: 'network',
        sub_route: 'traffic',
        showLocation: false,
        showApplication: false,
        showCriteria: false,
        showStartDate: true,
        showEndDate: true,
        showLimit: false,
        showGroup: false,
        showDirection: false
      };
    } else if (this.typeSelected == 'rate') {
      this.pageDetails = {
        main_route: 'network',
        sub_route: 'traffic',
        showLocation: false,
        showApplication: false,
        showCriteria: false,
        showStartDate: true,
        showEndDate: true,
        showLimit: false,
        showGroup: false,
        showDirection: false,
        showRate: true
      };
    } else if (this.typeSelected == 'monthly_usage') {
      this.pageDetails = {
        main_route: 'network',
        sub_route: 'traffic',
        showLocation: false,
        showApplication: false,
        showCriteria: false,
        showStartDate: false,
        showEndDate: false,
        showLimit: false,
        showGroup: false,
        showDirection: false,
        showMonthCount: true

      };
    } else if (this.typeSelected == 'applications') {
      this.pageDetails = {
        main_route: 'network',
        sub_route: 'top-applications',
        showLocation: false,
        showApplication: false,
        showCriteria: true,
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        showGroup: true,
        showDirection: true

      };
    } else if (this.typeSelected == 'top_app_traffic') {
      this.pageDetails = {
        main_route: 'network',
        sub_route: 'top-applications',
        showLocation: false,
        showApplication: false,
        showCriteria: false,
        showStartDate: true,
        showEndDate: true,
        showLimit: true,
        showGroup: false,
        showDirection: false,
        showRate: true

      };
    }
  }
  compareDate() {
    if (this.startDate > 0 && this.endDate > 0) {
      if (Date.parse(this.endDate) < Date.parse(this.startDate)) {
        this.isError = true;
        this.isError1 = true;

      } else {
        this.isError = false;
        this.isError1 = false;
      }
    }
  }
  public closeAlert() {
    this.isError = false;
  }


}
