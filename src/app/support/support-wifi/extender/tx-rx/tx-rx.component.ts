import { Component, Input, OnInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import * as moment from 'moment';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Component({
  selector: 'app-tx-rx',
  templateUrl: './tx-rx.component.html',
  styleUrls: ['./tx-rx.component.scss']
})
export class TxRxComponent implements OnInit, OnDestroy {
  @HostListener("click", ["$event"]) inClick(e) {
    //Slider bar Prev, Next click events

    e.stopPropagation();

    let id = e.target.id ? e.target.id : '';

    if (id == 'slider-click-next' || id == 'slider-click-prev') {
      let clsList = e.target.className ? e.target.className.split(' ')[0] : '';
      let tag = e.target.localName;
      let totalPoints = this.timeIntervals.length - 1;
      // console.log(this.selectedInterval)
      if (id == 'slider-click-next') {
        if (this.any15min?.endTime != undefined)
          this.any15min.endTime = undefined;
        let point = parseInt(clsList.split('-')[1]);
        if ((point + 1) <= totalPoints) {
          this.selectedInterval = point + 1;
        }

      }

      if (id == 'slider-click-prev') {
        if (this.any15min?.endTime != undefined)
          this.any15min.endTime = undefined;
        let point = parseInt(clsList.split('-')[1]);
        if ((point - 1) >= 0) {

          this.selectedInterval = point - 1;
        }
      }

      this.handleUserTime();
    }


  }

  @Input('routerData') routerData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;

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
  noChartDataAvailable: boolean;
  leftSliderTime: string;
  rightSliderTime: string;

  periods = [
    { label: 'Any 15 minutes within last day', value: '2' },
    { label: 'Last 1 day', value: '1' },
    { label: 'Last 3 days', value: '3' },
    { label: 'Last 7 days', value: '7' },
  ];
  periodSelected: any = 'day';
  chartSubs: any;
  endDate: any
  any15min: any;
  redirectData: any;
  constructor(
    private api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    public ssoAuthService: SsoAuthService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setPeriodOptions();
      this.loadChart();
    });

    this.dropDownchange();
    this.lastdays15MinOfValues();



  }

  ngOnInit(): void {



    this.redirectData = this.options.subject.subscribe(data => {
      this.any15min = data;
      if (this.any15min?.endTime != undefined) {
        this.setPeriodOptions();
        this.periodSelected = this.any15min?.period
        this.calcOf15minVal();
        this.loadChart();
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

    if (this.any15min?.endTime != undefined)
      this.any15min.endTime = undefined;

    setTimeout(() => {
      if (this.periodSelected == '2') {
        this.showIntervalSlider = true;
      }

      this.loadChart();



    }, 500);
  }
  ngOnChanges() {
    this.setPeriodOptions();
    this.periodSelected = '1';
    this.loadChart();
  }

  ngOnDestroy() {
    if (this.chartSubs) this.chartSubs.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.redirectData) this.redirectData.unsubscribe();
  }
  userClickTimeout: any = setTimeout(() => { }, 0);
  handleUserTime() {
    clearTimeout(this.userClickTimeout);
    this.userClickTimeout = setTimeout(() => { this.loadChart(); }, 2000);
  }
  loadChart() {
    // let endTime1 = this.timeIntervals[this.selectedInterval].date;
    // let startTime = moment(endTime1).subtract(15, "minutes");
    // endTime1 = moment(endTime1).add(1, "minutes");
    // let start = this.timeIntervals[this.selectedInterval - 1].date.getTime()
    let end1 = this.timeIntervals[this.selectedInterval].date.getTime()
    let start = new Date(end1).setMinutes(new Date(end1).getMinutes() - 15)
    this.closeAlert();
    let mac;
    if (this.routerData.macAddress) {
      mac = this.routerData.macAddress;
    } else if (this.routerData.MACAddress) {
      mac = this.routerData.MACAddress;
    }
    this.noChartDataAvailable = false;
    this.loading = true;
    if (this.any15min?.endTime) {
      this.periodSelected = this.any15min.period
    }
    if (this.periodSelected == '2') {

      this.chartSubs = this.api.getUsage15MinTXRX(this.orgId, this.fsan, mac, start).subscribe((res: any) => {

        if (res && Object.keys(res).length && res.data && res.data.length) {
          this.chartDataParsed = res;
          this.chartData = this.chartDataParsed.data;

          this.chartOptions = this.options.getMeshTxExtendOptions(this.chartData, this.periodSelected, this.language);
          // this.chartOptions.hasOwnProperty('additionalValie');
          this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
          this.showChart = true;
          this.loading = false;
        } else {
          this.chartOptions = this.options.getMeshTxExtendOptions([], this.periodSelected, this.language);
          this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
          this.showChart = true;
          this.loading = false;
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      });
    } else {
      this.chartSubs = this.api.getUsageTXRX(this.orgId, this.fsan, mac, this.periodSelected).subscribe((res: any) => {
        if (res && Object.keys(res).length && res.data && res.data.length) {
          this.chartDataParsed = res;
          this.chartData = this.chartDataParsed.data;

          this.chartOptions = this.options.getMeshTxExtendOptions(this.chartData, this.periodSelected, this.language);
          // this.chartOptions.hasOwnProperty('additionalValie');
          this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
          this.showChart = true;
          this.loading = false;
        } else {
          this.chartOptions = this.options.getMeshTxExtendOptions([], this.periodSelected, this.language);
          this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
          this.showChart = true;
          this.loading = false;
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      });
    }
    /* this.chartSubs = this.api.getUsageTXRX(this.orgId, this.fsan, mac, this.periodSelected).subscribe((res: any) => {
      if (res && Object.keys(res).length && res.data && res.data.length) {
        this.chartDataParsed = res;
        this.chartData = this.chartDataParsed.data;

        this.chartOptions = this.options.getMeshTxExtendOptions(this.chartData, this.periodSelected, this.language);
        // this.chartOptions.hasOwnProperty('additionalValie');
        this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
        this.showChart = true;
        this.loading = false;
      } else {
        this.chartOptions = this.options.getMeshTxExtendOptions([], this.periodSelected, this.language);
        this.Highcharts.chart('wifi-txrx-chart', this.chartOptions);
        this.showChart = true;
        this.loading = false;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    }); */


  }

  refresh() {
    this.loadChart();
  }
  getISOString(time) {
    return time.toISOString().substr(0, 16) + ':00';
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

  setPeriodOptions() {

    let periods = [
      { label: this.language['Any 15 minutes within last day'], value: '2' },
      { label: this.language['Last 1 day'], value: '1' },
      { label: this.language['Last 3 days'], value: '3' },
      { label: this.language['Last 7 days'], value: '7' },
    ];

    this.periods = [...periods];
  }
  selectedInterval: any;
  timeIntervalOptions: Options = {
    hideLimitLabels: true,
    onlyBindHandles: true,
    stepsArray: [],
  };
  showIntervalSlider = false;
  timeIntervals = [];
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
        value: i, legend: moment(current).format('MM/DD/YYYY hh:mm'),
        date: moment(current).toDate()
      });
      lastUpdatedTime = moment(current);
      current.add(15, 'minutes');
      i++;
    }

    /*  if (this.any15min.endTime) {
       return this.calcOf15minVal();
     } */
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

    this.leftSliderTime = moment(this.timeIntervals[0].date).subtract(15, 'minutes').format('MMM DD hh:mm A');
    // this.leftSliderTime = moment(this.timeIntervals[0].date).format('MMM DD hh:mm A');
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
