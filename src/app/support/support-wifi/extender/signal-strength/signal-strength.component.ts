import { Component, Input, OnInit, OnChanges, ViewChild, OnDestroy, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { combineLatest, ObjectUnsubscribedError, of, Subject } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import * as moment from 'moment';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DataServiceService } from 'src/app/support/data.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-signal-strength',
  templateUrl: './signal-strength.component.html',
  styleUrls: ['./signal-strength.component.scss']
})
export class SignalStrengthComponent implements OnInit, OnDestroy {



  @HostListener("click", ["$event"]) inClick(e) {
    //Slider bar Prev, Next click events

    e.stopPropagation();
    history.state.endTime = false;
    let id = e.target.id ? e.target.id : '';
    if (id == 'slider-click-next' || id == 'slider-click-prev') {
      let clsList = e.target.className ? e.target.className.split(' ')[0] : '';
      let tag = e.target.localName;
      let totalPoints = this.timeIntervals.length - 1;
      // console.log(this.selectedInterval)
      if (id == 'slider-click-next') {
        history.state.endTime = false;
        let point = parseInt(clsList.split('-')[1]);
        if ((point + 1) <= totalPoints) {
          this.selectedInterval = point + 1;
        }

      }

      if (id == 'slider-click-prev') {
        history.state.endTime = false;
        let point = parseInt(clsList.split('-')[1]);
        if ((point - 1) >= 0) {
          this.selectedInterval = point - 1;
        }
      }

      this.handleUserTime();
    }
    history.state.endTime = false;

  }




  @Input('routerData') routerData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('RGRouter') RGRouter;
  @Input('showCharts') showCharts;
  @Input('showSteeringLog') showSteeringLog;

  Highcharts = Highcharts;
  chartDataParsed: any;
  chartData: any;
  chartOptions: any = {};
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;
  showChart: boolean;
  loading: boolean = true;
  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  steeringData: any;
  steeringDataForTable: any = [];
  association: any;
  leftSliderTime: string;
  rightSliderTime: string;
  periods = [
    { label: 'Any 15 minutes within last day', value: '2' },
    { label: 'Last 1 day', value: '1' },
    { label: 'Last 3 days', value: '3' },
    { label: 'Last 7 days', value: '7' },
  ];
  periodSelected: any = '1';

