import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { IssueService } from '../../service/issue.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-common-realtime-filter',
  templateUrl: './common-realtime-filter.component.html',
  styleUrls: ['./common-realtime-filter.component.scss']
})
export class CommonRealtimeFilterComponent implements OnInit {
  //visible:boolean=false
  @Output() filterData = new EventEmitter();
  filtersForm = this.fb.group({
    region: [''],
    location: [''],
    system: [''],
    limit: [20, [numValidator]],
    systemStatus: 'connected',
    alarmEventName: [''],
    fsan_serialno: '',
    device_type: ''
  });
  regionsSubject: any;
  regionsDataArray: any[] = ["All"];
  locationDataArray: any[] = ["All"];
  systemDataArray: any[] = ["All"];
  locationsSubject: any;
  systemsSubject: any;
  language: any;
  languageSubject: any;
  error: boolean;
  errorInfo: any;
  loading: boolean;
  @Input() geoMapFilters = false;
  @Input() activeTab = 'alarms';
  appliedParams: any;
  geoMapIssue = 'false';
  issuesGeoMapFilters: {};
  homeGeoMapFilters: {};
  geoMapfilterSubscription: Subscription;
  appliedFilters = {
    region: true,
    location: true,
    system: true,
    limit: true,
    fsan_serialno: false,
    device_type: false,
    alarmEventName: false
  }

