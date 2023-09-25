import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { DatePipe } from '@angular/common';
import { DeviceService } from '../service/device.service';
import * as moment from 'moment';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { state } from '@angular/animations';
import { TimePeriod } from 'ngx-material-timepicker/src/app/material-timepicker/models/time-period.enum';
import { IoTThingsGraph } from 'aws-sdk';
import { fail } from 'assert';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-efficiency',
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.scss']
})
export class EfficiencyComponent implements OnInit,AfterViewInit {
  category: any;
  dropdownModel: boolean;
  @HostListener("click", ["$event"]) inClick(e) {
    //Slider bar Prev, Next click events

    e.stopPropagation();
    history.state.endTime = false;
    this.inputs = undefined
    let id = e.target.id ? e.target.id : '';
    if (id == 'slider-click-next' || id == 'slider-click-prev') {
      let clsList = e.target.className ? e.target.className.split(' ')[0] : '';
      let tag = e.target.localName;
      let totalPoints = this.timeIntervals.length - 1;
      // console.log(this.selectedInterval)
      if (id == 'slider-click-next') {
        history.state.endTime = false;
        this.inputs = undefined
        let point = parseInt(clsList.split('-')[1]);
        if ((point + 1) <= totalPoints) {
          this.selectedInterval = point + 1;
        }

      }

      if (id == 'slider-click-prev') {
        history.state.endTime = false;
        this.inputs = undefined
        let point = parseInt(clsList.split('-')[1]);
        if ((point - 1) >= 0) {
          this.selectedInterval = point - 1;
        }
      }

      // console.log(`${this.selectedInterval} selected from range of 0 to ${totalPoints}`)
      this.handleUserTime();
    }
    history.state.endTime = false;

    this.inputs = undefined

  }
  // public subject = new Subject<any>();
  inputs: any;
  any15min: any;
  language: any;
  languageSubject;
  orgId;
  serialNumberSelected: any;
  deviceInfo: any = [];
  globalObj: any = {};
  pipe = new DatePipe('en-US');
  date: any
  start: boolean;
  startDate: any
  endDate: any
  loader: boolean;
  weekDate: any;
  isDateAreEqual: boolean;
  homeRes: any = {};
  leftSliderTime: string;
  rightSliderTime: string;
  station_mac_addr = history?.state?.stationMac

  WeekFrame: number = 7;
  lastSeventhDay: string = moment().subtract(144, 'hours').format('dddd');
  lastSixthDay: string = moment().subtract(120, 'hours').format('dddd');
  lastfifthDay: string = moment().subtract(96, 'hours').format('dddd');
  lastFourthDay: string = moment().subtract(72, 'hours').format('dddd');
  lastThirdDay: string = moment().subtract(48, 'hours').format('dddd');
  yesterDay: string = moment().subtract(24, 'hours').format('dddd');
  toDay: string = moment().format('dddd');
  WeekFramedata = []
  softwareVersion: any;
  constructor(private translateService: TranslateService,
    private dataChartService: DataServiceService,
    private deviceService: DeviceService,
    public ssoService: SsoAuthService) {

    this.TimeFrame = history?.state?.period || this.TimeFrame;
    this.endDate = history?.state?.endTime || this.endDate
    this.startDate = history?.state?.startTime || this.startDate
    this.WeekFrame = history?.state?.WeekFrame || this.WeekFrame

    this.lastdays15MinOfValues();
  }
  TimeFrame: number = 2;
  TimeInterval = 1;
  FrameSV = [
    // { id: 1, name: 'Last 7 days' },
    { id: 2, name: 'Last 24 hours' },
    { id: 3, name: 'Last 3 hours' },
    { id: 5, name: ' Last 15 minutes' },
    { id: 6, name: ' Any 15 minutes within last day' },
    // { id: 4, name: ' Any hours within last week' },
  ];
  Frame = [
    { id: 1, name: 'Last 7 days' },
    { id: 2, name: 'Last_hours' },
    { id: 3, name: 'Last 3 hours' },
    { id: 5, name: 'Last 15 minutes' },
    { id: 6, name: 'Any 15 minutes within last day' },
    // { id: 4, name: ' Any hours within last week' },
    { id: 4, name: 'Any 3 Hours within last week' },
    { id: 7, name: 'Any day within last week' }
  ];
  maxDate = new Date();
  minDate = new Date();
  formDate = new Date(this.minDate.setDate(this.minDate.getDate() - 6))
  stepMinuteVal: number = 0;
  showHrs = true;
  isLastDay15minSelected = false;
  isEndDateDisabled = true;
  @Input() index;
  effDash = true;


