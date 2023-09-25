import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NfainventoryService } from '../../pon-utilization/service/nfainventory.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
import { HealthService } from '../../service/health.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CcochartService } from '../../pon-utilization/service/ccochart.service';
// import * as Highcharts from 'highcharts/highstock';
import * as Highcharts from 'highcharts/highcharts';
import more from 'highcharts/highcharts-more';
import { Router } from '@angular/router';
import { FaUtilsService } from 'src/app/support/support-traffic-reports/service/fa-utils.service';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
require('highcharts/highcharts-more.js')(Highcharts);
more(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
@Component({
  selector: 'app-timeserieschart',
  templateUrl: './timeserieschart.component.html',
  styleUrls: ['./timeserieschart.component.scss']
})
export class TimeserieschartComponent implements OnInit {
  maxDate = new Date();
  minDateForCse = this.activeRoute.url.includes('support/router') ? new Date(new Date().setDate(new Date().getDate() - 90)) : new Date(new Date().setDate(new Date().getDate() - 727))
  maxForStartDate = new Date();
  @Input() wholedata: any;
  @Input() params: any;
  @Input() paramname: any;
  @Input() charttype: any;
  @Input() chartname: any;
  @Input() page: any;
  @Input() divid: any
  @Input() chartdata: any;
  @Input() title: any
  @Input() system: any
  @Input() interface: any
  @Output() valueChange = new EventEmitter();
  @Output() lastOntValue = new EventEmitter();
  @Output() lastTxValue = new EventEmitter();
  @Output() selectedlegend = new EventEmitter();
  highcharts = Highcharts;
  Timeseriesloader: boolean = false;
  singletimeseries: boolean = true;
  timeseriesDatamsg;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;

  FromDate;

  lowFromDate;
  lowToDate;
  Loading
  language: any;
  languageSubject: any;
  timeseriescharttype;
  timeseriesname
  modalInfo: string;
  ToDate: Date;
  modalTitle: any;
  modalRef: any;
  timeseriesid: string;
  timeseries: any;
  upprvValue: any = 0;
  previousvalue: any = {};
  last24hours: boolean = false;

  xaxislenght: any;
  timeseriesnameBip: string;
  doubleTimeseries: boolean = false;
  lowFromDateBIP: any;
  lowToDateBIP: any;
  TimeseriesloaderBIP: boolean = false;
  bipchartnameid: string;
  userselectedlegend: any = [];
  timeseriesDatamsg1: string;
  userselectedlegendbp: any[];
  timestamp: any[];
  toggleSubscription: any
  Errorratio: any;
  dsl: boolean=false;
  isCOC: boolean = false;
  csc: boolean;
  cscPage: boolean;
  constructor(private translateService: TranslateService,
    private healthService: HealthService,
    private CcochartService: CcochartService,
    private nfainventoryservice: NfainventoryService,
    private exportExcelService: ExportExcelService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private commonFunctionsService: CommonFunctionsService,
    private ShortnumberPipe: ShortnumberPipe,
    private dateUtilsService: DateUtilsService,
    private activeRoute: Router,
    private utils: FaUtilsService,
    private sso: SsoAuthService,
    private router: Router,

  ) {
    this.isCOC = this.router.url.includes('cco/health')
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.toggleSubscription = this.sso.toggled$.subscribe((data: any) => {
      console.log(Highcharts.charts);
      Highcharts.charts.forEach((chart) => {
        setTimeout(() => {
          if (chart != undefined)
            chart.reflow();
        }, 100)
      });
    });

  }

  chartnameid

  ngOnInit(): void {
    let date = new Date();
    this.last24hours = this.wholedata?.last24hours ? this.wholedata?.last24hours : false;
    this.lowFromDate = this.params?.startTime ? this.params?.startTime : new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.lowFromDateBIP = this.params?.startTime ? this.params?.startTime : new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.lowToDate = this.params?.endTime ? this.params?.endTime : new Date();
    this.lowToDateBIP = this.params?.endTime ? this.params?.endTime : new Date();
    // this.lowFromDate = this.params.startTime;
    // this.lowToDate = this.params.endTime;
    let urls = this.activeRoute.url;
    this.csc =urls.split('/')[2] == 'router' ? true:false
    this.singletimeseries = true;
    if (this.charttype == 'ponchart' || this.charttype == "ae_threshold") {
      this.timeseriesname = this.title ? this.title : 'Threshold Exceeded By Timeseries';
      if (urls.includes('health/cco-uplink') || urls.includes('health/cco-ae') || urls.includes('health/ae') || urls.includes('health/uplink'))
        this.userselectedlegend = [this.language["rxDis"], this.language["txDis"], this.language["oct"], this.language["pkt"], this.language["txPkt"], this.language["rxPkt"], this.language["rxOct"], this.language["txOct"], this.language["rxErr"], this.language["txErr"], this.language["usRate"], this.language["dsRate"], this.language["rxErrToPktRatio"], this.language["txErrToPktRatio"], this.language["rxDisToPktRatio"], this.language["txDisToPktRatio"]];
      else
        this.userselectedlegend = [this.language["usRate"], this.language["dsRate"]];
    }
    else if (this.charttype == "ae_packet" || (this.charttype == 'packagechart' && (urls.includes('health/cco-uplink') || urls.includes('health/uplink')))) {
      this.timeseriesname = 'Packets Error By Timeseries';
      this.userselectedlegend = [this.language["rxErr"], this.language["txErr"]];
    }

    else if (this.charttype == 'packagechart') {
      this.timeseriesname = this.title ? this.title : 'Packets Discards By Timeseries';
      this.userselectedlegend = [this.language["rxDis"], this.language["txDis"]];
    }
    else if (this.charttype == 'bipchart') {
      this.doubleTimeseries = !(urls.split('/')[2] == 'router');
      this.userselectedlegend = [this.language["usOct"], this.language["dsOct"], this.language["rxPkt"], this.language["txPkt"], this.language["rxDis"], this.language["txDis"], this.language["rxErr"], this.language["txErr"], this.language["usRate"], this.language["dsRate"], this.language["rxErrToPktRatio"], this.language["txErrToPktRatio"], this.language["rxDisToPktRatio"], this.language["txDisToPktRatio"]];
      this.timeseriesname = this.title ? this.title : 'PON Interface Timeseries';
      this.timeseriesnameBip = this.title ? this.title : 'BIP Error By Timeseries';
      this.bipchartnameid = this.chartname + "biperr"
      this.userselectedlegendbp = [this.language["Upstream Pon Errors"], this.language["Downstream Pon Errors"]]
    }
    else if (this.charttype == "BipChart") {
      this.userselectedlegend = [this.language["Upstream Pon Errors"], this.language["Downstream Pon Errors"]];
      this.timeseriesname = this.title ? this.title : 'BIP Error By Timeseries';
    }

    else if (this.charttype == "Lowlighchart") {
      this.timeseriesname = "Low Optical Power By Timeseries";
      this.userselectedlegend = [this.language["ONT Rx Power Level"], this.language["OLT Rx Power Level"]];
    }

    else if (this.charttype == "General" && ((urls.split('/')[2] == 'router' && this.page=='ont') || urls.includes('health/ont') || urls.includes('health/cco-ont'))) {
      this.timeseriesname = this.title ? this.title : "ONT Health by Timeseries";
      this.doubleTimeseries = !(urls.split('/')[2] == 'router');
      this.timeseriesnameBip = this.title ? this.title : 'BIP Error By Timeseries';
      this.userselectedlegend = [this.language["ONT Rx Power Level"], this.language["Upstream Pon Errors"], this.language["Downstream Pon Errors"], this.language["OLT Rx Power Level"], this.language["upTime"], this.language["Downstream Fec Total Code Words"], this.language["Upstream Fec Total Code Words"], this.language["ONT Tx Optical Power"], this.language["Upstream Fec Corrected Bytes"], this.language["Downstream Fec Corrected Bytes"], this.language["Upstream Fec Uncorrected Code Words"], this.language["Downstream Fec Uncorrected Code Words"]];
      this.bipchartnameid = this.chartname + "biperr"
      this.userselectedlegendbp = [this.language["Upstream BER"], this.language["Downstream BER"]]
    }

    else if (this.charttype == "General" && (urls.includes('health/cco-uplink') || urls.includes('health/uplink'))) {
      this.timeseriesname = this.title ? this.title : "Uplink Health By Timeseries";
      this.userselectedlegend = [this.language["oct"], this.language["pkt"], this.language["txPkt"], this.language["rxPkt"], this.language["rxOct"], this.language["txOct"], this.language["rxDis"], this.language["txDis"], this.language["rxErr"], this.language["txErr"], this.language["usRate"], this.language["dsRate"], this.language["rxErrToPktRatio"], this.language["txErrToPktRatio"], this.language["rxDisToPktRatio"], this.language["txDisToPktRatio"]];
    }

    else if (this.charttype == "General" && (urls.includes('pon-utilization/overview/basic') || urls.includes('cco-pon-utilization/overview/basic'))) {
      this.timeseriesname = this.title ? this.title : "PON Health By Timeseries"; this.doubleTimeseries = true; this.timeseriesnameBip = this.title ? this.title : 'BIP Error By Timeseries';
      this.userselectedlegend = [this.language["usOct"], this.language["dsOct"], this.language["rxPkt"], this.language["txPkt"], this.language["rxDis"], this.language["txDis"], this.language["rxErr"], this.language["txErr"], this.language["usRate"], this.language["dsRate"], this.language["rxErrToPktRatio"], this.language["txErrToPktRatio"], this.language["rxDisToPktRatio"], this.language["txDisToPktRatio"]];
      this.bipchartnameid = this.chartname + "biperr"
      this.userselectedlegendbp = [this.language["Upstream Pon Errors"], this.language["Downstream Pon Errors"]]
    }
    else if ((this.charttype == "General" || this.charttype == "ae_General") && ((urls.split('/')[2] == 'router' && this.page=='ae')  || urls.includes('health/ae') || urls.includes('health/cco-ae'))) {
      this.timeseriesname = "AE Interface Health";
      this.userselectedlegend = [this.language["oct"], this.language["pkt"], this.language["txPkt"], this.language["rxPkt"], this.language["rxOct"], this.language["txOct"], this.language["rxDis"], this.language["txDis"], this.language["rxErr"], this.language["txErr"], this.language["usRate"], this.language["dsRate"], this.language["rxErrToPktRatio"], this.language["txErrToPktRatio"], this.language["rxDisToPktRatio"], this.language["txDisToPktRatio"]];
    }
    else if (this.charttype == "General" && (urls.includes('cco/health/dsl'))) {
      this.timeseriesname = this.title ? this.title : "DSL Health By Timeseries"; 
      this.userselectedlegend = [this.language["rxPkt"], this.language["rxOct"], this.language["rxDis"], this.language["rxErr"], this.language["txPkt"], this.language["txOct"], this.language["usCurRate"], this.language["dsCurRate"], this.language["usAttRate"], this.language["dsAttRate"], this.language["usSnrMargin"], this.language["dsSnrMargin"], this.language["usTargetSnr"], this.language["dsTargetSnr"],this.language["upTime"], this.language["retrainCnt"], this.language["usRate"], this.language["dsRate"],this.language["rxDisRate"], this.language["rxErrRate"]];
      
    }
    this.chartnameid = this.chartname;
    this.bipchartnameid = this.chartname + "biperr"
    this.timeseriesid = this.chartname + "1"
    // setTimeout(() => {
    //   Highcharts.chart(this.chartname, );
    // }, 500);
    if (this.chartdata != undefined) {
      if (this.chartdata?.length) {
        let params1 = {
          tenant: "0",
          startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate)}`,
          endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)}`,
        }
        params1["granularity"] = this.healthService.getGranularity(params1.startTime, params1.endTime);

        this.starttimetoendtime(params1.startTime, params1.endTime, params1["granularity"], this.chartdata)
      }

      if (this.wholedata?.legendselected?.length)
        this.userselectedlegend = this.wholedata?.legendselected;
      setTimeout(() => {
        Highcharts.chart(this.chartname, this.LineChart1(this.chartdata || [], this.page));
        var elmnt = document.getElementById(this.divid);
        elmnt.scrollIntoView({ behavior: 'smooth' });
      }, 500);


    }
    else {
      this.TimeseriesApiCall(this.params);
      if (this.charttype == 'bipchart' || (this.charttype == "General" && (urls.includes('pon-utilization/overview/basic') || urls.includes('cco-pon-utilization/overview/basic') || urls.includes('health/ont')))) {
        this.TimeseriesApiCallForBipError(this.params);
      }
    }


  }
  changeDate() {
    this.maxForStartDate = this.lowToDate;
    if (!this.validateStartEndDates()) {
      this.modalTitle = 'Time Period';
      //this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
  }
  changeDateForBIP() {
    this.maxForStartDate = this.lowToDateBIP;
    if (!this.validateStartEndDatesForBIP()) {
      this.modalTitle = 'Time Period';
      //this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
  }
  validateStartEndDates() {
    let currentdate = new Date();
    if (!this.lowFromDate) {
      this.modalInfo = 'Time range not valid, end time should be later than start time.'
      return false;
    }

    if (this.lowFromDate > currentdate || this.lowToDate > currentdate) {
      this.modalInfo = 'Time range not valid, End Date and Start Date should not above current Date';
      return false;
    }

    if (this.lowFromDate && this.lowToDate) {
      if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate) > this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)) {
        this.modalInfo = 'Time range not valid, end time should be later than start time.';
        return false;
      }
      else if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate) == this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)) {
        this.modalInfo = 'Time range not valid, Start Date and End Date should not be same.';
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
  validateStartEndDatesForBIP() {
    let currentdate = new Date();
    if (!this.lowFromDateBIP) {
      this.modalInfo = 'Time range not valid, end time should be later than start time.'
      return false;
    }

    if (this.lowFromDateBIP > currentdate || this.lowToDateBIP > currentdate) {
      this.modalInfo = 'Time range not valid, End Date and Start Date should not above current Date';
      return false;
    }

    if (this.lowFromDateBIP && this.lowToDateBIP) {
      if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDateBIP) > this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDateBIP, true)) {
        this.modalInfo = 'Time range not valid, end time should be later than start time.';
        return false;
      }
      else if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDateBIP) == this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDateBIP, true)) {
        this.modalInfo = 'Time range not valid, Start Date and End Date should not be same.';
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
  chartCallback(chart) { // on complete
  }
  convertolocaltime(time) {
    let date = new Date(time * 1000)
    return date.toLocaleString();
    // console.log(new Date(time), date.toLocaleString());
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
  TimeseriesApiCall(params1) {
    let params = {
      tenant: "0",
      startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate)}`,
      endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)}`,
      region: params1?.region,
      location: params1?.location,
      system: params1?.system,
      interface: params1?.interface,
      ont: params1?.ont ? params1.ont : "",
      fsan: params1?.fsan ? params1?.fsan : ""
    }
    params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
    // if (params1?.oltRx) {
    //   params['field'] = 'txOptLvl';
    // }
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

    this.Timeseriesloader = true;
    this.timeseries = this.healthService.timeseries(query, this.page)?.subscribe((res: any) => {
      if (res && res.length)
        this.starttimetoendtime(params.startTime, params.endTime, params["granularity"], res)
      setTimeout(() => {
        Highcharts.chart(this.chartname, this.LineChart1(res || [], this.page));
        var elmnt = document.getElementById(this.divid);
        elmnt.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      this.Timeseriesloader = false; this.timeseriesDatamsg = "";
    }, (err) => {
      this.Timeseriesloader = false;
      if (err.status == 401) {
        this.timeseriesDatamsg = this.language['Access Denied'];
      }
      else {
        this.timeseriesDatamsg = this.commonOrgService.pageErrorHandle(err);
      }
    });

    return
  }
  TimeseriesApiCallForBipError(params1) {
    let params = {
      tenant: "0",
      startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDateBIP)}`,
      endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDateBIP, true)}`,
      region: params1?.region,
      location: params1?.location,
      system: params1?.system,
      interface: params1?.interface,
      ont: params1?.ont ? params1.ont : "",
      fsan: params1?.fsan ? params1?.fsan : ""
    }
    params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
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

    this.TimeseriesloaderBIP = true;
    this.timeseries = this.healthService.timeseriesBipError(query, this.page).subscribe((res: any) => {
      let data = [];
      for (let i = 0; i < res.length;) {
        if (res[i + 1] != 'undefined' && res[i + 1]?.timestamp) {
          if (this.dateUtilsService.getChartFormat(res[i].timestamp) == this.dateUtilsService.getChartFormat(res[i + 1]?.timestamp)) {
            let usBipErr = 0, dsBipErr = 0, usBer = 0, dsBer = 0;
            let j;
            for (j = i; j < res.length; j++) {
              if (this.dateUtilsService.getChartFormat(res[i].timestamp) != this.dateUtilsService.getChartFormat(res[j].timestamp))
                break;
              else {
                dsBipErr += res[j].dsBipErr ? res[j].dsBipErr : 0;
                usBipErr += res[j].usBipErr ? res[j].usBipErr : 0;
                dsBer += res[j].dsBer ? res[j].dsBer : 0;
                usBer += res[j].usBer ? res[j].usBer : 0;
              }

            }
            res[i].dsBipErr = dsBipErr;
            res[i].usBipErr = usBipErr;
            res[i].dsBer = dsBer;
            res[i].usBer = usBer;
            data.push(res[i]);
            i = j;
          }
          else { data.push(res[i]); i++; }
        } else { data.push(res[i]); i++; }

      }
      if (data && data.length)
        this.starttimetoendtime(params.startTime, params.endTime, params["granularity"], data)
      setTimeout(() => {
        Highcharts.chart(this.bipchartnameid, this.LineChartForBIP(data || [], this.page));
      }, 500);
      this.TimeseriesloaderBIP = false; this.timeseriesDatamsg1 = "";
      var elmnt = document.getElementById(this.chartnameid);
      elmnt.scrollIntoView({ behavior: 'smooth' });
    }, (err) => {
      this.TimeseriesloaderBIP = false;
      if (err.status == 401) {
        this.timeseriesDatamsg1 = this.language['Access Denied'];
      }
      else {
        this.timeseriesDatamsg1 = this.commonOrgService.pageErrorHandle(err);
      }
    });

    return
  }
  storeONTVALUE(value) {
    this.previousvalue.rxOptPwr = value.rxOptPwr || value.rxOptPwr == 0 ? value.rxOptPwr < -40 ? null : value.rxOptPwr : this.previousvalue.rxOptPwr;
    this.previousvalue.neOptSignalLvl = value.neOptSignalLvl || value.neOptSignalLvl == 0 ? value.neOptSignalLvl < -40 ? null : value.neOptSignalLvl : this.previousvalue.neOptSignalLvl;
    this.previousvalue.usBipErr = value.usBipErr || value.usBipErr == 0 ? value.usBipErr : this.previousvalue.usBipErr;
    this.previousvalue.dsBipErr = value.dsBipErr || value.dsBipErr == 0 ? value.dsBipErr : this.previousvalue.dsBipErr;
    this.previousvalue.usFecTotCodeWord = value.usFecTotCodeWord || value.usFecTotCodeWord == 0 ? value.usFecTotCodeWord : this.previousvalue.usFecTotCodeWord;
    this.previousvalue.dsFecTotCodeWord = value.dsFecTotCodeWord || value.dsFecTotCodeWord == 0 ? value.dsFecTotCodeWord : this.previousvalue.dsFecTotCodeWord;
    this.previousvalue.upTime = value.upTime || value.upTime == 0 ? value.upTime : this.previousvalue.upTime;
    this.previousvalue.txOptLvl = value.txOptLvl || value.txOptLvl == 0 ? value.txOptLvl : this.previousvalue.txOptLvl;
  }
  storeEthernetValue(value) {
    this.previousvalue.oct = value.oct || value.oct == 0 ? value.oct : this.previousvalue.oct;
    this.previousvalue.pkt = value.pkt || value.pkt == 0 ? value.pkt : this.previousvalue.pkt;
    this.previousvalue.rxPkt = value.rxPkt || value.rxPkt == 0 ? value.rxPkt : this.previousvalue.rxPkt;
    this.previousvalue.rxOct = value.rxOct || value.rxOct == 0 ? value.rxOct : this.previousvalue.rxOct;
    this.previousvalue.rxDis = value.rxDis || value.rxDis == 0 ? value.rxDis : this.previousvalue.rxDis;
    this.previousvalue.txPkt = value.txPkt || value.txPkt == 0 ? value.txPkt : this.previousvalue.txPkt;
    this.previousvalue.rxErr = value.rxErr || value.rxErr == 0 ? value.rxErr : this.previousvalue.rxErr;
    this.previousvalue.txDis = value.txDis || value.txDis == 0 ? value.txDis : this.previousvalue.txDis;
    this.previousvalue.txErr = value.txErr || value.txErr == 0 ? value.txErr : this.previousvalue.txErr;
    this.previousvalue.txOct = value.txOct || value.txOct == 0 ? value.txOct : this.previousvalue.txOct;
    this.previousvalue.rxErrRate = value.rxErrRate || value.rxErrRate == 0 ? value.rxErrRate : this.previousvalue.rxErrRate;
    this.previousvalue.txErrRate = value.txErrRate || value.txErrRate == 0 ? value.txErrRate : this.previousvalue.txErrRate;
    this.previousvalue.rxDisRate = value.rxDisRate || value.rxDisRate == 0 ? value.rxDisRate : this.previousvalue.rxDisRate;
    this.previousvalue.txDisRate = value.txDisRate || value.txDisRate == 0 ? value.txDisRate : this.previousvalue.txDisRate;
    this.previousvalue.usRate = value.usRate || value.usRate == 0 ? value.usRate : this.previousvalue.usRate;
    this.previousvalue.dsRate = value.dsRate || value.dsRate == 0 ? value.dsRate : this.previousvalue.dsRate;
  }
  storeponValue(value) {
    this.previousvalue.usBipErr = value.usBipErr || value.usBipErr == 0 ? value.usBipErr : this.previousvalue.usBipErr;
    this.previousvalue.dsBipErr = value.dsBipErr || value.dsBipErr == 0 ? value.dsBipErr : this.previousvalue.dsBipErr;
    this.previousvalue.usOct = value.usOct || value.usOct == 0 ? value.usOct : this.previousvalue.usOct;
    this.previousvalue.dsOct = value.dsOct || value.dsOct == 0 ? value.dsOct : this.previousvalue.dsOct;
    this.previousvalue.rxPkt = value.rxPkt || value.rxPkt == 0 ? value.rxPkt : this.previousvalue.rxPkt;
    this.previousvalue.rxDis = value.rxDis || value.rxDis == 0 ? value.rxDis : this.previousvalue.rxDis;
    this.previousvalue.rxErr = value.rxErr || value.rxErr == 0 ? value.rxErr : this.previousvalue.rxErr;
    this.previousvalue.txPkt = value.txPkt || value.txPkt == 0 ? value.txPkt : this.previousvalue.txPkt;
    this.previousvalue.txDis = value.txDis || value.txDis == 0 ? value.txDis : this.previousvalue.txDis;
    this.previousvalue.txErr = value.txErr || value.txErr == 0 ? value.txErr : this.previousvalue.txErr;
    this.previousvalue.rxErrRate = value.rxErrRate || value.rxErrRate == 0 ? value.rxErrRate : this.previousvalue.rxErrRate;
    this.previousvalue.txErrRate = value.txErrRate || value.txErrRate == 0 ? value.txErrRate : this.previousvalue.txErrRate;
    this.previousvalue.rxDisRate = value.rxDisRate || value.rxDisRate == 0 ? value.rxDisRate : this.previousvalue.rxDisRate;
    this.previousvalue.txDisRate = value.txDisRate || value.txDisRate == 0 ? value.txDisRate : this.previousvalue.txDisRate;
    this.previousvalue.usRate = value.usRate || value.usRate == 0 ? value.usRate : this.previousvalue.usRate;
    this.previousvalue.dsRate = value.dsRate || value.dsRate == 0 ? value.dsRate : this.previousvalue.dsRate;
  }
  LineChart1(data?, type?): any {
    const self = this;
    let subTitle;
    let value;
    let maxvalue = 0;
    var xAxisCategories = []; var usdsxAxisCategories = [];
    var upTime = [], neOptSignalLvl = [], rxOptPwr = [], txOptPwr = [];
    if (type == 'pon') {
      this.previousvalue = {
        usOct: null, dsOct: null, rxPkt: null, rxDis: null, rxErr: null, txPkt: null, txDis: null, txErr: null, rxErrRate: null, txErrRate: null, rxDisRate: null, txDisRate: null, usRate: null, dsRate: null
      }
      var usOct = [], dsOct = [], rxPkt = [], rxDis = [], rxErr = [], txPkt = [], txDis = [], txErr = [],
        rxErrRate = [], txErrRate = [], rxDisRate = [], txDisRate = [], usRate = [], dsRate = [];

      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span>${this.language['region']}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}`
      if (data.length) {
        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(data, this.timestamp[i]);
          xAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]));

          usOct.push({ y: dataobj.usOct || dataobj.usOct == 0 ? dataobj.usOct : null, deleted: dataobj?.deleted ? true : false })
          dsOct.push({ y: dataobj.dsOct || dataobj.dsOct == 0 ? dataobj.dsOct : null, deleted: dataobj?.deleted ? true : false })
          rxPkt.push({ y: dataobj.rxPkt || dataobj.rxPkt == 0 ? dataobj.rxPkt : null, deleted: dataobj?.deleted ? true : false })
          rxDis.push({ y: dataobj.rxDis || dataobj.rxDis == 0 ? dataobj.rxDis : null, deleted: dataobj?.deleted ? true : false })
          rxErr.push({ y: dataobj.rxErr || dataobj.rxErr == 0 ? dataobj.rxErr : null, deleted: dataobj?.deleted ? true : false })
          txPkt.push({ y: dataobj.txPkt || dataobj.txPkt == 0 ? dataobj.txPkt : null, deleted: dataobj?.deleted ? true : false })
          txDis.push({ y: dataobj.txDis || dataobj.txDis == 0 ? dataobj.txDis : null, deleted: dataobj?.deleted ? true : false })
          txErr.push({ y: dataobj.txErr || dataobj.txErr == 0 ? dataobj.txErr : null, deleted: dataobj?.deleted ? true : false })
          usRate.push({ y: dataobj.usRate || dataobj.usRate == 0 ? dataobj.usRate : null, deleted: dataobj?.deleted ? true : false })
          dsRate.push({ y: dataobj.dsRate || dataobj.dsRate == 0 ? dataobj.dsRate : null, deleted: dataobj?.deleted ? true : false })
          rxErrRate.push({ y: dataobj.rxErrRate || dataobj.rxErrRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('rxErrRate') ? null : dataobj.rxErrRate : null, deleted: dataobj?.deleted ? true : false })
          txErrRate.push({ y: dataobj.txErrRate || dataobj.txErrRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('txErrRate') ? null : dataobj.txErrRate : null, deleted: dataobj?.deleted ? true : false })
          rxDisRate.push({ y: dataobj.rxDisRate || dataobj.rxDisRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('rxDisRate') ? null : dataobj.rxDisRate : null, deleted: dataobj?.deleted ? true : false })
          txDisRate.push({ y: dataobj.txDisRate || dataobj.txDisRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('txDisRate') ? null : dataobj.txDisRate : null, deleted: dataobj?.deleted ? true : false })
        }
        maxvalue = xAxisCategories.length > 47 ? 48 : xAxisCategories.length
        this.xaxislenght = xAxisCategories?.length ? xAxisCategories?.length + 2000 : 200000;
        let listoffield = [usOct, dsOct, rxPkt, rxDis, rxErr, txPkt, txDis, txErr, usRate, dsRate,
          rxErrRate, txErrRate, rxDisRate, txDisRate];
        this.restructuring(listoffield);

      }
      // console.log(usOct, "usOct", dsOct, "dsOct", rxPkt, "rxPkt", txPkt, "txPkt", rxDis, "rxDis", txDis, "txDis", rxErr, "rxErr", txErr, "txErr",
      //   usBipErr, "usBipErr", dsBipErr, "dsBipErr")
      value = [
        {
          visible: this.userselectedlegend?.includes(this.language["usOct"]) ? true : false,
          name: this.language["usOct"],
          data: (usOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["dsOct"]) ? true : false,
          name: this.language["dsOct"],
          data: (dsOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxPkt"]) ? true : false,
          name: this.language["rxPkt"],
          data: (rxPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txPkt"]) ? true : false,
          name: this.language["txPkt"],
          data: (txPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxDis"]) ? true : false,
          name: this.language["rxDis"],
          data: (rxDis || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDis']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txDis"]) ? true : false,
          name: this.language["txDis"],
          data: (txDis || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txDis']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxErr"]) ? true : false,
          name: this.language["rxErr"],
          data: (rxErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxErr']
        },

        {
          visible: this.userselectedlegend?.includes(this.language["txErr"]) ? true : false,
          name: this.language["txErr"],
          data: (txErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txErr']
        },
        {
          yAxis: 3,

          visible: this.userselectedlegend?.includes(this.language["usRate"]) ? true : false,
          name: this.language["usRate"],
          data: (usRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usRate']
        },
        {
          yAxis: 3,
          visible: this.userselectedlegend?.includes(this.language["dsRate"]) ? true : false,
          name: this.language["dsRate"],
          data: (dsRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxErrToPktRatio"]) ? true : false,
          name: this.language["rxErrToPktRatio"],
          data: (rxErrRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxErrToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["txErrToPktRatio"]) ? true : false,
          name: this.language["txErrToPktRatio"],
          data: (txErrRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txErrToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxDisToPktRatio"]) ? true : false,
          name: this.language["rxDisToPktRatio"],
          data: (rxDisRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDisToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["txDisToPktRatio"]) ? true : false,
          name: this.language["txDisToPktRatio"],
          data: (txDisRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txDisToPktRatio']
        },
      ]
    }else if (type == 'dsl') {
      this.dsl = true
      this.previousvalue = {
        rxPkt: null, rxOct: null, rxDis: null, rxErr: null, txPkt: null, txOct: null, usCurRate: null, dsCurRate: null, usAttRate: null, dsAttRate: null, usSnrMargin: null, dsSnrMargin: null, usTargetSnr: null, dsTargetSnr: null, upTime:null,retrainCnt:null,usRate:null,dsRate:null, rxDisRate:null,rxErrRate:null
      }
      var rxPkt = [], rxOct = [], rxDis = [], rxErr = [], txPkt = [], txOct = [], usCurRate = [], dsCurRate = [],
      usAttRate = [], dsAttRate = [], usSnrMargin = [], dsSnrMargin = [], usTargetSnr = [], dsTargetSnr = [], upTime = [], retrainCnt = [], usRate = [],dsRate=[],rxDisRate=[], rxErrRate=[];

      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span>${this.language['region']}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}`
      if (data.length) {
        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(data, this.timestamp[i]);
          xAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]));

          rxPkt.push({ y: dataobj.rxPkt || dataobj.rxPkt == 0 ? dataobj.rxPkt : null, deleted: dataobj?.deleted ? true : false })
          rxOct.push({ y: dataobj.rxOct || dataobj.rxOct == 0 ? dataobj.rxOct : null, deleted: dataobj?.deleted ? true : false })
          rxDis.push({ y: dataobj.rxDis || dataobj.rxDis == 0 ? dataobj.rxDis : null, deleted: dataobj?.deleted ? true : false })
          rxErr.push({ y: dataobj.rxErr || dataobj.rxErr == 0 ? dataobj.rxErr : null, deleted: dataobj?.deleted ? true : false })
          txPkt.push({ y: dataobj.txPkt || dataobj.txPkt == 0 ? dataobj.txPkt : null, deleted: dataobj?.deleted ? true : false })
          txOct.push({ y: dataobj.txOct || dataobj.txOct == 0 ? dataobj.txOct : null, deleted: dataobj?.deleted ? true : false })
          usCurRate.push({ y: dataobj.usCurRate || dataobj.usCurRate == 0 ? dataobj.usCurRate : null, deleted: dataobj?.deleted ? true : false })
          dsCurRate.push({ y: dataobj.dsCurRate || dataobj.dsCurRate == 0 ? dataobj.dsCurRate : null, deleted: dataobj?.deleted ? true : false })
          usAttRate.push({ y: dataobj.usAttRate || dataobj.usAttRate == 0 ? dataobj.usAttRate : null, deleted: dataobj?.deleted ? true : false })
          dsAttRate.push({ y: dataobj.dsAttRate || dataobj.dsAttRate == 0 ? dataobj.dsAttRate : null, deleted: dataobj?.deleted ? true : false })
          usSnrMargin.push({ y: dataobj.usSnrMargin || dataobj.usSnrMargin == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('usSnrMargin') ? null : dataobj.usSnrMargin : null, deleted: dataobj?.deleted ? true : false })
          dsSnrMargin.push({ y: dataobj.dsSnrMargin || dataobj.dsSnrMargin == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('dsSnrMargin') ? null : dataobj.dsSnrMargin : null, deleted: dataobj?.deleted ? true : false })
          usTargetSnr.push({ y: dataobj.usTargetSnr || dataobj.usTargetSnr == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('usTargetSnr') ? null : dataobj.usTargetSnr : null, deleted: dataobj?.deleted ? true : false })
          dsTargetSnr.push({ y: dataobj.dsTargetSnr || dataobj.dsTargetSnr == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('dsTargetSnr') ? null : dataobj.dsTargetSnr : null, deleted: dataobj?.deleted ? true : false })
          upTime.push({ y: dataobj.upTime || dataobj.upTime == 0 ? dataobj.upTime : null, deleted: dataobj?.deleted ? true : false })
          retrainCnt.push({ y: dataobj.retrainCnt || dataobj.retrainCnt == 0 ? dataobj.retrainCnt : null, deleted: dataobj?.deleted ? true : false })
          usRate.push({ y: dataobj.usRate || dataobj.usRate == 0 ? dataobj.usRate : null, deleted: dataobj?.deleted ? true : false })
          dsRate.push({ y: dataobj.dsRate || dataobj.dsRate == 0 ? dataobj.dsRate : null, deleted: dataobj?.deleted ? true : false })
          rxDisRate.push({ y: dataobj.rxDisRate || dataobj.rxDisRate == 0 ? dataobj.rxDisRate : null, deleted: dataobj?.deleted ? true : false })
          rxErrRate.push({ y: dataobj.rxErrRate || dataobj.rxErrRate == 0 ? dataobj.rxErrRate : null, deleted: dataobj?.deleted ? true : false })
        }
        maxvalue = xAxisCategories.length > 47 ? 48 : xAxisCategories.length
        this.xaxislenght = xAxisCategories?.length ? xAxisCategories?.length + 2000 : 200000;
        let listoffield = [  rxPkt, rxOct, rxDis, rxErr, txPkt, txOct, usCurRate, dsCurRate, usAttRate, dsAttRate, usSnrMargin, dsSnrMargin, usTargetSnr, dsTargetSnr, upTime,retrainCnt,usRate,dsRate, rxDisRate,rxErrRate];
        this.restructuring(listoffield);

      }
      // console.log(usOct, "usOct", dsOct, "dsOct", rxPkt, "rxPkt", txPkt, "txPkt", rxDis, "rxDis", txDis, "txDis", rxErr, "rxErr", txErr, "txErr",
      //   usBipErr, "usBipErr", dsBipErr, "dsBipErr")
      value = [
        {
          visible: this.userselectedlegend?.includes(this.language["rxPkt"]) ? true : false,
          name: this.language["rxPkt"],
          data: (rxPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxOct"]) ? true : false,
          name: this.language["rxOct"],
          data: (rxOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxDis"]) ? true : false,
          name: this.language["rxDis"],
          data: (rxDis || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDis']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxErr"]) ? true : false,
          name: this.language["rxErr"],
          data: (rxErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxErr']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txPkt"]) ? true : false,
          name: this.language["txPkt"],
          data: (txPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txOct"]) ? true : false,
          name: this.language["txOct"],
          data: (txOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['txOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["usCurRate"]) ? true : false,
          name: this.language["usCurRate"],
          data: (usCurRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usCurRate']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["dsCurRate"]) ? true : false,
          name: this.language["dsCurRate"],
          data: (dsCurRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsCurRate']
        },
        {
          yAxis: 3,
          visible: this.userselectedlegend?.includes(this.language["usAttRate"]) ? true : false,
          name: this.language["usAttRate"],
          data: (usAttRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usAttRate']
        },
        {
          yAxis: 3,
          visible: this.userselectedlegend?.includes(this.language["dsAttRate"]) ? true : false,
          name: this.language["dsAttRate"],
          data: (dsAttRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsAttRate']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["usSnrMargin"]) ? true : false,
          name: this.language["usSnrMargin"],
          data: (usSnrMargin || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usSnrMargin']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["dsSnrMargin"]) ? true : false,
          name: this.language["dsSnrMargin"],
          data: (dsSnrMargin || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsSnrMargin']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["usTargetSnr"]) ? true : false,
          name: this.language["usTargetSnr"],
          data: (usTargetSnr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usTargetSnr']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["dsTargetSnr"]) ? true : false,
          name: this.language["dsTargetSnr"],
          data: (dsTargetSnr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsTargetSnr']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["upTime"]) ? true : false,
          name: this.language["upTime"],
          data: (upTime || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['upTime']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["retrainCnt"]) ? true : false,
          name: this.language["retrainCnt"],
          data: (retrainCnt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['retrainCnt']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["usRate"]) ? true : false,
          name: this.language["usRate"],
          data: (usRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usRate']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["dsRate"]) ? true : false,
          name: this.language["dsRate"],
          data: (dsRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxDisRate"]) ? true : false,
          name: this.language["rxDisRate"],
          data: (rxDisRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDisRate']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxErrRate"]) ? true : false,
          name: this.language["rxErrRate"],
          data: (rxErrRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxErrRate']
        },
      ]
    }
    else if (type == 'ethernet' || type == "ae" || type == 'ae_General') {
      this.previousvalue = {
        oct: null, pkt: null, rxPkt: null, rxOct: null, rxDis: null, txPkt: null, rxErr: null, txDis: null, txErr: null, txOct: null, rxErrRate: null, txErrRate: null, rxDisRate: null, txDisRate: null, usRate: null, dsRate: null
      }
      var oct = [], pkt = [], rxPkt = [], rxOct = [], rxDis = [], txPkt = [], rxErr = [], txDis = [], txErr = [], txOct = [], rxErrRate = [], txErrRate = [], rxDisRate = [], txDisRate = [], usRate = [], dsRate = [];
      let urls = this.activeRoute.url;
      if (urls.split('/')[2] == 'router') {
        subTitle = ''
      } else {
      if (this.params?.fsan && this.paramname.regionname != undefined)
        subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span>${this.language["region"]}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}, ${this.language["FSAN"]}: ${this.params?.fsan} ${this.paramname.deleted ?
            " (Deleted)" : ""}`
      else if (this.params?.fsan)
        subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span >${this.language["FSAN"]}: ${this.params?.fsan}`
      else
        subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span>${this.language["region"]}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}`
      }
      if (data.length) {
        let urls =this.activeRoute.url;
        if(urls.split('/')[2] == 'router'){
          this.cscPage =true;
        }else{
          this.cscPage = false;
        }
        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(this.cscPage && data?.length? data[0].timeseries :data, this.timestamp[i]);

          xAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]))
          oct.push({ y: dataobj.oct || dataobj.oct == 0 ? dataobj.oct : null, deleted: dataobj?.deleted ? true : false })
          pkt.push({ y: dataobj.pkt || dataobj.pkt == 0 ? dataobj.pkt : null, deleted: dataobj?.deleted ? true : false })
          rxPkt.push({ y: dataobj.rxPkt || dataobj.rxPkt == 0 ? dataobj.rxPkt : null, deleted: dataobj?.deleted ? true : false })
          rxOct.push({ y: dataobj.rxOct || dataobj.rxOct == 0 ? dataobj.rxOct : null, deleted: dataobj?.deleted ? true : false })
          rxDis.push({ y: dataobj.rxDis || dataobj.rxDis == 0 ? dataobj.rxDis : null, deleted: dataobj?.deleted ? true : false })
          rxErr.push({ y: dataobj.rxErr || dataobj.rxErr == 0 ? dataobj.rxErr : null, deleted: dataobj?.deleted ? true : false })
          txPkt.push({ y: dataobj.txPkt || dataobj.txPkt == 0 ? dataobj.txPkt : null, deleted: dataobj?.deleted ? true : false })
          txDis.push({ y: dataobj.txDis || dataobj.txDis == 0 ? dataobj.txDis : null, deleted: dataobj?.deleted ? true : false })
          txErr.push({ y: dataobj.txErr || dataobj.txErr == 0 ? dataobj.txErr : null, deleted: dataobj?.deleted ? true : false })
          txOct.push({ y: dataobj.txOct || dataobj.txOct == 0 ? dataobj.txOct : null, deleted: dataobj?.deleted ? true : false })
          usRate.push({ y: dataobj.usRate || dataobj.usRate == 0 ? dataobj.usRate : null, deleted: dataobj?.deleted ? true : false })
          dsRate.push({ y: dataobj.dsRate || dataobj.dsRate == 0 ? dataobj.dsRate : null, deleted: dataobj?.deleted ? true : false })
          rxErrRate.push({ y: dataobj.rxErrRate || dataobj.rxErrRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('rxErrRate') ? null : dataobj.rxErrRate : null, deleted: dataobj?.deleted ? true : false })
          txErrRate.push({ y: dataobj.txErrRate || dataobj.txErrRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('txErrRate') ? null : dataobj.txErrRate : null, deleted: dataobj?.deleted ? true : false })
          rxDisRate.push({ y: dataobj.rxDisRate || dataobj.rxDisRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('rxDisRate') ? null : dataobj.rxDisRate : null, deleted: dataobj?.deleted ? true : false })
          txDisRate.push({ y: dataobj.txDisRate || dataobj.txDisRate == 0 ? dataobj.invRatios && dataobj?.invRatios.includes('txDisRate') ? null : dataobj.txDisRate : null, deleted: dataobj?.deleted ? true : false })
        }

        maxvalue = xAxisCategories.length > 47 ? 48 : xAxisCategories.length
        this.xaxislenght = xAxisCategories?.length ? xAxisCategories?.length + 2000 : 200000;
        let listoffield = [oct, pkt, rxPkt, rxOct, rxDis, rxErr, txPkt, txDis, txErr,
          txOct, usRate, dsRate, rxErrRate, txErrRate, rxDisRate, txDisRate];
        // console.log(listoffield);
        this.restructuring(listoffield);
        //console.log(listoffield);
      }
      value = [
        {
          visible: this.userselectedlegend?.includes(this.language["oct"]) ? true : false,
          name: this.language["oct"],
          data: (oct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['oct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["pkt"]) ? true : false,
          name: this.language["pkt"],
          data: (pkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['pkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txPkt"]) ? true : false,
          name: this.language["txPkt"],
          data: (txPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxPkt"]) ? true : false,
          name: this.language["rxPkt"],
          data: (rxPkt || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxPkt']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxOct"]) ? true : false,
          name: this.language["rxOct"],
          data: (rxOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txOct"]) ? true : false,
          name: this.language["txOct"],
          data: (txOct || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txOct']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxDis"]) ? true : false,
          name: this.language["rxDis"],
          data: (rxDis || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxDis']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txDis"]) ? true : false,
          name: this.language["txDis"],
          data: (txDis || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txDis']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["rxErr"]) ? true : false,
          name: this.language["rxErr"],
          data: (rxErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxErr']
        },
        {
          visible: this.userselectedlegend?.includes(this.language["txErr"]) ? true : false,
          name: this.language["txErr"],
          data: (txErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txErr']
        },
        {
          yAxis: 3,
          visible: this.userselectedlegend?.includes(this.language["usRate"]) ? true : false,
          name: this.language["usRate"],
          data: (usRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['usRate']
        },
        {
          yAxis: 3,
          visible: this.userselectedlegend?.includes(this.language["dsRate"]) ? true : false,
          name: this.language["dsRate"],
          data: (dsRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['dsRate']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxErrToPktRatio"]) ? true : false,
          name: this.language["rxErrToPktRatio"],
          data: (rxErrRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxErrToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["txErrToPktRatio"]) ? true : false,
          name: this.language["txErrToPktRatio"],
          data: (txErrRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txErrToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["rxDisToPktRatio"]) ? true : false,
          name: this.language["rxDisToPktRatio"],
          data: (rxDisRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['rxDisToPktRatio']
        },
        {
          yAxis: 4,
          visible: this.userselectedlegend?.includes(this.language["txDisToPktRatio"]) ? true : false,
          name: this.language["txDisToPktRatio"],
          data: (txDisRate || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.UPLINK['txDisToPktRatio']
        },
      ]
    }
    else if (type == "ont") {
      this.previousvalue = {
        usBipErr: null, dsBipErr: null, usFecTotCodeWord: null, dsFecTotCodeWord: null, upTime: null, rxOptPwr: null, neOptSignalLvl: null, txOptLvl: null
      }
      var neOptSignalLvl1 = [], rxOptPwr1 = [], txOptPwr = [], rxOptPwr = [], neOptSignalLvl = [], usBipErr = [], dsBipErr = [], usFecTotCodeWord = [], dsFecTotCodeWord = [], upTime = [];
      var usFecCor = [], dsFecCor = [], usFecUncorCodeWord = [], dsFecUncorCodeWord = [];

      let urls = this.activeRoute.url;
      if (urls.split('/')[2] == 'router') {
        subTitle = ''
      } else {
        if (this.params?.fsan && !this.paramname?.regionname)
          subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span >${this.language["FSAN"]}: ${this.params?.fsan}`
        else if (!this.paramname?.locationname)
          subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span >${this.language["Ont"]}: ${this.paramname?.ont}`
        else
          subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span >${this.language["region"]}: ${this.paramname?.regionname},
          ${this.language['location']}: ${this.paramname?.locationname}, ${this.language['System']}: ${this.paramname?.systemname}, ${this.language['interface']}: ${this.paramname?.interfacename}, ${this.language["Ont"]}: ${this.paramname?.ont}`
      }
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i + 1] != 'undefined' && data[i + 1]?.timestamp)
            if (this.dateUtilsService.getChartFormat(data[i].timestamp) == this.dateUtilsService.getChartFormat(data[i + 1].timestamp)) {
              const nextdata = JSON.parse(JSON.stringify(data[i + 1])); let currentdata = JSON.parse(JSON.stringify(data[i]));
              let newcur = { ...nextdata, ...currentdata };
              data[i] = JSON.parse(JSON.stringify(newcur));
              data[i + 1] = JSON.parse(JSON.stringify(newcur));
              //  data.splice(data[i + 1], 1);
            }
        }

        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(data, this.timestamp[i]);
          xAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]));

          usBipErr.push({ y: dataobj.usBipErr || dataobj.usBipErr == 0 ? dataobj.usBipErr : null, deleted: dataobj?.deleted ? true : false })
          dsBipErr.push({ y: dataobj.dsBipErr || dataobj.dsBipErr == 0 ? dataobj.dsBipErr : null, deleted: dataobj?.deleted ? true : false })
          usFecTotCodeWord.push({ y: dataobj.usFecTotCodeWord || dataobj.usFecTotCodeWord == 0 ? dataobj.usFecTotCodeWord : null, deleted: dataobj?.deleted ? true : false })
          dsFecTotCodeWord.push({ y: dataobj.dsFecTotCodeWord || dataobj.dsFecTotCodeWord == 0 ? dataobj.dsFecTotCodeWord : null, deleted: dataobj?.deleted ? true : false })
          upTime.push({ y: dataobj.upTime || dataobj.upTime == 0 ? dataobj.upTime : null, deleted: dataobj?.deleted ? true : false })
          rxOptPwr1.push(dataobj.rxOptPwr || dataobj.rxOptPwr == 0 ? dataobj.rxOptPwr < -40 ? null : dataobj.rxOptPwr : null)
          txOptPwr.push({ y: dataobj.txOptLvl || dataobj.txOptLvl == 0 ? dataobj.txOptLvl : null, deleted: dataobj?.deleted ? true : false })
          neOptSignalLvl1.push(dataobj.neOptSignalLvl || dataobj.neOptSignalLvl == 0 ? dataobj.neOptSignalLvl < -40 ? null : dataobj.neOptSignalLvl : null)
          rxOptPwr.push({ y: dataobj.rxOptPwr || dataobj.rxOptPwr == 0 ? dataobj.rxOptPwr < -40 ? null : dataobj.rxOptPwr : null, deleted: dataobj?.deleted ? true : false })
          neOptSignalLvl.push({ y: dataobj.neOptSignalLvl || dataobj.neOptSignalLvl == 0 ? dataobj.neOptSignalLvl < -40 ? null : dataobj.neOptSignalLvl : null, deleted: dataobj?.deleted ? true : false })
          usFecCor.push({ y: dataobj.usFecCor || dataobj.usFecCor == 0 ? dataobj.usFecCor : null, deleted: dataobj?.deleted ? true : false })
          dsFecCor.push({ y: dataobj.dsFecCor || dataobj.dsFecCor == 0 ? dataobj.dsFecCor : null, deleted: dataobj?.deleted ? true : false })
          usFecUncorCodeWord.push({ y: dataobj.usFecUncorCodeWord || dataobj.usFecUncorCodeWord == 0 ? dataobj.usFecUncorCodeWord : null, deleted: dataobj?.deleted ? true : false })
          dsFecUncorCodeWord.push({ y: dataobj.dsFecUncorCodeWord || dataobj.dsFecUncorCodeWord == 0 ? dataobj.dsFecUncorCodeWord : null, deleted: dataobj?.deleted ? true : false })
        }
        let listoffield = [usBipErr, dsBipErr, usFecTotCodeWord, dsFecTotCodeWord, upTime, txOptPwr, usFecCor, dsFecCor, usFecUncorCodeWord, dsFecUncorCodeWord];
        this.restructuring(listoffield);
        console.log(usFecCor, 'listoffield')
        for (let i = 0; i < rxOptPwr.length; i++) {
          let iv = i + 1;
          if (rxOptPwr[i]?.y != null) {
            if (rxOptPwr[i - 1]?.y == null && iv < rxOptPwr.length && rxOptPwr[i + 1]?.y == null) {
              rxOptPwr[i]["y"] = rxOptPwr[i]?.y < -40 ? null : rxOptPwr[i]?.y,
                rxOptPwr[i]["marker"] = {
                  enabled: true,
                  radius: 2
                }
            }
            else if (rxOptPwr[i - 1]?.y == null && iv == rxOptPwr.length) {
              rxOptPwr[i]["y"] = rxOptPwr[i]?.y < -40 ? null : rxOptPwr[i]?.y,
                rxOptPwr[i]["marker"] = {
                  enabled: true,
                  radius: 3
                }

            }
          }
        }
        for (let i = 0; i < neOptSignalLvl.length; i++) {
          let iv = i + 1;
          if (neOptSignalLvl[i]?.y != null) {
            if (neOptSignalLvl[i - 1]?.y == null && iv < neOptSignalLvl.length && neOptSignalLvl[i + 1]?.y == null) {
              var a = {};
              neOptSignalLvl[i]["y"] = neOptSignalLvl[i]?.y < -40 ? null : neOptSignalLvl[i]?.y,
                neOptSignalLvl[i]["marker"] = {
                  enabled: true,
                  radius: 2
                }
            } else if (neOptSignalLvl[i - 1]?.y == null && iv == neOptSignalLvl.length) {
              var a = {};
              neOptSignalLvl[i]["y"] = neOptSignalLvl[i]?.y < -40 ? null : neOptSignalLvl[i]?.y,
                neOptSignalLvl[i]["marker"] = {
                  enabled: true,
                  radius: 3
                }
            }
          }

        }
        maxvalue = xAxisCategories.length > 47 ? 48 : xAxisCategories.length
      }
      this.lastOntValue.emit(rxOptPwr1);
      this.lastTxValue.emit(neOptSignalLvl1);
      this.xaxislenght = xAxisCategories?.length ? xAxisCategories?.length + 2000 : 200000

      value = [
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Upstream Pon Errors"]) ? true : false,
          name: this.language["Upstream Pon Errors"],
          data: (usBipErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['usbiperr']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Downstream Pon Errors"]) ? true : false,
          name: this.language["Downstream Pon Errors"],
          data: (dsBipErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['dsBipErr']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Upstream Fec Total Code Words"]) ? true : false,
          name: this.language["Upstream Fec Total Code Words"],
          data: (usFecTotCodeWord || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['usFecTotCodeWord']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Downstream Fec Total Code Words"]) ? true : false,
          name: this.language["Downstream Fec Total Code Words"],
          data: (dsFecTotCodeWord || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['dsFecTotCodeWord']
        },
        {
          yAxis: 2,
          visible: this.userselectedlegend?.includes(this.language["upTime"]) ? true : false,
          name: this.language["upTime"],
          data: (upTime || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['upTime']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["OLT Rx Power Level"]) ? true : false,
          name: this.language["OLT Rx Power Level"],
          data: (neOptSignalLvl || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['neOptSignalLvl']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["ONT Rx Power Level"]) ? true : false,
          name: this.language["ONT Rx Power Level"],
          data: (rxOptPwr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['rxOptPwr']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegend?.includes(this.language["ONT Tx Optical Power"]) ? true : false,
          name: this.language["ONT Tx Optical Power"],
          data: (txOptPwr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['txOptPwr']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Upstream Fec Corrected Bytes"]) ? true : false,
          name: this.language["Upstream Fec Corrected Bytes"],
          data: (usFecCor || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['usFecCor']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Downstream Fec Corrected Bytes"]) ? true : false,
          name: this.language["Downstream Fec Corrected Bytes"],
          data: (dsFecCor || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['dsFecCor']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Upstream Fec Uncorrected Code Words"]) ? true : false,
          name: this.language["Upstream Fec Uncorrected Code Words"],
          data: (usFecUncorCodeWord || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['usFecUncorCodeWord']
        },
        {
          yAxis: 0,
          visible: this.userselectedlegend?.includes(this.language["Downstream Fec Uncorrected Code Words"]) ? true : false,
          name: this.language["Downstream Fec Uncorrected Code Words"],
          data: (dsFecUncorCodeWord || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['dsFecUncorCodeWord']
        },
      ]
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        zoomType: 'x'
        //plotBackgroundColor: '#f6f6f6',
      },
      // colors: this.colors,
      legend: {
        symbolRadius: 100
      },
      exporting: {
        enabled: false
      },
      title: {
        text: ''
      },
      // subtitle: {
      //   text: subTitle,
      // },
      xAxis: [{
        // tickInterval: 1,
        tickmarkPlacement: 'on',
        //tickWidth: 0,
        // max: xAxisCategories?.length ? xAxisCategories?.length - 1 : null,
        categories: xAxisCategories,
        labels: {
          formatter: function () {
            let label = this.value;
            let chart = this.chart;
            if (!chart.resetZoomButton) {
              if (this.isFirst) {
                label = this.axis.categories[0];
              }
              if (this.isLast) {
                let len = this.axis.categories.length;
                label = this.axis.categories[len - 1];
              }
            }
            return label;
          }
        },
      },
      {
        categories: usdsxAxisCategories,
        showEmpty: false,
      }],
      yAxis: [
        { // Primary yAxis 0 Count
          allowDecimals: false,
          title: {
            text: "Count",
            style: {
              fontFamily: "Source Sans Pro"
            }

          },
          labels: {
            formatter: function () {
              return self.ShortnumberPipe.transform(this.value, false, 0);
            }
          },
          padding: '5px',
          showEmpty: false
        },
        { // Primary yAxis 1 dBm
          opposite: true,
          allowDecimals: false,
          title: {
            //text: rxOptPwr.some(code => code != null) || neOptSignalLvl.some(code => code != null) || txOptPwr.some(code => code != null) ? "dBm" : '',
            text: rxOptPwr.some(code => code != null) || neOptSignalLvl.some(code => code != null) || txOptPwr.some(code => code != null) ? "dBm" :this.dsl && (usSnrMargin.some(code => code != null) ||dsSnrMargin.some(code => code != null) || usTargetSnr.some(code => code != null) || dsTargetSnr.some(code => code != null))?"dB" :'',
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['rxOptPwr'],
              fontFamily: "Source Sans Pro"
            }
          },
          labels: {
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['rxOptPwr']
            }
          },
          showEmpty: false
        },
        { // Primary yAxis 2 seconds
          opposite: true,
          allowDecimals: false,
          title: {
            text: upTime.some(code => typeof (code) === 'number') ? "Seconds" : '',
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['upTime'],
              fontFamily: "Source Sans Pro"
            }
          },
          labels: {
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['upTime'],
              fontFamily: "Source Sans Pro"
            }
          },
          showEmpty: false
        },
        { // Primary yAxis 3 mbs #DE428E
          opposite: true,
          allowDecimals: false,
          min: 0,
          title: {
            text: "",
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate'],
              fontFamily: "Source Sans Pro"
            }
          },
          labels: {
            formatter: function () {
              return self.bitsToSize(this.value, false, 0);
            },
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate'],
              fontFamily: "Source Sans Pro"
            }
          },
          showEmpty: false
        },
        { // Primary yAxis 4 %
          // min: 0,
          // max: 100,
          // alignTicks: false,
          allowDecimals: false,
          opposite: true,
          title: {
            text: "",
            //text: (this.language && this.language.Percentage) ? `${this.language.Percentage}(%)` : 'Percentage(%)',
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDisToPktRatio'],
              fontFamily: "Source Sans Pro"
            }
          },
          labels: {
            // formatter() {
            //     return this.value / 1000;
            //   }
            style: {
              color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['rxDisToPktRatio'],
              fontFamily: "Source Sans Pro"
            }
          },
          showEmpty: false
        },
      ],
      tooltip: {
        useHTML: true,
        // headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        // pointFormatter: function () {

        //   let s = `<tr><td style='color:${this.series.color};padding:0'> ${this.series.name} :</td>
        //   <td style='padding:0;margin-left:10px'> ${self.tooltipunit(this.series.name, this.y)} </b></td></tr>`
        //   return s;
        // },
        // //${self.bitsToSize(this.y, false, 2)} pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
        // //   '<td style = "padding:0;margin-left:10px"><b>{point.y}</b></td></tr>',
        // footerFormat: '</table>',
        // followPointer: true,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.point.mydate == true) {
              info = `(When all packets are discards and no Rx/Tx packets are processed,<br/>
                the number provided is the last #of packets discarded and is not ratio)`
            }
            else if (point.point.deleted) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px" > ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${point.color};padding:0'> ${point.series.name} :</td>
            <td style='padding:0;margin-left:10px'>&nbsp ${self.tooltipunit(point.series.name, point.y)} </b></td></tr>`

          });
          let g = s + f;
          return h + g;
        },
        shared: true
      },
      lang: {
        noData: this.language["No Data Available"]
      },


      plotOptions: {
        series: {
          // ...this.plotOptions,
          //connectNulls: true,
          turboThreshold: this.xaxislenght,
          cursor: 'cursor',
          pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: xAxisCategories.length == 1 ? true : false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
          },
          //pointPlacement: 'on',
          point: {
            events: {

            }
          },
          events: {
            // legendItemClick: function () {
            //   if (type == 'pon') {
            //     var seriesIndex = this.index;
            //     var series = this.chart.series;
            //     if (seriesIndex == 0 || seriesIndex == 1) {
            //       for (var i = 2; i < series.length; i++) {
            //         if (series[i].index != seriesIndex) {
            //           series[i].hide();
            //         }
            //       }
            //       return true;
            //     }
            //     else if (seriesIndex > 1) {
            //       series[0].hide();
            //       series[1].hide();
            //       return true;
            //     }
            //   }
            //   else return true;
            // }
            legendItemClick: function () {
              if (self.userselectedlegend?.includes(this.name)) {
                self.userselectedlegend.splice(self.userselectedlegend.indexOf(this.name), 1);
              }
              else
                self.userselectedlegend.push(this.name)

              if (self.params?.fsan) {
                let obj = {};
                obj[self.params.fsan] = self.userselectedlegend
                self.selectedlegend.emit(obj);
              }


            }
          }

        }
      },
      series: value
    };
  }

  LineChartForBIP(data?, type?): any {
    //debugger
    const self = this;
    let subTitle;
    let value;
    let maxvalue = 0;
    var xAxisCategories = []; var usdsxAxisCategories = [];

    if (type == 'pon') {
      this.previousvalue = {
        usBipErr: null, dsBipErr: null
      }
      var usPonErr = [], dsPonErr = [], usBer = [], dsBer = [];

      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span class="subtitle" >${this.language['region']}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}`
      if (data.length) {
        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(data, this.timestamp[i]);
          usdsxAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]))
          usPonErr.push({ y: dataobj.usBipErr || dataobj.usBipErr == 0 ? dataobj.usBipErr : null, deleted: dataobj?.deleted ? true : false })
          dsPonErr.push({ y: dataobj.dsBipErr || dataobj.dsBipErr == 0 ? dataobj.dsBipErr : null, deleted: dataobj?.deleted ? true : false })


        }
        let listoffield = [usPonErr, dsPonErr];
        this.restructuring(listoffield);
        maxvalue = usdsxAxisCategories.length > 47 ? 48 : usdsxAxisCategories.length;
        this.xaxislenght = usdsxAxisCategories?.length ? usdsxAxisCategories?.length + 2000 : 200000;
      }
      value = [
        {
          visible: this.userselectedlegendbp?.includes(this.language["Upstream Pon Errors"]) ? true : false,
          name: this.language["Upstream Pon Errors"],
          data: (usPonErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['usbiperr']
        },
        {
          visible: this.userselectedlegendbp?.includes(this.language["Downstream Pon Errors"]) ? true : false,
          name: this.language["Downstream Pon Errors"],
          data: (dsPonErr || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsbiperr']
        }
      ]
    }
    else if (type == 'ont') {
      this.previousvalue = {
        usBer: null, dsBer: null
      }
      var usBer = [], dsBer = [];

      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span class="subtitle" >${this.language['region']}: ${this.paramname.regionname},
      ${this.language['location']}: ${this.paramname.locationname}, ${this.language['System']}: ${this.paramname.systemname}, ${this.language['interface']}: ${this.paramname.interfacename}`
      if (data.length) {
        for (let i = 0; i < this.timestamp.length; i++) {
          let dataobj = this.findObject(data, this.timestamp[i]);
          usdsxAxisCategories.push(this.dateUtilsService.getChartFormat(this.timestamp[i]))
          usBer.push({ y: this.ErrorRatio(dataobj.usBer) || this.ErrorRatio(dataobj.usBer) == 0 ? dataobj.usBer : null, deleted: dataobj?.deleted ? true : false })
          dsBer.push({ y: this.ErrorRatio(dataobj.dsBer) || this.ErrorRatio(dataobj.dsBer) == 0 ? dataobj.dsBer : null, deleted: dataobj?.deleted ? true : false })
        }
        let listoffield = [usBer, dsBer];
        this.restructuring(listoffield);
        maxvalue = usdsxAxisCategories.length > 47 ? 48 : usdsxAxisCategories.length;
        this.xaxislenght = usdsxAxisCategories?.length ? usdsxAxisCategories?.length + 2000 : 200000;
      }
      value = [
        {
          yAxis: 1,
          visible: this.userselectedlegendbp?.includes(this.language["Upstream BER"]) ? true : false,
          name: this.language["Upstream BER"],
          data: (usBer || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['usbiperr']
        },
        {
          yAxis: 1,
          visible: this.userselectedlegendbp?.includes(this.language["Downstream BER"]) ? true : false,
          name: this.language["Downstream BER"],
          data: (dsBer || []),
          color: environment.OPERATIONS.HEALTH.TIMESERIES.ONT['dsbiperr']
        }
      ]
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      legend: {
        symbolRadius: 100
      },
      exporting: {
        enabled: false
      },
      title: {
        text: ''
      },
      // subtitle: {
      //   text: subTitle,
      // },
      xAxis: [{
        tickmarkPlacement: 'on',
        categories: usdsxAxisCategories,
        labels: {
          formatter: function () {
            let label = this.value;
            let chart = this.chart;
            if (!chart.resetZoomButton) {
              if (this.isFirst) {
                label = this.axis.categories[0];
              }
              if (this.isLast) {
                let len = this.axis.categories.length;
                label = this.axis.categories[len - 1];
              }
            }
            return label;
          }
        },
      }],
      yAxis: [
        { // Primary yAxis 0 Count
          allowDecimals: false,
          title: {
            text: "Count",
            style: {
              fontFamily: "Source Sans Pro"
            },
          },
          labels: {
            formatter: function () {
              return self.ShortnumberPipe.transform(this.value, false, 0);
            }
          },
          padding: '5px',
          showEmpty: false
        },
        { // Primary yAxis 3 mbs #DE428E
          allowDecimals: true,
          //min: 0,
          title: {
            text: usBer.some(code => code != null) || dsBer.some(code => code != null) ? "Error Ratio" : '',
            style: {
              //color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate'],
              fontFamily: "Source Sans Pro"
            }
          },
          labels: {
            // formatter: function () {
            //   return self.ErrorRatio(this.value, false, 0);
            // },
            style: {
              //color: environment.OPERATIONS.HEALTH.TIMESERIES.PON['dsRate'],
              fontFamily: "Source Sans Pro"
            }
          },
        },
      ],
      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormatter: function () {
          let s = `<tr><td style='color:${this.series.color};padding:0'> ${this.series.name} :</td>
          <td style='padding:0;margin-left:10px'>&nbsp ${self.tooltipunit(this.series.name, this.y)} </b></td></tr>`
          return s;
        },
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          turboThreshold: this.xaxislenght,
          cursor: 'cursor',
          pointPadding: 2,
          marker: {
            enabled: usdsxAxisCategories.length == 1 ? true : false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
          },
          events: {
            legendItemClick: function () {
              if (self.userselectedlegendbp?.includes(this.name)) {
                self.userselectedlegendbp.splice(self.userselectedlegendbp.indexOf(this.name), 1);
              }
              else
                self.userselectedlegendbp.push(this.name)
            }
          },
        }
      },
      series: value
    };
  }

  closeChart() {
    this.singletimeseries = !this.singletimeseries;
    this.doubleTimeseries = !this.doubleTimeseries
    let obj = {
      "chartname": this.chartname
    }
    this.valueChange.emit(obj);
  }

  closeChartBip() {
    this.doubleTimeseries = !this.doubleTimeseries
    let obj = {
      "chartname": this.chartname
    }
    this.valueChange.emit(obj);
  }

  tooltipunit(legendName, value) {
    if (legendName == this.language["ONT Tx Optical Power"] || legendName == "rxOptPwr" || legendName == "neOptSignalLvl" || legendName == this.language["OLT Rx Power Level"] || legendName == this.language["ONT Rx Power Level"])
      return value.toFixed(2) + " dBm"
      else if (legendName == this.language["usSnrMargin"] || legendName == this.language["dsSnrMargin"] || legendName == this.language["usTargetSnr"] || legendName == this.language["dsTargetSnr"] )
      return value.toFixed(2) + " dB"
    else if (legendName == this.language["upTime"])
      return value.toFixed(2) + " s"
    else if (legendName == this.language["usRate"] || legendName == this.language["dsRate"])
      return this.bitsToSize(value, false, 2)
    else if (legendName == this.language["rxErrToPktRatio"] || legendName == this.language["txErrToPktRatio"] || legendName == this.language["rxDisToPktRatio"] || legendName == this.language["txDisToPktRatio"]) {
      return value
    }
    else return this.ShortnumberPipe.transform(value, false);
  }

  ErrorRatio(value, round?: any, fixed?) {
    this.Errorratio = Math.log(value) / Math.log(10);
    this.Errorratio = `${10 ** this.Errorratio}`

    return this.Errorratio;
  }

  bitsToSize(bits: any, round?: any, fixed?) {
    let bytes = bits;
    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    if (bytes == 0) return '0 bps';
    if (bytes < 0) {
      bytes = bytes * -1;
      var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
      if (round) {
        return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
      }
      let value: any;
      value = Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), fixed);
      return (value * -1).toFixed(fixed) + ' ' + sizes[i];
    }
    else {
      var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
      if (round) {
        return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
      }
      return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), fixed) + ' ' + sizes[i];
    }
  }

  lowapplyfilter() {
    if (!this.validateStartEndDates()) {
      this.modalTitle = 'Time Period';
      // this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
    Object.keys(this.previousvalue).forEach(key => {
      this.previousvalue[key] = null;
    })
    this.last24hours = false;
    this.TimeseriesApiCall(this.params);
  }

  lowapplyfilterForBIP() {
    if (!this.validateStartEndDatesForBIP()) {
      this.modalTitle = 'Time Period';
      // this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
    Object.keys(this.previousvalue).forEach(key => {
      this.previousvalue[key] = null;
    })
    this.last24hours = false;
    this.TimeseriesApiCallForBipError(this.params);
  }

  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.timeseries) this.timeseries.unsubscribe();
    if (this.toggleSubscription) this.toggleSubscription.unsubscribe()
  }

  starttimetoendtime(start, end, diff, data) {
    // console.log(start, typeof (start), end);
    let startTime = new Date(parseInt(start) * 1000);
    let endTime = new Date(parseInt(end) * 1000);
    // console.log(startTime, typeof (startTime), endTime);
    // console.log(this.dateUtilsService.getUtCSecondsByDateObj(startTime, false), this.dateUtilsService.getUtCSecondsByDateObj(endTime, true));
    let endloop = this.dateUtilsService.getUtCSecondsByDateObj(endTime, true)
    this.timestamp = [];
    if (diff == "15min") {
      startTime.setSeconds(0);
      let diffmins = startTime.getMinutes();
      if (diffmins >= 1 && diffmins <= 15)
        startTime.setMinutes(15);
      else if (diffmins >= 16 && diffmins <= 30)
        startTime.setMinutes(30);
      else if (diffmins >= 31 && diffmins <= 44)
        startTime.setMinutes(45);
      else if (diffmins >= 45) {
        startTime.setHours(startTime.getHours() + 1)
        startTime.setMinutes(0);
      }
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        startTime.setMinutes(startTime.getMinutes() + 15);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "1hour") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setMinutes(mindiff.getMinutes());
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        startTime.setHours(startTime.getHours() + 1);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "24hour") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setHours(mindiff.getHours());
      startTime.setMinutes(mindiff.getMinutes());
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        // startTime.setHours(startTime.getHours()+1);
        startTime.setDate(startTime.getDate() + 1);
        //console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    else if (diff == "1month") {
      let mindiff = new Date(parseInt(data[0].timestamp) * 1000);
      startTime.setHours(mindiff.getHours());
      startTime.setMinutes(mindiff.getMinutes());
      startTime.setDate(mindiff.getDate());
      // console.log(new Date(startTime), 'nothing')
      while ((new Date(startTime).getTime() / 1000) < endloop) {
        this.timestamp.push(Math.floor(new Date(startTime).getTime() / 1000));
        // startTime.setHours(startTime.getHours()+1);
        startTime.setMonth(startTime.getMonth() + 1);
        // console.log(startTime, this.dateUtilsService.getChartFormat(startTime));
      }
    }
    // console.log(this.timestamp, 'timestamps');
  }

  findObject(jsObjects, value: any) {
    let rtrn: any = {};

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['timestamp'] == value) {
          rtrn = jsObjects[i];
          break;
        }
      }
    }
    return rtrn
  }

  restructuring(listoffield: any) {

    listoffield.map((fieldName) => {
      // let data = []
      // data = JSON.parse(JSON.stringify(fieldName));
      // fieldName = []
      // console.log(fieldName);
      for (let i = 0; i < fieldName.length; i++) {
        let iv = i + 1;
        if (fieldName[i].y != null) {
          if (fieldName[i - 1]?.y == null && iv < fieldName.length && fieldName[i + 1]?.y == null) {
            fieldName[i].marker = {
              enabled: true,
              radius: 3
            }
          } else if (fieldName[i - 1]?.y == null && iv == fieldName.length) {
            fieldName[i].marker = {
              enabled: true,
              radius: 3
            }
          }
        }
      }
      // console.log(fieldName);
    })
  }

}