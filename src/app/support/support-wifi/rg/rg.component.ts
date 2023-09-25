import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from '../../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DataSerialNumberModel } from '../../shared/models/data.serial-number.model';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportRadioObjectModel } from '../../shared/models/support-radio-object.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportWifiService } from '../services/support-wifi.service';
import { environment } from 'src/environments/environment';
import { catchError, delay, map } from 'rxjs/operators';
import { combineLatest, ObjectUnsubscribedError, of, Subject, Subscriber } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { data, isArray } from 'jquery';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DataTableDirective } from 'angular-datatables';
import { WifiDownstreamTrafficComponent } from '../charts/wifi-downstream-traffic/wifi-downstream-traffic.component';
import { HistoricalAirTimeComponent } from '../charts/historical-air-time/historical-air-time.component';
import { AirTimeAnalysisComponent } from '../charts/air-time-analysis/air-time-analysis.component';

import * as _ from 'lodash';//begin-aswin-13-0-2021-busyness-hide
import { DygraphSiteScanService } from '../services/dygraph-sitescan.service';
import { config } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rg',
  templateUrl: './rg.component.html',
  styleUrls: ['./rg.component.scss'],
  providers: [SupportRadioService, SsoAuthService]
})
export class RgComponent implements OnInit, OnChanges, OnDestroy {


  @ViewChild('channelchangesModal', { static: true }) private channelchangesModal: TemplateRef<any>;
  @ViewChild('radioSummaryModal', { static: true }) private radioSummaryModal: TemplateRef<any>;
  @ViewChild('wpsModal', { static: true }) private wpsModal: TemplateRef<any>;
  @ViewChild('downstreamChild', { static: false }) private downstreamChild: WifiDownstreamTrafficComponent;
  @ViewChild('historicAirtimeChild', { static: false }) private historicAirtimeChild: HistoricalAirTimeComponent;
  @ViewChild('AirtimeChild', { static: false }) private AirtimeChild: AirTimeAnalysisComponent;
  modalRef: any;

  chartData;
  airtimeData;
  historyairtimeData;
  channelScore;
  channelData;
  language: any;
  languageSubject;
  dataSerialNumber: DataSerialNumberModel[];
  data: string;
  orgId: string;

  latestFSAN: string;
  routerData: any = {};

  radioSummary: any;
  radioSummarySubs: any;
  showRadioSummary: boolean;
  radioModes: any = [
    { label: '802.11ac', value: 'ac' },
    { label: '802.11ax', value: 'ax' },
    { label: '802.11b', value: 'b' },
    { label: '802.11g', value: 'g' },
    { label: '802.11n', value: 'n' },
    { label: '802.11b/g', value: 'bg' },
    { label: '802.11g/n', value: 'gn' },
    { label: '802.11b/g/n', value: 'bgn' }
  ];
  bandWidths: any = [
    { label: '20 MHz', value: '20MHz' },
    { label: '40 MHz', value: '40MHz' },
    { label: '60 MHz', value: '60MHz' },
    { label: '80 MHz', value: '80MHz' },
    { label: '100 MHz', value: '100MHz' },
  ];
  channels24 = ['Auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  channels5 = ['Auto', '36', '149'];
  powerLevels = [];

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  loading: boolean = true;
  showWPS: boolean = false;
  initialCheckData: any;
  errorInfo: any;
  error: boolean;
  success: boolean;

  channelChangeLogs: any = [];

  //WPS-----------
  primarySelect: boolean;
  iptvSelect: boolean;
  countDown: number;
  intervalWPS: any;
  showCountDown: boolean;
  connectDisabled: boolean;
  wpsError: boolean;
  wpsErrorInfo: string;
  wpsUpdating: boolean;

  //WPS-----------
  radio: any = {};
  rsEditData: any;
  rsEditType: any;
  metaData: any = {};
  radioSummaryUpdating: boolean;
  radioSummaryLoading: boolean;
  fixnowdisable: boolean;
  Fixnowtype;
  rsError: boolean;


  range: any = 'day';
  refRange: any = 'day';
  interval: any = 5;
  refInterval: any = 5;
  rsErrorInfo: any;


  ssidSelfHealData: any = {};
  ssidSelfHeal: boolean;
  ssidSelfHealTime: string;
  subsId: any;
  selfHealSubs: any;

  siteScanGHzTab = '2.4G';
  siteScanResults: any = [];
  showSiteScan: boolean;
  siteScanTableData: any = [];
  siteScanCurrentChannel: any;
  siteScanRecommendChannel: any;
  siteScanDisabled: boolean = true;

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'tipr',
    ordering: false,
  };
  changeLogOptions: DataTables.Settings = {
    dom: 't',
    ordering: false,
    paging: false,
  };
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  siteScanRunHappening: boolean;
  showReportsAirtime: boolean = true;
  scopeFlag: any = {};
  oldSiteScanResultsData: any;
  siteScanWarning: boolean;
  SiteScanWarningMsg: any;

  radioMetaEdits: any = {};
  lastRunTime: any;

  siteScanSSIDs: any = [];
  siteScanChannels: any = [];
  siteScanSSIDSelected: any = [];
  siteScanChannelSelected: any = [];
  reportIntervals = [
    { label: '15 minutes', value: '15min' },
    { label: '1 hour', value: 'hr' },
  ];
  reportRanges = [
    { label: 'Day', value: 'day' },
    { label: 'Past Week', value: 'past_week' },
    // { label: 'Past Month', value: 'past_month' }, // To fix CCL-41031
    // { label: 'Customized', value: 'customized' }, // To fix CCL-41031
  ];
  reportIntervalSelected: any = '15 minutes';
  reportRangeSelected: any = 'day';
  reportStartTime: any;
  reportEndTime: any;
  minimumDate: Date;
  maxDate: Date;
  refreshReportClicked: boolean;
  refStartTime: any;
  refEndTime: any;
  wifiRead: boolean;
  wifiWrite: boolean;
  channelChangeLogsTable: any[];
  channelChangeLogsData: any = {
    '2.4g': [],
    '5g': [],
    '6g': []
  };
  changelog24g = 'false';
  ssidChecked: boolean = true;
  busynessChecked: boolean = true;
  channelScoreCurrentChannel: any;
  channelChangeLoading: boolean;
  siteScanLoading: boolean;
  getSiteScanSubs: any;
  getChangeLogSubs: any;
  iptvSelectRadio: string;
  showWidgets = {
    changeLog: false,
    wps: false,
    radioSummary: false,
    radioSummaryEdit: false,
    airtimeAnalysis: false,
    backhaul: false,
    signalStrength: false,
    txrx: false,
    historicalAirtime: false,
    downstream: false,
    channelScore: false,
    siteScan: false,
    selfHeal: false
  };
  show5gWidgets: boolean = false;
  showSiteScanBusyness: boolean = false;

  oldRadio = {};
  radioSubmitEnabled = false;

  ssRecommendedData: any = {
    current_channel: '',
    current_ovl_channel_sidds: '',
    current_cco_sidds: '',
    current_tot_interfer: '',
    rec_channel: '',
    rec_ovl_channel_sidds: '',
    rec_cco_sidds: '',
    rec_tot_interfer: '',
    channel_from: '',
    channel_to: '',
    channel_changed_at: '',
  };
  emptySiteScanData: boolean;
  isRadio24gAvailable: boolean;
  isRadio5gAvailable: boolean;
  sitescanBusynessBand: any;
  issuesRunSitescan: boolean;
  siteScanError: boolean = false;
  siteScanErrorInfo: string = '';

  autoChnlAvailable: any = {
    type24G: false,
    type5G: false,
    type6G: false
  }
  showRecommendData: boolean;
  showFixSiteScan: boolean;
  sitescannote: boolean = false;
  recommendChannel: any;
  fixSiteScan: boolean;
  fixbuttonclick: boolean = false;
  wpsConnected: boolean;
  wpsDataAavilable: boolean;
  wpsConnectedData: { iptvSelect: boolean; wpsConnected: boolean; type: String } = {
    iptvSelect: false,
    wpsConnected: false,
    type: ""
  };
  changeLogDataAvailable: boolean;
  ssTableRenderedAtleastOnce: boolean = false;
  logs: string;
  frTable: any;
  esTable: any;
  germanTable: any;
  ssidSupport: any = {
    dataAvail: false,
    support: false
  }
  IssuesiteScan5gShow: boolean = false;
  metaDataLoader: boolean;
  refreshAlldisabled: boolean = true;
  DYGRAPH_CHART_SHOW: boolean = true;
  radioSummaryListError: boolean;
  radioSummaryListErrorInfo: any;
  saveRadioSummarySubs: any;
  saveRadioSummarySubs1: any;
  saveRadioSummarySubs2: any;
  orgSelfHealSubs: any;
  isRadio6gAvailable: boolean;
  isDev: boolean;
  show6gTab = false;
  gloObj: any = {};
  availability: any = {};
  availabilitySubs: any;
  renderbased = 'visible';
  unitfromapi
  unitfor24g
  unitfor5g
  unitfor6g
  hasFixed: any = [];
  constructor(
    private http: HttpClient,
    private radioService: SupportRadioService,
    private dataService: DataServiceService,
    public ssoAuthService: SsoAuthService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private api: SupportWifiService,
    private commonOrgService: CommonService,
    private dateUtils: DateUtilsService,
    private siteScanService: DygraphSiteScanService,
    private titleService: Title
  ) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.dataSerialNumber = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    // this.titleService.setTitle(`Calix Cloud - Support - Wi-Fi - RG - ${this.dataSerialNumber[0]["serialNumber"]}`);
    // this.dataSerialNumber?.forEach(obj => {
    //  if (obj.opMode == 'RG') {
    // this.titleService.setTitle(`${this.language['RG']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    //  }
    // });
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;

