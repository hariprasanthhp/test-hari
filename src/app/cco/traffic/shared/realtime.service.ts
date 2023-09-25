import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BehaviorSubject } from 'rxjs';
import * as Highcharts from "highcharts/highstock";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  streamOptions: any;
  data: any = {
    graphType: 'TRF',
    sendTime: (new Date()).getTime(),
    usage: [0, 0],
    maxRate: [0, 0],
    packet: [0, 0]
  };
  source: any;
  cacheInterval: any;
  cachePacketInterval: any;
  inc = 0;

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

  rtData$: any = new BehaviorSubject(this.data);
  ratePacketStreamData$ = new BehaviorSubject(this.data);
  constructor(private sso: SsoAuthService) { }

  getData(From: any) {
    let orgId = this.sso.getOrgId();
    let moniterType = 'EP';
    let moniterId = `d6ed9e75-9afd-48a0-bd0b-755da43946e7`
    // let moniterId = `1346cba3-4c4b-4fd0-8489-0aa93b08eed6`
    // let moniterId = `73a3404f-6c34-43b5-b3ac-02c00d56558a`
    // let moniterId = this.sso.getSubscriberEndpointId();

    // if (From === "Clear") {
    //   if (this.source) {
    //     this.source.close();
    //     this.source = null;
    //   }
    //   this.streamOptions = null;
    // }
    // else if (From === "Apply") {
    if (!moniterId) {
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
    });

    this.source.addEventListener('state', (message: any) => {
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
      if (path.indexOf('/traffic-reports/') === -1 && path.indexOf('cco/traffic') === -1) {
        this.source.close();
      }

      let data = JSON.parse(message.data);
      if (data.graphType === 'TRF') {
        this.ratePacketStreamData$.next(data)
        this.data = JSON.parse(message.data);
        clearInterval(this.cacheInterval);
        clearInterval(this.cachePacketInterval);
        this.cacheRTData('rate');
        this.cacheRTData('packet');
      } else {
        this.rtData$.next(data);
      }
    });

    this.source.addEventListener('error', (message: any) => {
      window.location.reload();
      this.source.close();
      this.source = null;
    });
    // }

  }

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
      }, 1000);

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

      }, 1000);
    }
  }



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
      if (chartName.toLowerCase() === 'rate') {
        maxUnit = this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      } else {
        maxUnit = this.yAxixTitlePacket ? this.yAxixTitlePacket : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
      }
    }

    if (typeof maxUnit === 'string') {
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
    }


    let chartData = [];
    for (let i = 0; i < currentData.length; i++) {
      let delta = parseFloat(currentData[i]) - parseFloat(lastData[i]);
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
  }

}
