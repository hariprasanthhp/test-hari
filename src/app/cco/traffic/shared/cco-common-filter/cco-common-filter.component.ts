import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, TemplateRef, SimpleChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApplicationReportApiService } from '../../applications/reports/application-report-api.service';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-cco-common-filter',
  templateUrl: './cco-common-filter.component.html',
  styleUrls: ['./cco-common-filter.component.scss']
})
export class CcoCommonFilterComponent implements OnInit, OnDestroy {

  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;
  locations: any = [];
  locationsSelected: any;
  locationsSelectedNames: any;
  applications: any = [];
  applicationsSelected: any;
  applicationsSelectedNames: any;
  applicationsSettings: any;
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
  runActive: boolean;

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
  @Input('btnDisabled') btnDisabled: boolean = false;
  @Input('showTimeRange') showTimeRange: boolean = false;

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

  slideOptions: Options = {
    floor: 1,
    ceil: 25,
    translate: (value: number, label: LabelType): string => {
      switch (value) {
        case 1:
          return "<b>0</b> ";
          break;
        case 2:
          return "<b>1</b> ";
          break;
        case 3:
          return "<b>2</b> ";
          break;
        case 4:
          return "<b>3</b> ";
          break;
        case 5:
          return "<b>4</b> ";
          break;
        case 6:
          return "<b>5</b> ";
          break;
        case 7:
          return "<b>6</b> ";
          break;
        case 8:
          return "<b>7</b> ";
          break;
        case 9:
          return "<b>8</b> ";
          break;
        case 10:
          return "<b>9</b> ";
          break;
        case 11:
          return "<b>10</b> ";
          break;
        case 12:
          return "<b>11</b> ";
          break;
        case 13:
          return "<b>12</b> ";
          break;
        case 14:
          return "<b>13</b> ";
          break;
        case 15:
          return "<b>14</b> ";
          break;
        case 16:
          return "<b>15</b> ";
          break;
        case 17:
          return "<b>16</b> ";
          break;
        case 18:
          return "<b>17</b> ";
          break;
        case 19:
          return "<b>18</b> ";
          break;
        case 20:
          return "<b>19</b> ";
          break;
        case 21:
          return "<b>20</b> ";
          break;
        case 22:
          return "<b>21</b> ";
          break;
        case 23:
          return "<b>22</b> ";
          break;
        case 24:
          return "<b>23</b> ";
          break;
        case 25:
          return "<b>24</b> ";
          break;
        case 26:
          return "<b>25</b> ";
          break;
        case 27:
          return "<b>26</b> ";
          break;
        case 28:
          return "<b>27</b> ";
          break;
        case 29:
          return "<b>28</b> ";
          break;
        case 30:
          return "<b>29</b> ";
          break;
        case 31:
          return "<b>30</b> ";
          break;
        case 32:
          return "<b>31</b> ";
          break;
        case 33:
          return "<b>32</b> ";
          break;
        case 34:
          return "<b>33</b> ";
          break;
        case 35:
          return "<b>34</b> ";
          break;
        case 36:
          return "<b>35</b> ";
          break;
        case 37:
          return "<b>36</b> ";
          break;
        case 38:
          return "<b>37</b> ";
          break;
        case 39:
          return "<b>38</b> ";
          break;
        case 40:
          return "<b>39</b> ";
          break;
        case 41:
          return "<b>40</b> ";
          break;
        case 42:
          return "<b>41</b> ";
          break;
        case 43:
          return "<b>42</b> ";
          break;
        case 44:
          return "<b>43</b> ";
          break;
        case 45:
          return "<b>44</b> ";
          break;
        case 46:
          return "<b>45</b> ";
          break;
        case 47:
          return "<b>46</b> ";
          break;
        case 48:
          return "<b>47</b> ";
          break;
        case 49:
          return "<b>48</b> ";
          break;
        case 50:
          return "<b>49</b> ";
          break;
        case 51:
          return "<b>50</b> ";
          break;
        case 52:
          return "<b>51</b> ";
          break;
        case 53:
          return "<b>52</b> ";
          break;
        case 54:
          return "<b>53</b> ";
          break;
        case 55:
          return "<b>54</b> ";
          break;
        case 56:
          return "<b>55</b> ";
          break;
        case 57:
          return "<b>56</b> ";
          break;
        case 58:
          return "<b>57</b> ";
          break;
        case 59:
          return "<b>58</b> ";
          break;
        case 60:
          return "<b>59</b> ";
          break;
        case 61:
          return "<b>60</b> ";
          break;
        case 62:
          return "<b>61</b> ";
          break;
        case 63:
          return "<b>62</b> ";
          break;
        case 64:
          return "<b>63</b> ";
          break;
        case 65:
          return "<b>64</b> ";
          break;
        case 66:
          return "<b>65</b> ";
          break;
        case 67:
          return "<b>66</b> ";
          break;
        case 68:
          return "<b>67</b> ";
          break;
        case 69:
          return "<b>68</b> ";
          break;
        case 70:
          return "<b>69</b> ";
          break;
        case 71:
          return "<b>70</b> ";
          break;
        case 72:
          return "<b>71</b> ";
          break;
        case 73:
          return "<b>72</b> ";
          break;
        default:
          return "<b>24</b>";
      }
    }
  };