    let url = this.router.url;
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'WiFi', url, 'WiFi Routed Gateway page loaded');
    this.subsId = this.ssoAuthService.getCSCSubscriberId();
    if (this.subsId === 'undefined') this.subsId = undefined;

    this.isDev = this.ssoAuthService.isDevCheckFromBaseURL();
  }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['RG']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.setLastRunTime(this.siteScanResults);
      if (this.ssTableRenderedAtleastOnce) {
        this.tableLanguageOptions();
        setTimeout(() => {
          this.rerender();
        }, 200);
      }
      this.setReportRangesOptions();
    });
    this.titleService.setTitle(`${this.language['RG']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);

    //for associated device to fix CCL-32794
    if (this.subsId) {
      this.selfHealSubs = this.api.selfHealChanges.subscribe((data: any) => {
        this.ssidSelfHealData = data;
        this.ssidSelfHeal = data.selfHeal ? true : false;
        this.ssidSelfHealTime = data.enableTime ? this.dateUtils.getChartFormatDate(data.enableTime, 'MMM dd, yyyy HH:MM') : '';

        let router = this.routerData;
        if (router) {
          this.showRecommendDataCheck();
          this.showFixSiteScan = false;
          if (this.ssRecommendedData.rec_channel && this.ssRecommendedData.current_channel && this.ssRecommendedData.rec_channel != this.ssRecommendedData.current_channel) {
            if (this.metaData && this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported && !this.ssidSelfHeal) {
              this.showFixSiteScan = true;
            }
          }

        }

      });
    } else {
      this.getOrgSelfHealStatus();
    }


    this.closeAlert();

    this.route.params.subscribe(params => {
      let fsan = params['fsan'];
      this.metaData = this.dataService.getMetaData(fsan);

      this.availability = this.api.getWIFIAvailability(fsan);
      if (!this.availability) {
        this.getWIFIAvailability(fsan);
      }
      if (this.latestFSAN) {
        if (this.latestFSAN !== fsan) {
          this.resetSSIDSupprot();
          this.siteScanGHzTab = '2.4G';
          this.refreshAlldisabled = true;
          if (this.parallelReqSubscribtion) {
            this.parallelReqSubscribtion.unsubscribe();
          }
          this.closeAlert();
          this.latestFSAN = fsan;
          if (!this.metaData) this.getMetaData();
          else {
            this.checkSSIDSupport();
            this.show6gTab = false;
            if (this.metaData['SiteScan6G']) {
              this.show6gTab = true;
            }
          }
        }
      } else {
        this.resetSSIDSupprot();
        this.siteScanGHzTab = '2.4G';
        this.refreshAlldisabled = true;
        this.latestFSAN = fsan;
        this.closeAlert();
        if (!this.metaData) this.getMetaData();
        else {
          this.checkSSIDSupport();
          this.show6gTab = false;
          if (this.metaData['SiteScan6G']) {
            this.show6gTab = true;
          }
        }
      }

    });
    this.showWPS = false;
    if (this.metaData) this.loadChart();
    this.getScopes();

    this.reportIntervalSelected = '15min';
    this.reportRangeSelected = 'past_week';

    if (history?.state?.id) {
      setTimeout(() => {
        document.getElementById("wifi-rg-airtime-analysis-title").scrollIntoView();
      }, 0
      )
    }
    if (history?.state?.Sitescan) {
      if (history?.state?.Show5Gtab)
        this.IssuesiteScan5gShow = true;
      //this.issuesRunSitescan = true;
      setTimeout(() => {
        document.getElementById("wifi-rg-sitescan-container").scrollIntoView();
      }, 0
      )
    }
  }

  getMetaData() {
    //this.loading = true;
    if (!this.latestFSAN) return;
    this.metaDataLoader = true;
    this.show6gTab = false;
    this.dataService.fetchMetaData(this.orgId, this.latestFSAN).subscribe((res: any) => {
      //this.loading = false;
      this.metaDataLoader = false;
      this.metaData = res || {};


      res.properties.forEach(obj => {
        if (obj.featureName == 'SiteScan6G') {
          this.show6gTab = true;
        }
        this.reStructureMeta(obj);
      });
      this.dataService.setMetaData(this.latestFSAN, this.metaData);
      this.setMetaScopes();
      this.checkSSIDSupport();
    }, err => {
      this.loading = false;
      this.metaDataLoader = false;
      this.pageErrorHandle(err);
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

  ngOnChanges(changes: SimpleChanges): void {
  }


  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }
    if (this.radioSummarySubs) {
      this.radioSummarySubs.unsubscribe();
    }

    if (this.getSiteScanSubs) {
      this.getSiteScanSubs.unsubscribe();
    }

    if (this.getChangeLogSubs) {
      this.getChangeLogSubs.unsubscribe();
    }

    if (this.selfHealSubs) {
      this.selfHealSubs.unsubscribe();
    }

    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

    if (this.saveRadioSummarySubs) this.saveRadioSummarySubs.unsubscribe();
    if (this.saveRadioSummarySubs1) this.saveRadioSummarySubs1.unsubscribe();
    if (this.saveRadioSummarySubs2) this.saveRadioSummarySubs2.unsubscribe();
    if (this.orgSelfHealSubs) this.orgSelfHealSubs.unsubscribe();
    if (this.availabilitySubs) this.availabilitySubs.unsubscribe();

  }

  fetchRadioStatus() {

  }

  loadChart() {
    // this.dataService.airTimeAnalysisChart().subscribe((data) => {
    //   this.airtimeData = data
    // })
    // this.dataService.stackedAreaChartOptions1().subscribe((data) => {
    //   this.historyairtimeData = data
    // })
    // this.dataService.ChannelScoreChartOptions().subscribe((data) => {
    //   this.channelScore = data
    // })
    // this.dataService.ChannelScoreChart1Options().subscribe((data) => {
    //   this.channelData = data
    // });
  }


  channelchangesModalOpen() {
    if ((this.channelChangeLogsData['2.4g'].length) && (this.metaData?.ChannelChangeLogs24G)) {
      this.changelog24g = 'true';
      this.changeLog('2.4G');
    } else if ((this.channelChangeLogsData['5g'].length) && (this.metaData?.ChannelChangeLogs5G)) {
      this.changeLog('5G');
      this.changelog24g = 'false';
    } else if ((this.channelChangeLogsData['6g'].length) && (this.metaData?.ChannelChangeLogs6G)) {
      this.changeLog('6G');
      this.changelog24g = '6G';
    } else {
      this.changeLog('2.4G');
      this.changelog24g = 'hideboth';
    }

    this.dialogService.open(this.channelchangesModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  loadData() {
    this.setReportRangesOptions();
    this.reportIntervalSelected = '15min';
    this.reportRangeSelected = 'past_week';
    this.showWPS = false;
    this.showRadioSummary = false;
    let routerDatas = [];
    routerDatas = this.dataSerialNumber.filter((el) => el.serialNumber === this.latestFSAN);
    if (!routerDatas.length) {
      return;
    }
    this.routerData = routerDatas[0];
    this.setWidgetsShow();
    this.getData();
    this.refreshReport();

  }

  checkWirelessMode(item, type?) {
    let listOfModes = [];
    if (type && type == '2.4G') {
      listOfModes = this.metaData?.RadioStatus24G?.Mode?.valueList ? this.metaData?.RadioStatus24G?.Mode?.valueList : [];
    } else if (type && type == '5G') {
      listOfModes = this.metaData?.RadioStatus5G?.Mode?.valueList ? this.metaData?.RadioStatus5G?.Mode?.valueList : [];
    } else {
      listOfModes = this.metaData?.RadioStatus6G?.Mode?.valueList ? this.metaData?.RadioStatus6G?.Mode?.valueList : [];
    }
    let modes = [];

    if (typeof listOfModes[0] != 'object') {
      let label = '';
      listOfModes.forEach(e => {
        label = this.api.modeValueToText(type, e)
        modes.push({
          value: e, displayName: label
        });
      });
      listOfModes = modes.slice(0);
    }
    let match = listOfModes.filter((el) => el.value == item.Mode);

    return match.length ? match[0].displayName : "";
  }

  closeModal() {
    this.dialogService.dismissAll();
  }


  getData() {
    //this.loading = true;
    //this.getOrgEntitlements();

    this.loading = false;
    this.getRadioSummary();
  }

  getRadioSummary(ref?) {
    this.radioSummaryLoading = true;
    this.fixnowdisable = true
    this.isRadio24gAvailable = false;
    this.isRadio5gAvailable = false;
    this.isRadio6gAvailable = false;
    if (!this.fixSiteScan) {
      this.changeLogDataAvailable = false;
    }
    this.radioSummaryListError = false;
    this.radioSummarySubs = this.api.getRadioSummary(this.orgId, this.latestFSAN).subscribe((res) => {
      if (res && Object.keys(res).length) {
        this.radioSummary = res;
        //this.radioSummary['6G'] = this.radioSummary['2.4G']
        if (this.radioSummary['2.4G'] && Object.keys(this.radioSummary['2.4G']).length) {
          this.isRadio24gAvailable = true;
          this.unitfor24g = this.metaData?.RadioStatus24G?.PowerLevel?.unit ? this.metaData?.RadioStatus24G?.PowerLevel?.unit : '%';
        }
        if (this.radioSummary['5G'] && Object.keys(this.radioSummary['5G']).length) {
          this.isRadio5gAvailable = true;
          this.unitfor5g = this.metaData?.RadioStatus5G?.PowerLevel?.unit ? this.metaData?.RadioStatus5G?.PowerLevel?.unit : '%';
        }
        if (this.metaData?.RadioStatus6G && !this.radioSummary['6G']) {
          this.radioSummary['6G'] = {}
        }
        if (this.radioSummary['6G'] && Object.keys(this.radioSummary['6G']).length) {
          this.isRadio6gAvailable = true;
          this.unitfor6g = this.metaData?.RadioStatus6G?.PowerLevel?.unit ? this.metaData?.RadioStatus6G?.PowerLevel?.unit : '%';
        }
      } else {
        this.radioSummary = {};
      }
      if (this.fixSiteScan) {
        this.fixSiteScan = false;
        this.fixnowdisable = true;
        //this.showRecommendDataCheck();
      }
      else {
        this.getOtherWidgetsData(ref);
        this.fixnowdisable = false
      }

      this.showRadioSummary = true;
      this.radioSummaryLoading = false;
    }, (err: HttpErrorResponse) => {
      //this.radioSummary = {};
      this.pageErrorHandle(err, 'radioSummaryList');
      this.showRadioSummary = true;
      this.radioSummaryLoading = false;
      this.fixnowdisable = false
      if (this.fixSiteScan) {
        this.fixSiteScan = false;
        this.fixnowdisable = true;
        //this.showRecommendDataCheck();
      }
      else {
        this.fixnowdisable = false;
        this.getOtherWidgetsData(ref);
      }
      //this.getOtherWidgetsData(ref);
    })
  }

  getOtherWidgetsData(ref?) {
    if (this.metaData?.ChannelChangeLogs24G || this.metaData?.ChannelChangeLogs5G || this.metaData?.ChannelChangeLogs6G) {
      this.changeLogDataAvailable = false;
      this.getChannelChangeLog();
    }

    if (this.showWidgets.siteScan) {
      if (this.fixSiteScan) {
        this.fixSiteScan = false;
        this.runSiteScan();
      } else {
        if (ref) {
          this.getSiteScanData(ref);
        } else {
          this.getSiteScanData();
        }
      }

    }

    if (this.metaData?.WpsStateIptv || this.metaData?.WpsState5G || this.metaData?.WpsState24G || this.metaData?.WpsStateBackhaul) {
      this.wpsDataAavilable = false;
      this.getInitialCheck();
    }
    this.refreshAlldisabled = false;
  }

  getChannelChangeLog() {
    this.channelChangeLoading = true;
    this.getChangeLogSubs = this.api.getChannelChangeLogs(this.orgId, this.latestFSAN, this.routerData.macAddress).subscribe((res: any) => {
      this.channelChangeLogs = res;
      this.channelChangeLogs.forEach(e => {
        if (e.name === 'ChannelChangeLogs2.4G') {
          this.channelChangeLogsData['2.4g'] = e.result ? e.result : [];
        }
        if (e.name === 'ChannelChangeLogs5G') {
          this.channelChangeLogsData['5g'] = e.result ? e.result : [];
        }
        if (e.name === 'ChannelChangeLogs6G') {
          this.channelChangeLogsData['6g'] = e.result ? e.result : [];
        }
      });
      this.logs = JSON.stringify(this.channelChangeLogsData);
      if (this.channelChangeLogsData['2.4g'].length) {
        this.changeLog('2.4G');
      } else if (this.channelChangeLogsData['5g'].length) {
        this.changeLog('5G');
      } else {
        this.changeLog('6G');
      }
      this.channelChangeLoading = false;
      this.changeLogDataAvailable = true;
      this.sitescanChannelLog();

    }, (err: HttpErrorResponse) => {
      this.channelChangeLogs = [];
      this.channelChangeLogsTable = [];
      this.pageErrorHandle(err);
      this.channelChangeLoading = false;
      this.changeLogDataAvailable = true;
      this.sitescanChannelLog();
    });
  }

  getSiteScanData(ref?) {
    this.siteScanLoading = true;
    this.siteScanError = false;
    this.getSiteScanSubs = this.api.getsiteScanLatest(this.orgId, this.latestFSAN).subscribe((res: any) => {
      if (this.IssuesiteScan5gShow && !ref) {
        this.siteScanGHzTab = '5G';
      }

      if (res && typeof res == 'object' && Object.keys(res).length) {
        this.siteScanResults = res ? res : {};
      } else {
        this.siteScanResults = {};
        this.siteScanLoading = false;
        this.showSiteScan = true;
        this.siteScanDisabled = false;
        this.emptySiteScanData = true;
      }

      if (this.siteScanResults && Object.keys(this.siteScanResults).length && ref) {
        this.setLastRunTime(this.siteScanResults);
        this.changeSiteScanType(this.siteScanGHzTab, true, true);
        this.showSiteScan = true;
        this.siteScanLoading = false;
      } else if (this.siteScanResults && Object.keys(this.siteScanResults).length) {
        this.setLastRunTime(this.siteScanResults, true);
        this.changeSiteScanType(this.siteScanGHzTab);
        this.showSiteScan = true;
        this.siteScanLoading = false;
      }

      if (this.issuesRunSitescan) {
        this.issuesRunSitescan = false;
        setTimeout(() => {
          this.runSiteScan();
        }, 1500);
      }
    }, (err: HttpErrorResponse) => {
      this.siteScanResults = {};
      this.pageErrorHandle(err, 'sitescan');
      this.siteScanLoading = false;
      if (this.issuesRunSitescan) {
        this.issuesRunSitescan = false;
        setTimeout(() => {
          this.runSiteScan();
        }, 1500);
      }
    });
  }

  showWPSWizard() {
    this.wpsConnected = false;
    this.connectDisabled = false;
    this.modalRef = this.dialogService.open(this.wpsModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  getInitialCheck() {
    this.wpsConnected = false;
    this.api.getInitialCheck(this.orgId, this.latestFSAN).subscribe((res: any) => {
      this.initialCheckData = res ? res : {};
      this.setDefaultWPS();
      this.getWPSState();
      //this.getWPS(true);
      this.connectDisabled = false;
    }, (err: HttpErrorResponse) => {
      this.wpsConnected = false;
      this.connectDisabled = false;
    });
  }
  getWPSState() {
    this.wpsDataAavilable = false;
    this.wpsUpdating = true;
    this.api.getWpsCheck(this.orgId, this.latestFSAN).subscribe((res: any) => {
      this.wpsUpdating = false;
      this.gloObj.iptvSelectable = (res || []).filter(obj => ['Radio5GState', 'IptvState'].includes(obj.name) && (obj?.RadioEnabled || obj?.Enable) == "true").length == 2;
      this.gloObj.primarySelectable = (res || []).filter(obj => ["Radio2.4GState", 'Radio5GState', 'PrimarySSID5GState', "PrimarySSID2.4GState"].includes(obj.name) && (obj?.RadioEnabled || obj?.Enable) == "true").length == 4;
      this.gloObj.radioStatesEnabled = (res || []).filter(obj => ["Radio2.4GState", 'Radio5GState'].includes(obj.name) && (obj?.RadioEnabled || obj?.Enable) == "true").length > 0;
      this.iptvSelectRadio = this.gloObj.iptvSelectable
        ? 'true'
        : (this.gloObj.primarySelectable
          ? 'false'
          : (this.metaData?.WpsStateBackhaul ? 'backhaul' : ''));
      //this.getWpsSummary();
      setTimeout(() => {
        this.wpsDataAavilable = true;
      }, 1000);
    }, err => {
      this.wpsUpdating = false;
      this.iptvSelectRadio = this.metaData?.WpsStateBackhaul ? 'backhaul' : 'false';
      this.pageErrorHandle(err);
    });
  }

  getWpsSummary() {
    this.wpsDataAavilable = false;
    this.wpsUpdating = true;
    this.api.getWpsSummary(this.orgId, this.latestFSAN).subscribe((res: any) => {
      this.wpsUpdating = false;
      let wps = "";
      for (let i = 0; i < res.length; i++) {
        if ((res[i].name == "WpsState2.4G" && res[i].State == "Configured") || (res[i].name == "WpsState5G" && res[i].State == "Configured")) {
          this.wpsConnected = true;
          this.iptvSelectRadio = "false";
          wps = "primary";
          break;
        } else if (res[i].name == "WpsStateIptv" && res[i].State == "Configured") {
          this.wpsConnected = true;
          this.iptvSelectRadio = "true";
          wps = "iptv";
          break;
        } else if (res[i].name == "WpsStateBackhaul" && res[i].State == "Configured") {
          this.wpsConnected = true;
          this.iptvSelectRadio = "backhaul";
          wps = "wpsBackhaul";
          break;
        }
      }

      if (this.wpsConnected) {
        this.setConnectedWPS(wps);
      }
    }, err => {
      this.wpsUpdating = false;
      this.pageErrorHandle(err);
    });

    setTimeout(() => {
      this.wpsDataAavilable = true;
    }, 1000);
  }

  getWPS(initialCheck?) {
    let wps = 'primary';
    this.wpsDataAavilable = false;
    // if (initialCheck) {
    //   if (this.iptvSelect) {
    //     wps = 'iptv'
    //   } else {
    //     wps = 'primary'
    //   }
    // } else {
    //   if (this.iptvSelectRadio == 'true') {
    //     wps = 'iptv'
    //   } else {
    //     wps = 'primary'
    //   }
    // }
    if (this.iptvSelectRadio == 'true') {
      wps = 'iptv'
    } else if (this.iptvSelectRadio == 'backhaul') {
      wps = 'wpsBackhaul';
    } else {
      wps = 'primary'
    }
    this.api.getWPS(this.orgId, this.latestFSAN, wps).subscribe((res: any) => {
      this.checkIPTVConnected(res, wps);
      if (!initialCheck && this.wpsConnected) {
        clearInterval(this.intervalWPS);
        this.showCountDown = false;
      } else if (this.wpsConnected) {
        this.setConnectedWPS(wps);
      }
    }, (err: HttpErrorResponse) => {
      if (!initialCheck) {
        clearInterval(this.intervalWPS);
        this.showCountDown = false;
      }

      this.wpsDataAavilable = true;
      this.pageErrorHandle(err, 'wps');
    });
  }

  checkIPTVConnected(res, wps) {
    let connected = true;
    if (res && Array.isArray(res) && res.length) {
      connected = !!res.filter(element => element.State != 'Not configured').length;
      this.wpsConnected = connected;
      if (this.wpsConnected) {
        this.iptvSelectRadio = "false";
        this.setConnectedWPS(wps);
      }
    } else if (res && typeof res == 'object' && Object.keys(res).length) {
      if (res.State == 'Not configured') {
        connected = false;
      }
      this.wpsConnected = connected;
      if (this.wpsConnected) {
        this.setConnectedWPS(wps);
      }
    }
    setTimeout(() => {
      this.wpsDataAavilable = true;
    }, 1000);

  }

  setConnectedWPS(wps) {
    //to show connected button
    this.wpsConnectedData = {
      iptvSelect: (wps == 'iptv') ? true : false,
      wpsConnected: this.wpsConnected ? true : false,
      type: wps
    }
  }



  setDefaultWPS() {
    this.unselectAllWPS();
    if (this.initialCheckData && this.initialCheckData.Enable && this.initialCheckData.Enable == "true") {
      this.iptvSelect = true;
      //this.iptvSelectRadio = 'true';

    } else {
      this.iptvSelect = false;
      //this.primarySelect = true;
      //this.iptvSelectRadio = 'false';
    }
    //this.primarySelect = true;
    this.iptvSelectRadio = 'false';
  }

  unselectAllWPS() {
    this.iptvSelect = false;
    this.primarySelect = false;
    this.iptvSelectRadio = 'false';
  }

  chooseWPS(iptv) {
    this.wpsConnected = false;
    if (iptv == 'backhaul') {   //backhaul
      this.iptvSelectRadio = 'backhaul';
      if (this.wpsConnectedData && this.wpsConnectedData.type == "wpsBackhaul" && this.wpsConnectedData.wpsConnected) {
        this.wpsConnected = true;
      }
    } else if (iptv) {   //iptv
      this.iptvSelectRadio = 'true';
      if (this.wpsConnectedData && this.wpsConnectedData.type == "iptv" && this.wpsConnectedData.wpsConnected) {
        this.wpsConnected = true;
      }
    } else {      //primary
      this.iptvSelectRadio = 'false';
      if (this.wpsConnectedData && this.wpsConnectedData.type == "primary" && this.wpsConnectedData.wpsConnected) {
        this.wpsConnected = true;
      }
    }
  }

  connectWPS() {

    let wps = 'primary';
    if (this.iptvSelectRadio == 'true') {
      wps = 'iptv'
    } else if (this.iptvSelectRadio == 'backhaul') {
      wps = 'wpsBackhaul';
    } else {
      wps = 'primary'
    }

    this.connectDisabled = true;
    this.wpsUpdating = true
    this.api.putWPS(this.orgId, this.latestFSAN, wps, {}).subscribe((res: any) => {
      this.showTimer();
      this.wpsUpdating = false;
    }, (err: HttpErrorResponse) => {
      this.wpsUpdating = false;
      this.pageErrorHandle(err, 'wps');
    });

  }

  showTimer() {
    this.showCountDown = true;
    this.countDown = 120;
    this.intervalWPS = setInterval(() => {
      if (this.countDown % 5 == 0) {
        this.getWPS();
      }

      if (this.countDown == 0) {
        clearInterval(this.intervalWPS);
        this.showCountDown = false;
        this.connectDisabled = false;
        //this.getInitialCheck();
      }
      this.countDown--;
    }, 1000)
  }








  oldDataRadio;
  editRadioSummary(type, fixSiteScan?) {
    //debugger
    this.oldRadio = {}
    this.rsEditType = type;
    this.rsEditData = this.radioSummary[type];
    let feature = [];
    if (type && type == '2.4G') {
      feature = this.metaData?.RadioStatus24G?.PowerLevel?.valueList ? this.metaData?.RadioStatus24G?.PowerLevel?.valueList : [];
      this.unitfromapi = this.metaData?.RadioStatus24G?.PowerLevel?.unit ? this.metaData?.RadioStatus24G?.PowerLevel?.unit : '%';
    } else if (type && type == '5G') {
      feature = this.metaData?.RadioStatus5G?.PowerLevel?.valueList ? this.metaData?.RadioStatus5G?.PowerLevel?.valueList : [];
      this.unitfromapi = this.metaData?.RadioStatus5G?.PowerLevel?.unit ? this.metaData?.RadioStatus5G?.PowerLevel?.unit : '%';
    } else {
      feature = this.metaData?.RadioStatus6G?.PowerLevel?.valueList ? this.metaData?.RadioStatus6G?.PowerLevel?.valueList : [];
      this.unitfromapi = this.metaData?.RadioStatus6G?.PowerLevel?.unit ? this.metaData?.RadioStatus6G?.PowerLevel?.unit : '%';
    }

    this.powerLevels = feature.map(x => {
      const container = {};
      container['label'] = String(x) + this.unitfromapi; //String(x) + '%';
      container['value'] = String(x);
      return container;
    })

    this.radio = {
      RadioEnabled: this.rsEditData.RadioEnabled == 'true' ? true : false,
      Mode: this.rsEditData.Mode ? this.rsEditData.Mode : 'b',
      Bandwidth: this.rsEditData.Bandwidth ? this.rsEditData.Bandwidth : '20MHz',
      Channel: this.rsEditData.Channel ? this.rsEditData.Channel : 'Auto',
      NoiseLevel: this.rsEditData.NoiseLevel ? this.rsEditData.NoiseLevel : '',
      PowerLevel: this.rsEditData.PowerLevel ? this.rsEditData.PowerLevel : '10',
      PacketsSent: this.rsEditData.PacketsSent ? this.rsEditData.PacketsSent : '0',
      PacketsDroppedDownstream: this.rsEditData.PacketsDroppedDownstream ? this.rsEditData.PacketsDroppedDownstream : '0',
      PacketsReTransmittedDownstream: this.rsEditData.PacketsReTransmittedDownstream ? this.rsEditData.PacketsReTransmittedDownstream : '0',
      PacketsReceived: this.rsEditData.PacketsReceived ? this.rsEditData.PacketsReceived : '0',
      MulticastForwarding: this.rsEditData.MulticastForwarding == 'true' ? true : false,
      AirtimeFairness: this.rsEditData.AirtimeFairness == 'true' ? true : false,
      FrameBurst: this.rsEditData.FrameBurst == 'true' ? true : false,
      DFS: this.rsEditData.DFS == 'true' ? true : false,
      MUMIMO: this.rsEditData.MUMIMO == 'true' ? true : false,
      PSCOnly: this.rsEditData.PSCOnly == 'true' ? true : false,
    };

    if (this.rsEditData.AutoChannelEnable && this.rsEditData.AutoChannelEnable == 'true') {
      this.radio.Channel = 'Auto';
    }
    this.oldDataRadio = JSON.parse(JSON.stringify(this.radio));
    this.radioMetaEdits = {};
    this.setRadioModes(type);
    this.checkEditRadioSummaryScopes(type);
    this.oldRadio = JSON.parse(JSON.stringify(this.radio));
    if (fixSiteScan) {
      setTimeout(() => {
        this.radio.Channel = this.recommendChannel ? this.recommendChannel : 0;
        this.submitRadioSummary();
      }, 1000);
    } else {
      this.radioSubmitEnabled = false;
      this.rsError = false;
      this.modalRef = this.dialogService.open(this.radioSummaryModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
    }

  }

  submitRadioSummary() {
    let params = {};
    let oldData = this.oldDataRadio;
    if (this.radioMetaEdits?.RadioEnabled_writable && this.radio.RadioEnabled != oldData.RadioEnabled) {
      params['RadioEnabled'] = this.radio.RadioEnabled ? true : false;
    }
    if (this.radioMetaEdits?.Mode_writable && this.radio.Mode != oldData.Mode) {
      params['Mode'] = this.radio.Mode ? this.radio.Mode : 'b';
    }
    if (this.radioMetaEdits?.Bandwidth_writable && this.radio.Bandwidth != oldData.Bandwidth) {
      params['Bandwidth'] = this.radio.Bandwidth ? this.radio.Bandwidth : '20MHz';
    }
    if (this.radioMetaEdits?.Channel_writable && this.radio.Channel != oldData.Channel) {
      if (this.radioMetaEdits['AutoChannelEnable_writable']) {
        if (this.radio.Channel == 'Auto') {
          params['AutoChannelEnable'] = this.radioMetaEdits['AutoChannelEnable_boolean'] ? true : 1;
          //to fix CCL-37597
          if (this.radioMetaEdits['requiredChannel'] != undefined) {
            params['Channel'] = this.radioMetaEdits['requiredChannel'];
          }
        } else {
          params['AutoChannelEnable'] = this.radioMetaEdits['AutoChannelEnable_boolean'] ? false : 0;
          params['Channel'] = parseInt(this.radio.Channel);
        }

      } else {
        if (this.radio.Channel == 'Auto') {
          params['Channel'] = 0;
        } else {
          params['Channel'] = parseInt(this.radio.Channel);
        }
      }
    }

    if (this.radioMetaEdits?.NoiseLevel_writable && this.radio.NoiseLevel != oldData.NoiseLevel) {
      params['NoiseLevel'] = this.radio.NoiseLevel ? parseInt(this.radio.NoiseLevel) : 0;
    }

    if (this.radioMetaEdits?.PowerLevel_writable && this.radio.PowerLevel != oldData.PowerLevel) {
      params['PowerLevel'] = this.radio.PowerLevel ? parseInt(this.radio.PowerLevel) : 10;
    }

    if (this.radioMetaEdits?.PacketsSent_writable && this.radio.PacketsSent != oldData.PacketsSent) {
      params['PacketsSent'] = this.radio.PacketsSent ? parseInt(this.radio.PacketsSent) : 0;
    }

    if (this.radioMetaEdits?.PacketsReceived_writable && this.radio.PacketsReceived != oldData.PacketsReceived) {
      params['PacketsReceived'] = this.radio.PacketsReceived ? parseInt(this.radio.PacketsReceived) : 0;
    }
    if (this.radioMetaEdits?.PacketsDroppedDownstream_writable && this.radio.PacketsDroppedDownstream != oldData.PacketsDroppedDownstream) {
      params['PacketsDroppedDownstream'] = this.radio.PacketsDroppedDownstream ? parseInt(this.radio.PacketsDroppedDownstream) : 0;
    }
    if (this.radioMetaEdits?.PacketsReTransmittedDownstream_writable && this.radio.PacketsReTransmittedDownstream != oldData.PacketsReTransmittedDownstream) {
      params['PacketsReTransmittedDownstream'] = this.radio.PacketsReTransmittedDownstream ? parseInt(this.radio.PacketsReTransmittedDownstream) : 0;
    }


    if (this.rsEditType == '2.4G' || this.rsEditType == '6G') {
      if (this.radioMetaEdits?.MulticastForwarding_writable && this.radio.MulticastForwarding != oldData.MulticastForwarding) {
        params['MulticastForwarding'] = this.radio.MulticastForwarding ? true : false;
      }
      if (this.radioMetaEdits?.AirtimeFairness_writable && this.radio.AirtimeFairness != oldData.AirtimeFairness) {
        params['AirtimeFairness'] = this.radio.AirtimeFairness ? true : false;
      }
      if (this.radioMetaEdits?.FrameBurst_writable && this.radio.FrameBurst != oldData.FrameBurst) {
        params['FrameBurst'] = this.radio.FrameBurst ? true : false;
      }

      // if (this.radio.Channel == 'Auto') {
      //   params['Channel'] = parseInt(this.radioSummary['2.4G'].Channel);
      // }

      if (this.radioMetaEdits?.MUMIMO_writable && this.radio.MUMIMO != oldData.MUMIMO) {
        params['MUMIMO'] = this.radio.MUMIMO ? true : false;
      }

      if (this.radioMetaEdits?.PSCOnly_writable && this.radio.PSCOnly != oldData.PSCOnly) {
        //params['PSCOnly'] = this.radio.PSCOnly ? true : false;
      }

    } else {
      if (this.radioMetaEdits?.DFS_writable && this.radio.DFS != oldData.DFS) {
        params['DFS'] = this.radio.DFS ? true : false;
      }

      if (this.radioMetaEdits?.MUMIMO_writable && this.radio.MUMIMO != oldData.MUMIMO) {
        params['MUMIMO'] = this.radio.MUMIMO ? true : false;
      }

      // if (this.radio.Channel == 'Auto') {
      //   params['Channel'] = parseInt(this.radioSummary['5G'].Channel);
      // }

    }

    this.radioSummaryUpdating = true;
    this.radioSummaryLoading = true;
    this.fixnowdisable = false
    //To fix CCL-34477
    if (this.latestFSAN.toUpperCase() === '5M52975N01F07' && params['AutoChannelEnable'] != undefined && params['AutoChannelEnable'] == false) {
      this.updateRadioSummaryNewFlow(params);
    } else {
      this.saveRadioSummarySubs = this.api.saveRadioSummary(this.orgId, this.latestFSAN, this.rsEditType, params).subscribe((res: any) => {

        let delay = 30000;
        if (this.latestFSAN.toUpperCase() === '5M52975N01F07') {
          delay = 120000;
        }
        setTimeout(() => {
          this.radioSummaryUpdating = false;
          this.closeModal();
          this.getRadioSummary(true);
        }, delay);
        ///this.getChannelChangeLog();
        // this.showFixSiteScan = false;
        if (this.fixbuttonclick) {
          this.sitescannote = true; this.fixnowdisable = true;
        }

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, 'rsModal');
        this.radioSummaryUpdating = false;
        this.radioSummaryLoading = false;
        this.fixnowdisable = false
        if (this.fixbuttonclick) { this.sitescannote = false; }
        //  this.showFixSiteScan = false;
      });
    }

  }

  updateRadioSummaryNewFlow(params) {
    let param1 = {
      AutoChannelEnable: false
    };
    let param2 = _.cloneDeep(params);
    if (param2.AutoChannelEnable != undefined && param2.AutoChannelEnable == false) delete param2.AutoChannelEnable;
    this.saveRadioSummarySubs1 = this.api.saveRadioSummary(this.orgId, this.latestFSAN, this.rsEditType, param1).subscribe((res: any) => {
      this.saveRadioSummarySubs2 = this.api.saveRadioSummary(this.orgId, this.latestFSAN, this.rsEditType, param2).pipe(delay(31000)).subscribe((res2: any) => {
        let delay = 120000;
        setTimeout(() => {
          this.radioSummaryUpdating = false;
          this.closeModal();
          this.getRadioSummary(true);
        }, delay);

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, 'rsModal');
        this.radioSummaryUpdating = false;
        this.radioSummaryLoading = false;
        this.fixnowdisable = false
      });

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, 'rsModal');
      this.radioSummaryUpdating = false;
      this.radioSummaryLoading = false;
      this.fixnowdisable = false
    });
  }



  setRangeInterval(val, range?) {
    if (range) {
      this.range = val;
      if (range == 'customized') {

      }
    } else {
      this.interval = val;
    }
  }

  refreshReport() {
    this.refreshReportClicked = true;
    this.refInterval = this.interval;
    this.refRange = this.range;
    this.setReportStartEndTime();

  }

  changeSiteScanType(type, rerender?, ref?) {
    if (!ref) {
      if (type == this.siteScanGHzTab && rerender) return;
    }
    this.tableLanguageOptions();
    this.ssidChecked = true;
    this.busynessChecked = true;
    this.siteScanGHzTab = type;
    let radio = '';
    if (type == '2.4G') {
      radio = '24g';
    } else if (type == '5G') {
      radio = '5g';
    }
    else {
      radio = '6g';
    }

    /*if(this.Fixnowtype == type)
    { 
      this.sitescannote = true 
    }
    else{
      this.sitescannote = false 
    }
    */

    let scanRes = this.siteScanResults;
    this.siteScanTableData = [];
    this.siteScanDisabled = false;
    this.emptySiteScanData = false;
    if (!scanRes || !Object.keys(scanRes).length) {
      this.emptySiteScanData = true;
      return;
    } else if (!this.radioSummary) {
      this.emptySiteScanData = true;
      return;
    }
    if (type == '2.4G' && this.radioSummary && Object.keys(this.radioSummary['2.4G']).length && this.radioSummary['2.4G'].RadioEnabled == 'false') {
      this.siteScanDisabled = true;
      //return;
    } else if (type == '5G' && this.radioSummary && Object.keys(this.radioSummary['5G']).length && this.radioSummary['5G'].RadioEnabled == 'false') {
      this.siteScanDisabled = true;
      //return;
    } else if (type == '6G' && this.radioSummary && Object.keys(this.radioSummary['6G']).length && this.radioSummary['6G'].RadioEnabled == 'false') {
      this.siteScanDisabled = true;
      //return;
    }
    else if (type == '2.4G' && this.radioSummary && Object.keys(this.radioSummary['2.4G']).length == 0) {
      this.siteScanDisabled = true;
      //return;
    } else if (type == '5G' && this.radioSummary && Object.keys(this.radioSummary['5G']).length == 0) {
      this.siteScanDisabled = true;
      //return;
    }
    else if (type == '6G' && this.radioSummary && Object.keys(this.radioSummary['6G']).length == 0) {
      this.siteScanDisabled = true;
      //return;
    }


    let chnls = [];
    let ssids = [];
    scanRes?.neighbor?.forEach((r) => {
      if (r.radio === radio) {

        if (chnls.indexOf(r.channel) === -1) {
          chnls.push(r.channel);
        }
        if (ssids.indexOf(r.ssid) === -1) {
          if (!r.ssid || r.ssid == null || r.ssid == '') {
            r.ssid = `Hidden-${r.bssid}`;
          }
          ssids.push(r.ssid);
        }

        this.siteScanTableData.push(r);
      }
    });

    this.setRecommendData(scanRes, radio);

    chnls = chnls.sort(function (x, y) {
      x = x ? parseInt(x) : 0;
      y = y ? parseInt(y) : 0;
      return x - y;
    });
    ssids = ssids.sort();
    var filtered = ssids.filter(function (el) {
      return el != "";
    });

    this.siteScanChannels = [...chnls];
    this.siteScanSSIDs = [...filtered];
    this.siteScanChannelSelected = [];
    this.siteScanSSIDSelected = [];

    if (rerender) {
      if (this.ssTableRenderedAtleastOnce) {
        this.renderbased = 'hidden'
        this.rerender();
        setTimeout(() => {
          this.renderbased = 'visible'
        }, 200);

      } else {
        this.dtTrigger.next();
        this.ssTableRenderedAtleastOnce = true;
      }

    } else {
      this.dtTrigger.next();
      this.ssTableRenderedAtleastOnce = true;
    }
    /***begin-aswin-12-0-2021-busyness-hide */
    // if (scanRes.busyness && scanRes.busyness.length) {
    //   this.showSiteScanBusyness = true
    // } else {
    //   this.showSiteScanBusyness = false;
    // }
    // if (scanRes.busyness && scanRes.busyness.length) {
    //   let bw = scanRes[radio].channel_bandwidth;
    //   this.showSiteScanBusyness = false;
    //   scanRes.busyness.forEach(b => {
    //     if (b.radio == radio && b.channel_bandwidth == bw) {
    //       this.showSiteScanBusyness = true;
    //       return;
    //     }
    //   });

    // } else {
    //   this.showSiteScanBusyness = false;
    // }
    if (scanRes.busyness && scanRes.busyness.length) {
      // var busynessesGroupByBandwidth;
      // var busynesses;
      // busynesses = _.filter(scanRes.busyness, function (busyness) {
      //   return busyness['radio'] === radio;
      // });
      // busynessesGroupByBandwidth = _.groupBy(busynesses, function (busyness) {
      //   return busyness['channel_bandwidth'].toUpperCase()
      // });

      // var bandwidthList = _.keys(busynessesGroupByBandwidth);
      // let currentBand = scanRes[radio].channel_bandwidth;
      // // Only display 20MHz busyness for 2.4GHz
      // if (radio != '5g' && currentBand.toUpperCase() === '40MHZ') {
      //   this.showSiteScanBusyness = false;
      //   this.busynessChecked = false;
      // } else {
      //   this.showSiteScanBusyness = true;
      //   this.busynessChecked = true;
      // }

      var deviceObj = JSON.parse(sessionStorage.getItem('calix.deviceData'));
      var deviceInfo = deviceObj.filter((el) => el.serialNumber === this.latestFSAN)[0]

      sessionStorage.setItem('calix.wifi.deviceInfo', JSON.stringify(deviceInfo));
      var serialNumber = scanRes['sn'] ? scanRes['sn'] : deviceInfo.serialNumber;
      var radio24gObj = scanRes['24g'];
      var channelList = [];
      if (radio24gObj != null && radio24gObj['ranking_list'] != null) {
        radio24gObj['ranking_list'].forEach((obj, index) => {
          channelList.push(obj['channel']);
        });


        var radio24ChannelList = channelList;
      }
      channelList = [];
      var radio5gObj = scanRes['5g'];
      if (radio5gObj != null && radio5gObj['ranking_list'] != null) {
        radio5gObj['ranking_list'].forEach((obj, index) => {
          channelList.push(obj['channel']);
        });
        var radio5ChannelList = channelList;
      };
      sessionStorage.setItem('serialNumber', JSON.stringify(serialNumber))
      sessionStorage.setItem('radio24ChannelList', JSON.stringify(radio24ChannelList))
      sessionStorage.setItem('radio5ChannelList', JSON.stringify(radio5ChannelList))
      sessionStorage.setItem('wifidiag.sitescan', JSON.stringify(scanRes));
      if (radio == "24g") {
        //this.siteScanTypeChange('two');
        sessionStorage.setItem('currentTab', 'two');
        sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['2.4G']))

      } else {
        sessionStorage.setItem('currentTab', 'five');
        sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['5G']))

      };
      var siteScanObj = this.siteScanService.getSiteScanObj();
      var bandwidthList = siteScanObj['bandwidthList'];
      if (bandwidthList.length) {
        this.showSiteScanBusyness = true;
        this.busynessChecked = true;
      } else {
        this.showSiteScanBusyness = false;
        this.busynessChecked = false;
      }
    } else {
      this.showSiteScanBusyness = false;
    }


    /***end-aswin-12-0-2021-busyness-hide */
    if (!this.showSiteScanBusyness) {
      this.busynessChecked = false;
    }
    /***begin-aswin-12-0-2021-busyness-hide */
    //this.sitescanBusynessBand = scanRes[radio].channel_bandwidth ? scanRes[radio].channel_bandwidth : '';

    let band = this.showSiteScanBusyness ? (bandwidthList.length ? bandwidthList[0] : "") : '';
    this.sitescanBusynessBand = band ? band.replace("Z", "z") : band

    /***end-aswin-13-0-2021-busyness-hide */

    this.siteScanCurrentChannel = scanRes[radio]?.current ? scanRes[radio]?.current : {}
    this.siteScanRecommendChannel = scanRes[radio]?.recommend ? scanRes[radio]?.recommend : {}
  }

  /***begin-aswin-12-0-2021-busyness-hide */
  enableBusynessCheckBox(event: any) {

    this.showSiteScanBusyness = event.showSiteScanBusyness;
    this.busynessChecked = event.busynessChecked;
    this.sitescanBusynessBand = event.sitescanBusynessBand;
  }
  /***begin-aswin-12-0-2021-busyness-hide */
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  runSiteScan() {
    this.siteScanWarning = false;
    this.siteScanError = false;
    let type = this.siteScanGHzTab;
    if (this.radioSummary && this.radioSummary[type] && this.radioSummary[type].RadioEnabled == 'false') {
      this.SiteScanWarningMsg = this.language.SiteScanWarning;
      this.siteScanWarning = true;
      return;
    }

    this.siteScanRunHappening = true;
    if (this.dtTrigger) {
      //this.dtTrigger.unsubscribe();
    }
    //this.showSiteScan = false;
    this.siteScanSSIDSelected = [];
    this.siteScanChannelSelected = [];
    this.oldSiteScanResultsData = Object.keys(this.siteScanResults).length ? this.siteScanResults : {};
    this.api.siteScanRun(this.orgId, this.latestFSAN).subscribe((res: any) => {
      this.siteScanRunHappening = false;
      this.ssidChecked = true;
      this.busynessChecked = true;
      if (res && Object.keys(res).length && !Object.keys(this.oldSiteScanResultsData).length) {
        this.siteScanResults = res;
        this.showSiteScan = true;
        this.sitescannote = false;
        this.setLastRunTime(this.siteScanResults);
        this.changeSiteScanType(this.siteScanGHzTab);//this.changeSiteScanType(true);

      } else if (res && Object.keys(res).length) {
        this.siteScanResults = res;
        this.showSiteScan = true;
        this.sitescannote = false;
        this.setLastRunTime(this.siteScanResults);
        this.changeSiteScanType(this.siteScanGHzTab, true, true);

      }
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, 'sitescan');
        this.siteScanRunHappening = false;
        if (this.fixbuttonclick) { this.sitescannote = true; }

      })
  }

  changeReportsType(type, click?) {
    if (click && this.showReportsAirtime == type) return;
    this.showReportsAirtime = type ? true : false;
    this.refreshReportClicked = false;
    this.refreshReport();
  }


  pageErrorHandle(err: HttpErrorResponse, wizard?) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }
    this.closeAlert();
    if (wizard && wizard == 'rsModal') {
      this.rsErrorInfo = this.errorInfo;
      this.rsError = true;
    } else if (wizard && wizard == 'wps') {
      this.wpsErrorInfo = this.errorInfo;
      this.wpsError = true;
    } else if (wizard && wizard == 'sitescan') {
      this.siteScanErrorInfo = this.errorInfo;
      this.siteScanError = true;
    } else if (wizard && wizard == 'radioSummaryList') {
      this.radioSummaryListErrorInfo = this.errorInfo;
      this.radioSummaryListError = true;
    } else {
      this.error = true;
    }


  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.rsError = false;
    this.wpsError = false;
    this.siteScanWarning = false;
  }

  getScopes() {
    let scopes = this.ssoAuthService.getScopes();
    if (environment.VALIDATE_SCOPE) {
      if (this.ssoAuthService.getCscType() !== 'DME') {
        scopes['cloud.rbac.csc.wifi'] = scopes['cloud.rbac.csc.wifi'] ? scopes['cloud.rbac.csc.wifi'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi'])) {
          if (scopes['cloud.rbac.csc.wifi'].indexOf('read') !== -1) {
            this.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1) {
            this.wifiWrite = true;
          }
        }
      } else {
        scopes['cloud.rbac.csc.wifi.basic'] = scopes['cloud.rbac.csc.wifi.basic'] ? scopes['cloud.rbac.csc.wifi.basic'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi.basic'])) {
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('read') !== -1) {
            this.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1) {
            this.wifiWrite = true;
          }
        }
      }

    } else {

      this.wifiRead = true;
      this.wifiWrite = true;
    }
  }

  setRadioModes(type) {
    //this.radioMetaEdits = {};
    let listOfModes = [];
    let modes = [];
    let listOfBands = [], bands = [];
    if (type == '2.4G') {
      listOfModes = this.metaData?.RadioStatus24G?.Mode?.valueList ? this.metaData?.RadioStatus24G?.Mode?.valueList : [];
    } else if (type == '5G') {
      listOfModes = this.metaData?.RadioStatus5G?.Mode?.valueList ? this.metaData?.RadioStatus5G?.Mode?.valueList : [];
    } else {
      listOfModes = this.metaData?.RadioStatus6G?.Mode?.valueList ? this.metaData?.RadioStatus6G?.Mode?.valueList : [];
    }

    if (typeof listOfModes[0] != 'object') {
      let label = '';
      listOfModes.forEach(e => {
        label = this.api.modeValueToText(type, e)
        modes.push({
          value: e, displayName: label
        });
      });
      listOfModes = modes.slice(0);
    }

    this.radioMetaEdits['radioModes'] = [];
    this.radioMetaEdits['radioModes'] = [...listOfModes];
    this.changeEditRadioModes(type);
    this.setChannelModes(type);

  }

  changeEditRadioModes(type?) {
    let listOfBands = [], bands = [];
    let mode;
    if (type == '2.4G') {
      listOfBands = this.metaData?.RadioStatus24G?.Bandwidth?.valueList ? this.metaData?.RadioStatus24G?.Bandwidth?.valueList : [];
      if (_.isArray(listOfBands)) {
        bands = listOfBands ? listOfBands : [];
      } else {
        mode = this.radio.Mode;
        bands = listOfBands[mode] ? listOfBands[mode] : [];
      }
    } else if (type == '5G') {
      let valueList = {};
      if (this.metaData?.RadioStatus5G?.Bandwidth?.valueList && Object.keys(this.metaData?.RadioStatus5G?.Bandwidth?.valueList).length) {
        valueList = this.metaData?.RadioStatus5G?.Bandwidth?.valueList;
        if (Object.keys(valueList)[0] && _.isArray(valueList[Object.keys(valueList)[0]])) {
          listOfBands = this.metaData?.RadioStatus5G?.Bandwidth?.valueList ? this.metaData?.RadioStatus5G?.Bandwidth?.valueList : [];
        } else {
          if (this.radio.DFS) {
            listOfBands = this.metaData?.RadioStatus5G?.Bandwidth?.valueList?.dfsEnabled ? this.metaData?.RadioStatus5G?.Bandwidth?.valueList?.dfsEnabled : {};
          } else {
            if (this.radioSummary['5G'].DFS) {
              listOfBands = this.metaData?.RadioStatus5G?.Bandwidth?.valueList?.dfsDisabled ? this.metaData?.RadioStatus5G?.Bandwidth?.valueList?.dfsDisabled : {};
            } else {
              listOfBands = this.metaData?.RadioStatus5G?.Bandwidth?.valueList ? this.metaData?.RadioStatus5G?.Bandwidth?.valueList : {};
            }

          }
        }

        //To Fix 27307
        if (_.isArray(listOfBands)) {
          bands = listOfBands ? listOfBands : [];
        } else {
          mode = this.radio.Mode;
          bands = listOfBands[mode] ? listOfBands[mode] : [];
        }

        //To Fix 27307
        // if (this.metaData?.RadioStatus5G?.Mode && this.metaData?.RadioStatus5G?.Mode?.writable) {
        //   mode = this.radio.Mode;
        //   bands = listOfBands[mode] ? listOfBands[mode] : [];
        // } else {
        //   bands = listOfBands ? listOfBands : [];
        // }

      } else {
        bands = listOfBands ? listOfBands : [];
      }
    } else {
      listOfBands = this.metaData?.RadioStatus6G?.Bandwidth?.valueList ? this.metaData?.RadioStatus6G?.Bandwidth?.valueList : [];
      if (_.isArray(listOfBands)) {
        bands = listOfBands ? listOfBands : [];
      } else {
        mode = this.radio.Mode;
        bands = listOfBands[mode] ? listOfBands[mode] : [];
      }
    }



    this.radioMetaEdits['bandWidths'] = [];
    this.radioMetaEdits['bandWidths'] = [...bands];

    let checkSelectedBandAvailable = this.radioMetaEdits['bandWidths'].includes(this.radio.Bandwidth);
    if (!checkSelectedBandAvailable) {
      this.radio.Bandwidth = this.radioMetaEdits['bandWidths'][0];
    }
    this.setChannelModes(type);
  }

  changeEditBandWidth(type?) {

  }

  setChannelModes(type?) {
    let listOfChannels, listOfChannels2 = [], channels = [];
    let ch = this.radio.Channel;
    let band = this.radio.Bandwidth;
    if (type == '2.4G' || type == '6G') {

      listOfChannels = this.radioSummary[type].PossibleChannels ? this.radioSummary[type].PossibleChannels : [];
      if (_.isArray(listOfChannels)) {
        channels = [...listOfChannels];
      } else {
        channels = listOfChannels[band] ? listOfChannels[band] : [];
      }

    } else if (type == '5G') {
      if (this.radio.DFS) {
        listOfChannels = this.radioSummary['5G'].PossibleChannels?.dfsEnabled ? this.radioSummary['5G'].PossibleChannels?.dfsEnabled : [];
      } else {
        if (this.radioSummary['5G'].DFS) {
          //if dfs available
          listOfChannels = this.radioSummary['5G'].PossibleChannels?.dfsDisabled ? this.radioSummary['5G'].PossibleChannels?.dfsDisabled : [];
        } else {
          listOfChannels = this.radioSummary['5G'].PossibleChannels ? this.radioSummary['5G'].PossibleChannels : [];
        }

      }

      if (_.isArray(listOfChannels)) {
        channels = [...listOfChannels];
      } else {
        channels = listOfChannels[band] ? listOfChannels[band] : [];
      }
      /*
      if (this.metaData?.RadioStatus5G?.Bandwidth && this.metaData?.RadioStatus5G?.Bandwidth?.writable) {
        if (this.radio.DFS) {
          listOfChannels = this.radioSummary['5G'].PossibleChannels?.dfsEnabled ? this.radioSummary['5G'].PossibleChannels?.dfsEnabled : {};
        } else {
          if (this.radioSummary['5G'].DFS) {
            //if dfs available
            listOfChannels = this.radioSummary['5G'].PossibleChannels?.dfsDisabled ? this.radioSummary['5G'].PossibleChannels?.dfsDisabled : {};
          } else {
            listOfChannels = this.radioSummary['5G'].PossibleChannels ? this.radioSummary['5G'].PossibleChannels : {};
          }


        }
        channels = listOfChannels[band] ? listOfChannels[band] : [];
      } else {
        if (this.radio.DFS) {
          listOfChannels2 = this.radioSummary['5G'].PossibleChannels?.dfsEnabled ? this.radioSummary['5G'].PossibleChannels?.dfsEnabled : [];
        } else {
          if (this.radioSummary['5G'].DFS) {
            listOfChannels2 = this.radioSummary['5G'].PossibleChannels?.dfsDisabled ? this.radioSummary['5G'].PossibleChannels?.dfsDisabled : [];
          } else {
            listOfChannels2 = this.radioSummary['5G'].PossibleChannels ? this.radioSummary['5G'].PossibleChannels : [];
          }

        }
        channels = [...listOfChannels2];
      }
      */

    }


    channels = channels.map(String);
    this.radioMetaEdits['channels'] = [];
    if (type == '2.4G' && this.autoChnlAvailable.type24G) {
      this.radioMetaEdits['channels'] = ['Auto', ...channels];
    } else if (type == '5G' && this.autoChnlAvailable.type5G) {
      this.radioMetaEdits['channels'] = ['Auto', ...channels];
    } else if (type == '6G' && this.autoChnlAvailable.type6G) {
      this.radioMetaEdits['channels'] = ['Auto', ...channels];
    } else {
      this.radioMetaEdits['channels'] = [...channels];
    }

    let checkSelectedChnlAvailable = this.radioMetaEdits['channels'].includes(this.radio.Channel);
    if (!checkSelectedChnlAvailable) {
      this.radio.Channel = this.radioMetaEdits['channels'][0];
    }
  }

  setMetaScopes() {

  }

  checkEditRadioSummaryScopes(type?) {
    let rsType = 'RadioStatus24G';
    if (type == '5G') {
      rsType = 'RadioStatus5G';
    } else if (type == '6G') {
      rsType = 'RadioStatus6G';
    }
    this.radioMetaEdits['RadioEnabled_writable'] = this.metaData?.[rsType]?.RadioEnabled?.writable;
    this.radioMetaEdits['Mode_writable'] = this.metaData?.[rsType]?.Mode?.writable;
    this.radioMetaEdits['Bandwidth_writable'] = this.metaData?.[rsType]?.Bandwidth?.writable;
    this.radioMetaEdits['Channel_writable'] = this.metaData?.[rsType]?.Channel?.writable;
    this.radioMetaEdits['NoiseLevel_writable'] = this.metaData?.[rsType]?.NoiseLevel?.writable;
    this.radioMetaEdits['PacketsDroppedDownstream_writable'] = this.metaData?.[rsType]?.PacketsDroppedDownstream?.writable;
    this.radioMetaEdits['PacketsReTransmittedDownstream_writable'] = this.metaData?.[rsType]?.PacketsReTransmittedDownstream?.writable;
    this.radioMetaEdits['PacketsSent_writable'] = this.metaData?.[rsType]?.PacketsSent?.writable;
    this.radioMetaEdits['PacketsReceived_writable'] = this.metaData?.[rsType]?.PacketsReceived?.writable;

    if (type == '2.4G' || type == '6G') {
      this.radioMetaEdits['PowerLevel_writable'] = this.metaData?.[rsType]?.PowerLevel ? this.metaData?.[rsType]?.PowerLevel?.writable : false;
      this.radioMetaEdits['MulticastForwarding_writable'] = this.metaData?.[rsType]?.MulticastForwarding ? this.metaData?.[rsType]?.MulticastForwarding?.writable : false;
      this.radioMetaEdits['AirtimeFairness_writable'] = this.metaData?.[rsType]?.AirtimeFairness ? this.metaData?.[rsType]?.AirtimeFairness?.writable : false;
      this.radioMetaEdits['FrameBurst_writable'] = this.metaData?.[rsType]?.FrameBurst ? this.metaData?.[rsType]?.FrameBurst?.writable : false;
      this.radioMetaEdits['MUMIMO_writable'] = this.metaData?.[rsType]?.MUMIMO ? this.metaData?.[rsType]?.MUMIMO?.writable : false;
      this.radioMetaEdits['PSCOnly_writable'] = this.metaData?.[rsType]?.PSCOnly ? this.metaData?.[rsType]?.PSCOnly?.writable : false;
      this.radioMetaEdits['AutoChannelEnable_writable'] = this.metaData?.[rsType]?.AutoChannelEnable ? this.metaData?.[rsType]?.AutoChannelEnable?.writable : false;
      if (this.metaData?.[rsType]?.AutoChannelEnable && this.metaData?.[rsType]?.AutoChannelEnable?.writable && this.metaData?.[rsType]?.AutoChannelEnable?.valueList) {
        this.radioMetaEdits['AutoChannelEnable_boolean'] = false;
      } else {
        this.radioMetaEdits['AutoChannelEnable_boolean'] = true;
      }

    } else {
      this.radioMetaEdits['PowerLevel_writable'] = this.metaData?.[rsType]?.PowerLevel ? this.metaData?.[rsType]?.PowerLevel?.writable : false;
      this.radioMetaEdits['DFS_writable'] = this.metaData?.[rsType]?.DFS ? this.metaData?.[rsType]?.DFS?.writable : false;
      this.radioMetaEdits['MUMIMO_writable'] = this.metaData?.[rsType]?.MUMIMO ? this.metaData?.[rsType]?.MUMIMO?.writable : false;
      this.radioMetaEdits['AutoChannelEnable_writable'] = this.metaData?.[rsType]?.AutoChannelEnable ? this.metaData?.[rsType]?.AutoChannelEnable?.writable : false;
      if (this.metaData?.[rsType]?.AutoChannelEnable && this.metaData?.[rsType]?.AutoChannelEnable?.writable && this.metaData?.[rsType]?.AutoChannelEnable?.valueList) {
        this.radioMetaEdits['AutoChannelEnable_boolean'] = false;
      } else {
        this.radioMetaEdits['AutoChannelEnable_boolean'] = true;
      }

      if (this.rsEditData?.RegulatoryDomain && this.rsEditData?.RegulatoryDomain == 'GY') {
        this.radioMetaEdits['DFS_writable'] = false;
      }
    }

    let autoReqChannelType = 'AutoChannel24G';
    if (type == '5G') {
      autoReqChannelType = 'AutoChannel5G';
    } else if (type == '6G') {
      autoReqChannelType = 'AutoChannel6G';
    }
    this.radioMetaEdits['requiredChannel'] = this.metaData?.[autoReqChannelType]?.config?.requiredChannel;

  }

  setLastRunTime(dt, firstTimeLoad?) {
    let fr = (this.language.fileLanguage == 'fr') ? true : false;
    let es = (this.language.fileLanguage == 'es') ? true : false;
    if (dt && dt.timestamp) {
      let now: any = new Date();
      let ran: any = new Date(dt.timestamp);
      var hours = Math.floor(Math.abs(ran - now) / 36e5);
      if (hours) {
        this.lastRunTime = this.language.sitescanruntext(hours)
        /*this.lastRunTime = `(${this.language.Ran} ${hours} hour${(hours > 1) ? 's' : ''} ago)`;
        if (fr) {
          this.lastRunTime = `(exécuté il y a ${hours} heure${(hours > 1) ? 's' : ''})`;
        }
        if (es) {
          this.lastRunTime = `(completado hace ${hours} hora${(hours > 1) ? 's' : ''})`;
        }*/
      } else {
        this.lastRunTime = '(' + this.language.ran_less_than_an_hour_ago + ')';
        /* this.lastRunTime = `(ran less than an hour ago)`;
         if (fr) {
           this.lastRunTime = `(exécuté il y a moins d'une heure)`;
         }
         if (es) {
           this.lastRunTime = `(completado hace 1 hora)`;
         }*/
      }
    } else {
      if (firstTimeLoad) {
        this.lastRunTime = ``;
      } else {
        this.lastRunTime = '(' + this.language.ran_less_than_an_hour_ago + ')';
        /* this.lastRunTime = `(ran less than an hour ago)`;
         if (fr) {
           this.lastRunTime = `(exécuté il y a moins d'une heure)`;
         }
         if (es) {
           this.lastRunTime = `(completado hace 1 hora)`;
         }*/
      }
    }

  }



  siteScanFilter() {
    let res = this.siteScanResults;
    let radio = '';
    if (this.siteScanGHzTab == '2.4G') {
      radio = '24g';
    } else if (this.siteScanGHzTab == '5G') {
      radio = '5g';
    }
    else {
      radio = '6g';
    }
    let tbl = [];
    res.neighbor.forEach((r) => {
      if (r.radio === radio) {
        if (!this.siteScanChannelSelected.length && !this.siteScanSSIDSelected.length) {
          tbl.push(r);
        } else if (this.siteScanChannelSelected.length && !this.siteScanSSIDSelected.length && this.siteScanChannelSelected.includes(r.channel)) {
          tbl.push(r);
        } else if (!this.siteScanChannelSelected.length && this.siteScanSSIDSelected.length && this.siteScanSSIDSelected.includes(r.ssid)) {
          tbl.push(r);
        } else if (this.siteScanChannelSelected.length && this.siteScanSSIDSelected.length && (this.siteScanChannelSelected.includes(r.channel) && this.siteScanSSIDSelected.includes(r.ssid))) {
          tbl.push(r);
        }
      }

    });

    this.siteScanTableData = tbl;
    this.rerender();

  }

  ssidCheckUncheck() {
    //this.ssidChecked = true;
  }

  reportRangeChanges() {
    if (this.reportRangeSelected == 'customized') {
      this.setDate();
    }
  }

  setDate() {
    let today = new Date();
    let start = new Date();
    this.reportStartTime = new Date(start.setHours(0, 0, 0, 0));
    this.reportEndTime = today;
    this.maxDate = today;
    //this.WifiDownstreamTrafficComponent.getData();
  }
  warning = false
  waringInfo
  setReportStartEndTime() {
    if (this.reportRangeSelected == 'day') {
      // this.setDate();
      // this.refStartTime = this.reportStartTime.toISOString();
      // this.refEndTime = this.reportEndTime.toISOString();
      let d = this.api.getPrevDate('day', 1);
      this.refStartTime = d.firstDay.toISOString();
      this.refEndTime = d.lastDay.toISOString();
    } else if (this.reportRangeSelected == 'past_week') {
      let d = this.api.getPrevDate('day', 7);
      this.refStartTime = d.firstDay.toISOString();;
      this.refEndTime = d.lastDay.toISOString();;
    } else if (this.reportRangeSelected == 'past_month') {
      let d = this.api.getPrevDate('day', 30);
      this.refStartTime = d.firstDay.toISOString();;
      this.refEndTime = d.lastDay.toISOString();;
    } else if (this.reportRangeSelected == 'customized') {
      this.refStartTime = this.reportStartTime.toISOString();;
      this.refEndTime = this.reportEndTime.toISOString();;
    }
    if (this.refEndTime < this.refStartTime) {
      this.warning = true
      this.waringInfo = "Start time should be earlier than End Time."
    }
    else {
      this.warning = false
      setTimeout(() => {
        if (this.showReportsAirtime && this.showWidgets.historicalAirtime) {
          this.historicAirtimeChild.loadChart();
        } else if (this.showWidgets.downstream) {
          this.downstreamChild.loadChart();
        }
      }, 100);
    }


  }

  changeLog(type) {
    if (type == '2.4G') {
      this.channelChangeLogsTable = this.channelChangeLogsData['2.4g'] ? this.api.sortByTimestamp(this.channelChangeLogsData['2.4g'], 'TimeStamp', 'desc') : [];
    } else if (type == '5G') {
      this.channelChangeLogsTable = this.channelChangeLogsData['5g'] ? this.api.sortByTimestamp(this.channelChangeLogsData['5g'], 'TimeStamp', 'desc') : [];
    } else {
      this.channelChangeLogsTable = this.channelChangeLogsData['6g'] ? this.api.sortByTimestamp(this.channelChangeLogsData['6g'], 'TimeStamp', 'desc') : [];
    }

  }

  changeLogReason(code) {
    return this.api.getReason(code);
  }

  date_format(dt) {
    let time = parseInt(dt);
    return this.dateUtils.getChartFormatDate(time, 'MM/dd/yyyy, h:mm:ss a')
  }

  date_format_sitescan(dt) {
    return this.dateUtils.getChartFormatDate(dt, 'MM/dd/yyyy, h:mm:ss a')
  }


  refreshAll() {
    if (this.refreshAlldisabled) return;
    this.refreshAlldisabled = true;
    this.getRadioSummary(true);
    //this.getChannelChangeLog();
    // this.runSiteScan();
    // this.getInitialCheck();
  }


  setWidgetsShow() {
    this.showWidgets = {
      changeLog: false,
      wps: false,
      radioSummary: false,
      radioSummaryEdit: false,
      airtimeAnalysis: false,
      backhaul: false,
      signalStrength: false,
      txrx: false,
      historicalAirtime: false,
      downstream: false,
      channelScore: false,
      siteScan: false,
      selfHeal: false
    };
    this.showSiteScanBusyness = false;
    this.showRecommendData = true;
    let router = this.routerData;
    let model = router.modelName ? router.modelName.toUpperCase() : '';
    let opMode = router.opMode ? router.opMode.toUpperCase() : '';
    if (model && model.indexOf('804MESH') > -1) {
      this.showWidgets.backhaul = true;
    } else if (model && model.indexOf('844') > -1) {
      this.showWidgets = {
        radioSummary: true,
        radioSummaryEdit: false,
        airtimeAnalysis: true,
        backhaul: true,
        signalStrength: false,
        txrx: false,
        historicalAirtime: true,
        downstream: true,
        channelScore: true,
        changeLog: false,
        wps: false,
        siteScan: false,
        selfHeal: true
      };
    } else if (model && (this.ssoAuthService.acceptGSModel(model) || model.indexOf('GPR') > -1)) {
      this.showWidgets = {
        radioSummary: true,
        radioSummaryEdit: true,
        airtimeAnalysis: true,
        backhaul: true,
        signalStrength: true,
        txrx: true,
        historicalAirtime: true,
        downstream: true,
        channelScore: false,
        changeLog: false,
        wps: false,
        siteScan: false,
        selfHeal: false
      };
      this.showRecommendData = false;
    } else {
      this.showWidgets = {
        radioSummary: true,
        radioSummaryEdit: true,
        airtimeAnalysis: true,
        backhaul: true,
        signalStrength: true,
        txrx: true,
        historicalAirtime: true,
        downstream: true,
        channelScore: true,
        changeLog: false,
        wps: false,
        siteScan: false,
        selfHeal: true
      };
    }

    if (model && (model.indexOf('GC') > -1 && !this.ssidSelfHeal)) {
      this.showRecommendData = false;
    }

    if (model && (model.indexOf('844G') > -1 || model.indexOf('854G') > -1)) {
      this.showSiteScanBusyness = false;
    } else {
      this.showSiteScanBusyness = true;
    }
    this.showSiteScanBusyness = true;
    if (model && (model.indexOf('813G') > -1 || model.indexOf('813G') > -1)) {
      this.show5gWidgets = false;
    } else {
      this.show5gWidgets = true;
    }

    if (this.metaData && (this.metaData.RadioStatus24G || this.metaData.RadioStatus5G || this.metaData.RadioStatus6G)) {
      this.showWidgets.radioSummary = true;
    } else {
      this.showWidgets.radioSummary = false;
    }

    if (this.metaData && ((this.metaData?.RadioAirtime24G && this.metaData?.RadioAirtime24G && Object.keys(this.metaData?.RadioAirtime24G).length) || (this.metaData?.RadioAirtime5G && Object.keys(this.metaData?.RadioAirtime5G).length) || (this.metaData?.RadioAirtime6G && Object.keys(this.metaData?.RadioAirtime6G).length))) {
      this.showWidgets.airtimeAnalysis = true;
    } else {
      this.showWidgets.airtimeAnalysis = false;
    }

    if (this.metaData && this.metaData?.HistoricalRadioAirtime && this.metaData?.HistoricalRadioAirtime?.supported) {
      this.showWidgets.historicalAirtime = true;
    } else {
      this.showWidgets.historicalAirtime = false;
    }

    if (this.metaData && this.metaData?.DownstreamReport && this.metaData?.DownstreamReport?.supported) {
      this.showWidgets.downstream = true;
    } else {
      this.showWidgets.downstream = false;
    }

    if (!this.showWidgets.historicalAirtime) {
      this.showReportsAirtime = false;
    }

    if (this.metaData && this.metaData?.SiteScan && this.metaData?.SiteScan?.supported) {
      this.showWidgets.siteScan = true;
    } else {
      this.showWidgets.siteScan = false;
    }

    if (this.metaData && this.metaData?.AutoChannel24G && this.metaData?.AutoChannel24G?.config?.supported) {
      this.autoChnlAvailable.type24G = true;
    } else {
      this.autoChnlAvailable.type24G = false;
    }
    if (this.metaData && this.metaData?.AutoChannel5G && this.metaData?.AutoChannel5G?.config?.supported) {
      this.autoChnlAvailable.type5G = true;
    } else {
      this.autoChnlAvailable.type5G = false;
    }

    if (this.metaData && this.metaData?.AutoChannel6G && this.metaData?.AutoChannel6G?.config?.supported) {
      this.autoChnlAvailable.type6G = true;
    } else {
      this.autoChnlAvailable.type6G = false;
    }

    if (this.metaData && this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported) {
      this.showWidgets.channelScore = true;
    } else {
      this.showWidgets.channelScore = false;
    }


  }

  radioFieldChanged() {
    if (JSON.stringify(this.oldRadio) === JSON.stringify(this.radio)) {
      this.radioSubmitEnabled = false;
    } else {
      this.radioSubmitEnabled = true;
    }
  }

  setRecommendData(data, radio) {
    this.ssRecommendedData = {
      current_channel: '',
      current_ovl_channel_sidds: '',
      current_cco_sidds: '',
      current_tot_interfer: '',
      rec_channel: '',
      rec_ovl_channel_sidds: '',
      rec_cco_sidds: '',
      rec_tot_interfer: '',
      channel_from: '',
      channel_to: '',
      channel_changed_at: '',
    };

    if (data && Object.keys(data).length && data[radio] && Object.keys(data[radio]).length) {
      this.ssRecommendedData.current_channel = (data[radio].current && data[radio].current.channel != undefined) ? data[radio].current.channel : '';
      this.ssRecommendedData.current_ovl_channel_sidds = (data[radio].current && data[radio].current.uoc_channel_number) ? data[radio].current.uoc_channel_number : '0';
      this.ssRecommendedData.current_cco_sidds = (data[radio].current && data[radio].current.coc_channel_number) ? data[radio].current.coc_channel_number : '0';
      this.ssRecommendedData.current_tot_interfer = (data[radio].current && data[radio].current.power) ? data[radio].current.power : '';

      this.ssRecommendedData.rec_channel = (data[radio].recommend && data[radio].recommend.channel != undefined) ? data[radio].recommend.channel : '';
      this.ssRecommendedData.rec_ovl_channel_sidds = (data[radio].recommend && data[radio].recommend.uoc_channel_number != undefined) ? data[radio].recommend.uoc_channel_number : '0';
      this.ssRecommendedData.rec_cco_sidds = (data[radio].recommend && data[radio].recommend.coc_channel_number != undefined) ? data[radio].recommend.coc_channel_number : '0';
      this.ssRecommendedData.rec_tot_interfer = (data[radio].recommend && data[radio].recommend.power != undefined) ? data[radio].recommend.power : '';

      this.showFixSiteScan = false;
      if (data[radio].recommend && data[radio].recommend.channel && data[radio].current && data[radio].current.channel && data[radio].current.channel != data[radio].recommend.channel) {
        if (this.metaData && this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported && !this.ssidSelfHeal) {
          this.showFixSiteScan = true;
          this.fixnowdisable = false;
        }

        this.recommendChannel = data[radio].recommend.channel;
      }

      // if (this.ssRecommendedData.current_channel && this.ssRecommendedData.rec_channel && this.ssRecommendedData.rec_channel == this.ssRecommendedData.current_channel) {
      //   this.showRecommendData = false;
      // }
      this.showRecommendDataCheck();
      this.sitescanChannelLog();

    }

  }

  fixSiteScanRun() {
    let type = this.siteScanGHzTab;
    this.fixSiteScan = true;
    this.fixbuttonclick = true
    let fixScanData = {
      fsan: this.latestFSAN,
      type: type,
      current: this.ssRecommendedData.current_channel,
      recommend: this.ssRecommendedData.rec_channel
    }
    this.editRadioSummary(type, true);
    this.fixnowdisable = true;
    this.Fixnowtype = this.siteScanGHzTab;
    this.hasFixed.push(this.siteScanGHzTab);
  }

  showRecommendDataCheck() {
    // let router = this.routerData;
    // this.showRecommendData = true;
    //let model = router.modelName ? router.modelName.toUpperCase() : '';
    // if (model && ((model.indexOf('GC') > -1 && !this.ssidSelfHeal)) || model.indexOf('GS') > -1) {
    //   this.showRecommendData = false;
    // } else if ((this.ssRecommendedData.current_channel && this.ssRecommendedData.rec_channel && this.ssRecommendedData.rec_channel == this.ssRecommendedData.current_channel) || (this.ssidSelfHeal)) {
    //   this.showRecommendData = false;
    // }

    //added for CCL-25866
    this.showRecommendData = false;
    let router = this.routerData;
    let model = router.modelName ? router.modelName.toUpperCase() : '';
    if (this.metaData && (this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported) || (!this.metaData?.SelfHeal)) {
      this.showRecommendData = true;
      // if (model && ((model.indexOf('GC') > -1 && !this.ssidSelfHeal)) || model.indexOf('GS') > -1) {
      if (model && (this.ssoAuthService.acceptGSModel(model) || model.indexOf('GPR') > -1 || model.indexOf('GC') > -1)) {
        this.showRecommendData = false;
      }
    }
  }

  sitescanChannelLog() {
    let log = [];
    this.ssRecommendedData.channel_from = '';
    this.ssRecommendedData.channel_to = '';
    this.ssRecommendedData.channel_changed_at = '';
    if (this.siteScanGHzTab == '2.4G' && this.channelChangeLogsData['2.4g'] && this.channelChangeLogsData['2.4g'].length) {
      log = this.api.sortByTimestamp(this.channelChangeLogsData['2.4g'], 'TimeStamp', 'desc');
    } else if (this.siteScanGHzTab == '5G' && this.channelChangeLogsData['5g'] && this.channelChangeLogsData['5g'].length) {
      log = this.api.sortByTimestamp(this.channelChangeLogsData['5g'], 'TimeStamp', 'desc');
    }
    else if (this.siteScanGHzTab == '6G' && this.channelChangeLogsData['6g'] && this.channelChangeLogsData['6g'].length) {
      log = this.api.sortByTimestamp(this.channelChangeLogsData['6g'], 'TimeStamp', 'desc');
    }
    this.ssRecommendedData.channel_from = (log[1] && log[1].NewChannel) ? log[1].NewChannel : '';
    this.ssRecommendedData.channel_to = (log[0] && log[0].NewChannel) ? log[0].NewChannel : '';
    this.ssRecommendedData.channel_changed_at = (log[0] && log[0].TimeStamp) ? this.date_format(log[0].TimeStamp) : '';
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  setReportRangesOptions() {
    let ranges = [
      { label: this.language['Day'], value: 'day' },
      { label: this.language.past_week, value: 'past_week' },
      // { label: this.language.past_month, value: 'past_month' }, // To fix CCL-41031
      // { label: this.language.customized, value: 'customized' }, // To fix CCL-41031
    ];
    let intervals = [
      { label: '15 ' + this.language.Minutes, value: '15min' },
      { label: '1 ' + this.language.hour, value: 'hr' },
    ];

    this.reportRanges = [...ranges];
    this.reportIntervals = [...intervals];
  }

  checkSSIDSupport() {
    if (this.metaData && this.metaData.SSIDManager && this.metaData.SSIDManager.supported) {
      this.ssidSupport = {
        dataAvail: true,
        support: true
      }
      this.loadData();
    } else {
      this.ssidSupport = {
        dataAvail: false,
        support: false
      }
    }
    this.showHideSelfHeal();
  }

  resetSSIDSupprot() {
    this.ssidSupport = {
      dataAvail: false,
      support: false
    }
  }

  showHideSelfHeal() {
    if (this.metaData && this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported) {
      this.api.changeSelfHealVisibility(true);
    } else {
      this.api.changeSelfHealVisibility(false);
    }
  }

  getOrgSelfHealStatus() {
    this.orgSelfHealSubs = this.api.getOrgSelfHealStatus(this.orgId).subscribe((data: any) => {
      this.ssidSelfHealData = data;
      this.ssidSelfHeal = data.selfHeal ? true : false;
      this.ssidSelfHealTime = data.enableTime ? this.dateUtils.getChartFormatDate(data.enableTime, 'MMM dd, yyyy HH:MM') : '';

      let router = this.routerData;
      if (router) {
        this.showRecommendDataCheck();
        this.showFixSiteScan = false;
        if (this.ssRecommendedData.rec_channel && this.ssRecommendedData.current_channel && this.ssRecommendedData.rec_channel != this.ssRecommendedData.current_channel) {
          if (this.metaData && this.metaData?.SelfHeal && this.metaData?.SelfHeal?.supported && !this.ssidSelfHeal) {
            this.showFixSiteScan = true;
          }
        }

      }
    }, (error: HttpErrorResponse) => {
    });
  }

  getWIFIAvailability(fsan) {
    this.availabilitySubs = this.api.wifiAvailability(this.orgId, fsan).subscribe((res: any) => {
      this.api.setWIFIAvailability(res, this.latestFSAN);
      this.availability = res ? res : {};
    }, (err: HttpErrorResponse) => {
      this.availability = {};
    })
  }

}

