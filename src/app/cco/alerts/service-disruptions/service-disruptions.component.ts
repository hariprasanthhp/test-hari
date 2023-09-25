import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from '../../issues/service/issue.service';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HistoryChartOptionsService } from '../../issues/historyreport/service/history-chart-options.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-service-disruptions',
  templateUrl: './service-disruptions.component.html',
  styleUrls: ['./service-disruptions.component.scss']
})
export class ServiceDisruptionsComponent implements OnInit {
  disableExprtBtn = false;
  errors = {};
  language: any;
  languageSubject: any;
  paginateLoading = false;
  appliedParams: any = {};
  filtersForm = this.fb.group({
    region: [''],
    location: [''],
    system: [''],
    fsan: [''],
  });

  appliedFilters = {
    region: true,
    location: true,
    system: true,
    fsan: true,
  }
  previousFlag: boolean;
  nextFlag: boolean;
  loading: boolean = true;
  list: any;
  searchQuery: any;

  regionsSubject: any;
  regionsDataArray: any = ['All'];
  locationDataArray: any = ['All'];
  locationsSubject: any;
  systemsSubject: any;
  systemDataArray: any = ['All'];
  fsanvalid: boolean = true;
  count: any = 0;
  hasScopeAccess: any;

  constructor(private http: HttpClient,
    private translateService: TranslateService,
    private issueService: IssueService,
    private titleService: Title,
    private fb: FormBuilder,
    private chartOptionService: HistoryChartOptionsService,
    private commonOrgService: CommonService,
    private router: Router,
    private sso: SsoAuthService) { }