  startTimeUpdate() {
    // if (this.isEndDateDisabled) return
    this.endDate = moment(this.startDate).add(this.stepMinuteVal, "m").toDate()
    this.isEndDateDisabled = this.isLastDay15minSelected;
    this.isDateAreEqual = this.start && moment(this.startDate).isSame(this.endDate)
    // this.isDateAreEqual = moment(this.startDate).isSame(this.endDate)
  }
  endTimeUpdate() {
    this.isDateAreEqual = this.start && moment(this.startDate).isSame(this.endDate)
  }
  onTimeFrameChange(event) {
    // console.log(event);
    this.isEndDateDisabled = true;
    this.isLastDay15minSelected = event == 6;
    if (event == 6) {
      this.start = true;
      // this.endDate = moment(this.startDate).add(this.stepMinuteVal, "m").toDate()
      this.stepMinuteVal = 15;
      var coeff = 1000 * 60 * 5;
      var date = new Date();
      date.setMinutes(0);  //or use any other date
      this.startDate = this.endDate = new Date(Math.round(date.getTime() / coeff) * coeff);
      this.startDate = moment(this.endDate).add(-15, "m").toDate()
      this.showHrs = true;
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
      this.startDate = moment(this.endDate).add(-60, "m").toDate()
      this.showHrs = true;
    }
    else {
      this.start = false;
    }

    //this.loadChart();
  }