  constructor(
    private customTranslateService: CustomTranslateService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private canlenderConfig: PrimeNGConfig,
    private dialogService: NgbModal,
    private apiService: ApplicationReportApiService,
    private commonOrgService: CommonService,
  ) {
    let date = new Date();
    this.startDate = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
    this.minDate = new Date(date.getTime() - (270 * 24 * 60 * 60 * 1000));
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.changeClenderlang();
      this.intializeValues();
    });
    this.setMonthData();

  }

  ngOnInit() {

    if (this.pageDetails && this.pageDetails.showLocation) this.getLocations();
    if (this.pageDetails && this.pageDetails.showApplication) this.getApps();
    this.criteriaSelected = 'usage';
    if (this.pageDetails && this.pageDetails.urlParams) {
      if (this.pageDetails.urlParams['applicationsSelected']) {
        this.applicationsSelected = this.pageDetails.urlParams['applicationsSelected'];
      }

      if (this.pageDetails.urlParams['locationsSelected']) {
        this.locationsSelected = this.pageDetails.urlParams['locationsSelected'];
      }

      if (this.pageDetails.urlParams['startDate']) {
        this.startDate = new Date(this.pageDetails.urlParams['startDate']);
      }
      if (this.pageDetails.urlParams['endDate']) {
        this.endDate = new Date(this.pageDetails.urlParams['endDate']);
      }
      if (this.pageDetails.urlParams["criteria"]) {
        this.criteriaSelected = this.pageDetails.urlParams["criteria"];
      }

      if (this.locationsSelected || this.applicationsSelected) {
        this.loadChartData();
        this.runActive = true;
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

    this.limit = 10;
    this.groupSelected = 'no';
    this.directionSelected = 'Down';

    if (this.pageDetails && this.pageDetails.main_route == 'network') {
      this.runActive = true;
    }

  }

  ngOnDestroy(): void {
    if (this.appSubs) this.appSubs.unsubscribe();
    if (this.locSubs) this.locSubs.unsubscribe();
    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.btnDisabled && changes.btnDisabled.currentValue) {
      this.btnDisabled = changes.btnDisabled.currentValue;
    }
    if (changes.showTimeRange && changes.showTimeRange.currentValue) {
      this.showTimeRange = changes.showTimeRange.currentValue;
      this.changeFilter();
    }
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

    if (this.pageDetails && this.pageDetails.main_route == 'network' && this.pageDetails.sub_route == 'power-users') {
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
    }
  }

  changeFilter() {
    this.btnDisabled = false;
    let diff = moment(this.getISOEndOfDay(this.endDate)).diff(moment(this.getISODate(this.startDate)), "hour");
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

    if (this.pageDetails.main_route != 'applications') {
      if (this.locationsSelected.length != 0 && this.pageDetails.main_route == 'locations') {
        this.runActive = true;
      } else {
        this.runActive = false;
      }
    }


    this.locationsSelectedNames = [];
    if (this.locationsSelected && this.locationsSelected.length) {
      this.locationsSelected.forEach(e => {
        let match = this.locations.filter((el) => el.value == e);
        if (match.length) {
          this.locationsSelectedNames.push(match[0].name);
        }
      });
    }
    this.btnDisabled = false;

    if (this.locationsSelected && !this.locationsSelected.includes("All") && this.pageDetails.main_route === 'applications') {
      this.showTimeRange = false;
    } else {
      this.showTimeRange = true;
    }
  }

  changeApplication() {
    if (this.applicationsSelected.length > 1 && this.applicationsSelected.includes("All")) {
      if (this.applicationsSelected.indexOf("All") === 0) {
        let arr = Object.assign([], this.applicationsSelected);
        let index = arr.indexOf("All");
        arr.splice(index, 1);
        this.applicationsSelected = arr;
      } else if (this.applicationsSelected.indexOf("All") > 0) {
        this.applicationsSelected = ["All"];
      }
    }
    if (this.pageDetails.main_route != 'locations') {
      if (this.applicationsSelected.length != 0 && this.pageDetails.main_route == 'applications') {
        this.runActive = true;
      } else {
        this.runActive = false;
      }
    }

    this.applicationsSelectedNames = [];
    if (this.applicationsSelected && this.applicationsSelected.length) {
      this.applicationsSelected.forEach(e => {
        let match = this.applications.filter(el => el.value === e);
        if (match.length) {
          this.applicationsSelectedNames.push(match[0].label);
        }
      });
    }
    this.btnDisabled = false;
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
    this.btnDisabled = false;
  }

  loadChartData() {

    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
    if (!this.validatePeakRate()) {
      this.modalTitle = this.language['Invalid input'];
      this.modalInfo = this.language['You must apply input values before the report can be displayed.']
      this.openModalInfo();
      return;
    };
    // if (this.pageDetails.sub_route == 'traffic' || this.pageDetails.sub_route == 'top-applications' || this.pageDetails.sub_route == 'active-subcribers') {
    //   var date1 = moment(this.startDate);
    //   var date2 = moment(this.endDate);
    //   var diff = date2.diff(date1, 'day');
    //   if (diff > 30) {
    //     this.modalTitle = this.language.Time_Period;
    //     this.modalInfo = "Time range not valid, start time and end time difference should be 30 only.."
    //     this.openModalInfo();
    //     return;
    //   }
    // }
    // if (this.pageDetails.sub_route == 'top-applications-traffic' || this.pageDetails.sub_route == 'top-subscribers' || this.pageDetails.sub_route == 'top-locations') {
    //   var date1 = moment(this.startDate);
    //   var date2 = moment(this.endDate);
    //   var diff = date2.diff(date1, 'day');
    //   if (diff > 10) {
    //     this.modalTitle = this.language.Time_Period;
    //     this.modalInfo = "Time range not valid, start time and end time difference should be 10 only.."
    //     this.openModalInfo();
    //     return;
    //   }
    // }
    // if (!this.validateStartEndHours()) {
    //   this.modalTitle = this.language['Invalid input'];
    //   this.modalInfo = this.language['You must apply input values before the report can be displayed.']
    //   this.openModalInfo();
    //   return;
    // };
    let data = {};
    data['locationsSelected'] = this.locationsSelected;
    data['locationsSelectedNames'] = this.locationsSelectedNames;
    data['applicationsSelected'] = this.applicationsSelected;
    data['applicationsSelectedNames'] = this.applicationsSelectedNames;
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
    data["showTimeRange"] = this.showTimeRange;
    this.btnDisabled = true;

    this.loadData.emit(data);
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
      value: this.formatDateFull(new Date(now.getFullYear(), now.getMonth(), 1)),
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
    let url = `${environment.FA_API_BASE_URL}config/location?org-id=${this.sso.getOrgId()}`;
    this.locSubs = this.http.get(url).subscribe((json: any) => {

      let data = [];

      data.push({
        name: "All",
        value: "All"
      });

      json.forEach(element => {
        data.push({
          name: element.name,
          value: element._id
        });

        this.locObj[element._id] = element.name;
      });

      this.locations = data;

    }, (err: HttpErrorResponse) => {
      this.locations = [];
    });
  }

  appObj = {};
  getAppsOld(): any {
    //let url = `${environment.FA_API_BASE_URL}config/application?org-id=${this.sso.getOrgId()}`;
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
      `${environment.faAdminURL}application?org-id=${this.sso.getOrgId()}`,
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

      if (response.length) {
        for (let e of response) {
          if (e != null && e.error != undefined) {
            this.pageErrorHandle(e);
            setTimeout(() => {
              //this.renderTable();
            }, 1500);
            return;
          }
        }
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
      this.applications = [obj, ...this.combineApps()];


    });
  }

  combineApps() {
    let curOrgApps = this.curOrgApps ? this.curOrgApps : [];
    let globalApps = this.globalApps ? this.globalApps : [];
    let temp;
    let availCurOrgApps: any = [];
    let data = [];

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
    let curs = curOrgApps.length ? curOrgApps.slice(0) : [];
    if (globalApps && globalApps.length) {
      const currentOrgName = curOrgApps.map((obj) => obj.name);
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
      if (this.getISODate(this.startDate) > this.getISODate(this.endDate)) {
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

  validateStartEndHours() {
    if (this.pageDetails.showStartHour && this.pageDetails.showEndHour) {
      if (!this.endHour) {
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
    this.btnDisabled = false;

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
  }

}
