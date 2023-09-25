import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { HistoryChartOptionsService } from 'src/app/cco/issues/historyreport/service/history-chart-options.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { OutlierWorkflowService } from '../../outlier-workflow.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  language: any;
  languageSubject: any;
  loading = false;

  formSub: any;
  regionsSubject: any;
  regionsDataArray: any = ['All'];
  locationDataArray: any = ['All'];
  locationsSubject: any;
  systemsSubject: any;
  ssoService: any;
  systemDataArray: any = ['All'];

  @Input()
  set workflowObj(data: any) {
    console.log(data);
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any;
  public tabSub: any;
  submitted = false;
  @Output() isFormValid = new EventEmitter();

  systemForm = this.fb.group({
    regions: ['All', Validators.required],
    locations: ['All', Validators.required],
    systems: ['All', Validators.required],
  });

  constructor(private translateService: TranslateService,
    private fb: FormBuilder,
    private otlrWrkflwSrvc: OutlierWorkflowService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private chartOptionService: HistoryChartOptionsService,
    private issueService: IssueService) { }

  ngOnInit(): void {
    this.tabSub = this.otlrWrkflwSrvc.outlierTabChanged$.subscribe((value: any) => {
      this.submitted = true;
    });
    this.getRegions();
    this.systemForm.patchValue({
      regions: this.workflowObj?.regions?.length ? this.workflowObj?.regions : ['All'],
      locations: this.workflowObj?.locations?.length ? this.workflowObj?.locations : ['All'],
      systems: this.workflowObj?.systems?.length ? this.workflowObj?.systems : ['All']
    });
    this.formSub = this.systemForm.valueChanges.subscribe((value: any) => {
      this.workflowObj.regions = value?.regions;
      this.workflowObj.locations = value?.locations;
      this.workflowObj.systems = value?.systems;
      this.isFormValid.emit(this.systemForm.valid);
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  getRegions() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res) {
          res = this.issueService.appendFqn(res);
          res.sort();
          this.regionsDataArray = [...this.regionsDataArray, ...res];
          console.log(this.regionsDataArray);
          if (this._workflowObj?.regions) {
            this.systemForm.get('regions').setValue(this._workflowObj.regions);
            this.loadLocationValue('');
          }

        }

      }, (error) => {
        console.log(error);
      })
  }

  loadLocationValue(event: any) {
    let ids = this.systemForm.get('regions').value;

    if (ids?.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          this.locationDataArray = ["All"];
          this.systemForm.get('locations').setValue(['All']);
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
            if (this._workflowObj?.locations) {
              this.systemForm.get('locations').setValue(this._workflowObj.locations);
            }

            let locationIds = this.systemForm.get('locations').value;

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

              this.systemForm.get('locations').setValue(validLocationIds);
              this.loadSystemValue();


            }

          }, (error) => {
          });

      } else {
        this.systemForm.get('regions').setValue(['All']);
        this.systemForm.get('locations').setValue(['All']);
        this.locationDataArray = ["All"];
      }
    } else {
      this.systemForm.get('regions').setValue(['All']);
      this.systemForm.get('locations').setValue(['All']);
      this.systemForm.get('systems').setValue(['All']);
    }

  }

  loadSystemValue(event?: any) {
    let regionids = this.systemForm.get('regions').value;
    let locationids = this.systemForm.get('locations').value;
    let systemIds = this.systemForm.get('systems').value;
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

            this.systemForm.get('systems').setValue(validSystemIds);

          }

        }, (error) => {
        });

    } else {
      if (!locationids.length) {
        this.systemForm.get('locations').setValue(['All']);
        this.systemForm.get('systems').setValue(['All']);
        //this.systemForm.get('location').setValue(['All']);

        this.systemDataArray = ["All"];
      }
    }

  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


  validateRegion(event: any) {
    let regions = this.systemForm.get('regions').value;

    if (event === 'All') {
      regions = ['All'];
    } else {
      let index = regions.indexOf('All');
      if (index > -1) {
        regions.splice(index, 1);
      }

    }

    this.systemForm.get('regions').setValue(regions);

    this.loadLocationValue('');

  }

  validateLocation(event: any) {
    let locations = this.systemForm.get('locations').value;
    //console.log(event);

    if (event === 'All') {
      locations = ['All'];
    } else {
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }

    }

    this.systemForm.get('locations').setValue(locations);
    this.workflowObj.locations = locations;
    this.loadSystemValue('');

  }

  validateSystem(event: any) {
    let systems = this.systemForm.get('systems').value;
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

    this.systemForm.get('systems').setValue(systems);

  }



}