  ngOnInit(): void {


    this.weekDate = this.maxDate = new Date();
    var coeff = 1000 * 60 * 5;
    var date = new Date();  //or use any other date
    this.startDate = this.endDate = new Date(Math.round(date.getTime() / coeff) * coeff);
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.Frame = [
        { id: 1, name: this.language ['Last 7 days'] },
        { id: 2, name: this.language['Last_hours'] },
        { id: 3, name: this.language['Last 3 hours'] },
        { id: 5, name: this.language['Last 15 minutes'] },
        { id: 6, name: this.language['Any 15 minutes within last day'] },
        // { id: 4, name: ' Any hours within last week' },
        { id: 4, name: this.language['Any 3 Hours within last week' ]},
        { id: 7, name: this.language['Any day within last week'] }
      ];
      this.loadChart();
    });
    this.orgId = this.ssoService.getOrgId();
    this.deviceInfo = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    let deviceInfo = this.deviceInfo?.filter(el => (el.opMode && el.opMode.indexOf('RG') > -1));
    // if (deviceInfo) {
    //   this.serialNumberSelected = this.deviceInfo[0].serialNumber;
    // }

    // if (deviceInfo) {
    //   this.softwareVersion = this.deviceInfo[0]?.softwareVersion?.substring(0, 4)
    // } else {
    //   this.softwareVersion = 0;
    // };
    if (deviceInfo?.length > 0) {
      deviceInfo = deviceInfo.filter((x) => x.opMode == 'RG');
      if (
        deviceInfo.length ||
        this.ssoService.acceptGSModel(deviceInfo[0]?.modelName || '')
      ) {

        this.softwareVersion = deviceInfo[0].softwareVersion?.substring(0, 4);
        this.serialNumberSelected = deviceInfo[0].serialNumber;
        // this.mac = deviceInfo[0].macAddress;
      } else return
    } else return;

    // if (deviceInfo?.length) {
    //   this.serialNumberSelected = this.deviceInfo ? this.deviceInfo[0].serialNumber : '';
    // } else {
    //   this.serialNumberSelected = this.deviceInfo ? this.deviceInfo[0].serialNumber : '';
    // }
    if (history?.state?.endTime) {
      this.calcOf15minVal();
    }
    this.zyxelModel();

    this.loadChart();

  }

  ngAfterViewInit(): void {
    this.Frame = [
      { id: 1, name: this.language ['Last 7 days'] },
      { id: 2, name: this.language['Last_hours'] },
      { id: 3, name: this.language['Last 3 hours'] },
      { id: 5, name: this.language['Last 15 minutes'] },
      { id: 6, name: this.language['Any 15 minutes within last day'] },
      // { id: 4, name: ' Any hours within last week' },
      { id: 4, name: this.language['Any 3 Hours within last week' ]},
      { id: 7, name: this.language['Any day within last week'] }
    ];
  }
  sliderEvent() {
    history.state.endTime = false;
    this.inputs = undefined
    setTimeout(() => {
      if (this.TimeFrame == 6 || this.TimeFrame == 4 || this.TimeFrame == 7) {
        this.showIntervalSlider = true;
      }

      this.loadChart();



    }, 500);
  }

  dropDownChaneWeekFrame() {
    history.state.endTime = false;
    this.inputs = undefined
    // this.dropDownchangeweek()
  }
  dropDownchange() {
    history.state.endTime = false;
    history.state.stationMac = false;
    history.state.period = false;
    this.lastdays15MinOfValues()
    // if (this.TimeFrame == 4) {
    //   this.dropDownchangeweek()
    // }
    // this.dropDownchangeweek();
    if (this.TimeFrame == 6 || this.TimeFrame == 4 || this.TimeFrame == 7) {
      this.showIntervalSlider = false;
    }

    this.sliderEvent();
  }
  userClickTimeout: any = setTimeout(() => { }, 0);
  handleUserTime() {
    clearTimeout(this.userClickTimeout);
    this.userClickTimeout = setTimeout(() => { this.loadChart(); }, 2000);
  }

  // sliderEvent() {
  //   setTimeout(() => {
  //     this.loadChart();
  //   }, 500);
  // }

  loadChart() {
    if (history?.state?.endTime) {

      let [start, end] = this.timeForFilter(new Date(), new Date())
      // let endTime
      // let startTime
      // if (this.TimeFrame == 7) {
      //   endTime = history?.state?.endTime[3];
      //   startTime = history?.state?.endTime[2];
      // } else {
      //   endTime = history?.state?.endTime[1];
      //   startTime = history?.state?.endTime[0];
      // }
      let endTime = history?.state?.endTime[1];
      let startTime = history?.state?.endTime[0];

      // format('MM/DD/YYYY HH:mm')

      [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];

      const routerMac = JSON.parse(this.ssoService.getSerialNo() || [])?.filter(obj => obj.opMode == 'RG').map(obj => obj.macAddress).join('')
      let params

      if (this.TimeFrame == 1) {
        params = {
          sn: this.serialNumberSelected,
          orgId: this.orgId,
          routerMac: routerMac,
          stationMac: this.station_mac_addr,
          period: this.TimeFrame,
          start: start,
          end: end,
          tz: 0
        };
      } else {
        params = {
          sn: this.serialNumberSelected,
          orgId: this.orgId,
          routerMac: routerMac,
          stationMac: this.station_mac_addr,
          period: this.TimeFrame,
          start: start,
          end: end,
          tz: -(new Date().getTimezoneOffset() / 60)
        };
      }

      this.loader = true;
      this.deviceService.getClientScore(params).subscribe((res: any) => {
        this.loader = false;
        this.homeRes = res;
        Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption((res || [])));
      }, err => {
        this.homeRes = {};
        let res = []
        Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption((res || [])));

        this.loader = false;
      });
    } else {
      this.globalObj.latencyCreateTime = '';
      let [start, end] = this.timeForFilter(new Date(), new Date());

      if (this.TimeFrame == 6) {
        // const last15End = new Date();
        let endTime = this.timeIntervals[this.selectedInterval].date;
        let startTime = moment(endTime).subtract(15, "minutes");
        endTime = moment(endTime).add(1, "minutes");
        [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];


      }

      if (this.TimeFrame == 4) {

        let startTime
        let endTime
        let endTime1
        if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
          endTime1 = this.timeIntervals[this.selectedInterval].date;
          endTime = moment(endTime1).subtract(15, "minutes")
          startTime = moment(endTime1).subtract(180, "minutes");
        } else {
          endTime1 = this.timeIntervals[this.selectedInterval].date;
          endTime = moment(endTime1).subtract(15, "minutes")
          // startTime = moment(endTime1).subtract(60, "minutes");
          startTime = this.timeIntervals[this.selectedInterval - 1].date
        }
        // let endTime = this.timeIntervals[this.selectedInterval].date;
        // let startTime = moment(endTime).subtract(180, "minutes");
        [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];
        //  this.timeForDeviceEfficiency = endTime;
      }
      if (this.TimeFrame == 7) {

        let startTime
        let endTime
        let endTime1

        if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 12 == 0) {
          endTime1 = this.timeIntervals[this.selectedInterval].date;
          endTime = moment(endTime1);
          startTime = moment(endTime1).subtract(24, "hours");
        } else {
          endTime = moment(this.timeIntervals[this.selectedInterval].date)
          startTime = moment(this.timeIntervals[this.selectedInterval - 1].date)
        }
        [start, end] = [this.getISOString(startTime), this.getISOString(endTime)];

      }

      if (this.inputs != undefined) {
        let startTime;
        let endTime;
        this.calcOf15minVal1()
        this.TimeFrame = this.inputs.period
        startTime = moment(this.timeIntervals[this.selectedInterval - 1].date)
        endTime = moment(this.timeIntervals[this.selectedInterval].date)

        end = endTime.toISOString().substr(0, 16) + ':00';
        start = startTime.toISOString().substr(0, 16) + ':00';
      }
      let getserial = this.ssoService.getSerialNo();
      const routerMac = getserial ? JSON.parse(getserial || []).filter(obj => obj.opMode == 'RG').map(obj => obj.macAddress).join('') : ''
      let params
      if (this.TimeFrame == 1) {
        params = {
          sn: this.serialNumberSelected,
          orgId: this.orgId,
          routerMac: routerMac,
          stationMac: this.index?.MACAddress ? this.index?.MACAddress : this.station_mac_addr,
          period: this.TimeFrame,
          start: start,
          end: end,
          tz: 0
        };
      } else {
        params = {
          sn: this.serialNumberSelected,
          orgId: this.orgId,
          routerMac: routerMac,
          stationMac: this.index?.MACAddress ? this.index?.MACAddress : this.station_mac_addr,
          period: this.TimeFrame,
          start: start,
          end: end,
          tz: -(new Date().getTimezoneOffset() / 60)
        };
      }
      this.loader = true;
      this.deviceService.getClientScore(params).subscribe((res: any) => {
        this.loader = false;
        this.homeRes = res;
        Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption((res || [])));
      }, err => {
        this.homeRes = {};
        let res = []
        Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption((res || [])));

        this.loader = false;
      });
    }
  }

  zyxelModel(){
    let model = JSON.parse(sessionStorage.getItem('calix.deviceData'));
   let rgModel = model.filter(element => {
        if(element.opMode == 'RG')
        return element;
      })
      if(rgModel[0].manufacturer == "ZYXEL"){
        return this.dropdownModel = true;
      }
      else if(((rgModel[0].manufacturer == "Calix") || (rgModel[0].manufacturer == "MSTC")) && parseFloat(rgModel[0].softwareVersion) >= 22.1){
        return this.dropdownModel = true;
      }
      else return this.dropdownModel = false;
  }

  timeForFilter(start, end) {
    // let [start, end] = [new Date(), new Date()];
    switch (this.TimeFrame) {
      case 1:
        // start.setDate(start.getDate() - 5);
        // start.setHours(0, 0, 0, 0)
        start.setDate(start.getDate() - 6);
        start.setHours(5, 30, 0, 0);
        end.setMinutes(end.getMinutes());
        return [(start.toISOString().substring(0, 11) + '00' + ':00' + ':00'), (end.toISOString().substring(0, 19))]
        // [start, end] = this.minuteAligner(start, end);
        break;

      case 2:
        start.setHours(start.getHours() - 24);
        [start, end] = this.minuteAligner(start, end);
        break;

      case 3:
        start.setHours(start.getHours() - 3);
        [start, end] = this.minuteAligner(start, end);
        break;

      case 4:
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
        end.setMinutes(end.getMinutes() + 1);
        // start.setMinutes(start.getMinutes() - 15);
        break;



      case 6:
      // [start, end] = [this.startDate, this.endDate];
      // [start, end] = this.minuteAligner(start, end);
      // break;

      default:
        break;
    }
    return [(start.toISOString().substring(0, 16) + ':00'), (end.toISOString().substring(0, 16) + ':00')];
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

  wholeHomeEfficiencyOption(data): any {
    let thisComponent = this;
    const mappingObject = { time: "time", homeefficiency: "homeefficiency" };
    let [categories, homeefficiency] = this.mapWholeHomeEfficencyChartData(data);
    // let average = data?.avg_eff_score ? data?.avg_eff_score : 0;
    let frame = this.TimeFrame;
    let self = this;

    return {
      title: {
        text: '',
        // style: {
        //   fontSize: '14px',
        // },
        // align: 'left'
      },
      credits: {
        enabled: false
      },
      // chart: {
      //   type: 'column'
      // },
      tooltip: {
        // headerFormat: '',
        pointFormat: `${this.language['Efficiency Score']} : <b>{point.y}%</b>`
      },
      xAxis: {
        categories: (categories || []),
        overflow: false,
        labels: {
          rotation: -45
        },
        tickInterval: (function () {
          let sLength = categories.length ? categories.length : 0;
          let f = 1;
          if (frame === 2 || frame === 7) {
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
          text: `${this.language['Client Efficiency']} (%)`,
          style: {
            fontSize: '15px'
          }
        },
        // plotLines: [{
        //   color: '#5ACFEA',
        //   value: average, // Insert your average here
        //   width: '2',
        //   zIndex: 4, // To not get stuck below the regular plot lines or series
        //   label: {
        //     text: ('Avg: ' + average.toFixed(2)),
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
                //radius: 3
              }
            }
          },
          point: {
            events: {
              click: function () {
                if (frame === 2) {

                  self.inputs = {
                    period: 6,
                    startTime: this.category

                  }
                  self.loadChart()

                  // console.log(this.inputs)
                  // this.subject.next(this.inputs)
                }
                //alert('Category: ' + this.category + ', value: ' + this.y);
                // thisComponent.showClientEfficencyChart();
                //thisComponent.modalRef = thisComponent.dialogService.open(thisComponent.showProbeStatusModal);
                //alert(2);
              }
            }
          }
        }
      },
      // plotOptions: {
      //   series: {
      //     maxPointWidth: 20,
      //     borderRadius: 0
      //   },
      // },
      series: [
        {
          type: 'line',
          name: '',
          data: (homeefficiency || []),
          color: '#0a77fb',
          showInLegend: false,
        }
      ]
    };
  }


  mapWholeHomeEfficencyChartData(data) {
    let categories = [], download = [], upload = [], homeefficiency = [];

    const mapKey = this.TimeFrame == 1 ? 'dailyAverageScore' : 'rawData';
    (data[mapKey] || []).forEach(obj => {
      const date = obj.date;
      let y = date.substring(0, 4), m = date.substring(6, 4), d = date.substring(6,);
      let dateWithSlash = m + '/' + d + '/' + y;
      const time = obj.time;
      // const dt = moment((time.substr(0, 2) + ':' + time.substr(2, 4)), ["HH:mm"]).format("hh:mm A");
      //let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substr(0, 2) + ':' + time.substr(2, 4)));
      // categories.push(dt);
      let fullDateTime;
      let year = date.substring(2, 4)
      let dateWithSlashyear = m + '/' + d + '/' + year;
      let fullDate = (dateWithSlash + ' ' + (this.TimeFrame == 1 ? '' : time.substring(0, 2) + ':' + time.substring(2, 4)));
      if (this.TimeFrame == 1) { //daily data
        fullDate = dateWithSlash
        categories.push(fullDate);
      } else if (this.TimeFrame == 4) {
        fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
        categories.push(fullDateTime);
        // this.category.push(fullDateTime)
      } else if (this.TimeFrame == 2) {
        const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
        fullDateTime = (dateWithSlashyear + ' ' + moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A"));
        fullDate = dt;
        categories.push(fullDateTime);
      }
      else {
        const dt = moment((time.substring(0, 2) + ':' + time.substring(2, 4)), ["HH:mm"]).format("hh:mm A");
        fullDate = dt;
        categories.push(dt);
      }
      // Math.round(obj.eff_score); 
      const roundedScore = parseInt(obj.eff_score.toString().substring(0, 5))
      homeefficiency.push(roundedScore);
    });
    return [categories, homeefficiency];

  }


  filterContent() {
    this.effDash = !this.effDash;
    Highcharts.chart('wholeHomeEfficiencyChart', this.wholeHomeEfficiencyOption(this.effDash ? this.homeRes : { rawData: [] }));
  }


  selectedInterval: any;
  timeIntervalOptions: Options = {
    hideLimitLabels: true,
    onlyBindHandles: true,
    stepsArray: [],
  };
  showIntervalSlider = false;
  timeIntervals = [];
  lastdays15MinOfValues() {
    if (history?.state?.endTime) {
      if (this.TimeFrame == 7) {

        let date = new Date();
        let coeff = 1000 * 60;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
        // let startTime = moment(lastTime).subtract(168, "hours");
        // let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).startOf('day')
        // lastTime.add(1, 'day');
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);

        startTime1 = moment(startTime1).add(1, 'day');
        this.timeIntervals = [];
        // lastTime1 = moment(lastTime).subtract(1, 'day');
        let current = moment(startTime1);

        let i = 0;
        while (current <= lastTime) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);
          current.add(1, 'day');
          // let lasttime = Math.floor((lastTime["_d"].getHours() - current['_d'].getHours()));
          // if (current['_d'].getDate() >= lastTime["_d"].getDate()) {
          //   current.add(lasttime, 'hours')
          // }
          if (current > lastTime) {
            let lasttime = lastTime["_d"]
            this.timeIntervals.push({
              value: i + 1, legend: moment(lasttime).format('MM/DD/YYYY HH:mm'),
              date: moment(lasttime).toDate()
            });
          }
          i++;
        }


        this.calcOf15minVal()


      }
      else if (this.TimeFrame == 4) {

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
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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


          this.calcOf15minVal();
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
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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

          this.calcOf15minVal();

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
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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

          this.calcOf15minVal();



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
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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

          this.calcOf15minVal();
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
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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

          this.calcOf15minVal();


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

          const minToRoundOf24hr = Math.ceil(
            (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
            / (1000 * 60 * 60)
          ) > 24 ? 15 : 30;
          // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
          lastTime1 = moment(lastTime1).subtract(180, 'minutes');
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




          this.calcOf15minVal();
        } else if (i == 7) {
          {
            let date = new Date();
            let coeff = 1000 * 60;
            let timeDuration = -24 * 60;
            let lastUpdatedTime;
            let that = this;
            let len = 0;

            let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
            let startTime = moment(lastTime).subtract(144, "hours");
            startTime1 = new Date(startTime['_d'].setHours(144, 0, 0, 0))
            // lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))

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
            let lasttime;
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
            this.calcOf15minVal()
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

      } else {
        let date = new Date();
        let coeff = 1000 * 60 * 15;
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;

        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
        let startTime = moment(lastTime).subtract(24, "hours");
        let currentTimestamp = new Date().setSeconds(0, 0);
        // let currentTimestamp = history?.state?.endTime

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

        this.calcOf15minVal()

      }
    } else {
      if (this.TimeFrame == 4) {
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
            let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
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
            // startTime1 = moment(startTime1).add(180, 'minutes'); // omitting first 0th minute 

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
                end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');

              }
              else {
                // start = pointersTime.subtract(minToRoundOf24hr, 'minutes').format('MMM DD hh:mm A');
                start = moment(this.timeIntervals[len - 2].date).format('MMM DD hh:mm A')
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
      } else if (this.TimeFrame == 7) {
        let date = new Date();
        let coeff = 1000 * 60
        let timeDuration = -24 * 60;
        let lastUpdatedTime;
        let that = this;
        let len = 0;
        let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).minutes(0).seconds(0).milliseconds(0);
        // let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).startOf('day');
        // startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
        // lastTime1 = new Date(startTime['_d'].setHours(24, 0, 0, 0))
        let startTime = moment(lastTime).subtract(144, "hours");
        startTime1 = new Date(startTime['_d'].setHours(0, 0, 0, 0))
        let currentTimestamp = new Date().setSeconds(0, 0);

        const minToRoundOf24hr = Math.ceil(
          (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
          / (1000 * 60 * 60)
        ) > 24 ? 30 : 15;
        // startTime = moment(startTime).add(minToRoundOf24hr, 'minutes'); // omitting first 0th minute 
        startTime1 = moment(startTime1).add(1, 'day');
        this.timeIntervals = [];
        let current = moment(startTime1);
        let now = moment();
        let i = 0;
        while (current <= lastTime) {
          this.timeIntervals.push({
            value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
            date: moment(current).toDate()
          });
          lastUpdatedTime = moment(current);

          current.add(1, 'day');
          // let lasttime = Math.floor((lastTime["_d"].getHours() - current['_d'].getHours()));
          // if (current['_d'].getDate() >= lastTime["_d"].getDate()) {
          //   current.add(lasttime, 'hours')
          // }
          if (current > lastTime) {
            let lasttime = lastTime["_d"]
            this.timeIntervals.push({
              value: i + 1, legend: moment(lasttime).format('MM/DD/YYYY HH:mm'),
              date: moment(lasttime).toDate()
            });
          }
          i++;
        }

        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(1, 'day').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start
          let end
          if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 24 == 0) {
            start = pointersTime.subtract(1, 'day').format('MMM DD hh:mm A');
            end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')

          }
          else {
            // start = pointersTime.subtract(minToRoundOf24hr, 'minutes').format('MMM DD hh:mm A');
            start = moment(this.timeIntervals[len - 2].date).format('MMM DD hh:mm A')
            end = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A')
          }



          return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(1, 'day').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      }
      else {

        let date = new Date();
        let coeff = 1000 * 60 * 15;
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
      }
    }
  }


  calcOf15minVal() {
    if (this.TimeFrame == 7) {
      let len = 0;
      let timeDuration = -24 * 60;
      let that = this;
      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      let qoeEndTime = moment(history?.state?.endTime[1]);
      let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
      if (index === -1) {
        //If time not matches and when new time ranges came while user coming to this page
        let first = moment(this.timeIntervals[0].date);
        let last = moment(this.timeIntervals[len - 1].date);
        this.timeIntervals[0].date;
        let j = 0;
        let newIntervals = [];

        if (qoeEndTime < first) {
          //if qoe time is lesser than first value
          while (qoeEndTime < first) {
            newIntervals.push({
              value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
              date: moment(qoeEndTime).toDate()
            });
            qoeEndTime.add(24, 'hours');
            j++;
          }
          let newLen = newIntervals.length;
          this.timeIntervals.map(t => t.value = t.value + newLen);
          this.timeIntervals = [...newIntervals, ...this.timeIntervals];
          index = 0;
        } else if (qoeEndTime < last) {

          index = len;
        }

      }

      this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start
        let end
        if (parseInt(this.timeIntervals[this.selectedInterval]?.legend.substring(11, 13) || "0") % 24 == 0) {
          start = moment(this.timeIntervals[this.selectedInterval].date).subtract(1, 'day').format('MMM DD hh:mm A')

          end = moment(this.timeIntervals[this.selectedInterval].date).format('MMM DD hh:mm A')

        }
        else {
          start = moment(this.timeIntervals[this.selectedInterval - 1].date).format('MMM DD hh:mm A')
          end = moment(this.timeIntervals[this.selectedInterval].date).format('MMM DD hh:mm A')
        }

        return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
      };
      this.timeIntervalOptions.translate = translate;


      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(24, 'hours').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');

      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)


    } else if (this.TimeFrame == 4) {
      var wkFrm = this.WeekFrame
      var z = this.WeekFrame
      // for (var z = 1; z <= 7; z++) {

      if (z == 1) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        // this.lastSeventhDay = moment(this.timeIntervals[0].date).format('dddd');

        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (z == 2) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        // this.lastSixthDay = moment(this.timeIntervals[0].date).subtract(120, 'hours').format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (z == 3) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        // this.lastfifthDay = moment(this.timeIntervals[0].date).subtract(96, 'hours').format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (z == 4) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        // this.lastFourthDay = moment(this.timeIntervals[0].date).subtract(72, 'hours').format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      } else if (z == 5) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        // this.lastThirdDay = moment(this.timeIntervals[0].date).subtract(48, 'hours').format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      }
      else if (z == 6) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[0]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(180, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);
          // let start = pointersTime.subtract(165, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
          let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A')
          let end = pointersTime.add(165, 'minutes').format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).add(180, 'minutes').format('MMM DD hh:mm A');
        //  this.yesterDay = moment(this.timeIntervals[0].date).subtract(24, 'hours').format('dddd');

        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      }
      else if (z == 7) {
        let len = 0;
        let timeDuration = -24 * 60;
        let that = this;
        len = this.timeIntervals.length;
        this.selectedInterval = this.timeIntervals[len - 1].value;
        //  if (history?.state?.endTime) {
        let qoeEndTime = moment(history?.state?.endTime[2]);
        let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
        if (index === -1) {
          //If time not matches and when new time ranges came while user coming to this page
          let first = moment(this.timeIntervals[0].date);
          let last = moment(this.timeIntervals[len - 1].date);
          this.timeIntervals[0].date;
          let j = 0;
          let newIntervals = [];

          if (qoeEndTime < first) {
            //if qoe time is lesser than first value
            while (qoeEndTime < first) {
              newIntervals.push({
                value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
                date: moment(qoeEndTime).toDate()
              });
              qoeEndTime.add(15, 'minutes');
              j++;
            }
            let newLen = newIntervals.length;
            this.timeIntervals.map(t => t.value = t.value + newLen);
            this.timeIntervals = [...newIntervals, ...this.timeIntervals];
            index = 0;
          } else if (qoeEndTime < last) {
            index = len;
          }

        }

        this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


        this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
        const translate = (value: number, label: LabelType): string => {
          let pointersTime = moment(that.timeIntervals[value]['date']);

          if (parseInt(this.timeIntervals[this.selectedInterval].legend.substring(11, 13) || "0") % 3 == 0) {
            var start
            var end
            start = pointersTime.subtract(180, 'minutes').format('MMM DD hh:mm A');
            end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');

          }
          else {
            // start = pointersTime.subtract(minToRoundOf24hr, 'minutes').format('MMM DD hh:mm A');
            start = moment(this.timeIntervals[len - 2].date).format('MMM DD hh:mm A')
            end = moment(that.timeIntervals[value]['date']).subtract(15, 'minutes').format('MMM DD hh:mm A');
          }
          // let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
          // let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
          return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
        };
        this.timeIntervalOptions.translate = translate;


        this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
        this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
        // this.toDay = moment(this.timeIntervals[0].date).format('dddd');
        setTimeout(() => {
          this.showIntervalSlider = true;
          setTimeout(() => {
            $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
          }, 10);
        }, 1000)
      }

      // }



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


    } else {
      let len = 0;
      let timeDuration = -24 * 60;
      let that = this;
      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      //  if (history?.state?.endTime) {
      let qoeEndTime = moment(history?.state?.endTime[1]);
      let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
      if (index === -1) {
        //If time not matches and when new time ranges came while user coming to this page
        let first = moment(this.timeIntervals[0].date);
        let last = moment(this.timeIntervals[len - 1].date);
        this.timeIntervals[0].date;
        let j = 0;
        let newIntervals = [];

        if (qoeEndTime < first) {
          //if qoe time is lesser than first value
          while (qoeEndTime < first) {
            newIntervals.push({
              value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
              date: moment(qoeEndTime).toDate()
            });
            qoeEndTime.add(15, 'minutes');
            j++;
          }
          let newLen = newIntervals.length;
          this.timeIntervals.map(t => t.value = t.value + newLen);
          this.timeIntervals = [...newIntervals, ...this.timeIntervals];
          index = 0;
        } else if (qoeEndTime < last) {
          //if qoe time is lesser than last value

          // this.timeIntervals[len - 1] = {
          //   value: len - 1, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
          //   date: moment(qoeEndTime).toDate()
          // }
          // this.timeIntervals[len] = {
          //   value: len, legend: moment(last).format('MM/DD/YYYY HH:mm'),
          //   date: moment(last).toDate()
          // }

          //let inssertIndex = 
          // for (let k = 0; k < len; k++) {

          // }
          index = len;
        }

      }

      this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;
      // console.log(index);
      // console.log(this.selectedInterval);

      // }

      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
      };
      this.timeIntervalOptions.translate = translate;


      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(60, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');

      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    }
  }
  calcOf15minVal1() {
    {
      let len = 0;
      let timeDuration = -24 * 60;
      let that = this;
      len = this.timeIntervals.length;
      this.selectedInterval = this.timeIntervals[len - 1].value;
      //  if (history?.state?.endTime) {
      let qoeEndTime = moment(this.inputs.startTime);
      let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));
      if (index === -1) {
        //If time not matches and when new time ranges came while user coming to this page
        let first = moment(this.timeIntervals[0].date);
        let last = moment(this.timeIntervals[len - 1].date);
        this.timeIntervals[0].date;
        let j = 0;
        let newIntervals = [];

        if (qoeEndTime < first) {
          //if qoe time is lesser than first value
          while (qoeEndTime < first) {
            newIntervals.push({
              value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
              date: moment(qoeEndTime).toDate()
            });
            qoeEndTime.add(15, 'minutes');
            j++;
          }
          let newLen = newIntervals.length;
          this.timeIntervals.map(t => t.value = t.value + newLen);
          this.timeIntervals = [...newIntervals, ...this.timeIntervals];
          index = 0;
        } else if (qoeEndTime < last) {
          //if qoe time is lesser than last value

          // this.timeIntervals[len - 1] = {
          //   value: len - 1, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
          //   date: moment(qoeEndTime).toDate()
          // }
          // this.timeIntervals[len] = {
          //   value: len, legend: moment(last).format('MM/DD/YYYY HH:mm'),
          //   date: moment(last).toDate()
          // }

          //let inssertIndex = 
          // for (let k = 0; k < len; k++) {

          // }
          index = len;
        }

      }

      this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index + 1].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;
      // console.log(index);
      // console.log(this.selectedInterval);

      // }

      this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
      const translate = (value: number, label: LabelType): string => {
        let pointersTime = moment(that.timeIntervals[value]['date']);
        let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
        let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
        return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
      };
      this.timeIntervalOptions.translate = translate;


      this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
      this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');

      setTimeout(() => {
        this.showIntervalSlider = true;
        setTimeout(() => {
          $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
        }, 10);
      }, 1000)
    }
  }
  getISOString(time) {
    return time.toISOString().substr(0, 16) + ':00';
  }

}
