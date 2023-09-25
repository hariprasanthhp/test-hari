import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import * as Highcharts from 'highcharts';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
const { Manager } = require("socket.io-client");

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  delayTime$ = new Subject();

  data: any = {
    // graphType: 'TRF',
    // sendTime: (new Date()).getTime(),
    // usage: [0, 0],
    // maxRate: [0, 0],
    // packet: [0, 0]
  };
  source: any;
  rtData$: any = new BehaviorSubject(this.data);
  ratePacketStreamData$ = new BehaviorSubject(this.data);
  multipleRatePacketStreamData$ = new BehaviorSubject(this.data);
  multipleStreamData$ = new BehaviorSubject(this.data);
  recordResponseData$ = new Subject();
  stopRecordResponseData$ = new Subject();
  recordErrorResponseData$ = new Subject();

  yAxixTitle: string;
  cacheRateRTDataObj: any = {};
  currentDataPacket: any;
  lastDataPacket: any;
  chartDataPacket: number[];
  yAxixTitlePacket: string;
  cachePacketRTDataObj: any = {};
  lastChartDataObj: any = {};

  cacheData$ = new Subject();

  endPointSearch$ = new Subject();
  endPointSearchError$ = new Subject();
  connectWS$ = new BehaviorSubject(false);
  showModalInfo$ = new Subject();
  endPointSearchValue = "";
  previousURL: string = "";
  isUnmapped: boolean = false;
  delay$ = new BehaviorSubject(false);
  wsConnectionError$ = new BehaviorSubject(false);
  wsNoResponse$ = new BehaviorSubject({ isError: false, type: "" });
  endPointName = "";
  isAggregateMember$ = new BehaviorSubject({ id: null });

  baseUrl = `${environment.API_BASE_URL}realtime/signed-url`;

  timezoneDetected = 0;
  // timezoneDetected = -75 * 1000;
  shouldReflow: boolean = false;
  connectErrorCount: number = 0;
  constructor(
    private http: HttpClient,
    private sso: SsoAuthService,
    private router: Router) {
    //this.timezoneDetected = this.dateUtils.timezoneDetected();
  }

  WebSocketServer = {
    websocketPaths: ['/SystemtryComponent', '/cco/issues/realtime/current-issues', '/cco/traffic/network/realtime',
      '/cco/traffic/applications/realtime', '/cco/traffic/locations/realtime', '/cco/traffic/endpoints/realtime',
      "/cco/home/network-trends"],
    isConnected: false,
    socket: null,
    interval: null,
    isdisconnected: false,
    hasDisconnectedOnce: false,
    callmethod(sec, cnt) {
      let count = cnt;
      clearInterval(interval);
      var interval = setInterval(() => {
        count++;
        if (count == 3) {
          clearInterval(interval);
          interval = null;
          this.callmethod(6000, 3)
        }
        else if (count == 6) {
          clearInterval(interval);
          interval = null;
          this.callmethod(25000, 6)
        }
        else {
          // if (this.isConnected || this.websocketPaths.includes(window.location.pathname) == false) {
          if (this.isConnected) {
            this.isdisconnected = false;
            clearInterval(interval);
            interval = null;
            // return;
          }
          else {
            this.socket.connect();
            this.isConnected = true;
          }
        }
      }, sec);
    },
    close() {
      //this.emit('eventclosed', 'closing from client side');
      this.socket.emit('eventclosed', 'closing from client side');
      this.socket.disconnect();
      this.socket = undefined;
    },
    connect1(signedUrl: any) {
      // if (this.socket)
      //   return;
      if (this.socket) {
        this.socket.destroy();
        delete this.socket;
        this.socket = null;
      }
      if (this.socket) {
        return;
      }

      this.socket = io(signedUrl, {
        transports: ['websocket'],
        path: '/calix/socket-io/',
        autoConnect: false,
        reconnection: false
      });

      if (this.isConnected == false) {
        this.callmethod(5000, 0)
      }

      this.socket.on('connect', () => {
        // console.log("Web Socket connected");

        this.isConnected = true;
      });

      this.socket.on('ping', () => {
        setTimeout(() => {
          this.socket.emit('pong');
        }, 500)
      });


      this.socket.on('disconnect', (err) => {
        console.log(err);
        this.isConnected = false;
        this.isdisconnected = true;
        this.hasDisconnectedOnce = true;
        // this.socket.close();
        // this.callmethod(5000, 0);
      });

      this.socket.on("connect_error", (err) => {
        this.isConnected = false;
        console.log(err.message);
      })
      this.socket.on('isConnected', (data, callback) => {
        callback({
          status: "true"
        });
      })
      return this.socket;
    }
  }


  openSocket() {

    const manager = new Manager(`${environment.TRAFFIC_SOCKET_URL}`, {
      transports: ['websocket'],
      reconnectionDelayMax: 10000,
      path: "/calix/socket-io/"

    });

    this.WebSocketServer.socket = manager.socket("", {
    });
  }

  removeExistingListeners() {
    this.WebSocketServer.socket.off();
  }

  // To send msg to server
  emit(eventname: string, data?: any) {
    // if (this.connection()) {
    if (typeof data === 'object' && !data.replay && eventname != "STOP_RECORDING" && eventname != "RECORDING") {
      this.setCurrentMonitorInfo(data);
    }

    if (typeof data === 'object' && eventname != "STOP_RECORDING") {
      this.setRealtimeDelay(data);
    }

    if (typeof data === 'object' && data['replay'] && data['replay'] == "true") {
      let time = Math.abs(this.sso.getRealtimeDelay());
      data['startTime'] = parseInt(data['startTime']) - (time ? time : 60000);
    }

    if (this.WebSocketServer.isdisconnected) {
      console.log(JSON.stringify(data));
      console.log("Web socket is disconnected");
      this.wsConnectionError$.next(true);
      return;
    }

    if (data) {
      this.WebSocketServer.socket.emit(eventname, data);
    }
    else
      this.WebSocketServer.socket.emit(eventname);
    //};
  }

  listen(eventname: string) {
    this.WebSocketServer.socket.on(eventname, (data) => {
      let cdata: any = data;
      if (typeof cdata === 'string') {
        cdata = [cdata];
      }

      if (eventname.includes('error_traffic')) {
        if (typeof data === 'string') {
          this.wsNoResponse$.next({ isError: true, type: eventname });
        }
      }

      if (eventname === 'REPLAY' || eventname === 'event') {
        this.cacheRateRTDataObj = {};
        this.cachePacketRTDataObj = {};
        this.clearRecordRtInfo();
        if (cdata && cdata.length) {
          cdata = cdata.slice();
          console.log("Replay data", cdata);
          cdata.forEach(element => {
            let data: any;

            if (this.IsJsonString(element)) {
              //element = element.slice()
              data = JSON.parse(element);

            } else {
              data = element;
            }

            if (data.confData && data.confData['monitorId'] == this.connectionTypes[this.currentMonitorType].monitorId) {
              this.data = data;

              this.cacheRTData('rate', 'Traffic');
              this.cacheRTData('packet', 'Traffic');
            }


          });

          this.cacheData$.next({
            'rate': this.getCachedata('rate'),
            'packet': this.getCachedata('packet')
          });

          let sendData = { ...this.data, ...this.data.confData };

          if (sendData.graphType === 'TRF') {

            console.log(sendData);

            this.ratePacketStreamData$.next(sendData)
          }
        }
        // console.log(this.cacheRateRTDataObj);



      } else if (cdata && cdata[0]) {
        if (this.IsJsonString(cdata[0])) {
          cdata[0] = cdata[0].slice();
          cdata[0] = JSON.parse(cdata[0]);

        }


        if (cdata[0].confData && cdata[0].confData['monitorType'] === this.currentMonitorType && cdata[0].confData['monitorId'] == this.connectionTypes[this.currentMonitorType]?.monitorId) {
          let sendData = { ...cdata[0], ...cdata[0].confData };


          if (sendData.graphType === 'TRF') {
            console.log(sendData);
            if (!this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur) {
              this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur = (new Date()).getTime() - parseInt(sendData.sendTime);

              this.delayTime$.next(this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur);
            }
            this.ratePacketStreamData$.next(sendData)
          } else {
            this.rtData$.next(sendData);

          }
        }

      }

    })
  }


  multipleEmit(eventname: string, data?: any) {
    if (typeof data === 'object') {
      this.setRealtimeDelay(data);
    }
    if (typeof data === 'object' && data['replay'] && data['replay'] == "true") {
      let time = Math.abs(this.sso.getRealtimeDelay());
      data['startTime'] = parseInt(data['startTime']) - (time ? time : 60000);
    }

    if (this.WebSocketServer.isdisconnected) {
      this.wsConnectionError$.next(true);
      return;
    }

    if (data) {
      this.WebSocketServer.socket.emit(eventname, data);
    }
    else
      this.WebSocketServer.socket.emit(eventname);
  }



  listenMultiple(eventname: string) {
    this.WebSocketServer.socket.on(eventname, (data) => {
      let cdata: any = data;
      if (typeof cdata === 'string') {
        cdata = [cdata];
      }

      if (eventname === 'REPLAY' || eventname === 'event') {
        this.multipleRatePacketStreamData$.next(cdata);
      } else if (cdata && cdata[0]) {
        if (this.IsJsonString(cdata[0])) {
          cdata[0] = cdata[0].slice();
          cdata[0] = JSON.parse(cdata[0]);
        }

        if (cdata[0].confData && (cdata[0].confData['monitorType'] === "LOC" || cdata[0].confData['monitorType'] === "APP" || cdata[0].confData['monitorType'] === "APPGRP")) {
          let sendData = { ...cdata[0], ...cdata[0].confData };

          if (sendData.graphType === 'TRF') {
            // if (!this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur) {
            //   this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur = (new Date()).getTime() - parseInt(sendData.sendTime);
            // }
            this.multipleStreamData$.next(sendData)
          }
        }

      }

    })
  }


  listenRecord(eventname: string) {
    this.WebSocketServer.socket.on(eventname, (data) => {
      if (eventname == "RECORDING") {
        this.recordResponseData$.next(data);
      } else if (eventname == "STOP_RECORDING") {
        this.stopRecordResponseData$.next(data)
      } else if (eventname == "error") {
        this.recordErrorResponseData$.next(data);
      }
    })
  }



  recordRatePacketStreamData$ = new BehaviorSubject(this.data);

  getRecordData() {
    let params = {
      "orgId": this.sso.getOrgId(),
      "monitorType": "NET",
      "networkId": `${this.sso.getOrgId()}_0`,
      "monitorId": `${this.sso.getOrgId()}_0`,
      "graphType": "TRF,TAPP,TLOC,TEP",
      outputStartTimeDiffToCur: 0
    };


    this.setCurrentMonitorInfo(params);

    let cdata = ["{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1669898,1531250],\"maxRate\":[890612,816666],\"packet\":[9605,9358],\"sendTime\":1632138060000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1758492,1685044],\"maxRate\":[937862,898690],\"packet\":[9818,9722],\"sendTime\":1632138075000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1921935,1778104],\"maxRate\":[1025032,948322],\"packet\":[11664,11644],\"sendTime\":1632138090000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1741112,1603827],\"maxRate\":[928593,855374],\"packet\":[11119,11088],\"sendTime\":1632138105000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1861596,1767668],\"maxRate\":[992850,942756],\"packet\":[10993,11235],\"sendTime\":1632138120000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2353828,2173871],\"maxRate\":[1255374,1159398],\"packet\":[13430,13640],\"sendTime\":1632138135000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2064040,1913536],\"maxRate\":[1100821,1020552],\"packet\":[12333,12217],\"sendTime\":1632138150000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1934139,1784486],\"maxRate\":[1031540,951725],\"packet\":[11808,11732],\"sendTime\":1632138165000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2390974,2200786],\"maxRate\":[1275186,1173752],\"packet\":[14370,14282],\"sendTime\":1632138180000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2364978,2200961],\"maxRate\":[1261322,1173846],\"packet\":[14272,14444],\"sendTime\":1632138195000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2028658,1846579],\"maxRate\":[1081950,984842],\"packet\":[12647,12695],\"sendTime\":1632138210000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1830408,1715952],\"maxRate\":[976217,915174],\"packet\":[11394,11461],\"sendTime\":1632138225000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1813494,1662066],\"maxRate\":[967196,886434],\"packet\":[11670,11701],\"sendTime\":1632138240000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1745935,1634533],\"maxRate\":[931164,871750],\"packet\":[11462,11510],\"sendTime\":1632138255000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1462256,1350103],\"maxRate\":[779869,720054],\"packet\":[10005,9897],\"sendTime\":1632138270000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1648829,1464350],\"maxRate\":[879375,780986],\"packet\":[10184,9786],\"sendTime\":1632138285000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2010853,1876954],\"maxRate\":[1072454,1001042],\"packet\":[11517,11479],\"sendTime\":1632138300000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2089170,1983216],\"maxRate\":[1114224,1057715],\"packet\":[11624,11582],\"sendTime\":1632138315000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2177269,1989227],\"maxRate\":[1161210,1060920],\"packet\":[12384,12246],\"sendTime\":1632138330000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2238716,2091218],\"maxRate\":[1193982,1115316],\"packet\":[12421,12446],\"sendTime\":1632138345000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2330046,2134872],\"maxRate\":[1242691,1138598],\"packet\":[12754,12722],\"sendTime\":1632138360000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2304012,2146061],\"maxRate\":[1228806,1144566],\"packet\":[13040,13164],\"sendTime\":1632138375000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2163364,2028615],\"maxRate\":[1153794,1081928],\"packet\":[12212,12284],\"sendTime\":1632138390000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2426284,2290174],\"maxRate\":[1294018,1221426],\"packet\":[13614,13579],\"sendTime\":1632138405000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2494918,2386645],\"maxRate\":[1330623,1272877],\"packet\":[13872,13843],\"sendTime\":1632138420000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2414894,2261934],\"maxRate\":[1287944,1206364],\"packet\":[13178,13052],\"sendTime\":1632138435000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2394889,2218582],\"maxRate\":[1277274,1183243],\"packet\":[13625,13604],\"sendTime\":1632138450000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2418611,2260147],\"maxRate\":[1289926,1205411],\"packet\":[13722,13698],\"sendTime\":1632138465000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2546804,2381377],\"maxRate\":[1358296,1270067],\"packet\":[14398,14260],\"sendTime\":1632138480000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2153924,2005231],\"maxRate\":[1148760,1069456],\"packet\":[12462,12364],\"sendTime\":1632138495000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1933706,1834662],\"maxRate\":[1031310,978486],\"packet\":[10964,10826],\"sendTime\":1632138510000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2017426,1849974],\"maxRate\":[1075960,986652],\"packet\":[12176,11707],\"sendTime\":1632138525000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[2135234,2001997],\"maxRate\":[1138791,1067731],\"packet\":[12734,12556],\"sendTime\":1632138540000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1637154,1551267],\"maxRate\":[873148,827342],\"packet\":[9790,9718],\"sendTime\":1632138555000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1684980,1584558],\"maxRate\":[898655,845097],\"packet\":[10104,10083],\"sendTime\":1632138570000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1859924,1717283],\"maxRate\":[991959,915884],\"packet\":[11204,11320],\"sendTime\":1632138585000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1953386,1780490],\"maxRate\":[1041805,949594],\"packet\":[11784,11482],\"sendTime\":1632138600000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1657301,1526030],\"maxRate\":[883893,813882],\"packet\":[9974,9822],\"sendTime\":1632138615000}", "{\"confData\":{\"monitorType\":\"NET\",\"monitorId\":\"10001_0\",\"graphType\":\"TRF\"},\"usage\":[1839265,1667763],\"maxRate\":[980940,889473],\"packet\":[11200,11129],\"sendTime\":1632138630000}"];

    this.cacheRateRTDataObj = {};
    this.cachePacketRTDataObj = {};
    if (cdata && cdata.length) {
      cdata = cdata.slice();
      cdata.forEach(element => {
        let data: any;

        if (this.IsJsonString(element)) {
          //element = element.slice()
          data = JSON.parse(element);

        } else {
          data = element;
        }

        if (data.confData && data.confData['monitorId']) {
          this.data = data;

          this.cacheRTData('rate', 'Traffic');
          this.cacheRTData('packet', 'Traffic');
        }


      });

      this.recordRatePacketStreamData$.next({
        'rate': this.getCachedata('rate'),
        'packet': this.getCachedata('packet')
      });


    }
  }


  cacheInterval: any
  cachePacketInterval: any

  cacheRTData(type: any, from?: any) {

    if (type === 'rate') {
      if (this.currentData) {
        this.lastData = this.currentData;
      } else {
        this.chartData = [0, 0];
      }

      this.currentData = this.data.maxRate ? this.data.maxRate : [0, 0];

      this.yAxixTitle = (type === 'rate') ? 'bps' : 'pps';

      let loadTime;

      if (from === 'Traffic') {
        loadTime = this.data.sendTime ? this.data.sendTime + this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;
      } else {
        loadTime = this.data.sendTime ? this.data.sendTime + this.healthConnectionTypes[this.healthCurrentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;
      }

      for (let i = 1; i <= 15; i++) {
        var time = loadTime + (i * 1000);

        let key = this.removeLast3Chars(time);

        this.cacheRateRTDataObj[key] = this.generateRTforCache(this.currentData, this.lastData, this.chartData, type);
        this.removeOldKeys(this.cacheRateRTDataObj, type, from);

      }


    } else {
      if (this.currentDataPacket) {
        this.lastDataPacket = this.currentDataPacket;
      } else {
        this.chartDataPacket = [0, 0];
      }

      this.currentDataPacket = this.data.packet ? this.data.packet : [];

      this.yAxixTitlePacket = (type === 'rate') ? 'bps' : 'pps';

      let loadTime;
      if (from === 'Traffic') {
        loadTime = this.data.sendTime ? this.data.sendTime + this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;
      } else {
        loadTime = this.data.sendTime ? this.data.sendTime + this.healthConnectionTypes[this.healthCurrentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;
      }
      let inc = 0;

      for (let i = 1; i <= 15; i++) {
        var time = loadTime + (i * 1000);

        let key = this.removeLast3Chars(time);

        this.cachePacketRTDataObj[key] = this.generateRTforCache(this.currentDataPacket, this.lastDataPacket, this.chartDataPacket, type);

        this.removeOldKeys(this.cachePacketRTDataObj, type, from);

      }

    }

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

  removeOldKeys(lastChartDataObj, chartName, from?): void {
    if ((window.location.pathname.indexOf('/cco/record') !== -1) || (window.location.pathname.indexOf('/organization-admin/flowAnalyze/record-view') !== -1) || (window.location.pathname.indexOf('/systemAdministration/flowAnalyze/record-view') !== -1)) {
      return;
    }

    let keys = Object.keys(lastChartDataObj);
    let len = keys.length;
    let windowLen = ((from === 'health' ? this.getHealthWindowLen() : this.getWindowLen()) * 300) + 50;

    if (len > windowLen) {
      let obj = lastChartDataObj;

      let removeLen = len - windowLen;

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

    if (Array.isArray(currentData)) {
      if (currentData[0] == undefined) {
        currentData[0] = 0;
      }

      if (currentData[1] == undefined) {
        currentData[1] = 0;
      }

    } else {
      currentData = [0, 0];
    }

    if (Array.isArray(lastData)) {
      if (lastData[0] == undefined) {
        lastData[0] = 0;
      }

      if (lastData[1] == undefined) {
        lastData[1] = 0;
      }

    } else {
      lastData = [0, 0];
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

    if ((!chartData[0] && !chartData[1]) && (currentData[0] || currentData[1])) {
      chartData = currentData;
    }

    return chartData;
  }
  //checking whether connection is established or not
  Checkconnectornot(signedUrl: any) {
    let socket: any;
    if (this.WebSocketServer.isConnected == false && signedUrl) {
      socket = this.WebSocketServer.connect1(signedUrl);
      socket.on('connect', () => {
        console.log("Web Socket connected");
        this.WebSocketServer.isdisconnected = false;
        if (this.connectWS$) {
          this.connectWS$.next(true);
        }

      });
      //this.connectWS$.next(true);
      socket.on('disconnect', (err) => {
        console.log(err);
        if (err == "transport close" || err == "ping timeout") {
          socket.close()
          this.reconnectWebSocket();
          // if (Object.keys(this.connectionTypes).length === 0) {
          //   socket.close()
          //   this.reconnectWebSocket();
          // }
          // this.showModalInfo$.next(true);
        }
      });
      socket.on('connect_error', (err) => {
        console.log("error", err)
        if (this.connectErrorCount < 2) {
          this.connectErrorCount++
          setTimeout(() => {
            this.reconnectWebSocket();
          }, 30000)
        }
        this.wsConnectionError$.next(true);
      });
    }
  }


  reconnectWebSocket() {
    this.getUnSignedUrl().subscribe((res: any) => {
      this.Checkconnectornot(res.signedurl);
    }, (err) => {
      if (err.name == "HttpErrorResponse") {
        setTimeout(() => {
          this.reconnectWebSocket();
        }, 5000)
      }
    })
  }

  connectionTypes: any = {

  };

  setCurrentMonitorInfo(data: any) {
    if (!data['startTime']) {
      data['startTime'] = (new Date()).getTime();
    }
    this.connectionTypes[data.monitorType] = data;
  }

  getCurrentMonitorInfo(monitorType: any) {
    return this.connectionTypes[monitorType];
  }

  currentMonitorType = '';
  setMonitorType(type: any) {
    this.currentMonitorType = type;
  }

  getMonitorType() {
    return this.currentMonitorType;
  }

  setWindowLen(windowLen: any) {
    if (this.connectionTypes[this.currentMonitorType]) {
      this.connectionTypes[this.currentMonitorType].windowLen = windowLen;
    }

  }

  getWindowLen() {
    return (this.connectionTypes[this.currentMonitorType] && this.connectionTypes[this.currentMonitorType].windowLen) ? this.connectionTypes[this.currentMonitorType].windowLen : 1;
  }


  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  lastData: any = [0, 0];
  currentData: any;
  chartData: any = [0, 0];
  upRate: any;
  downRate: any;

  upRateUnit: any;
  downRateUnit: any;



  clearReplayData() {
    this.cachePacketRTDataObj = {};
    this.cacheRateRTDataObj = {};
  }

  getCachedata(chartName) {
    if (chartName === 'rate') {
      return this.cacheRateRTDataObj;
    } else {
      return this.cachePacketRTDataObj
    }
  }

  getCurrrentUnit(chartName: any) {
    if (chartName.toLowerCase() === 'rate') {
      return this.yAxixTitle ? this.yAxixTitle : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    } else {
      return this.yAxixTitlePacket ? this.yAxixTitlePacket : (chartName.toLowerCase() === 'rate') ? 'bps' : 'pps';
    }
  }

  clearRtInfo() {
    this.currentMonitorType = '';
    this.connectionTypes = {};
    // this.lastData = [0, 0];
    // this.currentData = [0, 0];
    // this.chartData = [0, 0];
    this.clearReplayData();
  }

  clearRecordRtInfo() {
    this.lastData = [0, 0];
    this.currentData = [0, 0];
    this.chartData = [0, 0];
    this.lastDataPacket = [0, 0];
    this.currentDataPacket = [0, 0];
    this.chartDataPacket = [0, 0];
  }

  setEndpointSearch(value) {
    this.endPointSearchValue = value;
    this.endPointSearch$.next(value);
  }

  setEndPointSearchError(flag) {
    this.endPointSearchError$.next(flag);
  }

  searchEPval = '';
  getEndpointValue() {
    return this.searchEPval;
  }

  setEndpointValue(value) {
    this.searchEPval = value;
  }

  getMinutesByMillis(millis: any) {
    return millis / 60000;
  }


  getUnSignedUrl() {
    return this.http.get(`${this.baseUrl}`)
  }

  getRealtimeDelay() {
    // let orgId = this.sso.getOrgId();
    let orgId = this.sso.getOrganizationID(this.router.url);
    let url = `${environment.API_BASE_URL}fa/config/organization?org-id=${orgId}`;
    this.http.get(`${url}`).subscribe((res: any) => {
      if (res && res !== null) {
        let timeDelay = -1 * (res.realtimeLateflowDelay ? res.realtimeLateflowDelay : 0) * 1000;
        this.sso.setRealtimeDelay(timeDelay);
        this.timezoneDetected = timeDelay;
      } else {
        this.sso.setRealtimeDelay(0);
        this.timezoneDetected = 0;
      }
      this.delay$.next(true);
    }, error => {
      this.sso.setRealtimeDelay(0);
      this.timezoneDetected = 0;
      this.delay$.next(true);
    })
  }

  prepareAndGetRecordData(cdata, configparams?: any) {
    this.cacheRateRTDataObj = {};
    this.cachePacketRTDataObj = {};
    let data = {};
    let streamObj = {};
    if (cdata && cdata.length) {
      cdata.forEach(element => {

        if (element.confData && element.confData['graphType'] === "TRF") {
          streamObj[element.sendTime] = element;

        } else {
          if (typeof data[element.sendTime] !== 'object') {
            data[element.sendTime] = {};
          }
          data[element.sendTime][element.confData.graphType] = element;
        }

      });

      let keys = Object.keys(streamObj);
      keys.sort(function (a, b) { return Number(a) - Number(b) });
      let slen = Object.keys(streamObj).length;
      if (slen) {
        for (let i = 0; i < slen; i++) {
          this.data = streamObj[keys[i]];

          this.cacheRTDataForRecord('rate');
          this.cacheRTDataForRecord('packet');
        }
      }


    }


    return {
      stream: {
        'rate': this.getCachedata('rate'),
        'packet': this.getCachedata('packet')
      },
      bar: data
    };
  }

  cacheRTDataForRecord(type: any) {

    if (type === 'rate') {
      if (this.currentData) {
        this.lastData = this.currentData;
      } else {
        this.chartData = [0, 0];
      }

      this.currentData = this.data.maxRate ? this.data.maxRate : [0, 0];

      this.yAxixTitle = (type === 'rate') ? 'bps' : 'pps';

      let loadTime = this.data.sendTime ? this.data.sendTime : 0;

      for (let i = 1; i <= 15; i++) {
        var time = loadTime + (i * 1000);

        let key = this.removeLast3Chars(time);

        this.cacheRateRTDataObj[key] = this.generateRTforCache(this.currentData, this.lastData, this.chartData, type);
        this.removeOldKeys(this.cacheRateRTDataObj, type);

      }


    } else {
      if (this.currentDataPacket) {
        this.lastDataPacket = this.currentDataPacket;
      } else {
        this.chartDataPacket = [0, 0];
      }

      this.currentDataPacket = this.data.packet ? this.data.packet : [];

      this.yAxixTitlePacket = (type === 'rate') ? 'bps' : 'pps';

      let loadTime = this.data.sendTime ? this.data.sendTime : 0;

      for (let i = 1; i <= 15; i++) {
        var time = loadTime + (i * 1000);

        let key = this.removeLast3Chars(time);

        this.cachePacketRTDataObj[key] = this.generateRTforCache(this.currentDataPacket, this.lastDataPacket, this.chartDataPacket, type);

        this.removeOldKeys(this.cachePacketRTDataObj, type);

      }

    }

  }


  healthEmit(eventname: string, data?: any) {
    if (typeof data === 'object' && !data.replay) {
      this.setHealthCurrentMonitorInfo(data);
    }

    if (typeof data === 'object') {
      this.setRealtimeDelay(data);
    }

    if (typeof data === 'object' && data['replay'] && data['replay'] == "true") {
      let time = Math.abs(this.sso.getRealtimeDelay());
      data['startTime'] = parseInt(data['startTime']) - (time ? time : 60000);
    }

    if (this.WebSocketServer.isdisconnected) {
      console.log(JSON.stringify(data));
      console.log("Web socket is disconnected");
      this.wsConnectionError$.next(true);
      return;
    }

    if (data) {
      this.WebSocketServer.socket.emit(eventname, data);
    }
    else
      this.WebSocketServer.socket.emit(eventname);
  }

  healthRtData$: any = new BehaviorSubject(this.data);
  healthRatePacketStreamData$ = new BehaviorSubject(this.data);
  healthCacheData$ = new Subject();
  cachePonportData$ = new Subject();
  ponPortsStreamData$ = new BehaviorSubject(this.data);
  healthWSNoResponse$ = new BehaviorSubject({ isError: false, type: "" });
  healthCurrentMonitorType = '';
  healthConnectionTypes: any = {
  };

  healthListen(eventname: string) {
    this.WebSocketServer.socket.on(eventname, (data) => {
      //console.log(data);
      let cdata: any = data;
      if (typeof cdata === 'string') {
        cdata = [cdata];
      }

      if (eventname.includes('error_ipfix')) {
        if (typeof data === 'string' && !data.includes('replay')) {
          this.healthWSNoResponse$.next({ isError: true, type: eventname });
        }
      }

      if (eventname === 'IPFIX_REPLAY') {
        this.cacheRateRTDataObj = {};
        this.cachePacketRTDataObj = {};
        this.clearRecordRtInfo();
        if (cdata && cdata.length) {
          cdata = cdata.slice();
          console.log("Replay data", cdata);
          cdata.forEach(element => {
            if (this.IsJsonString(element)) {
              //element = element.slice()
              this.data = JSON.parse(element);
            } else {
              this.data = element;
            }

            this.cacheRTData('rate', 'health');
            this.cacheRTData('packet', 'health');
          });

          this.healthCacheData$.next({
            'rate': this.getCachedata('rate'),
            'packet': this.getCachedata('packet')
          });

          let sendData = { ...this.data, ...this.data.confData };
          if (sendData.graphType === 'TRF') {
            console.log(sendData);
            this.healthRatePacketStreamData$.next(sendData)
          }
        }
        // console.log(this.cacheRateRTDataObj);
      } else if (cdata && cdata[0]) {
        if (this.IsJsonString(cdata[0])) {
          cdata[0] = cdata[0].slice();
          cdata[0] = JSON.parse(cdata[0]);

        }

        if (cdata[0].confData && cdata[0].confData['monitorType'].includes(this.healthCurrentMonitorType)) {
          let sendData = { ...cdata[0], ...cdata[0].confData };


          if (sendData.graphType === 'TRF') {
            console.log(sendData);
            if (!this.healthConnectionTypes[this.healthCurrentMonitorType].hasOwnProperty('outputStartTimeDiffToCur')) {
              this.healthConnectionTypes[this.healthCurrentMonitorType]['outputStartTimeDiffToCur'] = (new Date()).getTime() - parseInt(sendData.sendTime);
            }
            this.healthRatePacketStreamData$.next(sendData)
          } else {
            this.healthRtData$.next(sendData);
          }
        }

      }

    })
  }


  listenPonPorts(eventname: string) {
    if (this.WebSocketServer.socket === null) {
      return;
    }
    this.WebSocketServer.socket.on(eventname, (data) => {
      //console.log(data);
      let cdata: any = data;
      if (typeof cdata === 'string') {
        cdata = [cdata];
      }

      if (eventname.includes("IPFIX_REPLAY")) {
        this.cacheRateRTDataObj = {};
        this.cachePacketRTDataObj = {};
        this.clearRecordRtInfo();
        if (cdata && cdata.length) {
          cdata = cdata.slice();
          cdata.forEach(element => {
            if (this.IsJsonString(element)) {
              //element = element.slice()
              this.data = JSON.parse(element);

            } else {
              this.data = element;
            }

            this.cacheRTData('rate', 'health');
            this.cacheRTData('packet', 'health');
          });

          this.cachePonportData$.next({
            'monitorId': eventname,
            'rate': this.getCachedata('rate'),
            'packet': this.getCachedata('packet')
          });

          let sendData = { ...this.data, ...this.data.confData };

          if (sendData.graphType === 'TRF') {
            this.ponPortsStreamData$.next(sendData)
          }
        }
      }
      else {
        if (cdata && cdata[0]) {
          if (this.IsJsonString(cdata[0])) {
            cdata[0] = cdata[0].slice();
            cdata[0] = JSON.parse(cdata[0]);
          }

          if (cdata[0].confData && (cdata[0].confData['monitorType'] === "PORT")) {
            let sendData = { ...cdata[0], ...cdata[0].confData };

            // console.log("sendData", sendData);
            if (sendData.graphType === 'TRF') {
              this.ponPortsStreamData$.next(sendData)
            }
          }
        }
      }
    })
  }

  ponPortsList: any = [];
  setPonportsInfo(data: any) {
    this.ponPortsList.push(data);
  }

  getPonportsInfo() {
    return this.ponPortsList;
  }

  emitPonports(eventname: string, data?: any) {
    if (this.WebSocketServer.socket === null) {
      return;
    }
    if (typeof data === 'object') {
      this.setRealtimeDelay(data);
    }

    if (typeof data === 'object' && data['replay'] && data['replay'] == "true") {
      let time = Math.abs(this.sso.getRealtimeDelay());
      data['startTime'] = parseInt(data['startTime']) - (time ? time : 60000);
    }

    if (this.WebSocketServer.isdisconnected) {
      this.wsConnectionError$.next(true);
      return;
    }

    if (data) {
      this.WebSocketServer.socket.emit(eventname, data ? data : {});
    }
    else
      this.WebSocketServer.socket.emit(eventname);
  }

  setHealthCurrentMonitorInfo(data: any) {
    if (!data['startTime']) {
      data['startTime'] = (new Date()).getTime();
    }
    this.healthConnectionTypes[data.monitorType] = data;
  }

  getHealthCurrentMonitorInfo(monitorType: any) {
    return this.healthConnectionTypes[monitorType];
  }

  setHealthMonitorType(type: any) {
    this.healthCurrentMonitorType = type;
  }

  getHealthMonitorType() {
    return this.healthCurrentMonitorType;
  }

  setHealthWindowLen(windowLen: any) {
    if (this.healthConnectionTypes[this.healthCurrentMonitorType]) {
      this.healthConnectionTypes[this.healthCurrentMonitorType].windowLen = windowLen;
    }
  }

  getHealthWindowLen() {
    return (this.healthConnectionTypes[this.healthCurrentMonitorType] && this.healthConnectionTypes[this.healthCurrentMonitorType].windowLen) ? this.healthConnectionTypes[this.healthCurrentMonitorType].windowLen : 1;
  }


  filterValues = {};
  setFilterValues(filtername, filterId, name, id) {
    this.filterValues[name] = filtername;
    this.filterValues[id] = filterId;
  }
  getFilterValues() {
    return this.filterValues;
  }

  deleteFilterValues(filtername: any, filterId: any) {
    delete this.filterValues[filtername];
    delete this.filterValues[filterId];
  }

  clearHealthReplayData() {
    this.cachePacketRTDataObj = {};
    this.cacheRateRTDataObj = {};
  }

  clearHealthInfo() {
    this.currentMonitorType = null;
    this.connectionTypes = {};
    this.filterValues = {};
  }


  calculatePercentage(total: any, data: any, length: any) {
    if (!total || data.length === 0) {
      return 0;
    }
    let filterData = data.slice(0, length);
    let filterTotal = filterData.reduce((filterTotal, item) => filterTotal + item.value, 0);
    let percentage: any = ((filterTotal / total) * 100).toFixed(2);
    if (!percentage || percentage === 'NaN') {
      return 0;
    }
    if (percentage && parseFloat(percentage) > 100) {
      return 100;
    }
    return percentage;
  }


  setRealtimeDelay(data: any) {
    data['delay'] = this.sso.getRealtimeDelay() ? (Math.abs(this.sso.getRealtimeDelay()) / 1000) : 60;
  }


  customAppSearch = (searchTerm: string, item: any) => {
    searchTerm = searchTerm.toLowerCase();
    if (item['groupName']) {
      return item['groupName'].toLowerCase().indexOf(searchTerm) > -1 || item['label'].toLowerCase().indexOf(searchTerm) > -1;
    } else {
      return item['label'].toLowerCase().indexOf(searchTerm) > -1;
    }
  }

  customAppGroupSearch = (searchTerm: string, item: any) => {
    searchTerm = searchTerm.toLowerCase();
    if (item['name']) {
      return item['name'].toLowerCase().indexOf(searchTerm) > -1 || item['name'].toLowerCase().indexOf(searchTerm) > -1;
    } else {
      return item['name'].toLowerCase().indexOf(searchTerm) > -1;
    }
  }

  customLocSearch = (searchTerm: string, item: any) => {
    searchTerm = searchTerm.toLowerCase();
    if (item['region']) {
      return item['region'].toLowerCase().indexOf(searchTerm) > -1 || item['name'].toLowerCase().indexOf(searchTerm) > -1;
    } else {
      return item['name'].toLowerCase().indexOf(searchTerm) > -1;
    }
  }


}