  // periodSelected: any = '7';
  selectedInterval: any;
  timeIntervalOptions: Options = {
    hideLimitLabels: true,
    onlyBindHandles: true,
    stepsArray: [],
  };
  showIntervalSlider = false;
  timeIntervals: any[];
  TimeInterval = 1;
  steeringAvailable: boolean = false;
  steeringTableData: any = [];

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender: boolean = false;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'tipr',
    ordering: false,
  };
  errorSteeringInfo: any;
  errorSteering: boolean;
  renderedOnce: boolean = false;
  frTable: any;
  esTable: any;
  germanTable: any;
  metaData: any = {};
  hasSteering: boolean = false;
  rgsn: any;
  getSteerSubs: any;
  redirectData: any;
  any15min: any;
  constructor(
    private api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    public ssoAuthService: SsoAuthService,
    private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private dataService: DataServiceService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE

    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.makeParallelRequest();
      if (this.renderedOnce) {
        this.tableLanguageOptions();
        this.rerender();
      }
      // this.setPeriodOptions();
    });

    this.lastdays15MinOfValues();
  }

  ngOnInit(): void {
    this.redirectData = this.options.subject.subscribe(data => {
      this.any15min = data;
      if (this.any15min?.endTime != undefined) {
        this.periodSelected = this.any15min?.period
        this.calcOf15minVal();
        this.loadChart(true)
      }
    })
  }
  dropDownchange() {
    if (this.periodSelected != '2') {
      this.lastdays15MinOfValues();
    }

    if (this.any15min?.endTime != undefined)
      this.any15min.endTime = undefined;
  }

  sliderEvent() {


    setTimeout(() => {
      if (this.periodSelected == 2) {
        this.showIntervalSlider = true;
      }

      this.loadChart(true);



    }, 500);
  }


  userClickTimeout: any = setTimeout(() => { }, 0);
  handleUserTime() {
    clearTimeout(this.userClickTimeout);
    this.userClickTimeout = setTimeout(() => { this.loadChart(true); }, 2000);
  }
  ngOnChanges() {
    // this.setPeriodOptions();
    this.periodSelected = '1';
    let rgsn = (this.RGRouter && this.RGRouter.serialNumber) ? this.RGRouter.serialNumber : '';
    this.rgsn = rgsn;
    this.metaData = this.dataService.getMetaData(this.rgsn);
    if (!this.metaData) this.getMetaData();
    else {
      this.checkSteeringSupport();
    }
  }

  ngOnDestroy() {
    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.getSteerSubs) this.getSteerSubs.unsubscribe();
    if (this.redirectData) this.redirectData.unsubscribe();
  }

  loadChart(reload?) {
    this.closeAlert();
    if (reload) {
      this.isRerender = true;
    }
    this.getData()
  }

  pageErrorHandle(err: HttpErrorResponse, widget?) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }

    if (widget && widget == 'errorSteering') {
      this.errorSteeringInfo = this.errorInfo;
      this.errorSteering = true;
    } else {
      this.closeAlert();
      this.error = true;
    }
  }
  closeAlert() {
    this.error = false;
  }

  getDummy() {
    let dummy = "{\"data\":[{\"time\":1609437600000,\"rssi\":-75,\"phyrateUp\":22068,\"phyrateDown\":28631,\"bytesUp\":17170,\"bytesDown\":5224},{\"time\":1609462800000,\"rssi\":-80,\"phyrateUp\":2250,\"phyrateDown\":43600,\"bytesUp\":3990,\"bytesDown\":914},{\"time\":1609477200000,\"rssi\":-73,\"phyrateUp\":6000,\"phyrateDown\":1,\"bytesUp\":0,\"bytesDown\":0},{\"time\":1609610400000,\"rssi\":-73,\"phyrateUp\":17000,\"phyrateDown\":57800,\"bytesUp\":4140,\"bytesDown\":914},{\"time\":1609725600000,\"rssi\":-48,\"phyrateUp\":520664,\"phyrateDown\":175761.8,\"bytesUp\":795888.8,\"bytesDown\":60277463.2},{\"time\":1609729200000,\"rssi\":-45,\"phyrateUp\":740423.25,\"phyrateDown\":254548.25,\"bytesUp\":5059190.5,\"bytesDown\":302413891},{\"time\":1609732800000,\"rssi\":-58,\"phyrateUp\":704175,\"phyrateDown\":67900,\"bytesUp\":1934028.5,\"bytesDown\":150544335},{\"time\":1609736400000,\"rssi\":-43,\"phyrateUp\":747271.25,\"phyrateDown\":281864.75,\"bytesUp\":94541,\"bytesDown\":2341556.25},{\"time\":1609740000000,\"rssi\":-46,\"phyrateUp\":760121,\"phyrateDown\":277476,\"bytesUp\":120040,\"bytesDown\":375921},{\"time\":1609826400000,\"rssi\":-35,\"phyrateUp\":950613,\"phyrateDown\":627161.75,\"bytesUp\":38929.25,\"bytesDown\":318165},{\"time\":1609898400000,\"rssi\":-24,\"phyrateUp\":23154,\"phyrateDown\":10695.5,\"bytesUp\":3363381,\"bytesDown\":870350},{\"time\":1609902000000,\"rssi\":-24,\"phyrateUp\":44324,\"phyrateDown\":10458.5,\"bytesUp\":9561858.5,\"bytesDown\":1803561.25},{\"time\":1609905600000,\"rssi\":-24,\"phyrateUp\":48398.75,\"phyrateDown\":7380.5,\"bytesUp\":18872823.25,\"bytesDown\":2906303.25},{\"time\":1609909200000,\"rssi\":-35,\"phyrateUp\":344983,\"phyrateDown\":188848.125,\"bytesUp\":14737433.5,\"bytesDown\":4203230},{\"time\":1609912800000,\"rssi\":-42,\"phyrateUp\":427955.4166666667,\"phyrateDown\":231449.83333333334,\"bytesUp\":13924624.5,\"bytesDown\":20111139.333333332},{\"time\":1609916400000,\"rssi\":-37,\"phyrateUp\":551035.8888888889,\"phyrateDown\":308242,\"bytesUp\":20878321.111111112,\"bytesDown\":2879757.6666666665},{\"time\":1609920000000,\"rssi\":-33,\"phyrateUp\":610188,\"phyrateDown\":298412.625,\"bytesUp\":28067981.625,\"bytesDown\":13333671.125},{\"time\":1609923600000,\"rssi\":-43,\"phyrateUp\":217357.27272727274,\"phyrateDown\":165785.18181818182,\"bytesUp\":24128675.09090909,\"bytesDown\":19281652.454545453},{\"time\":1609927200000,\"rssi\":-32,\"phyrateUp\":31066.8,\"phyrateDown\":13283,\"bytesUp\":55570719.6,\"bytesDown\":6899218.4},{\"time\":1609930800000,\"rssi\":-25,\"phyrateUp\":43219.25,\"phyrateDown\":6373.5,\"bytesUp\":75306123,\"bytesDown\":9481051.25},{\"time\":1609934400000,\"rssi\":-25,\"phyrateUp\":45219.75,\"phyrateDown\":6413,\"bytesUp\":81823767,\"bytesDown\":10148215.5},{\"time\":1609938000000,\"rssi\":-24,\"phyrateUp\":40491.25,\"phyrateDown\":5651,\"bytesUp\":89819850.75,\"bytesDown\":11076016.25},{\"time\":1609941600000,\"rssi\":-25,\"phyrateUp\":43829.5,\"phyrateDown\":8400.25,\"bytesUp\":96917188.75,\"bytesDown\":12407339},{\"time\":1609945200000,\"rssi\":-24,\"phyrateUp\":29878.25,\"phyrateDown\":5054,\"bytesUp\":105575751.25,\"bytesDown\":13772618},{\"time\":1609948800000,\"rssi\":-25,\"phyrateUp\":41506.25,\"phyrateDown\":11107.75,\"bytesUp\":110584839,\"bytesDown\":14388063.75},{\"time\":1609952400000,\"rssi\":-25,\"phyrateUp\":40650.5,\"phyrateDown\":9383.5,\"bytesUp\":117329749,\"bytesDown\":15792788.75},{\"time\":1609956000000,\"rssi\":-24,\"phyrateUp\":43464,\"phyrateDown\":9756.75,\"bytesUp\":123519538,\"bytesDown\":16680492.25},{\"time\":1609959600000,\"rssi\":-24,\"phyrateUp\":31273.75,\"phyrateDown\":2387.75,\"bytesUp\":128079758,\"bytesDown\":17127191.5},{\"time\":1609963200000,\"rssi\":-24,\"phyrateUp\":31160.5,\"phyrateDown\":5171.75,\"bytesUp\":134475742.75,\"bytesDown\":17707859.25},{\"time\":1609966800000,\"rssi\":-25,\"phyrateUp\":36681.5,\"phyrateDown\":8129.75,\"bytesUp\":146638974.75,\"bytesDown\":19292621.75},{\"time\":1609970400000,\"rssi\":-35,\"phyrateUp\":24710.8,\"phyrateDown\":14507,\"bytesUp\":122565619.8,\"bytesDown\":16277502.6},{\"time\":1609974000000,\"rssi\":-24,\"phyrateUp\":38448.25,\"phyrateDown\":5149.75,\"bytesUp\":160956347.5,\"bytesDown\":21529964.25},{\"time\":1609977600000,\"rssi\":-24,\"phyrateUp\":43583.5,\"phyrateDown\":6162.25,\"bytesUp\":166261243.75,\"bytesDown\":22663944},{\"time\":1609981200000,\"rssi\":-24,\"phyrateUp\":37880,\"phyrateDown\":7305.25,\"bytesUp\":171495818.25,\"bytesDown\":23424947.75},{\"time\":1609984800000,\"rssi\":-25,\"phyrateUp\":45936.75,\"phyrateDown\":3758.75,\"bytesUp\":178709834.25,\"bytesDown\":24344083.25},{\"time\":1609988400000,\"rssi\":-24,\"phyrateUp\":35504.75,\"phyrateDown\":7359.5,\"bytesUp\":184578799.25,\"bytesDown\":25076732},{\"time\":1609992000000,\"rssi\":-24,\"phyrateUp\":36202.75,\"phyrateDown\":8070.75,\"bytesUp\":191950176.25,\"bytesDown\":25966321.5},{\"time\":1609995600000,\"rssi\":-33,\"phyrateUp\":570938.375,\"phyrateDown\":356893.75,\"bytesUp\":99546437.375,\"bytesDown\":13467126.5},{\"time\":1609999200000,\"rssi\":-33,\"phyrateUp\":478915.5,\"phyrateDown\":394727.3333333333,\"bytesUp\":103251245.33333333,\"bytesDown\":14068423.5}],\"dataCount\":39}";
    return dummy;
  }


  getData() {

    let end1 = this.timeIntervals[this.selectedInterval].date.getTime()
    let start = new Date(end1).setMinutes(new Date(end1).getMinutes() - 15)
    let mac;
    if (this.routerData.macAddress) {
      mac = this.routerData.macAddress;
    } else if (this.routerData.MACAddress) {
      mac = this.routerData.MACAddress;
    }
    this.loading = true;
    let rgsn = this.RGRouter.serialNumber;
    if (!this.isRerender) {
      this.steeringAvailable = false;
    }
    /* const requestEndpoints = [
      `${environment.SUPPORT_URL}/device/client/usage?stationMac=${mac}&lastndays=${this.periodSelected}`,
      `${environment.SUPPORT_URL}/device/client/steering-event?orgId=${this.orgId}&rgSn=${rgsn}&stationMac=${mac}&lastndays=${this.periodSelected}`,
      `${environment.SUPPORT_URL}/device/client/association-event?stationMac=${mac}&lastndays=${this.periodSelected}`,
    ]; */
    let requestEndpoints = []
    //   return this.http.get(`${environment.SUPPORT_URL}/device/client/usage?lastndays=${period}&stationMac=${macAddr}&startTime=${start}`);
    if (this.periodSelected === '2') {
      this.periodSelected

      start
      requestEndpoints = [
        `${environment.SUPPORT_URL}/device/client/usage?stationMac=${mac}&startTime=${start}`,
        `${environment.SUPPORT_URL}/device/client/steering-event?${this.ssoAuthService.getOrg(this.orgId)}rgSn=${rgsn}&stationMac=${mac}&lastndays=${this.periodSelected}`,
        `${environment.SUPPORT_URL}/device/client/association-event?stationMac=${mac}&lastndays=${this.periodSelected}`,
      ];
    } else {
      requestEndpoints = [
        `${environment.SUPPORT_URL}/device/client/usage?stationMac=${mac}&lastndays=${this.periodSelected}`,
        `${environment.SUPPORT_URL}/device/client/steering-event?${this.ssoAuthService.getOrg(this.orgId)}rgSn=${rgsn}&stationMac=${mac}&lastndays=${this.periodSelected}`,
        `${environment.SUPPORT_URL}/device/client/association-event?stationMac=${mac}&lastndays=${this.periodSelected}`,
      ];
    }

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.api.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error, 'errorSteering');
      } else {
        this.steeringData = (response[1] && response[1].length) ? response[1] : [];
        this.steeringDataForTable = (response[1] && response[1].length) ? response[1] : [];
        if (this.showSteeringLog && this.hasSteering) {
          this.showSteeringLogTable();
        }
      }

      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
      }


      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.loading = false;
        this.showChart = false;
      } else {
        if (response[0] && Object.keys(response[0]).length && response[0].data && response[0].data.length) {
          this.chartDataParsed = response[0];
          this.chartData = this.chartDataParsed.data;
          if (Object.keys(this.chartDataParsed).length && this.chartData && this.chartData.length) {

            if (response[2] && response[2].error) {
              this.pageErrorHandle(response[2].error);
            } else {
              this.association = response[2];
            }


            if (this.showCharts) {
              this.chartOptions = this.options.SignalStrengthChartOptions(this.chartData, this.periodSelected, this.language, this.steeringData, this.association.data).subscribe((res: any) => {
                this.Highcharts.chart('wifi-signal-chart', res);
              });

            }

            this.showChart = true;
            this.loading = false;
          } else {
            if (this.showCharts) {
              this.chartOptions = this.options.SignalStrengthChartOptions([], this.periodSelected, this.language).subscribe((res: any) => {
                this.Highcharts.chart('wifi-signal-chart', res);
              });

            }
            this.showChart = true;
            this.loading = false;
          }
        } else {
          if (this.showCharts) {
            this.chartOptions = this.options.SignalStrengthChartOptions([], this.periodSelected, this.language).subscribe((res: any) => {
              this.Highcharts.chart('wifi-signal-chart', res);
            });

          }
          this.showChart = true;
          this.loading = false;
        }
      }


      // if (response[0].length) {
      //   this.results = response[0][0];
      //   this.siteScanData(this.results, this.type);
      // }

      // if (response[1]) {
      //   this.resultsLatest = response[1][0];
      //   console.log(this.resultsLatest);
      // }


      setTimeout(() => {
        this.loading = false;
      }, 2000);

    }, (err: HttpErrorResponse) => {
      // this.showChart24G = false;
      // this.showChart5G = false;
      // this.pageErrorHandle(err);
      this.loading = false;
    }, () => {

    })
  }

  showSteeringLogTable(refresh?) {
    /*  if (!refresh) {
        if (this.renderedOnce) return;
      }*/
    this.tableLanguageOptions();
    //this.steeringData = this.steeringData.filter((el) => ((el.resultCode && el.resultCode.toUpperCase() == 'ACCEPT-0') && (el.note && (el.note.toUpperCase() == 'MOVED' || el.note.toUpperCase() == 'MOVEDTOOTHERBSSID'))));
    this.steeringDataForTable = this.commonOrgService.sortByColumn(this.steeringDataForTable, 'desc', 'startTime', true);
    this.steeringTableData = this.steeringDataForTable;

    if (this.isRerender || refresh) {
      this.rerender();
    } else {
      this.dtTrigger.next();
      this.renderedOnce = true;
    }
    if (refresh) {
      setTimeout(() => {
        this.steeringAvailable = true;
        this.loading = false;
      }, 1000)
    } else {
      this.steeringAvailable = true;
    }


  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  rerenderOnLanguageChange() {
    this.tableLanguageOptions();
    this.steeringAvailable = false;

    this.dtTrigger.next();
    this.renderedOnce = true;
    this.steeringAvailable = true;
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

  dummySteeringData() {
    let dummy = this.options.dummySteeringData2();
    return dummy;
  }

  changeDate(dt) {
    dt = this.dateUtils.getChartFormatDate(dt, 'MM/dd/yyyy, hh:mm:ss a', true);
    return dt;
  }

  setPeriodOptions() {
    let periods = [
      { label: 'Any 15 minutes within last day', value: '2' },
      { label: 'Last 1 day', value: '1' },
      { label: 'Last 3 days', value: '3' },
      { label: 'Last 7 days', value: '7' },
    ];

    this.periods = [...periods];
  }

  getMetaData() {
    //this.loading = true;
    if (!this.rgsn) return;
    this.dataService.fetchMetaData(this.orgId, this.rgsn).subscribe((res: any) => {
      //this.loading = false;
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.dataService.setMetaData(this.rgsn, this.metaData);
      this.checkSteeringSupport();
    }, err => {
      this.loading = false;
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

  checkSteeringSupport() {
    if (this.metaData && this.metaData?.SteeringEvent && this.metaData?.SteeringEvent?.supported) {
      this.hasSteering = true;
      this.loadChart();
    } else {
      this.hasSteering = false;
      this.loadChart();
    }
  }

  refreshLog() {
    this.getSteeringLogData(true);
  }

  getSteeringLogData(refresh?) {

    let mac;
    if (this.routerData.macAddress) {
      mac = this.routerData.macAddress;
    } else if (this.routerData.MACAddress) {
      mac = this.routerData.MACAddress;
    }
    this.loading = true;
    let rgsn = this.RGRouter.serialNumber
    let url = `${environment.SUPPORT_URL}/device/client/steering-event?${this.ssoAuthService.getOrg(this.orgId)}rgSn=${rgsn}&stationMac=${mac}&lastndays=${this.periodSelected}`;
    this.getSteerSubs = this.api.getSteeringLog(url).subscribe((res: any) => {
      this.steeringDataForTable = (res && res.length) ? res : [];
      if (this.showSteeringLog && this.hasSteering) {
        this.steeringAvailable = false;
        this.showSteeringLogTable(refresh);
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.steeringDataForTable = [];
      if (this.showSteeringLog && this.hasSteering) {
        this.steeringAvailable = false;
        this.showSteeringLogTable(refresh);
      }
    })
  }

  lastdays15MinOfValues() {

    let date = new Date();
    let coeff = 1000 * 60 * 15;
    let timeDuration = -24 * 60;
    let lastUpdatedTime;
    let that = this;
    let len = 0;

    let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
    let startTime = moment(lastTime).subtract(24, "hours");
    let currentTimestamp = new Date().setSeconds(0, 0);

    const minToRoundOf24hr = Math.ceil(
      (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      / (1000 * 60 * 60)
    ) > 24 ? 30 : 15;
    startTime = moment(startTime).add(15, 'minutes'); // omitting first 0th minute 

    this.timeIntervals = [];
    let current = moment(startTime);

    let i = 0;
    while (current <= lastTime) {
      this.timeIntervals.push({
        value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
        date: moment(current).toDate()
      });
      lastUpdatedTime = moment(current);
      current.add(15, 'minutes');
      i++;
    }


    len = this.timeIntervals.length;
    this.selectedInterval = this.timeIntervals[len - 1].value;
    this.timeIntervalOptions.stepsArray = [...this.timeIntervals];

    const translate = (value: number, label: LabelType): string => {
      let pointersTime = moment(that.timeIntervals[value]['date']);
      let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
      let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
      return `<span id="slider-click-prev" class="point-${value} dir-arrows" > </span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span > `;
    };
    this.timeIntervalOptions.translate = translate;
    //console.log(this.timeIntervals);

    this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
    this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');
    setTimeout(() => {
      this.showIntervalSlider = true;
      setTimeout(() => {
        $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
      }, 10);
    }, 1000)
  }
  calcOf15minVal() {
    let len = 0;
    let timeDuration = -24 * 60;
    let that = this;

    let date = new Date();
    let coeff = 1000 * 60 * 15;

    let lastUpdatedTime;


    let lastTime = moment(new Date(Math.floor(date.getTime() / coeff) * coeff)).seconds(0).milliseconds(0);
    let startTime = moment(lastTime).subtract(24, "hours");
    let currentTimestamp = new Date().setSeconds(0, 0);
    // let currentTimestamp = history?.state?.endTime

    const minToRoundOf24hr = Math.ceil(
      (currentTimestamp - new Date(moment(startTime).toDate()).getTime())
      / (1000 * 60 * 60)
    ) > 24 ? 30 : 15;
    startTime = moment(startTime).add(15, 'minutes'); // omitting first 0th minute 

    this.timeIntervals = [];
    let current = moment(startTime);

    let i = 0;
    while (current <= lastTime) {
      this.timeIntervals.push({
        value: i, legend: moment(current).format('MM/DD/YYYY HH:mm'),
        date: moment(current).toDate()
      });
      lastUpdatedTime = moment(current);
      current.add(15, 'minutes');
      i++;
    }
    len = this.timeIntervals.length;
    this.selectedInterval = this.timeIntervals[len - 1].value;

    let endtime = moment(this.any15min.endTime)
    let qoeEndTime = moment(endtime);
    let index = this.timeIntervals.findIndex(time => moment(time.date).isSame(qoeEndTime));

    if (index === -1) {
      let first = moment(this.timeIntervals[0].date);
      let last = moment(this.timeIntervals[len - 1].date);
      this.timeIntervals[0].date;
      let j = 0;
      let newIntervals = [];

      if (qoeEndTime < first) {
        while (qoeEndTime < first) {
          newIntervals.push({
            value: j, legend: moment(qoeEndTime).format('MM/DD/YYYY HH:mm'),
            date: moment(qoeEndTime).toDate()
          });
          qoeEndTime.add(15, 'minutes');
          j++;
        }

        let newLen = newIntervals.length;
        this.timeIntervals.map(t => t.value = t.value + newLen);
        this.timeIntervals = [...newIntervals, ...this.timeIntervals];
        index = 0;
      } else if (qoeEndTime < last) {

        index = len;
      }

    }

    this.selectedInterval = this.timeIntervals[index] ? this.timeIntervals[index + 1].value : this.timeIntervals[(this.timeIntervals.length - 1)].value;


    this.timeIntervalOptions.stepsArray = [...this.timeIntervals];
    const translate = (value: number, label: LabelType): string => {
      let pointersTime = moment(that.timeIntervals[value]['date']);
      let start = pointersTime.subtract(15, 'minutes').format('MMM DD hh:mm A');
      let end = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A');
      /*  let end = pointersTime.add(15, 'minutes').format('MMM DD hh:mm A');
       let start = moment(that.timeIntervals[value]['date']).format('MMM DD hh:mm A'); */
      return `<span id="slider-click-prev" class="point-${value} dir-arrows" ></span> ${start} - ${end} <span id="slider-click-next" class="point-${value} dir-arrows"></span>`;
    };
    this.timeIntervalOptions.translate = translate;


    this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
    this.rightSliderTime = moment(this.timeIntervals[len - 1].date).format('MMM DD hh:mm A');

    setTimeout(() => {
      this.showIntervalSlider = true;
      setTimeout(() => {
        $('.multi-point-slider .ngx-slider-pointer-min').attr('title', 'Drag to select Time frame');
      }, 10);
    }, 1000)
  }


}