  url = this.router.url;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private chartOptionService: HistoryChartOptionsService,
    private translateService: TranslateService,
    private issueService: IssueService,
    public ssoService: SsoAuthService,
    private route: ActivatedRoute,
    private commonOrgService: CommonService, private router: Router) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
    this.setFilters();
    // this.getAlarmNames();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.setIntialValue();
    this.regionsApiLoader();
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

          if (this.issuesGeoMapFilters['device_type']?.toUpperCase() == 'ONT' || this.issuesGeoMapFilters['device_type']?.toUpperCase() == 'ALL') {
            this.filtersForm.get('fsan_serialno').setValue(this.issuesGeoMapFilters['fsan_serialno'] ? this.issuesGeoMapFilters['fsan_serialno'] : '');
          }
        }
      }

      if (params['fsan']) {
        this.filtersForm.patchValue({
          fsan_serialno: params['fsan']
        });
        this.generateParams();
      }
    });

    if (history?.state?.filters) {
      const filters = _.pickBy(history.state.filters, function (value, key) {
        return value;
      });

      this.filtersForm.patchValue(filters);
      this.onAlarmGroupChange(this.filtersForm.get('device_type').value);
      this.issueService.setMapViewFilters(history.state.filters);
    } else {
      this.issueService.setMapViewFilters({});
    }
    console.log(history.state);

    if (this.appliedFilters.alarmEventName) {
      if (this.url.includes("geoMapIssue=true")) {
        setTimeout(() => {
          this.getAlarmNames();
        }, 2000)
      } else {
        this.getAlarmNames();
      }
    } else {
      this.generateParams();
    }
  }

  regionsApiLoader() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res && res.length) {
          res = this.issueService.appendFqn(res);
        }
        this.chartOptionService.setRegionsInfo(res);
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];

        if (this.filtersForm.get('region').value) {
          this.loadLocationValue('');
        }

      }, (error) => {
      })
  }


  loadLocationValue(event: any) {
    let ids = this.filtersForm.get('region').value;
    let locationIds = this.filtersForm.get('location').value;
    if (ids) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          this.locationDataArray = ["All"];
          this.systemDataArray = ["All"];
          this.filtersForm.get('location').setValue(['All']);
          this.filtersForm.get('system').setValue(['All']);
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

        this
      } else {
        this.filtersForm.get('region').setValue(['All']);
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        this.locationDataArray = ["All"];
        this.systemDataArray = ["All"];
      }



    }

  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  loadSystemValue(event?: any) {
    let regionids = this.filtersForm.get('region').value;
    let locationids = this.filtersForm.get('location').value;
    let systemIds = this.filtersForm.get('system').value;
    if (regionids.length && locationids.length && locationids.indexOf('All') !== -1) {
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
            }

            this.filtersForm.get('system').setValue(validSystemIds);

          }
          // this.systemDataArray = res;
          // this.systemDataArray.push("All");
        }, (error) => {
        });
    } else {
      if (!locationids.length) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        this.systemDataArray = ["All"];
      }
    }

  }

  clearFilter() {
    this.setIntialValue();
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    this.generateParams();

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
  clickedSystem: any


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

  selectSystem(event: any) {
    //todo
  }

  alarmNames = [];

  getAlarmNames() {
    this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmEvent?historyalarm=false&notificationType=Alarm&alertType=${this.issueService.getAlertType()}`).subscribe((json: any) => {
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

      if (this.appliedFilters.alarmEventName) {
        this.getCustomAlarmsFunc();
      }
    })
  }

  getCustomAlarmsFunc() {
    this.http
      .get(`${environment.API_BASE_URL}analytics-engine/customAlarms/false?alertType=${this.issueService.getAlertType()}`)
      .subscribe((json: any) => {
        if (json && json.length > 0) {
          let defaultExcludeAlarms = this.alarmNames.filter(el => json.findIndex(ele => ele['alarmName'] == el['name']) != -1).map(alarms => alarms['id']);
          if (defaultExcludeAlarms && defaultExcludeAlarms.length > 0) {
            this.filtersForm.get('alarmEventName').setValue(defaultExcludeAlarms);
          }
        } else {
          this.filtersForm.get('alarmEventName').setValue(['All']);
        }
        this.generateParams();
      },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.pageErrorHandle(err);
          this.filtersForm.get('alarmEventName').setValue(['All']);
          this.generateParams();
        });
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

  showFSAN = true;
  onAlarmGroupChange(value) {
    if (value === 'OLT') {
      this.filtersForm.get('fsan_serialno').setValue('');
      this.showFSAN = false;
    } else {
      this.showFSAN = true;
    }

  }

  fsanvalid: boolean = true;
  validateFSAN(event?: any) {
    if (event) {
      if (this.filtersForm.get('fsan_serialno').value.length === 0 || this.filtersForm.get('fsan_serialno').value.length === 12) {
        this.fsanvalid = true;
      }
    } else {
      this.fsanvalid = true;
      if (this.filtersForm.get('fsan_serialno').value.length !== 0 && this.filtersForm.get('fsan_serialno').value.length !== 12) {
        this.fsanvalid = false;
      }
    }

  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode  //key = event.charCode;
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

  changeTab(activeTab) {
    this.issueService.fromMapNavigation(false);
    this.activeTab = activeTab
    this.generateParams();
  }

  generateParams(changeTab?: any) {
    if (this.filtersForm?.controls?.limit.invalid) {
      return;
    }

    this.validateFSAN();
    if (!this.fsanvalid) return;

    let fields = this.filtersForm.value;
    fields = this.removeAllValues(fields);

    let params = {
      region: fields['region'],
      location: fields['location'],
      system: fields['system'],
      alarmCount: this.filtersForm.get('limit').value ? this.filtersForm.get('limit').value : 0,
    }

    if (this.appliedFilters.fsan_serialno) {
      params['fsan_serialno'] = this.filtersForm.get('fsan_serialno').value;
      params['device_type'] = this.filtersForm.get('device_type').value;

      if (this.filtersForm.get('device_type').value === 'OLT') {
        delete params['fsan_serialno'];
      }

    }

    let alarms = [];
    this.filtersForm.get('alarmEventName')?.value?.forEach(element => {
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
    //this.issueService.setCurrentIssuesFilterParams(params, this.geoMapFilters, changeTab);
    this.issueService.setAppliedFilters(params, true);
  }

  setFilters() {
    const alertType = this.issueService.getAlertType()?.toLowerCase();
    if (alertType === 'system') {
      this.appliedFilters.fsan_serialno = true;
      this.appliedFilters.device_type = true;
      this.appliedFilters.alarmEventName = true;
    } else if (alertType === 'transformed') {
      this.appliedFilters.alarmEventName = true;
    } else if (alertType === 'health') {
      this.appliedFilters.device_type = true;
      this.appliedFilters.fsan_serialno = true;
      this.appliedFilters.alarmEventName = true;
    }
  }

  setIntialValue() {
    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      limit: 20,
      systemStatus: 'connected',
      alarmEventName: ['All'],
      fsan_serialno: '',
    });

    if (this.appliedFilters['device_type']) {
      this.filtersForm.get('device_type').setValue('ALL');
    }
  }

  removeAllValues(fields: any) {
    ['system', 'region', 'location'].forEach((element: any) => {
      if (fields[element]?.indexOf('All') !== -1 || fields[element]?.indexOf('None') !== -1) {
        fields[element] = undefined;
      }
    });

    return fields;
  }

  ngOnDestroy() {
    this.issueService.setAppliedFilters({}, true);
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
