import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { DataServiceService } from '../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';

declare var require: any;
import * as Highcharts from "highcharts";
import * as HighchartsGantt from 'highcharts/highcharts-gantt';
require('highcharts/highcharts-more.js')(Highcharts);
// const borderRadius = require('highcharts-border-radius')
// borderRadius(Highcharts);
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { element, Session } from 'protractor';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { SupportServiceService } from '../services/support-service.service';
import { SupportRouterService } from '../../support-system/support-router/services/support-router.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit, OnDestroy {

  orgId;
  closeResult = '';
  runSpeedTest = false;
  runLatencyTest = false;
  spd1 = true;
  spd2 = false;
  language: any = {};
  languageSubject;
  isError;
  alertMessage;
  upTime: any;
  totalDownloadspeed = 0;
  totalUploadspeed = 0;
  // count = 0
  loader;
  latDS;
  latUS;
  latbgDS;
  latbgUS;
  latodDS;
  latodUS;
  latDSM;
  latUSM;
  latrun;
  wanInfo = [];
  wanInfoToDisplay: any = {};
  apiUnsubscriber: any;
  deviceInfo: any = [];
  data: any;
  odRes: any = false;
  bgRes: any = false;
  disableTrafficReport = true;
  bgUSEnabled = false;
  odUSEnabled = true;
  bgDSEnabled = false;
  odDSEnabled = true;
  scopesFlag: any = {};
  serialNumberSelected: any = '';
  metaData: any = {};
  endpointId: any = '';
  isLoad = true;
  isSuccess: boolean;
  modelName: any;
  softwareVersion: any;

  globalObj: any = {};
  bandwidthLoader = false;
  endpoint = '';
  manufacturer: any;
  isgs: boolean = true;
  l2sData: any = {};
  l2sTab = 1;
  isOndemand: boolean = true;
  uploadIsOndemand: boolean = true;
  dataFlag = false;
  dataleaseFlag = false;
  dataLoaderFlag: boolean = false;
  isspeediq: boolean = false;
  loadingWanInfoToDisplay = false;
  testtypeforlogo: boolean = false;
  enablestatus
  ontusoc
  downstream
  upstream
  isont = false
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();
  dtTrigger4: Subject<any> = new Subject();
  dtTrigger5: Subject<any> = new Subject();
  dtTrigger6: Subject<any> = new Subject();
  dtTrigger7: Subject<any> = new Subject();
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  dataservice: any;
  servicesData
  usoc: any;
  dataser: any;
  dataService: any;
  ONTIpaddress: any;
  IpAddressNewOnt: any = [];
  OoklaOndemand: boolean = false
  OoklaPrivateOndemand: boolean = false

  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtL2Options: DataTables.Settings = {
    paging: false,
    ordering: false,
    processing: true,
    info: false,
    dom: 't'
  };
  MODULE: string = 'support';
  speedtestByCountry: any;
  isSTAvailable: any = false;
  Bridgelanwarning: any = false;
  speedtestSupported: any = false;
  speedTestProtocol: boolean = false;
  speedTestProtocolCheck: any = 'Ookla';
  dtOptionStation: DataTables.Settings = {};
  dtL2Lease: DataTables.Settings = {};
  frTable: any;
  esTable: any;
  germanTable: any;

  isPrivateServerTest: boolean = false;
  backgroundTestEnabled: any = false;
  avgandwan = false;
  subEndPointSubscribed: any;
  userid: any;
  hasSmbEnabled: boolean = false;
  hasBackupWANConfigured: boolean = false;
  hasBackupWANConnectedStatus: boolean = false;
  backupWANText: any;
  opModeWithOnt: boolean;
  ONTMacAddress: any = [];
  showAsmInformation = false;
  subscriberId = this.ssoService.getCSCSubscriberId() === 'undefined' ?? undefined;
  asmInfo = [];
  asmData: any = {};

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private titleService: Title,
    public translateService: TranslateService,
    private dataChartService: DataServiceService,
    private supportWifiService: SupportWifiService,
    public ssoService: SsoAuthService,
    public ccoOrgAdminService: CcoOrgAdminService,
    private supportService: SupportServiceService,
    private routerService: SupportRouterService
  ) {
    this.userid = localStorage.getItem('ciquserid');
    this.frTable = this.translateService.fr
    this.esTable = this.translateService.es
    this.germanTable = this.translateService.de_DE
    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';

  }

  ngOnInit() {
    this.getScopes();
    this.dtOptionStation = this.dtL2Lease = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.ssoService.setActionLog('CSC', 'pageHit', 'Service', this.router.url, 'Service Data page is loaded');
    //console.log('53', this.ssoService.getCscType())
    this.orgId = this.ssoService.getOrgId();
    //console.log('conditoin', this.ssoService.getSubscriberEndpointId());
    this.endpointId = this.ssoService.getSubscriberEndpointId();
    if (this.endpointId) this.disableTrafficReport = false;
    if (this.endpointId && this.scopesFlag.trafficReportsRead) {
      this.loadBandwidthChart(this.endpointId);
    } else {
      let data = this.emptyDataStructure();
      if (this.ssoService.getCscType() !== 'DME') {
        setTimeout(() => {
          const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
        }, 2000);
      }
    }

    this.subEndPointSubscribed = this.ssoService.subscriberEndPointId$.subscribe((id: any) => {
      if (id) {
        this.endpointId = id;
        this.disableTrafficReport = false;
        if (this.scopesFlag.trafficReportsRead) {
          this.loadBandwidthChart(id);
        } else {
          let data = this.emptyDataStructure();
          if (this.ssoService.getCscType() !== 'DME') {
            setTimeout(() => {
              const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
            }, 2000);
          }
        }
      } else {
        this.disableTrafficReport = true;
        let data = this.emptyDataStructure();
        if (this.ssoService.getCscType() !== 'DME') {
          setTimeout(() => {
            const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
          }, 2000);
        }
      }
    });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Data']} - ${this.language['Service']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.tableLanguageOptions();
      this.rerender();
      if (this.deviceInfo.length) this.loadChart(false);
      this.endpoint = this.ssoService.getSubscriberEndpointId();
      if (this.endpoint && this.scopesFlag.trafficReportsRead) {
        this.loadBandwidthChart(this.endpoint);
      } else {
        let data = this.emptyDataStructure();
        if (this.ssoService.getCscType() !== 'DME') {
          setTimeout(() => {
            const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
          }, 2000);
        }
      }
    });
    this.titleService.setTitle(`${this.language['Data']} - ${this.language['Service']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    //console.log('97',this.language.Ran);
    this.deviceInfo = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    this.deviceInfo = (this.deviceInfo || []).filter(obj => obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
    this.deviceInfo = (this.deviceInfo || []).filter(obj => obj.modelName != "804Mesh");
    this.serialNumberSelected = this.deviceInfo[0]?.serialNumber
    const tempDeviceData = this.deviceInfo.filter(obj => obj.serialNumber == this.serialNumberSelected);
    const deviceData = tempDeviceData.length ? tempDeviceData[0] : this.deviceInfo[0];
    this.modelName = this.deviceInfo.length ? this.deviceInfo[0]?.modelName : '';
    this.softwareVersion = this.deviceInfo.length ? this.deviceInfo[0]?.softwareVersion : '';
    this.manufacturer = this.deviceInfo.length ? this.deviceInfo[0]?.manufacturer : '';
    //console.log('86',deviceData);
    this.globalObj.latencyLoss = 0;
    this.globalObj.latency = 0;
    if (this.deviceInfo.length) {
      this.loadChart(false);
    }
    this.tableLanguageOptions();

    let ont = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    (ont || []).forEach(element => {
      if (element.hasOwnProperty('ont')) {
        this.isont = true
      }
    })
    let subsId
    let SubscriberId = this.ssoService.getCSCSubscriberId();
    subsId = SubscriberId === 'undefined' ? undefined : SubscriberId
    if (subsId && this.ssoService.getEntitlementsArr().indexOf('102') > -1) {
      this.getAllSubsServicesData()
    }
    this.checkBackupWanSataus();
    const deviceInfo = JSON.parse(sessionStorage.getItem('calix.deviceData'));
    deviceInfo?.forEach(element => {
      if (element?.hasOwnProperty("ont")) {
        this.opModeWithOnt = true;
      }
    });
    if (this.opModeWithOnt) this.ONTipaddressCheck();
  }

  ngAfterViewInit() {
    if (history.state?.isSpeedtest) {
      setTimeout(() => {
        document.getElementById("speedTestSection").scrollIntoView();
      }, 0)

    }

    if (history.state?.islatency) {
      setTimeout(() => {
        document.getElementById("roundTripInfoId").scrollIntoView();
      }, 0)

    }


  }

  emptyDataStructure() {
    var d = new Date();
    let data = [{
      "startPeriodSec": Math.floor(d.setHours(d.getHours())),
      "peakDsRate": 0,
      "peakUsRate": 0,
    }];
    let elapsed = 3;
    for (let i = 0; i < 56; i++) {
      //console.log('101',d)
      //console.log("elapsed101",elapsed);
      //console.log("timeStamp102", Math.floor(d.setHours(d.getHours() - elapsed)));
      data.push({
        "startPeriodSec": Math.floor(d.setHours(d.getHours() - elapsed)),
        "peakDsRate": 0,
        "peakUsRate": 0,
      })
    }
    //console.log('103',data);
    return data.reverse();
  }
  loadChart(allowBW = true, refereshData = '') {
    this.isError = false;
    if (allowBW && (this.endpoint || this.endpointId) && this.scopesFlag.trafficReportsRead) this.loadBandwidthChart((this.endpoint || this.endpointId));
    this.metaData = this.dataChartService.getMetaData(this.serialNumberSelected);
    if (!this.metaData) {
      this.getMetaData();
      return;
    }
    if (this.objectExistence(this.metaData.L2Security)) this.getL2Security();
    this.loader = true;
    const isRefreshed = (refereshData.length > 0);
    if (this.scopesFlag.wanConfigRead) {
      this.loadingWanInfoToDisplay = true;

      this.apiUnsubscriber = this.dataChartService.SpeedTestChartOptions(this.orgId, this.serialNumberSelected, isRefreshed).subscribe(
        (data: any) => {
          this.loadingWanInfoToDisplay = false;

          const tempDeviceData = this.deviceInfo.filter(obj => obj.serialNumber == this.serialNumberSelected);
          const deviceData = tempDeviceData.length ? tempDeviceData[0] : this.deviceInfo[0];
          this.data = data;
          //if (this.data && localStorage.hasOwnProperty("calix.videopermission") && localStorage.hasOwnProperty("calix.voicepermission")) {
          this.loader = false;
          /* if(refereshData == 'refresh'){
            this.isSuccess = true;
          } */
          if (data.wanInfo.data && Array.isArray(data.wanInfo.data)) {
            this.wanInfo = data.wanInfo.data;
          } else if (JSON.stringify(data.wanInfo.data) === '{}' || data.wanInfo.error) {
            this.wanInfo = [];
          } else {
            this.wanInfo = [data.wanInfo.data];
          }
          this.wanInfoToDisplay = (this.wanInfo.length ? this.wanInfo[0] : {});
          //this.Bridgelanwarning= (this.wanInfoToDisplay?.BridgeLANInterface.length==0 ? true : false )
          if (this.wanInfo.length) {
            $("#wanStatusSelectedId").text(this.wanInfo[0].Name);
            if (this.wanInfoToDisplay.Uptime != "0") {
              let seconds = this.wanInfoToDisplay.Uptime;
              const day = Math.floor(seconds / (24 * 3600));
              seconds = seconds % (24 * 3600);
              const hour = Math.floor(seconds / 3600);
              seconds %= 3600;
              const minutes = Math.floor(seconds / 60);
              const second = Math.floor(seconds % 60);

              this.upTime = `${day ? day + 'd' : ''}
                          ${hour ? hour + 'h' : ''}
                          ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
                          ${second ? String(second).padStart(2, '0') + 's' : ''}`;
            } else if (this.wanInfoToDisplay.Uptime == "0") {
              this.upTime = "0s"
            }
            this.wanInfoToDisplay.Enable = this.wanInfoToDisplay.Enable.charAt(0).toUpperCase() + this.wanInfoToDisplay.Enable.slice(1);
          }
          //const chart = Highcharts.chart('speedTestChart', this.speedTestOption(data.speedTests || []));
          //}
        }, err => {
          this.loader = false;
          this.loadingWanInfoToDisplay = false;
          this.pageErrorHandle(err);
        }
      );
    }
    else {
      this.loader = false;
    }
    //this.speedTestChart();
    //this.speedTestDsChart();
    if (this.scopesFlag.runSpeedTestRead) {
      this.speedTestAvailability();
    }

    // this.latencyTestChart(); 
    //this.serviceLatest();
  }

  loadBandwidthChart(endpoint) {
    this.bandwidthLoader = true;
    this.dataChartService.RoundedBarChartOptions(this.orgId, endpoint).subscribe((data: any) => {
      this.bandwidthLoader = false;
      if (data.length) {
        if (this.ssoService.getCscType() !== 'DME') {
          setTimeout(() => {
            const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || [], true));
          }, 2000);
        }
      } else {
        if (this.ssoService.getCscType() !== 'DME') {
          let data = this.emptyDataStructure();
          setTimeout(() => {
            const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
          }, 2000);
        }
      }
    }, err => {
      this.bandwidthLoader = false;
      this.pageErrorHandle(err);
      if (this.ssoService.getCscType() !== 'DME') {
        let data = this.emptyDataStructure();
        setTimeout(() => {
          const chart = Highcharts.chart('bandwidthChart', this.bandWidthUtilOption(data || []));
        }, 2000);
      }
    });
  }

  filterBandwidth(obj) {
    let data = [], download = [], upload = [];
    for (let i = 0; i < obj.length; i++) {
      let date = new Date();
      date.setTime(obj[i].startPeriodSec * 1000);
      const category = `${(date.getMonth() < 9 ? '0' : '')}${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}
                          ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
      //const dateString = newDate.toUTCString();
      download.push(this.byteToMegaByte(obj[i].peakDsRate, 2));
      upload.push(this.byteToMegaByte(obj[i].peakUsRate, 2));
      data.push(category);
    }
    return [data, download, upload];
  }

  getMetaData() {
    if (!this.serialNumberSelected) return;
    this.loader = true;
    this.dataChartService.fetchMetaData(this.orgId, this.serialNumberSelected).subscribe((res: any) => {
      this.loader = false;
      this.metaData = res || {};
      res.properties?.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.dataChartService.setMetaData(this.serialNumberSelected, this.metaData);
      this.loadChart(false);
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });
  }

  reStructureMeta(obj) {
    this.metaData[obj.featureName.replace(/[.]/g, "")] = {};
    if (obj.hasOwnProperty("fields")) {
      obj.fields?.forEach(element => {
        this.metaData[obj.featureName.replace(/[.]/g, "")][element.name.replace(/[.]/g, "")] = element;
      });
    } else if (obj.hasOwnProperty("configuration")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["config"] = obj.configuration;
    } else if (obj.hasOwnProperty("supported")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["supported"] = obj.supported;
    }
  }

  objectExistence(obj) {
    return Object.keys(obj || {}).length;
  }

  gotoTraffic(): void {
    this.router.navigate([`${this.MODULE}/traffic-reports/realtime`]);
  }

  openOutModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showSpeedProgress() {
    this.runSpeedTest = true;
    setTimeout(() => {
      this.runSpeedTest = false;
    }, 2000);
  }

  speedTestOption(data): any {
    const mappingObject = { time: "createTime", download: "dsLevel", upload: "usLevel" };
    let [categories, download, upload] = this.mapChartData(data.reverse(), mappingObject, 0);
    const grouping = data.length == 1 ? 0.45 : (data.length <= 3 ? 0.35 : 0.2);
    const servicedata = parseInt(this.ssoService.getServiceDownSpeed() || 0);
    const plotLine = servicedata ? [{
      color: 'red',
      width: 2,
      value: (0.8 * servicedata),
      dashStyle: 'Solid'
    }] : []
    return {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      tooltip: {
        headerFormat: '{point.x}<br>',
        pointFormat: '{series.name}: <b>{point.y}Mbps</b>'
      },
      xAxis: {
        categories: (categories || [])
      },
      yAxis: {
        min: 0,
        lineColor: '#ddd',
        title: {
          text: 'Mbps'
        },
        plotLines: plotLine
      },
      plotOptions: {
        series: {
          maxPointWidth: 20,
          borderRadius: 0,
          groupPadding: grouping
        },
      },
      series: [
        {
          name: this.language.Download,
          data: (download || []),
          color: '#0a77fb',
          borderRadiusTopLeft: '30px',
          borderRadiusTopRight: '30px',
        },
        {
          name: this.language.Upload,
          data: (upload || []),
          color: '#82bf00',
          borderRadiusTopLeft: '30px',
          borderRadiusTopRight: '30px',
        },
      ]
    };
  }

  latencyTestOption(data): any {
    const mappingObject = { time: "createTime", latency: "latency" };
    let [categories, latency] = this.mapChartData(data.reverse(), mappingObject, 1);

    return {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      tooltip: {
        headerFormat: '{point.x}<br>',
        pointFormat: '{series.name}: <b>{point.y}ms</b>'
      },
      xAxis: {
        categories: (categories || []),
        overflow: false
      },
      yAxis: {
        min: 0,
        lineColor: '#ddd',
        title: {
          text: 'ms'
        },
        plotLines: [{
          color: 'red',
          width: 2,
          value: 50,
          dashStyle: 'Solid'
        }]
      },
      plotOptions: {
        series: {
          maxPointWidth: 20,
          borderRadius: 0
        },
      },
      series: [
        {
          name: this.language.Latency,
          data: (latency || []),
          color: '#0a77fb',
          borderRadiusTopLeft: '30px',
          borderRadiusTopRight: '30px',
        }
      ]
    };
  }

  getFlagShowAsm(interfaceId) {
    this.ccoOrgAdminService.fetchAmdins('All').subscribe((data: any = {}) => {
      this.showAsmInformation = data?.showAsmInformation;
      if (this.showAsmInformation) {
        this.getAsmApiInputs(interfaceId);
      }
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  getAsmApiInputs(interfaceId) {
    let inp = this.ssoService.getDeviceData().filter(el => el.hasOwnProperty('ont')).map(el => { return { oltId: el.ont.uuid, sn: el.ont.serialNumber }; });
    this.routerService.getTimeSeriesPage(inp[0]?.sn).subscribe((res: any) => {
      if (res.length && inp.length) this.getAsmDetails(res[0]?.oltUuid, encodeURIComponent(`${inp[0]?.sn}/${interfaceId}`))
    }, err => {
      this.pageErrorHandle(err);
    })
  }

  checkBackupWanSataus() {
    this.hasSmbEnabled = false;
    this.hasBackupWANConfigured = false;
    this.hasBackupWANConnectedStatus = false;
    let subscriberInfo = this.ssoService.getSubscriberInfo();
    (subscriberInfo?.devices || []).forEach((device) => {
      if (device.bSmbMode && subscriberInfo.isSmbOnboarded) {
        this.hasSmbEnabled = true;
      }
    });
    // console.log("smbmode", this.hasSmbEnabled);

    if (this.hasSmbEnabled) {
      // console.log("smb in");    
      this.supportWifiService.backupwanwifi(this.userid).subscribe((res: any) => {
        // console.log("length", res.backupWifis.length);
        // console.log("ssid", res.backupWifis[0].ssid);
        if (res.backupWifis.length && res.backupWifis[0].ssid) {
          this.hasBackupWANConfigured = true;
          // console.log("hasSmbEnabled", this.hasSmbEnabled);
          // console.log("hasBackupWANConfigured", this.hasBackupWANConfigured);
          if (this.hasSmbEnabled && this.hasBackupWANConfigured) {
            this.supportWifiService.backupwanstatus(this.userid).subscribe((rescon: any) => {
              console.log(rescon);
              this.backupWANText = 'Disconnected, Network Resilience not up';
              if (rescon.running) {
                this.hasBackupWANConnectedStatus = true;
                // this.backupWANText = 'Connected via ' + res.backupWifis[0].ssid;
                this.backupWANText = 'Connected via Network Resilience';
                // console.log("hasBackupWANConnectedStatus", this.hasBackupWANConnectedStatus);
              }
            }, err => {
              this.pageErrorHandle(err);
            });
          }
        } ``
      }, err => {
        this.pageErrorHandle(err);
      });
    }



  }

  bandWidthUtilOption(data, isRealData = false): any {
    const mappingObject = { time: "startPeriodSec", download: "peakDsRate", upload: "peakUsRate" };
    let [categories, downSpeed, upSpeed] = isRealData ? this.filterBandwidth(data) : this.mapChartData(data, mappingObject);
    const ds = this.globalObj.serviceDS = parseInt(this.ssoService.getServiceDownSpeed() || 0) * 0.9;
    this.globalObj.DSPercOfBW = ds ? Math.ceil((downSpeed.reduce((inc, curr) => (curr >= ds) ? ++inc : inc, 0) * 100) / data.length) : 0

    return {
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        allowDecimals: false,
        categories: categories
      },
      yAxis: {
        plotLines: [{
          color: '#e67100',
          dashStyle: 'Solid', // Dash, Dot, Solid (default)
          width: 2.5,
          value: this.ssoService.getServiceDownSpeed(), // yAxis value
          zIndex: 5
        }],
        title: {
          text: 'Mbps'
        }
      },
      colors: ['#0a77fb', '#82bf00'],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f} Mbps</b>'
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
        series: {
          fillOpacity: 0.4,
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            }
          }
        }
      },
      series: [
        {
          name: this.language.Max_Downspeed,
          data: downSpeed

        }, {
          name: this.language.Max_Upspeed,
          data: upSpeed

        }
      ]
    }
    /* {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'area'
      },
      // title: {
      //   text: 'Stacked Area Chart'
      // },
      colors: ['#0a77fb', '#82bf00'],
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      xAxis: {
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif'
          }
        },
        categories: categories,
        //tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        min: 0,
        //tickInterval: 1,
        title: {
          text: 'Mbps'
        },
        // labels: {
        //   formatter() {
        //     return this.value / 1000;
        //   }
        // }
      },
      tooltip: {
        headerFormat: '{point.x}<br>',
        pointFormat: '{series.name}: <b>{point.y}Mbps</b>'
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              // tslint:disable-next-line:object-literal-shorthand
              click: function () {
                console.log('Category: ' + this.category + ', Series:' + this.series.name + ', value: ' + this.y);
              }
            }
          }
        },
        area: {
          stacking: 'normal',
          // lineColor: '#666666',
          lineWidth: 1,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [
        {
          name: this.language.Max_Downspeed,
          data: downSpeed

        }, {
          name: this.language.Max_Upspeed,
          data: upSpeed

        }]
    }; */
  }

  mapChartData(data, mapObj, isByte = 2) {
    let categories = [], download = [], upload = [], latency = [];
    if (mapObj.hasOwnProperty('latency')) {
      data?.forEach(obj => {
        const date = new Date(obj[mapObj.time]);
        const category = `${(date.getMonth() < 9 ? '0' : '')}${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getFullYear().toString().substring(2)}
                          ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
        categories.push(category);
        latency.push(obj[mapObj.latency]);
      });
    } else {
      data?.forEach(obj => {
        const date = new Date(obj[mapObj.time]);
        const category = `${(date.getMonth() < 9 ? '0' : '')}${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}
                          ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
        categories.push(category);
        download.push(isByte ? this.byteToMegaByte(obj[mapObj.download], isByte) : obj[mapObj.download]);
        upload.push(isByte ? this.byteToMegaByte(obj[mapObj.upload], isByte) : obj[mapObj.upload]);
      });
    }

    return mapObj.hasOwnProperty('latency') ? [categories, latency] : [categories, download, upload];
  }

  wanSelection(selectedWan) {
    $("#wanStatusSelectedId").text(this.wanInfo[selectedWan].Name);
    this.wanInfoToDisplay = this.wanInfo[selectedWan];
    //this.Bridgelanwarning= (this.wanInfoToDisplay?.BridgeLANInterface.length==0 ? true : false )
    this.wanInfoToDisplay.Enable = this.wanInfoToDisplay.Enable.charAt(0).toUpperCase() + this.wanInfoToDisplay.Enable.slice(1)

    if (this.wanInfoToDisplay.Uptime != "0") {
      let seconds = this.wanInfoToDisplay.Uptime;
      const day = Math.floor(seconds / (24 * 3600));
      seconds = seconds % (24 * 3600);
      const hour = Math.floor(seconds / 3600);
      seconds %= 3600;
      const minutes = Math.floor(seconds / 60);
      const second = Math.floor(seconds % 60);

      this.upTime = `${day ? day + 'd' : ''}
                  ${hour ? hour + 'h' : ''}
                  ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
                  ${second ? String(second).padStart(2, '0') + 's' : ''}`;
    } else if (this.wanInfoToDisplay.Uptime == "0") {
      this.upTime = "0s"
    }

  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return 0;  //'0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));// + ' ' + sizes[i];
  }

  byteToMegaByte(bytes, isByte = 2, divisible = 1000) {
    if (bytes === 0) return 0;  //'0 Bytes';
    return parseFloat((bytes / Math.pow(divisible, isByte)).toFixed(2));// + ' ' + sizes[i];
  }

  pageErrorHandle(err: any) {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else {
      this.alertMessage = this.ssoService.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }



  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.apiUnsubscriber) this.apiUnsubscriber.unsubscribe();
    if (this.subEndPointSubscribed) this.subEndPointSubscribed.unsubscribe();
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.services.data.trafficreports'] = scopes['cloud.rbac.csc.services.data.trafficreports'] ? scopes['cloud.rbac.csc.services.data.trafficreports'] : [];
      scopes['cloud.rbac.csc.services.data.speed_test'] = scopes['cloud.rbac.csc.services.data.speed_test'] ? scopes['cloud.rbac.csc.services.data.speed_test'] : [];

      scopes['cloud.rbac.csc.services.data.wan_status'] = scopes['cloud.rbac.csc.services.data.wan_status'] ? scopes['cloud.rbac.csc.services.data.wan_status'] : [];

      if (scopes && (scopes['cloud.rbac.csc.services.data.trafficreports'] && scopes['cloud.rbac.csc.services.data.trafficreports'].length)) {
        if (scopes['cloud.rbac.csc.services.data.trafficreports'].indexOf('read') !== -1) this.scopesFlag.trafficReportsRead = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.services.data.speed_test'] && scopes['cloud.rbac.csc.services.data.speed_test'].length)) {
        if (scopes['cloud.rbac.csc.services.data.speed_test'].indexOf('read') !== -1) this.scopesFlag.runSpeedTestRead = true;
        if (scopes['cloud.rbac.csc.services.data.speed_test'].indexOf('write') !== -1) this.scopesFlag.runSpeedTestWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.services.data.wan_status'] && scopes['cloud.rbac.csc.services.data.wan_status'].length)) {
        if (scopes['cloud.rbac.csc.services.data.wan_status'].indexOf('read') !== -1) this.scopesFlag.wanConfigRead = true;
        if (scopes['cloud.rbac.csc.services.data.wan_status'].indexOf('write') !== -1) this.scopesFlag.wanConfigWrite = true;
      }
      // this.scopesFlag.runSpeedTestWrite = true //for testing purpose
    } else {
      this.scopesFlag.trafficReportsRead = true;
      this.scopesFlag.runSpeedTestRead = true;
      this.scopesFlag.runSpeedTestWrite = true;

      this.scopesFlag.wanConfigRead = true;
      this.scopesFlag.wanConfigWrite = true;
    }
  }


  speedTest(test = false, type?: string) {
    //this.runSpeedTest = true;
    const request = {
      // "orgId": this.orgId,
      "sn": this.serialNumberSelected,
    };
    /*    this.dataChartService.speedTestPrivPolicy(this.orgId).subscribe((res: any) => {
         // this.backgroundTestEnabled = res.backgroundTestEnabled ? res.backgroundTestEnabled : false;
          if (res.ooklaEndpoint && this.isgs) {
            //private
            //this.spd2 = false;
            //this.spd1 = true;
            if (this.speedTestProtocolCheck != 'TR143' && this.isgs) {
              request["type"] = "private"; //true;
            }
            if (test) {
              this.runSpeedTest = true;
              this.speedTestPost(request, true);
            }
          } else {
            //public
           // this.spd2 = true;
           // this.spd1 = false;
            if (this.speedTestProtocolCheck != 'TR143' && this.isgs) {
              request["type"] = "private";//true;
              if (!res.ooklaEndpoint || res.ooklaEndpoint == '') {
                request["type"] = "public";//false;
              }
            }
            if (test) {
              this.runSpeedTest = true;
              this.speedTestPost(request, false);
            }
          }
        }, err => {
          //public
          this.spd2 = true;
          this.spd1 = false;
          /* if (this.speedTestProtocolCheck != 'TR143' && this.isgs) {
            request["privateOoklaEndpoint"] = true;
          } */
    /*      if (test) {
            this.runSpeedTest = true;
            this.speedTestPost(request, false);
          }
        })
    */
    //////////////////////////////////
    if (this.isgs && this.OoklaPrivateOndemand && !type) {

      request["type"] = "ookla-private"; //true;

      if (test) {
        this.runSpeedTest = true;
        this.speedTestPost(request, true);
      }
    } else if (this.OoklaOndemand && !type) {


      request["type"] = "ookla-public";//false;
      if (test) {
        this.runSpeedTest = true;
        this.speedTestPost(request, false);
      }
    }
    else if ((this.CalixTR143Ondemand || this.StandardTr143) && type == 'TCP') {
      request["type"] = (this.CalixTR143Ondemand) ? 'calix_tr143' : 'tr143';
      this.popUpFor = '';
      if (test) {
        this.runSpeedTest = true;
        this.speedTestPost(request, true, type);
      }
    }
    else if (this.CalixUDPOndemand && type == 'UDP') {
      this.popUpFor = '';
      request["type"] = "calix_udp";
      if (test) {
        this.runSpeedTest = true;
        this.speedTestPost(request, true, type);
      }
    }
    else {
      if (test) {
        this.runSpeedTest = true;
        this.speedTestPost(request, false);
      }
    }

  }

  /*ooklaEndpointcheck() {

    this.dataChartService.speedTestPrivPolicy(this.orgId).subscribe((res: any) => {
      if (res) {
        if (res.ooklaApply) {
          this.isPrivateServerTest = true;
        }
        this.globalObj.ooklaEndpoint = res.ooklaEndpoint;
        if (res.ooklaEndpoint === null) {
          this.isgs = false
          // console.log("res.ooklaEndpoint is null so private test is false", res.ooklaEndpoint)
        }
        if (res.calixnetspeed == 'calix_tr143') {
          this.isspeediq = true
        }
        else {
          this.isspeediq = false
        }
        this.backgroundTestEnabled = res.backgroundTestEnabled ? res.backgroundTestEnabled : false;
        this.speedTestDsChart();
      }
    }, err => {

      if (err.status != 404) {
        this.pageErrorHandle(err);
      }
      else {
        this.speedTestDsChart();
      }
    })
  }*/
  speedTestPost(request, flag, type?) {
    this.isError = false;
    this.dataChartService.speedTest(request).subscribe((res: any) => {
      setTimeout(() => {
        this.runSpeedTest = false;
        if (flag) {
          this.runSpeedTest = true;
          if (this.OoklaOndemand && !type) {
            const request = {
              // "orgId": this.orgId,
              "sn": this.serialNumberSelected,
              "type": "ookla-public"//false
            };
            setTimeout(() => {
              this.speedTestPost(request, false);
            }, 30000);
          }
          else {
            this.runSpeedTest = false;
          }
          if (type == 'TCP') this.bgFilter('TCP');
          else if (type == 'UDP') this.bgFilter('UDP');
          else this.bgFilter('Private');

          sessionStorage.setItem("createTimeofspeedtest", res.timestamp);
          this.latbgDS = this.byteToMegaByte(res.ds || 0, 1, 1000);
          this.latbgUS = this.byteToMegaByte(res.us || 0, 1, 1000);
          //this.latDSM = res.dsLevel;
          this.globalObj.bgspeedPerc = (res.dsLevel || 0) < (res.usLevel || 0) ? res.dsLevel : res.usLevel;
          this.globalObj.bgdwSpeedLevel = res.dsLevel ? '(' + (res.dsLevel == 1 ? this.language['Bad'] : res.dsLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';
          this.globalObj.bgupSpeedLevel = res.usLevel ? '(' + (res.usLevel == 1 ? this.language['Bad'] : res.usLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';
          this.bgRes = true;
          this.odRes = false;
          /*if (this.OoklaPrivateOndemand) {
            this.runSpeedTest = false;
          }*/
        } else {
          this.bgRes = false;
          this.odRes = true;
          // if (!this.OoklaPrivateOndemand || (!this.isgs && this.OoklaPrivateOndemand)) {
          // this.odFilter('both');
          this.odFilter('Public');

          this.latodDS = this.byteToMegaByte(res.ds || 0, 1, 1000);
          this.latodUS = this.byteToMegaByte(res.us || 0, 1, 1000);
          //this.latDSM = res.dsLevel;
          this.globalObj.odspeedPerc = (res.dsLevel || 0) < (res.usLevel || 0) ? res.dsLevel : res.usLevel;
          this.globalObj.oddwSpeedLevel = res.dsLevel ? '(' + (res.dsLevel == 1 ? this.language['Bad'] : res.dsLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';
          this.globalObj.odupSpeedLevel = res.usLevel ? '(' + (res.usLevel == 1 ? this.language['Bad'] : res.usLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';

        }
        //this.speedTestChart();
        //this.speedTestLevelSetter(res);
        this.latDS = this.byteToMegaByte(res.ds || 0, 1, 1000);
        this.latUS = this.byteToMegaByte(res.us || 0, 1, 1000);
        //this.latDSM = res.dsLevel;
        this.globalObj.speedPerc = (res.dsLevel || 0) < (res.usLevel || 0) ? res.dsLevel : res.usLevel;
        this.globalObj.dwSpeedLevel = res.dsLevel ? '(' + (res.dsLevel == 1 ? this.language['Bad'] : res.dsLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';
        this.globalObj.upSpeedLevel = res.usLevel ? '(' + (res.usLevel == 1 ? this.language['Bad'] : res.usLevel == 2 ? this.language['OK'] : this.language['Good']) + ')' : '';
      }, 30000);
      //this.latUSM = res.usLevel;
      //this.serviceLatest();
    }, err => {
      this.runSpeedTest = false;
      let message;
      if (err?.error?.errorMessage == `EXOS can not be found in database by fsn(${this.serialNumberSelected})`) {
        message = { message: 'Error retrieving Speed Test results. Please ensure the device is online and configured with the right SPID' }
      } else if (err?.error?.error == `The manual speed test is not available for this country`) {
        message = { message: this.language['speedtest not available for country'] }
      }
      else {
        message = err;
      }
      this.pageErrorHandle(message);
    });
  }
  speedTestChart() {
    //this.loader = true;
    this.dataChartService.speedTestPublicChart(this.orgId, this.serialNumberSelected, 10).subscribe((res: any) => {
      //this.loader = false;
      if (this.ssoService.getCscType() !== 'DME' && this.modelName.indexOf('813G') == -1 && this.modelName.indexOf('812G') == -1) {
        setTimeout(() => {
          Highcharts.chart('speedTestChart', this.speedTestOption(res || []));
          //this.speedTestValueSetter(res);
        }, 2000);
      }
    }, err => {
      //this.loader = false;
      this.pageErrorHandle(err);
    });
  }
  showSpeedTestChart = false;
  speedTestDsChart() {
    // To show chart condition check based on count and capabilty values..
    this.showSpeedTestChart = ((this.CalixTR143Ondemand || this.StandardTr143 || this.speedTestStates?.tcp > 0)
      || (this.CalixUDPOndemand || this.speedTestStates?.udp > 0)
      || (this.OoklaOndemand || this.speedTestStates?.ookla_public > 0)
      || (this.OoklaPrivateOndemand || this.speedTestStates?.ookla_private > 0));

    if (this.scopesFlag.runSpeedTestRead) {
      /*if ((this.OoklaOndemand) || this.manufacturer != 'Calix' && this.manufacturer != 'MSTC' && this.manufacturer != 'ALPHA') {
        this.odFilter(''); //public 
      }
      else {
        this.bgFilter('')
      }*/
      if ((this.CalixTR143Ondemand || this.StandardTr143) || this.speedTestStates?.tcp > 0) this.bgFilter('TCP');
      else if (this.CalixUDPOndemand || this.speedTestStates?.udp > 0) this.bgFilter('UDP');
      else if (this.OoklaOndemand || this.speedTestStates?.ookla_public > 0) this.odFilter('Public');
      else if (this.OoklaPrivateOndemand || this.speedTestStates?.ookla_private > 0) this.bgFilter('Private');
      // else this.odFilter('Public');
      //this.latencyTestChart();

    }
  }

  odFilter(type) {
    this.chartTabSelection(type);
    $('#usod').css("font-weight", "Bold");
    $('#dsod').css("font-weight", "Bold");
    // $('#dsod').css("color", "#1A1F22");
    $('#usbg').css("font-weight", "normal");
    $('#dsbg').css("font-weight", "normal");
    // $('#dsbg').css("color", "#1A1F22");
    this.bgRes = false;
    this.odRes = true;
    this.isOndemand = true;
    this.uploadIsOndemand = true;
    this.avgandwan = true;
    //console.log('884', this.manufacturer, this.manufacturer != 'Calix' && this.manufacturer != 'MSTC');
    if (this.ssoService.getCscType() !== 'DME' && this.modelName.indexOf('813G') == -1 && this.modelName.indexOf('812G') == -1) {
      if (this.manufacturer != 'Calix' && this.manufacturer != 'MSTC' && this.manufacturer != 'ALPHA') {
        this.dataChartService.speedTestThirdPartyChart(this.orgId, this.serialNumberSelected, 7).subscribe((Res: any) => {
          if (Res?.length > 0) {
            Highcharts.chart('speedTestDownloadChart', this.speedTestDsOption(Res.reverse() || [], this.language['Download Speed'], this.language['Download Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
            Highcharts.chart('speedTestUploadChart', this.speedTestDsOption(Res || [], this.language['Upload Speed'], this.language['Upload Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
          }
          else {
            let defaultres = [{ "id": "", "ds": null, "dsLevel": 3, "dsTier": null, "us": null, "usLevel": 3, "usTier": null, "serverHost": "", "phyLinkRate": null, "hitCpuLimit": null, "aveDownloadRate": null, "aveUploadRate": null, "trigger": "null", "type": "null", "createTime": null }]

            Highcharts.chart('speedTestDownloadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Download Speed'], this.language['Download Speed'] + ` (${this.language['Public Server Test']})`, 'public'));

            Highcharts.chart('speedTestUploadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Upload Speed'], this.language['Upload Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
          }
          //this.loader = true;
          this.avgandwan = false;
          this.overviewApi();

        }, err => { this.pageErrorHandle(err); });
      } else {
        this.loader = true;
        this.dataChartService.speedTestPublicChart(this.orgId, this.serialNumberSelected, 7).subscribe((Res: any) => {
          this.loader = false;
          this.avgandwan = false;
          if (Res?.length > 0) {
            //this.loader = false;
            this.totalUploadspeed = Math.round(Res[0].aveUploadRate);
            this.totalDownloadspeed = Math.round(Res[0].aveDownloadRate);
            let isGigaSpireModel = this.modelName
            let softwareVersion = this.softwareVersion
            // Res.forEach((element, i) => {
            //   /*  element.aveDownloadRate = i + 100
            //    element.aveUploadRate = i + 50; */
            //   this.totalDownloadspeed = element.aveDownloadRate
            //   this.totalUploadspeed = element.aveUploadRate
            //   // this.count++;
            // });
            // this.totalDownloadspeed = Math.round(this.totalDownloadspeed / this.count)
            // this.totalUploadspeed = Math.round(this.totalUploadspeed / this.count)
            Highcharts.chart('speedTestDownloadChart', this.speedTestDsOption(Res.reverse() || [], this.language['Download Speed'], this.language['Download Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
            Highcharts.chart('speedTestUploadChart', this.speedTestDsOption(Res || [], this.language['Upload Speed'], this.language['Upload Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
          }
          else {
            let defaultres = [{ "id": "", "ds": null, "dsLevel": 3, "dsTier": null, "us": null, "usLevel": 3, "usTier": null, "serverHost": "", "phyLinkRate": null, "hitCpuLimit": null, "aveDownloadRate": null, "aveUploadRate": null, "trigger": "null", "type": "null", "createTime": null }]

            Highcharts.chart('speedTestDownloadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Download Speed'], this.language['Download Speed'] + ` (${this.language['Public Server Test']})`, 'public'));

            Highcharts.chart('speedTestUploadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Upload Speed'], this.language['Upload Speed'] + ` (${this.language['Public Server Test']})`, 'public'));
          }

          this.avgandwan = false;

          //this.loader = true;
          this.overviewApi();
        }, err => {
          this.loader = false;
          this.pageErrorHandle(err);
        });
      }
    }
  }

  bgFilter(type) {
    this.chartTabSelection(type);
    $('#usod').css("font-weight", "normal");
    $('#dsod').css("font-weight", "normal");
    // $('#dsod').css("color", "#1A1F22");
    $('#usbg').css("font-weight", "Bold");
    $('#dsbg').css("font-weight", "Bold");
    //  $('#dsbg').css("color", "#1A1F22");
    this.bgRes = true;
    this.odRes = false;
    this.isOndemand = false;
    this.uploadIsOndemand = false;
    this.avgandwan = true;
    // if (this.ssoService.getCscType() !== 'DME' && this.modelName.indexOf('813G') == -1 && this.modelName.indexOf('812G') == -1 && ((this.isgs && this.OoklaPrivateOndemand) || this.CalixTR143Ondemand || this.StandardTr143 || this.CalixUDPOndemand)) {
    //   this.dataChartService.speedTestTcp_UdpChart(this.orgId, this.serialNumberSelected, 7, type).subscribe((Res: any) => {

    if (this.ssoService.getCscType() !== 'DME' && this.modelName.indexOf('813G') == -1 && this.modelName.indexOf('812G') == -1) {
      this.dataChartService.speedTestTcp_UdpChart(this.orgId, this.serialNumberSelected, 7, type).subscribe((Res: any) => {
        this.loader = false;
        let speedTestTitle = (type == 'TCP') ? this.language['TCP Server Test'] : (type == 'UDP') ? this.language['UDP Server Test'] : this.language['Private Server Test'];

        // this.backgroundTestEnabled = Res.backgroundTestEnabled ? Res.backgroundTestEnabled : false;
        if (Res?.length > 0) {
          //this.loader = false;
          this.totalUploadspeed = Math.round(Res[0].aveUploadRate);
          this.totalDownloadspeed = Math.round(Res[0].aveDownloadRate);
          let isGigaSpireModel = this.modelName
          let softwareVersion = this.softwareVersion
          Highcharts.chart('speedTestDownloadChart', this.speedTestDsOption(Res.reverse() || [], this.language['Download Speed'], this.language['Download Speed'] + ` (${speedTestTitle})`, type));
          Highcharts.chart('speedTestUploadChart', this.speedTestDsOption(Res || [], this.language['Upload Speed'], this.language['Upload Speed'] + ` (${speedTestTitle})`, type));
        }
        else {
          let defaultres = [{ "id": "", "ds": null, "dsLevel": 3, "dsTier": null, "us": null, "usLevel": 3, "usTier": null, "serverHost": "", "phyLinkRate": null, "hitCpuLimit": null, "aveDownloadRate": null, "aveUploadRate": null, "trigger": "background", "type": "ookla", "createTime": null }]
          Highcharts.chart('speedTestDownloadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Download Speed'], this.language['Download Speed'] + ` (${speedTestTitle})`, type));
          Highcharts.chart('speedTestUploadChart', this.speedTestDsOptiondefaultchart(defaultres, this.language['Upload Speed'], this.language['Upload Speed'] + ` (${speedTestTitle})`, type));
        }
        // if (Res?.length > 0) {

        //   Res.forEach((element, i) => {
        //     /* element.aveDownloadRate = i + 100
        //     element.aveUploadRate = i + 50 */
        //     this.totalDownloadspeed += element.aveDownloadRate
        //     this.totalUploadspeed += element.aveUploadRate
        //     this.count++
        //   });
        //   this.totalDownloadspeed = Math.round(this.totalDownloadspeed / this.count)
        //   this.totalUploadspeed = Math.round(this.totalUploadspeed / this.count)
        // }

        this.overviewApi();
      }, err => {
        this.loader = false;
        this.pageErrorHandle(err);
      });
    }
    else {
      let defaultres = [{ "id": "", "ds": null, "dsLevel": 3, "dsTier": null, "us": null, "usLevel": 3, "usTier": null, "serverHost": "", "phyLinkRate": null, "hitCpuLimit": null, "aveDownloadRate": null, "aveUploadRate": null, "trigger": "background", "type": "ookla", "createTime": null }]

      Highcharts.chart('speedTestDownloadChart', this.speedTestDsOptiondefaultchart(defaultres, "", "", 'Private'));
      Highcharts.chart('speedTestUploadChart', this.speedTestDsOptiondefaultchart(defaultres, "", "", 'Private'));

    } this.avgandwan = false;
  }

  speedTestDsOption(chartData, testType, modifiedTitle, chartType): any {
    let xAxisValue = [], y1title = '', y2title = '', y2AxisValue = [], color = { 0: '#C70000', 1: '#C70000', 2: 'rgba(252, 114, 53)', 3: '#82BF00' };
    let data = [], data1: any = [], TcpData: any = [], UdpData: any = [];
    const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';
    //let levelsAvail = res.map((obj, i) => obj[DUevel]);
    let tooltip;
    const supportsGsRg = this.ssoService.supportsGsRg();
    chartData.map((obj, i) => {
      //const phyToolTipData = '<tr><th> ' + this.language['Physical Link Rate'] + ': </th><td style="padding-left: 10px;">' + (obj['phyLinkRate'] === null ? 0 : obj['phyLinkRate']) + (obj['phyLinkRate']>=1000?' Gbps':' Mbps' )+'</td></tr>'

      let phylinkdatafromservice = (obj['phyLinkRate']) ? obj['phyLinkRate'] : 0
      let phylink = phylinkdatafromservice >= 1000 ? phylinkdatafromservice / 1000 + " Gbps" : phylinkdatafromservice + " Mbps"

      const phyToolTipData = '<tr><th> ' + this.language['Physical Link Rate'] + ': </th><td style="padding-left: 10px;">' + phylink + '</td></tr>'
      if (chartType == "public") {
        const level = obj[DUevel];
        const date = new Date(obj.createTime);
        const tooltipText = (testType.includes(this.language['Download Speed'])) ? 'Download Speed' : 'Upload Speed';
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];

        let dsorusvalue = (value ? (Math.round((value / 1000) * 100) / 100) : null)
        let dsustooltip = `<tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> ${dsorusvalue} Mbps</td></tr>`
        let speedtesttypevalue = (obj.type == 'ookla') ? 'Ookla' : (obj.type == 'calix_tr143') ? 'SpeedIQ' : (obj.type)?.charAt(0).toUpperCase() + (obj.type)?.slice(1)
        let speedtesttypetooltip = `<tr><th>Speed Test Type: </th><td style="padding-left: 10px;">${speedtesttypevalue}</td></tr>`
        if (obj.type == 'ookla') { this.testtypeforlogo = true } //if test type ookla need to show ookla logo

        if (value && (this.manufacturer != 'Calix' && this.manufacturer != 'MSTC' && this.manufacturer != 'ALPHA')) {

          tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
            <tr><th>${tooltipText}: </th><td style="padding-left: 10px;">{point.dsorusvalue} Mbps</td></tr>`


        } else if (this.ssoService.exosVersionCheck('22.4')) {

          tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>`
          tooltip += `{point.dsusdisplayvalue}`;
          tooltip += `{point.speestesttype}`;
          /* if(obj.type!='ookla' && value ){
             tooltip += `<tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> {point.dsorusvalue}</td></tr>`
           }*/
        }
        else {
          tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>`
        }
        // tooltip += `<tr><th>FQDN:</th><td style="padding-left: 3px;">{point.serverHost}</td></tr>`;


        /* if (value && (this.manufacturer != 'Calix' && this.manufacturer != 'MSTC')) {
           
             if((level == 31)||(level==32))
             {
               tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
               <tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> ${(Math.round((value / 1000) * 100) / 100)} Mbps</td></tr>
               <tr ><th>${this.language.Phylinkrate}: </th><td style="padding-left: 10px;"> {point.phylinkrate} </td></tr>`
             }
             else{
               tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
               <tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> ${(Math.round((value / 1000) * 100) / 100)} Mbps</td></tr>`
             }
           
           }
         
           else if (!value && (this.manufacturer == 'Calix' || this.manufacturer == 'MSTC')&& ((level == 31)||(level==32)))
            {
             tooltip = `<tr><th>${this.language.baseline_tier}:</th><td ">{point.tier} Mbps</td></tr>
             <tr ><th>${this.language.Phylinkrate}: </th><td > {point.phylinkrate} </td></tr>`   
         /*  }
           else{
             tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>`
         
           }*/

        xAxisValue.push((`${(date.getMonth() < 9 ? '0' : '')}${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getFullYear().toString().substring(2)} ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`).trim());
        /* if(this.isspeediq && this.ssoService.exosVersionCheck('22.4'))
         {
          data1.push({
            x: i,
            y: (value ? (Math.round((value / 1000) * 100) / 100) : null),
            color: color[((level == 31) || (level == 32) ? 3 : level)],
            level: ((level == 31) || (level == 32) ? 3 : level),
            tier: (obj[(testType.includes('Download') || testType.includes('Débit de téléchargement')) ? 'dsTier' : 'usTier'] || '-'),
            notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
            notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
            phy: supportsGsRg ? (obj?.hitCpuLimit == 1 ? phyToolTipData : '') : ((level == 31) || (level == 32) ? phyToolTipData : '')
          });
  
         }
         
         else{*/
        data.push({
          x: i,
          y: (level ? 4 : null),
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          level: ((level == 31) || (level == 32) ? 3 : level),
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          phy: supportsGsRg ? (obj?.hitCpuLimit == 1 ? phyToolTipData : '') : ((level == 31) || (level == 32) ? phyToolTipData : ''),
          dsorusvalue: (value ? (Math.round((value / 1000) * 100) / 100) + ' Mbps' : null),
          speestesttype: (obj.type) ? speedtesttypetooltip : '',
          dsusdisplayvalue: (obj.type != 'ookla' && value) ? dsustooltip : '',
          serverHost: obj.serverHost
        });
      }
      else if (chartType == "Private") {
        const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';
        const tooltipText = (testType.includes(this.language['Download Speed'])) ? 'Download Speed' : 'Upload Speed';
        const level = obj[DUevel];
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];
        const bdatetemp = new Date(obj.createTime);
        tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
                     <tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> {point.y} Mbps</td></tr>
                     `
        tooltip += `<tr><th>${this.language.server}:</th><td style="padding-left: 3px;">{point.serverHost}</td></tr>`;
        xAxisValue.push(`${(bdatetemp.getMonth() < 9 ? '0' : '')}${bdatetemp.getMonth() + 1}/${bdatetemp.getDate() < 10 ? '0' : ''}${bdatetemp.getDate()}/${bdatetemp.getFullYear().toString().substring(2)} ${bdatetemp.getHours() < 10 ? '0' : ''}${bdatetemp.getHours()}:${bdatetemp.getMinutes() < 10 ? '0' : ''}${bdatetemp.getMinutes()}`);
        data1.push({
          x: i,
          y: (value ? (Math.round((value / 1000) * 100) / 100) : null),
          level: level,
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          phy: supportsGsRg ? (obj?.hitCpuLimit == 1 ? phyToolTipData : '') : ((level == 31) || (level == 32) ? phyToolTipData : ''),
          serverHost: obj.serverHost
        });
      }
      else if (chartType == "TCP") {
        const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';
        const tooltipText = (testType.includes(this.language['Download Speed'])) ? 'Download Speed' : 'Upload Speed';
        const level = obj[DUevel];
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];
        const bdatetemp = new Date(obj.createTime);
        tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
                     <tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> {point.y} Mbps</td></tr>
                     `
        tooltip += `<tr><th>${this.language.server}:</th><td style="padding-left: 3px;">{point.serverHost}</td></tr>`;
        xAxisValue.push(`${(bdatetemp.getMonth() < 9 ? '0' : '')}${bdatetemp.getMonth() + 1}/${bdatetemp.getDate() < 10 ? '0' : ''}${bdatetemp.getDate()}/${bdatetemp.getFullYear().toString().substring(2)} ${bdatetemp.getHours() < 10 ? '0' : ''}${bdatetemp.getHours()}:${bdatetemp.getMinutes() < 10 ? '0' : ''}${bdatetemp.getMinutes()}`);
        TcpData.push({
          x: i,
          y: (value ? (Math.round((value / 1000) * 100) / 100) : null),
          level: level,
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          phy: supportsGsRg ? (obj?.hitCpuLimit == 1 ? phyToolTipData : '') : ((level == 31) || (level == 32) ? phyToolTipData : ''),
          serverHost: obj.serverHost
        });
      }
      else if (chartType == "UDP") {
        const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';
        const tooltipText = (testType.includes(this.language['Download Speed'])) ? 'Download Speed' : 'Upload Speed';
        const level = obj[DUevel];
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];
        const bdatetemp = new Date(obj.createTime);
        tooltip = `<tr><th>${this.language.baseline_tier}:</th><td style="padding-left: 3px;">{point.tier} Mbps</td></tr>
                     <tr><th>${tooltipText}: </th><td style="padding-left: 10px;"> {point.y} Mbps</td></tr>
                     `
        tooltip += `<tr><th>${this.language.server}:</th><td style="padding-left: 3px;">{point.serverHost}</td></tr>`;
        xAxisValue.push(`${(bdatetemp.getMonth() < 9 ? '0' : '')}${bdatetemp.getMonth() + 1}/${bdatetemp.getDate() < 10 ? '0' : ''}${bdatetemp.getDate()}/${bdatetemp.getFullYear().toString().substring(2)} ${bdatetemp.getHours() < 10 ? '0' : ''}${bdatetemp.getHours()}:${bdatetemp.getMinutes() < 10 ? '0' : ''}${bdatetemp.getMinutes()}`);
        UdpData.push({
          x: i,
          y: (value ? (Math.round((value / 1000) * 100) / 100) : null),
          level: level,
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          phy: supportsGsRg ? (obj?.hitCpuLimit == 1 ? phyToolTipData : '') : ((level == 31) || (level == 32) ? phyToolTipData : ''),
          serverHost: obj.serverHost
        });
      }

      tooltip += `{point.phy}`;
      tooltip += `{point.notOriginal}`;
      tooltip += `{point.notOriginal2}`;

    });
    const self = this;

    if ((data1 || TcpData || UdpData).length > 0) {
      y2title = this.language.Speed + ' (Mbps)'
    } else {
      y2title = '';
    }
    if (data.length > 0) {
      y1title = this.language['Speed vs Baseline']
    } else {
      y1title = '';
    }
    let charOption = {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      /*  chart: {
          type: 'spline',
          scrollablePlotArea: {
              minWidth: 600,
              scrollPositionX: 0
          }
      },*/
      title: {
        text: `${modifiedTitle}`,
        align: 'left',
        //margin: 50,
        style: {
          fontSize: "16px",
          color: '#1A1F22',
          fontWeight: 600,
          fontFamily: 'Source Sans Pro',
        }
      },
      /* subtitle: {
         text: `${modifiedsubTitle}`,
         align: 'left',
         style: {
         fontSize:"14px",
         color:'#808080',
         fontWeight:400, 
         fontFamily: 'Source Sans Pro',
       }      
     },*/
      xAxis: {
        categories: xAxisValue,
        padding: '5px',
        labels: {
          overflow: false,
          rotation: -65,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        }

      },

      tooltip: {
        useHTML: true,
        headerFormat: '<table>',

        pointFormat: tooltip,
        footerFormat: '</table>',
        //followPointer: true
      },
      yAxis: [{

        title: {
          text: y1title,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
        padding: '5px',
        gridLineWidth: 1,
        tickAmount: 4,
        labels: {
          formatter: function (element) {
            //console.log('y axis = ', this.pos, element);
            //return ['', self.language['Bad'], self.language['OK'], self.language['Good'], ''][(this.pos)];
            let val = ['', self.language['Bad'], self.language['OK'], self.language['Good']];
            if (element?.axis?.tickPositions?.length > 0) {
              let index = element.axis.tickPositions.indexOf(this.pos);
              for (let i = 0; i < data?.length; i++) {
                if (data[i].level == 1) {
                  data[i].y = element.axis?.tickPositions[1];
                } else if (data[i].level == 2) {
                  data[i].y = element.axis?.tickPositions[2];
                } else if (data[i].level == 3) {
                  data[i].y = element.axis?.tickPositions[3];
                }
              }
              if (index != -1) {
                return val[index];
              }
            }
          },
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },

        }
      }, {
        opposite: true,
        tickAmount: 4,
        padding: '5px',
        title: {
          text: y2title,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
        labels: {
          format: '{value} Mbps',
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
      }],
      series: [{
        type: 'scatter',
        data: data,
        name: 'On-Demand Public Server Test',
        marker: {
          symbol: 'square',
          shadow: false,
          radius: 10
        },
        color: 'black',
      },
      {
        name: 'Private Server Test',
        color: '#0278FF',
        data: data1,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 10
        },
        //color: 'black',
        states: {
          hover: {
            color: '#a4edba',
            borderColor: 'gray'
          }
        },
        yAxis: 1,
      },
      {
        name: 'TCP Server Test',
        color: '#0278FF',
        data: TcpData,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 10
        },
        //color: 'black',
        states: {
          hover: {
            color: '#a4edba',
            borderColor: 'gray'
          }
        },
        yAxis: 1,
      },
      {
        name: 'UDP Server Test',
        color: '#0278FF',
        data: UdpData,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 10
        },
        //color: 'black',
        states: {
          hover: {
            color: '#a4edba',
            borderColor: 'gray'
          }
        },
        yAxis: 1,
      }
      ],
    }

    if (chartType == "UDP" || chartType == "TCP") delete charOption.yAxis[1].opposite;

    return charOption;

  }
  speedTestDsOptiondefaultchart(chartData, testType, modifiedTitle, chartType): any {
    let xAxisValue = [], y1title = '', y2title = '', y2AxisValue = [], color = { 0: '#C70000', 1: '#C70000', 2: 'rgba(252, 114, 53)', 3: '#82BF00' }, data = [], data1 = [];
    const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';


    chartData.map((obj, i) => {


      if (chartType == "public") {
        const level = obj[DUevel];
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];



        data.push({
          x: i,
          y: (level ? 4 : null),
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          level: ((level == 31) || (level == 32) ? 3 : level),
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),

        });
      }

      else if (chartType == "Private" || chartType == "TCP" || chartType == "UDP") {
        const DUevel = (testType.includes(this.language['Download Speed'])) ? 'dsLevel' : 'usLevel';
        const level = obj[DUevel];
        const DUVAlue = (testType.includes(this.language['Download Speed'])) ? 'ds' : 'us';
        const value = obj[DUVAlue];
        data1.push({
          x: i,
          y: (value ? (Math.round((value / 1000) * 100) / 100) : null),
          level: level,
          color: color[((level == 31) || (level == 32) ? 3 : level)],
          tier: (obj[(testType.includes(this.language['Download Speed'])) ? 'dsTier' : 'usTier'] || '-'),
          notOriginal: (level == 31 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),
          notOriginal2: (level == 32 ? `<tr><td colspan='2'>Max testable ${DUevel.includes('ds') ? 'Downstream' : 'Upstream'} Speed Test result achieved</td></tr>` : ''),


        });
      }

    });
    const self = this;

    if (data1.length > 0) {
      y2title = this.language.Speed + ' (Mbps)'
    } else {
      y2title = '';
    }
    if (data.length > 0) {
      y1title = this.language['Speed vs Baseline']
    } else {
      y1title = '';
    }
    return {
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },


      title: {
        text: `${modifiedTitle}`,
        align: 'left',
        //margin: 50,
        style: {
          fontSize: "16px",
          color: '#1A1F22',
          fontWeight: 600,
          fontFamily: 'Source Sans Pro',
        }
      },


      xAxis: {
        categories: xAxisValue,
        padding: '5px',
        labels: {
          overflow: false,
          rotation: -65,
          enabled: false,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        }

      },

      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        enabled: false,
        pointFormat: "",
        footerFormat: '</table>',
        //followPointer: true
      },
      yAxis: [{

        title: {
          text: y1title,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
        padding: '5px',
        gridLineWidth: 1,
        tickAmount: 4,
        labels: {
          formatter: function (element) {
            //console.log('y axis = ', this.pos, element);
            //return ['', self.language['Bad'], self.language['OK'], self.language['Good'], ''][(this.pos)];
            let val = ['', self.language['Bad'], self.language['OK'], self.language['Good']];
            if (element?.axis?.tickPositions?.length > 0) {
              let index = element.axis.tickPositions.indexOf(this.pos);
              for (let i = 0; i < data?.length; i++) {
                if (data[i].level == 1) {
                  data[i].y = element.axis?.tickPositions[1];
                } else if (data[i].level == 2) {
                  data[i].y = element.axis?.tickPositions[2];
                } else if (data[i].level == 3) {
                  data[i].y = element.axis?.tickPositions[3];
                }
              }
              if (index != -1) {
                return val[index];
              }
            }
          },
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },

        }
      }, {
        opposite: true,
        tickAmount: 4,
        padding: '5px',
        title: {
          text: y2title,
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
        labels: {
          format: '{value} Mbps',
          style: {
            fontSize: 14,
            fontFamily: 'Source Sans Pro',
            fontWeight: 'normal',
            fontstyle: 'normal',
            lineheight: 18,
            textalign: 'left',
            color: '#1A1F22'
          },
        },
      }],
      series: [{
        type: 'scatter',
        data: data,
        name: 'On-Demand Public Server Test',
        showInLegend: false,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false
            }
          },
          symbol: 'square',
          shadow: false,
          radius: 10
        },
        color: 'black',
      },
      {
        name: 'Private Server Test',
        color: '#0278FF',
        data: data1,
        marker: {
          symbol: 'circle',
          shadow: false,
          radius: 10
        },
        //color: 'black',
        states: {
          hover: {
            color: '#a4edba',
            borderColor: 'gray'
          }
        },
        yAxis: 1,
      }],



    }

  }

  latencyTestChart() {
    //this.loader = true;
    this.globalObj.latencyCreateTime = '';
    this.dataChartService.latencyTestChart(this.orgId, this.serialNumberSelected, 7).subscribe((res: any) => {
      if (res.length) {
        const timeCheck = (((new Date().getTime()) - (res[0]?.createTime ? res[0]?.createTime : (new Date().getTime()))) / 1000);
        //const overtime = timeCheck > 3600 ? 'over ' : '';
        const [overtime, connectingTime, time] = this.dataChartService.timeSetter(res[0]?.createTime, timeCheck);
        const isHour = (res[0]?.createTime && (((new Date().getTime()) - (res[0]?.createTime)) / 1000) >= 3600);
        let connectime = this.language[connectingTime]
        let ranTime = '';
        if (sessionStorage.getItem('defaultLanguage') === 'en') {
          ranTime = `(${this.language.Ran} ${overtime + time.toString()} ${connectime} ${this.language.Ago})`;
        } else if (sessionStorage.getItem('defaultLanguage') === 'fr') {
          ranTime = `(${this.language.Ran} ${this.language.Ago} ${overtime} ${time.toString()} ${connectime} )`;
        }
        this.globalObj.triggerType = !['background', 'command-iq'].includes(res[0]['trigger']);
        this.globalObj.latencyPacketsSent = res[0]['packetsSent'];
        this.globalObj.latencyPacketsReceived = res[0]['packetsReceived'];
        this.globalObj.latencyLoss = res[0]['packetsSent'] && res[0]['packetsReceived'] ?
          100 - ((this.globalObj.latencyPacketsReceived / this.globalObj.latencyPacketsSent) * 100) : 100
        this.globalObj.latencyCreateTime = ranTime;
        this.globalObj.latency = res[0]['latency'];

        this.dataChartService.setLatencyTabInfo({
          time: (overtime + time.toString() + ' ' + connectime),
          latencyMessage: `Latency Test ran ${(overtime + time.toString() + ' ' + connectime) || '0'} seconds ago - ${res?.latency || 0}ms`,
        });

        $("#serviceLatencyTime").text(`Latency Test ${ranTime} - ${res[0]['latency']}ms`);
      }
      Highcharts.chart('latencyTestChart', this.latencyTestOption(res || []));
    }, err => {
      //this.loader = false;
      this.globalObj.latencyCreateTime = '';
      this.pageErrorHandle(err);
    });
  }

  serviceLatest() {
    this.dataChartService.serviceTabInfo(this.orgId, this.serialNumberSelected).subscribe(
      (res: any) => {

      },
      (err) => {
        this.globalObj.isSpeedTestRan = false;
        this.pageErrorHandle(err);
      }
    );
  }

  latencyTest() {
    this.runLatencyTest = true;
    const request = {
      // "orgId": this.orgId,
      "sn": this.serialNumberSelected
    };

    this.isError = false;
    this.dataChartService.latencyTest(request).subscribe((res: any) => {
      this.runLatencyTest = false;
      this.latencyTestChart();
    }, err => {
      //console.log('600', err.errorMessage);
      this.runLatencyTest = false;
      let message;
      if (err.error.errorMessage == `EXOS can not be found in database by fsn(${this.serialNumberSelected})`) {
        message = { message: 'Error retrieving Speed Test results. Please ensure the device is online and configured with the right SPID' }
      } else {
        message = err;
      }
      this.pageErrorHandle(message);
    });
  }
  speedTestValueSetter(res) {
    if (res.length && res[res.length - 1]?.createTime) {
      this.globalObj.isSpeedTestRan = true;
      const timeCheck = (((new Date().getTime()) - (res[res.length - 1]?.createTime ? res[res.length - 1]?.createTime : (new Date().getTime()))) / 1000);
      const [overtime, connectingTime, time] = this.dataChartService.timeSetter(res[res.length - 1]?.createTime, timeCheck);
      let connectime = this.language[connectingTime]
      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        this.dataChartService.setServiceTabInfo({
          down: this.byteToMegaByte(res[res.length - 1]?.downloadSpeed || 0, 1),
          up: this.byteToMegaByte(res[res.length - 1]?.uploadSpeed || 0, 1),
          time: (overtime + time.toString() + ' ' + connectime),
          speedMessage: `${this.language.Speed_Test_ran_sentence} ${(time.toString() + ' ') || '0'} ${connectime} ${this.language.Ago}`,
          isHour: (res[res.length - 1]?.createTime && timeCheck >= 3600)
        });
      }
      else if (sessionStorage.getItem('defaultLanguage') != 'en') {
        this.dataChartService.setServiceTabInfo({
          down: this.byteToMegaByte(res[res.length - 1]?.downloadSpeed || 0, 1),
          up: this.byteToMegaByte(res[res.length - 1]?.uploadSpeed || 0, 1),
          time: (overtime + time.toString() + ' ' + connectime),
          speedMessage: `${this.language.Speed_Test_ran_sentence} ${time.toString() + ' '} ${connectime} `,
          isHour: (res[res.length - 1]?.createTime && timeCheck >= 3600)
        });
      }

      const isHour = (res[res.length - 1]?.createTime && (((new Date().getTime()) - (res[res.length - 1]?.createTime)) / 1000) >= 3600);
      this.latDS = this.byteToMegaByte(res[res.length - 1]?.downloadSpeed || 0, 1, 1000);
      this.latUS = this.byteToMegaByte(res[res.length - 1]?.uploadSpeed || 0, 1, 1000);
      if (parseInt(this.ssoService.getServiceDownSpeed())) {
        this.latDSM = ((this.latDS / parseInt(this.ssoService.getServiceDownSpeed() || 0)) * 100).toFixed(2);
        this.globalObj.speedPerc = (this.latDSM >= 75 && this.latDSM <= 80) ? 2 : (this.latDSM < 75 ? 1 : 3);
        this.latUSM = ((this.latUS / parseInt(this.ssoService.getServiceDownSpeed() || 0)) * 100).toFixed(2);

      } else {
        this.latDSM = 0;
        this.latUSM = 0;
        this.globalObj.speedPerc = 0
      }
      if (sessionStorage.getItem('defaultLanguage') === 'en') {
        this.latrun = `(${this.language.Ran} ${overtime + time.toString()} ${connectime} ${this.language.Ago})`;
      } else if (sessionStorage.getItem('defaultLanguage') === 'fr') {
        this.latrun = `(${this.language.Ran} ${this.language.Ago} ${time.toString()} ${connectime} )`;

      }

      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        $("#serviceTimeLatest").text(
          `${this.language.Speed_Test_ran_sentence} ${time.toString()} ${connectime}  ${this.language.Ago}`
        );
      }
      else if (sessionStorage.getItem('defaultLanguage') != 'en') {
        $("#serviceTimeLatest").text(
          `${this.language.Speed_Test_ran_sentence} ${time.toString()} ${connectime} `
        );
      }

      $("#serviceDownloadLatest").text(`${this.latDS}`);
      $("#serviceUploadLatest").text(`${this.latUS}`);
    } else {
      this.globalObj.isSpeedTestRan = false;
    }
  }

  speedTestLevelSetter(res) {
    if (res && res.length && res[0]?.createTime) {
      const latestRes = res[0], level = { 3: this.language['Good'], 2: this.language['OK'], 1: this.language['Bad'] };
      this.globalObj.isSpeedTestRan = true;
      const createTimeofspeedtest = JSON.parse(sessionStorage.getItem("createTimeofspeedtest"))
      const lasttimecheck = (((new Date().getTime()) - (createTimeofspeedtest ? createTimeofspeedtest : (new Date().getTime()))) / 1000);
      const timeCheck = (((new Date().getTime()) - (latestRes?.createTime ? latestRes?.createTime : (new Date().getTime()))) / 1000);
      //console.log("latestRes?.createTime, timeCheck",latestRes?.createTime, timeCheck)
      //const [overtime, connectingTime, time] = this.dataChartService.timeSetter(latestRes?.createTime, timeCheck);
      const [overtime, connectingTime, time] = this.dataChartService.timeSetter(createTimeofspeedtest, lasttimecheck);
      let connectime = this.language[connectingTime]
      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        this.dataChartService.setServiceTabInfo({
          down: level[latestRes['dsLevel']] || '',
          up: level[latestRes['usLevel']] || '',
          time: (overtime + time.toString() + ' ' + connectime),
          speedMessage: `${this.language.Speed_Test_ran_sentence} ${(time.toString() + ' ') || '0'} ${connectime} ${this.language.Ago}`,
          isHour: (latestRes?.createTime && timeCheck >= 3600)
        });
      }
      else if (sessionStorage.getItem('defaultLanguage') != 'en') {
        this.dataChartService.setServiceTabInfo({
          down: level[latestRes['dsLevel']] || '',
          up: level[latestRes['usLevel']] || '',
          time: (overtime + time.toString() + ' ' + connectime),
          speedMessage: `${this.language.Speed_Test_ran_sentence} ${time.toString() + ' '} ${connectime} `,
          isHour: (latestRes?.createTime && timeCheck >= 3600)
        });
      }

      const isHour = (latestRes?.createTime && (((new Date().getTime()) - (latestRes?.createTime)) / 1000) >= 3600);
      //this.latDS = this.byteToMegaByte(latestRes?.ds || 0, 1);
      //this.latUS = this.byteToMegaByte(latestRes?.us || 0, 1);
      /* if (parseInt(this.ssoService.getServiceDownSpeed())) {
        this.latDSM = ((this.latDS / parseInt(this.ssoService.getServiceDownSpeed() || 0)) * 100).toFixed(2);
        this.globalObj.speedPerc = (this.latDSM >= 75 && this.latDSM <= 80) ? 2 : (this.latDSM < 75 ? 1 : 3);
        this.latUSM = ((this.latUS / parseInt(this.ssoService.getServiceDownSpeed() || 0)) * 100).toFixed(2);

      } else {
        this.latDSM = 0;
        this.latUSM = 0;
        this.globalObj.speedPerc = 0
      } */

      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        this.latrun = `(${this.language.Ran} ${overtime + time.toString()} ${connectime} ${this.language.Ago})`;
      }
      else if (sessionStorage.getItem('defaultLanguage') == 'fr') {
        this.latrun = `(${this.language.Ran} ${this.language.Ago} ${overtime} ${time.toString()} ${connectime} )`;
      }

      if (sessionStorage.getItem('defaultLanguage') == 'en') {
        $("#serviceTimeLatest").text(
          `${this.language.Speed_Test_ran_sentence} ${time.toString()} ${connectime}  ${this.language.Ago}`
        );
      }
      else if (sessionStorage.getItem('defaultLanguage') != 'en') {
        $("#serviceTimeLatest").text(
          `${this.language.Speed_Test_ran_sentence} ${time.toString()} ${connectime} `
        );

      }



      $("#serviceDownloadLatest").text(`${level[latestRes['dsLevel']] || '-'}`);
      $("#serviceUploadLatest").text(`${level[latestRes['usLevel']] || '-'}`);
    } else {
      this.globalObj.isSpeedTestRan = false;
    }
  }

  getL2Security() {
    this.globalObj.l2Res = [];
    this.globalObj.l2sValue = 0;
    this.globalObj.l2Loader = true;
    this.globalObj.l2Alert = false;
    this.dataChartService.getL2SecurityData(this.orgId, this.serialNumberSelected).subscribe(res => {
      this.globalObj.l2Loader = false;
      if (res && Object.keys(res).length) {
        this.globalObj.l2Res = Object.values(res);
        this.l2sData = Object.values(res)[0] || {};
        /* this.l2sData.MacffStation = [];
        let ubj = [];
        for (let i = 0; i < 15; i++) {
          ubj.push({
            PortInterface: 1,
            MACAddress: 1,
            IPAddress: 1,
            IPAddressMask: 1,
            IPGateway: 1
          })
        }
        this.l2sData.MacffStation = ubj; */

        /*   this.l2sData.DhcpLease = [];
          let ubj = [];
          for (let i = 0; i < 1; i++) {
            ubj.push({
              PortInterface: 1,
              ChAddress: 1,
              IPAddress: 1,
              IPAddressMask: 1,
              IPGateway: 1,
              DhcpServer: 1,
              ExpiryTime: 1632829836,
              BirthDate: 1632829836,
              LastRenewal: 1632829836,
              Discovers: 1,
              Requests: 1,
              Informs: 1,
              Acks: 1,
              Offers: 1
            });
          }
          this.l2sData.DhcpLease = ubj; */
      } else {
        this.globalObj.l2Message = "No L2 Security Available.";
        this.globalObj.l2Alert = true;
        this.l2sTab = 0;
      }

      this.dataFlag = true;
      this.dataleaseFlag = true;
    }, err => {
      this.dataFlag = true;
      this.dataleaseFlag = true;
      this.globalObj.l2Loader = false;
      this.globalObj.l2Message = "No L2 Security Available.";
      this.globalObj.l2Alert = true;
      this.l2sTab = 0;
      this.pageErrorHandle(err);
    });
  }

  l2sOptionChange(event) {
    //console.log('Event = ' + event);

  }
  CalixTR143Ondemand: boolean = false;
  CalixUDPOndemand: boolean = false;
  StandardTr143: boolean = false;
  speedTestStates: any = {};
  popUpFor = '';
  speedTestAvailability() {

    /* this.speedtestByCountry = undefined;
     this.dataChartService.getSpeedTestAvailability(this.orgId, this.serialNumberSelected).subscribe((res: any) => {
       //this.isspeediq = false
       this.speedtestByCountry = res ? res?.speedtestByCountry : false;
       this.speedTestProtocol = (res?.protocol == 'Ookla' ? true : false);
       this.speedTestProtocolCheck = res?.protocol;
       if (res && res?.speedtestSupported) {
         this.speedtestSupported = res?.speedtestSupported
         this.ooklaEndpointcheck()
         // this.speedTestDsChart();
 
       }
       if (this.ssoService.acceptGSModel(this.modelName) || (this.modelName.indexOf('GM') > -1)) {
 
         //console.log("1467, GS,GM", this.modelName)
         this.isgs = true
       }
       else {
         // console.log("1471,GC,", this.modelName)
         this.isgs = false
       }
 
     }, err => {
       this.pageErrorHandle(err);
     });*/

    // new API for availablity..
    if (this.ssoService.acceptGSModel(this.modelName) || (this.modelName.indexOf('GM') > -1)) {

      //console.log("1467, GS,GM", this.modelName)
      this.isgs = true
    }
    else {
      // console.log("1471,GC,", this.modelName)
      this.isgs = false
    }
    let SubscriberId = this.ssoService.getCSCSubscriberId();
    let subsId = SubscriberId === 'undefined' ? undefined : SubscriberId;
    if (this.serialNumberSelected) {

      this.dataChartService.speedTestAvailabilityCount(this.serialNumberSelected).subscribe((res: any) => {
        this.speedTestStates = res;
      })

      this.dataChartService.getSpeedTestCapability(this.serialNumberSelected).subscribe((res: any) => {
        if (res) {
          this.OoklaOndemand = res?.OoklaOndemand;
          this.OoklaPrivateOndemand = res?.OoklaPrivateOndemand;
          this.CalixTR143Ondemand = res?.CalixTR143Ondemand;
          this.StandardTr143 = res?.StandardTr143;
          this.CalixUDPOndemand = res?.CalixUDPOndemand;
          this.speedtestByCountry = res.SpeedtestByCountry;
        }
        this.speedTestDsChart();//need a confirmation when we need to call
      }, err => {
        this.pageErrorHandle(err);
      });
    };

    this.latencyTestChart();
  }

  isSpeedTestAvail() {
    let speedTestAvailability = this.speedtestByCountry ? this.speedtestByCountry : false;
    this.isSTAvailable = !speedTestAvailability && !this.OoklaOndemand
    let restrictrunspeedtest = !speedTestAvailability && !this.OoklaOndemand && !this.OoklaPrivateOndemand
    return (!restrictrunspeedtest)
  }


  resetBaseline() {
    this.runSpeedTest = true;
    const request = {
      // orgId: this.orgId,
      sn: this.serialNumberSelected
    }
    this.dataChartService.resetBaseline(request).subscribe((res: any) => {
      this.runSpeedTest = false;
      this.speedTestAvailability();
    }, err => {
      this.runSpeedTest = false;
      this.pageErrorHandle(err);
    });
  }

  downSpeedCheck() {
    return sessionStorage.getItem('dataDownspeed')
  }
  overviewApi() {
    //this.loader = true;
    /* var Devices = JSON.parse(this.ssoService.getSerialNo());
     var SubscriberId = this.ssoService.getCSCSubscriberId();
     var serialNo = [];
     Devices.forEach(element => {
       if (element.serialNumber) {
         var newElement = {};
         newElement["serialNumber"] = element.serialNumber;
         newElement["opMode"] = element.opMode;
         if (element.hasOwnProperty("ont")) {
           newElement["isOnt"] = true;
           newElement["ontSerialNumber"] = (element?.ont?.serialNo || '');
           newElement["vendorId"] = (element?.ont?.vendorId || '');
         }
         serialNo.push(newElement);
       }
     });
     let data = {
       "subscriberId": SubscriberId,
       "devices": serialNo
     }
     //sessionStorage.setItem('overviewStatus', 'isLoading');
     this.dataChartService.putOverview(this.orgId, data).subscribe((res: any) => {
       console.log("putOverview", typeof(res),res)
      
       //console.log("459 inside res", res);
       this.loader = false;
       if (res) {
         //$('.ssidcount').text(res.networkStatus.ssid.activeSSIDCount);
         if (res && res?.networkStatus?.lastSpeedTestResult) {
           this.speedTestLevelSetter(res?.networkStatus?.lastSpeedTestResult);
         }
       }
     }, err => {  //let data = this.service.getOverview();
       this.loader = false;
       this.pageErrorHandle(err);
     });*/
    let responseofoverview = sessionStorage.getItem('responseofoverview')
    let parsedresponseofoverview = JSON.parse(responseofoverview)
    let lastspedtestresult = parsedresponseofoverview?.networkStatus?.lastSpeedTestResult

    if (parsedresponseofoverview) {
      if (parsedresponseofoverview && parsedresponseofoverview?.networkStatus?.lastSpeedTestResult) {
        this.speedTestLevelSetter(parsedresponseofoverview?.networkStatus?.lastSpeedTestResult);
      }
    }
  }

  loadL2Security() {
    setTimeout(() => {
      this.rerender();
      this.getL2Security();

    }, 1000)
  }

  rerender() {
    this.dataLoaderFlag = true;
    this.dataFlag = false;
    this.dataleaseFlag = false;

    setTimeout(() => {

      this.dataFlag = true;
      setTimeout(() => {
        this.dataLoaderFlag = false;
        this.dataleaseFlag = true;
      }, 300)

    }, 500)
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptionStation.language = this.frTable;
      this.dtL2Lease.language = this.frTable;
      this.dtL2Options.language = this.frTable;
    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptionStation.language = this.esTable;
      this.dtL2Lease.language = this.esTable;
      this.dtL2Options.language = this.esTable;
    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptionStation.language = this.germanTable;
      this.dtL2Lease.language = this.germanTable;
      this.dtL2Options.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptionStation.language;
    }
  }
  /////////////////////ont data service //////////////////////////////////////////

  getAllSubsServicesData() {
    //debugger;
    let subsId
    let SubscriberId = this.ssoService.getCSCSubscriberId();
    subsId = SubscriberId === 'undefined' ? undefined : SubscriberId
    if (!subsId) {
      return
    }
    this.loader = true;

    this.allSubsServicesDataSubs = this.dataChartService.getDetailedSubscriberServices(SubscriberId).subscribe((res: any) => {
      this.getservicestatus();
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          if (services[i].type === 'data') {
            this.dataservice = services[i] ? services[i] : {};
          }
        }
        this.servicesData = this.dataservice
        this.dataser = this.servicesData;
        this.usoc = this.dataservice?.usoc;
        // this.ONTipaddressCheck();
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
    })
  }

  getservicestatus() {

    this.loader = true;
    var SubscriberId = this.ssoService.getCSCSubscriberId();
    this.dataChartService.servicestatusapicall(SubscriberId).subscribe((res: any) => {
      const interfaceId = (res?.dataServices || []).filter(el => el.interface).map(el => el.interface)?.[0];
      if (interfaceId && this.opModeWithOnt) this.getFlagShowAsm(interfaceId);
      this.loader = false;
      if (res) {
        if (res?.dataService) {
          res.dataService = res?.dataService?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.voiceServices) {
          res.voiceServices = res?.voiceServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {
          let isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== isAutomaticallyCreatedData?.serviceId);
        }

        if (res && res.dataServices && res.dataServices.length) {
          let l = res?.dataServices?.length - 1

          this.dataService = res.dataServices[0] ? res?.dataServices[0] : {};
          if (res.dataServices.length > 1) {
            let ontData = res?.dataServices?.find(element => element.cpeType == "ONT");
            this.dataService = ontData ? ontData : this.dataService;
          }
        } else {
          this.dataService = {};
        }

        res.dataServices?.forEach(obj => {
          if (obj.cpeType == 'ONT') {

            //this.enablestatus = obj.subSvcState //== 'Successfully Provisioned' ? 'True' : 'False'
            this.ontusoc = obj.usoc
            this.bandwidthtiers(obj.usoc)
          }
        });
        let ontStatus = '', rgStatus = '', ontError = '', rgError = '', unknownStatus = '', onknownError = '';
        res?.dataServices?.forEach((element) => {
          if (element.cpeType == 'RG') {
            rgStatus += ((rgStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            rgError += ((rgError ? ', ' : '') + element.errorDetails);
          } else if (element.cpeType === 'ONT') {
            ontStatus += ((ontStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            ontError += ((ontError ? ', ' : '') + element.errorDetails);

          } else if (element.cpeType === 'UNKNOWN') {
            unknownStatus += ((unknownStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
            onknownError += ((onknownError ? ', ' : '') + element.errorDetails);
          }
        });
        this.enablestatus = (ontStatus && rgStatus) ? ontStatus + ', ' + rgStatus : (ontStatus) ? ontStatus + (unknownStatus ? ', ' : '') + (unknownStatus ? unknownStatus : '') : rgStatus ? rgStatus + (unknownStatus ? ', ' : '') + (unknownStatus ? unknownStatus : '') : unknownStatus ? unknownStatus : '';
      } else {
        this.dataService = {};

      }
      this.ONTipaddressCheck();
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.dataService = {};

    });
  }

  ONTipaddressCheck() {
    this.IpAddressNewOnt = [];
    const deviceInfo = JSON.parse(sessionStorage.getItem('calix.deviceData'));
    deviceInfo?.forEach(element => {
      this.ONTIpaddress = element.serialNumber ? element?.serialNumber : element?.deviceId
      let subId = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
      if (element?.hasOwnProperty("ont") && ((this.dataService?.usoc || this.usoc) && (!this.dataser?.staticIpAddress && !this.dataService?.staticIpAddress)
        && (!this.dataService?.pppoeUsername && !this.dataser?.pppoeUsername))) {
        this.supportWifiService.getONTIpaddress(this.orgId, this.ONTIpaddress).subscribe((res: any) => {
          let aggrGroupValue = ((res?.aggGroup || '').replace(/-/g, '').replace(/0/g, '').length)
          if (!aggrGroupValue) {
            this.IpAddressNewOnt.push(res?.ipAddress);
          }
          if (aggrGroupValue) {
            this.supportWifiService.getONTIpAddressAggrId(res.aggGroup, this.orgId).subscribe((resp: any) => {
              resp?.forEach(element => {
                if (element?.ipPreference == "PRIMARY_IP" && element?.ipAddress) {
                  this.IpAddressNewOnt.push(element?.ipAddress);
                  this.IpAddressNewOnt = [...new Set(this.IpAddressNewOnt)]
                }
              });
            })
          }
        })
      }
    });

  }

  bandwidthtiers(usoc) {
    this.loader = true;
    this.dataChartService.servicedefinitionsapicall().subscribe((res: any) => {
      this.loader = false;
      res?.forEach(obj => {
        if (obj.name == usoc && obj.tierName) {
          this.loader = true;
          this.dataChartService.bandwidthtiers(obj.tierName).subscribe((res: any) => {
            this.loader = false;
            this.downstream = res.downstreamPir / 1000
            this.upstream = res.upstreamPir / 1000

          }, err => {
            this.loader = false;
            this.pageErrorHandle(err);
          });

        }
      });
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });

  }




  getStatusColor() {
    return this.wanInfoToDisplay.ConnectionStatus == 'Connected'
      ? 'green'
      : (this.hasBackupWANConfigured && this.backupWANText == 'Connected via Network Resilience'
        ? 'orange'
        : (this.wanInfoToDisplay.ConnectionStatus == "N/A"
          ? 'black'
          : 'red'))
  }

  showConnectionStatus() {
    return this.wanInfoToDisplay.ConnectionStatus == 'Connected'
      ? (this.language[this.wanInfoToDisplay.ConnectionStatus] || '-')
      : (this.hasBackupWANConfigured
        ? this.language[this.backupWANText]
        : (this.language[this.wanInfoToDisplay.ConnectionStatus] || this.wanInfoToDisplay.ConnectionStatus || ""))
  }
  activeTab = 'Public';
  chartTabSelection(type) {
    if (type == 'TCP') this.activeTab = 'TCP';
    if (type == 'UDP') this.activeTab = 'UDP';
    if (type == 'Public') this.activeTab = 'Public';
    if (type == 'Private') this.activeTab = 'Private';
  }

  getAsmDetails(uuid, oiName) {
    this.loader = true;
    this.asmData = {};
    this.supportService.getAsmData(uuid, oiName).subscribe((res: any = {}) => {
      this.loader = false;
      res.state = res?.state ? res?.state.replace(/-/g, ' ') : '-';
      this.asmData = res;
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });
  }

}
