import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as go from 'gojs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { HealthService } from 'src/app/cco/health/service/health.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../data.service';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-support-topology',
  templateUrl: './support-topology.component.html',
  styleUrls: ['./support-topology.component.scss'],
})
export class SupportTopologyComponent implements OnInit, OnDestroy {
  @ViewChild('APDiagram') APDiagram;
  @ViewChild('searchValue') searchValue: ElementRef;
  @ViewChild('issueBox') issueBox: ElementRef;
  expandedNodes: any = [];
  nodeLinkColor = { green: '#c8d652', red: '#c7a9a2', yellow: '#ffeb3b' };
  nodeColor = { green: '#f6f8e9', red: '#f6e6e8', yellow: '#fff17a8c' };
  searchSubject: Subject<any> = new Subject();
  locationFixed: boolean = false;
  searchText: any;
  MODULE: string = 'support';
  languageSubject;
  serialNumber = " ";
  language: any;
  Devices;
  issueData;
  totalissues: any;
  issueList;
  isIconClicked = [];
  primaryActionButton = [];
  Description = [];
  severity = [];
  reason = [];
  apiCallDone: boolean = false;
  loading: Boolean = false;
  lastDeviceClickData: any = {};
  uniqueDevices: any = [];
  uniqueHostnames: any = [];
  clientData: any = {};
  twoHrsCategory = [];
  twoHrsData = [];
  sixHrsData = [];
  oneDayData = [];
  width = '100%';
  height = 400;
  type = 'msline';
  clientDetails: any;
  title = 'app';
  apInformtion: string = '';
  orgId: string;
  serialNo;

  routerMac: any;
  mainDiagram: any;
  card2: any;
  button1: any;
  VisitedPage: string = '';
  routerKey: string = '';

  nextVisitedPage: string = '';
  nextRouterKey: string = '';
  nextTabledataUniqueId: string = '';
  currentPage: string = 'main';
  dblClkFired: boolean = false;

  public $ = go.GraphObject.make;
  apData: any = {};
  apToolTip: any;
  apLinkTooolTip: any;
  apImageUrl: any = '';
  apNodeData: any = [];
  apLinkData: any = [];

  topologyData: any = {
    phy: [],
    legacy: [],
    clientWifi: [],
  };

  topologyView: boolean = true;
  tplgyType: string = '';
  tableView: boolean = false;
  legacyChecked: boolean = false;
  phyChecked: boolean = false;
  signalChecked: boolean = false;
  filterEnabled: boolean = false;
  successFilterEnabled: boolean = false;
  deviceDatas: any = [];
  deviceDatasUpdated: any = [];

  backBtnDisabled: boolean = true;
  accessPointId: any = '';
  nodeDataArray: any = [];
  linkDataArray: any = [];

  hostnameFilterData: any = [];
  clientDevTopology: any;
  topRow: boolean = true;
  onClickClients = '';
  resValue: any;
  selectedAPValue: any;
  clientArr: any = [];
  rgArr: any = [];
  clientDeviceSSID: boolean = false;
  objData: any;
  toKey: any;
  rgflag = false;
  rgDetails: any = [];
  rgModel = '';
  raManufacture = '';
  ipv4 = '';
  ipv6 = '';
  pageNumber = 1;
  pageSize = 10;
  makemodel = [];
  errorInfo: any;
  error: boolean;
  zoomFactorList = [
    {
      factor: '25%',
      value: 0.25,
    },
    {
      factor: '50%',
      value: 0.5,
    },
    {
      factor: '75%',
      value: 0.75,
    },
    {
      factor: '100%',
      value: 1,
    },
    {
      factor: '125%',
      value: 1.25,
    },
    {
      factor: '150%',
      value: 1.5,
    },
    {
      factor: '175%',
      value: 1.75,
    },
    {
      factor: '200%',
      value: 2,
    },
  ];
  zoomScale = 1;
  lightLevel;
  rxPower;
  downStream;
  upStream;

  images: any = [
    'assets/images/tv-all-clear.png',
    'assets/images/printer-clear.png',
    'assets/images/ipad-all-clear.png',
    'assets/images/laptop-all-clear.png',
    'assets/images/phone-all-clear-state.png',
    'assets/images/camera-clear.png',
    'assets/images/audiobox-clear.png',
    'assets/images/gaming-clear.png',
    'assets/images/ipad-all-clear.png',
    'assets/images/laptop-all-clear.png',
  ];

  clientDevicesImages = [
    'assets/images/deviceicons/question_mark_grey_icon.png',
    'assets/images/deviceicons/phone_grey_icon.png',
    'assets/images/deviceicons/computer_grey_icon.png',
    'assets/images/deviceicons/console_grey_icon.png',
    'assets/images/deviceicons/media_player_grey_icon.png',
    'assets/images/deviceicons/printer_grey_icon.png',
    'assets/images/deviceicons/television_grey_icon.png',
    'assets/images/deviceicons/network_icon_grey.png',
    'assets/images/deviceicons/camera_grey_icon.png',
    'assets/images/deviceicons/tablet_grey_icon.png',
    'assets/images/deviceicons/voip_grey.png',
    'assets/images/deviceicons/iot_grey.png',
    'assets/images/deviceicons/ic_modem-24px.svg',
    'assets/images/deviceicons/question_mark_grey_icon.png',
  ];

  imagesObj: any = {
    Television: 'assets/images/tv-all-clear.png',
    Tablet: 'assets/images/ipad-all-clear.png',
    Phone: 'assets/images/phone-all-clear-state.png',
    Camera: 'assets/images/camera-clear.png',
    'Media Player': 'assets/images/audiobox-clear.png',
    Console: 'assets/images/gaming-clear.png',
    'Wi-Fi IoT': 'assets/images/iot.png',
    'Wi Fi IoT': 'assets/images/iot.png',
    'Wifi IoT': 'assets/images/iot.png',
    Computer: 'assets/images/computer.png',
    Printer: 'assets/images/printer-clear.png',
    Network: 'assets/images/network.png', // what is network
    Voip: 'assets/images/voip.png', // what is Voip
    Fridge: 'assets/images/iot.png',

    'Television-red': 'assets/images/tv-critical-issues.png',
    'Tablet-red': 'assets/images/ipad-critical.png',
    'Phone-red': 'assets/images/phone-critical-state.png',
    'Camera-red': 'assets/images/camera-critical.png',
    'Media Player-red': 'assets/images/audiobox-critical.png',
    'Console-red': 'assets/images/gaming-critical.png',
    'Wi-Fi IoT-red': 'assets/images/iot-critical.png',
    'Wi Fi IoT-red': 'assets/images/iot-critical.png',
    'Wifi IoT-red': 'assets/images/iot-critical.png',
    'Computer-red': 'assets/images/computer-critical.png',
    'Printer-red': 'assets/images/printer-critical.png',
    'Network-red': 'assets/images/network-critical.png', // what is network
    'Voip-red': 'assets/images/voip-critical.png', // what is Voip
    'Fridge-red': 'assets/images/iot-critical.png',
    'iot-red': 'assets/images/iot-critical.png',

    'wireless-excellent': 'assets/img/wireless-excellent.svg',
    'wireless-good': 'assets/img/wireless-good.svg',
    'wireless-toofar': 'assets/img/wireless-toofar.svg',
    'wireless-tooclose': 'assets/img/wireless-tooclose.svg',
    'wireless-unavailable': 'assets/img/wireless-unavailable.svg',
  };
  accessPointImages = {
    yellow: 'assets/images/myRouter_yellow.svg',
    green: 'assets/images/myRouter.svg',
    red: 'assets/images/myRouter_red.svg',
  };

