import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import * as Highcharts from "highcharts";
require('highcharts/highcharts-more.js')(Highcharts);
import { DataTableDirective } from 'angular-datatables';
import { healthWebsocketService } from '../service/health-realtime-websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Subject, Subscription } from 'rxjs'
import { NfainventoryService } from '../service/nfainventory.service';
import { StreamChartComponent } from 'src/app/cco/traffic/shared/stream-chart/stream-chart.component';
import { ConvertorService } from 'src/app/shared/services/convertor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HealthService } from '../../service/health.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit, OnDestroy {

  language;
  languageSubject;
  frTable: any;
  showChart: any = false;
  showChart1: any = false;
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    lengthMenu: [5],
    pageLength: 5,
    ordering: false,
    retrieve: true,
    paging: false,
    info: false,
  };

  up = 'Up';
  down = 'Down'

  fsView: boolean = false;
  fsChartDetails: any = '';
  errorMessage = "";
  pageAvailable: boolean = false;
  applyRebuild: boolean = false;
  Highcharts = Highcharts;
  rate: string = '';
  packet: string = '';
  windowLen: any = 5;
  ddoptions = [
    { id: 1, name: '5 minutes' },
    { id: 2, name: '10 minutes' }
  ];
  selectedOption: number = 1;
  selectedTime: number = 1;
  orgId: any;
  orgid_tenantid: any;
  rtSubscription: Subscription;
  ratePacketStreamSubscription: Subscription;
  showRealTime: boolean = true;
  loading: boolean = true;
  data: any = {
    maxRate: [],
    packet: []
  };
  rateUnit = 'bps';
  packetUnit = 'pps';
  cachePacketData: any = {};
  cacheRateData: any = {};
  healthNetWSRequestObj = {
    "orgId": '',
    "monitorType": "NET",
    "networkId": '',
    "monitorId": '',
    "graphType": "TRF,TPP",
    "region": "",
    "location": "",
    "regionUuid": "",
    "locationUuid": "",
  }
  regionSelected: any;
  regionsDataArray = ["All"];
  locationSelected: any;
  locationDataArray = ["All"];
  systemSelected: any
  systemDataArray = ["All"]

  regionName: any;
  locationName: any;
  systemName: any;
  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;
  TPPOverallData = {
    UpStream: [],
    DownStream: []
  };
  TPPUpStreamData: any = [];
  TPPDownStreamData: any = [];
  topLengths = [
    {
      name: 'Top 5 PON Ports',
      value: 5
    },
    {
      name: 'Top 10 PON Ports',
      value: 10
    },
    {
      name: 'Top 20 PON Ports',
      value: 20
    },
    {
      name: 'Top 30 PON Ports',
      value: 30
    },
  ];
  fsName: any;
  selectedTopLength = 5;
  TPPStreamData = [];
  currentEventName: string;
  selectedRegion: any;
  selectedLocation: any;
  selectedSystem: any;
  cacheDataSubscription: any;
  systemRealtimeChartData = [];
  isRebuild = false;
  @ViewChildren(StreamChartComponent) streamChild: QueryList<StreamChartComponent>;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  ponPortsChartList: any = [];
  errorEventName = "error_ipfix_NET";
  hasScopeAccess = false;

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService,
    private webSocketService: WebsocketService,
    private NfaService: NfainventoryService,
    private chRef: ChangeDetectorRef,
    public convertor: ConvertorService,
    private dialogService: NgbModal,
    private router: Router,
    private titleService: Title,
    private healthService: HealthService,
    private httpClient: HttpClient,
    private commonOrgService: CommonService,) {
    this.frTable = this.translateService.fr;
  }

  ngOnInit() {
    // this.webSocketService.getUnSignedUrl().subscribe((res: any) => {
    //   this.webSocketService.Checkconnectornot(res.signedurl);
    // });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['PON']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Real Time']} - ${this.language['PON']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let that = this;
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        let monitorType = that.webSocketService.getHealthMonitorType();
        let filterData = that.webSocketService.getHealthCurrentMonitorInfo(monitorType);
        if (filterData) {
          if (filterData && filterData['monitorId']) {
            let params = {
              "orgId": filterData.orgId,
              "monitorType": filterData['monitorType'],
              "networkId": filterData['networkId'],
              "monitorId": filterData['monitorId'],
              "graphType": "TRF",
              "replay": "true",
              "region": filterData['region'],
              "location": filterData['location'],
              "startTime": filterData['startTime'],
              "endTime": (new Date()).getTime(),
              "regionUuid": filterData['regionUuid'],
              "locationUuid": filterData['locationUuid'],
            };
            if (filterData.monitorType == 'SYS') {
              params["system"] = filterData['system'];
              params["systemUuid"] = filterData['systemUuid'];
            }
            that.send(that.currentEventName, params);
          }
          that.webSocketService.healthListen('IPFIX_REPLAY');
        }
      }
    });

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      if (scopes['cloud.rbac.coc.health.pon.realtime']) {
        this.hasScopeAccess = true;
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.webSocketConnectionError();
    this.calculateSubscriptiontime();
    if (this.healthService.isReport && (this.healthService.previousUrl.includes("/uplink") || this.healthService.previousUrl.includes("/ont"))) {
      this.router.navigate(['/cco/health/pon-utilization/overview/basic']);
      return;
    } else {
      this.healthService.isReport = false;
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.up = this.language.Up;
      this.down = this.language.Down
      setTimeout(() => {
        this.reDraw();
      }, 200);
    });

    this.showModalInfo();
    this.tableLanguageOptions();
    this.chRef.detectChanges();

    // this.webSocketService.delay$.subscribe((res: any) => {
    //   if (res) {
    //     this.loading = false;
    //   }
    // })

    this.dtTrigger.next();
    this.dtTrigger1.next();
    this.getRtData();
    this.orgId = this.sso.getOrgId()
    this.orgid_tenantid = this.orgId + '_' + '0';
    this.currentEventName = 'IPFIX_NET';

    this.regionsApiLoader();
    this.healthNetWSRequestObj.orgId = this.orgId;
    this.healthNetWSRequestObj.networkId = this.orgid_tenantid;
    this.healthNetWSRequestObj.monitorId = this.orgid_tenantid;

    // console.log("getPonportsInfo", this.webSocketService.getPonportsInfo());

    let ponList = this.webSocketService.getPonportsInfo();
    if (ponList.length > 0) {
      this.ponPortsChartList = Object.assign([], ponList);
    }

    let monitorType = this.webSocketService.getHealthMonitorType();
    if (monitorType && this.webSocketService.getHealthCurrentMonitorInfo(monitorType)) {
      let filterData = this.webSocketService.getHealthCurrentMonitorInfo(monitorType);

      if (filterData && filterData['monitorId']) {
        let params = {
          "orgId": filterData.orgId,
          "monitorType": filterData['monitorType'],
          "networkId": filterData['networkId'],
          "monitorId": filterData['monitorId'],
          "graphType": "TRF",
          "replay": "true",
          "region": filterData['region'],
          "location": filterData['location'],
          "startTime": filterData['startTime'],
          "endTime": (new Date()).getTime(),
          "regionUuid": filterData['regionUuid'],
          "locationUuid": filterData['locationUuid'],
        };

        if (filterData.monitorType == 'REG') {
          this.currentEventName = 'IPFIX_REG';
        }
        if (filterData.monitorType == 'LOC') {
          this.currentEventName = 'IPFIX_LOC';
        }
        if (filterData.monitorType == 'SYS') {
          this.currentEventName = 'IPFIX_SYS';
          params["system"] = filterData['system'];
          params["systemUuid"] = filterData['systemUuid'];
        }

        let filterValues = this.webSocketService.getFilterValues();
        if (filterValues) {
          this.selectedOption = filterValues["selectedOption"];
          this.selectedTime = this.selectedOption;
          this.regionName = filterValues["regionName"];
          this.regionSelected = filterValues["regionId"];
          if (filterValues["regionId"]) {
            this.loadLocationValue('');
            setTimeout(() => {
              this.locationName = filterValues["locationName"];
              this.locationSelected = filterValues["locationId"];
              if (filterValues["regionId"] && filterValues["locationId"]) {
                this.loadSystemValue('');
                setTimeout(() => {
                  this.systemName = filterValues["SYS"];
                  this.systemSelected = filterValues["systemId"];
                  if (!filterValues["systemId"]) {
                    this.systemSelected = "All"
                  }
                }, 500)
              } else {
                this.locationSelected = "All";
              }
            }, 500)
          }
          else {
            this.regionSelected = "All"
          }
        }
        this.errorEventName = "error"
        this.currentEventName.split("_").forEach(element => {
          if (element === "IPFIX") {
            this.errorEventName = this.errorEventName + '_' + element.toLowerCase();
          } else {
            this.errorEventName = this.errorEventName + '_' + element
          }
        })

        this.webSocketService.healthListen(this.currentEventName);
        this.webSocketService.healthListen(this.errorEventName);
        this.selectedOption = this.selectedOption ? this.selectedOption : 1;
        this.selectedTime = this.selectedTime ? this.selectedTime : 1;
        this.send(this.currentEventName, params);
        this.webSocketService.healthListen('IPFIX_REPLAY');
        this.webSocketService.setHealthMonitorType(this.currentEventName.split("_").pop());
        return;
      }
    } else {
      this.webSocketService.connectWS$.subscribe((res: any) => {
        if (res && !this.webSocketService.WebSocketServer.hasDisconnectedOnce) {
          this.send('remove', 'IPFIX_NET');
          this.webSocketService.healthListen(this.currentEventName);
          this.webSocketService.healthListen('error_ipfix_NET');
          this.send(this.currentEventName, this.healthNetWSRequestObj);
        }
      });
      // this.send('remove', 'IPFIX_NET');
      this.webSocketService.setHealthMonitorType("NET");
    }
    setTimeout(() => {
      this.webSocketService.setHealthWindowLen(this.selectedOption);
    }, 500)
    this.webSocketService.setFilterValues(this.selectedTime, this.selectedOption, "selectedTime", "selectedOption");
    this.reConnectWebSocket();
  }

  send(eventname, data) {
    this.webSocketService.healthEmit(eventname, data);
  }


  applyFilter() {
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }

    const previousMonitorType = this.webSocketService.getHealthMonitorType();
    const previousMonitorInfo = { ...this.webSocketService.healthConnectionTypes[previousMonitorType] }

    this.selectedTime = this.selectedOption;
    let ponPortList = this.ponPortsChartList.filter((element) => {
      if (this.systemSelected && this.systemSelected !== 'All') {
        return element.region === this.regionName && element.location === this.locationName && element.system === this.systemName;
      } else if (this.locationSelected && this.locationSelected !== 'All') {
        return element.region === this.regionName && element.location === this.locationName;
      } else if (this.regionSelected && this.regionSelected !== 'All') {
        return element.region === this.regionName;
      }
    })
    this.ponPortsChartList = [];
    this.webSocketService.ponPortsList = [];
    if (this.ponPortsChartList.length > 0) {
      this.send('remove', 'IPFIX_PORT');
    }

    setTimeout(() => {
      this.ponPortsChartList = Object.assign([], ponPortList)
    }, 500)

    let system = '';
    this.currentEventName = 'IPFIX_NET';
    if (this.systemSelected !== 'All') {
      system = this.systemSelected;
    }
    this.healthNetWSRequestObj.region = '';
    this.healthNetWSRequestObj.location = '';
    this.healthNetWSRequestObj['system'] = '';
    this.healthNetWSRequestObj.regionUuid = '';
    this.healthNetWSRequestObj.locationUuid = '';
    this.healthNetWSRequestObj['systemUuid'] = '';
    this.healthNetWSRequestObj.monitorType = "NET";
    this.healthNetWSRequestObj.monitorId = this.orgid_tenantid;
    this.webSocketService.setFilterValues(this.selectedTime, this.selectedOption, "selectedTime", "selectedOption");

    if (this.regionSelected && this.regionSelected !== 'All') {
      // this.loading = true;
      this.healthNetWSRequestObj.region = this.regionName ? this.regionName : '';
      this.healthNetWSRequestObj.regionUuid = this.regionSelected ?? '';
      this.webSocketService.setFilterValues(this.regionName, this.regionSelected, "regionName", "regionId")
      this.healthNetWSRequestObj.monitorType = "REG";
      this.healthNetWSRequestObj.monitorId = this.regionName;
      this.currentEventName = "IPFIX_REG";
    } else {
      this.webSocketService.deleteFilterValues('regionName', 'regionId');
    }
    if (this.locationSelected && this.locationSelected !== 'All') {
      // this.loading = true;
      this.healthNetWSRequestObj.location = this.locationName ? this.locationName : '';
      this.healthNetWSRequestObj.locationUuid = this.locationSelected ?? '';
      this.webSocketService.setFilterValues(this.locationName, this.locationSelected, "locationName", "locationId")
      this.healthNetWSRequestObj.monitorType = "LOC";
      this.healthNetWSRequestObj.monitorId = this.locationName;
      this.currentEventName = "IPFIX_LOC";
    } else {
      this.webSocketService.deleteFilterValues('locationName', 'locationId');
    }
    if (this.systemSelected && this.systemSelected !== 'All') {
      // this.loading = true;
      this.healthNetWSRequestObj.monitorType = "SYS";
      this.healthNetWSRequestObj.monitorId = this.systemName; //"device@cc:be:59:18:fa:3f";
      this.healthNetWSRequestObj['system'] = this.systemName; //"device@cc:be:59:18:fa:3f";
      this.healthNetWSRequestObj['systemUuid'] = this.systemSelected ?? '';
      this.webSocketService.setFilterValues(this.systemName, this.systemSelected, "systemName", "systemId")
      this.currentEventName = "IPFIX_SYS";
    } else {
      this.webSocketService.deleteFilterValues('systemName', 'systemId');
    }

    if (typeof previousMonitorType == "undefined") {
      this.webSocketService.setHealthMonitorType(this.healthNetWSRequestObj.monitorType)
      this.send(this.currentEventName, this.healthNetWSRequestObj);
    }
    if ((previousMonitorType !== this.healthNetWSRequestObj.monitorType)
      || (previousMonitorType === this.healthNetWSRequestObj.monitorType
        && previousMonitorInfo['monitorId'] !== this.healthNetWSRequestObj.monitorId)
      || !this.isSameFilters(this.healthNetWSRequestObj, previousMonitorInfo)) {
      if (this.webSocketService.getHealthMonitorType()) {
        this.send('remove', 'IPFIX_' + this.webSocketService.getHealthMonitorType());
      }
      this.webSocketService.setHealthMonitorType(this.healthNetWSRequestObj.monitorType);
      this.send(this.currentEventName, this.healthNetWSRequestObj)
    }
    else {
      previousMonitorInfo['endTime'] = (new Date()).getTime();
      previousMonitorInfo['replay'] = 'true';
      this.send(this.currentEventName, previousMonitorInfo);
      this.webSocketService.healthListen('IPFIX_REPLAY');
    }
    this.webSocketService.setHealthWindowLen(this.selectedOption);
    this.errorEventName = "error"
    this.currentEventName.split("_").forEach(element => {
      if (element === "IPFIX") {
        this.errorEventName = this.errorEventName + '_' + element.toLowerCase();
      } else {
        this.errorEventName = this.errorEventName + '_' + element
      }
    })

    this.selectedRegion = this.currentEventName == 'IPFIX_REG' ? this.regionSelected : '';
    this.selectedLocation = this.currentEventName == 'IPFIX_LOC' ? this.locationSelected : '';
    this.selectedSystem = this.currentEventName == 'IPFIX_SYS' ? this.systemSelected : '';
    this.webSocketService.healthListen(this.currentEventName);
    this.webSocketService.healthListen(this.errorEventName);
    if (this.applyRebuild) {
      this.isRebuild = true;
    }
    this.getRtData();

    setTimeout(() => {
      this.loading = false;
    }, 15000)

  }

  private isSameFilters(newRequest, oldRequest): boolean {
    return newRequest['regionUuid'] == oldRequest['regionUuid']
      && newRequest['locationUuid'] == oldRequest['locationUuid']
      && newRequest['systemUuid'] == oldRequest['systemUuid'];
  }

  clearFilter() {
    if (this.regionSelected !== "All") {
      this.isRebuild = true;
    }
    this.selectedOption = 1;
    this.selectedTime = 1;
    this.regionSelected = "All";
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }
    // this.webSocketService.setHealthMonitorType('NET');
    this.webSocketService.filterValues = {};
    this.webSocketService.filterValues["selectedTime"] = 1;
    this.webSocketService.filterValues["selectedOption"] = 1;
    this.applyFilter();
    // this.getRtData();
  }

  fullscreen(whichTop) {
    this.fsView = true;
    this.fsName = whichTop;
    this.makeTPPCurrentData()
  }

  closeFullscreen() {
    this.selectedTopLength = 5;
    this.fsView = false;
    this.fsName = '';

    //make all ponport charts view type as shrinkView from expandedView
    this.ponPortsChartList.forEach((el) => {
      el['viewType'] = 'shrinkView';
    })

    this.TPPUpStreamData = this.TPPOverallData.UpStream.slice(0, 5);
    this.TPPDownStreamData = this.TPPOverallData.DownStream.slice(0, 5);
    // this.makeTPPEvents([]);
  }

  changeTopLength(): void {
    this.makeTPPCurrentData()
  }

  makeTPPCurrentData() {
    let data = this.fsName == 'TPP_DOWN' ? this.TPPOverallData.DownStream : this.TPPOverallData.UpStream;
    let sliceNum = this.selectedTopLength ? this.selectedTopLength : 5;
    this.TPPStreamData = data.slice(0, sliceNum)
  }

  regionsApiLoader() {
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.regionsSubject = this.NfaService.GetRegions()
      .subscribe((res: any) => {
        this.regionsDataArray = ["All"];
        let counts = {};
        res.forEach((x) => {
          counts[x.name] = (counts[x.name] || 0) + 1;
        });
        res.forEach((element, index) => {
          element['regionName'] = element.name;
          if (counts[element['name']] > 1) {
            element.name = element.name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")"
          }
        });
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        this.regionsDataArray = [...this.regionsDataArray, ...res];
      }, (error) => {
        // console.log(error)
      })
  }

  loadLocationValue(event: any) {
    let id = this.regionSelected;
    this.locationSelected = "All"
    this.systemSelected = "All";
    this.locationDataArray = ["All"];
    if (this.regionSelected && this.regionSelected != 'All') {
      this.locationsSubject = this.NfaService.GetLocations(id)
        .subscribe((res: any) => {
          this.locationDataArray = [...this.locationDataArray, ...res];
        }, (error) => {
        })
    }
    this.regionsDataArray.forEach((element: any) => {
      if (element.id == this.regionSelected) {
        this.regionName = element.regionName;
      }
    });

    if (this.regionSelected == 'All') {
      this.regionName = null;
      this.locationName = null;
      this.systemName = null;
      this.regionSelected = "All";
      this.locationSelected = "All";
      this.systemSelected = "All";
      this.locationDataArray = ["All"];
      this.systemDataArray = ["All"];
    }
    this.applyRebuild = true;
  }

  loadSystemValue(event: any) {
    this.systemSelected = "All";
    this.systemDataArray = ["All"];
    let regionid = this.regionSelected;
    let locationid = this.locationSelected;
    if (this.locationSelected && this.regionSelected && this.locationSelected != 'All') {
      this.systemsSubject = this.NfaService.GetSystems(regionid, locationid, 'pon')
        .subscribe((res: any) => {
          this.systemDataArray = [...this.systemDataArray, ...res];
        }, (error) => {
        })
    }
    this.locationDataArray.forEach((element: any) => {
      if (element.id == this.locationSelected) {
        this.locationName = element.name;
      }
    })
    if (this.locationSelected == 'All') {
      this.locationName = null;
      this.systemName = null;
      this.systemSelected = "All";
      this.systemDataArray = ["All"];
    }
    this.applyRebuild = true;
  }

  selectSystem(event: any) {
    this.systemDataArray.forEach((element: any) => {
      if (element.uuid == this.systemSelected) {
        this.systemName = element.name;
      }
    })
    if (this.systemSelected == 'All') {
      this.systemName = null;
    }
    this.applyRebuild = true;
  }

  closeStreamChartscreen(index, id) {
    var findindex = this.systemRealtimeChartData.findIndex(x => x.index === id);
    if (findindex > -1) {
      this.systemRealtimeChartData.splice(findindex, 1);
    }
    if (this.systemRealtimeChartData.length == 0) {
      this.showChart = false;
    }
  }

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.tableOptions.language = this.frTable;
    } else {
      delete this.tableOptions.language;
    }
  }

  reDraw(): void {
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe()
    };
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }
    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }
    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
    }
    this.webSocketService.clearHealthReplayData();

    if (!window.location.pathname.includes("cco/health")) {
      this.webSocketService.clearHealthInfo();
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }

    if (this.connectionErSubscription) {
      this.connectionErSubscription.unsubscribe();
    }
    this.webSocketService.shouldReflow = false;
  };

  checkCurrentMonitorTypeData(data, currentMonitorInfo) {
    if (data && currentMonitorInfo) {
      data.confData['system'] = data.confData.system ? data.confData.system : "";
      currentMonitorInfo["system"] = currentMonitorInfo.system ? currentMonitorInfo.system : "";
      if (data.confData.region === currentMonitorInfo.region && data.confData.location === currentMonitorInfo.location && data.confData.system === currentMonitorInfo.system) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  tPPData: any = {};
  getRtData() {
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }
    if (this.cacheDataSubscription) {
      this.cacheDataSubscription.unsubscribe();
    }

    this.cacheDataSubscription = this.webSocketService.healthCacheData$.subscribe((data: any) => {
      console.log("cache data subscription", data);
      this.cachePacketData = data['packet'];
      this.cacheRateData = data['rate'];
      this.connectionError = false;

    });
    this.ratePacketStreamSubscription = this.webSocketService.healthRatePacketStreamData$.subscribe((data: any) => {
      console.log(`subscription data ${new Date()}`, data);
      if (this.isRebuild) {                                                      //True means filter is applied and we need to remove previous values
        this.clearTPPdata();
        this.isRebuild = false;
        this.applyRebuild = false;
        this.streamChild.forEach(child => {                                     //Call remove function function of all child instances of current window
          child.removePrevious();
        });
      }
      this.showRealTime = true;
      let currentMonitorType = this.webSocketService.getHealthMonitorType();
      let currentMonitorInfo = this.webSocketService.getHealthCurrentMonitorInfo(currentMonitorType);
      if (data.monitorType && data.monitorType.includes(currentMonitorType) && this.checkCurrentMonitorTypeData(data, currentMonitorInfo)) {
        if (data.graphType === 'TRF') {
          this.loading = false;
          this.connectionError = false;
          this.data = data;
          this.lastSubscriptionTime = new Date().getTime();
          this.showRealTime = true;
        } else {
          // this.showBars = false;
        }
      }

    });

    setTimeout(() => {
      this.rtSubscription = this.webSocketService.healthRtData$.subscribe((data: any) => {
        // console.log("data", data);
        let currentMonitorType = this.webSocketService.getHealthMonitorType();
        let currentMonitorInfo = this.webSocketService.getHealthCurrentMonitorInfo(currentMonitorType);
        if (data.monitorType && data.monitorType.includes(currentMonitorType) && this.checkCurrentMonitorTypeData(data, currentMonitorInfo)) {
          if (data.graphType == 'TPP') {
            this.loading = false;
            this.connectionError = false;
            this.tPPData = data;
            this.makeTPPEvents(data);
          }
        }
        // this.loading = false;
      })
    }, 800)
  }

  dataSplit(data) {
    if (data) {
      data.map((obj, i) => {
        data[i].system = data[i].system.split('@')[1] ? data[i].system.split('@')[1] : data[i].system;
      });
      return data
    }
    return []
  }

  makeTPPEvents(data) {
    // console.log("makeTPPEventsdata", data);
    if (data) {
      this.TPPOverallData.DownStream = data.downData.length > 0 ? data.downData : [];
      this.TPPOverallData.UpStream = data.upData.length > 0 ? data.upData : [];

      // console.log('data.upData', this.TPPOverallData.DownStream);
      // console.log('data.downData', this.TPPOverallData.UpStream);

      let sliceNum = this.selectedTopLength ? this.selectedTopLength : 5;
      this.TPPUpStreamData = this.TPPOverallData.UpStream.slice(0, sliceNum);
      this.TPPDownStreamData = this.TPPOverallData.DownStream.slice(0, sliceNum);

      if (this.fsView) {
        this.makeTPPCurrentData();
      }
      // this.rerender();
    }
  }

  clearTPPdata() {
    this.TPPOverallData.DownStream = [];
    this.TPPOverallData.UpStream = [];
    this.TPPUpStreamData = this.TPPOverallData.DownStream;
    this.TPPDownStreamData = this.TPPOverallData.UpStream;
  }

  rerender() {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        // dtInstance.draw();
        this.dtTrigger.next();
      });
    });
  }


  bitsToSize(bits: any, round?: any) {
    let bytes = bits;
    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    if (bytes == 0) return '0 bps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    if (round) {
      return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
    }
    return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizes[i];
  }


  showModalInfo() {
    this.webSocketService.showModalInfo$.subscribe((res: any) => {
      if (this.router.url.includes("/cco/health/pon-utilization/realtime")) {
        this.modalTitle = this.language["Internet Disconnected"];
        this.modalInfo = this.language["Please checking the network cables, modem, and router"];
        this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
      }
    })
  }


  close(): void {
    this.modalRef.close();
    window.location.reload();
  }

  calculateDownPercentage(data: any) {
    let percentage = 0
    if (data.ifName.includes("gp")) {
      percentage = (data.value / 2488000000) * 100;
    } else {
      percentage = (data.value / 10000000000) * 100;
    }
    return percentage.toFixed(2);
  }

  calculateUpPercentage(data: any) {
    let percentage = 0
    if (data.ifName.includes("gp")) {
      percentage = (data.value / 1244000000) * 100;
    } else {
      percentage = (data.value / 10000000000) * 100;
    }
    return percentage.toFixed(2);
  }

  ponPortsChart(chartInfo: any, viewType) {
    let url = `${environment.API_BASE_URL}nfa/systems/details?offset=0&limit=100&name=${chartInfo.system}&exactNameMatch=true`;
    this.httpClient.get(url).subscribe((resp: any) => {
      const device = resp.devices.find(x => x.name === chartInfo.system);
      let IsDuplicate = false;
      let position = 0;
      if (this.ponPortsChartList.length > 0) {
        this.ponPortsChartList.forEach(element => {
          if (element.monitorId === chartInfo.ifName && element.region === chartInfo.region && element.location === chartInfo.location) {
            element['viewType'] = viewType;
            IsDuplicate = true;
            position = position + 1;
          }
        });
      }
      if (!IsDuplicate) {
        this.ponPortsChartList.push({
          monitorId: chartInfo.ifName,
          region: chartInfo.region,
          location: chartInfo.location,
          system: chartInfo.system,
          port: chartInfo.ifName,
          windowLen: this.windowLen,
          IsDuplicate: IsDuplicate,
          Position: position,
          startTime: null,
          replay: false,
          viewType: viewType,
          regionUuid: device['regionuuid'],
          locationUuid: device['locationuuid'],
          systemUuid: device['uuid']
        });
        this.ponPortsChartList = [...this.ponPortsChartList];
      }
      setTimeout(() => {
        var elmnt = document.getElementById("ponports-" + chartInfo.ifName);
        elmnt.scrollIntoView({ behavior: 'smooth' });
      }, 500)
    }, (error: HttpErrorResponse) => {
      this.errorMessage = this.errorHandler(error);
    });

  }

  errorHandler(err: HttpErrorResponse) {
    this.scrollTop();
    if (err.error) {
      if (err.error['errorDesc']) {
        this.errorMessage = err.error['errorDesc'];
      } else if (err.error['status'] == 500) {
        this.errorMessage = `Internal Server Error`;
      } else if (err.error['statusText'] == 'Unknown Error' && err.error['status'] == 0) {
        // this.errorMessage = "Unknown Error - Please refresh the page"; // remove later
        this.errorMessage = "An unknown error has occurred. Refresh the page to try again";
      } else if (err.error['status'] && err.error['status'] == 401) {
        this.errorMessage = "User Unauthorized";
      } else if (err.error['message']) {
        this.errorMessage = err.error['message'];
      } else {
        this.errorMessage = err.error;
      }
    }
    else {
      this.errorMessage = this.commonOrgService.pageErrorHandle(err);
    }
    return this.errorMessage;
  }


  clearChartContainer(values: any) {
    var findindex = this.ponPortsChartList.findIndex(x => x.monitorId === values.monitorId && x.region === values.region && x.location === values.location);
    if (findindex > -1) {
      this.ponPortsChartList.splice(findindex, 1);
    }

    var findindex = this.webSocketService.ponPortsList.findIndex(x => x.monitorId === values.monitorId && x.region === values.region && x.location === values.location);
    if (findindex > -1) {
      this.webSocketService.ponPortsList.splice(findindex, 1);
    }
  }


  lastSubscriptionTime: any;
  interval: any;
  calculateSubscriptiontime() {
    this.interval = setInterval(() => {
      let diff = new Date().getTime() - this.lastSubscriptionTime;
      if (diff >= 30000) {
        this.data.maxRate = [0, 0];
        this.data.packet = [0, 0];
        this.TPPUpStreamData = [];
        this.TPPDownStreamData = [];
        this.TPPOverallData.DownStream = [];
        this.TPPOverallData.UpStream = [];
        if (this.tPPData) {
          this.tPPData.downData = [];
          this.tPPData.upData = [];
          this.webSocketService.healthRtData$.next(this.tPPData);
        }
      }
    }, 15000)
  }

  connectionError: boolean = false;
  connectionErrorInfo = ""
  connectionErSubscription: any
  webSocketConnectionError() {
    if (this.connectionErSubscription) {
      this.connectionErSubscription.unsubscribe();
    }
    this.webSocketService.wsConnectionError$.subscribe((res: any) => {
      if (res && res === true) {
        this.loading = false;
        this.connectionError = true;
        this.connectionErrorInfo = "Web Socket connection failed"
      }
    })

    this.webSocketService.healthWSNoResponse$.subscribe((res: any) => {
      if (res && res.isError === true && res.type === this.errorEventName) {
        this.loading = false;
        this.connectionError = true;
        this.connectionErrorInfo = "No Data Available"
      }
    })
  }

  closeAlert() {
    this.connectionError = false;
    this.connectionErrorInfo = "";
    this.errorMessage = "";
  }

  reConnectSubscription: any;
  reConnectWebSocket() {
    if (this.reConnectSubscription) {
      this.reConnectSubscription.unsubscribe();
    }
    this.webSocketService.connectWS$.subscribe((res: any) => {
      if (res && this.webSocketService.WebSocketServer.hasDisconnectedOnce) {
        this.webSocketService.healthListen(this.currentEventName);
        this.webSocketService.healthListen(this.errorEventName);
        this.webSocketService.healthListen('IPFIX_REPLAY');
        this.send(this.currentEventName, this.healthNetWSRequestObj);

        let monitorType = this.webSocketService.getHealthMonitorType();
        let filterData = this.webSocketService.getHealthCurrentMonitorInfo(monitorType);
        if (filterData) {
          if (filterData && filterData['monitorId']) {
            let params = {
              "orgId": filterData.orgId,
              "monitorType": filterData['monitorType'],
              "networkId": filterData['networkId'],
              "monitorId": filterData['monitorId'],
              "graphType": "TRF",
              "replay": "true",
              "region": filterData['region'],
              "location": filterData['location'],
              "startTime": filterData['startTime'],
              "endTime": (new Date()).getTime(),
              "regionUuid": filterData['regionUuid'],
              "locationUuid": filterData['locationUuid'],
            };
            if (filterData.monitorType == 'SYS') {
              params["system"] = filterData['system'];
              params["systemUuid"] = filterData['systemUuid'];
            }
            this.send(this.currentEventName, params);
          }
        }
        this.getRtData();

      }
    });
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
