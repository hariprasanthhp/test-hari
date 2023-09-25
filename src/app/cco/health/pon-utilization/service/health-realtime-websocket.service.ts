import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Highcharts from 'highcharts';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
    providedIn: 'root'
})
export class healthWebsocketService {

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
    ponPortsStreamData$ = new BehaviorSubject(this.data);

    yAxixTitle: string;
    cacheRateRTDataObj: any = {};
    currentDataPacket: any;
    lastDataPacket: any;
    chartDataPacket: number[];
    yAxixTitlePacket: string;
    cachePacketRTDataObj: any = {};
    lastChartDataObj: any = {};

    cacheData$ = new Subject();
    cachePonportData$ = new Subject();

    showModalInfo$ = new Subject();
    delay$ = new BehaviorSubject(false);

    timezoneDetected = 0;
    // timezoneDetected = -75 * 1000;
    baseUrl = `${environment.API_BASE_URL}realtime/signed-url`;
    connectWS$ = new BehaviorSubject(false);


    constructor(private dateUtils: DateUtilsService,
        private http: HttpClient,
        private sso: SsoAuthService) {
        // this.timezoneDetected = this.dateUtils.timezoneDetected();
    }

    WebSocketServer = {
        websocketPaths: ['/cco/health/pon-utilization/realtime/realtime-basic'],
        isConnected: false,
        socket: null,
        interval: null,
        isdisconnected: false,
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
                    //console.log(new Date());window.location.pathname != '/SystemtryComponent' && window.location.pathname != '/Tables'

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

            // to Make connection
            if (this.isConnected == false) {
                this.callmethod(5000, 0)
            }

            this.socket.on('connect', () => {
                this.isConnected = true;
            });

            this.socket.on('ping', () => {
                setTimeout(() => {
                    this.socket.emit('pong');
                }, 500)
            });

            // once connection closed or disconnected
            this.socket.on('disconnect', (err) => {
                this.isConnected = false;
                this.isdisconnected = true;
                // this.socket.close();
                // this.callmethod(5000, 0)
            });

            this.socket.on("connect_error", (err) => {
            })
            return this.socket;
        }
    }




    removeExistingListeners() {
        this.WebSocketServer.socket.off();
    }

    // To send msg to server
    emit(eventname: string, data?: any) {
        // if (this.connection()) {
        if (typeof data === 'object' && !data.replay) {
            this.setCurrentMonitorInfo(data);
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
            //console.log(data);
            let cdata: any = data;
            if (typeof cdata === 'string') {
                cdata = [cdata];
            }

            //console.log(eventname);

            if (eventname === 'IPFIX_REPLAY') {
                this.cacheRateRTDataObj = {};
                this.cachePacketRTDataObj = {};
                if (cdata && cdata.length) {
                    cdata = cdata.slice();
                    cdata.forEach(element => {
                        if (this.IsJsonString(element)) {
                            //element = element.slice()
                            this.data = JSON.parse(element);

                        } else {
                            this.data = element;
                        }

                        this.cacheRTData('rate');
                        this.cacheRTData('packet');
                    });

                    this.cacheData$.next({
                        'rate': this.getCachedata('rate'),
                        'packet': this.getCachedata('packet')
                    });

                    let sendData = { ...this.data, ...this.data.confData };

                    if (sendData.graphType === 'TRF') {

                        this.ratePacketStreamData$.next(sendData)
                    }
                }

            } else if (cdata && cdata[0]) {
                if (this.IsJsonString(cdata[0])) {
                    cdata[0] = cdata[0].slice();
                    cdata[0] = JSON.parse(cdata[0]);

                }


                if (cdata[0].confData && cdata[0].confData['monitorType'].includes(this.currentMonitorType)) {
                    let sendData = { ...cdata[0], ...cdata[0].confData };


                    if (sendData.graphType === 'TRF') {
                        if (!this.connectionTypes[this.currentMonitorType].hasOwnProperty('outputStartTimeDiffToCur')) {
                            this.connectionTypes[this.currentMonitorType]['outputStartTimeDiffToCur'] = (new Date()).getTime() - parseInt(sendData.sendTime);
                        }
                        this.ratePacketStreamData$.next(sendData)
                    } else {
                        this.rtData$.next(sendData);

                    }
                }

            }

        })
    }

    listenPonPorts(eventname: string) {
        this.WebSocketServer.socket.on(eventname, (data) => {
            //console.log(data);
            let cdata: any = data;
            if (typeof cdata === 'string') {
                cdata = [cdata];
            }

            if (eventname.includes("IPFIX_REPLAY")) {
                this.cacheRateRTDataObj = {};
                this.cachePacketRTDataObj = {};
                if (cdata && cdata.length) {
                    cdata = cdata.slice();
                    cdata.forEach(element => {
                        if (this.IsJsonString(element)) {
                            //element = element.slice()
                            this.data = JSON.parse(element);

                        } else {
                            this.data = element;
                        }

                        this.cacheRTData('rate');
                        this.cacheRTData('packet');
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
        // if (typeof data === 'object' && !data.replay) {
        //     this.setPonportsInfo(data);
        // }

        if (data) {
            this.WebSocketServer.socket.emit(eventname, data);
        }
        else
            this.WebSocketServer.socket.emit(eventname);
    }

    cacheInterval: any
    cachePacketInterval: any

    cacheRTData(type: any, sendTime = 0) {

        if (type === 'rate') {
            if (this.currentData) {
                this.lastData = this.currentData;
            } else {
                this.chartData = [0, 0];
            }

            this.currentData = this.data.maxRate ? this.data.maxRate : [0, 0];

            this.yAxixTitle = (type === 'rate') ? 'bps' : 'pps';

            let loadTime = this.data.sendTime ? this.data.sendTime + this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;

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

            let loadTime = this.data.sendTime ? this.data.sendTime + this.connectionTypes[this.currentMonitorType].outputStartTimeDiffToCur + this.timezoneDetected : 0;
            let inc = 0;

            for (let i = 1; i <= 15; i++) {
                var time = loadTime + (i * 1000);

                let key = this.removeLast3Chars(time);

                this.cachePacketRTDataObj[key] = this.generateRTforCache(this.currentDataPacket, this.lastDataPacket, this.chartDataPacket, type);

                this.removeOldKeys(this.cachePacketRTDataObj, type);

            }


            //console.log("cache packet realtime data", this.cachePacketRTDataObj);

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

    removeOldKeys(lastChartDataObj, chartName): void {
        let keys = Object.keys(lastChartDataObj);
        let len = keys.length;
        let values: any = this.getFilterValues()
        let windowLen = (values.selectedOption ? values.selectedOption : 1) * 300;

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

            //console.log("removal of old chart length", Object.keys(lastChartDataObj).length);

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
            this.connectWS$.next(true);
            socket.on('disconnect', (err) => {
                if (err == "transport close" || err == "ping timeout") {
                    if (Object.keys(this.connectionTypes).length === 0) {
                        socket.close()
                        this.reconnectWebSocket();
                    }
                    // this.showModalInfo$.next(true);
                }
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
        data['startTime'] = (new Date()).getTime().toString();
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
        this.connectionTypes[this.currentMonitorType].windowLen = windowLen;
    }

    getWindowLen() {
        return (this.connectionTypes[this.currentMonitorType] && this.connectionTypes[this.currentMonitorType].windowLen) ? this.connectionTypes[this.currentMonitorType].windowLen : '';
    }


    filterValues = {};
    setFilterValues(filtername, filterId, name, id) {
        this.filterValues[name] = filtername;
        this.filterValues[id] = filterId;
    }
    getFilterValues() {

        return this.filterValues;
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

    clearInfo() {
        this.currentMonitorType = null;
        this.connectionTypes = {};
        this.filterValues = {};
    }


    getUnSignedUrl() {
        return this.http.get(`${this.baseUrl}`)
    }

    getRealtimeDelay() {
        let orgId = this.sso.getOrgId();
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

}

