import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import * as Highcharts from 'highcharts/highstock';
import { DatePipe } from '@angular/common';
import { NetworkDevicesApiService } from 'src/app/flow-config/services/network-devices-api.service';
import { CommonService } from '../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-devices-name-placeholder',
  templateUrl: './devices-name-placeholder.component.html',
  styleUrls: ['./devices-name-placeholder.component.scss'],
  providers: [TitleCasePipe]
})
export class DevicesNamePlaceholderComponent implements OnInit, OnDestroy {
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;

  public MODULE: string;
  language: any;
  languageSub: any;
  startDate: any
  endDate: any;
  Highcharts = Highcharts;
  public show = {
    loading: false,
    chart: false,
    durationFullChart: true,
    delayFullChart: true,
    durationShortChart: false,
    delayShortChart: false,
    fullChart: false,
    flowCountInfo: false
  }
  public getDeviceMetricSeriesSub: any;
  public deviceIp: string = '';
  infoTitle: string;
  infoBody: string;
  modalRef: any;
  maxStartDate: any = new Date();
  maxEndDate: any = new Date();
  minEndDate: any;
  minStartDate: any;
  ORG_ID: any;
  requestPayload = {
    startDate: null,
    endDate: null
  }


  packetTimingData = {}
  rangeForDuration = '';
  rangeForDelay = ''
  packetTabValue = 'seconds'
  activeTab = '';
  flowCountMsg = ''
  constructor(
    private titleService: Title,
    private router: Router,
    private sso: SsoAuthService,
    public translateService: TranslateService,
    public networkDeviceApiService: NetworkDevicesApiService,
    private dialogService: NgbModal,
    public commonOrgService: CommonService,
    private titleCasePipe: TitleCasePipe
  ) {
    const url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.deviceIp = this.commonOrgService.getKey('deviceIp');
    this.language = this.translateService.defualtLanguage;
    this.languageSub = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (document.getElementById('packetTiming')?.className?.includes('active')) {
        this.loadPacketChart(this.packetTabValue)
      } else {
        this.getDecodeFlowCount();
      }
      this.setPageTitle();
    });
  }

  ngOnInit(): void {
    if (!this.deviceIp) {
      this.router.navigate([`/${this.MODULE}/flowAnalyze/network/devices/devices-status`]);
      return;
    } else {
      this.refreshGraph();
    }
    this.setPageTitle();
  }

  ngOnDestroy(): void {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
    if (this.getDeviceMetricSeriesSub) {
      this.getDeviceMetricSeriesSub.unsubscribe();
    }
  }

  configureDate() {
    this.startDate = new Date();
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate = new Date();
    this.endDate.setHours(23, 59, 59, 999);
    this.startDate.setDate(this.startDate.getDate() - 1);
  }

  public routeToDeviceStatus() {
    this.router.navigate([`${this.MODULE}/flowAnalyze/network/devices/devices-status`]);
  }

  onSelectStartTime(event, maxEndDateFlag) {
    if (event) {
      this.requestPayload.startDate = new Date(event);
      this.requestPayload.startDate.setHours(0, 0, 0)
      this.startDate = new Date(event);
      this.startDate.setHours(0, 0, 0)
      // this.requestPayload.startDate.setHours(12,30,0)
      this.minEndDate = new Date(event);
      new Date(this.minEndDate.setDate(this.requestPayload.startDate.getDate() + 1));
      // this.requestPayload.startDate = this.requestPayloa`d.startDate.toLocaleString("en-US", {
      //   timeZone: "America/Los_Angeles"
      // });`
      if (maxEndDateFlag) {
        this.requestPayload.endDate = new Date(event);
        this.endDate = new Date(event);
        if (moment(event).format('MM/DD/YYYY') !== moment().format('MM/DD/YYYY')) {
          this.requestPayload.endDate.setHours(23, 59, 59);
          this.endDate.setHours(23, 59, 59);
        }
        new Date(this.requestPayload.endDate.setDate(this.requestPayload.startDate.getDate() + 30));
        new Date(this.endDate.setDate(this.requestPayload.startDate.getDate() + 30));
        this.maxEndDate = new Date(event);
        new Date(this.maxEndDate.setDate(this.requestPayload.startDate.getDate() + 30))
        if (this.maxEndDate > new Date()) {
          this.maxEndDate = new Date();
          this.requestPayload.endDate = new Date();
          this.endDate = new Date();
        } else {

        }
      }
      this.maxStartDate = new Date(new Date().setDate(new Date().getDate() - 1))
    } else {
      this.requestPayload.startDate = '';
    }

  }

  onSelectEndTime(event) {
    if (event) {
      this.requestPayload.endDate = new Date(event);
      this.endDate = new Date(event);
      // this.requestPayload.endDate.setHours(12,29,59)
      if (moment(event).format('MM/DD/YYYY') !== moment().format('MM/DD/YYYY')) {
        this.requestPayload.endDate.setHours(23, 59, 59);
        this.endDate.setHours(23, 59, 59);
      } else {
        this.requestPayload.endDate = new Date();
        this.endDate = new Date();
      }
      // this.maxStartDate = new Date(event);

      this.maxStartDate = new Date(new Date().setDate(new Date().getDate() - 1))
      // new Date(this.maxStartDate.setDate(this.requestPayload.endDate.getDate() - 1));
      // this.minStartDate = new Date();
      // new Date(this.minStartDate.setDate(this.requestPayload.endDate.getDate() - 30));
      // this.requestPayload.endDate = this.requestPayload.endDate.toLocaleString("en-US", {
      //   timeZone: "America/Los_Angeles"
      // });

      // console.log('minStartDate', this.minStartDate)
    } else {
      this.requestPayload.endDate = '';
    }
  }

  expandDurationChart(flag) {
    if (flag) {
      document.getElementById('delay_collaps').style.display = 'none';
      document.getElementById('duration_expand').style.display = 'block';
      document.getElementById('delay_expand').style.display = 'none';
      document.getElementById('duration_collaps').style.display = 'none';
      this.show.durationFullChart = false;
      this.show.delayFullChart = true;
      this.show.fullChart = true
    } else {
      document.getElementById('duration_expand').style.display = 'none';
      document.getElementById('duration_collaps').style.display = 'block';
      document.getElementById('delay_collaps').style.display = 'block';
      document.getElementById('delay_expand').style.display = 'none';
      this.show.fullChart = false
      this.show.durationFullChart = false;
      this.show.delayFullChart = false;
    }
    this.loadPacketChart(this.packetTabValue);
  }

  expandDelayChart(flag) {
    if (flag) {
      document.getElementById('duration_expand').style.display = 'none';
      document.getElementById('duration_collaps').style.display = 'none';
      document.getElementById('delay_collaps').style.display = 'none';
      document.getElementById('delay_expand').style.display = 'block';
      this.show.fullChart = true
      this.show.delayFullChart = false;
      this.show.durationFullChart = true;
    } else {
      document.getElementById('duration_expand').style.display = 'none';
      document.getElementById('duration_collaps').style.display = 'block';
      document.getElementById('delay_collaps').style.display = 'block';
      document.getElementById('delay_expand').style.display = 'none';
      this.show.fullChart = false
      this.show.durationFullChart = false;
      this.show.delayFullChart = false;
    }
    this.loadPacketChart(this.packetTabValue);
  }

  hidePacketTimingGraph() {
    this.show.fullChart = false
    this.show.delayFullChart = true;
    this.show.durationFullChart = true;
    this.show.durationShortChart = false;
    this.show.delayShortChart = false;
  }

  getDecodeFlowCount() {
    if (!this.requestPayload.startDate) {
      this.infoTitle = this.language['Invalid request'];
      this.infoBody = this.language['Start date required'];
      this.openInfoModal();
      return;
    }
    this.commonOrgService.closeAlert();
    this.activeTab = 'decodeFlowCountGraph';
    this.show.loading = true;
    this.requestPayload.startDate = Math.floor(((new Date(this.startDate).getTime()) / 1000));
    this.requestPayload.endDate = Math.floor(((new Date(this.endDate).getTime()) / 1000));

    this.getDeviceMetricSeriesSub = this.networkDeviceApiService.DeviceMatricSeries(this.deviceIp, this.requestPayload.startDate, this.requestPayload.endDate, this.ORG_ID).subscribe((res: any) => {
      this.show.loading = false;
      if (res && res?.metricSeries) {
        document.getElementById('container').style.display = 'block';
        const option = this.makeOptionsForLineChart(res);
        this.Highcharts.chart('container', option);
      } else {
        document.getElementById('container').style.display = 'none';
      }
      this.show.flowCountInfo = document.getElementById('packetTiming')?.className?.includes('active');
    }, (err: HttpErrorResponse) => {
      document.getElementById('container').style.display = 'none';
      this.show.loading = false;
      this.pageErrorHandle(err);
    });
  }

  makeOptionsForLineChart(apiResponse: any): any {
    let obj: any = {
      time: [],
    }
    let that = this;
    let pipe = new DatePipe('en-US');
    apiResponse.metricSeries.forEach(element => {
      const arr: any = []
      element.metricValues.forEach(e => {
        obj.time.push(e.time),
          arr.push(e?.value || 0)
      })
      obj[element.metricName] = arr;
    });
    obj.time = [...new Set(obj.time)]
    // obj.time = obj.time?.map(ele => pipe.transform(new Date((ele/1000000)), 'dd/MM/yyyy HH:mm'))
    obj.time = obj.time?.map(ele => moment.tz((ele / 1000000), moment.tz.guess()).format('MM/DD/YYYY HH:mm z'))
    let tickInterval = 1;
    if (obj.time && obj.time.length <= 45) {
      tickInterval = 1;
    } else if (obj.time && obj.time.length > 45) {
      tickInterval = Math.floor(obj.time.length / 45);
    }
    const options: any = {
      chart: {
        type: 'line',
        zoomType: 'xy',
      },
      time: {
        useUTC: false,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      mapNavigation: {
        enableMouseWheelZoom: true,
      },
      tooltip: {
        formatter: function () {
          var y = that.formatTooltip(this.x, this.series.userOptions.label, this.series.name, this.y)
          return y
        }
      },
      xAxis: {
        categories: obj.time ? obj.time : [],
        tickInterval: tickInterval,
        labels: {
          allowOverlap: false,
          maxStaggerLines: 1,
          formatter: function () {
            let label = this.value;
            if (this.isLast) {
              let len = this.axis.categories.length;
              label = this.axis.categories[len - 1];
            }
            return label;
          }
        },
      },
      yAxis: {
        title: {
          text: `${this.language.flowRate} (${this.language.perSecond})`,
        },
        min: 0,
        minRange: 1,
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolRadius: 0,
      },
      lang: {
        noData: this.language['No Data Available'],
      },
      plotOptions: {
        series: {
          marker: {
            enabled: (obj.packet_rate?.length == 1 || obj.flow_rate?.length == 1 || obj.virtual_packet_rate?.length == 1 || obj.virtual_bit_Rate?.length == 1) ? true : false
          }
        },
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
            //color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: [
        {
          showInLegend: true,
          name: this.language.packetRate,
          label: 'packetRate',
          color: '#F7C343',
          data: obj.packet_rate ? obj.packet_rate : [],
        },
        {
          showInLegend: true,
          name: this.language.flowRate,
          label: 'flowRate',
          color: '#5ACFEA',
          data: obj.flow_rate ? obj.flow_rate : [],
        },
        {
          showInLegend: true,
          name: this.language.virtualPacketRate,
          label: 'virtualPacketRate',
          color: '#B926F0',
          data: obj.virtual_packet_rate ? obj.virtual_packet_rate : [],
        },
        {
          showInLegend: true,
          name: this.language.virtualBitRate,
          label: 'virtualBitRate',
          color: '#0027FF',
          data: obj.virtual_bit_Rate ? obj.virtual_bit_Rate : [],
        },
      ],
      credits: {
        enabled: false,
      },
    };
    return options;
  }

  getPacketTimingData(tabName, isRefresh = false) {
    if (!isRefresh && this.activeTab === 'packetTimingGraph') {
      return;
    }
    this.commonOrgService.closeAlert();
    this.show.loading = true;
    let secondsElement = document.getElementById('seconds');
    secondsElement?.classList.remove('show');
    secondsElement?.classList.remove('active');
    let minutesElement = document.getElementById('minutes');
    minutesElement.classList.remove('show');
    minutesElement.classList.remove('active');
    let millisecondElement = document.getElementById('milliseconds');
    millisecondElement.classList.add('show');
    millisecondElement.classList.add('active');

    this.activeTab = 'packetTimingGraph';
    this.getDeviceMetricSeriesSub = this.networkDeviceApiService.GetPacketTimingData(this.deviceIp, this.ORG_ID).subscribe((res: any) => {
      if (res && Object.keys(res).length) {
        this.packetTimingData = res;
        this.loadPacketChart(tabName);
      } else {
        this.packetTimingData = {}
      }
      this.show.flowCountInfo = document.getElementById('packetTiming')?.className?.includes('active');
      this.show.loading = false;
    }, (err: HttpErrorResponse) => {
      this.show.loading = false;
      this.pageErrorHandle(err);
    });

  }


  loadPacketChart(tabName) {
    this.packetTabValue = tabName;
    let categories_duration = [];
    let categories_delay = [];
    let yAxisDurationValue = [];
    let yAxisDelayValue = [];
    let option_duration, option_delay;
    this.flowCount(this.packetTimingData);
    switch (tabName) {
      case 'seconds':
        categories_duration = this.configureXaxisData('duration', tabName, 1000);
        categories_duration[categories_duration.length - 1] = `>= ${categories_duration[categories_duration.length - 1]}`
        categories_delay = this.configureXaxisData('delay', tabName, 1000);
        categories_delay[categories_delay.length - 1] = `>= ${categories_delay[categories_delay.length - 1]}`
        yAxisDurationValue = this.configureYAxisData('duration', tabName);
        yAxisDelayValue = this.configureYAxisData('delay', tabName);
        option_duration = this.makeOptionsForDurationChart(categories_duration, yAxisDurationValue, 'Seconds');
        option_delay = this.makeOptionsForDelayChart(categories_delay, yAxisDelayValue, 'Seconds');
        break;
      case 'minutes':
        categories_duration = this.configureXaxisData('duration', tabName, 60000);
        categories_duration[categories_duration.length - 1] = `>= ${categories_duration[categories_duration.length - 1]}`
        categories_delay = this.configureXaxisData('delay', tabName, 60000);
        categories_delay[categories_delay.length - 1] = `>= ${categories_delay[categories_delay.length - 1]}`
        yAxisDurationValue = this.configureYAxisData('duration', tabName);
        yAxisDelayValue = this.configureYAxisData('delay', tabName);
        option_duration = this.makeOptionsForDurationChart(categories_duration, yAxisDurationValue, 'Minutes');
        option_delay = this.makeOptionsForDelayChart(categories_delay, yAxisDelayValue, 'Minutes');
        break;
      case 'hours':
        categories_duration = this.configureXaxisData('duration', tabName, 3600000);
        categories_duration[categories_duration.length - 1] = `>= ${categories_duration[categories_duration.length - 1]}`
        categories_delay = this.configureXaxisData('delay', tabName, 3600000);
        categories_delay[categories_delay.length - 1] = `>= ${categories_delay[categories_delay.length - 1]}`
        yAxisDurationValue = this.configureYAxisData('duration', tabName);
        yAxisDelayValue = this.configureYAxisData('delay', tabName);
        option_duration = this.makeOptionsForDurationChart(categories_duration, yAxisDurationValue, 'Hours');
        option_delay = this.makeOptionsForDelayChart(categories_delay, yAxisDelayValue, 'Hours');
        break;
      default:
        break;
    }
    this.rangeForDuration = this.on_one_entry(this.packetTimingData['duration'][tabName])
    this.rangeForDelay = this.on_one_entry(this.packetTimingData['delay'][tabName])
    if (this.show.fullChart) {
      this.Highcharts.chart('container_duration_expand', option_duration);
      this.Highcharts.chart('container_delay_expand', option_delay);
    } else {
      this.Highcharts.chart('container_duration', option_duration);
      this.Highcharts.chart('container_delay', option_delay);
    }
  }

  flowCount(data) {
    if (!data) return;
    const millis = data.duration.seconds.created - data.duration.seconds.started;
    const minutes = Math.round(millis / 60000);
    this.flowCountMsg = "" + data.duration.seconds.total_count + " " + this.language.flow_last + " ";
    if (minutes == 0) {
      this.flowCountMsg += Math.round(millis / 1000) + " " + this.language.Seconds;
    } else {
      this.flowCountMsg += minutes + " " + this.language.Minutes;
    }
  }

  configureXaxisData(type, tabName, time) {
    let stpeSize = this.packetTimingData[type][tabName].step / time
    let step = 0;
    let xAxisData = [];
    for (let index = 0; index < this.packetTimingData[type][tabName].size; index++) {
      step = step + stpeSize;
      xAxisData.push(step);
    }
    xAxisData = xAxisData?.map(e => e.toFixed(2));
    return xAxisData;
  }

  configureYAxisData(type, tabName) {
    let yAxisValue = [];
    const totalXAxisValue = this.packetTimingData[type][tabName]['indicies']?.reduce((a, b) => a + b, 0)
    yAxisValue.push(this.packetTimingData[type][tabName]['indicies']?.map(e => {
      if (e) {
        return ((e / totalXAxisValue) * 100);
      } else {
        return 0;
      }
    }))
    yAxisValue = yAxisValue.flat();
    return yAxisValue;
  }

  makeOptionsForDurationChart(categories, series, tabName): any {
    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        // stackLabels: {
        //   style: {
        //       color: '#000000',
        //       fontWeight: 'bold'
        //   },
        //   enabled: true,
        //   verticalAlign: 'top'
        // },
        title: {
          text: '%'
        },
        opposite: false,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
            return `${this.value}`;
          }
        },
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          colors: ["#0027FF"],
        }
      },
      tooltip: {
        formatter: function () {
          const s = `<p> <b>${this.x}</b><span> <b>${tabName}</b><br/></span><br>${this.y.toFixed(2)}% </p>`
          return s;
        },
      },
      series: [
        {
          name: this.titleCasePipe.transform(this.language[tabName]),
          data: series,
        }
      ],
      credits: {
        enabled: false
      }
    };
    return options;
  }

  makeOptionsForDelayChart(categories, series, tabName): any {
    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        // stackLabels: {
        //   style: {
        //       color: '#000000',
        //       fontWeight: 'bold'
        //   },
        //   enabled: true,
        //   verticalAlign: 'top'
        // },
        title: {
          text: '%'
        },
        opposite: false,
        min: 0,
        max: 100,
        labels: {
          formatter: function () {
            return `${this.value}`;
          }
        },
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          colors: ["#5ACFEA"],
        }
      },
      tooltip: {
        formatter: function () {
          const s = `<p> <b>${this.x}<b/><span> <b>${tabName}</b><br/></span><br>${this.y.toFixed(2)}% </p>`
          return s;
        },
      },
      series: [
        {
          name: this.titleCasePipe.transform(this.language[tabName]),
          data: series,
        }
      ],
      credits: {
        enabled: false
      }
    };
    return options;
  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal);
  }


  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  formatBytes(bits, decimals = 2) {
    if (!+bits) return '0 bps'
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']
    const i = Math.floor(Math.log(bits) / Math.log(k));

    return `${parseFloat((bits / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  formatPacket(packets, decimals = 2) {
    if (!+packets) return '0 pps'
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tbps', 'Ppps', 'Epps', 'Zpps', 'Ypsps']
    const i = Math.floor(Math.log(packets) / Math.log(k));

    return `${parseFloat((packets / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  formatTooltip(x, seriesLabel, seriesName, y) {
    if (seriesLabel == 'virtualPacketRate') {
      y = this.formatPacket(y);
    }
    if (seriesLabel == 'virtualBitRate') {
      y = this.formatBytes(y);
    }
    return `<b>${x}</b><br><b>${seriesName}: ${y}</b>`
  }

  on_one_entry(entry) {
    let msg = '';
    if (!entry) return msg;
    let tot = entry.total_count || 0;
    if (tot > 0) {

      let miss = this.round10((entry.missing || 0), tot).toFixed(1);
      let invalids = this.round10((entry.invalid || 0), tot).toFixed(1);
      if ((entry.minval || 0) <= (entry.maxval || 0)) {
        let minscale = this.time_scale((entry.minval || 0));
        let maxscale = this.time_scale((entry.maxval || 0));
        if (entry.minval != 0 && maxscale.short != minscale.short) {
          var s = minscale.short;
        } else {
          var s: any = "";
        }

        msg = this.language.range + ': ' + minscale.value + " " + s + "&thinsp;&harr;&thinsp;" + " " + maxscale.value +
          " " + maxscale.name + ",&nbsp" + this.language.missing + ": " + miss + "%, " + this.language.invalid + ": " + invalids + "%";
      }
    } else {
      msg = this.language.range + ': ' + '0.0' + ' ' + this.language.Seconds + "&thinsp;&harr;&thinsp;" + '0.0' +
        " " + this.language.Seconds + ",&nbsp" + this.language.missing + ":" + '0.0' + "%, " + this.language.invalid + ":" + '0.0' + "%";
    }
    return msg;
  }


  round10(val, tot) {
    return Math.round(val / tot * 1000) / 10;
  }


  time_scale(val) {
    let seconds = val / 1000;
    if (seconds <= 120) {
      return { value: seconds.toFixed(1), name: this.language.Seconds, short: this.language.Seconds };
    }
    let minutes = seconds / 60.0;
    if (minutes <= 120) {
      return { value: minutes.toFixed(1), name: this.language.Minutes, short: this.language.Minutes };
    }
    let hours = minutes / 60.0;
    if (hours <= 48) {
      return { value: hours.toFixed(1), name: this.language.hours, short: this.language.hours };
    }
    let days = hours / 24.0;

    return { value: days.toFixed(1), name: this.language.days, short: this.language.days };
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400 || err.status == 417) {
      if (err.status == 417 && err?.error?.message) {
        this.infoBody = err?.error?.message;
      } else {
        this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      }
      this.infoTitle = this.language['Invalid request'];
      this.openInfoModal();
      this.show.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.show.loading = false;
    }

  }

  setPageTitle() {
    this.titleService.setTitle(`${this.activeTab === 'packetTimingGraph' ? this.language.flow_timing : this.language.decoded_flow_count} - ${this.language['Bsp_Microsite_Status']} - ${this.language['devices']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  routeToDecodeFlowCount() {
    if (this.activeTab === 'decodeFlowCountGraph') {
      return;
    }
    this.configureDate();
    this.onSelectStartTime(this.startDate, false);
    this.onSelectEndTime(this.endDate);
    this.getDecodeFlowCount();
    this.setPageTitle();
  }

  refreshGraph() {
    const activeTab = this.activeTab;
    this.configureDate();
    this.onSelectStartTime(this.startDate, false);
    this.onSelectEndTime(this.endDate);
    this.getDecodeFlowCount();
    if (this.MODULE === 'systemAdministration') {
      this.getPacketTimingData('seconds', true);
    }
    this.show.flowCountInfo = document.getElementById('packetTiming')?.className?.includes('active');
    this.activeTab = activeTab;

  }

}
