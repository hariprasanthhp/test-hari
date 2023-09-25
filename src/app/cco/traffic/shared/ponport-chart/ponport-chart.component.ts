import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';

@Component({
  selector: 'app-ponport-chart',
  templateUrl: './ponport-chart.component.html',
  styleUrls: ['./ponport-chart.component.scss']
})
export class PonportChartComponent implements OnInit {

  @Input() monitorId: string = "";
  @Input() windowLen: any;
  @Input() selectedTime: any;
  @Input() IsDuplicate: any;
  @Input() Position: any;
  @Input() location: any;
  @Input() region: any;
  @Input() system: any;
  @Input() ponPorts: any;
  @Input() startTime: any;
  @Input() replay: any;
  @Input() regionUuid = "";
  @Input() locationUuid = "";
  @Input() systemUuid = "";
  @Output() valueChange = new EventEmitter();

  orgId: any;
  orgid_tenantid: any;
  streamSubscription: Subscription;
  showRealTime: boolean = true;
  WSRequestObj = {
    "orgId": "",
    "monitorType": "PORT",
    "networkId": "",
    "monitorId": "",
    "graphType": "TRF",
    "region": "",
    "location": "",
    "system": "",
    "port": "",
    "regionUuid": "",
    "locationUuid": "",
    "systemUuid": ""
  }

  language: any;
  languageSubject;
  data: any = {
    maxRate: [],
    packet: []
  };
  rateUnit = 'bps';
  packetUnit = 'pps';
  cachePacketData: any = {};
  cacheRateData: any = {};
  cacheDataSubscription: any;
  eventname = "";

