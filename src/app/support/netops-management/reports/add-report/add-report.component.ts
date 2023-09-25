import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})




export class AddReportComponent implements OnInit {
  language: any;
  languageSubject;
  public reportForm: FormGroup;
  public selectedRecurrence: string;
  public submitted: Boolean;
  public ruleLists: any;
  public ruleConditions: any;
  public addRulehide: Boolean = false;
  public message = [false, false, false];
  public weekList: any;
  public AddRuleClick: boolean = false;
  itmes: any;
  orgId: string;
  setPattern: any;
  allDays: any;
  recordId: string;
  attribute;
  selectedOption;
  ruleEmpty: Boolean = false;
  paramsSelected: any = [];
  order: any;
  ErrorMsg: Boolean = false;
  queryerrorMessage = [];
  queryerror = [false, false, false];
  Reporttitle: any;
  error: boolean = false;
  issubmit: boolean = false;
  constructor(public fb: FormBuilder,
    private translateService: TranslateService,
    private reportService: ReportsService, private ssoAuthService: SsoAuthService, private router: Router) {

    this.selectedRecurrence = "one";
    //initializing the form
    this.reportForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      reportFormat: '',
      emailRecipients: ['', [Validators.pattern("^[0-9a-zA-Z\_.]*$")]],
      recurrenceType: '',
      dailyPattern: [''],
      dailyPatternValue: ['', [Validators.pattern("^[1-9]*$")]],
      weekPatternValue: [''],
      weekPatternDay: '',
      monthlyPatternOptions: '',
      monthlyPattern: '',
      monthlyPatternDayOption1: '',
      monthlyPatternMonthOption1: '',
      monthlyPatternOrder: '',
      monthlyPatternDayOption2: '',
      monthlyPatternMonthOption2: '',
      observationPeriodAtlest: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      observationPeriodPastDays: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      queryLogic: '',
      ruleType: '',
      rulesArray: this.fb.array([])


    });
    this.ruleLists = [
      { name: "Interference", value: "ChannelInterferenceTimeAvg" }
    ];
    this.ruleConditions = [
      { name: "Greater Than or Equals ", value: ">=" },
      { name: "Less Than or Equals", value: "<=" }
    ];
    this.allDays = [
      { name: 'SUN', value: 'Sunday', checked: false },
      { name: 'MON', value: 'Monday', checked: false },
      { name: 'TUE', value: 'Tuesday', checked: false },
      { name: 'WED', value: 'Wednesday', checked: false },
      { name: 'THU', value: 'Thursday', checked: false },
      { name: 'FRI', value: 'Friday', checked: false },
      { name: 'SAT', value: 'Saturday', checked: false }
    ]
    this.weekList = [
      { name: 'Sunday', value: 'Sunday' },
      { name: 'Monday', value: 'Monday' },
      { name: 'Tuesday', value: 'Tuesday' },
      { name: 'Wednesday', value: 'Wednesday' },
      { name: 'Thursday', value: 'Thursday' },
      { name: 'Friday', value: 'Friday' },
      { name: 'Saturday', value: 'Saturday' }
    ]
    this.order = [
      { name: 'Last', value: "0" },
      { name: 'First', value: "1" },
      { name: 'Second', value: "2" },
      { name: 'Third', value: "3" },
      { name: 'Fourth', value: "4" },
    ]
    this.orgId = this.ssoAuthService.getOrgId();
  }

  ngOnInit(): void {
    this.Reporttitle = sessionStorage.name;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if (sessionStorage.reportId != undefined && sessionStorage.reportId != "") {

      if (sessionStorage.copyitem == 'true') {

      }
      else
        this.recordId = sessionStorage.reportId;

      this.getReports();
    } else {
      this.itmes = this.reportForm.get('rulesArray') as FormArray;
      this.itmes.push(
        this.fb.group({
          factor: 10,
          parameter: [this.ruleLists[0].value, Validators.required],
          operator: [this.ruleConditions[0].value, Validators.required],
          threshold: ['', Validators.required],
        })
      );
      this.reportForm.controls['recurrenceType'].patchValue('1');
      this.reportForm.controls['reportFormat'].patchValue('1');
      this.reportForm.controls['queryLogic'].patchValue('and');
      this.reportForm.controls['ruleType'].patchValue('gateway');
    }
  }
  querytxterror(index) {
    this.AddRuleClick = false;
    this.paramsSelected = this.itmes.value.map(obj => obj.parameter);
    //  this.submitted = false;
    // ruleCheck(index) {
    //   let params = this.itmes.value.map(obj =>obj.parameter);
    //   return params.indexOf(params[index]) != params.lastIndexOf(params[index]);
    // }

    let type = this.itmes.value.map(obj => obj.parameter);
    let value = this.itmes.value.map(obj => obj.threshold);
    let number = parseInt(value[0]);
    if (!isNaN(parseInt(value[index]))) {
      if (type[index] != "RssiUpstreamAvg") {
        if (value[index] <= 0) {
          this.queryerror[index] = true;
          this.queryerrorMessage[index] = "Please enter a value greater than or equal to 1";
          return this.queryerrorMessage[index];
        }
        else if (value[index] > 100) {
          this.queryerror[index] = true;
          this.queryerrorMessage[index] = "Please enter a value less than or equal to 100";
          return this.queryerrorMessage[index];
        }
        else {

          this.queryerror[index] = false;
          return this.queryerrorMessage[index] = " ";
        }


      }
      else {
        if (value[index] >= -9) {
          this.queryerror[index] = true;
          this.queryerrorMessage[index] = "Please enter a value less than or equal to -10";
          return this.queryerrorMessage[index];
        }
        else {
          this.queryerror[index] = false;
          return this.queryerrorMessage[index] = "";
        }
      }
    }

    else {
      this.queryerror[index] = true;
      return this.queryerrorMessage[index] = "This value is not valid";

    }

  }
  // this function will get specified record
  getReports = () => {
    const data = {
      orgId: this.ssoAuthService.getOrgId(),
      type: 'SubscriberReport',
      _id: sessionStorage.reportId
    }
    this.reportService.getCallAvoidanceReport(data).subscribe(
      (res: any) => {
        this.reportForm.controls['name'].patchValue(res.name);
        this.reportForm.controls['description'].patchValue(res.description);
        this.reportForm.controls['recurrenceType'].patchValue(res.scheduler.type.toString());
        this.reportForm.controls['observationPeriodAtlest'].patchValue(res.taskModel.onlinePercent);
        this.reportForm.controls['queryLogic'].patchValue(res.taskModel.queryLogic.toString());
        this.reportForm.controls['observationPeriodPastDays'].patchValue(res.taskModel.queryRange);
        this.reportForm.controls['reportFormat'].patchValue(res.taskModel.reportFormat.toString());
        this.reportForm.controls['emailRecipients'].patchValue(res.taskModel.emailRecipients.toString());
        this.reportForm.controls['ruleType'].patchValue('gateway');
        this.loadRules(res.taskModel.queryRules);

        if (res.scheduler.type == 2) {

          this.reportForm.controls['dailyPattern'].patchValue(!res.scheduler.pattern.weekday ? 'eDay' : 'eWeek');
          this.reportForm.controls['dailyPatternValue'].patchValue(res.scheduler.pattern.frequency);

        } else if (res.scheduler.type == 3) {
          this.reportForm.controls['weekPatternValue'].patchValue(res.scheduler.pattern.frequency);
          this.allDays.map((days, i) => {
            if (res.scheduler.pattern.day.includes(days.value)) {
              days.checked = true;
            }
          });
          this.setSelectedDays();
        } else if (res.scheduler.type == 4) {
          if (res.scheduler.pattern.date) {
            this.reportForm.controls['monthlyPatternOptions'].patchValue('date');
            this.reportForm.controls['monthlyPatternDayOption1'].patchValue((res.scheduler.pattern.date).toString());
            this.reportForm.controls['monthlyPatternMonthOption1'].patchValue((res.scheduler.pattern.frequency).toString());
          }
          else {
            this.reportForm.controls['monthlyPatternOptions'].patchValue('ordinal');
            //this.reportForm.controls['monthlyPatternDayOption2'].patchValue((res.scheduler.pattern.dateType).toString());
            this.reportForm.controls['monthlyPatternMonthOption2'].patchValue((res.scheduler.pattern.frequency).toString());
            let one = [];
            //one= this.weekList.filter(obj => obj.name);
            this.weekList.forEach(element => {
              one.push(element.value);
            });
            let on1 = one.indexOf(res.scheduler.pattern.dateType);
            this.reportForm.controls['monthlyPatternDayOption2'].patchValue((this.weekList[on1].value).toString());
            this.reportForm.controls['monthlyPatternOrder'].patchValue((this.order[res.scheduler.pattern.ordinal].value).toString());

          }
        }
      },
      (err) => {
      }
    )
  }
  loadRules = (data) => {
    if (data != "") {
      if (data[0].parameter == 'ChannelInterferenceTimeAvg' || data[0].parameter == 'Interference') {
        this.reportForm.controls['ruleType'].patchValue('gateway');
        this.ruleLists = [
          { name: "Interference", value: "ChannelInterferenceTimeAvg" }
        ]
      }
      else {
        this.reportForm.controls['ruleType'].patchValue('client devices'); this.ruleLists = [
          { name: "Signal Strength (RSSI)", value: "RssiUpstreamAvg" },
          { name: "Dropped Packets", value: "PacketsDroppedDownstream" },
          { name: "Client Airtime Usage", value: "ChannelUtilizationAvg" }
        ]
      }
      for (let i = 0; i < data.length; i++) {
        this.itmes = this.reportForm.get('rulesArray') as FormArray;
        // let value;
        // switch (data[i].parameter) {
        //   case "Signal Strength (RSS)": value = "Signal Strength (RSS)"; break;
        //   case "Dropped Packets": value = "Dropped Packets"; break;
        //   case "Client Airtime Usage": value = "Client Airtime Usage"; break;
        //   case "Signal Strength (RSS)": value = "Signal Strength (RSS)"; break;
        //   case "PacketsDroppedDownstream": value = "Dropped Packets"; break;
        //   case "ChannelUtilizationAvg": value = "Client Airtime Usage"; break;
        //   case "ChannelInterferenceTimeAvg": value = "Interference"; break;
        //   case "Interference": value = "Interference"; break;
        // }
        this.itmes.push(
          this.fb.group({
            factor: data[i].factor,
            parameter: [data[i].parameter, Validators.required],
            operator: [data[i].operator, Validators.required],
            threshold: [data[i].threshold, Validators.required],
          })
        );
      }
    } else {
      this.itmes = this.reportForm.get('rulesArray') as FormArray;
      this.itmes.push(
        this.fb.group({
          factor: 10,
          parameter: [this.ruleLists[0].value, Validators.required],
          operator: [this.ruleConditions[0].value, Validators.required],
          threshold: ['', Validators.required],
        })
      );
    }

  }
  // this function will add the new item

  addRule = () => {
    this.AddRuleClick = true;
    if (this.reportForm.controls['ruleType'].value != 'gateway') {
      if (this.itmes.length <= 2) {
        this.addRulehide = true;
        this.itmes.push(
          this.fb.group({
            factor: 10,
            parameter: [this.ruleLists[0].value, Validators.required],
            operator: [this.ruleConditions[0].value, Validators.required],
            threshold: ['-20', Validators.required],
          })
        );
      }
      if (this.itmes.length >= 3)
        this.addRulehide = false;
    }
    if (this.reportForm.controls['ruleType'].value == 'gateway') {
      if (this.itmes.length < 1) {
        this.addRulehide = true;
        this.itmes.push(
          this.fb.group({
            factor: 10,
            parameter: [this.ruleLists[0].value, Validators.required],
            operator: [this.ruleConditions[0].value, Validators.required],
            threshold: ['', Validators.required],
          })
        );
      }
      if (this.itmes.length > 0)
        this.addRulehide = false;
    }
    this.paramsSelected = this.itmes.value.map(obj => obj.parameter);
    this.ruleEmpty = false;
  }
  // this will remove the item from formarray
  deleteRuleItem = (index) => {
    this.itmes.removeAt(index);
    if (this.itmes.length <= 2 && this.reportForm.controls['ruleType'].value != 'gateway')
      this.addRulehide = true;
    if (this.itmes.length <= 1 && this.reportForm.controls['ruleType'].value == 'gateway')
      this.addRulehide = true;
    this.paramsSelected = this.itmes.value.map(obj => obj.parameter);
  }

  chooseRecurrence = (e) => {
    this.submitted = false;
    this.reportForm.controls['recurrenceType'].patchValue(e.target.value);
    if (e.target.value === '2') {
      this.reportForm.controls['weekPatternValue'].clearValidators();
      this.reportForm.controls['weekPatternValue'].updateValueAndValidity();
      this.reportForm.controls['weekPatternDay'].clearValidators();
      this.reportForm.controls['weekPatternDay'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternOrder'].clearValidators();
      this.reportForm.controls['monthlyPatternOrder'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternDayOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption2'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption2'].updateValueAndValidity();

      this.reportForm.controls['dailyPattern'].setValidators([Validators.required]);
      this.reportForm.controls['dailyPattern'].updateValueAndValidity();
    } else if (e.target.value === '3') {
      this.reportForm.controls['dailyPattern'].clearValidators();
      this.reportForm.controls['dailyPattern'].updateValueAndValidity();
      this.reportForm.controls['dailyPatternValue'].clearValidators();
      this.reportForm.controls['dailyPatternValue'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternOrder'].clearValidators();
      this.reportForm.controls['monthlyPatternOrder'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternDayOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption2'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption2'].updateValueAndValidity();

      this.reportForm.controls['weekPatternValue'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
      this.reportForm.controls['weekPatternValue'].updateValueAndValidity();
      this.reportForm.controls['weekPatternDay'].setValidators([Validators.required]);
      this.reportForm.controls['weekPatternDay'].updateValueAndValidity();

    } else if (e.target.value === '4') {
      this.reportForm.controls['dailyPattern'].clearValidators();
      this.reportForm.controls['dailyPattern'].updateValueAndValidity();
      this.reportForm.controls['dailyPatternValue'].clearValidators();
      this.reportForm.controls['dailyPatternValue'].updateValueAndValidity();

      this.reportForm.controls['weekPatternValue'].clearValidators();
      this.reportForm.controls['weekPatternValue'].updateValueAndValidity();
      this.reportForm.controls['weekPatternDay'].clearValidators();
      this.reportForm.controls['weekPatternDay'].updateValueAndValidity();

      this.reportForm.controls['monthlyPattern'].setValidators([Validators.required]);
      this.reportForm.controls['monthlyPattern'].updateValueAndValidity();


    } else {

      this.reportForm.controls['dailyPattern'].patchValue('');
      this.reportForm.controls['dailyPatternValue'].patchValue('');

      this.reportForm.controls['weekPatternValue'].patchValue('');
      this.reportForm.controls['weekPatternDay'].patchValue('');

      this.reportForm.controls['monthlyPatternDayOption1'].patchValue('');
      this.reportForm.controls['monthlyPatternMonthOption1'].patchValue('');
      this.reportForm.controls['monthlyPatternOrder'].patchValue('');
      this.reportForm.controls['monthlyPatternDayOption2'].patchValue('');
      this.reportForm.controls['monthlyPatternMonthOption2'].patchValue('');

      this.reportForm.controls['dailyPattern'].clearValidators();
      this.reportForm.controls['dailyPattern'].updateValueAndValidity();
      this.reportForm.controls['dailyPatternValue'].clearValidators();
      this.reportForm.controls['dailyPatternValue'].updateValueAndValidity();

      this.reportForm.controls['weekPatternValue'].clearValidators();
      this.reportForm.controls['weekPatternValue'].updateValueAndValidity();
      this.reportForm.controls['weekPatternDay'].clearValidators();
      this.reportForm.controls['weekPatternDay'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternOrder'].clearValidators();
      this.reportForm.controls['monthlyPatternOrder'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternDayOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption2'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption2'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternDayOption1'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption1'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption1'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption1'].updateValueAndValidity();

    }

  }
  chooseDailyPattern = (type) => {
    if (type === 'eDay') {
      this.reportForm.controls['dailyPattern'].patchValue('eDay');
      this.reportForm.controls['dailyPatternValue'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
      this.reportForm.controls['dailyPatternValue'].updateValueAndValidity();
    } else {
      this.reportForm.controls['dailyPattern'].patchValue('eWeek');
      this.reportForm.controls['dailyPatternValue'].patchValue('');
      this.reportForm.controls['dailyPatternValue'].clearValidators();
      this.reportForm.controls['dailyPatternValue'].updateValueAndValidity();
    }
  }
  chooseWeekDays = (data, i, e) => {
    data.checked = !data.checked;
    this.setSelectedDays();
  }
  setSelectedDays = () => {
    let isItem = [];
    this.allDays.map(item => {
      if (item.checked == true) {
        isItem.push(item.value);
      }
    });
    if (isItem) {
      this.reportForm.controls['weekPatternDay'].patchValue(isItem);
    }
  }
  chooseMonthlyPattern = (type) => {
    this.submitted = false;
    this.reportForm.controls['monthlyPattern'].patchValue(type);
    if (type === 'option1') {
      this.reportForm.controls['monthlyPatternOrder'].clearValidators();
      this.reportForm.controls['monthlyPatternOrder'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternDayOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption2'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption2'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption2'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternDayOption1'].setValidators([Validators.required, Validators.pattern("^[[1-9]||[1-2][0-9]||[1-3][0-1]]$")]);

      this.reportForm.controls['monthlyPatternDayOption1'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternMonthOption1'].setValidators([Validators.required, Validators.pattern("^[1-9][1-2]*$")]);
      this.reportForm.controls['monthlyPatternMonthOption1'].updateValueAndValidity();
    } else {

      this.reportForm.controls['monthlyPatternDayOption1'].clearValidators();
      this.reportForm.controls['monthlyPatternDayOption1'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption1'].clearValidators();
      this.reportForm.controls['monthlyPatternMonthOption1'].updateValueAndValidity();

      this.reportForm.controls['monthlyPatternOrder'].setValidators([Validators.required]);
      this.reportForm.controls['monthlyPatternOrder'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternDayOption2'].setValidators([Validators.required]);
      this.reportForm.controls['monthlyPatternDayOption2'].updateValueAndValidity();
      this.reportForm.controls['monthlyPatternMonthOption2'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$")]);
      this.reportForm.controls['monthlyPatternMonthOption2'].updateValueAndValidity();
    }

  }
  chooseRuleType = (e) => {
    this.queryerror = [false, false, false];
    this.reportForm.controls['ruleType'].patchValue(e.target.value);
    if (e.target.value === 'gateway') {
      this.ruleLists = [
        { name: "Interference", value: "ChannelInterferenceTimeAvg" }
      ]

      if (this.itmes.length >= 1) {
        this.addRulehide = false;
        const v = this.itmes.at(0);
        this.itmes.clear();
        this.itmes.push(v);
        this.reportForm.get('rulesArray').reset();
        ((this.reportForm.get('rulesArray') as FormArray).at(0) as FormGroup).get('parameter').patchValue(this.ruleLists[0].value);
        ((this.reportForm.get('rulesArray') as FormArray).at(0) as FormGroup).get('operator').patchValue(this.ruleConditions[0].value);
      }
    } else {
      this.ruleLists = [
        { name: "Signal Strength (RSSI)", value: "RssiUpstreamAvg" },
        { name: "Dropped Packets", value: "PacketsDroppedDownstream" },
        { name: "Client Airtime Usage", value: "ChannelUtilizationAvg" }
      ]
      if (this.itmes.length == 0) this.addRule();
      if (this.itmes.length <= 2) {
        const v = this.itmes.at(0);
        this.itmes.clear();
        this.itmes.push(v);
        this.reportForm.get('rulesArray').reset();
        ((this.reportForm.get('rulesArray') as FormArray).at(0) as FormGroup).get('parameter').patchValue(this.ruleLists[0].value);
        ((this.reportForm.get('rulesArray') as FormArray).at(0) as FormGroup).get('operator').patchValue(this.ruleConditions[0].value);
        this.addRulehide = true;
      }

    }
  }

  ruleCheck(index) {
    let params = this.itmes.value.map(obj => obj.parameter);
    return params.indexOf(params[index]) != params.lastIndexOf(params[index]);
  }

  namesize() {
    if (this.reportForm.value.name.length < 4)
      return "Please enter value between 4 and 20 characters long"
  }
  addReprt = () => {
    this.issubmit = true;
    this.AddRuleClick = false;
    if (this.reportForm.value.rulesArray.length == 0) {
      this.ruleEmpty = true;
    }
    else this.ruleEmpty = false;
    for (let i = 0; i < this.reportForm.value.rulesArray.length; i++) {
      this.querytxterror(i);
    }

    this.submitted = true;
    if (!this.queryerrorMessage.filter(obj => obj && obj.trim()).length && this.reportForm.valid) {
      var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (this.reportForm.value.ruleType == 'gateway')
        this.attribute = ["subscriber_id", "ChannelInterferenceTimeAvg", "radio"];
      else
        this.attribute = ["RssiUpstreamAvg", "PacketsDroppedDownstream", "ChannelUtilizationAvg", "MACAddress", "Signal", "QualityScore"]
      if (this.reportForm.value.recurrenceType == '2') {
        this.setPattern = {

          "weekday": this.reportForm.value.dailyPattern == 'eDay' ? false : true,
          "timezone": timezone,
          "frequency": parseInt(this.reportForm.value.dailyPatternValue)

        }

      } else if (this.reportForm.value.recurrenceType == '3') {
        this.setPattern = {


          "timezone": timezone,
          "frequency": parseInt(this.reportForm.value.weekPatternValue),
          "day": this.reportForm.value.weekPatternDay
        }

      } else if (this.reportForm.value.recurrenceType == '4') {

        if (this.reportForm.value.monthlyPatternOptions == 'ordinal') {
          this.setPattern =
          {
            "frequency": parseInt(this.reportForm.value.monthlyPatternMonthOption2),
            "ordinal": parseInt(this.reportForm.value.monthlyPatternOrder),
            "dateType": this.reportForm.value.monthlyPatternDayOption2,
            "timezone": timezone,

          }
        }
        else {
          this.setPattern = {
            "frequency": parseInt(this.reportForm.value.monthlyPatternMonthOption1),
            "date": parseInt(this.reportForm.value.monthlyPatternDayOption1),
            "timezone": timezone,

          }
        }
      }

      let data = {
        "_id": "",
        "name": this.reportForm.value.name,
        "type": "SubscriberReport",
        // "orgId": this.orgId,
        "state": "Active",
        "scheduler": {
          "type": parseInt(this.reportForm.value.recurrenceType),
          "pattern": this.reportForm.value.recurrenceType == 1 ? {} : this.setPattern,
        },
        "statistic": {
          // "nextRun": {}
        },
        "taskModel": {
          "queryType": 1,
          "queryLogic": this.reportForm.value.queryLogic,
          "queryRange": parseInt(this.reportForm.value.observationPeriodPastDays),
          "queryRules": this.reportForm.value.rulesArray,
          "reportFormat": parseInt(this.reportForm.value.reportFormat),
          "onlinePercent": parseInt(this.reportForm.value.observationPeriodAtlest),
          "emailRecipients": [
            this.reportForm.value.emailRecipients
          ],
          "reportAttributes": this.attribute
        },

        "description": this.reportForm.value.description
      }




      if (this.recordId) {
        data._id = this.recordId;
      } else {
        delete data._id;
      }

      this.reportService.addReportQuery(data).subscribe(
        (res) => {
          this.router.navigate(['/support/netops-management/reports/call-avoidance-report'], { state: { isRedirect: true } });

        },
        (err) => {
          this.ErrorMsg = err;
          this.error = true;
        }
      );
    }

  }



}
