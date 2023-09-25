import { DateTime } from 'luxon';

import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { DeviceService } from '../../support-device/service/device.service';
import { IssuesService } from './../services/issues.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import { Title } from '@angular/platform-browser';
import { timeStamp } from 'console';
import { THREATS_RENAME } from 'src/app/marketing/shared/constants/marketing.constants';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';

@Component({
  selector: 'app-quality-of-experience',
  templateUrl: './quality-of-experience.component.html',
  styleUrls: ['./quality-of-experience.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QualityOfExperienceComponent implements OnInit, AfterViewInit {
  leftSliderTime: string;
  rightSliderTime: string;
  lastSeventhDay: string = moment().subtract(144, 'hours').format('dddd');
  lastSixthDay: string = moment().subtract(120, 'hours').format('dddd');
  lastfifthDay: string = moment().subtract(96, 'hours').format('dddd');
  lastFourthDay: string = moment().subtract(72, 'hours').format('dddd');
  lastThirdDay: string = moment().subtract(48, 'hours').format('dddd');
  yesterDay: string = moment().subtract(24, 'hours').format('dddd');
  toDay: string = moment().format('dddd');
  timeinterrval1;
  WeekFramedata = []
  softwareVersion: any;
  endTime: any;
  startTime: any;
  date: any;
  timeIntervals1: any[];
  WanShowup: any;
  qoeSubscribed: any;
  // OneTimeClick = true;
  @HostListener("click", ["$event"]) inClick(e) {
    //Slider bar Prev, Next click events
    // if (!this.OneTimeClick) return;
    // this.OneTimeClick = false;
    // setTimeout(() => {
    //   this.OneTimeClick = true;
    // }, 500);

    let id = e.target.id ? e.target.id : '';
    if (id == 'slider-click-next' || id == 'slider-click-prev') {
      e.stopPropagation();
      let clsList = e.target.className ? e.target.className.split(' ')[0] : '';
      let tag = e.target.localName;
      let totalPoints = this.timeIntervals.length - 1;
      if (id == 'slider-click-next') {
        let point = parseInt(clsList.split('-')[1]);
        if ((point + 1) <= totalPoints) {
          this.selectedInterval = point + 1;
        }


      }
      if (id == 'slider-click-prev') {
        let point = parseInt(clsList.split('-')[1]);
        if ((point - 1) >= 0) {
          this.selectedInterval = point - 1;
        }

      }
      // console.log(`${this.selectedInterval} selected from range of 0 to ${totalPoints}`);
      this.handleUserTime();
    }

  }

  pipe = new DatePipe('en-US');
  MODULE: string = 'support';
  clientDates: any;
  language: any;
  languageSubject;
  orgId;
  serialNumberSelected: any;
  deviceInfo: any = [];
  globalObj: any = {};
  modalRef: any;
  mess: boolean = false;
  //@ViewChild('clientEfficencyChart', { static: true }) private clientEfficencyChart: TemplateRef<any>;
  @ViewChild('clientEfficencyChartTest', { static: false }) clientEfficencyChartTest: TemplateRef<any>;
  start: boolean;
  end: boolean;
  probeStatusUpdatedTime: Date;
  startDate: any
  endDate: any
  weekDate: any
  mac: any;
  alertMessage: any;
  isError: boolean = false;
  error: boolean = false;
  loader: boolean = false;
  effLoader: boolean = false;
  showHrs = true;
  scope: any = {
    qoeRead: false,
    topologyRead: false
  };
  showQOE: any;
  showQoeTimeframe: any;
  isDateAreEqual = false;
  appliedTimeFrame: number = 2;
  avgEff: any = {};
  timeIntervals: any[];
  timeForDeviceEfficiency: any;
  summaryData: any = [];
  legendType: any = {
    qoeDash: true,
    qoeSolid: true,
    serviceGood: true,
    serviceFair: true,
    servicePoor: true,
    qoeGood: true,
    qoeFair: true,
    qoePoor: true,
    qoeNoData: true,
    serviceNoData: true,
    contGood: true,
    contFair: true,
    contPoor: true,
    contNoData: true,
    homeData: true,
    clientData: true
  };
  selectedInterval: any;
  timeIntervalOptions: Options = {
    hideLimitLabels: true,
    onlyBindHandles: true,
    stepsArray: [],
  };
  showIntervalSlider = false;
  TimeInterval = 1;

  showTopologyTab = false;
  showQoeTab = false;

  // get isDateAreEqual() {
  //   if (this.start && moment(this.startDate).isSame(this.endDate)) {
  //     return true;
  //   }
  //   return false
  // }
  // set isDateAreEqual(flag: boolean) {

  //   this.isDateAreEqual = flag;
  // }
  // closeErrorMessage() {
  //   this.isDateAreEqual = false;
  // }
  // 'MMMM d, y'



  constructor(private router: Router,
    public dialogService: NgbModal,
    private translateService: TranslateService,
    private dataChartService: DataServiceService,
    public ssoService: SsoAuthService,
    private deviceService: DeviceService,
    private IssuesService: IssuesService,
    private titleService: Title,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
  ) {

    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
    this.qoeCheck();
    this.getScopes();
    this.lastdays15MinOfValues();
  }
  ngAfterViewInit(): void {
    this.Frame = [
      { id: 1, name: this.language['Last 7 days'] },
      { id: 2, name: this.language['Last_hours'] },
      { id: 3, name: this.language['Last 3 hours'] },
      { id: 5, name: this.language['Last 15 minutes'] },
      { id: 6, name: this.language['Any 15 minutes within last day'] },
      { id: 4, name: this.language['Any 3 Hours within last week'] },
    ];
  }
  isDevEnv = false;
  reload() {
    this.lastdays15MinOfValues();
    // if (this.TimeFrame == 4) {
    //   this.dropDownchangeweek()
    // }
    // this.dropDownchangeweek()
    this.loadChart();

  }

  userClickTimeout: any = setTimeout(() => { }, 0);
  handleUserTime() {
    clearTimeout(this.userClickTimeout);
    this.userClickTimeout = setTimeout(() => { this.loadChart(); }, 2000);
  }

  ngOnInit(): void {
    this.weekDate = this.maxDate = new Date();
    this.endDate = moment(this.startDate).add(15, "m").toDate()
    $('.string-slider .ngx-slider-pointer-min').attr('title', 'Realtime QoE');
    let devices = JSON.parse(sessionStorage.getItem('calix.deviceData'));
    this.isDevEnv = this.ssoService.API.includes('dev');
    let deviceInfo: any;
    if (devices?.length > 0) {
      deviceInfo = devices.filter((x) => x.opMode == 'RG');
      if (
        deviceInfo.length || this.ssoService.acceptGSModel(deviceInfo[0]?.modelName || '')
      ) {
        this.softwareVersion = deviceInfo[0].softwareVersion?.substring(0, 4);
        this.serialNumberSelected = deviceInfo[0].serialNumber;
        this.mac = deviceInfo[0].macAddress;
      } else return
    } else return;

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Quality of Experience']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.Frame = [
        { id: 1, name: this.language['Last 7 days'] },
        { id: 2, name: this.language['Last_hours'] },
        { id: 3, name: this.language['Last 3 hours'] },
        { id: 5, name: this.language['Last 15 minutes'] },
        { id: 6, name: this.language['Any 15 minutes within last day'] },
        { id: 4, name: this.language['Any 3 Hours within last week'] },
      ];
      this.loadChart();
      let keys = Object.keys(this.legendType)
      for (let key of keys) {
        this.legendType[key] = true;
      }
    });
    this.titleService.setTitle(`${this.language['Quality of Experience']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.orgId = this.ssoService.getOrgId();
    this.IssuesService.rebootAndUpgradeEvent(this.orgId, this.serialNumberSelected).subscribe(res => {
      this.WanShowup = res;
    })
    // this.softwareVersion = this.deviceInfo.length ? this.deviceInfo[0]?.softwareVersion?.substring(0, 4) : '';
    this.loadChart();

    this.dataChartService.showTopology.subscribe(flag => {
      this.showTopologyTab = flag;
    });
    this.qoeSubscribed = this.dataChartService.showQoe.subscribe(flag => {
      this.showQoeTab = flag;
    });
  }

  ngOnDestroy() {
    if (this.qoeSubscribed) this.qoeSubscribed.unsubscribe();
  }

  clearFilter() {
    this.startDate = '';
    this.endDate = '';
  }

  value3: number = 0;
  options3: Options = {
    disabled: true,
    showTicksValues: false,
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 }
    ]
  };

  // start = new Date();
  // start.setDate(start.getDate() - 6)
  WeekFrame: number = 7;

  TimeFrame: number = 2;


  Frame = [
    { id: 1, name: 'Last 7 days' },
    { id: 2, name: 'Last 24 hours' },
    { id: 3, name: 'Last 3 hours' },
    { id: 5, name: 'Last 15 minutes' },
    { id: 6, name: 'Any 15 minutes within last day' },
    // { id: 4, name: 'Any hours within last week' },
    { id: 4, name: 'Any 3 Hours within last week' }
  ];

  FrameSV = [
    // { id: 1, name: 'Last 7 days' },
    { id: 2, name: 'Last 24 hours' },
    { id: 3, name: 'Last 3 hours' },
    { id: 5, name: ' Last 15 minutes' },
    { id: 6, name: ' Any 15 minutes within last day' },
    // { id: 4, name: ' Any hours within last week' },
  ];

  maxDate = new Date();
  minDate = new Date();
  formDate = new Date(this.minDate.setDate(this.minDate.getDate() - 6))
  stepMinuteVal: number = 0;
  isEndDateDisabled = true;
  isLastDay15minSelected = false;

  minStartTime = new Date();
  maxStartTime = new Date();
  minEndTime = new Date();
  maxEndTime = new Date();

  startTimeUpdate() {
    // if (this.isEndDateDisabled) return
    this.endDate = moment(this.startDate).add(this.stepMinuteVal, "m").toDate()
    this.isEndDateDisabled = this.isLastDay15minSelected;
    this.isDateAreEqual = this.start && moment(this.startDate).isSame(this.endDate)
    // this.isDateAreEqual = moment(this.startDate).isSame(this.endDate)

    if (this.TimeFrame == 4) this.minEndTime = moment(this.startDate).add(60, "m").toDate();
  }
  endTimeUpdate() {
    this.isDateAreEqual = this.start && moment(this.startDate).isSame(this.endDate);
    // if (this.TimeFrame == 4 && !moment(this.weekDate).isSame(Date.now(), 'day')) {

    // }
  }

  onTimeFrameChange(event) {
    this.isEndDateDisabled = true;
    this.isLastDay15minSelected = event == 6;
    if (event == 6) {
      this.start = true;
      // this.endDate = moment(this.startDate).add(this.stepMinuteVal, "m").toDate()
      this.stepMinuteVal = 15;
      var coeff = 1000 * 60 * 15;
      var date = new Date();
      //date.setMinutes(0);  //or use any other date
      this.startDate = this.endDate = new Date(Math.floor(date.getTime() / coeff) * coeff);
      this.startDate = moment(this.endDate).add(-15, "m").toDate();
      this.showHrs = true;
      this.setMinMax(6);
    }
    else if (event == 4) {
      this.startDate = this.endDate = ''
      this.isEndDateDisabled = false;
      this.start = true;
      this.stepMinuteVal = 60;
      var coeff = 1000 * 60 * 5;
      var date = new Date();
      date.setMinutes(0);  //or use any other date
      this.startDate = this.endDate = new Date(Math.round(date.getTime() / coeff) * coeff);
      this.startDate = moment(this.endDate).add(-60, "m").toDate();
      this.setMinMax(4);
      this.showHrs = true;
    }
    else {
      this.start = false;
    }

    //this.loadChart();
  }

  setMinMax(period) {
    let selectedDate = this.weekDate;
    selectedDate.setMinutes(0);
    if (period == 4) {
      let isToday = moment(selectedDate).isSame(Date.now(), 'day');
      var coeff = 1000 * 60 * 5;
      if (isToday) {
        var date = new Date();
        date.setMinutes(0);
        this.startDate = this.endDate = new Date(Math.round(date.getTime() / coeff) * coeff);
        this.startDate = moment(this.endDate).add(-60, "m").toDate();

        let startDateOfDay = moment(selectedDate).startOf('day').toDate();
        this.minStartTime = startDateOfDay; // 12 am of particular date
        this.minEndTime = moment(this.startDate).add(60, "m").toDate(); // 1 hr ahead of start

        this.maxStartTime = this.startDate;
        this.maxEndTime = this.endDate;
      } else {
        let startDate, endDate;
        startDate = moment(selectedDate).startOf('day').toDate();
        endDate = moment(selectedDate).endOf('day').toDate();
        this.minStartTime = startDate; // 12 am of particular date
        this.minEndTime = moment(this.startDate).add(60, "m").toDate(); // 1hr ahead of start  date

        this.maxStartTime = moment(endDate).add(-60, "m").toDate(); // 11pm of particular date
        this.maxEndTime = endDate // 12 am of next day

      }
    } else if (period == 6) {
      let startDateOfDay = moment(new Date()).startOf('day').toDate();
      this.minStartTime = startDateOfDay; // 12 am of particular date
      this.minEndTime = moment(this.startDate).add(15, "m").toDate(); // 15 min ahead of start

      this.maxStartTime = moment(this.endDate).add(-15, "m").toDate();
      this.maxEndTime = this.endDate;
    }
  }

  dayUpdate() {
    this.setMinMax(this.TimeFrame);
  }

  sliderEvent() {

    setTimeout(() => {
      if (this.TimeFrame == 6 || this.TimeFrame == 4) {
        this.showIntervalSlider = true;
      }

      this.loadChart();

    }, 500);
  }
  dropDownchangeweek() {

    var x = this.WeekFrame
    if (x == 1) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;
      var startTime1
      var lastTime1
      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // this.lastSeventhDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 2) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;
      // let startTime1
      // let lastTime1
      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // this.lastSixthDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 3) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(48, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      let currentTimestamp = new Date().setSeconds(0, 0);
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).add(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      // console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(15, 'minutes').format('MMM DD hh:mm A');
      // this.lastfifthDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 4) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(72, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // this.lastFourthDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 5) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(96, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // this.lastThirdDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 6) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(144, "hours");
      startTime1 = new Date(startTime['_d'].setHours(120, 0, 0, 0))
      lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime1);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime1) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(180, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }


      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // this.yesterDay = moment(this.timeIntervals[0].date).format('dddd');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (x == 7) {
      {
        let date = new Date();
        let coeff = 1000 * 60;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;
        let lastTime
        lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(144, 0, 0, 0))
        // lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime1).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 60 : 180;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        let lasttime;
        // this.timeinterrval1 = 180;
        let now = moment();

        while (current <= lastTime) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          // current.add(this.timeinterrval1, 'minutes');
          // if (current['_d'].toString() == now.startOf('day')['_d'].toString()) {
          // if (current['_d'].toString().substring(16, 18) != lastTime['_d'].getHours() / 3) {
          lasttime = Math.floor((lastTime["_d"].getHours() - current['_d'].getHours()) / 3);
          if (lasttime > 0) {


            current.add(180, 'minutes')
          } else {

            current.add(60, 'minutes')
          }


          i++;
        }




        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          var start
          var end

          if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
            start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');

          }
          else {
            start = pointersTime.subtract(60, 'minutes').format('MMM DD hh:mm A');
            end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
          }

          // let start = pointersTime.subtract(180, 'minutes').format('hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.toDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      }
    }
    if (this.TimeFrame == 4) {
      this.showIntervalSlider = false;
    }

    this.sliderEvent();
  }
  dropDownchange() {
    this.lastdays15MinOfValues();
    // if (this.TimeFrame == 4) {
    //   this.dropDownchangeweek();
    // }
    // this.dropDownchangeweek();
    if (this.TimeFrame == 6 || this.TimeFrame == 4) {
      this.showIntervalSlider = false;
    }

    this.sliderEvent();
  }

  loadChart(startTime?, endTime?) {
    this.startTime = startTime;
    this.endTime = endTime;
    let [start, end] = this.timeForFilter(new Date(), new Date());
    this.appliedTimeFrame = this.TimeFrame;

    // if (this.TimeFrame == 4) [start, end] = this.roundOffDate(start, end);
    if (this.TimeFrame == 4) {

      // this.lastdays15MinOfValues();
      // if (current['_d'].toString() == now.startOf('day')['_d'].toString()) {}
      let startTime
      let endTime
      let endTime1
      if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
        endTime1 = this.timeIntervals[this.selectedInterval].date;
        // endTime = moment(endTime1).subtract(15, "minutes")
        endTime = moment(endTime1);
        startTime = moment(endTime1).subtract(180, "minutes");
      } else {
        endTime1 = this.timeIntervals[this.selectedInterval].date;
        //endTime = moment(endTime1).subtract(15, "minutes")
        endTime = moment(endTime1);
        // startTime = moment(endTime1).subtract(60, "minutes");
        startTime = this.timeIntervals[this.selectedInterval - 1].date
      }
      // let endTime = this.timeIntervals[this.selectedInterval].date;
      // let startTime = moment(endTime).subtract(180, "minutes");
      [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];
    }
    if (this.TimeFrame == 6) {
      // const last15End = new Date();

      if (this.startTime) {
        [start, end] = this.timeForFilter((this.startTime), (this.endTime));
        this.timeForDeviceEfficiency = this.endTime;

      }
      else {
        let endTime = this.timeIntervals[this.selectedInterval].date;
        let startTime = moment(endTime).subtract(15, "minutes");
        [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];
        this.timeForDeviceEfficiency = endTime;
      }



    }
    let params
    if (this.TimeFrame == 1) {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        period: this.TimeFrame,
        start: start,
        end: end,
        tz: 0
      };
    } else {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        period: this.TimeFrame,
        start: start,
        end: end,
        tz: -(new Date().getTimezoneOffset() / 60)
      };
    }

    this.loader = true;
    this.IssuesService.getQoeSummary(params).subscribe((res: any) => {
      this.loader = false;
      this.summaryData = res || [];
      if (res.rawData.length && !this.silderDataAvail) {
        this.value3 = res.rawData[res.rawData.length - 1]['qoeScore'];
        this.silderDataAvail = true;
        setTimeout(() => {
          $('.string-slider .ngx-slider-pointer-min').attr('title', 'Realtime QoE');
        }, 10)
      }
      Highcharts.chart('qoeScoreChart', this.qoeChartOption(res || []));
      Highcharts.chart('wanServiceChart', this.wanService(res || []));
      Highcharts.chart('wanContinuityChart', this.wanContinuity(res || [], this.WanShowup));
      Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption(res || []));
      setTimeout(() => {
        this.loader = false;
      }, 4200);
    }, err => {
      this.value3 = 0;
      this.summaryData = [];
      this.loader = false;
      this.silderDataAvail = true;
      setTimeout(() => {
        $('.string-slider .ngx-slider-pointer-min').attr('title', 'Realtime QoE');
      }, 10)
      this.pageErrorHandle(err);
    });
  }

  silderDataAvail = false;
  loadSlider() {

    let [start, end]: any = [new Date(), new Date()];
    end.setMinutes(end.getMinutes() - 1);
    start.setMinutes(start.getMinutes() - 16);
    start = start.toISOString().substr(0, 16) + ':00', end = end.toISOString().substr(0, 16) + ':00';
    let params
    if (this.TimeFrame == 1) {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        period: 5, // last 15 minutes
        start: start,
        end: end,
        tz: 0
      };
    } else {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        period: 5, // last 15 minutes
        start: start,
        end: end,
        tz: -(new Date().getTimezoneOffset() / 60)
      };
    }

    this.loader = true;
    this.IssuesService.getQoeSummary(params).subscribe((res: any) => {
      this.loader = false;
    }, err => {
      this.value3 = 0;
      this.loader = false;
      this.silderDataAvail = true;
      setTimeout(() => {
        $('.string-slider .ngx-slider-pointer-min').attr('title', 'Realtime QoE');
      }, 10)
      this.pageErrorHandle(err);
    });
  }

  timeForFilter(start, end) {
    switch (this.TimeFrame) {
      case 1:

        start.setDate(start.getDate() - 6);
        start.setHours(5, 30, 0, 0);
        // end.setMinutes(end.getMinutes() + 330);
        end.setMinutes(end.getMinutes());
        // return [(start.toISOString().substring(0, 16) + ':00'), (end.toISOString().substring(0, 19))];
        return [(start.toISOString().substring(0, 11) + '00' + ':00' + ':00'), (end.toISOString().substring(0, 19))]
      // break;

      case 2:
        start.setHours(start.getHours() - 24);
        start.setMinutes(start.getMinutes() + 15);
        [start, end] = this.minuteAligner(start, end);

        break;


      case 3:
        start.setHours(start.getHours() - 3);
        [start, end] = this.minuteAligner(start, end);

        break;

      case 4:
        // [start, end] = [this.startDate, this.endDate];
        // this.setMinMax(4);
        // [start, end] = [this.startDate, this.endDate];
        // [start, end] = [this.startDate, this.endDate];
        // start.setDate(this.weekDate.getDate());
        // start.setMonth(this.weekDate.getMonth());
        // start.setFullYear(this.weekDate.getFullYear());
        // end.setDate(this.weekDate.getDate());
        // end.setMonth(this.weekDate.getMonth());
        // end.setFullYear(this.weekDate.getFullYear());
        // [start, end] = this.minuteAligner(start, end);
        //if (start.getDate() > end.getDate()) end.setDate(end.getDate() + 2);

        break;

      case 5:
        start.setMinutes(start.getMinutes() - 16);
        end.setMinutes(end.getMinutes() - 1);

        break;

      case 6:
        // // const currDate = new Date();
        // // [start, end] = [this.startDate, this.endDate];
        // // [start, end] = this.minuteAligner(start, end);
        // // if (start > currDate) start.setDate(start.getDate() - 1);
        // // if (end > currDate && start.getDate() != currDate.getDate()) end.setDate(end.getDate() - 1);
        // // const last15End = new Date();
        // // let endTime = this.timeIntervals[this.selectedInterval].date;
        // // let startTime = moment(endTime).subtract(15, "minutes");
        // // [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];
        // // start.setMinutes(start.getMinutes() - 16);
        // // end.setMinutes(end.getMinutes() - 1);
        // start = this.timeIntervals[this.selectedInterval].date;
        // end = moment(start).subtract(15, "minutes");
        // //  let [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];

        break;

      default:
        break;
    }
    return [(start.toISOString().substring(0, 16) + ':00'), (end.toISOString().substring(0, 16) + ':00')];
    // return [(start.toISOString().substring(0, 16) + ':00'), (end.toISOString().substring(0, 19))];
  }

  minuteAligner(start, end) {
    let [s, e] = [start.getMinutes(), end.getMinutes()];
    const limit = [45, 30, 15, 0];
    for (let i = 0; i < limit.length; i++) {
      //const ind = (i > 0 ? (i - 1) : 0);
      if (!limit.includes(s) && s > limit[i]) {
        start.setMinutes(limit[i]);
        s = limit[i];
      }
      if (!limit.includes(e) && e > limit[i]) {
        end.setMinutes(limit[i]);
        e = limit[i];
      }
    }
    return [start, end]
  }

  averageTimeSetter(start, end, sign = false) {
    const value = ([2, 3, 4].includes(this.TimeFrame) ? (sign ? -15 : 15) : (sign ? -1 : 1));
    this.TimeFrame == 1
      ? start.setHours(start.getHours() - 24)
      : start.setMinutes(start.getMinutes() - value);
    return [(start.toISOString().substr(0, 16) + ':00'), (end.toISOString().substr(0, 16) + ':00')];
  }

  // averageTimeSetterNew(start, end, sign = false) {
  //   const value = ([2, 3, 4 ].includes(this.TimeFrame) ? 1 : 15);
  //   this.TimeFrame == 1
  //     ? start.setHours(start.getHours() - 24)
  //     //: start.setMinutes(start.getMinutes() - value);
  //     : end.setMinutes(end.getMinutes() + value);
  //   return [(start.toISOString().substr(0, 16) + ':00'), (end.toISOString().substr(0, 16) + ':00')];
  // }

  averageTimeSetterNew(start, end, sign = false) {
    let value = ([5, 6].includes(this.TimeFrame) ? 1 : 15);

    if (this.TimeFrame == 1) {
      if (this.clientDates == moment().format('MM/DD/yyyy')) {
        start.setHours(5, 30, 0, 0)
        start.setHours(start.getHours())
        end = new Date()
        end.setMinutes(end.getMinutes() + 330);
        return [(start.toISOString().substring(0, 11) + '00' + ':00' + ':00'), (end.toISOString().substring(0, 19))]
      } else {
        start.setHours(5, 30, 0, 0)
        start.setHours(start.getHours())

        end.setHours(28, 89, 59, 0)
        return [(start.toISOString().substring(0, 11) + '00' + ':00' + ':00'), (end.toISOString().substring(0, 11) + '23' + ':59' + ':59')]
      }
      // start.setHours(5, 30, 0, 0)
      // start.setHours(start.getHours())
      // end.setHours(28, 89, 59, 0)

      // end.getHours(end.getHours() + 24)
      // end.setMinutes(start.setMinutes() + 1440);//1 hr =>60 in +5.30 add
      // return [(start.toISOString().substring(0, 11) + '00' + ':00' + ':00'), (end.toISOString().substring(0, 19))]
    }
    else {
      end.setMinutes(end.getMinutes() + value);
    }
    // return [(start.toISOString().substr(0, 16) + ':00'), (end.toISOString().substr(0, 19))];
    return [(start.toISOString().substr(0, 16) + ':00'), (end.toISOString().substr(0, 16) + ':00')];
  }

  roundOffDate(start, end) {
    if (start && end && start > end) {
      let endSplit = end.split('T');
      let endDate = endSplit[0].split('-');
      endDate[2] = (endDate[2] < 9 ? '0' : '') + (parseInt(endDate[2]) + 1);
      end = endDate.join('-') + 'T' + endSplit[1];
      return this.roundOffDate(start, end);
    } else {
      return [start, end];
    }
  }
  time: string = '';
  clickToGet15Mins(qoeScore) {

    if (this.TimeFrame == 2 || this.TimeFrame == 3) {
      this.TimeFrame = 6;
      let arr = qoeScore.category.split(':');
      let hour = parseInt(arr[0]);
      let min = parseInt(arr[1]);

      this.time = arr[1].split(/\s/)[1];

      if ((this.time == "PM" && hour !== 12) || (hour === 12 && this.time == "AM")) {
        hour += 12;
      }
      this.date = new Date();
      this.date.setHours(hour);
      this.date.setMinutes(min);
      this.date.setSeconds(0, 0);

      if (this.date > new Date()) {
        this.date.setDate(this.date.getDate() - 1);
      }
      let endTime = this.date;
      let startTime = moment(endTime).subtract(15, "minutes");

      let date = new Date();
      let date1 = this.date;
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime1 = moment(lastTime).subtract(24, "hours");
      let currentTimestamp = new Date().setSeconds(0, 0);

      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime1).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime1 = moment(startTime1).add(minToRoundOf24hr, 'minutes');

      this.timeIntervals1 = [];
      this.timeIntervals = [];
      let current = moment(startTime1);

      let i = 0;
      let lastTime1 = moment(new Date(Math.floor(date1.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      while (current <= lastTime1) {
        this.timeIntervals1.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(15, 'minutes');
        i++;
      }
      current = moment(startTime1);
      i = 0
      while (current <= lastTime) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(15, 'minutes');
        i++;
      }
      len = this.timeIntervals1.length;
      let len1 = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals1[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A ');

        let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A ');

        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len1 - 1].date).format('MMM DD hh:mm A');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
      this.loadChart(startTime, endTime);
    }
    if (this.TimeFrame == 1) {
      this.TimeFrame = 4;
      let switchWeekFrame;
      let arr = qoeScore.category.split('/');
      let month = arr[0];
      let day = arr[1];
      let year = arr[2];
      let dateData = year + month + day;
      switchWeekFrame = this.summaryData.rawData?.findIndex(obj => obj.date == dateData) + 1;
      this.WeekFrame = switchWeekFrame;

      if (this.TimeFrame == 4) {
        var i = this.WeekFrame;
        if (i == 1) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;
          var startTime1
          var lastTime1
          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }



          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.lastSeventhDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 2) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;
          // let startTime1
          // let lastTime1
          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }

          //including current time
          // let currentEnd = moment(date).seconds(0).milliseconds(0);
          // console.log(currentEnd);
          // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
          //   console.log('Not same');
          //   this.timeIntervals.push({
          //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
          //     date: moment(currentEnd).toDate()
          //   });
          // }


          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.lastSixthDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 3) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;

          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(48, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          let currentTimestamp = new Date().setSeconds(0, 0);
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }

          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.lastfifthDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 4) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;

          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(72, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }

          //including current time
          // let currentEnd = moment(date).seconds(0).milliseconds(0);
          // console.log(currentEnd);
          // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
          //   console.log('Not same');
          //   this.timeIntervals.push({
          //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
          //     date: moment(currentEnd).toDate()
          //   });
          // }


          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.lastFourthDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 5) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;

          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(96, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }

          //including current time
          // let currentEnd = moment(date).seconds(0).milliseconds(0);
          // console.log(currentEnd);
          // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
          //   console.log('Not same');
          //   this.timeIntervals.push({
          //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
          //     date: moment(currentEnd).toDate()
          //   });
          // }


          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.lastThirdDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 6) {
          let date = new Date();
          let coeff = 1000 * 60 * 15;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;

          let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(120, 0, 0, 0))
          lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          while (current <= lastTime1) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);
            current.add(180, 'minutes');
            i++;
          }


          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.yesterDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        } else if (i == 7) {
          {
            let date = new Date();
            let coeff = 1000 * 60;
            let timeDuration = -24 * 60;
            let lastUpdatedTime;
            let that = this;
            let len = 0;
            let lastTime
            lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
            let startTime = moment(lastTime).subtract(144, "hours");
            startTime1 = new Date(startTime['_d'].setHours(144, 0, 0, 0))
            // lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

            let currentTimestamp = new Date().setSeconds(0, 0);
            // console.log('current = ' + new Date(currentTimestamp));
            // console.log('start = ' + new Date(moment(startTime).toDate()));
            // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            //   / (1000 * 60 * 60));
            const minToRoundOf24hr = Math.ceil(
              (currentTimestamp - new Date(moment(startTime1).toDate()).getTime())
              / (1000 * 60 * 60)
            ) > 24 ? 60 : 180;
            startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

            this.timeIntervals = [];
            let current = moment(startTime1);
            // console.log(this.timeIntervals);
            let i = 0;
            let lasttime;
            // this.timeinterrval1 = 180;
            let now = moment();

            while (current <= lastTime) {
              this.timeIntervals.push({
                value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
                date: moment(current).toDate()
              });
              lastUpdatedTime = moment(current);


              lasttime = Math.floor((lastTime["_d"].getHours() - current['_d'].getHours()) / 3);
              if (lasttime > 0) {


                current.add(180, 'minutes')
              } else {
                const minToRoundOf24hr = Math.ceil(lastTime["_d"].getHours() - current['_d'].getHours()) == 2 ? 120 : 60
                current.add(minToRoundOf24hr, 'minutes')
              }


              i++;
            }




            len = this.timeIntervals.length;
            this.selectedInterval = this.timeIntervals[len - 1].value;
            this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

            const translate = (value: number, label: LabelType): string => {
              let pointersTime = moment(that.timeIntervals[value]['date']);
              var start
              var end

              if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
                start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
                end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');

              }
              else {
                // start = pointersTime.subtract(minToRoundOf24hr, 'minutes').format('MMM DD hh:mm A');
                start = moment(this.timeIntervals[len - 2].date).format('MMM DD hh:mm A')
                end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
              }

              // let start = pointersTime.subtract(180, 'minutes').format('hh:mm A');
              // let end = moment(that.timeIntervals[value]['date']).format('hh:mm A');
              return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
            };
            this.timeIntervalOptions.translate = translate;
            //console.log(this.timeIntervals);

            this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
            this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
            // this.toDay = moment(this.timeIntervals[0].date).format('dddd');
            setTimeout(() => {
              this.showIntervalSlider = true;
              setTimeout(() => {
                $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
              }, 10);
            }, 1000)
          }
        }

        this.loadChart(moment(this.time).subtract(180, 'minutes'), moment(this.time));
        setTimeout(() => {
          this.WeekFramedata = [
            { id: 1, name: this.language[this.lastSeventhDay] },
            { id: 2, name: this.language[this.lastSixthDay] },
            { id: 3, name: this.language[this.lastfifthDay] },
            { id: 4, name: this.language[this.lastFourthDay] },
            { id: 5, name: this.language[this.lastThirdDay] },
            { id: 6, name: this.language[this.yesterDay] },
            { id: 7, name: this.language[this.toDay] }
          ]
        }, 2000);
      }

    }

    let currTime = qoeScore.category.split(' ');
    let currTime1 = moment(new Date()).format('MM/DD/YY');
    let coeff = 1000 * 60 * 15;
    const currentRoundOfTime = moment(new Date(Math.floor(new Date().getTime() / coeff) * coeff)).seconds(0).milliseconds(0).startOf('hour');
    const selectedTime = moment(qoeScore.category);
    if (moment.duration(currentRoundOfTime.diff(selectedTime)).asHours() <= 24) {
      if (this.TimeFrame == 4) {
        this.TimeFrame = 6;
        let arr1 = qoeScore.category.split(' ');
        let arr = arr1[1].split(':')
        // console.log("arr",qoeScore)
        let hour = parseInt(arr[0]);
        let min = parseInt(arr[1]);
        // this.time = arr[1].split(/\s/)[1];
        this.time = arr1[2];

        if ((this.time == "PM" && hour !== 12) || (hour === 12 && this.time == "AM")) {
          hour += 12;
        }
        this.date = new Date();
        this.date.setHours(hour);
        this.date.setMinutes(min);
        this.date.setSeconds(0, 0);

        if (this.date > new Date()) {
          this.date.setDate(this.date.getDate() - 1);
        }
        let endTime = this.date;
        let startTime = moment(endTime).subtract(15, "minutes");

        let date = new Date();
        let date1 = this.date;
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime1 = moment(lastTime).subtract(24, "hours");
        let currentTimestamp = new Date().setSeconds(0, 0);

        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime1).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(minToRoundOf24hr, 'minutes');

        this.timeIntervals1 = [];
        this.timeIntervals = [];
        let current = moment(startTime1);

        let i = 0;
        let lastTime1 = moment(new Date(Math.floor(date1.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        this.showIntervalSlider = false;
        while (current <= lastTime1) {
          this.timeIntervals1.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(15, 'minutes');
          i++;
        }
        current = moment(startTime1);
        i = 0
        while (current <= lastTime) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(15, 'minutes');
          i++;
        }
        len = this.timeIntervals1.length;
        let len1 = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals1[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A ');

          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A ');

          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        this.cdRef.detectChanges();

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len1 - 1].date).format('MMM DD hh:mm A');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
        this.loadChart(startTime, endTime);
      }
    }
  }

  qoeChartOption(chartData): any {
    let thisComponent = this;
    const qoeCodeMapping = {
      QOE_HELP_0001: "Detected WAN down event",
      QOE_HELP_0002: "Detected WAN down event(s)",
      QOE_HELP_0003: "Observed speed test lower than configured rates",
      QOE_HELP_0004: "Observed Low Client(s) Efficiency",
      QOE_HELP_0005: "Observed Poor Client(s) Efficiency",
      QOE_HELP_0006: "Observed latency lower than 50ms"
    }
    let xAxisValue = [], data = [], xZone = [], posVal = 0;
    let pointColor;
    const markerColor = ['#C70000', '#C70000', 'rgba(252, 114, 53)', '#82BF00', '#82BF00']
    // const DUevel = (testType.includes('Download') || testType.includes('Débit de téléchargement')) ? 'dsLevel' : 'usLevel';
    let tooltip;
    const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
    let frame = this.TimeFrame;
    data = (chartData[mapKey] || [])
      .filter(obj => {
        if (obj.qoeScore) {
          pointColor = obj.qoeScore >= 1 ? '#0A77FB' : 'gray';
          const date = obj.date;
          // let y = date.substr(0, 4), m = date.substr(4, 2), d = date.substr(6, 2);
          let y = date.substring(0, 4), m = date.substring(6, 4), d = date.substring(6,);

          let dateWithSlash = m + '/' + d + '/' + y;
          let year = date.substring(2, 4)
          let dateWithSlashyear = m + '/' + d + '/' + year;
          const time = obj.time;
          // const dt = moment((time.substr(0, 2) + ':' + time.substr(2, 4)), ["HH:mm"]).format("hh:mm A");
          // const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
          // let fullDate = dt;
          let fullDateTime;
          let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
          if (this.TimeFrame == 1) { //daily data
            fullDate = dateWithSlash
          } else if (this.TimeFrame == 4) {
            fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
            fullDate = fullDateTime;
          } else if (this.TimeFrame == 6) {
            let dt: any = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
            dt = dt.split(/\s/);
            if (time.toString().slice(0, 2) > 12) {
              this.time = 'PM'
            }
            if (time.toString().slice(0, 2) <= 12) {
              this.time = 'AM'
            }
            dt[1] = this.time
            fullDate = dt.join(" ");
          }
          else {
            let dt: any = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
            fullDate = dt;

          }

          // let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
          xAxisValue.push(fullDate);
          return obj
        }
      }).map((obj, i) => {
        if (obj.qoeScore) {
          posVal = obj.qoeScore > 0 ? obj.qoeScore : posVal;
          const score = obj.qoeScore > 0 ? obj.qoeScore : (posVal > 0 ? -(posVal) : obj.qoeScore);
          xZone.push({
            value: i,
            dashStyle: score >= 1 ? 'solid' : 'dash',
            color: score >= 1 ? '#0A77FB' : 'gray',
          });
          return {
            y: typeof score == 'string' ? score.substring(0, 1) : Math.abs(score),
            color: score >= 1 ? markerColor[(score - 1)] : 'gray',
            qoeCode: obj?.qoeHelpingCode || []
            //color: score >= 1 ? '#0A77FB' : 'gray',
          }
        }
      });

    let qoeLabels: any = ["Low", "Med", "High"];
    const self = this;

    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: xAxisValue,

        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
          }
        },


        overflow: false,
        /* startOnTick: true,
        tickmarkPlacement: 'on', */
        //padding: '50px',
        /* labels: {
          //padding: '50px'
          //align: 'left',
          //reserveSpace: true
          //overflow: 'allow'
        }, */
        /* labels: {
          staggerLines: 2
        }, */
        tickInterval: (function () {
          let sLength = data.length ? data.length : 0;
          let f = 1;
          if (frame === 2) {
            if (sLength > 90) {
              f = 4;
            } else if (sLength > 70) {
              f = 3;
            } else if (sLength > 30) {
              f = 2;
            }
          }

          return f;
        })(),
      },
      tooltip: {
        //pointFormat: ,
        formatter: function () {
          var result = `${self.language.score_table} : <b>${this.point.y}</b>`;
          result += (this.point?.qoeCode || []).map(obj => `<br>${self.language[obj] ? self.language[obj] : obj}`).join('');
          return result;
        }
      },
      yAxis: {
        min: 1,
        max: 5,
        tickInterval: 1,
        title: {
          text: this.language['QoE Score'],
          style: {
            fontSize: '15px'
          },
          margin: 40
        },
        lineColor: '#ddd',
      },


      plotOptions: {
        series: {
          cursor: (this.TimeFrame != 5 && this.TimeFrame != 6) ? 'pointer' : 'context-menu',
          point: {
            events: {
              click: function () {
                thisComponent.clickToGet15Mins(this);
                //thisComponent.modalRef = thisComponent.dialogService.open(thisComponent.showProbeStatusModal);
              }
            }
          }
        }
      },



      /* yAxis: [{
        title: {
          text: y1title,
          style: {
            fontSize: '15px'
          }
        },
        padding: '50px',
        gridLineWidth: 2,
        tickAmount: 6,
        labels: {
          formatter: function (element) {
            let val = ['', self.language['1'], self.language['2'], self.language['3'], self.language['4'], self.language['5']];
            if (element?.axis?.tickPositions?.length > 0) {
              let index = element.axis.tickPositions.indexOf(this.pos);
              for (let i = 0; i < data?.length; i++) {
                if (data[i].level == 1) {
                  data[i].y = element.axis?.tickPositions[1];
                } else if (data[i].level == 2) {
                  data[i].y = element.axis?.tickPositions[2];
                } else if (data[i].level == 3) {
                  data[i].y = element.axis?.tickPositions[3];
                } else if (data[i].level == 4) {
                  data[i].y = element.axis?.tickPositions[4];
                } else if (data[i].level == 5) {
                  data[i].y = element.axis?.tickPositions[5];
                }
              }
              if (index != -1) {
                return val[index];
              }
            }
          }
        }
      }, {
        opposite: true,
        tickAmount: 4,
        padding: '50px',
        title: {
          text: y2title
        },
      }], */



      series: [{
        type: 'line',
        min: 1,
        max: 5,
        data: data,
        marker: {
          //// symbol: 'line',
          // width: 3,
          radius: 4   //(data.length == 1 ? 4 : 0),
        },
        zoneAxis: 'x',
        zones: xZone,
        color: '#0A77FB',
      }],
    }
  }

  wanService(chartData): any {
    let xAxisValue = [], y1title = '', y2title = '', y2AxisValue = [],
      color = { 0: '#C70000', 1: '#C70000', 2: 'rgba(252, 114, 53)', 3: '#82BF00' }, data = [], data1 = [];
    //  color = { 0: '#C70000', 1: '#C70000', 2: 'gary', 3: 'gray' },

    // const DUevel = testType.includes('Service') ? 'dsLevel' : 'usLevel';
    let tooltip;
    const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
    let frame = this.TimeFrame;
    (chartData[mapKey] || []).filter(obj =>
      obj?.wanService == "GOOD" || obj?.wanService == "OK" || obj?.wanService == "BAD" || obj?.wanService == "BAD(GREY)").map((obj, i) => {
        let grey = obj.wanService.toUpperCase().includes('GREY');
        const wanService = (obj.wanService.toUpperCase().includes("BAD")) ? 1 : (obj.wanService.toUpperCase().includes("OK") ? 2 : 3)
        const level = wanService;
        //const DUVAlue = testType.includes('Service') ? 'ds' : 'us';
        tooltip = `<tr><th>Value:</th><td style="padding-left: 3px;"></td></tr>`
        const date = obj.date;
        let y = date.substring(0, 4), m = date.substring(6, 4), d = date.substring(6,);
        let dateWithSlash = m + '/' + d + '/' + y;
        let year = date.substring(2, 4)
        let dateWithSlashyear = m + '/' + d + '/' + year;
        const time = obj.time;
        let fullDateTime;
        let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
        if (this.TimeFrame == 1) { //daily data
          fullDate = dateWithSlash
        } else if (this.TimeFrame == 4) {
          fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
          fullDate = fullDateTime;

        } else if (this.TimeFrame == 6) {
          let dt: any = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
          dt = dt.split(/\s/);
          if (time.toString().slice(0, 2) > 12) {
            this.time = 'PM'
          }
          if (time.toString().slice(0, 2) <= 12) {
            this.time = 'AM'
          }
          dt[1] = this.time
          fullDate = dt.join(" ");
        }
        else {
          const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
          fullDate = dt;
        }
        xAxisValue.push(fullDate);
        data.push({
          x: i,
          y: (level ? 4 : null),
          color: (grey ? 'grey' : color[level]),
          level: level,
          wanServiceCode: (obj?.wanserviceHelpingCode || [])
        });
        /*  data.push({ x: i, y: (level ? 4 : null), color: (grey ? 'grey' : color[level]), level: level }); */
      });

    // if (data.length > 0) {
    //   y1title = y1Title
    // } else {
    //   y1title = 'WAN Service';
    // }
    y1title = this.language.Health
    let that = this;
    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: '',
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            }
          }
        }
      },
      xAxis: {
        categories: xAxisValue,
        padding: '50px',
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
          }
        },
        overflow: false,
        tickInterval: (function () {
          let sLength = data.length ? data.length : 0;
          let f = 1;
          if (frame === 2) {
            if (sLength > 90) {
              f = 4;
            } else if (sLength > 70) {
              f = 3;
            } else if (sLength > 30) {
              f = 2;
            }
          }

          return f;
        })(),
      },
      tooltip: {
        formatter: function () {
          var result = (this.point?.wanServiceCode || []).map(obj => `${that.language[obj] ? that.language[obj] : obj}<br>`).join('');
          return result ? result : false;
        }
      },
      /* tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: tooltip,
        footerFormat: '</table>',
      }, */
      yAxis: [{

        title: {
          text: y1title,
          margin: 40,
          style: {
            fontSize: '15px'
          }
        },
        padding: '5px',
        gridLineWidth: 1,
        tickAmount: 4,
        labels: {
          formatter: function (element) {
            let val = ['', 'Poor', 'Fair', 'Good'];
            if (element?.axis?.tickPositions?.length > 0) {
              let index = element.axis.tickPositions.indexOf(this.pos);
              for (let i = 0; i < data?.length; i++) {
                if (data[i].level == 1) {
                  data[i].y = element.axis?.tickPositions[1];
                } else if (data[i].level == 2) {
                  data[i].y = element.axis?.tickPositions[2];
                } else if (data[i].level == 3) {
                  data[i].y = element.axis?.tickPositions[3];
                }
              }
              if (index != -1) {
                return '';  //val[index];
              }
            }
          },
        }
      },

      {
        opposite: true,
        tickAmount: 4,
        padding: '5px',
        title: {
          text: y2title,
        },
        labels: {
          format: '{value} Mbps',
        },
      }],
      series: [{
        type: 'scatter',
        data: data,
        name: '',
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 8
        },
        color: 'black',
      },
      {
        name: '',
        data: data1,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 8
        },
        color: 'black',
        states: {
          hover: {
            enabled: false
          }
        },
        yAxis: 1,
      }],
    }
  }

  wanContinuity(chartData, wanshow?): any {
    let xAxisValue = [], y1title = '', y2title = '', y2AxisValue = [], color = { 0: '#C70000', 1: '#C70000', 2: '#82BF00', 3: '#82BF00' }, data = [], data1 = [];
    // const DUevel = testType.includes('Service') ? 'dsLevel' : 'usLevel';
    let tooltip;
    const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData', self = this;
    let frame = this.TimeFrame;
    (chartData[mapKey] || []).filter(obj => obj.wanContinuity).map((obj, i) => {
      let grey = obj.wanContinuity.toUpperCase().includes('GREY');
      const wanContinuity = obj.wanContinuity.toUpperCase().includes("GOOD") ? 2 : 1
      let level = wanContinuity;
      let dl_crttime = new Date(obj.dl_created * 1000);
      //tooltip = `<tr><th>Value:</th><td style="padding-left: 3px;"></td></tr>`
      const date = obj.date;
      let y = date.substr(0, 4), m = date.substr(4, 2), d = date.substr(6, 2);
      let dateWithSlash = m + '/' + d + '/' + y;
      let year = date.substring(2, 4)
      let dateWithSlashyear = m + '/' + d + '/' + year;
      const time = obj.time;
      let fullDateTime;
      let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
      if (this.TimeFrame == 1) { //daily data
        fullDate = dateWithSlash
      } else if (this.TimeFrame == 4) {
        fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
        fullDate = fullDateTime;
      }
      else if (this.TimeFrame == 6) {
        let dt: any = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
        dt = dt.split(/\s/);
        if (time.toString().slice(0, 2) > 12) {
          this.time = 'PM'
        }
        if (time.toString().slice(0, 2) <= 12) {
          this.time = 'AM'
        }
        dt[1] = this.time
        fullDate = dt.join(" ");
      }
      else {
        const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
        fullDate = dt;
      }
      xAxisValue.push(fullDate);
      data.push({
        x: i,
        y: (level ? 4 : null),
        color: (grey ? 'grey' : color[level]),
        level: level,
        marker: {
          lineColor: 'blue', lineWidth: (this.downfallCalc(wanshow, chartData, i).length ? 3 : 0)
        }
      });

    });

    // if (data.length > 0) {
    //   y1title = y1Title
    // } else {
    //   y1title = 'WAN Service';
    // }
    y1title = this.language.Status
    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: '',
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            }

          }
        }
      },
      xAxis: {
        categories: xAxisValue,
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
          }
        },
        overflow: false,
        padding: '50px',
        tickInterval: (function () {
          let sLength = data.length ? data.length : 0;
          let f = 1;
          if (frame === 2) {
            if (sLength > 90) {
              f = 4;
            } else if (sLength > 70) {
              f = 3;
            } else if (sLength > 30) {
              f = 2;
            }
          }

          return f;
        })(),
      },
      tooltip: {

        formatter: function () {
          return self.downfallCalc(wanshow, chartData, this.point?.x).join('<br>') || false;
        },
      },
      /* tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: tooltip,
        footerFormat: '</table>',
      }, */
      yAxis: [{

        title: {
          text: y1title,
          margin: 40,
          style: {
            fontSize: '15px'
          }
        },
        padding: '5px',
        gridLineWidth: 1,
        tickAmount: 3,
        labels: {

          formatter: function (element) {
            let val = ['', 'Poor', 'Fair', 'Good'];
            if (element?.axis?.tickPositions?.length > 0) {
              let index = element.axis.tickPositions.indexOf(this.pos);
              for (let i = 0; i < data?.length; i++) {
                if (data[i].level == 1) {
                  data[i].y = element.axis?.tickPositions[1];
                }
                else if (data[i].level == 2) {
                  data[i].y = element.axis?.tickPositions[2];
                }
              }
              if (index != -1) {
                return '';  //val[index];
              }
            }
          },
        }
      },

      {
        opposite: true,
        tickAmount: 4,
        padding: '50px',
        title: {
          text: y2title,
        },
        labels: {
          format: '{value} Mbps',
        },
      }],
      series: [{
        type: 'scatter',
        data: data,
        name: '',
        pointWidth: 1000,
        pointPadding: 0,
        marker: {
          enabled: true,
          symbol: 'circle',
          shadow: false,
          radius: 8,
          states: {
            hover: {
              enabled: false,
            }
          }
        },
        color: 'black',
      },
      {
        name: '',
        data: data1,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 8
        },
        color: 'black',
        states: {
          hover: {
            color: '#a4edba',
            borderColor: 'gray'
          }
        },
        yAxis: 1,
      }],
    }
  }
  convertDate(date) {
    var momentDate = moment(date).format(' DD/MM/YYYY, hh:mm A');
    return momentDate;
  }

  downfallCalc(wanshow, chartData, i) {
    let self = this;
    let width = [];
    if (wanshow?.length > 0 && this.TimeFrame != 1) {
      let dl_indx = i;
      let dataa1 = chartData.rawData[dl_indx].date;
      let y = dataa1.slice(0, 4), m = dataa1.slice(4, 6), d = dataa1.slice(6, 8);
      let orgDate = m + "/" + d + "/" + y;
      let dataa2 = chartData.rawData[dl_indx].time;
      let hrs = dataa2.slice(0, 2), min = dataa2.slice(2, 4);
      let orgTime = hrs + ':' + min;
      let datas = orgDate + " " + orgTime;
      let orginal = new Date(datas);
      orginal.setSeconds(59);
      orginal.setMilliseconds(0);
      let orginal15min = new Date(orginal);
      orginal15min.setSeconds(0);
      if (![5, 6].includes(this.TimeFrame)) orginal15min.setMinutes(orginal15min.getMinutes() - 14);
      wanshow.forEach((timedata) => {
        let wanTime = new Date(timedata.timestamp);
        let occuredTime = wanTime.toISOString();
        let occuredorgTime = this.convertDate(occuredTime);
        wanTime.setSeconds(0);
        wanTime.setMilliseconds(0);
        if (orginal15min.getTime() <= wanTime.getTime() && wanTime.getTime() <= orginal.getTime()) {
          if (timedata.type.slice(0, 2) == "SW") {
            timedata.type = 'Software' + timedata.type.slice(2)
          }
          width.push(`<b>${occuredorgTime} : </b> ${self.language[timedata.type]}`);
          return;
        }
      })
    }
    return width;
  }


  wholeHomeEfficiencyOption(data): any {
    let that = this;
    let xZone = [], posVal = 0;
    let tooltipvalue = '';
    const markerColor = ['#C70000', '#C70000', 'rgba(252, 114, 53)', '#82BF00', '#82BF00']
    let thisComponent = this;
    // let [categories, homeefficiency] = this.mapWholeHomeEfficencyChartData(data);
    // // let average = data?.avgHomeScore ? data?.avgHomeScore : 0;
    let frame = this.TimeFrame;
    let categories = [], download = [], upload = [], homeefficiency = [];
    let tooltip;
    const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
    homeefficiency = (data[mapKey] || [])
      .map((obj, i) => {
        const date = obj.date;

        posVal = obj.homeScore > 0 ? obj.homeScore : posVal;
        const homescore = obj.homeScore > 0 ? obj.homeScore : (posVal > 0 ? -(posVal) : obj.homeScore);
        // console.log("posVal", posVal);
        // console.log("homescore", homescore);

        tooltipvalue = obj.homeScore > 0 ? ` ${this.language['Efficiency Score']} : <b>{point.y}%</b>` : ` ${this.language['Efficiency Score']} : <b>{point.y}%</b><br>No client activity for Efficiency score`;
        // tooltipvalue = obj.homeScore > 0 ? 'gretaer 0' : 'lesser';
        //console.log("homescore",homescore)
        // if(homescore < 0){
        //   tooltipvalue = ` ${this.language['Efficiency Score']} : <b>{point.y}%</b><br>No client activity for Efficiency score`;
        // }
        // else if(homescore > 0) {tooltipvalue = ` ${this.language['Efficiency Score']} : <b>{point.y}%</b>`;}

        xZone.push({
          value: i,
          dashStyle: obj.homeScore > 0 ? 'solid' : 'dash',
          color: obj.homeScore > 0 ? '#0a77fb' : 'gray',
        });
        let y = date.substring(0, 4), m = date.substring(6, 4), d = date.substring(6,);
        let dateWithSlash = m + '/' + d + '/' + y;
        const time = obj?.time;

        let year = date.substring(2, 4)
        let dateWithSlashyear = m + '/' + d + '/' + year;
        let fullTime = this.TimeFrame == 1 ? dateWithSlash : (moment((time?.substring(0, 2) + ':' + time?.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
        // const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
        // categories.push(dt);
        let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
        // let fullDateTime = (dateWithSlash + ' ' + (time.substring(0, 2) + ':' + time.substring(2, 4)));
        let fullDateTime;
        if (this.TimeFrame == 1) { //daily data
          fullDate = dateWithSlash
          categories.push(fullDate);
        } else if (this.TimeFrame == 4) {
          fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
          categories.push(fullDateTime);
        }
        else {
          const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
          fullDateTime = (dateWithSlash + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
          fullDate = dt;
          categories.push(dt);
        }
        // if (obj.homeScore > 0) {
        return {
          y: typeof obj.homeScore == 'string' ? parseFloat(homescore.substring(0, 5)) : Math.abs(homescore),
          color: homescore > 0 ? '#0a77fb' : 'gray',
          WHECode: parseFloat(obj?.homeScore) || 0,
          qtime: fullTime,
          pointDate: fullDate,
          pointDateTime: fullDateTime
          //pointFormat: obj.homeScore > 0 ? ` ${this.language['Efficiency Score']} : <b>{point.y}%</b>` : ` ${this.language['Efficiency Score']} : <b>{point.y}%</b><br>No client activity for Efficiency score`
          //pointFormat: obj.homeScore > 0 ? 'value is grater than 0' : 'value is 0'
        }
        // color: homescore  > 0 ? markerColor[(homescore - 1)] : 'gray',
        // }
        // } else {
        //   return { y: null, pointDate: fullDate, pointDateTime: fullDateTime };
        // }
      });
    // console.log("xZone", xZone);

    // data = (homeefficiency || [])
    // .map((obj) => {
    //   if (obj.homeScore) {
    //     posVal = obj.homeScore > 0 ? obj.homeScore : posVal;
    //     const homescore = obj.homeScore > 0 ? obj.homeScore : (posVal > 0 ? -(posVal) : obj.homeScore);
    //     xZone.push({
    //       // value: i,
    //       dashStyle: obj.homeScore > 0 ? 'solid' : 'dash',
    //       color: obj.homeScore > 0 ? '#0a77fb' : 'gray',
    //     });
    //     return {
    //       y: typeof homescore == 'string' ? homescore.substring(0, 1) : Math.abs(homescore),
    //       color: homescore >= 1 ? markerColor[(homescore - 1)] : 'gray',
    //       qoeCode: obj?.qoeHelpingCode || []
    //       //color: score >= 1 ? '#0A77FB' : 'gray',
    //     }
    //   }
    // });
    let lefficencyScore = this.language.Efficiency_Score
    return {
      title: {
        text: this.language['Click on the sample to view client efficiency of the selected point.'],
        style: {
          fontSize: '14px',
        },
        align: 'left'
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        //marginTop: 60
      },

      tooltip: {
        //   // headerFormat: '',
        // pointFormat: `${this.language['Efficiency Score']} : <b>{point.y}%</b>`
        //pointFormat: tooltipvalue
        formatter: function () {
          var result = '<span class="f-s-10px">' + this.point.qtime + '</span><br>' + lefficencyScore + ' : <b>' + (this.point.y == 0 ? this.point.y : this.point.y.toFixed(2)) + '%</b>';
          //var result = 'value came';
          if (this.point.WHECode == 0) {
            result += `</br> ${that.language['No client activity for Efficiency score']}`;
          }
          return result;
        }

      },

      xAxis: {
        categories: (categories || []),
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
          }
        },
        overflow: false,
        tickInterval: (function () {
          let sLength = categories.length ? categories.length : 0;
          let f = 1;
          if (frame === 2) {
            if (sLength > 90) {
              f = 4;
            } else if (sLength > 70) {
              f = 3;
            } else if (sLength > 30) {
              f = 2;
            }
          }


          return f;
        })(),


      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        lineColor: '#ddd',
        title: {
          text: this.language.Efficiency_Score + ' (%)',
          style: {
            fontSize: '15px'
          }
        },
        //  plotLines: [{
        //   color: '#5ACFEA',
        //   value: average, // Insert your average here
        //   width: '2',
        //   zIndex: 4, // To not get stuck below the regular plot lines or series
        //   label: {
        //     text: ('Avg: ' + average),
        //     align: 'right'
        //   },
        // }],
      },
      plotOptions: {
        series: {
          maxPointWidth: 20,
          borderRadius: 0,
          cursor: 'pointer',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 6.5,
              }
            }
          },
          point: {
            events: {
              click: function () {
                thisComponent.showClientEfficencyChart(this.options);
                //thisComponent.modalRef = thisComponent.dialogService.open(thisComponent.showProbeStatusModal);
              }
            }
          }
        }
      },

      series: [
        {
          type: 'line',
          name: '',
          //data: (homeefficiency || []),
          data: homeefficiency,
          zoneAxis: 'x',
          zones: xZone,
          color: '#0a77fb',
          showInLegend: false,
        }
      ]
    };
  }
  // mapWholeHomeEfficencyChartData(data) {
  //   let categories = [], download = [], upload = [], homeefficiency = [];
  //   let xZone = [];
  //   let tooltip;
  //   const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
  //   homeefficiency = (data[mapKey] || [])
  //     .map(obj => {
  //       const date = obj.date;

  //       let y = date.substring(0, 4), m = date.substring(6, 4), d = date.substring(6,);
  //       let dateWithSlash = m + '/' + d + '/' + y;
  //       const time = obj.time;
  //       // const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
  //       // categories.push(dt);
  //       let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
  //       // let fullDateTime = (dateWithSlash + ' ' + (time.substring(0, 2) + ':' + time.substring(2, 4)));
  //       let fullDateTime;
  //       let year = date.substring(2, 4)
  //       let dateWithSlashyear = m + '/' + d + '/' + year;
  //       if (this.TimeFrame == 1) { //daily data
  //         fullDate = dateWithSlash
  //         categories.push(fullDate);
  //       } else if (this.TimeFrame == 4) {
  //         fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
  //         categories.push(fullDateTime);
  //       }
  //       else {
  //         const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
  //         fullDateTime = (dateWithSlash + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
  //         fullDate = dt;
  //         categories.push(dt);
  //       }
  //       obj.homeScore.findindex
  //       if (obj.homeScore > 0) {
  //         return typeof obj.homeScore == 'string' ? { y: parseInt(obj.homeScore.toString().substring(0, 5)), pointDate: fullDate, pointDateTime: fullDateTime } : { y: parseInt(obj.homeScore.toString().substring(0, 5)), pointDate: fullDate, pointDateTime: fullDateTime }
  //       } else {
  //         return { y: null, pointDate: fullDate, pointDateTime: fullDateTime };
  //       }
  //     });

  //   return [categories, homeefficiency];
  // }
  clientEfficiency(value) {
    let timeFrameOfAverageEff = 6;

    this.globalObj.latencyCreateTime = '';
    let s, e;
    if (this.TimeFrame == 1) {
      [s, e] = [new Date(value.pointDate.replace('<br>', ' ')), new Date(value.pointDate.replace('<br>', ' '))];
    } else {
      [s, e] = [new Date(value.pointDateTime.replace('<br>', ' ')), new Date(value.pointDateTime.replace('<br>', ' '))];
    }


    // const [s, e] = [new Date(value.pointDate.replace('<br>', ' ')), new Date(value.pointDate.replace('<br>', ' '))];
    // var st = moment(value.pointDate.replace('<br>', ' '), ["hh:mm A"]).toString();
    // var et = moment(value.pointDate.replace('<br>', ' '), ["hh:mm A"]).toString();
    // const [s, e] = [new Date(st), new Date(et)];
    // let [start, end] = value.index == 0 ? this.averageTimeSetter(s, e, true).reverse() : this.averageTimeSetter(s, e);

    let [start, end] = this.averageTimeSetterNew(s, e); // jeevagan
    let params
    if (this.TimeFrame == 1) {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        // period: timeFrameOfAverageEff,
        period: this.TimeFrame,
        start: start,
        end: end,
        tz: 0
      };
    }
    else {
      params = {
        sn: this.serialNumberSelected,
        orgId: this.orgId,
        mac: this.mac,
        // period: timeFrameOfAverageEff,
        period: this.TimeFrame,
        start: start,
        end: end,
        tz: -(new Date().getTimezoneOffset() / 60)
      };
    }

    this.avgEff = { ...params };
    this.effLoader = true;
    this.IssuesService.getAverageScore(params).subscribe((res: any) => {
      this.effLoader = false;
      Highcharts.chart('clientEfficiencyChartDiv', this.clientEfficiencyChartPopup(res || [], value.y));
    }, err => {
      this.effLoader = false;
      // const res = {
      //   'average-effciency-score': [{ client_name: "Apple iPhone 12", eff_score: 64.64, router_mac: "d0:76:8f:dd:c0:2f", station_mac_addr: "86:92:b2:8b:5b:96" },
      //   { client_name: "Google Pixel 4a (5G)", eff_score: 74.95, router_mac: "d0:76:8f:dd:c0:2f", station_mac_addr: "72:7d:61:fc:ca:9e" }]
      // };

      // Highcharts.chart('clientEfficiencyChartDiv', this.clientEfficiencyChartPopup(res || [], value.y));
      this.pageErrorHandle(err);
    });
  }
  // client_name: "Apple iPhone 12"
  // date: "20220221"
  // dl_created: 1645478640
  // eff_score: 81.1
  // fsan_sn: "CXNK009B44B5"
  // router_mac: "d0:76:8f:dd:c0:2f"
  // station_mac_addr: "86:92:b2:8b:5b:96"
  // time: "1554"
  // timestamp_str: "2022-02-21 10:24:00.000"

  getEfficiensyColor(score) {
    if (score > 45) {
      return '#82BF00';
    } else if (score > 15) {
      return 'rgba(252, 114, 53)';
    } else {
      return '#C70000';
    }

  }
  clientEfficiencyChartPopup(chartData, average): any {
    let xAxisValue = [], y1title = '', y2title = '', color = { 0: '#C70000', 1: '#C70000', 2: 'rgba(252, 114, 53)', 3: '#82BF00' }, data = [], data1 = [];
    let tooltip;
    let self = this;
    const mapKey = 'average-effciency-score';
    chartData[mapKey].sort((a, b) => a.eff_score - b.eff_score)
    let value = chartData[mapKey].filter((a) => a.client_name !== "" || a.client_name == "");
    chartData[mapKey] = value;
    chartData[mapKey].map((obj, i) => {
      const level = parseFloat((obj.eff_score).toFixed(2));
      xAxisValue.push((obj.client_name || obj.mesh_mac || obj.station_mac_addr || ''));
      var temp_is_online_now = false;
      if (obj['is_online_now']) {
        temp_is_online_now = obj['is_online_now']
      }
      data.push({ x: i, y: level, color: this.getEfficiensyColor(level), level: level, routerMac: obj.router_mac, stationMac: obj.station_mac_addr, client_name: obj.client_name, is_online_now: temp_is_online_now, eff_score: obj.eff_score, mesh_mac: obj.mesh_mac || '' });
    });
    let avg = chartData['average-effciency-score'].reduce(function (p, c, i, a) { return p + (c.eff_score / a.length) }, 0);
    avg = parseFloat((avg).toFixed(2));

    // var avg = chartData.mapKey.reduce(function (p, c, i, a) { return p.eff_score + (c.eff_score / a.length) }, 0);
    // chartData[mapKey].map((obj) => {
    //   const sum = obj.eff_score.reduce((acc, cur) => acc + cur);
    //   const average = sum / obj.eff_score.length;
    //   return average;
    // });

    let period = this.TimeFrame;  //[1, 2, 4].includes(this.appliedTimeFrame) ? 2 : ([5, 6].includes(this.appliedTimeFrame) ? 6 : 3);
    let that = this;
    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: xAxisValue,
        padding: '5px',
      },
      tooltip: {
        //headerFormat: '<b> {point.x} Efficiency',
        //pointFormat: '{series.name}: {point.y} %</b></br>Click to go to device details',
        formatter: function () {
          var s = '<b>' + this.x + ' ' + that.language.Efficiency + ': ' + this.y + ' %</b>';
          if (this.point.options.client_name || this.point.options.client_name == undefined && this.point.options.is_online_now != true) {
            s += '</br>' + that.language['Click to go to device details'];
          }
          return s;
        },
      },

      yAxis: [{
        min: 0,
        max: 100,
        tickInterval: 20,
        // top: "3%",
        title: {
          text: this.language['Device Efficiency'] + ' (%)',
          style: {
            fontSize: '15px'
          }
        }, plotLines: [{
          color: '#5ACFEA',
          value: average ? average.toFixed(2) : 0, // Insert your average here
          width: '2',
          zIndex: 4, // To not get stuck below the regular plot lines or series
          label: {
            text: `${this.language['Whole Home Efficiency']} - ${average ? average.toFixed(2) : 0} % `,
            align: 'right'
          },
        }],
      }, {
        opposite: true,
        tickAmount: 4,
        padding: '5px',
        title: {
          text: y2title,
        },
        labels: {
          format: '{value} Mbps',
        },
      }],
      plotOptions: {
        series: {
          maxPointWidth: 20,
          borderRadius: 0,
          cursor: 'pointer',
          point: {
            events: {
              click: function () {

                self.deviceService.efficiencyChart = true;
                let link: string = '/support/device';
                // self.router.navigate([link],{ queryParams: { item: 'deviceId' }, });

                const inputs = {
                  routerMac: this.options.routerMac,
                  stationMac: this.options.stationMac,
                  is_online_now: this.options.is_online_now,
                  eff_score: this.options.eff_score,
                  // period: period,
                  period: self.periodForFilter(period),
                  WeekFrame: self.periodForWeekFrame(period),
                  endTime: self.endForFilter()

                }
                if (this.options.stationMac && this.options.client_name) {
                  self.close();
                  self.router.navigate([link], { state: inputs });
                }
              }
            }
          }
        },
        column: {
          minPointLength: 3
        }
      },
      series: [{
        type: 'column',
        data: data,
        name: '',
      },
      ],
    }
  }

  endForFilter() {
    let [start, end, end2] = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];

    switch (this.TimeFrame) {
      case 1:
        // if (this.clientDates == moment().format('MM/DD/yyyy')) {
        //   start.setHours(5, 30, 0, 0)
        //   start.setHours(start.getHours())
        //   end = new Date()
        //   end.setMinutes(end.getMinutes() + 330);
        // } else {
        //   start.setHours(5, 30, 0, 0)
        //   start.setHours(start.getHours())

        //   end.setHours(28, 89, 59, 0)
        // }
        // let [start, end, startust, endust] = [new Date(), new Date(), new Date(), new Date()];
        // let startust
        // let endust
        if (this.clientDates == moment().format('MM/DD/yyyy')) {
          end = new Date(this.clientDates)
          start = new Date(this.clientDates)
          let date = new Date();
          let hours = new Date().getHours()
          let coeff = 1000 * 60;
          end = new Date(new Date(date.setMinutes(date.getMinutes())).setHours(hours, 0, 0, 0))
          // startust = new Date(this.clientDates)
          // startust.setHours(5, 30, 0, 0)
          // startust.setHours(startust.getHours())
          // endust = new Date()
          // endust.setMinutes(endust.getMinutes() + 330);
        } else {
          end = new Date(this.clientDates)
          start = new Date(this.clientDates)

          end.setHours(end.getHours() + 24);
          // startust = new Date(this.clientDates)
          // startust.setHours(5, 30, 0, 0)
          // startust.setHours(startust.getHours())
          // endust = new Date(this.clientDates)
          // endust.setHours(startust.getHours())
          // endust.setHours(28, 89, 59, 0)
          // [start, end] = this.minuteAligner(start, end)
        }
        //  start = new Date(end.setHours(end.getHours() - 24))
        // start = end.subtract(60, 'minutes').format('hh:mm A');
        // return [start, end, startust, endust]
        break;

      case 2:
        end = new Date(this.clientDates)
        start = new Date(this.clientDates)
        //   start.setMinutes(end.getMinutes() - 15)
        // [start, end] = this.minuteAligner(start, end);
        start.setMinutes(start.getMinutes() - 15);
        // end.setMinutes(end.getMinutes() - 1);
        break;

      case 3:
        // end = moment((value.pointDate), ["hh:mm A"].toString())
        end = new Date(this.clientDates)
        start = new Date(this.clientDates)
        start.setMinutes(start.getMinutes() - 15)
        // [start, end] = this.minuteAligner(start, end);
        break;
      case 4:


        // let endTime1
        // if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
        //   endTime1 = this.timeIntervals[this.selectedInterval].date;
        //   let end = moment(endTime1).subtract(15, "minutes")
        //   let start = moment(endTime1).subtract(180, "minutes");
        // } else {
        //   endTime1 = this.timeIntervals[this.selectedInterval].date;
        //   let end = moment(endTime1).subtract(15, "minutes")
        //   // startTime = moment(endTime1).subtract(60, "minutes");
        //   start = this.timeIntervals[this.selectedInterval - 1].date
        // }

        /* if (this.WeekFrame == 7) {
          end = new Date(this.clientDates)
          start = new Date(this.clientDates)
          end.setMinutes(end.getMinutes() + 15)
        } else {
          let endTime = this.timeIntervals[this.selectedInterval].date
          endTime = moment(endTime).subtract(15, "minutes")
          end = new Date(endTime)
          start = new Date(endTime)
          start.setMinutes(start.getMinutes() - 165)

        } */

        if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
          let endTime = this.timeIntervals[this.selectedInterval].date
          let endTime2 = this.timeIntervals[this.selectedInterval].date
          end2 = new Date(endTime2)
          endTime = moment(endTime).subtract(15, "minutes")
          end = new Date(endTime)
          start = new Date(endTime)
          start.setMinutes(start.getMinutes() - 165)

        } else {
          let endTime = this.timeIntervals[this.selectedInterval].date
          let endTime2 = this.timeIntervals[this.selectedInterval].date
          end2 = new Date(endTime2)
          endTime = moment(endTime).subtract(15, "minutes")
          end = new Date(endTime)
          start = this.timeIntervals[this.selectedInterval - 1].date
          start.setMinutes(start.getMinutes())
        }

        break;
      case 5:
        start = new Date()
        start.setMinutes(start.getMinutes() - 16);
        end.setMinutes(end.getMinutes() + 1);
        // start.setMinutes(start.getMinutes() - 15);
        //  var start = end.setMinutes(end.getMinutes() - 15);
        // start.setMinutes(start.getMinutes() - 15);

        //   start.setMinutes(end.getMinutes() - 15)
        // start.setMinutes(end.getMinutes() - 15)

        // end.setMinutes(start.getMinutes() - 15);
        break;

      case 6:
        let endTime = this.timeIntervals[this.selectedInterval].date

        end = new Date(endTime)
        start = new Date(endTime)
        start.setMinutes(start.getMinutes() - 15)
        // end.setMinutes(end.getMinutes() + 1);
        //  start = moment(endTime).subtract(15, "minutes")
        // [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];
        // start.setMinutes(start.getMinutes());
        // end.setMinutes(start.getMinutes() - 15);
        break;

      default:
        break;

    }
    return [start, end, end2]
    // return [(start.toISOString().substring(0, 16) + ':00'), (end.toISOString().substring(0, 16) + ':00')];
  }
  periodForWeekFrame(period) {

    switch (this.WeekFrame) {
      case 1:
        period = 1
        break;

      case 2:
        period = 2
        break;

      case 3:
        period = 3
        break;

      case 4:
        period = 4
        break;

      case 5:
        period = 5
        break;



      case 6:

        period = 6
        break;

      case 7:

        period = 7
      default:
        break;
    }
    return period
  }

  periodForFilter(period) {

    switch (this.TimeFrame) {
      case 1:
        period = 7
        break;

      case 2:
        period = 6
        break;

      case 3:
        period = 6
        break;

      case 4:
        period = 4
        break;

      case 5:
        period = 5
        break;



      case 6:

        period = 6
      default:
        break;
    }
    return period
  }

  // mapClientEfficencyChartData(data, mapObj, isByte = 2) {
  //   let categories = [], download = [], upload = [], latency = [];

  //   data.forEach(obj => {
  //     categories.push(obj[mapObj.time]);
  //     latency.push(obj[mapObj.latency]);
  //   });
  //   return mapObj.hasOwnProperty('latency') ? [categories, latency] : [categories, download, upload];
  // }
  showClientEfficencyChart(value) {
    if (this.TimeFrame == 1) {
      this.clientDates = moment(new Date(value.pointDate)).format('MM/DD/YYYY');
    }
    else if (this.TimeFrame == 4) {
      this.clientDates = moment(new Date(moment(value.pointDate).toString())).format('MM/DD/YYYY hh:mm A');
    }

    else {
      this.clientDates = moment(new Date(moment(value.pointDateTime).toString())).format('MM/DD/YYYY hh:mm A');
      // this.clientDates = moment(new Date(moment((value.pointDateTime), ["hh:mm A"]).toString())).format('MM/DD/YYYY hh:mm A');
    }


    this.modalRef = this.dialogService.open(this.clientEfficencyChartTest, { windowClass: 'ce-modal' });
    this.clientEfficiency(value);
    //this.QoeCharts();
    this.modalRef.dismissed.subscribe(() => {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    });
  }
  close() {
    this.modalRef.close();
    //this.scrollToId('wholeHomeEfficiencyChart');
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  pageErrorHandle(err: any) {
    /* if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else {
      this.alertMessage = this.dataChartService.pageErrorHandle(err);
    } */
    this.alertMessage = this.ssoService.pageErrorHandle(err);
    this.isError = true;
    this.error = true;
    $("body").scrollTop(0);
  }

  qoeCheck() {
    let scopes = this.ssoService.getScopes();
    let validScopes: any = Object.keys(scopes);
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.qoe'] = scopes['cloud.rbac.csc.qoe'] ? scopes['cloud.rbac.csc.qoe'] : [];

      if (scopes && (scopes['cloud.rbac.csc.qoe'] && scopes['cloud.rbac.csc.qoe'].length)) {
        if (scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) this.scope.qoeRead = true;
      }
    } else {
      this.scope.qoeRead = true;
    }

    let modelName = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData"))[0].modelName : '';
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    if (this.ssoService.acceptGSModel(modelName)) {
      this.showQOE = this.ssoService.exosVersionCheck('21.4') && this.scope.qoeRead;
      return sessionStorage.getItem('qoeCheck');
    }
    else {
      this.showQOE = this.scope.qoeRead;
      return sessionStorage.getItem('qoeCheck');
    }

  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    let validScopes: any = Object.keys(scopes);

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.topology'] = scopes['cloud.rbac.csc.topology'] ? scopes['cloud.rbac.csc.topology'] : [];

      if (scopes && (scopes['cloud.rbac.csc.topology'] && scopes['cloud.rbac.csc.topology'].length)) {
        if (scopes['cloud.rbac.csc.topology'].indexOf('read') !== -1) {
          this.scope.topologyRead = true;
          //this.showTopologyTab = true;
        }
      }
    } else {
      this.scope.topologyRead = true;
      //this.showTopologyTab = true;
    }


  }

  lastdays15MinOfValues() {
    /* let date = new Date();
    var coeff = 1000 * 60 * 15;
    let timeDuration = -24 * 60;
    let lastUpdatedTime;
    let that = this;
    let len = 0;

    let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
    let startTime = moment(lastTime).subtract(24, "hours");
    let currentTimestamp = new Date().setSeconds(0, 0);
    const minToRoundOf24hr = Math.ceil(
      (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      / (1000 * 60 * 60)
    ) > 24 ? 30 : 15;
    startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute

    this.timeIntervals = [];
    let current = moment(startTime);
    let i = 0;
    while (current <= lastTime) {
      this.timeIntervals.push({
        value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
        date: moment(current).toDate()
      });
      lastUpdatedTime = moment(current);
      current.add(15, 'minutes');
      i++;
    }

    //including current time
    // let currentEnd = moment(date).seconds(0).milliseconds(0);
    // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
    //   this.timeIntervals.push({
    //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
    //     date: moment(currentEnd).toDate()
    //   });
    // }


    len = this.timeIntervals.length;
    this.selectedInterval = this.timeIntervals[len - 1].value;
    this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

    const translate = (value: number, label: LabelType): string => {
      let pointersTime = moment(that.timeIntervals[value]['date']);
      let start = pointersTime.subtract(15, 'minutes').format('hh:mm A');
      let end = moment(that.timeIntervals[value]['date']).format('hh:mm A');
      return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
    };
    this.timeIntervalOptions.translate = translate; */
    if (this.TimeFrame == 6) {
      let date = new Date();
      let coeff = 1000 * 60 * 15;
      let timeDuration = -24 * 60;
      let lastUpdatedTime;
      let that = this;
      let len = 0;

      let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
      let startTime = moment(lastTime).subtract(24, "hours");
      let currentTimestamp = new Date().setSeconds(0, 0);
      // console.log('current = ' + new Date(currentTimestamp));
      // console.log('start = ' + new Date(moment(startTime).toDate()));
      // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60));
      const minToRoundOf24hr = Math.ceil(
        (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        / (1000 * 60 * 60)
      ) > 24 ? 15 : 30;
      startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute

      this.timeIntervals = [];
      let current = moment(startTime);
      // console.log(this.timeIntervals);
      let i = 0;
      while (current <= lastTime) {
        this.timeIntervals.push({
          value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
          date: moment(current).toDate()
        });
        lastUpdatedTime = moment(current);
        current.add(15, 'minutes');
        i++;
      }

      //including current time
      // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // console.log(currentEnd);
      // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      //   console.log('Not same');
      //   this.timeIntervals.push({
      //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      //     date: moment(currentEnd).toDate()
      //   });
      // }

      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      };
      this.timeIntervalOptions.translate = translate;
      //console.log(this.timeIntervals);

      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    } else if (this.TimeFrame == 4) {
      // let date = new Date();
      // let coeff = 1000 * 60;
      // // now = moment()
      // //1000 miliecond //60 seconds
      // let timeDuration = -24 * 60;
      // let lastUpdatedTime;
      // let that = this;
      // let now = moment()
      // let len = 0;
      // var startTime1
      // let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
      // //  let startOfDayTime = now.startOf('day').toString()
      // // let startTime = moment(startOfDayTime).subtract(120, "hours").startOf('day');
      // let startTime = moment(lastTime).subtract(144, "hours");
      // startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
      // // startTime1 = new Date(startTime)
      // let currentTimestamp = new Date().setSeconds(0, 0);

      // const minToRoundOf24hr = Math.ceil(
      //   (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      //   / (1000 * 60 * 60)
      // ) > 24 ? 30 : 15;
      // // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute

      // this.timeIntervals = [];
      // let current = moment(startTime1);
      // // 48

      // let i = 0;
      // let timeinterrval1 = 180
      // while (current <= lastTime) {
      //   this.timeIntervals.push({
      //     value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
      //     date: moment(current).toDate()
      //   });
      //   lastUpdatedTime = moment(current);
      //   current.add(timeinterrval1, 'minutes');

      //   if (current['_d'].toString() == now.startOf('day')['_d'].toString()) {
      //     //  current.add(60, 'minutes');.
      //     timeinterrval1 = 60

      //   }

      //   // current.add(180, 'minutes');
      //   i++;

      // }

      // //including current time
      // // let currentEnd = moment(date).seconds(0).milliseconds(0);
      // // console.log(currentEnd);
      // // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
      // //   console.log('Not same');
      // //   this.timeIntervals.push({
      // //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
      // //     date: moment(currentEnd).toDate()
      // //   });
      // // }


      // len = this.timeIntervals.length;
      // this.selectedInterval = this.timeIntervals[len - 1].value;
      // this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

      // const translate = (value: number, label: LabelType): string => {
      //   let pointersTime = moment(that.timeIntervals[value]['date']);
      //   // var start
      //   // var end
      //   // if (this.selectedInterval <= 48) {
      //   //   start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
      //   //   end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');

      //   // }
      //   // else {
      //   //   start = pointersTime.subtract(60, 'minutes').format('MMM DD hh:mm A');
      //   //   end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');

      //   // }
      //   let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
      //   let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
      //   return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
      // };
      // this.timeIntervalOptions.translate = translate;
      // //console.log(this.timeIntervals);

      // // this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
      // this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
      // this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
      // setTimeout(() => {
      //   this.showIntervalSlider = true;
      //   setTimeout(() => {
      //     $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
      //   }, 10);
      // }, 1000)
      var i = this.WeekFrame

      if (i == 1) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;
        var startTime1
        var lastTime1
        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }

        //including current time
        // let currentEnd = moment(date).seconds(0).milliseconds(0);
        // console.log(currentEnd);
        // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
        //   console.log('Not same');
        //   this.timeIntervals.push({
        //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
        //     date: moment(currentEnd).toDate()
        //   });
        // }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.lastSeventhDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 2) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;
        // let startTime1
        // let lastTime1
        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }

        //including current time
        // let currentEnd = moment(date).seconds(0).milliseconds(0);
        // console.log(currentEnd);
        // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
        //   console.log('Not same');
        //   this.timeIntervals.push({
        //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
        //     date: moment(currentEnd).toDate()
        //   });
        // }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.lastSixthDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 3) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(48, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }

        //including current time
        // let currentEnd = moment(date).seconds(0).milliseconds(0);
        // console.log(currentEnd);
        // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
        //   console.log('Not same');
        //   this.timeIntervals.push({
        //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
        //     date: moment(currentEnd).toDate()
        //   });
        // }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.lastfifthDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 4) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(72, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }

        //including current time
        // let currentEnd = moment(date).seconds(0).milliseconds(0);
        // console.log(currentEnd);
        // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
        //   console.log('Not same');
        //   this.timeIntervals.push({
        //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
        //     date: moment(currentEnd).toDate()
        //   });
        // }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.lastFourthDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 5) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(96, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }

        //including current time
        // let currentEnd = moment(date).seconds(0).milliseconds(0);
        // console.log(currentEnd);
        // if (!moment(currentEnd).isSame(lastUpdatedTime)) {
        //   console.log('Not same');
        //   this.timeIntervals.push({
        //     value: i, legend: moment(currentEnd).format('MM/DD/YYYY HH:mm'),
        //     date: moment(currentEnd).toDate()
        //   });
        // }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.lastThirdDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 6) {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(120, 0, 0, 0))
        lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

        let currentTimestamp = new Date().setSeconds(0, 0);
        // console.log('current = ' + new Date(currentTimestamp));
        // console.log('start = ' + new Date(moment(startTime).toDate()));
        // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
        //   / (1000 * 60 * 60));
        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 15 : 30;
        startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

        this.timeIntervals = [];
        let current = moment(startTime1);
        // console.log(this.timeIntervals);
        let i = 0;
        while (current <= lastTime1) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(180, 'minutes');
          i++;
        }


        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          let start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
          let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;
        //console.log(this.timeIntervals);

        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.yesterDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (i == 7) {
        {
          let date = new Date();
          let coeff = 1000 * 60;
          let timeDuration = -24 * 60;
          let lastUpdatedTime;
          let that = this;
          let len = 0;
          let lastTime
          lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
          let startTime = moment(lastTime).subtract(144, "hours");
          startTime1 = new Date(startTime['_d'].setHours(144, 0, 0, 0))
          // lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

          let currentTimestamp = new Date().setSeconds(0, 0);
          // console.log('current = ' + new Date(currentTimestamp));
          // console.log('start = ' + new Date(moment(startTime).toDate()));
          // console.log((currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          //   / (1000 * 60 * 60));
          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime1).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 60 : 180;
          startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute

          this.timeIntervals = [];
          let current = moment(startTime1);
          // console.log(this.timeIntervals);
          let i = 0;
          let lasttime;
          // this.timeinterrval1 = 180;
          let now = moment();

          while (current <= lastTime) {
            this.timeIntervals.push({
              value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
              date: moment(current).toDate()
            });
            lastUpdatedTime = moment(current);


            lasttime = Math.floor((lastTime["_d"].getHours() - current['_d'].getHours()) / 3);
            if (lasttime > 0) {


              current.add(180, 'minutes')
            } else {
              const minToRoundOf24hr = Math.ceil(lastTime["_d"].getHours() - current['_d'].getHours()) == 2 ? 120 : 60
              current.add(minToRoundOf24hr, 'minutes')
            }


            i++;
          }




          len = this.timeIntervals.length;
          this.selectedInterval = this.timeIntervals[len - 1].value;
          this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

          const translate = (value: number, label: LabelType): string => {
            let pointersTime = moment(that.timeIntervals[value]['date']);
            var start
            var end

            if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
              start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
              end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');

            }
            else {
              // start = pointersTime.subtract(minToRoundOf24hr, 'minutes').format('MMM DD hh:mm A');
              start = moment(this.timeIntervals[len - 2].date).format('MMM DD hh:mm A')
              end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
            }

            // let start = pointersTime.subtract(180, 'minutes').format('hh:mm A');
            // let end = moment(that.timeIntervals[value]['date']).format('hh:mm A');
            return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
          };
          this.timeIntervalOptions.translate = translate;
          //console.log(this.timeIntervals);

          this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(180, 'minutes').format('MMM DD hh:mm A');
          this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
          // this.toDay = moment(this.timeIntervals[0].date).format('dddd');
          setTimeout(() => {
            this.showIntervalSlider = true;
            setTimeout(() => {
              $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
            }, 10);
          }, 1000)
        }
      }


      setTimeout(() => {
        this.WeekFramedata = [
          { id: 1, name: this.language[this.lastSeventhDay] },
          { id: 2, name: this.language[this.lastSixthDay] },
          { id: 3, name: this.language[this.lastfifthDay] },
          { id: 4, name: this.language[this.lastFourthDay] },
          { id: 5, name: this.language[this.lastThirdDay] },
          { id: 6, name: this.language[this.yesterDay] },
          { id: 7, name: this.language[this.toDay] }
        ]
      }, 2000);
    }
  }

  // showValue() {

  // }
  getISOString(time) {
    return time.toISOString().substr(0, 16) + ':00';
  }

  filterContent(chartType, legend) {
    this.legendType[legend] = !this.legendType[legend];
    // if (chartType == 1) {
    //   Highcharts.chart('qoeScoreChart', this.qoeChartOption(
    //     this.legendType['qoeDash'] && this.legendType['qoeSolid']
    //       ? this.summaryData
    //       : !this.legendType['qoeDash'] && !this.legendType['qoeSolid']
    //         ? ({ rawData: [] })
    //         : ({
    //           rawData: (this.summaryData?.rawData || [])
    //             .filter(obj => (this.legendType['qoeDash'] ? (obj.qoeScore > 0) : (obj.qoeScore < 0)))
    //         })));

    if (chartType == 1) {
      const grp = [
        (this.legendType['qoeGood'] ? 5 : ''),
        (this.legendType['qoeGood'] ? 4 : ''),
        (this.legendType['qoeFair'] ? 3 : ''),
        (this.legendType['qoePoor'] ? 2 : ''),
        (this.legendType['qoePoor'] ? 1 : ''),
        ...(this.legendType['qoeNoData'] ? [-1] : [''])
      ];
      const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
      if (this.TimeFrame == 1) {
        Highcharts.chart('qoeScoreChart', this.qoeChartOption({
          dailyData: (this.summaryData[mapKey] || []).filter(obj => obj.qoeScore && grp.includes(obj.qoeScore))
        }));
      } else {
        Highcharts.chart('qoeScoreChart', this.qoeChartOption({
          rawData: (this.summaryData[mapKey] || []).filter(obj => obj.qoeScore && grp.includes(obj.qoeScore))
        }));

      }


    } else if (chartType == 2) {
      const grp = [
        (this.legendType['serviceGood'] ? 'GOOD' : ''),
        (this.legendType['serviceFair'] ? 'OK' : ''),
        (this.legendType['servicePoor'] ? 'BAD' : ''),
        ...(this.legendType['serviceNoData'] ? ['GOOD(GREY)', 'BAD(GREY)', 'OK(GREY)'] : [''])
      ];
      const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
      if (this.TimeFrame == 1) {
        Highcharts.chart('wanServiceChart', this.wanService({
          dailyData: (this.summaryData[mapKey] || []).filter(obj => obj.wanService && grp.includes(obj.wanService.toUpperCase()))
        }));
      } else {
        Highcharts.chart('wanServiceChart', this.wanService({
          rawData: (this.summaryData[mapKey] || []).filter(obj => obj.wanService && grp.includes(obj.wanService.toUpperCase()))
        }));
      }

    } else if (chartType == 3) {
      const grp = [
        (this.legendType['contGood'] ? 'GOOD' : ''),
        (this.legendType['contGood'] ? 'OK' : ''),
        (this.legendType['contPoor'] ? 'BAD' : ''),
        ...(this.legendType['contNoData'] ? ['GOOD(GREY)', 'BAD(GREY)', 'OK(GREY)'] : [''])
      ];
      const mapKey = this.TimeFrame == 1 ? 'dailyData' : 'rawData';
      if (this.TimeFrame == 1) {
        Highcharts.chart('wanContinuityChart', this.wanContinuity({
          dailyData: (this.summaryData[mapKey] || []).filter(obj => obj.wanContinuity && grp.includes(obj.wanContinuity.toUpperCase()))
        }, this.WanShowup));
      } else {
        Highcharts.chart('wanContinuityChart', this.wanContinuity({
          rawData: (this.summaryData[mapKey] || []).filter(obj => obj.wanContinuity && grp.includes(obj.wanContinuity.toUpperCase()))
        }, this.WanShowup));
      }
    } else if (chartType == 4) {
      Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption(
        this.legendType['homeData'] && this.legendType['clientData']
          ? this.summaryData
          : !this.legendType['homeData'] && !this.legendType['clientData']
            ? ({ rawData: [] })
            : ({
              rawData: (this.summaryData?.rawData || [])
                .filter(obj => (this.legendType['homeData'] ? (obj.homeScore) : false))
            })));
    }
  }

  // scrollToId(id) {
  //   const element = document.getElementById(id);
  //   const headerOffset = 80;
  //   const elementPosition = element.offsetTop - headerOffset;
  //   const startPosition = window.pageYOffset;
  //   const distance = elementPosition - startPosition;
  //   const duration = 500;
  //   let start = null;

  //   const step = ((timestamp) => {
  //     if (!start) start = timestamp;
  //     const progress = timestamp - start;
  //     window.scrollTo(0, this.easeInOutCubic(progress, startPosition, distance, duration));
  //     if (progress < duration) window.requestAnimationFrame(step);
  //   });
  //   window.requestAnimationFrame(step);
  // }

  // easeInOutCubic(t, b, c, d) {
  //   t /= d / 2;
  //   if (t < 1) return c / 2 * t * t * t + b;
  //   t -= 2;
  //   return c / 2 * (t * t * t + 2) + b;
  // }
}


