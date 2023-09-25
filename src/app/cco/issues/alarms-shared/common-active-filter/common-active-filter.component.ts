import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { IssueService } from '../../service/issue.service';

@Component({
  selector: 'app-common-active-filter',
  templateUrl: './common-active-filter.component.html',
  styleUrls: ['./common-active-filter.component.scss']
})
export class CommonActiveFilterComponent implements OnInit {
  FromDate: any;
  ToDate: any;
  maxDate = new Date();
  maxForStartDate = new Date();
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  @Output() filterData = new EventEmitter();
  categories = [];
  acknowledgedAlarms = [
    { id: 'all', name: 'All' },
    { id: 'false', name: 'Hide Acknowledged Alarms' },
    { id: 'true', name: 'Show Acknowledged Alarms' }
  ];
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

  filtersForm = this.fb.group({
    startDate: [''],
    endDate: [''],
    alarmType: [''],
    region: ['All'],
    location: ['All'],
    system: ['All'],
    fsan: [''],
    severity: ['All'],
    category: ['All'],
    eventName: ['All'],
    customCategory: ['All'],
    cco_ack: 'all'
  });
  @Input() last24hours: any;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private chartOptionService: HistoryChartOptionsService,
    private translateService: TranslateService,
    private issueService: IssueService,
    public ssoService: SsoAuthService,
    private commonOrgService: CommonService,
    private dateUtilsService: DateUtilsService) { }

  ngOnInit(): void {
    this.filtersForm.patchValue({
      startDate: [''],
      endDate: [''],
      alarmType: [''],
      region: ['All'],
      location: ['All'],
      system: ['All'],
      fsan: [''],
      severity: ['All'],
      category: ['All'],
      customCategory: 'None',
      eventName: 'All',
      cco_ack: 'all'
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  regionsApiLoader() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res && res.length) {
          res.forEach((element: any) => {
            if (this.findObjectsCountByValue(res, element.name) > 1) {
              let fqn = '';
              if (element.fqn) {
                let tmp = element['fqn'].split(',');
                if (tmp.length) {
                  let deviceName = tmp[0];
                  if (deviceName) {
                    let arr = deviceName.split('=');
                    if (arr.length && arr[1]) {
                      fqn = arr[1];
                    }
                  }
                }
              }
              element['tempName'] = `${element.name} ${fqn ? `(${fqn})` : ''}`;
            } else {
              element['tempName'] = element.name;
            }
          });

          res.forEach((element: any) => {
            element['name'] = element.tempName;
          });
        }
        this.chartOptionService.setRegionsInfo(res);
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];

        //geomap functionalities
        //set params that are set in geomap after navigated from alarm pushpins
        if (this.issueService.isMap()) {
          let geoFilters = this.issueService?.getIssuesGeoMapFilters();

          if (geoFilters) {
            let regionArray = ['All'];
            let locationArray = ['All'];
            let systemArray = ['All'];
            if (geoFilters && geoFilters['region']) {
              regionArray = geoFilters['region'] || ['All'];
            }
            if (geoFilters && geoFilters['location']) {
              locationArray = geoFilters['location'];
            }

            if (geoFilters && geoFilters['system']) {
              systemArray = geoFilters['system'];
            }
            this.filtersForm.get('region').setValue(regionArray);

            setTimeout(() => {
              this.filtersForm.get('location').setValue(locationArray);
              this.loadLocationValue('');
              setTimeout(() => {
                this.filtersForm.get('system').setValue(systemArray);
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

    let ids = this.filtersForm.get('region').value;
    let locationIds = this.filtersForm.get('location').value;
    if (ids) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
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
            res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
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

  loadSystemValue(event?: any) {
    let regionids = this.filtersForm.get('region').value;
    let locationids = this.filtersForm.get('location').value;
    let systemIds = this.filtersForm.get('system').value;
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

      //start of CCL-34242
      //this.locationName = locationids;
      //end of CCL-34242
    } else {
      if (!locationids.length) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        this.systemDataArray = ["All"];
      }
    }

  }

  findObjectsCountByValue(jsObjects, value: any) {
    let count: any = 0;

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['name'].toLowerCase() == value.toLowerCase()) {
          count++;
        }
      }
    }


    return count;
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
    this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmEvent?historyalarm=false&notificationType=Alarm`).subscribe((json: any) => {
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


    })
  }

  getCustomAlarmsFunc() {

    this.http
      .get(`${environment.API_BASE_URL}analytics-engine/customAlarms/false`)
      .subscribe((json: any) => {
        if (json && json.length > 0) {
          let defaultExcludeAlarms = this.alarmNames.filter(el => json.findIndex(ele => ele['alarmName'] == el['name']) != -1).map(alarms => alarms['id']);
          if (defaultExcludeAlarms && defaultExcludeAlarms.length > 0) {
            this.filtersForm.get('alarmEventName').setValue(defaultExcludeAlarms);
          }
        }
      }, (err: HttpErrorResponse) => {
        this.error = true;
        this.pageErrorHandle(err);
      });
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
  }

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

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  clearFilter() {
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];

    this.filtersForm.patchValue({
      startDate: undefined,
      endDate: undefined,
      region: ['All'],
      location: ['All'],
      system: ['All'],
      severity: 'All',
      category: ['All'],
      fsan: '',
      eventName: 'All',
      customCategory: 'None',
      cco_ack: 'all'
    });


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
      this.filtersForm.get('eventName').setValue('');
    }
  }

  getCategories() {

    let fields = this.filtersForm.value;

    let params = {
      //date: `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`,
      historyReport: false,
    }

    if (fields['startDate']) {
      if (!fields['endDate']) {
        fields['endDate'] = new Date();
      }
      params['date'] = `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`;
    }


    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "") {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    query += '&historyReport=false';

    this.http.get(`${this.baseUrl}category?${query}`).subscribe((json: any) => {
      //console.log(json);

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
      //console.log(json);

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

  changeSeverity() {
    //this.clickedSeverity = '';
  }

  validateCategory(event: any) {
    let categories = this.filtersForm.get('category').value;
    //console.log(event);

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

  selectSystem(event: any) {

  }

  changeDate() {
    this.maxForStartDate = this.filtersForm.get('endDate').value;
  }

  changeStartDate() {
    this.FromDate = this.filtersForm.get('startDate').value;
  }

  generateParams() {

  }

}
