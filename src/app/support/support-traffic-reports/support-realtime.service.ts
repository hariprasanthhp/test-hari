import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { Subject, BehaviorSubject } from 'rxjs';
import * as Highcharts from "highcharts/highstock";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportRealtimeService {
  data: any = {
    graphType: 'TRF',
    sendTime: (new Date()).getTime(),
    usage: [0, 0],
    maxRate: [0, 0],
    packet: [0, 0]
  };
  source: any;
  rtData$: any = new BehaviorSubject(this.data);
  ratePacketStreamData$ = new BehaviorSubject(this.data);
  delay$ = new BehaviorSubject(false);

  constructor(private sso: SsoAuthService,
    private http: HttpClient) { }

  getData() {
    let orgId = this.sso.getOrgId();
    let moniterType = 'EP';
    let moniterId = this.sso.getSubscriberEndpointId();

    if (!moniterId) {

      console.log("subscriber endpoint id not set");
      return;
    }

    if (this.source) {
      this.source.close();
      this.source = null;
    }

    let url = `${environment.SUPPORT_URL}/rt/sse/${orgId}/${moniterType}/${moniterId}/TAPP,TEP,TRF`;
    this.source = new EventSourcePolyfill(url, {
      headers: {
        'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
        'X-Calix-AccessToken': this.sso.getAccessToken()
      }
    });

    this.source.addEventListener('open', (message: any) => {
      console.log(JSON.stringify(message));
      console.log(message);

      console.log(new Date());

    });

    this.source.addEventListener('state', (message: any) => {
      console.log(JSON.stringify(message));
      console.log('state', message);
      console.log(new Date());

      let data = JSON.parse(message.data);

      if (data['status'].toLowerCase() === 's300') {
        let data = {
          graphType: 'TRF',
          sendTime: (new Date()).getTime(),
          usage: [0, 0],
          maxRate: [0, 0],
          packet: [0, 0]
        };

        this.rtData$.next(data);

      }

    });


    this.source.addEventListener('message', (message: any) => {
      let path = window.location.pathname;
      if (path.indexOf('/traffic-reports/') === -1) {
        console.log('force closed');
        this.source.close();
      }

      let data = JSON.parse(message.data);



      if (data.graphType === 'TRF') {
        this.ratePacketStreamData$.next(data)
        //console.log(JSON.parse(message.data));
        this.data = JSON.parse(message.data);
        clearInterval(this.cacheInterval);
        clearInterval(this.cachePacketInterval);
        this.cacheRTData('rate');
        this.cacheRTData('packet');


      } else {
        this.rtData$.next(data);

      }

      console.log(JSON.parse(message.data));

    });

    this.source.addEventListener('error', (message: any) => {
      //console.log(JSON.parse(message));
      window.location.reload();

      this.source.close();
      this.source = null;


    });
  }

  currentData: any
  chartData: any = [0, 0];
  lastData: any = [0, 0];
  yAxixTitle: any = 'bps';

  currentDataPacket: any
  chartDataPacket: any = [0, 0];
  lastDataPacket: any = [0, 0];
  yAxixTitlePacket: any = 'pps';

  cacheRateRTDataObj = {};
  cachePacketRTDataObj = {};
  cacheRTData(type: any) {

    if (type === 'rate') {
      if (this.currentData) {
        this.lastData = this.currentData;
      } else {
        this.chartData = [0, 0];
      }

      this.currentData = this.data.maxRate;

      this.yAxixTitle = (type === 'rate') ? 'bps' : 'pps';

      let loadTime = (new Date()).getTime();
      let inc = 0;
      this.cacheInterval = setInterval(() => {
        inc++;
        var time = loadTime + (inc * 1000);

        let key = this.removeLast3Chars(time);

        this.cacheRateRTDataObj[key] = this.generateRTforCache(this.currentData, this.lastData, this.chartData, type);
        this.removeOldKeys(this.cacheRateRTDataObj, type);
        //window.localStorage.setItem('calix.rate_rt_data', JSON.stringify(this.cacheRateRTDataObj));

      }, 1000);

      //console.log("cache rate realtime data", this.cacheRateRTDataObj);

    } else {
      if (this.currentDataPacket) {
        this.lastDataPacket = this.currentDataPacket;
      } else {
        this.chartDataPacket = [0, 0];
      }

      this.currentDataPacket = this.data.packet;

      this.yAxixTitlePacket = (type === 'rate') ? 'bps' : 'pps';

      let loadTime = (new Date()).getTime();
      let inc = 0;
      this.cachePacketInterval = setInterval(() => {
        inc++;
        var time = loadTime + (inc * 1000);

        let key = this.removeLast3Chars(time);

        this.cachePacketRTDataObj[key] = this.generateRTforCache(this.currentDataPacket, this.lastDataPacket, this.chartDataPacket, type);

        this.removeOldKeys(this.cachePacketRTDataObj, type);
        //window.localStorage.setItem('calix.packet_rt_data', JSON.stringify(this.cachePacketRTDataObj));

      }, 1000);

      //console.log("cache packet realtime data", this.cachePacketRTDataObj);

    }






  }

  cacheInterval: any;
  cachePacketInterval: any;
  inc = 0;

  generateRTforCache(currentData, lastData, chartData, chartName) {

    let data = this.transformData(currentData, lastData, chartData, chartName);
    if (chartName === 'rate') {
      this.chartData = data;
    } else {
      this.chartDataPacket = data;
    }

    if (!data[0]) {
      data[0] = 0;
    }

    if (!data[1]) {
      data[1] = 0;
    }

    let upRate = this.bitsToSize(data[0], chartName);
    let downRate = this.bitsToSize(data[1], chartName);
    let vArr1 = upRate.split(" ");
    let vArr2 = downRate.split(" ");
    let upRateUnit = vArr1[1] ? vArr1[1] : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    let downRateUnit = vArr2[1] ? vArr2[1] : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    let maxUnit = '';

    if (data[0] || data[1]) {
      if (data[0] > data[1]) {
        maxUnit = vArr1[1];
      } else {
        maxUnit = vArr2[1];
      }
    } else {
      if (chartName.toLowerCase() === 'rate') {
        maxUnit = this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      } else {
        maxUnit = this.yAxixTitlePacket ? this.yAxixTitlePacket : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      }

    }

    if (maxUnit == 'undefined') {
      //maxUnit = this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';

      if (chartName.toLowerCase() === 'rate') {
        maxUnit = this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      } else {
        maxUnit = this.yAxixTitlePacket ? this.yAxixTitlePacket : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      }
    }

    if (typeof maxUnit === 'string') {
      //this.yAxixTitle = maxUnit;

      if (chartName.toLowerCase() === 'rate') {
        this.yAxixTitle = maxUnit;
      } else {
        this.yAxixTitlePacket = maxUnit;
      }
    }

    if (data) {
      if (chartName.toLowerCase() === 'rate') {
        return [data[0], data[1], this.yAxixTitle, upRateUnit, downRateUnit];
      } else {
        return [data[0], data[1], this.yAxixTitlePacket, upRateUnit, downRateUnit];
      }

    }

  }

  transformData(currentData: any, lastData: any, data: any, chartName: any): any {
    if (chartName.toLowerCase() === 'rate') {
      // console.log("current api value", currentData);
      // console.log("last api value", lastData);
      // console.log("last chart value", data);
    }

    let chartData = [];
    for (let i = 0; i < currentData.length; i++) {
      let delta = parseFloat(currentData[i]) - parseFloat(lastData[i]);
      //delta = Math.abs(delta);

      if (!parseFloat(currentData[i]) && !parseFloat(lastData[i])) {
        data[i] = 0;
      }

      let deltaRate = delta / 15;

      let value = Math.abs(parseFloat(data[i]) + deltaRate);

      chartData.push(value);
    }

    return chartData;
  }

  bitsToSize(bits: any, chartName) {
    let bytes = parseFloat(bits);

    let sizes = (chartName.toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (bytes == 0 && chartName.toLowerCase() === 'rate') return '0 bps';
    if (bytes == 0 && chartName.toLowerCase() === 'packet') return '0 pps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));

    return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizes[i];
  }

  removeLast3Chars(str: any): any {
    str = str.toString();
    str = str.slice(0, -3);
    str = parseInt(str);

    return str;
  }

  removeOldKeys(lastChartDataObj, chartName): void {
    let keys = Object.keys(lastChartDataObj);
    let len = keys.length;

    if (len > 300) {
      let obj = lastChartDataObj;

      let removeLen = len - 300;

      for (let i = 0; i < removeLen; i++) {
        delete obj[keys[i]];
      }

      if (chartName === 'rate') {
        this.cacheRateRTDataObj = obj;
      } else {
        this.cachePacketRTDataObj = obj;
      }

      //console.log("removal of old chart length", Object.keys(lastChartDataObj).length);

    }
  }

  getCachedata(chartName) {
    if (chartName === 'rate') {
      return this.cacheRateRTDataObj;
    } else {
      return this.cachePacketRTDataObj
    }
  }

  getCurrrentUnit(chartName: any) {
    let length = Object.keys(this.cachePacketRTDataObj).length;
    if (chartName.toLowerCase() === 'rate') {
      return this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    } else {
      return this.yAxixTitlePacket ? this.yAxixTitlePacket : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    }
  }

  clearData() {
    this.yAxixTitle = '';
    this.yAxixTitlePacket = '';
    this.cachePacketRTDataObj = {};
    this.cacheRateRTDataObj = {};
    if (this.source) {
      this.source.close();
      this.source = null;
    }

    if (this.cacheInterval) {
      clearInterval(this.cacheInterval);
    }

    if (this.cachePacketInterval) {
      clearInterval(this.cachePacketInterval);
    }

  }

  getLastData() {
    return this.data;
  }

  closeEventSource() {

    if (this.source) {
      this.source.close();
    }
    this.source = null;

    console.log("close event source");
  }

  getRealtimeDelay() {
    let orgId = this.sso.getOrgId();
    let url = `${environment.API_BASE_URL}fa/config/organization?org-id=${orgId}`;
    this.http.get(`${url}`).subscribe((res: any) => {
      if (res && res !== null) {
        let timeDelay = -1 * (res.realtimeLateflowDelay ? res.realtimeLateflowDelay : 0) * 1000;
        this.sso.setRealtimeDelay(timeDelay);
      } else {
        this.sso.setRealtimeDelay(0);
      }
      this.delay$.next(true);
    }, error => {
      this.sso.setRealtimeDelay(0);
      this.delay$.next(true);
    })
  }

  /***begin-aswin-29-04-2021-poc-realtime-data-render */
  previousUrlData: any = {};
  restoreChartObj: any = {};
  getPreviousUrlData(previousurl) {
    return this.previousUrlData.hasOwnProperty(previousurl) ? this.previousUrlData[previousurl] : false;
  }

  setPreviousUrlData(previousurl, previousUrlData, reset) {
    reset ? this.previousUrlData = {} : this.previousUrlData[previousurl] = previousUrlData;
  }

  getRestoreChartData(key) {
    return this.restoreChartObj.hasOwnProperty(key) ? this.restoreChartObj[key] : false;
  }

  setRestoreChartData(key, restoreChartObj, reset) {
    reset ? this.restoreChartObj = {} : this.restoreChartObj[key] = restoreChartObj;
  }
  /***end-aswin-29-04-2021-poc-realtime-data-render */

}