  ssid: string = '';
  radio: string = '';
  ethOrAPType: string = '';
  ethOrAPImageUrl: string = '';
  accesspoint: boolean = false;
  APTopology: any;
  rgKey: any;
  noData: boolean = false;
  noRG: boolean = false;
  innerChildsNodes: any = [];
  isDevEnv = false;
  ont_serialNo = '';
  issue_reason = '';
  aps_issue = '';
  client_issue = '';
  ont_issue = '';
  isAPSNodeClicked = false;
  issueCode = '';
  issueType = '';
  issueName = '';
  bhissueCode = '';
  bhissueType = '';
  bhissueName = '';
  isClientNodeClicked = false;
  backhaul_issue = '';
  isBHNodeClicked = false;
  isrgWithIssue = false;
  isapWithIssue = false;
  swVersion: any;
  scope: any = {
    qoeRead: false
  };
  aps_issue_length: any;
  clickedAPS: any;
  client_issue_length: any;
  clickedClient: any;
  backhaul_issue_length: any;
  clickedBackhaul: any;
  commandIQDataSubs: any;
  showTopologyTab = false;
  showQoeTab = false;
  qoeSubscribed: any;

  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private issuseservice: IssuesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ssoAuthService: SsoAuthService,
    private dataService: DataServiceService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private commonOrgService: CommonService,
    private api: SupportWifiService,
    private healthService: HealthService,
    private titleService: Title
  ) {
    go.Diagram.licenseKey = environment.GO_JS_KEY;
    go.Shape.defineFigureGenerator('Badge', function (shape, w, h) {
      var radius = h / 2,
        geo = new go.Geometry();

      // a single figure consisting of straight lines and half-circle arcs
      geo.add(new go.PathFigure(0, radius)
        .add(new go.PathSegment(go.PathSegment.Arc, 90, 180, radius, radius, radius, radius))
        .add(new go.PathSegment(go.PathSegment.Line, w - radius, 0))
        .add(new go.PathSegment(go.PathSegment.Arc, 270, 180, w - radius, radius, radius, radius))
        .add(new go.PathSegment(go.PathSegment.Line, radius, h).close()));

      // don't intersect with two top corners when used in an "Auto" Panel
      geo.spot1 = new go.Spot(0, 0, 0.1 * radius, 0.1 * radius);
      geo.spot2 = new go.Spot(1, 1, -0.1 * radius, 0);

      return geo;
    });
    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
  }

  ngOnInit(): void {
    this.isDevEnv = this.ssoAuthService.API.includes('dev');
    this.commandIQDataSubs = this.ssoAuthService.commandIQData.subscribe((data: any) => {
      this.scope.qoeRead = true;
      //this.qoeCheck();
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['Topology']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
        this.rgArr = [];
        this.getData();
      }
    );
    this.titleService.setTitle(`${this.language['Topology']} - ${this.language['Overview']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.backBtnDisabled = true;
    this.route.queryParams.subscribe((params: any) => {
      this.routerMac = params['routerMac'];
      this.getData();
      this.getAllClientsData(this.routerMac);
    });

    this.dataService.showTopology.subscribe(flag => {
      this.showTopologyTab = flag;
    });

    setTimeout(() => {
      this.qoeSubscribed = this.dataService.showQoe.subscribe(flag => {
        this.showQoeTab = flag;
      });
    }, 100);

  }

  ngAfterViewInit(): void { }

  getData() {
    this.loading = true;
    let url = `assets/data/rg.json`;
    var Devices = JSON.parse(this.ssoAuthService.getSerialNo());
    var SubscriberId = this.ssoAuthService.getCSCSubscriberId();
    var serialNo = [];
    let ont = JSON.parse(sessionStorage.getItem(`${this.ssoAuthService.getTabId()}calix.deviceData`));
    let ontUUID = '';
    let SerialNo = '';
    Devices.forEach((element) => {
      if (element.serialNumber) {
        var newElement = {};
        (newElement['serialNumber'] = element.serialNumber),
          (newElement['opMode'] = element.opMode);
        ont.forEach(element => {
          if (element.hasOwnProperty('ont')) {
            this.ont_serialNo = element.serialNumber;
            let ontValue = element.ont;
            ontUUID = ontValue.uuid;
            SerialNo = element.serialNumber;
            newElement["isOnt"] = true;
            newElement["ontSerialNumber"] = ontValue.serialNo;
            newElement["vendorId"] = ontValue.vendorId;
          }
        });
        serialNo.push(newElement);
      }
    });
    let data = {
      subscriberId: SubscriberId,
      devices: serialNo,
    };
    let orgId = +localStorage.getItem('calix.org_id');
    this.issuseservice.topologyValue(orgId, data).subscribe(
      (json: any) => {
        // this.http.get(url).subscribe(
        //   (json: any) => {
        this.swVersion = parseFloat(json.landing.rg.version);
        if (
          Object.keys(json.landing.rg).length > 0 &&
          json.landing.rg.aps &&
          json.landing.rg.aps.length == 0
        ) {
          this.loading = false;
          this.noData = true;
          return;
        }
        if (json.landing.ont && this.ont_serialNo != json.landing.rg['sn']) {
          if (
            json.landing.ont['ont-color'] == 'red' ||
            json.landing.ont['ont-color'] == 'yellow'
          ) {
            this.rgflag = true;
            let name = '';
            name = this.ont_serialNo;
            let ontIssue = json.landing.ont['ont-issue-list'], mapTrSerial = [];
            // let rgIssue = json.landing.rg['rg-issue-list'], mapTrSerial = [];

            const wapFailed = ontIssue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
            ontIssue = ontIssue.filter((obj, i) => {
              if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
                return obj;
              } else {
                mapTrSerial.push(obj?.serialNumber);
              }
            });
            for (let i = ontIssue.length - 1; i >= 0; i--) {
              if (mapTrSerial.includes(ontIssue[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(ontIssue[i]["code"])) {
                ontIssue.push({
                  "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
                  "subscriberId": "",
                  "serialNumber": ontIssue[i]["serialNumber"],
                  "source": ontIssue[i]["serialNumber"],
                  "sourceId": ontIssue[i]["serialNumber"],
                  "type": "ROUTER",
                  "severity": 0,
                  "reason": "High Operating Temperature Observed",
                  "isValid": true
                });
                ontIssue.splice(i, 1);
              }
            }
            this.issueData = ontIssue.filter(obj => this.issueCode.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
            this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
            this.issueList = this.issueData;
            this.totalissues = this.issueList.length;
            this.initalize();
            if (ontIssue.length > 0) {
              this.ont_issue = '';
              for (let issue = 0; issue < ontIssue.length; issue++) {
                this.issueDescription(ontIssue[issue].code, 'ont', name, '');
              }
            }
            let params = {
              name: name,
              note: this.ont_issue,
            };
            JSON.stringify(this.rgArr.push(params));
          }
        }
        if (
          json.landing.rg['rg-color'] == 'red' ||
          json.landing.rg['rg-color'] == 'yellow'
        ) {
          this.rgflag = true;
          let name = '';
          if (json.landing.rg['hostname']) {
            name = json.landing.rg['hostname'];
          } else {
            name = json.landing.rg['sn'];
          }
          let rgIssue = json.landing.rg['rg-issue-list'], mapTrSerial = [];
          // let issueData = json.landing.rg['rg-issue-list'], mapTrSerial = [];
          const wapFailed = rgIssue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
          rgIssue = rgIssue.filter((obj, i) => {
            if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
              return obj;
            } else {
              mapTrSerial.push(obj?.serialNumber);
            }
          });
          for (let i = rgIssue.length - 1; i >= 0; i--) {
            if (mapTrSerial.includes(rgIssue[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(rgIssue[i]["code"])) {
              rgIssue.push({
                "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
                "subscriberId": "",
                "serialNumber": rgIssue[i]["serialNumber"],
                "source": rgIssue[i]["serialNumber"],
                "sourceId": rgIssue[i]["serialNumber"],
                "type": "ROUTER",
                "severity": 0,
                "reason": "High Operating Temperature Observed",
                "isValid": true
              });
              rgIssue.splice(i, 1);
            }
          }
          this.issueData = rgIssue.filter(obj => this.issueCode.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
          this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
          this.issueList = this.issueData;
          this.totalissues = this.issueList.length;
          this.initalize();
          if (rgIssue.length > 0) {
            this.issue_reason = '';
            for (let issue = 0; issue < rgIssue.length; issue++) {
              this.issueDescription(rgIssue[issue].code, 'rg', name, '');
            }
            let params = {
              name: name,
              note: this.issue_reason,
            };
            JSON.stringify(this.rgArr.push(params));
          }
        }
        var date = new Date();
        let fromDate = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
        let todate = new Date();

        let params = {
          tenant: "0",
          granularity: "15min",
          fsan: SerialNo,
          startTime: `${this.startISODate(fromDate, false)}`,
          endTime: `${this.startISODate(todate, true)}`,
          // startTime: `${year}-${month}-${day}T00:00:00Z`,
          // endTime: `${year}-${month}-${day}T23:59:00Z`,
          // ont: ontUUID
        }
        let query = "";
        for (var key in params) {
          if (params[key] == undefined || params[key] == "undefined" || params[key] == "") {
            continue;
          }
          if (query != "") {
            query += "&";
          }
          query += key + "=" + encodeURIComponent(params[key]);
        }
        let serialNumber = '';
        if (
          !json.landing.rg.mac &&
          json.landing.rg.aps &&
          json.landing.rg.aps.length > 0
        ) {
          serialNumber = json.landing.rg.aps[0].sn;
          this.noRG = true;
        } else if (json.landing.rg.sn) {
          serialNumber = json.landing.rg.sn;
        }
        let pageNumber = 1;
        let pageSize = 10;
        if (json.landing.ont) {
          this.healthService
            .timeseries(query, 'ont')
            .subscribe((res: any) => {
              this.loading = false;
              if (res && res.length > 0) {
                let lightLevel = '', rxPower = '', downStream = '', upStream = '';
                let lightLevalStatus = false, rxPowerStatus = false, dsStatus = false, usStatus = false;
                for (let i = res.length - 1; i >= 0; i--) {
                  // if((lightLevel || lightLevel == 0) && (rxPower || rxPower == 0) && (downStream || downStream == 0) && (upStream || upStream == 0)) {
                  //   return;
                  // } else {
                  // if ((res[i].neOptSignalLvl || res[i].neOptSignalLvl == 0) && !lightLevalStatus) {
                  // lightLevel = lightLevel || lightLevel != '' ? lightLevel : res[i].neOptSignalLvl;
                  // this.lightLevel = lightLevel.toString();
                  if ((res[i].neOptSignalLvl && res[i].neOptSignalLvl > -40) && !lightLevalStatus) {
                    this.lightLevel = res[i].neOptSignalLvl.toFixed('2');
                    lightLevalStatus = true;
                  }
                  if ((res[i].rxOptPwr && res[i].rxOptPwr > -40) && !rxPowerStatus) {
                    this.rxPower = res[i].rxOptPwr.toFixed('2');
                    rxPowerStatus = true;
                  }
                  if ((res[i].dsBipErr || res[i].dsBipErr == 0) && !dsStatus) {
                    downStream = downStream || downStream != '' ? downStream : res[i].dsBipErr;
                    this.downStream = downStream.toString();
                    dsStatus = true;
                  }
                  if ((res[i].usBipErr || res[i].usBipErr == 0) && !usStatus) {
                    upStream = upStream || upStream != '' ? upStream : res[i].usBipErr;
                    this.upStream = upStream.toString();
                    usStatus = true;
                  }
                }
              }
              this.dataService
                .performSearch(orgId, serialNumber, pageNumber, pageSize)
                .subscribe(
                  async (searchData: any) => {
                    this.loading = false;
                    this.rgDetails = searchData;
                    for (let i = 0; i < this.rgDetails.records.length; i++) {
                      for (
                        let j = 0;
                        j < this.rgDetails.records[i].devices.length;
                        j++
                      ) {
                        if (
                          this.rgDetails.records[i].devices[j].serialNumber ==
                          serialNumber
                        ) {
                          this.rgModel =
                            this.rgDetails.records[i].devices[j].modelName;
                          this.raManufacture =
                            this.rgDetails.records[i].devices[j].manufacturer;
                          this.ipv4 = this.rgDetails.records[i].devices[j].ipAddress;
                          this.ipv6 =
                            this.rgDetails.records[i].devices[j].secondIpAddress;
                        }
                        let params = {
                          model: this.rgDetails.records[i].devices[j].modelName,
                          manufacture:
                            this.rgDetails.records[i].devices[j].manufacturer,
                          sno: this.rgDetails.records[i].devices[j].serialNumber,
                        };
                        this.makemodel.push(params);
                      }
                    }
                    // this.resValue = JSON.parse(JSON.stringify(json));
                    this.resValue = json;
                    this.loadInitialDiagram(json);
                  },
                  (err: HttpErrorResponse) => {
                    this.pageErrorHandle(err);
                    this.loading = false;
                  }
                );
            },
              (err: HttpErrorResponse) => {
                this.pageErrorHandle(err);
                this.loading = false;
              }
            );
        } else {
          this.dataService
            .performSearch(orgId, serialNumber, pageNumber, pageSize)
            .subscribe(
              async (searchData: any) => {
                this.loading = false;
                this.rgDetails = searchData;
                for (let i = 0; i < this.rgDetails.records.length; i++) {
                  for (
                    let j = 0;
                    j < this.rgDetails.records[i].devices.length;
                    j++
                  ) {
                    if (
                      this.rgDetails.records[i].devices[j].serialNumber ==
                      serialNumber
                    ) {
                      this.rgModel =
                        this.rgDetails.records[i].devices[j].modelName;
                      this.raManufacture =
                        this.rgDetails.records[i].devices[j].manufacturer;
                      this.ipv4 = this.rgDetails.records[i].devices[j].ipAddress;
                      this.ipv6 =
                        this.rgDetails.records[i].devices[j].secondIpAddress;
                    }
                    let params = {
                      model: this.rgDetails.records[i].devices[j].modelName,
                      manufacture:
                        this.rgDetails.records[i].devices[j].manufacturer,
                      sno: this.rgDetails.records[i].devices[j].serialNumber,
                    };
                    this.makemodel.push(params);
                  }
                }
                // this.resValue = JSON.parse(JSON.stringify(json));
                this.resValue = json;
                this.loadInitialDiagram(json);
              },
              (err: HttpErrorResponse) => {
                this.pageErrorHandle(err);
                this.loading = false;
              }
            );
        }
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      }
    );
  }

  async loadInitialDiagram(json) {
    this.nodeDataArray = [];
    this.linkDataArray = [];
    let rgColor = '';
    let linkColor = '';
    let uplinkText = [];
    let uplinkRate = [];
    let linkColumn;
    let ontSN = '';
    if (Object.keys(json.landing.uplink).length > 0) {
      // uplinkText = `MAC : ${json.landing.uplink.mac}`;
      // uplinkRate = `Download Rate : ${json.landing.uplink.downloadRate} Mbps \n Upload Rate : ${json.landing.uplink.uploadRate} Mbps `;
      linkColumn = [
        { attr: "property", text: "", column: 0 },
        { attr: "value", text: "", column: 1 }
      ];
      if (json.landing.uplink.mac) {
        uplinkText = [{ columns: [{ attr: "property", text: this.language.MAC }, { attr: "value", text: `${json.landing.uplink.mac}` }] }];
        uplinkRate = [{ columns: [{ attr: "property", text: this.language.Download_Rate }, { attr: "value", text: `${json.landing.uplink.downloadRate} Mbps` }] },
        { columns: [{ attr: "property", text: this.language.Upload_Rate }, { attr: "value", text: `${json.landing.uplink.uploadRate} Mbps` }] }];
      }
    }
    let ontRgSN = true;
    let ontDataArr = {};
    // ONT Function
    let entArr = this.ssoAuthService.getEntitlementsArr();
    let cscType = this.ssoAuthService.getCscType();
    if (json.landing.ont && Object.keys(json.landing.ont).length > 0) {
      if (entArr.indexOf('102') > -1 && cscType == 'EME') {
        ontSN = json.landing.ont['discoveredSerialNumber'];
        json.landing.rg['ontSN'] = this.ont_serialNo;
        let rgSN = json.landing.rg['sn'].substring(json.landing.rg['sn'].indexOf('CXNK00') + 6)
        if (ontSN == rgSN) {
          json.landing.rg['category'] = 'ontNode';
          ontRgSN = true;
        } else {
          ontRgSN = false;
          ontDataArr = {
            isONT: true,
            label: this.ont_serialNo,
            source: 'assets/images/ic_ONT.svg',
            key: json.landing.ont['ontId'],
            width: 15,
            height: 30,
            category: 'otherNode'
          };
          json.landing.rg['category'] = 'otherNode';
        }
        let ontConnection = '';
        if (json.landing.ont['ont-online'] == 'true') {
          ontConnection = `ONT ${this.language.Connection}: ${this.language.Online}`;
        } else {
          ontConnection = `ONT ${this.language.Connection}: ${this.language.Offline}`;
        }
        // json.landing.rg['ontTooltip'] = `Serial Number: ${json.landing.ont['discoveredVendorId']}${ontSN} \n CLEI: ${json.landing.ont['clei']} \n Model: ${json.landing.ont['discoveredModel']} \n Pon Port: ${json.landing.ont['discoveredPonPort']} \n ONT Issue: ${json.landing.ont['ont-tech-note']}`
        json.landing.rg['ontSourceIcon'] = 'assets/images/ic_ONT.svg';
        json.landing.rg['props'] = `Serial Number \n CLEI \n Model \n Pon Port \n ONT Issues`;
        json.landing.rg['values'] = `${json.landing.ont['discoveredVendorId']}${ontSN} \n ${json.landing.ont['clei']} \n ${json.landing.ont['discoveredModel']} \n ${json.landing.ont['discoveredPonPort']} \n ${json.landing.ont['ont-tech-note']}`;
        let ontSerialNo = ontSN ? `${json.landing.ont['discoveredVendorId']}${ontSN}` : `-`;
        let ontMacAdd = json.landing.ont['discoveredMacAddress'] ? json.landing.ont['discoveredMacAddress'] : `-`;
        let ontVersion = json.landing.ont['discoveredVersion'] ? json.landing.ont['discoveredVersion'] : `-`;
        let ontCLEI = json.landing.ont['clei'] ? json.landing.ont['clei'] : `-`;
        let ontModel = json.landing.ont['discoveredModel'] ? json.landing.ont['discoveredModel'] : `-`;
        let ontPonPort = json.landing.ont['discoveredPonPort'] ? json.landing.ont['discoveredPonPort'] : `-`;
        let oltname = json.landing.ont['oltName'] ? json.landing.ont['oltName'] : `-`;
        let ontregion = json.landing.ont['region'] ? json.landing.ont['region'] : `-`;
        let ontlocation = json.landing.ont['location'] ? json.landing.ont['location'] : `-`;
        let ontregionlocation = `${ontregion}/${ontlocation}`;
        let ontID = json.landing.ont['ontId'] ? json.landing.ont['ontId'] : `-`;
        if (json.landing.ont['ont-tech-note']) {
          this.ont_issue = '';
          for (let i = 0; i < json.landing.ont['ont-issue-list'].length; i++) {
            this.issueDescription(json.landing.ont['ont-issue-list'][i].code, 'ont', '', '')
          }
        }
        let ontIssue = json.landing.ont['ont-tech-note'] ? this.ont_issue : `-`;
        json.landing.rg['columnDefinitions'] = [
          // each column definition needs to specify the column used
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        let lightLev = this.lightLevel ? `${this.lightLevel} dBm` : `-`;
        let rxPower = this.rxPower ? `${this.rxPower} dBm` : `-`;
        let downStream = this.downStream ? this.downStream : `-`;
        let upStream = this.upStream ? this.upStream : `-`;
        json.landing.rg['isontIssue'] = ontIssue;
        json.landing.rg['ont/rgData'] = [
          { columns: [{ attr: "property", text: `ONT - ${this.ont_serialNo}` }, { attr: "value", text: '' }] },
          { columns: [{ attr: "property", text: this.language.Serial_Number }, { attr: "value", text: this.ont_serialNo }] },
          { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: ontMacAdd }] },
          { columns: [{ attr: "property", text: this.language.Version }, { attr: "value", text: ontVersion }] },
          // { columns: [{ attr: "property", text: "CLEI" }, { attr: "value", text: ontCLEI }] },
          { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: ontModel }] },
          { columns: [{ attr: "property", text: this.language.Pon_Port }, { attr: "value", text: ontPonPort }] },
          { columns: [{ attr: "property", text: this.language.ONT_Name }, { attr: "value", text: oltname }] },
          { columns: [{ attr: "property", text: this.language.Region_Location }, { attr: "value", text: ontregionlocation }] },
          { columns: [{ attr: "property", text: this.language.ONT_ID }, { attr: "value", text: ontID }] },
          { columns: [{ attr: "property", text: this.language.OLT_Rx_Power }, { attr: "value", text: lightLev }] },
          { columns: [{ attr: "property", text: this.language.ONT_Rx_Power }, { attr: "value", text: rxPower }] },
          { columns: [{ attr: "property", text: this.language.DS_BIP_Error_Count }, { attr: "value", text: downStream }] },
          { columns: [{ attr: "property", text: this.language.US_BIP_Error_Count }, { attr: "value", text: upStream }] },
          { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: ontIssue }] }
        ];
        json.landing.rg['ontData'] = [
          { columns: [{ attr: "property", text: this.language.Serial_Number }, { attr: "value", text: this.ont_serialNo }] },
          { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: ontMacAdd }] },
          { columns: [{ attr: "property", text: this.language.Version }, { attr: "value", text: ontVersion }] },
          // { columns: [{ attr: "property", text: "CLEI" }, { attr: "value", text: ontCLEI }] },
          { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: ontModel }] },
          { columns: [{ attr: "property", text: this.language.Pon_Port }, { attr: "value", text: ontPonPort }] },
          { columns: [{ attr: "property", text: this.language.ONT_Name }, { attr: "value", text: oltname }] },
          { columns: [{ attr: "property", text: this.language.Region_Location }, { attr: "value", text: ontregionlocation }] },
          { columns: [{ attr: "property", text: this.language.ONT_ID }, { attr: "value", text: ontID }] },
          { columns: [{ attr: "property", text: this.language.OLT_Rx_Power }, { attr: "value", text: lightLev }] },
          { columns: [{ attr: "property", text: this.language.ONT_Rx_Power }, { attr: "value", text: rxPower }] },
          { columns: [{ attr: "property", text: this.language.DS_BIP_Error_Count }, { attr: "value", text: downStream }] },
          { columns: [{ attr: "property", text: this.language.US_BIP_Error_Count }, { attr: "value", text: upStream }] },
          { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: ontIssue }] }
        ];
        ontDataArr['columnDefinitions'] = json.landing.rg['columnDefinitions']
        ontDataArr['rgData'] = json.landing.rg['ontData'];
        if (json.landing.ont['ont-color'] == 'green') {
          ontDataArr['color'] = this.nodeColor['green'];
        } else if (json.landing.ont['ont-color'] == 'red') {
          ontDataArr['color'] = this.nodeColor['red'];
        } else if (json.landing.ont['ont-color'] == 'yellow') {
          ontDataArr['color'] = '#fff17a8c';
        }
      } else {
        json.landing.rg['category'] = 'otherNode';
      }
    } else {
      json.landing.rg['category'] = 'otherNode';
    }
    let connection = '';
    let ipv6Addr = '';
    ipv6Addr = (this.ipv6 && this.ssoAuthService.isIpv6Address((this.ipv6 ? this.ipv6.split('/')[0] : ''))) ? this.ipv6 : ipv6Addr;
    if (json.landing.rg.online == 'true' && ipv6Addr) {
      connection = `IPv4: ${this.language.Connected} \n IPv6: ${this.language.Connected}`;
    } else if (json.landing.rg.online == 'true' && !ipv6Addr) {
      connection = `IPv4: ${this.language.Connected} \n IPv6: ${this.language.Disconnected}`;
      linkColor = this.nodeLinkColor.red;
    } else if (json.landing.rg.online == 'false' && ipv6Addr) {
      connection = `IPv4: ${this.language.Disconnected} \n IPv6: ${this.language.Connected}`;
      linkColor = this.nodeLinkColor.red;
    }
    rgColor = '#f3f3f3';
    linkColor = 'grey';
    // if (json.landing.rg.online == 'true') {
    //   connection = `IPv4: Connected`;
    // } else 
    if (
      json.landing.rg.online == 'false' ||
      json.landing.rg['rg-tech-notes']?.includes('The RG is not reachable')
    ) {
      connection = `IPv4: ${this.language.Disconnected} \n IPv6: ${this.language.Disconnected}`;
      linkColor = this.nodeLinkColor.red;
    }
    let uplinkData = {
      isInternet: true,
      columnDefinitions: linkColumn,
      rgData: uplinkText,
      label: connection,
      source: 'assets/images/global.svg',
      key: 'Internet',
      accessPointId: '',
      width: 30,
      height: 30,
      color: rgColor,
      mac: 'Internet',
      category: 'otherNode'
    };

    let uplinkEthernetData = {
      text: `Ethernet Port`,
      label: `Ethernet Port`,
      source: 'assets/images/ethernet.png',
      key: 'ethernet',
      accessPointId: '',
      color: '#f3f3f3',
      width: 17,
      height: 30,
    };
    // ****** RG NOTE
    if (json.landing && json.landing.rg.mac) {
      let color: any;
      color = json.landing.rg['online'] ? 'red' : 'green';
      if (ontRgSN) {
        this.linkDataArray.push({
          from: uplinkData.key,
          to: json.landing.rg.mac,
          color: linkColor,
          thick: 2,
          routing: go.Link.Normal,
          linkColumn: linkColumn,
          linkText: uplinkRate,
        });
      } else {
        this.linkDataArray.push({
          from: uplinkData.key,
          to: ontDataArr['key'],
          color: linkColor,
          thick: 2,
          routing: go.Link.Normal,
          linkColumn: linkColumn,
          linkText: uplinkRate,
        });
        this.linkDataArray.push({
          from: ontDataArr['key'],
          to: json.landing.rg.mac,
          color: linkColor,
          thick: 2,
          routing: go.Link.Normal,
          linkColumn: linkColumn,
          linkText: uplinkRate,
        });
      }

      let rgDetails = '';
      let freq_band = '';
      let rgConnection = '';
      if (json.landing.rg['online']) {
        if (json.landing.rg['online'] == 'true') {
          rgConnection = this.language.Online;
        } else {
          rgConnection = this.language.Offline;
        }
      }
      // rgDetails += json.landing.rg['ip']
      //   ? `\n IP Address : ${json.landing.rg['ip']}`
      //   : ``;
      // rgDetails += json.landing.rg['mac']
      //   ? `\n MAC Address: ${json.landing.rg['mac']}`
      //   : ``;
      // rgDetails += json.landing.rg['version']
      //   ? `\n Software Version : ${json.landing.rg['version']}`
      //   : ``;
      // rgDetails += json.landing.rg['sn']
      //   ? `\n Serial Number: ${json.landing.rg['sn']}`
      //   : ``;
      // rgDetails += json.landing.rg['hostname']
      //   ? `\n Device : ${json.landing.rg['hostname']}`
      //   : ``;
      // rgDetails += this.rgModel ? `\n Model : ${this.rgModel}` : ``;
      // rgDetails += this.raManufacture
      //   ? `\n Manufacturer : ${this.raManufacture}`
      //   : ``;
      // if (json.landing.rg['radio-info']) {
      //   var radioInfo = json.landing.rg['radio-info'];
      //   var freqArr = [];
      //   if (radioInfo.length > 0) {
      //     for (let fband = 0; fband < radioInfo.length; fband++) {
      //       let fbandValue = radioInfo[fband]['freq-band'] + 'GHz';
      //       freqArr.push(fbandValue);
      //     }
      //     freq_band = freqArr.join(', ');
      //   }
      //   rgDetails += freq_band ? `\n Frequency Band: ${freq_band}` : ``;
      // }
      // if (json.landing.rg.clients) {
      //   if (json.landing.rg.clients.length > 0) {
      //     rgDetails += json.landing.rg.clients
      //       ? `\n Total Devices: ${json.landing.rg.clients.length}`
      //       : `\n Total Devices: 0`;
      //   }
      // }
      // rgDetails +=
      //   json.landing.rg['passed-clients'] != 0
      //     ? `\n Devices without issues and warnings: ${json.landing.rg['passed-clients']}`
      //     : `\n Devices without issues and warnings: 0`;
      // rgDetails +=
      //   json.landing.rg['failed-clients'] != 0
      //     ? `\n Devices with issues and warnings: ${json.landing.rg['failed-clients']}`
      //     : `\n Devices with issues and warnings: 0`;
      // rgDetails += json.landing.rg['rg-tech-notes']
      //   ? `\n Issue(s) : ${json.landing.rg['rg-tech-notes']}`
      //   : ``;
      // json.landing.rg['tooltip'] = rgDetails;
      let rgIpAdd = json.landing.rg['ip'] ? `${json.landing.rg['ip']}` : `-`;
      let rgMacAdd = json.landing.rg['mac'] ? `${json.landing.rg['mac']}` : `-`;
      let rgName = json.landing.rg['name'] ? `${json.landing.rg['name']}` : `-`;
      let rgSwVersion = json.landing.rg['version'] ? `${json.landing.rg['version']}` : `-`;
      let rgSerialNo = json.landing.rg['sn'] ? `${json.landing.rg['sn']}` : `-`;
      let selctedModel = JSON.parse(sessionStorage.getItem('calix.deviceData')).find((obj) => obj.modelName == this.rgModel);
      let rgHostname = json.landing.rg['hostname'] ? `${json.landing.rg['hostname']}` : selctedModel.opModeWithOnt;
      let rgModel = this.rgModel ? `${this.rgModel}` : `-`;
      let rgManufacture = this.raManufacture ? `${this.raManufacture}` : ``;
      let rgFreq_band = '';
      if (json.landing.rg['radio-info']) {
        var radioInfo = json.landing.rg['radio-info'];
        var freqArr = [];
        if (radioInfo.length > 0) {
          for (let fband = 0; fband < radioInfo.length; fband++) {
            let fbandValue = radioInfo[fband]['freq-band'] + 'GHz';
            freqArr.push(fbandValue);
          }
          freq_band = freqArr.join(', ');
        }
        rgFreq_band = freq_band ? `${freq_band}` : `-`;
      }
      let totDev = '';
      if (json.landing.rg.clients) {
        for (let i = 0; i < json.landing.rg.clients.length; i++) {
          if (json.landing.rg.clients[i]['client-color'] == 'red') {
            this.isrgWithIssue = true;
          }
        }
        if (this.isrgWithIssue == true) {
          json.landing.rg['isrgWithIssue'] = true;
        }
        if (json.landing.rg.clients.length > 0) {
          totDev = json.landing.rg.clients.length;
        }
      }
      let rgTotDev = totDev ? totDev : 0;
      let rgPassClients = json.landing.rg['passed-clients'] != 0 ? `${json.landing.rg['passed-clients']}` : `0`;
      let rgFailClients = json.landing.rg['failed-clients'] != 0 ? `${json.landing.rg['failed-clients']}` : `0`;
      let rgTechNote = json.landing.rg['rg-tech-notes'] ? `${this.issue_reason}` : `-`;
      json.landing.rg['columnDefinitions'] = [
        // each column definition needs to specify the column used
        { attr: "property", text: "", column: 0 },
        { attr: "value", text: "", column: 1 },
      ];

      json.landing.rg['isrgIssue'] = rgTechNote;
      json.landing.rg['rg/ontData'] = [  // the table of rgData
        // each row is a person with an Array of Objects associating a column name with a text value
        { columns: [{ attr: "property", text: `RG - ${this.ont_serialNo}` }, { attr: "value", text: '' }] },
        { columns: [{ attr: "property", text: this.language.Connection }, { attr: "value", text: `${rgConnection}` }] },
        { columns: [{ attr: "property", text: this.language.IP_Address }, { attr: "value", text: `${rgIpAdd}` }] },
        // { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: `${rgMacAdd}` }] },
        // { columns: [{ attr: "property", text: this.language.Software_Version }, { attr: "value", text: `${rgSwVersion}` }] },
        // { columns: [{ attr: "property", text: this.language.Serial_Number }, { attr: "value", text: `${rgSerialNo}` }] },
        { columns: [{ attr: "property", text: this.language.Device }, { attr: "value", text: `${rgHostname}` }] },
        // { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: `${rgModel}` }] },
        { columns: [{ attr: "property", text: this.language.Manufacturer }, { attr: "value", text: `${rgManufacture}` }] },
        { columns: [{ attr: "property", text: this.language.Frequency_Band }, { attr: "value", text: `${rgFreq_band}` }] },
        { columns: [{ attr: "property", text: this.language.Total_Clients }, { attr: "value", text: `${rgTotDev}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_without_issues_and_warnings }, { attr: "value", text: `${rgPassClients}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_with_issues_and_warnings }, { attr: "value", text: `${rgFailClients}` }] },
        { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: `${rgTechNote}` }] }
      ];
      json.landing.rg['rgData'] = [  // the table of rgData
        // each row is a person with an Array of Objects associating a column name with a text value
        { columns: [{ attr: "property", text: this.language.Connection }, { attr: "value", text: `${rgConnection}` }] },
        { columns: [{ attr: "property", text: this.language.IP_Address }, { attr: "value", text: `${rgIpAdd}` }] },
        { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: `${rgMacAdd}` }] },
        { columns: [{ attr: "property", text: this.language.Name }, { attr: "value", text: `${rgName}` }] },
        { columns: [{ attr: "property", text: this.language.Software_Version }, { attr: "value", text: `${rgSwVersion}` }] },
        { columns: [{ attr: "property", text: this.language.Serial_Number }, { attr: "value", text: `${rgSerialNo}` }] },
        { columns: [{ attr: "property", text: this.language.Device }, { attr: "value", text: `${rgHostname}` }] },
        { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: `${rgModel}` }] },
        { columns: [{ attr: "property", text: this.language.Manufacturer }, { attr: "value", text: `${rgManufacture}` }] },
        { columns: [{ attr: "property", text: this.language.Frequency_Band }, { attr: "value", text: `${rgFreq_band}` }] },
        { columns: [{ attr: "property", text: this.language.Total_Clients }, { attr: "value", text: `${rgTotDev}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_without_issues_and_warnings }, { attr: "value", text: `${rgPassClients}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_with_issues_and_warnings }, { attr: "value", text: `${rgFailClients}` }] },
        { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: `${rgTechNote}` }] }
      ];
      json.landing.rg['source'] = json.landing.rg['online']
        ? 'assets/images/myRouter.svg'
        : 'assets/images/router-critical-state.png';
      if (
        json.landing.rg['rg-tech-notes'].includes('The RG is not reachable')
      ) {
        json.landing.rg['source'] = this.accessPointImages['red'];
      }
      json.landing.rg['key'] = json.landing.rg.mac;
      this.rgKey = json.landing.rg.mac;
      if (json.landing.rg['category'] != 'ontNode') {
        if (json.landing.rg['rg-color'] == 'green') {
          json.landing.rg['color'] = this.nodeColor['green'];
        } else if (json.landing.rg['rg-color'] == 'red') {
          json.landing.rg['color'] = this.nodeColor['red'];
        } else if (json.landing.rg['rg-color'] == 'yellow') {
          json.landing.rg['color'] = '#fff17a8c';
        }
      } else {
        if (json.landing.rg['rg-color'] == 'green' && json.landing.ont['ont-color'] == 'green') {
          json.landing.rg['color'] = this.nodeColor['green'];
        } else if (json.landing.rg['rg-color'] == 'red' || json.landing.ont['ont-color'] == 'red') {
          json.landing.rg['color'] = this.nodeColor['red'];
        } else if (json.landing.rg['rg-color'] == 'yellow' || json.landing.ont['ont-color'] == 'yellow') {
          json.landing.rg['color'] = '#fff17a8c';
        }
      }
      if (json.landing.rg['online'] == 'false') {
        json.landing.rg['color'] = this.nodeColor['red'];
      }
      json.landing.rg['width'] = 30;
      json.landing.rg['height'] = 30;
      json.landing.rg['model'] = this.rgModel;
      json.landing.rg['isRg'] = true;
      if (json.landing.rg['name']) {
        json.landing.rg['isInternet'] = true;
      }
      json.landing.rg['ethernetId'] = `ethernet-${json.landing.rg.sn}`;
      if (json.landing.rg['name']) {
        if (json.landing.rg['hostname']) {
          json.landing.rg['label'] = `${json.landing.rg['hostname']} \n ${json.landing.rg['name']}`;
        } else {
          json.landing.rg['label'] = `${json.landing.rg['sn']} ${json.landing.rg['name']}`;
        }
      } else {
        if (json.landing.rg['hostname']) {
          json.landing.rg['label'] = `${json.landing.rg['hostname']}`;
        } else {
          json.landing.rg['label'] = `${json.landing.rg['sn']}`;
        }
      }


      // if (!this.clientDeviceSSID) {
      //   this.expandedNodes = [];
      this.expandedNodes.push(uplinkData.key);
      // }
      let rgData: any = json.landing.rg.aps;
      this.nodeDataArray.push(uplinkData);
      this.nodeDataArray.push(ontDataArr);
      this.nodeDataArray.push(json.landing.rg);
      if (rgData && rgData.length > 0) {
        await this.populateAps(
          rgData,
          json,
          json.landing.rg,
          uplinkEthernetData
        );
      }
      this.setClientDetailsNode();
    } else {
      let rgData: any = json.landing.rg.aps;
      uplinkData['noRg'] = true;
      this.nodeDataArray.push(uplinkData);
      if (rgData && rgData.length > 0) {
        await this.populateAps(rgData, json, uplinkData, uplinkEthernetData);
      }
      this.setClientDetailsNode();
    }
  }

  issueDescription(code, type, name, index) {


    let rgReason = '';
    code = code.toUpperCase();
    if (code == "ATTACK_DETECTED" || code == "VIRUS_ATTACK") {
      rgReason = `${this.language['Issue_Reason1']}`;
    } else if (code == 'CLIENT_DEVICE_LOW_SIGNAL_DETECTED') {
      rgReason = `${this.language['Issue_Reason2']}`;
    } else if (code == 'CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED') {
      rgReason = `${this.language['Issue_Reason3']}`;
    } else if (code == 'CLIENT_DEVICE_LOW_PHY_RATE_DETECTED') {
      rgReason = `${this.language['Issue_Reason_new4']}`;
    } else if (code == 'CLIENT_DEVICE_LEGACY_DEVICE_DETECTED') {
      rgReason = `${this.language['Issue_Reason4']}`;
    } else if (code == 'REBOOT_ISSUE') {
      rgReason = `${this.language['Issue_Reason5']}`;
    } else if (code == 'SOFTWARE_UPGRADE_FAILED') {
      rgReason = `${this.language['Issue_Reason6']}`;
    } else if (code == 'STALE_SOFTWARE_VERSION') {
      rgReason = `${this.language['Issue_Reason7']}`;
    } else if (code == 'The memory usage on the RG has crossed X threshold - discussion on if to track ') {
      rgReason = `${this.language['Issue_Reason_DEVICE8']}`;
    } else if (code == 'The Operation Temperature has crossed X threshold - intenral threshold') {
      rgReason = `${this.language['Issue_Reason9']}`;
    } else if (code == 'WAP_FAILED') {
      rgReason = `${this.language['Issue_Reason_mapNtr10']}`;
    } else if (code == 'GATEWAY_FAILED') {
      rgReason = `${this.language['Issue_Reason44']}`;
    } else if (code == "SPEED_LOW_75_80") {
      rgReason = `${this.language['Issue_Reason12']}`;
    } else if (code == "SPEED_LOW_75") {
      rgReason = `${this.language['Issue_Reason13']}`;
    } else if (code == "TRAFFIC_HIGH") {
      rgReason = `${this.language['Issue_Reason14']}`;
    } else if (code == "LATENCY_HIGH") {
      rgReason = `${this.language['Issue_Reason15']}`;
    } else if (code == 'A configured voice service has been detect as down.') {
      rgReason = `${this.language['Issue_Reason16']}`;
    } else if (code == 'WIFI_INTERFERENCE_HIGH_24G') {
      rgReason = `${this.language['Issue_Reason17']}`;
    } else if (code == 'WIFI_INTERFERENCE_HIGH_5G') {
      rgReason = `${this.language['Issue_Reason18']}`;
    } else if (code == 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G') {
      rgReason = `${this.language['Issue_Reason19']}`;
    } else if (code == 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G') {
      rgReason = `${this.language['Issue_Reason20']}`;
    } else if (code == 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G') {
      rgReason = `${this.language['Issue_Reason21']}`;
    } else if (code == 'LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G') {
      rgReason = `${this.language['Issue_Reason22']}`;
    } else if (code == 'MESH_DEGRADE') {
      rgReason = `${this.language['Issue_Reason23']}`;
    } else if (code == 'BACKHAUL_TOO_CLOSE') {
      rgReason = `${this.language['Issue_Reason24']}`;
    } else if (code == 'BACKHAUL_TOO_FAR') {
      rgReason = `${this.language['Issue_Reason25']}`;
    } else if (code == 'Utilization of Wi-Fi Airtime has crossed 50% Average for bin on radio (2.4Ghz|5Ghz)') {
      rgReason = `${this.language['Issue_Reason26']}`;
    } else if (code == 'Detected DFS (radar)') {
      rgReason = `${this.language['Issue_Reason27']}`;
    } else if (code == 'WIFI_RADIO_DISABLED') {
      rgReason = `${this.language['Issue_Reason28']}`;
    } else if (code == 'WIFI_RADIO_DISABLED_24G') {
      rgReason = `${this.language['Issue_Reason29']}`;
    } else if (code == 'WIFI_RADIO_DISABLED_5G') {
      rgReason = `${this.language['Issue_Reason30']}`;
    } else if (code == "DS_SPEED_LOW_85") {
      rgReason = `${this.language['Issue_Reason31']}`;
    } else if (code == "US_SPEED_LOW_85") {
      rgReason = `${this.language['Issue_Reason32']}`;
    } else if (code == "DS_SPEED_LOW_75") {
      rgReason = `${this.language['Issue_Reason33']}`;
    } else if (code == "US_SPEED_LOW_75") {
      rgReason = `${this.language['Issue_Reason34']}`;
    } else if (code == "THERMAL_HIGH") {
      rgReason = `${this.language['Issue_Reason35']}`;
    } else if (code == "THERMAL_TOO_HIGH") {
      rgReason = `${this.language['Issue_Reason36']}`;
    } else if (code == "ONT_OFFLINE") {
      rgReason = `${this.language['issue_reason37']}`;
    } else if (code == "GC_MAX_DOWNSTREAM_ACHIEVED") {
      rgReason = `${this.language['issue_reason38']}`;
    } else if (code == "GC_MAX_UPSTREAM_ACHIEVED") {
      rgReason = `${this.language['issue_reason39']}`;
    } else if (code == "WFH_SSID_WITHOUT_CIQ") {
      rgReason = `${this.language['issue_reason40']}`;
    } else if (code == 'QOS_DAMP_ALERT') {
      rgReason = `${this.language['Issue_Reason41']}`;
    } else if (code == 'MAP_CONNECTIVITY_FAILED') {

      const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
        .filter(obj => obj.serialNumber == name)
        .map(obj => obj.opMode);
      const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');
      rgReason = `${this.language[`Issue_Reason${lang}`]}`;

    } else if (code == 'UI_CREATED_ISSUE_FOR_TR069MAPDOWN') {

      const opMode = JSON.parse(sessionStorage.getItem(`calix.deviceData`))
        .filter(obj => obj.serialNumber == name)
        .map(obj => obj.opMode);
      const lang = (opMode.length && opMode[0] == 'RG' ? '11' : '10');
      rgReason = `${this.language[`Issue_Reason_mapNtr${lang}`]}`;
    }
    if (type == 'rg') {
      let issue = rgReason.slice(-1);
      if (issue == '.') {
        this.issue_reason += rgReason + ' ';
      } else {
        this.issue_reason += rgReason.substring(0, rgReason.length) + '. ';
      }
    } else if (type == 'aps') {
      let issue = rgReason.slice(-1);
      if (issue == '.') {
        this.aps_issue += rgReason + ' ';
      } else {
        this.aps_issue += rgReason.substring(0, rgReason.length) + '. ';
      }
      if ((index + 1) == this.aps_issue_length) {
        let params = {
          note: this.aps_issue,
          name: name,
        };
        JSON.stringify(this.clientArr.push(params));
      }
    } else if (type == 'client') {
      let issue = rgReason.slice(-1);
      if (issue == '.') {
        this.client_issue += rgReason + ' ';
      } else {
        this.client_issue += rgReason.substring(0, rgReason.length) + '. ';
      }
      if ((index + 1) == this.client_issue_length) {
        let params = {
          note: this.client_issue,
          name: name,
        };
        JSON.stringify(this.clientArr.push(params));
      }
    } else if (type == 'backhaul') {
      let issue = rgReason.slice(-1);
      if (issue == '.') {
        this.backhaul_issue += rgReason + ' ';
      } else {
        this.backhaul_issue += rgReason.substring(0, rgReason.length) + '. ';
      }
      if ((index + 1) == this.backhaul_issue_length) {
        let params = {
          note: this.backhaul_issue,
          name: this.language.Backhaul_Issue,
        };
        JSON.stringify(this.clientArr.push(params));
      }
    } else if (type == 'ont') {
      let issue = rgReason.slice(-1);
      if (issue == '.') {
        this.ont_issue += rgReason + ' ';
      } else {
        this.ont_issue += rgReason.substring(0, rgReason.length) + '. ';
      }
    }
  }

  loadSupportTopology() {
    if (!this.clientDeviceSSID) {
      this.nodeDataArray.forEach(function (v) {
        delete v['isSSIDClient'];
      });
    }

    let $ = this.$;
    var colors = {
      blue: '#2a6dc0',
      orange: '#ea2857',
      green: '#1cc1bc',
      gray: '#5b5b5b',
      white: '#F5F5F5',
    };
    if (this.APTopology) {
      this.APTopology.div = null;
    }
    this.APTopology = $(
      go.Diagram,
      'mainDiagram',

      {
        minScale: 0.25,
        maxScale: 2.0,
        initialContentAlignment: go.Spot.Top, // center Diagram contents
        'undoManager.isEnabled': true,
        LayoutCompleted: (e) => {
          this.updateDivHeight();
          this.enableAllCommandHandler();
          if (this.rgArr.length > 0) {
            this.scroll();
          }
        },
        InitialLayoutCompleted: (e) => {
          this.setZoomScaleToFit();
          collapseDefault();
          addMakeCustomExpander();
        },
        initialAutoScale: go.Diagram.UniformToFill,
        layout: $(
          go.TreeLayout, //LayeredDigraphLayout
          {
            // direction: 0,
            layerSpacing: 110,
            // columnSpacing: 33,
            // linkSpacing: 5,
            // isOngoing: false,
            angle: 0,
          }
        ),
      }
    );

    this.APTopology.toolManager.toolTipDuration = 60000;
    this.APTopology.toolManager.hoverDelay = 500;
    this.APTopology.linkSelectionAdornmentTemplate.pickable = false;

    // function linkInfo4(d) {
    //   // Tooltip info for a link data object
    //   if (d.name == '') {
    //     return '';
    //   } else {
    //     return `${d.name}`;
    //   }
    // }

    // this.APTopology.nodeTemplate = $(
    //   go.Node,
    //   'Auto',
    //   // { isTreeExpanded: false },
    //   {
    //     selectionAdorned: false,
    //     click: (e, obj) => {
    //       this.clientArr = [];
    //       this.selectedAPValue = '';
    //       let params: any;
    //       if (obj.part.data['ap-tech-note'] || obj.part.data['backhaul']) {
    //         this.selectedAPValue = obj.part.data;
    //         if (obj.part.data['ap-tech-note']) {
    //           params = {
    //             note: obj.part.data['ap-tech-note'],
    //             name: obj.part.data['sn'],
    //           };
    //           JSON.stringify(this.clientArr.push(params));
    //         }
    //         if (obj.part.data['backhaul']['backhaul-tech-note'] && obj.part.data['ap-tech-note'] != obj.part.data['backhaul']['backhaul-tech-note']) {
    //           params = {
    //             note: obj.part.data.backhaul['backhaul-tech-note'],
    //             name: 'Backhaul Issue:',
    //           };
    //           JSON.stringify(this.clientArr.push(params));
    //         }
    //       } else if (obj.part.data['client-note']) {
    //         this.selectedAPValue = obj.part.data;
    //         params = {
    //           note: obj.part.data['client-note'],
    //           name: obj.part.data['hostname']
    //             ? obj.part.data['hostname']
    //             : obj.part.data['mac'],
    //         };
    //         JSON.stringify(this.clientArr.push(params));
    //       }
    //       // this.selectedAPValue = '';
    //       // if (obj.part.data['ap-tech-note'] || obj.part.data['rg-tech-notes']) {
    //       //   this.apInformtion = obj.part.data['ap-tech-note'];
    //       //   if (obj.part.data['failed-clients'] != 0) {
    //       //     this.selectedAPValue = obj.part.data;
    //       //   }
    //       //   if (obj.part.data.clients && obj.part.data.clients.length > 0) {
    //       //     for (let i = 0; i < obj.part.data.clients.length; i++) {
    //       //       let name = '';
    //       //       if (this.resValue.landing.rg.hostname) {
    //       //         name = this.resValue.landing.rg.hostname;
    //       //       } else {
    //       //         name = this.resValue.landing.rg.mac;
    //       //       }
    //       //       if (i == 0 && obj.part.data['rg-color'] == 'red') {
    //       //         let params = {
    //       //           note: obj.part.data['rg-tech-notes'],
    //       //           name: name,
    //       //         };
    //       //         JSON.stringify(this.clientArr.push(params));
    //       //       }
    //       //       if (
    //       //         obj.part.data.clients[i]['legacy-device-test-result'] !=
    //       //           'PASS' ||
    //       //         obj.part.data.clients[i]['signal-strength-test-result'] !=
    //       //           'PASS' ||
    //       //         obj.part.data.clients[i]['phy-rate-test-result'] != 'PASS'
    //       //       ) {
    //       //         let hostname = '';
    //       //         if (obj.part.data.clients[i]['hostname']) {
    //       //           hostname = obj.part.data.clients[i]['hostname'];
    //       //         } else {
    //       //           hostname = obj.part.data.clients[i]['mac'];
    //       //         }
    //       //         let params = {
    //       //           note: obj.part.data.clients[i]['client-note'],
    //       //           name: hostname,
    //       //         };
    //       //         JSON.stringify(this.clientArr.push(params));
    //       //       }
    //       //     }
    //       //   } else if (!obj.part.data['rg-tech-notes']) {
    //       //     this.selectedAPValue = obj.part.data;
    //       //     let hostname = '';
    //       //     if (obj.part.data['hostname']) {
    //       //       hostname = obj.part.data['hostname'];
    //       //     } else {
    //       //       hostname = obj.part.data['sn'];
    //       //     }
    //       //     let params = {
    //       //       note: obj.part.data['ap-tech-note'],
    //       //       name: hostname,
    //       //     };
    //       //     JSON.stringify(this.clientArr.push(params));
    //       //   }
    //       // } else {
    //       //   this.apInformtion = obj.part.data['rg-tech-notes'];
    //       // }
    //       if (this.clientArr.length > 0) {
    //         this.scroll();
    //       }
    //     },
    //     mouseHover: function (e, obj) {
    //       let node = obj.part;
    //       if (node.data.key === 'internet') {
    //         return;
    //       }
    //       if (node.data.key === 'ethernet') {
    //         return;
    //       }
    //     },
    //   },
    //   // new go.Binding('visible'),
    //   $(
    //     go.Shape,
    //     {
    //       // background : 'red',
    //       width: 210,
    //       height: 120,
    //       fill: 'white',
    //     },
    //     new go.Binding('strokeWidth', 'isHighlighted', function (h) {
    //       return h ? 2 : 0;
    //     }).ofObject(),
    //     new go.Binding('stroke', 'isHighlighted', function (h) {
    //       return h ? 'gold' : 'white';
    //     }).ofObject()
    //   ),
    //   $(
    //     go.Shape,
    //     new go.Binding('cursor', 'label', function (l) {
    //       return l ? 'pointer' : '';
    //     }),
    //     {
    //       width: 210,
    //       height: 40,
    //       strokeWidth: 0,
    //       toolTip: $(
    //         'ToolTip',
    //         {
    //           alignment: go.Spot.Left,
    //           'Border.stroke': colors['blue'],
    //           'Border.strokeWidth': 1,
    //           visible: false,
    //         },
    //         new go.Binding('visible', 'tooltip', function (text) {
    //           return text != '';
    //         }),
    //         $(
    //           go.TextBlock,
    //           {
    //             maxSize: new go.Size(500, NaN),
    //             minSize: new go.Size(250, NaN),
    //             text: "textAlign: 'left'",
    //             isMultiline: true,
    //           },
    //           { font: 'bold 12px sans-serif' },
    //           new go.Binding('text', 'tooltip')
    //         )
    //       ),
    //     },
    //     new go.Binding('fill', '', function (node) {
    //       return node.color || 'white';
    //     })
    //   ),

    //   $(
    //     go.Panel,
    //     'Auto',
    //     new go.Binding('cursor', 'label', function (l) {
    //       return l ? 'pointer' : '';
    //     }),
    //     {
    //       width: 220,
    //       height: 120,
    //     },

    //     $(
    //       go.Panel,
    //       'Spot',
    //       {
    //         visible: false,
    //       },
    //       $(
    //         go.Picture,
    //         {
    //           // background : 'blue',
    //           desiredSize: new go.Size(25, 20),
    //           alignment: go.Spot.TopLeft,
    //           visible: false,
    //           margin: new go.Margin(25, 0, 0, 10),
    //           toolTip: $(
    //             'ToolTip',
    //             {
    //               visible: false,
    //               'Border.stroke': colors['blue'],
    //               'Border.strokeWidth': 1,
    //             },
    //             new go.Binding('visible', 'ap-online', function (data) {
    //               return data == 'true'
    //             }),
    //             new go.Binding('visible', 'int-type', function (data) {
    //               return data != 'LAN'
    //             }),
    //             // new go.Binding('visible', '', function (data) {
    //             //   return (
    //             //     data.wirelessIcon &&
    //             //     data.wirelessIcon != '' &&
    //             //     data['ap-online'] == 'true'
    //             //   );
    //             // }),
    //             $(
    //               go.TextBlock,
    //               { margin: 4, font: 'bold 12px sans-serif', visible: false },
    //               new go.Binding('text', 'ap_rssi_tooltip'),

    //               new go.Binding('visible', 'ap-online', function (data) {
    //                 return data == 'true'
    //               }),
    //               new go.Binding('visible', 'int-type', function (data) {
    //                 return data != 'LAN'
    //               }),
    //               // new go.Binding('visible', '', function (data) {
    //               //   return (
    //               //     data.wirelessIcon &&
    //               //     data.wirelessIcon != '' &&
    //               //     data['ap-online'] == 'true'
    //               //   );
    //               // })
    //             ),

    //           ),
    //         },
    //         new go.Binding('source', 'wirelessIcon', function (image) {
    //           return image ? image : '';
    //         }),
    //         new go.Binding('width', 'width', function (data) {
    //           return data - 5;
    //         }),
    //         new go.Binding('height', 'height', function (data) {
    //           return data - 10;
    //         }),
    //         new go.Binding('visible', 'ap-online', function (data) {
    //           return data == 'true'
    //         }),
    //         new go.Binding('visible', 'int-type', function (data) {
    //           return data != 'LAN'
    //         }),
    //         // new go.Binding('visible', '', function (data) {
    //         //   return (
    //         //     data.wirelessIcon &&
    //         //     data.wirelessIcon != '' &&
    //         //     data['ap-online'] == 'true'
    //         //   );
    //         // })
    //       ),
    //       // new go.Binding('visible', '', function (data) {
    //       //   return (
    //       //     data.wirelessIcon &&
    //       //     data.wirelessIcon != '' &&
    //       //     data['ap-online'] == 'true'
    //       //   );
    //       // })
    //       new go.Binding('visible', 'ap-online', function (data) {
    //         return data == 'true'
    //       }),
    //       new go.Binding('visible', 'int-type', function (data) {
    //         return data != 'LAN'
    //       }),
    //     ),

    //     $(
    //       go.Panel,
    //       'Spot',
    //       {
    //         visible: false,
    //         alignment: go.Spot.TopLeft,
    //       },
    //       new go.Binding('visible', 'freqBand', function (freqBand) {
    //         return freqBand != '';
    //       }),
    //       $(
    //         go.TextBlock,
    //         { margin: new go.Margin(25, 0, 0, 10) },
    //         new go.Binding('text', 'freqBand')
    //       )
    //     ),

    //     $(
    //       go.Panel,
    //       'Horizontal', // the row of status indicators
    //       $(
    //         go.Panel,
    //         'Horizontal',
    //         { height: 35, width: 60 },
    //         $(
    //           go.Picture,
    //           { margin: new go.Margin(0, 0, 0, 25) },
    //           new go.Binding('source', 'source', function (image) {
    //             return image ? image : '';
    //           }),
    //           new go.Binding('element', 'source-video', function (video) {
    //             return video ? video : '';
    //           }),
    //           new go.Binding('width', 'width'),
    //           new go.Binding('height', 'height')
    //         )
    //       ),
    //       $(
    //         go.Panel,
    //         'Horizontal',
    //         { height: 40, width: 160 },
    //         $(
    //           go.TextBlock,
    //           {
    //             margin: new go.Margin(0, 0, 0, 10),
    //             width: 120,
    //             overflow: go.TextBlock.OverflowEllipsis,
    //             // isMultiline : false,
    //             // maxLines: 1,
    //             // maxSize: new go.Size(200, 60),
    //           },
    //           new go.Binding('text', 'label', function (l) {
    //             return l ? l : '';
    //           }),
    //           new go.Binding('maxLines', '', function (l) {
    //             return l['isInternet'] ? 2 : 1;
    //           })
    //         )
    //       ),
    //       {
    //         toolTip: $(
    //           'ToolTip',
    //           {
    //             alignment: go.Spot.Left,
    //             'Border.stroke': colors['blue'],
    //             'Border.strokeWidth': 1,
    //             visible: false,
    //           },
    //           new go.Binding('visible', 'tooltip', function (text) {
    //             return text != '';
    //           }),
    //           $(
    //             go.TextBlock,
    //             {
    //               maxSize: new go.Size(500, NaN),
    //               minSize: new go.Size(250, NaN),
    //               text: "textAlign: 'left'",
    //               isMultiline: true,
    //             },
    //             { font: 'bold 12px sans-serif' },
    //             new go.Binding('text', 'tooltip')
    //           )
    //         ),
    //       }
    //     ),

    //     //Passed Clients
    //     $(
    //       go.Panel,
    //       'Auto',
    //       {
    //         click: function (e, obj) {
    //           var node = obj.part; // get the Node containing this Button
    //           if (node === null) return;
    //           e.handled = true;
    //           that.clientDeviceSSID
    //             ? expandSSIDNode(node, true, 'isPassedClient')
    //             : expandNode(node, true, 'isPassedClient');
    //         },
    //       },

    //       new go.Binding('margin', 'label', function (l) {
    //         return l ? new go.Margin(-55, 0, 0, 50) : '';
    //       }),
    //       new go.Binding('cursor', 'label', function (l) {
    //         return l ? 'pointer' : '';
    //       }),

    //       // decorations:
    //       $(
    //         go.Shape,
    //         'Circle',

    //         {
    //           width: 24,
    //           height: 24,
    //           // fill: 'white',
    //           stroke: 'green',
    //           strokeWidth: 2,
    //           margin: 5,
    //           visible: false,
    //         },
    //         new go.Binding('fill', '_othersPassedExpanded', function (node) {
    //           return node ? 'green' : 'white';
    //         }),
    //         new go.Binding('visible', 'passed-clients', function (l) {
    //           return l ? l : false;
    //         })
    //       ),

    //       $(
    //         go.TextBlock,
    //         {
    //           margin: 5,
    //         },
    //         new go.Binding('stroke', '', function (node) {
    //           return node._othersPassedExpanded ? 'white' : 'black';
    //         }),
    //         new go.Binding('text', 'passed-clients', function (l) {
    //           return l ? l : '';
    //         })
    //       )
    //     ),

    //     //Failed Clients
    //     $(
    //       go.Panel,
    //       'Auto',
    //       {
    //         click: function (e, obj) {
    //           var node = obj.part; // get the Node containing this Button
    //           if (node === null) return;
    //           e.handled = true;
    //           that.clientDeviceSSID
    //             ? expandSSIDNode(node, true, 'isFailedClient')
    //             : expandNode(node, true, 'isFailedClient');
    //         },
    //       },

    //       new go.Binding('margin', 'label', function (l) {
    //         return l ? new go.Margin(-45, 0, 0, 90) : '';
    //       }),
    //       new go.Binding('cursor', 'label', function (l) {
    //         return l ? 'pointer' : '';
    //       }),

    //       // decorations:
    //       $(
    //         go.Shape,
    //         'Circle',

    //         {
    //           width: 24,
    //           height: 24,
    //           // fill: 'white',
    //           stroke: 'orange',
    //           strokeWidth: 2,
    //           margin: 5,
    //           visible: false,
    //         },
    //         new go.Binding('fill', '_othersFailedExpanded', function (node) {
    //           return node ? 'orange' : 'white';
    //         }),
    //         new go.Binding('visible', 'failed-clients', function (l) {
    //           return l ? l : false;
    //         })
    //       ),

    //       $(
    //         go.TextBlock,
    //         {
    //           margin: 5,
    //         },
    //         new go.Binding('stroke', '', function (node) {
    //           return node._othersFailedExpanded ? 'white' : 'black';
    //         }),
    //         new go.Binding('text', 'failed-clients', function (l) {
    //           return l ? l : '';
    //         })
    //       )
    //     ),

    //     $(
    //       go.Panel,
    //       'Auto',
    //       {
    //         margin: new go.Margin(0, 0, 0, 175),
    //       },

    //       makeCustomExpander(false)
    //     )
    //   )
    //   // new go.Binding('visible', 'isClient', function (o) {
    //   //   return !o;
    //   // })
    // );
    var ontNode = $(
      go.Node,
      'Auto',
      {
        selectionAdorned: false,
        click: (e, obj) => {
          this.clientArr = [];
          this.selectedAPValue = '';
          let params: any;
          if (obj.part.data['ap-tech-note'] || obj.part.data['backhaul']) {
            this.selectedAPValue = obj.part.data;
            if (obj.part.data['ap-tech-note']) {
              params = {
                note: obj.part.data['ap-tech-note'],
                name: obj.part.data['sn'],
              };
              JSON.stringify(this.clientArr.push(params));
            }
            if (obj.part.data['backhaul']?.['backhaul-tech-note'] && obj.part.data['ap-tech-note'] != obj.part.data['backhaul']?.['backhaul-tech-note']) {
              params = {
                note: obj.part.data.backhaul?.['backhaul-tech-note'],
                name: `${this.language.Backhaul_Issue}:`,
              };
              JSON.stringify(this.clientArr.push(params));
            }
          } else if (obj.part.data['client-note']) {
            this.selectedAPValue = obj.part.data;
            params = {
              note: obj.part.data['client-note'],
              name: obj.part.data['hostname']
                ? obj.part.data['hostname']
                : obj.part.data['mac'],
            };
            JSON.stringify(this.clientArr.push(params));
          }
          if (this.clientArr.length > 0) {
            this.scroll();
          }
        },
        mouseHover: function (e, obj) {
          let node = obj.part;
          if (node.data.key === 'internet') {
            return;
          }
          if (node.data.key === 'ethernet') {
            return;
          }
        },
      },

      $(
        go.Shape,
        {
          width: 210,
          height: 150,
          fill: 'white',
        },
        new go.Binding('strokeWidth', 'isHighlighted', function (h) {
          return h ? 2 : 0;
        }).ofObject(),
        new go.Binding('stroke', 'isHighlighted', function (h) {
          return h ? 'gold' : 'white';
        }).ofObject()
      ),
      $(
        go.Shape, "RoundedRectangle",
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        {
          width: 210,
          height: 80,
          strokeWidth: 0,
          parameter1: 25,
        },
        new go.Binding('fill', '', function (node) {
          return node.color || 'white';
        })
      ),

      // $(
      //   go.Panel,
      //   'Auto',
      //   new go.Binding('cursor', 'label', function (l) {
      //     return l ? 'pointer' : '';
      //   }),
      //   {
      //     width: 210,
      //     height: 78,
      //     background : 'blue'

      //   },

      $(
        go.Panel,
        'Vertical', // the row of status indicators
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        {
          width: 210,
          height: 80,
        },
        $(
          go.Panel,
          'Auto',
          {
            margin: new go.Margin(0, 0, 0, 15),
            toolTip:
              $(go.Adornment, "Auto",
                {
                  visible: false,
                  isShadowed: true,
                  shadowColor: "rgba(128, 128, 128, 0.25)",
                  shadowOffset: new go.Point(4, 4),
                },
                new go.Binding('visible', 'ontData', function (text) {
                  return text.length > 0;
                }),
                $(go.Shape, "RoundedRectangle", {
                  fill: 'white',
                  parameter1: 10,
                  strokeWidth: 1,
                  stroke: 'lightgray',
                  width: 900
                }),
                $(go.Panel, "Table",
                  { padding: 10, alignment: go.Spot.TopLeft },
                  new go.Binding("itemArray", "ont/rgData"),
                  $(go.RowColumnDefinition, { column: 0 }),
                  {
                    name: "TABLE",
                    defaultAlignment: go.Spot.Left,
                    itemTemplate:
                      $(go.Panel, "TableRow",
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:
                            $(go.Panel,
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(230, NaN),
                                  minSize: new go.Size(200, NaN),
                                  isMultiline: true,
                                  // font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text"),
                                new go.Binding('font', '', function (text) {
                                  return text.text.includes(`ONT -`) ? "bold 16px Source Sans Pro" : "normal 15px Source Sans Pro";
                                }),
                              ),
                            )
                        }
                      )
                  }
                ),
                $(go.Panel, "Table",
                  { padding: 10, alignment: go.Spot.TopRight },
                  new go.Binding("itemArray", "rg/ontData"),
                  $(go.RowColumnDefinition, { column: 0, width: 200 }),
                  {
                    name: "TABLE",
                    defaultAlignment: go.Spot.Right,
                    itemTemplate:
                      $(go.Panel, "TableRow",
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:
                            $(go.Panel,
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(230, NaN),
                                  minSize: new go.Size(200, NaN),
                                  isMultiline: true,
                                  // font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text"),
                                new go.Binding('font', '', function (text) {
                                  return text.text.includes(`RG -`) ? "bold 16px Source Sans Pro" : "normal 15px Source Sans Pro";
                                }),
                              )
                            )
                        }
                      )
                  }
                ),
              ),
          },
          $(go.Shape, "RoundedRectangle",
            {
              parameter1: 10,
              width: 210,
              height: 40,
              strokeWidth: 0,
              fill: "transparent",
            },
          ),
          $(
            go.Panel,
            'Horizontal',
            {
              width: 210,
              height: 40,
            },
            $(
              go.Panel,
              'Auto',
              { height: 40, width: 60 },
              $(
                go.Picture,
                {
                  width: 13, height: 30,
                  margin: new go.Margin(5, 0, 0, 25)
                },
                new go.Binding('source', 'ontSourceIcon', function (image) {
                  return image ? image : '';
                }),
              )
            ),
            $(
              go.Panel,
              'Auto',
              { height: 40, width: 160 },
              $(
                go.TextBlock,
                {
                  margin: new go.Margin(13, 0, 0, 0),
                  width: 120,
                  overflow: go.TextBlock.OverflowEllipsis,
                },
                new go.Binding('text', 'ontSN', function (l) {
                  return l ? l : '';
                }),
                new go.Binding('maxLines', '', function (l) {
                  return l['isInternet'] ? 2 : 1;
                })
              )
            ),
          ),
        ),
        $(
          go.Panel,
          'Auto',
          {
            margin: new go.Margin(0, 0, 0, 15),
            toolTip:
              $(go.Adornment, "Auto",
                {
                  visible: false,
                  isShadowed: true,
                  shadowColor: "rgba(128, 128, 128, 0.25)",
                  shadowOffset: new go.Point(4, 4),
                },
                new go.Binding('visible', 'rgData', function (text) {
                  return text.length > 0;
                }),
                $(go.Shape, "RoundedRectangle", {
                  fill: 'white',
                  parameter1: 10,
                  strokeWidth: 1,
                  stroke: 'lightgray',
                  width: 900
                }),
                $(go.Panel, "Table",
                  { padding: 10, alignment: go.Spot.TopLeft },
                  new go.Binding("itemArray", "ont/rgData"),
                  $(go.RowColumnDefinition, { column: 0, width: 200 }),
                  { // the rows for the rgData
                    name: "TABLE",
                    defaultAlignment: go.Spot.Left,
                    itemTemplate:  // bound to a person/row data object
                      $(go.Panel, "TableRow",
                        // {width: 20},
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:  // bound to a cell object
                            $(go.Panel,  // each of which as "attr" and "text" properties
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {  // ELT is this bound item/cell Panel
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(230, NaN),
                                  minSize: new go.Size(200, NaN),
                                  isMultiline: true,
                                  // font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text"),
                                new go.Binding('font', '', function (text) {
                                  return text.text.includes(`ONT -`) ? "bold 16px Source Sans Pro" : "normal 15px Source Sans Pro";
                                }),
                              )
                            )
                        }
                      )
                  }
                ),
                $(go.Panel, "Table",
                  { padding: 10, alignment: go.Spot.TopRight },
                  new go.Binding("itemArray", "rg/ontData"),
                  $(go.RowColumnDefinition, { column: 0, width: 200 }),
                  { // the rows for the rgData
                    name: "TABLE",
                    defaultAlignment: go.Spot.Left,
                    itemTemplate:  // bound to a person/row data object
                      $(go.Panel, "TableRow",
                        // {width: 20},
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:  // bound to a cell object
                            $(go.Panel,  // each of which as "attr" and "text" properties
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {  // ELT is this bound item/cell Panel
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(230, NaN),
                                  minSize: new go.Size(200, NaN),
                                  isMultiline: true,
                                  // font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text"),
                                new go.Binding('font', '', function (text) {
                                  return text.text.includes(`RG -`) ? "bold 16px Source Sans Pro" : "normal 15px Source Sans Pro";
                                }),
                              )
                            )
                        }
                      )
                  }
                ),
              ),
          },
          $(go.Shape, "RoundedRectangle",
            {
              parameter1: 10,
              width: 210,
              height: 40,
              strokeWidth: 0,
              fill: "transparent",
            },
          ),
          $(
            go.Panel,
            'Horizontal',
            {
              width: 210,
              height: 40,
            },
            $(
              go.Panel,
              'Auto',
              { height: 40, width: 60 },
              $(
                go.Picture,
                { margin: new go.Margin(6, 0, 0, 18), height: 28 },
                new go.Binding('source', 'source', function (image) {
                  return image ? image : '';
                }),
                new go.Binding('element', 'source-video', function (video) {
                  return video ? video : '';
                }),
                new go.Binding('width', 'width'),
              )
            ),
            $(
              go.Panel,
              'Auto',
              {
                height: 40, width: 160,
              },
              $(
                go.TextBlock,
                {
                  margin: new go.Margin(10, 0, 0, 0),
                  width: 120,
                  overflow: go.TextBlock.OverflowEllipsis,
                },
                new go.Binding('text', 'label', function (l) {
                  return l ? l : '';
                }),
                new go.Binding('maxLines', '', function (l) {
                  return l['isInternet'] ? 2 : 1;
                })
              )
            ),
          ),
        ),
      ),

      //Passed Clients
      $(
        go.Panel,
        'Auto',
        {
          click: function (e, obj) {
            var node = obj.part; // get the Node containing this Button
            if (node === null) return;
            e.handled = true;
            that.clientDeviceSSID
              ? expandSSIDNode(node, true, 'isPassedClient')
              : expandNode(node, true, 'isPassedClient');
          },
        },

        new go.Binding('margin', 'label', function (l) {
          return l ? new go.Margin(-70, 0, 0, 50) : '';
        }),
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),

        // decorations:
        $(
          go.Shape,
          'Circle',

          {
            width: 24,
            height: 24,
            // fill: 'white',
            stroke: 'green',
            strokeWidth: 2,
            margin: 5,
            visible: false,
          },
          new go.Binding('fill', '_othersPassedExpanded', function (node) {
            return node ? 'green' : 'white';
          }),
          new go.Binding('visible', 'passed-clients', function (l) {
            return l ? l : false;
          })
        ),

        $(
          go.TextBlock,
          {
            margin: 5,
          },
          new go.Binding('stroke', '', function (node) {
            return node._othersPassedExpanded ? 'white' : 'black';
          }),
          new go.Binding('text', 'passed-clients', function (l) {
            return l ? l : '';
          })
        )
      ),

      //Failed Clients
      $(
        go.Panel,
        'Auto',
        {
          click: function (e, obj) {
            var node = obj.part; // get the Node containing this Button
            if (node === null) return;
            e.handled = true;
            that.clientDeviceSSID
              ? expandSSIDNode(node, true, 'isFailedClient')
              : expandNode(node, true, 'isFailedClient');
          },
        },

        new go.Binding('margin', 'label', function (l) {
          return l ? new go.Margin(-60, 0, 0, 90) : '';
        }),
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),

        // decorations:
        $(
          go.Shape,
          'Circle',

          {
            width: 24,
            height: 24,
            // fill: 'white',
            // stroke: 'orange',
            strokeWidth: 2,
            margin: 5,
            visible: false,
          },
          new go.Binding('fill', '', function (node) {
            return node._othersFailedExpanded && (node.isrgWithIssue || node.isapWithIssue) ? 'red' : node._othersFailedExpanded && (!node.isrgWithIssue || !node.isapWithIssue) ? 'orange' : 'white';
          }),
          new go.Binding('visible', 'failed-clients', function (l) {
            return l ? l : false;
          }),
          new go.Binding('stroke', '', function (node) {
            return node.isrgWithIssue || node.isapWithIssue ? 'red' : 'orange';
          })
        ),

        $(
          go.TextBlock,
          {
            margin: 5,
          },
          new go.Binding('stroke', '', function (node) {
            return node._othersFailedExpanded ? 'white' : 'black';
          }),
          new go.Binding('text', 'failed-clients', function (l) {
            return l ? l : '';
          })
        )
      ),
      $(
        go.Panel,
        'Auto',
        {
          margin: new go.Margin(0, 0, 0, 175),
        },

        makeCustomExpander(false)
      )
    );
    function findColumnDefinitionForName(nodedata, attrname) {
      var columns = nodedata.columnDefinitions;
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].attr === attrname) return columns[i];
      }
      return null;
    }
    var templmap = new go.Map<string, go.Node>();
    templmap.add('ontNode', ontNode);
    // templmap.add('Main', mainNode);
    this.APTopology.nodeTemplateMap = templmap;

    var otherNode = $(
      go.Node,
      'Auto',
      // { isTreeExpanded: false },
      {
        selectionAdorned: false,
        click: (e, obj) => {
          this.clientArr = [];
          this.selectedAPValue = '';
          let params: any;
          if (obj.part.data['ap-tech-note'] || obj.part.data['backhaul']) {
            this.selectedAPValue = obj.part.data;
            if (obj.part.data['ap-tech-note']) {
              this.isAPSNodeClicked = true;
              this.isClientNodeClicked = false;
              let apIssue = obj.part.data['ap-issue-list'], mapTrSerial = [];;

              const wapFailed = apIssue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
              apIssue = apIssue.filter((obj, i) => {
                if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
                  return obj;
                } else {
                  mapTrSerial.push(obj?.serialNumber);
                }
              });

              for (let i = apIssue.length - 1; i >= 0; i--) {
                if (mapTrSerial.includes(apIssue[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(apIssue[i]["code"])) {
                  apIssue.push({
                    "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
                    "subscriberId": "",
                    "serialNumber": apIssue[i]["serialNumber"],
                    "source": apIssue[i]["serialNumber"],
                    "sourceId": apIssue[i]["serialNumber"],
                    "type": "ROUTER",
                    "severity": 0,
                    "reason": "High Operating Temperature Observed",
                    "isValid": true
                  });
                  apIssue.splice(i, 1);
                }
              }
              this.issueData = apIssue.filter(obj => this.issueCode.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
              this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
              this.issueList = this.issueData;
              this.totalissues = this.issueList.length;
              this.initalize();

              if (apIssue.length > 0) {
                this.rgflag = true;
                this.aps_issue = '';
                this.aps_issue_length = apIssue.length;

                this.clickedAPS = obj.part.data;
                for (let apiss = 0; apiss < apIssue.length; apiss++) {
                  this.issueDescription(apIssue[apiss].code, 'aps', obj.part.data['sn'], apiss);
                  this.issueCode = apIssue[apiss].code;
                  this.serialNumber = apIssue[apiss].serialNumber
                  this.issueType = 'aps';
                  this.issueName = obj.part.data['sn'];
                }
                // params = {
                //   note: this.aps_issue,
                //   name: obj.part.data['sn'],
                // };
                // JSON.stringify(this.clientArr.push(params));
              }
            }
            if (obj.part.data['backhaul']?.['backhaul-tech-note'] && obj.part.data['ap-tech-note'] != obj.part.data['backhaul']?.['backhaul-tech-note']) {
              let bhIssueList = obj.part.data['backhaul']?.['backhaul-issue-list'];
              this.isBHNodeClicked = true;
              this.isClientNodeClicked = false;
              this.backhaul_issue = '';
              let name = `${this.language.Backhaul_Issue}:`;
              this.backhaul_issue_length = bhIssueList.length;
              this.clickedBackhaul = obj.part.data['backhaul']?.['backhaul-issue-list'];
              for (let bhiss = 0; bhiss < bhIssueList.length; bhiss++) {
                this.issueDescription(bhIssueList[bhiss].code, 'backhaul', name, bhiss);
                this.bhissueCode = bhIssueList[bhiss].code;
                this.bhissueType = 'backhaul';
                this.bhissueName = `${this.language.Backhaul_Issue}:`;
              }
              // params = {
              //   note: obj.part.data.backhaul['backhaul-tech-note'],
              //   name: 'Backhaul Issue:',
              // };
              // JSON.stringify(this.clientArr.push(params));
            }
          } else if (obj.part.data['client-note']) {
            this.isAPSNodeClicked = false;
            this.isBHNodeClicked = false;
            this.isClientNodeClicked = true;
            this.selectedAPValue = obj.part.data;
            let clientIssue = obj.part.data['client-issue-list'];
            if (clientIssue.length > 0) {
              this.rgflag = true;
              this.client_issue = '';
              this.client_issue_length = clientIssue.length;
              this.clickedClient = obj.part.data;
              let clientSN = obj.part.data['hostname'] ? obj.part.data['hostname'] : obj.part.data['mac'];
              for (let clientiss = 0; clientiss < clientIssue.length; clientiss++) {
                this.issueDescription(clientIssue[clientiss].code, 'client', clientSN, clientiss);
                this.issueCode = clientIssue[clientiss].code;
                this.issueType = 'client';
                this.issueName = clientSN;
              }
              // params = {
              //   note: this.client_issue,
              //   name: obj.part.data['hostname']
              // ? obj.part.data['hostname']
              // : obj.part.data['mac'],
              // };
              // JSON.stringify(this.clientArr.push(params));
            }
          }
          if (this.clientArr.length > 0) {
            this.scroll();
          }
        },
        mouseHover: function (e, obj) {
          let node = obj.part;
          if (node.data.key === 'internet') {
            return;
          }
          if (node.data.key === 'ethernet') {
            return;
          }
        },
      },
      $(
        go.Shape,
        {
          width: 210,
          height: 120,
          fill: 'white',
        },
        new go.Binding('strokeWidth', 'isHighlighted', function (h) {
          return h ? 2 : 0;
        }).ofObject(),
        new go.Binding('stroke', 'isHighlighted', function (h) {
          return h ? 'gold' : 'white';
        }).ofObject()
      ),
      $(
        go.Shape, "Badge", {
        visible: false,
      },
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        new go.Binding('visible', '', function (data) {
          if (data['isConnectivityNode'] || data['isInternet']) {
            return true;
          } else {
            return false;
          }
        }),
        {
          width: 210,
          height: 40,
          strokeWidth: 0,
          toolTip:
            $(go.Adornment, "Auto",
              {
                visible: false,
                isShadowed: true,
                shadowColor: "rgba(128, 128, 128, 0.25)",
                shadowOffset: new go.Point(4, 4),
              },
              new go.Binding('visible', 'rgData', function (text) {
                return text.length > 0;
              }),
              $(go.Shape, "RoundedRectangle", {
                fill: 'white',
                parameter1: 10,
                strokeWidth: 1,
                stroke: 'lightgray'
              }),
              $(go.Panel, "Table",
                { margin: new go.Margin(0, 5, 0, 5) },
                new go.Binding("itemArray", "rgData"),
                $(go.RowColumnDefinition, { column: 0, width: 200 }),
                {
                  name: "TABLE",
                  defaultAlignment: go.Spot.Left,
                  itemTemplate:
                    $(go.Panel, "TableRow",
                      new go.Binding("itemArray", "columns"),
                      {
                        itemTemplate:
                          $(go.Panel,
                            { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                            new go.Binding("column", "attr",
                              function (a, elt) {
                                var cd = findColumnDefinitionForName(elt.part.data, a);
                                if (cd !== null) return cd.column;
                                throw new Error("unknown column name: " + a);
                              }),
                            $(go.TextBlock,
                              {
                                maxSize: new go.Size(350, NaN),
                                minSize: new go.Size(100, NaN),
                                isMultiline: true,
                                font: "normal 15px Source Sans Pro",
                                spacingAbove: 5,
                              },
                              new go.Binding("text"))
                          )
                      }
                    )
                }
              ),
            ),
        },
        new go.Binding('fill', '', function (node) {
          return node.color || 'white';
        }),
      ),

      $(
        go.Shape, "RoundedRectangle", {
        visible: false,
        parameter1: 15,
      },
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        new go.Binding('visible', '', function (data) {
          if (!data['isConnectivityNode'] && !data['isInternet']) {
            return true;
          } else {
            return false;
          }
        }),
        {
          width: 210,
          height: 40,
          strokeWidth: 0,
          toolTip:
            $(go.Adornment, "Auto",
              {
                visible: false,
                isShadowed: true,
                shadowColor: "rgba(128, 128, 128, 0.25)",
                shadowOffset: new go.Point(4, 4),
              },
              new go.Binding('visible', 'rgData', function (text) {
                return text.length > 0;
              }),
              $(go.Shape, "RoundedRectangle", {
                fill: 'white',
                parameter1: 10,
                strokeWidth: 1,
                stroke: 'lightgray'
              }),
              $(go.Panel, "Table",
                { margin: new go.Margin(0, 5, 0, 5) },
                new go.Binding("itemArray", "rgData"),
                $(go.RowColumnDefinition, { column: 0, width: 200 }),
                {
                  name: "TABLE",
                  defaultAlignment: go.Spot.Left,
                  itemTemplate:
                    $(go.Panel, "TableRow",
                      new go.Binding("itemArray", "columns"),
                      {
                        itemTemplate:
                          $(go.Panel,
                            { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                            new go.Binding("column", "attr",
                              function (a, elt) {
                                var cd = findColumnDefinitionForName(elt.part.data, a);
                                if (cd !== null) return cd.column;
                                throw new Error("unknown column name: " + a);
                              }),
                            $(go.TextBlock,
                              {
                                maxSize: new go.Size(350, NaN),
                                minSize: new go.Size(100, NaN),
                                isMultiline: true,
                                font: "normal 15px Source Sans Pro",
                                spacingAbove: 5,
                              },
                              new go.Binding("text"))
                          )
                      }
                    )
                }
              ),
            ),
        },
        new go.Binding('fill', '', function (node) {
          return node.color || 'white';
        }),
      ),

      $(
        go.Panel,
        'Auto',
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        {
          width: 220,
          height: 120,
        },

        $(
          go.Panel,
          'Spot',
          {
            visible: false,
          },
          $(
            go.Picture,
            {
              desiredSize: new go.Size(25, 20),
              alignment: go.Spot.TopLeft,
              visible: false,
              margin: new go.Margin(25, 0, 0, 10),
              toolTip: $(go.Adornment, "Auto",
                {
                  visible: false,
                  isShadowed: true,
                  shadowColor: "rgba(128, 128, 128, 0.25)",
                  shadowOffset: new go.Point(4, 4),
                },
                new go.Binding('visible', '', function (data) {
                  return data['int-type'] != 'LAN' && data['ap-online'] == 'true' && data.hasOwnProperty('satPlacementRating')
                }),
                $(go.Shape, "RoundedRectangle", {
                  fill: 'white',
                  parameter1: 10,
                  strokeWidth: 1,
                  stroke: 'lightgray'
                }),
                $(go.Panel, "Table",
                  { margin: new go.Margin(0, 5, 0, 5) },
                  new go.Binding("itemArray", "ap_rssi_tooltip"),
                  $(go.RowColumnDefinition, { column: 0, width: 200 }),
                  {
                    name: "TABLE",
                    defaultAlignment: go.Spot.Left,
                    itemTemplate:
                      $(go.Panel, "TableRow",
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:
                            $(go.Panel,
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(350, NaN),
                                  minSize: new go.Size(100, NaN),
                                  isMultiline: true,
                                  font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text")),
                            )
                        }
                      )
                  }
                ),
              ),
            },
            new go.Binding('source', 'wirelessIcon', function (image) {
              return image ? image : '';
            }),
            new go.Binding('width', 'width', function (data) {
              return data - 5;
            }),
            new go.Binding('height', 'height', function (data) {
              return data - 10;
            }),
            new go.Binding('visible', '', function (data) {
              return data['int-type'] != 'LAN' && data['ap-online'] == 'true' && data.hasOwnProperty('satPlacementRating')
            }),
          ),
          new go.Binding('visible', '', function (data) {
            return data['int-type'] != 'LAN' && data['ap-online'] == 'true' && data.hasOwnProperty('satPlacementRating')
          }),
        ),

        $(
          go.Panel,
          'Spot',
          {
            visible: false,
            alignment: go.Spot.TopLeft,
          },
          new go.Binding('visible', 'freqBand', function (freqBand) {
            return freqBand != '';
          }),
          $(
            go.TextBlock,
            { margin: new go.Margin(25, 0, 0, 10) },
            new go.Binding('text', 'freqBand')
          )
        ),

        $(
          go.Panel,
          'Horizontal', // the row of status indicators
          $(
            go.Panel,
            'Horizontal',
            { height: 35, width: 60 },
            $(
              go.Picture,
              { margin: new go.Margin(0, 0, 0, 25) },
              new go.Binding('source', 'source', function (image) {
                return image ? image : '';
              }),
              new go.Binding('element', 'source-video', function (video) {
                return video ? video : '';
              }),
              new go.Binding('width', 'width'),
              new go.Binding('height', 'height')
            )
          ),
          $(
            go.Panel,
            'Horizontal',
            { height: 40, width: 160 },
            $(
              go.TextBlock,
              {
                margin: new go.Margin(0, 0, 0, 10),
                width: 120,
                overflow: go.TextBlock.OverflowEllipsis,
              },
              new go.Binding('text', 'label', function (l) {
                return l ? l : '';
              }),
              new go.Binding('maxLines', '', function (l) {
                return l['isInternet'] ? 2 : 1;
              })
            )
          ),
          {
            toolTip:
              $(go.Adornment, "Auto",
                {
                  visible: false,
                  isShadowed: true,
                  shadowColor: "rgba(128, 128, 128, 0.25)",
                  shadowOffset: new go.Point(4, 4),
                },
                new go.Binding('visible', 'rgData', function (text) {
                  return text.length > 0;
                }),
                $(go.Shape, "RoundedRectangle", {
                  fill: 'white',
                  parameter1: 10,
                  strokeWidth: 1,
                  stroke: 'lightgray'
                }),
                $(go.Panel, "Table",
                  { margin: new go.Margin(0, 5, 0, 5) },
                  new go.Binding("itemArray", "rgData"),
                  $(go.RowColumnDefinition, { column: 0, width: 200 }),
                  {
                    name: "TABLE",
                    defaultAlignment: go.Spot.Left,
                    itemTemplate:
                      $(go.Panel, "TableRow",
                        new go.Binding("itemArray", "columns"),
                        {
                          itemTemplate:
                            $(go.Panel,
                              { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                              new go.Binding("column", "attr",
                                function (a, elt) {
                                  var cd = findColumnDefinitionForName(elt.part.data, a);
                                  if (cd !== null) return cd.column;
                                  throw new Error("unknown column name: " + a);
                                }),
                              $(go.TextBlock,
                                {
                                  maxSize: new go.Size(350, NaN),
                                  minSize: new go.Size(100, NaN),
                                  isMultiline: true,
                                  font: "normal 15px Source Sans Pro",
                                  spacingAbove: 5,
                                },
                                new go.Binding("text"))
                            )
                        }
                      )
                  }
                ),
              ),
          }
        ),

        //Passed Clients
        $(
          go.Panel,
          'Auto',
          {
            click: function (e, obj) {
              var node = obj.part; // get the Node containing this Button
              if (node === null) return;
              e.handled = true;
              that.clientDeviceSSID
                ? expandSSIDNode(node, true, 'isPassedClient')
                : expandNode(node, true, 'isPassedClient');
            },
          },

          new go.Binding('margin', 'label', function (l) {
            return l ? new go.Margin(-55, 0, 0, 50) : '';
          }),
          new go.Binding('cursor', 'label', function (l) {
            return l ? 'pointer' : '';
          }),

          // decorations:
          $(
            go.Shape,
            'Circle',

            {
              width: 24,
              height: 24,
              // fill: 'white',
              stroke: 'green',
              strokeWidth: 2,
              margin: 5,
              visible: false,
            },
            new go.Binding('fill', '_othersPassedExpanded', function (node) {
              return node ? 'green' : 'white';
            }),
            new go.Binding('visible', 'passed-clients', function (l) {
              return l ? l : false;
            })
          ),

          $(
            go.TextBlock,
            {
              margin: 5,
            },
            new go.Binding('stroke', '', function (node) {
              return node._othersPassedExpanded ? 'white' : 'black';
            }),
            new go.Binding('text', 'passed-clients', function (l) {
              return l ? l : '';
            })
          )
        ),

        //Failed Clients
        $(
          go.Panel,
          'Auto',
          {
            click: function (e, obj) {
              var node = obj.part; // get the Node containing this Button
              if (node === null) return;
              e.handled = true;
              that.clientDeviceSSID
                ? expandSSIDNode(node, true, 'isFailedClient')
                : expandNode(node, true, 'isFailedClient');
            },
          },

          new go.Binding('margin', 'label', function (l) {
            return l ? new go.Margin(-45, 0, 0, 90) : '';
          }),
          new go.Binding('cursor', 'label', function (l) {
            return l ? 'pointer' : '';
          }),

          // decorations:
          $(
            go.Shape,
            'Circle',

            {
              width: 24,
              height: 24,
              // fill: 'white',
              stroke: 'orange',
              strokeWidth: 2,
              margin: 5,
              visible: false,
            },
            new go.Binding('fill', '', function (node) {
              return node._othersFailedExpanded && (node.isrgWithIssue || node.isapWithIssue) ? 'red' : node._othersFailedExpanded && (!node.isrgWithIssue || !node.isapWithIssue) ? 'orange' : 'white';
            }),
            new go.Binding('visible', 'failed-clients', function (l) {
              return l ? l : false;
            }),
            new go.Binding('stroke', '', function (node) {
              return node.isrgWithIssue || node.isapWithIssue ? 'red' : 'orange';
            })
          ),

          $(
            go.TextBlock,
            {
              margin: 5,
            },
            new go.Binding('stroke', '', function (node) {
              return node._othersFailedExpanded ? 'white' : 'black';
            }),
            new go.Binding('text', 'failed-clients', function (l) {
              return l ? l : '';
            })
          )
        ),

        $(
          go.Panel,
          'Auto',
          {
            margin: new go.Margin(0, 0, 0, 175),
          },

          makeCustomExpander(false)
        )
      )
    );

    // var templmap = new go.Map<string, go.Node>();
    templmap.add('otherNode', otherNode);
    // templmap.add('Main', mainNode);
    this.APTopology.nodeTemplateMap = templmap;
    this.APTopology.linkTemplate = $(
      go.Link,
      {
        curve: go.Link.Bezier,
        // toShortLength: 6,
        relinkableFrom: true,
        relinkableTo: true,
      }, // allow the user to relink existing links
      $(
        go.Shape,
        {
          strokeWidth: 3,
          width: 200,
        },
        new go.Binding('stroke', 'color'),
        new go.Binding('strokeWidth', 'thick')
      ),
      {
        toolTip:
          $(go.Adornment, "Auto",
            {
              visible: false,
              isShadowed: true,
              shadowColor: "rgba(128, 128, 128, 0.25)",
              shadowOffset: new go.Point(4, 4),
            },
            new go.Binding('visible', 'linkText', function (text) {
              return text.length > 0;
            }),
            $(go.Shape, "RoundedRectangle", {
              fill: 'white',
              parameter1: 10,
              strokeWidth: 1,
              stroke: 'lightgray'
            }),
            $(go.Panel, "Table",
              { margin: new go.Margin(0, 5, 0, 5) },
              new go.Binding("itemArray", "linkText"),
              $(go.RowColumnDefinition, { column: 0, width: 200 }),
              {
                name: "TABLE",
                defaultAlignment: go.Spot.Left,
                itemTemplate:
                  $(go.Panel, "TableRow",
                    new go.Binding("itemArray", "columns"),
                    {
                      itemTemplate:
                        $(go.Panel,
                          { margin: new go.Margin(3, 0, 3, 0), stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                          new go.Binding("column", "attr",
                            function (a, elt) {
                              var cd = findLinkColumnDefinitionForName(elt.part.data, a);
                              if (cd !== null) return cd.column;
                              throw new Error("unknown column name: " + a);
                            }),
                          $(go.TextBlock,
                            {
                              maxSize: new go.Size(350, NaN),
                              minSize: new go.Size(100, NaN),
                              isMultiline: true,
                              font: "normal 15px Source Sans Pro",
                              spacingAbove: 5,
                            },
                            new go.Binding("text"))
                        )
                    }
                  )
              }
            ),
          ),
      }
    );
    function findLinkColumnDefinitionForName(nodedata, attrname) {
      var columns = nodedata.linkColumn;
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].attr === attrname) return columns[i];
      }
      return null;
    }
    let that = this;
    function makeCustomExpander(others) {
      return $(
        'Button',
        {
          visible: false,
          // alignment: align,
          click: function (e, obj) {
            var node = obj.part; // get the Node containing this Button
            if (node === null) return;
            e.handled = true;
            that.clientDeviceSSID
              ? expandSSIDNode(node, others, 'isClient')
              : expandNode(node, others, 'isClient');
          },
        },

        $(
          go.Shape, // the icon
          {
            name: 'ButtonIcon',
            figure: 'TriangleLeft',
            stroke: '#424242',
            strokeWidth: 2,
            desiredSize: new go.Size(8, 8),
          },
          // bind the Shape.figure to the node.data._othersExpanded value using this converter:
          new go.Binding(
            'figure',
            others ? '_othersExpanded' : '_primariesExpanded',
            function (exp, shape) {
              var but = shape.panel;
              return exp ? 'TriangleLeft' : 'TriangleRight';
            }
          )
        ),
        new go.Binding('visible', '', function (node) {
          return !node.isTreeLeaf && node.apHasChildAp ? true : false;
        })
      );
    }
    function expandNode(node, others, type) {
      that.APTopology.startTransaction('CollapseExpandTree');
      var children = node.findTreeChildrenNodes();
      var visibleNodes: boolean;
      children.each(function (c) {
        var cd = c.data;
        if (others && !cd[type]) return;
        if (!others && cd[type]) return;
        if (c.visible) {
          //find no child visible to collapse ssid
          var hasPassedChild = false;
          var hasFailedChild = false;
          var hasPrimaryChild = false;

          if (!that.clientDeviceSSID) {
            that.expandedNodes = that.expandedNodes.filter(
              (el) => el != c.data.key
            );
            node.findTreeChildrenNodes().each(function (n) {
              if (n.data['isPassedClient']) {
                hasPassedChild = true;
              } else if (n.data['isFailedClient']) {
                hasFailedChild = true;
              } else if (n.data['isAPS']) {
                hasPrimaryChild = true;
              }
            });
          } else {
            c.findTreeChildrenNodes().each(function (n) {
              if (n.data['isPassedClient']) {
                hasPassedChild = true;
              } else if (n.data['isFailedClient']) {
                hasFailedChild = true;
              } else if (n.data['isAPS']) {
                hasPrimaryChild = true;
              }
            });
          }


          if (type == 'isPassedClient') {
            if (!hasFailedChild || !node.data['_othersFailedExpanded']) {
              that.expandedNodes = that.expandedNodes.filter(
                (el) =>
                  el !=
                  node.data['sn'] +
                  '-' +
                  c.data['ssid'] +
                  '-' +
                  c.data['freq-band'] +
                  '-client'
              );
            }
            if (
              (!hasFailedChild || !node.data['_othersFailedExpanded']) &&
              (!hasPrimaryChild || !node.data['_primariesExpanded'])
            ) {
              that.expandedNodes = that.expandedNodes.filter(
                (el) => el != `ethernet-${c.data['eth-port']}-${node.data['sn']}`
              );
            }
          }

          if (type == 'isFailedClient') {
            if (!hasPassedChild || !node.data['_othersPassedExpanded']) {
              that.expandedNodes = that.expandedNodes.filter(
                (el) =>
                  el !=
                  node.data['sn'] +
                  '-' +
                  c.data['ssid'] +
                  '-' +
                  c.data['freq-band'] +
                  '-client'
              );
            }
            if (
              (!hasPassedChild || !node.data['_othersPassedExpanded']) &&
              (!hasPrimaryChild || !node.data['_primariesExpanded'])
            ) {
              that.expandedNodes = that.expandedNodes.filter(
                (el) => el != `ethernet-${c.data['eth-port']}-${node.data['sn']}`
              );
            }
          }

          // if (type == 'isClient') {
          //   that.expandedNodes = that.expandedNodes.filter(
          //     (el) => el != node.data['sn'] + '-' + c.data['ssid']
          //   );
          //   if (
          //     (!hasPassedChild && !hasFailedChild) ||
          //     (!node.data['_othersFailedExpanded'] &&
          //       !node.data['_othersPassedExpanded'])
          //   ) {
          //     that.expandedNodes = that.expandedNodes.filter(
          //       (el) => el != `ethernet-${c.data['eth-port']}-${node.data['sn']}`
          //     );
          //   }
          // }
          if (
            (type == 'isPassedClient' && !node.data['_othersFailedExpanded'] && !node.data['_primariesExpanded']) ||
            (type == 'isFailedClient' && !node.data['_othersPassedExpanded'] && !node.data['_primariesExpanded'])
          ) {
            that.expandedNodes = that.expandedNodes.filter(
              (el) =>
                el != c.data.key &&
                el !=
                node.data['sn'] +
                '-' +
                c.data['ssid'] +
                '-' +
                c.data['freq-band'] +
                '-client' &&
                el != `ethernet-${node.data['sn']}`
            );
          } else if (type == 'isPassedClient' || type == 'isFailedClient') {
            that.expandedNodes = that.expandedNodes.filter(
              (el) => el != c.data.key
            );
          } else {
            that.expandedNodes = that.expandedNodes.filter(
              (el) =>
                el != c.data.key &&
                el != node.data['sn'] + '-' + c.data['ssid'] &&
                el != `ethernet-${node.data['sn']}`
            );
          }
          c.visible = false;
          c.collapseTree();

          // collapseAllInnerChilds(c, node);
          if (!c.data['isPassedClient'] && !c.data['isFailedClient']) {
            collapseAllInnerChilds(c, node);
          }
        } else {
          //Push Expanded Nodes in an array

          if (c.data['isPassedClient'] || c.data['isFailedClient']) {
            that.expandedNodes.push(
              c.data.key,
              node.data.key,
              node.data['sn'] +
              '-' +
              c.data['ssid'] +
              '-' +
              c.data['freq-band'] +
              '-client',
              `ethernet-${c.data['eth-port']}-${node.data['sn']}`
            );
          } else {
            that.expandedNodes.push(
              c.data.key,
              node.data.key,
              node.data['sn'] + '-' + c.data['ssid'],
              `ethernet-${node.data['sn']}`
            );
          }

          that.expandedNodes = [...new Set(that.expandedNodes)];

          c.visible = true;
          c.expandTree();
        }
      });
      if (others) {
        if (type == 'isPassedClient') {
          that.APTopology.model.set(
            node.data,
            '_othersPassedExpanded',
            !node.data._othersPassedExpanded
          );
        } else if (type == 'isFailedClient') {
          that.APTopology.model.set(
            node.data,
            '_othersFailedExpanded',
            !node.data._othersFailedExpanded
          );
        }
      } else {
        that.APTopology.model.set(
          node.data,
          '_primariesExpanded',
          !node.data._primariesExpanded
        );
      }
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function expandSSIDNode(node, others, type) {
      others = node.data['isSSID'] ? true : others;
      if (node.data['isSSID'] || node.data['isAPSSID']) {
        expandSSIDClients(node, others, type);
        return;
      }

      that.APTopology.startTransaction('CollapseExpandTree');
      var children = node.findTreeChildrenNodes();
      var visibleNodes: boolean;
      children.each(function (child) {
        //find no child visible to collapse ssid
        var hasPassedChild = false;
        var hasFailedChild = false;
        var hasPrimaryChild = false;
        child.findTreeChildrenNodes().each(function (n) {
          if (n.data['isPassedClient']) {
            hasPassedChild = true;
          } else if (n.data['isFailedClient']) {
            hasFailedChild = true;
          } else if (n.data['isAPS']) {
            hasPrimaryChild = true;
          }
        });
        if (child.data['offlineAP'] || child.data['isRg']) {
          hasPrimaryChild = true;
        }

        if (
          (type == 'isPassedClient' &&
            hasPassedChild &&
            !node.data['_othersPassedExpanded']) ||
          (type == 'isFailedClient' &&
            hasFailedChild &&
            !node.data['_othersFailedExpanded']) ||
          (type == 'isClient' &&
            hasPrimaryChild &&
            !node.data['_primariesExpanded'])
        ) {
          if (child.data['offlineAP'] || child.data['isRg']) {
            that.expandedNodes.push(child.data.key);
          }
          child.visible = true;
          child.expandTree();
        } else if (
          ((!hasFailedChild || !node.data['_othersFailedExpanded']) &&
            (!hasPrimaryChild || !node.data['_primariesExpanded']) &&
            type == 'isPassedClient') ||
          ((!hasPassedChild || !node.data['_othersPassedExpanded']) &&
            (!hasPrimaryChild || !node.data['_primariesExpanded']) &&
            type == 'isFailedClient') ||
          ((!hasPassedChild || !node.data['_othersPassedExpanded']) &&
            (!hasFailedChild || !node.data['_othersFailedExpanded']) &&
            type == 'isClient')
        ) {
          that.expandedNodes = that.expandedNodes.filter(
            (el) => el != child.data.key
          );
          child.visible = false;
          child.collapseTree();
        }

        var childData = child.data;

        //Expand APs and Clients which is a child of connectivity (SSID or Ethernet)

        var subChildren = child.findTreeChildrenNodes();
        if (subChildren && subChildren != null && subChildren['count'] > 0) {
          // collapseChildNodes(subChildren, type)
          var primarySet: boolean = false;
          subChildren.each(function (subnode) {
            if (type == 'isPassedClient' && !subnode.data['isPassedClient'])
              return;
            if (type == 'isFailedClient' && !subnode.data['isFailedClient'])
              return;
            if (type == 'isClient' && !subnode.data['isAPS']) return;
            if (
              (type == 'isPassedClient' &&
                node.data['_othersPassedExpanded']) ||
              (type == 'isFailedClient' &&
                node.data['_othersFailedExpanded']) ||
              (type == 'isClient' && node.data['_primariesExpanded'])
            ) {
              that.expandedNodes = that.expandedNodes.filter(
                (el) => el != subnode.data.key
              );
              subnode.visible = false;
              subnode.collapseTree();
              visibleNodes = false;
            } else {
              if ((type == 'isClient' && child.data['_primariesExpanded']) || child.data['_primariesExpanded'] || (!node.data['_othersPassedExpanded'] && !node.data['_primariesExpanded'] && !node.data['_othersFailedExpanded'])) {
                primarySet = true;
                subnode.visible = true;
                subnode.expandTree();
              }

              visibleNodes = true;
              that.expandedNodes.push(subnode.data.key, child.data.key);

            }

            if (
              !subnode.data['isPassedClient'] &&
              !subnode.data['isFailedClient']
            ) {
              collapseAllInnerChilds(subnode, child, primarySet);
            }
            // else if (child.data['isAPSSID'] || child.data['isSSID']) {
            //   that.APTopology.model.set(child.data, '_primariesExpanded', true);
            // }
          });
          if ((child.data['isAPSSID'] || child.data['isSSID']) && primarySet) {
            that.APTopology.model.set(child.data, '_primariesExpanded', true);
          }
        }
        if ((child.data['ap-online'] == 'false' || child.data['isRg']) && !node.data['_primariesExpanded']) {
          visibleNodes = true;
        }
      });
      if (!visibleNodes) {
        if (type == 'isPassedClient') {
          that.APTopology.model.set(node.data, '_othersPassedExpanded', false);
        } else if (type == 'isFailedClient') {
          that.APTopology.model.set(node.data, '_othersFailedExpanded', false);
        } else if (type == 'isClient') {
          that.APTopology.model.set(node.data, '_primariesExpanded', false);
        }
      } else {
        if (type == 'isPassedClient') {
          that.APTopology.model.set(node.data, '_othersPassedExpanded', true);
        } else if (type == 'isFailedClient') {
          that.APTopology.model.set(node.data, '_othersFailedExpanded', true);
        } else if (type == 'isClient') {
          that.APTopology.model.set(node.data, '_primariesExpanded', true);
        }
      }
      that.expandedNodes = [...new Set(that.expandedNodes)];
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function collapseAllInnerChilds(subnode, child, primarySet = false) {
      var children = subnode.findTreeChildrenNodes();
      if (children && children != null && children['count'] > 0) {
        children.each(function (c) {
          c.visible = false;
          c.collapseTree();
          that.innerChildsNodes.push(c.data.key);
          that.expandedNodes = that.expandedNodes.filter(
            (el) => el != c.data.key
          );
          let grandParent = child.findTreeParentNode();
          if (that.clientDeviceSSID) {
            if (c.data['isPassedClient']) {
              that.APTopology.model.set(
                child.data,
                '_othersPassedExpanded',
                false
              );
            } else if (c.data['isFailedClient']) {
              that.APTopology.model.set(
                child.data,
                '_othersFailedExpanded',
                false
              );
            } else if (
              c.data['isAPS'] ||
              c.data['isSSID'] ||
              c.data['isAPSSID']
            ) {
              that.APTopology.model.set(
                subnode.data,
                '_primariesExpanded',
                false
              );
            }
          } else {
            if (c.data['isPassedClient']) {
              that.APTopology.model.set(
                subnode.data,
                '_othersPassedExpanded',
                false
              );
            } else if (c.data['isFailedClient']) {
              that.APTopology.model.set(
                subnode.data,
                '_othersFailedExpanded',
                false
              );
            } else if (
              c.data['isAPS'] ||
              c.data['isSSID'] ||
              c.data['isAPSSID']
            ) {
              that.APTopology.model.set(
                subnode.data,
                '_primariesExpanded',
                false
              );
            }
          }

          var subChild = c.findTreeChildrenNodes();
          if (
            subChild &&
            subChild != null &&
            subChild['count'] > 0 &&
            !c.data['isPassedClient'] &&
            !c.data['isFailedClient']
          ) {
            collapseAllInnerChilds(c, subnode);
          }
        });
      } else if ((child.data['isAPSSID'] || child.data['isSSID']) && primarySet) {
        that.APTopology.model.set(child.data, '_primariesExpanded', true);
      }
    }

    function expandSSIDClients(node, others, type) {
      that.APTopology.startTransaction('CollapseExpandTree');
      var children = node.findTreeChildrenNodes();
      var parentNode = node.findTreeParentNode();
      var hasPassedChild = false;
      var hasFailedChild = false;
      var hasPrimaryChild = false;
      parentNode.findTreeChildrenNodes().each(function (n) {
        if (n.data['isPassedClient']) {
          hasPassedChild = true;
        } else if (n.data['isFailedClient']) {
          hasFailedChild = true;
        } else if (n.data['isAPS']) {
          hasPrimaryChild = true;
        }
      });
      if (parentNode.data['_othersFailedExpanded'] &&
        parentNode.data['_othersPassedExpanded'] &&
        parentNode.data['_primariesExpanded']) {
        type = 'allClients';
      } else if (parentNode.data['_othersFailedExpanded'] &&
        parentNode.data['_othersPassedExpanded']) {
        type = 'passedFailedClients';
      } else if (parentNode.data['_othersFailedExpanded'] &&
        parentNode.data['_primariesExpanded']) {
        type = 'primaryFailedClients';
      } else if (parentNode.data['_othersPassedExpanded'] &&
        parentNode.data['_primariesExpanded']) {
        type = 'primaryPassedClients';
      } else if (parentNode.data['_othersFailedExpanded']) {
        type = 'isFailedClient';
      } else if (parentNode.data['_othersPassedExpanded']) {
        type = 'isPassedClient';
      } else if (parentNode.data['_primariesExpanded']) {
        type = 'isClient';
      }
      // if (
      //   (parentNode.data['_othersFailedExpanded'] &&
      //     parentNode.data['_othersPassedExpanded'] &&
      //     parentNode.data['_primariesExpanded']) ||
      //   (parentNode.data['_othersFailedExpanded'] &&
      //     parentNode.data['_othersPassedExpanded'] && !hasPrimaryChild) ||
      //   (parentNode.data['_othersPassedExpanded'] &&
      //     parentNode.data['_primariesExpanded'] && !hasFailedChild) ||
      //   (parentNode.data['_othersFailedExpanded'] &&
      //     parentNode.data['_primariesExpanded'] && !hasPassedChild)
      // ) {
      //   type = 'allClients';
      // } else if (parentNode.data['_othersFailedExpanded']) {
      //   type = 'isFailedClient';
      // } else if (parentNode.data['_othersPassedExpanded']) {
      //   type = 'isPassedClient';
      // } else if (parentNode.data['_primariesExpanded']) {
      //   type = 'isClient';
      // }

      children.each(function (c) {
        if (
          (type == 'isPassedClient' && c.data['isPassedClient']) ||
          (type == 'isFailedClient' && c.data['isFailedClient']) ||

          (type == 'passedFailedClients' && !c.data['isAPS']) ||
          (type == 'primaryFailedClients' && !c.data['isPassedClient']) ||
          (type == 'primaryPassedClients' && !c.data['isFailedClient']) ||

          (type == 'isClient' && c.data['isAPS']) ||
          (type == 'allClients')
        ) {
          if (c.visible) {
            c.visible = false;
            c.collapseTree();
          } else {
            c.visible = true;
            c.expandTree();
          }
        }
      });
      that.APTopology.model.set(
        node.data,
        '_primariesExpanded',
        !node.data._primariesExpanded
      );
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    async function collapseDefault() {
      await collapseRecursive();
      locateIssueFix();
      setDefaultExpandForSSID();
    }
    function setDefaultExpandForSSID() {
      that.APTopology.startTransaction('CollapseExpandTree');
      that.APTopology.nodes.each(function (obj) {
        let node = obj.part;
        if (that.expandedNodes.includes(node.data.key)) {
          if (node.data['isSSID'] || node.data['isAPSSID']) {
            //find no child visible to collapse ssid
            let hasPassedChild = false;
            let hasFailedChild = false;
            let hasPrimaryChild = false;
            node.findTreeChildrenNodes().each(function (subNode) {
              if (subNode.data['isPassedClient']) {
                hasPassedChild = true;
              } else if (subNode.data['isFailedClient']) {
                hasFailedChild = true;
              } else if (subNode.data['isAPS']) {
                hasPrimaryChild = true;
              }
            });
            if (
              (node.findTreeParentNode().data['_othersPassedExpanded'] &&
                hasPassedChild) ||
              (node.findTreeParentNode().data['_othersFailedExpanded'] &&
                hasFailedChild) ||
              (node.findTreeParentNode().data['_primariesExpanded'] &&
                hasPrimaryChild)
            ) {
              node.visible = true;
              node.expandTree();
            }
          } else {
            // let parentVisible = node.findTreeParentNode();
            // if((parentVisible && parentVisible.visible) || node.data['isRg'] || node.data['is']){
            node.visible = true;
            node.expandTree();
            // }

          }
          var parentFill = that.APTopology.findNodesByExample({
            mac: node.data['parent-host-name'],
          });

          if (node.data['isSSID'] || node.data['isAPSSID']) {
            that.APTopology.model.set(node.data, '_primariesExpanded', true);
          }

          if (parentFill) {
            parentFill.each((c) => {
              if (
                !c.data['isSSID'] &&
                !c.data['isAPSSID'] &&
                !c.data['isInternet']
              ) {
                if (node.data['isPassedClient']) {
                  that.APTopology.model.set(
                    c.data,
                    '_othersPassedExpanded',
                    true
                  );
                } else if (node.data['isFailedClient']) {
                  that.APTopology.model.set(
                    c.data,
                    '_othersFailedExpanded',
                    true
                  );
                } else {
                  that.APTopology.model.set(c.data, '_primariesExpanded', true);
                }
              }
            });
          }
        }
      });
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function collapseRecursive() {
      that.APTopology.startTransaction('CollapseExpandTree');
      that.APTopology.nodes.each(function (obj) {
        let node = obj.part;
        var parentNode = node.findTreeParentNode();
        if (!that.clientDeviceSSID) {
          if ((node.data['isInternet'] && node.data['_primariesExpethernetanded']) || (node.data['isRg'] && node.data['_primariesExpanded']) || (node.data['isAPS'] && node.data['apHasChildAp'] && node.data['_primariesExpanded']) || (node.data['isONT'] && node.data['_primariesExpanded'])) {
            that.expandedNodes.push(node.data['key']);
            that.APTopology.model.set(node.data, '_primariesExpanded', true);
          }

          if (node.data['isAPS']) {

            if (parentNode && parentNode != null) {
              that.expandedNodes.push(parentNode.data['sn'] + '-' + node.data['ssid'],
                `ethernet-${node.data['eth-port']}-${parentNode.data['sn']}`);
            }

          }
          that.expandedNodes = [...new Set(that.expandedNodes)];
        }


        if (
          (!node.data['isInternet'] &&
            !node.data['isRg'] &&
            !node.data['isONT'] &&
            !node.data['isAPS'] &&
            !node.data['noRg']) ||
          (node.data['isAPS'] && !parentNode?.data['_primariesExpanded'] && !parentNode?.data['isAPSSID']) ||
          (node.data['isAPS'] && !parentNode?.data['_primariesExpanded'] && node.data['ap-online'] == 'true' && !parentNode?.data['isAPSSID']) ||
          (that.noRG && node.data['isClient'])
        ) {
          that.APTopology.model.set(node.data, '_primariesExpanded', false);
          node.visible = false;
          node.collapseTree();
        }
        if (parentNode?.data['isAPSSID']) {
          let grandParent = parentNode.findTreeParentNode();
          if (grandParent && grandParent != null) {
            if ((node.data['isAPS'] && !grandParent?.data['_primariesExpanded']) ||
              (node.data['isAPS'] && !grandParent?.data['_primariesExpanded'] && node.data['ap-online'] == 'true')) {
              that.APTopology.model.set(node.data, '_primariesExpanded', false);
              node.visible = false;
              node.collapseTree();
            }
          }

        }
        if (that.noRG) {
          let internetNodes = that.APTopology.findNodesByExample({
            isInternet: true,
          });
          if (internetNodes && internetNodes != null) {
            internetNodes.each(function (obj) {
              let node = obj.part;
              var children = node.findTreeChildrenNodes();
              if (children && children != null && children['count'] > 0) {
                children.each(function (d) {
                  d.visible = true;
                  d.expandTree();
                });
              }
            });
          }
        }
      });
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function locateIssueFix() {
      that.APTopology.startTransaction('CollapseExpandTree');
      that.APTopology.findTreeRoots().each(function (e) {
        if (e.data['isInternet']) e.location.y = e.location.y + 1;
        that.locationFixed = true;
      });
      // node.location.y = node.location.y + 1;
      // node.location = new go.Point(0, 141);
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function addMakeCustomExpander() {
      that.APTopology.startTransaction('CollapseExpandTree');

      that.APTopology.nodes.each(function (obj) {
        let node = obj.part;
        let childrenExists = obj.part.findTreeChildrenNodes();
        let childExists = false;
        childrenExists.each(function (c) {
          var cd = c.data;
          if (!cd['isClient'] || cd['isSSIDClient']) {
            childExists = true;
          }
          that.APTopology.model.set(node.data, 'apHasChildAp', childExists);
        });
      });

      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    that.APTopology.model = new go.GraphLinksModel(
      that.nodeDataArray,
      that.linkDataArray
    );

    const el = this.APDiagram.nativeElement;
    const canvas: any = el.querySelector('canvas');
    canvas['style']['outline'] = 'none';
  }

  async setClientDetailsNode() {
    // if (!this.clientDeviceSSID) {
    await this.nodeDataArray.forEach((el) => {
      if (el.clients && el.clients.length > 0) {
        this.objData = el;
        this.onClickClients = '';
        this.getAPData(this.objData);
      }
    });

    this.setOthersPrimary();
  }

  setOthersPrimary() {
    this.nodeDataArray.forEach((el) => {
      let expandCollapse = false;
      if ((el['isInternet'] || el['isRg'] || el['isAPS']) && !el.hasOwnProperty('_primariesExpanded')) {
        expandCollapse = true;
      }
      el['apHasChildAp'] = el.hasOwnProperty('apHasChildAp')
        ? el['apHasChildAp']
        : false;
      el['_othersPassedExpanded'] = el.hasOwnProperty('_othersPassedExpanded')
        ? el['_othersPassedExpanded']
        : false;
      el['_othersFailedExpanded'] = el.hasOwnProperty('_othersFailedExpanded')
        ? el['_othersFailedExpanded']
        : false;
      el['_primariesExpanded'] = el.hasOwnProperty('_primariesExpanded')
        ? el['_primariesExpanded']
        : expandCollapse;
    });
    this.loadSupportTopology();
  }
  clientNodeDetails(clientAttributes) {
    this.clientDetails = '';
    let clientIpAdd = clientAttributes['ip-address'] ? clientAttributes['ip-address'] : `-`;
    let clientHostname = clientAttributes['hostname'] ? clientAttributes['hostname'] : `-`;
    let clientVersion = clientAttributes['version'] ? clientAttributes['version'] : `-`;
    let clientMacAdd = clientAttributes['mac'] ? clientAttributes['mac'] : `-`;
    let clientModel = clientAttributes['fingerprint-model'] && clientAttributes['fingerprint-model'] != 'Unknown' ? clientAttributes['fingerprint-model'] : `-`;
    let clientManufacture = clientAttributes['fingerprint-vendor'] && clientAttributes['fingerprint-vendor'] != 'Unknown' ? clientAttributes['fingerprint-vendor'] : `-`;
    let clientConType = clientAttributes['intf-type'] ? clientAttributes['intf-type'] : `-`;
    let clientSignalStrength = clientAttributes['signal-strength'] ? `${clientAttributes['signal-strength']}dBm` : `-`;
    let clientEffScr = ``;
    // if (clientAttributes['client-efficiency-score'] <= 0) {
    let scoreType = '';
    let clientEffScore = clientAttributes?.['client-efficiency-score'] > 0 ? ((clientAttributes?.['client-efficiency-score'] * 100).toFixed(2)) : clientAttributes?.['client-efficiency-score'] < 0 ? ((0 * 100).toFixed(2)) : clientAttributes?.['client-efficiency-score'] == 0 ? ((0 * 100).toFixed(2)) : '-';
    if (parseInt(clientEffScore) >= 45) {
      scoreType = 'Good';
    } else if (parseInt(clientEffScore) >= 20 && parseInt(clientEffScore) < 45) {
      scoreType = 'Fair';
    } else if (parseInt(clientEffScore) < 20) {
      scoreType = 'Poor';
    }
    if (clientEffScore != '-') {
      clientEffScr =
        clientEffScore +
        '% (' +
        scoreType +
        ')';
    } else {
      clientEffScr = clientEffScore;
    }

    // } else {
    //   clientEffScr = `-`;
    // }
    let clientAirtimeUse = clientAttributes['Airtime-usage'] ? clientAttributes['Airtime-usage'] : `-`;
    let clientChannelNo = clientAttributes['Channel-number'] ? clientAttributes['Channel-number'] : `-`;
    let clientdsusPhyRate = ``
    if (clientAttributes['DS-phy-rate'] || clientAttributes['US-phy-rate']) {
      clientdsusPhyRate = `${this.kbpsTO(
        clientAttributes['DS-phy-rate']
      )}bps/${this.kbpsTO(clientAttributes['US-phy-rate'])}bps`;
    } else {
      clientdsusPhyRate = `-`;
    }
    let clientrxtxUsage = ``;
    if (
      clientAttributes['RX-bandwidth-usage'] ||
      clientAttributes['TX-bandwidth-usage']
    ) {
      clientrxtxUsage = `${this.kbpsTO(
        clientAttributes['RX-bandwidth-usage']
      )}bps/${this.kbpsTO(clientAttributes['TX-bandwidth-usage'])}bps`;
    } else {
      clientrxtxUsage = `-`;
    }
    let clientSNR = clientAttributes['SNR'] ? `${clientAttributes['SNR']}dB` : `-`;
    let clientFreqBand = clientAttributes['freq-band'] ? `${clientAttributes['freq-band']}GHz` : `-`;
    if (clientAttributes['client-issue-list'] && !this.isClientNodeClicked) {
      this.client_issue = '';
      for (let i = 0; i < clientAttributes['client-issue-list'].length; i++) {
        this.issueDescription(clientAttributes['client-issue-list'][i].code, 'client', '', i);
      }
    }
    let clientTechNote = clientAttributes['client-note'] ? this.client_issue : `-`;
    let EffScore = {};
    if (this.swVersion > 21.2) {
      EffScore = { columns: [{ attr: "property", text: this.language.Efficiency_Score }, { attr: "value", text: `${clientEffScr}` }] };
    }
    clientAttributes['columnDefinitions'] = [
      // each column definition needs to specify the column used
      { attr: "property", text: "", column: 0 },
      { attr: "value", text: "", column: 1 }
    ];
    let airtimeUsage = {};
    if (clientAirtimeUse != '-') {
      airtimeUsage = { columns: [{ attr: "property", text: this.language.Airtime_Usage }, { attr: "value", text: `${clientAirtimeUse}` }] };
    }
    if (clientAttributes['intf-type'] == 'WiFi') {
      clientAttributes['rgData'] = [  // the table of rgData
        { columns: [{ attr: "property", text: this.language.IP_Address }, { attr: "value", text: `${clientIpAdd}` }] },
        { columns: [{ attr: "property", text: this.language.Hostname }, { attr: "value", text: `${clientHostname}` }] },
        // { columns: [{ attr: "property", text: this.language.Software_Version }, { attr: "value", text: `${clientVersion}` }] },
        { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: `${clientMacAdd}` }] },
        { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: `${clientModel}` }] },
        { columns: [{ attr: "property", text: this.language.Manufacturer }, { attr: "value", text: `${clientManufacture}` }] },
        { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: `${clientConType}` }] },
        { columns: [{ attr: "property", text: this.language.Signal_Strength }, { attr: "value", text: `${clientSignalStrength}` }] },
        EffScore,
        airtimeUsage,
        { columns: [{ attr: "property", text: this.language.Channel_Number }, { attr: "value", text: `${clientChannelNo}` }] },
        { columns: [{ attr: "property", text: this.language.DS_US_Phy_Rate }, { attr: "value", text: `${clientdsusPhyRate}` }] },
        { columns: [{ attr: "property", text: this.language.RX_TX_BW_Usage }, { attr: "value", text: `${clientrxtxUsage}` }] },
        { columns: [{ attr: "property", text: "SNR" }, { attr: "value", text: `${clientSNR}` }] },
        { columns: [{ attr: "property", text: this.language.Frequency_Band }, { attr: "value", text: `${clientFreqBand}` }] },
        { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: `${clientTechNote}` }] },
      ];
    } else if (clientAttributes['intf-type'] == 'LAN') {
      clientAttributes['rgData'] = [  // the table of rgData
        { columns: [{ attr: "property", text: this.language.IP_Address }, { attr: "value", text: `${clientIpAdd}` }] },
        { columns: [{ attr: "property", text: this.language.Hostname }, { attr: "value", text: `${clientHostname}` }] },
        { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: `${clientMacAdd}` }] },
        { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: `${clientModel}` }] },
        { columns: [{ attr: "property", text: this.language.Manufacturer }, { attr: "value", text: `${clientManufacture}` }] },
        { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: `${clientConType}` }] },
        { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: `${clientTechNote}` }] },
      ];
    }

  }
  getAPData(apMac: any): void {
    this.searchText = '';
    this.apInformtion = '';
    // Client Devices connected with RG
    //Populate Client Devices of Rg and APS
    if (apMac.clients && apMac.clients.length > 0) {
      this.populateClientDevices(apMac.clients, apMac);
    }
  }

  getAllClientsData(apMac: any, singleClick?: any, dblClick?: any): void {
    let signalImages = {
      0: 'assets/images/no-wifi-signal.png',
      1: 'assets/images/low-wifi-signal.png',
      2: 'assets/images/all-green-wifi.png',
      3: 'assets/images/all-green-wifi.png',
    };
    this.spinner.show();
  }

  accessPoint() {
    this.clientDeviceSSID = !this.clientDeviceSSID;
    this.loadInitialDiagram(this.resValue);
  }

  enableAllCommandHandler() {
    var cmdhnd = this.APTopology.commandHandler;
    this.enable('ScrollToPart', cmdhnd.canScrollToPart());
  }

  enable(name, ok) {
    var button = document.getElementById(name);
    if (button) button['disabled'] = !ok;
  }
  zoomfunctionalities(type) {
    if (type == 'ScrollToPart') {
      this.APTopology.commandHandler.scrollToPart();
    }
  }

  searchDiagram() {
    if (this.searchText.length > 1) {
      let that = this;
      this.searchSubject.next();
      this.searchSubject.pipe(debounceTime(1000)).subscribe(() => {
        // this.APTopology.highlighteds.each(e => {e.visible = true})
        that.APTopology.focus();
        that.APTopology.startTransaction('highlight search');

        if (that.searchText) {
          var safe = that.searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          var regex = new RegExp(safe, 'i');
          var results = that.APTopology.findNodesByExample(
            { label: regex },
            { mac: regex },
            { model: regex }
          );
          that.APTopology.highlightCollection(results);
          that.APTopology.highlighteds.each((e) => {
            let parent = e.findTreeParentNode();
            if (parent) {
              visibleAllChilds(parent);
            }

            function visibleAllChilds(parent) {
              e.visible = true;
              e.expandTree();
              var hasPassedClient = false,
                hasFailedClient = false,
                hasApChild = false;

              parent.findTreeChildrenNodes().each((el) => {
                if (el.data['isPassedClient']) {
                  hasPassedClient = true;
                }
                if (el.data['isFailedClient']) {
                  hasFailedClient = true;
                }
                if (!el.data['isClient']) {
                  hasApChild = true;
                }
                el.visible = true;
                el.expandTree();
                bindButtonValues(
                  el,
                  hasPassedClient,
                  hasFailedClient,
                  hasApChild
                );
              });
              let subParent = parent.findTreeParentNode();
              bindButtonValues(
                parent,
                hasPassedClient,
                hasFailedClient,
                hasApChild
              );
              if (subParent) {
                visibleAllChilds(subParent);
              }
            }

            function bindButtonValues(
              parent,
              hasPassedClient,
              hasFailedClient,
              hasApChild
            ) {
              if (hasPassedClient) {
                that.APTopology.model.set(
                  parent.data,
                  '_othersPassedExpanded',
                  true
                );
              }
              if (hasFailedClient) {
                that.APTopology.model.set(
                  parent.data,
                  '_othersFailedExpanded',
                  true
                );
              }
              if (hasApChild) {
                that.APTopology.model.set(
                  parent.data,
                  '_primariesExpanded',
                  true
                );
              }
            }
            // e.expandTree();
          });
          if (results.count > 0)
            that.APTopology.centerRect(results.first().actualBounds);
        } else {
          // empty string only clears highlighteds collection
          that.APTopology.clearHighlighteds();
        }
        that.APTopology.commitTransaction('highlight search');
        that.searchValue.nativeElement.focus();

        setTimeout(() => {
          that.zoomfunctionalities('ScrollToPart');
        }, 100);
      });
    }
  }

  refreshClick() {
    if (this.loading == false) {
      this.searchText = '';
      this.clientArr = [];
      this.rgArr = [];
      this.nodeDataArray = [];
      this.linkDataArray = [];
      this.expandedNodes = [];
      let showConnection = document.getElementById('showConnection');
      if (showConnection) {
        showConnection['checked'] = false;
      }
      this.clientDeviceSSID = false;
      this.APTopology.clearHighlighteds();
      this.getData();
    }
  }

  changeScaleDiagram(scale, type) {
    var oldscale = this.APTopology.scale;
    if (type == 'dropDown') {
      this.APTopology.scale = scale;
    } else if (type == 'decrease') {
      this.APTopology.scale = oldscale - 0.25;
    } else if (type == 'increase') {
      this.APTopology.scale = oldscale + 0.25;
    }
    this.zoomScale = this.APTopology.scale;
    this.updateDivHeight();
  }

  setZoomScaleToFit() {
    let isScroll = false;
    let nativeDiagram: any;
    const el = this.APDiagram.nativeElement;
    this.zoomScale = 1;
    do {
      this.APTopology.scale = this.zoomScale;
      isScroll = false;
    } while (isScroll);

    this.updateDivHeight();
  }

  updateDivHeight() {
    let divElement = document.getElementById('mainDiagram');
    divElement.style.height =
      Number(this.APTopology.documentBounds.height) + 100 + 'px' || '500px';
    this.APTopology.requestUpdate();
  }

  kbpsTO(val, valueOnly?, unitOnly?) {
    let kbpsString = this.api.kbpsTO(val, valueOnly, unitOnly);
    return kbpsString;
  }
  bytesToSize(bytes: any) {
    const units = [
      'bytes',
      'Kbps',
      'Mbps',
      'Gbps',
      'Tbps',
      'Pbps',
      'Ebps',
      'Zbps',
      'Ybps',
    ];
    let l = 0,
      n = parseInt(bytes, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  scroll() {
    setTimeout(() => {
      this.issueBox.nativeElement.scrollIntoView();
    }, 100);
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }

  populateAps(apsData, json, prevElement, uplinkEthernetData) {
    var nodeFreqArr = [];
    var freqArr = [];
    if (this.isAPSNodeClicked == true) {
      this.clientArr = [];


      let clickedApsValue = this.clickedAPS['ap-issue-list'];
      this.aps_issue = '';
      this.aps_issue_length = this.clickedAPS['ap-issue-list'].length;
      let apIssue = this.clickedAPS['ap-issue-list'], mapTrSerial = [];;

      const wapFailed = apIssue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
      apIssue = apIssue.filter((obj, i) => {
        if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
          return obj;
        } else {
          mapTrSerial.push(obj?.serialNumber);
        }
      });

      for (let i = apIssue.length - 1; i >= 0; i--) {
        if (mapTrSerial.includes(apIssue[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(apIssue[i]["code"])) {
          apIssue.push({
            "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
            "subscriberId": "",
            "serialNumber": apIssue[i]["serialNumber"],
            "source": apIssue[i]["serialNumber"],
            "sourceId": apIssue[i]["serialNumber"],
            "type": "ROUTER",
            "severity": 0,
            "reason": "High Operating Temperature Observed",
            "isValid": true
          });
          apIssue.splice(i, 1);
        }
      }
      this.issueData = apIssue.filter(obj => this.issueCode.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
      this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
      this.issueList = this.issueData;
      this.totalissues = this.issueList.length;
      this.initalize();
      for (let i = 0; i < apIssue.length; i++) {
        this.issueDescription(apIssue[i]['code'], this.issueType, this.issueName, i);
      }
      if (this.isBHNodeClicked == true) {
        this.backhaul_issue = '';
        let clickedBackhaulValue = this.clickedBackhaul;
        for (let j = 0; j < clickedBackhaulValue.length; j++) {
          this.issueDescription(clickedBackhaulValue[j]['code'], this.bhissueType, this.bhissueName, j);
        }
      }
    }
    apsData.forEach((element) => {
      let rgMainAPDetails = '';
      let modelName = '';
      let manufactureName = '';
      let apsHostname = '';
      if (!element['isRg']) {
        element['category'] = 'otherNode';
      }
      if (!element.ssid) {
        element['backhaul'] = {
          // "channel":100,
          // "rx-phy-rate":915152,
          // "tx-phy-rate":478266,
          // "backhaul-color":"green",
          // "rssi":-9,
          // "rtx-packets":82171,
          // "transmit-drops":0,
          // "Avg-Wifi-score":4.98,
          // "SNR":85,
          // "Airtime-usage":0,
          // "MACAddress":"b8:94:70:29:9c:d0",
          // "Connection-type":"WiFi",
          // "SSID":"Calix-5G-backhaulFF9B55",
          // "Mode":"11ax",
          // "AccessPoint":"CXNK00FF9B55",
          "Band": "5",
          // "satPlacementRating":11,
          // "client-efficiency-score":0.3982
        }
        // element['backhaul']['Band'] = 5;
        element.ssid = "Backhaul SSID";
      }
      let apsIpAdd = element['ip'] ? `${element['ip']}` : `-`;
      //mesh name filed
      let apsName = element['name'] ? `${element['name']}` : `-`;
      let apsMacAdd = element['mac'] ? `${element['mac']}`
        : `-`;
      let apsSwVersion = element['version'] ? `${element['version']}`
        : `-`;
      let apsSerialNo = element['sn'] ? `${element['sn']}`
        : `-`;
      // let selctedModelMesh = JSON.parse(sessionStorage.getItem('calix.deviceData')).find((obj) => obj.modelName == modelName); 
      //let apsHostname = element['hostname'] ? `${element['hostname']}` : `-`;
      if (this.makemodel) {
        for (let n = 0; n < this.makemodel.length; n++) {
          if (element.sn == this.makemodel[n]['sno']) {
            element['model'] = `${this.makemodel[n]['model']}`;
            modelName = this.makemodel[n]['model'];
            let selectedMesh = JSON.parse(sessionStorage.getItem('calix.deviceData')).find((obj) => obj.modelName == modelName);
            if (selectedMesh.opModeWithOnt == 'WAP') {
              apsHostname = 'Mesh(SAT)'
            }
            manufactureName = this.makemodel[n]['manufacture'];
          }
        }
      }
      let apsModel = modelName ? modelName : `-`;
      let apsManufacture = manufactureName ? manufactureName : `-`;
      let effScore = '';
      if (element['backhaul']?.['client-efficiency-score']) {
        let clientEffScore = Number(
          (Number(element['backhaul']?.['client-efficiency-score']) * 100).toFixed(2)
        );
        effScore = `${clientEffScore}%`;
      }
      let cliEffScore = effScore ? effScore : `-`;

      // Tx Phy Rate: ${this.kbpsTO(
      //       element.backhaul['tx-phy-rate']
      //     )}bps`
      // if (element['radio-info']) {
      //   var radioInfo = element['radio-info'];
      //   let freq_band = '';
      //   if (radioInfo.length > 0) {
      //     for (let fband = 0; fband < radioInfo.length; fband++) {
      //       let fbandValue = radioInfo[fband]['freq-band'] + 'GHz';
      //       freqArr.push(fbandValue);
      //       nodeFreqArr.push(radioInfo[fband]['freq-band']);
      //     }
      //     freqArr = [...new Set(freqArr)];
      //     freq_band = freqArr.join(', ');
      //   }
      //   rgMainAPDetails += freq_band ? `\n Frequency Band: ${freq_band}` : ``;

      //   var uniq = [...new Set(nodeFreqArr)];

      //   uniq.forEach((element) => {
      //     freqBandValue = freqBandValue + element + 'GHz / ';
      //   });
      //   freqBandValue = freqBandValue.slice(0, -3);
      // }
      var freqBandValue = '';
      if (element['backhaul'] && Object.keys(element['backhaul']).length > 0) {
        freqBandValue = element['backhaul'].Band + 'GHz';

        // freqBandValue = '6GHz';
      }
      let totClient = '';
      if (element.clients) {
        for (let i = 0; i < element.clients.length; i++) {
          if (element.clients[i]['client-color'] == 'red') {
            this.isapWithIssue = true;
          }
        }
        if (this.isapWithIssue == true) {
          element['isapWithIssue'] = true;
        }
        if (element.clients.length > 0) {
          totClient = `${element.clients.length}`;
        }
      }
      let apsTotClient = totClient ? totClient : 0;
      let apsPassClients = element['passed-clients']
        ? element['passed-clients']
        : `0`;
      let apsFailClients = element['failed-clients']
        ? element['failed-clients']
        : ` 0`;
      element['columnDefinitions'] = [
        // each column definition needs to specify the column used
        { attr: "property", text: "", column: 0 },
        { attr: "value", text: "", column: 1 }
      ];
      if (element['ap-issue-list'] && !this.isAPSNodeClicked) {
        this.aps_issue = '';
        this.aps_issue_length = element['ap-issue-list'].length;
        let apIssue = element['ap-issue-list'], mapTrSerial = [];;

        const wapFailed = apIssue.filter(obj => ["GATEWAY_FAILED", "WAP_FAILED"].includes(obj?.code)).map(obj => obj.serialNumber);
        apIssue = apIssue.filter((obj, i) => {
          if (!(wapFailed.includes(obj?.serialNumber) && obj?.code == "MAP_CONNECTIVITY_FAILED")) {
            return obj;
          } else {
            mapTrSerial.push(obj?.serialNumber);
          }
        });

        for (let i = apIssue.length - 1; i >= 0; i--) {
          if (mapTrSerial.includes(apIssue[i]["serialNumber"]) && ["GATEWAY_FAILED", "WAP_FAILED"].includes(apIssue[i]["code"])) {
            apIssue.push({
              "code": "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
              "subscriberId": "",
              "serialNumber": apIssue[i]["serialNumber"],
              "source": apIssue[i]["serialNumber"],
              "sourceId": apIssue[i]["serialNumber"],
              "type": "ROUTER",
              "severity": 0,
              "reason": "High Operating Temperature Observed",
              "isValid": true
            });
            apIssue.splice(i, 1);
          }
        }
        this.issueData = apIssue.filter(obj => this.issueCode.indexOf(obj.hasOwnProperty('code') ? obj.code?.toUpperCase() : obj.Code?.toUpperCase()) > -1)
        this.issueData = this.issueData.sort((a, b) => (a.severity < b.severity) ? -1 : ((a.severity > b.severity) ? 1 : 0));
        this.issueList = this.issueData;
        this.totalissues = this.issueList.length;
        this.initalize();

        for (let i = 0; i < apIssue.length; i++) {

          this.issueDescription(apIssue[i].code, 'aps', '', i);
        }
        if (element['backhaul']?.['backhaul-issue-list']) {
          //   if(this.backhaul_issue == '') {
          this.backhaul_issue = '';
          for (let j = 0; j < element['backhaul']?.['backhaul-issue-list'].length; j++) {
            this.issueDescription(element['backhaul']?.['backhaul-issue-list'][j].code, 'backhaul', '', j);
          }
        }
      }
      // }
      let apsTechNote = element['ap-tech-note']
        ? this.aps_issue
        : `-`;
      let backhaulTechNote = element['backhaul']?.['backhaul-tech-note']
        ? this.backhaul_issue
        : `-`;
      let EffScore = {};
      if (this.swVersion > 21.2) {
        EffScore = { columns: [{ attr: "property", text: this.language.Efficiency_Score }, { attr: "value", text: `${cliEffScore}` }] };
      }
      element['rgData'] = [  // the table of rgData
        { columns: [{ attr: "property", text: this.language.IP_Address }, { attr: "value", text: `${apsIpAdd}` }] },
        { columns: [{ attr: "property", text: this.language.MAC_Address }, { attr: "value", text: `${apsMacAdd}` }] },
        //mesh name filed
        { columns: [{ attr: "property", text: this.language.Name }, { attr: "value", text: `${apsName}` }] },
        { columns: [{ attr: "property", text: this.language.Software_Version }, { attr: "value", text: `${apsSwVersion}` }] },
        { columns: [{ attr: "property", text: this.language.Serial_Number }, { attr: "value", text: `${apsSerialNo}` }] },
        { columns: [{ attr: "property", text: this.language.Device }, { attr: "value", text: `${apsHostname}` }] },
        { columns: [{ attr: "property", text: this.language.Model }, { attr: "value", text: `${apsModel}` }] },
        { columns: [{ attr: "property", text: this.language.Manufacturer }, { attr: "value", text: `${apsManufacture}` }] },
        EffScore,
        { columns: [{ attr: "property", text: this.language.Total_Clients }, { attr: "value", text: `${apsTotClient}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_without_issues_and_warnings }, { attr: "value", text: `${apsPassClients}` }] },
        { columns: [{ attr: "property", text: this.language.Devices_with_issues_and_warnings }, { attr: "value", text: `${apsFailClients}` }] },
        { columns: [{ attr: "property", text: this.language.issue }, { attr: "value", text: `${apsTechNote}` }] },
        { columns: [{ attr: "property", text: this.language.Backhaul_Issue }, { attr: "value", text: `${backhaulTechNote}` }] }
      ];

      // element['tooltip'] = rgMainAPDetails;
      // Ap Node Background color based on condition
      if (
        element['ap-color'] == 'green' &&
        element['backhaul']?.['backhaul-color'] == 'green'
      ) {
        element['color'] = this.nodeColor['green'];
        element['source'] = this.accessPointImages['green'];
      } else if (
        element['ap-color'] == 'green' ||
        element['backhaul']?.['backhaul-color'] == 'red'
      ) {
        element['color'] = this.nodeColor['green'];
        element['source'] = this.accessPointImages['green'];
      } else if (
        element['ap-color'] == 'red' ||
        element['backhaul']?.['backhaul-color'] == 'red'
      ) {
        element['color'] = this.nodeColor['red'];
        element['source'] = this.accessPointImages['red'];
      } else if (
        element['ap-color'] == 'yellow' ||
        element['backhaul']?.['backhaul-color'] == 'yellow'
      ) {
        element['color'] = '#fff17a8c';
        element['source'] = this.accessPointImages['yellow'];
      }
      if (element['ap-online'] == 'false') {
        element['color'] = this.nodeColor['red'];
      }
      element['width'] = 30;
      element['height'] = 30;
      // element['source'] = this.accessPointImages[element['ap-color']];
      element['key'] = element.mac;
      element['isAPS'] = true;
      if (element['name']) {
        element['isInternet'] = true;
      }
      element['parent-host-name'] = prevElement['mac'];
      if (element['name']) {
        if (element['hostname']) {
          element['label'] = `${element['hostname']}\n ${element['name']}`;
        } else {
          element['label'] = `${element['sn']} \n ${element['name']}`;
        }
      } else {
        if (element['hostname']) {
          element['label'] = `${element['hostname']}`;
        } else {
          element['label'] = `${element['sn']}`;
        }
      }

      let backhaul_rx_phy_rate = element.backhaul?.['rx-phy-rate']
        ? this.kbpsTO(element.backhaul?.['rx-phy-rate']) + 'bps'
        : this.kbpsTO(0) + 'bps';
      // element.backhaul['rx-phy-rate'] = backhaul_rx_phy_rate;

      let backhaul_tx_phy_rate = element.backhaul?.['tx-phy-rate']
        ? this.kbpsTO(element.backhaul?.['tx-phy-rate']) + 'bps'
        : this.kbpsTO(0) + 'bps';
      // element.backhaul['tx-phy-rate'] = backhaul_tx_phy_rate;

      if (element['int-type'] == 'WiFi' && element['backhaul']['satPlacementRating']) {
        if (element['backhaul']['satPlacementRating'] == 10) {
          element['wirelessIcon'] = this.imagesObj['wireless-excellent'];
          // element['rssi_signal_strength'] = 'Excellent';
          element['satellite_placement'] = 'Excellent';
        } else if (
          element['backhaul']['satPlacementRating'] == 11
        ) {
          element['wirelessIcon'] = this.imagesObj['wireless-good'];
          // element['rssi_signal_strength'] = 'Good';
          element['satellite_placement'] = 'Good';
        } else if (
          element['backhaul']['satPlacementRating'] == 12
        ) {
          element['wirelessIcon'] = this.imagesObj['wireless-good'];
          // No icons as of now so good's icon was used
          // element['rssi_signal_strength'] = 'Ok';
          element['satellite_placement'] = 'Ok';
        } else if (
          element['backhaul']['satPlacementRating'] == 13
        ) {
          element['wirelessIcon'] = this.imagesObj['wireless-toofar'];
          // element['rssi_signal_strength'] = 'Too Far';
          element['satellite_placement'] = 'Too Far';
        }
        // no placementrating defined for too close 

        else if (element['backhaul']['satPlacementRating'] == 0) {
          element['wirelessIcon'] = this.imagesObj['wireless-tooclose'];
          // element['rssi_signal_strength'] = 'Too Close';
          element['satellite_placement'] = 'Too Close';
        } else if (element['backhaul']['satPlacementRating'] == -1) {
          element['wirelessIcon'] = this.imagesObj['wireless-unavailable'];
          // element['rssi_signal_strength'] = 'Too Close';
          element['satellite_placement'] = 'Unknown';
        }

        if (element['backhaul']['rssi'] >= -50) {
          // element['wirelessIcon'] = this.imagesObj['wireless-green'];
          element['rssi_signal_strength'] = 'Excellent';
        } else if (
          element['backhaul']['rssi'] >= -66 &&
          element['backhaul']['rssi'] <= -51
        ) {
          // element['wirelessIcon'] = this.imagesObj['wireless-green'];
          element['rssi_signal_strength'] = 'Good';
        } else if (
          element['backhaul']['rssi'] >= -69 &&
          element['backhaul']['rssi'] <= -67
        ) {
          // element['wirelessIcon'] = this.imagesObj['wireless-orange'];
          element['rssi_signal_strength'] = 'Ok';
        } else if (
          element['backhaul']['rssi'] >= -79 &&
          element['backhaul']['rssi'] <= -70
        ) {
          // element['wirelessIcon'] = this.imagesObj['wireless-red'];
          element['rssi_signal_strength'] = 'Weak';
        } else if (element['backhaul']['rssi'] <= -80) {
          // element['wirelessIcon'] = this.imagesObj['wireless-red'];
          element['rssi_signal_strength'] = 'Very Weak';
        }

        element['ap_rssi'] = element['backhaul']['rssi'];
        element['satPlacementRating'] = element['backhaul']['satPlacementRating'];
        element['ap_rssi_signal_strength'] = element['backhaul']['rssi'];
        element['ap_backhaul_tech_note'] =
          element['backhaul']?.['backhaul-tech-note'] || '-';

        let satellitePlacement = element['satellite_placement'] ? element['satellite_placement'] : `-`;
        let rssi = element['ap_rssi'] ? element['ap_rssi'] : `-`;
        let signalStrength = element['rssi_signal_strength'] ? element['rssi_signal_strength'] : `-`;
        let issues = element['ap_backhaul_tech_note'] ? this.backhaul_issue : `-`;
        element['columnDefinitions'] = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        element['ap_rssi_tooltip'] = [  // the table of rgData
          { columns: [{ attr: "property", text: this.language.Satellite_Placement }, { attr: "value", text: `${satellitePlacement}` }] },
          { columns: [{ attr: "property", text: "RSSI" }, { attr: "value", text: `${rssi} dBm` }] },
          // { columns: [{ attr: "property", text: this.language.Signal_Strength }, { attr: "value", text: `${signalStrength}` }] },
          { columns: [{ attr: "property", text: `${this.language.issue} ${this.language.warning}` }, { attr: "value", text: `${issues}` }] }
        ];
        // element['ap_rssi_tooltip'] =
        //   'Satellite Placement : ' +
        //   element['satellite_placement'] +
        //   '\n' +
        //   'RSSI : ' +
        //   element['ap_rssi'] +
        //   ' dBm' +
        //   '\n' +
        //   'Signal Strength : ' +
        //   element['rssi_signal_strength'] +
        //   '\n' +
        //   'Issue(s) and warning(s): ' +
        //   element['ap_backhaul_tech_note'];

        // rgMainAPDetails += element['backhaul'].rssi
        //   ? `\n RSSI : ${element['backhaul'].rssi}dBm`
        //   : ``;
        // rgMainAPDetails += element['backhaul']['tx-phy-rate']
        //   ? `\n TX Phy Rate : ${this.kbpsTO(element.backhaul['tx-phy-rate'])}bps`
        //   : ``;
        // rgMainAPDetails += element['backhaul']['rx-phy-rate']
        //   ? `\n RX Phy Rate : ${this.kbpsTO(element.backhaul['rx-phy-rate'])}bps`
        //   : ``;
      }


      // var tx_rate = element.backhaul['tx-phy-rate']
      //   ? ` \n Tx Phy Rate: ${this.kbpsTO(
      //       element.backhaul['tx-phy-rate']
      //     )}bps`
      //   : `\n Tx Phy Rate: ${this.kbpsTO(0)}bps`;
      // var rx_rate = element.backhaul['rx-phy-rate']
      //   ? ` \n Rx Phy Rate: ${this.kbpsTO(
      //       element.backhaul['rx-phy-rate']
      //     )}bps`
      //   : ` \n Rx Phy Rate: ${this.kbpsTO(0)}bps`;
      // var backhaul_note = element.backhaul['backhaul-tech-note']
      //   ? ` \n Backhaul Tech Note : ${element.backhaul['backhaul-tech-note']}`
      //   : '';

      this.nodeDataArray.push(element);
      if (this.clientDeviceSSID && element['ap-online'] == 'true') {
        let backhaulColor = '#f3f3f3';
        // if(element['backhaul']['backhaul-color'] == 'green'){
        //   backhaulColor = this.nodeColor['green'];
        // } else if(element['backhaul']['backhaul-color'] == 'red') {
        //   backhaulColor = this.nodeColor['red'];
        // } else if(element['backhaul']['backhaul-color'] == 'yellow') {
        //   backhaulColor = this.nodeColor['yellow'];
        // } else {
        //   backhaulColor = '#f3f3f3';
        // }
        var ethPortLabel = 'Ethernet Port';
        if (element['eth-port']) {
          ethPortLabel = `${ethPortLabel} ${element['eth-port']}`
        }
        var channelNumber = element['Channel-number']
          ? `\n Channel: ${element['Channel-number']}`
          : '',

          // if you are changing this ssid key and ethernet's key for some purpose, then make sure you change that in all pushed and filtered array of expandedNodes array
          ssid = {
            text: `ssid`,
            key: `${prevElement.sn}-${element.ssid}`,
            accessPointId: '',
            color: backhaulColor,
            label: element.ssid,
            source: 'assets/images/Icon_Device_Wifi scaled.svg',
            freqBand: freqBandValue,
            // tooltip: `Connection Type: ${element['int-type']} \n SSID: ${element['ssid']} \n Channel: ${element.backhaul['channel']}`,
            ssidKey: '',
            isAPSSID: true,
            isConnectivityNode: true,
            category: 'otherNode'
          },
          ethernet = {
            text: `ethernet`,
            key: `ethernet-${element['eth-port']}-${prevElement.sn}`,
            accessPointId: '',
            color: '#f3f3f3',
            label: ethPortLabel,
            source: 'assets/images/ethernet.png',
            width: 17,
            height: 30,
            // tooltip: `Connection Type: ${element['int-type']}`,
            isAPSSID: true,
            isEthernet: true,
            isConnectivityNode: true,
            category: 'otherNode'
          };


        ssid['columnDefinitions'] = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        let airtimeUsage = '-';
        let airtimeInterference = '-';
        if (prevElement['radio-airtime']) {
          prevElement['radio-airtime'].forEach(el => {
            var getAirtimeBandVal = el.name.split('RadioAirtime');
            if (element?.ssid?.includes(getAirtimeBandVal[1])) {
              airtimeUsage = el.result['ChannelUtilization'];
              airtimeInterference = el.result['ChannelInterferenceTime'];
            }
          });
        }
        ssid['rgData'] = [
          { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] },
          { columns: [{ attr: "property", text: "SSID" }, { attr: "value", text: element['ssid'] }] },
          { columns: [{ attr: "property", text: this.language.Channel }, { attr: "value", text: element.backhaul?.['channel'] ? element.backhaul?.['channel'] : '-' }] },
          { columns: [{ attr: "property", text: 'Airtime Utilization' }, { attr: "value", text: airtimeUsage }] },
          { columns: [{ attr: "property", text: 'Airtime Interference' }, { attr: "value", text: airtimeInterference }] }
        ];
        ethernet['columnDefinitions'] = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        ethernet['rgData'] = [
          { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] }
        ];
        prevElement['ethernetId'] = ethernet['key'];
        prevElement['ssidId'] = ssid['key'];
        let trsRecRate;
        let linkColumn = [
          // each column definition needs to specify the column used
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        if (element && element['int-type'] == 'WiFi') {
          trsRecRate = [{ columns: [{ attr: "property", text: this.language.Transmit_rate }, { attr: "value", text: backhaul_tx_phy_rate }] },
          { columns: [{ attr: "property", text: this.language.Receive_rate }, { attr: "value", text: backhaul_rx_phy_rate }] }];
        } else {
          trsRecRate = [{ columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] },
          ];
        }
        if (element['int-type'] == 'WiFi') {
          if (element.ssid) {
            let isSSIDExists = this.nodeDataArray.find(
              (el) => el.key == ssid.key
            );

            if (!isSSIDExists) {
              this.nodeDataArray.push(ssid);
              ssid['ssidKey'] = element.ssid;
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == prevElement['mac'] && el.to == ssid.key
            )
          ) {
            let linkColumn = [
              // each column definition needs to specify the column used
              { attr: "property", text: "", column: 0 },
              { attr: "value", text: "", column: 1 }
            ];
            let linkValue = [
              { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] },
              { columns: [{ attr: "property", text: "SSID" }, { attr: "value", text: element['ssid'] }] },
              { columns: [{ attr: "property", text: this.language.Band }, { attr: "value", text: `${element['backhaul']['Band']}GHz` }] },
              { columns: [{ attr: "property", text: this.language.Mode }, { attr: "value", text: element['backhaul']['Mode'] }] }
            ];
            if (element.ssid) {
              this.linkDataArray.push({
                from: prevElement['mac'],
                to: ssid.key,
                color:
                  element['ap-online'] == 'true'
                    ? this.nodeLinkColor['green']
                    : this.nodeLinkColor['red'],
                thick: 2,
                routing: go.Link.Normal,
                linkColumn: linkColumn,
                linkText: linkValue,
              });
            }
          }
          if (element.ssid) {
            this.linkDataArray.push({
              from: ssid.key,
              to: element.mac,
              color:
                element['ap-online'] == 'true'
                  ? this.nodeLinkColor['green']
                  : this.nodeLinkColor['red'],
              thick: 2,
              routing: go.Link.Normal,
              linkColumn: linkColumn,
              linkText: trsRecRate,
            });
          } else {
            this.linkDataArray.push({
              from: prevElement['mac'],
              to: element.mac,
              color:
                element['ap-online'] == 'true'
                  ? this.nodeLinkColor['green']
                  : this.nodeLinkColor['red'],
              thick: 2,
              routing: go.Link.Normal,
              name: ``,
            });
          }
        } else if (
          element['int-type'] === 'eth' ||
          element['int-type'] == 'LAN'
        ) {
          if (element['int-type']) {
            let isSSIDExists = this.nodeDataArray.find(
              (el) => el.key == ethernet.key
            );
            if (!isSSIDExists) {
              this.nodeDataArray.push(ethernet);
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == prevElement['mac'] && el.to == ethernet.key
            )
          ) {
            this.linkDataArray.push({
              from: prevElement['mac'],
              to: ethernet.key,
              color:
                element['ap-online'] == 'true'
                  ? this.nodeLinkColor['green']
                  : this.nodeLinkColor['red'],
              thick: 2,
              routing: go.Link.Normal,
              linkColumn: linkColumn,
              linkText: [{ columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] }],
              // name: `Connection Type: ${element['int-type']}`,
            });
          }

          this.linkDataArray.push({
            from: ethernet.key,
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            linkColumn: linkColumn,
            linkText: trsRecRate,
          });
        } else {
          this.linkDataArray.push({
            from: prevElement['mac'],
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: ``,
          });
        }
      } else {
        let linkColumn = [
          // each column definition needs to specify the column used
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        if (element['ap-online'] == 'false' && this.clientDeviceSSID) {
          element['offlineAP'] = true;
        }
        if (element['int-type'] === 'eth' || element['int-type'] === 'LAN') {
          let color = 'black';
          // uplinkEthernetData['key'] = `ethernet-${prevElement.sn}`;
          // this.nodeDataArray.push(uplinkEthernetData);
          // this.linkDataArray.push({
          //   from: prevElement['mac'],
          //   to: uplinkEthernetData.key,
          //   color:
          //     element['ap-online'] == 'true'
          //       ? this.nodeLinkColor['green']
          //       : this.nodeLinkColor['red'],
          //   thick: 2,
          //   routing: go.Link.Normal,
          //   name: `${prevElement['hostname']} to Ethernet`,
          // });
          // this.linkDataArray.push({
          //   from: uplinkEthernetData.key,
          //   to: element.mac,
          //   color:
          //     element['ap-online'] == 'true'
          //       ? this.nodeLinkColor['green']
          //       : this.nodeLinkColor['red'],
          //   thick: 2,
          //   routing: go.Link.Normal,
          //   name: `Ethernet to ${element.hostname}`,
          // });
          this.linkDataArray.push({
            from: prevElement['mac'],
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            linkColumn: linkColumn,
            linkText: [{ columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] }],
            // name: `Connection Type: ${element['int-type']}`,
          });
        } else {
          let trsRecRate;
          if (element && element['int-type'] == 'WiFi') {
            trsRecRate = [{ columns: [{ attr: "property", text: this.language.Transmit_rate }, { attr: "value", text: backhaul_tx_phy_rate }] },
            { columns: [{ attr: "property", text: this.language.Receive_rate }, { attr: "value", text: backhaul_rx_phy_rate }] }];
          } else if (element && element['int-type'] == 'LAN') {
            trsRecRate = [{ columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['int-type'] }] },
            ];
          } else {
            trsRecRate = ``;
          }
          if (element['ap-online'] == 'false') {
            trsRecRate = ``;
          }
          this.linkDataArray.push({
            from: prevElement['mac'],
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            linkColumn: linkColumn,
            linkText: trsRecRate,
          });
        }
      }

      // Check for child node
      if (Array.isArray(element.aps) && element.aps.length > 0) {
        this.populateAps(element.aps, json, element, uplinkEthernetData);
      }
    });
  }

  populateClientDevices(clientDevices, parentNode) {
    clientDevices.sort(function (a, b) {
      if (a.hostname?.toLowerCase() < b.hostname?.toLowerCase()) { return -1; }
      if (a.hostname?.toLowerCase() > b.hostname?.toLowerCase()) { return 1; }
      return 0;
    })
    var freqBandPassedArr = [];
    var freqBandFailedArr = [];
    if (this.isClientNodeClicked == true) {
      this.clientArr = [];
      this.client_issue = '';
      let clickedClientValue = this.clickedClient['client-issue-list'];
      for (let i = 0; i < clickedClientValue.length; i++) {
        this.issueDescription(clickedClientValue[i]['code'], this.issueType, this.issueName, i);
      }
    }
    clientDevices.forEach((element) => {
      this.clientNodeDetails(element);
      element['key'] = element.mac;
      element['category'] = 'otherNode';
      element['parent-host-name'] = parentNode['key'];
      var signalStatus = element['signal-strength-test-result'];
      var legacyStatus = element['legacy-device-test-result'];
      var phyRateTestResult = element['phy-rate-test-result'];
      // let linkDetails = '';
      let clientLinkstrength = element['signal-strength'] ? `${element['signal-strength']} dBm` : `-`;
      let clientWifiMode = element['wifi-mode'] ? element['wifi-mode'] : `-`;
      let dsPhyRate = ``;
      if (element['DS-phy-rate']) {
        dsPhyRate = this.kbpsTO(element['DS-phy-rate']) + 'bps';
      } else {
        dsPhyRate = this.kbpsTO(0) + 'bps';
      }
      let usPhyRate = ``;
      if (element['US-phy-rate']) {
        usPhyRate = this.kbpsTO(element['US-phy-rate']) + 'bps';
      } else {
        usPhyRate = this.kbpsTO(0) + 'bps';
      }
      let clientFreBnd = element['freq-band'] ? `${element['freq-band']}GHz` : `-`;
      if (element['intf-type'] == 'WiFi') {
        let clientType = element['ssid'] ? element['ssid'] : `-`;
      }
      let clientConType = element['intf-type'] ? element['intf-type'] : `-`;
      // var eachLine = linkDetails.split('\n');
      // if (eachLine.length - 1 == 1) {
      //   linkDetails += `\n`;
      // }
      let clientHostname = '';
      if (element.hostname) {
        clientHostname = element.hostname;
      } else {
        clientHostname = element['mac'];
      }
      let linkColumn = [
        { attr: "property", text: "", column: 0 },
        { attr: "value", text: "", column: 1 }
      ];
      let linkDetails = [
        { columns: [{ attr: "property", text: "RSSI" }, { attr: "value", text: clientLinkstrength }] },
        { columns: [{ attr: "property", text: this.language.Mode }, { attr: "value", text: clientWifiMode }] },
        { columns: [{ attr: "property", text: this.language.DS_PHY_Rate }, { attr: "value", text: dsPhyRate }] },
        { columns: [{ attr: "property", text: this.language.US_PHY_Rate }, { attr: "value", text: usPhyRate }] },
        { columns: [{ attr: "property", text: this.language.Band }, { attr: "value", text: clientFreBnd }] },
        { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: clientConType }] },
      ];
      let linkConType = [
        { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['intf-type'] }] },
      ];
      // linkDetails = linkDetails.replace(/[^\x20-\x7E]/gmi, "");
      element['label'] = clientHostname;
      // element['tooltip'] = this.clientDetails;
      element['width'] = 30;
      element['height'] = 30;
      element['model'] = element['fingerprint-model'];
      let clientLinkColor = '';
      if (element['client-color'] == 'red') {
        element['color'] = this.nodeColor.red;
        clientLinkColor = this.nodeLinkColor.red;
      } else if (element['client-color'] == 'green') {
        element['color'] = this.nodeColor.green;
        clientLinkColor = this.nodeLinkColor.green;
      } else if (element['client-color'] == 'yellow') {
        element['color'] = this.nodeColor.yellow;
        clientLinkColor = this.nodeLinkColor.yellow;
      } else {
        element['color'] = '#f3f3f3';
      }
      // if (
      //   signalStatus == 'PASS' &&
      //   legacyStatus == 'PASS' &&
      //   phyRateTestResult == 'PASS'
      // ) {
      //   element['color'] = this.nodeColor.green;
      // } else {
      //   element['color'] = this.nodeColor.red;
      // }

      //source image for clients
      if (
        element['client-type'] != 30 &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(element['client-type'])
      ) {
        element['source'] = this.clientDevicesImages[element['client-type']];
      } else if (element['client-type'] == 30) {
        element['source'] = this.clientDevicesImages[12];
      } else {
        element['source'] = this.clientDevicesImages[13];
      }
      this.nodeDataArray.push(element);
      var withoutSSID = {};
      if (
        signalStatus == 'PASS' &&
        legacyStatus == 'PASS' &&
        phyRateTestResult == 'PASS' && element['client-color'] != 'red' && !element['client-note'].includes('Low efficiency score observed')
      ) {
        element['isPassedClient'] = true;
        withoutSSID = {
          from: parentNode.key,
          to: element.key,
          color: clientLinkColor,
          thick: 2,
          routing: go.Link.Normal,
          linkColumn: linkColumn,
          linkText:
            element['intf-type'] != 'WiFi'
              ? linkConType
              : linkDetails,
        };
      } else {
        element['isFailedClient'] = true;
        withoutSSID = {
          from: parentNode.key,
          to: element.key,
          color: clientLinkColor,
          thick: 2,
          routing: go.Link.Normal,
          linkColumn: linkColumn,
          linkText:
            element['intf-type'] != 'WiFi'
              ? linkConType
              : linkDetails,
        };
      }
      if (this.clientDeviceSSID) {
        element['isSSIDClient'] = true;
        var ethPortLabel = 'Ethernet Port';
        if (element['eth-port']) {
          ethPortLabel = `${ethPortLabel} ${element['eth-port']}`
        }
        var channelNumber = element['Channel-number']
          ? `${element['Channel-number']}`
          : '',
          // if you are changing this ssid key and ethernet's key for some purpose, then make sure you change that in all pushed and filtered array of expandedNodes array
          ssid = {
            text: `ssid`,
            // change ssid to parents ssidId if ssid is same as parent ssid only
            key: `${parentNode.sn}-${element.ssid}-${element['freq-band']}-client`,
            accessPointId: '',
            color: '#f3f3f3',
            label: element.ssid,
            source: 'assets/images/Icon_Device_Wifi scaled.svg',
            freqBand: `${element['freq-band']}GHz`,
            // tooltip: `Connection Type: ${element['intf-type']} \n SSID: ${element['ssid']} ${channelNumber}`,
            ssidKey: '',
            isClient: true,
            isSSID: true,
            isConnectivityNode: true,
            category: 'otherNode'
          },
          ethernet = {
            text: `ethernet`,
            // key: `ethernet-${parentNode.sn}-client`,
            key: `ethernet-${element['eth-port']}-${parentNode.sn}`,
            // key: `${parentNode['ethernetId']}`,
            accessPointId: '',
            color: '#f3f3f3',
            label: ethPortLabel,
            source: 'assets/images/ethernet.png',
            width: 17,
            height: 30,
            // tooltip: `Connection Type: ${element['intf-type']}`,
            isClient: true,
            isSSID: true,
            isEthernet: true,
            isConnectivityNode: true,
            category: 'otherNode'
          };
        ssid['columnDefinitions'] = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        let airtimeUsage = '-';
        let airtimeInterference = '-';
        parentNode['radio-airtime'].forEach(el => {
          var getAirtimeBandVal = el.name.split('RadioAirtime');
          if (element.Connection?.includes(getAirtimeBandVal[1])) {
            airtimeUsage = el.result['ChannelUtilization'];
            airtimeInterference = el.result['ChannelInterferenceTime'];
          }
        });
        ssid['rgData'] = [
          { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['intf-type'] }] },
          { columns: [{ attr: "property", text: "SSID" }, { attr: "value", text: element['ssid'] }] },
          { columns: [{ attr: "property", text: this.language.Channel }, { attr: "value", text: channelNumber }] },
          { columns: [{ attr: "property", text: 'Airtime Utilization' }, { attr: "value", text: airtimeUsage }] },
          { columns: [{ attr: "property", text: 'Airtime Interference' }, { attr: "value", text: airtimeInterference }] }
        ];
        ethernet['columnDefinitions'] = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        ethernet['rgData'] = [
          { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['intf-type'] }] }
        ];
        // if (element['isPassedClient']) {
        //   ssid['isPassedClient'] = true;
        //   ethernet['isPassedClient'] = true;
        //   ssid['key'] = ssid['key'] + 'isPassedClient';
        //   ethernet['key'] = ethernet['key'] + 'isPassedClient';
        // } else {
        //   ssid['isFailedClient'] = true;
        //   ethernet['isFailedClient'] = true;
        //   ssid['key'] = ssid['key'] + 'isFailedClient';
        //   ethernet['key'] = ethernet['key'] + 'isFailedClient';
        // }
        let linkColumn = [
          { attr: "property", text: "", column: 0 },
          { attr: "value", text: "", column: 1 }
        ];
        if (element['intf-type'] == 'WiFi') {
          // let freqBandValue = '';
          // var uniq = [];
          // if (element['isPassedClient']) {
          //   freqBandPassedArr.push(element['freq-band']);
          //   uniq = [...new Set(freqBandPassedArr)];
          // } else {
          //   freqBandFailedArr.push(element['freq-band']);
          //   uniq = [...new Set(freqBandFailedArr)];
          // }
          // uniq.forEach((element) => {
          //   freqBandValue = freqBandValue + element + 'GHz / ';
          // });
          // freqBandValue = freqBandValue.slice(0, -3);
          // ssid['freqBand'] = freqBandValue;

          if (element.ssid) {
            var isSSIDExist = this.nodeDataArray.find(
              (el) => el.key == ssid.key && !el['isAPSSID']
            );
            if (!isSSIDExist) {
              this.nodeDataArray.push(ssid);
              ssid['ssidKey'] = element.ssid;
            } else {
              // isSSIDExist['freqBand'] = element['freq-band'];
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == parentNode.key && el.to == ssid.key
            )
          ) {
            let linkText = [
              { columns: [{ attr: "property", text: this.language.Connection_Type }, { attr: "value", text: element['intf-type'] }] },
              { columns: [{ attr: "property", text: "SSID" }, { attr: "value", text: element['ssid'] }] },
              { columns: [{ attr: "property", text: this.language.Band }, { attr: "value", text: `${element['freq-band']}GHz` }] },
              { columns: [{ attr: "property", text: this.language.Mode }, { attr: "value", text: element['wifi-mode'] }] }
            ];
            this.linkDataArray.push({
              from: parentNode.key,
              to: ssid.key,
              color: clientLinkColor,
              thick: 2,
              routing: go.Link.Normal,
              linkColumn: linkColumn,
              linkText: linkText,
            });
          }

          this.linkDataArray.push({
            from: ssid.key,
            to: element.key,
            color: clientLinkColor,
            thick: 2,
            routing: go.Link.Normal,
            linkColumn: linkColumn,
            linkText: linkDetails,
          });
        } else if (
          element['intf-type'] === 'eth' ||
          element['intf-type'] == 'LAN'
        ) {
          if (element['intf-type']) {
            if (
              !this.nodeDataArray.find(
                (el) => el.key == ethernet.key && !el['isAPSSID']
              )
            ) {
              this.nodeDataArray.push(ethernet);
            }
          }

          if (
            !this.linkDataArray.find(
              (el) => el.from == parentNode.key && el.to == ethernet.key
            )
          ) {
            this.linkDataArray.push({
              from: parentNode.key,
              to: ethernet.key,
              color: clientLinkColor,
              thick: 2,
              routing: go.Link.Normal,
              linkColumn: linkColumn,
              linkText: ethernet['rgData'],
            });
          }

          this.linkDataArray.push({
            from: ethernet.key,
            to: element.key,
            color: clientLinkColor,
            thick: 2,
            routing: go.Link.Normal,
            linkColumn: linkColumn,
            linkText: ethernet['rgData'],
          });
        }
      } else {
        if (
          signalStatus == 'PASS' &&
          legacyStatus == 'PASS' &&
          phyRateTestResult == 'PASS' && element['client-color'] != 'red' && !element['client-note'].includes('Low efficiency score observed')
        ) {
          element['isPassedClient'] = true;
        } else {
          element['isFailedClient'] = true;
        }
        element['isClient'] = true;
        this.linkDataArray.push(withoutSSID);
      }
    });
  }

  startISODate(startDate: any, enddata: boolean) {

    if (startDate == undefined)
      return undefined;
    let date = new Date(startDate);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let stdate;
    if (enddata)
      stdate = `${year}-${month}-${day}T23:59:00Z`;
    else
      stdate = `${year}-${month}-${day}T00:00:00Z`;
    // let d = new Date(stdate)
    // return d.getTime();
    return stdate;
  }
  // alignTooltip(text) {
  //   var preElement = document.createElement("PRE");
  //   var t = document.createTextNode(text);
  //   preElement.appendChild(t);
  //   var arr = preElement.innerText.split('\n');
  //   for (var i = 0, l = arr.length; i < l; i++) {
  //     if (arr[i].indexOf(':') > -1) {
  //       var pieces = arr[i].split(':');
  //       arr[i] = "<span class='tooltip-left'>" + pieces[0] + "</span>: " + pieces[1];
  //     }
  //   }

  //   preElement.innerText = arr.join("\n");
  //   var maxWidth = Math.max.apply(null, $('.tooltip-left').map(function () {
  //     return $(this).outerWidth(true);
  //   }).get());
  //   $('.tooltip-left').css('width', maxWidth + 15);
  // }
  initalize() {
    for (let i = 0; i < this.totalissues; i++) {
      this.isIconClicked[i] = false;
      this.primaryActionButton[i] = false;
      this.Description[i] = " ";
      this.reason[i] = " ";
      this.severity[i] = " ";
    }

  }
  ngOnDestroy() {
    if (this.commandIQDataSubs) this.commandIQDataSubs.unsubscribe();
    if (this.qoeSubscribed) this.qoeSubscribed.unsubscribe();
  }

  qoeCheck() {
    let scopes = this.ssoAuthService.getScopes();
    let validScopes: any = Object.keys(scopes);
    this.scope.qoeRead = false;
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.qoe'] = scopes['cloud.rbac.csc.qoe'] ? scopes['cloud.rbac.csc.qoe'] : [];

      if (scopes && (scopes['cloud.rbac.csc.qoe'] && scopes['cloud.rbac.csc.qoe'].length)) {
        if (scopes['cloud.rbac.csc.qoe'].indexOf('read') !== -1) this.scope.qoeRead = true;
      }
    } else {
      this.scope.qoeRead = true;
    }

    // let onboarded = sessionStorage.getItem('calix.routerOnboard') == 'true' ? true : false;
    let modelName = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData"))[0].modelName : '';
    let fduser = sessionStorage.getItem('calix.userFdUser') == 'true' ? true : false;
    if (this.ssoAuthService.acceptGSModel(modelName)) {
      this.showQoeTab = this.ssoAuthService.exosVersionCheck('21.4') && this.scope.qoeRead;
      return sessionStorage.getItem('qoeCheck');
    }
    else {
      this.showQoeTab = this.scope.qoeRead;
      return sessionStorage.getItem('qoeCheck');
    }
  }
}
