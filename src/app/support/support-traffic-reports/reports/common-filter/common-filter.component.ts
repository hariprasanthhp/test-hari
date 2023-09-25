import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { SsoAuthService } from "../../../../shared/services/sso-auth.service";


@Component({
  selector: 'ngx-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss']
})
export class CommonFilterComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;

  locations: any = [];
  locationsSelected: any;
  applications: any = [];
  applicationsSelected: any;
  applicationsSettings: any;
  criteria: any = [];
  criteriaSelected: any;
  startDate = new Date();
  endDate = new Date();
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
  @Input('pageDetails') pageDetails: any = {};
  constructor(
    private customTranslateService: CustomTranslateService,
    private http: HttpClient,
    private sso: SsoAuthService
  ) {
    let date = new Date();
    this.startDate = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.intializeValues();
    });

    this.setMonthData();
  }

  ngOnInit() {
    if (this.pageDetails && this.pageDetails.urlParams) {
      if (this.pageDetails.urlParams['applicationsSelected']) {
        this.applicationsSelected = this.pageDetails.urlParams['applicationsSelected'];
      }

      if (this.pageDetails.urlParams['locationsSelected']) {
        this.locationsSelected = this.pageDetails.urlParams['locationsSelected'];
      }

      if (this.locationsSelected || this.applicationsSelected) {
        //console.log('triggered');
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

    // ////console.log(this.pageDetails);
  }

  intializeValues() {
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
    ////console.log(this.locationsSelected);
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
    ////console.log(this.criteriaSelected);
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

    this.loadData.emit(data);
  }

  parentCall() {
    alert('child Called from parent');
    ////console.log('child Called from parent');
  }

  onItemSelect(item: any) {
    ////console.log(item);
    ////console.log(this.applicationsSelected);
  }
  OnItemDeSelect(item: any) {
    ////console.log(item);
    ////console.log(this.applicationsSelected);
  }
  onSelectAll(items: any) {
    ////console.log(items);
  }
  onDeSelectAll(items: any) {
    ////console.log(items);
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

}