  constructor(
    private sso: SsoAuthService,
    private webSocketService: WebsocketService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.calculateSubscriptiontime();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.orgId = this.sso.getOrgId()
    this.orgid_tenantid = this.orgId + '_' + '0';
    this.WSRequestObj.orgId = this.orgId;
    this.WSRequestObj.monitorType = "PORT";
    this.WSRequestObj.networkId = this.orgid_tenantid;
    this.WSRequestObj.monitorId = this.monitorId;
    this.WSRequestObj.region = this.region;
    this.WSRequestObj.location = this.location;
    this.WSRequestObj.system = this.system;
    this.WSRequestObj.port = this.ponPorts;
    this.WSRequestObj.regionUuid = this.regionUuid;
    this.WSRequestObj.locationUuid = this.locationUuid;
    this.WSRequestObj.systemUuid = this.systemUuid;
    this.WSRequestObj['startTime'] = (new Date()).getTime();
    if (this.replay) {
      this.WSRequestObj['replay'] = "true";
      this.WSRequestObj['startTime'] = this.startTime.toString();
      this.WSRequestObj['endTime'] = (new Date()).getTime();
      this.eventname = "IPFIX_REPLAY_" + this.monitorId
      this.webSocketService.listenPonPorts(this.eventname);
    }
    if (this.IsDuplicate) {
      this.getRtData();
    } else {
      this.getRtData();
      this.send("IPFIX_PORT", this.WSRequestObj);
      this.webSocketService.listenPonPorts("IPFIX_PORT");
    }
    let obj = {
      monitorId: this.monitorId,
      region: this.region,
      location: this.location,
      system: this.system,
      port: this.ponPorts,
      windowLen: this.windowLen,
      IsDuplicate: this.IsDuplicate,
      Position: this.Position,
      startTime: this.WSRequestObj['startTime'],
      replay: true,
      regionUuid: this.regionUuid,
      locationUuid: this.locationUuid,
      systemUuid: this.systemUuid
    }
    if (!this.replay) {
      this.webSocketService.setPonportsInfo(obj)
    }

    let that = this;
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        let ponPortList = that.webSocketService.getPonportsInfo();
        let ponPort = ponPortList.filter((element) => {
          if (element.monitorId === that.monitorId) {
            return element;
          }
        })
        let params = {
          "orgId": that.orgId,
          "monitorType": 'PORT',
          "networkId": that.orgid_tenantid,
          "monitorId": ponPort[0].monitorId,
          "graphType": "TRF",
          "replay": "true",
          "port": ponPort[0].monitorId,
          "region": ponPort[0].region,
          "location": ponPort[0].location,
          "system": ponPort[0].system,
          "startTime": ponPort[0].startTime,
          "endTime": (new Date()).getTime(),
          "regionUuid": ponPort[0].regionUuid,
          "locationUuid": ponPort[0].locationUuid,
          "systemUuid": ponPort[0].systemUuid
        };
        that.eventname = "IPFIX_REPLAY_" + ponPort[0].monitorId;
        that.webSocketService.listenPonPorts(that.eventname);
        that.send('IPFIX_PORT', params);
      }
    });

    this.reConnectWebSocket();
  }
  ngOnChanges(changes: SimpleChanges) {
    if ((changes.selectedTime && changes.selectedTime.currentValue)) {
      this.selectedTime = changes.selectedTime.currentValue;
    }

  }

  ngOnDestroy(): void {
    if (this.streamSubscription) {
      this.streamSubscription.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
  }

  closeChart() {
    let obj = {
      "monitorId": this.monitorId,
      "Position": this.Position,
      "region": this.region,
      "location": this.location
    }
    this.valueChange.emit(obj);
  }

  send(eventname, data) {
    this.webSocketService.emitPonports(eventname, data);
  }

  getRtData() {
    if (this.streamSubscription) {
      this.streamSubscription.unsubscribe();
    }

    this.streamSubscription = this.webSocketService.ponPortsStreamData$.subscribe((data: any) => {
      this.showRealTime = true;
      if (data.ifName === this.monitorId && data.region === this.region) {
        this.lastSubscriptionTime = new Date().getTime();
        this.data = data;
      }
    });

    this.cacheDataSubscription = this.webSocketService.cachePonportData$.subscribe((data: any) => {
      if (data['monitorId'] === this.eventname) {
        this.cachePacketData = data['packet'];
        this.cacheRateData = data['rate'];
      }
    });

  }

  lastSubscriptionTime: any;
  interval: any;
  calculateSubscriptiontime() {
    this.interval = setInterval(() => {
      let diff = new Date().getTime() - this.lastSubscriptionTime;
      if (diff >= 30000) {
        this.data.maxRate = [0, 0]
        this.data.packet = [0, 0]
      }
    }, 15000)
  }


  reConnectSubscription: any;
  reConnectWebSocket() {
    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
    this.webSocketService.connectWS$.subscribe((res: any) => {
      if (res && this.webSocketService.WebSocketServer.hasDisconnectedOnce) {
        this.webSocketService.listenPonPorts("IPFIX_PORT");
        this.send('IPFIX_PORT', this.WSRequestObj);
        let ponPortList = this.webSocketService.getPonportsInfo();
        console.log(ponPortList, "ponPortList");
        let ponPort = ponPortList.filter((element) => {
          if (element.monitorId === this.monitorId) {
            return element;
          }
        })
        let params = {
          "orgId": this.orgId,
          "monitorType": 'PORT',
          "networkId": this.orgid_tenantid,
          "monitorId": ponPort[0].monitorId,
          "graphType": "TRF",
          "replay": "true",
          "port": ponPort[0].monitorId,
          "region": ponPort[0].region,
          "location": ponPort[0].location,
          "system": ponPort[0].system,
          "startTime": ponPort[0].startTime,
          "endTime": (new Date()).getTime(),
          "regionUuid": ponPort[0].regionUuid,
          "locationUuid": ponPort[0].locationUuid,
          "systemUuid": ponPort[0].systemUuid
        };
        this.eventname = "IPFIX_REPLAY_" + ponPort[0].monitorId;
        this.webSocketService.listenPonPorts(this.eventname);
        this.send('IPFIX_PORT', params);
      }
    });
  }

}