  urls = this.router.url;
  ngOnInit(): void {
    const scopes = this.sso.getScopes();
    if (scopes?.[`cloud.rbac.coc.issues.servicedisruptions`]) {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`Service Disruptions - Alerts - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });

    if (this.urls.includes('alerts/disruption/list')) {
      this.titleService.setTitle('Service Disruptions - Alerts - Operations - Calix Cloud');
    }


    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      fsan: ''
    });

    console.log(history?.state?.filters);
    if (history?.state?.filters) {
      const filters = _.pickBy(history.state.filters, function (value, key) {
        return value;
      });
      filters['fsan'] = filters['fsan_serialno'] ? filters['fsan_serialno'] : (filters['systemDetails'] && filters['systemDetails']['fsan'] ? filters['systemDetails']['fsan'] : '');
      this.filtersForm.patchValue(filters);
      this.issueService.setMapViewFilters(history.state.filters);
    } else {
      this.issueService.setMapViewFilters({});
    }

    this.getRegions();
    this.getCount();
    this.getListSub();
  }

  getListSub(extraQuery?: any) {
    this.validateFSAN();
    if (!this.fsanvalid) return;
    this.clearError('list');
    this.paginateLoading = true;
    this.previousFlag = false;
    this.nextFlag = false;
    this.getList(extraQuery).subscribe((resp: any) => {
      this.processListResp(resp);
      this.paginateLoading = false;
    }, (err: any) => {
      //TODO
      console.log(err);
      this.pageErrorHandle(err, 'list');
      this.paginateLoading = false;
    });
  }

  processListResp(resp: any) {
    if (resp?.serviceDisruption) {
      resp['serviceDisruption']?.forEach(element => {
        if (element?.['systemName']) {
          element['ui_modified_systemName'] = element['systemName']?.replace('device=', '')?.replace('DEVICE=', '');
        }
      });
    }

    this.previousFlag = resp?.previousFlag;
    this.nextFlag = resp?.nextFlag;
    this.list = resp?.serviceDisruption ? resp.serviceDisruption : [];
    this.loading = false;
    this.paginateLoading = false;
  }

  gotoPrevious() {
    if (!this.previousFlag) {
      return;
    }
    let extraQuery = `sort=${this.list[0]?.sort?.join()}&paginate=PREVIOUS`;
    if (this.searchQuery) {
      extraQuery += `&${this.searchQuery}`;
    }
    this.getListSub(extraQuery);
  }

  gotoNext() {
    if (!this.nextFlag) {
      return;
    }
    let length = this.list?.length;
    let extraQuery = `sort=${this.list[length - 1]?.sort?.join()}&paginate=NEXT`;
    if (this.searchQuery) {
      extraQuery += `&${this.searchQuery}`;
    }
    this.getListSub(extraQuery);
  }

  getList(extraQuery?: any) {

    let fields = this.filtersForm.value;
    ['region', 'location', 'system'].forEach((element: any) => {
      if (fields[element]?.indexOf('All') !== -1) {
        fields[element] = undefined;
      }
    });

    this.appliedParams = fields;
    let query = this.issueService.buildQuery(fields);
    fields = { ...fields, ...{ alertType: 'DISRUPTION' } }
    this.issueService.setAppliedFilters(fields);

    if (extraQuery) {
      query += `&${extraQuery}`;
    }

    this.list = [];
    let url = `${environment.API_BASE_URL}analytics-engine/serviceDisruptions?${query}`;

    return this.http.get(url);

  }

  clearFilter() {
    this.filtersForm.patchValue({
      region: ['All'],
      location: ['All'],
      system: ['All'],
      fsan: ''
    });

    this.appliedParams = {};

    this.getListSub();

  }

  getRegions() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res) {
          res = this.issueService.appendFqn(res);
          res.sort();
          this.regionsDataArray = [...this.regionsDataArray, ...res];
          if (this.filtersForm.get('region').value) {
            this.loadLocationValue('');
          }
          console.log(this.regionsDataArray);
        }

      }, (error) => {
        console.log(error);
      })
  }

  loadLocationValue(event: any) {
    let ids = this.filtersForm.get('region').value;

    if (ids?.length) {
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
            res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
            return res;
          }),
          catchError(this.handleError))
          .subscribe((res: any) => {
            res = this.issueService.appendFqn(res);
            this.chartOptionService.setLocationsInfo(res);
            this.locationDataArray = ["All"];
            this.locationDataArray = [...this.locationDataArray, ...res];

            let locationIds = this.filtersForm.get('location').value;

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

      } else {
        this.filtersForm.get('region').setValue(['All']);
        this.filtersForm.get('location').setValue(['All']);
        this.locationDataArray = ["All"];
      }
    } else {
      this.filtersForm.get('region').setValue(['All']);
      this.filtersForm.get('location').setValue(['All']);
      this.filtersForm.get('system').setValue(['All']);
    }

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

        if (regionQuery) {
          regionQuery += `&`;
        }

        regionQuery += `region=${element}`
      });

      let locationQuery = '';

      locationids.forEach(element => {
        if (element == 'All') {
          return;
        }
        locationQuery += `&location=${element}`
      });

      this.systemsSubject = this.http.get(`${environment.API_BASE_URL}nfa/systems?${regionQuery}${locationQuery}`).pipe(
        map((res: any) => {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        }),
        catchError(this.handleError))
        .subscribe((res: any) => {
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

        }, (error) => {
        });

    } else {
      if (!locationids.length) {
        this.filtersForm.get('location').setValue(['All']);
        this.filtersForm.get('system').setValue(['All']);
        //this.filtersForm.get('location').setValue(['All']);

        this.systemDataArray = ["All"];
      }
    }

  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
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
    //console.log(event);

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
    //console.log(event);

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

  validateFSAN(event?: any) {
    if (event) {
      if (this.filtersForm.get('fsan')?.value?.length === 0 || this.filtersForm.get('fsan')?.value?.length === 12) {
        this.fsanvalid = true;
      }
    } else {
      this.fsanvalid = true;
      if (this.filtersForm.get('fsan')?.value?.length !== 0 && this.filtersForm.get('fsan')?.value?.length !== 12) {
        this.fsanvalid = false;
      }
    }

  }

  removespecialcharacter(event) {
    const key = event.keyCode  //key = event.charCode;
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

  getCount() {
    this.clearError('count');
    this.http.get(`${environment.API_BASE_URL}analytics-engine/serviceDisruptionsCount`, { responseType: 'text' }).subscribe((count: any) => {
      this.count = count ? count : 0;
    }, (err: any) => {
      this.pageErrorHandle(err, 'count');
    })
  }

  gotoHomeGeomap() {
    this.issueService.gotoHomeGeomap();
  }

  clearError(key?: any) {
    if (key) {
      delete this.errors[key];
    } else {
      this.errors = {};
    }
  }

  pageErrorHandle(err: HttpErrorResponse, key: any) {
    if (err.status == 401) {
      this.errors[key] = this.language['Access Denied'];
    } else {
      this.errors[key] = this.commonOrgService.pageErrorHandle(err);
    }
    this.loading = false;
  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }
    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

  doExport() {
    this.disableExprtBtn = true;
    const offset = (new Date()).toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    let query = this.issueService.buildQuery(this.appliedParams);
    query += `&timeZone=${encodeURIComponent(offset)}`;
    this.http.get(`${environment.API_BASE_URL}analytics-engine/exportServiceDisruptions?${query}`, { responseType: 'text', observe: 'response' as 'body' }).subscribe(
      (response: any) => {
        const filename: string = this.issueService.getFileName(response);
        const blob = new Blob([response.body], { type: 'text/csv' })
        saveAs(blob, filename);
        this.disableExprtBtn = false;
      }, (err: any) => {
        this.disableExprtBtn = false;
        this.pageErrorHandle(err, 'export');
      }
    );
  }

  doRefresh() {
    this.previousFlag = false;
    this.nextFlag = false;
    this.loading = false;
    this.searchQuery = '';
    this.getCount();
    this.getListSub();
  }

  searchSubscriber(data: any) {
    this.router.navigate([`/cco/services/subscribers/system/list`], {
      state: {
        ccoSystemSearchText: data?.fsan || '',
      }
    });
  }

  ngOnDestroy() {
    this.regionsSubject?.unsubscribe();
    this.locationsSubject?.unsubscribe();
    this.systemsSubject?.unsubscribe();
  }


}
