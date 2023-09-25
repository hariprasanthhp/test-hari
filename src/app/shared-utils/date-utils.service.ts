import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTime } from "luxon";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  getUtcTimeByBeforeDays(days) {
    ////console.log('13', days);
    let date = new Date();
    let newDate = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    return Math.floor((newDate).getTime() / 1000);
  }
  getUtcTimeByEndDate(dateObj, hrs, mins, sec) {
    dateObj.setHours(hrs);
    dateObj.setMinutes(mins);
    dateObj.setSeconds(sec);
    let date = new Date(dateObj);
    date.setDate(date.getDate() + 1);
    //console.log('27', date);
    return Math.floor((date).getTime() / 1000);
  }
  getCurrentUtcTime() {
    let date = new Date();

    return Math.floor((date).getTime() / 1000);
  }

  getUtcTimeByDate(dateObj, hrs, mins, sec) {

    let pipe = new DatePipe('en-US');
    //console.log('27', dateObj);
    dateObj.setHours(hrs);
    dateObj.setMinutes(mins);
    dateObj.setSeconds(sec);
    //let dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    let date = new Date(dateObj);

    return Math.floor((date).getTime() / 1000);
  }

  getUserDateTime(dateObj, timezone) {

    let date = DateTime.fromISO(dateObj);
    var rezoned = date.setZone(timezone, {});

    //let datetime = rezoned.toString('yyyy-MM-dd HH:mm:ss');
    let datetime = rezoned.toString();
    let dateArr = datetime.split('.');
    let zonedTime = dateArr[0].replace('T', ' ');

    return zonedTime;

  }

  getMonthYear(dateObj) {
    dateObj = new Date(dateObj);
    let year = dateObj.getFullYear();
    let month = `${dateObj.getMonth() + 1}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    return `${month}/${year}`;
  }

  getChartFormat(time) {
    let dateObj = new Date(time * 1000);
    let pipe = new DatePipe('en-US');
    ////console.log(dateObj);
    let dateString = `${pipe.transform(dateObj, 'MM/dd HH:mm')}`;
    return dateString;
  }

  getIsoDate(date) {

    let dt = DateTime.fromISO(date);
    return dt.toISO();

  }

  timezoneDetected() {
    var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear());
    var intOffset = 10000;
    var intMonth;

    for (intMonth = 0; intMonth < 12; intMonth++) {
      dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);

      if (intOffset > (dtDate.getTimezoneOffset() * -1)) {
        intOffset = (dtDate.getTimezoneOffset() * -1);
      }
    }

    return intOffset * 60 * 1000 + this.getDSToffset();
  };
  getChartFormatDate(time, format?, nonUTC?) {
    let dateObj;
    if (typeof time == 'string') {
      dateObj = new Date(time);
    } else {
      if (nonUTC) {
        dateObj = new Date(time);
      } else {
        dateObj = new Date(time * 1000);
      }

    }

    let pipe = new DatePipe('en-US');
    let dateString = '';
    if (format) {
      dateString = `${pipe.transform(dateObj, format)}`;
    } else {
      dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    }

    return dateString;
  }

  getLocalTimeZoneName() {
    var local = DateTime.local();

    return local.zoneName;
  }

  getISODate(dt: any): any {
    let d = new Date(dt);
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  getUserDatefromIsoDate(isoDateString: any) {
    let epocSecs = (new Date(isoDateString)).getTime() + this.timezoneDetected();

    return moment(new Date(epocSecs).getTime()).format('DD-MMM-yyyy LTS');
  }

  getChartFormatDateInUtc(time, format?, nonUTC?) {
    return moment(time * 1000 - this.timezoneDetected()).format('MM/yyyy');
  }

  getChartFormatNew(time) {
    //return moment(time * 1000 - this.timezoneDetected()).format('MM/DD HH:mm');
    //let dateObj = new Date(time * 1000 - this.timezoneDetected());
    let dateObj = new Date(time * 1000);
    let pipe = new DatePipe('en-US');
    ////console.log(dateObj);
    let dateString = `${pipe.transform(dateObj, 'MM/dd HH:mm')}`;
    return dateString;
  }

  getOffsetInHoursAndMin() {
    let sec = this.timezoneDetected();
    sec = sec / 1000;

    if (Math.sign(sec) === 1) {
      return this.secondsToHms(sec);
    } else {
      return "-" + this.secondsToHms(Math.abs(sec));
    }
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h < 10 ? `0${h}` : h;
    var mDisplay = m < 10 ? `0${m}` : m;
    return hDisplay + "." + mDisplay;
  }

  getUserDateTimeByTimeZone(dateStr) {
    var local = DateTime.local();

    ////console.log(local.zoneName);
    let date = DateTime.fromISO(`${dateStr}`, { zone: `${local.zoneName}` });

    return date.toLocaleString();

  }


  getUserDateTimeByDateObj(dateObj: any) {

    let date = DateTime.fromJSDate(dateObj)
    return date.toISO({ includeOffset: false, suppressMilliseconds: true });

  }

  getTimeNow() {
    let dt = DateTime.local();
    let hour: any = (dt.hour).toString();
    let minute: any = (dt.minute).toString();
    let second: any = (dt.second).toString();

    if (hour.length < 2) {
      hour = `0${hour}`;
    }
    if (minute.length < 2) {
      minute = `0${minute}`;
    }

    if (second.length < 2) {
      second = `0${second}`;
    }


    return `${hour}:${minute}:${second}`;
  }

  currentDateToUTC() {
    let dt = new Date().toISOString();
    let a = dt.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  getCurrentLocalDateTimeString(format?) {
    let dateObj = new Date();
    let pipe = new DatePipe('en-US');
    let dateString = '';
    if (format) {
      dateString = `${pipe.transform(dateObj, format)}`;
    } else {
      dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    }

    return dateString;
  }

  getRealtimeDateFormat(time) {
    let date = DateTime.fromMillis(time);

    return date.toUTC().toFormat('d-MMM H:mm:ss')

  }

  getLocalRealtimeDateFormat(time) {
    let date = DateTime.fromMillis(time);

    return date.toLocal().toFormat('d-MMM H:mm:ss')

  }

  getUTCDateFormatFromUTCTime(time, utc?, format?) {
    if (utc) {
      time = parseInt(time) * 1000;
    }
    let date = DateTime.fromMillis(time);
    let dateString = '';
    if (format) {
      dateString = date.toUTC().toFormat(format);
    } else {
      dateString = date.toUTC().toFormat('MM/dd/yyyy');
    }
    return dateString;

  }

  getTodayDateStr() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getStartUtcTimeByDays(days) {
    if (!days) {
      return (new Date()).getTime();
    }
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis();
    if (this.isDST(new Date(millis))) {
      return ((millis - (days * 24 * 60 * 60 * 1000)) - this.timezoneDetected()) - 3600000;
    } else
      return (millis - (days * 24 * 60 * 60 * 1000)) - this.timezoneDetected();
  }
  getStartUtcTimeByDaysseconds(days) {
    if (!days) {
      return (new Date()).getTime();
    }
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis()
    return (millis - (days * 24 * 60 * 60 * 1000)) - this.timezoneDetected();;
  }
  getStartUtcTimeArrByDays(days) {
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis();
    let timestamps = [];
    for (let i = days; i >= 0; i--) {
      timestamps.push((millis - (i * 24 * 60 * 60 * 1000)))
    }

    return timestamps;
  }

  getStartUtcHoursTimeArrByDays(days) {
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis();
    let timestamps = [];
    for (let i = days; i >= 0; i--) {
      //timestamps.push((millis - (i * 24 * 60 * 60 * 1000)));

      let time = millis - (i * 24 * 60 * 60 * 1000);

      let hours = 24;

      if (i == 0) {
        var d = new Date();
        hours = d.getUTCHours() + 1;
      }

      for (let j = 0; j < hours; j++) {
        timestamps.push((time + (j * 60 * 60 * 1000)));
      }
    }

    return timestamps;
  }


  getStartUtcMinsTimeArrByDays(days) {
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis();
    let timestamps = [];
    for (let i = days; i >= 0; i--) {
      //timestamps.push((millis - (i * 24 * 60 * 60 * 1000)));

      let time = millis - (i * 24 * 60 * 60 * 1000);

      let hours = 24;

      if (i == 0) {
        var d = new Date();
        hours = d.getUTCHours() + 1;
      }

      for (let j = 0; j < hours; j++) {
        //timestamps.push((time + (j * 60 * 60 * 1000)));

        let hTime = time + (j * 60 * 60 * 1000);

        for (let s = 0; s < 60; s++) {
          timestamps.push((hTime + (s * 60 * 1000)));
        }

      }
    }

    return timestamps;
  }

  getDateStrByDateObj(d) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getUtcMinsTimeArrByDateMillis(startMilli, endMilli) {
    let timestamps = [];
    let length = (endMilli - startMilli) / 60000;

    for (let i = 0; i < length; i++) {
      timestamps.push(startMilli + i * 60000);
    }

    return timestamps;

  }

  getUtcMinsTimeArrByDate(startDate, endDate) {
    let start = this.getDateStrByDateObj(startDate);
    let startD = DateTime.fromISO(`${start}T00:00:00-00:00`);
    let startMilli = startD.toMillis() - this.timezoneDetected();

    let end = this.getDateStrByDateObj(endDate);
    let endD = DateTime.fromISO(`${end}T23:59:00-00:00`);
    let endMilli = endD.toMillis() - this.timezoneDetected();

    let tempDateStr = this.getTodayDateStr();

    if (end == tempDateStr) {
      let dt = new Date().toISOString();
      let a = dt.split('.');
      let b = a[0].split(":");
      b.pop();
      let c: any = b.join(':') + ':00Z';
      c = c.split('T');

      endD = DateTime.fromISO(`${end}T${c[1]}`);
      endMilli = endD.toMillis();
    }

    let timestamps = [];

    let length = (endMilli - startMilli) / 60000;

    for (let i = 0; i < length; i++) {
      timestamps.push(startMilli + i * 60000);
    }

    return timestamps;

    //console.log(startMilli);
    //console.log(endMilli);

    //console.log(timestamps);

  }

  getUtcHoursTimeArrByDate(startDate, endDate) {
    let start = this.getDateStrByDateObj(startDate);
    let startD = DateTime.fromISO(`${start}T00:00:00-00:00`);
    let startMilli = startD.toMillis() - this.timezoneDetected();

    let end = this.getDateStrByDateObj(endDate);
    let endD = DateTime.fromISO(`${end}T23:59:00-00:00`);
    let endMilli = endD.toMillis() - this.timezoneDetected();

    let tempDateStr = this.getTodayDateStr();

    if (end == tempDateStr) {
      let dt = new Date().toISOString();
      let a = dt.split('.');
      let b = a[0].split(":");
      b.pop();
      let c: any = b.join(':') + ':00Z';
      c = c.split('T');

      endD = DateTime.fromISO(`${end}T${c[1]}`);
      endMilli = endD.toMillis();
    }

    let timestamps = [];

    let length = (endMilli - startMilli) / 1800000;

    for (let i = 0; i < length; i++) {
      if (this.isUTCHour(startMilli + i * 1800000)) {
        timestamps.push(startMilli + i * 1800000);
      }

    }

    return timestamps;

  }

  getUtcMinsTimeArrFromTimeToCurrentTime(startMilli) {

    //startMilli = startMilli - this.timezoneDetected();

    let end = this.getTodayDateStr();
    let dt = new Date().toISOString();
    let a = dt.split('.');
    let b = a[0].split(":");
    b.pop();
    let c: any = b.join(':') + ':00Z';
    c = c.split('T');

    let endD = DateTime.fromISO(`${end}T${c[1]}`);
    let endMilli = endD.toMillis();

    let timestamps = [];

    let length = (endMilli - startMilli) / 60000;

    for (let i = 0; i < length; i++) {
      timestamps.push(startMilli + i * 60000);
    }

    return timestamps;

  }

  getUtcHoursTimeArrFromTimeToCurrentTime(startMilli) {

    //startMilli = startMilli;

    let end = this.getTodayDateStr();
    let dt = new Date().toISOString();
    let a = dt.split('.');
    let b = a[0].split(":");
    b.pop();
    let c: any = b.join(':') + ':00Z';
    c = c.split('T');

    let endD = DateTime.fromISO(`${end}T${c[1]}`);
    let endMilli = endD.toMillis();

    let timestamps = [];

    let length = (endMilli - startMilli) / 3600000;

    for (let i = 0; i < length; i++) {
      timestamps.push(startMilli + i * 3600000);
    }

    //console.log(timestamps);

    if (timestamps.length < 2) {
      timestamps.unshift(timestamps[0] - 3600000)
    }

    return timestamps;

  }

  getUtCMilliSecByDateObj(d: any, appendUTCTimeStr = false) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    let dateStr = [year, month, day].join('-');

    let date: any;
    if (appendUTCTimeStr) {

      let tempDateStr = this.getTodayDateStr();

      if (dateStr == tempDateStr) {
        // let dt = new Date().toISOString();
        // let a = dt.split('.');
        // let b = a[0].split(":");
        // b.pop();
        // let c: any = b.join(':') + ':00Z';
        // c = c.split('T');

        // date = DateTime.fromISO(`${dateStr}T${c[1]}`);

        // return date.toMillis();

        return (new Date()).getTime();

      } else {
        date = DateTime.fromISO(`${dateStr}T23:59:59.999Z`);
      }



    } else {
      date = DateTime.fromISO(`${dateStr}T00:00:00-00:00`);
    }

    return (date.toMillis() - this.timezoneDetected());
  }


  getChartDateByFormat(time, format: any) {
    let date = DateTime.fromMillis(time);

    return date.toUTC().toFormat(format)

  }

  isUTCHour(n) {
    return n % 3600000 === 0;
  }

  convertSecondsToTime(seconds: any) {
    if (seconds >= 3600) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    } else {
      return new Date(seconds * 1000).toISOString().substr(14, 5)
    }
  }
  isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) != d.getTimezoneOffset();
  }
  getUtCSecondsByDateObj(d: any, appendUTCTimeStr = false) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    let dateStr = [year, month, day].join('-');

    let date: any;
    if (appendUTCTimeStr) {

      let tempDateStr = this.getTodayDateStr();

      if (dateStr == tempDateStr) {
        let dt = new Date().toISOString();
        let a = dt.split('.');
        let b = a[0].split(":");
        b.pop();
        let c: any = b.join(':') + ':00Z';
        c = c.split('T');
        // date = DateTime.fromISO(`${c[0]}T${c[1]}`);

        let d = dt.split('.');
        d[0] = d[0] + 'Z';

        date = DateTime.fromISO(`${d[0]}`);
        return date.toMillis() / 1000;

      } else {
        date = DateTime.fromISO(`${dateStr}T23:59:59-00:00`);
      }
    } else {
      date = DateTime.fromISO(`${dateStr}T00:00:00-00:00`);
    }
    if (this.isDST(d)) {
      return (((date.toMillis()) - this.timezoneDetected()) / 1000) - 3600;
    } else
      return (date.toMillis() - this.timezoneDetected()) / 1000;

  }

  getLocalTime(date, tzone) {
    let dateArr = date.split(':');
    let zone = tzone;
    let localzone = this.getLocalTimeZoneName();
    let dateTime = DateTime.fromObject({
      zone
    }).set({
      hour: dateArr[0],
      minute: dateArr[1]
    });
    dateTime = dateTime.setZone(localzone);
    let result = dateTime.toISO();
    return result;
  }

  getFirstDayDateStr() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '01',
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }


    return [month, day, year].join('/');
  }

  getTimeStr(dateObj) {
    let pipe = new DatePipe('en-US');
    let timeString = `${pipe.transform(dateObj, 'HH:mm')}`;
    return timeString;
  }

  getTImeZoneWithOffset() {
    let localeDate = new Date().toString().split(' ');
    let gmtId =
      (localeDate[5] ? localeDate[5] : '') +
      ' ' +
      (localeDate[6] ? localeDate[6] : '') +
      ' ' +
      (localeDate[7] ? localeDate[7] : '') +
      ' ' +
      (localeDate[8] ? localeDate[8] : '');

    return gmtId;
  }

  stdTimezoneOffset() {
    let date: any = new Date();
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  getDSToffset() {
    let date: any = new Date();
    if (date.getTimezoneOffset() < this.stdTimezoneOffset()) {
      return (this.stdTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    } else {
      return 0;
    }
  }

  getDateTimeStrWithOffset() {
    return `${(new Date()).toISOString()?.split('.')?.[0]?.replace(/['"]+/g, '_')}${(this.getTImeZoneWithOffset())?.split('(')?.[0]?.split('GMT')?.[1]}`;
  }


}
