import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { HistoryChartOptionsService } from '../../issues/historyreport/service/history-chart-options.service';
import { IssueService } from '../../issues/service/issue.service';
import { OutageWorkflowService } from '../outage-workflow.service';

@Component({
  selector: 'app-outge-wrkflw-notification-trigger',
  templateUrl: './outge-wrkflw-notification-trigger.component.html',
  styleUrls: ['./outge-wrkflw-notification-trigger.component.scss']
})
export class OutgeWrkflwNotificationTriggerComponent implements OnInit, OnDestroy {
  @Output() isFormValid = new EventEmitter();
  regionsSubject: any;
  regionsDataArray = ["All"];
  locationDataArray: string[] = ["All"];
  locationsSubject: any;
  tabSub: any;
  submitted: boolean;
  @Input()
  set workflowObj(data: any) {
    console.log(data);
    data = this.otgWrkflwSrvc.updateRegLocToAll(data);
    data?.['filter']?.forEach(element => {
      this.exclusionsObj[element.daysOfWeek] = element;
    });
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any;

  language: any;
  languageSubject: any;
  daysMap = {
    day1: {
      label: 'Monday',
      value: 'MON'
    },
    day2: {
      label: 'Tuesday',
      value: 'TUE'
    },
    day3: {
      label: 'Wednesday',
      value: 'WED'
    },
    day4: {
      label: 'Thursday',
      value: 'THU'
    },
    day5: {
      label: 'Friday',
      value: 'FRI'
    },
    day6: {
      label: 'Saturday',
      value: 'SAT'
    },
    day7: {
      label: 'Sunday',
      value: 'SUN'
    },
  }

  triggerForm = this.fb.group({
    outagePollInterval: ['', [Validators.required]],
    //outageDuration: ['', [Validators.required, threeDigitValidator]],
    region: ['All'],
    location: ['All'],
    exclusions: this.fb.array([])
  });

  exclusionsObj = {};
  formSub: any;
  outagePollOptions = [
    { id: 10, name: 10 },
    { id: 15, name: 15 },
    { id: 30, name: 30 },
  ];

  constructor(private translateService: TranslateService,
    private fb: FormBuilder,
    private dateUtils: DateUtilsService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private otgWrkflwSrvc: OutageWorkflowService,
    private chartOptionService: HistoryChartOptionsService,
    private issueService: IssueService) { }

  ngOnInit(): void {
    this.tabSub = this.otgWrkflwSrvc.outageTabChanged$.subscribe((value: any) => {
      this.submitted = true;
    });
    this.getRegions();
    this.generateExclusion();
    this.triggerForm.patchValue({
      outagePollInterval: this.workflowObj?.outagePollInterval,
      //outageDuration: this.workflowObj?.outageDuration,
      region: this.workflowObj?.region,
      location: this.workflowObj?.location
    });
    this.formSub = this.triggerForm.valueChanges.subscribe((value: any) => {
      this.prepareNtfctnTriggerData(value);
      this.isFormValid.emit(this.triggerForm.valid);
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  get formControls() { return this.triggerForm.controls; }

  getRegions() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res?.length) {
          res = this.issueService.appendFqn(res);
          res.sort();
          this.regionsDataArray = [...this.regionsDataArray, ...res];
          if (this._workflowObj?.region) {
            this.triggerForm.get('region').setValue(this._workflowObj.region);
            this.loadLocationValue('');
          }

        }

      }, (error) => {
        console.log(error);
      })
  }

