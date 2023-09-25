import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { environment } from 'src/environments/environment';
import { IssueService } from '../../issues/service/issue.service';
@Component({
  selector: 'app-workflow-conditions',
  templateUrl: './workflow-conditions.component.html',
  styleUrls: ['./workflow-conditions.component.scss'],
})
export class WorkflowConditionsComponent implements OnInit {
  canApplyFilter: boolean;
  regionSelected: any = 'All';
  locationSelected: any = 'All';
  onChangeRecurrenceSubject;
  onChangeTriggerSubject;
  locationsSubject: any;
  language: any;
  languageSubject;
  regionsSubject;
  conditionFormSubject;
  workFlowConditionsForm: FormGroup;
  scheduleMinDate = new Date();
  regionName: any;
  locationName: any;
  _workFlowConditionsData: any = {};
  clickedRegion: string;
  recurrenceList = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
  ];
  triggerType = [
    { value: 'true', name: 'immediately' },
    { value: 'false', name: 'On a schedule' },
  ];
  @Input() conditionFormSubmitted: Subject<boolean>;
  onChangeSoakTimeSubject: any;
  @Input()
  set workFlowConditionsData(value: any) {
    this._workFlowConditionsData = value;
  }
  get workFlowConditionsData() {
    return this._workFlowConditionsData;
  }
  @Output() getWorkFlowAPIEmitter = new EventEmitter();
  constructor(
    public ssoService: SsoAuthService,
    private http: HttpClient,
    private translateService: TranslateService,
    private workflowService: WorkflowService,
    private issueService : IssueService
  ) {}

  ngOnInit(): void {
    // this.workFlowConditionsData.regionsDataArray = ['All'];
    // this.workFlowConditionsData.locationDataArray = ['All'];

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    if (!this.workFlowConditionsData.conditionsFormEntered) {
      // this.workFlowConditionsData.workFlowConditionsForm =
      //   this.formBuilder.group({
      //     region: ['', Validators.required],
      //     region_name: [[]],
      //     location: ['', Validators.required],
      //     location_name: [[]],
      //     soakTime: [0, Validators.required],
      //     raiseThreshold: [1, Validators.required],
      //     duration: [0, Validators.required],
      //   });
      if (this.workFlowConditionsData && this.workFlowConditionsData.workFlowConditionsForm) {
        this.workFlowConditionsData.workFlowConditionsForm
        .get('region')
        .setValue(['All']);
        this.workFlowConditionsData.workFlowConditionsForm
        .get('location')
        .setValue(['All']);
      }
      
      // this.patchValues();
      this.workFlowConditionsData.conditionsFormEntered = true;
    }
    const filteringFormControl = this.workFlowConditionsData && this.workFlowConditionsData.workFlowConditionsForm ?
      this.workFlowConditionsData.workFlowConditionsForm.controls: {};
      if(filteringFormControl){
        this.onChangeRecurrenceSubject = filteringFormControl[
          'recurrence'
        ]?.valueChanges?.subscribe((selectedValue) => {
          this.onSelectReccurence();
        });
        this.onChangeTriggerSubject = filteringFormControl[
          'immediate'
        ]?.valueChanges?.subscribe((selectedValue) => {
          this.onSelectReccurence();
          // filteringFormControl['region'].setValue(['All']);
          // filteringFormControl['location'].setValue(['All']);
        });

        this.onChangeSoakTimeSubject = filteringFormControl[
          'soakTime'
        ]?.valueChanges?.subscribe((selectedValue) => {
          
          this.workFlowConditionsData['soakTime'] = selectedValue;
          if (this.workFlowConditionsData['soakTime'] && this.workFlowConditionsData['soakTime'] > 0) {
            
            if(!this.workFlowConditionsData['soakTimeChanged']){
              this.workFlowConditionsData['oldNotifyOnClear'] = filteringFormControl['notifyOnClear'].value;
              this.workFlowConditionsData['soakTimeChanged'] = true;
            }
            
            filteringFormControl['notifyOnClear'].setValue(true);
          }else{
            filteringFormControl['notifyOnClear'].setValue(this.workFlowConditionsData['oldNotifyOnClear'] || this.workFlowConditionsData['oldNotifyOnClear'] == false?this.workFlowConditionsData['oldNotifyOnClear'] : false);
            this.workFlowConditionsData['soakTimeChanged'] = false;
          }
        });
        
        // filteringFormControl['immediate'].enable();
        // if(this.workFlowConditionsData['workFlowStatus'] == 'PAUSE'){
        //   filteringFormControl['immediate'].disable();
        // }
        filteringFormControl['raiseThreshold']?.setValidators([Validators.required, Validators.min(this.workFlowConditionsData.minRaiseThreshold-1 != 0?this.workFlowConditionsData.minRaiseThreshold-1:this.workFlowConditionsData.minRaiseThreshold)]);
    
      }
    
    
    this.conditionFormSubject = this.conditionFormSubmitted?.subscribe((v) => {
      this.workFlowConditionsData?.workFlowConditionsForm?.markAllAsTouched();
    });
    this.callMultipleAPI();
  }
  async callMultipleAPI() {
    // await Promise.all([
    //   //regions data
    //   this.regionsApiLoader()
    // ]);
    //Call Get workflow API in alarm Notification page
    this.getWorkFlowAPIEmitter.emit(true);
  }
  // regionsApiLoader(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.regionSelected = 'All';
  //     this.locationSelected = 'All';
  //     this.regionsSubject = this.issueService.getRegions().subscribe(
  //       (res: any) => {
  //         res.sort();
  //         this.workFlowConditionsData.regionsDataArray = [
  //           ...this.workFlowConditionsData.regionsDataArray,
  //           ...res,
  //         ];
  //         resolve();
  //       },
  //       (error) => {}
  //     );
  //   });
  // }
  validateRegion(event: any) {
    let regions =
      this.workFlowConditionsData.workFlowConditionsForm.get('region').value;

    if (event === 'All') {
      regions = ['All'];
    } else {
      let index = regions.indexOf('All');
      if (index > -1) {
        regions.splice(index, 1);
      }
    }

    this.workFlowConditionsData.workFlowConditionsForm
      .get('region')
      .setValue(regions);

    this.loadLocationValue('');
  }
  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = 'All';
    let ids =
      this.workFlowConditionsData.workFlowConditionsForm.get('region').value;
    this.regionSelected = ids;
    if (this.regionSelected && this.regionSelected != ['All']) {
      let regionQuery = '';

      if (ids.length && ids !== ['All']) {
        if (ids.indexOf('All') !== -1) {
          this.regionName = null;
          this.locationName = null;
          this.workFlowConditionsData.locationDataArray = ['All'];
          return;
        }
        ids.forEach((element) => {
          if (element == 'All') {
            return;
          }
          regionQuery += `&region=${element}`;
        });

        this.locationsSubject = this.http
          .get(
            `${
              environment.API_BASE_URL
            }nfa/locations?tenant=0${regionQuery}`
          ).pipe(
            map((res: any) => {
              res = this.issueService.appendFqn(res);
              res.sort((a, b) =>
                (a['name'] || '')
                  .toString()
                  .localeCompare((b['name'] || '').toString(), 'en', {
                    numeric: false,
                  })
              );
              return res;
            }),
            catchError(this.handleError)
          )
          .subscribe(
            (res: any) => {
              this.workFlowConditionsData.locationDataArray = ['All'];
              
              let mod_res = res.map((el) => {
                let strings = el.fqn.split(','),
                regionFound = strings.find((el) => el.includes('REGION'));
                if (regionFound.split('=').length > 0) {
                  el['region_name'] = regionFound.split('=')[1];
                }                
                return el;
              });
              mod_res.forEach((element, index) => {
                element['check_region_name'] = element.region_name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")"
              });

              this.workFlowConditionsData.locationDataArray = [...this.workFlowConditionsData.locationDataArray, ...mod_res];

              let locationsArray =
              this.workFlowConditionsData.workFlowConditionsForm.get('location').value;
              if(locationsArray && locationsArray.length > 0){
                locationsArray.forEach((el, index) => {
                  if(el != 'All'){
                    if (this.workFlowConditionsData.locationDataArray?.findIndex(fi => fi['id'] == el) == -1) {
                      locationsArray = locationsArray?.filter(element => element != el);
                    }
                  }
              })
              }
              if(!locationsArray || locationsArray.length == 0){
                locationsArray = ['All'];
              }
              this.workFlowConditionsData.workFlowConditionsForm
              .get('location')
              .setValue(locationsArray);
              // this.locationDataArray = res;
              // this.locationDataArray.push("All");
            },
            (error) => {}
          );

        this.regionName = ids;
      } else {
        this.workFlowConditionsData.workFlowConditionsForm
          .get('location')
          .setValue(['All']);
        this.workFlowConditionsData.workFlowConditionsForm
        .get('region')
        .setValue(['All']);
        //this.filtersForm.get('region').setValue(['All']);
        this.regionName = null;
        this.locationName = null;
        this.workFlowConditionsData.locationDataArray = ['All'];
      }
    }
  }
  removeLocationValue(event){
    let ids =
    this.workFlowConditionsData.workFlowConditionsForm.get('location').value;
    let locationSelected = ids;
    if (locationSelected && locationSelected != ['All']) {

      if (ids.length == 0 || !ids) {
        this.workFlowConditionsData.workFlowConditionsForm
          .get('location')
          .setValue(['All']);
      }
    }
  }
  validateLocation(event: any) {
    let locations =
      this.workFlowConditionsData.workFlowConditionsForm.get('location').value;

    if (event === 'All') {
      locations = ['All'];
    } else {
      let index = locations.indexOf('All');
      if (index > -1) {
        locations.splice(index, 1);
      }
    }

    this.workFlowConditionsData.workFlowConditionsForm
      .get('location')
      .setValue(locations);
  }

  enforceMinMax(event, controlName) {
    setTimeout(() => {
      let value = this.workflowService.enforceMinMax(event);
      if(value != -1){
        this.workFlowConditionsData.workFlowConditionsForm
        .get(controlName)
        .setValue(value);
      }
    }, 1000);
  }
  onChangeExclusionTime(event, type, index, event_type?) {
    const weeklyDays = (
      this.workFlowConditionsData.workFlowConditionsForm.get(
        'weekDays'
      ) as FormArray
    ).at(index);

    //Set Seconds as 0
    if (weeklyDays.value.dayFrom) {
      let dayFrom = new Date(weeklyDays.value.dayFrom);
      dayFrom.setSeconds(0);
      weeklyDays.value.dayFrom = dayFrom;
    }
    if (weeklyDays.value.dayTo) {
      let dayTo = new Date(weeklyDays.value.dayTo);
      dayTo.setSeconds(0);
      weeklyDays.value.dayTo = dayTo;
    }

    if (
      type == 'dayFrom' &&
      weeklyDays.value.dayFrom &&
      ((event && event.target && event.target.value && event.target?.value.length >= 8) ||
        event_type == 'select')
    ) {
      let minTime = this.getDefaultMinDate(weeklyDays.value.dayFrom, 'min'),
        defaultTime = this.getDefaultMinDate(
          weeklyDays.value.dayFrom,
          'default'
        );
      if (
        weeklyDays.value.dayTo &&
        weeklyDays.value.dayFrom >= weeklyDays.value.dayTo
      ) {
        weeklyDays.patchValue({
          dayTo: '',
        });
      }

      this.workFlowConditionsData.weekDays[index].minTime = minTime;
      this.workFlowConditionsData.weekDays[index].defaultTime = defaultTime;
    } else if (
      type == 'dayTo' &&
      weeklyDays.value.dayTo &&
      ((event && event.target && event.target.value && event.target?.value.length >= 8) ||
        event_type == 'select')
    ) {
      if (weeklyDays.value.dayFrom >= weeklyDays.value.dayTo) {
        weeklyDays.patchValue({
          dayTo: '',
        });
      }
    }
  }
  onCheckExclusionDays(event, index) {
    let checked = event.target.checked;
    const weeklyDays = (
      this.workFlowConditionsData.workFlowConditionsForm.get(
        'weekDays'
      ) as FormArray
    ).at(index);
    if (checked) {
      if (!weeklyDays.value.dayFrom && !weeklyDays.value.dayTo) {
        let start = new Date();
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);

        let end = new Date();
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(0);

        weeklyDays.patchValue({
          dayFrom: start,
          dayTo: end,
        });
        let minTime = this.getDefaultMinDate(start, 'min'),
          defaultTime = this.getDefaultMinDate(start, 'default');
        this.workFlowConditionsData.weekDays[index].minTime = minTime;
        this.workFlowConditionsData.weekDays[index].defaultTime = defaultTime;
      }
    }else{
      weeklyDays.patchValue({
        dayFrom: '',
        dayTo: '',
      });
    }
  }
  getDefaultMinDate(date, type?) {
    let dateSel = new Date(date);
    if (type == 'default') {
      dateSel.setHours(23);
      dateSel.setMinutes(59);
      dateSel.setSeconds(0);
    } else {
      dateSel.setMinutes(dateSel.getMinutes() + 1);
    }
    return dateSel;
  }
  onSelectReccurence() {
    const recurrence =
      this.workFlowConditionsData?.workFlowConditionsForm?.controls?.recurrence?.value;
    const formControls =
      this.workFlowConditionsData?.workFlowConditionsForm?.controls;
    if(formControls){
      if (formControls['immediate'].value == 'false') {
        // formControls['timezone'].disable();
        // formControls['weekDays']?.controls?.forEach((el) => {
        //   el?.controls['checked']?.disable();
        //   el?.controls['dayFrom']?.disable();
        //   el?.controls['dayTo']?.disable();
        // });
        if (
          recurrence == 'daily' ||
          recurrence == 'weekly' ||
          recurrence == 'monthly'
        ) {
          formControls['scheduleStartTime'].setValidators([Validators.required]);
          // formControls['everyCount'].setValidators([Validators.required]);
        }
        if (recurrence == 'monthly') {
          // formControls['numberOfMonths'].setValidators([Validators.required]);
          formControls['dayOfMonth'].setValidators([Validators.required]);
        }
  
        if (recurrence == 'daily' || recurrence == 'weekly' || recurrence == '') {
          // formControls['numberOfMonths'].setErrors(null);
          // formControls['numberOfMonths'].clearValidators();

          formControls['dayOfMonth'].setErrors(null);
          formControls['dayOfMonth'].clearValidators();
        }
        // if(recurrence == 'Weekly' || recurrence == 'Monthly' || recurrence == ''){
        //   formControls['dailyDayCount'].clearValidators();
        //   formControls['dailyDayCount'].setErrors(null);
        // }
        // if(recurrence == 'Monthly' || recurrence == 'Daily' || recurrence == ''){
        //   formControls['weeklyDayCount'].clearValidators();
        //   formControls['weeklyDayCount'].setErrors(null);
        // }
      } else {
        // formControls['timezone'].enable();
        // formControls['weekDays']?.controls?.forEach((el) => {
        //   el?.controls['checked']?.enable();
        //   el?.controls['dayFrom']?.enable();
        //   el?.controls['dayTo']?.enable();
        // });
        // formControls['numberOfMonths'].setErrors(null);
        // formControls['numberOfMonths'].clearValidators();
        formControls['dayOfMonth'].setErrors(null);
        formControls['dayOfMonth'].clearValidators();
        formControls['scheduleStartTime'].setErrors(null);
        formControls['scheduleStartTime'].clearValidators();
        // formControls['everyCount'].setErrors(null);
        // formControls['everyCount'].clearValidators();
      }
    }
    
  }
  selectWeeklySchedule(day) {
    let dayOfWeek = this.workFlowConditionsData.weekDays.find(
      (el) => el.value == day.value
    );
    dayOfWeek['scheduleWeeklyStatus'] = !dayOfWeek['scheduleWeeklyStatus'];
    const formControls =
      this.workFlowConditionsData?.workFlowConditionsForm?.controls;
    formControls['weekDays']?.controls.forEach((el) => {
      if (el['value']['value'] == day['value']) {
        el?.controls['scheduleWeeklyStatus']?.setValue(
          dayOfWeek['scheduleWeeklyStatus']
        );
      }
    });
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  avoidInvalidValues(event) {
    if (event.key === '.' || (event?.which != 8 && event?.which != 0 && (event?.which < 48 || event?.which > 57) && (event?.which < 96 || event?.which > 105))) { event.preventDefault(); }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.locationsSubject) this.locationsSubject.unsubscribe();
    if (this.regionsSubject) this.regionsSubject.unsubscribe();
    // if (this.conditionFormSubmitted) this.conditionFormSubmitted.unsubscribe();
    if (this.onChangeRecurrenceSubject)
      this.onChangeRecurrenceSubject.unsubscribe();
    if (this.onChangeTriggerSubject) this.onChangeTriggerSubject.unsubscribe();
    if (this.onChangeSoakTimeSubject) this.onChangeSoakTimeSubject.unsubscribe();
    // if (this.conditionFormSubject) this.conditionFormSubject.unsubscribe();
  }
}
