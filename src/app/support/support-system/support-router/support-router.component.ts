declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportRouterService } from './services/support-router.service';
import { PortForwardingApplicationService } from './services/port-forwarding-application.service';
import { DataServiceService } from '../../data.service';
import { Subject, forkJoin, combineLatest, of } from 'rxjs';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
//var parseString = require('xml2js').parseString;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

import { HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { JsonViewerService } from './services/json-viewer.service';
import { truncate } from 'fs/promises';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { NewPortForwardingModel } from '../../shared/models/port-forwarding-new.model';
import { extractHostname, IpPattern } from '../../shared/service/utility.class';
import { catchError, filter, map } from 'rxjs/operators';
import { ValidatorService } from 'src/app-services/validator.services';
import { LanHostModel } from '../../shared/models/lan-host.model';
import { downloadLogUrl } from '../../shared/service/endpoints';
import * as md5 from 'md5';

import * as Highcharts from "highcharts";
import { VariableBinding } from '@angular/compiler';
import { Title } from '@angular/platform-browser';

require('highcharts/highcharts-more.js')(Highcharts);

@Component({
  selector: 'app-support-router',
  templateUrl: './support-router.component.html',
  styleUrls: ['./support-router.component.scss']
})
export class SupportRouterComponent implements OnInit, OnDestroy {

  @ViewChild('pingModel', { static: true }) private pingModel: TemplateRef<any>;
  @ViewChild('tracerouteModel', { static: true }) private tracerouteModel: TemplateRef<any>;
  @ViewChild('devicelogsModal', { static: true }) private devicelogsModal: TemplateRef<any>;
  @ViewChild('dataModal', { static: true }) private dataModal: TemplateRef<any>;
  @ViewChild('eventhistoryModal', { static: true }) private eventhistoryModal: TemplateRef<any>;
  @ViewChild('factoryresetModal') public factoryresetModal: TemplateRef<any>;
  @ViewChild('resetconfirmModal', { static: true }) private resetconfirmModal: TemplateRef<any>;
  @ViewChild('communicationModel', { static: true }) private communicationModel: TemplateRef<any>;
  @ViewChild('exportDetails', { static: true }) private exportDetails: TemplateRef<any>;
  @ViewChild('dhcpserverModal', { static: true }) private dhcpserverModal: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @ViewChild('reboot', { static: false }) public rebootDeviceBtn: ElementRef<any>;
  @ViewChild('updateSoftwareModal', { static: false }) private updateSoftwareModal: ElementRef<any>;


  dataModel: any = [];
  eventTableData: any = [];
  CLTableData: any = [];
  respPF: any = [];
  pingValidHostIP: any = "host";
  portObj: any;
  swImageCount: any
  isError = false;
  loader = false;
  isSuccess = false;
  ipError: any;
  loading1: boolean = false;
  pfDeleteModalRef = false;
  xmldatafromservice: any;
  dmzModelUpdate: any;
  groupSelected: any = {};
  combineLatest: any;
  deviceInfo: any = {};
  dhcpData: any = {};
  toogle: any;
  dmzData: any = {};
  userName: any;
  password: any;
  downloadsn: any;
  clCount: any;
  formatt: any;
  beginningaddress: any;
  downloadUrl: any;
  portForwardingData: any;
  countReceived: any;
  dhcpModel: any;
  isontconfigured: boolean;
  warningMessage = '';
  dmzModel = {
    Enable: false,
    IPAddress: '',
    applicationInput: 'dev',
    applicationInputSelDef: 'dev',
    applicationDeviceSelected: '',
    applicationIpAddress: '',
    applicationSelected: {},
    application: [],
    applicationDevice: [],
  };

  pfNewEntry = {
    name: '',
  }
  portIndex = '';
  newPortModel: any;
  dataModelSelected = {};

  routerSerialNumber = '';
  groups = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  basic_item = [
    { label: 'Wan connection1', value: 'Wan connection1' },
    { label: 'Wan connection2', value: 'Wan connection2' },
  ];


  language: any;
  languageSubject;
  dataCount: number | string;
  filterCount: number | string = 0;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    serverSide: true,
    processing: false,
    dom: 'tipr',
  };
  dtEventHistoryOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    serverSide: true,
    processing: false,
    dom: 'tipr',
  };
  dtOptions1: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    serverSide: true,
    processing: false,
    dom: 'tipr',
  };

  sortBy: string;
  sortType: string;
  tableCounts;
  frTable: any;
  esTable: any
  germanTable: any;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    lengthChange: false,
    ordering: false,
  };
  backupDescription: any;
  isRestore;
  userEmail: any;
  isLocalTimeResponse: any = [];
  isTab: any;
  backupList: any = [];
  isFile = 'Backup';
  configurationList: any;
  successMessage = '';
  orgId: any;
  deviceData: any = [];
  dhcpSData: any = [];
  serialNumber: string;
  ipAddress: string;
  errorInfo: string;
  successInfo: string;
  error: boolean;
  success: boolean;
  pingTraceRouteDetails: any;
  dateStringReplace = /,/g;
  connected: any;
  octetLoader: boolean = false;
  modalLoader: boolean = false;
  isModalError: boolean = false;
  isDHCPFormError: boolean = false;
  modalWarningMessage: any;
  completionStatus: any[] = [];
  now: any;
  newPortForwarding: NewPortForwardingModel = new NewPortForwardingModel();
  ipPattern = IpPattern;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  lanHosting: LanHostModel[] = [];
  dataObj: any = {
    pingTracerouteDropData: [],
    applicationSelected: {},
    applicationInput: 'lan',
    applicationLanHost: [],
    applicationLanHostSelected: '',
    applicationIpAddress: '',
    applicationProtocol: [
      { label: "TCP", value: "TCP" },
      { label: "UDP", value: "UDP" },
      { label: "TCP/UDP", value: "TCP/UDP" },
    ],
    applicationProtocolSelected: 'TCP',
    commLogExpanded: []
  };
  deviceSelected: any = {};
  scopeFlag: any = {};
  apiSubscriber: any;
  updateToSW = "";
  ngbOptions = {};
  opmode: any;
  confirmMessage: boolean = false;
  isErrorClosed = false;
  metaData: any = {};
  confirmPingMessage: boolean = false;
  bootHappening: boolean;
  rbtStatus: boolean;
  confirmTraceRouteMessage: boolean = false;
  isModalSuccess = false;
  landportDetail: Object;
  refreshLoader: boolean = false;
  apiCallDone: boolean;
  lanportKey: any;
  l2sTab = 1;
  l2sData: any = {};
  loadTimeseriesChart: any;
  FromDate: any;
  ToDate: any
  routerNotReachable: any = 0;
  ontCount = [];
  iftypearr = [];
  ontRxPower;
  isOnt: boolean = false;
  ontSn: any = '';
  ontStatus;
  ontData: any = [];
  commLogStatus = false;
  device: any;
  oltRxPower: any;
  downstramoctet: any;
  upstreamoctet: any;
  dataModalErr: boolean = false;
  oltid;
  @Output() isRgModel = new EventEmitter<any>();
  newRouterView: boolean;
  AEPage: boolean;

  constructor(
    private routerService: SupportRouterService,
    private pfaService: PortForwardingApplicationService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private dataService: DataServiceService,
    private http: HttpClient,
    public sso: SsoAuthService,
    public ssoService: SsoAuthService,
    private jsonViewer: JsonViewerService,
    private router: Router,
    private fileExport: ExportExcelService,
    private validate: ValidatorService,
    private titleService: Title
  ) {
    this.getDhcpModel();
    this.getNewPortModel();
    this.userEmail = this.ssoService.getUsername();
    this.orgId = this.ssoService.getOrgId();
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE

  }



  ngOnInit(): void {
    // this.loadChart1();
    let ont = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    (ont || []).forEach(element => {
      if (element.hasOwnProperty('ont')) {
        this.oltid = element.ont.uuid
        this.ontCount.push(element.ont);
      }
    })
    this.getScopes();
    setTimeout(() => {
      $('.subscriber-trends-wrapper [aria-label="Close"]').hide();
    }, 0);
    let date = new Date();
    this.FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.ToDate = new Date();
    this.deviceData = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    const ontDevices = this.ontData = this.deviceData?.filter(obj => obj.hasOwnProperty('ont'));
    this.ontSn = ontDevices?.length ? ontDevices[0]?.serialNumber : '';
    this.isOnt = !!ontDevices?.length;
    this.ssoService.setActionLog('CSC', 'pageHit', 'Router', this.router.url, 'Router page loaded');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.getDhcpData()
    });
    this.isOnt = history.state?.isOnt ? true : (history.state?.isRouter ? false : this.isOnt);

    this.deviceData = this.deviceData?.filter(obj => obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
    this.opmode = this.deviceData?.opMode;
    /* if (this.deviceData.length) {
      const index = this.deviceData.findIndex(device =>device.opMode == "RG");
      if (index > -1) this.deviceData.splice(0, 0, this.deviceData.splice(index, 1)[0]);
    } */

    if ((this.deviceData?.length && this.deviceData[0]["serialNumber"]) || (this.ontData?.length && this.ontData[0]["serialNumber"])) {
      //this.initDataModel();
      const sno = sessionStorage.getItem(`${this.ssoService.getTabId()}calix.serialNo`) ? sessionStorage.getItem(`${this.ssoService.getTabId()}calix.serialNo`) : '';
      let serialNumber;
      if (sno != '') {
        serialNumber = sno ? sno : this.deviceData[0]["serialNumber"];
      } else {
        serialNumber = this.isOnt ? ontDevices[0].serialNumber : ((history.state?.isRouter || history.state?.serialNumber) ? history.state.serialNumber : this.deviceData[0]["serialNumber"]);
      }
      const tempDeviceData = this.deviceData.filter(obj => obj.serialNumber == serialNumber);
      const deviceData = tempDeviceData.length ? tempDeviceData[0] : (this.isOnt ? this.ontData[0] : this.deviceData[0]);
      sessionStorage.removeItem(`${this.ssoService.getTabId()}calix.serialNo`);
      this.isOnt ? this.loadOntData(serialNumber, deviceData) : this.loadData(serialNumber, deviceData);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (!this.loader) {
          clearInterval(interval);
          if (history.state?.isReboot) this.openOutModal(this.rebootDeviceBtn, true);
          if (history.state?.isRouter && history.state?.isUpgrade && this.scopeFlag.updateSWRead && this.metaData?.UpgradeSoftware?.supported) {
            this.openOutModal(this.updateSoftwareModal);
            this.updateToList();
          }
          if (history.state?.isRouter && history.state?.isFactoryReset && this.scopeFlag.factoryResetRead && this.metaData?.FactoryReset?.config?.supported) {
            this.factoryResetViaDeviceInfo();
          }
        } else if (i > 30) {
          clearInterval(interval);
        }
      }, 1000);
    }
    else {
      this.deviceData = [];
      this.isError = false;
      this.warningMessage = this.language["Device not found"]
    }
    this.apiCallDone = true;
    // this.loadChart();
  }

  initDataModel(isLoad = true) {
    let jsonElement = document.getElementById("jsonTree");
    $(jsonElement).html("");
    this.jsonViewer = new JsonViewerService();
    jsonElement.append(this.jsonViewer.getContainer());

    this.modalLoader = true;
    this.isModalError = false;
    this.dataObj.dataModalLoadDevice = false;
    if (!isLoad && this.dataModalErr) {
      this.loadDataModel();
      return;
    }
    const serviceCall = isLoad ?
      this.routerService.getDataModel(this.orgId, this.routerSerialNumber) :
      this.routerService.reloadDataModel(this.orgId, this.routerSerialNumber);
    serviceCall.subscribe((res: any) => {
      if (res) {
        this.modalLoader = false;
        this.dataModel = res.dataModel;
        this.jsonViewer.showJSON(this.arrayToJson(res.dataModel), true);
        this.dataObj.dataModelRanBefore =
          `${this.language['Load_Device_Model']} ${(new Date(res.createTime)).toLocaleString()}
        (${this.language['Device_Software']} ${res.softwareVersion})`;


        $("input[type='checkbox']").off("change");
        $("input[type='checkbox']").on("change", (event) => {
          this.dataModelSelection(event);
        });
      }
      if (!isLoad) this.initDataModel();
    }, err => {
      this.dataModel = [];
      this.modalLoader = false;
      const message = this.pageModalErrorHandle(err);
      if (message.indexOf("No device") == 0) {
        this.dataModalErr = true;
        this.dataObj.dataModalLoadDevice = true;
        this.pageModalErrorHandle({ message: this.language['Load_From_Device'] });
        this.isModalError = false;
        this.isModalSuccess = true;
      }
    });
  }

  loadDataModel() {
    this.dataModalErr = false;
    this.isModalError = false;
    this.isModalSuccess = false;
    this.dataObj.dataModalLoadDevice = false;
    this.modalLoader = true;
    this.routerService.loadDataModel(this.orgId, this.routerSerialNumber).subscribe((res: any) => {
      if (res) {
        this.modalLoader = false;
        this.initDataModel();
      }
    }, err => {
      this.modalLoader = false;
      this.pageModalErrorHandle(err);
    });
  }

  loadData(serialNumber, device) {
    if (device.opMode == 'RG') {
      this.titleService.setTitle(`${this.language['RG']} - ${this.language['System']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (device.opMode == 'WAP') {
      this.titleService.setTitle(`${this.language['Mesh']} - ${this.language['System']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
    this.newRouterView = this.sso.exosVersionCheck("22.2", true) && device.opMode == "RG";
    if (this.newRouterView) {
      this.routerSerialNumber = serialNumber;
      this.isRgModel.emit({ "sn": serialNumber, "device": device });
      return;
    } else this.isRgModel.emit(false);
    this.dataModalErr = false;
    this.isOnt = false;
    this.isError = false;
    this.isModalError = false;
    if (!serialNumber) return;
    this.deviceSelected = device;
    this.groupSelected = {};
    this.routerSerialNumber = serialNumber;
    if (!this.scopeFlag.settingRead) {
      this.sequentialApi();
      return;
    }
    this.loader = true;
    this.routerService.getConnectivityStatus(this.orgId, this.routerSerialNumber, true).subscribe((res: any) => {
      res.Uptime = this.dataService.timeToDays(res.Uptime);
      this.connected = res;
      this.sequentialApi();
    }, err => {
      this.connected = false;
      this.loader = false;
      this.metaData = this.dataService.getMetaData(this.routerSerialNumber);
      this.metaData ? (this.scopeFlag.settingRead ? this.getDeviceInfoDetails() : '') : this.getMetaData();
      if (err?.error?.status === "423 Locked") {
        this.pageErrorHandle(err);
        this.connected = undefined;
      }
      // this.getDmzData();
      //this.pageErrorHandle(err);
    });
  }

  sequentialApi() {
    this.metaData = this.dataService.getMetaData(this.routerSerialNumber);

    if (this.metaData) {
      if (this.scopeFlag.settingRead) this.getDeviceInfoDetails();
      if (this.objectExistence(this.metaData.LanPort) && this.scopeFlag.settingRead) this.getLandport(this.routerSerialNumber);
      if (this.objectExistence(this.metaData.DHCP) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getDhcpData();
      if (this.objectExistence(this.metaData.DMZ) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getDmzData();
      if (this.objectExistence(this.metaData.PortMapping) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getPortForwadingList();
    } else this.getMetaData();
  }

  getMetaData() {
    const tempSn = this.isOnt ? this.ontSn : this.routerSerialNumber;
    if (!tempSn) return;
    this.dataService.fetchMetaData(this.orgId, tempSn).subscribe((res: any) => {
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.dataService.setMetaData(tempSn, this.metaData);
      if (this.isOnt) {
        this.loadOntData(tempSn, this.ontData[0]);
      } else {
        if (this.scopeFlag.settingRead) this.getDeviceInfoDetails(this.metaData);
        if (this.objectExistence(this.metaData.LanPort) && this.scopeFlag.settingRead) this.getLandport(this.routerSerialNumber);
        if (!this.connected) return;
        if (this.objectExistence(this.metaData.DHCP) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getDhcpData();
        if (this.objectExistence(this.metaData.DMZ) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getDmzData();
        if (this.objectExistence(this.metaData.PortMapping) && this.deviceSelected.opMode == 'RG' && this.scopeFlag.settingRead) this.getPortForwadingList();
      }

    }, err => {
      if (this.isOnt) {
        this.dataService.setMetaData(tempSn, {});
        this.loadOntData(tempSn, this.ontData[0]);
      } else this.pageErrorHandle(err);
    });
  }

  reStructureMeta(obj) {
    this.metaData[obj.featureName.replace(/[.]/g, "")] = {};
    if (obj.hasOwnProperty("fields")) {
      obj.fields.forEach(element => {
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

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    $("input[type='checkbox']").off("change");
  }

  getDeviceInfoDetails(isRefresh = false) {

    this.routerService.getRouterDetails(this.orgId, this.routerSerialNumber, 'deviceinfo').subscribe((res: any) => {
      if (isRefresh) this.refreshLoader = false;
      if (this.deviceSelected.opMode != 'RG') this.loader = false;
      if (res['wanAccessType'] && res['wanAccessType'].includes('Brownfield')) {
        var wanAccessType = res['wanAccessType'].replace("Brownfield", "");
        res['wanAccessType'] = wanAccessType;
      }
      this.deviceInfo = res;
      if (!history.state?.isRouter) this.closeModal();
    }, err => {
      if (isRefresh) this.loader = false;
      err.hasPrefixedLabel = 'Router Details - ';
      this.pageErrorHandle(err);
    });

    if (!this.metaData?.RouterTemperature?.supported) return;
    /* if (this.deviceSelected.opMode == 'RG') {
      this.routerService.setMaxTempValue({});
      this.getTemperatureDetails(this.routerSerialNumber);
    } else {
      const maxVal = this.routerService.getMaxTempValue(this.routerSerialNumber);
      if (maxVal) {
        this.dataObj.maxTemp = maxVal;
      } else if (this.deviceData.length && this.deviceData[0]['opMode'] == 'RG') {
        this.getTemperatureDetails(this.deviceData[0]['serialNumber']);
      }
    } */
    this.getTemperatureDetails(this.routerSerialNumber);   //this.deviceSelected.opMode == 'RG' ? this.getTemperatureDetails(this.routerSerialNumber) : (this.dataObj.maxTemp = 0);
  }

  getTemperatureDetails(sn) {
    this.dataObj.maxTemp = '';
    this.routerService.getTemperatureDetails(sn, this.orgId).subscribe((res: any) => {
      if (res && Object.keys(res).length) {
        /* const maxTempList = Object.assign(
          {},
          ...res.map(obj => {
            const device = this.deviceData.filter(device => device.macAddress == obj.routerMac);
            if (device.length && obj.thermalList && obj.thermalList.length) {
              return {
                [device[0].serialNumber]: obj.thermalList.reduce((tempVal, currntVal) => tempVal > currntVal.sensorTempMax ? tempVal : currntVal.sensorTempMax)
              }
            }
          })
        );
        this.routerService.setMaxTempValue(maxTempList); */
        //this.dataObj.maxTemp = maxTempList[this.routerSerialNumber];
        this.dataObj.maxTemp = res?.TempMax;
      }
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  getDhcpData() {
    this.loader = true;
    this.routerService.getRouterDetails(this.orgId, this.routerSerialNumber, 'dhcp').subscribe((res: any) => {

      this.dhcpSData = res;
      if (res && res.DHCPLeaseTime != undefined) {
        let days, hrs, mnts, seconds;
        let totalSeconds = res.DHCPLeaseTime;
        seconds = parseInt(totalSeconds);
        days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;
        if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'en') {
          res.DHCPLeaseTimeConvertion = `${days ? days : 0} Days, ${hrs ? hrs : 0} Hours, ${mnts ? mnts : 0} Minutes`;
        } else {
          res.DHCPLeaseTimeConvertion = `${days ? days : 0} ${this.language['days']}, ${hrs ? hrs : 0} ${this.language['hours']}, ${mnts ? mnts : 0} ${this.language['Minutes']}`;
        }
      }

      const dnsServer = res.DNSServers ? res.DNSServers.split(",") : [];
      res.primaryDNSServer = dnsServer.length ? dnsServer[0] : 'N/A',
        res.secondaryDNSServer = dnsServer.length > 1 ? dnsServer[1] : 'N/A',
        this.dhcpData = res;
      this.toogle = res.DHCPServerEnable;
      if (!history.state?.isRouter) this.closeModal();
      this.loader = false;
    }, err => {
      /*if (err.status === 401) {
        this.warningMessage = this.language['Access Denied'];
      } else {
        this.warningMessage = this.sso.pageErrorHandle(err);
      }*/
      this.pageErrorHandle(err);
    });
  }

  getDmzData() {
    this.loader = true;
    this.routerService.getRouterDetails(this.orgId, this.routerSerialNumber, 'dmz').subscribe(res => {
      this.dmzData = res || {};
      //this.dmzData.Enable = (this.dmzData.Enable == 'true' || this.dmzData.Enable == true) ? 'true' : 'false';
      //this.dmzData.Enable = (this.dmzData?.Enable == true) ? 'true' : 'false'
      this.loader = false;
      if (!history.state?.isRouter) this.closeModal();
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  getPortForwadingList(action = '') {
    this.loader = true;
    this.respPF = [];
    this.routerService.getRouterDetails(this.orgId, this.routerSerialNumber, 'portforwarding').subscribe(resp => {
      if (resp) {
        let tempResp: any = {};

        Object.entries(resp).forEach(obj => {
          this.respPF.push(obj[1]);
          const name = obj[1]?.['PortMappingDescription'] + obj[1]?.['InternalClient'];
          const externalEnd = `${(!obj[1]?.ExternalPortEnd || obj[1]?.ExternalPort == obj[1]?.ExternalPortEnd) ? '' : `-${obj[1]?.ExternalPortEnd}`}`,
            internalPort = `${(!obj[1]?.InternalPort || obj[1]?.ExternalPort == obj[1]?.InternalPort) ? '' : `(${obj[1].InternalPort})`}`,
            portInfo = `${obj[1]?.PortMappingProtocol ? obj[1]?.PortMappingProtocol : ''}${obj[1]?.ExternalPort ? `:${obj[1]?.ExternalPort}` : ''}`,
            portName = `${portInfo}${externalEnd}${internalPort}`,
            valueObj = {
              PortMappingDescription: obj[1]?.PortMappingDescription,
              InternalClient: obj[1]?.InternalClient,
              portName: tempResp.hasOwnProperty(name) ? `${tempResp[name]?.value?.portName} ${portName.trim()}` : portName.trim()
            };
          if (tempResp.hasOwnProperty(name)) {
            tempResp[name]["key"].push(obj[0]);
            tempResp[name]["value"] = valueObj;
          } else {
            tempResp[name] = {};
            tempResp[name]["key"] = [obj[0]];
            tempResp[name]["value"] = valueObj;
          }
        });
        this.portForwardingData = Object.values(tempResp).reduce((obj, item: any) => Object.assign(obj, { [item.key.join(',')]: item.value }), {});
        this.loader = false;
        this.getNewPortModel();
      } else {
        this.portForwardingData = [];
      }
      if (action == 'delete') {
        this.portObj = null;
        this.pfDeleteModalRef = false;
      }
      if (!history.state?.isRouter) this.closeModal();
    }, err => {
      this.pageErrorHandle(err);
    });
  }

  updateDhcp() {
    let updateField = this.dhcpToogle();
    if (updateField.indexOf('HostName') != -1) {
    }
    let DHCPLeaseTime;
    this.modalLoader = true;
    let isDays = this.dhcpModel.days;
    let isHours = this.dhcpModel.hours;
    let isMinutes = this.dhcpModel.minutes;
    var daysSec = isDays * 24 * 60 * 60;
    var hoursSec = Math.floor(isHours * 60 * 60);
    var minutsSec = Math.floor(isMinutes * 60);
    DHCPLeaseTime = daysSec + hoursSec + minutsSec;
    let dnsServer, dnsPServer, dnsSServer;
    if (this.dhcpModel.secondaryDNSServer != 'N/A' && this.dhcpModel.secondaryDNSServer) {
      dnsSServer = this.dhcpModel.secondaryDNSServer
    }
    if (this.dhcpModel.primaryDNSServer != 'N/A' && this.dhcpModel.primaryDNSServer) {
      dnsPServer = this.dhcpModel.primaryDNSServer
    }
    dnsServer = [dnsPServer, dnsSServer].join(',')
    let dnsType;
    if ((this.dhcpModel.primaryDNSServer === '' && this.dhcpModel.secondaryDNSServer === '') ||
      (this.dhcpModel.primaryDNSServer === '0.0.0.0' && this.dhcpModel.secondaryDNSServer === '0.0.0.0') ||
      (this.dhcpModel.primaryDNSServer === '0.0.0.0' && this.dhcpModel.secondaryDNSServer === '') ||
      (this.dhcpModel.primaryDNSServer === '' && this.dhcpModel.secondaryDNSServer === '0.0.0.0') ||
      (this.dhcpModel.primaryDNSServer === 'N/A' && this.dhcpModel.secondaryDNSServer === 'N/A') ||
      (this.dhcpModel.primaryDNSServer === '0.0.0.0' && this.dhcpModel.secondaryDNSServer === 'N/A') ||
      (this.dhcpModel.primaryDNSServer === 'N/A' && this.dhcpModel.secondaryDNSServer === '0.0.0.0')) {
      dnsType = 'Dynamic'; //ZyXEL VMG4325/4381 support "LanDnsType"
    } else {
      dnsType = 'Static';
    }

    const dhcpReqObj = {
      HostName: this.dhcpModel.hostName,
      DeviceIPAddress: this.dhcpModel.deviceIpAddress,
      DomainName: this.dhcpModel.domainName,
      DHCPServerEnable: this.dhcpModel.dhcpServer,
      BeginningIPAddress: this.dhcpModel.beginningIpAddress,
      EndingIPAddress: this.dhcpModel.endingIpAddress,
      SubnetMask: this.dhcpModel.subnetMask,
      DHCPLeaseTime: DHCPLeaseTime,
      DNSServers: dnsServer,
      DNSType: dnsType
    };
    if (dnsServer.replace(',').trim() == "undefined") {
      dhcpReqObj.DNSServers = '';
    }
    if (updateField.indexOf('HostName') == -1) {
      delete dhcpReqObj.HostName;
    }
    if (updateField.indexOf('DeviceIPAddress') == -1) {
      delete dhcpReqObj.DeviceIPAddress;
    }
    if (updateField.indexOf('DomainName') == -1) {
      delete dhcpReqObj.DomainName;
    }
    if (updateField.indexOf('DHCPServerEnable') == -1) {
      delete dhcpReqObj.DHCPServerEnable;
    }
    if (updateField.indexOf('BeginningIPAddress') == -1) {
      delete dhcpReqObj.BeginningIPAddress;
    }
    if (updateField.indexOf('EndingIPAddress') == -1) {
      delete dhcpReqObj.EndingIPAddress;
    }
    if (updateField.indexOf('SubnetMask') == -1) {
      delete dhcpReqObj.SubnetMask;
    }
    if (updateField.indexOf('DHCPLeaseTime') == -1) {
      delete dhcpReqObj.DHCPLeaseTime;
    }
    if (updateField.indexOf('DNSServers') == -1) {
      delete dhcpReqObj.DNSServers;
    }
    if (updateField.length) {
      this.modalLoader = true;
      this.routerService.updateDhcp(this.orgId, this.routerSerialNumber, dhcpReqObj).subscribe(res => {
        //setTimeout(() => {
        this.getDhcpData();
        //}, 100000);
      }, err => {
        this.modalLoader = false;
        this.pageModalErrorHandle(err);
      });
    } else {
      this.modalLoader = true;
      this.getDhcpData();
    }
  }

  updateDmz() {
    this.loader = true;
    if (this.dmzModel.Enable == true) {
      this.dmzModelUpdate = {
        Enable: this.dmzModel.Enable,
        IPAddress: (this.dmzModel.applicationInput != 'ip') ? this.dmzModel.applicationDeviceSelected : this.dmzModel.applicationIpAddress
      }
    } else {
      this.dmzModelUpdate = {
        Enable: this.dmzModel.Enable,
        IPAddress: ''
      }
    }


    this.routerService.updateDmz(this.orgId, this.routerSerialNumber, this.dmzModelUpdate).subscribe(res => {
      this.loader = false;
      //this.isSuccess = true;
      // this.showDmz = false
      this.getDmzData();
    }, err => {
      this.isSuccess = false;
      this.pageErrorHandle(err);
    });
  }

  addNewPortForwarding() {
    let createPorts = [];
    let resPFFilter = [];
    let datafromselectedobj = [];
    let count = 0
    this.dataObj.applicationSelected.PortRange.forEach(obj => {
      count++
      resPFFilter = this.respPF.filter((objPF => {
        return (objPF.PortMappingDescription === this.dataObj.applicationSelected.PortMappingDescription && objPF.InternalClient === (this.dataObj.applicationInput == 'lan' ? this.dataObj.applicationLanHostSelected : this.dataObj.applicationIpAddress)) || (parseInt(objPF.ExternalPort) === obj.ExternalPort || parseInt(objPF.ExternalPortEnd) === obj.ExternalPortEnd);
        //ExternalPort check ExternalPortEnd if both same not allow  
        //objPF.ExternalPort old  obj.ExternalPort-new  


      }))
      if (!resPFFilter.length) {
        datafromselectedobj.push(
          {
            PortMappingEnabled: true,
            PortMappingDescription: this.dataObj.applicationSelected.PortMappingDescription,
            InternalClient: this.dataObj.applicationInput == 'lan' ? this.dataObj.applicationLanHostSelected : this.dataObj.applicationIpAddress,
            ExternalPort: obj.ExternalPort,
            ExternalPortEnd: obj.ExternalPortEnd,
            InternalPort: obj.InternalPort,
            PortMappingProtocol: obj.PortMappingProtocol
          }
        );

      }

    });

    if (count == datafromselectedobj.length) {
      for (let i = 0; i < datafromselectedobj.length; i++) {
        this.modalLoader = true;
        createPorts.push(
          this.routerService.createPortForwarding(this.orgId, this.routerSerialNumber, {
            PortMappingEnabled: datafromselectedobj[i].PortMappingEnabled,
            PortMappingDescription: datafromselectedobj[i].PortMappingDescription,
            InternalClient: datafromselectedobj[i].InternalClient,
            ExternalPort: datafromselectedobj[i].ExternalPort,
            ExternalPortEnd: datafromselectedobj[i].ExternalPortEnd,
            InternalPort: datafromselectedobj[i].InternalPort,
            PortMappingProtocol: datafromselectedobj[i].PortMappingProtocol
          })
        );
      }
    }
    else {
      this.isModalError = true;
      this.modalWarningMessage = this.language['Port_Forwarding_Conflicts'];
    }

    forkJoin(createPorts).subscribe(res => {
      this.modalLoader = false
      this.getPortForwadingList();
    }, err => {
      this.pageErrorHandle(err);
    });
  }
  addNewPortEntry() {
    let resPFFilter = [];
    if (this.newPortForwarding.ExternalPort && !this.newPortForwarding.ExternalPortEnd) {
      this.newPortForwarding.ExternalPortEnd = this.newPortForwarding.ExternalPort
    }
    if (this.newPortForwarding.ExternalPort && !this.newPortForwarding.InternalPort) {
      this.newPortForwarding.InternalPort = this.newPortForwarding.ExternalPort
    }
    if (this.newPortForwarding.PortMappingProtocol.includes("TCP/UDP")) {
      this.newPortForwarding.PortMappingProtocol = "TCP or UDP"
    }
    resPFFilter = this.respPF.filter((objPF => {
      return objPF.PortMappingDescription === this.newPortForwarding.PortMappingDescription && objPF.InternalClient === this.newPortForwarding.InternalClient && objPF.InternalPort === this.newPortForwarding.InternalPort;
    }))
    if (!resPFFilter.length) {
      this.modalLoader = true;
      this.isModalError = false;
      this.errorMsg = '';
      this.routerService.createPortForwarding(this.orgId, this.routerSerialNumber, this.newPortForwarding).subscribe(x => {
        this.modalLoader = false;
        this.showSuccess = true;
        this.successMsg = 'Successfully Created!'
        this.newPortForwarding = new NewPortForwardingModel();
        this.getPortForwadingList();
        this.closeModal();
      }, error => {
        this.modalLoader = false;
        this.errorMsg = error.error.error;
        this.showError = true;
      })
    } else {
      this.isModalError = true;
      this.modalWarningMessage = this.language['Port Forwarding Conflicts'];
    }
  }
  deletePortForwarding(index, action = '') {
    if (action) {
      this.loader = true;
      let deletePorts = [];
      index.split(',').forEach(ind => {
        deletePorts.push(this.routerService.deletePortForwading(this.orgId, this.routerSerialNumber, ind));
      });
      forkJoin(deletePorts).subscribe(res => {
        this.getPortForwadingList('delete');
      }, err => {
        this.pageErrorHandle(err);
      });
      /* this.routerService.deletePortForwading(this.orgId, this.routerSerialNumber, index).subscribe(res => {
        this.getPortForwadingList('delete');
      }, err => {
        this.pageErrorHandle(err);
      }); */
    } else {
      this.portObj = index;
      this.pfDeleteModalRef = true;
    }
  }

  updatePortData() {
    this.loader = true;
    this.routerService.updatePortForwarding(this.orgId, this.routerSerialNumber, this.newPortModel).subscribe(res => {
      this.getPortForwadingList();
    }, err => {
      this.pageErrorHandle(err);
    });
  }
  getEventCount(data) {
    this.modalLoader = true
    this.countReceived = false;
    this.routerService.eventCount(this.routerSerialNumber, this.orgId).subscribe((res: any) => {
      this.dataCount = res.count;
      //this.modalLoader = false;
      this.countReceived = true;
      if (data != "referesh") {
        this.eventPostData();
      } else if (data == "referesh") {
        this.modalLoader = false;
      }

    }, err => {
      this.pageErrorHandle(err);
    });
  }
  refereshData() {
    this.dataCount = undefined;
    this.getEventCount("referesh");
    this.reDraw();
  }
  reDraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  reteriveDeviceLog() {
    this.confirmMessage = false
    this.now = Date.now();
    this.modalLoader = true;
    this.dataObj.deviceLogError = false;
    this.dataObj.retrievedLog = false;
    this.dataObj.retrievedDate = Date.now();
    this.routerService.PostdeviceLog(this.routerSerialNumber, this.orgId).subscribe((res: any) => {
      this.userName = res.username;
      this.password = res.password;
      this.downloadsn = res.serialNumber;
      this.downloadUrl = res.downloadUrl.replace(extractHostname(res.downloadUrl) + "/files", `${environment.UI_BASE_URL}${downloadLogUrl}`)
      this.modalLoader = false;
      this.dataObj.retrievedLog = true;
      this.dataObj.retrievedDate = Date.now();
    }, err => {
      this.modalLoader = false;
      // this.isError = true;
      this.dataObj.retrievedDate = Date.now();
      this.dataObj.warningMessage = (err.status === 401)
        ? this.language['Access Denied']
        : this.dataService.pageErrorHandle(err);
      this.dataObj.deviceLogError = true;

    });
  }
  downloadLog() {
    let name = this.routerSerialNumber + '-logs.tar.gz';
    this.fileExport.exportFromUrl(this.downloadUrl, name, this.routerSerialNumber, this.userName, this.password);
  }
  eventPostData() {
    //this.modalLoader = true;
    const that = this;
    this.dtEventHistoryOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      order: [0, 'desc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;

        //that.callCount(dataTablesParameters.search.value);
        this.routerService.eventPost(this.routerSerialNumber, this.orgId, dataTablesParameters.start, dataTablesParameters.length, {
          "type": -1,
          "severity": 1,
          "timestamp": 1,
          "source": -1,
          "details": 1
        }).subscribe((resp: any) => {

          this.modalLoader = false;
          //that.eventTableData = resp;
          that.eventTableData = this.sortData(resp, that.sortBy, that.sortType);
          that.hideNoDataRow();
          //that.hideSearch();
          //that.dataAvailable = true;
          //setTimeout(() => {
          callback({
            recordsTotal: (that.dataCount != undefined) ? that.dataCount : 0,
            recordsFiltered: (that.dataCount != undefined) ? that.dataCount : 0,
            data: []
          });
          //}, 100);
        },
          (err: HttpErrorResponse) => {
            if (err.status == 404) {
              that.eventTableData = [];
              that.hideNoDataRow();
              //that.dataAvailable = true;
              setTimeout(() => {
                callback({
                  recordsTotal: (that.dataCount != undefined) ? that.dataCount : 0,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.dataCount,
                  data: []
                });
              }, 100);
            } else {
              this.pageErrorHandle(err);
              //this.dataAvailable = true;
            }
          });
      },

      columns: [{ data: 'Time' }, { data: 'Type' }, { data: 'Severity' }, { data: 'Source' }, { data: 'Details' }]
    };

    this.tableLanguageOptions();
  }
  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.sortByColumn(data, type, 'timestamp');
    } else if (by == 1) {
      sorted = this.sortByColumn(data, type, 'type');
    } else if (by == 2) {
      sorted = this.sortByColumn(data, type, 'severity');
    } else if (by == 3) {
      sorted = this.sortByColumn(data, type, 'source');
    } else if (by == 4) {
      sorted = this.sortByColumn(data, type, 'details');
    }
    return sorted;
  }


  sortByColumn(data, type, column): any {
    data.sort((a, b) => {
      if (column != 'timestamp' && column != 'details') {
        var nameA = a[column] ? a[column].toUpperCase() : '';
        var nameB = b[column] ? b[column].toUpperCase() : '';
      } else if (column == 'details') {
        if (a[column]) {
          var aKey = Object.keys(a[column])[0]
          var nameA: any = aKey.toUpperCase();
        } else {
          var nameA: any = ''
        }
        if (b[column]) {
          var bKey = Object.keys(b[column])[0];
          var nameB: any = bKey.toUpperCase();
        } else {
          var nameB: any = ''
        }
      }
      else {
        var nameA: any = a[column] ? Date.parse(a[column]) : '';
        var nameB: any = b[column] ? Date.parse(b[column]) : '';
      }

      if (type == 'asc') {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
      // names must be equal
      return 0;
    });

    return data;
  }

  getCLCount() {
    this.modalLoader = true;
    this.countReceived = false;
    this.routerService.getCLCount(this.routerSerialNumber, this.orgId).subscribe((res: any) => {
      this.modalLoader = false;
      this.clCount = res.count;
      if (this.clCount > 1) {
        this.countReceived = true;
        this.getCommunicationLogData();
      } else {
        this.commLogStatus = true;
      }

    }, err => {
      this.pageErrorHandle(err);
      this.modalLoader = false;
    });
  }
  clExportLog() {
    this.modalLoader = true;
    var logsArray = new Array();
    var hostname = "dummy";
    const skip = (parseInt($('#router_commlog_table_paginate .paginate_button.current').text() || '1') - 1) * 20;
    //this.routerService.getCLData(this.routerSerialNumber, this.orgId, 0, this.clCount).subscribe((resp: any) => {
    this.routerService.getCLData(this.routerSerialNumber, this.orgId, 0, (this.clCount > 10000 ? 10000 : this.clCount)).subscribe((resp: any) => {
      this.modalLoader = false;
      logsArray = logsArray.concat(resp);
      logsArray.sort(function (a, b) {
        return a.timestamp < b.timestamp ? 1 : -1;
      });

      for (var j = 0; j < logsArray.length; j++) {
        logsArray[j].timestamp = moment(logsArray[j].timestamp).format('MM/DD/YYYY, HH:mm:ss.SSS A');
        logsArray[j].summary = this.formatSummary(logsArray[j].summary);
        logsArray[j].xmltext = this.formatXml(logsArray[j].xmlText);
      }
      this.saveToFile(logsArray, this.routerSerialNumber, hostname);
    })
  }
  formatSummary(summary) {
    if (summary != undefined && summary != '') {
      var summaryObject = Object.keys(summary).map(key => `${key}:${summary[key]}`)
      return summaryObject;
    }
  }

  commLogAccordian(expanded = -1, event?) {
    if (expanded > -1) {
      $(event.target).toggleClass("collapsed");
      this.dataObj.commLogExpanded.indexOf(expanded) > -1 ?
        this.dataObj.commLogExpanded.splice(this.dataObj.commLogExpanded.indexOf(expanded), 1) :
        this.dataObj.commLogExpanded.push(expanded)
    }
  }

  formatXml(xml) {
    if (xml != undefined && xml != '') {
      var formatted = '';
      var reg = /(>)(<)(\/*)/g;
      xml = xml.replace(reg, '$1\r\n$2$3');
      var pad = 0;
      jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad != 0) {
            pad -= 1;
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
          padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
      });

      this.formatt = formatted;
      return formatted;
    }
  }
  saveToFile(array, cpeId, hostname) {
    if (array.length == 0) return;
    var date = new Date();
    var datetime = moment(date).format('MM/DD/YYYY, HH:mm:ss A');
    var desc = date.toString().substring(25);
    var logs: any = ["===== CPE ID: " + cpeId + " Device Communication Logs. " + array.length +

      " entries. Export Time: " + datetime + " " + desc + " =====\n"];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      logs.push(obj['timestamp'] + ', ', obj['type'] + ', ');
      if (obj['summary'] != undefined && obj['summary'] != '') {
        logs.push(obj['summary'] + ', ')
      }
      if (obj['xmltext'] != undefined) {
        logs.push(obj['xmltext']);
      } else {
        logs.push('\n');
      }
    }
    this.saveFile(logs.join(' '), cpeId + "_DeviceCommunicationLogs_" + datetime.replace(/\//g, '-') + ".log", "text/plain;charset=utf-8");
  };
  saveFile(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
    /*saveAs(
      new Blob(
        data, {
          type: "text/plain;charset=utf-8"
        }
      ), fileName
    );*/
  };

  getCommunicationLogData() {
    this.modalLoader = true;
    const that = this;
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: false,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      ajax: (dataTablesParameters: any, callback) => {
        //that.http.get(url).subscribe((resp: any) => {
        this.routerService.getCLData(this.routerSerialNumber, this.orgId, dataTablesParameters.start, dataTablesParameters.length).subscribe((resp: any) => {              ////console.log(resp);
          this.modalLoader = false;
          this.dataObj.commLogExpanded = [];
          that.CLTableData = resp;
          //that.usersTableData = this.sortData(resp, that.sortBy, that.sortType);
          that.hideNoDataRow();
          callback({
            recordsTotal: (that.clCount != undefined) ? that.clCount : 0,
            recordsFiltered: (that.clCount != undefined) ? that.clCount : 0,
            data: []
          });
          //}, 100);
        },
          (err: HttpErrorResponse) => {
            if (err.status == 404) {
              that.CLTableData = [];
              this.dataObj.commLogExpanded = [];
              that.hideNoDataRow();
              setTimeout(() => {
                callback({
                  recordsTotal: (that.clCount != undefined) ? that.clCount : 0,
                  recordsFiltered: (that.clCount != undefined) ? that.clCount : that.clCount,
                  data: []
                });
              }, 100);
            } else {
              this.pageErrorHandle(err);
            }
          });
      },

      columns: [{ data: 'Time' }, { data: 'Type' }, { data: 'Summary' }, { data: ' ' }]
    };
    this.tableLanguageOptions();
  }
  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  getDhcpModel() {
    this.dhcpModel = {
      dhcpServer: '',
      hostname: '',
      domainName: '',
      deviceIpAddress: '',
      beginningIpAddress: '',
      endingIpAddress: '',
      subnetMask: '',
      dhcpLeaseTime: '',
      primaryDNSServer: '',
      secondaryDNSServer: '',
      days: '',
      hours: '',
      minutes: '',
    };
  }

  getNewPortModel() {
    this.newPortModel = {
      PortMappingEnabled: true,
      PortMappingDescription: '',
      InternalClient: '',
      ExternalPort: 28960,
      ExternalPortEnd: 28960,
      InternalPort: 28960,
      PortMappingProtocol: ''
    };
  }

  openOutModal(content, rbt?: boolean) {
    this.isModalError = false;
    this.isModalSuccess = false;
    if (content['_declarationTContainer']['localNames'][0] == 'backup') {
      this.loader = true;
      this.tableLanguageOptions();
      let payload = {
        serialNumber: this.routerSerialNumber
      }
      this.routerService.getBackup(this.orgId, payload).subscribe((response) => {
        this.backupList = response['backup'];
        this.configurationList = response['configuration'];
        this.loader = false;
      });
    } else if (content['_declarationTContainer']['localNames'][0] == 'startBackup') {
      this.isLocalTimeResponse = [];
      this.loader = true;
      //if(this.backupDescription){
      let payload = {
        serialNumber: this.routerSerialNumber,
        userName: this.userEmail,
        description: this.backupDescription || ' ',
        correlationId: this.routerService.getRandomString(24),
      }
      let date = new Date();
      this.isLocalTimeResponse.push({
        isTime: moment(date).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: 'Starting Backup',
      });
      this.routerService.deviceBackup(this.orgId, payload).subscribe((response) => {
        let date = new Date();
        if (this.isLocalTimeResponse.length < 2) {
          this.isLocalTimeResponse.push({
            isTime: moment(date).format('MM/DD/YYYY, h:mm:ss A'),
            isResponse: 'Backup Succeeded',
          });
        }
        this.loader = false;
      }, err => {
        if (err.status === 401) {
          this.warningMessage = this.language['Access Denied'];
        } else {
          this.warningMessage = this.sso.pageErrorHandle(err);
        }
        let date = new Date();
        if (this.isLocalTimeResponse.length < 2) {
          this.isLocalTimeResponse.push({
            isTime: moment(date).format('MM/DD/YYYY, hh:mm:ss A'),
            isResponse: this.warningMessage,
          });
        }
        this.loader = false;
      });
      //}
    } else if (content['_declarationTContainer']['localNames'][0] == 'Confirmrestore') {
      this.isLocalTimeResponse = [];
      if (this.isRestore) {
        let payload = {
          serialNumber: this.routerSerialNumber,
          fileId: this.isRestore,
          correlationId: this.routerService.getRandomString(24),
        }
        this.loader = true;
        let date = new Date();
        this.isLocalTimeResponse.push({
          isTime: moment(date).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: this.language['Starting Restore from '] + this.isFile,
        });
        this.routerService.deviceRestore(this.orgId, payload).subscribe((response) => {
          let date = new Date();
          this.isLocalTimeResponse.push({
            isTime: moment(date).format('MM/DD/YYYY, h:mm:ss A'),
            isResponse: 'Restore Succeeded',
          });
          this.loader = false;
        }, err => {
          if (err.status === 401) {
            this.warningMessage = this.language['Access Denied'];
          } else {
            this.warningMessage = this.sso.pageErrorHandle(err);
          }
          let date = new Date();
          this.isLocalTimeResponse.push({
            isTime: moment(date).format('MM/DD/YYYY, h:mm:ss A'),
            isResponse: this.warningMessage,
          });
          this.loader = false;
        });
      }
    } else if (content['_declarationTContainer']['localNames'][0] == 'dhcpserverModal') {
      if (this.dhcpData) {
        var days, hrs, mnts, seconds;
        if (this.dhcpData.DHCPLeaseTime) {
          let totalSeconds = this.dhcpData.DHCPLeaseTime;
          seconds = parseInt(totalSeconds);
          days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;
        }
        const dnsServer = this.dhcpData.DNSServers ? this.dhcpData.DNSServers.split(",") : [];
        this.dhcpModel = {
          dhcpServer: (this.toogle == 'true') ? true : false,
          hostName: this.dhcpData.HostName,
          domainName: this.dhcpData.DomainName,
          deviceIpAddress: this.dhcpData.DeviceIPAddress,
          beginningIpAddress: this.dhcpData.BeginningIPAddress,
          endingIpAddress: this.dhcpData.EndingIPAddress,
          subnetMask: this.dhcpData.SubnetMask,
          primaryDNSServer: (dnsServer.length && dnsServer[0] != "") ? dnsServer[0] : 'N/A',
          secondaryDNSServer: (dnsServer.length > 1 && dnsServer[1] != "") ? dnsServer[1] : 'N/A',
          days: days ? days : 0,
          hours: hrs ? hrs : 0,
          minutes: mnts ? mnts : 0,
        };
      }
    } else if (content['_declarationTContainer']['localNames'][0] == 'dmzModal') {
      if (this.dmzData) {
        this.dmzModel = {
          Enable: (this.dmzData.Enable == 'true') ? true : false,
          IPAddress: this.dmzData.IPAddress,
          applicationInput: 'dev',
          applicationInputSelDef: 'dev',
          applicationDeviceSelected: '',
          applicationIpAddress: '',
          applicationSelected: {},
          application: [],
          applicationDevice: [],
        };
      }
    }
    if (content['_declarationTContainer']['localNames'][0] == 'newportModal') {
      this.newPortForwarding = new NewPortForwardingModel();
      this.newPortForwarding.PortMappingProtocol = "TCP"
    }
    const windowSizing = ["communicationModel", "eventhistoryModal", "dataModal"].indexOf(content._declarationTContainer.localNames[0]) > -1 ? 'custom-lg-modal' : ''
    if (content['_declarationTContainer']['localNames'][0] == 'devicelogsModal'
      || content['_declarationTContainer']['localNames'][0] == 'deviceLogs'
      || content['_declarationTContainer']['localNames'][0] == 'pingModel'
      || content['_declarationTContainer']['localNames'][0] == 'tracerouteModel') {
      this.ngbOptions =
        { ariaLabelledBy: 'modal-basic-title', backdrop: "static", centered: true, windowClass: windowSizing }
      this.confirmPingMessage = false;
      this.confirmTraceRouteMessage = false;
      this.isModalError = false;
    } else {
      this.ngbOptions =
        { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: windowSizing }
    }

    if (rbt && !this.rbtStatus) {
      this.rbtStatus = true;
    }

    this.modalService.open(content, this.ngbOptions).result.then((result) => {

    }, (reason) => {
      this.loader = false;
      this.modalLoader = false;
      if (this.apiSubscriber) this.apiSubscriber.unsubscribe();
      this.isRestore = '';
      this.isFile = 'Backup';
      this.backupDescription = '';
      this.successMessage = '';
      /*CCL-26564,CCL-26563 */
      //this.warningMessage = '';
      this.isLocalTimeResponse = [];
    });
    if (this.rbtStatus && this.bootHappening) {
      setTimeout(() => {
        let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
        element.click();
      }, 900);
    }
    if (content._declarationTContainer.localNames[0] == "eventhistoryModal") {
      this.getEventCount("");
    } else if (content._declarationTContainer.localNames[0] == "communicationModel") {
      this.getCLCount();
      //this.getCommunicationLogData();

    }
  }
  BackupRestoreTab(tab: any) {
    this.isTab = tab;
  }
  RestoreChecked(check: any) {
    this.isRestore = check;
  }
  OptionFiles(check: any) {
    this.isRestore = '';
    this.isFile = check;
  }
  confirmCloseDeviceLog() {
    if (this.modalLoader) {
      this.confirmMessage = true
    } else {
      this.closeModal();
    }
  }
  confirmClose(name) {
    if (this.modalLoader) {
      if (name == "Traceroute") {
        this.confirmTraceRouteMessage = true;
      } else {
        this.confirmPingMessage = true
      }
    } else {
      this.closeModal();
    }
  }
  closePing_Traceroute() {
    if (!this.apiSubscriber) {
      this.closeModal();
      return;
    } else {
      this.apiSubscriber.unsubscribe()
      this.closeModal();
    }
  }
  pageErrorHandle(err: any) {
    this.isError = true;
    if (err.status === 401) {
      this.warningMessage = (err.hasPrefixedLabel ? err.hasPrefixedLabel : '') + 'Access Denied' + (err.hasPrefixedLabel ? ' due to scope CPE' : '');
    } else if (err.status === 500) {
      this.warningMessage =
        (typeof err?.error?.error == 'string' && err?.error?.error.toLowerCase().includes('received'))
          ? this.dataService.pageErrorHandle(err)
          : this.language['CPE Not Reachable! Please try later'];
    } else if (err.status === 504) {
      this.warningMessage = this.language['Gateway Timeout'];
    } else {
      this.warningMessage = this.sso.pageErrorHandle(err);
    }
    document.getElementById("routerContentDiv").scrollIntoView();
    this.closeModal();
  }

  pageModalErrorHandle(err: any, showError = true) {
    if (err.status === 401) {
      this.modalWarningMessage = this.language['Access Denied'];
    } else if (err.status === 500 && err.error.error != "Error_CannotResolveHostName" && err.error.error != "Error_NoRouteToHost") {
      this.modalWarningMessage = this.language.internalServerError;
    } else if (err.status === 504) {
      this.modalWarningMessage = this.language['Gateway Timeout'];
    } else if (err.status === 500 && err.error.error == "Error_CannotResolveHostName") {
      this.modalWarningMessage = this.language['Cannot Resolve Host Name'];
    } else if (err.status === 500 && err.error.error == "Error_NoRouteToHost") {
      this.modalWarningMessage = this.language['No Route To Host'];
    } else {
      this.modalWarningMessage = this.sso.pageErrorHandle(err);
    }
    if (showError) this.isModalError = true;
    return this.modalWarningMessage;
  }

  pingModelOpen() {
    this.modalService.open(this.pingModel, { centered: true, windowClass: 'custom-sm-modal' });
  }


  tracerouteModelOpen() {
    this.modalService.open(this.tracerouteModel, { centered: true, windowClass: 'custom-sm-modal' });
  }

  devicelogsModalOpen() {
    this.modalService.open(this.devicelogsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  dataModalOpen() {
    this.modalService.open(this.dataModal, { size: 'lg', centered: true, windowClass: 'custom-lg-modal' });
  }

  eventhistoryModalOpen() {
    this.modalService.open(this.eventhistoryModal, { size: 'lg', centered: true, windowClass: 'custom-lg-modal' });
  }

  communicationModelOpen() {
    this.modalService.open(this.communicationModel, {
      size: 'lg', centered: true,
      windowClass: 'custom-lg-modal'
    });
  }

  exportDetailsOpen() {
    this.modalService.open(this.exportDetails, { size: 'lg', centered: true, windowClass: 'custom-lg-modal' });
  }

  factoryresetModalOpen() {
    this.modalService.open(this.factoryresetModal);
  }

  resetconfirmModalOpen() {
    this.modalService.open(this.resetconfirmModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  dhcpserverModalOpen() {
    this.modalService.open(this.dhcpserverModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  submitPingTraceRoute(content, relativePath, reStart = false) {
    this.modalLoader = true;
    this.confirmPingMessage = false;
    this.confirmTraceRouteMessage = false;
    this.pingTraceRouteDetails = "";
    let httpParam = new HttpParams();
    // httpParam = httpParam.set('orgId', this.orgId);
    httpParam = httpParam.set('serialNumber', this.routerSerialNumber);
    httpParam = httpParam.set('host', this.ipAddress);
    if (Object.keys(this.groupSelected).length) {
      httpParam = httpParam.set('interface', this.groupSelected["value"]);
    }
    this.apiSubscriber = this.routerService.pingTraceRoute(httpParam, relativePath).subscribe((res: any) => {
      this.isModalError = false;
      this.modalLoader = false;
      this.closeModal();
      this.openOutModal(content, true);
      this.pingTraceRouteDetails = res;
      this.ipAddress = "";
      this.groupSelected = reStart ? this.groupSelected : {};
    }, err => {
      this.ipAddress = "";
      this.groupSelected = {};
      this.isModalError = false;
      this.modalLoader = false;
      if (this.metaData?.SplitWan?.supported || (!this.objectExistence(this.metaData?.SplitWan) && this.deviceSelected?.modelName && this.deviceSelected?.modelName.indexOf('GS') != 0)) {
        this.dropDownWanInfo();
      }
      this.pageModalErrorHandle(err);
      $("#PTSubmitId").attr("disabled", "");
    });
  }


  closeModal(err = '') {
    this.modalService.dismissAll();
    this.loader = false;
    /*if (!err) {
      this.isError = false
    }*/
  }

  dataModelSelection(event) {
    let selectedParams = this.dataModelSelected;
    var element = $(event.currentTarget);
    if (!!element && element.length > 0) {
      var paramName = element[0].id;
      if (element[0].checked === true) {
        if (selectedParams == null) {
          selectedParams = {};
        }
        //get param type
        var paramType = "string"; //default type
        if (element[0].hasOwnProperty("data-type")) {
          paramType = element[0]["data-type"];
        }
        selectedParams[paramName] = {
          "name": paramName,
          "type": paramType,
        };

        if (paramType === 'boolean') {
          selectedParams[paramName].value = 'false';
        }
      } else if (Object.keys(selectedParams).includes(paramName)) {
        //remove from selectedParams
        if (selectedParams != null) {
          selectedParams = this.omit(selectedParams, [paramName]);
        }
      }

      Object.keys(selectedParams).length ? $("#createProfile").removeClass("d-none") : $("#createProfile").addClass("d-none");
      this.dataModelSelected = selectedParams;
    }
  }

  omit(obj, keys) {
    var copy = {};
    for (var key in obj) {
      if (!keys.includes(key)) copy[key] = obj[key];
    }
    return copy;
  }

  setValueByPath(obj, path, value) {
    var pathArray, i, result = false;

    if (obj != null && typeof path == "string") {
      pathArray = path.split('.');
      for (i = 0; i < pathArray.length - 1; i++) {
        if (pathArray[i].length == 0)
          break;
        if (obj[pathArray[i]] == null) {
          obj[pathArray[i]] = {};
        }
        obj = obj[pathArray[i]];
        if (obj == null)
          break;
      }
      if (i == (pathArray.length - 1)) {
        obj[pathArray[i]] = value;
        result = true;
      }
    }

    return result;
  }

  arrayToJson(array) {
    let result = {};
    array.forEach(obj => {
      let {
        objectPath,
        parameters
      } = obj;
      parameters.forEach(param => {
        let {
          name
        } = param;
        this.setValueByPath(result, objectPath + name, this.omit(param, ['name']));
      })
    });
    return result;
  }

  createProfile() {
    const boolValueEnum = [
      { "value": true, "displayName": "ON" },
      { "value": false, "displayName": "OFF" }
    ];

    let profileObj = [];
    Object.values(this.dataModelSelected).forEach((obj: any) => {
      let tempProfile = {
        "name": obj.name,
        "type": obj.type,
        "description": "",
        "displayName": obj.name,
        "hidden": false,
        "mandatory": true
      };
      if (obj.type == "boolean") {
        tempProfile["valueEnums"] = boolValueEnum;
        tempProfile["defaultValue"] = false;
      } else if (obj.type == "string") {
        tempProfile["maxStringLength"] = 64;
      }
      profileObj.push(tempProfile);
    });

    this.router.navigate(["./support/netops-management/operations/profiles/profile-wizard"], { state: { dataModel: profileObj, isDataModel: true } });

  }

  factoryReset() {
    setTimeout(() => {
      this.modalLoader = true;
    }, 50);
    if (!this.bootHappening) {
      this.bootHappening = true;
      this.completionStatus = [{
        isTime: '', //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.routerNotReachable ? 'Preparing Recovery Data set..' : 'Factory Reset has been initiated.'    //'Starting Factory Reset',
      }];
    } else {
      return;
    }
    const input = {
      "systemId": this.routerSerialNumber
    };
    //this.routerService.factoryReset(this.orgId, this.routerSerialNumber)
    const api = (this.routerNotReachable ? this.routerService.routerNotReachableReset(this.orgId, input) : this.routerService.routerReachableReset(this.orgId, input));
    api.subscribe(res => {
      this.modalLoader = false;
      //if (!this.routerNotReachable) this.connected = false;
      this.completionStatus.push({
        isTime: '',   //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.routerNotReachable ? 'Recovery Data set ready. Please initiate factory reset at the installed location.' : 'Please check back after ~10 minutes'    //'Factory Reset Complete',
      });
      this.bootHappening = false;
    }, err => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageModalErrorHandle(err, false),
      });
      this.bootHappening = false;
    });
  }

  rebootDevice() {

    this.modalLoader = true;
    if (!this.bootHappening) {
      this.bootHappening = true;
      this.completionStatus = [{
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: 'Starting Reboot',
      }];
    } else {
      return;
    }
    const ontsn = this.ontData.filter(obj => obj.serialNumber == this.ontSn);
    const [vendor, sn] = [(ontsn[0]?.ont?.vendorId), (ontsn[0]?.ont?.serialNo)]
    const rebootApi = this.isOnt ? this.routerService.ontReboot(this.ontSn) : this.routerService.doReboot(this.orgId, this.routerSerialNumber);
    rebootApi.subscribe((res: any) => {
      this.modalLoader = false;
      let message = 'Reboot Succeeded';
      if (this.isOnt && res?.status != "SUCCESS") {
        message = res?.message;
      } else if (this.isOnt) {
        this.modalLoader = true;
        setTimeout(() => {
          this.ontAfterReboot(vendor, this.ontSn);  //sn
        }, 10000);
        return;
      }
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: message,
      });
      this.bootHappening = false;
      this.rbtStatus = false;
    }, err => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageModalErrorHandle(err, false),
      });
      this.bootHappening = false;
      this.rbtStatus = false;
    });
  }

  ontAfterReboot(vendor, sn, i = 0) {
    this.modalLoader = true;
    this.routerService.afterOntReboot(vendor, sn).subscribe((res: any) => {
      if (res.ontDevices && res.ontDevices.length && res.ontDevices[0].isAeOnt == true) {
        this.AEPage = true
      } else {
        this.AEPage = false
      }
      if (res.ontDevices && res.ontDevices.length && res.ontDevices[0].state == 'ONLINE' && res.ontDevices[0].isPresent == true) {
        this.ontStatus = true;
        this.modalLoader = false;
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Reboot Succeeded',
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      } else {
        this.ontStatus = false;
        if (i < 30 && res.ontDevices[0].isPresent != true) {
          setTimeout(() => {
            this.ontAfterReboot(vendor, this.ontSn, ++i); //sn
          }, 20000);
        } else {
          this.modalLoader = false;
          this.completionStatus.push({
            isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
            isResponse: 'Reboot Unsuccessful'
          });
          this.bootHappening = false;
          this.rbtStatus = false;
        }
      }
    }, (err: any) => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageModalErrorHandle(err, false),
      });
      this.bootHappening = false;
      this.rbtStatus = false;
    })
  }

  connectToDevice(ipVers = "") {
    this.loader = true;
    this.routerService.connectPermission(this.orgId).subscribe((res: any) => {
      if (res && res.enabled) {
        this.routerService.connectToDevice(this.orgId, this.routerSerialNumber, ipVers).subscribe((res: any) => {
          this.loader = false;
          if (res) {
            let formInputs = [];
            if (this.sso.isTSeries(this.metaData?.modelName)) formInputs.push(["XWebPageName", "index"]);
            if (res.Username) formInputs.push([(this.metaData?.RemoteAccessGui?.config?.formElement?.username || "username"), res.Username]);
            if (res.Username && res.Nonce && res.Password) formInputs.push(["auth", md5(res.Username + ":" + res.Nonce + ":" + res.Password)]);
            if (res.Nonce) formInputs.push(["nonce", res.Nonce]);
            else formInputs.push([(this.metaData?.RemoteAccessGui?.config?.formElement?.password || "password"), res.Password]);

            let connectDevURL;
            if (res.IPAddress) {
              let protocol = res.Protocol ? res.Protocol : 'http';
              if (res.Port) {
                connectDevURL = `${protocol}://${res.IPAddress}:${res.Port}`;
              } else {
                connectDevURL = `${protocol}://${res.IPAddress}`;
              }
            }
            const windowSuffix = Math.random().toString();
            const urlAppendix = this.metaData?.RemoteAccessGui?.config?.urlAppendix || '';
            const formElem = this.connectDeviceForm(`${connectDevURL}${urlAppendix}`, formInputs, windowSuffix);
            const width = 1200, height = 600, top = (screen.width / 2) - (width / 2), left = (screen.height / 2) - (height / 2);
            let localWin = window.open("", `LocalGui${windowSuffix}`, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
            if (localWin) {
              $(localWin).ready(() => {
                formElem.submit();
                setTimeout(() => {
                  localWin.location.href = `${connectDevURL}`;
                }, this.metaData?.RemoteAccessGui?.config?.needTimer ? 3000 : 0);
              });
            }
            //window.open(url, "_blank");
          }
        }, err => {
          this.loader = false;
          this.pageErrorHandle(err);
        });
      } else {
        this.loader = false;
        this.pageErrorHandle({ message: "No permission" });
      }
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
    });
  }

  connectDeviceForm(url, formInputs, windowSuffix) {
    let localForm = document.createElement("form");
    localForm.target = `LocalGui${windowSuffix}`;
    localForm.method = "POST"; // or "post" if appropriate
    localForm.action = url;

    formInputs.forEach(arr => {
      const [type, value] = arr;
      let userInput = document.createElement("input");
      userInput.type = type == "XWebPageName" ? "hidden" : "text";
      userInput.name = type;
      userInput.value = value;
      localForm.appendChild(userInput);
    });
    localForm.style.display = 'none';
    document.body.appendChild(localForm);
    return localForm;
  }

  dropDownWanInfo() {
    //if (this.deviceSelected.modelName && this.deviceSelected.modelName.indexOf('GS') == 0) return;
    this.modalLoader = true;
    this.routerService.getPingTraceroteWanInfo(this.orgId, this.routerSerialNumber).subscribe((res: any) => {
      this.modalLoader = false;
      this.confirmPingMessage = false;
      this.confirmTraceRouteMessage = false;
      if (res) {
        this.dataObj.pingTracerouteDropData = res.map(obj => {
          //if (this.deviceSelected.modelName && this.deviceSelected.modelName.indexOf('GS') == 0){
          if (this.metaData?.SplitWan?.supported != false || !this.objectExistence(this.metaData?.SplitWan)) {
            return {
              "label": `${obj.Name} (${obj.ExternalIPAddress ? `${obj.ExternalIPAddress}` : ''}${obj.ExternalIPv6Address && obj.ExternalIPAddress ? `,` : ''}${obj.ExternalIPv6Address ? `${obj.ExternalIPv6Address}` : ''} )`,
              "value": obj.path,
              "isIPv4": obj.bIsV4,
              "isIPv6": obj.bIsV6
            }
          }
          /*} else{
            return {
              "label": `${obj.Name} (${obj.ExternalIPAddress ? `${obj.ExternalIPAddress}` : ''}${obj.ExternalIPv6Address && obj.ExternalIPAddress ? `,` : ''}${obj.ExternalIPv6Address ? `${obj.ExternalIPv6Address}` :''} )`,
              "value": obj.path,
              "isIPv4": obj.bIsV4,
              "isIPv6": obj.bIsV6
            }
          }*/
        });
        this.groupSelected = this.dataObj.pingTracerouteDropData[0];
      }
    }, (err) => {
      this.modalLoader = false;
      this.pageModalErrorHandle(err);
    });
  }

  pingTracerouteChange(event) {
    $("#PTSubmitId").attr("disabled", "");
    const elem = $("#PTValidationMessage"), input = $(event.target).val();
    if (!input.trim()) {
      elem.show().text(this.language['This field is required.']);
    } else if (!this.validate.isValidateIPHostName(input.trim())) {
      elem.show().text(this.language["The Host/IP Address is invalid"]);
    } else {
      elem.hide();
      $("#PTSubmitId").removeAttr("disabled");
    }
  }
  dhcpToogle() {
    let dnsPServer, dnsSServer;
    if (this.dhcpModel.secondaryDNSServer != 'N/A' && this.dhcpModel.secondaryDNSServer) {
      dnsSServer = this.dhcpModel.secondaryDNSServer
    }
    if (this.dhcpModel.primaryDNSServer != 'N/A' && this.dhcpModel.primaryDNSServer) {
      dnsPServer = this.dhcpModel.primaryDNSServer
    }
    let dnsServer1;
    dnsServer1 = [dnsPServer, dnsSServer].join(',');
    const dhcpTempReqObj = {
      DHCPServerEnable: this.dhcpModel.dhcpServer.toString(),
      HostName: this.dhcpModel.hostName,
      DomainName: this.dhcpModel.domainName,
      DeviceIPAddress: this.dhcpModel.deviceIpAddress,
      BeginningIPAddress: this.dhcpModel.beginningIpAddress,
      EndingIPAddress: this.dhcpModel.endingIpAddress,
      SubnetMask: this.dhcpModel.subnetMask,
      DHCPLeaseTime: '',
      DNSServers: dnsServer1,
      DHCPLeaseTimeConvertion: '',
    };
    if (dnsServer1.replace(',').trim() == "undefined") {
      dhcpTempReqObj.DNSServers = '';
    }
    let DHCPLeaseTime;
    let isDays = this.dhcpModel.days;
    let isHours = this.dhcpModel.hours;
    let isMinutes = this.dhcpModel.minutes;
    var daysSec = isDays * 24 * 60 * 60;
    var hoursSec = Math.floor(isHours * 60 * 60);
    var minutsSec = Math.floor(isMinutes * 60);
    DHCPLeaseTime = daysSec + hoursSec + minutsSec;
    dhcpTempReqObj.DHCPLeaseTime = DHCPLeaseTime.toString();
    if (dhcpTempReqObj.DHCPLeaseTime != undefined) {
      let days, hrs, mnts, seconds;
      let totalSeconds = DHCPLeaseTime;
      seconds = parseInt(totalSeconds);
      days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      hrs = Math.floor(seconds / 3600);
      seconds -= hrs * 3600;
      mnts = Math.floor(seconds / 60);
      seconds -= mnts * 60;
      dhcpTempReqObj.DHCPLeaseTimeConvertion = `${days ? days : 0} Days, ${hrs ? hrs : 0} Hours, ${mnts ? mnts : 0} Minutes`;
    }
    delete this.dhcpSData.primaryDNSServer;
    delete this.dhcpSData.secondaryDNSServer;
    //delete this.dhcpSData.DHCPServerEnable;
    let difference: any = Object.keys(this.dhcpSData).filter(k => this.dhcpSData[k] !== dhcpTempReqObj[k]);
    return difference;
  }

  validateDhcp() {
    //DHNValidation(event, errorMessage);
    let dhnv = ['#dhcp-device', '#dhcp-Home'];
    let dhnverror = ['HNValidationMessage', 'DNValidationMessage'];
    let dbe = ['#dhcp-ip', '#dhcp-bip', '#dhcp-eip'];
    let dbeerror = ['DIPValidationMessage', 'BIPValidationMessage', 'EIPValidationMessage'];
    let dhmv = ['#dhcp-day', '#dhcp-hrs', '#dhcp-mnts'];
    let dhmverror = ['DValidationMessage', 'HRSValidationMessage', 'MNSValidationMessage'];
    let dhmvParam = ['days', 'hrs', 'mnts']
    let errormessArr = ['HNValidationMessage', 'DNValidationMessage', 'DIPValidationMessage', 'BIPValidationMessage', 'EIPValidationMessage', 'DValidationMessage', 'HRSValidationMessage', 'MNSValidationMessage', 'PDNSValidationMessage', 'SDNSValidationMessage'];
    for (let i = 0; i < dhnv.length; i++) {
      this.DHNValidation(dhnv[i], dhnverror[i]);
    }
    for (let j = 0; j < dbe.length; j++) {
      this.DBEValidation(dbe[j], dbeerror[j]);
    }
    this.snValidation('#dhcp-sm', 'SBMValidationMessage');
    for (let k = 0; k < dhmv.length; k++) {
      this.DHMValidation(dhmv[k], dhmverror[k], dhmvParam[k]);
    }
    let count = 0;
    for (let m = 0; m < errormessArr.length; m++) {
      if ($("#" + errormessArr[m]).text()) {
        count = count + 1;
      }
    }
    if (count == 0) {
      this.updateDhcp();
    }
  }
  DHNValidation(event, errorMessage) {
    if (this.dhcpRequiredValidation(event, errorMessage)) {
      if (this.specialCharValidation(event, errorMessage, 'specialCharacter')) {
        $("#dhcpSubmiId").removeAttr("disabled");
      }
    }
  }
  snValidation(event, errorMessage) {
    if (this.dhcpRequiredValidation(event, errorMessage)) {
      if (this.specialCharValidation(event, errorMessage, 'ip')) {
        $("#dhcpSubmiId").removeAttr("disabled");
      }
    }
  }
  DBEValidation(event, errorMessage) {
    if (this.dhcpRequiredValidation(event, errorMessage)) {
      if (this.specialCharValidation(event, errorMessage, 'ip')) {
        const elem = $("#" + errorMessage),
          input = $(event).val();
        if ((input.replace(/[^0-9]/g, "") > this.dhcpModel.beginningIpAddress.replace(/[^0-9]/g, "") && input.replace(/[^0-9]/g, "") < this.dhcpModel.endingIpAddress.replace(/[^0-9]/g, ""))) {
          elem.show().text("Device IP Address should be outside the range of Beginning IP Address and Ending IP Address");
          return false;
        } else if ((this.dhcpModel.beginningIpAddress.replace(/[^0-9]/g, "") > this.dhcpModel.endingIpAddress.replace(/[^0-9]/g, ""))) {
          elem.show().text("Beginning IP Address should be less than Ending IP Address");
          return false;
        } else {
          elem.hide().text('');
          $("#dhcpSubmiId").removeAttr("disabled");
          return true;
        }
      }
    }
  }
  DHMValidation(event, errorMessage, dhmValidation) {
    if (this.dhcpRequiredValidation(event, errorMessage)) {
      if (this.specialCharValidation(event, errorMessage, 'digit')) {
        const elem = $("#" + errorMessage),
          input = $(event).val();
        if (dhmValidation == 'days') {
          if (input.trim() > 365) {
            elem.show().text("Please enter a value between 0 and 365.");
            return false;
          } else {
            elem.hide().text('');
            $("#dhcpSubmiId").removeAttr("disabled");
            return true;
          }
        } else if (dhmValidation == 'hrs') {
          if (input.trim() > 23) {
            elem.show().text("Please enter a value between 0 and 23.");
            return false;
          } else {
            elem.hide().text('');
            $("#dhcpSubmiId").removeAttr("disabled");
            return true;
          }
        } else {
          if (input.trim() > 59) {
            elem.show().text("Please enter a value between 0 and 59.");
            return false;
          } else {
            elem.hide().text('');
            $("#dhcpSubmiId").removeAttr("disabled");
            return true;
          }
        }
      }
    }
  }

  dhcpRequiredValidation(event, errorMessage) {
    const elem = $("#" + errorMessage),
      input = $(event).val();
    if (!input) {
      elem.show().text(this.language['This field is required.']);
      return false;
    } else {
      elem.hide().text('');
      return true;
    }
  }
  specialCharValidation(event, errorMessage, vFunction) {
    const elem = $("#" + errorMessage),
      input = $(event).val();
    if (vFunction == 'specialCharacter') {
      let nospecial = /^[^*|\":<>[\]{}`\\()+';@&$\s]+$/
      if (!(nospecial).test(input)) {
        if (errorMessage == 'DNValidationMessage') {
          elem.show().text("The domain name should contain letters, numbers, underscores, dashes, and dots only with no spaces.");
          return false;
        } else {
          elem.show().text("The host name should contain letters, numbers, underscores, dashes, and dots only with no spaces.");
          return false;
        }

      } else {
        elem.hide().text('');
        return true;
      }
    } else if (vFunction == 'ip') {
      if ((!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input))) {
        if (errorMessage == 'PDNSValidationMessage') {
          elem.show().text("Warning: No message defined for primaryDNSServer");
          let nospecial = /^[\s]+$/;
          if (!input.trim() && !(nospecial).test(input)) {
            elem.hide().text('');
            $("#dhcpSubmiId").removeAttr("disabled");
            return true;
          }
          return false;
        } else if (errorMessage == 'SDNSValidationMessage') {
          elem.show().text("Warning: No message defined for secondaryDNSServer");
          let nospecial = /^[\s]+$/;
          if (!input.trim() && !(nospecial).test(input)) {
            elem.hide().text('');
            $("#dhcpSubmiId").removeAttr("disabled");
            return true;
          }
          return false;
        } else {
          elem.show().text("Please enter a valid IP Address");
          return false;
        }
      } else {
        elem.hide().text('');
        $("#dhcpSubmiId").removeAttr("disabled");
        return true;
      }
    } else if (vFunction == 'digit') {
      let nospecial = /^[0-9]*$/
      if (!(nospecial).test(input)) {
        elem.show().text("Please enter only digits.");
        return false;
      } else {
        elem.hide().text('');
        return true;
      }
    }
  }

  dmzTracerouteChange(event) {
    $("#dmzSubmit").attr("disabled", "");
    const elem = $("#dmzValidationMessage"), input = $(event.target).val();
    if (!input.trim()) {
      elem.show().text(this.language['This field is required.']);
    } else if (!input.match(/[a-zA-Z]+/g) && !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)) {
      elem.show().text(this.language["The IP Address is invalid"]);
    } else if (input.match(/[a-zA-Z]+/g)) {
      elem.show().text(this.language["The IP Address is invalid"]);
    }
    else {
      elem.hide();
      $("#dmzSubmit").removeAttr("disabled");
    }
  }

  newPortForward() {
    this.dataObj.applicationInput = 'lan';
    this.dataObj.applicationIpAddress = '';
    this.dataObj.application = this.pfaService.getApplicationData(this.objectExistence(this.metaData?.PortMapping));
    this.dataObj.applicationSelected = this.dataObj.application[0];
    if (!this.dataObj.applicationLanHost.length) {
      this.modalLoader = true;
      this.routerService.getDeviceLAN(this.orgId, this.routerSerialNumber, "LanHosts").subscribe((res: any) => {
        this.modalLoader = false;
        this.lanHosting = res;
        if (res && res.length) {
          this.newPortForwarding.InternalClient = this.lanHosting[0].IPAddress;
          let filterRes = res.filter(obj => obj.Active == 'true' && obj.Icon != '9');
          this.dataObj.applicationLanHost = filterRes.map(obj => {
            return {
              "hostName": obj.HostName,
              "IPAddress": obj.IPAddress,
              "displayName": `${obj.HostName} (${obj.IPAddress})`,
            }
          });
          this.lanHosting = filterRes.map(obj => {
            return {
              "hostName": obj.HostName,
              "IPAddress": obj.IPAddress,
              "displayName": `${obj.HostName} (${obj.IPAddress})`,
            }
          });
          this.dataObj.applicationLanHostSelected = this.dataObj.applicationLanHost.length ? this.dataObj.applicationLanHost[0]["IPAddress"] : '';
        }
      }, (err) => {
        this.modalLoader = false;
        $("#SubmitId").attr("disabled", "");
        this.pageModalErrorHandle(err);
      });
    } else this.dataObj.applicationLanHostSelected = this.dataObj.applicationLanHost[0]["IPAddress"];
  }

  ipValidation(event?) {
    $("#SubmitId").attr("disabled", "");
    const elem = $("#ipValidationMessage"), input = this.dataObj.applicationIpAddress;
    let ip = input.split('.');
    if (!input.trim()) {
      elem.show().text(this.language['This field is required.']);
      return false;
    } else if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)) {
      elem.show().text(this.language["The IP Address is invalid"]);
      return false;
    } else if (ip[3] == '0') {
      elem.show().text(this.language["The IP Address is invalid"]);
      return false;
    } else {
      elem.hide();
      $("#SubmitId").removeAttr("disabled");
    }
  }

  newPortForwardRadio() {
    setTimeout(() => {
      $("#SubmitId").removeAttr("disabled");
      if (this.dataObj.applicationInput == "lan") {
        this.newPortForwarding.InternalClient = this.lanHosting.length ? this.lanHosting[0].IPAddress : '';
        this.dataObj.applicationLanHostSelected = this.dataObj.applicationLanHost.length ? this.dataObj.applicationLanHost[0]["IPAddress"] : '';
        if (!this.dataObj.applicationLanHostSelected) $("#SubmitId").attr("disabled", "");
      } else {
        this.newPortForwarding.InternalClient = "";
        this.dataObj.applicationIpAddress.trim() ? this.ipValidation() : $("#SubmitId").attr("disabled", "")
      }
    }, 0);
  }
  newDMZ() {
    this.dmzModel.applicationInput = 'dev';
    this.dmzModel.applicationIpAddress = '';
    this.dmzModel.application = this.pfaService.getApplicationData(true);
    this.dmzModel.applicationSelected = this.dmzModel.application[0];
    if (!this.dmzModel.applicationDevice.length) {
      this.loader = true;
      this.routerService.getDeviceLAN(this.orgId, this.routerSerialNumber, "LanHosts").subscribe((res: any) => {
        this.loader = false;
        if (res && res.length) {
          let filterRes = res.filter(obj => obj.Active == 'true' && obj.Icon != '9');
          this.dmzModel.applicationDevice = filterRes.map(obj => {
            return {
              "hostName": obj.HostName,
              "IPAddress": obj.IPAddress,
              "displayName": obj.HostName ? `${obj.HostName} (${obj.IPAddress})` : `${obj.HostNameAlias} (${obj.IPAddress})`
            }
          });
          if (this.dmzData && this.dmzData.Enable && this.dmzData.Enable == 'true') {
            let availableInList = res.filter(obj => this.dmzData.IPAddress == obj.IPAddress);
            if (!availableInList.length) {
              this.dmzModel.applicationInput = 'ip';
              this.dmzModel.applicationInputSelDef = 'ip';
              this.dmzModel.applicationIpAddress = this.dmzData.IPAddress;
              $("#dmzSubmit").attr("disabled", "")
            } else {
              this.dmzModel.applicationInput = 'dev';
              this.dmzModel.applicationInputSelDef = 'dev';
              this.dmzModel.applicationDeviceSelected = availableInList[0]["IPAddress"];
              //$("#dmzSubmit").attr("disabled", "")
            }
          }

          //this.dmzModel.applicationDeviceSelected = this.dmzModel.applicationDevice[0]["IPAddress"];
        } else {
          this.dmzModel.applicationInput = 'ip';
          this.dmzModel.applicationInputSelDef = 'ip';
          this.dmzModel.applicationIpAddress = this.dmzData.IPAddress;
          $("#dmzSubmit").attr("disabled", "")
        }
      }, (err) => {
        this.loader = false;
        $("#SubmitId").attr("disabled", "");
        this.pageModalErrorHandle(err);
      });
    } else this.dmzModel.applicationDeviceSelected = this.dmzModel.applicationDevice[0]["IPAddress"];
  }
  newDMZRadio() {
    setTimeout(() => {
      if (this.dmzModel.applicationInput == "dev") {
        this.dmzModel.applicationDeviceSelected = this.dmzModel.applicationDevice.length ? this.dmzModel.applicationDevice[0]["IPAddress"] : '';
        if (!this.dmzModel.applicationDeviceSelected) $("#dmzSubmit").attr("disabled", "");
        if (this.dmzModel.applicationInputSelDef == 'ip') {
          $("#dmzSubmit").removeAttr("disabled");
        } else if (this.dmzData.IPAddress == this.dmzModel.applicationDeviceSelected) {
          $("#dmzSubmit").attr("disabled", "");
        }
        const elem = $("#ipValidationMessage"), input = this.dmzModel.applicationIpAddress;
        elem.hide();
      } else {
        this.dmzModel.applicationIpAddress.trim() ? this.ipValidationDMZ() : $("#dmzSubmit").attr("disabled", "")
        if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() && this.dmzModel.applicationIpAddress.trim() == this.dmzData.IPAddress) {
          $("#dmzSubmit").attr("disabled", "");
        } else if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() && this.dmzModel.applicationIpAddress.trim() != this.dmzData.IPAddress && this.dmzModel.applicationInputSelDef == 'dev') {
          $("#dmzSubmit").removeAttr("disabled");
          this.ipValidationDMZ();
        }
      }

    }, 0);
  }

  enableDisable() {
    setTimeout(() => {
      if ((!this.dmzModel.Enable && this.dmzData && this.dmzData.Enable == 'true') || (this.dmzModel.Enable && this.dmzData && this.dmzData.Enable == 'false')) {
        $("#dmzSubmit").removeAttr("disabled");
        if (this.dmzModel.applicationInput == 'ip') {
          this.ipValidationDMZ();
        }
      } else {
        if (this.dmzModel.applicationInput == this.dmzModel.applicationInputSelDef) {
          $("#dmzSubmit").attr("disabled", "");
          if (this.dmzModel.applicationInputSelDef == 'ip') {
            if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim().length && this.dmzModel.applicationIpAddress.trim() == this.dmzData.IPAddress) {
              $("#dmzSubmit").attr("disabled", "");
            } else if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim().length && this.dmzModel.applicationIpAddress.trim() != this.dmzData.IPAddress) {
              $("#dmzSubmit").removeAttr("disabled");
            }
          }

        }

      }
    }, 10);

  }

  newDMZRadioNew() {
    if (this.dmzModel.applicationInput == "dev") {
      $("#dmzSubmit").removeAttr("disabled");
    }
    if (this.dmzModel.Enable) {
      if (this.dmzData && this.dmzData.Enable == 'true' && this.dmzModel.applicationInput == "dev") {
        const elem = $("#ipValidationMessage");
        elem.hide();
        this.dmzModel.applicationDeviceSelected = (!this.dmzModel.applicationDeviceSelected && this.dmzModel.applicationDevice.length) ? this.dmzModel.applicationDevice[0]["IPAddress"] : (this.dmzModel.applicationDeviceSelected ? this.dmzModel.applicationDeviceSelected : '');
        if (!this.dmzModel.applicationDeviceSelected) {
          $("#dmzSubmit").attr("disabled", "");
        } else {
          if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationDeviceSelected != this.dmzModel.applicationIpAddress.trim()) {
            $("#dmzSubmit").removeAttr("disabled");
          }
        }
      } else if (this.dmzData && this.dmzData.Enable == 'true' && this.dmzModel.applicationInput == "ip") {
        this.dmzModel.applicationIpAddress.trim() ? this.ipValidationDMZ() : $("#dmzSubmit").attr("disabled", "")
        if ((this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() == this.dmzData.IPAddress) || (!this.dmzModel.applicationIpAddress.trim())) {
          $("#dmzSubmit").attr("disabled", "");
        } else if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() && this.dmzData.IPAddress && this.dmzModel.applicationIpAddress.trim() != this.dmzData.IPAddress && this.dmzModel.applicationInputSelDef == 'dev') {
          $("#dmzSubmit").removeAttr("disabled");
          this.ipValidationDMZ();
        }
      } else if (this.dmzData && this.dmzData.Enable == 'false' && this.dmzModel.applicationInput == "dev") {
        const elem = $("#ipValidationMessage");
        elem.hide();
        this.dmzModel.applicationDeviceSelected = (!this.dmzModel.applicationDeviceSelected && this.dmzModel.applicationDevice.length) ? this.dmzModel.applicationDevice[0]["IPAddress"] : (this.dmzModel.applicationDeviceSelected ? this.dmzModel.applicationDeviceSelected : '');
        if (!this.dmzModel.applicationDeviceSelected) {
          $("#dmzSubmit").attr("disabled", "");
        } else {
          if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationDeviceSelected != this.dmzModel.applicationIpAddress.trim()) {
            $("#dmzSubmit").removeAttr("disabled");
          }
        }

      } else if (this.dmzData && this.dmzData.Enable == 'false' && this.dmzModel.applicationInput == "ip") {
        this.dmzModel.applicationIpAddress.trim() ? this.ipValidationDMZ() : $("#dmzSubmit").attr("disabled", "")
        if ((this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() && this.dmzModel.applicationIpAddress.trim() == this.dmzData.IPAddress) || (!this.dmzModel.applicationIpAddress.trim())) {
          $("#dmzSubmit").attr("disabled", "");
        } else if (this.dmzModel.applicationIpAddress && this.dmzModel.applicationIpAddress.trim() && this.dmzData.IPAddress && this.dmzModel.applicationIpAddress.trim() != this.dmzData.IPAddress && this.dmzModel.applicationInputSelDef == 'dev') {
          $("#dmzSubmit").removeAttr("disabled");
          this.ipValidationDMZ();
        }
      }
    } else {
      if (this.dmzData && this.dmzData.Enable == 'true') {
        $("#dmzSubmit").removeAttr("disabled");
      } else if (this.dmzData && this.dmzData.Enable != 'true') {
        $("#dmzSubmit").attr("disabled", "");
      }
    }
  }

  dmzDropdownChange() {
    if (this.dmzData && this.dmzData.IPAddress && this.dmzData.IPAddress == this.dmzModel.applicationDeviceSelected) {
      $("#dmzSubmit").attr("disabled", "");
    } else {
      $("#dmzSubmit").removeAttr("disabled");
    }
  }

  invert(subnetbinary) {
    let invertedvalue;
    let subnetbinaryvalue = subnetbinary === '0' ? '00000000' : subnetbinary;
    // let decimalvalueint=parseInt(decimalvaluefrom)
    var binarysplit = subnetbinaryvalue.split('');
    let invert = binarysplit.map((a, i) => {

      invertedvalue = a === '0' ? '1' : '0';

      return invertedvalue
    })
    return invert.join('')
  }

  iprangecalc(Ipaddress, SubnetMask) {
    var startipsplit = Ipaddress.split('.');
    var subnetsplit = SubnetMask.split('.');
    let beginningaddress = startipsplit.map((a, i) => {
      let ipforbegin = parseInt(a); let subnetforbegin = parseInt(subnetsplit[i])
      return ipforbegin & subnetforbegin
    })
    ////////////////////////////////////////////////////////////////
    let endip = startipsplit.map((a, i) => {
      let ipintoparse = parseInt(a); let subnetintoparse = parseInt(subnetsplit[i])
      let subnetintobinary = subnetintoparse.toString(2);  //subnetip into binary
      let subnetintoinverted = this.invert(subnetintobinary) //inverting the subnet binary value
      //let subnetwoleadingzero = subnetintoinverted.replace(/^0+/, "") //eleminate leading zero
      let invertedsubnetintodecimal = parseInt(subnetintoinverted, 2).toString(10)  //inverted binary into decimal

      return ipintoparse | parseInt(invertedsubnetintodecimal)
    })

    endip[3] = endip[3] - 1; beginningaddress[3] = beginningaddress[3] + 1;
    let enipjoin = endip.join('.')
    let beginip = beginningaddress.join('.')
    return [beginip, enipjoin];
  }

  ipValidationDMZ(event?) {

    var values = this.iprangecalc(this.dhcpSData.DeviceIPAddress, this.dhcpSData.SubnetMask);
    var beginningip = values[0];
    var endingip = values[1];

    $("#dmzSubmit").attr("disabled", "");
    const elem = $("#ipValidationMessage"), input = this.dmzModel.applicationIpAddress;
    let ip = input.split('.');
    // let subnetmaskvalue = '192.168.1.2' //CCL-36962  start ip as given subnetmask value
    let bip = beginningip.split('.');//this.dhcpSData.BeginningIPAddress.split('.')
    let eip = endingip.split('.')//this.dhcpSData.EndingIPAddress.split('.')
    if (!input.trim()) {
      elem.show().text(this.language['This field is required.']);
    } else if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)) {
      elem.show().text(this.language['Please enter IP range from'] + beginningip + ` ${this.language['to']} ` + endingip);
    } /*else if (ip[3] == '0') {
      elem.show().text(this.language['Please enter IP range from'] + beginningip+ ` ${this.language['to']} ` + endingip);
    } */else if (parseInt(ip[0]) < parseInt(bip[0]) || parseInt(ip[1]) < parseInt(bip[1]) || parseInt(ip[2]) < parseInt(bip[2]) || parseInt(ip[3]) < parseInt(bip[3])) {
      elem.show().text(this.language['Please enter IP range from'] + beginningip + ` ${this.language['to']} ` + endingip);
    } else if (parseInt(ip[0]) > parseInt(eip[0]) || parseInt(ip[1]) > parseInt(eip[1]) || parseInt(ip[2]) > parseInt(eip[2]) || parseInt(ip[3]) > parseInt(eip[3])) {
      elem.show().text(this.language['Please enter IP range from'] + beginningip + ` ${this.language['to']} ` + endingip);
    } else {
      elem.hide();
      $("#dmzSubmit").removeAttr("disabled");
      /*if (this.dmzData && this.dmzData.Enable == 'true' && this.dmzData.IPAddress && this.dmzData.IPAddress == input) {
        $("#dmzSubmit").attr("disabled", "");
      }*/
    }
  }

  validLastIndex(input) {
    let except = ['0', '1', '255'];
    let lastIndexValue = input.trim().split('.').pop();
    if (except.includes(lastIndexValue)) {
      return false;
    } else {
      return true;
    }
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.cpe.backup_restore'] = scopes['cloud.rbac.csc.cpe.backup_restore'] ? scopes['cloud.rbac.csc.cpe.backup_restore'] : [];
      scopes['cloud.rbac.csc.cpe.comm_logs'] = scopes['cloud.rbac.csc.cpe.comm_logs'] ? scopes['cloud.rbac.csc.cpe.comm_logs'] : [];
      scopes['cloud.rbac.csc.cpe.device_logs'] = scopes['cloud.rbac.csc.cpe.device_logs'] ? scopes['cloud.rbac.csc.cpe.device_logs'] : [];
      scopes['cloud.rbac.csc.cpe.event_history'] = scopes['cloud.rbac.csc.cpe.event_history'] ? scopes['cloud.rbac.csc.cpe.event_history'] : [];
      scopes['cloud.rbac.csc.cpe.factory_reset'] = scopes['cloud.rbac.csc.cpe.factory_reset'] ? scopes['cloud.rbac.csc.cpe.factory_reset'] : [];
      scopes['cloud.rbac.csc.cpe.reboot'] = scopes['cloud.rbac.csc.cpe.reboot'] ? scopes['cloud.rbac.csc.cpe.reboot'] : [];
      scopes['cloud.rbac.csc.cpe.data_model'] = scopes['cloud.rbac.csc.cpe.data_model'] ? scopes['cloud.rbac.csc.cpe.data_model'] : [];
      scopes['cloud.rbac.csc.cpe.ping'] = scopes['cloud.rbac.csc.cpe.ping'] ? scopes['cloud.rbac.csc.cpe.ping'] : [];
      scopes['cloud.rbac.csc.cpe.trace_route'] = scopes['cloud.rbac.csc.cpe.trace_route'] ? scopes['cloud.rbac.csc.cpe.trace_route'] : [];
      scopes['cloud.rbac.csc.cpe.update_image'] = scopes['cloud.rbac.csc.cpe.update_image'] ? scopes['cloud.rbac.csc.cpe.update_image'] : [];
      scopes['cloud.rbac.csc.cpe.connect_device'] = scopes['cloud.rbac.csc.cpe.connect_device'] ? scopes['cloud.rbac.csc.cpe.connect_device'] : [];
      scopes['cloud.rbac.csc.cpe.settings'] = scopes['cloud.rbac.csc.cpe.settings'] ? scopes['cloud.rbac.csc.cpe.settings'] : [];

      if (scopes && (scopes['cloud.rbac.csc.cpe.backup_restore'])) {
        if (scopes['cloud.rbac.csc.cpe.backup_restore'].indexOf('read') !== -1) this.scopeFlag.backupRead = true;
        if (scopes['cloud.rbac.csc.cpe.backup_restore'].indexOf('write') !== -1) this.scopeFlag.backup = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.comm_logs'])) {
        if (scopes['cloud.rbac.csc.cpe.comm_logs'].indexOf('read') !== -1) this.scopeFlag.communicationLogRead = true;
        if (scopes['cloud.rbac.csc.cpe.comm_logs'].indexOf('write') !== -1) this.scopeFlag.communicationLog = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.device_logs'])) {
        if (scopes['cloud.rbac.csc.cpe.device_logs'].indexOf('read') !== -1) this.scopeFlag.deviceLogRead = true;
        if (scopes['cloud.rbac.csc.cpe.device_logs'].indexOf('write') !== -1) this.scopeFlag.deviceLog = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.event_history'])) {
        if (scopes['cloud.rbac.csc.cpe.event_history'].indexOf('read') !== -1) this.scopeFlag.eventHistoryRead = true;
        if (scopes['cloud.rbac.csc.cpe.event_history'].indexOf('write') !== -1) this.scopeFlag.eventHistory = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.factory_reset'])) {
        if (scopes['cloud.rbac.csc.cpe.factory_reset'].indexOf('read') !== -1) this.scopeFlag.factoryResetRead = true;
        if (scopes['cloud.rbac.csc.cpe.factory_reset'].indexOf('write') !== -1) this.scopeFlag.factoryReset = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.reboot'])) {
        if (scopes['cloud.rbac.csc.cpe.reboot'].indexOf('read') !== -1) this.scopeFlag.rebootRead = true;
        if (scopes['cloud.rbac.csc.cpe.reboot'].indexOf('write') !== -1) this.scopeFlag.reboot = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.data_model'])) {
        if (scopes['cloud.rbac.csc.cpe.data_model'].indexOf('read') !== -1) this.scopeFlag.dataModalRead = true;
        if (scopes['cloud.rbac.csc.cpe.data_model'].indexOf('write') !== -1) this.scopeFlag.dataModal = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.ping'])) {
        if (scopes['cloud.rbac.csc.cpe.ping'].indexOf('read') !== -1) this.scopeFlag.pingRead = true;
        if (scopes['cloud.rbac.csc.cpe.ping'].indexOf('write') !== -1) this.scopeFlag.pingWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.trace_route'])) {
        if (scopes['cloud.rbac.csc.cpe.trace_route'].indexOf('read') !== -1) this.scopeFlag.tracerouteRead = true;
        if (scopes['cloud.rbac.csc.cpe.trace_route'].indexOf('write') !== -1) this.scopeFlag.tracerouteWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.update_image'])) {
        if (scopes['cloud.rbac.csc.cpe.update_image'].indexOf('read') !== -1) this.scopeFlag.updateSWRead = true;
        if (scopes['cloud.rbac.csc.cpe.update_image'].indexOf('write') !== -1) this.scopeFlag.updateSWWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.connect_device'])) {
        if (scopes['cloud.rbac.csc.cpe.connect_device'].indexOf('read') !== -1) this.scopeFlag.connectToDeviceRead = true;
        if (scopes['cloud.rbac.csc.cpe.connect_device'].indexOf('write') !== -1) this.scopeFlag.connectToDeviceWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe'])) {
        if (scopes['cloud.rbac.csc.cpe'].indexOf('read') !== -1) this.scopeFlag.cpeRead = true;
        if (scopes['cloud.rbac.csc.cpe'].indexOf('write') !== -1) this.scopeFlag.cpeWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.l2security'])) {
        if (scopes['cloud.rbac.csc.cpe.l2security'].indexOf('read') !== -1) this.scopeFlag.l2sRead = true;
        if (scopes['cloud.rbac.csc.cpe.l2security'].indexOf('write') !== -1) this.scopeFlag.l2sWrite = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.cpe.settings'])) {
        if (scopes['cloud.rbac.csc.cpe.settings'].indexOf('read') !== -1) this.scopeFlag.settingRead = true;
        if (scopes['cloud.rbac.csc.cpe.settings'].indexOf('write') !== -1) this.scopeFlag.settingWrite = true;
      }
    } else {
      this.scopeFlag.backupRead = true;
      this.scopeFlag.backup = true;
      this.scopeFlag.communicationLogRead = true;
      this.scopeFlag.communicationLog = true;
      this.scopeFlag.deviceLogRead = true;
      this.scopeFlag.deviceLog = true;
      this.scopeFlag.eventHistoryRead = true;
      this.scopeFlag.eventHistory = true;
      this.scopeFlag.factoryResetRead = true;
      this.scopeFlag.factoryReset = true;
      this.scopeFlag.rebootRead = true;
      this.scopeFlag.reboot = true;
      this.scopeFlag.dataModalRead = true;
      this.scopeFlag.dataModal = true;
      this.scopeFlag.pingRead = true;
      this.scopeFlag.pingWrite = true;
      this.scopeFlag.tracerouteRead = true;
      this.scopeFlag.tracerouteWrite = true;
      this.scopeFlag.updateSWRead = true;
      this.scopeFlag.updateSWWrite = true;
      this.scopeFlag.connectToDeviceRead = true;
      this.scopeFlag.connectToDeviceWrite = true;
      this.scopeFlag.l2sRead = true;
      this.scopeFlag.l2sWrite = true;
      this.scopeFlag.cpeRead = true;
      this.scopeFlag.cpeWrite = true;
      this.scopeFlag.settingRead = true;
      this.scopeFlag.settingWrite = true;
    }
  }
  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }


  RouterGatewayLoader() {
    this.refreshLoader = true;
    this.isError = false;
    this.routerService.getConnectivityStatus(this.orgId, this.routerSerialNumber, false).subscribe((res: any) => {
      res.Uptime = this.dataService.timeToDays(res.Uptime);
      this.connected = res;
      this.getDeviceInfoDetails(true);
    }, err => {
      this.refreshLoader = false;
      this.connected = false;
      if (err?.error?.status === "423 Locked") {
        this.pageErrorHandle(err);
        this.connected = undefined;
      }
    });

  }

  updateToList() {
    this.modalLoader = true;
    this.routerService.getSoftwareVersionCount(this.orgId).subscribe((res: any) => {
      this.swImageCount = res.count;
      this.routerService.getSoftwareVersion(this.orgId, this.swImageCount).subscribe((res: any) => {
        this.modalLoader = false;
        if (res) {
          let resVersionFilter;
          if (this.deviceInfo?.manufacturer == "Calix" || this.deviceInfo?.manufacturer == "MSTC" || (history.state?.isUpgrade && (history.state?.manufacturer == "calix" || history.state?.manufacturer == "MSTC"))) {

            resVersionFilter = res.filter(obj =>

              obj.version != "N/A" && obj?.version
            )
          } else {
            resVersionFilter = res;
          }

          let resModelFilter = [];
          if (this.deviceInfo?.manufacturer == "Calix" || this.deviceInfo?.manufacturer == "MSTC" || (history.state?.isUpgrade && (history.state?.manufacturer == "Calix" || history.state?.manufacturer == "MSTC"))) {
            if (history.state?.isRouter && history.state?.isUpgrade && history.state?.modelName) {
              resModelFilter = resVersionFilter.filter(obj => (obj.hasOwnProperty('models')) ? obj.models.indexOf(history.state?.modelName) !== -1 : '')
            } else {
              resModelFilter = resVersionFilter.filter(obj => (obj.hasOwnProperty('models')) ? obj.models.indexOf(this.deviceInfo?.modelName) !== -1 : '')
            }

          } else {
            let resModelFilterTemp = [];
            resModelFilterTemp = resVersionFilter.filter(obj => (obj.hasOwnProperty('manufacturer')) ? (obj.manufacturer != "Calix" || obj.manufacturer == "") : '');
            if (resModelFilterTemp.length == 0) {
              resModelFilter = resVersionFilter.filter(obj => (obj.hasOwnProperty('models')) ? (obj.models == "" || obj.models == "N/A") : '');
            } else {
              resModelFilter = resModelFilter.concat(resModelFilterTemp);
            }
          }
          this.dataObj.updateToSW = resModelFilter.map(obj => {
            if (this.deviceInfo?.manufacturer == "Calix" || this.deviceInfo?.manufacturer == "MSTC" || (history.state?.isUpgrade && (history.state?.manufacturer == "calix" || history.state?.manufacturer == "MSTC"))) {
              return {
                "label": `${obj.version}${obj.models && obj.models.length ? (' - ' + obj.models.join(", ")) : (' - ' + obj.name)}`,
                "value": obj._id,
                "versionNumber": obj.version
              };
            } else {
              return {
                "label": `${obj.name}`,
                "value": obj._id,
                "versionNumber": obj.version
              };
            }
          });
          this.dataObj.updateToSW.sort((a, b) => {
            const num1 = Number(a.versionNumber.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
            const num2 = Number(b.versionNumber.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
            return num2 - num1;
          });   //.sort((a, b) => a.versionNumber > b.versionNumber ? -1 : 1);
          this.updateToSW = this.dataObj.updateToSW.length ? this.dataObj.updateToSW[0]["value"] : '';
          this.softwareChangedVer = this.dataObj.updateToSW.length ? this.dataObj.updateToSW[0]["versionNumber"] : '';
        }
      }, err => {
        this.modalLoader = false;
        this.pageModalErrorHandle(err);
      });
    }, err => {
      this.modalLoader = false;
      this.pageModalErrorHandle(err);
    });

  }

  softwareChangedVer: string;
  onSoftwareChange(event) {
    this.softwareChangedVer = event.versionNumber;
  }

  updateSoftware() {
    const request = {
      "internalFileId": this.updateToSW,
      "serialNumber": this.routerSerialNumber
    }
    this.completionStatus = [{
      isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
      isResponse: 'Starting Update',
    }];
    this.modalLoader = true;
    if (this.deviceInfo?.manufacturer == "Calix" || (history.state?.isUpgrade && history.state?.manufacturer == "calix")) {

      if (this.deviceSelected.softwareVersion.match(this.softwareChangedVer)) {
        this.modalLoader = false;
        this.completionStatus = [{
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Router already running with selected image',
        }];
        return
      }
    }
    this.routerService.updateSoftware(this.orgId, request).subscribe((res: any) => {
      this.modalLoader = false;
      if (res.error) {
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: res.error
        });
      } else {
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: "Update Successful",
        });
        let deviceData = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
        deviceData.forEach(obj => {
          if (obj.serialNumber == this.routerSerialNumber) {
            obj.softwareVersion = this.dataObj.updateToSW
              .filter(obj => obj.value == this.updateToSW)[0]['versionNumber'];
            this.deviceSelected = obj;
          }
        });
        sessionStorage.setItem(`${this.ssoService.getTabId()}calix.deviceData`, JSON.stringify(deviceData));
      }
    }, err => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageModalErrorHandle(err, false),
      });
    });
  }

  stopConfirmation(modalName) {
    this.modalLoader = false;
    if (!this.apiSubscriber) {
      this.closeModal();
      return;
    }
    this.modalWarningMessage = `<div class="warn-confirm pb-2">
      <p class="mb-0"> <span> <i class="fa fa-warning"></i> </span> ${modalName} ${this.language['is still running. Are you sure you want to close this']}? </p>
      <div class="btnsDisplay">
        <div class="btn btn-primary br-26 b-none modalWarningConfirm">${this.language.Confirm}</div>
        <div class="btn btn-default transparant ml-2 br-26 modalWarningCancel">${this.language.Cancel}</div>
      </div>
    </div>`;

    this.isModalError = true;

    setTimeout(() => {
      $(document).off('click', ".modalWarningCancel");
      $(document).on('click', ".modalWarningCancel", () => {
        this.modalLoader = true;
        this.isModalError = false
      });

      $(document).off('click', ".modalWarningConfirm");
      $(document).on('click', ".modalWarningConfirm", () => {
        if (this.apiSubscriber) this.apiSubscriber.unsubscribe();
        this.closeModal();
      });
    }, 500);

  }
  portForwardingChange() {
    this.isModalError = false;
    this.modalWarningMessage = '';
    if (this.dataObj.applicationSelected.PortMappingDescription != 'New Entry') {
      this.newPortForwardRadio()
    }
  }
  lastDigitIPValid() {
    let ip;
    ip = this.newPortForwarding.InternalClient.split('.');
    if (parseInt(ip[3]) == 0) {
      this.ipError = true;
    } else {
      this.ipError = false;
    }
  }

  checkSupportMenu() {
    return document.querySelector('#supportListId button') ? false : true;
  }

  updateSWGPONDevices(model) {
    return ['812G', '813G', '844G-1', '844G-2', '854G-1', '854G-2'].filter(obj => (model.indexOf(obj) == 0)).length ? false : true;
  }

  focusedBeginingIp: boolean = false
  focusedEndingIp: boolean = false
  focusedDeviceIp: boolean = false
  onFocusBeginningIP() {
    this.focusedBeginingIp = true
    this.focusedEndingIp = false
    this.focusedDeviceIp = false;
  }
  onFocusEndingIP() {
    this.focusedEndingIp = true
    this.focusedBeginingIp = false
    this.focusedDeviceIp = false;
  }
  onFocusDeviceIP() {
    this.focusedDeviceIp = true;
    this.focusedEndingIp = false;
    this.focusedBeginingIp = false
  }
  closeDeleteConfirmation() {
    this.pfDeleteModalRef = false;
  }
  newPingIp() {
  }

  getLandport(serialNumber) {
    if (!this.connected) return;
    this.loading1 = true;
    this.routerService.getLandPort(this.orgId, serialNumber).subscribe(
      (data) => {
        let temp = true;
        if (data != null) {
          temp = data?.hasOwnProperty("error");
        }
        if (temp) {
          this.loading1 = false;
        }
        else {
          this.lanportKey = Object.keys(data);
          this.landportDetail = Object.values(data);
          this.loading1 = false;
        }
      }, err => {
        this.loading1 = false;

      });
  }

  modifylastChar(text, i) {

    const editedText = text.slice(0, -1) //'abcde'
    return editedText + (i + 1);
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
      this.dtOptions1.language = this.frTable;
      this.dtEventHistoryOptions.language = this.frTable;
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
      this.dtOptions1.language = this.esTable;
      this.dtEventHistoryOptions.language = this.esTable;
      this.tableOptions.language = this.esTable;
    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
      this.dtOptions1.language = this.germanTable;
      this.dtEventHistoryOptions.language = this.germanTable;
      this.tableOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && (this.dtOptions.language || this.dtOptions1.language || this.dtEventHistoryOptions.language)) {
      delete this.dtOptions.language;
      delete this.dtOptions1.language;
      delete this.dtEventHistoryOptions.language;
      delete this.tableOptions.language;
    }
  }

  isNumber(value) {
    return !isNaN(value);
  }


  // data1 : Highcharts.Options ={
  //   title: {
  //     text: ''
  //   },
  //   chart: {
  //     width : '500',
  //     type: 'line',
  //     style: {
  //       fontFamily: 'Source Sans Pro,Regular',
  //       fontSize: '12px',
  //       color: '#4c4c4c'
  //     },
  //   },

  //   credits: {
  //     enabled: false
  //   },
  //   xAxis : {
  //     title : {

  //     },
  //     categories : ['8:25 AM','8:30 AM','8:35 AM','8:40 AM','8:45 AM','8:50 AM','8:55 AM','9:00 AM','9:05 AM','9:10 AM',],

  //   },
  //   yAxis : {
  //     min: 0,
  //     max :100,
  //     allowDecimals: true,
  //     title :{
  //       text : 'BIP Errors/Minute'
  //     },
  //   },

  //   legend : {
  //     symbolHeight: 12,
  //     symbolWidth: 12,
  //     symbolRadius: 6
  //   },

  //   plotOptions : {
  //     series : {
  //       cursor : 'pointer',
  //       marker : {
  //         enabled : false
  //       },
  //       pointPlacement : 'on'
  //     }
  //   },
  //   series : [
  //     {
  //       name : 'BIP Down',
  //        type: 'line',
  //       data : [10,9,9.5,8,8,8.5,7,7.5,6,6.5]
  //     },
  //     {
  //       name : 'BIP Up',
  //       type : 'line',
  //       data : [9,10,8.5,9,10,8,7,7.5,8,7]
  //     }
  //   ]

  // }

  // data2 : Highcharts.Options ={
  //   chart : {
  //     width : '500',
  //   },

  //   title: {
  //     text: ''
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis : {
  //     title : {

  //     },
  //     categories : ['8:25 AM','8:30 AM','8:35 AM','8:40 AM','8:45 AM','8:50 AM','8:55 AM','9:00 AM','9:05 AM','9:10 AM',]
  //   },
  //   yAxis : {
  //     min: 0,
  //     max :100,
  //     allowDecimals: false,
  //     title :{
  //       text : 'BIP Errors/Minute'
  //     },
  //   },
  //   legend : {
  //     symbolHeight: 12,
  //     symbolWidth: 12,
  //     symbolRadius: 6
  //   },

  //   plotOptions : {
  //     series : {
  //       cursor : 'pointer',
  //       marker : {
  //         enabled : false
  //       },
  //       pointPlacement : 'on'
  //     }
  //   },
  //   series : [
  //     {
  //       name : 'FCE Down',
  //        type: 'line',
  //        data : [10,9,9.5,8,8,8.5,7,7.5,6,6.5]
  //     },
  //     {
  //       name : 'FCE Up',
  //       type : 'line',
  //       data : [9,10,8.5,9,10,8,7,7.5,8,7]
  //     }
  //   ]

  // }
  // values 

  // data3 : Highcharts.Options ={
  //   title: {
  //     text: ''
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis : {
  //     categories : ['Sun', 'Mon', 'Tues', 'Wed', 'Thus', 'Fri', 'Sat']
  //   },
  //   yAxis : {
  //     min : -30,
  //     max : -10,
  //     // labels : {
  //     //   format : '{}'
  //     // },

  //     allowDecimals: false,
  //     title :{
  //       text : 'Rx dbm'
  //     },
  //   },

  //   plotOptions : {
  //     series : {
  //       cursor : 'pointer',
  //       marker : {
  //         enabled : false
  //       },
  //       pointPlacement : 'on'
  //     }
  //   },
  //   series : [
  //     {
  //       type : 'line',
  //       data : [ -23,  -22.5,  -23,  -22.5,  -23.5, -22, -22.5]
  //     }
  //   ],

  //   legend : {
  //     enabled : false
  //   }


  // }

  // data4 : Highcharts.Options ={
  //   title: {
  //     text: ''
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   xAxis : {
  //     title : {

  //     },
  //     categories : ['Sun', 'Mon', 'Tues', 'Wed', 'Thus', 'Fri', 'Sat']
  //   },
  //   yAxis : {
  //     min: 0,
  //     max :8,
  //     allowDecimals: false,
  //     title :{
  //       text : 'Rx dbm'
  //     },
  //   },

  //   plotOptions : {
  //     series : {
  //       cursor : 'pointer',
  //       marker : {
  //         enabled : false
  //       },
  //       pointPlacement : 'on'
  //     }
  //   },
  //   series : [
  //     {
  //       type : 'line',
  //       data : [2,2,2.1,2.04,1.9,1.8,2.1]
  //     }
  //   ],

  //   legend : {
  //     enabled : false
  //   }

  // }
  // loadChart1(){
  //   Highcharts.chart('bitIntervalleavedChart', this.data1);
  //   Highcharts.chart('bitIntervalleavedChartFEC', this.data2);
  //   Highcharts.chart('rxPowerChart', this.data3);
  //   Highcharts.chart('txPowerChart', this.data4);

  // }


  loadChart() {


  }

  clearChartContainer(values: any) {

  }

  getValue(value) {
    this.ontRxPower = 0;
    if (value.length > 0) {
      for (let i = (value.length - 1); i >= 0; i--) {
        if (value[i] && value[i] > -40) {
          this.ontRxPower = value[i].toFixed('2');
          break;
        }
      }
    }
  }

  getTxLevel(value) {
    this.oltRxPower = 0;
    if (value.length > 0) {
      for (let i = (value.length - 1); i >= 0; i--) {
        if (value[i] && value[i] > -40) {
          this.oltRxPower = value[i].toFixed('2');
          break;
        }
      }
    }
    if (this.isontconfigured == true) {
      this.getupdownstreamoctets();
    }

  }

  getupdownstreamoctets() {
    this.octetLoader = true;
    this.downstramoctet = "-";
    this.upstreamoctet = "-";
    this.routerService.loadinterfacearraydetails(this.oltid, this.ontSn).subscribe((res: any) => {
      this.octetLoader = false;
      if (res && res.length) {
        //this.octetLoader = false;
        const requests = [];
        res.forEach(endpoint => {
          let iftypevalue = endpoint.ifType

          if (iftypevalue == "bbfOnuVEnet" || iftypevalue == "bridge" || iftypevalue == "ethernetCsmacd") {
            this.iftypearr.push(iftypevalue)
            const req = this.routerService.loadoctetdetails(endpoint.uuid, this.ontSn).pipe(map((res: any) => {
              return res;
            }),
              catchError((error: any) => {
                return of(error);
              }));
            requests.push(req);

          }

        });
        this.combineLatest = combineLatest(requests);
        this.xmlparsing();
      }
    }, err => {
      this.octetLoader = false;
      this.pageModalErrorHandle(err);
    });

  }

  xmlparsing() {
    this.octetLoader = true;
    this.combineLatest.subscribe((response: any) => {
      this.octetLoader = false;
      var upstreamsum = 0;
      var downstreamsum = 0;
      let testflag = 0
      for (let i = 0; i < response.length; i++) {
        if (response[i].message && response[i].status === "SUCCESS") {
          testflag = 1
          let xmlresponse = response[i].message
          let parser = new DOMParser();
          let parsedresponse = parser.parseFromString(xmlresponse, "text/xml");

          if (this.iftypearr[i] == "ethernetCsmacd") {
            if ((parsedresponse.getElementsByTagName("service-role")[0]) !== undefined) {
              var serviceroledata = parsedresponse.getElementsByTagName("service-role")[0];
              var serviceroledatachild = serviceroledata.childNodes[0];
              var servicerolevalue = serviceroledatachild.nodeValue

              if (servicerolevalue === "uni") {
                if ((parsedresponse.getElementsByTagName("upstream-octets")[0]) !== undefined) {

                  var upnode = parsedresponse.getElementsByTagName("upstream-octets")[0];
                  var upchild = upnode.childNodes[0];
                  var upnodevalue = JSON.parse(upchild.nodeValue)
                  upstreamsum = upstreamsum + upnodevalue;

                  var downnode = parsedresponse.getElementsByTagName("downstream-octets")[0];
                  var downchild = downnode.childNodes[0];
                  var downnodevalue = JSON.parse(downchild.nodeValue)
                  downstreamsum = downstreamsum + downnodevalue;

                }
              }
            }

          }
          else {

            if ((parsedresponse.getElementsByTagName("upstream-octets")[0]) !== undefined) {

              var upnode = parsedresponse.getElementsByTagName("upstream-octets")[0];
              var upchild = upnode.childNodes[0];
              var upnodevalue = JSON.parse(upchild.nodeValue)
              upstreamsum = upstreamsum + upnodevalue;

              var downnode = parsedresponse.getElementsByTagName("downstream-octets")[0];
              var downchild = downnode.childNodes[0];
              var downnodevalue = JSON.parse(downchild.nodeValue)
              downstreamsum = downstreamsum + downnodevalue;

            }

          }
        }
      }


      /////////////////below old method////////////////////////////////////////
      /* for (let i = 0; i < response.length; i++) {
 
         if (response[i].message && response[i].status === "SUCCESS") {
 
           let xmlresponse = response[i].message
           let parser = new DOMParser();
           let parsedresponse = parser.parseFromString(xmlresponse, "text/xml");
           if ((parsedresponse.getElementsByTagName("service-role")[0]) !== undefined) {
             var serviceroledata = parsedresponse.getElementsByTagName("service-role")[0];
             var serviceroledatachild = serviceroledata.childNodes[0];
 
             var servicerolevalue = serviceroledatachild.nodeValue
 
             if (servicerolevalue === "uni") {
               if ((parsedresponse.getElementsByTagName("in-octets")[0]) !== undefined) {
 
                 var upnode = parsedresponse.getElementsByTagName("in-octets")[0];
                 var upchild = upnode.childNodes[0];
                 var upnodevalue = JSON.parse(upchild.nodeValue)
                 upstreamsum = upstreamsum + upnodevalue;
 
                 var downnode = parsedresponse.getElementsByTagName("out-octets")[0];
                 var downchild = downnode.childNodes[0];
                 var downnodevalue = JSON.parse(downchild.nodeValue)
                 downstreamsum = downstreamsum + downnodevalue;
 
               }
             }
           }
           if ((parsedresponse.getElementsByTagName("in-octets")[0]) !== undefined) {
 
             var upnode = parsedresponse.getElementsByTagName("in-octets")[0];
             var upchild = upnode.childNodes[0];
             var upnodevalue = JSON.parse(upchild.nodeValue)
             upstreamsum = upstreamsum + upnodevalue;
 
             var downnode = parsedresponse.getElementsByTagName("out-octets")[0];
             var downchild = downnode.childNodes[0];
             var downnodevalue = JSON.parse(downchild.nodeValue)
             downstreamsum = downstreamsum + downnodevalue;
 
           }
 
         }
       }*/

      if (testflag == 0) {
        this.downstramoctet = "-";
        this.upstreamoctet = "-";
      }
      else {
        this.downstramoctet = downstreamsum;
        this.upstreamoctet = upstreamsum;
      }

    }, (err: HttpErrorResponse) => {
      this.octetLoader = false;
    }, () => {

    })
  }

  factoryResetViaDeviceInfo() {
    let i = 0;
    this.loader = true;
    this.routerService.getConnectivityStatus(this.orgId, this.routerSerialNumber, true).subscribe((res: any) => {
      this.loader = false;
      this.routerNotReachable = false;
      this.openOutModal(this.factoryresetModal);
      res.Uptime = this.dataService.timeToDays(res.Uptime);
      this.connected = res;
    }, err => {
      this.connected = false;
      this.loader = false;
      if (err?.error?.status === "423 Locked") {
        this.pageErrorHandle(err);
        this.connected = undefined;
      }
      if (this.connected != undefined) {
        this.routerNotReachable = true;
        this.openOutModal(this.factoryresetModal);
        return;
      }
    });
    /* if (this.connected != undefined) {
      this.routerNotReachable = !this.connected;
      this.openOutModal(this.factoryresetModal);
      return;
    } */
  }

  factoryRestAction() {
    let i = 0;
    if (sessionStorage.getItem('overviewStatus') == 'isLoaded') {
      const tabInfo = this.dataService.getSubscriberTabInfoData() || {};
      this.routerNotReachable = (tabInfo?.allIssues || []).filter((obj) => obj.code == 'GATEWAY_FAILED').length;
      this.openOutModal(this.factoryresetModal);
      //this.factoryresetModalOpen();
      //$('.openFactoryReset').trigger('click');
      return;
    }
    this.loader = true;
    const interval = setInterval(() => {
      if (sessionStorage.getItem('overviewStatus') == 'isLoaded') {
        this.loader = false;
        const tabInfo = this.dataService.getSubscriberTabInfoData() || {};
        this.routerNotReachable = tabInfo?.allIssues.filter((obj) => obj.code == 'GATEWAY_FAILED').length;
        this.openOutModal(this.factoryresetModal);
        //this.factoryresetModalOpen();
        //$('.openFactoryReset').trigger('click');
        clearInterval(interval);
      } else if (i > 18) {
        this.loader = false;
        clearInterval(interval);
      }
      i++;
    }, 1000);
  }
  getONTPage(ontSn) {
    this.routerService.getTimeSeriesPage(ontSn).subscribe((res: any) => {
      if (res.ontDevices && res.ontDevices.length && res.ontDevices[0].isAeOnt) {
        this.AEPage = true;
      } else {
        this.AEPage = false;
      }
    }, (err: any) => {
    })
  }
  loadOntData(ontSn, Device) {
    if (this.ssoService.getEntitlementsArr().indexOf('102') == -1) {
      if (this.deviceData.length) this.loadData(this.deviceData[0]["serialNumber"], this.deviceData[0])
      this.isOnt = false;
      return;
    }
    this.getONTPage(ontSn)
    this.isOnt = true;
    this.ontSn = ontSn;
    this.device = Device;
    setTimeout(() => {
      $('.subscriber-trends-wrapper [aria-label="Close"]').hide();
    }, 0);

    let param = {
      tenant: "0",
      granularity: "15min",
      startTime: this.FromDate,
      endTime: this.ToDate,
      oltRx: true,
      fsan: ontSn //(Device?.ont?.vendorId + Device?.ont?.serialNo)
      //ont: (Device?.ont?.uuid || '')   //'099555db-d9c1-4719-80e8-2a7495e5d9aa'
    }

    const tempSn = this.isOnt ? this.ontSn : this.routerSerialNumber;
    this.metaData = this.dataService.getMetaData(tempSn);

    if (this.metaData) {
      this.loadTimeseriesChart = [{
        params: param,
        paramname: 'Ont Chart',
        charttype: 'General',
        chartname: "CSC ONT",
        divid: 1,
        page: this.AEPage ? 'ae' : 'ont'
      }];
      this.routerService.afterOntReboot(Device?.ont?.vendorId, this.ontSn).subscribe((res: any) => {
        this.ontStatus = (res.ontDevices && res.ontDevices.length && res.ontDevices[0].state == 'ONLINE');
        this.isontconfigured = res.ontDevices[0].isConfigured
      }, err => {
        this.octetLoader = false
        this.pageModalErrorHandle(err);
      });
    } else this.getMetaData();
  }

  OntRefresh() {
    this.octetLoader = true
    this.downstramoctet = "-";
    this.upstreamoctet = "-";
    this.loadOntData(this.ontSn, this.device);
  }

  checkIpAddress(val, type) {
    let ipAddr = '';
    ipAddr = (type == "v4" && this.sso.isIpv4Address(val)) ? val : ipAddr;
    ipAddr = (type == "v6" && this.sso.isIpv6Address((val ? val.split('/')[0] : ''))) ? val : ipAddr;
    return ipAddr;
  }

}

