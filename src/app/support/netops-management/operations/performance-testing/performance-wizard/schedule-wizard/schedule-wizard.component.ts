import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { TimezoneService } from '../../../../../../shared/services/timezone.service';
import { Router } from '@angular/router';
import { DateUtilsService } from '../../../../../../shared-utils/date-utils.service'
import { SsoAuthService } from '../../../../../../shared/services/sso-auth.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-schedule-wizard',
  templateUrl: './schedule-wizard.component.html',
  styleUrls: ['./schedule-wizard.component.scss']
})
export class ScheduleWizardComponent implements OnInit {
  language: any;
  languageSubject;
  customStartRange: any = new Date();
  pTime = new Date();

  dataPbitInput = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 }
  ];

  dataHoursInp = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 }
  ];

  minStartDate = new Date();

  @Input() inputData
  @Output() outputdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  oprTypeValueSelected
  startDate = new Date()
  noDays: any = 7;
  startHour: any;
  numberOfHours: any = 6;
  timezones = [];
  exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  maintenanceTuesdays = []
  maintenancedaysforTopshow = []
  isInCompleteDate: boolean = false;
  selectedDate: any;
  selectedDateNextDay: any;
  start_date: any;
  errMsg: any;
  isInCompleteTime: any;
  betweendatesStart: any;
  betweendatesEnd: any;
  selectedYear: any;
  public tzDate: moment.Moment;
  constructor(private translateService: TranslateService,
    private router: Router,
    private utils: TimezoneService,
    private dateUtils: DateUtilsService,
    private sso: SsoAuthService
  ) {

  }

  timezone = 'America/Los_Angeles';
  ngOnInit(): void {
    this.timezones = this.utils.getTimeZones();

    let localTimeZone = this.dateUtils.getLocalTimeZoneName();
    let findTZ = this.timezones.find(zone => zone.name == localTimeZone);

    if (findTZ) {
      //this.timezone = localTimeZone;
    } else {
      this.timezones.push({
        id: localTimeZone,
        name: localTimeZone
      });
    }

    this.timezones.unshift({
      id: '',
      name: ''
    });

    this.timezone = localTimeZone;

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    if (this.inputData['timezone']) {
      this.timezone = this.inputData['timezone'];
    }

    if (this.inputData['startDate']) {
      this.startDate = this.inputData['startDate'];
    }

    if (this.inputData['numberOfDays']) {
      this.noDays = this.inputData['numberOfDays'];
    }

    if (this.inputData['startHour']) {
      this.startHour = `${this.inputData['startHour'] ? this.inputData['startHour'] : '18'}:00`;
      // let d = new Date();
      // d = new Date(d.setHours(this.inputData['startHour']));

      // this.startHour = d;
    } else {
      this.startHour = `${this.inputData['startHour'] ? this.inputData['startHour'] : '18'}:00`;

    }



    if (this.inputData['numberOfHours']) {
      this.numberOfHours = this.inputData['numberOfHours'];
    }
    const d = new Date();
    // let currentYear = d.getFullYear();
    this.getYearfromDate(this.startDate);
    this.checkMaintenanceWarning();
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  go_next() {
    let pipe: DatePipe = new DatePipe('en-US');

    if (!this.timezone) {
      this.showError();
      return;
    }

    if (!this.startDate) {
      this.showError();
      return;
    }

    if (!this.noDays) {
      this.showError();
      return;
    }

    if (!this.startHour) {
      this.showError();
      return;
    }

    if (!this.numberOfHours) {
      this.showError();
      return;
    }

    let hourArr = this.startHour.split(":");



    if (this.inputData.levelPassed <= 4) {
      this.inputData.levelPassed = 4;
    }

    this.inputData['timezone'] = this.timezone;
    this.inputData['startDate'] = pipe.transform(this.startDate, 'yyyy-MM-dd');
    this.inputData['numberOfDays'] = this.noDays;
    this.inputData['startHour'] = hourArr[0]; //pipe.transform(this.startHour, 'H');
    this.inputData['numberOfHours'] = this.numberOfHours;
    this.outputdata.emit(this.inputData);
    this.activeTab.emit('Review');
    return true;
  }

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showSuccess(): void {
    this.closeAlert();
    this.success = true;
  }

  showError(): void {
    this.closeAlert();
    this.error = true;
  }

  gotoPrevious() {
    let hourArr = this.startHour.split(":");

    let pipe: DatePipe = new DatePipe('en-US');
    this.inputData['timezone'] = this.timezone;
    this.inputData['startDate'] = pipe.transform(this.startDate, 'yyyy-MM-dd');
    this.inputData['numberOfDays'] = this.noDays
    this.inputData['startHour'] = hourArr[0];;
    this.inputData['numberOfHours'] = this.numberOfHours;
    this.outputdata.emit(this.inputData);
    this.activeTab.emit('TestServerDetails');
  }

  reload(): any {
    if (window.location.href?.indexOf('/cco/operations/configuration/performance-testing') !== -1) {
      this.router.navigate(['./cco/operations/configuration/performance-testing']);
      return;
    }
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing`,
      `cco/operations/cco-system-operations/performance-testing`, '',
      `/cco/operations/cco-subscriber-operations/operations/performance-testing`
    ]);
  }


  // Check maintenance day with date and time
  /*checkMaintenanceWarning2() {
    this.isInCompleteDate = false;
    console.log("timezone", this.timezone);
    console.log("startdate", this.startDate);
    let convertedstartDate = moment(this.startDate).tz('America/Los_Angeles').toString()
    console.log("convertedstartDate", convertedstartDate)
    //let convertedstartDatewithtimezone = moment(this.startDate).tz(this.timezone).toString()
    // console.log("convertedstartDatewithtimezone",convertedstartDatewithtimezone)


    // moment.tz.setDefault(this.timezone);
    // console.log("moment default timezone", moment.tz.setDefault(this.timezone));
    //let dateStr = '2023-03-14';
    // let timeStr = '18:00';
    // var timeAndDate = moment(dateStr + ' ' + timeStr);
    // let timeAndDate = moment(dateStr + ' ' + timeStr).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    // let formatteddate=new Date(timeAndDate)

    //console.log("timeAndDate",  formatteddate , "type", typeof(formatteddate));

    // var ddd = timeAndDate.format('Y-MM-DD HH:mm Z');
    // console.log("tzDate without date conversion", ddd);
    // console.log("tzDate", new Date(ddd));
    // var date = "2017-03-13";
    // var time = "18:00";

    //var timeAndDate = moment(date + ' ' + time);

    //console.log("timeAndDate2",timeAndDate);
    // this.tzDate = moment(currentTime);
    //this.tzDate = timeAndDate;
    // let ddd = JSON.parse(timeAndDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
    //let aaa = ddd.toString()
    // console.log("txDAte",aaa, typeof(aaa),)

    this.getYearfromDate(this.startDate);
    this.getMaintenanceDays(this.selectedYear);
    let valid_days = parseInt(this.noDays);
    let no_of_hours = parseInt(this.numberOfHours)
    let startHourSplit = this.startHour.split(':');
    console.log("startdate", this.startDate);

    // this.startDate.setHours(parseInt(startHourSplit[0]),parseInt(startHourSplit[1]), parseInt('00'));
    this.start_date = new Date(this.startDate.toLocaleString("en-US", { timeZone: this.timezone }));

    console.log("startdate2", this.startDate)

    let convertedstartDate2 = new Date(convertedstartDate);
    console.log("convertedstartDate2", convertedstartDate2)

    //console.log("start date", this.start_date);

    // this.start_date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

    // let date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    // console.log('Given IST datetime: ', date);

    // let intlDateObj = new Intl.DateTimeFormat('en-US', {
    //     timeZone: "America/New_York"
    // });

    // let usaTime = intlDateObj.format(date);
    // console.log('USA date: ', usaTime);


    let end_date = new Date(this.start_date); // pass start date here
    console.log("end_date", end_date)
    end_date.setDate(end_date.getDate() + valid_days);
    console.log("end_date2", end_date)
    this.betweendatesStart = this.getDates(this.start_date, end_date)?.map(e => e.toString());
    console.log("this.betweendatesStart", this.betweendatesStart)
    this.betweendatesStart.forEach(element => {
      console.log("betweendatesStart", this.betweendatesStart)
      let btDt = new Date(element);
      console.log("btDt", btDt)
      let betweenDateStart = new Date(btDt.setHours(parseInt(startHourSplit[0]), parseInt(startHourSplit[1]), parseInt('00')));
      console.log("betweenDateStart", betweenDateStart)
      let betweenDateStartpst = new Date(betweenDateStart.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      console.log("betweenDateStartpst", betweenDateStartpst);

      let betweenDateStartHour = betweenDateStartpst.getHours();
      console.log("betweenDateStartHour", betweenDateStartHour);

      betweenDateStartpst.setHours(0, 0, 0, 0);
      console.log("betweenDateStartpst", betweenDateStartpst);
      console.log("betweenDateStartpst.gettime", betweenDateStartpst.getTime());
      console.log("betweenDateStartpst.gettimemoment", moment(betweenDateStartpst).valueOf());


      let betweenDateEnd = new Date(btDt.setHours(btDt.getHours() + no_of_hours));
      console.log("betweenDateEnd", betweenDateEnd);

      let betweenDateEndpst = new Date(betweenDateEnd.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      console.log("betweenDateEndpst", betweenDateEndpst);
      let betweenDateEndHour = betweenDateEndpst.getHours();
      console.log("betweenDateEndHour", betweenDateEndHour);

      betweenDateEndpst.setHours(0, 0, 0, 0);
      console.log("betweenDateEndpst", betweenDateEndpst);

      console.log("maintenanceTuesdays", this.maintenanceTuesdays);

      this.maintenanceTuesdays.forEach(DtElement => {
        console.log("maintenanceTuesdays element", DtElement)
        let btDt = new Date(DtElement);
        console.log("btDt", btDt)
        let maintenanceStartpst = new Date(btDt.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
        console.log("maintenanceStartpst", maintenanceStartpst)
        maintenanceStartpst.setFullYear(btDt.getFullYear(), btDt.getMonth(), btDt.getDate());
        console.log("maintenanceStartpst2", maintenanceStartpst)

        let maintenanceStart = new Date(maintenanceStartpst.setHours(parseInt('21')));
        console.log("maintenanceStart", maintenanceStart)
        console.log("maintenanceStart.gettime", maintenanceStart.getTime())

        let maintenanceStartHour = maintenanceStart.getHours();
        maintenanceStart.setHours(0, 0, 0, 0);
        let maintenanceEnd = new Date(maintenanceStartpst.setHours(maintenanceStartpst.getHours() + 6));
        console.log("maintenanceEnd", maintenanceEnd)

        let maintenanceEndHour = maintenanceEnd.getHours();
        maintenanceEnd.setHours(0, 0, 0, 0);
        console.log("maintenanceEnd2", maintenanceEnd)


        const mainTimeInter = betweenDateStartpst.getTime() == maintenanceStart.getTime() ? [21, 22, 23] : [0, 1, 2, 3];
        console.log("mainTimeInter", mainTimeInter)

        if (((betweenDateStartpst.getTime() < maintenanceStart.getTime() && maintenanceEnd.getTime() < betweenDateEndpst.getTime())
          || ([maintenanceStart.getTime(), maintenanceEnd.getTime()].includes(betweenDateStartpst.getTime()) || [maintenanceStart.getTime(), maintenanceEnd.getTime()].includes(betweenDateEndpst.getTime())))
          && (mainTimeInter.includes(betweenDateStartHour) || mainTimeInter.includes(betweenDateEndHour))
        ) {
          let pipe: DatePipe = new DatePipe('en-US');
          this.selectedDate = pipe.transform(maintenanceStart, 'yyyy-MM-dd')
          this.errMsg = this.selectedDate;
          this.isInCompleteDate = true;
          console.log("Calix Cloud Maintenanc day");
        }
      })
    });
    //     this.selectedDate = this.maintenanceTuesdays.find(element => this.betweendatesStart.includes(element.toString()))
    //     this.selectedDateNextDay = this.maintenanceWednesdays.find(element => this.start_date==(element.toString()))
    //     //this.arrvalue = this.maintenanceTuesdays.filter(element => betweendates.includes(element)).filter((element, index, self) => self.indexOf(element) === index)
    //     //  console.log("Selected Date", this.selectedDate);
    //     //  console.log("Selected Date Next Day", this.selectedDateNextDay);
    //      var pstDate:any = this.startHour.toLocaleString("en-US", {
    //       timeZone: "America/New_York"
    //     }).toString().split(':').map(e=> Number(e))
    //     // console.clear();
    //     // console.log('the time converted',pstDate)
    //     pstDate = pstDate[1] + pstDate[0] * 60;
    //     // console.log("pstdate",pstDate);
    //   let maintenanceStartHour:any = 1260 , endpst = pstDate + this.numberOfHours * 60;
    //   console.log("endpst",endpst);
    //   let maintenanceEndHour:any = 180;
    //   let maintenanceStartHourNextDay = 0
    //   if(this.selectedDateNextDay) {
    //     if((pstDate >= maintenanceStartHourNextDay || pstDate <= maintenanceEndHour ) || (endpst >= maintenanceStartHourNextDay || endpst <= maintenanceEndHour)){
    //       this.isInCompleteTime = true;
    //       console.log("isInCompleteTime is true");     
    //    }
    //   } else {
    //   if((pstDate >= maintenanceStartHour || pstDate <= maintenanceEndHour ) || (endpst >= maintenanceStartHour || endpst <= maintenanceEndHour)){
    //      this.isInCompleteTime = true;
    //      console.log("isInCompleteTimeset is true");     
    //   }
    //   else {
    //       this.isInCompleteTime = false;
    //       console.log("isInCompleteTime is false");
    //   }
    // }
    //   if (this.selectedDate || this.selectedDateNextDay) {
    //     let pipe: DatePipe = new DatePipe('en-US');
    //     this.selectedDate = pipe.transform(this.selectedDate, 'yyyy-MM-dd')
    //     this.isInCompleteDate = true;
    //     this.errMsg = this.selectedDate;
    //      console.log("Calix Cloud Maintenanc day");
    //   }
    //   else {
    //     this.isInCompleteDate = false;
    //     this.errMsg = "";
    //     console.log("Not a Calix Cloud Maintenanc day");
    //   }
  }*/

  checkMaintenanceWarning() {
    //checkMaintenanceWarningusingmoment() {    

    this.isInCompleteDate = false;
    //console.log("timezone", this.timezone);
    //console.log("startdate", this.startDate);
    let convertedstartDatetotimezone = moment(this.startDate).tz(this.timezone).toString()
    //console.log("convertedstartDate", convertedstartDatetotimezone)

    this.minStartDate = new Date(moment.tz(moment(), this.timezone).format('YYYY-MM-DD HH:mm'));
    this.getYearfromDate(this.startDate);
    this.getMaintenanceDays(this.selectedYear);
    let valid_days = parseInt(this.noDays);
    let no_of_hours = parseInt(this.numberOfHours)
    let startHourSplit = this.startHour.split(':');
    //console.log("startdate", this.startDate);

    this.start_date = new Date(this.startDate);//new Date(this.startDate.toLocaleString("en-US", { timeZone: this.timezone }));

    //console.log("startdate2", this.startDate)


    let end_date = new Date(this.start_date); // pass start date here
    //console.log("end_date", end_date)
    end_date.setDate(end_date.getDate() + valid_days);
    // console.log("end_date2", end_date)
    this.betweendatesStart = this.getDates(this.start_date, end_date)?.map(e => e.toString());
    //console.log("this.betweendatesStart", this.betweendatesStart)

    this.betweendatesStart.forEach(element => {
      // console.log("betweendatesStart", this.betweendatesStart)
      let btDt = new Date(element);
      // console.log("btDt", btDt)
      // console.log("startHour", this.startHour)
      // console.log("startHour", parseInt(startHourSplit[0]), "parseInt(startHourSplit[1])", parseInt(startHourSplit[1]))

      let betweenDateStart = new Date(btDt.setHours(parseInt(startHourSplit[0]), parseInt(startHourSplit[1]), parseInt('00')));
      // console.log("betweenDateStart", betweenDateStart)

      let betweedndatestart = moment(new Date(betweenDateStart))
      // console.log("betweedndatestart", betweedndatestart.toString());

      let betweenDateStarttimezone = betweedndatestart.tz(this.timezone, true).toString();

      //let betweenDateStarttimezone = moment(betweenDateStart).tz(this.timezone).toString()
      // console.log("betweenDateStarttimezone", betweenDateStarttimezone);

      let betweenDateStartpst = moment(betweenDateStarttimezone).tz('America/Los_Angeles')
      //  console.log("betweenDateStartpst", betweenDateStartpst.toString());

      let betweenDateStartHour = moment.utc(betweenDateStartpst).hour()
      //  console.log("betweenDateStartHour", betweenDateStartHour);

      moment(betweenDateStartpst).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).toString();
      //  console.log("betweenDateStartpst", betweenDateStartpst.toString());

      let betweenDateEnd = new Date(btDt.setHours(btDt.getHours() + no_of_hours));
      let betweedndateend = moment(new Date(betweenDateEnd))
      // console.log("betweenDateEnd", betweenDateEnd);
      // console.log("betweedndateend", betweedndateend.toString());

      //let betweenDateEndpsttimezone = moment(betweenDateEnd).tz(this.timezone).toString();
      //console.log("betweenDateEndpsttimezone", betweenDateEndpsttimezone);

      let betweenDateEndpsttimezone = betweedndateend.tz(this.timezone, true).toString();
      //  console.log("betweenDateEndpsttimezone2", betweenDateEndpsttimezone);

      let betweenDateEndpst = moment(betweenDateEndpsttimezone).tz('America/Los_Angeles');
      //  console.log("betweenDateEndpst", betweenDateEndpst.toString());
      let betweenDateEndHour = moment.utc(betweenDateEndpst).hour()
      //  console.log("betweenDateEndHour", betweenDateEndHour);
      moment(betweenDateEndpst).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).toString();
      //  console.log("betweenDateEndpst", betweenDateEndpst.toString());

      //  console.log("maintenanceTuesdays", this.maintenanceTuesdays);

      this.maintenanceTuesdays.forEach(DtElement => {
        //    console.log("maintenanceTuesdays element", DtElement)
        let btDt = moment(new Date(DtElement));
        //    console.log("btDt", btDt.toString())
        let maintenanceStartpst = btDt.tz('America/Los_Angeles', true).toString();
        //let maintenanceStartpst = moment(btDt).tz('America/Los_Angeles');
        //    console.log("maintenanceStartpst1", maintenanceStartpst)
        // maintenanceStartpst.setFullYear(btDt.getFullYear(),btDt.getMonth(),btDt.getDate());
        // console.log("maintenanceStartpst2", maintenanceStartpst)

        let maintenanceStart1 = moment(maintenanceStartpst).set({
          hour: 19,
          minute: 30,
          second: 0,
          millisecond: 0,
        })
        //  let maintenanceStart1 = moment(maintenanceStartpst).set("hour", 21);
        //    console.log("maintenanceStart1", maintenanceStart1.toString())
        let maintenanceStart = maintenanceStart1.tz('America/Los_Angeles', true)

        //    console.log("maintenanceStart", maintenanceStart.toString())

        let maintenanceStartHour = moment(maintenanceStart).hour()
        moment(maintenanceStart).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toString();
        //   console.log("maintanancestart2", maintenanceStart.toString())
        let maintenanceEndgethr = moment(maintenanceStart).hour()//moment.utc(maintenanceStart).hour() //moment(maintenanceStartpst).hour()
        //    console.log("maintenanceEndgethr", maintenanceEndgethr)
        //////////////////
        /*
        let betweenDateEnd = new Date(btDt.setHours(btDt.getHours() + no_of_hours));
        let betweedndateend=moment(new Date(betweenDateEnd))
        console.log("betweenDateEnd", betweenDateEnd);
        console.log("betweedndateend", betweedndateend.toString());
        
        //let betweenDateEndpsttimezone = moment(betweenDateEnd).tz(this.timezone).toString();
        //console.log("betweenDateEndpsttimezone", betweenDateEndpsttimezone);
        
        let betweenDateEndpsttimezone = betweedndateend.tz(this.timezone, true).toString();
        console.log("betweenDateEndpsttimezone2", betweenDateEndpsttimezone);
        
        let betweenDateEndpst = moment(betweenDateEndpsttimezone).tz('America/Los_Angeles').toString();
        console.log("betweenDateEndpst", betweenDateEndpst);
        let betweenDateEndHour = moment.utc(betweenDateEndpst).hour()
        console.log("betweenDateEndHour", betweenDateEndHour);
        */
        ///////////////////

        /*console.log("maintenanceEnd1 moen", moment(maintenanceStartpst).set({
          hour: maintenanceEndgethr + 6,
          minute: 0,
          second: 0,
          millisecond: 0,
        }))*/
        let maintenanceEnd1 = moment(maintenanceStartpst).set({
          hour: maintenanceEndgethr + 8,
          minute: 30,
          second: 0,
          millisecond: 0,
        })
        // let maintenanceEnd1 = moment(maintenanceStartpst).set("hour", maintenanceEndgethr + 6)
        //console.log("maintenanceEnd1", maintenanceEnd1.toString())

        let maintenanceEnd = maintenanceEnd1.tz('America/Los_Angeles', true)
        //console.log("maintenanceEnd", maintenanceEnd.toString())

        let maintenanceEndHour = moment(maintenanceEnd).hour()
        moment(maintenanceEnd).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toString();

        //console.log("maintenanceEnd2", maintenanceEnd.toString())
        //console.log("values of betweenDateStartpst ", moment(betweenDateStartpst).valueOf(), "maintenanceStart", moment(maintenanceStart).valueOf())
        const mainTimeInter = moment(betweenDateStartpst).valueOf() == moment(maintenanceStart).valueOf() ? [21, 22, 23] : [0, 1, 2, 3];
        //console.log("mainTimeInter", mainTimeInter)



        /*console.log("betweenDateStartpst", (betweenDateStartpst).toString(), "maintenanceStart", (maintenanceStart).toString(), " maintenanceEnd", maintenanceEnd.toString(), "betweenDateEndpst", (betweenDateEndpst).toString(), "if condition",
          (moment(betweenDateStartpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000), moment(betweenDateEndpst).valueOf() / 1000 <= moment(maintenanceEnd).valueOf() / 1000, "second", ((moment(betweenDateStartpst).valueOf() / 1000) >= (moment(maintenanceStart).valueOf() / 1000) ? true : false))
          */

        let betweenDateStartpstformat = moment(betweenDateStartpst).format('YYYY-MM-DD')
        let maintenanceStartformat = moment(maintenanceStart).format('YYYY-MM-DD')
        let maintenanceEndformat = moment(maintenanceEnd).format('YYYY-MM-DD')
        let betweenDateEndpstformat = moment(betweenDateEndpst).format('YYYY-MM-DD')
        /*console.log("betweenDateStartpst", betweenDateStartpst.toString(), "betweenDateStartpst into format", betweenDateStartpstformat, "maintenanceStart", maintenanceStart.toString(), "maintenanceStart format", maintenanceStartformat, "maintenanceEnd", maintenanceEnd.toString(), "maintenanceEnd format", maintenanceEndformat, "betweenDateEndpst", betweenDateEndpst.toString(), "betweenDateEndpst format", betweenDateEndpstformat,
          "moment('2010-10-20').isSame('2010-10-22')", moment('2010-10-20').isSame('2010-10-22'), "moment('betweenDateStartpstformat').isSame('maintenanceStartformat')", moment(betweenDateStartpstformat).isSame(maintenanceStartformat))*/

        /* console.log("if condition", (((moment(betweenDateStartpstformat).isSame(maintenanceStartformat) || moment(betweenDateStartpstformat).isSame(maintenanceEndformat)) && ((moment(betweenDateStartpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 <= moment(betweenDateStartpst).valueOf() / 1000))) || ((moment(betweenDateEndpstformat).isSame(maintenanceStartformat) || moment(betweenDateEndpstformat).isSame(maintenanceEndformat)) && ((moment(betweenDateEndpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 <= moment(betweenDateEndpst).valueOf() / 1000)))),
           "((moment(betweenDateStartpstformat).isSame(maintenanceStartformat) || moment(betweenDateStartpstformat).isSame(maintenanceEndformat))", 
           (moment(betweenDateStartpstformat).isSame(maintenanceStartformat) || moment(betweenDateStartpstformat).isSame(maintenanceEndformat)), 
           " ((moment(betweenDateStartpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateStartpst).valueOf() / 1000)))",
           ((moment(betweenDateStartpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateStartpst).valueOf() / 1000)),
           "((moment(betweenDateEndpstformat).isSame(maintenanceStartformat) || moment(betweenDateEndpstformat).isSame(maintenanceEndformat))",
           (moment(betweenDateEndpstformat).isSame(maintenanceStartformat) || moment(betweenDateEndpstformat).isSame(maintenanceEndformat)), 
           " ((moment(betweenDateEndpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateEndpst).valueOf() / 1000)))",
           ((moment(betweenDateEndpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateEndpst).valueOf() / 1000)))*/
        //betweenDateStartpst>=maintenanceStart && maintenanceEnd <= betweenDateStartpst



        if (((moment(betweenDateStartpstformat).isSame(maintenanceStartformat) || moment(betweenDateStartpstformat).isSame(maintenanceEndformat)) && ((moment(betweenDateStartpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateStartpst).valueOf() / 1000))) || ((moment(betweenDateEndpstformat).isSame(maintenanceStartformat) || moment(betweenDateEndpstformat).isSame(maintenanceEndformat)) && ((moment(betweenDateEndpst).valueOf() / 1000 >= moment(maintenanceStart).valueOf() / 1000) && (moment(maintenanceEnd).valueOf() / 1000 >= moment(betweenDateEndpst).valueOf() / 1000)))) {
          let pipe: DatePipe = new DatePipe('en-US');
          this.selectedDate = maintenanceStartformat;//pipe.transform(maintenanceStart, 'yyyy-MM-dd')
          this.errMsg = this.selectedDate;
          this.isInCompleteDate = true;
          //  console.log("Calix Cloud Maintenanc day");
        }


        /*if (((moment(betweenDateStartpst).valueOf() < moment(maintenanceStart).valueOf() && moment(maintenanceEnd).valueOf() < moment(betweenDateEndpst).valueOf())
          || ([moment(maintenanceStart).valueOf(), moment(maintenanceEnd).valueOf()].includes(moment(betweenDateStartpst).valueOf()) || [moment(maintenanceStart).valueOf(), moment(maintenanceEnd).valueOf()].includes(moment(betweenDateEndpst).valueOf())))
          && (mainTimeInter.includes(betweenDateStartHour) || mainTimeInter.includes(betweenDateEndHour))
        ) {
          let pipe: DatePipe = new DatePipe('en-US');
          this.selectedDate = maintenanceStart;//pipe.transform(maintenanceStart, 'yyyy-MM-dd')
          this.errMsg = this.selectedDate;
          this.isInCompleteDate = true;
          console.log("Calix Cloud Maintenanc day");
        }*/
      })
    });
  }


  convertTimeZone(date, timeZone) {
    return new Date((typeof date === 'string' ? new Date(date) : date)
      .toLocaleString('en-US', { timeZone }))
  }

  // Get 2nd Tuesdays of the 2nd month of the quarter
  getSecondTuesdays(month, year) {
    var d = new Date(year, month, 1),
      tuesdays = [];

    d.setDate(d.getDate() + (9 - d.getDay()) % 7)
    while (d.getMonth() === month) {
      tuesdays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }

    // console.log("tuesdays", tuesdays);

    return tuesdays;
  }

  // Returns an array of dates between the two dates
  getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate < endDate) {
      currentDate.setHours("00");
      currentDate.setMinutes("00");
      currentDate.setSeconds("00");
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  // Get Calix Maintenance Dates(Second Tuesday of Second month of quarter)
  getMaintenanceDays(selecteYear) {
    this.maintenanceTuesdays = [];
    for (let i = 1; i < 12; i += 3) {
      let temp: any = this.getSecondTuesdays(i, selecteYear);
      this.maintenanceTuesdays.push(temp[1]);
    }
  }

  // Get Year from Selected Date
  getYearfromDate(startDate) {
    let selectedDate = new Date(startDate)
    this.selectedYear = selectedDate.getFullYear();
    //console.log("Selected Year", this.selectedYear);
  }

  getCurrentHour(): any {
    var d = new Date();
    return d.getHours();
  }

}