  loadLocationValue(event: any) {
    let ids = this.triggerForm.get('region').value;

    if (ids?.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          this.locationDataArray = ["All"];
          this.triggerForm.get('location').setValue(['All']);
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
            res = this.issueService.appendFqn(res);
            res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
            return res;
          }),
          catchError(this.handleError))
          .subscribe((res: any) => {
            this.chartOptionService.setLocationsInfo(res);
            this.locationDataArray = ["All"];
            this.locationDataArray = [...this.locationDataArray, ...res];
            if (this._workflowObj?.location) {
              this.triggerForm.get('location').setValue(this._workflowObj.location);
            }

            let locationIds = this.triggerForm.get('location').value;

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

              this.triggerForm.get('location').setValue(validLocationIds);


            }

          }, (error) => {
          });

      } else {
        this.triggerForm.get('region').setValue(['All']);
        this.triggerForm.get('location').setValue(['All']);
        this.locationDataArray = ["All"];
      }
    } else {
      this.triggerForm.get('region').setValue(['All']);
      this.triggerForm.get('location').setValue(['All']);
    }

  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  createExclusion(key): FormGroup {
    return this.fb.group({
      daysOfWeek: [this.exclusionsObj[key] ? key : ''],
      fromTime: [this.exclusionsObj[key] ? this.getStartDate(this.exclusionsObj[key]?.fromTime) : this.getStartDate()],
      toTime: [this.exclusionsObj[key] ? this.getEndDate(this.exclusionsObj[key]?.toTime) : this.getEndDate()]
    })
  }

  generateExclusion() {
    let keys = Object.keys(this.daysMap);
    keys?.forEach(key => {
      this.exclusions.push(this.createExclusion(this.daysMap[key]?.value));
    });
  }

  get exclusions(): FormArray {
    return <FormArray>this.triggerForm.get('exclusions');
  }

  getEndDate(endTime = '23:59') {
    return new Date(`${this.dateUtils.getTodayDateStr()} ${endTime}`);
  }

  getStartDate(startTime = '00:00') {
    return new Date(`${this.dateUtils.getTodayDateStr()} ${startTime}`);
  }

  prepareExclusionsData(data: any) {
    let filter = [];
    data?.forEach((element: any, index) => {
      if (element?.daysOfWeek) {
        filter.push({
          daysOfWeek: this.daysMap[`day${index + 1}`]?.value,
          fromTime: this.dateUtils.getTimeStr(element?.fromTime),
          toTime: this.dateUtils.getTimeStr(element?.toTime)
        });
      }
    });

    this._workflowObj.filter = filter;
  }

  prepareNtfctnTriggerData(data: any) {
    this._workflowObj.outageDuration = data?.outageDuration;
    this._workflowObj.outagePollInterval = data?.outagePollInterval;
    this._workflowObj.region = data?.region;
    this._workflowObj.location = data?.location;
    //this.prepareExclusionsData(data?.exclusions);
  }

  validateRegion(event: any) {
    let regions = this.triggerForm.get('region').value;

    if (event === 'All') {
      regions = ['All'];
    } else {
      let index = regions.indexOf('All');
      if (index > -1) {
        regions.splice(index, 1);
      }

    }

    this.triggerForm.get('region').setValue(regions);

    this.loadLocationValue('');

  }

  validateLocation(event: any) {
    let locations = this.triggerForm.get('location').value;

    if (event === 'All' || !locations?.length) {
      locations = ['All'];
    } else {
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }

    }

    this.triggerForm.get('location').setValue(locations);
    this.workflowObj.location = locations;

  }

  ngOnDestroy() {
    this.formSub?.unsubscribe();
    this.tabSub?.unsubscribe();
  }

}

export function threeDigitValidator(control: AbstractControl): { [key: string]: any } | null {
  let regex = /^\s*(\d{1,3}|-\d+)?\s*$/;
  if (!control?.value) {
    return { 'isrequired': true };
  }
  if (!(control?.value > 0 && control?.value <= 120)) {
    return { 'minMaxError': true };
  }
  if (!regex.test(control.value)) {
    return { 'invalidNumber': true };
  }

  return null;

}

export function fiveDigitValidator(control: AbstractControl): { [key: string]: any } | null {
  let regex = /^\s*(\d{1,3}|-\d+)?\s*$/;
  if (!control?.value) {
    return { 'isrequired': true };
  }
  if (!(control?.value > 0 && control?.value <= 10000)) {
    return { 'minMaxError': true };
  }
  if (!regex.test(control.value)) {
    return { 'invalidNumber': true };
  }

  return null;

}
