declare var require: any;
import { Component, OnInit, OnDestroy, ViewChild, HostListener, TemplateRef, AfterViewInit, ViewChildren, QueryList, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaUtilsService } from '../service/fa-utils.service';
import * as Highcharts from "highcharts/highstock";
import { TranslateService } from '../../../../app-services/translate.service';
import { SsoAuthService } from "../../../shared/services/sso-auth.service";
import { environment } from "../../../../environments/environment";
import customEvents from 'highcharts-custom-events';
customEvents(Highcharts);
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { OptionsManagerService } from "../service/options-manager.service";
import { RealTimeCommonFunctionService } from "../service/realtime-common-functions.service";
import { SupportRealtimeService } from '../support-realtime.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ngx-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit, OnDestroy, AfterViewInit {
  language: any;
  pageAvailable: boolean = false;
  topEndPointUpChartData: any;
  topEndPointUpXaxisArray = [];
  topEndPointUpXaxisIdArray = [];
  topEndPointUpXaxisSelection: boolean = false;
  topEndPointUpChartoptions: any;
  topEndPointUpChartSeriesData: any;

  topEndPointDownChartData: any;
  topEndPointDownXaxisArray = [];
  topEndPointDownXaxisIdArray = []
  topEndPointDownXaxisSelection: boolean = false;
  topEndPointDownChartoptions: any;
  topEndPointDownChartSeriesData: any;

  topAppsUpChartData: any;
  topAppsUpXaxisArray = [];
  topAppsUpXaxisIdArray = []
  topAppsUpXaxisSelection: boolean = false;
  topAppsUpChartoptions: any;
  topAppsUpChartSeriesData: any;

  topAppsDownChartSeriesData: any;
  topAppsDownChartData: any;
  topAppsDownXaxisArray = [];
  topAppsDownXaxisIdArray = []
  topAppsDownXaxisSelection: boolean = false;
  topAppsDownChartoptions: any;

  topLocationsUpChartData: any;
  topLocationsUpXaxisArray = [];
  topLocationsUpXaxisIdArray = [];
  topLocationsUpXaxisSelection: boolean = false;
  topLocationsUpChartoptions: any;
  topLocationsUpChartSeriesData: any;

  topLocationsDownChartSeriesData: any;
  topLocationsDownChartData: any;
  topLocationsDownXaxisArray = [];
  topLocationsDownXaxisIdArray = [];
  topLocationsDownXaxisSelection: boolean = false;
  topLocationsDownChartoptions: any;



  selectedTopLength = 5;
  topLengths: any = [];
  updateFlag: boolean = true;

  fsView: boolean = false;
  fsChartDetails: any = {};
  fsChartOptionsUp: any;
  fsChartOptionsDown: any;
  screenWidth: any;
  screenHeight: any;
  showChart = false;

  Highcharts = Highcharts;
  checkAllInterval: any;
  checkAllOptionsInterval: any;
  loading: boolean = true;
  delay: any;

  recordingComponent: any = Component;
  favoriteComponent: any = Component;
  startDate: any = new Date();
  recordName: string;
  rate: string = '';
  packet: string = '';
  @ViewChild('realtimeFavCreatePop', { static: true }) realtimeFavCreatePop: TemplateRef<any>;
  @ViewChild('recordCreatePop', { static: true }) recordCreatePop: TemplateRef<any>;


  createFavorite: boolean = true;
  createRecord: boolean = true;
  windowLen: any = 5;
  constructor(
    private router: Router,
    private customTranslateService: TranslateService,
    private sso: SsoAuthService,
    private optnsMngr: OptionsManagerService,
    private realTimeCommonFunctionService: RealTimeCommonFunctionService,
    private utils: FaUtilsService,
    private rtService: SupportRealtimeService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Realtime - Data - Service - Service - Calix Cloud');
    //this.checkAllOptions();
    this.loading = true;
    let breadCrumb = {
      mainRouteKeyName: 'network',
      mainRoute: '/fa/network',
      subRouteKeyName: 'networkMenuRealTime',
      subRoute: '/fa/network/realtime',
      setSchedule: false
    }

  }


  ngOnInit() {
    this.sso.setActionLog('CSC', 'pageHit', 'realtime', window.location.href, 'realtime reports intiated');

    this.rtService.delay$.subscribe((res: any) => {
      if (res) {
        this.loading = false;
        if (this.sso.getSubscriberEndpointId()) {
          this.getDataByNewToken();
        } else {
          this.sso.subscriberEndPointId$.subscribe((id: any) => {
            console.log('subscribe', id);
            if (id && this.router.url.indexOf('traffic-reports') !== -1) {
              this.getDataByNewToken();
            }
          });
        }
        this.getRtData();
        this.delay = (Math.abs(this.sso.getRealtimeDelay()) / 60000);
        this.delay = Number.isInteger(this.delay) ? this.delay : this.delay.toFixed(1);
      }
    })

    this.language = this.customTranslateService.defualtLanguage;
    this.rate = this.language.RATE;
    this.packet = this.language.PACKET;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {

      this.rate = data.RATE;
      this.packet = data.PACKET;
      this.language = data;

      if (this.fsView) {
        this.createTopLengthItems();
      }
    })
    this.topLengths = [
      { name: 'Top 5', value: 5 },
    ];

    let scope = this.sso.getScopes();

    if (scope) {
      if (scope && scope['cloud.fa.network.realtime'] && scope['cloud.fa.network.realtime'].indexOf('write') === -1) {
        this.createFavorite = false;
        this.createRecord = false;
      }
    }

  }

  ngAfterViewInit() {
    this.favoriteComponent = this.realtimeFavCreatePop;
    this.recordingComponent = this.recordCreatePop;
  }



  getChartOptions(data: any) {

  }

  fsName: string = '';
  fullscreen(whichTop: string) {
    this.fsChartDetails = {
      topChart: whichTop
    };
    this.fsView = true;
    this.fsName = whichTop;
    this.modifyCurrentOptionsToFS(whichTop);
    this.createTopLengthItems();

  }

  closeFullscreen() {

    this.selectedTopLength = 5;

    this.fsView = false;
    if (this.fsName === 'TEP') {
      let data = this.optnsMngr.getTopEP();
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getTopApp();
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getTopLoc();
      this.makeTLOCEvents(data);
    }

    this.fsName = '';

    this.fsChartDetails = {};
  }

  modifyCurrentOptionsToFS(chart: any) {
    switch (chart) {
      case 'TEP':

        this.fsChartDetails = {
          topChart: 'TEP',
          title: 'Endpoints'
        };

        let data = this.optnsMngr.getTopEP();

        this.makeTEPEvents(data);

        break;

      case 'TAPP':

        this.fsChartDetails = {
          topChart: 'TAPP',
          title: 'Applications'
        };
        let dataTapp = this.optnsMngr.getTopApp();

        this.makeTAPPEvents(dataTapp);

        break;

      case 'TLOC':
        // this.topLocationsUpChartoptions.chart.height = 560;
        // delete this.topLocationsUpChartoptions.chart.width;
        // this.topLocationsUpChartoptions.plotOptions.series.pointWidth = this.getFSPointWidth(this.selectedTopLength);

        // this.topLocationsDownChartoptions.chart.height = 560;
        // delete this.topLocationsDownChartoptions.chart.width;
        // this.topLocationsDownChartoptions.plotOptions.series.pointWidth = this.getFSPointWidth(this.selectedTopLength);

        this.fsChartDetails = {
          topChart: 'TLOC',
          title: 'Locations'
        };
        let dataTloc = this.optnsMngr.getTopLoc();

        this.makeTLOCEvents(dataTloc);

        break;
      default:
    }
  }
  ipAddress(data) {
    ////console.log(data);

  }


  getFSPointWidth(len: number | string) {
    let width = 14;
    switch (len) {
      case 5:
        width = 60;
        break;

      case 10:
        width = 30;
        break;

      case 20:
        width = 15;
        break;

      case 30:
        width = 10;
        break;
      default:
    }
    return width;
  }

  createTopLengthItems() {
    this.topLengths = [
      {
        name: this.language['Top 5 ' + this.fsChartDetails.title],
        value: 5
      },
      {
        name: this.language['Top 10 ' + this.fsChartDetails.title],
        value: 10
      },
      {
        name: this.language['Top 20 ' + this.fsChartDetails.title],
        value: 20
      },
      {
        name: this.language['Top 30 ' + this.fsChartDetails.title],
        value: 30
      },
    ];
  }

  ngOnDestroy() {

    // if (this.source) {
    //   this.source.close();
    // }

    // this.source = null;

    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }


    if (this.tASource) {
      this.tASource.close();
    }

    if (this.tESource) {
      this.tESource.close();
    }

    if (this.tLsource) {
      this.tLsource.close();
    }
  }

  checkAllOptions() {
    this.checkAllOptionsInterval = setInterval(() => {
      if (this.topEndPointUpChartoptions && this.topEndPointDownChartoptions && this.topAppsUpChartoptions && this.topAppsDownChartoptions && this.topLocationsUpChartoptions && this.topLocationsDownChartoptions) {
        this.loading = false;
        this.showChart = true;
        clearInterval(this.checkAllOptionsInterval);

      }
    }, 500);
  }

  gotoHistory(): void {
    this.router.navigate(['fa/traffic-record']);
  }

  data: any = {
    maxRate: [],
    packet: []
  };

  source: any;
  tLsource: any;
  tASource: any;
  tESource: any;
  showRealTime = false;

  tAPrcntData = {
    downPercentage: '',
    upPercentage: ''
  };
  tLPrcntData = {
    downPercentage: '',
    upPercentage: ''
  };
  tEPrcntData = {
    downPercentage: '',
    upPercentage: ''
  };

  tAData = {};
  tLData = {};
  tEPData = {};


  showBars = false;
  showTEPBars = false;
  getData(): any {
    let orgId = this.sso.getOrgId();
    let moniterType = 'EP';
    //let moniterId = `73a3404f-6c34-43b5-b3ac-02c00d56558a`
    let moniterId = this.sso.getSubscriberEndpointId();
    // moniterId = `1346cba3-4c4b-4fd0-8489-0aa93b08eed6`
    // orgId = 137573;

    if (!moniterId) {
      alert("subscriber endpoint id not set");
      //moniterId = '7167ec96-a3f4-4a31-882e-40847f131ae7';
    }

    if (this.source) {
      this.source = null;
    }

    let url = `${environment.SUPPORT_URL}/rt/sse/${orgId}/${moniterType}/${moniterId}/TRF,TAPP,TEP`;
    this.source = new EventSourcePolyfill(url, {
      headers: {
        'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
        'X-Calix-AccessToken': this.sso.getAccessToken()
      }
    });

    this.source.addEventListener('open', (message: any) => {
      console.log(JSON.stringify(message));
      console.log(message);

      console.log(new Date());

    });

    this.source.addEventListener('state', (message: any) => {
      console.log(JSON.stringify(message));
      console.log('state', message);
      console.log(new Date());

      let data = JSON.parse(message.data);

      if (data['status'].toLowerCase() === 's300') {
        this.data = {
          sendTime: (new Date()).getTime(),
          usage: [0, 0],
          maxRate: [0, 0],
          packet: [0, 0]
        };

        this.loading = false;
        this.showRealTime = true;

      }

    });


    this.source.addEventListener('message', (message: any) => {
      //console.log(message.data);
      console.log(JSON.parse(message.data));
      let data = JSON.parse(message.data);


      if (data.graphType === 'TRF') {
        this.data = JSON.parse(message.data);
        //this.data.usage = [Number(this.data.usage[0]) * 8 / 15, Number(this.data.usage[1]) * 8 / 15];
      } else {
        this.showBars = false;
      }


      // if (data.graphType === 'TLOC') {
      //   //this.tAData = data;
      //   this.optnsMngr.setTopLoc(data);
      //   this.makeTLOCEvents(data);
      // }

      if (data.graphType === 'TAPP') {
        //this.tAData = data;
        this.optnsMngr.setTopApp(data);
        this.makeTAPPEvents(data);

      }

      if (data.graphType === 'TEP') {

        this.topEndPointUpChartoptions = null;
        //this.tEPData = data;
        this.optnsMngr.setTopEP(data);
        this.makeTEPEvents(data);

      }

      this.loading = false;

      this.showRealTime = true;

    });

    this.source.addEventListener('error', (message: any) => {
      //console.log(JSON.parse(message));

      this.source.close();
      this.source = null;


    });



  }

  rtSubscription: any;
  ratePacketStreamSubscription: any;
  getRtData() {
    if (this.rtSubscription) {
      this.rtSubscription.unsubscribe();
    }

    if (this.ratePacketStreamSubscription) {
      this.ratePacketStreamSubscription.unsubscribe();
    }

    this.ratePacketStreamSubscription = this.rtService.ratePacketStreamData$.subscribe((data: any) => {
      console.log("subscription data", data);
      if (data.graphType === 'TRF') {

        let tmpArr = data['monitorString'] ? data['monitorString'].split("/") : [];
        if (tmpArr[tmpArr.length - 2] == this.sso.getSubscriberEndpointId()) {
          this.data = data;

        }

        this.showRealTime = true;

      } else {
        this.showBars = false;
      }

      this.loading = false;

    })

    this.rtSubscription = this.rtService.rtData$.subscribe((data: any) => {
      //console.log("subscription data", data);
      // if (data.graphType === 'TRF') {

      //   this.data = data;
      //   this.showRealTime = true;
      // } else {
      //   this.showBars = false;
      // }

      let tmpArr = data['monitorString'] ? data['monitorString'].split("/") : [];
      if (tmpArr[tmpArr.length - 2] !== this.sso.getSubscriberEndpointId()) {
        return;
      }

      if (data.graphType === 'TAPP') {
        //this.tAData = data;
        this.optnsMngr.setTopApp(data);
        this.makeTAPPEvents(data);

      }

      if (data.graphType === 'TEP') {

        this.topEndPointUpChartoptions = null;
        //this.tEPData = data;
        this.optnsMngr.setTopEP(data);
        this.makeTEPEvents(data);

      }

      this.loading = false;



    })
  }
  makeTEPEvents(data: any): any {
    //let data: any = this.tEPData;

    this.tEPrcntData = {
      downPercentage: data.downPercentage,
      upPercentage: data.upPercentage
    };

    let len = (this.fsView && this.fsName === 'TEP') ? this.selectedTopLength : 5;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.settepUpDataObj(data.upData);
    this.settepDownDataObj(data.downData)

    let topEndPointUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topEndPointDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);


    topEndPointUpChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 180;
    topEndPointUpChartoptions.plotOptions.series.cursor = "context-menu"
    topEndPointDownChartoptions.plotOptions.series.cursor = "context-menu"


    topEndPointUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(upLen) : 14;

    topEndPointDownChartoptions.chart.height = (this.fsView && this.fsName === 'TEP') ? 560 : 180;
    topEndPointDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TEP') ? this.getFSPointWidth(downLen) : 14;

    let that = this;
    topEndPointUpChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topEndPointUpChartXaxis text-primary" id="${that.tepUpDataObj[this.value]}" style="cursor:context-menu">${this.value}</span>`;
      },
    }
    topEndPointUpChartoptions['plotOptions'].series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tepUpDataObj[this.value], 'Endpoints');
      }
    };
    topEndPointDownChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topEndPointDownChartXaxis text-primary" id="${that.tepDownDataObj[this.value]}"  style=" cursor:context-menu">${this.value}</span>`;
      },
    }
    topEndPointDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tepDownDataObj[this.value], 'Endpoints');
      }
    };

    // topEndPointUpChartoptions.plotOptions.series.color = '#FF8238';
    topEndPointDownChartoptions.plotOptions.series.color = '#5ACFEA';



    this.topEndPointUpChartoptions = { ...topEndPointUpChartoptions };
    this.topEndPointDownChartoptions = { ...topEndPointDownChartoptions };

    // console.log(topEndPointUpChartoptions);
    // console.log(topEndPointDownChartoptions);

  }

  makeTLOCEvents(data: any): any {
    //let data: any = this.tAData;
    this.tLPrcntData = {
      downPercentage: data.downPercentage,
      upPercentage: data.upPercentage
    };

    let len = (this.fsView && this.fsName === 'TLOC') ? this.selectedTopLength : 5;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.settlocUpDataObj(data.upData);
    this.settlocDownDataObj(data.downData);

    let topLocationsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topLocationsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);

    topLocationsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 180;
    delete topLocationsUpChartoptions.chart.width;
    topLocationsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(upLen) : 14;

    topLocationsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TLOC') ? 560 : 180;
    delete topLocationsDownChartoptions.chart.width;
    topLocationsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TLOC') ? this.getFSPointWidth(downLen) : 14;



    let that = this;
    topLocationsUpChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topLocationsUpChartXaxis text-primary" id="${that.tlocUpDataObj[this.value]}"  style=" cursor:context-menu">${this.value}</span>`;
      },
    }
    topLocationsUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tlocUpDataObj[this.value], 'Locations');
      }

    };
    topLocationsDownChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topLocationsDownChartXaxis text-primary"   id="${that.tlocDownDataObj[this.value]}" style=" cursor:context-menu">${this.value}</span>`;
      },
    }
    topLocationsDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tlocDownDataObj[this.value], 'Locations');
      }
    };

    // topLocationsUpChartoptions.plotOptions.series.color = '#FF8238';
    topLocationsDownChartoptions.plotOptions.series.color = '#5ACFEA';


    this.topLocationsUpChartoptions = { ...topLocationsUpChartoptions };
    this.topLocationsDownChartoptions = { ...topLocationsDownChartoptions };
  }

  makeTAPPEvents(data?: any): any {

    //let data: any = this.tAData;
    this.tAPrcntData = {
      downPercentage: data.downPercentage,
      upPercentage: data.upPercentage
    };

    let len = (this.fsView && this.fsName === 'TAPP') ? this.selectedTopLength : 5;
    let upLen = data['upData'].length;
    let downLen = data['downData'].length;
    if (upLen >= len) {
      upLen = len;
    }

    if (downLen >= len) {
      downLen = len;
    }

    this.settapUpDataObj(data.upData);
    this.settapDownDataObj(data.downData);

    let topAppsUpChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'upData', len, this.fsView);
    let topAppsDownChartoptions = this.optnsMngr.makeOptionsForRTBC(data, 'bar', 'downData', len, this.fsView);
    topAppsUpChartoptions.plotOptions.series.cursor = "context-menu"
    topAppsDownChartoptions.plotOptions.series.cursor = "context-menu"

    topAppsUpChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 180;
    delete topAppsUpChartoptions.chart.width;
    topAppsUpChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(upLen) : 14;

    topAppsDownChartoptions.chart.height = (this.fsView && this.fsName === 'TAPP') ? 560 : 180;
    delete topAppsDownChartoptions.chart.width;
    topAppsDownChartoptions.plotOptions.series.pointWidth = (this.fsView && this.fsName === 'TAPP') ? this.getFSPointWidth(downLen) : 14;




    let that = this;
    topAppsUpChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topAppsUpChartXaxis text-primary"  id="${that.tapUpDataObj[this.value]}"  style=" cursor:context-menu">${this.value}</span>`;
      },
    }
    topAppsUpChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tapUpDataObj[this.value], 'Apps');

      }
    }
    topAppsDownChartoptions.xAxis.labels = {
      useHTML: true,
      formatter: function () {
        return `<span class="topAppsDownChartXaxis text-primary "  id="${that.tapDownDataObj[this.value]}" style=" cursor:context-menu">${this.value}</span>`;
      },
    }
    topAppsDownChartoptions.plotOptions.series.point.events = {
      click: function (event) {
        //that.realTimeCommonFunctionService.nagigationByUrl(this.category, that.tapDownDataObj[this.value], 'Apps');
      }

    }

    // topAppsUpChartoptions.plotOptions.series.color = '#FF8238';
    topAppsDownChartoptions.plotOptions.series.color = '#5ACFEA';

    this.topAppsUpChartoptions = { ...topAppsUpChartoptions };
    this.topAppsDownChartoptions = { ...topAppsDownChartoptions };

    // console.log(this.topAppsDownChartoptions);
    // console.log(this.topAppsUpChartoptions);

  }

  cachePacketData: any = {};
  cacheRateData: any = {};
  rateUnit = 'bps';
  packetUnit = 'pps';
  getDataByNewToken(): any {

    this.cachePacketData = this.rtService.getCachedata('packet');
    this.cacheRateData = this.rtService.getCachedata('rate');

    // console.log(this.cacheRateData);
    // console.log(this.cachePacketData);

    let length = Object.keys(this.cachePacketData).length;

    this.rateUnit = this.rtService.getCurrrentUnit('rate') ? this.rtService.getCurrrentUnit('rate') : 'bps';
    this.packetUnit = this.rtService.getCurrrentUnit('packet') ? this.rtService.getCurrrentUnit('packet') : 'pps';

    // console.log(this.rateUnit);
    // console.log(this.packetUnit);

    if (this.sso.getSubscriberEndpointId() !== window.localStorage.getItem('calix.temp_endpoint_id')) {

      this.rtService.clearData();

      this.cachePacketData = {};
      this.cacheRateData = {};

      if (this.rtSubscription) {
        this.rtSubscription.unsubscribe();
      }

      if (this.ratePacketStreamSubscription) {
        this.ratePacketStreamSubscription.unsubscribe();
      }
    }

    window.localStorage.setItem('calix.temp_endpoint_id', this.sso.getSubscriberEndpointId());



    if (Object.keys(this.cacheRateData).length) {
      //this.loading = false;

      //this.showRealTime = true;
    } else {
      this.sso.getAuthTokenByRT().subscribe((json: any) => {
        this.sso.setLoginInfo(json);
        //this.getData();

        this.rtService.getData();



      }, (err: any) => {
      });


    }


  }

  changeTopLength(): void {
    //console.log('event called');
    //this.loading = true;
    if (this.fsName === 'TEP') {
      let data = this.optnsMngr.getTopEP();
      this.makeTEPEvents(data);
    } else if (this.fsName === 'TAPP') {
      let data = this.optnsMngr.getTopApp();
      this.makeTAPPEvents(data);
    } else if (this.fsName === 'TLOC') {
      let data = this.optnsMngr.getTopLoc();
      this.makeTLOCEvents(data);
    }

  }

  tepUpDataObj = {};
  tepDownDataObj = {};
  tapUpDataObj = {};
  tapDownDataObj = {};
  tlocUpDataObj = {};
  tlocDownDataObj = {};

  public settepUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tepUpDataObj = obj;
  }

  public gettepUpDataObj(): any {
    return this.tepUpDataObj;
  }

  public settepDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tepDownDataObj = obj;
  }

  public gettepDownDataObj(): any {
    return this.tepDownDataObj;
  }

  public settapUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tapUpDataObj = obj;
  }

  public gettapUpDataObj(): any {
    return this.tapUpDataObj;
  }

  public settapDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tapDownDataObj = obj;
  }

  public gettapDownDataObj(): any {
    return this.tapDownDataObj;
  }

  public settlocDownDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tlocDownDataObj = obj;
  }

  public gettlocDownDataObj(): any {
    return this.tlocDownDataObj;
  }

  public settlocUpDataObj(data: any): any {
    let obj = {};
    data.forEach((element) => {
      obj[element.name] = element.id;
    });

    this.tlocUpDataObj = obj;
  }

  public gettlocUpDataObj(): any {
    return this.tlocUpDataObj;
  }

}
